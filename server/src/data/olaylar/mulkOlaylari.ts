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
    metin: "Küçük tarlan hasat zamanı geldi ama ekstra işçi tutacak paran kısıtlı. Ailenle birlikte mi uğraşırsın, yoksa birkaç günlüğüne el mi tutarsın?",
    secenekler: [
      {
        metin: "Kendi ellerinle, aileyle birlikte topla.",
        baseBasariSansi: 75,
        ipucu: "Bedava ama yorucu — mutluluk küçük bir bedel",
        basariliSonuc: {
          para: 8,
          mutluluk: -3,
          mesaj: "Sırtın ağrısa da hasat evine sağ salim girdi, hiçbir kuruş elden çıkmadı.",
        },
        basarisizSonuc: {
          para: 3,
          saglik: -4,
          mutluluk: -5,
          mesaj: "Yorgunluktan tökezleyip ayak bileğini burktun; hasadın bir kısmı tarlada çürüdü.",
        },
      },
      {
        metin: "Birkaç günlük yevmiyeli işçi tut.",
        baseBasariSansi: 85,
        maliyet: 6,
        ipucu: "Küçük bir masraf, garantiye yakın bir hasat",
        basariliSonuc: {
          para: 14,
          mesaj: "İşçiler hızlı çalıştı, hasat zamanında ve eksiksiz kaldırıldı.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -7,
          mesaj: "Tuttuğun işçiler yarım günde işi bırakıp gitti, ödediğin ücret boşa gitti.",
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
    metin: "Komşu tarla sahibi, senin küçük tarlanın sınırının bir karış içeri kaydığını iddia ediyor. Ortalık gerilmeye başladı.",
    secenekler: [
      {
        metin: "Köy büyüğüne git, meseleyi çözdür.",
        baseBasariSansi: 65,
        ipucu: "Adil ama zaman alıcı bir yol",
        basariliSonuc: {
          ahlak: 4,
          mutluluk: -2,
          mesaj: "Büyük senin lehine karar verdi, komşunla soğuk da olsa bir barış sağlandı.",
        },
        basarisizSonuc: {
          para: -5,
          mutluluk: -6,
          mesaj: "Büyük ortayı buldu, sınır taşını komşu lehine birkaç adım kaydırmak zorunda kaldın.",
        },
      },
      {
        metin: "Sert çık, taşı sen kendin dikersin.",
        baseBasariSansi: 40,
        maxAhlak: 70,
        ipucu: "Riskli — kazanırsan tarla senin, kaybedersen düşman kazanırsın",
        basariliSonuc: {
          para: 6,
          rakip_puani: 2,
          mesaj: "Komşu geri adım attı, sınır tartışmasız senin istediğin gibi kaldı.",
        },
        basarisizSonuc: {
          ahlak: -4,
          mutluluk: -8,
          rakip_puani: -6,
          mesaj: "Kavga büyüdü, köy senin aleyhine konuşmaya başladı; komşunla aranız hepten bozuldu.",
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
    metin: "Çiftliğinin bu yılki hasadı bereketli geçti. Köylüler seninle birlikte küçük bir şenlik yapmak istiyor.",
    secenekler: [
      {
        metin: "Şenliğe katıl, masrafı sen karşıla.",
        baseBasariSansi: 80,
        maliyet: 10,
        ipucu: "Mutluluk ve ün getirir, cebinden biraz gider",
        basariliSonuc: {
          un: 8,
          mutluluk: 10,
          mesaj: "Şenlik gece geç saatlere kadar sürdü, adın köyde iyilikle anıldı.",
        },
        basarisizSonuc: {
          para: -4,
          mutluluk: 2,
          mesaj: "Şenlik keyifli geçti ama hava bozunca yarıda kesildi, masrafın bir kısmı boşa gitti.",
        },
      },
      {
        metin: "Hasadı sessizce ambara kaldır, kutlamayı geç.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama sıradan",
        basariliSonuc: {
          para: 10,
          mesaj: "Hasadın tamamını sessizce depoladın, kâr hanene fazladan bir kaç akçe daha yazıldı.",
        },
        basarisizSonuc: {
          para: 4,
          mutluluk: -3,
          mesaj: "Şenliğe katılmayışın köylülerin diline düştü, biraz soğuk karşılandın.",
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
    metin: "Çiftliğinin bir köşesinde zararlı böcekler ürüyor. Hemen müdahale etmezsen hasadın bir kısmını kaybedebilirsin.",
    secenekler: [
      {
        metin: "Deneyimli bir otacı/ilaç tut, parasını öde.",
        baseBasariSansi: 78,
        maliyet: 12,
        ipucu: "Pahalı ama etkili",
        basariliSonuc: {
          para: 6,
          mesaj: "Zararlılar temizlendi, hasadın büyük kısmı kurtuldu.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -4,
          mesaj: "Tuttuğun kişi işin üstesinden gelemedi, hem parayı hem hasadın bir kısmını kaybettin.",
        },
      },
      {
        metin: "Riske gir, kendi yöntemlerinle uğraş.",
        baseBasariSansi: 45,
        ipucu: "Bedava ama şansa bağlı",
        basariliSonuc: {
          para: 4,
          mesaj: "Uykusuz birkaç gecenin sonunda istilayı kendi başına atlattın.",
        },
        basarisizSonuc: {
          para: -14,
          mutluluk: -6,
          mesaj: "Zararlılar tarlanın büyük kısmını kemirdi, o yılki hasadın büyük bölümü heba oldu.",
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
    metin: "Hanında kalan sarhoş bir misafir diğer müşterilerle kavgaya tutuşmak üzere. Han sahibi olarak ne yaparsın?",
    secenekler: [
      {
        metin: "Kendi elinle sakinleştirmeye çalış.",
        baseBasariSansi: 55,
        ipucu: "Riskli — kavgaya karışabilirsin",
        basariliSonuc: {
          un: 5,
          mutluluk: 3,
          mesaj: "Misafiri sakinleştirmeyi başardın, diğer müşteriler senden etkilendi.",
        },
        basarisizSonuc: {
          saglik: -8,
          para: -6,
          mesaj: "Kavgaya karıştın, birkaç masa devrildi; hem canın hem cebin yandı.",
        },
      },
      {
        metin: "Kapıya götür, hanından at.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama misafirin dilinde kalırsın",
        basariliSonuc: {
          mutluluk: -1,
          para: 4,
          mesaj: "Sorunlu misafiri kapı dışarı ettin, hanın huzuru geri döndü.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Misafir kapıda direndi, kötü bir sahne herkesin gözü önünde yaşandı.",
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
    metin: "Hanında bir gece geçiren ünlü bir gezgin, senin hanından övgüyle bahsedeceğini söylüyor — eğer memnun kalırsa.",
    secenekler: [
      {
        metin: "En iyi odayı ve sofrayı sun, masrafına aldırma.",
        baseBasariSansi: 75,
        maliyet: 8,
        ipucu: "Pahalı ama uzun vadede ün getirebilir",
        basariliSonuc: {
          un: 10,
          para: 6,
          mesaj: "Gezgin gittiği her yerde hanından övgüyle söz etti, yeni müşteriler kapını aşındırmaya başladı.",
        },
        basarisizSonuc: {
          para: -8,
          mesaj: "Gezgin gördüğü hiçbir şeyden etkilenmedi, masrafın karşılıksız kaldı.",
        },
      },
      {
        metin: "Standart hizmeti sun, fazladan uğraşma.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, ama büyük bir fırsatı kaçırabilirsin",
        basariliSonuc: {
          para: 5,
          mesaj: "Gezgin sessizce kaldı ve ayrıldı, ne övgü ne şikâyet — sıradan bir gece geçti.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Gezgin hizmetten hoşnut kalmadı, dönüşte hanın hakkında sitemkâr birkaç söz sarf etti.",
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
    metin: "Atölyenin ocağından sıçrayan bir kıvılcım kuru saman yığınını tutuşturdu. Hızla müdahale etmen gerekiyor.",
    secenekler: [
      {
        metin: "Elindeki suyla hemen üstüne git.",
        baseBasariSansi: 60,
        ipucu: "Riskli ama hızlı",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Alevleri daha büyümeden söndürdün, atölye küçük bir kurumla kurtuldu.",
        },
        basarisizSonuc: {
          para: -16,
          saglik: -6,
          mesaj: "Ateş bir köşeyi tamamen sardı, hem malzeme kayboldu hem elin yandı.",
        },
      },
      {
        metin: "Komşu esnafı yardıma çağır.",
        baseBasariSansi: 82,
        maliyet: 4,
        ipucu: "Güvenli, küçük bir minnet borcuyla",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Birkaç komşu esnafla birlikte yangını çabucak kontrol altına aldınız.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Yardım gelene kadar ateş bir köşeyi kül etti, zarar yine de sınırlı kaldı.",
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
    metin: "Bir tüccar kervanı, kısa sürede teslim edilmesi gereken büyük bir silah/alet siparişi teklif ediyor. Riskli ama kazançlı görünüyor.",
    secenekler: [
      {
        metin: "Siparişi kabul et, gece gündüz çalış.",
        baseBasariSansi: 60,
        ipucu: "Büyük kazanç ama yorucu ve riskli",
        basariliSonuc: {
          mutluluk: -9,
          para: 22,
          saglik: -5,
          un: 2,
          mesaj: "Siparişi zamanında yetiştirdin, tüccar sözünü tuttu ve cömertçe ödedi.",
        },
        basarisizSonuc: {
          para: -8,
          un: -4,
          mesaj: "Süreyi tutturamadın, tüccar siparişi iptal edip başka bir demirciye gitti.",
        },
      },
      {
        metin: "Nazikçe reddet, mevcut işlerine devam et.",
        baseBasariSansi: 95,
        ipucu: "Güvenli, fırsat kaçar",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Riske girmedin, atölyen alışılmış tempoda işlemeye devam etti.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kaçırdığın fırsat aklından bir süre çıkmadı.",
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
    metin: "Kervanının kervancıbaşısı iki rota sunuyor: dağlardan geçen kısa ama tehlikeli bir yol, ya da uzun ama güvenli bir kıyı yolu.",
    secenekler: [
      {
        metin: "Kısa, tehlikeli dağ yolunu seç.",
        baseBasariSansi: 55,
        ipucu: "Erken varış, büyük kazanç ihtimali — ama soygun riski",
        basariliSonuc: {
          mutluluk: -9,
          un: -3,
          para: 22,
          mesaj: "Kervan dağ yolundan sağ salim ve hızlıca geçti, mallar taze fiyattan satıldı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -18,
          mesaj: "Dağ geçidinde eşkıyalar kervanın bir kısmını yağmaladı.",
        },
      },
      {
        metin: "Uzun ama güvenli kıyı yolunu seç.",
        baseBasariSansi: 85,
        ipucu: "Daha az kazanç, daha az risk",
        basariliSonuc: {
          para: 8,
          mesaj: "Kervan uzun ama sorunsuz bir yolculuğun ardından hedefe ulaştı.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "Kıyı yolunda beklenmedik bir gecikme, kârın bir kısmını yedi.",
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
    metin: "Güvendiğin kervancıbaşının son yolculukta hesapları bulanıklaştırdığından şüpheleniyorsun.",
    secenekler: [
      {
        metin: "Defterleri açıkça kontrol et, hesap sor.",
        baseBasariSansi: 65,
        ipucu: "Doğruysa parayı geri alırsın, yanılırsan güveni sarsarsın",
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          para: 12,
          ahlak: 1,
          mesaj: "Şüphen doğru çıktı, eksik hesapları geri aldın; kervancıbaşı bir daha risk almadı.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -8,
          rakip_puani: 3,
          mesaj: "Hesaplar temiz çıktı, boşuna suçlamış olmanın kırgınlığı kervanın havasına sindi.",
        },
      },
      {
        metin: "Görmezden gel, güvenmeye devam et.",
        baseBasariSansi: 80,
        ipucu: "Rahat ama riski göze alırsın",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Şüphenin bir kuruntu olduğu anlaşıldı, kervan her zamanki gibi işlemeye devam etti.",
        },
        basarisizSonuc: {
          para: -14,
          mesaj: "Kervancıbaşı fark edilmeden ceplerini doldurmaya devam etmiş.",
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
    metin: "Gölgeler arasından biri, karaborsa deponu kullanarak çok daha büyük ve çok daha riskli bir işe ortak olmanı öneriyor.",
    secenekler: [
      {
        metin: "Teklifi kabul et, derine dal.",
        baseBasariSansi: 50,
        ipucu: "Büyük para, büyük risk — iz bırakır",
        basariliSonuc: {
          para: 35,
          ahlak: -10,
          suc_artis: 8,
          mesaj: "İş, riskli ama sorunsuz kapandı; cebine büyük bir meblağ girdi.",
        },
        basarisizSonuc: {
          para: -10,
          suc_artis: 12,
          mesaj: "İş çığırından çıktı, hem para kaybettin hem de gözler artık üstünde.",
        },
      },
      {
        metin: "Teklifi geri çevir, mevcut düzenine devam et.",
        baseBasariSansi: 90,
        ipucu: "Daha güvenli, kazanç sınırlı kalır",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Riske girmedin, karaborsa deponu her zamanki sessiz tempoda işlemeye devam etti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Reddettiğin teklifin başka birine gidip büyük kâr getirdiğini duydun, içini bir pişmanlık kapladı.",
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
    metin: "Deponda çalışan biri, mahalle bekçilerine bilgi sızdırdığından şüpheleniliyor. Ne yaparsın?",
    secenekler: [
      {
        metin: "Kişiyi hemen işten çıkar, iz sürmesine izin verme.",
        baseBasariSansi: 70,
        ipucu: "Temkinli — aranmanı bir miktar düşürür",
        basariliSonuc: {
          suc_artis: -6,
          para: -4,
          mesaj: "Şüpheliyi sessizce uzaklaştırdın, depo bir süreliğine daha güvenli hissettiriyor.",
        },
        basarisizSonuc: {
          suc_artis: 6,
          mesaj: "Çıkardığın kişi öfkeyle gerçekten bekçilere gitti, üstündeki gözler arttı.",
        },
      },
      {
        metin: "Görmezden gel, işlere devam et.",
        baseBasariSansi: 55,
        ipucu: "Riskli — doğruysa pahalıya patlar",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Şüphe asılsız çıktı, depo sorunsuz işlemeye devam etti.",
        },
        basarisizSonuc: {
          suc_artis: 14,
          para: -12,
          mesaj: "Şüphen doğruymuş — bekçiler depoya bir baskın denemesi yaptı, zar zor sıyırdın.",
        },
      },
    ],
  },
];
