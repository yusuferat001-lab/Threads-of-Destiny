import type { OlayTanimi } from "./types";

/**
 * DÜŞÜK SAĞLIK TOPARLANMA OLAYLARI (madde 9).
 *
 * Bu oyunun ana ölüm sebebi, seçimden bağımsız biriken event kaynaklı sağlık
 * aşınması: tek seferlik +6..+13'lük şifa eşyaları bir ömür boyu −100'lük kaybı
 * karşılamıyordu. Bu dosyadaki olayların HEPSİ `maxSaglik: 45` ile kilitli —
 * yani yalnızca karakter gerçekten dibe vurduğunda havuza girerler ve düşük ama
 * gerçek bir toparlanma yolu sunarlar. Bedelsiz değiller (para / zaman / ün /
 * mutluluk takası) ama "güvenli" seçenekleri yüksek şansla belirgin sağlık verir.
 *
 * Not: `maxSaglik` filtresi olaySecici.temelUygunMu içinde işlenir; `agirlik`
 * bilerek yüksek tutuldu ki karakter dipteyken bu olaylar öne çıksın.
 */
export const OLAY_SAGLIK_TOPARLANMA: OlayTanimi[] = [
  {
    id: "st_yatak_istirahati",
    kategori: "saglik",
    maxSaglik: 45,
    agirlik: 2.4,
    gorsel: "🛏️",
    baslik: "Bedenin İsyanda",
    metin:
      "Artık ayakta durmak bile zor. Bir süre her şeyi bırakıp yatağa çekilebilir, bünyenin kendini onarmasına izin verebilirsin — ama işler, borçlar ve fırsatlar seni beklemez.",
    secenekler: [
      {
        metin: "Her şeyi bırak, haftalarca dinlen.",
        baseBasariSansi: 88,
        ipucu: "Belirgin sağlık toparlanması; biraz ün ve gelir kaybı",
        basariliSonuc: {
          saglik: 16,
          mutluluk: 4,
          un: -3,
          mesaj: "Uzun bir dinlenmenin ardından bedenin yeniden toparlandı. Etraftakiler yokluğunu konuştu ama hayatta kaldın.",
        },
        basarisizSonuc: {
          saglik: 8,
          para: -4,
          mesaj: "Tam dinlenemedin, araya işler girdi; yine de en kötüsünü atlattın.",
        },
      },
      {
        metin: "Dişini sık, çalışmaya devam et.",
        baseBasariSansi: 45,
        ipucu: "İtibarını korur ama bedenin daha da çökebilir",
        basariliSonuc: {
          saglik: 3,
          un: 2,
          mesaj: "Kimseye zayıflık göstermedin. Bedenin zar zor dayandı.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -5,
          mesaj: "Ayakta kalmakta ısrar ettin ve bir sabah yığılıp kaldın. Durum daha da kötüleşti.",
        },
      },
    ],
  },
  {
    id: "st_hekim_cagir",
    kategori: "saglik",
    maxSaglik: 45,
    agirlik: 2.2,
    gorsel: "🩺",
    baslik: "Bir Hekim Lazım",
    metin:
      "Durumun ciddi. {bolge} sınırlarında iyi bir hekim bulmak mümkün ama ücreti tuzlu. Ucuz bir şifacıya da gidebilirsin — belki işe yarar, belki daha beter eder.",
    secenekler: [
      {
        metin: "İyi bir hekime muayene ol.",
        baseBasariSansi: 85,
        maliyet: 8,
        kilitAciklamasi: "Hekimin ücretini karşılayacak paran yok.",
        ipucu: "Pahalı ama güvenilir bir toparlanma",
        basariliSonuc: {
          para: -8,
          saglik: 18,
          mesaj: "Hekim doğru teşhisi koydu; birkaç hafta içinde belirgin şekilde iyileştin.",
        },
        basarisizSonuc: {
          para: -8,
          saglik: 6,
          mesaj: "Tedavi beklediğin kadar hızlı sonuç vermedi ama en azından kötüye gitmedin.",
        },
      },
      {
        metin: "Ucuz bir şifacıya git.",
        baseBasariSansi: 55,
        ipucu: "Ucuz; işe yarayabilir ya da durumu ağırlaştırabilir",
        basariliSonuc: {
          para: -2,
          saglik: 11,
          mesaj: "Şifacının otları ve lapaları beklenmedik biçimde işe yaradı; kendini toparlıyorsun.",
        },
        basarisizSonuc: {
          para: -2,
          saglik: -6,
          mutluluk: -3,
          mesaj: "Şifacının verdiği karışım midene oturdu; günlerce daha beter yattın.",
        },
      },
    ],
  },
  {
    id: "st_sifali_kaplica",
    kategori: "saglik",
    maxSaglik: 45,
    agirlik: 1.8,
    gorsel: "♨️",
    baslik: "Şifalı Sular",
    metin:
      "Yakınlarda şifalı olduğu söylenen sıcak su kaynakları var. Birkaç gün orada kalıp sulara girmek bedenine iyi gelebilir — hem de dinlenmiş olursun.",
    secenekler: [
      {
        metin: "Birkaç gün kaplıcada kal.",
        baseBasariSansi: 80,
        maliyet: 3,
        kilitAciklamasi: "Yol ve konaklama için bile paran yok.",
        ipucu: "Hem sağlık hem moral toparlanması",
        basariliSonuc: {
          para: -3,
          saglik: 13,
          mutluluk: 8,
          mesaj: "Sıcak sular kemiklerine kadar işledi. Hem bedenin hem moralin yerine geldi.",
        },
        basarisizSonuc: {
          para: -3,
          saglik: 5,
          mesaj: "Sular sandığın kadar mucizevi değildi ama biraz dinlenmiş oldun.",
        },
      },
      {
        metin: "Vaktin yok, evde ıhlamurla idare et.",
        baseBasariSansi: 78,
        basariliSonuc: {
          saglik: 7,
          mutluluk: 2,
          mesaj: "Sıcak bir içecek ve erken uyku; küçük ama gerçek bir toparlanma.",
        },
        basarisizSonuc: {
          saglik: 1,
          mesaj: "Pek fark etmedi; en azından kötüye de gitmedi.",
        },
      },
    ],
  },
  {
    id: "st_aile_bakimi",
    kategori: "saglik",
    maxSaglik: 45,
    agirlik: 2.0,
    gorsel: "🍲",
    baslik: "Ailenin Sofrasında",
    metin:
      "Hâlin yerlerde. {aile} seni bir süre yanlarına alıp doğru düzgün beslemeyi, üstüne titremeyi teklif ediyor. Gururunu bir kenara bırakman gerekecek.",
    secenekler: [
      {
        metin: "Teklifi kabul et, bakıma teslim ol.",
        baseBasariSansi: 86,
        ipucu: "Güçlü toparlanma; gururundan biraz verirsin",
        basariliSonuc: {
          saglik: 15,
          mutluluk: 6,
          un: -2,
          mesaj: "Sıcak yemek, temiz yatak ve üstüne titreyen biri. Haftalar içinde ayağa kalktın.",
        },
        basarisizSonuc: {
          saglik: 8,
          mesaj: "Tam istedikleri gibi olmadı ama yine de kendine geldin.",
        },
      },
      {
        metin: "Kabul etme, kendi başının çaresine bak.",
        baseBasariSansi: 50,
        basariliSonuc: {
          saglik: 5,
          un: 2,
          mesaj: "Kimseye muhtaç olmadan toparlandın; az ama kendi gücünle.",
        },
        basarisizSonuc: {
          saglik: -7,
          mutluluk: -4,
          mesaj: "İnat ettin ve yalnız başına daha da kötüleştin.",
        },
      },
    ],
  },
  {
    id: "st_dini_inziva",
    kategori: "din",
    maxSaglik: 45,
    agirlik: 1.6,
    gorsel: "🕯️",
    baslik: "İnzivaya Çekilmek",
    metin:
      "Bedenin de ruhun da yorgun. Bir ibadethanede ya da tenha bir köşede birkaç haftalık bir inzivaya çekilip perhiz, dua ve sessizlikle kendini onarabilirsin.",
    secenekler: [
      {
        metin: "İnzivaya çekil, perhiz ve dinlenme.",
        baseBasariSansi: 82,
        ipucu: "Sağlık ve moral toparlanır, itibarın biraz artar",
        basariliSonuc: {
          saglik: 13,
          mutluluk: 7,
          un: 2,
          ahlak: 3,
          mesaj: "Sadelik ve dinlenme bedenine iyi geldi; döndüğünde daha dingin ve daha güçlüydün.",
        },
        basarisizSonuc: {
          saglik: 5,
          mutluluk: 2,
          mesaj: "Zihnin dinlendi ama beden beklediğin kadar toparlanmadı.",
        },
      },
      {
        metin: "Dünya işlerini bırakamazsın.",
        baseBasariSansi: 60,
        basariliSonuc: {
          saglik: 3,
          mesaj: "Kısa molalarla idare ettin; ucu ucuna ayakta kaldın.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -3,
          mesaj: "Ne bedenine ne ruhuna zaman ayırdın; ikisi de daha da yıprandı.",
        },
      },
    ],
  },
  {
    id: "st_cografi_perhiz",
    kategori: "saglik",
    maxSaglik: 45,
    agirlik: 1.7,
    gorsel: "🥣",
    baslik: "Uzun Nekahet",
    metin:
      "Hekimler uzun bir nekahet dönemi öneriyor: hafif yemek, bol uyku, ağır işten uzak durmak. Aylar sürebilir ama seni ayakta tutacak tek şey bu olabilir.",
    secenekler: [
      {
        metin: "Nekahet dönemine uy, sabret.",
        baseBasariSansi: 84,
        ipucu: "Yavaş ama sağlam toparlanma; gelir kaybı",
        basariliSonuc: {
          saglik: 17,
          para: -5,
          mesaj: "Aylar süren dikkatli bir nekahetin sonunda bedenin gerçekten onarıldı.",
        },
        basarisizSonuc: {
          saglik: 9,
          para: -5,
          mutluluk: -2,
          mesaj: "Süreç can sıkıcıydı ve tam bitmeden hayata döndün; yine de en kötüsü geçti.",
        },
      },
      {
        metin: "Yarım bırak, işine dön.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 4,
          para: 2,
          mesaj: "Erken döndün, biraz kazandın; beden zar zor tuttu.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Nekahet yarıda kalınca nüksetti; daha derin bir çukura düştün.",
        },
      },
    ],
  },
  {
    id: "st_gezgin_doktor",
    kategori: "saglik",
    cag: "Sanayi Devrimi",
    maxSaglik: 45,
    agirlik: 2.0,
    gorsel: "💉",
    baslik: "Gezgin Doktor",
    metin:
      "Şehre modern usullerle çalışan bir doktor gelmiş; muayenehanesinde gerçek ilaçlar, temiz aletler var. Ücreti yüksek ama sonuçları ciddiye alınıyor.",
    secenekler: [
      {
        metin: "Modern doktora görün, ilaçları al.",
        baseBasariSansi: 88,
        maliyet: 10,
        kilitAciklamasi: "Doktorun ücretini ve ilaçları karşılayamıyorsun.",
        ipucu: "Pahalı ama en güvenilir toparlanma",
        basariliSonuc: {
          para: -10,
          saglik: 20,
          mesaj: "Doğru ilaç, doğru dozda. Kısa sürede belirgin biçimde toparlandın.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: 8,
          mesaj: "Tedavi tam oturmadı ama bünyeni ayakta tuttu.",
        },
      },
      {
        metin: "Eczaneden hazır şurup al, idare et.",
        baseBasariSansi: 66,
        maliyet: 3,
        kilitAciklamasi: "Şurubun parası bile yok.",
        basariliSonuc: {
          para: -3,
          saglik: 9,
          mesaj: "Hazır ilaç beklediğinden iyi çalıştı; toparlanıyorsun.",
        },
        basarisizSonuc: {
          para: -3,
          saglik: 1,
          mesaj: "Şurup pek işe yaramadı; para boşa gitti sayılır.",
        },
      },
    ],
  },
  {
    id: "st_otaci_karisimi",
    kategori: "saglik",
    cag: "Orta Çağ",
    maxSaglik: 45,
    agirlik: 1.9,
    gorsel: "🌿",
    baslik: "Otacının Karışımı",
    metin:
      "Köyün kenarında yaşayan yaşlı bir otacı, senin haline bakıp özel bir karışım hazırlayabileceğini söylüyor. Bilgisi eskilere dayanıyor ama herkes ona güvenmiyor.",
    secenekler: [
      {
        metin: "Karışımı yaptır ve tarifine harfiyen uy.",
        baseBasariSansi: 74,
        maliyet: 2,
        kilitAciklamasi: "Otacıya verecek paran yok.",
        ipucu: "Ucuz ve genelde etkili bir toparlanma",
        basariliSonuc: {
          para: -2,
          saglik: 14,
          mesaj: "Acı kokan karışım işe yaradı; birkaç hafta içinde belirgin şekilde güçlendin.",
        },
        basarisizSonuc: {
          para: -2,
          saglik: -3,
          mesaj: "Karışım midene dokundu; birkaç gün daha kötü hissettin, sonra normale döndün.",
        },
      },
      {
        metin: "Otacıya güvenme, sıcak çorbayla idare et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 6,
          mutluluk: 2,
          mesaj: "Basit ama işe yaradı; küçük bir toparlanma.",
        },
        basarisizSonuc: {
          saglik: 1,
          mesaj: "Pek bir değişiklik olmadı.",
        },
      },
    ],
  },
];
