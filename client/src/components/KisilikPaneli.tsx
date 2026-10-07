import type { YatkinlikKaynagi, KisilikEksenleri } from '../types';
import { kategoriAdi } from '../bolgeTema';
import { useDil } from '../DilContext';
import { aileKokAdi } from '../aileAdi';
import { formatYuzde } from '../format';

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
  bolge,
  kaynaklar,
  meslekYatkinlikUnvani,
  meslekYatkinlikSeviyesi,
  meslekZarBonusu,
  meslekMaasCarpani,
  meslekTecrubeHizi,
}: {
  kisilik: [string, string];
  aileMeslegi: string;
  /** Ülke/bölge bonusu da görünsün (2026-09 sonu, §41) — bölgenin kendi yatkınlık katkısı + varsa bölge+aile sinerji bonusu artık burada gösteriliyor (eskiden yatkinlik_kaynaklari'nda vardı ama hiç render edilmiyordu). */
  bolge: string;
  kaynaklar: YatkinlikKaynagi[];
  /** Faz 7 (2026-09 sonu, kullanıcı isteği): iki uçlu fevrilik/merhamet çubukları
   * UI'dan kaldırıldı — oyuncuya "gizli" bir istatistik gösterip kafa
   * karıştırıyordu, ayrıca kişilik kartlarındaki asıl bilgiyle (kategori
   * etkileri) neredeyse aynı şeyi tekrarlıyordu. Motor tarafındaki
   * `kisilik_eksenleri` (seçenek gating için `gerekliEksen`) TAMAMEN
   * DOKUNULMADI — yalnız bu görsel çubuk kaldırıldı. Prop hâlâ isteğe bağlı
   * kabul edilir (çağıran taraf değişmesin diye) ama artık kullanılmıyor. */
  eksenler?: KisilikEksenleri;
  /** Mesleğe yatkınlık kademesi (2026-09 sonu) — meslek seçilmediyse tümü undefined/null gelir, rozet hiç gösterilmez. Nötr kademede (seviye 2) de gösterilmez (kullanıcı isteği: "ekranda metin yazmayacak"). */
  meslekYatkinlikUnvani?: string | null;
  meslekYatkinlikSeviyesi?: 1 | 2 | 3 | 4 | null;
  meslekZarBonusu?: number;
  meslekMaasCarpani?: number;
  meslekTecrubeHizi?: number;
}) {
  const { m, kt, dil } = useDil();
  const fmtYuzde = (v: number): string => formatYuzde(dil, Math.round(v * 100), true);
  const grup = grupla(kaynaklar);
  // Sinerji kaynağı sunucuda hep "<bölge> + <aile> sinerjisi" (kanonik TR) biçiminde
  // gelir — tek bir bileşik kaynak dizesi olduğu için kt() ile çevrilemez, bu yüzden
  // yalnızca varlığını (kategori/değerini) tespit edip etiketi kendimiz kuruyoruz.
  const sinerjiKaynak = kaynaklar.find((k) => k.kaynak.endsWith(' sinerjisi'));

  return (
    <div className="kisilik-paneli">
      <h3>{m.kpBaslikTam}</h3>
      {meslekYatkinlikUnvani && meslekYatkinlikSeviyesi != null && meslekYatkinlikSeviyesi !== 2 && (
        <div className="kisilik-rozet kisilik-rozet-meslek-yatkinlik">
          <span className="kisilik-rozet-ad">🎯 {kt(meslekYatkinlikUnvani)}</span>
          <span className="kisilik-rozet-etki">
            {m.kpYatkinlikZar} {fmtYuzde(meslekZarBonusu ?? 0)} · {m.kpYatkinlikMaas} {fmtYuzde(meslekMaasCarpani ?? 0)} ·{' '}
            {m.kpYatkinlikTecrube} {fmtYuzde(meslekTecrubeHizi ?? 0)}
          </span>
        </div>
      )}
      {[...kisilik, aileMeslegi, bolge].map((kaynakAdi) => {
        const etkiler = grup.get(kaynakAdi) ?? [];
        const aileMi = kaynakAdi === aileMeslegi;
        const bolgeMi = kaynakAdi === bolge;
        const ikon = bolgeMi ? '🌍 ' : aileMi ? '🏠 ' : '🎭 ';
        const ek = aileMi ? m.kpAilesi : '';
        return (
          <div key={kaynakAdi} className="kisilik-rozet">
            <span className="kisilik-rozet-ad">
              {ikon}
              {aileMi ? aileKokAdi(kt(kaynakAdi)) : kt(kaynakAdi)}
              {ek}
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
      {sinerjiKaynak && (
        <div className="kisilik-rozet kisilik-rozet-sinerji">
          <span className="kisilik-rozet-ad">
            ✨ {kt(bolge)} + {kt(aileMeslegi)} {m.kpSinerji}
          </span>
          <span className="kisilik-rozet-etki">
            {kategoriAdi(sinerjiKaynak.kategori, dil)} {sinerjiKaynak.deger > 0 ? '+' : ''}
            {sinerjiKaynak.deger}
          </span>
        </div>
      )}
    </div>
  );
}
