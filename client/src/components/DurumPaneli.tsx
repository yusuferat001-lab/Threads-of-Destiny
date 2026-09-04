import type { Durum } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

export function DurumPaneli({ durumlar }: { durumlar: Durum[] }) {
  const { m, kt } = useDil();
  return (
    <div className="durum-paneli">
      <h3>{m.drBaslikTam}</h3>
      {durumlar.length === 0 && <p className="durum-bos">{m.drBos}</p>}
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
