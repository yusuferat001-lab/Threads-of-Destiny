import type { Durum } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

/**
 * Aktif durumlar (süreli/kalıcı pasif efektler).
 * - 'panel'  → sağ panel; başlık KALDIRILDI (kullanıcı isteği), sadece rozetler.
 * - 'sahne'  → mobilde arka plan resminin üstünde ince bir şerit; tur/yıl bilgisi
 *              gösterilmez, yalnız durum adı + (varsa) para etkisi.
 */
export function DurumPaneli({
  durumlar,
  varyant = 'panel',
}: {
  durumlar: Durum[];
  varyant?: 'panel' | 'sahne';
}) {
  const { m, kt } = useDil();
  if (durumlar.length === 0) {
    return varyant === 'sahne' ? null : <p className="durum-bos">{m.drBos}</p>;
  }

  if (varyant === 'sahne') {
    return (
      <div className="durum-sahne-serit" aria-label={m.drBaslikTam}>
        {durumlar.map((durum) => (
          <span key={durum.id} className={`durum-sahne-rozet durum-${durum.tur}`}>
            {kt(durum.ad)}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="durum-paneli">
      {durumlar.map((durum) => (
        <div key={durum.id} className={`durum-rozet durum-${durum.tur}`}>
          <span className="durum-ad">{kt(durum.ad)}</span>
          {durum.tur_basi_para && (
            <span className="durum-etki">
              💰 {durum.tur_basi_para > 0 ? '+' : ''}
              {formatPara(durum.tur_basi_para)}{m.drTurBasi}
            </span>
          )}
          <span className="durum-sure">
            {durum.tur === 'kalici' ? m.drKaliciTam : bic(m.drTurKaldi, durum.kalan_tur ?? 0)}
          </span>
        </div>
      ))}
    </div>
  );
}
