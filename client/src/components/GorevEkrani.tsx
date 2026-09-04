import type { Ast, EkipUyesi } from '../types';
import { useDil } from '../DilContext';

interface GorevEkraniProps {
  meslek: string;
  amirAdi: string | null;
  amirRutbe: string | null;
  astlar: Ast[];
  ekip: EkipUyesi[];
  orduMevcudu: number;
  orduTechizatSeviyesi: number;
  ticaretSermaye: number;
  nufuz: number;
  hapiste: boolean;
  paraBirimi: string;
  yukleniyor: boolean;
  onEkipCikar: (ekipId: string) => void;
  onGeriDon: () => void;
}

/**
 * Aile ekranıyla aynı desende, tam sayfa açılan "Görevin" ekranı: amir, astlar,
 * ekip (Kov butonlu) ve mesleğe özel güç metrikleri burada gösterilir. Eskiden
 * oyun ekranının sol panelinde inline duran KomutaSeridi'nin yerini aldı.
 */
export function GorevEkrani({
  meslek,
  amirAdi,
  amirRutbe,
  astlar,
  ekip,
  orduMevcudu,
  orduTechizatSeviyesi,
  ticaretSermaye,
  nufuz,
  hapiste,
  paraBirimi,
  yukleniyor,
  onEkipCikar,
  onGeriDon,
}: GorevEkraniProps) {
  const { m, kt } = useDil();

  const meslekGucSatirlari: [string, string][] = [];
  if (meslek === 'Asker') {
    meslekGucSatirlari.push([m.iyOrduMevcudu, String(orduMevcudu)]);
    meslekGucSatirlari.push([m.iyTechizat, `%${orduTechizatSeviyesi}`]);
  } else if (meslek === 'Tüccar' && ticaretSermaye > 0) {
    meslekGucSatirlari.push([m.iyTicaretSermayesi, String(ticaretSermaye)]);
  } else if (meslek === 'Din Adamı' && nufuz > 0) {
    meslekGucSatirlari.push([m.iyNufuz, String(nufuz)]);
  }

  return (
    <div className="ekran ekran-aile ekran-gorev">
      <h2>{m.geBaslik}</h2>

      {hapiste && (
        <div className="aile-koken-karti gorev-hapis-karti">
          <span className="iliski-rozet">⛓️ {m.ksHapiste}</span>
        </div>
      )}

      <div className="aile-koken-karti">
        <h3>{m.iyAmirin}</h3>
        {amirAdi ? (
          <div className="iliski-rozet iliski-es">
            <span className="iliski-ad">🎖️ {amirAdi}</span>
            {amirRutbe && <span className="iliski-etiket">{kt(amirRutbe)}</span>}
          </div>
        ) : (
          <p className="aile-bos-metin">{m.geAmirYok}</p>
        )}
      </div>

      <div className="aile-koken-karti">
        <h3>{m.geAstlarin}</h3>
        {astlar.length === 0 ? (
          <p className="aile-bos-metin">{m.geKimseYok}</p>
        ) : (
          <div className="aile-koken-listesi">
            {astlar.map((ast) => (
              <span key={ast.isim} className="iliski-rozet">
                🎗️ {ast.isim} · {kt(ast.rutbe)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="aile-cocuklar-karti">
        <h3>{m.geEkibin}</h3>
        {ekip.length === 0 ? (
          <p className="aile-bos-metin">{m.geEkipYok}</p>
        ) : (
          <ul className="aile-cocuk-listesi">
            {ekip.map((uye) => (
              <li key={uye.id} className="aile-cocuk-satiri gorev-ekip-satiri">
                <span className="aile-cocuk-ad">🧑 {uye.isim}</span>
                <span className="aile-cocuk-detay">
                  {kt(uye.rol)} · {uye.maas} {paraBirimi}/{m.ksYilBasi} · 🎭 {kt(uye.kisilik)} · 🤝 %{uye.sadakat} ·{' '}
                  {m.ksKalite} %{uye.tahminiMin}-{uye.tahminiMax}
                </span>
                <button className="ikincil gorev-ekip-kov" disabled={yukleniyor} onClick={() => onEkipCikar(uye.id)}>
                  {m.ksKov}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {meslekGucSatirlari.length > 0 && (
        <div className="aile-koken-karti">
          <h3>{m.geMeslekGucu}</h3>
          <div className="aile-koken-listesi">
            {meslekGucSatirlari.map(([ad, deger]) => (
              <span key={ad} className="iliski-rozet">
                {ad}: {deger}
              </span>
            ))}
          </div>
        </div>
      )}

      <button onClick={onGeriDon}>{m.devamEt}</button>
    </div>
  );
}
