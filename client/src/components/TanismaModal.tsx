import { useDil } from '../DilContext';
import { im } from '../iliskilerMetin';
import type { TanismaDurumu } from '../types';

interface TanismaModalProps {
  /** Süren tanışma (adım 0 = göz göze); bittiyse null. */
  durum: TanismaDurumu | null;
  /** Önceki adımın tepkisi — düz anlatı metni (ipucu/rozet YOK; oyuncu kendi çıkarımını yapar). */
  tepki: string | null;
  /** Diyalog bittiyse sonuç; modal "Tamam" ile kapanır. */
  sonuc: { mesaj: string; basarili: boolean } | null;
  yukleniyor: boolean;
  onYaklas: () => void;
  onVazgec: () => void;
  onSec: (index: number) => void;
  onKapat: () => void;
}

/**
 * Aşk evliliği yolu: göz göze gelme → yanına git / vazgeç → 3-4 adımlık diyalog. Her adımda
 * karşı tarafın tepkisi düz metin olarak gösterilir; seçim sonucu ipucu olarak sunulmaz.
 */
export function TanismaModal({ durum, tepki, sonuc, yukleniyor, onYaklas, onVazgec, onSec, onKapat }: TanismaModalProps) {
  const { dil } = useDil();
  if (!durum && !sonuc) return null;
  const adimda = durum && durum.adim >= 1;

  return (
    <div className="skor-detay-katman tanisma-katman">
      <div className="skor-detay-modal tanisma-modal" role="dialog" aria-modal="true" aria-label={im(dil, 'tanismaBaslik')}>
        <div className="skor-detay-modal-ust">
          <h2>{im(dil, 'tanismaBaslik')}</h2>
          {durum && adimda && (
            <span className="tanisma-adim">{im(dil, 'tanismaAdim', durum.adim, durum.toplam)}</span>
          )}
        </div>
        <div className="skor-detay-govde tanisma-govde">
          {sonuc ? (
            <>
              {tepki && <p className="tanisma-tepki">{tepki}</p>}
              <p className={`tanisma-sonuc ${sonuc.basarili ? 'tanisma-sonuc-iyi' : 'tanisma-sonuc-kotu'}`}>{sonuc.mesaj}</p>
              <button type="button" className="birincil tanisma-buton" onClick={onKapat} autoFocus>
                {im(dil, 'tamam')}
              </button>
            </>
          ) : (
            durum && (
              <>
                {adimda ? (
                  <>
                    {tepki && <p className="tanisma-tepki">{tepki}</p>}
                    <p className="tanisma-istek">{durum.istek}</p>
                    <div className="tanisma-secenekler">
                      {durum.secenekler.map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          className="tanisma-secenek"
                          disabled={yukleniyor}
                          onClick={() => onSec(i)}
                        >
                          {s.metin}
                        </button>
                      ))}
                    </div>
                    <button type="button" className="ikincil tanisma-vazgec" disabled={yukleniyor} onClick={onVazgec}>
                      {im(dil, 'tanismaVazgec')}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="tanisma-istek">{durum.giris}</p>
                    <div className="tanisma-secenekler">
                      <button type="button" className="birincil tanisma-buton" disabled={yukleniyor} onClick={onYaklas} autoFocus>
                        {im(dil, 'tanismaYaklas')}
                      </button>
                      <button type="button" className="ikincil tanisma-buton" disabled={yukleniyor} onClick={onVazgec}>
                        {im(dil, 'tanismaVazgec')}
                      </button>
                    </div>
                  </>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
