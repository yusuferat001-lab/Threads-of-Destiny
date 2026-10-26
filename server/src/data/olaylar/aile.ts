import type { OlayTanimi } from "./types";

export const OLAY_AILE: OlayTanimi[] = [
  {
    id: "iliski_cocuk_mujdesi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "👶",
    baslik: "Bir Varis Doğuyor",
    metin: "{es} müjde verdi: aile büyüyor! Ama {es}'in bünyesi zayıf, doğum çok riskli.",
    secenekler: [
      {
        metin: "En iyi ebeyi ve doktoru tut.",
        baseBasariSansi: 85,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          cocuk_ekle: 1,
          mutluluk: 10,
          es_puani: 15,
          mesaj: "Para esirgemedin; {es} ve çocuk sağ salim kurtuldu! Evde bayram var.",
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
          mesaj: "Para kaderi değiştirmedi. Çocuk doğdu ama {es} doğum yatağında öldü.",
        },
      },
      {
        metin: "Param yok, köy ebesine güven.",
        baseBasariSansi: 40,
        basariliSonuc: {
          cocuk_ekle: 1,
          mutluluk: 8,
          mesaj: "Tanrı'nın lütfu! Masrafsız, şans eseri sağlıklı bir çocuk doğdu.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -40,
          saglik: -15,
          etiket_ekle: [
            "kalici:es_acisi",
            "kalici:cocuk_acisi",
          ],
          mesaj: "Ucuz ebe kanamayı durduramadı. En karanlık gecende {es}'i ve bebeği kaybettin.",
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
    metin: "Sarayda adının geçtiği bir fısıltı duydun: bir kuzenin ya da güçlü bir rakip yükselişinden rahatsız. Kadehte tuhaf tat, gölgede adamlar...",
    secenekler: [
      {
        metin: "Tehdidi boşver, korumayı artır.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          etiket_ekle: [
            "itibar:korkusuz_soylu",
          ],
          mesaj: "Soğukkanlı kaldın. Düşmanların geri çekildi; adın sarayda saygıyla anılıyor.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 20,
          durum_ekle: {
            id: "suikast_yarasi",
            ad: "Suikast Yarası",
            tur: "kalici",
            yil_basi_saglik: -0.7,
          },
          mesaj: "Gölgeden zehirli bir hançer çıktı. Zor kurtuldun, yaran hiç tam iyileşmeyecek.",
        },
      },
      {
        metin: "Karanlık adamlar tut, önce sen vur.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: -25,
          un: 10,
          etiket_ekle: [
            "sir:kanli_eller",
          ],
          mesaj: "Kuzenin 'talihsiz at kazasında' öldü. Güvendesin ama aynada katil görüyorsun.",
        },
        basarisizSonuc: {
          ahlak: -15,
          saglik: -20,
          olum_sansi: 15,
          mesaj: "Adamlar beceriksizdi, adını verdi! Misilleme az kalsın canına mal oluyordu.",
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
    metin: "Evladın gözlerini açtı, ateşi düştü ve senden su istedi.",
    secenekler: [
      {
        metin: "Sevin, Tanrı'ya şükret.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 10,
          saglik: 5,
          etiket_sil: [
            "cocuk_saglik_zamani:iyi",
          ],
          mesaj: "Korku gözyaşına döndü. Çocuğun yaşıyor!",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Önce nabzını kontrol et, sonra sevin.",
        baseBasariSansi: 100,
        basariliSonuc: {
          saglik: 8,
          mutluluk: 6,
          etiket_sil: [
            "cocuk_saglik_zamani:iyi",
          ],
          mesaj: "Alnına dokunup ateşin düştüğünden emin oldun, sonra gülümsedin. Çocuğun yaşıyor!",
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
    metin: "Korkulan oldu. Ateş hiç düşmedi, küçük beden soğumaya başladı. Hekimler odayı sessizce terk ediyor.",
    secenekler: [
      {
        metin: "Sarıl, uyanması için yalvar.",
        baseBasariSansi: 20,
        basariliSonuc: {
          saglik: 3,
          mutluluk: 8,
          etiket_sil: [
            "cocuk_saglik_zamani:kotu",
          ],
          mesaj: "Gözyaşın yüzüne düştü; öksürüp nefes aldı! Ölmemiş, derin komadaymış!",
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
          mesaj: "Ne bağırsan o gözler açılmadı. Onu kendi ellerinle toprağa verdin.",
        },
      },
      {
        metin: "Gerçeği kabul et, cenazeyi hazırla.",
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
          mesaj: "Ağlamaya mecalin yok. Bir parçan o tabutla gömüldü.",
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
    metin: "Pazarda bağırış koptu: bir kumaşçı çocuğunu yakasından sürüklüyor, 'Hırsız!' diyor. Muhafızlar yaklaşıyor.",
    secenekler: [
      {
        metin: "Muhafıza ve tüccara rüşvet ver.",
        baseBasariSansi: 85,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          ahlak: -15,
          etiket_ekle: [
            "sorunlu_cocuk",
          ],
          mesaj: "Rüşvet işledi; tüccar vazgeçti. Çocuk adaletin satıldığını gördü.",
        },
        basarisizSonuc: {
          para: -25,
          un: -20,
          mesaj: "Rüşveti aldılar, yine de çocuğa herkesin içinde hırsız dediler. Adın lekelendi.",
        },
      },
      {
        metin: "Suçu üstlen: 'Benim emrimle çaldı.'",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: -15,
          ahlak: 20,
          etiket_ekle: [
            "hapiste",
          ],
          mesaj: "Çocuğu ittin, ellerini uzattın. Zincire vurulurken çocuğun arkandan ağladı.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: 10,
          etiket_ekle: [
            "hapiste",
            "sorunlu_cocuk",
          ],
          mesaj: "'İkinizi de atarız' dediler. İkiniz de zincirlendiniz; onun sicili lekeli.",
        },
      },
      {
        metin: "Herkesin önünde tokatla, teslim et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 20,
          mutluluk: -15,
          mesaj: "Tokatlayıp teslim ettin. Halk övdü ama çocuğun nefretini unutmayacaksın.",
        },
        basarisizSonuc: {
          mutluluk: -20,
          mesaj: "Vurdun ama tüccar yetinmedi. İkinizi sokakta aşağıladılar.",
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
    metin: "Evladın evleniyor. Aile büyük düğün bekliyor ama işler son zamanlarda kötü.",
    secenekler: [
      {
        metin: "Borca gir, şehri sallayan düğün yap.",
        baseBasariSansi: 75,
        maliyet: 35,
        basariliSonuc: {
          para: -35,
          mutluluk: 10,
          un: 15,
          cocuk_iliski: 10,
          mesaj: "Haftalarca konuşulan bir düğün oldu! Evladının gülüşü her şeye değdi.",
        },
        basarisizSonuc: {
          para: -35,
          mutluluk: -4,
          cocuk_iliski: 2,
          mesaj: "Büyük masraf yaptın ama yağmur yağdı, misafirler rezil oldu. Para boşa gitti.",
        },
      },
      {
        metin: "Sade tören yeter.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          mutluluk: 5,
          cocuk_iliski: 4,
          mesaj: "Küçük ama sıcak bir törenle uğurladın. Huzurlusun.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -5,
          cocuk_iliski: -3,
          mesaj: "Karşı aile sadeliği 'cimrilik' sayıp tören boyunca söylendi.",
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
    metin: "Evladın meslek seçecek yaşta. İşini ona devretmek istiyorsun ama o denizlere açılıp maceraya atılmak istiyor.",
    secenekler: [
      {
        metin: "Diren: 'İşimi devralacaksın!'",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: -2,
          mutluluk: -2,
          para: 15,
          cocuk_iliski: -10,
          mesaj: "Zorla da olsa dinledi. Artık sana yardım ediyor, kazanç arttı.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -19,
          cocuk_iliski: -20,
          mesaj: "Kavga ettiniz; eşyalarını toplayıp kaçtı. İş sana, gözyaşı yastığına kaldı.",
        },
      },
      {
        metin: "Yolunu seçsin, harçlık ver.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          mutluluk: 5,
          ahlak: 10,
          cocuk_iliski: 12,
          mesaj: "Gemiye binerken sana sarıldı. Hayalinin peşindeki çocuğunla gurur duyuyorsun.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -10,
          cocuk_iliski: -4,
          mesaj: "Aylarca haber yok. Belki korsanlara kurban gitti... Endişe seni yiyor.",
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
    metin: "Evladın yıllar sonra torunlarınla seni ziyarete geldi. Ev uzun zaman sonra çocuk sesleriyle şenlendi.",
    secenekler: [
      {
        metin: "Gününü onlara ayır, oyun oyna.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 9,
          saglik: 5,
          cocuk_iliski: 6,
          mesaj: "Torunlarla oynamak seni 10 yaş gençleştirdi. Hayatın anlamı bu.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          saglik: -5,
          cocuk_iliski: 3,
          mesaj: "Oyunda belini incittin ama değdi.",
        },
      },
      {
        metin: "Beden kaldırmıyor, kısa sohbet yeter.",
        baseBasariSansi: 100,
        basariliSonuc: {
          saglik: 2,
          mutluluk: 3,
          mesaj: "Gürültüden yoruldun, odana çekildin. Yalnızlık sana uygun.",
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
    metin: "Yaşlı, acımasız, zengin bir tüccar geldi: 'Ağımı sana bırakırım, ama çocuğunu sakat ve zalim varisimle evlendir.'",
    secenekler: [
      {
        metin: "Evladım satılık değil! Reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 30,
          mutluluk: 8,
          un: 10,
          mesaj: "Yaşlıyı kovdun. Çocuğun gözyaşıyla sarıldı. Fakirsin ama iyi bir ebeveynsin.",
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          mesaj: "Adam öfkelenip babanın ortaklarını sana düşman etti. Ticaretin yara aldı.",
        },
      },
      {
        metin: "İş iştir. Zorla evlendir, ağı al.",
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
          mesaj: "İmzaladın, ticaret krallığı senin. Çocuğun düğünde yüzüne bakmadı, seni sildi.",
        },
        basarisizSonuc: {
          para: -15,
          ahlak: -30,
          mesaj: "Çocuğun düğün gecesi kaçtı! Ne ticareti aldın ne evladını.",
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
    metin: "Akraban lordlar seni gizli toplantıya çağırdı: köylülere acımasız yeni bir vergi planlıyorlar. Kana mı, halka mı sadık kalacaksın?",
    secenekler: [
      {
        metin: "Kanımdan olanları satmam. Onayla.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 40,
          un: 20,
          ahlak: -30,
          etiket_ekle: [
            "soylu_meclisi",
            "itibar:zalim_soylu",
          ],
          mesaj: "Mührünü bastın, ailenin en saygın ferdisin. Köylüler açken şatona altın yağıyor.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -20,
          saglik: -15,
          mesaj: "Köylüler isyan edip arabanı taşladı. Kan revan içinde zor kaçtın.",
        },
      },
      {
        metin: "Bu zorbalık! Karşı çık, halkı koru.",
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
          mesaj: "Masayı devirdin! Unvanını aldılar ama binlerce köylü senin için dua ediyor.",
        },
        basarisizSonuc: {
          un: -20,
          para: -35,
          ahlak: 15,
          etiket_sil: [
            "soylu_kani",
          ],
          mesaj: "Ailen seni dövüp attı, mallarına el koydu. Halk ne yaptığını hiç öğrenmedi.",
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
    metin: "Kışlada yüzü yaralı yaşlı bir subay seni çekti: 'Babanla aynı siperdeydik. Seni güvende tutmamı isterdi.' Saray muhafızlığı teklif ediyor.",
    secenekler: [
      {
        metin: "Saray Muhafızı ol: sıcak yatak, güvenli maaş.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 25,
          saglik: 10,
          maas_carpani: 1.15,
          etiket_ekle: [
            "muhafiz_birligi",
          ],
          mesaj: "Babanın adıyla saraya girdin. Dostlar çamurda savaşırken sen şarap içiyorsun.",
        },
        basarisizSonuc: {
          un: -20,
          mesaj: "Komutan torpilli olduğunu anladı, seni lağım nöbetine verdi. İtibar sıfır.",
        },
      },
      {
        metin: "Babanın alayına (Ölüm Birliği) geçmekte diren.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 35,
          ahlak: 15,
          saglik: -15,
          etiket_ekle: [
            "baba_alayi",
          ],
          mesaj: "Ölüm birliğine girdin! Askerler 'babanın ruhu döndü' dedi. Saygınlığın efsane.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 15,
          mesaj: "Babanın gölgesinden çıkmaya çalışırken pusuya düştün. Az kalsın ölüyordun.",
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
    metin: "Babanın eski sahibi zalim efendinin oğlu seni meyhanede gördü. 'Köle çocuğu değil mi bu?' diye gülüp ayağını öpmen için bir kese altın attı.",
    secenekler: [
      {
        metin: "Altını al, ayağını öp. Gurur doyurmaz.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 40,
          ahlak: -25,
          un: -25,
          mutluluk: -30,
          mesaj: "Ayağını öptün, herkesin önünde aşağılandın. Kesen doldu, ruhun o zeminde ezildi.",
        },
        basarisizSonuc: {
          para: 10,
          ahlak: -30,
          un: -35,
          mesaj: "Eğilince yüzüne tekme attı! Altını tam alamadın, itibarın yerle bir oldu.",
        },
      },
      {
        metin: "Masayı devir, köle olmadığını göster!",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 20,
          mutluluk: 8,
          etiket_ekle: [
            "gecmisiyle_barisik",
          ],
          mesaj: "Yumruğunla adamı yere serdin. Kalabalık hayran. Geçmişinle kimse dalga geçemez!",
        },
        basarisizSonuc: {
          saglik: -25,
          un: 10,
          mesaj: "Korumalar seni bayılana dek dövdü. Ama herkes boyun eğmeyen aslanı gördü.",
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
    metin: "Babanın çalışıp hastalanıp öldüğü fabrikada işçiler ayaklandı, yakmak üzereler. Sendika seni lider olarak görmek istiyor.",
    secenekler: [
      {
        metin: "Meşaleyi al: 'Babamın hesabını vereceksiniz!'",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 35,
          ahlak: 20,
          para: -20,
          etiket_ekle: [
            "isci_onderi",
            "itibar:devrimci",
          ],
          mesaj: "Grev devrime döndü! Patronlar diz çöktü. Babanın öcünü aldın, halk idolüsün.",
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
          mesaj: "Jandarma acımadı; coplar ve atlar altında kaldınız. Hain damgasıyla zindandasın.",
        },
      },
      {
        metin: "Patronla gizlice görüş, isyanı sat.",
        baseBasariSansi: 70,
        maxAhlak: 45,
        basariliSonuc: {
          para: 60,
          un: -25,
          ahlak: -40,
          maas_carpani: 1.3,
          mesaj: "Liderleri patrona verdin, isyan bastırıldı. Müdür oldun ama mahallen tükürüyor.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "İşçiler seni patronun odasından çıkarken gördü! Muhafızlar linçten kurtardı.",
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
    metin: "Sevdiğin kişinin ailesi geçmişini öğrendi: 'Kızımızı/oğlumuzu cellat tohumuna vermeyiz!' Ya soyadını inkâr edeceksin ya onsuz yaşayacaksın.",
    secenekler: [
      {
        metin: "Babamdan utanıyorum, soyadımı değiştiriyorum.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 10,
          ahlak: -25,
          mutluluk: -15,
          etiket_sil: [
            "korkulan_soyad",
          ],
          mesaj: "Geçmişini reddettin, evlendin. Babanın üzgün gözleri ve yalan hayat seni yiyor.",
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -15,
          mesaj: "Reddettin ama inanmadılar. 'Kanında ölüm var' deyip kapı dışarı ettiler.",
        },
      },
      {
        metin: "Korkularınızı kullanırım: zindancıbaşı ol.",
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
          mesaj: "Aşkı bıraktın, devletin en korkulan zindancısı oldun. O aile senden titriyor.",
        },
        basarisizSonuc: {
          un: -30,
          para: -10,
          mesaj: "Korkutmaya çalıştın ama asiller seni anında ezdi. İşsiz ve yalnız kaldın.",
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
    metin: "Salgın patladı. Çocuğun/eşin ateşler içinde, yetimhanede de 10 çocuk can çekişiyor. Annenden kalan otlar yalnız birine yeter.",
    secenekler: [
      {
        metin: "Yalnızca ailem alsın, ötesi umurumda değil.",
        baseBasariSansi: 90,
        gerekliEtiketler: [
          "cocuk_var",
        ],
        basariliSonuc: {
          saglik: 15,
          mutluluk: 5,
          ahlak: -30,
          un: -20,
          mesaj: "Ailen kurtuldu. Sabah yetimhaneden 10 küçük ceset çıkarken pencereni kapattın.",
        },
        basarisizSonuc: {
          saglik: 5,
          ahlak: -20,
          mesaj: "İlaç ailene tam işlemedi ama yaşıyorlar. Ölen çocukların ahı üzerinde.",
        },
      },
      {
        metin: "Otlar herkesin hakkı! Yetimhaneye git.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 35,
          ahlak: 40,
          saglik: -15,
          etiket_ekle: [
            "sifaci_namı",
          ],
          mesaj: "Yetimleri kurtardın! Çocuğun da bağışıklık kazandı. Şehir sana heykel dikecek.",
        },
        basarisizSonuc: {
          cocuk_kaybet: true,
          un: 20,
          ahlak: 25,
          mutluluk: -40,
          etiket_ekle: [
            "kalici:evlat_acisi",
          ],
          mesaj: "Yetimler yaşadı... ama evde evladını soğumuş buldun. Kahraman oldun, ruhun öldü.",
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
    metin: "Babanın eski yeraltı ortakları geldi: saray hazinesinden çaldıkları mücevherleri şehir dışına senin tünellerinle kaçırmak istiyorlar.",
    secenekler: [
      {
        metin: "Mücevherleri kaçır, babamın mirası.",
        baseBasariSansi: 50,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 80,
          ahlak: -35,
          un: -15,
          etiket_ekle: [
            "kacakcilik_agi",
            "sir:saray_hirsizi",
          ],
          mesaj: "Kaçırdın! Kral çıldırdı ama sen bir gecede inanılmaz zengin oldun.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: -40,
          un: -30,
          saglik: -20,
          olum_sansi: 20,
          etiket_ekle: [
            "hapiste",
          ],
          mesaj: "İhbar edildin! Tüneli bastılar, servetini aldılar, seni zindana tıktılar.",
        },
      },
      {
        metin: "Babam gibi suçlu olmam! İhbar et.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: 25,
          etiket_sil: [
            "karanlik_baglantilar",
          ],
          mesaj: "Adamları krala sattın! Kral ödüllendirdi, ailenin adını temize çıkardı.",
        },
        basarisizSonuc: {
          saglik: -35,
          ahlak: 15,
          olum_sansi: 15,
          mesaj: "İhbarını öğrendiler; gece evini basıp seni kılıçtan geçirdiler.",
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
    metin: "Köyünden mektup: kıtlık vurdu, kardeşlerin ve annen ağaç kabuğu yiyor, tüm birikimini istiyorlar. Şehirde bakacak ailen de var.",
    secenekler: [
      {
        metin: "Çocuğumun rızkını kesip köye gönder.",
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
          mesaj: "Köydekiler paranla yaşadı. Ama çocuğun haftalarca aç yattı, sana nefretle baktı.",
        },
        basarisizSonuc: {
          para: -30,
          mutluluk: -25,
          saglik: -15,
          mesaj: "Haydutlar parayı yolda kesti. Hem ailen aç kaldı hem köydekiler yardımsız öldü.",
        },
      },
      {
        metin: "Evim burası. Köy kendi başının çaresine baksın.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: 5,
          ahlak: -30,
          mutluluk: -10,
          mesaj: "Paranı sakladın, çocukların tok yattı. Aylar sonra annenin öldüğü haberi geldi.",
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
    metin: "Mahallede bir çocuk kayboldu; karanlık basıyor, herkes gönüllü topluyor.",
    secenekler: [
      {
        metin: "Aramaya katıl.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 25,
          ahlak: 25,
          saglik: -8,
          mesaj: "Çocuğu eski bir değirmende sen buldun; aile sana minnettar.",
          detay: "O geceki her adım değdi.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Bütün gece aradınız; çocuğu başka grup buldu.",
          detay: "Sonuç değişmedi ama çaban boşa gitmedi.",
        },
      },
      {
        metin: "Evde kal, karışma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Evde kaldın; çocuk sabaha karşı kendi bulundu.",
          detay: "İyi bitti ama içinde hafif bir suçluluk var.",
        },
        basarisizSonuc: {
          un: -12,
          ahlak: -10,
          mesaj: "Komşular sordu: 'Herkes aradı, sen neredeydin?'",
          detay: "Katılmamanın da bedeli var.",
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
    metin: "Gizli örgütünün liderleri çocuğunu yıllardır izlediklerini, onu da katmak istediklerini söyledi. Bu, evladının hayatını karanlığa gömebilir.",
    secenekler: [
      {
        metin: "Evladımı da alın, mirasım sürsün.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 25,
          para: 40,
          ahlak: -35,
          mutluluk: -15,
          mesaj: "Çocuğun yemin edip gölgelere karıştı. Ailenin yeri örgütte efsane oldu.",
          detay: "Güçlüsünüz, ama çocuğunun masumiyeti öldü.",
        },
        basarisizSonuc: {
          ahlak: -20,
          mutluluk: -25,
          mesaj: "Evladın ritüelde korkup kaçmaya çalıştı. Örgüt onu cezalandırdı.",
          detay: "Çocuğunu kırdın, örgüt seni beceriksiz saydı.",
        },
      },
      {
        metin: "Asla! Çocuğum bu işlere bulaşmaz.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 40,
          mutluluk: 10,
          un: -15,
          etiket_sil: [
            "orgut_secildi",
          ],
          mesaj: "Silah çekip liderlere meydan okudun. Aforoz edildin ama evladını kurtardın.",
          detay: "Sıradansın, tehlikedesin ama gururlusun.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Saldırıya uğradın! Ağır yaralı, evladınla zar zor kaçtın.",
          detay: "Her şeyi bıraktın. Yoksulsunuz ama beraber.",
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
    metin: "{cocuk} yetenekli bir ustanın yanında eğitim görmek istiyor ama bu birikiminin çoğunu yutar. Yatırım mı, kendi geleceğin mi?",
    secenekler: [
      {
        metin: "Parayı harca, {cocuk}'un eğitimine yatır.",
        baseBasariSansi: 80,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          mutluluk: 6,
          ahlak: 8,
          mesaj: "{cocuk} eğitime başladı; gözlerindeki heyecan her kuruşa değdi.",
          detay: "Bazı yatırımlar yıllar sonra meyve verir.",
        },
        basarisizSonuc: {
          para: -25,
          mutluluk: -4,
          mesaj: "Eğitim başladı ama {cocuk} zorlanıyor; yine de çabalıyor.",
          detay: "Her yatırım hemen meyve vermez.",
        },
      },
      {
        metin: "Parayı sakla, geleceğini güvenceye al.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -10,
          mesaj: "Parayı sakladın; {cocuk} hayal kırıklığına uğradı ama cüzdanın güvende.",
          detay: "Güvence bazen sevdiğin birinin hayaliyle ödenir.",
        },
        basarisizSonuc: {
          mutluluk: -18,
          mesaj: "{cocuk} bu kararı unutmadı; aranızda sessiz bir mesafe var.",
          detay: "Bazı kararlar yıllarca ödenir.",
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
    metin: "{baba} ile {anne} artık güçsüz; düzenli bakıma, belki bir yardımcıya muhtaçlar. Paran ve vaktin gider — ama seni onlar büyüttü.",
    secenekler: [
      {
        metin: "Düzenli bakıma para ayır, sık ziyaret et.",
        baseBasariSansi: 85,
        maliyet: 15,
        basariliSonuc: {
          para: -15,
          ahlak: 10,
          mutluluk: 4,
          mesaj: "{anne} ile {baba} rahat; yüzlerindeki minnet her kuruşa değdi.",
          detay: "Bazı borçlar zamanla ödenir.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -4,
          mesaj: "Elinden geleni yaptın ama yaşlılık dertleri bitmiyor.",
          detay: "Bazı yükler hafiflemez, yalnız paylaşılır.",
        },
      },
      {
        metin: "İşine ve ailene odaklan, ara sıra uğra.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: -12,
          mutluluk: -5,
          mesaj: "İşine odaklandın; {anne} ile {baba} idare ediyor ama seslerindeki hüzün belli.",
          detay: "Zaman geri alınamaz.",
        },
        basarisizSonuc: {
          ahlak: -15,
          mutluluk: -12,
          un: -5,
          mesaj: "Komşular 'ailesine bakmayan' dedi; {baba} söylemedi ama kırıldığını biliyorsun.",
          detay: "Sessiz kırgınlıklar en derindir.",
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
    metin: "{es} yıllardır kendi işini kurmayı hayal ediyor. Bunun için birikimin büyük kısmı gerekiyor. Riskli ama gözlerindeki ışığı görüyorsun.",
    secenekler: [
      {
        metin: "Birikimi ver, hayalini destekle.",
        baseBasariSansi: 65,
        maliyet: 30,
        basariliSonuc: {
          para: -30,
          es_puani: 20,
          mutluluk: 8,
          mesaj: "{es} işe başladı; gözleri yıllardır bu kadar parlamamıştı.",
          detay: "Bazı yatırımlar ilişkide görünür.",
        },
        basarisizSonuc: {
          para: -30,
          es_puani: 5,
          mutluluk: -5,
          mesaj: "Girişim tutmadı, para gitti ama {es} denediğin için minnettar.",
          detay: "Bazen sonuç değil destek önemlidir.",
        },
      },
      {
        metin: "Hayır de, birikimi koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          es_puani: -15,
          mutluluk: -8,
          mesaj: "Reddettin; {es} anlayış gösterdi ama gözlerindeki ışık söndü.",
          detay: "Güvenlik bazen hayalle satın alınır.",
        },
        basarisizSonuc: {
          es_puani: -25,
          mutluluk: -12,
          mesaj: "{es} bu reddi unutmadı; aranızda konuşulmayan bir kırgınlık var.",
          detay: "Bazı hayırlar evliliğe iz bırakır.",
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
    metin: "Bir akraban kapına dayandı: kumarda büyük borca girmiş, alacaklılar tehdit ediyor. Borcu kapatmazsan 'neler olur' diyemiyor bile.",
    secenekler: [
      {
        metin: "Borcu öde, aile huzurunu koru.",
        baseBasariSansi: 90,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          dost_puani: 10,
          ahlak: 5,
          mesaj: "Borcu kapattın; akraban gözyaşıyla 'bir daha asla' dedi.",
          detay: "Bu sözü kaç kez duydun, yine de ödedin.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Borcu kapattın ama akraban bir ay sonra yine geldi.",
          detay: "Alışkanlıklar bir seferde bitmez.",
        },
      },
      {
        metin: "Reddet, kendi çözsün.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Reddettin; akraban öfkeyle gitti ama kendi çözdü.",
          detay: "Bazen sert sevgi doğrudur.",
        },
        basarisizSonuc: {
          un: -10,
          mutluluk: -8,
          mesaj: "Alacaklılar meseleyi büyüttü, aile adı mahallede lekelendi.",
          detay: "Ret bazen daha pahalıya döner.",
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
    metin: "{cocuk}, senin mesleğin yerine toplumun saymadığı bir sanatı (gezici tiyatro, sokak müziği) seçmek istiyor. Hem gurur hem korku var.",
    secenekler: [
      {
        metin: "Destekle, yolunu aç.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 7,
          un: -10,
          ahlak: 8,
          mesaj: "{cocuk} gözleri dolu sana sarıldı. Mahallede dedikodu çıksa da vicdanın rahat.",
          detay: "Bazı gurur evin içinde parlar.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          un: -15,
          mesaj: "Desteğin sevindirdi ama komşular seni 'çocuğuna sahip çıkamayan' dedi.",
          detay: "Her destek alkışlanmaz.",
        },
      },
      {
        metin: "Israrla aile mesleğine yönelt.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          mutluluk: -15,
          mesaj: "{cocuk} isteksizce senin yolunu seçti; gözlerindeki ışık bir daha yanmadı.",
          detay: "Bazı zaferler kayıptır.",
        },
        basarisizSonuc: {
          mutluluk: -20,
          dost_puani: -10,
          mesaj: "{cocuk} evi terk etti; yıllarca haber alamadın.",
          detay: "Israr elindekini de kaybettirir.",
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
    metin: "Uzak bir akraban öldü, mirası yüzünden akrabalar çirkin bir kavgaya tutuştu. Payını sonuna dek savunabilir ya da huzur için çekilebilirsin.",
    secenekler: [
      {
        metin: "Avukat tut, hakkını sonuna dek ara.",
        baseBasariSansi: 55,
        maliyet: 12,
        basariliSonuc: {
          para: 40,
          ahlak: -8,
          dost_puani: -10,
          mesaj: "Mahkeme lehine bitti; payını aldın ama akraban bir daha aramadı.",
          detay: "Altın akrabalığa değdi mi, bilemezsin.",
        },
        basarisizSonuc: {
          para: -12,
          dost_puani: -15,
          mesaj: "Davayı kaybettin; masraf cebinden gitti, ailede düşman kazandın.",
          detay: "Bazı kavgaları kimse kazanmaz.",
        },
      },
      {
        metin: "Payından vazgeç, huzuru seç.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          dost_puani: 12,
          mesaj: "Vazgeçtin; akraban şaşkın teşekkür etti, aile bağların güçlendi.",
          detay: "Bazı zenginlikler altınla ölçülmez.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Vazgeçtin ama akrabalar bunu 'zayıflık' sayıp seni hafife aldı.",
          detay: "İyilik hep takdir edilmez.",
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
    metin: "{dost}'un en önemli günü ile hayatının en büyük iş görüşmesi aynı güne denk geldi. İkisine birden yetişemezsin.",
    secenekler: [
      {
        metin: "{dost}'un yanında ol.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 18,
          mutluluk: 5,
          para: -10,
          mesaj: "{dost}'un yanındaydın; gözlerindeki mutluluk kaçan fırsata değdi.",
          detay: "Bazı anlar fırsatlar gibi bir daha gelmez.",
        },
        basarisizSonuc: {
          dost_puani: 10,
          para: -10,
          mesaj: "Oradaydın ama kaçırdığın fırsat içinde pişmanlık bıraktı.",
          detay: "Doğru seçim bile biraz acıtır.",
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
          mesaj: "Görüşme harikaydı, fırsatı kaptın. {dost} seni bir daha eskisi gibi aramadı.",
          detay: "Kariyerin yükseldi ama sofrada bir sandalye eksik.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -5,
          dost_puani: -20,
          mesaj: "Görüşme de tutmadı, üstüne {dost}'u da kırdın.",
          detay: "Bazı günler hem iş hem gönül kaybettirir.",
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
    metin: "Girmek istediğin loncanın ustabaşı ailenin köle geçmişini diye reddetti: 'Bu çatı altında senin soyundan olmaz.'",
    secenekler: [
      {
        metin: "Herkesin önünde meydan oku.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: 15,
          un: 10,
          mesaj: "Sözlerin loncada yankılandı; bazı üyeler seni sessizce destekledi.",
          detay: "Bazı meydan okumalar zamanla meyve verir.",
        },
        basarisizSonuc: {
          un: -15,
          dost_puani: -8,
          mesaj: "Ustabaşı seni 'küstah' ilan edip lonca kapılarını sonsuza dek kapattı.",
          detay: "Her meydan okuma kazanılmaz.",
        },
      },
      {
        metin: "Sessiz çekil, iki kat çalışıp kendini kanıtla.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: -6,
          para: 15,
          un: 6,
          mesaj: "Yıllar sonra bağımsız işin öyle ün yaptı ki lonca seni aramak istiyor.",
          detay: "Sabır en keskin cevaptır.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -10,
          mesaj: "Çabaların yavaş ilerledi, önyargı kolay kırılmadı.",
          detay: "Bazı duvarlar tek başına yıkılmaz.",
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
    metin: "Yaşlı bir çiftçi geldi: büyük dedenin toprağını haksızca aldığını, borcun hâlâ ailesinde durduğunu söylüyor. Elinde sararmış bir belge var.",
    secenekler: [
      {
        metin: "Belgeyi incele, haklıysa tazminat öde.",
        baseBasariSansi: 80,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          ahlak: 18,
          un: 8,
          mesaj: "Belge gerçekmiş; tazminatı ödedin, yaşlı adam gözyaşıyla teşekkür etti.",
          detay: "Bazı borçlar nesiller sonra da ödenmeli.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Ödedin ama adam kırgınlığını tam atlatamadı.",
          detay: "Bazı yaralar parayla kapanmaz.",
        },
      },
      {
        metin: "Soylu nüfuzunla adamı kapıdan kov.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: -18,
          mesaj: "Adamı kovdurdun; kimse karşı koymadı ama içinde bir şey rahatsız.",
          detay: "Ayrıcalık vicdanı susturur, öldürmez.",
        },
        basarisizSonuc: {
          ahlak: -18,
          un: -12,
          mesaj: "Hikâyesi mahalleye yayıldı; 'zalim soylu' söylentisi peşini bırakmıyor.",
          detay: "Bazı gerçekler susturulamaz.",
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
    metin: "Babanın eski borç defterinde ödenmemiş onlarca isim buldun; bazıları yaşlı, yoksul, çaresiz. Defter hâlâ tahsil edilebilir bir servet.",
    secenekler: [
      {
        metin: "Tüm borçları acımasızca tahsil et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 55,
          ahlak: -20,
          un: -10,
          mesaj: "Borçları tahsil ettin; kasan doldu ama babanın lakabı sana da yapıştı.",
          detay: "Bazı miraslar altın kadar nefret taşır.",
        },
        basarisizSonuc: {
          para: 20,
          ahlak: -20,
          un: -18,
          mesaj: "Bazı borçlular seni açıkça lanetledi, biri tehdit bile etti.",
          detay: "Acımasız tahsilat düşman biriktirir.",
        },
      },
      {
        metin: "Defteri yak, herkesi borçtan kurtar.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Defteri yaktığın haber yayıldı; babanın lekeli adı senin sayende biraz aklandı.",
          detay: "Bazı zenginlikler yakılmaya değer.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Yaktın ama bazı borçlular bunu hile sanıp mesafeli duruyor.",
          detay: "Güven bir günde kurulmaz.",
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
    metin: "Karanlık sokakta babanın eski kaçakçı ortağı çıktı karşına. Sınır ötesinden yasak bir malı senin üzerinden, soru sormadan geçirmek istiyor.",
    secenekler: [
      {
        metin: "Kabul et, aile mesleğine dön.",
        baseBasariSansi: 55,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 50,
          ahlak: -18,
          mesaj: "Mal sorunsuz geçti; kasan doldu ama babanın izinde yürüdüğünü fark ettin.",
          detay: "Bazı kanlar değişmez.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: -25,
          un: -20,
          ahlak: -18,
          olum_sansi: 10,
          mesaj: "Devriye yakaladı; zor kaçtın, mal ve parayı kaybettin.",
          detay: "Eski hayat seni tuzağa çeker.",
        },
      },
      {
        metin: "Reddet, o hayatı bıraktığını söyle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Reddettin; adam omuz silkip karanlığa karıştı, sen hafifledin.",
          detay: "Geçmişi reddetmek de cesarettir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Reddin eski çevrede 'artık bizden değil' diye dolandı.",
          detay: "Kapanan kapı bir daha açılmaz.",
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
    metin: "Yetkililer babanın mesleğini bildiği için bir infazı senden istiyor: 'Kanında var.' Reddetmek tuhaf kaçar, kabul etmek seni damgalar.",
    secenekler: [
      {
        metin: "Reddet, bu kader benim değil.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 20,
          un: -10,
          mesaj: "Reddettin; başkası bulundu, sen babanın gölgesinden bir adım uzaklaştın.",
          detay: "Kader bazen reddedilmeyi bekler.",
        },
        basarisizSonuc: {
          un: -18,
          para: -10,
          mesaj: "Reddin 'ailesinin görevinden kaçan' diye anıldı, kapılar kapandı.",
          detay: "Geçmişten kaçmanın da bedeli var.",
        },
      },
      {
        metin: "Kabul et, aile mesleğini sürdür.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: 25,
          un: 10,
          ahlak: -20,
          mesaj: "Görevi yaptın; yetkililer memnun ama sokakta çocuklar bile fısıldaşıyor.",
          detay: "Bazı miraslar sonsuza dek etiketler.",
        },
        basarisizSonuc: {
          ahlak: -20,
          mutluluk: -12,
          mesaj: "Görevi zar zor bitirdin; o geceden beri uykun huzursuz.",
          detay: "Kanında olsa da yük hafif değil.",
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
    metin: "Annenin saray günlerinden bir sır hatırladın: nüfuzlu bir soylunun utanç verici geçmişi. Büyük avantaj olabilir ya da gömülmeli.",
    secenekler: [
      {
        metin: "Sırrı kullan, soyludan avantaj kopar.",
        baseBasariSansi: 60,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 35,
          un: 10,
          ahlak: -18,
          mesaj: "Soylu korkup istediğini verdi; kazandın ama annenin sadakat ilkesini çiğnedin.",
          detay: "Bazı kazançlar yeminin üstüne kurulur.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          un: -15,
          ahlak: -18,
          mesaj: "Soylu şantaja boyun eğmedi, seni gözden düşürdü.",
          detay: "Bazı kumarlar geri tepiyor.",
        },
      },
      {
        metin: "Sırrı sakla, annenin yeminine sadık kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Sırrı kullanmadın; annenin sarayda öğrettiği sadakati yaşattın.",
          detay: "Bazı miraslar altından değerli.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sessizliğin karşılığı yok, yalnız huzurunu korudun.",
          detay: "Erdemin ödülü hep somut değil.",
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
    metin: "Ailenizi sürgün eden hükümdarın torunu af çıkardı. Atalarının topraklarına dönüp mirası alabilirsin — ama şimdiki hayatını bırakacaksın.",
    secenekler: [
      {
        metin: "Her şeyi bırak, atalarının toprağına dön.",
        baseBasariSansi: 65,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          mutluluk: 9,
          ahlak: 10,
          mesaj: "Atalarının toprağına basınca gözlerin doldu; nesillik hasret dindi.",
          detay: "Bazı yolculuklar ruhla ölçülür.",
        },
        basarisizSonuc: {
          para: -20,
          mutluluk: -10,
          mesaj: "Dönüş umduğun gibi değildi; topraklar yabancıydı, iki dünya arasında kaldın.",
          detay: "Bazı dönüşler hayal kırıklığı.",
        },
      },
      {
        metin: "Burada kal, kurduğun hayatı koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Affı reddettin; hayat sürdü ama atalarının toprağını görmemek boşluk bıraktı.",
          detay: "Bazı kapılar kapalı kalmalı.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kararını sorguladıkça huzursuzluğun büyüdü.",
          detay: "Bazı sorular yıllarca cevapsız kalır.",
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
    metin: "Amcanın göçtüğü maden gibi, yakındaki bir maden çöktü; onlarca işçi mahsur. Kurtarmaya katılabilir ya da uzaktan bağış yapabilirsin.",
    secenekler: [
      {
        metin: "Kurtarma ekibine katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 20,
          saglik: -10,
          mesaj: "Saatlerce karanlık tünelde çalıştın; birkaç işçiyi canlı çıkarınca ağladın.",
          detay: "Amcanın alamadığı yardımı başkasına ulaştırdın.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          mesaj: "Tünel senin de üstüne çökmeye başladı; ağır yaralı çıkarıldın.",
          detay: "Yeraltı ailenle yine sınadı.",
        },
      },
      {
        metin: "Uzaktan cömert bağış yap.",
        baseBasariSansi: 90,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 10,
          ahlak: 8,
          mesaj: "Bağışın kurtarma ekibini güçlendirdi; birçok işçi sayende kurtuldu.",
          detay: "Her kahramanlık yeraltında değil.",
        },
        basarisizSonuc: {
          para: -20,
          mutluluk: -5,
          mesaj: "Bağışa rağmen kurtarma yetmedi; amcanın hikâyesi yinelendi.",
          detay: "Bazı acılar tarihte tekrarlanır.",
        },
      },
    ],
  },
];
