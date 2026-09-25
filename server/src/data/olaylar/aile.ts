import type { OlayTanimi } from "./types";

export const OLAY_AILE: OlayTanimi[] = [
  {
    id: "iliski_evlilik_teklifi",
    kategori: "sosyal",
    minYas: 17,
    yasakliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "💍",
    baslik: "Nüfuzlu Bir Bağ",
    metin: "{dost} sana şehirde oldukça güçlü bağlantıları olan bir ailenin ferdiyle tanıştırdı. İkiniz arasında soğuk ama saygılı bir bağ oluştu. Bu evlilik aşk dolu olmayacak ama sana büyük kapılar açabilir.",
    secenekler: [
      {
        metin: "Mantık evliliğini kabul et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          es_ata: true,
          es_puani: -20,
          para: 25,
          un: 15,
          etiket_ekle: [
            "medeni:evli",
            "itibar:nufuzlu_evlilik",
            "evlilik_yolu:mantik_soylu",
          ],
          mesaj: "Tören oldukça gösterişliydi. Artık güçlü bir ailenin parçasısın ancak yatağa girdiğinde hissettiğin tek şey üşüme.",
        },
        basarisizSonuc: {
          para: -25,
          mutluluk: -14,
          un: -15,
          mesaj: "Aile son anda senin statünü yetersiz bulup düğünü iptal etti. Şehirde alay konusu oldun.",
        },
      },
      {
        metin: "Bana aşk lazım de ve teklifi geri çevir.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 10,
          durum_ekle: {
            id: "ikinci_teklif_zamanlayici",
            ad: "Gerçek Aşk Beklentisi",
            tur: "gecici",
            kalan_tur: 4,
            bitince_etiket: "iliski_ikinci_teklif_zamani",
          },
          mesaj: "Nüfuzu ve parayı elinin tersiyle ittin. Herkes sana deli diyor ama sen vicdanen çok rahatsın.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          durum_ekle: {
            id: "ikinci_teklif_zamanlayici",
            ad: "Yalnızlığın Ağırlığı",
            tur: "gecici",
            kalan_tur: 3,
            bitince_etiket: "iliski_ikinci_teklif_zamani",
          },
          mesaj: "Teklifi reddettin ama gece yatağa yalnız girdiğinde 'acaba hata mı yaptım' diye düşünmeden edemedin.",
        },
      },
    ],
  },
  {
    id: "iliski_cocuk_mujdesi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "👶",
    baslik: "Bir Varis Doğuyor",
    metin: "{es} sana bir haber veriyor: Aileniz büyüyecek! Ancak doktorlar, {es}'in bünyesinin zayıf olduğunu ve doğumun çok riskli olabileceğini söylüyor.",
    secenekler: [
      {
        metin: "En pahalı ebeyi ve doktoru tut (Riskleri azalt).",
        baseBasariSansi: 85,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          cocuk_ekle: 1,
          mutluluk: 10,
          es_puani: 15,
          mesaj: "Parayı esirgemedin ve doktorların müdahalesiyle hem {es} hem de çocuğun sağ salim kurtuldu! Evde bayram havası var.",
        },
        basarisizSonuc: {
          para: -25,
          es_kaybet: true,
          cocuk_ekle: 1,
          mutluluk: -30,
          saglik: -10,
          etiket_ekle: [
            "kalici:es_acisi",
          ],
          mesaj: "Ne kadar para dökersen dök, kader değişmedi. Çocuğun doğdu ama {es} doğum yatağında son nefesini verdi.",
        },
      },
      {
        metin: "Param yok, köyün yaşlı ebesine güveneceğiz.",
        baseBasariSansi: 40,
        basariliSonuc: {
          cocuk_ekle: 1,
          mutluluk: 8,
          mesaj: "Tanrı'nın bir lütfu! Hiçbir masraf yapmadan, tamamen şans eseri sağlıklı bir çocuk dünyaya geldi.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -40,
          saglik: -15,
          etiket_ekle: [
            "kalici:es_acisi",
            "kalici:cocuk_acisi",
          ],
          mesaj: "Ucuz ebe kanamayı durduramadı. Hayatının en karanlık gecesinde hem {es}'i hem de doğmamış bebeğini kaybettin.",
        },
      },
    ],
  },
  {
    id: "soylu_saray_entrikasi",
    kategori: "siyaset",
    ton: "agir",
    gerekliEtiketler: [
      "aile:soylu",
    ],
    minYas: 16,
    agirlik: 0.8,
    gorsel: "🗡️",
    baslik: "Karanlık Koridorların Fısıltısı",
    metin: "Sarayın karanlık koridorlarında adının geçtiği bir fısıltı duydun: Kuzenlerinden biri (veya güçlü bir rakip) senin yükselişinden rahatsız. Kadehindeki tuhaf tat, gölgede bekleyen adamlar... Soylu kanın seni hedef haline getirdi.",
    secenekler: [
      {
        metin: "Tehdidi görmezden gel, korumalarını artır.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          etiket_ekle: [
            "itibar:korkusuz_soylu",
          ],
          mesaj: "Soğukkanlılığını korudun. Korkmadığını gören düşmanların geri adım attı; adın sarayda saygıyla anılıyor.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 20,
          durum_ekle: {
            id: "suikast_yarasi",
            ad: "Suikast Yarası",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Bir gece gölgeden çıkan zehirli bir hançer seni buldu. Canını zor kurtardın ama yaran asla tam iyileşmeyecek.",
        },
      },
      {
        metin: "Karanlık adamlar tut, şüphelendiğin kişiyi ilk sen ortadan kaldır.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: -25,
          un: 10,
          etiket_ekle: [
            "sir:kanli_eller",
          ],
          mesaj: "Kuzenin/rakibin 'talihsiz bir at kazasında' can verdi. Güvendesin. Ama artık aynaya baktığında bir katil görüyorsun.",
        },
        basarisizSonuc: {
          ahlak: -15,
          saglik: -20,
          olum_sansi: 15,
          mesaj: "Kiraladığın adamlar beceriksiz çıktı ve ötüp senin adını verdiler! Misilleme sertti ve az kalsın hayatına mal oluyordu.",
        },
      },
    ],
  },
  {
    id: "cocuk_hastalik_sonucu_iyi",
    kategori: "saglik",
    gerekliEtiketler: [
      "cocuk_saglik_zamani:iyi",
    ],
    gorsel: "🌤️",
    baslik: "Şifa Buldu",
    metin: "Evladın nihayet gözlerini açtı, ateşi düştü ve senden su istedi.",
    secenekler: [
      {
        metin: "Sevincini paylaş, Tanrı'ya şükret.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 10,
          saglik: 5,
          etiket_sil: [
            "cocuk_saglik_zamani:iyi",
          ],
          mesaj: "İçini kaplayan o devasa korku yerini gözyaşlarına bıraktı. Çocuğun yaşıyor!",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Heyecanlanma, önce nabzını kontrol et, sonra sevin.",
        baseBasariSansi: 100,
        basariliSonuc: {
          saglik: 8,
          mutluluk: 6,
          etiket_sil: [
            "cocuk_saglik_zamani:iyi",
          ],
          mesaj: "Elini alnına koyup ateşin gerçekten düştüğünden emin oldun; sonra rahatlayıp gülümsedin. Çocuğun yaşıyor!",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "cocuk_hastalik_sonucu_kotu",
    kategori: "saglik",
    ton: "agir",
    gerekliEtiketler: [
      "cocuk_saglik_zamani:kotu",
    ],
    gorsel: "🕯️",
    baslik: "Küçük Bir Tabut",
    metin: "Korkulan oldu. Ateşi hiç düşmedi. Evladının o küçük bedeni yatağın içinde soğumaya başladı. Hekimler bile odayı sessizce terk ediyor.",
    secenekler: [
      {
        metin: "Son bir umutla sarıl ve uyanması için yalvar.",
        baseBasariSansi: 20,
        basariliSonuc: {
          saglik: 3,
          mutluluk: 8,
          etiket_sil: [
            "cocuk_saglik_zamani:kotu",
          ],
          mesaj: "Ağlarken gözyaşın onun yüzüne düştü. Birden öksürerek nefes aldı! O ölmemiş, sadece derin bir komadaymış!",
        },
        basarisizSonuc: {
          cocuk_kaybet: true,
          mutluluk: -40,
          saglik: -10,
          etiket_sil: [
            "cocuk_saglik_zamani:kotu",
          ],
          etiket_ekle: [
            "kalici:evlat_acisi",
          ],
          mesaj: "Ne kadar bağırırsan bağır o küçük gözler bir daha açılmadı. Toprağa kendi ellerinle verdin.",
        },
      },
      {
        metin: "Gerçeği kabullen, üzerini ört ve cenazesini hazırla.",
        baseBasariSansi: 100,
        basariliSonuc: {
          cocuk_kaybet: true,
          mutluluk: -30,
          etiket_sil: [
            "cocuk_saglik_zamani:kotu",
          ],
          etiket_ekle: [
            "kalici:evlat_acisi",
          ],
          mesaj: "Ağlamaya bile mecalin yok. İçindeki bir parça o tabutla beraber toprağa gömüldü.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "cocuk_suctustu",
    kategori: "sosyal",
    gerekliEtiketler: [
      "cocuk_var",
    ],
    gorsel: "👦",
    baslik: "Suçüstü",
    metin: "Pazar yerinde bir bağırış koptu. Bir kumaş tüccarı çocuğunu yakasından tutmuş sürüklüyor: 'Bu küçük hırsız mallarımı çaldı!' Muhafızlar yaklaşmak üzere.",
    secenekler: [
      {
        metin: "Muhafızlara ve tüccara gizlice rüşvet ver (Sustur).",
        baseBasariSansi: 85,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          ahlak: -15,
          etiket_ekle: [
            "sorunlu_cocuk",
          ],
          mesaj: "Keseleri ellerine sıkıştırdın. Tüccar 'yanlış anlama olmuş' dedi. Çocuğun parayla adaletin satın alınabileceğini görerek pis bir şekilde gülümsedi.",
        },
        basarisizSonuc: {
          para: -25,
          un: -20,
          mesaj: "Rüşveti almalarına rağmen herkesin içinde çocuğuna hırsız damgası vurdular. Ailenin adı lekelendi.",
        },
      },
      {
        metin: "Suçu sen üstlen! 'O çaldıysa benim emrimle çaldı' de.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: -15,
          ahlak: 20,
          etiket_ekle: [
            "hapiste",
          ],
          mesaj: "Çocuğunu kenara ittin ve ellerini uzattın. Muhafızlar seni zincire vurup zindana sürüklerken çocuğun arkandan ağlıyordu.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: 10,
          etiket_ekle: [
            "hapiste",
            "sorunlu_cocuk",
          ],
          mesaj: "Muhafızlar sırıttı: 'İkinizi de içeri atarız.' Çocuğun da sen de zincire vuruldunuz; onun sicili artık lekeli.",
        },
      },
      {
        metin: "Çocuğa herkesin önünde tokat at ve teslim et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 20,
          mutluluk: -15,
          mesaj: "Onu tokatladın ve adalete teslim ettin. Pazar halkı dürüstlüğünü takdir etti ama çocuğun karakola götürülürken sana attığı o nefreti asla unutmayacaksın.",
        },
        basarisizSonuc: {
          mutluluk: -20,
          mesaj: "Çocuğa vurdun ama tüccar yine de yetinmedi. İkinizi de sokağın ortasında aşağıladılar.",
        },
      },
    ],
  },
  {
    id: "cocuk_evlilik",
    kategori: "sosyal",
    gerekliEtiketler: [
      "cocuk_var",
    ],
    minYas: 35,
    gorsel: "💒",
    baslik: "Çocuğunun Düğünü",
    metin: "Evladın büyüdü, artık kendi yuvasını kuracak. Aile büyük bir düğün bekliyor ama işler son zamanlarda pek iyi değil.",
    secenekler: [
      {
        metin: "Borca girip şehri sallayacak bir düğün yap.",
        baseBasariSansi: 75,
        maliyet: 35,
        basariliSonuc: {
          para: -35,
          mutluluk: 10,
          un: 15,
          cocuk_iliski: 10,
          mesaj: "Haftalarca konuşulan bir düğün oldu! Evladının yüzündeki gülümseme her şeye değer.",
        },
        basarisizSonuc: {
          para: -35,
          mutluluk: -4,
          cocuk_iliski: 2,
          mesaj: "Büyük masraf yaptın ama yağmur yağdı, misafirler rezil oldu. Para tamamen boşa gitti.",
        },
      },
      {
        metin: "Sade bir tören yeterli, gösterişe lüzum yok.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          mutluluk: 5,
          cocuk_iliski: 4,
          mesaj: "Küçük ama sıcak bir törenle onu uğurladın. Huzur içindesin.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -5,
          cocuk_iliski: -3,
          mesaj: "Karşı tarafın ailesi bu sadeliği 'cimrilik' olarak gördü ve tören boyunca söylendi.",
        },
      },
    ],
  },
  {
    id: "cocuk_meslek_secimi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "cocuk_var",
    ],
    minYas: 32,
    gorsel: "🧭",
    baslik: "Mirası Devretmek",
    metin: "Evladın artık meslek seçecek yaşa geldi. Kendi kurduğun işi ona devretmek istiyorsun ama o denizlere açılıp maceraya atılmak istiyor.",
    secenekler: [
      {
        metin: "Karşı çık, 'Benim işimi devralacaksın!' diye diret.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: -2,
          mutluluk: -2,
          para: 15,
          cocuk_iliski: -10,
          mesaj: "Zorla da olsa seni dinledi. Artık sana yardım ediyor, işin kazancı arttı.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -19,
          cocuk_iliski: -20,
          mesaj: "Kavga ettiniz. Eşyalarını toplayıp evden kaçtı. İşin sana, gözyaşların yastığına kaldı.",
        },
      },
      {
        metin: "Kendi yolunu seçmesine izin ver, ona harçlık ver.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          mutluluk: 5,
          ahlak: 10,
          cocuk_iliski: 12,
          mesaj: "Gemiye binerken sana sarıldı. Hayallerinin peşinden giden bir çocuk yetiştirmenin gururunu yaşıyorsun.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -10,
          cocuk_iliski: -4,
          mesaj: "Aylarca haber alamadın. Belki de bir korsan saldırısında can verdi... Endişe seni yiyip bitiriyor.",
        },
      },
    ],
  },
  {
    id: "cocuk_ziyaret",
    kategori: "sosyal",
    gerekliEtiketler: [
      "cocuk_var",
    ],
    minYas: 55,
    gorsel: "🏡",
    baslik: "Yaşlılık ve Torunlar",
    metin: "Evladın yıllar sonra torunlarınla birlikte seni ziyarete geldi. Evin içi uzun zaman sonra çocuk sesleriyle şenlendi.",
    secenekler: [
      {
        metin: "Tüm gününü onlara ayır, oyunlar oyna.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 9,
          saglik: 5,
          cocuk_iliski: 6,
          mesaj: "Torunlarınla oynamak seni 10 yaş gençleştirdi. Hayatın gerçek anlamı bu diyorsun.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          saglik: -5,
          cocuk_iliski: 3,
          mesaj: "Oyun oynarken belini incittin ama yine de değdi.",
        },
      },
      {
        metin: "Yaşlı bedenin kaldırmıyor, kısa bir sohbetle yetin.",
        baseBasariSansi: 100,
        basariliSonuc: {
          saglik: 2,
          mutluluk: 3,
          mesaj: "Gürültüden çabuk yoruldun ve odana çekildin. Yalnızlık sana daha uygun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "aile_tuccar_musteri",
    kategori: "ticaret",
    gerekliEtiketler: [
      "aile:tuccar",
    ],
    gorsel: "🤝",
    baslik: "Babanın Eski Dostu",
    metin: "Çok yaşlı, acımasız ve inanılmaz zengin bir tüccar geldi. 'Babanla yıllarca iş yaptık. Bu devasa ticaret ağını sana bırakabilirim, ama tek bir şartla: Çocuğunu benim sakat ve zalim varisimle evlendireceksin.'",
    secenekler: [
      {
        metin: "Evladımın hayatı satılık değil! Teklifi reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 30,
          mutluluk: 8,
          un: 10,
          mesaj: "Yaşlı adamı dükkânından kovdun. Çocuğun sana yaşlı gözlerle sarıldı. Zengin değilsin ama harika bir ebeveynsin.",
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          mesaj: "Adam çok sinirlendi ve babanın tüm eski ortaklarını sana düşman etti. Ticaretin ağır yara aldı.",
        },
      },
      {
        metin: "İş iştir. Çocuğunu zorla evlendir ve ağı al.",
        baseBasariSansi: 80,
        maliyet: 10,
        gerekliEtiketler: [
          "cocuk_var",
        ],
        basariliSonuc: {
          para: 70,
          maas_carpani: 1.4,
          ahlak: -40,
          mutluluk: -35,
          mesaj: "Sözleşmeyi imzaladın. Ticaret krallığının başına geçtin. Çocuğun düğün günü yüzüne bile bakmadı ve seni hayatından sildi.",
        },
        basarisizSonuc: {
          para: -15,
          ahlak: -30,
          mesaj: "Çocuğun düğün gecesi evden kaçtı! Hem ticareti alamadın hem de evladını sonsuza dek kaybettin.",
        },
      },
    ],
  },
  {
    id: "aile_soylu_davet",
    kategori: "siyaset",
    gerekliEtiketler: [
      "aile:soylu",
    ],
    gorsel: "👑",
    baslik: "Soylu Kanın Sınavı",
    metin: "Akraban olan lordlar meclisi seni gizli bir toplantıya çağırdı. Köylülere karşı yeni ve çok acımasız bir vergi planlıyorlar. Kan bağının yanında mı duracaksın, yoksa halkın mı?",
    secenekler: [
      {
        metin: "Kanımdan olanları satmam! Vergiyi onaylayın.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 40,
          un: 20,
          ahlak: -30,
          etiket_ekle: [
            "soylu_meclisi",
            "itibar:zalim_soylu",
          ],
          mesaj: "Mührünü bastın. Ailenin en saygın ferdi oldun. Köylüler yollarda açlıktan kırılırken senin şatona altınlar yağıyor.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -20,
          saglik: -15,
          mesaj: "Köylüler kararı duyunca isyan etti ve arabanı taşladılar. Kan revan içinde zor kaçtın.",
        },
      },
      {
        metin: "Bu zorbalıktır! Karşı çık ve halkı koru.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 30,
          ahlak: 35,
          para: -20,
          etiket_ekle: [
            "halkin_adami",
          ],
          etiket_sil: [
            "soylu_kani",
          ],
          mesaj: "Masayı devirdin! Soyluluk unvanını elinden aldılar ama sokakta yürürken binlerce köylü senin için dua ediyor.",
        },
        basarisizSonuc: {
          un: -20,
          para: -35,
          ahlak: 15,
          etiket_sil: [
            "soylu_kani",
          ],
          mesaj: "Ailen seni döverek meclisten attı, mallarına el koydular. Halk ise senin ne yaptığını hiç öğrenmedi.",
        },
      },
    ],
  },
  {
    id: "aile_asker_yoldas",
    kategori: "savas",
    gerekliEtiketler: [
      "aile:asker",
    ],
    gorsel: "🎖️",
    baslik: "Babanın Kanlı Kılıcı",
    metin: "Kışlada yüzü yaralı, yaşlı bir subay seni köşeye çekti: 'Babanla aynı siperdeydik. O yiğitçe öldü, seni güvende tutmamı isterdi.' Seni saray muhafızlığına geçirmeyi teklif ediyor.",
    secenekler: [
      {
        metin: "Saray Muhafızı ol. Sıcak yatak ve güvenli maaş.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 25,
          saglik: 10,
          maas_carpani: 1.15,
          etiket_ekle: [
            "muhafiz_birligi",
          ],
          mesaj: "Babanın adını kullanarak saraya kapağı attın. Arkadaşların çamurda savaşırken sen şarap içiyorsun.",
        },
        basarisizSonuc: {
          un: -20,
          mesaj: "Saray komutanı senin bir torpilli olduğunu anlayıp seni en kötü lağım nöbetlerine verdi. İtibarın sıfırlandı.",
        },
      },
      {
        metin: "Babanın eski alayına (Ölüm Birliği) geçmek için diret.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 35,
          ahlak: 15,
          saglik: -15,
          etiket_ekle: [
            "baba_alayi",
          ],
          mesaj: "Ölüm birliğine katıldın! Askerler seni görünce babanın ruhunun geri döndüğünü söylediler. Saygınlığın efsanevi boyutlarda.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 15,
          mesaj: "Babanın gölgesinden çıkmak için kendini çok zorladın ve pusuya düştün. Cesaretin az kalsın canına mal oluyordu.",
        },
      },
    ],
  },
  {
    id: "aile_kole_gecmis",
    kategori: "sosyal",
    gerekliEtiketler: [
      "aile:kole",
    ],
    gorsel: "⛓️",
    baslik: "Zincirlerin İzi",
    metin: "Babanın eski sahibi olan zalim efendinin oğlu seni bir meyhanede gördü. 'Bizim kölenin çocuğu değil mi bu?' diyerek kahkaha atıyor ve sana ayağını öpmen için bir kese altın atıyor.",
    secenekler: [
      {
        metin: "Altını al ve ayağını öp. Gurur karın doyurmaz.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 40,
          ahlak: -25,
          un: -25,
          mutluluk: -30,
          mesaj: "Ayağını öptün. Meyhanedeki herkesin önünde aşağılandın. Kesen doldu ama ruhun o zemin de ezildi kaldı.",
        },
        basarisizSonuc: {
          para: 10,
          ahlak: -30,
          un: -35,
          mesaj: "Eğildiğinde yüzüne tekme attı! Hem altını tam alamadın hem de itibarın yerle bir oldu.",
        },
      },
      {
        metin: "Masayı devir ve ona köle olmadığını göster!",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 20,
          mutluluk: 8,
          etiket_ekle: [
            "gecmisiyle_barisik",
          ],
          mesaj: "Suratına attığın yumruk adamı yere serdi. Kalabalık senin cesaretine hayran kaldı. Artık senin geçmişinle kimse dalga geçemez!",
        },
        basarisizSonuc: {
          saglik: -25,
          un: 10,
          mesaj: "Adamın korumaları seni bayılana kadar dövdü. Ama herkes senin boyun eğmeyen bir aslan olduğunu anladı.",
        },
      },
    ],
  },
  {
    id: "aile_isci_grev",
    kategori: "siyaset",
    gerekliEtiketler: [
      "aile:isci",
    ],
    gorsel: "✊",
    baslik: "İsyan Ateşi",
    metin: "Babanın yıllarca kan ter içinde çalıştığı ve hastalanıp öldüğü fabrikada işçiler ayaklandı. Fabrikayı yakmak üzereler. Sendika seni liderleri olarak görmek istiyor.",
    secenekler: [
      {
        metin: "Meşaleyi eline al! 'Babama yaptıklarınızı ödeyeceksiniz!'",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 35,
          ahlak: 20,
          para: -20,
          etiket_ekle: [
            "isci_onderi",
            "itibar:devrimci",
          ],
          mesaj: "Grevi bir devrime çevirdin! Patronlar diz çöktü. Babanın intikamını aldın ve halkın idolü oldun.",
        },
        basarisizSonuc: {
          un: -15,
          para: -30,
          saglik: -25,
          ahlak: 20,
          olum_sansi: 10,
          etiket_ekle: [
            "hapiste",
          ],
          mesaj: "Jandarma acımadı. Coplar ve atlar altında kaldınız. Vatan haini damgası yiyip zindana atıldın.",
        },
      },
      {
        metin: "Patronla gizlice görüşüp isyanı içeriden sat.",
        baseBasariSansi: 70,
        maxAhlak: 45,
        basariliSonuc: {
          para: 60,
          un: -25,
          ahlak: -40,
          maas_carpani: 1.3,
          mesaj: "Liderlerin isimlerini patrona verdin. İsyan bastırıldı. Patron seni müdür yaptı ama kendi mahallen artık senin yüzüne tükürüyor.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "İşçiler seni patronun odasından çıkarken gördü! Linç edilmekten muhafızlar sayesinde saniyelerle kurtuldun.",
        },
      },
    ],
  },
  {
    id: "aile_cellat_soyad",
    kategori: "sosyal",
    gerekliEtiketler: [
      "aile:cellat",
    ],
    gorsel: "🪓",
    baslik: "Koparan Bıçağın Oğlu",
    metin: "Aşkla sevdiğin insanın ailesi geçmişini öğrendi: 'Biz kızımızı/oğlumuzu bir cellat tohumuna vermeyiz!' dediler. Ya soyadını inkar edecek, ya da onunla yaşayacaksın.",
    secenekler: [
      {
        metin: "Babamdan utanıyorum! Soyadımı değiştiriyorum de.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 10,
          ahlak: -25,
          mutluluk: -15,
          etiket_sil: [
            "korkulan_soyad",
          ],
          mesaj: "Geçmişini reddettin. Evlendin ama babanın o üzgün gözleri ve yalan üzerine kurduğun bu hayat seni yiyip bitiriyor.",
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -15,
          mesaj: "Hem reddettin hem de sana inanmadılar. 'Kanında ölüm var' diyerek seni kapı dışarı ettiler.",
        },
      },
      {
        metin: "Korkularınızı kullanacağım! Zindancı başı ol.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 45,
          un: -20,
          ahlak: -30,
          maas_carpani: 1.3,
          etiket_ekle: [
            "devlet_isi",
            "itibar:korkulan_cellat",
          ],
          mesaj: "Aşkı boş verdin. Devletin en korkulan zindancısı oldun. Sana kız vermeyen o aile şimdi senden titreyerek korkuyor.",
        },
        basarisizSonuc: {
          un: -30,
          para: -10,
          mesaj: "Korkutmaya çalıştın ama asilzadeler senin gibi bir ayak takımını anında ezdi. İşsiz ve yalnız kaldın.",
        },
      },
    ],
  },
  {
    id: "aile_hekim_hasta",
    kategori: "saglik",
    gerekliEtiketler: [
      "aile:hekim",
    ],
    gorsel: "🌿",
    baslik: "Şifanın Bedeli",
    metin: "Bölgede salgın patladı. Kendi çocuğun/eşin ateşler içinde, aynı anda mahallenin yetimhanesindeki 10 çocuk da can çekişiyor. Elindeki annenden kalma otlar sadece 1 kişi ya da 1 grup için yeterli.",
    secenekler: [
      {
        metin: "Sadece kendi aileme (çocuğuma) ver, diğerleri umrumda değil.",
        baseBasariSansi: 90,
        gerekliEtiketler: [
          "cocuk_var",
        ],
        basariliSonuc: {
          saglik: 15,
          mutluluk: 5,
          ahlak: -30,
          un: -20,
          mesaj: "Kendi aileni kurtardın. Sabah olduğunda yetimhaneden 10 küçük ceset çıkarılırken sen pencereni sıkıca kapattın.",
        },
        basarisizSonuc: {
          saglik: 5,
          ahlak: -20,
          mesaj: "İlaç ailene tam etki etmedi ama en azından hayattalar. O ölen çocukların ahı ise üzerinde.",
        },
      },
      {
        metin: "Bu otlar herkesin hakkı! Yetimhaneye git.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 35,
          ahlak: 40,
          saglik: -15,
          etiket_ekle: [
            "sifaci_namı",
          ],
          mesaj: "Yetimleri kurtardın! Allah'ın bir lütfu olarak kendi çocuğun da bağışıklık kazandı. Şehir senin adına heykel dikecek kadar minnettar.",
        },
        basarisizSonuc: {
          cocuk_kaybet: true,
          un: 20,
          ahlak: 25,
          mutluluk: -40,
          etiket_ekle: [
            "kalici:evlat_acisi",
          ],
          mesaj: "Yetimler yaşadı... Ama eve döndüğünde kendi evladının çoktan soğuduğunu gördün. Kahraman oldun ama ruhun öldü.",
        },
      },
    ],
  },
  {
    id: "aile_kacakci_teklif",
    kategori: "ticaret",
    gerekliEtiketler: [
      "aile:kacakci",
    ],
    gorsel: "🌑",
    baslik: "Kanlı Altın",
    metin: "Babanın eski yeraltı ortakları geldi. Sarayın kasasından çaldıkları kraliyet mücevherlerini şehir dışına kaçırman için senin tünellerini kullanmak istiyorlar.",
    secenekler: [
      {
        metin: "Mücevherleri kaçır! Bu babamın mirası.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 80,
          ahlak: -35,
          un: -15,
          etiket_ekle: [
            "kacakcilik_agi",
            "sir:saray_hirsizi",
          ],
          mesaj: "Mücevherleri kaçırdın! Kral deliye döndü ama sen bir gecede akıl almaz bir zenginliğe ulaştın.",
        },
        basarisizSonuc: {
          para: -40,
          un: -30,
          saglik: -20,
          olum_sansi: 20,
          etiket_ekle: [
            "hapiste",
          ],
          mesaj: "İhbar edildin! Muhafızlar tüneli bastı. Hem servetini aldılar hem de seni zindanlara tıktılar.",
        },
      },
      {
        metin: "Ben babam gibi bir suçlu olmayacağım! İhbar et.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: 25,
          etiket_sil: [
            "karanlik_baglantilar",
          ],
          mesaj: "Adamları krala sattın! Kral sana ödül verdi ve ailenin adını temizledi.",
        },
        basarisizSonuc: {
          saglik: -35,
          ahlak: 15,
          olum_sansi: 15,
          mesaj: "İhbarını öğrendiler. Gece evini basıp seni kılıçtan geçirdiler. Dürüst olmanın bedelini kanla ödedin.",
        },
      },
    ],
  },
  {
    id: "aile_ciftci_kitlik",
    kategori: "saglik",
    gerekliEtiketler: [
      "aile:ciftci",
    ],
    gorsel: "🌾",
    baslik: "Köyden Gelen Çığlık",
    metin: "Köyünden mektup var: Kıtlık vurdu, kardeşlerin ve annen ağaç kabuğu yiyor. Senden tüm maaşını ve birikimini göndermeni istiyorlar. Ama senin de şehirde bakman gereken bir ailen var.",
    secenekler: [
      {
        metin: "Kendi çocuğumun/eşimin rızkını kesip köye gönder.",
        baseBasariSansi: 85,
        maliyet: 30,
        gerekliEtiketler: [
          "cocuk_var",
        ],
        basariliSonuc: {
          para: -30,
          ahlak: 35,
          un: 15,
          mutluluk: -15,
          saglik: -10,
          etiket_ekle: [
            "koy_destegi",
          ],
          mesaj: "Köydeki kardeşlerin senin paranla hayatta kaldı. Ancak kendi çocuğun haftalarca aç uyudu ve sana nefretle baktı.",
        },
        basarisizSonuc: {
          para: -30,
          mutluluk: -25,
          saglik: -15,
          mesaj: "Parayı gönderdin ama yolda haydutlar kesti. Hem kendi ailen aç kaldı hem de köydekiler yardımsız öldü.",
        },
      },
      {
        metin: "Evim burası. Köydekiler başının çaresine baksın.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: 5,
          ahlak: -30,
          mutluluk: -10,
          mesaj: "Paranı kendine sakladın. Kendi çocukların tok uyudu. Aylar sonra köyden gelen tek haber annenin öldüğü oldu.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "genel_kayip_cocuk_arama",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "🔦",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kaybolan Çocuk",
    metin: "Mahallede bir çocuk kayboldu; karanlık basıyor ve herkes arama için gönüllü topluyor.",
    secenekler: [
      {
        metin: "Aramaya katıl.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 25,
          ahlak: 25,
          saglik: -8,
          mesaj: "Çocuğu eski bir değirmende sen buldun; ailesi sana minnettar kaldı.",
          detay: "O gece attığın her adım değdi; annenin gözyaşları hâlâ aklında.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Bütün gece aradınız, çocuğu başka bir grup buldu.",
          detay: "Elinden geleni yaptın; sonucu değiştirmedi ama çabanı değersiz kılmadı.",
        },
      },
      {
        metin: "Evinde kal, karışma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Evde kaldın; çocuk sabaha karşı kendi kendine bulundu.",
          detay: "İyi bitti ama katılmadığın için içinde hafif bir suçluluk var.",
        },
        basarisizSonuc: {
          un: -12,
          ahlak: -10,
          mesaj: "Komşuların 'herkes aradı, sen neredeydin' diye sordu.",
          detay: "Bazen katılmamak bile bir bedel getiriyor.",
        },
      },
    ],
  },
  {
    id: "orgut_cocuk_katilimi",
    kategori: "siyaset",
    minYas: 35,
    gerekliEtiketler: [
      "orgut_secildi",
      "cocuk_var",
    ],
    agirlik: 0.8,
    ton: "agir",
    gorsel: "🌑",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Karanlık Miras",
    metin: "Üyesi olduğun gizli örgütün liderleri seninle gizlice buluştu. Kendi evladını yıllardır izlediklerini ve onu da örgüte katmak istediklerini söylüyorlar. Bu, çocuğunun hayatını sonsuza dek karanlığa gömebilir.",
    secenekler: [
      {
        metin: "Evladımı da aranıza alın. Mirasım devam etsin.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 25,
          para: 40,
          ahlak: -35,
          mutluluk: -15,
          mesaj: "Çocuğun yeminini etti ve gölgelere karıştı. Örgüt içinde ailenin yeri efsaneleşti.",
          detay: "Çok güçlüsünüz. Ama artık akşam yemeklerinde çocuğunun gözlerindeki o masumiyetin öldüğünü görüyorsun.",
        },
        basarisizSonuc: {
          ahlak: -20,
          mutluluk: -25,
          mesaj: "Evladın ritüel sırasında korkup kaçmaya çalıştı. Örgüt onu cezalandırdı.",
          detay: "Hem çocuğunun kalbini kırdın hem de örgüt seni beceriksiz bir ebeveyn olarak mimledi.",
        },
      },
      {
        metin: "Asla! Çocuğum bu kirli işlere bulaşmayacak.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 40,
          mutluluk: 10,
          un: -15,
          etiket_sil: [
            "orgut_secildi",
          ],
          mesaj: "Silahını çektin ve liderlere meydan okudun. Seni örgütten aforoz ettiler ama evladını kurtardın.",
          detay: "Artık sıradan ve tehlikede bir insansın ama ebeveynliğinle gurur duyuyorsun.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Reddettiğin an saldırıya uğradın! Ağır yaralanıp evladınla birlikte şehirden zar zor kaçtınız.",
          detay: "Her şeyini geride bıraktın. Sefalet içindesiniz ama berabersiniz.",
        },
      },
    ],
  },
  {
    id: "aile_ikilem_cocugun_egitimi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "cocuk_var",
    ],
    agirlik: 1,
    gorsel: "📚",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Çocuğunun Geleceği",
    metin: "{cocuk} yetenekli bir ustanın yanında eğitim görmek istiyor ama bu, biriktirdiğin paranın büyük bölümünü yutacak. Ya bu fırsata yatırım yaparsın ya da parayı kendi geleceğin için saklarsın.",
    secenekler: [
      {
        metin: "Parayı harca, {cocuk}'un eğitimine yatırım yap.",
        baseBasariSansi: 80,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          mutluluk: 6,
          ahlak: 8,
          mesaj: "{cocuk} eğitimine başladı, gözlerindeki heyecan her kuruşa değdi.",
          detay: "Bazı yatırımların meyvesi yıllar sonra toplanır.",
        },
        basarisizSonuc: {
          para: -25,
          mutluluk: -4,
          mesaj: "Eğitim başladı ama {cocuk} zorlandı; yine de elinden geleni yapıyor.",
          detay: "Her yatırım hemen meyve vermez.",
        },
      },
      {
        metin: "Parayı sakla, kendi geleceğini güvenceye al.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -10,
          mesaj: "Parayı sakladın; {cocuk} hayal kırıklığına uğradı ama cüzdanın güvende.",
          detay: "Bazı güvenceler sevdiklerinin hayaliyle takas ediliyor.",
        },
        basarisizSonuc: {
          mutluluk: -18,
          mesaj: "{cocuk} bu kararı hiç unutmadı; aranızda sessiz bir mesafe oluştu.",
          detay: "Bazı kararların bedeli yıllarca ödeniyor.",
        },
      },
    ],
  },
  {
    id: "aile_ikilem_yasli_ebeveyn_bakimi",
    kategori: "sosyal",
    minYas: 28,
    agirlik: 0.9,
    gorsel: "🧓",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yaşlanan Eller",
    metin: "{baba} ile {anne} artık eskisi gibi güçlü değil; ikisinin de düzenli bakıma, belki bir yardımcıya ihtiyacı var. Bu hem paranı hem zamanını alacak — ama seni büyüten onlar.",
    secenekler: [
      {
        metin: "Düzenli bakım için para ayır, sık sık ziyaret et.",
        baseBasariSansi: 85,
        maliyet: 15,
        basariliSonuc: {
          para: -15,
          ahlak: 10,
          mutluluk: 4,
          mesaj: "{anne} ile {baba} artık daha rahat; yüzlerindeki minnet her kuruşa değdi.",
          detay: "Bazı borçlar parayla değil, zamanla ödenir.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -4,
          mesaj: "Elinden geleni yaptın ama yaşlılığın getirdiği dertler bitmek bilmiyor.",
          detay: "Bazı yükler hiç hafiflemiyor, sadece paylaşılıyor.",
        },
      },
      {
        metin: "Kendi işine ve ailene odaklan, ara sıra uğra.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: -12,
          mutluluk: -5,
          mesaj: "İşine odaklandın; {anne} ile {baba} idare ediyor ama sesindeki hüznü fark ediyorsun.",
          detay: "Zaman, geri alamayacağın tek şey.",
        },
        basarisizSonuc: {
          ahlak: -15,
          mutluluk: -12,
          un: -5,
          mesaj: "Komşular seni 'ailesine bakmayan' diye konuşmaya başladı; {baba} bunu sana hiç söylemedi ama kırıldığını biliyorsun.",
          detay: "Sessiz kırgınlıklar en derin olanlarıdır.",
        },
      },
    ],
  },
  {
    id: "aile_ikilem_esin_hayali",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    agirlik: 1,
    gorsel: "✨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Eşinin Hayali",
    metin: "{es} yıllardır biriktirdiği bir hayalini gerçekleştirmek istiyor: kendi işini kurmak. Bunun için ailenin birikiminin önemli bir kısmına ihtiyacı var. Riskli ama gözlerindeki ışığı görüyorsun.",
    secenekler: [
      {
        metin: "Birikimi ver, hayalini destekle.",
        baseBasariSansi: 65,
        maliyet: 30,
        basariliSonuc: {
          para: -30,
          es_puani: 20,
          mutluluk: 8,
          mesaj: "{es} işine başladı; gözlerindeki heyecan yıllar sonra ilk kez bu kadar parlaktı.",
          detay: "Bazı yatırımlar bilançoda değil, ilişkide görünür.",
        },
        basarisizSonuc: {
          para: -30,
          es_puani: 5,
          mutluluk: -5,
          mesaj: "Girişim umduğu gibi gitmedi; para gitti ama {es} en azından denediğin için sana minnettar.",
          detay: "Bazen sonuç değil, destek önemlidir.",
        },
      },
      {
        metin: "Hayır de, birikimi güvenceye al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          es_puani: -15,
          mutluluk: -8,
          mesaj: "Reddettin; {es} anlayışla karşılasa da gözlerindeki ışık biraz söndü.",
          detay: "Güvenlik bazen bir hayalin bedeliyle satın alınıyor.",
        },
        basarisizSonuc: {
          es_puani: -25,
          mutluluk: -12,
          mesaj: "{es} bu reddi hiç unutmadı; aranızda konuşulmayan bir kırgınlık oluştu.",
          detay: "Bazı hayır'lar evliliğe iz bırakır.",
        },
      },
    ],
  },
  {
    id: "aile_ikilem_kardesin_borcu",
    kategori: "sosyal",
    minYas: 20,
    agirlik: 0.8,
    gorsel: "🎴",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kumar Borcu",
    metin: "Bir akraban kapına dayandı: kumarda büyük bir borca girmiş, alacaklılar tehdit ediyor. Senden borcu kapatmanı istiyor, yoksa 'neler olabileceğini' bile söylemiyor.",
    secenekler: [
      {
        metin: "Borcu öde, aile huzurunu koru.",
        baseBasariSansi: 90,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          dost_puani: 10,
          ahlak: 5,
          mesaj: "Borcu kapattın; akraban gözyaşlarıyla teşekkür etti, bir daha asla demeye yemin etti.",
          detay: "Kaç kere 'bir daha asla' dediğini duydun ama yine de yaptın.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Borcu kapattın ama akraban bir ay sonra yine kapına dayandı.",
          detay: "Bazı alışkanlıklar bir seferde bitmiyor.",
        },
      },
      {
        metin: "Reddet, kendi sorununu kendi çözsün.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Reddettin; akraban öfkeyle çıktı ama sorununu kendi başına çözdü.",
          detay: "Bazen sert sevgi en doğrusudur.",
        },
        basarisizSonuc: {
          un: -10,
          mutluluk: -8,
          mesaj: "Alacaklılar meseleyi büyüttü, aile adı mahallede lekelendi.",
          detay: "Reddin bazen daha büyük bir bedelle geri dönüyor.",
        },
      },
    ],
  },
  {
    id: "aile_ikilem_cocugun_secimi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "cocuk_var",
    ],
    minYas: 32,
    agirlik: 0.9,
    gorsel: "🎭",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Farklı Bir Yol",
    metin: "{cocuk}, senin mesleğini değil, toplumun pek de saygın bulmadığı bir sanatı (gezici tiyatro, sokak müziği) seçmek istediğini açıkladı. Kararını duyunca içinde hem gurur hem korku var.",
    secenekler: [
      {
        metin: "Kararını destekle, yolunu açık et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 7,
          un: -10,
          ahlak: 8,
          mesaj: "{cocuk} gözleri dolu dolu sana sarıldı. Mahallede biraz dedikodu çıksa da vicdanın huzurlu.",
          detay: "Bazı gururlar toplumun gözünde değil, evin içinde parlar.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          un: -15,
          mesaj: "Desteğin sevindirdi ama komşular seni 'çocuğuna hakim olamayan' diye eleştirdi.",
          detay: "Her destek alkışla karşılanmıyor.",
        },
      },
      {
        metin: "Israrla aile mesleğine yönlendir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          mutluluk: -15,
          mesaj: "{cocuk} isteksizce de olsa senin yolunu seçti; gözlerindeki ışık bir daha eskisi gibi olmadı.",
          detay: "Bazı zaferler kaybetmekten farksızdır.",
        },
        basarisizSonuc: {
          mutluluk: -20,
          dost_puani: -10,
          mesaj: "{cocuk} evi terk etti; yıllarca haber alamadın.",
          detay: "Israrın bazen elindekini de kaybettiriyor.",
        },
      },
    ],
  },
  {
    id: "aile_ikilem_miras_kavgasi",
    kategori: "sosyal",
    minYas: 30,
    agirlik: 0.7,
    gorsel: "📜",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Mirasın Payı",
    metin: "Uzak bir akraban vefat etti ve geride bıraktığı mülk üzerine akrabalar arasında çirkin bir kavga başladı. Payına düşeni sonuna kadar savunabilir ya da huzur için geri çekilebilirsin.",
    secenekler: [
      {
        metin: "Avukat tut, hakkını sonuna kadar ara.",
        baseBasariSansi: 55,
        maliyet: 12,
        basariliSonuc: {
          para: 40,
          ahlak: -8,
          dost_puani: -10,
          mesaj: "Mahkeme lehine sonuçlandı; payını aldın ama akraban seni bir daha hiç aramadı.",
          detay: "Kazandığın altın, kaybettiğin akrabalıktan ağır bastı mı, bilemiyorsun.",
        },
        basarisizSonuc: {
          para: -12,
          dost_puani: -15,
          mesaj: "Davayı kaybettin; hem masraf cebinden gitti hem de aile içinde düşman kazandın.",
          detay: "Bazı kavgalarda kimse kazanmıyor.",
        },
      },
      {
        metin: "Payından vazgeç, aile huzurunu seç.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          dost_puani: 12,
          mesaj: "Payından vazgeçtin; akraban şaşkınlıkla teşekkür etti, aile bağların güçlendi.",
          detay: "Bazı zenginlikler altınla ölçülmez.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Vazgeçtin ama diğer akrabalar bunu 'zayıflık' diye yorumlayıp seni hafife aldı.",
          detay: "İyilik her zaman takdir edilmiyor.",
        },
      },
    ],
  },
  {
    id: "aile_ikilem_ikisi_bir_arada",
    kategori: "sosyal",
    agirlik: 0.8,
    gorsel: "🎉",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "İki Davet, Tek Gün",
    metin: "{dost}'un en önemli günü ile hayatının en büyük iş fırsatının görüşmesi tam olarak aynı güne denk geldi. İkisine birden yetişemezsin.",
    secenekler: [
      {
        metin: "{dost}'un yanında ol.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 18,
          mutluluk: 5,
          para: -10,
          mesaj: "{dost}'un yanında oldun; gözlerindeki mutluluk, kaçırdığın fırsata değdi.",
          detay: "Bazı anlar bir daha asla geri gelmiyor, tıpkı kaçırılan fırsatlar gibi.",
        },
        basarisizSonuc: {
          dost_puani: 10,
          para: -10,
          mesaj: "Oradaydın ama fırsatı kaçırdığın için içinde bir pişmanlık kaldı.",
          detay: "Doğru seçim bile bazen hafif acıtıyor.",
        },
      },
      {
        metin: "İş görüşmesine git.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: -11,
          para: 35,
          un: 4,
          dost_puani: -20,
          mesaj: "Görüşme harika geçti, büyük bir fırsatı kaptın. {dost} ise seni bir daha eskisi gibi aramadı.",
          detay: "Kariyerin yükseldi ama masanda artık bir sandalye eksik.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -5,
          dost_puani: -20,
          mesaj: "Görüşme de umduğun gibi gitmedi, üstüne {dost}'u da kırdın.",
          detay: "Bazı günler hem iş hem gönül kaybettiriyor.",
        },
      },
    ],
  },
  {
    id: "aile_koken_kole_onyargi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "aile:kole",
    ],
    minYas: 18,
    agirlik: 0.8,
    gorsel: "⛓️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Eski Bir Gölge",
    metin: "Girmek istediğin loncanın ustabaşı, ailenin köle geçmişini hatırlatarak üyeliğini reddetti: 'Bu çatı altında senin soyundan biri olmaz' dedi. Sözleri hâlâ kulaklarında çınlıyor.",
    secenekler: [
      {
        metin: "Herkesin önünde ona meydan oku, hakkını savun.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: 15,
          un: 10,
          mesaj: "Sözlerin lonca içinde yankı buldu; bazı üyeler sessizce seni desteklediğini belli etti.",
          detay: "Bazı meydan okumalar zamanla meyve veriyor.",
        },
        basarisizSonuc: {
          un: -15,
          dost_puani: -8,
          mesaj: "Ustabaşı seni 'küstah' ilan edip lonca kapılarını sonsuza dek kapattı.",
          detay: "Her meydan okuma kazanılmıyor.",
        },
      },
      {
        metin: "Sessizce çekil, iki kat çalışıp kendini başka bir yolla kanıtla.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: -6,
          para: 15,
          un: 6,
          mesaj: "Yıllar içinde bağımsız çalışman öyle bir üne kavuştu ki, o lonca artık seni kendi bünyesine katmak istiyor.",
          detay: "Sabır bazen en keskin cevaptır.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -10,
          mesaj: "Çabaların yavaş ilerledi, önyargı kolay kolay kırılmadı.",
          detay: "Bazı duvarlar tek başına yıkılmıyor.",
        },
      },
    ],
  },
  {
    id: "aile_koken_soylu_ayricalik",
    kategori: "sosyal",
    gerekliEtiketler: [
      "aile:soylu",
    ],
    minYas: 20,
    agirlik: 0.8,
    gorsel: "🏰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Eski Bir Borç",
    metin: "Yaşlı bir çiftçi kapına geldi: büyük dedenin toprağını haksız yere ellerinden aldığını, hâlâ o borcun ailesinin sırtında olduğunu söylüyor. Elinde eski, sararmış bir belge var.",
    secenekler: [
      {
        metin: "Belgeyi incele, haklıysa tazminat öde.",
        baseBasariSansi: 80,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          ahlak: 18,
          un: 8,
          mesaj: "Belge gerçekmiş; tazminatı ödedin, yaşlı adam gözyaşlarıyla teşekkür etti.",
          detay: "Bazı borçlar nesiller sonra bile ödenmeyi hak ediyor.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Ödedin ama adam yine de kırgınlığını tam olarak atlatamadı.",
          detay: "Bazı yaralar parayla tam kapanmıyor.",
        },
      },
      {
        metin: "Soylu nüfuzunu kullanarak adamı kapından uzaklaştır.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: -18,
          mesaj: "Adamı kovdurdun; kimse sana karşı gelemedi ama içinde bir şey rahatsız etti.",
          detay: "Ayrıcalık bazen vicdanı susturuyor, öldürmüyor.",
        },
        basarisizSonuc: {
          ahlak: -18,
          un: -12,
          mesaj: "Adamın hikayesi mahallede yayıldı; 'zalim soylu' söylentileri seni takip etmeye başladı.",
          detay: "Bazı gerçekler susturulamıyor.",
        },
      },
    ],
  },
  {
    id: "aile_koken_tefeci_borc_defteri",
    kategori: "ticaret",
    gerekliEtiketler: [
      "aile:tefeci",
    ],
    minYas: 20,
    agirlik: 0.8,
    gorsel: "📒",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Babanın Defteri",
    metin: "Babandan kalma eski borç defterini karıştırırken, hâlâ ödenmemiş onlarca ismi gördün — bazıları artık yaşlı, yoksul, çaresiz. Defter, hâlâ tahsil edilebilir bir servet demek.",
    secenekler: [
      {
        metin: "Defterdeki tüm borçları acımasızca tahsil et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 55,
          ahlak: -20,
          un: -10,
          mesaj: "Borçları tek tek tahsil ettin; kasan doldu ama mahallede babanın lakabı sana da yapıştı.",
          detay: "Bazı miraslar zenginlik kadar nefret de taşıyor.",
        },
        basarisizSonuc: {
          para: 20,
          ahlak: -20,
          un: -18,
          mesaj: "Bazı borçlular seni açıkça lanetledi, biri seni tehdit bile etti.",
          detay: "Acımasız tahsilat bazen düşman biriktiriyor.",
        },
      },
      {
        metin: "Defteri yak, herkesi borcundan kurtar.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Defteri ateşe attığın haberi mahallede hızla yayıldı; babanın lekeli adı senin sayende biraz aklandı.",
          detay: "Bazı zenginlikler yakılmaya değer.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Defteri yaktın ama bazı eski borçlular bunun bir numara olduğunu düşünüp sana hâlâ mesafeli.",
          detay: "Güven bir günde inşa edilmiyor.",
        },
      },
    ],
  },
  {
    id: "aile_koken_kacakci_eski_baglanti",
    kategori: "ticaret",
    ton: "agir",
    gerekliEtiketler: [
      "aile:kacakci",
    ],
    minYas: 20,
    agirlik: 0.8,
    gorsel: "🌙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Eski Bir Yüz",
    metin: "Karanlık bir sokakta, babanın eski kaçakçılık ortağı karşına çıktı. Sınırın öte yakasından gelen değerli ama yasak bir malı, hiç sorgusuz sualsiz senin üzerinden geçirmek istiyor.",
    secenekler: [
      {
        metin: "Teklifi kabul et, aile mesleğine geri dön.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 50,
          ahlak: -18,
          mesaj: "Mal sorunsuz elden geçti; kasan doldu ama babanın izinden gittiğini fark ettin.",
          detay: "Bazı kanlar bir türlü değişmiyor.",
        },
        basarisizSonuc: {
          para: -25,
          un: -20,
          ahlak: -18,
          olum_sansi: 10,
          mesaj: "Devriye son anda sizi yakaladı; zar zor kaçtın ama malı ve parayı kaybettin.",
          detay: "Eski hayatlar seni bazen tuzağa çekiyor.",
        },
      },
      {
        metin: "Reddet, o hayatı geride bıraktığını hatırlat.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Teklifi reddettin; adam omuz silkip karanlığa karıştı, sen ise hafiflemiş hissettin.",
          detay: "Geçmişi reddetmek de bir cesarettir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Reddin eski çevrede 'artık bizden değil' diye dolaşmaya başladı.",
          detay: "Bazı kapılar bir kez kapatılınca geri açılmıyor.",
        },
      },
    ],
  },
  {
    id: "aile_koken_cellat_damgasi",
    kategori: "siyaset",
    ton: "agir",
    gerekliEtiketler: [
      "aile:cellat",
    ],
    minYas: 20,
    agirlik: 0.7,
    gorsel: "🪓",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kanın Çağırdığı Görev",
    metin: "Yerel yetkililer, babanın eski mesleğini bildikleri için senden bir infazı bizzat gerçekleştirmeni istiyor: 'Bu iş zaten kanında var' diyorlar. Reddetmen tuhaf karşılanacak ama kabul etmen seni sonsuza dek damgalayacak.",
    secenekler: [
      {
        metin: "Reddet, bu kaderin senin olmadığını söyle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 20,
          un: -10,
          mesaj: "Reddettin; yetkililer başka birini buldu, sen ise babanın gölgesinden bir adım daha uzaklaştın.",
          detay: "Kader bazen reddedilmeyi bekliyor.",
        },
        basarisizSonuc: {
          un: -18,
          para: -10,
          mesaj: "Reddin 'ailesinin görevinden kaçan biri' diye anlatılır oldu, bazı kapılar kapandı.",
          detay: "Geçmişten kaçmanın da bir bedeli var.",
        },
      },
      {
        metin: "Kabul et, aile mesleğinin devamı ol.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: 25,
          un: 10,
          ahlak: -20,
          mesaj: "Görevi yerine getirdin; yetkililer memnun ama artık sokakta seni gören çocuklar bile fısıldaşıyor.",
          detay: "Bazı miraslar seni sonsuza dek etiketliyor.",
        },
        basarisizSonuc: {
          ahlak: -20,
          mutluluk: -12,
          mesaj: "Görevi zar zor tamamladın; o geceden beri uykuların huzursuz.",
          detay: "Kanında olsa da bu yük hafif değil.",
        },
      },
    ],
  },
  {
    id: "aile_koken_saray_sirlari",
    kategori: "siyaset",
    gerekliEtiketler: [
      "aile:saray",
    ],
    minYas: 20,
    agirlik: 0.8,
    gorsel: "🗝️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Annenin Bildiği Sır",
    metin: "Annenin eski saray günlerinden kalma bir sırrı hatırladın: nüfuzlu bir soylunun utanç verici bir geçmişi. Bu bilgi sana büyük bir avantaj sağlayabilir ya da sessizce gömülmeyi hak ediyor olabilir.",
    secenekler: [
      {
        metin: "Sırrı kullanarak soyludan avantaj kopar.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 35,
          un: 10,
          ahlak: -18,
          mesaj: "Soylu, sırrının açığa çıkmasından korkup istediğini verdi; kazandın ama annenin öğrettiği sadakat ilkesini çiğnedin.",
          detay: "Bazı kazançlar bir yeminin üzerine kurulu.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -18,
          mesaj: "Soylu şantaja boyun eğmek yerine seni gözden düşürmeyi seçti.",
          detay: "Bazı kumarlar geri tepiyor.",
        },
      },
      {
        metin: "Sırrı sonsuza dek sakla, annenin sadakat yeminine bağlı kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Sırrı hiç kullanmadın; annenin öğrettiği o eski saray sadakatini yaşatmış oldun.",
          detay: "Bazı miraslar altından daha değerli.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sessizliğin karşılığında hiçbir şey kazanmadın, sadece huzurunu korudun.",
          detay: "Erdemin ödülü her zaman somut değildir.",
        },
      },
    ],
  },
  {
    id: "aile_koken_surgun_geri_donus",
    kategori: "siyaset",
    gerekliEtiketler: [
      "aile:surgun",
    ],
    minYas: 25,
    agirlik: 0.7,
    gorsel: "🏞️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Affedilen Bir Soy",
    metin: "Aileni sürgün eden hükümdarın torunu, geçmişin hatalarını telafi etmek adına ailene resmi bir af çıkardı. Atalarının topraklarına dönüp mirasını geri alabilirsin — ama burada, şimdiki hayatını bırakman gerekecek.",
    secenekler: [
      {
        metin: "Her şeyi bırak, atalarının topraklarına dön.",
        baseBasariSansi: 65,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          mutluluk: 9,
          ahlak: 10,
          mesaj: "Atalarının topraklarına ilk adımını attığında gözlerin doldu; nesillerdir taşınan bir hasret sonunda dindi.",
          detay: "Bazı yolculuklar parayla değil, ruhla ölçülür.",
        },
        basarisizSonuc: {
          para: -20,
          mutluluk: -10,
          mesaj: "Dönüş umduğun gibi olmadı; eski topraklar artık tanıdık değildi, kendini iki dünya arasında kayıp hissettin.",
          detay: "Bazı eve dönüşler hayal kırıklığıyla sonuçlanıyor.",
        },
      },
      {
        metin: "Burada kal, kurduğun hayatı koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Affı kabul etmedin; hayatın burada devam etti ama atalarının toprağını hiç görmemiş olmak içinde hafif bir boşluk bıraktı.",
          detay: "Bazı kapılar kapalı kalmayı da hak ediyor.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kararını sorguladıkça içindeki huzursuzluk büyüdü.",
          detay: "Bazı sorular yıllarca cevapsız kalıyor.",
        },
      },
    ],
  },
  {
    id: "aile_koken_madenci_cokme_anisi",
    kategori: "saglik",
    ton: "agir",
    gerekliEtiketler: [
      "aile:madenci",
    ],
    minYas: 20,
    agirlik: 0.8,
    gorsel: "⛏️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yeraltından Gelen Haber",
    metin: "Amcanın da içinde kaldığı o eski maden gibi, yakındaki bir maden çöktü; onlarca işçi mahsur kaldı. Kurtarma ekibine gönüllü katılabilir ya da güvenli bir mesafeden para bağışlayabilirsin.",
    secenekler: [
      {
        metin: "Kurtarma ekibine bizzat katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 20,
          saglik: -10,
          mesaj: "Karanlık tünellerde saatlerce çalıştın; birkaç işçiyi canlı çıkardığınızda gözyaşlarına engel olamadın.",
          detay: "Amcanın alamadığı yardımı, sen başkalarına ulaştırdın.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          mesaj: "Tünel senin de üzerine çökmeye başladı; güçlükle, ağır yaralı çıkarıldın.",
          detay: "Yeraltı, aileni bir kez daha sınadı.",
        },
      },
      {
        metin: "Güvenli bir mesafeden cömert bir bağış yap.",
        baseBasariSansi: 90,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 10,
          ahlak: 8,
          mesaj: "Bağışın kurtarma ekibinin donanımını güçlendirdi; birçok işçi sayende kurtuldu.",
          detay: "Her kahramanlık yeraltında geçmiyor.",
        },
        basarisizSonuc: {
          para: -20,
          mutluluk: -5,
          mesaj: "Bağışına rağmen kurtarma yetersiz kaldı; amcanın hikayesinin bir kez daha tekrarlandığını hissettin.",
          detay: "Bazı acılar tarih tekerrür ediyor.",
        },
      },
    ],
  },
];
