import { prisma } from "./prismaClient";
import { CharacterState } from "../types";

/** Oturumu (aktif ya da bitmiş) DB'ye yazar; server yeniden başlasa bile kaybolmaz. */
export async function oturumKaydet(state: CharacterState): Promise<void> {
  const veri = JSON.stringify(state);
  await prisma.session.upsert({
    where: { id: state.id },
    create: { id: state.id, data: veri, aktif: state.aktif },
    update: { data: veri, aktif: state.aktif },
  });
}

export async function oturumYukle(id: string): Promise<CharacterState | null> {
  const kayit = await prisma.session.findUnique({ where: { id } });
  if (!kayit) return null;
  return JSON.parse(kayit.data) as CharacterState;
}

/** Server açılışında in-memory önbelleği doldurmak için aktif oturumları döndürür. */
export async function aktifOturumlariYukle(): Promise<CharacterState[]> {
  const kayitlar = await prisma.session.findMany({ where: { aktif: true } });
  return kayitlar.map((k) => JSON.parse(k.data) as CharacterState);
}

/**
 * Bitmiş (ölümle sonuçlanmış) oturumları döndürür — server açılışında skoru hâlâ
 * kaydedilmemiş geçmiş oyunları liderlik tablosuna geçirmek için (`gecmisSkorlariKaydet`).
 * 7 günlük temizlik yüzünden yalnız son ~1 haftanın bitmiş oturumları burada olur.
 */
export async function bitmisOturumlariYukle(): Promise<CharacterState[]> {
  const kayitlar = await prisma.session.findMany({ where: { aktif: false } });
  return kayitlar.map((k) => JSON.parse(k.data) as CharacterState);
}

export async function oturumSil(id: string): Promise<void> {
  await prisma.session.deleteMany({ where: { id } });
}

/**
 * Oturumun oluşturulmasından bu yana geçen gerçek-dünya saniye sayısı (metrik §32
 * "oynanan süre" için). Kayıt yoksa / hata olursa 0 döner — metrik yazımı bunun
 * yüzünden düşmesin.
 */
export async function oturumYasiSaniye(id: string): Promise<number> {
  try {
    const kayit = await prisma.session.findUnique({ where: { id } });
    if (!kayit?.createdAt) return 0;
    return Math.max(0, Math.round((Date.now() - kayit.createdAt.getTime()) / 1000));
  } catch {
    return 0;
  }
}

/** Belirli bir süreden eski, bitmiş oturumları siler (RAM/DB büyümesini sınırlar). */
export async function eskiOturumlariTemizle(oncekiTarih: Date): Promise<number> {
  const sonuc = await prisma.session.deleteMany({
    where: { aktif: false, updatedAt: { lt: oncekiTarih } },
  });
  return sonuc.count;
}
