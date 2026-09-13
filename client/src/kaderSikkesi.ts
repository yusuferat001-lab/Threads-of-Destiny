/**
 * Kader Sikkesi — cihaz-yerel, hayattan bağımsız kalıcı meta-para.
 *
 * `basarimlar.ts`/`gecmisHayatlar.ts` ile aynı desen: yalnız `localStorage`'da
 * tutulur, sunucuya hiç gitmez. Ölümde kazanılan skorun küçük bir oranıyla ve
 * günlük seri ödülleriyle (`gunlukSeri.ts`) birikir; kalıcı kozmetik dolaptaki
 * (`kozmetikDolabi.ts`) eşyaları satın almak için harcanır. Oyun-içi `para`
 * ile KARIŞMAZ — hiçbir stat/güç dengesine etkisi yoktur, salt görünüm/koleksiyon
 * ekonomisi.
 */
const BAKIYE_ANAHTAR = 'kader_carki_sikke_bakiye';

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

export function sikkeBakiyeGetir(): number {
  return oku();
}

/** Sikke ekler (ödül/kazanç), yeni bakiyeyi döner. */
export function sikkeEkle(miktar: number): number {
  if (!Number.isFinite(miktar) || miktar <= 0) return oku();
  const yeni = oku() + Math.round(miktar);
  yaz(yeni);
  return yeni;
}

/** Yeterli bakiye varsa düşer ve true döner; yetersizse hiçbir şey yapmadan false döner. */
export function sikkeHarca(miktar: number): boolean {
  const mevcut = oku();
  if (miktar <= 0 || mevcut < miktar) return false;
  yaz(mevcut - miktar);
  return true;
}

/**
 * Bir ölümden kazanılacak sikke miktarı — nihai skorun (`hayat amacı ×5`
 * çarpanı zaten skora yansımış) küçük bir oranı. En az 1.
 */
export function olumSikkesiHesapla(skor: number): number {
  return Math.max(1, Math.round(skor / 50));
}
