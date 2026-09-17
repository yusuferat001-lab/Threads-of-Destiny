import type { OlayTanimi } from "./types";

/**
 * "Komik / absürt ölüm" olayları (2026-09). Rastgele ani-ölüm havuzuna
 * (`ANI_OLUM_OLAYLARI`, `ANI_OLUM_IHTIMALI`) DOKUNULMADAN, oyuncunun bir SEÇİMİ
 * sonucu tetiklenen komik ölümleri çeşitlendirir. Hepsi düşük ağırlıklı,
 * `ton: "hafif"`, 2 seçenekli: "aptalca olanı yap" (başarıda küçük komik ödül,
 * başarısızlıkta yüksek ama KESİN OLMAYAN `olum_sansi` (35-62) + ağır sağlık
 * kaybı; ölürsen `efsanevi_olum` rozeti) vs "yapma" (güvenli, ufak).
 * Absürt ölüm bir SEÇİMİN sonucudur; ansızın/şanssız kanal (stateManager
 * `aniOlumDene`) bilerek çok seyreğe çekildi (%0.4).
 */
export const OLAY_KOMIK_OLUM: OlayTanimi[] = [
  {
    id: "komik_fici_selale",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.3,
    minYas: 16,
    gorsel: "🛢️",
    baslik: "Fıçıyla Şelale",
    metin:
      "Meyhanede iddiaya girdin: kimse boş bir şarap fıçısının içine girip küçük şelaleden aşağı inmeye cesaret edemez. Herkes sana bakıyor. Fıçı hazır.",
    secenekler: [
      {
        metin: "Fıçıya gir, iniş için itilmeni bekle.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 14,
          mutluluk: 10,
          para: 8,
          mesaj: "Fıçı döne döne indi, sen sırılsıklam ama sağ çıktın. Meyhane haftalarca senin adını andı.",
          detay: "Bazı aptallıklar tutar.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          efsanevi_olum: "Fıçıyla Şelaleden İnen Adam",
          saglik: -22,
          mutluluk: -6,
          mesaj: "Fıçı ilk kayada paramparça oldu. Kalabalık önce güldü, sonra sustu; seni sudan çıkardıklarında zar zor nefes alıyordun.",
        },
      },
      {
        metin: "İddiayı geri çevir, bir bardak daha iste.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Omuz silktin. Birkaç kişi 'ödlek' dedi ama sabaha unuttular.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Geri çekilişin biraz fazla telaşlı oldu; günlerce 'fıçı korkusu' diye anıldın.",
        },
      },
    ],
  },
  {
    id: "komik_en_aci_biber",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.3,
    minYas: 16,
    gorsel: "🌶️",
    baslik: "En Acı Biber",
    metin:
      "Bir seyyar satıcı, uzak diyarlardan gelen 'ejderha nefesi' denen biberden bir sepet açtı. 'Bütününü çiğ yiyene sepet bedava' diyor. Etraf toplandı.",
    secenekler: [
      {
        metin: "Al ağzına, çiğne, yut. Gözünü kırpma.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 10,
          mutluluk: 6,
          para: 6,
          mesaj: "Yüzün mora döndü, gözlerinden yaş fışkırdı ama yuttun. Satıcı sepeti sırıtarak uzattı.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          efsanevi_olum: "Ejderha Nefesini Yutan Kahraman",
          saglik: -22,
          mesaj: "Nefesin kesildi, yüzün morardı; günlerce yatakta kaldın, doktor 'ilk kez böyle bir şey görüyorum' deyip durdu.",
        },
      },
      {
        metin: "Bir dilim tadına bak, gerisini bırak.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Bir dilim yetti de arttı bile. Ağzın yandı ama hikâyeni anlatacak kadar yaşadın.",
        },
        basarisizSonuc: {
          saglik: -6,
          mesaj: "O bir dilim bile fazla geldi; iki gün ağzına bir şey koyamadın.",
        },
      },
    ],
  },
  {
    id: "komik_heykel_boyama",
    kategori: "siyaset",
    ton: "hafif",
    agirlik: 0.28,
    minYas: 17,
    gorsel: "🗿",
    baslik: "Meydandaki Heykel",
    metin:
      "Arkadaşların, gece meydandaki hükümdar heykeline komik bir bıyık çizmeye seni kışkırtıyor. Merdiven hazır, boya hazır, muhafızlar biraz ötede.",
    secenekler: [
      {
        metin: "Merdivene çık, bıyığı çiz.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 8,
          mutluluk: 8,
          suc_artis: 6,
          mesaj: "Bıyık kusursuz oldu. Şehir sabah gülmekten kırıldı, kimse seni ele vermedi.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          efsanevi_olum: "Kralın Bıyığını Çizerken Düşen",
          saglik: -20,
          suc_artis: 6,
          mesaj: "Merdiven kaydı; taş zemine sertçe çakıldın. 'Neredeyse bitiyordu' diye sayıklayıp durdun.",
        },
      },
      {
        metin: "Boyayı arkadaşına ver, sen gözcü ol.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Gözcülük ettin, iş bitti, kimse yakalanmadı. Kahraman arkadaşın oldu ama gülen sen de vardın.",
        },
        basarisizSonuc: {
          suc_artis: 8,
          saglik: -4,
          mesaj: "Devriye erken geldi; koşarken bir el arabasına takılıp yuvarlandın. En azından tanınmadın.",
        },
      },
    ],
  },
  {
    id: "komik_ari_kovani",
    kategori: "saglik",
    ton: "hafif",
    agirlik: 0.28,
    minYas: 16,
    gorsel: "🐝",
    baslik: "Bedava Bal",
    metin:
      "Ağacın tepesinde kocaman bir arı kovanı var, içi balla dolu. Aşağıdan bakınca 'birkaç sokma değer' gibi görünüyor.",
    secenekler: [
      {
        metin: "Ağaca tırman, kovanı sopayla dürt.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 12,
          mutluluk: 5,
          mesaj: "Birkaç yerinden şiştin ama bir kova bal indirdin. Günlerce herkese ikram ettin.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          saglik: -25,
          efsanevi_olum: "Arıların Fikrini Sormadan Bal Alan",
          mesaj: "Sürü fikrini çok net belirtti. Ağaçtan nasıl indiğini kimse tam göremedi.",
        },
      },
      {
        metin: "Bir arıcıya haber ver, payını iste.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 4,
          mesaj: "Arıcı işini bilerek yaptı, sana da bir kavanoz düştü. Tek bir sokma bile yok.",
        },
        basarisizSonuc: {
          mesaj: "Arıcı 'benim kovanım değil' deyip gitti. Bal ağaçta kaldı, sen de yerde.",
        },
      },
    ],
  },
  {
    id: "komik_nefes_tutma",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🫁",
    baslik: "Nefesimi En Uzun Tutarım",
    metin:
      "Hamamda / meyhanede laf lafı açtı: kim nefesini en uzun tutabilir? Bahis konuldu. Birileri saymaya başladı bile.",
    secenekler: [
      {
        metin: "Ciğerini doldur, gözlerini kapat, dayan.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 6,
          un: 4,
          mesaj: "Yüzün kızardı, damarların attı ama son dayanan sen oldun. Bahsi topladın.",
        },
        basarisizSonuc: {
          olum_sansi: 35,
          saglik: -10,
          efsanevi_olum: "Bir Bahis Uğruna Nefesini Fazla Tutan",
          mesaj: "İnatla tuttun, tuttun... sonra masaya kapandın. Kalkmadın.",
        },
      },
      {
        metin: "'Ben sayarım' de, bahse girme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Saydın, güldün, kimse fark etmeden kenara çekildin. Akşamın en sağlıklı adamı sendin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sayarken şaşırdın, herkes sana kızdı. Ölmedin ama itibarın biraz sarsıldı.",
        },
      },
    ],
  },
  {
    id: "komik_dev_kabak",
    kategori: "ticaret",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 17,
    gorsel: "🎃",
    baslik: "Dev Kabak Yarışı",
    metin:
      "Pazar meydanında bir yarışma: en ağır kabağı getiren ödülü alır. Senin komşunun tarlasında bir canavar var — tek başına kaldırılır mı, bilinmez.",
    secenekler: [
      {
        metin: "Sırtla, meydana kadar taşı.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 15,
          un: 5,
          mesaj: "Bel fıtığının eşiğinden döndün ama kabağı yetiştirdin ve birinci oldun.",
        },
        basarisizSonuc: {
          olum_sansi: 40,
          saglik: -22,
          efsanevi_olum: "Dev Kabağın Altında Kalan",
          mesaj: "Kabak omzundan kaydı, sen de altında. 'En ağır kabak' unvanını kazandın, ama alamadın.",
        },
      },
      {
        metin: "El arabası kirala, öyle taşı.",
        baseBasariSansi: 88,
        maliyet: 4,
        basariliSonuc: {
          para: 6,
          mesaj: "El arabasıyla rahat rahat getirdin. Birinci olamadın ama sağlam olan üçüncülük de fena değil.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "El arabasının tekeri kabağın ağırlığına dayanamadı; kabak yolun ortasında patladı.",
        },
      },
    ],
  },
  {
    id: "komik_buz_golu",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    cag: "Orta Çağ",
    gorsel: "🧊",
    baslik: "Donmuş Göl",
    metin:
      "Kış ortası. Göl donmuş görünüyor. Çocuklar kıyıda kaymaya korkuyor; biri 'büyük adam korkar mı hiç' diye takılıyor.",
    secenekler: [
      {
        metin: "Buzun ortasına doğru koş, kay.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: 8,
          un: 4,
          mesaj: "Buz tuttu, ortaya kadar kaydın, çocuklar alkışladı. Bir efsane doğdu.",
        },
        basarisizSonuc: {
          olum_sansi: 60,
          saglik: -20,
          efsanevi_olum: "Buzun Kalınlığına Fazla Güvenen",
          mesaj: "Tam ortada çıtırtıyı duydun. Duyduğun son ses oydu.",
        },
      },
      {
        metin: "Kıyıda, sığ yerde bir tur at.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Kıyıda birkaç tur attın, güldün, kuru döndün. Çocuklar yine de memnundu.",
        },
        basarisizSonuc: {
          saglik: -5,
          mesaj: "Sığ yerde bile buz kırıldı; dizine kadar buzlu suya girdin, titreyerek eve koştun.",
        },
      },
    ],
  },
  {
    id: "komik_gulle_yaris",
    kategori: "savas",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 17,
    gorsel: "🏋️",
    baslik: "Gülle Taşıma Yarışı",
    metin:
      "Ordugâhta / meydanda erler bir oyun buldu: kim en ağır gülleyi en uzağa taşırsa akşam yemeğini seçer. Sıra sende.",
    secenekler: [
      {
        metin: "En büyüğünü kucakla, yürü.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 6,
          saglik: -3,
          mutluluk: 5,
          mesaj: "Suratın kıpkırmızı, damarların patlayacak gibi ama en uzağa sen taşıdın. Akşam ziyafet senindi.",
        },
        basarisizSonuc: {
          olum_sansi: 35,
          saglik: -18,
          efsanevi_olum: "Gülleyi Ayağının Üstüne Düşüren",
          mesaj: "Gülle elinden kaydı; nereye düştüğünü söylemek acı verir. Kanaman durmadı.",
        },
      },
      {
        metin: "Orta boydan birini seç, garantiye oyna.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Makul bir gülle, makul bir mesafe. İkinci oldun, ayakların yerinde.",
        },
        basarisizSonuc: {
          saglik: -4,
          mesaj: "Orta boy bile ağır geldi; birkaç adımda bıraktın, herkes güldü.",
        },
      },
    ],
  },
  {
    id: "komik_degirmen_kanadi",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 17,
    cag: "Orta Çağ",
    gorsel: "🌀",
    baslik: "Değirmenin Kanadı",
    metin:
      "Köy değirmeninin kanatları rüzgârla dönüyor. Birileri 'bir kanada tutunup bir tur dönmeye' meydan okuyor. Aşağıdan kolay görünüyor.",
    secenekler: [
      {
        metin: "Kanada atla, sıkı tutun.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 12,
          mutluluk: 8,
          mesaj: "Bir tam tur döndün, tam tepede midemi bıraktım diye bağırdın, sonra sağ salim indin. Köy seni konuşuyor.",
        },
        basarisizSonuc: {
          olum_sansi: 58,
          efsanevi_olum: "Değirmen Kanadıyla Uçmayı Deneyen",
          saglik: -24,
          mesaj: "Tepede eller çözüldü. İniş planladığın gibi olmadı; günlerce kımıldayamadan yattın.",
        },
      },
      {
        metin: "Kanadın alt ucuna elini değdir, geri çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Kanada bir dokundun, herkes 'gördük gördük' dedi. Yeterince cesur, hâlâ tek parça.",
        },
        basarisizSonuc: {
          saglik: -6,
          mesaj: "Zamanlaman kötüydü; kanat eline çarpıp seni yere savurdu. Bilek burkuldu, gurur da.",
        },
      },
    ],
  },
  {
    id: "komik_yaban_domuz_yaris",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🐗",
    baslik: "Domuzla Yarış",
    metin:
      "Panayırda bir adam yaban domuzunu ipe bağlamış, 'yüz adım koşuda domuzu geçene ödül' diyor. Domuz huysuz görünüyor.",
    secenekler: [
      {
        metin: "İpi çöz, domuzla yarış.",
        baseBasariSansi: 40,
        basariliSonuc: {
          para: 12,
          un: 6,
          mesaj: "Domuz şaşırdı, sen kaçtın, çizgiyi önce geçtin. Ödülü aldın, domuz da bir tarlaya daldı.",
        },
        basarisizSonuc: {
          olum_sansi: 45,
          saglik: -20,
          efsanevi_olum: "Domuzla Yarışıp Kaybeden Adam",
          mesaj: "Domuz yarışı ciddiye aldı. Sen almadın. Fark buydu.",
        },
      },
      {
        metin: "Adamla pazarlık et, sadece domuzu izle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Kenardan izledin, başkası koştu, sen güldün. Akşam sağ salim eve döndün.",
        },
        basarisizSonuc: {
          mesaj: "Domuz ipini kopardı, kalabalık dağıldı; sen de kaçanların arasındaydın.",
        },
      },
    ],
  },
  {
    id: "komik_kule_zipla",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.2,
    minYas: 18,
    gorsel: "🪂",
    baslik: "Bez Kanatlarla Uçuş",
    metin:
      "Bir mucit heves, iki bez kanat dikmiş; 'kuleden atlarsan süzülürsün' diyor. Kanatlar biraz gevşek dikilmiş gibi.",
    secenekler: [
      {
        metin: "Kanatları tak, kuleden atla.",
        baseBasariSansi: 25,
        basariliSonuc: {
          un: 20,
          mutluluk: 12,
          mesaj: "Birkaç saniye gerçekten süzüldün — sonra bir saman yığınına gömüldün. Ama uçtun. Herkes uçtuğunu gördü.",
        },
        basarisizSonuc: {
          olum_sansi: 62,
          efsanevi_olum: "Bez Kanatlara Güvenen Öncü",
          saglik: -25,
          mesaj: "Kanatlar açıldı, sonra kapandı. Saman yığını bu sefer yerinde değildi; toprağa çakılıp öylece kaldın.",
        },
      },
      {
        metin: "Önce bir çuval taş at, kanatları dene.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 3,
          mesaj: "Çuval taş gibi düştü. 'Belki başka gün' dedin, mucit sana kızdı ama sen yaşıyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Çuvalı atarken dengeyi kaybedip neredeyse kendin düşüyordun. O 'neredeyse' hayatını kurtardı.",
        },
      },
    ],
  },
  {
    id: "komik_curuk_kopru",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🌉",
    baslik: "Çürük Köprü",
    metin:
      "Dere üstündeki eski tahta köprünün yarısı çürük. Uzun yol dolanmak yerine, 'hızlı geçersen dayanır' diyorlar.",
    secenekler: [
      {
        metin: "Koşarak geç, arkana bakma.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Tahtalar çatırdadı ama sen çoktan öbür yakadaydın. Dolambaçlı yoldan yarım gün kazandın.",
        },
        basarisizSonuc: {
          olum_sansi: 45,
          saglik: -18,
          efsanevi_olum: "Çürük Köprüye 'Dayanır' Diyen",
          mesaj: "Tam ortada tahtalar teslim oldu. Dere sığdı ama kayalar değildi.",
        },
      },
      {
        metin: "Uzun yoldan dolan.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Yarım gün fazladan yürüdün, ayakların şişti ama akşam ateşin başına oturan sen oldun.",
        },
        basarisizSonuc: {
          saglik: -3,
          mesaj: "Uzun yolda ayağını burktun; yine de köprüden iyiydi.",
        },
      },
    ],
  },
  {
    id: "komik_yildirim_tepe",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.2,
    minYas: 17,
    gorsel: "⛈️",
    baslik: "Fırtınada Tepe",
    metin:
      "Gök gürlüyor, herkes içeri kaçıyor. Biri iddia ediyor: 'En yüksek tepede, elinde demir çubukla en uzun duran cesurdur.'",
    secenekler: [
      {
        metin: "Demir çubuğu kap, tepeye çık.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 10,
          mutluluk: 6,
          mesaj: "Fırtına dindi, sen hâlâ ayaktaydın. 'Deli ama cesur' dediler; ikisi de doğruydu.",
        },
        basarisizSonuc: {
          olum_sansi: 58,
          efsanevi_olum: "Fırtınada Demir Çubukla En Uzun Duran",
          saglik: -22,
          mesaj: "Gök, iddiana gürültüyle cevap verdi; çarpmanın şokuyla tepeden yuvarlandın, saçların is kokuyordu.",
        },
      },
      {
        metin: "Herkesle beraber sundurmaya sığın.",
        baseBasariSansi: 97,
        basariliSonuc: {
          mesaj: "Sundurmanın altında ıslanmadan bekledin. Aptallar dışarıda, sen içerideydin.",
        },
        basarisizSonuc: {
          saglik: -2,
          mesaj: "Sundurmanın kiremidi damladı, biraz ıslandın. Faturası buydu.",
        },
      },
    ],
  },
  {
    id: "komik_buhar_makinesi",
    kategori: "ticaret",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    cag: "Sanayi Devrimi",
    gorsel: "🚂",
    baslik: "Basınç Meselesi",
    metin:
      "Fabrikada yeni buhar kazanının valfi tıkanmış. Usta 'çekiçle bir vur, açılır' diyor ama kazan tehlikeli derecede tısırdıyor.",
    secenekler: [
      {
        metin: "Çekici al, valfe sert bir vur.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 10,
          un: 5,
          mesaj: "Valf 'pıst' diye açıldı, basınç düştü. Usta sırtını sıvazladı, ustabaşı bir ikramiye yazdı.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          saglik: -25,
          efsanevi_olum: "Buhar Kazanına Çekiçle Cevap Veren",
          mesaj: "Kazan cevabını verdi. Fabrikanın yarısı o gün tatil oldu.",
        },
      },
      {
        metin: "Ateşi söndür, kazan soğusun, sonra bak.",
        baseBasariSansi: 88,
        basariliSonuc: {
          para: 3,
          mesaj: "Bir vardiya kaybettiniz ama kazan soğuyunca valf kolayca temizlendi. Kimse yanmadı.",
        },
        basarisizSonuc: {
          mesaj: "Ateşi söndürürken elini hafif haşladın; yine de doğru karardı.",
        },
      },
    ],
  },
];
