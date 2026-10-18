import type { OlayTanimi } from "./types";

/**
 * VERGİ olayları (2026-10). Tüccar ve Zanaatkâr işletmesinde yıllık vergi,
 * brüt kârın %12'sidir; bu olaylar `vergi_degisim` ({carpan, sureYil}) ile o oranı
 * belirli yıl boyunca çarpar (0.7 = %30 indirim, 1.25 = %25 zam). Her çağda dört
 * sahne: (1) tahsildar kapıda, (2) yeni vergi ilanı, (3) vergi affı fırsatı,
 * (4) vergi toplama yetkisi teklifi. Hepsi `siyaset` kategorisinde olduğu için
 * meslek kategori bonusu/mesleğe uygun kategori çarpanı devreye girmez.
 */
export const OLAY_VERGI: OlayTanimi[] = [
  // ───────────────────────── ORTA ÇAĞ (4) ─────────────────────────
  {
    id: "vergi_oc_tahsildar_kapida",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Tüccar", "Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "📜",
    baslik: "Tahsildar Kapında",
    metin:
      "Öşür ve haraç tahsildarı, yanında iki mühürlü kâtip ve bir muhafızla kapına dayandı. Kazancını gözleriyle tartıyor: 'Bu yılın payı, beyim. Mühürlü deftere göre ödeme zamanı geldi.'",
    secenekler: [
      {
        metin: "Hakkını eksiksiz öde, mühürlü makbuzunu al.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -9,
          mutluluk: -1,
          mesaj: "Payını sayıp teslim ettin. Tahsildar makbuzu mühürledi; en azından bu yıl kapına bir daha gelmeyecek.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Tahsildarın cebine gizlice bir kese bırak, payı düşük yazdır.",
        baseBasariSansi: 55,
        maliyet: 6,
        kilitAciklamasi: "Tahsildarı ikna edecek bir keseyi cebinde bulamıyorsun.",
        basariliSonuc: {
          para: -6,
          ahlak: -5,
          suc_sinifi: "kucuk",
          vergi_degisim: { carpan: 0.7, sureYil: 4 },
          mesaj: "Kese sessizce el değiştirdi. Tahsildar defterine düşük bir rakam yazdı; önümüzdeki yıllarda payın hafifleyecek.",
          detay: "Ama bu iş bir kere başladı mı, tahsildar seni hep aklında tutar.",
        },
        basarisizSonuc: {
          para: -20,
          ahlak: -4,
          suc_sinifi: "orta",
          otorite_iliski: -6,
          mutluluk: -2,
          mesaj: "Tahsildar keseyi alıp seni muhafızın önünde ifşa etti. Hem keseyi hem cezayı ödedin, kasabada adın kötüye çıktı.",
        },
      },
      {
        metin: "Gerçek defterleri sakla, tahsildara 'yanan' bir defter göster.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 10,
          ahlak: -3,
          suc_sinifi: "kucuk",
          mesaj: "Eksik defteri gösterdin, tahsildar inandı ve payı çok düşük hesapladı. Kazancının bir kısmını yanına kâr kaldın.",
        },
        basarisizSonuc: {
          para: -25,
          otorite_iliski: -8,
          suc_sinifi: "orta",
          ahlak: -3,
          mutluluk: -3,
          mesaj: "Kâtipler gizli defteri buldu. Ağır bir ceza ödedin ve kasaba yöneticisinin gözünden düştün.",
        },
      },
    ],
  },
  {
    id: "vergi_oc_yeni_vergi_ilani",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Tüccar", "Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "📯",
    baslik: "Yeni Vergi İlanı",
    metin:
      "Meydanda tellal haykırıyor: savaş masrafları ve kale onarımı için yeni bir harç konulmuş. Esnaf mırıldanıyor, bazıları dükkânını kapatmaktan bahsediyor. Senin payın da belli: yüzde yirmi beş fazla.",
    secenekler: [
      {
        metin: "Sessizce ödemeyi kabul et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -4,
          otorite_iliski: 3,
          vergi_degisim: { carpan: 1.25, sureYil: 3 },
          mutluluk: -1,
          mesaj: "Harcı kabul ettin. Yönetim bunu itaat sayıp sana iyi gözle baktı, ama önümüzdeki üç yıl vergi yükün hissedilir şekilde artacak.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Meclise itiraz dilekçesi ver, adaletsizliği anlat.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 2,
          otorite_iliski: 1,
          mesaj: "Dilekçen dinlendi ve payın artırılmadı. Birkaç esnaf da seni örnek alıp arkandan geldi.",
        },
        basarisizSonuc: {
          vergi_degisim: { carpan: 1.25, sureYil: 3 },
          otorite_iliski: -5,
          mutluluk: -2,
          mesaj: "Dilekçen reddedildi, üstüne 'şikâyetçi' diye kayda geçtin. Zam yine de senin payına yazıldı.",
        },
      },
      {
        metin: "Loncanla birleşip toplu pazarlığa otur.",
        baseBasariSansi: 55,
        maliyet: 6,
        kilitAciklamasi: "Lonca masrafına katılacak kadar paran yok.",
        basariliSonuc: {
          para: -6,
          un: 2,
          vergi_degisim: { carpan: 0.85, sureYil: 4 },
          mesaj: "Lonca adına gittiniz, yöneticiler zam yerine küçük bir indirimde anlaştı. Dört yıl boyunca hafiflemiş bir vergi ödeyeceksin.",
        },
        basarisizSonuc: {
          para: -10,
          un: -2,
          mutluluk: -2,
          mesaj: "Toplu görüşme tartışmaya döndü, lonca ikiye bölündü. Masraf boşa gitti ve zam senin payına da yazıldı.",
        },
      },
    ],
  },
  {
    id: "vergi_oc_vergi_affi_firsati",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Tüccar", "Zanaatkâr"],
    minYas: 22,
    agirlik: 1,
    gorsel: "⛪",
    baslik: "Vergi Affı Fırsatı",
    metin:
      "Kasaba ağası, kilisenin çan kulesini yaptırmak için 'gönüllü bağış' topluyor. Bağış yapanlara mahalle vergisinde yıllarca sürecek bir indirim vaadi var. Kimse açıkça söylemiyor ama herkes biliyor: yardıma yanaşmayanlar not ediliyor.",
    secenekler: [
      {
        metin: "Büyük bir bağış yap, indirimi garantile.",
        baseBasariSansi: 70,
        maliyet: 20,
        kilitAciklamasi: "Ağanın beklediği büyük bağışı yapamayacak kadar eksiksin.",
        basariliSonuc: {
          para: -20,
          un: 2,
          otorite_iliski: 4,
          vergi_degisim: { carpan: 0.75, sureYil: 4 },
          mesaj: "Bağışın kayda geçti. Ağa seni yanına çağırıp teşekkür etti; dört yıl boyunca vergin hafifleyecek.",
        },
        basarisizSonuc: {
          para: -20,
          otorite_iliski: -2,
          mutluluk: -2,
          mesaj: "Bağışın alındı ama indirim defterine yazılmadı; kâtip 'unuttu' dedi. Parayı kimin cebine indirdiğini hiç öğrenemedin.",
        },
      },
      {
        metin: "Bağışı pazarlıkla yarıya indirmeye çalış.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: -10,
          vergi_degisim: { carpan: 0.75, sureYil: 4 },
          mesaj: "Ağayla uzun bir pazarlıktan sonra yarı bedelle anlaştınız. İndirimin tamamını aldın.",
        },
        basarisizSonuc: {
          otorite_iliski: -4,
          un: -2,
          mutluluk: -1,
          mesaj: "Pazarlık küstahlık sayıldı. Ağa seni 'cimri' diye kayda geçirdi, indirim de uçup gitti.",
        },
      },
      {
        metin: "Bağış yapma, vergini olduğu gibi öde.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Elinden gelmedi ya da gelmesini istemedin. Hiç kimse bir şey demedi, ama gözlerin üzerinde olduğunu hissettin.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "vergi_oc_toplama_yetkisi",
    kategori: "siyaset",
    cag: "Orta Çağ",
    meslekler: ["Tüccar", "Zanaatkâr"],
    minYas: 24,
    agirlik: 1,
    gorsel: "🏰",
    baslik: "Tahsil Yetkisi Teklifi",
    metin:
      "Kasaba yönetimi, mahalledeki esnaftan vergi toplama yetkisini sana vermeyi öneriyor. Her toplanan paranın küçük bir payı sana kalacak ama komşularının gözünde 'tahsildar' olacaksın. Kimse bu işi sevmiyor; yine de yönetim seni güvenilir buluyor.",
    secenekler: [
      {
        metin: "Yetkiyi kabul et ve mahalleyi sıkı sıkıya yürüt.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 22,
          ahlak: -4,
          un: -3,
          otorite_iliski: 5,
          vergi_degisim: { carpan: 0.8, sureYil: 3 },
          mesaj: "Tahsilatı başarıyla yürüttün. Yönetim cebini doldurdu, senin payına da bir indirim yazıldı — ama mahalle arkandan 'tahsildar' diye fısıldıyor.",
        },
        basarisizSonuc: {
          para: -10,
          un: -6,
          mutluluk: -3,
          mesaj: "Halk sana öfkelendi; bir gün dükkânının önüne çürük sebzeler yağdı. Yönetim de hesaptaki açığı senden istedi.",
        },
      },
      {
        metin: "Yetkiyi kabul et ama mahalleye yumuşak davran.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 12,
          un: 3,
          otorite_iliski: 3,
          vergi_degisim: { carpan: 0.9, sureYil: 3 },
          mesaj: "Hem yönetimi hem komşuları idare ettin. Toplanan rakam beklenenden az ama iki taraf da sana saygıyla baktı.",
        },
        basarisizSonuc: {
          para: -6,
          otorite_iliski: -4,
          mutluluk: -2,
          mesaj: "Yumuşaklığın yönetimi kızdırdı: eksik tahsilatı kendi cebinden kapatmak zorunda kaldın.",
        },
      },
      {
        metin: "Teklifi reddet, böyle bir işe bulaşmak istemiyorsun.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: 2,
          otorite_iliski: -5,
          mesaj: "Reddettin. Yönetim bunu iyi karşılamadı, ama vicdanın rahat.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },

  // ───────────────────────── SANAYİ DEVRİMİ (4) ─────────────────────────
  {
    id: "vergi_sd_defter_denetimi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar", "Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "🧾",
    baslik: "Defter Denetimi",
    metin:
      "Kapına temiz giyimli bir vergi memuru geldi. Elinde mühürlü bir yetki belgesi, koltuğunun altında kalın bir cilt var: 'Defterlerinizi denetleyeceğiz. Kayıtlarda bir tutarsızlık görünüyor.'",
    secenekler: [
      {
        metin: "Defterleri açık et, hesabını ver.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -9,
          mutluluk: -1,
          mesaj: "Defterlerin temiz çıktı. Memur ufak bir fark buldu, ödedin; denetim gürültüsüz kapandı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Memura 'masraf karşılığı' bir zarf uzat.",
        baseBasariSansi: 55,
        maliyet: 6,
        kilitAciklamasi: "Memura uzatacak bir zarfı bile doldurmaya paran yetmiyor.",
        basariliSonuc: {
          para: -6,
          ahlak: -5,
          suc_sinifi: "kucuk",
          vergi_degisim: { carpan: 0.7, sureYil: 4 },
          mesaj: "Zarf cebe girdi, rapor 'önemsiz fark' diye kapandı. Vergi matrahın dört yıl boyunca düşük hesaplanacak.",
        },
        basarisizSonuc: {
          para: -22,
          ahlak: -4,
          suc_sinifi: "orta",
          otorite_iliski: -6,
          mutluluk: -2,
          mesaj: "Memur zarfı tutanağa geçirdi. Rüşvet teşebbüsü cezası yedin ve belediye seni artık 'dikkat edilecekler' listesinde tutuyor.",
        },
      },
      {
        metin: "İkinci defteri gizle, memura sadece 'düzenli' olanı göster.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 10,
          ahlak: -3,
          suc_sinifi: "kucuk",
          mesaj: "Memur düzgün görünen deftere takılıp gitti. Asıl kazancın bir kısmı korunmuş oldu.",
        },
        basarisizSonuc: {
          para: -26,
          otorite_iliski: -8,
          suc_sinifi: "orta",
          ahlak: -3,
          mutluluk: -3,
          mesaj: "İkinci defter ortaya çıktı. Ağır para cezası kesildi ve belediye nezdinde itibarın sarsıldı.",
        },
      },
    ],
  },
  {
    id: "vergi_sd_gelir_beyani",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar", "Zanaatkâr"],
    minYas: 20,
    agirlik: 1,
    gorsel: "📰",
    baslik: "Yeni Gelir Beyanı",
    metin:
      "Gazeteler yeni bir kanunu duyuruyor: artık her işletme yıllık gelirini beyan edecek, oran da bir kademe artırıldı. Esnaf kahvehanelerde öfkeyle tartışıyor. Senin hesabına göre payın yüzde yirmi beş artacak.",
    secenekler: [
      {
        metin: "Kanuna uy, beyannameyi eksiksiz doldur.",
        baseBasariSansi: 100,
        basariliSonuc: {
          para: -4,
          otorite_iliski: 3,
          vergi_degisim: { carpan: 1.25, sureYil: 3 },
          mutluluk: -1,
          mesaj: "Beyannameni zamanında verdin. İdare bunu not etti ve sana iyi gözle baktı, ama üç yıl boyunca vergi yükün ağırlaşacak.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
      {
        metin: "Yazılı itiraz dilekçesi ver, avukat tut.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 2,
          otorite_iliski: 1,
          mesaj: "İtirazın kabul edildi: senin payına zam uygulanmayacak. Gazeteler davayı memnuniyetle yazdı.",
        },
        basarisizSonuc: {
          vergi_degisim: { carpan: 1.25, sureYil: 3 },
          otorite_iliski: -5,
          mutluluk: -2,
          mesaj: "Mahkeme itirazını reddetti, 'şikâyetçi esnaf' olarak kayda geçtin. Zam yine senin payına eklendi.",
        },
      },
      {
        metin: "Ticaret odasının toplu başvurusuna katıl.",
        baseBasariSansi: 55,
        maliyet: 6,
        kilitAciklamasi: "Oda aidatını bile yatıramayacak durumdasın.",
        basariliSonuc: {
          para: -6,
          un: 2,
          vergi_degisim: { carpan: 0.85, sureYil: 4 },
          mesaj: "Oda, hükûmete ortak bir yazı gönderdi; zam yerine küçük bir indirim koparıldı. Dört yıl boyunca daha hafif bir vergi ödeyeceksin.",
        },
        basarisizSonuc: {
          para: -10,
          un: -2,
          mutluluk: -2,
          mesaj: "Oda yönetimi kendi içinde kavga etti, başvuru sonuçsuz kaldı. Aidatın boşa gitti ve zam payına eklendi.",
        },
      },
    ],
  },
  {
    id: "vergi_sd_gumruk_affi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar", "Zanaatkâr"],
    minYas: 22,
    agirlik: 1,
    gorsel: "🏛️",
    baslik: "Yapılandırma Fırsatı",
    metin:
      "Belediye, hayır cemiyeti adına bir akşam yemeği düzenliyor. Katkı yapan işletmelere vergi yapılandırması sözü verilmiş: yıllarca sürecek bir indirim. Salon tanınmış isimlerle dolu; kimin bağış yapıp yapmadığı sessizce kaydediliyor.",
    secenekler: [
      {
        metin: "Cemiyete büyük bir bağış yap.",
        baseBasariSansi: 70,
        maliyet: 20,
        kilitAciklamasi: "Cemiyetin beklediği bağış miktarını karşılayamıyorsun.",
        basariliSonuc: {
          para: -20,
          un: 2,
          otorite_iliski: 4,
          vergi_degisim: { carpan: 0.75, sureYil: 4 },
          mesaj: "Bağışın adı salonda okundu. Belediye başkanı seni tebrik etti; dört yıl boyunca vergin hafifleyecek.",
        },
        basarisizSonuc: {
          para: -20,
          otorite_iliski: -2,
          mutluluk: -2,
          mesaj: "Bağışın kabul edildi ama yapılandırma listesi başkasının lehine değişti; parayı geri alamadın.",
        },
      },
      {
        metin: "Bağışı belediye meclisi üyesiyle pazarlıkla küçült.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: -10,
          vergi_degisim: { carpan: 0.75, sureYil: 4 },
          mesaj: "Meclis üyesiyle anlaştınız: yarı bedelle tam indirim aldın.",
        },
        basarisizSonuc: {
          otorite_iliski: -4,
          un: -2,
          mutluluk: -1,
          mesaj: "Pazarlık yüzsüzlük sayıldı; hem indirimi kaçırdın hem 'cimri' diye anıldın.",
        },
      },
      {
        metin: "Davete katılma, vergini olduğu gibi öde.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Geceyi evinde geçirdin. Kimse bir şey demedi, ama bu işin seni hatırlayacağını biliyorsun.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "vergi_sd_tahsil_komisyonu",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar", "Zanaatkâr"],
    minYas: 24,
    agirlik: 1,
    gorsel: "🗂️",
    baslik: "Tahsil Komisyonu Üyeliği",
    metin:
      "Belediye, mahalledeki işletmelerden vergi tahsilatını yürütecek bir komisyon kurdu. Üyelik bir ayrıcalık ama aynı zamanda komşularına karşı sorumluluk demek. Sana üye olma teklifi geldi: tahsilattan komisyon payın olacak.",
    secenekler: [
      {
        metin: "Komisyona katıl ve mahalleyi sıkı denetle.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 22,
          ahlak: -4,
          un: -3,
          otorite_iliski: 5,
          vergi_degisim: { carpan: 0.8, sureYil: 3 },
          mesaj: "Tahsilat hedefini aştın. Belediye seni takdir etti, payına indirim yazdı — ama mahalle seni 'memurun adamı' olarak anmaya başladı.",
        },
        basarisizSonuc: {
          para: -10,
          un: -6,
          mutluluk: -3,
          mesaj: "Tahsilat bir isyanın eşiğine geldi; esnaf seni suçladı, belediye de açığı senden istedi.",
        },
      },
      {
        metin: "Katıl ama komşularına süre tanı, esneklik göster.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 12,
          un: 3,
          otorite_iliski: 3,
          vergi_degisim: { carpan: 0.9, sureYil: 3 },
          mesaj: "Hem belediyeyi hem esnafı idare ettin. Tahsilat az ama saygıyla kapandı.",
        },
        basarisizSonuc: {
          para: -6,
          otorite_iliski: -4,
          mutluluk: -2,
          mesaj: "Esnekliğin belediyeyi kızdırdı; eksik tahsilatı kendi cebinden kapattın.",
        },
      },
      {
        metin: "Teklifi reddet, böyle bir işe bulaşma.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: 2,
          otorite_iliski: -5,
          mesaj: "Reddettin. Belediye bunu iyi karşılamadı, ama vicdanın rahat.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
];
