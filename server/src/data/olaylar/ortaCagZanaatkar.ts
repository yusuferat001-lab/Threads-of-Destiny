import type { OlayTanimi } from "./types";

/**
 * Orta Çağ Zanaatkâr'a özel, kariyer yolundan bağımsız standalone havuz
 * (yol seçilmeden önce de, seçildikten sonra da çıkabilir — hiçbir yol
 * etiketi gerektirmez). NOT (iskelet, 2026-09): 6 olayla başlatıldı,
 * mevcut mesleklerin standalone havuzları (18-26 olay) seviyesine
 * çıkarılması sonraki bir turun işi.
 */
export const OLAY_ORTACAG_ZANAATKAR: OlayTanimi[] = [
  {
    id: "oc_zanaatkar_musteri_pazarligi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Sert Bir Pazarlık",
    metin: "Bir müşteri, emeğinin karşılığını neredeyse yarı fiyatına almaya çalışıyor.",
    secenekler: [
      {
        metin: "Fiyatında dur, gerekirse satışı kaybet.",
        baseBasariSansi: 62,
        basariliSonuc: {
          para: 8,
          un: 4,
          mesaj: "Müşteri sonunda senin fiyatını kabul etti; emeğinin değerini bildin.",
          detay: "Kendi değerini bilen, başkasına da bildirir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Müşteri vazgeçip başka bir ustaya gitti.",
          detay: "Her pazarlık kazanılmaz.",
        },
      },
      {
        metin: "Fiyatı düşür, işi kaçırma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 3,
          mutluluk: -2,
          mesaj: "İşi aldın ama emeğinin karşılığını tam alamadın.",
          detay: "Bazen az kazanmak, hiç kazanmamaktan iyidir.",
        },
        basarisizSonuc: {
          para: 1,
          mutluluk: -3,
          mesaj: "İndirime rağmen müşteri yine de vazgeçti.",
          detay: "Bazı müşteriler hiçbir fiyata ikna olmaz.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_malzeme_kitligi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Malzeme Kıtlığı",
    metin: "Kullandığın ham madde kıtlaştı; tüccarlar fiyatları ikiye katladı.",
    secenekler: [
      {
        metin: "Pahalıya da olsa malzemeyi al, işini aksatma.",
        baseBasariSansi: 75,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          uretim_kapasitesi_artis: 3,
          mesaj: "İşin aksamadı, müşterilerin memnun kaldı.",
          detay: "Süreklilik, itibarın en sağlam temelidir.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -3,
          mesaj: "Malzeme kalitesiz çıktı, param boşa gitti.",
          detay: "Kıtlıkta herkes fırsatçı olmaz ama bazıları olur.",
        },
      },
      {
        metin: "Alternatif, daha düşük kalite malzemeyle idare et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 4,
          mesaj: "İdare ettin, kimse fark etmedi.",
          detay: "Bazen yaratıcılık, sıkıntıdan doğar.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -3,
          mesaj: "Kalite düşüklüğü fark edildi, birkaç müşteri küstü.",
          detay: "Her idare-i maslahat bir bedel getirir.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_rakip_usta",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Rakip Ustanın Gölgesi",
    metin: "Çarşıya yeni açılan bir atölye, senin müşterilerinin bir kısmını çekmeye başladı.",
    secenekler: [
      {
        metin: "Daha iyi hizmet ve kaliteyle fark yarat.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 8,
          para: 6,
          mesaj: "Kaliteyle rekabet ettin; eski müşterilerin geri döndü.",
          detay: "İyilik, en kalıcı reklamdır.",
        },
        basarisizSonuc: {
          para: -4,
          mutluluk: -3,
          mesaj: "Çabaların yeterli olmadı, birkaç müşteri kaybettin.",
          detay: "Rekabet bazen acımasız kalır.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_yangin_riski",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minAhlak: -100,
    gorsel: "🔥",
    baslik: "Ocaktan Sıçrayan Kıvılcım",
    metin: "Atölyendeki ocaktan sıçrayan bir kıvılcım, saman yığınına düştü.",
    secenekler: [
      {
        metin: "Hemen müdahale et.",
        baseBasariSansi: 78,
        basariliSonuc: {
          saglik: -3,
          mesaj: "Ateşi hızla söndürdün, küçük bir yanıkla kurtuldun.",
          detay: "Hızlı refleksler bazen her şeyi kurtarır.",
        },
        basarisizSonuc: {
          para: -14,
          saglik: -8,
          mesaj: "Atölyenin bir köşesi yandı, onarım pahalıya patladı.",
          detay: "Ateşle iş yapanın en büyük düşmanı yine ateştir.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_soylu_hedive",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minUn: 30,
    gorsel: "🔨",
    baslik: "Soylunun Hediyesi",
    metin: "Yerel bir soylu, işinden etkilenip sana özel bir hediye ısmarlamak istiyor.",
    secenekler: [
      {
        metin: "Elinden gelenin en iyisini yap.",
        baseBasariSansi: 68,
        maliyet: 8,
        basariliSonuc: {
          para: 20,
          un: 10,
          mesaj: "Soylu eserinden çok memnun kaldı; adın saraya kadar ulaştı.",
          detay: "Doğru kişiyi etkilemek, kapılar açar.",
        },
        basarisizSonuc: {
          para: -8,
          un: -6,
          mesaj: "Soylu eseri beğenmedi, üstelik ödemeyi de geciktirdi.",
          detay: "Yüksek beklenti, yüksek hayal kırıklığı getirebilir.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_ekip_hirsizligi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEkip: true,
    gorsel: "🔨",
    baslik: "Kayıp Malzeme",
    metin: "Atölyenden değerli bir malzeme kayboldu; şüphe çalışanlarından birinin üzerinde.",
    secenekler: [
      {
        metin: "Sessizce araştır, doğrudan suçlama.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 4,
          mesaj: "Malzemeyi bir köşede buldun; kimseyi suçlamadan sorunu çözdün.",
          detay: "Sabırlı bir araştırma çoğu zaman işe yarar.",
        },
        basarisizSonuc: {
          para: -8,
          dost_puani: -4,
          mesaj: "Malzemeyi bulamadın, atölyende güvensizlik havası oluştu.",
          detay: "Şüphe, dostluğu yavaşça kemirir.",
        },
      },
    ],
  },
];
