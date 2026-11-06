import { useState, type ReactNode } from 'react';
import type { EkipUyesi, KotuIsKarti, Rakip } from '../types';
import { useDil } from '../DilContext';
import { formatPara, formatYuzde } from '../format';
import { bic, type Metinler } from '../i18n';
import type { Dil } from '../ayarlar';

/** Karanlık iş adları/açıklamaları — i18n.ts yerine bileşene gömülü (NasilOynanir deseni). */
export const KARANLIK_ISLER: Record<string, { tr: { ad: string; aciklama: string }; en: { ad: string; aciklama: string } }> = {
  kervan_yagmalat: {
    tr: { ad: '🐫 Rakibin Kervanını Yağmalat', aciklama: 'Yolda baskın yaptır; mal senin olsun, rakibin pazarı sarsılsın.' },
    en: { ad: "🐫 Have Your Rival's Caravan Raided", aciklama: 'Ambush it on the road; the goods are yours and your rival’s market reels.' },
  },
  rakibe_iftira: {
    tr: { ad: '📜 Rakibe İftira At', aciklama: 'Rakibin hakkında dedikodu yay; müşterileri sana geçsin. Yakalanırsan itibarın zedelenir.' },
    en: { ad: '📜 Slander Your Rival', aciklama: 'Spread rumours about your rival so customers drift to you. Get caught and your name suffers.' },
  },
  gumruk_rusvet: {
    tr: { ad: '🛃 Gümrüğe Rüşvet', aciklama: 'Gümrükçüye avuç dolusu para; malın sorgusuz geçer, sermayen büyür.' },
    en: { ad: '🛃 Bribe the Customs House', aciklama: 'A fistful of coin to the customs man; your goods pass unasked, your capital grows.' },
  },
  sahte_mucize: {
    tr: { ad: '✨ Sahte Mucize', aciklama: 'Ağlayan ikona, iyileşen kör… Cemaat sana koşar. Yakalanırsan şarlatansın.' },
    en: { ad: '✨ Stage a False Miracle', aciklama: 'A weeping icon, a blind man healed… the faithful flock to you. Get caught and you are a fraud.' },
  },
  afaroz_ettir: {
    tr: { ad: '📜 Rakibi Aforoz Ettir', aciklama: 'Üstlerine rakibini ihbar et; cemaatini elinden al.' },
    en: { ad: '📜 Have Your Rival Excommunicated', aciklama: 'Denounce your rival to the hierarchy and strip away their flock.' },
  },
  vali_santaj: {
    tr: { ad: '🗝️ Valiye Şantaj', aciklama: 'Günah çıkarırken duyduklarını kullan; vali sana borçlansın.' },
    en: { ad: '🗝️ Blackmail the Governor', aciklama: 'Use what you heard in confession; let the governor owe you.' },
  },
  formul_cal: {
    tr: { ad: '🔍 Rakibin Formülünü Çal', aciklama: 'Atölyesine birini sok; sırrı senin olsun, üretimin artsın.' },
    en: { ad: "🔍 Steal Your Rival's Formula", aciklama: 'Slip someone into their workshop; the secret is yours and your output grows.' },
  },
  hammadde_topla: {
    tr: { ad: '🪵 Hammaddeyi Kapat', aciklama: 'Piyasadaki malzemeyi peşin al; rakip boş tezgâhta kalsın, sen kârla sat.' },
    en: { ad: '🪵 Corner the Raw Materials', aciklama: 'Buy up the supply in advance; your rival idles while you sell at a profit.' },
  },
  lonca_manipule: {
    tr: { ad: '⚖️ Lonca Kararını Çarpıt', aciklama: 'Oyları satın al; kararlar senden yana çıksın, ustalar sana yaklaşsın.' },
    en: { ad: '⚖️ Rig the Guild Vote', aciklama: 'Buy the votes; decisions go your way and the masters draw closer to you.' },
  },
  kaos_cikar: {
    tr: { ad: '🌪️ Kaos Çıkar, Koruma Sat', aciklama: 'Sokakları karıştır, sonra düzeni sen getir; vali sana muhtaç kalsın.' },
    en: { ad: '🌪️ Stir Chaos, Sell Protection', aciklama: 'Stir up the streets, then bring the order yourself; leave the governor needing you.' },
  },
  kaza_duello: {
    tr: { ad: '🤺 Kaza Süsü Verilmiş Düello', aciklama: 'Rakip komutanı düelloya çağır, "kaza" olsun. Kazanırsan rakibin biter; kaybedersen ölebilirsin.' },
    en: { ad: '🤺 A Duel Dressed Up as an Accident', aciklama: 'Call the rival commander out and let it be an "accident". Win and your rival is finished; lose and you may die.' },
  },
  kervan_baskini: {
    tr: { ad: '🏴 Kervan Baskını', aciklama: 'Adamlarınla yol kes; ganimet ve silah senin.' },
    en: { ad: '🏴 Caravan Raid', aciklama: 'Hold up the road with your men; the loot and the weapons are yours.' },
  },
};

/** Sünni İslam'da aforoz yerine tekfir fetvası (aynı mekanik, farklı ad). */
const AFAROZ_SUNNI = {
  tr: { ad: '📜 Rakip Hakkında Fetva Çıkart', aciklama: 'Kadıya rakibini şikâyet et; hakkında fetva çıksın, cemaati dağılsın.' },
  en: { ad: '📜 Get a Fatwa Against Your Rival', aciklama: "Denounce your rival to the qadi; let a fatwa scatter their flock." },
};

export function karanlikIsMetni(dil: Dil, id: string, dinKultur?: string | null): { ad: string; aciklama: string } {
  const kayit = id === 'afaroz_ettir' && dinKultur === 'Sünni İslam' ? AFAROZ_SUNNI : KARANLIK_ISLER[id];
  if (!kayit) return { ad: id, aciklama: '' };
  return dil === 'en' ? kayit.en : kayit.tr;
}

export function sucSeviyesiEtiketi(m: Metinler, seviye: number): string {
  if (seviye < 25) return m.iySicilTemiz;
  if (seviye < 50) return m.iySicilDikkat;
  if (seviye < 75) return m.iySicilCiddi;
  return m.iySicilPesinde;
}


interface KaranlikIslerProps {
  isler: KotuIsKarti[];
  rakipler: Rakip[];
  ekip: EkipUyesi[];
  paraBirimi: string;
  yukleniyor: boolean;
  dinKultur: string | null;
  sucSeviyesi: number;
  /** Rakip adı → pazar payı (0-100), pazar durumundan. */
  rakipPay: (ad: string) => number;
  onKotuIs: (id: string, opts?: { hedefRakipAd?: string; ajanId?: string }) => void;
}

const M = {
  baslik: { tr: 'Karanlık İşler', en: 'Dark Dealings' },
  adim1: { tr: '1 · Suçu seç', en: '1 · Pick the deed' },
  adim2: { tr: '2 · Rakibi seç', en: '2 · Pick the rival' },
  adim3: { tr: '3 · Kim yapsın?', en: '3 · Who does it?' },
  ozel: { tr: 'Mesleğine özel işler', en: 'Your trade’s dirty work' },
  herkes: { tr: 'Herkesin işleri', en: 'Anyone can do these' },
  geri: { tr: '← Geri', en: '← Back' },
  vazgec: { tr: 'Vazgeç', en: 'Cancel' },
  onayla: { tr: 'Onayla', en: 'Confirm' },
  kendin: { tr: '🧑 Kendin', en: '🧑 Yourself' },
  calisan: { tr: '👥 Çalışanın', en: '👥 An employee' },
  kendinNot: { tr: 'Sonuç hemen belli olur; risk sende.', en: 'The result is immediate; the risk is yours.' },
  calisanNot: { tr: 'Sonuç yıl dönerken öğrenilir; başarıda risk onda, ele verirse sana dönebilir.', en: 'The result comes at year’s end; on success the risk is theirs, but if they talk it can come back to you.' },
  calisanYok: { tr: 'Bu işi yaptırmak için bir çalışan tut.', en: 'Hire an employee to have them do this for you.' },
  calisanDegil: { tr: 'Bu işi çalışana yaptıramazsın.', en: 'This deed cannot be delegated.' },
  bekliyor: { tr: 'Ortalık kızışık', en: 'Lying low' },
  yil: { tr: 'yıl', en: 'yr' },
  hedef: { tr: 'Hedef', en: 'Target' },
  pay: { tr: 'pay', en: 'share' },
  sadik: { tr: 'sadık', en: 'loyal' },
  sec: { tr: 'Seç', en: 'Pick' },
};

function husumetEtiket(h: number, en: boolean): string {
  return h >= 70 ? (en ? 'blood feud' : 'kan davası') : h >= 45 ? (en ? 'holds a grudge' : 'kırgın') : en ? 'lukewarm' : 'ılımlı';
}

/** Karanlık işler sihirbazı: 1) suç → 2) rakip (yalnız rakibe yönelik işlerde) → 3) kim yapsın (kendin / çalışan). */
export function KaranlikIsler({ isler, rakipler, ekip, paraBirimi, yukleniyor, dinKultur, sucSeviyesi, rakipPay, onKotuIs }: KaranlikIslerProps) {
  const { dil, m, kt } = useDil();
  const en = dil === 'en';
  const t = (k: keyof typeof M) => M[k][en ? 'en' : 'tr'];
  const aktifRakipler = rakipler.filter((r) => !r.yenildi);
  const [adim, setAdim] = useState<1 | 2 | 3>(1);
  const [isId, setIsId] = useState<string | null>(null);
  const [hedef, setHedef] = useState<string>('');
  const [yapan, setYapan] = useState<'kendin' | 'calisan'>('kendin');
  const [calisanId, setCalisanId] = useState<string>('');

  const is = isler.find((x) => x.id === isId) ?? null;
  const rakipHedefli = !!is && is.rakipKirmaYuzde > 0 && aktifRakipler.length > 0;
  const sifirla = () => {
    setAdim(1);
    setIsId(null);
    setHedef('');
    setYapan('kendin');
    setCalisanId('');
  };
  const isSec = (x: KotuIsKarti) => {
    setIsId(x.id);
    setYapan('kendin');
    if (x.rakipKirmaYuzde > 0 && aktifRakipler.length > 0) {
      setHedef(aktifRakipler[0].ad);
      setAdim(2);
    } else {
      setHedef('');
      setAdim(3);
    }
  };
  const onayla = () => {
    if (!is) return;
    const ajan = yapan === 'calisan' ? calisanId || ekip[0]?.id : undefined;
    onKotuIs(is.id, { hedefRakipAd: rakipHedefli ? hedef : undefined, ajanId: ajan });
    sifirla();
  };

  const rozetler = (x: KotuIsKarti): ReactNode[] => {
    const r: ReactNode[] = [<span key="s">{bic(m.iyKaranlikSans, x.basariSansi)}</span>];
    if (x.tahminiKazanc > 0) r.push(<span key="k" className="s-gelir">{bic(m.iyKaranlikKazanc, formatPara(x.tahminiKazanc), paraBirimi)}</span>);
    if (x.maliyet > 0) r.push(<span key="b" className="s-gider">{`${en ? 'cost' : 'bedel'} ${formatPara(x.maliyet)} ${paraBirimi}`}</span>);
    if (x.musteriKazanci > 0) r.push(<span key="m" className="s-arti">{en ? `+${x.musteriKazanci} customers` : `+${x.musteriKazanci} müşteri`}</span>);
    if (x.rakipKirmaYuzde >= 100) r.push(<span key="r">{en ? 'finishes your rival' : 'rakibi bitirir'}</span>);
    else if (x.rakipKirmaYuzde > 0) r.push(<span key="r">{en ? 'weakens your rival' : 'rakibi zayıflatır'}</span>);
    return r;
  };
  const adTemiz = (id: string) => karanlikIsMetni(dil, id, dinKultur).ad.replace(/^\p{Extended_Pictographic}\uFE0F?\s*/u, '');

  const kartListe = (liste: KotuIsKarti[]) => (
    <div className="kis-kartlar">
      {liste.map((x) => {
        const bekliyor = x.kalanYil > 0;
        return (
          <button key={x.id} type="button" className={`kis-kart${bekliyor ? ' kis-kart-pasif' : ''}`} disabled={yukleniyor || bekliyor} title={karanlikIsMetni(dil, x.id, dinKultur).aciklama} onClick={() => isSec(x)}>
            <span className="kis-kart-ust">
              <span className="kis-simge">{x.simge}</span>
              <strong>{adTemiz(x.id)}</strong>
            </span>
            <span className="kis-rozetler">
              {bekliyor ? `${t('bekliyor')} · ${x.kalanYil} ${t('yil')}` : rozetler(x)}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="kis-sihirbaz">
      <h3>{t('baslik')}</h3>
      <p className={`suc-seviyesi-gostergesi ${sucSeviyesi >= 50 ? 'suc-seviyesi-riskli' : ''}`}>
        {bic(m.iySucSeviyen, Math.round(sucSeviyesi), sucSeviyesiEtiketi(m, sucSeviyesi))}
      </p>

      <div className="kis-adimlar" aria-label="adımlar">
        <span className={adim === 1 ? 'kis-adim-aktif' : ''}>{t('adim1')}</span>
        <span className={adim === 2 ? 'kis-adim-aktif' : ''}>{t('adim2')}</span>
        <span className={adim === 3 ? 'kis-adim-aktif' : ''}>{t('adim3')}</span>
      </div>

      {adim === 1 && (
        <div className="kis-icerik">
          {[true, false].map((ozel) => {
            const liste = isler.filter((x) => x.meslegeOzel === ozel);
            if (liste.length === 0) return null;
            return (
              <div key={String(ozel)} className="kis-grup">
                <h4>{ozel ? t('ozel') : t('herkes')}</h4>
                {kartListe(liste)}
              </div>
            );
          })}
        </div>
      )}

      {adim === 2 && is && (
        <div className="kis-icerik">
          <div className="kis-secili">
            {is.simge} <strong>{adTemiz(is.id)}</strong>
          </div>
          <div className="kis-kartlar kis-rakipler">
            {aktifRakipler.map((r) => (
              <button
                key={r.ad}
                type="button"
                className={`kis-kart${hedef === r.ad ? ' kis-kart-secili' : ''}`}
                disabled={yukleniyor}
                onClick={() => {
                  setHedef(r.ad);
                  setAdim(3);
                }}
              >
                <span className="kis-kart-ust">
                  <span className="kis-simge">♟️</span>
                  <strong>{r.ad}</strong>
                </span>
                <span className="kis-rozetler">
                  <span>{kt(r.meslek)}</span>
                  <span>
                    {t('pay')}: {formatYuzde(dil, rakipPay(r.ad))}
                  </span>
                  <span>{husumetEtiket(r.husumet, en)}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="kis-alt">
            <button type="button" className="ikincil" onClick={() => setAdim(1)}>
              {t('geri')}
            </button>
          </div>
        </div>
      )}

      {adim === 3 && is && (
        <div className="kis-icerik">
          <div className="kis-secili">
            {is.simge} <strong>{adTemiz(is.id)}</strong>
            {rakipHedefli && (
              <span>
                {' '}
                → ♟️ {t('hedef')}: <strong>{hedef}</strong>
              </span>
            )}
          </div>
          <div className="kis-sekmeler" role="tablist">
            <button type="button" role="tab" aria-selected={yapan === 'kendin'} className={yapan === 'kendin' ? 'kis-sekme-aktif' : 'ikincil'} onClick={() => setYapan('kendin')}>
              {t('kendin')}
            </button>
            <button type="button" role="tab" aria-selected={yapan === 'calisan'} className={yapan === 'calisan' ? 'kis-sekme-aktif' : 'ikincil'} disabled={!is.calisanIsi} onClick={() => setYapan('calisan')}>
              {t('calisan')}
            </button>
          </div>
          {yapan === 'kendin' ? (
            <p className="kis-not">{t('kendinNot')}</p>
          ) : !is.calisanIsi ? (
            <p className="kis-not">{t('calisanDegil')}</p>
          ) : ekip.length === 0 ? (
            <p className="kis-not">{t('calisanYok')}</p>
          ) : (
            <>
              <p className="kis-not">{t('calisanNot')}</p>
              <div className="kis-kartlar kis-calisanlar">
                {ekip.map((u) => (
                  <button key={u.id} type="button" className={`kis-kart${(calisanId || ekip[0].id) === u.id ? ' kis-kart-secili' : ''}`} disabled={yukleniyor} onClick={() => setCalisanId(u.id)}>
                    <span className="kis-kart-ust">
                      <span className="kis-simge">🧑</span>
                      <strong>{u.isim}</strong>
                    </span>
                    <span className="kis-rozetler">
                      <span>{u.rol}</span>
                      <span>
                        {formatYuzde(dil, Math.round(u.sadakat))} {t('sadik')}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="kis-alt">
            <button type="button" className="ikincil" onClick={() => setAdim(rakipHedefli ? 2 : 1)}>
              {t('geri')}
            </button>
            <button type="button" className="ikincil" onClick={sifirla}>
              {t('vazgec')}
            </button>
            <button type="button" disabled={yukleniyor || (yapan === 'calisan' && (!is.calisanIsi || ekip.length === 0))} onClick={onayla}>
              {t('onayla')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
