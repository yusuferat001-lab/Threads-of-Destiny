import type { OlayTanimi } from "./types";

export const OLAY_ILISKILER: OlayTanimi[] = [
  {
    id: "iliski_ikinci_teklif",
    kategori: "sosyal",
    gerekliEtiketler: [
      "iliski_ikinci_teklif_zamani",
    ],
    yasakliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "💐",
    baslik: "Beklenen Aşk",
    metin: "Yıllar süren yalnızlığın ardından, pazarda çarpıştığın ve gözlerine bakakaldığın o sıradan insan... Zengin değil, nüfuzlu değil ama kalbin ilk defa bu kadar hızlı atıyor.",
    secenekler: [
      {
        metin: "Hislerinin peşinden git ve evlen.",
        baseBasariSansi: 80,
        ipucu: "Muazzam mutluluk, sıfır maddi çıkar",
        basariliSonuc: {
          es_ata: true,
          mutluluk: 30,
          etiket_ekle: [
            "medeni:evli",
            "itibar:fakir_ama_mutlu",
          ],
          etiket_sil: [
            "iliski_ikinci_teklif_zamani",
          ],
          mesaj: "Çok sade bir törenle evlendiniz. Soframızda sadece kuru ekmek var ama o varken bir saray ziyafeti gibi geliyor.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          etiket_sil: [
            "iliski_ikinci_teklif_zamani",
          ],
          mesaj: "Aşkına karşılık bulamadın. O, başka bir şehirde yaşamayı seçti ve kalbini paramparça edip gitti.",
        },
      },
      {
        metin: "Aşk karın doyurmaz, yalnızlığıma devam edeyim.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 5,
          etiket_sil: [
            "iliski_ikinci_teklif_zamani",
          ],
          mesaj: "Duygularını bastırdın ve mantığını seçtin. Kasan belki dolacak ama o gözler hayatın boyunca aklından çıkmayacak.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          etiket_sil: [
            "iliski_ikinci_teklif_zamani",
          ],
          mesaj: "Mantığını seçtin ama acı çekiyorsun.",
        },
      },
    ],
  },
  {
    id: "iliski_ev_ici_kavga",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "😤",
    baslik: "Kırılan Vazo",
    metin: "{es} ile maddi sıkıntılar (veya ilgisizliğin) yüzünden başlayan küçük bir tartışma kontrolden çıktı. Elindeki vazoyu yere fırlatıp bağırmaya başladı.",
    secenekler: [
      {
        metin: "Tepkini sert koy, otoriteni sarsma.",
        baseBasariSansi: 55,
        ipucu: "Büyük gerilim, evlilik çatırdar",
        basariliSonuc: {
          es_puani: -10,
          un: 5,
          mesaj: "Sesini ondan daha çok yükselttin. Sustu ve odayı terk etti. Bu savaşı kazandın ama evliliğin yara aldı.",
        },
        basarisizSonuc: {
          es_puani: -25,
          mutluluk: -15,
          durum_ekle: {
            id: "evlilik_tehlikede",
            ad: "Boşanma Eşiği",
            tur: "gecici",
            kalan_tur: 3,
            tur_basi_mutluluk: -5,
          },
          mesaj: "Sözlerin o kadar ağır ve kırıcıydı ki, {es} eşyalarını toplamaya başladı. Uçurumun eşiğindesiniz.",
        },
      },
      {
        metin: "Kırıkları kendi ellerinle topla, sarıl ve yatıştır.",
        baseBasariSansi: 75,
        ipucu: "Gurur kırıcı ama ilişkiyi kurtarır",
        basariliSonuc: {
          es_puani: 20,
          ahlak: 10,
          mesaj: "Öfkeyle karşılık vermek yerine eğilip kırıkları topladın. O da ağlayarak sana yardım etti. Fırtına dindi.",
        },
        basarisizSonuc: {
          es_puani: -5,
          mutluluk: -8,
          mesaj: "Sarılmaya çalıştın ama seni itti. Öfkesinin dinmesi için zamana ihtiyacı var.",
        },
      },
    ],
  },
  {
    id: "iliski_es_gizli_talep",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "🤫",
    baslik: "Eşin Tehlikeli Sırrı",
    metin: "{es} akşam yemeğinden sonra kapıları sıkıca kilitledi. Titreyen bir sesle, bir tefeciye büyük bir kumar borcu olduğunu ve eğer ödemezse hayatının tehlikede olduğunu itiraf etti.",
    secenekler: [
      {
        metin: "Sorgusuz sualsiz borcu kapat.",
        baseBasariSansi: 90,
        maliyet: 40,
        ipucu: "Ciddi bir mali çöküş ama sonsuz bir minnet",
        basariliSonuc: {
          para: -40,
          es_puani: 35,
          etiket_ekle: [
            "itibar:esi_icin_feda_eden",
          ],
          mesaj: "Tüm birikimini tefeciye verip onu kurtardın. {es} sana bir ömür boyu köle gibi sadık kalacak.",
        },
        basarisizSonuc: {
          para: -40,
          es_puani: 10,
          mesaj: "Parayı verdin ama tefeciler faizi bahane edip kapınızı aşındırmaya devam etti.",
        },
      },
      {
        metin: "Bu senin suçun, kendi başının çaresine bak de.",
        baseBasariSansi: 60,
        ipucu: "Paranı korursun, ancak eşinin hayatını tehlikeye atarsın",
        basariliSonuc: {
          es_puani: -30,
          ahlak: -15,
          mesaj: "Parana dokunmadın. {es} günlerce eve gelmedi, borcunu nasıl ödediğini bilmiyorsun ve sormaya korkuyorsun.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -25,
          un: -20,
          mesaj: "Tefeciler {es}'i sokağın ortasında feci şekilde darp etti. Hastanede son nefesini verdi. Herkes senin ne kadar cimri olduğunu konuşuyor.",
        },
      },
    ],
  },
  {
    id: "iliski_bosanma_esigi",
    kategori: "sosyal",
    ton: "agir",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    agirlik: 0.6,
    gorsel: "💔",
    baslik: "Kopuk İpler",
    metin: "Evdeki sessizlik bıçak gibi keskin. {es} ile aranızdaki bağlar tamamen koptu. Ya tüm gururunu ve cüzdanını feda edip bu evliliği omuzlayacaksın, ya da çocukları ve aileni de sarsacak o ağır kararı vereceksin.",
    secenekler: [
      {
        metin: "Gururunu yut, her şeyi düzeltmek için çabala.",
        baseBasariSansi: 55,
        maliyet: 20,
        ipucu: "Gurur kırıcı ve masraflı ama evliliği kurtarabilir",
        basariliSonuc: {
          para: -20,
          es_puani: 30,
          mutluluk: 10,
          mesaj: "Hediyeler, tavizler ve uzun gözyaşları işe yaradı. Evlilik kurtuldu ama iplerin kimin elinde olduğu artık belli.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -20,
          para: -20,
          etiket_ekle: [
            "kalici:bosanmis",
          ],
          mesaj: "Tüm çabana ve harcadığın paraya rağmen {es} evi terk etti. Hem paran gitti hem ailen dağıldı.",
        },
      },
      {
        metin: "Bitsin bu iş, mahkemeye (veya kadıya) git.",
        baseBasariSansi: 90,
        ipucu: "Yüklü bir nafaka ödersin, toplumda dul/boşanmış damgası yersin",
        basariliSonuc: {
          es_kaybet: true,
          mutluluk: -10,
          para: -30,
          etiket_ekle: [
            "kalici:bosanmis",
          ],
          mesaj: "Ayrılık acı vericiydi. Eşyalar paylaşıldı, cüzdanın boşaldı ama en azından o boğucu sessizlik bitti.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -25,
          para: -40,
          ahlak: -5,
          etiket_ekle: [
            "kalici:bosanmis",
          ],
          mesaj: "Süreç iğrenç bir dedikodu savaşına döndü. Adın lekelendi, servetinin yarısını mahkemede bıraktın.",
        },
      },
    ],
  },
  {
    id: "iliski_es_hastalik",
    kategori: "saglik",
    ton: "agir",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    agirlik: 0.5,
    gorsel: "🕊️",
    baslik: "Ölümün Nefesi",
    metin: "{es} ağır bir hastalığa yakalandı. Yüzü kireç gibi, nefes almakta zorlanıyor. Uzaklardan getirilecek çok pahalı bir hekimin onu kurtarma şansı var ama bu seni iflasa sürükleyebilir.",
    secenekler: [
      {
        metin: "Dükkanı sat, borca gir, o hekimi getirt!",
        baseBasariSansi: 60,
        maliyet: 40,
        ipucu: "Maddi çöküş, ancak en yüksek kurtulma ihtimali",
        basariliSonuc: {
          es_puani: 40,
          mutluluk: 15,
          para: -40,
          etiket_ekle: [
            "es_minnettar",
          ],
          mesaj: "Hekim tam zamanında yetişti! {es} ölümün kıyısından döndü. Kasan bomboş ama evinde nefes alan bir can var.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -30,
          saglik: -10,
          para: -40,
          etiket_ekle: [
            "kalici:dul",
            "kalici:es_acisi",
          ],
          mesaj: "Parayı su gibi akıttın ama yetmedi. {es} ellerinin arasında son nefesini verdi. Ev artık buz gibi bir mezar.",
        },
      },
      {
        metin: "Param yok, kader ne yazdıysa o olur.",
        baseBasariSansi: 25,
        ipucu: "Ahlaken çöküntü ve yüksek ölüm riski",
        basariliSonuc: {
          es_puani: 10,
          mesaj: "Bir mucize oldu! {es} kendi vücut direnciyle hastalığı yendi. Ancak parayı kıskanman aranızda görünmez bir duvar ördü.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          ahlak: -15,
          mutluluk: -30,
          etiket_ekle: [
            "kalici:dul",
            "vicdan_azabi",
          ],
          mesaj: "{es} acılar içinde can verdi. Cenazesinde herkes senin ne kadar 'tutumlu' olduğunu fısıldaşıyordu.",
        },
      },
    ],
  },
  {
    id: "rakip_ekip_teklifi",
    kategori: "siyaset",
    minYas: 18,
    minRakipPuani: 70,
    yasakliEtiketler: [
      "rakip:ekibe_katildi",
    ],
    gorsel: "🕊️",
    baslik: "Düşmanımın Kılıcı",
    metin: "Kanlı bıçaklı olduğun {rakip} gece vakti kapına geldi. Çaresiz. Güçlü bir ortak düşmanınız var ve 'Eğer beni yanına almazsan ikimiz de yok olacağız' diyor.",
    secenekler: [
      {
        metin: "Sana güvenmiyorum ama gücüne ihtiyacım var (İşe al).",
        baseBasariSansi: 65,
        maliyet: 40,
        ipucu: "Düşmanı ekibe katmak büyük risk taşır ama çok kalitelidir",
        basariliSonuc: {
          para: -40,
          rakip_puani: -50,
          etiket_ekle: [
            "rakip:ekibe_katildi",
          ],
          ekip_ekle: {
            rol: "Eski Rakip",
            tahminGenisligi: 30,
          },
          mesaj: "Eski düşmanın artık senin komutanın/yardımcın. Sırtını ona dönerken hâlâ ürperiyorsun ama kılıcı senin için kalkıyor.",
        },
        basarisizSonuc: {
          para: -40,
          saglik: -20,
          mesaj: "Tuzaktı! Kapıdan girdiği gibi sana saldırdı, muhafızlar zor kurtardı.",
        },
      },
      {
        metin: "Bir yılanla aynı çuvala girmem! Defol.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Kapıyı suratına kapattın. İhtiyatlı olmak seni hayatta tutar.",
        },
        basarisizSonuc: {
          rakip_puani: 15,
          un: -10,
          mesaj: "{rakip} ertesi gün ortak düşmanınıza katıldı ve senin sonunu getirmeye yemin etti.",
        },
      },
    ],
  },
  {
    id: "genel_ikilem_dost",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "⚖️",
    baslik: "İki Dost Arasında",
    metin: "Birbirine düşman olan iki yakın dostun var. Biri yıllardır yanında olan sadık ama fakir bir dost; diğeri yeni tanıdığın, nüfuzlu ve faydalı biri. İkisi de taraf seçmeni istiyor.",
    secenekler: [
      {
        metin: "Eski, sadık dostunun yanında ol.",
        baseBasariSansi: 75,
        ipucu: "Vicdan ve sadakat, fırsat kaybı",
        basariliSonuc: {
          ahlak: 22,
          saglik: 8,
          para: -12,
          un: -8,
          etiket_ekle: [
            "sadik_dost",
          ],
          mesaj: "Eski dostunun yanında durdun; o da ömrü boyunca senin yanında durdu.",
          detay: "Nüfuzlu adam kapıları kapattı ve bu sana pahalıya patladı. Ama hastalandığında başucunda oturan kişi, o kapıları kapatan adam değildi.",
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          ahlak: 18,
          mesaj: "Sadık kaldın ama dostun kavgayı kaybetti; ikiniz de zarar gördünüz.",
          detay: "Doğru tarafta olmak, kazanan tarafta olmak değil. İkiniz de kaybettiniz ve birbirinize kaldınız.",
        },
      },
      {
        metin: "Nüfuzlu yeni dostunun yanında ol.",
        baseBasariSansi: 70,
        ipucu: "Kariyer ve para, ihanetin ağırlığı",
        basariliSonuc: {
          para: 32,
          un: 18,
          ahlak: -25,
          maas_carpani: 1.15,
          mesaj: "Nüfuzlu dostun kazandı ve seni de yanında yükseltti.",
          detay: "Eski dostun sana yazdığı mektuba hiç cevap vermedin. Kariyerin uçuyor ve o mektup hâlâ çekmecende duruyor.",
        },
        basarisizSonuc: {
          para: -18,
          un: -20,
          ahlak: -22,
          mesaj: "Nüfuzlu dostun kavgayı kaybetti ve seni tanımadığını söyledi.",
          detay: "Eski dostunu sattın ve yenisi seni tanımadı bile. Elinde ne dostluk kaldı ne kariyer; sadece yaptığın seçim kaldı.",
        },
      },
    ],
  },
  {
    id: "genel_eski_dost_ziyareti",
    kategori: "sosyal",
    agirlik: 0.4,
    gorsel: "🍷",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Çocukluk Arkadaşı",
    metin: "Yıllardır görmediğin bir çocukluk arkadaşın şehrine geldi. Şimdi çok farklı bir hayatı var ve sana eski günlerden bahsetmek istiyor.",
    secenekler: [
      {
        metin: "Onunla vakit geçir, eski günleri yad et.",
        baseBasariSansi: 90,
        ipucu: "Küçük ama sıcak bir an",
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Güzel bir akşam geçirdiniz; eski dostluğunuz tazelendi.",
          detay: "Bazen geçmişe kısa bir yolculuk, bugüne iyi gelir.",
        },
        basarisizSonuc: {
          mesaj: "Aranızdaki fark öyle büyümüş ki eski sohbet havası bir türlü kurulamadı.",
          detay: "Bazı dostluklar zamanla farklı yollara ayrılıyor.",
        },
      },
      {
        metin: "İşin yoğun, kısa kes.",
        baseBasariSansi: 95,
        ipucu: "Zaman kazanırsın, pişmanlık duyabilirsin",
        basariliSonuc: {
          para: 5,
          mesaj: "İşine döndün; arkadaşın anlayışla ayrıldı.",
          detay: "Belki güzel bir anı kaçırdın ama işlerin aksamadı.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mesaj: "Arkadaşın kırgın ayrıldı; bir daha haber alamadın.",
          detay: "Bazı fırsatlar bir daha geri gelmiyor.",
        },
      },
    ],
  },
  {
    id: "iliski_dost_zor_durumda",
    kategori: "sosyal",
    minYas: 16,
    gorsel: "🤝",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dostun Zor Durumda",
    metin: "{dost} kapına dayandı; borçları büyümüş, eli boş kalmış. Senden yardım istiyor ama bu kolay bir yardım olmayacak.",
    secenekler: [
      {
        metin: "Elindeki parayı paylaş, {dost}'a yardım et.",
        baseBasariSansi: 80,
        ipucu: "Dostluğun güçlenir, cepten para gider",
        basariliSonuc: {
          para: -20,
          dost_puani: 20,
          ahlak: 15,
          mesaj: "{dost} gözlerinin dolduğunu gördün; bu yardımı asla unutmayacağını söyledi.",
          detay: "Zor günde yanında olmak, dostluğun gerçek sınavıdır.",
        },
        basarisizSonuc: {
          para: -25,
          dost_puani: 5,
          mesaj: "Yardımın yetmedi ama {dost} yine de çabanı takdir etti.",
          detay: "Bazen elden gelen az olsa da niyet önemlidir.",
        },
      },
      {
        metin: "Kendi işlerin de zor, özür dile ve geri çevir.",
        baseBasariSansi: 90,
        ipucu: "Cepten para gitmez, dostluk zedelenir",
        basariliSonuc: {
          dost_puani: -20,
          mesaj: "{dost} anladığını söyledi ama gözlerindeki hayal kırıklığı gizlenemedi.",
          detay: "Reddetmek bazen mantıklıdır, ama bedelsiz de değildir.",
        },
        basarisizSonuc: {
          dost_puani: -30,
          un: -10,
          ahlak: -10,
          mesaj: "{dost} bu reddedişi çevrende anlattı; bazı insanlar seni daha soğuk ve bencil buldu.",
          detay: "Zor günde yüz çevirmek, sandığından daha çok konuşuluyor.",
        },
      },
    ],
  },
  {
    id: "iliski_rakip_teklifi",
    kategori: "siyaset",
    minYas: 17,
    gorsel: "🃏",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rakibinin Teklifi",
    metin: "{rakip} seninle uzun süredir çekişiyordu, ama bugün kapına bir ortaklık teklifiyle geldi. Samimi mi, yoksa bir tuzak mı, kestiremiyorsun.",
    secenekler: [
      {
        metin: "Teklifi kabul et, {rakip} ile güç birliği yap.",
        baseBasariSansi: 55,
        ipucu: "Büyük fırsat ya da büyük hata",
        basariliSonuc: {
          para: 35,
          rakip_puani: 30,
          mesaj: "Ortaklık işe yaradı; {rakip} ile aranızdaki gerginlik şaşırtıcı bir şekilde eridi.",
          detay: "Bazen en büyük rakibin en güvenilir ortağına dönüşebiliyor.",
        },
        basarisizSonuc: {
          para: -25,
          rakip_puani: -25,
          un: -15,
          mesaj: "Tuzaktı. {rakip} seni kullanıp bir kenara bıraktı. Paran ve itibarın yara aldı.",
          detay: "Rakibinin elini bir kez daha sıkmadan önce iki kez düşünmen gerekirdi.",
        },
      },
      {
        metin: "Teklifi reddet, mesafeni koru.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama fırsat kaçar",
        basariliSonuc: {
          rakip_puani: -10,
          mesaj: "{rakip} reddedilişini soğukkanlılıkla karşıladı ama aranızdaki mesafe arttı.",
          detay: "Temkinli olmak seni kayıptan korudu, kazançtan da.",
        },
        basarisizSonuc: {
          rakip_puani: -20,
          un: -10,
          mesaj: "{rakip} reddedilişini çevrende 'korkaklık' olarak anlattı.",
          detay: "Bazı rekabetler, reddedilince daha da kızışıyor.",
        },
      },
    ],
  },
  {
    id: "iliski_dostla_kavga",
    kategori: "sosyal",
    minYas: 18,
    gorsel: "💢",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dostunla Anlaşmazlık",
    metin: "{dost} ile aranızda küçük bir söz yüzünden büyüyen bir tartışma çıktı. Bu, uzun yıllar süren bir dostluğu bitirebilir.",
    secenekler: [
      {
        metin: "Gururunu bir kenara bırak, önce sen barış yap.",
        baseBasariSansi: 75,
        ipucu: "Dostluk kurtulur, gurur yara alır",
        basariliSonuc: {
          dost_puani: 25,
          ahlak: 10,
          mesaj: "{dost} elini uzattığını görünce gülümsedi; eski günlere döndünüz.",
          detay: "Bazen ilk adımı atmak, kaybetmek değil kazanmaktır.",
        },
        basarisizSonuc: {
          dost_puani: 5,
          mesaj: "Barış çabası tam istediğin gibi karşılık bulmadı ama en azından kapı kapanmadı.",
          detay: "Her özür anında kabul görmez, zamana ihtiyaç olabilir.",
        },
      },
      {
        metin: "İnat et, haklı olduğunu düşünüyorsun.",
        baseBasariSansi: 60,
        ipucu: "Onurunu korursun, dostluk zedelenir",
        basariliSonuc: {
          ahlak: 5,
          dost_puani: -15,
          mesaj: "Haklıydın ama {dost} bunu kabul etmek yerine senden uzaklaştı.",
          detay: "Haklı çıkmak bazen en pahalı zaferdir.",
        },
        basarisizSonuc: {
          dost_puani: -30,
          mutluluk: -15,
          mesaj: "Tartışma büyüdü; {dost} artık seninle eskisi gibi konuşmuyor.",
          detay: "Bazı sözler geri alınamayacak kadar derin yaralar açar.",
        },
      },
    ],
  },
  {
    id: "iliski_rakip_dedikodu",
    kategori: "sosyal",
    minYas: 17,
    gorsel: "🗣️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rakibin Dedikodusu",
    metin: "{rakip}'in senin hakkında asılsız bir dedikodu yaydığını öğrendin; çevrende bazı insanlar buna inanmaya başlamış bile.",
    secenekler: [
      {
        metin: "{rakip} ile yüzleş, gerçeği herkesin önünde söyle.",
        baseBasariSansi: 55,
        ipucu: "İtibarını temizleyebilir ya da daha çok yayabilir",
        basariliSonuc: {
          un: 20,
          rakip_puani: -20,
          mesaj: "Yüzleşme işe yaradı; dedikodu sönümlendi, sen haklı çıktın.",
          detay: "Bazen gerçeği yüksek sesle söylemek en iyi savunmadır.",
        },
        basarisizSonuc: {
          un: -20,
          rakip_puani: -25,
          mesaj: "Yüzleşme çirkinleşti; dedikodu bu sayede daha da yayıldı.",
          detay: "Bazı ateşler üzerine gidince daha çok büyür.",
        },
      },
      {
        metin: "Görmezden gel, zamanla unutulur diye düşün.",
        baseBasariSansi: 70,
        ipucu: "Sakin ama riskli bekleyiş",
        basariliSonuc: {
          mesaj: "Dedikodu gerçekten de zamanla sönümlendi; sen de sinirlerini yormadın.",
          detay: "Her ateşe koşmak gerekmiyor, bazıları kendi kendine söner.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Sessizliğin bazıları tarafından 'suçun kabulü' olarak yorumlandı.",
          detay: "Görmezden gelmek her zaman en güvenli yol değildir.",
        },
      },
    ],
  },
  {
    id: "tepki_es_iddiali_soz",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "💢",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ev İçi Bir Söz Düellosu",
    metin: "{es} ile bir konuda anlaşamadınız; tartışma büyüdü. Ağzından çıkacak bir sonraki söz, bu geceyi ya onaracak ya da derinleştirecek.",
    secenekler: [
      {
        metin: "Konuyu kapat, 'sonra konuşuruz' de.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama çözümsüz",
        basariliSonuc: {
          es_puani: -5,
          mesaj: "Tartışmayı erteledin; ev sessizleşti ama mesele havada asılı kaldı.",
          detay: "Bazı konular ertelenince küçülmüyor, sadece bekliyor.",
        },
        basarisizSonuc: {
          es_puani: -10,
          mutluluk: -8,
          mesaj: "'Sonra konuşuruz' dedin ama {es} bunu kaçış olarak gördü.",
          detay: "Erteleme bazen kaçış gibi duyuluyor.",
        },
      },
      {
        metin: "Sert, geri alamayacağın bir şey söylemek üzeresin.",
        baseBasariSansi: 50,
        ipucu: "Riskli, ilişkiyi ciddi sarsabilir",
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Kelimeler dilinin ucunda. {es}'in gözlerindeki ifade değişiyor; bu cümleyi kurarsan geri dönüşü zor olabilir.",
          geriCekilMetni: "Son anda yut, sözünü yumuşat.",
          geriCekilSonucu: {
            es_puani: 5,
            mutluluk: -3,
            mesaj: "Söyleyeceğini yuttun; zor oldu ama {es} bunu fark etti ve biraz yumuşadı.",
            detay: "Bazen en güçlü söz, söylenmeyen sözdür.",
          },
          devamMetni: "Söyle. Artık durdurulamaz.",
          devamSonucu: {
            es_puani: -25,
            ahlak: -10,
            mutluluk: -15,
            mesaj: "Sözler ağzından çıktı, geri alınamadı. {es} sessizce odadan çıktı.",
            detay: "Bazı cümleler bir ilişkide kalıcı çatlaklar bırakır.",
          },
        },
      },
    ],
  },
  {
    id: "tepki_dost_agir_soz",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "😤",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dostluğu Sınayan An",
    metin: "{dost} ile aranızda küçük bir yanlış anlaşılma büyüdü. Ağzından çıkacak ağır bir söz, yıllarca süren bu dostluğu sarsabilir.",
    secenekler: [
      {
        metin: "Derin bir nefes al, konuyu yumuşat.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, dostluğu korur",
        basariliSonuc: {
          dost_puani: 10,
          mesaj: "Sakin kaldın; {dost} bunu takdir etti.",
          detay: "Bazı dostluklar sabırla ayakta kalır.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Yumuşatmaya çalıştın ama sesindeki gerginlik gizlenemedi.",
          detay: "Her iyi niyet aynı şekilde algılanmıyor.",
        },
      },
      {
        metin: "Ağır bir söz söylemek üzeresin.",
        baseBasariSansi: 50,
        ipucu: "Riskli, dostluğu bitirebilir",
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "{dost}'un yüzündeki ifade değişiyor. Söyleyeceğin cümle, bu dostluğun geleceğini belirleyebilir.",
          geriCekilMetni: "Son anda yut, konuyu değiştir.",
          geriCekilSonucu: {
            dost_puani: 5,
            mesaj: "Sözünü yuttun; {dost} bir şey fark etmiş gibi görünse de üstünde durmadı.",
            detay: "Bazı cümleler söylenmeden daha iyidir.",
          },
          devamMetni: "Söyle. Artık geri dönüş yok.",
          devamSonucu: {
            dost_puani: -25,
            mutluluk: -10,
            mesaj: "Sözler ağzından çıktı. {dost} sessizce uzaklaştı, aranıza bir mesafe girdi.",
            detay: "Bazı sözler bir dostluğu bir daha eskisi gibi yapmaz.",
          },
        },
      },
    ],
  },
  {
    id: "tepki_rakip_meydan_okuma",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "😠",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Meydan Okuma Anı",
    metin: "{rakip} yine seninle ilgili kötü bir söz yaydığını duydun. Karşına çıktığında, herkesin önünde onunla hesaplaşmak üzeresin.",
    secenekler: [
      {
        metin: "Görmezden gel, yoluna devam et.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama tatminsiz",
        basariliSonuc: {
          mutluluk: -5,
          ahlak: 5,
          mesaj: "Görmezden geldin; içten içe rahatsız olsan da olgun davrandın.",
          detay: "Her kavga kazanılmaya değmez.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Görmezden gelmeye çalıştın ama içindeki öfke seni yordu.",
          detay: "Bastırmak bazen daha da yoruyor.",
        },
      },
      {
        metin: "Herkesin önünde onunla yüzleş.",
        baseBasariSansi: 50,
        ipucu: "Riskli, itibar kazanır ya da kaybedersin",
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "{rakip} karşında, etraftakiler durup izlemeye başladı. Bir adım daha atarsan bu artık geri dönülemez bir yüzleşmeye dönüşecek.",
          geriCekilMetni: "Son anda vazgeç, sırtını dön.",
          geriCekilSonucu: {
            mutluluk: 5,
            rakip_puani: 5,
            mesaj: "Son anda vazgeçtin; {rakip} şaşkın bakışlarla seni izledi.",
            detay: "Bazen en güçlü hamle, hamle yapmamaktır.",
          },
          devamMetni: "Hayır. Sonuna kadar git.",
          devamSonucu: {
            un: 15,
            rakip_puani: -20,
            ahlak: -5,
            mesaj: "Yüzleşme kalabalığın önünde gerçekleşti; {rakip} geri adım attı ama aranız daha da bozuldu.",
            detay: "Kazandığın gurur, büyüttüğün düşmanlıkla eşit ağırlıkta geldi.",
          },
        },
      },
    ],
  },
  {
    id: "iliski_ilk_ask",
    agirlik: 1.4,
    kategori: "sosyal",
    maxYas: 20,
    gorsel: "💓",
    baslik: "İlk Aşk",
    metin: "Mahalledeki biri kalbini hızlandırıyor. Her karşılaştığınızda dilin tutuluyor, ama bu duyguyu daha ne kadar saklayabilirsin?",
    secenekler: [
      {
        metin: "Duygularını açıkça söyle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 15,
          dost_puani: 5,
          mesaj: "Kalbin gibi sözlerin de karşılık buldu, günlerce bulutların üstünde yürüdün.",
          detay: "İlk aşk bir daha asla aynı tatta gelmez.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Kibarca reddedildin, yüzün kızardı ve haftalarca ondan kaçındın.",
          detay: "Her kalp aynı anda çarpmaz.",
        },
      },
      {
        metin: "İçinde tut, cesaret edemedin.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Duygularını kimseye açmadın, güvenli ama biraz da hüzünlü bir sessizlik seçtin.",
          detay: "Bazı duygular sadece kendine ait kalır.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Söylemediğin sözler için kendini yıllarca 'keşke' diyerek suçladın.",
          detay: "Cesaretsizlik bazen en büyük pişmanlıktır.",
        },
      },
    ],
  },
  {
    id: "eski_rakiple_son_karsilasma",
    agirlik: 1.4,
    kategori: "sosyal",
    minYas: 58,
    gorsel: "⚡",
    baslik: "Son Karşılaşma",
    metin: "Yıllardır tanıdığın rakibin {rakip}, yaşlanmış ve yorgun görünüyor. Belki de son kez karşı karşıyasınız.",
    secenekler: [
      {
        metin: "Barış teklif et, geçmişi kapat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          rakip_puani: 20,
          mutluluk: 10,
          mesaj: "{rakip} şaşkınlıkla elini sıktı, yıllardır süren gerginlik bir anda eridi.",
          detay: "Bazı savaşların en iyi bitişi barıştır.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "{rakip} teklifini reddetti, 'çok geç' dedi soğuk bir sesle.",
          detay: "Her barış eli tutulmaz.",
        },
      },
      {
        metin: "Eski hesapları kapatmadan gitme, meydan oku.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 15,
          rakip_puani: -10,
          mesaj: "Son bir kez üstünlüğünü kanıtladın, {rakip} sessizce çekildi.",
          detay: "Bazı insanlar barışı değil, kapanışı ister.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Son karşılaşma bekleneni vermedi, ikiniz de yorgun ve kırgın ayrıldınız.",
          detay: "Bazı hesaplar hiç kapanmaz.",
        },
      },
    ],
  },
  {
    id: "bekarlik_ozgurluk_hissi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 20,
    gorsel: "🕊️",
    baslik: "Bekarlığın Özgürlüğü",
    metin: "Kimseye hesap vermeden istediğin gibi yaşamanın tadını çıkarıyorsun. Bugün de kendi kararlarını kendin veriyorsun.",
    secenekler: [
      {
        metin: "Bu özgürlüğü değerlendir, kendine zaman ayır.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 8,
          mesaj: "Kendine ayırdığın zaman seni tazeledi.",
          detay: "Bazen en iyi arkadaşlık kendinledir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Yalnız zaman güzeldi ama beklediğin kadar tatmin edici olmadı.",
          detay: "Her yalnızlık huzur getirmiyor.",
        },
      },
      {
        metin: "Yalnızlığın ağırlığını hisset.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mesaj: "Yalnızlığın bir süre ağırlaştı ama sonra kabullendin.",
          detay: "Bazı duygular kabul edilmeyi bekler.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          saglik: -5,
          mesaj: "Yalnızlık bugün beklediğinden çok daha ağır bastı. Göğsün sıkıştı.",
          detay: "Her gün aynı kolaylıkta geçmiyor.",
        },
      },
    ],
  },
  {
    id: "bekarlik_aile_baskisi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 26,
    gorsel: "👪",
    baslik: "Ne Zaman Evleneceksin?",
    metin: "Ailenden biri yine aynı soruyu sordu: 'Ne zaman evleneceksin?' Bu kez sabrın biraz taştı.",
    secenekler: [
      {
        metin: "Sabırla, gülümseyerek karşılık ver.",
        baseBasariSansi: 85,
        basariliSonuc: {
          dost_puani: 5,
          mesaj: "Sabırlı yanıtın gerginliği önledi.",
          detay: "Sabır aile ilişkilerinde her zaman işe yarar.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Sabırlı olmaya çalıştın ama soru içini biraz kemirdi.",
          detay: "Bazı sorular ne kadar alışılsa da rahatsız eder.",
        },
      },
      {
        metin: "Açıkça sinirlendiğini belli et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mesaj: "Tepkin bir daha aynı soruyu sormalarını engelledi.",
          detay: "Bazen net olmak en etkili yoldur.",
        },
        basarisizSonuc: {
          ahlak: -5,
          un: -5,
          mesaj: "Sinirlenmen aile içinde küçük bir gerginlik yarattı ve arkandan konuştular.",
          detay: "Sabırsızlığın da bir bedeli olabiliyor.",
        },
      },
    ],
  },
  {
    id: "bekarlik_macera_arkadasi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 20,
    gorsel: "🎉",
    baslik: "Bekar Bir Gece",
    metin: "{dost} seni beklenmedik bir maceraya davet etti. Evli olmayan hayatının tadını bir gece daha çıkarabilirsin.",
    secenekler: [
      {
        metin: "Daveti kabul et, maceraya atıl.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 15,
          dost_puani: 10,
          mesaj: "Gece beklenmedik güzellikte geçti; unutulmaz bir anı oldu.",
          detay: "Bazı geceler yılın en güzel anları arasına girer.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -5,
          mesaj: "Gece planlandığı gibi gitmedi, biraz yorgun ve fakir döndün.",
          detay: "Her macera pürüzsüz gitmiyor.",
        },
      },
      {
        metin: "Nazikçe reddet, evde kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Sakin bir gece geçirdin, kendine iyi baktın.",
          detay: "Bazen en iyi seçim hiçbir şey yapmamaktır.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Reddin {dost}'u biraz hayal kırıklığına uğrattı.",
          detay: "Her hayır küçük bir üzüntü taşıyabilir.",
        },
      },
    ],
  },
  {
    id: "bekarlik_yalniz_yaslanma_korkusu",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 42,
    gorsel: "🌙",
    baslik: "Yalnız Yaşlanma Korkusu",
    metin: "Geceleri bazen kendine soruyorsun: yaşlandığında yanında kimse olmazsa ne olacak? Bu düşünce bu gece daha da ağır bastı.",
    secenekler: [
      {
        metin: "Bu düşünceyle yüzleş, kabullen.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 8,
          mutluluk: 5,
          mesaj: "Düşünceyle yüzleşmen sana beklenmedik bir huzur getirdi.",
          detay: "Bazı korkular, onlarla yüzleşince küçülür.",
        },
        basarisizSonuc: {
          mutluluk: -12,
          saglik: -5,
          mesaj: "Düşünce seni bu gece derinden etkiledi, uykun tamamen kaçtı.",
          detay: "Her yüzleşme kolay olmuyor.",
        },
      },
      {
        metin: "Düşünceyi bastır, başka şeylerle oyala kendini.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mesaj: "Kendini oyaladın, düşünce bir süreliğine geri çekildi.",
          detay: "Bazen ertelemek de bir stratejidir.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Bastırmaya çalıştığın düşünce gece boyu kabuslarla geri geldi.",
          detay: "Bazı düşünceler kolay susturulmuyor.",
        },
      },
    ],
  },
  {
    id: "bekarlik_kariyer_odagi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 20,
    gorsel: "🎯",
    baslik: "Tam Odaklanma Fırsatı",
    metin: "Kimseye karşı sorumluluğun olmadığı için, tüm zamanını ve enerjini işine/kariyerine adayabilirsin.",
    secenekler: [
      {
        metin: "Tüm enerjini işine ver.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 20,
          un: 10,
          mesaj: "Odaklanman güzel bir kazanç ve tanınırlık getirdi.",
          detay: "Bazen tek bir şeye adanmak kazandırır.",
        },
        basarisizSonuc: {
          mutluluk: -12,
          saglik: -8,
          mesaj: "Aşırı odaklanman seni tükendirdi, tatmin bulamadın.",
          detay: "Denge olmadan başarı da boş hissettirebilir.",
        },
      },
      {
        metin: "Dengeyi koru, hayatın diğer yönlerine de zaman ayır.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 10,
          mesaj: "Dengeli yaklaşımın seni hem başarılı hem mutlu kıldı.",
          detay: "Denge bazen en akıllıca stratejidir.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Dengeyi tutturmaya çalışırken işte bazı fırsatları kaçırdın.",
          detay: "Her denge kayıpsız olmuyor.",
        },
      },
    ],
  },
  {
    id: "is_ikilem_terfi_mi_aile_mi",
    kategori: "siyaset",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    minRutbeSeviye: 1,
    agirlik: 1,
    gorsel: "🧳",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Uzak Diyarlarda Bir Görev",
    metin: "Sana büyük bir fırsat sunuldu: aylarca sürecek, kariyerini bir sıçratacak uzak bir görev. Ama {es} ve çocukların bu süre boyunca yalnız kalacak.",
    secenekler: [
      {
        metin: "Görevi kabul et, yola çık.",
        baseBasariSansi: 70,
        ipucu: "Kariyerin parlar, ailen sana küser",
        basariliSonuc: {
          para: 30,
          un: 20,
          es_puani: -18,
          mutluluk: -8,
          mesaj: "Görev büyük bir başarıyla sonuçlandı; döndüğünde {es}'in gözlerinde hem gurur hem uzun bir özlemin izleri vardı.",
          detay: "Kariyerin yükseldi, evdeki masa bir süre eksikti.",
        },
        basarisizSonuc: {
          para: 10,
          un: 5,
          es_puani: -25,
          mutluluk: -15,
          mesaj: "Görev zorlu geçti, beklediğin başarıyı getirmedi; üstüne {es} bu uzun yalnızlığı hiç unutmadı.",
          detay: "Bazen risk alırsın ve hiçbir şey kazanmazsın.",
        },
      },
      {
        metin: "Teklifi reddet, ailenin yanında kal.",
        baseBasariSansi: 90,
        ipucu: "Ailen mutlu, kariyerin yerinde sayar",
        basariliSonuc: {
          es_puani: 15,
          mutluluk: 10,
          un: -8,
          mesaj: "Teklifi reddettin; {es} minnetle sarıldı, kariyerin bir süre yerinde saysa da eve her akşam dönüyorsun.",
          detay: "Bazı terfiler bir akşam yemeğine değmez.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Reddin üst makamlarda 'hırssız' diye not edildi; bir sonraki fırsat da gecikebilir.",
          detay: "Her fedakarlığın bir maliyeti var.",
        },
      },
    ],
  },
];
