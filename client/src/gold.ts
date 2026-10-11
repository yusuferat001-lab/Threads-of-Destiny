/**
 * Gold — cihaz-yerel, hayattan bağımsız kalıcı meta-para.
 *
 * `basarimlar.ts`/`gecmisHayatlar.ts` ile aynı desen: yalnız `localStorage`'da
 * tutulur, sunucuya hiç gitmez. Ölümde kazanılan skordan (oyun başı EN FAZLA
 * `OLUM_GOLD_TAVANI`, bkz. `olumGoldHesapla`) ve günlük seri ödülleriyle
 * (`gunlukSeri.ts`) birikir; kalıcı kozmetik dolaptaki (`kozmetikDolabi.ts`)
 * eşyaları satın almak için harcanır. Oyun-içi `para` ile KARIŞMAZ — hiçbir
 * stat/güç dengesine etkisi yoktur, salt görünüm/koleksiyon ekonomisi.
 */
const BAKIYE_ANAHTAR = 'kader_carki_gold_bakiye';

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

export function goldBakiyeGetir(): number {
  return oku();
}

/** Gold ekler (ödül/kazanç), yeni bakiyeyi döner. */
export function goldEkle(miktar: number): number {
  if (!Number.isFinite(miktar) || miktar <= 0) return oku();
  const yeni = oku() + Math.round(miktar);
  yaz(yeni);
  return yeni;
}

/** Yeterli bakiye varsa düşer ve true döner; yetersizse hiçbir şey yapmadan false döner. */
export function goldHarca(miktar: number): boolean {
  const mevcut = oku();
  if (miktar <= 0 || mevcut < miktar) return false;
  yaz(mevcut - miktar);
  return true;
}

/** Bir ölümden kazanılabilecek en yüksek Gold — ekonominin "uçmasını" engelleyen sert tavan. */
export const OLUM_GOLD_TAVANI = 10;

/**
 * Bir ölümden kazanılacak Gold miktarı — oyun başı EN FAZLA {@link OLUM_GOLD_TAVANI}.
 *
 * İki parçalı, doğrusal bir eğri (§18 skor formülü: kısa/fakir bir hayat
 * bile birkaç yüz, iyi bir hayat 5.000-20.000, hayat amacı tamamlanmış
 * olağanüstü bir hayat (×5 çarpanı dahil) 50.000+ olabiliyor):
 *   - **0 - 10.000:** her 2.500 puanda +1 (kademe 1-4) — kısa/sıradan hayatlar
 *     arasında da ince bir fark bıraksın diye.
 *   - **10.000 - 40.000:** her 5.000 puanda +1 (kademe 4-10) — "orta-iyi"
 *     aralık en çok oynanan bant olduğu için burası özellikle sık/eşit
 *     bölündü (kullanıcı isteği).
 *   - **40.000+:** sabit 10 (tavan) — bu noktadan sonra skor artışı Gold
 *     kazancını artırmaz.
 * Yaklaşık dağılım: 2.500→1 · 7.500→3 · 10.000→4 · 15.000→5 · 25.000→7 ·
 * 35.000→9 · 40.000+→10.
 */
export function olumGoldHesapla(skor: number): number {
  const s = Math.max(0, skor);
  if (s <= 10000) {
    return Math.min(4, Math.max(1, Math.round(s / 2500)));
  }
  const kademe = 4 + Math.round((s - 10000) / 5000);
  return Math.min(OLUM_GOLD_TAVANI, kademe);
}

// ---------------------------------------------------------------------------
// Ölüm ödülünün tekrar ödenmesini önleme
// ---------------------------------------------------------------------------
// Ölüm ekranında sayfa yenilenirse (oturum id'si localStorage'da kaldığı için ölü karakter
// yeniden yüklenir) bellek-içi bir ref'e güvenen koruma sıfırlanıyor ve ödül tekrar tekrar
// veriliyordu. Ödenen oyun kimlikleri kalıcı tutulur (son 40, basarimSistemi'ndeki
// `degerlendirilen` kümesiyle aynı desen).
const ODENEN_ANAHTAR = 'kader_carki_gold_odenen_oyunlar';
const ODENEN_MAKS = 40;

function odenenleriOku(): string[] {
  try {
    const ham = localStorage.getItem(ODENEN_ANAHTAR);
    const liste = ham ? JSON.parse(ham) : [];
    return Array.isArray(liste) ? liste.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

/** Bu oyunun ölüm gold'u daha önce ödendi mi? */
export function olumGoldOdendiMi(oyunId: string): boolean {
  return odenenleriOku().includes(oyunId);
}

/** Bu oyunun ölüm gold'unu ödenmiş olarak işaretler (ödemeden ÖNCE çağır: eşzamanlı efektler çift ödemesin). */
export function olumGoldOdendiIsaretle(oyunId: string): void {
  try {
    const liste = odenenleriOku().filter((x) => x !== oyunId);
    liste.push(oyunId);
    localStorage.setItem(ODENEN_ANAHTAR, JSON.stringify(liste.slice(-ODENEN_MAKS)));
  } catch {
    // localStorage kullanılamıyorsa sessizce yok say
  }
}
