import { prisma } from "./prismaClient";
import { CharacterState } from "../types";
import { hesaplaSkor, gayrimenkulDegeriHesapla, paraYuvarla } from "../game/stateManager";
import { haftaAraligiHesapla } from "../utils/zaman";

export async function skorKaydet(state: CharacterState, isim: string) {
  const skor = hesaplaSkor(state);
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
      hayat_amaci_tamamlandi:
        (state.hayat_amaclari ?? []).some((a) => a.tamamlandi) || (state.hayat_amaci?.tamamlandi ?? false),
    },
  });
}

export type SiralamaTuru = "genel" | "en_zengin" | "en_unlu" | "en_uzun_yasayan";
export type SiralamaDonemi = "genel" | "haftalik";

/** "haftalik" dönem, `donem`'e göre limit vermezsen top **10**; "genel" (tüm-zamanlar) top **15** (§18). */
export async function skorTablosuGetir(
  tur: SiralamaTuru = "genel",
  donem: SiralamaDonemi = "genel",
  limit?: number,
) {
  const orderBy =
    tur === "en_zengin"
      ? { para: "desc" as const }
      : tur === "en_unlu"
        ? { un: "desc" as const }
        : tur === "en_uzun_yasayan"
          ? { yas: "desc" as const }
          : { skor: "desc" as const };

  const effectiveLimit = limit ?? (donem === "haftalik" ? 10 : 15);
  const where =
    donem === "haftalik"
      ? (() => {
          const { baslangic, bitis } = haftaAraligiHesapla();
          return { createdAt: { gte: baslangic, lt: bitis } };
        })()
      : undefined;

  return prisma.score.findMany({
    where,
    orderBy,
    take: effectiveLimit,
  });
}
