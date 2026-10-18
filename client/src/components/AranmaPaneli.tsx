import { useEffect, useState } from 'react';
import { aranmaGetir, aranmaKefaretOde, aranmaTeslimOl } from '../api';
import { formatPara } from '../format';
import { useDil } from '../DilContext';
import type { AranmaDurumu, CharacterState } from '../types';

interface AranmaPaneliProps {
  karakter: CharacterState;
  onState: (state: CharacterState) => void;
}

/** Yıldız tablosu: sunucudaki data/aranmaSabitleri.ts değerlerinin aynası (yalnız gösterim). */
const YILDIZ_SATIRLARI = [
  { yildiz: 0, aralik: '0–24', basari: 0, risk: 0, hapis: '3–4' },
  { yildiz: 1, aralik: '25–49', basari: 7, risk: 10, hapis: '7–9' },
  { yildiz: 2, aralik: '50–74', basari: 14, risk: 20, hapis: '9–11' },
  { yildiz: 3, aralik: '75+', basari: 25, risk: 30, hapis: '12–14' },
];
const DEBUFF_YUZDE = [0, 5.5, 10, 15];

/**
 * Aranma ekranı (Aranma II): yıldıza göre etkiler tablosu (bulunduğun yıldız vurgulu),
 * gönüllü kefaret (%20 indirimli, 30 üstünde yarım ödeme) ve gönüllü teslim (−%25 ceza).
 * Veri GET /:id/aranma'dan gelir; metinler bileşene gömülü TR+EN.
 */
export function AranmaPaneli({ karakter, onState }: AranmaPaneliProps) {
  const { dil } = useDil();
  const t = (tr: string, en: string) => (dil === 'en' ? en : tr);
  const [d, setD] = useState<AranmaDurumu | null>(null);
  const [mesaj, setMesaj] = useState<string | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [mesgul, setMesgul] = useState(false);

  useEffect(() => {
    let iptal = false;
    aranmaGetir(karakter.id)
      .then((r) => {
        if (!iptal) setD(r.aranma);
      })
      .catch(() => {});
    return () => {
      iptal = true;
    };
  }, [karakter.id, karakter.suc_seviyesi, karakter.para, karakter.etiketler.length]);

  async function calistir(is: () => Promise<{ state: CharacterState; mesaj: string }>) {
    setMesgul(true);
    setHata(null);
    try {
      const r = await is();
      onState(r.state);
      setMesaj(r.mesaj);
    } catch (e) {
      setHata(e instanceof Error ? e.message : String(e));
    } finally {
      setMesgul(false);
    }
  }

  if (!d) return null;
  const birim = d.paraBirimi;
  const yetmiyor = (tutar: number) => d.para < tutar;

  return (
    <div className="aranma-paneli">
      <table className="aranma-tablo">
        <thead>
          <tr>
            <th>★</th>
            <th>{t('Aranma', 'Wanted')}</th>
            <th>{t('Gelir kaybı', 'Income loss')}</th>
            <th>{t('Suç başarısı', 'Crime success')}</th>
            <th>{t('Yakalanma riski', 'Catch risk')}</th>
            <th>{t('Hapis', 'Prison')}</th>
          </tr>
        </thead>
        <tbody>
          {YILDIZ_SATIRLARI.map((s) => (
            <tr key={s.yildiz} className={s.yildiz === d.yildiz ? 'aranma-tablo-aktif' : undefined}>
              <td>{s.yildiz === 0 ? '—' : '★'.repeat(s.yildiz)}</td>
              <td>{s.aralik}</td>
              <td>{DEBUFF_YUZDE[s.yildiz] ? `−%${DEBUFF_YUZDE[s.yildiz]}` : '—'}</td>
              <td>{s.basari ? `+${s.basari}` : '—'}</td>
              <td>{s.risk ? t(`%${s.risk} az`, `${s.risk}% lower`) : '—'}</td>
              <td>{t(`${s.hapis} yıl`, `${s.hapis} yrs`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {d.debuffOrani > 0 && (
        <p className="gosterge-bilgi">
          {t(
            `Şu an ${d.debuffEtiketi} ${Math.round(d.debuffOrani * 1000) / 10}% etkileniyor.`,
            `Currently ${d.debuffEtiketi} is cut by ${Math.round(d.debuffOrani * 1000) / 10}%.`
          )}
        </p>
      )}
      {d.bekleyenBaskin && (
        <p className="gosterge-bilgi aranma-uyari">
          {t(
            '⚠️ Yıllar içinde evine bir baskın yapılabilir. Aranmanı 75’in altına çekersen baskın iptal olur.',
            '⚠️ A raid on your home may come within a few years. Drop below 75 to cancel it.'
          )}
        </p>
      )}

      {d.puan > 0 && (
        <div className="aranma-islemler">
          <h3 className="gosterge-baslik">{t('Kefaret öde', 'Pay bail')}</h3>
          <div className="aranma-butonlar">
            <button type="button" disabled={mesgul || yetmiyor(d.tamTutar)} onClick={() => calistir(() => aranmaKefaretOde(karakter.id, false))}>
              {t('Tamamını öde', 'Pay in full')} · {formatPara(d.tamTutar)} {birim}
            </button>
            {d.yarimMumkun && (
              <button type="button" disabled={mesgul || yetmiyor(d.yarimTutar)} onClick={() => calistir(() => aranmaKefaretOde(karakter.id, true))}>
                {t('Yarısını öde', 'Pay half')} · {formatPara(d.yarimTutar)} {birim}
              </button>
            )}
          </div>
          <p className="gosterge-bilgi">
            {t(
              'Kendi isteğinle ödersen %20 indirim alırsın. Tam ödeme sicilini temizler, yarım ödeme yarıya indirir.',
              'Paying voluntarily gives you 20% off. Paying in full clears your record; half payment halves it.'
            )}
          </p>
          {d.teslimCezasi !== null && (
            <>
              <h3 className="gosterge-baslik">{t('Teslim ol', 'Turn yourself in')}</h3>
              <div className="aranma-butonlar">
                <button type="button" disabled={mesgul} onClick={() => calistir(() => aranmaTeslimOl(karakter.id))}>
                  {t('Kendi isteğimle teslim ol', 'Turn myself in')} · ~{d.teslimCezasi} {t('yıl', 'yrs')}
                </button>
              </div>
              <p className="gosterge-bilgi">
                {t('Teslim olursan ceza %25 daha kısa olur.', 'Turning yourself in shortens the sentence by 25%.')}
              </p>
            </>
          )}
        </div>
      )}
      <p className="gosterge-bilgi">
        {t(
          'Kendi isteğinizle teslim olup kefaret öderseniz veya hapis yatarsanız cezalarınız hafifletilir. Uzun yıllar suça karışmazsanız şehir yavaş yavaş sizi unutmaya başlar.',
          'If you voluntarily surrender, pay bail or serve time, your penalties are eased. If you stay out of crime for many years, the city slowly begins to forget you.'
        )}
      </p>
      {mesaj && <p className="gosterge-bilgi aranma-basari">{mesaj}</p>}
      {hata && <p className="gosterge-bilgi aranma-hata">{hata}</p>}
    </div>
  );
}
