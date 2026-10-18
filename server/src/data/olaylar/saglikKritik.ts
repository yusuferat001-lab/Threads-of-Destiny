import type { OlayTanimi } from "./types";

/**
 * SAĞLIK KRİTİK EŞİKLERİ (2026-09 sonu, kullanıcı isteği).
 *
 * Eski `saglikToparlanma.ts` (8 olay, `maxSaglik:45`, normal ağırlıklı
 * havuzda rekabet eden, garantisiz/tekrarlanabilen bir toparlanma havuzuydu)
 * bu iki havuzla ÇAKIŞTIĞI için tamamen KALDIRILDI (kullanıcı isteği:
 * "sağlık toparlama havuzunu bu iki yeni havuza aktarıp 45'te tetiklenmesin").
 * Artık düşük sağlıkta TEK yol bu dosya: her havuz bir hayatta YALNIZCA BİR
 * KEZ, karakterin sağlığı İLK KEZ ilgili eşiğin altına indiği anda
 * `senaryoUret` kaskadı tarafından ZORLA tetiklenir (bkz. gameEngine.ts,
 * `saglik_esik_25_gorundu`/`saglik_esik_10_gorundu` etiketleri) — normal
 * rastgele havuzdan tamamen dışlanırlar (`saglikEsikOlayi`, olaySecici.ts
 * uygunMu).
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
      "Günlerdir süren bitkinlik seni yatağa düşürdü; vücudun yanıyor, kalkacak halin yok.",
    secenekler: [
      {
        metin: "Hekim çağır, ilaç al.",
        baseBasariSansi: 85,
        maliyet: 7,
        kilitAciklamasi: "Hekime verecek paran yok.",
        basariliSonuc: {
          para: -7,
          saglik: 11,
          mutluluk: 2,
          mesaj: "Hekimin karışımı ateşi düşürdü; birkaç günde ayaktasın.",
        },
        basarisizSonuc: {
          para: -7,
          saglik: 5,
          mesaj: "Tedavi yavaş işledi ama en kötüsünü atlattın.",
        },
      },
      {
        metin: "Soğuk kompresle idare et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 13,
          mutluluk: -1,
          mesaj: "Terli bir gecenin ardından ateş düştü. Ucuz atlattın.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -4,
          mesaj: "Ateş düşmedi, sayıklamaya başladın; durumun kötüleşti.",
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
      "Yediğin şey içine oturdu: bulantı, kramp, kusma. Zayıf bünyeni iyice yıprattı.",
    secenekler: [
      {
        metin: "Hekimden ilaç al.",
        baseBasariSansi: 82,
        maliyet: 5,
        kilitAciklamasi: "İlacın parası bile yok.",
        basariliSonuc: {
          para: -5,
          saglik: 10,
          mesaj: "İlaç midendeki yangını dindirdi; çabuk toparlandın.",
        },
        basarisizSonuc: {
          para: -5,
          saglik: 4,
          mesaj: "İlaç tam işlemedi ama kötüye gitmedin.",
        },
      },
      {
        metin: "Kendiliğinden geçsin, bekle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          saglik: 12,
          mesaj: "Birkaç gün açlık ve bol su işe yaradı.",
        },
        basarisizSonuc: {
          saglik: -7,
          mutluluk: -3,
          mesaj: "Zehirlenme ilerledi; günlerce yataktan kalkamadın.",
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
      "Eski bir yara iyileşmek yerine kızarıp şişti, zonkluyor. Bırakırsan kötüleşir.",
    secenekler: [
      {
        metin: "Yarayı hekime temizlet.",
        baseBasariSansi: 86,
        maliyet: 9,
        kilitAciklamasi: "Hekime verecek paran yok.",
        basariliSonuc: {
          para: -9,
          saglik: 12,
          mutluluk: 3,
          mesaj: "Hekim yarayı temizleyip sardı; iltihap birkaç günde çekildi.",
        },
        basarisizSonuc: {
          para: -9,
          saglik: 5,
          mesaj: "Tedavi istediğin gibi olmadı ama kötüleşmedi.",
        },
      },
      {
        metin: "Kendin sıkıp temizle.",
        baseBasariSansi: 42,
        basariliSonuc: {
          saglik: 14,
          mutluluk: -2,
          mesaj: "Acıtıcıydı ama işe yaradı; iltihap boşaldı.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -5,
          mesaj: "Yarayı bozdun; iltihap yayıldı, günlerce zonkladı.",
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
      "Öksürük göğsüne yerleşti, nefes alırken ıslık çıkıyor. Sabahları kalkmak çok zor.",
    secenekler: [
      {
        metin: "İlaç al, birkaç gün dinlen.",
        baseBasariSansi: 84,
        maliyet: 8,
        kilitAciklamasi: "İlaca verecek paran yok.",
        basariliSonuc: {
          para: -8,
          saglik: 11,
          mutluluk: 2,
          mesaj: "İlaç ve dinlenme ıslığı kesti; nefesin açıldı.",
        },
        basarisizSonuc: {
          para: -8,
          saglik: 5,
          mesaj: "Öksürük geçmedi ama nefes almak kolaylaştı.",
        },
      },
      {
        metin: "Sıcak buhar kürüne gir.",
        baseBasariSansi: 50,
        basariliSonuc: {
          saglik: 13,
          mutluluk: -1,
          mesaj: "Buhar göğsünü gevşetti; saatler içinde rahatladın.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -4,
          mesaj: "Buhar işe yaramadı, öksürük derinleşti.",
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
      "Aylardır dinlenmeden çalıştın; bugün ayakta duramayacak kadar bitkinsin.",
    secenekler: [
      {
        metin: "Her şeyi bırak, dinlen.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 9,
          mutluluk: 3,
          un: -2,
          mesaj: "İşleri askıya alıp dinlendin. Yokluğun konuşuldu ama ayaktasın.",
        },
        basarisizSonuc: {
          saglik: 3,
          mesaj: "Dinlenmeye çalıştın ama zihnin rahatlamadı.",
        },
      },
      {
        metin: "Uyarıcı kaynatmayla ayakta kal.",
        baseBasariSansi: 45,
        maliyet: 4,
        kilitAciklamasi: "Kaynatmaya verecek paran yok.",
        basariliSonuc: {
          para: -4,
          saglik: 13,
          mesaj: "Beklenmedik biçimde işe yaradı; toparlandın, iş kaybetmedin.",
        },
        basarisizSonuc: {
          para: -4,
          saglik: -8,
          mutluluk: -3,
          mesaj: "Kaynatma seni daha da zorladı; çöküş derinleşti.",
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
      "Küçük sandığın yara kanamayı bırakmıyor. Baş dönmesi başladı bile.",
    secenekler: [
      {
        metin: "Hekime koş, dikiş attır.",
        baseBasariSansi: 87,
        maliyet: 10,
        kilitAciklamasi: "Dikişe verecek paran yok.",
        basariliSonuc: {
          para: -10,
          saglik: 12,
          mesaj: "Hekim yarayı dikti, kanama durdu; birkaç günde kendine geldin.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: 6,
          mesaj: "Dikiş tuttu ama kan kaybının etkisi sürdü.",
        },
      },
      {
        metin: "Sıkıca sar, bekle.",
        baseBasariSansi: 46,
        basariliSonuc: {
          saglik: 13,
          mutluluk: -1,
          mesaj: "Sargı tuttu, kanama durdu. Şanslıydın.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -5,
          mesaj: "Sargı gevşedi, kan kaybı arttı; günlerce halsiz kaldın.",
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
      "Kötü düşüşten sonra göğsünde/kolunda korkunç bir ağrı var; muhtemelen kırık. Nefes bile acıtıyor.",
    secenekler: [
      {
        metin: "Hekime görün, doğru sardır.",
        baseBasariSansi: 85,
        maliyet: 9,
        kilitAciklamasi: "Hekime verecek paran yok.",
        basariliSonuc: {
          para: -9,
          saglik: 11,
          mutluluk: 2,
          mesaj: "Hekim kırığı doğru sardı; ağrın belirgin azaldı.",
        },
        basarisizSonuc: {
          para: -9,
          saglik: 5,
          mesaj: "Sargı tam oturmadı ama kötüleşmedi.",
        },
      },
      {
        metin: "Kendin sar, işine devam et.",
        baseBasariSansi: 42,
        basariliSonuc: {
          para: 2,
          saglik: 13,
          mutluluk: -2,
          mesaj: "Kırık kendiliğinden düzgün kaynadı; işini de aksatmadın.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -5,
          mesaj: "Kırık yanlış kaynadı; ağrı ve zayıflık arttı.",
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
      "Karnının bir yanında saplanan, giderek artan bir ağrı var. Sıradan hazımsızlığa benzemiyor.",
    secenekler: [
      {
        metin: "Hekime görün, ücreti öde.",
        baseBasariSansi: 88,
        maliyet: 12,
        kilitAciklamasi: "Tedavi ücretini karşılayamıyorsun.",
        basariliSonuc: {
          para: -12,
          saglik: 13,
          mutluluk: 3,
          mesaj: "Hekimin teşhisi ve tedavisi ağrını dindirdi.",
        },
        basarisizSonuc: {
          para: -12,
          saglik: 6,
          mesaj: "Tedavi tam işlemedi ama ağrı biraz hafifledi.",
        },
      },
      {
        metin: "Ağrı kesici otlarla bekle.",
        baseBasariSansi: 44,
        basariliSonuc: {
          saglik: 10,
          mesaj: "Otlar işe yaradı, ağrı geçti; para da harcamadın.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -4,
          mesaj: "Ağrı yayıldı; günlerce iki büklüm dolaştın.",
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
      "Bir böcek ya da yılan ısırdı; yer şişip morardı, kolun/bacağın uyuşuyor.",
    secenekler: [
      {
        metin: "Hekimden panzehir al.",
        baseBasariSansi: 83,
        maliyet: 11,
        kilitAciklamasi: "Panzehire verecek paran yok.",
        basariliSonuc: {
          para: -11,
          saglik: 12,
          mutluluk: 2,
          mesaj: "Panzehir zehri etkisiz kıldı; şişlik günlerde indi.",
        },
        basarisizSonuc: {
          para: -11,
          saglik: 5,
          mesaj: "Panzehir tam işlemedi ama zehri yavaşlattı.",
        },
      },
      {
        metin: "Halk usulü kendin tedavi et.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 14,
          mutluluk: -2,
          mesaj: "Riskliydi ama işe yaradı; zehir atıldı.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -5,
          mesaj: "Yöntem tutmadı, zehir yayıldı; günlerce yatalak kaldın.",
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
      "Mahalledeki humma sana da bulaştı: titreme, terleme, iştahsızlık. Yataktan kalkamıyorsun.",
    secenekler: [
      {
        metin: "Karantinaya çekil, tedavi ol.",
        baseBasariSansi: 82,
        maliyet: 8,
        kilitAciklamasi: "Tedaviye verecek paran yok.",
        basariliSonuc: {
          para: -8,
          saglik: 11,
          un: -2,
          mesaj: "Eve kapanıp tedavi oldun; kimseye bulaşmadı, iyileştin.",
        },
        basarisizSonuc: {
          para: -8,
          saglik: 4,
          mesaj: "Tedavi yavaş işledi ama kötüleşmedin.",
        },
      },
      {
        metin: "İş başında kal, görmezden gel.",
        baseBasariSansi: 48,
        basariliSonuc: {
          para: 3,
          saglik: 8,
          mesaj: "Şansına bünyen hummayı yendi; işini de kaybetmedin.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -4,
          mesaj: "Görmezden gelmek işe yaramadı; iyice yattın.",
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
      "Kış fırtınasında yolda kaldın; parmakların hissizleşti, dişlerin takırdıyor.",
    secenekler: [
      {
        metin: "Sıcak bir handa barın.",
        baseBasariSansi: 84,
        maliyet: 6,
        kilitAciklamasi: "Barınmaya verecek paran yok.",
        basariliSonuc: {
          para: -6,
          saglik: 11,
          mutluluk: 3,
          mesaj: "Sıcak ocak başında ısındın; bedenin toparlandı.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: 5,
          mesaj: "Isınman uzun sürdü ama en kötüsünü atlattın.",
        },
      },
      {
        metin: "Ateş yakıp açıkta idare et.",
        baseBasariSansi: 47,
        basariliSonuc: {
          saglik: 13,
          mesaj: "Zor yaktığın ateş seni kurtardı; sabaha sağ çıktın.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -4,
          mesaj: "Ateş sönünce soğuk işledi; parmakların günlerce uyuştu.",
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
      "Öğle güneşinde saatlerce çalıştın; başın dönüyor, gözün kararıyor.",
    secenekler: [
      {
        metin: "Gölgede su içip dinlen.",
        baseBasariSansi: 86,
        maliyet: 4,
        kilitAciklamasi: "Serinletici içeceğe verecek paran yok.",
        basariliSonuc: {
          para: -4,
          saglik: 10,
          mutluluk: 2,
          mesaj: "Su ve gölge işe yaradı; baş dönmesi geçti.",
        },
        basarisizSonuc: {
          para: -4,
          saglik: 5,
          mesaj: "Toparlanman sürdü ama en kötüsünü atlattın.",
        },
      },
      {
        metin: "Kısa bir mola ver, devam et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 2,
          saglik: 9,
          mesaj: "Kısa molada toparlandın; sağlığın da cebin de idare etti.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -3,
          mesaj: "Mola yetmedi, güneş çarpması ağırlaştı.",
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
      "Yıllar önceki yaralanmanın ağrısı aniden nüksetti, bu kez çok şiddetli. Yürümek bile zor.",
    secenekler: [
      {
        metin: "Hekime tekrar görün.",
        baseBasariSansi: 85,
        maliyet: 9,
        kilitAciklamasi: "Tedaviye verecek paran yok.",
        basariliSonuc: {
          para: -9,
          saglik: 12,
          mesaj: "Tedavi eski yarayı bir kez daha yatıştırdı.",
        },
        basarisizSonuc: {
          para: -9,
          saglik: 5,
          mesaj: "Tedavi tam işlemedi ama ağrı azaldı.",
        },
      },
      {
        metin: "İçki/afyonla ağrıyı bastır.",
        baseBasariSansi: 42,
        basariliSonuc: {
          saglik: 13,
          mutluluk: 2,
          ahlak: -2,
          mesaj: "Ağrı geçti, bir süre iyi hissettin; ama sık kullanma.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -5,
          mesaj: "Ağrı dinmedi, üstüne bulantı ve baş dönmesi geldi.",
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
      "Günlerdir uyuyamıyorsun; eller titriyor, düşünceler karışık. Dinlenmeden dayanamazsın.",
    secenekler: [
      {
        metin: "Birini yerine koy, dinlen.",
        baseBasariSansi: 83,
        maliyet: 5,
        kilitAciklamasi: "Yerine bakacak birine verecek paran yok.",
        basariliSonuc: {
          para: -5,
          saglik: 10,
          mutluluk: 4,
          mesaj: "Günlerce kesintisiz uyudun; zihnin de bedenin de yerine geldi.",
        },
        basarisizSonuc: {
          para: -5,
          saglik: 4,
          mesaj: "Uyku tam gelmedi ama biraz dinlendin.",
        },
      },
      {
        metin: "Güçlü ilaçla zorla uyu.",
        baseBasariSansi: 45,
        basariliSonuc: {
          saglik: 12,
          mutluluk: 1,
          mesaj: "İlaç derin bir uyku verdi; çok daha iyi uyandın.",
        },
        basarisizSonuc: {
          saglik: -7,
          mutluluk: -5,
          mesaj: "İlaç ters etti; sersem ve bitkin uyandın.",
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
      "Haftalardır dinlenmeden çalışıyorsun; bacakların tutmuyor, eller titriyor.",
    secenekler: [
      {
        metin: "İşi bir süre bırak.",
        baseBasariSansi: 82,
        maliyet: 6,
        kilitAciklamasi: "İşi bırakacak birikimin yok.",
        basariliSonuc: {
          para: -6,
          saglik: 11,
          un: -1,
          mesaj: "Birkaç haftalık molayla bedenin toparlandı.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: 5,
          mesaj: "Mola yetmedi ama kötüleşmedin.",
        },
      },
      {
        metin: "Dişini sıkıp devam et.",
        baseBasariSansi: 44,
        basariliSonuc: {
          para: 4,
          saglik: 9,
          mesaj: "Şansına bedenin dayandı; üstüne kazandın da.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -4,
          mesaj: "Bedenin dayanamadı; iyice yıprandın.",
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
      "Göğsün sıkışıyor, her nefes bir savaş. Yanındakilerin yüzündeki korku durumun ciddiyetini gösteriyor.",
    secenekler: [
      {
        metin: "Hemen hekim getirt.",
        baseBasariSansi: 82,
        maliyet: 14,
        kilitAciklamasi: "Acil hekime verecek paran yok.",
        basariliSonuc: {
          para: -14,
          saglik: 14,
          mutluluk: 4,
          mesaj: "Hekim yetişti; nefesin açıldı, en kötüsü geçti.",
        },
        basarisizSonuc: {
          para: -14,
          saglik: 4,
          olum_sansi: 6,
          mesaj: "Hekim elinden geleni yaptı ama durumun hâlâ kritik.",
        },
      },
      {
        metin: "Sakin kal, bekle.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 11,
          mutluluk: 2,
          mesaj: "Nefesin yavaşça düzene girdi; en kötüsünü atlattın.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -6,
          olum_sansi: 12,
          mesaj: "Nefesin daha da daraldı; bilincin bulanıyor.",
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
      "Zemin ayağının altından kaydı, gözün karardı; yere yığıldın. Etrafındakiler seni ayıltmaya çalışıyor.",
    secenekler: [
      {
        metin: "Hekim çağırsınlar.",
        baseBasariSansi: 84,
        maliyet: 12,
        kilitAciklamasi: "Hekime verecek paran yok.",
        basariliSonuc: {
          para: -12,
          saglik: 13,
          mesaj: "Hekim geldiğinde nabzın atıyordu; müdahaleyle kendine geldin.",
        },
        basarisizSonuc: {
          para: -12,
          saglik: 5,
          olum_sansi: 5,
          mesaj: "Hekim geç kaldı ama bir şeyler yapabildi.",
        },
      },
      {
        metin: "Kendiliğinden ayılmasını bekleyin.",
        baseBasariSansi: 42,
        basariliSonuc: {
          saglik: 10,
          mesaj: "Uzun sessizlikten sonra gözlerini açtın. Şanslısın.",
        },
        basarisizSonuc: {
          saglik: -9,
          olum_sansi: 11,
          mesaj: "Bir türlü ayılmıyorsun; yanındakiler ağlamaya başladı.",
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
      "Ateşin öyle yükseldi ki sayıklıyor, terden sırılsıklam yatıyorsun. Yakınların korkuyla başında bekliyor.",
    secenekler: [
      {
        metin: "Soğuk kompres ve hekim.",
        baseBasariSansi: 83,
        maliyet: 13,
        kilitAciklamasi: "Tedaviye verecek paran yok.",
        basariliSonuc: {
          para: -13,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Ateş kırıldı; gözünü açınca yakınların hıçkırarak sevindi.",
        },
        basarisizSonuc: {
          para: -13,
          saglik: 4,
          olum_sansi: 6,
          mesaj: "Ateş düşmüyor; hekim daha fazlasını yapamıyor.",
        },
      },
      {
        metin: "Yakınların dua ile beklesin.",
        baseBasariSansi: 38,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Sabaha doğru ateş kendiliğinden düştü; herkes rahatladı.",
        },
        basarisizSonuc: {
          saglik: -11,
          mutluluk: -5,
          olum_sansi: 13,
          mesaj: "Sayıklaman şiddetlendi; ateş kırılmıyor.",
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
      "Yara sandığından derin; kanama durmuyor, bilincin bulanıyor. Her saniye önemli.",
    secenekler: [
      {
        metin: "Hekim hemen diksin.",
        baseBasariSansi: 85,
        maliyet: 15,
        kilitAciklamasi: "Acil müdahaleye verecek paran yok.",
        basariliSonuc: {
          para: -15,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Hekim tam vaktinde yetişip kanamayı durdurdu.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: 5,
          olum_sansi: 7,
          mesaj: "Müdahale gecikti; kan kaybın ciddileşti.",
        },
      },
      {
        metin: "Sıkıca sar, bekle.",
        baseBasariSansi: 36,
        basariliSonuc: {
          saglik: 12,
          mesaj: "Sargı tuttu, kanama durdu. İnanılmaz şans.",
        },
        basarisizSonuc: {
          saglik: -12,
          olum_sansi: 15,
          mesaj: "Kanama durmuyor; giderek halsizleşiyorsun.",
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
      "Göğsünde çılgın bir çarpıntı var, kalp her an duracak gibi. Nefesin kesiliyor, ellerin buz gibi.",
    secenekler: [
      {
        metin: "Hekim istirahat ve ilaç versin.",
        baseBasariSansi: 80,
        maliyet: 14,
        kilitAciklamasi: "Hekime verecek paran yok.",
        basariliSonuc: {
          para: -14,
          saglik: 13,
          mutluluk: 3,
          mesaj: "İlaç ve kesin istirahat çarpıntıyı yatıştırdı.",
        },
        basarisizSonuc: {
          para: -14,
          saglik: 4,
          olum_sansi: 8,
          mesaj: "İlaç tam işlemedi; kalbin hâlâ düzensiz.",
        },
      },
      {
        metin: "Hareketsiz kalıp bekle.",
        baseBasariSansi: 44,
        basariliSonuc: {
          saglik: 10,
          mesaj: "Korkulu bir bekleyişin ardından çarpıntı geçti.",
        },
        basarisizSonuc: {
          saglik: -9,
          olum_sansi: 12,
          mesaj: "Çarpıntı şiddetlendi; göğsündeki baskı artıyor.",
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
      "Saatlerdir derin uykudasın; hiçbir ses ya da dokunuş seni uyandırmıyor. Yakınların panikte.",
    secenekler: [
      {
        metin: "Hemen hekim getirsinler.",
        baseBasariSansi: 86,
        maliyet: 16,
        kilitAciklamasi: "Acil hekime verecek paran yok.",
        basariliSonuc: {
          para: -16,
          saglik: 14,
          mutluluk: 5,
          mesaj: "Hekimin müdahalesiyle gözlerini açtın; oda gözyaşına boğuldu.",
        },
        basarisizSonuc: {
          para: -16,
          saglik: 5,
          olum_sansi: 6,
          mesaj: "Hekim elinden geleni yaptı ama hâlâ uyanmadın.",
        },
      },
      {
        metin: "Doğal olarak uyanmasını beklesinler.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Uzun beklayıştan sonra gözlerini yavaşça açtın.",
        },
        basarisizSonuc: {
          saglik: -10,
          olum_sansi: 13,
          mesaj: "Saatler geçti, uyanmıyorsun; nefesin yüzeyselleşti.",
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
      "Vücuttaki zehir ağır aşamada; kaslarını kontrol edemiyor, görüşün bulanıyor.",
    secenekler: [
      {
        metin: "Hekimden acil panzehir getirt.",
        baseBasariSansi: 82,
        maliyet: 15,
        kilitAciklamasi: "Panzehire verecek paran yok.",
        basariliSonuc: {
          para: -15,
          saglik: 14,
          mesaj: "Panzehir tam vaktinde geldi; zehir etkisiz kaldı.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: 4,
          olum_sansi: 8,
          mesaj: "Panzehir yeterince hızlı işlemedi; zehir hâlâ içinde.",
        },
      },
      {
        metin: "Bol su iç, kus.",
        baseBasariSansi: 37,
        basariliSonuc: {
          saglik: 12,
          mutluluk: -1,
          mesaj: "İğrençti ama işe yaradı; zehrin çoğunu attın.",
        },
        basarisizSonuc: {
          saglik: -11,
          olum_sansi: 14,
          mesaj: "Zehir kana karıştı; dakikalar içinde kötüleşiyorsun.",
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
      "Bedenin artık titremiyor bile; bu kötü işaret. Dudakların mor, bilincin gidip geliyor.",
    secenekler: [
      {
        metin: "Hekim gözetiminde ısıt.",
        baseBasariSansi: 83,
        maliyet: 12,
        kilitAciklamasi: "Hekime verecek paran yok.",
        basariliSonuc: {
          para: -12,
          saglik: 13,
          mutluluk: 3,
          mesaj: "Doğru ısıtıldın; kalbin düzene, bilincin yerine geldi.",
        },
        basarisizSonuc: {
          para: -12,
          saglik: 5,
          olum_sansi: 7,
          mesaj: "Isınman çok yavaş; durumun hâlâ endişe verici.",
        },
      },
      {
        metin: "Kendiliğinden ısınmayı bekle.",
        baseBasariSansi: 39,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Battaniyeler altında saatler sonra titremeye, yani ısınmaya başladın.",
        },
        basarisizSonuc: {
          saglik: -10,
          olum_sansi: 12,
          mesaj: "Vücut ısın düşüyor; nefesin yavaşladı.",
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
      "Yara siyaha çalıyor, kötü kokuyor. Hekim hemen müdahale edilmezse çok daha kötüsü geleceğini söylüyor.",
    secenekler: [
      {
        metin: "Hekim hemen müdahale etsin.",
        baseBasariSansi: 84,
        maliyet: 17,
        kilitAciklamasi: "Acil müdahaleye verecek paran yok.",
        basariliSonuc: {
          para: -17,
          saglik: 14,
          mutluluk: 4,
          mesaj: "Acil müdahale yayılmayı durdurdu; canını zor kurtardın.",
        },
        basarisizSonuc: {
          para: -17,
          saglik: 5,
          olum_sansi: 9,
          mesaj: "Müdahale geç kaldı; enfeksiyon yayılıyor.",
        },
      },
      {
        metin: "Yarayı kendin dağla.",
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
      "Günlerdir düzgün bir şey yemedin; beden kendini tüketiyor. Kalkacak, konuşacak gücün yok.",
    secenekler: [
      {
        metin: "Seni zorla besletsinler.",
        baseBasariSansi: 85,
        maliyet: 10,
        kilitAciklamasi: "Yemeğe/bakıma verecek paran yok.",
        basariliSonuc: {
          para: -10,
          saglik: 13,
          mutluluk: 4,
          mesaj: "Küçük öğünlerle beslendin; bedenin nefes aldı.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: 5,
          olum_sansi: 6,
          mesaj: "Beden yemeği zor kabul ediyor; toparlanma yavaş.",
        },
      },
      {
        metin: "Bulduğunu hızla ye.",
        baseBasariSansi: 42,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Hızlı yemek midene ağır geldi ama bedenin ihtiyacını buldu.",
        },
        basarisizSonuc: {
          saglik: -9,
          olum_sansi: 11,
          mesaj: "Aç mideye ansızın yüklenmek durumu kötüleştirdi.",
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
      "Hekim, riskli de olsa hemen müdahale edilmezse iyileşme ihtimalinin düşük olduğunu söylüyor. Karar senin.",
    secenekler: [
      {
        metin: "Riskli müdahaleyi kabul et.",
        baseBasariSansi: 80,
        maliyet: 18,
        kilitAciklamasi: "Müdahaleye verecek paran yok.",
        basariliSonuc: {
          para: -18,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Müdahale zorlu geçti ama başarılı oldu.",
        },
        basarisizSonuc: {
          para: -18,
          saglik: 3,
          olum_sansi: 10,
          mesaj: "Müdahale sonuç vermedi; durumun hâlâ çok kritik.",
        },
      },
      {
        metin: "Reddet, kendi seyrine bırak.",
        baseBasariSansi: 35,
        basariliSonuc: {
          saglik: 9,
          mesaj: "Beden kendi başına, beklenmedik biçimde toparlanmaya başladı.",
        },
        basarisizSonuc: {
          saglik: -13,
          olum_sansi: 16,
          mesaj: "Müdahalesiz kalmak riskli bahisti; durumun hızla kötüleşiyor.",
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
      "Göğsündeki enfeksiyon ilerledi; her nefes hırıltılı ve ağrılı. Hekim durumun ciddi olduğunu saklamıyor.",
    secenekler: [
      {
        metin: "Hekim yoğun tedavi uygulasın.",
        baseBasariSansi: 81,
        maliyet: 16,
        kilitAciklamasi: "Yoğun tedaviye verecek paran yok.",
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
        metin: "Evde buhar ve sıcak örtüyle bakıl.",
        baseBasariSansi: 38,
        basariliSonuc: {
          saglik: 11,
          mesaj: "Yavaş ama gerçek bir toparlanma; nefesin açıldı.",
        },
        basarisizSonuc: {
          saglik: -11,
          olum_sansi: 13,
          mesaj: "Ev bakımı yetmedi; hırıltı derinleşti.",
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
      "Göğsünün ortasında ezici bir ağrı var, sol koluna yayılıyor. Nefesin kesiliyor, soğuk ter döküyorsun.",
    secenekler: [
      {
        metin: "Hekim müdahale etsin, tam istirahat.",
        baseBasariSansi: 82,
        maliyet: 17,
        kilitAciklamasi: "Acil müdahaleye verecek paran yok.",
        basariliSonuc: {
          para: -17,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Acil müdahale ağrıyı dindirdi; nabzın düzene girdi.",
        },
        basarisizSonuc: {
          para: -17,
          saglik: 4,
          olum_sansi: 10,
          mesaj: "Müdahale ağrıyı tam dindirmedi; baskı sürüyor.",
        },
      },
      {
        metin: "Ağrının geçmesini bekle.",
        baseBasariSansi: 37,
        basariliSonuc: {
          saglik: 10,
          mesaj: "Korkulu dakikaların ardından ağrı yavaşça hafifledi.",
        },
        basarisizSonuc: {
          saglik: -12,
          olum_sansi: 15,
          mesaj: "Ağrı yayıldı; nefesin daralıyor.",
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
      "Az önceki ağır kaza bedenini alt üst etti; bilincin yerinde ama şoktasın, titriyor ve buz gibisin.",
    secenekler: [
      {
        metin: "Hekim şok tedavisi yapsın.",
        baseBasariSansi: 83,
        maliyet: 15,
        kilitAciklamasi: "Şok tedavisine verecek paran yok.",
        basariliSonuc: {
          para: -15,
          saglik: 14,
          mutluluk: 3,
          mesaj: "Hekimin müdahalesiyle şoktan çıktın; beden normale döndü.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: 5,
          olum_sansi: 8,
          mesaj: "Şok geçmiyor; nabzın düzensiz.",
        },
      },
      {
        metin: "Kendine gelmeye çalış, kalk.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 11,
          mesaj: "İnadına şükür, şoku kendi başına atlattın.",
        },
        basarisizSonuc: {
          saglik: -10,
          olum_sansi: 12,
          mesaj: "Şok derinleşti; bilincin bulanmaya başladı.",
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
      "Yılların yorgunluğu, hastalıkları, kayıpları bir anda çöktü. Beden de ruh da tükenmiş.",
    secenekler: [
      {
        metin: "Her şeyi bırak, tam tedavi ve istirahat.",
        baseBasariSansi: 84,
        maliyet: 16,
        kilitAciklamasi: "Uzun tedavi/istirahate verecek paran yok.",
        basariliSonuc: {
          para: -16,
          saglik: 14,
          mutluluk: 5,
          mesaj: "Uzun bir toparlanmayla bedenin de ruhun da nefes aldı.",
        },
        basarisizSonuc: {
          para: -16,
          saglik: 5,
          olum_sansi: 8,
          mesaj: "Tedavi tam işlemedi; beden hâlâ çok zayıf.",
        },
      },
      {
        metin: "Pes etme, zorla ayakta dur.",
        baseBasariSansi: 36,
        basariliSonuc: {
          saglik: 11,
          mutluluk: -1,
          mesaj: "İnadın yine işe yaradı; beden son bir kez dayandı.",
        },
        basarisizSonuc: {
          saglik: -12,
          mutluluk: -6,
          olum_sansi: 14,
          mesaj: "Beden artık kaldırmıyor; her şey kırılgan.",
        },
      },
    ],
  },
];
