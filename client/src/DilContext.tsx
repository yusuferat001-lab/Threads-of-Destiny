import { createContext, useContext } from 'react';
import type { Dil } from './ayarlar';
import { metinler, type Metinler } from './i18n';
import { kt as ktRaw, ktHukumdar as ktHukumdarRaw } from './katalog';

/**
 * Dil bağlamı: App kökünde sağlanır, tüm bileşenler `useDil()` ile erişir.
 * Prop drilling'i önlemek için tek bir context; `dil` değişince App yeniden
 * render olduğu için tüm ağaç tazelenir.
 */
interface DilCtx {
  dil: Dil;
  m: Metinler;
  /** Sabit katalog değeri (bölge/meslek/kişilik/konut...) gösterim çevirisi. */
  kt: (tr: string | null | undefined) => string;
  /** "<unvan> <isim>" hükümdar dizgisinde yalnız unvan önekini çevirir. */
  ktHukumdar: (h: string | null | undefined) => string;
}

export const DilContext = createContext<DilCtx>({
  dil: 'tr',
  m: metinler('tr'),
  kt: (tr) => tr ?? '',
  ktHukumdar: (h) => h ?? '',
});

export function useDil(): DilCtx {
  return useContext(DilContext);
}

export function dilCtxYap(dil: Dil): DilCtx {
  return {
    dil,
    m: metinler(dil),
    kt: (tr) => ktRaw(dil, tr),
    ktHukumdar: (h) => ktHukumdarRaw(dil, h),
  };
}
