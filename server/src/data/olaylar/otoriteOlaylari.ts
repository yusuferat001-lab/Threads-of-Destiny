import type { OlayTanimi } from "./types";

/**
 * ŞEHİR YÖNETİCİSİ ("otorite") olayları (2026-10). Tüccar, Zanaatkâr ve Din Adamı, kendi
 * şehrinin yöneticisiyle (`{otorite}` — ülkeye ve çağa göre unvan + isim) sürekli
 * pazarlık halindedir: harç, ruhsat, tahsis, denetim, ihale. Çoğu şıkkın
 * `otorite_iliski` etkisi vardır (iyi/uysal seçim +, küstah/ihlalkâr seçim −);
 * Tüccar'ın bazı imtiyaz/ihale şıkları ayrıca `pazar_payi_artis` verir.
 * Her olayda en az bir "güvenli" (baseBasariSansi:100) ve çoğunda bir "riskli"
 * (40-70) şık bulunur. Metinlerde şehir yöneticisinden hep `{otorite}` ile
 * söz edilir — sabit bir unvan yazılmaz.
 */
export const OLAY_OTORITE: OlayTanimi[] = [
  // ═════════════════════════ TÜCCAR — ORTA ÇAĞ (4) ═════════════════════════
  {
    id: "otorite_tuccar_oc_gecis_harci",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🐪",
    baslik: "Geçiş Harcı",
    metin:
      "Kervanını yol ağzında {otorite}'in adamları durdurdu. Yükü saymak, geçiş harcını almak istiyorlar. Başçavuş mal çuvallarına bakıp gözlerini kısıyor: 'Beyanından fazlası var gibi.'",
    secenekler: [
      {
        metin: "Harcı ve sayımı eksiksiz kabul et, her şeyi beyan et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -6,
          otorite_iliski: 2,
          mesaj: "Harcı ödedin, yük sayıldı. Çavuş durumu {otorite}'e 'düzgün bir tüccar' diye bildirdi.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Çavuşun cebine bir kese bırak, yükü eksik saydır.",
        baseBasariSansi: 55,
        maliyet: 8,
        kilitAciklamasi: "Çavuşa uzatacak bir kese bile bulamıyorsun.",
        basariliSonuc: {
          para: 6,
          ahlak: -4,
          suc_sinifi: "kucuk",
          mesaj: "Kese el değiştirdi, çavuş yükün yarısını saymadan geçirdi. Harçtan epey tasarruf ettin.",
        },
        basarisizSonuc: {
          para: -26,
          otorite_iliski: -7,
          suc_sinifi: "orta",
          un: -3,
          mutluluk: -2,
          mesaj: "Başka bir muhafız keseyi gördü. Mal el konuldu, {otorite} de olayı duydu; kervan yolunda adın kötüye çıktı.",
        },
      },
      {
        metin: "Harcın fazla olduğunu {otorite}'e kendin bildir.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 4,
          un: 2,
          otorite_iliski: 3,
          mesaj: "{otorite} seni dinledi ve harcı kervan başına küçülttü. Yol ağzındaki tüccarlar da hayır duasını sana etti.",
        },
        basarisizSonuc: {
          para: -6,
          un: -2,
          otorite_iliski: -6,
          mesaj: "{otorite} 'tüccarın işi şikâyet değil, ödeme yapmaktır' dedi. Hem harcı ödedin hem de gözden düştün.",
        },
      },
    ],
  },
  {
    id: "otorite_tuccar_oc_pazar_kirasi",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🏪",
    baslik: "Pazar Yeri Kirası",
    metin:
      "{otorite}, pazar meydanındaki tezgâh kiralarını bir gecede yükseltti. Pazarcılar toplanıp söyleniyor. Sana ayrılan yerin kirası artık eskisinden çok daha ağır.",
    secenekler: [
      {
        metin: "Kirayı söylenmeden öde.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -8,
          otorite_iliski: 3,
          mutluluk: -1,
          mesaj: "Kirayı ödedin. {otorite}'in kâtibi bunu defterine 'itaatkâr esnaf' diye geçirdi.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Pazar kâtibine gidip artışın haksızlığını anlat.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 6,
          otorite_iliski: 2,
          mesaj: "Kâtip tezgâhının kirasını eski haline getirdi, hatta bir yıllık küçük bir indirim de yazdı.",
        },
        basarisizSonuc: {
          para: -14,
          otorite_iliski: -6,
          mesaj: "Kâtip seni 'huzursuzluk çıkaran' diye kaydetti; üstüne gecikme faizi bindirdi.",
        },
      },
      {
        metin: "Tezgâhını başka bir pazara taşı.",
        baseBasariSansi: 60,
        maliyet: 10,
        kilitAciklamasi: "Tezgâhı taşıtacak ve yeniden kuracak paran yok.",
        basariliSonuc: {
          para: 10,
          pazar_payi_artis: 1,
          otorite_iliski: -3,
          mesaj: "Komşu pazarda yeni müşteri buldun, kira da düşük. {otorite} gidişini kendi pazarına hakaret saydı.",
        },
        basarisizSonuc: {
          para: -14,
          un: -2,
          otorite_iliski: -3,
          mutluluk: -2,
          mesaj: "Yeni pazar beklediğin kadar kazançlı çıkmadı. Eski yerin de başkasına verildi.",
        },
      },
    ],
  },
  {
    id: "otorite_tuccar_oc_imtiyaz",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    minYas: 24,
    agirlik: 1,
    gorsel: "📜",
    baslik: "Ticaret İmtiyazı",
    metin:
      "{otorite}, şehre gelen tuzun ve baharatın satış imtiyazını bir tüccara verecek. Bu imtiyaz pahalı ama pazarda adını yükseltir. Kapıdaki kâtip fısıltıyla bir 'hediye' bedeli söylüyor.",
    secenekler: [
      {
        metin: "Büyük teklifi ver, imtiyazı tek başına al.",
        baseBasariSansi: 55,
        maliyet: 25,
        kilitAciklamasi: "{otorite}'in istediği büyük teklifi verecek kadar paran yok.",
        basariliSonuc: {
          para: -12,
          pazar_payi_artis: 2,
          otorite_iliski: 6,
          un: 3,
          mesaj: "İmtiyaz senin oldu. İlk aylar pahalıya geldi ama pazarın en büyük tüccarlarından biri artık sensin.",
        },
        basarisizSonuc: {
          para: -28,
          otorite_iliski: -3,
          mutluluk: -3,
          mesaj: "Daha yüksek teklif veren çıktı. Hediyen geri verilmedi, imtiyaz başkasına gitti.",
        },
      },
      {
        metin: "Küçük bir ortaklık payı teklif et.",
        baseBasariSansi: 65,
        maliyet: 10,
        kilitAciklamasi: "Ortaklık payı için bile yeterli nakdin yok.",
        basariliSonuc: {
          para: -4,
          pazar_payi_artis: 1,
          otorite_iliski: 3,
          mesaj: "Ortaklık payı kabul edildi; imtiyazın küçük bir kısmı sana ayrıldı, pazarda adın duyuldu.",
        },
        basarisizSonuc: {
          para: -12,
          otorite_iliski: -2,
          mutluluk: -1,
          mesaj: "Teklifin 'çok cılız' bulundu. Hediye bedelini yine de ödemek zorunda kaldın.",
        },
      },
      {
        metin: "Bu işe girme, kendi küçük ticaretine devam et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Fırsatı geçtin. Kâtip omuz silkti; imtiyaz başkasına gitti, sen eski düzeninde kaldın.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "otorite_tuccar_oc_kacakcilik_sorusturmasi",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    minYas: 22,
    agirlik: 1,
    gorsel: "🔍",
    baslik: "Kaçakçılık Soruşturması",
    metin:
      "{otorite}, şehre kaçak mal sokulduğuna dair bir soruşturma açtı. Çalıştığın hamallardan biri tutuklanmış ve ifadesinde senin adını anmış. Kâtipler defterlerini ve depolarını incelemek istiyor.",
    secenekler: [
      {
        metin: "Tüm kayıtları aç, açıkça sorguya gir.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 2,
          otorite_iliski: 4,
          mesaj: "Kayıtların temiz çıktı. {otorite} 'dürüst bir tüccar' dedi; hamalın günahı sana bulaşmadı.",
        },
        basarisizSonuc: {
          para: -12,
          otorite_iliski: -3,
          mutluluk: -2,
          mesaj: "Defterde birkaç küçük usulsüzlük bulundu. Kaçakçılık kanıtlanmadı ama ceza kesildi.",
        },
      },
      {
        metin: "Soruşturmacıya sessizce bir rüşvet ver.",
        baseBasariSansi: 50,
        maliyet: 15,
        kilitAciklamasi: "Soruşturmacıyı susturacak parayı bulamıyorsun.",
        basariliSonuc: {
          para: -15,
          ahlak: -5,
          suc_sinifi: "kucuk",
          mesaj: "Soruşturmacı sessizce raporu kapattı. İş yatıştı ama bu borcu bir gün sana hatırlatacaklar.",
        },
        basarisizSonuc: {
          para: -30,
          otorite_iliski: -9,
          suc_sinifi: "orta",
          mutluluk: -3,
          mesaj: "Rüşvet teklifi tutanağa geçti. Hem para gitti hem de {otorite} seni kara listeye aldı.",
        },
      },
      {
        metin: "Hamalın hatasını üstüne al, cezayı ödeyip konuyu kapat.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -16,
          ahlak: 2,
          otorite_iliski: 4,
          mutluluk: -2,
          mesaj: "Cezayı üstlendin. {otorite} bu tavrı takdir etti; soruşturma sessizce kapandı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },

  // ═════════════════════════ TÜCCAR — SANAYİ DEVRİMİ (4) ═════════════════════════
  {
    id: "otorite_tuccar_sd_ithalat_denetimi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🚢",
    baslik: "Gümrükte Denetim",
    metin:
      "{otorite}, gümrük idaresine sıkı denetim emri vermiş. Limana yeni inen kasaların yarısı açılıyor. Senin sevkiyatın da sırada; müfettiş beyannameni fazla 'iyimser' buluyor.",
    secenekler: [
      {
        metin: "Gerçek değeri beyan et, gümrüğü tam öde.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -9,
          otorite_iliski: 3,
          mesaj: "Beyannamen doğru çıktı, gümrüğü ödedin. Müfettiş {otorite}'e 'düzenli bir ithalatçı' diye yazdı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Değeri düşük göster, kasaları 'ucuz mal' diye geçir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          ahlak: -3,
          suc_sinifi: "kucuk",
          mesaj: "Müfettiş iki kasa açıp bıraktı. Gümrükten ciddi tasarruf ettin.",
        },
        basarisizSonuc: {
          para: -28,
          otorite_iliski: -8,
          suc_sinifi: "orta",
          un: -3,
          mutluluk: -2,
          mesaj: "Kasaların dibinde pahalı mal bulundu. Ağır para cezası kesildi ve {otorite} seni gözetim altına aldı.",
        },
      },
      {
        metin: "Denetim yönetmeliğinin sevkiyatına uymadığını savun.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 4,
          un: 2,
          otorite_iliski: 2,
          mesaj: "Yönetmeliğin ayrıntısına dayanıp sevkiyatını bekletmeden çıkardın. {otorite} dirayetini fark etti.",
        },
        basarisizSonuc: {
          para: -8,
          otorite_iliski: -5,
          mutluluk: -2,
          mesaj: "Savunman reddedildi, sevkiyat günlerce limanda bekledi ve depo masrafı sana yazıldı.",
        },
      },
    ],
  },
  {
    id: "otorite_tuccar_sd_fiyat_tarifesi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar"],
    minYas: 20,
    agirlik: 1,
    gorsel: "⚖️",
    baslik: "Azami Fiyat Tarifesi",
    metin:
      "Şehirde kıtlık söylentileri artınca {otorite}, ekmek, kömür ve kumaş için azami satış fiyatı belirledi. Tarifeye göre dükkânında ürünlerin çoğu maliyetine yakın satılacak. Tarife kontrolü sıkı değil ama gözler üzerinde.",
    secenekler: [
      {
        metin: "Tarifeye harfiyen uy.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -6,
          otorite_iliski: 4,
          mutluluk: -1,
          mesaj: "Fiyatları tarifeye çektin. Kârın azaldı ama {otorite} seni örnek bir esnaf olarak anmaya başladı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Tarifeyi aş, gizlice yüksek fiyatla sat.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 16,
          ahlak: -4,
          suc_sinifi: "kucuk",
          otorite_iliski: -3,
          mesaj: "Müşterilerin çoğu fazla fiyata ses çıkarmadı. Sessizce kazandın ama bir gün bunun hesabı sorulabilir.",
        },
        basarisizSonuc: {
          para: -22,
          otorite_iliski: -8,
          un: -4,
          suc_sinifi: "kucuk",
          mutluluk: -3,
          mesaj: "Bir müfettiş müşteri gibi alışveriş yaptı. Dükkânına kapatma tehdidiyle ağır bir ceza kesildi.",
        },
      },
      {
        metin: "{otorite}'e maliyetlerini belgeleyip tarifenin düzeltilmesini iste.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 6,
          otorite_iliski: 3,
          mesaj: "Belgelerin ikna edici bulundu; tarife senin ürünlerin için hafifçe yukarı çekildi.",
        },
        basarisizSonuc: {
          un: -2,
          otorite_iliski: -4,
          mutluluk: -1,
          mesaj: "{otorite} itirazı 'vurgunculuğun bahanesi' saydı. Tarife değişmedi, adın biraz lekelendi.",
        },
      },
    ],
  },
  {
    id: "otorite_tuccar_sd_tedarik_ihalesi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar"],
    minYas: 24,
    agirlik: 1,
    gorsel: "🚂",
    baslik: "Tedarik İhalesi",
    metin:
      "{otorite}, şehrin demiryolu istasyonu ve garnizonu için yıllık tedarik ihalesi açıyor. Kazanan, şehrin en büyük müşterisine sahip olacak. Ama ihale katılım depozitosu ağır ve dedikodular, sonucun baştan 'ayarlandığını' fısıldıyor.",
    secenekler: [
      {
        metin: "Tam teklifi ver, ihaleye ciddiyetle gir.",
        baseBasariSansi: 55,
        maliyet: 25,
        kilitAciklamasi: "Depozitoyu karşılayacak kadar nakdin yok.",
        basariliSonuc: {
          para: -12,
          pazar_payi_artis: 2,
          otorite_iliski: 6,
          un: 3,
          mesaj: "İhale senin oldu. Garnizon ve istasyon artık senden alıyor; pazardaki payın belirgin biçimde büyüdü.",
        },
        basarisizSonuc: {
          para: -28,
          otorite_iliski: -3,
          mutluluk: -3,
          mesaj: "İhale, sonucu bilinen birine gitti. Depozito geri verilmedi.",
        },
      },
      {
        metin: "Daha küçük bir kalem için teklif ver.",
        baseBasariSansi: 65,
        maliyet: 10,
        kilitAciklamasi: "Küçük kalemin depozitosunu bile veremiyorsun.",
        basariliSonuc: {
          para: -4,
          pazar_payi_artis: 1,
          otorite_iliski: 3,
          mesaj: "Küçük kalemi kazandın; garnizonun yem ve kömür siparişi artık sende.",
        },
        basarisizSonuc: {
          para: -12,
          otorite_iliski: -2,
          mutluluk: -1,
          mesaj: "Kalem başka bir firmaya gitti, depozito geri dönmedi.",
        },
      },
      {
        metin: "İhaleye hiç girme, mevcut müşterilerinle yetin.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Fırsatı geçtin. Düzenin bozulmadı ama pazarda büyüyen bir rakip fark ettin.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "otorite_tuccar_sd_ziyafet_hediyesi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar"],
    minYas: 22,
    agirlik: 1,
    gorsel: "🥂",
    baslik: "Yıllık Ziyafet",
    metin:
      "{otorite}, yıllık davetini veriyor. Şehrin bütün büyük tüccarları orada olacak ve herkes bir 'armağan' götürecek. Resmen zorunlu değil; ama kimin ne götürdüğü, kimin geldiği bir sonraki yılın ayrıcalıklarını belirliyor.",
    secenekler: [
      {
        metin: "Pahalı bir hediye götür, dikkat çek.",
        baseBasariSansi: 70,
        maliyet: 15,
        kilitAciklamasi: "Gösterişli bir hediye alacak paran yok.",
        basariliSonuc: {
          para: -15,
          un: 2,
          otorite_iliski: 7,
          mesaj: "Hediyen salonda dikkat çekti. {otorite} seni masasına çağırdı; önümüzdeki yıl kapısı sana açık.",
        },
        basarisizSonuc: {
          para: -15,
          otorite_iliski: -1,
          mutluluk: -2,
          mesaj: "Hediyen daha pahalı armağanların arasında kaybolup gitti. Hem para harcadın hem fark edilmedin.",
        },
      },
      {
        metin: "Mütevazı bir hediye götür, nezaket borcunu öde.",
        baseBasariSansi: 100,
        maliyet: 5,
        kilitAciklamasi: "Nezaket hediyesine ayıracak bir kuruşun bile yok.",
        basariliSonuc: {
          para: -5,
          otorite_iliski: 2,
          mesaj: "Küçük hediyen nezaketle karşılandı. Kimse seni özel biri saymadı ama kimse de unutmadı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Davete gitme ve hediye de gönderme.",
        baseBasariSansi: 100,
        basariliSonuc: {
          otorite_iliski: -6,
          mutluluk: -1,
          mesaj: "Eksikliğin fark edildi. {otorite}'in kâtibi 'şehre saygısızlık' diye not aldı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },

  // ═════════════════════════ ZANAATKÂR — ORTA ÇAĞ (4) ═════════════════════════
  {
    id: "otorite_zanaat_oc_ayar_denetimi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "📏",
    baslik: "Ölçü ve Ayar Denetimi",
    metin:
      "{otorite}'in görevlendirdiği ayar memuru atölyene geldi. Ölçülerini, tartılarını ve ürünlerinin kalitesini kontrol edecek. Eksik çıkan atölyeler halkın önünde teşhir ediliyor.",
    secenekler: [
      {
        metin: "Ölçü ve tartılarını denetimden önce baştan düzelt.",
        baseBasariSansi: 100,
        maliyet: 5,
        kilitAciklamasi: "Aletlerini yeniden ayarlatacak paran yok.",
        basariliSonuc: {
          para: -5,
          un: 1,
          otorite_iliski: 2,
          mesaj: "Ayarlarını tamamladın. Memur 'kusursuz' demedi ama tek bir sorun bulamadı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Memurun gözünü boyayarak eksik ayarı fark ettirme.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 8,
          ahlak: -3,
          suc_sinifi: "kucuk",
          mesaj: "Memur aleti kaba bir ölçüyle sınadı ve geçti. Fazladan maliyete girmedin.",
        },
        basarisizSonuc: {
          para: -24,
          un: -5,
          otorite_iliski: -7,
          suc_sinifi: "kucuk",
          mutluluk: -2,
          mesaj: "Eksik ayar ortaya çıktı. Atölyenin kapısına teşhir levhası asıldı, {otorite} de durumdan haberdar oldu.",
        },
      },
      {
        metin: "Atölyeyi olduğu gibi göster, ürünlerinin kalitesine güven.",
        baseBasariSansi: 75,
        basariliSonuc: {
          un: 4,
          otorite_iliski: 3,
          mesaj: "Memur ürünlerine hayran kaldı ve raporuna övgüyle yazdı. {otorite} bunu duydu.",
        },
        basarisizSonuc: {
          para: -10,
          otorite_iliski: -2,
          mutluluk: -1,
          mesaj: "Memur birkaç küçük kusur buldu; ufak bir ceza yazıldı ve ayarları düzeltmek zorunda kaldın.",
        },
      },
    ],
  },
  {
    id: "otorite_zanaat_oc_hammadde_tahsisi",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🪵",
    baslik: "Hammadde Tahsisi",
    metin:
      "Şehir surlarının onarımı için {otorite} kereste ve demirin satışını kısıtladı; atölyelere sadece sınırlı bir pay düşüyor. Elindeki stok yakında bitecek ve yeni sipariş alırsan malzemesiz kalabilirsin.",
    secenekler: [
      {
        metin: "Dilekçeyle {otorite}'e başvurup fazladan tahsis iste.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 6,
          un: 1,
          otorite_iliski: 3,
          mesaj: "Dilekçen ciddiye alındı; atölyene tam pay yerine biraz daha fazla malzeme verildi.",
        },
        basarisizSonuc: {
          para: -4,
          otorite_iliski: -3,
          mutluluk: -1,
          mesaj: "Dilekçen 'sıra bekleyenlerden biri' diye kenara kondu. Hem zaman hem paran gitti.",
        },
      },
      {
        metin: "Karaborsadan gizlice kereste ve demir tedarik et.",
        baseBasariSansi: 55,
        maliyet: 12,
        kilitAciklamasi: "Karaborsacıya verecek kadar nakdin yok.",
        basariliSonuc: {
          para: 10,
          ahlak: -4,
          suc_sinifi: "kucuk",
          mesaj: "Karaborsadan gelen malzemeyle üretimin sürdü, siparişlerini yetiştirdin ve kazancını korudun.",
        },
        basarisizSonuc: {
          para: -26,
          otorite_iliski: -7,
          ahlak: -3,
          suc_sinifi: "orta",
          mutluluk: -2,
          mesaj: "Karaborsa malı müsadere edildi. {otorite} atölyeni 'ambargoyu delen' olarak işaretledi.",
        },
      },
      {
        metin: "Kısıtlı malzemeyle yetin, üretimi küçült.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -8,
          otorite_iliski: 1,
          mutluluk: -1,
          mesaj: "Üretimi küçülttün, birkaç siparişi geri çevirdin. Gelirin düştü ama kural dışına çıkmadın.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "otorite_zanaat_oc_ruhsat_yenileme",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🔖",
    baslik: "Atölye Ruhsatı",
    metin:
      "Atölye ruhsatının yenilenme zamanı geldi. {otorite}'in kâtipleri harcı ve masrafı hesapladı; rakam kabarık. Ruhsatsız çalışmak ise ağır bir suç.",
    secenekler: [
      {
        metin: "Harcı eksiksiz öde, ruhsatı yenile.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -14,
          otorite_iliski: 2,
          mesaj: "Ruhsatını yeniledin. Kâtip tebessüm etti; atölyen yasal güvence altında.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Kâtibe bir kese bırak, harcı küçülttür.",
        baseBasariSansi: 55,
        maliyet: 8,
        kilitAciklamasi: "Kâtibe uzatacak bir kese bile yok.",
        basariliSonuc: {
          para: -8,
          ahlak: -4,
          suc_sinifi: "kucuk",
          mesaj: "Kâtip harcı yarıya düşürdü ve ruhsatı hemen yazdı.",
        },
        basarisizSonuc: {
          para: -22,
          otorite_iliski: -8,
          suc_sinifi: "orta",
          mutluluk: -3,
          mesaj: "Rüşvet ortaya çıktı: ruhsat askıya alındı, ceza ödedin ve {otorite} seni gözden çıkardı.",
        },
      },
      {
        metin: "Yenilemeyi ertele ve ruhsatsız çalışmaya devam et.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 6,
          ahlak: -3,
          suc_sinifi: "kucuk",
          mesaj: "Kimse kontrol etmedi; harcı bu yıl ödemeden geçtin.",
        },
        basarisizSonuc: {
          para: -24,
          otorite_iliski: -8,
          suc_sinifi: "kucuk",
          mutluluk: -3,
          mesaj: "Gece baskınında ruhsatsız çalıştığın ortaya çıktı. Ağır ceza kesildi, atölyen birkaç gün mühürlendi.",
        },
      },
    ],
  },
  {
    id: "otorite_zanaat_oc_bedelsiz_is",
    kategori: "zanaat",
    cag: "Orta Çağ",
    meslekler: ["Zanaatkâr"],
    minYas: 22,
    agirlik: 1,
    gorsel: "🏗️",
    baslik: "Şehir İçin Bedelsiz İş",
    metin:
      "{otorite}, sur kapısının demir işlerini ve su yolunun onarımını şehrin usta zanaatkârlarından 'gönüllü hizmet' olarak istiyor. Bedel yok; ama şehir bu hizmeti unutmayacak, unutmayanların da belleği iki yönlü.",
    secenekler: [
      {
        metin: "Hizmeti bedelsiz kabul et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -14,
          un: 3,
          otorite_iliski: 8,
          mutluluk: -1,
          mesaj: "İşi tam özenle bitirdin. {otorite} bunu halkın önünde anlattı; adın ve ilişkin güçlendi.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Bedelsiz kabul et ama karşılığında vergi indirimi iste.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: -14,
          un: 3,
          otorite_iliski: 6,
          vergi_degisim: { carpan: 0.85, sureYil: 3 },
          mesaj: "{otorite} pazarlığı kabul etti: iş senden, üç yıl vergi indirimi sana. Beklemediğin bir iş birliği çıktı.",
        },
        basarisizSonuc: {
          para: -14,
          otorite_iliski: -4,
          mutluluk: -2,
          mesaj: "Şart koşmanı küstahlık sayan {otorite} işi bedelsiz yaptırdı ve sana soğuk davrandı.",
        },
      },
      {
        metin: "Reddet, kendi işini yapmaya devam et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          otorite_iliski: -8,
          mutluluk: -1,
          mesaj: "Reddettin. {otorite} bunu açıkça yüzüne vurmadı ama bir daha sana yüz vermeyecek gibi görünüyor.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },

  // ═════════════════════════ ZANAATKÂR — SANAYİ DEVRİMİ (4) ═════════════════════════
  {
    id: "otorite_zanaat_sd_atolye_muffetisi",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🔧",
    baslik: "Atölye Müfettişi",
    metin:
      "{otorite}'in atadığı bir müfettiş atölyene geldi. Makinelerin koruyucularına, havalandırmaya ve ürün standardına bakıyor. Not defterine hızlı hızlı bir şeyler yazıyor.",
    secenekler: [
      {
        metin: "Müfettişin önerdiği düzeltmeleri hemen yap.",
        baseBasariSansi: 100,
        maliyet: 12,
        kilitAciklamasi: "Düzeltmeleri yaptıracak paran yok.",
        basariliSonuc: {
          para: -12,
          un: 1,
          otorite_iliski: 3,
          mesaj: "Koruyucuları taktırdın, havalandırmayı onardın. Müfettiş raporunu olumlu yazdı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Müfettişe 'masraf karşılığı' bir miktar bırak.",
        baseBasariSansi: 50,
        maliyet: 6,
        kilitAciklamasi: "Müfettişe verecek bir miktar paran yok.",
        basariliSonuc: {
          para: -6,
          ahlak: -4,
          suc_sinifi: "kucuk",
          mesaj: "Müfettiş eksikleri raporuna yazmadı. Ama her şey yerli yerinde değil — bir kaza çıkarsa hesabı sorulur.",
        },
        basarisizSonuc: {
          para: -22,
          otorite_iliski: -7,
          suc_sinifi: "orta",
          mutluluk: -2,
          mesaj: "Müfettiş teklifi rapora geçirdi. Atölyen cezalandırıldı ve {otorite} seni sicile işledi.",
        },
      },
      {
        metin: "Standartların abartılı olduğunu savun, itiraz et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 4,
          un: 2,
          otorite_iliski: 1,
          mesaj: "Müfettiş birkaç maddeyi hafifletti; tasarrufunu korudun.",
        },
        basarisizSonuc: {
          para: -14,
          otorite_iliski: -5,
          mutluluk: -2,
          mesaj: "İtirazın reddedildi; hem düzeltmeleri yaptırdın hem ek bir ceza yedin.",
        },
      },
    ],
  },
  {
    id: "otorite_zanaat_sd_komur_ambargosu",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "⛏️",
    baslik: "Kömür ve Demir Kısıtı",
    metin:
      "Savaş hazırlıkları yüzünden {otorite}, kömür ve demirin sivil atölyelere satışını kısıtladı. Atölyen tezgâh başında bekleyen işçilerle dolu, fırınların soğuyor. Resmî tahsis bekleyenler uzun bir kuyrukta.",
    secenekler: [
      {
        metin: "Resmî tahsis için {otorite}'e dilekçe ver.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 6,
          un: 1,
          otorite_iliski: 3,
          mesaj: "Dilekçen sırayı öne aldı; atölyene sınırlı ama yeterli bir tahsis çıktı.",
        },
        basarisizSonuc: {
          para: -4,
          otorite_iliski: -3,
          mutluluk: -1,
          mesaj: "Dilekçen sıraya girdi, ama sıra gelmedi; zaman ve işçi parası gitti.",
        },
      },
      {
        metin: "Kaçak kömür ve demir satan tedarikçilerden mal bul.",
        baseBasariSansi: 55,
        maliyet: 12,
        kilitAciklamasi: "Kaçak tedarikçiye ödeyecek nakdin yok.",
        basariliSonuc: {
          para: 10,
          ahlak: -4,
          suc_sinifi: "kucuk",
          mesaj: "Fırınların yandı, siparişler zamanında çıktı. Kaçak mal pahalıydı ama karını korudun.",
        },
        basarisizSonuc: {
          para: -26,
          otorite_iliski: -7,
          ahlak: -3,
          suc_sinifi: "orta",
          mutluluk: -2,
          mesaj: "Kaçak mal sevkiyatı yakalandı. {otorite} atölyeni 'kısıtı delen' olarak not etti ve malı el koydu.",
        },
      },
      {
        metin: "Üretimi küçült, mevcut stokla idare et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -8,
          otorite_iliski: 1,
          mutluluk: -1,
          mesaj: "Üretimi küçülttün, iki ustayı izne çıkardın. Gelirin düştü ama temiz kaldın.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "otorite_zanaat_sd_ordu_siparisi",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    minYas: 24,
    agirlik: 1,
    gorsel: "🎖️",
    baslik: "Büyük Devlet Siparişi",
    metin:
      "{otorite}, ordunun yeni çelik donanım siparişini dağıtıyor. Sana önerilen miktar büyük: yetiştirirsen şehrin en önemli atölyelerinden biri olursun, yetiştiremezsen gecikme cezası ağır.",
    secenekler: [
      {
        metin: "Büyük siparişi tümüyle kabul et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 30,
          pazar_payi_artis: 2,
          un: 4,
          otorite_iliski: 5,
          mutluluk: -2,
          mesaj: "Gece gündüz çalışıp siparişi zamanında teslim ettin. Atölyen şehrin en önemlilerinden biri oldu, ama işçiler yoruldu.",
        },
        basarisizSonuc: {
          para: -22,
          un: -3,
          otorite_iliski: -6,
          mutluluk: -3,
          mesaj: "Teslimat aksadı. Gecikme cezasını ödedin ve {otorite} sipariş payını başka bir atölyeye devretti.",
        },
      },
      {
        metin: "Siparişin yalnızca bir bölümünü üstlen.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 12,
          pazar_payi_artis: 1,
          otorite_iliski: 2,
          mesaj: "Üstlendiğin payı sorunsuz teslim ettin. Hem kâr ettin hem yük altında ezilmedin.",
        },
        basarisizSonuc: {
          para: -6,
          otorite_iliski: -2,
          mutluluk: -1,
          mesaj: "Küçük bir gecikme yaşandı, ufak bir ceza yedin.",
        },
      },
      {
        metin: "Siparişi reddet, kendi müşterilerine odaklan.",
        baseBasariSansi: 100,
        basariliSonuc: {
          otorite_iliski: -4,
          mutluluk: -1,
          mesaj: "Reddettin. {otorite} 'şehrin işine yaramayan' diye not aldı ama müşterilerin sana minnettar.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "otorite_zanaat_sd_yangin_yardimi",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🔥",
    baslik: "Yangından Sonra",
    metin:
      "Gece atölyenin bir kanadı yandı. Duvarlar isli, makineler yarı eridi. {otorite} afetzedeler için küçük bir yardım fonu açtı; ama başvuranlar çok ve evrak istiyorlar.",
    secenekler: [
      {
        metin: "{otorite}'in yardım fonuna başvur.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 14,
          otorite_iliski: 3,
          mesaj: "Başvurun kabul edildi; fondan sana makul bir yardım ayrıldı.",
        },
        basarisizSonuc: {
          para: -6,
          otorite_iliski: -2,
          mutluluk: -2,
          mesaj: "Evrakların eksik bulundu. Zaman kaybettin ve gerekli masrafı kendin karşıladın.",
        },
      },
      {
        metin: "Komşu atölyelerden ve loncadan yardım iste.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -8,
          un: 2,
          mutluluk: -1,
          mesaj: "Komşular sahip çıktı, atölye birkaç haftada ayağa kalktı. Bu yardımı bir gün sen de geri ödeyeceksin.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Kimseye yük olma, her şeyi kendin toparla.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -14,
          ahlak: 1,
          mutluluk: -2,
          mesaj: "Atölyeyi kendi imkânlarınla onardın. Pahalıya geldi ama kimseye borcun kalmadı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  // ═════════════════════════ DİN ADAMI (4) ═════════════════════════
  {
    id: "otorite_din_oc_adak_payi",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    minYas: 20,
    agirlik: 1,
    gorsel: "⛪",
    baslik: "Adak Payı",
    metin:
      "{otorite}'in kâtibi geldi: bu yıl adak ve bağış gelirinin bir kısmı şehir hazinesine yazılacakmış. 'Kutsal para da paradır' diyor.",
    secenekler: [
      {
        metin: "Payı eksiksiz teslim et, makbuzu al.",
        baseBasariSansi: 100,
        basariliSonuc: { para: -6, otorite_iliski: 2, mesaj: "Payı teslim ettin. {otorite} cemaatin bu 'düzenli' halinden memnun kaldı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Bağış defterini eksik göster, payı küçült.",
        baseBasariSansi: 55,
        maliyet: 4,
        kilitAciklamasi: "Kâtibi ikna edecek bir armağan bile alamıyorsun.",
        basariliSonuc: { para: 8, ahlak: -4, suc_sinifi: "kucuk", mesaj: "Kâtip defterde 'kıtlık yılı' diye yazdı; payın yarısı cebinde kaldı." },
        basarisizSonuc: { para: -22, otorite_iliski: -7, un: -3, suc_sinifi: "orta", mesaj: "Cemaatten biri defteri ele verdi. {otorite} payı iki katına çıkardı; adın kötüye çıktı." },
      },
      {
        metin: "{otorite}'e gidip adağın yoksulların hakkı olduğunu anlat.",
        baseBasariSansi: 50,
        basariliSonuc: { para: 4, un: 2, otorite_iliski: 3, mesaj: "{otorite} seni dinledi ve payı küçülttü. Yoksullar adına hayır dua etti." },
        basarisizSonuc: { para: -6, un: -2, otorite_iliski: -6, mesaj: "{otorite} 'kutsal para da vergiye tabidir' dedi. Hem payı ödedin hem gözden düştün." },
      },
    ],
  },
  {
    id: "otorite_din_oc_vakif_arazisi",
    kategori: "din",
    cag: "Orta Çağ",
    meslekler: ["Din Adamı"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🌾",
    baslik: "Vakıf Arazisi",
    metin:
      "Manastırın komşu arazisi satılığa çıktı. {otorite} satışı onaylayacak kişi; ruhsat için 'cemaate katkı' bekliyor. Araziyi alırsan ambarın ve cemaatin büyür.",
    secenekler: [
      {
        metin: "Resmî harcı öde, araziyi kurallara uygun al.",
        baseBasariSansi: 100,
        basariliSonuc: { para: -10, otorite_iliski: 2, pazar_payi_artis: 0.5, mesaj: "Harcı ödedin, tapu kaydı yapıldı. Cemaat yeni arazide çalışmaya başladı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "{otorite}'e ruhsat için kese uzat.",
        baseBasariSansi: 55,
        maliyet: 8,
        kilitAciklamasi: "{otorite}'e uzatacak bir kese bile bulamıyorsun.",
        basariliSonuc: { para: -2, pazar_payi_artis: 1, ahlak: -4, suc_sinifi: "kucuk", mesaj: "Ruhsat çabucak çıktı; arazi hem ucuza hem hızlı geldi." },
        basarisizSonuc: { para: -24, otorite_iliski: -7, un: -3, suc_sinifi: "orta", mesaj: "Rüşvet dedikodusu yayıldı. Ruhsat iptal oldu, kese de geri gelmedi." },
      },
      {
        metin: "Araziyi almaktan vazgeç, elindekiyle yetin.",
        baseBasariSansi: 100,
        basariliSonuc: { otorite_iliski: 1, mutluluk: 1, mesaj: "Yeni bir yük almadın. {otorite} temkinli tavrına saygı duydu." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "otorite_din_sd_ruhsat_denetimi",
    kategori: "din",
    cag: "Sanayi Devrimi",
    meslekler: ["Din Adamı"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🏛️",
    baslik: "Ruhsat Denetimi",
    metin:
      "{otorite}'in memuru ibadethaneni denetlemeye geldi: bağış kayıtları, hayır yemeği, vaaz ruhsatı… Küçük bir eksik bile ağır ceza getirir.",
    secenekler: [
      {
        metin: "Tüm kayıtları açıp denetime yardım et.",
        baseBasariSansi: 100,
        basariliSonuc: { otorite_iliski: 2, un: 1, mesaj: "Denetim sorunsuz bitti. {otorite} raporuna 'örnek bir cemaat' yazdı." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Memura 'masraf' diye bir zarf uzat.",
        baseBasariSansi: 55,
        maliyet: 8,
        kilitAciklamasi: "Memura uzatacak bir zarf bile bulamıyorsun.",
        basariliSonuc: { para: 2, ahlak: -4, suc_sinifi: "kucuk", mesaj: "Memur eksikleri görmezden geldi, rapor temiz çıktı." },
        basarisizSonuc: { para: -26, otorite_iliski: -7, un: -3, suc_sinifi: "orta", mesaj: "Zarf rapora girdi. {otorite} ceza kesti ve seni yakın takibe aldı." },
      },
      {
        metin: "Kayıtları gizle, 'defterler yandı' de.",
        baseBasariSansi: 45,
        basariliSonuc: { para: 4, ahlak: -5, suc_sinifi: "kucuk", mesaj: "Denetim kayıt bulamayıp çekildi; sen de paranın izini sildin." },
        basarisizSonuc: { para: -22, otorite_iliski: -8, un: -4, suc_sinifi: "orta", mesaj: "Memur yan odadaki defteri buldu. Ruhsat askıya alındı, ağır para cezası geldi." },
      },
    ],
  },
  {
    id: "otorite_din_sd_hayir_cemiyeti",
    kategori: "din",
    cag: "Sanayi Devrimi",
    meslekler: ["Din Adamı"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🤝",
    baslik: "Hayır Cemiyeti",
    metin:
      "Şehirde bir hayır cemiyeti kuruluyor; {otorite} cemiyetin başına seni önerdi. Çalışan mahallesine yardım edersen cemaat büyür, ama kaydı ve hesapları sıkı tutmalısın.",
    secenekler: [
      {
        metin: "Başkanlığı kabul et, cemiyeti titizlikle yönet.",
        baseBasariSansi: 100,
        basariliSonuc: { para: -6, un: 3, otorite_iliski: 3, pazar_payi_artis: 0.5, mesaj: "Cemiyet mahallede iyi iş çıkardı; cemaat büyüdü, {otorite} de seni hatırında tuttu." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Kabul et ama kasayı kendi işine de kullan.",
        baseBasariSansi: 45,
        basariliSonuc: { para: 12, ahlak: -6, suc_sinifi: "kucuk", mesaj: "Cemiyet kasasından kendi işine para akıttın; kimse fark etmedi." },
        basarisizSonuc: { para: -24, otorite_iliski: -8, un: -5, ahlak: -4, suc_sinifi: "orta", mesaj: "Hesaplar karışınca denetçi izi buldu. {otorite} seni cemiyetten azletti, kamuoyunda adın zedelendi." },
      },
      {
        metin: "Teklifi kibarca geri çevir.",
        baseBasariSansi: 100,
        basariliSonuc: { mutluluk: 1, otorite_iliski: -1, mesaj: "İşin yoğunluğunu bahane ettin. {otorite} başını salladı; cemiyet başkasına gitti." },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
];
