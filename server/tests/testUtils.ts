import { secimUygula } from "../src/game/gameEngine";
import type { CharacterState, TepkiSonucu } from "../src/types";

type SecimSonucu = Exclude<Awaited<ReturnType<typeof secimUygula>>, TepkiSonucu>;

/**
 * secimUygula bazen (seçilen seçeneğin onTepki'si varsa) zaman ilerletmeyen
 * bir ara_tepki ekranı döner. Bunu "ısrar et" (index 1) ile hemen çözüp
 * gerçek SecimSonucu'na ulaşır — gerçek client'ın da yaptığı gibi. Bekleyen
 * bir tepkiyi çözmeden yeni bir senaryoUret/secimUygula çağrısı yapmak,
 * oturumdaki bekleyenTepki'yi bayat bırakıp sonraki çağrıyı "Geçersiz seçenek
 * index'i" hatasına düşürebilir; bu yüzden akış testlerinde her secimUygula
 * çağrısı bu yardımcı üzerinden çözülmelidir.
 */
export async function secimUygulaVeCoz(id: string, secenekIndex: number): Promise<SecimSonucu> {
  const sonuc = await secimUygula(id, secenekIndex);
  if ("ara_tepki" in sonuc) {
    return secimUygula(id, 1) as Promise<SecimSonucu>;
  }
  return sonuc;
}

/**
 * Testlerde oyuncunun pazar payını doğrudan kurar. Tüccar/Zanaatkâr/Din Adamı'nda pay `meslek_musteri / pazar_musteri`.
 * Asker'de pazar payı yoktur (v67 Madde 7): rütbe askerî güce bağlıdır; bu yüzden `pay >= 0,1` tüm rütbe güç şartlarını karşılayan
 * bir güç (1000), daha azı şartı karşılamayan çok düşük bir güç (1) yazar.
 */
export function payiAyarla(state: CharacterState, pay: number): void {
  if (state.meslek === "Asker" && state.isletme?.birlik) {
    state.isletme.birlik.guc = pay >= 0.1 ? 1000 : 1;
    return;
  }
  state.meslek_musteri = state.pazar_musteri * pay;
}
