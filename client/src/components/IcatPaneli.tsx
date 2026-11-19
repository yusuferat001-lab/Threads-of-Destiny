import { useState } from 'react';
import type { ProjeGorunumu } from '../types';
import { useDil } from '../DilContext';
import { formatPara } from '../format';
import { BilgiNotu } from './BilgiNotu';

type D = { tr: string; en: string };
const M = {
  baslik: { tr: '🔬 Atölye projeleri', en: '🔬 Workshop projects' },
  not: {
    tr: 'Çok yıllı bir proje üstlenebilirsin: yıllık masraf yaparsın ve atölyenin üretiminden bir pay ayrılır. Süre dolunca sürer, uzatır ya da vazgeçersin; başarırsan etkisi kalıcıdır.',
    en: 'You can take on a multi-year project: it costs money each year and takes a share of the workshop\'s output. When time is up you press on, extend or give up; success is permanent.',
  },
  yil: { tr: 'yıl', en: 'yr' },
  kalan: { tr: 'kalan', en: 'left' },
  birak: { tr: 'Projeyi bırak', en: 'Abandon project' },
  baslat: { tr: 'Başlat', en: 'Start' },
  hatSec: { tr: 'Ürün seç…', en: 'Pick a product…' },
  masraf: { tr: 'yıllık masraf', en: 'yearly cost' },
  rutbe: { tr: 'Daha yüksek rütbe gerekir.', en: 'Needs a higher rank.' },
  hat: { tr: 'Uygun ürün hattı yok.', en: 'No suitable product line.' },
  tezgah: { tr: 'Tezgâhın daha fazla geliştirilemez.', en: 'Your bench cannot be improved further.' },
  proje: { tr: 'Önce yürüyen projeyi bitir.', en: 'Finish the running project first.' },
  gelistirmeler: { tr: 'Tamamlananlar', en: 'Completed' },
  verim: { tr: 'Verimli yöntem', en: 'Efficient method' },
  model: { tr: 'Yeni model', en: 'New model' },
  tezgahIcat: { tr: 'Tezgâh icadı', en: 'Workbench invention' },
  acilan: { tr: 'Açılan hat', en: 'Unlocked line' },
  yok: { tr: 'Henüz tamamlanan bir proje yok.', en: 'No completed projects yet.' },
};
const KILIT = { rutbe: 'rutbe', hat: 'hat', tezgah: 'tezgah', proje: 'proje' } as const;

/** Zanaatkâr: yürüyen atölye projesi + başlatılabilir projeler + tamamlanan geliştirmeler. Karar penceresi (süre dolunca) ProjeKarari'nda. */
export function IcatPaneli({
  proje,
  paraBirimi,
  yukleniyor,
  onBaslat,
  onBirak,
}: {
  proje: ProjeGorunumu;
  paraBirimi: string;
  yukleniyor: boolean;
  onBaslat: (projeId: string, hat: string | null) => void;
  onBirak: () => void;
}) {
  const { dil } = useDil();
  const d = (m: D) => m[dil];
  const [secilen, setSecilen] = useState<Record<string, string>>({});
  const g = proje.gelistirmeler;
  const aktifTanim = proje.aktif ? proje.secenekler.find((s) => s.id === proje.aktif!.id) : null;
  const aktifHat = proje.aktif?.hat ? (aktifTanim?.hatlar.find((h) => h.id === proje.aktif!.hat)?.ad ?? g.verim.concat(g.model).find((x) => x.hat === proje.aktif!.hat)?.ad) : null;
  const hicBiri = g.verim.length + g.model.length + g.acilanHatlar.length + g.tezgah > 0;

  return (
    <div className="isletme-icat">
      <h4>
        {d(M.baslik)} <BilgiNotu metin={d(M.not)} />
      </h4>
      {proje.aktif && aktifTanim ? (
        <div className="isletme-hat isletme-hat-acik">
          <div className="isletme-hat-baslik">
            <strong>
              {aktifTanim.simge} {d(aktifTanim.ad)}
              {aktifHat ? ` · ${d(aktifHat)}` : ''}
            </strong>
            <span className="isletme-etiket">
              {proje.aktif.kalan} {d(M.yil)} {d(M.kalan)}
            </span>
          </div>
          <div className="isletme-fiyat-not">{d(aktifTanim.aciklama)}</div>
          <div className="isletme-hat-kontrol">
            <button className="ikincil" disabled={yukleniyor || !!proje.karar} onClick={onBirak}>
              {d(M.birak)}
            </button>
          </div>
        </div>
      ) : (
        proje.secenekler.map((s) => {
          const hat = secilen[s.id] ?? '';
          return (
            <div key={s.id} className="isletme-hat">
              <div className="isletme-hat-baslik">
                <strong>
                  {s.simge} {d(s.ad)}
                </strong>
                <span className="isletme-etiket">
                  {s.sure} {d(M.yil)} · {formatPara(s.masraf)} {paraBirimi} {d(M.masraf)}
                </span>
              </div>
              <div className="isletme-fiyat-not">{d(s.aciklama)}</div>
              <div className="isletme-hat-kontrol">
                {s.hatGerekli && (
                  <select value={hat} disabled={yukleniyor || !!s.kilit} onChange={(e) => setSecilen({ ...secilen, [s.id]: e.target.value })}>
                    <option value="">{d(M.hatSec)}</option>
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
                  onClick={() => onBaslat(s.id, s.hatGerekli ? hat : null)}
                >
                  {d(M.baslat)}
                </button>
                {s.kilit && <span className="isletme-fiyat-not">{d(M[KILIT[s.kilit]])}</span>}
              </div>
            </div>
          );
        })
      )}
      <div className="isletme-fiyat-not">
        <strong>{d(M.gelistirmeler)}:</strong>{' '}
        {hicBiri ? (
          [
            ...g.verim.map((x) => `${d(M.verim)} ${'●'.repeat(x.kademe)} (${d(x.ad)})`),
            ...g.model.map((x) => `${d(M.model)} ${'●'.repeat(x.kademe)} (${d(x.ad)})`),
            ...(g.tezgah > 0 ? [`${d(M.tezgahIcat)} ${'●'.repeat(g.tezgah)}`] : []),
            ...g.acilanHatlar.map((x) => `${d(M.acilan)}: ${d(x.ad)}`),
          ].join(' · ')
        ) : (
          d(M.yok)
        )}
      </div>
    </div>
  );
}
