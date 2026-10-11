import { useEffect, useState } from 'react';
import { gostergeGetir } from '../api';
import { aranmaYildiz, ahlakEtiketi, unUnvani } from '../bolgeTema';
import { formatPara } from '../format';
import { useDil } from '../DilContext';
import type { CharacterState, GostergeDetayi, GostergeStat } from '../types';

interface GostergeModalProps {
  karakter: CharacterState;
  stat: GostergeStat;
  onKapat: () => void;
}

/**
 * Üst şerit göstergesine (Can/Para/Mutluluk/Ahlak/Aranma/Şöhret) dokunulunca açılan
 * pencere: bu değer şu an neyden etkileniyor, nasıl yükselir / düşer. İçerik
 * sunucudan (GET /:id/gosterge/:stat) gelir — yıllık etken sayıları motorun kendi
 * sabitlerinden üretilir, bu yüzden formül değişince açıklama sapmaz.
 */
export function GostergeModal({ karakter, stat, onKapat }: GostergeModalProps) {
  const { m, dil } = useDil();
  const [detay, setDetay] = useState<GostergeDetayi | null>(null);
  const [hata, setHata] = useState(false);

  // Dil değişince metinler yeniden gelsin diye `dil` bağımlılıkta.
  useEffect(() => {
    let iptal = false;
    setDetay(null);
    setHata(false);
    gostergeGetir(karakter.id, stat)
      .then((r) => {
        if (!iptal) setDetay(r.gosterge);
      })
      .catch(() => {
        if (!iptal) setHata(true);
      });
    return () => {
      iptal = true;
    };
  }, [karakter.id, stat, dil]);

  useEffect(() => {
    const kapat = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onKapat();
    };
    window.addEventListener('keydown', kapat);
    return () => window.removeEventListener('keydown', kapat);
  }, [onKapat]);

  const baslik: Record<GostergeStat, { ikon: string; ad: string }> = {
    saglik: { ikon: '❤️', ad: m.usCan },
    para: { ikon: '💰', ad: m.usPara },
    mutluluk: { ikon: '🙂', ad: m.usMutluluk },
    ahlak: { ikon: '⚖️', ad: m.usAhlak },
    aranma: { ikon: '🚨', ad: m.usAranma },
    sohret: { ikon: '🏅', ad: m.sohret },
  };

  const deger = (() => {
    switch (stat) {
      case 'saglik':
        return `${Math.round(karakter.saglik)} / 100`;
      case 'mutluluk':
        return `${Math.round(karakter.mutluluk)} / 100`;
      case 'ahlak':
        return `${ahlakEtiketi(karakter.ahlak, dil)} · ${Math.round(karakter.ahlak)} / 100`;
      case 'sohret':
        return `${unUnvani(karakter.un, dil)} · ${Math.round(karakter.un)} / 100`;
      case 'aranma':
        return `${'★'.repeat(Math.ceil(aranmaYildiz(karakter.suc_seviyesi)))}${'☆'.repeat(
          4 - Math.ceil(aranmaYildiz(karakter.suc_seviyesi))
        )} · ${Math.round(karakter.suc_seviyesi)} / 100`;
      case 'para':
        return `${formatPara(karakter.para)} ${karakter.para_birimi}`;
    }
  })();

  // Aranmada "yükselt" (kötü yön) önemsiz; asıl soru "nasıl düşürürüm" — o yüzden önce o gösterilir.
  const aranma = stat === 'aranma';
  const bolumler = detay
    ? aranma
      ? [
          { baslik: m.gmAranmaDusur, maddeler: detay.dusur },
          { baslik: m.gmAranmaArtirir, maddeler: detay.yukselt },
        ]
      : [
          { baslik: m.gmYukselt, maddeler: detay.yukselt },
          { baslik: m.gmDusur, maddeler: detay.dusur },
        ]
    : [];

  return (
    <div className="skor-detay-katman gosterge-katman" onClick={onKapat}>
      <div
        className="skor-detay-modal gosterge-modal"
        role="dialog"
        aria-modal="true"
        aria-label={baslik[stat].ad}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="skor-detay-modal-ust">
          <h2>
            {baslik[stat].ikon} {baslik[stat].ad}
          </h2>
          <button type="button" className="ikincil skor-detay-kapat" onClick={onKapat} autoFocus>
            {m.kapatX}
          </button>
        </div>
        <div className="skor-detay-govde gosterge-govde">
          <p className="gosterge-deger">{deger}</p>
          {hata && <p className="gosterge-bilgi">{m.gmHata}</p>}
          {!detay && !hata && <p className="gosterge-bilgi">{m.gmYukleniyor}</p>}
          {detay && (
            <>
              <h3 className="gosterge-baslik">{m.gmEtkenler}</h3>
              <ul className="gosterge-liste">
                {detay.etkenler.map((e, i) => (
                  <li key={i} className={`gosterge-etken gosterge-etken-${e.yon}`}>
                    <span className="gosterge-etken-ikon" aria-hidden="true">
                      {e.ikon}
                    </span>
                    <span>{e.metin}</span>
                  </li>
                ))}
              </ul>
              {bolumler.map((b) => (
                <div key={b.baslik}>
                  <h3 className="gosterge-baslik">{b.baslik}</h3>
                  <ul className="gosterge-liste gosterge-ipuclari">
                    {b.maddeler.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
