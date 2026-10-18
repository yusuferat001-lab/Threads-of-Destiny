import type { OlayTanimi } from "./types";

/**
 * "Komik / absürt ölüm" olayları (2026-09). Oyuncunun bir SEÇİMİ sonucu
 * tetiklenen komik ölümleri çeşitlendirir. Hepsi düşük ağırlıklı,
 * `ton: "hafif"`, 2 seçenekli: "aptalca olanı yap" (başarıda küçük komik ödül,
 * başarısızlıkta yüksek ama KESİN OLMAYAN `olum_sansi` (35-62) + ağır sağlık
 * kaybı; ölürsen `efsanevi_olum` rozeti) vs "yapma" (güvenli, ufak).
 * Absürt ölüm daima bir SEÇİMİN sonucudur — seçim yapmadan, ansızın rastgele
 * ölüm kanalı (eski `aniOlumDene`) tamamen kaldırıldı (2026-09 sonu).
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
      "Meyhanede iddiaya girdin: kimse boş şarap fıçısıyla şelaleden inmeye cesaret edemez. Herkes sana bakıyor.",
    secenekler: [
      {
        metin: "Fıçıya gir, itilmeyi bekle.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 14,
          mutluluk: 10,
          para: 8,
          mesaj: "Sırılsıklam ama sağ çıktın; meyhane seni konuştu.",
          detay: "Bazı aptallıklar tutar.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          efsanevi_olum: "Fıçıyla Şelaleden İnen Adam",
          saglik: -22,
          mutluluk: -6,
          mesaj: "Fıçı ilk kayada parçalandı; zar zor nefes alıyordun.",
        },
      },
      {
        metin: "Reddet, bir bardak daha iste.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Omuz silktin; 'ödlek' diyenler sabaha unuttu.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Telaşla çekildin; günlerce 'fıçı korkusu' diye anıldın.",
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
      "Seyyar satıcı 'ejderha nefesi' biberini gösteriyor: 'Bütününü çiğ yiyene sepet bedava.' Kalabalık toplandı.",
    secenekler: [
      {
        metin: "Çiğne, yut, gözünü kırpma.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 10,
          mutluluk: 6,
          para: 6,
          mesaj: "Gözlerin yaşardı ama yuttun; satıcı sırıtıp sepeti uzattı.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          efsanevi_olum: "Ejderha Nefesini Yutan Kahraman",
          saglik: -22,
          mesaj: "Nefesin kesildi; günlerce yattın, doktor böylesini görmemişti.",
        },
      },
      {
        metin: "Bir dilim tat, bırak.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Bir dilim yetti; ağzın yandı ama sağsın.",
        },
        basarisizSonuc: {
          saglik: -6,
          mesaj: "Bir dilim bile fazla geldi; iki gün bir şey yiyemedin.",
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
      "Arkadaşların, gece hükümdar heykeline bıyık çizmen için kışkırtıyor. Merdiven, boya hazır; muhafızlar yakında.",
    secenekler: [
      {
        metin: "Merdivene çık, bıyığı çiz.",
        baseBasariSansi: 50,
        basariliSonuc: {
          suc_sinifi: "kucuk",
          un: 8,
          mutluluk: 8,
          mesaj: "Bıyık kusursuz oldu; şehir güldü, kimse seni ele vermedi.",
        },
        basarisizSonuc: {
          suc_sinifi: "kucuk",
          olum_sansi: 55,
          efsanevi_olum: "Kralın Bıyığını Çizerken Düşen",
          saglik: -20,
          mesaj: "Merdiven kaydı, taşa çakıldın. 'Neredeyse bitiyordu' dedin.",
        },
      },
      {
        metin: "Boyayı arkadaşına ver, gözcü ol.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "İş bitti, kimse yakalanmadı; kahraman arkadaşın oldu.",
        },
        basarisizSonuc: {
          suc_sinifi: "kucuk",
          saglik: -4,
          mesaj: "Devriye geldi; el arabasına takılıp yuvarlandın, tanınmadın.",
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
      "Ağacın tepesinde bal dolu kocaman bir arı kovanı var. Aşağıdan 'birkaç sokma değer' gibi görünüyor.",
    secenekler: [
      {
        metin: "Tırman, kovanı sopayla dürt.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 12,
          mutluluk: 5,
          mesaj: "Birkaç sokma yedin ama bir kova bal indirdin.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          saglik: -25,
          efsanevi_olum: "Arıların Fikrini Sormadan Bal Alan",
          mesaj: "Sürü fikrini net belirtti; nasıl indiğini kimse görmedi.",
        },
      },
      {
        metin: "Arıcıya haber ver, pay iste.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 4,
          mesaj: "Arıcı işini bildi, sana da bir kavanoz düştü; sokma yok.",
        },
        basarisizSonuc: {
          mesaj: "Arıcı 'benim kovanım değil' deyip gitti; bal ağaçta kaldı.",
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
      "Hamamda / meyhanede laf döndü: kim nefesini en uzun tutar? Bahis kondu, biri saymaya başladı bile.",
    secenekler: [
      {
        metin: "Nefesini tut, dayan.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 6,
          un: 4,
          mesaj: "Yüzün kızardı ama son dayanan sendin; bahsi topladın.",
        },
        basarisizSonuc: {
          olum_sansi: 35,
          saglik: -10,
          efsanevi_olum: "Bir Bahis Uğruna Nefesini Fazla Tutan",
          mesaj: "Tuttun, tuttun... sonra masaya kapandın, kalkmadın.",
        },
      },
      {
        metin: "'Ben sayarım' de, bahse girme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Saydın, güldün, sıvıştın; akşamın en sağlam adamıydın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Saymayı şaşırdın, herkes kızdı; itibarın sarsıldı.",
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
      "Pazar yarışması: en ağır kabağı getiren ödül alır. Komşunun tarlasında bir canavar var; tek kişi kaldırır mı?",
    secenekler: [
      {
        metin: "Sırtla, meydana taşı.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 15,
          un: 5,
          mesaj: "Belin zor dayandı ama birinci oldun.",
        },
        basarisizSonuc: {
          olum_sansi: 40,
          saglik: -22,
          efsanevi_olum: "Dev Kabağın Altında Kalan",
          mesaj: "Kabak kaydı, altında kaldın; ödülü alamadın.",
        },
      },
      {
        metin: "El arabası kirala, öyle taşı.",
        baseBasariSansi: 88,
        maliyet: 4,
        basariliSonuc: {
          para: 6,
          mesaj: "Rahat taşıdın; üçüncü oldun, fena değil.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "El arabasının tekeri dayanamadı; kabak yolda patladı.",
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
      "Kış ortası, göl donmuş görünüyor. Çocuklar kaymaya korkuyor; biri 'koca adam korkar mı?' diye takılıyor.",
    secenekler: [
      {
        metin: "Buzun ortasına koş, kay.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: 8,
          un: 4,
          mesaj: "Buz tuttu, ortaya kadar kaydın; çocuklar alkışladı.",
        },
        basarisizSonuc: {
          olum_sansi: 60,
          saglik: -20,
          efsanevi_olum: "Buzun Kalınlığına Fazla Güvenen",
          mesaj: "Ortada çıtırtıyı duydun. Duyduğun son ses oydu.",
        },
      },
      {
        metin: "Kıyıda, sığ yerde bir tur at.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Kıyıda birkaç tur attın, kuru döndün.",
        },
        basarisizSonuc: {
          saglik: -5,
          mesaj: "Sığda bile buz kırıldı; dizine kadar girip titreyerek koştun.",
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
      "Ordugâhta / meydanda erler bir oyun buldu: en ağır gülleyi en uzağa taşıyan akşam yemeğini seçer. Sıra sende.",
    secenekler: [
      {
        metin: "En büyüğünü kucakla, yürü.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 6,
          saglik: -3,
          mutluluk: 5,
          mesaj: "En uzağa sen taşıdın; akşam ziyafeti senindi.",
        },
        basarisizSonuc: {
          olum_sansi: 35,
          saglik: -18,
          efsanevi_olum: "Gülleyi Ayağının Üstüne Düşüren",
          mesaj: "Gülle elinden kaydı; kanaman durmadı.",
        },
      },
      {
        metin: "Orta boy seç, garantiye oyna.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Makul gülle, makul mesafe; ikinci oldun, ayakların yerinde.",
        },
        basarisizSonuc: {
          saglik: -4,
          mesaj: "Orta boy bile ağır geldi; bıraktın, herkes güldü.",
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
      "Değirmenin kanatları rüzgârla dönüyor. Biri, kanada tutunup bir tur dönmene meydan okuyor.",
    secenekler: [
      {
        metin: "Kanada atla, sıkı tutun.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 12,
          mutluluk: 8,
          mesaj: "Bir tur döndün, sağ indin; köy seni konuşuyor.",
        },
        basarisizSonuc: {
          olum_sansi: 58,
          efsanevi_olum: "Değirmen Kanadıyla Uçmayı Deneyen",
          saglik: -24,
          mesaj: "Tepede eller çözüldü; günlerce kımıldayamadan yattın.",
        },
      },
      {
        metin: "Kanadın ucuna dokun, çekil.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Dokundun, herkes gördü; cesursun ve tek parçasın.",
        },
        basarisizSonuc: {
          saglik: -6,
          mesaj: "Kanat elini vurup seni savurdu; bilek de gurur da burkuldu.",
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
      "Panayırda bir adam yaban domuzunu ipe bağlamış: 'Yüz adımda domuzu geçene ödül.' Domuz huysuz görünüyor.",
    secenekler: [
      {
        metin: "İpi çöz, domuzla yarış.",
        baseBasariSansi: 40,
        basariliSonuc: {
          para: 12,
          un: 6,
          mesaj: "Çizgiyi önce geçtin; ödülü aldın, domuz tarlaya daldı.",
        },
        basarisizSonuc: {
          olum_sansi: 45,
          saglik: -20,
          efsanevi_olum: "Domuzla Yarışıp Kaybeden Adam",
          mesaj: "Domuz yarışı ciddiye aldı. Sen almadın. Fark buydu.",
        },
      },
      {
        metin: "Pazarlık et, domuzu izle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Kenardan izleyip güldün; sağ salim döndün.",
        },
        basarisizSonuc: {
          mesaj: "Domuz ipi koparıp kalabalığı dağıttı; sen de kaçtın.",
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
      "Bir mucit iki bez kanat dikmiş: 'Kuleden atlarsan süzülürsün.' Kanatlar biraz gevşek dikilmiş gibi.",
    secenekler: [
      {
        metin: "Kanatları tak, kuleden atla.",
        baseBasariSansi: 25,
        basariliSonuc: {
          un: 20,
          mutluluk: 12,
          mesaj: "Birkaç saniye süzülüp samana gömüldün. Ama uçtun!",
        },
        basarisizSonuc: {
          olum_sansi: 62,
          efsanevi_olum: "Bez Kanatlara Güvenen Öncü",
          saglik: -25,
          mesaj: "Kanatlar kapandı; saman yerinde yoktu, yere çakıldın.",
        },
      },
      {
        metin: "Önce bir çuval taşla dene.",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: 3,
          mesaj: "Çuval taş gibi düştü; mucit kızdı ama yaşıyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Çuvalı atarken az kalsın düşüyordun; bu hayatını kurtardı.",
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
      "Dere üstündeki eski köprünün yarısı çürük. Uzun yol yerine 'hızlı geçersen dayanır' diyorlar.",
    secenekler: [
      {
        metin: "Koşarak geç, arkana bakma.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Tahtalar çatırdadı ama öbür yakadaydın; yarım gün kazandın.",
        },
        basarisizSonuc: {
          olum_sansi: 45,
          saglik: -18,
          efsanevi_olum: "Çürük Köprüye 'Dayanır' Diyen",
          mesaj: "Ortada tahtalar çöktü; dere sığdı ama kayalar değildi.",
        },
      },
      {
        metin: "Uzun yoldan dolan.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Ayakların şişti ama akşam ateşin başındaydın.",
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
      "Gök gürlüyor, herkes içeri kaçıyor. Biri iddia ediyor: 'Tepede, elinde demir çubukla en uzun duran cesurdur.'",
    secenekler: [
      {
        metin: "Demir çubuğu kap, tepeye çık.",
        baseBasariSansi: 40,
        basariliSonuc: {
          un: 10,
          mutluluk: 6,
          mesaj: "Fırtına dindi, hâlâ ayaktaydın; 'deli ama cesur' dediler.",
        },
        basarisizSonuc: {
          olum_sansi: 58,
          efsanevi_olum: "Fırtınada Demir Çubukla En Uzun Duran",
          saglik: -22,
          mesaj: "Yıldırım çarptı; tepeden yuvarlandın, saçların is kokuyordu.",
        },
      },
      {
        metin: "Herkesle sundurmaya sığın.",
        baseBasariSansi: 97,
        basariliSonuc: {
          mesaj: "Kuru kaldın; aptallar dışarıdaydı, sen içerideydin.",
        },
        basarisizSonuc: {
          saglik: -2,
          mesaj: "Kiremit damladı, biraz ıslandın. Faturası buydu.",
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
      "Fabrikada yeni buhar kazanının valfi tıkandı. Usta 'çekiçle vur, açılır' diyor ama kazan tehlikeli tıslıyor.",
    secenekler: [
      {
        metin: "Çekici al, valfe sert vur.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 10,
          un: 5,
          mesaj: "Valf açıldı, basınç düştü; ustabaşı ikramiye yazdı.",
        },
        basarisizSonuc: {
          olum_sansi: 55,
          saglik: -25,
          efsanevi_olum: "Buhar Kazanına Çekiçle Cevap Veren",
          mesaj: "Kazan cevabını verdi; fabrikanın yarısı tatil oldu.",
        },
      },
      {
        metin: "Ateşi söndür, soğuyunca bak.",
        baseBasariSansi: 88,
        basariliSonuc: {
          para: 3,
          mesaj: "Bir vardiya gitti ama valf temizlendi; kimse yanmadı.",
        },
        basarisizSonuc: {
          mesaj: "Elini hafif haşladın; yine de doğru karardı.",
        },
      },
    ],
  },
];
