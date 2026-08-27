import { prisma } from "./prismaClient";
import { CharacterState } from "../types";
import { hesaplaSkor } from "../game/stateManager";

export async function skorKaydet(state: CharacterState, isim: string) {
  const skor = hesaplaSkor(state);
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
      para: state.para,
      un: state.un,
      unvanlar: state.unvanlar.join(", "),
      efsanevi_olum: state.efsanevi_olum ?? "",
      hayat_amaci_tamamlandi: state.hayat_amaci?.tamamlandi ?? false,
    },
  });
}

export type SiralamaTuru = "genel" | "en_zengin" | "en_unlu";

export async function skorTablosuGetir(tur: SiralamaTuru = "genel", limit = 20) {
  const orderBy =
    tur === "en_zengin"
      ? { para: "desc" as const }
      : tur === "en_unlu"
        ? { un: "desc" as const }
        : { skor: "desc" as const };

  return prisma.score.findMany({
    orderBy,
    take: limit,
  });
}
