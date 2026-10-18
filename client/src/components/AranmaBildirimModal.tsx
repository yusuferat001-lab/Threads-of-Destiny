import { useState } from 'react';
import { aranmaBildirimYanitla } from '../api';
import { formatPara } from '../format';
import { useDil } from '../DilContext';
import type { AranmaBildirimi, CharacterState } from '../types';

interface AranmaBildirimModalProps {
  karakter: CharacterState;
  bildirim: AranmaBildirimi;
  onState: (state: CharacterState) => void;
}

/**
 * Aranma bildirimi (açılır pencere): eski bir suçun ifşası, polis kefaret uyarısı ya da
 * baskın sonucu. İfşa/baskın "Tamam" ile kapanır; polis uyarısı yanıtlanmadan kapanmaz.
 */
export function AranmaBildirimModal({ karakter, bildirim, onState }: AranmaBildirimModalProps) {
  const { dil } = useDil();
  const t = (tr: string, en: string) => (dil === 'en' ? en : tr);
  const [mesgul, setMesgul] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  async function yanitla(karar?: 'tam' | 'yarim' | 'hayir') {
    setMesgul(true);
    setHata(null);
    try {
      const r = await aranmaBildirimYanitla(karakter.id, bildirim.id, karar);
      onState(r.state);
    } catch (e) {
      setHata(e instanceof Error ? e.message : String(e));
    } finally {
      setMesgul(false);
    }
  }

  const birim = karakter.para_birimi;
  let baslik = '';
  let govde: React.ReactNode = null;
  let butonlar: React.ReactNode = null;

  if (bildirim.tur === 'ifsa') {
    baslik = t('🕵️ Eski bir suçun açığa çıktı', '🕵️ An old crime came to light');
    govde = (
      <p>
        {t(
          `“${bildirim.baslik}” olayında yaptıkların yıllar sonra ortaya çıktı. Aranman +${bildirim.aranmaArtis}, ahlakın −${bildirim.ahlakDusus}.`,
          `What you did in “${bildirim.baslik}” has surfaced years later. Wanted +${bildirim.aranmaArtis}, morality −${bildirim.ahlakDusus}.`
        )}
      </p>
    );
    butonlar = (
      <button type="button" disabled={mesgul} onClick={() => yanitla()} autoFocus>
        {t('Tamam', 'OK')}
      </button>
    );
  } else if (bildirim.tur === 'baskin') {
    baslik = bildirim.kacti ? t('🏃 Baskından kaçtın', '🏃 You escaped the raid') : t('⛓️ Baskın: tutuklandın', '⛓️ Raid: you were arrested');
    govde = (
      <p>
        {bildirim.kacti
          ? t('Kolluk evine geldi ama son anda kaçmayı başardın; artık bir kaçaksın.', 'The guards came for you but you slipped away; you are now a fugitive.')
          : t(`Evine baskın yapıldı. ${bildirim.ceza} yıl hapse mahkûm edildin.`, `Your home was raided. You were sentenced to ${bildirim.ceza} years.`)}
      </p>
    );
    butonlar = (
      <button type="button" disabled={mesgul} onClick={() => yanitla()} autoFocus>
        {t('Tamam', 'OK')}
      </button>
    );
  } else {
    const tam = bildirim.tutar ?? 0;
    const yarim = bildirim.yarimTutar ?? 0;
    baslik = t('👮 Kolluktan uyarı', '👮 A warning from the guards');
    govde = (
      <>
        <p>
          {t(
            'Çok göze batıyorsun. Kolluk, durumu kapatmak için kefaret istiyor. Ödemezsen sicilin kabarır (aranma +6…9).',
            'You stand out too much. The guards want bail to let it go. Refuse and your record grows (wanted +6…9).'
          )}
        </p>
        <p className="gosterge-bilgi">
          {t(`Tamamı: ${formatPara(tam)} ${birim} · Yarısı: ${formatPara(yarim)} ${birim}`, `Full: ${formatPara(tam)} ${birim} · Half: ${formatPara(yarim)} ${birim}`)}
        </p>
      </>
    );
    butonlar = (
      <div className="aranma-butonlar">
        <button type="button" disabled={mesgul || karakter.para < tam} onClick={() => yanitla('tam')}>
          {t('Tamamını öde', 'Pay in full')} ({formatPara(tam)})
        </button>
        <button type="button" disabled={mesgul || karakter.para < yarim} onClick={() => yanitla('yarim')}>
          {t('Yarısını öde', 'Pay half')} ({formatPara(yarim)})
        </button>
        <button type="button" className="ikincil" disabled={mesgul} onClick={() => yanitla('hayir')}>
          {t('Ödemem', 'Refuse')}
        </button>
      </div>
    );
  }

  return (
    <div className="skor-detay-katman gosterge-katman aranma-bildirim-katman">
      <div className="skor-detay-modal gosterge-modal" role="dialog" aria-modal="true" aria-label={baslik}>
        <div className="skor-detay-modal-ust">
          <h2>{baslik}</h2>
        </div>
        <div className="skor-detay-govde gosterge-govde">
          {govde}
          {hata && <p className="gosterge-bilgi aranma-hata">{hata}</p>}
          <div className="aranma-bildirim-alt">{butonlar}</div>
        </div>
      </div>
    </div>
  );
}
