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
    metin: "Gece yarısı kışla avlusunda Eski Muhafızlar ile Yeni Nizam birbirine girdi. Meşaleler yanıyor, kan dökülmek üzere.",
    secenekler: [
      {
        metin: "Silahını çek, hizbin için savaş!",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 25,
          dost_puani: 15,
          mesaj: "Kavgada en öndeydin! Yoldaşların seni omuzlarına aldı.",
        },
        basarisizSonuc: {
          un: -10,
          saglik: -25,
          olum_sansi: 5,
          mesaj: "Karşı taraf seni hırpaladı; yarık kafayla revire kaldırıldın.",
        },
      },
      {
        metin: "Silahları indirin! Kavgayı durdur.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          mesaj: "Gür sesinle avluyu inlettin; herkes silahını indirdi.",
        },
        basarisizSonuc: {
          saglik: -15,
          mutluluk: -10,
          mesaj: "Araya girerken kafana meşale fırlattılar.",
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
    metin: "Kendi hizbinden bir komutan sana gizli bir emir verdi; karşı hizbe yakın üst subay ise tam tersini istiyor.",
    secenekler: [
      {
        metin: "Hizbinin emrine uy, subayı yok say.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 2,
          dost_puani: 12,
          un: 10,
          mesaj: "Hizbinin emrini yerine getirdin; yoldaşların güvendi.",
          detay: "Sadakat ödüllendi, disiplinde çatlak oluştu.",
        },
        basarisizSonuc: {
          un: -15,
          saglik: -10,
          mesaj: "Üst subay itaatsizliğini fark edip herkesin önünde cezalandırdı.",
          detay: "Hizip bağı disiplini hep yenemez.",
        },
      },
      {
        metin: "Hiyerarşiye uy, subayın emrini yap.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 7,
          mesaj: "Emri eksiksiz yaptın; üst subay seni not etti.",
          detay: "Disiplin ödüllendi, hizbin unutmayacak.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          mesaj: "Hizip kardeşlerin bunu ihanet sayıp sana soğuk davrandı.",
          detay: "İki efendiye hizmetin bedeli var.",
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
    metin: "Rakip hizbe yakın askerlerin sessizce kışladan uzaklaştırılması planlanıyor; tasfiye listesini hazırlaman isteniyor.",
    secenekler: [
      {
        metin: "Listeyi hazırla, hizbini güçlendir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 18,
          ahlak: -20,
          mesaj: "Rakipler sessizce uzaklaştırıldı; hizbinde adın yükseldi.",
          detay: "Güç kazandın ama bunun adil olmadığını biliyorsun.",
        },
        basarisizSonuc: {
          dost_puani: -20,
          saglik: -10,
          mesaj: "Liste sızdı! Askerler önceden haber alıp sana pusu kurdu.",
          detay: "Gizli planlar bazen geri tepiyor.",
        },
      },
      {
        metin: "Reddet, bu kirli bir oyun.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 20,
          mesaj: "Vicdanın rahat ama hizbinde 'zayıf' damgası yedin.",
          detay: "Bazı zaferler onurla kazanılır.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Hizip liderleri reddini güvensizlik saydı.",
          detay: "Doğruyu yapmak bazen bedelsiz değil.",
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
    metin: "Liman Loncası ile Pazar Birliği arasındaki fiyat savaşı kanlı bir hal aldı. Rakibin gemilerini kundaklamayı teklif ediyorlar.",
    secenekler: [
      {
        metin: "Gölgelere öde, rakibin gemisini yak!",
        baseBasariSansi: 45,
        maliyet: 20,
        basariliSonuc: {
          para: 60,
          un: 15,
          ahlak: -35,
          mesaj: "Liman alev alev! Rakiplerin iflas etti, piyasa senin.",
        },
        basarisizSonuc: {
          para: -40,
          un: -30,
          ahlak: -20,
          mesaj: "Kundakçılar yakalanıp seni ele verdi; tazminatla perişan oldun.",
        },
      },
      {
        metin: "Bu kirli oyuna girmem.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Ellerin temiz kaldı; yavaş ama onurlu sürüyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Temiz kaldın ama rakipler depolarına sabotaj yaptı!",
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
    metin: "Rakip hizbin bir deposu gece yarısı yandı. Kimse üstlenmedi ama herkes senin hizbini işaret ediyor.",
    secenekler: [
      {
        metin: "Yangını üstü kapalı üstlen, gücünü göster.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 20,
          ahlak: -30,
          mesaj: "Söylenti yayıldı; hizbinde korkuyla anılıyorsun.",
          detay: "Güç kazandın, vicdanın kararıyor.",
        },
        basarisizSonuc: {
          para: -35,
          un: -25,
          mesaj: "Muhafızlar izleri sana kadar sürdü! Ağır tazminatla kurtuldun.",
          detay: "Bazı sırlar gün yüzüne çıkar.",
        },
      },
      {
        metin: "Yangını söndürmeye yardım et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 20,
          dost_puani: 10,
          mesaj: "Yangına koştun; rakip hizip bile jestini unutmadı.",
          detay: "Düşmana uzanan el büyük zaferdir.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Dumandan zehirlendin; hizbin jestini 'gereksiz' buldu.",
          detay: "İyilik hep takdir görmez.",
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
    metin: "Rakip hizip seni silmek için mallarını maliyetin altında satıyor. Karşılık mı vereceksin, başka yol mu bulacaksın?",
    secenekler: [
      {
        metin: "Sen de maliyetin altına in, kim dayanır görelim.",
        baseBasariSansi: 45,
        maliyet: 15,
        basariliSonuc: {
          mutluluk: -11,
          para: 50,
          un: 5,
          mesaj: "Rakibin önce pes etti, iflasın eşiğine geldi. Piyasa yine senin.",
          detay: "Kazandın ama savaş iki tarafı yıprattı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -45,
          mesaj: "Fiyat savaşını kaybettin; aylarca ciddi zarar ettin.",
          detay: "Bazı kumarlar kaybedeni ağır cezalandırır.",
        },
      },
      {
        metin: "Savaşa girme, kalite ve hizmetini öne çıkar.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 15,
          dost_puani: 8,
          mesaj: "Sadık müşterilerin fiyata değil kaliteye baktı.",
          detay: "En iyi strateji bazen oyuna girmemektir.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Bazı müşteriler ucuza kaydı; küçük zarar ettin.",
          detay: "Sadakat herkeste yok.",
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
    metin: "Gelenekçiler ile Yenilikçiler'in tartışması sokakta saldırıya döndü. Bugün büyük pazar ayininde binlerce kişi seni dinleyecek.",
    secenekler: [
      {
        metin: "Karşı tarafı sapkınlıkla suçla, cemaati kışkırt!",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 30,
          ahlak: -20,
          mesaj: "Ateşli vaazın cemaati coşturdu! Hizbinin ruhani lideri oldun.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -30,
          saglik: -10,
          mesaj: "Rakip destekçiler vaaz sırasında kürsüye taş ve sopayla saldırdı! Kan aktı.",
        },
      },
      {
        metin: "Tanrı barış ister. Kalpleri yumuşat.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: 8,
          ahlak: 25,
          mesaj: "Sesindeki şefkat kalabalığı ağlattı; şehir katliamdan döndü.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          mesaj: "Hizbin seni 'korkak pasifist' diye suçlayıp arkandan iş çevirdi.",
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
    metin: "Karşı hizipten bir din adamı, kutsal metin yorumunuza meydan okuyup seni halka açık tartışmaya çağırıyor.",
    secenekler: [
      {
        metin: "Kabul et, meydanda tartış.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          dost_puani: 10,
          mesaj: "Tartışmada üstün geldin! Cemaat seni hizbin sesi ilan etti.",
          detay: "Sözlerin uzun süre hatırlanacak.",
        },
        basarisizSonuc: {
          un: -20,
          mutluluk: -10,
          mesaj: "Rakibin seni köşeye sıkıştırdı; halkın önünde susup kaldın.",
          detay: "Bazı yenilgiler hafızalarda kalır.",
        },
      },
      {
        metin: "Reddet, tartışmanın bölücü olduğunu söyle.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Reddin bazılarınca bilge alçakgönüllülük sayıldı.",
          detay: "Her meydan okumaya yanıt şart değil.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Karşı hizip reddini halka 'korkaklık' diye duyurdu.",
          detay: "Sessizlik yanlış anlaşılabilir.",
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
    metin: "Kendi cemaatinde bile Gelenekçiler ve Yenilikçiler'e sempati duyanlar var. Ayrılık büyümeden harekete geçmelisin.",
    secenekler: [
      {
        metin: "Cemaati hizbinin çizgisinde birleştir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          dost_puani: -5,
          mesaj: "Çoğunluk çizgini benimsedi; birkaç aile sessizce ayrıldı.",
          detay: "Birlik bazen bedelle gelir.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Baskın tavrın cemaati gerdi; bazı aileler tapınağı terk etti.",
          detay: "Zorlama bazen daha çok böler.",
        },
      },
      {
        metin: "Farklı görüşlere yer aç, birlikte yaşamayı öner.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 20,
          mutluluk: 5,
          mesaj: "Hoşgörün cemaati bir arada tuttu; herkes sesini buldu.",
          detay: "En güçlü birlik farklılığı kabulden doğar.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Hizip liderleri tutumunu 'kararsızlık' diye eleştirdi.",
          detay: "Hoşgörü herkesi memnun etmez.",
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
    metin: "Hizbinle ilgili tehlikeli bir sır öğrendin. Açığa vurmak seni ve grubunu krize sürükleyebilir; susmak da vicdanını yoruyor.",
    secenekler: [
      {
        metin: "Sırrı sakla, hiçbir şey yapma.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Sustun; güvendesin ama içinde bir ağırlık var.",
          detay: "Bazı sessizliklerin bedeli görünmez.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mutluluk: -8,
          mesaj: "Susmaya çalıştın ama vicdanın rahat bırakmadı.",
          detay: "Bazı sırlar içeride büyür.",
        },
      },
      {
        metin: "Sırrı açığa vurmak üzeresin.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Bu an dönüşü olmayan bir eşik. Bir adım daha...",
          geriCekilMetni: "Vazgeç, sırrı gömülü bırak.",
          geriCekilSonucu: {
            ahlak: -5,
            mesaj: "Son anda vazgeçtin; sır seninle kaldı.",
            detay: "Geri dönmek de cesaret ister.",
          },
          devamMetni: "Hayır. Sırrı açığa çıkar.",
          devamSonucu: {
            un: 18,
            ahlak: 20,
            para: -20,
            mesaj: "Sırrı açtın; halk dürüstlüğünü andı ama hizbin seni eskisi gibi görmedi.",
            detay: "Vicdan rahatladı, bir kapı sonsuza kapandı.",
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
    metin: "Eski Muhafızlar, krala bağlılıklarını tazelemek için gece yarısı meşaleler altında yemin ediyor. Herkes kılıç çekip kanla söz verecek.",
    secenekler: [
      {
        metin: "Yemini gururla et, kanını akıt.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 15,
          ahlak: -5,
          saglik: -2,
          mesaj: "Kılıçla elini kesip yemini haykırdın. General gülümsedi.",
          detay: "Eski düzenin sütunu oldun; geri dönüş yok.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Yemin ettin ama sesin titredi; çevren cesaretinden şüphe etti.",
          detay: "Böyle ortamlarda zayıflık hemen görülür.",
        },
      },
      {
        metin: "Yemini dudak ucuyla et, kan akıtma.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Gölgede kalıp ağzını oynattın, eli kesmiş gibi yaptın.",
          detay: "Kimse fark etmedi ama ikiyüzlülük huzursuz etti.",
        },
        basarisizSonuc: {
          saglik: -15,
          un: -20,
          mesaj: "General kanamadığını fark etti! Hain ilan edip herkesin önünde dövdürdü.",
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
    metin: "Komutanların, Yeni Nizam'a yakın genç teğmenlerin gizli hücresini basmanı istiyor. Listede eski bir tanıdığın var. Emir: 'Kimseyi bırakma.'",
    secenekler: [
      {
        metin: "Görevi sadakat ve acımasızlıkla yap.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -35,
          mesaj: "Odaya daldın, kimseye acımadın. Eski tanıdığın yüzüne bakarak öldü.",
          detay: "Kahraman ilan edildin ama o bakışlar rüyanda.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 10,
          mesaj: "Teğmenler hazırlıklıydı. Bomba patladı; ağır yaralı zor kurtuldun.",
          detay: "Kanlı operasyon fiyaskoyla bitti.",
        },
      },
      {
        metin: "Görevi yavaşlat, kaçmalarına izin ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          ahlak: 25,
          un: -10,
          mesaj: "Geç gittin; yalnızca yanmış evraklar vardı.",
          detay: "Dostunu kurtardın; kanıt yok, komutanlar kızgın.",
        },
        basarisizSonuc: {
          un: -30,
          para: -15,
          ahlak: 15,
          mesaj: "Bilerek geciktiğin anlaşıldı! Rütben söküldü, hapisten zor kurtuldun.",
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
    metin: "Hizipte iki güçlü paşa, kimin sözü geçecek diye tehlikeli bir kavgaya tutuştu. İkisi de senin gibi alt subaylardan destek bekliyor.",
    secenekler: [
      {
        metin: "Kıdemli yaşlı paşayı destekle.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 5,
          dost_puani: 10,
          mesaj: "Yaşlı paşayı destekledin; sadakatin saygı gördü.",
          detay: "Geleneksel hiyerarşiye bağlılık takdir görür.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "Yaşlı paşa gözden düştü; sen de 'modası geçmişler'le anıldın.",
          detay: "Yanlış ata oynamak risklidir.",
        },
      },
      {
        metin: "İkisine de yalan söyle, taraf tutma.",
        baseBasariSansi: 65,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          un: 4,
          mesaj: "Kavgaya hiç bulaşmadın, hasarsız çıktın.",
          detay: "En güvenli yol bazen görünmezliktir.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "İkisine de yalan söylediğin çıktı; iki tarafın kara listesine girdin.",
          detay: "Tarafsızlık bazen iki kat ceza getirir.",
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
    metin: "Üniformanla yürürken açlıktan bitmiş gençler yüzüne tükürüp 'Kralın Köpeği!' diye bağırdı. Esnaf izliyor.",
    secenekler: [
      {
        metin: "Kılıç kabzasını göster, korkutup dağıt.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 5,
          ahlak: -10,
          mesaj: "Kılıcına dokunman yetti; gençler kaçtı, dik yürüdün.",
          detay: "Korkuyu otorite sanıyorsun, nefret büyüyor.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          mesaj: "Gençler kaçtı ama esnafın iğrenen bakışları bütün gün midene oturdu.",
          detay: "Halkın nefreti moralini bozuyor.",
        },
      },
      {
        metin: "Tükürüğü sil, onlara para at.",
        baseBasariSansi: 55,
        basariliSonuc: {
          dost_puani: 10,
          ahlak: 20,
          para: -5,
          mesaj: "Tükürenlere para verdin; şaşkınlıkla alıp gittiler.",
          detay: "Esnaf belki üniformanın altındaki kalbi gördü.",
        },
        basarisizSonuc: {
          un: -15,
          para: -5,
          mesaj: "'Kanlı paranı istemiyoruz' deyip parayı suratına fırlattılar.",
          detay: "Halkın nefreti satın alınamaz.",
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
    metin: "Yeni Nizam'dan biri gece odana girdi: 'Eski gemi batıyor, bizimle olursan paşa olursun.' Masaya bir sandık altın bıraktı.",
    secenekler: [
      {
        metin: "Altını al, adamı oracıkta tutukla!",
        baseBasariSansi: 70,
        maxAhlak: 45,
        basariliSonuc: {
          para: 50,
          un: 25,
          ahlak: -20,
          mesaj: "Adamı üstlerine teslim ettin, altını yatağının altına sakladın.",
          detay: "Hem kahraman hem zengin; ikiyüzlülük zirvede.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -20,
          mesaj: "Adam tehlikeli bir suikastçı çıktı! Seni bıçaklayıp kaçtı.",
          detay: "Ne parayı aldın ne huzuru.",
        },
      },
      {
        metin: "Teklifi reddet, defol de.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 15,
          un: 10,
          mesaj: "Adam altınıyla karanlığa karıştı; ertesi gün sadakatin duyuldu.",
          detay: "Eski Muhafızlar'da artık güvenilirsin.",
        },
        basarisizSonuc: {
          mesaj: "Reddettin ama teklif günlerce uykunu kaçırdı: yanlış tarafta mıyım?",
          detay: "Kararlılık bazen içten kemirir.",
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
    metin: "Gece nöbetini bir Yeni Nizam askerine devrediyorsun. Seni süzüp alçak sesle 'Sizinkiler artık tarih' diye mırıldanıyor.",
    secenekler: [
      {
        metin: "Sözünü yanına bırakma, karşılık ver.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 10,
          mesaj: "Sert karşılık verdin, adam sustu; eski muhafızlar seni gizlice alkışladı.",
          detay: "Sözler bazen kılıçtan keskindir.",
        },
        basarisizSonuc: {
          saglik: -10,
          un: -5,
          mesaj: "Laf dalaşı yumruğa döndü; ikiniz de nöbetçi başına yakalandınız.",
          detay: "Disiplin cezası ağırdı.",
        },
      },
      {
        metin: "Duymazdan gel, görevini yap.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Sinirine hâkim oldun, nöbeti sessizce devrettin.",
          detay: "Susmak bazen en güçlü cevap.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Sustun ama öfkeyle doldun; o gece uyuyamadın.",
          detay: "Yutulan öfke içeride büyür.",
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
    metin: "Yaşlı komutan seni çadırına çağırdı: 'Sadakatini bir kez daha görmek istiyorum.' Zor, tehlikeli bir görev veriyor.",
    secenekler: [
      {
        metin: "Görevi hiç sorgulamadan kabul et.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 20,
          ahlak: 5,
          mesaj: "Görevi tamamladın; komutan gözlerine bakıp başını salladı.",
          detay: "O bakış yıllarca alacağın ödülden değerli.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Görev ters gitti; günlerce sedyede kaldın.",
          detay: "Sadakatin bedeli bazen ağır.",
        },
      },
      {
        metin: "Endişelerini nazikçe dile getir.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Dürüstlüğün komutanı şaşırttı ama saygısını kazandın.",
          detay: "Körü körüne itaat etmeyen asker de değerli.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Komutan bunu zayıflık saydı; bir süre seni gözetim altında tuttu.",
          detay: "Bazı komutanlar sorgulamayı sevmez.",
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
    metin: "Emekli yaşlı bir Eski Muhafız, ailesinde kuşaklardır taşınan kılıcını sana emanet etmek istiyor; hizbe ihanet edene asla verilmeyecek.",
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
          mesaj: "Kılıcı tartarken tarihin ağırlığını hissettin; kışla duydu.",
          detay: "Artık yalnız silah değil, bir yemin de taşıyorsun.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kabul ettin ama sorumluluk geceleri uykunu kaçırıyor.",
          detay: "Bazı onurlar aynı zamanda yüktür.",
        },
      },
      {
        metin: "Nazikçe reddet, yükü taşıyamayacağını söyle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yaşlı asker hayal kırıklığına uğradı ama dürüstlüğünü takdir etti.",
          detay: "Bazen dürüstlük onurdan değerlidir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin kışlada 'korkak' fısıltılarına yol açtı.",
          detay: "Bazı retler yanlış anlaşılır.",
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
    metin: "Bir ahır işçisi, Yeni Nizam'ın şehir dışında gizli toplanacağını fısıldadı. Bildirirsen takdir görürsün ama iş çığırından çıkabilir.",
    secenekler: [
      {
        metin: "Hemen komutana bildir.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 20,
          para: 10,
          rakip_puani: 10,
          mesaj: "Baskın yapıldı, komutan seni ödüllendirdi.",
          detay: "Ama artık Yeni Nizam'ın hedefisin.",
        },
        basarisizSonuc: {
          saglik: -15,
          mesaj: "Bilgi sızdı; baskından önce haber alıp seni dövdüler.",
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
          mesaj: "Sustun; bilgiyi bildiğini kimse öğrenmedi.",
          detay: "Bazen en güvenli yol hiç yoldur.",
        },
        basarisizSonuc: {
          ahlak: -5,
          mesaj: "Sessizliğin içini kemirdi; ihanete ortak gibi hissettin.",
          detay: "Suskunluk vicdan azabı doğurabilir.",
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
    metin: "Yeni Nizam, terk edilmiş değirmende gece yarısı gizli toplanıyor; kralı devirme planı konuşulacak. Yakalanırsan cezan vatana ihanetten idam.",
    secenekler: [
      {
        metin: "Toplantıya katıl, en radikal fikri savun.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 25,
          dost_puani: 15,
          ahlak: -10,
          mesaj: "Ateşli konuşman herkesi büyüledi; hareketin gölge liderisin.",
          detay: "Kan dökülecek yerleri haritada sen işaretledin.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "Kralın istihbaratı değirmeni bastı! Kurşun altında ormana zor kaçtın.",
          detay: "Yaralısın, arandığını biliyorsun.",
        },
      },
      {
        metin: "Katılma, riske girme.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Evde güvenle uyudun; sabah değirmenin basıldığını duydun.",
          detay: "Korkaklık hayatını kurtardı, vicdanın kanıyor.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          un: -15,
          mesaj: "Katılmadığın için hareket seni 'korkak, güvenilmez' ilan etti.",
          detay: "Devrimciler yoldaşını yalnız bırakanı affetmez.",
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
    metin: "Hareketin bir lideri dinamit uzattı: 'Bu gece kralın mühimmat deposunu uçuracaksın.' Deponun yanında sivil evler var.",
    secenekler: [
      {
        metin: "Görevi kabul et, sivil zayiatı umursama.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 35,
          para: 20,
          ahlak: -40,
          mesaj: "Depo havaya uçtu! Ama yanındaki evler de yandı.",
          detay: "Kahramansın ama o çığlıkları unutmayacaksın.",
        },
        basarisizSonuc: {
          saglik: -35,
          un: -25,
          olum_sansi: 15,
          mesaj: "Muhafızlar seni fark etti; patlamayı erken tetikleyip ağır yaralandın.",
          detay: "Sağ çıkman şanstı.",
        },
      },
      {
        metin: "Önce değerlileri cebine at, sonra patlat.",
        baseBasariSansi: 35,
        maxAhlak: 40,
        basariliSonuc: {
          para: 80,
          un: 20,
          ahlak: -40,
          mesaj: "Patlamadan önce altınları çaldın, sonra depoyu uçurdun.",
          detay: "Devrimci değil, savaşla beslenen akbabasın.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "Açgözlülükle geciktin; muhafızlar seni depoda kurşuna dizdi.",
        },
      },
      {
        metin: "Siviller ölür! Yapamam.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 25,
          un: -15,
          mesaj: "Dinamiti reddettin; evler yanmadı ama yoldaşların senden tiksiniyor.",
          detay: "Bazen hiçbir şey yapmamak en zor kahramanlık.",
        },
        basarisizSonuc: {
          dost_puani: -20,
          mesaj: "Reddin yüzünden hareket seni 'kralcı' diye andı.",
          detay: "Her şeyi göze almazsan yerin yok.",
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
    metin: "Yeni Nizam'da liderlik için kanlı bir anlaşmazlık var. İki aday da desteğini istiyor: ılımlı reformcular mı, silahlı isyancılar mı?",
    secenekler: [
      {
        metin: "Ilımlı adayı destekle (siyasi çözüm).",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 15,
          dost_puani: 10,
          mesaj: "Ilımlılar güç aldı; hareket kan yerine propagandayla ilerliyor.",
          detay: "Sağduyu bazen en değerli devrimdir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Silahlı isyancılar ılımlı adayı devirdi; itibarın yerle bir oldu.",
          detay: "İhtilaller çoğu zaman en acımasıza kalır.",
        },
      },
      {
        metin: "Kanlı adayı destekle (silahlı isyan).",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 25,
          ahlak: -20,
          mesaj: "Kanlı lider başa geçti; şehri yakmaya hazırsınız.",
          detay: "Merhameti bıraktın, yalnız güç istiyorsun.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -15,
          mesaj: "Adayın fevri eylemi yüzünden ordu üstünüze çöktü; kaçıp kurtuldunuz.",
          detay: "Cesaret bazen aptallığa döner.",
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
    metin: "Kralcılardan eski bir tanıdığın Yeni Nizam üyesi olduğunu öğrendi: 'Ya yüklü para verirsin ya kellen generalin masasına gider.'",
    secenekler: [
      {
        metin: "Öde, ağzını kapat.",
        baseBasariSansi: 85,
        maliyet: 35,
        basariliSonuc: {
          para: -35,
          mesaj: "Parayı verdin; şimdilik sustu.",
          detay: "Şantajcı bir daha gelmeyecek mi?",
        },
        basarisizSonuc: {
          para: -35,
          un: -20,
          mesaj: "Parayı verdin ama yine ispiyonladı! Zor kaçtın.",
          detay: "Hainlere güvenilmez.",
        },
      },
      {
        metin: "Kandır, gece ara sokakta işini bitir.",
        baseBasariSansi: 40,
        maxAhlak: 45,
        basariliSonuc: {
          ahlak: -40,
          un: 15,
          etiket_ekle: [
            "sir:cinayet",
          ],
          mesaj: "Kılıçla buluştun, kimse görmeden işini bitirip nehre attın.",
          detay: "Sır güvende, ruhun cehenneme bir adım yakın.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "Adam muhafızlarla pusu kurdu; oracıkta vurulup öldün.",
        },
      },
      {
        metin: "Blöf yapıyor! Hiçbir şey verme.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Bekledin, hiçbir şey olmadı; adam korkup şehri terk etti.",
          detay: "En iyi tepki bazen tepkisizlik.",
        },
        basarisizSonuc: {
          un: -30,
          saglik: -10,
          para: -20,
          mesaj: "İhbar etti! Karargah basıldı; rütben, paran, işin gitti, sürgüne kaçtın.",
          detay: "Görmezden gelmek hayatını sıfırladı.",
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
    metin: "Hareket içinde kralın istihbaratına bilgi sızdıran bir casus olduğu söyleniyor. Parmaklar sadık bir yoldaşını gösteriyor; kanıt zayıf.",
    secenekler: [
      {
        metin: "Şüpheliyi sorgula, gerekirse sert ol.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          ahlak: -20,
          mesaj: "Gerçek casus itiraf etti! Hareket felaketten döndü.",
          detay: "Haklı çıktın ama yöntemlerin rahatsız ediyor.",
        },
        basarisizSonuc: {
          ahlak: -30,
          dost_puani: -20,
          mesaj: "Adam masummuş! Yoldaşların seni acımasızlıkla suçladı; güven sarsıldı.",
          detay: "Şüphe en çok masumu yaralar.",
        },
      },
      {
        metin: "Kanıtsız suçlama, gerçek casusu sabırla bekle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Gerçek casus hatasıyla ele verdi; kimseye haksızlık etmedin.",
          detay: "Adalet acele etmeyene gülümser.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -15,
          olum_sansi: 5,
          mesaj: "Beklerken casus sızdırmaya devam etti; baskında ağır yaralandın.",
          detay: "Sabrın bedeli bazen ağır.",
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
    metin: "Bir üst subay, reform fikirlerini içeren notlarınla seni yakaladı. Gözlerinden bir şey okuyamıyorsun: ele mi verecek, yoksa...",
    secenekler: [
      {
        metin: "Notlar senin değil de, yalan söyle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Subay ikna oldu, notları geri verip gitti.",
          detay: "Kalbin küt küt atarken rahat nefes aldın.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -10,
          mesaj: "Yalanın çıktı; hem yalancı hem hain damgası yedin.",
          detay: "Bir yalan çoğu zaman ikinciyi doğurur.",
        },
      },
      {
        metin: "Doğruyu söyle, fikirlerini savun.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 15,
          dost_puani: 10,
          mesaj: "Subay gülümsedi: 'Ben de öyle düşünüyorum.'",
          detay: "Cesaret beklenmedik müttefik kazandırır.",
        },
        basarisizSonuc: {
          saglik: -10,
          un: -15,
          mesaj: "Subay seni raporladı; birkaç gün nezarette kaldın.",
          detay: "Her subay yanında değil.",
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
    metin: "Yeni katılan birkaç genç asker kararsız. Onları Yeni Nizam'ın safına çekersen hareket güçlenir.",
    secenekler: [
      {
        metin: "Ateşli bir konuşmayla coştur.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 15,
          dost_puani: 5,
          mesaj: "Sözlerin gözlerinde kıvılcım yaktı; birkaçı hemen katıldı.",
          detay: "Doğru sözler bazen ordudan güçlüdür.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Konuşman fazla iddialı bulundu; bazıları tuhaf baktı.",
          detay: "Her söylev karşılık bulmaz.",
        },
      },
      {
        metin: "Tek tek, sakince konuş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          dost_puani: 8,
          ahlak: 5,
          mesaj: "Sabırlı yaklaşımın işledi; gençler sana güvenmeye başladı.",
          detay: "Gerçek ikna sessiz sohbetlerde olur.",
        },
        basarisizSonuc: {
          mesaj: "Bazıları ilgisiz kaldı ama kimseyi kırmadın.",
          detay: "Her tohum her toprakta filizlenmez.",
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
    metin: "Eski Muhafızlar'dan biri sana 'gizli silah deposu' dediği bir yere gitmeni öneriyor. İçgüdülerin tuzak olabileceğini fısıldıyor.",
    secenekler: [
      {
        metin: "Riske gir, yine de git.",
        baseBasariSansi: 45,
        basariliSonuc: {
          mutluluk: -11,
          para: 30,
          un: 5,
          mesaj: "Depo gerçekmiş! Değerli malzemeyle döndün.",
          detay: "Şüphe bazen fırsatı kaçırtır.",
        },
        basarisizSonuc: {
          saglik: -20,
          para: -15,
          mesaj: "Tam bir tuzaktı; pusuya düşüp zor kaçtın.",
          detay: "İçgüdülerin haklıydı.",
        },
      },
      {
        metin: "Güvenilir birine önce sordur.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Araştırman doğru çıktı; tuzaktan kıl payı kurtuldun.",
          detay: "Temkin bazen en büyük cesaret.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Fırsatı kaçırdın; depo gerçekmiş, biri senden önce davranmış.",
          detay: "Temkinin de bedeli var.",
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
    metin: "Yeni Nizam sana fırsat verdi: reform tekliflerinizi üst düzey bir subaya doğrudan sunmak. Hareketin en büyük anlarından biri olabilir.",
    secenekler: [
      {
        metin: "Cesur, tavizsiz bir sunum yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 10,
          mesaj: "Subayı etkiledin; bazı teklifler değerlendirmeye alındı.",
          detay: "Beklenen değişim belki bugün başladı.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Subay teklifleri reddedip seni küstahlıkla suçladı.",
          detay: "Her cesaret takdir görmez.",
        },
      },
      {
        metin: "Ilımlı, adım adım bir yaklaşım sun.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 10,
          mesaj: "Subay temkinli ama olumlu yanıt verdi; küçük adım sözü aldın.",
          detay: "Yavaş ilerlemek durmaktan iyi.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Teklif 'yetersiz ve ürkek' bulundu; kendi safın da hayal kırıklığına uğradı.",
          detay: "Bazen kimseyi memnun edemezsin.",
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
    metin: "Lonca ağaları, halk kıtlıktayken un ve kumaş fiyatlarını ikiye katlama kararı aldı. Tüm üyelerin bu zalim tarifeye uyması şart.",
    secenekler: [
      {
        metin: "Loncaya uy, halkı sömür.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 35,
          ahlak: -25,
          un: -10,
          mesaj: "Fiyatları artırdın; insanlar ağlayarak aldı. Loncada kral gibisin.",
          detay: "Düzen cüzdanı doldurur, vicdanı boşaltır.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -10,
          mesaj: "Halk fahiş fiyata isyan edip dükkânını taşladı.",
          detay: "Altın koltuk camlar kırılınca koruyamadı.",
        },
      },
      {
        metin: "Gizlice eski fiyattan sat, halkı koru.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: 25,
          un: 20,
          mesaj: "Geceleri arka kapıdan fakirlere ucuza sattın; şehirde melek gibi anılıyorsun.",
          detay: "Lonca fark etmedi; kalbin de ticaretin de sağlam.",
        },
        basarisizSonuc: {
          para: -30,
          un: -25,
          ahlak: 10,
          mesaj: "Lonca muhbirleri yakaladı! Ağır bir ihanet cezası yedin.",
          detay: "İyiliğin bedeli iflasa yaklaşmak oldu.",
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
    metin: "Zengin bir ailenin şımarık oğlu, babasının parasıyla loncaya girmek istiyor. Senden kefalet istiyor.",
    secenekler: [
      {
        metin: "Kefil ol, bağlantılara yatırım yap.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: -6,
          un: -2,
          para: 15,
          dost_puani: 8,
          mesaj: "Kefil oldun; babası hemen bir hediyeyle minnet gösterdi.",
          detay: "Loncada bağlantı bazen sermayeden değerli.",
        },
        basarisizSonuc: {
          mutluluk: -9,
          para: -10,
          mesaj: "Oğlan ilk hafta skandala karıştı; adın da lekelendi.",
          detay: "Bazı kefaletler pişmanlıkla biter.",
        },
      },
      {
        metin: "Kibarca reddet, işine odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Reddettin; zamanını kendi ticaretine ayırdın.",
          detay: "Her bağlantı peşinden koşmaya değmez.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Ailesi hakaret sayıp lonca içinde seni konuşmaya başladı.",
          detay: "Nazik hayır bile düşman kazandırır.",
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
    metin: "Resmi makamlar Liman Loncası'nı fiyat tekeli kurmakla suçlayıp defterleri incelemeye geldi. Sıra sana da gelebilir.",
    secenekler: [
      {
        metin: "Defterleri geceden düzelt, izleri sil.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: -10,
          mesaj: "Defterleri temizledin; müfettiş bir şey bulamadan gitti.",
          detay: "Bir kez daha yalanla temize çıktın.",
        },
        basarisizSonuc: {
          para: -30,
          un: -20,
          mesaj: "Sahtecilik ortaya çıktı! Ağır para cezası yedin.",
          detay: "Bazı yalanlar defterde iz bırakır.",
        },
      },
      {
        metin: "Defterleri olduğu gibi göster, dürüst ol.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Defterlerin tertemizdi; müfettiş elini sıkıp gitti.",
          detay: "Dürüstlük bazen en sağlam savunma.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Dürüst olsan da bazı lonca âdetleri seni zora soktu.",
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
    metin: "Pazar Birliği'ndeki eski dostun, tekelciliğin halkı ezdiğini söyleyip saf değiştirmen için yalvarıyor.",
    secenekler: [
      {
        metin: "Nazikçe reddet, loncana sadık kal.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Kararlılığını gösterdin; dostun hayal kırıklığıyla ayrıldı.",
          detay: "Sadakatin bedeli çoğu zaman bir dostluk.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Reddin dostluğunuzda derin bir çatlak açtı.",
          detay: "Bazı hayırlar unutulmaz.",
        },
      },
      {
        metin: "Sözlerini ciddiye al, vicdanını sorgula.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Sözleri seni etkiledi; gizlice halka iyilik yapmaya başladın.",
          detay: "Vicdan bazen lonca kuralından yüksek konuşur.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Tereddüdün loncada fark edildi; güven azaldı.",
          detay: "Kararsızlığın bedeli var.",
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
    metin: "Lonca ağaları, rakip şehrin mallarını limana sokmamak için ambargo kararı aldı. Bazı eski müşterilerini kaybedebilirsin.",
    secenekler: [
      {
        metin: "Ambargoya tam uy, sadakatini göster.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 12,
          para: -10,
          mesaj: "Ambargoya harfiyen uydun; ağalar sadakatini not etti.",
          detay: "Bazı kazançlar itibar olarak gelir.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Ambargo tahminin çok üstünde müşteri kaçırdı.",
          detay: "Kararlar bazen beklenenden pahalıya patlar.",
        },
      },
      {
        metin: "Gizli yoldan eski müşterilere mal ulaştır.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 35,
          ahlak: -10,
          mesaj: "Gizli yollardan ticareti sürdürdün; ne para ne müşteri kaybettin.",
          detay: "Kurallar esnek vicdana göre bükülür.",
        },
        basarisizSonuc: {
          para: -25,
          un: -20,
          mesaj: "Lonca casusları yakaladı! Ambargoyu deldiğin için ağır ceza ödedin.",
          detay: "Gizli işler hep gizli kalmaz.",
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
    metin: "Lonca ustaları mallarına 'Liman Loncası onaylıdır' mührü vurmana izin verebilir; karşılığında sıkı kurallara uyacaksın.",
    secenekler: [
      {
        metin: "Kuralları kabul et, mührü al.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: -6,
          para: 15,
          un: 5,
          mesaj: "Mühür senin; müşteriler malına daha çok güveniyor.",
          detay: "İtibar bazen altından değerli.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Mührü aldın ama sıkı denetim bazı işlerini yavaşlattı.",
          detay: "Her ayrıcalığın bedeli var.",
        },
      },
      {
        metin: "Reddet, kendi yolunda kal.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Bağımsızlığını korudun, kimseye hesap vermiyorsun.",
          detay: "Özgürlük bazen en büyük servet.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Lonca dışı kalman bazı büyük müşterileri ürküttü.",
          detay: "Bazı kapılar mühürsüz açılmaz.",
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
    metin: "Pazar Birliği'ne yakın bir tüccarın gemisi fırtınada battı. Yükünün bir kısmı kıyıya vurdu; kimse görmeden toplayabilirsin.",
    secenekler: [
      {
        metin: "Malları topla, kimseye söyleme.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 35,
          ahlak: -10,
          mesaj: "Malları sessizce topladın, kesen kabardı.",
          detay: "Talih bazen başkasının felaketinden doğar.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Toplarken görüldün; bir süre 'leş kargası' diye anıldın.",
          detay: "Bazı fırsatlar utanç da getirir.",
        },
      },
      {
        metin: "Sahibine haber ver, yardım et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 10,
          dost_puani: 5,
          mesaj: "Yardımın boşa gitmedi; tüccar sana minnettar kaldı.",
          detay: "Rakibe uzanan el en değerli yatırım olabilir.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Yardım ettin ama biraz zamana ve paraya mal oldu.",
          detay: "İyilik hemen karşılık bulmaz.",
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
    metin: "Yaşlı bir lonca üyesi hiç yazılı belge olmadan sadece el sıkışarak büyük anlaşma istiyor: 'Eskiden söz senetten önce gelirdi.'",
    secenekler: [
      {
        metin: "El sıkış, sözüne güven.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -10,
          para: 25,
          un: 5,
          mesaj: "Adam sözünü tuttu, anlaşma kusursuz işledi.",
          detay: "En eski usuller bazen en sağlamı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "Adam caydı; belge olmadığından hakkını arayamadın.",
          detay: "Güven bazen pahalıya patlar.",
        },
      },
      {
        metin: "Israrla yazılı belge iste.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 10,
          mesaj: "Belgeyle güvenceye aldın; adam gücense de anlaşma sağlam.",
          detay: "Temkinli tüccar uzun yaşar.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Israrın adamı gücendirdi; loncada 'bize güvenmiyor' denildi.",
          detay: "Güvensizlik itibar kaybettirir.",
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
    metin: "Lonca, zor günde birbirine destek olmak için ortak bir yardım sandığı kurmak istiyor. Senden de katkı bekleniyor.",
    secenekler: [
      {
        metin: "Cömertçe katkıda bulun.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -20,
          un: 15,
          ahlak: 10,
          mesaj: "Katkın takdir gördü; artık sözün daha çok geçiyor.",
          detay: "Cömertlik bazen en iyi yatırım.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Katkıda bulundun ama beklediğin takdiri görmedin.",
          detay: "Her iyilik alkışlanmaz.",
        },
      },
      {
        metin: "Asgariyi ver, fazlasını sakla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -5,
          mesaj: "Kimse dikkat etmedi, kesen ağırlığını korudu.",
          detay: "Temkinli olmak hep kötü değil.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Cimriliğin fark edildi; birkaç üye arkandan konuştu.",
          detay: "Küçük hesaplar büyük dedikoduya döner.",
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
    metin: "Pazar Birliği, soyluların Liman Loncası'na karşı büyük boykot başlattı; kimse liman malı almayacak. Dükkânın bu mallar olmadan batabilir.",
    secenekler: [
      {
        metin: "Boykota tam destek ver, dükkânı feda et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 30,
          para: -20,
          ahlak: 15,
          mesaj: "Raflar boş kaldı ama Birliğin sembolü oldun; esnaf saygı duyuyor.",
          detay: "İlkelerin için cüzdanını kanattın.",
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -15,
          mesaj: "Boykot işe yaramadı; Lonca kırdı. Boşuna zarara girdin.",
          detay: "İdealizm karın doyurmuyor.",
        },
      },
      {
        metin: "Gizlice limandan mal almaya devam et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 40,
          ahlak: -15,
          mesaj: "Rafların doluydu, boykotta tekel oldun. Çok kazandın.",
          detay: "İhanet tatlı meyve verebilir.",
        },
        basarisizSonuc: {
          para: -25,
          un: -35,
          saglik: -10,
          mesaj: "Esnaf ihanetini öğrendi! Gece dükkânını taşlayıp mallarını yaktılar.",
          detay: "Esnafın öfkesi soylulardan acımasız.",
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
    metin: "Birlikteki genç girişimciler seni örnek alıyor ve senden akıl hocalığı istiyor.",
    secenekler: [
      {
        metin: "Akıl hocalığını kabul et.",
        baseBasariSansi: 75,
        basariliSonuc: {
          dost_puani: 10,
          un: 5,
          mesaj: "Gençlere yol gösterdin, saygı kazandın.",
          detay: "Bilgini paylaşmak seni de zenginleştirdi.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Akıl hocalığı zaman aldı; kendi işlerin aksadı.",
          detay: "Her iyiliğin bedeli olabilir.",
        },
      },
      {
        metin: "Nazikçe reddet, işine odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 8,
          mesaj: "Reddettin; zamanı kendi işine ayırdın.",
          detay: "Herkese zaman ayırmak zorunda değilsin.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Reddin bazı gençleri hayal kırıklığına uğrattı.",
          detay: "Her hayır küçük bir kırgınlık bırakır.",
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
    metin: "Resmi makamlar Pazar Birliği'ni düzeni bozmakla suçlayıp üyeleri soruşturmaya başladı. Sıra sana da gelebilir.",
    secenekler: [
      {
        metin: "Saklan, ortalıkta görünme.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Bir süre gözden uzak durdun; soruşturma seni atladı.",
          detay: "Sabır bazen en iyi savunma.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Saklandığın fark edildi; hafif para cezası ödedin.",
          detay: "Saklanmak hep işe yaramaz.",
        },
      },
      {
        metin: "Açıkça direniş göster.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 18,
          ahlak: 5,
          mesaj: "Direncin seni Birlikte sembol yaptı.",
          detay: "Cesaretin karşılığını buldu.",
        },
        basarisizSonuc: {
          para: -25,
          saglik: -10,
          mesaj: "Bedeli ağır ödedin; malına el kondu, kısa süre gözaltına alındın.",
          detay: "Her direniş bedel ister.",
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
    metin: "Liman Loncası'ndaki eski dostun seni eski düzene geri döndürmeye çalışıyor.",
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
          detay: "Her hayır iz bırakabilir.",
        },
      },
      {
        metin: "Teklifi ciddiye al, düşün.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          mesaj: "Düşünmen sana biraz zaman ve küçük bir teklif kazandırdı.",
          detay: "Açık fikirlilik bazen kazandırır.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Tereddüdün Birlikte fark edildi; güvenin sorgulandı.",
          detay: "Kararsızlığın bedeli var.",
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
    metin: "Birlik, küçük esnafın tek başına alamayacağı toptan siparişler için ortak depo kurmayı tartışıyor.",
    secenekler: [
      {
        metin: "Payını ver, ortak depoya katıl.",
        baseBasariSansi: 70,
        maliyet: 20,
        basariliSonuc: {
          para: -14,
          maas_carpani: 1.05,
          mesaj: "Depo kuruldu; büyük siparişlerde artık yalnız değilsin.",
          detay: "Birlik küçüğe güç verir.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Depo kuruldu ama yönetimi verimsiz.",
          detay: "Ortak işler pürüzsüz gitmez.",
        },
      },
      {
        metin: "Katılma; yalnız yürü.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Katılmadın; bağımsızlığını korudun.",
          detay: "Yalnızlık özgürlük verir, güç değil.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Birlik seni 'bencil' saydı.",
          detay: "Bireysellik dayanışmaya mal olur.",
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
    metin: "Pazar Birliği, lonca kurallarını çiğneyip izinsiz bir pazar günü kurmayı planlıyor. Riskli ama kazançlı.",
    secenekler: [
      {
        metin: "Coşkuyla katıl, tezgâhını kur.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: -11,
          para: 30,
          un: 8,
          mesaj: "Pazar çok tuttu, mallar kapış kapış gitti.",
          detay: "Kuralsızlık bazen kazandırır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -10,
          mesaj: "Lonca muhafızları pazarı bastı, malına el konuldu.",
          detay: "Her isyanın bedeli var.",
        },
      },
      {
        metin: "Destek ver ama tezgâh açma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          dost_puani: 5,
          mesaj: "Riske girmeden harekete destek verdin.",
          detay: "Arkadan itmek de katkıdır.",
        },
        basarisizSonuc: {
          mesaj: "Temkinin 'cesaretsizlik' sayıldı.",
          detay: "Her temkin takdir görmez.",
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
    metin: "Pazar Birliği'nden Liman Loncası'na bilgi sızıyor. Şüpheler bir arkadaşında yoğunlaşıyor.",
    secenekler: [
      {
        metin: "Arkadaşını sorgula.",
        baseBasariSansi: 60,
        basariliSonuc: {
          dost_puani: -5,
          un: 12,
          mesaj: "Casus başkasıymış; arkadaşınla aranız düzeldi.",
          detay: "Şüphe en yakını da yaralar.",
        },
        basarisizSonuc: {
          dost_puani: -15,
          mesaj: "Sorgun arkadaşını kırdı, aranız uzun süre soğudu.",
          detay: "Bazı sorular sorulmamalı.",
        },
      },
      {
        metin: "Sessizce kendin araştır.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 13,
          mesaj: "Casusu sessizce bulup bildirdin; kimse incinmedi.",
          detay: "Sabır çoğu zaman en iyi yoldur.",
        },
        basarisizSonuc: {
          mesaj: "Araştırman sonuçsuz kaldı, şüpheler sürüyor.",
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
    metin: "Pazar Birliği, loncanın gizli fiyat anlaşmalarını ifşa etmek istiyor. Kahraman olabilirsin, düşman da kazanabilirsin.",
    secenekler: [
      {
        metin: "Fiyatları meydanda açıkla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          dost_puani: 10,
          mesaj: "Halk alkışladı: 'gerçek bir halk tüccarı'.",
          detay: "Cesaretin seni simaya çevirdi.",
        },
        basarisizSonuc: {
          rakip_puani: 15,
          para: -10,
          mesaj: "Lonca dava etmekle tehdit etti, müşteri kaybettin.",
          detay: "Güçlüye meydan okumak pahalı.",
        },
      },
      {
        metin: "Bilgiyi yalnız güvendiklerine fısılda.",
        baseBasariSansi: 80,
        basariliSonuc: {
          dost_puani: 8,
          mesaj: "Bilgi sessizce yayıldı; risk almadan amacına ulaştın.",
          detay: "Fısıltı bazen bağırmaktan etkilidir.",
        },
        basarisizSonuc: {
          mesaj: "Fısıltın yayılmadı, etki yaratmadı.",
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
    metin: "Hırslı genç bir tüccar seninle yeni bir pazar açmak istiyor. Fikirleri cesur ama tecrübesiz.",
    secenekler: [
      {
        metin: "Kabul et, riski paylaş.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -10,
          para: 25,
          un: 5,
          mesaj: "Ortaklık beklenmedik tuttu, ikiniz de kazandınız.",
          detay: "Fırsat bazen genç fikirden doğar.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          mesaj: "Girişim çöktü, tecrübesizlik pahalıya patladı.",
          detay: "Her cesur fikir tutmaz.",
        },
      },
      {
        metin: "Nazikçe reddet, önce tecrübe kazansın.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Genç öğüdüne teşekkür etti, ileride yine gelecek.",
          detay: "Bazen en iyi yardım hayırdır.",
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
    metin: "Gelenekçiler yüzyıllık bir ritüelin aynen korunmasını istiyor; bazı gençler bunu eskimiş buluyor.",
    secenekler: [
      {
        metin: "Ritüeli aynen uygula.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 8,
          un: 5,
          mesaj: "Ritüeli titizlikle uyguladın; yaşlılar takdir etti.",
          detay: "Geleneğe bağlılık saygı kazandırır.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Ritüelde küçük bir hata yaptın, bazı yaşlılar fark etti.",
          detay: "Gelenek titizlik ister.",
        },
      },
      {
        metin: "Ritüeli biraz sadeleştir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 4,
          dost_puani: 8,
          mesaj: "Sadeleştirmeni gençler beğendi.",
          detay: "Küçük değişiklik köprü kurar.",
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
    metin: "Yenilikçi bir vaiz sapkınlıkla suçlanıyor; Gelenekçiler senin de katılmanı bekliyor.",
    secenekler: [
      {
        metin: "Suçlamaya katıl.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 10,
          ahlak: -8,
          mesaj: "Suçlamaya katıldın; Gelenekçiler arasında itibarın arttı.",
          detay: "Ama vicdanına ağır geldi.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mesaj: "Suçlaman sert bulundu, bazıları rahatsız oldu.",
          detay: "Sertlik hep işe yaramaz.",
        },
      },
      {
        metin: "Sessiz kal, karışma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Vicdanın rahat ama bazı Gelenekçiler sadakatini yetersiz buldu.",
          detay: "Tarafsızlık hep ödüllenmez.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Sessizliğin zayıflık sayıldı.",
          detay: "Bazı sessizlikler yanlış anlaşılır.",
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
    metin: "Gelenekçiler arasında kimin yetkili olduğu üzerine bir anlaşmazlık büyüdü. Taraf tutman isteniyor.",
    secenekler: [
      {
        metin: "En kıdemliyi destekle.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          dost_puani: 5,
          mesaj: "Kıdemliyi desteklemen geleneğe uygun bulundu.",
          detay: "Hiyerarşiye saygı takdir görür.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Desteğin bazılarınca yağcılık sayıldı.",
          detay: "Her destek aynı algılanmaz.",
        },
      },
      {
        metin: "Tarafsız kal.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Tarafsız kaldın; kimse suçlamadı.",
          detay: "En güvenli yol taraf tutmamaktır.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Tarafsızlığın kararsızlık sayıldı.",
          detay: "Tarafsızlık hep anlayış görmez.",
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
    metin: "Halkın bir kesimi seni fazla katı buluyor; bazıları uzaklaşmaya başladı.",
    secenekler: [
      {
        metin: "Duruşunu koru, açıklama yapma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Duruşunu korudun; Gelenekçiler takdir etti.",
          detay: "Kararlılık bazen yeter.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Sessizliğin bazı üyeleri daha da uzaklaştırdı.",
          detay: "Her sessizlik anlaşılmaz.",
        },
      },
      {
        metin: "Yumuşak bir açıklama yap.",
        baseBasariSansi: 60,
        basariliSonuc: {
          dost_puani: 8,
          mesaj: "Açıklaman bazılarını yumuşattı.",
          detay: "Küçük çaba köprü kurar.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Açıklaman Gelenekçilerce 'yumuşaklık' diye eleştirildi.",
          detay: "Her açıklama takdir görmez.",
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
    metin: "Bir Yenilikçi gizlice seninle temas kurup iki grup arasında uzlaşma köprüsü kurmak istiyor.",
    secenekler: [
      {
        metin: "Kabul et, köprü kurmayı dene.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 10,
          dost_puani: 8,
          mesaj: "Uzlaşma girişimin küçük ama gerçek bir adım oldu.",
          detay: "Köprü kurmak cesaret ister.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Girişimin Gelenekçilerce hoş karşılanmadı.",
          detay: "Her uzlaşma çabası anlaşılmaz.",
        },
      },
      {
        metin: "Reddet, saflığını koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: 5,
          mesaj: "Reddettin; Gelenekçiler arasındaki yerin sağlamlaştı.",
          detay: "Netlik bazen en güvenli yoldur.",
        },
        basarisizSonuc: {
          mesaj: "Reddin köprü fırsatını kapattı.",
          detay: "Her fırsat bir daha gelmez.",
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
    metin: "Manastırın en eski el yazması çürüyor. Kopyalamak günler alır, ama Gelenekçiler için metnin kutsallığı çok önemli.",
    secenekler: [
      {
        metin: "Günlerini adayıp titizlikle kopyala.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          un: 10,
          mesaj: "Kusursuz kopyaladın; cemaat seni 'gerçek bir bekçi' diye andı.",
          detay: "Bazı emekler sabırla ölçülür.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Günlerce eğilmek belini yordu, birkaç hata da yaptın.",
          detay: "Her emek kusursuz sonuç vermez.",
        },
      },
      {
        metin: "Çırağa devret, sen denetle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Çırak işi iyi yaptı, zamanın da boşa gitmedi.",
          detay: "Devretmek de bilgeliktir.",
        },
        basarisizSonuc: {
          ahlak: -5,
          mesaj: "Çırak ciddi hatalar yaptı, metin yanlış kopyalandı.",
          detay: "Devredilen sorumluluk geri teper.",
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
    metin: "Cemaatin en yaşlıları seni meclise çağırdı. Eski bir ayin hakkında soracaklar; cevapların bağlılığını kanıtlayacak.",
    secenekler: [
      {
        metin: "Geleneksel cevapları harfiyen tekrarla.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 10,
          un: 1,
          mesaj: "Yaşlılar memnun kaldı, 'gerçek bir Gelenekçi' dediler.",
          detay: "Sadakat ezberle değil, içtenlikle ölçülür.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Birkaç detayı yanlış hatırladın, yaşlılar hayal kırıklığına uğradı.",
          detay: "Gelenek unutkanlığı affetmez.",
        },
      },
      {
        metin: "Kendi yorumunu da kat.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 3,
          ahlak: 15,
          mesaj: "Yorumun bazı yaşlıları etkiledi: 'bu genç düşünüyor'.",
          detay: "Gelenek taze bakışla güçlenir.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Yorumun küstahlık sayıldı, 'kendini bilmez' dendi.",
          detay: "Her yenilik hoş karşılanmaz.",
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
    metin: "Değerli bir kutsal emaneti tehlikeli yoldan başka bir kutsal mekâna taşıyacaksın. Yolda haydutlar olabilir.",
    secenekler: [
      {
        metin: "Ana yoldan hızlıca git.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 15,
          ahlak: 5,
          mesaj: "Emaneti güvenle teslim ettin; cemaat bu yolculuğu yıllarca anlatacak.",
          detay: "Cesaret bazen en kısa yoldur.",
        },
        basarisizSonuc: {
          saglik: -15,
          para: -10,
          mesaj: "Haydutlar seni dövüp soydu ama emanet elinde kaldı.",
          detay: "Kutsal, bazen bedel ödeyerek korunur.",
        },
      },
      {
        metin: "Uzun ama güvenli dolambaçlı yoldan git.",
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
          mesaj: "Uzun yol yordu, gecikmen cemaati endişelendirdi.",
          detay: "Güvenlik zamandan çalar.",
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
    metin: "Bir Yenilikçi, cemaat önünde geleneği sarsacak bir vaaz vermeyi planlıyor. Gelenekçiler engellemeni istiyor.",
    secenekler: [
      {
        metin: "Önce halka gerçeği anlat, onu gözden düşür.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          rakip_puani: 10,
          mesaj: "Konuşman işe yaradı, vaaz ilgi görmedi.",
          detay: "Söz bazen en keskin kalkandır.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Girişimin ters tepti, 'korkak' ve 'engelleyici' diye anıldın.",
          detay: "Her müdahale ters tepebilir.",
        },
      },
      {
        metin: "Karışma, fikirler kendi başına yargılansın.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Karışmadın, cemaat kendi kararını verdi.",
          detay: "En bilge tepki bazen sessizliktir.",
        },
        basarisizSonuc: {
          mesaj: "Sessizliğin bazı Gelenekçilerce 'ilgisizlik' sayıldı.",
          detay: "Tarafsızlık hep takdir edilmez.",
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
    metin: "Yenilikçiler kutsal metinlerin yeni bir yorumunu hazırlıyor; senden destek ve katkı bekliyor.",
    secenekler: [
      {
        metin: "Çalışmaya aktif katkı ver.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 12,
          ahlak: 5,
          mesaj: "Katkın çalışmayı zenginleştirdi; adın öne çıktı.",
          detay: "Emeğin karşılığını buldu.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Çalışma beklenenden zor çıktı, seni yordu.",
          detay: "Her katkı kolay değil.",
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
          detay: "Her mesafe anlaşılmaz.",
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
    metin: "Gelenekçiler seni açıkça sapkınlıkla suçladı. Bu, cemaatteki konumunu ciddi sarsabilir.",
    secenekler: [
      {
        metin: "Kendini açıkça savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 10,
          ahlak: 8,
          mesaj: "Savunman ikna ediciydi; suçlama büyük ölçüde etkisiz kaldı.",
          detay: "Cesur savunma seni güçlendirdi.",
        },
        basarisizSonuc: {
          un: -15,
          mutluluk: -8,
          mesaj: "Savunman yeterince ikna etmedi, itibarın sarsıldı.",
          detay: "Her savunma tutmaz.",
        },
      },
      {
        metin: "Sessiz kal, fırtına geçsin.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sessizliğin zamanla suçlamayı yatıştırdı.",
          detay: "Zaman en iyi savunmadır.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Sessizliğin suçlamayı kabul sayıldı.",
          detay: "Her sessizlik yanlış anlaşılabilir.",
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
    metin: "Yenilikçiler bile ne kadar ileri gidileceğinde ayrışıyor. Ölçülü mü, radikal mi olacaksın?",
    secenekler: [
      {
        metin: "Ölçülü değişimi savun.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 5,
          dost_puani: 5,
          mesaj: "Ölçülü tavrını çoğunluk benimsedi.",
          detay: "Denge bazen en güçlü duruştur.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Ölçülü tavrın radikal üyeleri hayal kırıklığına uğrattı.",
          detay: "Her ölçülülük takdir görmez.",
        },
      },
      {
        metin: "Radikal değişimi savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 15,
          mesaj: "Radikal tavrın bazılarını heyecanlandırdı, adın öne çıktı.",
          detay: "Cesaret dikkat çeker.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "Radikal tavrın ölçülüleri ürküttü, grup bölündü.",
          detay: "Radikallik bölebilir.",
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
    metin: "Halkın bir kesimi seni cesur öncü sayıyor, bir kesimi güvensiz buluyor.",
    secenekler: [
      {
        metin: "Öncülerle vakit geçir, ilham al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 4,
          un: 5,
          mesaj: "Destekçilerinle geçirdiğin zaman seni güçlendirdi.",
          detay: "İlham basit bir sohbetten gelir.",
        },
        basarisizSonuc: {
          mesaj: "Destekçilerin arasında bile fikir ayrılıkları vardı.",
          detay: "Hiçbir grup tam uyumlu değil.",
        },
      },
      {
        metin: "Şüphecilerle konuş, anlamaya çalış.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 8,
          dost_puani: 5,
          mesaj: "Konuşman bazı şüphecileri yumuşattı.",
          detay: "Anlamaya çalışmak köprü kurar.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Konuşma gerildi, seni daha da yordu.",
          detay: "Her diyalog kolay olmaz.",
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
          mesaj: "Sesini yükselttin; bu cesaret seni bir sembole çevirdi.",
          detay: "Bazı bedeller doğruyu söylemekle ödenir.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -10,
          mesaj: "Otoriteler seni geçici olarak görevden uzaklaştırdı.",
          detay: "Cesaretin bir bedeli oldu.",
        },
      },
      {
        metin: "Bir süre geri çekil.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Geri çekilmen fırtınayı atlatmanı sağladı.",
          detay: "Stratejik sessizlik hayatta tutar.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Geri çekilmen bazı destekçileri hayal kırıklığına uğrattı.",
          detay: "Her geri çekilme anlaşılmaz.",
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
    metin: "Bir Gelenekçi seni meydanda açık tartışmaya çağırdı. Kazanırsan Yenilikçiler'in sesi güçlenir.",
    secenekler: [
      {
        metin: "Daveti kabul et, meydana çık.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          ahlak: 5,
          mesaj: "Tartışmayı ustalıkla kazandın, halk alkışladı.",
          detay: "Fikirlerin artık daha çok kulakta.",
        },
        basarisizSonuc: {
          un: -20,
          mesaj: "Rakibin seni köşeye sıkıştırdı, halk önünde utanç verici yenildin.",
          detay: "Her meydan okuma zaferle bitmez.",
        },
      },
      {
        metin: "Nazikçe reddet, vaktin yok de.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Daveti reddettin, kimse pek önemsemedi.",
          detay: "Her savaş meydanda verilmez.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin korkaklık sayıldı, destekçiler hayal kırıklığına uğradı.",
          detay: "Geri çekilmek zayıflık sanılır.",
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
    metin: "Bir grup genç inançla ilgili zor sorularla seni köşeye sıkıştırıyor. Cevapların geleceklerini şekillendirebilir.",
    secenekler: [
      {
        metin: "Dürüst, açık ve cesur cevap ver.",
        baseBasariSansi: 65,
        basariliSonuc: {
          dost_puani: 10,
          ahlak: 10,
          mesaj: "Dürüstlüğün gençleri derinden etkiledi, sana daha da bağlandılar.",
          detay: "Gerçek cevaplar en zorudur.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Bazı cevapların tartışma çıkardı, kimi ebeveynler şikâyet etti.",
          detay: "Dürüstlük huzursuzluk da getirir.",
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
          detay: "Güvenli yol da bir yoldur.",
        },
        basarisizSonuc: {
          dost_puani: -10,
          mesaj: "Gençler cevaplarını yetersiz buldu: 'o da onlardan biri'.",
          detay: "Kaçınmak güveni kırar.",
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
    metin: "Gelenekçiler üst makamlara seni 'sapkınlıkla' itham eden resmî bir mektup gönderdi. Yanıt vermelisin.",
    secenekler: [
      {
        metin: "Sert, kararlı yanıt yaz; fikirlerini savun.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 20,
          ahlak: 10,
          mesaj: "Yanıtın makamları ikna etti, ithamlar düştü.",
          detay: "Cesurca savunulan fikir güçlüdür.",
        },
        basarisizSonuc: {
          un: -20,
          saglik: -5,
          mesaj: "Yanıtın yetersiz bulundu, bir süre gözetim altına alındın.",
          detay: "Her savunma tutmaz.",
        },
      },
      {
        metin: "Yumuşak, uzlaşmacı yanıt yaz.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yanıtın gerginliği yatıştırdı, itham sessizce kapandı.",
          detay: "Yumuşaklık güçlü kalkandır.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Bazı Yenilikçiler yumuşaklığını 'teslimiyet' saydı.",
          detay: "Uzlaşma kendi safından eleştiri getirir.",
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
    metin: "Büyük ayin gününde kürsü sende. Yenilikçiler'in fikirlerini kalabalığa doğrudan anlatmak için ender bir fırsat.",
    secenekler: [
      {
        metin: "Reform fikirlerini cesurca, doğrudan anlat.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 25,
          dost_puani: 10,
          mesaj: "Vaazın cemaati derinden etkiledi, çoğu senin safına geçti.",
          detay: "Bugün söylediklerin yıllarca hatırlanacak.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -5,
          mesaj: "Cemaatin bir kısmı vaazı sert buldu, huzursuzca ayrıldı.",
          detay: "Her cesur söz sıcak karşılanmaz.",
        },
      },
      {
        metin: "Fikirlerini ölçülü, dolaylı anlat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          un: 10,
          mesaj: "Vaazın kabul gördü, kimseyi ürkütmeden fikirlerini ektin.",
          detay: "Tohum bazen sessizce ekilir.",
        },
        basarisizSonuc: {
          mesaj: "Vaazın fazla belirsiz kaldı, mesaj oturmadı.",
          detay: "Dolaylı anlatım hep anlaşılmaz.",
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
    metin: "Eski Muhafızlar'ın generali, kuşatılmış müttefik kaleye gizli bir mesaj gönderilmesini istiyor. Yollar düşman devriyesiyle dolu.",
    secenekler: [
      {
        metin: "Mesajı {hayvan}'ın bacağına bağla.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "evcil_hayvan_tur:Şahin",
        ],
        kilitAciklamasi: "Bunun için eğitimli bir şahin gerek.",
        basariliSonuc: {
          un: 20,
          dost_puani: 8,
          mesaj: "{hayvan} hatların üzerinden süzülüp mesajı ulaştırdı. General seni övdü.",
          detay: "Kanatlı dost en iyi casustan güvenilir.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Kendin git, geceyle sız.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 15,
          mesaj: "Devriyelerden kaçıp mesajı kendin ulaştırdın; adın efsane oldu.",
          detay: "Bazı kahramanlıklar bizzat yapılır.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 8,
          mesaj: "Devriyeye yakalandın, güçlükle kaçtın; mesaj ulaşmadı.",
          detay: "Cesaret bu kez yetmedi.",
        },
      },
      {
        metin: "Görevi çok riskli bul, reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: -8,
          mesaj: "Görevi reddettin; general surat asıp başkasını gönderdi.",
          detay: "Kaçırılan fırsatın bedeli var.",
        },
        basarisizSonuc: {
          un: -8,
          dost_puani: -5,
          mesaj: "Reddin hizipte 'korkak' damgası getirdi.",
          detay: "Her hayır iz bırakır.",
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
    metin: "Yeni Nizam meydanda gösterişli bir düello düzenliyor: reformcu genç subay, eski düzenin en iyi kılıç ustasına karşı çıkacak. O subay sensin.",
    secenekler: [
      {
        metin: "Kara Kılıç'ı kuşan, düelloyu kazan.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        kilitAciklamasi: "Bunun için efsanevi bir silah gerek.",
        basariliSonuc: {
          un: 25,
          ahlak: -5,
          mesaj: "Kara Kılıç elinde dans etti; rakibin silahı ilk vuruşta düştü. Meydan alkışladı.",
          detay: "Yeni Nizam'ın yıldızı oldun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Kendi kılıcınla savaş.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 18,
          saglik: -5,
          mesaj: "Zorlu düelloda rakibi yendin; halk seni yeni düzenin sembolü ilan etti.",
          detay: "Zafer alın teriyle geldi.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -15,
          mesaj: "Usta seni yendi; Yeni Nizam meydanda küçük düştü.",
          detay: "Her gösteri zaferle bitmez.",
        },
      },
      {
        metin: "Sakatlık bahanesiyle çekil.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: -10,
          mesaj: "Çekildin; hizip hayal kırıklığını gizleyemedi.",
          detay: "Bazı kaçışlar iz bırakır.",
        },
        basarisizSonuc: {
          un: -18,
          mesaj: "Bahanenin yalan olduğu anlaşıldı, alenen küçük düştün.",
          detay: "Yalanlar ortaya çıkar.",
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
    metin: "Liman Loncası'nın büyük tahıl ambarını fareler bastı; haftalar içinde tüm stok çürüyebilir. Ustalar hızlı ve ucuz çözüm bekliyor.",
    secenekler: [
      {
        metin: "{hayvan}'ı ambara sal.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "evcil_hayvan_tur:Kedi",
        ],
        kilitAciklamasi: "Bunun için usta bir fare avcısı gerek.",
        basariliSonuc: {
          ahlak: -3,
          mutluluk: -3,
          para: 20,
          un: 12,
          dost_puani: 10,
          mesaj: "{hayvan} ambarı bir haftada temizledi; ustalar 'ucuz dehan'dan söz ediyor.",
          detay: "Kedin loncanın gözdesi oldu.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Pahalı avcılar ve tuzaklar kirala.",
        baseBasariSansi: 80,
        maliyet: 22,
        basariliSonuc: {
          para: -22,
          un: 8,
          mesaj: "Avcılar işi birkaç günde bitirdi; stok kurtuldu ama kasan hafifledi.",
          detay: "Bazı çözümler pahalıdır.",
        },
        basarisizSonuc: {
          para: -22,
          mesaj: "Fareler daha hızlı çıktı; hem masraf hem stok kaybı yaşandı.",
          detay: "Her yatırım tutmaz.",
        },
      },
      {
        metin: "Görmezden gel, kaybı göze al.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: -15,
          mesaj: "Fareler doyana kadar yedi; kayıp cebinden gitti ama uğraşmadın.",
          detay: "Hiçbir şey yapmak da bedel öder.",
        },
        basarisizSonuc: {
          para: -30,
          un: -8,
          mesaj: "Kayıp çok büyüdü; lonca seni 'ilgisiz' diye eleştirdi.",
          detay: "Görmezden gelmek nadiren ucuzdur.",
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
    metin: "Pazar Birliği, rakip loncanın kibirli temsilcisiyle bahse girdi: çok kâr eden mahalle çeşmesini onaracak. Birliğin gözü sende.",
    secenekler: [
      {
        metin: "Gölge Sikke'yi gizlice kullan.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:golge_sikke",
        ],
        kilitAciklamasi: "Bunun için gizemli bir sikke gerek.",
        basariliSonuc: {
          para: 20,
          un: 15,
          ahlak: -12,
          mesaj: "Sikke sana göz kırptı; şansın döndü, rakibi ezici farkla geçtin.",
          detay: "Zafer tatlı, ama nasıl kazandığını sen bilirsin.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Dürüstçe, olağan becerinle yarış.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: -7,
          para: 18,
          un: 6,
          mesaj: "Sıkı rekabetle birliği onurlandırdın; çeşme rakibe kaldı, gurur sende.",
          detay: "Dürüst zafer daha tatlıdır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          un: -10,
          mesaj: "Rakip lonca geçti; birlikte biraz itibar kaybettin.",
          detay: "Her yarış kazanılmaz.",
        },
      },
      {
        metin: "Bahisten çekil, onuru boşver.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: -8,
          mesaj: "Çekildin; üyeler arkandan fısıldadı ama risk almadın.",
          detay: "Girmemek de seçimdir.",
        },
        basarisizSonuc: {
          un: -12,
          dost_puani: -5,
          mesaj: "Çekilmen 'korkaklık' sayıldı, birlikteki saygın yerin sarsıldı.",
          detay: "Her geri adım aynı okunmaz.",
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
    metin: "Gelenekçiler, cemaatte büyüyen şüpheciliği bastırmak için büyük bir vaaz istiyor. Meydan dolacak; inancını en güçlü biçimde kanıtlamalısın.",
    secenekler: [
      {
        metin: "Kutsal Kalıntı'yı cemaate göster.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "esya:kutsal_kalinti",
        ],
        kilitAciklamasi: "Bunun için kutsal bir kalıntı gerek.",
        basariliSonuc: {
          ahlak: 15,
          un: 22,
          mesaj: "Kalıntıyı kaldırdığın an meydan sustu; şüpheciler bile diz çöktü.",
          detay: "Bazı kanıtlar bin vaazdan güçlüdür.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Yalnız hitabetine ve sözlerine güven.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 10,
          un: 15,
          mesaj: "Sözlerin yüreklere dokundu; şüpheciler bile alkışladı.",
          detay: "En güçlü kanıt inancın kendisidir.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Vaaz etki yaratmadı; şüpheciler daha da cesaretlendi.",
          detay: "Her hitabet meydanı fethetmez.",
        },
      },
      {
        metin: "Vaazı ertele, hazırlıksız çıkma.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: -6,
          mesaj: "Vaaz ertelendi; cemaat anlayış gösterdi, şüpheciler bir hafta daha konuştu.",
          detay: "Bazı ertelemeler pahalıdır.",
        },
        basarisizSonuc: {
          un: -14,
          mesaj: "Erteleme 'kararsızlık' sayıldı, itibarın sarsıldı.",
          detay: "Liderlik an be an sınanır.",
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
    metin: "Yenilikçiler dogma yerine coşkuyla takipçi çekmek istiyor. Biri, kalabalığa 'göksel bir ses' duyurmanın inancı alevlendireceğini fısıldadı.",
    secenekler: [
      {
        metin: "{hayvan}'ı kürsünün ardında konuştur.",
        baseBasariSansi: 85,
        gerekliEtiketler: [
          "evcil_hayvan_tur:Papağan",
        ],
        kilitAciklamasi: "Bunun için taklitçi, eğitimli bir kuş gerek.",
        basariliSonuc: {
          un: 20,
          ahlak: -18,
          mesaj: "Kürsüden yükselen 'göksel ses' kalabalığı ağlattı; yeni takipçiler akın etti.",
          detay: "İnananlar sevindi, gerçeği sen taşıyorsun.",
        },
        basarisizSonuc: {
          un: -20,
          ahlak: -18,
          mesaj: "{hayvan} yanlış anda bambaşka bir şey söyledi! Kalabalık gülerek dağıldı.",
          detay: "Sahte mucize kendini ele verir.",
        },
      },
      {
        metin: "Yalnız içten bir vaazla coşku yarat.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 10,
          un: 12,
          mesaj: "İçten sözlerin birkaç takipçi kazandırdı; büyüme yavaş ama sağlam.",
          detay: "Dürüst tohum yavaş da olsa kök salar.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Vaazın ilgi görmedi, kalabalık dağıldı.",
          detay: "Her gün ilham gelmez.",
        },
      },
      {
        metin: "Fikri reddet, gösteriye girme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 6,
          un: -6,
          mesaj: "Fikri reddettin; bazıları 'fazla tutucu' dese de vicdanın rahat.",
          detay: "Bazı sınırlar çizilmeli.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Reddin 'cesaretsizlik' sayıldı, hizbin genç kanadı uzaklaştı.",
          detay: "İlkenin de bedeli olabilir.",
        },
      },
    ],
  },
];
