import { useState } from 'react';
import { envanterListesiCikar } from '../envanter';
import type { SahipOlunanEsya } from '../types';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

type HediyeHedef = 'es' | 'cocuk' | 'ekip' | 'dost';

interface EnvanterPaneliProps {
  etiketler: string[];
  magazaEnvanteri: SahipOlunanEsya[];
  evli?: boolean;
  yasayanCocuklar?: string[];
  ekip?: { id: string; isim: string; rol: string }[];
  dostAdi?: string;
  yukleniyor?: boolean;
  onKullan?: (esyaId: string) => void;
  onHediye?: (
    esyaId: string,
    hedef: HediyeHedef,
    opts?: { cocukIndex?: number; ekipId?: string },
  ) => void;
}

export function EnvanterPaneli({
  etiketler,
  magazaEnvanteri,
  evli,
  yasayanCocuklar = [],
  ekip = [],
  dostAdi,
  yukleniyor,
  onKullan,
  onHediye,
}: EnvanterPaneliProps) {
  const { m, kt, dil } = useDil();
  const [hediyeAcik, setHediyeAcik] = useState<string | null>(null);
  const gizemliEsyalar = envanterListesiCikar(etiketler, dil);
  if (gizemliEsyalar.length === 0 && magazaEnvanteri.length === 0) return null;

  const en = dil === 'en';
  const hediyeSecenekleri: {
    deger: string;
    etiket: string;
    hedef: HediyeHedef;
    cocukIndex?: number;
    ekipId?: string;
  }[] = [];
  if (evli) hediyeSecenekleri.push({ deger: 'es', etiket: en ? 'Spouse' : 'Eş', hedef: 'es' });
  yasayanCocuklar.forEach((ad, i) =>
    hediyeSecenekleri.push({ deger: `cocuk:${i}`, etiket: ad, hedef: 'cocuk', cocukIndex: i }),
  );
  ekip.forEach((u) =>
    hediyeSecenekleri.push({ deger: `ekip:${u.id}`, etiket: `${u.isim} (${kt(u.rol)})`, hedef: 'ekip', ekipId: u.id }),
  );
  hediyeSecenekleri.push({ deger: 'dost', etiket: dostAdi ?? (en ? 'Friend' : 'Dost'), hedef: 'dost' });

  return (
    <div className="envanter-paneli">
      <h3>{m.enBaslikTam}</h3>

      {gizemliEsyalar.map((esya) => (
        <div key={esya.id} className="envanter-esya" title={esya.aciklama}>
          <span className="envanter-esya-simge" aria-hidden="true">
            {esya.simge}
          </span>
          <div className="envanter-esya-metin">
            <span className="envanter-esya-ad">{esya.ad}</span>
            <span className="envanter-esya-aciklama">{esya.aciklama}</span>
          </div>
        </div>
      ))}

      {magazaEnvanteri.map((esya) => (
        <div key={esya.id} className="envanter-esya envanter-esya-magaza">
          <span className="envanter-esya-simge" aria-hidden="true">
            {esya.simge}
          </span>
          <div className="envanter-esya-metin">
            <span className="envanter-esya-ad">{kt(esya.ad)}</span>
            <span className="envanter-esya-aciklama">
              {esya.kategori === 'luks'
                ? m.enLuksAciklama
                : esya.kalanYil !== null
                  ? bic(m.enCurumeUyariTam, esya.kalanYil)
                  : m.enKullanimBekliyor}
            </span>
            {onHediye && hediyeAcik === esya.id && (
              <div className="envanter-hediye-satir">
                <select
                  className="envanter-hediye-secim"
                  disabled={yukleniyor}
                  defaultValue=""
                  onChange={(e) => {
                    const s = hediyeSecenekleri.find((x) => x.deger === e.target.value);
                    if (!s) return;
                    const opts =
                      s.cocukIndex !== undefined
                        ? { cocukIndex: s.cocukIndex }
                        : s.ekipId !== undefined
                          ? { ekipId: s.ekipId }
                          : undefined;
                    onHediye(esya.id, s.hedef, opts);
                    setHediyeAcik(null);
                  }}
                >
                  <option value="" disabled>
                    {en ? 'Give to…' : 'Kime…'}
                  </option>
                  {hediyeSecenekleri.map((s) => (
                    <option key={s.deger} value={s.deger}>
                      {s.etiket}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="envanter-esya-butonlar">
            {esya.kategori === 'sifa' && onKullan && (
              <button
                className="envanter-kullan-buton"
                disabled={yukleniyor}
                onClick={() => onKullan(esya.id)}
                title={m.enKullanSansHint}
              >
                {m.enKullanTam}
              </button>
            )}
            {onHediye && (
              <button
                className="envanter-kullan-buton envanter-hediye-buton"
                disabled={yukleniyor}
                onClick={() => setHediyeAcik(hediyeAcik === esya.id ? null : esya.id)}
                title={en ? 'Give this item to someone to improve the bond' : 'Bu eşyayı birine ver, ilişki puanı artsın'}
              >
                {en ? 'Gift' : 'Hediye Et'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
