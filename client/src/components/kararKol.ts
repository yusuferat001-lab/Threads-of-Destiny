import { useDil } from '../DilContext';

/** Karar pencerelerinde seçenek kolu (renk + etiket). Bileşenler: KararKabuk.tsx. */
export type Kol = 'evrensel' | 'sadik' | 'kahraman' | 'sert';

const KOL_ETIKET: Record<Kol, { tr: string; en: string }> = {
  evrensel: { tr: 'Evrensel', en: 'Universal' },
  sadik: { tr: 'Sadık yol', en: 'Loyal path' },
  kahraman: { tr: 'Kahraman yol', en: 'Hero path' },
  sert: { tr: '⚡ Acımasız', en: '⚡ Ruthless' },
};

/** Sunucudaki doktrin kaynağını (evrensel/sadik/kahraman/sert) kola çevirir; bilinmeyen → evrensel. */
export function kolOlarak(kaynak: string | undefined | null): Kol {
  return kaynak === 'sadik' || kaynak === 'kahraman' || kaynak === 'sert' ? kaynak : 'evrensel';
}
export function useKolEtiketi(): (kol: Kol) => string {
  const { dil } = useDil();
  return (kol) => KOL_ETIKET[kol][dil];
}

