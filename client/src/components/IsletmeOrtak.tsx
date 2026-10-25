import type { IsletmeGorunumu } from '../types';
import { useDil } from '../DilContext';
import { formatPara, kademeSinifi } from '../format';

type D = { tr: string; en: string };

const M = {
  yatirimlar: { tr: 'Yatırımlar', en: 'Investments' },
  kademe: { tr: 'Kademe', en: 'Tier' },
  yukselt: { tr: 'Yükselt', en: 'Upgrade' },
  azami: { tr: 'Azami', en: 'Maxed' },
  simdi: { tr: 'Şimdi', en: 'Now' },
  sonra: { tr: 'Sonraki kademe', en: 'Next tier' },
  calisanlar: { tr: 'Çalışanların', en: 'Your staff' },
  yok: { tr: 'Henüz çalışanın yok. Limit rütbeyle artar.', en: 'No staff yet. The limit grows with rank.' },
  yetenek: { tr: 'Yetenek', en: 'Skill' },
  maas: { tr: 'maaş', en: 'wage' },
  sadik: { tr: 'Sadık', en: 'Loyal' },
  kov: { tr: 'Çıkar', en: 'Dismiss' },
  adaylar: { tr: 'Adaylar', en: 'Candidates' },
  adayYenilenme: { tr: 'Liste yenilenmesine', en: 'List refreshes in' },
  al: { tr: 'İşe al', en: 'Hire' },
  yil: { tr: '/yıl', en: '/yr' },
  yilKisa: { tr: 'yıl', en: 'yr' },
};

/** Tüccar/Zanaatkâr/Din işletmelerinin ortak bölümleri: yatırımlar, çalışanlar, adaylar. `sadakatAdi`: Din'de "İnanç". */
export function IsletmeOrtak({
  durum,
  yukleniyor,
  sadakatAdi,
  riskliAciklama,
  onYatirim,
  onCalisanAl,
  onEkipCikar,
  goster = 'hepsi',
}: {
  /** Hangi bölüm çizilsin: telefon ana ekranındaki Yatırım / Çalışan sayfaları ayrı gösterir. */
  goster?: 'hepsi' | 'yatirim' | 'calisan' | 'yok';
  durum: IsletmeGorunumu;
  yukleniyor: boolean;
  sadakatAdi: D;
  riskliAciklama: D;
  onYatirim: (yatirimId: string) => void;
  onCalisanAl: (adayId: string) => void;
  onEkipCikar: (ekipId: string) => void;
}) {
  const { dil } = useDil();
  const t = (k: keyof typeof M) => M[k][dil];
  const d = (m: D) => m[dil];
  const pb = durum.paraBirimi;
  const sad = d(sadakatAdi);
  const yatirimGoster = goster === 'hepsi' || goster === 'yatirim';
  const calisanGoster = goster === 'hepsi' || goster === 'calisan';
  return (
    <>
      {yatirimGoster && (
        <>
      <h4>{t('yatirimlar')}</h4>
      <div className="isletme-yatirimlar">
        {durum.yatirimlar.map((y) => (
          <div key={y.id} className="isletme-yatirim" title={d(y.aciklama)}>
            <strong>
              {y.simge} {d(y.ad)}
            </strong>
            <span>
              {t('kademe')} {y.kademe}/{y.maxKademe}
            </span>
            <small>{d(y.aciklama)}</small>
            <span className="isletme-yatirim-etki">
              <b>{t('simdi')}:</b> {d(y.etkiSimdi)}
            </span>
            {y.etkiSonraki && (
              <span className="isletme-yatirim-etki isletme-yatirim-sonraki">
                <b>{t('sonra')}:</b> <span className="kademe-yuksek">{d(y.etkiSonraki)}</span>
              </span>
            )}
            {y.sonrakiFiyat === null ? (
              <span className="isletme-etiket">{t('azami')}</span>
            ) : (
              <button disabled={yukleniyor || durum.para < y.sonrakiFiyat} onClick={() => onYatirim(y.id)}>
                {t('yukselt')} · {formatPara(y.sonrakiFiyat)} {pb}
              </button>
            )}
          </div>
        ))}
      </div>
        </>
      )}

      {calisanGoster && (
        <>
      <h4>
        {t('calisanlar')} ({durum.calisanlar.length}/{durum.calisanTavani})
      </h4>
      {durum.calisanlar.length === 0 ? (
        <p className="isletme-bos">{t('yok')}</p>
      ) : (
        <div className="isletme-calisanlar">
          {durum.calisanlar.map((c) => (
            <div key={c.id} className={`isletme-calisan${c.riskli ? ' isletme-calisan-riskli' : ''}`}>
              <strong>{c.isim}</strong> <em>({d(c.rol)})</em>
              {c.sadik && <span className="isletme-etiket">⭐ {t('sadik')}</span>}
              {c.riskli && (
                <span className="isletme-etiket" title={d(riskliAciklama)}>
                  ⚠️ {sad} <b className="kademe-dusuk">{c.sadakat}</b>
                </span>
              )}
              <small>{d(c.rolAciklama)}</small>
              <span>
                {t('yetenek')} <b className={kademeSinifi(c.yetenek, [40, 65])}>{c.yetenek}</b> · {sad} <b className={kademeSinifi(c.sadakat, [45, 75])}>{c.sadakat}</b> · {t('maas')} {formatPara(c.maas)}
                {t('yil')}
              </span>
              <button className="ikincil" disabled={yukleniyor} onClick={() => onEkipCikar(c.id)}>
                {t('kov')}
              </button>
            </div>
          ))}
        </div>
      )}

      {durum.adaylar.length > 0 && (
        <>
          <h4>
            {t('adaylar')} <small>({t('adayYenilenme')} {durum.adayYenilenmeKalanYil} {t('yilKisa')})</small>
          </h4>
          <div className="isletme-calisanlar">
            {durum.adaylar.map((a) => (
              <div key={a.id} className="isletme-calisan isletme-aday">
                <strong>{a.isim}</strong> <em>({d(a.rol)})</em>
                <span className="isletme-etiket">{d(a.tipAdi)}</span>
                <small>{d(a.rolAciklama)}</small>
                <small>{d(a.gecmis)}</small>
                <span>
                  {t('yetenek')} <b className={kademeSinifi(a.yetenek, [40, 65])}>{a.yetenek}</b> · {sad} <b className={kademeSinifi(a.sadakat, [45, 75])}>{a.sadakat}</b> · {t('maas')} {formatPara(a.maas)}
                  {t('yil')}
                </span>
                <button disabled={yukleniyor || durum.calisanlar.length >= durum.calisanTavani} onClick={() => onCalisanAl(a.id)}>
                  {t('al')}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
        </>
      )}
    </>
  );
}
