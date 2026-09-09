import type { OlayTanimi } from "./types";

export const OLAY_HIZIP: OlayTanimi[] = [
  {
    id: "hizip_asker_catisma",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliHizip: true,
    agirlik: 1.4,
    gorsel: "🔥",
    baslik: "Kılıçlar Çekildi",
    metin: "Gece yarısı kışlanın avlusunda Eski Muhafızlar ile Yeni Nizam birbirine girdi. Meşaleler yeri göğü aydınlatıyor, kan dökülmek üzere.",
    secenekler: [
      {
        metin: "Silahını çek ve kendi hizbin için savaş!",
        baseBasariSansi: 50,
        ipucu: "Kesin sadakat ya da ağır yara",
        basariliSonuc: {
          un: 25,
          dost_puani: 15,
          mesaj: "Kavgada en öndeydin! Kendi yoldaşların seni omuzlarına aldı, sen bir lidersin.",
        },
        basarisizSonuc: {
          un: -10,
          saglik: -25,
          olum_sansi: 5,
          mesaj: "Karşı taraf seni fena hırpaladı. Kafan yarılmış bir halde revire kaldırıldın.",
        },
      },
      {
        metin: "Silahları indirin! Araya girip kavgayı durdur.",
        baseBasariSansi: 65,
        ipucu: "Kahramanca bir arabuluculuk",
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          mesaj: "Gür sesinle avluyu inlettin! Herkes utançla silahını indirdi.",
        },
        basarisizSonuc: {
          saglik: -15,
          mutluluk: -10,
          mesaj: "Araya girerken kafana bir meşale fırlattılar. Barış elçisi olmak acı vericidir.",
        },
      },
    ],
  },
  {
    id: "hizip_asker_celiskili_emirler",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliHizip: true,
    agirlik: 1.3,
    gorsel: "📜",
    baslik: "İki Ağızlı Emir",
    metin: "Kendi hizbinden bir komutan sana gizli bir emir verdi; karşı hizbe yakın bir üst subay ise tam tersini istiyor. İkisine de itaat edemezsin.",
    secenekler: [
      {
        metin: "Kendi hizbinin emrine uy, üst subayı görmezden gel.",
        baseBasariSansi: 60,
        ipucu: "Hizbin içinde güven, hiyerarşide risk",
        basariliSonuc: {
          para: 2,
          dost_puani: 12,
          un: 10,
          mesaj: "Hizbinin emrini yerine getirdin; yoldaşların sana güven duydu.",
          detay: "Sadakatin ödüllendirildi ama disiplin zincirinde bir çatlak oluştu.",
        },
        basarisizSonuc: {
          un: -15,
          saglik: -10,
          mesaj: "Üst subay itaatsizliğini fark etti, seni herkesin önünde cezalandırdı.",
          detay: "Hizip bağlılığı, ordu disiplininin önüne geçemiyor her zaman.",
        },
      },
      {
        metin: "Hiyerarşiye uy, üst subayın emrini yerine getir.",
        baseBasariSansi: 70,
        ipucu: "Kariyer güvenliği, hizip içi güvensizlik",
        basariliSonuc: {
          para: 7,
          mesaj: "Emri eksiksiz yerine getirdin; üst subay seni not etti.",
          detay: "Disiplin ödüllendirildi ama kendi hizbin bunu unutmayacak.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          mesaj: "Hizip kardeşlerin bunu bir ihanet olarak gördü, sana soğuk davranmaya başladılar.",
          detay: "İki efendiye hizmet etmenin bir bedeli var.",
        },
      },
    ],
  },
  {
    id: "hizip_asker_kislada_tasfiye",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliHizip: true,
    agirlik: 1.3,
    gorsel: "🔫",
    baslik: "Kışlada Tasfiye",
    metin: "Rakip hizbe yakın birkaç askerin sessizce kışladan uzaklaştırılması planlanıyor; senden bu tasfiye listesini hazırlamana yardım etmen isteniyor.",
    secenekler: [
      {
        metin: "Listeyi hazırla, hizbinin gücünü pekiştir.",
        baseBasariSansi: 55,
        ipucu: "Hizip içinde yükseliş, vicdan azabı",
        basariliSonuc: {
          un: 18,
          ahlak: -20,
          mesaj: "Liste hazırlandı ve rakipler sessizce kışladan uzaklaştırıldı. Hizbin içinde adın yükseldi.",
          detay: "Güç kazandın ama bu yöntemin adil olmadığını biliyorsun.",
        },
        basarisizSonuc: {
          dost_puani: -20,
          saglik: -10,
          mesaj: "Liste sızdı! Tasfiye edilecek askerler önceden haber alıp sana pusu kurdu.",
          detay: "Gizli planların bazen geri tepmesi kaçınılmaz.",
        },
      },
      {
        metin: "Reddet, bu kirli bir oyun.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 20,
          mesaj: "Reddettin; vicdanın rahat ama hizbin içinde 'zayıf' damgası yedin.",
          detay: "Bazı zaferler onurunu korumakla kazanılır.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin hizip liderleri tarafından güvensizlik olarak yorumlandı.",
          detay: "Doğru olanı yapmak bazen bedelsiz değildir.",
        },
      },
    ],
  },
  {
    id: "hizip_tuccar_catisma",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliHizip: true,
    agirlik: 1.4,
    gorsel: "📦",
    baslik: "Batan Gemiler",
    metin: "Liman Loncası ile Pazar Birliği arasındaki fiyat savaşı kanlı bir hal aldı. Rakip hizbin mallarını taşıyan gemileri kundaklamayı teklif ediyorlar.",
    secenekler: [
      {
        metin: "Gölgelere ödeme yap, rakibin gemisini yak!",
        baseBasariSansi: 45,
        maliyet: 20,
        basariliSonuc: {
          para: 60,
          un: 15,
          ahlak: -35,
          mesaj: "Liman alev alev! Rakiplerin iflas etti, piyasanın tek hakimi sensin.",
        },
        basarisizSonuc: {
          para: -40,
          un: -30,
          ahlak: -20,
          mesaj: "Kundakçılar yakalandı ve ötüp senin adını verdiler. Tazminat ödemekten perişan oldun.",
        },
      },
      {
        metin: "Bu kirli oyuna girmem, sadece ticaretime odaklanırım.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Ellerini temiz tuttun. Yavaş ama onurlu bir şekilde işine devam ediyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Sen temiz kaldın ama rakiplerin senin depolarına sabotaj düzenledi!",
        },
      },
    ],
  },
  {
    id: "hizip_tuccar_depo_yangini",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliHizip: true,
    agirlik: 1.3,
    gorsel: "🔥",
    baslik: "Şüpheli Bir Yangın",
    metin: "Rakip hizbin bir deposu gece yarısı alev aldı. Kimse üstlenmedi ama herkes senin hizbini işaret ediyor. Şimdi ne yapacaksın?",
    secenekler: [
      {
        metin: "Yangını üstlen (üstü kapalı), hizbinin gücünü göster.",
        baseBasariSansi: 40,
        ipucu: "Korku salar ama iz bırakabilir",
        basariliSonuc: {
          un: 20,
          ahlak: -30,
          mesaj: "Söylenti yayıldı: rakiplerine bulaşanın sonu böyle olur. Hizbin içinde korkuyla anılıyorsun.",
          detay: "Güç kazandın ama vicdanın kararmaya başladı.",
        },
        basarisizSonuc: {
          para: -35,
          un: -25,
          mesaj: "Şehir muhafızları izleri sana kadar sürdü! Ağır bir tazminatla yakayı kurtardın.",
          detay: "Bazı sırlar gün yüzüne çıkmaya mahkumdur.",
        },
      },
      {
        metin: "Yangını söndürmeye yardım et, iyi niyetini göster.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 20,
          dost_puani: 10,
          mesaj: "Yangını söndürmeye koştun. Rakip hizip bile bu jesti unutmadı.",
          detay: "Bazen düşmanına uzattığın el, en büyük zaferindir.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Yardım ederken dumandan zehirlendin; kendi hizbin bunu 'gereksiz bir jest' diye eleştirdi.",
          detay: "İyilik her zaman takdir görmüyor.",
        },
      },
    ],
  },
  {
    id: "hizip_tuccar_fiyat_savasi",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliHizip: true,
    agirlik: 1.3,
    gorsel: "📉",
    baslik: "Fiyat Savaşı",
    metin: "Rakip hizip, seni piyasadan silmek için mallarını maliyetinin altında satmaya başladı. Aynı şekilde karşılık mı vereceksin, yoksa farklı bir yol mu bulacaksın?",
    secenekler: [
      {
        metin: "Sen de fiyatları maliyetin altına çek, kim dayanacak görelim.",
        baseBasariSansi: 45,
        maliyet: 15,
        ipucu: "Sarsıcı bir kumar",
        basariliSonuc: {
          mutluluk: -11,
          para: 50,
          un: 5,
          mesaj: "Rakibin önce pes etti, iflasın eşiğine geldi. Piyasa yeniden senin.",
          detay: "Kazandın ama bu savaş her iki tarafı da yıprattı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -45,
          mesaj: "Fiyat savaşını sen kaybettin, birkaç ay ciddi zarar ettin.",
          detay: "Bazı kumarlar, kaybedeni çok daha ağır cezalandırır.",
        },
      },
      {
        metin: "Fiyat savaşına girme, kaliteni ve hizmetini öne çıkar.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 15,
          dost_puani: 8,
          mesaj: "Sadık müşterilerin fiyattan değil kaliteden yana seni seçti.",
          detay: "Bazen en iyi strateji, rakibin oyununa hiç girmemektir.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Bazı müşteriler yine de ucuz fiyata kaydı, küçük bir kayıp yaşadın.",
          detay: "Sadakat her zaman herkeste bulunmuyor.",
        },
      },
    ],
  },
  {
    id: "hizip_din_catisma",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliHizip: true,
    agirlik: 1.4,
    gorsel: "🕯️",
    baslik: "Kürsüde Ateş",
    metin: "Gelenekçiler ile Yenilikçiler arasındaki felsefi tartışma, sokaklarda fiziksel saldırılara dönüştü. Bugün büyük pazar ayininde binlerce kişi seni dinleyecek.",
    secenekler: [
      {
        metin: "Karşı tarafı sapkınlıkla suçla ve cemaati kışkırt!",
        baseBasariSansi: 50,
        ipucu: "Muazzam bir güç kazanırsın ama kan dökülebilir",
        basariliSonuc: {
          un: 30,
          ahlak: -20,
          mesaj: "Ateşli vaazın cemaati çılgına çevirdi! Hizbinin mutlak ruhani lideri konumuna yükseldin.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -30,
          saglik: -10,
          mesaj: "Karşı tarafın destekçileri vaaz sırasında taş ve sopalarla kürsüye saldırdı! Kan aktı.",
        },
      },
      {
        metin: "Tanrı barış ister. Kalpleri yumuşatmaya çalış.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: 8,
          ahlak: 25,
          mesaj: "Sesindeki şefkat öfkeli kalabalığı ağlattı. Şehir o gün bir katliamdan döndü.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          mesaj: "Kendi hizbin seni 'korkak ve pasifist' olmakla suçlayarak arkandan iş çevirmeye başladı.",
        },
      },
    ],
  },
  {
    id: "hizip_din_metin_yorumu",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliHizip: true,
    agirlik: 1.3,
    gorsel: "📖",
    baslik: "Kutsal Metnin Yorumu",
    metin: "Karşı hizipten bir din adamı, kutsal metnin bir bölümünü senin hizbinin yorumuna açıkça meydan okuyarak halka açık bir tartışmaya davet ediyor.",
    secenekler: [
      {
        metin: "Daveti kabul et, meydanda açıkça tartış.",
        baseBasariSansi: 55,
        ipucu: "Büyük prestij ya da büyük utanç",
        basariliSonuc: {
          un: 25,
          dost_puani: 10,
          mesaj: "Tartışmada üstün geldin! Cemaat seni hizbin en parlak sesi ilan etti.",
          detay: "Sözlerin, kalabalığın hafızasında uzun süre kalacak.",
        },
        basarisizSonuc: {
          un: -20,
          mutluluk: -10,
          mesaj: "Rakibin seni köşeye sıkıştırdı; halkın önünde susup kaldın.",
          detay: "Bazı yenilgiler, kürsüde değil hafızalarda kalır.",
        },
      },
      {
        metin: "Daveti reddet, tartışmanın kendisinin bölücü olduğunu söyle.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Reddin, bazılarınca bilgece bir alçakgönüllülük olarak görüldü.",
          detay: "Her meydan okumaya cevap vermek zorunda değilsin.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin, karşı hizip tarafından 'korkaklık' olarak halka duyuruldu.",
          detay: "Sessizlik bazen yanlış yorumlanır.",
        },
      },
    ],
  },
  {
    id: "hizip_din_cemaat_ayrilik",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliHizip: true,
    agirlik: 1.3,
    gorsel: "⛪",
    baslik: "Cemaat İkiye Bölünüyor",
    metin: "Kendi cemaatin içinde bile Gelenekçiler ve Yenilikçiler'e sempati duyanlar var. Ayrılık büyümeden bir şeyler yapmalısın.",
    secenekler: [
      {
        metin: "Cemaati kendi hizbinin çizgisinde birleştirmeye zorla.",
        baseBasariSansi: 55,
        ipucu: "Birlik sağlanır ama bazıları küser",
        basariliSonuc: {
          un: 15,
          dost_puani: -5,
          mesaj: "Cemaatin çoğunluğu senin çizgini benimsedi; birkaç aile sessizce ayrıldı.",
          detay: "Birlik bazen bir bedel ödenerek sağlanır.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Baskın tavrın cemaati daha da geresti; bazı aileler tapınağı tamamen terk etti.",
          detay: "Zorlama, birleştirmek yerine bazen daha çok böler.",
        },
      },
      {
        metin: "Farklı görüşlere alan tanı, birlikte yaşamayı öner.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 20,
          mutluluk: 5,
          mesaj: "Hoşgörülü tutumun cemaati bir arada tuttu; herkes kendi sesini bulabildi.",
          detay: "Bazen en güçlü birlik, farklılığı kabul etmekten doğar.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Hizip liderlerin bu tutumunu 'kararsızlık' diye eleştirdi.",
          detay: "Hoşgörü, herkesi her zaman memnun etmez.",
        },
      },
    ],
  },
  {
    id: "tepki_hizip_sir_ifsa_tehdidi",
    kategori: "siyaset",
    gerekliHizip: true,
    gorsel: "🗝️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Elindeki Sır",
    metin: "Hizbinle ilgili tehlikeli bir sır öğrendin. Bunu açığa vurmak hem seni hem de bağlı olduğun grubu büyük bir krize sürükleyebilir; ama sessiz kalmak da vicdanını rahatsız ediyor.",
    secenekler: [
      {
        metin: "Sırrı kendine sakla, hiçbir şey yapma.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama vicdan yükü",
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Sessiz kaldın; sır seninle kaldı, güvendesin ama içinde bir ağırlık var.",
          detay: "Bazı sessizlikler bir bedel öder, sadece görünmez.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mutluluk: -8,
          mesaj: "Sessiz kalmaya çalıştın ama vicdanın seni rahat bırakmadı.",
          detay: "Bazı sırlar içeride büyür.",
        },
      },
      {
        metin: "Sırrı açığa vurmak üzeresin.",
        baseBasariSansi: 50,
        ipucu: "Riskli, hizbinle bağını koparabilir",
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Söyleyeceğin sözler henüz kimseye ulaşmadı ama bu an geri dönüşü olmayan bir eşik. Bir adım daha atarsan hizbinle yolların tamamen ayrılabilir.",
          geriCekilMetni: "Son anda vazgeç, sırrı gömülü bırak.",
          geriCekilSonucu: {
            ahlak: -5,
            mesaj: "Son anda vazgeçtin; sır seninle kaldı.",
            detay: "Bazı eşiklerden geri dönmek de bir cesaret ister.",
          },
          devamMetni: "Hayır. Sırrı açığa çıkar.",
          devamSonucu: {
            un: 18,
            ahlak: 20,
            para: -20,
            mesaj: "Sırrı açığa çıkardın; halk seni dürüstlüğünle andı ama hizbin seni bir daha asla eskisi gibi görmedi.",
            detay: "Vicdanının rahatladığı gün, bir kapının sonsuza dek kapandığı gün oldu.",
          },
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_sadakat_yemini",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "👑",
    baslik: "Kanla Yazılan Yemin",
    metin: "Eski Muhafızlar, krala ve eski komutanlara olan sarsılmaz bağlılıklarını tazelemek için gece yarısı meşaleler eşliğinde törensel bir yemin düzenliyor. Herkesin kılıcını çekip kanla söz vermesi bekleniyor.",
    secenekler: [
      {
        metin: "Yemini gururla et, kanını akıt.",
        baseBasariSansi: 85,
        ipucu: "Bağlılığını kanıtlarsın ama kralın her suçuna ortak olursun",
        basariliSonuc: {
          un: 15,
          ahlak: -5,
          saglik: -2,
          mesaj: "Kılıcını eline kestin ve yemini haykırdın. General gözlerinin içine bakarak gülümsedi.",
          detay: "Eski düzenin sarsılmaz bir sütunu oldun. Artık geri dönüş yok.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Yemini ettin ama sesin titredi. Çevrendekiler senin cesaretinden şüphe etti.",
          detay: "Bu tür ortamlarda zayıflık hemen fark edilir.",
        },
      },
      {
        metin: "Yemini et ama sadece dudak ucuyla, kanını akıtma.",
        baseBasariSansi: 60,
        ipucu: "Riski düşük ama fark edilirse bedeli ağır",
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Gölgede kaldın, yalandan ağzını oynattın ve elini kesmiş gibi yaptın.",
          detay: "Kimse fark etmedi ama bu ikiyüzlülük içinde bir huzursuzluk bıraktı.",
        },
        basarisizSonuc: {
          saglik: -15,
          un: -20,
          mesaj: "General kanamadığını fark etti! Seni hain ilan edip herkesin önünde dövdürttü.",
          detay: "Sadakat yeminiyle dalga geçilmez.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_isyan_bastirma",
    agirlik: 1.6,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "🛡️",
    baslik: "Karanlık Operasyon",
    metin: "Komutanların, Yeni Nizam'a yakın genç teğmenlerin toplandığı gizli bir hücreyi basmanı istiyor. Listede senin de eskiden tanıdığın birinin adı var. Emir kesin: 'Hiçbirini sağ bırakma.'",
    secenekler: [
      {
        metin: "Görevi tam bir sadakat ve acımasızlıkla yerine getir.",
        baseBasariSansi: 60,
        ipucu: "Kariyer sıçraması, ruhun çürüyüşü",
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -35,
          mesaj: "Odaya daldın ve kimseye acımadın. Eski tanıdığın yüzüne bakarak son nefesini verdi.",
          detay: "Komuta kademesi seni kahraman ilan etti ama geceleri o bakışlar rüyana giriyor.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 10,
          mesaj: "Genç teğmenler hazırlıklıydı. Odada bomba patladı ve ağır yaralı zar zor kurtuldun.",
          detay: "Kanlı operasyon fiyaskoyla sonuçlandı.",
        },
      },
      {
        metin: "Görevi yavaşlat, kapıyı çalıp kaçmalarına izin ver.",
        baseBasariSansi: 50,
        ipucu: "Vicdanın rahatlar ama vatan hainliğiyle suçlanabilirsin",
        basariliSonuc: {
          ahlak: 25,
          un: -10,
          mesaj: "Operasyona geç gittin. Vardığında sadece yanmış evraklar vardı.",
          detay: "Eski dostunun hayatını kurtardın. Komutanlar sinirli ama kanıt yok.",
        },
        basarisizSonuc: {
          un: -30,
          para: -15,
          ahlak: 15,
          mesaj: "Bilerek geç kaldığın anlaşıldı! Rütbelerin söküldü ve hapse atılmaktan zor kurtuldun.",
          detay: "Merhametin bedelini kariyerinle ödedin.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_kidem_kavgasi",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "🎖️",
    baslik: "Paşaların Savaşı",
    metin: "Hizip içinde iki güçlü paşa arasında kimin daha fazla sözü geçeceği konusunda tehlikeli bir kavga çıktı. İkisi de alt kademedeki senin gibi subaylardan destek bekliyor.",
    secenekler: [
      {
        metin: "Kıdemli ve yaşlı paşayı destekle.",
        baseBasariSansi: 75,
        ipucu: "Geleneklere bağlı, güvenli liman",
        basariliSonuc: {
          un: 5,
          dost_puani: 10,
          mesaj: "Yaşlı paşayı destekledin. Sadakatin eski topraklar arasında büyük saygı gördü.",
          detay: "Geleneksel hiyerarşiye bağlılık her zaman takdir görüyor.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "Yaşlı paşa gözden düştü; senin desteğin de 'modası geçmişlerle' anılmana neden oldu.",
          detay: "Yanlış ata oynamak her zaman risklidir.",
        },
      },
      {
        metin: "İkisine de yalan söyle, taraf tutma.",
        baseBasariSansi: 65,
        ipucu: "Tehlikeli bir tarafsızlık",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          un: 4,
          mesaj: "Tartışmaya hiç bulaşmadın ve kavgadan hasarsız çıktın.",
          detay: "Bazen en güvenli yol, görünmez olmaktır.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "İkisine de yalan söylediğin ortaya çıktı. İki tarafın da kara listesine girdin.",
          detay: "Her tarafsızlık takdir görmüyor, bazen iki kat ceza getiriyor.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_halk_algisi",
    agirlik: 1.6,
    kategori: "sosyal",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "🗣️",
    baslik: "Kralın Köpeği",
    metin: "Sokakta üniformanla yürürken açlıktan bir deri bir kemik kalmış gençler yüzüne tükürdü ve 'Kralın Köpeği!' diye bağırdı. Etraftaki esnaf izliyor.",
    secenekler: [
      {
        metin: "Kılıcının kabzasını göster ve onları korkutarak dağıt.",
        baseBasariSansi: 85,
        ipucu: "Otoriteyi korur, nefreti büyütür",
        basariliSonuc: {
          un: 5,
          ahlak: -10,
          mesaj: "Kılıcına dokunman yetti. Gençler korkup kaçıştı. Sen de omuzların dik yürüdün.",
          detay: "Sokaktaki korkuyu otorite sanıyorsun, ama bu nefret içten içe büyüyor.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          mesaj: "Gençler kaçtı ama esnafın sana attığı iğrenç bakışlar bütün gün mideni bulandırdı.",
          detay: "Halkın senden bu kadar nefret etmesi moralini bozuyor.",
        },
      },
      {
        metin: "Tükürüğü sil, cebinden para çıkarıp onlara at.",
        baseBasariSansi: 55,
        ipucu: "Vicdan azabını dindirir, şaşırtıcı bir hamle",
        basariliSonuc: {
          dost_puani: 10,
          ahlak: 20,
          para: -5,
          mesaj: "Sana tükürenlere para verdin. Şok içinde parayı alıp gittiler.",
          detay: "Esnaf bu hareketine inanamadı. Belki de üniformanın altındaki kalbini gördüler.",
        },
        basarisizSonuc: {
          un: -15,
          para: -5,
          mesaj: "Parayı attın ama 'kanlı paranızı istemiyoruz' deyip parayı suratına geri fırlattılar.",
          detay: "Halkın nefreti satın alınamayacak kadar derinmiş.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_ayartma_teklifi",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "🕯️",
    baslik: "Karanlıkta Bir Fısıltı",
    metin: "Yeni Nizam'dan biri gece yarısı odana gizlice girdi. 'Eski gemi batıyor, bizimle olursan yeni orduda paşa olursun' diyor ve masaya bir sandık altın bırakıyor.",
    secenekler: [
      {
        metin: "Altını al ve adamı oracıkta tutukla!",
        baseBasariSansi: 70,
        maxAhlak: 45,
        ipucu: "Sadece ahlaksızlara: Hem rüşveti al hem sadakatini sat",
        basariliSonuc: {
          para: 50,
          un: 25,
          ahlak: -20,
          mesaj: "Adamı yakalatıp üstlerine teslim ettin, ama altın sandığını kendi yatağının altına sakladın.",
          detay: "Hem kahraman oldun hem zenginleştin. İkiyüzlülüğün zirvesindesin.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -20,
          mesaj: "Adam çok tehlikeli bir suikastçı çıktı! Seni bıçaklayıp kaçtı.",
          detay: "Hem parayı alamadın hem de kan revan içinde kaldın.",
        },
      },
      {
        metin: "Teklifi reddet, defol git de.",
        baseBasariSansi: 85,
        ipucu: "Sadakat ve şeref",
        basariliSonuc: {
          ahlak: 15,
          un: 10,
          mesaj: "Adam altınını alıp karanlığa karıştı. Ertesi gün bu sadakatin üstlerince duyuldu.",
          detay: "Eski Muhafızlar içinde artık tamamen güvenilir birisin.",
        },
        basarisizSonuc: {
          mesaj: "Reddettin ama teklif seni günlerce uykusuz bıraktı. Acaba yanlış tarafta mıyım?",
          detay: "Kararlılık bazen içten içe seni kemirir.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_nobet_degisimi",
    agirlik: 1.6,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "🌙",
    baslik: "Nöbet Değişimi",
    metin: "Gece nöbetini bir Yeni Nizam askerine devrediyorsun. Adam seni süzüyor, sonra alçak sesle 'Sizinkiler artık tarih' diye mırıldanıyor.",
    secenekler: [
      {
        metin: "Sözünü yanına bırakma, karşılık ver.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 10,
          mesaj: "Sert bir karşılık verdin, adam sustu. Etrafındaki eski muhafızlar seni gizlice alkışladı.",
          detay: "Sözler bazen kılıçtan keskindir.",
        },
        basarisizSonuc: {
          saglik: -10,
          un: -5,
          mesaj: "Laf dalaşı yumruk yumruğa kavgaya döndü, ikiniz de nöbetçi başı tarafından yakalandınız.",
          detay: "Disiplin cezası ağırdı.",
        },
      },
      {
        metin: "Duymazdan gel, görevini yap.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Sinirlerine hakim oldun, nöbeti sessizce devrettin.",
          detay: "Bazen susmak en güçlü cevaptır.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Sustun ama içinin öfkeyle dolduğunu hissettin, o gece uyuyamadın.",
          detay: "Yutulan öfke bazen içeride büyür.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_komutan_sinavi",
    agirlik: 1.6,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "🎖️",
    baslik: "Komutanın Sınavı",
    metin: "Yaşlı komutan seni özel çadırına çağırdı. 'Sadakatini bir kez daha görmek istiyorum' diyerek zor, tehlikeli görünen bir görev veriyor.",
    secenekler: [
      {
        metin: "Görevi hiç sorgulamadan kabul et.",
        baseBasariSansi: 65,
        ipucu: "Büyük ün ama ciddi yaralanma riski",
        basariliSonuc: {
          un: 20,
          ahlak: 5,
          mesaj: "Görevi başarıyla tamamladın, komutan gözlerinin içine bakarak başını salladı.",
          detay: "Bu bakış, yıllarca alacağın her ödülden değerliydi.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Görev fena halde ters gitti, günlerce sedyede kaldın.",
          detay: "Sadakatin bedeli bazen ağır ödenir.",
        },
      },
      {
        metin: "Endişelerini nazikçe dile getir.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Dürüstlüğün komutanı şaşırttı ama saygısını kazandın.",
          detay: "Körü körüne itaat etmeyen bir asker de değerlidir.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Komutan bunu bir zayıflık olarak gördü, seni bir süre göz hapsine aldı.",
          detay: "Bazı komutanlar sorgulamayı hoş karşılamaz.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_aile_miras_silah",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "⚔️",
    baslik: "Atadan Kalma Kılıç",
    metin: "Emekliye ayrılan yaşlı bir Eski Muhafız, kuşaklardır ailesinde taşınan kılıcını sana emanet etmek istiyor. Ama bu emanetin ağır bir sorumluluğu var: kılıcı asla hizbe ihanet eden birine kaptırmayacaksın.",
    secenekler: [
      {
        metin: "Emaneti gururla kabul et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 15,
          ahlak: 10,
          etiket_ekle: [
            "esya:atadan_kalma_kilic",
          ],
          mesaj: "Kılıcı elinde tartarken tarihin ağırlığını hissettin, tüm kışla bunu duydu.",
          detay: "Artık taşıdığın sadece bir silah değil, bir yeminin de.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kılıcı kabul ettin ama bu sorumluluğun ağırlığı seni geceleri uyutmuyor.",
          detay: "Bazı onurlar aynı zamanda bir yüktür.",
        },
      },
      {
        metin: "Nazikçe reddet, bu yükü taşıyamayacağını söyle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yaşlı asker hayal kırıklığına uğradı ama dürüstlüğünü takdir etti.",
          detay: "Her onur kabul edilmeyi hak etmez, bazen dürüstlük daha değerlidir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin kışlada 'korkak' diye fısıldanmana neden oldu.",
          detay: "Bazı reddedişler yanlış anlaşılır.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_gizli_bulusma_ihbari",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    gorsel: "🕵️",
    baslik: "Fısıldanan Bir Buluşma",
    metin: "Bir ahır işçisi, Yeni Nizam'ın şehir dışında gizli bir toplantı yapacağını sana fısıldadı. Bu bilgiyi komutana götürürsen büyük takdir kazanabilirsin — ama iş çığırından çıkabilir.",
    secenekler: [
      {
        metin: "Derhal komutana bildir.",
        baseBasariSansi: 75,
        ipucu: "Büyük itibar ama Yeni Nizam'ın gazabını üstüne çekersin",
        basariliSonuc: {
          un: 20,
          para: 10,
          rakip_puani: 10,
          mesaj: "Baskın düzenlendi, komutan seni ödüllendirdi.",
          detay: "Ama Yeni Nizam'ın gözünde artık bir hedef oldun.",
        },
        basarisizSonuc: {
          saglik: -15,
          mesaj: "Bilgi sızdı, baskından önce haber aldılar ve seni fena dövdüler.",
          detay: "Bazı sırlar seni de yaralar.",
        },
      },
      {
        metin: "Karışma, bu senin savaşın değil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sessiz kaldın, kimse senin bu bilgiye sahip olduğunu öğrenmedi.",
          detay: "Bazen en güvenli yol hiçbir yol değildir.",
        },
        basarisizSonuc: {
          ahlak: -5,
          mesaj: "Sessizliğin seni içten içe rahatsız etti, sanki bir ihanete ortak olmuşsun gibi hissettin.",
          detay: "Suskunluk bazen kendi vicdan azabını doğurur.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_gizli_toplanti",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    gorsel: "🕯️",
    baslik: "İhtilalin Ayak Sesleri",
    metin: "Yeni Nizam, terk edilmiş bir değirmende gece yarısı gizli bir toplantı düzenliyor. Kralı devirme planları konuşulacak. Yakalanırsan cezan vatana ihanetten idam.",
    secenekler: [
      {
        metin: "Korkusuzca toplantıya katıl ve en radikal fikri savun.",
        baseBasariSansi: 65,
        ipucu: "Liderliğe yükselirsin ama büyük risk",
        basariliSonuc: {
          un: 25,
          dost_puani: 15,
          ahlak: -10,
          mesaj: "Ateşli konuşman herkesi büyüledi. Artık hareketin gölge liderlerinden birisin.",
          detay: "Masadaki haritalarda kan dökülecek yerleri kendi ellerinle işaretledin.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "Kralın istihbaratı değirmeni bastı! Kurşun yağmuru altında zar zor ormana kaçabildin.",
          detay: "Yaralısın ve arandığını biliyorsun. Gizlilik artık yok.",
        },
      },
      {
        metin: "Katılma, riski göze alma.",
        baseBasariSansi: 80,
        ipucu: "Canını kurtarır, yoldaşlarını küstürür",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Evinde güvenle uyudun. Sabah değirmenin basıldığını ve arkadaşlarının tutuklandığını duydun.",
          detay: "Korkaklığın hayatını kurtardı ama vicdanın kanıyor.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          un: -15,
          mesaj: "Katılmadığın için hareket içinde 'korkak' ve 'güvenilmez' ilan edildin.",
          detay: "Devrimciler, yoldaşlarını yalnız bırakanları affetmez.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_sabotaj_teklifi",
    agirlik: 1.6,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    gorsel: "💣",
    baslik: "Barut Kokusu",
    metin: "Hareketin liderlerinden biri sana dinamit lokumları uzattı: 'Bu gece kralın mühimmat deposunu havaya uçuracaksın.' Ancak deponun hemen yanında sivil evler var.",
    secenekler: [
      {
        metin: "Görevi kabul et, sivil zayiatı umursama.",
        baseBasariSansi: 45,
        ipucu: "Harekette kahramanlık, ahlaki yıkım",
        basariliSonuc: {
          un: 35,
          para: 20,
          ahlak: -40,
          mesaj: "Depo devasa bir patlamayla havaya uçtu! Ancak yanındaki evler de yandı.",
          detay: "Hareketin kahramanısın ama yanan evlerden gelen çığlıkları hiç unutmayacaksın.",
        },
        basarisizSonuc: {
          saglik: -35,
          un: -25,
          olum_sansi: 15,
          mesaj: "Dinamiti yerleştirirken muhafızlar seni fark etti. Kurşun yağmuru altında patlamayı erken tetikledin, ağır yaralandın.",
          detay: "Cehennem gibi bir geceden sağ çıkman tamamen şanstı.",
        },
      },
      {
        metin: "Önce depodaki değerli şeyleri kendi cebine aktar, sonra patlat.",
        baseBasariSansi: 35,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara: Hem zengin ol hem kahraman",
        basariliSonuc: {
          para: 80,
          un: 20,
          ahlak: -40,
          mesaj: "Patlamadan önce içerideki altınları/kıymetli eşyaları çaldın. Sonra depoyu uçurdun.",
          detay: "Sen bir devrimci değil, savaştan beslenen bir akbabasın.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "Açgözlülüğün yüzünden geciktin. Muhafızlar seni depoda kıstırdı ve oracıkta kurşuna dizildin.",
        },
      },
      {
        metin: "Siviller ölür! Bu görevi yapamam.",
        baseBasariSansi: 85,
        ipucu: "Vicdanın rahatlar ama davana ihanet",
        basariliSonuc: {
          ahlak: 25,
          un: -15,
          mesaj: "Dinamitleri reddettin. Şehirdeki o evler yanmadı ama yoldaşların senden tiksiniyor.",
          detay: "Bazen hiçbir şey yapmamak en zor kahramanlıktır.",
        },
        basarisizSonuc: {
          dost_puani: -20,
          mesaj: "Reddin hareket içinde 'kralcı' olarak anılmana neden oldu.",
          detay: "Davan için her şeyi göze almadığın sürece aralarında yerin yok.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_liderlik_mucadelesi",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    gorsel: "⚔️",
    baslik: "Karanlık Liderlik",
    metin: "Yeni Nizam içinde kim liderlik edecek konusunda kanlı bir anlaşmazlık çıktı. İki aday da senden destek istiyor; ılımlı reformcular mı yoksa silahlı isyancılar mı?",
    secenekler: [
      {
        metin: "Ilımlı adayı destekle (Siyasi çözüm).",
        baseBasariSansi: 75,
        ipucu: "Ahlaki ve güvenli",
        basariliSonuc: {
          ahlak: 15,
          dost_puani: 10,
          mesaj: "Ilımlılar gücü aldı. Hareket kan dökmek yerine gazetelerle ve propagandayla ilerliyor.",
          detay: "Sağduyu bazen en değerli devrimdir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Silahlı isyancılar ılımlı adayı devirdi. Senin de itibarın yerle bir oldu.",
          detay: "İhtilaller genellikle en acımasız olanlara kalır.",
        },
      },
      {
        metin: "Atılgan ve kanlı adayı destekle (Silahlı isyan).",
        baseBasariSansi: 60,
        ipucu: "Radikal, tehlikeli ve acımasız",
        basariliSonuc: {
          un: 25,
          ahlak: -20,
          mesaj: "Kanlı lider başa geçti. Birlikte şehri yangın yerine çevirmeye hazırsınız.",
          detay: "Merhameti bir kenara bıraktın, sadece gücü istiyorsun.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -15,
          mesaj: "Kanlı adayın yaptığı fevri bir eylem yüzünden ordu üzerinize çöktü. Kaçarak kurtuldunuz.",
          detay: "Cesaret bazen aptallığa dönüşür.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_ihbar_tehdidi",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    gorsel: "⚠️",
    baslik: "Kapanmayan Geçmiş",
    metin: "Kralcıların arasındaki eski bir tanıdığın, senin Yeni Nizam üyesi olduğunu öğrendi. 'Ya bana yüklü bir para verirsin ya da generalin masasına kellen gider' diye tehdit ediyor.",
    secenekler: [
      {
        metin: "Ödemeyi yap, ağzını bağla.",
        baseBasariSansi: 85,
        maliyet: 35,
        ipucu: "Büyük bir para kaybı, ama hayatını kurtarır",
        basariliSonuc: {
          para: -35,
          mesaj: "Adama parayı verdin. Şimdilik sustu.",
          detay: "Fakat şantajcının bir kez para aldıktan sonra tekrar gelmeyeceğini kim garanti edebilir?",
        },
        basarisizSonuc: {
          para: -35,
          un: -20,
          mesaj: "Parayı verdin ama adam yine de seni ispiyonladı! Zar zor kaçtın.",
          detay: "Hainlere asla güvenilmez.",
        },
      },
      {
        metin: "Onu kandır ve gece vakti bir ara sokakta işini bitir.",
        baseBasariSansi: 40,
        maxAhlak: 45,
        ipucu: "Sadece karanlık olanlara: Ölümcül ve ahlaksız çözüm",
        basariliSonuc: {
          ahlak: -40,
          un: 15,
          etiket_ekle: [
            "sir:cinayet",
          ],
          mesaj: "Adamla buluşmaya kılıcınla gittin. Kimse görmeden işini bitirdin ve nehre attın.",
          detay: "Sırrın güvende. Ancak ruhun artık cehenneme bir adım daha yakın.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "Adam yalnız gelmemişti! Muhafızlarla sana pusu kurdu ve oracıkta vurularak öldün.",
        },
      },
      {
        metin: "Blöf yapıyor! Ona hiçbir şey verme.",
        baseBasariSansi: 65,
        ipucu: "Para sende kalır, risk %50",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bekledin. Hiçbir şey olmadı. Adam korkup şehri terk etmiş.",
          detay: "Bazen en iyi tepki, tepki vermemektir.",
        },
        basarisizSonuc: {
          un: -30,
          saglik: -10,
          para: -20,
          mesaj: "İhbar etti! Karargah basıldı. Rütbeni, paranı ve işini kaybedip sürgüne kaçtın.",
          detay: "Görmezden gelmenin bedeli hayatını sıfırlamak oldu.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_casus_supheliligi",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    gorsel: "🕵️",
    baslik: "Aramızda Bir Casus",
    metin: "Hareket içinde, kralın istihbaratına bilgi sızdıran bir casus olduğu şüphesi yayıldı. Parmaklar en sadık göründüğün yoldaşlardan birine uzanıyor; kanıt zayıf ama şüphe büyük.",
    secenekler: [
      {
        metin: "Şüpheliyi sorgula, gerekirse sert yöntemler kullan.",
        baseBasariSansi: 55,
        ipucu: "Hareketi korur ama masum olabilir",
        basariliSonuc: {
          un: 15,
          ahlak: -20,
          mesaj: "Sorgu altında gerçek casus itiraf etti! Hareket senin sayende büyük bir felaketten döndü.",
          detay: "Doğru olduğun ortaya çıktı ama kullandığın yöntemler seni rahatsız ediyor.",
        },
        basarisizSonuc: {
          ahlak: -30,
          dost_puani: -20,
          mesaj: "Adam masummuş! Yoldaşların seni acımasızlıkla suçladı, hareket içi güven sarsıldı.",
          detay: "Şüphe bazen en büyük hasarı masumlara verir.",
        },
      },
      {
        metin: "Kanıt olmadan kimseyi suçlama, sabırla gerçek casusu bekle.",
        baseBasariSansi: 60,
        ipucu: "Vicdanlı ama tehlikeli bir bekleyiş",
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Sabrın sonunda gerçek casus kendi hatasıyla ele verdi; kimseye haksızlık etmedin.",
          detay: "Adalet bazen acele etmeyenlere gülümser.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -15,
          olum_sansi: 5,
          mesaj: "Beklerken casus bilgi sızdırmaya devam etti; baskın sırasında ağır yaralandın.",
          detay: "Bazen sabrın bedeli ağır olur.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_yasak_notlar",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    gorsel: "📝",
    baslik: "Yasak Notlar",
    metin: "Bir üst subay, elinde reform fikirlerini içeren notlarınla seni yakaladı. Gözlerindeki ifadeyi okuyamıyorsun — seni ele mi verecek, yoksa...",
    secenekler: [
      {
        metin: "Notların senin olmadığını iddia et, yalan söyle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Subay ikna oldu, notları sana geri verip yoluna gitti.",
          detay: "Kalbin küt küt atarken rahat bir nefes aldın.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -10,
          mesaj: "Yalanın ortaya çıktı, hem yalancı hem hain damgası yedin.",
          detay: "Bir yalan çoğu zaman ikinci bir yalan gerektirir.",
        },
      },
      {
        metin: "Doğruyu söyle, fikirlerini savun.",
        baseBasariSansi: 60,
        ipucu: "Riskli ama subayın kendisi de gizliden reformcu olabilir",
        basariliSonuc: {
          un: 15,
          dost_puani: 10,
          mesaj: "Subay şaşırtıcı biçimde gülümsedi: 'Ben de öyle düşünüyorum' dedi.",
          detay: "Bazen cesaret beklenmedik müttefikler kazandırır.",
        },
        basarisizSonuc: {
          saglik: -10,
          un: -15,
          mesaj: "Subay seni raporladı, birkaç gün nezarette geçirdin.",
          detay: "Her subay senin yanında değil.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_genc_ikna",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    gorsel: "🗣️",
    baslik: "Genç Kalpleri Kazanmak",
    metin: "Yeni katılan birkaç genç asker kararsız görünüyor. Onları Yeni Nizam'ın safına çekebilirsen hareket güçlenir.",
    secenekler: [
      {
        metin: "Ateşli bir konuşma yap, onları coştur.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 15,
          dost_puani: 5,
          mesaj: "Sözlerin gençlerin gözlerinde bir kıvılcım yaktı, birkaçı hemen saflarına katıldı.",
          detay: "Bazen doğru kelimeler bir ordudan daha güçlüdür.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Konuşman fazla iddialı bulundu, bazıları seni tuhaf karşıladı.",
          detay: "Her söylev karşılık bulmaz.",
        },
      },
      {
        metin: "Tek tek, sakince onlarla konuş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          dost_puani: 8,
          ahlak: 5,
          mesaj: "Sabırlı yaklaşımın işe yaradı, gençler sana güvenmeye başladı.",
          detay: "Gerçek ikna genelde sessiz sohbetlerde olur.",
        },
        basarisizSonuc: {
          mesaj: "Bazıları ilgisiz kaldı ama kimseyi de kırmadın.",
          detay: "Her tohum aynı toprakta filizlenmez.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_eskimuhafiz_tuzagi",
    agirlik: 1.6,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    gorsel: "🪤",
    baslik: "Kokusu Çıkan Bir Tuzak",
    metin: "Eski Muhafızlar'dan biri sana 'gizli bir silah deposu' olduğunu söylediği bir yere gitmeni öneriyor. İçgüdülerin bunun bir tuzak olabileceğini fısıldıyor.",
    secenekler: [
      {
        metin: "Riski göze al, yine de git.",
        baseBasariSansi: 45,
        ipucu: "Gerçekten tuzak olabilir ama gerçek de olabilir",
        basariliSonuc: {
          mutluluk: -11,
          para: 30,
          un: 5,
          mesaj: "Depo gerçekmiş! Değerli malzemelerle geri döndün.",
          detay: "Bazen şüphe seni en değerli fırsatlardan alıkoyar.",
        },
        basarisizSonuc: {
          saglik: -20,
          para: -15,
          mesaj: "Tam bir tuzaktı, pusuya düşürüldün ve zar zor kaçtın.",
          detay: "İçgüdülerin haklıymış, keşke dinleseydin.",
        },
      },
      {
        metin: "Güvenilir birine önce sordur.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Araştırman doğru çıktı, tuzaktan kıl payı kurtuldun.",
          detay: "Temkinlilik bazen en büyük cesarettir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Fırsatı kaçırdın, üstelik depo gerçekmiş — birileri senden önce davrandı.",
          detay: "Bazen temkin bir bedel de ister.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_reform_sunumu",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    minRutbeSeviye: 2,
    gorsel: "📜",
    baslik: "Reform Teklifini Sunmak",
    metin: "Yeni Nizam sana bir fırsat verdi: reform tekliflerinizi doğrudan üst düzey bir subaya sunma şansı. Bu, hareketin en büyük anlarından biri olabilir.",
    secenekler: [
      {
        metin: "Cesurca, tavizsiz bir sunum yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 10,
          mesaj: "Sunumun subayı derinden etkiledi, bazı teklifler gerçekten değerlendirmeye alındı.",
          detay: "Yıllardır beklenen değişim belki de bugün başladı.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Subay teklifleri sertçe reddetti, seni küstahlıkla suçladı.",
          detay: "Her cesaret takdir görmez.",
        },
      },
      {
        metin: "Ilımlı, adım adım bir yaklaşım sun.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 10,
          mesaj: "Subay temkinli ama olumlu bir tepki verdi, küçük adımlarla ilerleme sözü aldın.",
          detay: "Bazen yavaş ilerlemek hiç ilerlememekten iyidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Teklif 'yetersiz ve ürkek' bulundu, kendi safındakiler bile hayal kırıklığına uğradı.",
          detay: "Bazen ne kadar dikkatli olsan da kimseyi memnun edemezsin.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_tarife_baskisi",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "⚖️",
    baslik: "Acımasız Tarife",
    metin: "Lonca ağaları, halk zaten kıtlıktayken un ve kumaş fiyatlarını iki katına çıkarma kararı aldı. Tüm üyelerin bu zalim tarifeye uyması şart.",
    secenekler: [
      {
        metin: "Loncaya uy, halkı sömür.",
        baseBasariSansi: 90,
        ipucu: "Para kazandırır, ahlakı bitirir",
        basariliSonuc: {
          para: 35,
          ahlak: -25,
          un: -10,
          mesaj: "Fiyatları artırdın. İnsanlar ağlayarak mal aldı. Loncada krallar gibisin.",
          detay: "Düzene bağlılık cüzdanı doldurur, vicdanı boşaltır.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -10,
          mesaj: "Halk fahiş fiyatlara isyan edip dükkânını taşladı.",
          detay: "Oturduğun altın koltuk, camların kırıldığında seni koruyamadı.",
        },
      },
      {
        metin: "Gizlice eski fiyattan satıp halkı koru.",
        baseBasariSansi: 45,
        ipucu: "Vicdanlı ama loncaya ihanet",
        basariliSonuc: {
          ahlak: 25,
          un: 20,
          mesaj: "Geceleri arka kapıdan fakirlere ucuza mal verdin. Şehirde bir melek gibi anılıyorsun.",
          detay: "Lonca fark etmedi. Hem kalbini temiz tuttun hem de ticareti sürdürdün.",
        },
        basarisizSonuc: {
          para: -30,
          un: -25,
          ahlak: 10,
          mesaj: "Lonca muhbirleri seni yakaladı! Loncaya ihanetten devasa bir ceza yedin.",
          detay: "İyiliğin bedelini iflasın eşiğine gelerek ödedin.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_yeni_uye_toreni",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "🌱",
    baslik: "Loncaya Yeni Kan",
    metin: "Zengin bir ailenin şımarık oğlu, sırf babasının parasıyla loncaya kabul edilmek istiyor. Senin kefaletini istiyor.",
    secenekler: [
      {
        metin: "Kefil ol, gelecekteki bağlantılara yatırım yap.",
        baseBasariSansi: 75,
        ipucu: "Uzun vadeli bağlantı, kısa vadeli baş ağrısı",
        basariliSonuc: {
          mutluluk: -6,
          un: -2,
          para: 15,
          dost_puani: 8,
          mesaj: "Kefil oldun; babası minnettarlığını hemen bir hediyeyle gösterdi.",
          detay: "Loncada bağlantılar bazen sermayeden daha değerlidir.",
        },
        basarisizSonuc: {
          mutluluk: -9,
          para: -10,
          mesaj: "Şımarık oğlan ilk haftadan bir skandala karıştı, adın da lekelendi.",
          detay: "Bazı kefaletler pişmanlıkla sonuçlanır.",
        },
      },
      {
        metin: "Kibarca reddet, kendi işine odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Reddettin; zamanını kendi ticaretine ayırdın.",
          detay: "Her bağlantı peşinden koşmaya değmez.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Ailesi bunu bir hakaret sayıp lonca içinde senden söz etmeye başladı.",
          detay: "Nazik bir hayır bile bazen düşman kazandırır.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_resmi_denetim",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "🚨",
    baslik: "Müfettişin Gölgesi",
    metin: "Resmi makamlar, Liman Loncası'nı fiyat tekeli kurmakla suçlayıp defterleri incelemeye geldi. Sıra sana da gelebilir.",
    secenekler: [
      {
        metin: "Defterlerini geceden düzelt, izleri sil.",
        baseBasariSansi: 55,
        ipucu: "Riskli ama denetimi atlatabilirsin",
        basariliSonuc: {
          ahlak: -10,
          mesaj: "Defterleri temizledin; müfettiş hiçbir şey bulamadan gitti.",
          detay: "Bir kez daha yalanla temize çıktın.",
        },
        basarisizSonuc: {
          para: -30,
          un: -20,
          mesaj: "Sahtecilik ortaya çıktı! Ağır bir para cezasına çarptırıldın.",
          detay: "Bazı yalanlar defterlerde iz bırakır.",
        },
      },
      {
        metin: "Defterlerini olduğu gibi göster, dürüst davran.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Defterlerin tertemizdi; müfettiş elini sıkıp gitti.",
          detay: "Dürüstlük bazen en sağlam savunmadır.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Dürüst olsan da lonca âdetlerinden birkaçı seni hafif zora soktu.",
          detay: "Herkes senin kadar temiz değil.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_eski_dost_ikna",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "🤝",
    baslik: "Karşı Saftaki Dost",
    metin: "Pazar Birliği'ndeki eski bir dostun, tekelciliğin halkı ezdiğini söyleyip saf değiştirmen için sana yalvarıyor.",
    secenekler: [
      {
        metin: "Nazikçe reddet, loncana sadık kal.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Kararlılığını gösterdin; dostun hayal kırıklığıyla ayrıldı.",
          detay: "Sadakatin bir bedeli var, çoğu zaman bir dostluk.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Reddin, dostluğunuzda derin bir çatlak açtı.",
          detay: "Bazı hayır cevapları asla unutulmaz.",
        },
      },
      {
        metin: "Sözlerini ciddiye al, vicdanını sorgula.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Dostunun sözleri seni derinden etkiledi; gizlice halka birkaç iyilik yapmaya başladın.",
          detay: "Vicdan bazen loncanın kurallarından daha yüksek sesle konuşur.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Tereddüdün lonca içinde fark edildi, sana güven azaldı.",
          detay: "Kararsızlığın bir bedeli var.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_ambargo_karari",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "⚓",
    baslik: "Limanı Kapat",
    metin: "Lonca ağaları, rakip bir şehrin mallarını limana sokmamak için ambargo kararı aldı. Bu, senin bazı eski müşterilerini de kaybetmen anlamına gelebilir.",
    secenekler: [
      {
        metin: "Ambargoya tam uy, loncaya sadakatini göster.",
        baseBasariSansi: 80,
        ipucu: "Lonca içinde itibar, dışarıda kayıp müşteri",
        basariliSonuc: {
          un: 12,
          para: -10,
          mesaj: "Ambargoya harfiyen uydun; lonca ağaları sadakatini not etti.",
          detay: "Bazı kazançlar hemen değil, itibar olarak gelir.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Ambargo, tahmininden çok daha fazla müşterini kaçırdı.",
          detay: "Kararların bazen beklenenden pahalıya patlar.",
        },
      },
      {
        metin: "Gizli bir ara yoldan eski müşterilerine mal ulaştırmaya devam et.",
        baseBasariSansi: 45,
        ipucu: "Riskli ama kazançlı bir ihanet",
        basariliSonuc: {
          para: 35,
          ahlak: -10,
          mesaj: "Gizli yollardan ticaretini sürdürdün; hem para hem müşteri kaybetmedin.",
          detay: "Loncanın kuralları esnek bir vicdana göre bükülebiliyor.",
        },
        basarisizSonuc: {
          para: -25,
          un: -20,
          mesaj: "Lonca casusları seni yakaladı! Ambargoyu deldiğin için ağır para cezası ödedin.",
          detay: "Gizli işler her zaman gizli kalmıyor.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_lonca_muhru",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "🔏",
    baslik: "Loncanın Mührü",
    metin: "Lonca ustaları, mallarını 'Liman Loncası onaylıdır' mührüyle damgalamana izin verebilir — ama bunun için sıkı kurallara uymayı kabul etmen gerekiyor.",
    secenekler: [
      {
        metin: "Kuralları kabul et, mührü al.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: -6,
          para: 15,
          un: 5,
          mesaj: "Mühür artık senin, müşteriler malına daha çok güveniyor.",
          detay: "İtibar bazen altından daha değerlidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Mührü aldın ama sıkı denetimler bazı işlerini yavaşlattı.",
          detay: "Her ayrıcalığın bir bedeli var.",
        },
      },
      {
        metin: "Reddet, kendi yolunda kalmak istiyorsun.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Bağımsızlığını korudun, kimseye hesap vermiyorsun.",
          detay: "Özgürlük bazen en büyük servettir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Lonca dışı kalman bazı büyük müşterileri ürküttü.",
          detay: "Bazı kapılar mühürsüz açılmıyor.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_rakip_gemi_kazasi",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "🚢",
    baslik: "Sulara Gömülen Yük",
    metin: "Pazar Birliği'ne yakın bir tüccarın gemisi fırtınada battı. Yükünün bir kısmı kıyıya vurdu — kimse görmeden toplayabilirsin.",
    secenekler: [
      {
        metin: "Malları topla, kimseye söyleme.",
        baseBasariSansi: 70,
        ipucu: "Kolay kazanç ama vicdanını yorar",
        basariliSonuc: {
          para: 35,
          ahlak: -10,
          mesaj: "Malları sessizce topladın, kesen kabardı.",
          detay: "Talih bazen başkasının felaketinden doğar.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Seni malları toplarken gördüler, 'leş kargası' diye anıldın bir süre.",
          detay: "Bazı fırsatlar utanç da getirir.",
        },
      },
      {
        metin: "Gemi sahibine haber ver, yardım teklif et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 10,
          dost_puani: 5,
          mesaj: "Yardımın karşılıksız kalmadı, tüccar sana minnettar kaldı.",
          detay: "Bazen rakibine uzattığın el en değerli yatırımdır.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Yardım ettin ama bu sana biraz zaman ve paraya mal oldu.",
          detay: "İyilik her zaman hemen karşılık bulmaz.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_eski_usul_anlasma",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "🤝",
    baslik: "El Sıkışmayla Yeter",
    metin: "Yaşlı bir lonca üyesi, hiçbir yazılı belge olmadan sadece el sıkışarak büyük bir anlaşma yapmak istiyor. 'Eskiden söz senetten önce gelirdi' diyor.",
    secenekler: [
      {
        metin: "El sıkış, sözüne güven.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -10,
          para: 25,
          un: 5,
          mesaj: "Adam sözünü tuttu, anlaşma kusursuz işledi.",
          detay: "Bazen en eski usuller en sağlamıdır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "Adam sözünden caydı, elinde hiçbir belge olmadığı için hakkını arayamadın.",
          detay: "Güven bazen pahalıya patlar.",
        },
      },
      {
        metin: "Israrla yazılı belge iste.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 10,
          mesaj: "Belgeyle güvence altına aldın, adam biraz gücense de anlaşma sağlam.",
          detay: "Temkinli tüccar uzun yaşar.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Israrın adamı gücendirdi, 'bize güvenmiyor' diye lonca içinde konuşuldu.",
          detay: "Güvensizlik bazen itibar kaybettirir.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_hazine_sandigi",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    gorsel: "💰",
    baslik: "Loncanın Ortak Sandığı",
    metin: "Lonca, ortak bir yardım sandığı kurmak istiyor — zor günde birbirine destek olmak için. Senden de katkı bekleniyor.",
    secenekler: [
      {
        metin: "Cömertçe katkıda bulun.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -20,
          un: 15,
          ahlak: 10,
          mesaj: "Katkın loncada takdirle karşılandı, artık sözün daha çok geçiyor.",
          detay: "Cömertlik bazen en iyi yatırımdır.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Katkıda bulundun ama beklediğin takdiri göremedin.",
          detay: "Her iyilik alkışlanmaz.",
        },
      },
      {
        metin: "Asgari miktarı ver, fazlasını sakla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -5,
          mesaj: "Kimse fazla dikkat etmedi, kesen ağırlığını korudu.",
          detay: "Temkinli davranmak her zaman kötü değildir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Cimriliğin fark edildi, birkaç lonca üyesi arkandan konuştu.",
          detay: "Küçük hesaplar bazen büyük dedikodulara dönüşür.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_boykot_cagrisi",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "🚫",
    baslik: "Boykot Sancısı",
    metin: "Pazar Birliği, soyluların Liman Loncası'na karşı büyük bir boykot başlattı. Üyelerden hiçbiri liman mallarını almayacak. Dükkanın bu mallar olmadan batabilir.",
    secenekler: [
      {
        metin: "Boykota tam destek ver, dükkanı feda et.",
        baseBasariSansi: 60,
        ipucu: "Maddi hasar ama Pazar Birliği'nde kahraman olursun",
        basariliSonuc: {
          un: 30,
          para: -20,
          ahlak: 15,
          mesaj: "Rafların boş kaldı ama Pazar Birliği'nin sembolü oldun. Esnaf sana büyük saygı duyuyor.",
          detay: "İlkelerin için cüzdanını kanattın.",
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -15,
          mesaj: "Boykot işe yaramadı! Liman Loncası boykotu kırdı. Boşu boşuna zarara girdin.",
          detay: "İdealizm karın doyurmuyor.",
        },
      },
      {
        metin: "Gizlice limandan mal almaya devam et.",
        baseBasariSansi: 50,
        ipucu: "Riskli ikiyüzlülük",
        basariliSonuc: {
          para: 40,
          ahlak: -15,
          mesaj: "Rafların doluydu ve boykot varken tekel oldun. Çok kazandın.",
          detay: "İhanet tatlı meyveler verebiliyor.",
        },
        basarisizSonuc: {
          para: -25,
          un: -35,
          saglik: -10,
          mesaj: "Pazar esnafı ihanetini öğrendi! Gece dükkânını taşlayıp mallarını yaktılar.",
          detay: "Esnafın öfkesi soylularınkinden çok daha acımasızdır.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_genc_girisimciler",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "🌱",
    baslik: "Genç Girişimciler",
    metin: "Birlik içindeki genç girişimciler seni bir örnek olarak görüyor, senden akıl hocalığı istiyorlar.",
    secenekler: [
      {
        metin: "Akıl hocalığını kabul et.",
        baseBasariSansi: 75,
        basariliSonuc: {
          dost_puani: 10,
          un: 5,
          mesaj: "Genç girişimcilere yol gösterdin, saygı kazandın.",
          detay: "Bilgini paylaşmak seni de zenginleştirdi.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Akıl hocalığı zaman aldı, kendi işlerin aksadı.",
          detay: "Her iyilik bir bedel taşıyabilir.",
        },
      },
      {
        metin: "Nazikçe reddet, kendi işine odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 8,
          mesaj: "Reddettin, o zamanı kendi işine ayırdın.",
          detay: "Herkese zaman ayırmak zorunda değilsin.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Reddin bazı gençleri hayal kırıklığına uğrattı.",
          detay: "Her hayır bir küçük hayal kırıklığı taşır.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_resmi_baski",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "🚨",
    baslik: "Resmi Makamların Gölgesi",
    metin: "Resmi makamlar, Pazar Birliği'ni düzeni bozmakla suçlayıp üyelerini soruşturmaya başladı. Sıra sana da gelebilir.",
    secenekler: [
      {
        metin: "Saklan, ortalıkta görünme.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Bir süre gözden uzak durdun, soruşturma seni atlattı.",
          detay: "Sabır bazen en iyi savunmadır.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Saklanman fark edildi, hafif bir para cezası ödedin.",
          detay: "Gizlenmek her zaman işe yaramıyor.",
        },
      },
      {
        metin: "Açıkça direniş göster.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 18,
          ahlak: 5,
          mesaj: "Direncin Birlik içinde seni bir sembol hâline getirdi.",
          detay: "Cesaretin karşılığını buldu.",
        },
        basarisizSonuc: {
          para: -25,
          saglik: -10,
          mesaj: "Direncin bedelini ağır ödedin; malına el konuldu, kısa süre gözaltına alındın.",
          detay: "Her direniş bir bedel ister.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_eski_dost_ikna",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "🤝",
    baslik: "Eski Bir Dostun Çağrısı",
    metin: "Liman Loncası'ndaki eski bir dostun, seni eski düzene geri dönmeye ikna etmeye çalışıyor.",
    secenekler: [
      {
        metin: "Nazikçe reddet, yoluna devam et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Nazikçe reddettin; dostluğunuz zedelenmedi.",
          detay: "Kararlılık dostluğu bozmak zorunda değil.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Reddin dostunu biraz üzdü.",
          detay: "Her hayır bir iz bırakabilir.",
        },
      },
      {
        metin: "Teklifini ciddiye al, düşün.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          mesaj: "Düşünmen sana biraz zaman ve küçük bir teklif kazandırdı.",
          detay: "Açık fikirli olmak bazen kazandırır.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Tereddüdün Birlik içinde fark edildi, güvenin sorgulandı.",
          detay: "Kararsızlığın bir bedeli var.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_ortak_depo",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "🏚️",
    baslik: "Ortak Depo Girişimi",
    metin: "Birlik, küçük esnafın tek başına karşılayamayacağı büyük siparişleri toplu almak için ortak bir depo kurma fikrini tartışıyor. Katkı vermek zorlu olacak ama getirisi büyük olabilir.",
    secenekler: [
      {
        metin: "Payına düşeni ver, ortak depoya katıl.",
        baseBasariSansi: 70,
        maliyet: 20,
        ipucu: "Kısa vadede masraf, uzun vadede güç birliği",
        basariliSonuc: {
          para: -14,
          maas_carpani: 1.05,
          mesaj: "Ortak depo kuruldu; artık büyük siparişlerde tek başına değilsin.",
          detay: "Birlikte hareket etmek küçük esnafa büyüklerle rekabet gücü veriyor.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Depo kuruldu ama yönetimi beklediğin kadar verimli işlemiyor.",
          detay: "Ortak girişimler her zaman pürüzsüz ilerlemiyor.",
        },
      },
      {
        metin: "Katılma, kendi başına yeter.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Katılmadın; bağımsızlığını korudun.",
          detay: "Yalnız hareket etmek her zaman özgürlük getirir, güç değil.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Katılmayışın, Birlik içinde 'bencil' olarak yorumlandı.",
          detay: "Bireysellik bazen dayanışma pahasına gelir.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_serbest_pazar",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "📢",
    baslik: "Serbest Pazar Çağrısı",
    metin: "Pazar Birliği, loncanın kurallarını hiçe sayarak izinsiz bir pazar günü düzenlemeyi planlıyor. Katılmak riskli ama kazançlı olabilir.",
    secenekler: [
      {
        metin: "Coşkuyla katıl, tezgahını kur.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: -11,
          para: 30,
          un: 8,
          mesaj: "Pazar büyük ilgi gördü, malların kapış kapış gitti.",
          detay: "Bazen kural tanımazlık en çok kazandıran şeydir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -10,
          mesaj: "Lonca muhafızları pazarı bastı, malına el konuldu.",
          detay: "Her isyanın bir bedeli vardır.",
        },
      },
      {
        metin: "Destek ver ama tezgah açma, temkinli ol.",
        baseBasariSansi: 80,
        basariliSonuc: {
          dost_puani: 5,
          mesaj: "Destek verdin, riske girmeden hareketin bir parçası oldun.",
          detay: "Bazen arkadan itmek de bir katkıdır.",
        },
        basarisizSonuc: {
          mesaj: "Temkinli kaldın ama bazıları bunu 'cesaretsizlik' olarak yorumladı.",
          detay: "Her temkin takdir edilmez.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_lonca_casusu",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "🎭",
    baslik: "Aramızdaki Casus",
    metin: "Pazar Birliği içinde birinin Liman Loncası'na bilgi sızdırdığından şüpheleniliyor. Şüpheler bir arkadaşın üzerinde yoğunlaşıyor.",
    secenekler: [
      {
        metin: "Arkadaşını sorgula, gerçeği öğren.",
        baseBasariSansi: 60,
        ipucu: "Dostluğunu riske atabilir",
        basariliSonuc: {
          dost_puani: -5,
          un: 12,
          mesaj: "Gerçek casus başkasıymış, arkadaşınla yanlış anlaşmayı çözdünüz.",
          detay: "Şüphe bazen en yakınındakini de yaralar.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          mesaj: "Sorgulaman arkadaşını derinden inciteti, aranız uzun süre soğuk kaldı.",
          detay: "Bazı sorular sorulmasa daha iyiydi.",
        },
      },
      {
        metin: "Sessizce kendi araştırmanı yap.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 13,
          mesaj: "Gerçek casusu sessizce tespit edip birliğe bildirdin, kimse incinmedi.",
          detay: "Sabırlı bir araştırma çoğu zaman en iyi yoldur.",
        },
        basarisizSonuc: {
          mesaj: "Araştırman sonuçsuz kaldı, şüpheler hâlâ havada asılı.",
          detay: "Her gizem çözülmez.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_halka_acik_fiyat",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "📋",
    baslik: "Fiyatları Halka Açıklamak",
    metin: "Pazar Birliği, loncanın gizli tuttuğu fiyat anlaşmalarını halka açıklamak istiyor. Bu, halkın gözünde kahraman yapabilir ya da güçlü düşmanlar kazandırabilir.",
    secenekler: [
      {
        metin: "Fiyatları meydanda yüksek sesle açıkla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          dost_puani: 10,
          mesaj: "Halk seni alkışladı, 'gerçek bir halk tüccarı' dediler.",
          detay: "Cesaretin seni bir simaya dönüştürdü.",
        },
        basarisizSonuc: {
          rakip_puani: 15,
          para: -10,
          mesaj: "Lonca seni dava etmekle tehdit etti, birkaç müşterini kaybettin.",
          detay: "Güçlülere meydan okumanın bedeli ağırdır.",
        },
      },
      {
        metin: "Bilgiyi sadece güvendiklerine fısılda.",
        baseBasariSansi: 80,
        basariliSonuc: {
          dost_puani: 8,
          mesaj: "Bilgi sessizce yayıldı, sen risk almadan amacına ulaştın.",
          detay: "Bazen fısıltı bağırmaktan daha etkilidir.",
        },
        basarisizSonuc: {
          mesaj: "Fısıltın pek yayılmadı, beklediğin etkiyi yaratamadı.",
          detay: "Her fısıltı duyulmaz.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_genc_ortaklik",
    agirlik: 1.6,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    gorsel: "🌱",
    baslik: "Genç Bir Ortaklık Teklifi",
    metin: "Hırslı genç bir tüccar, seninle ortaklık kurup yeni bir pazar açmak istiyor. Fikirleri cesur ama tecrübesiz.",
    secenekler: [
      {
        metin: "Teklifi kabul et, riski paylaş.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -10,
          para: 25,
          un: 5,
          mesaj: "Ortaklığınız beklenmedik şekilde tuttu, ikiniz de kazandınız.",
          detay: "Bazen en büyük fırsatlar en genç fikirlerden doğar.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "Girişim çöktü, tecrübesizlik pahalıya patladı.",
          detay: "Her cesur fikir başarıya ulaşmaz.",
        },
      },
      {
        metin: "Nazikçe reddet, önce tecrübe kazanmasını öner.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Genç tüccar tavsiyeni takdir etti, ileride tekrar geleceğini söyledi.",
          detay: "Bazen en iyi yardım hayır demektir.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Reddin onu kırdı, bir daha senle çalışmak istemedi.",
          detay: "Her ret nazikçe alınmaz.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_ritüel_koruma",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "🕯️",
    baslik: "Eski Ritüeller",
    metin: "Gelenekçiler, yüzyıllardır süregelen bir ritüeli aynen korumanı istiyor; bazı gençler bunu eskimiş buluyor.",
    secenekler: [
      {
        metin: "Ritüeli aynen uygula.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 8,
          un: 5,
          mesaj: "Ritüeli titizlikle uyguladın; yaşlı cemaat üyeleri seni takdir etti.",
          detay: "Geleneğe bağlılık saygı kazandırıyor.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Ritüelde küçük bir hata yaptın, bazı yaşlılar bunu fark etti.",
          detay: "Gelenek titizlik ister.",
        },
      },
      {
        metin: "Ritüeli biraz sadeleştir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 4,
          dost_puani: 8,
          mesaj: "Sadeleştirmen gençler tarafından beğenildi.",
          detay: "Küçük değişiklikler bazen köprü kurar.",
        },
        basarisizSonuc: {
          ahlak: -8,
          mesaj: "Sadeleştirmen Gelenekçiler arasında tepki topladı.",
          detay: "Geleneği değiştirmek risklidir.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_sapkinlik_suclamasi",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "⚖️",
    baslik: "Sapkınlık Suçlaması",
    metin: "Yenilikçi bir vaiz sapkınlıkla suçlanıyor; Gelenekçiler senden de bu suçlamaya katılmanı bekliyor.",
    secenekler: [
      {
        metin: "Suçlamaya katıl.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 10,
          ahlak: -8,
          mesaj: "Suçlamaya katıldın; Gelenekçiler arasında itibarın arttı.",
          detay: "Ama vicdanında bir ağırlık bıraktı.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mesaj: "Suçlaman sert bulundu, bazı cemaat üyeleri rahatsız oldu.",
          detay: "Sertlik her zaman istenen etkiyi yaratmıyor.",
        },
      },
      {
        metin: "Sessiz kal, karışma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Sessiz kaldın; vicdanın rahat ama bazı Gelenekçiler seni yetersiz sadakatle suçladı.",
          detay: "Tarafsızlık her zaman ödüllendirilmiyor.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Sessizliğin zayıflık olarak yorumlandı.",
          detay: "Bazı sessizlikler yanlış anlaşılıyor.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_otorite_mucadelesi",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "📖",
    baslik: "Otorite Mücadelesi",
    metin: "Gelenekçiler içinde kimin daha yetkili olduğuna dair bir anlaşmazlık büyüdü. Taraf tutman isteniyor.",
    secenekler: [
      {
        metin: "En kıdemli üyeyi destekle.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          dost_puani: 5,
          mesaj: "Kıdemliyi desteklemen geleneğe uygun bulundu.",
          detay: "Hiyerarşiye saygı takdir görüyor.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Desteğin bazılarınca yağcılık sayıldı.",
          detay: "Her destek aynı şekilde algılanmıyor.",
        },
      },
      {
        metin: "Tarafsız kal.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Tarafsız kaldın; kimse seni suçlamadı.",
          detay: "Bazen en güvenli yol taraf tutmamaktır.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Tarafsızlığın kararsızlık olarak görüldü.",
          detay: "Her tarafsızlık anlayışla karşılanmıyor.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_kati_algisi",
    agirlik: 1.6,
    kategori: "sosyal",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "🗣️",
    baslik: "Katı Biri misin?",
    metin: "Halkın bir kesimi seni fazla katı buluyor; bazıları senden uzaklaşmaya başladı.",
    secenekler: [
      {
        metin: "Duruşunu koru, açıklama yapma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Duruşunu korudun; Gelenekçiler seni takdir etti.",
          detay: "Kararlılık bazen yeterlidir.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Sessizliğin bazı cemaat üyelerini daha da uzaklaştırdı.",
          detay: "Her sessizlik anlaşılmıyor.",
        },
      },
      {
        metin: "Yumuşak bir açıklama yap.",
        baseBasariSansi: 60,
        basariliSonuc: {
          dost_puani: 8,
          mesaj: "Açıklaman bazılarının bakışını yumuşattı.",
          detay: "Küçük bir çaba bazen köprü kurar.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Açıklaman Gelenekçiler arasında 'yumuşaklık' olarak eleştirildi.",
          detay: "Her açıklama takdir görmüyor.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_uzlasma_teklifi",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "🕊️",
    baslik: "Gizli Bir Uzlaşma Teklifi",
    metin: "Yenilikçilerden biri, gizlice seninle temasa geçip iki grup arasında bir uzlaşma köprüsü kurmak istiyor.",
    secenekler: [
      {
        metin: "Teklifi kabul et, köprü kurmayı dene.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 10,
          dost_puani: 8,
          mesaj: "Uzlaşma girişimin küçük ama gerçek bir adım oldu.",
          detay: "Köprü kurmak cesaret ister.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Girişimin Gelenekçiler arasında hoş karşılanmadı.",
          detay: "Her uzlaşma çabası anlaşılmıyor.",
        },
      },
      {
        metin: "Teklifi reddet, saflığını koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 5,
          mesaj: "Reddettin; Gelenekçiler arasındaki konumun sağlamlaştı.",
          detay: "Netlik bazen en güvenli yoldur.",
        },
        basarisizSonuc: {
          mesaj: "Reddin köprü kurma fırsatını kapattı.",
          detay: "Her fırsat bir daha gelmeyebilir.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_eski_metinler_bekcisi",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "📖",
    baslik: "Eski Metinlerin Bekçisi",
    metin: "Manastırın en eski el yazmalarından biri çürümeye yüz tutmuş. Onu yeniden kopyalamak günler sürecek, ama metnin kutsallığını korumak Gelenekçiler için çok önemli.",
    secenekler: [
      {
        metin: "Günlerini bu işe adayarak titizlikle kopyala.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          un: 10,
          mesaj: "Kopyaladığın metin kusursuz oldu, cemaat seni 'gerçek bir bekçi' olarak andı.",
          detay: "Bazı emekler sabırla ölçülür.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Günlerce eğilerek çalışmak belini yordu, üstelik birkaç hata yaptın.",
          detay: "Her emek kusursuz sonuç vermez.",
        },
      },
      {
        metin: "Bir çırağa devret, sen sadece denetle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Çırak işi iyi hallettti, senin zamanın da boşa gitmedi.",
          detay: "Bazen görevi devretmek de bir bilgeliktir.",
        },
        basarisizSonuc: {
          ahlak: -5,
          mesaj: "Çırak birkaç ciddi hata yaptı, metnin bir kısmı yanlış kopyalandı.",
          detay: "Devredilen sorumluluk bazen geri teper.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_cemaat_yaslilari",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "👴",
    baslik: "Yaşlıların Meclisi",
    metin: "Cemaatin en yaşlı üyeleri seni meclislerine çağırdı. Sana eski bir ayin hakkında sorular soracaklar — cevapların bağlılığını kanıtlayacak.",
    secenekler: [
      {
        metin: "Geleneksel cevapları harfiyen tekrarla.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 10,
          un: 1,
          mesaj: "Yaşlılar memnun kaldı, 'gerçek bir Gelenekçi' olduğunu onayladılar.",
          detay: "Bazen sadakat ezbere değil, içtenlikle ölçülür.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Birkaç detayı yanlış hatırladın, yaşlılar hayal kırıklığına uğradı.",
          detay: "Gelenek affetmez unutkanlığı.",
        },
      },
      {
        metin: "Kendi yorumunu da katarak cevapla.",
        baseBasariSansi: 55,
        ipucu: "Riskli ama derinliğini gösterebilir",
        basariliSonuc: {
          un: 3,
          ahlak: 15,
          mesaj: "Yorumun bazı yaşlıları etkiledi, 'bu genç düşünüyor' dediler takdirle.",
          detay: "Gelenek bazen taze bir bakışla daha da güçlenir.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Yorumun küstahlık sayıldı, 'kendini bilmez' diye anıldın.",
          detay: "Her yenilik gelenek içinde hoş karşılanmaz.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_kutsal_emanet_nakli",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "🏺",
    baslik: "Kutsal Emanetin Yolculuğu",
    metin: "Değerli bir kutsal emaneti tehlikeli bir yoldan başka bir kutsal mekâna taşımakla görevlendirildin. Yol üstünde haydutlar olabilir.",
    secenekler: [
      {
        metin: "Ana yoldan, hızlıca git.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 15,
          ahlak: 5,
          mesaj: "Emaneti güvenle teslim ettin, cemaat seneler boyu bu yolculuğu anlatacak.",
          detay: "Cesaret bazen en kısa yoldur.",
        },
        basarisizSonuc: {
          saglik: -15,
          para: -10,
          mesaj: "Haydutlar seni bastı, dövülerek soyuldun ama emanet elinde kaldı.",
          detay: "Kutsal olan bazen bedenin bedeliyle korunur.",
        },
      },
      {
        metin: "Uzun ama güvenli bir dolambaçlı yoldan git.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sessizce, tehlikesizce vardın.",
          detay: "Sabır bazen en bilge yoldur.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Uzun yolculuk seni yordu, gecikmen cemaati endişelendirdi.",
          detay: "Güvenlik bazen zamandan çalar.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_yenilikci_vaaz_engelleme",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    gorsel: "🚫",
    baslik: "Tehlikeli Bir Vaaz",
    metin: "Yenilikçiler'den biri, cemaatin önünde geleneği sarsacak bir vaaz vermeyi planlıyor. Gelenekçiler senden bunu engellemeni istiyor.",
    secenekler: [
      {
        metin: "Vaazdan önce halka gerçeği anlat, onu gözden düşür.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          rakip_puani: 10,
          mesaj: "Konuşman etkili oldu, vaaz ilgi görmeden geçti.",
          detay: "Sözler bazen en keskin kalkandır.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Girişimin ters tepti, 'korkak' ve 'engelleyici' diye anıldın.",
          detay: "Her müdahale ters sonuç doğurabilir.",
        },
      },
      {
        metin: "Karışma, fikirlerin kendi başına yargılanmasına izin ver.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Karışmadın, cemaat kendi kararını verdi.",
          detay: "Bazen en bilge tepki sessizlik olur.",
        },
        basarisizSonuc: {
          mesaj: "Sessizliğin bazı Gelenekçiler tarafından 'ilgisizlik' olarak görüldü.",
          detay: "Her tarafsızlık takdir edilmez.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_yeni_yorum",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    gorsel: "📖",
    baslik: "Yeni Bir Yorum",
    metin: "Yenilikçiler, kutsal metinlerin yeni bir yorumunu/çevirisini hazırlıyor; senden destek ve katkı bekliyorlar.",
    secenekler: [
      {
        metin: "Çalışmaya aktif katkı ver.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 12,
          ahlak: 5,
          mesaj: "Katkın çalışmayı zenginleştirdi; adın Yenilikçiler arasında öne çıktı.",
          detay: "Emeğin karşılığını buldu.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Çalışma beklenenden zor çıktı, seni yordu.",
          detay: "Her katkı kolay olmuyor.",
        },
      },
      {
        metin: "Uzaktan destekle, fazla karışma.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Ölçülü desteğin yeterli bulundu.",
          detay: "Her katkı büyük olmak zorunda değil.",
        },
        basarisizSonuc: {
          dost_puani: -3,
          mesaj: "Mesafeli duruşun bazılarını hayal kırıklığına uğrattı.",
          detay: "Her mesafe anlaşılmıyor.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_sapkinlik_suclamasi",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    gorsel: "⚖️",
    baslik: "Sapkınlıkla Suçlanmak",
    metin: "Gelenekçiler seni açıkça sapkınlıkla suçladı. Bu, cemaat içindeki konumunu ciddi şekilde sarsabilir.",
    secenekler: [
      {
        metin: "Kendini açıkça savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 10,
          ahlak: 8,
          mesaj: "Savunman ikna ediciydi; suçlama büyük ölçüde etkisiz kaldı.",
          detay: "Cesur bir savunma seni güçlendirdi.",
        },
        basarisizSonuc: {
          un: -15,
          mutluluk: -8,
          mesaj: "Savunman yeterince ikna edici bulunmadı, itibarın sarsıldı.",
          detay: "Her savunma başarılı olmuyor.",
        },
      },
      {
        metin: "Sessiz kal, fırtınanın geçmesini bekle.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sessizliğin zamanla suçlamanın etkisini azalttı.",
          detay: "Bazen zaman en iyi savunmadır.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Sessizliğin suçlamayı kabul etmek olarak yorumlandı.",
          detay: "Her sessizlik yanlış anlaşılabiliyor.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_fikir_ayriligi",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    gorsel: "💭",
    baslik: "Grup İçi Fikir Ayrılığı",
    metin: "Yenilikçiler içinde bile ne kadar ileri gidileceğine dair bir anlaşmazlık var. Sen ölçülü mü, radikal mi olacaksın?",
    secenekler: [
      {
        metin: "Ölçülü değişimi savun.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          dost_puani: 5,
          mesaj: "Ölçülü tavrın çoğunluk tarafından benimsendi.",
          detay: "Denge bazen en güçlü duruştur.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Ölçülü tavrın bazı radikal üyeleri hayal kırıklığına uğrattı.",
          detay: "Her ölçülülük takdir görmüyor.",
        },
      },
      {
        metin: "Radikal değişimi savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          mesaj: "Radikal tavrın bazılarını heyecanlandırdı, adın öne çıktı.",
          detay: "Cesaret bazen dikkat çeker.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "Radikal tavrın ölçülü üyeleri ürküttü, grup içinde bölünme derinleşti.",
          detay: "Her radikallik bölücü olabilir.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_halk_algisi",
    agirlik: 1.6,
    kategori: "sosyal",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    gorsel: "🗣️",
    baslik: "Öncü müsün?",
    metin: "Halkın bir kesimi seni cesur bir öncü olarak görüyor, bir kesimi ise güvensiz buluyor.",
    secenekler: [
      {
        metin: "Öncülerle vakit geçir, ilham al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 4,
          un: 5,
          mesaj: "Destekçilerinle geçirdiğin zaman seni güçlendirdi.",
          detay: "İlham bazen basit bir sohbetten gelir.",
        },
        basarisizSonuc: {
          mesaj: "Destekçilerin arasında bile fikir ayrılıkları vardı.",
          detay: "Hiçbir grup tam bir uyum içinde değil.",
        },
      },
      {
        metin: "Şüphecilerle konuş, onları anlamaya çalış.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 8,
          dost_puani: 5,
          mesaj: "Konuşman bazı şüphecilerin bakışını yumuşattı.",
          detay: "Anlamaya çalışmak köprü kurar.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Konuşma gerginleşti, seni daha da yordu.",
          detay: "Her diyalog kolay olmuyor.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_susturma_girisimi",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    gorsel: "🔇",
    baslik: "Susturma Girişimi",
    metin: "Otoriteler, senin gibi seslerin çok yükseldiğini düşünüyor ve seni susturmaya çalışıyor.",
    secenekler: [
      {
        metin: "Sesini yükseltmeye devam et.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 20,
          ahlak: 8,
          mesaj: "Sesini yükseltmeye devam ettin; bu cesaret seni bir sembol hâline getirdi.",
          detay: "Bazı bedeller, söylenmesi gerekeni söylemekle ödenir.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -10,
          mesaj: "Otoriteler seni geçici olarak görevden uzaklaştırdı.",
          detay: "Cesaretin bir bedeli oldu.",
        },
      },
      {
        metin: "Bir süreliğine geri çekil.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Geri çekilmen fırtınayı atlatmanı sağladı.",
          detay: "Bazen stratejik bir sessizlik hayatta kalmayı sağlar.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Geri çekilmen bazı destekçilerini hayal kırıklığına uğrattı.",
          detay: "Her geri çekilme anlaşılmıyor.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_halka_acik_tartisma",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    gorsel: "🎙️",
    baslik: "Meydanda Bir Tartışma",
    metin: "Bir Gelenekçi, seni meydanda halkın önünde açık bir tartışmaya davet etti. Kazanırsan Yenilikçiler'in sesi güçlenir.",
    secenekler: [
      {
        metin: "Daveti kabul et, hazırlan ve meydana çık.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 5,
          mesaj: "Tartışmayı ustalıkla kazandın, halk seni alkışladı.",
          detay: "Fikirlerin artık daha çok kulakta yankılanıyor.",
        },
        basarisizSonuc: {
          un: -20,
          mesaj: "Rakibin seni köşeye sıkıştırdı, halk önünde utanç verici bir yenilgi aldın.",
          detay: "Her meydan okuma zaferle sonuçlanmaz.",
        },
      },
      {
        metin: "Nazikçe reddet, zamanının olmadığını söyle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Daveti reddettin, kimse bunu pek önemsemedi.",
          detay: "Her savaş meydanında verilmez.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin 'korkuyor' diye yorumlandı, bazı destekçilerin hayal kırıklığına uğradı.",
          detay: "Geri çekilmek bazen zayıflık sanılır.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_yeni_nesil_sorulari",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    gorsel: "❓",
    baslik: "Gençlerin Zor Soruları",
    metin: "Bir grup genç, inançla ilgili zor, sarsıcı sorular sorarak seni köşeye sıkıştırıyor. Cevapların onların geleceğini şekillendirebilir.",
    secenekler: [
      {
        metin: "Dürüst, açık ve cesur cevaplar ver.",
        baseBasariSansi: 65,
        basariliSonuc: {
          dost_puani: 10,
          ahlak: 10,
          mesaj: "Dürüstlüğün gençleri derinden etkiledi, sana daha da bağlandılar.",
          detay: "Gerçek cevaplar bazen en zor olanlarıdır.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Bazı cevapların tartışma yarattı, kimi ebeveynler şikayet etti.",
          detay: "Dürüstlük bazen huzursuzluk da getirir.",
        },
      },
      {
        metin: "Geleneksel, güvenli cevaplarla geç.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sorular sessizce geçiştirildi, kimse gücenmedi.",
          detay: "Bazen güvenli yol da bir yoldur.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "Gençler cevaplarını yetersiz buldu, 'o da mı onlardan biri' dediler hayal kırıklığıyla.",
          detay: "Kaçınmak bazen güveni kırar.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_itham_mektubu",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    gorsel: "✉️",
    baslik: "Sert Bir İtham Mektubu",
    metin: "Gelenekçiler, üst makamlara seni 'sapkınlıkla' itham eden resmi bir mektup gönderdi. Buna yanıt vermen gerekiyor.",
    secenekler: [
      {
        metin: "Sert, kararlı bir yanıt yaz, fikirlerini savun.",
        baseBasariSansi: 50,
        ipucu: "Riskli ama pes etmediğini gösterir",
        basariliSonuc: {
          un: 20,
          ahlak: 10,
          mesaj: "Yanıtın makamları ikna etti, ithamlar düştü.",
          detay: "Cesaretle savunulan bir fikir bazen en güçlüsüdür.",
        },
        basarisizSonuc: {
          un: -20,
          saglik: -5,
          mesaj: "Yanıtın yetersiz bulundu, bir süre gözetim altına alındın.",
          detay: "Her savunma başarıyla sonuçlanmaz.",
        },
      },
      {
        metin: "Yumuşak, uzlaşmacı bir yanıt yaz.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yanıtın gerginliği yatıştırdı, itham sessizce kapandı.",
          detay: "Bazen yumuşaklık en güçlü kalkandır.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Bazı Yenilikçiler yumuşak tavrını 'teslimiyet' olarak gördü.",
          detay: "Uzlaşma bazen kendi safında eleştiri getirir.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_reform_vaazi_kursusu",
    agirlik: 1.6,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    minRutbeSeviye: 2,
    gorsel: "🕊️",
    baslik: "Kürsü Senin",
    metin: "Büyük ayin gününde kürsüye çıkma sırası sende. Bu, Yenilikçiler'in fikirlerini kalabalık bir cemaate doğrudan anlatabileceğin ender bir fırsat.",
    secenekler: [
      {
        metin: "Cesurca, doğrudan reform fikirlerini anlat.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          dost_puani: 10,
          mesaj: "Vaazın cemaati derinden etkiledi, birçok kişi senin safına geçti.",
          detay: "Bugün söylediklerin uzun yıllar hatırlanacak.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -5,
          mesaj: "Cemaatin bir kısmı vaazı sert buldu, huzursuzlukla ayrıldılar.",
          detay: "Her cesur söz aynı sıcaklıkla karşılanmaz.",
        },
      },
      {
        metin: "Fikirlerini ölçülü, dolaylı biçimde anlat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 10,
          mesaj: "Vaazın kabul gördü, kimseyi ürkütmeden fikirlerini ekebildin.",
          detay: "Bazen tohum sessizce ekilir.",
        },
        basarisizSonuc: {
          mesaj: "Vaazın fazla belirsiz bulundu, mesaj tam oturmadı.",
          detay: "Her dolaylı anlatım anlaşılmaz.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_sahin_haberci",
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Eski Muhafızlar",
    ],
    agirlik: 1.4,
    gorsel: "🦅",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kralın Gizli Mesajı",
    metin: "Eski Muhafızlar'ın başındaki general, kuşatma altındaki müttefik kaleye gizlice bir mesaj ulaştırılmasını istiyor. Yollar düşman devriyeleriyle dolu; mesajı taşıyacak güvenilir birine ihtiyaç var.",
    secenekler: [
      {
        metin: "Mesajı {hayvan}'ın bacağına bağlayıp gönder.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "evcil_hayvan_tur:Şahin",
        ],
        kilitAciklamasi: "Bunun için eğitimli bir şahine ihtiyacın var.",
        ipucu: "Gizli Şık: Şahinler devriyelerin gözünden kaçar",
        basariliSonuc: {
          un: 20,
          dost_puani: 8,
          mesaj: "{hayvan} düşman hatlarının üzerinden süzülüp mesajı zamanında ulaştırdı. General senin adını övgüyle andı.",
          detay: "Kanatlı bir dost, en iyi casustan daha güvenilir çıktı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Kendin git, geceyi kullanarak sızmaya çalış.",
        baseBasariSansi: 45,
        ipucu: "Onurlu ama son derece tehlikeli",
        basariliSonuc: {
          un: 15,
          mesaj: "Devriyelerden ustalıkla kaçıp mesajı bizzat ulaştırdın; askerler arasında adın efsaneye dönüştü.",
          detay: "Bazı kahramanlıklar bizzat yapılmayı hak eder.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 8,
          mesaj: "Bir devriyeye yakalandın, güçlükle kaçtın; mesaj asla ulaşmadı.",
          detay: "Cesaretin bu kez yeterli olmadı.",
        },
      },
      {
        metin: "Görevi reddet, çok riskli bul.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama hizip içinde itibar kaybı",
        basariliSonuc: {
          un: -8,
          mesaj: "Görevi geri çevirdin; general suratını asıp başka birini görevlendirdi.",
          detay: "Bazı fırsatları kaçırmak da bir bedel taşır.",
        },
        basarisizSonuc: {
          un: -8,
          dost_puani: -5,
          mesaj: "Reddin hizip içinde 'korkak' diye anılmana neden oldu.",
          detay: "Her hayır bir iz bırakıyor.",
        },
      },
    ],
  },
  {
    id: "hizip_yeni_nizam_kilic_gosterisi",
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "hizip:Yeni Nizam",
    ],
    agirlik: 1.4,
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yeni Düzenin Gösterisi",
    metin: "Yeni Nizam, halka gücünü kanıtlamak için meydanda gösterişli bir düello düzenliyor: reform yanlısı genç bir subay, eski düzenin en iyi kılıç ustasına meydan okuyacak. Bu subay sensin.",
    secenekler: [
      {
        metin: "Kara Kılıç'ını kuşan, düelloyu ustaca kazan.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        kilitAciklamasi: "Bunun için efsanevi bir silaha ihtiyacın var.",
        ipucu: "Gizli Envanter: Kara Kılıç rakibine şans tanımaz",
        basariliSonuc: {
          un: 25,
          ahlak: -5,
          mesaj: "Kara Kılıç elinde âdeta kendi kendine dans etti; rakibin daha ilk vuruşta silahını düşürdü. Meydan çığlık çığlığa alkışladı.",
          detay: "Yeni Nizam'ın en parlak yıldızı oldun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Kendi kılıcınla, sıradan bir asker gibi savaş.",
        baseBasariSansi: 50,
        ipucu: "Adil bir düello, sonucu belirsiz",
        basariliSonuc: {
          un: 18,
          saglik: -5,
          mesaj: "Zorlu bir düello sonunda rakibini yendin; halk seni yeni düzenin sembolü ilan etti.",
          detay: "Kazanç alın teriyle geldi.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -15,
          mesaj: "Deneyimli usta seni yendi; Yeni Nizam meydanda küçük düştü.",
          detay: "Her gösteri zaferle bitmiyor.",
        },
      },
      {
        metin: "Sakatlanma bahanesiyle düellodan çekil.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama itibarın örselenir",
        basariliSonuc: {
          un: -10,
          mesaj: "Çekildin; hizip içindekiler senin için hayal kırıklığını gizleyemedi.",
          detay: "Bazı kaçışlar iz bırakır.",
        },
        basarisizSonuc: {
          un: -18,
          mesaj: "Bahanenin yalan olduğu anlaşıldı, alenen küçük düştün.",
          detay: "Yalanlar genelde ortaya çıkıyor.",
        },
      },
    ],
  },
  {
    id: "hizip_liman_loncasi_kedi_ambar",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Liman Loncası",
    ],
    agirlik: 1.4,
    gorsel: "🐀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ambarı Kemiren Tehlike",
    metin: "Liman Loncası'nın büyük tahıl ambarını fareler istila etti; birkaç hafta içinde bütün stok çürüyebilir. Lonca ustaları hızlı ve ucuz bir çözüm bekliyor.",
    secenekler: [
      {
        metin: "{hayvan}'ı ambara sal, işini doğaya bırak.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "evcil_hayvan_tur:Kedi",
        ],
        kilitAciklamasi: "Bunun için usta bir fare avcısına ihtiyacın var.",
        ipucu: "Gizli Şık: Gemi kedileri yüzyıllardır bunun ustası",
        basariliSonuc: {
          ahlak: -3,
          mutluluk: -3,
          para: 20,
          un: 12,
          dost_puani: 10,
          mesaj: "{hayvan} bir haftada ambarı fareden temizledi; lonca ustaları senin 'ucuz dehanı' konuşup duruyor.",
          detay: "Kedin bütün loncanın gözdesi oldu.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Pahalı fare avcıları ve tuzaklar kirala.",
        baseBasariSansi: 80,
        maliyet: 22,
        ipucu: "Güvenilir ama masraflı",
        basariliSonuc: {
          para: -22,
          un: 8,
          mesaj: "Kiralık avcılar birkaç günde işi halletti; stok kurtuldu ama kasan hissedilir derecede küçüldü.",
          detay: "Bazı çözümler paha karşılığı geliyor.",
        },
        basarisizSonuc: {
          para: -22,
          mesaj: "Avcılar geldi ama fareler daha hızlıydı; hem masraf hem de stok kaybı yaşandı.",
          detay: "Her yatırım işe yaramıyor.",
        },
      },
      {
        metin: "Görmezden gel, stoğun bir kısmını yazık say.",
        baseBasariSansi: 90,
        ipucu: "Masrafsız ama kayıp kesin",
        basariliSonuc: {
          para: -15,
          mesaj: "Fareler doyana kadar yediler; kayıp cebinden gitti ama en azından uğraşmadın.",
          detay: "Bazen hiçbir şey yapmamak da bir bedel öder.",
        },
        basarisizSonuc: {
          para: -30,
          un: -8,
          mesaj: "Kayıp beklenenden çok daha büyük oldu; lonca seni 'ilgisiz' diye eleştirdi.",
          detay: "Görmezden gelmek nadiren ucuza gelir.",
        },
      },
    ],
  },
  {
    id: "hizip_pazar_birligi_sikke_bahsi",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "hizip:Pazar Birliği",
    ],
    agirlik: 1.4,
    gorsel: "🎲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Esnafın Onuru İçin Bahis",
    metin: "Pazar Birliği, rakip loncanın kibirli temsilcisiyle esnafın onuru için büyük bir bahse girişti: kim daha çok kâr ederse mahalledeki eski çeşmenin onarımını o üstlenecek. Birliğin gözü sende.",
    secenekler: [
      {
        metin: "Gölge Sikke'yi gizlice kullan, kaderi kendi lehine çevir.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:golge_sikke",
        ],
        kilitAciklamasi: "Bunun için gizemli bir sikkeye ihtiyacın var.",
        ipucu: "Gizli Envanter: Ahlaki bedeli var ama sonucu garanti eder",
        basariliSonuc: {
          para: 20,
          un: 15,
          ahlak: -12,
          mesaj: "Sikke sanki sana göz kırptı; şansın inanılmaz döndü ve rakip loncayı ezici farkla geride bıraktın.",
          detay: "Zafer tatlı ama nasıl kazandığını sadece sen biliyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Dürüstçe, olağan ticaret becerinle yarış.",
        baseBasariSansi: 50,
        ipucu: "Adil ama sonucu belirsiz",
        basariliSonuc: {
          mutluluk: -7,
          para: 18,
          un: 6,
          mesaj: "Sıkı bir rekabetin sonunda birliği onurlandırdın; çeşme rakip loncaya kaldı ama gurur sende.",
          detay: "Dürüst bir zafer her zaman daha tatlıdır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -10,
          mesaj: "Rakip lonca seni geride bıraktı; birlik içinde biraz itibar kaybettin.",
          detay: "Her yarış kazanılmıyor.",
        },
      },
      {
        metin: "Bahisten çekil, onuru fazla önemseme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama birlik seni hafife alır",
        basariliSonuc: {
          un: -8,
          mesaj: "Çekildin; birlik üyeleri arkandan fısıldadı ama en azından riske girmedin.",
          detay: "Bazı savaşlara girmemek de bir seçimdir.",
        },
        basarisizSonuc: {
          un: -12,
          dost_puani: -5,
          mesaj: "Çekilmen 'korkaklık' diye yorumlandı, birlik içinde saygın konumun sarsıldı.",
          detay: "Her geri adım aynı şekilde okunmuyor.",
        },
      },
    ],
  },
  {
    id: "hizip_gelenekciler_kalinti_vaazi",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Gelenekçiler",
    ],
    agirlik: 1.4,
    gorsel: "☦️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Şüphecilere Karşı Vaaz",
    metin: "Gelenekçiler, cemaat içinde büyüyen şüpheciliği bastırmak için büyük bir vaaz düzenlemeni istiyor. Meydan tıklım tıklım dolacak; inancını en güçlü şekilde kanıtlaman gerekiyor.",
    secenekler: [
      {
        metin: "Kutsal Kalıntı'yı cemaate göster.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "esya:kutsal_kalinti",
        ],
        kilitAciklamasi: "Bunun için kutsal bir kalıntıya ihtiyacın var.",
        ipucu: "Gizli Envanter: Gözle görülür bir mucize şüpheleri anında susturur",
        basariliSonuc: {
          ahlak: 15,
          un: 22,
          mesaj: "Kalıntıyı yükseğe kaldırdığın an meydanda bir sessizlik çöktü; şüpheciler bile diz çöktü.",
          detay: "Bazı kanıtlar bin vaazdan daha güçlüdür.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Sadece güçlü bir hitabetle, sözlerine güven.",
        baseBasariSansi: 55,
        ipucu: "Zorlu ama kelimelerin gücüne inanıyorsun",
        basariliSonuc: {
          ahlak: 10,
          un: 15,
          mesaj: "Sözlerin cemaatin yüreğine dokundu; şüpheciler bile alkışladı.",
          detay: "Bazen en güçlü kanıt inancın kendisidir.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Vaazın beklenen etkiyi yaratmadı; şüpheciler daha da cesaretlendi.",
          detay: "Her hitabet meydanı fethetmiyor.",
        },
      },
      {
        metin: "Vaazı erteleyip hazırlıksız çıkmaktan kaçın.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama Gelenekçiler hayal kırıklığına uğrar",
        basariliSonuc: {
          un: -6,
          mesaj: "Vaaz ertelendi; cemaat anlayışla karşıladı ama şüpheciler bir hafta daha rahat konuştu.",
          detay: "Bazı ertelemeler ucuza gelmiyor.",
        },
        basarisizSonuc: {
          un: -14,
          mesaj: "Erteleme 'kararsızlık' diye yorumlandı, Gelenekçiler içindeki itibarın sarsıldı.",
          detay: "Liderlik bazen an be an test edilir.",
        },
      },
    ],
  },
  {
    id: "hizip_yenilikciler_papagan_mucizesi",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "hizip:Yenilikçiler",
    ],
    agirlik: 1.3,
    gorsel: "🕊️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yeni Cemaat İçin Bir 'İşaret'",
    metin: "Yenilikçiler, dogma yerine coşkuyla yeni takipçi çekmek istiyor. Biri, kalabalığın önünde 'göksel bir ses'in duyulmasının inancı nasıl alevlendireceğini fısıldadı sana.",
    secenekler: [
      {
        metin: "{hayvan}'ı gizlice kürsünün arkasına yerleştirip kutsal sözler taklit ettir.",
        baseBasariSansi: 85,
        gerekliEtiketler: [
          "evcil_hayvan_tur:Papağan",
        ],
        kilitAciklamasi: "Bunun için eğitimli, taklitçi bir kuşa ihtiyacın var.",
        ipucu: "Gizli Şık: Etkileyici ama sahte bir 'mucize'",
        basariliSonuc: {
          un: 20,
          ahlak: -18,
          mesaj: "Kürsünün arkasından yükselen 'göksel ses' kalabalığı ağlattı; yeni takipçiler akın etti.",
          detay: "İnananlar sevindi, sen ise gerçeği tek başına taşıyorsun.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -18,
          mesaj: "{hayvan} yanlış zamanda bambaşka bir şey söyleyiverdi! Kalabalık önce şaşırdı, sonra kahkahalarla dağıldı.",
          detay: "Sahte mucizeler bazen kendi kendini ele veriyor.",
        },
      },
      {
        metin: "Sadece içten, dürüst bir vaazla coşku yarat.",
        baseBasariSansi: 55,
        ipucu: "Yavaş ama dürüst bir büyüme",
        basariliSonuc: {
          ahlak: 10,
          un: 12,
          mesaj: "İçten sözlerin birkaç yeni takipçi kazandırdı; büyüme yavaş ama sağlam.",
          detay: "Dürüst bir tohum, yavaş da olsa kök salıyor.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Vaazın ilgi görmedi, kalabalık dağıldı.",
          detay: "Her gün ilham gelmiyor.",
        },
      },
      {
        metin: "Fikri reddet, gösteriye hiç girme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama Yenilikçiler'i hayal kırıklığına uğratır",
        basariliSonuc: {
          ahlak: 6,
          un: -6,
          mesaj: "Fikri reddettin; bazı Yenilikçiler seni 'fazla tutucu' bulsa da vicdanın rahat.",
          detay: "Bazı sınırları çizmek gerekir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin 'cesaretsizlik' diye yorumlandı, hizip içindeki genç kanat senden uzaklaştı.",
          detay: "Her ilke bir bedel taşıyabilir.",
        },
      },
    ],
  },
];
