// Aşk evliliği tanışması ayrı bir pencere değil, olay kutusunda (OlayKutusu) bir olay gibi gösterilir:
// sunucudaki TanismaDurumu burada sentetik bir senaryoya / sonuca çevrilir.
// Tepkiler düz anlatı metnidir; adım sayacı ya da ipucu gösterilmez.

import type { OlaySonucu } from './components/OlayKutusu';
import { im } from './iliskilerMetin';
import type { Dil } from './ayarlar';
import type { SenaryoResponse, Secenek, TanismaDurumu } from './types';

function secenek(metin: string): Secenek {
  return {
    metin,
    basari_sansi: 100,
    belirsiz_aralik: { min: 100, max: 100 },
    basarili_sonuc: { mesaj: '' },
    basarisiz_sonuc: { mesaj: '' },
    kilitli: false,
  };
}

/** Süren tanışmanın o anki adımı: 0 = göz göze (yanına git / vazgeç), 1.. = diyalog adımı (+ vazgeç). */
export function tanismaSenaryosu(durum: TanismaDurumu, tepki: string | null, dil: Dil): SenaryoResponse {
  const adimda = durum.adim >= 1;
  const metin = adimda
    ? [tepki ?? durum.sonTepki, durum.istek].filter((s): s is string => !!s && s.trim() !== '').join(' ')
    : durum.giris;
  const secenekler = adimda
    ? [...durum.secenekler.map((s) => secenek(s.metin)), secenek(im(dil, 'tanismaVazgec'))]
    : [secenek(im(dil, 'tanismaYaklas')), secenek(im(dil, 'tanismaVazgec'))];
  return {
    olay_basligi: adimda && durum.aday ? `💞 ${durum.aday.isim}` : im(dil, 'tanismaBaslik'),
    olay_metni: metin,
    kategori: 'sosyal',
    gorsel: '💞',
    resim: 'evlilik',
    secenekler,
  };
}

/** Diyalog bittiğinde olay kutusunun sonuç hâli. */
export function tanismaOlaySonucu(
  sonuc: { mesaj: string; basarili: boolean },
  tepki: string | null,
  paraBirimi: string,
): OlaySonucu {
  return {
    etki: { mesaj: '' },
    basarili: sonuc.basarili,
    kategori: 'sosyal',
    paraBirimi,
    terfiOldu: false,
    ozet: [tepki, sonuc.mesaj].filter((s): s is string => !!s && s.trim() !== '').join(' '),
    ikon: sonuc.basarili ? '💞' : '🌫️',
  };
}
