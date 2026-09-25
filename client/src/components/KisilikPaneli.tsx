import type { YatkinlikKaynagi, KisilikEksenleri } from '../types';
import { kategoriAdi } from '../bolgeTema';
import { useDil } from '../DilContext';

function grupla(kaynaklar: YatkinlikKaynagi[]): Map<string, YatkinlikKaynagi[]> {
  const grup = new Map<string, YatkinlikKaynagi[]>();
  for (const kaynak of kaynaklar) {
    const liste = grup.get(kaynak.kaynak) ?? [];
    liste.push(kaynak);
    grup.set(kaynak.kaynak, liste);
  }
  return grup;
}

export function KisilikPaneli({
  kisilik,
  aileMeslegi,
  kaynaklar,
}: {
  kisilik: [string, string];
  aileMeslegi: string;
  kaynaklar: YatkinlikKaynagi[];
  /** Faz 7 (2026-09 sonu, kullanıcı isteği): iki uçlu fevrilik/merhamet çubukları
   * UI'dan kaldırıldı — oyuncuya "gizli" bir istatistik gösterip kafa
   * karıştırıyordu, ayrıca kişilik kartlarındaki asıl bilgiyle (kategori
   * etkileri) neredeyse aynı şeyi tekrarlıyordu. Motor tarafındaki
   * `kisilik_eksenleri` (seçenek gating için `gerekliEksen`) TAMAMEN
   * DOKUNULMADI — yalnız bu görsel çubuk kaldırıldı. Prop hâlâ isteğe bağlı
   * kabul edilir (çağıran taraf değişmesin diye) ama artık kullanılmıyor. */
  eksenler?: KisilikEksenleri;
}) {
  const { m, kt, dil } = useDil();
  const grup = grupla(kaynaklar);

  return (
    <div className="kisilik-paneli">
      <h3>{m.kpBaslikTam}</h3>
      {[...kisilik, aileMeslegi].map((kaynakAdi) => {
        const etkiler = grup.get(kaynakAdi) ?? [];
        const aileMi = kaynakAdi === aileMeslegi;
        return (
          <div key={kaynakAdi} className="kisilik-rozet">
            <span className="kisilik-rozet-ad">
              {aileMi ? '🏠 ' : '🎭 '}
              {kt(kaynakAdi)}
              {aileMi ? m.kpAilesi : ''}
            </span>
            {etkiler.length > 0 && (
              <span className="kisilik-rozet-etki">
                {etkiler
                  .map((e) => `${kategoriAdi(e.kategori, dil)} ${e.deger > 0 ? '+' : ''}${e.deger}`)
                  .join(' · ')}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
