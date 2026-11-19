import { useState } from 'react';
import type { ProjeGorunumu } from '../types';
import { useDil } from '../DilContext';
import { formatPara } from '../format';
import { BilgiNotu } from './BilgiNotu';

type D = { tr: string; en: string };
const M = {
  baslikAtolye: { tr: '🔬 Atölye projeleri', en: '🔬 Workshop projects' },
  baslikSefer: { tr: '🧭 Ticaret seferleri', en: '🧭 Trade expeditions' },
  notAtolye: {
    tr: 'Çok yıllı bir proje üstlenebilirsin: yıllık masraf yaparsın ve atölyenin üretiminden bir pay ayrılır. Süre dolunca sürer, uzatır ya da vazgeçersin; başarırsan etkisi kalıcıdır.',
    en: 'You can take on a multi-year project: it costs money each year and takes a share of the workshop\'s output. When time is up you press on, extend or give up; success is permanent.',
  },
  notSefer: {
    tr: 'Bir ürünü uzak pazarlara götüren seferler: yıllık masraf (eskort dahil) yaparsın, dönüşte yolda bir olayla karşılaşırsın. Başarırsan o ürün birkaç yıl daha iyi fiyata satılır ve daha ucuza alınır; güvenin artar.',
    en: 'Expeditions that carry a product to far markets: you pay yearly costs (escort included) and face an incident on the road at the end. On success that product sells at a better price and is bought cheaper for some years; your trust grows.',
  },
  yil: { tr: 'yıl', en: 'yr' },
  kalan: { tr: 'kalan', en: 'left' },
  birakAtolye: { tr: 'Projeyi bırak', en: 'Abandon project' },
  birakSefer: { tr: 'Seferi iptal et', en: 'Cancel expedition' },
  baslat: { tr: 'Başlat', en: 'Start' },
  hatSecAtolye: { tr: 'Ürün seç…', en: 'Pick a product…' },
  hatSecSefer: { tr: 'Taşınacak ürün…', en: 'Product to carry…' },
  eskort: { tr: 'Eskort', en: 'Escort' },
  masraf: { tr: 'yıllık masraf', en: 'yearly cost' },
  risk: { tr: 'Tehlike', en: 'Danger' },
  dusuk: { tr: 'düşük', en: 'low' },
  orta: { tr: 'orta', en: 'medium' },
  yuksek: { tr: 'yüksek', en: 'high' },
  rutbe: { tr: 'Daha yüksek rütbe gerekir.', en: 'Needs a higher rank.' },
  hat: { tr: 'Uygun ürün hattı yok.', en: 'No suitable product line.' },
  tezgah: { tr: 'Tezgâhın daha fazla geliştirilemez.', en: 'Your bench cannot be improved further.' },
  proje: { tr: 'Önce yürüyen işi bitir.', en: 'Finish the running job first.' },
  gelistirmeler: { tr: 'Tamamlananlar', en: 'Completed' },
  verim: { tr: 'Verimli yöntem', en: 'Efficient method' },
  model: { tr: 'Yeni model', en: 'New model' },
  tezgahIcat: { tr: 'Tezgâh icadı', en: 'Workbench invention' },
  acilan: { tr: 'Açılan hat', en: 'Unlocked line' },
  yok: { tr: 'Henüz tamamlanan bir proje yok.', en: 'No completed projects yet.' },
  etkiler: { tr: 'Süren etkiler', en: 'Active effects' },
  satis: { tr: 'satış', en: 'sales' },
  alis: { tr: 'alış', en: 'buying' },
  etkiYok: { tr: 'Süren bir sefer etkisi yok.', en: 'No expedition effect is running.' },
};
const KILIT = { rutbe: 'rutbe', hat: 'hat', tezgah: 'tezgah', proje: 'proje' } as const;

/** Zanaatkâr atölye projeleri / Tüccar seferleri: yürüyen iş + başlatılabilir seçenekler + sonuçlar. Karar penceresi (süre dolunca) ProjeKarari'nda. */
export function ProjePaneli({
  proje,
  paraBirimi,
  yukleniyor,
  onBaslat,
  onBirak,
}: {
  proje: ProjeGorunumu;
  paraBirimi: string;
  yukleniyor: boolean;
  onBaslat: (projeId: string, hat: string | null, eskort?: string | null) => void;
  onBirak: () => void;
}) {
  const { dil } = useDil();
  const d = (m: D) => m[dil];
  const sefer = proje.aile === 'sefer';
  const [secilen, setSecilen] = useState<Record<string, string>>({});
  const [eskort, setEskort] = useState('yok');
  const g = proje.gelistirmeler;
  const aktifTanim = proje.aktif ? proje.secenekler.find((s) => s.id === proje.aktif!.id) : null;
  const hatAdi = (id: string | null): D | null =>
    id ? (aktifTanim?.hatlar.find((h) => h.id === id)?.ad ?? g.verim.concat(g.model).find((x) => x.hat === id)?.ad ?? proje.seferEtkileri.find((x) => x.hat === id)?.ad ?? { tr: id, en: id }) : null;
  const hicBiri = g.verim.length + g.model.length + g.acilanHatlar.length + g.tezgah > 0;
  const sonuclar = sefer
    ? proje.seferEtkileri.length > 0
      ? proje.seferEtkileri.map((e) => `${d(e.ad)} (${d(e.rota)}): ${d(M.satis)} +%${e.satisYuzde} · ${d(M.alis)} −%${e.alisYuzde} · ${e.kalanYil} ${d(M.yil)}`).join(' · ')
      : d(M.etkiYok)
    : hicBiri
      ? [
          ...g.verim.map((x) => `${d(M.verim)} ${'●'.repeat(x.kademe)} (${d(x.ad)})`),
          ...g.model.map((x) => `${d(M.model)} ${'●'.repeat(x.kademe)} (${d(x.ad)})`),
          ...(g.tezgah > 0 ? [`${d(M.tezgahIcat)} ${'●'.repeat(g.tezgah)}`] : []),
          ...g.acilanHatlar.map((x) => `${d(M.acilan)}: ${d(x.ad)}`),
        ].join(' · ')
      : d(M.yok);

  return (
    <div className="isletme-icat">
      <h4>
        {sefer ? d(M.baslikSefer) : d(M.baslikAtolye)} <BilgiNotu metin={sefer ? d(M.notSefer) : d(M.notAtolye)} />
      </h4>
      {proje.aktif && aktifTanim ? (
        <div className="isletme-hat isletme-hat-acik">
          <div className="isletme-hat-baslik">
            <strong>
              {aktifTanim.simge} {d(aktifTanim.ad)}
              {hatAdi(proje.aktif.hat) ? ` · ${d(hatAdi(proje.aktif.hat)!)}` : ''}
            </strong>
            <span className="isletme-etiket">
              {proje.aktif.kalan} {d(M.yil)} {d(M.kalan)}
            </span>
          </div>
          <div className="isletme-fiyat-not">{d(aktifTanim.aciklama)}</div>
          <div className="isletme-hat-kontrol">
            <button className="ikincil" disabled={yukleniyor || !!proje.karar} onClick={onBirak}>
              {sefer ? d(M.birakSefer) : d(M.birakAtolye)}
            </button>
          </div>
        </div>
      ) : (
        <>
          {sefer && (
            <div className="isletme-hat-kontrol">
              <strong>{d(M.eskort)}:</strong>
              {proje.eskortlar.map((e) => (
                <button key={e.id} className={eskort === e.id ? '' : 'ikincil'} disabled={yukleniyor} title={d(e.aciklama)} onClick={() => setEskort(e.id)}>
                  {d(e.ad)}
                  {e.masraf > 0 ? ` (+${formatPara(e.masraf)})` : ''}
                </button>
              ))}
            </div>
          )}
          {proje.secenekler.map((s) => {
            const hat = secilen[s.id] ?? '';
            return (
              <div key={s.id} className="isletme-hat">
                <div className="isletme-hat-baslik">
                  <strong>
                    {s.simge} {d(s.ad)}
                  </strong>
                  <span className="isletme-etiket">
                    {s.sure} {d(M.yil)} · {formatPara(s.masraf)} {paraBirimi} {d(M.masraf)}
                    {s.risk ? ` · ${d(M.risk)}: ${d(M[s.risk])}` : ''}
                  </span>
                </div>
                <div className="isletme-fiyat-not">{d(s.aciklama)}</div>
                <div className="isletme-hat-kontrol">
                  {s.hatGerekli && (
                    <select value={hat} disabled={yukleniyor || !!s.kilit} onChange={(e) => setSecilen({ ...secilen, [s.id]: e.target.value })}>
                      <option value="">{sefer ? d(M.hatSecSefer) : d(M.hatSecAtolye)}</option>
                      {s.hatlar.map((h) => (
                        <option key={h.id} value={h.id}>
                          {d(h.ad)}
                        </option>
                      ))}
                    </select>
                  )}
                  <button
                    disabled={yukleniyor || !!s.kilit || (s.hatGerekli && !hat)}
                    title={s.kilit ? d(M[KILIT[s.kilit]]) : undefined}
                    onClick={() => onBaslat(s.id, s.hatGerekli ? hat : null, sefer ? eskort : null)}
                  >
                    {d(M.baslat)}
                  </button>
                  {s.kilit && <span className="isletme-fiyat-not">{d(M[KILIT[s.kilit]])}</span>}
                </div>
              </div>
            );
          })}
        </>
      )}
      <div className="isletme-fiyat-not">
        <strong>{sefer ? d(M.etkiler) : d(M.gelistirmeler)}:</strong> {sonuclar}
      </div>
    </div>
  );
}
