/**
 * Olay bankası çeviri kancası.
 *
 * Türkçe olay tanımları (server/src/data/olaylar/*) KANONİK kalır — motor mantığı,
 * filtreler, etiketler hep onları kullanır. İngilizce, YALNIZCA olay oyuncuya
 * gönderilmeden hemen önce burada bir arama katmanıyla uygulanır.
 *
 * Her kaynak dosya için bir `<ad>.en.ts` ayna dosyası
 * `Record<olayId, OlayCeviri>` dışa aktarır ve aşağıdaki `KAYIT` dizisine eklenir.
 * Bir olayın / alanın karşılığı yoksa Türkçe metin olduğu gibi kalır (kısmi
 * kapsama güvenli biçimde Türkçeye düşer).
 */
import type { Dil, SonucEtkisi } from "../../types";
import type { OlayTanimi, OlaySecenegi } from "../../data/olaylar/types";

/** Bir SonucEtkisi'nin çevrilebilir metin alanları. */
export interface SonucCeviri {
  mesaj?: string;
  detay?: string;
}

/** Bir onTepki bloğunun çevrilebilir metin alanları. */
export interface OnTepkiCeviri {
  metin?: string;
  geriCekilMetni?: string;
  geriCekilSonucu?: SonucCeviri;
  devamMetni?: string;
  devamSonucu?: SonucCeviri;
}

/** Bir seçeneğin çevrilebilir metin alanları (index ile eşleşir). */
export interface SecenekCeviri {
  metin?: string;
  ipucu?: string;
  kilitAciklamasi?: string;
  basariliSonuc?: SonucCeviri;
  basarisizSonuc?: SonucCeviri;
  onTepki?: OnTepkiCeviri;
}

/** Bir olayın tüm çevrilebilir metinleri. `secenekler` kaynak sırasıyla eşleşir. */
export interface OlayCeviri {
  baslik?: string;
  metin?: string;
  secenekler?: (SecenekCeviri | null)[];
}

// Faz 2: her kaynak dosyanın `*.en.ts` çeviri haritası buraya eklenir.
import { OLAYLAR_SANAYI_TUCCAR_EN } from "./sanayiTuccar.en";
import { OLAYLAR_SANAYI_DINADAMI_EN } from "./sanayiDinAdami.en";
import { OLAYLAR_SANAYI_ASKER_EN } from "./sanayiAsker.en";
import { OLAYLAR_KURESEL_EN } from "./kureselOlaylar.en";
import { OLAYLAR_SAGLIK_TOPARLANMA_EN } from "./saglikToparlanma.en";
import { OLAYLAR_ORTACAG_DINADAMI_EN } from "./ortaCagDinAdami.en";
import { OLAYLAR_ORTACAG_TUCCAR_EN } from "./ortaCagTuccar.en";
import { OLAYLAR_ORTACAG_ASKER_EN } from "./ortaCagAsker.en";
import { OLAYLAR_ILISKILER_EN } from "./iliskiler.en";
import { OLAYLAR_AILE_EN } from "./aile.en";
import { OLAYLAR_HAPIS_EN } from "./hapis.en";
import { OLAYLAR_EVCIL_HAYVAN_EN } from "./evcilHayvan.en";
import { OLAYLAR_ARANMA_SEVIYESI_EN } from "./aranmaSeviyesi.en";
import { OLAYLAR_ESYA_VE_GIZEM_EN } from "./esyaVeGizem.en";
import { OLAYLAR_EVLILIK_AILE_EN } from "./evlilikVeAile.en";
import { OLAYLAR_HIZIP_EN } from "./hizip.en";
import { OLAYLAR_ORTACAG_DINADAMI_YOLLARI_EN } from "./ortaCagDinAdamiYollari.en";
import { OLAYLAR_ORTACAG_ASKER_YOLLARI_EN } from "./ortaCagAskerYollari.en";
import { OLAYLAR_YOLCULUK_EN } from "./yolculuk.en";
import { OLAYLAR_SOSYALLESME_EN } from "./sosyallesme.en";
import { OLAYLAR_GENEL_EN } from "./genel.en";
import { OLAYLAR_KOMIK_OLUM_EN } from "./komikOlumler.en";
import { OLAYLAR_MULK_EN } from "./mulkOlaylari.en";
import { OLAYLAR_BUYULU_EN } from "./buyuluOlaylar.en";

const KAYIT: Record<string, OlayCeviri>[] = [
  OLAYLAR_KOMIK_OLUM_EN,
  OLAYLAR_MULK_EN,
  OLAYLAR_BUYULU_EN,
  OLAYLAR_SANAYI_TUCCAR_EN,
  OLAYLAR_SANAYI_DINADAMI_EN,
  OLAYLAR_SANAYI_ASKER_EN,
  OLAYLAR_KURESEL_EN,
  OLAYLAR_SAGLIK_TOPARLANMA_EN,
  OLAYLAR_ORTACAG_DINADAMI_EN,
  OLAYLAR_ORTACAG_TUCCAR_EN,
  OLAYLAR_ORTACAG_ASKER_EN,
  OLAYLAR_ILISKILER_EN,
  OLAYLAR_AILE_EN,
  OLAYLAR_HAPIS_EN,
  OLAYLAR_EVCIL_HAYVAN_EN,
  OLAYLAR_ARANMA_SEVIYESI_EN,
  OLAYLAR_ESYA_VE_GIZEM_EN,
  OLAYLAR_EVLILIK_AILE_EN,
  OLAYLAR_HIZIP_EN,
  OLAYLAR_ORTACAG_DINADAMI_YOLLARI_EN,
  OLAYLAR_ORTACAG_ASKER_YOLLARI_EN,
  OLAYLAR_YOLCULUK_EN,
  OLAYLAR_SOSYALLESME_EN,
  OLAYLAR_GENEL_EN,
];

const CEVIRI_INDEKSI: Record<string, OlayCeviri> = Object.assign({}, ...KAYIT);

/** Bir olay id'si için (varsa) çeviri kaydını döndürür. */
export function olayCevirisiGetir(olayId: string): OlayCeviri | undefined {
  return CEVIRI_INDEKSI[olayId];
}

/** Kayıtlı tüm çeviri id'leri (yetim-id / drift taraması için). */
export function tumCeviriIdleri(): string[] {
  return Object.keys(CEVIRI_INDEKSI);
}

function sonucCevir<T extends SonucEtkisi>(sonuc: T, ceviri: SonucCeviri | undefined): T {
  if (!ceviri) return sonuc;
  return {
    ...sonuc,
    ...(ceviri.mesaj !== undefined ? { mesaj: ceviri.mesaj } : {}),
    ...(ceviri.detay !== undefined ? { detay: ceviri.detay } : {}),
  };
}

/**
 * Bir olay tanımının SIĞ bir kopyasını, İngilizce metinleri uygulanmış olarak
 * döndürür (dil !== "en" ise ya da kayıt yoksa nesneyi olduğu gibi verir).
 * Yalnızca gösterim alanları değişir; tüm mantık alanları (filtreler, etkiler,
 * baseBasariSansi, id...) aynen korunur.
 */
export function olayCevirisiUygula(olay: OlayTanimi, dil: Dil): OlayTanimi {
  if (dil !== "en") return olay;
  const ceviri = CEVIRI_INDEKSI[olay.id];
  if (!ceviri) return olay;

  const secenekler: OlaySecenegi[] = olay.secenekler.map((secenek, i) => {
    const sc = ceviri.secenekler?.[i];
    if (!sc) return secenek;
    const yeni: OlaySecenegi = {
      ...secenek,
      ...(sc.metin !== undefined ? { metin: sc.metin } : {}),
      ...(sc.ipucu !== undefined ? { ipucu: sc.ipucu } : {}),
      ...(sc.kilitAciklamasi !== undefined ? { kilitAciklamasi: sc.kilitAciklamasi } : {}),
      basariliSonuc: sonucCevir(secenek.basariliSonuc, sc.basariliSonuc),
      basarisizSonuc: sonucCevir(secenek.basarisizSonuc, sc.basarisizSonuc),
    };
    if (secenek.onTepki && sc.onTepki) {
      yeni.onTepki = {
        ...secenek.onTepki,
        ...(sc.onTepki.metin !== undefined ? { metin: sc.onTepki.metin } : {}),
        ...(sc.onTepki.geriCekilMetni !== undefined ? { geriCekilMetni: sc.onTepki.geriCekilMetni } : {}),
        ...(sc.onTepki.devamMetni !== undefined ? { devamMetni: sc.onTepki.devamMetni } : {}),
        geriCekilSonucu: sonucCevir(secenek.onTepki.geriCekilSonucu, sc.onTepki.geriCekilSonucu),
        devamSonucu: sonucCevir(secenek.onTepki.devamSonucu, sc.onTepki.devamSonucu),
      };
    }
    return yeni;
  });

  return {
    ...olay,
    ...(ceviri.baslik !== undefined ? { baslik: ceviri.baslik } : {}),
    ...(ceviri.metin !== undefined ? { metin: ceviri.metin } : {}),
    secenekler,
  };
}
