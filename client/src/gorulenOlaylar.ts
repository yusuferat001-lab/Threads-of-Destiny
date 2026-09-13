/**
 * Bu cihazda oynanan TÜM ömürler boyunca görülen olay id'lerinin kalıcı koleksiyonu
 * (localStorage, sunucuya kaydedilmez) — `basarimlar.ts`/`gecmisHayatlar.ts` ile aynı
 * desen. `POST /new`'e gönderilir ki yeni bir karakter, bu cihazda daha önce görülmüş
 * bir olayı (havuzda başka seçenek olduğu sürece) bir daha görmesin.
 */
const KEY = "kader_carki_gorulen_olaylar";
const MAKS_KAYIT = 1200; // olay bankası boyutundan (~1115) biraz fazla, güvenli üst sınır

function oku(): string[] {
  try {
    const ham = localStorage.getItem(KEY);
    return ham ? JSON.parse(ham) : [];
  } catch {
    return [];
  }
}

function yaz(liste: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(liste));
  } catch {
    // localStorage kullanılamıyorsa (gizli sekme vb.) sessizce yok say
  }
}

/** Bir senaryo ekrana gelince çağrılır; olay id'sini kalıcı koleksiyona ekler. */
export function gorulenOlayEkle(olayId: string): void {
  if (!olayId) return;
  const mevcut = new Set(oku());
  if (mevcut.has(olayId)) return;
  mevcut.add(olayId);
  yaz([...mevcut].slice(-MAKS_KAYIT));
}

/** Yeni bir oyun başlatılırken sunucuya gönderilecek liste. */
export function gorulenOlaylariGetir(): string[] {
  return oku();
}
