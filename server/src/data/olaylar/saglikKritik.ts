import type { OlayTanimi } from "./types";

/**
 * SAĞLIK KRİTİK EŞİKLERİ (2026-09 sonu, kullanıcı isteği).
 *
 * `saglikToparlanma.ts`'teki 8 olay normal ağırlıklı havuzda `maxSaglik:45`
 * ile rekabet eder — sağlık dibe vurduğunda öne çıkarlar ama garantili
 * değildirler, aynı ömürde defalarca (ya da hiç) çıkabilirler. Bu dosyadaki
 * iki havuz FARKLI bir mekanik: her biri bir hayatta YALNIZCA BİR KEZ,
 * karakterin sağlığı İLK KEZ ilgili eşiğin altına indiği anda `senaryoUret`
 * kaskadı tarafından ZORLA tetiklenir (bkz. gameEngine.ts, `saglik_esik_25_
 * gorundu`/`saglik_esik_10_gorundu` etiketleri) — normal rastgele havuzdan
 * tamamen dışlanırlar (`saglikEsikOlayi`, olaySecici.ts uygunMu).
 *
 * - `OLAY_SAGLIK_ESIK_25` (15 olay): sağlık ilk kez 25'in altına indiğinde —
 *   "sağlık krizi" tonunda, ölüm riski YOK, yalnız sağlık/mutluluk/para etkisi.
 * - `OLAY_SAGLIK_ESIK_10` (15 olay): sağlık ilk kez 10'un altına indiğinde —
 *   "ölüme ramak kaldı" tonunda, gerçek (küçük) bir `olum_sansi` taşır ve
 *   `efektifOlumSansi` zaten çok düşük sağlıkta bunu belirgin büyütür (§13).
 *
 * Her olayda iki seçenek: biri parayla/tedaviyle güvenli-orta bir toparlanma
 * sunar, diğeri bedava ama riskli olup BAŞARIRSA daha fazla sağlık verir,
 * BAŞARISIZ olursa daha da kötüleştirir (ve 10-eşiğinde ek ölüm riski taşır).
 * Başarılı sağlık kazancı hiçbir dalda 14'ü geçmez. Kaskad her eşikten
 * havuzun 15 olayından rastgele birini seçtiği için aynı ömürde iki farklı
 * eşik iki farklı havuzdan gelir; farklı ömürlerde aynı eşik farklı bir
 * olaya denk gelebilir.
 */

export const OLAY_SAGLIK_ESIK_25: OlayTanimi[] = [
  {
    id: "sk25_yuksek_ates",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🤒",
    baslik: "Yüksek Ateş",
    metin:
      "Günlerdir süren bitkinlik nihayet seni yatağa düşürdü — vücudun yanıyor, terliyorsun, kalkacak halin yok. Bu hiç iyiye işaret değil.",
    secenekler: [
      {
        metin: "Hekim çağırt, ilaç aldır.",
        baseBasariSansi: 85,
        maliyet: 7,
        kilitAciklamasi: "Hekimin ücretini karşılayacak paran yok.",
        basariliSonuc: {
          para: -7,
          saglik: 11,
          mutluluk: 2,
          mesaj: "Hekimin verdiği karışım ateşini düşürdü. Birkaç gün içinde ayaktasın.",
        },
        basarisizSonuc: {
          para: -7,
          saglik: 5,
          mesaj: "Tedavi beklediğin kadar hızlı işlemedi ama en kötüsünü atlattın.",
        },
      },
      {
        metin: "Soğuk kompresle kendin idare et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 13,
          mutluluk: -1,
          mesaj: "Uzun, terli bir gecenin ardından ateşin düştü. Ucuz atlattın.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -4,
          mesaj: "Ateş düşmedi, sayıklamaya başladın. Durumun daha da kötüleşti.",
        },
      },
    ],
  },
  {
    id: "sk25_bozuk_yemek",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🤢",
    baslik: "Bozulmuş Yemek",
    metin:
      "Yediğin bir şey içine oturdu — mide bulantısı, kramplar, art arda kusmalar. Bünyen zaten zayıfken bu seni iyice yıprattı.",
    secenekler: [
      {
        metin: "Hekimden ilaç al.",
        baseBasariSansi: 82,
        maliyet: 5,
        kilitAciklamasi: "İlacın parası bile yok.",
        basariliSonuc: {
          para: -5,
          saglik: 10,
          mesaj: "İlaç midendeki yangını dindirdi; kısa sürede toparlandın.",
        },
        basarisizSonuc: {
          para: -5,
          saglik: 4,
          mesaj: "İlaç tam işe yaramadı ama en azından kötüye gitmedi.",
        },
      },
      {
        metin: "Kendi kendine geçmesini bekle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          saglik: 12,
          mesaj: "Birkaç günlük açlık ve bol su işe yaradı; bünyen kendini temizledi.",
        },
        basarisizSonuc: {
          saglik: -7,
          mutluluk: -3,
          mesaj: "Zehirlenme ilerledi, günlerce yataktan kalkamadın.",
        },
      },
    ],
  },
  {
    id: "sk25_iltihapli_yara",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🩹",
    baslik: "İltihaplanan Yara",
    metin:
      "Geçen aylardan kalma bir yara iyileşmek yerine kızarıp şişti; dokunduğunda zonkluyor. Böyle bırakırsan işler kötüye gidebilir.",
    secenekler: [
      {
        metin: "Yarayı hekime temizlet.",
        baseBasariSansi: 86,
        maliyet: 9,
        kilitAciklamasi: "Hekimin ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -9,
          saglik: 12,
          mutluluk: 3,
          mesaj: "Hekim yarayı temizleyip sardı; iltihap birkaç gün içinde çekildi.",
        },
        basarisizSonuc: {
          para: -9,
          saglik: 5,
          mesaj: "Tedavi tam istediğin gibi sonuç vermedi ama daha kötüye gitmedi.",
        },
      },
      {
        metin: "Kendin sıkıp temizlemeyi dene.",
        baseBasariSansi: 42,
        basariliSonuc: {
          saglik: 14,
          mutluluk: -2,
          mesaj: "Acı vericiydi ama işe yaradı — iltihap boşaldı, yara kapanmaya başladı.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -5,
          mesaj: "Yarayı daha da bozdun; iltihap yayıldı, bacağın/kolun günlerce zonkladı.",
        },
      },
    ],
  },
  {
    id: "sk25_gogus_enfeksiyonu",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "😷",
    baslik: "Göğsüne Oturan Öksürük",
    metin:
      "Öksürük göğsüne yerleşti, nefes alırken ıslık sesi çıkarıyorsun. Sabahları kalkmak eskisinden çok daha zor.",
    secenekler: [
      {
        metin: "İlaç al, birkaç gün dinlen.",
        baseBasariSansi: 84,
        maliyet: 8,
        kilitAciklamasi: "İlacın parasını karşılayamıyorsun.",
        basariliSonuc: {
          para: -8,
          saglik: 11,
          mutluluk: 2,
          mesaj: "İlaç ve dinlenme göğsündeki ıslığı kesti; nefesin açıldı.",
        },
        basarisizSonuc: {
          para: -8,
          saglik: 5,
          mesaj: "Öksürük tam geçmedi ama nefes alman kolaylaştı.",
        },
      },
      {
        metin: "Sıcak buhar/tütsü kürüne gir.",
        baseBasariSansi: 50,
        basariliSonuc: {
          saglik: 13,
          mutluluk: -1,
          mesaj: "Buhar göğsündekini gevşetti; saatler içinde rahat nefes almaya başladın.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -4,
          mesaj: "Buhar işe yaramadı, öksürük daha da derinleşti.",
        },
      },
    ],
  },
  {
    id: "sk25_bitkinlikten_cokme",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "😵",
    baslik: "Bedenin Çöktü",
    metin:
      "Aylardır dinlenmeden çalıştın; bugün ayakta duramayacak kadar bitkin düştün. Bedeni bu kadar zorlamanın bir bedeli var.",
    secenekler: [
      {
        metin: "Her şeyi bırak, birkaç gün dinlen.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 9,
          mutluluk: 3,
          un: -2,
          mesaj: "İşleri askıya alıp dinlendin. Birkaç kişi yokluğunu konuştu ama ayaktasın.",
        },
        basarisizSonuc: {
          saglik: 3,
          mesaj: "Dinlenmeye çalıştın ama zihnin bir türlü rahatlamadı.",
        },
      },
      {
        metin: "Uyarıcı bir kaynatmayla ayakta durmaya çalış.",
        baseBasariSansi: 45,
        maliyet: 4,
        kilitAciklamasi: "Kaynatmanın malzemesine bile paran yok.",
        basariliSonuc: {
          para: -4,
          saglik: 13,
          mesaj: "Beklenmedik biçimde işe yaradı; bedenin toparlandı, hiç iş kaybetmedin.",
        },
        basarisizSonuc: {
          para: -4,
          saglik: -8,
          mutluluk: -3,
          mesaj: "Kaynatma bedenini daha da zorladı; çöküşün derinleşti.",
        },
      },
    ],
  },
  {
    id: "sk25_kan_kaybi",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🩸",
    baslik: "Yaralanma ve Kan Kaybı",
    metin:
      "Küçük bir kaza sandığın yara, dursun dursun kanamayı bırakmıyor. Baş dönmesi başladı bile.",
    secenekler: [
      {
        metin: "Hekime koş, dikiş attır.",
        baseBasariSansi: 87,
        maliyet: 10,
        kilitAciklamasi: "Dikiş ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -10,
          saglik: 12,
          mesaj: "Hekim yarayı dikti, kanama durdu. Birkaç gün içinde kendine geldin.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: 6,
          mesaj: "Dikiş tuttu ama kan kaybının etkisi bir süre daha sürdü.",
        },
      },
      {
        metin: "Kendin sıkıca sar, bekle.",
        baseBasariSansi: 46,
        basariliSonuc: {
          saglik: 13,
          mutluluk: -1,
          mesaj: "Sargı tuttu, kanama kendiliğinden durdu. Şanslıydın.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -5,
          mesaj: "Sargı gevşedi, kan kaybın arttı. Günlerce halsiz kaldın.",
        },
      },
    ],
  },
  {
    id: "sk25_kirik_kaburga",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🦴",
    baslik: "Düşme ve Kırık",
    metin:
      "Kötü bir düşüş sonrası göğsünde/kolunda korkunç bir ağrı var — muhtemelen bir şey kırıldı. Nefes almak bile acı veriyor.",
    secenekler: [
      {
        metin: "Hekime görün, doğru sardır.",
        baseBasariSansi: 85,
        maliyet: 9,
        kilitAciklamasi: "Hekimin ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -9,
          saglik: 11,
          mutluluk: 2,
          mesaj: "Hekim kırığı doğru şekilde sardı; ağrın belirgin şekilde azaldı.",
        },
        basarisizSonuc: {
          para: -9,
          saglik: 5,
          mesaj: "Sargı tam oturmadı ama en azından kötüleşmedi.",
        },
      },
      {
        metin: "Kendin sar, dişini sıkıp işine devam et.",
        baseBasariSansi: 42,
        basariliSonuc: {
          para: 2,
          saglik: 13,
          mutluluk: -2,
          mesaj: "İnadına şükür, kırık kendiliğinden düzgün kaynadı. Üstelik işini de aksatmadın.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -5,
          mesaj: "Kırık yanlış kaynadı; ağrı ve zayıflık daha da arttı.",
        },
      },
    ],
  },
  {
    id: "sk25_karin_agrisi",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🫃",
    baslik: "Karnını Delen Ağrı",
    metin:
      "Karnının bir tarafında saplanan, gittikçe artan bir ağrı var. Bu sıradan bir hazımsızlığa benzemiyor.",
    secenekler: [
      {
        metin: "Hekime görün, tedavi ücretini öde.",
        baseBasariSansi: 88,
        maliyet: 12,
        kilitAciklamasi: "Tedavi ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -12,
          saglik: 13,
          mutluluk: 3,
          mesaj: "Hekimin doğru teşhisi ve tedavisi ağrını dindirdi. Rahat bir nefes aldın.",
        },
        basarisizSonuc: {
          para: -12,
          saglik: 6,
          mesaj: "Tedavi tam işe yaramadı ama ağrı biraz hafifledi.",
        },
      },
      {
        metin: "Ağrı kesici otlarla bekle-gör.",
        baseBasariSansi: 44,
        basariliSonuc: {
          saglik: 10,
          mesaj: "Otlar işe yaradı, ağrı yavaş yavaş geçti. Paranı da harcamadın.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -4,
          mesaj: "Ağrı dinmek yerine yayıldı; günlerce iki büklüm dolaştın.",
        },
      },
    ],
  },
  {
    id: "sk25_zehirli_sokma",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🐍",
    baslik: "Zehirli Bir Isırık",
    metin:
      "Bir böcek ya da yılan seni ısırdı; ısırık yeri şişip morardı, tüm kolun/bacağın uyuşmaya başladı.",
    secenekler: [
      {
        metin: "Hekimden panzehir al.",
        baseBasariSansi: 83,
        maliyet: 11,
        kilitAciklamasi: "Panzehrin parasını karşılayamıyorsun.",
        basariliSonuc: {
          para: -11,
          saglik: 12,
          mutluluk: 2,
          mesaj: "Panzehir zehri etkisiz hale getirdi. Şişlik günler içinde indi.",
        },
        basarisizSonuc: {
          para: -11,
          saglik: 5,
          mesaj: "Panzehir tam işe yaramadı ama zehrin yayılmasını yavaşlattı.",
        },
      },
      {
        metin: "Halk usulü, yarayı kendin tedavi et.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 14,
          mutluluk: -2,
          mesaj: "Riskli bir yöntemdi ama işe yaradı; zehir vücudundan atıldı.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -5,
          mesaj: "Yöntem işe yaramadı, zehir daha da yayıldı. Günlerce yatalak kaldın.",
        },
      },
    ],
  },
  {
    id: "sk25_salgin_humma",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🥵",
    baslik: "Salgın Humma",
    metin:
      "Mahallede dolaşan bir humma sonunda sana da bulaştı — titreme, terleme, iştahsızlık. Yatağından kalkacak halin yok.",
    secenekler: [
      {
        metin: "Karantinaya çekil, tedavi al.",
        baseBasariSansi: 82,
        maliyet: 8,
        kilitAciklamasi: "Tedavi masrafını karşılayamıyorsun.",
        basariliSonuc: {
          para: -8,
          saglik: 11,
          un: -2,
          mesaj: "Kendini eve kapatıp tedavi oldun; hastalık başkasına da bulaşmadı, sen de iyileştin.",
        },
        basarisizSonuc: {
          para: -8,
          saglik: 4,
          mesaj: "Tedavi yavaş işledi ama en azından işler kötüleşmedi.",
        },
      },
      {
        metin: "İş başında kal, hastalığı görmezden gel.",
        baseBasariSansi: 48,
        basariliSonuc: {
          para: 3,
          saglik: 8,
          mesaj: "Şansına, bünyen kendi kendine hummayı yendi; üstelik işini de kaybetmedin.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -4,
          mesaj: "Hummayı görmezden gelmek işe yaramadı; iyice yataklara düştün.",
        },
      },
    ],
  },
  {
    id: "sk25_donma_tehlikesi",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🥶",
    baslik: "Soğukta Donma Tehlikesi",
    metin:
      "Sert bir kış fırtınasında yolda kaldın; parmakların hissizleşti, dişlerin takırdıyor. Isınmazsan işler kötüye gidebilir.",
    secenekler: [
      {
        metin: "Sıcak bir handa/evde bir süre barın.",
        baseBasariSansi: 84,
        maliyet: 6,
        kilitAciklamasi: "Barınacak yerin parasını bile karşılayamıyorsun.",
        basariliSonuc: {
          para: -6,
          saglik: 11,
          mutluluk: 3,
          mesaj: "Sıcak bir ocağın yanında yavaş yavaş ısındın; bedenin kendini toparladı.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: 5,
          mesaj: "Isınman zaman aldı ama en kötüsünü atlattın.",
        },
      },
      {
        metin: "Ateş yakıp açık havada idare et.",
        baseBasariSansi: 47,
        basariliSonuc: {
          saglik: 13,
          mesaj: "Zar zor yaktığın ateş seni kurtardı; sabaha sağ ve nispeten iyi çıktın.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -4,
          mesaj: "Ateş sönünce soğuk iyice işledi; parmakların günlerce uyuştu kaldı.",
        },
      },
    ],
  },
  {
    id: "sk25_gunes_carpmasi",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🥵",
    baslik: "Güneş Çarpması",
    metin:
      "Öğle güneşinin altında saatlerce çalıştın; başın dönüyor, gözlerinin önü kararıyor. Bedenin daha fazla dayanamıyor.",
    secenekler: [
      {
        metin: "Gölgede su ve bakımla dinlen.",
        baseBasariSansi: 86,
        maliyet: 4,
        kilitAciklamasi: "Serinletici içecek almaya bile paran yok.",
        basariliSonuc: {
          para: -4,
          saglik: 10,
          mutluluk: 2,
          mesaj: "Bol su ve gölge işe yaradı; baş dönmesi geçti, kendine geldin.",
        },
        basarisizSonuc: {
          para: -4,
          saglik: 5,
          mesaj: "Toparlanman biraz sürdü ama en kötüsünü atlattın.",
        },
      },
      {
        metin: "İşi bırakmadan, kısa bir mola ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 2,
          saglik: 9,
          mesaj: "Kısa molada toparlandın; hem sağlığın hem cebin idare etti.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -3,
          mesaj: "Mola yetmedi, güneş çarpması iyice ağırlaştı.",
        },
      },
    ],
  },
  {
    id: "sk25_kronik_agri_nuksu",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🦵",
    baslik: "Eski Yaranın Nüksü",
    metin:
      "Yıllar önceki bir yaralanmadan kalan ağrı aniden nükseti — bu kez eskisinden çok daha şiddetli. Yürümesi bile zorlaşıyor.",
    secenekler: [
      {
        metin: "Hekime tekrar görün, tedavi ol.",
        baseBasariSansi: 85,
        maliyet: 9,
        kilitAciklamasi: "Tedavi ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -9,
          saglik: 12,
          mesaj: "Hekimin uyguladığı tedavi eski yarayı bir kez daha sakinleştirdi.",
        },
        basarisizSonuc: {
          para: -9,
          saglik: 5,
          mesaj: "Tedavi tam işe yaramadı ama ağrı biraz azaldı.",
        },
      },
      {
        metin: "Güçlü bir içki/afyon damlasıyla ağrıyı bastır.",
        baseBasariSansi: 42,
        basariliSonuc: {
          saglik: 13,
          mutluluk: 2,
          ahlak: -2,
          mesaj: "Ağrı geçti, kendini bir süreliğine iyi hissettin — ama bu yolu sık kullanmamalısın.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -5,
          mesaj: "Ağrı dinmedi, üstüne bir de bulantı ve baş dönmesi bindi.",
        },
      },
    ],
  },
  {
    id: "sk25_uykusuzluk_krizi",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🌙",
    baslik: "Uykusuzluk ve Sinir Krizi",
    metin:
      "Günlerdir gözüne uyku girmiyor; eller titriyor, düşünceler karışıyor. Bedenin dinlenmeden daha fazla dayanamayacak.",
    secenekler: [
      {
        metin: "Birinin yerine bakmasını sağlayıp tam dinlen.",
        baseBasariSansi: 83,
        maliyet: 5,
        kilitAciklamasi: "Yerine bakacak birine ödeyecek paran yok.",
        basariliSonuc: {
          para: -5,
          saglik: 10,
          mutluluk: 4,
          mesaj: "Günlerce kesintisiz uyudun; zihnin de bedenin de yeniden yerine geldi.",
        },
        basarisizSonuc: {
          para: -5,
          saglik: 4,
          mesaj: "Uyku tam gelmedi ama biraz olsun dinlenebildin.",
        },
      },
      {
        metin: "Güçlü bir uyku ilacıyla zorla uyu.",
        baseBasariSansi: 45,
        basariliSonuc: {
          saglik: 12,
          mutluluk: 1,
          mesaj: "İlaç seni derin bir uykuya soktu; uyandığında kendini çok daha iyi hissettin.",
        },
        basarisizSonuc: {
          saglik: -7,
          mutluluk: -5,
          mesaj: "İlaç ters etki yaptı; sersemlemiş ve daha da bitkin uyandın.",
        },
      },
    ],
  },
  {
    id: "sk25_agir_yorgunluk",
    kategori: "saglik",
    saglikEsikOlayi: "esik25",
    gorsel: "🥱",
    baslik: "Ardı Arkası Kesilmeyen Yorgunluk",
    metin:
      "Haftalardır dinlenmeden çalışıyorsun; artık bacakların tutmuyor, eller titriyor. Bu tempoyu daha fazla sürdüremezsin.",
    secenekler: [
      {
        metin: "İşini bir süreliğine bırak.",
        baseBasariSansi: 82,
        maliyet: 6,
        kilitAciklamasi: "İşini bırakacak kadar birikimin yok.",
        basariliSonuc: {
          para: -6,
          saglik: 11,
          un: -1,
          mesaj: "Birkaç haftalık moladan sonra bedenin gerçekten toparlandı.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: 5,
          mesaj: "Mola tam yetmedi ama en azından daha kötüye gitmedin.",
        },
      },
      {
        metin: "Kendini zorla, dişini sıkıp devam et.",
        baseBasariSansi: 44,
        basariliSonuc: {
          para: 4,
          saglik: 9,
          mesaj: "Şansına, bedenin bir şekilde dayandı — üstüne bir de kazandın.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -4,
          mesaj: "Bedenin daha fazla dayanamadı; iyice yıprandın.",
        },
      },
    ],
  },
];

export const OLAY_SAGLIK_ESIK_10: OlayTanimi[] = [
  {
    id: "sk10_nefes_darligi",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "😨",
    baslik: "Nefes Alamıyorsun",
    metin:
      "Göğsün sıkışıyor, her nefes bir savaşa dönüştü. Yanındakilerin yüzündeki korkuyu görebiliyorsun — durumun gerçekten ciddi.",
    secenekler: [
      {
        metin: "Derhal hekim getirt.",
        baseBasariSansi: 82,
        maliyet: 14,
        kilitAciklamasi: "Acil hekim ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -14,
          saglik: 14,
          mutluluk: 4,
          mesaj: "Hekim zamanında yetişti; nefesin açıldı, en kötüsü geride kaldı.",
        },
        basarisizSonuc: {
          para: -14,
          saglik: 4,
          olum_sansi: 6,
          mesaj: "Hekim elinden geleni yaptı ama durumun hâlâ çok kritik.",
        },
      },
      {
        metin: "Sakinleşmeye çalış, bekle.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 11,
          mutluluk: 2,
          mesaj: "Yavaş yavaş nefesin düzene girdi; en kötü anı atlattın.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -6,
          olum_sansi: 12,
          mesaj: "Nefesin daha da daraldı. Bilincin bulanıklaşıyor.",
        },
      },
    ],
  },
  {
    id: "sk10_baygin_dusme",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "😵‍💫",
    baslik: "Baygın Düştün",
    metin:
      "Ayakların altındaki zemin kaydı, gözlerin karardı — bir anda yere yığıldın. Etrafındakiler seni çevirip ayıltmaya çalışıyor.",
    secenekler: [
      {
        metin: "Yanındakiler hekim çağırsın.",
        baseBasariSansi: 84,
        maliyet: 12,
        kilitAciklamasi: "Hekim ücretini karşılayacak paran yok.",
        basariliSonuc: {
          para: -12,
          saglik: 13,
          mesaj: "Hekim geldiğinde nabzın hâlâ atıyordu; müdahalesiyle kendine geldin.",
        },
        basarisizSonuc: {
          para: -12,
          saglik: 5,
          olum_sansi: 5,
          mesaj: "Hekim geç kaldı ama en azından bir şeyler yapabildi.",
        },
      },
      {
        metin: "Kendiliğinden ayılmasını bekleyin.",
        baseBasariSansi: 42,
        basariliSonuc: {
          saglik: 10,
          mesaj: "Uzun bir sessizliğin ardından gözlerini açtın. Şanslısın.",
        },
        basarisizSonuc: {
          saglik: -9,
          olum_sansi: 11,
          mesaj: "Bir türlü ayılmıyorsun; yanındakiler artık ağlamaya başladı.",
        },
      },
    ],
  },
  {
    id: "sk10_hummali_sayiklama",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "🥴",
    baslik: "Hummadan Sayıklıyorsun",
    metin:
      "Ateşin öyle yükseldi ki artık ne söylediğinin farkında değilsin; sayıklıyorsun, terden sırılsıklamsın. Yakınların büyük bir korkuyla başında bekliyor.",
    secenekler: [
      {
        metin: "Soğuk kompres ve hekim tedavisi.",
        baseBasariSansi: 83,
        maliyet: 13,
        kilitAciklamasi: "Tedavi masrafını karşılayamıyorsun.",
        basariliSonuc: {
          para: -13,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Ateş nihayet kırıldı; gözlerini açtığında etrafındakiler hıçkıra hıçkıra sevindi.",
        },
        basarisizSonuc: {
          para: -13,
          saglik: 4,
          olum_sansi: 6,
          mesaj: "Ateş inatla düşmüyor; hekim daha fazlasını yapamayacağını söyledi.",
        },
      },
      {
        metin: "Yakınların gelenekle/dua ile bekler.",
        baseBasariSansi: 38,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Sabaha karşı ateşin kendiliğinden düştü. Herkes rahat bir nefes aldı.",
        },
        basarisizSonuc: {
          saglik: -11,
          mutluluk: -5,
          olum_sansi: 13,
          mesaj: "Sayıklaman şiddetlendi; ateş bir türlü kırılmıyor.",
        },
      },
    ],
  },
  {
    id: "sk10_agir_kanama",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "🩸",
    baslik: "Durmayan Kanama",
    metin:
      "Yara sandığından çok daha derinmiş; kanama bir türlü durmuyor, bilincin bulanıklaşmaya başladı. Her saniye önemli.",
    secenekler: [
      {
        metin: "Hekim acilen dikiş atsın.",
        baseBasariSansi: 85,
        maliyet: 15,
        kilitAciklamasi: "Acil müdahale ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -15,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Hekim tam vaktinde yetişti; kanamayı durdurdu. Bir daha bu kadar şanslı olmayabilirsin.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: 5,
          olum_sansi: 7,
          mesaj: "Müdahale gecikti; kan kaybın ciddi boyutlara ulaştı.",
        },
      },
      {
        metin: "Kendin sıkıca sarıp bekle.",
        baseBasariSansi: 36,
        basariliSonuc: {
          saglik: 12,
          mesaj: "Sargı tuttu, kanama durdu. İnanılmaz bir şans.",
        },
        basarisizSonuc: {
          saglik: -12,
          olum_sansi: 15,
          mesaj: "Kanama durmuyor; giderek daha da halsizleşiyorsun.",
        },
      },
    ],
  },
  {
    id: "sk10_kalp_carpintisi",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "💔",
    baslik: "Kalbin Duracak Gibi",
    metin:
      "Göğsünde çılgınca bir çarpıntı var, sanki her an duracakmış gibi. Nefesin kesiliyor, ellerin buz gibi.",
    secenekler: [
      {
        metin: "Hekim tam istirahat ve ilaç önersin.",
        baseBasariSansi: 80,
        maliyet: 14,
        kilitAciklamasi: "Hekimin ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -14,
          saglik: 13,
          mutluluk: 3,
          mesaj: "Hekimin verdiği ilaç ve kesin istirahat çarpıntını yatıştırdı.",
        },
        basarisizSonuc: {
          para: -14,
          saglik: 4,
          olum_sansi: 8,
          mesaj: "İlaç tam işe yaramadı; kalbin hâlâ düzensiz atıyor.",
        },
      },
      {
        metin: "Tamamen hareketsiz kalıp bekle.",
        baseBasariSansi: 44,
        basariliSonuc: {
          saglik: 10,
          mesaj: "Uzun, korkulu bir bekleyişin ardından çarpıntı yavaşça geçti.",
        },
        basarisizSonuc: {
          saglik: -9,
          olum_sansi: 12,
          mesaj: "Çarpıntı geçmek yerine şiddetlendi; göğsündeki baskı artıyor.",
        },
      },
    ],
  },
  {
    id: "sk10_uyandirilamiyor",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "😴",
    baslik: "Uyandırılamıyorsun",
    metin:
      "Saatlerdir derin bir uykudasın ve hiçbir sesle, hiçbir dokunuşla uyanmıyorsun. Yakınların panik içinde başında bekliyor.",
    secenekler: [
      {
        metin: "Yakınların acilen hekim getirsin.",
        baseBasariSansi: 86,
        maliyet: 16,
        kilitAciklamasi: "Acil hekim ücretini karşılayacak para yok.",
        basariliSonuc: {
          para: -16,
          saglik: 14,
          mutluluk: 5,
          mesaj: "Hekimin müdahalesiyle gözlerini açtın. Odadaki herkes gözyaşlarına boğuldu.",
        },
        basarisizSonuc: {
          para: -16,
          saglik: 5,
          olum_sansi: 6,
          mesaj: "Hekim elinden geleni yaptı ama hâlâ derin bir uykudasın.",
        },
      },
      {
        metin: "Doğal olarak uyanmasını beklesinler.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Uzun bir bekleyişin ardından gözlerini yavaşça açtın.",
        },
        basarisizSonuc: {
          saglik: -10,
          olum_sansi: 13,
          mesaj: "Saatler geçmesine rağmen hâlâ uyanmıyorsun; nefesin yüzeyselleşti.",
        },
      },
    ],
  },
  {
    id: "sk10_zehirlenme_son",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "☠️",
    baslik: "Zehirin Son Aşaması",
    metin:
      "Vücuduna giren zehir artık ciddi bir aşamaya ulaştı; kaslarını kontrol edemiyor, görüşün bulanıklaşıyor.",
    secenekler: [
      {
        metin: "Hekimden acilen panzehir getirt.",
        baseBasariSansi: 82,
        maliyet: 15,
        kilitAciklamasi: "Panzehrin ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -15,
          saglik: 14,
          mesaj: "Panzehir tam vaktinde geldi; zehir etkisiz hale geldi.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: 4,
          olum_sansi: 8,
          mesaj: "Panzehir yeterince hızlı işlemedi; zehir hâlâ vücudunda.",
        },
      },
      {
        metin: "Bol su içip kusturmaya çalış.",
        baseBasariSansi: 37,
        basariliSonuc: {
          saglik: 12,
          mutluluk: -1,
          mesaj: "İğrenç ama işe yaradı; zehri büyük ölçüde vücudundan attın.",
        },
        basarisizSonuc: {
          saglik: -11,
          olum_sansi: 14,
          mesaj: "Zehir kanına iyice karıştı; her geçen dakika kötüleşiyorsun.",
        },
      },
    ],
  },
  {
    id: "sk10_donma_kritik",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "🧊",
    baslik: "Kritik Derecede Donmuşsun",
    metin:
      "Bedenin artık titremiyor bile — bu iyiye işaret değil. Dudakların morarmış, bilincin gidip geliyor.",
    secenekler: [
      {
        metin: "Hekim gözetiminde yavaşça ısıt.",
        baseBasariSansi: 83,
        maliyet: 12,
        kilitAciklamasi: "Hekim/ısıtma masrafını karşılayamıyorsun.",
        basariliSonuc: {
          para: -12,
          saglik: 13,
          mutluluk: 3,
          mesaj: "Doğru şekilde ısıtıldın; kalbin düzenli atmaya, bilincin yerine gelmeye başladı.",
        },
        basarisizSonuc: {
          para: -12,
          saglik: 5,
          olum_sansi: 7,
          mesaj: "Isınman çok yavaş ilerliyor; durumun hâlâ endişe verici.",
        },
      },
      {
        metin: "Kendiliğinden ısınmasını bekle.",
        baseBasariSansi: 39,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Battaniyeler altında saatler geçti ama sonunda titremeye, yani ısınmaya başladın.",
        },
        basarisizSonuc: {
          saglik: -10,
          olum_sansi: 12,
          mesaj: "Vücut ısın daha da düşüyor; nefesin yavaşladı.",
        },
      },
    ],
  },
  {
    id: "sk10_kangren_riski",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "🦶",
    baslik: "Yaran Kangren Olmak Üzere",
    metin:
      "Yara artık siyaha çalıyor, kötü bir koku yayıyor. Hekim vakit kaybetmeden bir şey yapılmazsa çok daha kötüsünün geleceğini söylüyor.",
    secenekler: [
      {
        metin: "Hekim yarayı acilen temizlesin/müdahale etsin.",
        baseBasariSansi: 84,
        maliyet: 17,
        kilitAciklamasi: "Acil müdahale ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -17,
          saglik: 14,
          mutluluk: 4,
          mesaj: "Hekimin acil müdahalesi yayılmayı durdurdu; canını zor da olsa kurtardın.",
        },
        basarisizSonuc: {
          para: -17,
          saglik: 5,
          olum_sansi: 9,
          mesaj: "Müdahale yeterince erken olmadı; enfeksiyon yayılmaya devam ediyor.",
        },
      },
      {
        metin: "Yarayı kendin dağlayıp temizlemeye çalış.",
        baseBasariSansi: 33,
        basariliSonuc: {
          saglik: 13,
          mesaj: "Vahşi ama işe yarayan bir yöntemdi; yayılma durdu.",
        },
        basarisizSonuc: {
          saglik: -13,
          mutluluk: -6,
          olum_sansi: 16,
          mesaj: "Müdahalen yetersiz kaldı; enfeksiyon hızla yayılıyor.",
        },
      },
    ],
  },
  {
    id: "sk10_aclik_esigi",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "🫥",
    baslik: "Açlıktan Ölümün Eşiğinde",
    metin:
      "Günlerdir düzgün bir şey yemedin; bedenin kendi kendini tüketiyor. Kalkacak, hatta konuşacak gücün bile kalmadı.",
    secenekler: [
      {
        metin: "Yakınların/hekim seni zorla besler.",
        baseBasariSansi: 85,
        maliyet: 10,
        kilitAciklamasi: "Düzgün bir yemek/bakım için bile paran yok.",
        basariliSonuc: {
          para: -10,
          saglik: 13,
          mutluluk: 4,
          mesaj: "Yavaş yavaş, küçük öğünlerle beslendin; bedenin nefes almaya başladı.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: 5,
          olum_sansi: 6,
          mesaj: "Bedenin yemeği zor kabul ediyor; toparlanma çok yavaş.",
        },
      },
      {
        metin: "Bulduğun her şeyi hızla ye.",
        baseBasariSansi: 42,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Aç karnına hızlı yemek mideni şoke etti ama bedenin ihtiyacı olanı buldu.",
        },
        basarisizSonuc: {
          saglik: -9,
          olum_sansi: 11,
          mesaj: "Aç bir mideye ansızın yüklenmek işleri daha da kötüleştirdi.",
        },
      },
    ],
  },
  {
    id: "sk10_acil_mudahale",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "⚕️",
    baslik: "Acil Bir Müdahale Şart",
    metin:
      "Hekim durumunun ciddiyetini anlatıyor: hemen, riskli de olsa bir müdahale yapılmazsa iyileşme ihtimali çok düşük. Karar senin.",
    secenekler: [
      {
        metin: "Riskli müdahaleyi kabul et.",
        baseBasariSansi: 80,
        maliyet: 18,
        kilitAciklamasi: "Müdahalenin ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -18,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Müdahale zorlu geçti ama başarılı oldu; hekim gülümseyerek yanından ayrıldı.",
        },
        basarisizSonuc: {
          para: -18,
          saglik: 3,
          olum_sansi: 10,
          mesaj: "Müdahale beklenen sonucu vermedi; durumun hâlâ çok kritik.",
        },
      },
      {
        metin: "Müdahaleyi reddet, doğal seyrine bırak.",
        baseBasariSansi: 35,
        basariliSonuc: {
          saglik: 9,
          mesaj: "Bedenin kendi başına, beklenmedik biçimde toparlanmaya başladı.",
        },
        basarisizSonuc: {
          saglik: -13,
          olum_sansi: 16,
          mesaj: "Müdahalesiz bırakmak riskli bir bahisti; durumun hızla kötüleşiyor.",
        },
      },
    ],
  },
  {
    id: "sk10_zaturre_son_evre",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "🫁",
    baslik: "Zatürre Son Evresinde",
    metin:
      "Göğsündeki enfeksiyon ilerledi; her nefes hırıltılı ve ağrılı. Hekim durumun ciddi olduğunu gizlemiyor.",
    secenekler: [
      {
        metin: "Hekim yoğun tedavi uygulasın.",
        baseBasariSansi: 81,
        maliyet: 16,
        kilitAciklamasi: "Yoğun tedavi masrafını karşılayamıyorsun.",
        basariliSonuc: {
          para: -16,
          saglik: 14,
          mutluluk: 4,
          mesaj: "Yoğun tedavi işe yaradı; nefesin gün geçtikçe rahatladı.",
        },
        basarisizSonuc: {
          para: -16,
          saglik: 4,
          olum_sansi: 9,
          mesaj: "Tedaviye rağmen göğsündeki ağırlık geçmiyor.",
        },
      },
      {
        metin: "Buhar ve sıcak örtülerle evde bakıl.",
        baseBasariSansi: 38,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Yavaş ama gerçek bir toparlanma; nefesin açılmaya başladı.",
        },
        basarisizSonuc: {
          saglik: -11,
          olum_sansi: 13,
          mesaj: "Ev bakımı yeterli gelmedi; göğsündeki hırıltı derinleşti.",
        },
      },
    ],
  },
  {
    id: "sk10_kalp_krizi_belirtisi",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "⚡",
    baslik: "Göğsünde Kopan Fırtına",
    metin:
      "Göğsünün ortasında ezici bir ağrı var, sol koluna kadar yayılıyor. Nefesin kesiliyor, soğuk ter döküyorsun.",
    secenekler: [
      {
        metin: "Hekim acil müdahale etsin, tam istirahat.",
        baseBasariSansi: 82,
        maliyet: 17,
        kilitAciklamasi: "Acil müdahale ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -17,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Hekimin acil müdahalesi ağrıyı dindirdi; nabzın düzene girdi.",
        },
        basarisizSonuc: {
          para: -17,
          saglik: 4,
          olum_sansi: 10,
          mesaj: "Müdahale ağrıyı tam dindiremedi; göğsündeki baskı sürüyor.",
        },
      },
      {
        metin: "Ağrının geçmesini umarak bekle.",
        baseBasariSansi: 37,
        basariliSonuc: {
          saglik: 10,
          mesaj: "Uzun, korkulu dakikaların ardından ağrı yavaşça hafifledi.",
        },
        basarisizSonuc: {
          saglik: -12,
          olum_sansi: 15,
          mesaj: "Ağrı hafiflemek yerine yayıldı; nefesin daralıyor.",
        },
      },
    ],
  },
  {
    id: "sk10_agir_kaza_soku",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "🚨",
    baslik: "Ağır Bir Kazanın Şokundasın",
    metin:
      "Az önce yaşadığın ağır kaza bedenini alt üst etti; bilincin yerinde ama beden şok içinde, titriyor ve buz gibi.",
    secenekler: [
      {
        metin: "Hekim şok tedavisi ve dinlenme sağlasın.",
        baseBasariSansi: 83,
        maliyet: 15,
        kilitAciklamasi: "Şok tedavisinin ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -15,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Hekimin müdahalesiyle şoktan çıktın; bedenin yavaşça normale döndü.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: 5,
          olum_sansi: 8,
          mesaj: "Şok hâlâ geçmiyor; nabzın düzensiz atıyor.",
        },
      },
      {
        metin: "Kendine gelmeye çalış, ayağa kalk.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 11,
          mesaj: "İnadına şükür, bedenin şoku kendi başına atlattı.",
        },
        basarisizSonuc: {
          saglik: -10,
          olum_sansi: 12,
          mesaj: "Şok derinleşti; bilincin bulanıklaşmaya başladı.",
        },
      },
    ],
  },
  {
    id: "sk10_bedenin_iflasi",
    kategori: "saglik",
    saglikEsikOlayi: "esik10",
    gorsel: "🕯️",
    baslik: "Bedenin Daha Fazla Dayanamıyor",
    metin:
      "Yılların yorgunluğu, hastalıkları, kayıpları hepsi bir anda üstüne çöktü sanki. Bedenin de ruhun da tükenmiş durumda.",
    secenekler: [
      {
        metin: "Her şeyi bırak, tam bir tedavi/istirahat sürecine gir.",
        baseBasariSansi: 84,
        maliyet: 16,
        kilitAciklamasi: "Uzun bir tedavi/istirahat sürecini karşılayamıyorsun.",
        basariliSonuc: {
          para: -16,
          saglik: 14,
          mutluluk: 5,
          mesaj: "Uzun bir toparlanma sürecinin ardından hem bedenin hem ruhun nefes aldı.",
        },
        basarisizSonuc: {
          para: -16,
          saglik: 5,
          olum_sansi: 8,
          mesaj: "Tedavi tam işe yaramadı; bedenin hâlâ çok zayıf.",
        },
      },
      {
        metin: "Pes etmeyi reddet, zorla ayakta dur.",
        baseBasariSansi: 36,
        basariliSonuc: {
          saglik: 11,
          mutluluk: -1,
          mesaj: "İnadın bir kez daha işe yaradı; bedenin son bir kez daha dayandı.",
        },
        basarisizSonuc: {
          saglik: -12,
          mutluluk: -6,
          olum_sansi: 14,
          mesaj: "Bedenin artık gerçekten kaldıramıyor; her şey son derece kırılgan hissettiriyor.",
        },
      },
    ],
  },
];
