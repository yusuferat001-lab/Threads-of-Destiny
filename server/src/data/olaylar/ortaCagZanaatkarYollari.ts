import type { OlayTanimi } from "./types";

/**
 * Orta Çağ Zanaatkâr'ın dallanan kariyer yolu: "İlk Sipariş" (gameEngine.ts'te
 * zorla tetiklenir, bkz. senaryoUret) karakteri dört zanaat felsefesinden
 * birine kilitler (yol:zanaatkar:lonca_sadik / yenilikci / hileci / sanatkar).
 * Kilitlenen yolun etiketi bir daha değişmez; her yol-özel olay
 * gerekliEtiketler:["yol:zanaatkar:X"] taşıdığı için karşı yolların içeriği
 * otomatik olarak kapalı kalır.
 *
 * NOT (iskelet, 2026-09): her dal şu an 2 olayla temsil ediliyor — hedef
 * 11 olay/dal (Tüccar/SD desenindeki gibi). Kalanı sonraki bir turda eklenecek.
 */
export const OLAY_ORTACAG_ZANAATKAR_YOLLARI: OlayTanimi[] = [
  {
    id: "oc_zanaatkar_yol_ilk_siparis",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minYas: 18,
    yasakliEtiketler: ["zanaatkar_yolu_secildi"],
    gorsel: "🔨",
    baslik: "İlk Sipariş",
    metin: "Ustan seni ilk kez tek başına bırakıyor: yerel bir beyin adamları, bir hafta içinde bitmesi imkansız bir sipariş istiyor. Bu işi nasıl çevirdiğin, bundan sonra ne tür bir zanaatkâr olacağını belirleyecek.",
    secenekler: [
      {
        metin: "Loncanın kurallarına harfiyen uy, süreyi uzat ama işi kusursuz teslim et.",
        baseBasariSansi: 68,
        basariliSonuc: {
          un: 10,
          ahlak: 8,
          uretim_kapasitesi_artis: 6,
          etiket_ekle: ["yol:zanaatkar:lonca_sadik", "zanaatkar_yolu_secildi"],
          mesaj: "Beyin adamları gecikmeye kızsa da işin kalitesi karşısında sustu; loncanın gözünde adın sağlamlaştı.",
          detay: "Sabır bazen en pahalı malzemeden daha değerlidir.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -3,
          etiket_ekle: ["yol:zanaatkar:lonca_sadik", "zanaatkar_yolu_secildi"],
          mesaj: "Kurallara uydun ama süre yine de yetmedi; sipariş iptal oldu, gururun kırıldı.",
          detay: "Dürüstlük her zaman ödüllendirilmez, ama yine de bir yoldur.",
        },
      },
      {
        metin: "Yeni bir alet/teknik dene, riskli ama daha hızlı bir yöntemle bitir.",
        baseBasariSansi: 52,
        basariliSonuc: {
          para: 10,
          un: 6,
          uretim_kapasitesi_artis: 12,
          etiket_ekle: ["yol:zanaatkar:yenilikci", "zanaatkar_yolu_secildi"],
          mesaj: "Denemen işe yaradı; işi zamanında bitirdin ve loncada 'tuhaf ama yetenekli' diye anılmaya başladın.",
          detay: "Yenilik önce garipsenir, sonra taklit edilir.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -4,
          uretim_kapasitesi_artis: 3,
          etiket_ekle: ["yol:zanaatkar:yenilikci", "zanaatkar_yolu_secildi"],
          mesaj: "Deneyin tuttu ama sonuç berbat çıktı; malzemeyi ve parayı boşa harcadın.",
          detay: "Her deneyin bedeli olur; bazıları öğretir, bazıları sadece yakar.",
        },
      },
      {
        metin: "Ucuz malzeme kullan, kaliteyi düşür ama süreyi tut.",
        baseBasariSansi: 62,
        basariliSonuc: {
          para: 16,
          ahlak: -12,
          suc_artis: 6,
          etiket_ekle: ["yol:zanaatkar:hileci", "zanaatkar_yolu_secildi"],
          mesaj: "Kimse farkına varmadan işi zamanında teslim ettin; cebin doldu, vicdanın hafif sızladı.",
          detay: "İlk hile kolaydır; asıl zor olan bir daha yapmamaktır.",
        },
        basarisizSonuc: {
          para: -8,
          un: -12,
          ahlak: -10,
          suc_artis: 10,
          etiket_ekle: ["yol:zanaatkar:hileci", "zanaatkar_yolu_secildi"],
          mesaj: "Kalitesizlik hemen fark edildi; beyin adamları parayı geri istedi, adın çarşıda lekelendi.",
          detay: "Ucuz iş bazen en pahalıya patlar.",
        },
      },
      {
        metin: "İşi bir sanat eserine dönüştür, kâr düşünme, sadece en iyisini yap.",
        baseBasariSansi: 58,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          un: 18,
          ahlak: 6,
          uretim_kapasitesi_artis: 10,
          etiket_ekle: ["yol:zanaatkar:sanatkar", "zanaatkar_yolu_secildi"],
          mesaj: "Ortaya çıkan eser çarşıda dilden dile dolaştı; para kaybettin ama adın artık bir sanatla anılıyor.",
          detay: "Bazı ustalar zengin olmaz, ama unutulmaz.",
        },
        basarisizSonuc: {
          para: -14,
          mutluluk: -5,
          etiket_ekle: ["yol:zanaatkar:sanatkar", "zanaatkar_yolu_secildi"],
          mesaj: "Hayalindeki eseri tutturamadın; hem zaman hem para kaybettin.",
          detay: "Sanat peşinde koşmanın bir bedeli vardır.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:lonca_sadik ---
  {
    id: "oc_zanaatkar_lonca_sadik_1",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:lonca_sadik"],
    gorsel: "🔨",
    baslik: "Lonca Denetimi",
    metin: "Loncanın yaşlı ustaları atölyeni habersiz denetlemeye geldi. Her aletin, her ölçünün kurala uygun olması bekleniyor.",
    secenekler: [
      {
        metin: "Atölyeni olduğu gibi göster, hiçbir şey saklama.",
        baseBasariSansi: 74,
        basariliSonuc: {
          un: 8,
          ahlak: 5,
          uretim_kapasitesi_artis: 5,
          mesaj: "Ustalar düzeninden memnun kaldı; loncadaki itibarın arttı.",
          detay: "Şeffaflık en ucuz reklamdır.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Küçük bir eksik bulundu, uyarıyla geçiştirildi ama gururun incindi.",
          detay: "Kusursuzluk nadiren gerçektir.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_lonca_sadik_2",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:lonca_sadik"],
    gorsel: "🔨",
    baslik: "Çırak Eğitimi",
    metin: "Lonca sana genç bir çırak veriyor; onu doğru yetiştirmek hem senin hem loncanın geleceği için önemli.",
    secenekler: [
      {
        metin: "Sabırla, kuralına göre eğit.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 6,
          ahlak: 6,
          dost_puani: 4,
          mesaj: "Çırak hızla gelişti; loncada iyi bir usta olduğun konuşuluyor.",
          detay: "Öğrettiğin her şey bir gün sana geri döner.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Çırak yeteneksiz çıktı, sabrın boşa gitti gibi hissettin.",
          detay: "Her tohum filizlenmez.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:yenilikci ---
  {
    id: "oc_zanaatkar_yenilikci_1",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:yenilikci"],
    gorsel: "🔨",
    baslik: "Yeni Bir Alet",
    metin: "Aklında uzun süredir bir alet fikri var; yapımı pahalı ve loncanın onaylamadığı bir yöntem gerektiriyor.",
    secenekler: [
      {
        metin: "Riske gir, aleti yap.",
        baseBasariSansi: 50,
        maliyet: 14,
        basariliSonuc: {
          para: 20,
          un: 8,
          uretim_kapasitesi_artis: 14,
          mesaj: "Alet işe yaradı! Üretimin hızlandı, birkaç müşteri bunu duyup kapına geldi.",
          detay: "Cesaret bazen en iyi malzemedir.",
        },
        basarisizSonuc: {
          para: -14,
          mutluluk: -5,
          mesaj: "Alet patladı, hem malzeme hem umudun boşa gitti.",
          detay: "Her yenilik bir başarısızlıkla başlar.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_yenilikci_2",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:yenilikci"],
    gorsel: "🔨",
    baslik: "Lonca ile Anlaşmazlık",
    metin: "Loncanın ustaları yeni yöntemlerini 'gelenek dışı' bularak seni uyardı; ya vazgeçeceksin ya da yoluna kendi başına devam edeceksin.",
    secenekler: [
      {
        metin: "Yönteminde ısrar et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 10,
          ahlak: -4,
          mesaj: "Ustalara rağmen ısrar ettin; birkaç genç zanaatkâr seni örnek almaya başladı.",
          detay: "Öncüler önce dışlanır, sonra izlenir.",
        },
        basarisizSonuc: {
          un: -8,
          mutluluk: -4,
          mesaj: "Lonca seni bir süreliğine dışladı; işlerin azaldı.",
          detay: "Geleneği zorlamanın bir bedeli var.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:hileci ---
  {
    id: "oc_zanaatkar_hileci_1",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:hileci"],
    gorsel: "🔨",
    baslik: "Kalitesiz Parti",
    metin: "Elindeki büyük bir siparişte, gizlice daha ucuz ve kalitesiz malzeme kullanma fırsatın var.",
    secenekler: [
      {
        metin: "Malzemeyi değiştir, aradaki farkı cebe at.",
        baseBasariSansi: 58,
        basariliSonuc: {
          para: 18,
          ahlak: -10,
          suc_artis: 8,
          mesaj: "Kimse fark etmedi; kârın hatırı sayılır arttı.",
          detay: "Sessiz hile en tehlikeli alışkanlıktır.",
        },
        basarisizSonuc: {
          para: -10,
          un: -14,
          ahlak: -8,
          suc_artis: 12,
          mesaj: "Müşteri malzemeyi fark etti; dava tehdidiyle karşılaştın.",
          detay: "Hile er ya da geç ortaya çıkar.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_hileci_2",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:hileci"],
    gorsel: "🔨",
    baslik: "Rakibi Karalama",
    metin: "Bir rakip ustanın işlerini kötüleyerek kendi müşterini artırma fırsatı doğdu.",
    secenekler: [
      {
        metin: "Çarşıda dedikodu yay.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          rakip_puani: -8,
          ahlak: -8,
          suc_artis: 5,
          mesaj: "Dedikodu işe yaradı; birkaç müşteri sana kaydı.",
          detay: "Karanlık yollar bazen kestirmedir.",
        },
        basarisizSonuc: {
          un: -10,
          mutluluk: -4,
          mesaj: "Dedikodunun kaynağı sen olduğun anlaşıldı; itibarın zedelendi.",
          detay: "İftira çoğu zaman sahibine döner.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:sanatkar ---
  {
    id: "oc_zanaatkar_sanatkar_1",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:sanatkar"],
    gorsel: "🔨",
    baslik: "Yeni Bir Eser",
    metin: "İçinde uzun zamandır beklettiğin bir eser fikri var; yapımı aylar sürecek ve kâr getirmeyecek.",
    secenekler: [
      {
        metin: "Zamanını ve parasını eserine ada.",
        baseBasariSansi: 60,
        maliyet: 16,
        basariliSonuc: {
          para: -16,
          un: 22,
          mutluluk: 6,
          uretim_kapasitesi_artis: 8,
          mesaj: "Eser tamamlandığında herkes hayran kaldı; adın artık şehirde biliniyor.",
          detay: "Bazı işler kâr için değil, kalıcılık için yapılır.",
        },
        basarisizSonuc: {
          para: -16,
          mutluluk: -6,
          mesaj: "Eser hayalindeki gibi çıkmadı; aylarca emeğin boşa gitti hissi kalbini yaktı.",
          detay: "Sanatın yolu hayal kırıklıklarıyla döşelidir.",
        },
      },
    ],
  },
  {
    id: "oc_zanaatkar_sanatkar_2",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: ["yol:zanaatkar:sanatkar"],
    gorsel: "🔨",
    baslik: "Soylu Bir Sipariş",
    metin: "Bir soylu, evini süsleyecek gösterişli ama ruhsuz bir eser istiyor — tam senin tarzın değil.",
    secenekler: [
      {
        metin: "Kendi tarzından ödün verme, teklifi reddet.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 6,
          un: 8,
          mesaj: "Teklifi reddettin; başka bir soylu, tam da bu duruşun yüzünden seni buldu.",
          detay: "Kimliğinden ödün vermemek bazen kapı açar.",
        },
        basarisizSonuc: {
          para: -4,
          mutluluk: -3,
          mesaj: "Reddetmen soyluyu kızdırdı; çevresinde adın kötü anıldı.",
          detay: "Her ret bir bedel getirir.",
        },
      },
    ],
  },
];
