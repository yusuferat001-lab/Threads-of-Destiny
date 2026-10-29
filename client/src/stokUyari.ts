// Stok yetmediğinde çıkan zorunlu pencere: ayrı bir açılır ekran değil, olay kutusunda (OlayKutusu) bir olay
// gibi gösterilir; oyuncu "Kapat"a basmadan kapanmaz. Yıl sonu dökümündeki uyarılardan sentetik bir senaryo kurar.

import type { Dil } from './ayarlar';
import type { IsletmeGorunumu, IsletmeUyari, SenaryoResponse, Secenek } from './types';

const ANAHTAR = 'kader-carki-stok-uyari-yili';
const TETIKLEYICI_KODLAR: IsletmeUyari['kod'][] = ['stok_bitti', 'kitle_kaybi', 'uretim_tavani'];

function gorulenYil(stateId: string): number {
  try {
    const kayit = JSON.parse(localStorage.getItem(ANAHTAR) ?? '{}') as Record<string, number>;
    return kayit[stateId] ?? -1;
  } catch {
    return -1;
  }
}

export function stokUyariGoruldu(stateId: string, yil: number): void {
  try {
    const kayit = JSON.parse(localStorage.getItem(ANAHTAR) ?? '{}') as Record<string, number>;
    kayit[stateId] = yil;
    localStorage.setItem(ANAHTAR, JSON.stringify(kayit));
  } catch {
    /* localStorage yoksa pencere bu oturumda bir kez gösterilir */
  }
}

export interface StokUyarisi {
  yil: number;
  eksikHatlar: { ad: string; talep: number; satilan: number }[];
  paraYetmedi: boolean;
  musteriKaybi: boolean;
  uretimTavani: boolean;
}

/** Geçen yılın dökümünde stok/üretim yetmemesi varsa ve oyuncu henüz kapatmadıysa uyarıyı döner. */
export function bekleyenStokUyarisi(durum: IsletmeGorunumu | null, stateId: string, dil: Dil): StokUyarisi | null {
  const dokum = durum?.sonDokum;
  if (!durum || !dokum || dokum.yil <= gorulenYil(stateId)) return null;
  if (!dokum.uyarilar.some((u) => TETIKLEYICI_KODLAR.includes(u.kod))) return null;
  const eksikHatlar = dokum.hatlar
    .filter((h) => h.talep > h.satilan)
    .map((h) => {
      const hat = durum.hatlar.find((x) => x.id === h.id);
      return { ad: hat ? hat.ad[dil === 'en' ? 'en' : 'tr'] : h.id, talep: h.talep, satilan: h.satilan };
    });
  return {
    yil: dokum.yil,
    eksikHatlar,
    paraYetmedi: dokum.uyarilar.some((u) => u.kod === 'alim_yetersiz'),
    musteriKaybi: dokum.uyarilar.some((u) => u.kod === 'kitle_kaybi'),
    uretimTavani: dokum.uyarilar.some((u) => u.kod === 'uretim_tavani'),
  };
}

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

/** Uyarıyı olay kutusunda gösterilecek tek şıklı ("Kapat") sentetik senaryoya çevirir. */
export function stokUyariSenaryosu(u: StokUyarisi, meslek: string, dil: Dil): SenaryoResponse {
  const en = dil === 'en';
  const parcalar: string[] = [];
  for (const h of u.eksikHatlar) {
    const eksik = h.talep - h.satilan;
    parcalar.push(
      en
        ? `${h.ad}: ${h.talep} wanted, you sold ${h.satilan} (${eksik} short).`
        : `${h.ad}: ${h.talep} birim talep vardı, ${h.satilan} satabildin (${eksik} eksik).`,
    );
  }
  if (u.uretimTavani) {
    parcalar.push(
      en
        ? 'Your production cap fell short of demand — add a workbench or staff.'
        : 'Üretim tavanın talebe yetmedi; tezgâh ya da çalışan ekle.',
    );
  } else if (u.paraYetmedi) {
    parcalar.push(
      en
        ? 'At the start of the year you could not afford to restock fully. Keep some cash for goods, or take a loan.'
        : 'Yıl başında mal alacak paran yetmedi, depo eksik doldu. Mal için nakit ayır ya da kredi al.',
    );
  } else {
    parcalar.push(
      en
        ? 'Your warehouse could not cover the demand. Consider upgrading it.'
        : 'Depon bu talebi karşılamaya yetmedi. Depoyu büyütmeyi düşün.',
    );
  }
  parcalar.push(
    u.musteriKaybi
      ? en
        ? 'Second year in a row: part of your customers went to the rival.'
        : 'Üst üste ikinci yıl: müşterilerinin bir kısmı rakibe geçti.'
      : en
        ? 'If it happens again next year, customers will leave for the rival.'
        : 'Gelecek yıl da yetmezse müşteri rakibe geçecek.',
  );
  return {
    olay_basligi: en ? '📦 Stock ran short' : '📦 Depo yetmedi',
    olay_metni: parcalar.join(' '),
    kategori: meslek === 'Zanaatkâr' ? 'zanaat' : 'ticaret',
    gorsel: '📦',
    secenekler: [secenek(en ? 'Close' : 'Kapat')],
  };
}
