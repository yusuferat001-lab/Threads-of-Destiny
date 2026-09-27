import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/meslekYatkinlikOlaylari.ts — İngilizce çevirileri. */
export const OLAYLAR_MESLEK_YATKINLIK_EN: Record<string, OlayCeviri> = {
  myk_asker_ordugah_meydan_okumasi: {
    baslik: "A Challenge",
    metin:
      "Boredom in the camp has sparked a challenge: a chance to prove your skill with a blade in front of everyone. The crowd is watching you.",
    secenekler: [
      {
        metin: "Strike a masterful blow and floor your opponent.",
        kilitAciklamasi: "You're not skilled enough for this move yet — try something safer.",
        basariliSonuc: {
          mesaj: "You beat your opponent in front of the crowd; your name was on people's lips in the camp for a while.",
        },
        basarisizSonuc: {
          mesaj: "The move landed, but your timing was off; you hit the ground hard.",
        },
      },
      {
        metin: "Play it safe, stay purely defensive.",
        basariliSonuc: {
          mesaj: "You impressed no one, but gave no one anything to laugh about either; it's over.",
        },
        basarisizSonuc: {
          mesaj: "Even staying defensive was a struggle; you took a few hard hits.",
        },
      },
      {
        metin: "Don't take part in the challenge at all.",
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
      "Your sharp eye for the market hasn't gone unnoticed. A trader you don't know approaches with a low-risk but lucrative partnership offer — a chance not extended to just anyone, reserved for an eye as keen as yours.",
    secenekler: [
      {
        metin: "Accept the offer, put your capital on the table.",
        basariliSonuc: {
          mesaj: "Your instinct was right; the partnership paid off even better than you expected.",
        },
        basarisizSonuc: {
          mesaj: "The partnership wasn't as bright as it looked; you couldn't recover part of your capital.",
        },
      },
      {
        metin: "Politely decline, don't take the risk.",
        basariliSonuc: {
          mesaj: "You turned the opportunity down. Some part of you wondered 'what if it had worked out' — but the money stayed in your pocket.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_din_gunahkarin_yuku: {
    baslik: "The Congregation's Doubt",
    metin:
      "Your sermons never quite fit you; the contradictions inside you spill out from the pulpit. An old man from the congregation pulls you aside and asks plainly: 'Do you truly believe in this, my child?'",
    secenekler: [
      {
        metin: "Be honest, share your doubts.",
        basariliSonuc: {
          mesaj: "Your honesty surprised him, but you earned his respect; at least you're not lying.",
        },
        basarisizSonuc: {
          mesaj: "Your words spread quickly through the congregation; the way they look at you has changed.",
        },
      },
      {
        metin: "Cling to your role, act like a true believer.",
        basariliSonuc: {
          mesaj: "You were convincing; the man was persuaded and left. Inside, you feel a little more hollow.",
        },
        basarisizSonuc: {
          mesaj: "Your insincerity showed in your eyes; the man shook his head and walked away.",
        },
      },
    ],
  },

  myk_zanaatkar_ustalik_sinavi: {
    baslik: "A Test of Mastery",
    metin:
      "The guild left an unusual order at your workshop: alongside an ordinary repair, any master willing may also attempt an entirely new technique. The risk is great, but if you succeed your name will be remembered for years.",
    secenekler: [
      {
        metin: "Attempt to invent an entirely new technique.",
        kilitAciklamasi: "Your hand isn't skilled enough yet to attempt this.",
        basariliSonuc: {
          mesaj: "Your attempt worked! Even the guild's finest hands are talking about your invention.",
        },
        basarisizSonuc: {
          mesaj: "You wasted the material; the technique isn't mature yet. Still, no one blamed you for trying.",
        },
      },
      {
        metin: "Play it safe, do the ordinary repair.",
        basariliSonuc: {
          mesaj: "The job went smoothly; no one was disappointed, and no one was amazed either.",
        },
        basarisizSonuc: {
          mesaj: "Even the simple job hit a small snag; you paid the guild a small compensation.",
        },
      },
    ],
  },

  myk_asker_muhafiz_teklifi: {
    baslik: "An Offer to Join the King's Personal Guard",
    metin:
      "Word of your battlefield skill has reached the ruler's own ears. A messenger from the court invites you to a trial to join the personal guard.",
    secenekler: [
      {
        metin: "Accept the offer, take the trial.",
        basariliSonuc: {
          mesaj: "You passed the trial with ease; you now stand at the ruler's own side.",
        },
        basarisizSonuc: {
          mesaj: "You failed the trial; the court sent you back politely, and the camp talked about it for a while.",
        },
      },
      {
        metin: "Politely decline, stay with your army.",
        basariliSonuc: {
          mesaj: "Your refusal made you even more valued in the eyes of your comrades in arms.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_asker_efsanevi_duello: {
    baslik: "An Invitation to a Legendary Duel",
    metin:
      "Your reputation has reached a rival champion's ears. He challenges you to a single-strike duel in front of everyone.",
    secenekler: [
      {
        metin: "Accept the challenge.",
        basariliSonuc: {
          mesaj: "Your blade flashed and your rival fell to his knees — your name became a legend.",
        },
        basarisizSonuc: {
          mesaj: "You left the field badly wounded; news of the defeat spread quickly through the camp.",
        },
      },
      {
        metin: "Decline with honor, no excuse needed.",
        basariliSonuc: {
          mesaj: "You declined; some will call you a coward, but you know you acted wisely.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_tuccar_bas_tedarikci: {
    baslik: "An Offer to Become the Kingdom's Chief Supplier",
    metin:
      "The court steward has heard of your sharp trading instinct. He summons you to a major meeting to become the kingdom's chief supplier.",
    secenekler: [
      {
        metin: "Sign the big contract.",
        basariliSonuc: {
          mesaj: "The contract was signed; both your coffers and your name grew considerably.",
        },
        basarisizSonuc: {
          mesaj: "The terms were harsher than they looked; the deal cost you dearly.",
        },
      },
      {
        metin: "Don't take the risk, stick to your smaller deals.",
        basariliSonuc: {
          mesaj: "You carried on with your smaller, safer business.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_tuccar_rakip_kiskancligi: {
    baslik: "The Envy of Rivals",
    metin:
      "Your success has drawn eyes. Rival traders are spreading dark rumors about you, and even trying to sabotage your goods.",
    secenekler: [
      {
        metin: "Gather evidence, defend your reputation.",
        basariliSonuc: {
          mesaj: "You found the source of the rumors; once the truth came out, everyone sided with you.",
        },
        basarisizSonuc: {
          mesaj: "You found no evidence; the rumors grew and hurt your business for a while.",
        },
      },
      {
        metin: "Ignore it, focus on your work.",
        basariliSonuc: {
          mesaj: "You ignored the rumors; some kept believing them, but they faded over time.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_din_kutsal_gorev: {
    baslik: "Chosen for a Holy Task",
    metin:
      "Your superiors, hearing of the depth of your faith, have chosen you to guard a special, holy relic. It's a rare honor within the congregation.",
    secenekler: [
      {
        metin: "Accept the task.",
        basariliSonuc: {
          mesaj: "You completed the task successfully; the congregation now holds you in far greater respect.",
        },
        basarisizSonuc: {
          mesaj: "You made a grave mistake during the task; it shook you deeply.",
        },
      },
      {
        metin: "Humbly decline, say you're not worthy.",
        basariliSonuc: {
          mesaj: "Your humility earned quiet admiration within the congregation.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_din_mucize_soylentisi: {
    baslik: "Rumors of a Miracle",
    metin:
      "A rumor is spreading about someone who was healed or found peace through your hands. Crowds are showing up at your door, hopeful.",
    secenekler: [
      {
        metin: "Confirm the rumor, receive the people.",
        basariliSonuc: {
          mesaj: "The rumor turned you into the most respected name in the region.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't meet their expectations; disappointment spread quickly.",
        },
      },
      {
        metin: "Reject the rumor, stay humble.",
        basariliSonuc: {
          mesaj: "You rejected the claims of a miracle; some kept believing regardless, but you kept your peace.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_zanaatkar_saray_daveti: {
    baslik: "An Invitation to Become the Court's Chief Craftsman",
    metin:
      "The mastery of your hands has reached the court. You're commissioned to create a special, magnificent piece for the palace.",
    secenekler: [
      {
        metin: "Accept the commission, produce your best work.",
        basariliSonuc: {
          mesaj: "Your piece was received with admiration at court; your name is now spoken among the nobility too.",
        },
        basarisizSonuc: {
          mesaj: "The piece didn't meet expectations; the court didn't hide its disappointment.",
        },
      },
      {
        metin: "Don't take the risk, stick to your ordinary orders.",
        basariliSonuc: {
          mesaj: "You carried on with your smaller, safer orders.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_zanaatkar_taklitciler: {
    baslik: "Imitators and Frauds",
    metin:
      "As your name grew in value, frauds selling copies of your work under your signature have appeared. Your customers are confused.",
    secenekler: [
      {
        metin: "Track them down, expose the frauds.",
        basariliSonuc: {
          mesaj: "You exposed the frauds; true craftsmanship was talked about again.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find the frauds; your reputation took a hit for a while.",
        },
      },
      {
        metin: "Add a distinguishing seal to your own work.",
        basariliSonuc: {
          mesaj: "Your new seal started setting your work apart; it cost a little, but it worked.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
};
