import type { IsletmeGorunumu, IsletmeUyari } from '../types';
import { useDil } from '../DilContext';
import { gecenYilBaslik } from '../isletmeAdi';
import { isletmeUyariMetni } from './IsletmePaneli';

/** Geçen yıl işletmede olan önemli olaylar: hırsızlık, rakip saldırısı, sızdırma, ayrılan çalışan, biten imtiyaz. (Stok yetmemesi ayrı pencerede: stokUyari.ts) */
const ONEMLI_KODLAR: IsletmeUyari['kod'][] = ['hirsizlik', 'sizdirma', 'ic_hirsizlik', 'rakip_saldiri', 'calisan_ayrildi', 'vergi_indirimi_bitti', 'imtiyaz_bitti', 'baris_catisma', 'savas_sonu', 'seferberlik_terhis', 'savas_ganimet', 'kale', 'madalya', 'yagma', 'savas_kayip', 'savas_catisma', 'kazanc_ozet', 'kesif_savas'];

/** Asker: yalnız savaş/ödül haberleri bildirim penceresi açar. Haydut/sınır çatışması kendi karar ekranında; görev yaralıları, kayıplar ve "beklenen/gerçekleşen" özeti ordu ekranının dökümünde kalır. */
const ASKER_KODLARI: IsletmeUyari['kod'][] = ['savas_sonu', 'savas_ganimet', 'kale', 'madalya', 'yagma', 'savas_catisma', 'seferberlik_terhis', 'kesif_savas', 'imtiyaz_bitti'];

const ANAHTAR = 'kader-carki-isletme-bildirim-yili';

function gorulenYil(stateId: string): number {
  try {
    const kayit = JSON.parse(localStorage.getItem(ANAHTAR) ?? '{}') as Record<string, number>;
    return kayit[stateId] ?? -1;
  } catch {
    return -1;
  }
}
export function bildirimGoruldu(stateId: string, yil: number): void {
  try {
    const kayit = JSON.parse(localStorage.getItem(ANAHTAR) ?? '{}') as Record<string, number>;
    kayit[stateId] = yil;
    localStorage.setItem(ANAHTAR, JSON.stringify(kayit));
  } catch {
    /* localStorage yoksa pencere bu oturumda bir kez gösterilir */
  }
}

/** Gösterilecek (henüz kapatılmamış) önemli uyarılar; yoksa boş dizi. */
export function bekleyenIsletmeUyarilari(durum: IsletmeGorunumu | null, stateId: string): IsletmeUyari[] {
  const dokum = durum?.sonDokum;
  if (!durum || !dokum || dokum.yil <= gorulenYil(stateId)) return [];
  const kodlar = durum.birlik ? ASKER_KODLARI : ONEMLI_KODLAR;
  return dokum.uyarilar.filter((u) => kodlar.includes(u.kod));
}

interface Props {
  durum: IsletmeGorunumu;
  uyarilar: IsletmeUyari[];
  onKapat: () => void;
}

/** Ana ekranda (olay yokken) açılır; oyuncu "Tamam" deyince kapanır. */
export function IsletmeBildirimModal({ durum, uyarilar, onKapat }: Props) {
  const { dil } = useDil();
  const tr = dil !== 'en';
  return (
    <div className="kariyer-sonuc-katman kariyer-sonuc-katman-ust" role="dialog" aria-modal="true">
      <div className="kariyer-sonuc-modal" onClick={(e) => e.stopPropagation()}>
        <h4>{durum.birlik ? (tr ? '⚔️ Savaş Haberi' : '⚔️ War News') : gecenYilBaslik(durum.cemaat ? 'Din Adamı' : durum.uretim ? 'Zanaatkâr' : 'Tüccar', tr ? 'tr' : 'en')}</h4>
        {uyarilar.map((u, i) => (
          <p key={i}>{isletmeUyariMetni(u, durum, dil === 'en' ? 'en' : 'tr')}</p>
        ))}
        <button onClick={onKapat}>{tr ? 'Tamam' : 'OK'}</button>
      </div>
    </div>
  );
}
