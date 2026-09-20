import type { OlayTanimi } from "./types";

/**
 * Sanayi Devrimi Zanaatkâr'ın dallanan kariyer yolu: "İlk Makine" (gameEngine.ts'te
 * zorla tetiklenir, bkz. senaryoUret) karakteri dört felsefeden birine kilitler
 * (yol:zanaatkar:makineci / gelenekci / sendikaci / girisimci).
 *
 * NOT (iskelet, 2026-09): her dal şu an 2 olayla temsil ediliyor — hedef
 * 11 olay/dal. Kalanı sonraki bir turda eklenecek.
 */
export const OLAY_SANAYI_ZANAATKAR_YOLLARI: OlayTanimi[] = [
  {
    id: "sd_zanaatkar_yol_ilk_makine",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    minYas: 18,
    yasakliEtiketler: ["zanaatkar_yolu_secildi"],
    gorsel: "⚙️",
    baslik: "İlk Makine",
    metin: "Atölyene yeni bir buharlı makine getirdiler; elinle yaptığın işi artık bu demir canavar da yapabiliyor. Bu makineye nasıl davrandığın, kariyerinin geri kalanını belirleyecek.",
    secenekler: [
      {
        metin: "Makineyi tam kapasiteyle kullan, üretimini onunla büyüt.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 14,
          uretim_kapasitesi_artis: 14,
          etiket_ekle: ["yol:zanaatkar:makineci", "zanaatkar_yolu_secildi"],
          mesaj: "Makineyle üretimin katlandı; atölyen şehrin en verimlilerinden biri oldu.",
          detay: "Demir çarklar, yorulmayan ellerdir.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: -4,
          etiket_ekle: ["yol:zanaatkar:makineci", "zanaatkar_yolu_secildi"],
          mesaj: "Makineyi doğru kullanamadın, bir arıza seni de yaraladı.",
          detay: "Yeni teknoloji öğrenmeden hız kazandırmaz.",
        },
      },
      {
        metin: "Makineyi bir kenara kaldır, el işçiliğinde ısrar et.",
        baseBasariSansi: 68,
        basariliSonuc: {
          un: 14,
          ahlak: 6,
          etiket_ekle: ["yol:zanaatkar:gelenekci", "zanaatkar_yolu_secildi"],
          mesaj: "El işçiliğinin kalitesi müşterileri etkiledi; 'gerçek usta' diye anılmaya başladın.",
          detay: "Bazı şeyler makineyle taklit edilemez.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -3,
          etiket_ekle: ["yol:zanaatkar:gelenekci", "zanaatkar_yolu_secildi"],
          mesaj: "Elle üretim rakiplerine yetişemedi; müşteri kaybettin.",
          detay: "Direnmenin de bir bedeli vardır.",
        },
      },
      {
        metin: "Diğer işçilerle birlikte makinenin koşullarına karşı örgütlen.",
        baseBasariSansi: 48,
        basariliSonuc: {
          dost_puani: 10,
          ahlak: 10,
          un: 6,
          etiket_ekle: ["yol:zanaatkar:sendikaci", "zanaatkar_yolu_secildi"],
          mesaj: "İşçiler arkanda toplandı; patron küçük ama gerçek tavizler verdi.",
          detay: "Birlikte konuşan sesler, tek başına daha güçlüdür.",
        },
        basarisizSonuc: {
          para: -8,
          un: -6,
          mutluluk: -4,
          etiket_ekle: ["yol:zanaatkar:sendikaci", "zanaatkar_yolu_secildi"],
          mesaj: "Girişim bastırıldı, birkaç arkadaşın işten atıldı; vicdanın rahat değil.",
          detay: "Her direniş kazanmaz, ama iz bırakır.",
        },
      },
      {
        metin: "Makineye yatırım yapıp kendi küçük atölyeni büyütmeye çalış.",
        baseBasariSansi: 52,
        maliyet: 18,
        basariliSonuc: {
          para: 24,
          uretim_kapasitesi_artis: 10,
          etiket_ekle: ["yol:zanaatkar:girisimci", "zanaatkar_yolu_secildi"],
          mesaj: "Yatırımın karşılığını hızla aldın; atölyen artık senden çok daha büyük.",
          detay: "Sermaye, sabırlı ellerde büyür.",
        },
        basarisizSonuc: {
          para: -18,
          mutluluk: -5,
          etiket_ekle: ["yol:zanaatkar:girisimci", "zanaatkar_yolu_secildi"],
          mesaj: "Yatırım geri tepti; borç yükün arttı.",
          detay: "Her girişim riski göze alır.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:makineci ---
  {
    id: "sd_zanaatkar_makineci_1",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:makineci"],
    gorsel: "⚙️",
    baslik: "İkinci Makine",
    metin: "Kazandığın parayla ikinci bir makine alma fırsatı çıktı; risk büyük ama potansiyel de öyle.",
    secenekler: [
      {
        metin: "Makineyi al, üretimi büyüt.",
        baseBasariSansi: 55,
        maliyet: 20,
        basariliSonuc: {
          para: 26,
          uretim_kapasitesi_artis: 12,
          mesaj: "İkinci makine üretimini ikiye katladı; atölyen artık bölgenin en büyüklerinden.",
          detay: "Büyümek cesaret ister.",
        },
        basarisizSonuc: {
          para: -20,
          mutluluk: -5,
          mesaj: "Makine sık sık bozuldu; yatırımın bir süre zarar getirdi.",
          detay: "Her makine kendi derdini de getirir.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_makineci_2",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:makineci"],
    gorsel: "⚙️",
    baslik: "İş Kazası",
    metin: "Makinelerden biri beklenmedik şekilde arızalandı; bir işçin yaralandı.",
    secenekler: [
      {
        metin: "Tedavi masraflarını üstlen, güvenliği artır.",
        baseBasariSansi: 72,
        maliyet: 12,
        basariliSonuc: {
          para: -12,
          ahlak: 8,
          dost_puani: 6,
          mesaj: "İşçilerin sana güveni arttı; atölyende sadakat kültürü oluştu.",
          detay: "Sorumluluğunu üstlenen bir usta, güven kazanır.",
        },
        basarisizSonuc: {
          ahlak: -6,
          un: -4,
          mesaj: "Yetersiz kaldın, işçi kızgın ayrıldı; adın bir süre lekelendi.",
          detay: "Her kaza bir sınav gibidir.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:gelenekci ---
  {
    id: "sd_zanaatkar_gelenekci_1",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:gelenekci"],
    gorsel: "⚙️",
    baslik: "El Emeğine Övgü",
    metin: "Bir gazeteci, makinelere direnen zanaatkârları yazmak için seni buldu.",
    secenekler: [
      {
        metin: "Röportaj ver, hikâyeni anlat.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 14,
          mutluluk: 4,
          mesaj: "Yazı yayınlandığında adın şehir dışında da duyuldu.",
          detay: "Bazen direnmek de bir hikâye olur.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Yazı seni gerici gösterdi; birkaç müşteri kaybettin.",
          detay: "Her ışık aynı açıdan gelmez.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_gelenekci_2",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:gelenekci"],
    gorsel: "⚙️",
    baslik: "Fabrika Rekabeti",
    metin: "Yakınına açılan büyük bir fabrika, senin fiyatlarının çok altında aynı ürünleri satmaya başladı.",
    secenekler: [
      {
        metin: "Kaliteni öne çıkararak nişe müşteriye odaklan.",
        baseBasariSansi: 62,
        basariliSonuc: {
          para: 8,
          un: 8,
          mesaj: "Zengin ve zevk sahibi müşteriler seni tercih etmeye devam etti.",
          detay: "Herkese değil, doğru kişiye satmak yeter.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -4,
          mesaj: "Müşterilerin çoğu fiyat karşısında fabrikaya kaydı.",
          detay: "Rekabet bazen acımasızdır.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:sendikaci ---
  {
    id: "sd_zanaatkar_sendikaci_1",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:sendikaci"],
    gorsel: "⚙️",
    baslik: "Grev Çağrısı",
    metin: "İşçiler daha iyi koşullar için grev yapmayı öneriyor; öncülüğü senden bekliyorlar.",
    secenekler: [
      {
        metin: "Grevi örgütle ve öncülük et.",
        baseBasariSansi: 45,
        basariliSonuc: {
          dost_puani: 14,
          un: 10,
          ahlak: 8,
          mesaj: "Grev başarılı oldu; işçiler arasında adın efsaneleşti.",
          detay: "Cesur bir duruş bazen kazanır.",
        },
        basarisizSonuc: {
          para: -14,
          un: -8,
          mutluluk: -6,
          mesaj: "Grev bastırıldı, geçici olarak işsiz kaldın.",
          detay: "Her mücadele kazanılmaz, ama unutulmaz.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_sendikaci_2",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:sendikaci"],
    gorsel: "⚙️",
    baslik: "Patronun Teklifi",
    metin: "Patron, sessiz kalman karşılığında sana özel bir zam teklif ediyor.",
    secenekler: [
      {
        metin: "Teklifi reddet, davanı sürdür.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 10,
          dost_puani: 8,
          mesaj: "Reddetmen işçiler arasında saygı kazandırdı.",
          detay: "Bazı fiyatlar ödenmeye değmez.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -4,
          mesaj: "Reddetmen patronu kızdırdı; küçük bir ceza kesildi.",
          detay: "İlkeli kalmanın bir bedeli olabilir.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:girisimci ---
  {
    id: "sd_zanaatkar_girisimci_1",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:girisimci"],
    gorsel: "⚙️",
    baslik: "Ortaklık Teklifi",
    metin: "Zengin bir tüccar, atölyene ortak olmayı teklif ediyor — sermaye karşılığında kontrolün bir kısmını istiyor.",
    secenekler: [
      {
        metin: "Ortaklığı kabul et, büyümeyi hızlandır.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 22,
          uretim_kapasitesi_artis: 8,
          mesaj: "Ortaklık atölyeni büyük bir işletmeye dönüştürdü.",
          detay: "Bazen büyümek için kontrolü paylaşmak gerekir.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -4,
          mesaj: "Ortağınla anlaşmazlığa düştün; işler karıştı.",
          detay: "Her ortaklık uyum ister.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_girisimci_2",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:girisimci"],
    gorsel: "⚙️",
    baslik: "Yeni Şube",
    metin: "Komşu kasabada bir şube açma fırsatın var; risk büyük ama pazar da geniş.",
    secenekler: [
      {
        metin: "Şubeyi aç.",
        baseBasariSansi: 50,
        maliyet: 22,
        basariliSonuc: {
          para: 30,
          un: 8,
          mesaj: "Şube kısa sürede kâr etmeye başladı; adın komşu kasabada da duyuldu.",
          detay: "Cesur adımlar bazen büyük getirir.",
        },
        basarisizSonuc: {
          para: -22,
          mutluluk: -5,
          mesaj: "Şube zarar etti, kapatmak zorunda kaldın.",
          detay: "Her genişleme başarıyla sonuçlanmaz.",
        },
      },
    ],
  },
];
