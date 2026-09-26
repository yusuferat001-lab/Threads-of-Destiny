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
};
