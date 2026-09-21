/**
 * hesaplaSkorKirilimi (sunucu, server/src/game/stateManager.ts) ile birebir aynı formül —
 * elle senkronize edilen kopya (§24 deseni). İstemcide gayrimenkul değeri hesaplanmadığı
 * için servet ≈ nakit (state.para) kullanılır; diğer tüm eksenler (ahlak/şöhret/mutluluk/
 * rütbe/etiketler) state'te zaten tam olarak mevcut, sunucuyla birebir aynı sonucu üretir.
 */
import type { CharacterState } from './types';

const SKOR_RUTBE_PUANI = [625, 1500, 2625, 4000, 5625] as const;
const SKOR_TIK_PUANI = 3000;
const SKOR_SOHRET_CARPAN = 300;
const SKOR_AHLAK_CARPAN = 200;
const SKOR_MUTLULUK_CARPAN = 100;

export interface SkorKirilimi {
  servetPuani: number;
  sohretPuani: number;
  ahlakPuani: number;
  mutlulukPuani: number;
  rutbePuani: number;
  tikPuani: number;
  tikSayisi: number;
  sarayda: boolean;
  yolculukTamamlandi: boolean;
  gizemliEsyaSahibi: boolean;
  temelToplam: number;
  amacCarpani: number;
  skor: number;
}

function amacCarpaniHesapla(state: CharacterState): number {
  const toplam = (state.hayat_amaclari ?? [])
    .filter((a) => a.tamamlandi)
    .reduce((s, a) => s + (a.bonus ?? 0), 0);
  if (toplam > 0) return Math.max(1, toplam);
  return state.hayat_amaci?.tamamlandi ? 5 : 1; // eski kayıt fallback
}

export function hesaplaSkorKirilimi(state: CharacterState): SkorKirilimi {
  const servet = state.para; // istemcide gayrimenkul değeri yok; nakit yeterince iyi bir yaklaşım
  const servetPuani = servet > 0 ? Math.round(servet * (state.yas / 2)) : 0;
  const sohretPuani = Math.round(Math.max(state.un, 0) * SKOR_SOHRET_CARPAN);
  const ahlakPuani = Math.round(Math.max(state.ahlak, 0) * SKOR_AHLAK_CARPAN);
  const mutlulukPuani = Math.round(Math.max(state.mutluluk, 0) * SKOR_MUTLULUK_CARPAN);
  const rutbeIndeks = Math.min(Math.max(state.rutbe_seviye, 1), 5) - 1;
  const rutbePuani = SKOR_RUTBE_PUANI[rutbeIndeks];
  const sarayda = state.etiketler.includes('sarayda');
  const yolculukTamamlandi = state.etiketler.includes('yolculuk_tamamlandi');
  const gizemliEsyaSahibi = state.etiketler.some((e) => e.startsWith('envanter:') || e.startsWith('esya:'));
  const tikSayisi = (sarayda ? 1 : 0) + (yolculukTamamlandi ? 1 : 0) + (gizemliEsyaSahibi ? 1 : 0);
  const tikPuani = tikSayisi * SKOR_TIK_PUANI;
  const temelToplam = servetPuani + sohretPuani + ahlakPuani + mutlulukPuani + rutbePuani + tikPuani;
  const amacCarpani = amacCarpaniHesapla(state);
  const skor = Math.round(temelToplam * amacCarpani);
  return {
    servetPuani,
    sohretPuani,
    ahlakPuani,
    mutlulukPuani,
    rutbePuani,
    tikPuani,
    tikSayisi,
    sarayda,
    yolculukTamamlandi,
    gizemliEsyaSahibi,
    temelToplam,
    amacCarpani,
    skor,
  };
}

export function hesaplaSkor(state: CharacterState): number {
  return hesaplaSkorKirilimi(state).skor;
}
