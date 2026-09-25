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
    metin: "Bir müşteri, emeğinin karşılığını neredeyse yarı fiyatına almaya çalışıyor.",
    secenekler: [
      {
        metin: "Fiyatında dur, gerekirse satışı kaybet.",
        baseBasariSansi: 62,
        basariliSonuc: {
          para: 8,
          un: 4,
          mesaj: "Müşteri sonunda senin fiyatını kabul etti; emeğinin değerini bildin.",
          detay: "Kendi değerini bilen, başkasına da bildirir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Müşteri vazgeçip başka bir ustaya gitti.",
          detay: "Her pazarlık kazanılmaz.",
        },
      },
      {
        metin: "Fiyatı düşür, işi kaçırma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 3,
          mutluluk: -2,
          mesaj: "İşi aldın ama emeğinin karşılığını tam alamadın.",
          detay: "Bazen az kazanmak, hiç kazanmamaktan iyidir.",
        },
        basarisizSonuc: {
          para: 1,
          mutluluk: -3,
          mesaj: "İndirime rağmen müşteri yine de vazgeçti.",
          detay: "Bazı müşteriler hiçbir fiyata ikna olmaz.",
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
    metin: "Kullandığın ham madde kıtlaştı; tüccarlar fiyatları ikiye katladı.",
    secenekler: [
      {
        metin: "Pahalıya da olsa malzemeyi al, işini aksatma.",
        baseBasariSansi: 75,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          uretim_kapasitesi_artis: 3,
          mesaj: "İşin aksamadı, müşterilerin memnun kaldı.",
          detay: "Süreklilik, itibarın en sağlam temelidir.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -3,
          mesaj: "Malzeme kalitesiz çıktı, param boşa gitti.",
          detay: "Kıtlıkta herkes fırsatçı olmaz ama bazıları olur.",
        },
      },
      {
        metin: "Alternatif, daha düşük kalite malzemeyle idare et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 4,
          mesaj: "İdare ettin, kimse fark etmedi.",
          detay: "Bazen yaratıcılık, sıkıntıdan doğar.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -3,
          mesaj: "Kalite düşüklüğü fark edildi, birkaç müşteri küstü.",
          detay: "Her idare-i maslahat bir bedel getirir.",
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
    metin: "Çarşıya yeni açılan bir atölye, senin müşterilerinin bir kısmını çekmeye başladı.",
    secenekler: [
      {
        metin: "Daha iyi hizmet ve kaliteyle fark yarat.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 8,
          para: 6,
          mesaj: "Kaliteyle rekabet ettin; eski müşterilerin geri döndü.",
          detay: "İyilik, en kalıcı reklamdır.",
        },
        basarisizSonuc: {
          para: -4,
          mutluluk: -3,
          mesaj: "Çabaların yeterli olmadı, birkaç müşteri kaybettin.",
          detay: "Rekabet bazen acımasız kalır.",
        },
      },
      {
        metin: "Fiyatını düşürerek rekabet et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: -3,
          mesaj: "Fiyatını kıstın, müşteriler geri geldi ama kâr marjın daraldı.",
          detay: "Bazen kalmak, kazanmaktan önemlidir.",
        },
        basarisizSonuc: {
          para: -6,
          un: -2,
          mesaj: "Düşük fiyat bile yetmedi; itibarın 'ucuz iş' diye anılmaya başladı.",
          detay: "Fiyat kırmak her zaman işe yaramaz.",
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
    metin: "Atölyendeki ocaktan sıçrayan bir kıvılcım, saman yığınına düştü.",
    secenekler: [
      {
        metin: "Hemen müdahale et.",
        baseBasariSansi: 78,
        basariliSonuc: {
          saglik: -3,
          mesaj: "Ateşi hızla söndürdün, küçük bir yanıkla kurtuldun.",
          detay: "Hızlı refleksler bazen her şeyi kurtarır.",
        },
        basarisizSonuc: {
          para: -14,
          saglik: -8,
          mesaj: "Atölyenin bir köşesi yandı, onarım pahalıya patladı.",
          detay: "Ateşle iş yapanın en büyük düşmanı yine ateştir.",
        },
      },
      {
        metin: "Küçük bir kıvılcım, kendiliğinden söner diye bekle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kıvılcım kendiliğinden söndü; şansın bu sefer yaver gitti.",
          detay: "Bazı riskler görmezden gelinince kaybolur.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -10,
          mesaj: "Ateş hızla yayıldı; atölyenin büyük bölümü kül oldu.",
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
    metin: "Yerel bir soylu, işinden etkilenip sana özel bir hediye ısmarlamak istiyor.",
    secenekler: [
      {
        metin: "Elinden gelenin en iyisini yap.",
        baseBasariSansi: 68,
        maliyet: 8,
        basariliSonuc: {
          para: 20,
          un: 10,
          mesaj: "Soylu eserinden çok memnun kaldı; adın saraya kadar ulaştı.",
          detay: "Doğru kişiyi etkilemek, kapılar açar.",
        },
        basarisizSonuc: {
          para: -8,
          un: -6,
          mesaj: "Soylu eseri beğenmedi, üstelik ödemeyi de geciktirdi.",
          detay: "Yüksek beklenti, yüksek hayal kırıklığı getirebilir.",
        },
      },
      {
        metin: "Nazikçe reddet, bu riske girme.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Reddin kabul gördü; sakin, tehlikesiz bir gün geçirdin.",
          detay: "Her fırsat kabul edilmek zorunda değildir.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Soylu reddini hakaret sayıp çevrede senden kötü söz etti.",
          detay: "Bazı reddedişlerin bedeli itibardır.",
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
    metin: "Atölyenden değerli bir malzeme kayboldu; şüphe çalışanlarından birinin üzerinde.",
    secenekler: [
      {
        metin: "Sessizce araştır, doğrudan suçlama.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 4,
          mesaj: "Malzemeyi bir köşede buldun; kimseyi suçlamadan sorunu çözdün.",
          detay: "Sabırlı bir araştırma çoğu zaman işe yarar.",
        },
        basarisizSonuc: {
          para: -8,
          dost_puani: -4,
          mesaj: "Malzemeyi bulamadın, atölyende güvensizlik havası oluştu.",
          detay: "Şüphe, dostluğu yavaşça kemirir.",
        },
      },
      {
        metin: "Herkesin önünde açıkça sor, kimin aldığını itiraf etmesini iste.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 6,
          dost_puani: 2,
          mesaj: "Suçlu utanıp malzemeyi geri getirdi; mesele hızla kapandı.",
          detay: "Bazen açıklık, sessizlikten daha etkilidir.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Kimse itiraf etmedi, atölyede gerginlik had safhaya çıktı.",
          detay: "Açık suçlama bazen herkesi küstürür.",
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
    metin: "Pazar günü tezgâhını kurdun; kalabalık büyük ama rakip tezgâhlar da her yanda.",
    secenekler: [
      {
        metin: "Yüksek sesle işini tanıt.",
        baseBasariSansi: 68,
        basariliSonuc: { para: 8, un: 3, mesaj: "Sesin dikkat çekti, birkaç yeni müşteri kazandın.", detay: "Bazen gürültü, işe yarar." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Kalabalık ilgisiz kaldı, gün sakin geçti.", detay: "Her pazar günü bereketli olmaz." },
      },
      {
        metin: "Sessizce, kaliteli işçiliğinle dikkat çekmeyi bekle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 5,
          mesaj: "Sessiz duruşun merak uyandırdı, birkaç meraklı müşteri geldi.",
          detay: "Kalite bazen kendini sessizce anlatır.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kimse fark etmedi, gün sessizce geçti.",
          detay: "Sessizlik bazen fark edilmeyi de engeller.",
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
    metin: "Bir gece atölyene giren biri en değerli aletlerini çaldı.",
    secenekler: [
      {
        metin: "Yeni aletler almak için borç al.",
        baseBasariSansi: 70,
        maliyet: 12,
        basariliSonuc: { para: -12, mesaj: "Yeni aletlerle işine kaldığın yerden devam ettin.", detay: "Her kayıp, yeniden başlamanın bir fırsatıdır." },
        basarisizSonuc: { para: -12, mutluluk: -4, mesaj: "Borç bulmak sandığından zor oldu, bir süre işin aksadı.", detay: "Kayıplar bazen zincirleme gelir." },
      },
      {
        metin: "Eski, yedek aletlerinle idare etmeyi dene.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: -2,
          mesaj: "Eski aletlerle iş biraz yavaşladı ama borca girmedin.",
          detay: "Bazen idare etmek, harcamaktan iyidir.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -3,
          mesaj: "Eski aletler yetmedi, birkaç sipariş elinde patladı.",
          detay: "İdare-i maslahat her zaman yetmez.",
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
    metin: "Sürekli yağan yağmur, malzeme tedarikini ve müşteri trafiğini olumsuz etkiliyor.",
    secenekler: [
      {
        metin: "Sabırla bekle, işine devam et.",
        baseBasariSansi: 80,
        basariliSonuc: { mesaj: "Hava düzelene kadar idare ettin, büyük bir kayıp yaşamadın.", detay: "Sabır, en ucuz çözümdür." },
        basarisizSonuc: { para: -6, mutluluk: -2, mesaj: "Uzun süren kötü hava işlerini bir hayli aksattı.", detay: "Doğa bazen acımasızdır." },
      },
      {
        metin: "Bu boş vakti atölyeni düzenlemek için kullan.",
        baseBasariSansi: 65,
        basariliSonuc: {
          uretim_kapasitesi_artis: 3,
          mesaj: "Boş vakti değerlendirdin, atölyen daha düzenli hale geldi.",
          detay: "Durgunluk bazen bir fırsattır.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Düzenleme uğraşı beklediğinden yorucu çıktı.",
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
    metin: "Yandaki atölyede çıkan yangın, hızla senin atölyene de sıçrayabilir.",
    secenekler: [
      {
        metin: "Yangını söndürmeye yardım et.",
        baseBasariSansi: 65,
        basariliSonuc: { saglik: -4, dost_puani: 8, un: 4, mesaj: "Yardımın yangının yayılmasını engelledi; komşuların minnettar kaldı.", detay: "Zor günde yanında olmak, uzun süreli dostluklar kurar." },
        basarisizSonuc: { para: -10, saglik: -6, mesaj: "Yangın atölyene de sıçradı, küçük bir hasar aldın.", detay: "Ateş bazen komşularını da vurur." },
      },
      {
        metin: "Kendi atölyeni korumaya odaklan, yardıma gitme.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mesaj: "Atölyeni korudun ama komşuların yardım etmediğini unutmadı.",
          detay: "Kendini korumak bazen yalnız kalmak demektir.",
        },
        basarisizSonuc: {
          dost_puani: -6,
          mesaj: "Yardım etmediğin için komşuların sana küstü.",
          detay: "Zor günde uzak durmanın bir bedeli vardır.",
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
    metin: "Çarşıda işinle ilgili asılsız bir dedikodu dolaşmaya başladı.",
    secenekler: [
      {
        metin: "Dedikoduyu görmezden gel, işine odaklan.",
        baseBasariSansi: 70,
        basariliSonuc: { mesaj: "Dedikodu kendiliğinden söndü, işlerin etkilenmedi.", detay: "Bazen en iyi cevap sessizliktir." },
        basarisizSonuc: { un: -6, para: -4, mesaj: "Dedikodu yayıldı, birkaç müşteri seni sorguladı.", detay: "Söylenti bazen gerçekten hızlı yayılır." },
      },
      {
        metin: "Dedikoduyu çıkaranı bul, hesap sor.",
        baseBasariSansi: 50,
        basariliSonuc: { un: 6, dost_puani: -4, mesaj: "Kaynağı buldun ve yüzleştin; dedikodu durdu.", detay: "Bazı sorunlar doğrudan çözülür." },
        basarisizSonuc: { mutluluk: -4, dost_puani: -6, mesaj: "Yanlış kişiyi suçladın, olay daha da büyüdü.", detay: "Öfkeyle hareket etmek bazen işleri kötüleştirir." },
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
    metin: "Uzak bir diyardan gelen bir tüccar, işlerini toptan alıp kendi ülkesinde satmayı teklif ediyor.",
    secenekler: [
      {
        metin: "Anlaşmayı kabul et.",
        baseBasariSansi: 60,
        basariliSonuc: { para: 18, un: 6, mesaj: "Anlaşma iyi gitti; işlerin artık uzak diyarlarda da biliniyor.", detay: "Bazı fırsatlar çok uzaktan gelir." },
        basarisizSonuc: { para: -6, mesaj: "Tüccar sözünü tutmadı, ödemeyi geciktirdi.", detay: "Uzak anlaşmalar risklidir." },
      },
      {
        metin: "Teklifi reddet, güvenilir yerel pazara sadık kal.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Tanıdık pazarında güvenle devam ettin, hiçbir risk almadın.",
          detay: "Bilinen yol her zaman güvenlidir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Kaçırdığın fırsatı düşünüp içerledin.",
          detay: "Bazen güvenlik, pişmanlıkla gelir.",
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
    metin: "Yerel ibadethane, onarımı için zanaatkârlardan bağış istiyor.",
    secenekler: [
      {
        metin: "Cömertçe bağışta bulun.",
        baseBasariSansi: 85,
        maliyet: 8,
        basariliSonuc: { para: -8, ahlak: 8, un: 3, mesaj: "Bağışın takdir topladı, cemaat arasında iyi anıldın.", detay: "Paylaşmak, itibarı besler." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Bağışın az bulundu ama yine de takdir edildi.", detay: "Her katkı bir anlam taşır." },
      },
      {
        metin: "Bağış yapma, param yok de.",
        baseBasariSansi: 90,
        basariliSonuc: { mesaj: "Bağış yapmadın, para cebinde kaldı.", detay: "Herkes önceliğini kendi belirler." },
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
    metin: "Komşu tezgâhtaki esnaf, senin başarını kıskanıp müşterilerini elinden almaya çalışıyor.",
    secenekler: [
      {
        metin: "Sakin kal, işine odaklan.",
        baseBasariSansi: 72,
        basariliSonuc: { ahlak: 4, un: 4, mesaj: "Sabrın karşılığını buldu, müşterilerin sana sadık kaldı.", detay: "Kıskançlık, kaliteyle susturulur." },
        basarisizSonuc: { para: -4, mutluluk: -3, mesaj: "Bazı müşterilerin gerçekten kaydığını fark ettin.", detay: "Rekabet bazen acımasızdır." },
      },
      {
        metin: "Onunla yüzleş, meseleyi açıkça konuş.",
        baseBasariSansi: 50,
        basariliSonuc: {
          dost_puani: 5,
          mesaj: "Konuşma işe yaradı, esnaf özür diledi; gerginlik dağıldı.",
          detay: "Bazen açık konuşmak en iyi çözümdür.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          dost_puani: -4,
          mesaj: "Yüzleşme kavgaya dönüştü, çarşı ikinizi konuştu.",
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
    metin: "Şehri sarsan küçük bir deprem, atölyende bazı hasarlara yol açtı.",
    secenekler: [
      {
        metin: "Hasarı hemen onar.",
        baseBasariSansi: 70,
        maliyet: 10,
        basariliSonuc: { para: -10, mesaj: "Onarım sorunsuz tamamlandı, işine kaldığın yerden devam ettin.", detay: "Hızlı müdahale, kaybı sınırlar." },
        basarisizSonuc: { para: -10, saglik: -4, mesaj: "Onarım sırasında küçük bir kaza oldu.", detay: "Yıkım sonrası her şey kolay olmaz." },
      },
      {
        metin: "Hasarı görmezden gel, kendi haline bırak.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mesaj: "Hasar büyümedi, iş idare etti; para cebinde kaldı.",
          detay: "Bazı çatlaklar kendiliğinden büyümez.",
        },
        basarisizSonuc: {
          para: -14,
          mesaj: "İhmal ettiğin çatlak büyüdü, onarım çok daha pahalıya patladı.",
          detay: "Ertelenen sorunlar genelde büyür.",
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
    metin: "Uzun süredir yanında çalışan çırağın, kendi atölyesini açmak için ayrılmak istiyor.",
    secenekler: [
      {
        metin: "Onu gönül rahatlığıyla uğurla.",
        baseBasariSansi: 75,
        basariliSonuc: { ahlak: 6, dost_puani: 4, mesaj: "Çırağın minnettarlıkla ayrıldı, aranızdaki bağ sürdü.", detay: "İyi bir usta, öğrencisinin uçmasına izin verir." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Ayrılık seni biraz üzdü, yerini doldurmak zaman aldı.", detay: "Her ayrılık bir boşluk bırakır." },
      },
      {
        metin: "Onu kalması için ikna etmeye çalış.",
        baseBasariSansi: 40,
        basariliSonuc: {
          dost_puani: 6,
          mesaj: "Kalmayı kabul etti; birlikte devam ettiniz, bağınız güçlendi.",
          detay: "Bazen bir kelime yeter, birini alıkoymaya.",
        },
        basarisizSonuc: {
          dost_puani: -6,
          mesaj: "Israrın onu rahatsız etti; soğuk, gergin bir ayrılık oldu.",
          detay: "Bazı ısrarlar tam tersini yaratır.",
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
    metin: "Zengin bir müşteri, sırasını beklemeden işinin önce yapılmasını istiyor.",
    secenekler: [
      {
        metin: "Sırayı boz, onu önceliklendir.",
        baseBasariSansi: 65,
        basariliSonuc: { para: 10, mesaj: "Müşteri memnun kaldı, cömert bir bahşiş bıraktı.", detay: "Bazen esneklik kazandırır." },
        basarisizSonuc: { dost_puani: -4, mutluluk: -3, mesaj: "Diğer müşteriler haksızlığa uğradıklarını düşündü.", detay: "Ayrıcalık, başkalarının gözünde adaletsizliktir." },
      },
      {
        metin: "Sırasını bekletme, adil davran.",
        baseBasariSansi: 75,
        basariliSonuc: { ahlak: 5, mesaj: "Adaletli tutumun diğer müşterilerin güvenini kazandırdı.", detay: "Adalet, uzun vadede daha çok kazandırır." },
        basarisizSonuc: { para: -6, mesaj: "Zengin müşteri küstü, işini başka bir ustaya verdi.", detay: "Bazı müşteriler ayrıcalık ister." },
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
    metin: "Bu yılki kış her zamankinden uzun ve sert geçiyor; malzeme ve müşteri kıtlığı yaşanıyor.",
    secenekler: [
      {
        metin: "Kışı atlatmak için birikimini kullan.",
        baseBasariSansi: 75,
        maliyet: 10,
        basariliSonuc: { para: -10, saglik: 2, mesaj: "Kışı sıkıntısız atlattın, baharda işlerin toparlandı.", detay: "Biriktirmek, zor günler için bir kalkandır." },
        basarisizSonuc: { para: -10, saglik: -4, mutluluk: -3, mesaj: "Kış beklediğinden ağır geçti, sağlığın biraz bozuldu.", detay: "Doğa bazen acımasız olabilir." },
      },
      {
        metin: "Birikimine dokunma, dişini sıkıp idare et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -3,
          mesaj: "Parana dokunmadan idare ettin ama kış sıkıntılı, uzun geçti.",
          detay: "Bazı kışlar sadece sabırla atlatılır.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -5,
          mesaj: "Kıtlık seni yıprattı; kış ağır bir bedelle bitti.",
          detay: "Doğa bazen tasarrufu bile cezalandırır.",
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
    metin: "Bir müşteri, ödediği eşyayı teslim almadığını iddia ederek seni hırsızlıkla suçluyor.",
    secenekler: [
      {
        metin: "Şahitlerinle kendini savun.",
        baseBasariSansi: 68,
        basariliSonuc: { un: 6, ahlak: 4, mesaj: "Şahitlerin doğrunu kanıtladı; iftira boşa çıktı.", detay: "Dürüstlük, en iyi savunmadır." },
        basarisizSonuc: { para: -8, un: -8, mesaj: "İddia kanıtlanamasa da adına gölge düştü.", detay: "Bazı lekeler tamamen silinmez." },
      },
      {
        metin: "Meseleyi büyütme, sessizce parayı iade et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: -4,
          mesaj: "Sessizce parayı iade ettin, olay hızla kapandı.",
          detay: "Bazen huzur, haklı olmaktan daha değerlidir.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Sessizliğin, suçlu olduğun izlenimini güçlendirdi.",
          detay: "Susmak bazen kabul etmek sayılır.",
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
    metin: "Şehirdeki büyük bir düğün için özel süslemeler sipariş edildi; kısa sürede bitmesi gerekiyor.",
    secenekler: [
      {
        metin: "Gece gündüz çalış, yetiştir.",
        baseBasariSansi: 60,
        basariliSonuc: { para: 16, saglik: -4, un: 6, mesaj: "Siparişi zamanında yetiştirdin, düğünde işlerin övüldü.", detay: "Yorgunluk bazen büyük bir başarıyla ödüllenir." },
        basarisizSonuc: { para: -6, saglik: -6, mesaj: "Yetiştiremedin, hem parayı hem itibarı kaybettin.", detay: "Her yarışa zamanında varılmaz." },
      },
      {
        metin: "Yardımcı tut, işi paylaştır.",
        baseBasariSansi: 55,
        maliyet: 5,
        basariliSonuc: {
          para: 10,
          saglik: -1,
          mesaj: "Yardımcın sayesinde hem yetiştirdin hem de fazla yıpranmadın.",
          detay: "Bazı yükler paylaşılınca hafifler.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Tuttuğun yardımcı işi batırdı, düğün sahibi çok kızdı.",
          detay: "Yanlış yardımcı, yükü hafifletmez ağırlaştırır.",
        },
      },
    ],
  },
];
