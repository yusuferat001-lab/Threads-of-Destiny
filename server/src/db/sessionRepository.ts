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
  return guvenliCozumle(kayitlar);
}

/** JSON'u bozuk kayıtları atlar (loglar): tek satır tüm açılışı çökertmesin. */
function guvenliCozumle(kayitlar: { id: string; data: string }[]): CharacterState[] {
  const sonuc: CharacterState[] = [];
  for (const k of kayitlar) {
    try {
      sonuc.push(JSON.parse(k.data) as CharacterState);
    } catch (err) {
      console.error(`Bozuk oturum kaydı atlandı (${k.id}):`, err);
    }
  }
  return sonuc;
}

/**
 * Bitmiş (ölümle sonuçlanmış) oturumları döndürür — server açılışında skoru hâlâ
 * kaydedilmemiş geçmiş oyunları liderlik tablosuna geçirmek için (`gecmisSkorlariKaydet`).
 * 7 günlük temizlik yüzünden yalnız son ~1 haftanın bitmiş oturumları burada olur.
 */
export async function bitmisOturumlariYukle(): Promise<CharacterState[]> {
  const kayitlar = await prisma.session.findMany({ where: { aktif: false } });
  return guvenliCozumle(kayitlar);
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

/**
 * Belirli bir süreden eski oturumları siler (RAM/DB büyümesini sınırlar): bitmiş
 * oturumlar `oncekiTarih`'ten, terk edilmiş AKTİF oturumlar (verilirse)
 * `aktifOncekiTarih`'ten eskiyse silinir.
 */
export async function eskiOturumlariTemizle(oncekiTarih: Date, aktifOncekiTarih?: Date): Promise<number> {
  const kosullar: { aktif: boolean; updatedAt: { lt: Date } }[] = [{ aktif: false, updatedAt: { lt: oncekiTarih } }];
  if (aktifOncekiTarih) kosullar.push({ aktif: true, updatedAt: { lt: aktifOncekiTarih } });
  const sonuc = await prisma.session.deleteMany({ where: { OR: kosullar } });
  return sonuc.count;
}
