/**
 * Miras (Legacy) — cihaz-yerel, hayattan bağımsız kalıcı meta-para.
 *
 * `basarimlar.ts`/`gecmisHayatlar.ts` ile aynı desen: yalnız `localStorage`'da
 * tutulur, sunucuya hiç gitmez. Ölümde kazanılan skordan (oyun başı EN FAZLA
 * `OLUM_MIRAS_TAVANI`, bkz. `olumMirasiHesapla`) ve günlük seri ödülleriyle
 * (`gunlukSeri.ts`) birikir; kalıcı kozmetik dolaptaki (`kozmetikDolabi.ts`)
 * eşyaları satın almak için harcanır. Oyun-içi `para` ile KARIŞMAZ — hiçbir
 * stat/güç dengesine etkisi yoktur, salt görünüm/koleksiyon ekonomisi.
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

/** Bir ölümden kazanılabilecek en yüksek Miras — ekonominin "uçmasını" engelleyen sert tavan. */
export const OLUM_MIRAS_TAVANI = 10;

/**
 * Bir ölümden kazanılacak Miras miktarı — oyun başı EN FAZLA {@link OLUM_MIRAS_TAVANI}.
 *
 * Doğrusal bir oran (`skor/100` gibi) skorun büyüme aralığı çok geniş olduğu
 * için hızla tavana çarpıp orta-iyi hayatları birbirinden ayırt edilemez hale
 * getiriyordu (§18 skor formülü: kısa/fakir bir hayat bile birkaç yüz, iyi bir
 * hayat 5.000-20.000, hayat amacı tamamlanmış olağanüstü bir hayat (×5 çarpanı
 * dahil) 50.000+ olabiliyor). Bunun yerine karekök eğrisi kullanılır: düşük
 * skorlarda hızlı, yüksekte yavaş artar — kademeli bir his verir, ama
 * `OLUM_MIRAS_TAVANI`'nı asla aşmaz. Yaklaşık dağılım:
 *   skor  ~500   → 2
 *   skor ~3.000  → 4
 *   skor ~8.000  → 6
 *   skor ~15.000 → 9
 *   skor ≥20.000 → 10 (tavan, bu noktadan sonra sabit)
 * Tavanın nerede doyacağını ayarlamak için yalnız `BOLEN`'i değiştirmek yeter
 * (büyütmek tavana ulaşmayı zorlaştırır/geciktirir, küçültmek kolaylaştırır).
 */
export function olumMirasiHesapla(skor: number): number {
  const BOLEN = 14; // tavan (10) ~20.000 skorda doyar
  const ham = Math.round(Math.sqrt(Math.max(0, skor)) / BOLEN);
  return Math.min(OLUM_MIRAS_TAVANI, Math.max(1, ham));
}
