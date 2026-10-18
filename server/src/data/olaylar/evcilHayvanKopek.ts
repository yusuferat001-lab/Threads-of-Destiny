import type { OlayTanimi } from "./types";

/** Köpek türüne özel evcil hayvan içeriği: 6 karşılaşma (sahiplenme fırsatı) + 12 devam (takip) olayı. */
export const OLAY_EVCIL_HAYVAN_KOPEK: OlayTanimi[] = [
  {
    id: "hayvan_karsilasma_kopek_oc_1",
    cag: "Orta Çağ",
    kategori: "sosyal",
    hayvanKarsilasmaTuru: "Köpek",
    yasakliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    minYas: 20,
    maxYas: 55,
    agirlik: 1,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sokaktaki Kavga",
    metin: "Gece eve dönerken iki serseri, yaralı iri bir köpeği köşeye sıkıştırmış.",
    secenekler: [
      {
        metin: "Serserileri kov, köpeği al.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: 3,
          ahlak: 3,
          saglik: -2,
          evcil_hayvan_edin: {
            tur: "Köpek"
          },
          mesaj: "Serseriler kaçtı; köpek ayağına yığıldı.",
          detay: "Kavga izi omzunda kaldı."
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -2,
          mesaj: "Sopayı yedin; köpek karanlığa kaçtı.",
          detay: "İyilik pahalıya patladı."
        }
      },
      {
        metin: "Görmezden gelip git.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: -3,
          mutluluk: -2,
          mesaj: "Yürüdün; arkandan gelen ulumayı duydun.",
          detay: "Sesi bir süre peşini bırakmadı."
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı."
        }
      }
    ]
  },
  {
    id: "hayvan_karsilasma_kopek_oc_2",
    cag: "Orta Çağ",
    kategori: "sosyal",
    hayvanKarsilasmaTuru: "Köpek",
    yasakliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    minYas: 20,
    maxYas: 55,
    agirlik: 1,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Pazardaki Hırsız",
    metin: "Bir köpek, ağzında koca bir et parçasıyla kasaptan kaçıp ayaklarının dibine saklandı.",
    secenekler: [
      {
        metin: "Eti öde, köpeği kurtar.",
        baseBasariSansi: 88,
        basariliSonuc: {
          para: -6,
          mutluluk: 3,
          ahlak: 2,
          evcil_hayvan_edin: {
            tur: "Köpek"
          },
          mesaj: "Parayı saydın; köpek etle birlikte seni izledi.",
          detay: "Kasap homurdanıp sustu."
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -2,
          mesaj: "Kasap parayı kaptı, köpek yine de kaçtı.",
          detay: "Hem para, hem dost gitti."
        }
      },
      {
        metin: "Köpeği kasaba teslim et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: -4,
          mutluluk: -2,
          mesaj: "Kasap köpeği sopayla kovalayarak uzaklaştırdı.",
          detay: "Çığlığını unutmak zor."
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı."
        }
      }
    ]
  },
  {
    id: "hayvan_karsilasma_kopek_oc_3",
    cag: "Orta Çağ",
    kategori: "sosyal",
    hayvanKarsilasmaTuru: "Köpek",
    yasakliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    minYas: 20,
    maxYas: 55,
    agirlik: 1,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sadık Nöbetçi",
    metin: "Orman yolunda, ölmüş sahibinin başında günlerdir bekleyen bitkin bir köpek var.",
    secenekler: [
      {
        metin: "Yiyecek verip güvenini kazan.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          ahlak: 4,
          para: -3,
          evcil_hayvan_edin: {
            tur: "Köpek"
          },
          mesaj: "Lokmayı yedi, sonra sana yaslandı.",
          detay: "Sahibini gömmene yardım ettin."
        },
        basarisizSonuc: {
          saglik: -3,
          mutluluk: -2,
          mesaj: "Yemeği koklayıp sahibinin başına döndü.",
          detay: "Isırığı elinde iz bıraktı."
        }
      },
      {
        metin: "Kendi haline bırak.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: -3,
          mutluluk: -3,
          mesaj: "Bakışları sırtında, yoluna devam ettin.",
          detay: "Sadakat acıtır."
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı."
        }
      }
    ]
  },
  {
    id: "hayvan_karsilasma_kopek_sd_1",
    cag: "Sanayi Devrimi",
    kategori: "sosyal",
    hayvanKarsilasmaTuru: "Köpek",
    yasakliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    minYas: 20,
    maxYas: 55,
    agirlik: 1,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Fabrika Kapısı",
    metin: "Gaz lambasının altında ustabaşı, makine dairesine sızan bitkin bir köpeği tekmeliyor.",
    secenekler: [
      {
        metin: "Ustabaşına karşı çık, köpeği al.",
        baseBasariSansi: 72,
        basariliSonuc: {
          mutluluk: 3,
          ahlak: 3,
          para: -3,
          evcil_hayvan_edin: {
            tur: "Köpek"
          },
          mesaj: "Ustabaşı dişini gıcırdattı; köpek koynuna sokuldu.",
          detay: "Bir günlük yevmiye kesildi."
        },
        basarisizSonuc: {
          para: -6,
          saglik: -3,
          mesaj: "Ustabaşı seni kapıya itti, köpek dumana karıştı.",
          detay: "Yevmiye ve gurur gitti."
        }
      },
      {
        metin: "Karışma, işine bak.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: -3,
          mutluluk: -2,
          mesaj: "Vardiyaya yetiştin; köpeğin sesi kesildi.",
          detay: "Makine uğultusu her şeyi örttü."
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı."
        }
      }
    ]
  },
  {
    id: "hayvan_karsilasma_kopek_sd_2",
    cag: "Sanayi Devrimi",
    kategori: "sosyal",
    hayvanKarsilasmaTuru: "Köpek",
    yasakliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    minYas: 20,
    maxYas: 55,
    agirlik: 1,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "İstasyon Peronu",
    metin: "Buharlı tren kalkarken bir köpek, sahibinin bindiği vagonun ardından raylarda koşuyor.",
    secenekler: [
      {
        metin: "Raydan kap, kucağına al.",
        baseBasariSansi: 78,
        basariliSonuc: {
          mutluluk: 3,
          ahlak: 3,
          saglik: -2,
          evcil_hayvan_edin: {
            tur: "Köpek"
          },
          mesaj: "Son anda kaptın; tren hemen arkandan geçti.",
          detay: "Kalbin hâlâ çarpıyor."
        },
        basarisizSonuc: {
          saglik: -5,
          mutluluk: -2,
          mesaj: "Köpek kolunu ısırıp raylarda kayboldu.",
          detay: "Korkmuş hayvan ne yapar bilinmez."
        }
      },
      {
        metin: "Memura haber ver, trene yetiş.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: -2,
          mutluluk: -2,
          mesaj: "Memur omuz silkti; trene bindin.",
          detay: "Cam kenarında vicdanın çalıştı."
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı."
        }
      }
    ]
  },
  {
    id: "hayvan_karsilasma_kopek_sd_3",
    cag: "Sanayi Devrimi",
    kategori: "sosyal",
    hayvanKarsilasmaTuru: "Köpek",
    yasakliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    minYas: 20,
    maxYas: 55,
    agirlik: 1,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rıhtımdaki Bekleyiş",
    metin: "Limanda, batan geminin kaptanını bekleyen bir köpek rıhtımdan günlerdir ayrılmıyor.",
    secenekler: [
      {
        metin: "Balık verip evine götür.",
        baseBasariSansi: 84,
        basariliSonuc: {
          mutluluk: 2,
          ahlak: 3,
          para: -3,
          evcil_hayvan_edin: {
            tur: "Köpek"
          },
          mesaj: "Balığı bitirdi; ağır adımlarla seni izledi.",
          detay: "Bir kez dönüp denize baktı."
        },
        basarisizSonuc: {
          para: -3,
          mutluluk: -2,
          mesaj: "Balığı yedi, ama rıhtımdan ayrılmadı.",
          detay: "Bekleyişin bir sonu yok."
        }
      },
      {
        metin: "Rıhtım işçilerine bırak.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: -3,
          mutluluk: -2,
          mesaj: "İşçiler omuz silkti; köpek denize baktı.",
          detay: "Gemi gelmeyecek."
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_gece_hirsiz",
    cag: "Orta Çağ",
    kategori: "savas",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Avludaki Gölge",
    metin: "Gece avluda {hayvan} homurdanıyor; çitin ardında bir gölge kıpırdıyor.",
    secenekler: [
      {
        metin: "{hayvan}'ı salıver.",
        baseBasariSansi: 62,
        basariliSonuc: {
          para: 8,
          mutluluk: -2,
          mesaj: "{hayvan} hırsızı kovaladı; paltosu geride kaldı.",
          detay: "Uykusuz ama güvenli bir gece."
        },
        basarisizSonuc: {
          saglik: -7,
          para: -8,
          mesaj: "Hırsız kaçarken seni de devirdi; ambar boşaldı.",
          detay: "{hayvan} sabaha kadar ulumuş."
        }
      },
      {
        metin: "İçeriden sopayla bekle.",
        baseBasariSansi: 88,
        basariliSonuc: {
          para: 2,
          mutluluk: -1,
          mesaj: "Gölge havlamayı duyup yok oldu.",
          detay: "Gece uzundu."
        },
        basarisizSonuc: {
          para: -6,
          mesaj: "Hırsız ahırdan bir torba kaptı.",
          detay: "Sopa biraz geç kalmış."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_koyun_bekcisi",
    cag: "Orta Çağ",
    kategori: "sosyal",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🐑",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kurt İzleri",
    metin: "Köyün koyunlarını güden {hayvan}, otlakta taze kurt izlerine burnunu dayadı.",
    secenekler: [
      {
        metin: "Gece nöbetine birlikte çık.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 12,
          un: 3,
          mutluluk: -2,
          mesaj: "Kurtlar {hayvan}'ın sesiyle geri çekildi.",
          detay: "Köylüler seni andı."
        },
        basarisizSonuc: {
          saglik: -6,
          para: -10,
          mutluluk: -2,
          mesaj: "Kurtlar iki koyun kaptı; {hayvan} yaralandı.",
          detay: "Soğuk bir nöbet."
        }
      },
      {
        metin: "Sürüyü ağıla çek.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 2,
          mesaj: "Sürü ağılda sağ salim kaldı.",
          detay: "Kurt izi sabaha kadar silindi."
        },
        basarisizSonuc: {
          para: -5,
          mutluluk: -1,
          mesaj: "Bir kuzu ağıldan çıkıp kayboldu.",
          detay: "Çit gevşekmiş."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_veba_sezgisi",
    cag: "Orta Çağ",
    kategori: "saglik",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ulumanın Anlamı",
    metin: "{hayvan}, komşunun kapısında ulumaya başladı; içeriden boğuk bir öksürük geliyor.",
    secenekler: [
      {
        metin: "İçeri gir, hastaya bak.",
        baseBasariSansi: 58,
        basariliSonuc: {
          ahlak: 5,
          mutluluk: -3,
          un: 2,
          mesaj: "Hastayı çorbayla iyileştirdin; sana geçmedi.",
          detay: "Komşun gözyaşlarıyla teşekkür etti."
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -3,
          mesaj: "Hasta iyileşti, ama ateşin sana geçti.",
          detay: "{hayvan} yanından ayrılmadı."
        }
      },
      {
        metin: "Uzak dur, {hayvan}'ı çek.",
        baseBasariSansi: 92,
        basariliSonuc: {
          saglik: 2,
          ahlak: -2,
          mutluluk: -2,
          mesaj: "Evine kapandın; hastalık kapına gelmedi.",
          detay: "Komşunun öksürüğü günlerce duyuldu."
        },
        basarisizSonuc: {
          saglik: -3,
          mutluluk: -2,
          mesaj: "Uzak durdun ama yine de içine bir sızı girdi.",
          detay: "Havada bir uğursuzluk var."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_tilki_avi",
    cag: "Orta Çağ",
    kategori: "sosyal",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🦊",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Tilki Avı",
    metin: "Soylunun tilki avında {hayvan} izi buldu; sürü ormana dalıyor.",
    secenekler: [
      {
        metin: "Sürüyle birlikte dal.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 15,
          un: 4,
          ahlak: -2,
          mesaj: "{hayvan} tilkiyi buldu; soylu keseyi uzattı.",
          detay: "Av ganimeti adil dağılmadı."
        },
        basarisizSonuc: {
          saglik: -6,
          para: -5,
          mutluluk: -2,
          evcil_hayvan_kaybet: true,
          mesaj: "Çalılıkta düştün; {hayvan} dağa kaybolup gitti.",
          detay: "Gün hüsranla bitti."
        }
      },
      {
        metin: "Yol kenarından izle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 1,
          mutluluk: -1,
          mesaj: "{hayvan} sürüyü uzaktan izledi; ikiniz sağ döndünüz.",
          detay: "Avdan payın yok."
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Soylu seni küçümseyen bir bakış attı.",
          detay: "Cesaretsizlik sayıldı."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_atolye_sabotaj",
    cag: "Sanayi Devrimi",
    kategori: "savas",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gece Sabotajı",
    metin: "Gece atölyede {hayvan} havlıyor; pencerede rakip bir sabotajcının silüeti var.",
    secenekler: [
      {
        metin: "Kapıyı aç, {hayvan}'ı salıver.",
        baseBasariSansi: 64,
        basariliSonuc: {
          para: 10,
          rakip_puani: -4,
          mutluluk: -2,
          mesaj: "Sabotajcı yarım kalmış makasıyla kaçtı.",
          detay: "Atölye sağlam kaldı."
        },
        basarisizSonuc: {
          saglik: -7,
          para: -10,
          mesaj: "Sabotajcı bir makineyi bozup kaçtı; sen yaralandın.",
          detay: "Tamir masrafı cabası."
        }
      },
      {
        metin: "Bekçiyi çağır.",
        baseBasariSansi: 88,
        basariliSonuc: {
          para: 2,
          mutluluk: -1,
          mesaj: "Bekçi gelince gölge kayboldu.",
          detay: "Yarım uyku, tam huzur."
        },
        basarisizSonuc: {
          para: -7,
          mesaj: "Bekçi geç kaldı; birkaç parça zarar gördü.",
          detay: "Zarar küçük ama can sıkıcı."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_kolera_kuyusu",
    cag: "Sanayi Devrimi",
    kategori: "saglik",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "💧",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Şüpheli Kuyu",
    metin: "Mahallede kolera söylentisi var; {hayvan} ortak kuyunun suyunu içmeyi reddediyor.",
    secenekler: [
      {
        metin: "Mahalleyi uyar, kuyuyu kapat.",
        baseBasariSansi: 62,
        basariliSonuc: {
          ahlak: 4,
          un: 3,
          mutluluk: -2,
          mesaj: "Kuyu kapandı; mahalle hastalıktan kurtuldu.",
          detay: "Bazıları sana çok kızdı."
        },
        basarisizSonuc: {
          un: -3,
          mutluluk: -3,
          para: -4,
          mesaj: "Komşular sana güldü; kuyu açık kaldı.",
          detay: "Uyarı kulak ardı edildi."
        }
      },
      {
        metin: "Kaynatılmış su kullan.",
        baseBasariSansi: 92,
        basariliSonuc: {
          saglik: 3,
          mutluluk: -1,
          mesaj: "Kaynamış su ikinizi de korudu.",
          detay: "Odun masrafı çıktı."
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -2,
          mesaj: "Hastalığa tutulmadın ama karnın bir hafta bozuldu.",
          detay: "Su yine de şüpheliymiş."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_sokak_kavgasi",
    cag: "Sanayi Devrimi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sokak Kavgası",
    metin: "Gaz lambası altında {hayvan}, mahallenin iri sokak köpeğiyle diş gösteriyor.",
    secenekler: [
      {
        metin: "Kavgaya izin ver.",
        baseBasariSansi: 58,
        basariliSonuc: {
          un: 4,
          mutluluk: -2,
          para: 5,
          ahlak: -2,
          mesaj: "{hayvan} kazandı; mahalle bahislerini topladı.",
          detay: "Kumar ahlakı lekeler."
        },
        basarisizSonuc: {
          para: -8,
          saglik: -3,
          mutluluk: -3,
          mesaj: "{hayvan} yenildi; veteriner masrafı çıktı.",
          detay: "Kavga kimseyi şereflendirmedi."
        }
      },
      {
        metin: "Tasmasından çek, uzaklaş.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -1,
          ahlak: 1,
          mesaj: "{hayvan} homurdanarak seni izledi.",
          detay: "Bir gün daha huzur."
        },
        basarisizSonuc: {
          saglik: -3,
          mutluluk: -2,
          mesaj: "{hayvan} ellerini ısırıp kendini kurtardı.",
          detay: "Kavga yine de olmuş."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_istasyon_yabanci",
    cag: "Sanayi Devrimi",
    kategori: "savas",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🚉",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "İstasyon Yabancısı",
    metin: "Peronda {hayvan}, valizlerin arasında dolaşan tuhaf bir yabancıya hırlıyor.",
    secenekler: [
      {
        metin: "Yabancıyı sorguya çek.",
        baseBasariSansi: 62,
        basariliSonuc: {
          para: 12,
          un: 3,
          mutluluk: -2,
          mesaj: "Yankesiciymiş; cüzdanı geri verip ödül aldın.",
          detay: "{hayvan} gururla kuyruk salladı."
        },
        basarisizSonuc: {
          saglik: -6,
          para: -7,
          mesaj: "Yabancı bavulunu fırlatıp seni yere serdi.",
          detay: "Kalabalık yalnız izledi."
        }
      },
      {
        metin: "Memura bildir, uzaklaş.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: -1,
          para: 2,
          mesaj: "Memur yabancıyı gözaltına aldı.",
          detay: "Sorun kimseye dokunmadı."
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Yabancı kaybolurken cebini boşaltmış.",
          detay: "{hayvan} haklıymış."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_yavrulama",
    kategori: "sosyal",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🐶",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yeni Yavrular",
    metin: "{hayvan} yuvasında yavruladı; küçük patiler ocağın yanında kıpır kıpır.",
    secenekler: [
      {
        metin: "Yavruları satmayı dene.",
        baseBasariSansi: 66,
        basariliSonuc: {
          para: 14,
          mutluluk: -2,
          ahlak: -1,
          mesaj: "Yavrular iyi evlere gitti; keseni doldurdu.",
          detay: "{hayvan} günlerce aradı."
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -3,
          mesaj: "Alıcı çıkmadı; yem masrafı yük oldu.",
          detay: "Evde fazla ağız var."
        }
      },
      {
        metin: "Yavruları ocağa yakın tut.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          para: -3,
          mesaj: "Evde şenlik var; {hayvan} huzurlu.",
          detay: "Mama kabı hep boş."
        },
        basarisizSonuc: {
          mutluluk: -2,
          para: -4,
          mesaj: "Bir yavru hastalandı; ilaç aldın.",
          detay: "{hayvan} sabaha kadar bekledi."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_yaslanma",
    kategori: "sosyal",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🐕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yaşlı Dost",
    metin: "{hayvan} artık yavaş yürüyor, gözleri bulanık; eski neşesinden eser kalmadı.",
    secenekler: [
      {
        metin: "Son bir uzun yürüyüşe çık.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 3,
          saglik: 2,
          un: 1,
          mesaj: "{hayvan} eski patikada yeniden koştu.",
          detay: "Gözlerinde parıltı vardı."
        },
        basarisizSonuc: {
          mutluluk: -5,
          saglik: -2,
          evcil_hayvan_kaybet: true,
          mesaj: "{hayvan} yolda yığıldı; bir daha kalkmadı.",
          detay: "Sessiz bir veda."
        }
      },
      {
        metin: "Ocak başında dinlendir.",
        baseBasariSansi: 92,
        basariliSonuc: {
          mutluluk: 1,
          para: -2,
          mesaj: "{hayvan} ayaklarına yatıp uyuyakaldı.",
          detay: "Yıllar ağır geçti."
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "{hayvan} gece huzursuz ağladı.",
          detay: "Çaresizlik acı."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_kayip_cocuk",
    kategori: "sosyal",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🔎",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kayıp Çocuk",
    metin: "Komşunun çocuğu akşama kadar dönmedi; {hayvan} yerdeki bir izi koklayıp ormana yöneldi.",
    secenekler: [
      {
        metin: "{hayvan}'ın peşinden git.",
        baseBasariSansi: 66,
        basariliSonuc: {
          ahlak: 5,
          un: 4,
          mutluluk: -2,
          saglik: -2,
          mesaj: "Çocuğu bir çukurda buldunuz; köy sizi alkışladı.",
          detay: "Gece yürüyüşü yorucuydu."
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -4,
          mesaj: "İzi kaybettiniz; sabaha kadar aradınız.",
          detay: "Çocuk başkaları tarafından bulundu."
        }
      },
      {
        metin: "Köylüleri toplayıp ara.",
        baseBasariSansi: 88,
        basariliSonuc: {
          ahlak: 2,
          un: 1,
          mutluluk: -1,
          mesaj: "Kalabalık çocuğu birlikte buldu.",
          detay: "{hayvan} yine de önde yürüdü."
        },
        basarisizSonuc: {
          mutluluk: -3,
          ahlak: -1,
          mesaj: "Geç kalındı; çocuk çok üşümüştü.",
          detay: "Zaman değerliymiş."
        }
      }
    ]
  },
  {
    id: "evcil_hayvan_kopek_hasta_bakim",
    kategori: "saglik",
    gerekliEtiketler: [
      "evcil_hayvan_tur:Köpek"
    ],
    hayvanTuru: "Köpek",
    agirlik: 0.7,
    gorsel: "🩹",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hasta Köpek",
    metin: "{hayvan} iki gündür yem yemiyor, titriyor; gözleri sana yalvarır gibi.",
    secenekler: [
      {
        metin: "Şifacıya götür, pahalı ilaç al.",
        baseBasariSansi: 74,
        basariliSonuc: {
          para: -10,
          mutluluk: 2,
          ahlak: 2,
          mesaj: "İlaç tuttu; {hayvan} yeniden kuyruk salladı.",
          detay: "Cebin hafifledi, kalbin değil."
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -4,
          mesaj: "İlaç para etmedi; {hayvan} bitkin kaldı.",
          detay: "Bazı hastalıklar inatçı."
        }
      },
      {
        metin: "Evde ot kaynatıp bak.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          saglik: -1,
          mesaj: "{hayvan} bir hafta içinde toparlandı.",
          detay: "Uykusuz geceler."
        },
        basarisizSonuc: {
          mutluluk: -3,
          saglik: -2,
          mesaj: "Düzelme yok; geceleri başında sabahladın.",
          detay: "Çaresizlik tüketir."
        }
      }
    ]
  }
];
