import type { IsletmeGorunumu } from '../types';
import { useDil } from '../DilContext';
import { formatPara, formatYuzde, kademeSinifi } from '../format';

type D = { tr: string; en: string };

const M = {
  yatirimlar: { tr: 'Yatırımlar', en: 'Investments' },
  kademe: { tr: 'Kademe', en: 'Tier' },
  yukselt: { tr: 'Yükselt', en: 'Upgrade' },
  dusur: { tr: 'Kademeyi düşür', en: 'Lower the tier' },
  azami: { tr: 'Azami', en: 'Maxed' },
  simdi: { tr: 'Şimdi', en: 'Now' },
  sonra: { tr: 'Sonraki kademe', en: 'Next tier' },
  yillikMasraf: { tr: 'Yıllık masraf', en: 'Yearly cost' },
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

type Etki = { tur: 'ana' | 'maliyet' | 'musteri' | 'guvenlik' | 'taarruz' | 'savunma' | 'kesif'; deger: number } | null;

/** Asker subayının kısa artı/eksi satırları. */
function EtkiSatirlari({ satirlar, dil }: { satirlar?: { tr: string; en: string; iyi: boolean }[]; dil: 'tr' | 'en' }) {
  if (!satirlar || satirlar.length === 0) return null;
  return (
    <span className="subay-satirlar">
      {satirlar.map((x, i) => (
        <span key={i} className={x.iyi ? 's-arti' : 's-eksi'}>
          {x.iyi ? '＋' : '－'} {x[dil]}
        </span>
      ))}
    </span>
  );
}

/** Çalışanın/adayın işletmeye etkisi, mesleğe göre okunur tek satır (örn. "Alış maliyeti −%12"). */
function etkiMetni(dil: 'tr' | 'en', etki: Etki, durum: IsletmeGorunumu): string | null {
  if (!etki) return null;
  const mod = durum.birlik ? 'birlik' : durum.cemaat ? 'cemaat' : durum.uretim ? 'uretim' : 'ticaret';
  const yuzde = Math.round(etki.deger * 100);
  const tr = dil === 'tr';
  if (mod === 'birlik') {
    // Asker subayları: sunucu GERÇEK etkiyi gönderir (güce yansıyan %, kayıp/firar azalması %, yılda gelen er).
    switch (etki.tur) {
      case 'ana':
        return `${tr ? 'Askerî güç' : 'Military strength'} ${formatYuzde(dil, yuzde, true)}`;
      case 'maliyet':
        return `${tr ? 'Er ve erzak masrafı' : 'Men and supply costs'} −${formatYuzde(dil, yuzde)}`;
      case 'musteri':
        return tr ? `+${Math.round(etki.deger)} er/yıl` : `+${Math.round(etki.deger)} men/yr`;
      case 'guvenlik':
        return `${tr ? 'Kayıp ve firar' : 'Losses and desertion'} −${formatYuzde(dil, yuzde)}`;
      default:
        return null; // Taarruz / Savunma / Keşif: satırlar etkiSatirlari ile gösterilir
    }
  }
  switch (etki.tur) {
    case 'maliyet': {
      const ad = mod === 'cemaat' ? (tr ? 'Faaliyet masrafı' : 'Activity costs') : mod === 'uretim' ? (tr ? 'Hammadde gideri' : 'Material costs') : tr ? 'Alış maliyeti' : 'Purchase cost';
      return `${ad} −${formatYuzde(dil, yuzde)}`;
    }
    case 'musteri': {
      const n = Math.round(etki.deger);
      return mod === 'cemaat' ? (tr ? `+${n} inanan/yıl` : `+${n} worshippers/yr`) : tr ? `+${n} müşteri/yıl` : `+${n} customers/yr`;
    }
    case 'guvenlik':
      return `${tr ? 'Koruma' : 'Protection'} ${formatYuzde(dil, yuzde, true)}`;
    case 'ana': {
      const ad = mod === 'cemaat' ? (tr ? 'Bağışlar' : 'Donations') : mod === 'uretim' ? (tr ? 'Yıllık üretim' : 'Yearly output') : tr ? 'Satışlar' : 'Sales';
      return `${ad} ${formatYuzde(dil, yuzde, true)}`;
    }
    default:
      return null;
  }
}

/** Tüccar/Zanaatkâr/Din işletmelerinin ortak bölümleri: yatırımlar, çalışanlar, adaylar. `sadakatAdi`: Din'de "İnanç". */
export function IsletmeOrtak({
  durum,
  yukleniyor,
  sadakatAdi,
  riskliAciklama,
  onYatirim,
  onYatirimDusur,
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
  onYatirimDusur?: (yatirimId: string) => void;
  onCalisanAl: (adayId: string) => void;
  onEkipCikar: (ekipId: string) => void;
}) {
  const { dil } = useDil();
  const t = (k: keyof typeof M) => M[k][dil];
  const d = (m: D) => m[dil];
  const en = dil === 'en';
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
            <span className="s-esik">
              {t('kademe')} {y.kademe}/{y.maxKademe}
            </span>
            <small>{d(y.aciklama)}</small>
            <span className="isletme-yatirim-etki">
              <b>{t('simdi')}:</b> {d(y.etkiSimdi)}
            </span>
            {y.yillikMasraf > 0 && (
              <span className="isletme-yatirim-etki">
                <b>{t('yillikMasraf')}:</b> <span className="kademe-dusuk">{formatPara(y.yillikMasraf)}</span>
                {y.sonrakiMasraf !== null && <span className="kademe-dusuk"> (+{formatPara(y.sonrakiMasraf)})</span>}
              </span>
            )}
            {y.etkiSonraki && (
              <span className="isletme-yatirim-etki isletme-yatirim-sonraki">
                <b>{t('sonra')}:</b> <span className="kademe-yuksek">{d(y.etkiSonraki)}</span>
              </span>
            )}
            {y.sonrakiFiyat === null ? (
              <span className="isletme-etiket">{t('azami')}</span>
            ) : (
              <button disabled={yukleniyor || durum.para < y.sonrakiFiyat} onClick={() => onYatirim(y.id)}>
                {t('yukselt')} · <span className="s-gider">{formatPara(y.sonrakiFiyat)} {pb}</span>
              </button>
            )}
            {onYatirimDusur && y.dusur && (
              <button
                className="ikincil"
                disabled={yukleniyor || !!y.dusur.engel}
                title={y.dusur.engel ?? undefined}
                onClick={() => onYatirimDusur(y.id)}
              >
                {t('dusur')}
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
              {durum.birlik && <small>{d(c.rolAciklama)}</small>}
              {c.sadik && <span className="isletme-etiket">⭐ {t('sadik')}</span>}
              {c.riskli && (
                <span className="isletme-etiket" title={d(riskliAciklama)}>
                  ⚠️ {sad} <b className="kademe-dusuk">{c.sadakat}</b>
                </span>
              )}
              {etkiMetni(dil, c.etki, durum) && <span className="isletme-calisan-etki kademe-yuksek">{etkiMetni(dil, c.etki, durum)}</span>}
              <EtkiSatirlari satirlar={c.etkiSatirlari} dil={dil} />
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
                {durum.birlik && <small>{d(a.rolAciklama)} · <b>{d(a.tipAdi)}</b></small>}
                <small>{d(a.gecmis)}</small>
                {durum.birlik && a.sadakat < 45 && (
                  <small className="s-eksi">⚠ {en ? 'Low loyalty: may leak secrets, steal or desert.' : 'Sadakati düşük: sır sızdırabilir, çalabilir ya da ayrılabilir.'}</small>
                )}
                {etkiMetni(dil, a.etki, durum) && <span className="isletme-calisan-etki kademe-yuksek">{etkiMetni(dil, a.etki, durum)}</span>}
                <EtkiSatirlari satirlar={a.etkiSatirlari} dil={dil} />
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
