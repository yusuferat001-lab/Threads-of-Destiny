import type { DilliMetin } from "./meslekProfilleri";

/**
 * Din Adamı öğretileri (v10, cemaat modeli). Her rütbe seviyesinde (S1..S5) 3 öğreti sunulur;
 * oyuncu biri seçer ve kalıcıdır. Üçüncü seçenek ⚡ fanatikliği artırır. Etkiler game/cemaat.ts
 * `ogretiToplami` ile toplanır (toplamsal alanlar toplanır, çarpımsal alanlar çarpılır).
 */

export type FaaliyetId = "tovbe" | "ritual" | "sifa" | "egitim" | "emanet";

export interface OgretiEtkisi {
  /** Bağış yapan oranına eklenir (puan; 0.04 = +%4 puan). */
  bagisOrani?: number;
  /** Bağış birimine eklenir (kesir; 0.06 = +%6). */
  bagisBirimi?: number;
  /** Ayine gelme oranına eklenir. */
  gelmeOrani?: number;
  /** Yıllık inanan büyümesine eklenir (kesir; 0.006 = +%0.6/yıl). */
  inanan?: number;
  /** Yıllık ahlak etkisi (puan). */
  ahlak?: number;
  /** Faaliyet masraflarında indirim (kesir). */
  masrafIndirimi?: number;
  /** Yardım harcamasının inanan/ahlak getirisi çarpanı. */
  yardimEtkisi?: number;
  /** Yardım harcama maliyeti indirimi (kesir). */
  yardimMaliyet?: number;
  /** Koruma eklentisi (0-1). */
  koruma?: number;
  /** Rakip saldırı hasarı çarpanı. */
  saldiriHasari?: number;
  /** Yıllık otorite ilişkisi (puan). */
  otorite?: number;
  /** Okul mezun şansına eklenir. */
  okulMezun?: number;
  /** Çalışan yetenek gelişimine eklenir (yıllık puan). */
  yetenek?: number;
  /** Faaliyet geliri çarpanı. */
  faaliyet?: Partial<Record<FaaliyetId, number>>;
  /** Vergi oranından düşülen puan (0.05 = 5 puan). */
  vergiPuan?: number;
  /** Bina kapasitesi çarpanı. */
  kapasite?: number;
  /** Seçildiği anda fanatikliğe eklenen puan. */
  fanatiklik?: number;
  /** Fanatik kaçış çarpanı. */
  fanatikKacis?: number;
  /** Aşırılık olayı riski çarpanı. */
  asiriRisk?: number;
  /** Alt kitle bonusu çarpanı. */
  altKitle?: number;
}

export interface OgretiTanimi {
  id: string;
  seviye: 1 | 2 | 3 | 4 | 5;
  simge: string;
  ad: DilliMetin;
  aciklama: DilliMetin;
  /** ⚡ fanatikliği artıran seçenek. */
  fanatik?: boolean;
  etki: OgretiEtkisi;
}

export const OGRETILER: OgretiTanimi[] = [
  // ── Seviye 1 ──
  {
    id: "adak_gelenegi", seviye: 1, simge: "🕯️",
    ad: { tr: "Adak Geleneği", en: "Votive Tradition" },
    aciklama: { tr: "Bağış yapanların oranı +%4 puan artar.", en: "The share of attendees who give rises by 4 points." },
    etki: { bagisOrani: 0.04 },
  },
  {
    id: "misafirperver_kapi", seviye: 1, simge: "🚪",
    ad: { tr: "Misafirperver Kapı", en: "Open Door" },
    aciklama: { tr: "İnananların sayısı yılda +%0,6 büyür.", en: "Your flock grows by 0.6% a year." },
    etki: { inanan: 0.006 },
  },
  {
    id: "atesli_vaaz", seviye: 1, simge: "⚡", fanatik: true,
    ad: { tr: "Ateşli Vaaz", en: "Fiery Sermon" },
    aciklama: { tr: "Fanatiklik +5; bağış birimi +%6.", en: "Zealotry +5; donation size +6%." },
    etki: { fanatiklik: 5, bagisBirimi: 0.06 },
  },
  // ── Seviye 2 ──
  {
    id: "sifa_merhamet", seviye: 2, simge: "🌿",
    ad: { tr: "Şifa ve Merhamet", en: "Healing & Mercy" },
    aciklama: { tr: "Şifa geliri ×1,3; yardımın etkisi ×1,2.", en: "Healing income ×1.3; aid has ×1.2 effect." },
    etki: { faaliyet: { sifa: 1.3 }, yardimEtkisi: 1.2 },
  },
  {
    id: "ilim_hikmet", seviye: 2, simge: "📖",
    ad: { tr: "İlim ve Hikmet", en: "Learning & Wisdom" },
    aciklama: { tr: "Okul mezun şansı +%8; çalışanlar yılda +0,3 daha çok gelişir.", en: "School graduate chance +8%; staff improve 0.3 faster a year." },
    etki: { okulMezun: 0.08, yetenek: 0.3 },
  },
  {
    id: "kesin_hukum", seviye: 2, simge: "⚡", fanatik: true,
    ad: { tr: "Kesin Hüküm", en: "Absolute Verdict" },
    aciklama: { tr: "Fanatiklik +6; ayine gelme oranı +0,05.", en: "Zealotry +6; attendance rate +0.05." },
    etki: { fanatiklik: 6, gelmeOrani: 0.05 },
  },
  // ── Seviye 3 ──
  {
    id: "vaaz_sanati", seviye: 3, simge: "🎙️",
    ad: { tr: "Vaaz Sanatı", en: "Art of Preaching" },
    aciklama: { tr: "Bağış birimi +%10.", en: "Donation size +10%." },
    etki: { bagisBirimi: 0.1 },
  },
  {
    id: "halkin_dostu", seviye: 3, simge: "🤝",
    ad: { tr: "Halkın Dostu", en: "Friend of the People" },
    aciklama: { tr: "Alt kitle bonusu ×1,5; ahlak +0,2/yıl.", en: "Lower-class bonus ×1.5; morality +0.2/year." },
    etki: { altKitle: 1.5, ahlak: 0.2 },
  },
  {
    id: "kutsal_ofke", seviye: 3, simge: "⚡", fanatik: true,
    ad: { tr: "Kutsal Öfke", en: "Holy Wrath" },
    aciklama: { tr: "Fanatiklik +7; bağış yapan oranı +%4 puan.", en: "Zealotry +7; giver share +4 points." },
    etki: { fanatiklik: 7, bagisOrani: 0.04 },
  },
  // ── Seviye 4 ──
  {
    id: "ortak_sofra", seviye: 4, simge: "🍲",
    ad: { tr: "Ortak Sofra", en: "Shared Table" },
    aciklama: { tr: "Yardımın etkisi ×1,4; yardım maliyeti −%20.", en: "Aid has ×1.4 effect; aid costs −20%." },
    etki: { yardimEtkisi: 1.4, yardimMaliyet: 0.2 },
  },
  {
    id: "muhafiz_kardesligi", seviye: 4, simge: "🛡️",
    ad: { tr: "Muhafız Kardeşliği", en: "Brotherhood of Guardians" },
    aciklama: { tr: "Koruma +0,15; rakip saldırı hasarı ×0,85.", en: "Protection +0.15; rival attack damage ×0.85." },
    etki: { koruma: 0.15, saldiriHasari: 0.85 },
  },
  {
    id: "sarsilmaz_iman", seviye: 4, simge: "⚡", fanatik: true,
    ad: { tr: "Sarsılmaz İman", en: "Unshakable Faith" },
    aciklama: { tr: "Fanatiklik +8; fanatik kaçış ×0,5.", en: "Zealotry +8; zealot attrition ×0.5." },
    etki: { fanatiklik: 8, fanatikKacis: 0.5 },
  },
  // ── Seviye 5 ──
  {
    id: "hakikatin_isigi", seviye: 5, simge: "✨",
    ad: { tr: "Hakikatin Işığı", en: "Light of Truth" },
    aciklama: { tr: "İnananlar yılda +%1 büyür; bağış yapan oranı +%3 puan.", en: "Flock grows 1% a year; giver share +3 points." },
    etki: { inanan: 0.01, bagisOrani: 0.03 },
  },
  {
    id: "kutsal_miras", seviye: 5, simge: "🏛️",
    ad: { tr: "Kutsal Miras", en: "Sacred Heritage" },
    aciklama: { tr: "Vergi −5 puan; bina kapasitesi ×1,25.", en: "Tax −5 points; building capacity ×1.25." },
    etki: { vergiPuan: 0.05, kapasite: 1.25 },
  },
  {
    id: "kutsal_savas_cagrisi", seviye: 5, simge: "⚡", fanatik: true,
    ad: { tr: "Kutsal Savaş Çağrısı", en: "Call to Holy War" },
    aciklama: { tr: "Fanatiklik +10; bağış birimi +%15; aşırılık riski ×1,5.", en: "Zealotry +10; donation size +15%; extremism risk ×1.5." },
    etki: { fanatiklik: 10, bagisBirimi: 0.15, asiriRisk: 1.5 },
  },
];

export function ogretiGetir(id: string): OgretiTanimi | undefined {
  return OGRETILER.find((o) => o.id === id);
}

export function ogretiSecenekleri(seviye: number): OgretiTanimi[] {
  return OGRETILER.filter((o) => o.seviye === seviye);
}

export interface OgretiToplami {
  bagisOrani: number;
  bagisBirimi: number;
  gelmeOrani: number;
  inanan: number;
  ahlak: number;
  masrafIndirimi: number;
  yardimEtkisi: number;
  yardimMaliyet: number;
  koruma: number;
  saldiriHasari: number;
  otorite: number;
  okulMezun: number;
  yetenek: number;
  faaliyet: Record<FaaliyetId, number>;
  vergiPuan: number;
  kapasite: number;
  fanatikKacis: number;
  asiriRisk: number;
  altKitle: number;
}

/** Seçilmiş öğretilerin toplam etkisi (toplamsal alanlar toplanır, çarpımsal alanlar çarpılır). */
export function ogretiToplami(idler: string[]): OgretiToplami {
  const t: OgretiToplami = {
    bagisOrani: 0, bagisBirimi: 0, gelmeOrani: 0, inanan: 0, ahlak: 0, masrafIndirimi: 0, yardimEtkisi: 1, yardimMaliyet: 0,
    koruma: 0, saldiriHasari: 1, otorite: 0, okulMezun: 0, yetenek: 0,
    faaliyet: { tovbe: 1, ritual: 1, sifa: 1, egitim: 1, emanet: 1 },
    vergiPuan: 0, kapasite: 1, fanatikKacis: 1, asiriRisk: 1, altKitle: 1,
  };
  for (const id of idler) {
    const o = ogretiGetir(id);
    if (!o) continue;
    const e = o.etki;
    t.bagisOrani += e.bagisOrani ?? 0;
    t.bagisBirimi += e.bagisBirimi ?? 0;
    t.gelmeOrani += e.gelmeOrani ?? 0;
    t.inanan += e.inanan ?? 0;
    t.ahlak += e.ahlak ?? 0;
    t.masrafIndirimi += e.masrafIndirimi ?? 0;
    t.yardimEtkisi *= e.yardimEtkisi ?? 1;
    t.yardimMaliyet += e.yardimMaliyet ?? 0;
    t.koruma += e.koruma ?? 0;
    t.saldiriHasari *= e.saldiriHasari ?? 1;
    t.otorite += e.otorite ?? 0;
    t.okulMezun += e.okulMezun ?? 0;
    t.yetenek += e.yetenek ?? 0;
    for (const [k, v] of Object.entries(e.faaliyet ?? {}) as [FaaliyetId, number][]) t.faaliyet[k] *= v;
    t.vergiPuan += e.vergiPuan ?? 0;
    t.kapasite *= e.kapasite ?? 1;
    t.fanatikKacis *= e.fanatikKacis ?? 1;
    t.asiriRisk *= e.asiriRisk ?? 1;
    t.altKitle *= e.altKitle ?? 1;
  }
  return t;
}
