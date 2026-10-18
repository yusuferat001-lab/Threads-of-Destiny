import { OlayTanimi } from "./types";

/**
 * Sahip olunan piyasa mülklerine (mulkler.ts) bağlı flavor/karar olayları.
 * Bu olaylar normal rastgele havuzdan TAMAMEN dışlanır (bkz. olaySecici.ts
 * uygunMu, mulkOlayi alanı) — sadece gameEngine.ts senaryoUret'teki periyodik
 * "mülk olayı" kaskadı, ilgili mülkü sahiplenen bir karaktere zorlanan olay
 * olarak sunar. Her olayın mulkOlayi alanı, ait olduğu mülk türüyle eşleşir.
 */
export const OLAY_MULK: OlayTanimi[] = [
  // ============================================================
  // KÜÇÜK TARLA
  // ============================================================
  {
    id: "mulk_kucuk_tarla_aile_emegi",
    kategori: "ticaret",
    mulkOlayi: "kucuk_tarla",
    gorsel: "🥕",
    baslik: "Tarlada Emek",
    metin: "Küçük tarlanın hasat zamanı geldi, işçiye paran kısıtlı. Aileyle mi uğraşırsın, el mi tutarsın?",
    secenekler: [
      {
        metin: "Aileyle birlikte kendin topla.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: 8,
          mutluluk: -3,
          mesaj: "Sırtın ağrıdı ama hasat sağ girdi, kuruş çıkmadı.",
        },
        basarisizSonuc: {
          para: 3,
          saglik: -4,
          mutluluk: -5,
          mesaj: "Bileğini burktun; hasadın bir kısmı tarlada çürüdü.",
        },
      },
      {
        metin: "Birkaç günlük işçi tut.",
        baseBasariSansi: 85,
        maliyet: 6,
        basariliSonuc: {
          para: 14,
          mesaj: "İşçiler hızlı çalıştı; hasat zamanında kalktı.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -7,
          mesaj: "İşçiler yarım günde bırakıp gitti; ücret boşa gitti.",
        },
      },
    ],
  },
  {
    id: "mulk_kucuk_tarla_sinir_anlasmazligi",
    kategori: "sosyal",
    mulkOlayi: "kucuk_tarla",
    gorsel: "🧑‍🌾",
    baslik: "Sınır Taşı Tartışması",
    metin: "Komşu, tarlanın sınırının bir karış içeri kaydığını iddia ediyor. Ortalık geriliyor.",
    secenekler: [
      {
        metin: "Köy büyüğüne git, çözdür.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 4,
          mutluluk: -2,
          mesaj: "Büyük seni haklı buldu; komşunla soğuk bir barış sağlandı.",
        },
        basarisizSonuc: {
          para: -5,
          mutluluk: -6,
          mesaj: "Büyük ortayı buldu; sınır taşını komşu lehine kaydırdın.",
        },
      },
      {
        metin: "Sert çık, taşı kendin dik.",
        baseBasariSansi: 40,
        maxAhlak: 70,
        basariliSonuc: {
          para: 6,
          rakip_puani: 2,
          mesaj: "Komşu geri adım attı; sınır senin istediğin gibi kaldı.",
        },
        basarisizSonuc: {
          ahlak: -4,
          mutluluk: -8,
          rakip_puani: -6,
          mesaj: "Kavga büyüdü, köy aleyhine konuştu; komşunla aran bozuldu.",
        },
      },
    ],
  },

  // ============================================================
  // ÇİFTLİK
  // ============================================================
  {
    id: "mulk_ciftlik_hasat_senligi",
    kategori: "ticaret",
    mulkOlayi: "ciftlik",
    gorsel: "🌾",
    baslik: "Hasat Şenliği",
    metin: "Çiftliğin hasadı bereketli geçti. Köylüler seninle küçük bir şenlik yapmak istiyor.",
    secenekler: [
      {
        metin: "Şenliğe katıl, masrafı karşıla.",
        baseBasariSansi: 80,
        maliyet: 10,
        basariliSonuc: {
          un: 8,
          mutluluk: 10,
          mesaj: "Şenlik geç saate kadar sürdü; adın köyde iyilikle anıldı.",
        },
        basarisizSonuc: {
          para: -4,
          mutluluk: 2,
          mesaj: "Hava bozdu, şenlik yarıda kaldı; masraf kısmen boşa gitti.",
        },
      },
      {
        metin: "Hasadı depola, kutlamayı geç.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 10,
          mesaj: "Hasadı sessizce depoladın; kâra birkaç akçe daha yazıldı.",
        },
        basarisizSonuc: {
          para: 4,
          mutluluk: -3,
          mesaj: "Şenliğe katılmayışın dillere düştü; soğuk karşılandın.",
        },
      },
    ],
  },
  {
    id: "mulk_ciftlik_haslarat_istilasi",
    kategori: "ticaret",
    mulkOlayi: "ciftlik",
    gorsel: "🐛",
    baslik: "Zararlı İstilası",
    metin: "Çiftliğin köşesinde zararlı böcekler ürüyor. Müdahale etmezsen hasadın bir kısmı gidebilir.",
    secenekler: [
      {
        metin: "Otacı/ilaç tut, öde.",
        baseBasariSansi: 78,
        maliyet: 12,
        basariliSonuc: {
          para: 6,
          mesaj: "Zararlılar temizlendi; hasadın büyük kısmı kurtuldu.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -4,
          mesaj: "Tuttuğun kişi başaramadı; para ve hasadın bir kısmı gitti.",
        },
      },
      {
        metin: "Riske gir, kendin uğraş.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 4,
          mesaj: "Uykusuz gecelerin sonunda istilayı kendin atlattın.",
        },
        basarisizSonuc: {
          para: -14,
          mutluluk: -6,
          mesaj: "Zararlılar tarlayı kemirdi; hasadın çoğu heba oldu.",
        },
      },
    ],
  },

  // ============================================================
  // ŞEHİR HANI
  // ============================================================
  {
    id: "mulk_han_zor_misafir",
    kategori: "sosyal",
    mulkOlayi: "han",
    gorsel: "🍺",
    baslik: "Zor Bir Misafir",
    metin: "Hanındaki sarhoş misafir müşterilerle kavgaya tutuşmak üzere. Ne yaparsın?",
    secenekler: [
      {
        metin: "Kendin sakinleştirmeye çalış.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 5,
          mutluluk: 3,
          mesaj: "Misafiri sakinleştirdin; müşteriler etkilendi.",
        },
        basarisizSonuc: {
          saglik: -8,
          para: -6,
          mesaj: "Kavgaya karıştın, masalar devrildi; canın ve cebin yandı.",
        },
      },
      {
        metin: "Kapıya götür, dışarı at.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: -1,
          para: 4,
          mesaj: "Misafiri kapı dışarı ettin; hanın huzuru döndü.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Misafir kapıda direndi; herkesin önünde kötü sahne oldu.",
        },
      },
    ],
  },
  {
    id: "mulk_han_unlu_gezgin",
    kategori: "sosyal",
    mulkOlayi: "han",
    gorsel: "🧳",
    baslik: "Ünlü Bir Gezgin",
    metin: "Hanında bir gece geçiren ünlü gezgin, memnun kalırsa hanını övgüyle anacağını söylüyor.",
    secenekler: [
      {
        metin: "En iyisini sun, masrafa bakma.",
        baseBasariSansi: 75,
        maliyet: 8,
        basariliSonuc: {
          un: 10,
          para: 6,
          mesaj: "Gezgin her yerde hanını övdü; yeni müşteriler geldi.",
        },
        basarisizSonuc: {
          para: -8,
          mesaj: "Gezgin etkilenmedi; masrafın karşılıksız kaldı.",
        },
      },
      {
        metin: "Standart hizmet sun.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 5,
          mesaj: "Gezgin sessizce kalıp ayrıldı; ne övgü ne şikâyet.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Gezgin memnun kalmadı; hanın hakkında sitem etti.",
        },
      },
    ],
  },

  // ============================================================
  // DEMİRCİ ATÖLYESİ
  // ============================================================
  {
    id: "mulk_demirci_yangin_riski",
    kategori: "ticaret",
    mulkOlayi: "demirci",
    gorsel: "🔥",
    baslik: "Ocaktan Sıçrayan Kıvılcım",
    metin: "Ocaktan sıçrayan kıvılcım kuru saman yığınını tutuşturdu. Hemen müdahale etmelisin.",
    secenekler: [
      {
        metin: "Suyla hemen üstüne git.",
        baseBasariSansi: 60,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Alevleri büyümeden söndürdün; sadece biraz kurum kaldı.",
        },
        basarisizSonuc: {
          para: -16,
          saglik: -6,
          mesaj: "Ateş bir köşeyi sardı; malzeme gitti, elin yandı.",
        },
      },
      {
        metin: "Komşu esnafı yardıma çağır.",
        baseBasariSansi: 82,
        maliyet: 4,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Komşu esnafla yangını çabucak kontrol altına aldınız.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Yardım gelmeden ateş bir köşeyi kül etti; zarar sınırlı.",
        },
      },
    ],
  },
  {
    id: "mulk_demirci_buyuk_siparis",
    kategori: "ticaret",
    mulkOlayi: "demirci",
    gorsel: "⚒️",
    baslik: "Büyük Sipariş",
    metin: "Bir kervan, kısa sürede teslim edilecek büyük bir silah/alet siparişi teklif ediyor. Riskli ama kazançlı.",
    secenekler: [
      {
        metin: "Kabul et, gece gündüz çalış.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: -9,
          para: 22,
          saglik: -5,
          un: 2,
          mesaj: "Siparişi zamanında yetiştirdin; tüccar cömertçe ödedi.",
        },
        basarisizSonuc: {
          para: -8,
          un: -4,
          mesaj: "Süreyi kaçırdın; tüccar başka demirciye gitti.",
        },
      },
      {
        metin: "Nazikçe reddet, işine devam et.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Riske girmedin; atölye her zamanki tempoda sürdü.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kaçırdığın fırsat bir süre aklından çıkmadı.",
        },
      },
    ],
  },

  // ============================================================
  // TİCARET KERVANI
  // ============================================================
  {
    id: "mulk_kervan_rota_karari",
    kategori: "ticaret",
    mulkOlayi: "kervan",
    gorsel: "🐫",
    baslik: "Hangi Rota?",
    metin: "Kervancıbaşı iki rota sunuyor: dağdan kısa ama tehlikeli yol, ya da uzun ama güvenli kıyı yolu.",
    secenekler: [
      {
        metin: "Kısa, tehlikeli dağ yolu.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -9,
          un: -3,
          para: 22,
          mesaj: "Kervan dağı hızlıca aştı; mallar taze fiyattan satıldı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -18,
          mesaj: "Dağ geçidinde eşkıyalar kervanın bir kısmını yağmaladı.",
        },
      },
      {
        metin: "Uzun, güvenli kıyı yolu.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 8,
          mesaj: "Kervan uzun ama sorunsuz yolculukla hedefe ulaştı.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "Kıyı yolunda beklenmedik gecikme kârın bir kısmını yedi.",
        },
      },
    ],
  },
  {
    id: "mulk_kervan_ihanet_suphesi",
    kategori: "ticaret",
    mulkOlayi: "kervan",
    gorsel: "🕵️",
    baslik: "Kervancıbaşından Şüphe",
    metin: "Güvendiğin kervancıbaşının son yolculukta hesapları bulandırdığından şüpheleniyorsun.",
    secenekler: [
      {
        metin: "Defterleri aç, hesap sor.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 12,
          ahlak: 1,
          mesaj: "Şüphen doğruydu; eksik parayı geri aldın.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -8,
          rakip_puani: 3,
          mesaj: "Hesaplar temiz çıktı; boş suçlama kervanı gerdi.",
        },
      },
      {
        metin: "Güvenmeye devam et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Şüphe kuruntu çıktı; kervan her zamanki gibi sürdü.",
        },
        basarisizSonuc: {
          para: -14,
          mesaj: "Kervancıbaşı sessizce ceplerini doldurmaya devam etmiş.",
        },
      },
    ],
  },

  // ============================================================
  // KARABORSA DEPOSU
  // ============================================================
  {
    id: "mulk_karaborsa_buyuk_teklif",
    kategori: "ticaret",
    mulkOlayi: "karaborsa",
    gorsel: "🕶️",
    baslik: "Büyük Bir Teklif",
    metin: "Gölgelerden biri, karaborsa deponla çok daha büyük ve riskli bir işe ortak olmanı öneriyor.",
    secenekler: [
      {
        metin: "Kabul et, derine dal.",
        baseBasariSansi: 50,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 35,
          ahlak: -10,
          mesaj: "İş riskli ama sorunsuz kapandı; cebine büyük meblağ girdi.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          para: -10,
          mesaj: "İş çığırından çıktı; para kaybettin, gözler üstünde.",
        },
      },
      {
        metin: "Reddet, düzenine devam et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Riske girmedin; depo her zamanki sessiz tempoda sürdü.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Teklif başkasına büyük kâr getirmiş; pişman oldun.",
        },
      },
    ],
  },
  {
    id: "mulk_karaborsa_muhbir_suphesi",
    kategori: "ticaret",
    mulkOlayi: "karaborsa",
    gorsel: "👁️",
    baslik: "Muhbir Şüphesi",
    metin: "Deponda çalışan birinin bekçilere bilgi sızdırdığından şüpheleniliyor. Ne yaparsın?",
    secenekler: [
      {
        metin: "Hemen işten çıkar.",
        baseBasariSansi: 70,
        basariliSonuc: {
          suc_artis: -6,
          para: -4,
          mesaj: "Şüpheliyi sessizce uzaklaştırdın; depo bir süre güvende.",
        },
        basarisizSonuc: {
          mesaj: "Kovduğun kişi öfkeyle bekçilere gitti; gözler arttı.",
        },
      },
      {
        metin: "Görmezden gel, işe devam et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Şüphe asılsızdı; depo sorunsuz sürdü.",
        },
        basarisizSonuc: {
          suc_sinifi: "orta",
          para: -12,
          mesaj: "Şüphen doğruymuş; bekçiler baskın denedi, zor sıyrıldın.",
        },
      },
    ],
  },
];
