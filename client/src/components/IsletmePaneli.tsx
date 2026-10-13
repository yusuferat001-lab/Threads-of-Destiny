import { useState } from 'react';
import type { IsletmeGorunumu, IsletmeHatGorunumu, IsletmeFiyat, IsletmeKararGirdisi } from '../types';
import { useDil } from '../DilContext';
import { formatPara, formatYuzde } from '../format';

interface Props {
  durum: IsletmeGorunumu;
  yukleniyor: boolean;
  onKarar: (hatlar: IsletmeKararGirdisi[]) => void;
  onYatirim: (yatirimId: string) => void;
  onCalisanAl: (adayId: string) => void;
  onEkipCikar: (ekipId: string) => void;
}

/** Metinler bileşene gömülü (NasilOynanir/KARANLIK_ISLER deseni): TR + EN aynı objede. */
const M = {
  baslik: { tr: '🏪 İşletmen', en: '🏪 Your Business' },
  kitle: { tr: 'Müşteri kitlen', en: 'Customer base' },
  slot: { tr: 'Açık hat', en: 'Open lines' },
  depo: { tr: 'Depo', en: 'Warehouse' },
  borc: { tr: 'Tedarikçi borcu', en: 'Supplier debt' },
  beklenen: { tr: 'Beklenen kâr', en: 'Expected profit' },
  yil: { tr: '/yıl', en: '/yr' },
  hatlar: { tr: 'Ürün hatları', en: 'Product lines' },
  acik: { tr: 'Açık', en: 'Open' },
  kapali: { tr: 'Kapalı', en: 'Closed' },
  rutbeGerek: { tr: 'Rütbe', en: 'Rank' },
  stok: { tr: 'Stok', en: 'Stock' },
  fiyat: { tr: 'Fiyat', en: 'Price' },
  ucuz: { tr: 'Ucuz', en: 'Cheap' },
  normal: { tr: 'Normal', en: 'Normal' },
  pahali: { tr: 'Pahalı', en: 'Dear' },
  otomatik: { tr: 'Otomatik sipariş', en: 'Auto order' },
  siparis: { tr: 'Sipariş', en: 'Order' },
  uygula: { tr: 'Uygula', en: 'Apply' },
  talep: { tr: 'Beklenen talep', en: 'Expected demand' },
  birim: { tr: 'Birim satış / alış', en: 'Unit sell / buy' },
  kar: { tr: 'Kâr', en: 'Profit' },
  dunya: { tr: 'Dünya', en: 'World' },
  temel: { tr: 'temel', en: 'staple' },
  orta: { tr: 'orta', en: 'mid' },
  luks: { tr: 'lüks', en: 'luxury' },
  yatirimlar: { tr: 'Yatırımlar', en: 'Investments' },
  kademe: { tr: 'Kademe', en: 'Tier' },
  yukselt: { tr: 'Yükselt', en: 'Upgrade' },
  azami: { tr: 'Azami', en: 'Maxed' },
  calisanlar: { tr: 'Çalışanların', en: 'Your staff' },
  yok: { tr: 'Henüz çalışanın yok. 3 çalışan ikinci bir hat açmanı sağlar.', en: 'No staff yet. 3 employees let you open a second line.' },
  sadakat: { tr: 'Sadakat', en: 'Loyalty' },
  kalite: { tr: 'Beceri', en: 'Skill' },
  taninirlik: { tr: 'Tanınırlık', en: 'Renown' },
  maas: { tr: 'maaş', en: 'wage' },
  kov: { tr: 'Çıkar', en: 'Dismiss' },
  adaylar: { tr: 'Bu yılın adayları', en: "This year's candidates" },
  al: { tr: 'İşe al', en: 'Hire' },
  pesin: { tr: 'peşin', en: 'up front' },
  dokum: { tr: 'Geçen yılın dökümü', en: "Last year's ledger" },
  satis: { tr: 'Satış', en: 'Sales' },
  alim: { tr: 'Mal alımı', en: 'Purchases' },
  depoMasrafi: { tr: 'Depo masrafı', en: 'Storage' },
  borcOdeme: { tr: 'Borç ödemesi', en: 'Debt repaid' },
  net: { tr: 'Eline geçen', en: 'Net to you' },
  kitleDegisimi: { tr: 'Kitle değişimi', en: 'Customer change' },
  stokBitti: { tr: 'stoğun bitti, müşteri rakibe kaçtı', en: 'ran out of stock — customers left for the rival' },
  fazlaStok: { tr: 'kapalı hatta atıl stok birikti', en: 'idle stock piled up on a closed line' },
  kitleKaybi: { tr: 'Karşılanamayan talep müşteri kitleni eritti.', en: 'Unmet demand shrank your customer base.' },
  ayrildi: { tr: 'işi bıraktı ve kasadan para aldı', en: 'quit and took money from the till' },
  donem: { tr: { bolluk: 'Bolluk', durgunluk: 'Durgunluk', kitlik: 'Kıtlık' }, en: { bolluk: 'Boom', durgunluk: 'Slump', kitlik: 'Famine' } },
  savas: { tr: 'Savaş', en: 'War' },
  veba: { tr: 'Salgın', en: 'Plague' },
  ilkYil: { tr: 'Henüz bir yıl geçmedi. Hiçbir şeye dokunmasan da dükkân otomatik çalışır.', en: "A year hasn't passed yet. The shop runs on its own even if you touch nothing." },
};

export function IsletmePaneli({ durum, yukleniyor, onKarar, onYatirim, onCalisanAl, onEkipCikar }: Props) {
  const { dil } = useDil();
  const t = (k: Exclude<keyof typeof M, 'donem'>) => M[k][dil];
  const [siparisTaslagi, setSiparisTaslagi] = useState<Record<string, string>>({});

  if (!durum.aktif) return null;
  const pb = durum.paraBirimi;
  const donemAdi = durum.dunya.donem ? M.donem[dil][durum.dunya.donem as 'bolluk'] : null;

  const hatKarti = (h: IsletmeHatGorunumu) => {
    const dunyaEtkisi =
      h.dunyaTalepYuzde !== 0 || h.dunyaFiyatYuzde !== 0
        ? `${dil === 'en' ? 'demand' : 'talep'} ${formatYuzde(dil, h.dunyaTalepYuzde, true)} · ${dil === 'en' ? 'price' : 'fiyat'} ${formatYuzde(dil, h.dunyaFiyatYuzde, true)}`
        : null;
    return (
      <div key={h.id} className={`isletme-hat${h.acik ? ' isletme-hat-acik' : ''}${h.kilitli ? ' isletme-hat-kilitli' : ''}`}>
        <div className="isletme-hat-baslik">
          <strong>
            {h.simge} {h.ad}
          </strong>
          <span className="isletme-etiket">{t(h.kesim)}</span>
          {h.kilitli ? (
            <span className="isletme-etiket">
              🔒 {t('rutbeGerek')} {h.minRutbe}
            </span>
          ) : (
            <button
              className={h.acik ? '' : 'ikincil'}
              disabled={yukleniyor}
              onClick={() => onKarar([{ id: h.id, acik: !h.acik }])}
            >
              {h.acik ? t('acik') : t('kapali')}
            </button>
          )}
        </div>
        <div className="isletme-hat-satir">
          <span>
            {t('stok')}: <strong>{h.stok}</strong>
          </span>
          <span>
            {t('talep')}: <strong>~{h.tahminiTalep}</strong>
          </span>
          <span>
            {t('birim')}:{' '}
            <strong>
              {formatPara(h.birimFiyat)} / {formatPara(h.birimMaliyet)}
            </strong>
          </span>
          <span>
            {t('kar')}: <strong>{formatPara(h.beklenenKar)}</strong>
          </span>
        </div>
        {dunyaEtkisi && (
          <div className="isletme-hat-dunya">
            🌍 {t('dunya')}: {dunyaEtkisi}
          </div>
        )}
        {h.acik && (
          <div className="isletme-hat-kontrol">
            <span>{t('fiyat')}:</span>
            {(['ucuz', 'normal', 'pahali'] as IsletmeFiyat[]).map((f) => (
              <button
                key={f}
                className={h.fiyat === f ? '' : 'ikincil'}
                disabled={yukleniyor}
                onClick={() => onKarar([{ id: h.id, fiyat: f }])}
              >
                {t(f)}
              </button>
            ))}
            <label className="isletme-otomatik">
              <input
                type="checkbox"
                checked={h.otomatik}
                disabled={yukleniyor}
                onChange={(e) => onKarar([{ id: h.id, otomatik: e.target.checked }])}
              />
              {t('otomatik')}
            </label>
            {!h.otomatik && (
              <span className="isletme-siparis">
                {t('siparis')}:
                <input
                  type="number"
                  min={0}
                  max={durum.depo.kapasite}
                  value={siparisTaslagi[h.id] ?? String(h.siparis)}
                  onChange={(e) => setSiparisTaslagi({ ...siparisTaslagi, [h.id]: e.target.value })}
                />
                <button
                  disabled={yukleniyor}
                  onClick={() => onKarar([{ id: h.id, siparis: Math.max(0, Number(siparisTaslagi[h.id] ?? h.siparis) || 0) }])}
                >
                  {t('uygula')}
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  const dokum = durum.sonDokum;
  const hatAdi = (id: string) => durum.hatlar.find((h) => h.id === id)?.ad ?? id;
  const uyariMetni = (u: NonNullable<typeof dokum>['uyarilar'][number]) => {
    if (u.kod === 'stok_bitti') return `⚠️ ${hatAdi(u.hat ?? '')}: ${t('stokBitti')}`;
    if (u.kod === 'fazla_stok') return `📦 ${hatAdi(u.hat ?? '')}: ${t('fazlaStok')}`;
    if (u.kod === 'kitle_kaybi') return `📉 ${t('kitleKaybi')}`;
    return `🚪 ${u.isim ?? ''}: ${t('ayrildi')}`;
  };

  return (
    <section className="isletme-paneli">
      <h3>{t('baslik')}</h3>

      <div className="isletme-ozet">
        <span>
          👥 {t('kitle')}: <strong>{formatPara(durum.kitle)}</strong>
        </span>
        <span>
          📑 {t('slot')}: <strong>{durum.slot.kullanilan}/{durum.slot.toplam}</strong>
        </span>
        <span>
          🏚️ {t('depo')}: <strong>{durum.depo.kullanilan}/{durum.depo.kapasite}</strong>
        </span>
        {durum.tedarikciBorcu > 0 && (
          <span>
            🧾 {t('borc')}: <strong>{formatPara(durum.tedarikciBorcu)} {pb}</strong>
          </span>
        )}
        <span>
          💰 {t('beklenen')}: <strong>~{formatPara(durum.beklenenBrutKar)} {pb}{t('yil')}</strong>
        </span>
        {(donemAdi || durum.dunya.savas || durum.dunya.veba) && (
          <span>
            🌍 {[donemAdi, durum.dunya.savas ? t('savas') : null, durum.dunya.veba ? t('veba') : null].filter(Boolean).join(' · ')}
          </span>
        )}
      </div>

      <h4>{t('hatlar')}</h4>
      <div className="isletme-hatlar">{durum.hatlar.map(hatKarti)}</div>

      <h4>{t('yatirimlar')}</h4>
      <div className="isletme-yatirimlar">
        {durum.yatirimlar.map((y) => (
          <div key={y.id} className="isletme-yatirim" title={y.aciklama}>
            <strong>
              {y.simge} {y.ad}
            </strong>
            <span>
              {t('kademe')} {y.kademe}/{y.maxKademe}
            </span>
            <small>{y.aciklama}</small>
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

      <h4>
        {t('calisanlar')} ({durum.calisanlar.length}/{durum.calisanTavani})
      </h4>
      {durum.calisanlar.length === 0 ? (
        <p className="isletme-bos">{t('yok')}</p>
      ) : (
        <div className="isletme-calisanlar">
          {durum.calisanlar.map((c) => (
            <div key={c.id} className="isletme-calisan">
              <strong>{c.isim}</strong> <em>({c.rol})</em>
              <span>
                {t('kalite')} {c.tahminiMin}-{c.tahminiMax} · {t('sadakat')} {Math.round(c.sadakat)} · {t('taninirlik')} {Math.round(c.taninirlik)} · {t('maas')} {formatPara(c.maas)}
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
          <h4>{t('adaylar')}</h4>
          <div className="isletme-calisanlar">
            {durum.adaylar.map((a) => (
              <div key={a.id} className="isletme-calisan isletme-aday">
                <strong>{a.isim}</strong> <em>({a.rol})</em>
                <small>{a.gecmis}</small>
                <span>
                  {t('kalite')} {a.tahminiMin}-{a.tahminiMax} · {t('sadakat')} {Math.round(a.sadakat)} · {t('taninirlik')} {Math.round(a.taninirlik)} · {t('maas')} {formatPara(a.maas)}
                </span>
                <button disabled={yukleniyor || durum.para < a.ucret || durum.calisanlar.length >= durum.calisanTavani} onClick={() => onCalisanAl(a.id)}>
                  {t('al')} · {formatPara(a.ucret)} {pb} {t('pesin')}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <h4>{t('dokum')}</h4>
      {!dokum ? (
        <p className="isletme-bos">{t('ilkYil')}</p>
      ) : (
        <div className="isletme-dokum">
          <div>
            {t('satis')}: <strong>+{formatPara(dokum.satis)}</strong>
          </div>
          <div>
            {t('alim')}: <strong>−{formatPara(dokum.alim)}</strong>
          </div>
          <div>
            {t('depoMasrafi')}: <strong>−{formatPara(dokum.depoMasrafi)}</strong>
          </div>
          {dokum.borcOdeme > 0 && (
            <div>
              {t('borcOdeme')}: <strong>−{formatPara(dokum.borcOdeme)}</strong>
            </div>
          )}
          <div className="isletme-dokum-net">
            {t('net')}: <strong>{dokum.net >= 0 ? '+' : ''}{formatPara(dokum.net)} {pb}</strong>
          </div>
          <div>
            {t('kitleDegisimi')}: <strong>{dokum.kitleDegisimi >= 0 ? '+' : ''}{formatPara(dokum.kitleDegisimi)}</strong>
          </div>
          {dokum.uyarilar.map((u, i) => (
            <div key={i} className="isletme-uyari">
              {uyariMetni(u)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
