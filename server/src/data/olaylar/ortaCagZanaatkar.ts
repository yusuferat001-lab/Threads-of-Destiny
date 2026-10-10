import type { OlayTanimi } from "./types";

/**
 * Orta Çağ Zanaatkâr'a özel, kariyer yolundan bağımsız standalone havuz
 * (yol seçilmeden önce de, seçildikten sonra da çıkabilir — hiçbir yol
 * etiketi gerektirmez). NOT (iskelet, 2026-09): 6 olayla başlatıldı,
 * mevcut mesleklerin standalone havuzları (18-26 olay) seviyesine
 * çıkarılması sonraki bir turun işi.
 */
export const OLAY_ORTACAG_ZANAATKAR: OlayTanimi[] = [
  {
    id: "oc_zanaatkar_musteri_pazarligi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Sert Bir Pazarlık",
    metin: "Bir müşteri emeğini yarı fiyatına almaya çalışıyor.",
    secenekler: [
      {
        metin: "Fiyatında dur, satışı göze al.",
        baseBasariSansi: 62,
        basariliSonuc: {
          para: 8,
          un: 4,
          mesaj: "Müşteri fiyatını kabul etti; değerini bildin.",
          detay: "Değerini bilen, bildirir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Müşteri başka ustaya gitti.",
          detay: "Her pazarlık kazanılmaz.",
        },
      },
      {
        metin: "Fiyatı düşür, işi kaçırma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 3,
          mutluluk: -2,
          mesaj: "İşi aldın ama tam karşılığı alamadın.",
          detay: "Az kazanmak, hiçten iyidir.",
        },
        basarisizSonuc: {
          para: 1,
          mutluluk: -3,
          mesaj: "İndirime rağmen müşteri vazgeçti.",
          detay: "Bazıları hiçbir fiyata razı olmaz.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_malzeme_kitligi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Malzeme Kıtlığı",
    metin: "Ham madde kıtlaştı; tüccarlar fiyatı ikiye katladı.",
    secenekler: [
      {
        metin: "Pahalıya da olsa malzemeyi al.",
        baseBasariSansi: 75,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          uretim_kapasitesi_artis: 3,
          mesaj: "İşin aksamadı, müşteriler memnun kaldı.",
          detay: "Süreklilik itibarın temelidir.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -3,
          mesaj: "Malzeme kalitesiz çıktı; para boşa gitti.",
          detay: "Kıtlıkta bazıları fırsatçı olur.",
        },
      },
      {
        metin: "Düşük kaliteli malzemeyle idare et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 4,
          mesaj: "İdare ettin, kimse fark etmedi.",
          detay: "Yaratıcılık sıkıntıdan doğar.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -3,
          mesaj: "Düşük kalite fark edildi; müşteriler küstü.",
          detay: "Her idarenin bedeli vardır.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_rakip_usta",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Rakip Ustanın Gölgesi",
    metin: "Yeni açılan bir atölye müşterilerini çekmeye başladı.",
    secenekler: [
      {
        metin: "Daha iyi hizmet ve kaliteyle öne çık.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 8,
          para: 6,
          mesaj: "Kaliteyle yarıştın; müşterilerin döndü.",
          detay: "İyilik en kalıcı reklamdır.",
        },
        basarisizSonuc: {
          para: -4,
          mutluluk: -3,
          mesaj: "Çaban yetmedi; birkaç müşteri kaybettin.",
          detay: "Rekabet bazen acımasızdır.",
        },
      },
      {
        metin: "Fiyat kırarak rekabet et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: -3,
          mesaj: "Müşteriler döndü ama kâr marjın daraldı.",
          detay: "Kalmak, kazanmaktan önemlidir.",
        },
        basarisizSonuc: {
          para: -6,
          un: -2,
          mesaj: "Ucuzluk yetmedi; 'ucuz iş' diye anılmaya başladın.",
          detay: "Fiyat kırmak hep işe yaramaz.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_yangin_riski",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minAhlak: -100,
    gorsel: "🔥",
    baslik: "Ocaktan Sıçrayan Kıvılcım",
    metin: "Ocaktan sıçrayan kıvılcım saman yığınına düştü.",
    secenekler: [
      {
        metin: "Hemen müdahale et.",
        baseBasariSansi: 78,
        basariliSonuc: {
          saglik: -3,
          mesaj: "Ateşi söndürdün; hafif yanıkla kurtuldun.",
          detay: "Hızlı refleks her şeyi kurtarır.",
        },
        basarisizSonuc: {
          para: -14,
          saglik: -8,
          mesaj: "Atölyenin bir köşesi yandı; onarım pahalı.",
          detay: "Ateşle uğraşanın düşmanı ateştir.",
        },
      },
      {
        metin: "Kıvılcım kendiliğinden söner, bekle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kıvılcım söndü; bu sefer şanslıydın.",
          detay: "Bazı riskler görmezden gelinince geçer.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -10,
          mesaj: "Ateş yayıldı; atölyenin çoğu kül oldu.",
          detay: "Kader bazen affetmez.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_soylu_hedive",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minUn: 30,
    gorsel: "🔨",
    baslik: "Soylunun Hediyesi",
    metin: "Bir soylu, işinden etkilenip sana özel bir hediye ısmarlıyor.",
    secenekler: [
      {
        metin: "Elinden gelenin en iyisini yap.",
        baseBasariSansi: 68,
        maliyet: 8,
        basariliSonuc: {
          para: 20,
          un: 10,
          mesaj: "Soylu çok memnun; adın saraya ulaştı.",
          detay: "Doğru kişiyi etkilemek kapı açar.",
        },
        basarisizSonuc: {
          para: -8,
          un: -6,
          mesaj: "Soylu beğenmedi, ödemeyi de geciktirdi.",
          detay: "Yüksek beklenti, yüksek hayal kırıklığı.",
        },
      },
      {
        metin: "Nazikçe reddet, riske girme.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Reddin kabul gördü; sakin bir gün geçirdin.",
          detay: "Her fırsat kabul edilmez.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Soylu reddi hakaret sayıp senden kötü söz etti.",
          detay: "Bazı reddin bedeli itibardır.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_ekip_hirsizligi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEkip: true,
    gorsel: "🔨",
    baslik: "Kayıp Malzeme",
    metin: "Atölyenden değerli bir malzeme kayboldu; şüphe bir çalışanında.",
    secenekler: [
      {
        metin: "Sessizce araştır, suçlama.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 4,
          mesaj: "Malzemeyi bir köşede buldun; kimseyi suçlamadın.",
          detay: "Sabırlı araştırma işe yarar.",
        },
        basarisizSonuc: {
          para: -8,
          dost_puani: -4,
          mesaj: "Malzeme bulunamadı; atölyede güvensizlik doğdu.",
          detay: "Şüphe dostluğu kemirir.",
        },
      },
      {
        metin: "Herkesin önünde sor, itiraf etmesini iste.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 6,
          dost_puani: 2,
          mesaj: "Suçlu utanıp malzemeyi getirdi; mesele kapandı.",
          detay: "Açıklık bazen sessizlikten etkilidir.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Kimse itiraf etmedi; atölyede gerginlik arttı.",
          detay: "Açık suçlama herkesi küstürür.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_pazar_gunu",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Pazar Günü Kalabalığı",
    metin: "Pazar günü tezgâhını kurdun; kalabalık büyük ama rakipler de çok.",
    secenekler: [
      {
        metin: "Yüksek sesle işini tanıt.",
        baseBasariSansi: 68,
        basariliSonuc: { para: 8, un: 3, mesaj: "Sesin dikkat çekti; yeni müşteriler kazandın.", detay: "Bazen gürültü işe yarar." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Kalabalık ilgisiz kaldı; gün sakin geçti.", detay: "Her pazar bereketli olmaz." },
      },
      {
        metin: "Kaliteli işçiliğinle sessizce dikkat çek.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 5,
          mesaj: "Sessiz duruşun merak uyandırdı; müşteriler geldi.",
          detay: "Kalite kendini sessizce anlatır.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kimse fark etmedi; gün geçti.",
          detay: "Sessizlik fark edilmeyi de engeller.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_alet_calinmasi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Aletlerin Çalındı",
    metin: "Gece atölyene giren biri en değerli aletlerini çaldı.",
    secenekler: [
      {
        metin: "Yeni alet için borç al.",
        baseBasariSansi: 70,
        maliyet: 12,
        basariliSonuc: { para: -12, mesaj: "Yeni aletlerle işine kaldığın yerden devam ettin.", detay: "Her kayıp yeni bir başlangıçtır." },
        basarisizSonuc: { para: -12, mutluluk: -4, mesaj: "Borç bulmak zor oldu; işin bir süre aksadı.", detay: "Kayıplar zincirleme gelir." },
      },
      {
        metin: "Eski yedek aletlerle idare et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: -2,
          mesaj: "İş yavaşladı ama borca girmedin.",
          detay: "İdare etmek, harcamaktan iyidir.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -3,
          mesaj: "Eski aletler yetmedi; siparişler elinden gitti.",
          detay: "İdare her zaman yetmez.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_hava_kotu",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🌧️",
    baslik: "Kötü Hava Koşulları",
    metin: "Dinmeyen yağmur malzeme tedarikini ve müşteri akışını aksatıyor.",
    secenekler: [
      {
        metin: "Sabırla bekle, işine devam et.",
        baseBasariSansi: 80,
        basariliSonuc: { mesaj: "Hava düzelene dek idare ettin; büyük kayıp yok.", detay: "Sabır en ucuz çözümdür." },
        basarisizSonuc: { para: -6, mutluluk: -2, mesaj: "Uzun süren kötü hava işlerini aksattı.", detay: "Doğa bazen acımasızdır." },
      },
      {
        metin: "Boş vakti atölyeni düzenlemeye ayır.",
        baseBasariSansi: 65,
        basariliSonuc: {
          uretim_kapasitesi_artis: 3,
          mesaj: "Vakti değerlendirdin; atölyen düzene girdi.",
          detay: "Durgunluk bazen fırsattır.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Düzenleme beklediğinden yorucu çıktı.",
          detay: "Her düzenleme kolay gitmez.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_komsu_atolye_yangini",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔥",
    baslik: "Komşu Atölyede Yangın",
    metin: "Yandaki atölyede çıkan yangın senin atölyene de sıçrayabilir.",
    secenekler: [
      {
        metin: "Yangını söndürmeye yardım et.",
        baseBasariSansi: 65,
        basariliSonuc: { saglik: -4, dost_puani: 8, un: 4, mesaj: "Yangın yayılmadı; komşuların minnettar.", detay: "Zor günde yanında olan dost kazanır." },
        basarisizSonuc: { para: -10, saglik: -6, mesaj: "Yangın atölyene de sıçradı; hafif hasar aldın.", detay: "Ateş komşuyu da vurur." },
      },
      {
        metin: "Kendi atölyeni koru, yardıma gitme.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mesaj: "Atölyeni korudun ama komşuların unutmadı.",
          detay: "Korunmak bazen yalnız kalmaktır.",
        },
        basarisizSonuc: {
          dost_puani: -6,
          mesaj: "Yardım etmediğin için komşuların küstü.",
          detay: "Uzak durmanın bedeli vardır.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_dedikodu_hedefi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Çarşıda Dedikodu",
    metin: "Çarşıda işinle ilgili asılsız bir dedikodu dolaşıyor.",
    secenekler: [
      {
        metin: "Dedikoduyu görmezden gel, işine bak.",
        baseBasariSansi: 70,
        basariliSonuc: { mesaj: "Dedikodu kendiliğinden söndü; işlerin etkilenmedi.", detay: "En iyi cevap bazen sessizliktir." },
        basarisizSonuc: { un: -6, para: -4, mesaj: "Dedikodu yayıldı; birkaç müşteri seni sorguladı.", detay: "Söylenti hızlı yayılır." },
      },
      {
        metin: "Dedikoduyu çıkaranı bul, hesap sor.",
        baseBasariSansi: 50,
        basariliSonuc: { un: 6, dost_puani: -4, mesaj: "Kaynağı bulup yüzleştin; dedikodu durdu.", detay: "Bazı sorunlar doğrudan çözülür." },
        basarisizSonuc: { mutluluk: -4, dost_puani: -6, mesaj: "Yanlış kişiyi suçladın; olay büyüdü.", detay: "Öfke işleri kötüleştirir." },
      },
    ],
  },
  {
    id: "oc_zanaatkar_yabanci_tuccar",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Uzak Diyarlardan Bir Tüccar",
    metin: "Uzak diyardan bir tüccar işlerini toptan alıp kendi ülkesinde satmayı öneriyor.",
    secenekler: [
      {
        metin: "Anlaşmayı kabul et.",
        baseBasariSansi: 60,
        basariliSonuc: { para: 18, un: 6, mesaj: "Anlaşma iyi gitti; işlerin uzak diyarlarda da tanınıyor.", detay: "Bazı fırsatlar çok uzaktan gelir." },
        basarisizSonuc: { para: -6, mesaj: "Tüccar sözünü tutmadı; ödemeyi geciktirdi.", detay: "Uzak anlaşmalar risklidir." },
      },
      {
        metin: "Reddet; yerel pazarda kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Tanıdık pazarda risk almadan sürdürdün.",
          detay: "Bilinen yol güvenlidir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Kaçırdığın fırsat içini kemirdi.",
          detay: "Güvenliğin bedeli pişmanlıktır.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_dini_bagis_talebi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Kilise/Cami Bağış Talebi",
    metin: "Yerel ibadethane onarım için zanaatkârlardan bağış istiyor.",
    secenekler: [
      {
        metin: "Cömertçe bağış yap.",
        baseBasariSansi: 85,
        maliyet: 8,
        basariliSonuc: { para: -8, ahlak: 8, un: 3, mesaj: "Bağışın takdir gördü; cemaatte iyi anıldın.", detay: "Paylaşmak itibarı besler." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Bağışın az bulundu ama takdir edildi.", detay: "Her katkı anlam taşır." },
      },
      {
        metin: "Bağış yapma, param yok de.",
        baseBasariSansi: 90,
        basariliSonuc: { mesaj: "Bağış yapmadın; para cebinde kaldı.", detay: "Herkes önceliğini kendi belirler." },
        basarisizSonuc: { ahlak: -4, un: -4, mesaj: "Cimriliğin çarşıda konuşuldu.", detay: "Bazı sessizlikler duyulur." },
      },
    ],
  },
  {
    id: "oc_zanaatkar_kiskanc_esnaf",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Kıskanç Bir Esnaf",
    metin: "Komşu tezgâhtaki esnaf başarını kıskanıp müşterilerini çekmeye çalışıyor.",
    secenekler: [
      {
        metin: "Sakin kal, işine odaklan.",
        baseBasariSansi: 72,
        basariliSonuc: { ahlak: 4, un: 4, mesaj: "Sabrın karşılığını buldu; müşterilerin sadık kaldı.", detay: "Kıskançlık kaliteyle susar." },
        basarisizSonuc: { para: -4, mutluluk: -3, mesaj: "Bazı müşterilerin kaydığını fark ettin.", detay: "Rekabet bazen acımasızdır." },
      },
      {
        metin: "Onunla yüzleş, açıkça konuş.",
        baseBasariSansi: 50,
        basariliSonuc: {
          dost_puani: 5,
          mesaj: "Esnaf özür diledi; gerginlik dağıldı.",
          detay: "Açık konuşmak çoğu zaman çözümdür.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          dost_puani: -4,
          mesaj: "Yüzleşme kavgaya döndü; çarşı ikinizi konuştu.",
          detay: "Her yüzleşme barışla bitmez.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_deprem_hasari",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🏚️",
    baslik: "Küçük Bir Deprem",
    metin: "Şehri sarsan küçük bir deprem atölyende hasar yaptı.",
    secenekler: [
      {
        metin: "Hasarı hemen onar.",
        baseBasariSansi: 70,
        maliyet: 10,
        basariliSonuc: { para: -10, mesaj: "Onarım sorunsuz bitti; işine devam ettin.", detay: "Hızlı müdahale kaybı sınırlar." },
        basarisizSonuc: { para: -10, saglik: -4, mesaj: "Onarım sırasında küçük bir kaza oldu.", detay: "Yıkım sonrası her şey kolay olmaz." },
      },
      {
        metin: "Hasarı görmezden gel.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mesaj: "Hasar büyümedi; para cebinde kaldı.",
          detay: "Bazı çatlaklar büyümez.",
        },
        basarisizSonuc: {
          para: -14,
          mesaj: "İhmal ettiğin çatlak büyüdü; onarım çok pahalı.",
          detay: "Ertelenen sorun büyür.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_ogrenci_ayrilik",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Çırağın Ayrılığı",
    metin: "Uzun süredir yanındaki çırağın kendi atölyesini açmak için ayrılmak istiyor.",
    secenekler: [
      {
        metin: "Gönül rahatlığıyla uğurla.",
        baseBasariSansi: 75,
        basariliSonuc: { ahlak: 6, dost_puani: 4, mesaj: "Çırağın minnetle ayrıldı; bağınız sürdü.", detay: "İyi usta öğrencisini uçurur." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Ayrılık seni üzdü; yerini doldurmak zaman aldı.", detay: "Her ayrılık boşluk bırakır." },
      },
      {
        metin: "Kalması için ikna etmeye çalış.",
        baseBasariSansi: 40,
        basariliSonuc: {
          dost_puani: 6,
          mesaj: "Kalmayı kabul etti; bağınız güçlendi.",
          detay: "Bazen bir söz alıkoymaya yeter.",
        },
        basarisizSonuc: {
          dost_puani: -6,
          mesaj: "Israrın onu rahatsız etti; soğuk bir ayrılık oldu.",
          detay: "Bazı ısrarlar ters tepir.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_zengin_bekleyen_musteri",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Sabırsız Zengin Müşteri",
    metin: "Zengin bir müşteri sırasını beklemeden işinin önce yapılmasını istiyor.",
    secenekler: [
      {
        metin: "Sırayı boz, onu öne al.",
        baseBasariSansi: 65,
        basariliSonuc: { para: 10, mesaj: "Müşteri memnun kaldı, cömert bahşiş bıraktı.", detay: "Esneklik bazen kazandırır." },
        basarisizSonuc: { dost_puani: -4, mutluluk: -3, mesaj: "Diğer müşteriler haksızlığa uğradığını düşündü.", detay: "Ayrıcalık başkasına adaletsizliktir." },
      },
      {
        metin: "Sırasını beklet, adil davran.",
        baseBasariSansi: 75,
        basariliSonuc: { ahlak: 5, mesaj: "Adil tutumun diğer müşterilerin güvenini kazandı.", detay: "Adalet uzun vadede kazandırır." },
        basarisizSonuc: { para: -6, mesaj: "Zengin müşteri küstü, işi başka ustaya verdi.", detay: "Bazı müşteriler ayrıcalık ister." },
      },
    ],
  },
  {
    id: "oc_zanaatkar_uzun_kis",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "❄️",
    baslik: "Uzun Bir Kış",
    metin: "Bu yıl kış her zamankinden uzun ve sert; malzeme ve müşteri kıt.",
    secenekler: [
      {
        metin: "Birikimini kullanıp kışı atlat.",
        baseBasariSansi: 75,
        maliyet: 10,
        basariliSonuc: { para: -10, saglik: 2, mesaj: "Kışı sıkıntısız atlattın; baharda işler toparlandı.", detay: "Birikim zor günlerin kalkanıdır." },
        basarisizSonuc: { para: -10, saglik: -4, mutluluk: -3, mesaj: "Kış ağır geçti; sağlığın biraz bozuldu.", detay: "Doğa bazen acımasızdır." },
      },
      {
        metin: "Birikimine dokunma, idare et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -3,
          mesaj: "Paranı harcamadan idare ettin ama kış uzun sürdü.",
          detay: "Bazı kışlar sabırla atlatılır.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -5,
          mesaj: "Kıtlık seni yıprattı; kış ağır bedelle bitti.",
          detay: "Doğa tasarrufu bile cezalandırır.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_hirsizlik_ithami",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Haksız Bir İthamdı",
    metin: "Bir müşteri, ödediği eşyayı almadığını iddia edip seni hırsızlıkla suçluyor.",
    secenekler: [
      {
        metin: "Şahitlerinle kendini savun.",
        baseBasariSansi: 68,
        basariliSonuc: { un: 6, ahlak: 4, mesaj: "Şahitler seni haklı çıkardı; iftira boşa gitti.", detay: "Dürüstlük en iyi savunmadır." },
        basarisizSonuc: { para: -8, un: -8, mesaj: "İddia kanıtlanmadı ama adına gölge düştü.", detay: "Bazı lekeler silinmez." },
      },
      {
        metin: "Büyütme, parayı sessizce iade et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: -4,
          mesaj: "Parayı sessizce iade ettin; olay kapandı.",
          detay: "Huzur, haklılıktan değerlidir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Sessizliğin suçlu izlenimini güçlendirdi.",
          detay: "Susmak bazen kabul sayılır.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_kutlama_siparisi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gorsel: "🔨",
    baslik: "Bir Düğün Siparişi",
    metin: "Şehirde büyük bir düğün için özel süsleme siparişi geldi; kısa sürede bitmeli.",
    secenekler: [
      {
        metin: "Gece gündüz çalış, yetiştir.",
        baseBasariSansi: 60,
        basariliSonuc: { para: 16, saglik: -4, un: 6, mesaj: "Siparişi yetiştirdin; düğünde işlerin övüldü.", detay: "Yorgunluk büyük başarıyla ödüllenir." },
        basarisizSonuc: { para: -6, saglik: -6, mesaj: "Yetiştiremedin; para ve itibar kaybettin.", detay: "Her yarışa yetişilmez." },
      },
      {
        metin: "Yardımcı tut, işi paylaştır.",
        baseBasariSansi: 55,
        maliyet: 5,
        basariliSonuc: {
          para: 10,
          saglik: -1,
          mesaj: "Yardımcın sayesinde yetiştin, yıpranmadın.",
          detay: "Paylaşılan yük hafifler.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Yardımcı işi batırdı; düğün sahibi çok kızdı.",
          detay: "Yanlış yardımcı yükü ağırlaştırır.",
        },
      },
    ],
  },
];
