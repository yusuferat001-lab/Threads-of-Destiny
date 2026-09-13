/**
 * Miras (Legacy) — cihaz-yerel, hayattan bağımsız kalıcı meta-para.
 *
 * `basarimlar.ts`/`gecmisHayatlar.ts` ile aynı desen: yalnız `localStorage`'da
 * tutulur, sunucuya hiç gitmez. Ölümde kazanılan skorun küçük bir oranıyla
 * (~%1) ve günlük seri ödülleriyle (`gunlukSeri.ts`) birikir; kalıcı kozmetik
 * dolaptaki (`kozmetikDolabi.ts`) eşyaları satın almak için harcanır. Oyun-içi
 * `para` ile KARIŞMAZ — hiçbir stat/güç dengesine etkisi yoktur, salt
 * görünüm/koleksiyon ekonomisi.
 */
const BAKIYE_ANAHTAR = 'kader_carki_miras_bakiye';

function oku(): number {
  try {
    const ham = localStorage.getItem(BAKIYE_ANAHTAR);
    const n = ham ? parseInt(ham, 10) : 0;
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

function yaz(bakiye: number) {
  try {
    localStorage.setItem(BAKIYE_ANAHTAR, String(Math.max(0, Math.round(bakiye))));
  } catch {
    // localStorage kullanılamıyorsa (gizli sekme vb.) sessizce yok say
  }
}

export function mirasBakiyeGetir(): number {
  return oku();
}

/** Miras ekler (ödül/kazanç), yeni bakiyeyi döner. */
export function mirasEkle(miktar: number): number {
  if (!Number.isFinite(miktar) || miktar <= 0) return oku();
  const yeni = oku() + Math.round(miktar);
  yaz(yeni);
  return yeni;
}

/** Yeterli bakiye varsa düşer ve true döner; yetersizse hiçbir şey yapmadan false döner. */
export function mirasHarca(miktar: number): boolean {
  const mevcut = oku();
  if (miktar <= 0 || mevcut < miktar) return false;
  yaz(mevcut - miktar);
  return true;
}

/**
 * Bir ölümden kazanılacak miras miktarı — nihai skorun (`hayat amacı ×5`
 * çarpanı zaten skora yansımış) yaklaşık %1'i. En az 1.
 *
 * Oyundaki skorlar geniş bir aralığa yayılır (kısa/fakir bir hayatta birkaç
 * yüz, olağanüstü uzun+zengin+amaç-tamamlanmış bir hayatta on binleri
 * bulabilir) — %1 oranı, kozmetik dolaptaki eşya fiyatlarıyla (10-120 miras)
 * makul bir eşleşme versin diye kasıtlı düşük tutuldu.
 */
export function olumMirasiHesapla(skor: number): number {
  return Math.max(1, Math.round(skor / 100));
}
