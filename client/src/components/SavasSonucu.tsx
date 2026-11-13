import type { SavasGunuSonucu } from '../types';
import { useDil } from '../DilContext';
import { formatPara } from '../format';

const ARAZI: Record<string, { tr: string; en: string }> = {
  ova: { tr: 'Açık ova', en: 'Open plain' },
  dag: { tr: 'Dağ geçidi', en: 'Mountain pass' },
  orman: { tr: 'Sık orman', en: 'Dense forest' },
};
const M = {
  zafer: { tr: 'ZAFER', en: 'VICTORY' },
  yenilgi: { tr: 'YENİLGİ', en: 'DEFEAT' },
  baslik: { tr: 'Savaş Sonucu', en: 'Battle Result' },
  saldiri: { tr: 'Saldırıdaydın', en: 'You attacked' },
  savunma: { tr: 'Savunmadaydın', en: 'You defended' },
  guclerin: { tr: 'Güçler', en: 'Forces' },
  sen: { tr: 'Sen', en: 'You' },
  dusman: { tr: 'Düşman', en: 'Enemy' },
  kayiplarin: { tr: 'Kayıpların', en: 'Your losses' },
  olu: { tr: 'ölü', en: 'dead' },
  yarali: { tr: 'yaralı', en: 'wounded' },
  firar: { tr: 'firar', en: 'deserted' },
  kalan: { tr: 'Kalan er', en: 'Men left' },
  dusmanKaybi: { tr: 'Düşman kaybı (tahmini)', en: 'Enemy losses (estimate)' },
  ganimet: { tr: 'Savaş sonunda gelecek ganimet (tahmini)', en: 'Spoils due at war end (estimate)' },
  esir: { tr: 'beklenen esir', en: 'expected prisoners' },
  ganimetYok: { tr: 'Yenilgide ganimet yok.', en: 'No spoils in defeat.' },
  talim: { tr: 'Talim', en: 'Drill' },
  tamam: { tr: 'Devam', en: 'Continue' },
  not: { tr: 'Kayıplar bu yıl sonunda ayrıca işlenmez; ganimet savaş bittiğinde tek seferde verilir.', en: 'Losses are not applied again at year end; spoils are paid once when the war ends.' },
};

/** Savaş Günü onaylanınca hemen çözülen karar savaşının sonuç ekranı. */
export function SavasSonucu({ sonuc, paraBirimi, onKapat }: { sonuc: SavasGunuSonucu; paraBirimi: string; onKapat: () => void }) {
  const { dil } = useDil();
  const t = (k: keyof typeof M) => M[k][dil];
  const kazandi = sonuc.zafer;
  return (
    <div className="ogreti-katman zemin-koyu" role="dialog" aria-modal="true">
      <div className="ogreti-kutu savas-kutu savas-sonuc">
        <h2>⚔️ {t('baslik')}</h2>
        <div className={`savas-sonuc-baslik ${kazandi ? 's-arti' : 's-eksi'}`}>{kazandi ? `🏆 ${t('zafer')}` : `🩸 ${t('yenilgi')}`}</div>
        <small>
          {ARAZI[sonuc.arazi]?.[dil] ?? sonuc.arazi} · {sonuc.inisiyatif === 'saldiri' ? t('saldiri') : t('savunma')}
        </small>
        <div className="savas-kiyas">
          <strong>{t('guclerin')}</strong>
          <div>
            {t('sen')}: <strong>{sonuc.oyuncuGuc}</strong> ↔ {t('dusman')}: <strong>{sonuc.dusmanGuc}</strong>
          </div>
        </div>
        <div className="savas-kiyas">
          <strong>{t('kayiplarin')}</strong>
          <div>
            <span className="s-eksi">{sonuc.olu}</span> {t('olu')} · <span className="s-eksi">{sonuc.yarali}</span> {t('yarali')} · <span className="s-eksi">{sonuc.firar}</span> {t('firar')} · {t('kalan')}: <strong>{sonuc.kalanEr}</strong>
          </div>
        </div>
        <div className="savas-kiyas">
          <strong>{t('dusmanKaybi')}</strong>
          <div>
            ~<span className="s-arti">{sonuc.dusmanOlu}</span> {t('olu')}
          </div>
        </div>
        <div className="savas-kiyas">
          <strong>{t('ganimet')}</strong>
          {kazandi ? (
            <div>
              <span className="s-arti">+{formatPara(sonuc.ganimetTahmini)} {paraBirimi}</span>
              {sonuc.esirTahmini > 0 && <> · ~{sonuc.esirTahmini} {t('esir')}</>}
            </div>
          ) : (
            <div>{t('ganimetYok')}</div>
          )}
          <div>
            {t('talim')}: <span className="s-arti">+{sonuc.talim}</span>
          </div>
        </div>
        <small>{t('not')}</small>
        <button type="button" className="savas-onay" onClick={onKapat}>
          {t('tamam')}
        </button>
      </div>
    </div>
  );
}
