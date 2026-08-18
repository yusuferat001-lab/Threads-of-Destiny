import type { Durum } from '../types';

export function DurumPaneli({ durumlar }: { durumlar: Durum[] }) {
  return (
    <div className="durum-paneli">
      <h3>Durumlar</h3>
      {durumlar.length === 0 && <p className="durum-bos">Aktif bir durum yok.</p>}
      {durumlar.map((durum) => (
        <div key={durum.id} className={`durum-rozet durum-${durum.tur}`}>
          <span className="durum-ad">{durum.ad}</span>
          {durum.tur_basi_para && (
            <span className="durum-etki">
              💰 {durum.tur_basi_para > 0 ? '+' : ''}
              {durum.tur_basi_para}/tur
            </span>
          )}
          <span className="durum-sure">
            {durum.tur === 'kalici' ? 'Kalıcı' : `${durum.kalan_tur ?? 0} tur kaldı`}
          </span>
        </div>
      ))}
    </div>
  );
}
