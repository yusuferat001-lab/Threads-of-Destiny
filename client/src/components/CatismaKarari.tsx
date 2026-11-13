import type { CatismaKarariDurumu, CatismaSonucuGorunum } from '../types';
import { useDil } from '../DilContext';
import { formatPara } from '../format';

const DUSMAN_TUR: Record<string, { tr: string; en: string }> = {
  okcu: { tr: 'okçu ağırlıklı', en: 'mostly archers' },
  suvari: { tr: 'süvari ağırlıklı', en: 'mostly cavalry' },
  mizrakli: { tr: 'mızraklı ağırlıklı', en: 'mostly spearmen' },
  zirhli: { tr: 'zırhlı ağırlıklı', en: 'mostly armoured knights' },
  karma: { tr: 'karma birlik', en: 'mixed force' },
};

const M = {
  baskinMetin: {
    haydut: { tr: 'Haydutlar ordugâhına baskın yaptı! Savunmaya geçmekten başka çaren yok.', en: 'Bandits are raiding your camp! You have no choice but to defend.' },
    sinir: { tr: 'Sınırda düşman akıncıları baskın verdi! Savunmaya geçmekten başka çaren yok.', en: 'Enemy raiders struck the border! You have no choice but to defend.' },
  },
  karsilasmaMetin: {
    haydut: { tr: 'Yolunu haydutlar kesti. Üstlerine yürüyebilir ya da savunma düzeni alabilirsin.', en: 'Bandits blocked your road. You may charge them or hold a defensive line.' },
    sinir: { tr: 'Sınırda düşman akıncılarıyla karşılaştın. Saldırabilir ya da savunma düzeni alabilirsin.', en: 'You met enemy raiders on the border. You may attack or hold a defensive line.' },
  },
  baslik: { tr: 'Çatışma', en: 'Clash' },
  sen: { tr: 'Sen', en: 'You' },
  dusman: { tr: 'Düşman', en: 'Enemy' },
  saldiri: { tr: 'Saldırı', en: 'Attack' },
  savunma: { tr: 'Savunma', en: 'Defence' },
  saldirGec: { tr: 'Saldır', en: 'Attack' },
  savunGec: { tr: 'Savun', en: 'Defend' },
  saldirAlt: { tr: 'Saldırın düşmanın savunmasına karşı', en: 'Your attack against their defence' },
  savunAlt: { tr: 'Savunman düşmanın saldırısına karşı', en: 'Your defence against their attack' },
  mecburi: { tr: 'Baskın: yalnızca savunabilirsin', en: 'Ambush: you can only defend' },
};

const aralik = (a: [number, number]) => (a[0] === a[1] ? `${a[0]}` : `${a[0]}–${a[1]}`);
/** Senin değerin düşmanın aralığının üstündeyse yeşil, altındaysa kırmızı, içindeyse nötr. */
const renk = (sen: number, a: [number, number]) => (sen > a[1] ? 's-arti' : sen < a[0] ? 's-eksi' : 's-durum');

/** Haydut / sınır çatışması karar penceresi: iki tarafın saldırı ve savunma gücü yan yana; baskında yalnız savunma. */
export function CatismaKarari({ karar, yukleniyor, onSec }: { karar: CatismaKarariDurumu; yukleniyor: boolean; onSec: (s: 'saldiri' | 'savunma') => void }) {
  const { dil } = useDil();
  const t = (k: 'baslik' | 'sen' | 'dusman' | 'saldiri' | 'savunma' | 'saldirGec' | 'savunGec' | 'saldirAlt' | 'savunAlt' | 'mecburi') => M[k][dil];
  const metin = (karar.baskin ? M.baskinMetin : M.karsilasmaMetin)[karar.tur][dil];
  const tur = DUSMAN_TUR[karar.dusmanTur];
  return (
    <div className="ogreti-katman zemin-koyu" role="dialog" aria-modal="true">
      <div className="ogreti-kutu savas-kutu">
        <h2>
          ⚔️ {t('baslik')}: {karar.ad[dil]}
        </h2>
        <p>{metin}</p>
        {tur && (
          <small>
            {t('dusman')}: {tur[dil]}
          </small>
        )}
        <table className="savas-kiyas-tablo">
          <thead>
            <tr>
              <th />
              <th>{t('sen')}</th>
              <th>{t('dusman')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>⚔️ {t('saldiri')}</th>
              <td>
                <strong className={renk(karar.oyuncu.saldiri, karar.dusman.savunma)}>{karar.oyuncu.saldiri}</strong>
              </td>
              <td>{aralik(karar.dusman.saldiri)}</td>
            </tr>
            <tr>
              <th>🛡️ {t('savunma')}</th>
              <td>
                <strong className={renk(karar.oyuncu.savunma, karar.dusman.saldiri)}>{karar.oyuncu.savunma}</strong>
              </td>
              <td>{aralik(karar.dusman.savunma)}</td>
            </tr>
          </tbody>
        </table>
        <div className="ogreti-kartlar">
          {!karar.baskin && (
            <button type="button" className="ogreti-kart savas-secenek" disabled={yukleniyor} onClick={() => onSec('saldiri')}>
              <div className="ogreti-simge">⚔️</div>
              <strong>{t('saldirGec')}</strong>
              <p>
                {t('saldirAlt')}: <b className={renk(karar.oyuncu.saldiri, karar.dusman.savunma)}>{karar.oyuncu.saldiri}</b> ↔ {aralik(karar.dusman.savunma)}
              </p>
            </button>
          )}
          <button type="button" className="ogreti-kart savas-secenek" disabled={yukleniyor} onClick={() => onSec('savunma')}>
            <div className="ogreti-simge">🛡️</div>
            <strong>{karar.baskin ? t('mecburi') : t('savunGec')}</strong>
            <p>
              {t('savunAlt')}: <b className={renk(karar.oyuncu.savunma, karar.dusman.saldiri)}>{karar.oyuncu.savunma}</b> ↔ {aralik(karar.dusman.saldiri)}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

const S = {
  zafer: { tr: 'ZAFER', en: 'VICTORY' },
  yenilgi: { tr: 'YENİLGİ', en: 'DEFEAT' },
  baslik: { tr: 'Çatışma Sonucu', en: 'Clash Result' },
  saldirdin: { tr: 'Saldırıya geçtin', en: 'You attacked' },
  savundun: { tr: 'Savunmada kaldın', en: 'You defended' },
  guc: { tr: 'Senin gücün', en: 'Your strength' },
  dusmanGuc: { tr: 'Düşmanın gücü', en: "Enemy's strength" },
  kayip: { tr: 'Kayıpların', en: 'Your losses' },
  olu: { tr: 'ölü', en: 'dead' },
  yarali: { tr: 'yaralı', en: 'wounded' },
  firar: { tr: 'firar', en: 'deserted' },
  kalan: { tr: 'Kalan er', en: 'Men left' },
  dusmanKaybi: { tr: 'Düşman kaybı (tahmini)', en: 'Enemy losses (estimate)' },
  ganimet: { tr: 'Ganimet', en: 'Spoils' },
  esir: { tr: 'esir', en: 'prisoners' },
  ganimetYok: { tr: 'Yenilgide ganimet yok.', en: 'No spoils in defeat.' },
  hasar: { tr: 'Baskın kesene zarar verdi', en: 'The raid cost you coin' },
  tamam: { tr: 'Devam', en: 'Continue' },
};

/** Çatışma sonuç ekranı: kim kazandı, güçler (zarsız), kayıplar, ganimet. */
export function CatismaSonucu({ sonuc, paraBirimi, onKapat }: { sonuc: CatismaSonucuGorunum; paraBirimi: string; onKapat: () => void }) {
  const { dil } = useDil();
  const t = (k: keyof typeof S) => S[k][dil];
  return (
    <div className="ogreti-katman zemin-koyu" role="dialog" aria-modal="true">
      <div className="ogreti-kutu savas-kutu savas-sonuc">
        <h2>⚔️ {t('baslik')}</h2>
        <div className={`savas-sonuc-baslik ${sonuc.zafer ? 's-arti' : 's-eksi'}`}>{sonuc.zafer ? `🏆 ${t('zafer')}` : `🩸 ${t('yenilgi')}`}</div>
        <small>{sonuc.inisiyatif === 'saldiri' ? t('saldirdin') : t('savundun')}</small>
        <div className="savas-kiyas">
          <div>
            {t('guc')}: <strong>{sonuc.oyuncuGuc}</strong> ↔ {t('dusmanGuc')}: <strong>{sonuc.dusmanGuc}</strong>
          </div>
        </div>
        <div className="savas-kiyas">
          <strong>{t('kayip')}</strong>
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
          {sonuc.zafer ? (
            <div>
              <span className="s-arti">
                +{formatPara(sonuc.ganimet)} {paraBirimi}
              </span>
              {sonuc.esir > 0 && (
                <>
                  {' '}
                  · ~{sonuc.esir} {t('esir')}
                </>
              )}
            </div>
          ) : (
            <div>{t('ganimetYok')}</div>
          )}
          {sonuc.nakitHasar > 0 && (
            <div className="s-eksi">
              {t('hasar')}: −{formatPara(sonuc.nakitHasar)} {paraBirimi}
            </div>
          )}
        </div>
        <button type="button" className="savas-onay" onClick={onKapat}>
          {t('tamam')}
        </button>
      </div>
    </div>
  );
}
