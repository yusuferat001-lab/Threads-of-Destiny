/**
 * Üst şerit göstergelerinin (Can/Para/Mutluluk/Ahlak/Aranma/Şöhret) "bu değer
 * neyden etkileniyor, nasıl değişir?" detay penceresi için salt-okunur özet.
 *
 * Tasarım ilkeleri:
 *  - Yıllık pasif etkenlerin SAYILARI stateManager'daki sabitlerden okunur (elle
 *    yazılmış rakam yok → formül değişince açıklama sapmaz).
 *  - Yalnızca karakterin ŞU AN yaşadığı etkenler listelenir ("yaşlanma" 50 yaşından
 *    önce görünmez); oyuncu gerçekten neyin onu etkilediğini görsün.
 *  - "Nasıl yükselir / düşer" bölümü statik, oyunun gerçek mekaniklerine işaret eden
 *    kısa ipuçlarıdır.
 *  - Hiçbir state değiştirilmez, tur tüketilmez.
 */
import { YAS_MUTLULUK_YILLIK } from "../data/aileSabitleri";
import type { CharacterState, SonucEtkisi, EtkenKaydi } from "../types";
import { T, K } from "../i18n";
import { konutGetir } from "../data/konutlar";
import { yasamSecenegiGetir } from "../data/yasamSecenekleri";
import {
  yaslanmaYillikKayip,
  giderKalemleriHesapla,
  hesaplaMaasYillik,
  dunyaFinansEtkileri,
  KRIZ_ETKI,
  KRONIK_SAGLIK_ESIGI,
  KRONIK_MUTLULUK_ESIGI,
  EVLILIK_MORAL_YAS,
  YALNIZLIK_MUTLULUK_YILLIK,
  KOTU_EVLILIK_ESIGI,
  IYI_EVLILIK_ESIGI,
  IYI_EVLILIK_MUTLULUK_YILLIK,
  SUC_SEVIYESI_PASIF_AZALMA_YILLIK,
  SUC_TEMIZ_YIL,
  sucTemizYilSayisi,
  PASIF_REGEN_TAVANI,
  KARABORSA_SUC_ARTISI_YILLIK,
  KARABORSA_AHLAK_ASINMASI_YILLIK,
} from "./stateManager";
import { ahlakInananEtkisi } from "../data/cemaat";
import { aranmaAhlakKaybi } from "../data/aranmaSabitleri";
import { kisilikGetir } from "../data/kisilikler";
import { isletmeMeslegiMi } from "../data/meslekProfilleri";

export const GOSTERGE_STATLARI = ["saglik", "para", "mutluluk", "ahlak", "aranma", "sohret"] as const;
export type GostergeStat = (typeof GOSTERGE_STATLARI)[number];

export function gostergeStatiMi(v: string): v is GostergeStat {
  return (GOSTERGE_STATLARI as readonly string[]).includes(v);
}

export interface GostergeEtken {
  ikon: string;
  metin: string;
  /** Değerin yönüne etkisi: iyi (yükseltir), kotu (düşürür), notr (bilgi). */
  yon: "iyi" | "kotu" | "notr";
}

export interface GostergeDetayi {
  stat: GostergeStat;
  /** Gösterilen güncel değer (para dışında 0-100; aranma ham suç puanı 0-100). */
  deger: number;
  etkenler: GostergeEtken[];
  /** Değeri YÜKSELTMEK için yapılabilecekler. */
  yukselt: string[];
  /** Değeri DÜŞÜRMEK için yapılabilecekler (aranma için asıl istenen bölüm). */
  dusur: string[];
  /** Bu göstergeyi son seçimlerin nasıl etkilediği (en yeni üstte, en fazla 6). */
  gecmis: { yil: number; kaynak: string; delta: number }[];
}

/** Yıllık etken/ipucu kısmı; `gecmis` (seçim günlüğü) gostergeDetayiUret'te eklenir. */
type GostergeDetayTaban = Omit<GostergeDetayi, "gecmis">;

/** Yıllık etkiyi okunur işaretli bir sayıya çevirir: +1, −0.7, +0.5 */
function isaretli(n: number): string {
  const yuvarla = Math.round(Math.abs(n) * 10) / 10;
  return `${n >= 0 ? "+" : "−"}${yuvarla}`;
}

function yon(n: number): "iyi" | "kotu" | "notr" {
  return n > 0 ? "iyi" : n < 0 ? "kotu" : "notr";
}

/** Konut + yaşam tarzının bir statı üzerindeki yıllık toplam etkisi. */
function konutYasamEtkisi(state: CharacterState, alan: "saglik" | "mutluluk" | "un"): number {
  const konut = konutGetir(state.konut_id);
  const yasam = yasamSecenegiGetir(state.yasam_secimi_id);
  const anahtar = alan === "saglik" ? "saglikEtkisiYillik" : alan === "mutluluk" ? "mutlulukEtkisiYillik" : "unEtkisiYillik";
  return (konut?.[anahtar] ?? 0) + (yasam?.[anahtar] ?? 0);
}

function durumEtkenleri(state: CharacterState, alan: "tur_basi_saglik" | "tur_basi_mutluluk"): GostergeEtken[] {
  const dil = state.dil;
  const liste: GostergeEtken[] = [];
  for (const d of state.durumlar) {
    const v = d[alan];
    if (!v) continue;
    liste.push({ ikon: "🩹", metin: T(dil, "{0}: {1}/yıl", [K(dil, d.ad), isaretli(v)]), yon: yon(v) });
  }
  return liste;
}

function krizEtkeni(state: CharacterState, alan: "saglik" | "mutluluk" | "un" | "para"): GostergeEtken | null {
  const kriz = state.ulke.kriz;
  if (!kriz) return null;
  const v = KRIZ_ETKI[kriz.tur]?.[alan];
  if (!v) return null;
  const ad = kriz.tur === "kitlik" ? "Kıtlık" : kriz.tur === "isyan" ? "İsyan" : "Altın çağ";
  const ikon = kriz.tur === "kitlik" ? "🌾" : kriz.tur === "isyan" ? "🔥" : "✨";
  return { ikon, metin: T(state.dil, "{0}: {1}/yıl", [T(state.dil, ad), isaretli(v)]), yon: yon(v) };
}

function saglikDetayi(state: CharacterState): GostergeDetayTaban {
  const dil = state.dil;
  const etkenler: GostergeEtken[] = [];

  const yaslanma = yaslanmaYillikKayip(state.yas);
  if (yaslanma > 0) {
    etkenler.push({ ikon: "⏳", metin: T(dil, "Yaşlanma: {0}/yıl", [isaretli(-yaslanma)]), yon: "kotu" });
  }
  const ev = konutYasamEtkisi(state, "saglik");
  if (ev) {
    etkenler.push({ ikon: "🏠", metin: T(dil, "Ev ve yemek düzenin: {0}/yıl", [isaretli(ev)]), yon: yon(ev) });
    if (ev > 0 && state.saglik >= PASIF_REGEN_TAVANI) {
      etkenler.push({
        ikon: "🔒",
        metin: T(dil, "Sağlık {0} üstündeyken bu iyileşme çok yavaşlar.", [PASIF_REGEN_TAVANI]),
        yon: "notr",
      });
    }
  }
  etkenler.push(...durumEtkenleri(state, "tur_basi_saglik"));
  const kriz = krizEtkeni(state, "saglik");
  if (kriz) etkenler.push(kriz);
  if (state.para < 0) {
    etkenler.push({ ikon: "💸", metin: T(dil, "Borç stresi: {0}/yıl", [isaretli(-1)]), yon: "kotu" });
  }
  if (state.mutluluk < KRONIK_MUTLULUK_ESIGI) {
    etkenler.push({
      ikon: "😞",
      metin: T(dil, "Mutluluğun {0} altında: sağlığın da aşınıyor, {1}/yıl.", [KRONIK_MUTLULUK_ESIGI, isaretli(-1)]),
      yon: "kotu",
    });
  }
  if (state.etiketler.includes("veba_hastasi")) {
    etkenler.push({
      ikon: "☠️",
      metin: T(dil, "Vebaya yakalandın: ölüm riskin %{0}.", [Math.round(state.veba_olum_riski)]),
      yon: "kotu",
    });
  }
  if (state.saglik < KRONIK_SAGLIK_ESIGI) {
    etkenler.push({
      ikon: "⚠️",
      metin: T(dil, "Sağlığın {0} altında: riskli seçimlerde ölüm şansın büyür.", [KRONIK_SAGLIK_ESIGI]),
      yon: "kotu",
    });
  }

  return {
    stat: "saglik",
    deger: state.saglik,
    etkenler,
    yukselt: [
      T(dil, "Gelir & Gider ekranından daha iyi bir ev ve yemek düzenine geç."),
      T(dil, "Mağazadan şifa eşyası al ve envanterden kullan."),
      T(dil, "Dinlenme, şifa ve iyileşme sunan olay seçeneklerini seç."),
      T(dil, "Borçtan kurtul; borç her yıl sağlığını yer."),
    ],
    dusur: [
      T(dil, "Riskli, kavgalı ve tehlikeli olay seçenekleri sağlığını düşürür."),
      T(dil, "Kıtlık, salgın ve savaş dönemlerinde sağlık erir."),
    ],
  };
}

function mutlulukDetayi(state: CharacterState): GostergeDetayTaban {
  const dil = state.dil;
  const etkenler: GostergeEtken[] = [];

  const ev = konutYasamEtkisi(state, "mutluluk");
  if (ev) {
    etkenler.push({ ikon: "🏠", metin: T(dil, "Ev ve yemek düzenin: {0}/yıl", [isaretli(ev)]), yon: yon(ev) });
  }
  if (state.yas >= EVLILIK_MORAL_YAS) {
    if (!state.es_adi) {
      etkenler.push({
        ikon: "💔",
        metin: T(dil, "Yalnızlık: {0}/yıl", [isaretli(-YALNIZLIK_MUTLULUK_YILLIK)]),
        yon: "kotu",
      });
    } else if (state.es_puani < KOTU_EVLILIK_ESIGI) {
      etkenler.push({
        ikon: "💢",
        metin: T(dil, "Eşinle sürekli kavga: moralin aşınıyor."),
        yon: "kotu",
      });
    } else if (state.es_puani >= IYI_EVLILIK_ESIGI) {
      etkenler.push({
        ikon: "💞",
        metin: T(dil, "Mutlu evlilik: {0}/yıl", [isaretli(IYI_EVLILIK_MUTLULUK_YILLIK)]),
        yon: "iyi",
      });
    }
  }
  if (!state.es_adi && state.yil < (state.yas_bitis_yili ?? 0)) {
    etkenler.push({ ikon: "🕯️", metin: T(dil, "Yas: {0}/yıl", [isaretli(-YAS_MUTLULUK_YILLIK)]), yon: "kotu" });
  }
  const cocukIyi = state.cocuklar.filter((c) => c.yasiyor && c.iliski >= 75).length;
  const cocukKotu = state.cocuklar.filter((c) => c.yasiyor && c.iliski < 35).length;
  if (cocukKotu > 0) {
    etkenler.push({ ikon: "👧", metin: T(dil, "Çocuklarınla arası bozuk: moralin düşüyor."), yon: "kotu" });
  } else if (cocukIyi > 0) {
    etkenler.push({ ikon: "👨‍👧", metin: T(dil, "Çocuklarınla aran iyi: morale iyi geliyor."), yon: "iyi" });
  }
  etkenler.push(...durumEtkenleri(state, "tur_basi_mutluluk"));
  const kriz = krizEtkeni(state, "mutluluk");
  if (kriz) etkenler.push(kriz);
  if (state.para < 0) {
    etkenler.push({ ikon: "💸", metin: T(dil, "Borç stresi: {0}/yıl", [isaretli(-2)]), yon: "kotu" });
  }
  if (state.saglik < KRONIK_SAGLIK_ESIGI) {
    etkenler.push({
      ikon: "🤒",
      metin: T(dil, "Sağlığın {0} altında: moralin aşınıyor, {1}/yıl.", [KRONIK_SAGLIK_ESIGI, isaretli(-1.5)]),
      yon: "kotu",
    });
  }

  return {
    stat: "mutluluk",
    deger: state.mutluluk,
    etkenler,
    yukselt: [
      T(dil, "Evlen; eşinle ve çocuklarınla Aile ekranından ilgilen."),
      T(dil, "Sosyalleş: meyhane, pazar ve mekân olayları moral verir."),
      T(dil, "Daha rahat bir ev ve keyifli bir sofra seç."),
      T(dil, "Borçlarını öde; borç her yıl moralini düşürür."),
    ],
    dusur: [
      T(dil, "Yalnızlık, kötü evlilik, borç ve kayıplar moralini düşürür."),
      T(dil, "Ahlaksız ya da sert seçimler moral götürür."),
    ],
  };
}

function ahlakDetayi(state: CharacterState): GostergeDetayTaban {
  const dil = state.dil;
  const etkenler: GostergeEtken[] = [];

  if (state.meslek === "Tüccar") {
    etkenler.push({
      ikon: "🪙",
      metin: T(dil, "Tüccarlık: kazançlı yıllar ahlakı aşındırır, zor yıllar güçlendirir."),
      yon: "notr",
    });
  }
  if (state.mulkler.includes("karaborsa")) {
    etkenler.push({
      ikon: "🕶️",
      metin: T(dil, "Karaborsa deposu: {0}/yıl", [isaretli(-KARABORSA_AHLAK_ASINMASI_YILLIK)]),
      yon: "kotu",
    });
  }
  if (state.meslek === "Din Adamı") {
    // v10: ahlak bantları cemaatin yıllık büyümesini belirler (25'erli).
    const bant = ahlakInananEtkisi(state.ahlak);
    etkenler.push({
      ikon: "⛪",
      metin: T(dil, "Ahlak bandın inananlarını yılda {0} değiştiriyor (0–24: −%1,5 · 25–49: 0 · 50–74: +%0,5 · 75–100: +%1,5).", [
        bant === 0
          ? dil === "en" ? "0%" : "%0"
          : dil === "en"
            ? `${bant > 0 ? "+" : "−"}${Math.abs(Math.round(bant * 1000) / 10)}%`
            : `${bant > 0 ? "+" : "−"}%${String(Math.abs(Math.round(bant * 1000) / 10)).replace(".", ",")}`,
      ]),
      yon: bant > 0 ? "iyi" : bant < 0 ? "kotu" : "notr",
    });
  }
  const kisilikAhlak = state.kisilik.reduce((t, k) => t + (kisilikGetir(k)?.yillikEtki?.ahlak ?? 0), 0);
  if (kisilikAhlak !== 0) {
    etkenler.push({ ikon: "🎭", metin: T(dil, "Kişiliğin: {0}/yıl", [isaretli(Math.round(kisilikAhlak * 100) / 100)]), yon: yon(kisilikAhlak) });
  }
  if (isletmeMeslegiMi(state.meslek) && aranmaAhlakKaybi(state.suc_seviyesi) > 0) {
    etkenler.push({ ikon: "🚨", metin: T(dil, "Aranma gölgesi: {0}/yıl", [isaretli(-aranmaAhlakKaybi(state.suc_seviyesi))]), yon: "kotu" });
  }
  if (state.etiketler.includes("bagimlilik:ayyas")) {
    etkenler.push({ ikon: "🍺", metin: T(dil, "Ayyaşlık damgası ahlakını bir kez düşürdü."), yon: "kotu" });
  }
  if (state.omur_zirve_suc >= 40) {
    etkenler.push({ ikon: "🗡️", metin: T(dil, "Geçmişteki suçların ahlakında iz bıraktı."), yon: "kotu" });
  }
  if (etkenler.length === 0) {
    etkenler.push({
      ikon: "ℹ️",
      metin: T(dil, "Ahlak ağırlıkla seçimlerinle değişir."),
      yon: "notr",
    });
  }

  return {
    stat: "ahlak",
    deger: state.ahlak,
    etkenler,
    yukselt: [
      T(dil, "Yardım, sadaka ve dürüstlük içeren olay seçeneklerini seç."),
      T(dil, "Sosyalleş ekranından sadaka ver."),
      T(dil, "Din Adamı rütbesi ahlak ister; yüksek ahlak cemaatini de büyütür."),
    ],
    dusur: [
      T(dil, "Para karşılığı ahlaki taviz ahlakını düşürür, aranmanı artırır."),
      T(dil, "Karanlık işler, soygun ve şiddet ahlakı sert düşürür."),
    ],
  };
}

function sohretDetayi(state: CharacterState): GostergeDetayTaban {
  const dil = state.dil;
  const etkenler: GostergeEtken[] = [];

  const ev = konutYasamEtkisi(state, "un");
  if (ev) {
    etkenler.push({ ikon: "🏠", metin: T(dil, "Ev ve yemek düzenin: {0}/yıl", [isaretli(ev)]), yon: yon(ev) });
  }
  if (state.meslek === "Din Adamı") {
    etkenler.push({ ikon: "⛪", metin: T(dil, "Din adamı saygınlığı: {0}/yıl", [isaretli(0.4)]), yon: "iyi" });
  }
  const kriz = krizEtkeni(state, "un");
  if (kriz) etkenler.push(kriz);
  if (state.kredi && state.kredi.odenmeyenTaksit >= 2) {
    etkenler.push({ ikon: "💰", metin: T(dil, "Tefeci taksidi aksattın: adın çıkıyor."), yon: "kotu" });
  }
  if (etkenler.length === 0) {
    etkenler.push({
      ikon: "ℹ️",
      metin: T(dil, "Şöhret ağırlıkla seçimlerinle değişir."),
      yon: "notr",
    });
  }

  return {
    stat: "sohret",
    deger: state.un,
    etkenler,
    yukselt: [
      T(dil, "Cesur, gösterişli ve topluma açık olay seçeneklerini seç."),
      T(dil, "Mağazadan lüks eşya al ve daha görkemli bir eve taşın."),
      T(dil, "Rütbeni yükselt; mesleğinde başarılı olmak adını duyurur."),
    ],
    dusur: [
      T(dil, "Rezillik, hapis ve ödenmeyen borçlar şöhretini düşürür."),
      T(dil, "Bakımsız ev ve yetersiz yemek adını aşındırır."),
    ],
  };
}

function aranmaDetayi(state: CharacterState): GostergeDetayTaban {
  const dil = state.dil;
  const etkenler: GostergeEtken[] = [];

  if (state.suc_seviyesi > 0) {
    const temiz = sucTemizYilSayisi(state);
    etkenler.push(
      temiz >= SUC_TEMIZ_YIL
        ? {
            ikon: "🕰️",
            metin: T(dil, "Uzun süredir suç işlemedin; zamanla soğur: {0}/yıl", [isaretli(-SUC_SEVIYESI_PASIF_AZALMA_YILLIK)]),
            yon: "iyi",
          }
        : {
            ikon: "🕰️",
            metin: T(dil, "{0} yıl daha suç işlemezsen şehir seni unutmaya başlar ({1}/yıl).", [
              SUC_TEMIZ_YIL - temiz + 1,
              isaretli(-SUC_SEVIYESI_PASIF_AZALMA_YILLIK),
            ]),
            yon: "notr",
          }
    );
  } else {
    etkenler.push({ ikon: "✅", metin: T(dil, "Temizsin; kimse seni aramıyor."), yon: "iyi" });
  }
  if (state.mulkler.includes("karaborsa")) {
    etkenler.push({
      ikon: "🕶️",
      metin: T(dil, "Karaborsa deposu: {0}/yıl", [isaretli(KARABORSA_SUC_ARTISI_YILLIK)]),
      yon: "kotu",
    });
  }
  if (state.yonetim_iliski >= 70) {
    etkenler.push({
      ikon: "👑",
      metin: T(dil, "Yönetimdeki himayen: {0}/yıl", [isaretli(-0.5)]),
      yon: "iyi",
    });
  }
  if (state.hazard_el_sayisi > 0 || state.uc_kagitci_oyun_sayisi > 0) {
    etkenler.push({
      ikon: "🎲",
      metin: T(dil, "Kumar oynamak her seferinde biraz aranmanı artırır."),
      yon: "kotu",
    });
  }
  if (state.etiketler.includes("hapiste")) {
    etkenler.push({
      ikon: "⛓️",
      metin: T(dil, "Hapistesin; cezanı tamamlayınca aranman en fazla 10'a iner."),
      yon: "notr",
    });
  }
  if (state.etiketler.includes("kacak")) {
    etkenler.push({ ikon: "🏃", metin: T(dil, "Kaçaksın: aranman çok yüksek."), yon: "kotu" });
  }

  // Bant açıklaması (CLAUDE.md §17): 25/50/75
  const s = state.suc_seviyesi;
  const bant =
    s >= 75
      ? T(dil, "Azılı suçlu (3★): tutuklanırsan 12-14 yıl ceza.")
      : s >= 50
        ? T(dil, "Baskın bandı (2★): tutuklanırsan 9-11 yıl ceza.")
        : s >= 25
          ? T(dil, "Yakalanma bandı (1★): tutuklanırsan 7-9 yıl ceza.")
          : T(dil, "Rutin bant: tutuklanırsan 3-4 yıl ceza.");
  etkenler.push({ ikon: "📊", metin: bant, yon: "notr" });

  return {
    stat: "aranma",
    deger: state.suc_seviyesi,
    etkenler,
    yukselt: [
      T(dil, "Yasa dışı seçimler (hırsızlık, rüşvet, kaçakçılık, şiddet) ve karanlık işler aranmanı artırır."),
      T(dil, "Zar masası, Üç Kağıtçı ve karaborsa deposu da yavaş yavaş artırır."),
    ],
    dusur: [
      T(dil, "Aranma ekranından kefaret öde (gönüllü ödemede %20 indirim) ya da kendi isteğinle teslim ol (%25 daha kısa ceza)."),
      T(dil, "Aranma olaylarındaki kefaret ya da rüşvet seçeneklerini seç."),
      T(dil, "Büyük baskında 'teslim ol' ya da 'kaç' sonuçları aranmanı düşürür."),
      T(dil, "Yönetim ekranında ilişkin 80'in üstündeyse 'sicil temizliği' iste."),
      T(dil, "Yönetimle ilişkin 70'in üstündeyse aranman yılda biraz düşer."),
    ],
  };
}

function paraDetayi(state: CharacterState): GostergeDetayTaban {
  const dil = state.dil;
  const etkenler: GostergeEtken[] = [];

  etkenler.push({
    ikon: "💼",
    metin: T(dil, "Yıllık maaşın: {0} {1}", [Math.round(hesaplaMaasYillik(state)), state.para_birimi]),
    yon: "iyi",
  });
  const g = giderKalemleriHesapla(state);
  const toplamGider = g.yasam + g.konut + g.ekip + g.evcilHayvan + g.savasVergisi;
  etkenler.push({
    ikon: "🧾",
    metin: T(dil, "Yıllık giderin: {0} {1}", [Math.round(toplamGider), state.para_birimi]),
    yon: "kotu",
  });
  if (state.para < 0) {
    etkenler.push({ ikon: "💸", metin: T(dil, "Borçtasın: faiz her yıl borcunu büyütür."), yon: "kotu" });
  }
  if (state.kredi) {
    etkenler.push({
      ikon: "🏦",
      metin: T(dil, "Tefeci kredin: kalan borç {0} {1}", [Math.round(state.kredi.kalanBorc), state.para_birimi]),
      yon: "kotu",
    });
  }
  if (state.mulkler.length > 0) {
    etkenler.push({ ikon: "🏘️", metin: T(dil, "Mülklerin her yıl kira ve getiri sağlar."), yon: "notr" });
  }
  for (const d of dunyaFinansEtkileri(state)) etkenler.push({ ikon: d.ikon, metin: d.metin, yon: "notr" });

  return {
    stat: "para",
    deger: state.para,
    etkenler,
    yukselt: [
      T(dil, "Rütbeni yükselt: her rütbe maaşına prim ekler."),
      T(dil, "Ahlak, şöhret ve mutluluğunu yüksek tut: itibar maaşını artırır."),
      T(dil, "Yatırım ekranından mülk al."),
      T(dil, "Kazançlı olay seçeneklerini seç; mesleğindeki başarılar daha çok kazandırır."),
    ],
    dusur: [
      T(dil, "Daha pahalı bir ev ve sofra giderini artırır."),
      T(dil, "Kumar, rüşvet, bağış ve talepleri kabul etmek paranı eritir."),
    ],
  };
}

/** Bir göstergenin detay özetini üretir (salt-okunur). */
const ETKEN_GUNLUGU_MAKS = 40;
const ETKEN_GECMIS_GOSTER = 6;

/**
 * Bir seçimin/olayın göstergelere net etkisini günlüğe yazar (etki zaten jitter,
 * meslek çarpanı ve suç kazancı kuralından geçmiş SON hâlindedir). Sıfır/ihmal
 * edilebilir değişimler yazılmaz.
 */
export function etkenGunluguNotEt(state: CharacterState, kaynak: string, etki: SonucEtkisi): void {
  if (!Array.isArray(state.etken_gunlugu)) state.etken_gunlugu = [];
  const adaylar: [EtkenKaydi["stat"], number | undefined][] = [
    ["saglik", etki.saglik],
    ["para", etki.para],
    ["mutluluk", etki.mutluluk],
    ["ahlak", etki.ahlak],
    ["sohret", etki.un],
    ["aranma", etki.suc_degisim],
  ];
  for (const [stat, ham] of adaylar) {
    const delta = Math.round((ham ?? 0) * 10) / 10;
    if (Math.abs(delta) < 1) continue;
    state.etken_gunlugu.push({ yil: state.yil, kaynak, stat, delta });
  }
  if (state.etken_gunlugu.length > ETKEN_GUNLUGU_MAKS) {
    state.etken_gunlugu.splice(0, state.etken_gunlugu.length - ETKEN_GUNLUGU_MAKS);
  }
}

export function gostergeDetayiUret(state: CharacterState, stat: GostergeStat): GostergeDetayi {
  const detay: GostergeDetayi = { ...gostergeDetayiHesapla(state, stat), gecmis: [] };
  detay.gecmis = (state.etken_gunlugu ?? [])
    .filter((k) => k.stat === stat)
    .slice(-ETKEN_GECMIS_GOSTER)
    .reverse()
    .map(({ yil, kaynak, delta }) => ({ yil, kaynak, delta }));
  if (detay.etkenler.length === 0) {
    detay.etkenler.push({
      ikon: "✅",
      metin: T(state.dil, "Şu an seni etkileyen belirgin bir yıllık etken yok; bu değer ağırlıkla seçimlerinle değişir."),
      yon: "notr",
    });
  }
  return detay;
}

function gostergeDetayiHesapla(state: CharacterState, stat: GostergeStat): GostergeDetayTaban {
  switch (stat) {
    case "saglik":
      return saglikDetayi(state);
    case "mutluluk":
      return mutlulukDetayi(state);
    case "ahlak":
      return ahlakDetayi(state);
    case "sohret":
      return sohretDetayi(state);
    case "aranma":
      return aranmaDetayi(state);
    case "para":
      return paraDetayi(state);
  }
}
