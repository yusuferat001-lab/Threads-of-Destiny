/**
 * AÇILIREKRANRED (açılırekranred) — kopyala-yapıştır örnek karar penceresi.
 * Kullanım: bu dosyayı client/src/components/ altına kopyala, adını ve metinleri değiştir.
 * Şablonun parçaları: components/KararKabuk.tsx (KararKatman, KararSatiri, RutbeYolu, KararOnay, GucKarsilastirma),
 * components/kararKol.ts (kol türü + etiketi). Stil: client/src/karar-kabuk.css (tek dosya, yeni CSS yazma).
 */
import { useState } from 'react';
import { useDil } from '../DilContext';
import { KararKatman, KararOnay, KararSatiri, RutbeYolu } from './KararKabuk';
import type { Kol } from './kararKol';

const M = {
  baslik: { tr: 'Kararını Ver', en: 'Make Your Choice' },
  alt: { tr: 'Seçim kalıcıdır; seçmeden oyun devam etmez.', en: 'The choice is permanent and the game waits for it.' },
  sec: { tr: 'Bir seçenek seç.', en: 'Pick an option.' },
  onayla: { tr: 'Onayla', en: 'Confirm' },
};

interface Secenek {
  id: string;
  simge: string;
  ad: { tr: string; en: string };
  kol: Kol; // 'evrensel' (mavi) | 'sadik' (altın) | 'kahraman' (altın) | 'sert' (kızıl)
  /** Etki çipleri: [metin, 'i' (artı, yeşil) | 'k' (eksi, kırmızı)] */
  cipler?: [string, 'i' | 'k'][];
  aciklama?: { tr: string; en: string };
}

/** Örnek: 3 seçenekli, rütbe yollu, onaylı karar penceresi. */
export function OrnekKararPenceresi({ secenekler, seviye, onSec }: { secenekler: Secenek[]; seviye: number; onSec: (id: string) => void }) {
  const { dil } = useDil();
  const [secim, setSecim] = useState<string | null>(null);
  const secili = secenekler.find((o) => o.id === secim);
  return (
    <KararKatman simge="🎖️" baslik={M.baslik[dil]} alt={M.alt[dil]} rozet={`${dil === 'en' ? 'Level' : 'Seviye'} ${seviye} / 5`}>
      {/* İsteğe bağlı rütbe yolu: bitmiş basamaklar `adimlar`, şimdiki basamak `simdi`. */}
      <RutbeYolu simdi={seviye} adimlar={[]} />
      <div className="kk-liste kk-secimler">
        {secenekler.map((o) => (
          <KararSatiri
            key={o.id}
            kol={o.kol}
            simge={o.simge}
            ad={o.ad[dil]}
            cipler={o.cipler?.map(([metin, yon]) => (
              <span key={metin} className={`kk-cip ${yon === 'i' ? 's-arti' : 's-eksi'}`}>
                {metin}
              </span>
            ))}
            detay={o.aciklama?.[dil]}
            secili={secim === o.id}
            onClick={() => setSecim(o.id)}
          />
        ))}
      </div>
      <KararOnay not={secili ? '' : M.sec[dil]} etiket={M.onayla[dil]} disabled={!secili} onClick={() => secili && onSec(secili.id)} />
    </KararKatman>
  );
}
