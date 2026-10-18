import type { CharacterState, SonucEtkisi } from "../types";
import { hayvanBonusVar } from "../data/evcilHayvanlar";

/**
 * Evcil hayvan pasif bonuslarının OLAY sonucuna uygulanan kısmı (jitter'dan sonra,
 * state'e yazılmadan önce çağrılır). Ana seçim yolu ve sosyalleşme mekânı yolu aynı
 * fonksiyonu kullanır; kalan bonuslar yıllık/formül noktalarında (stateManager,
 * olaySecici, gameEngine) ilgili hesaba bağlıdır — bkz. CLAUDE.md §45.
 */
export function hayvanOlayEtkisiUygula(state: CharacterState, etki: SonucEtkisi, kategori: string): void {
  if (hayvanBonusVar(state, "kedi_mutluluk") && etki.mutluluk && etki.mutluluk < 0) {
    etki.mutluluk = Math.round(etki.mutluluk * 0.75);
  }
  if (hayvanBonusVar(state, "kopek_saglik") && etki.saglik && etki.saglik < 0) {
    etki.saglik = Math.round(etki.saglik * 0.8);
  }
  if (hayvanBonusVar(state, "at_ticaret") && kategori === "ticaret" && etki.para && etki.para > 0) {
    etki.para = Math.round(etki.para * 1.07);
  }
}

/** Karga (istihbarat): mesleğe uygun kategoride kazanılan kariyer puanı çarpanı. */
export function hayvanKariyerCarpani(state: CharacterState): number {
  return hayvanBonusVar(state, "karga_istihbarat") ? 1.25 : 1;
}

/** Kedi (şans) ve Karga/Şahin: karanlık işlerin başarı şansına eklenen puan. */
export function hayvanKotuIsPuani(state: CharacterState, yatkinlikKategorisi: string): number {
  let puan = 0;
  if (hayvanBonusVar(state, "kedi_sans")) puan += 5;
  if (hayvanBonusVar(state, "karga_karanlik")) puan += 6;
  if (hayvanBonusVar(state, "sahin_saldiri") && yatkinlikKategorisi === "savas") puan += 4;
  return puan;
}

/** At (enerji): aile etkileşimi bekleme süresinden düşülen yıl (en az 1 yıl kalır). */
export function hayvanAileBeklemeIndirimi(state: CharacterState): number {
  return hayvanBonusVar(state, "at_enerji") ? 1 : 0;
}
