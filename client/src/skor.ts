/**
 * hesaplaSkorKirilimi (sunucu, server/src/game/stateManager.ts) ile birebir aynı formül —
 * elle senkronize edilen kopya (§24 deseni). Servet = nakit + gayrimenkul değeri; mülk
 * kataloğu (taban fiyatlar) ve enflasyon formülü de burada küçük, bağımsız bir kopya
 * olarak tutuluyor (server/src/data/mulkler.ts + stateManager.ts enflasyonCarpani ile
 * birebir aynı sabitler) — diğer tüm eksenler (ahlak/şöhret/mutluluk/rütbe/etiketler)
 * state'te zaten tam olarak mevcut, sunucuyla birebir aynı sonucu üretir.
 */
import type { CharacterState, MulkTuru } from './types';

const SKOR_RUTBE_PUANI = [625, 1500, 2625, 4000, 5625] as const;
const SKOR_TIK_PUANI = 3000;
const SKOR_ISLETME_CARPAN = 25; // müşteri sayısı × 25, server/stateManager.ts ile birebir aynı
const SKOR_SOHRET_CARPAN = 300;
const SKOR_AHLAK_CARPAN = 200;
const SKOR_MUTLULUK_CARPAN = 100;
// Faz 5 (2026-09 sonu) — tek seferlik başarı-olayı bonusları, server/stateManager.ts ile birebir aynı.
const SKOR_KOMIK_OLUM_BASARILI_RISK_PUANI = 3000;
const SKOR_KOMIK_OLUM_ILE_OLDU_PUANI = 2000;
const SKOR_YOLCULUK_TAMAMLAMA_BONUS_PUANI = 2000;
const SKOR_VEBA_HAYATTA_KALMA_PUANI = 2000;
const SKOR_HAPIS_BASARILI_KACIS_PUANI = 2000;

// server/src/data/mulkler.ts — taban_maliyet değerleriyle birebir aynı.
const MULK_TABAN_MALIYET: Record<MulkTuru, number> = {
  kucuk_tarla: 50,
  ciftlik: 80,
  demirci: 130,
  han: 170,
  kervan: 220,
  karaborsa: 320,
};

// server/src/game/stateManager.ts ENFLASYON_ORANI_YILLIK ile birebir aynı.
const ENFLASYON_ORANI_YILLIK: Record<CharacterState['cag'], number> = {
  'Orta Çağ': 0.01,
  'Sanayi Devrimi': 0.02,
};

function paraYuvarla(x: number): number {
  return Math.round(x * 100) / 100;
}

function enflasyonCarpani(state: CharacterState): number {
  const gecenYil = Math.max(0, state.yil - state.baslangic_yili);
  const oran = ENFLASYON_ORANI_YILLIK[state.cag] ?? 0.01;
  return Math.pow(1 + oran, gecenYil);
}

/** gayrimenkulDegeriHesapla (sunucu) ile birebir aynı: sahip olunan mülklerin taban
 * fiyatlarının o anki enflasyonla ölçeklenmiş toplamı. */
function gayrimenkulDegeriHesapla(state: CharacterState): number {
  if (!state.mulkler || state.mulkler.length === 0) return 0;
  const enflasyon = enflasyonCarpani(state);
  return state.mulkler.reduce(
    (toplam, tur) => toplam + paraYuvarla((MULK_TABAN_MALIYET[tur] ?? 0) * enflasyon),
    0
  );
}

export interface SkorKirilimi {
  servetPuani: number;
  sohretPuani: number;
  ahlakPuani: number;
  mutlulukPuani: number;
  rutbePuani: number;
  isletmePuani: number;
  tikPuani: number;
  tikSayisi: number;
  sarayda: boolean;
  yolculukTamamlandi: boolean;
  gizemliEsyaSahibi: boolean;
  basariOlayiPuani: number;
  temelToplam: number;
  amacCarpani: number;
  skor: number;
}

function amacCarpaniHesapla(state: CharacterState): number {
  // server/src/game/stateManager.ts hesaplaSkorKirilimi ile birebir aynı ayrım:
  // hangi sistemin kullanılacağı `hayat_amaclari` dizisinin VARLIĞINA göre seçilir
  // (tamamlanan amaç sayısına göre değil) — aksi halde "amaçları var ama hiçbiri
  // henüz tamamlanmadı" durumunda yanlışlıkla eski tekil hayat_amaci fallback'ine düşülebilir.
  if ((state.hayat_amaclari?.length ?? 0) > 0) {
    const toplam = state.hayat_amaclari
      .filter((a) => a.tamamlandi)
      .reduce((s, a) => s + (a.bonus ?? 0), 0);
    return Math.max(1, toplam);
  }
  return state.hayat_amaci?.tamamlandi ? 5 : 1; // eski kayıt fallback
}

export function hesaplaSkorKirilimi(state: CharacterState): SkorKirilimi {
  const servet = state.para + gayrimenkulDegeriHesapla(state);
  const servetPuani = servet > 0 ? Math.round(servet * (state.yas / 2)) : 0;
  const sohretPuani = Math.round(Math.max(state.un, 0) * SKOR_SOHRET_CARPAN);
  const ahlakPuani = Math.round(Math.max(state.ahlak, 0) * SKOR_AHLAK_CARPAN);
  const mutlulukPuani = Math.round(Math.max(state.mutluluk, 0) * SKOR_MUTLULUK_CARPAN);
  const rutbeIndeks = Math.min(Math.max(state.rutbe_seviye, 1), 5) - 1;
  const rutbePuani = SKOR_RUTBE_PUANI[rutbeIndeks];
  const isletmePuani = Math.round(Math.max(state.meslek_musteri ?? 0, 0) * SKOR_ISLETME_CARPAN);
  const sarayda = state.etiketler.includes('sarayda');
  const yolculukTamamlandi = state.etiketler.includes('yolculuk_tamamlandi');
  const gizemliEsyaSahibi = state.etiketler.some((e) => e.startsWith('envanter:') || e.startsWith('esya:'));
  // Yolculuk yalnız +2000 tamamlama bonusuyla sayılır (sunucuyla aynı, çifte sayılmasın).
  const tikSayisi = (sarayda ? 1 : 0) + (gizemliEsyaSahibi ? 1 : 0);
  const tikPuani = tikSayisi * SKOR_TIK_PUANI;
  const basariOlayiPuani =
    (state.komik_olum_basarili_risk ? SKOR_KOMIK_OLUM_BASARILI_RISK_PUANI : 0) +
    (!state.komik_olum_basarili_risk && state.komik_olum_ile_oldu ? SKOR_KOMIK_OLUM_ILE_OLDU_PUANI : 0) +
    (yolculukTamamlandi ? SKOR_YOLCULUK_TAMAMLAMA_BONUS_PUANI : 0) +
    (state.veba_hayatta_kaldi ? SKOR_VEBA_HAYATTA_KALMA_PUANI : 0) +
    (state.hapis_basarili_kacis ? SKOR_HAPIS_BASARILI_KACIS_PUANI : 0);
  const temelToplam =
    servetPuani + sohretPuani + ahlakPuani + mutlulukPuani + rutbePuani + isletmePuani + tikPuani + basariOlayiPuani;
  const amacCarpani = amacCarpaniHesapla(state);
  const skor = Math.round(temelToplam * amacCarpani);
  return {
    servetPuani,
    sohretPuani,
    ahlakPuani,
    mutlulukPuani,
    rutbePuani,
    isletmePuani,
    tikPuani,
    tikSayisi,
    sarayda,
    yolculukTamamlandi,
    gizemliEsyaSahibi,
    basariOlayiPuani,
    temelToplam,
    amacCarpani,
    skor,
  };
}

export function hesaplaSkor(state: CharacterState): number {
  return hesaplaSkorKirilimi(state).skor;
}
