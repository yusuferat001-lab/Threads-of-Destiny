import type { OlayTanimi } from "./types";

export const OLAY_ESYA_VE_GIZEM: OlayTanimi[] = [
  {
    id: "kg_antika_harita",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.6,
    gorsel: "🎨",
    baslik: "Eskicinin Çöpü",
    metin: "Eskici tezgâhında çamurlu bir parşömen buldun; altında harita çizgileri var gibi.",
    secenekler: [
      {
        metin: "Geceleri harcayıp haritayı onar.",
        baseBasariSansi: 45,
        basariliSonuc: {
          saglik: -5,
          mutluluk: 12,
          etiket_ekle: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Gözlerin bozuldu ama başardın: unutulmuş bir geçidin haritası!",
        },
        basarisizSonuc: {
          mutluluk: -5,
          saglik: -5,
          mesaj: "Temizlerken parşömen yırtıldı; yorgun ve eli boşsun.",
        },
      },
      {
        metin: "Uğraşma, asilzadeye 'antika' diye sat.",
        baseBasariSansi: 75,
        basariliSonuc: {
          suc_sinifi: "kucuk",
          para: 20,
          ahlak: -10,
          mesaj: "Parşömeni antika diye sattın; cebin doldu, vicdanın sızladı.",
        },
        basarisizSonuc: {
          suc_sinifi: "orta",
          un: -10,
          ahlak: -5,
          mesaj: "Asilzade çöp olduğunu anladı, seni kapı dışarı etti.",
        },
      },
    ],
  },
  {
    id: "komik_yanlis_cenaze",
    kategori: "sosyal",
    ton: "hafif",
    minYas: 16,
    agirlik: 0.9,
    gorsel: "😅",
    baslik: "Yanlış Kapı",
    metin: "Cenazeye giderken yanlış kapıyı çaldın; tanımadığın ailenin yasındasın ve herkes başsağlığı için sana bakıyor.",
    secenekler: [
      {
        metin: "Hemen itiraf et, özür dile.",
        baseBasariSansi: 85,
        basariliSonuc: {
          dost_puani: 4,
          mutluluk: 6,
          mesaj: "İtirafın aileyi güldürdü; yasta sıcak bir anı oldun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kimse gülmedi; 'saygısız' diye kapı dışarı edildin.",
        },
      },
      {
        metin: "Fark etmemiş gibi ağlayıp sıvış.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Gözyaşı silip sessizce süzüldün; yıllarca gülerek anlatacaksın.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          un: -2,
          mesaj: "Çıkışta tabuta çarptın! Dehşetli bakışlar arasında kaçtın.",
        },
      },
      {
        metin: "Karmaşada ölüden bir hatıra çal.",
        baseBasariSansi: 50,
        maxAhlak: 40,
        basariliSonuc: {
          suc_sinifi: "kucuk",
          para: 25,
          ahlak: -15,
          etiket_ekle: [
            "envanter:olunun_yuzugu",
          ],
          mesaj: "Ölünün altın yüzüğünü cebe attın. Acımasız ama kârlı.",
        },
        basarisizSonuc: {
          suc_sinifi: "orta",
          un: -25,
          ahlak: -15,
          mesaj: "Dul eş seni gördü! 'Hırsız!' çığlıklarıyla dayak yedin.",
        },
      },
    ],
  },
  {
    id: "komik_seyyar_satici",
    kategori: "ticaret",
    ton: "hafif",
    agirlik: 0.5,
    gorsel: "🧪",
    baslik: "Mucize İksir",
    metin: "Gezgin satıcı, parlayan mor sıvıyı 'ölüyü diriltir, her derde deva' diye bağırıyor. Kimse inanmıyor ama sıvı cezbedici.",
    secenekler: [
      {
        metin: "Güvenme, uzaklaş.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sağduyulu davrandın, paran cebinde kaldı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Meraklandın ama kendini tuttun; biraz pişmansın.",
        },
      },
      {
        metin: "Altınları dök, bir şişe al.",
        baseBasariSansi: 40,
        maliyet: 15,
        basariliSonuc: {
          para: -10,
          etiket_ekle: [
            "envanter:sirli_iksir",
          ],
          mesaj: "İksiri aldın; şişe garip biçimde ısınıyor.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -3,
          mesaj: "Sıvı tatsız keçi sütü çıktı! Satıcı çoktan tüymüştü.",
        },
      },
      {
        metin: "Kalabalıkta bir şişe çal.",
        baseBasariSansi: 60,
        maxAhlak: 35,
        basariliSonuc: {
          ahlak: -10,
          etiket_ekle: [
            "envanter:sirli_iksir",
          ],
          mesaj: "Şişeyi cübbene sakladın; paran da iksirin de sende.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -10,
          para: -10,
          mesaj: "Yakalandın; muhafızdan kurtulmak için tüm paranı verdin.",
        },
      },
    ],
  },
  {
    id: "gizem_ejderha_tilsimi",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.2,
    gorsel: "🐉",
    baslik: "Doğulu Kör Büyücü",
    metin: "Gözleri bembeyaz bir tüccarın tezgâhında tek eşya var: kan kırmızısı Ejderha Tılsımı. 'Kaderi kanla yazılanlar taşır.'",
    secenekler: [
      {
        metin: "Uçuk bedeli öde, tılsımı al.",
        baseBasariSansi: 80,
        maliyet: 50,
        basariliSonuc: {
          para: -44,
          etiket_ekle: [
            "envanter:ejderha_tilsimi",
          ],
          mesaj: "Tılsımı taktın; göğsünde sıcak bir güç var.",
        },
        basarisizSonuc: {
          para: -50,
          saglik: -10,
          mesaj: "Gece kabuslarla uyandın; bedenin bu enerjiyi reddediyor.",
        },
      },
      {
        metin: "Körlüğünden yararlan, tılsımı çal.",
        baseBasariSansi: 40,
        maxAhlak: 35,
        basariliSonuc: {
          ahlak: -25,
          etiket_ekle: [
            "envanter:ejderha_tilsimi",
            "lanetli_ruh",
          ],
          mesaj: "Tılsımla kaçtın; 'Ruhunla ödeyeceksin!' diye bağırdı.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          mesaj: "Kör adam bileğini yakaladı, yandın. Çığlıkla kaçtın.",
        },
      },
      {
        metin: "Büyü bana göre değil, uzaklaş.",
        baseBasariSansi: 92,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Mistik şeylerin sonu kötü biter deyip eve döndün.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Tılsım aklından çıkmadı. 'Ya gerçekten efsaneyse?'",
          detay: "Kaçan fırsat içte uzun kanar.",
        },
      },
    ],
  },
  {
    id: "gizem_kara_kilic",
    gizemli: true,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    agirlik: 0.2,
    gorsel: "🗡️",
    baslik: "Mezarlıktaki Kılıç",
    metin: "Gece ormanda devriyedeyken eski bir mezarda saplı kara bir kılıç buldun. Kabzası elini çağırıyor.",
    secenekler: [
      {
        metin: "Kılıcı mezardan çek.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 15,
          ahlak: -15,
          mutluluk: -10,
          etiket_ekle: [
            "envanter:kara_kilic",
          ],
          mesaj: "Yenilmez oldun ama kılıcın fısıltıları susmuyor.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 5,
          mesaj: "Kara zehir yayıldı; günlerce komada yattın.",
        },
      },
      {
        metin: "Dokunma, dua edip ayrıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Saygıyla eğilip uzaklaştın. Doğaüstüne bulaşmamak en iyisi.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kılıcı bıraktın ama karanlık cazibe günlerce rüyanda.",
        },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu",
    gizemli: true,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    agirlik: 0.2,
    gorsel: "🪽",
    baslik: "Ölmek Üzere Olan Hacı",
    metin: "Kilise/Cami kapısında yaralı bir hacı yığıldı; avucuna beyaz bir tüy bırakıp 'Melek verdi, kötülüğü kovar' deyip öldü.",
    secenekler: [
      {
        metin: "Tüyü kutsal emanet olarak sakla.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 20,
          etiket_ekle: [
            "envanter:melek_tuyu",
          ],
          mesaj: "Tüyün sıcaklığı sana huzur veriyor. Gerçek lütuf.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Cemaat seni batıl inançlı bulup ayıpladı.",
        },
      },
      {
        metin: "Asilzadeye 'melek tüyü' diye sat.",
        baseBasariSansi: 65,
        maxAhlak: 45,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 80,
          ahlak: -30,
          mesaj: "Asilzade hikâyeye bayılıp servet ödedi; ruhunu satmış gibisin.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          un: -30,
          ahlak: -20,
          mesaj: "Asilzade sahtekârlıkla suçlayıp seni dövdürdü; tüy uçtu.",
        },
      },
      {
        metin: "Sapkınlık! Tüyü yak, adamı göm.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          un: 5,
          mesaj: "Tüyü yaktın; yanarken bir çığlık duyar gibi oldun.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Tüyü yaktın ama 'hata mı ettim' hissi kemiriyor.",
        },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu_mucize",
    kategori: "din",
    gerekliEtiketler: [
      "envanter:melek_tuyu",
    ],
    gizemli: true,
    agirlik: 0.6,
    gorsel: "🪽",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Beklenmedik Bir Şifa",
    metin: "Yaşlı bir kadın nefes alamayıp yığıldı, dudakları mosmor. Cebindeki tüyün sıcaklığını hissettin; belki hurafe, belki şans.",
    secenekler: [
      {
        metin: "Tüyü alnına değdir, dua et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 15,
          un: 20,
          mutluluk: 10,
          mesaj: "Kadının nefesi düzeldi, gözlerini açtı! 'Mucize eli' oldun.",
          detay: "Hacının sözleri yalan değilmiş.",
        },
        basarisizSonuc: {
          un: -10,
          mutluluk: -10,
          mesaj: "Tüy sessiz kaldı; kadın can verdi, cemaat seni suçladı.",
          detay: "Bazı efsaneler efsane kalır.",
        },
      },
      {
        metin: "Karışma; ölüm de takdirdir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Elini tutup dua ettin; kadın huzurla öldü.",
          detay: "Bazen kabullenmek de erdemdir.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Kadın son kez sana baktı. 'Ya işe yarasaydı?' diyeceksin.",
        },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu_calinti",
    kategori: "din",
    gerekliEtiketler: [
      "envanter:melek_tuyu",
    ],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🕊️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Tüyün Peşindeki Adam",
    metin: "Gece yarısı biri odana süzülüp tüyün saklı sandığa uzanıyor: 'Hacı amcamdı, tüyde benim de hakkım var!'",
    secenekler: [
      {
        metin: "Bağır, adamı kov.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: 5,
          un: 5,
          mesaj: "Komşular koştu, adam kaçtı. Tüy senin ama gecen mahvoldu.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Adam seni itip kaçtı; tüyü kapmadan pencereden atladı.",
          detay: "Bazı geceler korkuyla anılır.",
        },
      },
      {
        metin: "Dinle, tüyü paylaşmayı öner.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 5,
          mesaj: "Sabaha kadar konuşup ağladınız; tüyü paylaştınız, hafifledin.",
        },
        basarisizSonuc: {
          ahlak: -5,
          para: -10,
          mesaj: "Adam inanmadı, kavga çıktı; paranı verip yatıştırdın.",
        },
      },
      {
        metin: "Tüyü kavra, asla vermem de.",
        baseBasariSansi: 60,
        maxAhlak: 60,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Adam çekildi. Tüy senin ama o bakışı unutamazsın.",
        },
        basarisizSonuc: {
          saglik: -15,
          ahlak: -10,
          mesaj: "Boğuştunuz, ikiniz de yaralandı; tüy yere düştü.",
        },
      },
    ],
  },
  {
    id: "ruh_karanlik_fisiltilar",
    kategori: "sosyal",
    ton: "agir",
    maxMutluluk: 25,
    minYas: 14,
    gorsel: "🌑",
    baslik: "Karanlığın Fısıltıları",
    metin: "İçindeki karanlık büyüyor. Geceleri olmayan sesler duyuyor, gölgeler görüyorsun. Bir şey seni ele geçirmeye çalışıyor gibi.",
    secenekler: [
      {
        metin: "Kılıcın fısıltısına uy.",
        baseBasariSansi: 78,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        basariliSonuc: {
          mutluluk: 12,
          ahlak: -40,
          un: 20,
          mesaj: "Sesler kılıçtandı! Karanlıkla birleştin, artık korkmuyorsun.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Kılıç seni delirtecekti; son anda fırlatıp kurtuldun.",
        },
      },
      {
        metin: "Toparlan, hekimden yardım iste.",
        baseBasariSansi: 55,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          mutluluk: 12,
          saglik: 5,
          mesaj: "Hekimin afyonlu şurupları rahatlattı; gölgeler dağıldı.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: -8,
          mutluluk: -5,
          mesaj: "Hekim seni deli sandı; ilaçlar mideni bozdu.",
        },
      },
      {
        metin: "Odana kapanıp tek başına diren.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kapıyı kilitleyip günlerce bekledin; bir süre haklı çıktın.",
        },
        basarisizSonuc: {
          saglik: -12,
          un: -15,
          mesaj: "Yarı çıplak sokakta bağırdın; itibarın yerle bir.",
        },
      },
    ],
  },
  {
    id: "cocuk_hastalik_baslangic",
    kategori: "saglik",
    gerekliEtiketler: [
      "cocuk_var",
    ],
    gorsel: "🤒",
    baslik: "Yanan Ateş",
    metin: "Evladın ateşler içinde, zor nefes alıyor. Kasabadaki tek yetenekli hekim çok altın istiyor.",
    secenekler: [
      {
        metin: "Gizli İksiri kullan!",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:sirli_iksir",
        ],
        basariliSonuc: {
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mutluluk: 12,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Mucizevi Şifa",
            tur: "gecici",
            kalan_tur: 1,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "İksirle ateş düştü, çocuk gülümsedi! Satıcı haklıymış.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Hekimi çağır, birikimini ver.",
        baseBasariSansi: 70,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Hekim Gözetiminde",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "Hekim tedaviye başladı; birkaç güne belli olur.",
        },
        basarisizSonuc: {
          para: -25,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Hekim Gözetiminde",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:kotu",
          },
          mesaj: "Hekim başını salladı: 'Durum kritik, dua edin.'",
        },
      },
      {
        metin: "Param yok, kendim bakarım.",
        baseBasariSansi: 30,
        basariliSonuc: {
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Ev Tedavisi",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "Gece gündüz başında bekleyip ateşini düşürdün.",
        },
        basarisizSonuc: {
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Ev Tedavisi",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:kotu",
          },
          mesaj: "Ateş düşmedi, çocuk havale geçirmeye başladı.",
        },
      },
    ],
  },
  {
    id: "dunya_savas_ilani",
    kategori: "siyaset",
    // Asker zaten orduda olduğu için "katılmak ister misin?" diye sorulmaz;
    // onun için ayrı, doğrudan seferberlik varyantı var (dunya_savas_ilani_asker).
    meslekler: [
      "Tüccar",
      "Din Adamı",
    ],
    gerekliUlke: {
      savasta: false,
    },
    maxYas: 55,
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Savaş Çanları",
    metin: "{yil} yılı. {bolge} ile {komsu} arasında büyük savaş çıktı! Sınır köyleri yanıyor; her haneden bir silahlı orduya katılacak.",
    secenekler: [
      {
        metin: "Kara Kılıçla cephenin en önüne git!",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        basariliSonuc: {
          un: 35,
          para: 30,
          ahlak: -30,
          saglik: 5,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "cephe_gordu",
          ],
          mesaj: "Düşman kaçtı, savaş tanrısı sayıldın; gece fısıltılar sürüyor.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Gönüllü yazıl, vatan için savaş.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -8,
          saglik: -12,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "cephe_gordu",
          ],
          mesaj: "Aylarca siperde kaldın; sağ döndün, madalya ve ganimetle.",
        },
        basarisizSonuc: {
          saglik: -45,
          un: 15,
          olum_sansi: 20,
          ulke_etkisi: {
            savasta: true,
          },
          durum_ekle: {
            id: "savas_yarasi",
            ad: "Gazi Yarası",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Top mermisi yanına düştü; eski gücün dönmeyecek.",
        },
      },
      {
        metin: "Çürük raporu al, savaştan kaç.",
        baseBasariSansi: 60,
        maliyet: 35,
        basariliSonuc: {
          para: -35,
          ahlak: -25,
          un: -20,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "askerlikten_kacti",
          ],
          mesaj: "Rüşvetle evde kaldın; itibarın yerle bir.",
        },
        basarisizSonuc: {
          para: -35,
          un: -30,
          ahlak: -20,
          ulke_etkisi: {
            savasta: true,
          },
          mesaj: "Rüşvet ortaya çıktı! Ön safa sürüldün, onur ve para gitti.",
        },
      },
    ],
  },
  {
    id: "dunya_savas_ilani_asker",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliUlke: {
      savasta: false,
    },
    maxYas: 55,
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Seferberlik",
    metin: "{yil} yılı. {bolge} ile {komsu} arasında büyük savaş çıktı! Zaten ordudasın; birliğin cepheye çağrılıyor. Soru, nasıl bir rol alacağın.",
    secenekler: [
      {
        metin: "Kara Kılıçla cephenin en önüne git!",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        basariliSonuc: {
          un: 35,
          para: 30,
          ahlak: -30,
          saglik: 5,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "cephe_gordu",
          ],
          mesaj: "Düşman kaçtı, savaş tanrısı sayıldın; gece fısıltılar sürüyor.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "En öndeki hücum birliğine katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -8,
          saglik: -12,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "cephe_gordu",
          ],
          mesaj: "Aylarca siperde kaldın; sağ döndün, madalya ve ganimetle.",
        },
        basarisizSonuc: {
          saglik: -45,
          un: 15,
          olum_sansi: 20,
          ulke_etkisi: {
            savasta: true,
          },
          durum_ekle: {
            id: "savas_yarasi",
            ad: "Gazi Yarası",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Top mermisi yanına düştü; eski gücün dönmeyecek.",
        },
      },
      {
        metin: "Geride lojistik hattında görev al.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 5,
          para: 8,
          saglik: -5,
          ulke_etkisi: {
            savasta: true,
          },
          mesaj: "Erzak ve mühimmat akışını sağladın; ordu sensiz aç kalırdı.",
          detay: "Kahramanlık hep en önde olmaz.",
        },
        basarisizSonuc: {
          saglik: -15,
          un: -8,
          ulke_etkisi: {
            savasta: true,
          },
          mesaj: "Düşman akını lojistik hattına ulaştı; yaralı kurtuldun.",
          detay: "Geride kalmak da tehlikesiz değil.",
        },
      },
    ],
  },
  {
    id: "dunya_salgin_baslar",
    kategori: "saglik",
    gerekliUlke: {
      vebada: false,
    },
    gorsel: "☠️",
    agirlik: 0.7,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kara Ölüm Kapıda",
    metin: "Son gemiyle şehre görünmez bir katil girdi. İnsanlar sokakta kan kusarak ölüyor. Şehir kapıları kapanmak üzere.",
    secenekler: [
      {
        metin: "Sırlı İksiri ailenle iç!",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:sirli_iksir",
        ],
        basariliSonuc: {
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          etiket_ekle: [
            "tibbi:veba_bagisik",
          ],
          mutluluk: 12,
          saglik: 15,
          un: 10,
          ulke_etkisi: {
            vebada: true,
          },
          mesaj: "İksiri içtiniz; herkes yıkılırken size sinek bile dokunmadı!",
          detay: "Mucizenin ta kendisi oldun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Her şeyi bırak, aileyle kırsala kaç.",
        baseBasariSansi: 70,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: -15,
          ulke_etkisi: {
            vebada: true,
          },
          maas_carpani: 0.8,
          mesaj: "Kapılar tutulmadan ormana kaçtınız; sefil ama hayattasınız.",
          detay: "Döndüğünde dükkânın/işin başkasında olacak.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -25,
          olum_sansi: 15,
          ulke_etkisi: {
            vebada: true,
          },
          durum_ekle: {
            id: "salgin_hastaligi",
            ad: "Veba Pençesi",
            tur: "gecici",
            kalan_tur: 2,
            tur_basi_saglik: -15,
          },
          mesaj: "Kervandan sana bulaştı; ormanda ateşler içindesin.",
        },
      },
      {
        metin: "Şehirde kal, ilaç ve erzak karaborsası yap.",
        baseBasariSansi: 50,
        maliyet: 15,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 70,
          ahlak: -35,
          un: 15,
          unvan_kazan: "Veba Tüccarı",
          ulke_etkisi: {
            vebada: true,
          },
          mesaj: "İlaç ve suyu altına sattın; ölüm üstüne servet kurdun.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          saglik: -35,
          para: -15,
          olum_sansi: 25,
          ulke_etkisi: {
            vebada: true,
          },
          durum_ekle: {
            id: "salgin_hastaligi",
            ad: "Veba Pençesi",
            tur: "gecici",
            kalan_tur: 3,
            tur_basi_saglik: -15,
          },
          mesaj: "Bir müşterinin kusmuğu yüzüne geldi; altın kurtarmadı.",
        },
      },
    ],
  },
  {
    id: "dunya_salgin_ortasinda",
    kategori: "saglik",
    gerekliUlke: {
      vebada: true,
    },
    gorsel: "☠️",
    baslik: "Vebanın Tam Ortası",
    metin: "Sokaklarda ceset arabaları dolaşıyor. Mahalle, içinde can çekişen çocuk olan komşu evi yakmaya hazırlanıyor.",
    secenekler: [
      {
        metin: "Manastır Kedisini eve sal.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "esya:veba_koruyucu_kedi",
        ],
        basariliSonuc: {
          mutluluk: 12,
          saglik: 10,
          mesaj: "Kedi eve hasta fare yaklaştırmadı. Ailenin koruyucusu!",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Kalabalığa karşı çık, çocuğu kurtar!",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 30,
          ahlak: 35,
          saglik: -10,
          etiket_ekle: [
            "salgin_kahramani",
          ],
          mesaj: "Çocuğu alevlerden çıkardın; şehir seni peygamber sayıyor.",
          detay: "Kurtardığın can sana ömür boyu minnettar.",
        },
        basarisizSonuc: {
          saglik: -35,
          ahlak: 25,
          olum_sansi: 25,
          durum_ekle: {
            id: "salgin_hastaligi",
            ad: "Veba Pençesi",
            tur: "gecici",
            kalan_tur: 3,
            tur_basi_saglik: -15,
          },
          mesaj: "Çocuğu çıkardın ama veba sana da geçti.",
        },
      },
      {
        metin: "Kapıları çivile, pencereleri tahtala.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 10,
          ahlak: -25,
          un: -15,
          mesaj: "Çığlıklar dinene dek kulak tıkadın; hayatta kaldın.",
          detay: "O geceyi hiç unutmayacaksın.",
        },
        basarisizSonuc: {
          saglik: -20,
          ahlak: -20,
          olum_sansi: 15,
          durum_ekle: {
            id: "salgin_hastaligi",
            ad: "Veba Pençesi",
            tur: "gecici",
            kalan_tur: 2,
            tur_basi_saglik: -15,
          },
          mesaj: "Evi mezar yaptın ama veba suya karışmıştı; ateşler içindesin.",
        },
      },
    ],
  },
  {
    id: "ekonomi_kriz_donemi_v2",
    kategori: "ticaret",
    gerekliUlke: {
      ekonomi: "kotu",
    },
    gorsel: "📉",
    baslik: "Krizin Pençesinde",
    metin: "Ekonomi çöktü, para toprak bile etmiyor. {es} ve çocukların aç. Dükkân için paraya, ailen için ekmeğe ihtiyacın var.",
    secenekler: [
      {
        metin: "Son paramla karaborsadan yiyecek al.",
        baseBasariSansi: 85,
        gerekliEtiketler: [
          "cocuk_var",
        ],
        kilitAciklamasi: "Çocuğun olmalı.",
        basariliSonuc: {
          para: -40,
          saglik: 10,
          mutluluk: 12,
          ahlak: 20,
          un: -15,
          mesaj: "Dükkânı kapattın ama çocukların doyasıya ekmek yedi.",
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -15,
          saglik: -10,
          mesaj: "Karaborsacı çürük mal verdi; iş battı, çocuklar hastalandı.",
        },
      },
      {
        metin: "İşi kurtar, aile dişini sıksın.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 60,
          un: 15,
          ahlak: -30,
          mutluluk: -25,
          mesaj: "Krizden imparatorluk kurdun; çocukların bakışı silinmez.",
        },
        basarisizSonuc: {
          para: -40,
          saglik: -20,
          mutluluk: -30,
          mesaj: "Kriz seni de yuttu: dükkân battı, aile açlıktan kırıldı.",
        },
      },
      {
        metin: "Ölü Yüzüğü tefeciye rehin ver.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:olunun_yuzugu",
        ],
        basariliSonuc: {
          ahlak: -3,
          mutluluk: -3,
          para: 20,
          etiket_sil: [
            "envanter:olunun_yuzugu",
          ],
          mesaj: "Tefeci yüzüğe bakıp borç yazmadı; aile ve iş kurtuldu!",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "gizem_golge_pazari",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.2,
    gorsel: "🌒",
    baslik: "Var Olmayan Sokak",
    metin: "Sisli, haritasız bir sokakta ruh ve sır satılıyor. Maskeli tüccar siyah sikke uzatıyor: 'Bedeli anıların.'",
    secenekler: [
      {
        metin: "Mutlu anılarını verip sikkeyi al.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -30,
          ahlak: -15,
          etiket_ekle: [
            "envanter:golge_sikke",
          ],
          mesaj: "Anıların silindi; elinde buz gibi bir Gölge Sikke var.",
        },
        basarisizSonuc: {
          mutluluk: -30,
          ahlak: -10,
          mesaj: "Tüccar anıları aldı, sikke sis gibi dağıldı, sokak yok oldu.",
          detay: "Bazı pazarlar sadece almak içindir.",
        },
      },
      {
        metin: "Ruhum satılık değil! Kaç.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Koştun; sokak yerinde taş duvar kaldı. Ruhun güvende.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          saglik: -10,
          mesaj: "Sisten kollar tırmaladı; o maskeli yüz peşini bırakmayacak.",
        },
      },
    ],
  },
  {
    id: "gizem_fisildayan_tas",
    kategori: "ticaret",
    gizemli: true,
    agirlik: 0.25,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Düz, Gri Bir Taş",
    metin: "Yol kenarında yaşlı bir kadın tek eşya satıyor: avuç içi büyüklüğünde gri bir taş. 'Ucuz, ama dinlemesini bil. O da seni dinliyor.'",
    secenekler: [
      {
        metin: "Birkaç bakıra taşı satın al.",
        baseBasariSansi: 95,
        maliyet: 5,
        basariliSonuc: {
          para: -3,
          etiket_ekle: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Taş tam avuç içi; cebinde hafif bir uğultu duydun.",
          detay: "Belki hayaldir, belki değil.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Taş sıradan çakıl çıktı, kadın parayı alıp kayboldu.",
        },
      },
      {
        metin: "Fırsatı kolla, taşı çal.",
        baseBasariSansi: 45,
        maxAhlak: 40,
        basariliSonuc: {
          ahlak: -10,
          etiket_ekle: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Taşı kapıp kaçtın; arkandan 'O seni bulur!' diye bağırdı.",
          detay: "Elinde şimdiden hafif bir uğultu var.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -5,
          mesaj: "Kadın bileğini demir gibi yakaladı, seni meydanda rezil etti.",
        },
      },
      {
        metin: "Saçmalık de, yoluna devam et.",
        baseBasariSansi: 92,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Omuz silkip yürüdün; arkandan kadının kikirdediğini duydun.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Kadının sözleri kafanda döndü; geceleri o taşı merak ediyorsun.",
          detay: "Cevapsız merak büyür.",
        },
      },
    ],
  },
  {
    id: "gizem_fisildayan_tas_uyari",
    kategori: "sosyal",
    gerekliEtiketler: [
      "esya:fisildayan_tas",
    ],
    gizemli: true,
    agirlik: 0.6,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Taş Konuştu",
    metin: "Gece yarısı cebindeki taş ısındı, kulağına ince bir ses fısıldadı: 'Yarın... güvendiğin biri... dikkat et.' Kalbin küt küt atıyor.",
    secenekler: [
      {
        metin: "Uyarıyı ciddiye al, temkinli ol.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          mutluluk: -5,
          mesaj: "Tetikte gezdin; bir dostunun kötü haberini son anda fark ettin.",
          detay: "Taş haklıymış, ya da sezgin.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Gölgelerden ürktün ama bir şey olmadı.",
        },
      },
      {
        metin: "Rüyaydı, aldırma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Omuz silkip unuttun; belki gerçekten rüyaydı.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          un: -5,
          mesaj: "Aldırmadın; güvendiğin biri seni küçük düşüren dedikodu yaydı.",
        },
      },
    ],
  },
  {
    id: "gizem_fisildayan_tas_istek",
    kategori: "sosyal",
    gerekliEtiketler: [
      "esya:fisildayan_tas",
    ],
    gizemli: true,
    ton: "agir",
    agirlik: 0.5,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Taşın İsteği",
    metin: "Taş bu kez net konuştu: 'Bana sevdiğin birinin adını ver. Karşılığında yıllarca yetecek şans.' Sesi neredeyse insan gibi.",
    secenekler: [
      {
        metin: "Tanımadığın birinin adını uydur.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: -8,
          un: 8,
          para: 20,
          mesaj: "Taş 'Kabul' dedi; günler tuhaf bir şansla geçti.",
          detay: "Ya da hepsi tesadüf.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          ahlak: -5,
          mesaj: "'Yalan söyledin!' diye tısladı; artık taşımak bile ürpertiyor.",
        },
      },
      {
        metin: "Ad verme, taşı kuyuya at.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 5,
          etiket_sil: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Kuyudan kırgın bir uğultu geldi, sonra sessizlik.",
          detay: "Bazı sırlar gömülmeyi hak eder.",
        },
        basarisizSonuc: {
          etiket_sil: [
            "esya:fisildayan_tas",
          ],
          mutluluk: -5,
          mesaj: "Taşı attın ama kuyudan gelen son fısıltı adını biliyordu.",
        },
      },
      {
        metin: "Sevdiğin birinin adını fısılda.",
        baseBasariSansi: 88,
        maxAhlak: 70,
        basariliSonuc: {
          para: 60,
          un: 25,
          ahlak: -20,
          etiket_sil: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Taş toza döndü, işler açıldı; o kişiye bakınca ürperiyorsun.",
          detay: "Şansın kaynağını kimseye anlatamazsın.",
        },
        basarisizSonuc: {
          ahlak: -20,
          mutluluk: -25,
          saglik: -10,
          etiket_sil: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Taş toza döndü, kapı açılmadı; adını verdiğin hastalandı.",
          detay: "Fısıltı hep alır; bu kez vermedi.",
        },
      },
    ],
  },
  {
    id: "gizem_eski_ayna",
    kategori: "sosyal",
    gizemli: true,
    agirlik: 0.25,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Terk Edilmiş Konağın Malları",
    metin: "Terk edilmiş konağın eşyaları satılıyor. Köşedeki gümüş kaplı aynanın içindeki oda, durduğun yerden biraz farklı görünüyor.",
    secenekler: [
      {
        metin: "Aynayı satın al.",
        baseBasariSansi: 90,
        maliyet: 15,
        basariliSonuc: {
          para: -10,
          etiket_ekle: [
            "esya:eski_ayna",
          ],
          mesaj: "Aynayı astın; yansıma bir an gecikip sana yetişti.",
          detay: "Belki yorgunluktandır.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Açık arttırma hilesiyle beklediğinden fazla ödedin.",
        },
      },
      {
        metin: "Kalabalıkta aynayı gizlice al.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        basariliSonuc: {
          ahlak: -10,
          etiket_ekle: [
            "esya:eski_ayna",
          ],
          mesaj: "Aynayı sarıp uzaklaştın; ellerin nedensiz soğudu.",
        },
        basarisizSonuc: {
          para: -15,
          un: -10,
          mesaj: "Suçüstü yakalandın; ceza ödedin, adın 'hırsız'a çıktı.",
        },
      },
      {
        metin: "Tuhaf, ilgilenme.",
        baseBasariSansi: 92,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Son kez baktın ve döndün; yansıma da döndü.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "O gecikmeyi unutamadın; bazı geceler hâlâ o odayı görüyorsun.",
          detay: "Görmezden gelinen peşinden gelir.",
        },
      },
    ],
  },
  {
    id: "gizem_eski_ayna_yansima",
    kategori: "sosyal",
    gerekliEtiketler: [
      "esya:eski_ayna",
    ],
    gizemli: true,
    ton: "agir",
    agirlik: 0.6,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yanlış Yansıma",
    metin: "Gece su içmeye kalkıp aynanın önünde durdun. Yansıman bir an gecikerek, farklı bir ifadeyle sana baktı. Sonra normale döndü.",
    secenekler: [
      {
        metin: "Yaklaş, dikkatle incele.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: -5,
          mesaj: "Yansıman sen gülmeden gülümsedi; artık farklı bakıyorsun.",
          detay: "Bazı deneyimler açıklanamadan değiştirir.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -15,
          mesaj: "Camdan bir el uzandı! Çığlıkla geri sıçradın.",
        },
      },
      {
        metin: "Aynayı örtüyle kapat.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Aynayı örtüp yattın; sabah her şey normal görünüyordu.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Örttün ama örtünün altından tıkırtı duydun sandın.",
        },
      },
    ],
  },
  {
    id: "gizem_eski_ayna_kehanet",
    kategori: "sosyal",
    gerekliEtiketler: [
      "esya:eski_ayna",
    ],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Aynadaki Uyarı",
    metin: "Aynada kendini görmedin: tanıdık sokakta üzerine devrilen yük arabası, sonra karanlık. Hâlâ tüylerin diken diken.",
    secenekler: [
      {
        metin: "O sokaktan birkaç gün uzak dur.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: -5,
          mesaj: "Sokakta gerçekten araba devrildi. Ayna yalan söylemiyor.",
          detay: "Ona bakınca hem minnettar hem tedirginsin.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Hiçbir şey olmadı; kendini biraz aptal hissettin.",
        },
      },
      {
        metin: "Boşver, her zamanki gibi yaşa.",
        baseBasariSansi: 60,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Görüntüyü unuttun; günler sıradan geçti.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 8,
          mesaj: "Tam o sokakta araba devrildi! Ağır yaralandın.",
        },
      },
    ],
  },
  {
    id: "rusvet_memur",
    kategori: "siyaset",
    gorsel: "🪙",
    agirlik: 0.6,
    baslik: "Mühür ve Kese",
    metin: "Hayati ruhsat haftalardır masada. Şişman memur sinsice gülüyor: 'Bir kese altın eksikleri tamamlar.'",
    secenekler: [
      {
        metin: "Lanetli Yüzüğü rüşvet olarak ver.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:olunun_yuzugu",
        ],
        basariliSonuc: {
          etiket_sil: [
            "envanter:olunun_yuzugu",
          ],
          para: 10,
          un: 10,
          mesaj: "Memur yüzüğe karşılık mührü bastı; üç gün sonra nehre atıldı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "İstediğini ver, sistemi besle.",
        baseBasariSansi: 75,
        maliyet: 18,
        basariliSonuc: {
          para: -18,
          ahlak: -20,
          maas_carpani: 1.12,
          mesaj: "Altını aldı, işi hemen halletti. Bozuk düzenin parçasısın.",
        },
        basarisizSonuc: {
          para: -18,
          un: -25,
          ahlak: -15,
          mesaj: "Tam o an müfettiş girdi! Rüşvetten ceza yedin, ruhsat iptal.",
        },
      },
      {
        metin: "Rüşvet vermem! Üst makama şikâyet et.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 25,
          ahlak: 25,
          para: -5,
          etiket_ekle: [
            "durust_bilinen",
          ],
          mesaj: "Memuru kovdurttun! İşin halloldu, esnaf seni alkışladı.",
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          ahlak: 15,
          mesaj: "Şikâyet ettiğin memurun dayısı çıktı! Aylarca iş yapamadın.",
        },
      },
    ],
  },
  {
    id: "zincir_tuccar_teslimat",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "buyuk_siparis_surecinde",
    ],
    yasakliEtiketler: [
      "buyuk_siparis_bitti",
    ],
    agirlik: 2,
    gorsel: "🏆",
    baslik: "Sözleşmenin Sonu",
    metin: "Yıllardır süren büyük tedarik anlaşması son teslimata geldi. Ortağın hesapları kapatmak için seni çağırdı.",
    secenekler: [
      {
        metin: "Gölge Sikkesi'ni koy, ortağı ele geçir.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:golge_sikke",
        ],
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 80,
          un: 30,
          ahlak: -40,
          maas_carpani: 1.3,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
            "envanter:golge_sikke",
          ],
          mesaj: "Ortağın gözleri boşaldı; şirket haklarını sana devretti.",
          detay: "Servet kazandın; adam delirdi, sen ürküyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Son teslimatı bizzat denetle.",
        baseBasariSansi: 68,
        basariliSonuc: {
          para: 65,
          un: 25,
          maas_carpani: 1.2,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
          ],
          mesaj: "Anlaşma tamamlandı; yıllık emeğin karşılığını aldın.",
          detay: "Artık şehrin tanınmış tüccarlarındansın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          un: -10,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
          ],
          mesaj: "Son teslimatta anlaşmazlık çıktı; anlaşma zararla kapandı.",
          detay: "Beklediğin ödül gelmedi ama tecrübe kazandın.",
        },
      },
      {
        metin: "Vekilini gönder.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: 35,
          un: 10,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
          ],
          mesaj: "Vekilin işi düzgün halletti; anlaşma sorunsuz kapandı.",
          detay: "Orada olmadın ama sonuç iyiydi. Güven yeter.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
          ],
          mesaj: "Vekilin son anda hesap hatası yaptı; kazanç az oldu.",
          detay: "Belki orada olsan fark ederdin.",
        },
      },
    ],
  },
  {
    id: "zincir_din_yolda_sinav",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "kutsal_gorevde",
    ],
    gorsel: "🌄",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yolda Bir Sınav",
    metin: "Görev yolunda aç ve parasız mültecilerle karşılaştın. Azıcık erzak ya onları ya seni idare eder.",
    secenekler: [
      {
        metin: "Gizemli Harita'yı verip yolu göster.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:gizemli_harita",
        ],
        basariliSonuc: {
          ahlak: 30,
          un: 15,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Haritayla erzak deposunu tarif ettin; ellerini öptüler.",
          detay: "Bir harita aileyi kurtardı. Vicdanın hafif.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Erzağının çoğunu paylaş.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 22,
          saglik: -10,
          mesaj: "Erzağı paylaştın; kalanla zorlanarak yola devam ettin.",
          detay: "Aç kaldın ama o ailenin minneti aklında.",
        },
        basarisizSonuc: {
          saglik: -20,
          ahlak: 15,
          mesaj: "Erzak yetmedi; yolu aç ve zayıf tamamladın.",
          detay: "İyilik yordu ama pişman değilsin.",
        },
      },
      {
        metin: "Erzağını koru, yoluna devam et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 8,
          ahlak: -18,
          mesaj: "Erzağı koruyup görev yerine sağlıklı vardın.",
          detay: "O yüzleri hatırlıyor, kendini avutuyorsun.",
        },
        basarisizSonuc: {
          ahlak: -20,
          saglik: -8,
          mesaj: "Yol yine de yordu; vicdanın da hiç rahat değil.",
          detay: "Hem zorlandın hem karar seninle kaldı.",
        },
      },
    ],
  },
  {
    id: "yerlesim_dag_ayi_karsilasmasi",
    kategori: "saglik",
    gorsel: "🐻",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dağın Sahibi",
    metin: "Dağ başındaki evine dönerken dar patikada devasa, aç bir ayıyla göz göze geldin. İkiniz de kıpırdamıyorsunuz.",
    secenekler: [
      {
        metin: "Kara Kılıcı çek, üzerine yürü!",
        baseBasariSansi: 80,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        basariliSonuc: {
          un: 30,
          saglik: 5,
          ahlak: -15,
          mesaj: "Ayı karanlıktan ürküp çekildi; tek darbede serdin.",
          detay: "Sana 'Ayı Boğan' diyorlar; kılıç hâlâ titriyor.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "Ayı kılıç hazır olmadan çöktü; omzun, çenen parçalandı.",
          detay: "Efsanevi çeliğin de hız sınırı varmış.",
        },
      },
      {
        metin: "Yavaşça geri çekil, ses çıkarma.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Ayı ormana döndü; nefesini tutarak eve vardın.",
          detay: "Dağda ilk kural sabırdır.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 8,
          mesaj: "Ayı ürküp saldırdı; zar zor bir kayanın arkasına attın.",
          detay: "Sırtındaki izler uzun süre iyileşmedi.",
        },
      },
      {
        metin: "Değneği sallayıp bağır.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 15,
          mesaj: "Ayı şaşırıp kaçtı; köyde hikâyeni anlata anlata bitiremedin.",
          detay: "Köylüler arasında bir süre 'cesur' diye anıldın.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 15,
          mesaj: "Ayı saldırdı; kol ve göğsünde derin yaralarla köye ulaştın.",
          detay: "Ormana her girişinde o anı hatırlıyorsun.",
        },
      },
    ],
  },
  {
    id: "derinlik_manastir_kedisi",
    gizemli: true,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    yasakliEtiketler: [
      "esya:veba_koruyucu_kedi",
    ],
    agirlik: 0.5,
    gorsel: "🐈‍⬛",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Manastırın Kara Kedisi",
    metin: "Manastır ambarında yaşlı bir kara kedi dolaşıyor. Kimi keşiş uğursuz sayıyor, kimi fare avından dolayı kutsuyor.",
    secenekler: [
      {
        metin: "Kediyi ambarda tut.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          etiket_ekle: [
            "esya:veba_koruyucu_kedi",
          ],
          mesaj: "Kediyi tuttun; fareler azaldıkça ambar temiz kaldı.",
          detay: "En sıradan yaratık sessiz bir kalkan olabilir.",
        },
        basarisizSonuc: {
          mesaj: "Kimi keşiş karşı çıktı ama kedi ambarda kaldı.",
          detay: "Gelenek ile pratiklik arasında ince denge.",
        },
      },
      {
        metin: "Uğursuz diye kediyi kov.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Kedi kovuldu; bazı keşişler rahatladı.",
          detay: "Batıl inanç pratikten önce gelir.",
        },
        basarisizSonuc: {
          saglik: -5,
          mesaj: "Kedi gidince ambarda fareler hızla çoğaldı.",
          detay: "Bazı kararların bedeli aylar sonra çıkar.",
        },
      },
    ],
  },
  {
    id: "derinlik_hazine_haritasi",
    gizemli: true,
    kategori: "ticaret",
    yasakliEtiketler: [
      "envanter:hazine_haritasi",
      "envanter:hazine_bulundu",
    ],
    agirlik: 0.5,
    gorsel: "🗺️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Eski Bir Harita",
    metin: "Eskici dükkânında kenarı yanık eski bir harita buldun; şifreli işaretler ve bilinmeyen bir yerin krokisi var.",
    secenekler: [
      {
        metin: "Haritayı satın al.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: {
          etiket_ekle: [
            "envanter:hazine_haritasi",
          ],
          para: -6,
          mesaj: "Haritayı aldın; belki kâğıt, belki hazine anahtarı.",
          detay: "Meraklı zihin için küçük bedel.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Haritayı aldın ama eskici seni kazıklamış.",
          detay: "Her pazarlık kazandırmaz.",
        },
      },
      {
        metin: "İlgilenme, sıradan kâğıt de.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Haritayı görmezden gelip yürüdün.",
          detay: "Kaçan fırsat değer miydi, kim bilir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yürürken haritayı yine düşündün.",
          detay: "Merak bazen peşini bırakmaz.",
        },
      },
    ],
  },
  {
    id: "derinlik_hazine_kazisi",
    kategori: "ticaret",
    gerekliEtiketler: [
      "envanter:hazine_haritasi",
    ],
    yasakliEtiketler: [
      "envanter:hazine_bulundu",
    ],
    agirlik: 0.8,
    gorsel: "⛏️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Haritanın İşaret Ettiği Yer",
    metin: "Haritayı inceleyip işaretli yeri buldun: terk edilmiş bir mağara girişi. Kazmaya değer mi?",
    secenekler: [
      {
        metin: "Kaz, riske gir.",
        baseBasariSansi: 40,
        maliyet: 15,
        basariliSonuc: {
          para: 80,
          un: 15,
          etiket_ekle: [
            "envanter:hazine_bulundu",
          ],
          etiket_sil: [
            "envanter:hazine_haritasi",
          ],
          mesaj: "Mağarada gerçekten bir hazine sandığı buldun!",
          detay: "Çocukça merak hayatının kazancı olabilir.",
        },
        basarisizSonuc: {
          saglik: -20,
          para: -15,
          etiket_sil: [
            "envanter:hazine_haritasi",
          ],
          mesaj: "Mağara çöktü, hazine yoktu; zor çıktın.",
          detay: "Harita eski bir kâğıt parçasıymış.",
        },
      },
      {
        metin: "Riske girme, haritayı sat.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 20,
          etiket_sil: [
            "envanter:hazine_haritasi",
          ],
          mesaj: "Haritayı koleksiyoncuya sattın; küçük ama garanti kazanç.",
          detay: "Merakı devretmek bazen en akıllısı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 8,
          etiket_sil: [
            "envanter:hazine_haritasi",
          ],
          mesaj: "Haritayı beklediğinden ucuza sattın.",
          detay: "Her pazarlık umduğun gibi bitmez.",
        },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti",
    gizemli: true,
    kategori: "din",
    yasakliEtiketler: [
      "esya:kutsal_kalinti",
    ],
    agirlik: 0.4,
    gorsel: "✨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kutsal Bir Emanet",
    metin: "Yıkık şapelde adı bilinmeyen bir azizin emaneti buldun. Halk, ona dokunanın ölümden bir kez döneceğini anlatır.",
    secenekler: [
      {
        metin: "Emaneti yanında taşı.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 8,
          etiket_ekle: [
            "esya:kutsal_kalinti",
          ],
          mesaj: "Emaneti bezle sarıp aldın; belki teselli, belki fazlası.",
          detay: "İnan ya da inanma, hafif bir ağırlık taşıyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Taşımak seni tedirgin etti; kısa sürede bir tanıdığa verdin.",
          detay: "Bazı sorumluluklar herkese göre değil.",
        },
      },
      {
        metin: "Dokunma, kiliseye bildir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Emaneti yetkililere teslim ettin; dürüstlüğün takdir gördü.",
          detay: "Bazı hazineler ortak mirastır.",
        },
        basarisizSonuc: {
          mesaj: "Bildirdin ama yetkililer pek ilgilenmedi.",
          detay: "Dürüstlük hak ettiği ilgiyi görmez.",
        },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti_mucizesi",
    kategori: "din",
    gerekliEtiketler: [
      "esya:kutsal_kalinti",
    ],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "✨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ölümün Eşiğinde",
    metin: "Ani bir ateş seni yatağa düşürdü; nefesin daralıyor, çevren vedalaşır gibi. Göğsündeki emanet tenine sıcaklık yayıyor.",
    secenekler: [
      {
        metin: "Emaneti sıkı tut, efsaneye güven.",
        baseBasariSansi: 100,
        basariliSonuc: {
          saglik: -5,
          etiket_sil: [
            "esya:kutsal_kalinti",
          ],
          mesaj: "Emanet parladı, ateşin düştü, sonra toza döndü.",
          detay: "Söylenti doğruymuş: ölümden bir kez döndürür.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Emanete güvenme, hekim ve kadere güven.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: -5,
          mesaj: "Ateş kendiliğinden düştü; emanetin sırrını öğrenemedin.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Ateş günlerce sürdü; emanete dokunmayışın doğru muydu?",
        },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti_soru",
    kategori: "din",
    gerekliEtiketler: [
      "esya:kutsal_kalinti",
    ],
    gizemli: true,
    agirlik: 0.4,
    gorsel: "⛪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Emanetin Sırrı Duyuldu",
    metin: "Emanetin söylentisi yayıldı. Bir grup hacı kapına dayandı: 'Göster, dokunalım!'",
    secenekler: [
      {
        metin: "Göster, dokunmalarına izin ver.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 15,
          ahlak: 10,
          mesaj: "Hacılar dokunup dua etti. Adın 'emanetin bekçisi' diye anıldı.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Kalabalık coştu, emanet kapılıyordu; geri aldın ama eşyaların kayboldu.",
        },
      },
      {
        metin: "Sakla, kimseye gösterme.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 7,
          mutluluk: -1,
          un: 4,
          mesaj: "Kapıyı kapattın. Bazıları küstü ama emanet güvende.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "'Gerçek olsa saklamazdı' diye dedikodu yaydılar.",
        },
      },
      {
        metin: "Kiliseye bağışla, kurtul.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 20,
          un: 5,
          etiket_sil: [
            "esya:kutsal_kalinti",
          ],
          mesaj: "Emaneti teslim ettin; yük kalktı. Artık sadece tanıksın.",
        },
        basarisizSonuc: {
          etiket_sil: [
            "esya:kutsal_kalinti",
          ],
          mutluluk: -5,
          mesaj: "Bağışı aldılar, teşekkür bile etmediler.",
        },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin",
    gizemli: true,
    kategori: "ticaret",
    yasakliEtiketler: [
      "esya:lanetli_altin",
    ],
    agirlik: 0.4,
    gorsel: "🪙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Şüpheli Bir Define",
    metin: "Bir kervansarayda, sahibi esrarengiz biçimde kaybolmuş bir altın kesesi ucuza satılıyor. Etrafında tuhaf söylentiler var.",
    secenekler: [
      {
        metin: "Altını al, söylentileri boş ver.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: {
          para: 45,
          etiket_ekle: [
            "esya:lanetli_altin",
          ],
          durum_ekle: {
            id: "lanet_golgesi",
            ad: "Lanetin Gölgesi",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Altını aldın; cebin doldu ama içinde huzursuzluk var.",
          detay: "Bazı kazançların görünmez bedeli olur.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Satıcı son anda vazgeçip keseyi geri aldı.",
          detay: "Bazı fırsatlar kayıp gider.",
        },
      },
      {
        metin: "Söylentilere kulak ver, uzak dur.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Altına dokunmadan yoluna devam ettin.",
          detay: "Fırsat riskiyle tartılmalı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Uzak durdun ama o keseyi uzun süre düşündün.",
          detay: "Merak, aklı gölgeler.",
        },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin_ruyasi",
    kategori: "din",
    gerekliEtiketler: [
      "esya:lanetli_altin",
    ],
    gizemli: true,
    ton: "agir",
    agirlik: 0.5,
    gorsel: "💀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Önceki Sahibinin Rüyası",
    metin: "Her gece rüyanda gözleri oyuk bir adam beliriyor: 'O altın benimdi, beni tüketti' deyip keseyi gösteriyor. Terler içinde uyanıyorsun.",
    secenekler: [
      {
        metin: "Bir rahibe laneti kırdır.",
        baseBasariSansi: 65,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          durum_sil: [
            "lanet_golgesi",
          ],
          mesaj: "Uzun bir ayinle soğukluk dağıldı. Rüyalar bitti, altın sıradan bir kese oldu.",
          detay: "Bazı lanetler doğru ellerle çözülür.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -10,
          mesaj: "Ayin işe yaramadı; rahip 'gücümü aşıyor' deyip kaçtı.",
        },
      },
      {
        metin: "Altını açmadan birine bağışla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -10,
          durum_sil: [
            "lanet_golgesi",
          ],
          etiket_sil: [
            "esya:lanetli_altin",
          ],
          mesaj: "Keseyi açmadan bir dilenciye uzattın. Lanet artık senin değil.",
          detay: "Rüyalar bitti, vicdanın unutmayacak.",
        },
        basarisizSonuc: {
          mesaj: "Kimse bu 'hediyeyi' kabul etmedi; altındaki gariplik sezildi.",
        },
      },
      {
        metin: "Rüyayı boşver, altına sarıl.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: 25,
          saglik: -8,
          mutluluk: -10,
          durum_ekle: {
            id: "lanet_golgesi",
            ad: "Lanetin Gölgesi",
            tur: "kalici",
            tur_basi_saglik: -2,
          },
          mesaj: "'Kimse alamaz' dedin. Hayalet kayboldu; kesede daha çok altın var.",
          detay: "Lanet büyüdü; her yıl biraz daha can alacak.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin_musteri",
    kategori: "ticaret",
    gerekliEtiketler: [
      "esya:lanetli_altin",
    ],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🪙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hevesli Bir Alıcı",
    metin: "Kervansarayda zengin bir tüccar kesene bakıp parladı: 'Eski bir define bu! Piyasanın üç katını veririm.' Söylenceyi bilmiyor gibi.",
    secenekler: [
      {
        metin: "Laneti söyleme, üç katına sat.",
        baseBasariSansi: 90,
        maxAhlak: 55,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 90,
          ahlak: -15,
          durum_sil: [
            "lanet_golgesi",
          ],
          etiket_sil: [
            "esya:lanetli_altin",
          ],
          mesaj: "Parayı saydı, keseyi alıp gitti. Cebin ağırlaştı ama adamı düşünüyorsun.",
          detay: "Bazı kazançların bedelini başkası öder.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: 90,
          ahlak: -15,
          mesaj: "Keseyi açınca soğukluğu hissetti; parayı geri alıp keseyi sana fırlattı.",
        },
      },
      {
        metin: "Laneti anlat; yine de alırsa sat.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 50,
          ahlak: 15,
          durum_sil: [
            "lanet_golgesi",
          ],
          etiket_sil: [
            "esya:lanetli_altin",
          ],
          mesaj: "Gülümsedi: 'Böyle şeylere meraklıyım.' Daha az parayla da olsa bilerek aldı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -50,
          mesaj: "'Çıldırmışsın' deyip gitti. Kese elinde, alıcı yok.",
        },
      },
      {
        metin: "Satma; bu laneti kimseye yükleme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Teklifi reddettin. Adam şaşkın ayrıldı ama vicdanın rahat.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Reddettin ama o parayı düşünüp pişman oldun.",
        },
      },
    ],
  },
  {
    id: "derinlik_gizli_orgut_daveti",
    gizemli: true,
    kategori: "siyaset",
    minYas: 18,
    yasakliEtiketler: [
      "orgut_secildi",
    ],
    agirlik: 0.5,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hanın Arka Odası",
    metin: "Bir handa yüzünü gizleyen adam seni arka odaya çağırdı. İçeride gölgelerde toplanmış, yüzleri seçilmeyen bir grup var.",
    secenekler: [
      {
        metin: "Tapınak Şövalyeleri'ne katıl.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 8,
          un: 10,
          etiket_ekle: [
            "orgut:Tapınak Şövalyeleri",
            "orgut_secildi",
          ],
          mesaj: "Yemin ettin; gölgede duran güçlü bir kardeşliğin parçasısın.",
          detay: "Sadakat karşılığı koruma ve güç.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "orgut:Tapınak Şövalyeleri",
            "orgut_secildi",
          ],
          mesaj: "Katılımın gergin geçti ama kabul edildin.",
          detay: "Her başlangıç pürüzsüz olmuyor.",
        },
      },
      {
        metin: "Gölgede Kardeşlik'e katıl.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 15,
          etiket_ekle: [
            "orgut:Gölgede Kardeşlik",
            "orgut_secildi",
          ],
          mesaj: "Yemin ettin; şehrin görünmez ağlarına erişimin var.",
          detay: "Güç değil, bilgi ve bağlantı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          etiket_ekle: [
            "orgut:Gölgede Kardeşlik",
            "orgut_secildi",
          ],
          mesaj: "Katılımın gergin geçti ama kabul edildin.",
          detay: "Güven zamanla kurulur.",
        },
      },
      {
        metin: "Reddet, odadan çık.",
        baseBasariSansi: 95,
        basariliSonuc: {
          etiket_ekle: [
            "orgut_secildi",
          ],
          mesaj: "Nazikçe reddettin, kimse zorlamadı.",
          detay: "Her gizemli kapı açılmaz.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "orgut_secildi",
          ],
          mesaj: "Ret gerginlik yarattı ama gitmene izin verdiler.",
          detay: "Kapanan kapı bir daha açılmaz.",
        },
      },
    ],
  },
  {
    id: "derinlik_orgut_gizli_gorev",
    kategori: "siyaset",
    gerekliEtiketler: [
      "orgut_secildi",
    ],
    agirlik: 0.4,
    gorsel: "🗝️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kardeşlikten Bir Görev",
    metin: "Örgütünden biri gece yarısı seni buldu: tehlikeli ama kazançlı, yalnızca güvenilirlere verilen gizli bir görev var.",
    secenekler: [
      {
        metin: "Tapınak Şövalyeleri görevini al.",
        baseBasariSansi: 55,
        gerekliEtiketler: [
          "orgut:Tapınak Şövalyeleri",
        ],
        kilitAciklamasi: "Yalnızca Tapınak Şövalyeleri üyelerine açık.",
        basariliSonuc: {
          mutluluk: -10,
          un: 10,
          para: 25,
          mesaj: "Görevi tamamladın; kardeşlikteki itibarın büyüdü.",
          detay: "Sadakatinin karşılığını aldın.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Görev ters gitti, güçlükle kurtuldun.",
          detay: "Gizli görev göründüğü kadar basit değil.",
        },
      },
      {
        metin: "Gölgede Kardeşlik görevini al.",
        baseBasariSansi: 55,
        gerekliEtiketler: [
          "orgut:Gölgede Kardeşlik",
        ],
        kilitAciklamasi: "Yalnızca Gölgede Kardeşlik üyelerine açık.",
        basariliSonuc: {
          mutluluk: -11,
          un: -5,
          para: 45,
          mesaj: "Görev sorunsuz bitti; ağın genişledi.",
          detay: "Bağlantı altından değerli olabilir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          un: -8,
          mesaj: "Fark edildin, küçük bir skandal çıktı.",
          detay: "Gölgede kalmak hep mümkün değil.",
        },
      },
      {
        metin: "Reddet, çok riskli.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Görevi nazikçe reddettin.",
          detay: "Her fırsatı almak zorunda değilsin.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Ret, örgütte güven kaybettirdi.",
          detay: "Her hayırın bir bedeli olabilir.",
        },
      },
    ],
  },
  {
    id: "derinlik_kumarhane_daveti",
    gizemli: true,
    kategori: "sosyal",
    yasakliEtiketler: [
      "bagimlilik:kumarbaz",
    ],
    agirlik: 0.6,
    gorsel: "🎲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Zar Masası",
    metin: "Bir arkadaşın seni gizli bir kumar masasına çağırdı. Kazanç cazip ama bu yerler bağımlılık yapar.",
    secenekler: [
      {
        metin: "Bir el dene.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -11,
          un: -4,
          para: 30,
          mesaj: "Bu gece şanslıydın; cebin kabardı.",
          detay: "Kazanç heyecanı tehlikeli bir tada döner.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          etiket_ekle: [
            "bagimlilik:kumarbaz",
            "bagimlilik:var",
          ],
          durum_ekle: {
            id: "kumar_bagimliligi",
            ad: "Kumar Bağımlılığı",
            tur: "kalici",
            tur_basi_para: -4,
          },
          mesaj: "Kaybettin ama kalkamadın; birkaç el daha oynadın. Dönmemek zor.",
          detay: "Kayıp seni masaya daha çok bağladı.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Reddettin, gecen sakin geçti.",
          detay: "Bazı heyecanlardan uzak durmalı.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Ret arkadaşını biraz küstürdü.",
          detay: "Her hayır biraz mesafe açar.",
        },
      },
    ],
  },
  {
    id: "saray_girme_denemesi",
    kategori: "siyaset",
    minYas: 18,
    yasakliEtiketler: [
      "sarayda",
    ],
    agirlik: 0.4,
    gorsel: "🏰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sarayın Kapısında",
    metin: "Saray kapıcıları herkesi almaz. Ama bazen bir kese altın, bazen doğru bir isim kapıyı aralar.",
    secenekler: [
      {
        metin: "Gölge Sikkesi'ni göster.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:golge_sikke",
        ],
        // Gölge Sikkesi'ni olmayan (çoğunluk) oyuncu için bu şık tamamen gizlenir —
        // kalıcı kilitli bir 4. buton göstermek yerine olay onlar için doğal
        // olarak 3 şıklı kalır (2026-09 sonu, "4 şıklıları 3'e düşürelim" turu).
        gizliEgerYok: true,
        basariliSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          etiket_sil: [
            "envanter:golge_sikke",
          ],
          un: 15,
          ahlak: -10,
          mesaj: "Sikkeyi gören muhafızlar sessizce kapıları sonuna dek açtı.",
          detay: "Saraya hayalet gibi sızdın.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Kapıcıya rüşvet ver.",
        baseBasariSansi: 40,
        maliyet: 30,
        basariliSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          un: 10,
          mesaj: "Altınların konuştu; kapı sessizce aralandı.",
          detay: "Artık saray çevresinde tanınıyorsun.",
        },
        basarisizSonuc: {
          para: -30,
          un: -5,
          mesaj: "Görevli kızdı; parasız ve rezil kovuldun.",
          detay: "Bazı kapılar parayla açılmaz.",
        },
      },
      {
        metin: "Saygınlığını ve tanıdıklarını öne sür.",
        baseBasariSansi: 35,
        minUn: 30,
        kilitAciklamasi: "Yeterince tanınmıyorsun; önce adını duyur",
        basariliSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          un: 8,
          mesaj: "Adını bilen bir görevli seni içeri aldı.",
          detay: "Şöhretin bir kapı daha açtı.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Adını duymadıklarını söyleyip seni küçük düşürdüler.",
          detay: "Şöhretin sandığın kadar yayılmamış.",
        },
      },
      {
        metin: "Vazgeç, başka gün dene.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -2,
          mesaj: "Bugünlük vazgeçtin.",
          detay: "Saray bir yere kaçmıyor.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "oc_veba_karsilasma",
    kategori: "saglik",
    cag: "Orta Çağ",
    gerekliUlke: {
      vebada: true,
    },
    agirlik: 1,
    ton: "agir",
    gorsel: "💀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kapı Komşusu Hasta",
    metin: "Komşun vebaya yakalandı; ailesi kaçtı, bakan olmazsa yalnız ölecek. Yardım etmek kendini riske atmak.",
    secenekler: [
      {
        metin: "Manastır Kedisi'ni komşuya sal.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "esya:veba_koruyucu_kedi",
        ],
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Kara kedi veba taşıyan fareleri avladı. Komşun iyileşti, sana minnettar.",
          detay: "Uğursuz denen kedi can kurtardı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı",
        },
      },
      {
        metin: "Yanına git, ona bak.",
        baseBasariSansi: 40,
        basariliSonuc: {
          ahlak: 20,
          un: 8,
          mesaj: "Komşuna baktın, iyileşti; mahalle cesaretini unutmayacak.",
          detay: "Bazı iyilikler ölüm riskiyle yapılır.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 12,
          mesaj: "Sen de hastalandın; günlerce ateşler içinde yattın.",
          detay: "Merhametin bedeli ağır oldu.",
        },
      },
      {
        metin: "Uzak dur, kendini koru.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Uzak durdun; komşun yalnız mücadele etti.",
          detay: "Korunmak da bir hayatta kalma yolu.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mutluluk: -5,
          mesaj: "Komşun yalnız öldü; o sahne aklından çıkmadı.",
          detay: "Bazı sessizlikler vicdanı yorar.",
        },
      },
    ],
  },
  {
    id: "gizem_koleksiyoncu_ejderha",
    gizemli: true,
    kategori: "ticaret",
    gerekliEtiketler: [
      "envanter:ejderha_tilsimi",
    ],
    agirlik: 1,
    gorsel: "🩸",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Koleksiyoncunun Ziyareti",
    metin: "Gece yarısı kapına gümüş maskeli bir adam geldi. Ejderha Tılsımı'nı sezmiş: 'Sat, bir ömürlük altın vereyim.' Sesi çürük toprak kokuyor.",
    secenekler: [
      {
        metin: "Tılsımı ver, altınları al.",
        baseBasariSansi: 88,
        basariliSonuc: {
          para: 80,
          ahlak: -10,
          etiket_sil: [
            "envanter:ejderha_tilsimi",
          ],
          mesaj: "Tılsımı verdin. Adam ağır bir kese bırakıp sise karıştı.",
          detay: "Cebin doldu ama kadim sıcaklık gitti.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mutluluk: -15,
          etiket_sil: [
            "envanter:ejderha_tilsimi",
          ],
          mesaj: "Sabah kese kuru yapraklarla doluydu. Adam da tılsım da gitmişti.",
          detay: "Bazı alışverişin bedeli sabah anlaşılır.",
        },
      },
      {
        metin: "Tılsım benim! Kılıcı çek, saldır.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 35,
          saglik: -10,
          mesaj: "Tılsım kılıcına güç verdi! Adam kara dumana dönüşüp yok oldu; maskesi kaldı.",
          detay: "Şeytani varlığı yendin; tılsımın gücünü anladın.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 25,
          etiket_sil: [
            "envanter:ejderha_tilsimi",
          ],
          mesaj: "Adam elini kaldırıp seni duvara fırlattı. Tılsımın koparıldığını hissettin.",
          detay: "Zor kurtuldun. Tılsım gitti, bedenin kırık.",
        },
      },
    ],
  },
  {
    id: "gizem_kara_kilic_fisilti",
    kategori: "savas",
    ton: "agir",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:kara_kilic",
    ],
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kılıcın Fısıltısı",
    metin: "Kara Kılıç kemerinde bile haksızlık ettiğini düşündüğün birinin adını fısıldıyor. 'Adaleti' kendi ellerinle sağlamak cazip.",
    secenekler: [
      {
        metin: "Fısıltıyı dinle, hesaplaş.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 12,
          ahlak: -25,
          mesaj: "Kılıç kendi kendine hareket etti. Ne pişmanlık ne rahatlama; boşluk.",
          detay: "Kılıcın gücü büyüyor, vicdanın küçülüyor.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -15,
          mesaj: "Hesaplaşma ters gitti; yaralı geri çekildin.",
          detay: "Fısıltıya uymak pahalıya patladı.",
        },
      },
      {
        metin: "Kılıcı sandığa kilitle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Kılıcı derin bir sandığa kilitledin; geceleri rahat uyuyorsun.",
          detay: "Bazı güçten uzak durmak cesarettir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Kılıcı kilitledin ama fısıltı kulağından silinmedi.",
          detay: "Bazı sesler kilitle susmaz.",
        },
      },
    ],
  },
  {
    id: "gizem_sirli_iksir_ikilemi",
    gizemli: true,
    kategori: "saglik",
    ton: "agir",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:sirli_iksir",
    ],
    gorsel: "🧪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Son Şişe",
    metin: "{dost} ağır hasta, hekimler çaresiz. Sakladığın gizemli iksir belki mucize, belki renkli su; denemekten başka çare yok gibi.",
    secenekler: [
      {
        metin: "İksiri {dost}'a içir.",
        baseBasariSansi: 60,
        basariliSonuc: {
          dost_puani: 25,
          mutluluk: 12,
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mesaj: "Şişe boşalınca {dost}'un nefesi düzeldi; gözünü açınca ilk seni gördü.",
          detay: "Sakladığın gizem tam zamanında mucize oldu.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mesaj: "İksir sıradan şurup çıktı; son umut da tükendi.",
          detay: "Bazı efsaneler yalnız efsane kalır.",
        },
      },
      {
        metin: "Sakla, koleksiyoncuya satmayı düşün.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 45,
          ahlak: -20,
          dost_puani: -15,
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mesaj: "İksiri sattın; kasan doldu ama {dost}'un başında söyleyemedin.",
          detay: "Bazı kazançlar suçluluk gibi taşınır.",
        },
        basarisizSonuc: {
          para: 20,
          ahlak: -20,
          dost_puani: -15,
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mesaj: "İksiri ucuza sattın; hem vicdan azabı hem az kazanç kaldı.",
          detay: "Bedeli ödedin, karşılığı yok.",
        },
      },
    ],
  },
  {
    id: "gizem_golge_sikke_kumari",
    gizemli: true,
    kategori: "ticaret",
    ton: "hafif",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:golge_sikke",
    ],
    gorsel: "🪙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kaderin Parası",
    metin: "Gölge Sikke tuhaf bir ağırlıkla elinde; havaya atılınca kaderi değiştirdiği söylenir. Büyük bir bahiste kararı ona bırakabilirsin.",
    secenekler: [
      {
        metin: "Sikkeyi büyük bahse sür, kaderi zorla.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: -5,
          para: 60,
          mutluluk: 1,
          mesaj: "Sikke üç kez döndü, istediğin yüzü gösterdi! Masadakiler dehşetle izledi.",
          detay: "Sikkenin ünü seninle büyüdü.",
        },
        basarisizSonuc: {
          para: -50,
          mutluluk: -16,
          mesaj: "Sikke öteki yüzünü gösterdi. Her şeyi masada bıraktın.",
          detay: "Kader fısıldadığı gibi davranmaz.",
        },
      },
      {
        metin: "Sikkeyi uğur olarak sakla.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Sikkeyi kullanmadan cebine koydun; gizemi merakınla yaşıyor.",
          detay: "Gücü harcamadan taşımak bilgelik.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "gizem_gizemli_harita_ikinci_yol",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.5,
    gerekliEtiketler: [
      "envanter:gizemli_harita",
    ],
    gorsel: "🗺️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Haritanın İkinci Yolu",
    metin: "Gizemli Harita'da iki işaret fark ettin: biri tehlikeli, terk edilmiş bir geçide; öbürü meraklı bir koleksiyoncunun kapısına gidiyor.",
    secenekler: [
      {
        metin: "Tehlikeli geçidi keşfet.",
        baseBasariSansi: 40,
        basariliSonuc: {
          para: 55,
          un: 18,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Geçidin sonunda unutulmuş tapınağın hazinesini buldun! Adın yayıldı.",
          detay: "Bazı riskler efsaneye döner.",
        },
        basarisizSonuc: {
          saglik: -22,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Geçit çöktü, güçlükle çıktın; harita enkazda kaldı.",
          detay: "Her harita zenginliğe çıkmaz.",
        },
      },
      {
        metin: "Haritayı koleksiyoncuya sat.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 25,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Koleksiyoncu haritayı iple çekiyordu; iyi fiyata sattın.",
          detay: "Merakı devretmek bazen akıllıcadır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 10,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Koleksiyoncu pazarlıkta zorladı; umduğundan az kazandın.",
          detay: "Her pazarlık umduğu gibi bitmez.",
        },
      },
    ],
  },
  {
    id: "gizem_hazine_haritasi_ortaklik",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:hazine_haritasi",
    ],
    gorsel: "🤝",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ortaklık Teklifi",
    metin: "Hazine Haritası'nı taşıdığını öğrenen deneyimli bir define avcısı yarı yarıya ortaklık teklif ediyor. Tek başına kârlı ama tehlikeli.",
    secenekler: [
      {
        metin: "Kabul et, riski paylaş.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: -11,
          un: -5,
          para: 35,
          dost_puani: 8,
          mesaj: "Avcı sayesinde kazı güvenle bitti; hazineyi paylaştınız.",
          detay: "Yarım kazanç, güvenin bedeli.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Ortağın son anda vazgeçti; kazı yarım kaldı, masraf senin.",
          detay: "Her ortaklık yürümez.",
        },
      },
      {
        metin: "Reddet, tek başına git.",
        baseBasariSansi: 45,
        basariliSonuc: {
          mutluluk: -11,
          para: 70,
          un: 5,
          mesaj: "Tek başına kazdın, hazine senin! Riske değdi.",
          detay: "Bazen paylaşmamak en zengin eder.",
        },
        basarisizSonuc: {
          saglik: -18,
          para: -10,
          mesaj: "Yalnız kazı zor geçti; eli boş ve yaralı döndün.",
          detay: "Yalnız cesaret yetmeyebilir.",
        },
      },
    ],
  },
  {
    id: "gizem_olunun_yuzugu_lanet_soylentisi",
    gizemli: true,
    kategori: "din",
    ton: "agir",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:olunun_yuzugu",
    ],
    gorsel: "💀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Lanet Söylentisi",
    metin: "Yaşlı bir kadın yüzüğünü görünce dehşetle çekildi: 'Ölünün yüzüğü lanetlidir!' Bir rahip küçük ücretle 'temizleyebileceğini' söylüyor.",
    secenekler: [
      {
        metin: "Rahibe öde, yüzüğü temizlet.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          mutluluk: 8,
          mesaj: "Rahip duayla yüzüğü 'arındırdı'; içinin rahatladığını hissettin.",
          detay: "Huzurun bedeli bazen birkaç sikke.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Tören bitti ama tedirginlik geçmedi.",
          detay: "Bazı korkular parayla silinmez.",
        },
      },
      {
        metin: "Boş inanç de, yüzüğü tak.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yüzüğü takmayı sürdürdün, hiçbir şey olmadı; inanca güldün.",
          detay: "Bazen korku sadece korkudur.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -6,
          mesaj: "Ardı ardına talihsizlikler yüzünden mahallede 'lanetli' dendin.",
          detay: "İnanmasan da söylenti bulur.",
        },
      },
    ],
  },
  {
    id: "gizem_hazine_bulundu_vergi_sorunu",
    gizemli: true,
    kategori: "siyaset",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:hazine_bulundu",
    ],
    gorsel: "💰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ansızın Zenginin Sırtındaki Yük",
    metin: "Bulduğun hazinenin haberi yayıldı. Tahsildar kapında: ya 'bulunmuş servet vergisini' öde ya da hazineyi nerede bulduğunu mahkemede anlat.",
    secenekler: [
      {
        metin: "Vergiyi sessizce öde.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -30,
          etiket_sil: [
            "envanter:hazine_bulundu",
          ],
          mesaj: "Vergiyi ödedin; tahsildar kaşlarını çatıp gitti.",
          detay: "Zenginliğin bedeli devletin payıdır.",
        },
        basarisizSonuc: {
          para: -30,
          un: -5,
          etiket_sil: [
            "envanter:hazine_bulundu",
          ],
          mesaj: "Ödedin ama tahsildar seni 'şüpheli zengin' diye yazdı.",
          detay: "Ödesen de gözden düşersin.",
        },
      },
      {
        metin: "Tahsildarı küçük rüşvetle sustur.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: -12,
          ahlak: -10,
          etiket_sil: [
            "envanter:hazine_bulundu",
          ],
          mesaj: "Tahsildar parayı cebine atıp göz kırptı; kayıtlarda iz kalmayacak.",
          detay: "Bazı sorunlar ahlakla ödenir.",
        },
        basarisizSonuc: {
          para: -45,
          ahlak: -10,
          un: -15,
          etiket_sil: [
            "envanter:hazine_bulundu",
          ],
          mesaj: "Rüşvet üstlerine bildirildi; hem ceza hem 'yozlaşmış' ünü.",
          detay: "Kestirme bazen uzun sürer.",
        },
      },
    ],
  },
];
