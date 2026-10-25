// Olay çözüldükten sonraki tek sakin yıl ("Yıl Geç"): olay kutusunda tek şıklı sentetik bir olay gibi gösterilir.
import type { Dil } from './ayarlar';
import { bic, metinler } from './i18n';
import type { SenaryoResponse } from './types';

export function sakinYilSenaryosu(yil: number, dil: Dil): SenaryoResponse {
  const m = metinler(dil);
  return {
    olay_basligi: m.syBaslik,
    olay_metni: bic(m.syMetin, yil),
    kategori: 'sosyal',
    gorsel: '📅',
    secenekler: [
      {
        metin: m.syDugme,
        basari_sansi: 100,
        belirsiz_aralik: { min: 100, max: 100 },
        basarili_sonuc: { mesaj: '' },
        basarisiz_sonuc: { mesaj: '' },
        kilitli: false,
      },
    ],
  };
}
