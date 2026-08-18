import { Cag, Kategori, SonucEtkisi, UlkeDurumu } from "../types";

/**
 * Bir seçeneğin hemen dice atmak yerine önce bir "tepki" gösterip oyuncuya
 * geri adım atma şansı verdiği ara-adım. Bu seçilince zaman ilerlemez, para/can
 * hiçbir şey değişmez — sadece metin gösterilir. Oyuncu ardından geriCekil ya da
 * devam seçeneğini seçtiğinde asıl sonuç (ve zaman ilerlemesi) o zaman uygulanır.
 */
export interface OnTepki {
  metin: string;
  geriCekilMetni: string;
  geriCekilSonucu: SonucEtkisi;
  devamMetni: string;
  devamSonucu: SonucEtkisi;
}

export interface OlaySecenegi {
  metin: string;
  baseBasariSansi: number;
  basariliSonuc: SonucEtkisi;
  basarisizSonuc: SonucEtkisi;
  /** Seçeneğin ön koşulu olan nakit; yoksa seçenek kilitlenir. */
  maliyet?: number;
  minUn?: number;
  minAhlak?: number;
  maxAhlak?: number;
  /** Belirtilirse bu seçenek sadece kültür puanı bu eşiğin üstünde olan karakterlere açılır (farklı dil/dinden insanlarla kurulmuş bağların kazandırdığı bir kapı). */
  minKultur?: number;
  gerekliEtiketler?: string[];
  /** Bu etiketlerden herhangi biri karakterde varsa seçenek kilitlenir (ör. fiziksel sakatlık, fobi). */
  yasakliEtiketler?: string[];
  kilitAciklamasi?: string;
  /** Oyuncuya gösterilen kısa risk/ödül ipucu. */
  ipucu?: string;
  /** Belirtilirse bu seçenek sadece bu kişilik özelliğine sahip karakterlere gösterilir. */
  gerekliKisilik?: string;
  /** Belirtilirse bu seçenek sadece kişilik ekseninde belirli bir aralıkta olan karakterlere gösterilir. */
  gerekliEksen?: { eksen: "fevrilik" | "merhamet"; min?: number; max?: number };
  /**
   * Belirtilirse bu seçenek seçildiğinde zar atılmaz; önce onTepki.metin gösterilir,
   * oyuncu geri çekilme/ısrar etme arasında seçim yapar, zaman o seçimde ilerler.
   * baseBasariSansi/basariliSonuc/basarisizSonuc bu durumda hiç kullanılmaz.
   */
  onTepki?: OnTepki;
  /**
   * Belirtilirse bu seçeneğin başarı şansı baseBasariSansi yerine, bu rolü taşıyan
   * ekip üyesinin gizli gercekKalite'sine eşitlenir (oyuncuya yine belirsiz aralık
   * olarak gösterilir). Olayda gerekliEkipRolu ile aynı rol kullanılmalı.
   */
  ekipKalitesiZarBelirler?: string;
}

export interface OlayTanimi {
  id: string;
  kategori: Kategori;
  /** Belirtilmezse olay her iki çağda da çıkabilir. */
  cag?: Cag;
  /** Belirtilmezse olay her bölgede çıkabilir; tarihi olaylar için kullanılır. */
  bolgeler?: string[];
  meslekler?: string[];
  minYas?: number;
  maxYas?: number;
  minAhlak?: number;
  maxAhlak?: number;
  minUn?: number;
  maxUn?: number;
  minMutluluk?: number;
  maxMutluluk?: number;
  /** Belirtilirse olay sadece rakip puanı bu eşiğin üstüne/altına çıkmış karakterlere gösterilir. */
  minRakipPuani?: number;
  maxRakipPuani?: number;
  gerekliEtiketler?: string[];
  yasakliEtiketler?: string[];
  gerekliUlke?: Partial<UlkeDurumu>;
  /** Belirtilirse olay sadece bu kişilik özelliğine sahip karakterlere çıkar. */
  gerekliKisilik?: string;
  /** Belirtilirse olay sadece bu din/kültüre (state.din_kultur) sahip karakterlere çıkar. */
  gerekliDin?: string;
  /** Belirtilirse olay sadece bu rütbe seviyesine (veya üstüne) ulaşmış karakterlere çıkar. */
  minRutbeSeviye?: number;
  /** true ise olay sadece en az bir ekip üyesi olan karakterlere çıkar. */
  gerekliEkip?: boolean;
  /** Belirtilirse olay sadece bu spesifik role sahip bir ekip üyesi olan karakterlere çıkar. */
  gerekliEkipRolu?: string;
  /** true ise olay sadece bir hizbe katılmış (tarafsız dahil değil) karakterlere çıkar. */
  gerekliHizip?: boolean;
  /** true ise bu olay sadece "hapiste" etiketi taşıyan karakterlere çıkar; hapisteyken normal olay havuzu tamamen kapanır. */
  hapisOlayi?: boolean;
  agirlik?: number;
  sureYilMin?: number;
  sureYilMax?: number;
  /** Ağır (trajik) ya da hafif (komik) olaylar art arda gelmesin diye kullanılan ton etiketi. */
  ton?: "agir" | "hafif";
  /** Salt arka planda kullanılan iç kategorizasyon: gizemli eşya edinim/takip olayı mı? Oyuncuya hiçbir yerde gösterilmez, uygunluk/seçim mantığını etkilemez. */
  gizemli?: boolean;
  gorsel?: string;
  baslik: string;
  metin: string;
  secenekler: OlaySecenegi[];
}

export const OLAY_BANKASI: OlayTanimi[] = [
  // ============================================================
  // KİŞİSEL GELİŞİM — Etiketler, Fobiler ve Gizli Eşyalar
  // ============================================================
  {
    id: "kg_agir_idman",
    kategori: "saglik",
    agirlik: 0.6,
    gorsel: "🏃",
    baslik: "Sınırları Zorlamak",
    metin:
      "Son zamanlarda zayıf düştüğünü hissediyorsun. Vücudunu eski direncine kavuşturmak için sınırlarını sonuna kadar zorlayacağın ağır bir idman ritüeline başlayabilirsin. Ancak yaşın ve bedenin bunu kaldırabilir mi?",
    secenekler: [
      {
        metin: "Acıya dayan, sınırlarını aş.",
        baseBasariSansi: 60,
        ipucu: "Kalıcı fiziksel güç ya da kronik bir sakatlık",
        basariliSonuc: {
          saglik: 15,
          mutluluk: 5,
          etiket_ekle: ["fiziksel:guc_sembolu"],
          mesaj: "Kasların çeliğe dönüştü. Vücudun artık en ağır darbelere bile dayanacak kadar sağlam.",
        },
        basarisizSonuc: {
          saglik: -10,
          etiket_ekle: ["kalici:kronik_agri"],
          durum_ekle: {
            id: "kronik_agri",
            ad: "Kronik Eklem Ağrısı",
            tur: "kalici",
            tur_basi_saglik: -1
          },
          mesaj: "Bedenin bu yükü kaldıramadı. Dizindeki lifler koptu; artık yağmurlu havalarda bile sızlayan kalıcı bir ağrın var.",
        },
      },
      {
        metin: "Riske girme, hafif yürüyüşlerle yetin.",
        baseBasariSansi: 90,
        basariliSonuc: { saglik: 5, mesaj: "Güvenli olanı seçtin. Terlemedin ama sakatlanmadın da." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Hafif yürüyüş bile seni nefes nefese bıraktı." },
      },
    ],
  },
  {
    id: "kg_yasakli_kitap",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "📖",
    baslik: "Mühürlü Kitap",
    metin:
      "Pazarda tuhaf giyimli bir yabancı sana deri kaplı, mühürlü bir kitap sattı. Kitabın içindeki yazıların yerel otoriteler (veya kilise) tarafından yasaklandığı çok açık. İçinde tehlikeli sırlar olabilir.",
    secenekler: [
      {
        metin: "Mührü kır ve karanlık ilmi oku.",
        baseBasariSansi: 70,
        ipucu: "Gizli bilgi kazandırır ama ahlakı lekeler, yakalanma riski vardır",
        basariliSonuc: {
          mutluluk: 10,
          ahlak: -15,
          etiket_ekle: ["bilgi:yasak_ilim"],
          mesaj: "Kitabın anlattıkları dünyaya bakışını değiştirdi. Artık sıradan insanların bilmediği şeyleri biliyorsun.",
        },
        basarisizSonuc: { 
          un: -20, 
          ahlak: -20,
          mesaj: "Sayfaları çevirirken bir komşun seni pencereden gördü ve şikayet etti. İtibarın yerle bir oldu." 
        },
      },
      {
        metin: "Kitabı okumadan yetkililere (veya kiliseye) teslim et.",
        baseBasariSansi: 85,
        ipucu: "Temiz vicdan ve itibar artışı",
        basariliSonuc: { ahlak: 15, un: 10, mesaj: "Kitabı teslim ettin. Otoriteler sadakatini ve inancını takdir etti." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Kitabı verdin ama içinde ne yazdığı hayatın boyunca içinde bir merak olarak kaldı." },
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
        ipucu: "Bir sonraki olayın başarı şansını netleştiren bir 'İstihbarat' kazandırır",
        basariliSonuc: {
          para: -15,
          etiket_ekle: ["istihbarat_var"],
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
        ipucu: "Dostluk artar ama bağımlılık (alkol) riski başlar",
        basariliSonuc: { 
          dost_puani: 10, 
          mutluluk: 5,
          etiket_ekle: ["bagimlilik:alkol_meyil"],
          mesaj: "Sadece içtiniz ve eğlendiniz. Ancak kadehin dibini sıyırırken bu hayata biraz fazla alıştığını fark ediyorsun." 
        },
        basarisizSonuc: { dost_puani: -5, mesaj: "Aklın yan masada kaldığı için {dost} ile sohbetin çok yavan geçti." },
      },
    ],
  },
  {
    id: "kg_antika_harita",
    kategori: "ticaret",
    agirlik: 0.6,
    gorsel: "🎨",
    baslik: "Eskicinin Çöpü",
    metin: "Boş vaktinde bir eskici tezgahında, üzeri çamurla kaplı eski bir parşömen buldun. Altında bir harita çizgileri var gibi görünüyor.",
    secenekler: [
      {
        metin: "Gecelerini harcayıp haritayı restore et.",
        baseBasariSansi: 45,
        ipucu: "Yorucu bir çaba ama efsanevi bir gizli eşya (Envanter) verebilir",
        basariliSonuc: {
          saglik: -5,
          mutluluk: 15,
          etiket_ekle: ["envanter:gizemli_harita"],
          mesaj: "Gözlerin bozulana kadar çalıştın ama başardın! Bu sıradan bir parşömen değil, unutulmuş bir geçidin haritası. Bunu saklamalısın.",
        },
        basarisizSonuc: { mutluluk: -5, saglik: -5, mesaj: "Çamuru temizlerken parşömen yırtıldı ve tamamen yok oldu. Hem yoruldun hem de elin boş kaldı." },
      },
      {
        metin: "Bununla uğraşma, doğrudan bir asilzadeye 'antika' diye sat.",
        baseBasariSansi: 75,
        ipucu: "Hızlı para, ahlak düşüşü",
        basariliSonuc: { para: 20, ahlak: -10, mesaj: "Süslü kelimelerle çamurlu parşömeni antika diye sattın. Cebin doldu ama kimi kandırdığını biliyorsun." },
        basarisizSonuc: { un: -10, ahlak: -5, mesaj: "Asilzade bunun bir çöp olduğunu anladı ve seni kapı dışarı ettirdi." },
      },
    ],
  },

  // ============================================================
  // İLİŞKİLER — EVLİLİK VE AİLE
  // ============================================================
  {
    id: "iliski_evlilik_teklifi",
    kategori: "sosyal",
    minYas: 17,
    yasakliEtiketler: ["medeni:evli"],
    gorsel: "💍",
    baslik: "Nüfuzlu Bir Bağ",
    metin:
      "{dost} sana şehirde oldukça güçlü bağlantıları olan bir ailenin ferdiyle tanıştırdı. İkiniz arasında soğuk ama saygılı bir bağ oluştu. Bu evlilik aşk dolu olmayacak ama sana büyük kapılar açabilir.",
    secenekler: [
      {
        metin: "Mantık evliliğini kabul et.",
        baseBasariSansi: 85,
        ipucu: "Statü ve para kazandırır, mutsuz bir evlilik riski yüksektir",
        basariliSonuc: {
          es_ata: true,
          para: 25,
          un: 15,
          etiket_ekle: ["medeni:evli", "itibar:nufuzlu_evlilik"],
          mesaj: "Tören oldukça gösterişliydi. Artık güçlü bir ailenin parçasısın ancak yatağa girdiğinde hissettiğin tek şey üşüme.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          un: -15,
          mesaj: "Aile son anda senin statünü yetersiz bulup düğünü iptal etti. Şehirde alay konusu oldun.",
        },
      },
      {
        metin: "Bana aşk lazım de ve teklifi geri çevir.",
        baseBasariSansi: 95,
        ipucu: "Ahlak artar, itibar ve para fırsatı kaçar",
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
    id: "iliski_ikinci_teklif",
    kategori: "sosyal",
    gerekliEtiketler: ["iliski_ikinci_teklif_zamani"],
    yasakliEtiketler: ["medeni:evli"],
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
          etiket_ekle: ["medeni:evli", "itibar:fakir_ama_mutlu"],
          etiket_sil: ["iliski_ikinci_teklif_zamani"],
          mesaj: "Çok sade bir törenle evlendiniz. Soframızda sadece kuru ekmek var ama o varken bir saray ziyafeti gibi geliyor.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          etiket_sil: ["iliski_ikinci_teklif_zamani"],
          mesaj: "Aşkına karşılık bulamadın. O, başka bir şehirde yaşamayı seçti ve kalbini paramparça edip gitti.",
        },
      },
      {
        metin: "Aşk karın doyurmaz, yalnızlığıma devam edeyim.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 5,
          etiket_sil: ["iliski_ikinci_teklif_zamani"],
          mesaj: "Duygularını bastırdın ve mantığını seçtin. Kasan belki dolacak ama o gözler hayatın boyunca aklından çıkmayacak.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          etiket_sil: ["iliski_ikinci_teklif_zamani"],
          mesaj: "Mantığını seçtin ama acı çekiyorsun.",
        },
      },
    ],
  },
  {
    id: "iliski_ev_ici_kavga",
    kategori: "sosyal",
    gerekliEtiketler: ["medeni:evli"],
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
            tur_basi_mutluluk: -5
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
    gerekliEtiketler: ["medeni:evli"],
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
          etiket_ekle: ["itibar:esi_icin_feda_eden"],
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
    id: "iliski_cocuk_mujdesi",
    kategori: "sosyal",
    gerekliEtiketler: ["medeni:evli"],
    gorsel: "👶",
    baslik: "Bir Varis Doğuyor",
    metin: "{es} sana bir haber veriyor: Aileniz büyüyecek! Ancak doktorlar, {es}'in bünyesinin zayıf olduğunu ve doğumun çok riskli olabileceğini söylüyor.",
    secenekler: [
      {
        metin: "En pahalı ebeyi ve doktoru tut (Riskleri azalt).",
        baseBasariSansi: 85,
        maliyet: 25,
        ipucu: "Maliyetlidir ama eşinin ve çocuğunun hayatta kalma şansını çok artırır",
        basariliSonuc: {
          para: -25,
          cocuk_ekle: 1,
          mutluluk: 20,
          es_puani: 15,
          mesaj: "Parayı esirgemedin ve doktorların müdahalesiyle hem {es} hem de çocuğun sağ salim kurtuldu! Evde bayram havası var.",
        },
        basarisizSonuc: {
          para: -25,
          es_kaybet: true,
          cocuk_ekle: 1,
          mutluluk: -30,
          saglik: -10,
          etiket_ekle: ["kalici:es_acisi"],
          mesaj: "Ne kadar para dökersen dök, kader değişmedi. Çocuğun doğdu ama {es} doğum yatağında son nefesini verdi.",
        },
      },
      {
        metin: "Param yok, köyün yaşlı ebesine güveneceğiz.",
        baseBasariSansi: 40,
        ipucu: "Çok riskli! Ölüm ihtimali yüksek",
        basariliSonuc: {
          cocuk_ekle: 1,
          mutluluk: 15,
          mesaj: "Tanrı'nın bir lütfu! Hiçbir masraf yapmadan, tamamen şans eseri sağlıklı bir çocuk dünyaya geldi.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -40,
          saglik: -15,
          etiket_ekle: ["kalici:es_acisi", "kalici:cocuk_acisi"],
          mesaj: "Ucuz ebe kanamayı durduramadı. Hayatının en karanlık gecesinde hem {es}'i hem de doğmamış bebeğini kaybettin.",
        },
      },
    ],
  },
  {
    id: "iliski_bosanma_esigi",
    kategori: "sosyal",
    ton: "agir",
    gerekliEtiketler: ["medeni:evli"],
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
          etiket_ekle: ["kalici:bosanmis"],
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
          etiket_ekle: ["kalici:bosanmis"],
          mesaj: "Ayrılık acı vericiydi. Eşyalar paylaşıldı, cüzdanın boşaldı ama en azından o boğucu sessizlik bitti.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -25,
          para: -40,
          ahlak: -5,
          etiket_ekle: ["kalici:bosanmis"],
          mesaj: "Süreç iğrenç bir dedikodu savaşına döndü. Adın lekelendi, servetinin yarısını mahkemede bıraktın.",
        },
      },
    ],
  },
  {
    id: "iliski_es_hastalik",
    kategori: "saglik",
    ton: "agir",
    gerekliEtiketler: ["medeni:evli"],
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
          etiket_ekle: ["es_minnettar"],
          mesaj: "Hekim tam zamanında yetişti! {es} ölümün kıyısından döndü. Kasan bomboş ama evinde nefes alan bir can var.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -30,
          saglik: -10,
          para: -40,
          etiket_ekle: ["kalici:dul", "kalici:es_acisi"],
          mesaj: "Parayı su gibi akıttın ama yetmedi. {es} ellerinin arasında son nefesini verdi. Ev artık buz gibi bir mezar.",
        },
      },
      {
        metin: "Param yok, kader ne yazdıysa o olur.",
        baseBasariSansi: 25,
        ipucu: "Ahlaken çöküntü ve yüksek ölüm riski",
        basariliSonuc: { 
          es_puani: 10, 
          mesaj: "Bir mucize oldu! {es} kendi vücut direnciyle hastalığı yendi. Ancak parayı kıskanman aranızda görünmez bir duvar ördü." 
        },
        basarisizSonuc: {
          es_kaybet: true,
          ahlak: -15,
          mutluluk: -30,
          etiket_ekle: ["kalici:dul", "vicdan_azabi"],
          mesaj: "{es} acılar içinde can verdi. Cenazesinde herkes senin ne kadar 'tutumlu' olduğunu fısıldaşıyordu.",
        },
      },
    ],
  },

  // ============================================================
  // SOYLU AİLE — SARAY ENTRİKASI
  // ============================================================
  {
    id: "soylu_saray_entrikasi",
    kategori: "siyaset",
    ton: "agir",
    gerekliEtiketler: ["aile:soylu"],
    minYas: 16,
    agirlik: 0.8,
    gorsel: "🗡️",
    baslik: "Karanlık Koridorların Fısıltısı",
    metin:
      "Sarayın karanlık koridorlarında adının geçtiği bir fısıltı duydun: Kuzenlerinden biri (veya güçlü bir rakip) senin yükselişinden rahatsız. Kadehindeki tuhaf tat, gölgede bekleyen adamlar... Soylu kanın seni hedef haline getirdi.",
    secenekler: [
      {
        metin: "Tehdidi görmezden gel, korumalarını artır.",
        baseBasariSansi: 55,
        ipucu: "Sakin kalırsan itibarın artar, ama suikast riski gerçektir",
        basariliSonuc: {
          un: 15,
          etiket_ekle: ["itibar:korkusuz_soylu"],
          mesaj: "Soğukkanlılığını korudun. Korkmadığını gören düşmanların geri adım attı; adın sarayda saygıyla anılıyor.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 20,
          durum_ekle: { id: "suikast_yarasi", ad: "Suikast Yarası", tur: "kalici", tur_basi_saglik: -1 },
          mesaj: "Bir gece gölgeden çıkan zehirli bir hançer seni buldu. Canını zor kurtardın ama yaran asla tam iyileşmeyecek.",
        },
      },
      {
        metin: "Karanlık adamlar tut, şüphelendiğin kişiyi ilk sen ortadan kaldır.",
        baseBasariSansi: 45,
        ipucu: "Tehdidi tamamen yok eder ama ruhunu lekeler",
        basariliSonuc: {
          ahlak: -25,
          un: 10,
          etiket_ekle: ["sir:kanli_eller"],
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

  // ============================================================
  // EKONOMİ — YATIRIM, KRİZ, VERGİ
  // ============================================================
  {
    id: "ekonomi_guvenli_yatirim",
    kategori: "ticaret",
    yasakliEtiketler: ["yatirim:guvenlide"],
    minYas: 17,
    gorsel: "🏦",
    baslik: "Kardeşin Dükkânı",
    metin:
      "Ailenden biri (kardeşin veya yakın kuzenin) sana gelip kuracağı yeni demirci/dokumacı dükkânı için sermayene ortak olmayı teklif ediyor. Büyük kazandırmaz ama paranın yabancıya gitmeyeceğini söylüyor.",
    secenekler: [
      {
        metin: "Aileye destek ol, sermayeyi ver.",
        baseBasariSansi: 90,
        maliyet: 40,
        ipucu: "Sürekli küçük gelir ve güçlü aile bağı",
        basariliSonuc: {
          para: -40,
          etiket_ekle: ["yatirim:guvenlide", "aile_is_ortagi"],
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
        basariliSonuc: { mesaj: "Paranı cebinde tuttun. Kardeşin biraz bozuldu ama en azından risk almadın." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Kardeşin başkasından borç bulup dükkânı açtı ve çok başarılı oldu. Şimdi içten içe pişmansın." },
      },
    ],
  },
  {
    id: "ekonomi_tefecilik_teklifi",
    kategori: "ticaret",
    yasakliEtiketler: ["yatirim:tefecide"],
    minYas: 18,
    gorsel: "🪙",
    baslik: "Çaresiz Dost",
    metin:
      "Çok eski ve çaresiz bir dostun dükkânını kaybetmemek için senden borç istiyor. Ancak sana çok yüksek bir faizle ödemeyi teklif ediyor. Bu teklif hem kârlı hem de ahlaken tartışmalı.",
    secenekler: [
      {
        metin: "Ahlakı boş ver, yüksek faizle borcu ver.",
        baseBasariSansi: 100,
        maliyet: 35,
        ipucu: "Garantili yatırım başlangıcı ama ahlakı düşürür",
        basariliSonuc: {
          para: -35,
          ahlak: -15,
          etiket_ekle: ["yatirim:tefecide", "itibar:tefeci"],
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
          etiket_ekle: ["yatirim:tefecide", "itibar:tefeci"],
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
        basariliSonuc: { ahlak: 5, mesaj: "Dostuna faizle borç vermeyi reddettin. Dükkânı battı ama senin vicdanın ve paran yerinde." },
        basarisizSonuc: { dost_puani: -10, mesaj: "Dostun dükkânı kaybetti ve seni 'kötü gün dostu olmamakla' suçladı." },
      },
    ],
  },
  {
    id: "ekonomi_tefecilik_sonucu",
    kategori: "ticaret",
    gerekliEtiketler: ["yatirim:tefeci_zamani"],
    gorsel: "⚖️",
    baslik: "Vade Doldu",
    metin: "Eski dostuna verdiğin borcun vadesi doldu. Gidip kapısına dayandın ancak ağlayarak işlerin kötü gittiğini ve parası olmadığını söylüyor. İki seçeneğin var.",
    secenekler: [
      {
        metin: "Adam tut, dükkânına el koy ve onu sokağa at.",
        baseBasariSansi: 95,
        ipucu: "Paranı fazlasıyla alırsın ama acımasız bir canavara dönüşürsün",
        basariliSonuc: {
          para: 60,
          ahlak: -30,
          etiket_sil: ["yatirim:tefecide", "yatirim:tefeci_zamani"],
          etiket_ekle: ["itibar:acimasiz_tefeci"],
          mesaj: "Adamlarını gönderdin. Dostunun ailesi sokakta ağlarken dükkânın anahtarlarını aldın. Sen kazandın.",
        },
        basarisizSonuc: {
          para: 40,
          ahlak: -20,
          un: -15,
          etiket_sil: ["yatirim:tefecide", "yatirim:tefeci_zamani"],
          mesaj: "Dükkânı zorla aldın ama mahalleli seni yuhaladı. Artık arkandan 'kan emici' diyorlar.",
        },
      },
      {
        metin: "Eski günlerin hatırına borcu sil, onu affet.",
        baseBasariSansi: 100,
        ipucu: "Muazzam bir ahlak artışı ama yatırdığın tüm para uçar",
        basariliSonuc: {
          ahlak: 35,
          un: 15,
          etiket_sil: ["yatirim:tefecide", "yatirim:tefeci_zamani"],
          etiket_ekle: ["itibar:merhametli"],
          mesaj: "Senetleri gözünün önünde yırttın. Dostun ayaklarına kapandı. Paranı kaybettin ama ruhunu geri kazandın.",
        },
        basarisizSonuc: {
          ahlak: 25,
          etiket_sil: ["yatirim:tefecide", "yatirim:tefeci_zamani"],
          mesaj: "Borcu sildin. İçin rahat ama akşam eve dönerken o paraya ne kadar ihtiyacın olduğunu hatırladın.",
        },
      },
    ],
  },
  {
    id: "ekonomi_kriz_donemi",
    kategori: "ticaret",
    gerekliUlke: { ekonomi: "kotu" },
    gorsel: "📉",
    baslik: "Krizin Acı Yüzü",
    metin:
      "Ülkedeki ekonomik kriz evine ulaştı. Kilerde aileni doyuracak erzak kalmadı, dükkânın ise iflasın eşiğinde. Elindeki son sermayeyle ya ailene karaborsadan yiyecek alacaksın, ya da aileni aç bırakıp işini kurtarmak için sermayeyi işe yatıracaksın.",
    secenekler: [
      {
        metin: "İşi boşver, son paramla aileme erzak al.",
        baseBasariSansi: 85,
        ipucu: "Aile hayatta kalır ama işin tamamen batar",
        basariliSonuc: { 
          para: -30,
          saglik: 5,
          ahlak: 15,
          un: -15,
          mesaj: "Tezgâhı kapattın. İflas ettin, itibarın sıfırlandı ama akşam sofrada çocukların/ailen sıcak çorba içiyor." 
        },
        basarisizSonuc: { 
          para: -40, 
          mutluluk: -10, 
          mesaj: "Sermayeyi erzağa verdin ama karaborsacı seni dolandırdı. Hem iflas ettin hem de yarı aç kaldınız." 
        },
      },
      {
        metin: "Ailem dişini sıksın, parayı işime kurtarmaya harca.",
        baseBasariSansi: 50,
        ipucu: "İşin kurtulur ve büyür ama ailen ağır yara alır",
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
        ipucu: "Para cebinde kalır ama tahsildar seni şantaja bağlayabilir",
        basariliSonuc: { mesaj: "Kullanılmadı" },
        basarisizSonuc: { mesaj: "Kullanılmadı" },
        onTepki: {
          metin: "Tahsildar uzattığın keseyi alırken gülümsüyor. 'Çok akıllısın... Ama bu miktar sadece bu ay için defteri temizler. Anlıyorsun değil mi?' Açgözlü adam seni haraca bağlamaya çalışıyor!",
          geriCekilMetni: "Sinirlen ve onu dükkândan kov! (Rüşvetten dön)",
          geriCekilSonucu: {
            para: -25,
            un: 5,
            ahlak: 10,
            mesaj: "Adama bağırıp onu kovdun! Sonra gidip vergini dürüstçe devlet kasasına ödedin. Paran gitti ama onurun kurtuldu."
          },
          devamMetni: "Sessizce kabul et, rüşvet çarkına gir.",
          devamSonucu: {
            para: 15,
            ahlak: -20,
            etiket_ekle: ["sir:rusvet_verdi"],
            mesaj: "Tahsildarın adamı oldun. Vergiden yırttın ama artık bu sırrın esirisin."
          }
        }
      },
      {
        metin: "Devletin vergisini tam ve eksiksiz öde.",
        baseBasariSansi: 95,
        maliyet: 30,
        basariliSonuc: { 
          para: -30, 
          ahlak: 15, 
          etiket_ekle: ["itibar:durust_mukellef"],
          mesaj: "Tahsildar somurtarak tam vergiyi aldı. Cebin delindi ama kimseye boyun eğmedin." 
        },
        basarisizSonuc: { para: -30, mesaj: "Vergini ödedin ama tahsildar seni mimledi. Helal kazancın bile şüpheli gösterilecek." },
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
        ipucu: "Muazzam kazanç ama sonsuza dek bir sırrın olacak",
        basariliSonuc: { 
          para: 45, 
          ahlak: -25, 
          etiket_ekle: ["sir:karanlik_ortak"],
          mesaj: "Keseyi cübbene sakladın. Zenginleştin ama artık geceleri kapı her çalındığında kalbin gümleyecek." 
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
        ipucu: "İtibarın artar ama adam senin rakibin olur",
        basariliSonuc: { 
          ahlak: 20, 
          un: 15, 
          etiket_ekle: ["itibar:satinalinamaz"],
          mesaj: "Adamı dükkânından kovdun! Halk senin bu cesaretini konuşuyor, sen 'Satılamaz Adam'sın." 
        },
        basarisizSonuc: { 
          mutluluk: -10, 
          rakip_puani: 20,
          mesaj: "Adam keseyi geri alırken gözlerini kıstı. O günden itibaren senin en büyük ve karanlık düşmanın oldu." 
        },
      },
    ],
  },

  // ============================================================
  // RÜTBE KARARLARI VE BİRLİK YÖNETİMİ
  // ============================================================
  {
    id: "rutbe_kumandan_karari",
    kategori: "savas",
    meslekler: ["Asker"],
    minRutbeSeviye: 3,
    gorsel: "⚔️",
    baslik: "Komutanın İkilemi",
    metin:
      "Düşman hatları önündesin. Eğer saldırı emri verirsen zafer kazanma ihtimalin yüksek ama emrindeki gencecik askerlerin çoğu ölecek. Beklersen askerlerin yaşar ama savaş kaybedilebilir.",
    secenekler: [
      {
        metin: "Ölüme yürüyoruz! Saldırı emri ver.",
        baseBasariSansi: 50,
        ipucu: "Büyük ün ve kanlı bir unvan, ağır ahlaki çöküş",
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
        ipucu: "İtibar kaybı ama yüksek ahlak ve farklı bir unvan",
        basariliSonuc: { 
          ahlak: 25, 
          un: -15, 
          unvan_kazan: "Merhametli Komutan",
          mesaj: "Düşman ilerledi, savaşı kaybettiniz gibi görünüyor. Ama askerlerin sana minnettar, onların hayatını kurtardın." 
        },
        basarisizSonuc: { 
          un: -25, 
          mesaj: "Kral seni korkak ilan etti. Rütbelerin sökülme tehlikesiyle karşı karşıya." 
        },
      },
    ],
  },
  {
    id: "rutbe_lonca_ustasi_karari",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    minRutbeSeviye: 3,
    gorsel: "🏛️",
    baslik: "Lonca Ustasının Gücü",
    metin: "Artık şehrin ticaret hakimi sensin. Piyasaya giren tüm mallara tekel koyup küçük esnafı ezebilir ya da malları onlarla paylaşıp halkın adamı olabilirsin.",
    secenekler: [
      {
        metin: "Tekel kur, tüm malları kendi depolarına çek.",
        baseBasariSansi: 65,
        ipucu: "Muazzam zenginlik, halkın nefreti",
        basariliSonuc: { 
          para: 60, 
          ahlak: -30, 
          unvan_kazan: "Açgözlü Baron",
          mesaj: "Piyasadaki her şeyi sömürdün. Küçük esnaf iflas ederken sen altından kuleler inşa ediyorsun." 
        },
        basarisizSonuc: { 
          para: -20, 
          mutluluk: -15, 
          mesaj: "Küçük esnaf isyan edip depolarını yaktı! Açgözlülük büyük bir yangınla son buldu." 
        },
      },
      {
        metin: "Malları adil dağıt, küçük esnafı koru.",
        baseBasariSansi: 90,
        ipucu: "Ahlak artışı, ancak paran büyümez",
        basariliSonuc: { 
          ahlak: 30, 
          un: 20, 
          para: -10,
          unvan_kazan: "Halkın Tüccarı",
          mesaj: "Şehirdeki tüm esnaf sana dua ediyor. Zenginleşmedin ama şehrin en sevilen ve sayılan adamı oldun." 
        },
        basarisizSonuc: { 
          para: -10, 
          mesaj: "Adil olmaya çalıştın ama diğer büyük tüccarlar seni aralarından dışladı." 
        },
      },
    ],
  },
  {
    id: "rutbe_basrahip_hukmu",
    kategori: "din",
    meslekler: ["Din Adamı"],
    minRutbeSeviye: 3,
    gorsel: "📿",
    baslik: "İlahî Adalet",
    metin: "Şehrin en zengin soylusu tapınağında büyük bir cinayet işledi. Onu aforoz edip idama gönderebilirsin ya da yüklü bir 'kilise bağışı' karşılığı günahını affedebilirsin.",
    secenekler: [
      {
        metin: "Tanrı'nın adaleti satılmaz! Onu aforoz et.",
        baseBasariSansi: 50,
        ipucu: "Ahlaki zafer, çok tehlikeli düşmanlar",
        basariliSonuc: { 
          ahlak: 40, 
          un: 25, 
          etiket_ekle: ["itibar:adalet_kilici"],
          mesaj: "Soylu şok içinde zincirlere vuruldu. Halk cesaretini ayakta alkışlıyor!" 
        },
        basarisizSonuc: { 
          dost_puani: -20, 
          olum_sansi: 20, 
          mesaj: "Soylu ailesi bunu kabullenmedi. Bir gece tapınağına silahlı adamlar gönderdiler. Hayatın tehlikede!" 
        },
      },
      {
        metin: "Sessizce bağışı kabul et ve günahını temizle.",
        baseBasariSansi: 90,
        ipucu: "Kilise zenginleşir, ruhun kararır",
        basariliSonuc: { 
          para: 50, 
          ahlak: -35, 
          un: -20,
          etiket_ekle: ["sir:gunah_satici"],
          mesaj: "Altın sandıkları mahzenine taşındı. Soylu serbest. Halk sana nefretle bakıyor ve sen de aynada kendine bakamıyorsun." 
        },
        basarisizSonuc: { 
          un: -30, 
          ahlak: -20, 
          mesaj: "Rüşvet aldığın ortaya çıktı. Diğer rahipler ayaklandı, unvanın sarsıldı." 
        },
      },
    ],
  },
  {
    id: "asker_birlik_kaynak",
    kategori: "savas",
    meslekler: ["Asker"],
    yasakliEtiketler: ["birlik:egitimli"],
    gorsel: "🎯",
    baslik: "Birliğin Kumanyası",
    metin: "Sana birliğinin kışlık erzağı ve kılıçları için altın tahsis edildi. Ya bu parayı gerçekten askerlere harcarsın ya da sahte kayıtlarla parayı cebe indirirsin.",
    secenekler: [
      {
        metin: "Tüm parayı askerlerin eğitimine ve midesine harca.",
        baseBasariSansi: 85,
        ipucu: "Askerler seni korur, paran kalmaz",
        basariliSonuc: {
          para: -10,
          etiket_ekle: ["birlik:egitimli", "itibar:asker_babasi"],
          durum_ekle: {
            id: "birlik_egitimli",
            ad: "İyi Eğitilmiş Birlik",
            tur: "kalici",
            tur_basi_saglik: 1,
          },
          ordu_techizat_artis: 20,
          mesaj: "Askerlerin tok, kılıçları keskin. Savaşta arkanda bir duvar gibi duracaklar.",
        },
        basarisizSonuc: { para: -15, mesaj: "Tüccarlar seni kazıkladı, erzak eksik geldi ama niyetin iyiydi." },
      },
      {
        metin: "Kaydı değiştir ve altını kendine sakla.",
        baseBasariSansi: 50,
        ipucu: "Zenginlik, ancak savaşta birliğin dökülür",
        basariliSonuc: { 
          para: 35, 
          ahlak: -25, 
          etiket_ekle: ["sir:ordu_hirsizi"],
          mesaj: "Altınları yatağının altına zulaladın. Askerlerin paslı kılıçlarla talim yapıyor, umrunda değil." 
        },
        basarisizSonuc: { 
          para: -10, 
          un: -30, 
          ahlak: -20,
          mesaj: "Müfettiş sahte kayıtları buldu! Divanı harbe verildin ve itibarın yerle bir oldu." 
        },
      },
    ],
  },

  // ============================================================
  // KOMİK VE TUHAF OLAYLAR
  // ============================================================
  {
    id: "komik_kecinin_intikami",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.7,
    gorsel: "🐐",
    baslik: "Şeytani Keçi",
    metin:
      "Komşunun gözleri garip bakan o psikopat keçisi ipini kopardı ve direkt senin bahçene, çamaşırlarının arasına daldı. Bütün mahalle camlara çıkmış seni izliyor.",
    secenekler: [
      {
        metin: "Savaş narası atıp keçinin üstüne atla!",
        baseBasariSansi: 60,
        ipucu: "Başarırsan efsanevi bir unvan, olmazsa komedi",
        basariliSonuc: { 
          mutluluk: 15, 
          un: 10, 
          unvan_kazan: "Keçi Fatihi",
          mesaj: "Havada süzülüp keçiyi boynuzlarından yere mıhladın! Mahalleli seni çılgınca alkışlıyor." 
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
        basariliSonuc: { mesaj: "Keçi biraz çamaşırlarını çiğnedi sonra sıkılıp gitti. Gururun incindi ama sağlamsın." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Keçi bahçeyi mahvetti, üstüne camı boynuzlayarak kırdı." },
      },
    ],
  },
  {
    id: "komik_yanlis_cenaze",
    kategori: "sosyal",
    ton: "hafif",
    minYas: 16,
    agirlik: 0.9,
    gorsel: "😅",
    baslik: "Yanlış Kapı",
    metin:
      "Bir cenaze törenine katılmak için gittiğin evde bir şeyler tuhaf; meğer yanlış kapıyı çalmışsın, hiç tanımadığın bir ailenin yas törenindesin ve herkes başsağlığı için sana bakıyor.",
    secenekler: [
      {
        metin: "Durumu açıkça itiraf et ve özür dile.",
        baseBasariSansi: 85,
        ipucu: "Dürüstlük ortamı yumuşatabilir",
        basariliSonuc: { dost_puani: 4, mutluluk: 6, mesaj: "İtirafın acılı aileyi güldürdü. Yas töreninde beklenmedik, sıcak bir anı oldun." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Kimse gülmedi, seni 'saygısız' ilan edip kapı dışarı ettiler." },
      },
      {
        metin: "Fark etmemiş gibi davran, ağlıyormuş gibi yapıp sıvış.",
        baseBasariSansi: 65,
        ipucu: "Ustaca çıkarsan kimse fark etmez",
        basariliSonuc: { mutluluk: 5, mesaj: "Gözyaşı siler gibi yapıp sessizce dışarı süzüldün. Bu hikayeyi yıllarca kahkahayla anlatacaksın." },
        basarisizSonuc: { mutluluk: -3, un: -2, mesaj: "Çıkışta ayakkabına takılıp ölünün tabutuna çarptın! Herkesin dehşet dolu bakışları arasında kaçtın." },
      },
      {
        metin: "Ortalığın karışıklığından faydalanıp ölüden bir hatıra (!) çal.",
        baseBasariSansi: 50,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Riskli ama kârlı bir hırsızlık",
        basariliSonuc: { 
          para: 25, 
          ahlak: -15, 
          etiket_ekle: ["envanter:olunun_yuzugu"],
          mesaj: "Kimse bakmazken ölünün parmağındaki altın yüzüğü cebine attın. Acımasızca, ama kârlı." 
        },
        basarisizSonuc: { 
          un: -25, 
          ahlak: -15, 
          mesaj: "Ölünün elini tutarken dul eşi seni gördü! 'Hırsız!' çığlıkları eşliğinde meydan dayağı yedin." 
        },
      },
    ],
  },
  {
    id: "komik_seyyar_satici",
    kategori: "ticaret",
    ton: "hafif",
    agirlik: 0.5,
    gorsel: "🧪",
    baslik: "Mucize İksir",
    metin:
      "Gezici bir satıcı, şişedeki parlayan mor sıvının 'ölüyü dirilten, her derde deva bir mucize' olduğunu bağıra bağıra anlatıyor. Etraftakiler inanmıyor ama sıvı tuhaf bir şekilde cezbedici.",
    secenekler: [
      {
        metin: "Satıcıya güvenme, uzaklaş.",
        baseBasariSansi: 95,
        basariliSonuc: { mesaj: "Sağduyulu davrandın, paran cebinde kaldı." },
        basarisizSonuc: { mutluluk: -1, mesaj: "Meraklandın ama kendini tuttun; içinde hafif bir pişmanlık kaldı." },
      },
      {
        metin: "Cebindeki altınları dök ve bir şişe satın al.",
        baseBasariSansi: 40,
        maliyet: 15,
        ipucu: "Muhtemelen para ziyanı, ama ya gerçekse? (Envantere eklenir)",
        basariliSonuc: { 
          para: -15, 
          etiket_ekle: ["envanter:sirli_iksir"],
          mesaj: "Parayı verdin ve iksiri çantana attın. Garip bir şekilde şişe ısınıyor gibi. Bir gün işe yarayabilir." 
        },
        basarisizSonuc: { para: -15, mutluluk: -3, mesaj: "Sıvı tatsız bir keçi sütü çıktı! Geri döndüğünde satıcı çoktan tüymüştü." },
      },
      {
        metin: "Kalabalığı fırsat bil, tezgâhtan bir şişe çal.",
        baseBasariSansi: 60,
        maxAhlak: 35,
        ipucu: "Sadece ahlaksızlara açık: Bedavaya mucize ya da zindan",
        basariliSonuc: { 
          ahlak: -10,
          etiket_ekle: ["envanter:sirli_iksir"],
          mesaj: "El çabukluğuyla şişeyi cübbene sakladın. Hem paran cebinde kaldı hem de gizemli bir iksirin oldu." 
        },
        basarisizSonuc: { 
          un: -15, 
          ahlak: -10, 
          para: -10,
          mesaj: "Satıcı bileğinden yakaladı! Muhafızlara teslim edilmemek için cebindeki tüm parayı rüşvet olarak vermek zorunda kaldın." 
        },
      },
    ],
  },

  // ============================================================
  // GİZEM VE EFSANELER (Nadir Karşılaşmalar - Ağırlık: 0.2)
  // ============================================================
  {
    id: "gizem_ejderha_tilsimi",
    kategori: "ticaret",
    agirlik: 0.2,
    gorsel: "🐉",
    baslik: "Doğulu Kör Büyücü",
    metin: "Şehre nereden geldiği bilinmeyen, gözleri tamamen beyaz bir doğulu tüccar geldi. Tezgahında sadece tek bir eşya var: Üzerinde kadim rünler olan, kan kırmızısı bir Ejderha Tılsımı. 'Sadece kaderi kanla yazılmış olanlar taşıyabilir' diye fısıldıyor.",
    secenekler: [
      {
        metin: "İstediği uçuk bedeli öde ve tılsımı al.",
        baseBasariSansi: 80,
        maliyet: 50,
        ipucu: "Efsanevi bir koruma sağlar ama seni iflas ettirebilir",
        basariliSonuc: {
          para: -50,
          etiket_ekle: ["envanter:ejderha_tilsimi"],
          mesaj: "Altınları önüne yığdın. Tılsımı boynuna taktığın an göğsünde sıcak bir güç hissettin. Bu sıradan bir eşya değil.",
        },
        basarisizSonuc: {
          para: -50,
          saglik: -10,
          mesaj: "Tılsımı aldın ama gece kabuslarla uyandın. Vücudun bu kadim enerjiyi reddediyor.",
        },
      },
      {
        metin: "Körlüğünden faydalan, tılsımı sessizce çal.",
        baseBasariSansi: 40,
        maxAhlak: 35,
        ipucu: "Karanlık kalplere özel: Efsanevi gücü bedavaya almak...",
        basariliSonuc: {
          ahlak: -25,
          etiket_ekle: ["envanter:ejderha_tilsimi", "lanetli_ruh"],
          mesaj: "Tılsımı kaptığın gibi kaçtın! Kör adam arkandan 'Bedelini ruhunla ödeyeceksin!' diye bağırdı. Güç senin ama için titriyor.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          mesaj: "Elini uzattığın an kör adam bileğini yakaladı. Gözleri parladı ve sana dokunduğu yer alev gibi yandı. Çığlık atarak kaçtın.",
        },
      },
      {
        metin: "Bu büyü işleri bana göre değil, hızla uzaklaş.",
        baseBasariSansi: 92,
        ipucu: "Güvenli ama efsaneyi kaçırmış olmanın hafif bir pişmanlığı olabilir",
        basariliSonuc: { mesaj: "Bu tür mistik şeylerin sonu genelde kötü biter dedin ve evine döndün." },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Evine döndün ama o kan kırmızı tılsımın görüntüsü aklından çıkmadı. 'Ya gerçekten efsaneviydiyse?' diye düşünüp durdun.",
          detay: "Bazı fırsatları kaçırmak, insanın içinde uzun süre kanar.",
        },
      },
    ],
  },
  {
    id: "gizem_kara_kilic",
    kategori: "savas",
    meslekler: ["Asker"],
    agirlik: 0.2,
    gorsel: "🗡️",
    baslik: "Mezarlıktaki Kılıç",
    metin: "Gecenin karanlığında ormanda devriye gezerken, eski bir mezarın üzerinde saplı duran kara bir kılıç buldun. Etrafındaki otlar çürümüş ama kılıcın kabzası elini adeta kendine çağırıyor.",
    secenekler: [
      {
        metin: "Kılıcı kabzasından tut ve mezardan çıkar.",
        baseBasariSansi: 50,
        ipucu: "Sana eşsiz bir savaş gücü verir ama zihnini karanlığa boğar",
        basariliSonuc: {
          un: 15,
          ahlak: -15,
          mutluluk: -10,
          etiket_ekle: ["envanter:kara_kilic"],
          mesaj: "Kılıcı çektin! Çelik anında kanına uyum sağladı. Savaş meydanında yenilmez olacaksın ama kılıcın içindeki fısıltılar hiç susmuyor.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 5,
          mesaj: "Kılıcı tuttuğun an bedenine kara bir zehir yayıldı. Çığlık atarak bıraktın, günlerce komada yattın.",
        },
      },
      {
        metin: "Kılıca dokunma, mezarın başında bir dua edip ayrıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Saygıyla eğildin ve uzaklaştın. Doğal olmayan şeylere bulaşmamak en iyisidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kılıcı bıraktın ama o karanlık cazibe günlerce rüyalarına girdi.",
        },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu",
    kategori: "din",
    meslekler: ["Din Adamı"],
    agirlik: 0.2,
    gorsel: "🪽",
    baslik: "Ölmek Üzere Olan Hacı",
    metin: "Kilisenin/Caminin kapısına kanlar içinde bir hacı yığıldı. Son nefesini vermeden önce avucuna parlayan, bembeyaz bir tüy sıkıştırdı. 'Bunu bana gökten inen bir melek verdi, kötülüğü kovar' diye fısıldadı ve öldü.",
    secenekler: [
      {
        metin: "Tüyü kutsal bir emanet olarak sakla.",
        baseBasariSansi: 80,
        ipucu: "Seni ölümden koruyacak kutsal bir eşya (Envanter)",
        basariliSonuc: {
          ahlak: 20,
          etiket_ekle: ["envanter:melek_tuyu"],
          mesaj: "Tüyü göğsüne sakladın. Ne zaman kalbin daralsa tüyün sıcaklığı sana huzur veriyor. Bu gerçek bir lütuf.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Tüyü sakladın ama cemaat senin batıl inançlara kapıldığını düşünüp seni ayıpladı.",
        },
      },
      {
        metin: "Zengin bir asilzadeye 'gerçek melek tüyü' olarak sat.",
        baseBasariSansi: 65,
        maxAhlak: 45,
        ipucu: "Sadece inancı zayıflara açık: Muazzam bir servet ama ahlaki çöküş",
        basariliSonuc: {
          para: 80,
          ahlak: -30,
          mesaj: "Asilzade bu hikayeye bayıldı ve sana bir servet ödedi. Cebin altın dolu ama ruhunu şeytana satmış gibi hissediyorsun.",
        },
        basarisizSonuc: {
          un: -30,
          ahlak: -20,
          mesaj: "Asilzade seni sahtekarlıkla suçladı ve korumalarına dövdürttü. Tüy de rüzgarda uçup gitti.",
        },
      },
      {
        metin: "Bu bir sapkınlık! Tüyü ateşe at ve adamı göm.",
        baseBasariSansi: 90,
        basariliSonuc: { ahlak: 10, un: 5, mesaj: "Hurafelere taviz vermedin. Tüy yanarken tuhaf bir çığlık sesi duyar gibi oldun ama aldırış etmedin." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Tüyü yaktın ama 'acaba hata mı yaptım' hissi içini kemiriyor." },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu_mucize",
    kategori: "din",
    gerekliEtiketler: ["envanter:melek_tuyu"],
    gizemli: true,
    agirlik: 0.6,
    gorsel: "🪽",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Beklenmedik Bir Şifa",
    metin:
      "Cemaatten yaşlı bir kadın nefes almakta zorlanarak yere yığıldı, dudakları morarıyor. Cebindeki tüyün sıcaklığını hissettin. Belki gerçek, belki hurafe — ama elinde bir şans var.",
    secenekler: [
      {
        metin: "Tüyü çıkar, alnına değdir ve dua et.",
        baseBasariSansi: 70,
        ipucu: "Efsane gerçek çıkarsa büyük bir mucize, çıkmazsa büyük bir hayal kırıklığı",
        basariliSonuc: {
          ahlak: 15,
          un: 20,
          mutluluk: 10,
          mesaj: "Tüy avucunda ısındı, neredeyse titredi. Kadının nefesi bir anda düzeldi, gözlerini açtı! Etraftaki herkes dehşet ve hayranlıkla sana bakıyor — artık bir 'mucize eli' olarak anılacaksın.",
          detay: "Hacının son sözleri yalan değilmiş.",
        },
        basarisizSonuc: {
          un: -10,
          mutluluk: -10,
          mesaj: "Tüy elinde sessiz, sıradan bir tüy gibi kaldı. Kadın gözlerinin önünde can verdi. Cemaat seni boş umut dağıtmakla suçladı.",
          detay: "Bazı efsaneler sadece efsane olarak kalıyor.",
        },
      },
      {
        metin: "Buna karışma; ölüm de Tanrı'nın bir takdiridir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Elini tutup dua ettin ama tüye dokunmadın. Kadın huzur içinde son nefesini verdi.",
          detay: "Her mucize denenmeyi hak etmez; bazen kabullenmek de bir erdemdir.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Kadın gözlerini son kez sana çevirdi. Denemediğin için yıllarca 'ya gerçekten işe yarasaydı' diye düşüneceksin.",
        },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu_calinti",
    kategori: "din",
    gerekliEtiketler: ["envanter:melek_tuyu"],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🕊️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Tüyün Peşindeki Adam",
    metin:
      "Gece yarısı odana biri süzülmüş, doğruca göğsündeki tüyün saklı olduğu sandığa uzanıyor. 'O tüy benim de hakkım, hacı benim amcamdı!' diye fısıldıyor karanlıkta.",
    secenekler: [
      {
        metin: "Sesini yükselt, adamı kovala.",
        baseBasariSansi: 75,
        ipucu: "Tüyü korursun ama gürültü mahalleyi ayağa kaldırabilir",
        basariliSonuc: {
          mutluluk: 5,
          un: 5,
          mesaj: "Bağırışına komşular koştu, adam karanlığa kaçtı. Tüy hâlâ senin ama gecen mahvoldu.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Adam seni ite kaka kaçtı; tüyü kapmayı başaramadan pencereden atladı.",
          detay: "Bazı geceler sadece korkuyla hatırlanır.",
        },
      },
      {
        metin: "Sakinleştir, hikayesini dinle, tüyü paylaşmayı teklif et.",
        baseBasariSansi: 80,
        ipucu: "Paylaşmak huzuru getirebilir ya da işi karıştırır",
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 5,
          mesaj: "Adamla sabaha kadar konuştunuz; hikayesini dinledin, birlikte ağladınız. Tüyü paylaşmaya karar verdiniz — ikiniz de biraz daha hafiflediniz.",
        },
        basarisizSonuc: {
          ahlak: -5,
          para: -10,
          mesaj: "Adam sözlerine inanmadı, kavga çıktı; sakinleştirmek için cebindeki parayı da vermek zorunda kaldın.",
        },
      },
      {
        metin: "Tüyü sıkıca kavra, asla vazgeçmeyeceğini söyle.",
        baseBasariSansi: 60,
        maxAhlak: 60,
        ipucu: "Bencilce ama belki de doğru — bu senin emanetin",
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Kararlılığın karşısında adam geri çekildi. Tüy hâlâ senin, ama gözlerindeki hayal kırıklığını unutamayacaksın.",
        },
        basarisizSonuc: {
          saglik: -15,
          ahlak: -10,
          mesaj: "Boğuşma çıktı, ikiniz de yaralı ayrıldınız. Tüy yerde, ikinizin de elinden kaymış.",
        },
      },
    ],
  },

  // ============================================================
  // RUH SAĞLIĞI — DÜŞÜK MUTLULUK
  // ============================================================
  {
    id: "ruh_karanlik_fisiltilar",
    kategori: "sosyal",
    ton: "agir",
    maxMutluluk: 25,
    minYas: 14,
    gorsel: "🌑",
    baslik: "Karanlığın Fısıltıları",
    metin:
      "Son günlerde içindeki karanlık büyüyor. Geceleri olmayan sesler duyuyor, köşede durmayan gölgeler görüyorsun. Sanki bir şey seni ele geçirmeye çalışıyor.",
    secenekler: [
      {
        metin: "Kara Kılıcın fısıltılarına cevap ver ve karanlığı kucakla.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:kara_kilic"],
        ipucu: "Sadece kılıca sahip olanlar görebilir: Delilik ya da muazzam bir uyanış",
        basariliSonuc: {
          mutluluk: 30,
          ahlak: -40,
          un: 20,
          mesaj: "Seslerin kaynağı kılıçtı! Onun karanlığıyla birleştin. Artık korkmuyorsun, çünkü karanlığın kendisi sen oldun.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Kılıç seni tamamen delirtmek üzereydi, son anda kılıcı yere fırlatıp kurtuldun."
        }
      },
      {
        metin: "Kendini toparlamaya çalış, bir hekimden yardım iste.",
        baseBasariSansi: 55,
        maliyet: 10,
        ipucu: "Masraflı ama rahatlama getirir",
        basariliSonuc: {
          para: -10,
          mutluluk: 15,
          saglik: 5,
          mesaj: "Hekimin verdiği afyonlu şuruplar içini hafifletti; gölgeler biraz dağıldı.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: -8,
          mutluluk: -5,
          mesaj: "Hekim seni deli zannetti. Verdiği ilaçlar mideni bulandırmaktan başka işe yaramadı.",
        },
      },
      {
        metin: "Kendi başına, odana kapanarak direnmeye çalış.",
        baseBasariSansi: 70,
        basariliSonuc: { mesaj: "Nasılsa geçer diye düşündün ve kapıya kilit vurup günlerce bekledin. Bir süreliğine haklı çıktın." },
        basarisizSonuc: {
          saglik: -12,
          un: -15,
          mesaj: "Halüsinasyonların arttı; sokağa yarı çıplak fırlayıp bağırmaya başladın. İtibarın yerle bir oldu.",
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
        basariliSonuc: { mutluluk: 12, saglik: 8, para: -10, mesaj: "Dualar ve tütsüler işe yaradı. Nihayet deliksiz bir uyku çektin." },
        basarisizSonuc: { para: -10, mutluluk: -5, mesaj: "Muskalar işe yaramadı, hayaletler duvarlardan sana gülmeye devam etti." },
      },
      {
        metin: "Aklımı kaçırıyorum! Kendi kendime idare etmeliyim.",
        baseBasariSansi: 55,
        basariliSonuc: { mutluluk: 5, mesaj: "Zamanla yorgunluktan bayıldın ve beynin kendini sıfırladı." },
        basarisizSonuc: { saglik: -15, mutluluk: -8, mesaj: "Uykusuzluk yüzünden merdivenlerden düştün. Bitkinlik seni fiziksel olarak da parçalıyor." },
      },
    ],
  },

  // ============================================================
  // HALKIN TEPKİSİ — DÜŞÜK ÜN/AHLAK
  // ============================================================
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
        ipucu: "Çok pahalı ama halkın nefreti parayla satın alınabilir",
        basariliSonuc: { 
          ahlak: 20, 
          un: 15, 
          para: -25, 
          mesaj: "Cömertliğin insanların midesine dokundu. Eskiden tükürenler şimdi sana 'hayırsever' diyor." 
        },
        basarisizSonuc: { 
          para: -25, 
          mutluluk: -10, 
          mesaj: "Halk erzağı aldı ama yine de arkandan küfretmeye devam etti. Paran boşa gitti." 
        },
      },
      {
        metin: "Başını dik tut, bu sürüyü umursama.",
        baseBasariSansi: 60,
        basariliSonuc: { mutluluk: 3, mesaj: "Onların ne düşündüğü umurunda değil. Sert ve acımasız yoluna devam ettin." },
        basarisizSonuc: { mutluluk: -10, saglik: -5, mesaj: "Umursamıyormuş gibi yapsan da atılan bir çürük domates kafana isabet etti. İçten içe çöküyorsun." },
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
    metin:
      "Yıllardır bu topraklardasın ama hâlâ bir hayalet muamelesi görüyorsun. Devlet kapıları yüzüne kapanıyor, pazarlıklar aleyhine sonuçlanıyor.",
    secenekler: [
      {
        metin: "Büyük bir festivalde ortaya çık ve dikkatleri üzerine çek.",
        baseBasariSansi: 50,
        maliyet: 10,
        ipucu: "Para harcayarak sosyeteye karışırsın",
        basariliSonuc: { para: -10, un: 20, mutluluk: 6, mesaj: "Gösterişli kıyafetlerin ve cömertliğin sayesinde sonunda bazı insanlar adını öğrendi!" },
        basarisizSonuc: { para: -10, mutluluk: -6, mesaj: "Çabaların fark edilmedi. Kalabalığın içinde sadece cüzdanı hafiflemiş bir hiçkimsesin." },
      },
      {
        metin: "Görünmezliğin tadını çıkar, sessizce işini yap.",
        baseBasariSansi: 90,
        basariliSonuc: { mesaj: "Görünmez olmak beladan uzak durmaktır. Kimse senden vergi veya rüşvet sormadı." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Görmezden gelinmek, gün geçtikçe ruhunu ezen ağır bir yüke dönüştü." },
      },
    ],
  },

  // ============================================================
  // SEZGİ VE GÖZLEM — KESKİN GÖZLÜ YARDIMCI
  // ============================================================
  {
    id: "sezgi_gozlemci_yardimci",
    kategori: "ticaret",
    yasakliEtiketler: ["gozlemci_var"],
    minYas: 18,
    gorsel: "🔍",
    baslik: "Karanlık Sokakların Gözü",
    metin:
      "Sokaklarda her şeyi duyan, kimin kiminle yattığını, kimin ne kadara mal sattığını bilen keskin gözlü (ama tehlikeli) bir muhbir sana çalışmayı teklif ediyor.",
    secenekler: [
      {
        metin: "Onu işe al, şehrin sırları senin olsun.",
        baseBasariSansi: 75,
        maliyet: 35,
        ipucu: "Pahalıdır ama sana kalıcı 'İstihbarat' avantajı sağlayabilir",
        basariliSonuc: {
          para: -35,
          etiket_ekle: ["gozlemci_var"],
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
        basariliSonuc: { mesaj: "Bu tür karanlık tiplere güvenmemekte haklıydın. İşine kendi aklınla devam ettin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Sonradan bir ihalede körü körüne kaybettiğinde keşke o adamı tutsaydım dedin." },
      },
    ],
  },

  // ============================================================
  // ÇOCUK VE AİLE DERİNLİĞİ — Hastalık, Suç ve Büyüme
  // ============================================================
  {
    id: "cocuk_hastalik_baslangic",
    kategori: "saglik",
    gerekliEtiketler: ["cocuk_var"],
    gorsel: "🤒",
    baslik: "Yanan Ateş",
    metin: "Evladın ateşler içinde kıvranıyor. Rengi solmuş ve zar zor nefes alıyor. Kasabadaki tek yetenekli hekim çok fazla altın istiyor.",
    secenekler: [
      {
        metin: "Gizli İksiri kullan ve onu anında iyileştir!",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:sirli_iksir"],
        ipucu: "Gizli Envanter: Çaldığın/Aldığın iksir gerçekten mucize mi?",
        basariliSonuc: {
          etiket_sil: ["envanter:sirli_iksir"],
          mutluluk: 20,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Mucizevi Şifa",
            tur: "gecici",
            kalan_tur: 1,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "Sıvıyı çocuğunun dudaklarına damlattığın an ateşi düştü! Gözlerini açıp gülümsedi. O seyyar satıcı doğru söylüyormuş!"
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Hekimi çağırt ve tüm birikimini ona ver.",
        baseBasariSansi: 70,
        maliyet: 25,
        ipucu: "Pahalı ama en güvenli yol (1 tur sonra sonuçlanır)",
        basariliSonuc: {
          para: -25,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Hekim Gözetiminde",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "Hekim geldi, sülükler ve merhemlerle tedaviye başladı. Durum birkaç güne netleşecek.",
        },
        basarisizSonuc: {
          para: -25,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Hekim Gözetiminde",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:kotu",
          },
          mesaj: "Hekim başını iki yana salladı, 'Durumu kritik, sadece dua edin' dedi.",
        },
      },
      {
        metin: "Param yok, ıslak bezle kendim tedavi edeceğim.",
        baseBasariSansi: 30,
        ipucu: "Ölüm riski çok yüksektir",
        basariliSonuc: {
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Ev Tedavisi",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "Gece gündüz başucunda bekleyip ateşini düşürdün.",
        },
        basarisizSonuc: {
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Ev Tedavisi",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:kotu",
          },
          mesaj: "Ateş bir türlü düşmüyor, aksine çocuk havale geçirmeye başladı.",
        },
      },
    ],
  },
  {
    id: "cocuk_hastalik_sonucu_iyi",
    kategori: "saglik",
    gerekliEtiketler: ["cocuk_saglik_zamani:iyi"],
    gorsel: "🌤️",
    baslik: "Şifa Buldu",
    metin: "Evladın nihayet gözlerini açtı, ateşi düştü ve senden su istedi.",
    secenekler: [
      {
        metin: "Sevincini paylaş, Tanrı'ya şükret.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 20,
          saglik: 5,
          etiket_sil: ["cocuk_saglik_zamani:iyi"],
          mesaj: "İçini kaplayan o devasa korku yerini gözyaşlarına bıraktı. Çocuğun yaşıyor!",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "cocuk_hastalik_sonucu_kotu",
    kategori: "saglik",
    ton: "agir",
    gerekliEtiketler: ["cocuk_saglik_zamani:kotu"],
    gorsel: "🕯️",
    baslik: "Küçük Bir Tabut",
    metin: "Korkulan oldu. Ateşi hiç düşmedi. Evladının o küçük bedeni yatağın içinde soğumaya başladı. Hekimler bile odayı sessizce terk ediyor.",
    secenekler: [
      {
        metin: "Son bir umutla sarıl ve uyanması için yalvar.",
        baseBasariSansi: 20,
        ipucu: "Mucize ihtimali çok zayıf",
        basariliSonuc: {
          mutluluk: 15,
          etiket_sil: ["cocuk_saglik_zamani:kotu"],
          mesaj: "Ağlarken gözyaşın onun yüzüne düştü. Birden öksürerek nefes aldı! O ölmemiş, sadece derin bir komadaymış!",
        },
        basarisizSonuc: {
          cocuk_kaybet: true,
          mutluluk: -40,
          saglik: -10,
          etiket_sil: ["cocuk_saglik_zamani:kotu"],
          etiket_ekle: ["kalici:evlat_acisi"],
          mesaj: "Ne kadar bağırırsan bağır o küçük gözler bir daha açılmadı. Toprağa kendi ellerinle verdin.",
        },
      },
      {
        metin: "Gerçeği kabullen, üzerini ört ve cenazesini hazırla.",
        baseBasariSansi: 100,
        basariliSonuc: {
          cocuk_kaybet: true,
          mutluluk: -30,
          etiket_sil: ["cocuk_saglik_zamani:kotu"],
          etiket_ekle: ["kalici:evlat_acisi"],
          mesaj: "Ağlamaya bile mecalin yok. İçindeki bir parça o tabutla beraber toprağa gömüldü.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "cocuk_suctustu",
    kategori: "sosyal",
    gerekliEtiketler: ["cocuk_var"],
    gorsel: "👦",
    baslik: "Suçüstü",
    metin: "Pazar yerinde bir bağırış koptu. Bir kumaş tüccarı çocuğunu yakasından tutmuş sürüklüyor: 'Bu küçük hırsız mallarımı çaldı!' Muhafızlar yaklaşmak üzere.",
    secenekler: [
      {
        metin: "Muhafızlara ve tüccara gizlice rüşvet ver (Sustur).",
        baseBasariSansi: 85,
        maliyet: 25,
        ipucu: "Çocuğun sicili temiz kalır ama yozlaşmayı öğrenir",
        basariliSonuc: {
          para: -25,
          ahlak: -15,
          etiket_ekle: ["sorunlu_cocuk"],
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
        baseBasariSansi: 100,
        ipucu: "Çocuğunu kurtarırsın ama doğrudan zindana atılırsın",
        basariliSonuc: {
          un: -15,
          ahlak: 20,
          etiket_ekle: ["hapiste"],
          mesaj: "Çocuğunu kenara ittin ve ellerini uzattın. Muhafızlar seni zincire vurup zindana sürüklerken çocuğun arkandan ağlıyordu.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Çocuğa herkesin önünde tokat at ve teslim et.",
        baseBasariSansi: 80,
        ipucu: "Ahlak ve itibar artar ama evladın senden ölesiye nefret eder",
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
    gerekliEtiketler: ["cocuk_var"],
    minYas: 35,
    gorsel: "💒",
    baslik: "Çocuğunun Düğünü",
    metin: "Evladın büyüdü, artık kendi yuvasını kuracak. Aile büyük bir düğün bekliyor ama işler son zamanlarda pek iyi değil.",
    secenekler: [
      {
        metin: "Borca girip şehri sallayacak bir düğün yap.",
        baseBasariSansi: 75,
        maliyet: 35,
        ipucu: "Un ve mutluluk tavan yapar, ekonomi dibe vurur",
        basariliSonuc: {
          para: -35,
          mutluluk: 20,
          un: 15,
          mesaj: "Haftalarca konuşulan bir düğün oldu! Evladının yüzündeki gülümseme her şeye değer.",
        },
        basarisizSonuc: { 
          para: -35, 
          mutluluk: 5, 
          mesaj: "Büyük masraf yaptın ama yağmur yağdı, misafirler rezil oldu. Para tamamen boşa gitti." 
        },
      },
      {
        metin: "Sade bir tören yeterli, gösterişe lüzum yok.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: { para: -10, mutluluk: 10, mesaj: "Küçük ama sıcak bir törenle onu uğurladın. Huzur içindesin." },
        basarisizSonuc: { para: -10, mutluluk: -5, mesaj: "Karşı tarafın ailesi bu sadeliği 'cimrilik' olarak gördü ve tören boyunca söylendi." },
      },
    ],
  },
  {
    id: "cocuk_meslek_secimi",
    kategori: "sosyal",
    gerekliEtiketler: ["cocuk_var"],
    minYas: 32,
    gorsel: "🧭",
    baslik: "Mirası Devretmek",
    metin: "Evladın artık meslek seçecek yaşa geldi. Kendi kurduğun işi ona devretmek istiyorsun ama o denizlere açılıp maceraya atılmak istiyor.",
    secenekler: [
      {
        metin: "Karşı çık, 'Benim işimi devralacaksın!' diye diret.",
        baseBasariSansi: 65,
        basariliSonuc: { mutluluk: 8, para: 15, mesaj: "Zorla da olsa seni dinledi. Artık sana yardım ediyor, işin kazancı arttı." },
        basarisizSonuc: { mutluluk: -15, mesaj: "Kavga ettiniz. Eşyalarını toplayıp evden kaçtı. İşin sana, gözyaşların yastığına kaldı." },
      },
      {
        metin: "Kendi yolunu seçmesine izin ver, ona harçlık ver.",
        baseBasariSansi: 90,
        maliyet: 10,
        basariliSonuc: { para: -10, mutluluk: 10, ahlak: 10, mesaj: "Gemiye binerken sana sarıldı. Hayallerinin peşinden giden bir çocuk yetiştirmenin gururunu yaşıyorsun." },
        basarisizSonuc: { para: -10, mutluluk: -10, mesaj: "Aylarca haber alamadın. Belki de bir korsan saldırısında can verdi... Endişe seni yiyip bitiriyor." },
      },
    ],
  },
  {
    id: "cocuk_ziyaret",
    kategori: "sosyal",
    gerekliEtiketler: ["cocuk_var"],
    minYas: 55,
    gorsel: "🏡",
    baslik: "Yaşlılık ve Torunlar",
    metin: "Evladın yıllar sonra torunlarınla birlikte seni ziyarete geldi. Evin içi uzun zaman sonra çocuk sesleriyle şenlendi.",
    secenekler: [
      {
        metin: "Tüm gününü onlara ayır, oyunlar oyna.",
        baseBasariSansi: 95,
        basariliSonuc: { mutluluk: 25, saglik: 5, mesaj: "Torunlarınla oynamak seni 10 yaş gençleştirdi. Hayatın gerçek anlamı bu diyorsun." },
        basarisizSonuc: { mutluluk: 10, saglik: -5, mesaj: "Oyun oynarken belini incittin ama yine de değdi." },
      },
      {
        metin: "Yaşlı bedenin kaldırmıyor, kısa bir sohbetle yetin.",
        baseBasariSansi: 100,
        basariliSonuc: { mutluluk: 5, mesaj: "Gürültüden çabuk yoruldun ve odana çekildin. Yalnızlık sana daha uygun." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },

  // ============================================================
  // KİŞİLİK EKSENİ — FEVRİLİK VE MERHAMET
  // ============================================================
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
        gerekliEksen: { eksen: "fevrilik", min: 60 },
        ipucu: "Sadece fevri olanlar bu deliliği yapabilir",
        basariliSonuc: { para: 45, un: 15, ahlak: -10, mesaj: "Alevlerin arasından sandıkla çıktın! Yanıkların var ama servetine servet kattın." },
        basarisizSonuc: { saglik: -35, olum_sansi: 10, mesaj: "Kiriş kafana çöktü! Seni dışarı ölü gibi çıkardılar, günlerce komada kaldın." },
      },
      {
        metin: "Delilik bu! Uzaktan izle.",
        baseBasariSansi: 100,
        gerekliEksen: { eksen: "fevrilik", max: 59 },
        ipucu: "Planlı insanlar risk almaz",
        basariliSonuc: { ahlak: 5, mesaj: "Bina gözlerinin önünde çökerken 'İyi ki girmemişim' dedin. Canından kıymetli değil." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
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
        gerekliEksen: { eksen: "merhamet", min: 55 },
        ipucu: "Vicdanın rahatlar ama tehlike hayatta kalır",
        basariliSonuc: { ahlak: 25, mutluluk: 15, mesaj: "İntikam zehrini içmeyi reddettin. Düşmanın ağlayarak ellerini öptü ve şehri terk etti." },
        basarisizSonuc: { ahlak: 15, saglik: -20, mesaj: "Ona arkanı döndüğün an sırtına hançer sapladı! Merhametin az kalsın seni öldürüyordu." },
      },
      {
        metin: "Geçmişin bedeli kanla ödenir! Cezalandır.",
        baseBasariSansi: 75,
        gerekliEksen: { eksen: "merhamet", max: 54 },
        ipucu: "Adın korkuyla anılır ama ahlakın dibe vurur",
        basariliSonuc: { un: 25, ahlak: -25, mesaj: "Acımadın ve onu zindanlara/ölüme yolladın. Şehirde kimse artık senin adını anmaya bile cesaret edemiyor." },
        basarisizSonuc: { un: -10, ahlak: -15, mesaj: "Zalimliğin halkı isyan ettirdi, seni durdurup adamı elinden aldılar." },
      },
    ],
  },

  // ============================================================
  // EKİP / YARDIMCI SİSTEMİ
  // ============================================================
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
        ipucu: "Pahalı ama kalitesi hakkında net tahmin alırsın",
        basariliSonuc: {
          para: -60,
          ekip_ekle: { rol: "Korumalı Yardımcı", tahminGenisligi: 16 },
          mesaj: "Adam işe başladı. Sadece varlığı bile etrafındaki çakalları senden uzak tutmaya yetti.",
        },
        basarisizSonuc: { para: -60, mesaj: "Adam peşinatı aldığı gece sarhoş olup kumarda kaybetti ve şehirden kaçtı!" },
      },
      {
        metin: "Çok pahalısın, benim korumaya ihtiyacım yok.",
        baseBasariSansi: 88,
        ipucu: "Paranı korursun ama korumasız dolaşmanın küçük bir riski var",
        basariliSonuc: { mesaj: "Teklifi reddettin. Paranı cebinde tutup yalnız başına dolaşmaya devam ediyorsun." },
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
        ipucu: "Çok ucuz ama kalitesi tam bir kumar (Gizli Zar)",
        basariliSonuc: {
          para: -10,
          ekip_ekle: { rol: "Sokak Çocuğu", tahminGenisligi: 50 },
          mesaj: "Çocuğu yanına aldın. İlk günlerinde sana çok sadık görünüyor, gerçek yeteneğini zaman gösterecek.",
        },
        basarisizSonuc: { para: -10, mesaj: "Çocuk ilk günden kasandan 10 altın çalıp sırra kadem bastı." },
      },
      {
        metin: "Sokak faresi! Uzak dur benden.",
        baseBasariSansi: 95,
        basariliSonuc: { ahlak: -5, mesaj: "Çocuğu itip yoluna devam ettin. Vicdanın çok hafif sızladı." },
        basarisizSonuc: { para: -5, mesaj: "Çocuğu kovalarken el çabukluğuyla cebinden birkaç sikke aşırdığını fark ettin." },
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
          para: -20,
          ekip_ekle: { rol: "Gezgin Yoldaş", tahminGenisligi: 35 },
          mesaj: "Sırt çantasını alıp peşine takıldı. Onun anlattığı hikayeler yolculuğunu çok daha çekilir kılıyor.",
        },
        basarisizSonuc: { para: -20, mesaj: "Gece uyurken adamın eşyalarını toplayıp sessizce ayrıldığını fark ettin." },
      },
      {
        metin: "Yolumu yalnız yürürüm.",
        baseBasariSansi: 90,
        ipucu: "Bağımsızlığını korursun ama yolun uzun ve yalnız geçebilir",
        basariliSonuc: { mesaj: "Handa yollarınızı ayırdınız. Yalnız yürümek her zaman en güvenlisidir." },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Yolun geri kalanı sessiz ve uzun geçti; gezginin anlatacağı hikayeleri kaçırdığını düşünmeden edemedin.",
          detay: "Yalnızlık bazen sandığından ağır basıyor.",
        },
      },
    ],
  },
  {
    id: "rakip_ekip_teklifi",
    kategori: "siyaset",
    minYas: 18,
    minRakipPuani: 70,
    yasakliEtiketler: ["rakip:ekibe_katildi"],
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
          etiket_ekle: ["rakip:ekibe_katildi"],
          ekip_ekle: { rol: "Eski Rakip", tahminGenisligi: 30 },
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
        basariliSonuc: { mesaj: "Kapıyı suratına kapattın. İhtiyatlı olmak seni hayatta tutar." },
        basarisizSonuc: { rakip_puani: 15, un: -10, mesaj: "{rakip} ertesi gün ortak düşmanınıza katıldı ve senin sonunu getirmeye yemin etti." },
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
        ipucu: "Bütün ün ve kazanç sana kalır ama ölümle burun burunasın",
        basariliSonuc: { para: 55, un: 20, mesaj: "Kılıcın ve cesaretinle kervanı uçurumdan geçirdin! Kazanç muazzam." },
        basarisizSonuc: { saglik: -35, olum_sansi: 20, mesaj: "Haydutlar sizi pusuya düşürdü! Karnından okla vuruldun, mallar yağmalandı." },
      },
      {
        metin: "{ekip}'e emret: 'Kargoyu sağ salim getirin.'",
        baseBasariSansi: 65,
        ipucu: "Daha güvenli, ancak ekibini kalıcı olarak kaybedebilirsin",
        basariliSonuc: { para: 35, un: 5, mesaj: "Ekibin kan ter içinde ama başarılı bir şekilde malları getirdi. Liderlik budur." },
        basarisizSonuc: {
          ekip_kaybi: true,
          para: -20,
          mutluluk: -15,
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
        ipucu: "Siyasi itibarını zirveye çıkarır ama yakalanmak idam sebebidir",
        basariliSonuc: { un: 30, para: 40, etiket_ekle: ["itibar:sarayin_adami"], mesaj: "Gecenin karanlığında mektubu teslim ettin. Saray artık sana çok şey borçlu." },
        basarisizSonuc: { saglik: -40, olum_sansi: 25, mesaj: "Sınır muhafızları seni yakaladı! İşkence gördün, canını zor kurtardın." },
      },
      {
        metin: "Gölgeler içinde halledilsin, {ekip}'i yolla.",
        baseBasariSansi: 55,
        basariliSonuc: { para: 20, un: 10, mesaj: "{ekip} görevi senin adına tamamladı ve güvenle geri döndü." },
        basarisizSonuc: { ekip_kaybi: true, mesaj: "Gönderdiğin yardımcı sınırda yakalandı ve asıldı! Kanı senin ellerinde." },
      },
    ],
  },

  // ============================================================
  // EKİP VE YARDIMCILAR (Gizli Kalite Mekaniği Olayları)
  // ============================================================
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
        ipucu: "Gizli kaliteye sahip bir yardımcı ekler",
        basariliSonuc: {
          para: -15,
          ekip_ekle: { rol: "Koruma", tahminGenisligi: 70 },
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
        ipucu: "Paran cebinde kalır ama düşmanların artarken korumasız kalmanın bedeli olabilir",
        basariliSonuc: { mesaj: "Teklifi reddettin.", detay: "Kendi kılıcın sana yeter." },
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
        ipucu: "Yardımcının gizli kalitesine bağlı bir sonuç",
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
    ],
  },
  {
    id: "ekip_tuccar_yaveri",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
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
        ipucu: "Gizli kaliteye sahip bir ticaret yardımcısı ekler",
        basariliSonuc: {
          para: -10,
          ekip_ekle: { rol: "Muhasebeci", tahminGenisligi: 85 },
          mesaj: "Genç, masasına oturdu ve defterleri düzenlemeye başladı.",
          detay: "Umarım matematiği dürüstlüğü kadar kuvvetlidir.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "İşi kendin yapmaya devam et.",
        baseBasariSansi: 100,
        ipucu: "Güvenli ama yorucu",
        basariliSonuc: { saglik: -5, mesaj: "İş yükü sağlığını biraz yordu ama en azından kasanın anahtarı sende.", detay: "Güven pahalı bir lükstür." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "ekip_tuccar_yaveri_testi",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
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
        ipucu: "Yardımcının sadakatine ve becerisine bağlı",
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
    ],
  },

  // ============================================================
  // RAKİP HİZİPLER VE GÜÇ SAVAŞLARI
  // ============================================================
  {
    id: "hizip_asker_saflasma",
    kategori: "savas",
    meslekler: ["Asker"],
    yasakliEtiketler: ["hizip_secildi"],
    minYas: 17,
    gorsel: "⚔️",
    baslik: "Kışlada Bölünme",
    metin: "Ordunun içi kaynıyor. 'Eski Muhafızlar' generalin katı ve soylu kurallarını savunurken, 'Yeni Nizam' liyakata dayalı köklü bir reform istiyor. Silahlar yakında birbirine dönebilir.",
    secenekler: [
      {
        metin: "Geleneklerimiz bizi yaşatır! Eski Muhafızlar'a katıl.",
        baseBasariSansi: 90,
        basariliSonuc: { hizip_ata: "Eski Muhafızlar", ahlak: 10, un: 5, etiket_ekle: ["hizip_secildi"], mesaj: "Soylu komutanların yanında saf tuttun. Gelenekçiler seni bağrına bastı." },
        basarisizSonuc: { hizip_ata: "Eski Muhafızlar", etiket_ekle: ["hizip_secildi"], mesaj: "Katıldın ama yeni yetmeler sana düşman gözüyle bakıyor." },
      },
      {
        metin: "Bu çürümüş düzen değişmeli! Yeni Nizam'a katıl.",
        baseBasariSansi: 90,
        basariliSonuc: { hizip_ata: "Yeni Nizam", un: 15, ahlak: -5, etiket_ekle: ["hizip_secildi"], mesaj: "Reformcuların arasına genç bir aslan gibi girdin. Değişim rüzgarları esiyor!" },
        basarisizSonuc: { hizip_ata: "Yeni Nizam", etiket_ekle: ["hizip_secildi"], mesaj: "Katıldın ama soylu general adını kara listeye aldı bile." },
      },
      {
        metin: "Asker siyasete girmez. Tarafsız kal.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 15,
          etiket_ekle: ["hizip_secildi", "tarafsiz_asker"],
          mesaj: "Kılıcım sadece vatan içindir dedin. Her iki taraf da sana saygı duydu.",
        },
        basarisizSonuc: {
          etiket_ekle: ["hizip_secildi"],
          saglik: -10,
          mesaj: "Tarafsızlık, savaşan iki tarafın arasında kalıp dayak yemek demektir. İki hizip de seni dışladı.",
        },
      },
    ],
  },
  {
    id: "hizip_asker_catisma",
    kategori: "savas",
    meslekler: ["Asker"],
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
        basariliSonuc: { un: 25, dost_puani: 15, mesaj: "Kavgada en öndeydin! Kendi yoldaşların seni omuzlarına aldı, sen bir lidersin." },
        basarisizSonuc: { un: -10, saglik: -25, olum_sansi: 5, mesaj: "Karşı taraf seni fena hırpaladı. Kafan yarılmış bir halde revire kaldırıldın." },
      },
      {
        metin: "Silahları indirin! Araya girip kavgayı durdur.",
        baseBasariSansi: 65,
        ipucu: "Kahramanca bir arabuluculuk",
        basariliSonuc: { ahlak: 20, un: 15, mesaj: "Gür sesinle avluyu inlettin! Herkes utançla silahını indirdi." },
        basarisizSonuc: { saglik: -15, mutluluk: -10, mesaj: "Araya girerken kafana bir meşale fırlattılar. Barış elçisi olmak acı vericidir." },
      },
    ],
  },
  {
    id: "hizip_asker_celiskili_emirler",
    kategori: "savas",
    meslekler: ["Asker"],
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
          para: 10,
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
    meslekler: ["Asker"],
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
    id: "hizip_tuccar_saflasma",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    yasakliEtiketler: ["hizip_secildi"],
    minYas: 17,
    gorsel: "⚖️",
    baslik: "Pazarın Hakimi Kim?",
    metin: "Ticaret odası ikiye bölündü. Liman Loncası asilzadelerin desteğiyle tekelciliği savunuyor; Pazar Birliği ise küçük esnafın serbest rekabet hakkını. Tarafını seçmezsen iflas edebilirsin.",
    secenekler: [
      {
        metin: "Zenginlik ve güç! Liman Loncası'na katıl.",
        baseBasariSansi: 90,
        basariliSonuc: { hizip_ata: "Liman Loncası", para: 30, ahlak: -15, etiket_ekle: ["hizip_secildi"], mesaj: "Soylu tüccarlar seni aralarına aldı. Vergi indirimleri anında başladı." },
        basarisizSonuc: { hizip_ata: "Liman Loncası", etiket_ekle: ["hizip_secildi"], mesaj: "Katıldın ama küçük esnaf sana sırtını döndü." },
      },
      {
        metin: "Halkın gücü! Pazar Birliği'ne katıl.",
        baseBasariSansi: 90,
        basariliSonuc: { hizip_ata: "Pazar Birliği", un: 20, ahlak: 15, etiket_ekle: ["hizip_secildi"], mesaj: "Esnafın kahramanı oldun. Sokaktaki adam artık senin tezgâhından alışveriş yapıyor." },
        basarisizSonuc: { hizip_ata: "Pazar Birliği", para: -15, etiket_ekle: ["hizip_secildi"], mesaj: "Katıldın ama asilzadeler mallarına ağır gümrük vergileri koydu." },
      },
      {
        metin: "Ben sadece kendi kârıma bakarım. Tarafsız kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 10,
          etiket_ekle: ["hizip_secildi"],
          mesaj: "Her iki tarafla da el altından ticaret yaparak kurnazlığını konuşturuyorsun.",
        },
        basarisizSonuc: {
          para: -25,
          etiket_ekle: ["hizip_secildi"],
          mesaj: "Tarafsız kaldığın için her iki lonca da sana ambargo uyguladı!",
        },
      },
    ],
  },
  {
    id: "hizip_tuccar_catisma",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
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
        basariliSonuc: { para: 60, un: 15, ahlak: -35, mesaj: "Liman alev alev! Rakiplerin iflas etti, piyasanın tek hakimi sensin." },
        basarisizSonuc: { para: -40, un: -30, ahlak: -20, mesaj: "Kundakçılar yakalandı ve ötüp senin adını verdiler. Tazminat ödemekten perişan oldun." },
      },
      {
        metin: "Bu kirli oyuna girmem, sadece ticaretime odaklanırım.",
        baseBasariSansi: 85,
        basariliSonuc: { ahlak: 15, mesaj: "Ellerini temiz tuttun. Yavaş ama onurlu bir şekilde işine devam ediyorsun." },
        basarisizSonuc: { para: -20, mesaj: "Sen temiz kaldın ama rakiplerin senin depolarına sabotaj düzenledi!" },
      },
    ],
  },
  {
    id: "hizip_tuccar_depo_yangini",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
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
    meslekler: ["Tüccar"],
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
          para: 50,
          un: 10,
          mesaj: "Rakibin önce pes etti, iflasın eşiğine geldi. Piyasa yeniden senin.",
          detay: "Kazandın ama bu savaş her iki tarafı da yıprattı.",
        },
        basarisizSonuc: {
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
    id: "hizip_din_saflasma",
    kategori: "din",
    meslekler: ["Din Adamı"],
    yasakliEtiketler: ["hizip_secildi"],
    minYas: 17,
    gorsel: "📿",
    baslik: "Kutsal Bölünme",
    metin: "İnanç merkezleri ikiye yarıldı. Gelenekçiler kadim ve katı yasaları geri getirmek isterken, Yenilikçiler dini halkın diline çevirip aydınlanma talep ediyor. Hangi saftasın?",
    secenekler: [
      {
        metin: "Kurallar esnetilemez! Gelenekçiler'e katıl.",
        baseBasariSansi: 90,
        basariliSonuc: { hizip_ata: "Gelenekçiler", ahlak: 15, un: 10, etiket_ekle: ["hizip_secildi"], mesaj: "Eski piskoposlar seni takdir etti. Kadim bilginin koruyucususun." },
        basarisizSonuc: { hizip_ata: "Gelenekçiler", mutluluk: -5, etiket_ekle: ["hizip_secildi"], mesaj: "Genç cemaat seni yobazlıkla suçlayarak tapınağı terk etti." },
      },
      {
        metin: "Aydınlanma vakti! Yenilikçiler'e katıl.",
        baseBasariSansi: 90,
        basariliSonuc: { hizip_ata: "Yenilikçiler", un: 25, ahlak: 5, etiket_ekle: ["hizip_secildi"], mesaj: "Meydanlar seni dinlemek için dolup taşıyor. Yeni çağın sesi oldun." },
        basarisizSonuc: { hizip_ata: "Yenilikçiler", un: -10, ahlak: -15, etiket_ekle: ["hizip_secildi"], mesaj: "Engizisyon / Üst Kurul seni kafirlikle suçlamakla tehdit ediyor." },
      },
      {
        metin: "Din siyasete alet edilemez. Taraf seçme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 20,
          etiket_ekle: ["hizip_secildi"],
          mesaj: "Vaazlarında sadece huzur var. İnsanlar senin yanına politika için değil, arınmak için geliyor.",
        },
        basarisizSonuc: {
          un: -15,
          etiket_ekle: ["hizip_secildi"],
          mesaj: "Taraf seçmediğin için iki grup da senin kürsünü ciddiye almamaya başladı.",
        },
      },
    ],
  },
  {
    id: "hizip_din_catisma",
    kategori: "din",
    meslekler: ["Din Adamı"],
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
        basariliSonuc: { un: 30, ahlak: -20, mesaj: "Ateşli vaazın cemaati çılgına çevirdi! Hizbinin mutlak ruhani lideri konumuna yükseldin." },
        basarisizSonuc: { un: -20, ahlak: -30, saglik: -10, mesaj: "Karşı tarafın destekçileri vaaz sırasında taş ve sopalarla kürsüye saldırdı! Kan aktı." },
      },
      {
        metin: "Tanrı barış ister. Kalpleri yumuşatmaya çalış.",
        baseBasariSansi: 75,
        basariliSonuc: { mutluluk: 15, ahlak: 25, mesaj: "Sesindeki şefkat öfkeli kalabalığı ağlattı. Şehir o gün bir katliamdan döndü." },
        basarisizSonuc: { dost_puani: -15, mesaj: "Kendi hizbin seni 'korkak ve pasifist' olmakla suçlayarak arkandan iş çevirmeye başladı." },
      },
    ],
  },
  {
    id: "hizip_din_metin_yorumu",
    kategori: "din",
    meslekler: ["Din Adamı"],
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
    meslekler: ["Din Adamı"],
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
          mutluluk: 10,
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

  // ============================================================
  // DÜNYA OLAYLARI — SAVAŞ VE İSTİLA
  // ============================================================
  {
    id: "dunya_savas_ilani",
    kategori: "siyaset",
    gerekliUlke: { savasta: false },
    maxYas: 55,
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Savaş Çanları",
    metin:
      "{yil} yılı. {bolge} ile {komsu} arasında devasa bir savaş patlak verdi! Sınır köyleri yanıyor. Seferberlik tellalları meydanlarda bağırıyor: Her haneden eli silah tutan biri orduya katılacak!",
    secenekler: [
      {
        metin: "Kara Kılıcı kuşanarak cepheye en önde git!",
        baseBasariSansi: 95,
        gerekliEtiketler: ["envanter:kara_kilic"],
        ipucu: "Gizli Envanter: Kılıç kana susadı! Mutlak zafer ama ruhun kararır",
        basariliSonuc: {
          un: 35,
          para: 30,
          ahlak: -30,
          saglik: 5,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["cephe_gordu"],
          mesaj: "Kara Kılıç elinde adeta kendi kendine dans etti. Düşmanlar senden dehşete düşüp kaçtı! Sen bir savaş tanrısı gibi anılıyorsun ama gece olduğunda kılıcın sana fısıldadığı o iğrenç şeyleri unutamıyorsun.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Gönüllü yazıl, vatan için kanını akıt.",
        baseBasariSansi: 55,
        ipucu: "Yüksek ün ve ganimet, ciddi ölüm veya sakatlanma riski",
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -8,
          saglik: -12,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["cephe_gordu"],
          mesaj: "Aylarca siperlerde çamur ve kan içinde kaldın. Ama hayattasın, madalya aldın ve ganimetten payınla döndün.",
        },
        basarisizSonuc: {
          saglik: -45,
          un: 15,
          olum_sansi: 20,
          ulke_etkisi: { savasta: true },
          durum_ekle: { id: "savas_yarasi", ad: "Gazi Yarası", tur: "kalici", tur_basi_saglik: -1 },
          mesaj: "Top mermisi hemen yanına düştü. Uyandığında sahra hastanesindeydin. Bedenin parçalandı, artık eski gücün asla yerine gelmeyecek.",
        },
      },
      {
        metin: "Çürük raporu ayarla ve savaştan kaç.",
        baseBasariSansi: 60,
        maliyet: 35,
        ipucu: "Canını korur, cebini ve vicdanını yıkar",
        basariliSonuc: {
          para: -35,
          ahlak: -25,
          un: -20,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["askerlikten_kacti"],
          mesaj: "Hekime rüşvet vererek kendini evde güvenceye aldın. Cepheden komşularının ölüm haberleri gelirken sen sıcak yatağındasın. İtibarın yerle bir.",
        },
        basarisizSonuc: {
          para: -35,
          un: -30,
          ahlak: -20,
          ulke_etkisi: { savasta: true },
          mesaj: "Rüşvet verdiğin ortaya çıktı! Seni zorla en ön saflara, ölüme sürdüler. Hem onurunu hem paranı kaybettin.",
        },
      },
    ],
  },
  {
    id: "dunya_savas_biter",
    kategori: "siyaset",
    gerekliUlke: { savasta: true },
    gorsel: "🕊️",
    agirlik: 0.8,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kanlı Çamurun Sonu",
    metin:
      "{yil} yılında imzalanan antlaşmayla savaş nihayet sona erdi. Cepheden eksik uzuvlar ve boş bakışlarla dönen yoldaşların iş arıyor. Hazine tamtakır, sokaklar gazi dolu. Yeni dünya düzeninde yerin neresi olacak?",
    secenekler: [
      {
        metin: "Eski yoldaşlarını topla, gaziler için bir dayanışma ağı kur.",
        baseBasariSansi: 60,
        ipucu: "Büyük itibar ve sadık bir ordu kurarsın ama masraflıdır",
        basariliSonuc: {
          un: 25,
          para: -20,
          ahlak: 20,
          ulke_etkisi: { savasta: false },
          etiket_ekle: ["gaziler_agi", "itibar:gazi_babasi"],
          mesaj: "Yüzlerce gaziye iş ve aş buldun. Şehirde sana kendi babalarından daha çok sadık kocaman bir gayriresmi ordun var.",
          detay: "Bu adamların çoğu okuma yazma bilmiyor ama senin için canlarını verirler."
        },
        basarisizSonuc: {
          para: -25,
          un: -10,
          ulke_etkisi: { savasta: false },
          mesaj: "Söz verdiğin işleri bulamadın. Eski silah arkadaşların kapına dayanıp seni 'hayal tacirliğiyle' suçladı.",
          detay: "Bir daha hiçbir askerin yüzüne bakamayacaksın."
        },
      },
      {
        metin: "Fırsat bu fırsat! Savaşta sahipsiz kalan arazileri yok pahasına kapat.",
        baseBasariSansi: 55,
        maliyet: 25,
        ipucu: "Büyük kazanç ama ölülerin mallarına çökmek vicdanını karartır",
        basariliSonuc: {
          para: 60,
          ahlak: -25,
          un: -10,
          ulke_etkisi: { savasta: false },
          mesaj: "Şehit düşenlerin tarlalarını üç kuruşa satın alıp tapularına el koydun. Savaş bitti ve sen bir toprak ağasısın.",
          detay: "Önceki sahiplerin dulları bazen pazarda yüzüne tükürüyor, sen ise o sırada altınlarını sayıyorsun."
        },
        basarisizSonuc: {
          para: -30,
          ulke_etkisi: { savasta: false },
          mesaj: "Aldığın arazilerin çoğunun gerçek varisleri ortaya çıktı. Mahkeme tapularını iptal etti.",
          detay: "Ölülerin malı sana yar olmadı."
        },
      },
      {
        metin: "İsyan edebilecek eski askerlerin isimlerini yeni hükümete sat.",
        baseBasariSansi: 80,
        maxAhlak: 40,
        ipucu: "Sadece karanlık ruhlulara açık: Risksiz devlet parası ve kanlı ihanet",
        basariliSonuc: {
          para: 40,
          un: -20,
          ahlak: -35,
          ulke_etkisi: { savasta: false },
          etiket_ekle: ["sir:yoldas_satan"],
          mesaj: "Listeyi verdin. O gece şehirde onlarca eski yoldaşın yataklarından alınıp zindanlara atıldı. Kesen doldu ama ellerin kanlı.",
          detay: "Artık yeni devletin gizli bir köpeğisin."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "dunya_savas_cephe_cagrisi",
    kategori: "savas",
    meslekler: ["Asker"],
    gerekliUlke: { savasta: true },
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 3,
    baslik: "Ölüm Emri",
    metin:
      "Savaş en kanlı evresine girdi. Alayın doğrudan ölüm kokan bir tabyaya sürülüyor. Komutan gece yarısı çadırında görev dağıtımı yapıyor. Gözleri senin üzerinde.",
    secenekler: [
      {
        metin: "Ölüme ilk ben giderim! Taarruz koluna yazıl.",
        baseBasariSansi: 45,
        ipucu: "Büyük kahramanlık unvanı ya da feci bir sakatlık/ölüm",
        basariliSonuc: {
          un: 35,
          para: 25,
          saglik: -15,
          ahlak: -10,
          etiket_ekle: ["kahraman_asker"],
          unvan_kazan: "Tabya Fatihi",
          mesaj: "Tabyayı kan banyosuna çevirip ilk sen düştün içine! Göğsüne bizzat general madalya taktı.",
          detay: "O gün boğazladığın düşmanların yüzlerini unutamıyorsun ama tarih kitapları adını altın harflerle yazacak."
        },
        basarisizSonuc: {
          saglik: -50,
          olum_sansi: 30,
          durum_ekle: { id: "savas_yarasi_agir", ad: "Kopuk Uzuv", tur: "kalici", tur_basi_saglik: -2 },
          mesaj: "Bir top mermisi seni havaya uçurdu. Günlerce cesetlerin arasında ölü yattın sanılıp bırakıldın.",
          detay: "Uyandığında bedeninin bir parçasının eksik olduğunu fark ettin."
        },
      },
      {
        metin: "Beni ikmal hattına, cephe gerisine verin komutanım.",
        baseBasariSansi: 75,
        ipucu: "Hayatta kalırsın ama birliğin gözünde korkak olursun",
        basariliSonuc: {
          para: 15,
          un: -20,
          saglik: -5,
          mesaj: "Erzak çuvallarının arkasında saklanarak savaşı sağ salim atlattın.",
          detay: "Dönen silah arkadaşların artık seninle aynı masaya oturmuyor. Yüzündeki o utanç ömür boyu sürecek."
        },
        basarisizSonuc: {
          para: -15,
          un: -25,
          mesaj: "İkmal hattına sızan düşman süvarileri sizi kılıçtan geçirdi. Korkaklığın seni koruyamadı.",
          detay: "Hem kaçtın hem de esir düşmekten zor kurtuldun."
        },
      },
    ],
  },
  {
    id: "dunya_savas_maas_kesintisi",
    kategori: "siyaset",
    meslekler: ["Asker"],
    gerekliUlke: { savasta: true },
    gorsel: "💸",
    baslik: "Aç Askerler",
    metin:
      "Savaş uzadıkça hazine suyunu çekti. Üç aydır tek bir gümüş bile ödenmedi. Askerlerin botları delik, mideleri boş. Kışlada isyan fısıltıları dolaşıyor.",
    secenekler: [
      {
        metin: "Elebaşı ol! Dilekçeyi alıp generalin çadırına dayan.",
        baseBasariSansi: 50,
        ipucu: "Büyük liderlik vasfı ama kurşuna dizilme tehlikesi",
        basariliSonuc: {
          para: 15,
          un: 25,
          ahlak: 15,
          etiket_ekle: ["asker_sozcusu"],
          mesaj: "Yumruğunu masaya vurdun. General isyandan korkup hazinedeki son parayı size dağıttı. Sen bir efsanesin!",
          detay: "Ancak üst komuta seni 'tehlikeli asi' olarak fişledi."
        },
        basarisizSonuc: {
          un: -25,
          saglik: -20,
          olum_sansi: 15,
          mesaj: "General seni dinlemedi bile. İsyana teşvikten kırbaç cezasına çarptırıldın ve zindana atıldın.",
          detay: "Arkandaki askerler korkup seni sattı. Yalnız kaldın."
        },
      },
      {
        metin: "Haklısınız de, ama çevre köyleri yağmalamaya ikna et.",
        baseBasariSansi: 65,
        ipucu: "Tokluk ve altın, ancak masum kanı ve lanet",
        basariliSonuc: {
          para: 45,
          ahlak: -40,
          un: -15,
          etiket_ekle: ["sir:koy_yagmaci"],
          mesaj: "Aç askerlerle gece vakti savunmasız köylere daldınız. Altın ve yiyecekle döndünüz ama gökyüzü o gece kıpkırmızıydı.",
          detay: "Ağlayan o köylü kadının yüzü artık kabuslarında."
        },
        basarisizSonuc: {
          saglik: -30,
          ahlak: -25,
          un: -20,
          olum_sansi: 10,
          mesaj: "Köylüler beklediğinizden dişli çıktı. Tırpan ve baltalarla askerleri pusuya düşürdüler, karnından ağır yaralandın.",
          detay: "Yağmacılık yaparken köylüden dayak yemek, itibarını sonsuza dek bitirdi."
        },
      },
    ],
  },
  {
    id: "dunya_salgin_baslar",
    kategori: "saglik",
    gerekliUlke: { vebada: false },
    gorsel: "☠️",
    agirlik: 0.7,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kara Ölüm Kapıda",
    metin:
      "Limanlara yanaşan son gemiyle şehre görünmez bir katil girdi. İnsanlar sokaklarda kan kusarak ölmeye başladı. Şehir kapıları kapatılmak üzere.",
    secenekler: [
      {
        metin: "Sırlı İksiri ailen ve kendin için kullan!",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:sirli_iksir"],
        ipucu: "Gizli Envanter: O sahte sandığın iksir meğer bir şaheser",
        basariliSonuc: {
          etiket_sil: ["envanter:sirli_iksir"],
          etiket_ekle: ["tibbi:veba_bagisik"],
          mutluluk: 20,
          saglik: 15,
          un: 10,
          ulke_etkisi: { vebada: true },
          mesaj: "İksiri içtiniz. Damarlarında buz gibi bir his yayıldı. Çevrendeki herkes kırılırken sana ve ailene tek bir sinek bile dokunamadı!",
          detay: "Sen mucizenin ta kendisi oldun."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Tüm işi gücü bırak, aileyi alıp kırsala (dağlara) kaç.",
        baseBasariSansi: 70,
        maliyet: 20,
        ipucu: "Sağlığını korursun ancak şehrin ekonomisindeki yerin sıfırlanır",
        basariliSonuc: {
          para: -20,
          un: -15,
          ulke_etkisi: { vebada: true },
          maas_carpani: 0.8,
          mesaj: "Veba maskeliler kapıları tutmadan ormana kaçtınız. Soğukta ve sefalet içinde yaşadınız ama hayattasınız.",
          detay: "Döndüğünde dükkanın/işin başkalarının eline geçmiş olacak."
        },
        basarisizSonuc: {
          para: -20,
          saglik: -25,
          olum_sansi: 15,
          ulke_etkisi: { vebada: true },
          durum_ekle: { id: "salgin_hastaligi", ad: "Veba Pençesi", tur: "gecici", kalan_tur: 2, tur_basi_saglik: -15 },
          mesaj: "Kaçış yolunda kervandaki birinden sana da bulaştı. Ormanın ortasında, çaresizce ateşler içinde yatıyorsun.",
        },
      },
      {
        metin: "Şehirde kal! İlaç ve erzak karaborsacılığı yap.",
        baseBasariSansi: 50,
        maliyet: 15,
        ipucu: "Korkunç bir zenginlik ama yüksek ölüm ve vicdan azabı",
        basariliSonuc: {
          para: 70,
          ahlak: -35,
          un: 15,
          unvan_kazan: "Veba Tüccarı",
          ulke_etkisi: { vebada: true },
          mesaj: "Aspirinleri ve temiz suyu altın fiyatına sattın. İnsanlar inleyerek ölürken sen servetine servet kattın.",
        },
        basarisizSonuc: {
          saglik: -35,
          para: -15,
          olum_sansi: 25,
          ulke_etkisi: { vebada: true },
          durum_ekle: { id: "salgin_hastaligi", ad: "Veba Pençesi", tur: "gecici", kalan_tur: 3, tur_basi_saglik: -15 },
          mesaj: "Müşterilerinden birinin kusmuğu yüzüne geldi. Altınların seni kurtaramadı, kara ölüm ciğerlerine işledi.",
        },
      },
    ],
  },
  {
    id: "dunya_salgin_ortasinda",
    kategori: "saglik",
    gerekliUlke: { vebada: true },
    gorsel: "☠️",
    baslik: "Vebanın Tam Ortası",
    metin:
      "Sokaklarda ceset arabaları dolaşıyor. 'Ölülerinizi dışarı çıkarın!' sesleri yankılanıyor. Mahalleli komşu evi ateşe vermeye hazırlanıyor, çünkü içeride can çekişen bir çocuk var.",
    secenekler: [
      {
        metin: "Manastır Kedisini eve sal, seni farelerden korusun.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["esya:veba_koruyucu_kedi"],
        ipucu: "Gizli Eşya: Kedi, veba taşıyan pireli fareleri avlar!",
        basariliSonuc: {
          mutluluk: 15,
          saglik: 10,
          mesaj: "O tuhaf kara kedi gece gündüz avlandı. Evin etrafına tek bir hastalıklı fare bile yaklaşamadı. Kedi senin ailenin koruyucu meleği oldu!"
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Kalabalığa kafa tut ve yanan eve girip o çocuğu kurtar!",
        baseBasariSansi: 45,
        ipucu: "Büyük kahramanlık, ahlak zirvesi ama devasa bulaş riski",
        basariliSonuc: {
          un: 30,
          ahlak: 35,
          saglik: -10,
          etiket_ekle: ["salgin_kahramani"],
          mesaj: "Kapıyı kırıp alevlerin içinden o çocuğu omuzlayarak çıkardın. Hastalığa yakalanmadın. Şehir seni peygamber gibi görüyor.",
          detay: "Kurtardığın o can, bir ömür sana minnettar kalacak."
        },
        basarisizSonuc: {
          saglik: -35,
          ahlak: 25,
          olum_sansi: 25,
          durum_ekle: { id: "salgin_hastaligi", ad: "Veba Pençesi", tur: "gecici", kalan_tur: 3, tur_basi_saglik: -15 },
          mesaj: "Çocuğu çıkardın ama veba sana da geçti. Çocuğun nefesi yüzüne değdiği an sonun başlangıcı oldu.",
        },
      },
      {
        metin: "Kapıları çivile, pencereleri tahtala. Kimseye acıma.",
        baseBasariSansi: 85,
        ipucu: "En güvenli yol, ancak ruhunu kaybedersin",
        basariliSonuc: {
          saglik: 10,
          ahlak: -25,
          un: -15,
          mesaj: "Çocuğun çığlıkları kesilinceye kadar kulaklarını tıkadın. Kapıdan dışarı adım atmadın ve hayatta kaldın.",
          detay: "O çığlıkları duyduğun o geceyi hiçbir zaman unutmayacaksın."
        },
        basarisizSonuc: {
          saglik: -20,
          ahlak: -20,
          olum_sansi: 15,
          durum_ekle: { id: "salgin_hastaligi", ad: "Veba Pençesi", tur: "gecici", kalan_tur: 2, tur_basi_saglik: -15 },
          mesaj: "Evini mezara çevirdin ama veba sulara çoktan karışmıştı. Dört duvar arasında ateşler içinde kıvranıyorsun.",
        },
      },
    ],
  },
  {
    id: "dunya_salgin_biter",
    kategori: "saglik",
    gerekliUlke: { vebada: true },
    gorsel: "🌱",
    agirlik: 0.8,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Ölümün Çekilişi",
    metin:
      "Aylar süren dehşetin ardından veba geri çekiliyor. Nüfusun üçte biri yok oldu. Sahipsiz kalan evler, dükkânlar ve sokaklarda aç gezen yetimler var. Şehir yeniden doğuyor.",
    secenekler: [
      {
        metin: "Sahipsiz mülklere sahte tapular düzenleyerek el koy.",
        baseBasariSansi: 60,
        maliyet: 15,
        ipucu: "Muazzam kalıcı gelir artışı, ancak iğrenç bir itibar",
        basariliSonuc: {
          para: 50,
          ahlak: -35,
          un: -15,
          maas_carpani: 1.3,
          ulke_etkisi: { vebada: false },
          mesaj: "Ölülerin yatakları daha soğumadan evlerine çöktün. Dev bir emlak imparatorluğu kurdun ama kâbuslarında o yüzleri görüyorsun."
        },
        basarisizSonuc: {
          para: -25,
          un: -25,
          ahlak: -30,
          ulke_etkisi: { vebada: false },
          mesaj: "Gerçek varisler kasabaya geri döndü. Sahtekârlıktan yargılandın, halk seni linç etmeye kalktı."
        },
      },
      {
        metin: "Vebadan kurtulan yetimleri topla ve onlara bir yurt kur.",
        baseBasariSansi: 75,
        maliyet: 20,
        ipucu: "Maddi fedakarlık, muazzam itibar ve sadık bir nesil",
        basariliSonuc: {
          para: -20,
          un: 30,
          ahlak: 35,
          maas_carpani: 1.1,
          etiket_ekle: ["ciraklar_var", "itibar:yetim_babasi"],
          ulke_etkisi: { vebada: false },
          mesaj: "Yetimler senin elinde büyüdü. Onlar artık sadece çırak değil, senin en sadık evlatların.",
          detay: "Yıllar sonra o çocuklar senin iş imparatorluğunu sırtlayacak."
        },
        basarisizSonuc: {
          para: -30,
          ahlak: 15,
          ulke_etkisi: { vebada: false },
          mesaj: "Çocukların bakımı seni maddi olarak tüketti. Bazıları hırsızlık yapıp kaçtı ama yine de vicdanın rahat."
        },
      },
    ],
  },
  {
    id: "ekonomi_kriz_donemi_v2",
    kategori: "ticaret",
    gerekliUlke: { ekonomi: "kotu" },
    gorsel: "📉",
    baslik: "Krizin Pençesinde",
    metin:
      "Ülke ekonomisi çöktü, paranın değeri bir avuç toprak bile etmiyor. {es} ve çocukların açlıkla savaşıyor. Dükkânı kurtarmak için paraya, aileyi kurtarmak için ekmeğe ihtiyacın var.",
    secenekler: [
      {
        metin: "Son paramla karaborsadan çocuklara/aileme yiyecek alacağım.",
        baseBasariSansi: 85,
        gerekliEtiketler: ["cocuk_var"],
        kilitAciklamasi: "Aileni doyurmak için çocukların olmalı.",
        ipucu: "Aile hayatta kalır, sen tamamen iflas edersin",
        basariliSonuc: {
          para: -40,
          saglik: 10,
          mutluluk: 15,
          ahlak: 20,
          un: -15,
          mesaj: "Dükkânın kepenklerini sonsuza dek kapattın. Ticaret bitti. Ama çocukların o akşam doya doya ekmek yedi. Ailenin kahramanısın."
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -15,
          saglik: -10,
          mesaj: "Sermayeyi verdin ama karaborsacı malları çürük verdi. Hem iş battı hem çocuklar hasta oldu."
        }
      },
      {
        metin: "İşi kurtarmam lazım! Aile dişini sıksın, parayı dükkâna bas.",
        baseBasariSansi: 45,
        ipucu: "Zengin olursun ancak ailene büyük ihanet edersin",
        basariliSonuc: {
          para: 60,
          un: 15,
          ahlak: -30,
          mutluluk: -25,
          mesaj: "Herkes batarken sen krizden imparatorluk çıkardın! Ancak eve döndüğünde zayıflıktan erimiş çocuklarının sana attığı o kırgın bakışı asla silemeyeceksin."
        },
        basarisizSonuc: {
          para: -40,
          saglik: -20,
          mutluluk: -30,
          mesaj: "Kriz seni de yuttu. Hem dükkân battı hem ailen açlıktan kırıldı. Tam bir felaket."
        }
      },
      {
        metin: "Ölü Yüzüğü tefeciye rehin bırakarak zaman kazan.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:olunun_yuzugu"],
        ipucu: "Gizli Envanter: Çaldığın yüzük hayatını kurtarır",
        basariliSonuc: {
          para: 20,
          etiket_sil: ["envanter:olunun_yuzugu"],
          mesaj: "Mezardan/Tabuttan aşırdığın yüzüğü tefeciye fırlattın. Gözleri parladı ve sana borç yazmadı. Hem aileni hem işi kurtardın!"
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      }
    ],
  },
  {
    id: "dunya_ekonomi_toparlanma",
    kategori: "ticaret",
    gerekliUlke: { ekonomi: "kotu" },
    gorsel: "📈",
    agirlik: 0.8,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Yeni Dönem",
    metin:
      "Devlet yeni para bastı, yollar açıldı. Krizin o ağır tozu kalkıyor. İlk cesur hamleyi yapan piyasanın kaymağını yiyecek.",
    secenekler: [
      {
        metin: "Borç batağına gir, tüm malları topla! Agresif büyü.",
        baseBasariSansi: 50,
        ipucu: "Tutarsa piyasanın hakimi olursun",
        basariliSonuc: {
          para: 50,
          un: 20,
          maas_carpani: 1.3,
          ulke_etkisi: { ekonomi: "iyi" },
          mesaj: "Rakiplerin hala korkudan titrerken sen depoları doldurdun. Toparlanma dalgasını yakaladın, servetin uçtu!"
        },
        basarisizSonuc: {
          para: -40,
          un: -10,
          ulke_etkisi: { ekonomi: "normal" },
          mesaj: "Çok acele ettin. Fiyatlar bir kez daha dibe vurduğunda borçlar boynunu sıktı. Elindeki her şeyi kaybettin."
        },
      },
      {
        metin: "Temkinli ol, ufak ufak alım yap.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ve mantıklı büyüme",
        basariliSonuc: {
          para: 20,
          ulke_etkisi: { ekonomi: "normal" },
          mesaj: "Risksiz ve sağlam adımlarla ilerledin. Zengin olmadın ama ayakların yere çok sağlam basıyor."
        },
        basarisizSonuc: {
          para: -5,
          un: -5,
          ulke_etkisi: { ekonomi: "normal" },
          mesaj: "Çok bekledin; sen piyasaya girene kadar büyük kurtlar tüm ihaleleri kapmıştı bile."
        },
      },
    ],
  },

  // ============================================================
  // GİZEM VE MİSTİK (Ağırlık 0.2)
  // ============================================================
  {
    id: "gizem_golge_pazari",
    kategori: "ticaret",
    agirlik: 0.2,
    gorsel: "🌒",
    baslik: "Var Olmayan Sokak",
    metin: "Gece vakti kayboldun ve kendini şehrin haritalarında olmayan sisli bir sokakta buldun. Tezgahlarda ruhlar, sırlar ve fısıltılar satılıyor. Maskeli bir tüccar sana parlayan siyah bir sikke uzattı. 'Bunu almak için altını değil, anılarını vereceksin.'",
    secenekler: [
      {
        metin: "Geçmişimdeki mutlu anıları verip sikkeyi al.",
        baseBasariSansi: 100,
        ipucu: "Mutluluğunu ve ahlakını tüketir ama efsanevi bir eşya (Gölge Sikke) verir",
        basariliSonuc: {
          mutluluk: -30,
          ahlak: -15,
          etiket_ekle: ["envanter:golge_sikke"],
          mesaj: "Tüccar alnına dokundu. Çocukluk sevinçlerin, annenin yüzü... hepsi silindi. Elinde ise cehennem gibi soğuk bir 'Gölge Sikke' var."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Ruhum satılık değil! Kaç buradan.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Arkanı dönüp koştun. Arkana baktığında o sokağın yerinde sadece taş bir duvar vardı. Ruhun güvende."
        },
        basarisizSonuc: {
          mutluluk: -15,
          saglik: -10,
          mesaj: "Kaçarken sislerin içinden kollar seni tırmaladı. Sokaktan kurtuldun ama geceler boyu o maskeli yüzü göreceksin."
        }
      }
    ]
  },
  {
    id: "gizem_fisildayan_tas",
    kategori: "ticaret",
    gizemli: true,
    agirlik: 0.25,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Düz, Gri Bir Taş",
    metin:
      "Yol kenarında oturan yaşlı bir kadın, önündeki bezin üzerinde tek bir eşya sergiliyor: sıradan görünen, avuç içi büyüklüğünde gri bir taş. 'Ucuza veririm' diyor, 'ama dinlemeyi bilmek lazım. O da seni dinliyor zaten.'",
    secenekler: [
      {
        metin: "Gülümse, birkaç bakır sikkeyle taşı satın al.",
        baseBasariSansi: 95,
        maliyet: 5,
        ipucu: "Ucuz bir merak — muhtemelen sıradan bir taş (Envantere eklenir)",
        basariliSonuc: {
          para: -5,
          etiket_ekle: ["esya:fisildayan_tas"],
          mesaj: "Taşı avucuna aldın; ağırlığı tuhaf bir şekilde tam yerinde. Kadın gülümsedi: 'Şimdi o da senin bir parçan.' Cebine attığında hafif bir uğultu duyar gibi oldun.",
          detay: "Belki hayal gücündür, belki değil.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Taşı aldın ama sıradan bir çakıldan farksız çıktı, kadın da parayı alır almaz sırra kadem bastı.",
        },
      },
      {
        metin: "Kadını fırsattan yararlanıp taşı çal.",
        baseBasariSansi: 45,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Bedavaya gizemli bir eşya ya da rezillik",
        basariliSonuc: {
          ahlak: -10,
          etiket_ekle: ["esya:fisildayan_tas"],
          mesaj: "Kadın başka yöne bakarken taşı kaptığın gibi kaçtın. Arkandan bağırdığını duydun: 'O seni bulur, para vermeden de!'",
          detay: "Elinde şimdiden hafif bir uğultu var.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -5,
          mesaj: "Kadın bileğini demir gibi bir güçle yakaladı, yaşından beklenmeyecek bir çeviklikle seni meydanda rezil etti.",
        },
      },
      {
        metin: "Deli saçması de, yoluna devam et.",
        baseBasariSansi: 92,
        ipucu: "Güvenli ama taşı hiç merak etmeden edemeyebilirsin",
        basariliSonuc: { mesaj: "Omuz silkip yürüdün. Arkandan kadının kikirdediğini duydun ama aldırmadın." },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Yürüdükçe kadının sözleri kafanda dönüp durdu: 'O da seni dinliyor zaten.' Geceleri bazen o taşı merak ediyorsun.",
          detay: "Bazı meraklar, cevapsız kaldıkça büyüyor.",
        },
      },
    ],
  },
  {
    id: "gizem_fisildayan_tas_uyari",
    kategori: "sosyal",
    gerekliEtiketler: ["esya:fisildayan_tas"],
    gizemli: true,
    agirlik: 0.6,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Taş Konuştu",
    metin:
      "Gece yarısı, cebindeki taş aniden ısındı ve kulağına -gerçekten kulağına mı?- ince, kumlu bir ses fısıldadı: 'Yarın... güvendiğin biri... dikkatli ol.' Sonra sessizlik. Kalbin küt küt atıyor.",
    secenekler: [
      {
        metin: "Uyarıyı ciddiye al, ertesi gün temkinli davran.",
        baseBasariSansi: 80,
        ipucu: "Belki hayal, belki gerçek bir uyarı — temkin nadiren zarar verir",
        basariliSonuc: {
          ahlak: 5,
          mutluluk: -5,
          mesaj: "Gün boyu tetikte gezdin; yakın bir dostunun sana söylemesi gereken kötü bir haberi son anda fark ettin, hazırlıksız yakalanmadın.",
          detay: "Taş haklıymış — ya da sen kendi sezgini taşın sesi sandın.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Bütün gün gölgelerden ürktün ama hiçbir şey olmadı; sadece uykusuz ve gergin bir gün geçirdin.",
        },
      },
      {
        metin: "Bu bir rüyaydı, aldırma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Omuz silktin ve unuttun gitti. Belki de gerçekten sadece bir rüyaydı.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          un: -5,
          mesaj: "Aldırmadın ve gerçekten de güvendiğin biri seni küçük düşürecek bir dedikodu yaydı. Keşke dinleseydin.",
        },
      },
    ],
  },
  {
    id: "gizem_fisildayan_tas_istek",
    kategori: "sosyal",
    gerekliEtiketler: ["esya:fisildayan_tas"],
    gizemli: true,
    ton: "agir",
    agirlik: 0.5,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Taşın İsteği",
    metin:
      "Taş bu kez daha net konuştu: 'Bana bir isim ver. Sevdiğin birinin adını. Karşılığında sana yıllarca yetecek bir şans vereceğim.' Sesi artık kumlu değil, neredeyse insan gibi.",
    secenekler: [
      {
        metin: "Rastgele, tanımadığın birinin adını uydur, kandır.",
        baseBasariSansi: 50,
        ipucu: "Riskli bir hile — taş anlarsa öfkelenebilir",
        basariliSonuc: {
          un: 15,
          para: 20,
          mesaj: "Taş bir süre sessiz kaldı, sonra 'Kabul ettim' diye fısıldadı. İnandırıcı yalanın işe yaramış gibi görünüyor; önümüzdeki günler tuhaf bir şansla geçti.",
          detay: "Ya da her şey sadece tesadüftü.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          ahlak: -5,
          mesaj: "'Yalan söyledin' diye tısladı taş, sesi öfkeyle titredi. O günden sonra cebinde taşımak bile seni ürpertiyor.",
        },
      },
      {
        metin: "Kimsenin adını verme; taşı sessizce bir kuyuya at.",
        baseBasariSansi: 95,
        ipucu: "Güvenli ama gizemi sonsuza dek kaybedersin",
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 5,
          etiket_sil: ["esya:fisildayan_tas"],
          mesaj: "Taşı kuyunun karanlığına bıraktın. Dipten hafif, hayal kırıklığına uğramış bir uğultu yükseldi, sonra hiç. İçin rahatladı.",
          detay: "Bazı sırlar açığa çıkmadan gömülmeyi hak ediyor.",
        },
        basarisizSonuc: {
          etiket_sil: ["esya:fisildayan_tas"],
          mutluluk: -5,
          mesaj: "Taşı attın ama kuyudan yükselen o son fısıltıyı -adını biliyordu- hiç unutamayacaksın.",
        },
      },
      {
        metin: "Sevdiğin birinin adını gerçekten fısılda.",
        baseBasariSansi: 100,
        maxAhlak: 70,
        ipucu: "Karanlık ama etkili bir bahis — bedeli tam olarak belli değil",
        basariliSonuc: {
          para: 60,
          un: 25,
          ahlak: -20,
          etiket_sil: ["esya:fisildayan_tas"],
          mesaj: "Adı fısıldadığın an taş buz gibi soğudu, sonra elinde toza dönüştü. Ertesi hafta işlerin inanılmaz bir şekilde açıldı — ama o ismi verdiğin kişiye her baktığında için ürperiyor.",
          detay: "Şansın nereden geldiğini asla kimseye anlatamayacaksın.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "gizem_eski_ayna",
    kategori: "sosyal",
    gizemli: true,
    agirlik: 0.25,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Terk Edilmiş Konağın Malları",
    metin:
      "Şehir dışındaki terk edilmiş bir konağın eşyaları açık arttırmayla satılıyor. Çoğu eşya küf kokuyor ama köşede duran, gümüş kaplamalı bir ayna dikkatini çekiyor. Tuhaf olan şu: içinde yansıyan oda, durduğun yerden biraz farklı görünüyor.",
    secenekler: [
      {
        metin: "Aynayı satın al.",
        baseBasariSansi: 90,
        maliyet: 15,
        ipucu: "Ucuz değil ama içindeki his paha biçilemez (Envantere eklenir)",
        basariliSonuc: {
          para: -15,
          etiket_ekle: ["esya:eski_ayna"],
          mesaj: "Aynayı evine taşıdın. Duvara astığın an, içindeki yansıma bir an gecikip sana yetişti — sanki ayna da senin gibi ilk kez bu odayı görüyordu.",
          detay: "Belki yorgunluktandır, belki değil.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Aynayı aldın ama açık arttırma hilesiyle beklediğinden fazla ödedin.",
        },
      },
      {
        metin: "Kalabalığın karışıklığından yararlanıp aynayı gizlice al.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Bedavaya esrarengiz bir eşya ya da tutuklanma",
        basariliSonuc: {
          ahlak: -10,
          etiket_ekle: ["esya:eski_ayna"],
          mesaj: "Kimse fark etmeden aynayı bir örtüye sarıp uzaklaştın. Ellerin, açıklayamadığın bir sebeple soğumuştu.",
        },
        basarisizSonuc: {
          para: -15,
          un: -10,
          mesaj: "Görevliler seni suçüstü yakaladı; hem cezayı ödedin hem de mahallede adın 'hırsız' diye anılmaya başladı.",
        },
      },
      {
        metin: "Tuhaf bir eşya bu, ilgilenme.",
        baseBasariSansi: 92,
        ipucu: "Güvenli ama o yansımayı unutman zor olabilir",
        basariliSonuc: { mesaj: "Aynaya son bir bakış attın ve arkanı döndün. İçindeki yansımanın da -bir an için- arkasını döndüğünü fark etmedin bile." },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Uzaklaşırken bile o bir anlık gecikmeyi düşünmeden edemedin. Bazı geceler, gözlerini kapatınca hâlâ o odayı görüyorsun.",
          detay: "Görmezden gelinen şeyler bazen peşinden geliyor.",
        },
      },
    ],
  },
  {
    id: "gizem_eski_ayna_yansima",
    kategori: "sosyal",
    gerekliEtiketler: ["esya:eski_ayna"],
    gizemli: true,
    ton: "agir",
    agirlik: 0.6,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yanlış Yansıma",
    metin:
      "Gece bir su içmek için kalktın, aynanın önünden geçerken durdun. Yansımandaki sen, sen değildin — bir an gecikerek, farklı bir ifadeyle sana bakıyordu. Sonra her şey normale döndü.",
    secenekler: [
      {
        metin: "Aynaya yaklaş, dikkatlice incele.",
        baseBasariSansi: 65,
        ipucu: "Cesaret bir şey öğretebilir ama korkunç da olabilir",
        basariliSonuc: {
          kultur: 8,
          mutluluk: -5,
          mesaj: "Yüzünü camdan santimlerce uzağa götürdün. Yansıman gülümsedi — sen gülümsemeden. Ama tam o an geri çekildiğinde her şey yeniden senindi. Ne gördüğünü tam açıklayamıyorsun ama artık dünyaya biraz daha farklı bakıyorsun.",
          detay: "Bazı deneyimler seni değiştirir, açıklayamasan bile.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -15,
          mesaj: "Camda beliren şey sana doğru bir el uzattı! Çığlık atarak geri sıçradın, aynayı düşürecektin neredeyse. Günlerce gözlerini kapatınca o eli görüyorsun.",
        },
      },
      {
        metin: "Aynayı bir bezle ört, sabaha kadar açma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Aynayı örttün ve sırtını dönüp yattın. Sabah her şey normaldi, ya da öyle görünüyordu.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Örttün ama örtünün altından hafif bir tıkırtı duyduğunu yemin edebilirdin.",
        },
      },
    ],
  },
  {
    id: "gizem_eski_ayna_kehanet",
    kategori: "sosyal",
    gerekliEtiketler: ["esya:eski_ayna"],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Aynadaki Uyarı",
    metin:
      "Aynaya baktığında kendini görmedin: Tanıdık bir sokakta, üzerine devrilmek üzere olan bir yük arabası gördün, sonra her şey karardı. Görüntü o kadar netti ki hâlâ tüylerin diken diken.",
    secenekler: [
      {
        metin: "Gördüğün sokaktan birkaç gün uzak dur.",
        baseBasariSansi: 85,
        ipucu: "Belki paranoya, belki hayatını kurtaracak bir sezgi",
        basariliSonuc: {
          mutluluk: -5,
          mesaj: "Yolunu değiştirdin. Üç gün sonra o sokakta gerçekten bir yük arabası devrildiğini, birinin ağır yaralandığını duydun. Ayna yalan söylemiyormuş.",
          detay: "Şimdi ona her baktığında hem minnettar hem tedirginsin.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Yolunu değiştirdin ama hiçbir şey olmadı; belki sadece kötü bir rüyaydı, kendini biraz aptal hissettin.",
        },
      },
      {
        metin: "Boş ver, kadere karışma; her zamanki gibi yaşa.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mesaj: "Görüntüyü unutmaya çalıştın. Günler sıradan geçti, ayna bir daha o sokaktan bahsetmedi.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 8,
          mesaj: "Tam o sokaktan geçerken bir yük arabası devrildi! Son anda kendini attın ama yine de ağır yaralandın. Ayna seni uyarmıştı.",
        },
      },
    ],
  },

  // ============================================================
  // AİLE VE MİRAS OLAYLARI
  // ============================================================
  {
    id: "aile_tuccar_musteri",
    kategori: "ticaret",
    gerekliEtiketler: ["aile:tuccar"],
    gorsel: "🤝",
    baslik: "Babanın Eski Dostu",
    metin:
      "Çok yaşlı, acımasız ve inanılmaz zengin bir tüccar geldi. 'Babanla yıllarca iş yaptık. Bu devasa ticaret ağını sana bırakabilirim, ama tek bir şartla: Çocuğunu benim sakat ve zalim varisimle evlendireceksin.'",
    secenekler: [
      {
        metin: "Evladımın hayatı satılık değil! Teklifi reddet.",
        baseBasariSansi: 95,
        ipucu: "Ahlaki zafer ama devasa bir serveti elinin tersiyle itersin",
        basariliSonuc: {
          ahlak: 30,
          mutluluk: 15,
          un: 10,
          mesaj: "Yaşlı adamı dükkânından kovdun. Çocuğun sana yaşlı gözlerle sarıldı. Zengin değilsin ama harika bir ebeveynsin."
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          mesaj: "Adam çok sinirlendi ve babanın tüm eski ortaklarını sana düşman etti. Ticaretin ağır yara aldı."
        }
      },
      {
        metin: "İş iştir. Çocuğunu zorla evlendir ve ağı al.",
        baseBasariSansi: 80,
        maliyet: 10,
        gerekliEtiketler: ["cocuk_var"],
        ipucu: "Sonsuz para, kalıcı bir maaş artışı ama aileni parçalarsın",
        basariliSonuc: {
          para: 70,
          maas_carpani: 1.4,
          ahlak: -40,
          mutluluk: -35,
          mesaj: "Sözleşmeyi imzaladın. Ticaret krallığının başına geçtin. Çocuğun düğün günü yüzüne bile bakmadı ve seni hayatından sildi."
        },
        basarisizSonuc: {
          para: -15,
          ahlak: -30,
          mesaj: "Çocuğun düğün gecesi evden kaçtı! Hem ticareti alamadın hem de evladını sonsuza dek kaybettin."
        }
      },
    ],
  },
  {
    id: "aile_soylu_davet",
    kategori: "siyaset",
    gerekliEtiketler: ["aile:soylu"],
    gorsel: "👑",
    baslik: "Soylu Kanın Sınavı",
    metin:
      "Akraban olan lordlar meclisi seni gizli bir toplantıya çağırdı. Köylülere karşı yeni ve çok acımasız bir vergi planlıyorlar. Kan bağının yanında mı duracaksın, yoksa halkın mı?",
    secenekler: [
      {
        metin: "Kanımdan olanları satmam! Vergiyi onaylayın.",
        baseBasariSansi: 80,
        ipucu: "Soylular arasında müthiş güç, halk seni linç etmek isteyebilir",
        basariliSonuc: {
          para: 40,
          un: 20,
          ahlak: -30,
          etiket_ekle: ["soylu_meclisi", "itibar:zalim_soylu"],
          mesaj: "Mührünü bastın. Ailenin en saygın ferdi oldun. Köylüler yollarda açlıktan kırılırken senin şatona altınlar yağıyor."
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -20,
          saglik: -15,
          mesaj: "Köylüler kararı duyunca isyan etti ve arabanı taşladılar. Kan revan içinde zor kaçtın."
        },
      },
      {
        metin: "Bu zorbalıktır! Karşı çık ve halkı koru.",
        baseBasariSansi: 45,
        ipucu: "Halkın sevgisi ama ailenin ihanetine uğrama riski",
        basariliSonuc: {
          un: 30,
          ahlak: 35,
          para: -20,
          etiket_ekle: ["halkin_adami"],
          etiket_sil: ["soylu_kani"],
          mesaj: "Masayı devirdin! Soyluluk unvanını elinden aldılar ama sokakta yürürken binlerce köylü senin için dua ediyor."
        },
        basarisizSonuc: {
          un: -20,
          para: -35,
          ahlak: 15,
          etiket_sil: ["soylu_kani"],
          mesaj: "Ailen seni döverek meclisten attı, mallarına el koydular. Halk ise senin ne yaptığını hiç öğrenmedi."
        },
      },
    ],
  },
  {
    id: "aile_asker_yoldas",
    kategori: "savas",
    gerekliEtiketler: ["aile:asker"],
    gorsel: "🎖️",
    baslik: "Babanın Kanlı Kılıcı",
    metin:
      "Kışlada yüzü yaralı, yaşlı bir subay seni köşeye çekti: 'Babanla aynı siperdeydik. O yiğitçe öldü, seni güvende tutmamı isterdi.' Seni saray muhafızlığına geçirmeyi teklif ediyor.",
    secenekler: [
      {
        metin: "Saray Muhafızı ol. Sıcak yatak ve güvenli maaş.",
        baseBasariSansi: 70,
        ipucu: "Güvenlik, para ama askeri onur kaybı",
        basariliSonuc: {
          para: 25,
          saglik: 10,
          maas_carpani: 1.15,
          etiket_ekle: ["muhafiz_birligi"],
          mesaj: "Babanın adını kullanarak saraya kapağı attın. Arkadaşların çamurda savaşırken sen şarap içiyorsun."
        },
        basarisizSonuc: {
          un: -20,
          mesaj: "Saray komutanı senin bir torpilli olduğunu anlayıp seni en kötü lağım nöbetlerine verdi. İtibarın sıfırlandı."
        },
      },
      {
        metin: "Babanın eski alayına (Ölüm Birliği) geçmek için diret.",
        baseBasariSansi: 65,
        ipucu: "Yüksek ün, müthiş aidiyet hissi ama aşırı yüksek ölüm riski",
        basariliSonuc: {
          un: 35,
          ahlak: 15,
          saglik: -15,
          etiket_ekle: ["baba_alayi"],
          mesaj: "Ölüm birliğine katıldın! Askerler seni görünce babanın ruhunun geri döndüğünü söylediler. Saygınlığın efsanevi boyutlarda."
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 15,
          mesaj: "Babanın gölgesinden çıkmak için kendini çok zorladın ve pusuya düştün. Cesaretin az kalsın canına mal oluyordu."
        },
      },
    ],
  },
  {
    id: "aile_kole_gecmis",
    kategori: "sosyal",
    gerekliEtiketler: ["aile:kole"],
    gorsel: "⛓️",
    baslik: "Zincirlerin İzi",
    metin:
      "Babanın eski sahibi olan zalim efendinin oğlu seni bir meyhanede gördü. 'Bizim kölenin çocuğu değil mi bu?' diyerek kahkaha atıyor ve sana ayağını öpmen için bir kese altın atıyor.",
    secenekler: [
      {
        metin: "Altını al ve ayağını öp. Gurur karın doyurmaz.",
        baseBasariSansi: 85,
        ipucu: "İğrenç bir aşağılanma ama sağlam bir para",
        basariliSonuc: {
          para: 40,
          ahlak: -25,
          un: -25,
          mutluluk: -30,
          mesaj: "Ayağını öptün. Meyhanedeki herkesin önünde aşağılandın. Kesen doldu ama ruhun o zemin de ezildi kaldı."
        },
        basarisizSonuc: {
          para: 10,
          ahlak: -30,
          un: -35,
          mesaj: "Eğildiğinde yüzüne tekme attı! Hem altını tam alamadın hem de itibarın yerle bir oldu."
        },
      },
      {
        metin: "Masayı devir ve ona köle olmadığını göster!",
        baseBasariSansi: 55,
        ipucu: "Onurunu korursun, kavgada yaralanma riski var",
        basariliSonuc: {
          un: 25,
          ahlak: 20,
          mutluluk: 15,
          etiket_ekle: ["gecmisiyle_barisik"],
          mesaj: "Suratına attığın yumruk adamı yere serdi. Kalabalık senin cesaretine hayran kaldı. Artık senin geçmişinle kimse dalga geçemez!"
        },
        basarisizSonuc: {
          saglik: -25,
          un: 10,
          mesaj: "Adamın korumaları seni bayılana kadar dövdü. Ama herkes senin boyun eğmeyen bir aslan olduğunu anladı."
        },
      },
    ],
  },
  {
    id: "aile_isci_grev",
    kategori: "siyaset",
    gerekliEtiketler: ["aile:isci"],
    gorsel: "✊",
    baslik: "İsyan Ateşi",
    metin:
      "Babanın yıllarca kan ter içinde çalıştığı ve hastalanıp öldüğü fabrikada işçiler ayaklandı. Fabrikayı yakmak üzereler. Sendika seni liderleri olarak görmek istiyor.",
    secenekler: [
      {
        metin: "Meşaleyi eline al! 'Babama yaptıklarınızı ödeyeceksiniz!'",
        baseBasariSansi: 55,
        ipucu: "İşçi sınıfı seni efsane yapar, devlet ve patronlar seni hedefe koyar",
        basariliSonuc: {
          un: 35,
          ahlak: 20,
          para: -20,
          etiket_ekle: ["isci_onderi", "itibar:devrimci"],
          mesaj: "Grevi bir devrime çevirdin! Patronlar diz çöktü. Babanın intikamını aldın ve halkın idolü oldun."
        },
        basarisizSonuc: {
          un: -15,
          para: -30,
          saglik: -25,
          ahlak: 20,
          olum_sansi: 10,
          etiket_ekle: ["hapiste"],
          mesaj: "Jandarma acımadı. Coplar ve atlar altında kaldınız. Vatan haini damgası yiyip zindana atıldın."
        },
      },
      {
        metin: "Patronla gizlice görüşüp isyanı içeriden sat.",
        baseBasariSansi: 70,
        maxAhlak: 45,
        ipucu: "Sadece ahlaksızlara: Patron seni zengin eder, işçiler seni lanetler",
        basariliSonuc: {
          para: 60,
          un: -25,
          ahlak: -40,
          maas_carpani: 1.3,
          mesaj: "Liderlerin isimlerini patrona verdin. İsyan bastırıldı. Patron seni müdür yaptı ama kendi mahallen artık senin yüzüne tükürüyor."
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "İşçiler seni patronun odasından çıkarken gördü! Linç edilmekten muhafızlar sayesinde saniyelerle kurtuldun."
        },
      },
    ],
  },
  {
    id: "aile_cellat_soyad",
    kategori: "sosyal",
    gerekliEtiketler: ["aile:cellat"],
    gorsel: "🪓",
    baslik: "Koparan Bıçağın Oğlu",
    metin:
      "Aşkla sevdiğin insanın ailesi geçmişini öğrendi: 'Biz kızımızı/oğlumuzu bir cellat tohumuna vermeyiz!' dediler. Ya soyadını inkar edecek, ya da onunla yaşayacaksın.",
    secenekler: [
      {
        metin: "Babamdan utanıyorum! Soyadımı değiştiriyorum de.",
        baseBasariSansi: 65,
        ipucu: "Kabul edilirsin ama köklerine büyük ihanet",
        basariliSonuc: {
          un: 10,
          ahlak: -25,
          mutluluk: -15,
          etiket_sil: ["korkulan_soyad"],
          mesaj: "Geçmişini reddettin. Evlendin ama babanın o üzgün gözleri ve yalan üzerine kurduğun bu hayat seni yiyip bitiriyor."
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -15,
          mesaj: "Hem reddettin hem de sana inanmadılar. 'Kanında ölüm var' diyerek seni kapı dışarı ettiler."
        },
      },
      {
        metin: "Korkularınızı kullanacağım! Zindancı başı ol.",
        baseBasariSansi: 60,
        ipucu: "Gaddar bir itibar ve yüksek devlet maaşı",
        basariliSonuc: {
          para: 45,
          un: -20,
          ahlak: -30,
          maas_carpani: 1.3,
          etiket_ekle: ["devlet_isi", "itibar:korkulan_cellat"],
          mesaj: "Aşkı boş verdin. Devletin en korkulan zindancısı oldun. Sana kız vermeyen o aile şimdi senden titreyerek korkuyor."
        },
        basarisizSonuc: {
          un: -30,
          para: -10,
          mesaj: "Korkutmaya çalıştın ama asilzadeler senin gibi bir ayak takımını anında ezdi. İşsiz ve yalnız kaldın."
        },
      },
    ],
  },
  {
    id: "aile_hekim_hasta",
    kategori: "saglik",
    gerekliEtiketler: ["aile:hekim"],
    gorsel: "🌿",
    baslik: "Şifanın Bedeli",
    metin:
      "Bölgede salgın patladı. Kendi çocuğun/eşin ateşler içinde, aynı anda mahallenin yetimhanesindeki 10 çocuk da can çekişiyor. Elindeki annenden kalma otlar sadece 1 kişi ya da 1 grup için yeterli.",
    secenekler: [
      {
        metin: "Sadece kendi aileme (çocuğuma) ver, diğerleri umrumda değil.",
        baseBasariSansi: 90,
        gerekliEtiketler: ["cocuk_var"],
        ipucu: "Ailen yaşar, ancak vicdanın sonsuza dek sızlar",
        basariliSonuc: {
          saglik: 15,
          mutluluk: 10,
          ahlak: -30,
          un: -20,
          mesaj: "Kendi aileni kurtardın. Sabah olduğunda yetimhaneden 10 küçük ceset çıkarılırken sen pencereni sıkıca kapattın."
        },
        basarisizSonuc: {
          saglik: 5,
          ahlak: -20,
          mesaj: "İlaç ailene tam etki etmedi ama en azından hayattalar. O ölen çocukların ahı ise üzerinde."
        }
      },
      {
        metin: "Bu otlar herkesin hakkı! Yetimhaneye git.",
        baseBasariSansi: 50,
        ipucu: "Aileni riske atarsın ama bir kahramana/ermişe dönüşürsün",
        basariliSonuc: {
          un: 35,
          ahlak: 40,
          saglik: -15,
          etiket_ekle: ["sifaci_namı"],
          mesaj: "Yetimleri kurtardın! Allah'ın bir lütfu olarak kendi çocuğun da bağışıklık kazandı. Şehir senin adına heykel dikecek kadar minnettar."
        },
        basarisizSonuc: {
          cocuk_kaybet: true,
          un: 20,
          ahlak: 25,
          mutluluk: -40,
          etiket_ekle: ["kalici:evlat_acisi"],
          mesaj: "Yetimler yaşadı... Ama eve döndüğünde kendi evladının çoktan soğuduğunu gördün. Kahraman oldun ama ruhun öldü."
        }
      }
    ],
  },
  {
    id: "aile_kacakci_teklif",
    kategori: "ticaret",
    gerekliEtiketler: ["aile:kacakci"],
    gorsel: "🌑",
    baslik: "Kanlı Altın",
    metin:
      "Babanın eski yeraltı ortakları geldi. Sarayın kasasından çaldıkları kraliyet mücevherlerini şehir dışına kaçırman için senin tünellerini kullanmak istiyorlar.",
    secenekler: [
      {
        metin: "Mücevherleri kaçır! Bu babamın mirası.",
        baseBasariSansi: 50,
        ipucu: "Tarihi bir zenginlik ya da zindan/idam",
        basariliSonuc: {
          para: 80,
          ahlak: -35,
          un: -15,
          etiket_ekle: ["kacakcilik_agi", "sir:saray_hirsizi"],
          mesaj: "Mücevherleri kaçırdın! Kral deliye döndü ama sen bir gecede akıl almaz bir zenginliğe ulaştın."
        },
        basarisizSonuc: {
          para: -40,
          un: -30,
          saglik: -20,
          olum_sansi: 20,
          etiket_ekle: ["hapiste"],
          mesaj: "İhbar edildin! Muhafızlar tüneli bastı. Hem servetini aldılar hem de seni zindanlara tıktılar."
        }
      },
      {
        metin: "Ben babam gibi bir suçlu olmayacağım! İhbar et.",
        baseBasariSansi: 65,
        ipucu: "Temiz ve dürüst yaşam, tehlikeli bir yeraltı düşmanı",
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: 25,
          etiket_sil: ["karanlik_baglantilar"],
          mesaj: "Adamları krala sattın! Kral sana ödül verdi ve ailenin adını temizledi."
        },
        basarisizSonuc: {
          saglik: -35,
          ahlak: 15,
          olum_sansi: 15,
          mesaj: "İhbarını öğrendiler. Gece evini basıp seni kılıçtan geçirdiler. Dürüst olmanın bedelini kanla ödedin."
        }
      }
    ]
  },
  {
    id: "aile_ciftci_kitlik",
    kategori: "saglik",
    gerekliEtiketler: ["aile:ciftci"],
    gorsel: "🌾",
    baslik: "Köyden Gelen Çığlık",
    metin:
      "Köyünden mektup var: Kıtlık vurdu, kardeşlerin ve annen ağaç kabuğu yiyor. Senden tüm maaşını ve birikimini göndermeni istiyorlar. Ama senin de şehirde bakman gereken bir ailen var.",
    secenekler: [
      {
        metin: "Kendi çocuğumun/eşimin rızkını kesip köye gönder.",
        baseBasariSansi: 85,
        maliyet: 30,
        gerekliEtiketler: ["cocuk_var"],
        ipucu: "Vicdanın köyde rahat eder, evdeki çocukların ise sefalet çeker",
        basariliSonuc: {
          para: -30,
          ahlak: 35,
          un: 15,
          mutluluk: -15,
          saglik: -10,
          etiket_ekle: ["koy_destegi"],
          mesaj: "Köydeki kardeşlerin senin paranla hayatta kaldı. Ancak kendi çocuğun haftalarca aç uyudu ve sana nefretle baktı."
        },
        basarisizSonuc: {
          para: -30,
          mutluluk: -25,
          saglik: -15,
          mesaj: "Parayı gönderdin ama yolda haydutlar kesti. Hem kendi ailen aç kaldı hem de köydekiler yardımsız öldü."
        }
      },
      {
        metin: "Evim burası. Köydekiler başının çaresine baksın.",
        baseBasariSansi: 100,
        ipucu: "Ailen güvende kalır, köklerin kopar",
        basariliSonuc: {
          para: 5,
          ahlak: -30,
          mutluluk: -10,
          mesaj: "Paranı kendine sakladın. Kendi çocukların tok uyudu. Aylar sonra köyden gelen tek haber annenin öldüğü oldu."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
    ],
  },
  {
    id: "rusvet_memur",
    kategori: "siyaset",
    gorsel: "🪙",
    agirlik: 0.6,
    baslik: "Mühür ve Kese",
    metin:
      "İşin için hayati olan ruhsat haftalardır masada bekliyor. Şişman memur, 'Buralar hep eksik, belki bir kese altın bu eksikleri tamamlar' diyerek sinsi sinsi sana gülümsüyor.",
    secenekler: [
      {
        metin: "Lanetli Yüzüğü rüşvet olarak ver.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:olunun_yuzugu"],
        ipucu: "Gizli Envanter: Hem ruhsatı al hem de memurdan intikam al",
        basariliSonuc: {
          etiket_sil: ["envanter:olunun_yuzugu"],
          para: 10,
          un: 10,
          mesaj: "Tabuttan aşırdığın o soğuk yüzüğü memura verdin. Adam sevinçle mührü bastı. Üç gün sonra memurun aklını kaçırıp kendini nehre attığını duydun."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "İstediğini ver, sistemi besle.",
        baseBasariSansi: 75,
        maliyet: 18,
        ipucu: "Hızlı çözüm, ahlaki düşüş",
        basariliSonuc: {
          para: -18,
          ahlak: -20,
          maas_carpani: 1.12,
          mesaj: "Altınları aldı ve saniyeler içinde işini halletti. Artık bu bozuk düzenin sadık bir parçasısın."
        },
        basarisizSonuc: {
          para: -18,
          un: -25,
          ahlak: -15,
          mesaj: "Şanssızlık! Odaya tam o an müfettiş girdi. Rüşvet vermekten ceza yedin ve ruhsat iptal edildi."
        },
      },
      {
        metin: "Ben rüşvet vermem! Üst makama şikayet et.",
        baseBasariSansi: 45,
        ipucu: "Büyük saygınlık ama sistemi karşına alma riski",
        basariliSonuc: {
          un: 25,
          ahlak: 25,
          para: -5,
          etiket_ekle: ["durust_bilinen"],
          mesaj: "Memuru şikayet edip kovdurttun! İşin halloldu ve dürüst esnaf seni omuzlarda taşıdı."
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          ahlak: 15,
          mesaj: "Şikayet ettiğin kişi memurun dayısı çıktı! Dosyan sümen altı edildi ve aylar boyunca iş yapamadın."
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
    metin:
      "Artık sözü geçen biri olduğun için ilk kez rüşvet teklif edilen taraf sensin. Bir müteahhit, sen bir yere iki kelime edersen ihalenin kendisine kalacağını söylüyor. Kese masada.",
    secenekler: [
      {
        metin: "Keseyi al, iki kelimeyi et.",
        baseBasariSansi: 70,
        ipucu: "Büyük ve kolay para, yakalanma ve vicdan riski",
        basariliSonuc: {
          para: 50,
          ahlak: -28,
          etiket_ekle: ["rusvet_agi"],
          mesaj: "İhale ona kaldı, kese sana. Kimse bir şey sormadı.",
          detay:
            "Ne kadar kolay olduğu seni ürküttü. Bir hafta sonra ikinci bir kese geldi ve sen artık 'hayır' demenin ne zaman imkânsızlaştığını düşünüyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          un: -30,
          ahlak: -22,
          mesaj: "Müteahhit yakalandı ve ilk iş senin adını verdi.",
          detay:
            "İtibarın çöktü. Yıllarca kurduğun ne varsa bir ifadeyle dağıldı; en acısı da doğru olduğu için itiraz bile edememen.",
        },
      },
      {
        metin: "Reddet ve teklifi kayda geçir.",
        baseBasariSansi: 55,
        ipucu: "Temiz kalırsın, güçlü bir düşman kazanırsın",
        basariliSonuc: {
          un: 24,
          ahlak: 25,
          etiket_ekle: ["durust_bilinen"],
          mesaj: "Teklifi belgeledin; müteahhit yargılandı, senin adın temizlendi.",
          detay:
            "Artık dürüstlüğün bir sermaye. İnsanlar sana hassas işleri emanet ediyor. Bir de arkanda, seni asla affetmeyecek bir adam var.",
        },
        basarisizSonuc: {
          para: -22,
          un: -12,
          ahlak: 20,
          mesaj: "Reddettin; müteahhit önce iftira attı, sonra işlerini baltaladı.",
          detay:
            "Kimse teklifin varlığına inanmadı, herkes senin husumetine inandı. Doğru olanı yaptın ve bedelini tek başına ödüyorsun.",
        },
      },
      {
        metin: "Ne al ne reddet — belgelerle şantaj yapıp ihaleyi kendine al.",
        baseBasariSansi: 45,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Çok kurnazca ama tehlikeli",
        basariliSonuc: {
          para: 60,
          un: 15,
          ahlak: -30,
          mesaj: "Müteahhidi tehdit ederek çekilmesini sağladın ve ihaleyi bizzat sen aldın.",
          detay:
            "Rüşvet almadın, sadece zayıflığı paraya çevirdin. Artık bu oyunun kurallarını sen yazıyorsun.",
        },
        basarisizSonuc: {
          para: -25,
          un: -28,
          ahlak: -22,
          olum_sansi: 10,
          mesaj: "Müteahhit şantajına boyun eğmedi ve evine kiralık katiller gönderdi.",
          detay:
            "Kurnazlık oynamak isterken az kalsın canından oluyordun. Tüm bağlantıların kesildi.",
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
    metin:
      "Haksız yere açılmış bir davada sanıksın. Avukatın kulağına eğildi: 'Yargıcın kâtibiyle konuştum. Belli bir meblağ, belli bir karar demek. Ya da mahkemeye güvenip bekleyeceğiz.'",
    secenekler: [
      {
        metin: "Kâtibe ödeme yap, kararı garantiye al.",
        baseBasariSansi: 75,
        maliyet: 30,
        ipucu: "Beraat neredeyse kesin, pahalı ve kirli",
        basariliSonuc: {
          para: -30,
          ahlak: -20,
          mesaj: "Karar lehine çıktı; suçsuz olduğun zaten doğruydu ama bunu para ile aldın.",
          detay:
            "Haklıydın ve haklılığını satın almak zorunda kaldın. Adalete olan inancın o gün mahkeme salonunda kaldı.",
        },
        basarisizSonuc: {
          para: -30,
          un: -25,
          ahlak: -18,
          saglik: -10,
          mesaj: "Kâtip parayı aldı, yargıç haberdar değildi; hem para gitti hem ceza aldın.",
          detay:
            "Dolandırıldın ve şikâyet bile edemedin — çünkü şikâyet, rüşvet vermeye çalıştığını itiraf etmek olurdu.",
        },
      },
      {
        metin: "Mahkemeye güven, kendini savun.",
        baseBasariSansi: 50,
        ipucu: "Ücretsiz ve onurlu, sonucu belirsiz",
        basariliSonuc: {
          un: 20,
          ahlak: 20,
          mesaj: "Kendi savunmanı yaptın ve beraat ettin; salon seni alkışladı.",
          detay:
            "Yargıç kararında 'sanığın dürüstlüğü' diye bir cümle kullandı. O cümle şehirde seni yıllarca öne çıkaracak.",
        },
        basarisizSonuc: {
          para: -25,
          un: -18,
          saglik: -12,
          ahlak: 15,
          mesaj: "Suçsuzdun ama mahkûm oldun; birkaç ay hapis ve ağır para cezası.",
          detay:
            "Hapiste geçen aylar sağlığını ve işini bitirdi. Dışarı çıktığında dükkânın kapalıydı ve kimse seni işe almak istemedi.",
        },
      },
    ],
  },

  // ============================================================
  // ORTA ÇAĞ — ASKER
  // ============================================================
  {
    id: "oc_asker_sefer",
    kategori: "savas",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    minYas: 16,
    sureYilMin: 2,
    sureYilMax: 4,
    baslik: "Uzak Sefer",
    metin:
      "{bolge} beyi uzak topraklara sefer düzenliyor. Sefer yıllarca sürebilir; dönenler zengin, dönmeyenler ise sadece bir isim olur.",
    secenekler: [
      {
        metin: "Kara Kılıcı kuşanarak öncü birliğe liderlik et!",
        baseBasariSansi: 95,
        gerekliEtiketler: ["envanter:kara_kilic"],
        ipucu: "Gizli Envanter: Kılıcın gücü düşmanı ezer geçer ama ruhunu tüketir",
        basariliSonuc: {
          para: 60,
          un: 35,
          ahlak: -25,
          mutluluk: -10,
          etiket_ekle: ["itibar:korkulan_savasci"],
          mesaj: "Kara Kılıçla savaş meydanında fırtına gibi estin. Ganimetin en büyük payı senin oldu ama kılıcın fısıltıları rüyalarına girmeye başladı.",
          detay: "Askerlerin bile senden korkuyor."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Öncü birliğe yazıl, ganimetten büyük pay al.",
        baseBasariSansi: 50,
        ipucu: "Yüksek ganimet ve ün, yüksek ölüm riski",
        basariliSonuc: {
          para: 40,
          un: 25,
          ahlak: -15,
          saglik: -15,
          mesaj: "Öncü birlikte savaştın; ganimetin büyük payı senin oldu.",
          detay:
            "Ele geçirilen şehirde üç gün serbestlik verildi. Ne yaptığını kimseye anlatmadın, ama sandığın altınla doldu.",
        },
        basarisizSonuc: {
          saglik: -45,
          olum_sansi: 25,
          mesaj: "Öncü birlik pusuya düştü; ağır yaralı olarak geri getirildin.",
          detay:
            "Sana ilk müdahaleyi bir at bakıcısı yaptı, hekim iki gün sonra geldi. Yaşadığına şaşıran tek kişi sen değilsin.",
        },
      },
      {
        metin: "Beyin karargâh muhafızlığına talip ol.",
        baseBasariSansi: 60,
        minUn: 25,
        ipucu: "Güvenli ve prestijli, ganimet payı düşük",
        basariliSonuc: {
          para: 15,
          un: 18,
          saglik: -5,
          maas_carpani: 1.15,
          etiket_ekle: ["bey_yakini"],
          mesaj: "Beyin çadırında görev aldın; savaşı haritalar üzerinden izledin.",
          detay:
            "Beyin sofrasında oturan biri olmak, kılıç sallamaktan çok daha faydalı çıktı. Kimin kime ne söylediğini duyuyorsun ve bu bilgi altından değerli.",
        },
        basarisizSonuc: {
          un: -15,
          para: -8,
          mesaj: "Talebin 'kendini kayıran' diye yorumlandı, cephe hattına verildin.",
          detay:
            "Hem güvenli görevi alamadın hem de birlik içinde 'korkak' damgası yedin. En kötü ihtimal ikisinin birleşimiydi ve o oldu.",
        },
      },
      {
        metin: "Sefere gitme, geride kalıp kışla düzenini yönet.",
        baseBasariSansi: 70,
        ipucu: "Can güvenliği ve istikrar, ün ve ganimet kaybı",
        basariliSonuc: {
          para: 10,
          un: -15,
          saglik: 8,
          mesaj: "Geride kaldın; kışlanın düzenini tuttun ve sağ salim yaşadın.",
          detay:
            "Sefer dönüşü anlatılan hikayelerde senin adın geçmiyor. Ama dönmeyen otuz kişinin adı da geçmiyor ve sen buradasın.",
        },
        basarisizSonuc: {
          un: -22,
          para: -12,
          mesaj: "Geride kalmanı 'firar' sayan bir subay hakkında rapor yazdı.",
          detay:
            "Resmi izinle kalmıştın ama kayıtlarda bir not var. Sefere gitmemek, gitmeyenler arasında bile hoş karşılanmıyor.",
        },
      },
    ],
  },
  {
    id: "oc_asker_kusatma",
    kategori: "savas",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kuşatma Altında",
    metin:
      "{bolge} kuşatıldı. Erzak azalıyor, surlarda nöbet sıklaşıyor. Komutan şehrin içindeki erzak dağıtımını da denetlemeni istiyor.",
    secenekler: [
      {
        metin: "Erzağı adil dağıt, halkın yanında ol.",
        baseBasariSansi: 65,
        ipucu: "Halk desteği ve vicdan, kendi payından fedakârlık",
        basariliSonuc: {
          un: 22,
          ahlak: 25,
          saglik: -12,
          para: -8,
          etiket_ekle: ["halkin_adami"],
          mesaj: "Kimse aç kalmadı; kuşatma kalktığında şehir seni omuzlarda taşıdı.",
          detay:
            "Kendi payını da dağıttın ve kilo verdin. Ama o şehirde artık senin için kapısını açmayacak tek bir hane yok.",
        },
        basarisizSonuc: {
          saglik: -22,
          un: 10,
          ahlak: 20,
          mesaj: "Adil dağıttın ama erzak yetmedi; sen de aç kaldın ve zayıf düştün.",
          detay:
            "İyi niyet çuvalları doldurmuyor. İnsanlar açlıktan birbirine girdiğinde seni de suçladılar; onları doyurmak için kendi tasını boşaltmıştın.",
        },
      },
      {
        metin: "Erzağı askerlere öncelikli ver, savunmayı güçlendir.",
        baseBasariSansi: 70,
        ipucu: "Askeri başarı, halkın nefreti",
        basariliSonuc: {
          un: 18,
          para: 15,
          ahlak: -20,
          mesaj: "Askerler güçlü kaldı ve surlar düşmedi; şehir kurtuldu.",
          detay:
            "Kuşatma kalktığında komutan seni tebrik etti. Aynı hafta açlıktan ölen çocukların cenazesi kaldırıldı ve halk bunu unutmayacak.",
        },
        basarisizSonuc: {
          saglik: -25,
          un: -20,
          ahlak: -18,
          olum_sansi: 10,
          mesaj: "Halk erzak deposunu bastı; çıkan çatışmada yaralandın.",
          detay:
            "Kendi şehrinin insanlarına kılıç çektin. Sur düşmedi ama içerideki bir şey düştü ve bir daha yerine oturmadı.",
        },
      },
      {
        metin: "Bir kısmını karaborsaya aktarıp kendine servet yap.",
        baseBasariSansi: 50,
        ipucu: "Büyük servet, yakalanırsan idam",
        basariliSonuc: {
          para: 55,
          ahlak: -30,
          mesaj: "Erzağın bir kısmını gizlice sattın; kuşatma bitince zengindin.",
          detay:
            "Açlıktan ölen insanların parasıyla zengin oldun. Bunu kimse öğrenmedi ve sen de kimseye anlatmayacaksın.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj:
            "Karaborsa hesapları ortaya çıktı. Kuşatma altında erzak çalmak ihanet sayıldı; surların üzerinde asıldın.",
        },
      },
    ],
  },
  {
    id: "oc_asker_turnuva",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Şövalye Turnuvası",
    metin:
      "{bolge} beyi onuruna büyük bir turnuva düzenleniyor. Katılım ücreti yüksek, ödül daha yüksek ve tüm soylular tribünde olacak.",
    secenekler: [
      {
        metin: "Mızrak dövüşüne katıl, sahada ad yap.",
        baseBasariSansi: 50,
        maliyet: 15,
        ipucu: "Büyük ün ve ödül, sakatlanma riski",
        basariliSonuc: {
          para: 30,
          un: 28,
          saglik: -10,
          mesaj: "Finalde rakibini attan düşürdün; ödülü beyin elinden aldın.",
          detay:
            "Tribündeki soylular adını öğrendi. Sonraki haftalarda üç ayrı davet aldın; turnuva parasından çok, açtığı kapılar değerliydi.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -28,
          un: -8,
          olum_sansi: 8,
          durum_ekle: { id: "kirik_kaburga", ad: "Kırık Kaburga", tur: "gecici", kalan_tur: 2, tur_basi_saglik: -6 },
          mesaj: "İlk turda mızrak göğsüne geldi; kaburgaların kırıldı.",
          detay:
            "Katılım ücreti de gitti, aylarca nefes almak acıttı. Turnuvayı hatırlayanlar seni değil, seni deviren adamı hatırlıyor.",
        },
      },
      {
        metin: "Katılma, tribünde soylularla bağlantı kur.",
        baseBasariSansi: 65,
        ipucu: "Risksiz sosyal sermaye, sahada ün yok",
        basariliSonuc: {
          un: 15,
          para: -10,
          maas_carpani: 1.1,
          etiket_ekle: ["soylu_tanidik"],
          mesaj: "Turnuvayı izlerken üç soyluyla tanıştın; biri sana iş vaat etti.",
          detay:
            "Sahada ter dökenler alkış aldı, sen ise isim aldın. Uzun vadede hangisinin daha değerli olduğunu zamanla göreceksin.",
        },
        basarisizSonuc: {
          para: -12,
          un: -8,
          mesaj: "Soylular seninle ilgilenmedi; günü kalabalıkta kaybolarak geçirdin.",
          detay:
            "İyi giyinmek yetmiyormuş. Kimse sana ismini sormadı, sen de kimseye söyleyemedin; hem para hem gün gitti.",
        },
      },
      {
        metin: "Turnuvada bahis oyna, ringe girmeden kazanmayı dene.",
        baseBasariSansi: 45,
        maliyet: 12,
        ipucu: "Hızlı para, hızlı kayıp",
        basariliSonuc: {
          para: 35,
          ahlak: -8,
          mesaj: "Doğru şövalyeye oynadın; bahis kâhyası keseyi sayarken suratı asıldı.",
          detay:
            "Kimse kılıç sallamadan para kazanmanı hoş karşılamadı ama parayı da geri istemediler.",
        },
        basarisizSonuc: {
          para: -25,
          un: -8,
          ahlak: -8,
          mesaj: "Oynadığın şövalye ilk turda elendi; parayı kaybettin.",
          detay:
            "Bahis kâhyası 'bir daha gel' diye gülümsedi. Cebindeki boşluk, o gülümsemeden daha uzun süre kaldı.",
        },
      },
    ],
  },
  {
    id: "oc_asker_bey_emri",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    baslik: "Beyin Emri",
    metin:
      "Bey, vergisini ödemeyen bir köyü 'terbiye etmeni' emretti. Köyde silahlı kimse yok; sadece kıtlıktan perişan olmuş aileler var.",
    secenekler: [
      {
        metin: "Emri uygula, vergiyi zorla topla.",
        baseBasariSansi: 70,
        ipucu: "Beyin gözünde yükselirsin, vicdanın bedelini öder",
        basariliSonuc: {
          para: 25,
          un: 12,
          ahlak: -28,
          maas_carpani: 1.1,
          mesaj: "Vergiyi topladın; bey memnun kaldı ve seni sadık adamı ilan etti.",
          detay:
            "Bir ihtiyarın son keçisini alırken sana beddua etti. Beyin gözünde yükseldin ve o beddua da yanında geldi.",
        },
        basarisizSonuc: {
          saglik: -20,
          ahlak: -22,
          un: -12,
          olum_sansi: 8,
          mesaj: "Köylüler oraklarla direndi; kanlı bir arbede yaşandı.",
          detay:
            "Vergiyi de tam toplayamadın, üstelik iki adamını kaybettin. Bey 'beceriksiz' dedi, köylüler 'zalim'. İkisi de haklı.",
        },
      },
      {
        metin: "Vergiyi kendi kesenden ödeyip köyü kurtar.",
        baseBasariSansi: 75,
        maliyet: 25,
        ipucu: "Vicdan ve halk desteği, ağır mali yük",
        basariliSonuc: {
          para: -25,
          ahlak: 28,
          un: 15,
          etiket_ekle: ["halkin_adami"],
          mesaj: "Vergiyi kendin ödedin; köy hiçbir şey kaybetmedi, bey de bir şey öğrenmedi.",
          detay:
            "Köylüler ne olduğunu anladı ve hiçbir şey söylemedi. O köyden geçerken hâlâ sana ekmek ve ayran uzatıyorlar.",
        },
        basarisizSonuc: {
          para: -28,
          un: -12,
          ahlak: 22,
          mesaj: "Bey durumu öğrendi; 'emri çiğnedin' diye seni cezalandırdı.",
          detay:
            "Hem paran gitti hem rütben. Köy kurtuldu ve bunu bilen tek kişi sensin — bazen bu yeterli olmuyor.",
        },
      },
      {
        metin: "Köye haber uçur, sonra 'boş bulduk' raporu yaz.",
        baseBasariSansi: 50,
        ipucu: "Kurnaz çözüm, yalanın açığa çıkma riski",
        basariliSonuc: {
          ahlak: 18,
          un: 8,
          para: 5,
          etiket_ekle: ["kurnaz_asker"],
          mesaj: "Köylüler kaçtı, sen de 'köy boştu' diye yazdın; kimse sorgulamadı.",
          detay:
            "Kimse zarar görmedi ve sen bir şey kaybetmedin. Bu kadar temiz çözümler nadirdir ve bir daha bu kadar şanslı olmayabilirsin.",
        },
        basarisizSonuc: {
          un: -25,
          para: -18,
          ahlak: 12,
          mesaj: "Bir askerin dilini tutamadı; beyi hem yalanını hem sebebini öğrendi.",
          detay:
            "Yalan söylemek, emri reddetmekten daha ağır bir suç sayıldı. Rütben alındı ve artık hiçbir emirle görevlendirilmiyorsun.",
        },
      },
    ],
  },

  // ============================================================
  // ORTA ÇAĞ — TÜCCAR
  // ============================================================
  {
    id: "oc_tuccar_kervan",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kervan Yolu",
    metin:
      "Değerli mallarla dolu kervanını yola çıkarıyorsun. Üç güzergâh var: kısa ve tehlikeli çöl yolu, uzun ve güvenli dağ yolu, ya da paralı muhafızlarla ana yol.",
    secenekler: [
      {
        metin: "Çöl yolundan git — kısa, ucuz, tehlikeli.",
        baseBasariSansi: 50,
        ipucu: "En yüksek kâr, haydut ve susuzluk riski",
        basariliSonuc: {
          para: 45,
          saglik: -10,
          un: 10,
          mesaj: "Çölü on günde geçtin; mallar herkesten önce pazara ulaştı.",
          detay:
            "Fiyatlar tepe noktasındayken sen oradaydın. Susuzluktan dudakların çatladı ama kasan doldu.",
        },
        basarisizSonuc: {
          para: -35,
          saglik: -22,
          olum_sansi: 10,
          mesaj: "Haydutlar kervanı bastı; malları aldılar, seni yarı ölü bıraktılar.",
          detay:
            "Çölde iki gün susuz yürüdün. Bir Bedevi kafilesi bulmasa orada kalacaktın; mallar gitti, borç kaldı.",
        },
      },
      {
        metin: "Dağ yolundan git — uzun, yorucu, güvenli.",
        baseBasariSansi: 78,
        ipucu: "Düşük ama güvenli kâr, zaman kaybı",
        basariliSonuc: {
          para: 18,
          saglik: -5,
          mesaj: "Dağ yolu uzundu ama kervan eksiksiz vardı.",
          detay:
            "Vardığında en iyi fiyatlar geçmişti, yine de kâr ettin. Sıkıcı bir başarı da başarıdır.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -12,
          mesaj: "Erken kar yolu kapattı; mallar bekledi ve bir kısmı bozuldu.",
          detay:
            "Güvenli yol da bazen ihanet ediyor. Geçitte üç hafta mahsur kaldınız; bozulan mallar ve yenilen erzak zararı büyüttü.",
        },
      },
      {
        metin: "Muhafız tut, ana yoldan git.",
        baseBasariSansi: 82,
        maliyet: 18,
        ipucu: "En güvenli, muhafız ücreti kârı yer",
        basariliSonuc: {
          para: 25,
          un: 8,
          mesaj: "Muhafızlar sayesinde tek bir haydut bile yaklaşamadı.",
          detay:
            "Ücretlerini ödedikten sonra kalan kâr azdı ama kesindi. Muhafız kaptanı 'bir dahakine indirim' dedi ve bu da bir bağlantı.",
        },
        basarisizSonuc: {
          para: -20,
          un: -10,
          mesaj: "Tuttuğun muhafızlar haydutlarla anlaşmıştı; malları paylaştılar.",
          detay:
            "Kendi koruman seni soydu. Bunu kimseye anlatamıyorsun çünkü 'muhafızını bile seçemeyen tüccar' damgası ticaretini bitirir.",
        },
      },
    ],
  },
  {
    id: "oc_tuccar_lonca",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    minYas: 18,
    gorsel: "⚜️",
    baslik: "Lonca Üyeliği",
    metin:
      "Şehrin tüccar loncası seni üyeliğe çağırdı. Üyelik pahalı ve lonca kurallarına uymayı gerektiriyor; ama üye olmayanlar büyük ihalelere giremiyor.",
    secenekler: [
      {
        metin: "Üye ol, lonca kurallarına uy.",
        baseBasariSansi: 75,
        maliyet: 25,
        ipucu: "Kalıcı gelir artışı ve koruma, bağımsızlığını kaybedersin",
        basariliSonuc: {
          para: -25,
          un: 20,
          maas_carpani: 1.25,
          etiket_ekle: ["lonca_uyesi"],
          mesaj: "Loncaya kabul edildin; artık büyük ihalelere girebiliyorsun.",
          detay:
            "Lonca fiyatları belirliyor, kimin nerede satacağına karar veriyor. Kazancın arttı, özgürlüğün azaldı ve bu takas çoğu tüccarın yaptığı takas.",
        },
        basarisizSonuc: {
          para: -25,
          un: -12,
          mesaj: "Aidatı ödedin ama eski üyeler seni 'sonradan görme' diye dışladı.",
          detay:
            "Toplantılara çağrılıyorsun ama kararlar sen gelmeden alınmış oluyor. Aidatı ödemeye devam ediyorsun çünkü çıkmak daha kötü görünecek.",
        },
      },
      {
        metin: "Üye olma, bağımsız ve kuralsız çalış.",
        baseBasariSansi: 60,
        ipucu: "Serbest fiyat ve esneklik, loncanın düşmanlığı",
        basariliSonuc: {
          para: 30,
          un: -10,
          ahlak: -8,
          etiket_ekle: ["bagimsiz_tuccar"],
          mesaj: "Lonca fiyatlarının altına girdin; müşteriler akın etti.",
          detay:
            "Loncanın kızgınlığı umurunda değil çünkü müşteri kimin ucuz sattığına bakıyor. Ama büyük ihalelere hiç çağrılmıyorsun.",
        },
        basarisizSonuc: {
          para: -25,
          un: -18,
          mesaj: "Lonca tedarikçilere baskı yaptı; kimse sana mal satmıyor.",
          detay:
            "Tek başına ayakta durmak, herkes sana karşı birleşene kadar iyi bir fikirdi. Depoların boş, müşterilerin başka kapıda.",
        },
      },
    ],
  },
  {
    id: "oc_tuccar_sahte_mal",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    baslik: "Ucuz Tedarikçi",
    metin:
      "Bir tedarikçi, ipek diye satabileceğin ucuz kumaş öneriyor. Fark gözle zor anlaşılıyor ama uzman bir alıcı hemen fark eder.",
    secenekler: [
      {
        metin: "Al ve ipek diye sat.",
        baseBasariSansi: 55,
        ipucu: "Yüksek kâr, itibarını tehlikeye atar",
        basariliSonuc: {
          para: 45,
          ahlak: -25,
          mesaj: "Kimse farkı anlamadı; kâr marjın üç katına çıktı.",
          detay:
            "Aldığın parayı sayarken müşterinin 'ne güzel kumaş' dediğini hatırladın. Bunu bir daha yapacağını da biliyorsun.",
        },
        basarisizSonuc: {
          para: -25,
          un: -30,
          ahlak: -18,
          etiket_ekle: ["sahtekar_bilinen"],
          mesaj: "Bir soylunun terzisi kumaşı test etti; skandal pazara yayıldı.",
          detay:
            "Dükkânının önünde 'sahtekâr' yazılı bir levha asıldı. Yıllarca kazandığın güven bir kumaş topuyla gitti.",
        },
      },
      {
        metin: "Al ama gerçek adıyla, ucuz kumaş olarak sat.",
        baseBasariSansi: 80,
        ipucu: "Dürüst ve düşük kâr, yeni müşteri kitlesi",
        basariliSonuc: {
          para: 15,
          un: 15,
          ahlak: 15,
          maas_carpani: 1.08,
          mesaj: "Ucuz kumaşı dürüstçe sattın; fakir mahallelerden sürekli müşterin oldu.",
          detay:
            "Zenginler senden ipek almıyor ama esnaf ve zanaatkârlar hep sana geliyor. Küçük kârların toplamı büyük çıktı.",
        },
        basarisizSonuc: {
          para: -12,
          mesaj: "Ucuz kumaşa da alıcı çıkmadı; deponda kaldı.",
          detay:
            "Dürüstlük satış garantisi değilmiş. Malı zararına elden çıkardın ve o tedarikçiyle bir daha çalışmadın.",
        },
      },
      {
        metin: "Reddet, tedarikçiyi loncaya ihbar et.",
        baseBasariSansi: 55,
        ipucu: "Büyük itibar kazancı, tehlikeli düşman",
        basariliSonuc: {
          un: 25,
          ahlak: 22,
          para: -8,
          etiket_ekle: ["durust_bilinen"],
          mesaj: "İhbarın sayesinde sahtekârlık şebekesi çökertildi; adın temiz tüccara çıktı.",
          detay:
            "Lonca seni ödüllendirdi, esnaf tebrik etti. Bir de şehirden kaçmak zorunda kalan bir adam var ve o senin adını biliyor.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -15,
          un: 8,
          mesaj: "Tedarikçinin adamları gece dükkânını bastı.",
          detay:
            "Camlar kırıldı, mallar dağıtıldı, sen de dayak yedin. Lonca 'kanıt yetersiz' dedi ve dosyayı kapattı.",
        },
      },
    ],
  },

  // ============================================================
  // ORTA ÇAĞ — DİN ADAMI
  // ============================================================
  {
    id: "oc_din_bagis",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    baslik: "Zengin Bağışçı",
    metin:
      "Varlıklı bir aile, oğullarının işlediği bir suçun bağışlanması karşılığında cemaate büyük bir bağış öneriyor. Cemaatin çatısı akıyor ve kışlık odun parası yok.",
    secenekler: [
      {
        metin: "Bağışı al, aileyi bağışla.",
        baseBasariSansi: 72,
        ipucu: "Cemaate büyük kaynak, inancından ödün",
        basariliSonuc: {
          para: 40,
          ahlak: -22,
          un: 8,
          maas_carpani: 1.15,
          mesaj: "Bağış geldi; çatı onarıldı, cemaat kışı sıcak geçirdi.",
          detay:
            "Kimse çatının kimin parasıyla yapıldığını sormadı. Sen her yağmurda o çatıya bakıyor ve neyi sattığını hatırlıyorsun.",
        },
        basarisizSonuc: {
          para: 15,
          un: -25,
          ahlak: -20,
          mesaj: "Anlaşma duyuldu; cemaat 'günahı parayla sattın' diye ayaklandı.",
          detay:
            "Bağışın bir kısmı geldi ama itibarın gitti. Cemaatin yarısı başka bir mabede gitmeye başladı ve geri dönmediler.",
        },
      },
      {
        metin: "Bağışı reddet, oğlanı cemaate hizmete mahkûm et.",
        baseBasariSansi: 55,
        ipucu: "Ahlaki tutarlılık ve saygınlık, kaynak yok",
        basariliSonuc: {
          un: 25,
          ahlak: 28,
          para: -15,
          etiket_ekle: ["odun_vermeyen"],
          mesaj: "Oğlan bir yıl cemaate hizmet etti ve gerçekten değişti; herkes bunu gördü.",
          detay:
            "Çatı hâlâ akıyor ama cemaat sana 'satın alınamayan adam' diyor. Kışı üşüyerek geçirdiniz ve kimse şikâyet etmedi.",
        },
        basarisizSonuc: {
          para: -20,
          un: -10,
          ahlak: 22,
          mesaj: "Aile öfkeyle cemaatten ayrıldı ve diğer zenginleri de götürdü.",
          detay:
            "İlkelerinden ödün vermedin ve cemaat kışın odunsuz kaldı. Doğruluk bazen başkalarına da fatura çıkarıyor.",
        },
      },
      {
        metin: "Bağışı al ama aileden alenen özür dilemesini şart koş.",
        baseBasariSansi: 50,
        ipucu: "Hem kaynak hem adalet — ikisini de kaçırma riski",
        basariliSonuc: {
          para: 28,
          un: 22,
          ahlak: 15,
          mesaj: "Aile meydanda özür diledi ve bağışı yaptı; hem adalet hem kaynak.",
          detay:
            "Zor yolu seçtin ve işe yaradı. Cemaat hem çatısını onardı hem de adaletin satın alınamayacağını gördü.",
        },
        basarisizSonuc: {
          para: -12,
          un: -12,
          ahlak: 12,
          mesaj: "Aile alenen özür dilemeyi reddetti; ne bağış geldi ne adalet.",
          detay:
            "Fazla akıllı davrandın. İki tavşanı da kaçırdın: cemaat parasız, aile öfkeli, sen ortada kaldın.",
        },
      },
    ],
  },
  {
    id: "oc_din_sir",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    baslik: "Günah Çıkarma Sırrı",
    metin:
      "Günah çıkarma sırasında bir adam, beyi zehirlemeyi planladığını itiraf etti. Mesleğinin ilk kuralı bu sırrı saklamak; vicdanının ilk kuralı ise bir cinayeti önlemek.",
    secenekler: [
      {
        metin: "Sırrı sakla, adamı vazgeçirmeye çalış.",
        baseBasariSansi: 55,
        ipucu: "Mesleki dürüstlük, cinayeti önleyememe riski",
        basariliSonuc: {
          ahlak: 25,
          un: 12,
          mesaj: "Günlerce konuştun ve adamı vazgeçirdin; kimse bir şey öğrenmedi.",
          detay:
            "Ne bey öldü ne de bir sır ifşa oldu. Bunu bilen tek kişi sensin ve kimse sana teşekkür etmeyecek. Buna razısın.",
        },
        basarisizSonuc: {
          ahlak: -12,
          un: -22,
          mesaj: "Adam planını uyguladı; bey zehirlendi ve senin bildiğin ortaya çıktı.",
          detay:
            "Sırrı sakladın ve bir adam öldü. Mesleki kuralın seni korumadı; cemaat 'biliyordu ve sustu' diye fısıldıyor.",
        },
      },
      {
        metin: "Beyi uyar, sırrı çiğne.",
        baseBasariSansi: 65,
        ipucu: "Bir hayat kurtarır, cemaatin güvenini yıkar",
        basariliSonuc: {
          un: 22,
          para: 25,
          ahlak: -18,
          etiket_ekle: ["bey_yakini"],
          mesaj: "Suikast önlendi; bey seni ödüllendirdi ve yakınına aldı.",
          detay:
            "Bir hayat kurtardın ve karşılığında cemaatinin sana açılmasını kaybettin. Artık kimse günah çıkarmaya gelmiyor.",
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -20,
          para: -12,
          mesaj: "Bey sana inanmadı; sırrı çiğnediğin ise duyuldu.",
          detay:
            "Ne suikastı önledin ne de güveni koruyabildin. Cemaat kapılarını kapattı, bey ise seni 'iftiracı' saydı.",
        },
      },
      {
        metin: "Bilgiyi adamın kendisine karşı koz olarak kullan.",
        baseBasariSansi: 40,
        ipucu: "Kişisel kazanç, açığa çıkarsa ölüm",
        basariliSonuc: {
          para: 45,
          ahlak: -30,
          mesaj: "Adam susman için ne istersen verdi; hem sır kaldı hem kese doldu.",
          detay:
            "Onun korkusunu paraya çevirdin. Aylardır ilk kez rahat uyuyorsun ve bu rahatlığın nereden geldiğini düşünmemeye çalışıyorsun.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj:
            "Adam şantajı beklemiyordu ve sen onun kaybedecek bir şeyi olmadığını hesaplamadın. Bir gece kilisenin arkasında bulundun.",
        },
      },
    ],
  },

  // ============================================================
  // SANAYİ DEVRİMİ — ASKER
  // ============================================================
  {
    id: "sd_asker_ayaklanma",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    baslik: "İşçi Ayaklanması",
    metin:
      "{bolge} fabrika mahallesinde işçiler barikat kurdu. Komutanlığın müdahale emri verdi. Barikatın arkasında silahlı adam değil, ekmek isteyen aileler var.",
    secenekler: [
      {
        metin: "Emri uygula, barikatı dağıt.",
        baseBasariSansi: 65,
        ipucu: "Askeri kariyer ilerler, vicdanın ve halk desteği gider",
        basariliSonuc: {
          un: 18,
          para: 22,
          ahlak: -28,
          maas_carpani: 1.15,
          mesaj: "Barikat dağıtıldı; komutanlık seni terfi listesine yazdı.",
          detay:
            "O gün kaç kişinin yaralandığını raporda yazmadın. Terfi geldi, mahallede yüzüne tüküren bir kadın da geldi.",
        },
        basarisizSonuc: {
          saglik: -28,
          un: -15,
          ahlak: -20,
          olum_sansi: 10,
          mesaj: "İşçiler karşı koydu; kalabalıkta kaldın ve ağır dayak yedin.",
          detay:
            "Ne barikat dağıldı ne de sen kahraman oldun. Hastanede yatarken komutanlık 'operasyon başarısız' raporunu senin adınla yazdı.",
        },
      },
      {
        metin: "Müdahaleyi geciktir, arabuluculuk yapmayı dene.",
        baseBasariSansi: 50,
        ipucu: "Kan dökülmez, üstlerinle karşı karşıya gelirsin",
        basariliSonuc: {
          un: 20,
          ahlak: 25,
          para: -10,
          etiket_ekle: ["halkin_adami"],
          mesaj: "Görüşmeler sonuç verdi; barikat kansız kalktı, kimse ölmedi.",
          detay:
            "İşçiler seni omuzladı, komutanlık ise 'emirde gecikme' diye sicilinize not düştü. İkisini de hak ettin.",
        },
        basarisizSonuc: {
          un: -22,
          para: -15,
          ahlak: 18,
          mesaj: "Görüşme çöktü; hem geç kaldın hem de müdahaleyi başkası yaptı.",
          detay:
            "Kan yine döküldü ve sen sadece geciktirmiş oldun. Komutanlık seni görevden aldı, işçiler ise ismini bile bilmiyor.",
        },
      },
      {
        metin: "Hastalık bahanesiyle görevi bırak.",
        baseBasariSansi: 70,
        ipucu: "Ellerin temiz kalır, kariyerin durur",
        basariliSonuc: {
          ahlak: 12,
          un: -15,
          maas_carpani: 0.92,
          mesaj: "Raporlu oldun; müdahaleye katılmadın, kimse de üstelemedi.",
          detay:
            "Ellerini temiz tuttun ama başkasının kirletmesini izledin. Terfi listesinden çıkarıldın ve bunu umursamıyorsun — sanırsın.",
        },
        basarisizSonuc: {
          un: -25,
          para: -12,
          mesaj: "Raporun sahte bulundu; 'görevden kaçma' kaydı sicilinize işlendi.",
          detay:
            "Ne müdahaleye katıldın ne de dürüstçe karşı çıktın. Sicilinde artık hem 'güvenilmez' hem 'korkak' yazıyor.",
        },
      },
    ],
  },
  {
    id: "sd_asker_somurge",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    sureYilMin: 2,
    sureYilMax: 4,
    baslik: "Sömürge Görevi",
    metin:
      "Uzak bir sömürgede isyan çıktı. Alayın gönderiliyor: iklim öldürücü, yerel halk düşman, ama dönenlere toprak ve rütbe vaat ediliyor.",
    secenekler: [
      {
        metin: "Göreve tam bağlılıkla katıl.",
        baseBasariSansi: 55,
        ipucu: "Toprak, rütbe ve para; hastalık ve ölüm riski",
        basariliSonuc: {
          para: 40,
          un: 22,
          ahlak: -20,
          saglik: -18,
          maas_carpani: 1.2,
          mesaj: "İsyan bastırıldı; madalya, rütbe ve sömürgede toprak aldın.",
          detay:
            "Aldığın toprakta çalışanlar, üç yıl önce karşında savaşan insanlar. Bunu düşünmemek için kendini işe verdin.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 22,
          durum_ekle: { id: "tropik_hummasi", ad: "Tropik Humma", tur: "gecici", kalan_tur: 3, tur_basi_saglik: -10 },
          mesaj: "Sıtma alayı biçti; sen de kurtulamadın, sedyeyle gemiye taşındın.",
          detay:
            "Kurşun değil sivrisinek yendi seni. Nöbetler yıllarca tekrarladı ve o iklim bir daha vücudundan hiç çıkmadı.",
        },
      },
      {
        metin: "Sömürge idaresinde kâtiplik görevine talip ol.",
        baseBasariSansi: 60,
        minUn: 30,
        ipucu: "Güvenli ve kazançlı, savaş şerefi yok",
        basariliSonuc: {
          para: 30,
          un: 8,
          ahlak: -12,
          saglik: -8,
          maas_carpani: 1.15,
          mesaj: "İdare binasında kâtiplik aldın; savaşı pencereden izledin.",
          detay:
            "Vergileri ve el konulan toprakları sen kaydettin. Kılıç kullanmadın ama kalemin daha çok aileyi yerinden etti.",
        },
        basarisizSonuc: {
          un: -15,
          saglik: -20,
          mesaj: "Kâtiplik talebin reddedildi; hem cepheye gittin hem 'kaçmaya çalıştı' dendi.",
          detay:
            "En kötü kombinasyon: hem tehlikedesin hem de saygın yok. Alay arkadaşların artık sana mesafeli.",
        },
      },
    ],
  },

  // ============================================================
  // SANAYİ DEVRİMİ — TÜCCAR
  // ============================================================
  {
    id: "sd_tuccar_fabrika",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar"],
    sureYilMin: 2,
    sureYilMax: 3,
    baslik: "Fabrika Kurma",
    metin:
      "{bolge} yakınlarında ucuz bir arazi ve ucuz iş gücü var. Bir fabrika kurabilirsin — ama nasıl kuracağın, kim olacağını da belirleyecek.",
    secenekler: [
      {
        metin: "Ucuz çocuk işçiyle maliyeti dibe çek.",
        baseBasariSansi: 65,
        maliyet: 20,
        ipucu: "En yüksek kâr, ağır vicdan ve itibar bedeli",
        basariliSonuc: {
          para: 60,
          ahlak: -30,
          un: -12,
          maas_carpani: 1.35,
          mesaj: "Maliyetin rakiplerinin yarısı; fabrika hızla büyüdü.",
          detay:
            "Tezgâhların arasında dokuz yaşında çocuklar çalışıyor. Denetim gelmiyor, kâr geliyor ve sen artık bölgenin en zenginlerindensin.",
        },
        basarisizSonuc: {
          para: -35,
          un: -30,
          ahlak: -25,
          mesaj: "Bir çocuk makineye kapıldı; gazeteler fabrikayı manşete taşıdı.",
          detay:
            "Fabrika kapatıldı, tazminat ödedin, adın 'çocuk katili patron' diye anıldı. Kâr uçtu, damga kaldı.",
        },
      },
      {
        metin: "Adil ücret ve güvenli koşullarla kur.",
        baseBasariSansi: 60,
        maliyet: 30,
        ipucu: "Yavaş ama sağlam büyüme, yüksek başlangıç maliyeti",
        basariliSonuc: {
          para: 30,
          un: 25,
          ahlak: 25,
          maas_carpani: 1.2,
          etiket_ekle: ["adil_patron"],
          mesaj: "İşçiler seni bırakmıyor; verimlilik rakiplerini geçti.",
          detay:
            "Ücretler yüksek, devir hızı sıfır. Rakipler her ay yeni işçi ararken senin ustaların on yıldır aynı tezgâhta ve hiç fire vermiyorlar.",
        },
        basarisizSonuc: {
          para: -35,
          un: 12,
          ahlak: 20,
          mesaj: "Maliyetler ağır bastı; rakipler fiyatta seni yendi ve fabrika kapandı.",
          detay:
            "Doğru olanı yapmak seni batırdı. İşçilerin son gün kapıda toplanıp teşekkür etti; bu, bankadaki borcu kapatmadı.",
        },
      },
      {
        metin: "Küçük bir atölyeyle başla, riski minimumda tut.",
        baseBasariSansi: 80,
        maliyet: 12,
        ipucu: "Düşük risk, düşük tavan",
        basariliSonuc: {
          para: 18,
          maas_carpani: 1.1,
          mesaj: "Küçük atölye istikrarlı bir gelir kurdu.",
          detay:
            "Zengin olmadın ama batmadın da. Sekiz kişilik atölyende herkesin adını biliyorsun ve bu sana yetiyor.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Talep tutmadı; atölye zar zor masrafını çıkardı ve kapandı.",
          detay:
            "Küçük oynadın ve yine kaybettin. En azından kaybın da küçük oldu; ayakta kalmayı sürdürüyorsun.",
        },
      },
    ],
  },
  {
    id: "sd_tuccar_sendika",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar"],
    baslik: "Sendika Masada",
    metin:
      "İşçilerin kurduğu sendika görüşme istiyor. Talepleri net: daha kısa mesai, daha güvenli tezgâh. Rakip fabrikalar sendikayı tanımıyor ve bunu bir zayıflık olarak görüyor.",
    secenekler: [
      {
        metin: "Talepleri kabul et, sendikayı tanı.",
        baseBasariSansi: 78,
        ipucu: "Sadık iş gücü ve itibar, maliyet artışı",
        basariliSonuc: {
          para: -20,
          un: 22,
          ahlak: 25,
          maas_carpani: 1.12,
          etiket_ekle: ["adil_patron"],
          mesaj: "Anlaşma imzalandı; fabrikan bölgenin en istikrarlı iş yeri oldu.",
          detay:
            "Maliyetin arttı ama grev, sabotaj ve işçi kaybı sıfırlandı. Rakiplerin her ay üretim durdururken senin bacan hiç sönmedi.",
        },
        basarisizSonuc: {
          para: -30,
          un: 10,
          mesaj: "Talepleri kabul ettin ama maliyet hesabın tutmadı; zarar ediyorsun.",
          detay:
            "İşçiler memnun, defterin kırmızı. Cömertlik, hesabını yapmadığında cömertlik değil intihar oluyormuş.",
        },
      },
      {
        metin: "Sert pazarlık yap, minimum taviz ver.",
        baseBasariSansi: 55,
        ipucu: "Maliyeti korur, grev riskini yükseltir",
        basariliSonuc: {
          para: 18,
          un: -8,
          ahlak: -12,
          mesaj: "Küçük bir taviz verip anlaşmayı bitirdin; maliyetin neredeyse aynı kaldı.",
          detay:
            "Sendika temsilcisi masadan kalkarken 'bir dahaki sefere' dedi. Bu sefer sen kazandın; bir dahaki sefer mutlaka gelecek.",
        },
        basarisizSonuc: {
          para: -35,
          un: -22,
          ahlak: -12,
          mesaj: "Görüşmeler çöktü; grev başladı ve üretim aylarca durdu.",
          detay:
            "Fabrika bacası iki ay tütmedi. Sipariş iptalleri, ceza bedelleri ve gazetelerdeki haberler tavizden çok daha pahalıya patladı.",
        },
      },
      {
        metin: "Sendika liderini satın almayı dene.",
        baseBasariSansi: 45,
        maliyet: 25,
        ipucu: "Sorunu kökten çözebilir ya da tamamen patlatabilir",
        basariliSonuc: {
          para: -25,
          ahlak: -25,
          maas_carpani: 1.1,
          mesaj: "Lider parayı aldı ve talepleri sulandırdı; sendika içeriden çöktü.",
          detay:
            "İşçiler hâlâ o adama güveniyor ve o adam artık senin adamın. En ucuz çözüm buydu ve en kirlisi de.",
        },
        basarisizSonuc: {
          para: -25,
          un: -35,
          ahlak: -25,
          mesaj: "Lider parayı alıp teklifi işçilere gösterdi; fabrika ayağa kalktı.",
          detay:
            "Rüşvet teklifin duvarlara asıldı. Artık sadece kendi işçilerin değil, tüm şehir seni 'satın almaya çalışan patron' olarak biliyor.",
        },
      },
    ],
  },

  // ============================================================
  // DALLANAN YOL — ŞEHİR SEÇİMİ
  // ============================================================
  {
    id: "genel_sehir_secimi",
    kategori: "sosyal",
    minYas: 16,
    yasakliEtiketler: ["sehir_liman", "sehir_pazar"],
    gorsel: "🗺️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Yol Ayrımı",
    metin:
      "Bulunduğun yerde işler durgun. İki seçenek var: kuzeydeki rüzgârlı liman kenti — hareketli, riskli, kazançlı. Ya da güneydeki büyük pazar şehri — kalabalık, rekabetçi, istikrarlı.",
    secenekler: [
      {
        metin: "Liman kentine taşın.",
        baseBasariSansi: 70,
        ipucu: "Yüksek kazanç potansiyeli, tehlikeli çevre",
        basariliSonuc: {
          para: 20,
          un: 8,
          ahlak: -8,
          etiket_ekle: ["sehir_liman"],
          maas_carpani: 1.15,
          mesaj: "Limanda hızla iş buldun; deniz ticareti kazandırıyor.",
          detay:
            "Liman hiç uyumuyor: gemiler, kaçak mallar, yabancı diller. Burada para hızlı kazanılıyor ve hızlı kaybediliyor.",
        },
        basarisizSonuc: {
          para: -18,
          saglik: -10,
          etiket_ekle: ["sehir_liman"],
          mesaj: "Limanda tutunmak sandığından zor oldu; ilk yılın kayıpla geçti.",
          detay:
            "Herkesin bir ağı vardı ve seninki yoktu. Ucuz bir odada, rutubet ve gürültü içinde başladın.",
        },
      },
      {
        metin: "Pazar şehrine taşın.",
        baseBasariSansi: 70,
        ipucu: "İstikrarlı ve güvenli, rekabet yoğun",
        basariliSonuc: {
          para: 15,
          un: 12,
          ahlak: 5,
          etiket_ekle: ["sehir_pazar"],
          maas_carpani: 1.1,
          mesaj: "Pazar şehrinde düzenli bir tezgâh kurdun; işler yavaş ama sağlam.",
          detay:
            "Burada herkes birbirini tanıyor ve itibar her şeyden değerli. Yavaş ilerliyorsun ama sağlam basıyorsun.",
        },
        basarisizSonuc: {
          para: -15,
          un: -8,
          etiket_ekle: ["sehir_pazar"],
          mesaj: "Pazar doluydu; yer bulmak aylar aldı ve birikimini yedi.",
          detay:
            "Her köşe başı tutulmuştu. Kalabalık bir şehirde görünmez olmanın ne demek olduğunu ilk yılında öğrendin.",
        },
      },
    ],
  },
  {
    id: "liman_kacakcilik",
    kategori: "ticaret",
    gerekliEtiketler: ["sehir_liman"],
    gorsel: "⚓",
    baslik: "Limanda Gece Yükü",
    metin:
      "Bir gemi kaptanı, gümrük defterine geçmeyecek bir yük için sana ortaklık öneriyor. Limanın yarısı bu işi yapıyor, diğer yarısı yakalananları izliyor.",
    secenekler: [
      {
        metin: "Ortak ol, yükü birlikte indir.",
        baseBasariSansi: 55,
        ipucu: "Büyük ve hızlı kazanç, gümrük riski",
        basariliSonuc: {
          para: 45,
          ahlak: -20,
          etiket_ekle: ["liman_agi"],
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
        ipucu: "Yavaş ve pahalı ama kalıcı ve temiz",
        basariliSonuc: {
          para: -20,
          un: 18,
          ahlak: 18,
          maas_carpani: 1.2,
          etiket_ekle: ["resmi_ithalatci"],
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
        ipucu: "Sadece ahlaksızlara açık: Çok kârlı ama acımasız bir ihanet",
        basariliSonuc: {
          para: 70,
          ahlak: -30,
          un: -15,
          etiket_ekle: ["sir:kaptan_satan"],
          mesaj: "Kaptanı ihbar ettin, baskın sırasında malların yarısını kendi depona çektin.",
          detay: "Kaptan zindanda çürürken sen zenginleştin. Liman sokaklarında artık arkana bakmadan yürüyemezsin.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Kaptan ihanetini fark etti! Tayfasıyla birlikte seni rıhtımda kıstırıp denize attılar.",
          detay: "Zar zor yüzerek kurtuldun. Hem para gitti hem de limanda ölüm fermanın yazıldı.",
        }
      }
    ],
  },
  {
    id: "pazar_tezgah_kavgasi",
    kategori: "ticaret",
    gerekliEtiketler: ["sehir_pazar"],
    gorsel: "🏪",
    baslik: "Tezgâh Kavgası",
    metin:
      "Pazarın en işlek köşesi boşaldı. Sen ve iki rakibin aynı yeri istiyorsunuz. Pazar ağası 'en çok verene' diyor ama esnaf 'sıra kimdeyse onun' diyor.",
    secenekler: [
      {
        metin: "Ağaya en yüksek teklifi ver, yeri satın al.",
        baseBasariSansi: 70,
        maliyet: 25,
        ipucu: "En iyi konum, esnafın tepkisi",
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
        ipucu: "Esnafın saygısı, yeri kaçırma riski",
        basariliSonuc: {
          un: 22,
          ahlak: 18,
          para: 8,
          etiket_ekle: ["esnaf_destegi"],
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
        ipucu: "Aşırı riskli, büyük bir gerilim",
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin: "Ağanın yakasına yapıştın. Arkasındaki korumalar kılıçlarına davrandı. Bir adım daha atarsan pazar yerinde kan çıkacak.",
          geriCekilMetni: "Ellerini çek, sinirle uzaklaş.",
          geriCekilSonucu: {
            un: -5,
            ahlak: -5,
            mesaj: "Son anda geri adım attın. Yeri kaybettin ve ağanın önünde küçük düştün.",
            detay: "Öfkeni kontrol edememek itibarını zedeledi."
          },
          devamMetni: "Gözdağı ver: 'Bana o yeri vereceksin!'",
          devamSonucu: {
            un: 20,
            para: 10,
            ahlak: -15,
            maas_carpani: 1.2,
            mesaj: "Ağa deliliğinden korktu. Korumalara dur işareti yapıp yeri sana bıraktı.",
            detay: "Zorbalıkla kazandın ama artık pazar ağası senin yeminli düşmanın."
          }
        }
      },
    ],
  },
  {
    id: "genel_saray_firsati",
    kategori: "siyaset",
    minYas: 18,
    minUn: 30,
    yasakliEtiketler: ["saray_gorevlisi"],
    gorsel: "👑",
    baslik: "Sarayın Kapısı",
    metin:
      "{bolge} sarayında bir görev açıldı. Ünün seni aday listesine soktu. Saray güç ve para demek; aynı zamanda hiç kimsenin temiz kalamadığı bir yer.",
    secenekler: [
      {
        metin: "Göreve talip ol, saray dünyasına gir.",
        baseBasariSansi: 60,
        maliyet: 15,
        ipucu: "Güç, para ve nüfuz — ahlaki erozyon garantili",
        basariliSonuc: {
          un: 28,
          para: 30,
          ahlak: -22,
          maas_carpani: 1.3,
          etiket_ekle: ["saray_gorevlisi"],
          mesaj: "Saraya kabul edildin; artık kararların alındığı odalardasın.",
          detay:
            "İlk hafta üç kişinin nasıl bitirildiğini izledin ve hiçbir şey söylemedin. Sessiz kalmak burada hayatta kalmanın ilk kuralı ve sen öğrenmeye başladın bile.",
        },
        basarisizSonuc: {
          para: -18,
          un: -12,
          ahlak: -8,
          mesaj: "Aday listesinde elendin; harcadığın para ve umut boşa gitti.",
          detay:
            "Görevi, senden daha az yetenekli ama daha iyi akrabaları olan biri aldı. Sarayın ilk dersini kapıdan girmeden öğrendin.",
        },
      },
      {
        metin: "Talip olma, bağımsız itibarınla kal.",
        baseBasariSansi: 80,
        ipucu: "Vicdanını ve özgürlüğünü korur, tavan kaybı",
        basariliSonuc: {
          ahlak: 18,
          un: 8,
          etiket_ekle: ["saraydan_uzak"],
          mesaj: "Sarayı reddettin; halk arasında 'satın alınamayan adam' oldun.",
          detay:
            "Saraya girenler zenginleşti, bazıları da kayboldu. Sen ne birincisi ne ikincisi oldun ve geceleri rahat uyuyorsun.",
        },
        basarisizSonuc: {
          un: -12,
          para: -8,
          ahlak: 12,
          mesaj: "Reddin 'küstahlık' sayıldı; saray çevresi sana sırtını döndü.",
          detay:
            "Davet reddedilmez diye bir kural varmış. Artık saray bağlantılı hiçbir iş sana gelmiyor ve bu, düşündüğünden fazla iş demek.",
        },
      },
    ],
  },
  {
    id: "saray_entrika",
    kategori: "siyaset",
    gerekliEtiketler: ["saray_gorevlisi"],
    gorsel: "🎭",
    baslik: "İki Hizip",
    metin:
      "Sarayda iki hizip savaşıyor: biri eski soylular, diğeri yeni zenginler. İkisi de senden taraf seçmeni istiyor ve tarafsızlık burada bir seçenek sayılmıyor.",
    secenekler: [
      {
        metin: "Eski soylularla git — köklü ama gerileyen güç.",
        baseBasariSansi: 55,
        ipucu: "Prestij ve gelenek, geleceği belirsiz",
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -12,
          etiket_ekle: ["soylu_hizip"],
          mesaj: "Soylular kazandı; sadakatin unvanla ödüllendirildi.",
          detay:
            "Artık adının önünde bir sıfat var. Eski düzenin son kalesindesin ve bu kalenin duvarları her yıl biraz daha çatlıyor.",
        },
        basarisizSonuc: {
          un: -25,
          para: -22,
          mesaj: "Soylular yenildi; onlarla birlikte sen de tasfiye edildin.",
          detay:
            "Yeni zenginler saraya girdiğinde ilk iş eski hiziptekileri temizlemek oldu. Bir gecede odan boşaltıldı.",
        },
      },
      {
        metin: "Yeni zenginlerle git — parası çok, köksüz.",
        baseBasariSansi: 55,
        ipucu: "Yükselen güç ve para, prestij eksikliği",
        basariliSonuc: {
          para: 45,
          un: 12,
          ahlak: -18,
          maas_carpani: 1.25,
          etiket_ekle: ["yeni_zengin_hizip"],
          mesaj: "Yeni zenginler kazandı; ticari imtiyazlardan büyük pay aldın.",
          detay:
            "Para akıyor ama eski soylular seni hâlâ 'sonradan görme' sayıyor. Bunu umursamamayı öğreniyorsun, çünkü paranı sayarken vakit kalmıyor.",
        },
        basarisizSonuc: {
          para: -30,
          un: -20,
          mesaj: "Yeni zenginler dağıtıldı; ortaklarınla birlikte sen de düştün.",
          detay:
            "Yükselen güce oynadın ve o güç yükselemedi. Yatırdığın paranın yanında saraydaki yerini de kaybettin.",
        },
      },
      {
        metin: "İki tarafa da bilgi sat, kendi oyununu kur.",
        baseBasariSansi: 35,
        ipucu: "En yüksek kazanç, açığa çıkarsan ölüm",
        basariliSonuc: {
          para: 55,
          un: 15,
          ahlak: -30,
          mesaj: "İki hizbi de birbirine karşı besledin; ikisinden de kazandın.",
          detay:
            "Kimse kimin kime çalıştığını bilmiyor, sen hariç. Bu, sahip olabileceğin en tehlikeli ve en kârlı pozisyon.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj:
            "İki hizip de aynı hafta senin oyununu fark etti. Sarayda çift taraflı oynayanlar için tek bir çözüm vardır ve o gece uygulandı.",
        },
      },
    ],
  },
  {
    id: "genel_evlilik",
    kategori: "sosyal",
    minYas: 19,
    yasakliEtiketler: ["medeni:evli"],
    gorsel: "💍",
    baslik: "Evlilik Kararı",
    metin:
      "İki teklif var: varlıklı bir ailenin çocuğuyla çıkar evliliği, ya da yıllardır tanıdığın, hiç parası olmayan biriyle gönül evliliği.",
    secenekler: [
      {
        metin: "Varlıklı aileyle evlen, statü ve sermaye kazan.",
        baseBasariSansi: 75,
        ipucu: "Sermaye ve bağlantı, mutsuzluk riski",
        basariliSonuc: {
          para: 50,
          un: 20,
          ahlak: -15,
          maas_carpani: 1.2,
          es_ata: true,
          etiket_ekle: ["medeni:evli", "zengin_akrabalik"],
          mesaj: "Görkemli bir düğün oldu; ailenin serveti ve bağlantıları artık senin de.",
          detay:
            "Eşinle konuşacak pek bir şeyiniz yok ama kayınpederinle işler mükemmel gidiyor. Bunun bir takas olduğunu ikiniz de biliyorsunuz.",
        },
        basarisizSonuc: {
          para: 20,
          ahlak: -20,
          saglik: -12,
          es_ata: true,
          etiket_ekle: ["medeni:evli"],
          mesaj: "Evlilik soğuk geçti; para geldi, huzur gitmedi çünkü hiç gelmedi.",
          detay:
            "Aynı evde yaşayan iki yabancısınız. Kayınpederin işlerine karışıyor, eşin seninle konuşmuyor ve sen giderek daha az eve gidiyorsun.",
        },
      },
      {
        metin: "Gönlünden geçenle evlen, parasız ama huzurlu.",
        baseBasariSansi: 75,
        ipucu: "Mutluluk ve sağlık, mali destek yok",
        basariliSonuc: {
          saglik: 15,
          ahlak: 20,
          un: 8,
          para: -12,
          es_ata: true,
          etiket_ekle: ["medeni:evli", "mutlu_evlilik"],
          mesaj: "Küçük bir düğün yaptınız; ilk kez birinin seni beklediği bir eve dönüyorsun.",
          detay:
            "Zengin olmadınız ama akşamları gülüyorsunuz. Hastalandığında yanında biri var ve bu, kasadaki paradan daha uzun ömür veriyor.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: 8,
          ahlak: 15,
          es_ata: true,
          etiket_ekle: ["medeni:evli"],
          mesaj: "Evlendiniz ama yoksulluk evliliği yıprattı.",
          detay:
            "Sevgi vardı, para yoktu ve kavgaların çoğu para yüzündendi. Yine de sabah kalktığında yalnız değilsin.",
        },
      },
      {
        metin: "İkisini de reddet, kendi işine odaklan.",
        baseBasariSansi: 85,
        ipucu: "Tam bağımsızlık, yalnızlığın bedeli",
        basariliSonuc: {
          para: 22,
          maas_carpani: 1.12,
          saglik: -8,
          mesaj: "Tüm vaktini işine verdin; kazancın belirgin şekilde arttı.",
          detay:
            "Kimseye hesap vermiyorsun, kimse seni beklemiyor. Gece geç saatte boş eve dönmek bazen bir özgürlük, bazen sadece boşluk.",
        },
        basarisizSonuc: {
          saglik: -15,
          un: -10,
          mesaj: "Yalnızlık ağır bastı; çevren 'garip' demeye başladı.",
          detay:
            "İşe verdiğin emek karşılığını vermedi ve dönecek kimsen de yok. Toplum bekar kalmayı bir seçim değil, bir kusur sayıyor.",
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
    metin:
      "Elindeki birikimi değerlendirmek için üç yol var: yüksek riskli ortaklık, orta riskli mal alımı, ya da düşük getirili ama güvenli toprak/tahvil.",
    secenekler: [
      {
        metin: "Yüksek riskli ortaklığa gir.",
        baseBasariSansi: 45,
        maliyet: 30,
        ipucu: "Servet ya da iflas",
        basariliSonuc: {
          para: 70,
          un: 12,
          mesaj: "Ortaklık tuttu; yatırdığın paranın iki katından fazlasını geri aldın.",
          detay:
            "Riski aldın ve kazandın. Şimdi herkes sana 'nasıl bildin' diye soruyor; sen de bilmediğini söylemiyorsun.",
        },
        basarisizSonuc: {
          para: -50,
          un: -10,
          mesaj: "Ortağın kaçtı; yatırdığın her kuruş uçtu.",
          detay:
            "İmzaladığın sözleşme hiçbir mahkemede işe yaramadı. Birikimini bir imza ve bir güven duygusuyla kaybettin.",
        },
      },
      {
        metin: "Orta riskli mal alımı yap.",
        baseBasariSansi: 65,
        maliyet: 18,
        ipucu: "Makul kazanç, makul risk",
        basariliSonuc: {
          para: 30,
          mesaj: "Aldığın mallar sezonunda iyi fiyat buldu; sağlam bir kâr çıkardın.",
          detay:
            "Ne heyecan verici ne felaket. Hesabını yaptın, sabrettin ve karşılığını aldın; ticaretin büyük kısmı bundan ibaret.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Fiyatlar düştü; malı zararına elden çıkardın.",
          detay:
            "Piyasayı yanlış okudun. Büyük bir felaket değil ama bu yılki birikimin buharlaştı.",
        },
      },
      {
        metin: "Toprak/tahvil al — düşük getiri, yüksek güvenlik.",
        baseBasariSansi: 85,
        maliyet: 20,
        ipucu: "Yavaş ama kalıcı gelir",
        basariliSonuc: {
          para: 10,
          maas_carpani: 1.15,
          mesaj: "Aldığın toprak/tahvil her yıl düzenli gelir getirmeye başladı.",
          detay:
            "Zengin etmeyecek ama seni hiçbir zaman aç bırakmayacak bir gelir. Yaşlandıkça bunun değerini daha çok anlayacaksın.",
        },
        basarisizSonuc: {
          para: -18,
          mesaj: "Aldığın toprağın tapusunda sorun çıktı; parayı geri alamadın.",
          detay:
            "En güvenli yatırım bile belge kontrolü ister. Bunu cebinden ödeyerek öğrendin.",
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
    metin:
      "Birbirine düşman olan iki yakın dostun var. Biri yıllardır yanında olan sadık ama fakir bir dost; diğeri yeni tanıdığın, nüfuzlu ve faydalı biri. İkisi de taraf seçmeni istiyor.",
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
          etiket_ekle: ["sadik_dost"],
          mesaj: "Eski dostunun yanında durdun; o da ömrü boyunca senin yanında durdu.",
          detay:
            "Nüfuzlu adam kapıları kapattı ve bu sana pahalıya patladı. Ama hastalandığında başucunda oturan kişi, o kapıları kapatan adam değildi.",
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          ahlak: 18,
          mesaj: "Sadık kaldın ama dostun kavgayı kaybetti; ikiniz de zarar gördünüz.",
          detay:
            "Doğru tarafta olmak, kazanan tarafta olmak değil. İkiniz de kaybettiniz ve birbirinize kaldınız.",
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
          detay:
            "Eski dostun sana yazdığı mektuba hiç cevap vermedin. Kariyerin uçuyor ve o mektup hâlâ çekmecende duruyor.",
        },
        basarisizSonuc: {
          para: -18,
          un: -20,
          ahlak: -22,
          mesaj: "Nüfuzlu dostun kavgayı kaybetti ve seni tanımadığını söyledi.",
          detay:
            "Eski dostunu sattın ve yenisi seni tanımadı bile. Elinde ne dostluk kaldı ne kariyer; sadece yaptığın seçim kaldı.",
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
    metin:
      "Ailen hastalandı ve bakıma muhtaç. Yanına almak zamanını ve paranı yiyecek; bakıcı tutmak pahalı; hiçbir şey yapmamak ise bir daha telafisi olmayacak bir seçim.",
    secenekler: [
      {
        metin: "Yanına al, kendin bak.",
        baseBasariSansi: 80,
        ipucu: "Vicdan huzuru, ciddi zaman ve gelir kaybı",
        basariliSonuc: {
          ahlak: 28,
          un: 10,
          para: -22,
          maas_carpani: 0.9,
          mesaj: "Son yıllarında yanındaydın; giderken elin elindeydi.",
          detay:
            "İşin aksadı, kazancın düştü ve bunların hiçbiri şu an önemli değil. 'İyi ki' diyebildiğin az sayıda karardan biri bu.",
        },
        basarisizSonuc: {
          ahlak: 20,
          para: -28,
          saglik: -15,
          mesaj: "Bakım yükü seni de hasta etti; yine de sonuna kadar yanındaydın.",
          detay:
            "Aylarca doğru dürüst uyumadın. Onu kaybettiğinde hem yaslısın hem tükenmiş, hem de borçlusun.",
        },
      },
      {
        metin: "Bakıcı tut, sen işine devam et.",
        baseBasariSansi: 70,
        maliyet: 25,
        ipucu: "Kariyerini korur, vicdanı yarım bırakır",
        basariliSonuc: {
          para: -25,
          ahlak: -8,
          mesaj: "İyi bir bakıcı buldun; işlerin aksamadı, ailen de bakımsız kalmadı.",
          detay:
            "Ayda iki kez ziyarete gidiyorsun. Bakıcı 'sizi soruyor' diyor her seferinde ve sen 'işler yoğun' diyorsun her seferinde.",
        },
        basarisizSonuc: {
          para: -30,
          ahlak: -22,
          un: -12,
          mesaj: "Bakıcı ihmal etti; ailen kötü koşullarda ve herkes bunu senden bildi.",
          detay:
            "Ziyarete gittiğinde odanın halini gördün. Parayla çözdüğünü sandığın şey, çözülmemiş sadece ertelenmişti.",
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
    metin:
      "Pazar meydanında kaçan şişman bir domuz ortalığı birbirine kattı. Kasap iyi bir ödül vaat ediyor ve kalabalık eğlenerek izliyor.",
    secenekler: [
      {
        metin: "Domuzu yakalamaya çalış, ödülü kap.",
        baseBasariSansi: 60,
        ipucu: "Küçük para ve eğlenceli bir ün, saçma bir ölüm ihtimali",
        basariliSonuc: {
          para: 15,
          un: 12,
          unvan_kazan: "Domuz Fatihi",
          mesaj: "Domuzu son anda yakaladın; pazar halkı seni alkışladı.",
          detay:
            "Kasap sözünü tuttu ve o gün pazarda herkes senin adını öğrendi. Ünvanın komik ama akılda kalıcı.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj:
            "Domuzun peşinde koşarken bir el arabasına takılıp boynunu kırdın. Şehir seni yıllarca 'domuzla yarışıp kaybeden adam' diye andı.",
        },
      },
      {
        metin: "Kenara çekil, kaçış yolunu kesip usulca yakala.",
        baseBasariSansi: 80,
        ipucu: "Daha az ödül, çok daha az risk",
        basariliSonuc: {
          para: 8,
          un: 5,
          mesaj: "Sokak ağzını kestin; domuz kucağına düştü.",
          detay:
            "Koşturmadan, terlemeden hallettin. Kasap ödülü verirken 'akıllı adammışsın' dedi.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Domuz beklediğin sokaktan gelmedi, arkadan çarpıp seni devirdi.",
          detay:
            "Dizini yardın, pantolonun yırtıldı ve domuzu başkası yakaladı. En azından yaşıyorsun.",
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
    metin:
      "Sarhoş bir adam meyhanede yüksek sesle bahse giriyor: kim daha çok içerse masadaki tüm parayı alacak. Kalabalık tezahürat yapıyor.",
    secenekler: [
      {
        metin: "Bahsi kabul et, içmeye başla.",
        baseBasariSansi: 55,
        ipucu: "Kolay para ve meyhane şöhreti, ölümcül aptallık ihtimali",
        basariliSonuc: {
          para: 25,
          un: 12,
          saglik: -10,
          etiket_ekle: ["bagimlilik:alkol_meyil"],
          mesaj: "Rakibini masaya yığdın; meyhanedeki herkes senin şerefine içti.",
          detay:
            "Ertesi gün öğlene kadar kalkamadın ve başın çatlıyordu. Ancak kadeh kaldırmanın o tatlı hissine bağımlı olmaya başladın.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj:
            "Onuncu testiden sonra masaya yığıldın ve bir daha uyanmadın. Meyhaneciler seni 'balın şehidi' diye anmaya başladı.",
        },
      },
      {
        metin: "Bahsi kabul etme ama bahis tut, kâhyalık yap.",
        baseBasariSansi: 70,
        ipucu: "İçmeden kazanma yolu, kalabalığın alayı",
        basariliSonuc: {
          para: 18,
          un: -5,
          mesaj: "Bahisleri sen topladın; kim kazanırsa kazansın komisyon senindi.",
          detay:
            "Meyhane 'korkak' diye bağırdı, sen komisyonu sayarken gülümsedin. Ertesi sabah başı ağrımayan tek kişi sendin.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -10,
          mesaj: "Kaybeden taraf parasını geri istedi; masa devrildi, kavga çıktı.",
          detay:
            "Bahis kâhyalığı meyhanede kolay iş değilmiş. Hem para gitti hem dudağın patladı.",
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
    metin:
      "Bir mucit, sıcak hava balonuyla halka açık uçuş denemesi yapıyor ve iyi para karşılığı gönüllü arıyor. Kalabalık nefesini tutmuş bekliyor.",
    secenekler: [
      {
        metin: "Gönüllü ol, balona bin.",
        baseBasariSansi: 55,
        ipucu: "Tarihe geçme şansı, gökyüzünde ölme ihtimali",
        basariliSonuc: {
          para: 25,
          un: 25,
          mesaj: "Balon süzüldü; şehrin üzerinde uçan ilk kişilerden biri oldun.",
          detay:
            "Yerdeki insanlar karınca gibiydi ve sen o an hiçbir şeyden korkmadın. Gazeteler adını yazdı, mucit ise seninle ortaklık teklif etti.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj:
            "Brülör sepeti tutuşturdu; mucit son anda atladı ama sen kemerini çözemedin. Gazeteler 'gökyüzü hevesi hüsranla bitti' diye yazdı.",
        },
      },
      {
        metin: "Uçma ama mucide yatırım yap.",
        baseBasariSansi: 50,
        maliyet: 15,
        ipucu: "Riski mucide bırakır, paranı riske atar",
        basariliSonuc: {
          para: 35,
          un: 10,
          mesaj: "Balon uçtu; ortağı olarak sen de gelirden pay aldın.",
          detay:
            "Ayakların yerden hiç kesilmedi ama cebin doldu. En iyi yatırım, riski başkasının aldığı yatırımmış.",
        },
        basarisizSonuc: {
          para: -18,
          saglik: -10,
          etiket_ekle: ["kalici:yanik_izi"],
          mesaj: "Balon kalkmadan alev aldı! Yakından izlediğin için kıvılcımlar yüzüne sıçradı.",
          detay:
            "Enkazın başında dururken kalıcı bir yanık iziyle kaldın. En azından o sepette sen yoktun.",
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
    metin:
      "Şehre gelen sirkte, sahibi kalabalığa meydan okuyor: aslan kafesine en çok yaklaşan iyi para kazanacak. Herkes sana bakıyor.",
    secenekler: [
      {
        metin: "Kafese yaklaş, ödülü al.",
        baseBasariSansi: 58,
        ipucu: "Kolay para ve anlatılacak hikaye, aslan",
        basariliSonuc: {
          para: 22,
          un: 15,
          unvan_kazan: "Aslan Terbiyecisi",
          mesaj: "Aslan sakin kaldı; kalabalık cesaretine hayran kaldı.",
          detay:
            "Terbiyeci sonradan 'o aslanın dişi yok' diye fısıldadı. Kalabalık bunu bilmiyor ve sen de düzeltmeyeceksin.",
        },
        basarisizSonuc: {
          olum: true,
          mesaj:
            "Terbiyecinin 'elini kafese sokma' uyarısını duymamış gibi davrandın. Sirk o günden sonra 'meraklı seyirci' anısını hiç unutmadı.",
        },
      },
      {
        metin: "Sirkle anlaş, gösteriye bilet sat.",
        baseBasariSansi: 70,
        ipucu: "Risksiz komisyon, düşük heyecan",
        basariliSonuc: {
          para: 18,
          un: 5,
          mesaj: "Bilet satışından komisyon aldın; kimse sana bakmadı ama kimse de seni yemedi.",
          detay:
            "Sirk sahibi 'sen bu işi biliyorsun' dedi ve şehre her gelişinde seni arıyor. Küçük ama tekrarlayan bir gelir.",
        },
        basarisizSonuc: {
          para: -12,
          mesaj: "Gösteri yağmurdan iptal oldu; bastığın biletler elinde kaldı.",
          detay:
            "Sirk ertesi gün şehri terk etti ve senin komisyonunu ödemedi. Aslana yaklaşmaktan daha güvenliydi ama kârlı değildi.",
        },
      },
    ],
  },

  // ============================================================
  // TARİHİ SAVAŞLAR — bölgeye özel, gerçek tarihi arka plan
  // ============================================================
  {
    id: "tarihi_fransa_prusya_ilan",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    gerekliUlke: { savasta: false },
    agirlik: 0.5,
    gorsel: "🇫🇷",
    baslik: "Prusya'ya Savaş İlanı",
    metin:
      "{yil} yılı. Prusya ile aranızdaki gerginlik nihayet savaşa dönüştü. Gazeteler 'birkaç ayda Berlin'de olacağız' diye yazıyor, imparator bizzat orduyu yönetecek.",
    secenekler: [
      {
        metin: "Gönüllü yazıl, cepheye git.",
        baseBasariSansi: 55,
        ipucu: "Kolay zafer vaadine güven — tarih başka türlü yazılabilir",
        basariliSonuc: {
          para: 20,
          un: 18,
          saglik: -10,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["fransa_prusya_savasinda"],
          mesaj: "İlk çarpışmalarda cesaretinle öne çıktın.",
          detay: "Gazetelerin vaat ettiği kolay zafer henüz görünmüyor ama moralin yüksek.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["fransa_prusya_savasinda"],
          mesaj: "Prusya topçusu beklediğinden çok daha güçlüydü; ağır yaralandın.",
          detay: "Sahra hastanesinde yatarken subayların endişeli fısıltılarını duyuyorsun.",
        },
      },
      {
        metin: "Orduya tedarik sözleşmesi teklif et.",
        baseBasariSansi: 65,
        maliyet: 15,
        ipucu: "Savaştan uzakta kâr, ödeme garantisi yok",
        basariliSonuc: {
          para: 30,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["fransa_prusya_savasinda"],
          mesaj: "Ordu erzak ve çizme siparişini sana verdi; ilk ödeme geldi bile.",
          detay: "Savaş sürdükçe sipariş büyüyor; şimdilik hem güvendesin hem kazançlısın.",
        },
        basarisizSonuc: {
          para: -15,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["fransa_prusya_savasinda"],
          mesaj: "Sözleşme imzalandı ama devlet ödemeyi savaş bitene erteledi.",
          detay: "Malı teslim ettin, para hazineden değil senin cebinden çıkmış oldu şimdilik.",
        },
      },
      {
        metin: "Sınır dışına, tarafsız bir ülkeye geç.",
        baseBasariSansi: 80,
        ipucu: "Can güvenliği, ün kaybı",
        basariliSonuc: {
          un: -15,
          saglik: 5,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["fransa_prusya_savasinda"],
          mesaj: "Sınırı sorunsuz geçtin; savaşı gazetelerden takip edeceksin.",
          detay: "Komşuların 'nerede o' diye sorduğunda kimse net bir cevap veremiyor.",
        },
        basarisizSonuc: {
          para: -20,
          un: -20,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["fransa_prusya_savasinda"],
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
    bolgeler: ["Fransa"],
    gerekliEtiketler: ["fransa_prusya_savasinda"],
    agirlik: 1.8,
    gorsel: "😔",
    baslik: "Sedan'ın Ardından",
    metin:
      "{yil} yılı. Sedan'da imparator esir düştü, ordu dağıldı. Prusya birlikleri Paris'i kuşattı. Savaş kaybedildi; ekmek karneyle dağıtılıyor, herkesin geliri görünür şekilde eridi.",
    secenekler: [
      {
        metin: "Herkes gibi sıkıntıyı paylaş, dürüstçe geçin.",
        baseBasariSansi: 80,
        ipucu: "Onurunu korur, cebin de küçülür",
        basariliSonuc: {
          ahlak: 15,
          para: -10,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["fransa_prusya_savasinda"],
          mesaj: "Komşularınla aynı kuyrukta bekleyip aynı ekmeği paylaştın.",
          detay: "Zor bir kış oldu ama kimseye 'o da bizden biri' demedi seni; herkes aynı gemideydi.",
        },
        basarisizSonuc: {
          para: -22,
          saglik: -10,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["fransa_prusya_savasinda"],
          mesaj: "Karneyle bile yetmedi; o kış aç kaldın.",
          detay: "Kıtlık kimseyi ayırt etmedi; dürüst olman seni doyurmadı.",
        },
      },
      {
        metin: "Kıtlıkta erzak istifle, yüksek fiyata sat.",
        baseBasariSansi: 50,
        maliyet: 15,
        maxAhlak: 45,
        ipucu: "Sadece ahlaksızlara: Karşı konulmaz bir fırsatçılık",
        basariliSonuc: {
          para: 65,
          ahlak: -30,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["fransa_prusya_savasinda"],
          mesaj: "Aç insanlara ekmeği üç katı fiyata sattın; kasan hiç bu kadar dolmamıştı.",
          detay:
            "Bir kadının ağladığını gördün ve fiyatı yine de düşürmedin. Servetinin bir kısmı o kışın açlığından geliyor.",
        },
        basarisizSonuc: {
          para: -25,
          un: -30,
          saglik: -15,
          olum_sansi: 8,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["fransa_prusya_savasinda"],
          mesaj: "Aç bir kalabalık depolarını bastı; malın gitti, sen dövülerek kurtuldun.",
          detay:
            "Mahalle artık senin adını 'kıtlıkta zengin olmaya çalışan adam' diye anıyor ve bu kolay unutulmuyor.",
        },
      },
      {
        metin: "Aileni koru, sessizce bekle.",
        baseBasariSansi: 75,
        ipucu: "Güvenli ve nötr",
        basariliSonuc: {
          saglik: -5,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["fransa_prusya_savasinda"],
          mesaj: "Kapını kapattın, kışı evde geçirdin; zor ama sağ çıktınız.",
          detay: "Dışarıda olanları sonradan komşulardan duydun; içerde kalmak seni yormuştu ama korumuştu.",
        },
        basarisizSonuc: {
          saglik: -18,
          para: -12,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["fransa_prusya_savasinda"],
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
    bolgeler: ["Osmanlı", "İngiltere"],
    gerekliUlke: { savasta: false },
    agirlik: 0.5,
    gorsel: "⚓",
    baslik: "Kırım'a Doğru",
    metin:
      "{yil} yılı. Rusya'nın yayılmacılığına karşı müttefiklerinizle birlikte savaşa girdiniz. Büyük bir donanma Kırım'a doğru yola çıkıyor.",
    secenekler: [
      {
        metin: "Orduya/donanmaya katıl.",
        baseBasariSansi: 55,
        ipucu: "Zafer payı ve ün, siperlerde hastalık riski",
        basariliSonuc: {
          para: 22,
          un: 20,
          saglik: -12,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda"],
          mesaj: "Kuşatma hattında görev aldın; zorlu ama gururlandırıcı bir hizmetti.",
          detay: "Sivastopol surları hâlâ dimdik ama moraliniz yüksek; kazanacağınıza inanıyorsunuz.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 12,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda"],
          mesaj: "Siperlerde kolera yayıldı; sen de ateşler içinde kaldın.",
          detay: "Kurşundan çok hastalık öldürüyor bu savaşta; hekimler yetişemiyor.",
        },
      },
      {
        metin: "Donanmaya erzak ve kömür tedarik et.",
        baseBasariSansi: 68,
        maliyet: 15,
        ipucu: "Uzaktan ve güvenli kâr",
        basariliSonuc: {
          para: 32,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda"],
          mesaj: "Sözleşmen onaylandı; savaş sürdükçe kâr da sürüyor.",
          detay: "Limanda her hafta yeni bir sipariş; savaş bazıları için iyi bir iştir.",
        },
        basarisizSonuc: {
          para: -12,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda"],
          mesaj: "Rakip tedarikçi daha düşük fiyat verdi; sözleşmeyi kaybettin.",
          detay: "Hazırlık masrafların boşa gitti; bu savaştan bu sefer sen kazanmadın.",
        },
      },
      {
        metin: "İşine devam et, savaştan uzak dur.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, sıradan",
        basariliSonuc: {
          para: 8,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda"],
          mesaj: "Günlük hayatına devam ettin; savaş haberleri gazetelerden geliyor.",
          detay: "Herkes cepheden konuşurken sen tezgâhının başındasın; bu da bir seçim.",
        },
        basarisizSonuc: {
          para: -10,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda"],
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
    bolgeler: ["Osmanlı", "İngiltere"],
    gerekliEtiketler: ["kirim_savasinda"],
    agirlik: 1.8,
    gorsel: "🎉",
    baslik: "Sivastopol Düştü",
    metin:
      "{yil} yılı. Sivastopol düştü, Rusya barış istedi. Zafer haberi ulaştığında sokaklar bayram yerine döndü. Yeni ticaret yolları açıldı, savaş tazminatı ekonomiye can verdi.",
    secenekler: [
      {
        metin: "Zaferin getirdiği yeni ticaret fırsatlarına atıl.",
        baseBasariSansi: 55,
        maliyet: 18,
        ipucu: "Büyük fırsat penceresi, rekabet de yoğun",
        basariliSonuc: {
          para: 50,
          un: 15,
          ulke_etkisi: { savasta: false, ekonomi: "iyi" },
          maas_carpani: 1.15,
          mesaj: "Açılan yeni pazarlara ilk giren sen oldun; kazancın kalıcı olarak arttı.",
          detay: "Zafer sonrası coşku hâlâ sürüyor ve bu coşkuyu paraya çevirdin.",
        },
        basarisizSonuc: {
          para: -20,
          ulke_etkisi: { savasta: false, ekonomi: "iyi" },
          mesaj: "Herkes aynı fırsata koştu; rekabet fiyatları eritip seni zarara soktu.",
          detay: "Zafer herkese aynı hissi verdi ve herkes aynı kapıya koştu; kalabalıkta kayboldun.",
        },
      },
      {
        metin: "Zafer kutlamalarına katıl, bağlantı kur.",
        baseBasariSansi: 75,
        ipucu: "Düşük risk, sosyal sermaye",
        basariliSonuc: {
          un: 20,
          para: 10,
          ulke_etkisi: { savasta: false, ekonomi: "iyi" },
          mesaj: "Kutlamalarda tanıştığın isimler sana yeni kapılar açtı.",
          detay: "Zafer sarhoşluğu herkesi cömert yapıyor; sen de bundan payını aldın.",
        },
        basarisizSonuc: {
          para: -8,
          ulke_etkisi: { savasta: false, ekonomi: "iyi" },
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
    bolgeler: ["Rusya"],
    gerekliUlke: { savasta: false },
    agirlik: 0.5,
    gorsel: "🇷🇺",
    baslik: "Müttefiklere Karşı",
    metin:
      "{yil} yılı. Osmanlı, İngiltere ve Fransa'nın oluşturduğu ittifak Kırım'a asker çıkardı. Çar tüm halktan fedakârlık istiyor.",
    secenekler: [
      {
        metin: "Orduya katıl, Sivastopol'u savun.",
        baseBasariSansi: 50,
        ipucu: "Vatan savunması onuru, çok yüksek risk",
        basariliSonuc: {
          un: 22,
          para: 15,
          saglik: -15,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda_rusya"],
          mesaj: "Surlarda direnişe katkın oldu; komutanlar seni örnek gösterdi.",
          detay: "Kuşatma ağırlaşıyor ama şimdilik surlar ayakta ve sen de öylesin.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda_rusya"],
          mesaj: "Müttefik topçusu hattı dövdü; ağır yaralı olarak geri çekildin.",
          detay: "Modern toplara karşı eski taktiklerin yetmediğini bedeninle öğrendin.",
        },
      },
      {
        metin: "Orduya at ve erzak tedarik et.",
        baseBasariSansi: 65,
        maliyet: 15,
        ipucu: "Uzaktan katkı, ödeme belirsiz",
        basariliSonuc: {
          para: 25,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda_rusya"],
          mesaj: "Tedarik hattında görev aldın; şimdilik iyi para kazanıyorsun.",
          detay: "Cepheye giden her kervan yarısı geri dönmüyor ama senin işin cephenin gerisinde.",
        },
        basarisizSonuc: {
          para: -15,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda_rusya"],
          mesaj: "Ödemeler savaş bitene ertelendi; masrafın cebinden çıktı.",
          detay: "Hazine boş; sözleşme kağıt üstünde iyi ama nakit akışı sıfır.",
        },
      },
      {
        metin: "Taşraya çekil, savaştan uzak dur.",
        baseBasariSansi: 78,
        ipucu: "Güvenli ama itibar kaybı",
        basariliSonuc: {
          saglik: 5,
          un: -12,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda_rusya"],
          mesaj: "Taşrada sakin kaldın; savaşın gürültüsü sana uzaktan geldi.",
          detay: "Çar'ın çağrısına kulak asmayanlardan biri oldun ve bunu kimseye anlatmadın.",
        },
        basarisizSonuc: {
          para: -15,
          un: -18,
          ulke_etkisi: { savasta: true },
          etiket_ekle: ["kirim_savasinda_rusya"],
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
    bolgeler: ["Rusya"],
    gerekliEtiketler: ["kirim_savasinda_rusya"],
    agirlik: 1.8,
    gorsel: "😔",
    baslik: "Sivastopol'un Düşüşü",
    metin:
      "{yil} yılı. Sivastopol bir yıl süren kuşatmanın ardından düştü. Çar barış istemek zorunda kaldı. Yenilginin faturası ağır: vergiler arttı, tahıl fiyatları katlandı.",
    secenekler: [
      {
        metin: "Sıkıntıyı halkla paylaş, dürüstçe geçin.",
        baseBasariSansi: 80,
        ipucu: "Onurlu ama yoksullaştırıcı",
        basariliSonuc: {
          ahlak: 15,
          para: -12,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["kirim_savasinda_rusya"],
          mesaj: "Herkes gibi kemer sıktın; kimse senin ayrıcalıklı olduğunu düşünmedi.",
          detay: "Yenilgi acı ama paylaşılan bir acı; en azından yalnız değilsin.",
        },
        basarisizSonuc: {
          para: -22,
          saglik: -10,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["kirim_savasinda_rusya"],
          mesaj: "Vergi artışı beklediğinden ağır oldu; kışı zorlukla atlattın.",
          detay: "Yenilginin faturası önce en yoksullara kesiliyor ve sen de o listedeydin.",
        },
      },
      {
        metin: "Buğday stoklayıp krizde yüksek fiyata sat.",
        baseBasariSansi: 48,
        maliyet: 15,
        ipucu: "Şerefsiz ama kazançlı; halkın öfkesi büyük risk",
        basariliSonuc: {
          para: 60,
          ahlak: -28,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["kirim_savasinda_rusya"],
          mesaj: "Aç köylülere buğdayı üç katı fiyata sattın; kasan hiç bu kadar dolmamıştı.",
          detay: "Bazı geceler o yüzlerin hatırına uykun kaçıyor; kimseye söylemiyorsun.",
        },
        basarisizSonuc: {
          para: -20,
          un: -28,
          saglik: -18,
          olum_sansi: 8,
          ulke_etkisi: { savasta: false, ekonomi: "kotu" },
          etiket_sil: ["kirim_savasinda_rusya"],
          mesaj: "Öfkeli bir grup deponu bastı; malın yağmalandı, sen dövüldün.",
          detay: "Yenilginin acısını çıkaracak birine ihtiyaçları vardı ve o kişi sen oldun.",
        },
      },
    ],
  },

  // ============================================================
  // MESLEK HİZMET ZİNCİRLERİ — birbirine bağlı, yıllara yayılan olaylar
  // ============================================================
  {
    id: "zincir_asker_baslangic",
    kategori: "savas",
    meslekler: ["Asker"],
    maxYas: 22,
    yasakliEtiketler: ["asker_hizmette", "asker_hizmet_bitti"],
    agirlik: 1.6,
    gorsel: "🪖",
    baslik: "Alaya Katılış",
    metin:
      "Alayına ilk katıldığın gün. Kışlanın kapısında üstünü değiştirip sıraya girdin; artık sivil değil, askersin. Çavuş yeni gelenlere soğuk gözlerle bakıyor.",
    secenekler: [
      {
        metin: "Disiplinli görün, kurallara harfiyen uy.",
        baseBasariSansi: 75,
        ipucu: "İlk izlenim önemli",
        basariliSonuc: {
          un: 10,
          ahlak: 5,
          etiket_ekle: ["asker_hizmette"],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "Çavuş seni beğendi; 'bu iyi asker olur' dediğini duydun.",
          detay: "İlk gün iyi geçti. Kışlanın ritmine daha ilk haftada ayak uydurdun.",
        },
        basarisizSonuc: {
          un: -8,
          saglik: -5,
          etiket_ekle: ["asker_hizmette"],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "İlk talimde beceriksizce göründün; çavuş herkesin önünde seni azarladı.",
          detay: "Kötü bir başlangıç oldu ama artık geri dönüş yok; alaydasın.",
        },
      },
      {
        metin: "Kendi tarzınca uyum sağla, fazla zorlama.",
        baseBasariSansi: 80,
        ipucu: "Rahat ama sıradan bir başlangıç",
        basariliSonuc: {
          saglik: 5,
          etiket_ekle: ["asker_hizmette"],
          zorunlu_sonraki: "zincir_asker_pusu",
          mesaj: "Ne öne çıktın ne geride kaldın; sessizce sıraya karıştın.",
          detay: "Kimse adını henüz bilmiyor. Bu bazen kışlada en güvenli yerdir.",
        },
        basarisizSonuc: {
          un: -10,
          etiket_ekle: ["asker_hizmette"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["asker_hizmette"],
    gorsel: "⚔️",
    baslik: "İlk Pusuya Düşüş",
    metin:
      "Hizmetinin ilk yılında, rutin bir devriye sırasında birliğin pusuya düştü. Kaos içinde, ne yapacağına saniyeler içinde karar vermen gerekiyor.",
    secenekler: [
      {
        metin: "Öne atıl, ateşe karşı ateşle karşılık ver.",
        baseBasariSansi: 50,
        ipucu: "Kahramanlık ya da ağır yara",
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
        ipucu: "Daha güvenli, kahramanlık payı düşük",
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["asker_hizmette"],
    yasakliEtiketler: ["asker_hizmet_bitti"],
    agirlik: 2.2,
    gorsel: "🏅",
    baslik: "Hizmet Yıllarının Sonu",
    metin:
      "Yıllar boyu sürdürdüğün hizmetin ardından komutan seni çağırdı: 'Vazifen doldu evlat. Artık kendi yoluna karar verebilirsin.'",
    secenekler: [
      {
        metin: "Orduda kal, mesleki asker ol.",
        baseBasariSansi: 78,
        ipucu: "Kariyer güvencesi ve rütbe, sivil hayattan uzaklaşma",
        basariliSonuc: {
          un: 20,
          para: 20,
          maas_carpani: 1.2,
          etiket_ekle: ["kariyer_asker"],
          mesaj: "Uzun hizmet dönemine imza attın; artık kıdemli bir askersin.",
          detay:
            "Geçen yıllar boyunca alayın sana bir aile gibi olduğunu fark ettin. Sivil hayat çoktan yabancılaştı ama bu senin seçtiğin yol.",
        },
        basarisizSonuc: {
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
        ipucu: "Özgürlük ve emekli ikramiyesi, yeniden başlama zorluğu",
        basariliSonuc: {
          para: 35,
          ahlak: 8,
          etiket_ekle: ["asker_hizmet_bitti"],
          etiket_sil: ["asker_hizmette"],
          mesaj: "Emekli ikramiyeni alıp sivil hayata döndün; yıllar sonra ilk kez kendi kararlarını veriyorsun.",
          detay:
            "Şehir hizmete girdiğin günden beri çok değişmiş. Yürürken hâlâ adım sayıyorsun, uykuların hâlâ tetikte. Ama artık kimse sana emir vermiyor.",
        },
        basarisizSonuc: {
          para: 15,
          un: -8,
          saglik: -8,
          etiket_ekle: ["asker_hizmet_bitti"],
          etiket_sil: ["asker_hizmette"],
          mesaj: "Terhis kağıtların gecikti, ikramiyenin bir kısmı bürokraside kayboldu.",
          detay:
            "Yıllarca hizmet ettin ve karşılığında beklediğinin azını aldın. Yine de artık özgürsün; bunun bir bedeli olduğunu şimdi anlıyorsun.",
        },
      },
    ],
  },
  {
    id: "zincir_tuccar_teklif",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    yasakliEtiketler: ["buyuk_siparis_surecinde", "buyuk_siparis_bitti"],
    agirlik: 1.4,
    gorsel: "📜",
    baslik: "Büyük Sipariş Teklifi",
    metin:
      "Uzak bir şehirden gelen bir tüccar, yıllarca sürecek devasa bir tedarik anlaşması öneriyor. Kabul edersen sermayenin çoğunu bu tek ilişkiye bağlamış olacaksın.",
    secenekler: [
      {
        metin: "Anlaşmayı imzala, büyük oyuna gir.",
        baseBasariSansi: 70,
        maliyet: 20,
        ipucu: "Uzun vadeli büyük fırsat, tüm yumurtalar aynı sepette",
        basariliSonuc: {
          para: -20,
          un: 10,
          etiket_ekle: ["buyuk_siparis_surecinde"],
          zorunlu_sonraki: "zincir_tuccar_kervan_sorunu",
          mesaj: "İmzalar atıldı; artık yıllarca sürecek bir ortaklığın içindesin.",
          detay: "Sermayenin çoğu bu anlaşmaya bağlı. Ya büyük kazanacaksın ya da her şeyi kaybedeceksin.",
        },
        basarisizSonuc: {
          para: -25,
          etiket_ekle: ["buyuk_siparis_surecinde"],
          zorunlu_sonraki: "zincir_tuccar_kervan_sorunu",
          mesaj: "Sözleşme şartları düşündüğünden ağır çıktı ama artık geri dönüşü yok.",
          detay: "İlk masraflar bile beklediğinden fazlaydı; bu işe girdiğine şimdiden şüpheyle bakıyorsun.",
        },
      },
      {
        metin: "Teklifi reddet, mevcut işine odaklan.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ve sıradan",
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["buyuk_siparis_surecinde"],
    gorsel: "🐫",
    baslik: "Yolda Sorun",
    metin:
      "Büyük siparişin ilk yükü yolda; habercisi soluk soluğa geldi: 'Kervan bir fırtınaya ve haydut baskınına yakalandı, ortağınız sizden acil karar bekliyor.'",
    secenekler: [
      {
        metin: "Ek para gönderip silahlı bir kurtarma seferi düzenle.",
        baseBasariSansi: 60,
        maliyet: 20,
        ipucu: "Anlaşmayı kurtarır, ek maliyet",
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
        ipucu: "Ek maliyet yok, ortaklık zedelenebilir",
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
        ipucu: "Sadece ahlaksızlara açık: Hırsızlık",
        basariliSonuc: {
          para: 50,
          ahlak: -20,
          etiket_ekle: ["sir:sigorta_dolandiricisi"],
          mesaj: "Malların tamamı yanmış gibi evrak düzenledin. Lonca sana devasa bir tazminat ödedi.",
          detay: "Hem yükün bir kısmı sende kaldı hem de haksız bir servet kazandın."
        },
        basarisizSonuc: {
          para: -40,
          un: -30,
          ahlak: -15,
          mesaj: "Lonca müfettişleri sahtekarlığı anında yakaladı! Ağır para cezası yedin ve itibarın lekelendi."
        }
      }
    ],
  },
  {
    id: "zincir_tuccar_teslimat",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["buyuk_siparis_surecinde"],
    yasakliEtiketler: ["buyuk_siparis_bitti"],
    agirlik: 2,
    gorsel: "🏆",
    baslik: "Sözleşmenin Sonu",
    metin:
      "Yıllardır sürdürdüğün büyük tedarik anlaşması nihayet son teslimat aşamasına geldi. Ortağın hesapları kapatmak için seni çağırdı.",
    secenekler: [
      {
        metin: "Gölge Sikkesi'ni masaya koy ve ortağının zihnini ele geçir.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:golge_sikke"],
        ipucu: "Gizli Envanter: Tüm kâr sana kalır, ancak ruhundan bir parça daha kopar",
        basariliSonuc: {
          para: 80,
          un: 30,
          ahlak: -40,
          maas_carpani: 1.3,
          etiket_ekle: ["buyuk_siparis_bitti"],
          etiket_sil: ["buyuk_siparis_surecinde", "envanter:golge_sikke"],
          mesaj: "Sikkeyi masaya koyduğunda ortağının gözleri boşluğa düştü. Şirket haklarının büyük bölümünü kendi elleriyle sana devretti.",
          detay: "Ciddi bir servet ve kalıcı bir gelir kazandın. Adam ertesi gün delirdi, sen ise aynadaki yansımandan bile korkuyorsun."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Son teslimatı bizzat denetleyerek kapat.",
        baseBasariSansi: 68,
        ipucu: "Yıllarca süren emeğin karşılığı ya da hüsran",
        basariliSonuc: {
          para: 65,
          un: 25,
          maas_carpani: 1.2,
          etiket_ekle: ["buyuk_siparis_bitti"],
          etiket_sil: ["buyuk_siparis_surecinde"],
          mesaj: "Anlaşma başarıyla tamamlandı; yıllarca süren emeğin karşılığını fazlasıyla aldın.",
          detay:
            "Geriye dönüp baktığında bu anlaşmanın seni büyük ölçüde değiştirdiğini görüyorsun. Artık şehirdeki en tanınan tüccarlardan birisin.",
        },
        basarisizSonuc: {
          para: -20,
          un: -10,
          etiket_ekle: ["buyuk_siparis_bitti"],
          etiket_sil: ["buyuk_siparis_surecinde"],
          mesaj: "Son teslimatta bir anlaşmazlık çıktı; anlaşma zararla kapandı.",
          detay: "Yıllarca sürdürdüğün bu ilişki, umduğun ödülü vermeden bitti. Yine de tecrübe kazandın.",
        },
      },
      {
        metin: "Vekilini gönder, kendin uzak dur.",
        baseBasariSansi: 75,
        ipucu: "Daha az risk, daha az kontrol",
        basariliSonuc: {
          para: 35,
          un: 10,
          etiket_ekle: ["buyuk_siparis_bitti"],
          etiket_sil: ["buyuk_siparis_surecinde"],
          mesaj: "Vekilin işi düzgünce hallettim; anlaşma sorunsuz kapandı.",
          detay: "Bizzat orada olmadın ama sonuç gayet tatmin ediciydi. Bazen güvenmek yeterlidir.",
        },
        basarisizSonuc: {
          para: -15,
          etiket_ekle: ["buyuk_siparis_bitti"],
          etiket_sil: ["buyuk_siparis_surecinde"],
          mesaj: "Vekilin son anda hesap hatası yaptı; anlaşma beklediğinden az kazandırdı.",
          detay: "Belki bizzat orada olsaydın fark ederdin. Artık bu uzun hikaye kapandı.",
        },
      },
    ],
  },
  {
    id: "zincir_din_gorev_teklifi",
    kategori: "din",
    meslekler: ["Din Adamı"],
    yasakliEtiketler: ["kutsal_gorevde", "kutsal_gorev_bitti"],
    agirlik: 1.4,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Uzak Bir Görev",
    metin:
      "Üst makam, uzak bir topraktaki küçük bir cemaate yıllarca sürecek bir görev için seni öneriyor. Kabul edersen buradaki hayatını geride bırakacaksın.",
    secenekler: [
      {
        metin: "Görevi kabul et, yola çık.",
        baseBasariSansi: 80,
        ipucu: "Uzun bir yolculuğun başlangıcı",
        basariliSonuc: {
          ahlak: 10,
          etiket_ekle: ["kutsal_gorevde"],
          zorunlu_sonraki: "zincir_din_yolda_sinav",
          mesaj: "Eşyalarını topladın, cemaatinle vedalaştın ve yola çıktın.",
          detay: "Bu topraklardan ayrılmak sandığından zor oldu ama önünde uzun bir yol var.",
        },
        basarisizSonuc: {
          para: -10,
          etiket_ekle: ["kutsal_gorevde"],
          zorunlu_sonraki: "zincir_din_yolda_sinav",
          mesaj: "Yola çıkış hazırlıkların sandığından pahalıya patladı.",
          detay: "Yine de kararını verdin; artık bu görevdesin.",
        },
      },
      {
        metin: "Görevi reddet, cemaatinle kal.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ve tanıdık",
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
    id: "zincir_din_yolda_sinav",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["kutsal_gorevde"],
    gorsel: "🌄",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yolda Bir Sınav",
    metin:
      "Görev yerine giden yolda, aç ve parasız bir grup mülteciyle karşılaştın. Yanındaki azıcık erzak ya onları ya seni idare eder.",
    secenekler: [
      {
        metin: "Onlara Gizemli Harita'yı verip eski tapınağın yerini göster.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:gizemli_harita"],
        ipucu: "Gizli Envanter: Hem erzağını korur hem onları kurtarırsın",
        basariliSonuc: {
          ahlak: 30,
          un: 15,
          etiket_sil: ["envanter:gizemli_harita"],
          mesaj: "Mültecilere eski haritayı verip gizli erzak deposunun yolunu tarif ettin. Gözyaşlarıyla ellerini öpüp yola koyuldular.",
          detay: "Bir harita, bir aileyi açlıktan kurtardı. Vicdanın kuş gibi hafif.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Erzağının çoğunu onlarla paylaş.",
        baseBasariSansi: 75,
        ipucu: "Vicdan huzuru, kendi yolculuğun zorlaşır",
        basariliSonuc: {
          ahlak: 22,
          saglik: -10,
          mesaj: "Erzağını paylaştın; kalanıyla zorlanarak da olsa yoluna devam ettin.",
          detay: "Aç kaldığın günler oldu ama o ailenin gözlerindeki minnet hâlâ aklında.",
        },
        basarisizSonuc: {
          saglik: -20,
          ahlak: 15,
          mesaj: "Paylaştığın erzak yetersiz kaldı; kalan yolu aç ve zayıf düşerek tamamladın.",
          detay: "İyilik yapmak seni de yordu ama pişman değilsin.",
        },
      },
      {
        metin: "Kendi erzağını koru, yoluna devam et.",
        baseBasariSansi: 85,
        ipucu: "Güvenli yolculuk, vicdan bedeli",
        basariliSonuc: {
          saglik: 8,
          ahlak: -18,
          mesaj: "Erzağını koruyup görev yerine sağlıklı vardın.",
          detay: "O ailenin yüzünü zaman zaman hatırlıyorsun; kendine haklı sebepler sıralıyorsun.",
        },
        basarisizSonuc: {
          ahlak: -20,
          saglik: -8,
          mesaj: "Erzağını korudun ama yol yine de seni yıprattı; üstelik vicdanın hiç rahat değil.",
          detay: "Hem zorlandın hem de o kararın seninle kaldı.",
        },
      },
    ],
  },
  {
    id: "zincir_din_gorev_donus",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["kutsal_gorevde"],
    yasakliEtiketler: ["kutsal_gorev_bitti"],
    agirlik: 2.1,
    gorsel: "🏠",
    sureYilMin: 2,
    sureYilMax: 4,
    baslik: "Dönüş Zamanı",
    metin:
      "Yıllarca sürdürdüğün uzak görevin ardından üst makam seni geri çağırdı. Görev tamamlandı; şimdi geride bıraktığın hayata dönme vakti.",
    secenekler: [
      {
        metin: "Eski cemaatine dön.",
        baseBasariSansi: 80,
        ipucu: "Tanıdık bir hayata dönüş, değişmiş olabilirsin",
        basariliSonuc: {
          un: 25,
          ahlak: 12,
          etiket_ekle: ["kutsal_gorev_bitti"],
          etiket_sil: ["kutsal_gorevde"],
          mesaj: "Yıllar sonra döndüğünde cemaatin seni bir kahraman gibi karşıladı.",
          detay:
            "Uzak topraklarda gördüklerin seni değiştirmiş. Eski cemaatin aynı ama sen artık eskisi gibi değilsin; bu hem bir kazanç hem bir yalnızlık.",
        },
        basarisizSonuc: {
          un: 10,
          ahlak: 8,
          etiket_ekle: ["kutsal_gorev_bitti"],
          etiket_sil: ["kutsal_gorevde"],
          mesaj: "Döndün ama cemaatin çoğu, yerine gelen yeni görevliye alışmış.",
          detay: "Yıllarca uzakta kalmanın bedeli bu: geri döndüğünde yerin bir başkasınındı artık.",
        },
      },
      {
        metin: "Görev yaptığın topraklarda kal, yeni bir cemaat kur.",
        baseBasariSansi: 65,
        ipucu: "Yeni bir hayat, eski bağların bedeli",
        basariliSonuc: {
          para: 20,
          un: 18,
          ahlak: 10,
          etiket_ekle: ["kutsal_gorev_bitti"],
          etiket_sil: ["kutsal_gorevde"],
          mesaj: "O topraklarda kalıp kendi cemaatini kurdun; yıllar içinde küçük bir topluluk oluştu.",
          detay: "Eski hayatın artık uzak bir anı. Burada, sıfırdan kurduğun bir şey var ve bu sana ait.",
        },
        basarisizSonuc: {
          para: -15,
          ahlak: 8,
          etiket_ekle: ["kutsal_gorev_bitti"],
          etiket_sil: ["kutsal_gorevde"],
          mesaj: "Kalma kararın zor geldi; yeterli destek bulamayınca küçük bir cemaatle idare ettin.",
          detay: "Kolay olmadı ama geride hiçbir şey bırakmadığını da biliyorsun; her şeyi baştan kurman gerekiyor.",
        },
      },
    ],
  },

  // ============================================================
  // ORTA ÇAĞ — ASKER (ek olaylar ve Hayvan Etkileşimi)
  // ============================================================
  {
    id: "oc_asker_at_hirsizi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    gorsel: "🐴",
    baslik: "Çalınan At",
    metin: "Sabah nöbetine çıktığında atının bağlı olduğu yerin boş olduğunu gördün. Bir çocuk, gece bir adamın atı çözüp götürdüğünü gördüğünü söylüyor.",
    secenekler: [
      {
        metin: "Evcil Kurdunu hırsızın kokusuyla peşine sal!",
        baseBasariSansi: 95,
        gerekliEtiketler: ["evcil_hayvan_tur:Kurt"],
        ipucu: "Gizli Şık: Kurtlar asla koku kaybetmez",
        basariliSonuc: {
          para: 25,
          un: 20,
          mesaj: "Kurdun ormanın derinliklerinde hırsızı köşeye sıkıştırdı. Adam korkudan bayılmıştı. Atını ve adamın üzerindeki tüm altınları aldın.",
          detay: "Kışlada artık kimse senin eşyalarına dokunmaya cesaret edemiyor."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Peşine düş, atını geri al.",
        baseBasariSansi: 55,
        ipucu: "Atını kurtarabilir, tuzağa da düşebilirsin",
        basariliSonuc: { para: 5, un: 10, mesaj: "Hırsızı bir handa yakaladın; atını geri aldın, adam kaçtı.", detay: "Kimse senden çalınan şeyi geri almayı beklemedi; bunu yapman seni kışlada konuşulur biri yaptı." },
        basarisizSonuc: { saglik: -18, para: -10, mesaj: "Hırsız yalnız değilmiş; pusuya düşüp dövülerek geri döndün.", detay: "Atını hâlâ bulamadın, üstüne bir de dayak yedin. Nöbetçi subayı bu gecikmeyi hoş karşılamadı." },
      },
      {
        metin: "Şikayet et, yeni at için ödenek iste.",
        baseBasariSansi: 70,
        ipucu: "Güvenli ama yavaş bürokrasi",
        basariliSonuc: { para: -10, mesaj: "Ödenek çıktı ama tam istediğin cinsten bir at değildi.", detay: "Bürokrasi yavaş işledi ama en azından atsız kalmadın." },
        basarisizSonuc: { para: -20, un: -5, mesaj: "Ödenek talebin reddedildi; yeni atı kendi cebinden almak zorunda kaldın.", detay: "'Atına iyi bakmalıydın' dediler; adalet bazen böyle acımasız." },
      },
    ],
  },
  {
    id: "oc_asker_esire_merhamet",
    kategori: "savas",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    gorsel: "⛓️",
    baslik: "Yaralı Düşman",
    metin: "Çarpışma sonrası yerde yaralı bir düşman askeri buldun. Silahsız, kanıyor ve gözlerinde ölüm korkusu var. Komutanın esir alınmamasını emretmişti.",
    secenekler: [
      {
        metin: "Emre karşı gel, adamı sağ bırak.",
        baseBasariSansi: 55,
        ipucu: "Vicdan rahatlığı, emre itaatsizlik riski",
        basariliSonuc: { ahlak: 25, un: -5, mesaj: "Adamı bıraktın; kimse görmedi, sen de kimseye söylemedin.", detay: "Yıllar sonra bile o adamın gözlerindeki bakışı hatırlıyorsun ve pişman değilsin." },
        basarisizSonuc: { ahlak: 15, un: -25, para: -10, mesaj: "Bir subay seni gördü; emre itaatsizlikten disiplin cezası aldın.", detay: "Doğru bildiğini yaptın ve bunun bir bedeli oldu; yine de vicdanın rahat." },
      },
      {
        metin: "Emri uygula.",
        baseBasariSansi: 85,
        ipucu: "Askeri disiplin, ahlaki bedel",
        basariliSonuc: { ahlak: -22, un: 5, mesaj: "Emri yerine getirdin; komutan memnun kaldı.", detay: "O gece uyurken adamın yüzü gözünün önüne geldi; sabah kimseye bundan bahsetmedin." },
        basarisizSonuc: { ahlak: -25, saglik: -5, mesaj: "Elin titredi, iş uzadı; herkes rahatsız bir sessizlikle izledi.", detay: "Bazı emirler yerine getirilse bile insanı içinden bir şey eksiltiyor." },
      },
    ],
  },
  {
    id: "oc_asker_kacak_silah_ticareti",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    gorsel: "🗡️",
    baslik: "Silah Kaçakçılığı",
    metin: "Bir tüccar, ordu depolarından çaldığın silahları düşman tarafındaki alıcılara satmayı öneriyor. Fiyat baştan çıkarıcı, risk de bir o kadar büyük.",
    secenekler: [
      {
        metin: "Teklifi kabul et.",
        baseBasariSansi: 45,
        ipucu: "Büyük para, vatana ihanet suçlaması riski",
        basariliSonuc: { para: 50, ahlak: -30, mesaj: "Silahlar el değiştirdi, kimse fark etmedi.", detay: "Kasan doldu ama o silahların kimi vurduğunu hiç öğrenmeyeceksin ve bu iyi bir şey değil." },
        basarisizSonuc: { olum: true, mesaj: "Depo sayımı sırasında eksikler fark edildi ve iz sürüldü. Vatana ihanetten sahra mahkemesinde asıldın." },
      },
      {
        metin: "Teklifi reddet, durumu komutana bildir.",
        baseBasariSansi: 70,
        ipucu: "Onurlu ama düşman kazandırabilir",
        basariliSonuc: { un: 20, para: 10, mesaj: "İhbarın sayesinde kaçakçılık şebekesi çökertildi; ödüllendirildin.", detay: "Adın 'güvenilir asker' diye anıldı; bazı teklifler artık sana hiç gelmiyor." },
        basarisizSonuc: { un: -5, mesaj: "İhbarın ciddiye alınmadı, tüccar başka bir askeri buldu.", detay: "Doğru olanı yaptın ama kimse teşekkür etmedi." },
      },
    ],
  },
  {
    id: "oc_asker_manastir_talani",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    gorsel: "⛪",
    baslik: "Manastır Emri",
    metin: "Komutanın, düşman toprağındaki bir manastırın yağmalanmasını emretti. Rahipler silahsız, hazineleri ise savaş masraflarını karşılayabilecek kadar zengin.",
    secenekler: [
      {
        metin: "Emri uygula, manastırı yağmala.",
        baseBasariSansi: 75,
        ipucu: "Ganimet ve terfi, dini vicdan bedeli",
        basariliSonuc: { para: 35, un: 10, ahlak: -28, mesaj: "Manastırın hazinesi orduya büyük katkı sağladı; komutan seni takdir etti.", detay: "Rahiplerin sessiz bakışları hâlâ aklında; bazı zaferlerin tadı acı oluyor." },
        basarisizSonuc: { ahlak: -20, saglik: -12, mesaj: "Rahipler kutsal eşyaları koruma uğruna direndi; kısa ama şiddetli bir arbede yaşandı.", detay: "Hazineyi aldın ama bu kadar zorlu olacağını beklememiştin." },
      },
      {
        metin: "Emri sessizce sabote et, manastırı uyar.",
        baseBasariSansi: 45,
        ipucu: "Vicdan rahatlığı, açığa çıkarsa idam",
        basariliSonuc: { ahlak: 28, un: -10, mesaj: "Rahipler zamanında kaçtı, hazinelerini de yanlarında götürdüler.", detay: "Komutan öfkeliydi ama kimse senden şüphelenmedi; içinde derin bir huzur var." },
        basarisizSonuc: { olum: true, mesaj: "Bir yoldaşın seni komutana ihbar etti. Düşmana yardım ve yataklıktan sahra mahkemesinde idam edildin." },
      },
    ],
  },
  {
    id: "oc_asker_terfi_sinavi",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    minUn: 20,
    gorsel: "🎖️",
    baslik: "Terfi Sınavı",
    metin: "Onbaşılık için sınava girme hakkın var. Sınav hem fiziksel hem de bilgi gerektiriyor; kazanırsan maaşın ve saygınlığın artacak.",
    secenekler: [
      {
        metin: "Sıkı çalış, sınava hazırlan.",
        baseBasariSansi: 60,
        ipucu: "Emek karşılığında kalıcı kazanç",
        basariliSonuc: { un: 20, para: 15, maas_carpani: 1.15, mesaj: "Sınavı başarıyla geçtin; artık onbaşısın.", detay: "Aylarca çalıştın ve karşılığını aldın; astların artık sana farklı bakıyor." },
        basarisizSonuc: { un: -10, saglik: -8, mesaj: "Fiziksel bölümde tükendin, sınavı geçemedin.", detay: "Yıl boyu bir daha deneme hakkın yok; emeğin şimdilik boşa gitti." },
      },
      {
        metin: "Sınav görevlisine rüşvet ver.",
        baseBasariSansi: 55,
        maliyet: 18,
        ipucu: "Kestirme yol, yakalanırsan büyük utanç",
        basariliSonuc: { para: -18, un: 12, ahlak: -18, mesaj: "Notların 'yeterli' çıktı; kimse sorgulamadı.", detay: "Onbaşı oldun ama bunu hak etmediğini biliyorsun; bu bilgi seni zaman zaman rahatsız ediyor." },
        basarisizSonuc: { para: -18, un: -25, mesaj: "Rüşvet girişimin sınav kurulunca fark edildi; hem terfi hem itibar gitti.", detay: "Artık kimse senin sınavlarına güvenmiyor; bu damga kolay silinmeyecek." },
      },
    ],
  },
  {
    id: "oc_asker_kislada_hirsizlik",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    gorsel: "🎒",
    baslik: "Kışlada Hırsızlık",
    metin: "Kışlada birinin eşyaları çalınıyor ve şüpheler yeni gelen genç bir askere yöneldi. Sen de bir şeyler gördün ama tam emin değilsin.",
    secenekler: [
      {
        metin: "Gördüğünü anlat, gerçek hırsızı araştır.",
        baseBasariSansi: 55,
        ipucu: "Adalet ya da yanlış birine iftira",
        basariliSonuc: { un: 18, ahlak: 15, mesaj: "Araştırman gerçek hırsızı ortaya çıkardı; genç asker aklandı.", detay: "Adaletsizliğe göz yummadın; bu, kışlada sana saygı kazandırdı." },
        basarisizSonuc: { un: -10, ahlak: -8, mesaj: "Yanlış kişiyi işaret ettin; masum bir asker cezalandırıldı.", detay: "Hatanı fark ettiğinde iş işten geçmişti; bu seni uzun süre rahatsız etti." },
      },
      {
        metin: "Karışma, kendi işine bak.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama vicdan sızlatır",
        basariliSonuc: { mesaj: "Olaya karışmadın; genç asker cezalandırıldı, sen sessiz kaldın.", detay: "Belki masumdu belki değildi; hiçbir zaman öğrenmeyeceksin ve bu seni rahatsız ediyor." },
        basarisizSonuc: { un: -8, mesaj: "Sessiz kalman fark edildi; 'bir şeyler biliyordu' diye konuşuldu.", detay: "Karışmamak bile bazen bir bedel getiriyor." },
      },
    ],
  },
  {
    id: "oc_asker_at_yarisi_bahsi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    agirlik: 0.6,
    gorsel: "🏇",
    baslik: "Kışla At Yarışı",
    metin: "Askerler arasında düzenlenen gayri resmi at yarışına katılman için ısrar ediyorlar. Ödül kesesi büyük ama komutan bu tür eğlenceleri hoş karşılamıyor.",
    secenekler: [
      {
        metin: "Yarışa katıl.",
        baseBasariSansi: 50,
        maliyet: 10,
        ipucu: "Eğlenceli ve kârlı, sakatlanma riski",
        basariliSonuc: { para: 25, un: 15, mesaj: "Yarışı kıl payı kazandın; kışlada uzun süre konuşuldu.", detay: "Komutan duyunca kaşlarını çattı ama gülümsemesini gizleyemedi." },
        basarisizSonuc: { saglik: -15, para: -10, mesaj: "Attan düştün, hem parayı hem gururu kaybettin.", detay: "Diğer askerler haftalarca bunu unutmadı; her fırsatta hatırlattılar." },
      },
      {
        metin: "Katılma, kurallara uy.",
        baseBasariSansi: 90,
        ipucu: "Sıkıcı ama güvenli",
        basariliSonuc: { mesaj: "Yarışa katılmadın; komutan disiplinini fark etti.", detay: "Diğerleri eğlenirken sen göreve odaklandın; kimse bunu fark etmedi ama sen ettin." },
        basarisizSonuc: { un: -5, mesaj: "Yarışa katılmayışın 'korkaklık' diye şakayla karışık dile getirildi.", detay: "Kurallara uymak bazen alay konusu oluyor." },
      },
    ],
  },
  {
    id: "oc_asker_komutan_kizina_ilgi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    minYas: 17,
    gorsel: "🌹",
    baslik: "Komutanın Kızı",
    metin: "Komutanın kızı seninle göz göze gelmeye başladı; ufak notlar, gizli gülümsemeler. Bu, hem güzel bir ihtimal hem de büyük bir risk taşıyor.",
    secenekler: [
      {
        metin: "İlgiye karşılık ver, gizlice görüş.",
        baseBasariSansi: 50,
        ipucu: "Güzel bir aşk ya da komutanın gazabı",
        basariliSonuc: { ahlak: 10, un: 12, mesaj: "İlişkiniz gizli kalmayı başardı; mutlusun.", detay: "Bazı akşamlar risk almaya değermiş; en azından şimdilik." },
        basarisizSonuc: { un: -25, para: -15, mesaj: "Komutan ilişkinizi öğrendi; seni uzak bir garnizona sürdü.", detay: "Aşk güzeldi ama bedeli ağırdı; kışlada adın uzun süre fısıldandı." },
      },
      {
        metin: "Mesafeni koru, riske girme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama pişmanlık verebilir",
        basariliSonuc: { ahlak: 5, mesaj: "Mesafeni korudun; kariyerin güvende kaldı.", detay: "Bazen doğru karar, içini biraz burkan karardır." },
        basarisizSonuc: { mesaj: "Mesafeni korumana rağmen dedikodular başladı; hiçbir şey yapmadığın halde suçlandın.", detay: "Bazen masumiyetin bile bir bedeli oluyor." },
      },
    ],
  },
  {
    id: "oc_asker_casus_supheli",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    gorsel: "🕵️",
    baslik: "Şüpheli Yabancı",
    metin: "Kale civarında dolanan bir yabancı dikkatini çekti; haritalara bakıyor, sorular soruyor. Casus olabilir ya da sadece meraklı bir gezgin.",
    secenekler: [
      {
        metin: "Yakala ve sorguya çek.",
        baseBasariSansi: 60,
        ipucu: "Doğruysa büyük başarı, yanlışsa itibar kaybı",
        basariliSonuc: { un: 25, para: 15, mesaj: "Adam gerçekten casusmuş; itiraflarıyla bir komployu ortaya çıkardın.", detay: "Kale komutanı seni bizzat tebrik etti; adın garnizonun her yerinde konuşuldu." },
        basarisizSonuc: { un: -15, para: -10, mesaj: "Adam masum bir tüccarmış; haksız yere tutukladığın için özür dilemek zorunda kaldın.", detay: "Şüphen haklı görünüyordu ama yanılmıştın; bu tür hatalar unutulmuyor." },
      },
      {
        metin: "Uzaktan izle, kanıt topla.",
        baseBasariSansi: 65,
        ipucu: "Daha güvenli, yavaş",
        basariliSonuc: { un: 18, mesaj: "Sabırla izleyip sağlam kanıt topladın; casus tuzağa düştü.", detay: "Acele etmeden doğru sonuca ulaştın; komutan yaklaşımını beğendi." },
        basarisizSonuc: { un: -8, mesaj: "İzlerken kayboldu; adam ortadan yok oldu.", detay: "Belki gerçekten casustu, belki değildi; artık bilemeyeceksin." },
      },
    ],
  },
  {
    id: "oc_asker_savas_ganimeti_paylasimi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    gorsel: "💎",
    baslik: "Ganimet Paylaşımı",
    metin: "Ele geçirilen kaleden çıkan ganimetin paylaşımında adaletsizlik var; subaylar aslan payını alıyor, sıradan askerlere kırıntı kalıyor.",
    secenekler: [
      {
        metin: "Askerler adına itiraz et.",
        baseBasariSansi: 50,
        ipucu: "Adalet ya da 'baş belası' damgası",
        basariliSonuc: { un: 22, para: 15, ahlak: 15, mesaj: "İtirazın işe yaradı; paylaşım yeniden düzenlendi.", detay: "Sıradan askerler seni sözcüleri olarak görmeye başladı; subaylar ise seni izlemeye." },
        basarisizSonuc: { un: -18, mesaj: "İtirazın 'disiplinsizlik' sayıldı; paylaşım aynı kaldı, sen cezalandırıldın.", detay: "Doğru olanı söyledin ve sistem seni susturdu." },
      },
      {
        metin: "Sessiz kal, payına razı ol.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama adaletsizliğe ortak olursun",
        basariliSonuc: { para: 10, mesaj: "Payını aldın, ses çıkarmadın.", detay: "Adil değildi ama en azından başın belaya girmedi." },
        basarisizSonuc: { ahlak: -10, mesaj: "Sessizliğin bazı yoldaşların gözünde seni 'subayların adamı' yaptı.", detay: "Bazen hiçbir şey yapmamak bile bir taraf tutmak sayılıyor." },
      },
    ],
  },
  {
    id: "oc_asker_zehirli_kuyu_taktigi",
    kategori: "savas",
    cag: "Orta Çağ",
    meslekler: ["Asker"],
    maxAhlak: 55,
    gorsel: "☠️",
    baslik: "Kirli Bir Taktik",
    metin: "Kuşatma uzadı; bir subay, düşman kalesinin su kaynağını zehirlemeyi öneriyor. Askeri açıdan etkili ama sivil kayıplar kaçınılmaz.",
    secenekler: [
      {
        metin: "Öneriyi destekle, uygulanmasına yardım et.",
        baseBasariSansi: 65,
        ipucu: "Hızlı zafer, ağır vicdan yükü",
        basariliSonuc: { un: 20, para: 15, ahlak: -30, mesaj: "Taktik işe yaradı; kale günler içinde teslim oldu.", detay: "Zafer hızlı geldi ama içindeki sivil kayıpları hiç sormadın; sormaya da cesaretin yok." },
        basarisizSonuc: { ahlak: -25, un: -10, mesaj: "Zehir fark edildi, düşman farklı bir kaynak buldu; sadece itibarın zedelendi.", detay: "Kirli bir yol denedin ve işe yaramadı bile; hiçbir kazancın olmadı." },
      },
      {
        metin: "Öneriye karşı çık, geleneksel yolu savun.",
        baseBasariSansi: 55,
        ipucu: "Onurlu ama kuşatmayı uzatır",
        basariliSonuc: { ahlak: 25, un: 10, mesaj: "İtirazın dinlendi; taktik uygulanmadı, kuşatma uzun sürdü ama onurlu kaldı.", detay: "Bazı subaylar seni 'yumuşak' buldu ama sen kendinle barışıksın." },
        basarisizSonuc: { un: -12, ahlak: 20, mesaj: "İtirazına rağmen taktik uygulandı; sen sadece izlemek zorunda kaldın.", detay: "Karşı çıktın ve dinlenmedin; bazen doğru olanı söylemek yetmiyor." },
      },
    ],
  },

  // ============================================================
  // ORTA ÇAĞ — TÜCCAR (ek olaylar)
  // ============================================================
  {
    id: "oc_tuccar_sahte_altin",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    gorsel: "🪙",
    baslik: "Şüpheli Sikkeler",
    metin: "Büyük bir ödeme aldın ama sikkelerin bazıları hafif geliyor; sahte olabilirler. Onları harcarsan fark eden olmayabilir, ya da başın büyük belaya girebilir.",
    secenekler: [
      {
        metin: "Sikkeleri sessizce harcamaya devam et.",
        baseBasariSansi: 65,
        ipucu: "Zararını gizler, yakalanırsan ağır suçlama",
        basariliSonuc: { para: 15, ahlak: -15, mesaj: "Sikkeler fark edilmeden elden çıktı; zararın telafi oldu.", detay: "Kimseye bir şey söylemedin; bu senin küçük sırrın oldu." },
        basarisizSonuc: { para: -25, un: -20, ahlak: -12, mesaj: "Bir esnaf sahte sikkeyi fark etti ve seni sahtekârlıkla suçladı.", detay: "Sahtekârlığı sen yapmamıştın ama şimdi adın ona karıştı." },
      },
      {
        metin: "Sikkeleri değiştirdiğin kişiye geri götür.",
        baseBasariSansi: 60,
        ipucu: "Dürüst ama zaman ve para kaybı",
        basariliSonuc: { para: -5, un: 15, ahlak: 15, mesaj: "Adam mahcup oldu, sikkeleri değiştirdi ve senden özür diledi.", detay: "Dürüstlüğün pazarda konuşuldu; bazı tüccarlar artık seninle daha rahat iş yapıyor." },
        basarisizSonuc: { para: -15, mesaj: "Adam sikkelerin sahte olduğunu inkâr etti; parayı geri alamadın.", detay: "Doğru olanı yapmaya çalıştın ve zarar sende kaldı." },
      },
    ],
  },
  {
    id: "oc_tuccar_kervansaray_yangini",
    kategori: "saglik",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    gorsel: "🔥",
    baslik: "Kervansaray Yangını",
    metin: "Geceyi geçirdiğin kervansarayda yangın çıktı. Malların bir depoda, hayvanların ahırda. İkisini de kurtaracak vaktin yok.",
    secenekler: [
      {
        metin: "Malları kurtar.",
        baseBasariSansi: 55,
        ipucu: "Sermayeni korur, hayvanları kaybedersin",
        basariliSonuc: { para: 10, saglik: -15, mesaj: "Dumanın içinde malların çoğunu kurtardın; hayvanların ise kayboldu.", detay: "Sermayen sağlam kaldı ama yenilerini bulmak zaman alacak." },
        basarisizSonuc: { para: -30, saglik: -25, mesaj: "Duman seni bayılttı; hem mallar hem hayvanlar yandı.", detay: "Kendini zar zor dışarı attın; kervansarayın külleri arasında hiçbir şeyin kalmadı." },
      },
      {
        metin: "Hayvanları kurtar.",
        baseBasariSansi: 65,
        ipucu: "Ulaşım aracını korur, malını kaybedersin",
        basariliSonuc: { para: -15, saglik: -10, mesaj: "Atları ve develeri kurtardın; en azından yola devam edebilirsin.", detay: "Mallar yandı ama hayvanların olması yeni bir başlangıç için yeterli." },
        basarisizSonuc: { para: -35, saglik: -20, mesaj: "Hayvanlar panikle kaçtı, sen de dumana boğuldun; her şeyi kaybettin.", detay: "Bu gece seni sıfırdan başlatan gecelerden biri oldu." },
      },
    ],
  },
  {
    id: "oc_tuccar_cifte_defter",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    gorsel: "📒",
    baslik: "Çifte Defter",
    metin: "Ortağın, vergi memurlarına gösterilecek sahte bir defter tutmayı öneriyor; gerçek kazancın çok azı kayda geçecek, gerisi cebinizde kalacak.",
    secenekler: [
      {
        metin: "Ortağını loncaya sat, dükkanın tamamına el koy!",
        baseBasariSansi: 60,
        maxAhlak: 45,
        ipucu: "Sadece ahlaksızlara açık: Çok kârlı bir ihanet",
        basariliSonuc: {
          para: 50,
          ahlak: -35,
          un: 15,
          mesaj: "Ortağını maliyeye ihbar ettin! Adam zindana atıldı, sen ise 'dürüst vatandaş' olarak tüm hisselerini ucuza kapattın.",
          detay: "Zenginleştin ama adamın ailesi seni asla affetmeyecek."
        },
        basarisizSonuc: {
          para: -40,
          un: -30,
          mesaj: "Müfettişler her ikinizi de suçlu buldu. Oyunun geri tepti, tüm mallarına el konuldu."
        }
      },
      {
        metin: "Öneriyi kabul et.",
        baseBasariSansi: 60,
        ipucu: "Vergiden büyük tasarruf, denetimde büyük risk",
        basariliSonuc: { para: 35, ahlak: -20, mesaj: "Yıllarca vergiden kaçındın; kazancın gerçek değerinin çok üstünde kaldı.", detay: "Devlet dairesindeki tanıdıkların bile bundan habersiz; bu sırrı sıkı tutuyorsun." },
        basarisizSonuc: { para: -45, un: -25, ahlak: -15, mesaj: "Denetim ekibi çifte defteri buldu; ağır vergi cezası ve dükkânına el konuldu.", detay: "Yıllarca biriktirdiğin her şey bir öğleden sonra elinden alındı." },
      },
      {
        metin: "Reddet, tek ve dürüst defter tut.",
        baseBasariSansi: 85,
        ipucu: "Daha az kâr, tam güvenlik",
        basariliSonuc: { ahlak: 15, un: 8, mesaj: "Dürüst kaldın; denetimler seni hiç endişelendirmiyor.", detay: "Ortağın seni 'fazla temkinli' buluyor ama sen geceleri rahat uyuyorsun." },
        basarisizSonuc: { para: -10, mesaj: "Ortağın reddini kabullenmedi ve ortaklığı tek başına bozdu.", detay: "Dürüstlüğün ortaklığına mal oldu ama vicdanına dokunmadı." },
      },
    ],
  },
  {
    id: "oc_tuccar_kizinin_cehizi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    minYas: 28,
    gorsel: "👰",
    baslik: "Kızının Çeyizi",
    metin: "Kızın evlenme yaşına geldi ve iyi bir aileden talip çıktı. Ama istenen çeyiz, birikiminin neredeyse tamamı demek.",
    secenekler: [
      {
        metin: "Tüm birikimini çeyize har, iyi bir evlilik sağla.",
        baseBasariSansi: 80,
        maliyet: 30,
        ipucu: "Kızının geleceği, senin sermayen",
        basariliSonuc: { para: -30, ahlak: 20, un: 15, mesaj: "Çeyiz beğenildi, düğün görkemli oldu; kızın mutlu bir hayata başladı.", detay: "Sermayeni sıfırladın ama kızının gözlerindeki mutluluk buna değdi." },
        basarisizSonuc: { para: -30, un: -10, mesaj: "Çeyiz verildi ama damat ailesi yine de burun kıvırdı.", detay: "Elinden geleni yaptın, yeterli bulunmaman seni yordu." },
      },
      {
        metin: "Daha mütevazı bir çeyiz teklif et.",
        baseBasariSansi: 55,
        ipucu: "Sermayeni korur, evliliği riske atar",
        basariliSonuc: { para: -12, ahlak: 8, mesaj: "Aile mütevazı teklifi kabul etti; düğün sade ama sıcak geçti.", detay: "Kızın parayla değil, seninle gurur duyduğunu söyledi." },
        basarisizSonuc: { para: -12, ahlak: -10, un: -10, mesaj: "Aile teklifi yetersiz buldu, evlilik bozuldu.", detay: "Kızının hayal kırıklığı, kaybettiğin paradan çok daha ağır geldi." },
      },
    ],
  },
  {
    id: "oc_tuccar_yabanci_dil_bilgini",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    gorsel: "🗣️",
    baslik: "Uzak Diyar Tüccarı",
    metin: "Hiç bilmediğin bir dilde konuşan bir tüccar kervanı şehre geldi. Kimse anlaşamıyor ama mallarının çok değerli olduğu belli.",
    secenekler: [
      {
        metin: "Evcil papağanının taklit yeteneğini kullanarak buzları kır.",
        baseBasariSansi: 90,
        gerekliEtiketler: ["evcil_hayvan_tur:Papağan"],
        ipucu: "Gizli Şık: Tüccarlar komik ve zeki insanları sever",
        basariliSonuc: {
          para: 50,
          un: 20,
          kultur: 15,
          etiket_ekle: ["uzak_diyar_baglantisi"],
          mesaj: "Papağanın yabancıların garip seslerini taklit edince tüm kervan kahkahaya boğuldu. Aranızda harika bir bağ kuruldu ve en iyi fiyattan anlaştınız!"
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Bir tercüman tut, doğrudan pazarlık yap.",
        baseBasariSansi: 60,
        maliyet: 15,
        ipucu: "Doğrudan avantaj, tercüman güvenilmez olabilir",
        basariliSonuc: { para: 40, un: 10, kultur: 12, etiket_ekle: ["uzak_diyar_baglantisi"], mesaj: "Tercüman sayesinde en iyi malları en iyi fiyata aldın.", detay: "Bu tüccarlar her yıl aynı mevsimde geliyor; artık senin müşterin oldular." },
        basarisizSonuc: { para: -20, kultur: 4, mesaj: "Tuttuğun tercüman fiyatları yanlış çevirdi; zararına alışveriş yaptın.", detay: "İletişimsizlik bazen paradan daha pahalıya mal oluyor." },
      },
      {
        metin: "İşaretlerle anlaşmayı dene, riske girme.",
        baseBasariSansi: 65,
        ipucu: "Ücretsiz ama sınırlı",
        basariliSonuc: { para: 15, kultur: 8, mesaj: "El kol hareketleriyle küçük ama karlı bir alışveriş yaptın.", detay: "Kervanın lideri gülerek elini sıktı; belki dil ortak olmasa da ticaret ortaktı." },
        basarisizSonuc: { para: -8, mesaj: "Yanlış anlaşılma yüzünden istemediğin bir malı almak zorunda kaldın.", detay: "Bazen sessizlik anlaşmadan daha çok yanlış anlaşılmaya yol açıyor." },
      },
    ],
  },
  {
    id: "oc_tuccar_deniz_firtinasi",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    gorsel: "🌊",
    baslik: "Fırtınadaki Gemi",
    metin: "Kiraladığın gemi büyük bir fırtınaya yakalandı. Kaptan haber gönderdi: yükün bir kısmını denize atmazlarsa gemi batabilir.",
    secenekler: [
      {
        metin: "Kaptana yükün yarısını atma izni ver.",
        baseBasariSansi: 75,
        ipucu: "Kısmi zarar, geminin ve kalan yükün kurtulması",
        basariliSonuc: { para: -20, mesaj: "Gemi ve kalan yükün fırtınayı atlattı.", detay: "Zarar büyüktü ama her şeyi kaybetmedin; kaptan kararını doğru verdiğini söyledi." },
        basarisizSonuc: { para: -30, mesaj: "Attıkları yeterli olmadı, gemi yine de ağır hasar aldı.", detay: "Hem yükün gitti hem gemi tamiratı cebinden çıktı." },
      },
      {
        metin: "Hiçbir şey atılmasın, riski göze al.",
        baseBasariSansi: 40,
        ipucu: "Ya tüm yükü korursun ya da her şeyi kaybedersin",
        basariliSonuc: { para: 20, un: 10, mesaj: "Gemi mucizevi şekilde fırtınayı yükle birlikte atlattı.", detay: "Kaptan bir daha seninle çalışmak istemediğini söyledi ama bu sefer kazandın." },
        basarisizSonuc: { para: -55, mesaj: "Gemi battı; yükün, tayfanın bir kısmı ve yatırımın tamamen kayboldu.", detay: "Bu, ticaret hayatının en kötü haftalarından biri oldu." },
      },
    ],
  },
  {
    id: "oc_tuccar_haraç_talebi",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    gorsel: "🗡️",
    baslik: "Yol Kesen Beyzade",
    metin: "Topraklarından geçtiğin küçük bir beyzade, 'geçiş harcı' adı altında keyfi bir haraç istiyor. Yasal değil ama silahlı adamları var.",
    secenekler: [
      {
        metin: "Öde, yoluna devam et.",
        baseBasariSansi: 90,
        maliyet: 15,
        ipucu: "Güvenli ama emsal oluşturur",
        basariliSonuc: { para: -15, mesaj: "Haracı ödedin, sorunsuzca geçtin.", detay: "Bir dahaki sefere yine burada olacağını biliyorsun ve bu seni rahatsız ediyor." },
        basarisizSonuc: { para: -25, mesaj: "Beyzade haracı 'unuttuğun' bahanesiyle iki katına çıkardı.", detay: "Keyfi güç karşısında pazarlık payın yok gibi." },
      },
      {
        metin: "Ödemeyi reddet, üst otoriteye şikayet et.",
        baseBasariSansi: 45,
        ipucu: "Uzun vadede çözüm, kısa vadede tehlike",
        basariliSonuc: { un: 22, para: 5, mesaj: "Şikayetin karşılık buldu; beyzade uyarıldı, haraç kaldırıldı.", detay: "Diğer tüccarlar sana teşekkür etti; bu yoldan geçmek artık daha güvenli." },
        basarisizSonuc: { para: -20, saglik: -15, mesaj: "Beyzadenin adamları seni yolda durdurup 'ders verdi'.", detay: "Otoriteye güvendin ve otorite çok geç kaldı." },
      },
    ],
  },
  {
    id: "oc_tuccar_kalp_para_uretimi",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    maxAhlak: 45,
    gorsel: "🔨",
    baslik: "Sahte Sikke Darbı",
    metin: "Tanıdığın bir kuyumcu, gerçeğinden ayırt edilemeyen sahte sikkeler basabileceğini söylüyor. Ortak olursan ikiniz de zengin olabilirsiniz — ya da ikiniz de asılabilirsiniz.",
    secenekler: [
      {
        metin: "Ortaklığı kabul et.",
        baseBasariSansi: 40,
        ipucu: "Muazzam servet, yakalanırsan idam",
        basariliSonuc: { para: 70, ahlak: -30, mesaj: "Sahte sikkeler piyasada sorunsuzca dolaştı; servetin kat kat arttı.", detay: "Bu parayla kurduğun hayat, temelinde bir yalan taşıyor ve sen bunu biliyorsun." },
        basarisizSonuc: { olum: true, mesaj: "Zanaatkârlar loncası sahte sikkeleri tespit etti ve iz sizi buldu. Kalpazanlık, en ağır suçlardan sayıldı ve idam edildin." },
      },
      {
        metin: "Teklifi reddet, kuyumcuyu ihbar et.",
        baseBasariSansi: 60,
        ipucu: "Onurlu ama tehlikeli bir düşman kazandırır",
        basariliSonuc: { un: 25, ahlak: 22, mesaj: "İhbarın sayesinde kalpazanlık şebekesi çökertildi.", detay: "Lonca seni ödüllendirdi ama kuyumcunun akrabaları seni asla affetmeyecek." },
        basarisizSonuc: { para: -15, un: -8, mesaj: "İhbarın kanıtsız bulundu, kuyumcu seni iftiracılıkla suçladı.", detay: "Doğruyu söyledin ve buna inanan olmadı." },
      },
    ],
  },
  {
    id: "oc_tuccar_kervan_rehberi_ihanet",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    gorsel: "🧭",
    baslik: "Rehberin Şüpheli Yolu",
    metin: "Tuttuğun kervan rehberi, bilinen ana yol yerine ıssız bir kestirmeden gitmeyi öneriyor. Zamandan kazandırır ama neden bu kadar ısrarcı olduğunu bilmiyorsun.",
    secenekler: [
      {
        metin: "Rehbere güven, kestirmeden git.",
        baseBasariSansi: 50,
        ipucu: "Zaman kazanırsın ya da tuzağa düşersin",
        basariliSonuc: { para: 20, mesaj: "Kestirme gerçekten işe yaradı; rakiplerinden önce pazara vardın.", detay: "Rehber içten içe gülümsedi; belki de sadece iyi bir rehberdi." },
        basarisizSonuc: { para: -40, saglik: -15, mesaj: "Kestirme bir haydut tuzağıydı; rehber onlarla anlaşmıştı.", detay: "Malların gitti, rehber ortadan kayboldu; bu dersi pahalıya öğrendin." },
      },
      {
        metin: "Israrına rağmen ana yoldan git.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama yavaş",
        basariliSonuc: { para: 8, mesaj: "Ana yoldan güvenle vardın; rehber suratını astı ama sorun çıkmadı.", detay: "İçgüdülerine güvenmek bazen en iyi ticaret stratejisidir." },
        basarisizSonuc: { para: -10, mesaj: "Ana yol da tıkalıydı; gecikme yüzünden bazı müşterilerini kaybettin.", detay: "Temkinli olmak bile bazen bir bedel getiriyor." },
      },
    ],
  },
  {
    id: "oc_tuccar_zanaatkar_cirak_kapma",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    gorsel: "🧵",
    baslik: "Yetenekli Çırak",
    metin: "Rakip bir ustanın yanında çalışan olağanüstü yetenekli bir çırağı fark ettin. Onu kendi yanına çekebilirsin ama bu, ustasıyla düşman olmak demek.",
    secenekler: [
      {
        metin: "Çırağa gizlice daha iyi bir teklif yap.",
        baseBasariSansi: 55,
        ipucu: "Yetenek kazanırsın, düşman da kazanırsın",
        basariliSonuc: { para: 30, un: -8, maas_carpani: 1.1, etiket_ekle: ["yetenekli_cirak"], mesaj: "Çırak teklifini kabul etti; işlerinin kalitesi gözle görülür arttı.", detay: "Eski ustası artık seninle konuşmuyor ama yeni çırağın işini fazlasıyla telafi ediyor." },
        basarisizSonuc: { para: -12, un: -15, mesaj: "Çırak teklifini ustasına anlattı; sen 'ahlaksız rakip' diye damgalandın.", detay: "Loncada bu tür 'çırak kapma' girişimleri hoş karşılanmıyor." },
      },
      {
        metin: "Dürüst kal, kendi çırağını yetiştir.",
        baseBasariSansi: 70,
        ipucu: "Yavaş ama sağlam ve itibarlı",
        basariliSonuc: { para: 15, ahlak: 12, mesaj: "Kendi çırağını sıfırdan yetiştirdin; zaman aldı ama sadakati tamdı.", detay: "Yavaş büyüyen ağaçlar daha derin kök salar derler; senin işin de öyle oldu." },
        basarisizSonuc: { para: -10, mesaj: "Yetiştirdiğin çırak yeteneksiz çıktı, zamanın boşa gitti.", detay: "Her yatırım karşılığını vermiyor; bu sefer şanssızdın." },
      },
    ],
  },
  {
    id: "oc_tuccar_dilenci_gercek_kimlik",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    agirlik: 0.6,
    gorsel: "🧙",
    baslik: "Kılık Değiştirmiş Soylu",
    metin: "Dükkânına gelen bir dilenciye sadaka verdin; meğer kılık değiştirmiş bir soyluymuş. Şehri gizlice dolaşıp esnafın dürüstlüğünü test ediyormuş.",
    secenekler: [
      {
        metin: "Mütevazı davran, ödülü kabul et.",
        baseBasariSansi: 85,
        ipucu: "Şansına güvenen bir kazanç",
        basariliSonuc: { para: 30, un: 20, mesaj: "Soylu, dürüstlüğünü ödüllendirdi; şehirde adın hemen yayıldı.", detay: "'Dilenciye bile saygıyla davranan tüccar' hikayen aylarca anlatıldı." },
        basarisizSonuc: { un: 10, mesaj: "Soylu memnun kaldı ama ödülü sandığından küçüktü.", detay: "Beklentin yüksekti; yine de kötü bir sonuç değildi." },
      },
      {
        metin: "Durumu fırsata çevir, soyludan iş teklif iste.",
        baseBasariSansi: 45,
        ipucu: "Büyük fırsat, açgözlü görünme riski",
        basariliSonuc: { para: 45, un: 15, maas_carpani: 1.15, mesaj: "Soylu, açık sözlülüğünü beğendi ve seni saraya tedarikçi yaptı.", detay: "Cesaretin karşılığını fazlasıyla aldın; artık saray mutfağına da mal satıyorsun." },
        basarisizSonuc: { un: -15, mesaj: "Soylu bunu 'küstahlık' saydı ve sessizce ayrıldı.", detay: "Fırsatı zorlamak bazen elindekini de kaybettiriyor." },
      },
    ],
  },
  {
    id: "oc_tuccar_kutu_pazarlik_yarismasi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    agirlik: 0.5,
    gorsel: "🎭",
    baslik: "Pazarlık Yarışması",
    metin: "Şehir festivalinde eğlence amaçlı bir 'en iyi pazarlıkçı' yarışması düzenleniyor; kaybeden gülünç duruma düşüyor ama kazanan tüm şehirde ünleniyor.",
    secenekler: [
      {
        metin: "Yarışmaya katıl.",
        baseBasariSansi: 55,
        ipucu: "Eğlenceli risk, ün kazandırır ya da güldürür",
        basariliSonuc: { un: 25, para: 10, mesaj: "Rakibini iki değersiz taşa bir keçi sattırdın; kalabalık kahkahayla alkışladı.", detay: "Şehirde artık 'pazarlığın efendisi' diye anılıyorsun." },
        basarisizSonuc: { un: -12, mesaj: "Rakibin seni alt etti; kalabalık senin pahasına güldü.", detay: "Festival şakalarının konusu oldun ama en azından katılma cesaretin vardı." },
      },
      {
        metin: "İzleyici olarak kal.",
        baseBasariSansi: 95,
        ipucu: "Risksiz",
        basariliSonuc: { mesaj: "Kenardan izledin, eğlendin, hiçbir şey riske atmadın.", detay: "Bazı günler sadece izlemek de yeterlidir." },
        basarisizSonuc: { para: -8, mesaj: "Yarışmayı izlerken cebini bir yankesici hafifletti.", detay: "İzlemek bile bazen dikkatsizlik cezasına çarpıyor." },
      },
    ],
  },

  // ============================================================
  // ORTA ÇAĞ — DİN ADAMI (ek olaylar)
  // ============================================================
  {
    id: "oc_din_mucize_iddiasi",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    gorsel: "✨",
    baslik: "Mucize İddiası",
    metin: "Köyün birinde kör bir adamın senin duan sonrası gördüğü söyleniyor. Haber yayılıyor; hacılar akın etmeye başladı. Sen ise ne olduğundan emin değilsin.",
    secenekler: [
      {
        metin: "Mucizeyi doğrula, işi büyüt.",
        baseBasariSansi: 55,
        ipucu: "Büyük ün ve gelir, sahtekârlık suçlaması riski",
        basariliSonuc: { un: 30, para: 25, mesaj: "Hacılar akın etti, cemaatin zenginleşti; adın uzak diyarlara yayıldı.", detay: "Gerçekten bir mucize miydi yoksa tesadüf mü, sen bile artık emin değilsin. Ama inananlar var ve onlara umut veriyorsun." },
        basarisizSonuc: { un: -30, ahlak: -15, para: -15, mesaj: "Bir gezgin hekim, adamın zaten görebildiğini kanıtladı; sahtekârlıkla suçlandın.", detay: "İnandırıcılığın bir günde çöktü; bazı cemaat üyeleri seni bir daha hiç aynı gözle görmedi." },
      },
      {
        metin: "Mucize olmadığını açıkça söyle.",
        baseBasariSansi: 70,
        ipucu: "Dürüst ama hayal kırıklığı yaratır",
        basariliSonuc: { ahlak: 22, un: -5, mesaj: "Dürüstlüğün bazı hacıları hayal kırıklığına uğrattı ama cemaatin sana güvenini artırdı.", detay: "Mucize satmadın; bu, uzun vadede itibarını daha sağlam bir zemine oturttu." },
        basarisizSonuc: { un: -15, mesaj: "Hacılar seni dinlemek istemedi, söylenti kendi başına yayılmaya devam etti.", detay: "Gerçeği söylemek her zaman söylentinin önüne geçmiyor." },
      },
    ],
  },
  {
    id: "oc_din_kilise_onarim_parasi",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    gorsel: "🏚️",
    baslik: "Çöken Çatı",
    metin: "İbadethanenin çatısı çökme tehlikesi gösteriyor. Onarım pahalı; cemaatin parası yok, sen ise cemaatten daha fazla bağış istemekten çekiniyorsun.",
    secenekler: [
      {
        metin: "Kendi birikimini onarıma har.",
        baseBasariSansi: 85,
        maliyet: 25,
        ipucu: "Cömertlik, ağır kişisel maliyet",
        basariliSonuc: { para: -25, ahlak: 25, un: 15, mesaj: "Çatı onarıldı; cemaat senin fedakarlığını hiç unutmadı.", detay: "Cebindeki her kuruşu bu çatıya verdin ama bir daha yağmurda ıslanan olmadı." },
        basarisizSonuc: { para: -25, un: 5, mesaj: "Onarım için verdiğin para yetmedi, ustalar işi yarım bıraktı.", detay: "İyi niyetin yeterli olmadı; çatı hâlâ tehlikeli." },
      },
      {
        metin: "Zengin bir aileden büyük bağış iste.",
        baseBasariSansi: 55,
        ipucu: "Karşılıksız yardım olmayabilir",
        basariliSonuc: { para: 15, ahlak: -10, un: 10, mesaj: "Aile bağışı yaptı ama karşılığında ailelerinin ismini çatıya kazıtmanı istedi.", detay: "Çatı yenilendi ama artık her baktığında o ailenin adını görüyorsun." },
        basarisizSonuc: { un: -10, mesaj: "Aile bağışı reddetti; 'Tanrı isterse çatı kendini onarır' dediler.", detay: "Zenginlerin cömertliği bazen sadece söylemde kalıyor." },
      },
    ],
  },
  {
    id: "oc_din_iki_mezhep_arasi",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    gorsel: "📖",
    baslik: "Mezhep Anlaşmazlığı",
    metin: "Cemaatin içinde bir yorum farkı büyüyor; bir grup senin öğretini 'sapkınlığa yakın' buluyor, diğer grup seni destekliyor. Cemaat bölünme tehlikesiyle karşı karşıya.",
    secenekler: [
      {
        metin: "Uzlaştırıcı bir orta yol bul.",
        baseBasariSansi: 55,
        ipucu: "Birliği korur, kimseyi tam tatmin etmez",
        basariliSonuc: { un: 20, ahlak: 15, mesaj: "Bulduğun orta yol iki tarafı da idare etti; cemaat bölünmedi.", detay: "Kimse tam istediğini alamadı ama kimse de gitmedi; bazen bu bir zaferdir." },
        basarisizSonuc: { un: -15, mesaj: "Orta yolun her iki tarafı da öfkelendirdi; 'ne o ne bu' diye eleştirildin.", detay: "Uzlaşma bazen kimseyi memnun etmiyor." },
      },
      {
        metin: "Kararlı bir taraf ol, öğretini net savun.",
        baseBasariSansi: 50,
        ipucu: "Güçlü destek ya da bölünme",
        basariliSonuc: { ahlak: 20, un: 15, mesaj: "Duruşun cemaatin çoğunu ikna etti; muhalifler sessizce ayrıldı.", detay: "Cemaatin küçüldü ama kalanlar sana tam bağlı; bu senin için yeterli." },
        basarisizSonuc: { un: -25, ahlak: 10, mesaj: "Duruşun cemaati ikiye böldü; bir grup ayrılıp kendi ibadethanesini kurdu.", detay: "İnandığını söyledin ve cemaatin yarısını kaybettin; yine de vicdanın rahat." },
      },
    ],
  },
  {
    id: "oc_din_zengin_gunahkarin_itirafi",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    gorsel: "🗝️",
    baslik: "Ölüm Döşeğinde İtiraf",
    metin: "Ölmek üzere olan zengin bir tefeci, günah çıkarırken yıllarca sakladığı bir cinayeti itiraf etti ve servetinin bir kısmını sana bırakacağını söyledi — sessiz kalman şartıyla.",
    secenekler: [
      {
        metin: "Sessiz kal, mirası kabul et.",
        baseBasariSansi: 80,
        ipucu: "Büyük servet, mesleki sırrın ağırlığı",
        basariliSonuc: { para: 55, ahlak: -20, mesaj: "Adam öldü, miras sana kaldı; kimse gerçeği öğrenmedi.", detay: "Cemaatin fonlarına aktardığın bu parayla çok şey yapabildin ama nereden geldiğini hep hatırlıyorsun." },
        basarisizSonuc: { para: 20, ahlak: -15, un: -10, mesaj: "Mirası aldın ama ailesi bunu öğrenip dava açtı; büyük kısmını geri vermek zorunda kaldın.", detay: "Sır kalmadı, sadece huzursuzluk kaldı." },
      },
      {
        metin: "Mirası reddet, adaletin yerini bulması için ailesine anlat.",
        baseBasariSansi: 50,
        ipucu: "Mesleki sırrı çiğnersin ama adalet yerini bulur",
        basariliSonuc: { un: 25, ahlak: 25, mesaj: "Söylediklerin araştırıldı ve gerçek cinayetin ailesi yıllar sonra huzura kavuştu.", detay: "Günah çıkarma sırrını çiğnedin ama bunun doğru olduğuna inanıyorsun." },
        basarisizSonuc: { un: -20, ahlak: 15, mesaj: "Söylediklerine kimse inanmadı; ölmüş bir adamın sözü sayılmadı, sen ise 'sır ifşa eden rahip' diye anıldın.", detay: "Doğru olanı yapmaya çalıştın ve karşılığını bulamadın." },
      },
    ],
  },
  {
    id: "oc_din_veba_sonrasi_evlatlik",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    gorsel: "🧒",
    baslik: "Kimsesiz Kalan Çocuklar",
    metin: "Salgın veya savaş sonrası kimsesiz kalan birkaç çocuk cemaatin kapısına bırakıldı. Bakımları pahalı ama onları sokakta bırakmak da mümkün değil.",
    secenekler: [
      {
        metin: "Çocukları cemaatin çatısı altında büyüt.",
        baseBasariSansi: 70,
        ipucu: "Uzun vadeli masraf, büyük itibar",
        basariliSonuc: { para: -18, un: 25, ahlak: 25, etiket_ekle: ["evlatliklari_var"], mesaj: "Çocuklar cemaatte büyüdü; yıllar sonra bazıları senin en sadık yardımcıların oldu.", detay: "Küçük eller körüğü çekmeyi, büyük gönüller minnettar olmayı öğrendi." },
        basarisizSonuc: { para: -22, mesaj: "Bakım masrafları öngördüğünden fazla çıktı; cemaat bütçesi zorlandı.", detay: "İyi niyetin pahalıya patladı ama çocuklar en azından güvendeydi." },
      },
      {
        metin: "Çocukları varlıklı ailelere evlatlık ver.",
        baseBasariSansi: 65,
        ipucu: "Daha az yük, çocukların kaderi belirsiz",
        basariliSonuc: { para: 10, un: 12, mesaj: "Çocuklar iyi ailelere yerleşti; zaman zaman seni ziyarete geliyorlar.", detay: "Herkes için en iyisini yapmaya çalıştın ve çoğunlukla başardın." },
        basarisizSonuc: { ahlak: -15, un: -10, mesaj: "Ailelerden biri çocuğu kötü muameleyle çalıştırdığı ortaya çıktı.", detay: "İyi niyetle verdiğin karar, bilmediğin bir acıya yol açtı." },
      },
    ],
  },
  {
    id: "oc_din_haclı_vaaz_talebi",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    gerekliUlke: { savasta: true },
    gorsel: "📢",
    baslik: "Savaş Vaazı Talebi",
    metin: "Bey, halkı sefere teşvik etmen için ateşli bir vaaz vermeni istiyor. Cemaatin çoğu gitmek istemiyor ama beyin isteğini reddetmek de tehlikeli.",
    secenekler: [
      {
        metin: "İstenen vaazı ver, halkı sefere teşvik et.",
        baseBasariSansi: 75,
        ipucu: "Beyin gözünde yükselirsin, gençleri ölüme yollarsın",
        basariliSonuc: { para: 20, un: 15, ahlak: -25, mesaj: "Vaazın etkili oldu; onlarca genç gönüllü yazıldı, bey seni ödüllendirdi.", detay: "O gençlerin kaçı geri dönecek bilmiyorsun; vaazının gücünü ilk kez bu kadar ağır hissettin." },
        basarisizSonuc: { para: 10, ahlak: -20, un: -10, mesaj: "Vaazın pek etkili olmadı, bey memnuniyetsizliğini belli etti.", detay: "Vicdanın da rahat değil, bey de senden memnun değil; en kötü sonuç bu." },
      },
      {
        metin: "Vaazı reddet, cemaatin vicdanından yana ol.",
        baseBasariSansi: 45,
        ipucu: "Vicdan rahatlığı, beyin gazabı",
        basariliSonuc: { ahlak: 28, un: 18, mesaj: "Reddin cemaatin saygısını kazandı; bey bu sefer sesini çıkarmadı.", detay: "Cemaatin seni koruyucusu olarak görmeye başladı; bu, para ile ölçülemeyecek bir güven." },
        basarisizSonuc: { para: -20, un: -12, mesaj: "Bey reddini hakaret saydı; cemaate verilen bazı ayrıcalıklar geri alındı.", detay: "İlkelerin pahalıya patladı ama yine de doğru olduğunu düşünüyorsun." },
      },
    ],
  },
  {
    id: "oc_din_kutsal_emanet_hirsizligi",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    gorsel: "🏺",
    baslik: "Çalınan Emanet",
    metin: "İbadethanenin en kutsal emaneti çalındı. Cemaat şoke oldu, şüpheler kendi içinizden birine, uzun süredir hizmet eden yaşlı bir yardımcına yöneliyor.",
    secenekler: [
      {
        metin: "Sessizce araştır, gerçeği bul.",
        baseBasariSansi: 55,
        ipucu: "Adalet ya da masumu suçlama riski",
        basariliSonuc: { un: 22, ahlak: 15, mesaj: "Araştırman gerçek hırsızı buldu; masum yardımcı aklandı, emanet geri geldi.", detay: "Sabırlı ve adil davranman cemaatin gözünde seni daha da saygın kıldı." },
        basarisizSonuc: { un: -15, ahlak: -10, mesaj: "Şüphelerin yanlış çıktı; yaşlı yardımcı haksız yere suçlanmış oldu ve cemaatten ayrıldı.", detay: "Bir hata, yıllarca hizmet etmiş birinin gönlünü kırdı." },
      },
      {
        metin: "Cemaate durumu açıkla, kayba birlikte üzülün.",
        baseBasariSansi: 75,
        ipucu: "Sakin ama çözümsüz",
        basariliSonuc: { ahlak: 15, mesaj: "Cemaat kaybı olgunlukla karşıladı; birlik dağılmadı.", detay: "Emanet gitti ama cemaatin birbirine olan güveni gitmedi." },
        basarisizSonuc: { un: -12, mesaj: "Cemaat içinde güvensizlik başladı; herkes birbirinden şüphelenir oldu.", detay: "Çözülmemiş bir gizem, bazen çözülmüş bir suçtan daha fazla zarar veriyor." },
      },
    ],
  },
  {
    id: "oc_din_falcı_kadin",
    kategori: "sosyal",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    agirlik: 0.7,
    gorsel: "🔮",
    baslik: "Köyün Falcısı",
    metin: "Köyde yaşayan yaşlı bir kadın, kilisenin/caminin öğretisine aykırı olarak fal bakıp ot deniyor. Halk hem senin hem onun kapısını çalıyor.",
    secenekler: [
      {
        metin: "Kadını sapkınlıkla suçla, uygulamayı durdur.",
        baseBasariSansi: 55,
        ipucu: "Öğretiyi korur, halkın bir kısmını küstürür",
        basariliSonuc: { ahlak: 15, un: 10, mesaj: "Kadın uygulamayı bıraktı; öğretinin otoritesi korundu.", detay: "Bazı köylüler seni katı buldu ama sen doğrunun bu olduğuna inanıyorsun." },
        basarisizSonuc: { un: -18, mesaj: "Köylüler kadını savundu, seni 'halktan kopuk' buldu.", detay: "Otoriteni kullandın ve halkın bir kısmı seni bir daha aynı gözle görmedi." },
      },
      {
        metin: "Görmezden gel, halkın kendi yoluna bırak.",
        baseBasariSansi: 80,
        ipucu: "Barışçıl ama ilkesel açıdan tartışmalı",
        basariliSonuc: { un: 8, mesaj: "İki gelenek de sessizce yan yana var olmaya devam etti.", detay: "Bazı savaşları seçmemek de bir bilgeliktir." },
        basarisizSonuc: { ahlak: -10, un: -5, mesaj: "Üst makamlar durumu öğrenip seni 'gevşek disiplin' ile eleştirdi.", detay: "Hoşgörünün de bir bedeli olabiliyormuş." },
      },
    ],
  },
  {
    id: "oc_din_kardes_kilise_rekabeti",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    gorsel: "🏛️",
    baslik: "Komşu İbadethaneyle Rekabet",
    metin: "Şehrin öbür ucunda açılan yeni bir ibadethane, senin cemaatinden insanları çekmeye başladı. Rakip din adamı daha genç, daha karizmatik ve daha iddialı vaazlar veriyor.",
    secenekler: [
      {
        metin: "Kendi vaazlarını geliştir, insanları geri kazan.",
        baseBasariSansi: 60,
        ipucu: "Emek ister ama kalıcı",
        basariliSonuc: { un: 20, ahlak: 10, mesaj: "Yenilenen vaazların cemaati geri kazandırdı; hatta yenilerini de kattı.", detay: "Rekabet seni tembelleşmekten kurtardı; bu senin için de iyi oldu." },
        basarisizSonuc: { un: -10, mesaj: "Çabalarına rağmen cemaatin bir kısmı diğer tarafa geçti.", detay: "Herkesi geri kazanamadın ama denemekten vazgeçmedin." },
      },
      {
        metin: "Rakip hakkında olumsuz söylentiler yay.",
        baseBasariSansi: 45,
        ipucu: "Hızlı ama kirli bir çözüm",
        basariliSonuc: { un: 15, ahlak: -22, mesaj: "Söylentiler rakibinin itibarını zedeledi; cemaatin geri döndü.", detay: "Kazandın ama bu kazanımın nasıl geldiğini biliyorsun ve bu seni rahatsız ediyor." },
        basarisizSonuc: { un: -25, ahlak: -15, mesaj: "Söylentilerin kaynağı sen olduğun ortaya çıktı; cemaat senden utandı.", detay: "Kirli oyun geri tepti ve şimdi hem rakibin hem cemaatin gözünde küçüldün." },
      },
    ],
  },
  {
    id: "oc_din_kehanet_talebi",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    minUn: 25,
    gorsel: "🌟",
    baslik: "Beyin Kehanet Talebi",
    metin: "Bey, savaşa girmeden önce senden bir 'işaret' yorumlamanı istiyor. Ne söylersen, kararını etkileyecek — ve sonucundan sen sorumlu tutulacaksın.",
    secenekler: [
      {
        metin: "Dürüstçe yorumla, tarafsız kal.",
        baseBasariSansi: 65,
        ipucu: "Vicdanlı ama beyi memnun etmeyebilir",
        basariliSonuc: { ahlak: 20, un: 12, mesaj: "Yorumun dengeliydi; bey kararını kendi aklıyla verdi.", detay: "Sorumluluğu üstlenmedin ve bu, ileride başına gelebilecek bir suçlamadan seni korudu." },
        basarisizSonuc: { un: -10, mesaj: "Bey net bir cevap almadığı için sinirlendi, 'işine yaramıyorsun' dedi.", detay: "Bazen dürüstlük, beklenen kesinliği vermediği için takdir görmüyor." },
      },
      {
        metin: "Beyin duymak istediği yorumu ver.",
        baseBasariSansi: 70,
        ipucu: "Anlık memnuniyet, gelecekte suçlanma riski",
        basariliSonuc: { para: 20, un: 15, ahlak: -15, mesaj: "Bey yorumundan memnun kaldı, seni ödüllendirdi.", detay: "Söylediklerinin doğru çıkıp çıkmayacağını zaman gösterecek." },
        basarisizSonuc: { para: -15, un: -25, ahlak: -12, mesaj: "Söylediğin gerçekleşmedi; bey 'yalancı kahin' diye seni cezalandırdı.", detay: "Onun duymak istediğini söylemenin bedeli, kendi itibarın oldu." },
      },
    ],
  },

  // ============================================================
  // SANAYİ DEVRİMİ — ASKER (ek olaylar)
  // ============================================================
  {
    id: "sd_asker_yeni_tufek_denemesi",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    gorsel: "🔫",
    baslik: "Deneysel Tüfek",
    metin: "Ordu yeni bir tüfek prototipini test etmen için seni seçti. Silah güçlü ama bazı örnekleri namlu patlaması yaşamış; ölümcül olmasa da riskli.",
    secenekler: [
      {
        metin: "Testi gönüllü olarak üstlen.",
        baseBasariSansi: 60,
        ipucu: "Ordu içinde tanınırlık, fiziksel risk",
        basariliSonuc: { un: 22, para: 15, mesaj: "Silah sorunsuz çalıştı; raporun ordunun karar alma sürecinde kullanıldı.", detay: "Artık 'yeni silahları ilk deneyen adam' olarak biliniyorsun." },
        basarisizSonuc: { saglik: -25, para: 10, mesaj: "Namlu elinde patladı; parmakların zarar gördü ama tazminat aldın.", detay: "Ordu 'kusurlu seri' diye kayda geçti; sen bunun bedelini bedeninle ödedin." },
      },
      {
        metin: "Testi reddet, eski model tüfeği tercih et.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama 'yenilikten kaçan' damgası",
        basariliSonuc: { saglik: 5, mesaj: "Reddin makul karşılandı; başka bir gönüllü bulundu.", detay: "Güvenliğini önceliklendirdin ve kimse bunu sana karşı kullanmadı." },
        basarisizSonuc: { un: -12, mesaj: "Üstlerin reddini 'ilerlemeye kapalılık' diye yorumladı.", detay: "Bazen temkinli olmak bile bir suçlama sebebi oluyor." },
      },
    ],
  },
  {
    id: "sd_asker_muhbir_teklifi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    gorsel: "🗞️",
    baslik: "Gizli İstihbarat Teklifi",
    metin: "Bir subay, işçi sendikalarına sızıp bilgi toplaman için sana gizli görev teklif ediyor. İyi para var ama arkadaşlarını gözetlemen gerekecek.",
    secenekler: [
      {
        metin: "Görevi kabul et, sızmaya başla.",
        baseBasariSansi: 55,
        ipucu: "İyi para, arkadaşlarına ihanet",
        basariliSonuc: { para: 35, un: -15, ahlak: -28, mesaj: "Topladığın bilgiler karşılığında hatırı sayılır bir ödeme aldın.", detay: "Toplantılara katılan işçilerin yüzlerini hatırlıyorsun; sana güvenmişlerdi." },
        basarisizSonuc: { saglik: -20, ahlak: -20, mesaj: "Kimliğin ortaya çıktı; işçiler seni dövüp kovdu.", detay: "Hem ihanet ettin hem de bunun karşılığını alamadan bedelini ödedin." },
      },
      {
        metin: "Teklifi reddet.",
        baseBasariSansi: 80,
        ipucu: "Vicdanlı ama kariyer fırsatını kaçırırsın",
        basariliSonuc: { ahlak: 18, mesaj: "Reddin sicilinde bir not olarak kaldı ama vicdanın rahat.", detay: "Bazı kapılar artık sana açılmayacak ama en azından kimseye ihanet etmedin." },
        basarisizSonuc: { un: -10, mesaj: "Reddin 'güvenilmez' olarak yorumlandı; terfi listesinden çıkarıldın.", detay: "Doğru olanı yapmak bazen kariyerine mal oluyor." },
      },
    ],
  },
  {
    id: "sd_asker_kislada_veba_karantina",
    kategori: "saglik",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    gorsel: "🏥",
    baslik: "Kışlada Salgın",
    metin: "Kışlada tifo belirtileri görülen askerler var. Komutanlık karantina uygulamak istiyor ama bu, izinlerin iptali ve moralin çökmesi demek.",
    secenekler: [
      {
        metin: "Karantina uygulamasına öncülük et.",
        baseBasariSansi: 65,
        ipucu: "Sağlığı korur, moral bozulur",
        basariliSonuc: { un: 15, saglik: 5, mesaj: "Karantina etkili oldu; salgın kışlanın dışına taşmadı.", detay: "Askerler önce homurdandı, sonra sana teşekkür etti." },
        basarisizSonuc: { saglik: -20, un: -10, olum_sansi: 8, durum_ekle: { id: "tifo_belirtileri", ad: "Tifo Belirtileri", tur: "gecici", kalan_tur: 2, tur_basi_saglik: -12 }, mesaj: "Önlemlere rağmen sen de hastalandın.", detay: "Karantinayı sen uyguladın ve yine de hastalıktan kaçamadın." },
      },
      {
        metin: "İzinleri iptal etme, hastaları ayrı çadıra al.",
        baseBasariSansi: 55,
        ipucu: "Moral yüksek kalır, yayılma riski artar",
        basariliSonuc: { un: 18, mesaj: "Askerler moralini korudu, hastalık da yayılmadı; şanslıydınız.", detay: "Risk aldın ve bu sefer işe yaradı." },
        basarisizSonuc: { saglik: -22, un: -18, durum_ekle: { id: "tifo_belirtileri", ad: "Tifo Belirtileri", tur: "gecici", kalan_tur: 2, tur_basi_saglik: -12 }, mesaj: "Hastalık hızla yayıldı; kışlanın üçte biri yatağa düştü, sen de dahil.", detay: "Moral için aldığın risk, sağlığınıza mal oldu." },
      },
    ],
  },
  {
    id: "sd_asker_fabrika_koruma_gorevi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    gorsel: "🏭",
    baslik: "Fabrika Nöbeti",
    metin: "Bir fabrika sahibi, greve giden işçilere karşı fabrikasını koruman için sana özel ödeme teklif ediyor. Resmi görevin değil ama üstlerin göz yumuyor.",
    secenekler: [
      {
        metin: "Teklifi kabul et, fabrikayı koru.",
        baseBasariSansi: 65,
        ipucu: "İyi ek gelir, işçilerle karşı karşıya gelme",
        basariliSonuc: { para: 30, un: -15, ahlak: -15, mesaj: "Fabrika sorunsuz korundu; sahip cömert bir ödeme yaptı.", detay: "İşçi mahallesinden geçerken artık üstüne bakılıyor; bunu görmezden gelmeyi öğrendin." },
        basarisizSonuc: { saglik: -22, para: 15, mesaj: "Öfkeli işçilerle çıkan arbedede yaralandın; yine de ödemeni aldın.", detay: "Para cebinde ama bedeni bunun için ödedin." },
      },
      {
        metin: "Teklifi reddet, resmi görevine odaklan.",
        baseBasariSansi: 85,
        ipucu: "Tarafsız kalırsın, ek gelirden vazgeçersin",
        basariliSonuc: { ahlak: 10, mesaj: "Tarafsız kaldın; ne işçiler ne patron sana kızgın.", detay: "Ek gelirden vazgeçtin ama vicdanın ve itibarın sağlam kaldı." },
        basarisizSonuc: { para: -5, mesaj: "Reddin fabrika sahibini kızdırdı; askeri tedarik sözleşmelerinde ona öncelik vermeyi bıraktı.", detay: "Tarafsızlığın bile bazen birilerini küstürüyor." },
      },
    ],
  },
  {
    id: "sd_asker_madalya_sahtekarligi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    maxAhlak: 50,
    gorsel: "🎖️",
    baslik: "Sahte Kahramanlık",
    metin: "Aslında hiç katılmadığın bir çarpışmada 'kahramanca davrandığını' iddia edip madalya için başvurabilirsin; kayıtlar karışık, kimse tam olarak kontrol edemez.",
    secenekler: [
      {
        metin: "Sahte başvuruda bulun.",
        baseBasariSansi: 50,
        ipucu: "Kolay itibar, açığa çıkarsa büyük utanç",
        basariliSonuc: { un: 25, para: 15, ahlak: -25, mesaj: "Madalya sana verildi; kimse hikayeni sorgulamadı.", detay: "Göğsündeki madalyaya her baktığında, hak etmediğini bilen tek kişi sensin." },
        basarisizSonuc: { un: -35, ahlak: -20, para: -15, mesaj: "Gerçekten orada bulunan bir asker seni yalanladı; sahtekarlığın ordu çapında duyuldu.", detay: "Kazanmaya çalıştığın itibarın tam tersi bir şeyle sonuçlandı." },
      },
      {
        metin: "Başvurma, gerçek hizmetinle yetin.",
        baseBasariSansi: 90,
        ipucu: "Dürüst ama sıradan",
        basariliSonuc: { ahlak: 10, mesaj: "Sıradan hizmetine devam ettin; kimse seni sorgulamadı.", detay: "Madalyasız da olsa, kendinle gurur duyabiliyorsun." },
        basarisizSonuc: { mesaj: "Başkaları sahte başvurularla madalya kazanırken sen elin boş kaldın.", detay: "Dürüstlüğün her zaman ödüllendirilmiyor ama bu seni değiştirmedi." },
      },
    ],
  },
  {
    id: "sd_asker_telgraf_hattı_sabotaji",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    gerekliUlke: { savasta: true },
    gorsel: "📡",
    baslik: "Kesilen Telgraf Hattı",
    metin: "Cephe ile karargâh arasındaki telgraf hattı sabote edildi. Onarım ekibine katılman isteniyor ama hat düşman hattına yakın bir bölgeden geçiyor.",
    secenekler: [
      {
        metin: "Evlatlıklarından birini izci olarak kullanarak hattı güvenle tamir et.",
        baseBasariSansi: 95,
        gerekliEtiketler: ["evlatliklari_var"],
        ipucu: "Evlatların Büyüdü: Onların mahalle bilgisi düşman ateşinden korur",
        basariliSonuc: {
          un: 30,
          para: 20,
          mesaj: "Büyüttüğün evlatlarından biri bölgeyi avucunun içi gibi biliyordu. Onun rehberliğinde düşman pusuya düşmeden hattı tamir ettiniz.",
          detay: "Yıllar önce yetimhaneye yaptığın yatırım, bugün senin canını kurtardı."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Onarım ekibine katıl, hattı tamir et.",
        baseBasariSansi: 55,
        ipucu: "Kritik görev, düşman ateşi riski",
        basariliSonuc: { un: 25, para: 15, mesaj: "Hattı düşman ateşi altında onardınız; iletişim yeniden sağlandı.", detay: "Komutanlık bu onarımın savaşın gidişatını değiştirdiğini söyledi." },
        basarisizSonuc: { saglik: -30, olum_sansi: 12, mesaj: "Onarım sırasında keskin nişancı ateşine yakalandınız.", detay: "Hat onarıldı ama bedeli ağır oldu; iki arkadaşın da yaralandı." },
      },
      {
        metin: "Habercilik yaparak mesajı elden ilet.",
        baseBasariSansi: 65,
        ipucu: "Alternatif çözüm, yorucu ve riskli yolculuk",
        basariliSonuc: { un: 18, saglik: -10, mesaj: "Mesajı at sırtında düşman hatlarına yaklaşmadan ulaştırdın.", detay: "Yorgunluktan bitkin düştün ama görev tamamlandı." },
        basarisizSonuc: { saglik: -20, un: -8, mesaj: "Yolda atın tökezledi, mesaj geç ulaştı; bir saldırı fırsatı kaçırıldı.", detay: "Elinden geleni yaptın ama yeterli olmadı." },
      },
    ],
  },
  {
    id: "sd_asker_kislada_kumarhane",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    agirlik: 0.7,
    gorsel: "🎲",
    baslik: "Gizli Kumarhane",
    metin: "Kışlanın arka odalarından birinde gizli bir kumar masası dönüyor. Kazananlar gerçek para kazanıyor ama yakalanma riski disiplin cezası demek.",
    secenekler: [
      {
        metin: "Masaya otur, şansını dene.",
        baseBasariSansi: 45,
        maliyet: 10,
        ipucu: "Hızlı kazanç ya da hızlı kayıp",
        basariliSonuc: { para: 30, mesaj: "Şanslı bir gecendi; masadan cebin dolu kalktın.", detay: "Diğer askerler senden çekinerek 'bir daha oynamam' dedi." },
        basarisizSonuc: { para: -25, mesaj: "Kötü bir gecendi; maaşının çoğunu masada bıraktın.", detay: "Ay sonuna kadar nasıl idare edeceğini düşünüyorsun." },
      },
      {
        metin: "Uzak dur, disiplinini koru.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Kumara bulaşmadın, parana da itibarına da bir şey olmadı.", detay: "Bazı arkadaşların 'sıkıcı' dese de sen kararına razısın." },
        basarisizSonuc: { un: -5, mesaj: "Katılmadığın için 'kibirli' diye takıldılar.", detay: "Doğru kararlar bazen alay konusu oluyor." },
      },
    ],
  },
  {
    id: "sd_asker_gazeteci_roportaji",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    meslekler: ["Asker"],
    minUn: 25,
    gorsel: "📰",
    baslik: "Savaş Muhabiri",
    metin: "Bir gazete muhabiri, cephedeki gerçek koşulları senden dinlemek istiyor. Anlattıkların ya orduyu övecek ya da sansasyonel bir skandala dönüşecek.",
    secenekler: [
      {
        metin: "Gerçekleri olduğu gibi anlat.",
        baseBasariSansi: 55,
        ipucu: "Halkın güvenini kazanır, üstlerini kızdırır",
        basariliSonuc: { un: 25, ahlak: 15, mesaj: "Röportajın halk arasında büyük yankı uyandırdı; dürüstlüğünle tanındın.", detay: "Askerlerin gerçek koşulları ilk kez bu kadar açık konuşuldu; bazı iyileştirmeler bile yapıldı." },
        basarisizSonuc: { un: -15, para: -10, ahlak: 10, mesaj: "Üstlerin röportajı 'moral bozucu' bulup seni disiplin cezasına çarptırdı.", detay: "Gerçeği söylemenin bir bedeli oldu ama halk seni destekledi." },
      },
      {
        metin: "Orduyu öven, iyimser bir tablo çiz.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama içtenlikten uzak",
        basariliSonuc: { para: 15, un: 10, mesaj: "Üstlerin röportajdan memnun kaldı; küçük bir ödül aldın.", detay: "Söylediklerin tam gerçek değildi ama kimse bunu sorgulamadı." },
        basarisizSonuc: { un: -10, mesaj: "Cephedeki askerler abartılı anlatımını okuyunca sana güvenini kaybetti.", detay: "Üstlerini memnun ettin ama yoldaşlarını hayal kırıklığına uğrattın." },
      },
    ],
  },

  // ============================================================
  // ORTA ÇAĞ — ASKER (ek olaylar ve Hayvan Etkileşimi)
  // ============================================================

  // ============================================================
  // ORTA ÇAĞ — TÜCCAR (ek olaylar)
  // ============================================================
  {
    id: "evcil_hayvan_hastalik",
    kategori: "saglik",
    gerekliEtiketler: ["evcil_hayvan_var"],
    agirlik: 0.6,
    gorsel: "🤒",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hasta Bir Dost",
    metin: "{hayvan} birkaç gündür iştahsız, halsiz ve her zamanki gibi neşeli değil. Bir şeyler yapman gerekiyor.",
    secenekler: [
      {
        metin: "Bir hayvan şifacısına götür, parası ne olursa olsun.",
        baseBasariSansi: 80,
        maliyet: 15,
        ipucu: "Masraflı ama güvenilir",
        basariliSonuc: {
          para: -15,
          mutluluk: 12,
          mesaj: "Şifacının verdiği tedaviyle {hayvan} birkaç gün içinde eski neşesine kavuştu.",
          detay: "Bazı harcamalar tereddütsüz yapılır.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -10,
          mesaj: "Şifacı elinden geleni yaptı ama {hayvan} hâlâ eski hâlinde değil.",
          detay: "Her tedavi anında sonuç vermiyor.",
        },
      },
      {
        metin: "Evde kendi bildiğin yöntemlerle bakmayı dene.",
        baseBasariSansi: 45,
        ipucu: "Ücretsiz ama riskli",
        basariliSonuc: {
          mutluluk: 8,
          mesaj: "Sabırlı bakımın işe yaradı; {hayvan} yavaş yavaş toparlandı.",
          detay: "Bazen sevgi ve sabır, paradan daha etkili oluyor.",
        },
        basarisizSonuc: {
          evcil_hayvan_kaybet: true,
          mutluluk: -25,
          mesaj: "Durumu ağırlaştı ve {hayvan} kurtarılamadı.",
          detay: "Bu kaybın acısını uzun süre unutmayacaksın.",
        },
      },
    ],
  },
  {
    id: "evcil_hayvan_sadakat_ani",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_var"],
    agirlik: 0.7,
    gorsel: "🐾",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sessiz Bir Sadakat",
    metin: "Zor bir günün ardından eve yorgun döndün. {hayvan} kapıda seni bekliyordu, sanki her şeyi anlamış gibi yanına sokuldu.",
    secenekler: [
      {
        metin: "Yanına otur, o anın tadını çıkar.",
        baseBasariSansi: 95,
        ipucu: "Küçük ama gerçek bir mutluluk",
        basariliSonuc: { mutluluk: 15, mesaj: "O sessiz an, günün tüm yorgunluğunu bir kenara koydu.", detay: "Bazen en büyük teselli, konuşmayan bir dostun varlığıdır." },
        basarisizSonuc: { mutluluk: 4, mesaj: "Kısa bir süre için de olsa için biraz rahatladı.", detay: "Küçük anlar bile bir şey ifade ediyor." },
      },
      {
        metin: "Yorgunluğunu bahane et, hemen uyu.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama fırsatı kaçırırsın",
        basariliSonuc: { saglik: 5, mesaj: "İyi bir uyku çektin; ama o anı kaçırdığını biraz hissettin.", detay: "Dinlenmek de gerekli, ama bazı anlar bir daha gelmiyor." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Uyku pek gelmedi, hayvanını görmezden geldiğine içerledin.", detay: "Bazı fırsatlar geri gelmiyor." },
      },
    ],
  },
  {
    id: "evcil_hayvan_kaybolma",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_var"],
    agirlik: 0.6,
    gorsel: "😟",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kayıp Dost",
    metin: "{hayvan} iki gündür ortalıkta yok. Komşular gördüğünü sanmıyor ama arayabilirsin.",
    secenekler: [
      {
        metin: "Gökyüzüne bak ve Şahinini bekle.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["evcil_hayvan_tur:Şahin"],
        ipucu: "Gizli Şık: Yırtıcılar boş dönmez",
        basariliSonuc: {
          mutluluk: 20,
          para: 35,
          mesaj: "Şahin üçüncü günün sabahında çığlık atarak döndü. Üstelik pençelerinde, muhtemelen bir soyludan kopardığı değerli bir yakut kolye var!",
          detay: "Özgürlüğe değil, sana dönmeyi seçti. Ve eli boş da dönmedi."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Sokak sokak ara.",
        baseBasariSansi: 55,
        ipucu: "Zaman alır ama bulma şansın var",
        basariliSonuc: { mutluluk: 15, mesaj: "Saatlerce aradıktan sonra {hayvan}'ı bir ara sokakta buldun; sağ salim eve döndünüz.", detay: "Israrın karşılığını aldı." },
        basarisizSonuc: {
          evcil_hayvan_kaybet: true,
          mutluluk: -15,
          saglik: -5,
          mesaj: "Ne kadar arasan da {hayvan}'ı bulamadın; bir daha da görünmedi.",
          detay: "Bazı kayıplar kapanmıyor, sadece zamanla hafifliyor.",
        },
      },
      {
        metin: "Kendi kendine döneceğini um.",
        baseBasariSansi: 60,
        ipucu: "Pasif, şansa bağlı",
        basariliSonuc: { mutluluk: 5, mesaj: "Birkaç gün sonra {hayvan} kendi kendine kapıda belirdi.", detay: "Bazen sabır aramaktan daha işe yarıyor." },
        basarisizSonuc: {
          evcil_hayvan_kaybet: true,
          mutluluk: -10,
          mesaj: "{hayvan} bir daha geri dönmedi.",
          detay: "Bazı vedalar sessizce gerçekleşiyor.",
        },
      },
    ],
  },
  {
    id: "evcil_hayvan_koruma_ani",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_var"],
    agirlik: 0.6,
    gorsel: "🛡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sadık Bir Bekçi",
    metin: "Gece yarısı bir ses seni uyandırdı: {hayvan} kapının önünde hırlıyor. Belki bir hırsız, belki sadece bir gölge.",
    secenekler: [
      {
        metin: "Kalk, dışarıyı kontrol et.",
        baseBasariSansi: 65,
        ipucu: "Riskli ama bir şeyi önleyebilirsin",
        basariliSonuc: { para: 12, mesaj: "Gerçekten de bir hırsız vardı; {hayvan}'ın uyarısı sayesinde onu kovaladın.", detay: "Sadık bir dostun değerini bu gece bir kez daha anladın." },
        basarisizSonuc: { saglik: -10, mesaj: "Karanlıkta bir şeye çarpıp düştün; hırsız da kaçtı, elin boş kaldı.", detay: "Bazı geceler pürüzsüz geçmiyor." },
      },
      {
        metin: "Görmezden gel, tekrar uyu.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama riski göze alırsın",
        basariliSonuc: { mesaj: "Sabah her şey yerli yerindeydi; belki de sadece bir gölgeydi.", detay: "Bazen endişe boşunaymış." },
        basarisizSonuc: { para: -20, mesaj: "Sabah ambardan/depondan bazı eşyaların çalındığını fark ettin.", detay: "{hayvan}'ın uyarısını dinlemek gerekirmiş." },
      },
    ],
  },
  {
    id: "evcilhayvan_sahiplenme_teklifi_ortacag",
    cag: "Orta Çağ",
    kategori: "sosyal",
    agirlik: 1,
    gorsel: "🐾",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bir Dost mu, Yoksa Yalnızlık mı?",
    metin:
      "Pazarda gezerken fark ettin: hayatına küçük, sadık bir dost katma vaktin gelmiş olabilir. Ya da belki tek başına daha rahatsın — karar senin.",
    secenekler: [
      {
        metin: "Bir köpek yavrusu edin.",
        baseBasariSansi: 95,
        ipucu: "Sadık bir dost",
        basariliSonuc: {
          mutluluk: 5,
          evcil_hayvan_edin: { tur: "Köpek" },
          mesaj: "Küçük bir köpek yavrusunu evine aldın; kuyruğunu sallayarak peşinden koşmaya başladı.",
          detay: "Artık yalnız değilsin.",
        },
        basarisizSonuc: { mesaj: "Yavru ilk gece bir daha görünmemek üzere kayboldu.", detay: "Bazı dostluklar daha başlamadan bitiyor." },
      },
      {
        metin: "Bir kedi edin.",
        baseBasariSansi: 95,
        ipucu: "Bağımsız bir arkadaş",
        basariliSonuc: {
          mutluluk: 5,
          evcil_hayvan_edin: { tur: "Kedi" },
          mesaj: "Küçük bir kedi yuvana yerleşti; seni görmezden gelmeyi bile sevimli kılıyor.",
          detay: "Artık evinde bir efendi daha var, o da kedin.",
        },
        basarisizSonuc: { mesaj: "Kedi bir gece geldiği gibi sessizce gitti, bir daha dönmedi.", detay: "Bazı dostluklar daha başlamadan bitiyor." },
      },
      {
        metin: "Bir şahin edinip eğit.",
        baseBasariSansi: 70,
        ipucu: "Zor ama gösterişli ve avda faydalı",
        basariliSonuc: {
          un: 6,
          evcil_hayvan_edin: { tur: "Şahin" },
          mesaj: "Sabırlı çalışman işe yaradı; şahin artık omzunda oturuyor, herkes sana hayranlıkla bakıyor.",
          detay: "Bir şahin sahibi olmak sokakta biraz saygı kazandırıyor.",
        },
        basarisizSonuc: { saglik: -5, mesaj: "Şahin eğitim sırasında elini derince tırmaladı ve uçup gitti.", detay: "Bazı hayvanlar özgürlüğü esaretten üstün tutuyor." },
      },
      {
        metin: "Hayır, tek başıma daha rahatım.",
        baseBasariSansi: 100,
        ipucu: "Sorumluluk yok",
        basariliSonuc: { mesaj: "Kararını verdin: şimdilik yalnız kalmayı tercih ediyorsun.", detay: "Belki ileride fikrin değişir." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "evcilhayvan_sahiplenme_teklifi_sanayi",
    cag: "Sanayi Devrimi",
    kategori: "sosyal",
    agirlik: 1,
    gorsel: "🐾",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bir Dost mu, Yoksa Yalnızlık mı?",
    metin:
      "Fabrikadan çıkışta pazarda küçük hayvanlar satan bir tezgah gördün. Hayatına bir dost katmanın tam zamanı olabilir — ya da tek başına kalmayı tercih edebilirsin.",
    secenekler: [
      {
        metin: "Bir köpek yavrusu edin.",
        baseBasariSansi: 95,
        ipucu: "Sadık bir dost",
        basariliSonuc: {
          mutluluk: 5,
          evcil_hayvan_edin: { tur: "Köpek" },
          mesaj: "Küçük bir köpek yavrusunu evine aldın; kuyruğunu sallayarak peşinden koşmaya başladı.",
          detay: "Artık yalnız değilsin.",
        },
        basarisizSonuc: { mesaj: "Yavru ilk gece bir daha görünmemek üzere kayboldu.", detay: "Bazı dostluklar daha başlamadan bitiyor." },
      },
      {
        metin: "Bir kedi edin.",
        baseBasariSansi: 95,
        ipucu: "Bağımsız bir arkadaş",
        basariliSonuc: {
          mutluluk: 5,
          evcil_hayvan_edin: { tur: "Kedi" },
          mesaj: "Küçük bir kedi yuvana yerleşti; seni görmezden gelmeyi bile sevimli kılıyor.",
          detay: "Artık evinde bir efendi daha var, o da kedin.",
        },
        basarisizSonuc: { mesaj: "Kedi bir gece geldiği gibi sessizce gitti, bir daha dönmedi.", detay: "Bazı dostluklar daha başlamadan bitiyor." },
      },
      {
        metin: "Konuşan bir papağan al.",
        baseBasariSansi: 90,
        ipucu: "Eğlenceli ama ağzından ne çıkacağı belirsiz",
        basariliSonuc: {
          mutluluk: 6,
          evcil_hayvan_edin: { tur: "Papağan" },
          mesaj: "Rengarenk bir papağan aldın; daha eve varmadan senin küfürlerini ezberlemeye başladı.",
          detay: "Bu kuşla hayatın bundan sonra hiç sessiz geçmeyecek.",
        },
        basarisizSonuc: { para: -5, mesaj: "Papağan tezgahtan uçup kaçtı, parasını da geri alamadın.", detay: "Bazı yatırımlar kanatlanıp gidiyor." },
      },
      {
        metin: "Hayır, tek başıma daha rahatım.",
        baseBasariSansi: 100,
        ipucu: "Sorumluluk yok",
        basariliSonuc: { mesaj: "Kararını verdin: şimdilik yalnız kalmayı tercih ediyorsun.", detay: "Belki ileride fikrin değişir." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "evcil_hayvan_sahin_av",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Şahin"],
    agirlik: 0.7,
    gorsel: "🦅",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Başarılı Bir Av",
    metin: "{hayvan} ile ava çıktın; şahinin keskin gözleri bugün seni hayal kırıklığına uğratmayacak gibi.",
    secenekler: [
      {
        metin: "Ava devam et, riski göze al.",
        baseBasariSansi: 60,
        ipucu: "İyi bir av büyük kazanç demek",
        basariliSonuc: {
          para: 20,
          un: 8,
          mesaj: "{hayvan} art arda iki tavşan yakaladı; akşam sofran bu hafta zengin.",
          detay: "Şahinini eğitmenin karşılığını aldın.",
        },
        basarisizSonuc: { saglik: -8, mesaj: "{hayvan} bir kartalla çatıştı, ikiniz de yaralı döndünüz.", detay: "Gökyüzü bazen paylaşılmıyor." },
      },
      {
        metin: "Erken dön, riske girme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, küçük kazanç",
        basariliSonuc: { para: 5, mesaj: "Küçük bir avla yetindin ama ikiniz de sağ salim döndünüz.", detay: "Bazen az ama garanti, çoktan iyidir." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Eli boş döndünüz, {hayvan} da senin kadar hayal kırıklığına uğramış görünüyordu.", detay: "Her gün iyi bir av günü olmuyor." },
      },
    ],
  },
  {
    id: "evcil_hayvan_sahin_kacis",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Şahin"],
    agirlik: 0.5,
    gorsel: "💨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Özgürlüğün Çağrısı",
    metin: "{hayvan} bugün kolundan ürkütücü bir güçle fırlayıp uzaklara süzüldü; belki sadece geziniyor, belki bir daha dönmeyecek.",
    secenekler: [
      {
        metin: "Peşinden git, sesini duyurmaya çalış.",
        baseBasariSansi: 65,
        ipucu: "Yorucu ama umut var",
        basariliSonuc: { mutluluk: 10, mesaj: "Saatler sonra {hayvan} bileğine geri kondu; ikiniz de rahatladınız.", detay: "Bağınız sandığından güçlüymüş." },
        basarisizSonuc: {
          evcil_hayvan_kaybet: true,
          mutluluk: -15,
          mesaj: "{hayvan}'ı bir daha göremedin; gökyüzü onu geri vermedi.",
          detay: "Bazı dostluklar özgürlüğe yeniliyor.",
        },
      },
      {
        metin: "Güven, kendi kendine döneceğini um.",
        baseBasariSansi: 70,
        ipucu: "Pasif ama genelde işe yarar",
        basariliSonuc: { mutluluk: 5, mesaj: "Akşama doğru {hayvan} kendiliğinden geri döndü.", detay: "Bazen beklemek yeterlidir." },
        basarisizSonuc: {
          evcil_hayvan_kaybet: true,
          mutluluk: -10,
          mesaj: "{hayvan} bir daha dönmedi.",
          detay: "Bazı vedalar sessiz oluyor.",
        },
      },
    ],
  },
  {
    id: "evcil_hayvan_papagan_agiz_kacirma",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Papağan"],
    agirlik: 0.7,
    ton: "hafif",
    gorsel: "🦜",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ağzından Kaçan Sır",
    metin: "{hayvan}, geçen hafta misafirlikte duyduğun karanlık bir sırrı (veya dedikoduyu) tam da yanlış kişinin önünde tekrarladı! Herkes şimdi sana bakıyor.",
    secenekler: [
      {
        metin: "Gülüp geçiştir, 'kuş konuşur' de.",
        baseBasariSansi: 70,
        ipucu: "Rahat bir çıkış ama garanti değil",
        basariliSonuc: {
          un: 5,
          mutluluk: 5,
          mesaj: "Ortam gülüşmelere boğuldu, olay şakaya döndü ve hatta biraz sevimli bulundu.",
          detay: "{hayvan} sayesinde meclisin gözdesi oldun, en azından bugünlük.",
        },
        basarisizSonuc: { un: -10, ahlak: -5, mesaj: "Kimse gülmedi; dedikodunun sahibi kılıcına/silahına davrandı.", detay: "{hayvan}'ın ağzına bir şey söylemeden önce iki kere düşünmen gerekecek." },
      },
      {
        metin: "Utanıp özür dile, konuyu kapat.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama sönük",
        basariliSonuc: { mesaj: "Kısa bir özürle olay kapandı, kimse fazla üzerinde durmadı.", detay: "Bazen en iyi savunma, hızlı bir özürdür." },
        basarisizSonuc: { un: -8, mesaj: "Özürün pek inandırıcı gelmedi, birkaç kişi hâlâ senden şüpheleniyor.", detay: "{hayvan} sırlarını saklamayı hiç öğrenmeyecek galiba." },
      },
    ],
  },
  {
    id: "evcil_hayvan_papagan_taklit_yetenegi",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Papağan"],
    agirlik: 0.6,
    ton: "hafif",
    gorsel: "🎭",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Küçük Bir Yıldız",
    metin: "{hayvan}, komşuların seslerini o kadar iyi taklit etmeye başladı ki sokakta küçük bir ün kazandı; bazıları senden bir gösteri istiyor.",
    secenekler: [
      {
        metin: "Meydanda küçük bir gösteri düzenle.",
        baseBasariSansi: 65,
        ipucu: "Riskli ama eğlenceli bir ün fırsatı",
        basariliSonuc: {
          un: 15,
          para: 10,
          mesaj: "{hayvan} herkesi kahkahaya boğdu, izleyenler sana bahşiş bile bıraktı.",
          detay: "Kim bilirdi bir kuş seni bu kadar meşhur edecek.",
        },
        basarisizSonuc: { un: -8, mesaj: "{hayvan} o gün inatla tek kelime etmedi, kalabalık seninle dalga geçerek dağıldı.", detay: "Sahne hayvanları bazen huysuzlaşıyor." },
      },
      {
        metin: "Teklifi geri çevir, mahremiyetini koru.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Gösteriyi nazikçe reddettin; hayat sakin akmaya devam etti.", detay: "Her fırsatın peşinden koşmak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Bazı komşular ısrarcı davrandı, biraz bunalmış hissettin.", detay: "Ün bazen davetsiz geliyor." },
      },
    ],
  },
  {
    id: "evcil_hayvan_kedi_yikim",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Kedi"],
    agirlik: 0.6,
    ton: "hafif",
    gorsel: "🐈‍⬛",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kazayla mı, Kasten mi?",
    metin: "Eve döndüğünde {hayvan}'ı, kırdığı değerli bir çömleğin parçaları arasında, sana dimdik ve pişmansız bakarken buldun.",
    secenekler: [
      {
        metin: "Kızma, temizle geç.",
        baseBasariSansi: 95,
        ipucu: "Sakin kal",
        basariliSonuc: { mutluluk: 5, mesaj: "Kırık parçaları topladın; {hayvan} olan biteni izlemekten keyif alıyor gibiydi.", detay: "Kedilerle yaşamanın bedeli bu, dedin kendine." },
        basarisizSonuc: { para: -8, mesaj: "Çömlek gerçekten değerliymiş, kırığını tamir ettirmek para tuttu.", detay: "{hayvan} umursamıyor bile." },
      },
      {
        metin: "Azarla, ders vermeye çalış.",
        baseBasariSansi: 40,
        ipucu: "Muhtemelen boşuna",
        basariliSonuc: { mutluluk: 3, mesaj: "{hayvan} sesini duyunca bir süre uslu durdu, en azından o gün.", detay: "Küçük bir zafer sayılır." },
        basarisizSonuc: { mutluluk: -5, mesaj: "{hayvan} seni tamamen görmezden gelip pencereden dışarı baktı.", detay: "Kediler kimseyi dinlemez, sen de biliyordun." },
      },
    ],
  },
  {
    id: "evcil_hayvan_kopek_kahramanlik",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Köpek"],
    agirlik: 0.6,
    gorsel: "🦴",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Beklenmedik Bir Kahraman",
    metin: "Pazar yerinde bir çocuğun elindeki ekmeği kapan bir hırsızı {hayvan}, kimsenin beklemediği bir hızla kovaladı.",
    secenekler: [
      {
        metin: "Peşinden koş, durumu düzelt.",
        baseBasariSansi: 70,
        ipucu: "Küçük bir kahramanlık anı",
        basariliSonuc: {
          un: 15,
          mutluluk: 10,
          mesaj: "{hayvan} hırsızı köşeye sıkıştırdı, ekmek sahibine geri döndü; kalabalık alkışladı.",
          detay: "O gün mahallenin gözdesi sendin, ya da asıl {hayvan}'dı.",
        },
        basarisizSonuc: { saglik: -5, mesaj: "Koşarken bir tezgaha çarptın, hırsız da kaçtı.", detay: "İyi niyet bazen sakarlıkla sonuçlanıyor." },
      },
      {
        metin: "Karışma, kendi işine bak.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Olayı izlemekle yetindin; {hayvan} bir süre sonra yanına döndü.", detay: "Her kahramanlık senin olmak zorunda değil." },
        basarisizSonuc: { ahlak: -5, mesaj: "Çocuğun ağladığını görünce içinde hafif bir vicdan azabı hissettin.", detay: "Bazen izlemek de bir seçimdir." },
      },
    ],
  },
  {
    id: "genel_garip_ruya",
    kategori: "din",
    agirlik: 0.3,
    gorsel: "💭",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Tuhaf Bir Rüya",
    metin: "Üç gece üst üste aynı tuhaf rüyayı gördün: karanlık bir kapı ve ardından gelen bir ses. Bazıları bunu işaret sayıyor, bazıları sadece kötü yemek diyor.",
    secenekler: [
      {
        metin: "Rüya yorumcusuna danış.",
        baseBasariSansi: 60,
        maliyet: 8,
        ipucu: "Huzur ya da daha fazla kafa karışıklığı",
        basariliSonuc: { ahlak: 10, mesaj: "Yorumcu rahatlatıcı bir açıklama yaptı; için rahatladı.", detay: "İster doğru ister uydurma olsun, huzur bulman yeterliydi." },
        basarisizSonuc: { para: -8, ahlak: -5, mesaj: "Yorumcu ürkütücü bir kehanet uydurdu; şimdi daha çok endişelisin.", detay: "Bazen cevap aramak, soruyu büyütmekten başka işe yaramıyor." },
      },
      {
        metin: "Aldırma, sıradan bir rüya olduğunu düşün.",
        baseBasariSansi: 90,
        ipucu: "Basit ve mantıklı",
        basariliSonuc: { mesaj: "Rüyayı unuttun, hayatın normal akışına döndü.", detay: "Bazen bir rüya sadece bir rüyadır." },
        basarisizSonuc: { saglik: -5, mesaj: "Rüya tekrar etti ve uykuların bozuldu.", detay: "Aldırmamaya çalıştın ama zihnin seni rahat bırakmadı." },
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
        ipucu: "Eğlenceli ün ya da utanç",
        basariliSonuc: { mesaj: "Kullanılmadı" },
        basarisizSonuc: { mesaj: "Kullanılmadı" },
        onTepki: {
          metin: "Meydana çıktığın an soytarı seni itip düşürdü ve kıyafetinle dalga geçmeye başladı. Kalabalık sana gülüyor. Bu bir oyun değil, bir aşağılama şovu!",
          geriCekilMetni: "Öfkene hakim ol, sessizce kalabalığa karışıp sıvış.",
          geriCekilSonucu: {
            un: -15,
            mutluluk: -10,
            mesaj: "Şakayı kaldıramayan korkak biri olarak anıldın. Günlerce bu anı düşündün.",
            detay: "Bazen sıvışmak en büyük acıdır."
          },
          devamMetni: "Maskesini yüzünden çekip al ve ona kendi şakanı yap!",
          devamSonucu: {
            un: 25,
            ahlak: 10,
            mesaj: "Maskeyi çektiğinde adamın aslında aranan bir dolandırıcı olduğu ortaya çıktı! Meydanda kahraman oldun.",
            detay: "Alay edilmeyeceksin, sen alay edeceksin!"
          }
        }
      },
      {
        metin: "Nazikçe reddet, kalabalıktan çekil.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, sıradan",
        basariliSonuc: { mesaj: "Reddin kabul edildi; soytarı başka birini seçti.", detay: "Utanç riskini almadın; hayatın sakin devam etti." },
        basarisizSonuc: { un: -8, mesaj: "Soytarı reddini de espriye çevirip senle dalga geçti.", detay: "Kaçmaya çalışmak bazen daha da dikkat çekiyor." },
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
        ipucu: "İtibar kazandırır, herkesi ikna edemeyebilirsin",
        basariliSonuc: { un: 18, ahlak: 12, mesaj: "Sakin tavrın paniği yatıştırdı; halk sana güvendi.", detay: "Işık birkaç gün sonra kayboldu ve herkes günlük hayatına döndü; ama seni hatırladılar." },
        basarisizSonuc: { un: -12, mesaj: "Bazıları seni dinlemedi, panik kısa süre daha sürdü.", detay: "Korku bazen mantıktan daha güçlü oluyor." },
      },
      {
        metin: "Sen de söylentilere kapıl, hazırlık yap.",
        baseBasariSansi: 70,
        maliyet: 10,
        ipucu: "Gereksiz masraf ya da tuhaf bir tedbir",
        basariliSonuc: { para: -10, mesaj: "Stokladığın erzak işe yaramadı ama en azından hazırlıklıydın.", detay: "Işık kayboldu, hayat devam etti; biraz mahcup oldun ama zararsız." },
        basarisizSonuc: { para: -15, un: -12, mesaj: "Panik alışverişin komşular arasında dalga konusu oldu.", detay: "'Kıyamet bekleyen adam' lakabı bir süre peşini bırakmadı." },
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
        basariliSonuc: { ahlak: 15, mesaj: "Güzel bir akşam geçirdiniz; eski dostluğunuz tazelendi.", detay: "Bazen geçmişe kısa bir yolculuk, bugüne iyi gelir." },
        basarisizSonuc: { mesaj: "Aranızdaki fark öyle büyümüş ki eski sohbet havası bir türlü kurulamadı.", detay: "Bazı dostluklar zamanla farklı yollara ayrılıyor." },
      },
      {
        metin: "İşin yoğun, kısa kes.",
        baseBasariSansi: 95,
        ipucu: "Zaman kazanırsın, pişmanlık duyabilirsin",
        basariliSonuc: { para: 5, mesaj: "İşine döndün; arkadaşın anlayışla ayrıldı.", detay: "Belki güzel bir anı kaçırdın ama işlerin aksamadı." },
        basarisizSonuc: { ahlak: -10, mesaj: "Arkadaşın kırgın ayrıldı; bir daha haber alamadın.", detay: "Bazı fırsatlar bir daha geri gelmiyor." },
      },
    ],
  },
  {
    id: "genel_sahte_kahin",
    kategori: "din",
    agirlik: 0.3,
    gorsel: "🎩",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gezici Kahin",
    metin: "Şehre gelen bir kahin, geleceğini okuyabileceğini söylüyor; karşılığında sadece küçük bir ücret istiyor. Belki gerçek bir yeteneği var, belki de sadece iyi bir gözlemci.",
    secenekler: [
      {
        metin: "Falına baktır.",
        baseBasariSansi: 70,
        maliyet: 6,
        ipucu: "Ucuz bir merak gideriminin ötesine geçmez",
        basariliSonuc: { ahlak: 5, mesaj: "Söyledikleri hoşuna gitti; belki doğru belki tesadüf, keyfin yerine geldi.", detay: "Küçük bir eğlence olarak kaldı, hayatını değiştirmedi." },
        basarisizSonuc: { para: -6, ahlak: -8, mesaj: "Söyledikleri seni gereksiz yere endişelendirdi.", detay: "Bazen bilmemek, bilmekten daha huzurlu." },
      },
      {
        metin: "İlgilenme, yoluna devam et.",
        baseBasariSansi: 95,
        ipucu: "Basit ve zararsız",
        basariliSonuc: { mesaj: "Kahine aldırmadan işine devam ettin.", detay: "Bazı meraklar peşinden gitmeye değmiyor." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Çevrendekiler falına baktırmadığın için seni 'korkak' diye takıldı.", detay: "Sağduyulu olmak bazen alay konusu oluyor." },
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
        ipucu: "Güvenli ama masraflı",
        basariliSonuc: { saglik: 15, para: -12, mesaj: "Kışı sıcak ve tok geçirdin; hastalanmadan çıktın.", detay: "Komşuların hastalanırken sen hazırlıklıydın." },
        basarisizSonuc: { saglik: 5, para: -18, mesaj: "Stokladığın kadarıyla idare ettin ama fiyatlar beklediğinden yüksekti.", detay: "Kışı atlattın ama cüzdanın hafifledi." },
      },
      {
        metin: "İdareli geçin, tasarruf et.",
        baseBasariSansi: 55,
        ipucu: "Ekonomik ama riskli",
        basariliSonuc: { para: 10, mesaj: "Tasarruflu davrandın ve kışı ucuza atlattın.", detay: "Üşüdün ama dayandın; bazen az yetiyor." },
        basarisizSonuc: { saglik: -25, olum_sansi: 5, mesaj: "Soğuk seni hasta etti; zatürreye çevirdi.", detay: "Tasarruf ederken sağlığından tasarruf etmiş oldun." },
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
        ipucu: "Pahalı ama güvenilir",
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
        ipucu: "Ucuz ama şansa bağlı",
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
        ipucu: "Bedava ama riskli",
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
        ipucu: "Vicdan ve itibar, gece boyu yorucu arama",
        basariliSonuc: { un: 25, ahlak: 25, saglik: -8, mesaj: "Çocuğu eski bir değirmende sen buldun; ailesi sana minnettar kaldı.", detay: "O gece attığın her adım değdi; annenin gözyaşları hâlâ aklında." },
        basarisizSonuc: { saglik: -12, mesaj: "Bütün gece aradınız, çocuğu başka bir grup buldu.", detay: "Elinden geleni yaptın; sonucu değiştirmedi ama çabanı değersiz kılmadı." },
      },
      {
        metin: "Evinde kal, karışma.",
        baseBasariSansi: 95,
        ipucu: "Güvenli ama vicdan sızlatabilir",
        basariliSonuc: { mesaj: "Evde kaldın; çocuk sabaha karşı kendi kendine bulundu.", detay: "İyi bitti ama katılmadığın için içinde hafif bir suçluluk var." },
        basarisizSonuc: { un: -12, ahlak: -10, mesaj: "Komşuların 'herkes aradı, sen neredeydin' diye sordu.", detay: "Bazen katılmamak bile bir bedel getiriyor." },
      },
    ],
  },
  {
    id: "genel_esrarengiz_mektup",
    kategori: "sosyal",
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
        ipucu: "Gerçeği öğrenirsin ama huzurunu bozabilir",
        basariliSonuc: { ahlak: 12, mesaj: "Araştırman iddianın asılsız olduğunu, kıskanç birinin oyunu olduğunu ortaya çıkardı.", detay: "Huzurun geri geldi ama o mektubu yazanın kim olduğunu hep merak edeceksin." },
        basarisizSonuc: { ahlak: -15, saglik: -10, mesaj: "Araştırman gereksiz kavgalara ve güvensizliğe yol açtı.", detay: "Bazen sormamak, sormaktan daha iyi sonuç veriyor." },
      },
      {
        metin: "Mektubu yırt at, önemseme.",
        baseBasariSansi: 85,
        ipucu: "Huzurunu korur, gerçek asla öğrenilmez",
        basariliSonuc: { mesaj: "Mektubu unuttun, hayatın normal akışına devam etti.", detay: "Bazı taşları yerinden oynatmamak daha iyidir." },
        basarisizSonuc: { ahlak: -8, mutluluk: -5, mesaj: "Mektubu görmezden gelsen de aklından hiç çıkmadı; güvensizlik içine yerleşti.", detay: "Görmezden gelmek her zaman unutmak anlamına gelmiyor." },
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
        ipucu: "Parayı geri alma şansı, utandırma riski",
        basariliSonuc: { para: 20, mesaj: "Utanan adam borcunu hemen ödedi.", detay: "Bir daha kimse senden borç para istemedi ama parayı da almış oldun." },
        basarisizSonuc: { un: -12, saglik: -5, mesaj: "Adam parası olmadığını söyleyip olay çıkardı; sen küçük düştün.", detay: "Israrın seni de gülünç duruma soktu." },
      },
      {
        metin: "Sessizce unut, ilişkiyi bozma.",
        baseBasariSansi: 90,
        ipucu: "Parayı kaybedersin, huzuru korursun",
        basariliSonuc: { mesaj: "Parayı unuttun; dostluğunuz bozulmadı.", detay: "Küçük bir kayıp, büyük bir huzursuzluktan iyidir dedin kendine." },
        basarisizSonuc: { para: -10, mesaj: "Adam borcunu unuttuğunu görünce senden bir borç daha istedi.", detay: "İyi niyetin bazen kötüye kullanılıyor." },
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
        ipucu: "Ücretsiz ve eğlenceli, sonuç garantisiz",
        basariliSonuc: { un: 15, mesaj: "Tablo şaşırtıcı derecede güzel çıktı; ressam onu sergiye koydu ve adın da geçti.", detay: "Şehirde 'tablodaki adam' diye tanınmak tuhaf ama hoş bir his." },
        basarisizSonuc: { un: -8, mesaj: "Tablo pek de iltifat sayılmayacak bir şekilde çıktı; herkes güldü.", detay: "Sanatçının 'ilginç yüz' dediği şey pek de iltifat değilmiş." },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 95,
        ipucu: "Risksiz",
        basariliSonuc: { mesaj: "Reddettin, yoluna devam ettin.", detay: "Belki ilginç bir anıyı kaçırdın ama hiçbir riske girmedin." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Ressam ısrar edip seni uzun süre meydanda oyaladı; günün geri kalanı sinirlerin bozuk geçti.", detay: "Basit bir 'hayır' bazen sandığından uzun sürüyor." },
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
        ipucu: "Küçük ödeme ve tuhaf bir şöhret",
        basariliSonuc: { para: 15, un: 12, mesaj: "Fotoğrafın vitrine asıldı; tanıdıkların seni görünce gülüyor.", detay: "Küçük bir ek gelir ve mahallede eğlenceli bir üne kavuştun." },
        basarisizSonuc: { un: -10, mesaj: "Fotoğraf makinesi parlarken gözlerini kapattın; komik bir kare vitrine asıldı.", detay: "Herkes o kareyi görüp gülüyor; en azından paranı aldın." },
      },
      {
        metin: "Teklifi reddet.",
        baseBasariSansi: 95,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Reddettin, sıradan hayatına devam ettin.", detay: "Vitrinlerde görünmek herkese göre değil." },
        basarisizSonuc: { para: -5, mesaj: "Dükkân sahibi ısrarcıydı, ondan kurtulmak için küçük bir şey almak zorunda kaldın.", detay: "Bazen hayır demek bile bir bedel getiriyor." },
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
        ipucu: "Tehlikeyi bertaraf eder, yaralanma riski",
        basariliSonuc: { un: 20, saglik: -8, mesaj: "Sürüyü dağıttınız; köy yeniden güvenli hissetti.", detay: "Kurtlardan biri sana yaklaştığında ürktün ama geri çekilmedin." },
        basarisizSonuc: { saglik: -30, olum_sansi: 10, mesaj: "Bir kurt seni ısırdı; yara iyileşse de uzun süre acıdı.", detay: "Doğayla giriştiğin bu mücadelede bu sefer kazanan sen olmadın." },
      },
      {
        metin: "Evinde kal, hayvanlarını içeri al.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama pasif",
        basariliSonuc: { mesaj: "Hayvanlarını içeri aldın; kurtlar başka bir eve yöneldi.", detay: "Güvende kaldın ama komşunun hayvanları telef oldu." },
        basarisizSonuc: { para: -20, mesaj: "Önlemlere rağmen bir kurt ahırın kapısını zorlayıp içeri girdi.", detay: "Hayvanlarından birini kaybettin; doğa bazen tedbirlere aldırmıyor." },
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
        ipucu: "Statü sembolü, gereksiz masraf",
        basariliSonuc: { para: -20, un: 15, mesaj: "Saatin dikkat çekti; çevren seni daha 'modern' görmeye başladı.", detay: "Küçük bir aksesuar, sosyal çevrende beklenmedik bir etki yarattı." },
        basarisizSonuc: { para: -25, mesaj: "Saat bir hafta sonra bozuldu; tamirci parçalarının sahte olduğunu söyledi.", detay: "Modaya kapılmak bazen pahalı bir ders oluyor." },
      },
      {
        metin: "Almana gerek olmadığını düşün.",
        baseBasariSansi: 95,
        ipucu: "Tasarruflu ve mantıklı",
        basariliSonuc: { para: 5, mesaj: "Paranı sakladın; moda bir süre sonra zaten değişti.", detay: "Aklıselim davranmak her zaman kazandırır." },
        basarisizSonuc: { un: -8, mesaj: "Bazı çevrelerde 'saati bile yok' diye küçümsendin.", detay: "Mantıklı olmak bazen sosyal bir bedel getiriyor." },
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
        ipucu: "Onurlu ve dürüst",
        basariliSonuc: { un: 20, ahlak: 20, mesaj: "Teslim ettiğin elyazması değerli bir tarihi belge çıktı; adın kayıtlara geçti.", detay: "Bulduğun şeyi sahiplenmemen, seni şehirde dürüstlüğüyle tanınan biri yaptı." },
        basarisizSonuc: { un: 5, mesaj: "Teslim ettin ama kimse pek ilgilenmedi; sıradan bir belgeymiş.", detay: "Dürüstlüğün karşılığını her zaman büyük bir ödülle almıyorsun." },
      },
      {
        metin: "Sessizce kendine sakla, belki değerlidir.",
        baseBasariSansi: 55,
        ipucu: "Belki servet, belki hiçbir şey",
        basariliSonuc: { para: 45, ahlak: -15, mesaj: "Elyazması gerçekten değerliymiş; gizlice bir koleksiyoncuya sattın.", detay: "Parayı aldın ama bunun aslında kime ait olduğunu biliyorsun." },
        basarisizSonuc: { ahlak: -15, mesaj: "Elyazması değersiz bir kopya çıktı; sakladığın şey boşuna bir sırdı.", detay: "Bazen risk almak hiçbir şey kazandırmıyor, sadece vicdanını yoruyor." },
      },
    ],
  },

  // ============================================================
  // GENEL — ek küçük/tuhaf olaylar ve tarihi renk
  // ============================================================
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
        ipucu: "Vicdan ve saygınlık, yaralanma riski",
        basariliSonuc: { un: 25, ahlak: 30, saglik: -10, mesaj: "Çöken evden bir aileyi sağ çıkardınız; şehir seni konuşuyor.", detay: "Ellerin taş ve toz içinde kaldı ama kurtardığın hayatlar buna değdi." },
        basarisizSonuc: { saglik: -30, olum_sansi: 8, mesaj: "Enkaz çalışması sırasında üstüne bir duvar parçası düştü.", detay: "Yardım etmeye çalışırken kendin de yaralandın." },
      },
      {
        metin: "Kendi evini ve ailenin güvenliğini önceliklendir.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama vicdan sızlatabilir",
        basariliSonuc: { saglik: 5, mesaj: "Ailen güvende; evinin hasarını onardın.", detay: "Başkalarına yardım etmedin ama önce kendi ocağını korudun." },
        basarisizSonuc: { ahlak: -12, para: -20, mesaj: "Evin de hasar gördü, üstüne yardım da etmediğin için komşuların senden uzaklaştı.", detay: "Bazen hem kendini hem başkalarını koruyamıyorsun." },
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
        ipucu: "Sabırla çözülür ya da inandıramazsın",
        basariliSonuc: { mesaj: "Sonunda seni dinlediler ve yanlış kişi olduğunu anladılar.", detay: "Kalbin hızla çarpsa da olay tatlıya bağlandı." },
        basarisizSonuc: { saglik: -22, para: -15, mesaj: "Adamlar sana inanmadı; dövülüp cebindeki parayı da aldılar.", detay: "Yanlış bir benzerlik yüzünden başkasının borcunu bedenle ödedin." },
      },
      {
        metin: "Kalabalığın dikkatini dağıt, kaç.",
        baseBasariSansi: 55,
        ipucu: "Riskli ama hızlı kurtuluş",
        basariliSonuc: { mesaj: "Kalabalık bir anlığına şaşırdı, sen de sıvıştın.", detay: "Kalp çarpıntınla eve vardığında gülmekten kendini alamadın." },
        basarisizSonuc: { saglik: -18, mesaj: "Kaçarken yakalandın; kaçman onları daha da şüphelendirdi.", detay: "Masum olduğunu ispatlamak, kaçtıktan sonra çok daha zor oldu." },
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
        ipucu: "Yeni çevre ya da büyük mahcubiyet",
        basariliSonuc: { un: 22, para: 15, mesaj: "Kimse hatayı fark etmedi; hatta etkileyici birkaç isimle tanıştın.", detay: "Bazen doğru yerde olmak, davetli olup olmadığından daha önemli." },
        basarisizSonuc: { un: -20, mesaj: "Ev sahibi seni tanımadığını fark edip herkesin önünde dışarı çıkardı.", detay: "Utanç dolu birkaç dakika, uzun süre unutulmadı." },
      },
      {
        metin: "Davetiyeyi geri gönder, gitme.",
        baseBasariSansi: 95,
        ipucu: "Dürüst ve güvenli",
        basariliSonuc: { ahlak: 12, mesaj: "Dürüstlüğün küçük ama tatmin edici bir huzur getirdi.", detay: "Belki ilginç bir geceyi kaçırdın ama vicdanın rahat." },
        basarisizSonuc: { mesaj: "Davetiyeyi geri gönderdin ama merakın seni uzun süre kemirdi.", detay: "Doğru olanı yaptın, yine de 'gitseydim ne olurdu' diye düşünmeden edemedin." },
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
        ipucu: "İleri görüşlü ama garipsenirsin",
        basariliSonuc: { un: 20, ahlak: 15, mesaj: "Uyguladığın basit önlemler mahallende hastalığın yayılmasını gerçekten yavaşlattı.", detay: "Kimse bunun neden işe yaradığını tam anlamasa da sonuçlar ortada; sana farklı gözle bakmaya başladılar." },
        basarisizSonuc: { un: -12, mesaj: "Komşuların fikrini 'yabancı saçmalığı' diye alaya aldı ve uygulamadı.", detay: "Yeni bir fikri kabul ettirmek bazen zaman istiyor; bu sefer o zaman yetmedi." },
      },
      {
        metin: "İlgilenme, geleneksel yöntemlere güven.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama fırsatı değerlendirmemiş olursun",
        basariliSonuc: { mesaj: "Alışıldık yöntemlerle devam ettin; kimse seni garipsemedi.", detay: "Belki faydalı bir fikri es geçtin ama en azından uyumlu kaldın." },
        basarisizSonuc: { saglik: -12, mesaj: "O yıl çevrende hastalık her zamankinden hızlı yayıldı.", detay: "Belki yeni fikri denesen fark yaratabilirdin; bunu hiç öğrenemeyeceksin." },
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
        ipucu: "Büyük bir buluşa ortak olabilirsin ya da gülünç olabilirsin",
        basariliSonuc: { para: 35, un: 15, mesaj: "Makine gerçekten işe yaradı! Komşun seninle ortaklık kurdu, birlikte küçük bir üretim başlattınız.", detay: "Kimse bu tuhaf alete bir kuruş vermeyi düşünmezken sen düşündün ve kazandın." },
        basarisizSonuc: { para: -10, mesaj: "Makine ilk denemede parçalandı; komşun üzgün ama sen daha üzgünsün.", detay: "Bazı hevesler sadece hevestir." },
      },
      {
        metin: "Kibarca reddet.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Reddettin; komşun biraz gücenmiş görünse de anlayışla karşıladı.", detay: "Bazı riskler almaya değmiyor." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Komşun makinesini başka birine sattı ve o kişi zengin oldu.", detay: "Kaçırdığın fırsatı öğrenmek biraz içini burktu." },
      },
    ],
  },
  {
    id: "genel_kayip_mektup_yillar_sonra",
    kategori: "sosyal",
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
        ipucu: "Belki geç kalmış bir buluşma, belki hayal kırıklığı",
        basariliSonuc: { ahlak: 15, mesaj: "Kişiyi buldun; artık evli olsa da güzel bir sohbet ve karşılıklı bir gülümsemeyle ayrıldınız.", detay: "Geçmişin bir parçasıyla barışmak, garip ama iyi hissettirdi." },
        basarisizSonuc: { ahlak: -8, mesaj: "Kişi çoktan başka bir şehre taşınmıştı; iz bulamadın.", detay: "Bazı hikayeler yarım kalmaya mahkummuş." },
      },
      {
        metin: "Mektubu okuyup anı olarak sakla.",
        baseBasariSansi: 95,
        ipucu: "Basit ve duygusal",
        basariliSonuc: { ahlak: 10, mesaj: "Mektubu okuyup gülümsedin ve özenle bir kutuya kaldırdın.", detay: "Geçmişin küçük bir parçası artık seninle; bazen bu yeterli." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Mektup seni beklenenden çok duygulandırdı, birkaç gün dalgın dolaştın.", detay: "Geçmiş bazen davetsiz bir şekilde bugüne karışıyor." },
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
        ipucu: "Onur kazanırsın ya da güçlü bir düşman edinirsin",
        basariliSonuc: { un: 25, ahlak: 10, mesaj: "Sözlerin kalabalığın alkışını topladı; soylu mahcup ayrıldı.", detay: "Handa uzun süre 'soyluyu susturan adam' diye anıldın." },
        basarisizSonuc: { para: -20, un: -12, saglik: -10, mesaj: "Soylu adamları çağırıp seni han dışına attırdı.", detay: "Onurun için ayağa kalktın ve bunun bir bedeli oldu." },
      },
      {
        metin: "Görmezden gel, sessizce ayrıl.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama gururu incitir",
        basariliSonuc: { mesaj: "Olay çıkmadan handan ayrıldın.", detay: "İçin biraz kaynadı ama başın belaya girmedi." },
        basarisizSonuc: { un: -15, mesaj: "Handakiler sessizliğini 'korkaklık' diye yorumladı.", detay: "Sağduyulu davranmak bazen itibar kaybettiriyor." },
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
        ipucu: "Küçük masraf, büyük ya da hiç kazanç",
        basariliSonuc: { para: 40, mesaj: "Eşya gerçekten değerliymiş; bir koleksiyoncuya iyi bir fiyata sattın.", detay: "Tavan arasında yıllarca duran bir şey, beklenmedik bir gelir kapısı oldu." },
        basarisizSonuc: { para: -8, mesaj: "Eşya sıradan bir taklit çıktı; sadece uzman ücretini ödemiş oldun.", detay: "Her eski eşya değerli değilmiş." },
      },
      {
        metin: "Aile yadigarı olarak sakla, satma.",
        baseBasariSansi: 95,
        ipucu: "Duygusal değer, maddi fırsat kaybı",
        basariliSonuc: { ahlak: 12, mesaj: "Eşyayı sakladın; ailende bir sonraki nesle aktarılacak bir anı oldu.", detay: "Bazı şeylerin değeri parayla ölçülmüyor." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Yıllar sonra eşyanın çok değerli olduğunu öğrendin ama artık kaybolmuştu.", detay: "Bazen doğru karar bile pişmanlık getirebiliyor." },
      },
    ],
  },

  // ============================================================
  // KİŞİLİĞE ÖZEL OLAYLAR — her biri sadece o özelliğe sahip
  // karakterlerin karşısına çıkar
  // ============================================================
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
        ipucu: "Doğana uygun ama sonucu belirsiz",
        basariliSonuc: { un: 20, ahlak: -10, mesaj: "Sert çıkışın adamı köşeye sıkıştırdı; kalabalık senden yana oldu.", detay: "Öfken bu kez işe yaradı; herkes haklı olduğunu gördü." },
        basarisizSonuc: { para: -20, saglik: -15, mesaj: "Kavga büyüdü, ikiniz de dövüldünüz ve para cezası kestiler.", detay: "Sinirin yine seni zor bir duruma soktu; bunu bir kez daha fark ettin." },
      },
      {
        metin: "Dişini sık, derin bir nefes al ve yürü git.",
        baseBasariSansi: 70,
        ipucu: "Zor ama olgun bir seçim",
        basariliSonuc: { ahlak: 18, saglik: -3, mesaj: "Kendini zor tuttun ama başardın; içinde bir gerginlik kaldı.", detay: "Sinirli tabiatına rağmen bu sefer kazanan sen oldun; nadiren bu kadar zor gelmişti." },
        basarisizSonuc: { ahlak: -8, saglik: -10, mesaj: "Sakin kalmaya çalışırken bile öfken içinde kaynadı; o gece uyuyamadın.", detay: "Bastırdığın öfke bir yerde patlamak için bekliyor gibi hissettin." },
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
        ipucu: "Doğal liderlik anı",
        basariliSonuc: { un: 28, ahlak: 20, mesaj: "Sesin ve sakinliğin paniği dağıttı; insanlar düzenli şekilde tahliye oldu.", detay: "Herkesin çığlık attığı yerde senin sesin duyuldu ve bu, seni doğal bir lider yaptı." },
        basarisizSonuc: { saglik: -12, mesaj: "Sakinliğin bu sefer yeterli olmadı, kalabalık seni dinlemedi.", detay: "Bazen en sakin ses bile kaosu bastıramıyor." },
      },
      {
        metin: "Sessizce kendi güvenliğini sağla, öne çıkma.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, fark edilmeyen bir seçim",
        basariliSonuc: { saglik: 8, mesaj: "Sakince güvenli bir yere geçtin; kimse seni fark etmedi.", detay: "Sükunetin bu sefer sadece kendine fayda sağladı ve bu da yeterliydi." },
        basarisizSonuc: { un: -10, mesaj: "Sakin kalman, sonradan 'neden yardım etmedin' diye sorgulanmana neden oldu.", detay: "Sakinliğin bazen kayıtsızlık gibi yanlış anlaşılıyor." },
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
        ipucu: "Sadece ahlaksızlara açık: Çok kârlı ama ölümcül tehlikeli",
        basariliSonuc: {
          para: 50,
          un: 15,
          ahlak: -30,
          mesaj: "Soyluyu, kılık değiştirmiş halini etrafa yaymakla tehdit ettin. Sana yüklü bir 'sus payı' ödedi.",
          detay: "Kibrin seni zengin etti, ancak gölgelerde çok güçlü bir düşman edindin."
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "Şantajı gururuna yediremeyen soylu, o gece evine suikastçılar yolladı. Kibrinin bedelini canınla ödedin."
        }
      },
      {
        metin: "Gidip özür dile, gururunu yut.",
        baseBasariSansi: 55,
        ipucu: "Kibrine aykırı ama gerekli",
        basariliSonuc: { ahlak: 20, un: -8, mesaj: "Özrün kabul edildi; adam anlayış gösterdi ama olan oldu.", detay: "Kibrini yutmak zordu ama en azından büyük bir düşman kazanmadın." },
        basarisizSonuc: { un: -25, para: -20, mesaj: "Özrün yeterince samimi bulunmadı; adam seni işlerinden dışladı.", detay: "Kibrin bu sefer büyük bir bedel ödetti." },
      },
      {
        metin: "Umursama, kim olduğu önemli değil.",
        baseBasariSansi: 45,
        ipucu: "Kibrine sadık ama riskli",
        basariliSonuc: { ahlak: -15, mesaj: "Şaşırtıcı biçimde hiçbir şey olmadı; adam meseleyi unutmuş gibi görünüyor.", detay: "Bu sefer kibrin bedelsiz kaldı ama şansına güvenmemelisin." },
        basarisizSonuc: { para: -35, un: -25, mesaj: "Adam, nüfuzunu kullanarak seni birçok çevrede zora soktu.", detay: "Kibrin, hiç tanımadığın güçlü bir düşman kazandırdı." },
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
        ipucu: "Karakterine sadık ama düşman kazandırır",
        basariliSonuc: { un: 22, mesaj: "Kalabalık seni destekledi; 'dobra biri' diye ünün arttı.", detay: "Keskin dilin bu sefer sana itibar kazandırdı." },
        basarisizSonuc: { un: -20, para: -15, mesaj: "Hedefindeki kişi güçlüymüş; işlerini sessizce baltalamaya başladı.", detay: "Alaycılığının bedelini uzun vadede ödemeye başladın." },
      },
      {
        metin: "Şakaydı de, durumu yumuşat.",
        baseBasariSansi: 70,
        ipucu: "Doğana aykırı ama ilişkiyi kurtarır",
        basariliSonuc: { ahlak: 12, mesaj: "Gerginliği yumuşattın; adam gücenmiş görünse de mesele büyümedi.", detay: "Keskin dilini bu sefer frenlemeyi başardın." },
        basarisizSonuc: { un: -12, mesaj: "Yumuşatma girişimin daha da sırıtkan durdu; kimse ikna olmadı.", detay: "Bazen zarar zaten verilmiş oluyor." },
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
        ipucu: "İyimserliğin bulaşıcı olabilir",
        basariliSonuc: { un: 28, ahlak: 25, para: -10, mesaj: "Sözlerin insanlara güç verdi; birlikte zorlukları aşmaya karar verdiniz.", detay: "Umudun, çoğu insanın vazgeçtiği yerde bir topluluk ruhu yarattı." },
        basarisizSonuc: { un: -15, mesaj: "İyimserliğin bazılarınca 'gerçeklerden kopuk' diye eleştirildi.", detay: "Umut her zaman herkesi ikna etmiyor." },
      },
      {
        metin: "Kendi umudunla yetin, sessizce ilerle.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, içsel bir güç",
        basariliSonuc: { ahlak: 15, mesaj: "Umudun kimseye görünmeden seni ayakta tuttu.", detay: "Bazen umut, paylaşılmasa da bir kişiyi ayakta tutmaya yeter." },
        basarisizSonuc: { mesaj: "Umudun bu sefer gerçekle örtüşmedi, hayal kırıklığı yaşadın.", detay: "İyimserlik her zaman ödüllendirilmiyor ama vazgeçmeyi de öğretmiyor." },
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
        ipucu: "Doğana aykırı bir çaba, gerçek bir ödül",
        basariliSonuc: { para: 35, un: 18, ahlak: 15, mesaj: "Şaşırtıcı biçimde işe yaradı; belki de her şey boşuna değilmiş.", detay: "İçindeki umutsuzluğa rağmen denemen, sandığından daha iyi sonuçlandı." },
        basarisizSonuc: { ahlak: -15, mesaj: "Beklediğin gibi oldu; işe yaramadı ve bu seni haklı çıkardı sandın.", detay: "'Zaten biliyordum' dedin kendine ama içinde küçük bir hayal kırıklığı daha birikti." },
      },
      {
        metin: "Uğraşma, zaten fark etmez.",
        baseBasariSansi: 90,
        ipucu: "Doğana uygun ama fırsatı kaçırırsın",
        basariliSonuc: { mesaj: "Fırsatı geçiştirdin; hayatın alışıldık akışında devam etti.", detay: "İçinden bir yer 'ya deneseydim' dese de bunu kabul etmek istemedin." },
        basarisizSonuc: { ahlak: -12, mesaj: "Başkasının aynı fırsatla başarılı olduğunu görünce için burkuldu.", detay: "Denemediğin şeyin başkasının elinde çiçek açması, umutsuzluğunu daha da derinleştirdi." },
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
        ipucu: "Zor ama hayati bir adım",
        basariliSonuc: { ahlak: 20, saglik: 15, mesaj: "Birine açılmak beklediğinden zor değildi; biraz da olsa yükün hafifledi ve ayağa kalktın.", detay: "Yalnız taşımadığın bir yük, taşınabilir hale geldi." },
        basarisizSonuc: { un: -12, saglik: -10, mesaj: "Açıldığın kişi seni anlamadı, 'abartıyorsun' dedi.", detay: "Yanlış kişiye açılmak, hiç açılmamaktan bazen daha ağır geliyor." },
      },
      {
        metin: "Kimseye söyleme, kendi başına yatağında bekle.",
        baseBasariSansi: 55,
        ipucu: "Tehlikeli ve yalnız bir mücadele",
        basariliSonuc: { saglik: -12, mesaj: "Zorlukla da olsa günlerini idare ettin; kimse bir şey fark etmedi.", detay: "Ağırlığı tek başına taşımak seni yordu ama mucize eseri hayatta kaldın." },
        basarisizSonuc: {
          saglik: -35,
          para: -20,
          olum_sansi: 8,
          mesaj: "Ağırlık seni tamamen yuttu. Günlerce uyudun, işinden oldun ve sağlığın hızla bozuldu.",
          detay: "İçindeki karanlık, bedenini de tüketmeye başladı."
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
        ipucu: "Cesaretinin ödülü büyük, tehlike gerçek",
        basariliSonuc: { para: 55, un: 30, mesaj: "İçeride gerçekten değerli bir şey buldun; kimsenin cesaret edemediğini sen yaptın.", detay: "Cesaretin bir kez daha karşılığını verdi; şehirde adın 'korkusuz' diye anılıyor." },
        basarisizSonuc: { saglik: -35, olum_sansi: 12, mesaj: "Yapı çöktü, enkazın altında kalmaktan son anda kurtuldun.", detay: "Cesaretin bu sefer seni neredeyse hayatına mal ediyordu." },
      },
      {
        metin: "Sağduyulu davran, bu sefer riske girme.",
        baseBasariSansi: 85,
        ipucu: "Doğana aykırı ama güvenli",
        basariliSonuc: { mesaj: "İçindeki sesi bastırıp uzak durdun; garip bir huzursuzlukla da olsa güvendesin.", detay: "Cesaretini bu sefer kullanmamayı seçtin ve bu da bir çeşit güçtü." },
        basarisizSonuc: { un: -12, mesaj: "Başka biri girip hazineyi buldu; 'sen neden girmedin' diye takıldılar.", detay: "Cesur bilinmenin bir bedeli de bu: girmediğinde bile açıklama bekleniyor." },
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
        ipucu: "Zor ama iyileştirici",
        basariliSonuc: { ahlak: 20, saglik: 8, mesaj: "Yüzleşmek acı vericiydi ama bir şekilde içini rahatlattı.", detay: "Hüznünü bastırmak yerine kabullenmek, beklediğinden farklı bir huzur getirdi." },
        basarisizSonuc: { saglik: -12, mesaj: "Yüzleşme beklediğinden ağır geldi; birkaç gün kimseyle konuşamadın.", detay: "Bazı anılar, yüzleşilse bile kolayca geçmiyor." },
      },
      {
        metin: "Hüznünü gizle, günlük hayatına devam et.",
        baseBasariSansi: 80,
        ipucu: "Görünürde güvenli ama biriktirir",
        basariliSonuc: { mesaj: "Hüznünü içinde tutup işlerine devam ettin; kimse bir şey fark etmedi.", detay: "Hüznün, senin sessiz yol arkadaşın olmaya devam ediyor." },
        basarisizSonuc: { ahlak: -10, saglik: -10, mesaj: "Gizlemeye çalışman seni daha da yordu; hüznün fiziksel bir ağırlığa dönüştü.", detay: "Bastırılan duygular bazen bedeninde kendine yer buluyor." },
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
        ipucu: "Sosyal ağının meyvesi",
        basariliSonuc: { para: 40, un: 25, mesaj: "Bağlantıların sayesinde kapı gerçekten açıldı; herkes 'onu tanıyorum' demenin değerini bir kez daha gösterdi.", detay: "Geniş çevren yine işine yaradı; bazı insanlar için ağ, sermayeden değerlidir." },
        basarisizSonuc: { para: -15, un: -8, mesaj: "Fırsat göründüğü kadar iyi değildi; zaman ve umudun boşa gitti.", detay: "Bazen çok fazla insan tanımak, yanlış fırsatlara da açık olmak demek." },
      },
      {
        metin: "Fırsatı bir dostuna öner, ondan gitsin.",
        baseBasariSansi: 90,
        ipucu: "Cömert bir seçim",
        basariliSonuc: { ahlak: 25, un: 15, mesaj: "Dostun fırsatı değerlendirdi ve sana ömür boyu müteşekkir kaldı.", detay: "Bazen bir kapıyı başkasına açmak, kendine açmaktan daha değerli hissettiriyor." },
        basarisizSonuc: { ahlak: 12, mesaj: "Dostun fırsatı değerlendiremedi; ikiniz de biraz hayal kırıklığına uğradınız.", detay: "İyi niyetin her zaman istediğin sonucu vermiyor." },
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
        ipucu: "Doğana aykırı ama fırsat getirebilir",
        basariliSonuc: { un: 22, para: 15, saglik: -10, mesaj: "Zorlukla da olsa katıldın; birkaç değerli tanışıklık edindin.", detay: "Kalabalık seni yordu ama tamamen boşuna değildi." },
        basarisizSonuc: { saglik: -18, un: -8, mesaj: "Kalabalıkta bunalıp erken ayrıldın; bu fark edildi.", detay: "Kendini zorlamak her zaman işe yaramıyor; bu sefer bedeli ağırdı." },
      },
      {
        metin: "Nazik bir bahaneyle katılma, kendi huzurunu koru.",
        baseBasariSansi: 85,
        ipucu: "Doğana uygun, fırsat kaçabilir",
        basariliSonuc: { saglik: 12, mesaj: "Evde sakin bir akşam geçirdin; kendini yeniden topladın.", detay: "Herkes sosyalleşmek zorunda değil; kendi huzurunu bilmek de bir güç." },
        basarisizSonuc: { un: -12, mesaj: "Katılmadığın davette önemli bir fırsat konuşulmuş; bunu kaçırdığını sonradan öğrendin.", detay: "İçe dönüklüğün seni korudu ama bir kapıyı da kapattı." },
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
        ipucu: "Doğana sadık ama riskli",
        basariliSonuc: { un: 25, ahlak: 12, mesaj: "Dürüstlüğünle tanındın; birçok kişi aslında aynı şeyi düşünüyormuş.", detay: "Sivri dilin bu sefer bir cesaret göstergesi olarak okundu." },
        basarisizSonuc: { para: -25, un: -18, mesaj: "Hedefindeki kişi güçlüymüş; işlerini sessizce zorlaştırmaya başladı.", detay: "Sözlerinin bir bedeli oldu ve bu bedeli şimdi ödüyorsun." },
      },
      {
        metin: "Özür dile, ilişkiyi onarmaya çalış.",
        baseBasariSansi: 70,
        ipucu: "Doğana aykırı ama telafi edici",
        basariliSonuc: { ahlak: 15, mesaj: "Özrün kabul edildi; ilişki onarıldı, gerçi biraz gururun kırıldı.", detay: "Keskin dilini frenlemek zor oldu ama işe yaradı." },
        basarisizSonuc: { un: -12, mesaj: "Özrün yeterince samimi bulunmadı; ilişki zaten zedelenmişti.", detay: "Bazı sözler söylendikten sonra geri alınamıyor." },
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
        ipucu: "Zor ama gerekli bir sınır",
        basariliSonuc: { ahlak: 15, un: 8, mutluluk: 5, mesaj: "Nazik ama net duruşun saygı gördü; adam istediğinden vazgeçti.", detay: "Yumuşak huylu olmak, sınır koyamamak demek değilmiş; bunu kanıtladın." },
        basarisizSonuc: { un: -8, mutluluk: -5, mesaj: "Reddin bazılarınca 'ona benzemiyor' diye şaşkınlıkla karşılandı.", detay: "Sınır koymak, doğana aykırı görünse de bazen gerekiyor." },
      },
      {
        metin: "Her zamanki gibi kabul et, huzuru bozma.",
        baseBasariSansi: 90,
        ipucu: "Doğana uygun ama sömürülme riski",
        basariliSonuc: { ahlak: -8, para: -10, mutluluk: -10, mesaj: "İsteği kabul ettin; adam memnun ayrıldı ama sen biraz daha eksildin.", detay: "Herkesi memnun etmek bazen kendi payına düşeni azaltıyor." },
        basarisizSonuc: { para: -25, ahlak: -12, un: -10, mesaj: "Kabul etmen, adamın seni tekrar tekrar kullanmasına kapı araladı.", detay: "İyiliğin bu sefer sömürülmene neden oldu. Aynaya baktığında kendine kızıyorsun." },
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
        ipucu: "Doğana uygun, yüksek risk yüksek ödül",
        basariliSonuc: { para: 40, un: 25, mutluluk: 15, mesaj: "Rekabeti açık farkla kazandın; rakibin bile seni tebrik etmek zorunda kaldı.", detay: "Rekabetçi doğan bir kez daha seni öne çıkardı." },
        basarisizSonuc: { para: -20, un: -12, mutluluk: -20, mesaj: "Rakibin seni geride bıraktı; kaybetmek her zamankinden ağır geldi.", detay: "Rekabetçi ruhun bazen seni gereğinden fazla riske sokuyor ve kaybettiğinde seni yıkıyor." },
      },
      {
        metin: "Rekabeti görmezden gel, kendi hızında ilerle.",
        baseBasariSansi: 70,
        ipucu: "Doğana aykırı ama sağduyulu",
        basariliSonuc: { ahlak: 15, mutluluk: 5, mesaj: "Rekabete girmedin; içinde bir huzursuzluk olsa da işlerin sağlıklı ilerledi.", detay: "Her yarışa girmemeyi öğrenmek de bir olgunluk." },
        basarisizSonuc: { un: -10, mutluluk: -10, mesaj: "Rakibin senin katılmamanı 'yenilgiyi kabullenmek' diye yorumladı.", detay: "Rekabetten çekilmen bile başkalarınca bir sonuç gibi okundu ve bu gururunu kırdı." },
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
        ipucu: "Doğana uygun, büyük kazanç ya da büyük kayıp",
        basariliSonuc: { para: 65, un: 25, maas_carpani: 1.3, mesaj: "Büyük hamlen karşılığını verdi; işin bir üst seviyeye sıçradı.", detay: "Hırsın bir kez daha seni öne taşıdı; ama içindeki ses hâlâ 'daha fazlası olmalı' diyor." },
        basarisizSonuc: { para: -55, un: -15, mutluluk: -15, mesaj: "Büyük hamlen tutmadı; elindeki sağlam işin bile bir kısmını kaybettin.", detay: "Hırsın bu sefer seni yeterli olanla yetinmemeye ikna etti ve bedelini çok ağır ödedin." },
      },
      {
        metin: "Elindekiyle yetin, riske girme.",
        baseBasariSansi: 80,
        ipucu: "Doğana aykırı ama güvenli",
        basariliSonuc: { para: 12, ahlak: 12, mesaj: "Elindekiyle yetindin; içindeki huzursuzluğa rağmen işin istikrarlı kaldı.", detay: "Hırsını bu sefer frenlemeyi başardın; kolay olmadı." },
        basarisizSonuc: { ahlak: -10, mutluluk: -15, mesaj: "Yetinmeye çalışsan da içindeki tatminsizlik seni günlerce uykusuz bıraktı.", detay: "Hırslı bir doğaya sahip olmak, 'yeter' demeyi bir işkenceye dönüştürüyor." },
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
        ipucu: "Doğana uygun, maddi fırsat kaybı",
        basariliSonuc: { ahlak: 30, un: 12, mutluluk: 15, mesaj: "Vicdanının sesini dinledin; kimse bilmese de kendinle barışıksın.", detay: "Vicdanlı doğan bir kez daha seni doğru olana yöneltti. Başını yastığa rahat koyuyorsun." },
        basarisizSonuc: { para: -20, mesaj: "Doğru olanı yaptın ama bu, beklediğinden daha pahalıya mal oldu.", detay: "Vicdanının sesini dinlemenin bazen somut bir bedeli oluyor." },
      },
      {
        metin: "Kendine 'bu sefer mecburum' de, kolay yolu seç.",
        baseBasariSansi: 60,
        ipucu: "Doğana aykırı, maddi kazanç",
        basariliSonuc: { para: 45, ahlak: -35, mutluluk: -25, mesaj: "Kazandın ama o masum adamın yüzü aklından çıkmıyor.", detay: "Vicdanlı bir insan olarak bu seçim, kazandığın paradan çok daha ağır bir zehir bıraktı." },
        basarisizSonuc: { para: -20, ahlak: -25, un: -20, mesaj: "Hem beklediğin kazancı elde edemedin hem de vicdanın seni yiyip bitirdi.", detay: "Doğana aykırı davranmak, kaybettiğinde iki kat ağır geliyor." },
      },
    ],
  },

  // ============================================================
  // YERLEŞİM OLAYLARI
  // ============================================================
  {
    id: "yerlesim_dag_ayi_karsilasmasi",
    kategori: "saglik",
    gerekliEtiketler: ["yerlesim:dag"],
    gorsel: "🐻",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dağın Sahibi",
    metin:
      "Dağ başındaki evine dönerken dar patikada devasa, aç bir ayıyla göz göze geldin. Ne o kıpırdıyor ne sen. Silahsızsan ölümle burun burunasın.",
    secenekler: [
      {
        metin: "Kara Kılıcı çek ve ayının üzerine yürü!",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:kara_kilic"],
        ipucu: "Gizli Envanter: Kılıç kana susadı",
        basariliSonuc: {
          un: 30,
          saglik: 5,
          ahlak: -15,
          mesaj: "Kılıcı çektiğin an ayı sana değil, kılıçtan sızan karanlığa baktı ve korkuyla geri adım attı. Ama sen durmadın. Tek darbede canavarı yere serdin.",
          detay: "Köyde sana 'Ayı Boğan' diyorlar ama sen kılıcın o an elinde nasıl kendi kendine titreştiğini unutamıyorsun."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Yavaşça geri çekil, gürültü çıkarma.",
        baseBasariSansi: 65,
        ipucu: "Güvenli ama sinir bozucu bekleyiş",
        basariliSonuc: {
          mesaj: "Ayı ilgisini kaybedip ormana döndü; sen de nefesini tutarak evine ulaştın.",
          detay: "Dağda yaşamanın ilk kuralı sabırdır; bugün onu bir kez daha kanıtladın.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 8,
          mesaj: "Ayı ürktü ve üzerine geldi; kendini zar zor bir kayanın arkasına atarak kurtardın.",
          detay: "Sırtındaki pençe izleri uzun süre iyileşmedi.",
        },
      },
      {
        metin: "Elindeki değneği sallayıp yüksek sesle bağır.",
        baseBasariSansi: 45,
        ipucu: "Riskli ama hızlı çözüm",
        basariliSonuc: {
          un: 15,
          mesaj: "Ayı şaşırıp kaçtı; köye döndüğünde hikayeni anlata anlata bitiremedin.",
          detay: "Dağ köylüleri arasında adın bir süre 'cesur' olarak anıldı.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 15,
          mesaj: "Ayı saldırdı; kollarındaki ve göğsündeki derin yaralarla köye kanlar içinde ulaştın.",
          detay: "O günden sonra ormana her girişinde o anı hatırlıyorsun.",
        },
      },
    ],
  },
  {
    id: "yerlesim_sinir_baskini",
    kategori: "savas",
    gerekliEtiketler: ["yerlesim:sinir"],
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Sınırda Baskın",
    metin:
      "Gece yarısı sınır boyundaki köyünüze küçük bir akıncı grubu baskın düzenledi. Silah sesleri, yanan evler ve çığlıklarla uyandın.",
    secenekler: [
      {
        metin: "Elindeki silahla köyün savunmasına koş.",
        baseBasariSansi: 55,
        ipucu: "Yüksek ün ve minnet, ciddi yaralanma riski",
        basariliSonuc: {
          un: 25,
          para: 15,
          mesaj: "Baskını püskürtmeye yardım ettin; köylüler sana minnettar kaldı.",
          detay: "Ganimetten ve teşekkürlerden payına düşeni aldın.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 12,
          durum_ekle: { id: "sinir_yarasi", ad: "Baskın Yarası", tur: "kalici", tur_basi_saglik: -1 },
          mesaj: "Çarpışmada ağır yaralandın; iyileşmen haftalar sürdü.",
          detay: "Sınırda yaşamanın bedeli bazen etinde kalıyor.",
        },
      },
      {
        metin: "Aileni alıp ormana kaç, baskın geçsin.",
        baseBasariSansi: 75,
        ipucu: "Güvenli ama mal kaybı",
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
    gerekliEtiketler: ["yerlesim:sehir"],
    gorsel: "🤧",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kalabalık Çarşı",
    metin:
      "Şehir merkezindeki çarşı her zamanki gibi tıklım tıklım; ama bu ay ateşli hastalık vakaları da hızla artıyor. Kalabalıkta durmak riskli, uzak durmaksa fırsatları kaçırmak demek.",
    secenekler: [
      {
        metin: "Çarşıya karış, fırsatları değerlendir.",
        baseBasariSansi: 60,
        ipucu: "Kazanç fırsatı, hastalık riski",
        basariliSonuc: {
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
        ipucu: "Güvenli ama durgun",
        basariliSonuc: {
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

  // ============================================================
  // SANAYİ DEVRİMİ — ŞEHİR HAYATI VE SENDİKALAR
  // ============================================================
  {
    id: "sanayi_fabrika_grevi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    gorsel: "🏭",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Fabrika Grevi",
    metin:
      "{bolge} fabrikalarında işçiler ücret zammı ve insani şartlar için greve gitti. Sokaklar gerginlik dolu; askerler yolda. Herkes bir taraf tutmanı bekliyor.",
    secenekler: [
      {
        metin: "Greve destek ver, işçilerin yanında dur.",
        baseBasariSansi: 55,
        ipucu: "Halkın gözünde saygınlık, işveren çevresinde düşmanlık",
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          para: -10,
          etiket_ekle: ["halkin_adami"],
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
        ipucu: "Maddi kazanç, halkın nefreti",
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
    metin:
      "Mahallenizde yeni kurulan bir sendika üyelerini gizlice topluyor. {dost} da sana katılmanı öneriyor; dayanışma güçlü ama devletin gözünde riskli bir bağlılık.",
    secenekler: [
      {
        metin: "Sendikaya katıl, {dost} ile birlikte hareket et.",
        baseBasariSansi: 75,
        ipucu: "Dostluğun güçlenir, küçük bir aidat gider",
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
        ipucu: "Bağımsızlık, {dost} ile mesafe",
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
    metin:
      "Yerel bir gazete senin hakkında bir yazı hazırlıyor. Muhabir dürüst bir röportaj mı, yoksa abartılmış, süslü bir kahramanlık hikayesi mi istediğini soruyor.",
    secenekler: [
      {
        metin: "Dürüst bir röportaj ver, olduğun gibi anlat.",
        baseBasariSansi: 80,
        ipucu: "Ölçülü ama kalıcı bir itibar",
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
        ipucu: "Büyük ün riski, ortaya çıkarsa itibar kaybı",
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
    metin:
      "Yeni açılan demiryolu hattı, uzak bir şehirdeki büyük bir fırsata birkaç saatte ulaşmanı sağlıyor. Bilet pahalı ama fırsat kaçırılmayacak gibi.",
    secenekler: [
      {
        metin: "Bileti al, trene bin ve fırsatın peşinden git.",
        baseBasariSansi: 60,
        maliyet: 15,
        ipucu: "Büyük kazanç potansiyeli, bilet parası cepten gider",
        basariliSonuc: {
          para: 50,
          un: 10,
          mesaj: "Yolculuk karşılığını fazlasıyla verdi; anlaşma imzalandı.",
          detay: "Demiryolu çağı, mesafeleri fırsata çevirenleri ödüllendiriyor.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Şehre vardığında fırsatın çoktan başkasına gittiğini öğrendin.",
          detay: "Bazen tren zamanında varır ama fırsat seni beklemez.",
        },
      },
      {
        metin: "Riske girme, parasını sakla, evde kal.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama fırsat tamamen kaçar",
        basariliSonuc: {
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
    gerekliEtiketler: ["yerlesim:sehir"],
    gorsel: "🏮",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Gaz Lambası Sokakları",
    metin:
      "Gaz lambalarıyla aydınlanan şehir sokakları geceleri yeni bir hayata bürünüyor: kahvehaneler, kumarhaneler, sosyetenin buluştuğu salonlar. {rakip}'in de bu gece dışarıda olduğunu duydun.",
    secenekler: [
      {
        metin: "Sen de sosyeteye karış, yeni bağlantılar kur.",
        baseBasariSansi: 60,
        ipucu: "Sosyal fırsat ve eğlence, cepten para gider",
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
        ipucu: "Güvenli ama durgun",
        basariliSonuc: {
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

  // ============================================================
  // DOST / RAKİP İLİŞKİLERİ VE TEPKİLER
  // ============================================================
  {
    id: "iliski_dost_zor_durumda",
    kategori: "sosyal",
    minYas: 16,
    gorsel: "🤝",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dostun Zor Durumda",
    metin:
      "{dost} kapına dayandı; borçları büyümüş, eli boş kalmış. Senden yardım istiyor ama bu kolay bir yardım olmayacak.",
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
    metin:
      "{rakip} seninle uzun süredir çekişiyordu, ama bugün kapına bir ortaklık teklifiyle geldi. Samimi mi, yoksa bir tuzak mı, kestiremiyorsun.",
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
    metin:
      "{dost} ile aranızda küçük bir söz yüzünden büyüyen bir tartışma çıktı. Bu, uzun yıllar süren bir dostluğu bitirebilir.",
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
    metin:
      "{rakip}'in senin hakkında asılsız bir dedikodu yaydığını öğrendin; çevrende bazı insanlar buna inanmaya başlamış bile.",
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

  // ============================================================
  // RÜTBE 3 — KOMUTA VE YÖNETİM KARARLARI
  // ============================================================
  {
    id: "rutbe3_asker_saldiri_karari",
    kategori: "savas",
    meslekler: ["Asker"],
    minRutbeSeviye: 3,
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Komuta Kararı",
    metin:
      "Artık komutansın. Keşif kolun, yakın bir vadide konuşlanmış küçük bir düşman birliği bildirdi; zayıf görünüyorlar ama bu bir tuzak da olabilir. Emri sen vereceksin, birliğin sana güveniyor.",
    secenekler: [
      {
        metin: "İleri! Şafakla baskın emri ver.",
        baseBasariSansi: 55,
        ipucu: "Büyük zafer ve ganimet, ağır kayıp riski",
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
          durum_ekle: { id: "komuta_yarasi", ad: "Komuta Yarası", tur: "kalici", tur_basi_saglik: -1 },
          mesaj: "Tuzaktı. Birliğin ağır kayıp verdi, sen de kendini zar zor cepheden çıkardın.",
          detay: "Bu karar hem bedeninde hem de itibarında derin bir iz bıraktı.",
        },
      },
      {
        metin: "Bekle, önce istihbarat topla.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama fırsat penceresi kapanabilir",
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
    meslekler: ["Tüccar"],
    minRutbeSeviye: 3,
    gorsel: "⚖️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Lonca Kararı",
    metin:
      "Lonca ustası olarak ekmek ve tahıl fiyatlarını sen belirliyorsun artık. Kıtlık var; halk zor durumda ama fiyatları düşük tutmak kendi kârından feragat etmen demek.",
    secenekler: [
      {
        metin: "Fiyatları düşük tut, halkın yanında ol.",
        baseBasariSansi: 70,
        ipucu: "Halkın güveni ve saygınlık, ciddi kâr kaybı",
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
        ipucu: "Büyük kâr, halkın nefreti",
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
    meslekler: ["Din Adamı"],
    minRutbeSeviye: 3,
    gorsel: "🕊️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kürsü Kararı",
    metin:
      "Baş vaiz oldun; cemaatin arasında gerginlik var. Bazıları başka inançtan komşularına karşı sert bir vaaz istiyor, bazıları hoşgörü çağrısı bekliyor. Kürsüden söyleyeceğin söz bu şehri yönlendirecek.",
    secenekler: [
      {
        metin: "Hoşgörü ve birlik çağrısı yap.",
        baseBasariSansi: 75,
        ipucu: "Vicdan huzuru ve uzun vadeli saygınlık, bazı cemaatçileri kızdırır",
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
        ipucu: "Kürsüde güçlü otorite, toplumsal gerginlik",
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

  // ============================================================
  // GERİ ADIM MEKANİZMASI (onTepki) — zaman ilerlemeden, bir tepki
  // görüp geri çekilme ya da ısrar etme şansı veren gerginlik anları
  // ============================================================
  {
    id: "tepki_amire_meydan_okuma",
    kategori: "siyaset",
    minYas: 16,
    gorsel: "🗣️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sabrın Taştı",
    metin:
      "{amir} bugün yine haksız bir eleştiri yöneltti, üstelik herkesin önünde. İçindeki öfke boğazına dayandı.",
    secenekler: [
      {
        metin: "Sineye çek, bir şey deme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama içine atarsın",
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
        ipucu: "Riskli ama gururunu korursun",
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin:
            "{amir} şaşkınlıkla sana bakıyor, etraftakiler işini gücünü bırakmış izliyor. Söylediğin söz geri alınamaz ama daha ileri gitmek senin elinde.",
          geriCekilMetni: "Hemen yumuşat: 'öyle demek istemedim.'",
          geriCekilSonucu: {
            ahlak: -5,
            mutluluk: 2,
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
    id: "tepki_es_iddiali_soz",
    kategori: "sosyal",
    gerekliEtiketler: ["medeni:evli"],
    gorsel: "💢",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ev İçi Bir Söz Düellosu",
    metin:
      "{es} ile bir konuda anlaşamadınız; tartışma büyüdü. Ağzından çıkacak bir sonraki söz, bu geceyi ya onaracak ya da derinleştirecek.",
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
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin:
            "Kelimeler dilinin ucunda. {es}'in gözlerindeki ifade değişiyor; bu cümleyi kurarsan geri dönüşü zor olabilir.",
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
    id: "tepki_ticaret_sert_tehdit",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    gorsel: "🤝",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Masadaki Gerginlik",
    metin:
      "Uzun süredir çalıştığın bir tedarikçi, anlaştığınız fiyatı son anda yükseltmeye kalktı. Öfken kabarıyor; ilişkiyi bitirecek bir tehdit savurmak üzeresin.",
    secenekler: [
      {
        metin: "Sakin kal, yeni bir fiyat teklif et.",
        baseBasariSansi: 80,
        ipucu: "Güvenli, orta yol",
        basariliSonuc: {
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
        ipucu: "Riskli, tüm anlaşmayı bozabilir",
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin:
            "Tedarikçinin yüzü asılıyor. 'Bu ilişkiyi burada bitirebiliriz' demek üzeresin ama bu, yıllardır kurduğun bir bağı riske atar.",
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
    meslekler: ["Din Adamı"],
    gorsel: "⛪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kürsüde Bir An",
    metin:
      "Vaaz sırasında cemaatten biri sesini yükseltip seni açıkça sorguladı. Herkes sana bakıyor; söyleyeceğin bir sonraki söz otoriteni ya pekiştirir ya da sarsar.",
    secenekler: [
      {
        metin: "Sabırla, ölçülü bir yanıt ver.",
        baseBasariSansi: 80,
        ipucu: "Güvenli, saygı kazandırır",
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
        ipucu: "Riskli, cemaati bölebilir",
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin:
            "Sesin sertleşiyor, cemaat susuyor. Bu tonda devam edersen otoriteni pekiştirebilir ya da cemaatini ikiye bölebilirsin.",
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
    id: "tepki_dost_agir_soz",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "😤",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dostluğu Sınayan An",
    metin:
      "{dost} ile aranızda küçük bir yanlış anlaşılma büyüdü. Ağzından çıkacak ağır bir söz, yıllarca süren bu dostluğu sarsabilir.",
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
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
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
    metin:
      "{rakip} yine seninle ilgili kötü bir söz yaydığını duydun. Karşına çıktığında, herkesin önünde onunla hesaplaşmak üzeresin.",
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
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin:
            "{rakip} karşında, etraftakiler durup izlemeye başladı. Bir adım daha atarsan bu artık geri dönülemez bir yüzleşmeye dönüşecek.",
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
    id: "tepki_hizip_sir_ifsa_tehdidi",
    kategori: "siyaset",
    gerekliHizip: true,
    gorsel: "🗝️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Elindeki Sır",
    metin:
      "Hizbinle ilgili tehlikeli bir sır öğrendin. Bunu açığa vurmak hem seni hem de bağlı olduğun grubu büyük bir krize sürükleyebilir; ama sessiz kalmak da vicdanını rahatsız ediyor.",
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
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin:
            "Söyleyeceğin sözler henüz kimseye ulaşmadı ama bu an geri dönüşü olmayan bir eşik. Bir adım daha atarsan hizbinle yolların tamamen ayrılabilir.",
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
    id: "tepki_asker_amirine_itaatsizlik",
    kategori: "savas",
    meslekler: ["Asker"],
    gorsel: "🎖️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Emre Karşı Gelmek",
    metin:
      "{amir} sana açıkça haksız, hatta tehlikeli bir emir verdi. Askerlik disiplini itaat ister ama vicdanın buna karşı çıkıyor.",
    secenekler: [
      {
        metin: "Emri sorgulamadan yerine getir.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, disiplinli",
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
        ipucu: "Riskli, disiplin suçu sayılabilir",
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin:
            "{amir} gözlerini kısıyor: 'Emre itaatsizlik mi ediyorsun?' Bu soruya vereceğin yanıt, askerlik hayatını değiştirebilir.",
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

  // ============================================================
  // ESKALASYON ZİNCİRLERİ — savaş/tartışma/pazarlık: bir seçim yapıp
  // hemen ardından "devam mı, dur mu" sorulan, zorunlu_sonraki tabanlı
  // iki adımlı olaylar (zaman her iki adımda da normal şekilde ilerler)
  // ============================================================
  {
    id: "zincir_asker_baskin_karari",
    kategori: "savas",
    meslekler: ["Asker"],
    gerekliUlke: { savasta: true },
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Baskın Anı",
    metin:
      "Birliğin küçük bir düşman kervanına baskın düzenledi. Kısa bir çatışmanın ardından ganimet ele geçirildi; ama komutan sana dönüp soruyor: 'Burada mı duralım?'",
    secenekler: [
      {
        metin: "Ele geçirileni topla, geri çekil.",
        baseBasariSansi: 80,
        ipucu: "Güvenli, orta ganimet",
        basariliSonuc: {
          para: 20,
          un: 8,
          etiket_ekle: ["zincir_ganimet_devam"],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "Ele geçirdiğinizi toplayıp güvenle geri çekildiniz.",
          detay: "Komutan kararını beğendi: 'Açgözlülük bazen en büyük düşmandır.'",
        },
        basarisizSonuc: {
          para: 10,
          saglik: -8,
          etiket_ekle: ["zincir_ganimet_devam"],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "Geri çekilme karıştı, birkaç asker hafif yaralandı ama ganimet elinizde kaldı.",
          detay: "Yine de tehlikeli bir çekilmeydi.",
        },
      },
      {
        metin: "Daha fazlası için ileri gidin.",
        baseBasariSansi: 55,
        ipucu: "Riskli, büyük ganimet ya da ağır kayıp",
        basariliSonuc: {
          para: 40,
          un: 18,
          etiket_ekle: ["zincir_ganimet_devam"],
          zorunlu_sonraki: "zincir_asker_ganimet_devami",
          mesaj: "İleri atıldınız; ikinci bir kervan daha ele geçirdiniz.",
          detay: "Birliğin morali gökte, ama şansınız ne kadar sürer?",
        },
        basarisizSonuc: {
          saglik: -25,
          un: -15,
          etiket_ekle: ["zincir_ganimet_devam"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["zincir_ganimet_devam"],
    gorsel: "💰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bu Kadarı Yeter mi?",
    metin:
      "Komutan birliğe dönüp soruyor: 'Bu kadar ganimet yeter mi, yoksa daha da saldıralım mı?' Herkesin gözü sende; kararını bekliyorlar.",
    secenekler: [
      {
        metin: "Yeter. Kazandığımızla dönelim.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, kazancı korursun",
        basariliSonuc: {
          un: 10,
          etiket_sil: ["zincir_ganimet_devam"],
          mesaj: "Kazandığınızla geri döndünüz; birlik sağ salim üsse ulaştı.",
          detay: "Bazen en akıllıca zafer, zamanında durabilmektir.",
        },
        basarisizSonuc: {
          un: -5,
          etiket_sil: ["zincir_ganimet_devam"],
          mesaj: "Geri dönüş kararı bazı askerleri hayal kırıklığına uğrattı.",
          detay: "Herkes aynı fikirde olmuyor.",
        },
      },
      {
        metin: "Hayır, daha fazlası için saldıralım.",
        baseBasariSansi: 45,
        ipucu: "Riskli, ya büyük zafer ya ağır kayıp",
        basariliSonuc: {
          para: 50,
          un: 28,
          etiket_sil: ["zincir_ganimet_devam"],
          mesaj: "İkinci dalga da başarıyla sonuçlandı; birliğin adı bölgede yayıldı.",
          detay: "Şansınız bu kez de yaver gitti.",
        },
        basarisizSonuc: {
          saglik: -35,
          un: -20,
          olum_sansi: 12,
          etiket_sil: ["zincir_ganimet_devam"],
          mesaj: "Son saldırı felaketle sonuçlandı; birlik ağır kayıp verdi.",
          detay: "Açgözlülüğün faturası bu kez çok ağır ödendi.",
        },
      },
    ],
  },
  {
    id: "zincir_asker_dusman_kacisi",
    kategori: "savas",
    meslekler: ["Asker"],
    gorsel: "🏹",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kaçan Düşman",
    metin:
      "Kısa bir çarpışmanın ardından düşman birliği dağılıp kaçtı. Birkaçı yaralı, yavaş hareket ediyor; kovalarsan yetişebilirsin.",
    secenekler: [
      {
        metin: "Bırak gitsinler, mevzini koru.",
        baseBasariSansi: 85,
        ipucu: "Güvenli",
        basariliSonuc: {
          saglik: 5,
          etiket_ekle: ["zincir_takip_devam"],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Mevzini korudun; birlik dinlenme fırsatı buldu.",
          detay: "Bazen zafer, kovalamamakla korunur.",
        },
        basarisizSonuc: {
          un: -5,
          etiket_ekle: ["zincir_takip_devam"],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Bekleme kararı bazı askerlerce korkaklık sayıldı.",
          detay: "Her temkinli karar takdir görmüyor.",
        },
      },
      {
        metin: "Peşlerinden git, işi bitir.",
        baseBasariSansi: 60,
        ipucu: "Riskli ama tam zafer şansı",
        basariliSonuc: {
          un: 20,
          para: 15,
          etiket_ekle: ["zincir_takip_devam"],
          zorunlu_sonraki: "zincir_asker_takip_karari",
          mesaj: "Kaçanları yakaladın; birlik tam bir zafer kazandı.",
          detay: "Ama artık bilinmeyen bir araziye girdiniz.",
        },
        basarisizSonuc: {
          saglik: -20,
          etiket_ekle: ["zincir_takip_devam"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["zincir_takip_devam"],
    gorsel: "🌲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bilinmeyen Arazi",
    metin:
      "Kovalamaca sizi tanımadığınız bir ormana sürükledi. İleride bir şeyler hareket ediyor — belki takviye kuvvet, belki sadece rüzgar. Devam mı, geri mi?",
    secenekler: [
      {
        metin: "Geri dön, riske girme.",
        baseBasariSansi: 85,
        ipucu: "Güvenli",
        basariliSonuc: {
          etiket_sil: ["zincir_takip_devam"],
          mesaj: "Geri döndünüz; birlik güvenle üsse ulaştı.",
          detay: "Temkinli komutanlar uzun yaşar.",
        },
        basarisizSonuc: {
          un: -8,
          etiket_sil: ["zincir_takip_devam"],
          mesaj: "Geri dönüş kararı bazılarınca fırsatı kaçırmak sayıldı.",
          detay: "Herkesi memnun etmek imkansız.",
        },
      },
      {
        metin: "İçeri gir, tehlikeyi göze al.",
        baseBasariSansi: 45,
        ipucu: "Riskli, pusu ya da büyük fırsat",
        basariliSonuc: {
          para: 35,
          un: 25,
          etiket_sil: ["zincir_takip_devam"],
          mesaj: "İçeride terk edilmiş bir düşman kampı buldunuz; ganimet birliğe kaldı.",
          detay: "Cesaretiniz bu kez ödüllendirildi.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          etiket_sil: ["zincir_takip_devam"],
          mesaj: "Ormanın içi gerçek bir tuzaktı; birlik ağır kayıp verdi.",
          detay: "Rüzgar değilmiş.",
        },
      },
    ],
  },
  {
    id: "zincir_tuccar_agir_pazarlik",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    gorsel: "📜",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sert Bir Teklif",
    metin:
      "Büyük bir alıcı, mallarını piyasa fiyatının çok altında almak istiyor. Kabul edersen küçük ama garanti bir kâr; reddedersen daha büyük bir kazanç riske girer.",
    secenekler: [
      {
        metin: "Teklifi kabul et, işi garantile.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, düşük kâr",
        basariliSonuc: {
          para: 15,
          etiket_ekle: ["zincir_pazarlik_devam"],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Teklifi kabul ettin; kâr düşük ama garanti.",
          detay: "Bazen küçük ama kesin kazanç, büyük risk almaya bedeldir.",
        },
        basarisizSonuc: {
          para: 8,
          etiket_ekle: ["zincir_pazarlik_devam"],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Teklifi kabul ettin ama alıcı son anda şartları biraz daha ağırlaştırdı.",
          detay: "Masada her zaman avantajlı çıkamazsın.",
        },
      },
      {
        metin: "Reddet, daha iyi bir fiyat için ısrar et.",
        baseBasariSansi: 50,
        ipucu: "Riskli, büyük kazanç ya da satış kaybı",
        basariliSonuc: {
          para: 30,
          etiket_ekle: ["zincir_pazarlik_devam"],
          zorunlu_sonraki: "zincir_tuccar_pazarlik_sonucu",
          mesaj: "Israrın işe yaradı, alıcı fiyatı yükseltti.",
          detay: "Cesaretin bu kez karşılığını buldu.",
        },
        basarisizSonuc: {
          para: -10,
          etiket_ekle: ["zincir_pazarlik_devam"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["zincir_pazarlik_devam"],
    gorsel: "🧾",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Alıcı Geri Döndü",
    metin:
      "Aynı alıcı birkaç gün sonra geri geldi, bu kez daha büyük bir sipariş öneriyor — ama şartları daha da sıkı. Bu ilişkiye daha fazla bağlanmak ister misin?",
    secenekler: [
      {
        metin: "Teşekkür et, ilişkiyi burada bırak.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, sınırlı büyüme",
        basariliSonuc: {
          etiket_sil: ["zincir_pazarlik_devam"],
          mesaj: "Nazikçe reddettin; ilişki dengeli kaldı.",
          detay: "Her fırsatı değerlendirmek zorunda değilsin.",
        },
        basarisizSonuc: {
          para: -5,
          etiket_sil: ["zincir_pazarlik_devam"],
          mesaj: "Reddin alıcıyı gücendirdi, küçük bir müşteri kaybettin.",
          detay: "Bazen 'hayır' da bir bedel taşır.",
        },
      },
      {
        metin: "Büyük siparişi kabul et, riski göze al.",
        baseBasariSansi: 50,
        ipucu: "Riskli, büyük kazanç ya da bağımlılık",
        basariliSonuc: {
          para: 45,
          maas_carpani: 1.1,
          etiket_sil: ["zincir_pazarlik_devam"],
          mesaj: "Büyük sipariş sorunsuz tamamlandı; ticaretin bir kademe büyüdü.",
          detay: "Bazı riskler gerçekten karşılığını veriyor.",
        },
        basarisizSonuc: {
          para: -30,
          etiket_sil: ["zincir_pazarlik_devam"],
          mesaj: "Sipariş sırasında bir şeyler ters gitti, zarar ettin.",
          detay: "Büyük fırsatlar büyük riskle gelir.",
        },
      },
    ],
  },
  {
    id: "hizip_eski_muhafizlar_sadakat_yemini",
    agirlik: 1.6,
    kategori: "siyaset",
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
    gorsel: "👑",
    baslik: "Kanla Yazılan Yemin",
    metin:
      "Eski Muhafızlar, krala ve eski komutanlara olan sarsılmaz bağlılıklarını tazelemek için gece yarısı meşaleler eşliğinde törensel bir yemin düzenliyor. Herkesin kılıcını çekip kanla söz vermesi bekleniyor.",
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
    gorsel: "🛡️",
    baslik: "Karanlık Operasyon",
    metin:
      "Komutanların, Yeni Nizam'a yakın genç teğmenlerin toplandığı gizli bir hücreyi basmanı istiyor. Listede senin de eskiden tanıdığın birinin adı var. Emir kesin: 'Hiçbirini sağ bırakma.'",
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
    gorsel: "🎖️",
    baslik: "Paşaların Savaşı",
    metin: "Hizip içinde iki güçlü paşa arasında kimin daha fazla sözü geçeceği konusunda tehlikeli bir kavga çıktı. İkisi de alt kademedeki senin gibi subaylardan destek bekliyor.",
    secenekler: [
      {
        metin: "Kıdemli ve yaşlı paşayı destekle.",
        baseBasariSansi: 75,
        ipucu: "Geleneklere bağlı, güvenli liman",
        basariliSonuc: {
          un: 10,
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
    gorsel: "🗣️",
    baslik: "Kralın Köpeği",
    metin:
      "Sokakta üniformanla yürürken açlıktan bir deri bir kemik kalmış gençler yüzüne tükürdü ve 'Kralın Köpeği!' diye bağırdı. Etraftaki esnaf izliyor.",
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
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
          detay: "Hem kahraman oldun hem zenginleştin. İkiyüzlülüğün zirvesindesin."
        },
        basarisizSonuc: {
          saglik: -20,
          un: -20,
          mesaj: "Adam çok tehlikeli bir suikastçı çıktı! Seni bıçaklayıp kaçtı.",
          detay: "Hem parayı alamadın hem de kan revan içinde kaldın."
        }
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
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
          etiket_ekle: ["esya:atadan_kalma_kilic"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Eski Muhafızlar"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
    gorsel: "🕯️",
    baslik: "İhtilalin Ayak Sesleri",
    metin:
      "Yeni Nizam, terk edilmiş bir değirmende gece yarısı gizli bir toplantı düzenliyor. Kralı devirme planları konuşulacak. Yakalanırsan cezan vatana ihanetten idam.",
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
    gorsel: "💣",
    baslik: "Barut Kokusu",
    metin:
      "Hareketin liderlerinden biri sana dinamit lokumları uzattı: 'Bu gece kralın mühimmat deposunu havaya uçuracaksın.' Ancak deponun hemen yanında sivil evler var.",
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
          detay: "Sen bir devrimci değil, savaştan beslenen bir akbabasın."
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "Açgözlülüğün yüzünden geciktin. Muhafızlar seni depoda kıstırdı ve oracıkta kurşuna dizildin."
        }
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
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
          etiket_ekle: ["sir:cinayet"],
          mesaj: "Adamla buluşmaya kılıcınla gittin. Kimse görmeden işini bitirdin ve nehre attın.",
          detay: "Sırrın güvende. Ancak ruhun artık cehenneme bir adım daha yakın."
        },
        basarisizSonuc: {
          olum: true,
          mesaj: "Adam yalnız gelmemişti! Muhafızlarla sana pusu kurdu ve oracıkta vurularak öldün."
        }
      },
      {
        metin: "Blöf yapıyor! Ona hiçbir şey verme.",
        baseBasariSansi: 65,
        ipucu: "Para sende kalır, risk %50",
        basariliSonuc: {
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
    gorsel: "📝",
    baslik: "Yasak Notlar",
    metin: "Bir üst subay, elinde reform fikirlerini içeren notlarınla seni yakaladı. Gözlerindeki ifadeyi okuyamıyorsun — seni ele mi verecek, yoksa...",
    secenekler: [
      {
        metin: "Notların senin olmadığını iddia et, yalan söyle.",
        baseBasariSansi: 55,
        basariliSonuc: {
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
    gorsel: "🪤",
    baslik: "Kokusu Çıkan Bir Tuzak",
    metin: "Eski Muhafızlar'dan biri sana 'gizli bir silah deposu' olduğunu söylediği bir yere gitmeni öneriyor. İçgüdülerin bunun bir tuzak olabileceğini fısıldıyor.",
    secenekler: [
      {
        metin: "Riski göze al, yine de git.",
        baseBasariSansi: 45,
        ipucu: "Gerçekten tuzak olabilir ama gerçek de olabilir",
        basariliSonuc: {
          para: 30,
          un: 10,
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
    meslekler: ["Asker"],
    gerekliEtiketler: ["hizip:Yeni Nizam"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
    gorsel: "🌱",
    baslik: "Loncaya Yeni Kan",
    metin: "Zengin bir ailenin şımarık oğlu, sırf babasının parasıyla loncaya kabul edilmek istiyor. Senin kefaletini istiyor.",
    secenekler: [
      {
        metin: "Kefil ol, gelecekteki bağlantılara yatırım yap.",
        baseBasariSansi: 75,
        ipucu: "Uzun vadeli bağlantı, kısa vadeli baş ağrısı",
        basariliSonuc: {
          para: 15,
          dost_puani: 8,
          mesaj: "Kefil oldun; babası minnettarlığını hemen bir hediyeyle gösterdi.",
          detay: "Loncada bağlantılar bazen sermayeden daha değerlidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          para: -10,
          mesaj: "Şımarık oğlan ilk haftadan bir skandala karıştı, adın da lekelendi.",
          detay: "Bazı kefaletler pişmanlıkla sonuçlanır.",
        },
      },
      {
        metin: "Kibarca reddet, kendi işine odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: {
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
    gorsel: "🔏",
    baslik: "Loncanın Mührü",
    metin: "Lonca ustaları, mallarını 'Liman Loncası onaylıdır' mührüyle damgalamana izin verebilir — ama bunun için sıkı kurallara uymayı kabul etmen gerekiyor.",
    secenekler: [
      {
        metin: "Kuralları kabul et, mührü al.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 15,
          un: 10,
          mesaj: "Mühür artık senin, müşteriler malına daha çok güveniyor.",
          detay: "İtibar bazen altından daha değerlidir.",
        },
        basarisizSonuc: {
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
    gorsel: "🤝",
    baslik: "El Sıkışmayla Yeter",
    metin: "Yaşlı bir lonca üyesi, hiçbir yazılı belge olmadan sadece el sıkışarak büyük bir anlaşma yapmak istiyor. 'Eskiden söz senetten önce gelirdi' diyor.",
    secenekler: [
      {
        metin: "El sıkış, sözüne güven.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 25,
          un: 10,
          mesaj: "Adam sözünü tuttu, anlaşma kusursuz işledi.",
          detay: "Bazen en eski usuller en sağlamıdır.",
        },
        basarisizSonuc: {
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Liman Loncası"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
    gorsel: "🚨",
    baslik: "Resmi Makamların Gölgesi",
    metin: "Resmi makamlar, Pazar Birliği'ni düzeni bozmakla suçlayıp üyelerini soruşturmaya başladı. Sıra sana da gelebilir.",
    secenekler: [
      {
        metin: "Saklan, ortalıkta görünme.",
        baseBasariSansi: 75,
        basariliSonuc: {
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
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
          para: -20,
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
    gorsel: "📢",
    baslik: "Serbest Pazar Çağrısı",
    metin: "Pazar Birliği, loncanın kurallarını hiçe sayarak izinsiz bir pazar günü düzenlemeyi planlıyor. Katılmak riskli ama kazançlı olabilir.",
    secenekler: [
      {
        metin: "Coşkuyla katıl, tezgahını kur.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 30,
          un: 15,
          mesaj: "Pazar büyük ilgi gördü, malların kapış kapış gitti.",
          detay: "Bazen kural tanımazlık en çok kazandıran şeydir.",
        },
        basarisizSonuc: {
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
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
          un: 10,
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
          un: 15,
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
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
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["hizip:Pazar Birliği"],
    gorsel: "🌱",
    baslik: "Genç Bir Ortaklık Teklifi",
    metin: "Hırslı genç bir tüccar, seninle ortaklık kurup yeni bir pazar açmak istiyor. Fikirleri cesur ama tecrübesiz.",
    secenekler: [
      {
        metin: "Teklifi kabul et, riski paylaş.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 25,
          un: 10,
          mesaj: "Ortaklığınız beklenmedik şekilde tuttu, ikiniz de kazandınız.",
          detay: "Bazen en büyük fırsatlar en genç fikirlerden doğar.",
        },
        basarisizSonuc: {
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
    gorsel: "👴",
    baslik: "Yaşlıların Meclisi",
    metin: "Cemaatin en yaşlı üyeleri seni meclislerine çağırdı. Sana eski bir ayin hakkında sorular soracaklar — cevapların bağlılığını kanıtlayacak.",
    secenekler: [
      {
        metin: "Geleneksel cevapları harfiyen tekrarla.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 10,
          un: 5,
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Gelenekçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
    gorsel: "🗣️",
    baslik: "Öncü müsün?",
    metin: "Halkın bir kesimi seni cesur bir öncü olarak görüyor, bir kesimi ise güvensiz buluyor.",
    secenekler: [
      {
        metin: "Öncülerle vakit geçir, ilham al.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 8,
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
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
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["hizip:Yenilikçiler"],
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

  // ============================================================
  // YAŞA ÖZEL ANLAR — sadece gençken (maxYas) ya da sadece yaşlıyken
  // (minYas) çıkan, o dönemin kendine özgü olaylar
  // ============================================================
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
          mutluluk: 10,
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
          mutluluk: 5,
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
    meslekler: ["Asker"],
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
    meslekler: ["Tüccar"],
    maxYas: 20,
    gorsel: "🤝",
    baslik: "İlk Pazarlık",
    metin: "Ustanın gözetiminde değil, tamamen kendi başına ilk büyük pazarlığını yapıyorsun. Karşındaki tüccar deneyimli ve sabırsız.",
    secenekler: [
      {
        metin: "Cesurca yüksek bir fiyat teklif et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 20,
          un: 10,
          mesaj: "Cesaretin karşılık buldu, iyi bir fiyata anlaştın.",
          detay: "İlk büyük pazarlık zaferini asla unutmayacaksın.",
        },
        basarisizSonuc: {
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
    meslekler: ["Din Adamı"],
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
          mutluluk: 15,
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
        ipucu: "Riskli, bedenin artık eskisi gibi değil",
        basariliSonuc: {
          mutluluk: 10,
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
          mutluluk: 15,
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
    id: "yasli_asker_son_nobet",
    agirlik: 1.4,
    kategori: "savas",
    meslekler: ["Asker"],
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
          mutluluk: 10,
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
    meslekler: ["Tüccar"],
    minYas: 60,
    gorsel: "🏪",
    baslik: "Dükkanı Devretmek",
    metin: "Yıllardır emek verdiğin işini artık devretme zamanı geldi mi diye düşünüyorsun. Genç bir yardımcın işi devralmaya hazır görünüyor.",
    secenekler: [
      {
        metin: "Güven et, işi ona devret.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 15,
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
    meslekler: ["Din Adamı"],
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
          mutluluk: 15,
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

  // ============================================================
  // BEKARLIK OLAYLARI — medeni:evli etiketinin simetriği: sadece hiç
  // evlenmemiş (ya da artık evli olmayan) karakterlere çıkan olaylar
  // ============================================================
  {
    id: "bekarlik_ozgurluk_hissi",
    kategori: "sosyal",
    yasakliEtiketler: ["medeni:evli"],
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
    yasakliEtiketler: ["medeni:evli"],
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
    yasakliEtiketler: ["medeni:evli"],
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
    yasakliEtiketler: ["medeni:evli"],
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
    yasakliEtiketler: ["medeni:evli"],
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

  // ============================================================
  // DERİNLİK MEKANİKLERİ — fiziksel kalıcılık, itibar/fraksiyon vb.
  // ============================================================
  {
    id: "derinlik_asker_agir_yara",
    kategori: "savas",
    meslekler: ["Asker"],
    yasakliEtiketler: ["kalici:tek_kolu_yok"],
    gorsel: "🩸",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kılıçların Arasında",
    metin:
      "Meydan savaşının en yoğun anında, iki düşman askeri seni kıskaca aldı. Geri çekilmek onurunu zedeler, ama sonuna kadar dövüşmek çok riskli.",
    secenekler: [
      {
        metin: "Geri çekil, kalkanının ardına sığın.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama onur kırıcı",
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
        ipucu: "Destansı bir zafer ya da kalıcı bir sakatlık riski",
        basariliSonuc: {
          un: 30,
          para: 20,
          mesaj: "İkisini de alt ettin; birlik seni destansı bir kahraman gibi karşıladı.",
          detay: "Bu gün, savaş meydanında adının efsaneleştiği gün olarak anılacak.",
        },
        basarisizSonuc: {
          saglik: -40,
          un: 10,
          etiket_ekle: ["kalici:tek_kolu_yok"],
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
    meslekler: ["Asker"],
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sıra Dövüşü",
    metin:
      "Birliğin yakın dövüş hattına giriyor. Kumandan senden karar bekliyor: ön safta iki elinle mi savaşacaksın, yoksa geride mızrakla mı destek vereceksin?",
    secenekler: [
      {
        metin: "Ön safa geç, kılıcını iki elinle kullan.",
        baseBasariSansi: 55,
        yasakliEtiketler: ["kalici:tek_kolu_yok", "kalici:savas_travmasi"],
        kilitAciklamasi: "Bedenin ve zihnin artık buna izin vermiyor.",
        ipucu: "Yüksek risk, yüksek ün",
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
        ipucu: "Güvenli, sıradan bir katkı",
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
    meslekler: ["Asker"],
    yasakliEtiketler: ["kalici:savas_travmasi"],
    gorsel: "😨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kuşatmanın Sonu",
    metin:
      "Haftalarca süren bir kuşatmanın ardından şehir düştü. Sokaklarda gördüklerin, savaşın en çirkin yüzünü gösterdi. Bu görüntüler seninle kalacak mı?",
    secenekler: [
      {
        metin: "Gördüklerini bastır, göreve devam et.",
        baseBasariSansi: 60,
        ipucu: "Görev bilinci ya da bastırılmış bir yara",
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Gördüklerini bir kenara koyup göreve devam ettin.",
          detay: "Bazı askerler bunu başarabilir, bazıları sadece başarıyormuş gibi yapar.",
        },
        basarisizSonuc: {
          mutluluk: -25,
          etiket_ekle: ["kalici:savas_travmasi"],
          mesaj: "Gördüklerin seni içten içe sarstı; geceleri artık aynı değil.",
          detay: "Savaş bazen bedeni değil, zihni yaralar — ve bu yara görünmez ama derin.",
        },
      },
      {
        metin: "Bir süre kenara çekil, kendine izin ver.",
        baseBasariSansi: 85,
        ipucu: "Daha güvenli, kariyerini biraz yavaşlatır",
        basariliSonuc: {
          mutluluk: 10,
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
    meslekler: ["Tüccar"],
    yasakliEtiketler: ["itibar:lonca_disi"],
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Loncaya Sırt Çevirmek",
    metin:
      "Loncanın kurallarını çiğneyip rakip bir şehirle gizlice, çok kârlı bir anlaşma yapma fırsatın var. Ama bu, lonca tarafından öğrenilirse geri dönüşü olmayan bir ihanet sayılır.",
    secenekler: [
      {
        metin: "Fırsatı reddet, loncaya sadık kal.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, sadakat",
        basariliSonuc: {
          dost_puani: 10,
          mesaj: "Sadakatini korudun; lonca içindeki yerin sağlam.",
          detay: "Bazı fırsatlar, güveni riske atmaya değmez.",
        },
        basarisizSonuc: { mesaj: "Reddettin ama fırsat aklından çıkmadı.", detay: "Bazı 'ne olurdu' düşünceleri uzun süre kalıyor." },
      },
      {
        metin: "Gizlice anlaşmayı yap.",
        baseBasariSansi: 45,
        ipucu: "Büyük kazanç ya da kalıcı bir dışlanma riski",
        basariliSonuc: {
          para: 50,
          mesaj: "Anlaşma fark edilmeden gerçekleşti; cebin kabardı.",
          detay: "Bu kez şanslıydın, ama bu tür şanslar sonsuza dek sürmez.",
        },
        basarisizSonuc: {
          para: 20,
          un: -30,
          etiket_ekle: ["itibar:lonca_disi"],
          mesaj: "İhanetin ortaya çıktı; lonca seni kapılarından sonsuza dek kovdu.",
          detay: "Artık loncanın himayesi ve ağı yok; her şeyi kendi başına yürütmek zorundasın.",
        },
      },
    ],
  },
  {
    id: "derinlik_din_papa_karsi_gelme",
    kategori: "din",
    meslekler: ["Din Adamı"],
    yasakliEtiketler: ["itibar:aforoz_edildi"],
    gorsel: "⛔",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kiliseye Karşı Bir Söz",
    metin: "Üst makamların bir kararını vicdanına aykırı buluyorsun. Açıkça karşı çıkmak, kilise içindeki her şeyini kaybetme riski taşıyor.",
    secenekler: [
      {
        metin: "Sessiz kal, itaat et.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, vicdan yükü",
        basariliSonuc: {
          ahlak: -10,
          mesaj: "İtaat ettin; konumun güvende ama içinde bir ağırlık var.",
          detay: "Bazı sessizlikler bir bedel öder, sadece görünmez.",
        },
        basarisizSonuc: { mutluluk: -8, mesaj: "İtaat etsen de vicdanın seni rahat bırakmadı.", detay: "Bazı düşünceler kolay susturulmuyor." },
      },
      {
        metin: "Açıkça karşı çık.",
        baseBasariSansi: 40,
        ipucu: "Vicdan rahatlığı ya da aforoz riski",
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
          etiket_ekle: ["itibar:aforoz_edildi"],
          mesaj: "Karşı çıkışın aforozla sonuçlandı; artık resmi kilise çevrelerinde bir yerin yok.",
          detay: "Vicdanın rahat, ama artık bambaşka, çok daha yalnız bir yoldasın.",
        },
      },
    ],
  },
  {
    id: "derinlik_asker_krala_karsi",
    kategori: "siyaset",
    meslekler: ["Asker"],
    yasakliEtiketler: ["itibar:kralin_dusmani"],
    gorsel: "👑",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Krala Karşı Bir Duruş",
    metin:
      "Kral, açıkça haksız ve zalimce bir emir verdi: masum bir köyün cezalandırılması. Vicdanın buna karşı çıkmanı istiyor ama bunun bedeli çok ağır olabilir.",
    secenekler: [
      {
        metin: "Emri sessizce yerine getir.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ağır bir vicdan yükü",
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
        ipucu: "Vicdanını kurtarır ama kralın düşmanı ilan edilebilirsin",
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
          etiket_ekle: ["itibar:kralin_dusmani"],
          mesaj: "Reddin krala bildirildi; artık resmi olarak 'kralın düşmanı' ilan edildin.",
          detay: "Vicdanın huzurlu, ama artık başını her an kaybedebileceğin bir hayat sürüyorsun.",
        },
      },
    ],
  },
  {
    id: "derinlik_tuccar_ipek_ticareti",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    minRutbeSeviye: 2,
    gorsel: "🧵",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Uzak Diyarların İpeği",
    metin:
      "Doğudan gelen bir kervan, eşi görülmemiş kalitede ipek getirdi. Tüm servetini bu tek yükleme yatırırsan ya efsanevi bir kazanç ya da büyük bir kayıp seni bekliyor.",
    secenekler: [
      {
        metin: "Tüm sermayeni ipeğe yatır.",
        baseBasariSansi: 50,
        maliyet: 40,
        ipucu: "Yüksek risk, efsanevi ödül",
        basariliSonuc: {
          para: 80,
          un: 20,
          unvan_kazan: "İpek Kralı",
          mesaj: "İpek, pazarda inanılmaz bir fiyata satıldı; adın artık şehrin en zengin tüccarlarıyla anılıyor.",
          detay: "İnsanlar seni artık sadece adınla değil, 'İpek Kralı' diye anmaya başladı.",
        },
        basarisizSonuc: {
          para: -45,
          mesaj: "İpeğin çoğu yolda neme yenik düştü; yatırımın büyük ölçüde boşa gitti.",
          detay: "Büyük hayaller bazen büyük kayıplarla sonuçlanıyor.",
        },
      },
      {
        metin: "Küçük bir miktar al, temkinli kal.",
        baseBasariSansi: 85,
        maliyet: 15,
        ipucu: "Güvenli, küçük kazanç",
        basariliSonuc: { para: 20, mesaj: "Küçük yatırımın güvenli bir kazanç getirdi.", detay: "Temkinlilik her zaman en heyecanlısı değildir ama güvenlidir." },
        basarisizSonuc: { para: -10, mesaj: "Küçük yatırımın bile beklediğin gibi sonuçlanmadı.", detay: "Bazı günler pazarın nabzı elden kaçıyor." },
      },
    ],
  },
  {
    id: "derinlik_asker_destansi_zafer",
    kategori: "savas",
    meslekler: ["Asker"],
    minRutbeSeviye: 2,
    gerekliUlke: { savasta: true },
    gorsel: "🏆",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Destansı Bir Savunma",
    metin:
      "Küçük birliğin, sayıca çok üstün bir düşman dalgasına karşı bir geçidi savunmakla görevlendirildi. Bu, ya efsaneye ya da unutulmuşluğa gidecek bir gün.",
    secenekler: [
      {
        metin: "Geçidi sonuna kadar savun.",
        baseBasariSansi: 45,
        ipucu: "Efsanevi zafer ya da ağır kayıp",
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
        ipucu: "Güvenli, sıradan bir gün",
        basariliSonuc: { mesaj: "Geri çekildiniz; kayıp vermeden güvenli bölgeye ulaştınız.", detay: "Her gün destansı olmak zorunda değil." },
        basarisizSonuc: { saglik: -12, mesaj: "Geri çekilme sırasında küçük çaplı bir çatışma yaşandı.", detay: "Güvenli görünen yollar bile risk taşıyabilir." },
      },
    ],
  },
  {
    id: "derinlik_din_mucize_sifa",
    kategori: "din",
    meslekler: ["Din Adamı"],
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
        ipucu: "Mucizevi bir iyileşme ya da boşa giden çaba",
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
        ipucu: "Ölçülü, daha az yıpratıcı",
        basariliSonuc: { ahlak: 8, mesaj: "Ölçülü yaklaşımın hem hastaya hem sana iyi geldi.", detay: "Her zaman en uçta olmak gerekmiyor." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Hasta kurtarılamadı ama elinden geleni yaptığını biliyorsun.", detay: "Vicdan rahatlığı bazen tek tesellidir." },
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
        ipucu: "Belki fark edilmez, belki daha kötü olur",
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
        ipucu: "Dürüst ama riskli",
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
    gerekliEtiketler: ["kandavasi:zamani"],
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
        ipucu: "Kazanırsan tehdit biter, kaybedersen ağır yaralanabilirsin",
        basariliSonuc: {
          un: 20,
          etiket_sil: ["kandavasi:zamani"],
          mesaj: "Suikastçıyı etkisiz hale getirdin; kan davası nihayet kapandı.",
          detay: "Yıllardır omzunda taşıdığın bir yük, bu gece son buldu.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 20,
          etiket_sil: ["kandavasi:zamani"],
          mesaj: "Ağır yaralandın ama suikastçı da kaçtı; en azından tehdit bir süreliğine geri çekildi.",
          detay: "Bu gece hayatta kaldın, ama bedeli ağır oldu.",
        },
      },
      {
        metin: "Kaç, yardım çağır.",
        baseBasariSansi: 65,
        ipucu: "Daha güvenli ama tehdit devam edebilir",
        basariliSonuc: {
          etiket_sil: ["kandavasi:zamani"],
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
    id: "derinlik_manastir_kedisi",
    kategori: "din",
    meslekler: ["Din Adamı"],
    yasakliEtiketler: ["esya:veba_koruyucu_kedi"],
    agirlik: 0.5,
    gorsel: "🐈‍⬛",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Manastırın Kara Kedisi",
    metin:
      "Manastırın ambarında dolaşan yaşlı bir kara kedi var. Bazı keşişler onu uğursuz sayıyor, bazıları fare avındaki ustalığından dolayı kutsuyor.",
    secenekler: [
      {
        metin: "Kediye sahip çık, ambarda tut.",
        baseBasariSansi: 85,
        ipucu: "Küçük bir gelenek, uzun vadeli fayda",
        basariliSonuc: {
          ahlak: 5,
          etiket_ekle: ["esya:veba_koruyucu_kedi"],
          mesaj: "Kediyi ambarda tutmaya karar verdin; fareler azaldıkça ambar daha temiz kaldı.",
          detay: "Bazen en sıradan bir yaratık, en büyük tehlikelere karşı sessiz bir kalkan olabiliyor.",
        },
        basarisizSonuc: { mesaj: "Kimi keşişler buna karşı çıktı ama kedi yine de ambarda kaldı.", detay: "Gelenek ile pratiklik arasında ince bir denge var." },
      },
      {
        metin: "Uğursuzluk getirir diye kediyi kovun.",
        baseBasariSansi: 90,
        ipucu: "Geleneksel ama riskli",
        basariliSonuc: { ahlak: -5, mesaj: "Kedi kovuldu; bazı keşişler rahatladı.", detay: "Batıl inanç bazen pratik faydanın önüne geçiyor." },
        basarisizSonuc: { saglik: -5, mesaj: "Kedinin gitmesiyle ambarda fareler hızla çoğaldı.", detay: "Bazı kararların bedeli aylar sonra ortaya çıkıyor." },
      },
    ],
  },
  {
    id: "derinlik_hazine_haritasi",
    kategori: "ticaret",
    yasakliEtiketler: ["envanter:hazine_haritasi", "envanter:hazine_bulundu"],
    agirlik: 0.5,
    gorsel: "🗺️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Eski Bir Harita",
    metin: "Bir eskici dükkânında, kenarları yanmış, eski bir harita buldun. Üzerinde şifreli işaretler ve bilinmeyen bir yerin krokisi var.",
    secenekler: [
      {
        metin: "Haritayı satın al.",
        baseBasariSansi: 90,
        maliyet: 10,
        ipucu: "Küçük masraf, meçhul bir fırsat",
        basariliSonuc: {
          etiket_ekle: ["envanter:hazine_haritasi"],
          para: -10,
          mesaj: "Haritayı aldın; belki sadece kağıt parçası, belki gerçek bir hazinenin anahtarı.",
          detay: "Meraklı bir zihin için küçük bir bedel.",
        },
        basarisizSonuc: { para: -15, mesaj: "Haritayı aldın ama eskici seni biraz kazıklamış gibi görünüyor.", detay: "Her pazarlık kazançlı bitmiyor." },
      },
      {
        metin: "İlgilenme, sıradan bir kağıt parçası de.",
        baseBasariSansi: 95,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Haritayı görmezden geldin, yoluna devam ettin.", detay: "Bazı fırsatlar gözden kaçırılmaya değer olabilir — ya da değmez, kim bilir." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Yürürken haritayı bir daha düşünmeden edemedin.", detay: "Merak bazen peşini bırakmıyor." },
      },
    ],
  },
  {
    id: "derinlik_hazine_kazisi",
    kategori: "ticaret",
    gerekliEtiketler: ["envanter:hazine_haritasi"],
    yasakliEtiketler: ["envanter:hazine_bulundu"],
    agirlik: 0.8,
    gorsel: "⛏️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Haritanın İşaret Ettiği Yer",
    metin: "Haritayı uzun süre inceledikten sonra, işaret ettiği yeri bulmayı başardın: terk edilmiş bir mağara girişi. Kazmaya değer mi?",
    secenekler: [
      {
        metin: "Kazı yap, riski göze al.",
        baseBasariSansi: 40,
        maliyet: 15,
        ipucu: "Büyük hazine ya da boşa geçen zaman ve tehlike",
        basariliSonuc: {
          para: 80,
          un: 15,
          etiket_ekle: ["envanter:hazine_bulundu"],
          etiket_sil: ["envanter:hazine_haritasi"],
          mesaj: "Mağaranın derinliklerinde gerçekten bir hazine sandığı buldun!",
          detay: "Bazen çocukça görünen bir merak, hayatının en büyük kazancına dönüşebiliyor.",
        },
        basarisizSonuc: {
          saglik: -20,
          para: -15,
          etiket_sil: ["envanter:hazine_haritasi"],
          mesaj: "Mağara çöktü, hazine falan yoktu; güçlükle dışarı çıktın.",
          detay: "Harita sonunda sadece eski bir kağıt parçasıymış.",
        },
      },
      {
        metin: "Riske girme, haritayı sat.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, küçük kazanç",
        basariliSonuc: {
          para: 20,
          etiket_sil: ["envanter:hazine_haritasi"],
          mesaj: "Haritayı meraklı bir koleksiyoncuya sattın; küçük ama garanti bir kazanç.",
          detay: "Bazen merakı başkasına devretmek en akıllıcasıdır.",
        },
        basarisizSonuc: {
          para: 8,
          etiket_sil: ["envanter:hazine_haritasi"],
          mesaj: "Haritayı beklediğinden düşük bir fiyata sattın.",
          detay: "Her pazarlık umduğun gibi sonuçlanmıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti",
    kategori: "din",
    yasakliEtiketler: ["esya:kutsal_kalinti"],
    agirlik: 0.4,
    gorsel: "✨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kutsal Bir Emanet",
    metin:
      "Yıkık bir şapelin altında, kim olduğu bilinmeyen bir azize ait olduğu söylenen küçük bir emanet buldun. Halk arasında ona dokunanın ölümden bir kez döneceği anlatılır.",
    secenekler: [
      {
        metin: "Emaneti yanında taşı.",
        baseBasariSansi: 90,
        ipucu: "Sadece bir söylenti mi, yoksa gerçek mi?",
        basariliSonuc: {
          ahlak: 8,
          etiket_ekle: ["esya:kutsal_kalinti"],
          mesaj: "Emaneti bir bez parçasına sarıp yanına aldın; belki sadece bir teselli, belki daha fazlası.",
          detay: "İster inan ister inanma, artık boynunda hafif bir ağırlık taşıyorsun.",
        },
        basarisizSonuc: { mesaj: "Emaneti aldın ama taşıması seni tedirgin etti, kısa süre sonra bir tanıdığına verdin.", detay: "Bazı sorumluluklar herkese göre değil." },
      },
      {
        metin: "Emanete dokunma, kilisenin yetkililerine bildir.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ahlaklı",
        basariliSonuc: { ahlak: 12, mesaj: "Emaneti resmi makamlara teslim ettin; dürüstlüğün takdir topladı.", detay: "Bazı hazineler kişisel değil, ortak mirastır." },
        basarisizSonuc: { mesaj: "Bildirdin ama yetkililer pek ilgilenmedi.", detay: "Her dürüstlük hak ettiği ilgiyi görmüyor." },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti_mucizesi",
    kategori: "din",
    gerekliEtiketler: ["esya:kutsal_kalinti"],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "✨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ölümün Eşiğinde",
    metin:
      "Ani bir ateş seni yatağa düşürdü; nefesin daralıyor, çevrendekiler fısıltıyla vedalaşıyor sanki. Göğsündeki o eski emanet, tenine değdiği yerde tuhaf bir sıcaklık yayıyor.",
    secenekler: [
      {
        metin: "Emaneti sıkıca tut, efsaneye güven.",
        baseBasariSansi: 100,
        ipucu: "Gizli Emanet: Efsane gerçekmiş — ama böyle bir mucize bir kereliğine",
        basariliSonuc: {
          saglik: -5,
          etiket_sil: ["esya:kutsal_kalinti"],
          mesaj: "Emanet elinde parladı ve için bir anda ısındı. Ateşin kırıldı, nefesin açıldı — sanki bir şey seni geri çekti. Emanet ise elinde toza dönüştü; gücünü bu bir kerelik mucizede tüketti.",
          detay: "Halk arasındaki söylenti doğruymuş: bu emanet, ölümden bir kez döndürür.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Emanete güvenme, sadece hekime ve kadere güven.",
        baseBasariSansi: 55,
        ipucu: "Güvenli bir inanç ama efsaneyi hiç sınamayacaksın",
        basariliSonuc: {
          saglik: -10,
          mesaj: "Vücudun kendi başına direndi, ateş yavaşça düştü. Emanet hâlâ boynunda, sırrını hiç öğrenemedin.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Ateş günlerce sürdü, bedenin ağır bir yara aldı. Emanete dokunmadın; belki haklıydın, belki büyük bir fırsatı kaçırdın.",
        },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti_soru",
    kategori: "din",
    gerekliEtiketler: ["esya:kutsal_kalinti"],
    gizemli: true,
    agirlik: 0.4,
    gorsel: "⛪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Emanetin Sırrı Duyuldu",
    metin:
      "Taşıdığın emanetle ilgili söylenti mahalleye yayılmış. Bir grup hacı adayı kapına dayandı: 'Duyduk ki elinde kutsal bir emanet varmış, bize göster, dokunmamıza izin ver!'",
    secenekler: [
      {
        metin: "Emaneti göster, dokunmalarına izin ver.",
        baseBasariSansi: 85,
        ipucu: "Cömertlik saygı kazandırır ama emaneti tehlikeye atarsın",
        basariliSonuc: {
          un: 15,
          ahlak: 10,
          mesaj: "Hacılar sırayla emanete dokunup dua etti. Adın bölgede 'kutsal emanetin bekçisi' olarak anılmaya başladı.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Kalabalık kontrolden çıktı, biri emaneti kapıp kaçmaya çalıştı; güçlükle geri aldın, bu kargaşada başka eşyaların da kayboldu.",
        },
      },
      {
        metin: "Emaneti sakla, kimseye göstermeyi reddet.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mesaj: "Kapıyı kapattın. Bazıları hayal kırıklığına uğradı ama emanet güvende.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "'Demek ki gerçek değilmiş, yoksa saklamazdı' diyerek dedikodu yaymaya başladılar.",
        },
      },
      {
        metin: "Emaneti kiliseye/vakfa bağışla, kalabalıktan kurtul.",
        baseBasariSansi: 95,
        ipucu: "Huzur bulursun ama efsaneyi bir daha asla sınayamazsın",
        basariliSonuc: {
          ahlak: 20,
          un: 10,
          etiket_sil: ["esya:kutsal_kalinti"],
          mesaj: "Emaneti resmi makama teslim ettin; omuzlarından ağır bir yük kalktı. Artık bekçisi değil, sadece bir tanığısın.",
        },
        basarisizSonuc: {
          etiket_sil: ["esya:kutsal_kalinti"],
          mutluluk: -5,
          mesaj: "Bağışını kabul ettiler ama teşekkür bile etmediler; emanetsiz kaldın, karşılığında hiçbir şey almadın.",
        },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin",
    kategori: "ticaret",
    yasakliEtiketler: ["esya:lanetli_altin"],
    agirlik: 0.4,
    gorsel: "🪙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Şüpheli Bir Define",
    metin:
      "Bir kervansarayda, önceki sahibinin esrarengiz biçimde kaybolduğu söylenen bir altın kesesi satılığa çıktı. Ucuz ama etrafında tuhaf söylentiler dönüyor.",
    secenekler: [
      {
        metin: "Altını satın al, söylentileri boş ver.",
        baseBasariSansi: 90,
        maliyet: 10,
        ipucu: "Ucuz kazanç, belirsiz bir bedel",
        basariliSonuc: {
          para: 45,
          etiket_ekle: ["esya:lanetli_altin"],
          durum_ekle: { id: "lanet_golgesi", ad: "Lanetin Gölgesi", tur: "kalici", tur_basi_saglik: -1 },
          mesaj: "Altını aldın; cebin kabardı ama içinde tuhaf bir huzursuzluk var.",
          detay: "Bazı kazançların, görünmeyen küçük bir bedeli oluyor.",
        },
        basarisizSonuc: { para: -10, mesaj: "Satıcı son anda vazgeçti, keseyi geri aldı.", detay: "Bazı fırsatlar elinden kayıp gidiyor." },
      },
      {
        metin: "Söylentilere kulak ver, uzak dur.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Altına dokunmadın, yoluna devam ettin.", detay: "Bazı fırsatlar, taşıdıkları riskle birlikte değerlendirilmeli." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Uzak dursan da o altın kesesini uzun süre düşündün.", detay: "Merak bazen en akıllı kararları bile gölgeliyor." },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin_ruyasi",
    kategori: "din",
    gerekliEtiketler: ["esya:lanetli_altin"],
    gizemli: true,
    ton: "agir",
    agirlik: 0.5,
    gorsel: "💀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Önceki Sahibinin Rüyası",
    metin:
      "Rüyanda sararmış, gözleri oyuk bir adam beliriyor her gece. 'O altın benimdi, beni de böyle tüketti' diyor, parmağıyla kesenin durduğu yeri işaret ediyor. Uyandığında terler içindesin.",
    secenekler: [
      {
        metin: "Bir rahibe/hocaya gidip laneti kırmasını iste.",
        baseBasariSansi: 65,
        maliyet: 20,
        ipucu: "Pahalı ama laneti tamamen kaldırabilir",
        basariliSonuc: {
          para: -20,
          durum_sil: ["lanet_golgesi"],
          mesaj: "Uzun bir ayin, tütsüler ve dualar sonunda içindeki o soğukluk dağıldı. Rüyalar durdu, altın artık sıradan bir keseden farksız.",
          detay: "Bazı lanetler, doğru ellerle çözülebiliyormuş.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -10,
          mesaj: "Ayin işe yaramadı, hoca kesenin yanına bile yaklaşmak istemedi. 'Bu benim gücümü aşıyor' dedi ve kaçarcasına gitti.",
        },
      },
      {
        metin: "Altını olduğu gibi, hiç açmadan birine bağışla.",
        baseBasariSansi: 90,
        ipucu: "Laneti başkasına devredersin — vicdanın rahatsız olabilir",
        basariliSonuc: {
          ahlak: -10,
          durum_sil: ["lanet_golgesi"],
          etiket_sil: ["esya:lanetli_altin"],
          mesaj: "Keseyi hiç açmadan bir dilenciye uzattın; gözlerindeki sevinci görünce içine bir ürperti düştü. Lanet artık senin değil.",
          detay: "Rüyalar durdu ama vicdanın bu kararı asla unutmayacak.",
        },
        basarisizSonuc: {
          mesaj: "Kimse bu 'hediyeyi' kabul etmek istemedi, herkes altının garipliğini seziyor gibiydi.",
        },
      },
      {
        metin: "Rüyayı görmezden gel, altına sıkı sıkı sarıl.",
        baseBasariSansi: 100,
        ipucu: "Lanet derinleşir ama altının tüm gücü senin olur",
        basariliSonuc: {
          para: 25,
          saglik: -8,
          mutluluk: -10,
          durum_ekle: { id: "lanet_golgesi", ad: "Lanetin Gölgesi", tur: "kalici", tur_basi_saglik: -2 },
          mesaj: "'Onu benden kimse alamaz' dedin rüyada hayalete. O gülümsedi ve kayboldu — ertesi sabah kesende beklenmedik bir miktar daha altın buldun. Ama içindeki soğukluk şimdi daha derin.",
          detay: "Lanetin gölgesi büyüdü; artık her yıl biraz daha can alıyor.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin_musteri",
    kategori: "ticaret",
    gerekliEtiketler: ["esya:lanetli_altin"],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🪙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hevesli Bir Alıcı",
    metin:
      "Kervansarayda tanımadığın zengin bir tüccar, elindeki o eski altın kesesini fark etti. Gözleri parladı: 'O keseyi tanıyorum, eski bir define. Sana piyasa fiyatının üç katını öderim!' Söylenceyi bilmiyor gibi.",
    secenekler: [
      {
        metin: "Laneti anlatmadan sat, üç katı fiyata razı ol.",
        baseBasariSansi: 90,
        maxAhlak: 55,
        ipucu: "Büyük kazanç ama laneti bilmeden birine devredersin",
        basariliSonuc: {
          para: 90,
          ahlak: -15,
          durum_sil: ["lanet_golgesi"],
          etiket_sil: ["esya:lanetli_altin"],
          mesaj: "Parayı saydı, keseyi sevinçle aldı ve gitti. Cebin ağırlaştı ama o adama ne beklediğini düşünmeden edemiyorsun.",
          detay: "Bazı kazançlar başkasının bilmediği bir bedelle geliyor.",
        },
        basarisizSonuc: {
          para: 90,
          ahlak: -15,
          mesaj: "Parayı saydı ama keseyi açar açmaz içindeki tuhaf soğukluğu hissetti; 'Bu bende kalmaz' deyip parayı geri kesti, keseyi sana fırlattı.",
        },
      },
      {
        metin: "Dürüst ol, laneti anlat — yine de almak isterse sat.",
        baseBasariSansi: 60,
        ipucu: "Vicdanın rahat eder ama satış büyük ihtimalle suya düşer",
        basariliSonuc: {
          para: 50,
          ahlak: 15,
          durum_sil: ["lanet_golgesi"],
          etiket_sil: ["esya:lanetli_altin"],
          mesaj: "Şaşırtıcı biçimde gülümsedi: 'Ben de böyle şeylere meraklıyımdır.' Daha az parayla da olsa laneti bilerek satın aldı.",
        },
        basarisizSonuc: {
          mesaj: "Anlatınca yüzü asıldı, 'çıldırmışsın sen' deyip uzaklaştı. Kese hâlâ elinde, alıcı da gitti.",
        },
      },
      {
        metin: "Satma; bu laneti kimseye layık görme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Teklifi geri çevirdin. Adam şaşkın ayrıldı ama vicdanın rahat.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Reddettin ama o parayı düşünmeden edemedin; bazı geceler pişmanlık uykunu kaçırıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_kehanet_sozu",
    kategori: "din",
    agirlik: 0.2,
    gorsel: "🔮",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Falcının Sözü",
    metin:
      "Pazar yerinde köşede oturan yaşlı bir falcı, seni durdurup istemeden bir kehanette bulundu: 'Yakın bir günde, hiç ummadığın bir an kaderini değiştirecek.' Sözlerine kulak asmalı mısın?",
    secenekler: [
      {
        metin: "Kehanete inan, dikkatli davranmaya başla.",
        baseBasariSansi: 70,
        ipucu: "Belki boş inanç, belki gerçek bir uyarı",
        basariliSonuc: {
          ahlak: 5,
          mutluluk: 5,
          mesaj: "Dikkatli davranman seni birkaç küçük dertten korudu; belki tesadüf, belki değil.",
          detay: "İster inan ister inanma, biraz temkin kimseye zarar vermez.",
        },
        basarisizSonuc: { mesaj: "Kehanet aklından çıkmadı ama bekleneni bir şey olmadı.", detay: "Bazı sözler sadece sözde kalıyor." },
      },
      {
        metin: "Boş inanç de, unut gitsin.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, umursamaz",
        basariliSonuc: { mesaj: "Kehaneti unuttun, hayatın olağan akışına devam etti.", detay: "Bazen en sağlıklısı, her söze kulak asmamaktır." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Unutmaya çalışsan da söz ara sıra aklına takıldı.", detay: "Bazı cümleler istemeden de olsa akılda kalıyor." },
      },
    ],
  },
  {
    id: "derinlik_din_veba_bakimi",
    kategori: "saglik",
    meslekler: ["Din Adamı"],
    yasakliEtiketler: ["tibbi:veba_bagisik", "tibbi:sifaci"],
    agirlik: 0.6,
    gorsel: "⚕️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Vebalıların Arasında",
    metin:
      "Şehirde veba yayılıyor ve hastalara bakacak kimse kalmadı. Onlara bakmak seni de hastalığa maruz bırakabilir, ama tıbbi bilgin zamanla bağışıklık ya da şifa yeteneği kazandırabilir.",
    secenekler: [
      {
        metin: "Hastalara bizzat bak, tekniklerini geliştir.",
        baseBasariSansi: 55,
        ipucu: "Riskli ama uzun vadede değerli bir bilgi kazanabilirsin",
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          etiket_ekle: ["tibbi:sifaci"],
          mesaj: "Haftalarca süren bakımın sonunda, hastalığı tedavi etmenin inceliklerini öğrendin.",
          detay: "Artık sadece dua etmiyor, gerçekten şifa dağıtabiliyorsun.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 8,
          etiket_ekle: ["tibbi:veba_bagisik"],
          mesaj: "Sen de hastalandın ama vücudun mücadeleyi kazandı; artık vebaya karşı bağışıksın.",
          detay: "Yaşadığın bu zorlu deneyim, garip bir şekilde seni daha güçlü kıldı.",
        },
      },
      {
        metin: "Uzaktan dua et, riske girme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama fırsatı kaçırırsın",
        basariliSonuc: { ahlak: 5, mesaj: "Uzaktan dua ettin; güvende kaldın.", detay: "Her cesaret, riski göze almayı gerektirmiyor." },
        basarisizSonuc: { un: -8, mesaj: "Uzak durman bazı cemaat üyelerince eleştirildi.", detay: "Herkes aynı ölçüde cesaret beklemiyor olsa da bazıları öyle." },
      },
    ],
  },
  {
    id: "derinlik_veba_salgini_ikinci_dalga",
    kategori: "saglik",
    meslekler: ["Din Adamı"],
    gerekliUlke: { vebada: true },
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
        gerekliEtiketler: ["tibbi:veba_bagisik"],
        kilitAciklamasi: "Bağışıklığın yok; bu kadar özgürce yaklaşmak çok riskli olur.",
        ipucu: "Bağışıklığın sayesinde neredeyse risksiz",
        basariliSonuc: {
          ahlak: 20,
          un: 15,
          mesaj: "Bağışıklığın sayesinde korkusuzca hastalara yardım ettin; halk seni bir kahraman gibi gördü.",
          detay: "Geçmişteki acın, şimdi başkalarını kurtarmana yarıyor.",
        },
        basarisizSonuc: { mutluluk: -5, mesaj: "Bağışıklığın seni korusa da tükenmişlik hissi ağır bastı.", detay: "Beden dayanıklı olsa da ruh yorulabiliyor." },
      },
      {
        metin: "Şifacılık bilgini kullanarak hastalara bak.",
        baseBasariSansi: 70,
        gerekliEtiketler: ["tibbi:sifaci"],
        kilitAciklamasi: "Bu tekniği bilmiyorsun.",
        ipucu: "Bilgin sayesinde riski düşürüyorsun",
        basariliSonuc: { ahlak: 18, un: 12, saglik: -5, mesaj: "Bilgin sayesinde birçok hastayı iyileştirdin.", detay: "Öğrendiğin teknikler tam da böyle bir anda işine yaradı." },
        basarisizSonuc: { saglik: -20, mesaj: "Bilgine rağmen bu dalga daha da acımasızdı.", detay: "Her bilgi her felaketi durduramıyor." },
      },
      {
        metin: "Mesafeni koru, sadece dua et.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama yetersiz hissettirir",
        basariliSonuc: { mesaj: "Mesafeni korudun; güvende kaldın.", detay: "Bazı günler sadece hayatta kalmak yeterlidir." },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Güvende kalman içini rahatsız etti; yardım edemediğin için kendini suçladın.",
          detay: "Bazı güvenli seçimler vicdanı rahatsız edebiliyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_gizli_orgut_daveti",
    kategori: "siyaset",
    minYas: 18,
    yasakliEtiketler: ["orgut_secildi"],
    agirlik: 0.5,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hanın Arka Odası",
    metin:
      "Bir handa, kimliğini gizleyen bir adam seni arka odaya davet etti. Orada, gölgeler içinde toplanan bir grup insan var — hiçbirinin yüzünü tam göremiyorsun.",
    secenekler: [
      {
        metin: "Tapınak Şövalyeleri'ne katıl.",
        baseBasariSansi: 85,
        ipucu: "Disiplinli, savaşçı bir kardeşlik",
        basariliSonuc: {
          ahlak: 8,
          un: 10,
          etiket_ekle: ["orgut:Tapınak Şövalyeleri", "orgut_secildi"],
          mesaj: "Yemin ettin; artık gölgede duran ama güçlü bir kardeşliğin parçasısın.",
          detay: "Kardeşlik, disiplin ve sadakat karşılığında koruma ve güç vaat ediyor.",
        },
        basarisizSonuc: {
          etiket_ekle: ["orgut:Tapınak Şövalyeleri", "orgut_secildi"],
          mesaj: "Katılımın gergin geçti ama sonunda kabul edildin.",
          detay: "Her başlangıç pürüzsüz olmuyor.",
        },
      },
      {
        metin: "Gölgede Kardeşlik'e katıl.",
        baseBasariSansi: 85,
        ipucu: "Gizli, ticari ve siyasi bağlantıları güçlü bir ağ",
        basariliSonuc: {
          para: 15,
          etiket_ekle: ["orgut:Gölgede Kardeşlik", "orgut_secildi"],
          mesaj: "Yemin ettin; artık şehrin görünmeyen ağlarına erişimin var.",
          detay: "Bu kardeşlik güç değil, bilgi ve bağlantı üzerine kurulu.",
        },
        basarisizSonuc: {
          etiket_ekle: ["orgut:Gölgede Kardeşlik", "orgut_secildi"],
          mesaj: "Katılımın gergin geçti ama sonunda kabul edildin.",
          detay: "Güven, zamanla inşa edilir.",
        },
      },
      {
        metin: "Daveti reddet, odadan çık.",
        baseBasariSansi: 95,
        ipucu: "Güvenli, meraksız",
        basariliSonuc: { etiket_ekle: ["orgut_secildi"], mesaj: "Daveti nazikçe reddettin, kimse seni zorlamadı.", detay: "Her gizemli kapı açılmayı hak etmiyor." },
        basarisizSonuc: {
          etiket_ekle: ["orgut_secildi"],
          mesaj: "Reddin biraz gerginlik yarattı ama seni bırakıp gitmene izin verdiler.",
          detay: "Bazı kapılar bir kez kapanınca bir daha açılmıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_orgut_gizli_gorev",
    kategori: "siyaset",
    agirlik: 0.4,
    gorsel: "🗝️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kardeşlikten Bir Görev",
    metin: "Örgütünden biri, gece yarısı seninle temasa geçti: tehlikeli ama karşılığı yüksek, sadece güvenilir üyelere verilen gizli bir görev var.",
    secenekler: [
      {
        metin: "Tapınak Şövalyeleri görevini kabul et.",
        baseBasariSansi: 55,
        gerekliEtiketler: ["orgut:Tapınak Şövalyeleri"],
        kilitAciklamasi: "Bu görev sadece Tapınak Şövalyeleri üyelerine açık.",
        ipucu: "Riskli ama kardeşlik içindeki itibarını büyütür",
        basariliSonuc: { un: 20, para: 25, mesaj: "Görevi başarıyla tamamladın; kardeşlik içindeki itibarın büyüdü.", detay: "Sadakatinin karşılığını aldın." },
        basarisizSonuc: { saglik: -25, mesaj: "Görev planlandığı gibi gitmedi, güçlükle kurtuldun.", detay: "Gizli görevler her zaman göründüğü kadar basit değil." },
      },
      {
        metin: "Gölgede Kardeşlik görevini kabul et.",
        baseBasariSansi: 55,
        gerekliEtiketler: ["orgut:Gölgede Kardeşlik"],
        kilitAciklamasi: "Bu görev sadece Gölgede Kardeşlik üyelerine açık.",
        ipucu: "Riskli ama kazançlı bir bağlantı ağı sağlar",
        basariliSonuc: { para: 45, mesaj: "Görevi sorunsuz tamamladın; ağın genişledi.", detay: "Bilgi ve bağlantı, altından daha değerli olabiliyor." },
        basarisizSonuc: { para: -20, un: -8, mesaj: "Görev sırasında fark edildin, küçük bir skandal çıktı.", detay: "Gölgede kalmak her zaman mümkün olmuyor." },
      },
      {
        metin: "Görevi reddet, çok riskli bul.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Görevi nazikçe reddettin.", detay: "Her fırsatı kabul etmek zorunda değilsin." },
        basarisizSonuc: { dost_puani: -8, mesaj: "Reddin örgüt içinde biraz güven kaybına yol açtı.", detay: "Her hayır bir bedel taşıyabilir." },
      },
    ],
  },
  {
    id: "derinlik_kumarhane_daveti",
    kategori: "sosyal",
    yasakliEtiketler: ["bagimlilik:kumarbaz"],
    agirlik: 0.6,
    gorsel: "🎲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Zar Masası",
    metin: "Bir arkadaşın seni gizli bir kumar masasına davet etti. Kazanma ihtimali cazip ama bu tür yerler bağımlılık yapmasıyla ünlü.",
    secenekler: [
      {
        metin: "Bir el dene, heyecanın tadına bak.",
        baseBasariSansi: 55,
        ipucu: "Kazanç ya da tehlikeli bir alışkanlığın başlangıcı",
        basariliSonuc: { para: 30, mesaj: "Bu gece şanslıydın; cebin biraz kabardı.", detay: "Kazanmanın verdiği heyecan, tehlikeli bir tada dönüşebilir." },
        basarisizSonuc: {
          para: -20,
          etiket_ekle: ["bagimlilik:kumarbaz", "bagimlilik:var"],
          durum_ekle: { id: "kumar_bagimliligi", ad: "Kumar Bağımlılığı", tur: "kalici", tur_basi_para: -4 },
          mesaj: "Kaybettin ama masadan kalkamadın; birkaç el daha oynadın. Artık bu masaya dönmemek zor.",
          detay: "Kaybın seni durdurmak yerine daha da masaya bağladı.",
        },
      },
      {
        metin: "Nazikçe reddet, uzak dur.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Daveti reddettin, gecen sakin geçti.", detay: "Bazı heyecanlar, uzak durulmaya değer." },
        basarisizSonuc: { dost_puani: -5, mesaj: "Reddin arkadaşını biraz hayal kırıklığına uğrattı.", detay: "Her hayır bir küçük mesafe yaratabiliyor." },
      },
    ],
  },
  {
    id: "derinlik_afyon_teklifi",
    kategori: "sosyal",
    yasakliEtiketler: ["bagimlilik:afyon"],
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
        ipucu: "Anlık rahatlama, uzun vadeli risk",
        basariliSonuc: { mutluluk: 15, mesaj: "Acın bir süreliğine dindi; kendini hafiflemiş hissettin.", detay: "Rahatlama gerçek ama geçici." },
        basarisizSonuc: {
          mutluluk: 10,
          etiket_ekle: ["bagimlilik:afyon", "bagimlilik:var"],
          durum_ekle: { id: "afyon_bagimliligi", ad: "Afyon Bağımlılığı", tur: "kalici", tur_basi_saglik: -3 },
          mesaj: "Rahatlama o kadar iyi geldi ki, bir daha ve bir daha kullandın. Artık ondan kolayca vazgeçemiyorsun.",
          detay: "Acını dindiren şey, sessizce yeni bir acıya dönüştü.",
        },
      },
      {
        metin: "Reddet, acıyla başka türlü baş et.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, daha zor ama sağlıklı",
        basariliSonuc: { ahlak: 8, mesaj: "Reddettin; acınla başka yollarla baş etmeyi seçtin.", detay: "Zor yol, çoğu zaman daha sağlam bir yoldur." },
        basarisizSonuc: { mutluluk: -8, mesaj: "Reddetmek kolay olmadı, acın bir süre daha sürdü.", detay: "Bazı zorluklar, kaçış olmadan aşılıyor." },
      },
    ],
  },
  {
    id: "derinlik_bagimliliktan_kurtulma",
    kategori: "sosyal",
    gerekliEtiketler: ["bagimlilik:var"],
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
        ipucu: "Zor ama kalıcı bir özgürlük",
        basariliSonuc: {
          ahlak: 20,
          mutluluk: 15,
          etiket_sil: ["bagimlilik:kumarbaz", "bagimlilik:afyon", "bagimlilik:var"],
          durum_sil: ["kumar_bagimliligi", "afyon_bagimliligi"],
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
        ipucu: "Güvenli ama sorunu çözmez",
        basariliSonuc: { mesaj: "Değişimi ertelemeye karar verdin; belki başka bir gün.", detay: "Bazı kararlar için doğru an henüz gelmemiş olabilir." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Erteleme kararı içinde karanlık bir huzursuzluk bıraktı.", detay: "Bazen erteleme de kendi ağırlığını taşıyor." },
      },
    ],
  },
  {
    id: "global_kitlik_baslangici",
    kategori: "saglik",
    agirlik: 0.35,
    gerekliUlke: { kriz: null },
    gorsel: "🌾",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kuraklığın Gölgesi",
    metin: "Bu yıl yağmurlar gecikti, ekinler kavruldu. Bölgede bir kıtlığın habercisi olan işaretler görülüyor.",
    secenekler: [
      {
        metin: "Ambarındaki fazlalığı komşularınla paylaş.",
        baseBasariSansi: 80,
        ipucu: "Cömertlik, ama kendi payını azaltır",
        basariliSonuc: {
          para: -15,
          ahlak: 15,
          kriz_baslat: { tur: "kitlik", sureYil: 5 },
          mesaj: "Elindekini paylaştın; kıtlık başlıyor ama en azından vicdanın rahat.",
          detay: "Zor günler yaklaşıyor, ama yalnız değilsin.",
        },
        basarisizSonuc: {
          para: -15,
          kriz_baslat: { tur: "kitlik", sureYil: 5 },
          mesaj: "Paylaşman yeterli bulunmadı; kıtlık başlıyor.",
          detay: "Zor bir dönem kapıda.",
        },
      },
      {
        metin: "Kendi ambarını koru, önce kendine bak.",
        baseBasariSansi: 85,
        ipucu: "Bencil ama güvenli",
        basariliSonuc: {
          ahlak: -10,
          kriz_baslat: { tur: "kitlik", sureYil: 5 },
          mesaj: "Kendi payını korudun; kıtlık yine de bölgeyi sarıyor.",
          detay: "Bencilliğin seni biraz daha güvende tutacak.",
        },
        basarisizSonuc: {
          ahlak: -15,
          kriz_baslat: { tur: "kitlik", sureYil: 5 },
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
    gerekliUlke: { kriz: null },
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sokaklarda Gerginlik",
    metin: "Vergilere ve yönetime duyulan öfke sokaklara taştı. Küçük gösteriler, büyük bir isyanın habercisi olabilir.",
    secenekler: [
      {
        metin: "Gösterilere sessizce göz yum, karışma.",
        baseBasariSansi: 80,
        ipucu: "Tarafsız ama isyanı durduramaz",
        basariliSonuc: {
          kriz_baslat: { tur: "isyan", sureYil: 4 },
          mesaj: "Karışmadın; ama gerginlik büyüyerek bir isyana dönüştü.",
          detay: "Bazı fırtınalar durdurulamaz, sadece beklenir.",
        },
        basarisizSonuc: {
          saglik: -10,
          kriz_baslat: { tur: "isyan", sureYil: 4 },
          mesaj: "Karışmasan da kaosun bir kısmından payını aldın.",
          detay: "Sokaklar artık güvenli değil.",
        },
      },
      {
        metin: "Yetkilileri uyar, önlem alınmasını iste.",
        baseBasariSansi: 50,
        ipucu: "Belki önleyebilirsin, belki fark etmez",
        basariliSonuc: {
          un: 15,
          mesaj: "Uyarın dikkate alındı; küçük önlemlerle gerginlik bir süreliğine yatıştı.",
          detay: "Bu kez felaket ertelendi.",
        },
        basarisizSonuc: {
          un: -5,
          kriz_baslat: { tur: "isyan", sureYil: 4 },
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
    gerekliUlke: { kriz: null },
    gorsel: "🌟",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bolluğun Başlangıcı",
    metin: "Bereketli bir hasat, yeni ticaret yolları ve huzurlu bir dönem bir araya geldi. Bölge bir refah dönemine giriyor gibi.",
    secenekler: [
      {
        metin: "Bu bereketten sen de payını al.",
        baseBasariSansi: 85,
        ipucu: "Fırsatı değerlendir",
        basariliSonuc: {
          para: 25,
          kriz_baslat: { tur: "altin_cag", sureYil: 5 },
          mesaj: "Bereketli döneme sen de ortak oldun; bölge bir altın çağa giriyor.",
          detay: "Bazı dönemler herkese bolluk getirir.",
        },
        basarisizSonuc: {
          kriz_baslat: { tur: "altin_cag", sureYil: 5 },
          mesaj: "Fırsatı tam değerlendiremesen de bölge genelinde bolluk başlıyor.",
          detay: "Herkes aynı hızda faydalanamıyor.",
        },
      },
      {
        metin: "Temkinli ol, bu bolluğun geçici olduğunu düşün.",
        baseBasariSansi: 90,
        ipucu: "Temkinli ama fırsatı kaçırabilirsin",
        basariliSonuc: {
          kriz_baslat: { tur: "altin_cag", sureYil: 5 },
          mesaj: "Temkinli kalsan da bölge bir altın çağa giriyor.",
          detay: "Bazı iyi dönemler temkinsiz olmayı da hak eder.",
        },
        basarisizSonuc: {
          kriz_baslat: { tur: "altin_cag", sureYil: 5 },
          mesaj: "Temkinliliğin seni bazı fırsatlardan alıkoydu.",
          detay: "Herkes bu bolluğun tadını aynı çıkaramıyor.",
        },
      },
    ],
  },
  {
    id: "nemesis_fiyat_kirma",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    maxRakipPuani: 30,
    agirlik: 0.6,
    gorsel: "😤",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rakibin Oyunu",
    metin:
      "Önemli bir müşteriyle anlaşmanın eşiğindeyken, {rakip} aniden ortaya çıkıp fiyatını senin yarına indirdiğini duyurdu. Müşteri şimdi tereddütte.",
    secenekler: [
      {
        metin: "Sen de fiyatını düşür, savaşı kabul et.",
        baseBasariSansi: 50,
        ipucu: "Müşteriyi tutabilirsin ama kârın erir",
        basariliSonuc: {
          para: 5,
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
        ipucu: "Riskli ama itibarını korur",
        basariliSonuc: {
          para: 20,
          un: 12,
          mesaj: "Müşteri kaliteni takdir etti, {rakip}'in ucuz oyununa itibar etmedi.",
          detay: "Bazen fiyat değil, güven kazandırır.",
        },
        basarisizSonuc: { para: -15, mesaj: "Müşteri ucuz fiyata kanıp {rakip}'e gitti.", detay: "Her müşteri kaliteyi önemsemiyor." },
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
        ipucu: "Dürüstlük seni kurtarabilir",
        basariliSonuc: {
          ahlak: 10,
          rakip_puani: -10,
          mesaj: "Dürüstlüğün muhafızları ikna etti; {rakip}'in ihbarı boşa çıktı.",
          detay: "Gerçek, çoğu zaman en iyi savunmadır.",
        },
        basarisizSonuc: { para: -20, mesaj: "Açıklaman yeterli bulunmadı, küçük bir ceza ödedin.", detay: "Bazı ihbarlar tam boşa çıkmıyor." },
      },
      {
        metin: "Muhafızlara rüşvet vererek işi kapat.",
        baseBasariSansi: 65,
        maliyet: 20,
        ipucu: "Hızlı ama ahlaki bedeli var",
        basariliSonuc: { ahlak: -10, mesaj: "Rüşvet işe yaradı, mesele kapandı.", detay: "Bazı sorunlar parayla susturulabiliyor — ama vicdanın bunu biliyor." },
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
    yasakliEtiketler: ["kelebek_multeci_gordu"],
    gorsel: "🧳",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yolun Kenarındaki Yabancı",
    metin:
      "Yolun kenarında, aç ve bitkin bir yabancı gördün — savaştan ya da açlıktan kaçan bir mülteci. Ona yardım etmek küçük bir masraf, ama zamanın kısıtlı.",
    secenekler: [
      {
        metin: "Ona yemek ver, bir gecelik barınak sağla.",
        baseBasariSansi: 90,
        ipucu: "Küçük bir iyilik, sonucu bilinmez",
        basariliSonuc: {
          para: -10,
          ahlak: 12,
          etiket_ekle: ["kelebek_multeci_gordu"],
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
          etiket_ekle: ["kelebek_multeci_gordu"],
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
        ipucu: "Güvenli, zamandan tasarruf",
        basariliSonuc: { etiket_ekle: ["kelebek_multeci_gordu"], mesaj: "Görmezden geldin, yoluna devam ettin.", detay: "Bazı anlar fark edilmeden geçip gider." },
        basarisizSonuc: {
          ahlak: -5,
          etiket_ekle: ["kelebek_multeci_gordu"],
          mesaj: "Görmezden gelmen içini biraz rahatsız etti.",
          detay: "Bazı görmezden gelmeler vicdanda iz bırakır.",
        },
      },
    ],
  },
  {
    id: "kelebek_multeci_vali_donusu",
    kategori: "siyaset",
    gerekliEtiketler: ["kelebek:multeci_donus"],
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
        ipucu: "Eski bir iyiliğin karşılığını alabilirsin",
        basariliSonuc: {
          para: 40,
          un: 20,
          etiket_sil: ["kelebek:multeci_donus"],
          mesaj: "Vali seni sıcak karşıladı; yıllar önceki iyiliğin unutulmamış. Sana cömert bir karşılık verdi.",
          detay: "Bazı iyilikler, en beklenmedik zamanda geri döner.",
        },
        basarisizSonuc: {
          etiket_sil: ["kelebek:multeci_donus"],
          mesaj: "Vali seni hatırladı ama kalabalık araya girdi, konuşma yarım kaldı.",
          detay: "Bazı fırsatlar tam yakalanamıyor, yine de sıcak bir anı olarak kalıyor.",
        },
      },
      {
        metin: "Alçakgönüllü kal, hiçbir şey isteme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, mütevazı",
        basariliSonuc: {
          un: 15,
          ahlak: 10,
          etiket_sil: ["kelebek:multeci_donus"],
          mesaj: "Hiçbir şey istemeden geri çekildin; vali bu alçakgönüllülüğü unutmadı, adın olumlu anıldı.",
          detay: "Bazen en iyi karşılık, karşılık beklememektir.",
        },
        basarisizSonuc: {
          etiket_sil: ["kelebek:multeci_donus"],
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
    yasakliEtiketler: ["istihbarat_var"],
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
        ipucu: "Bir sonraki olayda gerçek şansını net göreceksin",
        basariliSonuc: {
          para: -15,
          etiket_ekle: ["istihbarat_var"],
          mesaj: "Dedikoducu sana bir sonraki fırsat hakkında net bilgi verdi.",
          detay: "Artık kararını daha net bir tabloya bakarak vereceksin.",
        },
        basarisizSonuc: { para: -15, mesaj: "Dedikoducu parayı aldı ama söylediği bilgi pek işe yaramadı.", detay: "Her bilgi kaynağı güvenilir değil." },
      },
      {
        metin: "İlgilenme, kendi sezgine güven.",
        baseBasariSansi: 95,
        ipucu: "Güvenli, parasız",
        basariliSonuc: { mesaj: "Teklifi reddettin, kendi sezgine güvenmeyi seçtin.", detay: "Bazen en iyi rehber kendi içgüdündür." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Reddettin ama sonrasında merak etmeden edemedin.", detay: "Merak bazen peşini bırakmıyor." },
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
        ipucu: "Bitirme hırsı seni köreltebilir",
        basariliSonuc: { para: 10, mesaj: "Kuyuyu karanlıkta da olsa bitirdin; su bulman köyde konuşuldu.", detay: "Azmin bu kez ödüllendirildi." },
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
        ipucu: "Güvenli, sadece bir gün gecikme",
        basariliSonuc: { mesaj: "Sabahı bekledin; kuyu ertesi gün güvenle tamamlandı.", detay: "Sabır bazen en akıllıca seçimdir." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Bekleme canını sıktı ama güvenliydin.", detay: "Bazı sabırsızlıklar bedelsiz geçmiyor." },
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
    metin:
      "En inatçı keçin ipini koparıp kasabanın ortasına daldı. Peşinden koşan sen oldun, ama keçi seni pazar meydanının en kalabalık yerine sürüklüyor.",
    secenekler: [
      {
        metin: "Son sürat kovala, yakalamaya çalış.",
        baseBasariSansi: 65,
        ipucu: "Komik ama tehlikeli bir kovalamaca",
        basariliSonuc: { mutluluk: 12, un: 5, mesaj: "Keçiyi büyük bir alkış eşliğinde yakaladın; kasaba günlerce bunu konuştu.", detay: "Bazı zaferler küçük ama unutulmaz." },
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
        ipucu: "Güvenli, keçini kaybedebilirsin",
        basariliSonuc: { para: -5, mesaj: "Keçiyi kovalamaktan vazgeçtin; birisi onu bulup sana getirdi.", detay: "Bazen pes etmek de işe yarıyor." },
        basarisizSonuc: { para: -10, mesaj: "Keçiyi bir daha göremedin.", detay: "Bazı kayıplar küçük ama yine de üzücü." },
      },
    ],
  },
  {
    id: "hapis_tutuklanma",
    kategori: "siyaset",
    maxAhlak: 15,
    maxUn: 10,
    agirlik: 1.3,
    gorsel: "⛓️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kapıda Muhafızlar",
    metin:
      "Geçmişteki karanlık işlerin sonunda seni buldu: kapına dayanan muhafızlar bir tutuklama emri taşıyor. Şehirdeki adın çoktan lekelenmişti; artık bunun bedelini ödeme vakti geldi.",
    secenekler: [
      {
        metin: "Arka kapıdan kaçmayı dene.",
        baseBasariSansi: 35,
        ipucu: "Başarırsan hapisten tamamen kurtulursun, ama çok riskli",
        basariliSonuc: {
          saglik: -10,
          para: -20,
          mesaj: "Çatılardan sıçrayıp muhafızları atlattın; şehrin öbür ucunda soluk soluğa kaldın ama özgürsün.",
          detay: "Bu kaçış hikayesi bir süre dilden dile dolaşacak.",
        },
        basarisizSonuc: {
          saglik: -15,
          etiket_ekle: ["hapiste"],
          mesaj: "Yakalandın; kaçma girişimin gardiyanların gözünde seni daha da tehlikeli gösterdi.",
          detay: "Artık parmaklıkların ardındasın, üstelik kötü bir üne sahip bir mahkumsun.",
        },
      },
      {
        metin: "Direnme, teslim ol.",
        baseBasariSansi: 95,
        ipucu: "Hapse giriş kaçınılmaz ama en azından sakin geçer",
        basariliSonuc: {
          etiket_ekle: ["hapiste"],
          mesaj: "Direnmeden teslim oldun; zincire vurulup hapishaneye götürüldün.",
          detay: "Artık bir mahkumsun. Buradan çıkmanın bir yolunu bulman gerekecek.",
        },
        basarisizSonuc: {
          saglik: -5,
          etiket_ekle: ["hapiste"],
          mesaj: "Sakin durmana rağmen bir muhafız seni sertçe itti; hapishaneye yaralı girdin.",
          detay: "Adalet burada nazik değil.",
        },
      },
    ],
  },
  {
    id: "hapis_kacis_girisimi",
    kategori: "siyaset",
    hapisOlayi: true,
    agirlik: 0.8,
    gorsel: "🕳️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kaçış Planı",
    metin:
      "Hücre arkadaşların, hücrenin altındaki toprağın gevşek olduğunu fark etti. Gece nöbetçiler değişirken bir fırsat penceresi doğabilir.",
    secenekler: [
      {
        metin: "Tüneli kazmaya başla, riski göze al.",
        baseBasariSansi: 30,
        ipucu: "Başarırsan özgürsün, ama yakalanırsan hayatını kaybedebilirsin",
        basariliSonuc: {
          etiket_sil: ["hapiste"],
          saglik: -10,
          un: 15,
          mesaj: "Gece yarısı tünelden sıvışıp şehrin dışına kaçmayı başardın; artık özgürsün.",
          detay: "Bu kaçış hikayen efsaneye dönüşecek.",
        },
        basarisizSonuc: {
          saglik: -25,
          ahlak: -10,
          olum_sansi: 15,
          mesaj: "Nöbetçiler seni tünelin ortasında yakaladı; ceza hücresine atıldın.",
          detay: "Bir sonraki fırsatı beklemekten başka çaren yok. Nöbetçilerden biri neredeyse mızrak atacaktı; şansına, sadece darbe yedin.",
        },
      },
      {
        metin: "Bekle, daha güvenli bir zaman kolla.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ilerleme yok",
        basariliSonuc: { mesaj: "Bugünü sakin geçirmeyi tercih ettin; fırsat başka bir gün gelebilir.", detay: "Sabır bazen tek silahındır." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Bekleyişin moralini bozdu; duvarlar giderek daha da daralıyor gibi hissettin.", detay: "Hapiste zaman farklı akıyor." },
      },
    ],
  },
  {
    id: "hapis_rusvet_girisimi",
    kategori: "ticaret",
    hapisOlayi: true,
    agirlik: 0.8,
    gorsel: "💰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Altının Gücü",
    metin:
      "Gardiyanlardan biri gizlice yaklaşıp 'her kilidin bir fiyatı vardır' diye fısıldadı. Elindeki azıcık parayla bir çıkış satın almayı deneyebilirsin.",
    secenekler: [
      {
        metin: "Elindeki parayı rüşvet olarak teklif et.",
        baseBasariSansi: 50,
        maliyet: 30,
        ipucu: "Pahalı ama işe yararsa özgürsün",
        basariliSonuc: {
          etiket_sil: ["hapiste"],
          para: -30,
          mesaj: "Gardiyan parayı cebine attı ve gece kapıyı 'yanlışlıkla' açık bıraktı.",
          detay: "Adalet bazen en yüksek teklifi verene gülümser.",
        },
        basarisizSonuc: {
          para: -30,
          ahlak: -10,
          mesaj: "Gardiyan parayı aldı ama seni komutanına ihbar etti; hem parasız hem de gözden düşmüş durumdasın.",
          detay: "Bazı gardiyanlar hem parayı hem vicdanını satmayı reddediyor, sadece parayı alıyor.",
        },
      },
      {
        metin: "Riske girme, parana güvenme.",
        baseBasariSansi: 95,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Teklifi geri çevirdin; en azından paran cebinde kaldı.", detay: "Bazı fırsatlara güvenmemek daha akıllıca." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Fırsatı kaçırdığına içerledin.", detay: "Keşke riske girseydim diye düşünüp durdun." },
      },
    ],
  },
  {
    id: "hapis_isyan_firsati",
    kategori: "siyaset",
    hapisOlayi: true,
    ton: "agir",
    agirlik: 0.6,
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Koğuşta Kargaşa",
    metin:
      "Mahkumlar arasında biriken öfke bir anda patladı; koğuş isyana döndü, gardiyanlar kontrolü kaybetmiş durumda. Bu kaos içinde bir çıkış yolu bulunabilir — ama isyan bastırılırken kim yaşar kim ölür kimse bilmiyor.",
    secenekler: [
      {
        metin: "Karanlık Kılıcı çek ve tüm koğuşa boyun eğdir!",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:kara_kilic"],
        ipucu: "Gizli Envanter: Hapishane lideri ol",
        basariliSonuc: {
          un: 35,
          ahlak: -25,
          mesaj: "Kara Kılıcı çektiğinde hücreler kana bulandı. Ne mahkumlar ne gardiyanlar sana karşı durabildi. Hapishaneyi sen yönetiyorsun.",
          detay: "Kılıç seni özgürleştirmedi, ama kafesi sana altın bir taht yaptı."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Kargaşadan faydalanıp kapıya doğru koş.",
        baseBasariSansi: 35,
        ipucu: "Çok riskli — hem yakalanma hem darbe alma ihtimali yüksek",
        basariliSonuc: {
          etiket_sil: ["hapiste"],
          saglik: -15,
          mesaj: "Kargaşanın ortasında kimse seni fark etmedi; kapıdan sıvışıp özgürlüğüne kavuştun.",
          detay: "Arkanda bıraktığın çığlıklar uzun süre kulaklarından gitmeyecek.",
        },
        basarisizSonuc: {
          saglik: -30,
          ahlak: -5,
          olum_sansi: 20,
          mesaj: "Kargaşanın ortasında bir gardiyan sopasıyla seni yere serdi; isyancı sayıldın.",
          detay: "Koğuş sakinleştiğinde en ağır cezayı sen çektin.",
        },
      },
      {
        metin: "Hücrene çekil, kargaşaya karışma.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, ama fırsat kaçar",
        basariliSonuc: { mesaj: "Köşede sessizce bekledin; isyan bastırılana kadar kimse sana dokunmadı.", detay: "Bazı kavgalar senin değil." },
        basarisizSonuc: { saglik: -12, mesaj: "Kargaşa sırasında bir tekme rastgele sana isabet etti; suçsuz yere yara aldın.", detay: "Bazen sadece orada olmak bile bedel ödetiyor." },
      },
    ],
  },
  {
    id: "hapis_yeni_tanidik",
    kategori: "sosyal",
    hapisOlayi: true,
    agirlik: 0.7,
    gorsel: "🤝",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Parmaklıklar Ardında Bir Dost",
    metin: "Hücre arkadaşın {dost}, sana kendi hikayesini anlattı; belki de burada tek başına olmadığını hissettiren ilk kişi o oldu.",
    secenekler: [
      {
        metin: "Güven, dostluğu büyüt.",
        baseBasariSansi: 85,
        ipucu: "İçerideki hayatı biraz katlanılır kılar",
        basariliSonuc: {
          dost_puani: 15,
          mutluluk: 10,
          mesaj: "{dost} ile aranızda gerçek bir bağ kuruldu; artık burada yalnız değilsin.",
          detay: "Bazı dostluklar en karanlık yerlerde doğuyor.",
        },
        basarisizSonuc: { dost_puani: -10, mesaj: "Anlattıkların yanlış kişinin kulağına gitti, biraz pişman oldun.", detay: "Hapiste güven pahalıya patlayabiliyor." },
      },
      {
        metin: "Mesafeli kal, kimseye güvenme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama yalnız",
        basariliSonuc: { mesaj: "Mesafeni korudun; en azından kimse seni kullanamadı.", detay: "Burada güven lüks bir şey." },
        basarisizSonuc: { mutluluk: -8, mesaj: "Yalnızlığın giderek ağırlaşıyor.", detay: "Herkesten uzak durmanın da bir bedeli var." },
      },
    ],
  },
  {
    id: "hapis_gardiyan_zulmu",
    kategori: "sosyal",
    hapisOlayi: true,
    agirlik: 0.6,
    ton: "agir",
    gorsel: "⚡",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Acımasız Bir Gardiyan",
    metin: "Vardiyadaki gardiyan bugün özellikle sinirli; sebepsiz yere seni cezalandırmaya çalışıyor.",
    secenekler: [
      {
        metin: "Karşı çık, hakkını savun.",
        baseBasariSansi: 40,
        ipucu: "Cesur ama riskli",
        basariliSonuc: { un: 10, mesaj: "Diğer mahkumlar seni alkışladı; gardiyan geri adım attı.", detay: "Bazen direnmek işe yarıyor." },
        basarisizSonuc: { saglik: -18, mesaj: "Karşılığını sertçe ödedin; birkaç gün acı içinde geçirdin.", detay: "Burada güç her zaman haklıdan yana." },
      },
      {
        metin: "Başını eğ, sessiz kal.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama gururunu kırar",
        basariliSonuc: { mesaj: "Sessizce katlandın; kötü bir gün daha geride kaldı.", detay: "Hayatta kalmak bazen boyun eğmeyi gerektiriyor." },
        basarisizSonuc: { mutluluk: -10, mesaj: "İçin öfkeyle doldu ama belli etmemeyi başardın.", detay: "Bu öfke bir gün patlayabilir." },
      },
    ],
  },
  {
    id: "hapis_cezasi_doldu",
    kategori: "siyaset",
    hapisOlayi: true,
    agirlik: 0.5,
    gorsel: "🔓",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sürenin Sonu",
    metin: "Gardiyan hücreni açtı: 'Cezan doldu, sürünme, özgürlüğe.' Kapıdaki güneş ışığı gözlerini kamaştırdı.",
    secenekler: [
      {
        metin: "Dışarı çık, yeni bir sayfa aç.",
        baseBasariSansi: 95,
        ipucu: "Özgürlük",
        basariliSonuc: {
          etiket_sil: ["hapiste"],
          ahlak: 10,
          mesaj: "Cezanı tamamladın ve özgür bir insan olarak dışarı adım attın.",
          detay: "Geçmişini geride bırakmaya karar verdin.",
        },
        basarisizSonuc: { etiket_sil: ["hapiste"], mesaj: "Özgürsün ama içindeki ağırlık hemen gitmedi.", detay: "Bazı izler zamanla siliniyor." },
      },
      {
        metin: "Şehirden tamamen uzaklaş, iz bırakma.",
        baseBasariSansi: 90,
        ipucu: "Sessiz bir yeni başlangıç",
        basariliSonuc: {
          etiket_sil: ["hapiste"],
          un: -10,
          mesaj: "Kimseye görünmeden şehri terk ettin; adın yavaşça unutulacak.",
          detay: "Bazen en iyi başlangıç, sessiz bir kaçıştır.",
        },
        basarisizSonuc: { etiket_sil: ["hapiste"], mesaj: "Şehri terk ettin ama arkanda birkaç meraklı bakış bıraktın.", detay: "Tam anlamıyla iz bırakmadan gitmek zor." },
      },
    ],
  },

  // ============================================================
  // DİN/KÜLTÜR — inanca özel olaylar (din_kultur bazlı)
  // ============================================================
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
        ipucu: "Vicdan rahatlar ama sır güvende kalmayabilir",
        basariliSonuc: { ahlak: 15, mutluluk: 10, mesaj: "İçini dökmek büyük bir yük kaldırdı; günlerdir ilk kez rahat uyudun.", detay: "Papaz sırrını mezara kadar taşıyacağına yemin etti." },
        basarisizSonuc: { un: -10, mesaj: "Papaz ağzından kaçırdı, dediğin bir iki kişiye ulaştı.", detay: "Bazı sırlar itiraf kürsüsünden bile sızabiliyormuş." },
      },
      {
        metin: "Yüzeysel geç, asıl günahını sakla.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama içi boş bir rahatlama",
        basariliSonuc: { mesaj: "Ayine katıldın ama içindeki asıl ağırlık yerinde kaldı.", detay: "Bazı şeyleri sadece kendine söylemek yetmiyor." },
        basarisizSonuc: { ahlak: -5, mesaj: "Papaz senin bir şeyler sakladığını sezdi, tuhaf bir bakış attı.", detay: "Yarım gerçekler bazen tam bir yalandan daha rahatsız edici." },
      },
      {
        metin: "Kendi günahın yerine papazın sakladığı sırrı fısılda.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Kiliseden şantaj",
        basariliSonuc: { 
          para: 45, 
          ahlak: -20, 
          mesaj: "Papazın o şarap tüccarıyla olan kirli işlerini bildiğini fısıldadın. Sana sus payı olarak kilisenin sadaka kutusunu verdi.", 
          detay: "Kutsal mekanda bile şeytanın avukatlığını yapmayı başardın." 
        },
        basarisizSonuc: { 
          un: -25, 
          ahlak: -15, 
          mesaj: "Papaz öfkeyle bağırıp seni aforoz etmekle tehdit etti. Kiliseyi terk etmek zorunda kaldın." 
        }
      }
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
        ipucu: "Riskli ama manevi olarak dönüştürücü",
        basariliSonuc: { ahlak: 18, un: 6, mesaj: "Kutsal topraklara ulaştın; döndüğünde eskisinden farklı bir insandın.", detay: "Bu yolculuğu anlatırken sesin bile değişiyor." },
        basarisizSonuc: { saglik: -10, para: -10, mesaj: "Yol seni hasta etti, yarı yolda geri dönmek zorunda kaldın.", detay: "Bazı yolculuklar tamamlanmadan da bir şeyler öğretiyor." },
      },
      {
        metin: "Katılma, kendi cemaatinde kal.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, fırsat kaçar",
        basariliSonuc: { mesaj: "Evinde kalmayı tercih ettin; kervan sensiz yola çıktı.", detay: "Belki başka bir yıl." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Kervanın ardından bakarken içinde hafif bir pişmanlık hissettin.", detay: "Bazı fırsatlar bir daha gelmiyor." },
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
        ipucu: "Huzur ya da hayal kırıklığı",
        basariliSonuc: { mutluluk: 8, ahlak: 5, mesaj: "Dua ederken içini saran huzur günlerce sürdü.", detay: "Mucize gerçek mi değil mi bilmiyorsun ama hissettiğin gerçekti." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Beklediğin huzuru bulamadın, içinde bir boşluk kaldı.", detay: "Bazı günler inanç bile yetmiyor." },
      },
      {
        metin: "Geceyi bekle ve adak altınlarını çal!",
        baseBasariSansi: 40,
        maxAhlak: 35,
        ipucu: "Sadece ahlaksızlara açık: Çok yüksek kazanç, aforoz riski",
        basariliSonuc: { para: 50, ahlak: -25, mesaj: "Kimse görmeden altınları cübbene sakladın. Kiliseden zengin bir adam olarak çıktın.", detay: "Tanrının parasını çaldın. Vicdanın tamamen körleşti." },
        basarisizSonuc: { un: -35, ahlak: -20, para: -15, etiket_ekle: ["itibar:aforoz_edildi"], mesaj: "Papaz seni suçüstü yakaladı! Tüm kiliseye rezil oldun ve aforoz edildin.", detay: "Adın artık şeytanla anılıyor." },
      },
      {
        metin: "Uzaktan izle, katılma.",
        baseBasariSansi: 90,
        ipucu: "Mesafeli ama güvenli",
        basariliSonuc: { mesaj: "Törenin dışında kalmayı tercih ettin, kalabalığı izledin.", detay: "Herkesin inanma şekli aynı değil." },
        basarisizSonuc: { un: -2, mesaj: "Bazı komşuların mesafeni fark etti, arkandan fısıldadılar.", detay: "Cemaatte görünmemek bazen bir bedel ödetiyor." },
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
        ipucu: "Zor ama onurlu",
        basariliSonuc: { ahlak: 8, mesaj: "Perhizi tam tuttun; cemaat içinde 'sağlam imanlı' diye anılmaya başladın.", detay: "Aç kalmak bazen bir gurur meselesi oluyor." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Reddetmek kolay olmadı, açlığın seni huysuzlaştırdı.", detay: "İrade bazen midenden daha zayıf çıkıyor." },
      },
      {
        metin: "Gizlice davete git, bir tabak et ye.",
        baseBasariSansi: 70,
        ipucu: "Komik ama riskli, yakalanırsan mahcup olursun",
        basariliSonuc: { mutluluk: 10, mesaj: "Kimse görmeden karnını doyurdun; vicdanın biraz sızladı ama tabak boştu.", detay: "Bazı günahlar en azından lezzetli oluyor." },
        basarisizSonuc: { un: -8, ahlak: -5, mesaj: "Papaz seni tam et yerken kapıda yakaladı; olay bütün mahallede duyuldu.", detay: "'Perhiz Bozan' lakabı bir süre peşini bırakmayacak." },
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
        ipucu: "Zor ama saygın bir görüntü",
        basariliSonuc: { un: 5, mesaj: "Sonuna kadar dik oturdun; imam konuşma sonrası seni takdir etti.", detay: "Bazı zaferler sadece uyanık kalmaktan ibaret." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Direnmene rağmen birkaç saniyeliğine gözlerin kapandı, kimse fark etmedi galiba.", detay: "Uyku bazen iradeden güçlü çıkıyor." },
      },
      {
        metin: "Kendini bırak, gözlerin kapansın.",
        baseBasariSansi: 40,
        ipucu: "Riskli, herkesin önünde uyuyakalabilirsin",
        basariliSonuc: { mutluluk: 6, mesaj: "Küçük bir şekerleme çektin, kimse fark etmedi.", detay: "Bazen risk alıp kazanıyorsun." },
        basarisizSonuc: { un: -10, mesaj: "Horlaman camiyi çınlattı; herkes döndü sana baktı.", detay: "Bu hikaye mahallede uzun süre anlatılacak." },
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
        ipucu: "Cebine dokunur ama huzur ve saygı getirir",
        basariliSonuc: { ahlak: 12, un: 6, mesaj: "Verdiğin, tam da bir ailenin kışı geçirmesine yetti.", detay: "Kimsenin bilmediği bir iyilik bile içini ısıtıyor." },
        basarisizSonuc: { ahlak: 8, mesaj: "Verdin ama parayı kimin aldığını hiç öğrenemedin.", detay: "Bazı iyilikler karşılıksız kalıyor, olsun." },
      },
      {
        metin: "Asgari miktarı ver, gerisini sakla.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, vicdan biraz sızlar",
        basariliSonuc: { mesaj: "Görevini yerine getirdin, fazlasına dokunmadın.", detay: "Kurallara uydun, en azından bu kadarı yeter dedin kendine." },
        basarisizSonuc: { ahlak: -4, mesaj: "Komşuların ne kadar az verdiğini fark etti, arkandan konuştular.", detay: "Cömertlik bazen gösteriş meselesine dönüşüyor." },
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
        ipucu: "Riskli ama itibarını düzeltebilirsin",
        basariliSonuc: { un: 6, dost_puani: 5, kultur: 5, mesaj: "Şakacı bir üslupla durumu çevirdin; herkes gülüşerek konuyu kapattı.", detay: "İngiliz nezaketinin arkasında güçlü bir espri anlayışı yatıyormuş." },
        basarisizSonuc: { un: -5, mesaj: "Savunman tam tersi etki yaptı, dedikodu daha da büyüdü.", detay: "Bazı fincan çaylar, bazı insanların hayatını zorlaştırıyor." },
      },
      {
        metin: "Sessizce çayını iç, duymazdan gel.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, sönük",
        basariliSonuc: { mesaj: "Sessizce oturup çayını bitirdin; dedikodu kendiliğinden söndü.", detay: "Bazen en iyi cevap, cevap vermemektir." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Sessizliğin bazılarına 'suçunu kabul ediyor' gibi göründü.", detay: "Kilise çayı bazen mahkemeden farksız oluyor." },
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
        ipucu: "Riskli ama önemli bağlantılar kazandırabilir",
        basariliSonuc: { un: 12, dost_puani: 4, kultur: 10, mesaj: "Piskopos seninle kısa ama sıcak bir sohbet etti; adın çevresinde anılır oldu.", detay: "Böyle küçük anlar bazen büyük kapılar açıyor." },
        basarisizSonuc: { para: -5, mesaj: "Hazırlığın boşa gitti, piskopos seni fark bile etmedi.", detay: "Bazı yatırımlar karşılıksız kalıyor." },
      },
      {
        metin: "Kalabalığa karış, göze çarpma.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, fırsat kaçar",
        basariliSonuc: { mesaj: "Sıradan bir cemaat üyesi olarak ayine katıldın.", detay: "Her fırsatın peşinden koşmak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -1, mesaj: "Diğerlerinin piskoposla tanıştığını görünce hafif bir kıskançlık hissettin.", detay: "Bazı fırsatlar kaçırılınca daha çok akılda kalıyor." },
      },
    ],
  },

  // ============================================================
  // HAC / KUTSAL TOPRAK YOLCULUĞU — DİN ADAMI, HER DİN İÇİN
  // (karar -> yolda -> varış zinciri; zorunlu_sonraki ile bağlı)
  // ============================================================
  {
    id: "hac_sunni_karar",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Sünni İslam",
    minYas: 25,
    yasakliEtiketler: ["hac_yolunda", "hacca_gitti"],
    agirlik: 0.9,
    gorsel: "🕋",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hac Niyeti",
    metin:
      "Yıllardır biriktirdiğin adak parası artık yeterli. Mekke'ye, Kâbe'ye bir Hac yolculuğuna çıkma vakti gelmiş olabilir. Kervan önümüzdeki ay yola çıkıyor.",
    secenekler: [
      {
        metin: "Kervana katıl, Mekke'ye doğru yola çık.",
        baseBasariSansi: 75,
        maliyet: 35,
        ipucu: "Hayatının en büyük yolculuğu başlıyor",
        basariliSonuc: {
          para: -35,
          ahlak: 8,
          etiket_ekle: ["hac_yolunda"],
          zorunlu_sonraki: "hac_sunni_yolda",
          mesaj: "Eşyalarını topladın, cemaatinle vedalaştın. Kervan şafak vakti şehir kapısından çıktı.",
          detay: "Bu, sıradan bir yolculuk değil; hayatının dönüm noktalarından biri olacak.",
        },
        basarisizSonuc: {
          para: -50,
          etiket_ekle: ["hac_yolunda"],
          zorunlu_sonraki: "hac_sunni_yolda",
          mesaj: "Hazırlıklar sandığından pahalıya patladı ama yine de kervanla yola çıktın.",
          detay: "Kesen hafifledi, ama niyetin hâlâ sapasağlam.",
        },
      },
      {
        metin: "Bu yıl değil; cemaatinin ihtiyaçları öncelikli.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ama içindeki özlem büyüyor",
        basariliSonuc: { un: 5, mesaj: "Ertelemeni cemaatin takdirle karşıladı; onları bırakmadın.", detay: "Belki gelecek yıl, dedin kendine." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Kervanın tozunu izlerken içinde bir özlem büyüdü.", detay: "Bazı adaklar, zamanını beklemek zorunda kalıyor." },
      },
    ],
  },
  {
    id: "hac_sunni_yolda",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Sünni İslam",
    gerekliEtiketler: ["hac_yolunda"],
    gorsel: "🐫",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Çölün Sınavı",
    metin:
      "Kervan günlerdir kavurucu güneşin altında ilerliyor. Ufukta bir kum fırtınası yükseliyor ve su kırbaları endişe verecek kadar hafifledi.",
    secenekler: [
      {
        metin: "Kervanbaşının tecrübesine güven, sıkı durup birlikte ilerleyin.",
        baseBasariSansi: 70,
        ipucu: "Deneyimli bir rehber riski azaltır ama çöl acımasızdır",
        basariliSonuc: {
          saglik: -5,
          ahlak: 8,
          zorunlu_sonraki: "hac_sunni_varis",
          mesaj: "Fırtınayı kervanla birlikte atlattınız; yorgun ama sağ salimsiniz.",
          detay: "Çölün sınavından geçtin. Kutsal şehir artık çok uzak değil.",
        },
        basarisizSonuc: {
          saglik: -20,
          zorunlu_sonraki: "hac_sunni_varis",
          mesaj: "Fırtına kervanı dağıttı; susuz ve bitkin bir halde yeniden bir araya geldiniz.",
          detay: "Bedenin yorgun ama azmin hâlâ yerinde.",
        },
      },
      {
        metin: "Su kırbanı olan yaşlı, yorgun bir hacıyla paylaş.",
        baseBasariSansi: 85,
        ipucu: "Vicdan huzuru, ama kendi susuzluk riskin artar",
        basariliSonuc: {
          ahlak: 20,
          saglik: -8,
          zorunlu_sonraki: "hac_sunni_varis",
          mesaj: "Suyunu paylaştın; yaşlı hacı dua ederek elini öptü.",
          detay: "Susuzluğun arttı ama vicdanın hiç bu kadar hafif olmamıştı.",
        },
        basarisizSonuc: {
          ahlak: 12,
          saglik: -18,
          zorunlu_sonraki: "hac_sunni_varis",
          mesaj: "Paylaştığın su yetersiz kaldı; ikiniz de susuzluktan bitkin düşerek yola devam ettiniz.",
          detay: "İyiliğin bedelini bedeninle ödedin ama pişman değilsin.",
        },
      },
    ],
  },
  {
    id: "hac_sunni_varis",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Sünni İslam",
    gerekliEtiketler: ["hac_yolunda"],
    gorsel: "🕋",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kâbe'nin Huzurunda",
    metin:
      "Kâbe'yi ilk kez gördüğün an, aylarca süren yolun tüm yorgunluğu bir anda eridi. Etrafında binlerce hacı aynı hissi paylaşıyor.",
    secenekler: [
      {
        metin: "Tavafı sabırla, gözyaşlarınla tamamla.",
        baseBasariSansi: 95,
        ipucu: "Hayatının en dönüştürücü anı",
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mutluluk: 15,
          kultur: 15,
          unvan_kazan: "Hacı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kâbe'nin etrafında yedi tur döndün; içindeki huzuru kelimelere dökemiyorsun.",
          detay: "Artık sadece bir din adamı değil, bir Hacı'sın. Bu unvan, cemaatinin gözünde seni sonsuza dek değiştirecek.",
        },
        basarisizSonuc: {
          ahlak: 15,
          un: 10,
          kultur: 15,
          unvan_kazan: "Hacı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalıkta bir an başın döndü ama yanındaki hacılar seni tavafın sonuna kadar taşıdı.",
          detay: "Bedenin zayıf düştü ama ibadetin tamamlandı; Hacı unvanını hak ettin.",
        },
      },
      {
        metin: "Kalabalıktan biraz uzakta, sessizce dua et.",
        baseBasariSansi: 100,
        ipucu: "Sakin ve içe dönük bir tercih",
        basariliSonuc: {
          ahlak: 18,
          un: 10,
          mutluluk: 10,
          kultur: 15,
          unvan_kazan: "Hacı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalığın biraz dışında, kendi sessizliğinde dua ettin; huzurun derin ve kişiseldi.",
          detay: "Gösterişten uzak bir ibadet seçtin ama Hac tamamlandı; artık bir Hacı'sın.",
        },
        basarisizSonuc: {
          ahlak: 18,
          un: 10,
          mutluluk: 10,
          kultur: 15,
          unvan_kazan: "Hacı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalığın biraz dışında, kendi sessizliğinde dua ettin; huzurun derin ve kişiseldi.",
          detay: "Gösterişten uzak bir ibadet seçtin ama Hac tamamlandı; artık bir Hacı'sın.",
        },
      },
    ],
  },
  {
    id: "hac_katolik_karar",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Katolik",
    minYas: 25,
    yasakliEtiketler: ["hac_yolunda", "hacca_gitti"],
    agirlik: 0.9,
    gorsel: "✝️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kudüs Yemini",
    metin:
      "İçinde yıllardır taşıdığın bir adak var: Kutsal Kabir'i, Kudüs'ü kendi gözlerinle görmek. Bir tüccar gemisi kutsal topraklara doğru yelken açmaya hazırlanıyor.",
    secenekler: [
      {
        metin: "Gemiye bin, Kudüs'e doğru yelken aç.",
        baseBasariSansi: 75,
        maliyet: 35,
        ipucu: "Hayatının en büyük yolculuğu başlıyor",
        basariliSonuc: {
          para: -35,
          ahlak: 8,
          etiket_ekle: ["hac_yolunda"],
          zorunlu_sonraki: "hac_katolik_yolda",
          mesaj: "Eşyalarını topladın, cemaatinle vedalaştın. Gemi şafak vakti limandan ayrıldı.",
          detay: "Bu, sıradan bir yolculuk değil; hayatının dönüm noktalarından biri olacak.",
        },
        basarisizSonuc: {
          para: -50,
          etiket_ekle: ["hac_yolunda"],
          zorunlu_sonraki: "hac_katolik_yolda",
          mesaj: "Hazırlıklar sandığından pahalıya patladı ama yine de gemiyle yola çıktın.",
          detay: "Kesen hafifledi, ama niyetin hâlâ sapasağlam.",
        },
      },
      {
        metin: "Bu yıl değil; cemaatinin ihtiyaçları öncelikli.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ama içindeki özlem büyüyor",
        basariliSonuc: { un: 5, mesaj: "Ertelemeni cemaatin takdirle karşıladı; onları bırakmadın.", detay: "Belki gelecek yıl, dedin kendine." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Geminin ardından bakarken içinde bir özlem büyüdü.", detay: "Bazı adaklar, zamanını beklemek zorunda kalıyor." },
      },
    ],
  },
  {
    id: "hac_katolik_yolda",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Katolik",
    gerekliEtiketler: ["hac_yolunda"],
    gorsel: "🌊",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Deniz ve Korsanlar",
    metin:
      "Akdeniz'i geçerken ufukta şüpheli bir yelken beliriyor; kaptan bunun bir korsan gemisi olabileceğini fısıldıyor. Aynı anda gökyüzü de kararmaya başladı.",
    secenekler: [
      {
        metin: "Kaptana güven, fırtınayı ve tehlikeyi birlikte göğüsleyin.",
        baseBasariSansi: 70,
        ipucu: "Deneyimli bir kaptan riski azaltır ama deniz acımasızdır",
        basariliSonuc: {
          saglik: -5,
          ahlak: 8,
          zorunlu_sonraki: "hac_katolik_varis",
          mesaj: "Fırtınayı ve şüpheli gemiyi geride bıraktınız; yorgun ama sağ salimsiniz.",
          detay: "Denizin sınavından geçtin. Kutsal şehir artık çok uzak değil.",
        },
        basarisizSonuc: {
          saglik: -20,
          zorunlu_sonraki: "hac_katolik_varis",
          mesaj: "Fırtına gemiyi rotasından çıkardı; günlerce sürüklendikten sonra zar zor toparlandınız.",
          detay: "Bedenin yorgun ama azmin hâlâ yerinde.",
        },
      },
      {
        metin: "Gemideki hasta bir yolcuya kendi ilaç ve erzakını ver.",
        baseBasariSansi: 85,
        ipucu: "Vicdan huzuru, ama kendi gücün azalır",
        basariliSonuc: {
          ahlak: 20,
          saglik: -8,
          zorunlu_sonraki: "hac_katolik_varis",
          mesaj: "İlaçlarını paylaştın; yolcu iyileşti ve sana dua etti.",
          detay: "Gücün azaldı ama vicdanın hiç bu kadar hafif olmamıştı.",
        },
        basarisizSonuc: {
          ahlak: 12,
          saglik: -18,
          zorunlu_sonraki: "hac_katolik_varis",
          mesaj: "Paylaştığın yardım yetersiz kaldı; ikiniz de zayıf düşmüş halde yolculuğa devam ettiniz.",
          detay: "İyiliğin bedelini bedeninle ödedin ama pişman değilsin.",
        },
      },
    ],
  },
  {
    id: "hac_katolik_varis",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Katolik",
    gerekliEtiketler: ["hac_yolunda"],
    gorsel: "⛪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kutsal Kabir'in Önünde",
    metin:
      "Kudüs'e vardığında ilk durağın Kutsal Kabir Kilisesi oluyor. Aylarca süren yolun tüm yorgunluğu, kapıdan içeri adım attığın an bir anda eriyor.",
    secenekler: [
      {
        metin: "Diz çök, gözyaşlarınla uzun bir dua et.",
        baseBasariSansi: 95,
        ipucu: "Hayatının en dönüştürücü anı",
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mutluluk: 15,
          kultur: 15,
          unvan_kazan: "Kudüs Hacısı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kutsal Kabir'in önünde diz çöktün; içindeki huzuru kelimelere dökemiyorsun.",
          detay: "Artık sadece bir din adamı değil, bir Kudüs Hacısı'sın. Bu unvan, cemaatinin gözünde seni sonsuza dek değiştirecek.",
        },
        basarisizSonuc: {
          ahlak: 15,
          un: 10,
          kultur: 15,
          unvan_kazan: "Kudüs Hacısı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalıkta bir an başın döndü ama yanındaki hacılar seni ayine kadar taşıdı.",
          detay: "Bedenin zayıf düştü ama ziyaretin tamamlandı; Kudüs Hacısı unvanını hak ettin.",
        },
      },
      {
        metin: "Kalabalıktan biraz uzakta, sessizce dua et.",
        baseBasariSansi: 100,
        ipucu: "Sakin ve içe dönük bir tercih",
        basariliSonuc: {
          ahlak: 18,
          un: 10,
          mutluluk: 10,
          kultur: 15,
          unvan_kazan: "Kudüs Hacısı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalığın biraz dışında, kendi sessizliğinde dua ettin; huzurun derin ve kişiseldi.",
          detay: "Gösterişten uzak bir ibadet seçtin ama ziyaret tamamlandı; artık bir Kudüs Hacısı'sın.",
        },
        basarisizSonuc: {
          ahlak: 18,
          un: 10,
          mutluluk: 10,
          kultur: 15,
          unvan_kazan: "Kudüs Hacısı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalığın biraz dışında, kendi sessizliğinde dua ettin; huzurun derin ve kişiseldi.",
          detay: "Gösterişten uzak bir ibadet seçtin ama ziyaret tamamlandı; artık bir Kudüs Hacısı'sın.",
        },
      },
    ],
  },
  {
    id: "hac_ortodoks_karar",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Ortodoks",
    minYas: 25,
    yasakliEtiketler: ["hac_yolunda", "hacca_gitti"],
    agirlik: 0.9,
    gorsel: "☦️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kutsal Yolculuk Adağı",
    metin:
      "İçinde yıllardır taşıdığın bir adak var: Kutsal Kabir'i, Kudüs'ü kendi gözlerinle görmek. Kervan yolu üzerinden kutsal topraklara doğru bir grup hacı toplanıyor.",
    secenekler: [
      {
        metin: "Gruba katıl, kara yoluyla Kudüs'e doğru yola çık.",
        baseBasariSansi: 75,
        maliyet: 35,
        ipucu: "Hayatının en büyük yolculuğu başlıyor",
        basariliSonuc: {
          para: -35,
          ahlak: 8,
          etiket_ekle: ["hac_yolunda"],
          zorunlu_sonraki: "hac_ortodoks_yolda",
          mesaj: "Eşyalarını topladın, cemaatinle vedalaştın. Kafile şafak vakti yola koyuldu.",
          detay: "Bu, sıradan bir yolculuk değil; hayatının dönüm noktalarından biri olacak.",
        },
        basarisizSonuc: {
          para: -50,
          etiket_ekle: ["hac_yolunda"],
          zorunlu_sonraki: "hac_ortodoks_yolda",
          mesaj: "Hazırlıklar sandığından pahalıya patladı ama yine de kafileyle yola çıktın.",
          detay: "Kesen hafifledi, ama niyetin hâlâ sapasağlam.",
        },
      },
      {
        metin: "Bu yıl değil; cemaatinin ihtiyaçları öncelikli.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ama içindeki özlem büyüyor",
        basariliSonuc: { un: 5, mesaj: "Ertelemeni cemaatin takdirle karşıladı; onları bırakmadın.", detay: "Belki gelecek yıl, dedin kendine." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Kafilenin ardından bakarken içinde bir özlem büyüdü.", detay: "Bazı adaklar, zamanını beklemek zorunda kalıyor." },
      },
    ],
  },
  {
    id: "hac_ortodoks_yolda",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Ortodoks",
    gerekliEtiketler: ["hac_yolunda"],
    gorsel: "🏔️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dağ Geçidinde Tehlike",
    metin:
      "Kafile dar bir dağ geçidinden geçerken kar fırtınası bastırdı. Az ilerde, geçidi tutan bir eşkıya grubunun gölgeleri seçiliyor.",
    secenekler: [
      {
        metin: "Rehberin bildiği gizli patikadan sessizce ilerleyin.",
        baseBasariSansi: 70,
        ipucu: "Deneyimli bir rehber riski azaltır ama dağ acımasızdır",
        basariliSonuc: {
          saglik: -5,
          ahlak: 8,
          zorunlu_sonraki: "hac_ortodoks_varis",
          mesaj: "Gizli patikadan eşkıyaya görünmeden geçtiniz; yorgun ama sağ salimsiniz.",
          detay: "Dağın sınavından geçtin. Kutsal şehir artık çok uzak değil.",
        },
        basarisizSonuc: {
          saglik: -20,
          zorunlu_sonraki: "hac_ortodoks_varis",
          mesaj: "Kar fırtınası kafileyi dağıttı; donarak ve bitkin bir halde yeniden bir araya geldiniz.",
          detay: "Bedenin yorgun ama azmin hâlâ yerinde.",
        },
      },
      {
        metin: "Yürüyemeyecek durumdaki yaşlı bir hacıyı sırtında taşı.",
        baseBasariSansi: 85,
        ipucu: "Vicdan huzuru, ama kendi gücün azalır",
        basariliSonuc: {
          ahlak: 20,
          saglik: -8,
          zorunlu_sonraki: "hac_ortodoks_varis",
          mesaj: "Yaşlı hacıyı sırtında taşıdın; geçidin sonunda gözyaşlarıyla sana dua etti.",
          detay: "Gücün azaldı ama vicdanın hiç bu kadar hafif olmamıştı.",
        },
        basarisizSonuc: {
          ahlak: 12,
          saglik: -18,
          zorunlu_sonraki: "hac_ortodoks_varis",
          mesaj: "Taşımaya çalıştığın yükün altında ikiniz de bitkin düştünüz ama geçidi geçtiniz.",
          detay: "İyiliğin bedelini bedeninle ödedin ama pişman değilsin.",
        },
      },
    ],
  },
  {
    id: "hac_ortodoks_varis",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Ortodoks",
    gerekliEtiketler: ["hac_yolunda"],
    gorsel: "☦️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kutsal Kabir'de Diz Çökmek",
    metin:
      "Kudüs'e vardığında ilk durağın Kutsal Kabir Kilisesi oluyor. Aylarca süren yolun tüm yorgunluğu, kapıdan içeri adım attığın an bir anda eriyor.",
    secenekler: [
      {
        metin: "Diz çök, gözyaşlarınla uzun bir dua et.",
        baseBasariSansi: 95,
        ipucu: "Hayatının en dönüştürücü anı",
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mutluluk: 15,
          kultur: 15,
          unvan_kazan: "Kutsal Toprak Hacısı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kutsal Kabir'in önünde diz çöktün; içindeki huzuru kelimelere dökemiyorsun.",
          detay: "Artık sadece bir din adamı değil, bir Kutsal Toprak Hacısı'sın. Bu unvan, cemaatinin gözünde seni sonsuza dek değiştirecek.",
        },
        basarisizSonuc: {
          ahlak: 15,
          un: 10,
          kultur: 15,
          unvan_kazan: "Kutsal Toprak Hacısı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalıkta bir an başın döndü ama yanındaki hacılar seni ayine kadar taşıdı.",
          detay: "Bedenin zayıf düştü ama ziyaretin tamamlandı; Kutsal Toprak Hacısı unvanını hak ettin.",
        },
      },
      {
        metin: "Kalabalıktan biraz uzakta, sessizce dua et.",
        baseBasariSansi: 100,
        ipucu: "Sakin ve içe dönük bir tercih",
        basariliSonuc: {
          ahlak: 18,
          un: 10,
          mutluluk: 10,
          kultur: 15,
          unvan_kazan: "Kutsal Toprak Hacısı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalığın biraz dışında, kendi sessizliğinde dua ettin; huzurun derin ve kişiseldi.",
          detay: "Gösterişten uzak bir ibadet seçtin ama ziyaret tamamlandı; artık bir Kutsal Toprak Hacısı'sın.",
        },
        basarisizSonuc: {
          ahlak: 18,
          un: 10,
          mutluluk: 10,
          kultur: 15,
          unvan_kazan: "Kutsal Toprak Hacısı",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Kalabalığın biraz dışında, kendi sessizliğinde dua ettin; huzurun derin ve kişiseldi.",
          detay: "Gösterişten uzak bir ibadet seçtin ama ziyaret tamamlandı; artık bir Kutsal Toprak Hacısı'sın.",
        },
      },
    ],
  },
  {
    id: "hac_anglikan_karar",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Anglikan",
    minYas: 25,
    yasakliEtiketler: ["hac_yolunda", "hacca_gitti"],
    agirlik: 0.9,
    gorsel: "⛵",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kutsal Topraklar Seferi",
    metin:
      "Bir seyahat şirketi, Kudüs'e organize bir tur düzenliyor: buharlı gemiyle Akdeniz'i geçip kutsal yerleri ziyaret etmek. Pahalı ama artık pek çok din adamı bu yolculuğa çıkıyor.",
    secenekler: [
      {
        metin: "Bilete para yatır, buharlı gemiye bin.",
        baseBasariSansi: 75,
        maliyet: 35,
        ipucu: "Hayatının en büyük yolculuğu başlıyor",
        basariliSonuc: {
          para: -35,
          ahlak: 8,
          etiket_ekle: ["hac_yolunda"],
          zorunlu_sonraki: "hac_anglikan_yolda",
          mesaj: "Eşyalarını topladın, cemaatinle vedalaştın. Gemi limandan ayrıldı.",
          detay: "Bu, sıradan bir yolculuk değil; hayatının dönüm noktalarından biri olacak.",
        },
        basarisizSonuc: {
          para: -50,
          etiket_ekle: ["hac_yolunda"],
          zorunlu_sonraki: "hac_anglikan_yolda",
          mesaj: "Hazırlıklar sandığından pahalıya patladı ama yine de gemiye bindin.",
          detay: "Kesen hafifledi, ama niyetin hâlâ sapasağlam.",
        },
      },
      {
        metin: "Bu yıl değil; cemaatinin ihtiyaçları öncelikli.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ama içindeki özlem büyüyor",
        basariliSonuc: { un: 5, mesaj: "Ertelemeni cemaatin takdirle karşıladı; onları bırakmadın.", detay: "Belki gelecek yıl, dedin kendine." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Geminin ardından bakarken içinde bir özlem büyüdü.", detay: "Bazı adaklar, zamanını beklemek zorunda kalıyor." },
      },
    ],
  },
  {
    id: "hac_anglikan_yolda",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Anglikan",
    gerekliEtiketler: ["hac_yolunda"],
    gorsel: "🚢",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Karantina Limanı",
    metin:
      "Gemi, Osmanlı limanına yanaştığında güvertede kolera şüphesi yayılıyor. Liman yetkilileri gemiyi günlerce karantinaya alabileceklerini söylüyor.",
    secenekler: [
      {
        metin: "Kurallara uy, karantina süresini sabırla bekle.",
        baseBasariSansi: 70,
        ipucu: "Güvenli ama yorucu bir bekleyiş",
        basariliSonuc: {
          saglik: -5,
          ahlak: 8,
          zorunlu_sonraki: "hac_anglikan_varis",
          mesaj: "Karantinayı sabırla atlattınız; herkes sağlıklı bir şekilde yola devam etti.",
          detay: "Bekleyişin sınavından geçtin. Kutsal şehir artık çok uzak değil.",
        },
        basarisizSonuc: {
          saglik: -20,
          zorunlu_sonraki: "hac_anglikan_varis",
          mesaj: "Karantina sırasında gemide gerçekten birkaç vaka çıktı; günlerce endişeyle bekleyip zayıf düştün.",
          detay: "Bedenin yorgun ama azmin hâlâ yerinde.",
        },
      },
      {
        metin: "Gemideki hasta bir yolcuya kendi ilaç ve erzakını ver.",
        baseBasariSansi: 85,
        ipucu: "Vicdan huzuru, ama kendi gücün azalır",
        basariliSonuc: {
          ahlak: 20,
          saglik: -8,
          zorunlu_sonraki: "hac_anglikan_varis",
          mesaj: "İlaçlarını paylaştın; yolcu iyileşti ve sana minnettar kaldı.",
          detay: "Gücün azaldı ama vicdanın hiç bu kadar hafif olmamıştı.",
        },
        basarisizSonuc: {
          ahlak: 12,
          saglik: -18,
          zorunlu_sonraki: "hac_anglikan_varis",
          mesaj: "Paylaştığın yardım yetersiz kaldı; ikiniz de zayıf düşmüş halde yolculuğa devam ettiniz.",
          detay: "İyiliğin bedelini bedeninle ödedin ama pişman değilsin.",
        },
      },
    ],
  },
  {
    id: "hac_anglikan_varis",
    kategori: "din",
    meslekler: ["Din Adamı"],
    gerekliDin: "Anglikan",
    gerekliEtiketler: ["hac_yolunda"],
    gorsel: "🌄",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Zeytin Dağı'ndan Manzara",
    metin:
      "Kudüs'e vardığında Zeytin Dağı'na çıkıp kutsal şehre yukarıdan bakıyorsun. Aylarca süren yolun tüm yorgunluğu, bu manzara karşısında bir anda eriyor.",
    secenekler: [
      {
        metin: "Sessizce otur, uzun bir dua ve şükranla anı yaşa.",
        baseBasariSansi: 95,
        ipucu: "Hayatının en dönüştürücü anı",
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mutluluk: 15,
          kultur: 15,
          unvan_kazan: "Kutsal Toprak Gezgini",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Zeytin Dağı'nda gün batımını izlerken içindeki huzuru kelimelere dökemiyorsun.",
          detay: "Artık sadece bir din adamı değil, bir Kutsal Toprak Gezgini'sin. Bu unvan, cemaatinin gözünde seni sonsuza dek değiştirecek.",
        },
        basarisizSonuc: {
          ahlak: 15,
          un: 10,
          kultur: 15,
          unvan_kazan: "Kutsal Toprak Gezgini",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Yorgunluğun seni bir an bunalttı ama yol arkadaşların seni gezinin sonuna kadar destekledi.",
          detay: "Bedenin zayıf düştü ama ziyaretin tamamlandı; Kutsal Toprak Gezgini unvanını hak ettin.",
        },
      },
      {
        metin: "Küçük not defterine gördüklerini sessizce yaz.",
        baseBasariSansi: 100,
        ipucu: "Sakin ve içe dönük bir tercih",
        basariliSonuc: {
          ahlak: 18,
          un: 10,
          mutluluk: 10,
          kultur: 15,
          unvan_kazan: "Kutsal Toprak Gezgini",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Gördüklerini sessizce not defterine düştün; huzurun derin ve kişiseldi.",
          detay: "Gösterişten uzak bir ibadet seçtin ama ziyaret tamamlandı; artık bir Kutsal Toprak Gezgini'sin.",
        },
        basarisizSonuc: {
          ahlak: 18,
          un: 10,
          mutluluk: 10,
          kultur: 15,
          unvan_kazan: "Kutsal Toprak Gezgini",
          etiket_ekle: ["hacca_gitti"],
          etiket_sil: ["hac_yolunda"],
          mesaj: "Gördüklerini sessizce not defterine düştün; huzurun derin ve kişiseldi.",
          detay: "Gösterişten uzak bir ibadet seçtin ama ziyaret tamamlandı; artık bir Kutsal Toprak Gezgini'sin.",
        },
      },
    ],
  },
  {
    id: "asker_kucuk_baskin_ganimeti",
    kategori: "savas",
    meslekler: ["Asker"],
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
        ipucu: "Küçük ama garanti bir ganimet payı",
        basariliSonuc: { para: 14, un: 3, mesaj: "Payına düşen ganimetle cebin biraz şişti; komutanın da seni fark etti.", detay: "Küçük zaferler de sayılır." },
        basarisizSonuc: { saglik: -6, mesaj: "Çatışmada sıyrık aldın, ganimetten payına pek bir şey düşmedi.", detay: "Her baskın kazançlı geçmiyor." },
      },
      {
        metin: "Geride dur, gözcülük yap.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, küçük pay",
        basariliSonuc: { para: 5, mesaj: "Gözcülük görevini iyi yaptın; küçük bir pay da sana ayrıldı.", detay: "Her zaman ön safta olmak zorunda değilsin." },
        basarisizSonuc: { mesaj: "Geride kalman bazı yoldaşların gözünde hoş karşılanmadı.", detay: "Bazı seçimler sessizce yargılanıyor." },
      },
    ],
  },
  {
    id: "dinadami_minnettar_ziyaretci",
    kategori: "din",
    meslekler: ["Din Adamı"],
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
        ipucu: "Küçük ama içten bir kazanç",
        basariliSonuc: { para: 8, mutluluk: 4, mesaj: "Küçük hediye, verdiğin emeğin karşılığı gibi hissettirdi.", detay: "Bazen en küçük jestler en çok değeni taşıyor." },
        basarisizSonuc: { mutluluk: 2, mesaj: "Hediye mütevazıydı ama düşüncesi güzeldi.", detay: "Her zaman büyük olması gerekmiyor." },
      },
      {
        metin: "Nazikçe reddet, karşılıksız yardım ettiğini söyle.",
        baseBasariSansi: 90,
        ipucu: "Ahlaki duruş, maddi kazanç yok",
        basariliSonuc: { ahlak: 6, un: 3, mesaj: "Reddin cemaat arasında yayıldı; alçakgönüllülüğünle tanındın.", detay: "Bazı itibarlar parayla satın alınamaz." },
        basarisizSonuc: { mesaj: "Reddin biraz tuhaf karşılandı, ziyaretçi mahcup ayrıldı.", detay: "Bazen iyi niyet de yanlış anlaşılabiliyor." },
      },
    ],
  },
  {
    id: "sehir_yonetim_asker_baslangic",
    kategori: "siyaset",
    meslekler: ["Asker"],
    minRutbeSeviye: 3,
    agirlik: 1,
    gorsel: "🏛️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ordunun Üstünde Bir Güç",
    metin:
      "Kumandanlık rütbesi artık senin için bir tavan değil, bir başlangıç. Şehrin savunma bütçesini yönetecek kişiyi seçiyorlar; rakip bir general de aynı koltuğun peşinde. Kazanırsan sadece ordunun değil, şehrin ekonomisinin de bir parçasını yönetirsin.",
    secenekler: [
      {
        metin: "Mücadeleye gir, koltuğu hedefle.",
        baseBasariSansi: 60,
        ipucu: "Kazanırsan sonu olmayan yeni bir ilerleme ekseni açılır",
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 35,
          un: 12,
          etiket_ekle: ["sehir_yonetimi_basladi"],
          mesaj: "Rakip generali geride bıraktın; artık şehrin savunma bütçesinin bir kısmı senin elinde.",
          detay: "Kumandanlık artık bir son değil, yeni bir yarışın başlangıcı.",
        },
        basarisizSonuc: {
          para: -10,
          un: -5,
          etiket_ekle: ["sehir_yonetimi_basladi"],
          mesaj: "Bu turu rakip general kazandı, ama yarış bitmedi; adın artık bu çevrede biliniyor.",
          detay: "İlk denemen başarısız oldu ama artık oyunun içindesin.",
        },
      },
      {
        metin: "Reddet, kumandanlıkla yetin.",
        baseBasariSansi: 95,
        ipucu: "Güvenli ama bu fırsatı geri çevirirsin",
        basariliSonuc: { mesaj: "Teklifi geri çevirdin; mevcut konumunla yetinmeyi seçtin.", detay: "Belki başka bir gün fikrin değişir." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Reddettiğine biraz pişman oldun; rakip general koltuğu sensiz aldı.", detay: "Bazı fırsatlar bir daha aynı şekilde gelmiyor." },
      },
    ],
  },
  {
    id: "sehir_yonetim_tuccar_baslangic",
    kategori: "siyaset",
    meslekler: ["Tüccar"],
    minRutbeSeviye: 3,
    agirlik: 1,
    gorsel: "🏛️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Loncanın Ötesinde",
    metin:
      "Lonca Ustalığı artık senin için bir tavan değil, bir başlangıç. Şehrin ticaret konseyinde bir koltuk boşaldı; rakip bir tüccar da aynı koltuğun peşinde. Kazanırsan sadece kendi işini değil, şehrin ekonomisinin bir parçasını yönetirsin.",
    secenekler: [
      {
        metin: "Mücadeleye gir, koltuğu hedefle.",
        baseBasariSansi: 60,
        ipucu: "Kazanırsan sonu olmayan yeni bir ilerleme ekseni açılır",
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 40,
          un: 12,
          etiket_ekle: ["sehir_yonetimi_basladi"],
          mesaj: "Rakip tüccarı geride bıraktın; artık şehrin ticaret konseyinde bir sözün var.",
          detay: "Lonca Ustalığı artık bir son değil, yeni bir yarışın başlangıcı.",
        },
        basarisizSonuc: {
          para: -15,
          un: -5,
          etiket_ekle: ["sehir_yonetimi_basladi"],
          mesaj: "Bu turu rakip tüccar kazandı, ama yarış bitmedi; adın artık konseyde biliniyor.",
          detay: "İlk denemen başarısız oldu ama artık oyunun içindesin.",
        },
      },
      {
        metin: "Reddet, mevcut işinle yetin.",
        baseBasariSansi: 95,
        ipucu: "Güvenli ama bu fırsatı geri çevirirsin",
        basariliSonuc: { mesaj: "Teklifi geri çevirdin; mevcut konumunla yetinmeyi seçtin.", detay: "Belki başka bir gün fikrin değişir." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Reddettiğine biraz pişman oldun; rakip tüccar koltuğu sensiz aldı.", detay: "Bazı fırsatlar bir daha aynı şekilde gelmiyor." },
      },
    ],
  },
  {
    id: "sehir_yonetim_dinadami_baslangic",
    kategori: "siyaset",
    meslekler: ["Din Adamı"],
    minRutbeSeviye: 3,
    agirlik: 1,
    gorsel: "🏛️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kürsünün Ötesinde",
    metin:
      "Başrahiplik artık senin için bir tavan değil, bir başlangıç. Şehrin büyük vakıflarını kim yönetecek tartışılıyor; rakip bir rahip de aynı makamın peşinde. Kazanırsan sadece cemaati değil, şehrin ekonomisinin bir parçasını da yönetirsin.",
    secenekler: [
      {
        metin: "Mücadeleye gir, makamı hedefle.",
        baseBasariSansi: 60,
        ipucu: "Kazanırsan sonu olmayan yeni bir ilerleme ekseni açılır",
        basariliSonuc: {
          sehir_yonetim_artis: 1,
          para: 30,
          un: 15,
          etiket_ekle: ["sehir_yonetimi_basladi"],
          mesaj: "Rakip rahibi geride bıraktın; artık şehrin büyük vakıflarında bir sözün var.",
          detay: "Başrahiplik artık bir son değil, yeni bir yarışın başlangıcı.",
        },
        basarisizSonuc: {
          ahlak: -5,
          un: -5,
          etiket_ekle: ["sehir_yonetimi_basladi"],
          mesaj: "Bu turu rakip rahip kazandı, ama yarış bitmedi; adın artık meclis içinde biliniyor.",
          detay: "İlk denemen başarısız oldu ama artık oyunun içindesin.",
        },
      },
      {
        metin: "Reddet, kürsünle yetin.",
        baseBasariSansi: 95,
        ipucu: "Güvenli ama bu fırsatı geri çevirirsin",
        basariliSonuc: { mesaj: "Teklifi geri çevirdin; mevcut konumunla yetinmeyi seçtin.", detay: "Belki başka bir gün fikrin değişir." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Reddettiğine biraz pişman oldun; rakip rahip makamı sensiz aldı.", detay: "Bazı fırsatlar bir daha aynı şekilde gelmiyor." },
      },
    ],
  },
  {
    id: "sehir_yonetim_asker_savunma_butcesi",
    kategori: "siyaset",
    meslekler: ["Asker"],
    gerekliEtiketler: ["sehir_yonetimi_basladi"],
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
        ipucu: "Kazanırsan nüfuzun kalıcı olarak büyür",
        basariliSonuc: { sehir_yonetim_artis: 1, para: 30, un: 10, mesaj: "Bütçenin büyük kısmını kendi birliklerine yönlendirmeyi başardın.", detay: "Rakip general seni izlemeye devam edecek, ama bu turu sen kazandın." },
        basarisizSonuc: { para: -15, mesaj: "Bu tur rakip general kazandı; payın küçüldü.", detay: "Yarış henüz bitmedi." },
      },
      {
        metin: "Rakip generalin sırlarını ifşa etmekle şantaj yap.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Tehlikeli şantaj",
        basariliSonuc: {
          sehir_yonetim_artis: 2,
          para: 40,
          un: 15,
          ahlak: -20,
          mesaj: "Generalin zayıf noktasını kullanarak onu köşeye sıkıştırdın. Bütçenin neredeyse tamamı sana aktarıldı.",
          detay: "Siyaset bazen kılıçtan daha keskindir."
        },
        basarisizSonuc: {
          saglik: -30,
          un: -15,
          olum_sansi: 5,
          mesaj: "Şantajın ters tepti! General seni pusuya düşürüp adamlarına dövdürttü. Bütçeyi tamamen kaybettin."
        }
      },
      {
        metin: "Geri çekil, güç biriktir.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ilerleme yok",
        basariliSonuc: { mesaj: "Bu sefer geri planda kalmayı tercih ettin.", detay: "Sabır bazen en iyi stratejidir." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Geride kalman bazı yandaşlarını hayal kırıklığına uğrattı.", detay: "Her zaman izlemek zorunda değilsin." },
      },
    ],
  },
  {
    id: "sehir_yonetim_asker_sinir_kampanyasi",
    kategori: "siyaset",
    meslekler: ["Asker"],
    gerekliEtiketler: ["sehir_yonetimi_basladi"],
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
        ipucu: "Kazanırsan nüfuzun kalıcı olarak büyür",
        basariliSonuc: { sehir_yonetim_artis: 1, para: 35, un: 10, mesaj: "Kampanya başarıyla sonuçlandı; sınır ticaret yolları artık senin gözetiminde.", detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor." },
        basarisizSonuc: { saglik: -8, para: -10, mesaj: "Kampanya beklenenden zorlu geçti, kayıplarla geri döndün.", detay: "Bir sonraki fırsat için gücünü topla." },
      },
      {
        metin: "Başkasına bırak, riske girme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ilerleme yok",
        basariliSonuc: { mesaj: "Liderliği başka birine bıraktın.", detay: "Her savaşı sen kazanmak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Kampanyanın başarısını uzaktan izlerken hafif bir pişmanlık hissettin.", detay: "Bazı fırsatlar bir daha gelmiyor." },
      },
    ],
  },
  {
    id: "sehir_yonetim_tuccar_ticaret_yollari",
    kategori: "siyaset",
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["sehir_yonetimi_basladi"],
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
        ipucu: "Kazanırsan nüfuzun kalıcı olarak büyür",
        basariliSonuc: { sehir_yonetim_artis: 1, para: 45, un: 10, mesaj: "İmtiyazı kazandın; yeni ticaret yolu artık senin kervanlarınla işliyor.", detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor." },
        basarisizSonuc: { para: -20, mesaj: "İmtiyazı rakip tüccar kazandı; yatırdığın emek boşa gitti.", detay: "Yarış henüz bitmedi." },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ilerleme yok",
        basariliSonuc: { mesaj: "Bu imtiyaza girmemeyi tercih ettin.", detay: "Her fırsatın peşinden koşmak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Rakibin kazandığını duyunca içerledin.", detay: "Bazı fırsatlar bir daha gelmiyor." },
      },
    ],
  },
  {
    id: "sehir_yonetim_tuccar_vergi_imtiyazi",
    kategori: "siyaset",
    meslekler: ["Tüccar"],
    gerekliEtiketler: ["sehir_yonetimi_basladi"],
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
        ipucu: "Pahalı ama kazanırsan nüfuzun kalıcı olarak büyür",
        basariliSonuc: { sehir_yonetim_artis: 1, para: 50, un: 12, mesaj: "İhaleyi kazandın; artık pazarın vergi geliri bir ölçüde senin elinde.", detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor." },
        basarisizSonuc: { para: -20, mesaj: "İhaleyi rakip tüccar kazandı; teklifin boşa gitti.", detay: "Yarış henüz bitmedi." },
      },
      {
        metin: "Vergi toplamada zorbalık yapmayı teklif et.",
        baseBasariSansi: 40,
        maxAhlak: 35,
        ipucu: "Sadece ahlaksızlara: Çete usulü kazanç",
        basariliSonuc: { 
          sehir_yonetim_artis: 2, 
          para: 70, 
          ahlak: -30, 
          un: -15, 
          mesaj: "Konsey teklifini gizlice onayladı. Sopalı adamlarınla vergileri acımasızca topladın.", 
          detay: "Halk senden nefret ediyor ama kasan hiç bu kadar dolmamıştı." 
        },
        basarisizSonuc: { 
          para: -30, 
          un: -25, 
          mesaj: "Konsey bu kadar ileri gitmeye cesaret edemedi ve seni ihalenin dışında bıraktı." 
        }
      },
      {
        metin: "İhaleye girme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ilerleme yok",
        basariliSonuc: { mesaj: "Bu ihaleye girmemeyi tercih ettin.", detay: "Her fırsatın peşinden koşmak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Rakibin kazandığını duyunca içerledin.", detay: "Bazı fırsatlar bir daha gelmiyor." },
      },
    ],
  },
  {
    id: "sehir_yonetim_dinadami_vakif_yonetimi",
    kategori: "siyaset",
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["sehir_yonetimi_basladi"],
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
        ipucu: "Kazanırsan nüfuzun kalıcı olarak büyür",
        basariliSonuc: { sehir_yonetim_artis: 1, para: 35, un: 12, mesaj: "Koltuğu kazandın; vakfın kaynakları artık kısmen senin gözetiminde.", detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor." },
        basarisizSonuc: { ahlak: -5, mesaj: "Koltuğu rakip rahip kazandı; emeğin boşa gitti.", detay: "Yarış henüz bitmedi." },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ilerleme yok",
        basariliSonuc: { mesaj: "Bu koltuğa girmemeyi tercih ettin.", detay: "Her fırsatın peşinden koşmak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Rakibin kazandığını duyunca içerledin.", detay: "Bazı fırsatlar bir daha gelmiyor." },
      },
    ],
  },
  {
    id: "sehir_yonetim_dinadami_kutsal_emanet",
    kategori: "siyaset",
    meslekler: ["Din Adamı"],
    gerekliEtiketler: ["sehir_yonetimi_basladi"],
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
        ipucu: "Kazanırsan nüfuzun kalıcı olarak büyür",
        basariliSonuc: { sehir_yonetim_artis: 1, para: 40, un: 15, mesaj: "Koruyuculuk sana verildi; hacılar artık senin kürsüne akın ediyor.", detay: "Şehrin ekonomisindeki payın büyümeye devam ediyor." },
        basarisizSonuc: { un: -5, mesaj: "Unvan rakip rahibe verildi; emeğin boşa gitti.", detay: "Yarış henüz bitmedi." },
      },
      {
        metin: "Bu sefer geri çekil.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ilerleme yok",
        basariliSonuc: { mesaj: "Bu unvana talip olmamayı tercih ettin.", detay: "Her fırsatın peşinden koşmak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Rakibin kazandığını duyunca içerledin.", detay: "Bazı fırsatlar bir daha gelmiyor." },
      },
    ],
  },
  {
    id: "saray_girme_denemesi",
    kategori: "siyaset",
    minYas: 18,
    yasakliEtiketler: ["sarayda"],
    agirlik: 0.4,
    gorsel: "🏰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sarayın Kapısında",
    metin:
      "Saray kapıcıları herkesi içeri almıyor. Ama bazen bir kese altın, bazen de doğru bir isim anmak kapıyı aralayabiliyor.",
    secenekler: [
      {
        metin: "Gölge Sikkesi'ni avucunda göster.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["envanter:golge_sikke"],
        ipucu: "Gizli Envanter: Muhafızları hipnotize et",
        basariliSonuc: {
          etiket_ekle: ["sarayda"],
          etiket_sil: ["envanter:golge_sikke"],
          un: 15,
          ahlak: -10,
          mesaj: "Sikkeyi gören muhafızların gözleri karardı. Tek kelime etmeden ağır kapıları sana ardına kadar açtılar.",
          detay: "Sarayın içine bir hayalet gibi, efsanevi bir şekilde sızdın."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Kapı görevlisine rüşvet ver.",
        baseBasariSansi: 40,
        maliyet: 30,
        ipucu: "Pahalı ve riskli ama işe yararsa saraya girersin",
        basariliSonuc: {
          etiket_ekle: ["sarayda"],
          un: 10,
          mesaj: "Altınların konuştu; kapı sessizce aralandı ve seni içeri aldılar.",
          detay: "Artık saray çevresinde tanınan bir yüzsün.",
        },
        basarisizSonuc: {
          para: -30,
          un: -5,
          mesaj: "Rüşvet teklifin görevliyi kızdırdı; parasız ve rezil bir şekilde kapıdan kovuldun.",
          detay: "Bazı kapılar parayla açılmıyor.",
        },
      },
      {
        metin: "Saygınlığınla ve tanıdıklarınla iddia et.",
        baseBasariSansi: 35,
        minUn: 30,
        ipucu: "Ücretsiz ama ününe bağlı, riskli",
        kilitAciklamasi: "Yeterince tanınmıyorsun; önce adını duyurman gerek",
        basariliSonuc: {
          etiket_ekle: ["sarayda"],
          un: 8,
          mesaj: "Adını duyan bir saray görevlisi seni içeri buyur etti.",
          detay: "Şöhretin sana bir kapı daha açtı.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Adını hiç duymadıklarını söylediler; kapıda küçük düştün.",
          detay: "Şöhretin sandığın kadar geniş yayılmamış.",
        },
      },
      {
        metin: "Vazgeç, başka bir gün dene.",
        baseBasariSansi: 100,
        ipucu: "Güvenli",
        basariliSonuc: { mesaj: "Bugün denemekten vazgeçtin.", detay: "Saray bir yere kaçmıyor." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
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
    metin:
      "Beklenmedik bir haberci kapına dayandı: adın ve şöhretin krala kadar ulaşmış. Bizzat saraya davet ediliyorsun.",
    secenekler: [
      {
        metin: "Daveti onurla kabul et.",
        baseBasariSansi: 95,
        ipucu: "Nadir bulunan bir fırsat",
        basariliSonuc: {
          etiket_ekle: ["sarayda"],
          un: 15,
          ahlak: 3,
          mesaj: "Kralın huzuruna çıktın; artık saray çevresinde saygıyla anılan biri oldun.",
          detay: "Bu davet bir ömür boyu anlatılacak bir an.",
        },
        basarisizSonuc: {
          etiket_ekle: ["sarayda"],
          mesaj: "Heyecandan sözlerin biraz karıştı ama yine de saraya kabul edildin.",
          detay: "Mükemmel olmasa da unutulmaz bir gündü.",
        },
      },
      {
        metin: "Naçizane reddet, kendi hayatını sürdür.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama krala hayır demek riskli sayılabilir",
        basariliSonuc: { mesaj: "Daveti nazikçe geri çevirdin; kimse fazla üstelemedi.", detay: "Sıradan hayatını sürdürmeyi seçtin." },
        basarisizSonuc: { un: -10, mesaj: "Reddin sarayda 'küstahlık' diye yorumlandı; adın bir süre kötü anıldı.", detay: "Krala hayır demenin bir bedeli oldu." },
      },
    ],
  },
  {
    id: "saray_ic_entrika",
    kategori: "siyaset",
    gerekliEtiketler: ["sarayda"],
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
        ipucu: "Kazanırsan güçlü bir müttefik, kaybedersen büyük bir düşman edinirsin",
        basariliSonuc: { para: 25, un: 8, ahlak: -12, mesaj: "Plan işe yaradı; soylu sana borçlu kaldı, rakibi gözden düştü.", detay: "Sarayda güç bazen böyle kazanılıyor." },
        basarisizSonuc: { un: -15, ahlak: -8, mesaj: "Entrika ortaya çıktı; senin parmağın olduğu anlaşıldı, itibarın zedelendi.", detay: "Saray entrikaları herkesi yakabiliyor." },
      },
      {
        metin: "Nazikçe reddet, işin dışında kal.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, vicdanın rahat kalır",
        basariliSonuc: { ahlak: 5, mesaj: "Teklifi kibarca geri çevirdin; ellerin temiz kaldı.", detay: "Sarayda herkes entrikaya bulaşmak zorunda değil." },
        basarisizSonuc: { mesaj: "Reddin soylunun hoşuna gitmedi, sana soğuk davranmaya başladı.", detay: "Bazı reddedişlerin bedeli sessizce ödeniyor." },
      },
    ],
  },
  {
    id: "saray_balosu",
    kategori: "sosyal",
    gerekliEtiketler: ["sarayda"],
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
        ipucu: "Riskli ama başarırsan büyük bir izlenim bırakırsın",
        basariliSonuc: { un: 14, dost_puani: 6, mesaj: "Zarafetin ve sohbetin balo salonunda konuşuldu; herkes seninle tanışmak istedi.", detay: "Bir gecede saray çevresinde tanınır oldun." },
        basarisizSonuc: { un: -6, mesaj: "Sakar bir anın herkesin gözü önünde oldu; bir süre bunun şakası yapıldı.", detay: "Sarayda küçük hatalar bile büyük yankı buluyor." },
      },
      {
        metin: "Kenarda dur, dikkat çekme.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, sönük",
        basariliSonuc: { mesaj: "Baloyu kenardan izlemekle yetindin.", detay: "Her gece parlamak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Kenarda kalman fark edildi, 'sıkıcı' diye anıldın.", detay: "Bazen görünmemek de bir bedel ödetiyor." },
      },
      {
        metin: "Yabancı elçilerle kendi dillerinde sohbet et.",
        baseBasariSansi: 90,
        minKultur: 40,
        ipucu: "Kültürün sayesinde açılan özel bir kapı",
        basariliSonuc: {
          un: 20,
          kultur: 10,
          dost_puani: 8,
          mesaj: "Yabancı elçilerle kendi dillerinde, kendi geleneklerine hakim biçimde sohbet ettin; salon şaşkınlıkla seni izledi.",
          detay: "Yıllarca farklı dünyalardan insanlarla kurduğun bağlar, tam da bu gece işine yaradı.",
        },
        basarisizSonuc: {
          un: 10,
          kultur: 5,
          mesaj: "Sohbet beklediğin kadar akıcı gitmedi ama yine de elçiler seni saygıyla dinledi.",
          detay: "Kültürel birikimin her zaman mükemmel sonuç vermese de fark ediliyor.",
        },
      },
    ],
  },
  {
    id: "saray_dedikodu",
    kategori: "sosyal",
    gerekliEtiketler: ["sarayda"],
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
        ipucu: "Kazanç riskli, açığa çıkarsa güçlü düşmanların olur",
        basariliSonuc: { para: 35, ahlak: -10, mesaj: "Bilgi karşılığında güzel bir ödül aldın; kimse senden şüphelenmedi.", detay: "Sarayda sır ticareti hep var olmuş." },
        basarisizSonuc: { un: -12, ahlak: -8, mesaj: "Kaynağın belli oldu; artık sarayda kimse yanında rahat konuşmuyor.", detay: "Güven bir kere kırılınca zor onarılıyor." },
      },
      {
        metin: "Sırrı kimseyle paylaşma, unutmaya çalış.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, vicdan rahat",
        basariliSonuc: { ahlak: 4, mesaj: "Duyduğunu unutmaya karar verdin; kimseye bir şey söylemedin.", detay: "Bazı sırlar taşınmaya değmiyor." },
        basarisizSonuc: { mesaj: "Sırrı sakladın ama merakın seni bir süre rahatsız etti.", detay: "Bilmek bazen bir yüktür." },
      },
    ],
  },
  {
    id: "saray_av_daveti",
    kategori: "sosyal",
    gerekliEtiketler: ["sarayda"],
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
        ipucu: "Başarılı bir av büyük bir itibar getirir",
        basariliSonuc: { un: 12, para: 10, mesaj: "Avda gösterdiğin cesaret kralın dikkatini çekti; ganimetten de payını aldın.", detay: "Kral seni bir daha davet edeceğini söyledi." },
        basarisizSonuc: { saglik: -12, mesaj: "Av sırasında kötü bir kaza geçirdin; herkesin önünde utandın.", detay: "Bazı avlar planlandığı gibi gitmiyor." },
      },
      {
        metin: "Nazikçe mazeret sun, katılma.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama fırsatı kaçırırsın",
        basariliSonuc: { mesaj: "Mazeretini kabul ettiler; sen de güvenli bir gün geçirdin.", detay: "Her davete koşmak zorunda değilsin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Katılmadığın için bazı çevrelerden dışlandığını hissettin.", detay: "Sarayda gıyabında konuşulmak kolay." },
      },
    ],
  },
  {
    id: "saray_suikast_duyumu",
    kategori: "siyaset",
    gerekliEtiketler: ["sarayda"],
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
        ipucu: "Doğruysa büyük bir onur, yanlış çıkarsa itibarın sarsılır",
        basariliSonuc: { un: 20, ahlak: 10, mesaj: "İhbarın doğru çıktı; kralın hayatını kurtaran kişi olarak anıldın.", detay: "Bu, sarayda söyleneceklerin en büyüğü olacak." },
        basarisizSonuc: { un: -10, mesaj: "Duyumun asılsız çıktı; boş yere panik yarattığın için küçük düştün.", detay: "Bazı sesler yanlış anlaşılıyor." },
      },
      {
        metin: "Karışma, sessiz kal.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama vicdan yükü ağır",
        basariliSonuc: { mesaj: "Duyduğunu kimseye söylemedin; olay senin bilgin dışında çözüldü ya da hiç gerçekleşmedi.", detay: "Bazen bilmemek daha rahattır." },
        basarisizSonuc: { ahlak: -10, mesaj: "Komplo gerçekleşti; sessiz kalman içini uzun süre kemirdi.", detay: "Sessizliğin bir bedeli olduğunu şimdi anlıyorsun." },
      },
    ],
  },
  {
    id: "saray_mutfak_kazasi",
    kategori: "sosyal",
    gerekliEtiketler: ["sarayda"],
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
        ipucu: "Zarif bir tepki itibarını artırabilir",
        basariliSonuc: { un: 8, mutluluk: 4, mesaj: "Kendine gülerek durumu şakaya çevirdin; salon senin soğukkanlılığını konuştu.", detay: "Bazen en iyi izlenim, kusursuzluktan değil zarafetten gelir." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Gülümsemen zoraki kaldı, birkaç kişi arkandan fısıldadı.", detay: "Her kaza şakaya dönüşmüyor." },
      },
      {
        metin: "Öfkelen, hizmetkarı azarla.",
        baseBasariSansi: 40,
        ipucu: "Riskli; haklı görünsen de zalim bulunabilirsin",
        basariliSonuc: { un: 3, mesaj: "Öfken haklı bulundu, hizmetkar özür diledi.", detay: "Bazıları haklı olduğunu düşündü." },
        basarisizSonuc: { un: -10, ahlak: -5, mesaj: "Sert tepkin 'zalim' olarak anıldı; birkaç kişi senden uzak durmaya başladı.", detay: "Küçük bir kaza, büyük bir itibar lekesine dönüştü." },
      },
    ],
  },
  {
    id: "evcil_hayvan_altin_kese",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_var"],
    agirlik: 0.6,
    ton: "hafif",
    gorsel: "💰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ağzında Bir Sürpriz",
    metin: "{hayvan} eve her zamankinden farklı bir tavırla girdi; ağzında küçük, şıngırtılı bir kese vardı. İçinde birkaç sikke parlıyor.",
    secenekler: [
      {
        metin: "Keseyi al, sahibini merak etme.",
        baseBasariSansi: 90,
        ipucu: "Küçük ama tereddütsüz bir kazanç",
        basariliSonuc: { para: 12, mesaj: "Keseyi açtın; birkaç sikke düştü avucuna. {hayvan} gururla kuyruğunu (ya da kanatlarını) salladı.", detay: "Nereden bulduğunu asla öğrenemeyeceksin." },
        basarisizSonuc: { mesaj: "Kese boşmuş, sadece birkaç taş çıktı içinden.", detay: "{hayvan} yine de kendinden çok memnun görünüyordu." },
      },
      {
        metin: "Sahibini bulmaya çalış, geri ver.",
        baseBasariSansi: 60,
        ipucu: "Ahlaklı ama zaman alır",
        basariliSonuc: { ahlak: 10, dost_puani: 5, mesaj: "Keseyi kaybeden komşuyu buldun; minnettarlığı uzun sürdü.", detay: "Dürüstlüğün mahallede konuşuldu." },
        basarisizSonuc: { mesaj: "Sahibini bulamadın; keseyi bir hayır kutusuna bıraktın.", detay: "En azından vicdanın rahat." },
      },
    ],
  },
  {
    id: "evcil_hayvan_yeni_tanisiklik",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_var"],
    agirlik: 0.6,
    gorsel: "🌷",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Parkta Bir Karşılaşma",
    metin: "{hayvan} meydanda başka birinin de sevdiği bir hayvana doğru koştu; ikiniz de gülümseyerek özür dileme çabanız bir sohbete dönüştü.",
    secenekler: [
      {
        metin: "Sohbeti uzat, tanışıklığı ilerlet.",
        baseBasariSansi: 85,
        ipucu: "Küçük bir rastlantı, yeni bir tanıdık",
        basariliSonuc: { dost_puani: 8, mutluluk: 5, mesaj: "Uzun bir sohbetin ardından yeni bir tanıdık edindin; {hayvan} bu buluşmanın gizli kahramanıydı.", detay: "Bazen en iyi tanışmalar bir hayvanın araya girmesiyle oluyor." },
        basarisizSonuc: { mesaj: "Kısa bir selamlaşmanın ötesine geçemediniz.", detay: "Yine de güzel bir andı." },
      },
      {
        metin: "Kısa kes, yoluna devam et.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama fırsatı kaçırırsın",
        basariliSonuc: { mesaj: "Nazikçe vedalaşıp yoluna devam ettin.", detay: "Her karşılaşma bir dostluğa dönüşmek zorunda değil." },
        basarisizSonuc: { mutluluk: -1, mesaj: "Sonradan biraz daha kalsaymışım diye düşündün.", detay: "Bazı fırsatlar bir daha gelmiyor." },
      },
    ],
  },
  {
    id: "evcil_hayvan_kopek_ev_tahribati",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Köpek"],
    agirlik: 0.6,
    ton: "hafif",
    gorsel: "🪑",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sandalyenin Sonu",
    metin: "Eve döndüğünde {hayvan}'ı, en sevdiğin sandalyenin bacağını kemirirken buldun; etrafa talaş saçılmış.",
    secenekler: [
      {
        metin: "Sakin kal, yeni bir sandalye yaptır.",
        baseBasariSansi: 90,
        ipucu: "Küçük bir masraf, sinirlerin sağlam kalır",
        basariliSonuc: { para: -6, mesaj: "Yeni bir sandalye yaptırdın; {hayvan} bu sefer masaya dokunmadı bile.", detay: "Bazı alışkanlıklar yavaş yavaş geçiyor." },
        basarisizSonuc: { para: -6, mutluluk: -2, mesaj: "Yeni sandalye de birkaç gün içinde çentiklendi.", detay: "Bazı köpekler kemirmeyi asla bırakmıyor." },
      },
      {
        metin: "Kız, eğitmeye çalış.",
        baseBasariSansi: 45,
        ipucu: "Zor ama kalıcı bir çözüm olabilir",
        basariliSonuc: { mutluluk: 3, mesaj: "Sabırlı eğitimin işe yaradı; {hayvan} artık mobilyalara dokunmuyor.", detay: "Israrın karşılığını aldın." },
        basarisizSonuc: { mutluluk: -3, mesaj: "{hayvan} seni dinlemek yerine kuyruğunu sallayıp oyun sandı.", detay: "Bazı dersler bir kerede öğrenilmiyor." },
      },
    ],
  },
  {
    id: "evcil_hayvan_kedi_komsu_zarari",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Kedi"],
    agirlik: 0.6,
    ton: "hafif",
    gorsel: "🐦",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Komşunun Güvercinleri",
    metin: "Komşun kapına dayandı: {hayvan}, onun özenle beslediği güvercinlerden birini kovalayıp tüylerini yolmuş. Komşu oldukça öfkeli.",
    secenekler: [
      {
        metin: "Özür dile, zararı öde.",
        baseBasariSansi: 85,
        maliyet: 8,
        ipucu: "Ucuz bir barış, komşuluk ilişkin bozulmaz",
        basariliSonuc: { dost_puani: 3, mesaj: "Özrün ve küçük ödemen komşunu yatıştırdı.", detay: "İyi komşuluk bazen birkaç sikkeyle korunuyor." },
        basarisizSonuc: { mesaj: "Özrün kabul edildi ama komşun bir süre soğuk davrandı.", detay: "Bazı kırgınlıklar yavaş geçiyor." },
      },
      {
        metin: "Kedinin doğası bu, savun.",
        baseBasariSansi: 40,
        ipucu: "Riskli; komşunla arana mesafe girebilir",
        basariliSonuc: { mesaj: "Komşun homurdanarak da olsa konuyu kapattı.", detay: "Kediler kimseye hesap vermez, sen de biliyordun." },
        basarisizSonuc: { dost_puani: -8, mesaj: "Komşun bir daha seninle konuşmaz oldu.", detay: "Bazı savunmalar durumu daha da kötüleştiriyor." },
      },
    ],
  },
  {
    id: "evcil_hayvan_kurt_vahsi_icgudu",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Kurt"],
    ton: "agir",
    agirlik: 0.6,
    gorsel: "🐾",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Vahşi İçgüdü",
    metin: "{hayvan}, komşunun küçük bir hayvanına aniden saldırdı; vahşi doğası bir anda geri geldi. Olay büyümeden müdahale etmen gerek.",
    secenekler: [
      {
        metin: "Araya gir, {hayvan}'ı durdur.",
        baseBasariSansi: 50,
        ipucu: "Riskli ama olayı büyümeden kapatabilirsin",
        basariliSonuc: { saglik: -6, mesaj: "Elin biraz zedelendi ama {hayvan}'ı zamanında çektin; kimse ciddi zarar görmedi.", detay: "Vahşi bir hayvanla yaşamanın bedeli bazen budur." },
        basarisizSonuc: { para: -15, un: -8, mesaj: "Olay büyüdü; komşunun kaybını ödemek zorunda kaldın ve mahallede adın 'tehlikeli' anıldı.", detay: "Bazıları seni bu yüzden hâlâ dışlıyor." },
      },
      {
        metin: "Karışma, doğasına bırak.",
        baseBasariSansi: 60,
        ipucu: "Güvenli ama vicdanına dokunabilir",
        basariliSonuc: { ahlak: -5, mesaj: "Olaya karışmadın; {hayvan} kendi kendine sakinleşti.", detay: "Bazen seyirci kalmak da bir seçimdir." },
        basarisizSonuc: { ahlak: -10, un: -5, mesaj: "Müdahale etmediğin için seni suçladılar.", detay: "Sessiz kalmanın da bir bedeli var." },
      },
    ],
  },
  {
    id: "evcil_hayvan_kurt_sürü_ozlemi",
    kategori: "sosyal",
    gerekliEtiketler: ["evcil_hayvan_tur:Kurt"],
    ton: "agir",
    agirlik: 0.5,
    gorsel: "🌙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Uzaktan Bir Uluma",
    metin: "Gece uzaklardan gelen bir kurt ulumasına karşılık {hayvan} da uzun uzun uludu; gözlerinde daha önce görmediğin bir özlem var.",
    secenekler: [
      {
        metin: "Bırak, doğasının çağrısına uysun.",
        baseBasariSansi: 55,
        ipucu: "Onurlu ama onu sonsuza dek kaybedebilirsin",
        basariliSonuc: {
          evcil_hayvan_kaybet: true,
          ahlak: 8,
          mutluluk: -6,
          mesaj: "Ertesi sabah {hayvan} gitmişti; kapıyı açık bırakmıştın, o da sürüsünü seçti.",
          detay: "Onu sevdiğin için gitmesine izin verdin; bu, sahiplenmekten daha zor bir sevgiydi.",
        },
        basarisizSonuc: { mutluluk: -3, mesaj: "Kapıyı açık bıraktın ama {hayvan} sabah yine yanı başındaydı.", detay: "Belki de artık burası onun da yuvası." },
      },
      {
        metin: "Yanına git, onu sakinleştir.",
        baseBasariSansi: 70,
        ipucu: "Bağınızı güçlendirebilir",
        basariliSonuc: { mutluluk: 6, mesaj: "Yanında oturup onu okşadın; {hayvan} yavaşça sakinleşti ve başını omzuna yasladı.", detay: "Bazı bağlar vahşi doğayı bile yener." },
        basarisizSonuc: { mutluluk: -2, mesaj: "{hayvan} bütün gece huzursuz dolaştı, gözüne uyku girmedi.", detay: "Bazı özlemler bir gecede geçmiyor." },
      },
    ],
  },
  {
    id: "oc_hacli_sefer_karari",
    kategori: "din",
    cag: "Orta Çağ",
    bolgeler: ["Fransa", "Kutsal Roma", "Bizans"],
    minYas: 17,
    yasakliEtiketler: ["hacli_karari_verildi"],
    agirlik: 1,
    gorsel: "✝️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kutsal Toprakların Çağrısı",
    metin:
      "Meydanda bir keşiş, kutsal toprakları geri almak için sefere çıkan orduya katılım çağrısı yapıyor. Papazlar günahların bağışlanacağını vaat ediyor; ama herkes bilir ki bu yoldan dönmeyenler çoktur.",
    secenekler: [
      {
        metin: "Haçı al, sefere katıl.",
        baseBasariSansi: 85,
        ipucu: "Hayatını değiştirecek, tehlikeli ve uzun bir yol",
        basariliSonuc: {
          etiket_ekle: ["hacli:katildi", "hacli_karari_verildi"],
          ahlak: 8,
          un: 6,
          mesaj: "Cübbene dikilen kızıl haçla birlikte, geride bıraktığın hayata son bir kez baktın.",
          detay: "Artık bir haçlısın; önündeki yılları bu kararla şekillenecek.",
        },
        basarisizSonuc: {
          etiket_ekle: ["hacli:katildi", "hacli_karari_verildi"],
          saglik: -5,
          mesaj: "Kararsızlığın içini kemirse de sonunda haçı aldın; tereddütle yola çıktın.",
          detay: "Gönülsüz başlayan bu yolculuk sana daha da ağır gelecek.",
        },
      },
      {
        metin: "Reddet, kendi hayatına devam et.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama bazıları seni yargılayabilir",
        basariliSonuc: {
          etiket_ekle: ["hacli:katilmadi", "hacli_karari_verildi"],
          mesaj: "Çağrıyı geri çevirdin; hayatının burada, bu topraklarda olduğuna karar verdin.",
          detay: "Herkes senin gibi düşünmüyor, ama vicdanın rahat.",
        },
        basarisizSonuc: {
          etiket_ekle: ["hacli:katilmadi", "hacli_karari_verildi"],
          un: -5,
          mesaj: "Reddin bazı çevrelerde 'korkaklık' diye yorumlandı.",
          detay: "Yine de kendi seçimine sahip çıkıyorsun.",
        },
      },
    ],
  },
  {
    id: "oc_hacli_kutsal_topraklar_savasi",
    kategori: "savas",
    gerekliEtiketler: ["hacli:katildi"],
    agirlik: 0.8,
    ton: "agir",
    gorsel: "⚔️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Surların Önünde",
    metin: "Ordu, kuşatma altındaki bir kaleye saldırıya geçiyor. Merdivenler surlara dayandı; komutan sana da bir yer gösteriyor.",
    secenekler: [
      {
        metin: "Ön safta savaş, cesaretini göster.",
        baseBasariSansi: 45,
        ipucu: "Büyük ün ya da büyük yara",
        basariliSonuc: { un: 18, saglik: -10, mesaj: "Surlara ilk tırmananlardan biri oldun; adın bütün ordu içinde yayıldı.", detay: "Bu cesaret hikayen yıllarca anlatılacak." },
        basarisizSonuc: { saglik: -25, olum_sansi: 8, mesaj: "Ok yağmuru altında ağır yaralandın; seni geri çektiler.", detay: "Bu kuşatma sana pahalıya mal oldu." },
      },
      {
        metin: "Geride dur, okçuları destekle.",
        baseBasariSansi: 80,
        ipucu: "Daha güvenli, daha az ün",
        basariliSonuc: { un: 5, mesaj: "Görevini sessizce yerine getirdin; kale sonunda düştü.", detay: "Her zafer öne çıkanlarla değil, arkada duranlarla da kazanılıyor." },
        basarisizSonuc: { saglik: -8, mesaj: "Bir taş mancınıktan sıçrayıp seni sıyırdı.", detay: "Geride durmak bile bu savaşta güvenlik vermiyor." },
      },
    ],
  },
  {
    id: "oc_hacli_ganimet_yagma",
    kategori: "din",
    gerekliEtiketler: ["hacli:katildi"],
    agirlik: 0.7,
    gorsel: "🏺",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Düşen Şehrin Ganimeti",
    metin: "Ele geçirilen şehirde ordu yağmaya başladı. Evler, mabetler, tüccar dükkanları kapına kadar açık; kimse seni durdurmuyor.",
    secenekler: [
      {
        metin: "Yağmaya katıl, elinden geleni al.",
        baseBasariSansi: 80,
        ipucu: "Büyük kazanç, ağır bir vicdan yükü",
        basariliSonuc: { para: 45, ahlak: -20, mesaj: "Kollarını dolu dolu doldurdun; ama bazı çığlıklar kulağından hiç gitmeyecek.", detay: "Zengin döndün ama eskisi gibi uyuyamıyorsun." },
        basarisizSonuc: { para: 15, ahlak: -15, mesaj: "Az bir şey kapabildin, üstüne bir de vicdan azabı sardı seni.", detay: "Ne kazandın ne de vicdanını korudun." },
      },
      {
        metin: "Karışma, sadece dua et.",
        baseBasariSansi: 90,
        ipucu: "Vicdan rahat, cepler boş",
        basariliSonuc: { ahlak: 12, mesaj: "Yağmaya katılmadın; çevrende olanlara sadece dua edebildin.", detay: "Bu savaşta bile ellerini temiz tutmayı başardın." },
        basarisizSonuc: { mutluluk: -5, mesaj: "Etrafındaki vahşeti izlemek bile seni derinden sarstı.", detay: "Bazı şeyleri görmek bile bir bedel." },
      },
    ],
  },
  {
    id: "oc_hacli_yolculuk_zorlugu",
    kategori: "saglik",
    gerekliEtiketler: ["hacli:katildi"],
    agirlik: 0.7,
    ton: "agir",
    gorsel: "🏜️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kavurucu Yollarda",
    metin: "Ordu susuz, kavurucu bir araziden geçiyor. Erzak azalıyor, hastalık yayılıyor; her gün biraz daha fazla asker geride kalıyor.",
    secenekler: [
      {
        metin: "Dişini sık, ilerlemeye devam et.",
        baseBasariSansi: 60,
        ipucu: "Bitkinlik riski var ama ordudan geri kalmazsın",
        basariliSonuc: { saglik: -12, un: 5, mesaj: "Bitkin ama azimli bir şekilde yürüdün; komutanlar dayanıklılığını fark etti.", detay: "Bu yolculuk seni hem yıprattı hem sertleştirdi." },
        basarisizSonuc: { saglik: -22, olum_sansi: 6, mesaj: "Susuzluk ve sıcak seni yerle bir etti; günlerce ateşler içinde yattın.", detay: "Bu seferin bedelini bedeninle ödüyorsun." },
      },
      {
        metin: "Geride kalanlara yardım et, yavaş ilerle.",
        baseBasariSansi: 75,
        ipucu: "Daha güvenli ama seni de yavaşlatır",
        basariliSonuc: { ahlak: 10, dost_puani: 6, mesaj: "Düşen yoldaşlarına su taşıdın, sırtladın; bu dayanışma seni ordu içinde sevilir kıldı.", detay: "Zor günlerde gösterdiğin merhamet unutulmadı." },
        basarisizSonuc: { saglik: -10, mesaj: "Yardım ederken sen de hastalığa yakalandın.", detay: "İyilik yapmanın bazen bedeli oluyor." },
      },
    ],
  },
  {
    id: "oc_hacli_geride_kalanlar",
    kategori: "sosyal",
    gerekliEtiketler: ["hacli:katilmadi"],
    agirlik: 0.7,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Geride Kalanların Hayatı",
    metin: "Sefere gidenlerin aileleri, tarlalarını sürecek, işlerini yürütecek kimse kalmadığı için zorlanıyor. Onlara yardım etmek elinde.",
    secenekler: [
      {
        metin: "Komşularının işine yardım et.",
        baseBasariSansi: 90,
        ipucu: "Küçük bir emek, büyük bir minnettarlık",
        basariliSonuc: { ahlak: 10, dost_puani: 8, mesaj: "Sefere gidenlerin tarlalarını sürdün, çocuklarına göz kulak oldun; köy sana minnettar.", detay: "Cephede olmasan da bir şekilde faydalı oldun." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Elinden geleni yaptın ama tek başına yetişemedin.", detay: "İyi niyetin her zaman yeterli olmuyor." },
      },
      {
        metin: "Kendi işine odaklan, karışma.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, bencilce",
        basariliSonuc: { para: 10, mesaj: "Kendi işine odaklandın; herkes kendi derdine düştüğü bu dönemde sen kazandın.", detay: "Vicdanın hafif sızladı ama cebin doldu." },
        basarisizSonuc: { ahlak: -5, mesaj: "Yardım etmediğin görülünce bazı komşuların senden uzaklaştı.", detay: "Bazı seçimlerin bedelini itibarınla ödüyorsun." },
      },
    ],
  },
  {
    id: "oc_hacli_korkak_damgasi",
    kategori: "sosyal",
    gerekliEtiketler: ["hacli:katilmadi"],
    agirlik: 0.6,
    gorsel: "🗣️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Fısıltılar",
    metin: "Sefere katılmayan birkaç kişi 'korkak' diye anılıyor; senin adın da bu fısıltılar arasında geçmeye başladı.",
    secenekler: [
      {
        metin: "Karşı çık, kararının arkasında dur.",
        baseBasariSansi: 55,
        ipucu: "Cesur bir duruş, ama herkesi ikna edemeyebilirsin",
        basariliSonuc: { un: 8, ahlak: 5, mesaj: "Kararının gerekçelerini açıkça anlattın; bazıları seni haklı buldu.", detay: "Sesini yükseltmek bazen susmaktan daha güçlü." },
        basarisizSonuc: { un: -6, mesaj: "Savunman kimseyi ikna etmedi, fısıltılar devam etti.", detay: "Bazı önyargılar sözle kırılmıyor." },
      },
      {
        metin: "Duymazdan gel, zaman geçsin.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, sabır ister",
        basariliSonuc: { mesaj: "Fısıltılara aldırmadın; zamanla başka bir dedikodu gündeme geldi.", detay: "Her fırtına diner." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Aldırmamaya çalışsan da sözler içine işledi.", detay: "Bazı sessizlikler bir bedel ödetiyor." },
      },
    ],
  },
  {
    id: "oc_kervan_katilma_karari",
    kategori: "ticaret",
    cag: "Orta Çağ",
    minYas: 16,
    yasakliEtiketler: ["kervan_karari_verildi"],
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
        ipucu: "Riskli bir yatırım ama uzun vadede kazançlı olabilir",
        basariliSonuc: {
          etiket_ekle: ["kervan:katildi", "kervan_karari_verildi"],
          para: -10,
          mesaj: "Malını denk yaptın, kervana katıldın; önündeki aylar tozlu yollarda geçecek.",
          detay: "Bu yolculuk seni değiştirecek; ya zenginleştirecek ya da çok şey öğretecek.",
        },
        basarisizSonuc: {
          etiket_ekle: ["kervan:katildi", "kervan_karari_verildi"],
          para: -10,
          mesaj: "Hazırlıkların acele oldu ama yine de kervana katıldın.",
          detay: "Yeterince hazırlıklı olmadan çıktığın bu yolun bedelini ödeyeceksin.",
        },
      },
      {
        metin: "Katılma, şehirde kal.",
        baseBasariSansi: 95,
        ipucu: "Güvenli, fırsat kaçar",
        basariliSonuc: {
          etiket_ekle: ["kervan:katilmadi", "kervan_karari_verildi"],
          mesaj: "Şehirde kalmayı tercih ettin; kervan sensiz yola çıktı.",
          detay: "Belki başka bir kervan başka bir gün gelir.",
        },
        basarisizSonuc: {
          etiket_ekle: ["kervan:katilmadi", "kervan_karari_verildi"],
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
    gerekliEtiketler: ["kervan:katildi"],
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
        ipucu: "Kazanırsan malını korursun, kaybedersen yaralanırsın",
        basariliSonuc: { para: 20, un: 6, mesaj: "Kervan direndi ve eşkıyaları püskürttü; payına düşen ganimetle daha da zenginleştin.", detay: "Bu geçit artık senin cesaretinle anılıyor." },
        basarisizSonuc: { para: -30, saglik: -12, mesaj: "Eşkıyalar mallarının çoğunu aldı, sen de yaralı kurtuldun.", detay: "Bu yolculuk sandığından daha pahalıya mal oldu." },
      },
      {
        metin: "Malını bırak, canını kurtar.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama malın gider",
        basariliSonuc: { para: -20, mesaj: "Malının bir kısmını bırakıp geri çekildin; en azından sağ kaldın.", detay: "Bazen kaybetmeyi kabullenmek en akıllıca seçimdir." },
        basarisizSonuc: { para: -35, mutluluk: -3, mesaj: "Geri çekilmene rağmen eşkıyalar neredeyse her şeyini aldı.", detay: "Bazı kayıplar önlenemiyor." },
      },
    ],
  },
  {
    id: "oc_kervan_uzak_diyar_ticareti",
    kategori: "ticaret",
    gerekliEtiketler: ["kervan:katildi"],
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
        ipucu: "Büyük kazanç ya da büyük kayıp",
        basariliSonuc: { para: 40, un: 8, mesaj: "Yaptığın anlaşma inanılmaz kârlı çıktı; şehre döndüğünde herkes bu ticaretini konuşacak.", detay: "Uzak diyarlarla kurduğun bu bağlantı sana yeni kapılar açacak." },
        basarisizSonuc: { para: -15, mesaj: "Yerel tüccarlar seni kandırdı; anlaşma umduğun gibi çıkmadı.", detay: "Yabancı bir pazarda tecrübesizlik pahalıya mal oluyor." },
      },
      {
        metin: "Temkinli davran, küçük işler yap.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, küçük kazanç",
        basariliSonuc: { para: 12, mesaj: "Küçük ama güvenli bir kazançla yetindin.", detay: "Bazen az ama garanti, çoktan iyidir." },
        basarisizSonuc: { mesaj: "Kayda değer bir kazanç elde edemedin ama en azından zarar da etmedin.", detay: "Her yolculuk kâr getirmiyor." },
      },
    ],
  },
  {
    id: "oc_kervan_evde_kalanin_pismanligi",
    kategori: "ticaret",
    gerekliEtiketler: ["kervan:katilmadi"],
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
        ipucu: "İlham verici, gelecekteki fırsatlara hazırlık",
        basariliSonuc: { mutluluk: 3, mesaj: "Anlatılan hikayeler seni bir sonraki fırsata daha istekli kıldı.", detay: "Belki bir dahaki sefere sen de katılırsın." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Kaçırdığın fırsatı düşünmek seni hüzünlendirdi.", detay: "Bazı pişmanlıklar içine işliyor." },
      },
      {
        metin: "Umursama, kendi güvenli hayatından memnun ol.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, huzurlu",
        basariliSonuc: { ahlak: 3, mesaj: "Güvenli hayatının kıymetini bildin; herkes risk almak zorunda değil.", detay: "Huzur da bir tür zenginlik." },
        basarisizSonuc: { mesaj: "Umursamamaya çalışsan da içten içe merak ettin.", detay: "Bazı meraklar hiç geçmiyor." },
      },
    ],
  },
  {
    id: "oc_veba_karsilasma",
    kategori: "saglik",
    cag: "Orta Çağ",
    gerekliUlke: { vebada: true },
    agirlik: 1,
    ton: "agir",
    gorsel: "💀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kapı Komşusu Hasta",
    metin: "Yan komşun vebaya yakalandı; ailesi ondan kaçtı ama biri ona bakmazsa yalnız ölecek. Yardım etmek kendini de risk altına atmak demek.",
    secenekler: [
      {
        metin: "Manastır Kedisi'ni komşunun evine sal.",
        baseBasariSansi: 100,
        gerekliEtiketler: ["esya:veba_koruyucu_kedi"],
        ipucu: "Gizli Eşya: Kedi vebalı fareleri avlar",
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Kara kedi komşunun evine girdi ve vebayı yayan tüm fareleri avladı. Komşun iyileşti ve sana minnettar kaldı.",
          detay: "Uğursuz denilen kedi aslında bir hayat kurtarıcıymış."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı" }
      },
      {
        metin: "Yanına git, ona bak.",
        baseBasariSansi: 40,
        ipucu: "Büyük bir merhamet, büyük bir risk",
        basariliSonuc: { ahlak: 20, un: 8, mesaj: "Komşuna baktın, iyileşmesine yardımcı oldun; mahalle bu cesaretini asla unutmayacak.", detay: "Bazı iyilikler ölüm kalım riskiyle yapılıyor." },
        basarisizSonuc: { saglik: -30, olum_sansi: 12, mesaj: "Komşuna bakarken sen de hastalığa yakalandın; günlerce ateşler içinde yattın.", detay: "Merhametin ağır bir bedeli oldu." },
      },
      {
        metin: "Uzak dur, kendini koru.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama vicdanına dokunur",
        basariliSonuc: { mesaj: "Uzak durdun; komşun yalnız başına mücadele etti.", detay: "Kendini korumak da bir hayatta kalma stratejisi." },
        basarisizSonuc: { ahlak: -10, mutluluk: -5, mesaj: "Komşun yalnız başına can verdi; bu sahne uzun süre aklından çıkmadı.", detay: "Bazı sessizlikler vicdanı ağır yoruyor." },
      },
    ],
  },
  {
    id: "sd_fabrika_grev_karari",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    minYas: 16,
    yasakliEtiketler: ["grev_karari_verildi"],
    agirlik: 1,
    gorsel: "✊",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Fabrika Kapısında Bir Grev",
    metin:
      "Uzun çalışma saatleri ve düşük ücretlere karşı işçiler greve gitmeye karar verdi. Fabrika kapısında toplanan kalabalık senden de bir taraf seçmeni bekliyor.",
    secenekler: [
      {
        metin: "Greve katıl, işçi haklarını savun.",
        baseBasariSansi: 85,
        ipucu: "Dayanışma güçlü ama patronun gözünden düşersin",
        basariliSonuc: {
          etiket_ekle: ["grev:destekledi", "grev_karari_verildi"],
          ahlak: 8,
          dost_puani: 6,
          mesaj: "Diğer işçilerle omuz omuza durdun; kapıda 'Adalet!' diye bağırdın.",
          detay: "Artık işçi hareketinin bir parçasısın; bu seçim önündeki yılları şekillendirecek.",
        },
        basarisizSonuc: {
          etiket_ekle: ["grev:destekledi", "grev_karari_verildi"],
          saglik: -5,
          mesaj: "Greve katıldın ama kalabalığın içinde itilip kakıldın.",
          detay: "Dayanışma hep kolay olmuyor.",
        },
      },
      {
        metin: "Katılma, işine devam et.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama diğer işçilerin gözünde 'ihanet' sayılabilir",
        basariliSonuc: {
          etiket_ekle: ["grev:karsi_cikti", "grev_karari_verildi"],
          mesaj: "Kapıdan geçip tezgahının başına oturdun; iş sana ekmek kapısı, risk almak istemedin.",
          detay: "Bu kararın seni patronun gözünde ayrıcalıklı kılacak.",
        },
        basarisizSonuc: {
          etiket_ekle: ["grev:karsi_cikti", "grev_karari_verildi"],
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
    gerekliEtiketler: ["grev:destekledi"],
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
        ipucu: "Daha güvenli, daha az görünür",
        basariliSonuc: { mesaj: "Geri çekildin; grev senin olmadan da devam etti.", detay: "Her mücadelede ön safta olmak zorunda değilsin." },
        basarisizSonuc: { saglik: -8, mesaj: "Kalabalık dağılırken bir itiş kakışta sen de sıyrık aldın.", detay: "Kargaşa kimseyi tam olarak korumuyor." },
      },
      {
        metin: "Ön safta kal, geri çekilme.",
        baseBasariSansi: 40,
        ipucu: "Cesur ama fiziksel riski yüksek",
        basariliSonuc: { mesaj: "Kullanılmadı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
        onTepki: {
          metin: "Bir anda atlı jandarmalar kalabalığın üzerine sürmeye başladı! Coplar havaya kalktı. En öndesin, geri kaçabilir ya da copları karşılayabilirsin.",
          geriCekilMetni: "Kaç! Canımı sokakta bulmadım.",
          geriCekilSonucu: {
            saglik: -5,
            un: -10,
            ahlak: -10,
            mesaj: "Cop inmeden önce arkanı dönüp kaçtın. Canını kurtardın ama işçilerin gözünde korkaksın.",
            detay: "Bazı kahramanlık hevesleri jandarmayı görene kadardır."
          },
          devamMetni: "Barikatı kur! Asla geri dönmem!",
          devamSonucu: {
            un: 30,
            ahlak: 25,
            saglik: -25,
            olum_sansi: 10,
            etiket_ekle: ["isci_onderi"],
            mesaj: "Coplar ve atların toynakları altında kaldın ama bir saniye bile geri adım atmadın. Tüm işçi sınıfının ölümsüz bir sembolü oldun.",
            detay: "Bedenin parçalandı ama ruhun devleşti."
          }
        }
      },
    ],
  },
  {
    id: "sd_grev_kazanim",
    kategori: "siyaset",
    gerekliEtiketler: ["grev:destekledi"],
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
        ipucu: "Kazanırsan kalıcı bir kazanım, kaybedersen boşa emek",
        basariliSonuc: { maas_carpani: 1.1, un: 10, mesaj: "Patron geri adım attı; ücretler ve çalışma saatleri iyileştirildi. Bu, senin de kalıcı kazancın oldu.", detay: "Direnişin karşılığını aldınız." },
        basarisizSonuc: { mutluluk: -6, mesaj: "Patron hiçbir şey vermedi; haftalarca süren grev sonuçsuz kaldı.", detay: "Her mücade kazanımla bitmiyor." },
      },
      {
        metin: "Uzlaş, orta yolu kabul et.",
        baseBasariSansi: 85,
        ipucu: "Küçük ama garanti bir kazanım",
        basariliSonuc: { para: 15, mesaj: "Küçük bir ücret iyileştirmesiyle anlaştınız; herkes işe geri döndü.", detay: "Tam istediğin değildi ama bir kazanımdı." },
        basarisizSonuc: { mesaj: "Uzlaşma teklifin bile reddedildi; herkes eli boş işe döndü.", detay: "Bazı patronlar hiçbir şeye razı olmuyor." },
      },
    ],
  },
  {
    id: "sd_fabrika_sadik_isci",
    kategori: "ticaret",
    gerekliEtiketler: ["grev:karsi_cikti"],
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
        ipucu: "Kariyer avantajı, işçiler arasında yalnızlaşma riski",
        basariliSonuc: { maas_carpani: 1.12, mesaj: "Küçük bir ustabaşılık teklifi aldın; maaşın kalıcı olarak arttı.", detay: "Ama artık eski iş arkadaşların seninle eskisi gibi konuşmuyor." },
        basarisizSonuc: { para: 10, dost_puani: -5, mesaj: "Küçük bir ikramiye aldın ama diğer işçiler seni fark etti.", detay: "Patronun gözdesi olmanın bir bedeli var." },
      },
      {
        metin: "Nazikçe reddet, sıradan işçi kal.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, işçilerle ilişkin bozulmaz",
        basariliSonuc: { dost_puani: 5, mesaj: "Teklifi kibarca geri çevirdin; iş arkadaşların bunu takdir etti.", detay: "Bazı fırsatlar kabul etmeye değmiyor." },
        basarisizSonuc: { mesaj: "Reddin patronu şaşırttı ama teklifi tekrar etmedi.", detay: "Bazı kapılar bir kez açılıyor." },
      },
    ],
  },
  {
    id: "sd_fabrika_disliyanlar",
    kategori: "sosyal",
    gerekliEtiketler: ["grev:karsi_cikti"],
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
        ipucu: "Riskli ama ilişkileri onarabilir",
        basariliSonuc: { dost_puani: 10, mesaj: "İçtenlikle konuştun; bazıları anlayışla karşıladı, buzlar biraz eridi.", detay: "Dürüstlük bazen en iyi köprüdür." },
        basarisizSonuc: { dost_puani: -8, mesaj: "Konuşman gerginliği daha da artırdı.", detay: "Bazı kırgınlıklar kelimelerle onarılmıyor." },
      },
      {
        metin: "Aldırma, kendi başına yemeğini ye.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama yalnızlaştırıcı",
        basariliSonuc: { mesaj: "Yalnız yemek yemeye alıştın; zamanla bu sana normal geldi.", detay: "Bazı bedeller sessizce ödeniyor." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Yalnızlık gitgide daha çok canını sıkıyor.", detay: "İnsan uzun süre yalnız kalmaya dayanamıyor." },
      },
    ],
  },
  {
    id: "sd_somurge_gitme_karari",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    minYas: 18,
    yasakliEtiketler: ["somurge_karari_verildi"],
    agirlik: 0.9,
    gorsel: "🚢",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Denizaşırı Bir Fırsat",
    metin: "Bir şirket, sömürgelerde çalışacak gönüllüler arıyor; vaat edilen kazanç yüksek ama koşulların ne kadar acımasız olduğuna dair söylentiler de var.",
    secenekler: [
      {
        metin: "Gemiye bin, denizaşırı topraklara git.",
        baseBasariSansi: 75,
        ipucu: "Yüksek risk, yüksek potansiyel kazanç",
        basariliSonuc: {
          etiket_ekle: ["somurge:gitti", "somurge_karari_verildi"],
          para: -10,
          mesaj: "Eşyalarını topladın, limandan gemiye bindin; ülkeni geride bıraktın.",
          detay: "Önünde ne olduğunu bilmiyorsun, ama artık geri dönüş yok.",
        },
        basarisizSonuc: {
          etiket_ekle: ["somurge:gitti", "somurge_karari_verildi"],
          para: -10,
          saglik: -5,
          mesaj: "Yolculuk fırtınalı ve zorlu geçti; daha varmadan yıprandın.",
          detay: "Bu serüven başlamadan sana ağır geldi.",
        },
      },
      {
        metin: "Kalmayı seç, kendi ülkende hayatını kur.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, fırsat kaçar",
        basariliSonuc: {
          etiket_ekle: ["somurge:gitmedi", "somurge_karari_verildi"],
          mesaj: "Teklifi geri çevirdin; kendi topraklarında kalmayı tercih ettin.",
          detay: "Bilinmeyen bir hayata atılmak herkese göre değil.",
        },
        basarisizSonuc: {
          etiket_ekle: ["somurge:gitmedi", "somurge_karari_verildi"],
          mutluluk: -2,
          mesaj: "Gemi limandan ayrılırken içinde hafif bir pişmanlık hissettin.",
          detay: "Bazı kararlar insanı uzun süre düşündürüyor.",
        },
      },
    ],
  },
  {
    id: "sd_somurge_ahlaki_ikilem",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    gerekliEtiketler: ["somurge:gitti"],
    agirlik: 0.7,
    ton: "agir",
    gorsel: "⚖️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Verilen Emir",
    metin: "Yerli işçilere karşı acımasız bir uygulamayı emrettiler; itiraz edersen işini kaybedebilirsin, uygularsan zenginleşeceksin ama vicdanın seni rahat bırakmayacak.",
    secenekler: [
      {
        metin: "Emri uygula, kazancını düşün.",
        baseBasariSansi: 85,
        ipucu: "Büyük kazanç, ağır vicdan yükü",
        basariliSonuc: { para: 50, ahlak: -25, mesaj: "Emri uyguladın; şirket seni ödüllendirdi ama içindeki bir şey sonsuza dek değişti.", detay: "Zenginleştin ama artık aynaya bakmak zorlaşıyor." },
        basarisizSonuc: { para: 20, ahlak: -20, mesaj: "Emri uyguladın ama işler planlandığı gibi gitmedi, yine de vicdanın kirlendi.", detay: "Ne tam kazandın ne de vicdanını korudun." },
      },
      {
        metin: "İtiraz et, emri reddet.",
        baseBasariSansi: 45,
        ipucu: "Vicdanın rahat kalır ama işini kaybedebilirsin",
        basariliSonuc: { ahlak: 20, un: 8, mesaj: "İtirazın duyuldu; bazı yöneticiler seni takdir etti, işini korudun.", detay: "Vicdanının sesini dinlemek bazen işe de yarıyor." },
        basarisizSonuc: { para: -25, ahlak: 15, mesaj: "İşinden kovuldun ama vicdanın tertemiz kaldı.", detay: "Doğru olanı yapmanın bir bedeli oldu, ama pişman değilsin." },
      },
    ],
  },
  {
    id: "sd_somurge_tropik_hastalik",
    kategori: "saglik",
    cag: "Sanayi Devrimi",
    gerekliEtiketler: ["somurge:gitti"],
    agirlik: 0.6,
    ton: "agir",
    gorsel: "🦟",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Bilinmeyen Bir Ateş",
    metin: "Alışık olmadığın bir hastalık seni yatağa düşürdü; yerel bir şifacı tuhaf bir bitki karışımı öneriyor, ama sömürge doktoru da elinden geleni yapmak istiyor.",
    secenekler: [
      {
        metin: "Yerel şifacıya güven.",
        baseBasariSansi: 55,
        ipucu: "Bilinmeyen ama bazen sömürge tıbbından etkili",
        basariliSonuc: { saglik: 15, mesaj: "Yerel bilgi işe yaradı; birkaç gün içinde ayağa kalktın.", detay: "Bu topraklar kendi bilgeliğini de barındırıyormuş." },
        basarisizSonuc: { saglik: -20, olum_sansi: 8, mesaj: "Karışım işe yaramadı, durumun ağırlaştı.", detay: "Her çare her hastaya uymuyor." },
      },
      {
        metin: "Sömürge doktoruna git.",
        baseBasariSansi: 65,
        ipucu: "Daha tanıdık ama sınırlı imkanlar",
        basariliSonuc: { saglik: 10, para: -8, mesaj: "Doktorun tedavisi yavaş ama etkili oldu; iyileştin.", detay: "Tanıdık yöntemler bazen güven veriyor." },
        basarisizSonuc: { saglik: -15, para: -8, mesaj: "Doktorun imkanları burada yetersiz kaldı.", detay: "Bu topraklarda hastalanmak büyük risk." },
      },
    ],
  },
  {
    id: "sd_somurge_evde_kalanlar",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    gerekliEtiketler: ["somurge:gitmedi"],
    agirlik: 0.5,
    gorsel: "✉️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Denizaşırı Mektuplar",
    metin: "Sömürgelere gidenlerden gelen mektuplar bazen zenginlik, bazen acı hikayeler anlatıyor. Sen kendi hayatını kurmaya devam ediyorsun.",
    secenekler: [
      {
        metin: "Kendi işini büyütmeye odaklan.",
        baseBasariSansi: 85,
        ipucu: "İstikrarlı, sabırlı bir yol",
        basariliSonuc: { para: 12, mesaj: "Sabırla kendi işini büyüttün; risksiz de olsa kazancın istikrarlı.", detay: "Herkes okyanus aşmak zorunda değil." },
        basarisizSonuc: { mesaj: "İşler beklediğin gibi gitmedi ama en azından güvendesin.", detay: "İstikrar da bir çeşit kazançtır." },
      },
      {
        metin: "Mektupları okuyup hayal kur.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, hüzünlü bir tatmin",
        basariliSonuc: { mutluluk: 2, mesaj: "Uzak diyarların hikayelerini okumak sana küçük bir kaçış oldu.", detay: "Bazen hayal etmek bile yetiyor." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Mektuplar seni kaçırdığın fırsatı daha çok düşündürdü.", detay: "Bazı meraklar hiç geçmiyor." },
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
        ipucu: "Çok riskli ama tutarsa büyük kazanç getirir",
        basariliSonuc: { para: 80, un: 10, mesaj: "Makine gerçekten çalıştı; fabrikalar sipariş vermeye başladı, yatırımın kat kat geri döndü.", detay: "Bu buluşun bir parçası olmak seni tarihe geçirdi." },
        basarisizSonuc: { para: -30, mesaj: "Makine bir türlü düzgün çalışmadı; mucit projeyi terk etti.", detay: "Her icat başarıya ulaşmıyor." },
      },
      {
        metin: "Riske girme, parana sahip çık.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, fırsat kaçar",
        basariliSonuc: { mesaj: "Teklifi geri çevirdin; parana dokunmadın.", detay: "Bazı fırsatlara güvenmemek daha akıllıca." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Makine gerçekten çalışınca içinde hafif bir pişmanlık hissettin.", detay: "Keşke risk alsaydım diye düşünüp durdun." },
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
        ipucu: "Küçük bir buluş, orta düzey risk",
        basariliSonuc: { para: 15, un: 6, mesaj: "Düzeneğin işe yaradı; adın 'akıllı biri' olarak anılmaya başladı.", detay: "Küçük fikirler bazen büyük fark yaratıyor." },
        basarisizSonuc: { un: -3, mesaj: "Fikrin 'saçma' bulundu, biraz alay konusu oldun.", detay: "Her fikir takdir görmüyor." },
      },
      {
        metin: "Kendine sakla, sadece kendi işinde kullan.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, küçük kişisel fayda",
        basariliSonuc: { mutluluk: 3, mesaj: "Düzenek kendi işini kolaylaştırdı; kimseyle paylaşmadın ama işin rahatladı.", detay: "Bazı fikirler sadece kendine ait kalabilir." },
        basarisizSonuc: { mesaj: "Düzenek pek işe yaramadı, denemekten vazgeçtin.", detay: "Her fikir mükemmel çalışmıyor." },
      },
    ],
  },
  {
    id: "orgut_cocuk_katilimi",
    kategori: "siyaset",
    minYas: 35,
    gerekliEtiketler: ["orgut_secildi", "cocuk_var"],
    agirlik: 0.8,
    ton: "agir",
    gorsel: "🌑",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Karanlık Miras",
    metin:
      "Üyesi olduğun gizli örgütün liderleri seninle gizlice buluştu. Kendi evladını yıllardır izlediklerini ve onu da örgüte katmak istediklerini söylüyorlar. Bu, çocuğunun hayatını sonsuza dek karanlığa gömebilir.",
    secenekler: [
      {
        metin: "Evladımı da aranıza alın. Mirasım devam etsin.",
        baseBasariSansi: 85,
        ipucu: "Büyük güç ve prestij, ama evladını karanlığa itersin",
        basariliSonuc: {
          un: 25,
          para: 40,
          ahlak: -35,
          mutluluk: -15,
          mesaj: "Çocuğun yeminini etti ve gölgelere karıştı. Örgüt içinde ailenin yeri efsaneleşti.",
          detay: "Çok güçlüsünüz. Ama artık akşam yemeklerinde çocuğunun gözlerindeki o masumiyetin öldüğünü görüyorsun."
        },
        basarisizSonuc: {
          ahlak: -20,
          mutluluk: -25,
          mesaj: "Evladın ritüel sırasında korkup kaçmaya çalıştı. Örgüt onu cezalandırdı.",
          detay: "Hem çocuğunun kalbini kırdın hem de örgüt seni beceriksiz bir ebeveyn olarak mimledi."
        }
      },
      {
        metin: "Asla! Çocuğum bu kirli işlere bulaşmayacak.",
        baseBasariSansi: 50,
        ipucu: "Cesur bir ebeveynlik ama örgütü karşına alırsın",
        basariliSonuc: {
          ahlak: 40,
          mutluluk: 20,
          un: -15,
          etiket_sil: ["orgut_secildi"],
          mesaj: "Silahını çektin ve liderlere meydan okudun. Seni örgütten aforoz ettiler ama evladını kurtardın.",
          detay: "Artık sıradan ve tehlikede bir insansın ama ebeveynliğinle gurur duyuyorsun."
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Reddettiğin an saldırıya uğradın! Ağır yaralanıp evladınla birlikte şehirden zar zor kaçtınız.",
          detay: "Her şeyini geride bıraktın. Sefalet içindesiniz ama berabersiniz."
        }
      }
    ]
  },
  {
    id: "komik_kecinin_donusu",
    kategori: "sosyal",
    gerekliEtiketler: ["unvan:Keçi Fatihi"],
    agirlik: 0.9,
    ton: "hafif",
    gorsel: "🐐",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Şeytanın Dönüşü",
    metin:
      "Yıllar önce pazar yerinde destansı bir şekilde yakaladığın o 'Şeytani Keçi' kasabaya geri döndü. Kin dolu gözlerle doğrudan sana bakıyor ve toynaklarını yere vuruyor. Bir rövanş istiyor!",
    secenekler: [
      {
        metin: "Meydan okumayı kabul et! Onu bir kez daha indireceğim.",
        baseBasariSansi: 50,
        ipucu: "Destansı bir komedi zaferi ya da utanç verici bir sakatlık",
        basariliSonuc: {
          un: 30,
          mutluluk: 25,
          unvan_kazan: "Efsanevi Keçi Fatihi",
          mesaj: "Toz bulutu kalktığında keçi pes etmiş halde ayaklarının dibindeydi! Kalabalık seni çılgınca alkışlıyor.",
          detay: "Tarih kitapları seni bu saçma ama muazzam zaferinle yazacak."
        },
        basarisizSonuc: {
          un: -15,
          saglik: -10,
          mutluluk: -15,
          mesaj: "Keçi yıllar içinde yeni dövüş sanatları öğrenmiş! Seni boynuzlayıp çamurun içine fırlattı ve zaferle meledi.",
          detay: "Unvanını kaybettin. Yeni kral o."
        }
      },
      {
        metin: "Kaç! Bu keçi artık eskisi gibi değil!",
        baseBasariSansi: 90,
        basariliSonuc: {
          un: -20,
          mutluluk: -5,
          mesaj: "Arkanı dönüp çığlık çığlığa dükkanına kaçtın ve kapıyı kilitledin.",
          detay: "Fatih unvanın çizildi ama en azından kemiklerin sağlam."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı" }
      }
    ]
  },
  {
    id: "gizem_koleksiyoncu_ejderha",
    kategori: "ticaret",
    gerekliEtiketler: ["envanter:ejderha_tilsimi"],
    agirlik: 1.0,
    gorsel: "🩸",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Koleksiyoncunun Ziyareti",
    metin:
      "Gecenin bir yarısı kapın sertçe çalındı. Dışarıda, yüzü tamamen gümüş bir maskeyle kapalı bir adam duruyor. Boynundaki Ejderha Tılsımı'nı hissetmiş. 'Onu bana sat, karşılığında sana bir ömür yetecek altın vereyim' diyor. Sesi çürümüş toprak gibi kokuyor.",
    secenekler: [
      {
        metin: "Tılsımı ver ve altınları al.",
        baseBasariSansi: 100,
        ipucu: "Ciddi bir servet, ancak efsanevi korumayı kaybedersin",
        basariliSonuc: {
          para: 80,
          ahlak: -10,
          etiket_sil: ["envanter:ejderha_tilsimi"],
          mesaj: "Tılsımı boynundan çıkardığın an adamın eline bıraktın. Karşılığında sana ağır bir altın kesesi verdi ve sise karıştı.",
          detay: "Cebin epey doldu ama o kadim sıcaklık göğsünden gitti. Artık sıradan ve savunmasızsın."
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." }
      },
      {
        metin: "Tılsım benimdir! Kılıcını çek ve maskeli adama saldır.",
        baseBasariSansi: 40,
        ipucu: "Sadece en şanslıların hayatta kalabileceği bir düello",
        basariliSonuc: {
          un: 35,
          saglik: -10,
          mesaj: "Tılsım kılıcına güç verdi! Maskeli adama vurduğun an adam kara bir dumana dönüşerek yok oldu. Sadece maskesi geriye kaldı.",
          detay: "Şeytani bir varlığı yendin. Tılsımın ne kadar güçlü olduğunu şimdi gerçekten anladın."
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 25,
          etiket_sil: ["envanter:ejderha_tilsimi"],
          mesaj: "Adam sadece elini kaldırdı ve seni duvara fırlattı. Bilincini kaybederken tılsımı boynundan söküp aldığını hissettin.",
          detay: "Zar zor hayatta kaldın. Tılsım gitti, bedenin kırık dökük."
        }
      }
    ]
  },
  // ============================================================
  // OYUN SONU ZİRVE VE İNTİKAM OLAYLARI (Sadece Özel Etiketlerle Açılır)
  // ============================================================
];