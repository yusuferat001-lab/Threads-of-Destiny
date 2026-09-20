import { prisma } from "./prismaClient";

/**
 * Cihaz (istemci_id) bazlı çapraz-hayat olay geçmişi deposu.
 *
 * Amaç: aynı tarayıcıdan/cihazdan art arda oynanan FARKLI hayatlarda hep aynı
 * olayların çıkması şikayetini azaltmak. Tek bir hayat içindeki tekrar önleme
 * zaten `state.gecmis_olaylar` + `olaySecici.ts`'teki `sonKTekrarOnlemeHesapla`
 * penceresiyle çözülmüştü (§12); bu depo aynı korumayı hayatlar ARASI'na taşır.
 *
 * Ateşle-unut felsefesi (metrik/geri bildirim depolarıyla aynı): Prisma patlarsa
 * oyun akışı etkilenmez, sadece `console.error`.
 */

/** Bir istemcide en fazla bu kadar TEKİL olay id'si tutulur (en yeniler kalır). */
export const ISTEMCI_GECMIS_MAKS = 400;

/** Bir istemcinin son hayatlarında görülen olay id'lerini (kronolojik, en yeni sonda) döner. Kayıt yoksa/hata olursa []. */
export async function istemciGecmisiOku(istemciId: string): Promise<string[]> {
  if (!istemciId) return [];
  try {
    const kayit = await prisma.istemciOlayGecmisi.findUnique({ where: { istemciId } });
    if (!kayit) return [];
    const ayristirilmis = JSON.parse(kayit.olaylar);
    return Array.isArray(ayristirilmis) ? ayristirilmis.filter((x) => typeof x === "string") : [];
  } catch (err) {
    console.error("istemciGecmisiOku hata:", err);
    return [];
  }
}

/**
 * Bir hayat biterken (ölümde) çağrılır: o hayatta görülen olay id'lerini
 * istemcinin kalıcı geçmişiyle birleştirir, tekilleştirir (en son görülme kazanır)
 * ve `ISTEMCI_GECMIS_MAKS`'a kırpar. Ateşle-unut; hata oyun akışını etkilemez.
 */
export async function istemciGecmisiGuncelle(
  istemciId: string | null | undefined,
  buOmurGorulenler: string[]
): Promise<void> {
  if (!istemciId || buOmurGorulenler.length === 0) return;
  try {
    const mevcut = await istemciGecmisiOku(istemciId);
    const birlesik = [...mevcut, ...buOmurGorulenler];
    // Tekilleştir — bir id birden fazla kez geçiyorsa EN SON görülme sırası kazansın
    // (ters taraftan tara, ilk rastlanan en yenisidir), sonra kronolojik sıraya döndür.
    const gorulmus = new Set<string>();
    const tersTekil: string[] = [];
    for (let i = birlesik.length - 1; i >= 0; i--) {
      const id = birlesik[i];
      if (!gorulmus.has(id)) {
        gorulmus.add(id);
        tersTekil.push(id);
      }
    }
    const tekil = tersTekil.reverse().slice(-ISTEMCI_GECMIS_MAKS);
    await prisma.istemciOlayGecmisi.upsert({
      where: { istemciId },
      create: { istemciId, olaylar: JSON.stringify(tekil) },
      update: { olaylar: JSON.stringify(tekil) },
    });
  } catch (err) {
    console.error("istemciGecmisiGuncelle hata:", err);
  }
}
