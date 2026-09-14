import type { OlayTanimi } from "./types";

/**
 * Sanayi Devrimi Asker'in dallanan kariyer yolu: "İlk Görev" (gameEngine.ts'te
 * zorla tetiklenir, bkz. senaryoUret) karakteri dört tavırdan birine kilitler
 * (yol:asker:sadik / reformcu / zalim / firari). Kilitlenen yolun etiketi bir
 * daha değişmez; her yol-özel olay gerekliEtiketler:["yol:asker:X"] taşıdığı
 * için karşı yolların içeriği otomatik olarak kapalı kalır.
 *
 * NOT: Orta Çağ Asker'in kariyer yolu (ortaCagAskerYollari.ts) da aynı
 * "yol:asker:" önekini kullanır — çakışma yoktur çünkü tüm olaylar `cag`
 * filtresiyle ayrılır; bir karakter yalnız bir çağda yaşar.
 */
export const OLAY_SANAYI_ASKER_YOLLARI: OlayTanimi[] = [
  {
    id: "sd_asker_yol_ilk_gorev",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    minYas: 18,
    yasakliEtiketler: ["sd_asker_yolu_secildi"],
    gorsel: "🎖️",
    baslik: "İlk Görev",
    metin: "Taburun, greve giden bir maden işçisi kasabasında 'düzeni sağlamak' için görevlendirildi. Yüzbaşın açlıktan bitkin işçilere ateş açma emri verebilir; senin ilk ciddi görevin bu gerginliğin ortasında geçiyor.",
    secenekler: [
      {
        metin: "Emri sorgusuzca uygula, disiplinini göster.",
        baseBasariSansi: 78,
        ipucu: "Üstlerinin gözünde güvenilir olursun, vicdanın bedel öder",
        basariliSonuc: {
          ahlak: -10,
          un: 8,
          etiket_ekle: ["yol:asker:sadik", "sd_asker_yolu_secildi"],
          mesaj: "Kalabalık emrini duyunca dağıldı, kan dökülmedi; yüzbaşın seni 'güvenilir asker' diye andı.",
          detay: "Bazı askerler düşünmeden itaat eder; vicdanları buna zamanla alışır ya da hiç alışmaz.",
        },
        basarisizSonuc: {
          ahlak: -12,
          saglik: -6,
          etiket_ekle: ["yol:asker:sadik", "sd_asker_yolu_secildi"],
          mesaj: "Kalabalık dağılmadı, arbede çıktı; emri uyguladın ama bir işçinin gözlerindeki korkuyu unutamadın.",
          detay: "İtaat bazen istemediğin sahnelerin de içinde bırakır seni.",
        },
      },
      {
        metin: "Yüzbaşına itiraz et, ateş emrine karşı çık.",
        baseBasariSansi: 45,
        ipucu: "Vicdanlı bir duruş, disiplin dosyana işlenir",
        basariliSonuc: {
          ahlak: 20,
          un: -5,
          dost_puani: 10,
          etiket_ekle: ["yol:asker:reformcu", "sd_asker_yolu_secildi"],
          mesaj: "İtirazın yüzbaşıyı durdurdu; kimse ateş etmedi, ama artık 'sorunlu asker' diye anılıyorsun.",
          detay: "Bazı itirazlar bir hayat kurtarır, bazıları bir kariyeri gölgeler; seninki ikisini de yaptı.",
        },
        basarisizSonuc: {
          ahlak: 15,
          saglik: -10,
          un: -8,
          etiket_ekle: ["yol:asker:reformcu", "sd_asker_yolu_secildi"],
          mesaj: "İtirazın duyulmadı, hatta seni tutuklamakla tehdit ettiler; yine de vicdanının sesini bastırmadın.",
          detay: "Bazı direnişler kaybedilir ama unutulmaz.",
        },
      },
      {
        metin: "Kalabalığı acımasızca dağıt, örnek ol.",
        baseBasariSansi: 55,
        ipucu: "Hızlı terfi umudu, kalıcı bir vicdan yükü",
        basariliSonuc: {
          un: 14,
          ahlak: -22,
          etiket_ekle: ["yol:asker:zalim", "sd_asker_yolu_secildi"],
          mesaj: "Sert müdahalen kalabalığı anında dağıttı; komuta kademesi 'kararlı' diye seni işaretledi.",
          detay: "Bazı zaferler sonradan geri dönüp seni rahatsız eder.",
        },
        basarisizSonuc: {
          ahlak: -25,
          saglik: -12,
          un: -10,
          etiket_ekle: ["yol:asker:zalim", "sd_asker_yolu_secildi"],
          mesaj: "Sertliğin işçileri daha da öfkelendirdi; arbede büyüdü ve sen de yara aldın.",
          detay: "Zorbalık her zaman itaat getirmez; bazen daha büyük bir öfke doğurur.",
        },
      },
      {
        metin: "Görevden kaç, silahını bırakıp gece karanlığında uzaklaş.",
        baseBasariSansi: 40,
        ipucu: "Vicdanını temiz tutar ama firarilik ağır bir bedel",
        basariliSonuc: {
          ahlak: 10,
          mutluluk: -6,
          etiket_ekle: ["yol:asker:firari", "sd_asker_yolu_secildi"],
          mesaj: "Kimse fark etmeden kayıplara karıştın; ama artık her an yakalanma korkusuyla yaşıyorsun.",
          detay: "Özgürlük bazen omzunda taşınan görünmez bir yüktür.",
        },
        basarisizSonuc: {
          ahlak: 6,
          saglik: -14,
          un: -16,
          suc_artis: 12,
          etiket_ekle: ["yol:asker:firari", "sd_asker_yolu_secildi"],
          mesaj: "Nöbetçiler seni yakaladı; dövülüp geri getirildin, dosyana 'firari' damgası vuruldu.",
          detay: "Kaçış girişimleri bazen daha ağır bir zincire dönüşür.",
        },
      },
    ],
  },
];
