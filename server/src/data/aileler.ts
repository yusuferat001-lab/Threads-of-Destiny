import { Cag, Durum, Kategori } from "../types";

export interface AileTanimi {
  id: string;
  /** Aile mesleği: "Çiftçi", "Soylu", "Fabrika İşçisi"... */
  ad: string;
  agirlik: number;
  cag?: Cag;
  /** {bolge}, {meslek}, {yil} yer tutucuları desteklenir. */
  anlati: string;
  /** Bu aile mesleğini "sürdürmüş" sayılmak için oyuncunun seçmesi gereken meslek. */
  devamMeslegi?: string;
  /** Olay filtrelemesi için eklenen etiketler (aile:xxx dahil). */
  etiketler?: string[];

  para?: number;
  saglik?: number;
  un?: number;
  ahlak?: number;
  mutluluk?: number;
  maasCarpani?: number;
  durumlar?: Durum[];
  /** Ailenin kategorilere verdiği somut yatkınlık etkisi (oyuncuya gösterilir). */
  yatkinlikEtkisi?: Partial<Record<Kategori, number>>;
}

/**
 * 2026-09 denge turu: her ailenin etkisi artık ortak, dar bir bant içinde
 * tutuluyor (kullanıcı isteği — eskiden bazı aileler +80/-25 gibi aşırı
 * uçlarda dururken bazıları etkisizdi): para/ahlak/ün ~±20, sağlık ~±10
 * (2026-09 ikinci tur: taban sağlık 80→85→90 yükseldikçe eski ~±16 bandı
 * orantılı olarak ~×0.625 küçültülüp ±10'a sıkıştırıldı, işaretler/sıralama
 * korundu), mutluluk ~±12. HER aile artık mutluluğu da etkiler (eskiden
 * hiçbiri etkilemiyordu). Net etki hâlâ kabaca dengeli: bir alanda
 * kazandıran aile başka bir alanda mutlaka bedel öder.
 *
 * 2026-09 sonu (kullanıcı isteği — "her bir ailenin her mesleğe yatkınlığını
 * düzenle"): `yatkinlikEtkisi` artık HER ailede TAM 4 meslek kategorisini
 * (savas/ticaret/din/zanaat — bölgelerdeki aynı desen, §40) kapsıyor; eski
 * karışık siyaset/sosyal/saglik etkileri kaldırıldı. Sabit bir kademe: en
 * güçlü uyum **8** (`AILE_YATKINLIK_LIMIT` tavanı — `devamMeslegi` olan
 * ailelerde bu her zaman o mesleğin kategorisidir), ikincil **4**, üçüncül/
 * taban **2** (kullanıcının "baz puan" önerisi), en zayıf uyum **-3** (hafif
 * bir ceza — hiçbir aile bir meslekte tamamen "etkisiz" bırakılmadı).
 */
export const AILELER: AileTanimi[] = [
  {
    id: "ciftci",
    ad: "Çiftçi",
    agirlik: 1,
    anlati:
      "Ailen kuşaklardır {bolge} kırsalında toprağa bakar. Şafakla kalkmayı, sırtın ağrırken bile devam etmeyi ve hasat kötü geçtiğinde susmayı öğrendin. Bedenin sağlam, ellerin nasırlı — ama şehirde kimse köylünün adını sormaz.",
    etiketler: ["aile:ciftci", "toprak_bilgisi"],
    para: -15,
    saglik: 8,
    un: -8,
    ahlak: 8,
    mutluluk: 6,
    yatkinlikEtkisi: { zanaat: 8, din: 4, savas: 2, ticaret: -3 },
  },
  {
    id: "asker",
    ad: "Asker",
    agirlik: 1,
    anlati:
      "Baban da deden de {bolge} ordusunda hizmet etti; evinizin duvarında paslı bir kılıç asılıydı. Yürümeyi öğrendiğin gün eline tahta bir kalkan verdiler. Disiplinli ve dayanıklısın, ama o evde merhamet hiçbir zaman bir erdem sayılmadı.",
    devamMeslegi: "Asker",
    etiketler: ["aile:asker", "asker_soyu"],
    para: 5,
    saglik: 6,
    un: 10,
    ahlak: -12,
    mutluluk: -4,
    yatkinlikEtkisi: { savas: 8, zanaat: 4, din: 2, ticaret: -3 },
  },
  {
    id: "kole",
    ad: "Köle",
    agirlik: 1,
    cag: "Orta Çağ",
    anlati:
      "Ailen {bolge} topraklarında bir efendinin malıydı. Özgürlüğünü ancak efendinin ölümüyle kazandın; elinde ne para ne isim vardı. Acıyı ve adaletsizliği ilk elden tanıdığın için insanları çok iyi okuyorsun, ama toplum sana hâlâ geçmişinle bakıyor.",
    etiketler: ["aile:kole", "azat_edilmis"],
    para: -20,
    saglik: -5,
    un: -15,
    ahlak: 15,
    mutluluk: -10,
    yatkinlikEtkisi: { zanaat: 8, ticaret: 4, din: 2, savas: -3 },
  },
  {
    id: "soylu",
    ad: "Soylu",
    agirlik: 1,
    anlati:
      "Aile armanız {bolge} boyunca tanınır; adını duyan kapıyı açar, hizmetkârlar önünde eğilir. Ne var ki bu evde herkes birbirini kollar, kimse kimseye acımaz. Ayrıcalıkla büyüdün ve ayrıcalığın bedelini vicdanınla ödemeyi öğrendin.",
    etiketler: ["aile:soylu", "soylu_kani"],
    para: 20,
    saglik: -3,
    un: 15,
    ahlak: -15,
    mutluluk: -8,
    yatkinlikEtkisi: { ticaret: 8, savas: 4, din: 2, zanaat: -3 },
  },
  {
    id: "sanatci",
    ad: "Sanatçı",
    agirlik: 1,
    anlati:
      "Annen {bolge} meydanlarında ozanlık eder, baban nakış işlerdi. Evinizde her zaman müzik, her zaman misafir, hiçbir zaman para yoktu. İnsanları etkilemeyi ve kalabalık önünde durmayı bilirsin; alacaklılarla konuşmayı da.",
    etiketler: ["aile:sanatci", "sanatci_kani"],
    para: -14,
    saglik: -2,
    un: 14,
    ahlak: 5,
    mutluluk: 8,
    yatkinlikEtkisi: { zanaat: 8, ticaret: 4, din: 2, savas: -3 },
  },
  {
    id: "fabrika_iscisi",
    ad: "Fabrika İşçisi",
    agirlik: 1,
    cag: "Sanayi Devrimi",
    anlati:
      "Baban {bolge} tekstil fabrikasında günde on dört saat çalıştı, ciğerleri pamuk tozuyla doldu. Sen de sekiz yaşından beri makinelerin arasındaydın. Dayanışmanın ne olduğunu bilirsin; parmaklarının ikisini de o makinelerde bıraktın.",
    etiketler: ["aile:isci", "isci_dayanismasi"],
    para: -12,
    saglik: -9,
    un: -6,
    ahlak: 14,
    mutluluk: -6,
    durumlar: [{ id: "fabrika_ciger", ad: "Tozlu Ciğerler", tur: "kalici", tur_basi_saglik: -1 }],
    yatkinlikEtkisi: { zanaat: 8, savas: 4, din: 2, ticaret: -3 },
  },
  {
    id: "tuccar",
    ad: "Tüccar",
    agirlik: 1,
    anlati:
      "Baban {bolge} pazarlarının tanınmış bir simsarıydı; evinizde baharat ve mürekkep kokusu eksik olmazdı. Hesap yapmayı, pazarlık etmeyi ve gerektiğinde gerçeği biraz eğip bükmeyi sofrada öğrendin.",
    devamMeslegi: "Tüccar",
    etiketler: ["aile:tuccar", "tuccar_agi"],
    para: 20,
    saglik: -2,
    un: 12,
    ahlak: -14,
    mutluluk: 4,
    yatkinlikEtkisi: { ticaret: 8, zanaat: 4, savas: 2, din: -3 },
  },
  {
    id: "din_adami",
    ad: "Din Adamı",
    agirlik: 1,
    anlati:
      "Baban {bolge} cemaatinin saygın bir üyesiydi; evinizde her akşam dua edilir, her sabah şükredilirdi. Okuma yazmayı kutsal metinlerden öğrendin. Ailenin adı sana güven kazandırıyor, ama herkes senden bir aziz gibi yaşamanı bekliyor.",
    devamMeslegi: "Din Adamı",
    etiketler: ["aile:din", "dindar_aile"],
    para: -10,
    saglik: -2,
    un: 14,
    ahlak: 15,
    mutluluk: 6,
    yatkinlikEtkisi: { din: 8, ticaret: 4, zanaat: 2, savas: -3 },
  },
  {
    id: "zanaatkar",
    ad: "Zanaatkâr",
    agirlik: 1,
    cag: "Orta Çağ",
    devamMeslegi: "Zanaatkâr",
    anlati:
      "Baban {bolge} çarşısında demir döverdi, sen körüğü çekerek büyüdün. Ne zengin ne fakirdiniz; ödenmiş bir kira ve dolu bir tencere yeterdi. Elin iş tutar, gözün ölçü bilir — ama çekiç sallayan adama kimse büyük fırsat sunmaz.",
    etiketler: ["aile:zanaatkar", "zanaat_bilgisi"],
    para: 12,
    saglik: 5,
    un: -8,
    ahlak: 6,
    mutluluk: 4,
    yatkinlikEtkisi: { zanaat: 8, ticaret: 4, din: 2, savas: -3 },
  },
  {
    id: "hekim",
    ad: "Hekim",
    agirlik: 1,
    cag: "Orta Çağ",
    anlati:
      "Annen {bolge} çevresinde şifacı olarak bilinirdi; otları, yaraları, ateşi tanırdı. Kan görmeye küçük yaşta alıştın. İnsanların en kırılgan hallerini gördüğün için ölümden az korkarsın — ama hekimlik yapmayı seçmedin ve bu ailende hâlâ bir kırgınlık.",
    etiketler: ["aile:hekim", "sifa_bilgisi"],
    para: -14,
    saglik: 9,
    un: 8,
    ahlak: 6,
    mutluluk: -2,
    yatkinlikEtkisi: { zanaat: 8, din: 4, ticaret: 2, savas: -3 },
  },
  {
    id: "denizci",
    ad: "Denizci",
    agirlik: 1,
    cag: "Sanayi Devrimi",
    anlati:
      "Baban {bolge} limanlarından kalkan buharlı gemilerde yıllarca çalıştı, bir seferden hiç dönmedi. Sen liman meyhanelerinde büyüdün; yabancı dilleri, hileli zarları ve fırtınadan önceki sessizliği tanırsın.",
    etiketler: ["aile:denizci", "liman_asinasi"],
    para: 12,
    saglik: 6,
    un: -4,
    ahlak: -14,
    mutluluk: -2,
    yatkinlikEtkisi: { ticaret: 8, savas: 4, zanaat: 2, din: -3 },
  },
  {
    id: "madenci",
    ad: "Madenci",
    agirlik: 1,
    cag: "Sanayi Devrimi",
    anlati:
      "Ailen {bolge} yakınlarındaki madende çalıştı; iki amcan yer altında kaldı. Karanlıktan korkmayı çoktan bıraktın. Ağır işin parası iyiydi, bedeli ciğerlerindi — ve o bedeli sen de ödemeye başladın bile.",
    etiketler: ["aile:madenci", "yeralti_bilgisi"],
    para: 18,
    saglik: -10,
    un: -6,
    ahlak: 10,
    mutluluk: -8,
    yatkinlikEtkisi: { zanaat: 8, savas: 4, ticaret: 2, din: -3 },
  },
  {
    id: "kacakci",
    ad: "Kaçakçı",
    agirlik: 1,
    anlati:
      "Ailen {bolge} sınırlarında gümrüğe uğramayan mallarla geçindi. Gece yürümeyi, soru sormamayı ve kimseye tam adını söylememeyi öğrendin. Cebinde her zaman para vardı; ama jandarma da her zaman kapıdaydı.",
    etiketler: ["aile:kacakci", "karanlik_baglantilar"],
    para: 18,
    saglik: 3,
    un: -15,
    ahlak: -15,
    mutluluk: -6,
    yatkinlikEtkisi: { ticaret: 8, savas: 4, zanaat: 2, din: -3 },
  },
  {
    id: "tefeci",
    ad: "Tefeci",
    agirlik: 1,
    anlati:
      "Baban {bolge} esnafına faizle borç verirdi; kapınızı çalanlar ya yalvarırdı ya tehdit ederdi. Paranın insanları nasıl değiştirdiğini çocukken öğrendin. Zengin büyüdün, sevilmeden büyüdün.",
    etiketler: ["aile:tefeci", "borc_agi"],
    para: 20,
    saglik: -1,
    un: -15,
    ahlak: -15,
    mutluluk: -10,
    yatkinlikEtkisi: { ticaret: 8, zanaat: 4, savas: 2, din: -3 },
  },
  {
    id: "katip",
    ad: "Kâtip",
    agirlik: 1,
    cag: "Sanayi Devrimi",
    anlati:
      "Baban {bolge}'nin yeni demiryolu şirketinde defter tutar, kimin kime ne borçlu olduğunu aynı sayfalara yazardı. Okuma yazmayı ve rakamları erken öğrendin. Kalem tutan eller güçlüdür ama fabrika patronunun öfkesine karşı hiçbir zaman yeterli değildir.",
    etiketler: ["aile:katip", "okur_yazar"],
    para: -10,
    saglik: -6,
    un: 14,
    ahlak: 12,
    mutluluk: -4,
    yatkinlikEtkisi: { ticaret: 8, din: 4, zanaat: 2, savas: -3 },
  },
  {
    id: "cellat",
    ad: "Cellat",
    agirlik: 1,
    anlati:
      "Babanın mesleğini kimse yüksek sesle söylemezdi. {bolge} meydanında infazları o yapardı; eve döndüğünde ellerini uzun uzun yıkardı. Devlet iyi para verirdi, komşular ise selam vermezdi. Ölümle senli benli büyüdün.",
    etiketler: ["aile:cellat", "korkulan_soyad"],
    para: 14,
    saglik: 4,
    un: -15,
    ahlak: -14,
    mutluluk: -10,
    yatkinlikEtkisi: { savas: 8, zanaat: 4, ticaret: 2, din: -3 },
  },
  {
    id: "saray_hizmetkari",
    ad: "Saray Hizmetkârı",
    agirlik: 1,
    anlati:
      "Annen {bolge} sarayında hizmetkârdı; mutfağın arka kapısından büyük salonları izleyerek büyüdün. Soyluların nasıl konuştuğunu, nasıl yalan söylediğini ezbere bilirsin. Onlardan biri değilsin ama aralarında nasıl durulacağını biliyorsun.",
    etiketler: ["aile:saray", "saray_asinasi"],
    para: 6,
    saglik: -2,
    un: 14,
    ahlak: -10,
    mutluluk: -2,
    yatkinlikEtkisi: { ticaret: 8, zanaat: 4, din: 2, savas: -3 },
  },
  {
    id: "surgun",
    ad: "Sürgün",
    agirlik: 1,
    anlati:
      "Aileniz bir isyana karıştığı için memleketinden sürüldü; {bolge} topraklarına yabancı olarak geldiniz. Soyadınız burada kimseye bir şey ifade etmiyor, hatta bazı kapılar duyunca kapanıyor. Sıfırdan başlamayı herkesten iyi bilirsin.",
    etiketler: ["aile:surgun", "yabanci_sayilir"],
    para: -12,
    saglik: 4,
    un: -15,
    ahlak: 14,
    mutluluk: -8,
    yatkinlikEtkisi: { savas: 8, zanaat: 4, ticaret: 2, din: -3 },
  },
  // --- Orta Çağ'a özel aileler ---
  {
    id: "sovalye",
    ad: "Şövalye",
    agirlik: 1,
    cag: "Orta Çağ",
    anlati:
      "Ailen kuşaklardır {bolge} beyliğine kılıç borçlu bir şövalye hanedanı. Zırh kuşanmayı, yemin etmeyi ve yeminini tutmayı öğrendin — soylulardan farklı olarak sizde onur satılık değildi. Ama savaş meydanları hep aç, hep açtı.",
    devamMeslegi: "Asker",
    etiketler: ["aile:sovalye", "sovalye_kani"],
    para: 10,
    saglik: 4,
    un: 15,
    ahlak: 10,
    mutluluk: -4,
    yatkinlikEtkisi: { savas: 8, din: 4, ticaret: 2, zanaat: -3 },
  },
  {
    id: "haci",
    ad: "Hacı Ailesi",
    agirlik: 1,
    cag: "Orta Çağ",
    anlati:
      "Ailen nesillerdir hac yollarına düşer; kervanları, tehlikeli geçitleri ve yabancı şehirlerin pazarlarını tanır. Evde her zaman uzak diyarlardan getirilmiş bir tespih ya da bir hikaye vardı, ama kesenizde nadiren para kalırdı.",
    etiketler: ["aile:haci", "yol_bilgisi"],
    para: -12,
    saglik: -2,
    un: 6,
    ahlak: 14,
    mutluluk: 6,
    yatkinlikEtkisi: { din: 8, ticaret: 4, zanaat: 2, savas: -3 },
  },
  {
    id: "soytari",
    ad: "Soytarı",
    agirlik: 1,
    cag: "Orta Çağ",
    anlati:
      "Baban {bolge} sarayında soytarılık yaptı; kralı güldürmek karnını doyururdu, ama kimse bir soytarının sözüne itibar etmezdi. Sen de kahkaha atmayı ve kimsenin ciddiye almadığı bir ailenin çocuğu olmayı öğrendin.",
    etiketler: ["aile:soytari", "kahkaha_ustasi"],
    para: -14,
    saglik: 3,
    un: -6,
    ahlak: 6,
    mutluluk: 10,
    yatkinlikEtkisi: { ticaret: 8, zanaat: 4, savas: 2, din: -3 },
  },
  // --- Sanayi Devrimi'ne özel aileler ---
  {
    id: "muhendis",
    ad: "Mühendis",
    agirlik: 1,
    cag: "Sanayi Devrimi",
    devamMeslegi: "Zanaatkâr",
    anlati:
      "Baban {bolge}'nin yeni fabrikalarına buhar makineleri kurdu, evinizde her zaman bir plan kağıdı açık dururdu. Çarkların nasıl döndüğünü, bir hesabın nasıl tutmadığını erken yaşta öğrendin — ama makineler bazen ellerini de yerdi.",
    etiketler: ["aile:muhendis", "teknik_bilgi"],
    para: 16,
    saglik: -4,
    un: 8,
    ahlak: 6,
    mutluluk: 2,
    yatkinlikEtkisi: { zanaat: 8, ticaret: 4, din: 2, savas: -3 },
  },
  {
    id: "gazeteci",
    ad: "Gazeteci",
    agirlik: 1,
    cag: "Sanayi Devrimi",
    anlati:
      "Annen {bolge} gazetelerine haber yetiştirirdi; evinizde mürekkep kokusu ve dedikodu eksik olmazdı. Kimin ne yaptığını bilmeyi ve bunu nasıl anlatacağını erken öğrendin — ama bazı yazılar bazı kapıları sonsuza dek kapattı.",
    etiketler: ["aile:gazeteci", "haber_agi"],
    para: -12,
    saglik: -2,
    un: 15,
    ahlak: 8,
    mutluluk: 2,
    yatkinlikEtkisi: { ticaret: 8, zanaat: 4, savas: 2, din: -3 },
  },
  {
    id: "sirk_ailesi",
    ad: "Sirk Ailesi",
    agirlik: 1,
    cag: "Sanayi Devrimi",
    anlati:
      "Ailen çadırdan çadıra dolaşan bir sirk topluluğuydu; ip cambazlığı, hayvan terbiyesi ve alkış senin ninnindi. Her kasabada bir gece tanınıp sabah unutulmayı, hiçbir yere kök salamamayı öğrendin.",
    etiketler: ["aile:sirk", "gosteri_ustasi"],
    para: -16,
    saglik: 8,
    un: 12,
    ahlak: -6,
    mutluluk: 10,
    yatkinlikEtkisi: { zanaat: 8, ticaret: 4, din: 2, savas: -3 },
  },
  // --- Her iki çağda da görülebilen komik/absürt aileler ---
  {
    id: "define_avcisi",
    ad: "Define Avcısı",
    agirlik: 1,
    anlati:
      "Ailen kuşaklardır {bolge} çevresindeki her 'gömülü hazine' söylentisinin peşine düştü; yarım köyü kazdılar, tek bulduğu şey borç ve söndürülemeyen bir umuttu. Sen de her eski haritaya bir çift parlak gözle bakarsın.",
    etiketler: ["aile:define_avcisi", "hazine_avcisi"],
    para: -18,
    saglik: -2,
    un: -8,
    ahlak: 4,
    mutluluk: 6,
    yatkinlikEtkisi: { savas: 8, zanaat: 4, din: 2, ticaret: -3 },
  },
  {
    id: "falci",
    ad: "Falcı Ailesi",
    agirlik: 1,
    anlati:
      "Ailen nesillerdir {bolge} pazarında fincan ve el falına bakar; herkesin geleceğini bilirmiş gibi görünürler, kendi ceplerinin geleceğini hiç kestiremezler. Sen de insanların yüzünü okumayı, ama kendi kaderine şaşırmayı öğrendin.",
    etiketler: ["aile:falci", "kehanet_ailesi"],
    para: -10,
    saglik: 3,
    un: -4,
    ahlak: -6,
    mutluluk: 4,
    yatkinlikEtkisi: { ticaret: 8, zanaat: 4, savas: 2, din: -3 },
  },
  {
    id: "kumarbaz",
    ad: "Kumarbaz Aile",
    agirlik: 1,
    anlati:
      "Deden bir atı zarda kaybetti, baban evi masaya sürdü; sen sayıları koyunları saymadan önce zarlarda saymayı öğrendin. Evinizde şans hep bir sonraki elin içindeydi — bir türlü gelmeyen bir sonraki elin.",
    etiketler: ["aile:kumarbaz", "zar_kani"],
    para: -16,
    saglik: 3,
    un: -10,
    ahlak: -12,
    mutluluk: -6,
    yatkinlikEtkisi: { ticaret: 8, savas: 4, zanaat: 2, din: -3 },
  },
  {
    id: "tavuk_hirsizi",
    ad: "Tavuk Hırsızı Ailesi",
    agirlik: 1,
    anlati:
      "Ailen {bolge} köylerinde kümes kümes gezen, kimsenin tam olarak yakalayamadığı küçük hırsızlardı. Karnınız hep tavuklu doydu ama komşu köylerin hiçbirine rahatça giremezdiniz. Hızlı koşmayı ve daha hızlı yalan söylemeyi öğrendin.",
    etiketler: ["aile:tavuk_hirsizi", "kumes_ustasi"],
    para: 8,
    saglik: 3,
    un: -14,
    ahlak: -8,
    mutluluk: 6,
    yatkinlikEtkisi: { ticaret: 8, savas: 4, zanaat: 2, din: -3 },
  },
];

export function aileGetir(id: string): AileTanimi | undefined {
  return AILELER.find((a) => a.id === id);
}
