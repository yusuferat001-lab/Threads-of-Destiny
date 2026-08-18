import { secimUygula } from "../src/game/gameEngine";
import type { TepkiSonucu } from "../src/types";

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
