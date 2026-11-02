import type { CharacterState, FinansOzeti, IsletmeGorunumu } from './types';

/**
 * Tüm panellerin (sol özet, ana ekran Kazanç paneli, Bütçen) AYNI sayıyı göstermesi için tek tanım:
 * - Gelir  = işletmeli meslekte brüt satış (Din Adamı'nda cemaat geliri), Asker'de maaş; mülk geliri dahil.
 * - Kazanç = yıl sonunda cebine kalan: tüm giderler (mal alımı, vergi, aidat, maaşlar, yaşam, kira, kredi taksidi) düşülmüş.
 * - Gider  = Gelir − Kazanç.
 */
export interface KazancOzeti {
  gelir: number;
  gider: number;
  kazanc: number;
  krediTaksit: number;
}

export function kazancOzetiHesapla(
  karakter: Pick<CharacterState, 'maas_yillik'>,
  isletme: IsletmeGorunumu | null,
  finans: FinansOzeti | null
): KazancOzeti {
  if (isletme) {
    const b = isletme.butce;
    const gelir = (isletme.cemaat ? isletme.cemaat.toplamGelir : b.satis) + (b.gayrimenkul ?? 0);
    return { gelir, gider: Math.max(0, gelir - b.cebineKalan), kazanc: b.cebineKalan, krediTaksit: b.krediTaksit };
  }
  const mulk = finans?.gayrimenkulYillikGelir ?? 0;
  const gelir = (finans?.maasYillik ?? karakter.maas_yillik) + mulk;
  const kazanc = finans ? finans.netYillik + mulk : gelir;
  return { gelir, gider: Math.max(0, gelir - kazanc), kazanc, krediTaksit: finans?.krediTaksit ?? 0 };
}
