import { prisma } from "./prismaClient";
import { CharacterState } from "../types";
import { hesaplaSkor, gayrimenkulDegeriHesapla, paraYuvarla } from "../game/stateManager";
import { amacSkorCarpani } from "../data/hayatAmaclari";

export async function skorKaydet(state: CharacterState, isim: string) {
  const skor = hesaplaSkor(state);
  const amacTamamlandi =
    (state.hayat_amaclari ?? []).some((a) => a.tamamlandi) || (state.hayat_amaci?.tamamlandi ?? false);
  // hesaplaSkor'daki carpan mantığıyla birebir aynı (§18): yeni 3'lü sistemde
  // amacSkorCarpani (toplamsal, 1.5/2 tavan ×5); eski tekil `hayat_amaci`
  // kayıt/test fallback'inde sabit ×5.
  const amacCarpani =
    (state.hayat_amaclari?.length ?? 0) > 0
      ? amacSkorCarpani(state)
      : state.hayat_amaci?.tamamlandi
        ? 5
        : 1;
  // "en_zengin" sıralaması net serveti ödüllendirsin (madde 25): Score.para
  // artık salt nakit değil, nakit + gayrimenkul değeri — mülke servet bağlamış
  // bir oyuncu liderlik tablosunda cezalanmasın.
  const netServet = paraYuvarla(state.para + gayrimenkulDegeriHesapla(state));
  return prisma.score.create({
    data: {
      isim,
      skor,
      meslek: state.meslek,
      rutbe: state.rutbe,
      cag: state.cag,
      bolge: state.bolge,
      yerlesim: state.yerlesim,
      kisilik: state.kisilik.join(", "),
      olum_nedeni: state.olum_nedeni ?? "Bilinmiyor",
      yas: state.yas,
      para: netServet,
      un: state.un,
      unvanlar: state.unvanlar.join(", "),
      efsanevi_olum: state.efsanevi_olum ?? "",
      // "en az bir kişisel amaç tamamlandı mı" (eski tekil alan fallback'iyle).
      hayat_amaci_tamamlandi: amacTamamlandi,
      amac_carpani: amacCarpani,
    },
  });
}

export type SiralamaTuru = "genel" | "en_zengin" | "en_unlu" | "en_uzun_yasayan";
export type SiralamaDonemi = "tumZaman" | "hafta";

/** Haftanın başlangıcını (Pazartesi 00:00 UTC) döner — liderlik tablosu haftalık sıfırlanması bu sınırı kullanır. */
export function haftaBaslangici(simdi: Date = new Date()): Date {
  const gun = simdi.getUTCDay(); // 0=Pazar..6=Cumartesi
  const pazartesiyeUzaklik = (gun + 6) % 7; // Pazartesi=0, Salı=1, ..., Pazar=6
  const baslangic = new Date(
    Date.UTC(simdi.getUTCFullYear(), simdi.getUTCMonth(), simdi.getUTCDate() - pazartesiyeUzaklik)
  );
  return baslangic;
}

export async function skorTablosuGetir(
  tur: SiralamaTuru = "genel",
  limit = 15,
  donem: SiralamaDonemi = "tumZaman"
) {
  const orderBy =
    tur === "en_zengin"
      ? { para: "desc" as const }
      : tur === "en_unlu"
        ? { un: "desc" as const }
        : tur === "en_uzun_yasayan"
          ? { yas: "desc" as const }
          : { skor: "desc" as const };

  return prisma.score.findMany({
    where: donem === "hafta" ? { createdAt: { gte: haftaBaslangici() } } : undefined,
    orderBy,
    take: limit,
  });
}
