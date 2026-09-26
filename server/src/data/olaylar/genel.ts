import type { OlayTanimi } from "./types";

export const OLAY_GENEL: OlayTanimi[] = [
  {
    id: "kg_agir_idman",
    kategori: "saglik",
    agirlik: 0.6,
    gorsel: "🏃",
    baslik: "Sınırları Zorlamak",
    metin: "Son zamanlarda zayıf düştüğünü hissediyorsun. Vücudunu eski direncine kavuşturmak için sınırlarını sonuna kadar zorlayacağın ağır bir idman ritüeline başlayabilirsin. Ancak yaşın ve bedenin bunu kaldırabilir mi?",
    secenekler: [
      {
        metin: "Acıya dayan, sınırlarını aş.",
        baseBasariSansi: 60,
        basariliSonuc: {
          saglik: 15,
          mutluluk: 3,
          etiket_ekle: [
            "fiziksel:guc_sembolu",
          ],
          mesaj: "Kasların çeliğe dönüştü. Vücudun artık en ağır darbelere bile dayanacak kadar sağlam.",
        },
        basarisizSonuc: {
          saglik: -10,
          etiket_ekle: [
            "kalici:kronik_agri",
          ],
          durum_ekle: {
            id: "kronik_agri",
            ad: "Kronik Eklem Ağrısı",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Bedenin bu yükü kaldıramadı. Dizindeki lifler koptu; artık yağmurlu havalarda bile sızlayan kalıcı bir ağrın var.",
        },
      },
      {
        metin: "Riske girme, hafif yürüyüşlerle yetin.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Güvenli olanı seçtin. Terlemedin ama sakatlanmadın da.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Hafif yürüyüş bile seni nefes nefese bıraktı.",
        },
      },
    ],
  },
  {
    id: "kg_yasakli_kitap",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "📖",
    baslik: "Mühürlü Kitap",
    metin: "Pazarda tuhaf giyimli bir yabancı sana deri kaplı, mühürlü bir kitap sattı. Kitabın içindeki yazıların yerel otoriteler (veya kilise) tarafından yasaklandığı çok açık. İçinde tehlikeli sırlar olabilir.",
    secenekler: [
      {
        metin: "Mührü kır ve karanlık ilmi oku.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: 5,
          ahlak: -15,
          etiket_ekle: [
            "bilgi:yasak_ilim",
          ],
          mesaj: "Kitabın anlattıkları dünyaya bakışını değiştirdi. Artık sıradan insanların bilmediği şeyleri biliyorsun.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -20,
          mesaj: "Sayfaları çevirirken bir komşun seni pencereden gördü ve şikayet etti. İtibarın yerle bir oldu.",
        },
      },
      {
        metin: "Kitabı okumadan yetkililere (veya kiliseye) teslim et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          un: 10,
          mesaj: "Kitabı teslim ettin. Otoriteler sadakatini ve inancını takdir etti.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kitabı verdin ama içinde ne yazdığı hayatın boyunca içinde bir merak olarak kaldı.",
        },
      },
    ],
  },
  {
    id: "kg_meyhane_sirri",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "🍻",
    baslik: "Gece Yarısı Fısıltıları",
    metin: "{dost} seni şehrin en izbe meyhanesine götürdü. İlerleyen saatlerde herkes sarhoş olmaya başlarken, yan masadaki şüpheli adamların çok değerli ticari/siyasi sırlar konuştuğunu fark ettin.",
    secenekler: [
      {
        metin: "Onlara içki ısmarla ve ağızlarını ara.",
        baseBasariSansi: 55,
        maliyet: 15,
        basariliSonuc: {
          saglik: 2,
          para: -10,
          etiket_ekle: [
            "istihbarat_var",
          ],
          mesaj: "Adamlar içkinin etkisiyle döküldü. Şehrin geleceğiyle ilgili harika bir istihbarat aldın; artık hamlelerini körü körüne yapmayacaksın.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -10,
          mesaj: "Adamlar niyetini anladı. Seni meyhanenin arkasına çekip iyice hırpaladılar.",
        },
      },
      {
        metin: "Masana odaklan, sadece {dost} ile iç.",
        baseBasariSansi: 70,
        basariliSonuc: {
          dost_puani: 10,
          mutluluk: 3,
          etiket_ekle: [
            "bagimlilik:alkol_meyil",
          ],
          mesaj: "Sadece içtiniz ve eğlendiniz. Ancak kadehin dibini sıyırırken bu hayata biraz fazla alıştığını fark ediyorsun.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Aklın yan masada kaldığı için {dost} ile sohbetin çok yavan geçti.",
        },
      },
    ],
  },
  {
    id: "ekonomi_guvenli_yatirim",
    kategori: "ticaret",
    yasakliEtiketler: [
      "yatirim:guvenlide",
    ],
    minYas: 17,
    gorsel: "🏦",
    baslik: "Kardeşin Dükkânı",
    metin: "Ailenden biri (kardeşin veya yakın kuzenin) sana gelip kuracağı yeni demirci/dokumacı dükkânı için sermayene ortak olmayı teklif ediyor. Büyük kazandırmaz ama paranın yabancıya gitmeyeceğini söylüyor.",
    secenekler: [
      {
        metin: "Aileye destek ol, sermayeyi ver.",
        baseBasariSansi: 90,
        maliyet: 40,
        basariliSonuc: {
          para: -34,
          etiket_ekle: [
            "yatirim:guvenlide",
            "aile_is_ortagi",
          ],
          durum_ekle: {
            id: "yatirim_guvenli_getiri",
            ad: "Aile Dükkânı Getirisi",
            tur: "kalici",
            tur_basi_para: 4,
          },
          mesaj: "Sermayeyi verdin. Dükkân tıkır tıkır işliyor, ailenden her yıl düzenli ve helal bir pay alıyorsun.",
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -5,
          mesaj: "Dükkân beklediğiniz gibi iş yapmadı. Aile yemeklerinde bu konu açılınca herkesin yüzü asılıyor.",
        },
      },
      {
        metin: "Ticaretle kan bağını karıştırma, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Paranı cebinde tuttun. Kardeşin biraz bozuldu ama en azından risk almadın.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kardeşin başkasından borç bulup dükkânı açtı ve çok başarılı oldu. Şimdi içten içe pişmansın.",
        },
      },
    ],
  },
  {
    id: "ekonomi_tefecilik_teklifi",
    kategori: "ticaret",
    yasakliEtiketler: [
      "yatirim:tefecide",
    ],
    minYas: 18,
    gorsel: "🪙",
    baslik: "Çaresiz Dost",
    metin: "Çok eski ve çaresiz bir dostun dükkânını kaybetmemek için senden borç istiyor. Ancak sana çok yüksek bir faizle ödemeyi teklif ediyor. Bu teklif hem kârlı hem de ahlaken tartışmalı.",
    secenekler: [
      {
        metin: "Ahlakı boş ver, yüksek faizle borcu ver.",
        baseBasariSansi: 90,
        maliyet: 35,
        basariliSonuc: {
          para: -35,
          ahlak: -15,
          etiket_ekle: [
            "yatirim:tefecide",
            "itibar:tefeci",
          ],
          durum_ekle: {
            id: "tefecilik_beklemede",
            ad: "Borç Tahsilatı Bekleniyor",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "yatirim:tefeci_zamani",
          },
          mesaj: "Dostuna faizle borç verdin. Parayı alırken yüzündeki o minnet ve nefret karışımı ifadeyi unutamıyorsun.",
        },
        basarisizSonuc: {
          para: -35,
          ahlak: -15,
          etiket_ekle: [
            "yatirim:tefecide",
            "itibar:tefeci",
          ],
          durum_ekle: {
            id: "tefecilik_beklemede",
            ad: "Borç Tahsilatı Bekleniyor",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "yatirim:tefeci_zamani",
          },
          mesaj: "Sözleşmeyi imzalattın ama dostluğun tamamen bittiği çok açık.",
        },
      },
      {
        metin: "Tefecilik yapmam, param bende kalsın.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Dostuna faizle borç vermeyi reddettin. Dükkânı battı ama senin vicdanın ve paran yerinde.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "Dostun dükkânı kaybetti ve seni 'kötü gün dostu olmamakla' suçladı.",
        },
      },
    ],
  },
  {
    id: "ekonomi_tefecilik_sonucu",
    kategori: "ticaret",
    gerekliEtiketler: [
      "yatirim:tefeci_zamani",
    ],
    gorsel: "⚖️",
    baslik: "Vade Doldu",
    metin: "Eski dostuna verdiğin borcun vadesi doldu. Gidip kapısına dayandın ancak ağlayarak işlerin kötü gittiğini ve parası olmadığını söylüyor. İki seçeneğin var.",
    secenekler: [
      {
        metin: "Adam tut, dükkânına el koy ve onu sokağa at.",
        baseBasariSansi: 95,
        basariliSonuc: {
          para: 60,
          ahlak: -30,
          etiket_sil: [
            "yatirim:tefecide",
            "yatirim:tefeci_zamani",
          ],
          etiket_ekle: [
            "itibar:acimasiz_tefeci",
          ],
          mesaj: "Adamlarını gönderdin. Dostunun ailesi sokakta ağlarken dükkânın anahtarlarını aldın. Sen kazandın.",
        },
        basarisizSonuc: {
          para: 40,
          ahlak: -20,
          un: -15,
          etiket_sil: [
            "yatirim:tefecide",
            "yatirim:tefeci_zamani",
          ],
          mesaj: "Dükkânı zorla aldın ama mahalleli seni yuhaladı. Artık arkandan 'kan emici' diyorlar.",
        },
      },
      {
        metin: "Eski günlerin hatırına borcu sil, onu affet.",
        baseBasariSansi: 88,
        basariliSonuc: {
          ahlak: 35,
          un: 15,
          etiket_sil: [
            "yatirim:tefecide",
            "yatirim:tefeci_zamani",
          ],
          etiket_ekle: [
            "itibar:merhametli",
          ],
          mesaj: "Senetleri gözünün önünde yırttın. Dostun ayaklarına kapandı. Paranı kaybettin ama ruhunu geri kazandın.",
        },
        basarisizSonuc: {
          ahlak: 25,
          etiket_sil: [
            "yatirim:tefecide",
            "yatirim:tefeci_zamani",
          ],
          mesaj: "Borcu sildin. İçin rahat ama akşam eve dönerken o paraya ne kadar ihtiyacın olduğunu hatırladın.",
        },
      },
    ],
  },
  {
    id: "ekonomi_kriz_donemi",
    kategori: "ticaret",
    gerekliUlke: {
      ekonomi: "kotu",
    },
    gorsel: "📉",
    baslik: "Krizin Acı Yüzü",
    metin: "Ekonomik kriz evine ulaştı: kilerde erzak kalmadı, dükkânın da iflasın eşiğinde. Son sermayeni ya karaborsadan yiyeceğe ya da işini kurtarmaya harcayabilirsin.",
    secenekler: [
      {
        metin: "İşi boşver, son paramla aileme erzak al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: -30,
          saglik: 5,
          ahlak: 15,
          un: -15,
          mesaj: "Tezgâhı kapattın. İflas ettin, itibarın sıfırlandı ama akşam sofrada çocukların/ailen sıcak çorba içiyor.",
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -10,
          mesaj: "Sermayeyi erzağa verdin ama karaborsacı seni dolandırdı. Hem iflas ettin hem de yarı aç kaldınız.",
        },
      },
      {
        metin: "Ailem dişini sıksın, parayı işime kurtarmaya harca.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 50,
          saglik: -25,
          ahlak: -20,
          un: 15,
          mesaj: "Herkes batarken sen ayakta kaldın ve zenginleştin! Ancak eve döndüğünde ailenin yetersiz beslenmeden eridiğini gördün.",
        },
        basarisizSonuc: {
          para: -40,
          saglik: -30,
          mutluluk: -25,
          mesaj: "Risk aldın ve kaybettin. Kriz seni de vurdu. Hem son paran gitti hem de ailen açlıktan hastanelik oldu.",
        },
      },
    ],
  },
  {
    id: "ekonomi_vergi_tahsildari",
    kategori: "siyaset",
    minYas: 16,
    gorsel: "📜",
    baslik: "Sinsi Tahsildar",
    metin: "Asık suratlı vergi tahsildarı kapına dayandı ve defterindeki yüklü rakamı okuyor. Ancak göz ucuyla etrafa bakıp, 'Belki de deftere yanlış yazmışımdır, küçük bir hata düzeltilebilir' diye mırıldanıyor.",
    secenekler: [
      {
        metin: "Seni anladım de ve masanın altından ona rüşvet ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı",
        },
        onTepki: {
          metin: "Tahsildar uzattığın keseyi alırken gülümsüyor. 'Çok akıllısın... Ama bu miktar sadece bu ay için defteri temizler. Anlıyorsun değil mi?' Açgözlü adam seni haraca bağlamaya çalışıyor!",
          geriCekilMetni: "Sinirlen ve onu dükkândan kov! (Rüşvetten dön)",
          geriCekilSonucu: {
            para: -25,
            un: 5,
            ahlak: 10,
            mesaj: "Adama bağırıp onu kovdun! Sonra gidip vergini dürüstçe devlet kasasına ödedin. Paran gitti ama onurun kurtuldu.",
          },
          devamMetni: "Sessizce kabul et, rüşvet çarkına gir.",
          devamSonucu: {
            para: 15,
            ahlak: -20,
            etiket_ekle: [
              "sir:rusvet_verdi",
            ],
            mesaj: "Tahsildarın adamı oldun. Vergiden yırttın ama artık bu sırrın esirisin.",
          },
        },
      },
      {
        metin: "Devletin vergisini tam ve eksiksiz öde.",
        baseBasariSansi: 95,
        maliyet: 30,
        basariliSonuc: {
          para: -30,
          ahlak: 15,
          etiket_ekle: [
            "itibar:durust_mukellef",
          ],
          mesaj: "Tahsildar somurtarak tam vergiyi aldı. Cebin delindi ama kimseye boyun eğmedin.",
        },
        basarisizSonuc: {
          para: -30,
          mesaj: "Vergini ödedin ama tahsildar seni mimledi. Helal kazancın bile şüpheli gösterilecek.",
        },
      },
    ],
  },
  {
    id: "ekonomi_rusvet_teklifi",
    kategori: "siyaset",
    minYas: 18,
    minUn: 20,
    gorsel: "💰",
    baslik: "Şeytanın Kesesi",
    metin: "Şehrin en zengin ama en karanlık adamlarından biri, yasal olmayan bir malı depolarında saklaman karşılığında sana ağzı tıka basa altın dolu bir kese uzatıyor.",
    secenekler: [
      {
        metin: "Altınları al ve malı sakla.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 45,
          ahlak: -25,
          etiket_ekle: [
            "sir:karanlik_ortak",
          ],
          mesaj: "Keseyi cübbene sakladın. Zenginleştin ama artık geceleri kapı her çalındığında kalbin gümleyecek.",
        },
        basarisizSonuc: {
          para: -20,
          ahlak: -25,
          un: -30,
          mesaj: "Malları saklarken çıraklarından biri seni gördü! İhbar edildin, para cezası yedin ve itibarın lekelendi.",
        },
      },
      {
        metin: "Hiddetle reddet ve adamı kov.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          etiket_ekle: [
            "itibar:satinalinamaz",
          ],
          mesaj: "Adamı dükkânından kovdun! Halk senin bu cesaretini konuşuyor, sen 'Satılamaz Adam'sın.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          rakip_puani: 20,
          mesaj: "Adam keseyi geri alırken gözlerini kıstı. O günden itibaren senin en büyük ve karanlık düşmanın oldu.",
        },
      },
    ],
  },
  {
    id: "rutbe_kumandan_karari",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    minRutbeSeviye: 3,
    gorsel: "⚔️",
    baslik: "Komutanın İkilemi",
    metin: "Düşman hatları önündesin. Eğer saldırı emri verirsen zafer kazanma ihtimalin yüksek ama emrindeki gencecik askerlerin çoğu ölecek. Beklersen askerlerin yaşar ama savaş kaybedilebilir.",
    secenekler: [
      {
        metin: "Ölüme yürüyoruz! Saldırı emri ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 35,
          para: 20,
          ahlak: -25,
          unvan_kazan: "Kanlı Kumandan",
          mesaj: "Düşmanı ezip geçtiniz! Savaşın kahramanı oldun ama savaş alanındaki o genç cesetler rüyalarına girmeye başladı.",
        },
        basarisizSonuc: {
          saglik: -25,
          un: -20,
          ahlak: -20,
          olum_sansi: 15,
          mesaj: "Saldırı büyük bir kıyıma dönüştü. Hem askerlerini kaybettin hem de mağlup oldun.",
        },
      },
      {
        metin: "Geri çekilin! Askerlerimi feda edemem.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 25,
          un: -15,
          unvan_kazan: "Merhametli Komutan",
          mesaj: "Düşman ilerledi, savaşı kaybettiniz gibi görünüyor. Ama askerlerin sana minnettar, onların hayatını kurtardın.",
        },
        basarisizSonuc: {
          un: -25,
          mesaj: "Kral seni korkak ilan etti. Rütbelerin sökülme tehlikesiyle karşı karşıya.",
        },
      },
    ],
  },
  {
    id: "rutbe_lonca_ustasi_karari",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    minRutbeSeviye: 3,
    gorsel: "🏛️",
    baslik: "Lonca Ustasının Gücü",
    metin: "Artık şehrin ticaret hakimi sensin. Piyasaya giren tüm mallara tekel koyup küçük esnafı ezebilir ya da malları onlarla paylaşıp halkın adamı olabilirsin.",
    secenekler: [
      {
        metin: "Tekel kur, tüm malları kendi depolarına çek.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 60,
          ahlak: -30,
          unvan_kazan: "Açgözlü Baron",
          mesaj: "Piyasadaki her şeyi sömürdün. Küçük esnaf iflas ederken sen altından kuleler inşa ediyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          mutluluk: -15,
          mesaj: "Küçük esnaf isyan edip depolarını yaktı! Açgözlülük büyük bir yangınla son buldu.",
        },
      },
      {
        metin: "Malları adil dağıt, küçük esnafı koru.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 30,
          un: 20,
          para: -10,
          unvan_kazan: "Halkın Tüccarı",
          mesaj: "Şehirdeki tüm esnaf sana dua ediyor. Zenginleşmedin ama şehrin en sevilen ve sayılan adamı oldun.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Adil olmaya çalıştın ama diğer büyük tüccarlar seni aralarından dışladı.",
        },
      },
    ],
  },
  {
    id: "rutbe_basrahip_hukmu",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    minRutbeSeviye: 3,
    gorsel: "📿",
    baslik: "İlahî Adalet",
    metin: "Şehrin en zengin soylusu tapınağında büyük bir cinayet işledi. Onu aforoz edip idama gönderebilirsin ya da yüklü bir 'kilise bağışı' karşılığı günahını affedebilirsin.",
    secenekler: [
      {
        metin: "Tanrı'nın adaleti satılmaz! Onu aforoz et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 40,
          un: 25,
          etiket_ekle: [
            "itibar:adalet_kilici",
          ],
          mesaj: "Soylu şok içinde zincirlere vuruldu. Halk cesaretini ayakta alkışlıyor!",
        },
        basarisizSonuc: {
          dost_puani: -20,
          olum_sansi: 20,
          mesaj: "Soylu ailesi bunu kabullenmedi. Bir gece tapınağına silahlı adamlar gönderdiler. Hayatın tehlikede!",
        },
      },
      {
        metin: "Sessizce bağışı kabul et ve günahını temizle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 50,
          ahlak: -35,
          un: -20,
          etiket_ekle: [
            "sir:gunah_satici",
          ],
          mesaj: "Altın sandıkları mahzenine taşındı. Soylu serbest. Halk sana nefretle bakıyor ve sen de aynada kendine bakamıyorsun.",
        },
        basarisizSonuc: {
          un: -30,
          ahlak: -20,
          mesaj: "Rüşvet aldığın ortaya çıktı. Diğer rahipler ayaklandı, unvanın sarsıldı.",
        },
      },
    ],
  },
  {
    id: "asker_birlik_kaynak",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    yasakliEtiketler: [
      "birlik:egitimli",
    ],
    gorsel: "🎯",
    baslik: "Birliğin Kumanyası",
    metin: "Sana birliğinin kışlık erzağı ve kılıçları için altın tahsis edildi. Ya bu parayı gerçekten askerlere harcarsın ya da sahte kayıtlarla parayı cebe indirirsin.",
    secenekler: [
      {
        metin: "Tüm parayı askerlerin eğitimine ve midesine harca.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: -10,
          etiket_ekle: [
            "birlik:egitimli",
            "itibar:asker_babasi",
          ],
          durum_ekle: {
            id: "birlik_egitimli",
            ad: "İyi Eğitilmiş Birlik",
            tur: "kalici",
            tur_basi_saglik: 1,
          },
          ordu_techizat_artis: 20,
          mesaj: "Askerlerin tok, kılıçları keskin. Savaşta arkanda bir duvar gibi duracaklar.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Tüccarlar seni kazıkladı, erzak eksik geldi ama niyetin iyiydi.",
        },
      },
      {
        metin: "Kaydı değiştir ve altını kendine sakla.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 35,
          ahlak: -25,
          etiket_ekle: [
            "sir:ordu_hirsizi",
          ],
          mesaj: "Altınları yatağının altına zulaladın. Askerlerin paslı kılıçlarla talim yapıyor, umrunda değil.",
        },
        basarisizSonuc: {
          para: -10,
          un: -30,
          ahlak: -20,
          mesaj: "Müfettiş sahte kayıtları buldu! Divanı harbe verildin ve itibarın yerle bir oldu.",
        },
      },
    ],
  },
  {
    id: "komik_kecinin_intikami",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.7,
    gorsel: "🐐",
    baslik: "Şeytani Keçi",
    metin: "Komşunun gözleri garip bakan o psikopat keçisi ipini kopardı ve direkt senin bahçene, çamaşırlarının arasına daldı. Bütün mahalle camlara çıkmış seni izliyor.",
    secenekler: [
      {
        metin: "Savaş narası atıp keçinin üstüne atla!",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 8,
          un: 10,
          unvan_kazan: "Keçi Fatihi",
          etiket_ekle: [
            "unvan:Keçi Fatihi",
          ],
          mesaj: "Havada süzülüp keçiyi boynuzlarından yere mıhladın! Mahalleli seni çılgınca alkışlıyor.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          un: -10,
          saglik: -5,
          mesaj: "Keçi mükemmel bir çalımla seni çamur birikintisine uçurdu. Üstüne bir de pantolonunu yedi.",
        },
      },
      {
        metin: "Hiç bulaşma, içeri kaçıp kapıyı kilitle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Keçi biraz çamaşırlarını çiğnedi sonra sıkılıp gitti. Gururun incindi ama sağlamsın.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Keçi bahçeyi mahvetti, üstüne camı boynuzlayarak kırdı.",
        },
      },
    ],
  },
  {
    id: "ruh_uykusuzluk_hayaletleri",
    kategori: "saglik",
    ton: "agir",
    maxMutluluk: 20,
    minYas: 16,
    gorsel: "👻",
    baslik: "Uyumayan Geceler",
    metin: "Günlerdir uyuyamıyorsun. Göz kapakların ağırlaştınca duvarda olmayan şekiller, ölmüş eski dostların (veya düşmanların) yüzleri beliriyor.",
    secenekler: [
      {
        metin: "Rahiplere/Hocalara gidip dua ve muska iste.",
        baseBasariSansi: 60,
        maliyet: 10,
        basariliSonuc: {
          mutluluk: 6,
          saglik: 8,
          para: -10,
          mesaj: "Dualar ve tütsüler işe yaradı. Nihayet deliksiz bir uyku çektin.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -5,
          mesaj: "Muskalar işe yaramadı, hayaletler duvarlardan sana gülmeye devam etti.",
        },
      },
      {
        metin: "Aklımı kaçırıyorum! Kendi kendime idare etmeliyim.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Zamanla yorgunluktan bayıldın ve beynin kendini sıfırladı.",
        },
        basarisizSonuc: {
          saglik: -15,
          mutluluk: -8,
          mesaj: "Uykusuzluk yüzünden merdivenlerden düştün. Bitkinlik seni fiziksel olarak da parçalıyor.",
        },
      },
    ],
  },
  {
    id: "halk_ahlaksiz_dedigodusu",
    kategori: "sosyal",
    maxAhlak: 25,
    minYas: 15,
    gorsel: "🗯️",
    baslik: "Halkın Nefreti",
    metin: "İtibarın ve ahlakın yerlerde. Sokakta yürürken insanlar sana tükürüyor, esnaf sana mal satmak istemiyor.",
    secenekler: [
      {
        metin: "İtibarını düzeltmek için meydanda bedava erzak dağıt.",
        baseBasariSansi: 50,
        maliyet: 25,
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          para: -25,
          mesaj: "Cömertliğin insanların midesine dokundu. Eskiden tükürenler şimdi sana 'hayırsever' diyor.",
        },
        basarisizSonuc: {
          para: -25,
          mutluluk: -10,
          mesaj: "Halk erzağı aldı ama yine de arkandan küfretmeye devam etti. Paran boşa gitti.",
        },
      },
      {
        metin: "Başını dik tut, bu sürüyü umursama.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Onların ne düşündüğü umurunda değil. Sert ve acımasız yoluna devam ettin.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          saglik: -5,
          mesaj: "Umursamıyormuş gibi yapsan da atılan bir çürük domates kafana isabet etti. İçten içe çöküyorsun.",
        },
      },
    ],
  },
  {
    id: "halk_tanınmayan_yabanci",
    kategori: "sosyal",
    maxUn: 10,
    minYas: 16,
    gorsel: "🙈",
    baslik: "Görünmez Adam",
    metin: "Yıllardır bu topraklardasın ama hâlâ bir hayalet muamelesi görüyorsun. Devlet kapıları yüzüne kapanıyor, pazarlıklar aleyhine sonuçlanıyor.",
    secenekler: [
      {
        metin: "Büyük bir festivalde ortaya çık ve dikkatleri üzerine çek.",
        baseBasariSansi: 50,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          un: 20,
          mutluluk: 3,
          mesaj: "Gösterişli kıyafetlerin ve cömertliğin sayesinde sonunda bazı insanlar adını öğrendi!",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -6,
          mesaj: "Çabaların fark edilmedi. Kalabalığın içinde sadece cüzdanı hafiflemiş bir hiçkimsesin.",
        },
      },
      {
        metin: "Görünmezliğin tadını çıkar, sessizce işini yap.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Görünmez olmak beladan uzak durmaktır. Kimse senden vergi veya rüşvet sormadı.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Görmezden gelinmek, gün geçtikçe ruhunu ezen ağır bir yüke dönüştü.",
        },
      },
    ],
  },
  {
    id: "sezgi_gozlemci_yardimci",
    kategori: "ticaret",
    yasakliEtiketler: [
      "gozlemci_var",
    ],
    minYas: 18,
    gorsel: "🔍",
    baslik: "Karanlık Sokakların Gözü",
    metin: "Sokaklarda her şeyi duyan, kimin kiminle yattığını, kimin ne kadara mal sattığını bilen keskin gözlü (ama tehlikeli) bir muhbir sana çalışmayı teklif ediyor.",
    secenekler: [
      {
        metin: "Onu işe al, şehrin sırları senin olsun.",
        baseBasariSansi: 75,
        maliyet: 35,
        basariliSonuc: {
          para: -29,
          etiket_ekle: [
            "gozlemci_var",
          ],
          mesaj: "Muhbiri işe aldın. Artık atacağın adımlarda rakiplerinin ne yapacağını önceden kestirebiliyorsun.",
        },
        basarisizSonuc: {
          para: -35,
          mesaj: "Adam parayı aldı ve ertesi gün sırra kadem bastı. Dolandırıldın.",
        },
      },
      {
        metin: "Kendi sezgilerim bana yeter, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Bu tür karanlık tiplere güvenmemekte haklıydın. İşine kendi aklınla devam ettin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sonradan bir ihalede körü körüne kaybettiğinde keşke o adamı tutsaydım dedin.",
        },
      },
    ],
  },
  {
    id: "eksen_ani_karar_ani",
    kategori: "siyaset",
    minYas: 16,
    gorsel: "⚡",
    baslik: "Gecikmeye Gelmez",
    metin: "Valinin konağında şüpheli bir yangın çıktı ve içeride devasa bir altın sandığı savunmasız duruyor. Birkaç dakika içinde çatı çökecek. Düşünmeye vakit yok!",
    secenekler: [
      {
        metin: "İçeri dal ve o sandığı kap!",
        baseBasariSansi: 65,
        gerekliEksen: {
          eksen: "fevrilik",
          min: 60,
        },
        basariliSonuc: {
          para: 45,
          un: 15,
          ahlak: -10,
          mesaj: "Alevlerin arasından sandıkla çıktın! Yanıkların var ama servetine servet kattın.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 10,
          mesaj: "Kiriş kafana çöktü! Seni dışarı ölü gibi çıkardılar, günlerce komada kaldın.",
        },
      },
      {
        metin: "Delilik bu! Uzaktan izle.",
        baseBasariSansi: 100,
        gerekliEksen: {
          eksen: "fevrilik",
          max: 59,
        },
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Bina gözlerinin önünde çökerken 'İyi ki girmemişim' dedin. Canından kıymetli değil.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "eksen_dusmanin_insafina_kaldi",
    kategori: "sosyal",
    minYas: 16,
    gorsel: "🗡️",
    baslik: "Boynu Bükük Düşman",
    metin: "Yıllarca sana kan kusturan o adam şimdi tamamen iflas etmiş, dizlerinin üzerine çökmüş senden bir parça merhamet dileniyor. Kılıcını çekebilir veya ona ekmek verebilirsin.",
    secenekler: [
      {
        metin: "Ona acı, cebine altın koy ve gitmesini söyle.",
        baseBasariSansi: 85,
        gerekliEksen: {
          eksen: "merhamet",
          min: 55,
        },
        basariliSonuc: {
          ahlak: 25,
          mutluluk: 8,
          mesaj: "İntikam zehrini içmeyi reddettin. Düşmanın ağlayarak ellerini öptü ve şehri terk etti.",
        },
        basarisizSonuc: {
          ahlak: 15,
          saglik: -20,
          mesaj: "Ona arkanı döndüğün an sırtına hançer sapladı! Merhametin az kalsın seni öldürüyordu.",
        },
      },
      {
        metin: "Geçmişin bedeli kanla ödenir! Cezalandır.",
        baseBasariSansi: 75,
        gerekliEksen: {
          eksen: "merhamet",
          max: 54,
        },
        basariliSonuc: {
          un: 25,
          ahlak: -25,
          mesaj: "Acımadın ve onu zindanlara/ölüme yolladın. Şehirde kimse artık senin adını anmaya bile cesaret edemiyor.",
        },
        basarisizSonuc: {
          un: -10,
          ahlak: -15,
          mesaj: "Zalimliğin halkı isyan ettirdi, seni durdurup adamı elinden aldılar.",
        },
      },
    ],
  },
  {
    id: "ekip_referansli_yardimci",
    kategori: "sosyal",
    minYas: 18,
    gorsel: "🤝",
    baslik: "Usta Kılıçşör",
    metin: "Savaş tecrübesi olan, yüzü yara bere içinde bir usta kılıçşör/koruma senin emrine girmeyi teklif ediyor. İstediği peşinat oldukça tuzlu ama seni her şeyden koruyacağına yemin ediyor.",
    secenekler: [
      {
        metin: "Seni işe alıyorum, gölgem ol.",
        baseBasariSansi: 85,
        maliyet: 60,
        basariliSonuc: {
          para: -54,
          ekip_ekle: {
            rol: "Korumalı Yardımcı",
            tahminGenisligi: 16,
          },
          mesaj: "Adam işe başladı. Sadece varlığı bile etrafındaki çakalları senden uzak tutmaya yetti.",
        },
        basarisizSonuc: {
          para: -60,
          mesaj: "Adam peşinatı aldığı gece sarhoş olup kumarda kaybetti ve şehirden kaçtı!",
        },
      },
      {
        metin: "Çok pahalısın, benim korumaya ihtiyacım yok.",
        baseBasariSansi: 88,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Teklifi reddettin. Paranı cebinde tutup yalnız başına dolaşmaya devam ediyorsun.",
        },
        basarisizSonuc: {
          para: -8,
          mesaj: "Adam gittikten kısa süre sonra iki serseri seni köşeye sıkıştırdı; 'korumasız olduğun belliydi' diye sırıttılar.",
          detay: "Bazen bir gölgenin caydırıcılığı, ödediğin paraya değer.",
        },
      },
    ],
  },
  {
    id: "ekip_ucuz_belirsiz_yardimci",
    kategori: "ticaret",
    minYas: 18,
    gorsel: "🎲",
    baslik: "Sokaktaki Yetim",
    metin: "Sokaklarda büyümüş, zayıf ama cin gibi bakan bir genç paçana yapıştı. 'Bana bir tas çorba ver, senin için her işi yaparım' diyor. İçinde bir yetenek mi var yoksa sadece bir hırsız mı belli değil.",
    secenekler: [
      {
        metin: "Gel bakalım, şansını dene.",
        baseBasariSansi: 70,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          ekip_ekle: {
            rol: "Sokak Çocuğu",
            tahminGenisligi: 50,
          },
          mesaj: "Çocuğu yanına aldın. İlk günlerinde sana çok sadık görünüyor, gerçek yeteneğini zaman gösterecek.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Çocuk ilk günden kasandan 10 altın çalıp sırra kadem bastı.",
        },
      },
      {
        metin: "Sokak faresi! Uzak dur benden.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Çocuğu itip yoluna devam ettin. Vicdanın çok hafif sızladı.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Çocuğu kovalarken el çabukluğuyla cebinden birkaç sikke aşırdığını fark ettin.",
        },
      },
    ],
  },
  {
    id: "ekip_yeni_taniski",
    kategori: "sosyal",
    minYas: 16,
    gorsel: "🧳",
    baslik: "Yol Arkadaşı",
    metin: "Yolculuk sırasında bir handa tanıştığın gezgin, senin hedeflerinden çok etkilendi. Seninle aynı yolu yürümek istiyor. Bilgili biri ama geçmişini saklıyor.",
    secenekler: [
      {
        metin: "Yanımda yürüyebilirsin.",
        baseBasariSansi: 80,
        maliyet: 20,
        basariliSonuc: {
          para: -14,
          ekip_ekle: {
            rol: "Gezgin Yoldaş",
            tahminGenisligi: 35,
          },
          mesaj: "Sırt çantasını alıp peşine takıldı. Onun anlattığı hikayeler yolculuğunu çok daha çekilir kılıyor.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Gece uyurken adamın eşyalarını toplayıp sessizce ayrıldığını fark ettin.",
        },
      },
      {
        metin: "Yolumu yalnız yürürüm.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Handa yollarınızı ayırdınız. Yalnız yürümek her zaman en güvenlisidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Yolun geri kalanı sessiz ve uzun geçti; gezginin anlatacağı hikayeleri kaçırdığını düşünmeden edemedin.",
          detay: "Yalnızlık bazen sandığından ağır basıyor.",
        },
      },
    ],
  },
  {
    id: "ekip_tehlikeli_kervan_yolu",
    kategori: "ticaret",
    gerekliEkip: true,
    gorsel: "🐫",
    baslik: "Uçurum Geçidi",
    metin: "Çok değerli bir kargoyu 'Uçurum Geçidi'nden geçirmek zorundasınız. O geçit haydutların ve yırtıcıların meskeni. Ekibini mi riske atacaksın, yoksa başa sen mi geçeceksin?",
    secenekler: [
      {
        metin: "Bu riski ben alırım! Kervanın başına geç.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 55,
          un: 20,
          mesaj: "Kılıcın ve cesaretinle kervanı uçurumdan geçirdin! Kazanç muazzam.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 20,
          mesaj: "Haydutlar sizi pusuya düşürdü! Karnından okla vuruldun, mallar yağmalandı.",
        },
      },
      {
        metin: "{ekip}'e emret: 'Kargoyu sağ salim getirin.'",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: -11,
          para: 35,
          un: 3,
          mesaj: "Ekibin kan ter içinde ama başarılı bir şekilde malları getirdi. Liderlik budur.",
        },
        basarisizSonuc: {
          ekip_kaybi: true,
          para: -20,
          mutluluk: -19,
          mesaj: "Günler geçti... Ne {ekip} döndü ne de kargo. Vahşi doğa onları yuttu.",
        },
      },
    ],
  },
  {
    id: "ekip_riskli_gorev_teklifi",
    kategori: "siyaset",
    gerekliEkip: true,
    gorsel: "🗺️",
    baslik: "Zehrin Kuryesi",
    metin: "Saraydan gelen gizemli bir adam sana mühürlü bir mektup uzattı. 'Bunu karşı kaleye ulaştır. Yakalanırsan seni tanımayız.' dedi. Çok tehlikeli bir görev.",
    secenekler: [
      {
        metin: "Sırrı ben taşırım. Bizzat git.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 30,
          para: 40,
          etiket_ekle: [
            "itibar:sarayin_adami",
          ],
          mesaj: "Gecenin karanlığında mektubu teslim ettin. Saray artık sana çok şey borçlu.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 25,
          mesaj: "Sınır muhafızları seni yakaladı! İşkence gördün, canını zor kurtardın.",
        },
      },
      {
        metin: "Gölgeler içinde halledilsin, {ekip}'i yolla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -8,
          para: 20,
          un: 5,
          mesaj: "{ekip} görevi senin adına tamamladı ve güvenle geri döndü.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          ekip_kaybi: true,
          mesaj: "Gönderdiğin yardımcı sınırda yakalandı ve asıldı! Kanı senin ellerinde.",
        },
      },
    ],
  },
  {
    id: "ekip_koruma_kiralama",
    kategori: "siyaset",
    agirlik: 0.4,
    gorsel: "🛡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Karanlık Bir Gölgelik",
    metin: "Şehirde düşmanların artıyor. Hanın köşesinde, yüzü yara bere içinde bir paralı asker sana hizmetlerini sunuyor. Kendini çok övüyor ama gerçekte ne kadar yetenekli olduğunu sadece zaman gösterecek.",
    secenekler: [
      {
        metin: "Onu koruman olarak işe al.",
        baseBasariSansi: 85,
        maliyet: 15,
        basariliSonuc: {
          para: -15,
          ekip_ekle: {
            rol: "Koruma",
            tahminGenisligi: 70,
          },
          mesaj: "Parayı ödedin. Artık gölgen gibi seni takip ediyor.",
          detay: "Onun gerçek sadakatini ve yeteneğini bir kavgada öğreneceksin.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Parayı verdin ama adam gece yarısı ortadan kayboldu.",
          detay: "Han köşelerinden adam kiralarken dikkatli olmalıydın.",
        },
      },
      {
        metin: "Reddet, kendi başının çaresine bak.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Teklifi reddettin.",
          detay: "Kendi kılıcın sana yeter.",
        },
        basarisizSonuc: {
          saglik: -8,
          para: -10,
          mesaj: "Reddettiğin adam çıkışta seni bekleyen üç kişiye fısıldamış gibiydi; karanlık bir sokakta pusuya düştün.",
          detay: "Şehirdeki düşmanların, korumasız olduğunu senden önce öğrendi.",
        },
      },
    ],
  },
  {
    id: "ekip_koruma_testi",
    kategori: "savas",
    gerekliEkipRolu: "Koruma",
    agirlik: 0.9,
    ton: "agir",
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sadakat Sınavı",
    metin: "Gece sokağında üç serseri yolunu kesti. Bıçakları parlıyor. Korumana geri çekilip işi halletmesini emrettin. Şimdi onun gizli yeteneğini görme vakti.",
    secenekler: [
      {
        metin: "Korumanın savaşmasını bekle.",
        baseBasariSansi: 50,
        ekipKalitesiZarBelirler: "Koruma",
        basariliSonuc: {
          un: 15,
          mesaj: "Koruman bir şimşek gibi hareket edip üçünü de yere serdi! İşe aldığın adam tam bir ölüm makinesiymiş.",
          detay: "Verdiğin her kuruşa değdi.",
        },
        basarisizSonuc: {
          saglik: -30,
          para: -20,
          ekip_sil: "Koruma",
          mesaj: "Koruman bıçakları görünce korkup kaçtı! Serseriler seni feci şekilde dövüp paranı aldılar.",
          detay: "Yardımcın bir korkaktı. Hem paranı hem sağlığını kaybettin.",
        },
      },
      {
        metin: "Korumana güvenme, kendin de bıçağını çek.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 10,
          saglik: -6,
          mesaj: "İkiniz birlikte serserileri püskürttünüz; yara aldın ama ayaktasın.",
          detay: "Bazen kendi işini kimseye bırakmamak gerekir.",
        },
        basarisizSonuc: {
          saglik: -25,
          para: -15,
          olum_sansi: 5,
          mesaj: "Serseriler ikinizi de yendi; ağır yaralı ve parasız kaldın.",
          detay: "Cesaret her zaman yetmez.",
        },
      },
    ],
  },
  {
    id: "ekip_tuccar_yaveri",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    agirlik: 0.7,
    gorsel: "📜",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Zeki Bir Çırak",
    metin: "İşlerin büyüyor ve hesapları tutması için zeki görünümlü bir genci yaver olarak işe almayı düşünüyorsun. Sana büyük paralar kazandırabilir ya da kasanı boşaltabilir.",
    secenekler: [
      {
        metin: "Onu muhasebecin yap.",
        baseBasariSansi: 80,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          ekip_ekle: {
            rol: "Muhasebeci",
            tahminGenisligi: 85,
          },
          mesaj: "Genç, masasına oturdu ve defterleri düzenlemeye başladı.",
          detay: "Umarım matematiği dürüstlüğü kadar kuvvetlidir.",
        },
        basarisizSonuc: {
          para: -10,
          un: -5,
          mesaj: "Genç, ilk haftanın ücretini alır almaz ortadan kayboldu. Defterlerden birkaç sayfa da onunla gitti.",
          detay: "Zekiydi, evet — ama yanlış işlerde.",
        },
      },
      {
        metin: "İşi kendin yapmaya devam et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: -5,
          mesaj: "İş yükü sağlığını biraz yordu ama en azından kasanın anahtarı sende.",
          detay: "Güven pahalı bir lükstür.",
        },
        basarisizSonuc: {
          saglik: -12,
          mutluluk: -8,
          mesaj: "Defterlere gömülü geçen bir kış seni iyice yıprattı; gözlerin bulanık, sırtın tutuk.",
          detay: "Her şeyi tek başına taşımanın da bir bedeli var.",
        },
      },
    ],
  },
  {
    id: "ekip_tuccar_yaveri_testi",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEkipRolu: "Muhasebeci",
    agirlik: 0.8,
    gorsel: "💰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Büyük Sevkiyat",
    metin: "Şehir dışındayken büyük bir mal sevkiyatının yönetimi muhasebecine kaldı. Döndüğünde kasanın durumuna bakıyorsun.",
    secenekler: [
      {
        metin: "Hesapları kontrol et.",
        baseBasariSansi: 50,
        ekipKalitesiZarBelirler: "Muhasebeci",
        basariliSonuc: {
          para: 60,
          maas_carpani: 1.1,
          mesaj: "Gözlerine inanamadın! Yaverin pazar açıklarını harika değerlendirmiş ve kârını ikiye katlamış.",
          detay: "Muazzam bir yetenek bulmuşsun.",
        },
        basarisizSonuc: {
          para: -40,
          ekip_sil: "Muhasebeci",
          mesaj: "Kasa bomboş! Yaverin tüm nakdini alıp gece yarısı bir gemiyle kaçmış.",
          detay: "İşe yaramaz bir hırsıza güvenmenin bedelini ödedin.",
        },
      },
      {
        metin: "Hesapları kontrol etme, ona güven, dinlenmeye bak.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: 8,
          para: 10,
          mesaj: "Dinlenmen iyi geldi; döndüğünde kasanın gerçekten iyi durumda olduğunu gördün.",
          detay: "Bazen güvenmek de bir tercih, hatta bir dinlenmedir.",
        },
        basarisizSonuc: {
          para: -30,
          mesaj: "Güvenin kötüye kullanıldı; yaverin parayı alıp kayıplara karıştı.",
          detay: "Kontrolsüz güven bazen pahalıya patlar.",
        },
      },
    ],
  },
  {
    id: "hizip_asker_saflasma",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    yasakliEtiketler: [
      "hizip_secildi",
    ],
    minYas: 17,
    gorsel: "⚔️",
    baslik: "Kışlada Bölünme",
    metin: "Ordunun içi kaynıyor. 'Eski Muhafızlar' generalin katı ve soylu kurallarını savunurken, 'Yeni Nizam' liyakata dayalı köklü bir reform istiyor. Silahlar yakında birbirine dönebilir.",
    secenekler: [
      {
        metin: "Geleneklerimiz bizi yaşatır! Eski Muhafızlar'a katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Eski Muhafızlar",
          ahlak: 10,
          un: 5,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Soylu komutanların yanında saf tuttun. Gelenekçiler seni bağrına bastı.",
        },
        basarisizSonuc: {
          hizip_ata: "Eski Muhafızlar",
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama yeni yetmeler sana düşman gözüyle bakıyor.",
        },
      },
      {
        metin: "Bu çürümüş düzen değişmeli! Yeni Nizam'a katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Yeni Nizam",
          un: 15,
          ahlak: -5,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Reformcuların arasına genç bir aslan gibi girdin. Değişim rüzgarları esiyor!",
        },
        basarisizSonuc: {
          hizip_ata: "Yeni Nizam",
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama soylu general adını kara listeye aldı bile.",
        },
      },
    ],
  },
  {
    id: "hizip_tuccar_saflasma",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    yasakliEtiketler: [
      "hizip_secildi",
    ],
    minYas: 17,
    gorsel: "⚖️",
    baslik: "Pazarın Hakimi Kim?",
    metin: "Ticaret odası ikiye bölündü. Liman Loncası asilzadelerin desteğiyle tekelciliği savunuyor; Pazar Birliği ise küçük esnafın serbest rekabet hakkını. Tarafını seçmezsen iflas edebilirsin.",
    secenekler: [
      {
        metin: "Zenginlik ve güç! Liman Loncası'na katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Liman Loncası",
          para: 30,
          ahlak: -15,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Soylu tüccarlar seni aralarına aldı. Vergi indirimleri anında başladı.",
        },
        basarisizSonuc: {
          hizip_ata: "Liman Loncası",
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama küçük esnaf sana sırtını döndü.",
        },
      },
      {
        metin: "Halkın gücü! Pazar Birliği'ne katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Pazar Birliği",
          un: 20,
          ahlak: 15,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Esnafın kahramanı oldun. Sokaktaki adam artık senin tezgâhından alışveriş yapıyor.",
        },
        basarisizSonuc: {
          hizip_ata: "Pazar Birliği",
          para: -15,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama asilzadeler mallarına ağır gümrük vergileri koydu.",
        },
      },
    ],
  },
  {
    id: "hizip_din_saflasma",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    yasakliEtiketler: [
      "hizip_secildi",
    ],
    minYas: 17,
    gorsel: "📿",
    baslik: "Kutsal Bölünme",
    metin: "İnanç merkezleri ikiye yarıldı. Gelenekçiler kadim ve katı yasaları geri getirmek isterken, Yenilikçiler dini halkın diline çevirip aydınlanma talep ediyor. Hangi saftasın?",
    secenekler: [
      {
        metin: "Kurallar esnetilemez! Gelenekçiler'e katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Gelenekçiler",
          ahlak: 15,
          un: 10,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Eski piskoposlar seni takdir etti. Kadim bilginin koruyucususun.",
        },
        basarisizSonuc: {
          hizip_ata: "Gelenekçiler",
          mutluluk: -5,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Genç cemaat seni yobazlıkla suçlayarak tapınağı terk etti.",
        },
      },
      {
        metin: "Aydınlanma vakti! Yenilikçiler'e katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Yenilikçiler",
          un: 25,
          ahlak: 5,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Meydanlar seni dinlemek için dolup taşıyor. Yeni çağın sesi oldun.",
        },
        basarisizSonuc: {
          hizip_ata: "Yenilikçiler",
          un: -10,
          ahlak: -15,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Engizisyon / Üst Kurul seni kafirlikle suçlamakla tehdit ediyor.",
        },
      },
    ],
  },
  {
    id: "hizip_zanaatkar_saflasma",
    kategori: "zanaat",
    meslekler: [
      "Zanaatkâr",
    ],
    yasakliEtiketler: [
      "hizip_secildi",
    ],
    gorsel: "🔨",
    baslik: "Loncanın İçi Karıştı",
    metin: "Atölyede geçirdiğin yıllar boyunca loncanın gerçek bölünmesini gördün: Lonca Meclisi eski usulleri, sıkı denetimi ve sabit fiyatları savunuyor; Serbest Ustalar ise loncanın elinden kurtulup kendi fiyatını kendin koy diyor. Artık bir tarafta durmalısın.",
    secenekler: [
      {
        metin: "Düzen ve zanaat şerefi! Lonca Meclisi'ne katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Lonca Meclisi",
          ahlak: 10,
          un: 8,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Usta ustabaşılar seni bağrına bastı. Loncanın koruması artık senin de arkanda.",
        },
        basarisizSonuc: {
          hizip_ata: "Lonca Meclisi",
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama genç kalfalar seni tutucu diye dışladı.",
        },
      },
      {
        metin: "Emeğimin hakkı bana ait! Serbest Ustalar'a katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Serbest Ustalar",
          para: 15,
          un: 6,
          ahlak: -5,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Kendi fiyatını kendin koymaya başladın; ilk haftadan cebin şişti.",
        },
        basarisizSonuc: {
          hizip_ata: "Serbest Ustalar",
          para: -10,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama lonca seni malzeme tedarikinden dışladı, ilk aylar zorlu geçti.",
        },
      },
    ],
  },
  {
    id: "dunya_savas_biter",
    kategori: "siyaset",
    gerekliUlke: {
      savasta: true,
    },
    gorsel: "🕊️",
    agirlik: 0.8,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kanlı Çamurun Sonu",
    metin: "{yil} yılında imzalanan antlaşmayla savaş nihayet sona erdi. Cepheden eksik uzuvlar ve boş bakışlarla dönen yoldaşların iş arıyor. Hazine tamtakır, sokaklar gazi dolu. Yeni dünya düzeninde yerin neresi olacak?",
    secenekler: [
      {
        metin: "Eski yoldaşlarını topla, gaziler için bir dayanışma ağı kur.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 25,
          para: -20,
          ahlak: 20,
          ulke_etkisi: {
            savasta: false,
          },
          etiket_ekle: [
            "gaziler_agi",
            "itibar:gazi_babasi",
          ],
          mesaj: "Yüzlerce gaziye iş ve aş buldun. Şehirde sana kendi babalarından daha çok sadık kocaman bir gayriresmi ordun var.",
          detay: "Bu adamların çoğu okuma yazma bilmiyor ama senin için canlarını verirler.",
        },
        basarisizSonuc: {
          para: -25,
          un: -10,
          ulke_etkisi: {
            savasta: false,
          },
          mesaj: "Söz verdiğin işleri bulamadın. Eski silah arkadaşların kapına dayanıp seni 'hayal tacirliğiyle' suçladı.",
          detay: "Bir daha hiçbir askerin yüzüne bakamayacaksın.",
        },
      },
      {
        metin: "Fırsat bu fırsat! Savaşta sahipsiz kalan arazileri yok pahasına kapat.",
        baseBasariSansi: 55,
        maliyet: 25,
        basariliSonuc: {
          para: 60,
          ahlak: -25,
          un: -10,
          ulke_etkisi: {
            savasta: false,
          },
          mesaj: "Şehit düşenlerin tarlalarını üç kuruşa satın alıp tapularına el koydun. Savaş bitti ve sen bir toprak ağasısın.",
          detay: "Önceki sahiplerin dulları bazen pazarda yüzüne tükürüyor, sen ise o sırada altınlarını sayıyorsun.",
        },
        basarisizSonuc: {
          para: -30,
          ulke_etkisi: {
            savasta: false,
          },
          mesaj: "Aldığın arazilerin çoğunun gerçek varisleri ortaya çıktı. Mahkeme tapularını iptal etti.",
          detay: "Ölülerin malı sana yar olmadı.",
        },
      },
      {
        metin: "İsyan edebilecek eski askerlerin isimlerini yeni hükümete sat.",
        baseBasariSansi: 80,
        maxAhlak: 40,
        basariliSonuc: {
          para: 40,
          un: -20,
          ahlak: -35,
          ulke_etkisi: {
            savasta: false,
          },
          etiket_ekle: [
            "sir:yoldas_satan",
          ],
          mesaj: "Listeyi verdin. O gece şehirde onlarca eski yoldaşın yataklarından alınıp zindanlara atıldı. Kesen doldu ama ellerin kanlı.",
          detay: "Artık yeni devletin gizli bir köpeğisin.",
        },
        basarisizSonuc: {
          para: -10,
          un: -25,
          ahlak: -20,
          ulke_etkisi: {
            savasta: false,
          },
          etiket_ekle: [
            "sir:yoldas_satan",
          ],
          mesaj: "Liste yeni hükümete ulaşmadan sızdı. Eski yoldaşların kimin ihbar ettiğini öğrendi; artık her gölgeden korkuyorsun ve devletten beş kuruş alamadın.",
          detay: "İhanet açığa çıkınca hem parayı hem güvenliği kaybettin.",
        },
      },
    ],
  },
  {
    id: "dunya_savas_cephe_cagrisi",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliUlke: {
      savasta: true,
    },
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 3,
    baslik: "Ölüm Emri",
    metin: "Savaş en kanlı evresine girdi. Alayın doğrudan ölüm kokan bir tabyaya sürülüyor. Komutan gece yarısı çadırında görev dağıtımı yapıyor. Gözleri senin üzerinde.",
    secenekler: [
      {
        metin: "Ölüme ilk ben giderim! Taarruz koluna yazıl.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 35,
          para: 25,
          saglik: -15,
          ahlak: -10,
          etiket_ekle: [
            "kahraman_asker",
          ],
          unvan_kazan: "Tabya Fatihi",
          mesaj: "Tabyayı kan banyosuna çevirip ilk sen düştün içine! Göğsüne bizzat general madalya taktı.",
          detay: "O gün boğazladığın düşmanların yüzlerini unutamıyorsun ama tarih kitapları adını altın harflerle yazacak.",
        },
        basarisizSonuc: {
          saglik: -50,
          olum_sansi: 30,
          durum_ekle: {
            id: "savas_yarasi_agir",
            ad: "Kopuk Uzuv",
            tur: "kalici",
            tur_basi_saglik: -2,
          },
          mesaj: "Bir top mermisi seni havaya uçurdu. Günlerce cesetlerin arasında ölü yattın sanılıp bırakıldın.",
          detay: "Uyandığında bedeninin bir parçasının eksik olduğunu fark ettin.",
        },
      },
      {
        metin: "Beni ikmal hattına, cephe gerisine verin komutanım.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: 15,
          un: -20,
          saglik: -5,
          mesaj: "Erzak çuvallarının arkasında saklanarak savaşı sağ salim atlattın.",
          detay: "Dönen silah arkadaşların artık seninle aynı masaya oturmuyor. Yüzündeki o utanç ömür boyu sürecek.",
        },
        basarisizSonuc: {
          para: -15,
          un: -25,
          mesaj: "İkmal hattına sızan düşman süvarileri sizi kılıçtan geçirdi. Korkaklığın seni koruyamadı.",
          detay: "Hem kaçtın hem de esir düşmekten zor kurtuldun.",
        },
      },
    ],
  },
  {
    id: "dunya_savas_maas_kesintisi",
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliUlke: {
      savasta: true,
    },
    gorsel: "💸",
    baslik: "Aç Askerler",
    metin: "Savaş uzadıkça hazine suyunu çekti. Üç aydır tek bir gümüş bile ödenmedi. Askerlerin botları delik, mideleri boş. Kışlada isyan fısıltıları dolaşıyor.",
    secenekler: [
      {
        metin: "Elebaşı ol! Dilekçeyi alıp generalin çadırına dayan.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 15,
          un: 25,
          ahlak: 15,
          etiket_ekle: [
            "asker_sozcusu",
          ],
          mesaj: "Yumruğunu masaya vurdun. General isyandan korkup hazinedeki son parayı size dağıttı. Sen bir efsanesin!",
          detay: "Ancak üst komuta seni 'tehlikeli asi' olarak fişledi.",
        },
        basarisizSonuc: {
          un: -25,
          saglik: -20,
          olum_sansi: 15,
          mesaj: "General seni dinlemedi bile. İsyana teşvikten kırbaç cezasına çarptırıldın ve zindana atıldın.",
          detay: "Arkandaki askerler korkup seni sattı. Yalnız kaldın.",
        },
      },
      {
        metin: "Haklısınız de, ama çevre köyleri yağmalamaya ikna et.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 45,
          ahlak: -40,
          un: -15,
          etiket_ekle: [
            "sir:koy_yagmaci",
          ],
          mesaj: "Aç askerlerle gece vakti savunmasız köylere daldınız. Altın ve yiyecekle döndünüz ama gökyüzü o gece kıpkırmızıydı.",
          detay: "Ağlayan o köylü kadının yüzü artık kabuslarında.",
        },
        basarisizSonuc: {
          saglik: -30,
          ahlak: -25,
          un: -20,
          olum_sansi: 10,
          mesaj: "Köylüler beklediğinizden dişli çıktı. Tırpan ve baltalarla askerleri pusuya düşürdüler, karnından ağır yaralandın.",
          detay: "Yağmacılık yaparken köylüden dayak yemek, itibarını sonsuza dek bitirdi.",
        },
      },
    ],
  },
  {
    id: "dunya_salgin_biter",
    kategori: "saglik",
    gerekliUlke: {
      vebada: true,
    },
    gorsel: "🌱",
    agirlik: 0.8,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Ölümün Çekilişi",
    metin: "Aylar süren dehşetin ardından veba geri çekiliyor. Nüfusun üçte biri yok oldu. Sahipsiz kalan evler, dükkânlar ve sokaklarda aç gezen yetimler var. Şehir yeniden doğuyor.",
    secenekler: [
      {
        metin: "Sahipsiz mülklere sahte tapular düzenleyerek el koy.",
        baseBasariSansi: 60,
        maliyet: 15,
        basariliSonuc: {
          para: 50,
          ahlak: -35,
          un: -15,
          maas_carpani: 1.3,
          ulke_etkisi: {
            vebada: false,
          },
          mesaj: "Ölülerin yatakları daha soğumadan evlerine çöktün. Dev bir emlak imparatorluğu kurdun ama kâbuslarında o yüzleri görüyorsun.",
        },
        basarisizSonuc: {
          para: -25,
          un: -25,
          ahlak: -30,
          ulke_etkisi: {
            vebada: false,
          },
          mesaj: "Gerçek varisler kasabaya geri döndü. Sahtekârlıktan yargılandın, halk seni linç etmeye kalktı.",
        },
      },
      {
        metin: "Vebadan kurtulan yetimleri topla ve onlara bir yurt kur.",
        baseBasariSansi: 75,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 30,
          ahlak: 35,
          maas_carpani: 1.1,
          etiket_ekle: [
            "ciraklar_var",
            "itibar:yetim_babasi",
          ],
          ulke_etkisi: {
            vebada: false,
          },
          mesaj: "Yetimler senin elinde büyüdü. Onlar artık sadece çırak değil, senin en sadık evlatların.",
          detay: "Yıllar sonra o çocuklar senin iş imparatorluğunu sırtlayacak.",
        },
        basarisizSonuc: {
          para: -30,
          ahlak: 15,
          ulke_etkisi: {
            vebada: false,
          },
          mesaj: "Çocukların bakımı seni maddi olarak tüketti. Bazıları hırsızlık yapıp kaçtı ama yine de vicdanın rahat.",
        },
      },
    ],
  },
  {
    id: "dunya_ekonomi_toparlanma",
    kategori: "ticaret",
    gerekliUlke: {
      ekonomi: "kotu",
    },
    gorsel: "📈",
    agirlik: 0.8,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Yeni Dönem",
    metin: "Devlet yeni para bastı, yollar açıldı. Krizin o ağır tozu kalkıyor. İlk cesur hamleyi yapan piyasanın kaymağını yiyecek.",
    secenekler: [
      {
        metin: "Borç batağına gir, tüm malları topla! Agresif büyü.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 50,
          un: 20,
          maas_carpani: 1.3,
          ulke_etkisi: {
            ekonomi: "iyi",
          },
          mesaj: "Rakiplerin hala korkudan titrerken sen depoları doldurdun. Toparlanma dalgasını yakaladın, servetin uçtu!",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -40,
          un: -10,
          ulke_etkisi: {
            ekonomi: "normal",
          },
          mesaj: "Çok acele ettin. Fiyatlar bir kez daha dibe vurduğunda borçlar boynunu sıktı. Elindeki her şeyi kaybettin.",
        },
      },
      {
        metin: "Temkinli ol, ufak ufak alım yap.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 20,
          ulke_etkisi: {
            ekonomi: "normal",
          },
          mesaj: "Risksiz ve sağlam adımlarla ilerledin. Zengin olmadın ama ayakların yere çok sağlam basıyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -5,
          un: -5,
          ulke_etkisi: {
            ekonomi: "normal",
          },
          mesaj: "Çok bekledin; sen piyasaya girene kadar büyük kurtlar tüm ihaleleri kapmıştı bile.",
        },
      },
    ],
  },
  {
    id: "rusvet_teklif_geldi",
    kategori: "siyaset",
    minUn: 35,
    gorsel: "🤫",
    agirlik: 1,
    baslik: "Sana Gelen Teklif",
    metin: "Artık sözü geçen biri olduğun için ilk kez rüşvet teklif edilen taraf sensin. Bir müteahhit, sen bir yere iki kelime edersen ihalenin kendisine kalacağını söylüyor. Kese masada.",
    secenekler: [
      {
        metin: "Keseyi al, iki kelimeyi et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 50,
          ahlak: -28,
          etiket_ekle: [
            "rusvet_agi",
          ],
          mesaj: "İhale ona kaldı, kese sana. Kimse bir şey sormadı.",
          detay: "Ne kadar kolay olduğu seni ürküttü. Bir hafta sonra ikinci bir kese geldi ve sen artık 'hayır' demenin ne zaman imkânsızlaştığını düşünüyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          un: -30,
          ahlak: -22,
          mesaj: "Müteahhit yakalandı ve ilk iş senin adını verdi.",
          detay: "İtibarın çöktü. Yıllarca kurduğun ne varsa bir ifadeyle dağıldı; en acısı da doğru olduğu için itiraz bile edememen.",
        },
      },
      {
        metin: "Reddet ve teklifi kayda geçir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 24,
          ahlak: 25,
          etiket_ekle: [
            "durust_bilinen",
          ],
          mesaj: "Teklifi belgeledin; müteahhit yargılandı, senin adın temizlendi.",
          detay: "Artık dürüstlüğün bir sermaye. İnsanlar sana hassas işleri emanet ediyor. Bir de arkanda, seni asla affetmeyecek bir adam var.",
        },
        basarisizSonuc: {
          para: -22,
          un: -12,
          ahlak: 20,
          mesaj: "Reddettin; müteahhit önce iftira attı, sonra işlerini baltaladı.",
          detay: "Kimse teklifin varlığına inanmadı, herkes senin husumetine inandı. Doğru olanı yaptın ve bedelini tek başına ödüyorsun.",
        },
      },
      {
        metin: "Ne al ne reddet — belgelerle şantaj yapıp ihaleyi kendine al.",
        baseBasariSansi: 45,
        maxAhlak: 40,
        basariliSonuc: {
          para: 60,
          un: 15,
          ahlak: -30,
          mesaj: "Müteahhidi tehdit ederek çekilmesini sağladın ve ihaleyi bizzat sen aldın.",
          detay: "Rüşvet almadın, sadece zayıflığı paraya çevirdin. Artık bu oyunun kurallarını sen yazıyorsun.",
        },
        basarisizSonuc: {
          para: -25,
          un: -28,
          ahlak: -22,
          olum_sansi: 10,
          mesaj: "Müteahhit şantajına boyun eğmedi ve evine kiralık katiller gönderdi.",
          detay: "Kurnazlık oynamak isterken az kalsın canından oluyordun. Tüm bağlantıların kesildi.",
        },
      },
    ],
  },
  {
    id: "rusvet_yargic",
    kategori: "siyaset",
    minYas: 22,
    gorsel: "⚖️",
    baslik: "Mahkeme Kapısında",
    metin: "Haksız yere açılmış bir davada sanıksın. Avukatın kulağına eğildi: 'Yargıcın kâtibiyle konuştum. Belli bir meblağ, belli bir karar demek. Ya da mahkemeye güvenip bekleyeceğiz.'",
    secenekler: [
      {
        metin: "Kâtibe ödeme yap, kararı garantiye al.",
        baseBasariSansi: 75,
        maliyet: 30,
        basariliSonuc: {
          para: -30,
          ahlak: -20,
          mesaj: "Karar lehine çıktı; suçsuz olduğun zaten doğruydu ama bunu para ile aldın.",
          detay: "Haklıydın ve haklılığını satın almak zorunda kaldın. Adalete olan inancın o gün mahkeme salonunda kaldı.",
        },
        basarisizSonuc: {
          para: -30,
          un: -25,
          ahlak: -18,
          saglik: -10,
          mesaj: "Kâtip parayı aldı, yargıç haberdar değildi; hem para gitti hem ceza aldın.",
          detay: "Dolandırıldın ve şikâyet bile edemedin — çünkü şikâyet, rüşvet vermeye çalıştığını itiraf etmek olurdu.",
        },
      },
      {
        metin: "Mahkemeye güven, kendini savun.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 20,
          ahlak: 20,
          mesaj: "Kendi savunmanı yaptın ve beraat ettin; salon seni alkışladı.",
          detay: "Yargıç kararında 'sanığın dürüstlüğü' diye bir cümle kullandı. O cümle şehirde seni yıllarca öne çıkaracak.",
        },
        basarisizSonuc: {
          para: -25,
          un: -18,
          saglik: -12,
          ahlak: 15,
          mesaj: "Suçsuzdun ama mahkûm oldun; birkaç ay hapis ve ağır para cezası.",
          detay: "Hapiste geçen aylar sağlığını ve işini bitirdi. Dışarı çıktığında dükkânın kapalıydı ve kimse seni işe almak istemedi.",
        },
      },
    ],
  },
  {
    id: "genel_sehir_secimi",
    kategori: "sosyal",
    minYas: 16,
    yasakliEtiketler: [
      "sehir_liman",
      "sehir_pazar",
    ],
    gorsel: "🗺️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Yol Ayrımı",
    metin: "Bulunduğun yerde işler durgun. İki seçenek var: kuzeydeki rüzgârlı liman kenti — hareketli, riskli, kazançlı. Ya da güneydeki büyük pazar şehri — kalabalık, rekabetçi, istikrarlı.",
    secenekler: [
      {
        metin: "Liman kentine taşın.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 20,
          un: 8,
          ahlak: -8,
          etiket_ekle: [
            "sehir_liman",
          ],
          maas_carpani: 1.15,
          mesaj: "Limanda hızla iş buldun; deniz ticareti kazandırıyor.",
          detay: "Liman hiç uyumuyor: gemiler, kaçak mallar, yabancı diller. Burada para hızlı kazanılıyor ve hızlı kaybediliyor.",
        },
        basarisizSonuc: {
          para: -18,
          saglik: -10,
          etiket_ekle: [
            "sehir_liman",
          ],
          mesaj: "Limanda tutunmak sandığından zor oldu; ilk yılın kayıpla geçti.",
          detay: "Herkesin bir ağı vardı ve seninki yoktu. Ucuz bir odada, rutubet ve gürültü içinde başladın.",
        },
      },
      {
        metin: "Pazar şehrine taşın.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 15,
          un: 12,
          ahlak: 5,
          etiket_ekle: [
            "sehir_pazar",
          ],
          maas_carpani: 1.1,
          mesaj: "Pazar şehrinde düzenli bir tezgâh kurdun; işler yavaş ama sağlam.",
          detay: "Burada herkes birbirini tanıyor ve itibar her şeyden değerli. Yavaş ilerliyorsun ama sağlam basıyorsun.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -8,
          etiket_ekle: [
            "sehir_pazar",
          ],
          mesaj: "Pazar doluydu; yer bulmak aylar aldı ve birikimini yedi.",
          detay: "Her köşe başı tutulmuştu. Kalabalık bir şehirde görünmez olmanın ne demek olduğunu ilk yılında öğrendin.",
        },
      },
    ],
  },
  {
    id: "liman_kacakcilik",
    kategori: "ticaret",
    gerekliEtiketler: [
      "sehir_liman",
    ],
    gorsel: "⚓",
    baslik: "Limanda Gece Yükü",
    metin: "Bir gemi kaptanı, gümrük defterine geçmeyecek bir yük için sana ortaklık öneriyor. Limanın yarısı bu işi yapıyor, diğer yarısı yakalananları izliyor.",
    secenekler: [
      {
        metin: "Ortak ol, yükü birlikte indir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 45,
          ahlak: -20,
          etiket_ekle: [
            "liman_agi",
          ],
          mesaj: "Yük gece indi, sabaha satıldı; payın beklediğinden büyüktü.",
          detay: "Artık limanın 'o işleri' yapan çevresine dahilsin. Kapılar açılıyor, ama girdiğin kapıdan çıkmak zor.",
        },
        basarisizSonuc: {
          para: -30,
          un: -22,
          saglik: -12,
          mesaj: "Gümrük muhafızları baskın yaptı; yük gitti, adın deftere yazıldı.",
          detay: "Kaptan gemiyle kaçtı, sen rıhtımda kaldın. Hem zararı sen karşıladın hem de artık her yükün iki kez aranıyor.",
        },
      },
      {
        metin: "Reddet, resmi ithalat ruhsatı almaya çalış.",
        baseBasariSansi: 60,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 18,
          ahlak: 18,
          maas_carpani: 1.2,
          etiket_ekle: [
            "resmi_ithalatci",
          ],
          mesaj: "Ruhsat çıktı; artık gündüz gözüyle ve yasal olarak ithalat yapıyorsun.",
          detay: "Kâr marjın kaçakçılarınkinden düşük ama her gece kapı çalındığında kalbin ağzına gelmiyor. Bu farkı ancak yaşayan bilir.",
        },
        basarisizSonuc: {
          para: -25,
          un: -8,
          mesaj: "Ruhsat başvurun aylarca sürüncemede kaldı ve reddedildi.",
          detay: "Harçlar ödendi, dosyalar kayboldu. Doğru yoldan gitmek istedin ve sistem sana kapıyı gösterdi.",
        },
      },
      {
        metin: "Kaptanı muhafızlara sat, mallara çök!",
        baseBasariSansi: 45,
        maxAhlak: 35,
        basariliSonuc: {
          para: 70,
          ahlak: -30,
          un: -15,
          etiket_ekle: [
            "sir:kaptan_satan",
          ],
          mesaj: "Kaptanı ihbar ettin, baskın sırasında malların yarısını kendi depona çektin.",
          detay: "Kaptan zindanda çürürken sen zenginleştin. Liman sokaklarında artık arkana bakmadan yürüyemezsin.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Kaptan ihanetini fark etti! Tayfasıyla birlikte seni rıhtımda kıstırıp denize attılar.",
          detay: "Zar zor yüzerek kurtuldun. Hem para gitti hem de limanda ölüm fermanın yazıldı.",
        },
      },
    ],
  },
  {
    id: "pazar_tezgah_kavgasi",
    kategori: "ticaret",
    gerekliEtiketler: [
      "sehir_pazar",
    ],
    gorsel: "🏪",
    baslik: "Tezgâh Kavgası",
    metin: "Pazarın en işlek köşesi boşaldı. Sen ve iki rakibin aynı yeri istiyorsunuz. Pazar ağası 'en çok verene' diyor ama esnaf 'sıra kimdeyse onun' diyor.",
    secenekler: [
      {
        metin: "Ağaya en yüksek teklifi ver, yeri satın al.",
        baseBasariSansi: 70,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          un: -8,
          maas_carpani: 1.3,
          mesaj: "Köşe senin oldu; müşteri akışı üç katına çıktı.",
          detay: "Yer harika, kazanç harika. Komşu esnaf selam vermiyor ama müşteri veriyor ve sonuçta pazarda kalan bu.",
        },
        basarisizSonuc: {
          para: -28,
          un: -18,
          mesaj: "Daha yüksek teklif geldi; hem parayı hem yeri kaybettin.",
          detay: "Ağa senin teklifini rakibine söylemiş, o da bir tık üstüne çıkmış. Kapora geri gelmedi.",
        },
      },
      {
        metin: "Esnaf geleneğine uy, sıranı bekle ve destek topla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 22,
          ahlak: 18,
          para: 8,
          etiket_ekle: [
            "esnaf_destegi",
          ],
          maas_carpani: 1.15,
          mesaj: "Esnaf senin arkanda durdu; ağa geri adım attı ve köşe sana verildi.",
          detay: "Para vermeden, dayanışmayla kazandın. Artık pazarda bir sorunun olduğunda otuz kişi arkanda duruyor.",
        },
        basarisizSonuc: {
          un: 10,
          para: -10,
          ahlak: 15,
          mesaj: "Esnaf seni destekledi ama ağa parayı seçti; köşe rakibine gitti.",
          detay: "Gelenek para karşısında kaybetti. Yeri alamadın ama esnaf arasında 'kuralına göre oynayan adam' oldun.",
        },
      },
      {
        metin: "Ağanın yakasına yapış, onu tehdit et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Ağanın yakasına yapıştın. Arkasındaki korumalar kılıçlarına davrandı. Bir adım daha atarsan pazar yerinde kan çıkacak.",
          geriCekilMetni: "Ellerini çek, sinirle uzaklaş.",
          geriCekilSonucu: {
            un: -5,
            ahlak: -5,
            mesaj: "Son anda geri adım attın. Yeri kaybettin ve ağanın önünde küçük düştün.",
            detay: "Öfkeni kontrol edememek itibarını zedeledi.",
          },
          devamMetni: "Gözdağı ver: 'Bana o yeri vereceksin!'",
          devamSonucu: {
            un: 20,
            para: 10,
            ahlak: -15,
            maas_carpani: 1.2,
            mesaj: "Ağa deliliğinden korktu. Korumalara dur işareti yapıp yeri sana bıraktı.",
            detay: "Zorbalıkla kazandın ama artık pazar ağası senin yeminli düşmanın.",
          },
        },
      },
    ],
  },
  {
    id: "genel_saray_firsati",
    kategori: "siyaset",
    minYas: 18,
    minUn: 30,
    yasakliEtiketler: [
      "saray_gorevlisi",
    ],
    gorsel: "👑",
    baslik: "Sarayın Kapısı",
    metin: "{bolge} sarayında bir görev açıldı. Ünün seni aday listesine soktu. Saray güç ve para demek; aynı zamanda hiç kimsenin temiz kalamadığı bir yer.",
    secenekler: [
      {
        metin: "Göreve talip ol, saray dünyasına gir.",
        baseBasariSansi: 60,
        maliyet: 15,
        basariliSonuc: {
          un: 28,
          para: 30,
          ahlak: -22,
          maas_carpani: 1.3,
          etiket_ekle: [
            "saray_gorevlisi",
          ],
          mesaj: "Saraya kabul edildin; artık kararların alındığı odalardasın.",
          detay: "İlk hafta üç kişinin nasıl bitirildiğini izledin ve hiçbir şey söylemedin. Sessiz kalmak burada hayatta kalmanın ilk kuralı ve sen öğrenmeye başladın bile.",
        },
        basarisizSonuc: {
          para: -18,
          un: -12,
          ahlak: -8,
          mesaj: "Aday listesinde elendin; harcadığın para ve umut boşa gitti.",
          detay: "Görevi, senden daha az yetenekli ama daha iyi akrabaları olan biri aldı. Sarayın ilk dersini kapıdan girmeden öğrendin.",
        },
      },
      {
        metin: "Talip olma, bağımsız itibarınla kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 18,
          un: 8,
          etiket_ekle: [
            "saraydan_uzak",
          ],
          mesaj: "Sarayı reddettin; halk arasında 'satın alınamayan adam' oldun.",
          detay: "Saraya girenler zenginleşti, bazıları da kayboldu. Sen ne birincisi ne ikincisi oldun ve geceleri rahat uyuyorsun.",
        },
        basarisizSonuc: {
          un: -12,
          para: -8,
          ahlak: 12,
          mesaj: "Reddin 'küstahlık' sayıldı; saray çevresi sana sırtını döndü.",
          detay: "Davet reddedilmez diye bir kural varmış. Artık saray bağlantılı hiçbir iş sana gelmiyor ve bu, düşündüğünden fazla iş demek.",
        },
      },
    ],
  },
  {
    id: "saray_entrika",
    kategori: "siyaset",
    gerekliEtiketler: [
      "saray_gorevlisi",
    ],
    gorsel: "🎭",
    baslik: "İki Hizip",
    metin: "Sarayda iki hizip savaşıyor: biri eski soylular, diğeri yeni zenginler. İkisi de senden taraf seçmeni istiyor ve tarafsızlık burada bir seçenek sayılmıyor.",
    secenekler: [
      {
        metin: "Eski soylularla git — köklü ama gerileyen güç.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -12,
          etiket_ekle: [
            "soylu_hizip",
          ],
          mesaj: "Soylular kazandı; sadakatin unvanla ödüllendirildi.",
          detay: "Artık adının önünde bir sıfat var. Eski düzenin son kalesindesin ve bu kalenin duvarları her yıl biraz daha çatlıyor.",
        },
        basarisizSonuc: {
          un: -25,
          para: -22,
          mesaj: "Soylular yenildi; onlarla birlikte sen de tasfiye edildin.",
          detay: "Yeni zenginler saraya girdiğinde ilk iş eski hiziptekileri temizlemek oldu. Bir gecede odan boşaltıldı.",
        },
      },
      {
        metin: "Yeni zenginlerle git — parası çok, köksüz.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 45,
          un: 12,
          ahlak: -18,
          maas_carpani: 1.25,
          etiket_ekle: [
            "yeni_zengin_hizip",
          ],
          mesaj: "Yeni zenginler kazandı; ticari imtiyazlardan büyük pay aldın.",
          detay: "Para akıyor ama eski soylular seni hâlâ 'sonradan görme' sayıyor. Bunu umursamamayı öğreniyorsun, çünkü paranı sayarken vakit kalmıyor.",
        },
        basarisizSonuc: {
          para: -30,
          un: -20,
          mesaj: "Yeni zenginler dağıtıldı; ortaklarınla birlikte sen de düştün.",
          detay: "Yükselen güce oynadın ve o güç yükselemedi. Yatırdığın paranın yanında saraydaki yerini de kaybettin.",
        },
      },
      {
        metin: "İki tarafa da bilgi sat, kendi oyununu kur.",
        baseBasariSansi: 35,
        basariliSonuc: {
          para: 55,
          un: 15,
          ahlak: -30,
          mesaj: "İki hizbi de birbirine karşı besledin; ikisinden de kazandın.",
          detay: "Kimse kimin kime çalıştığını bilmiyor, sen hariç. Bu, sahip olabileceğin en tehlikeli ve en kârlı pozisyon.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "İki hizip de aynı hafta senin oyununu fark etti. Sarayda çift taraflı oynayanlar için tek bir çözüm vardır ve o gece uygulandı.",
        },
      },
    ],
  },
  {
    id: "genel_yatirim",
    kategori: "ticaret",
    minYas: 18,
    gorsel: "💰",
    baslik: "Yatırım Fırsatı",
    metin: "Elindeki birikimi değerlendirmek için üç yol var: yüksek riskli ortaklık, orta riskli mal alımı, ya da düşük getirili ama güvenli toprak/tahvil.",
    secenekler: [
      {
        metin: "Yüksek riskli ortaklığa gir.",
        baseBasariSansi: 45,
        maliyet: 30,
        basariliSonuc: {
          mutluluk: -11,
          para: 70,
          un: 6,
          mesaj: "Ortaklık tuttu; yatırdığın paranın iki katından fazlasını geri aldın.",
          detay: "Riski aldın ve kazandın. Şimdi herkes sana 'nasıl bildin' diye soruyor; sen de bilmediğini söylemiyorsun.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -50,
          un: -10,
          mesaj: "Ortağın kaçtı; yatırdığın her kuruş uçtu.",
          detay: "İmzaladığın sözleşme hiçbir mahkemede işe yaramadı. Birikimini bir imza ve bir güven duygusuyla kaybettin.",
        },
      },
      {
        metin: "Orta riskli mal alımı yap.",
        baseBasariSansi: 65,
        maliyet: 18,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 30,
          mesaj: "Aldığın mallar sezonunda iyi fiyat buldu; sağlam bir kâr çıkardın.",
          detay: "Ne heyecan verici ne felaket. Hesabını yaptın, sabrettin ve karşılığını aldın; ticaretin büyük kısmı bundan ibaret.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "Fiyatlar düştü; malı zararına elden çıkardın.",
          detay: "Piyasayı yanlış okudun. Büyük bir felaket değil ama bu yılki birikimin buharlaştı.",
        },
      },
      {
        metin: "Toprak/tahvil al — düşük getiri, yüksek güvenlik.",
        baseBasariSansi: 85,
        maliyet: 20,
        basariliSonuc: {
          para: 10,
          maas_carpani: 1.15,
          mesaj: "Aldığın toprak/tahvil her yıl düzenli gelir getirmeye başladı.",
          detay: "Zengin etmeyecek ama seni hiçbir zaman aç bırakmayacak bir gelir. Yaşlandıkça bunun değerini daha çok anlayacaksın.",
        },
        basarisizSonuc: {
          para: -18,
          mesaj: "Aldığın toprağın tapusunda sorun çıktı; parayı geri alamadın.",
          detay: "En güvenli yatırım bile belge kontrolü ister. Bunu cebinden ödeyerek öğrendin.",
        },
      },
    ],
  },
  {
    id: "genel_ikilem_aile",
    kategori: "sosyal",
    minYas: 22,
    gorsel: "🏠",
    baslik: "Hasta Ebeveyn",
    metin: "Ailen hastalandı ve bakıma muhtaç. Yanına almak zamanını ve paranı yiyecek; bakıcı tutmak pahalı; hiçbir şey yapmamak ise bir daha telafisi olmayacak bir seçim.",
    secenekler: [
      {
        metin: "Yanına al, kendin bak.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 28,
          un: 10,
          para: -22,
          maas_carpani: 0.9,
          mesaj: "Son yıllarında yanındaydın; giderken elin elindeydi.",
          detay: "İşin aksadı, kazancın düştü ve bunların hiçbiri şu an önemli değil. 'İyi ki' diyebildiğin az sayıda karardan biri bu.",
        },
        basarisizSonuc: {
          ahlak: 20,
          para: -28,
          saglik: -15,
          mesaj: "Bakım yükü seni de hasta etti; yine de sonuna kadar yanındaydın.",
          detay: "Aylarca doğru dürüst uyumadın. Onu kaybettiğinde hem yaslısın hem tükenmiş, hem de borçlusun.",
        },
      },
      {
        metin: "Bakıcı tut, sen işine devam et.",
        baseBasariSansi: 70,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          ahlak: -8,
          mesaj: "İyi bir bakıcı buldun; işlerin aksamadı, ailen de bakımsız kalmadı.",
          detay: "Ayda iki kez ziyarete gidiyorsun. Bakıcı 'sizi soruyor' diyor her seferinde ve sen 'işler yoğun' diyorsun her seferinde.",
        },
        basarisizSonuc: {
          para: -30,
          ahlak: -22,
          un: -12,
          mesaj: "Bakıcı ihmal etti; ailen kötü koşullarda ve herkes bunu senden bildi.",
          detay: "Ziyarete gittiğinde odanın halini gördün. Parayla çözdüğünü sandığın şey, çözülmemiş sadece ertelenmişti.",
        },
      },
    ],
  },
  {
    id: "komik_domuz",
    kategori: "sosyal",
    cag: "Orta Çağ",
    agirlik: 0.35,
    gorsel: "🐷",
    baslik: "Kaçak Domuz",
    metin: "Pazar meydanında kaçan şişman bir domuz ortalığı birbirine kattı. Kasap iyi bir ödül vaat ediyor ve kalabalık eğlenerek izliyor.",
    secenekler: [
      {
        metin: "Domuzu yakalamaya çalış, ödülü kap.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 15,
          un: 12,
          unvan_kazan: "Domuz Fatihi",
          mesaj: "Domuzu son anda yakaladın; pazar halkı seni alkışladı.",
          detay: "Kasap sözünü tuttu ve o gün pazarda herkes senin adını öğrendi. Ünvanın komik ama akılda kalıcı.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Domuzla Yarışıp Kaybeden Adam",
          mesaj: "Domuzun peşinde koşarken bir el arabasına takılıp boynunu kırdın. Şehir seni yıllarca 'domuzla yarışıp kaybeden adam' diye andı.",
        },
      },
      {
        metin: "Kenara çekil, kaçış yolunu kesip usulca yakala.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 8,
          un: 5,
          mesaj: "Sokak ağzını kestin; domuz kucağına düştü.",
          detay: "Koşturmadan, terlemeden hallettin. Kasap ödülü verirken 'akıllı adammışsın' dedi.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Domuz beklediğin sokaktan gelmedi, arkadan çarpıp seni devirdi.",
          detay: "Dizini yardın, pantolonun yırtıldı ve domuzu başkası yakaladı. En azından yaşıyorsun.",
        },
      },
    ],
  },
  {
    id: "komik_icki_bahsi",
    kategori: "sosyal",
    minYas: 18,
    agirlik: 0.3,
    gorsel: "🍺",
    baslik: "Meyhanede Bahis",
    metin: "Sarhoş bir adam meyhanede yüksek sesle bahse giriyor: kim daha çok içerse masadaki tüm parayı alacak. Kalabalık tezahürat yapıyor.",
    secenekler: [
      {
        metin: "Bahsi kabul et, içmeye başla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 25,
          un: 12,
          saglik: -10,
          etiket_ekle: [
            "bagimlilik:alkol_meyil",
          ],
          mesaj: "Rakibini masaya yığdın; meyhanedeki herkes senin şerefine içti.",
          detay: "Ertesi gün öğlene kadar kalkamadın ve başın çatlıyordu. Ancak kadeh kaldırmanın o tatlı hissine bağımlı olmaya başladın.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Balın Şehidi",
          mesaj: "Onuncu testiden sonra masaya yığıldın ve bir daha uyanmadın. Meyhaneciler seni 'balın şehidi' diye anmaya başladı.",
        },
      },
      {
        metin: "Bahsi kabul etme ama bahis tut, kâhyalık yap.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -7,
          para: 18,
          un: -8,
          mesaj: "Bahisleri sen topladın; kim kazanırsa kazansın komisyon senindi.",
          detay: "Meyhane 'korkak' diye bağırdı, sen komisyonu sayarken gülümsedin. Ertesi sabah başı ağrımayan tek kişi sendin.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -10,
          mesaj: "Kaybeden taraf parasını geri istedi; masa devrildi, kavga çıktı.",
          detay: "Bahis kâhyalığı meyhanede kolay iş değilmiş. Hem para gitti hem dudağın patladı.",
        },
      },
    ],
  },
  {
    id: "komik_balon",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    agirlik: 0.3,
    gorsel: "🎈",
    baslik: "Balon Denemesi",
    metin: "Bir mucit, sıcak hava balonuyla halka açık uçuş denemesi yapıyor ve iyi para karşılığı gönüllü arıyor. Kalabalık nefesini tutmuş bekliyor.",
    secenekler: [
      {
        metin: "Gönüllü ol, balona bin.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 25,
          un: 25,
          mesaj: "Balon süzüldü; şehrin üzerinde uçan ilk kişilerden biri oldun.",
          detay: "Yerdeki insanlar karınca gibiydi ve sen o an hiçbir şeyden korkmadın. Gazeteler adını yazdı, mucit ise seninle ortaklık teklif etti.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Kemerini Çözemeyen Balon Gönüllüsü",
          mesaj: "Brülör sepeti tutuşturdu; mucit son anda atladı ama sen kemerini çözemedin. Gazeteler 'gökyüzü hevesi hüsranla bitti' diye yazdı.",
        },
      },
      {
        metin: "Uçma ama mucide yatırım yap.",
        baseBasariSansi: 50,
        maliyet: 15,
        basariliSonuc: {
          mutluluk: -8,
          para: 35,
          un: 5,
          mesaj: "Balon uçtu; ortağı olarak sen de gelirden pay aldın.",
          detay: "Ayakların yerden hiç kesilmedi ama cebin doldu. En iyi yatırım, riski başkasının aldığı yatırımmış.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -18,
          saglik: -10,
          etiket_ekle: [
            "kalici:yanik_izi",
          ],
          mesaj: "Balon kalkmadan alev aldı! Yakından izlediğin için kıvılcımlar yüzüne sıçradı.",
          detay: "Enkazın başında dururken kalıcı bir yanık iziyle kaldın. En azından o sepette sen yoktun.",
        },
      },
    ],
  },
  {
    id: "komik_sirk",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    agirlik: 0.28,
    gorsel: "🦁",
    baslik: "Gezici Sirk",
    metin: "Şehre gelen sirkte, sahibi kalabalığa meydan okuyor: aslan kafesine en çok yaklaşan iyi para kazanacak. Herkes sana bakıyor.",
    secenekler: [
      {
        metin: "Kafese yaklaş, ödülü al.",
        baseBasariSansi: 58,
        basariliSonuc: {
          para: 22,
          un: 15,
          unvan_kazan: "Aslan Terbiyecisi",
          mesaj: "Aslan sakin kaldı; kalabalık cesaretine hayran kaldı.",
          detay: "Terbiyeci sonradan 'o aslanın dişi yok' diye fısıldadı. Kalabalık bunu bilmiyor ve sen de düzeltmeyeceksin.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Kafese Elini Sokan Meraklı Seyirci",
          mesaj: "Terbiyecinin 'elini kafese sokma' uyarısını duymamış gibi davrandın. Sirk o günden sonra 'meraklı seyirci' anısını hiç unutmadı.",
        },
      },
      {
        metin: "Sirkle anlaş, gösteriye bilet sat.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -7,
          para: 18,
          un: 3,
          mesaj: "Bilet satışından komisyon aldın; kimse sana bakmadı ama kimse de seni yemedi.",
          detay: "Sirk sahibi 'sen bu işi biliyorsun' dedi ve şehre her gelişinde seni arıyor. Küçük ama tekrarlayan bir gelir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -12,
          mesaj: "Gösteri yağmurdan iptal oldu; bastığın biletler elinde kaldı.",
          detay: "Sirk ertesi gün şehri terk etti ve senin komisyonunu ödemedi. Aslana yaklaşmaktan daha güvenliydi ama kârlı değildi.",
        },
      },
    ],
  },
  {
    id: "tarihi_fransa_prusya_ilan",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: [
      "Fransa",
    ],
    gerekliUlke: {
      savasta: false,
    },
    agirlik: 0.5,
    gorsel: "🇫🇷",
    baslik: "Prusya'ya Savaş İlanı",
    metin: "{yil} yılı. Prusya ile aranızdaki gerginlik nihayet savaşa dönüştü. Gazeteler 'birkaç ayda Berlin'de olacağız' diye yazıyor, imparator bizzat orduyu yönetecek.",
    secenekler: [
      {
        metin: "Gönüllü yazıl, cepheye git.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 20,
          un: 18,
          saglik: -10,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "İlk çarpışmalarda cesaretinle öne çıktın.",
          detay: "Gazetelerin vaat ettiği kolay zafer henüz görünmüyor ama moralin yüksek.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Prusya topçusu beklediğinden çok daha güçlüydü; ağır yaralandın.",
          detay: "Sahra hastanesinde yatarken subayların endişeli fısıltılarını duyuyorsun.",
        },
      },
      {
        metin: "Orduya tedarik sözleşmesi teklif et.",
        baseBasariSansi: 65,
        maliyet: 15,
        basariliSonuc: {
          para: 30,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Ordu erzak ve çizme siparişini sana verdi; ilk ödeme geldi bile.",
          detay: "Savaş sürdükçe sipariş büyüyor; şimdilik hem güvendesin hem kazançlısın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Sözleşme imzalandı ama devlet ödemeyi savaş bitene erteledi.",
          detay: "Malı teslim ettin, para hazineden değil senin cebinden çıkmış oldu şimdilik.",
        },
      },
      {
        metin: "Sınır dışına, tarafsız bir ülkeye geç.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: -15,
          saglik: 5,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Sınırı sorunsuz geçtin; savaşı gazetelerden takip edeceksin.",
          detay: "Komşuların 'nerede o' diye sorduğunda kimse net bir cevap veremiyor.",
        },
        basarisizSonuc: {
          para: -20,
          un: -20,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Sınır kapatılmıştı; seferberlik kaçağı diye geri çevrildin.",
          detay: "Adın artık bir listede; savaş bitene kadar bu senden bir şeyler alacak.",
        },
      },
    ],
  },
  {
    id: "tarihi_fransa_prusya_yenilgi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: [
      "Fransa",
    ],
    gerekliEtiketler: [
      "fransa_prusya_savasinda",
    ],
    agirlik: 1.8,
    gorsel: "😔",
    baslik: "Sedan'ın Ardından",
    metin: "{yil} yılı. Sedan'da imparator esir düştü, ordu dağıldı. Prusya birlikleri Paris'i kuşattı. Savaş kaybedildi; ekmek karneyle dağıtılıyor, herkesin geliri görünür şekilde eridi.",
    secenekler: [
      {
        metin: "Herkes gibi sıkıntıyı paylaş, dürüstçe geçin.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 15,
          para: -10,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Komşularınla aynı kuyrukta bekleyip aynı ekmeği paylaştın.",
          detay: "Zor bir kış oldu ama kimseye 'o da bizden biri' demedi seni; herkes aynı gemideydi.",
        },
        basarisizSonuc: {
          para: -22,
          saglik: -10,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Karneyle bile yetmedi; o kış aç kaldın.",
          detay: "Kıtlık kimseyi ayırt etmedi; dürüst olman seni doyurmadı.",
        },
      },
      {
        metin: "Kıtlıkta erzak istifle, yüksek fiyata sat.",
        baseBasariSansi: 50,
        maliyet: 15,
        maxAhlak: 45,
        basariliSonuc: {
          para: 65,
          ahlak: -30,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Aç insanlara ekmeği üç katı fiyata sattın; kasan hiç bu kadar dolmamıştı.",
          detay: "Bir kadının ağladığını gördün ve fiyatı yine de düşürmedin. Servetinin bir kısmı o kışın açlığından geliyor.",
        },
        basarisizSonuc: {
          para: -25,
          un: -30,
          saglik: -15,
          olum_sansi: 8,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Aç bir kalabalık depolarını bastı; malın gitti, sen dövülerek kurtuldun.",
          detay: "Mahalle artık senin adını 'kıtlıkta zengin olmaya çalışan adam' diye anıyor ve bu kolay unutulmuyor.",
        },
      },
      {
        metin: "Aileni koru, sessizce bekle.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: -5,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Kapını kapattın, kışı evde geçirdin; zor ama sağ çıktınız.",
          detay: "Dışarıda olanları sonradan komşulardan duydun; içerde kalmak seni yormuştu ama korumuştu.",
        },
        basarisizSonuc: {
          saglik: -18,
          para: -12,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "fransa_prusya_savasinda",
          ],
          mesaj: "Evde kalman seni açlıktan korumadı; kömürün ve erzağın tükendi.",
          detay: "Bazen beklemek de bir bedel ödetiyor; sadece sessizce ödüyorsun.",
        },
      },
    ],
  },
  {
    id: "tarihi_kirim_ilan_muttefik",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: [
      "Osmanlı",
      "İngiltere",
    ],
    gerekliUlke: {
      savasta: false,
    },
    agirlik: 0.5,
    gorsel: "⚓",
    baslik: "Kırım'a Doğru",
    metin: "{yil} yılı. Rusya'nın yayılmacılığına karşı müttefiklerinizle birlikte savaşa girdiniz. Büyük bir donanma Kırım'a doğru yola çıkıyor.",
    secenekler: [
      {
        metin: "Orduya/donanmaya katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 22,
          un: 20,
          saglik: -12,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda",
          ],
          mesaj: "Kuşatma hattında görev aldın; zorlu ama gururlandırıcı bir hizmetti.",
          detay: "Sivastopol surları hâlâ dimdik ama moraliniz yüksek; kazanacağınıza inanıyorsunuz.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 12,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda",
          ],
          mesaj: "Siperlerde kolera yayıldı; sen de ateşler içinde kaldın.",
          detay: "Kurşundan çok hastalık öldürüyor bu savaşta; hekimler yetişemiyor.",
        },
      },
      {
        metin: "Donanmaya erzak ve kömür tedarik et.",
        baseBasariSansi: 68,
        maliyet: 15,
        basariliSonuc: {
          para: 32,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda",
          ],
          mesaj: "Sözleşmen onaylandı; savaş sürdükçe kâr da sürüyor.",
          detay: "Limanda her hafta yeni bir sipariş; savaş bazıları için iyi bir iştir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -12,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda",
          ],
          mesaj: "Rakip tedarikçi daha düşük fiyat verdi; sözleşmeyi kaybettin.",
          detay: "Hazırlık masrafların boşa gitti; bu savaştan bu sefer sen kazanmadın.",
        },
      },
      {
        metin: "İşine devam et, savaştan uzak dur.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 8,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda",
          ],
          mesaj: "Günlük hayatına devam ettin; savaş haberleri gazetelerden geliyor.",
          detay: "Herkes cepheden konuşurken sen tezgâhının başındasın; bu da bir seçim.",
        },
        basarisizSonuc: {
          para: -10,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda",
          ],
          mesaj: "Savaş telaşı ticareti de vurdu; müşteriler azaldı.",
          detay: "Herkesin aklı cephede; senin işin de bundan payını aldı.",
        },
      },
    ],
  },
  {
    id: "tarihi_kirim_zafer",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: [
      "Osmanlı",
      "İngiltere",
    ],
    gerekliEtiketler: [
      "kirim_savasinda",
    ],
    agirlik: 1.8,
    gorsel: "🎉",
    baslik: "Sivastopol Düştü",
    metin: "{yil} yılı. Sivastopol düştü, Rusya barış istedi. Zafer haberi ulaştığında sokaklar bayram yerine döndü. Yeni ticaret yolları açıldı, savaş tazminatı ekonomiye can verdi.",
    secenekler: [
      {
        metin: "Zaferin getirdiği yeni ticaret fırsatlarına atıl.",
        baseBasariSansi: 55,
        maliyet: 18,
        basariliSonuc: {
          para: 50,
          un: 15,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "iyi",
          },
          maas_carpani: 1.15,
          mesaj: "Açılan yeni pazarlara ilk giren sen oldun; kazancın kalıcı olarak arttı.",
          detay: "Zafer sonrası coşku hâlâ sürüyor ve bu coşkuyu paraya çevirdin.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "iyi",
          },
          mesaj: "Herkes aynı fırsata koştu; rekabet fiyatları eritip seni zarara soktu.",
          detay: "Zafer herkese aynı hissi verdi ve herkes aynı kapıya koştu; kalabalıkta kayboldun.",
        },
      },
      {
        metin: "Zafer kutlamalarına katıl, bağlantı kur.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 20,
          para: 10,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "iyi",
          },
          mesaj: "Kutlamalarda tanıştığın isimler sana yeni kapılar açtı.",
          detay: "Zafer sarhoşluğu herkesi cömert yapıyor; sen de bundan payını aldın.",
        },
        basarisizSonuc: {
          para: -8,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "iyi",
          },
          mesaj: "Kutlamalar pahalıya patladı, beklediğin bağlantılar çıkmadı.",
          detay: "Herkes kadeh kaldırdı, kimse iş konuşmadı; sadece hesap sana kaldı.",
        },
      },
    ],
  },
  {
    id: "tarihi_kirim_ilan_rusya",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: [
      "Rusya",
    ],
    gerekliUlke: {
      savasta: false,
    },
    agirlik: 0.5,
    gorsel: "🇷🇺",
    baslik: "Müttefiklere Karşı",
    metin: "{yil} yılı. Osmanlı, İngiltere ve Fransa'nın oluşturduğu ittifak Kırım'a asker çıkardı. Çar tüm halktan fedakârlık istiyor.",
    secenekler: [
      {
        metin: "Orduya katıl, Sivastopol'u savun.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 22,
          para: 15,
          saglik: -15,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Surlarda direnişe katkın oldu; komutanlar seni örnek gösterdi.",
          detay: "Kuşatma ağırlaşıyor ama şimdilik surlar ayakta ve sen de öylesin.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Müttefik topçusu hattı dövdü; ağır yaralı olarak geri çekildin.",
          detay: "Modern toplara karşı eski taktiklerin yetmediğini bedeninle öğrendin.",
        },
      },
      {
        metin: "Orduya at ve erzak tedarik et.",
        baseBasariSansi: 65,
        maliyet: 15,
        basariliSonuc: {
          para: 25,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Tedarik hattında görev aldın; şimdilik iyi para kazanıyorsun.",
          detay: "Cepheye giden her kervan yarısı geri dönmüyor ama senin işin cephenin gerisinde.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Ödemeler savaş bitene ertelendi; masrafın cebinden çıktı.",
          detay: "Hazine boş; sözleşme kağıt üstünde iyi ama nakit akışı sıfır.",
        },
      },
      {
        metin: "Taşraya çekil, savaştan uzak dur.",
        baseBasariSansi: 78,
        basariliSonuc: {
          saglik: 5,
          un: -12,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Taşrada sakin kaldın; savaşın gürültüsü sana uzaktan geldi.",
          detay: "Çar'ın çağrısına kulak asmayanlardan biri oldun ve bunu kimseye anlatmadın.",
        },
        basarisizSonuc: {
          para: -15,
          un: -18,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Seferberlikten kaçtığın fark edildi; köyün diğer ailelerinden dışlandın.",
          detay: "Savaşa gitmemek bazı yerlerde bir seçim değil, bir suç sayılıyor.",
        },
      },
    ],
  },
  {
    id: "tarihi_kirim_yenilgi_rusya",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: [
      "Rusya",
    ],
    gerekliEtiketler: [
      "kirim_savasinda_rusya",
    ],
    agirlik: 1.8,
    gorsel: "😔",
    baslik: "Sivastopol'un Düşüşü",
    metin: "{yil} yılı. Sivastopol bir yıl süren kuşatmanın ardından düştü. Çar barış istemek zorunda kaldı. Yenilginin faturası ağır: vergiler arttı, tahıl fiyatları katlandı.",
    secenekler: [
      {
        metin: "Sıkıntıyı halkla paylaş, dürüstçe geçin.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 15,
          para: -12,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Herkes gibi kemer sıktın; kimse senin ayrıcalıklı olduğunu düşünmedi.",
          detay: "Yenilgi acı ama paylaşılan bir acı; en azından yalnız değilsin.",
        },
        basarisizSonuc: {
          para: -22,
          saglik: -10,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Vergi artışı beklediğinden ağır oldu; kışı zorlukla atlattın.",
          detay: "Yenilginin faturası önce en yoksullara kesiliyor ve sen de o listedeydin.",
        },
      },
      {
        metin: "Buğday stoklayıp krizde yüksek fiyata sat.",
        baseBasariSansi: 48,
        maliyet: 15,
        basariliSonuc: {
          para: 60,
          ahlak: -28,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Aç köylülere buğdayı üç katı fiyata sattın; kasan hiç bu kadar dolmamıştı.",
          detay: "Bazı geceler o yüzlerin hatırına uykun kaçıyor; kimseye söylemiyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          un: -28,
          saglik: -18,
          olum_sansi: 8,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "kotu",
          },
          etiket_sil: [
            "kirim_savasinda_rusya",
          ],
          mesaj: "Öfkeli bir grup deponu bastı; malın yağmalandı, sen dövüldün.",
          detay: "Yenilginin acısını çıkaracak birine ihtiyaçları vardı ve o kişi sen oldun.",
        },
      },
    ],
  },
  {
    id: "zincir_asker_baslangic",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    maxYas: 22,
    yasakliEtiketler: [
      "asker_hizmette",
      "asker_hizmet_bitti",
    ],
    agirlik: 1.6,
    gorsel: "🪖",
    baslik: "Alaya Katılış",
    metin: "Alayına ilk katıldığın gün. Kışlanın kapısında üstünü değiştirip sıraya girdin; artık sivil değil, askersin. Çavuş yeni gelenlere soğuk gözlerle bakıyor.",
    secenekler: [
      {
        metin: "Disiplinli görün, kurallara harfiyen uy.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 10,
          ahlak: 5,
          etiket_ekle: [
            "asker_hizmette",
          ],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "Çavuş seni beğendi; 'bu iyi asker olur' dediğini duydun.",
          detay: "İlk gün iyi geçti. Kışlanın ritmine daha ilk haftada ayak uydurdun.",
        },
        basarisizSonuc: {
          un: -8,
          saglik: -5,
          etiket_ekle: [
            "asker_hizmette",
          ],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "İlk talimde beceriksizce göründün; çavuş herkesin önünde seni azarladı.",
          detay: "Kötü bir başlangıç oldu ama artık geri dönüş yok; alaydasın.",
        },
      },
      {
        metin: "Kendi tarzınca uyum sağla, fazla zorlama.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 5,
          etiket_ekle: [
            "asker_hizmette",
          ],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "Ne öne çıktın ne geride kaldın; sessizce sıraya karıştın.",
          detay: "Kimse adını henüz bilmiyor. Bu bazen kışlada en güvenli yerdir.",
        },
        basarisizSonuc: {
          un: -10,
          etiket_ekle: [
            "asker_hizmette",
          ],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "Gevşekliğin fark edildi; 'gözüm üstünde' dediler.",
          detay: "İlk günden takip listesine girmek iyiye işaret değil.",
        },
      },
    ],
  },
  {
    id: "zincir_asker_pusu",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "asker_hizmette",
    ],
    gorsel: "⚔️",
    baslik: "İlk Pusuya Düşüş",
    metin: "Hizmetinin ilk yılında, rutin bir devriye sırasında birliğin pusuya düştü. Kaos içinde, ne yapacağına saniyeler içinde karar vermen gerekiyor.",
    secenekler: [
      {
        metin: "Öne atıl, ateşe karşı ateşle karşılık ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 22,
          para: 10,
          saglik: -10,
          mesaj: "Saldırıyı püskürtmeye yardım ettin; komutan adını not etti.",
          detay: "O gün hayatta kalan herkes birbirine farklı bakıyor artık; birlikte bir şey atlattınız.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "Bir kurşun omzunu sıyırdı; kanlar içinde geri sürüklendin.",
          detay: "İlk yılında ilk yaran. Hekim 'şanslısın' dedi, sen pek öyle hissetmedin.",
        },
      },
      {
        metin: "Geri çekilmeye öncülük et, birliği topla.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: -5,
          un: 8,
          mesaj: "Düzenli bir geri çekilme sağladın; kimse kaybedilmedi.",
          detay: "Parlak bir zafer değildi ama herkesin sağ dönmesi de bir başarıydı.",
        },
        basarisizSonuc: {
          un: -15,
          saglik: -12,
          mesaj: "Geri çekilme dağıldı; birkaç asker kayboldu, suçu sana yıktılar.",
          detay: "İlk sınavında panik ettiğini düşünenler oldu; bunu unutturmak zaman alacak.",
        },
      },
    ],
  },
  {
    id: "zincir_asker_terhis",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "asker_hizmette",
    ],
    yasakliEtiketler: [
      "asker_hizmet_bitti",
    ],
    agirlik: 2.2,
    gorsel: "🏅",
    baslik: "Hizmet Yıllarının Sonu",
    metin: "Yıllar boyu sürdürdüğün hizmetin ardından komutan seni çağırdı: 'Vazifen doldu evlat. Artık kendi yoluna karar verebilirsin.'",
    secenekler: [
      {
        metin: "Orduda kal, mesleki asker ol.",
        baseBasariSansi: 78,
        basariliSonuc: {
          un: 20,
          para: 20,
          maas_carpani: 1.2,
          etiket_ekle: [
            "kariyer_asker",
          ],
          mesaj: "Uzun hizmet dönemine imza attın; artık kıdemli bir askersin.",
          detay: "Geçen yıllar boyunca alayın sana bir aile gibi olduğunu fark ettin. Sivil hayat çoktan yabancılaştı ama bu senin seçtiğin yol.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 10,
          un: 8,
          saglik: -10,
          mesaj: "Kalmayı seçtin ama yeni komutan seninle eskisi kadar ilgilenmiyor.",
          detay: "Yıllar geçmiş, sen hâlâ aynı rütbedesin. Bazı kariyerler böyle sessizce durur.",
        },
      },
      {
        metin: "Terhis ol, sivil hayata dön.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 35,
          ahlak: 8,
          etiket_ekle: [
            "asker_hizmet_bitti",
          ],
          etiket_sil: [
            "asker_hizmette",
          ],
          mesaj: "Emekli ikramiyeni alıp sivil hayata döndün; yıllar sonra ilk kez kendi kararlarını veriyorsun.",
          detay: "Şehir hizmete girdiğin günden beri çok değişmiş. Yürürken hâlâ adım sayıyorsun, uykuların hâlâ tetikte. Ama artık kimse sana emir vermiyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 15,
          un: -8,
          saglik: -8,
          etiket_ekle: [
            "asker_hizmet_bitti",
          ],
          etiket_sil: [
            "asker_hizmette",
          ],
          mesaj: "Terhis kağıtların gecikti, ikramiyenin bir kısmı bürokraside kayboldu.",
          detay: "Yıllarca hizmet ettin ve karşılığında beklediğinin azını aldın. Yine de artık özgürsün; bunun bir bedeli olduğunu şimdi anlıyorsun.",
        },
      },
    ],
  },
  {
    id: "zincir_tuccar_teklif",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    yasakliEtiketler: [
      "buyuk_siparis_surecinde",
      "buyuk_siparis_bitti",
    ],
    agirlik: 1.4,
    gorsel: "📜",
    baslik: "Büyük Sipariş Teklifi",
    metin: "Uzak bir şehirden gelen bir tüccar, yıllarca sürecek devasa bir tedarik anlaşması öneriyor. Kabul edersen sermayenin çoğunu bu tek ilişkiye bağlamış olacaksın.",
    secenekler: [
      {
        metin: "Anlaşmayı imzala, büyük oyuna gir.",
        baseBasariSansi: 70,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 10,
          etiket_ekle: [
            "buyuk_siparis_surecinde",
          ],
          zorunlu_sonraki: "zincir_tuccar_kervan_sorunu",
          mesaj: "İmzalar atıldı; artık yıllarca sürecek bir ortaklığın içindesin.",
          detay: "Sermayenin çoğu bu anlaşmaya bağlı. Ya büyük kazanacaksın ya da her şeyi kaybedeceksin.",
        },
        basarisizSonuc: {
          para: -25,
          etiket_ekle: [
            "buyuk_siparis_surecinde",
          ],
          zorunlu_sonraki: "zincir_tuccar_kervan_sorunu",
          mesaj: "Sözleşme şartları düşündüğünden ağır çıktı ama artık geri dönüşü yok.",
          detay: "İlk masraflar bile beklediğinden fazlaydı; bu işe girdiğine şimdiden şüpheyle bakıyorsun.",
        },
      },
      {
        metin: "Teklifi reddet, mevcut işine odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 10,
          mesaj: "Riske girmedin; işlerin her zamanki gibi sakin devam etti.",
          detay: "Belki büyük bir fırsatı kaçırdın, belki de büyük bir felaketten kurtuldun; asla öğrenemeyeceksin.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Reddettiğini duyan diğer tüccar, teklifi rakibine götürdü.",
          detay: "Rakibin bu anlaşmayla büyüdüğünü duymak hoş değil ama en azından riske girmedin.",
        },
      },
    ],
  },
  {
    id: "zincir_tuccar_kervan_sorunu",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "buyuk_siparis_surecinde",
    ],
    gorsel: "🐫",
    baslik: "Yolda Sorun",
    metin: "Büyük siparişin ilk yükü yolda; habercisi soluk soluğa geldi: 'Kervan bir fırtınaya ve haydut baskınına yakalandı, ortağınız sizden acil karar bekliyor.'",
    secenekler: [
      {
        metin: "Ek para gönderip silahlı bir kurtarma seferi düzenle.",
        baseBasariSansi: 60,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 10,
          mesaj: "Kurtarma seferi işe yaradı; yükün çoğu ve adamların güvenle kurtarıldı.",
          detay: "Ortağın senin kararlılığını gördü; anlaşma bir sonraki aşamaya geçebilir hale geldi.",
        },
        basarisizSonuc: {
          para: -35,
          mesaj: "Ek harcamana rağmen yük büyük ölçüde kayboldu.",
          detay: "Hem harcadın hem de kaybettin; anlaşmanın geleceği artık daha belirsiz.",
        },
      },
      {
        metin: "Kayıpları kabullen, sözleşmeyi olduğu gibi sürdür.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: -10,
          mesaj: "Ortağın anlayışla karşıladı; sözleşme küçük bir gecikmeyle devam ediyor.",
          detay: "Bu tür kayıplar ticaretin doğasında var; ortağın bunu biliyor ve sabırlı davrandı.",
        },
        basarisizSonuc: {
          para: -18,
          un: -10,
          mesaj: "Ortağın senin bu umursamazlığına içerledi; ilişki gerginleşti.",
          detay: "Anlaşma devam ediyor ama artık eskisi kadar sıcak değil.",
        },
      },
      {
        metin: "Zararı bahane et ve bağlı olduğun loncadan sahte sigorta parası çek.",
        baseBasariSansi: 40,
        maxAhlak: 35,
        basariliSonuc: {
          para: 50,
          ahlak: -20,
          etiket_ekle: [
            "sir:sigorta_dolandiricisi",
          ],
          mesaj: "Malların tamamı yanmış gibi evrak düzenledin. Lonca sana devasa bir tazminat ödedi.",
          detay: "Hem yükün bir kısmı sende kaldı hem de haksız bir servet kazandın.",
        },
        basarisizSonuc: {
          para: -40,
          un: -30,
          ahlak: -15,
          mesaj: "Lonca müfettişleri sahtekarlığı anında yakaladı! Ağır para cezası yedin ve itibarın lekelendi.",
        },
      },
    ],
  },
  {
    id: "zincir_din_gorev_teklifi",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    yasakliEtiketler: [
      "kutsal_gorevde",
      "kutsal_gorev_bitti",
    ],
    agirlik: 1.4,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Uzak Bir Görev",
    metin: "Üst makam, uzak bir topraktaki küçük bir cemaate yıllarca sürecek bir görev için seni öneriyor. Kabul edersen buradaki hayatını geride bırakacaksın.",
    secenekler: [
      {
        metin: "Görevi kabul et, yola çık.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          etiket_ekle: [
            "kutsal_gorevde",
          ],
          zorunlu_sonraki: "zincir_din_yolda_sinav",
          mesaj: "Eşyalarını topladın, cemaatinle vedalaştın ve yola çıktın.",
          detay: "Bu topraklardan ayrılmak sandığından zor oldu ama önünde uzun bir yol var.",
        },
        basarisizSonuc: {
          para: -10,
          etiket_ekle: [
            "kutsal_gorevde",
          ],
          zorunlu_sonraki: "zincir_din_yolda_sinav",
          mesaj: "Yola çıkış hazırlıkların sandığından pahalıya patladı.",
          detay: "Yine de kararını verdin; artık bu görevdesin.",
        },
      },
      {
        metin: "Görevi reddet, cemaatinle kal.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 8,
          mesaj: "Cemaatin kararına sevindi; onları terk etmemiş oldun.",
          detay: "Belki büyük bir tecrübeyi kaçırdın ama burada seni bekleyenler var.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Üst makam reddini 'hırs eksikliği' diye kayda geçti.",
          detay: "Cemaatin memnun ama üst makamlar seni bir daha büyük görevler için düşünmeyebilir.",
        },
      },
    ],
  },
  {
    id: "zincir_din_gorev_donus",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "kutsal_gorevde",
    ],
    yasakliEtiketler: [
      "kutsal_gorev_bitti",
    ],
    agirlik: 2.1,
    gorsel: "🏠",
    sureYilMin: 2,
    sureYilMax: 4,
    baslik: "Dönüş Zamanı",
    metin: "Yıllarca sürdürdüğün uzak görevin ardından üst makam seni geri çağırdı. Görev tamamlandı; şimdi geride bıraktığın hayata dönme vakti.",
    secenekler: [
      {
        metin: "Eski cemaatine dön.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 25,
          ahlak: 12,
          etiket_ekle: [
            "kutsal_gorev_bitti",
          ],
          etiket_sil: [
            "kutsal_gorevde",
          ],
          mesaj: "Yıllar sonra döndüğünde cemaatin seni bir kahraman gibi karşıladı.",
          detay: "Uzak topraklarda gördüklerin seni değiştirmiş. Eski cemaatin aynı ama sen artık eskisi gibi değilsin; bu hem bir kazanç hem bir yalnızlık.",
        },
        basarisizSonuc: {
          un: 10,
          ahlak: 8,
          etiket_ekle: [
            "kutsal_gorev_bitti",
          ],
          etiket_sil: [
            "kutsal_gorevde",
          ],
          mesaj: "Döndün ama cemaatin çoğu, yerine gelen yeni görevliye alışmış.",
          detay: "Yıllarca uzakta kalmanın bedeli bu: geri döndüğünde yerin bir başkasınındı artık.",
        },
      },
      {
        metin: "Görev yaptığın topraklarda kal, yeni bir cemaat kur.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 20,
          un: 18,
          ahlak: 10,
          etiket_ekle: [
            "kutsal_gorev_bitti",
          ],
          etiket_sil: [
            "kutsal_gorevde",
          ],
          mesaj: "O topraklarda kalıp kendi cemaatini kurdun; yıllar içinde küçük bir topluluk oluştu.",
          detay: "Eski hayatın artık uzak bir anı. Burada, sıfırdan kurduğun bir şey var ve bu sana ait.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          ahlak: 8,
          etiket_ekle: [
            "kutsal_gorev_bitti",
          ],
          etiket_sil: [
            "kutsal_gorevde",
          ],
          mesaj: "Kalma kararın zor geldi; yeterli destek bulamayınca küçük bir cemaatle idare ettin.",
          detay: "Kolay olmadı ama geride hiçbir şey bırakmadığını da biliyorsun; her şeyi baştan kurman gerekiyor.",
        },
      },
    ],
  },
  {
    id: "genel_pazar_yeri_soytarisi",
    kategori: "sosyal",
    agirlik: 0.3,
    gorsel: "🎪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gezici Soytarı",
    metin: "Pazar meydanına gelen maskeli bir soytarı, seni kalabalığın arasından gösterisine 'gönüllü' olarak çekmeye çalışıyor.",
    secenekler: [
      {
        metin: "Oyuna katıl, elinden geleni yap.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı",
        },
        onTepki: {
          metin: "Meydana çıktığın an soytarı seni itip düşürdü ve kıyafetinle dalga geçmeye başladı. Kalabalık sana gülüyor. Bu bir oyun değil, bir aşağılama şovu!",
          geriCekilMetni: "Öfkene hakim ol, sessizce kalabalığa karışıp sıvış.",
          geriCekilSonucu: {
            un: -15,
            mutluluk: -10,
            mesaj: "Şakayı kaldıramayan korkak biri olarak anıldın. Günlerce bu anı düşündün.",
            detay: "Bazen sıvışmak en büyük acıdır.",
          },
          devamMetni: "Maskesini yüzünden çekip al ve ona kendi şakanı yap!",
          devamSonucu: {
            un: 25,
            ahlak: 10,
            mesaj: "Maskeyi çektiğinde adamın aslında aranan bir dolandırıcı olduğu ortaya çıktı! Meydanda kahraman oldun.",
            detay: "Alay edilmeyeceksin, sen alay edeceksin!",
          },
        },
      },
      {
        metin: "Nazikçe reddet, kalabalıktan çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Reddin kabul edildi; soytarı başka birini seçti.",
          detay: "Utanç riskini almadın; hayatın sakin devam etti.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Soytarı reddini de espriye çevirip senle dalga geçti.",
          detay: "Kaçmaya çalışmak bazen daha da dikkat çekiyor.",
        },
      },
    ],
  },
  {
    id: "genel_gokyuzunde_isik",
    kategori: "din",
    agirlik: 0.2,
    gorsel: "☄️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gökyüzündeki Işık",
    metin: "Gece gökyüzünde parlak, kuyruklu bir ışık belirdi. Halk arasında 'kıyamet alameti' diye söylentiler yayılıyor, bazıları panik içinde.",
    secenekler: [
      {
        metin: "Halkı sakinleştirmeye çalış.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 14,
          ahlak: 12,
          mesaj: "Sakin tavrın paniği yatıştırdı; halk sana güvendi.",
          detay: "Işık birkaç gün sonra kayboldu ve herkes günlük hayatına döndü; ama seni hatırladılar.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Bazıları seni dinlemedi, panik kısa süre daha sürdü.",
          detay: "Korku bazen mantıktan daha güçlü oluyor.",
        },
      },
      {
        metin: "Sen de söylentilere kapıl, hazırlık yap.",
        baseBasariSansi: 70,
        maliyet: 10,
        basariliSonuc: {
          un: 4,
          para: -6,
          mesaj: "Stokladığın erzak işe yaramadı ama en azından hazırlıklıydın.",
          detay: "Işık kayboldu, hayat devam etti; biraz mahcup oldun ama zararsız.",
        },
        basarisizSonuc: {
          para: -15,
          un: -12,
          mesaj: "Panik alışverişin komşular arasında dalga konusu oldu.",
          detay: "'Kıyamet bekleyen adam' lakabı bir süre peşini bırakmadı.",
        },
      },
    ],
  },
  {
    id: "genel_hastalikli_kis",
    kategori: "saglik",
    agirlik: 0.6,
    gorsel: "❄️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Sert Bir Kış",
    metin: "Bu yılki kış alışılmadık derecede sert geçiyor; odun ve erzak fiyatları fırladı, birçok komşun hastalandı.",
    secenekler: [
      {
        metin: "Ekstra odun ve erzak stokla.",
        baseBasariSansi: 80,
        maliyet: 12,
        basariliSonuc: {
          saglik: 15,
          para: -12,
          mesaj: "Kışı sıcak ve tok geçirdin; hastalanmadan çıktın.",
          detay: "Komşuların hastalanırken sen hazırlıklıydın.",
        },
        basarisizSonuc: {
          saglik: 5,
          para: -18,
          mesaj: "Stokladığın kadarıyla idare ettin ama fiyatlar beklediğinden yüksekti.",
          detay: "Kışı atlattın ama cüzdanın hafifledi.",
        },
      },
      {
        metin: "İdareli geçin, tasarruf et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          mesaj: "Tasarruflu davrandın ve kışı ucuza atlattın.",
          detay: "Üşüdün ama dayandın; bazen az yetiyor.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 5,
          mesaj: "Soğuk seni hasta etti; zatürreye çevirdi.",
          detay: "Tasarruf ederken sağlığından tasarruf etmiş oldun.",
        },
      },
    ],
  },
  {
    id: "genel_kisisel_hastalik",
    kategori: "saglik",
    minYas: 18,
    agirlik: 1.1,
    gorsel: "🤒",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ateşler İçinde",
    metin: "Birkaç gündür ateşin düşmüyor, halin gittikçe kötüleşiyor. Bir karar vermen gerekiyor — hastalık kendi kendine geçmeyecek gibi.",
    secenekler: [
      {
        metin: "İlaç Al (25 Altın), en iyi hekime git.",
        baseBasariSansi: 90,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          saglik: 20,
          mesaj: "Hekimin verdiği ilaçlar hızla işe yaradı; birkaç gün içinde ayaktasın.",
          detay: "Para gitti ama sağlığın geri geldi; iyi bir takas.",
        },
        basarisizSonuc: {
          para: -25,
          saglik: 5,
          mesaj: "İlaçlar yardımcı oldu ama iyileşme sandığından yavaş sürdü.",
          detay: "Her tedavi mucize gibi çalışmıyor.",
        },
      },
      {
        metin: "Kocakarı İlacı İç (5 Altın), şansına güven.",
        baseBasariSansi: 55,
        maliyet: 5,
        basariliSonuc: {
          para: -5,
          saglik: 12,
          mesaj: "Garip kokulu karışım işe yaradı! Birkaç gün içinde kendini toparladın.",
          detay: "Bazen köy tarifleri gerçekten işe yarıyor.",
        },
        basarisizSonuc: {
          para: -5,
          saglik: -10,
          mesaj: "Karışım hiç işe yaramadı, hatta durumun biraz daha kötüleşti.",
          detay: "Ucuz çözümler bazen daha pahalıya patlıyor.",
        },
      },
      {
        metin: "Hiçbir şey yapma, dinlenmeye çalış.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Bedenin kendi başına toparlandı; şanslıydın.",
          detay: "Bazen vücut kendi yolunu buluyor.",
        },
        basarisizSonuc: {
          saglik: -15,
          olum_sansi: 5,
          mesaj: "Hastalık tedavisiz ilerledi, halin iyice ağırlaştı.",
          detay: "Bazı hastalıklar dinlenmekle geçmiyor.",
        },
      },
    ],
  },
  {
    id: "genel_esrarengiz_mektup",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    agirlik: 0.3,
    gorsel: "✉️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "İmzasız Mektup",
    metin: "Kapının altından imzasız bir mektup bulundu. Biri, eşinin/ortağının seni aldattığını iddia ediyor ama hiçbir kanıt sunmuyor.",
    secenekler: [
      {
        metin: "İddiayı araştır.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Araştırman iddianın asılsız olduğunu, kıskanç birinin oyunu olduğunu ortaya çıkardı.",
          detay: "Huzurun geri geldi ama o mektubu yazanın kim olduğunu hep merak edeceksin.",
        },
        basarisizSonuc: {
          ahlak: -15,
          saglik: -10,
          mesaj: "Araştırman gereksiz kavgalara ve güvensizliğe yol açtı.",
          detay: "Bazen sormamak, sormaktan daha iyi sonuç veriyor.",
        },
      },
      {
        metin: "Mektubu yırt at, önemseme.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Mektubu unuttun, hayatın normal akışına devam etti.",
          detay: "Bazı taşları yerinden oynatmamak daha iyidir.",
        },
        basarisizSonuc: {
          ahlak: -8,
          mutluluk: -5,
          mesaj: "Mektubu görmezden gelsen de aklından hiç çıkmadı; güvensizlik içine yerleşti.",
          detay: "Görmezden gelmek her zaman unutmak anlamına gelmiyor.",
        },
      },
    ],
  },
  {
    id: "genel_zar_oyunu_borcu",
    kategori: "sosyal",
    agirlik: 0.3,
    gorsel: "🎲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ödenmeyen Kumar Borcu",
    metin: "Bir tanıdığın sana kumar borcunu ödemedi ve şimdi seni görünce yolunu değiştiriyor. Herkesin önünde parasını isteyebilirsin ya da sessizce unutabilirsin.",
    secenekler: [
      {
        metin: "Herkesin önünde parasını iste.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -8,
          un: -3,
          para: 20,
          mesaj: "Utanan adam borcunu hemen ödedi.",
          detay: "Bir daha kimse senden borç para istemedi ama parayı da almış oldun.",
        },
        basarisizSonuc: {
          un: -12,
          saglik: -5,
          mesaj: "Adam parası olmadığını söyleyip olay çıkardı; sen küçük düştün.",
          detay: "Israrın seni de gülünç duruma soktu.",
        },
      },
      {
        metin: "Sessizce unut, ilişkiyi bozma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Parayı unuttun; dostluğunuz bozulmadı.",
          detay: "Küçük bir kayıp, büyük bir huzursuzluktan iyidir dedin kendine.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Adam borcunu unuttuğunu görünce senden bir borç daha istedi.",
          detay: "İyi niyetin bazen kötüye kullanılıyor.",
        },
      },
    ],
  },
  {
    id: "genel_meydan_okuyan_ressam",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    agirlik: 0.5,
    gorsel: "🎨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sokak Ressamı",
    metin: "Meydanda oturan bir ressam, portresini yapmak istiyor — ücretsiz, sadece 'ilginç bir yüzün var' diyor. Ortaya nasıl bir tablo çıkacağını bilmiyorsun.",
    secenekler: [
      {
        metin: "Poz ver.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 15,
          mesaj: "Tablo şaşırtıcı derecede güzel çıktı; ressam onu sergiye koydu ve adın da geçti.",
          detay: "Şehirde 'tablodaki adam' diye tanınmak tuhaf ama hoş bir his.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Tablo pek de iltifat sayılmayacak bir şekilde çıktı; herkes güldü.",
          detay: "Sanatçının 'ilginç yüz' dediği şey pek de iltifat değilmiş.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Reddettin, yoluna devam ettin.",
          detay: "Belki ilginç bir anıyı kaçırdın ama hiçbir riske girmedin.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Ressam ısrar edip seni uzun süre meydanda oyaladı; günün geri kalanı sinirlerin bozuk geçti.",
          detay: "Basit bir 'hayır' bazen sandığından uzun sürüyor.",
        },
      },
    ],
  },
  {
    id: "genel_fotografhane_reklami",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    agirlik: 0.5,
    gorsel: "📸",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Reklam Fotoğrafı",
    metin: "Yeni açılan bir dükkân, 'sıradan ama güvenilir görünümlü' birini reklam fotoğrafı için arıyor. Sen seçildin ama fotoğrafın dükkânın vitrinine asılacak.",
    secenekler: [
      {
        metin: "Teklifi kabul et, poz ver.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: -6,
          para: 15,
          un: 6,
          mesaj: "Fotoğrafın vitrine asıldı; tanıdıkların seni görünce gülüyor.",
          detay: "Küçük bir ek gelir ve mahallede eğlenceli bir üne kavuştun.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -10,
          mesaj: "Fotoğraf makinesi parlarken gözlerini kapattın; komik bir kare vitrine asıldı.",
          detay: "Herkes o kareyi görüp gülüyor; en azından paranı aldın.",
        },
      },
      {
        metin: "Teklifi reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Reddettin, sıradan hayatına devam ettin.",
          detay: "Vitrinlerde görünmek herkese göre değil.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Dükkân sahibi ısrarcıydı, ondan kurtulmak için küçük bir şey almak zorunda kaldın.",
          detay: "Bazen hayır demek bile bir bedel getiriyor.",
        },
      },
    ],
  },
  {
    id: "genel_kurtlar_saldirisi",
    kategori: "saglik",
    cag: "Orta Çağ",
    gorsel: "🐺",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kurt Sürüsü",
    metin: "Sert geçen kış nedeniyle aç kalan bir kurt sürüsü köy yakınlarında görülmeye başladı; geceleri hayvanlara saldırıyorlar, gündüzleri bile temkinli olmak gerekiyor.",
    secenekler: [
      {
        metin: "Diğer köylülerle sürek avına katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 20,
          saglik: -8,
          mesaj: "Sürüyü dağıttınız; köy yeniden güvenli hissetti.",
          detay: "Kurtlardan biri sana yaklaştığında ürktün ama geri çekilmedin.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          mesaj: "Bir kurt seni ısırdı; yara iyileşse de uzun süre acıdı.",
          detay: "Doğayla giriştiğin bu mücadelede bu sefer kazanan sen olmadın.",
        },
      },
      {
        metin: "Evinde kal, hayvanlarını içeri al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Hayvanlarını içeri aldın; kurtlar başka bir eve yöneldi.",
          detay: "Güvende kaldın ama komşunun hayvanları telef oldu.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Önlemlere rağmen bir kurt ahırın kapısını zorlayıp içeri girdi.",
          detay: "Hayvanlarından birini kaybettin; doğa bazen tedbirlere aldırmıyor.",
        },
      },
    ],
  },
  {
    id: "genel_yeni_icat_saati",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    agirlik: 0.5,
    gorsel: "🕰️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Cep Saati Modası",
    metin: "Yeni çıkan zarif bir cep saati bütün şehirde moda oldu; sahip olmayanlar 'geri kalmış' gibi görülüyor. Fiyatı ise oldukça yüksek.",
    secenekler: [
      {
        metin: "Saati satın al.",
        baseBasariSansi: 90,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 15,
          mesaj: "Saatin dikkat çekti; çevren seni daha 'modern' görmeye başladı.",
          detay: "Küçük bir aksesuar, sosyal çevrende beklenmedik bir etki yarattı.",
        },
        basarisizSonuc: {
          para: -25,
          mesaj: "Saat bir hafta sonra bozuldu; tamirci parçalarının sahte olduğunu söyledi.",
          detay: "Modaya kapılmak bazen pahalı bir ders oluyor.",
        },
      },
      {
        metin: "Almana gerek olmadığını düşün.",
        baseBasariSansi: 95,
        basariliSonuc: {
          para: 5,
          mesaj: "Paranı sakladın; moda bir süre sonra zaten değişti.",
          detay: "Aklıselim davranmak her zaman kazandırır.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Bazı çevrelerde 'saati bile yok' diye küçümsendin.",
          detay: "Mantıklı olmak bazen sosyal bir bedel getiriyor.",
        },
      },
    ],
  },
  {
    id: "genel_kutuphane_bulgusu",
    kategori: "din",
    agirlik: 0.3,
    gorsel: "📜",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Unutulmuş Bir Elyazması",
    metin: "Eski bir kütüphanede tozlu raflar arasında, kimsenin fark etmediği eski ve değerli görünen bir elyazması buldun. Ait olduğu yere teslim edebilir ya da kendine saklayabilirsin.",
    secenekler: [
      {
        metin: "Elyazmasını yetkililere teslim et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 20,
          ahlak: 20,
          mesaj: "Teslim ettiğin elyazması değerli bir tarihi belge çıktı; adın kayıtlara geçti.",
          detay: "Bulduğun şeyi sahiplenmemen, seni şehirde dürüstlüğüyle tanınan biri yaptı.",
        },
        basarisizSonuc: {
          un: 5,
          mesaj: "Teslim ettin ama kimse pek ilgilenmedi; sıradan bir belgeymiş.",
          detay: "Dürüstlüğün karşılığını her zaman büyük bir ödülle almıyorsun.",
        },
      },
      {
        metin: "Sessizce kendine sakla, belki değerlidir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 45,
          ahlak: -15,
          mesaj: "Elyazması gerçekten değerliymiş; gizlice bir koleksiyoncuya sattın.",
          detay: "Parayı aldın ama bunun aslında kime ait olduğunu biliyorsun.",
        },
        basarisizSonuc: {
          ahlak: -15,
          mesaj: "Elyazması değersiz bir kopya çıktı; sakladığın şey boşuna bir sırdı.",
          detay: "Bazen risk almak hiçbir şey kazandırmıyor, sadece vicdanını yoruyor.",
        },
      },
    ],
  },
  {
    id: "genel_deprem",
    kategori: "saglik",
    agirlik: 0.6,
    gorsel: "🏚️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Yerin Öfkesi",
    metin: "Gece yarısı yer sarsıldı; bazı evler çatladı, biri tamamen çöktü. Sabah şehir, hasarı sayıp yaralarını sarmaya çalışıyor.",
    secenekler: [
      {
        metin: "Enkaz altında kalanları çıkarmaya yardım et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 30,
          saglik: -10,
          mesaj: "Çöken evden bir aileyi sağ çıkardınız; şehir seni konuşuyor.",
          detay: "Ellerin taş ve toz içinde kaldı ama kurtardığın hayatlar buna değdi.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 8,
          mesaj: "Enkaz çalışması sırasında üstüne bir duvar parçası düştü.",
          detay: "Yardım etmeye çalışırken kendin de yaralandın.",
        },
      },
      {
        metin: "Kendi evini ve ailenin güvenliğini önceliklendir.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Ailen güvende; evinin hasarını onardın.",
          detay: "Başkalarına yardım etmedin ama önce kendi ocağını korudun.",
        },
        basarisizSonuc: {
          ahlak: -12,
          para: -20,
          mesaj: "Evin de hasar gördü, üstüne yardım da etmediğin için komşuların senden uzaklaştı.",
          detay: "Bazen hem kendini hem başkalarını koruyamıyorsun.",
        },
      },
    ],
  },
  {
    id: "genel_yanlis_kimlik",
    kategori: "sosyal",
    agirlik: 0.3,
    gorsel: "🎭",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Seni Başkasıyla Karıştırdılar",
    metin: "Bir grup adam seni köşeye sıkıştırıp borçlu olduğun iddia edilen birinin adını söylüyor. Sen o kişi değilsin ama görünüşün ona çok benziyormuş.",
    secenekler: [
      {
        metin: "Sakin kal, kimliğini kanıtlamaya çalış.",
        baseBasariSansi: 65,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sonunda seni dinlediler ve yanlış kişi olduğunu anladılar.",
          detay: "Kalbin hızla çarpsa da olay tatlıya bağlandı.",
        },
        basarisizSonuc: {
          saglik: -22,
          para: -15,
          mesaj: "Adamlar sana inanmadı; dövülüp cebindeki parayı da aldılar.",
          detay: "Yanlış bir benzerlik yüzünden başkasının borcunu bedenle ödedin.",
        },
      },
      {
        metin: "Kalabalığın dikkatini dağıt, kaç.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kalabalık bir anlığına şaşırdı, sen de sıvıştın.",
          detay: "Kalp çarpıntınla eve vardığında gülmekten kendini alamadın.",
        },
        basarisizSonuc: {
          saglik: -18,
          mesaj: "Kaçarken yakalandın; kaçman onları daha da şüphelendirdi.",
          detay: "Masum olduğunu ispatlamak, kaçtıktan sonra çok daha zor oldu.",
        },
      },
    ],
  },
  {
    id: "genel_kutlama_daveti_yanlislikla",
    kategori: "sosyal",
    agirlik: 0.3,
    gorsel: "🎉",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yanlışlıkla Gelen Davetiye",
    metin: "Sana ait olmayan, muhtemelen bir yazım hatasıyla adına gönderilmiş görkemli bir davet mektubu aldın. Gitsen kimse fark etmeyebilir.",
    secenekler: [
      {
        metin: "Davete git, şansını dene.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -6,
          un: 11,
          para: 15,
          mesaj: "Kimse hatayı fark etmedi; hatta etkileyici birkaç isimle tanıştın.",
          detay: "Bazen doğru yerde olmak, davetli olup olmadığından daha önemli.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -20,
          mesaj: "Ev sahibi seni tanımadığını fark edip herkesin önünde dışarı çıkardı.",
          detay: "Utanç dolu birkaç dakika, uzun süre unutulmadı.",
        },
      },
      {
        metin: "Davetiyeyi geri gönder, gitme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Dürüstlüğün küçük ama tatmin edici bir huzur getirdi.",
          detay: "Belki ilginç bir geceyi kaçırdın ama vicdanın rahat.",
        },
        basarisizSonuc: {
          mesaj: "Davetiyeyi geri gönderdin ama merakın seni uzun süre kemirdi.",
          detay: "Doğru olanı yaptın, yine de 'gitseydim ne olurdu' diye düşünmeden edemedin.",
        },
      },
    ],
  },
  {
    id: "genel_tarihi_veba_bilgini",
    kategori: "saglik",
    cag: "Orta Çağ",
    agirlik: 0.5,
    gorsel: "📚",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Uzak Diyarlardan Gelen Bilgi",
    metin: "Doğudan dönen bir gezgin, kendi memleketlerinde hastalıkla mücadele için hastaları ayrı tutmanın işe yaradığını anlatıyor. Bu, çoğu kişinin garipseyeceği yeni bir fikir.",
    secenekler: [
      {
        metin: "Fikri dinle, kendi çevrende uygulamaya çalış.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 20,
          ahlak: 15,
          mesaj: "Uyguladığın basit önlemler mahallende hastalığın yayılmasını gerçekten yavaşlattı.",
          detay: "Kimse bunun neden işe yaradığını tam anlamasa da sonuçlar ortada; sana farklı gözle bakmaya başladılar.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Komşuların fikrini 'yabancı saçmalığı' diye alaya aldı ve uygulamadı.",
          detay: "Yeni bir fikri kabul ettirmek bazen zaman istiyor; bu sefer o zaman yetmedi.",
        },
      },
      {
        metin: "İlgilenme, geleneksel yöntemlere güven.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Alışıldık yöntemlerle devam ettin; kimse seni garipsemedi.",
          detay: "Belki faydalı bir fikri es geçtin ama en azından uyumlu kaldın.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "O yıl çevrende hastalık her zamankinden hızlı yayıldı.",
          detay: "Belki yeni fikri denesen fark yaratabilirdin; bunu hiç öğrenemeyeceksin.",
        },
      },
    ],
  },
  {
    id: "genel_sanayi_bulusu_hevesi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    agirlik: 0.5,
    gorsel: "⚙️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Amatör Mucit",
    metin: "Komşun, kendi tasarladığı garip bir makinenin hayatını kolaylaştıracağını iddia ediyor ve senden küçük bir yatırım istiyor. Makine tuhaf görünüyor ama komşun çok emin.",
    secenekler: [
      {
        metin: "Küçük bir yatırım yap.",
        baseBasariSansi: 40,
        maliyet: 10,
        basariliSonuc: {
          mutluluk: -10,
          para: 35,
          un: 8,
          mesaj: "Makine gerçekten işe yaradı! Komşun seninle ortaklık kurdu, birlikte küçük bir üretim başlattınız.",
          detay: "Kimse bu tuhaf alete bir kuruş vermeyi düşünmezken sen düşündün ve kazandın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Makine ilk denemede parçalandı; komşun üzgün ama sen daha üzgünsün.",
          detay: "Bazı hevesler sadece hevestir.",
        },
      },
      {
        metin: "Kibarca reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Reddettin; komşun biraz gücenmiş görünse de anlayışla karşıladı.",
          detay: "Bazı riskler almaya değmiyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Komşun makinesini başka birine sattı ve o kişi zengin oldu.",
          detay: "Kaçırdığın fırsatı öğrenmek biraz içini burktu.",
        },
      },
    ],
  },
  {
    id: "genel_kayip_mektup_yillar_sonra",
    kategori: "sosyal",
    minYas: 25,
    agirlik: 0.2,
    gorsel: "📬",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yıllar Sonra Gelen Mektup",
    metin: "Postacı, yıllar önce gönderilmiş ama yanlış adrese giden bir mektubu sonunda sana ulaştırdı. Gönderen, o zamanlar sana aşkını itiraf eden biriymiş.",
    secenekler: [
      {
        metin: "Gönderen kişiyi bulmaya çalış.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 17,
          mesaj: "Kişiyi buldun; artık evli olsa da güzel bir sohbet ve karşılıklı bir gülümsemeyle ayrıldınız.",
          detay: "Geçmişin bir parçasıyla barışmak, garip ama iyi hissettirdi.",
        },
        basarisizSonuc: {
          ahlak: -8,
          mesaj: "Kişi çoktan başka bir şehre taşınmıştı; iz bulamadın.",
          detay: "Bazı hikayeler yarım kalmaya mahkummuş.",
        },
      },
      {
        metin: "Mektubu okuyup anı olarak sakla.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Mektubu okuyup gülümsedin ve özenle bir kutuya kaldırdın.",
          detay: "Geçmişin küçük bir parçası artık seninle; bazen bu yeterli.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Mektup seni beklenenden çok duygulandırdı, birkaç gün dalgın dolaştın.",
          detay: "Geçmiş bazen davetsiz bir şekilde bugüne karışıyor.",
        },
      },
    ],
  },
  {
    id: "genel_sarhos_soylu_kavgasi",
    kategori: "sosyal",
    agirlik: 0.3,
    gorsel: "🍷",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sarhoş Bir Soylunun Küstahlığı",
    metin: "Handa içkili bir soylu sana hakaret etti ve etraftaki herkes senin tepkini bekliyor. Karşılık verirsen onurunla, vermezsen huzurunla kalırsın.",
    secenekler: [
      {
        metin: "Sertçe karşılık ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 25,
          ahlak: 10,
          mesaj: "Sözlerin kalabalığın alkışını topladı; soylu mahcup ayrıldı.",
          detay: "Handa uzun süre 'soyluyu susturan adam' diye anıldın.",
        },
        basarisizSonuc: {
          para: -20,
          un: -12,
          saglik: -10,
          mesaj: "Soylu adamları çağırıp seni han dışına attırdı.",
          detay: "Onurun için ayağa kalktın ve bunun bir bedeli oldu.",
        },
      },
      {
        metin: "Görmezden gel, sessizce ayrıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Olay çıkmadan handan ayrıldın.",
          detay: "İçin biraz kaynadı ama başın belaya girmedi.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Handakiler sessizliğini 'korkaklık' diye yorumladı.",
          detay: "Sağduyulu davranmak bazen itibar kaybettiriyor.",
        },
      },
    ],
  },
  {
    id: "genel_kutu_muze_esyasi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    agirlik: 0.4,
    gorsel: "🗿",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Antika Merakı",
    metin: "Yeni moda olan 'antika koleksiyonculuğu' furyasında, tavan arandan çıkan eski bir aile eşyasının aslında değerli olabileceğini duydun.",
    secenekler: [
      {
        metin: "Bir uzmana göster, değerini öğren.",
        baseBasariSansi: 70,
        maliyet: 8,
        basariliSonuc: {
          mutluluk: -11,
          un: -4,
          para: 40,
          mesaj: "Eşya gerçekten değerliymiş; bir koleksiyoncuya iyi bir fiyata sattın.",
          detay: "Tavan arasında yıllarca duran bir şey, beklenmedik bir gelir kapısı oldu.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -8,
          mesaj: "Eşya sıradan bir taklit çıktı; sadece uzman ücretini ödemiş oldun.",
          detay: "Her eski eşya değerli değilmiş.",
        },
      },
      {
        metin: "Aile yadigarı olarak sakla, satma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Eşyayı sakladın; ailende bir sonraki nesle aktarılacak bir anı oldu.",
          detay: "Bazı şeylerin değeri parayla ölçülmüyor.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Yıllar sonra eşyanın çok değerli olduğunu öğrendin ama artık kaybolmuştu.",
          detay: "Bazen doğru karar bile pişmanlık getirebiliyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_sinirli_hakaret",
    kategori: "sosyal",
    gerekliKisilik: "Sinirli",
    gorsel: "😠",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kaybedilen Sabır",
    metin: "Pazar yerinde biri seni kasıtlı olarak itip özür bile dilemedi. İçinde bir şey kaynıyor; öfkeni bastırman gittikçe zorlaşıyor.",
    secenekler: [
      {
        metin: "Öfkeni serbest bırak, adama haddini bildir.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 20,
          ahlak: -10,
          mesaj: "Sert çıkışın adamı köşeye sıkıştırdı; kalabalık senden yana oldu.",
          detay: "Öfken bu kez işe yaradı; herkes haklı olduğunu gördü.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -15,
          mesaj: "Kavga büyüdü, ikiniz de dövüldünüz ve para cezası kestiler.",
          detay: "Sinirin yine seni zor bir duruma soktu; bunu bir kez daha fark ettin.",
        },
      },
      {
        metin: "Dişini sık, derin bir nefes al ve yürü git.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 18,
          saglik: -3,
          mesaj: "Kendini zor tuttun ama başardın; içinde bir gerginlik kaldı.",
          detay: "Sinirli tabiatına rağmen bu sefer kazanan sen oldun; nadiren bu kadar zor gelmişti.",
        },
        basarisizSonuc: {
          ahlak: -8,
          saglik: -10,
          mesaj: "Sakin kalmaya çalışırken bile öfken içinde kaynadı; o gece uyuyamadın.",
          detay: "Bastırdığın öfke bir yerde patlamak için bekliyor gibi hissettin.",
        },
      },
    ],
  },
  {
    id: "kisilik_sakin_kaos",
    kategori: "sosyal",
    gerekliKisilik: "Sakin",
    gorsel: "🧘",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Fırtınanın Ortasında",
    metin: "Bir yangın paniği sırasında herkes çığlık atıp koşuştururken sen tuhaf bir şekilde sakinsin. Bu sükunet insanların dikkatini çekti.",
    secenekler: [
      {
        metin: "Sakinliğini kullanıp kalabalığı yönlendir.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 28,
          ahlak: 20,
          mesaj: "Sesin ve sakinliğin paniği dağıttı; insanlar düzenli şekilde tahliye oldu.",
          detay: "Herkesin çığlık attığı yerde senin sesin duyuldu ve bu, seni doğal bir lider yaptı.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Sakinliğin bu sefer yeterli olmadı, kalabalık seni dinlemedi.",
          detay: "Bazen en sakin ses bile kaosu bastıramıyor.",
        },
      },
      {
        metin: "Sessizce kendi güvenliğini sağla, öne çıkma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 8,
          mesaj: "Sakince güvenli bir yere geçtin; kimse seni fark etmedi.",
          detay: "Sükunetin bu sefer sadece kendine fayda sağladı ve bu da yeterliydi.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Sakin kalman, sonradan 'neden yardım etmedin' diye sorgulanmana neden oldu.",
          detay: "Sakinliğin bazen kayıtsızlık gibi yanlış anlaşılıyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_kibirli_kucumseme",
    kategori: "sosyal",
    gerekliKisilik: "Kibirli",
    gorsel: "🎩",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Küçümsediğin Adam",
    metin: "Basit giyimli bir adamla tartışıp onu aşağıladın. Sonradan öğrendin ki adam, şehrin en nüfuzlu ailelerinden birinin reisiymiş — kılık değiştirmiş geziyormuş.",
    secenekler: [
      {
        metin: "Onun bu sırrını şantaj olarak kullan! Kibrin boyun eğmez.",
        baseBasariSansi: 40,
        maxAhlak: 45,
        basariliSonuc: {
          para: 50,
          un: 15,
          ahlak: -30,
          mesaj: "Soyluyu, kılık değiştirmiş halini etrafa yaymakla tehdit ettin. Sana yüklü bir 'sus payı' ödedi.",
          detay: "Kibrin seni zengin etti, ancak gölgelerde çok güçlü bir düşman edindin.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "Şantajı gururuna yediremeyen soylu, o gece evine suikastçılar yolladı. Kibrinin bedelini canınla ödedin.",
        },
      },
      {
        metin: "Gidip özür dile, gururunu yut.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 20,
          un: -8,
          mesaj: "Özrün kabul edildi; adam anlayış gösterdi ama olan oldu.",
          detay: "Kibrini yutmak zordu ama en azından büyük bir düşman kazanmadın.",
        },
        basarisizSonuc: {
          un: -25,
          para: -20,
          mesaj: "Özrün yeterince samimi bulunmadı; adam seni işlerinden dışladı.",
          detay: "Kibrin bu sefer büyük bir bedel ödetti.",
        },
      },
      {
        metin: "Umursama, kim olduğu önemli değil.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: -15,
          mesaj: "Şaşırtıcı biçimde hiçbir şey olmadı; adam meseleyi unutmuş gibi görünüyor.",
          detay: "Bu sefer kibrin bedelsiz kaldı ama şansına güvenmemelisin.",
        },
        basarisizSonuc: {
          para: -35,
          un: -25,
          mesaj: "Adam, nüfuzunu kullanarak seni birçok çevrede zora soktu.",
          detay: "Kibrin, hiç tanımadığın güçlü bir düşman kazandırdı.",
        },
      },
    ],
  },
  {
    id: "kisilik_alayci_dil",
    kategori: "sosyal",
    gerekliKisilik: "Alaycı",
    gorsel: "😏",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Zehirli Espri",
    metin: "Bir toplantıda etkili birine yönelik alaycı bir espri yaptın; herkes güldü ama hedefindeki kişi gülmedi.",
    secenekler: [
      {
        metin: "Espirini savun, geri adım atma.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 22,
          mesaj: "Kalabalık seni destekledi; 'dobra biri' diye ünün arttı.",
          detay: "Keskin dilin bu sefer sana itibar kazandırdı.",
        },
        basarisizSonuc: {
          un: -20,
          para: -15,
          mesaj: "Hedefindeki kişi güçlüymüş; işlerini sessizce baltalamaya başladı.",
          detay: "Alaycılığının bedelini uzun vadede ödemeye başladın.",
        },
      },
      {
        metin: "Şakaydı de, durumu yumuşat.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Gerginliği yumuşattın; adam gücenmiş görünse de mesele büyümedi.",
          detay: "Keskin dilini bu sefer frenlemeyi başardın.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Yumuşatma girişimin daha da sırıtkan durdu; kimse ikna olmadı.",
          detay: "Bazen zarar zaten verilmiş oluyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_umutlu_karanlikta_isik",
    kategori: "sosyal",
    gerekliKisilik: "Umutlu",
    gorsel: "🌅",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Karanlıkta Işık",
    metin: "Kötü bir hasat/durgunluk sonrası çevrendeki herkes umudunu kaybetmiş durumda. Sen ise hâlâ işlerin düzeleceğine inanıyorsun ve bunu insanlarla paylaşmak istiyorsun.",
    secenekler: [
      {
        metin: "İnsanları toparla, umudu yeniden canlandır.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 28,
          ahlak: 25,
          para: -10,
          mesaj: "Sözlerin insanlara güç verdi; birlikte zorlukları aşmaya karar verdiniz.",
          detay: "Umudun, çoğu insanın vazgeçtiği yerde bir topluluk ruhu yarattı.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "İyimserliğin bazılarınca 'gerçeklerden kopuk' diye eleştirildi.",
          detay: "Umut her zaman herkesi ikna etmiyor.",
        },
      },
      {
        metin: "Kendi umudunla yetin, sessizce ilerle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Umudun kimseye görünmeden seni ayakta tuttu.",
          detay: "Bazen umut, paylaşılmasa da bir kişiyi ayakta tutmaya yeter.",
        },
        basarisizSonuc: {
          mesaj: "Umudun bu sefer gerçekle örtüşmedi, hayal kırıklığı yaşadın.",
          detay: "İyimserlik her zaman ödüllendirilmiyor ama vazgeçmeyi de öğretmiyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_umutsuz_neden_ugrasayim",
    kategori: "sosyal",
    gerekliKisilik: "Umutsuz",
    gorsel: "🌧️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Neden Uğraşayım",
    metin: "Önüne gerçek bir fırsat çıktı ama içinden bir ses 'nasılsa boşuna' diyor. Denemek zaman ve emek istiyor, denememekse hep aynı yerde kalmak.",
    secenekler: [
      {
        metin: "Yine de dene, belki bu sefer farklıdır.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: -11,
          para: 35,
          un: 9,
          ahlak: 7,
          mesaj: "Şaşırtıcı biçimde işe yaradı; belki de her şey boşuna değilmiş.",
          detay: "İçindeki umutsuzluğa rağmen denemen, sandığından daha iyi sonuçlandı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -35,
          ahlak: -15,
          mesaj: "Beklediğin gibi oldu; işe yaramadı ve bu seni haklı çıkardı sandın.",
          detay: "'Zaten biliyordum' dedin kendine ama içinde küçük bir hayal kırıklığı daha birikti.",
        },
      },
      {
        metin: "Uğraşma, zaten fark etmez.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Fırsatı geçiştirdin; hayatın alışıldık akışında devam etti.",
          detay: "İçinden bir yer 'ya deneseydim' dese de bunu kabul etmek istemedin.",
        },
        basarisizSonuc: {
          ahlak: -12,
          mesaj: "Başkasının aynı fırsatla başarılı olduğunu görünce için burkuldu.",
          detay: "Denemediğin şeyin başkasının elinde çiçek açması, umutsuzluğunu daha da derinleştirdi.",
        },
      },
    ],
  },
  {
    id: "kisilik_depresif_agir_gunler",
    kategori: "saglik",
    gerekliKisilik: "Depresif",
    gorsel: "🌑",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Ağır Günler",
    metin: "Haftalardır üstünden atamadığın zehirli bir ağırlık var; yataktan kalkmak bile artık imkansız gibi. Çevrendekiler 'kendine gel' diyor ama o karanlık çukur seni içine çekiyor.",
    secenekler: [
      {
        metin: "Yardım iste, birine açıl.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 20,
          saglik: 15,
          mesaj: "Birine açılmak beklediğinden zor değildi; biraz da olsa yükün hafifledi ve ayağa kalktın.",
          detay: "Yalnız taşımadığın bir yük, taşınabilir hale geldi.",
        },
        basarisizSonuc: {
          un: -12,
          saglik: -10,
          mesaj: "Açıldığın kişi seni anlamadı, 'abartıyorsun' dedi.",
          detay: "Yanlış kişiye açılmak, hiç açılmamaktan bazen daha ağır geliyor.",
        },
      },
      {
        metin: "Kimseye söyleme, kendi başına yatağında bekle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: -12,
          mesaj: "Zorlukla da olsa günlerini idare ettin; kimse bir şey fark etmedi.",
          detay: "Ağırlığı tek başına taşımak seni yordu ama mucize eseri hayatta kaldın.",
        },
        basarisizSonuc: {
          saglik: -35,
          para: -20,
          olum_sansi: 8,
          mesaj: "Ağırlık seni tamamen yuttu. Günlerce uyudun, işinden oldun ve sağlığın hızla bozuldu.",
          detay: "İçindeki karanlık, bedenini de tüketmeye başladı.",
        },
      },
    ],
  },
  {
    id: "kisilik_cesur_kimsenin_girmedigi",
    kategori: "sosyal",
    gerekliKisilik: "Cesur",
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kimsenin Girmediği Yer",
    metin: "Herkesin tehlikeli ve girilmez dediği çöken bir bina/mağara/harabede değerli bir şey olduğu söyleniyor. Kimse gitmeye cesaret edemiyor.",
    secenekler: [
      {
        metin: "İçeri gir, riski göze al.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 55,
          un: 30,
          mesaj: "İçeride gerçekten değerli bir şey buldun; kimsenin cesaret edemediğini sen yaptın.",
          detay: "Cesaretin bir kez daha karşılığını verdi; şehirde adın 'korkusuz' diye anılıyor.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 12,
          mesaj: "Yapı çöktü, enkazın altında kalmaktan son anda kurtuldun.",
          detay: "Cesaretin bu sefer seni neredeyse hayatına mal ediyordu.",
        },
      },
      {
        metin: "Sağduyulu davran, bu sefer riske girme.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "İçindeki sesi bastırıp uzak durdun; garip bir huzursuzlukla da olsa güvendesin.",
          detay: "Cesaretini bu sefer kullanmamayı seçtin ve bu da bir çeşit güçtü.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Başka biri girip hazineyi buldu; 'sen neden girmedin' diye takıldılar.",
          detay: "Cesur bilinmenin bir bedeli de bu: girmediğinde bile açıklama bekleniyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_huzunlu_gecmisin_golgesi",
    kategori: "sosyal",
    gerekliKisilik: "Hüzünlü",
    gorsel: "🍂",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Geçmişin Gölgesi",
    metin: "Eski bir acını hatırlatan bir yer/eşya/isimle karşılaştın. İçindeki hüzün yeniden canlandı ve bir süre etrafındakiler bunu fark etti.",
    secenekler: [
      {
        metin: "Hüznünle yüzleş, o anıyı kabullen.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 20,
          saglik: 8,
          mesaj: "Yüzleşmek acı vericiydi ama bir şekilde içini rahatlattı.",
          detay: "Hüznünü bastırmak yerine kabullenmek, beklediğinden farklı bir huzur getirdi.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Yüzleşme beklediğinden ağır geldi; birkaç gün kimseyle konuşamadın.",
          detay: "Bazı anılar, yüzleşilse bile kolayca geçmiyor.",
        },
      },
      {
        metin: "Hüznünü gizle, günlük hayatına devam et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Hüznünü içinde tutup işlerine devam ettin; kimse bir şey fark etmedi.",
          detay: "Hüznün, senin sessiz yol arkadaşın olmaya devam ediyor.",
        },
        basarisizSonuc: {
          ahlak: -10,
          saglik: -10,
          mesaj: "Gizlemeye çalışman seni daha da yordu; hüznün fiziksel bir ağırlığa dönüştü.",
          detay: "Bastırılan duygular bazen bedeninde kendine yer buluyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_sosyal_herkesin_tanidigi",
    kategori: "sosyal",
    gerekliKisilik: "Sosyal",
    gorsel: "🎊",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Herkesin Tanıdığı Yüz",
    metin: "Geniş çevren sayesinde, normalde ulaşamayacağın bir fırsattan haberin oldu — bir tanıdığının tanıdığı, sana özel bir kapı araladı.",
    secenekler: [
      {
        metin: "Bağlantılarını kullan, fırsatı değerlendir.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -11,
          para: 40,
          un: 13,
          mesaj: "Bağlantıların sayesinde kapı gerçekten açıldı; herkes 'onu tanıyorum' demenin değerini bir kez daha gösterdi.",
          detay: "Geniş çevren yine işine yaradı; bazı insanlar için ağ, sermayeden değerlidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -8,
          mesaj: "Fırsat göründüğü kadar iyi değildi; zaman ve umudun boşa gitti.",
          detay: "Bazen çok fazla insan tanımak, yanlış fırsatlara da açık olmak demek.",
        },
      },
      {
        metin: "Fırsatı bir dostuna öner, ondan gitsin.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Dostun fırsatı değerlendirdi ve sana ömür boyu müteşekkir kaldı.",
          detay: "Bazen bir kapıyı başkasına açmak, kendine açmaktan daha değerli hissettiriyor.",
        },
        basarisizSonuc: {
          ahlak: 12,
          mesaj: "Dostun fırsatı değerlendiremedi; ikiniz de biraz hayal kırıklığına uğradınız.",
          detay: "İyi niyetin her zaman istediğin sonucu vermiyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_icedonuk_kalabaliktan_kacis",
    kategori: "sosyal",
    gerekliKisilik: "İçedönük",
    gorsel: "🚪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kalabalıktan Kaçış",
    metin: "Büyük ve gürültülü bir davete katılman bekleniyor; orada olman önemli insanlarla tanışmana yardım edebilir ama düşüncesi bile seni yoruyor.",
    secenekler: [
      {
        metin: "Kendini zorla, katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -6,
          un: 11,
          para: 15,
          saglik: -10,
          mesaj: "Zorlukla da olsa katıldın; birkaç değerli tanışıklık edindin.",
          detay: "Kalabalık seni yordu ama tamamen boşuna değildi.",
        },
        basarisizSonuc: {
          saglik: -18,
          un: -8,
          mesaj: "Kalabalıkta bunalıp erken ayrıldın; bu fark edildi.",
          detay: "Kendini zorlamak her zaman işe yaramıyor; bu sefer bedeli ağırdı.",
        },
      },
      {
        metin: "Nazik bir bahaneyle katılma, kendi huzurunu koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 12,
          mesaj: "Evde sakin bir akşam geçirdin; kendini yeniden topladın.",
          detay: "Herkes sosyalleşmek zorunda değil; kendi huzurunu bilmek de bir güç.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Katılmadığın davette önemli bir fırsat konuşulmuş; bunu kaçırdığını sonradan öğrendin.",
          detay: "İçe dönüklüğün seni korudu ama bir kapıyı da kapattı.",
        },
      },
    ],
  },
  {
    id: "kisilik_sivridilli_soz_bedeli",
    kategori: "sosyal",
    gerekliKisilik: "Sivri Dilli",
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sözlerinin Bedeli",
    metin: "Etkili birine karşı düşünmeden söylediğin sert bir söz hızla yayıldı. Kimileri bunu cesaret sayıyor, kimileri saygısızlık.",
    secenekler: [
      {
        metin: "Sözünün arkasında dur, geri adım atma.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 25,
          ahlak: 12,
          mesaj: "Dürüstlüğünle tanındın; birçok kişi aslında aynı şeyi düşünüyormuş.",
          detay: "Sivri dilin bu sefer bir cesaret göstergesi olarak okundu.",
        },
        basarisizSonuc: {
          para: -25,
          un: -18,
          mesaj: "Hedefindeki kişi güçlüymüş; işlerini sessizce zorlaştırmaya başladı.",
          detay: "Sözlerinin bir bedeli oldu ve bu bedeli şimdi ödüyorsun.",
        },
      },
      {
        metin: "Özür dile, ilişkiyi onarmaya çalış.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Özrün kabul edildi; ilişki onarıldı, gerçi biraz gururun kırıldı.",
          detay: "Keskin dilini frenlemek zor oldu ama işe yaradı.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Özrün yeterince samimi bulunmadı; ilişki zaten zedelenmişti.",
          detay: "Bazı sözler söylendikten sonra geri alınamıyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_yumusakbasli_herkesin_sevdigi",
    kategori: "sosyal",
    gerekliKisilik: "Yumuşak Başlı",
    gorsel: "🕊️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sömürülen İyilik",
    metin: "Yumuşak huyun sayesinde herkes seni sever ama bu sefer biri, iyi niyetini açıkça kötüye kullanıp senden çok ağır, haksız bir istekte bulunuyor.",
    secenekler: [
      {
        metin: "Nazikçe ama net bir şekilde hayır de.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 15,
          un: 8,
          mutluluk: 3,
          mesaj: "Nazik ama net duruşun saygı gördü; adam istediğinden vazgeçti.",
          detay: "Yumuşak huylu olmak, sınır koyamamak demek değilmiş; bunu kanıtladın.",
        },
        basarisizSonuc: {
          un: -8,
          mutluluk: -5,
          mesaj: "Reddin bazılarınca 'ona benzemiyor' diye şaşkınlıkla karşılandı.",
          detay: "Sınır koymak, doğana aykırı görünse de bazen gerekiyor.",
        },
      },
      {
        metin: "Her zamanki gibi kabul et, huzuru bozma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -8,
          para: -10,
          mutluluk: -10,
          mesaj: "İsteği kabul ettin; adam memnun ayrıldı ama sen biraz daha eksildin.",
          detay: "Herkesi memnun etmek bazen kendi payına düşeni azaltıyor.",
        },
        basarisizSonuc: {
          para: -25,
          ahlak: -12,
          un: -10,
          mesaj: "Kabul etmen, adamın seni tekrar tekrar kullanmasına kapı araladı.",
          detay: "İyiliğin bu sefer sömürülmene neden oldu. Aynaya baktığında kendine kızıyorsun.",
        },
      },
    ],
  },
  {
    id: "kisilik_rekabetci_kim_daha_iyi",
    kategori: "sosyal",
    gerekliKisilik: "Rekabetçi",
    gorsel: "🏆",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kim Daha İyi",
    metin: "Bir tanıdığın seninle açıkça yarışmaya başladı; kim daha çok kazanacak, kim daha çok tanınacak. Bu rekabet seni harekete geçiriyor.",
    secenekler: [
      {
        metin: "Rekabeti kabul et, her şeyini ortaya koy.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 40,
          un: 13,
          mutluluk: -3,
          mesaj: "Rekabeti açık farkla kazandın; rakibin bile seni tebrik etmek zorunda kaldı.",
          detay: "Rekabetçi doğan bir kez daha seni öne çıkardı.",
        },
        basarisizSonuc: {
          para: -20,
          un: -12,
          mutluluk: -20,
          mesaj: "Rakibin seni geride bıraktı; kaybetmek her zamankinden ağır geldi.",
          detay: "Rekabetçi ruhun bazen seni gereğinden fazla riske sokuyor ve kaybettiğinde seni yıkıyor.",
        },
      },
      {
        metin: "Rekabeti görmezden gel, kendi hızında ilerle.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 15,
          mutluluk: 3,
          mesaj: "Rekabete girmedin; içinde bir huzursuzluk olsa da işlerin sağlıklı ilerledi.",
          detay: "Her yarışa girmemeyi öğrenmek de bir olgunluk.",
        },
        basarisizSonuc: {
          un: -10,
          mutluluk: -10,
          mesaj: "Rakibin senin katılmamanı 'yenilgiyi kabullenmek' diye yorumladı.",
          detay: "Rekabetten çekilmen bile başkalarınca bir sonuç gibi okundu ve bu gururunu kırdı.",
        },
      },
    ],
  },
  {
    id: "kisilik_hirsli_yeterince_degil",
    kategori: "ticaret",
    gerekliKisilik: "Hırslı",
    gorsel: "📈",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Asla Yetmez",
    metin: "Elinde iyi giden bir işin var ama içindeki ses 'yeterli değil, daha fazlası olmalı' diyor. Daha büyük bir hamle riskli ama hırsın seni durdurmuyor.",
    secenekler: [
      {
        metin: "Her şeyi büyütmek için riske gir.",
        baseBasariSansi: 50,
        maliyet: 20,
        basariliSonuc: {
          para: 65,
          un: 25,
          maas_carpani: 1.3,
          mesaj: "Büyük hamlen karşılığını verdi; işin bir üst seviyeye sıçradı.",
          detay: "Hırsın bir kez daha seni öne taşıdı; ama içindeki ses hâlâ 'daha fazlası olmalı' diyor.",
        },
        basarisizSonuc: {
          para: -55,
          un: -15,
          mutluluk: -15,
          mesaj: "Büyük hamlen tutmadı; elindeki sağlam işin bile bir kısmını kaybettin.",
          detay: "Hırsın bu sefer seni yeterli olanla yetinmemeye ikna etti ve bedelini çok ağır ödedin.",
        },
      },
      {
        metin: "Elindekiyle yetin, riske girme.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 12,
          ahlak: 6,
          mesaj: "Elindekiyle yetindin; içindeki huzursuzluğa rağmen işin istikrarlı kaldı.",
          detay: "Hırsını bu sefer frenlemeyi başardın; kolay olmadı.",
        },
        basarisizSonuc: {
          para: -12,
          ahlak: -10,
          mutluluk: -19,
          mesaj: "Yetinmeye çalışsan da içindeki tatminsizlik seni günlerce uykusuz bıraktı.",
          detay: "Hırslı bir doğaya sahip olmak, 'yeter' demeyi bir işkenceye dönüştürüyor.",
        },
      },
    ],
  },
  {
    id: "kisilik_vicdanli_vicdanin_sesi",
    kategori: "sosyal",
    gerekliKisilik: "Vicdanlı",
    gorsel: "🕊️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Vicdanının Sesi",
    metin: "Kimsenin fark etmeyeceği kolay ve çok kazançlı bir yol var ama bu yol, masum birinin haksız yere zarar görmesi anlamına geliyor. Vicdanın seni rahat bırakmıyor.",
    secenekler: [
      {
        metin: "Vicdanını dinle, kolay yolu reddet.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 30,
          un: 12,
          mutluluk: 8,
          mesaj: "Vicdanının sesini dinledin; kimse bilmese de kendinle barışıksın.",
          detay: "Vicdanlı doğan bir kez daha seni doğru olana yöneltti. Başını yastığa rahat koyuyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Doğru olanı yaptın ama bu, beklediğinden daha pahalıya mal oldu.",
          detay: "Vicdanının sesini dinlemenin bazen somut bir bedeli oluyor.",
        },
      },
      {
        metin: "Kendine 'bu sefer mecburum' de, kolay yolu seç.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 45,
          ahlak: -35,
          mutluluk: -25,
          mesaj: "Kazandın ama o masum adamın yüzü aklından çıkmıyor.",
          detay: "Vicdanlı bir insan olarak bu seçim, kazandığın paradan çok daha ağır bir zehir bıraktı.",
        },
        basarisizSonuc: {
          para: -20,
          ahlak: -25,
          un: -20,
          mesaj: "Hem beklediğin kazancı elde edemedin hem de vicdanın seni yiyip bitirdi.",
          detay: "Doğana aykırı davranmak, kaybettiğinde iki kat ağır geliyor.",
        },
      },
    ],
  },
  {
    id: "yerlesim_sinir_baskini",
    kategori: "savas",
    gerekliEtiketler: [
      "yerlesim:sinir",
    ],
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Sınırda Baskın",
    metin: "Gece yarısı sınır boyundaki köyünüze küçük bir akıncı grubu baskın düzenledi. Silah sesleri, yanan evler ve çığlıklarla uyandın.",
    secenekler: [
      {
        metin: "Elindeki silahla köyün savunmasına koş.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          para: 15,
          mesaj: "Baskını püskürtmeye yardım ettin; köylüler sana minnettar kaldı.",
          detay: "Ganimetten ve teşekkürlerden payına düşeni aldın.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 12,
          durum_ekle: {
            id: "sinir_yarasi",
            ad: "Baskın Yarası",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Çarpışmada ağır yaralandın; iyileşmen haftalar sürdü.",
          detay: "Sınırda yaşamanın bedeli bazen etinde kalıyor.",
        },
      },
      {
        metin: "Aileni alıp ormana kaç, baskın geçsin.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: -20,
          un: -5,
          mesaj: "Canını kurtardın ama döndüğünde evinin yarısı yağmalanmıştı.",
          detay: "Sınırda yaşayanlar hayatı mala tercih etmeyi öğrenir.",
        },
        basarisizSonuc: {
          para: -25,
          saglik: -15,
          mesaj: "Kaçarken akıncılarla karşılaştın, hem eşyanı hem birkaç yara aldın.",
          detay: "Sınır bölgesinde huzur, kısa süreliğine kiralanan bir şey.",
        },
      },
    ],
  },
  {
    id: "yerlesim_sehir_salgin_kalabaligi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "yerlesim:sehir",
    ],
    gorsel: "🤧",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kalabalık Çarşı",
    metin: "Şehir merkezindeki çarşı her zamanki gibi tıklım tıklım; ama bu ay ateşli hastalık vakaları da hızla artıyor. Kalabalıkta durmak riskli, uzak durmaksa fırsatları kaçırmak demek.",
    secenekler: [
      {
        metin: "Çarşıya karış, fırsatları değerlendir.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: -10,
          un: -4,
          para: 25,
          mesaj: "Kalabalığın içinde iyi bir pazarlık yakaladın; hastalıktan da payına düşmedi.",
          detay: "Şehirde yaşamanın avantajı bu: fırsat her zaman kalabalığın içinde.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Çarşı dönüşü ateşin yükseldi; günlerce yatakta geçirdin.",
          detay: "Kalabalık şehirlerde hastalık, fırsat kadar hızlı yayılıyor.",
        },
      },
      {
        metin: "Evde kal, bu ayı atlat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Evde kalıp hastalıktan korundun; ama çarşıdaki fırsatları kaçırdın.",
          detay: "Bazı aylar sadece hayatta kalmakla geçer.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Evde kalmana rağmen komşulardan biri hastalığı taşıdı; küçük bir masrafla atlattın.",
          detay: "Şehirde tamamen izole olmak neredeyse imkansız.",
        },
      },
    ],
  },
  {
    id: "sanayi_fabrika_grevi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    gorsel: "🏭",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Fabrika Grevi",
    metin: "{bolge} fabrikalarında işçiler ücret zammı ve insani şartlar için greve gitti. Sokaklar gerginlik dolu; askerler yolda. Herkes bir taraf tutmanı bekliyor.",
    secenekler: [
      {
        metin: "Greve destek ver, işçilerin yanında dur.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          para: -10,
          etiket_ekle: [
            "halkin_adami",
          ],
          mesaj: "Grev kısmi bir zaferle sonuçlandı; işçiler seni safında bilecek.",
          detay: "Sanayi çağında ezilenlerin safını tutmak, çoğu zaman geri dönüşü olmayan, gururlu bir karardır.",
        },
        basarisizSonuc: {
          para: -25,
          un: -10,
          saglik: -10,
          mesaj: "Grev kanlı bastırıldı; senin ismin de elebaşları arasında anıldı. Dayak yedin.",
          detay: "Fabrika sahipleri bu tür girişimleri unutmuyor.",
        },
      },
      {
        metin: "Karşı çık, işverenlerin (sermayenin) yanında yer al.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 40,
          ahlak: -25,
          un: -15,
          mesaj: "İşverenler memnuniyetini gösterdi; kasan bir miktar doldu.",
          detay: "Sanayi çağının kazananları çoğu zaman en merhametliler değil, en doğru tarafı seçenlerdir.",
        },
        basarisizSonuc: {
          ahlak: -15,
          un: -25,
          saglik: -15,
          mesaj: "İşçiler bu duruşunu unutmadı; bir gece sokakta yürürken saldırıya uğradın.",
          detay: "Bazı seçimler kısa vadeli kazanç, uzun vadeli ve acı verici bedeller getirir.",
        },
      },
    ],
  },
  {
    id: "sanayi_sendika_toplantisi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    minYas: 17,
    gorsel: "📋",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gizli Sendika Toplantısı",
    metin: "Mahallenizde yeni kurulan bir sendika üyelerini gizlice topluyor. {dost} da sana katılmanı öneriyor; dayanışma güçlü ama devletin gözünde riskli bir bağlılık.",
    secenekler: [
      {
        metin: "Sendikaya katıl, {dost} ile birlikte hareket et.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: -8,
          dost_puani: 15,
          ahlak: 12,
          mesaj: "Toplantı iyi geçti; {dost} yanında olduğun için memnun kaldı.",
          detay: "Dayanışma çağı, birlikte hareket edenleri ödüllendiriyor.",
        },
        basarisizSonuc: {
          para: -15,
          un: -10,
          mesaj: "Toplantı polis baskınıyla kaosla sonuçlandı. Zar zor kaçtın.",
          detay: "Her örgütlenme çabası ilk seferinde düzgün işlemez.",
        },
      },
      {
        metin: "Katılma, bağımsız ve güvende kalmayı tercih et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          dost_puani: -10,
          mesaj: "Bağımsız kaldın; {dost} biraz hayal kırıklığına uğradı ama saygı duydu.",
          detay: "Her yol birlikte yürünmek zorunda değil.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          un: -5,
          mesaj: "{dost} bu kararını çevrede 'patron yalakası' olarak anlattı.",
          detay: "Bağımsızlık bazen yalnızlık ve ihanet olarak yorumlanıyor.",
        },
      },
    ],
  },
  {
    id: "sanayi_gazete_haberi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    minUn: 20,
    gorsel: "📰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gazete Haberi",
    metin: "Yerel bir gazete senin hakkında bir yazı hazırlıyor. Muhabir dürüst bir röportaj mı, yoksa abartılmış, süslü bir kahramanlık hikayesi mi istediğini soruyor.",
    secenekler: [
      {
        metin: "Dürüst bir röportaj ver, olduğun gibi anlat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 15,
          un: 12,
          mesaj: "Yazı sade ama etkileyiciydi; okuyanlar samimiyetini takdir etti.",
          detay: "Basın çağında dürüstlük, gösterişten daha uzun ömürlü bir itibar bırakıyor.",
        },
        basarisizSonuc: {
          un: 5,
          mesaj: "Röportaj beklediğin ilgiyi görmedi, sıradan bir haber olarak gazetenin arka sayfalarında kaldı.",
          detay: "Her dürüst hikaye manşet olmuyor.",
        },
      },
      {
        metin: "Hikayeyi süsle, kendini kahraman gibi anlat.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 35,
          ahlak: -15,
          mesaj: "Yazı şehirde büyük yankı uyandırdı; adın her yerde konuşuluyor.",
          detay: "Basın çağı, iyi anlatılmış yalan bir hikayeyi gerçeğin önüne koyabiliyor.",
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -20,
          mesaj: "Abartıların ortaya çıktı; rakip gazete seni 'yalancı' ilan etti.",
          detay: "Sanayi çağında yalanlar, eskisinden çok daha hızlı yayılıyor ve çabuk sönüyor.",
        },
      },
    ],
  },
  {
    id: "sanayi_tren_yolculugu",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    gorsel: "🚂",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Tren Yolculuğu",
    metin: "Yeni açılan demiryolu hattı, uzak bir şehirdeki büyük bir fırsata birkaç saatte ulaşmanı sağlıyor. Bilet pahalı ama fırsat kaçırılmayacak gibi.",
    secenekler: [
      {
        metin: "Bileti al, trene bin ve fırsatın peşinden git.",
        baseBasariSansi: 60,
        maliyet: 15,
        basariliSonuc: {
          mutluluk: -11,
          para: 50,
          un: 5,
          mesaj: "Yolculuk karşılığını fazlasıyla verdi; anlaşma imzalandı.",
          detay: "Demiryolu çağı, mesafeleri fırsata çevirenleri ödüllendiriyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Şehre vardığında fırsatın çoktan başkasına gittiğini öğrendin.",
          detay: "Bazen tren zamanında varır ama fırsat seni beklemez.",
        },
      },
      {
        metin: "Riske girme, parasını sakla, evde kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Parasını sakladın; fırsat kaçtı ama en azından cebin hafiflemedi.",
          detay: "Her tren fırsatı kaçırmak sanıldığı kadar kötü bir tercih olmayabilir.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Sonradan o fırsatı değerlendirenlerin ne kadar kazandığını duyunca içine oturdu.",
          detay: "Kaçırılan fırsatlar bazen uzun süre akıldan çıkmıyor.",
        },
      },
    ],
  },
  {
    id: "sanayi_gaz_lambasi_sokaklari",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    gerekliEtiketler: [
      "yerlesim:sehir",
    ],
    gorsel: "🏮",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gaz Lambası Sokakları",
    metin: "Gaz lambalarıyla aydınlanan şehir sokakları geceleri yeni bir hayata bürünüyor: kahvehaneler, kumarhaneler, sosyetenin buluştuğu salonlar. {rakip}'in de bu gece dışarıda olduğunu duydun.",
    secenekler: [
      {
        metin: "Sen de sosyeteye karış, yeni bağlantılar kur.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: -10,
          un: 15,
          dost_puani: 10,
          mesaj: "Gece keyifli geçti; birkaç değerli tanışıklık edindin.",
          detay: "Gaz lambalarının aydınlattığı geceler, sanayi şehrinin gerçek sosyal hayatıdır.",
        },
        basarisizSonuc: {
          para: -25,
          rakip_puani: -15,
          saglik: -5,
          mesaj: "Gece {rakip} ile ters düştün; kumar masasında kaybettiğin parayı da saymıyoruz.",
          detay: "Şehrin gece hayatı, cazibesi kadar riskli de olabiliyor.",
        },
      },
      {
        metin: "Evde kal, sakin bir gece geçir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sakin bir gece geçirdin; ertesi gün dinç uyandın.",
          detay: "Her gece dışarı çıkmak zorunda değilsin.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Ertesi gün herkesin o geceki eğlenceden bahsettiğini duyunca kendini dışlanmış hissettin.",
          detay: "Bazen evde kalmanın da küçük bir sosyal bedeli oluyor.",
        },
      },
    ],
  },
  {
    id: "rutbe3_asker_saldiri_karari",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    minRutbeSeviye: 3,
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Komuta Kararı",
    metin: "Artık komutansın. Keşif kolun, yakın bir vadide konuşlanmış küçük bir düşman birliği bildirdi; zayıf görünüyorlar ama bu bir tuzak da olabilir. Emri sen vereceksin, birliğin sana güveniyor.",
    secenekler: [
      {
        metin: "İleri! Şafakla baskın emri ver.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 35,
          para: 30,
          mesaj: "Baskın tam isabet etti; düşman birliği dağıldı, ganimet birliğine bölüştürüldü.",
          detay: "Adın artık sadece kendi birliğinde değil, komuta kademesinde de efsane gibi anılıyor.",
        },
        basarisizSonuc: {
          saglik: -35,
          un: -20,
          olum_sansi: 15,
          durum_ekle: {
            id: "komuta_yarasi",
            ad: "Komuta Yarası",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Tuzaktı. Birliğin ağır kayıp verdi, sen de kendini zar zor cepheden çıkardın.",
          detay: "Bu karar hem bedeninde hem de itibarında derin bir iz bıraktı.",
        },
      },
      {
        metin: "Bekle, önce istihbarat topla.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 10,
          mesaj: "Sabrın işe yaradı; tuzak olduğu ortaya çıktı, birliğini kayıpsız geri çektin.",
          detay: "Temkinli komutanlar da destan yazar, sadece daha sessiz bir şekilde.",
        },
        basarisizSonuc: {
          un: -10,
          para: -10,
          mesaj: "Beklerken fırsat kaçtı; üst kademe kararsızlığını sorguladı.",
          detay: "Bazen doğru karar bile yanlış zamanlanınca itibar kaybettirir.",
        },
      },
    ],
  },
  {
    id: "rutbe3_tuccar_lonca_karari",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    minRutbeSeviye: 3,
    gorsel: "⚖️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Lonca Kararı",
    metin: "Lonca ustası olarak ekmek ve tahıl fiyatlarını sen belirliyorsun artık. Kıtlık var; halk zor durumda ama fiyatları düşük tutmak kendi kârından feragat etmen demek.",
    secenekler: [
      {
        metin: "Fiyatları düşük tut, halkın yanında ol.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 25,
          un: 20,
          para: -20,
          mesaj: "Kararın şehirde duyuldu; halk seni lonca ustalarının en adili olarak anmaya başladı.",
          detay: "Bazı loncalı ortakların bu kararına kızsa da, sokaktaki itibarın hiç bu kadar yüksek olmamıştı.",
        },
        basarisizSonuc: {
          ahlak: 10,
          un: 5,
          para: -30,
          mesaj: "Niyetin iyiydi ama uygulaması öngördüğünden çok daha pahalıya mal oldu.",
          detay: "Loncanın kasası bu kararın faturasını uzun süre ödedi.",
        },
      },
      {
        metin: "Fiyatları yüksek tut, kârını koru.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 50,
          ahlak: -25,
          un: -15,
          mesaj: "Kasan doldu; ama çarşıda adını duyunca yüzünü çeviren insan sayısı da arttı.",
          detay: "Zenginlik ile sevilmek genelde aynı anda gelmiyor.",
        },
        basarisizSonuc: {
          para: 10,
          ahlak: -30,
          un: -25,
          saglik: -10,
          mesaj: "Halk isyan etti, birkaç depo yağmalandı; beklediğin kârın çoğu buharlaştı.",
          detay: "Açlık, en temkinli hesapları bile bir gecede alt üst edebiliyor.",
        },
      },
    ],
  },
  {
    id: "rutbe3_din_vaiz_karari",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    minRutbeSeviye: 3,
    gorsel: "🕊️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kürsü Kararı",
    metin: "Baş vaiz oldun; cemaatin arasında gerginlik var. Bazıları başka inançtan komşularına karşı sert bir vaaz istiyor, bazıları hoşgörü çağrısı bekliyor. Kürsüden söyleyeceğin söz bu şehri yönlendirecek.",
    secenekler: [
      {
        metin: "Hoşgörü ve birlik çağrısı yap.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Vaazın şehirde yankı buldu; farklı kesimler bile senden saygıyla söz etti.",
          detay: "Kürsüden söylenen ölçülü bir söz, kılıçtan daha uzun sürebiliyor.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Bazı sert cemaatçiler seni 'zayıf' ilan etti, sözün eskisi kadar ağırlık taşımadı.",
          detay: "Hoşgörü çağrısı, herkesi asla aynı anda memnun etmiyor.",
        },
      },
      {
        metin: "Sert, dışlayıcı bir vaaz ver.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 25,
          ahlak: -25,
          mesaj: "Vaazın cemaatini ateşledi; sana bağlılıkları arttı ama şehirde gerginlik de tırmandı.",
          detay: "Otoritenin pekişmesiyle vicdanın arasındaki fark her geçen gün büyüyor.",
        },
        basarisizSonuc: {
          ahlak: -20,
          un: -20,
          saglik: -5,
          mesaj: "Sözlerin sokakta çatışmaya dönüştü; bazı cemaat üyeleri bile senden uzaklaştı.",
          detay: "Kürsüden çıkan söz bazen kontrolünden çıkan bir ateşe dönüşüyor.",
        },
      },
    ],
  },
  {
    id: "tepki_amire_meydan_okuma",
    kategori: "siyaset",
    minYas: 16,
    gorsel: "🗣️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sabrın Taştı",
    metin: "{amir} bugün yine haksız bir eleştiri yöneltti, üstelik herkesin önünde. İçindeki öfke boğazına dayandı.",
    secenekler: [
      {
        metin: "Sineye çek, bir şey deme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -8,
          mesaj: "Sineye çektin; öfken içinde bir yerde birikti.",
          detay: "Bazı savaşlar sessizlikle kazanılır — ya da sadece ertelenir.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          ahlak: -5,
          mesaj: "Sineye çekmeye çalıştın ama elin ayağın titredi, herkes fark etti.",
          detay: "Bastırılan öfke bazen daha da görünür oluyor.",
        },
      },
      {
        metin: "Sesini yükselt, karşılık ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "{amir} şaşkınlıkla sana bakıyor, etraftakiler işini gücünü bırakmış izliyor. Söylediğin söz geri alınamaz ama daha ileri gitmek senin elinde.",
          geriCekilMetni: "Hemen yumuşat: 'öyle demek istemedim.'",
          geriCekilSonucu: {
            ahlak: -5,
            mutluluk: -2,
            mesaj: "Son anda geri adım attın; gerginlik dağıldı ama içinde bir pişmanlık kaldı.",
            detay: "Bazen en cesur şey susmayı bilmektir.",
          },
          devamMetni: "Hayır. Dediğinin arkasında dur.",
          devamSonucu: {
            un: 15,
            ahlak: 8,
            para: -15,
            mesaj: "Sonuna kadar gittin. {amir} bir şey demeden uzaklaştı ama cezan gecikmedi.",
            detay: "Dik durmanın bir bedeli oldu, ama en azından kendine sadık kaldın.",
          },
        },
      },
    ],
  },
  {
    id: "tepki_ticaret_sert_tehdit",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gorsel: "🤝",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Masadaki Gerginlik",
    metin: "Uzun süredir çalıştığın bir tedarikçi, anlaştığınız fiyatı son anda yükseltmeye kalktı. Öfken kabarıyor; ilişkiyi bitirecek bir tehdit savurmak üzeresin.",
    secenekler: [
      {
        metin: "Sakin kal, yeni bir fiyat teklif et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 12,
          mesaj: "Makul bir orta yol buldunuz; ilişki soğumadı.",
          detay: "Sakinlik bazen en iyi pazarlık taktiğidir.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Tedarikçi teklifini beğenmedi, eli sıkı çıktı.",
          detay: "Her sakin yaklaşım karşılığını bulmuyor.",
        },
      },
      {
        metin: "Masaya vur, ilişkiyi bitirmekle tehdit et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Tedarikçinin yüzü asılıyor. 'Bu ilişkiyi burada bitirebiliriz' demek üzeresin ama bu, yıllardır kurduğun bir bağı riske atar.",
          geriCekilMetni: "Sakinleş, tehdidi geri çek.",
          geriCekilSonucu: {
            para: 5,
            ahlak: 5,
            mesaj: "Son anda yumuşadın; tedarikçi bunu takdir etti, küçük bir indirim yaptı.",
            detay: "Bazen geri adım, ileriye giden en kısa yoldur.",
          },
          devamMetni: "Hayır. Tehdidini sonuna kadar götür.",
          devamSonucu: {
            para: 30,
            ahlak: -10,
            rakip_puani: 15,
            mesaj: "Tedarikçi çökmene izin vermedi, boyun eğdi — ama artık sana güvenmiyor.",
            detay: "Kazandığın pazarlık, kaybettiğin güvenle eşit ağırlıkta.",
          },
        },
      },
    ],
  },
  {
    id: "tepki_din_cemaat_meydan_okuma",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gorsel: "⛪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kürsüde Bir An",
    metin: "Vaaz sırasında cemaatten biri sesini yükseltip seni açıkça sorguladı. Herkes sana bakıyor; söyleyeceğin bir sonraki söz otoriteni ya pekiştirir ya da sarsar.",
    secenekler: [
      {
        metin: "Sabırla, ölçülü bir yanıt ver.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 12,
          un: 10,
          mesaj: "Ölçülü yanıtın cemaati yatıştırdı; itibarın arttı.",
          detay: "Sabır, kürsüde en güçlü silahlardan biridir.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Yanıtın yeterince ikna edici bulunmadı, mırıltılar sürdü.",
          detay: "Her sakin yanıt karşılığını bulmuyor.",
        },
      },
      {
        metin: "Sert bir tonla otoriteni hatırlat.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Sesin sertleşiyor, cemaat susuyor. Bu tonda devam edersen otoriteni pekiştirebilir ya da cemaatini ikiye bölebilirsin.",
          geriCekilMetni: "Sesini yumuşat, tartışmayı kapat.",
          geriCekilSonucu: {
            ahlak: 5,
            mesaj: "Son anda tonunu yumuşattın; gerginlik dağıldı.",
            detay: "Bazen otorite, sesi alçaltmakla da gösterilir.",
          },
          devamMetni: "Hayır. Sert tonunu sürdür.",
          devamSonucu: {
            un: 20,
            ahlak: -15,
            mesaj: "Sözlerin kürsüde yankılandı; bazıları seni daha çok saydı, bazıları cemaati terk etti.",
            detay: "Otorite bazen bölünmeyle birlikte gelir.",
          },
        },
      },
    ],
  },
  {
    id: "tepki_asker_amirine_itaatsizlik",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gorsel: "🎖️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Emre Karşı Gelmek",
    metin: "{amir} sana açıkça haksız, hatta tehlikeli bir emir verdi. Askerlik disiplini itaat ister ama vicdanın buna karşı çıkıyor.",
    secenekler: [
      {
        metin: "Emri sorgulamadan yerine getir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 8,
          ahlak: -10,
          mesaj: "Emri yerine getirdin; disiplinin övüldü ama içinde bir rahatsızlık kaldı.",
          detay: "Bazen itaat, vicdanın sesini bastırır.",
        },
        basarisizSonuc: {
          saglik: -12,
          ahlak: -12,
          mesaj: "Emri uyguladın ama işler planlandığı gibi gitmedi.",
          detay: "Kör itaatin de bir bedeli var.",
        },
      },
      {
        metin: "Emre açıkça karşı çıkmak üzeresin.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "{amir} gözlerini kısıyor: 'Emre itaatsizlik mi ediyorsun?' Bu soruya vereceğin yanıt, askerlik hayatını değiştirebilir.",
          geriCekilMetni: "Son anda geri adım at, emri kabul et.",
          geriCekilSonucu: {
            ahlak: -5,
            mesaj: "Son anda emri kabul ettin; {amir} bir şey demeden geçti ama içinde bir pişmanlık kaldı.",
            detay: "Bazen dik durmak yerine hayatta kalmayı seçersin.",
          },
          devamMetni: "Hayır. Emri açıkça reddet.",
          devamSonucu: {
            ahlak: 20,
            un: -15,
            para: -20,
            mesaj: "Emri reddettin; vicdanın rahatladı ama disiplin cezası gecikmedi.",
            detay: "Doğru bildiğin şeyi yapmanın bir bedeli oldu, ama pişman değilsin.",
          },
        },
      },
    ],
  },
  {
    id: "zincir_asker_baskin_karari",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliUlke: {
      savasta: true,
    },
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Baskın Anı",
    metin: "Birliğin küçük bir düşman kervanına baskın düzenledi. Kısa bir çatışmanın ardından ganimet ele geçirildi; ama komutan sana dönüp soruyor: 'Burada mı duralım?'",
    secenekler: [
      {
        metin: "Ele geçirileni topla, geri çekil.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 20,
          un: 8,
          etiket_ekle: [
            "zincir_ganimet_devam",
          ],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "Ele geçirdiğinizi toplayıp güvenle geri çekildiniz.",
          detay: "Komutan kararını beğendi: 'Açgözlülük bazen en büyük düşmandır.'",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 10,
          saglik: -8,
          etiket_ekle: [
            "zincir_ganimet_devam",
          ],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "Geri çekilme karıştı, birkaç asker hafif yaralandı ama ganimet elinizde kaldı.",
          detay: "Yine de tehlikeli bir çekilmeydi.",
        },
      },
      {
        metin: "Daha fazlası için ileri gidin.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 40,
          un: 18,
          etiket_ekle: [
            "zincir_ganimet_devam",
          ],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "İleri atıldınız; ikinci bir kervan daha ele geçirdiniz.",
          detay: "Birliğin morali gökte, ama şansınız ne kadar sürer?",
        },
        basarisizSonuc: {
          saglik: -25,
          un: -15,
          etiket_ekle: [
            "zincir_ganimet_devam",
          ],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "İleri gittiniz ama pusu yediniz; birkaç asker kaybedildi.",
          detay: "Açgözlülüğün bedeli ağır oldu.",
        },
      },
    ],
  },
  {
    id: "zincir_asker_ganimet_devami",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "zincir_ganimet_devam",
    ],
    gorsel: "💰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bu Kadarı Yeter mi?",
    metin: "Komutan birliğe dönüp soruyor: 'Bu kadar ganimet yeter mi, yoksa daha da saldıralım mı?' Herkesin gözü sende; kararını bekliyorlar.",
    secenekler: [
      {
        metin: "Yeter. Kazandığımızla dönelim.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 10,
          etiket_sil: [
            "zincir_ganimet_devam",
          ],
          mesaj: "Kazandığınızla geri döndünüz; birlik sağ salim üsse ulaştı.",
          detay: "Bazen en akıllıca zafer, zamanında durabilmektir.",
        },
        basarisizSonuc: {
          un: -5,
          etiket_sil: [
            "zincir_ganimet_devam",
          ],
          mesaj: "Geri dönüş kararı bazı askerleri hayal kırıklığına uğrattı.",
          detay: "Herkes aynı fikirde olmuyor.",
        },
      },
      {
        metin: "Hayır, daha fazlası için saldıralım.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 50,
          un: 28,
          etiket_sil: [
            "zincir_ganimet_devam",
          ],
          mesaj: "İkinci dalga da başarıyla sonuçlandı; birliğin adı bölgede yayıldı.",
          detay: "Şansınız bu kez de yaver gitti.",
        },
        basarisizSonuc: {
          saglik: -35,
          un: -20,
          olum_sansi: 12,
          etiket_sil: [
            "zincir_ganimet_devam",
          ],
          mesaj: "Son saldırı felaketle sonuçlandı; birlik ağır kayıp verdi.",
          detay: "Açgözlülüğün faturası bu kez çok ağır ödendi.",
        },
      },
    ],
  },
  {
    id: "zincir_asker_dusman_kacisi",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gorsel: "🏹",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kaçan Düşman",
    metin: "Kısa bir çarpışmanın ardından düşman birliği dağılıp kaçtı. Birkaçı yaralı, yavaş hareket ediyor; kovalarsan yetişebilirsin.",
    secenekler: [
      {
        metin: "Bırak gitsinler, mevzini koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 5,
          etiket_ekle: [
            "zincir_takip_devam",
          ],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Mevzini korudun; birlik dinlenme fırsatı buldu.",
          detay: "Bazen zafer, kovalamamakla korunur.",
        },
        basarisizSonuc: {
          un: -5,
          etiket_ekle: [
            "zincir_takip_devam",
          ],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Bekleme kararı bazı askerlerce korkaklık sayıldı.",
          detay: "Her temkinli karar takdir görmüyor.",
        },
      },
      {
        metin: "Peşlerinden git, işi bitir.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 20,
          para: 15,
          etiket_ekle: [
            "zincir_takip_devam",
          ],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Kaçanları yakaladın; birlik tam bir zafer kazandı.",
          detay: "Ama artık bilinmeyen bir araziye girdiniz.",
        },
        basarisizSonuc: {
          saglik: -20,
          etiket_ekle: [
            "zincir_takip_devam",
          ],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Kovalarken düzeniniz bozuldu, birkaç asker geride kaldı.",
          detay: "Zafer hırsı bazen tuzağa dönüşür.",
        },
      },
    ],
  },
  {
    id: "zincir_asker_takip_karari",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "zincir_takip_devam",
    ],
    gorsel: "🌲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bilinmeyen Arazi",
    metin: "Kovalamaca sizi tanımadığınız bir ormana sürükledi. İleride bir şeyler hareket ediyor — belki takviye kuvvet, belki sadece rüzgar. Devam mı, geri mi?",
    secenekler: [
      {
        metin: "Geri dön, riske girme.",
        baseBasariSansi: 85,
        basariliSonuc: {
          etiket_sil: [
            "zincir_takip_devam",
          ],
          mesaj: "Geri döndünüz; birlik güvenle üsse ulaştı.",
          detay: "Temkinli komutanlar uzun yaşar.",
        },
        basarisizSonuc: {
          un: -8,
          etiket_sil: [
            "zincir_takip_devam",
          ],
          mesaj: "Geri dönüş kararı bazılarınca fırsatı kaçırmak sayıldı.",
          detay: "Herkesi memnun etmek imkansız.",
        },
      },
      {
        metin: "İçeri gir, tehlikeyi göze al.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 35,
          un: 25,
          etiket_sil: [
            "zincir_takip_devam",
          ],
          mesaj: "İçeride terk edilmiş bir düşman kampı buldunuz; ganimet birliğe kaldı.",
          detay: "Cesaretiniz bu kez ödüllendirildi.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          etiket_sil: [
            "zincir_takip_devam",
          ],
          mesaj: "Ormanın içi gerçek bir tuzaktı; birlik ağır kayıp verdi.",
          detay: "Rüzgar değilmiş.",
        },
      },
    ],
  },
  {
    id: "zincir_tuccar_agir_pazarlik",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gorsel: "📜",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sert Bir Teklif",
    metin: "Büyük bir alıcı, mallarını piyasa fiyatının çok altında almak istiyor. Kabul edersen küçük ama garanti bir kâr; reddedersen daha büyük bir kazanç riske girer.",
    secenekler: [
      {
        metin: "Teklifi kabul et, işi garantile.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 13,
          etiket_ekle: [
            "zincir_pazarlik_devam",
          ],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Teklifi kabul ettin; kâr düşük ama garanti.",
          detay: "Bazen küçük ama kesin kazanç, büyük risk almaya bedeldir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 8,
          etiket_ekle: [
            "zincir_pazarlik_devam",
          ],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Teklifi kabul ettin ama alıcı son anda şartları biraz daha ağırlaştırdı.",
          detay: "Masada her zaman avantajlı çıkamazsın.",
        },
      },
      {
        metin: "Reddet, daha iyi bir fiyat için ısrar et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 32,
          etiket_ekle: [
            "zincir_pazarlik_devam",
          ],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Israrın işe yaradı, alıcı fiyatı yükseltti.",
          detay: "Cesaretin bu kez karşılığını buldu.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          etiket_ekle: [
            "zincir_pazarlik_devam",
          ],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Alıcı vazgeçip başka bir tüccara yöneldi.",
          detay: "Israr her zaman kazandırmıyor.",
        },
      },
    ],
  },
  {
    id: "zincir_tuccar_pazarlik_sonucu",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "zincir_pazarlik_devam",
    ],
    gorsel: "🧾",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Alıcı Geri Döndü",
    metin: "Aynı alıcı birkaç gün sonra geri geldi, bu kez daha büyük bir sipariş öneriyor — ama şartları daha da sıkı. Bu ilişkiye daha fazla bağlanmak ister misin?",
    secenekler: [
      {
        metin: "Teşekkür et, ilişkiyi burada bırak.",
        baseBasariSansi: 85,
        basariliSonuc: {
          etiket_sil: [
            "zincir_pazarlik_devam",
          ],
          mesaj: "Nazikçe reddettin; ilişki dengeli kaldı.",
          detay: "Her fırsatı değerlendirmek zorunda değilsin.",
        },
        basarisizSonuc: {
          para: -5,
          etiket_sil: [
            "zincir_pazarlik_devam",
          ],
          mesaj: "Reddin alıcıyı gücendirdi, küçük bir müşteri kaybettin.",
          detay: "Bazen 'hayır' da bir bedel taşır.",
        },
      },
      {
        metin: "Büyük siparişi kabul et, riski göze al.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 45,
          maas_carpani: 1.1,
          etiket_sil: [
            "zincir_pazarlik_devam",
          ],
          mesaj: "Büyük sipariş sorunsuz tamamlandı; ticaretin bir kademe büyüdü.",
          detay: "Bazı riskler gerçekten karşılığını veriyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -30,
          etiket_sil: [
            "zincir_pazarlik_devam",
          ],
          mesaj: "Sipariş sırasında bir şeyler ters gitti, zarar ettin.",
          detay: "Büyük fırsatlar büyük riskle gelir.",
        },
      },
    ],
  },
  {
    id: "genclik_kustahligi",
    agirlik: 1.4,
    kategori: "sosyal",
    maxYas: 22,
    gorsel: "😤",
    baslik: "Gençlik Küstahlığı",
    metin: "Saygın bir büyüğün fikrine açıkça katılmıyorsun. Herkesin önünde sesini yükseltip yükseltmemek arasında kalıyorsun.",
    secenekler: [
      {
        metin: "Karşılık ver, fikrini savun.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 5,
          un: 10,
          mesaj: "Cesaretin bazı gençler tarafından takdir edildi, 'kendi fikri olan biri' dendi senin için.",
          detay: "Genç sesler bazen değişimin ilk kıvılcımıdır.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "'Saygısız' diye azarlandın, büyükler seni bir süre soğuk karşıladı.",
          detay: "Her başkaldırı hemen anlaşılmaz.",
        },
      },
      {
        metin: "Sus, saygıyla dinle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Sessiz kalman olgunluk olarak yorumlandı.",
          detay: "Bazen susmak da bir güç gösterisidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "İçindekileri yutmak seni huzursuz etti, o gece uykuya zor daldın.",
          detay: "Yutulan sözler bazen içeride yankılanır.",
        },
      },
    ],
  },
  {
    id: "arkadas_grubu_baskisi",
    agirlik: 1.4,
    kategori: "sosyal",
    maxYas: 21,
    gorsel: "🔥",
    baslik: "Arkadaş Grubunun Baskısı",
    metin: "Arkadaşların, gece yarısı tehlikeli ve biraz da aptalca bir maceraya seni de sürüklemek istiyor. 'Korkuyorsan gelme' diyorlar gülerek.",
    secenekler: [
      {
        metin: "Onlara katıl, cesaretini göster.",
        baseBasariSansi: 60,
        basariliSonuc: {
          dost_puani: 10,
          mutluluk: 5,
          mesaj: "Gece unutulmaz bir maceraya dönüştü, arkadaş grubunda efsane oldun.",
          detay: "Bazı anılar yıllar sonra bile gülümsetir.",
        },
        basarisizSonuc: {
          saglik: -10,
          para: -10,
          mesaj: "Macera ters gitti, yaralı ve parasız eve döndün.",
          detay: "Cesaret bazen dikkatsizlikle karışır.",
        },
      },
      {
        metin: "Reddet, kendi yolunu seç.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Teklifi geri çevirdin, ertesi gün arkadaşların başlarına geleni anlatınca haklı çıktığını gördün.",
          detay: "Bazen hayır demek en akıllıca cevaptır.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "'Korkak' diye takıldılar sana bir süre.",
          detay: "Her reddediş anlayışla karşılanmaz.",
        },
      },
    ],
  },
  {
    id: "ilk_hayal_kirikligi",
    agirlik: 1.4,
    kategori: "sosyal",
    maxYas: 19,
    gorsel: "💔",
    baslik: "İlk Büyük Hayal Kırıklığı",
    metin: "Aylarca emek verdiğin bir şey elinde patladı — umduğun olmadı. Bu senin ilk gerçek başarısızlığın gibi hissettiriyor.",
    secenekler: [
      {
        metin: "Yeniden dene, pes etme.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 3,
          mesaj: "İkinci denemende başardın, ilk başarısızlığının seni güçlendirdiğini fark ettin.",
          detay: "Bazı dersler sadece düşerek öğrenilir.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "İkinci deneme de tutmadı, bir süre kendine olan güvenini kaybettin.",
          detay: "Her ikinci şans zafer getirmez.",
        },
      },
      {
        metin: "Kabul et, başka bir şeye yönel.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Hayal kırıklığını kabullendin ve enerjini başka bir alana yönelttin.",
          detay: "Bazen en bilgece hareket vazgeçmektir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Vazgeçtin ama içinde bir 'acaba' hissi uzun süre kaldı.",
          detay: "Bırakılan işler bazen peşini bırakmaz.",
        },
      },
    ],
  },
  {
    id: "genc_asker_ilk_darbe",
    agirlik: 1.4,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    maxYas: 20,
    gorsel: "⚔️",
    baslik: "İlk Kılıç Darbesi",
    metin: "Talim meydanında, çavuş seni deneyimli bir askerle düello talimine sokuyor. Bu, kılıcını gerçek bir rakibe karşı ilk kez sallayışın.",
    secenekler: [
      {
        metin: "Tüm gücünle saldır, öğrendiklerini göster.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          mesaj: "Rakibini şaşırtan bir hamle yaptın, çavuş gözünü senden ayırmadı.",
          detay: "İlk zaferler en çok hatırlananlardır.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Tecrübeli asker seni yerle bir etti, herkesin önünde.",
          detay: "Acı bazen en iyi öğretmendir.",
        },
      },
      {
        metin: "Temkinli ol, sadece savun.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Temkinli duruşun seni ayakta tuttu, tecrübeli asker bile şaşırdı.",
          detay: "Bazen hayatta kalmak kazanmaktan daha değerlidir.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Fazla temkinli bulundun, 'cesaretsiz' diye takıldılar.",
          detay: "Her temkin takdir görmez.",
        },
      },
    ],
  },
  {
    id: "genc_tuccar_ilk_pazarlik",
    agirlik: 1.4,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    maxYas: 20,
    gorsel: "🤝",
    baslik: "İlk Pazarlık",
    metin: "Ustanın gözetiminde değil, tamamen kendi başına ilk büyük pazarlığını yapıyorsun. Karşındaki tüccar deneyimli ve sabırsız.",
    secenekler: [
      {
        metin: "Cesurca yüksek bir fiyat teklif et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: -8,
          para: 20,
          un: 5,
          mesaj: "Cesaretin karşılık buldu, iyi bir fiyata anlaştın.",
          detay: "İlk büyük pazarlık zaferini asla unutmayacaksın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Karşı taraf senden vazgeçti, 'toy' olduğunu düşünerek başka biriyle anlaştı.",
          detay: "Her cesaret karşılık bulmaz.",
        },
      },
      {
        metin: "Güvenli, mütevazı bir teklifle başla.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 10,
          mesaj: "Mütevazı teklifin kabul gördü, küçük ama güvenli bir kazanç elde ettin.",
          detay: "Bazen ilk adım küçük olmalı.",
        },
        basarisizSonuc: {
          mesaj: "Pazarlık uzun sürdü ama sonunda hiçbir anlaşmaya varamadınız.",
          detay: "Her pazarlık bir anlaşmayla bitmez.",
        },
      },
    ],
  },
  {
    id: "genc_din_adami_ilk_vaaz",
    agirlik: 1.4,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    maxYas: 20,
    gorsel: "🕯️",
    baslik: "İlk Vaaz Kürsüsü",
    metin: "Baş rahip hastalandı ve küçük bir ayini yönetmen gerekiyor. Kalabalık küçük olsa da, bu senin ilk gerçek kürsün.",
    secenekler: [
      {
        metin: "Kendi sözlerinle, içtenlikle konuş.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 10,
          un: 10,
          mesaj: "Sözlerin cemaati derinden etkiledi, 'bu genç ileride büyük olacak' dediler.",
          detay: "İçtenlik bazen en güçlü vaazdır.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Heyecandan kekeleyip durdun, bazıları gülümseyerek fısıldaştı.",
          detay: "Her ilk deneme kusursuz olmaz.",
        },
      },
      {
        metin: "Ezberlediğin klasik metni oku.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Güvenli seçimin işe yaradı, ayin sorunsuz geçti.",
          detay: "Bazen bilinen yol en güvenlisidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Metni ezbere okumak seni içten içe tatminsiz bıraktı, kendi sesini bulamadığını hissettin.",
          detay: "Güvenlik bazen özgünlükten ödün verdirir.",
        },
      },
    ],
  },
  {
    id: "genclik_hatiralari",
    agirlik: 1.4,
    kategori: "sosyal",
    minYas: 58,
    gorsel: "🕰️",
    baslik: "Gençliğin Hatıraları",
    metin: "Ocak başında torunların ya da genç komşular, gençliğinin nasıl geçtiğini soruyor. Anlatacak çok şeyin var.",
    secenekler: [
      {
        metin: "Herkese hikayelerini anlat.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 5,
          dost_puani: 5,
          mesaj: "Hikayelerin herkesi büyüledi, gece geç saatlere kadar sohbet ettiniz.",
          detay: "Paylaşılan bir hayat, iki kat yaşanmış olur.",
        },
        basarisizSonuc: {
          mesaj: "Hikayelerin ilgi görmedi, gençler telaşla başka konuya geçti.",
          detay: "Her nesil aynı hikayelerle büyülenmez.",
        },
      },
      {
        metin: "Sessizce kendi içinde yaşa.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Anılarını kendine sakladın, sessiz bir huzur içinde onları yeniden yaşadın.",
          detay: "Bazı hazineler paylaşılmadan da değerlidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Sessizliğin yalnızlık hissini derinleştirdi.",
          detay: "Bazen paylaşmamak bir bedel de doğurur.",
        },
      },
    ],
  },
  {
    id: "bedenin_sinirlari",
    agirlik: 1.4,
    kategori: "saglik",
    minYas: 60,
    gorsel: "🦴",
    baslik: "Bedenin Sınırları",
    metin: "Eskiden kolayca yaptığın bir işi bugün yapamadığını fark ettin. Bedenin artık gençliğindeki gibi değil.",
    secenekler: [
      {
        metin: "Gençliğindeki gibi zorla kendini.",
        baseBasariSansi: 40,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Başardın! Bedenin hâlâ eski günlerdeki gibi cevap verebiliyor.",
          detay: "İrade bazen yaşı yener.",
        },
        basarisizSonuc: {
          saglik: -15,
          mesaj: "Kendini fazla zorladın, günlerce yatalak kaldın.",
          detay: "Beden bazen iradenin önüne geçer.",
        },
      },
      {
        metin: "Yaşını kabullen, yavaşla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Yaşını kabullenmek beklediğinden daha huzurlu bir şeydi.",
          detay: "Bilgelik bazen sınırlarını bilmektir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Yavaşlamak gururunu incitti, eski günlerini özleyerek iç geçirdin.",
          detay: "Kabulleniş bazen zaman ister.",
        },
      },
    ],
  },
  {
    id: "mirasin_ne_olacak",
    agirlik: 1.4,
    kategori: "sosyal",
    minYas: 62,
    gorsel: "🌳",
    baslik: "Mirasın Ne Olacak?",
    metin: "Geriye ne bırakacağını düşünmeden edemiyorsun. Yıllarca biriktirdiğin bilgi, servet ve tecrübe — bunlar seninle mi gidecek?",
    secenekler: [
      {
        metin: "Servetini ve bilgeliğini genç birine aktar.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 8,
          dost_puani: 10,
          mesaj: "Seçtiğin genç, öğrettiklerini can kulağıyla dinledi, mirasının yaşayacağını bilmek seni rahatlattı.",
          detay: "Gerçek miras, altından çok bilgidir.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Seçtiğin kişi güvenini kötüye kullandı, verdiklerinin bir kısmını israf etti.",
          detay: "Her emanet layığına verilmez.",
        },
      },
      {
        metin: "Kendine sakla, kimseye güvenme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Her şeyi kendinde tuttun, güvenlik hissi seni rahatlattı.",
          detay: "Bazen temkin de bir tercihtir.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Yalnızlığın, sakladığın her şeyin anlamını sorgulatmaya başladı.",
          detay: "Paylaşılmayan bir miras bazen anlamını yitirir.",
        },
      },
    ],
  },
  {
    id: "yasli_asker_son_nobet",
    agirlik: 1.4,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    minYas: 60,
    gorsel: "🌅",
    baslik: "Son Nöbet",
    metin: "Komutan, 'Bir kez daha, son kez nöbete çıkar mısın?' diye soruyor. Genç bir askere yol göstermen isteniyor.",
    secenekler: [
      {
        metin: "Kabul et, son kez üniformanı giy.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 15,
          mutluluk: 5,
          mesaj: "Genç askere öğrettiklerin onun hayatını kurtaracak bilgilerdi, gurur doluydun.",
          detay: "Bazı nöbetler bir hayat boyu sürer.",
        },
        basarisizSonuc: {
          saglik: -15,
          mesaj: "Soğuk gece nöbeti bedenini fazlasıyla yordu.",
          detay: "Yaşlanan beden eski dayanıklılığı vermiyor.",
        },
      },
      {
        metin: "Nazikçe reddet, artık dinlenme zamanın.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Reddin anlayışla karşılandı, hak ettiğin dinlenmeyi seçtin.",
          detay: "Bir ömür hizmet etmiş birinin dinlenmeye hakkı vardır.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Bazı gençler bunu hayal kırıklığıyla karşıladı.",
          detay: "Her emeklilik alkışlanmaz.",
        },
      },
    ],
  },
  {
    id: "yasli_tuccar_dukkani_devretmek",
    agirlik: 1.4,
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    minYas: 60,
    gorsel: "🏪",
    baslik: "Dükkanı Devretmek",
    metin: "Yıllardır emek verdiğin işini artık devretme zamanı geldi mi diye düşünüyorsun. Genç bir yardımcın işi devralmaya hazır görünüyor.",
    secenekler: [
      {
        metin: "Güven et, işi ona devret.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 8,
          dost_puani: 10,
          mesaj: "Genç yardımcın işi büyük bir titizlikle devraldı, mirasının devam ettiğini görmek seni gururlandırdı.",
          detay: "Emek bazen en iyi ellerde devam eder.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Genç yardımcı bazı hatalar yaptı, yıllar süren itibarına gölge düştü.",
          detay: "Her devir kusursuz gerçekleşmez.",
        },
      },
      {
        metin: "Hayır, dizginleri elinde tut.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "İşi elinde tutmaya devam ettin, alışkanlık sana güven veriyor.",
          detay: "Bazı insanlar için iş, hayatın kendisidir.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Yaşına rağmen işin tüm yükünü taşımak bedenini yordu.",
          detay: "Bırakmamak bazen bir bedel ister.",
        },
      },
    ],
  },
  {
    id: "yasli_din_adami_son_vaaz",
    agirlik: 1.4,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    minYas: 62,
    gorsel: "🕊️",
    baslik: "Son Vaaz",
    metin: "Sağlığın eskisi gibi değil ve cemaat, belki de en önemli vaazını vermen için seni kürsüye davet etti. Söyleyeceklerin uzun yıllar hatırlanabilir.",
    secenekler: [
      {
        metin: "Bir ömürlük bilgeliğini paylaş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 20,
          ahlak: 10,
          mutluluk: 8,
          mesaj: "Sözlerin cemaati gözyaşlarına boğdu, yıllarca anlatılacak bir vaaz verdin.",
          detay: "Bir ömrün özü birkaç cümleye sığabilir.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Heyecan ve yorgunluk seni fazlasıyla yordu, vaazı yarıda bırakmak zorunda kaldın.",
          detay: "Beden bazen ruhun isteğine yetişemez.",
        },
      },
      {
        metin: "Kısa, sade bir konuşma yap.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sade sözlerin yine de yürekten geldi, cemaat minnettar kaldı.",
          detay: "Bazen az söz çok şey anlatır.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "İçinde söylemek isteyip söyleyemediğin çok şey kaldığını hissettin.",
          detay: "Bazı sözler zamanında söylenmezse hep içeride kalır.",
        },
      },
    ],
  },
  {
    id: "derinlik_asker_agir_yara",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    yasakliEtiketler: [
      "kalici:tek_kolu_yok",
    ],
    gorsel: "🩸",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kılıçların Arasında",
    metin: "Meydan savaşının en yoğun anında, iki düşman askeri seni kıskaca aldı. Geri çekilmek onurunu zedeler, ama sonuna kadar dövüşmek çok riskli.",
    secenekler: [
      {
        metin: "Geri çekil, kalkanının ardına sığın.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: -5,
          mesaj: "Zamanında geri çekildin; kalkanın seni korudu.",
          detay: "Hayatta kalmak bazen geri adım atmayı gerektirir.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Geri çekilirken bile bir kılıç darbesi aldın.",
          detay: "Savaş meydanında güvenli köşe yoktur.",
        },
      },
      {
        metin: "Sonuna kadar dövüş, ikisine de karşı koy.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 30,
          para: 20,
          mesaj: "İkisini de alt ettin; birlik seni destansı bir kahraman gibi karşıladı.",
          detay: "Bu gün, savaş meydanında adının efsaneleştiği gün olarak anılacak.",
        },
        basarisizSonuc: {
          saglik: -40,
          un: 10,
          etiket_ekle: [
            "kalici:tek_kolu_yok",
          ],
          olum_sansi: 10,
          mesaj: "Bir kılıç darbesi kolunu kullanılamaz hale getirdi; cerrah kolu kurtaramadı.",
          detay: "Artık eskisi gibi savaşamayacaksın ama hayattasın — ve bu, bugün için yeterli.",
        },
      },
    ],
  },
  {
    id: "derinlik_asker_yakin_dovus",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sıra Dövüşü",
    metin: "Birliğin yakın dövüş hattına giriyor. Kumandan senden karar bekliyor: ön safta iki elinle mi savaşacaksın, yoksa geride mızrakla mı destek vereceksin?",
    secenekler: [
      {
        metin: "Ön safa geç, kılıcını iki elinle kullan.",
        baseBasariSansi: 55,
        yasakliEtiketler: [
          "kalici:tek_kolu_yok",
          "kalici:savas_travmasi",
        ],
        kilitAciklamasi: "Bedenin ve zihnin artık buna izin vermiyor.",
        basariliSonuc: {
          un: 20,
          para: 10,
          mesaj: "Ön safta gösterdiğin cesaret birliğin morali oldu.",
          detay: "Kimse önünde durmaya cesaret edemedi.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Ön saf ağır bedel istedi; yaralı ama ayaktasın.",
          detay: "Cesaretin bir bedeli oldu.",
        },
      },
      {
        metin: "Geride kal, mızrakla destek ver.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 5,
          mesaj: "Destek pozisyonun birliğin hattını korudu.",
          detay: "Her kahramanlık ön safta olmak zorunda değil.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Geride olsan da çarpışmanın kaosundan payını aldın.",
          detay: "Savaş meydanında tam güvenli yer yoktur.",
        },
      },
    ],
  },
  {
    id: "derinlik_asker_savas_travmasi",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    yasakliEtiketler: [
      "kalici:savas_travmasi",
    ],
    gorsel: "😨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kuşatmanın Sonu",
    metin: "Haftalarca süren bir kuşatmanın ardından şehir düştü. Sokaklarda gördüklerin, savaşın en çirkin yüzünü gösterdi. Bu görüntüler seninle kalacak mı?",
    secenekler: [
      {
        metin: "Gördüklerini bastır, göreve devam et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Gördüklerini bir kenara koyup göreve devam ettin.",
          detay: "Bazı askerler bunu başarabilir, bazıları sadece başarıyormuş gibi yapar.",
        },
        basarisizSonuc: {
          mutluluk: -25,
          etiket_ekle: [
            "kalici:savas_travmasi",
          ],
          mesaj: "Gördüklerin seni içten içe sarstı; geceleri artık aynı değil.",
          detay: "Savaş bazen bedeni değil, zihni yaralar — ve bu yara görünmez ama derin.",
        },
      },
      {
        metin: "Bir süre kenara çekil, kendine izin ver.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 5,
          un: -5,
          mesaj: "Kendine tanıdığın zaman iyi geldi; birkaç gün sonra daha güçlü döndün.",
          detay: "Kendine karşı nazik olmak zayıflık değildir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Geri çekilmen bazılarınca zayıflık sayıldı.",
          detay: "Herkes duygusal yükü aynı anlayışla karşılamıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_tuccar_lonca_ihanet",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    yasakliEtiketler: [
      "itibar:lonca_disi",
    ],
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Loncaya Sırt Çevirmek",
    metin: "Loncanın kurallarını çiğneyip rakip bir şehirle gizlice, çok kârlı bir anlaşma yapma fırsatın var. Ama bu, lonca tarafından öğrenilirse geri dönüşü olmayan bir ihanet sayılır.",
    secenekler: [
      {
        metin: "Fırsatı reddet, loncaya sadık kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 10,
          mesaj: "Sadakatini korudun; lonca içindeki yerin sağlam.",
          detay: "Bazı fırsatlar, güveni riske atmaya değmez.",
        },
        basarisizSonuc: {
          mesaj: "Reddettin ama fırsat aklından çıkmadı.",
          detay: "Bazı 'ne olurdu' düşünceleri uzun süre kalıyor.",
        },
      },
      {
        metin: "Gizlice anlaşmayı yap.",
        baseBasariSansi: 45,
        basariliSonuc: {
          mutluluk: -11,
          un: -5,
          para: 50,
          mesaj: "Anlaşma fark edilmeden gerçekleşti; cebin kabardı.",
          detay: "Bu kez şanslıydın, ama bu tür şanslar sonsuza dek sürmez.",
        },
        basarisizSonuc: {
          para: 20,
          un: -30,
          etiket_ekle: [
            "itibar:lonca_disi",
          ],
          mesaj: "İhanetin ortaya çıktı; lonca seni kapılarından sonsuza dek kovdu.",
          detay: "Artık loncanın himayesi ve ağı yok; her şeyi kendi başına yürütmek zorundasın.",
        },
      },
    ],
  },
  {
    id: "derinlik_din_papa_karsi_gelme",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    yasakliEtiketler: [
      "itibar:aforoz_edildi",
    ],
    gorsel: "⛔",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kiliseye Karşı Bir Söz",
    metin: "Üst makamların bir kararını vicdanına aykırı buluyorsun. Açıkça karşı çıkmak, kilise içindeki her şeyini kaybetme riski taşıyor.",
    secenekler: [
      {
        metin: "Sessiz kal, itaat et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -10,
          mesaj: "İtaat ettin; konumun güvende ama içinde bir ağırlık var.",
          detay: "Bazı sessizlikler bir bedel öder, sadece görünmez.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "İtaat etsen de vicdanın seni rahat bırakmadı.",
          detay: "Bazı düşünceler kolay susturulmuyor.",
        },
      },
      {
        metin: "Açıkça karşı çık.",
        baseBasariSansi: 40,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Cesaretin dikkat çekti; bazı üst makamlar bile sessizce seni destekledi.",
          detay: "Bazen doğru bildiğini söylemek, beklenmedik müttefikler kazandırır.",
        },
        basarisizSonuc: {
          ahlak: 15,
          un: -35,
          para: -25,
          etiket_ekle: [
            "itibar:aforoz_edildi",
          ],
          mesaj: "Karşı çıkışın aforozla sonuçlandı; artık resmi kilise çevrelerinde bir yerin yok.",
          detay: "Vicdanın rahat, ama artık bambaşka, çok daha yalnız bir yoldasın.",
        },
      },
    ],
  },
  {
    id: "derinlik_asker_krala_karsi",
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    yasakliEtiketler: [
      "itibar:kralin_dusmani",
    ],
    gorsel: "👑",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Krala Karşı Bir Duruş",
    metin: "Kral, açıkça haksız ve zalimce bir emir verdi: masum bir köyün cezalandırılması. Vicdanın buna karşı çıkmanı istiyor ama bunun bedeli çok ağır olabilir.",
    secenekler: [
      {
        metin: "Emri sessizce yerine getir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -20,
          un: 10,
          mesaj: "Emri yerine getirdin; kral memnun ama vicdanın asla aynı olmayacak.",
          detay: "Bazı emirler, yerine getirilse bile insanı bir daha eskisi gibi bırakmıyor.",
        },
        basarisizSonuc: {
          ahlak: -25,
          saglik: -10,
          mesaj: "Emri yerine getirdin ama köylülerin feryatları uykularını bölecek.",
          detay: "Bazı görevler, kazanılsa bile bir yenilgi gibi hissettiriyor.",
        },
      },
      {
        metin: "Emri açıkça reddet.",
        baseBasariSansi: 40,
        basariliSonuc: {
          ahlak: 30,
          dost_puani: 15,
          mesaj: "Reddin cesaret örneği oldu; birliğinden bazıları seninle aynı safta durdu.",
          detay: "Bazen bir kişinin cesareti başkalarını da cesaretlendirir.",
        },
        basarisizSonuc: {
          ahlak: 20,
          para: -35,
          un: -20,
          etiket_ekle: [
            "itibar:kralin_dusmani",
          ],
          mesaj: "Reddin krala bildirildi; artık resmi olarak 'kralın düşmanı' ilan edildin.",
          detay: "Vicdanın huzurlu, ama artık başını her an kaybedebileceğin bir hayat sürüyorsun.",
        },
      },
    ],
  },
  {
    id: "derinlik_tuccar_ipek_ticareti",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    minRutbeSeviye: 2,
    gorsel: "🧵",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Uzak Diyarların İpeği",
    metin: "Doğudan gelen bir kervan, eşi görülmemiş kalitede ipek getirdi. Tüm servetini bu tek yükleme yatırırsan ya efsanevi bir kazanç ya da büyük bir kayıp seni bekliyor.",
    secenekler: [
      {
        metin: "Tüm sermayeni ipeğe yatır.",
        baseBasariSansi: 50,
        maliyet: 40,
        basariliSonuc: {
          para: 80,
          un: 20,
          unvan_kazan: "İpek Kralı",
          mesaj: "İpek, pazarda inanılmaz bir fiyata satıldı; adın artık şehrin en zengin tüccarlarıyla anılıyor.",
          detay: "İnsanlar seni artık sadece adınla değil, 'İpek Kralı' diye anmaya başladı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -45,
          mesaj: "İpeğin çoğu yolda neme yenik düştü; yatırımın büyük ölçüde boşa gitti.",
          detay: "Büyük hayaller bazen büyük kayıplarla sonuçlanıyor.",
        },
      },
      {
        metin: "Küçük bir miktar al, temkinli kal.",
        baseBasariSansi: 85,
        maliyet: 15,
        basariliSonuc: {
          para: 20,
          mesaj: "Küçük yatırımın güvenli bir kazanç getirdi.",
          detay: "Temkinlilik her zaman en heyecanlısı değildir ama güvenlidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Küçük yatırımın bile beklediğin gibi sonuçlanmadı.",
          detay: "Bazı günler pazarın nabzı elden kaçıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_asker_destansi_zafer",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    minRutbeSeviye: 2,
    gerekliUlke: {
      savasta: true,
    },
    gorsel: "🏆",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Destansı Bir Savunma",
    metin: "Küçük birliğin, sayıca çok üstün bir düşman dalgasına karşı bir geçidi savunmakla görevlendirildi. Bu, ya efsaneye ya da unutulmuşluğa gidecek bir gün.",
    secenekler: [
      {
        metin: "Geçidi sonuna kadar savun.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 35,
          para: 25,
          unvan_kazan: "Cesur Yürek",
          mesaj: "Geçidi tek başınıza tuttunuz; düşman sonunda geri çekildi. Bu gün destanlara konu oldu.",
          detay: "Askerler artık senden 'Cesur Yürek' diye söz ediyor.",
        },
        basarisizSonuc: {
          saglik: -40,
          un: 15,
          olum_sansi: 15,
          mesaj: "Geçit düştü ama direnişiniz düşmana ağır kayıplar verdirdi.",
          detay: "Yenilgi bile bazen onurlu olabilir.",
        },
      },
      {
        metin: "Düzenli bir şekilde geri çekil.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Geri çekildiniz; kayıp vermeden güvenli bölgeye ulaştınız.",
          detay: "Her gün destansı olmak zorunda değil.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Geri çekilme sırasında küçük çaplı bir çatışma yaşandı.",
          detay: "Güvenli görünen yollar bile risk taşıyabilir.",
        },
      },
    ],
  },
  {
    id: "derinlik_din_mucize_sifa",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    minRutbeSeviye: 2,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Umutsuz Bir Vaka",
    metin: "Hekimlerin çaresiz kaldığı bir hasta sana getirildi. Dua ve bakımınla ona umut vermeyi deneyebilirsin, ama sonuç garanti değil.",
    secenekler: [
      {
        metin: "Gece gündüz yanından ayrılma, dua et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 30,
          ahlak: 15,
          unvan_kazan: "Şifa Veren",
          mesaj: "Hasta beklenmedik şekilde iyileşti; halk bunu bir mucize olarak anlattı.",
          detay: "Artık seni 'Şifa Veren' diye çağırıyorlar, sen ise sadece elinden geleni yaptığını biliyorsun.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          saglik: -5,
          mesaj: "Tüm çabana rağmen hasta kurtarılamadı.",
          detay: "Bazı kayıplar, ne kadar çaba gösterirsen göster önlenemiyor.",
        },
      },
      {
        metin: "Elinden geleni yap ama fazla umut verme.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Ölçülü yaklaşımın hem hastaya hem sana iyi geldi.",
          detay: "Her zaman en uçta olmak gerekmiyor.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Hasta kurtarılamadı ama elinden geleni yaptığını biliyorsun.",
          detay: "Vicdan rahatlığı bazen tek tesellidir.",
        },
      },
    ],
  },
  {
    id: "derinlik_soylu_olumu",
    kategori: "siyaset",
    minYas: 20,
    agirlik: 0.5,
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kader Anı",
    metin: "Bir anlaşmazlık şiddetli bir çatışmaya dönüştü; karşındaki, güçlü ve kalabalık bir soylu ailesinin oğluymuş. Elinde olmadan onun ölümüne sebep oldun.",
    secenekler: [
      {
        metin: "Olayı gizlemeye çalış, sessiz kal.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: -15,
          durum_ekle: {
            id: "kan_davasi_beklemede",
            ad: "Kan Davası — Beklemede",
            tur: "gecici",
            kalan_tur: 8,
            bitince_etiket: "kandavasi:zamani",
          },
          mesaj: "Olayı örtbas etmeyi başardın, ama vicdanın ve içindeki korku seni bırakmıyor.",
          detay: "Bazı sırlar sessizce beklerken bile ağırlığını hissettiriyor.",
        },
        basarisizSonuc: {
          ahlak: -20,
          un: -15,
          durum_ekle: {
            id: "kan_davasi_beklemede",
            ad: "Kan Davası — Beklemede",
            tur: "gecici",
            kalan_tur: 5,
            bitince_etiket: "kandavasi:zamani",
          },
          mesaj: "Gerçek kısa sürede ortaya çıktı; ailenin gözü artık üzerinde.",
          detay: "Bazı sırlar, saklanmaya çalışıldıkça daha hızlı yayılıyor.",
        },
      },
      {
        metin: "Aileye açıkça haber gönder, hesap ver.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 15,
          para: -25,
          mesaj: "Dürüstlüğün aileyi biraz yumuşattı; kan parası ödeyerek anlaşma sağladın.",
          detay: "Bazı hesaplar parayla kapanabiliyor — ama hepsi değil.",
        },
        basarisizSonuc: {
          ahlak: 8,
          durum_ekle: {
            id: "kan_davasi_beklemede",
            ad: "Kan Davası — Beklemede",
            tur: "gecici",
            kalan_tur: 6,
            bitince_etiket: "kandavasi:zamani",
          },
          mesaj: "Dürüstlüğün aileyi yumuşatmadı; öfkeleri daha da büyüdü.",
          detay: "Bazı aileler için hiçbir özür yeterli değildir.",
        },
      },
    ],
  },
  {
    id: "derinlik_kan_davasi_suikast",
    kategori: "siyaset",
    gerekliEtiketler: [
      "kandavasi:zamani",
    ],
    agirlik: 1.4,
    gorsel: "🔪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gecenin Karanlığından",
    metin: "Yıllar sonra, unuttuğunu sandığın o kan davası seni buldu. Karanlık bir sokakta, üzerine bir suikastçı saldırdı.",
    secenekler: [
      {
        metin: "Karşı koy, dövüş.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 20,
          etiket_sil: [
            "kandavasi:zamani",
          ],
          mesaj: "Suikastçıyı etkisiz hale getirdin; kan davası nihayet kapandı.",
          detay: "Yıllardır omzunda taşıdığın bir yük, bu gece son buldu.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 20,
          etiket_sil: [
            "kandavasi:zamani",
          ],
          mesaj: "Ağır yaralandın ama suikastçı da kaçtı; en azından tehdit bir süreliğine geri çekildi.",
          detay: "Bu gece hayatta kaldın, ama bedeli ağır oldu.",
        },
      },
      {
        metin: "Kaç, yardım çağır.",
        baseBasariSansi: 65,
        basariliSonuc: {
          etiket_sil: [
            "kandavasi:zamani",
          ],
          para: -20,
          mesaj: "Kaçmayı başardın; sonrasında ailenle gizlice bir anlaşmaya vardın, kan davası kapandı.",
          detay: "Bazı savaşlar kaçarak da kazanılabiliyor.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Kaçarken yakalandın, kısa ama şiddetli bir çatışma yaşandı; suikastçı sonunda vazgeçip gitti.",
          detay: "Kan davası hâlâ üzerinde bir gölge gibi duruyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_din_veba_bakimi",
    kategori: "saglik",
    meslekler: [
      "Din Adamı",
    ],
    yasakliEtiketler: [
      "tibbi:veba_bagisik",
      "tibbi:sifaci",
    ],
    agirlik: 0.6,
    gorsel: "⚕️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Vebalıların Arasında",
    metin: "Şehirde veba yayılıyor ve hastalara bakacak kimse kalmadı. Onlara bakmak seni de hastalığa maruz bırakabilir, ama tıbbi bilgin zamanla bağışıklık ya da şifa yeteneği kazandırabilir.",
    secenekler: [
      {
        metin: "Hastalara bizzat bak, tekniklerini geliştir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          etiket_ekle: [
            "tibbi:sifaci",
          ],
          mesaj: "Haftalarca süren bakımın sonunda, hastalığı tedavi etmenin inceliklerini öğrendin.",
          detay: "Artık sadece dua etmiyor, gerçekten şifa dağıtabiliyorsun.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 8,
          etiket_ekle: [
            "tibbi:veba_bagisik",
          ],
          mesaj: "Sen de hastalandın ama vücudun mücadeleyi kazandı; artık vebaya karşı bağışıksın.",
          detay: "Yaşadığın bu zorlu deneyim, garip bir şekilde seni daha güçlü kıldı.",
        },
      },
      {
        metin: "Uzaktan dua et, riske girme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Uzaktan dua ettin; güvende kaldın.",
          detay: "Her cesaret, riski göze almayı gerektirmiyor.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Uzak durman bazı cemaat üyelerince eleştirildi.",
          detay: "Herkes aynı ölçüde cesaret beklemiyor olsa da bazıları öyle.",
        },
      },
    ],
  },
  {
    id: "derinlik_veba_salgini_ikinci_dalga",
    kategori: "saglik",
    meslekler: [
      "Din Adamı",
    ],
    gerekliUlke: {
      vebada: true,
    },
    agirlik: 0.7,
    gorsel: "☠️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Salgının İkinci Dalgası",
    metin: "Veba yeniden hız kazandı. Hastane dolup taştı, yardım eli daha da azaldı.",
    secenekler: [
      {
        metin: "Bağışıklığına güvenerek hastalara özgürce yardım et.",
        baseBasariSansi: 90,
        gerekliEtiketler: [
          "tibbi:veba_bagisik",
        ],
        kilitAciklamasi: "Bağışıklığın yok; bu kadar özgürce yaklaşmak çok riskli olur.",
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          mesaj: "Bağışıklığın sayesinde korkusuzca hastalara yardım ettin; halk seni bir kahraman gibi gördü.",
          detay: "Geçmişteki acın, şimdi başkalarını kurtarmana yarıyor.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Bağışıklığın seni korusa da tükenmişlik hissi ağır bastı.",
          detay: "Beden dayanıklı olsa da ruh yorulabiliyor.",
        },
      },
      {
        metin: "Şifacılık bilgini kullanarak hastalara bak.",
        baseBasariSansi: 70,
        gerekliEtiketler: [
          "tibbi:sifaci",
        ],
        kilitAciklamasi: "Bu tekniği bilmiyorsun.",
        basariliSonuc: {
          ahlak: 18,
          un: 12,
          saglik: -5,
          mesaj: "Bilgin sayesinde birçok hastayı iyileştirdin.",
          detay: "Öğrendiğin teknikler tam da böyle bir anda işine yaradı.",
        },
        basarisizSonuc: {
          saglik: -20,
          mesaj: "Bilgine rağmen bu dalga daha da acımasızdı.",
          detay: "Her bilgi her felaketi durduramıyor.",
        },
      },
      {
        metin: "Mesafeni koru, sadece dua et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Mesafeni korudun; güvende kaldın.",
          detay: "Bazı günler sadece hayatta kalmak yeterlidir.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Güvende kalman içini rahatsız etti; yardım edemediğin için kendini suçladın.",
          detay: "Bazı güvenli seçimler vicdanı rahatsız edebiliyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_afyon_teklifi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "bagimlilik:afyon",
    ],
    agirlik: 0.5,
    gorsel: "💊",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ağrı Kesici Bir Teklif",
    metin: "Zorlu bir dönemin ardından bir tanıdığın, acılarını hafifletmen için sana afyon özütü öneriyor. Rahatlatıcı olduğu kesin ama bağımlılık riski de öyle.",
    secenekler: [
      {
        metin: "Bir kez dene, rahatlamak istiyorsun.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 8,
          mesaj: "Acın bir süreliğine dindi; kendini hafiflemiş hissettin.",
          detay: "Rahatlama gerçek ama geçici.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          etiket_ekle: [
            "bagimlilik:afyon",
            "bagimlilik:var",
          ],
          durum_ekle: {
            id: "afyon_bagimliligi",
            ad: "Afyon Bağımlılığı",
            tur: "kalici",
            tur_basi_saglik: -3,
          },
          mesaj: "Rahatlama o kadar iyi geldi ki, bir daha ve bir daha kullandın. Artık ondan kolayca vazgeçemiyorsun.",
          detay: "Acını dindiren şey, sessizce yeni bir acıya dönüştü.",
        },
      },
      {
        metin: "Reddet, acıyla başka türlü baş et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Reddettin; acınla başka yollarla baş etmeyi seçtin.",
          detay: "Zor yol, çoğu zaman daha sağlam bir yoldur.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Reddetmek kolay olmadı, acın bir süre daha sürdü.",
          detay: "Bazı zorluklar, kaçış olmadan aşılıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_bagimliliktan_kurtulma",
    kategori: "sosyal",
    gerekliEtiketler: [
      "bagimlilik:var",
    ],
    agirlik: 0.9,
    gorsel: "🌅",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bir Uyanış Anı",
    metin: "Aynada kendine baktığında, bağımlılığının seni ne hale getirdiğini fark ettin. Belki de artık değişmenin vaktidir.",
    secenekler: [
      {
        metin: "Bağımlılığından kurtulmak için iradeyle savaş ver.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: 20,
          mutluluk: 8,
          etiket_sil: [
            "bagimlilik:kumarbaz",
            "bagimlilik:afyon",
            "bagimlilik:var",
          ],
          durum_sil: [
            "kumar_bagimliligi",
            "afyon_bagimliligi",
          ],
          mesaj: "Uzun ve cehennem gibi bir mücadelenin ardından bağımlılığından tamamen kurtuldun.",
          detay: "Bu, hayatta kazandığın en zor ama en değerli zaferlerden biri.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          mesaj: "Mücadele ettin ama yoksunluk krizlerine dayanamadın; eski alışkanlığına gözyaşlarıyla geri döndün.",
          detay: "Bazı zincirler bir denemede kırılmıyor.",
        },
      },
      {
        metin: "Şimdilik erteleme, başka bir güne bırak.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Değişimi ertelemeye karar verdin; belki başka bir gün.",
          detay: "Bazı kararlar için doğru an henüz gelmemiş olabilir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Erteleme kararı içinde karanlık bir huzursuzluk bıraktı.",
          detay: "Bazen erteleme de kendi ağırlığını taşıyor.",
        },
      },
    ],
  },
  {
    id: "global_kitlik_baslangici",
    kategori: "saglik",
    agirlik: 0.35,
    gerekliUlke: {
      kriz: null,
    },
    gorsel: "🌾",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kuraklığın Gölgesi",
    metin: "Bu yıl yağmurlar gecikti, ekinler kavruldu. Bölgede bir kıtlığın habercisi olan işaretler görülüyor.",
    secenekler: [
      {
        metin: "Ambarındaki fazlalığı komşularınla paylaş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: -15,
          ahlak: 15,
          kriz_baslat: {
            tur: "kitlik",
            sureYil: 5,
          },
          mesaj: "Elindekini paylaştın; kıtlık başlıyor ama en azından vicdanın rahat.",
          detay: "Zor günler yaklaşıyor, ama yalnız değilsin.",
        },
        basarisizSonuc: {
          para: -15,
          kriz_baslat: {
            tur: "kitlik",
            sureYil: 5,
          },
          mesaj: "Paylaşman yeterli bulunmadı; kıtlık başlıyor.",
          detay: "Zor bir dönem kapıda.",
        },
      },
      {
        metin: "Kendi ambarını koru, önce kendine bak.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: -10,
          kriz_baslat: {
            tur: "kitlik",
            sureYil: 5,
          },
          mesaj: "Kendi payını korudun; kıtlık yine de bölgeyi sarıyor.",
          detay: "Bencilliğin seni biraz daha güvende tutacak.",
        },
        basarisizSonuc: {
          ahlak: -15,
          kriz_baslat: {
            tur: "kitlik",
            sureYil: 5,
          },
          mesaj: "Bencilliğin fark edildi, itibarın sarsıldı.",
          detay: "Zor zamanlar insanların gerçek yüzünü ortaya çıkarıyor.",
        },
      },
    ],
  },
  {
    id: "global_isyan_baslangici",
    kategori: "siyaset",
    agirlik: 0.3,
    gerekliUlke: {
      kriz: null,
    },
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sokaklarda Gerginlik",
    metin: "Vergilere ve yönetime duyulan öfke sokaklara taştı. Küçük gösteriler, büyük bir isyanın habercisi olabilir.",
    secenekler: [
      {
        metin: "Gösterilere sessizce göz yum, karışma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          kriz_baslat: {
            tur: "isyan",
            sureYil: 4,
          },
          mesaj: "Karışmadın; ama gerginlik büyüyerek bir isyana dönüştü.",
          detay: "Bazı fırtınalar durdurulamaz, sadece beklenir.",
        },
        basarisizSonuc: {
          saglik: -10,
          kriz_baslat: {
            tur: "isyan",
            sureYil: 4,
          },
          mesaj: "Karışmasan da kaosun bir kısmından payını aldın.",
          detay: "Sokaklar artık güvenli değil.",
        },
      },
      {
        metin: "Yetkilileri uyar, önlem alınmasını iste.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 15,
          mesaj: "Uyarın dikkate alındı; küçük önlemlerle gerginlik bir süreliğine yatıştı.",
          detay: "Bu kez felaket ertelendi.",
        },
        basarisizSonuc: {
          un: -5,
          kriz_baslat: {
            tur: "isyan",
            sureYil: 4,
          },
          mesaj: "Uyarın dikkate alınmadı; gerginlik isyana dönüştü.",
          detay: "Bazı uyarılar duyulmuyor.",
        },
      },
    ],
  },
  {
    id: "global_altin_cag_baslangici",
    kategori: "ticaret",
    agirlik: 0.3,
    gerekliUlke: {
      kriz: null,
    },
    gorsel: "🌟",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bolluğun Başlangıcı",
    metin: "Bereketli bir hasat, yeni ticaret yolları ve huzurlu bir dönem bir araya geldi. Bölge bir refah dönemine giriyor gibi.",
    secenekler: [
      {
        metin: "Bu bereketten sen de payını al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 16,
          kriz_baslat: {
            tur: "altin_cag",
            sureYil: 5,
          },
          mesaj: "Bereketli döneme sen de ortak oldun; bölge bir altın çağa giriyor.",
          detay: "Bazı dönemler herkese bolluk getirir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -25,
          kriz_baslat: {
            tur: "altin_cag",
            sureYil: 5,
          },
          mesaj: "Fırsatı tam değerlendiremesen de bölge genelinde bolluk başlıyor.",
          detay: "Herkes aynı hızda faydalanamıyor.",
        },
      },
      {
        metin: "Temkinli ol, bu bolluğun geçici olduğunu düşün.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 6,
          kriz_baslat: {
            tur: "altin_cag",
            sureYil: 5,
          },
          mesaj: "Temkinli kalsan da bölge bir altın çağa giriyor.",
          detay: "Bazı iyi dönemler temkinsiz olmayı da hak eder.",
        },
        basarisizSonuc: {
          kriz_baslat: {
            tur: "altin_cag",
            sureYil: 5,
          },
          mesaj: "Temkinliliğin seni bazı fırsatlardan alıkoydu.",
          detay: "Herkes bu bolluğun tadını aynı çıkaramıyor.",
        },
      },
    ],
  },
  {
    id: "nemesis_fiyat_kirma",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    maxRakipPuani: 30,
    agirlik: 0.6,
    gorsel: "😤",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rakibin Oyunu",
    metin: "Önemli bir müşteriyle anlaşmanın eşiğindeyken, {rakip} aniden ortaya çıkıp fiyatını senin yarına indirdiğini duyurdu. Müşteri şimdi tereddütte.",
    secenekler: [
      {
        metin: "Sen de fiyatını düşür, savaşı kabul et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 2,
          para: 8,
          rakip_puani: -10,
          mesaj: "Müşteriyi tuttun ama kâr marjın {rakip} yüzünden eridi.",
          detay: "Bu savaşı kazandın, ama pahalıya patladı.",
        },
        basarisizSonuc: {
          para: -15,
          rakip_puani: -10,
          mesaj: "Fiyat savaşı seni de yordu, müşteri yine de {rakip}'e gitti.",
          detay: "Bazı savaşlar kaybedilmeye mahkum.",
        },
      },
      {
        metin: "Fiyatını koru, kaliteni öne çıkar.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -6,
          para: 16,
          un: 6,
          mesaj: "Müşteri kaliteni takdir etti, {rakip}'in ucuz oyununa itibar etmedi.",
          detay: "Bazen fiyat değil, güven kazandırır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Müşteri ucuz fiyata kanıp {rakip}'e gitti.",
          detay: "Her müşteri kaliteyi önemsemiyor.",
        },
      },
    ],
  },
  {
    id: "nemesis_muhafiz_ihbari",
    kategori: "siyaset",
    maxRakipPuani: 25,
    agirlik: 0.5,
    gorsel: "🚨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rakibin İhbarı",
    metin: "{rakip}, seni küçük bir yasa dışılıkla muhafızlara ihbar etti — çoğu abartılmış, bazısı gerçek. Şimdi hesap vermen gerekiyor.",
    secenekler: [
      {
        metin: "Muhafızlara açıkça anlat, gerçeği söyle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 10,
          rakip_puani: -10,
          mesaj: "Dürüstlüğün muhafızları ikna etti; {rakip}'in ihbarı boşa çıktı.",
          detay: "Gerçek, çoğu zaman en iyi savunmadır.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Açıklaman yeterli bulunmadı, küçük bir ceza ödedin.",
          detay: "Bazı ihbarlar tam boşa çıkmıyor.",
        },
      },
      {
        metin: "Muhafızlara rüşvet vererek işi kapat.",
        baseBasariSansi: 65,
        maliyet: 20,
        basariliSonuc: {
          ahlak: -10,
          mesaj: "Rüşvet işe yaradı, mesele kapandı.",
          detay: "Bazı sorunlar parayla susturulabiliyor — ama vicdanın bunu biliyor.",
        },
        basarisizSonuc: {
          ahlak: -15,
          para: -20,
          un: -15,
          mesaj: "Rüşvet teklifin fark edildi, hem para hem itibar kaybettin.",
          detay: "Her rüşvet gizli kalmıyor.",
        },
      },
    ],
  },
  {
    id: "kelebek_multeci_kurtarma",
    kategori: "sosyal",
    agirlik: 0.5,
    yasakliEtiketler: [
      "kelebek_multeci_gordu",
    ],
    gorsel: "🧳",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yolun Kenarındaki Yabancı",
    metin: "Yolun kenarında, aç ve bitkin bir yabancı gördün — savaştan ya da açlıktan kaçan bir mülteci. Ona yardım etmek küçük bir masraf, ama zamanın kısıtlı.",
    secenekler: [
      {
        metin: "Ona yemek ver, bir gecelik barınak sağla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -10,
          ahlak: 12,
          etiket_ekle: [
            "kelebek_multeci_gordu",
          ],
          durum_ekle: {
            id: "multeci_iyiligi",
            ad: "Unutulmuş Bir İyilik",
            tur: "gecici",
            kalan_tur: 12,
            bitince_etiket: "kelebek:multeci_donus",
          },
          mesaj: "Yabancıya yardım ettin; adını bile sormadan yoluna devam etti.",
          detay: "Bazı iyilikler, kimin için yapıldığı unutulsa bile bir yerde iz bırakır.",
        },
        basarisizSonuc: {
          para: -10,
          etiket_ekle: [
            "kelebek_multeci_gordu",
          ],
          durum_ekle: {
            id: "multeci_iyiligi",
            ad: "Unutulmuş Bir İyilik",
            tur: "gecici",
            kalan_tur: 12,
            bitince_etiket: "kelebek:multeci_donus",
          },
          mesaj: "Yardımın biraz beceriksizce oldu ama yine de elini uzattın.",
          detay: "Niyet bazen icradan daha çok şey ifade eder.",
        },
      },
      {
        metin: "Görmezden gel, yoluna devam et.",
        baseBasariSansi: 95,
        basariliSonuc: {
          etiket_ekle: [
            "kelebek_multeci_gordu",
          ],
          mesaj: "Görmezden geldin, yoluna devam ettin.",
          detay: "Bazı anlar fark edilmeden geçip gider.",
        },
        basarisizSonuc: {
          ahlak: -5,
          etiket_ekle: [
            "kelebek_multeci_gordu",
          ],
          mesaj: "Görmezden gelmen içini biraz rahatsız etti.",
          detay: "Bazı görmezden gelmeler vicdanda iz bırakır.",
        },
      },
    ],
  },
  {
    id: "kelebek_multeci_vali_donusu",
    kategori: "siyaset",
    gerekliEtiketler: [
      "kelebek:multeci_donus",
    ],
    agirlik: 1.2,
    gorsel: "🎖️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Tanıdık Bir Yüz, Yeni Bir Unvan",
    metin: "Yeni atanan valiyle tanışma töreninde, onun yıllar önce yardım ettiğin o bitkin yabancı olduğunu fark ettin. Seni de tanıdı.",
    secenekler: [
      {
        metin: "Onu hatırlat, eski günlerden söz et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 40,
          un: 20,
          etiket_sil: [
            "kelebek:multeci_donus",
          ],
          mesaj: "Vali seni sıcak karşıladı; yıllar önceki iyiliğin unutulmamış. Sana cömert bir karşılık verdi.",
          detay: "Bazı iyilikler, en beklenmedik zamanda geri döner.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -40,
          etiket_sil: [
            "kelebek:multeci_donus",
          ],
          mesaj: "Vali seni hatırladı ama kalabalık araya girdi, konuşma yarım kaldı.",
          detay: "Bazı fırsatlar tam yakalanamıyor, yine de sıcak bir anı olarak kalıyor.",
        },
      },
      {
        metin: "Alçakgönüllü kal, hiçbir şey isteme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 15,
          ahlak: 10,
          etiket_sil: [
            "kelebek:multeci_donus",
          ],
          mesaj: "Hiçbir şey istemeden geri çekildin; vali bu alçakgönüllülüğü unutmadı, adın olumlu anıldı.",
          detay: "Bazen en iyi karşılık, karşılık beklememektir.",
        },
        basarisizSonuc: {
          etiket_sil: [
            "kelebek:multeci_donus",
          ],
          mesaj: "Geri çekilmen fark edilmedi bile.",
          detay: "Her alçakgönüllülük fark edilmiyor, ama yine de değerlidir.",
        },
      },
    ],
  },
  {
    id: "istihbarat_dedikoducu",
    kategori: "sosyal",
    agirlik: 0.7,
    yasakliEtiketler: [
      "istihbarat_var",
    ],
    gorsel: "🗞️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kulağı Delik Bir Dedikoducu",
    metin: "Meyhanede tanıdığın bir dedikoducu, yaklaşan bir olay hakkında 'içeriden bilgi' sızdırabileceğini söylüyor — tabii bir bedel karşılığında.",
    secenekler: [
      {
        metin: "Bilgiyi satın al.",
        baseBasariSansi: 90,
        maliyet: 15,
        basariliSonuc: {
          para: -10,
          etiket_ekle: [
            "istihbarat_var",
          ],
          mesaj: "Dedikoducu sana bir sonraki fırsat hakkında net bilgi verdi.",
          detay: "Artık kararını daha net bir tabloya bakarak vereceksin.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Dedikoducu parayı aldı ama söylediği bilgi pek işe yaramadı.",
          detay: "Her bilgi kaynağı güvenilir değil.",
        },
      },
      {
        metin: "İlgilenme, kendi sezgine güven.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Teklifi reddettin, kendi sezgine güvenmeyi seçtin.",
          detay: "Bazen en iyi rehber kendi içgüdündür.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddettin ama sonrasında merak etmeden edemedin.",
          detay: "Merak bazen peşini bırakmıyor.",
        },
      },
    ],
  },
  {
    id: "efsanevi_olum_kuyu",
    kategori: "sosyal",
    agirlik: 0.15,
    ton: "hafif",
    gorsel: "🕳️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kendi Kazdığın Çukur",
    metin: "Bahçende uzun zamandır kazmakta olduğun bir kuyu neredeyse bitti. Bu akşam son bir kazma daha vurmak istiyorsun, hava kararmış olsa da.",
    secenekler: [
      {
        metin: "Karanlıkta bile olsa devam et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 10,
          mesaj: "Kuyuyu karanlıkta da olsa bitirdin; su bulman köyde konuşuldu.",
          detay: "Azmin bu kez ödüllendirildi.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Kendi Kazdığı Kuyuya Düşen",
          mesaj: "Karanlıkta ayağın kaydı ve kendi kazdığın kuyuya düştün.",
          detay: "Köylüler bu olayı uzun yıllar anlatacak — ders çıkarılası, biraz da gülünesi bir son.",
        },
      },
      {
        metin: "Işık gelene kadar bekle, sabahı bul.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sabahı bekledin; kuyu ertesi gün güvenle tamamlandı.",
          detay: "Sabır bazen en akıllıca seçimdir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Bekleme canını sıktı ama güvenliydin.",
          detay: "Bazı sabırsızlıklar bedelsiz geçmiyor.",
        },
      },
    ],
  },
  {
    id: "efsanevi_olum_keci_kovalama",
    kategori: "sosyal",
    agirlik: 0.15,
    ton: "hafif",
    gorsel: "🐐",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kaçan Keçi",
    metin: "En inatçı keçin ipini koparıp kasabanın ortasına daldı. Peşinden koşan sen oldun, ama keçi seni pazar meydanının en kalabalık yerine sürüklüyor.",
    secenekler: [
      {
        metin: "Son sürat kovala, yakalamaya çalış.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 6,
          un: 5,
          mesaj: "Keçiyi büyük bir alkış eşliğinde yakaladın; kasaba günlerce bunu konuştu.",
          detay: "Bazı zaferler küçük ama unutulmaz.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Keçi Kovalarken Kervan Arabasının Altında Kalan",
          mesaj: "Keçiyi kovalarken sokağa fırladın ve hızla gelen bir kervan arabasının altında kaldın.",
          detay: "Kasaba halkı bu talihsiz ama bir o kadar da gülünç sonu yıllarca anlatacak.",
        },
      },
      {
        metin: "Vazgeç, keçiyi kendi haline bırak.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -5,
          mesaj: "Keçiyi kovalamaktan vazgeçtin; birisi onu bulup sana getirdi.",
          detay: "Bazen pes etmek de işe yarıyor.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Keçiyi bir daha göremedin.",
          detay: "Bazı kayıplar küçük ama yine de üzücü.",
        },
      },
    ],
  },
  {
    id: "din_katolik_gunah_cikarma",
    kategori: "din",
    gerekliDin: "Katolik",
    agirlik: 0.7,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Günah Çıkarma",
    metin: "Papaz seni günah çıkarma odasına çağırdı. İçini dökmek huzur verebilir, ama bazı sırların ağzından kaçması da işten değil.",
    secenekler: [
      {
        metin: "Her şeyi olduğu gibi anlat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 15,
          mutluluk: 5,
          mesaj: "İçini dökmek büyük bir yük kaldırdı; günlerdir ilk kez rahat uyudun.",
          detay: "Papaz sırrını mezara kadar taşıyacağına yemin etti.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Papaz ağzından kaçırdı, dediğin bir iki kişiye ulaştı.",
          detay: "Bazı sırlar itiraf kürsüsünden bile sızabiliyormuş.",
        },
      },
      {
        metin: "Yüzeysel geç, asıl günahını sakla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Ayine katıldın ama içindeki asıl ağırlık yerinde kaldı.",
          detay: "Bazı şeyleri sadece kendine söylemek yetmiyor.",
        },
        basarisizSonuc: {
          ahlak: -5,
          mesaj: "Papaz senin bir şeyler sakladığını sezdi, tuhaf bir bakış attı.",
          detay: "Yarım gerçekler bazen tam bir yalandan daha rahatsız edici.",
        },
      },
      {
        metin: "Kendi günahın yerine papazın sakladığı sırrı fısılda.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        basariliSonuc: {
          para: 45,
          ahlak: -20,
          mesaj: "Papazın o şarap tüccarıyla olan kirli işlerini bildiğini fısıldadın. Sana sus payı olarak kilisenin sadaka kutusunu verdi.",
          detay: "Kutsal mekanda bile şeytanın avukatlığını yapmayı başardın.",
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -15,
          mesaj: "Papaz öfkeyle bağırıp seni aforoz etmekle tehdit etti. Kiliseyi terk etmek zorunda kaldın.",
        },
      },
    ],
  },
  {
    id: "din_katolik_hac_daveti",
    kategori: "din",
    gerekliDin: "Katolik",
    agirlik: 0.5,
    gorsel: "⛪",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kutsal Topraklara Davet",
    metin: "Bir hac kervanı kutsal topraklara doğru yola çıkıyor; katılmak hem masraflı hem tehlikeli ama manevi olarak büyük bir dönüşüm vaat ediyor.",
    secenekler: [
      {
        metin: "Kervana katıl, yola çık.",
        baseBasariSansi: 65,
        maliyet: 15,
        basariliSonuc: {
          ahlak: 18,
          un: 6,
          mesaj: "Kutsal topraklara ulaştın; döndüğünde eskisinden farklı bir insandın.",
          detay: "Bu yolculuğu anlatırken sesin bile değişiyor.",
        },
        basarisizSonuc: {
          saglik: -10,
          para: -10,
          mesaj: "Yol seni hasta etti, yarı yolda geri dönmek zorunda kaldın.",
          detay: "Bazı yolculuklar tamamlanmadan da bir şeyler öğretiyor.",
        },
      },
      {
        metin: "Katılma, kendi cemaatinde kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Evinde kalmayı tercih ettin; kervan sensiz yola çıktı.",
          detay: "Belki başka bir yıl.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kervanın ardından bakarken içinde hafif bir pişmanlık hissettin.",
          detay: "Bazı fırsatlar bir daha gelmiyor.",
        },
      },
    ],
  },
  {
    id: "din_ortodoks_ikona_mucizesi",
    kategori: "din",
    gerekliDin: "Ortodoks",
    agirlik: 0.7,
    gorsel: "☦️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "İkonanın Önünde",
    metin: "Kilisedeki eski ikonanın mucizeler yarattığı söyleniyor. Önünde diz çöküp bir dilekte bulunmak, halkın çoğunun yaptığı bir şey.",
    secenekler: [
      {
        metin: "Diz çök, içtenlikle dua et.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: 4,
          ahlak: 5,
          mesaj: "Dua ederken içini saran huzur günlerce sürdü.",
          detay: "Mucize gerçek mi değil mi bilmiyorsun ama hissettiğin gerçekti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Beklediğin huzuru bulamadın, içinde bir boşluk kaldı.",
          detay: "Bazı günler inanç bile yetmiyor.",
        },
      },
      {
        metin: "Geceyi bekle ve adak altınlarını çal!",
        baseBasariSansi: 40,
        maxAhlak: 35,
        basariliSonuc: {
          para: 50,
          ahlak: -25,
          mesaj: "Kimse görmeden altınları cübbene sakladın. Kiliseden zengin bir adam olarak çıktın.",
          detay: "Tanrının parasını çaldın. Vicdanın tamamen körleşti.",
        },
        basarisizSonuc: {
          un: -35,
          ahlak: -20,
          para: -15,
          etiket_ekle: [
            "itibar:aforoz_edildi",
          ],
          mesaj: "Papaz seni suçüstü yakaladı! Tüm kiliseye rezil oldun ve aforoz edildin.",
          detay: "Adın artık şeytanla anılıyor.",
        },
      },
      {
        metin: "Uzaktan izle, katılma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Törenin dışında kalmayı tercih ettin, kalabalığı izledin.",
          detay: "Herkesin inanma şekli aynı değil.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Bazı komşuların mesafeni fark etti, arkandan fısıldadılar.",
          detay: "Cemaatte görünmemek bazen bir bedel ödetiyor.",
        },
      },
    ],
  },
  {
    id: "din_ortodoks_buyuk_perhiz",
    kategori: "din",
    gerekliDin: "Ortodoks",
    agirlik: 0.6,
    ton: "hafif",
    gorsel: "🐟",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Büyük Perhiz",
    metin: "Uzun perhiz haftaları başladı; et, süt, yumurta yasak. Komşun seni gizlice bir tabak et yemeye davet etti, 'kimse görmez' diyor.",
    secenekler: [
      {
        metin: "Daveti geri çevir, perhize sadık kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Perhizi tam tuttun; cemaat içinde 'sağlam imanlı' diye anılmaya başladın.",
          detay: "Aç kalmak bazen bir gurur meselesi oluyor.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddetmek kolay olmadı, açlığın seni huysuzlaştırdı.",
          detay: "İrade bazen midenden daha zayıf çıkıyor.",
        },
      },
      {
        metin: "Gizlice davete git, bir tabak et ye.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Kimse görmeden karnını doyurdun; vicdanın biraz sızladı ama tabak boştu.",
          detay: "Bazı günahlar en azından lezzetli oluyor.",
        },
        basarisizSonuc: {
          un: -8,
          ahlak: -5,
          mesaj: "Papaz seni tam et yerken kapıda yakaladı; olay bütün mahallede duyuldu.",
          detay: "'Perhiz Bozan' lakabı bir süre peşini bırakmayacak.",
        },
      },
    ],
  },
  {
    id: "din_sunni_cuma_hutbesi",
    kategori: "din",
    gerekliDin: "Sünni İslam",
    agirlik: 0.7,
    ton: "hafif",
    gorsel: "🕌",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Cuma Hutbesi",
    metin: "İmamın hutbesi bugün her zamankinden uzun; öndeki saflarda oturuyorsun ve gözlerin ağırlaşmaya başladı.",
    secenekler: [
      {
        metin: "Kendini çimdikle, dikkatini topla.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 5,
          mesaj: "Sonuna kadar dik oturdun; imam konuşma sonrası seni takdir etti.",
          detay: "Bazı zaferler sadece uyanık kalmaktan ibaret.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Direnmene rağmen birkaç saniyeliğine gözlerin kapandı, kimse fark etmedi galiba.",
          detay: "Uyku bazen iradeden güçlü çıkıyor.",
        },
      },
      {
        metin: "Kendini bırak, gözlerin kapansın.",
        baseBasariSansi: 40,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Küçük bir şekerleme çektin, kimse fark etmedi.",
          detay: "Bazen risk alıp kazanıyorsun.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Horlaman camiyi çınlattı; herkes döndü sana baktı.",
          detay: "Bu hikaye mahallede uzun süre anlatılacak.",
        },
      },
    ],
  },
  {
    id: "din_sunni_zekat_zamani",
    kategori: "din",
    gerekliDin: "Sünni İslam",
    agirlik: 0.6,
    gorsel: "🤲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Zekat Zamanı",
    metin: "Yıllık zekat vaktin geldi. Elindeki birikimin bir kısmını ihtiyaç sahiplerine ayırmak hem dini bir görev hem de vicdani bir seçim.",
    secenekler: [
      {
        metin: "Cömertçe ver, hesap yapma.",
        baseBasariSansi: 90,
        maliyet: 12,
        basariliSonuc: {
          para: -12,
          ahlak: 12,
          un: 6,
          mesaj: "Verdiğin, tam da bir ailenin kışı geçirmesine yetti.",
          detay: "Kimsenin bilmediği bir iyilik bile içini ısıtıyor.",
        },
        basarisizSonuc: {
          para: -12,
          ahlak: 8,
          mesaj: "Verdin ama parayı kimin aldığını hiç öğrenemedin.",
          detay: "Bazı iyilikler karşılıksız kalıyor, olsun.",
        },
      },
      {
        metin: "Asgari miktarı ver, gerisini sakla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Görevini yerine getirdin, fazlasına dokunmadın.",
          detay: "Kurallara uydun, en azından bu kadarı yeter dedin kendine.",
        },
        basarisizSonuc: {
          ahlak: -4,
          mesaj: "Komşuların ne kadar az verdiğini fark etti, arkandan konuştular.",
          detay: "Cömertlik bazen gösteriş meselesine dönüşüyor.",
        },
      },
    ],
  },
  {
    id: "din_anglikan_kilise_cayi",
    kategori: "din",
    gerekliDin: "Anglikan",
    agirlik: 0.7,
    ton: "hafif",
    gorsel: "☕",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kilise Çayı",
    metin: "Pazar ayininden sonra cemaat, her zamanki gibi küçük fincanlarda çay içip birbirinin işlerine burnunu sokuyor. Bu hafta konu sensin.",
    secenekler: [
      {
        metin: "Sohbete katıl, kendini savun.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 6,
          dost_puani: 5,
          mesaj: "Şakacı bir üslupla durumu çevirdin; herkes gülüşerek konuyu kapattı.",
          detay: "İngiliz nezaketinin arkasında güçlü bir espri anlayışı yatıyormuş.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Savunman tam tersi etki yaptı, dedikodu daha da büyüdü.",
          detay: "Bazı fincan çaylar, bazı insanların hayatını zorlaştırıyor.",
        },
      },
      {
        metin: "Sessizce çayını iç, duymazdan gel.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sessizce oturup çayını bitirdin; dedikodu kendiliğinden söndü.",
          detay: "Bazen en iyi cevap, cevap vermemektir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sessizliğin bazılarına 'suçunu kabul ediyor' gibi göründü.",
          detay: "Kilise çayı bazen mahkemeden farksız oluyor.",
        },
      },
    ],
  },
  {
    id: "din_anglikan_piskopos_ziyareti",
    kategori: "din",
    gerekliDin: "Anglikan",
    agirlik: 0.5,
    gorsel: "🎩",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Piskoposun Ziyareti",
    metin: "Bölge piskoposu ayine katılacak; iyi bir izlenim bırakmak sosyal çevrende kapılar açabilir.",
    secenekler: [
      {
        metin: "Özenli hazırlan, piskoposla tanış.",
        baseBasariSansi: 60,
        maliyet: 5,
        basariliSonuc: {
          un: 12,
          dost_puani: 4,
          mesaj: "Piskopos seninle kısa ama sıcak bir sohbet etti; adın çevresinde anılır oldu.",
          detay: "Böyle küçük anlar bazen büyük kapılar açıyor.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Hazırlığın boşa gitti, piskopos seni fark bile etmedi.",
          detay: "Bazı yatırımlar karşılıksız kalıyor.",
        },
      },
      {
        metin: "Kalabalığa karış, göze çarpma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sıradan bir cemaat üyesi olarak ayine katıldın.",
          detay: "Her fırsatın peşinden koşmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Diğerlerinin piskoposla tanıştığını görünce hafif bir kıskançlık hissettin.",
          detay: "Bazı fırsatlar kaçırılınca daha çok akılda kalıyor.",
        },
      },
    ],
  },
  {
    id: "asker_kucuk_baskin_ganimeti",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    agirlik: 1.1,
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ufak Bir Baskın",
    metin: "Devriye sırasında küçük bir eşkıya grubuna rastladınız; kısa bir çatışmanın ardından ele geçirdiğiniz ganimet aranızda paylaşılıyor.",
    secenekler: [
      {
        metin: "Çatışmaya cesurca katıl.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: -6,
          para: 14,
          un: 2,
          mesaj: "Payına düşen ganimetle cebin biraz şişti; komutanın da seni fark etti.",
          detay: "Küçük zaferler de sayılır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -14,
          saglik: -6,
          mesaj: "Çatışmada sıyrık aldın, ganimetten payına pek bir şey düşmedi.",
          detay: "Her baskın kazançlı geçmiyor.",
        },
      },
      {
        metin: "Geride dur, gözcülük yap.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 5,
          mesaj: "Gözcülük görevini iyi yaptın; küçük bir pay da sana ayrıldı.",
          detay: "Her zaman ön safta olmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mesaj: "Geride kalman bazı yoldaşların gözünde hoş karşılanmadı.",
          detay: "Bazı seçimler sessizce yargılanıyor.",
        },
      },
    ],
  },
  {
    id: "dinadami_minnettar_ziyaretci",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    agirlik: 1.1,
    gorsel: "🎁",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Minnettar Bir Ziyaretçi",
    metin: "Geçen ay dertlerini dinlediğin bir cemaat üyesi, minnetini göstermek için elinde küçük bir hediyeyle kapına geldi.",
    secenekler: [
      {
        metin: "Hediyeyi memnuniyetle kabul et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 8,
          mutluluk: 3,
          mesaj: "Küçük hediye, verdiğin emeğin karşılığı gibi hissettirdi.",
          detay: "Bazen en küçük jestler en çok değeni taşıyor.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Hediye mütevazıydı ama düşüncesi güzeldi.",
          detay: "Her zaman büyük olması gerekmiyor.",
        },
      },
      {
        metin: "Nazikçe reddet, karşılıksız yardım ettiğini söyle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 6,
          un: 3,
          mesaj: "Reddin cemaat arasında yayıldı; alçakgönüllülüğünle tanındın.",
          detay: "Bazı itibarlar parayla satın alınamaz.",
        },
        basarisizSonuc: {
          mesaj: "Reddin biraz tuhaf karşılandı, ziyaretçi mahcup ayrıldı.",
          detay: "Bazen iyi niyet de yanlış anlaşılabiliyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_asker_baslangic",
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    minRutbeSeviye: 3,
    agirlik: 1,
    gorsel: "🏛️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ordunun Üstünde Bir Güç",
    metin: "Şehrin savunma bütçesini yönetecek kişiyi seçiyorlar; rakip bir general de aynı koltuğun peşinde. Kazanırsan ordunun yanında şehrin ekonomisine de söz sahibi olursun.",
    secenekler: [
      {
        metin: "Mücadeleye gir, koltuğu hedefle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 35,
          un: 12,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Rakip generali geride bıraktın; artık şehrin savunma bütçesinin bir kısmı senin elinde.",
          detay: "Kumandanlık artık bir son değil, yeni bir yarışın başlangıcı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          un: -5,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Bu turu rakip general kazandı, ama yarış bitmedi; adın artık bu çevrede biliniyor.",
          detay: "İlk denemen başarısız oldu ama artık oyunun içindesin.",
        },
      },
      {
        metin: "Reddet, kumandanlıkla yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi geri çevirdin; mevcut konumunla yetinmeyi seçtin.",
          detay: "Belki başka bir gün fikrin değişir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddettiğine biraz pişman oldun; rakip general koltuğu sensiz aldı.",
          detay: "Bazı fırsatlar bir daha aynı şekilde gelmiyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_tuccar_baslangic",
    kategori: "siyaset",
    meslekler: [
      "Tüccar",
    ],
    minRutbeSeviye: 3,
    agirlik: 1,
    gorsel: "🏛️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Loncanın Ötesinde",
    metin: "Lonca Ustalığı artık senin için bir tavan değil, bir başlangıç. Şehrin ticaret konseyinde bir koltuk boşaldı; rakip bir tüccar da aynı koltuğun peşinde. Kazanırsan sadece kendi işini değil, şehrin ekonomisinin bir parçasını yönetirsin.",
    secenekler: [
      {
        metin: "Mücadeleye gir, koltuğu hedefle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 40,
          un: 12,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Rakip tüccarı geride bıraktın; artık şehrin ticaret konseyinde bir sözün var.",
          detay: "Lonca Ustalığı artık bir son değil, yeni bir yarışın başlangıcı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -5,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Bu turu rakip tüccar kazandı, ama yarış bitmedi; adın artık konseyde biliniyor.",
          detay: "İlk denemen başarısız oldu ama artık oyunun içindesin.",
        },
      },
      {
        metin: "Reddet, mevcut işinle yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi geri çevirdin; mevcut konumunla yetinmeyi seçtin.",
          detay: "Belki başka bir gün fikrin değişir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddettiğine biraz pişman oldun; rakip tüccar koltuğu sensiz aldı.",
          detay: "Bazı fırsatlar bir daha aynı şekilde gelmiyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_dinadami_baslangic",
    kategori: "siyaset",
    meslekler: [
      "Din Adamı",
    ],
    minRutbeSeviye: 3,
    agirlik: 1,
    gorsel: "🏛️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kürsünün Ötesinde",
    metin: "Başrahiplik artık senin için bir tavan değil, bir başlangıç. Şehrin büyük vakıflarını kim yönetecek tartışılıyor; rakip bir rahip de aynı makamın peşinde. Kazanırsan sadece cemaati değil, şehrin ekonomisinin bir parçasını da yönetirsin.",
    secenekler: [
      {
        metin: "Mücadeleye gir, makamı hedefle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 30,
          un: 15,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Rakip rahibi geride bıraktın; artık şehrin büyük vakıflarında bir sözün var.",
          detay: "Başrahiplik artık bir son değil, yeni bir yarışın başlangıcı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -30,
          ahlak: -5,
          un: -5,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Bu turu rakip rahip kazandı, ama yarış bitmedi; adın artık meclis içinde biliniyor.",
          detay: "İlk denemen başarısız oldu ama artık oyunun içindesin.",
        },
      },
      {
        metin: "Reddet, kürsünle yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi geri çevirdin; mevcut konumunla yetinmeyi seçtin.",
          detay: "Belki başka bir gün fikrin değişir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddettiğine biraz pişman oldun; rakip rahip makamı sensiz aldı.",
          detay: "Bazı fırsatlar bir daha aynı şekilde gelmiyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_zanaatkar_baslangic",
    kategori: "siyaset",
    meslekler: [
      "Zanaatkâr",
    ],
    minRutbeSeviye: 3,
    agirlik: 1,
    gorsel: "🏛️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Loncanın Ötesinde",
    metin: "Ustalığın artık senin için bir tavan değil, bir başlangıç. Şehrin zanaat şurasında bir koltuk boşaldı; rakip bir usta da aynı koltuğun peşinde. Kazanırsan sadece kendi atölyeni değil, şehrin zanaat düzeninin bir parçasını yönetirsin.",
    secenekler: [
      {
        metin: "Mücadeleye gir, koltuğu hedefle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 35,
          un: 12,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Rakip ustayı geride bıraktın; artık şehrin zanaat şurasında bir sözün var.",
          detay: "Ustalık artık bir son değil, yeni bir yarışın başlangıcı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          un: -5,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Bu turu rakip usta kazandı, ama yarış bitmedi; adın artık şurada biliniyor.",
          detay: "İlk denemen başarısız oldu ama artık oyunun içindesin.",
        },
      },
      {
        metin: "Reddet, atölyenle yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi geri çevirdin; mevcut konumunla yetinmeyi seçtin.",
          detay: "Belki başka bir gün fikrin değişir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddettiğine biraz pişman oldun; rakip usta koltuğu sensiz aldı.",
          detay: "Bazı fırsatlar bir daha aynı şekilde gelmiyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_asker_savunma_butcesi",
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "sehir_yonetimi_basladi",
    ],
    agirlik: 0.7,
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Savunma Bütçesi Kavgası",
    metin: "Şehrin savunma bütçesinin bu yılki dağılımı yeniden görüşülüyor; rakip general payını büyütmek için elinden geleni yapıyor.",
    secenekler: [
      {
        metin: "Konseyde payını büyütmek için mücadele et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 30,
          un: 10,
          mesaj: "Bütçenin büyük kısmını kendi birliklerine yönlendirmeyi başardın.",
          detay: "Rakip general seni izlemeye devam edecek, ama bu turu sen kazandın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Bu tur rakip general kazandı; payın küçüldü.",
          detay: "Yarış henüz bitmedi.",
        },
      },
      {
        metin: "Rakip generalin sırlarını ifşa etmekle şantaj yap.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        basariliSonuc: {
          sehir_yonetim_artis: 2,
          para: 40,
          un: 15,
          ahlak: -20,
          mesaj: "Generalin zayıf noktasını kullanarak onu köşeye sıkıştırdın. Bütçenin neredeyse tamamı sana aktarıldı.",
          detay: "Siyaset bazen kılıçtan daha keskindir.",
        },
        basarisizSonuc: {
          saglik: -30,
          un: -15,
          olum_sansi: 5,
          mesaj: "Şantajın ters tepti! General seni pusuya düşürüp adamlarına dövdürttü. Bütçeyi tamamen kaybettin.",
        },
      },
      {
        metin: "Geri çekil, güç biriktir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu sefer geri planda kalmayı tercih ettin.",
          detay: "Sabır bazen en iyi stratejidir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Geride kalman bazı yandaşlarını hayal kırıklığına uğrattı.",
          detay: "Her zaman izlemek zorunda değilsin.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_asker_sinir_kampanyasi",
    kategori: "siyaset",
    meslekler: [
      "Asker",
    ],
    gerekliEtiketler: [
      "sehir_yonetimi_basladi",
    ],
    agirlik: 0.7,
    gorsel: "🗺️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sınırları Genişletme Kampanyası",
    metin: "Şehrin sınır ticaret yollarını güvence altına alacak kampanyanın liderliği tartışılıyor; bu, hem askeri hem ekonomik bir zafer demek.",
    secenekler: [
      {
        metin: "Kampanyanın liderliğini üstlen.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 35,
          un: 10,
          mesaj: "Kampanya başarıyla sonuçlandı; sınır ticaret yolları artık senin gözetiminde.",
          detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          saglik: -8,
          para: -10,
          mesaj: "Kampanya beklenenden zorlu geçti, kayıplarla geri döndün.",
          detay: "Bir sonraki fırsat için gücünü topla.",
        },
      },
      {
        metin: "Başkasına bırak, riske girme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Liderliği başka birine bıraktın.",
          detay: "Her savaşı sen kazanmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kampanyanın başarısını uzaktan izlerken hafif bir pişmanlık hissettin.",
          detay: "Bazı fırsatlar bir daha gelmiyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_tuccar_ticaret_yollari",
    kategori: "siyaset",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "sehir_yonetimi_basladi",
    ],
    agirlik: 0.7,
    gorsel: "🛤️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yeni Ticaret Yolları",
    metin: "Şehrin yeni açılan ticaret yolunun imtiyazı için konseyde oylama var; rakip tüccar da aynı imtiyazın peşinde.",
    secenekler: [
      {
        metin: "İmtiyaz için agresifçe lobi yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 45,
          un: 10,
          mesaj: "İmtiyazı kazandın; yeni ticaret yolu artık senin kervanlarınla işliyor.",
          detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "İmtiyazı rakip tüccar kazandı; yatırdığın emek boşa gitti.",
          detay: "Yarış henüz bitmedi.",
        },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu imtiyaza girmemeyi tercih ettin.",
          detay: "Her fırsatın peşinden koşmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Rakibin kazandığını duyunca içerledin.",
          detay: "Bazı fırsatlar bir daha gelmiyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_tuccar_vergi_imtiyazi",
    kategori: "siyaset",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "sehir_yonetimi_basladi",
    ],
    agirlik: 0.7,
    gorsel: "📜",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Vergi Toplama İmtiyazı",
    metin: "Şehrin pazar vergilerini toplama imtiyazı bu yıl yeniden ihaleye çıktı; rakip tüccar da teklif hazırlıyor.",
    secenekler: [
      {
        metin: "Yüksek teklif ver, imtiyazı kap.",
        baseBasariSansi: 55,
        maliyet: 20,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 50,
          un: 12,
          mesaj: "İhaleyi kazandın; artık pazarın vergi geliri bir ölçüde senin elinde.",
          detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "İhaleyi rakip tüccar kazandı; teklifin boşa gitti.",
          detay: "Yarış henüz bitmedi.",
        },
      },
      {
        metin: "Vergi toplamada zorbalık yapmayı teklif et.",
        baseBasariSansi: 40,
        maxAhlak: 35,
        basariliSonuc: {
          sehir_yonetim_artis: 2,
          para: 70,
          ahlak: -30,
          un: -15,
          mesaj: "Konsey teklifini gizlice onayladı. Sopalı adamlarınla vergileri acımasızca topladın.",
          detay: "Halk senden nefret ediyor ama kasan hiç bu kadar dolmamıştı.",
        },
        basarisizSonuc: {
          para: -30,
          un: -25,
          mesaj: "Konsey bu kadar ileri gitmeye cesaret edemedi ve seni ihalenin dışında bıraktı.",
        },
      },
      {
        metin: "İhaleye girme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu ihaleye girmemeyi tercih ettin.",
          detay: "Her fırsatın peşinden koşmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Rakibin kazandığını duyunca içerledin.",
          detay: "Bazı fırsatlar bir daha gelmiyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_dinadami_vakif_yonetimi",
    kategori: "siyaset",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "sehir_yonetimi_basladi",
    ],
    agirlik: 0.7,
    gorsel: "🏦",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Büyük Vakfın Yönetimi",
    metin: "Şehrin en büyük dini vakfının yönetim kurulunda bir koltuk boşaldı; rakip rahip de aynı koltuğun peşinde.",
    secenekler: [
      {
        metin: "Koltuk için mücadele et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 35,
          un: 12,
          mesaj: "Koltuğu kazandın; vakfın kaynakları artık kısmen senin gözetiminde.",
          detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -35,
          ahlak: -5,
          mesaj: "Koltuğu rakip rahip kazandı; emeğin boşa gitti.",
          detay: "Yarış henüz bitmedi.",
        },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu koltuğa girmemeyi tercih ettin.",
          detay: "Her fırsatın peşinden koşmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Rakibin kazandığını duyunca içerledin.",
          detay: "Bazı fırsatlar bir daha gelmiyor.",
        },
      },
    ],
  },
  {
    id: "sehir_yonetim_dinadami_kutsal_emanet",
    kategori: "siyaset",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "sehir_yonetimi_basladi",
    ],
    agirlik: 0.7,
    gorsel: "✨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kutsal Emanetin Koruyuculuğu",
    metin: "Şehre gelen değerli bir kutsal emanetin koruyuculuğu tartışılıyor; bu unvan hem büyük bir nüfuz hem de büyük bir gelir kapısı demek. Rakip rahip de bu unvanı istiyor.",
    secenekler: [
      {
        metin: "Koruyuculuk için öne çık.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 40,
          un: 15,
          mesaj: "Koruyuculuk sana verildi; hacılar artık senin kürsüne akın ediyor.",
          detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -40,
          un: -5,
          mesaj: "Unvan rakip rahibe verildi; emeğin boşa gitti.",
          detay: "Yarış henüz bitmedi.",
        },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu unvana talip olmamayı tercih ettin.",
          detay: "Her fırsatın peşinden koşmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Rakibin kazandığını duyunca içerledin.",
          detay: "Bazı fırsatlar bir daha gelmiyor.",
        },
      },
    ],
  },
  {
    id: "saray_kral_daveti",
    kategori: "siyaset",
    minUn: 70,
    minAhlak: 70,
    gorsel: "👑",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kraldan Bir Davet",
    metin: "Beklenmedik bir haberci kapına dayandı: adın ve şöhretin krala kadar ulaşmış. Bizzat saraya davet ediliyorsun.",
    secenekler: [
      {
        metin: "Daveti onurla kabul et.",
        baseBasariSansi: 95,
        basariliSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          un: 9,
          ahlak: 3,
          mesaj: "Kralın huzuruna çıktın; artık saray çevresinde saygıyla anılan biri oldun.",
          detay: "Bu davet bir ömür boyu anlatılacak bir an.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          mesaj: "Heyecandan sözlerin biraz karıştı ama yine de saraya kabul edildin.",
          detay: "Mükemmel olmasa da unutulmaz bir gündü.",
        },
      },
      {
        metin: "Naçizane reddet, kendi hayatını sürdür.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          un: 5,
          mesaj: "Daveti nazikçe geri çevirdin; kimse fazla üstelemedi.",
          detay: "Sıradan hayatını sürdürmeyi seçtin.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin sarayda 'küstahlık' diye yorumlandı; adın bir süre kötü anıldı.",
          detay: "Krala hayır demenin bir bedeli oldu.",
        },
      },
    ],
  },
  {
    id: "saray_ic_entrika",
    kategori: "siyaset",
    gerekliEtiketler: [
      "sarayda",
    ],
    agirlik: 0.6,
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Saray Entrikası",
    metin: "Nüfuzlu bir soylu, seni köşeye çekip bir rakibi krala kötü göstermen için yardım istedi. Karşılığında büyük bir iyilik vaat ediyor.",
    secenekler: [
      {
        metin: "Entrikaya katıl, planı uygula.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 25,
          un: 8,
          ahlak: -12,
          mesaj: "Plan işe yaradı; soylu sana borçlu kaldı, rakibi gözden düştü.",
          detay: "Sarayda güç bazen böyle kazanılıyor.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -8,
          mesaj: "Entrika ortaya çıktı; senin parmağın olduğu anlaşıldı, itibarın zedelendi.",
          detay: "Saray entrikaları herkesi yakabiliyor.",
        },
      },
      {
        metin: "Nazikçe reddet, işin dışında kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Teklifi kibarca geri çevirdin; ellerin temiz kaldı.",
          detay: "Sarayda herkes entrikaya bulaşmak zorunda değil.",
        },
        basarisizSonuc: {
          mesaj: "Reddin soylunun hoşuna gitmedi, sana soğuk davranmaya başladı.",
          detay: "Bazı reddedişlerin bedeli sessizce ödeniyor.",
        },
      },
    ],
  },
  {
    id: "saray_balosu",
    kategori: "sosyal",
    gerekliEtiketler: [
      "sarayda",
    ],
    agirlik: 0.6,
    gorsel: "💃",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kraliyet Balosu",
    metin: "Sarayın en görkemli balolarından birine davet edildin. İyi bir izlenim bırakmak, seni saray çevresinde bir adım öne taşıyabilir.",
    secenekler: [
      {
        metin: "Merkeze çık, herkesle tanış.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 19,
          dost_puani: 6,
          mesaj: "Zarafetin ve sohbetin balo salonunda konuşuldu; herkes seninle tanışmak istedi.",
          detay: "Bir gecede saray çevresinde tanınır oldun.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Sakar bir anın herkesin gözü önünde oldu; bir süre bunun şakası yapıldı.",
          detay: "Sarayda küçük hatalar bile büyük yankı buluyor.",
        },
      },
      {
        metin: "Kenarda dur, dikkat çekme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          un: 6,
          mesaj: "Baloyu kenardan izlemekle yetindin.",
          detay: "Her gece parlamak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kenarda kalman fark edildi, 'sıkıcı' diye anıldın.",
          detay: "Bazen görünmemek de bir bedel ödetiyor.",
        },
      },
      {
        metin: "Yabancı elçilerle kendi dillerinde sohbet et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 6,
          dost_puani: 8,
          mesaj: "Yabancı elçilerle kendi dillerinde, kendi geleneklerine hakim biçimde sohbet ettin; salon şaşkınlıkla seni izledi.",
          detay: "Yıllarca farklı dünyalardan insanlarla kurduğun bağlar, tam da bu gece işine yaradı.",
        },
        basarisizSonuc: {
          un: 10,
          mesaj: "Sohbet beklediğin kadar akıcı gitmedi ama yine de elçiler seni saygıyla dinledi.",
          detay: "Farklı dünyalardan insanlarla kurduğun bağlar her zaman mükemmel sonuç vermese de fark ediliyor.",
        },
      },
    ],
  },
  {
    id: "saray_dedikodu",
    kategori: "sosyal",
    gerekliEtiketler: [
      "sarayda",
    ],
    agirlik: 0.6,
    ton: "hafif",
    gorsel: "🤫",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Saray Dedikodusu",
    metin: "Bir hizmetkardan, sarayın en güçlü ailelerinden birinin gizli bir ilişkisini öğrendin. Bu bilgi hem tehlikeli hem de değerli.",
    secenekler: [
      {
        metin: "Bilgiyi doğru kişiye satarak kazanç sağla.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 35,
          ahlak: -10,
          mesaj: "Bilgi karşılığında güzel bir ödül aldın; kimse senden şüphelenmedi.",
          detay: "Sarayda sır ticareti hep var olmuş.",
        },
        basarisizSonuc: {
          un: -12,
          ahlak: -8,
          mesaj: "Kaynağın belli oldu; artık sarayda kimse yanında rahat konuşmuyor.",
          detay: "Güven bir kere kırılınca zor onarılıyor.",
        },
      },
      {
        metin: "Sırrı kimseyle paylaşma, unutmaya çalış.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 4,
          mesaj: "Duyduğunu unutmaya karar verdin; kimseye bir şey söylemedin.",
          detay: "Bazı sırlar taşınmaya değmiyor.",
        },
        basarisizSonuc: {
          mesaj: "Sırrı sakladın ama merakın seni bir süre rahatsız etti.",
          detay: "Bilmek bazen bir yüktür.",
        },
      },
    ],
  },
  {
    id: "saray_av_daveti",
    kategori: "sosyal",
    gerekliEtiketler: [
      "sarayda",
    ],
    agirlik: 0.5,
    gorsel: "🦌",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kralın Av Daveti",
    metin: "Kral, saray erkanıyla birlikte büyük bir ava çıkıyor ve seni de davet ediyor. Katılmak prestijli ama tehlikesiz değil.",
    secenekler: [
      {
        metin: "Ava katıl, riski göze al.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 12,
          para: 10,
          mesaj: "Avda gösterdiğin cesaret kralın dikkatini çekti; ganimetten de payını aldın.",
          detay: "Kral seni bir daha davet edeceğini söyledi.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Av sırasında kötü bir kaza geçirdin; herkesin önünde utandın.",
          detay: "Bazı avlar planlandığı gibi gitmiyor.",
        },
      },
      {
        metin: "Nazikçe mazeret sun, katılma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Mazeretini kabul ettiler; sen de güvenli bir gün geçirdin.",
          detay: "Her davete koşmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Katılmadığın için bazı çevrelerden dışlandığını hissettin.",
          detay: "Sarayda gıyabında konuşulmak kolay.",
        },
      },
    ],
  },
  {
    id: "saray_suikast_duyumu",
    kategori: "siyaset",
    gerekliEtiketler: [
      "sarayda",
    ],
    agirlik: 0.5,
    ton: "agir",
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Karanlık Bir Duyum",
    metin: "Rastgele duyduğun bir konuşmadan, krala karşı bir komplo hazırlandığını anladın. Bu bilgiyle ne yapacağını dikkatle seçmelisin.",
    secenekler: [
      {
        metin: "Krala veya muhafızlarına bildir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 20,
          ahlak: 10,
          mesaj: "İhbarın doğru çıktı; kralın hayatını kurtaran kişi olarak anıldın.",
          detay: "Bu, sarayda söyleneceklerin en büyüğü olacak.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Duyumun asılsız çıktı; boş yere panik yarattığın için küçük düştün.",
          detay: "Bazı sesler yanlış anlaşılıyor.",
        },
      },
      {
        metin: "Karışma, sessiz kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Duyduğunu kimseye söylemedin; olay senin bilgin dışında çözüldü ya da hiç gerçekleşmedi.",
          detay: "Bazen bilmemek daha rahattır.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mesaj: "Komplo gerçekleşti; sessiz kalman içini uzun süre kemirdi.",
          detay: "Sessizliğin bir bedeli olduğunu şimdi anlıyorsun.",
        },
      },
    ],
  },
  {
    id: "saray_mutfak_kazasi",
    kategori: "sosyal",
    gerekliEtiketler: [
      "sarayda",
    ],
    agirlik: 0.5,
    ton: "hafif",
    gorsel: "🍲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Şölende Küçük Bir Kaza",
    metin: "Büyük bir saray şöleninde, telaşlı bir hizmetkar üzerine sıcak bir çorba döktü. Bütün salon şimdi sana bakıyor.",
    secenekler: [
      {
        metin: "Gülüp geçiştir, ortamı yumuşat.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 4,
          mutluluk: 3,
          mesaj: "Kendine gülerek durumu şakaya çevirdin; salon senin soğukkanlılığını konuştu.",
          detay: "Bazen en iyi izlenim, kusursuzluktan değil zarafetten gelir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Gülümsemen zoraki kaldı, birkaç kişi arkandan fısıldadı.",
          detay: "Her kaza şakaya dönüşmüyor.",
        },
      },
      {
        metin: "Öfkelen, hizmetkarı azarla.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 7,
          mesaj: "Öfken haklı bulundu, hizmetkar özür diledi.",
          detay: "Bazıları haklı olduğunu düşündü.",
        },
        basarisizSonuc: {
          un: -10,
          ahlak: -5,
          mesaj: "Sert tepkin 'zalim' olarak anıldı; birkaç kişi senden uzak durmaya başladı.",
          detay: "Küçük bir kaza, büyük bir itibar lekesine dönüştü.",
        },
      },
    ],
  },
  {
    id: "oc_kervan_katilma_karari",
    kategori: "ticaret",
    cag: "Orta Çağ",
    minYas: 16,
    yasakliEtiketler: [
      "kervan_karari_verildi",
    ],
    agirlik: 0.9,
    gorsel: "🐫",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Uzak Diyarlara Giden Kervan",
    metin: "Şehirden büyük bir ticaret kervanı uzak diyarlara doğru yola çıkıyor. Katılmak hem tehlikeli hem de büyük bir fırsat olabilir.",
    secenekler: [
      {
        metin: "Kervana katıl, yola çık.",
        baseBasariSansi: 80,
        maliyet: 10,
        basariliSonuc: {
          etiket_ekle: [
            "kervan:katildi",
            "kervan_karari_verildi",
          ],
          para: -6,
          mesaj: "Malını denk yaptın, kervana katıldın; önündeki aylar tozlu yollarda geçecek.",
          detay: "Bu yolculuk seni değiştirecek; ya zenginleştirecek ya da çok şey öğretecek.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "kervan:katildi",
            "kervan_karari_verildi",
          ],
          para: -10,
          mesaj: "Hazırlıkların acele oldu ama yine de kervana katıldın.",
          detay: "Yeterince hazırlıklı olmadan çıktığın bu yolun bedelini ödeyeceksin.",
        },
      },
      {
        metin: "Katılma, şehirde kal.",
        baseBasariSansi: 95,
        basariliSonuc: {
          etiket_ekle: [
            "kervan:katilmadi",
            "kervan_karari_verildi",
          ],
          mesaj: "Şehirde kalmayı tercih ettin; kervan sensiz yola çıktı.",
          detay: "Belki başka bir kervan başka bir gün gelir.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "kervan:katilmadi",
            "kervan_karari_verildi",
          ],
          mutluluk: -2,
          mesaj: "Kervanın tozunu uzaktan izlerken içinde bir pişmanlık hissettin.",
          detay: "Bazı fırsatlar bir daha aynı şekilde gelmiyor.",
        },
      },
    ],
  },
  {
    id: "oc_kervan_soygun_riski",
    kategori: "ticaret",
    gerekliEtiketler: [
      "kervan:katildi",
    ],
    agirlik: 0.7,
    ton: "agir",
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Çölde Pusu",
    metin: "Kervan, ıssız bir geçitte eşkıyaların pususuna düştü. Kervan başı herkesin savunmaya katılmasını istiyor.",
    secenekler: [
      {
        metin: "Malını savun, eşkıyalara karşı koy.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: -8,
          para: 20,
          un: 3,
          mesaj: "Kervan direndi ve eşkıyaları püskürttü; payına düşen ganimetle daha da zenginleştin.",
          detay: "Bu geçit artık senin cesaretinle anılıyor.",
        },
        basarisizSonuc: {
          para: -30,
          saglik: -12,
          mesaj: "Eşkıyalar mallarının çoğunu aldı, sen de yaralı kurtuldun.",
          detay: "Bu yolculuk sandığından daha pahalıya mal oldu.",
        },
      },
      {
        metin: "Malını bırak, canını kurtar.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: -20,
          mesaj: "Malının bir kısmını bırakıp geri çekildin; en azından sağ kaldın.",
          detay: "Bazen kaybetmeyi kabullenmek en akıllıca seçimdir.",
        },
        basarisizSonuc: {
          para: -35,
          mutluluk: -3,
          mesaj: "Geri çekilmene rağmen eşkıyalar neredeyse her şeyini aldı.",
          detay: "Bazı kayıplar önlenemiyor.",
        },
      },
    ],
  },
  {
    id: "oc_kervan_uzak_diyar_ticareti",
    kategori: "ticaret",
    gerekliEtiketler: [
      "kervan:katildi",
    ],
    agirlik: 0.7,
    gorsel: "🏮",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Uzak Diyarın Pazarı",
    metin: "Kervan, hiç görmediğin bir şehrin pazarına vardı. Egzotik baharatlar, ipekler ve tanımadığın diller her yanı sarmış.",
    secenekler: [
      {
        metin: "Cesurca pazarlık et, büyük alışveriş yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -11,
          para: 40,
          un: 4,
          mesaj: "Yaptığın anlaşma inanılmaz kârlı çıktı; şehre döndüğünde herkes bu ticaretini konuşacak.",
          detay: "Uzak diyarlarla kurduğun bu bağlantı sana yeni kapılar açacak.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Yerel tüccarlar seni kandırdı; anlaşma umduğun gibi çıkmadı.",
          detay: "Yabancı bir pazarda tecrübesizlik pahalıya mal oluyor.",
        },
      },
      {
        metin: "Temkinli davran, küçük işler yap.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 12,
          mesaj: "Küçük ama güvenli bir kazançla yetindin.",
          detay: "Bazen az ama garanti, çoktan iyidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -12,
          mesaj: "Kayda değer bir kazanç elde edemedin ama en azından zarar da etmedin.",
          detay: "Her yolculuk kâr getirmiyor.",
        },
      },
    ],
  },
  {
    id: "oc_kervan_evde_kalanin_pismanligi",
    kategori: "ticaret",
    gerekliEtiketler: [
      "kervan:katilmadi",
    ],
    agirlik: 0.5,
    gorsel: "🏙️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dönen Kervanın Hikayeleri",
    metin: "Kervan aylar sonra şehre döndü; katılanlar zenginleşmiş, egzotik hikayelerle geri gelmiş. Sen ise şehirde kaldın.",
    secenekler: [
      {
        metin: "Hikayeleri dinle, bir dahaki kervana hazırlan.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Anlatılan hikayeler seni bir sonraki fırsata daha istekli kıldı.",
          detay: "Belki bir dahaki sefere sen de katılırsın.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Kaçırdığın fırsatı düşünmek seni hüzünlendirdi.",
          detay: "Bazı pişmanlıklar içine işliyor.",
        },
      },
      {
        metin: "Umursama, kendi güvenli hayatından memnun ol.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Güvenli hayatının kıymetini bildin; herkes risk almak zorunda değil.",
          detay: "Huzur da bir tür zenginlik.",
        },
        basarisizSonuc: {
          mesaj: "Umursamamaya çalışsan da içten içe merak ettin.",
          detay: "Bazı meraklar hiç geçmiyor.",
        },
      },
    ],
  },
  {
    id: "sd_fabrika_grev_karari",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    minYas: 16,
    yasakliEtiketler: [
      "grev_karari_verildi",
    ],
    agirlik: 1,
    gorsel: "✊",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Fabrika Kapısında Bir Grev",
    metin: "Uzun çalışma saatleri ve düşük ücretlere karşı işçiler greve gitmeye karar verdi. Fabrika kapısında toplanan kalabalık senden de bir taraf seçmeni bekliyor.",
    secenekler: [
      {
        metin: "Greve katıl, işçi haklarını savun.",
        baseBasariSansi: 85,
        basariliSonuc: {
          etiket_ekle: [
            "grev:destekledi",
            "grev_karari_verildi",
          ],
          ahlak: 8,
          dost_puani: 6,
          mesaj: "Diğer işçilerle omuz omuza durdun; kapıda 'Adalet!' diye bağırdın.",
          detay: "Artık işçi hareketinin bir parçasısın; bu seçim önündeki yılları şekillendirecek.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "grev:destekledi",
            "grev_karari_verildi",
          ],
          saglik: -5,
          mesaj: "Greve katıldın ama kalabalığın içinde itilip kakıldın.",
          detay: "Dayanışma hep kolay olmuyor.",
        },
      },
      {
        metin: "Katılma, işine devam et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          etiket_ekle: [
            "grev:karsi_cikti",
            "grev_karari_verildi",
          ],
          mesaj: "Kapıdan geçip tezgahının başına oturdun; iş sana ekmek kapısı, risk almak istemedin.",
          detay: "Bu kararın seni patronun gözünde ayrıcalıklı kılacak.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "grev:karsi_cikti",
            "grev_karari_verildi",
          ],
          dost_puani: -5,
          mesaj: "İçeri girerken birkaç grevci sana 'hain' diye bağırdı.",
          detay: "Bu seçimin bir bedeli olacak gibi görünüyor.",
        },
      },
    ],
  },
  {
    id: "sd_grev_polis_mudahalesi",
    kategori: "siyaset",
    gerekliEtiketler: [
      "grev:destekledi",
    ],
    agirlik: 0.7,
    ton: "agir",
    gorsel: "🚨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Coplar ve Bağırışlar",
    metin: "Grev üçüncü haftasına girdi; fabrika sahibi jandarma çağırdı. Kalabalık dağılmıyor, gerginlik tırmanıyor.",
    secenekler: [
      {
        metin: "Geri çekil, kalabalığın arkasına geç.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mesaj: "Geri çekildin; grev senin olmadan da devam etti.",
          detay: "Her mücadelede ön safta olmak zorunda değilsin.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Kalabalık dağılırken bir itiş kakışta sen de sıyrık aldın.",
          detay: "Kargaşa kimseyi tam olarak korumuyor.",
        },
      },
      {
        metin: "Ön safta kal, geri çekilme.",
        baseBasariSansi: 40,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Bir anda atlı jandarmalar kalabalığın üzerine sürmeye başladı! Coplar havaya kalktı. En öndesin, geri kaçabilir ya da copları karşılayabilirsin.",
          geriCekilMetni: "Kaç! Canımı sokakta bulmadım.",
          geriCekilSonucu: {
            saglik: -5,
            un: -10,
            ahlak: -10,
            mesaj: "Cop inmeden önce arkanı dönüp kaçtın. Canını kurtardın ama işçilerin gözünde korkaksın.",
            detay: "Bazı kahramanlık hevesleri jandarmayı görene kadardır.",
          },
          devamMetni: "Barikatı kur! Asla geri dönmem!",
          devamSonucu: {
            un: 30,
            ahlak: 25,
            saglik: -25,
            olum_sansi: 10,
            etiket_ekle: [
              "isci_onderi",
            ],
            mesaj: "Coplar ve atların toynakları altında kaldın ama bir saniye bile geri adım atmadın. Tüm işçi sınıfının ölümsüz bir sembolü oldun.",
            detay: "Bedenin parçalandı ama ruhun devleşti.",
          },
        },
      },
    ],
  },
  {
    id: "sd_grev_kazanim",
    kategori: "siyaset",
    gerekliEtiketler: [
      "grev:destekledi",
    ],
    agirlik: 0.7,
    gorsel: "📜",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Masaya Oturuyorlar",
    metin: "Uzun bir direnişin ardından fabrika sahibi işçi temsilcileriyle görüşmeyi kabul etti. Talepler masaya kondu.",
    secenekler: [
      {
        metin: "Temsilcilerle birlikte ısrarcı ol.",
        baseBasariSansi: 55,
        basariliSonuc: {
          maas_carpani: 1.1,
          un: 10,
          mesaj: "Patron geri adım attı; ücretler ve çalışma saatleri iyileştirildi. Bu, senin de kalıcı kazancın oldu.",
          detay: "Direnişin karşılığını aldınız.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          mesaj: "Patron hiçbir şey vermedi; haftalarca süren grev sonuçsuz kaldı.",
          detay: "Her mücade kazanımla bitmiyor.",
        },
      },
      {
        metin: "Uzlaş, orta yolu kabul et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: -6,
          un: -2,
          para: 15,
          mesaj: "Küçük bir ücret iyileştirmesiyle anlaştınız; herkes işe geri döndü.",
          detay: "Tam istediğin değildi ama bir kazanımdı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Uzlaşma teklifin bile reddedildi; herkes eli boş işe döndü.",
          detay: "Bazı patronlar hiçbir şeye razı olmuyor.",
        },
      },
    ],
  },
  {
    id: "sd_fabrika_sadik_isci",
    kategori: "ticaret",
    gerekliEtiketler: [
      "grev:karsi_cikti",
    ],
    agirlik: 0.7,
    gorsel: "🏭",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Patronun Güveni",
    metin: "Grev sırasında işbaşında kalman fabrika sahibinin dikkatini çekti; seni ödüllendirmek istiyor.",
    secenekler: [
      {
        metin: "Terfiyi kabul et, patrona yakınlaş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          maas_carpani: 1.12,
          mesaj: "Küçük bir ustabaşılık teklifi aldın; maaşın kalıcı olarak arttı.",
          detay: "Ama artık eski iş arkadaşların seninle eskisi gibi konuşmuyor.",
        },
        basarisizSonuc: {
          para: 10,
          dost_puani: -5,
          mesaj: "Küçük bir ikramiye aldın ama diğer işçiler seni fark etti.",
          detay: "Patronun gözdesi olmanın bir bedeli var.",
        },
      },
      {
        metin: "Nazikçe reddet, sıradan işçi kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 5,
          mesaj: "Teklifi kibarca geri çevirdin; iş arkadaşların bunu takdir etti.",
          detay: "Bazı fırsatlar kabul etmeye değmiyor.",
        },
        basarisizSonuc: {
          mesaj: "Reddin patronu şaşırttı ama teklifi tekrar etmedi.",
          detay: "Bazı kapılar bir kez açılıyor.",
        },
      },
    ],
  },
  {
    id: "sd_fabrika_disliyanlar",
    kategori: "sosyal",
    gerekliEtiketler: [
      "grev:karsi_cikti",
    ],
    agirlik: 0.6,
    ton: "agir",
    gorsel: "🚪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Boş Sandalye",
    metin: "Öğle molasında her zamanki masaya oturduğunda kimse seninle göz göze gelmedi; grev sırasında işbaşında kalman hâlâ unutulmamış.",
    secenekler: [
      {
        metin: "Açıkça konuş, aranı düzeltmeye çalış.",
        baseBasariSansi: 45,
        basariliSonuc: {
          dost_puani: 10,
          mesaj: "İçtenlikle konuştun; bazıları anlayışla karşıladı, buzlar biraz eridi.",
          detay: "Dürüstlük bazen en iyi köprüdür.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Konuşman gerginliği daha da artırdı.",
          detay: "Bazı kırgınlıklar kelimelerle onarılmıyor.",
        },
      },
      {
        metin: "Aldırma, kendi başına yemeğini ye.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yalnız yemek yemeye alıştın; zamanla bu sana normal geldi.",
          detay: "Bazı bedeller sessizce ödeniyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Yalnızlık gitgide daha çok canını sıkıyor.",
          detay: "İnsan uzun süre yalnız kalmaya dayanamıyor.",
        },
      },
    ],
  },
  {
    id: "sd_icat_yatirim_firsati",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    minYas: 18,
    agirlik: 0.6,
    gorsel: "⚙️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bir Mucidin Teklifi",
    metin: "Tanıdığın bir mucit, buhar gücüyle çalışan yeni bir makine için ortak arıyor. Elindeki azıcık para ile bu icada yatırım yapabilirsin.",
    secenekler: [
      {
        metin: "Yatırım yap, mucide güven.",
        baseBasariSansi: 45,
        maliyet: 30,
        basariliSonuc: {
          mutluluk: -11,
          para: 80,
          un: 5,
          mesaj: "Makine gerçekten çalıştı; fabrikalar sipariş vermeye başladı, yatırımın kat kat geri döndü.",
          detay: "Bu buluşun bir parçası olmak seni tarihe geçirdi.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -30,
          mesaj: "Makine bir türlü düzgün çalışmadı; mucit projeyi terk etti.",
          detay: "Her icat başarıya ulaşmıyor.",
        },
      },
      {
        metin: "Riske girme, parana sahip çık.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi geri çevirdin; parana dokunmadın.",
          detay: "Bazı fırsatlara güvenmemek daha akıllıca.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Makine gerçekten çalışınca içinde hafif bir pişmanlık hissettin.",
          detay: "Keşke risk alsaydım diye düşünüp durdun.",
        },
      },
    ],
  },
  {
    id: "sd_icat_kendi_bulusu",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    minYas: 16,
    agirlik: 0.5,
    ton: "hafif",
    gorsel: "💡",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Aklına Gelen Bir Fikir",
    metin: "İşinde tekrarlayan bir zorluğu çözmek için basit ama akıllıca bir düzenek tasarladın. Belki işe yarar, belki de kimse umursamaz.",
    secenekler: [
      {
        metin: "Fikri patronuna/loncana sun.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: -6,
          para: 15,
          un: 3,
          mesaj: "Düzeneğin işe yaradı; adın 'akıllı biri' olarak anılmaya başladı.",
          detay: "Küçük fikirler bazen büyük fark yaratıyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -3,
          mesaj: "Fikrin 'saçma' bulundu, biraz alay konusu oldun.",
          detay: "Her fikir takdir görmüyor.",
        },
      },
      {
        metin: "Kendine sakla, sadece kendi işinde kullan.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Düzenek kendi işini kolaylaştırdı; kimseyle paylaşmadın ama işin rahatladı.",
          detay: "Bazı fikirler sadece kendine ait kalabilir.",
        },
        basarisizSonuc: {
          mesaj: "Düzenek pek işe yaramadı, denemekten vazgeçtin.",
          detay: "Her fikir mükemmel çalışmıyor.",
        },
      },
    ],
  },
  {
    id: "komik_kecinin_donusu",
    kategori: "sosyal",
    gerekliEtiketler: [
      "unvan:Keçi Fatihi",
    ],
    agirlik: 0.9,
    ton: "hafif",
    gorsel: "🐐",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Şeytanın Dönüşü",
    metin: "Yıllar önce pazar yerinde destansı bir şekilde yakaladığın o 'Şeytani Keçi' kasabaya geri döndü. Kin dolu gözlerle doğrudan sana bakıyor ve toynaklarını yere vuruyor. Bir rövanş istiyor!",
    secenekler: [
      {
        metin: "Meydan okumayı kabul et! Onu bir kez daha indireceğim.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 30,
          mutluluk: 12,
          unvan_kazan: "Efsanevi Keçi Fatihi",
          mesaj: "Toz bulutu kalktığında keçi pes etmiş halde ayaklarının dibindeydi! Kalabalık seni çılgınca alkışlıyor.",
          detay: "Tarih kitapları seni bu saçma ama muazzam zaferinle yazacak.",
        },
        basarisizSonuc: {
          un: -15,
          saglik: -10,
          mutluluk: -15,
          mesaj: "Keçi yıllar içinde yeni dövüş sanatları öğrenmiş! Seni boynuzlayıp çamurun içine fırlattı ve zaferle meledi.",
          detay: "Unvanını kaybettin. Yeni kral o.",
        },
      },
      {
        metin: "Kaç! Bu keçi artık eskisi gibi değil!",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: -20,
          mutluluk: -5,
          mesaj: "Arkanı dönüp çığlık çığlığa dükkanına kaçtın ve kapıyı kilitledin.",
          detay: "Fatih unvanın çizildi ama en azından kemiklerin sağlam.",
        },
        basarisizSonuc: {
          un: -20,
          saglik: -8,
          mutluluk: -10,
          mesaj: "Kapıya iki adım kala keçi seni arkadan toslayıp yüzüstü çamura yatırdı. Kalabalık kahkahadan yıkıldı.",
          detay: "Kaçmak bile beceri istiyormuş.",
        },
      },
    ],
  },
  {
    id: "is_ikilem_amirin_haksiz_emri",
    kategori: "siyaset",
    agirlik: 1,
    gorsel: "📋",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Haksız Emir",
    metin: "{amir} senden, masum birini haksız yere suçlamanı istiyor — böylece kendi hatası örtbas olacak. İtaat edersen terfi sözü var, etmezsen misillemeden korkuyorsun.",
    secenekler: [
      {
        metin: "Emri uygula, sessiz kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 15,
          un: 8,
          ahlak: -20,
          mesaj: "Emri uyguladın; {amir} memnun, suçsuz biri bedel ödedi ama sicilin tertemiz görünüyor.",
          detay: "Bazı terfiler başkasının sırtından geliyor.",
        },
        basarisizSonuc: {
          ahlak: -20,
          un: -10,
          mesaj: "Yalanın ortaya çıktı; hem vicdan azabı hem de itibar kaybı yaşadın.",
          detay: "Kirli işler nadiren tertemiz kalıyor.",
        },
      },
      {
        metin: "Emri reddet, gerçeği söyle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 22,
          dost_puani: 10,
          mesaj: "Gerçeği söyledin; masum kişi aklandı, {amir} sana kin besledi ama içindeki huzuru kimse alamaz.",
          detay: "Bazı zaferler terfiden daha değerlidir.",
        },
        basarisizSonuc: {
          para: -15,
          un: -15,
          ahlak: 15,
          mesaj: "{amir} seni 'itaatsizlikle' cezalandırdı; kariyerin sekteye uğradı ama vicdanın tertemiz.",
          detay: "Doğruyu söylemenin bir bedeli oldu, ödedin.",
        },
      },
    ],
  },
  {
    id: "is_ikilem_meslektas_hatasi",
    kategori: "sosyal",
    gerekliEkip: true,
    agirlik: 0.9,
    gorsel: "🤐",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Başkasının Hatası",
    metin: "{ekip} ciddi bir hata yaptı; fark edilirse ikinizin de başı belaya girebilir. Hatayı üstlenip onu korursan bedelini sen ödersin, ihbar edersen o öder.",
    secenekler: [
      {
        metin: "Hatayı üstlen, {ekip}'i koru.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: -15,
          dost_puani: 15,
          mesaj: "Hatayı üstlendin; {ekip} sana ömür boyu minnettar kaldı ama sicilinde bir leke oluştu.",
          detay: "Bazı sadakatler pahalıya mal oluyor, yine de değer.",
        },
        basarisizSonuc: {
          un: -25,
          para: -10,
          mesaj: "Üstlendin ama gerçek anlaşıldı; hem itibarın hem de {ekip}'in güvenini kaybettin.",
          detay: "Bazı fedakarlıklar boşa gidiyor.",
        },
      },
      {
        metin: "Durumu üstlerine bildir.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 5,
          ahlak: -8,
          ekip_kaybi: true,
          mesaj: "İhbar ettin, {ekip} işten çıkarıldı; sicilin temiz kaldı ama ekipte adın 'güvenilmez' oldu.",
          detay: "Kendini korudun ama bir bedeli oldu.",
        },
        basarisizSonuc: {
          un: -5,
          ahlak: -8,
          mesaj: "İhbarın ciddiye alınmadı, üstüne 'gammaz' diye anıldın.",
          detay: "Bazı ihbarlar amacına ulaşmıyor.",
        },
      },
    ],
  },
  {
    id: "is_ikilem_rakibin_sirri",
    kategori: "siyaset",
    agirlik: 0.9,
    gorsel: "🗝️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rakibinin Sırrı",
    metin: "{rakip} hakkında onu tamamen bitirebilecek karanlık bir sır öğrendin. Bunu yayarsan itibarı yerle bir olur, sen de önündeki en büyük engeli kaldırmış olursun. Ama bu bir silah gibi, geri tepebilir de.",
    secenekler: [
      {
        metin: "Sırrı herkese yay, {rakip}'i bitir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          rakip_puani: -25,
          ahlak: -18,
          mesaj: "Sır şehirde yayıldı; {rakip} bir gecede itibarını kaybetti. Yolun açıldı ama nasıl açıldığını unutamayacaksın.",
          detay: "Bazı zaferlerin tadı ağızda acı bırakıyor.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -18,
          rakip_puani: 10,
          mesaj: "Sırrın kaynağının sen olduğun anlaşıldı; 'iftiracı' damgası yedin, {rakip} ise mağdur rolünde güçlendi.",
          detay: "Karanlık silahlar bazen elinde patlıyor.",
        },
      },
      {
        metin: "Sırrı sakla, dürüst yoldan rekabet et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Sırrı hiç kullanmadın; içinde bir yerde bunun doğru olduğunu biliyorsun.",
          detay: "Bazı silahları hiç çekmemek de bir güçtür.",
        },
        basarisizSonuc: {
          rakip_puani: 8,
          mutluluk: -3,
          mesaj: "Sessiz kaldın ama {rakip} senin bu 'zayıflığını' fark edip daha da cüretkarlaştı.",
          detay: "İyilik bazen fırsata dönüştürülüyor.",
        },
      },
    ],
  },
  {
    id: "is_ikilem_ekip_istifa",
    kategori: "ticaret",
    gerekliEkip: true,
    agirlik: 0.9,
    gorsel: "📤",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "İstifa Mektubu",
    metin: "{ekip}, daha iyi bir teklif aldığını söyleyip istifasını sundu. Onu elinde tutmak istiyorsan maaşını hatırı sayılır biçimde artırman gerekecek.",
    secenekler: [
      {
        metin: "Maaşını artır, elinde tut.",
        baseBasariSansi: 80,
        maliyet: 15,
        basariliSonuc: {
          para: -15,
          mesaj: "{ekip} teklifi kabul edip kaldı; sadakati bir kez daha kanıtlandı.",
          detay: "Bazı yatırımlar sadece altın değil, güven de satın alıyor.",
        },
        basarisizSonuc: {
          para: -15,
          ekip_kaybi: true,
          mesaj: "Artışa rağmen {ekip} yine de ayrıldı; para da gitti, deneyim de.",
          detay: "Bazen hiçbir teklif yeterli olmuyor.",
        },
      },
      {
        metin: "Bırak gitsin, yeni birini bulursun.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ekip_kaybi: true,
          mesaj: "{ekip} güzellikle ayrıldı; yerini doldurmak biraz zaman alacak.",
          detay: "Her ayrılık bir kapının kapanıp diğerinin açılmasıdır.",
        },
        basarisizSonuc: {
          ekip_kaybi: true,
          un: -5,
          mesaj: "{ekip} ayrılırken bazı sırlarını rakiplerine taşıdı.",
          detay: "Bazı ayrılıklar sessiz kalmıyor.",
        },
      },
    ],
  },
  {
    id: "is_ikilem_sahte_evrak",
    kategori: "ticaret",
    agirlik: 0.8,
    gorsel: "✒️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sahte Mühür Teklifi",
    metin: "Tanıdığın bir kâtip, gerekli belgeleri sahte bir mühürle 'düzeltebileceğini' söylüyor — bu, seni bekleyen uzun ve zahmetli bürokrasiyi bir gecede aşmanı sağlar. Yakalanma riski düşük ama sıfır değil.",
    secenekler: [
      {
        metin: "Teklifi kabul et, kısa yoldan ilerle.",
        baseBasariSansi: 65,
        maliyet: 12,
        basariliSonuc: {
          para: 30,
          un: 5,
          ahlak: -18,
          mesaj: "Sahte mühür sorunsuz işe yaradı; işin bir gecede hallolunca kimse bir şey fark etmedi.",
          detay: "Kısa yol seni hedefe ulaştırdı ama vicdanın biliyor.",
        },
        basarisizSonuc: {
          para: -30,
          un: -25,
          ahlak: -18,
          olum_sansi: 3,
          mesaj: "Sahtekarlık ortaya çıktı! Ağır bir ceza ve yerle bir olan bir itibarla baş başa kaldın.",
          detay: "Bazı kısayollar uçurumun kenarından geçiyor.",
        },
      },
      {
        metin: "Reddet, uzun ama dürüst yoldan ilerle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Uzun bürokrasiyi sabırla aştın; yavaş ama sağlam ilerledin.",
          detay: "Dürüstlük bazen sabır ister.",
        },
        basarisizSonuc: {
          para: -8,
          mutluluk: -3,
          mesaj: "Bürokrasi umduğundan da uzun sürdü, epey vakit ve sinir kaybettin.",
          detay: "Dürüst yol her zaman kolay değildir.",
        },
      },
    ],
  },
  {
    id: "is_ikilem_fazla_mesai",
    kategori: "saglik",
    agirlik: 0.8,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Mum Işığında Çalışmak",
    metin: "Ekstra bir görev fazladan kazanç vaat ediyor ama gecelerini de yiyip bitirecek. Bedenin dinlenmeyi hak ediyor ama para da cazip.",
    secenekler: [
      {
        metin: "Fazladan çalış, uykusuz kal.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: -9,
          un: -3,
          para: 22,
          saglik: -12,
          mesaj: "Haftalarca az uyudun ama sonunda kasan hatırı sayılır şekilde doldu.",
          detay: "Bazı kazançların bedelini bedenin öder.",
        },
        basarisizSonuc: {
          para: 10,
          saglik: -20,
          mutluluk: -8,
          mesaj: "Yorgunluktan bir gün işin başında bayıldın; kazandığın paranın çoğu ilaca gitti.",
          detay: "Beden er ya da geç faturayı kesiyor.",
        },
      },
      {
        metin: "Reddet, dinlenmeyi seç.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 8,
          mutluluk: 3,
          mesaj: "Reddettin, iyi dinlendin; bedenin sana teşekkür ediyor.",
          detay: "Bazen en iyi kazanç, dinlenmiş bir bedendir.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Dinlendin ama fırsatı kaçırdığına dair içinde hafif bir pişmanlık var.",
          detay: "Her doğru seçim pişmanlıksız değildir.",
        },
      },
    ],
  },
];
