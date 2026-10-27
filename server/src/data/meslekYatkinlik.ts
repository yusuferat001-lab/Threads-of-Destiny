import { Cag, CharacterState, Kategori } from "../types";

/**
 * "Mesleğe Yatkınlık Kademeleri" (2026-09 sonu, kullanıcı isteği).
 *
 * Oyuncunun seçtiği mesleğin kendi kategorisindeki (savas/ticaret/din/zanaat,
 * bkz. stateManager.ts MESLEK_KATEGORI) TOPLAM yatkınlık puanı, meslek
 * seçilirken (`mesleğiSec`) BİR KEZ bu 4 kademeden birine yerleştirilir ve
 * kalıcı bir unvan + üç kalıcı çarpan doğurur (bkz. CharacterState
 * `meslek_yatkinlik_*` alanları). Kademe daha sonra `yatkinliklar` değişse
 * bile YENİDEN HESAPLANMAZ — doğuştan gelen bir yetenek damgası gibi sabit
 * kalır ("Doğuştan Savaşçı" olan biri sonradan "sıradan" olmaz).
 *
 * AYRICA aynı 4 eşik, herhangi bir olayın KENDİ kategorisindeki GÜNCEL
 * yatkınlığa göre, o olayın başarı şansına da küçük bir YÜZDESEL bonus/malus
 * uygular (bkz. `yatkinlikZarBonusOrani`, olaySecici.ts'te kullanılır). Eskiden
 * yatkınlık doğrudan baseBasariSansi'ye TOPLANIYORDU (±30 puana kadar); bu artık
 * kaldırıldı — oyuncu bu ham sayıyı hiçbir ekranda görmediği için (yatkınlık
 * dökümü yalnız kaynak başına küçük delta'lar gösterir, toplamı göstermez),
 * şansı bu kadar büyük oynatması "görünmez ama hissedilen" bir haksızlık
 * yaratıyordu. Yeni sistemde meslek yatkınlığı daha çok EVENT GATING'e
 * (bazı olaylar sadece belirli kademede çıkar, bazı şıklar kilitlenir —
 * `OlayTanimi.min/maxMeslekYatkinlikSeviye`, `OlaySecenegi.min/maxMeslekYatkinlikSeviye`)
 * ve kalıcı maaş/tecrübe çarpanlarına yansıyor; ham zar şansına etkisi bilinçli
 * olarak küçük tutuldu.
 */
export type YatkinlikTierId = "kotu" | "notr" | "iyi" | "cokiyi" | "mukemmel";

export interface YatkinlikTierEtkisi {
  /** Olay başarı şansına (baseBasariSansi) uygulanan oransal çarpan katkısı (ör. -0.15 → ×0.85). */
  zarBonusu: number;
  /** Yıllık maaşa uygulanan oransal çarpan katkısı (maasCarpanKalemleri "kariyer" grubunda ayrı bir kalem). */
  maasCarpani: number;
  /** kariyer_puani kazanç hızına (pasif kıdem + kendi kategorindeki başarı bonusu) uygulanan oransal katkı. */
  tecrubeHizi: number;
  /** v27: işletmeli üç meslekte (Tüccar/Zanaatkâr/Din) yıllık müşteri/inanan büyümesine eklenen TAM SAYI (gelire DEĞİL, müşteriye işler). */
  musteriBuyumesi: number;
}

/**
 * v10 — 5 kademe (Çok İyi eklendi):
 *  <= -5  (Kötü)      → Zar -%15 · Maaş -%6  · Tecrübe -%15 · Müşteri -1/yıl
 *  -4..+4 (Nötr)       → etkisiz (%0), ekranda hiç metin gösterilmez
 *  +5..+11 (İyi)       → Zar +%10 · Maaş +%2  · Tecrübe +%7  · Müşteri +1/yıl
 *  +12..+19 (Çok İyi)  → Zar +%15 · Maaş +%4  · Tecrübe +%11 · Müşteri +1/yıl
 *  >= +20 (Mükemmel)   → Zar +%20 · Maaş +%10 · Tecrübe +%15 · Müşteri +2/yıl (+ tek seferlik şöhret bonusu)
 * Maaş çarpanı yalnız Asker'in eski maaş formülünde etkilidir; işletmeli üç meslekte gelire değil müşteri büyümesine işler.
 */
export const YATKINLIK_TIER_ETKILERI: Record<YatkinlikTierId, YatkinlikTierEtkisi> = {
  kotu: { zarBonusu: -0.15, maasCarpani: -0.06, tecrubeHizi: -0.15, musteriBuyumesi: -1 },
  notr: { zarBonusu: 0, maasCarpani: 0, tecrubeHizi: 0, musteriBuyumesi: 0 },
  iyi: { zarBonusu: 0.1, maasCarpani: 0.02, tecrubeHizi: 0.07, musteriBuyumesi: 1 },
  cokiyi: { zarBonusu: 0.15, maasCarpani: 0.04, tecrubeHizi: 0.11, musteriBuyumesi: 1 },
  mukemmel: { zarBonusu: 0.2, maasCarpani: 0.1, tecrubeHizi: 0.15, musteriBuyumesi: 2 },
};

/** Mükemmel kademeye ulaşan bir karakterin meslek seçiminde bir kereliğine kazandığı ekstra şöhret ("yeteneğin daha ilk günden fark edildi"). */
export const YATKINLIK_MUKEMMEL_UN_BONUSU = 8;

/** Kademe id'sini 1 (kötü) .. 5 (mükemmel) sayısına çevirir — event/seçenek gating filtreleri (min/maxMeslekYatkinlikSeviye) bu sayıyı kullanır. */
export const YATKINLIK_TIER_SEVIYE: Record<YatkinlikTierId, 1 | 2 | 3 | 4 | 5> = {
  kotu: 1,
  notr: 2,
  iyi: 3,
  cokiyi: 4,
  mukemmel: 5,
};

/** Seviye sayısından (1-5) kademe id'si. */
export function yatkinlikSeviyedenTier(seviye: number | null | undefined): YatkinlikTierId {
  switch (seviye) {
    case 1:
      return "kotu";
    case 3:
      return "iyi";
    case 4:
      return "cokiyi";
    case 5:
      return "mukemmel";
    default:
      return "notr";
  }
}

/** Karakterin mesleğe yatkınlığından gelen yıllık müşteri/inanan artışı (tam sayı; işletmeli üç meslek). */
export function yatkinlikMusteriBuyumesi(state: CharacterState): number {
  return YATKINLIK_TIER_ETKILERI[yatkinlikSeviyedenTier(state.meslek_yatkinlik_seviyesi)].musteriBuyumesi;
}

/** Yatkınlık puanını 5 kademeden birine yerleştirir: <=-5 kötü, -4..4 nötr, 5..11 iyi, 12..19 çok iyi, >=20 mükemmel. */
export function yatkinlikTierBelirle(deger: number): YatkinlikTierId {
  if (deger <= -5) return "kotu";
  if (deger >= 20) return "mukemmel";
  if (deger >= 12) return "cokiyi";
  if (deger >= 5) return "iyi";
  return "notr";
}

/**
 * Herhangi bir kategorideki GÜNCEL yatkınlığın, o kategorideki bir olayın
 * başarı şansına uygulayacağı küçük oransal bonus/malus. Karakterin kendi
 * mesleğiyle sınırlı değildir — hangi kategoride olay çıkarsa (savaş, ticaret,
 * din, siyaset, sağlık, sosyal, zanaat) o kategorinin GÜNCEL yatkınlığı kullanılır.
 */
export function yatkinlikZarBonusOrani(state: CharacterState, kategori: Kategori): number {
  const deger = state.yatkinliklar[kategori] ?? 0;
  return YATKINLIK_TIER_ETKILERI[yatkinlikTierBelirle(deger)].zarBonusu;
}

interface MeslekYatkinlikUnvanTakimi {
  kotu: string;
  notr: string;
  iyi: string;
  cokiyi: string;
  mukemmel: string;
}

/** Orta Çağ unvanları — kullanıcının verdiği isimler birebir kullanıldı. */
const ORTA_CAG_UNVANLAR: Record<string, MeslekYatkinlikUnvanTakimi> = {
  Asker: { kotu: "Savaş Korkusu", notr: "Acemi Çaylak", iyi: "Kılıca Yatkın", cokiyi: "Yiğit Savaşçı", mukemmel: "Doğuştan Savaşçı" },
  Tüccar: {
    kotu: "Pazarlıktan Anlamaz",
    notr: "Sıradan Satıcı",
    iyi: "Ticari Zekası Parlak",
    cokiyi: "Keskin Pazarlıkçı",
    mukemmel: "Şeytan Tüyü",
  },
  "Din Adamı": {
    kotu: "Tam Bir Günahkâr",
    notr: "Arada Kalmış",
    iyi: "İnancı Sağlam",
    cokiyi: "Halkın Sevdiği Vaiz",
    mukemmel: "Seçilmiş Kişi",
  },
  "Zanaatkâr": {
    kotu: "Malzeme İsrafı",
    notr: "Sıradan Çırak",
    iyi: "Eli Becerikli",
    cokiyi: "Parmakları Altın",
    mukemmel: "Hünerli Eller (Doğuştan Mucit)",
  },
};

/** Sanayi Devrimi unvanları — aynı 4 kademe, döneme uygun farklı isimler (kullanıcı: "isimleri farklı olabilir"). */
const SANAYI_UNVANLAR: Record<string, MeslekYatkinlikUnvanTakimi> = {
  Asker: { kotu: "Cepheden Kaçan", notr: "Sıradan Er", iyi: "Silaha Yatkın", cokiyi: "Gözü Pek Subay", mukemmel: "Doğuştan Komutan" },
  Tüccar: {
    kotu: "İşten Anlamaz",
    notr: "Vasat Esnaf",
    iyi: "Keskin İş Adamı",
    cokiyi: "Kurnaz Girişimci",
    mukemmel: "Doğuştan Sermayedar",
  },
  "Din Adamı": {
    kotu: "İnancı Sarsılmış",
    notr: "Sıradan Vaiz",
    iyi: "Vicdanı Güçlü",
    cokiyi: "Gönülleri Fetheden",
    mukemmel: "Kutsanmış Ruh",
  },
  "Zanaatkâr": { kotu: "Elinden İş Gelmez", notr: "Vasat İşçi", iyi: "Usta İşi", cokiyi: "Zanaatın Gözdesi", mukemmel: "Doğuştan Mühendis" },
};

/** Meslek seçilirken kademeye göre atanacak kalıcı (kanonik, TÜRKÇE) unvanı döner; tanımsız meslek/çağ için null. */
export function meslekYatkinlikUnvaniGetir(cag: Cag, meslek: string, tier: YatkinlikTierId): string | null {
  const takim = (cag === "Orta Çağ" ? ORTA_CAG_UNVANLAR : SANAYI_UNVANLAR)[meslek];
  return takim ? takim[tier] : null;
}

/** Test/analiz için: tüm meslek+çağ unvanlarının düz listesi (i18n kapsama kontrolü). */
export function tumMeslekYatkinlikUnvanlari(): string[] {
  const unvanlar = new Set<string>();
  for (const takim of [ORTA_CAG_UNVANLAR, SANAYI_UNVANLAR]) {
    for (const meslek of Object.values(takim)) {
      for (const unvan of Object.values(meslek)) unvanlar.add(unvan);
    }
  }
  return [...unvanlar];
}
