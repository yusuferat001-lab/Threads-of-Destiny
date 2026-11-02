import { secimUygula } from "../src/game/gameEngine";
import type { CharacterState, TepkiSonucu } from "../src/types";
import { askerGucleri } from "../src/data/pazar";

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
 * Testlerde oyuncunun pazar payını doğrudan kurar. Tüccar/Zanaatkâr/Din Adamı'nda pay `meslek_musteri / pazar_musteri`;
 * Asker'de askerî güce bağlıdır (güç / (güç + rakipler + diğer ordular)), bu yüzden önbellekteki `birlik.guc` ayarlanır.
 */
export function payiAyarla(state: CharacterState, pay: number): void {
  if (state.meslek === "Asker" && state.isletme?.birlik) {
    const g = askerGucleri(state);
    const digerleri = g.rakip + g.diger;
    state.isletme.birlik.guc = pay >= 1 ? digerleri * 1000 : (pay * digerleri) / (1 - pay);
    return;
  }
  state.meslek_musteri = state.pazar_musteri * pay;
}
