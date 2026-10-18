import type { OlayTanimi } from "./types";

export const OLAY_GENEL: OlayTanimi[] = [
  {
    id: "kg_agir_idman",
    kategori: "saglik",
    agirlik: 0.6,
    gorsel: "🏃",
    baslik: "Sınırları Zorlamak",
    metin: "Son zamanlarda zayıf düştün. Eski direncine kavuşmak için sınırlarını zorlayan ağır bir idmana başlayabilirsin. Ama bedenin kaldırır mı?",
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
          mesaj: "Kasların çeliğe döndü. Bedenin en ağır darbelere bile dayanır oldu.",
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
          mesaj: "Beden yükü kaldıramadı. Dizin yırtıldı; yağmurda sızlayan kalıcı bir ağrın var.",
        },
      },
      {
        metin: "Riske girme, hafif yürüyüşle yetin.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Güvenli yolu seçtin. Terlemedin ama sakatlanmadın da.",
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
    metin: "Pazarda tuhaf giyimli bir yabancı sana mühürlü, deri kaplı bir kitap sattı. İçindekiler yetkililerce yasaklı; tehlikeli sırlar olabilir.",
    secenekler: [
      {
        metin: "Mührü kır, karanlık ilmi oku.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: 5,
          ahlak: -15,
          etiket_ekle: [
            "bilgi:yasak_ilim",
          ],
          mesaj: "Kitap dünyaya bakışını değiştirdi. Sıradan insanların bilmediğini biliyorsun.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -20,
          mesaj: "Okurken komşun seni pencereden görüp şikâyet etti. İtibarın yerle bir.",
        },
      },
      {
        metin: "Kitabı okumadan yetkililere ver.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          un: 10,
          mesaj: "Kitabı teslim ettin. Yetkililer sadakatini ve inancını takdir etti.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kitabı verdin ama içinde ne yazdığı ömür boyu merak olarak kaldı.",
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
    metin: "{dost} seni şehrin en izbe meyhanesine götürdü. Yan masadaki şüpheli adamların değerli ticari/siyasi sırlar konuştuğunu fark ettin.",
    secenekler: [
      {
        metin: "İçki ısmarla, ağızlarını ara.",
        baseBasariSansi: 55,
        maliyet: 15,
        basariliSonuc: {
          saglik: 2,
          para: -10,
          etiket_ekle: [
            "istihbarat_var",
          ],
          mesaj: "Adamlar içkiyle döküldü. Şehrin geleceğine dair değerli bilgi aldın.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -10,
          mesaj: "Adamlar niyetini anladı. Seni meyhanenin arkasında iyice hırpaladılar.",
        },
      },
      {
        metin: "Masana bak, sadece {dost} ile iç.",
        baseBasariSansi: 70,
        basariliSonuc: {
          dost_puani: 10,
          mutluluk: 3,
          etiket_ekle: [
            "bagimlilik:alkol_meyil",
          ],
          mesaj: "İçip eğlendiniz. Ama bu hayata biraz fazla alıştığını fark ediyorsun.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Aklın yan masada kaldığı için {dost} ile sohbet yavan geçti.",
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
    metin: "Bir akraban, kuracağı demirci/dokumacı dükkânı için sermayene ortak olmak istiyor. Büyük kazandırmaz ama para yabancıya gitmez.",
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
          mesaj: "Dükkân tıkır tıkır işliyor; her yıl düzenli, helal bir pay alıyorsun.",
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -5,
          mesaj: "Dükkân beklenen işi yapmadı. Aile yemeğinde konu açılınca yüzler asılıyor.",
        },
      },
      {
        metin: "Ticaretle kan bağını karıştırma, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Paran cebinde kaldı. Kardeşin biraz bozuldu ama risk almadın.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kardeşin borç bulup dükkânı açtı ve çok kazandı. Şimdi içten içe pişmansın.",
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
    metin: "Eski, çaresiz bir dostun dükkânını kurtarmak için borç istiyor ve çok yüksek faiz öneriyor. Teklif hem kârlı hem ahlaken tartışmalı.",
    secenekler: [
      {
        metin: "Ahlakı boş ver, yüksek faizle borç ver.",
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
          mesaj: "Dostuna faizle borç verdin. Yüzündeki minnet ve nefreti unutamıyorsun.",
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
          mesaj: "Sözleşmeyi imzalattın ama dostluğun bittiği çok açık.",
        },
      },
      {
        metin: "Tefecilik yapmam, param bende kalsın.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Faizle borç vermedin. Dükkânı battı ama vicdanın ve paran yerinde.",
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
    metin: "Eski dostuna verdiğin borcun vadesi doldu. Kapısına dayandın; ağlayarak işlerin kötü gittiğini, parası olmadığını söylüyor.",
    secenekler: [
      {
        metin: "Adam tut, dükkâna el koy, onu sokağa at.",
        baseBasariSansi: 95,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 60,
          ahlak: -30,
          etiket_sil: [
            "yatirim:tefecide",
            "yatirim:tefeci_zamani",
          ],
          etiket_ekle: [
            "itibar:acimasiz_tefeci",
          ],
          mesaj: "Adamlarını gönderdin. Dostunun ailesi ağlarken dükkânın anahtarını aldın.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: 40,
          ahlak: -20,
          un: -15,
          etiket_sil: [
            "yatirim:tefecide",
            "yatirim:tefeci_zamani",
          ],
          mesaj: "Dükkânı zorla aldın ama mahalleli seni yuhaladı. Arkandan 'kan emici' diyorlar.",
        },
      },
      {
        metin: "Eski günlerin hatırına borcu sil.",
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
          mesaj: "Senetleri gözünün önünde yırttın. Dostun ayağına kapandı. Para gitti, ruh kaldı.",
        },
        basarisizSonuc: {
          ahlak: 25,
          etiket_sil: [
            "yatirim:tefecide",
            "yatirim:tefeci_zamani",
          ],
          mesaj: "Borcu sildin. İçin rahat ama eve dönerken o paraya muhtaç olduğunu hatırladın.",
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
    metin: "Kriz evine ulaştı: kilerde erzak yok, dükkân iflasın eşiğinde. Son sermayeni ya yiyeceğe ya da işini kurtarmaya harcayabilirsin.",
    secenekler: [
      {
        metin: "İşi boşver, son paramla erzak al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: -30,
          saglik: 5,
          ahlak: 15,
          un: -15,
          mesaj: "Tezgâhı kapattın. İflas ettin ama akşam sofrada ailen sıcak çorba içiyor.",
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -10,
          mesaj: "Sermayeyi erzağa verdin ama karaborsacı seni dolandırdı. İflas ettin, aç kaldın.",
        },
      },
      {
        metin: "Aile dişini sıksın, parayı işime harca.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 50,
          saglik: -25,
          ahlak: -20,
          un: 15,
          mesaj: "Herkes batarken sen zenginleştin! Ama ailen yetersiz beslenmeden eriyor.",
        },
        basarisizSonuc: {
          para: -40,
          saglik: -30,
          mutluluk: -25,
          mesaj: "Risk aldın ve kaybettin. Son paran gitti, ailen açlıktan hastanelik oldu.",
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
    metin: "Asık suratlı vergi tahsildarı kapında, yüklü rakamı okuyor. Sonra etrafa bakıp mırıldanıyor: 'Belki yanlış yazmışımdır, düzelir.'",
    secenekler: [
      {
        metin: "Anladım de, masanın altından rüşvet ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı",
        },
        onTepki: {
          metin: "Tahsildar keseyi aldı: 'Bu sadece bu ay.'",
          geriCekilMetni: "Sinirlen, onu kov! (Rüşvetten dön)",
          geriCekilSonucu: {
            para: -25,
            un: 5,
            ahlak: 10,
            mesaj: "Adamı bağırıp kovdun, vergini dürüstçe ödedin. Paran gitti, onurun kaldı.",
          },
          devamMetni: "Sessizce kabul et, çarka gir.",
          devamSonucu: {
            suc_sinifi: "orta",
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
        metin: "Vergiyi tam öde.",
        baseBasariSansi: 95,
        maliyet: 30,
        basariliSonuc: {
          para: -30,
          ahlak: 15,
          etiket_ekle: [
            "itibar:durust_mukellef",
          ],
          mesaj: "Tahsildar somurtarak tüm vergiyi aldı. Cebin delindi ama kimseye boyun eğmedin.",
        },
        basarisizSonuc: {
          para: -30,
          mesaj: "Vergiyi ödedin ama tahsildar seni mimledi. Helal kazancın bile şüpheli.",
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
    metin: "Şehrin en zengin ve en karanlık adamlarından biri, yasadışı bir malı depolarında saklaman karşılığında dolu bir altın kesesi uzatıyor.",
    secenekler: [
      {
        metin: "Altını al, malı sakla.",
        baseBasariSansi: 80,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 45,
          ahlak: -25,
          etiket_ekle: [
            "sir:karanlik_ortak",
          ],
          mesaj: "Keseyi cübbene sakladın. Zenginleştin ama gece kapı çalınca kalbin gümleyecek.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: -20,
          ahlak: -25,
          un: -30,
          mesaj: "Çıraklarından biri seni gördü! İhbar edildin, ceza yedin, itibarın lekelendi.",
        },
      },
      {
        metin: "Hiddetle reddet, adamı kov.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          etiket_ekle: [
            "itibar:satinalinamaz",
          ],
          mesaj: "Adamı dükkânından kovdun! Halk cesaretini konuşuyor; 'Satılamaz Adam'sın.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          rakip_puani: 20,
          mesaj: "Adam keseyi alırken gözlerini kıstı. O günden beri en karanlık düşmanın.",
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
    metin: "Düşman hatları önünde. Saldırırsan zafer yakın ama gencecik askerlerin çoğu ölecek. Beklersen askerler yaşar, savaş kaybedilebilir.",
    secenekler: [
      {
        metin: "Ölüme yürüyoruz! Saldırı emri ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 35,
          para: 20,
          ahlak: -25,
          unvan_kazan: "Kanlı Kumandan",
          mesaj: "Düşmanı ezdin! Savaşın kahramanısın ama o genç cesetler rüyalarına giriyor.",
        },
        basarisizSonuc: {
          saglik: -25,
          un: -20,
          ahlak: -20,
          olum_sansi: 15,
          mesaj: "Saldırı kıyıma döndü. Hem askerlerini kaybettin hem yenildin.",
        },
      },
      {
        metin: "Geri çekilin! Askerlerimi feda edemem.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 25,
          un: -15,
          unvan_kazan: "Merhametli Komutan",
          mesaj: "Düşman ilerledi, savaş kayıp. Ama askerlerin sana minnettar, canları kurtuldu.",
        },
        basarisizSonuc: {
          un: -25,
          mesaj: "Kral seni korkak ilan etti. Rütbelerin sökülme tehlikesinde.",
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
    metin: "Artık şehrin ticaret hâkimisin. Tüm mallara tekel koyup küçük esnafı ezebilir ya da malları paylaşıp halkın adamı olabilirsin.",
    secenekler: [
      {
        metin: "Tekel kur, malları kendi depolarına çek.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 60,
          ahlak: -30,
          unvan_kazan: "Açgözlü Baron",
          mesaj: "Piyasayı sömürdün. Esnaf iflas ederken sen altından kuleler kuruyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          mutluluk: -15,
          mesaj: "Esnaf isyan edip depolarını yaktı! Açgözlülük büyük bir yangınla bitti.",
        },
      },
      {
        metin: "Malları adil dağıt, esnafı koru.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 30,
          un: 20,
          para: -10,
          unvan_kazan: "Halkın Tüccarı",
          mesaj: "Şehrin esnafı sana dua ediyor. Zenginleşmedin ama şehrin en sevilen adamı oldun.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Adil olmaya çalıştın ama büyük tüccarlar seni aralarından dışladı.",
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
    metin: "Şehrin en zengin soylusu tapınağında cinayet işledi. Aforoz edip idama gönderebilir ya da yüklü bir 'bağış' karşılığı affedebilirsin.",
    secenekler: [
      {
        metin: "Tanrı'nın adaleti satılmaz! Aforoz et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 40,
          un: 25,
          etiket_ekle: [
            "itibar:adalet_kilici",
          ],
          mesaj: "Soylu şok içinde zincire vuruldu. Halk cesaretini ayakta alkışlıyor!",
        },
        basarisizSonuc: {
          dost_puani: -20,
          olum_sansi: 20,
          mesaj: "Soylunun ailesi bir gece tapınağına silahlı adamlar gönderdi. Canın tehlikede!",
        },
      },
      {
        metin: "Bağışı sessizce al, günahını temizle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 50,
          ahlak: -35,
          un: -20,
          etiket_ekle: [
            "sir:gunah_satici",
          ],
          mesaj: "Altınlar mahzenine girdi, soylu serbest. Halk nefret ediyor, aynaya bakamazsın.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
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
    metin: "Birliğin kışlık erzağı ve kılıçları için altın tahsis edildi. Parayı gerçekten askere harcayabilir ya da sahte kayıtlarla cebe atabilirsin.",
    secenekler: [
      {
        metin: "Tüm parayı askerin eğitimine ve karnına harca.",
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
          mesaj: "Askerlerin tok, kılıçları keskin. Savaşta arkanda duvar gibi duracaklar.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Tüccarlar seni kazıkladı, erzak eksik geldi ama niyetin iyiydi.",
        },
      },
      {
        metin: "Kaydı değiştir, altını sakla.",
        baseBasariSansi: 50,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 35,
          ahlak: -25,
          etiket_ekle: [
            "sir:ordu_hirsizi",
          ],
          mesaj: "Altınları zulaladın. Askerler paslı kılıçla talim yapıyor, umurunda değil.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: -10,
          un: -30,
          ahlak: -20,
          mesaj: "Müfettiş sahte kayıtları buldu! Divanıharbe verildin, itibarın yerle bir.",
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
    metin: "Komşunun gözleri garip bakan o deli keçisi ipini koparıp bahçene, çamaşırlarının arasına daldı. Bütün mahalle camlarda seni izliyor.",
    secenekler: [
      {
        metin: "Savaş narası at, keçiye atla!",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 8,
          un: 10,
          unvan_kazan: "Keçi Fatihi",
          etiket_ekle: [
            "unvan:Keçi Fatihi",
          ],
          mesaj: "Havada süzülüp keçiyi boynuzlarından mıhladın! Mahalle seni çılgınca alkışlıyor.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          un: -10,
          saglik: -5,
          mesaj: "Keçi seni çamur birikintisine uçurdu. Üstüne pantolonunu da yedi.",
        },
      },
      {
        metin: "Bulaşma, içeri kaç, kapıyı kilitle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Keçi çamaşırları biraz çiğneyip sıkılarak gitti. Gururun incindi ama sağlamsın.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Keçi bahçeyi mahvetti, üstüne boynuzuyla camı kırdı.",
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
    metin: "Günlerdir uyuyamıyorsun. Göz kapakların ağırlaşınca duvarda olmayan şekiller, ölmüş dostların (veya düşmanların) yüzleri beliriyor.",
    secenekler: [
      {
        metin: "Rahibe/hocaya git, dua ve muska iste.",
        baseBasariSansi: 60,
        maliyet: 10,
        basariliSonuc: {
          mutluluk: 6,
          saglik: 8,
          para: -10,
          mesaj: "Dualar ve tütsü işe yaradı. Sonunda deliksiz uyudun.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -5,
          mesaj: "Muskalar işe yaramadı, hayaletler duvardan sana gülmeye devam etti.",
        },
      },
      {
        metin: "Aklımı kaçırıyorum! Kendim çözmeliyim.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Yorgunluktan bayıldın, beynin kendini sıfırladı.",
        },
        basarisizSonuc: {
          saglik: -15,
          mutluluk: -8,
          mesaj: "Uykusuzluktan merdivenden düştün. Bitkinlik bedenini de yıpratıyor.",
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
    metin: "İtibarın ve ahlakın yerlerde. Sokakta insanlar sana tükürüyor, esnaf mal satmak istemiyor.",
    secenekler: [
      {
        metin: "İtibarın için meydanda bedava erzak dağıt.",
        baseBasariSansi: 50,
        maliyet: 25,
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          para: -25,
          mesaj: "Cömertliğin mideye dokundu. Tükürenler şimdi sana 'hayırsever' diyor.",
        },
        basarisizSonuc: {
          para: -25,
          mutluluk: -10,
          mesaj: "Halk erzağı aldı ama arkandan küfretmeye devam etti. Para boşa gitti.",
        },
      },
      {
        metin: "Başını dik tut, sürüyü umursama.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Ne düşündükleri umurunda değil. Sert ve acımasız yoluna devam ettin.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          saglik: -5,
          mesaj: "Umursamaz görünsen de kafana çürük domates isabet etti. İçten içe çöküyorsun.",
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
    metin: "Yıllardır buradasın ama hâlâ hayalet muamelesi görüyorsun. Devlet kapıları yüzüne kapanıyor, pazarlıklar aleyhine bitiyor.",
    secenekler: [
      {
        metin: "Büyük festivalde ortaya çık, dikkat çek.",
        baseBasariSansi: 50,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          un: 20,
          mutluluk: 3,
          mesaj: "Gösterişli kıyafetin ve cömertliğin sayesinde bazıları sonunda adını öğrendi!",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -6,
          mesaj: "Çabaların fark edilmedi. Kalabalıkta cüzdanı hafiflemiş bir hiçkimsesin.",
        },
      },
      {
        metin: "Görünmezliğin tadını çıkar, sessizce çalış.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Görünmez olmak beladan uzak durmaktır. Kimse senden vergi veya rüşvet sormadı.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Görmezden gelinmek, günden güne ruhunu ezen bir yüke dönüştü.",
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
    metin: "Sokaklarda her şeyi duyan, kimin ne kadara mal sattığını bilen keskin gözlü (ama tehlikeli) bir muhbir sana çalışmayı teklif ediyor.",
    secenekler: [
      {
        metin: "İşe al, şehrin sırları senin olsun.",
        baseBasariSansi: 75,
        maliyet: 35,
        basariliSonuc: {
          para: -29,
          etiket_ekle: [
            "gozlemci_var",
          ],
          mesaj: "Muhbiri tuttun. Artık rakiplerinin hamlesini önceden kestirebiliyorsun.",
        },
        basarisizSonuc: {
          para: -35,
          mesaj: "Adam parayı alıp ertesi gün sırra kadem bastı. Dolandırıldın.",
        },
      },
      {
        metin: "Sezgilerim yeter, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Bu karanlık tiplere güvenmemekte haklıydın. İşine kendi aklınla devam ettin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sonra bir ihaleyi körü körüne kaybedince 'keşke o adamı tutsaydım' dedin.",
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
    metin: "Valinin konağında şüpheli bir yangın çıktı; içeride devasa bir altın sandığı savunmasız. Çatı dakikalar içinde çökecek. Düşünmeye vakit yok!",
    secenekler: [
      {
        metin: "İçeri dal ve o sandığı kap!",
        baseBasariSansi: 65,
        gerekliEksen: {
          eksen: "fevrilik",
          min: 60,
        },
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 45,
          un: 15,
          ahlak: -10,
          mesaj: "Alevlerin arasından sandıkla çıktın! Yanıkların var ama servetine servet kattın.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          saglik: -35,
          olum_sansi: 10,
          mesaj: "Kiriş kafana çöktü! Seni ölü gibi çıkardılar, günlerce komada kaldın.",
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
          mesaj: "Bina gözünün önünde çökerken 'İyi ki girmemişim' dedin. Canından kıymetli değil.",
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
    metin: "Yıllarca sana kan kusturan adam şimdi iflas etmiş, dizlerinin üstünde merhamet dileniyor. Kılıcını çekebilir veya ona ekmek verebilirsin.",
    secenekler: [
      {
        metin: "Acı, cebine altın koy, git de.",
        baseBasariSansi: 85,
        gerekliEksen: {
          eksen: "merhamet",
          min: 55,
        },
        basariliSonuc: {
          ahlak: 25,
          mutluluk: 8,
          mesaj: "İntikam zehrini içmedin. Düşmanın ağlayarak ellerini öptü ve şehri terk etti.",
        },
        basarisizSonuc: {
          ahlak: 15,
          saglik: -20,
          mesaj: "Arkanı dönünce sırtına hançer sapladı! Merhametin az kalsın seni öldürüyordu.",
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
          mesaj: "Acımadın, onu zindana/ölüme yolladın. Kimse adını anmaya cesaret edemiyor.",
        },
        basarisizSonuc: {
          un: -10,
          ahlak: -15,
          mesaj: "Zulmün halkı ayaklandırdı; seni durdurup adamı elinden aldılar.",
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
    metin: "Yüzü yara bere içinde, savaş görmüş usta bir kılıçşör emrine girmek istiyor. Peşinatı tuzlu ama seni her şeyden koruyacağına yemin ediyor.",
    secenekler: [
      {
        metin: "Seni tutuyorum, gölgem ol.",
        baseBasariSansi: 85,
        maliyet: 60,
        basariliSonuc: {
          para: -54,
          ekip_ekle: {
            rol: "Korumalı Yardımcı",
            tahminGenisligi: 16,
          },
          mesaj: "Adam işe başladı. Varlığı bile etrafındaki çakalları uzak tutmaya yetti.",
        },
        basarisizSonuc: {
          para: -60,
          mesaj: "Peşinatı aldığı gece sarhoş olup kumarda kaybetti ve şehirden kaçtı!",
        },
      },
      {
        metin: "Çok pahalısın, korumaya ihtiyacım yok.",
        baseBasariSansi: 88,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Teklifi reddettin. Paran cebinde, yalnız dolaşmaya devam ediyorsun.",
        },
        basarisizSonuc: {
          para: -8,
          mesaj: "Adam gidince iki serseri seni köşeye sıkıştırdı; 'korumasızsın' diye sırıttılar.",
          detay: "Gölgenin caydırıcılığı ödediğin paraya değer.",
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
    metin: "Sokakta büyümüş, zayıf ama cin gibi bir genç paçana yapıştı: 'Bir tas çorba ver, her işini yaparım.' Yetenekli mi, hırsız mı belli değil.",
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
          mesaj: "Çocuğu aldın. İlk günlerde sadık görünüyor; yeteneğini zaman gösterecek.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Çocuk ilk gün kasandan 10 altın çalıp sırra kadem bastı.",
        },
      },
      {
        metin: "Sokak faresi! Uzak dur.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Çocuğu itip yoluna devam ettin. Vicdanın hafifçe sızladı.",
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
    metin: "Yolculukta handa tanıştığın bir gezgin hedeflerinden etkilendi, seninle yürümek istiyor. Bilgili biri ama geçmişini saklıyor.",
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
          mesaj: "Sırt çantasını alıp peşine takıldı. Hikâyeleri yolculuğu çekilir kılıyor.",
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
          mesaj: "Handa yollarınızı ayırdınız. Yalnız yürümek en güvenlisi.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Yolun kalanı sessiz ve uzun geçti; gezginin hikâyelerini kaçırdığını düşündün.",
          detay: "Yalnızlık bazen sandığından ağır basar.",
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
    metin: "Çok değerli bir kargoyu 'Uçurum Geçidi'nden geçirmelisiniz. Orası haydut yuvası. Ekibi mi riske atacaksın, yoksa başa sen mi geçeceksin?",
    secenekler: [
      {
        metin: "Riski ben alırım! Kervanın başına geç.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 55,
          un: 20,
          mesaj: "Kılıcın ve cesaretinle kervanı geçirdin! Kazanç muazzam.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 20,
          mesaj: "Haydutlar pusu kurdu! Karnından okla vuruldun, mallar yağmalandı.",
        },
      },
      {
        metin: "{ekip}'e emret: 'Kargoyu sağ salim getirin.'",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: -11,
          para: 35,
          un: 3,
          mesaj: "Ekibin kan ter içinde ama başarıyla malları getirdi. Liderlik budur.",
        },
        basarisizSonuc: {
          ekip_kaybi: true,
          para: -20,
          mutluluk: -19,
          mesaj: "Günler geçti... Ne {ekip} döndü ne kargo. Vahşi doğa onları yuttu.",
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
    metin: "Saraydan gelen gizemli bir adam mühürlü bir mektup uzattı: 'Karşı kaleye ulaştır. Yakalanırsan seni tanımayız.' Çok tehlikeli bir görev.",
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
          mesaj: "Gecenin karanlığında mektubu teslim ettin. Saray sana çok şey borçlu.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 25,
          mesaj: "Sınır muhafızları seni yakaladı! İşkence gördün, canını zor kurtardın.",
        },
      },
      {
        metin: "Gölgelerde halledilsin, {ekip}'i yolla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -8,
          para: 20,
          un: 5,
          mesaj: "{ekip} görevi senin adına tamamlayıp sağ döndü.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          ekip_kaybi: true,
          mesaj: "Gönderdiğin yardımcı sınırda yakalanıp asıldı! Kanı senin ellerinde.",
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
    metin: "Şehirde düşmanların artıyor. Handa yüzü yaralı bir paralı asker hizmetini sunuyor. Kendini övüyor; ne kadar iyi olduğunu zaman gösterir.",
    secenekler: [
      {
        metin: "Koruman olarak tut.",
        baseBasariSansi: 85,
        maliyet: 15,
        basariliSonuc: {
          para: -15,
          ekip_ekle: {
            rol: "Koruma",
            tahminGenisligi: 70,
          },
          mesaj: "Parayı ödedin. Artık gölgen gibi seni izliyor.",
          detay: "Gerçek sadakatini bir kavgada öğreneceksin.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Parayı verdin ama adam gece yarısı ortadan kayboldu.",
          detay: "Han köşesinden adam tutarken dikkatli olmalıydın.",
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
          mesaj: "Reddettiğin adam çıkışta bekleyenlere fısıldamış gibiydi; pusuya düştün.",
          detay: "Düşmanların korumasız olduğunu önce öğrendi.",
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
    metin: "Gece sokağında üç serseri yolunu kesti, bıçakları parlıyor. Korumana geri çekilip işi halletmesini emrettin. Gizli yeteneğini görme vakti.",
    secenekler: [
      {
        metin: "Korumanın savaşmasını bekle.",
        baseBasariSansi: 50,
        ekipKalitesiZarBelirler: "Koruma",
        basariliSonuc: {
          un: 15,
          mesaj: "Koruman şimşek gibi üçünü de yere serdi! Tuttuğun adam tam bir ölüm makinesi.",
          detay: "Verdiğin her kuruşa değdi.",
        },
        basarisizSonuc: {
          saglik: -30,
          para: -20,
          ekip_sil: "Koruma",
          mesaj: "Koruman bıçakları görünce korkup kaçtı! Serseriler seni dövüp paranı aldı.",
          detay: "Yardımcın korkaktı. Para ve sağlık gitti.",
        },
      },
      {
        metin: "Korumaya güvenme, bıçağını sen de çek.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 10,
          saglik: -6,
          mesaj: "İkiniz serserileri püskürttünüz; yara aldın ama ayaktasın.",
          detay: "Bazen işi kimseye bırakmamak gerek.",
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
    metin: "İşlerin büyüyor; hesapları tutması için zeki görünümlü bir genci yaver almayı düşünüyorsun. Sana ya büyük kazanç ya da boş kasa getirebilir.",
    secenekler: [
      {
        metin: "Muhasebecin yap.",
        baseBasariSansi: 80,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          ekip_ekle: {
            rol: "Muhasebeci",
            tahminGenisligi: 85,
          },
          mesaj: "Genç masasına oturup defterleri düzenlemeye başladı.",
          detay: "Umarım matematiği dürüstlüğü kadar güçlüdür.",
        },
        basarisizSonuc: {
          para: -10,
          un: -5,
          mesaj: "Genç ilk haftanın ücretini alıp kayboldu. Defterlerden sayfalar da onunla gitti.",
          detay: "Zekiydi, evet — ama yanlış işlerde.",
        },
      },
      {
        metin: "İşi kendin yapmaya devam et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: -5,
          mesaj: "İş yükü sağlığını yordu ama kasanın anahtarı sende.",
          detay: "Güven pahalı bir lükstür.",
        },
        basarisizSonuc: {
          saglik: -12,
          mutluluk: -8,
          mesaj: "Defterlere gömülü bir kış seni yıprattı; gözlerin bulanık, sırtın tutuk.",
          detay: "Her şeyi tek başına taşımanın da bedeli var.",
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
    metin: "Sen şehir dışındayken büyük bir sevkiyatın yönetimi muhasebecine kaldı. Döndüğünde kasaya bakıyorsun.",
    secenekler: [
      {
        metin: "Hesapları kontrol et.",
        baseBasariSansi: 50,
        ekipKalitesiZarBelirler: "Muhasebeci",
        basariliSonuc: {
          para: 60,
          maas_carpani: 1.1,
          mesaj: "İnanamadın! Yaverin pazar açıklarını değerlendirip kârı ikiye katlamış.",
          detay: "Muazzam bir yetenek bulmuşsun.",
        },
        basarisizSonuc: {
          para: -40,
          ekip_sil: "Muhasebeci",
          mesaj: "Kasa bomboş! Yaverin nakdi alıp gece yarısı gemiyle kaçmış.",
          detay: "Bir hırsıza güvenmenin bedelini ödedin.",
        },
      },
      {
        metin: "Kontrol etme, güven, dinlen.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: 8,
          para: 10,
          mesaj: "Dinlenmek iyi geldi; döndüğünde kasa gerçekten iyi durumdaydı.",
          detay: "Bazen güvenmek de bir dinlenmedir.",
        },
        basarisizSonuc: {
          para: -30,
          mesaj: "Güvenin kötüye kullanıldı; yaverin parayı alıp kayboldu.",
          detay: "Kontrolsüz güven pahalıya patlar.",
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
    metin: "Ordu kaynıyor. 'Eski Muhafızlar' generalin soylu kurallarını, 'Yeni Nizam' liyakata dayalı reformu savunuyor. Silahlar birbirine dönebilir.",
    secenekler: [
      {
        metin: "Gelenek bizi yaşatır! Eski Muhafızlar'a katıl.",
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
        metin: "Çürümüş düzen değişmeli! Yeni Nizam'a katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Yeni Nizam",
          un: 15,
          ahlak: -5,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Reformcuların arasına genç bir aslan gibi girdin. Değişim rüzgârı esiyor!",
        },
        basarisizSonuc: {
          hizip_ata: "Yeni Nizam",
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama soylu general adını kara listeye aldı.",
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
    metin: "Ticaret odası bölündü. Liman Loncası tekeli, Pazar Birliği serbest rekabeti savunuyor. Taraf seçmezsen iflas edebilirsin.",
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
          mesaj: "Soylu tüccarlar seni aralarına aldı. Vergi indirimleri hemen başladı.",
        },
        basarisizSonuc: {
          hizip_ata: "Liman Loncası",
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama küçük esnaf sana sırt çevirdi.",
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
          mesaj: "Esnafın kahramanı oldun. Sokaktaki adam artık senin tezgâhından alıyor.",
        },
        basarisizSonuc: {
          hizip_ata: "Pazar Birliği",
          para: -15,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama asilzadeler mallarına ağır gümrük koydu.",
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
    metin: "İnanç merkezleri ikiye yarıldı. Gelenekçiler kadim, katı yasaları istiyor; Yenilikçiler dini halkın diline çevirmek. Hangi saftasın?",
    secenekler: [
      {
        metin: "Kurallar esnemez! Gelenekçiler'e katıl.",
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
          mesaj: "Genç cemaat seni yobazlıkla suçlayıp tapınağı terk etti.",
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
          mesaj: "Meydanlar seni dinlemeye akıyor. Yeni çağın sesi oldun.",
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
    metin: "Lonca bölündü: Lonca Meclisi eski usul, denetim ve sabit fiyatı; Serbest Ustalar kendi fiyatını koymayı savunuyor. Taraf seçmelisin.",
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
          mesaj: "Usta ustabaşılar seni bağrına bastı. Loncanın koruması artık arkanda.",
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
        metin: "Emeğin hakkı bana ait! Serbest Ustalar'a katıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          hizip_ata: "Serbest Ustalar",
          para: 15,
          un: 6,
          ahlak: -5,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Kendi fiyatını koymaya başladın; ilk haftadan cebin şişti.",
        },
        basarisizSonuc: {
          hizip_ata: "Serbest Ustalar",
          para: -10,
          etiket_ekle: [
            "hizip_secildi",
          ],
          mesaj: "Katıldın ama lonca seni malzeme tedarikinden dışladı; ilk aylar zor geçti.",
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
    metin: "{yil} antlaşmasıyla savaş bitti. Cepheden dönen yoldaşların iş arıyor. Hazine tamtakır, sokaklar gazi dolu. Yeni düzende yerin neresi?",
    secenekler: [
      {
        metin: "Eski yoldaşları topla, gazilere dayanışma ağı kur.",
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
          mesaj: "Yüzlerce gaziye iş ve aş buldun. Sana babalarından çok sadık bir ordun var.",
          detay: "Çoğu okuma bilmez ama senin için canını verir.",
        },
        basarisizSonuc: {
          para: -25,
          un: -10,
          ulke_etkisi: {
            savasta: false,
          },
          mesaj: "Söz verdiğin işleri bulamadın. Eski arkadaşların seni 'hayalperest' dedi.",
          detay: "Bir daha hiçbir askerin yüzüne bakamazsın.",
        },
      },
      {
        metin: "Fırsat! Sahipsiz arazileri yok pahasına kapat.",
        baseBasariSansi: 55,
        maliyet: 25,
        basariliSonuc: {
          para: 60,
          ahlak: -25,
          un: -10,
          ulke_etkisi: {
            savasta: false,
          },
          mesaj: "Şehitlerin tarlalarını üç kuruşa alıp tapularına el koydun. Toprak ağasısın.",
          detay: "Dullar pazarda tükürüyor; sen altın sayıyorsun.",
        },
        basarisizSonuc: {
          para: -30,
          ulke_etkisi: {
            savasta: false,
          },
          mesaj: "Aldığın arazilerin gerçek varisleri çıktı. Mahkeme tapularını iptal etti.",
          detay: "Ölülerin malı sana yar olmadı.",
        },
      },
      {
        metin: "İsyan edebilecek eski askerleri hükümete ihbar et.",
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
          mesaj: "Listeyi verdin. O gece onlarca yoldaşın zindana atıldı. Kesen dolu, elin kanlı.",
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
          mesaj: "Liste sızdı. Yoldaşların ihbarcıyı öğrendi; her gölgeden korkuyorsun, kuruş yok.",
          detay: "İhanet açığa çıkınca para da güvenlik de gitti.",
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
    metin: "Savaş en kanlı evresinde. Alayın ölüm kokan bir tabyaya sürülüyor. Komutan gece yarısı görev dağıtıyor; gözleri senin üzerinde.",
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
          mesaj: "Tabyayı kan gölüne çevirip içine ilk sen düştün! Göğsüne general madalya taktı.",
          detay: "Düşman yüzlerini unutamıyorsun; tarih adını yazar.",
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
          mesaj: "Bir gülle seni havaya uçurdu. Günlerce cesetler arasında ölü sanılıp bırakıldın.",
          detay: "Uyandığında bedeninden bir parça eksikti.",
        },
      },
      {
        metin: "Beni ikmal hattına verin komutanım.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: 15,
          un: -20,
          saglik: -5,
          mesaj: "Erzak çuvallarının ardında saklanıp savaşı sağ atlattın.",
          detay: "Dönen yoldaşların seninle oturmuyor. Utanç kalıcı.",
        },
        basarisizSonuc: {
          para: -15,
          un: -25,
          mesaj: "İkmal hattına sızan düşman süvarisi sizi kılıçtan geçirdi. Korkaklık korumadı.",
          detay: "Hem kaçtın hem esir düşmekten zor kurtuldun.",
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
    metin: "Savaş uzadıkça hazine tükendi. Üç aydır tek gümüş ödenmedi. Botlar delik, mideler boş. Kışlada isyan fısıltıları dolaşıyor.",
    secenekler: [
      {
        metin: "Elebaşı ol! Dilekçeyle generalin çadırına dayan.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 15,
          un: 25,
          ahlak: 15,
          etiket_ekle: [
            "asker_sozcusu",
          ],
          mesaj: "Yumruğunu masaya vurdun. General isyandan korkup son parayı dağıttı. Efsanesin!",
          detay: "Ama üst komuta seni 'tehlikeli asi' diye fişledi.",
        },
        basarisizSonuc: {
          un: -25,
          saglik: -20,
          olum_sansi: 15,
          mesaj: "General seni dinlemedi bile. İsyana teşvikten kırbaç yedin ve zindana atıldın.",
          detay: "Arkandaki askerler korkup seni sattı.",
        },
      },
      {
        metin: "Haklısınız de, ama köyleri yağmalamaya ikna et.",
        baseBasariSansi: 65,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 45,
          ahlak: -40,
          un: -15,
          etiket_ekle: [
            "sir:koy_yagmaci",
          ],
          mesaj: "Aç askerlerle geceleyin köylere daldınız. Altınla döndünüz; gökyüzü kızıldı.",
          detay: "Ağlayan köylü kadının yüzü kabuslarında.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          saglik: -30,
          ahlak: -25,
          un: -20,
          olum_sansi: 10,
          mesaj: "Köylüler tırpan ve baltayla pusu kurdu; karnından ağır yaralandın.",
          detay: "Yağma yaparken köylüden dayak itibarını bitirdi.",
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
    metin: "Aylar süren dehşetten sonra veba çekiliyor. Nüfusun üçte biri yok. Sahipsiz evler, dükkânlar, aç yetimler var. Şehir yeniden doğuyor.",
    secenekler: [
      {
        metin: "Sahipsiz mülklere sahte tapuyla el koy.",
        baseBasariSansi: 60,
        maliyet: 15,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 50,
          ahlak: -35,
          un: -15,
          maas_carpani: 1.3,
          ulke_etkisi: {
            vebada: false,
          },
          mesaj: "Ölülerin evlerine çöktün. Dev emlak imparatorluğu kurdun; kâbuslarında o yüzler.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: -25,
          un: -25,
          ahlak: -30,
          ulke_etkisi: {
            vebada: false,
          },
          mesaj: "Gerçek varisler döndü. Sahtekârlıktan yargılandın, halk seni linç etmeye kalktı.",
        },
      },
      {
        metin: "Vebadan kurtulan yetimleri topla, yurt kur.",
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
          mesaj: "Yetimler senin elinde büyüdü. Artık sadece çırak değil, en sadık evlatlarınsın.",
          detay: "O çocuklar yıllar sonra işini sırtlayacak.",
        },
        basarisizSonuc: {
          para: -30,
          ahlak: 15,
          ulke_etkisi: {
            vebada: false,
          },
          mesaj: "Çocukların bakımı seni tüketti. Bazıları çalıp kaçtı ama vicdanın rahat.",
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
    metin: "Devlet yeni para bastı, yollar açıldı. Krizin tozu kalkıyor. İlk cesur hamleyi yapan piyasanın kaymağını yer.",
    secenekler: [
      {
        metin: "Borca gir, tüm malları topla! Agresif büyü.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 50,
          un: 20,
          maas_carpani: 1.3,
          ulke_etkisi: {
            ekonomi: "iyi",
          },
          mesaj: "Rakipler titrerken sen depoları doldurdun. Toparlanma dalgasını yakaladın!",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -40,
          un: -10,
          ulke_etkisi: {
            ekonomi: "normal",
          },
          mesaj: "Acele ettin. Fiyatlar yeniden dibe vurunca borçlar boğdu. Her şeyi kaybettin.",
        },
      },
      {
        metin: "Temkinli ol, azar azar al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 20,
          ulke_etkisi: {
            ekonomi: "normal",
          },
          mesaj: "Risksiz, sağlam adımlarla ilerledin. Zengin olmadın ama ayakların yere basıyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -5,
          un: -5,
          ulke_etkisi: {
            ekonomi: "normal",
          },
          mesaj: "Çok bekledin; sen girene kadar büyük kurtlar tüm ihaleleri kapmıştı.",
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
    metin: "İlk kez sana rüşvet teklif ediliyor. Bir müteahhit, bir yerde iki kelime edersen ihalenin ona kalacağını söylüyor. Kese masada.",
    secenekler: [
      {
        metin: "Keseyi al, iki kelimeyi et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 50,
          ahlak: -28,
          etiket_ekle: [
            "rusvet_agi",
          ],
          mesaj: "İhale ona kaldı, kese sana. Kimse bir şey sormadı.",
          detay: "Ne kolay olduğu ürküttü. İkinci kese gelecek.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: -20,
          un: -30,
          ahlak: -22,
          mesaj: "Müteahhit yakalandı ve ilk iş senin adını verdi.",
          detay: "İtibarın çöktü; doğru, itiraz edemezsin.",
        },
      },
      {
        metin: "Reddet, teklifi kayda geçir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 24,
          ahlak: 25,
          etiket_ekle: [
            "durust_bilinen",
          ],
          mesaj: "Teklifi belgeledin; müteahhit yargılandı, adın temize çıktı.",
          detay: "Dürüstlüğün sermaye oldu. Biri seni affetmeyecek.",
        },
        basarisizSonuc: {
          para: -22,
          un: -12,
          ahlak: 20,
          mesaj: "Reddettin; müteahhit önce iftira attı, sonra işlerini baltaladı.",
          detay: "Kimse teklife inanmadı. Bedeli yalnız ödüyorsun.",
        },
      },
      {
        metin: "Ne al ne reddet: şantajla ihaleyi kap.",
        baseBasariSansi: 45,
        maxAhlak: 40,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 60,
          un: 15,
          ahlak: -30,
          mesaj: "Müteahhidi tehditle çektirip ihaleyi bizzat aldın.",
          detay: "Zayıflığı paraya çevirdin. Kural artık senin.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: -25,
          un: -28,
          ahlak: -22,
          olum_sansi: 10,
          mesaj: "Müteahhit şantaja boyun eğmedi, evine kiralık katiller gönderdi.",
          detay: "Kurnazlık canına mal olacaktı. Bağlantılar koptu.",
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
    metin: "Haksız bir davada sanıksın. Avukatın fısıldadı: 'Yargıcın kâtibiyle konuştum. Belli meblağ, belli karar. Ya da mahkemeye güvenip bekleriz.'",
    secenekler: [
      {
        metin: "Kâtibe öde, kararı garantile.",
        baseBasariSansi: 75,
        maliyet: 30,
        basariliSonuc: {
          para: -30,
          ahlak: -20,
          mesaj: "Karar lehine çıktı; zaten suçsuzdun ama bunu parayla aldın.",
          detay: "Haklılığını satın aldın. Adalete inancın kalmadı.",
        },
        basarisizSonuc: {
          para: -30,
          un: -25,
          ahlak: -18,
          saglik: -10,
          mesaj: "Kâtip parayı aldı, yargıç habersizdi; hem para gitti hem ceza aldın.",
          detay: "Dolandırıldın; şikâyet, rüşvet itirafı olurdu.",
        },
      },
      {
        metin: "Mahkemeye güven, kendini savun.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 20,
          ahlak: 20,
          mesaj: "Kendi savunmanı yapıp beraat ettin; salon alkışladı.",
          detay: "Kararda 'dürüstlük' yazdı. Yıllarca öne çıkaracak.",
        },
        basarisizSonuc: {
          para: -25,
          un: -18,
          saglik: -12,
          ahlak: 15,
          mesaj: "Suçsuzdun ama mahkûm oldun; birkaç ay hapis ve ağır para cezası.",
          detay: "Hapis sağlığını ve işini bitirdi. Kimse almadı.",
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
    metin: "Burada işler durgun. Kuzeyde rüzgârlı liman kenti: hareketli, riskli, kazançlı. Güneyde büyük pazar şehri: kalabalık, rekabetçi, istikrarlı.",
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
          detay: "Liman uyumaz. Para hızlı gelir, hızlı gider.",
        },
        basarisizSonuc: {
          para: -18,
          saglik: -10,
          etiket_ekle: [
            "sehir_liman",
          ],
          mesaj: "Limanda tutunmak zordu; ilk yılın kayıpla geçti.",
          detay: "Ağın yoktu. Rutubetli odada başladın.",
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
          detay: "Herkes tanışır, itibar her şey. Yavaş ama sağlam.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -8,
          etiket_ekle: [
            "sehir_pazar",
          ],
          mesaj: "Pazar doluydu; yer bulmak aylar sürdü, birikimin yendi.",
          detay: "Her köşe tutuluydu. Kalabalıkta görünmez kaldın.",
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
    metin: "Kaptan, deftere geçmeyecek bir yük için ortaklık öneriyor. Limanın yarısı bu işte, yarısı yakalananları izliyor.",
    secenekler: [
      {
        metin: "Ortak ol, yükü indir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 45,
          ahlak: -20,
          etiket_ekle: [
            "liman_agi",
          ],
          mesaj: "Yük gece indi, sabaha satıldı; payın büyüktü.",
          detay: "Girmesi kolay, çıkması zor bir kapı.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: -30,
          un: -22,
          saglik: -12,
          mesaj: "Muhafızlar baskın yaptı; yük gitti, adın deftere yazıldı.",
          detay: "Kaptan kaçtı; her yükün artık iki kez aranacak.",
        },
      },
      {
        metin: "Reddet, resmi ruhsat al.",
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
          mesaj: "Ruhsat çıktı; artık yasal ve gündüz ithalat yapıyorsun.",
          detay: "Kâr az, ama kapı çalınca yüreğin ağzına gelmiyor.",
        },
        basarisizSonuc: {
          para: -25,
          un: -8,
          mesaj: "Ruhsat başvurun aylarca sürünüp reddedildi.",
          detay: "Harç gitti, dosyalar kayboldu.",
        },
      },
      {
        metin: "Kaptanı sat, mallara çök!",
        baseBasariSansi: 45,
        maxAhlak: 35,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 70,
          ahlak: -30,
          un: -15,
          etiket_ekle: [
            "sir:kaptan_satan",
          ],
          mesaj: "Kaptanı ihbar edip baskında malların yarısını depona çektin.",
          detay: "Zengin oldun; artık hep arkana bakarsın.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Kaptan ihaneti fark etti; tayfasıyla seni denize attı.",
          detay: "Zor kurtuldun; liman sana ölüm fermanı yazdı.",
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
    metin: "Pazarın en işlek köşesi boşaldı; üç kişi istiyor. Ağa 'en çok veren' diyor, esnaf 'sırası gelen'.",
    secenekler: [
      {
        metin: "En yüksek teklifi ver, yeri al.",
        baseBasariSansi: 70,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          un: -8,
          maas_carpani: 1.3,
          mesaj: "Köşe senin oldu; müşteri üç katına çıktı.",
          detay: "Komşu esnaf selam vermiyor, müşteri veriyor.",
        },
        basarisizSonuc: {
          para: -28,
          un: -18,
          mesaj: "Daha yüksek teklif geldi; para da yer de gitti.",
          detay: "Ağa teklifini rakibe söylemiş; kapora dönmedi.",
        },
      },
      {
        metin: "Gelenekle sıranı bekle, destek topla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 22,
          ahlak: 18,
          para: 8,
          etiket_ekle: [
            "esnaf_destegi",
          ],
          maas_carpani: 1.15,
          mesaj: "Esnaf arkanda durdu; ağa geri adım attı, köşe senin.",
          detay: "Parasız kazandın; artık arkanda otuz kişi var.",
        },
        basarisizSonuc: {
          un: 10,
          para: -10,
          ahlak: 15,
          mesaj: "Esnaf destekledi ama ağa parayı seçti; köşe rakibe gitti.",
          detay: "Yeri alamadın ama 'kuralına uyan adam' oldun.",
        },
      },
      {
        metin: "Ağanın yakasına yapış, tehdit et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Yakasına yapıştın; korumalar kılıca davrandı.",
          geriCekilMetni: "Bırak, öfkeyle uzaklaş.",
          geriCekilSonucu: {
            un: -5,
            ahlak: -5,
            mesaj: "Geri çekildin; yeri kaybettin, ağanın önünde küçüldün.",
            detay: "Öfken itibarını zedeledi.",
          },
          devamMetni: "Gözdağı ver: 'O yeri bana vereceksin!'",
          devamSonucu: {
            suc_sinifi: "kucuk",
            un: 20,
            para: 10,
            ahlak: -15,
            maas_carpani: 1.2,
            mesaj: "Ağa korktu; korumaları durdurup yeri sana bıraktı.",
            detay: "Zorla kazandın; ağa artık yeminli düşmanın.",
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
    metin: "{bolge} sarayında bir görev açıldı, ünün seni listeye soktu. Saray güç ve para demek; kimse temiz kalmaz.",
    secenekler: [
      {
        metin: "Talip ol, saraya gir.",
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
          mesaj: "Saraya kabul edildin; kararların alındığı odalardasın.",
          detay: "İlk hafta üç kişinin bitişini izledin ve sustun.",
        },
        basarisizSonuc: {
          para: -18,
          un: -12,
          ahlak: -8,
          mesaj: "Listede elendin; para ve umut boşa gitti.",
          detay: "Görevi daha iyi akrabası olan aldı.",
        },
      },
      {
        metin: "Talip olma, itibarınla kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 18,
          un: 8,
          etiket_ekle: [
            "saraydan_uzak",
          ],
          mesaj: "Sarayı reddettin; halk sana 'satın alınmaz' dedi.",
          detay: "Geceleri rahat uyuyorsun.",
        },
        basarisizSonuc: {
          un: -12,
          para: -8,
          ahlak: 12,
          mesaj: "Reddin 'küstahlık' sayıldı; saray sana sırt çevirdi.",
          detay: "Saray bağlantılı hiçbir iş sana gelmiyor.",
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
    metin: "Sarayda iki hizip savaşıyor: eski soylular ve yeni zenginler. İkisi de senden taraf istiyor; tarafsızlık seçenek değil.",
    secenekler: [
      {
        metin: "Eski soylularla git: köklü ama gerileyen.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -12,
          etiket_ekle: [
            "soylu_hizip",
          ],
          mesaj: "Soylular kazandı; sadakatin unvanla ödüllendirildi.",
          detay: "Eski düzenin son kalesindesin; duvarlar çatlıyor.",
        },
        basarisizSonuc: {
          un: -25,
          para: -22,
          mesaj: "Soylular yenildi; sen de tasfiye edildin.",
          detay: "Yeni zenginler ilk iş eski hizbi temizledi.",
        },
      },
      {
        metin: "Yeni zenginlerle git: paralı ama köksüz.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 45,
          un: 12,
          ahlak: -18,
          maas_carpani: 1.25,
          etiket_ekle: [
            "yeni_zengin_hizip",
          ],
          mesaj: "Yeni zenginler kazandı; imtiyazlardan büyük pay aldın.",
          detay: "Para akıyor, soylular 'sonradan görme' diyor.",
        },
        basarisizSonuc: {
          para: -30,
          un: -20,
          mesaj: "Yeni zenginler dağıtıldı; sen de düştün.",
          detay: "Yükselmeyen güce oynadın; para ve yerin gitti.",
        },
      },
      {
        metin: "İki tarafa da bilgi sat, kendi oyununu kur.",
        baseBasariSansi: 35,
        basariliSonuc: {
          para: 55,
          un: 15,
          ahlak: -30,
          mesaj: "İki hizbi birbirine karşı besledin; ikisinden kazandın.",
          detay: "Kimin kime çalıştığını yalnız sen biliyorsun.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "İki hizip aynı hafta oyunu fark etti; o gece cezan kesildi.",
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
    metin: "Birikimin için üç yol var: riskli ortaklık, orta riskli mal alımı, güvenli toprak/tahvil.",
    secenekler: [
      {
        metin: "Riskli ortaklığa gir.",
        baseBasariSansi: 45,
        maliyet: 30,
        basariliSonuc: {
          mutluluk: -11,
          para: 70,
          un: 6,
          mesaj: "Ortaklık tuttu; yatırdığının iki katından fazlasını aldın.",
          detay: "Herkes 'nasıl bildin' diyor; sen susuyorsun.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -50,
          un: -10,
          mesaj: "Ortağın kaçtı; yatırdığın her kuruş uçtu.",
          detay: "Sözleşme hiçbir mahkemede işe yaramadı.",
        },
      },
      {
        metin: "Orta riskli mal al.",
        baseBasariSansi: 65,
        maliyet: 18,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 30,
          mesaj: "Mallar sezonunda iyi fiyat buldu; sağlam kâr ettin.",
          detay: "Hesap, sabır, karşılık: ticaretin büyük kısmı bu.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "Fiyatlar düştü; malı zararına sattın.",
          detay: "Piyasayı yanlış okudun; birikimin buharlaştı.",
        },
      },
      {
        metin: "Toprak/tahvil al: düşük getiri, güvenli.",
        baseBasariSansi: 85,
        maliyet: 20,
        basariliSonuc: {
          para: 10,
          maas_carpani: 1.15,
          mesaj: "Toprak/tahvil her yıl düzenli gelir getirmeye başladı.",
          detay: "Zengin etmez ama aç bırakmaz.",
        },
        basarisizSonuc: {
          para: -18,
          mesaj: "Toprağın tapusunda sorun çıktı; para geri gelmedi.",
          detay: "En güvenli yatırım bile belge kontrolü ister.",
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
    metin: "Ailen hastalandı, bakıma muhtaç. Yanına almak zaman ve para yer; bakıcı pahalı; hiçbir şey yapmamak telafisiz.",
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
          detay: "İşin aksadı ama 'iyi ki' diyorsun.",
        },
        basarisizSonuc: {
          ahlak: 20,
          para: -28,
          saglik: -15,
          mesaj: "Bakım seni de hasta etti; yine de sonuna kadar yanındaydın.",
          detay: "Aylarca uyumadın; yaslı, tükenmiş ve borçlusun.",
        },
      },
      {
        metin: "Bakıcı tut, işine devam et.",
        baseBasariSansi: 70,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          ahlak: -8,
          mesaj: "İyi bir bakıcı buldun; ne iş aksadı ne aile.",
          detay: "Ayda iki ziyaret; hep 'işler yoğun' diyorsun.",
        },
        basarisizSonuc: {
          para: -30,
          ahlak: -22,
          un: -12,
          mesaj: "Bakıcı ihmal etti; ailen kötü durumda, herkes seni suçluyor.",
          detay: "Para çözmemiş, sadece ertelemişti.",
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
    metin: "Pazarda kaçan şişman bir domuz ortalığı karıştırdı. Kasap ödül vaat ediyor, kalabalık eğleniyor.",
    secenekler: [
      {
        metin: "Domuzu yakala, ödülü kap.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 15,
          un: 12,
          unvan_kazan: "Domuz Fatihi",
          mesaj: "Domuzu son anda yakaladın; pazar seni alkışladı.",
          detay: "Kasap sözünü tuttu; herkes adını öğrendi.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Domuzla Yarışıp Kaybeden Adam",
          mesaj: "El arabasına takılıp boynunu kırdın; 'domuza yenilen adam' diye anıldın.",
        },
      },
      {
        metin: "Kaçış yolunu usulca kes.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 8,
          un: 5,
          mesaj: "Sokak ağzını kestin; domuz kucağına düştü.",
          detay: "Terlemeden hallettin; kasap 'akıllı adam' dedi.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Domuz beklenmedik yönden gelip seni devirdi.",
          detay: "Dizin yarıldı, domuz başkasının oldu; sağsın.",
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
    metin: "Sarhoş biri meyhanede bahse giriyor: çok içen masadaki tüm parayı alır. Kalabalık tezahürat yapıyor.",
    secenekler: [
      {
        metin: "Bahsi kabul et, iç.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 25,
          un: 12,
          saglik: -10,
          etiket_ekle: [
            "bagimlilik:alkol_meyil",
          ],
          mesaj: "Rakibini masaya yığdın; herkes şerefine içti.",
          detay: "Başın çatladı ama kadehin tadı aklında kaldı.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Balın Şehidi",
          mesaj: "Onuncu testide yığılıp bir daha kalkmadın; 'balın şehidi' diye anıldın.",
        },
      },
      {
        metin: "Bahse girme, bahisleri tut.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -7,
          para: 18,
          un: -8,
          mesaj: "Bahisleri sen topladın; kim kazansa komisyon senindi.",
          detay: "Ertesi sabah başı ağrımayan tek kişi sendin.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -10,
          mesaj: "Kaybeden parasını istedi; masa devrildi, kavga çıktı.",
          detay: "Para gitti, dudağın patladı.",
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
    metin: "Bir mucit sıcak hava balonuyla halka açık uçuş deniyor, iyi parayla gönüllü arıyor. Kalabalık nefesini tutmuş.",
    secenekler: [
      {
        metin: "Gönüllü ol, balona bin.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 25,
          un: 25,
          mesaj: "Balon süzüldü; şehrin üstünde uçan ilk kişilerden oldun.",
          detay: "Gazeteler adını yazdı, mucit ortaklık teklif etti.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Kemerini Çözemeyen Balon Gönüllüsü",
          mesaj: "Brülör sepeti tutuşturdu; mucit atladı, sen kemerini çözemedin.",
        },
      },
      {
        metin: "Uçma, mucide yatırım yap.",
        baseBasariSansi: 50,
        maliyet: 15,
        basariliSonuc: {
          mutluluk: -8,
          para: 35,
          un: 5,
          mesaj: "Balon uçtu; ortak olarak gelirden pay aldın.",
          detay: "Ayakların yerdeydi ama cebin doldu.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -18,
          saglik: -10,
          etiket_ekle: [
            "kalici:yanik_izi",
          ],
          mesaj: "Balon kalkmadan alev aldı; kıvılcımlar yüzüne sıçradı.",
          detay: "Yanık izin kaldı; neyse ki sepette değildin.",
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
    metin: "Şehre gelen sirkte sahip meydan okuyor: aslan kafesine en çok yaklaşan iyi para kazanacak. Herkes sana bakıyor.",
    secenekler: [
      {
        metin: "Kafese yaklaş, ödülü al.",
        baseBasariSansi: 58,
        basariliSonuc: {
          para: 22,
          un: 15,
          unvan_kazan: "Aslan Terbiyecisi",
          mesaj: "Aslan sakin kaldı; kalabalık cesaretine hayran kaldı.",
          detay: "Aslanın dişi yokmuş; sen kimseye söylemiyorsun.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Kafese Elini Sokan Meraklı Seyirci",
          mesaj: "Uyarıyı dinlemeyip elini kafese soktun; sirk 'meraklı seyirci'yi unutmadı.",
        },
      },
      {
        metin: "Sirkle anlaş, bilet sat.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -7,
          para: 18,
          un: 3,
          mesaj: "Bilet komisyonu aldın; kimse bakmadı, kimse de yemedi.",
          detay: "Sirk sahibi şehre her gelişinde seni arıyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -12,
          mesaj: "Gösteri yağmurdan iptal oldu; biletler elinde kaldı.",
          detay: "Sirk ertesi gün gitti, komisyonunu ödemedi.",
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
    metin: "{yil}. Prusya ile gerginlik savaşa döndü. Gazeteler 'aylar içinde Berlin'deyiz' yazıyor; imparator orduyu yönetecek.",
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
          detay: "Kolay zafer görünmüyor ama moralin yüksek.",
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
          mesaj: "Prusya topçusu çok güçlüydü; ağır yaralandın.",
          detay: "Revirde subayların endişeli fısıltıları var.",
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
          mesaj: "Ordu erzak ve çizme siparişini sana verdi; ilk ödeme geldi.",
          detay: "Savaş sürdükçe sipariş büyüyor.",
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
          detay: "Malı verdin; şimdilik masraf senin cebinden.",
        },
      },
      {
        metin: "Tarafsız bir ülkeye geç.",
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
          mesaj: "Sınırı sorunsuz geçtin; savaşı gazetelerden izleyeceksin.",
          detay: "Komşular 'nerede o' diye soruyor, kimse bilmiyor.",
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
          mesaj: "Sınır kapalıydı; seferberlik kaçağı diye geri çevrildin.",
          detay: "Adın bir listede; bu sana pahalıya patlayacak.",
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
    metin: "{yil}. Sedan'da imparator esir düştü, ordu dağıldı, Prusya Paris'i kuşattı. Ekmek karneyle dağıtılıyor, gelirler eridi.",
    secenekler: [
      {
        metin: "Sıkıntıyı herkesle paylaş, dürüst kal.",
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
          mesaj: "Komşularınla aynı kuyrukta aynı ekmeği paylaştın.",
          detay: "Zor kış, ama herkes aynı gemideydi.",
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
          mesaj: "Karne bile yetmedi; o kış aç kaldın.",
          detay: "Kıtlık kimseyi ayırmadı; dürüstlük doyurmadı.",
        },
      },
      {
        metin: "Erzak istifle, kıtlıkta pahalı sat.",
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
          mesaj: "Ekmeği üç katına sattın; kasan hiç bu kadar dolmadı.",
          detay: "Ağlayan kadını gördün, fiyatı yine de düşürmedin.",
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
          mesaj: "Aç kalabalık depolarını bastı; mal gitti, dayakla kurtuldun.",
          detay: "Mahalle seni 'kıtlık vurguncusu' diye anıyor.",
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
          mesaj: "Kapını kapatıp kışı evde geçirdin; zor ama sağ çıktınız.",
          detay: "İçerde kalmak yordu ama korudu.",
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
          mesaj: "Evde kalmak açlıktan korumadı; kömür ve erzak bitti.",
          detay: "Beklemek de bir bedel; sessizce ödenir.",
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
    metin: "{yil}. Müttefiklerle Rusya'ya karşı savaşa girdiniz. Büyük bir donanma Kırım'a yola çıkıyor.",
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
          mesaj: "Kuşatma hattında görev aldın; zorlu ama gurur verici.",
          detay: "Sivastopol surları dimdik ama moraliniz yüksek.",
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
          detay: "Bu savaşta hastalık kurşundan çok öldürüyor.",
        },
      },
      {
        metin: "Donanmaya erzak ve kömür sat.",
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
          mesaj: "Sözleşmen onaylandı; savaş sürdükçe kâr sürüyor.",
          detay: "Limanda her hafta yeni sipariş var.",
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
          mesaj: "Rakip daha düşük fiyat verdi; sözleşmeyi kaybettin.",
          detay: "Hazırlık masrafın boşa gitti.",
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
          mesaj: "Hayatına devam ettin; savaşı gazetelerden izliyorsun.",
          detay: "Herkes cepheyi konuşurken sen tezgâhtasın.",
        },
        basarisizSonuc: {
          para: -10,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "kirim_savasinda",
          ],
          mesaj: "Savaş telaşı ticareti de vurdu; müşteri azaldı.",
          detay: "Herkesin aklı cephede; işin de payını aldı.",
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
    metin: "{yil}. Sivastopol düştü, Rusya barış istedi. Sokaklar bayram yeri; yeni ticaret yolları açıldı, tazminat ekonomiye can verdi.",
    secenekler: [
      {
        metin: "Yeni ticaret fırsatlarına atıl.",
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
          mesaj: "Yeni pazarlara ilk giren sen oldun; kazancın kalıcı arttı.",
          detay: "Zafer coşkusunu paraya çevirdin.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "iyi",
          },
          mesaj: "Herkes aynı fırsata koştu; fiyatlar eridi, zarar ettin.",
          detay: "Herkes aynı kapıya koştu; kalabalıkta kayboldun.",
        },
      },
      {
        metin: "Kutlamalara katıl, bağlantı kur.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 20,
          para: 10,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "iyi",
          },
          mesaj: "Kutlamada tanıştığın isimler yeni kapılar açtı.",
          detay: "Zafer sarhoşluğu herkesi cömert yapıyor.",
        },
        basarisizSonuc: {
          para: -8,
          ulke_etkisi: {
            savasta: false,
            ekonomi: "iyi",
          },
          mesaj: "Kutlama pahalıya patladı, beklediğin bağlantılar çıkmadı.",
          detay: "Herkes kadeh kaldırdı, hesap sana kaldı.",
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
    metin: "{yil}. Osmanlı, İngiltere ve Fransa ittifakı Kırım'a asker çıkardı. Çar herkesten fedakârlık istiyor.",
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
          mesaj: "Surlarda direndin; komutanlar seni örnek gösterdi.",
          detay: "Kuşatma ağır; sur da sen de ayaktasın.",
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
          mesaj: "Müttefik topçusu hattı dövdü; ağır yaralı çekildin.",
          detay: "Eski taktik modern topa yetmedi.",
        },
      },
      {
        metin: "Orduya at ve erzak sat.",
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
          mesaj: "Tedarik hattında görev aldın; şimdilik iyi kazanıyorsun.",
          detay: "Senin işin cephenin gerisinde.",
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
          detay: "Hazine boş; sözleşme kağıt üstünde, nakit sıfır.",
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
          mesaj: "Taşrada sakin kaldın; savaşın gürültüsü uzaktan geldi.",
          detay: "Çar'ın çağrısını duymadın; kimseye söylemedin.",
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
          mesaj: "Seferberlikten kaçtığın anlaşıldı; köyde dışlandın.",
          detay: "Bazı yerlerde savaşa gitmemek suç sayılır.",
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
    metin: "{yil}. Sivastopol bir yıllık kuşatmanın ardından düştü; Çar barış istedi. Vergiler arttı, tahıl fiyatları katlandı.",
    secenekler: [
      {
        metin: "Sıkıntıyı halkla paylaş, dürüst kal.",
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
          mesaj: "Herkes gibi kemer sıktın; kimse seni ayrıcalıklı görmedi.",
          detay: "Yenilgi acı ama paylaşılan; yalnız değilsin.",
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
          mesaj: "Vergi artışı ağır oldu; kışı zorla atlattın.",
          detay: "Fatura önce yoksula kesildi; sen de oradaydın.",
        },
      },
      {
        metin: "Buğday stokla, krizde pahalı sat.",
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
          mesaj: "Buğdayı üç katına sattın; kasan hiç bu kadar dolmadı.",
          detay: "Bazı geceler o yüzler uykunu kaçırıyor.",
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
          mesaj: "Öfkeli grup deponu bastı; mal yağmalandı, dövüldün.",
          detay: "Acıyı çıkaracak biri lazımdı; sen oldun.",
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
    metin: "Alayına katıldığın ilk gün. Kışla kapısında sıraya girdin; artık askersin. Çavuş yeni gelenlere soğuk bakıyor.",
    secenekler: [
      {
        metin: "Disiplinli görün, kurallara uy.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 10,
          ahlak: 5,
          etiket_ekle: [
            "asker_hizmette",
          ],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "Çavuş seni beğendi: 'Bu iyi asker olur.'",
          detay: "Kışlanın ritmine ilk haftada uydun.",
        },
        basarisizSonuc: {
          un: -8,
          saglik: -5,
          etiket_ekle: [
            "asker_hizmette",
          ],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "İlk talimde beceriksizdin; çavuş herkesin önünde azarladı.",
          detay: "Kötü başlangıç ama geri dönüş yok.",
        },
      },
      {
        metin: "Kendi tarzınla uyum sağla.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 5,
          etiket_ekle: [
            "asker_hizmette",
          ],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "Ne öne çıktın ne geride kaldın; sıraya karıştın.",
          detay: "Kimse adını bilmiyor; kışlada bu güvenlidir.",
        },
        basarisizSonuc: {
          un: -10,
          etiket_ekle: [
            "asker_hizmette",
          ],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "Gevşekliğin fark edildi: 'Gözüm üstünde.'",
          detay: "İlk günden takip listesi iyiye işaret değil.",
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
    metin: "Hizmetinin ilk yılında rutin devriyede birliğin pusuya düştü. Kaosta saniyeler içinde karar vermelisin.",
    secenekler: [
      {
        metin: "Öne atıl, ateşe ateşle karşılık ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 22,
          para: 10,
          saglik: -10,
          mesaj: "Saldırıyı püskürtmeye yardım ettin; komutan adını not etti.",
          detay: "Hayatta kalanlar artık birbirine farklı bakıyor.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "Kurşun omzunu sıyırdı; kanlar içinde geri sürüklendin.",
          detay: "İlk yılında ilk yaran; 'şanslısın' dediler.",
        },
      },
      {
        metin: "Geri çekilmeye öncülük et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: -5,
          un: 8,
          mesaj: "Düzenli geri çekildin; kimse kaybedilmedi.",
          detay: "Parlak zafer değil ama herkes sağ döndü.",
        },
        basarisizSonuc: {
          un: -15,
          saglik: -12,
          mesaj: "Geri çekilme dağıldı; birkaç asker kayboldu, suç sana kaldı.",
          detay: "Bazıları ilk sınavda panik ettiğini düşünüyor.",
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
    metin: "Yıllarca hizmetin ardından komutan seni çağırdı: 'Vazifen doldu evlat. Artık yolunu kendin seç.'",
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
          mesaj: "Uzun hizmete imza attın; artık kıdemli askersin.",
          detay: "Alay sana aile oldu; sivil hayat yabancılaştı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 10,
          un: 8,
          saglik: -10,
          mesaj: "Kaldın ama yeni komutan eskisi kadar ilgilenmiyor.",
          detay: "Yıllar geçti, hâlâ aynı rütbedesin.",
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
          mesaj: "İkramiyeni alıp döndün; artık kararları sen veriyorsun.",
          detay: "Hâlâ adım sayıyorsun; ama artık emir yok.",
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
          mesaj: "Terhis kâğıtların gecikti, ikramiyen bürokraside eridi.",
          detay: "Yıllarca hizmet ettin, azını aldın; ama özgürsün.",
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
    metin: "Uzak şehirden bir tüccar, yıllarca sürecek devasa bir tedarik anlaşması öneriyor. Sermayenin çoğu buna bağlanır.",
    secenekler: [
      {
        metin: "İmzala, büyük oyuna gir.",
        baseBasariSansi: 70,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 10,
          etiket_ekle: [
            "buyuk_siparis_surecinde",
          ],
          zorunlu_sonraki: "zincir_tuccar_kervan_sorunu",
          mesaj: "İmzalar atıldı; yıllık bir ortaklığın içindesin.",
          detay: "Sermayen buna bağlı: ya büyük kazanç ya yıkım.",
        },
        basarisizSonuc: {
          para: -25,
          etiket_ekle: [
            "buyuk_siparis_surecinde",
          ],
          zorunlu_sonraki: "zincir_tuccar_kervan_sorunu",
          mesaj: "Şartlar düşündüğünden ağır çıktı ama geri dönüş yok.",
          detay: "İlk masraflar bile fazla; şimdiden şüphedesin.",
        },
      },
      {
        metin: "Reddet, mevcut işine odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 10,
          mesaj: "Riske girmedin; işler her zamanki gibi sakin sürdü.",
          detay: "Fırsat mı kaçtı, felaket mi? Hiç öğrenemezsin.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Reddettiğini duyan tüccar teklifi rakibine götürdü.",
          detay: "Rakibin büyüdü ama en azından riske girmedin.",
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
    metin: "İlk yük yolda; haberci soluk soluğa: 'Kervan fırtına ve haydut baskınına yakalandı, ortağın karar bekliyor.'",
    secenekler: [
      {
        metin: "Ek para yolla, silahlı kurtarma seferi düzenle.",
        baseBasariSansi: 60,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 10,
          mesaj: "Sefer işe yaradı; yükün çoğu ve adamların kurtuldu.",
          detay: "Ortağın kararlılığını gördü; anlaşma sürebilir.",
        },
        basarisizSonuc: {
          para: -35,
          mesaj: "Ek harcamaya rağmen yük büyük ölçüde kayboldu.",
          detay: "Hem harcadın hem kaybettin; anlaşma belirsiz.",
        },
      },
      {
        metin: "Kaybı kabullen, sözleşmeyi sürdür.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: -10,
          mesaj: "Ortağın anlayış gösterdi; sözleşme küçük gecikmeyle sürüyor.",
          detay: "Böyle kayıplar ticaretin doğasında.",
        },
        basarisizSonuc: {
          para: -18,
          un: -10,
          mesaj: "Ortağın umursamazlığına içerledi; ilişki gerildi.",
          detay: "Anlaşma sürüyor ama eskisi kadar sıcak değil.",
        },
      },
      {
        metin: "Zararı bahane et, loncadan sahte sigorta çek.",
        baseBasariSansi: 40,
        maxAhlak: 35,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 50,
          ahlak: -20,
          etiket_ekle: [
            "sir:sigorta_dolandiricisi",
          ],
          mesaj: "Mallar yanmış gibi evrak düzenledin; lonca büyük tazminat ödedi.",
          detay: "Yükün bir kısmı sende, üstüne haksız servet.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: -40,
          un: -30,
          ahlak: -15,
          mesaj: "Müfettişler sahtekârlığı anında yakaladı! Ağır ceza, lekeli itibar.",
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
    metin: "Üst makam seni uzak topraklardaki küçük bir cemaate, yıllarca sürecek bir göreve öneriyor. Burası geride kalır.",
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
          mesaj: "Eşyalarını topladın, cemaatinle vedalaşıp yola çıktın.",
          detay: "Ayrılmak sandığından zor; önünde uzun yol var.",
        },
        basarisizSonuc: {
          para: -10,
          etiket_ekle: [
            "kutsal_gorevde",
          ],
          zorunlu_sonraki: "zincir_din_yolda_sinav",
          mesaj: "Yola çıkış hazırlığı sandığından pahalıya patladı.",
          detay: "Yine de kararını verdin; görevdesin.",
        },
      },
      {
        metin: "Görevi reddet, cemaatinle kal.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 8,
          mesaj: "Cemaat kararına sevindi; onları terk etmedin.",
          detay: "Tecrübe kaçtı ama seni bekleyenler var.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Üst makam reddini 'hırs eksikliği' diye kaydetti.",
          detay: "Cemaat memnun; üst makamlar seni unutabilir.",
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
    metin: "Yıllarca süren uzak görevin ardından üst makam seni geri çağırdı. Görev bitti; geride bıraktığın hayata dönme vakti.",
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
          mesaj: "Döndüğünde cemaatin seni kahraman gibi karşıladı.",
          detay: "Değiştin: hem kazanç hem yalnızlık.",
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
          mesaj: "Döndün ama cemaat yeni görevliye alışmıştı.",
          detay: "Yıllarca uzak kalmanın bedeli: yerin başkasınındı.",
        },
      },
      {
        metin: "Orada kal, yeni bir cemaat kur.",
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
          mesaj: "Kalıp kendi cemaatini kurdun; küçük bir topluluk oluştu.",
          detay: "Eski hayat uzak bir anı; burası senin.",
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
          mesaj: "Yeterli destek bulamadın; küçük bir cemaatle idare ettin.",
          detay: "Kolay olmadı; her şeyi baştan kurmalısın.",
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
    metin: "Pazara gelen maskeli bir soytarı seni kalabalıktan gösterisine 'gönüllü' çekmeye çalışıyor.",
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
          metin: "Soytarı seni itip düşürdü; kalabalık gülüyor.",
          geriCekilMetni: "Öfkeni tut, sessizce sıvış.",
          geriCekilSonucu: {
            un: -15,
            mutluluk: -10,
            mesaj: "Şakaya gelemeyen korkak diye anıldın; günlerce düşündün.",
            detay: "Bazen sıvışmak en büyük acıdır.",
          },
          devamMetni: "Maskesini çek, şakayı ona yap!",
          devamSonucu: {
            un: 25,
            ahlak: 10,
            mesaj: "Maskeyi çekince adam aranan bir dolandırıcı çıktı! Kahraman oldun.",
            detay: "Alay edilmedin, alay ettin!",
          },
        },
      },
      {
        metin: "Nazikçe reddet, çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Reddin kabul edildi; soytarı başkasını seçti.",
          detay: "Utanç riskine girmedin; hayat sakin sürdü.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Soytarı reddini de espriye çevirip senle dalga geçti.",
          detay: "Kaçmak bazen daha çok dikkat çeker.",
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
    metin: "Gece gökyüzünde parlak, kuyruklu bir ışık belirdi. 'Kıyamet alameti' söylentisi yayılıyor, bazıları paniklemiş.",
    secenekler: [
      {
        metin: "Halkı sakinleştirmeye çalış.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 14,
          ahlak: 12,
          mesaj: "Sakin tavrın paniği yatıştırdı; halk sana güvendi.",
          detay: "Işık kayboldu; ama seni hatırladılar.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Bazıları dinlemedi, panik biraz daha sürdü.",
          detay: "Korku bazen mantıktan güçlü.",
        },
      },
      {
        metin: "Sen de kapıl, hazırlık yap.",
        baseBasariSansi: 70,
        maliyet: 10,
        basariliSonuc: {
          un: 4,
          para: -6,
          mesaj: "Stokladığın erzak işe yaramadı ama hazırlıklıydın.",
          detay: "Işık kayboldu; biraz mahcup oldun ama zararsız.",
        },
        basarisizSonuc: {
          para: -15,
          un: -12,
          mesaj: "Panik alışverişin komşular arasında dalga konusu oldu.",
          detay: "'Kıyamet bekleyen adam' lakabı bir süre kaldı.",
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
    metin: "Bu kış alışılmadık sert; odun ve erzak fiyatları fırladı, birçok komşun hastalandı.",
    secenekler: [
      {
        metin: "Ekstra odun ve erzak stokla.",
        baseBasariSansi: 80,
        maliyet: 12,
        basariliSonuc: {
          saglik: 15,
          para: -12,
          mesaj: "Kışı sıcak ve tok geçirdin; hastalanmadın.",
          detay: "Komşular hastalanırken sen hazırlıklıydın.",
        },
        basarisizSonuc: {
          saglik: 5,
          para: -18,
          mesaj: "Stokla idare ettin ama fiyatlar beklenenden yüksekti.",
          detay: "Kışı atlattın ama cüzdanın hafifledi.",
        },
      },
      {
        metin: "İdareli geçin, tasarruf et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          mesaj: "Tasarruf ettin, kışı ucuza atlattın.",
          detay: "Üşüdün ama dayandın; bazen az yeter.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 5,
          mesaj: "Soğuk seni hasta etti; zatürreye döndü.",
          detay: "Tasarruf ederken sağlığından kıstın.",
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
    metin: "Ateşin günlerdir düşmüyor, halin kötüleşiyor. Karar vermelisin; hastalık kendiliğinden geçmeyecek gibi.",
    secenekler: [
      {
        metin: "İlaç al (25 Altın), en iyi hekime git.",
        baseBasariSansi: 90,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          saglik: 20,
          mesaj: "İlaçlar hızla işe yaradı; birkaç günde ayaktasın.",
          detay: "Para gitti, sağlık geldi; iyi takas.",
        },
        basarisizSonuc: {
          para: -25,
          saglik: 5,
          mesaj: "İlaç yardım etti ama iyileşme yavaş sürdü.",
          detay: "Her tedavi mucize değil.",
        },
      },
      {
        metin: "Kocakarı ilacı iç (5 Altın), şansa güven.",
        baseBasariSansi: 55,
        maliyet: 5,
        basariliSonuc: {
          para: -5,
          saglik: 12,
          mesaj: "Garip kokulu karışım işe yaradı! Birkaç günde toparlandın.",
          detay: "Köy tarifleri bazen gerçekten işe yarar.",
        },
        basarisizSonuc: {
          para: -5,
          saglik: -10,
          mesaj: "Karışım işe yaramadı, durumun biraz kötüleşti.",
          detay: "Ucuz çözüm bazen pahalıya patlar.",
        },
      },
      {
        metin: "Hiçbir şey yapma, dinlen.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Bedenin kendi başına toparlandı; şanslıydın.",
          detay: "Bazen vücut kendi yolunu bulur.",
        },
        basarisizSonuc: {
          saglik: -15,
          olum_sansi: 5,
          mesaj: "Hastalık tedavisiz ilerledi, halin ağırlaştı.",
          detay: "Bazı hastalıklar dinlenmekle geçmez.",
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
    metin: "Kapının altından imzasız bir mektup çıktı: biri eşinin/ortağının seni aldattığını söylüyor, kanıt yok.",
    secenekler: [
      {
        metin: "İddiayı araştır.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "İddianın asılsız, kıskanç birinin oyunu olduğu çıktı.",
          detay: "Huzur döndü ama yazanı hep merak edeceksin.",
        },
        basarisizSonuc: {
          ahlak: -15,
          saglik: -10,
          mesaj: "Araştırman gereksiz kavga ve güvensizlik getirdi.",
          detay: "Bazen sormamak daha iyi sonuç verir.",
        },
      },
      {
        metin: "Mektubu yırt, önemseme.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Mektubu unuttun, hayat normal aktı.",
          detay: "Bazı taşlar yerinde kalsın.",
        },
        basarisizSonuc: {
          ahlak: -8,
          mutluluk: -5,
          mesaj: "Görmezden gelsen de aklından çıkmadı; güvensizlik yerleşti.",
          detay: "Görmezden gelmek unutmak demek değil.",
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
    metin: "Bir tanıdığın kumar borcunu ödemedi, seni görünce kaçıyor. Herkesin önünde isteyebilir, sessizce unutabilirsin.",
    secenekler: [
      {
        metin: "Herkesin önünde parasını iste.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -8,
          un: -3,
          para: 20,
          mesaj: "Utanan adam borcunu hemen ödedi.",
          detay: "Kimse sana bir daha borç istemedi; parayı aldın.",
        },
        basarisizSonuc: {
          un: -12,
          saglik: -5,
          mesaj: "Adam parasız olduğunu söyleyip olay çıkardı; küçüldün.",
          detay: "Israrın seni de gülünç etti.",
        },
      },
      {
        metin: "Sessizce unut, ilişkiyi bozma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Parayı unuttun; dostluğunuz bozulmadı.",
          detay: "'Küçük kayıp, büyük huzursuzluktan iyi' dedin.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Adam borcu unuttuğunu görüp senden bir borç daha istedi.",
          detay: "İyi niyet bazen kötüye kullanılır.",
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
    metin: "Meydandaki bir ressam ücretsiz portreni yapmak istiyor: 'İlginç bir yüzün var.' Ne çıkacağını bilmiyorsun.",
    secenekler: [
      {
        metin: "Poz ver.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 15,
          mesaj: "Tablo şaşırtıcı güzel çıktı; sergilendi, adın da geçti.",
          detay: "'Tablodaki adam' olarak tanınmak tuhaf ama hoş.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Tablo pek iltifat sayılmazdı; herkes güldü.",
          detay: "'İlginç yüz' pek de iltifat değilmiş.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Reddedip yoluna devam ettin.",
          detay: "Anı kaçtı belki, ama risk almadın.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Ressam ısrar edip seni meydanda oyaladı; günün sinirli geçti.",
          detay: "Basit bir 'hayır' bazen uzun sürer.",
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
    metin: "Yeni bir dükkân reklam fotoğrafı için 'sıradan ama güvenilir' bir yüz arıyor. Seçildin; vitrine asılacak.",
    secenekler: [
      {
        metin: "Kabul et, poz ver.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: -6,
          para: 15,
          un: 6,
          mesaj: "Fotoğraf vitrine asıldı; tanıdıkların görünce gülüyor.",
          detay: "Küçük ek gelir ve mahallede eğlenceli bir ün.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -10,
          mesaj: "Flaşta gözlerini kapattın; komik kare vitrine asıldı.",
          detay: "Herkes gülüyor; en azından paranı aldın.",
        },
      },
      {
        metin: "Teklifi reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Reddettin, sıradan hayatına devam ettin.",
          detay: "Vitrinde görünmek herkese göre değil.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Sahip ısrar etti; kurtulmak için bir şey aldın.",
          detay: "Bazen hayır demek bile bedelli.",
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
    metin: "Kıştan aç kalan kurtlar köy yakınında hayvanlara saldırıyor.",
    secenekler: [
      {
        metin: "Sürek avına katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 20,
          saglik: -8,
          mesaj: "Sürüyü dağıttınız; köy rahatladı.",
          detay: "Ürktün ama geri çekilmedin.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          mesaj: "Bir kurt seni ısırdı; yara uzun süre sızladı.",
          detay: "Bu sefer doğa kazandı.",
        },
      },
      {
        metin: "Evde kal, hayvanları içeri al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Hayvanlar içeride; kurtlar başka eve yöneldi.",
          detay: "Komşunun hayvanları telef oldu.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Bir kurt ahır kapısını zorlayıp girdi.",
          detay: "Bir hayvanını kaybettin.",
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
    metin: "Zarif cep saati şehirde moda oldu; sahip olmayan geri kalmış sayılıyor. Fiyatı yüksek.",
    secenekler: [
      {
        metin: "Saati satın al.",
        baseBasariSansi: 90,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          un: 15,
          mesaj: "Saat dikkat çekti; çevren seni daha modern buldu.",
          detay: "Küçük aksesuar, büyük etki.",
        },
        basarisizSonuc: {
          para: -25,
          mesaj: "Saat bir hafta sonra bozuldu; parçaları sahteymiş.",
          detay: "Moda pahalı bir ders oldu.",
        },
      },
      {
        metin: "Almaya gerek yok.",
        baseBasariSansi: 95,
        basariliSonuc: {
          para: 5,
          mesaj: "Paranı sakladın; moda zaten geçti.",
          detay: "Akıllıca davranmak kazandırır.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Bazı çevrelerde 'saati bile yok' diye küçümsendin.",
          detay: "Akıllı olmanın sosyal bedeli var.",
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
    metin: "Eski kütüphanede kimsenin fark etmediği değerli bir elyazması buldun. Teslim edebilir ya da saklayabilirsin.",
    secenekler: [
      {
        metin: "Elyazmasını teslim et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 20,
          ahlak: 20,
          mesaj: "Değerli bir tarihi belge çıktı; adın kayıtlara geçti.",
          detay: "Dürüstlüğünle tanındın.",
        },
        basarisizSonuc: {
          un: 5,
          mesaj: "Teslim ettin ama sıradan bir belgeymiş; kimse ilgilenmedi.",
          detay: "Dürüstlük hep ödüllenmez.",
        },
      },
      {
        metin: "Sessizce sakla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 45,
          ahlak: -15,
          mesaj: "Gerçekten değerliymiş; gizlice koleksiyoncuya sattın.",
          detay: "Para cebinde, vicdan ağırda.",
        },
        basarisizSonuc: {
          ahlak: -15,
          mesaj: "Değersiz bir kopya çıktı; sır boşunaymış.",
          detay: "Risk sadece vicdanını yordu.",
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
    metin: "Gece yarısı yer sarsıldı; evler çatladı, biri çöktü. Şehir sabah yaralarını sarıyor.",
    secenekler: [
      {
        metin: "Enkazdakileri çıkarmaya yardım et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 30,
          saglik: -10,
          mesaj: "Bir aileyi sağ çıkardınız; şehir seni konuşuyor.",
          detay: "Kurtardığın hayatlar buna değdi.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 8,
          mesaj: "Enkazda üstüne duvar parçası düştü.",
          detay: "Yardım ederken yaralandın.",
        },
      },
      {
        metin: "Önce evini ve aileni koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Ailen güvende; evin onarıldı.",
          detay: "Başkalarına yardım etmedin.",
        },
        basarisizSonuc: {
          ahlak: -12,
          para: -20,
          mesaj: "Evin zarar gördü; komşuların senden uzaklaştı.",
          detay: "Bazen kimseyi koruyamazsın.",
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
    metin: "Bir grup adam seni köşeye sıkıştırıp borçlu birinin adını söylüyor. Sen o değilsin ama ona benziyormuşsun.",
    secenekler: [
      {
        metin: "Sakin kal, kimliğini kanıtla.",
        baseBasariSansi: 65,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Seni dinleyip yanlış kişi olduğunu anladılar.",
          detay: "Kalbin çarptı ama yırttın.",
        },
        basarisizSonuc: {
          saglik: -22,
          para: -15,
          mesaj: "Sana inanmadılar; dövüp cebindeki parayı aldılar.",
          detay: "Başkasının borcunu bedenle ödedin.",
        },
      },
      {
        metin: "Kalabalığı dağıt, kaç.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kalabalık şaşırdı, sen sıvıştın.",
          detay: "Eve varınca güldün.",
        },
        basarisizSonuc: {
          saglik: -18,
          mesaj: "Kaçarken yakalandın; kaçman şüpheyi artırdı.",
          detay: "Kaçmak seni suçlu gösterdi.",
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
    metin: "Yazım hatasıyla adına gönderilmiş görkemli bir davetiye aldın. Gitsen kimse fark etmeyebilir.",
    secenekler: [
      {
        metin: "Davete git, şansını dene.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -6,
          un: 11,
          para: 15,
          mesaj: "Kimse fark etmedi; etkileyici isimlerle tanıştın.",
          detay: "Doğru yerde olmak davetten önemli.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -20,
          mesaj: "Ev sahibi tanımadı, seni herkesin önünde attırdı.",
          detay: "Utanç uzun süre unutulmadı.",
        },
      },
      {
        metin: "Davetiyeyi geri gönder.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Dürüstlüğün küçük bir huzur getirdi.",
          detay: "Bir gece kaçtı ama vicdanın rahat.",
        },
        basarisizSonuc: {
          mesaj: "Geri gönderdin ama merak seni uzun süre kemirdi.",
          detay: "'Gitseydim ne olurdu' diye düşündün.",
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
    metin: "Doğudan dönen bir gezgin, hastaları ayrı tutmanın hastalığı yavaşlattığını anlatıyor. Çoğu kişi bunu garipsiyor.",
    secenekler: [
      {
        metin: "Fikri dinle, uygulamaya çalış.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 20,
          ahlak: 15,
          mesaj: "Önlemler mahallende hastalığın yayılmasını yavaşlattı.",
          detay: "Sana farklı gözle bakmaya başladılar.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Komşuların 'yabancı saçmalığı' diyerek uygulamadı.",
          detay: "Yeni fikir zaman ister; yetmedi.",
        },
      },
      {
        metin: "İlgilenme, geleneğe güven.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Alışıldık yöntemle sürdürdün; kimse garipsemedi.",
          detay: "Uyumlu kaldın, belki fırsat kaçtı.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "O yıl hastalık çevrende her zamankinden hızlı yayıldı.",
          detay: "Belki fark yaratırdı; bilemezsin.",
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
    metin: "Komşun, tasarladığı garip makinenin hayatı kolaylaştıracağını söyleyip küçük bir yatırım istiyor. Çok emin.",
    secenekler: [
      {
        metin: "Küçük bir yatırım yap.",
        baseBasariSansi: 40,
        maliyet: 10,
        basariliSonuc: {
          mutluluk: -10,
          para: 35,
          un: 8,
          mesaj: "Makine çalıştı! Komşunla ortak küçük bir üretim kurdunuz.",
          detay: "Herkesin geçtiği işte kazandın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Makine ilk denemede parçalandı; en çok sen üzüldün.",
          detay: "Bazı heves sadece hevestir.",
        },
      },
      {
        metin: "Kibarca reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Reddettin; komşun biraz küsse de anladı.",
          detay: "Bazı riskler değmez.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Komşun makineyi başkasına sattı, o kişi zengin oldu.",
          detay: "Kaçırdığın fırsat içini burktu.",
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
    metin: "Postacı, yıllar önce yanlış adrese giden bir mektubu sana ulaştırdı. Gönderen sana aşkını itiraf etmiş.",
    secenekler: [
      {
        metin: "Göndereni bulmaya çalış.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 17,
          mesaj: "Kişiyi buldun; artık evli, ama güzel konuşup ayrıldınız.",
          detay: "Geçmişle barışmak iyi geldi.",
        },
        basarisizSonuc: {
          ahlak: -8,
          mesaj: "Kişi çoktan başka şehre taşınmış; iz bulamadın.",
          detay: "Bazı hikâyeler yarım kalır.",
        },
      },
      {
        metin: "Oku, anı olarak sakla.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Okuyup gülümsedin, özenle bir kutuya kaldırdın.",
          detay: "Bazen bu yeterli.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Mektup seni çok duygulandırdı; günlerce dalgın gezdin.",
          detay: "Geçmiş davetsiz karışır.",
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
    metin: "Handa sarhoş bir soylu sana hakaret etti, herkes tepkini bekliyor.",
    secenekler: [
      {
        metin: "Sertçe karşılık ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 25,
          ahlak: 10,
          mesaj: "Sözlerin alkış topladı; soylu mahcup ayrıldı.",
          detay: "'Soyluyu susturan adam' diye anıldın.",
        },
        basarisizSonuc: {
          para: -20,
          un: -12,
          saglik: -10,
          mesaj: "Soylu adamlarını çağırıp seni attırdı.",
          detay: "Onurun bir bedeli oldu.",
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
          detay: "İçin kaynadı ama belaya girmedin.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Han, sessizliğini korkaklık saydı.",
          detay: "Sağduyu bazen itibar kaybettirir.",
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
    metin: "Antika merakı moda; tavan arandan çıkan eski bir aile eşyası değerli olabilirmiş.",
    secenekler: [
      {
        metin: "Uzmana göster.",
        baseBasariSansi: 70,
        maliyet: 8,
        basariliSonuc: {
          mutluluk: -11,
          un: -4,
          para: 40,
          mesaj: "Eşya değerliymiş; koleksiyoncuya iyi fiyata sattın.",
          detay: "Tavan arası beklenmedik gelir getirdi.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -8,
          mesaj: "Sıradan bir taklit çıktı; sadece uzman ücreti ödedin.",
          detay: "Her eski eşya değerli değil.",
        },
      },
      {
        metin: "Yadigâr olarak sakla.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Eşyayı sakladın; gelecek nesle bir anı kaldı.",
          detay: "Her değer parayla ölçülmez.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Yıllar sonra çok değerli olduğunu öğrendin ama kaybolmuştu.",
          detay: "Doğru karar da pişman eder.",
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
    metin: "Pazarda biri seni kasten itip özür dilemedi. İçin kaynıyor.",
    secenekler: [
      {
        metin: "Öfkeni salıver, haddini bildir.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 20,
          ahlak: -10,
          mesaj: "Adam köşeye sıkıştı; kalabalık seni destekledi.",
          detay: "Öfken bu kez işe yaradı.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -15,
          mesaj: "Kavga büyüdü, ikiniz de dayak yediniz, para cezası kesildi.",
          detay: "Sinirin yine başını yaktı.",
        },
      },
      {
        metin: "Dişini sık, nefes al, yürü git.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 18,
          saglik: -3,
          mesaj: "Kendini zor tuttun ama başardın; gerginlik kaldı.",
          detay: "Bu sefer kazanan sen oldun.",
        },
        basarisizSonuc: {
          ahlak: -8,
          saglik: -10,
          mesaj: "Sakin kalmaya çalışırken öfken kaynadı; uyuyamadın.",
          detay: "Bastırılan öfke patlamayı bekliyor.",
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
    metin: "Yangın panığında herkes çığlık atarken sen sakinsin. Bu sükunet dikkat çekti.",
    secenekler: [
      {
        metin: "Sakinliğinle kalabalığı yönlendir.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 28,
          ahlak: 20,
          mesaj: "Sakinliğin paniği dağıttı; insanlar düzenle tahliye oldu.",
          detay: "Doğal lider oldun.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Sakinliğin yetmedi; kalabalık seni dinlemedi.",
          detay: "En sakin ses de kaosu bastıramaz.",
        },
      },
      {
        metin: "Sessizce kendini kurtar.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 8,
          mesaj: "Sakince güvenli yere geçtin; kimse fark etmedi.",
          detay: "Sükunet bu sefer sana yetti.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Sonradan 'neden yardım etmedin' diye sorguladılar.",
          detay: "Sakinlik kayıtsızlık sanılır.",
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
    metin: "Sade giyimli bir adamı aşağıladın; meğer kılık değiştirmiş nüfuzlu bir aile reisiymiş.",
    secenekler: [
      {
        metin: "Sırrını şantaj için kullan.",
        baseBasariSansi: 40,
        maxAhlak: 45,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 50,
          un: 15,
          ahlak: -30,
          mesaj: "Sırrını yayacağını söyledin; yüklü bir 'sus payı' ödedi.",
          detay: "Zengin oldun, güçlü düşman edindin.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          olum: true,
          mesaj: "Soylu suikastçı yolladı; kibrin canına mal oldu.",
        },
      },
      {
        metin: "Özür dile, gururunu yut.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 20,
          un: -8,
          mesaj: "Özrün kabul edildi; adam anlayış gösterdi.",
          detay: "Büyük bir düşmandan kurtuldun.",
        },
        basarisizSonuc: {
          un: -25,
          para: -20,
          mesaj: "Özrün samimi bulunmadı; adam seni işlerinden dışladı.",
          detay: "Kibrin pahalıya patladı.",
        },
      },
      {
        metin: "Umursama, kim olduğu önemsiz.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: -15,
          mesaj: "Hiçbir şey olmadı; adam unutmuş gibi.",
          detay: "Bu sefer yırttın, şansına güvenme.",
        },
        basarisizSonuc: {
          para: -35,
          un: -25,
          mesaj: "Adam nüfuzuyla seni birçok çevrede zora soktu.",
          detay: "Kibrin güçlü bir düşman kazandırdı.",
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
    metin: "Toplantıda etkili birine alaycı bir espri yaptın; herkes güldü, hedefin gülmedi.",
    secenekler: [
      {
        metin: "Esprini savun, geri adım atma.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 22,
          mesaj: "Kalabalık seni destekledi; 'dobra biri' ününü kazandın.",
          detay: "Keskin dilin itibar kazandırdı.",
        },
        basarisizSonuc: {
          un: -20,
          para: -15,
          mesaj: "Hedefin güçlüymüş; işlerini sessizce baltalamaya başladı.",
          detay: "Alaycılığın bedelini ödemeye başladın.",
        },
      },
      {
        metin: "Şakaydı de, yumuşat.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Gerginlik yumuşadı; adam küsse de mesele büyümedi.",
          detay: "Bu sefer dilini frenledin.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Yumuşatma girişimin daha sırıtkan göründü; kimse ikna olmadı.",
          detay: "Bazen zarar çoktan verilmiştir.",
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
    metin: "Kötü bir dönemin ardından herkes umudunu yitirdi. Sen ise işlerin düzeleceğine inanıyorsun.",
    secenekler: [
      {
        metin: "İnsanları toparla, umudu canlandır.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 28,
          ahlak: 25,
          para: -10,
          mesaj: "Sözlerin güç verdi; zorlukları birlikte aşmaya karar verdiniz.",
          detay: "Umudun bir topluluk ruhu yarattı.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "İyimserliğin 'gerçeklerden kopuk' diye eleştirildi.",
          detay: "Umut herkesi ikna etmez.",
        },
      },
      {
        metin: "Umudunu sessizce taşı.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Umudun kimse görmeden seni ayakta tuttu.",
          detay: "Paylaşılmasa da umut yeter.",
        },
        basarisizSonuc: {
          mesaj: "Umudun gerçekle örtüşmedi; hayal kırıklığı yaşadın.",
          detay: "Ödülsüz kalsa da pes etmedin.",
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
    metin: "Gerçek bir fırsat çıktı ama içinden bir ses 'nasılsa boşuna' diyor.",
    secenekler: [
      {
        metin: "Yine de dene.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: -11,
          para: 35,
          un: 9,
          ahlak: 7,
          mesaj: "Şaşırtıcı biçimde işe yaradı; her şey boşuna değilmiş.",
          detay: "Denemek sandığından iyi sonuçlandı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -35,
          ahlak: -15,
          mesaj: "Beklediğin gibi oldu; işe yaramadı.",
          detay: "'Biliyordum' dedin ama kırıldın.",
        },
      },
      {
        metin: "Uğraşma, fark etmez.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Fırsatı geçiştirdin; hayat alışıldık akışında sürdü.",
          detay: "'Ya deneseydim' demek istemedin.",
        },
        basarisizSonuc: {
          ahlak: -12,
          mesaj: "Aynı fırsatla başkasının başardığını görünce için burkuldu.",
          detay: "Umutsuzluğun daha da derinleşti.",
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
    metin: "Haftalardır üstündeki ağırlık atılmıyor; yataktan kalkmak imkânsız. 'Kendine gel' diyorlar ama karanlık çekiyor.",
    secenekler: [
      {
        metin: "Yardım iste, birine açıl.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 20,
          saglik: 15,
          mesaj: "Açılmak zor değildi; yükün hafifledi, ayağa kalktın.",
          detay: "Paylaşılan yük hafifler.",
        },
        basarisizSonuc: {
          un: -12,
          saglik: -10,
          mesaj: "Açıldığın kişi anlamadı, 'abartıyorsun' dedi.",
          detay: "Yanlış kişiye açılmak daha ağır.",
        },
      },
      {
        metin: "Kimseye söyleme, yatağında bekle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: -12,
          mesaj: "Zor da olsa günleri idare ettin; kimse fark etmedi.",
          detay: "Tek başına taşımak yordu ama yaşadın.",
        },
        basarisizSonuc: {
          saglik: -35,
          para: -20,
          olum_sansi: 8,
          mesaj: "Ağırlık seni yuttu; işini kaybettin, sağlığın bozuldu.",
          detay: "Karanlık bedenini de tüketiyor.",
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
    metin: "Çöken bir harabede değerli bir şey varmış; herkes tehlikeli diye girmiyor.",
    secenekler: [
      {
        metin: "İçeri gir, riske at.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 55,
          un: 30,
          mesaj: "Değerli bir şey buldun; kimsenin cesaret edemediğini yaptın.",
          detay: "Şehirde 'korkusuz' diye anıldın.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 12,
          mesaj: "Yapı çöktü; enkazdan son anda kurtuldun.",
          detay: "Cesaret neredeyse canına mal oldu.",
        },
      },
      {
        metin: "Sağduyulu ol, riske girme.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "İçindeki sesi bastırıp uzak durdun; güvendesin.",
          detay: "Girmemek de bir güçtü.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Başkası hazineyi buldu; 'neden girmedin' diye takıldılar.",
          detay: "Girmemek bile açıklama gerektirdi.",
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
    metin: "Eski bir acını hatırlatan bir yer, eşya ya da isimle karşılaştın; hüznün yeniden canlandı.",
    secenekler: [
      {
        metin: "Hüznünle yüzleş, anıyı kabullen.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 20,
          saglik: 8,
          mesaj: "Yüzleşmek acı verdi ama içini rahatlattı.",
          detay: "Kabullenmek beklenmedik huzur getirdi.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Yüzleşme çok ağır geldi; günlerce konuşamadın.",
          detay: "Bazı anılar kolay geçmez.",
        },
      },
      {
        metin: "Hüznünü gizle, hayatına devam et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Hüznünü içinde tutup işine devam ettin; kimse anlamadı.",
          detay: "Hüzün sessiz yol arkadaşın.",
        },
        basarisizSonuc: {
          ahlak: -10,
          saglik: -10,
          mesaj: "Gizlemek seni yordu; hüznün bedensel bir ağırlığa döndü.",
          detay: "Bastırılan duygu bedende yer bulur.",
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
    metin: "Geniş çevren sayesinde, normalde ulaşamayacağın bir fırsattan haberin oldu.",
    secenekler: [
      {
        metin: "Bağlantılarını kullan.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -11,
          para: 40,
          un: 13,
          mesaj: "Bağlantıların sayesinde kapı açıldı.",
          detay: "Bazen ağ, sermayeden değerlidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -8,
          mesaj: "Fırsat göründüğü kadar iyi değildi; zamanın boşa gitti.",
          detay: "Geniş çevre yanlış fırsata da açar.",
        },
      },
      {
        metin: "Fırsatı bir dostuna öner.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Dostun fırsatı değerlendirdi ve sana minnettar kaldı.",
          detay: "Başkasına kapı açmak daha değerli.",
        },
        basarisizSonuc: {
          ahlak: 12,
          mesaj: "Dostun değerlendiremedi; ikiniz de hayal kırıklığına uğradınız.",
          detay: "İyi niyet her zaman işe yaramaz.",
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
    metin: "Büyük, gürültülü bir davete katılman bekleniyor; önemli insanlarla tanışabilirsin ama düşüncesi bile yoruyor.",
    secenekler: [
      {
        metin: "Kendini zorla, katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -6,
          un: 11,
          para: 15,
          saglik: -10,
          mesaj: "Zor da olsa katıldın; birkaç değerli tanışıklık edindin.",
          detay: "Kalabalık yordu ama boşuna değildi.",
        },
        basarisizSonuc: {
          saglik: -18,
          un: -8,
          mesaj: "Kalabalıkta bunalıp erken ayrıldın; bu fark edildi.",
          detay: "Kendini zorlamanın bedeli ağır.",
        },
      },
      {
        metin: "Kibar bir bahaneyle katılma.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 12,
          mesaj: "Evde sakin bir akşam geçirip toparlandın.",
          detay: "Kendi huzurunu bilmek de güçtür.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Davette önemli bir fırsat konuşulmuş; kaçırdın.",
          detay: "Seni korudu ama bir kapıyı kapattı.",
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
    metin: "Etkili birine düşünmeden söylediğin sert söz hızla yayıldı. Kimi cesaret sayıyor, kimi saygısızlık.",
    secenekler: [
      {
        metin: "Sözünün arkasında dur.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 25,
          ahlak: 12,
          mesaj: "Dürüstlüğünle tanındın; birçok kişi aynısını düşünüyormuş.",
          detay: "Sivri dilin bu sefer cesaret sayıldı.",
        },
        basarisizSonuc: {
          para: -25,
          un: -18,
          mesaj: "Hedefin güçlüymüş; işlerini sessizce zorlaştırmaya başladı.",
          detay: "Sözlerinin bedelini şimdi ödüyorsun.",
        },
      },
      {
        metin: "Özür dile, ilişkiyi onar.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Özrün kabul edildi; ilişki onarıldı, gururun biraz kırıldı.",
          detay: "Dilini frenlemek zordu ama işe yaradı.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Özrün samimi bulunmadı; ilişki zaten zedelenmişti.",
          detay: "Bazı sözler geri alınmaz.",
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
    metin: "Herkes yumuşak huyunu sever; biri bunu kötüye kullanıp ağır, haksız bir şey istiyor.",
    secenekler: [
      {
        metin: "Nazikçe ama net hayır de.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 15,
          un: 8,
          mutluluk: 3,
          mesaj: "Net duruşun saygı gördü; adam vazgeçti.",
          detay: "Yumuşak olmak sınır koymamak değil.",
        },
        basarisizSonuc: {
          un: -8,
          mutluluk: -5,
          mesaj: "Reddin bazılarını şaşırttı: 'ona benzemiyor'.",
          detay: "Sınır koymak bazen gerekir.",
        },
      },
      {
        metin: "Her zamanki gibi kabul et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -8,
          para: -10,
          mutluluk: -10,
          mesaj: "İsteği kabul ettin; adam memnun, sen biraz daha eksildin.",
          detay: "Herkesi memnun etmek payını azaltır.",
        },
        basarisizSonuc: {
          para: -25,
          ahlak: -12,
          un: -10,
          mesaj: "Kabulün, adamın seni tekrar tekrar kullanmasına kapı açtı.",
          detay: "İyiliğin sömürüldü; kendine kızdın.",
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
    metin: "Bir tanıdığın seninle açıkça yarışıyor: kim daha çok kazanacak, kim daha tanınacak.",
    secenekler: [
      {
        metin: "Rekabeti kabul et, her şeyini ver.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 40,
          un: 13,
          mutluluk: -3,
          mesaj: "Rekabeti açık farkla kazandın; rakibin bile tebrik etti.",
          detay: "Rekabetçi doğan seni öne çıkardı.",
        },
        basarisizSonuc: {
          para: -20,
          un: -12,
          mutluluk: -20,
          mesaj: "Rakibin seni geride bıraktı; kaybetmek çok ağır geldi.",
          detay: "Rekabet seni bazen fazla riske sokar.",
        },
      },
      {
        metin: "Rekabeti görmezden gel.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 15,
          mutluluk: 3,
          mesaj: "Yarışa girmedin; huzursuz olsan da işlerin sağlıklı ilerledi.",
          detay: "Her yarışa girmemek olgunluktur.",
        },
        basarisizSonuc: {
          un: -10,
          mutluluk: -10,
          mesaj: "Rakibin katılmamanı 'yenilgiyi kabul' diye yorumladı.",
          detay: "Çekilmen de yenilgi sayıldı.",
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
    metin: "İşin iyi gidiyor ama içindeki ses 'yetmez, daha fazlası olmalı' diyor. Büyük hamle riskli.",
    secenekler: [
      {
        metin: "Büyümek için riske gir.",
        baseBasariSansi: 50,
        maliyet: 20,
        basariliSonuc: {
          para: 65,
          un: 25,
          maas_carpani: 1.3,
          mesaj: "Büyük hamle karşılığını verdi; işin bir üst seviyeye sıçradı.",
          detay: "Hırs öne taşıdı; ses susmuyor.",
        },
        basarisizSonuc: {
          para: -55,
          un: -15,
          mutluluk: -15,
          mesaj: "Hamle tutmadı; sağlam işinin bir kısmını bile kaybettin.",
          detay: "Hırs yetinmeyi unutturdu; bedeli ağır.",
        },
      },
      {
        metin: "Elindekiyle yetin.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 12,
          ahlak: 6,
          mesaj: "Yetindin; huzursuz olsan da işin istikrarlı kaldı.",
          detay: "Hırsını bu sefer frenledin.",
        },
        basarisizSonuc: {
          para: -12,
          ahlak: -10,
          mutluluk: -19,
          mesaj: "Yetinmeye çalışsan da tatminsizlik seni günlerce uykusuz bıraktı.",
          detay: "Hırslıya 'yeter' demek işkence.",
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
    metin: "Kimsenin fark etmeyeceği kolay, kazançlı bir yol var ama masum birine zarar verir. Vicdanın susmuyor.",
    secenekler: [
      {
        metin: "Vicdanını dinle, reddet.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 30,
          un: 12,
          mutluluk: 8,
          mesaj: "Vicdanını dinledin; kimse bilmese de kendinle barışıksın.",
          detay: "Başını yastığa rahat koyuyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Doğruyu yaptın ama beklediğinden pahalıya mal oldu.",
          detay: "Vicdanın bazen somut bedeli olur.",
        },
      },
      {
        metin: "'Mecburum' de, kolay yolu seç.",
        baseBasariSansi: 60,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 45,
          ahlak: -35,
          mutluluk: -25,
          mesaj: "Kazandın ama o masumun yüzü aklından çıkmıyor.",
          detay: "Para, bıraktığı zehirden hafif.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: -20,
          ahlak: -25,
          un: -20,
          mesaj: "Ne kazancı aldın ne vicdanını koruyabildin.",
          detay: "Doğana aykırı davranmak iki kat yorar.",
        },
      },
    ],
  },
  {
    id: "yerlesim_sinir_baskini",
    kategori: "savas",
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Sınırda Baskın",
    metin: "Gece yarısı sınır köyünüze akıncılar baskın yaptı. Silah sesleri, yanan evler ve çığlıklarla uyandın.",
    secenekler: [
      {
        metin: "Silahını al, köyü savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          para: 15,
          mesaj: "Baskını püskürtmeye yardım ettin; köylüler minnettar.",
          detay: "Ganimetten ve teşekkürden payını aldın.",
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
          detay: "Sınır yaşamının bedeli etinde kaldı.",
        },
      },
      {
        metin: "Aileni al, ormana kaç.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: -20,
          un: -5,
          mesaj: "Canını kurtardın ama evin yarısı yağmalanmıştı.",
          detay: "Sınırdakiler canı mala tercih eder.",
        },
        basarisizSonuc: {
          para: -25,
          saglik: -15,
          mesaj: "Kaçarken akıncılarla karşılaştın, hem eşyanı hem birkaç yara aldın.",
          detay: "Sınırda huzur kısa süreli kiralıktır.",
        },
      },
    ],
  },
  {
    id: "yerlesim_sehir_salgin_kalabaligi",
    kategori: "sosyal",
    gorsel: "🤧",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kalabalık Çarşı",
    metin: "Çarşı kalabalık, ama ateşli hastalık hızla yayılıyor. Girmek riskli, uzak durmak fırsat kaçırmak.",
    secenekler: [
      {
        metin: "Çarşıya karış, fırsatı değerlendir.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: -10,
          un: -4,
          para: 25,
          mesaj: "Kalabalıkta iyi bir pazarlık yakaladın; hastalığa da yakalanmadın.",
          detay: "Fırsat hep kalabalığın içindedir.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Çarşıdan dönünce ateşin yükseldi; günlerce yattın.",
          detay: "Hastalık da fırsat kadar hızlı yayılır.",
        },
      },
      {
        metin: "Evde kal, bu ayı atlat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Hastalıktan korundun ama çarşıdaki fırsatları kaçırdın.",
          detay: "Bazı aylar hayatta kalmakla geçer.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Evde kalsan da bir komşu hastalığı taşıdı; küçük masrafla atlattın.",
          detay: "Şehirde tam izolasyon neredeyse imkânsız.",
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
    metin: "{bolge} fabrikalarında işçiler ücret ve insani şartlar için greve çıktı. Sokaklar gergin, askerler yolda. Taraf seç.",
    secenekler: [
      {
        metin: "Grevi destekle, işçilerle dur.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          para: -10,
          etiket_ekle: [
            "halkin_adami",
          ],
          mesaj: "Grev kısmi zaferle bitti; işçiler seni safında bilecek.",
          detay: "Ezilenin safı gururlu bir karardır.",
        },
        basarisizSonuc: {
          para: -25,
          un: -10,
          saglik: -10,
          mesaj: "Grev kanlı bastırıldı; elebaşı sayıldın ve dayak yedin.",
          detay: "Fabrika sahipleri unutmaz.",
        },
      },
      {
        metin: "İşverenlerin yanında yer al.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 40,
          ahlak: -25,
          un: -15,
          mesaj: "İşverenler memnun kaldı; kasan bir miktar doldu.",
          detay: "Kazananlar doğru tarafı seçenlerdir.",
        },
        basarisizSonuc: {
          ahlak: -15,
          un: -25,
          saglik: -15,
          mesaj: "İşçiler unutmadı; bir gece sokakta saldırıya uğradın.",
          detay: "Kısa vadeli kazanç, uzun vadeli bedel.",
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
    metin: "Mahallede yeni bir sendika gizlice üye topluyor. {dost} katılmanı öneriyor; dayanışma güçlü ama devletin gözünde riskli.",
    secenekler: [
      {
        metin: "Katıl, {dost} ile birlikte hareket et.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: -8,
          dost_puani: 15,
          ahlak: 12,
          mesaj: "Toplantı iyi geçti; {dost} yanında olduğun için memnun.",
          detay: "Dayanışma ödüllendirir.",
        },
        basarisizSonuc: {
          para: -15,
          un: -10,
          mesaj: "Toplantıyı polis bastı; zar zor kaçtın.",
          detay: "İlk örgütlenme nadiren düzgün gider.",
        },
      },
      {
        metin: "Katılma, bağımsız ve güvende kal.",
        baseBasariSansi: 85,
        basariliSonuc: {
          dost_puani: -10,
          mesaj: "Bağımsız kaldın; {dost} biraz kırıldı ama saygı duydu.",
          detay: "Her yol birlikte yürünmez.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          un: -5,
          mesaj: "{dost} seni çevrede 'patron yalakası' diye anlattı.",
          detay: "Bağımsızlık ihanet sanılabilir.",
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
    metin: "Yerel gazete hakkında yazı hazırlıyor. Muhabir dürüst röportaj mı, süslü bir kahramanlık hikâyesi mi istediğini soruyor.",
    secenekler: [
      {
        metin: "Dürüst röportaj ver.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 15,
          un: 12,
          mesaj: "Yazı sade ama etkiliydi; okurlar samimiyetini beğendi.",
          detay: "Dürüstlük gösterişten uzun yaşar.",
        },
        basarisizSonuc: {
          un: 5,
          mesaj: "Röportaj ilgi görmedi; gazetenin arka sayfasında kaldı.",
          detay: "Her dürüst hikâye manşet olmaz.",
        },
      },
      {
        metin: "Hikâyeyi süsle, kahraman gibi anlat.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 35,
          ahlak: -15,
          mesaj: "Yazı şehirde büyük yankı uyandırdı; adın dillerde.",
          detay: "Güzel yalan gerçeğin önüne geçer.",
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -20,
          mesaj: "Abartıların ortaya çıktı; rakip gazete seni 'yalancı' ilan etti.",
          detay: "Yalan hızlı yayılır, çabuk söner.",
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
    metin: "Yeni demiryolu, uzak bir şehirdeki büyük fırsata birkaç saatte ulaştırıyor. Bilet pahalı ama fırsat kaçmaz gibi.",
    secenekler: [
      {
        metin: "Bileti al, fırsatın peşinden git.",
        baseBasariSansi: 60,
        maliyet: 15,
        basariliSonuc: {
          mutluluk: -11,
          para: 50,
          un: 5,
          mesaj: "Yolculuk fazlasıyla karşılığını verdi; anlaşma imzalandı.",
          detay: "Mesafeyi fırsata çevirenler kazanır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Vardığında fırsatın başkasına gittiğini öğrendin.",
          detay: "Tren vaktinde varır, fırsat beklemez.",
        },
      },
      {
        metin: "Riske girme, paranı sakla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Paranı sakladın; fırsat kaçtı ama cebin hafiflemedi.",
          detay: "Kaçan fırsat her zaman kayıp değil.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Fırsatı değerlendirenlerin kazancını duyunca içine oturdu.",
          detay: "Kaçan fırsat uzun süre aklından çıkmaz.",
        },
      },
    ],
  },
  {
    id: "sanayi_gaz_lambasi_sokaklari",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    gorsel: "🏮",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gaz Lambası Sokakları",
    metin: "Gaz lambalı sokaklar geceleri canlanıyor: kahvehaneler, kumarhaneler, sosyete salonları. {rakip}'in de dışarıda olduğunu duydun.",
    secenekler: [
      {
        metin: "Sosyeteye karış, bağlantı kur.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: -10,
          un: 15,
          dost_puani: 10,
          mesaj: "Gece keyifli geçti; birkaç değerli tanışıklık edindin.",
          detay: "Asıl sosyal hayat gece başlar.",
        },
        basarisizSonuc: {
          para: -25,
          rakip_puani: -15,
          saglik: -5,
          mesaj: "Gece {rakip} ile ters düştün; kumarda da para kaybettin.",
          detay: "Gece hayatı cazibesi kadar risklidir.",
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
          detay: "Her gece dışarı çıkmak şart değil.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Ertesi gün herkesin geceyi konuştuğunu duyunca dışlanmış hissettin.",
          detay: "Evde kalmanın da bedeli var.",
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
    metin: "Komutansın. Keşif kolu yakın vadide zayıf görünen küçük bir düşman birliği bildirdi; tuzak olabilir.",
    secenekler: [
      {
        metin: "İleri! Şafakta baskın emri ver.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 35,
          para: 30,
          mesaj: "Baskın tam isabet etti; düşman dağıldı, ganimet bölüştürüldü.",
          detay: "Adın komuta kademesinde bile efsane.",
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
          mesaj: "Tuzaktı. Birliğin ağır kayıp verdi, sen zor kurtuldun.",
          detay: "Karar bedenine ve itibarına iz bıraktı.",
        },
      },
      {
        metin: "Bekle, önce istihbarat topla.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 10,
          mesaj: "Sabrın işe yaradı; tuzaktı, birliğini kayıpsız çektin.",
          detay: "Temkinli komutanlar sessizce destan yazar.",
        },
        basarisizSonuc: {
          un: -10,
          para: -10,
          mesaj: "Beklerken fırsat kaçtı; üst kademe kararsızlığını sorguladı.",
          detay: "Geç kalan doğru karar da pahalıdır.",
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
    metin: "Lonca ustası olarak ekmek ve tahıl fiyatlarını sen belirliyorsun. Kıtlık var; fiyatları düşük tutmak kârından vazgeçmek demek.",
    secenekler: [
      {
        metin: "Fiyatı düşük tut, halkın yanında dur.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 25,
          un: 20,
          para: -20,
          mesaj: "Karar duyuldu; halk seni loncanın en adili saymaya başladı.",
          detay: "Ortaklar kızsa da itibarın zirvede.",
        },
        basarisizSonuc: {
          ahlak: 10,
          un: 5,
          para: -30,
          mesaj: "Niyetin iyiydi ama uygulama çok pahalıya geldi.",
          detay: "Lonca kasası faturayı uzun süre ödedi.",
        },
      },
      {
        metin: "Fiyatları yüksek tut, kârını koru.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 50,
          ahlak: -25,
          un: -15,
          mesaj: "Kasan doldu; ama adını duyunca yüz çevirenler arttı.",
          detay: "Zenginlik ve sevgi birlikte gelmez.",
        },
        basarisizSonuc: {
          para: 10,
          ahlak: -30,
          un: -25,
          saglik: -10,
          mesaj: "Halk isyan etti, depolar yağmalandı; kârın çoğu buharlaştı.",
          detay: "Açlık en temkinli hesabı bozar.",
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
    metin: "Baş vaizsin; cemaat gergin. Kimi başka inançlara sert vaaz, kimi hoşgörü bekliyor.",
    secenekler: [
      {
        metin: "Hoşgörü ve birlik çağrısı yap.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Vaazın yankı buldu; farklı kesimler bile saygıyla andı.",
          detay: "Ölçülü söz kılıçtan uzun yaşar.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Sert cemaatçiler seni 'zayıf' ilan etti; sözün ağırlığı azaldı.",
          detay: "Hoşgörü herkesi memnun etmez.",
        },
      },
      {
        metin: "Sert, dışlayıcı bir vaaz ver.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 25,
          ahlak: -25,
          mesaj: "Vaazın cemaati ateşledi; bağlılık arttı ama gerilim de.",
          detay: "Otorite ile vicdan açılıyor.",
        },
        basarisizSonuc: {
          ahlak: -20,
          un: -20,
          saglik: -5,
          mesaj: "Sözlerin sokakta çatışmaya döndü; cemaat bile uzaklaştı.",
          detay: "Söz bazen kontrolden çıkan ateştir.",
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
    metin: "{amir} yine herkesin önünde haksız eleştiri yöneltti. Öfken boğazına dayandı.",
    secenekler: [
      {
        metin: "Sineye çek, sus.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -8,
          mesaj: "Sineye çektin; öfken içinde birikti.",
          detay: "Sessizlik kazandırır, ya da erteler.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          ahlak: -5,
          mesaj: "Sineye çekmeye çalıştın ama titredin, herkes fark etti.",
          detay: "Bastırılan öfke daha da belli olur.",
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
          metin: "{amir} şaşkın, herkes izliyor. Devam mı?",
          geriCekilMetni: "Yumuşat: 'öyle demek istemedim.'",
          geriCekilSonucu: {
            ahlak: -5,
            mutluluk: -2,
            mesaj: "Son anda geri adım attın; gerginlik dağıldı, pişmanlık kaldı.",
            detay: "En cesur şey bazen susmaktır.",
          },
          devamMetni: "Hayır, sözünün arkasında dur.",
          devamSonucu: {
            un: 15,
            ahlak: 8,
            para: -15,
            mesaj: "Sonuna kadar gittin. {amir} sessizce uzaklaştı ama cezan gecikmedi.",
            detay: "Bedeli var, ama kendine sadıksın.",
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
    metin: "Eski tedarikçin anlaşılan fiyatı son anda yükseltmek istiyor. Öfkeleniyorsun; ilişkiyi bitirecek bir tehdit savuracaksın.",
    secenekler: [
      {
        metin: "Sakin kal, yeni fiyat öner.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 12,
          mesaj: "Makul bir orta yol buldunuz; ilişki soğumadı.",
          detay: "Sakinlik en iyi pazarlık taktiğidir.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Tedarikçi teklifini beğenmedi, eli sıkı çıktı.",
          detay: "Sakinlik her zaman işe yaramaz.",
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
          metin: "Tedarikçi asık suratlı. Tehdit bağı riske atar.",
          geriCekilMetni: "Sakinleş, tehdidi geri çek.",
          geriCekilSonucu: {
            para: 5,
            ahlak: 5,
            mesaj: "Son anda yumuşadın; tedarikçi küçük bir indirim yaptı.",
            detay: "Geri adım bazen en kısa yoldur.",
          },
          devamMetni: "Hayır. Tehdidi sürdür.",
          devamSonucu: {
            para: 30,
            ahlak: -10,
            rakip_puani: 15,
            mesaj: "Tedarikçi boyun eğdi ama artık sana güvenmiyor.",
            detay: "Pazarlığı kazandın, güveni kaybettin.",
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
    metin: "Vaaz sırasında cemaatten biri seni açıkça sorguladı. Herkes sana bakıyor; sözün otoriteni pekiştirir ya da sarsar.",
    secenekler: [
      {
        metin: "Sabırla, ölçülü yanıt ver.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 12,
          un: 10,
          mesaj: "Ölçülü yanıtın cemaati yatıştırdı; itibarın arttı.",
          detay: "Sabır kürsünün en güçlü silahıdır.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Yanıtın ikna etmedi, mırıltılar sürdü.",
          detay: "Sakin yanıt her zaman işe yaramaz.",
        },
      },
      {
        metin: "Sert tonla otoriteni hatırlat.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Cemaat sustu. Sert ton ya pekiştirir ya böler.",
          geriCekilMetni: "Sesini yumuşat, tartışmayı kapat.",
          geriCekilSonucu: {
            ahlak: 5,
            mesaj: "Tonunu son anda yumuşattın; gerginlik dağıldı.",
            detay: "Otorite bazen sesi alçaltmaktır.",
          },
          devamMetni: "Hayır. Sert tonu sürdür.",
          devamSonucu: {
            un: 20,
            ahlak: -15,
            mesaj: "Sözlerin yankılandı; kimi seni daha çok saydı, kimi cemaati terk etti.",
            detay: "Otorite bazen bölünmeyle gelir.",
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
    metin: "{amir} sana açıkça haksız, hatta tehlikeli bir emir verdi. Disiplin itaat ister ama vicdanın karşı çıkıyor.",
    secenekler: [
      {
        metin: "Emri sorgulamadan uygula.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 8,
          ahlak: -10,
          mesaj: "Emri uyguladın; disiplinin övüldü ama içinde bir rahatsızlık kaldı.",
          detay: "İtaat bazen vicdanı bastırır.",
        },
        basarisizSonuc: {
          saglik: -12,
          ahlak: -12,
          mesaj: "Emri uyguladın ama işler planlandığı gibi gitmedi.",
          detay: "Kör itaatin de bedeli var.",
        },
      },
      {
        metin: "Emre açıkça karşı çık.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "{amir}: 'İtaatsizlik mi?' Yanıtın kaderini çizer.",
          geriCekilMetni: "Geri adım at, emri kabul et.",
          geriCekilSonucu: {
            ahlak: -5,
            mesaj: "Emri son anda kabul ettin; {amir} sustu ama içinde pişmanlık kaldı.",
            detay: "Bazen dik durmak yerine hayatta kalırsın.",
          },
          devamMetni: "Hayır. Emri reddet.",
          devamSonucu: {
            ahlak: 20,
            un: -15,
            para: -20,
            mesaj: "Emri reddettin; vicdanın rahatladı ama ceza gecikmedi.",
            detay: "Doğruyu yapmanın bedeli oldu, pişman değilsin.",
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
    metin: "Birliğin küçük bir düşman kervanına baskın yaptı, ganimet alındı. Komutan soruyor: 'Burada mı duralım?'",
    secenekler: [
      {
        metin: "Ganimeti topla, geri çekil.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 20,
          un: 8,
          etiket_ekle: [
            "zincir_ganimet_devam",
          ],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "Ganimeti toplayıp güvenle çekildiniz.",
          detay: "Komutan: 'Açgözlülük en büyük düşmandır.'",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 10,
          saglik: -8,
          etiket_ekle: [
            "zincir_ganimet_devam",
          ],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "Çekilme karıştı, birkaç asker yaralandı ama ganimet kaldı.",
          detay: "Yine de tehlikeli bir çekilmeydi.",
        },
      },
      {
        metin: "Daha fazlası için ilerleyin.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 40,
          un: 18,
          etiket_ekle: [
            "zincir_ganimet_devam",
          ],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "İlerlediniz; ikinci bir kervan daha aldınız.",
          detay: "Moral gökte, ama şans ne kadar sürer?",
        },
        basarisizSonuc: {
          saglik: -25,
          un: -15,
          etiket_ekle: [
            "zincir_ganimet_devam",
          ],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "İlerlerken pusuya düştünüz; birkaç asker kayboldu.",
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
    metin: "Komutan soruyor: 'Bu ganimet yeter mi, yoksa yine saldıralım mı?' Herkesin gözü sende.",
    secenekler: [
      {
        metin: "Yeter. Kazandığımızla dönelim.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 10,
          etiket_sil: [
            "zincir_ganimet_devam",
          ],
          mesaj: "Kazandığınızla döndünüz; birlik sağ salim üsse ulaştı.",
          detay: "En akıllı zafer, zamanında durmaktır.",
        },
        basarisizSonuc: {
          un: -5,
          etiket_sil: [
            "zincir_ganimet_devam",
          ],
          mesaj: "Dönüş kararı bazı askerleri hayal kırıklığına uğrattı.",
          detay: "Herkes aynı fikirde olmaz.",
        },
      },
      {
        metin: "Hayır, saldıralım.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 50,
          un: 28,
          etiket_sil: [
            "zincir_ganimet_devam",
          ],
          mesaj: "İkinci dalga da başardı; birliğin adı bölgeye yayıldı.",
          detay: "Şans bu kez de yaver gitti.",
        },
        basarisizSonuc: {
          saglik: -35,
          un: -20,
          olum_sansi: 12,
          etiket_sil: [
            "zincir_ganimet_devam",
          ],
          mesaj: "Son saldırı felaketle bitti; birlik ağır kayıp verdi.",
          detay: "Açgözlülüğün faturası ağır.",
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
    metin: "Kısa çarpışmanın ardından düşman dağılıp kaçtı. Birkaçı yaralı ve yavaş; kovalarsan yetişirsin.",
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
          mesaj: "Mevzini korudun; birlik dinlendi.",
          detay: "Zafer bazen kovalamamakla korunur.",
        },
        basarisizSonuc: {
          un: -5,
          etiket_ekle: [
            "zincir_takip_devam",
          ],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Beklemen bazı askerlerce korkaklık sayıldı.",
          detay: "Her temkin takdir görmez.",
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
          mesaj: "Kaçanları yakaladın; tam bir zafer kazandınız.",
          detay: "Ama artık bilinmeyen arazidesiniz.",
        },
        basarisizSonuc: {
          saglik: -20,
          etiket_ekle: [
            "zincir_takip_devam",
          ],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Kovalarken düzeniniz bozuldu, birkaç asker geride kaldı.",
          detay: "Zafer hırsı tuzağa dönüşür.",
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
    metin: "Kovalamaca sizi tanımadığınız bir ormana sürükledi. İleride bir şey kıpırdıyor: takviye mi, rüzgâr mı? Devam mı, geri mi?",
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
          mesaj: "Geri dönüş kimilerince fırsat kaçırmak sayıldı.",
          detay: "Herkesi memnun etmek imkânsız.",
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
          mesaj: "Terk edilmiş bir düşman kampı buldunuz; ganimet birliğin oldu.",
          detay: "Cesaret bu kez ödüllendirildi.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          etiket_sil: [
            "zincir_takip_devam",
          ],
          mesaj: "Orman gerçek bir tuzaktı; birlik ağır kayıp verdi.",
          detay: "Rüzgâr değilmiş.",
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
    metin: "Büyük bir alıcı mallarını piyasanın çok altında almak istiyor. Kabulde küçük ama garanti kâr; redde büyük kazanç riski var.",
    secenekler: [
      {
        metin: "Kabul et, işi garantile.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 13,
          etiket_ekle: [
            "zincir_pazarlik_devam",
          ],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Teklifi kabul ettin; kâr düşük ama garanti.",
          detay: "Küçük ama kesin kazanç büyük riske değer.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 8,
          etiket_ekle: [
            "zincir_pazarlik_devam",
          ],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Kabul ettin ama alıcı son anda şartları ağırlaştırdı.",
          detay: "Masada hep avantajlı çıkılmaz.",
        },
      },
      {
        metin: "Reddet, daha iyi fiyat için ısrar et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 32,
          etiket_ekle: [
            "zincir_pazarlik_devam",
          ],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Israrın işe yaradı, alıcı fiyatı yükseltti.",
          detay: "Cesaretin karşılığını buldu.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          etiket_ekle: [
            "zincir_pazarlik_devam",
          ],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Alıcı vazgeçip başka tüccara yöneldi.",
          detay: "Israr her zaman kazandırmaz.",
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
    metin: "Aynı alıcı birkaç gün sonra döndü; daha büyük sipariş öneriyor ama şartlar daha sıkı. Bu ilişkiye daha çok bağlanır mısın?",
    secenekler: [
      {
        metin: "Teşekkür et, burada bırak.",
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
          detay: "Bazen 'hayır'ın da bedeli var.",
        },
      },
      {
        metin: "Büyük siparişi kabul et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 45,
          maas_carpani: 1.1,
          etiket_sil: [
            "zincir_pazarlik_devam",
          ],
          mesaj: "Sipariş sorunsuz bitti; ticaretin bir kademe büyüdü.",
          detay: "Bazı riskler karşılığını verir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -30,
          etiket_sil: [
            "zincir_pazarlik_devam",
          ],
          mesaj: "Siparişte işler ters gitti, zarar ettin.",
          detay: "Büyük fırsat büyük risk getirir.",
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
    metin: "Saygın bir büyüğün fikrine açıkça katılmıyorsun. Herkesin önünde sesini yükseltmek ile susmak arasında kaldın.",
    secenekler: [
      {
        metin: "Karşılık ver, fikrini savun.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 5,
          un: 10,
          mesaj: "Cesaretin gençlerce takdir edildi: 'kendi fikri olan biri' dediler.",
          detay: "Genç sesler değişimin kıvılcımıdır.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "'Saygısız' diye azarlandın, büyükler bir süre soğuk davrandı.",
          detay: "Her başkaldırı hemen anlaşılmaz.",
        },
      },
      {
        metin: "Sus, saygıyla dinle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Susman olgunluk sayıldı.",
          detay: "Susmak da güç gösterisidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "İçine atmak seni huzursuz etti, o gece zor uyudun.",
          detay: "Yutulan sözler içeride yankılanır.",
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
    metin: "Arkadaşların seni gece yarısı tehlikeli, biraz da aptalca bir maceraya çağırıyor. 'Korkuyorsan gelme' diye gülüyorlar.",
    secenekler: [
      {
        metin: "Katıl, cesaretini göster.",
        baseBasariSansi: 60,
        basariliSonuc: {
          dost_puani: 10,
          mutluluk: 5,
          mesaj: "Gece unutulmaz bir maceraya döndü, grupta efsane oldun.",
          detay: "Bazı anılar yıllarca güldürür.",
        },
        basarisizSonuc: {
          saglik: -10,
          para: -10,
          mesaj: "Macera ters gitti, yaralı ve meteliksiz döndün.",
          detay: "Cesaret bazen dikkatsizliktir.",
        },
      },
      {
        metin: "Reddet, kendi yolunu seç.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Reddettin; ertesi gün arkadaşların başına geleni duyunca haklı çıktın.",
          detay: "Hayır demek bazen en akıllıcasıdır.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "Bir süre 'korkak' diye dalga geçtiler.",
          detay: "Her ret anlayışla karşılanmaz.",
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
    metin: "Aylarca emek verdiğin iş elinde patladı. İlk gerçek başarısızlığın gibi.",
    secenekler: [
      {
        metin: "Yeniden dene, pes etme.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 3,
          mesaj: "İkinci denemede başardın; başarısızlık seni güçlendirdi.",
          detay: "Bazı dersler düşerek öğrenilir.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "İkinci deneme de tutmadı; kendine güvenin sarsıldı.",
          detay: "İkinci şans zafer getirmez.",
        },
      },
      {
        metin: "Kabul et, başka işe yönel.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Hayal kırıklığını kabullenip enerjini başka alana yönelttin.",
          detay: "Bazen en bilgece hareket vazgeçmektir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Vazgeçtin ama içinde uzun süre bir 'acaba' kaldı.",
          detay: "Bırakılan işler peşini bırakmaz.",
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
    metin: "Talim meydanında çavuş seni deneyimli bir askerle düelloya sokuyor. Kılıcını gerçek rakibe ilk kez sallıyorsun.",
    secenekler: [
      {
        metin: "Tüm gücünle saldır.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          mesaj: "Rakibi şaşırtan bir hamle yaptın; çavuş gözünü ayırmadı.",
          detay: "İlk zaferler en çok hatırlananlardır.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Tecrübeli asker seni herkesin önünde yere serdi.",
          detay: "Acı en iyi öğretmendir.",
        },
      },
      {
        metin: "Temkinli ol, sadece savun.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Temkinin seni ayakta tuttu; tecrübeli asker bile şaşırdı.",
          detay: "Hayatta kalmak kazanmaktan değerlidir.",
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
    metin: "Ustasız, tamamen kendi başına ilk büyük pazarlığını yapıyorsun. Karşındaki tüccar deneyimli ve sabırsız.",
    secenekler: [
      {
        metin: "Cesurca yüksek fiyat öner.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: -8,
          para: 20,
          un: 5,
          mesaj: "Cesaretin karşılık buldu; iyi fiyata anlaştın.",
          detay: "İlk pazarlık zaferini unutmayacaksın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Seni 'toy' sayıp başkasıyla anlaştı.",
          detay: "Her cesaret karşılık bulmaz.",
        },
      },
      {
        metin: "Mütevazı, güvenli bir teklifle başla.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 10,
          mesaj: "Teklifin kabul gördü; küçük ama güvenli kazanç.",
          detay: "İlk adım küçük olmalı.",
        },
        basarisizSonuc: {
          mesaj: "Pazarlık uzadı, anlaşamadınız.",
          detay: "Her pazarlık anlaşmayla bitmez.",
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
    metin: "Baş rahip hasta; küçük bir ayini sen yönetmelisin. Kalabalık az da olsa bu ilk gerçek kürsün.",
    secenekler: [
      {
        metin: "Kendi sözlerinle, içtenlikle konuş.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 10,
          un: 10,
          mesaj: "Sözlerin cemaati etkiledi: 'Bu genç büyüyecek' dediler.",
          detay: "İçtenlik en güçlü vaazdır.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Heyecandan kekeledin, bazıları gülümseyip fısıldaştı.",
          detay: "İlk deneme kusursuz olmaz.",
        },
      },
      {
        metin: "Ezberlediğin klasik metni oku.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Güvenli seçim işe yaradı, ayin sorunsuz geçti.",
          detay: "Bilinen yol en güvenlisidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Ezbere okumak seni tatminsiz bıraktı; kendi sesini bulamadın.",
          detay: "Güvenlik bazen özgünlükten ödün verir.",
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
    metin: "Ocak başında torunlar ya da genç komşular gençliğini soruyor. Anlatacak çok şeyin var.",
    secenekler: [
      {
        metin: "Hikâyelerini anlat.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 5,
          dost_puani: 5,
          mesaj: "Hikâyelerin herkesi büyüledi; gece geç saate kadar sohbet ettiniz.",
          detay: "Paylaşılan hayat iki kat yaşanır.",
        },
        basarisizSonuc: {
          mesaj: "Hikâyelerin ilgi görmedi; gençler konuyu değiştirdi.",
          detay: "Her nesil aynı hikâyeye kapılmaz.",
        },
      },
      {
        metin: "Sessizce kendi içinde yaşa.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Anıları kendine saklayıp sessiz bir huzurla yeniden yaşadın.",
          detay: "Bazı hazineler paylaşılmadan da değerlidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Sessizliğin yalnızlık hissini derinleştirdi.",
          detay: "Paylaşmamanın da bedeli var.",
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
    metin: "Eskiden kolay yaptığın bir işi bugün yapamadın. Bedenin artık gençliğindeki gibi değil.",
    secenekler: [
      {
        metin: "Gençlikteki gibi zorla.",
        baseBasariSansi: 40,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Başardın! Bedenin hâlâ eski günlerdeki gibi cevap veriyor.",
          detay: "İrade bazen yaşı yener.",
        },
        basarisizSonuc: {
          saglik: -15,
          mesaj: "Kendini fazla zorladın, günlerce yatalak kaldın.",
          detay: "Beden iradenin önüne geçer.",
        },
      },
      {
        metin: "Yaşını kabullen, yavaşla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Yaşını kabullenmek beklediğinden huzurlu çıktı.",
          detay: "Bilgelik sınırını bilmektir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Yavaşlamak gururunu incitti; eski günleri özledin.",
          detay: "Kabulleniş zaman ister.",
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
    metin: "Geriye ne bırakacağını düşünüyorsun. Yıllarca biriktirdiğin bilgi, servet ve tecrübe seninle mi gidecek?",
    secenekler: [
      {
        metin: "Servetini ve bilgeliğini gence aktar.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 8,
          dost_puani: 10,
          mesaj: "Seçtiğin genç öğrettiklerini can kulağıyla dinledi; mirasın yaşayacak.",
          detay: "Gerçek miras altından çok bilgidir.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Seçtiğin kişi güvenini kötüye kullandı, verdiklerini israf etti.",
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
          mesaj: "Her şeyi kendinde tuttun; güvenlik hissi seni rahatlattı.",
          detay: "Temkin de bir tercihtir.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Yalnızlığın sakladığın her şeyin anlamını sorgulattı.",
          detay: "Paylaşılmayan miras anlamını yitirir.",
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
    metin: "Komutan soruyor: 'Bir kez daha, son kez nöbete çıkar mısın?' Genç bir askere yol göstermen isteniyor.",
    secenekler: [
      {
        metin: "Kabul et, son kez üniformanı giy.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 15,
          mutluluk: 5,
          mesaj: "Genç askere öğrettiklerin hayatını kurtaracak; gurur doluydun.",
          detay: "Bazı nöbetler ömür boyu sürer.",
        },
        basarisizSonuc: {
          saglik: -15,
          mesaj: "Soğuk gece nöbeti bedenini fazlasıyla yordu.",
          detay: "Yaşlı beden eski dayanıklılığı vermiyor.",
        },
      },
      {
        metin: "Nazikçe reddet, dinlenme vakti.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Reddin anlayışla karşılandı; hak ettiğin dinlenmeyi seçtin.",
          detay: "Ömür boyu hizmetin dinlenme hakkı vardır.",
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
    metin: "Yıllardır emek verdiğin işi devretme vakti geldi mi? Genç yardımcın devralmaya hazır görünüyor.",
    secenekler: [
      {
        metin: "Güven et, işi devret.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 8,
          dost_puani: 10,
          mesaj: "Yardımcın işi titizlikle devraldı; mirasının sürmesi seni gururlandırdı.",
          detay: "Emek en iyi ellerde sürer.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Yardımcın hatalar yaptı; yıllık itibarına gölge düştü.",
          detay: "Her devir kusursuz olmaz.",
        },
      },
      {
        metin: "Hayır, dizginleri elinde tut.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "İşi elinde tuttun; alışkanlık sana güven veriyor.",
          detay: "Kimine iş, hayatın kendisidir.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Yaşına rağmen tüm yükü taşımak seni yordu.",
          detay: "Bırakmamanın bedeli var.",
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
    metin: "Sağlığın eskisi gibi değil; cemaat seni belki en önemli vaazını vermeye çağırdı. Sözlerin yıllarca hatırlanabilir.",
    secenekler: [
      {
        metin: "Bir ömürlük bilgeliğini paylaş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 20,
          ahlak: 10,
          mutluluk: 8,
          mesaj: "Sözlerin cemaati gözyaşına boğdu; yıllarca anlatılacak bir vaaz verdin.",
          detay: "Bir ömrün özü birkaç cümleye sığar.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Heyecan ve yorgunluk seni aştı, vaazı yarıda bıraktın.",
          detay: "Beden ruhun isteğine yetişemez.",
        },
      },
      {
        metin: "Kısa, sade konuş.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sade sözlerin yürekten geldi; cemaat minnettar kaldı.",
          detay: "Az söz çok şey anlatır.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Söyleyemediğin çok şey içinde kaldı.",
          detay: "Zamanında söylenmeyen söz içeride kalır.",
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
    metin: "Meydan savaşının en yoğun anında iki düşman askeri seni kıstırdı. Geri çekilmek onurunu zedeler; sonuna dek dövüşmek riskli.",
    secenekler: [
      {
        metin: "Geri çekil, kalkanına sığın.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: -5,
          mesaj: "Zamanında çekildin; kalkanın seni korudu.",
          detay: "Hayatta kalmak bazen geri adım ister.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Geri çekilirken bile kılıç darbesi aldın.",
          detay: "Savaşta güvenli köşe yoktur.",
        },
      },
      {
        metin: "Sonuna kadar dövüş, ikisine karşı koy.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 30,
          para: 20,
          mesaj: "İkisini de alt ettin; birlik seni destansı kahraman gibi karşıladı.",
          detay: "Bugün adının efsaneleştiği gündür.",
        },
        basarisizSonuc: {
          saglik: -40,
          un: 10,
          etiket_ekle: [
            "kalici:tek_kolu_yok",
          ],
          olum_sansi: 10,
          mesaj: "Kılıç darbesi kolunu işe yaramaz kıldı; cerrah kurtaramadı.",
          detay: "Artık eskisi gibi savaşamazsın ama hayattasın.",
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
    metin: "Birliğin yakın dövüşe giriyor. Kumandan soruyor: ön safta iki elle mi savaşacaksın, geride mızrakla mı destekleyeceksin?",
    secenekler: [
      {
        metin: "Ön safa geç, iki elle dövüş.",
        baseBasariSansi: 55,
        yasakliEtiketler: [
          "kalici:tek_kolu_yok",
          "kalici:savas_travmasi",
        ],
        kilitAciklamasi: "Bedenin ve zihnin artık buna izin vermiyor.",
        basariliSonuc: {
          un: 20,
          para: 10,
          mesaj: "Ön saftaki cesaretin birliğin morali oldu.",
          detay: "Kimse önünde durmaya cesaret edemedi.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Ön saf ağır bedel istedi; yaralı ama ayaktasın.",
          detay: "Cesaretin bedeli oldu.",
        },
      },
      {
        metin: "Geride kal, mızrakla destekle.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 5,
          mesaj: "Destek pozisyonun birliğin hattını korudu.",
          detay: "Her kahramanlık ön safta olmaz.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Geride de olsan çarpışmanın kaosundan payını aldın.",
          detay: "Savaşta tam güvenli yer yoktur.",
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
    metin: "Haftalarca süren kuşatmanın ardından şehir düştü. Sokaklarda gördüklerin savaşın en çirkin yüzüydü. Seninle kalacak mı?",
    secenekler: [
      {
        metin: "Bastır, göreve devam et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Gördüklerini bir kenara koyup göreve devam ettin.",
          detay: "Kimi başarır, kimi başarıyormuş gibi yapar.",
        },
        basarisizSonuc: {
          mutluluk: -25,
          etiket_ekle: [
            "kalici:savas_travmasi",
          ],
          mesaj: "Gördüklerin seni içten içe sarstı; geceler artık aynı değil.",
          detay: "Savaş zihni yaralar; yara görünmez ama derin.",
        },
      },
      {
        metin: "Bir süre kenara çekil.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 5,
          un: -5,
          mesaj: "Kendine tanıdığın zaman iyi geldi; birkaç gün sonra güçlü döndün.",
          detay: "Kendine nazik olmak zayıflık değildir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Geri çekilmen bazılarınca zayıflık sayıldı.",
          detay: "Herkes duygusal yükü anlamaz.",
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
    metin: "Lonca kurallarını çiğneyip rakip bir şehirle gizlice çok kârlı anlaşma yapabilirsin. Lonca öğrenirse bu geri dönüşsüz bir ihanettir.",
    secenekler: [
      {
        metin: "Reddet, loncaya sadık kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 10,
          mesaj: "Sadakatini korudun; loncadaki yerin sağlam.",
          detay: "Bazı fırsatlar güveni riske atmaya değmez.",
        },
        basarisizSonuc: {
          mesaj: "Reddettin ama fırsat aklından çıkmadı.",
          detay: "Bazı 'ne olurdu'lar uzun kalır.",
        },
      },
      {
        metin: "Gizlice anlaşmayı yap.",
        baseBasariSansi: 45,
        basariliSonuc: {
          mutluluk: -11,
          un: -5,
          para: 50,
          mesaj: "Anlaşma fark edilmeden bitti; cebin kabardı.",
          detay: "Bu şans sonsuza dek sürmez.",
        },
        basarisizSonuc: {
          para: 20,
          un: -30,
          etiket_ekle: [
            "itibar:lonca_disi",
          ],
          mesaj: "İhanetin ortaya çıktı; lonca seni sonsuza dek kovdu.",
          detay: "Artık loncanın himayesi yok; her şey sende.",
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
    metin: "Üst makamların bir kararını vicdanına aykırı buluyorsun. Açıkça karşı çıkmak kilisedeki her şeyini riske atar.",
    secenekler: [
      {
        metin: "Sessiz kal, itaat et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -10,
          mesaj: "İtaat ettin; konumun güvende ama içinde bir ağırlık var.",
          detay: "Bazı sessizliklerin bedeli görünmez.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "İtaat etsen de vicdanın rahat bırakmadı.",
          detay: "Bazı düşünceler kolay susmaz.",
        },
      },
      {
        metin: "Açıkça karşı çık.",
        baseBasariSansi: 40,
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Cesaretin dikkat çekti; bazı üst makamlar bile seni sessizce destekledi.",
          detay: "Doğruyu söylemek beklenmedik müttefik kazandırır.",
        },
        basarisizSonuc: {
          ahlak: 15,
          un: -35,
          para: -25,
          etiket_ekle: [
            "itibar:aforoz_edildi",
          ],
          mesaj: "Karşı çıkışın aforozla bitti; resmî kilise çevrelerinde yerin kalmadı.",
          detay: "Vicdanın rahat, ama çok daha yalnız bir yoldasın.",
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
    metin: "Kral açıkça zalimce bir emir verdi: masum bir köy cezalandırılacak. Vicdanın karşı çıkmanı istiyor ama bedeli ağır olabilir.",
    secenekler: [
      {
        metin: "Emri sessizce uygula.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -20,
          un: 10,
          mesaj: "Emri uyguladın; kral memnun ama vicdanın bir daha aynı olmayacak.",
          detay: "Bazı emirler insanı eskisi gibi bırakmaz.",
        },
        basarisizSonuc: {
          ahlak: -25,
          saglik: -10,
          mesaj: "Emri uyguladın ama köylülerin feryadı uykunu bölecek.",
          detay: "Bazı görevler kazanılsa da yenilgidir.",
        },
      },
      {
        metin: "Emri açıkça reddet.",
        baseBasariSansi: 40,
        basariliSonuc: {
          ahlak: 30,
          dost_puani: 15,
          mesaj: "Reddin cesaret örneği oldu; birliğinden bazıları yanında durdu.",
          detay: "Bir kişinin cesareti başkasını cesaretlendirir.",
        },
        basarisizSonuc: {
          ahlak: 20,
          para: -35,
          un: -20,
          etiket_ekle: [
            "itibar:kralin_dusmani",
          ],
          mesaj: "Reddin krala iletildi; artık resmen 'kralın düşmanı'sın.",
          detay: "Vicdanın huzurlu, ama başın her an gidebilir.",
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
    metin: "Doğudan gelen bir kervan eşsiz kalitede ipek getirdi. Tüm servetini bu yüke yatırırsan ya efsanevi kazanç ya büyük kayıp seni bekler.",
    secenekler: [
      {
        metin: "Tüm sermayeni ipeğe yatır.",
        baseBasariSansi: 50,
        maliyet: 40,
        basariliSonuc: {
          para: 80,
          un: 20,
          unvan_kazan: "İpek Kralı",
          mesaj: "İpek pazarda inanılmaz fiyata satıldı; adın en zengin tüccarlarla anılıyor.",
          detay: "Artık sana 'İpek Kralı' diyorlar.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -45,
          mesaj: "İpeğin çoğu yolda nemden bozuldu; yatırımın büyük ölçüde boşa gitti.",
          detay: "Büyük hayal büyük kayıp getirir.",
        },
      },
      {
        metin: "Az al, temkinli kal.",
        baseBasariSansi: 85,
        maliyet: 15,
        basariliSonuc: {
          para: 20,
          mesaj: "Küçük yatırımın güvenli kazanç getirdi.",
          detay: "Temkin heyecansız ama güvenlidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Küçük yatırım bile beklediğin gibi çıkmadı.",
          detay: "Bazen pazarın nabzı kaçar.",
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
    metin: "Küçük birliğin, sayıca üstün düşman dalgasına karşı bir geçidi savunmakla görevli. Bugün ya efsane ya unutuluş.",
    secenekler: [
      {
        metin: "Geçidi sonuna dek savun.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 35,
          para: 25,
          unvan_kazan: "Cesur Yürek",
          mesaj: "Geçidi tek başınıza tuttunuz; düşman çekildi. Gün destanlara konu oldu.",
          detay: "Askerler sana 'Cesur Yürek' diyor.",
        },
        basarisizSonuc: {
          saglik: -40,
          un: 15,
          olum_sansi: 15,
          mesaj: "Geçit düştü ama direnişiniz düşmana ağır kayıp verdirdi.",
          detay: "Yenilgi bile onurlu olabilir.",
        },
      },
      {
        metin: "Düzenle geri çekil.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Kayıp vermeden güvenli bölgeye ulaştınız.",
          detay: "Her gün destansı olmak zorunda değil.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Geri çekilirken küçük bir çatışma yaşandı.",
          detay: "Güvenli yollar da risklidir.",
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
    metin: "Hekimlerin çaresiz kaldığı bir hasta sana getirildi. Dua ve bakımınla umut verebilirsin, ama sonuç garanti değil.",
    secenekler: [
      {
        metin: "Gece gündüz başında dua et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 30,
          ahlak: 15,
          unvan_kazan: "Şifa Veren",
          mesaj: "Hasta beklenmedik biçimde iyileşti; halk bunu mucize saydı.",
          detay: "Sana 'Şifa Veren' diyorlar; elinden geleni yaptın.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          saglik: -5,
          mesaj: "Tüm çabana rağmen hasta kurtarılamadı.",
          detay: "Bazı kayıplar önlenemez.",
        },
      },
      {
        metin: "Elinden geleni yap, umut verme.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Ölçülü yaklaşımın hem hastaya hem sana iyi geldi.",
          detay: "Hep uçta olmak gerekmez.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Hasta kurtarılamadı ama elinden geleni yaptın.",
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
    metin: "Bir anlaşmazlık şiddetli çatışmaya döndü; karşındaki güçlü, kalabalık bir soylu ailenin oğluymuş. İstemeden ölümüne yol açtın.",
    secenekler: [
      {
        metin: "Gizlemeye çalış, sessiz kal.",
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
          mesaj: "Olayı örtbas ettin ama vicdanın ve korkun peşini bırakmıyor.",
          detay: "Sırlar sessizce bile ağırdır.",
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
          mesaj: "Gerçek çabuk ortaya çıktı; ailenin gözü artık üzerinde.",
          detay: "Saklanan sır daha hızlı yayılır.",
        },
      },
      {
        metin: "Aileye haber ver, hesap ver.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 15,
          para: -25,
          mesaj: "Dürüstlüğün aileyi yumuşattı; kan parası ödeyip anlaştın.",
          detay: "Bazı hesaplar parayla kapanır; hepsi değil.",
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
          mesaj: "Dürüstlüğün aileyi yumuşatmadı; öfkeleri büyüdü.",
          detay: "Kimi aileye hiçbir özür yetmez.",
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
    metin: "Yıllar sonra unuttuğunu sandığın kan davası seni buldu. Karanlık bir sokakta bir suikastçı saldırdı.",
    secenekler: [
      {
        metin: "Karşı koy, dövüş.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 20,
          etiket_sil: [
            "kandavasi:zamani",
          ],
          mesaj: "Suikastçıyı etkisiz kıldın; kan davası kapandı.",
          detay: "Yıllık yük bu gece bitti.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 20,
          etiket_sil: [
            "kandavasi:zamani",
          ],
          mesaj: "Ağır yaralandın, suikastçı kaçtı; tehdit bir süre çekildi.",
          detay: "Bu gece kurtuldun, ama bedeli ağırdı.",
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
          mesaj: "Kaçtın; sonra ailenle gizlice anlaşıp davayı kapattın.",
          detay: "Bazı savaşlar kaçarak kazanılır.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Kaçarken yakalandın; kısa ama şiddetli çatışmanın ardından suikastçı vazgeçti.",
          detay: "Dava hâlâ bir gölge gibi duruyor.",
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
    metin: "Şehirde veba yayılıyor, hastalara bakacak kimse yok. Bakmak seni de hasta edebilir; ama bilgin bağışıklık ya da şifa kazandırabilir.",
    secenekler: [
      {
        metin: "Hastalara bizzat bak.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          etiket_ekle: [
            "tibbi:sifaci",
          ],
          mesaj: "Haftalık bakımın sonunda hastalığı tedavi etmenin inceliklerini öğrendin.",
          detay: "Artık sadece dua etmiyor, şifa da veriyorsun.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 8,
          etiket_ekle: [
            "tibbi:veba_bagisik",
          ],
          mesaj: "Hastalandın ama vücudun kazandı; artık vebaya bağışıksın.",
          detay: "Zor deneyim seni güçlendirdi.",
        },
      },
      {
        metin: "Uzaktan dua et, riske girme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Uzaktan dua ettin; güvende kaldın.",
          detay: "Her cesaret riskle olmaz.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Uzak durman bazı cemaat üyelerince eleştirildi.",
          detay: "Herkes aynı cesareti beklemez; kimi bekler.",
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
    metin: "Veba yeniden hız kazandı. Hastane taştı, yardım eli azaldı.",
    secenekler: [
      {
        metin: "Bağışıklığına güvenip hastalara yardım et.",
        baseBasariSansi: 90,
        gerekliEtiketler: [
          "tibbi:veba_bagisik",
        ],
        kilitAciklamasi: "Bağışıklığın yok; bu kadar yaklaşmak çok riskli.",
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          mesaj: "Korkusuzca hastalara yardım ettin; halk seni kahraman saydı.",
          detay: "Geçmiş acın şimdi başkalarını kurtarıyor.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Bağışıklığın korudu ama tükenmişlik ağır bastı.",
          detay: "Beden dayansa da ruh yorulur.",
        },
      },
      {
        metin: "Şifacılık bilginle hastalara bak.",
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
          detay: "Öğrendiklerin tam zamanında işe yaradı.",
        },
        basarisizSonuc: {
          saglik: -20,
          mesaj: "Bilgine rağmen bu dalga daha acımasızdı.",
          detay: "Her bilgi her felaketi durduramaz.",
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
          detay: "Bazen hayatta kalmak yeter.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Güvende kalman rahatsız etti; yardım edemediğin için kendini suçladın.",
          detay: "Güvenli seçim vicdanı rahatsız edebilir.",
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
    metin: "Zor bir dönemin ardından bir tanıdığın acılarını dindirmek için afyon özütü öneriyor. Rahatlatır ama bağımlılık riski var.",
    secenekler: [
      {
        metin: "Bir kez dene.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 8,
          mesaj: "Acın bir süre dindi; hafiflediğini hissettin.",
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
          mesaj: "Rahatlama o kadar iyi geldi ki tekrar tekrar kullandın; artık vazgeçemiyorsun.",
          detay: "Acını dindiren şey yeni bir acıya dönüştü.",
        },
      },
      {
        metin: "Reddet, acıyla başka türlü baş et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Reddettin; acınla başka yollarla baş etmeyi seçtin.",
          detay: "Zor yol çoğu zaman daha sağlamdır.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Reddetmek kolay olmadı, acın biraz daha sürdü.",
          detay: "Bazı zorluklar kaçışsız aşılır.",
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
    metin: "Aynada kendine bakınca bağımlılığının seni ne hale getirdiğini gördün. Belki değişme vaktidir.",
    secenekler: [
      {
        metin: "İradeyle savaş, bağımlılığı bırak.",
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
          mesaj: "Cehennem gibi bir mücadelenin ardından bağımlılığından kurtuldun.",
          detay: "Hayatın en zor ama en değerli zaferlerinden.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          mesaj: "Yoksunluğa dayanamadın; gözyaşlarıyla eski alışkanlığa döndün.",
          detay: "Bazı zincirler tek denemede kırılmaz.",
        },
      },
      {
        metin: "Şimdilik ertele.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Değişimi erteledin; belki başka bir gün.",
          detay: "Doğru an henüz gelmemiş olabilir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Erteleme içinde karanlık bir huzursuzluk bıraktı.",
          detay: "Ertelemenin de ağırlığı var.",
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
    metin: "Bu yıl yağmurlar gecikti, ekinler kavruldu. Bölgede kıtlık işaretleri görülüyor.",
    secenekler: [
      {
        metin: "Ambarındaki fazlayı komşularla paylaş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: -15,
          ahlak: 15,
          kriz_baslat: {
            tur: "kitlik",
            sureYil: 5,
          },
          mesaj: "Elindekini paylaştın; kıtlık başlıyor ama vicdanın rahat.",
          detay: "Zor günler geliyor, ama yalnız değilsin.",
        },
        basarisizSonuc: {
          para: -15,
          kriz_baslat: {
            tur: "kitlik",
            sureYil: 5,
          },
          mesaj: "Paylaşman yetmedi; kıtlık başlıyor.",
          detay: "Zor dönem kapıda.",
        },
      },
      {
        metin: "Ambarını koru, önce kendine bak.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: -10,
          kriz_baslat: {
            tur: "kitlik",
            sureYil: 5,
          },
          mesaj: "Payını korudun; kıtlık yine de bölgeyi sarıyor.",
          detay: "Bencilliğin seni biraz daha güvende tutacak.",
        },
        basarisizSonuc: {
          ahlak: -15,
          kriz_baslat: {
            tur: "kitlik",
            sureYil: 5,
          },
          mesaj: "Bencilliğin fark edildi, itibarın sarsıldı.",
          detay: "Zor zaman gerçek yüzü gösterir.",
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
    metin: "Vergilere ve yönetime öfke sokaklara taştı. Küçük gösteriler büyük isyanın habercisi olabilir.",
    secenekler: [
      {
        metin: "Göz yum, karışma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          kriz_baslat: {
            tur: "isyan",
            sureYil: 4,
          },
          mesaj: "Karışmadın; gerginlik büyüyüp isyana döndü.",
          detay: "Bazı fırtınalar durdurulamaz, beklenir.",
        },
        basarisizSonuc: {
          saglik: -10,
          kriz_baslat: {
            tur: "isyan",
            sureYil: 4,
          },
          mesaj: "Karışmasan da kaosun payını aldın.",
          detay: "Sokaklar artık güvenli değil.",
        },
      },
      {
        metin: "Yetkilileri uyar, önlem iste.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 15,
          mesaj: "Uyarın dikkate alındı; gerginlik bir süre yatıştı.",
          detay: "Felaket bu kez ertelendi.",
        },
        basarisizSonuc: {
          un: -5,
          kriz_baslat: {
            tur: "isyan",
            sureYil: 4,
          },
          mesaj: "Uyarın dinlenmedi; gerginlik isyana döndü.",
          detay: "Bazı uyarılar duyulmaz.",
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
    metin: "Bereketli hasat, yeni ticaret yolları ve huzurlu bir dönem bir araya geldi. Bölge refaha giriyor gibi.",
    secenekler: [
      {
        metin: "Bu bereketten payını al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 16,
          kriz_baslat: {
            tur: "altin_cag",
            sureYil: 5,
          },
          mesaj: "Bereketli döneme ortak oldun; bölge altın çağa giriyor.",
          detay: "Bazı dönemler herkese bolluk getirir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -25,
          kriz_baslat: {
            tur: "altin_cag",
            sureYil: 5,
          },
          mesaj: "Fırsatı tam değerlendiremesen de bölgede bolluk başlıyor.",
          detay: "Herkes aynı hızda faydalanamaz.",
        },
      },
      {
        metin: "Temkinli ol, bolluk geçici.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 6,
          kriz_baslat: {
            tur: "altin_cag",
            sureYil: 5,
          },
          mesaj: "Temkinli kalsan da bölge altın çağa giriyor.",
          detay: "Bazı iyi dönemler temkinsizliği hak eder.",
        },
        basarisizSonuc: {
          kriz_baslat: {
            tur: "altin_cag",
            sureYil: 5,
          },
          mesaj: "Temkinin seni bazı fırsatlardan alıkoydu.",
          detay: "Bolluğun tadını herkes aynı çıkaramaz.",
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
    metin: "Önemli bir müşteriyle anlaşmak üzereyken {rakip} çıkıp fiyatını senin yarına indirdiğini duyurdu. Müşteri tereddütte.",
    secenekler: [
      {
        metin: "Sen de düşür, savaşı kabul et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 2,
          para: 8,
          rakip_puani: -10,
          mesaj: "Müşteriyi tuttun ama kâr marjın {rakip} yüzünden eridi.",
          detay: "Savaşı kazandın ama pahalıya.",
        },
        basarisizSonuc: {
          para: -15,
          rakip_puani: -10,
          mesaj: "Fiyat savaşı seni yordu, müşteri yine {rakip}'e gitti.",
          detay: "Bazı savaşlar kaybedilmeye mahkûm.",
        },
      },
      {
        metin: "Fiyatı koru, kaliteyi öne çıkar.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -6,
          para: 16,
          un: 6,
          mesaj: "Müşteri kaliteni takdir etti, {rakip}'in ucuz oyununa itibar etmedi.",
          detay: "Fiyat değil, güven kazandırır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Müşteri ucuz fiyata kanıp {rakip}'e gitti.",
          detay: "Her müşteri kaliteyi önemsemez.",
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
    metin: "{rakip} seni küçük bir yasa dışılıktan muhafızlara ihbar etti; çoğu abartı, bazısı gerçek. Hesap vermelisin.",
    secenekler: [
      {
        metin: "Gerçeği açıkça anlat.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 10,
          rakip_puani: -10,
          mesaj: "Dürüstlüğün muhafızları ikna etti; {rakip}'in ihbarı boşa çıktı.",
          detay: "Gerçek çoğu zaman en iyi savunmadır.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Açıklaman yetmedi, küçük bir ceza ödedin.",
          detay: "Bazı ihbarlar tam boşa çıkmaz.",
        },
      },
      {
        metin: "Muhafızlara rüşvet ver.",
        baseBasariSansi: 65,
        maliyet: 20,
        basariliSonuc: {
          ahlak: -10,
          mesaj: "Rüşvet işe yaradı, mesele kapandı.",
          detay: "Parayla susar, vicdan bilir.",
        },
        basarisizSonuc: {
          ahlak: -15,
          para: -20,
          un: -15,
          mesaj: "Rüşvet teklifin fark edildi; para ve itibar kaybettin.",
          detay: "Her rüşvet gizli kalmaz.",
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
    metin: "Yol kenarında aç, bitkin bir yabancı gördün; savaştan ya da açlıktan kaçan bir mülteci. Yardım küçük masraf, ama vaktin kısıtlı.",
    secenekler: [
      {
        metin: "Yemek ver, bir gecelik barınak sağla.",
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
          mesaj: "Yabancıya yardım ettin; adını sormadan yoluna devam etti.",
          detay: "İyilik unutulsa da iz bırakır.",
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
          mesaj: "Yardımın beceriksizce oldu ama elini uzattın.",
          detay: "Niyet bazen icraattan çok söyler.",
        },
      },
      {
        metin: "Görmezden gel, yoluna devam et.",
        baseBasariSansi: 95,
        basariliSonuc: {
          etiket_ekle: [
            "kelebek_multeci_gordu",
          ],
          mesaj: "Görmezden gelip yoluna devam ettin.",
          detay: "Bazı anlar fark edilmeden geçer.",
        },
        basarisizSonuc: {
          ahlak: -5,
          etiket_ekle: [
            "kelebek_multeci_gordu",
          ],
          mesaj: "Görmezden gelmen içini rahatsız etti.",
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
    metin: "Yeni valinin tanışma töreninde, yıllar önce yardım ettiğin bitkin yabancı olduğunu fark ettin. O da seni tanıdı.",
    secenekler: [
      {
        metin: "Hatırlat, eski günlerden söz et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 40,
          un: 20,
          etiket_sil: [
            "kelebek:multeci_donus",
          ],
          mesaj: "Vali seni sıcak karşıladı; iyiliğin unutulmamış. Cömert bir karşılık verdi.",
          detay: "İyilik en beklenmedik anda döner.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -40,
          etiket_sil: [
            "kelebek:multeci_donus",
          ],
          mesaj: "Vali hatırladı ama kalabalık araya girdi, konuşma yarım kaldı.",
          detay: "Fırsat kaçtı, sıcak bir anı kaldı.",
        },
      },
      {
        metin: "Alçakgönüllü kal, bir şey isteme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 15,
          ahlak: 10,
          etiket_sil: [
            "kelebek:multeci_donus",
          ],
          mesaj: "Bir şey istemeden çekildin; vali bunu unutmadı, adın hayırla anıldı.",
          detay: "En iyi karşılık beklememektir.",
        },
        basarisizSonuc: {
          etiket_sil: [
            "kelebek:multeci_donus",
          ],
          mesaj: "Çekilmen fark bile edilmedi.",
          detay: "Her alçakgönüllülük görülmez, ama değerlidir.",
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
    metin: "Meyhanede tanıdığın bir dedikoducu, yaklaşan bir olay hakkında 'içeriden bilgi' sızdırabileceğini söylüyor; bir bedel karşılığı.",
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
          mesaj: "Dedikoducu sana sıradaki fırsat hakkında net bilgi verdi.",
          detay: "Artık kararını net bir tabloyla verirsin.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Dedikoducu parayı aldı ama bilgi işe yaramadı.",
          detay: "Her kaynak güvenilir değil.",
        },
      },
      {
        metin: "İlgilenme, sezgine güven.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Teklifi reddedip kendi sezgine güvendin.",
          detay: "En iyi rehber içgüdündür.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddettin ama sonra merak etmeden edemedin.",
          detay: "Merak peşini bırakmaz.",
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
    metin: "Bahçendeki kuyu neredeyse bitti. Hava karardı ama bu akşam son bir kazma daha vurmak istiyorsun.",
    secenekler: [
      {
        metin: "Karanlıkta da devam et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 10,
          mesaj: "Kuyuyu karanlıkta bitirdin; suyu bulman köyde konuşuldu.",
          detay: "Azmin ödüllendirildi.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Kendi Kazdığı Kuyuya Düşen",
          mesaj: "Karanlıkta ayağın kaydı, kendi kuyuna düştün.",
          detay: "Köy bunu yıllarca anlatacak.",
        },
      },
      {
        metin: "Sabahı bekle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kuyu ertesi gün güvenle bitti.",
          detay: "Sabır bazen en akıllıca seçim.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Bekleme canını sıktı ama güvenliydin.",
          detay: "Sabırsızlığın bedeli var.",
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
    metin: "İnatçı keçin ipini koparıp kasabaya daldı. Peşindesin; o ise seni pazarın en kalabalık yerine sürüklüyor.",
    secenekler: [
      {
        metin: "Son sürat kovala.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 6,
          un: 5,
          mesaj: "Keçiyi alkışlar eşliğinde yakaladın; kasaba günlerce konuştu.",
          detay: "Küçük ama unutulmaz zafer.",
        },
        basarisizSonuc: {
          olum: true,
          efsanevi_olum: "Keçi Kovalarken Kervan Arabasının Altında Kalan",
          mesaj: "Sokağa fırladın, hızlı bir kervan arabasının altında kaldın.",
          detay: "Kasaba bu gülünç sonu yıllarca anlatacak.",
        },
      },
      {
        metin: "Vazgeç, keçiyi bırak.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -5,
          mesaj: "Vazgeçtin; biri keçiyi bulup getirdi.",
          detay: "Bazen pes etmek işe yarar.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Keçiyi bir daha göremedin.",
          detay: "Küçük ama acı kayıp.",
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
    metin: "Papaz seni günah çıkarma odasına çağırdı. İçini dökmek rahatlatır, ama sırlar sızabilir.",
    secenekler: [
      {
        metin: "Her şeyi anlat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 15,
          mutluluk: 5,
          mesaj: "Yük kalktı; günlerdir ilk kez rahat uyudun.",
          detay: "Papaz sırrı mezara götürecek.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Papaz ağzından kaçırdı; sözün birkaç kişiye ulaştı.",
          detay: "Sırlar kürsüden bile sızar.",
        },
      },
      {
        metin: "Yüzeysel geç, asıl günahı sakla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Ayine katıldın ama asıl yük içinde kaldı.",
          detay: "Bazı şeyler kendine söylemekle bitmez.",
        },
        basarisizSonuc: {
          ahlak: -5,
          mesaj: "Papaz bir şey sakladığını sezip tuhaf baktı.",
          detay: "Yarım gerçek, yalandan rahatsız edicidir.",
        },
      },
      {
        metin: "Kendi günahın yerine papazın sırrını fısılda.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        basariliSonuc: {
          para: 45,
          ahlak: -20,
          mesaj: "Papazın şarap tüccarıyla kirli işini fısıldadın; sus payı sadaka kutusu oldu.",
          detay: "Kutsal yerde bile şeytanın avukatlığını yaptın.",
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -15,
          mesaj: "Papaz öfkeyle aforoz tehdidi savurdu; kiliseyi terk ettin.",
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
    metin: "Bir hac kervanı kutsal topraklara çıkıyor; masraflı ve tehlikeli ama manevi bir dönüşüm vaat ediyor.",
    secenekler: [
      {
        metin: "Kervana katıl.",
        baseBasariSansi: 65,
        maliyet: 15,
        basariliSonuc: {
          ahlak: 18,
          un: 6,
          mesaj: "Kutsal topraklara ulaştın; farklı bir insan olarak döndün.",
          detay: "Anlatırken sesin bile değişiyor.",
        },
        basarisizSonuc: {
          saglik: -10,
          para: -10,
          mesaj: "Yol seni hasta etti, yarı yolda döndün.",
          detay: "Bazı yolculuklar bitmeden de öğretir.",
        },
      },
      {
        metin: "Katılma, cemaatinde kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Evde kaldın; kervan sensiz gitti.",
          detay: "Belki başka yıl.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kervanın ardından hafif pişmanlık duydun.",
          detay: "Bazı fırsatlar bir daha gelmez.",
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
    metin: "Kilisedeki eski ikonanın mucizeler yarattığı söyleniyor. Önünde diz çöküp dilek tutmak yaygın.",
    secenekler: [
      {
        metin: "Diz çök, içtenlikle dua et.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: 4,
          ahlak: 5,
          mesaj: "Duanın huzuru günlerce sürdü.",
          detay: "Mucize gerçek mi bilmem, hissettiğin gerçekti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Huzuru bulamadın; içinde boşluk kaldı.",
          detay: "Bazen inanç bile yetmez.",
        },
      },
      {
        metin: "Geceyi bekle, adak altınlarını çal!",
        baseBasariSansi: 40,
        maxAhlak: 35,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 50,
          ahlak: -25,
          mesaj: "Altınları cübbene sakladın; kiliseden zengin çıktın.",
          detay: "Tanrı'nın parasını çaldın; vicdanın körleşti.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          un: -35,
          ahlak: -20,
          para: -15,
          etiket_ekle: [
            "itibar:aforoz_edildi",
          ],
          mesaj: "Papaz seni suçüstü yakaladı; rezil olup aforoz edildin.",
          detay: "Adın artık şeytanla anılıyor.",
        },
      },
      {
        metin: "Uzaktan izle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Törenin dışında kalıp kalabalığı izledin.",
          detay: "İnanç herkeste aynı değil.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Komşular mesafeni fark edip fısıldadı.",
          detay: "Cemaatte görünmemenin bedeli var.",
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
    metin: "Büyük perhiz başladı; et, süt, yumurta yasak. Komşun gizlice bir tabak et yemeye çağırıyor: 'Kimse görmez.'",
    secenekler: [
      {
        metin: "Daveti reddet, perhizi tut.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Perhizi tuttun; cemaat sana 'sağlam imanlı' demeye başladı.",
          detay: "Açlık bazen gurur meselesi.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddetmek zordu; açlık seni huysuzlaştırdı.",
          detay: "İrade bazen mideden zayıf.",
        },
      },
      {
        metin: "Gizlice git, et ye.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Kimse görmeden doydun; vicdanın sızladı ama tabak boştu.",
          detay: "Bazı günahlar lezzetli.",
        },
        basarisizSonuc: {
          un: -8,
          ahlak: -5,
          mesaj: "Papaz seni et yerken yakaladı; haber mahalleye yayıldı.",
          detay: "'Perhiz Bozan' lakabı peşini bırakmaz.",
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
    metin: "İmamın hutbesi bugün uzun; ön saftasın ve gözlerin ağırlaşıyor.",
    secenekler: [
      {
        metin: "Çimdikle, dikkatini topla.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 5,
          mesaj: "Sonuna dek dik oturdun; imam seni takdir etti.",
          detay: "Bazı zaferler uyanık kalmaktır.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Gözlerin birkaç saniye kapandı; galiba kimse fark etmedi.",
          detay: "Uyku iradeden güçlü olabilir.",
        },
      },
      {
        metin: "Bırak, gözlerin kapansın.",
        baseBasariSansi: 40,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Kısa bir şekerleme çektin; kimse fark etmedi.",
          detay: "Bazen risk kazandırır.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Horlaman camiyi çınlattı; herkes sana baktı.",
          detay: "Mahalle bunu uzun anlatır.",
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
    metin: "Yıllık zekat vakti geldi. Birikimden ihtiyaç sahiplerine ayırmak hem dini görev hem vicdan meselesi.",
    secenekler: [
      {
        metin: "Cömertçe ver, hesap yapma.",
        baseBasariSansi: 90,
        maliyet: 12,
        basariliSonuc: {
          para: -12,
          ahlak: 12,
          un: 6,
          mesaj: "Verdiğin, bir ailenin kışı geçirmesine yetti.",
          detay: "Bilinmeyen iyilik de ısıtır.",
        },
        basarisizSonuc: {
          para: -12,
          ahlak: 8,
          mesaj: "Verdin ama parayı kimin aldığını öğrenemedin.",
          detay: "Bazı iyilikler karşılıksız kalır.",
        },
      },
      {
        metin: "Asgariyi ver, gerisini sakla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Görevini yaptın, fazlasına dokunmadın.",
          detay: "Kurala uydun, bu kadarı yeter dedin.",
        },
        basarisizSonuc: {
          ahlak: -4,
          mesaj: "Komşular ne az verdiğini fark edip konuştu.",
          detay: "Cömertlik bazen gösterişe döner.",
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
    metin: "Pazar ayininden sonra cemaat çay içip birbirinin işine burnunu sokuyor. Bu hafta konu sensin.",
    secenekler: [
      {
        metin: "Sohbete katıl, kendini savun.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 6,
          dost_puani: 5,
          mesaj: "Şakayla durumu çevirdin; herkes gülüp konuyu kapattı.",
          detay: "İngiliz nezaketinin ardında keskin espri yatar.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Savunman ters tepti, dedikodu büyüdü.",
          detay: "Bazı fincanlar hayatı zorlaştırır.",
        },
      },
      {
        metin: "Sessizce çayını iç.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sessizce çayını bitirdin; dedikodu söndü.",
          detay: "Bazen en iyi cevap sessizliktir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sessizliğin 'suçunu kabul ediyor' gibi göründü.",
          detay: "Kilise çayı bazen mahkemedir.",
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
    metin: "Bölge piskoposu ayine gelecek; iyi izlenim bırakmak çevrende kapılar açabilir.",
    secenekler: [
      {
        metin: "Özenle hazırlan, piskoposla tanış.",
        baseBasariSansi: 60,
        maliyet: 5,
        basariliSonuc: {
          un: 12,
          dost_puani: 4,
          mesaj: "Piskopos seninle kısa, sıcak sohbet etti; adın duyulmaya başladı.",
          detay: "Küçük anlar büyük kapı açar.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Hazırlığın boşa gitti; piskopos fark etmedi.",
          detay: "Bazı yatırımlar karşılıksız.",
        },
      },
      {
        metin: "Kalabalığa karış.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sıradan bir cemaat üyesi olarak katıldın.",
          detay: "Her fırsatın peşinden koşmak şart değil.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Başkalarının piskoposla tanışmasına hafif kıskandın.",
          detay: "Kaçan fırsat daha çok akılda kalır.",
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
    metin: "Devriyede küçük bir eşkıya grubuna rastladınız; kısa çatışmadan sonra ganimet paylaşılıyor.",
    secenekler: [
      {
        metin: "Çatışmaya cesurca katıl.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: -6,
          para: 14,
          un: 2,
          mesaj: "Payınla cebin şişti; komutan da seni fark etti.",
          detay: "Küçük zaferler de sayılır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -14,
          saglik: -6,
          mesaj: "Sıyrık aldın, ganimetten pek pay düşmedi.",
          detay: "Her baskın kazançlı değil.",
        },
      },
      {
        metin: "Geride dur, gözcülük yap.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 5,
          mesaj: "Gözcülüğü iyi yaptın; sana da küçük pay ayrıldı.",
          detay: "Hep ön safta olmak şart değil.",
        },
        basarisizSonuc: {
          mesaj: "Geride kalman bazı yoldaşlara hoş gelmedi.",
          detay: "Bazı seçimler sessizce yargılanır.",
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
    metin: "Geçen ay derdini dinlediğin bir cemaat üyesi, minnetiyle küçük bir hediye getirdi.",
    secenekler: [
      {
        metin: "Hediyeyi memnuniyetle kabul et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 8,
          mutluluk: 3,
          mesaj: "Hediye, emeğinin karşılığı gibi geldi.",
          detay: "En küçük jest bazen en değerlisi.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Hediye mütevazıydı ama düşünce güzeldi.",
          detay: "Büyük olması şart değil.",
        },
      },
      {
        metin: "Nazikçe reddet: karşılıksız yardımdı.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 6,
          un: 3,
          mesaj: "Reddin cemaatte yayıldı; alçakgönüllülükle anıldın.",
          detay: "Bazı itibar parayla alınmaz.",
        },
        basarisizSonuc: {
          mesaj: "Reddin tuhaf karşılandı; ziyaretçi mahcup gitti.",
          detay: "İyi niyet de yanlış anlaşılır.",
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
    metin: "Şehrin savunma bütçesini kimin yöneteceği seçiliyor; rakip bir general de talip. Kazanırsan ekonomide de sözün olur.",
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
          mesaj: "Rakip generali geçtin; savunma bütçesinin bir kısmı artık sende.",
          detay: "Kumandanlık son değil, yeni yarışın başı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          un: -5,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Rakip general kazandı ama yarış bitmedi; adın artık biliniyor.",
          detay: "İlk deneme başarısız, ama artık oyundasın.",
        },
      },
      {
        metin: "Reddet, kumandanlıkla yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi reddedip mevcut konumunla yetindin.",
          detay: "Belki bir gün fikrin değişir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Biraz pişman oldun; rakip general koltuğu sensiz aldı.",
          detay: "Bazı fırsatlar aynı gelmez.",
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
    metin: "Ticaret konseyinde koltuk boşaldı; rakip tüccar da talip. Kazanırsan şehir ekonomisinde söz sahibi olursun.",
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
          mesaj: "Rakip tüccarı geçtin; ticaret konseyinde artık sözün var.",
          detay: "Lonca ustalığı son değil, yeni yarışın başı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -5,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Rakip tüccar kazandı ama yarış bitmedi; adın konseyde biliniyor.",
          detay: "İlk deneme başarısız, ama artık oyundasın.",
        },
      },
      {
        metin: "Reddet, işinle yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi reddedip mevcut konumunla yetindin.",
          detay: "Belki bir gün fikrin değişir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Biraz pişman oldun; rakip tüccar koltuğu sensiz aldı.",
          detay: "Bazı fırsatlar aynı gelmez.",
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
    metin: "Şehrin büyük vakıflarını kimin yöneteceği tartışılıyor; rakip bir rahip de talip. Kazanırsan şehir ekonomisinde de sözün olur.",
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
          mesaj: "Rakip rahibi geçtin; büyük vakıflarda artık sözün var.",
          detay: "Başrahiplik son değil, yeni yarışın başı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -30,
          ahlak: -5,
          un: -5,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Rakip rahip kazandı ama yarış bitmedi; adın meclis içinde biliniyor.",
          detay: "İlk deneme başarısız, ama artık oyundasın.",
        },
      },
      {
        metin: "Reddet, kürsünle yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi reddedip mevcut konumunla yetindin.",
          detay: "Belki bir gün fikrin değişir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Biraz pişman oldun; rakip rahip makamı sensiz aldı.",
          detay: "Bazı fırsatlar aynı gelmez.",
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
    metin: "Zanaat şurasında koltuk boşaldı; rakip bir usta da talip. Kazanırsan şehrin zanaat düzeninde söz sahibi olursun.",
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
          mesaj: "Rakip ustayı geçtin; zanaat şurasında artık sözün var.",
          detay: "Ustalık son değil, yeni yarışın başı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          un: -5,
          etiket_ekle: [
            "sehir_yonetimi_basladi",
          ],
          mesaj: "Rakip usta kazandı ama yarış bitmedi; adın şurada biliniyor.",
          detay: "İlk deneme başarısız, ama artık oyundasın.",
        },
      },
      {
        metin: "Reddet, atölyenle yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi reddedip mevcut konumunla yetindin.",
          detay: "Belki bir gün fikrin değişir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Biraz pişman oldun; rakip usta koltuğu sensiz aldı.",
          detay: "Bazı fırsatlar aynı gelmez.",
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
    metin: "Şehrin savunma bütçesi yeniden paylaşılıyor; rakip general payını büyütmek için uğraşıyor.",
    secenekler: [
      {
        metin: "Konseyde payın için savaş.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 30,
          un: 10,
          mesaj: "Bütçenin büyük kısmını kendi birliklerine aktardın.",
          detay: "General seni izleyecek ama bu turu kazandın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Bu tur rakip general kazandı; payın küçüldü.",
          detay: "Yarış bitmedi.",
        },
      },
      {
        metin: "Generalin sırlarıyla şantaj yap.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          sehir_yonetim_artis: 2,
          para: 40,
          un: 15,
          ahlak: -20,
          mesaj: "Generali zayıf noktasından sıkıştırdın; bütçenin neredeyse tamamı sana geçti.",
          detay: "Siyaset kılıçtan keskindir.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          saglik: -30,
          un: -15,
          olum_sansi: 5,
          mesaj: "Şantaj ters tepti! General pusu kurdurup seni dövdürdü; bütçeyi kaybettin.",
        },
      },
      {
        metin: "Geri çekil, güç biriktir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu sefer geri planda kaldın.",
          detay: "Sabır bazen en iyi strateji.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Geri çekilmen bazı yandaşları hayal kırıklığına uğrattı.",
          detay: "Hep izlemek zorunda değilsin.",
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
    metin: "Sınır ticaret yollarını güvenceye alacak kampanyanın liderliği tartışılıyor; hem askeri hem ekonomik zafer demek.",
    secenekler: [
      {
        metin: "Kampanyanın liderliğini üstlen.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 35,
          un: 10,
          mesaj: "Kampanya başarılı; sınır ticaret yolları artık senin gözetiminde.",
          detay: "Ekonomideki payın büyüyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          saglik: -8,
          para: -10,
          mesaj: "Kampanya zorlu geçti, kayıplarla döndün.",
          detay: "Bir sonraki fırsat için güç topla.",
        },
      },
      {
        metin: "Başkasına bırak, riske girme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Liderliği başkasına bıraktın.",
          detay: "Her savaşı kazanmak zorunda değilsin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kampanyanın başarısını uzaktan izlerken hafif pişmanlık duydun.",
          detay: "Bazı fırsatlar bir daha gelmez.",
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
    metin: "Yeni ticaret yolunun imtiyazı için konseyde oylama var; rakip tüccar da talip.",
    secenekler: [
      {
        metin: "İmtiyaz için sert lobi yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 45,
          un: 10,
          mesaj: "İmtiyazı aldın; yeni yol artık senin kervanlarınla işliyor.",
          detay: "Ekonomideki payın büyüyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "İmtiyazı rakip tüccar kazandı; emeğin boşa gitti.",
          detay: "Yarış bitmedi.",
        },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu imtiyaza girmedin.",
          detay: "Her fırsatın peşinden koşmak şart değil.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Rakibin kazandığını duyunca içerledin.",
          detay: "Bazı fırsatlar bir daha gelmez.",
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
    metin: "Pazar vergilerini toplama imtiyazı yeniden ihaleye çıktı; rakip tüccar da teklif hazırlıyor.",
    secenekler: [
      {
        metin: "Yüksek teklif ver, imtiyazı kap.",
        baseBasariSansi: 55,
        maliyet: 20,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 50,
          un: 12,
          mesaj: "İhaleyi kazandın; pazar vergisi artık kısmen senin elinde.",
          detay: "Ekonomideki payın büyüyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "İhaleyi rakip tüccar kazandı; teklifin boşa gitti.",
          detay: "Yarış bitmedi.",
        },
      },
      {
        metin: "Vergiyi zorbalıkla toplamayı öner.",
        baseBasariSansi: 40,
        maxAhlak: 35,
        basariliSonuc: {
          sehir_yonetim_artis: 2,
          para: 70,
          ahlak: -30,
          un: -15,
          mesaj: "Konsey gizlice onayladı; vergileri sopalı adamlarınla acımasızca topladın.",
          detay: "Halk nefret ediyor, kasan ağzına kadar dolu.",
        },
        basarisizSonuc: {
          para: -30,
          un: -25,
          mesaj: "Konsey bu kadarına cesaret edemedi, seni ihaleden çıkardı.",
        },
      },
      {
        metin: "İhaleye girme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu ihaleye girmedin.",
          detay: "Her fırsatın peşinden koşmak şart değil.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Rakibin kazandığını duyunca içerledin.",
          detay: "Bazı fırsatlar bir daha gelmez.",
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
    metin: "Şehrin en büyük dini vakfının yönetiminde koltuk boşaldı; rakip rahip de talip.",
    secenekler: [
      {
        metin: "Koltuk için mücadele et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 35,
          un: 12,
          mesaj: "Koltuğu kazandın; vakıf kaynakları kısmen senin gözetiminde.",
          detay: "Ekonomideki payın büyüyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -35,
          ahlak: -5,
          mesaj: "Koltuğu rakip rahip kazandı; emeğin boşa gitti.",
          detay: "Yarış bitmedi.",
        },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu koltuğa girmedin.",
          detay: "Her fırsatın peşinden koşmak şart değil.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Rakibin kazandığını duyunca içerledin.",
          detay: "Bazı fırsatlar bir daha gelmez.",
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
    metin: "Şehre gelen kutsal emanetin koruyuculuğu tartışılıyor; büyük nüfuz ve büyük gelir demek. Rakip rahip de istiyor.",
    secenekler: [
      {
        metin: "Koruyuculuk için öne çık.",
        baseBasariSansi: 55,
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 40,
          un: 15,
          mesaj: "Koruyuculuk sana verildi; hacılar kürsüne akın ediyor.",
          detay: "Ekonomideki payın büyüyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -40,
          un: -5,
          mesaj: "Unvan rakip rahibe verildi; emeğin boşa gitti.",
          detay: "Yarış bitmedi.",
        },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bu unvana talip olmadın.",
          detay: "Her fırsatın peşinden koşmak şart değil.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Rakibin kazandığını duyunca içerledin.",
          detay: "Bazı fırsatlar bir daha gelmez.",
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
    metin: "Bir haberci kapına dayandı: şöhretin krala ulaşmış. Bizzat saraya davetlisin.",
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
          mesaj: "Kralın huzuruna çıktın; saray çevresinde saygıyla anılıyorsun.",
          detay: "Ömür boyu anlatılacak bir an.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          mesaj: "Heyecandan sözlerin karıştı ama saraya kabul edildin.",
          detay: "Mükemmel değil, ama unutulmaz.",
        },
      },
      {
        metin: "Naçizane reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          un: 5,
          mesaj: "Daveti nazikçe reddettin; kimse üstelemedi.",
          detay: "Sıradan hayatı seçtin.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin sarayda 'küstahlık' sayıldı; adın bir süre kötü anıldı.",
          detay: "Krala hayır demenin bedeli var.",
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
    metin: "Nüfuzlu bir soylu, bir rakibi krala kötülemen için senden yardım istiyor. Karşılığında büyük iyilik vaat ediyor.",
    secenekler: [
      {
        metin: "Entrikaya katıl.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 25,
          un: 8,
          ahlak: -12,
          mesaj: "Plan tuttu; soylu sana borçlu, rakip gözden düştü.",
          detay: "Sarayda güç böyle kazanılır.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -8,
          mesaj: "Entrika ortaya çıktı, parmağın anlaşıldı; itibarın zedelendi.",
          detay: "Saray entrikası herkesi yakar.",
        },
      },
      {
        metin: "Nazikçe reddet, uzak dur.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Teklifi reddettin; ellerin temiz kaldı.",
          detay: "Herkes entrikaya bulaşmak zorunda değil.",
        },
        basarisizSonuc: {
          mesaj: "Reddin soylunun hoşuna gitmedi; sana soğuk davranıyor.",
          detay: "Bazı reddin bedeli sessizce ödenir.",
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
    metin: "Sarayın görkemli balolarından birine davetlisin. İyi izlenim seni saray çevresinde bir adım öne taşıyabilir.",
    secenekler: [
      {
        metin: "Ortaya çık, herkesle tanış.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 19,
          dost_puani: 6,
          mesaj: "Zarafetin ve sohbetin salonda konuşuldu; herkes seninle tanışmak istedi.",
          detay: "Bir gecede saraya tanındın.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Sakar bir anın herkesin önünde oldu; bir süre alay edildi.",
          detay: "Sarayda küçük hata büyük yankı bulur.",
        },
      },
      {
        metin: "Kenarda dur.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          un: 6,
          mesaj: "Baloyu kenardan izledin.",
          detay: "Her gece parlamak şart değil.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kenarda kalman fark edildi; 'sıkıcı' denildin.",
          detay: "Görünmemenin de bedeli var.",
        },
      },
      {
        metin: "Yabancı elçilerle kendi dillerinde konuş.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 6,
          dost_puani: 8,
          mesaj: "Elçilerle kendi dillerinde ve gelenekleriyle konuştun; salon hayran kaldı.",
          detay: "Yıllarca kurduğun bağlar tam bu gece işe yaradı.",
        },
        basarisizSonuc: {
          un: 10,
          mesaj: "Sohbet pek akmadı ama elçiler seni saygıyla dinledi.",
          detay: "Bağların kusursuz olmasa da fark edilir.",
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
    metin: "Bir hizmetkârdan sarayın güçlü ailelerinden birinin gizli ilişkisini öğrendin. Bilgi hem tehlikeli hem değerli.",
    secenekler: [
      {
        metin: "Bilgiyi doğru kişiye satıp kazan.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 35,
          ahlak: -10,
          mesaj: "Bilgiye güzel ödül aldın; kimse şüphelenmedi.",
          detay: "Sarayda sır ticareti hep vardı.",
        },
        basarisizSonuc: {
          un: -12,
          ahlak: -8,
          mesaj: "Kaynağın belli oldu; kimse yanında rahat konuşmuyor.",
          detay: "Kırılan güven zor onarılır.",
        },
      },
      {
        metin: "Kimseye söyleme, unutmaya çalış.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 4,
          mesaj: "Duyduğunu unutmaya karar verdin; kimseye söylemedin.",
          detay: "Bazı sırlar taşımaya değmez.",
        },
        basarisizSonuc: {
          mesaj: "Sırrı sakladın ama merakın seni bir süre rahatsız etti.",
          detay: "Bilmek bazen yüktür.",
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
    metin: "Kral, saray erkanıyla büyük ava çıkıyor ve seni de çağırıyor. Prestijli ama tehlikesiz değil.",
    secenekler: [
      {
        metin: "Ava katıl, riski göze al.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 12,
          para: 10,
          mesaj: "Avdaki cesaretin kralın dikkatini çekti; ganimetten pay aldın.",
          detay: "Kral seni yine çağıracağını söyledi.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Avda kötü bir kaza geçirdin; herkesin önünde utandın.",
          detay: "Bazı avlar plana uymaz.",
        },
      },
      {
        metin: "Nazikçe mazeret sun.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Mazeretin kabul edildi; güvenli bir gün geçirdin.",
          detay: "Her davete koşmak şart değil.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Katılmadığın için bazı çevrelerce dışlandın.",
          detay: "Sarayda arkadan konuşmak kolay.",
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
    metin: "Kulak misafiri olduğun bir konuşmadan krala karşı komplo hazırlandığını anladın. Bu bilgiyle ne yapacağını dikkatle seç.",
    secenekler: [
      {
        metin: "Krala veya muhafızlara bildir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 20,
          ahlak: 10,
          mesaj: "İhbarın doğru çıktı; kralın canını kurtaran kişi diye anıldın.",
          detay: "Sarayda söylenecek en büyük söz bu.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Duyumun asılsız çıktı; boşuna panik yarattığın için küçük düştün.",
          detay: "Bazı sesler yanlış anlaşılır.",
        },
      },
      {
        metin: "Karışma, sessiz kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kimseye söylemedin; olay sen karışmadan çözüldü ya da hiç olmadı.",
          detay: "Bazen bilmemek rahattır.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mesaj: "Komplo gerçekleşti; sessizliğin içini uzun süre kemirdi.",
          detay: "Sessizliğin bedelini şimdi anlıyorsun.",
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
    metin: "Büyük saray şölenin telaşlı bir hizmetkâr üzerine sıcak çorba döktü. Bütün salon sana bakıyor.",
    secenekler: [
      {
        metin: "Gülüp geç, ortamı yumuşat.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 4,
          mutluluk: 3,
          mesaj: "Kendine gülüp şakaya çevirdin; salon soğukkanlılığını konuştu.",
          detay: "İzlenimi kusursuzluk değil zarafet bırakır.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Gülümsemen zoraki kaldı; birkaç kişi fısıldadı.",
          detay: "Her kaza şakaya dönüşmez.",
        },
      },
      {
        metin: "Öfkelen, hizmetkârı azarla.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 7,
          mesaj: "Öfken haklı bulundu; hizmetkâr özür diledi.",
          detay: "Bazıları seni haklı buldu.",
        },
        basarisizSonuc: {
          un: -10,
          ahlak: -5,
          mesaj: "Sert tepkin 'zalim' diye anıldı; bazıları uzaklaştı.",
          detay: "Küçük kaza, büyük itibar lekesi oldu.",
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
    metin: "Şehirden büyük bir ticaret kervanı uzak diyarlara çıkıyor. Katılmak hem tehlikeli hem büyük fırsat.",
    secenekler: [
      {
        metin: "Kervana katıl.",
        baseBasariSansi: 80,
        maliyet: 10,
        basariliSonuc: {
          etiket_ekle: [
            "kervan:katildi",
            "kervan_karari_verildi",
          ],
          para: -6,
          mesaj: "Malını denk yapıp katıldın; önünde aylarca tozlu yol var.",
          detay: "Yolculuk ya zenginleştirir ya çok şey öğretir.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "kervan:katildi",
            "kervan_karari_verildi",
          ],
          para: -10,
          mesaj: "Hazırlığın acele oldu ama yine de katıldın.",
          detay: "Hazırlıksız çıkmanın bedelini ödeyeceksin.",
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
          mesaj: "Şehirde kaldın; kervan sensiz gitti.",
          detay: "Belki başka kervan gelir.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "kervan:katilmadi",
            "kervan_karari_verildi",
          ],
          mutluluk: -2,
          mesaj: "Kervanın tozunu izlerken pişmanlık duydun.",
          detay: "Bazı fırsatlar aynı gelmez.",
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
    metin: "Kervan ıssız bir geçitte eşkıya pususuna düştü. Kervan başı herkesin savunmaya katılmasını istiyor.",
    secenekler: [
      {
        metin: "Malını savun, karşı koy.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: -8,
          para: 20,
          un: 3,
          mesaj: "Kervan eşkıyaları püskürttü; ganimetten payınla zenginleştin.",
          detay: "Geçit artık cesaretinle anılıyor.",
        },
        basarisizSonuc: {
          para: -30,
          saglik: -12,
          mesaj: "Eşkıya malının çoğunu aldı, yaralı kurtuldun.",
          detay: "Yolculuk sandığından pahalıya geldi.",
        },
      },
      {
        metin: "Malı bırak, canını kurtar.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: -20,
          mesaj: "Malın bir kısmını bırakıp çekildin; en azından sağsın.",
          detay: "Kaybı kabullenmek bazen akıllıcadır.",
        },
        basarisizSonuc: {
          para: -35,
          mutluluk: -3,
          mesaj: "Çekilmene rağmen eşkıya neredeyse her şeyini aldı.",
          detay: "Bazı kayıplar önlenemez.",
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
    metin: "Kervan hiç görmediğin bir şehrin pazarına vardı. Baharat, ipek ve yabancı diller her yanda.",
    secenekler: [
      {
        metin: "Cesurca pazarlık et, büyük alışveriş yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -11,
          para: 40,
          un: 4,
          mesaj: "Anlaşma inanılmaz kârlı çıktı; dönünce herkes konuşacak.",
          detay: "Bu bağlantı yeni kapılar açacak.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Yerel tüccarlar seni kandırdı; anlaşma umduğun gibi çıkmadı.",
          detay: "Yabancı pazarda acemilik pahalıya patlar.",
        },
      },
      {
        metin: "Temkinli ol, küçük işler yap.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 12,
          mesaj: "Küçük ama güvenli kazançla yetindin.",
          detay: "Az ama garanti, çoktan iyidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -12,
          mesaj: "Kayda değer kazanç yok, ama zarar da etmedin.",
          detay: "Her yolculuk kâr getirmez.",
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
    metin: "Kervan aylar sonra döndü; katılanlar zenginleşmiş, egzotik hikâyelerle gelmiş. Sen şehirde kaldın.",
    secenekler: [
      {
        metin: "Hikâyeleri dinle, sonraki kervana hazırlan.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Hikâyeler seni sonraki fırsata daha istekli yaptı.",
          detay: "Belki bir dahaki sefere sen de katılırsın.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Kaçırdığın fırsat seni hüzünlendirdi.",
          detay: "Bazı pişmanlıklar içe işler.",
        },
      },
      {
        metin: "Umursama, güvenli hayatınla yetin.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Güvenli hayatının kıymetini bildin; herkes risk almak zorunda değil.",
          detay: "Huzur da bir zenginlik.",
        },
        basarisizSonuc: {
          mesaj: "Umursamamaya çalışsan da içten içe merak ettin.",
          detay: "Bazı meraklar geçmez.",
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
    metin: "İşçiler uzun saatlere ve düşük ücretlere karşı greve gitti. Fabrika kapısındaki kalabalık senden de taraf seçmeni bekliyor.",
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
          mesaj: "İşçilerle omuz omuza durup kapıda 'Adalet!' diye bağırdın.",
          detay: "Artık işçi hareketinin parçasısın.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "grev:destekledi",
            "grev_karari_verildi",
          ],
          saglik: -5,
          mesaj: "Greve katıldın ama kalabalıkta itilip kakıldın.",
          detay: "Dayanışma hep kolay olmaz.",
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
          mesaj: "Tezgâhının başına geçtin; iş ekmek kapısı, risk almak istemedin.",
          detay: "Patronun gözünde ayrıcalıklı olacaksın.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "grev:karsi_cikti",
            "grev_karari_verildi",
          ],
          dost_puani: -5,
          mesaj: "İçeri girerken birkaç grevci sana 'hain' diye bağırdı.",
          detay: "Bu seçimin bedeli olacak gibi.",
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
    metin: "Grev üçüncü haftasında; fabrika sahibi jandarma çağırdı. Kalabalık dağılmıyor, gerginlik tırmanıyor.",
    secenekler: [
      {
        metin: "Geri çekil, kalabalığın arkasına geç.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mesaj: "Geri çekildin; grev sensiz sürdü.",
          detay: "Her mücadelede ön safta olmak şart değil.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Kalabalık dağılırken itişmede sıyrık aldın.",
          detay: "Kargaşa kimseyi tam korumaz.",
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
          metin: "Atlı jandarma saldırdı! Kaçar mısın, durur musun?",
          geriCekilMetni: "Kaç! Ölmeye gelmedim.",
          geriCekilSonucu: {
            saglik: -5,
            un: -10,
            ahlak: -10,
            mesaj: "Cop inmeden kaçtın. Canını kurtardın ama işçilerin gözünde korkaksın.",
            detay: "Kahramanlık hevesi jandarmayı görene kadardır.",
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
            mesaj: "Coplar altında bile geri adım atmadın; işçi sınıfının sembolü oldun.",
            detay: "Beden yıkıldı, ruh devleşti.",
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
    metin: "Uzun direnişten sonra patron işçi temsilcileriyle görüşmeyi kabul etti. Talepler masada.",
    secenekler: [
      {
        metin: "Temsilcilerle birlikte ısrarcı ol.",
        baseBasariSansi: 55,
        basariliSonuc: {
          maas_carpani: 1.1,
          un: 10,
          mesaj: "Patron geri adım attı; ücret ve saatler iyileşti, sen de kazandın.",
          detay: "Direnişin karşılığını aldınız.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          mesaj: "Patron hiçbir şey vermedi; haftalar süren grev boşa gitti.",
          detay: "Her mücadele kazanımla bitmez.",
        },
      },
      {
        metin: "Uzlaş, orta yolu kabul et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: -6,
          un: -2,
          para: 15,
          mesaj: "Küçük ücret iyileştirmesiyle anlaştınız; herkes işe döndü.",
          detay: "İstediğin değildi ama kazanımdı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Uzlaşma teklifin bile reddedildi; herkes eli boş döndü.",
          detay: "Bazı patronlar hiçbir şeye razı olmaz.",
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
    metin: "Grevde işbaşında kalman patronun dikkatini çekti; seni ödüllendirmek istiyor.",
    secenekler: [
      {
        metin: "Terfiyi kabul et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          maas_carpani: 1.12,
          mesaj: "Küçük bir ustabaşılık aldın; maaşın kalıcı arttı.",
          detay: "Eski iş arkadaşların artık soğuk.",
        },
        basarisizSonuc: {
          para: 10,
          dost_puani: -5,
          mesaj: "Küçük ikramiye aldın ama işçiler fark etti.",
          detay: "Patronun gözdesi olmanın bedeli var.",
        },
      },
      {
        metin: "Nazikçe reddet, işçi kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 5,
          mesaj: "Teklifi kibarca reddettin; iş arkadaşların takdir etti.",
          detay: "Bazı fırsatlar kabule değmez.",
        },
        basarisizSonuc: {
          mesaj: "Reddin patronu şaşırttı ama teklifi tekrarlamadı.",
          detay: "Bazı kapılar bir kez açılır.",
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
    metin: "Öğle molasında kimse seninle göz göze gelmedi; grevde işbaşında kalman hâlâ unutulmadı.",
    secenekler: [
      {
        metin: "Açıkça konuş, aranı düzelt.",
        baseBasariSansi: 45,
        basariliSonuc: {
          dost_puani: 10,
          mesaj: "İçtenlikle konuştun; bazıları anlayış gösterdi, buzlar eridi.",
          detay: "Dürüstlük en iyi köprüdür.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Konuşman gerginliği artırdı.",
          detay: "Bazı kırgınlık sözle onarılmaz.",
        },
      },
      {
        metin: "Aldırma, yemeğini yalnız ye.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yalnız yemeye alıştın; zamanla normal geldi.",
          detay: "Bazı bedeller sessizce ödenir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Yalnızlık gittikçe daha çok sıkıyor.",
          detay: "İnsan uzun süre yalnız kalamaz.",
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
    metin: "Tanıdığın bir mucit, buhar gücüyle çalışan yeni makine için ortak arıyor. Azıcık paranla yatırım yapabilirsin.",
    secenekler: [
      {
        metin: "Yatırım yap, mucide güven.",
        baseBasariSansi: 45,
        maliyet: 30,
        basariliSonuc: {
          mutluluk: -11,
          para: 80,
          un: 5,
          mesaj: "Makine çalıştı; fabrikalar sipariş verdi, yatırımın kat kat döndü.",
          detay: "Bu buluşun parçası olmak seni tarihe geçirdi.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -30,
          mesaj: "Makine düzgün çalışmadı; mucit projeyi bıraktı.",
          detay: "Her icat başarıya ulaşmaz.",
        },
      },
      {
        metin: "Riske girme, paranı koru.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi reddettin; paranı korudun.",
          detay: "Bazı fırsatlara güvenmemek akıllıca.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Makine çalışınca hafif pişmanlık duydun.",
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
    metin: "İşindeki tekrarlayan bir zorluğu çözmek için basit ama akıllı bir düzenek tasarladın. İşe yarar mı, kimse umursar mı?",
    secenekler: [
      {
        metin: "Fikri patronuna/loncana sun.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: -6,
          para: 15,
          un: 3,
          mesaj: "Düzenek işe yaradı; 'akıllı biri' diye anılmaya başladın.",
          detay: "Küçük fikir bazen büyük fark yaratır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -3,
          mesaj: "Fikrin 'saçma' bulundu; biraz alay konusu oldun.",
          detay: "Her fikir takdir görmez.",
        },
      },
      {
        metin: "Kendine sakla, kendi işinde kullan.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Düzenek işini kolaylaştırdı; kimseyle paylaşmadın.",
          detay: "Bazı fikirler sana ait kalabilir.",
        },
        basarisizSonuc: {
          mesaj: "Düzenek pek işe yaramadı; vazgeçtin.",
          detay: "Her fikir kusursuz işlemez.",
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
    metin: "Yıllar önce pazarda yakaladığın 'Şeytani Keçi' kasabaya döndü. Kin dolu gözlerle sana bakıp toynak vuruyor: rövanş istiyor!",
    secenekler: [
      {
        metin: "Meydan okumayı kabul et!",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 30,
          mutluluk: 12,
          unvan_kazan: "Efsanevi Keçi Fatihi",
          mesaj: "Toz dağılınca keçi pes etmişti! Kalabalık seni çılgınca alkışlıyor.",
          detay: "Tarih bu saçma ama muazzam zaferi yazacak.",
        },
        basarisizSonuc: {
          un: -15,
          saglik: -10,
          mutluluk: -15,
          mesaj: "Keçi dövüş sanatı öğrenmiş! Seni boynuzlayıp çamura fırlattı ve zaferle meledi.",
          detay: "Unvanını kaybettin; yeni kral o.",
        },
      },
      {
        metin: "Kaç! Bu keçi eskisi gibi değil!",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: -20,
          mutluluk: -5,
          mesaj: "Çığlık çığlığa dükkâna kaçıp kapıyı kilitledin.",
          detay: "Fatih unvanın çizildi ama kemiklerin sağlam.",
        },
        basarisizSonuc: {
          un: -20,
          saglik: -8,
          mutluluk: -10,
          mesaj: "Kapıya iki adım kala keçi seni toslayıp çamura yatırdı; herkes güldü.",
          detay: "Kaçmak da beceri ister.",
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
    metin: "{amir}, kendi hatasını örtmek için masum birini suçlamanı istiyor. İtaat edersen terfi sözü var, etmezsen misillemeden korkuyorsun.",
    secenekler: [
      {
        metin: "Emri uygula, sessiz kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 15,
          un: 8,
          ahlak: -20,
          mesaj: "Emri uyguladın; {amir} memnun, masum biri bedel ödedi ama sicilin temiz.",
          detay: "Bazı terfiler başkasının sırtından gelir.",
        },
        basarisizSonuc: {
          ahlak: -20,
          un: -10,
          mesaj: "Yalanın ortaya çıktı; hem vicdan azabı hem itibar kaybı yaşadın.",
          detay: "Kirli iş nadiren temiz kalır.",
        },
      },
      {
        metin: "Emri reddet, gerçeği söyle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 22,
          dost_puani: 10,
          mesaj: "Gerçeği söyledin; masum aklandı, {amir} kin besledi ama vicdanın rahat.",
          detay: "Bazı zaferler terfiden değerlidir.",
        },
        basarisizSonuc: {
          para: -15,
          un: -15,
          ahlak: 15,
          mesaj: "{amir} seni 'itaatsizlik'ten cezalandırdı; kariyerin durdu, vicdanın temiz.",
          detay: "Doğrunun bedelini ödedin.",
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
    metin: "{ekip} ciddi hata yaptı; fark edilirse ikiniz de belaya girersiniz. Üstlenirsen sen, ihbar edersen o öder.",
    secenekler: [
      {
        metin: "Hatayı üstlen, {ekip}'i koru.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: -15,
          dost_puani: 15,
          mesaj: "Hatayı üstlendin; {ekip} sana ömür boyu minnettar ama sicilinde leke var.",
          detay: "Bazı sadakatler pahalı, yine de değer.",
        },
        basarisizSonuc: {
          un: -25,
          para: -10,
          mesaj: "Üstlendin ama gerçek anlaşıldı; itibarını ve {ekip}'in güvenini kaybettin.",
          detay: "Bazı fedakârlıklar boşa gider.",
        },
      },
      {
        metin: "Üstlere bildir.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 5,
          ahlak: -8,
          ekip_kaybi: true,
          mesaj: "İhbar ettin, {ekip} kovuldu; sicilin temiz ama ekipte 'güvenilmez' oldun.",
          detay: "Kendini korudun, ama bedeli oldu.",
        },
        basarisizSonuc: {
          un: -5,
          ahlak: -8,
          mesaj: "İhbarın ciddiye alınmadı, üstüne 'gammaz' diye anıldın.",
          detay: "Bazı ihbarlar sonuç vermez.",
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
    metin: "{rakip} hakkında onu bitirecek karanlık bir sır öğrendin. Yayarsan itibarı yıkılır, ama silah geri de tepebilir.",
    secenekler: [
      {
        metin: "Sırrı yay, {rakip}'i bitir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          rakip_puani: -25,
          ahlak: -18,
          mesaj: "Sır yayıldı; {rakip} itibarını yitirdi. Yol açıldı ama tadı acı.",
          detay: "Bazı zaferler ağızda acı bırakır.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -18,
          rakip_puani: 10,
          mesaj: "Kaynağın sen olduğun anlaşıldı; iftiracı damgası yedin, {rakip} güçlendi.",
          detay: "Karanlık silah elinde patlar.",
        },
      },
      {
        metin: "Sakla, dürüstçe yarış.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Sırrı kullanmadın; doğrusunu yaptığını biliyorsun.",
          detay: "Çekilmeyen silah da güçtür.",
        },
        basarisizSonuc: {
          rakip_puani: 8,
          mutluluk: -3,
          mesaj: "Sustun ama {rakip} bunu zayıflık sayıp cüretlendi.",
          detay: "İyilik fırsata çevrilir.",
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
    metin: "{ekip}, daha iyi bir teklif aldığını söyleyip istifa etti. Kalması için maaşını epey artırmalısın.",
    secenekler: [
      {
        metin: "Maaşını artır, kalsın.",
        baseBasariSansi: 80,
        maliyet: 15,
        basariliSonuc: {
          para: -15,
          mesaj: "{ekip} teklifi kabul edip kaldı; sadakatini kanıtladı.",
          detay: "Bazı yatırımlar güven de alır.",
        },
        basarisizSonuc: {
          para: -15,
          ekip_kaybi: true,
          mesaj: "Artışa rağmen {ekip} ayrıldı; para da gitti, deneyim de.",
          detay: "Bazen hiçbir teklif yetmez.",
        },
      },
      {
        metin: "Bırak gitsin, yenisini bulursun.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ekip_kaybi: true,
          mesaj: "{ekip} iyi ayrıldı; yerini doldurmak zaman alacak.",
          detay: "Her ayrılık yeni bir kapı açar.",
        },
        basarisizSonuc: {
          ekip_kaybi: true,
          un: -5,
          mesaj: "{ekip} giderken sırlarını rakiplerine taşıdı.",
          detay: "Bazı ayrılıklar sessiz kalmaz.",
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
    metin: "Bir kâtip, belgeleri sahte mühürle bir gecede 'düzeltebileceğini' söylüyor. Yakalanma riski düşük ama sıfır değil.",
    secenekler: [
      {
        metin: "Kabul et, kısa yoldan git.",
        baseBasariSansi: 65,
        maliyet: 12,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 30,
          un: 5,
          ahlak: -18,
          mesaj: "Sahte mühür işe yaradı; iş bir gecede bitti, kimse anlamadı.",
          detay: "Kısa yol işledi ama vicdanın biliyor.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: -30,
          un: -25,
          ahlak: -18,
          olum_sansi: 3,
          mesaj: "Sahtekârlık ortaya çıktı! Ağır ceza yedin, itibarın yerle bir.",
          detay: "Bazı kısayollar uçurum kenarından geçer.",
        },
      },
      {
        metin: "Reddet, dürüst yoldan git.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Bürokrasiyi sabırla aştın; yavaş ama sağlam.",
          detay: "Dürüstlük bazen sabır ister.",
        },
        basarisizSonuc: {
          para: -8,
          mutluluk: -3,
          mesaj: "Bürokrasi umduğundan uzun sürdü; vakit ve sinir kaybettin.",
          detay: "Dürüst yol hep kolay değil.",
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
    metin: "Ekstra görev fazla kazanç vaat ediyor ama gecelerini yiyecek. Beden dinlenmek istiyor, para da cazip.",
    secenekler: [
      {
        metin: "Fazla çalış, uykusuz kal.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: -9,
          un: -3,
          para: 22,
          saglik: -12,
          mesaj: "Haftalarca az uyudun ama kasan epey doldu.",
          detay: "Kazancın bedelini beden öder.",
        },
        basarisizSonuc: {
          para: 10,
          saglik: -20,
          mutluluk: -8,
          mesaj: "Yorgunluktan işte bayıldın; kazancın çoğu ilaca gitti.",
          detay: "Beden faturayı er geç keser.",
        },
      },
      {
        metin: "Reddet, dinlen.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 8,
          mutluluk: 3,
          mesaj: "Reddedip iyi dinlendin; bedenin teşekkür ediyor.",
          detay: "En iyi kazanç dinç bir bedendir.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Dinlendin ama fırsatı kaçırmanın hafif pişmanlığı var.",
          detay: "Her doğru seçim pişmansız değildir.",
        },
      },
    ],
  },
];
