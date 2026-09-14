// Türkiye 2016'dan beri DST uygulamıyor — sabit UTC+3. Bu yüzden zaman dilimi
// kütüphanesi gerekmeden basit bir ofset hesabıyla "Türkiye saatine göre hafta"
// (Pazartesi 00:00 → bir sonraki Pazartesi 00:00) hesaplanabilir.
const TR_UTC_OFFSET_MS = 3 * 60 * 60 * 1000;

/** `now`'ın (gerçek UTC anı) içinde bulunduğu Türkiye-saatli haftanın [başlangıç, bitiş) aralığı. */
export function haftaAraligiHesapla(now: Date = new Date()): { baslangic: Date; bitis: Date } {
  const trGoruntu = new Date(now.getTime() + TR_UTC_OFFSET_MS);
  const gun = trGoruntu.getUTCDay(); // 0=Pazar .. 6=Cumartesi
  const gunlerSinceMonday = gun === 0 ? 6 : gun - 1;
  const trGunBaslangici = Date.UTC(
    trGoruntu.getUTCFullYear(),
    trGoruntu.getUTCMonth(),
    trGoruntu.getUTCDate(),
  );
  const trHaftaBaslangiciGoruntu = trGunBaslangici - gunlerSinceMonday * 86_400_000;
  const baslangic = new Date(trHaftaBaslangiciGoruntu - TR_UTC_OFFSET_MS);
  const bitis = new Date(baslangic.getTime() + 7 * 86_400_000);
  return { baslangic, bitis };
}
