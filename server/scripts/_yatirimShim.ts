/**
 * "Kendi işine yatırım" özelliği 2026-09'da tamamen kaldırıldı (CLAUDE.md §13 —
 * yerine karanlık işler paneli geldi: kotuIsYap/kotuIsConfigGetir). Eski simülasyon
 * scriptleri (`simulate5YilOrtalama`, `simulateBazTarzlar`, `simulateEkonomiAnaliz`,
 * `simulateFullPlaythroughs`, `simulateKisilikler`) hâlâ silinmiş
 * `yatirimConfigGetir`/`yatirimYap`'ı çağırıyordu → derlenmiyorlardı.
 *
 * Bu shim onları TEKRAR ÇALIŞIR hale getirir: `yatirimConfigGetir` sonsuz maliyet
 * döndürür → her scriptteki "para >= maliyet * kat" koşulu her zaman false → yatırım
 * adımı sessizce atlanır (ilgili sayaçlar 0 kalır). Scriptlerin asıl ölçtüğü şeyler
 * (ekonomi/mülk/kişilik toplamları, ölüm yaşı, borç oranı) bu adımdan bağımsızdır.
 *
 * İleride bu adımı karanlık işlere bağlamak istenirse: çağrıları doğrudan
 * `gameEngine.kotuIsConfigGetir` / `kotuIsYap`'a taşıyın ve bu dosyayı silin.
 */

export async function yatirimConfigGetir(_id: string): Promise<{ kendiIsiMaliyeti: number }> {
  return { kendiIsiMaliyeti: Number.POSITIVE_INFINITY };
}

export async function yatirimYap(_id: string): Promise<void> {
  /* özellik kaldırıldı — no-op */
}
