import { useDil } from '../DilContext';
import { rutbeUnvanlari } from '../rutbeIlerleme';
import { KararKatman, KararOnay, RutbeYolu } from './KararKabuk';

const M = {
  baslik: { tr: 'Terfi!', en: 'Promoted!' },
  alt: { tr: 'Kariyerinde yeni bir basamağa çıktın.', en: 'You have reached a new step in your career.' },
  yeni: { tr: 'Yeni rütben', en: 'Your new rank' },
  devam: { tr: 'Devam', en: 'Continue' },
};

/**
 * Terfi penceresi (Asker ve Din Adamı hariç: onların terfisi zaten Doktrin / Öğreti seçim ekranıyla gelir).
 * Rütbe yolu (S1–S5): geçilen basamaklar madalyon, yeni rütben bordo halkalı.
 */
export function TerfiPenceresi({ meslek, cag, seviye, unvan, onKapat }: { meslek: string; cag: string; seviye: number; unvan: string; onKapat: () => void }) {
  const { dil, kt } = useDil();
  const unvanlar = rutbeUnvanlari(meslek, cag);
  const adimlar = (unvanlar ?? []).slice(0, seviye).map((u, i) => ({ seviye: i + 1, simge: '🎖️', ad: kt(u), kol: 'sadik' as const }));
  return (
    <KararKatman simge="🎖️" baslik={M.baslik[dil]} alt={M.alt[dil]} rozet={`${dil === 'en' ? 'Rank' : 'Rütbe'} ${seviye} / 5`}>
      <RutbeYolu simdi={seviye} adimlar={adimlar} />
      <p className="kk-yeni-rutbe">
        {M.yeni[dil]}: <strong>{kt(unvan)}</strong>
      </p>
      <KararOnay not="" etiket={M.devam[dil]} disabled={false} onClick={onKapat} />
    </KararKatman>
  );
}
