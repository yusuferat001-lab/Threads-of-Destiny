import { OlayTanimi } from "./types";

/**
 * "Dünya olayları". Savaş / zorunlu bağış / küçük kriz tamamen arka planda
 * (gameEngine.ts'teki periyodik kontrol fonksiyonlarıyla) tetiklenir, hiç olay
 * ekranı gerektirmez.
 *
 * Veba İSTİSNA: hem başlangıcı ("ne kadar korunacaksın?") hem de aktif dönemi
 * ("kapını biri çaldı — bulaşma riski") gerçek oyuncu kararı gerektirir.
 *  - `kuresel_veba_baslangici`: `vebada:false` iken zorlanır (vebaBaslamaliMi).
 *    3 seçenek = 3 korunma kademesi (`veba_koruma` 0/1/2). Korunma para + mutluluk
 *    maliyetli ve garantili değil: başarısız seçim korunmayı bir kademe düşürür.
 *  - "veba dönemi" olayları: `gerekliUlke:{vebada:true}` — sadece aktif salgın
 *    sürerken normal havuza girer; her biri yardım/temas (ahlak+, büyük bulaşma
 *    riski) ile kaçınma (ahlak−/mutluluk−, güvenli) arasında seçim sunar.
 *    Bu riskler vebaYillikKontrol'ün yıllık ölüm zarının ÜSTÜNE biner.
 */
export const OLAY_KURESEL: OlayTanimi[] = [
  {
    id: "kuresel_veba_baslangici",
    kategori: "saglik",
    minYas: 18,
    gerekliUlke: { vebada: false },
    ton: "agir",
    gorsel: "☠️",
    baslik: "Salgın Kapıda",
    metin:
      "{bolge} sokaklarında ölüm arabaları dolaşmaya başladı. Uzak kasabalardan gelen haberler tek şeyi söylüyor: hastalık hızla yayılıyor ve kimseyi ayırt etmiyor. Önümüzdeki yıllar boyunca bu salgının gölgesinde yaşayacaksın. Kendini nasıl koruyacaksın?",
    secenekler: [
      {
        metin: "Servetini kullan: şehri terk et, kırsalda bir yer kirala, çevreni tamamen izole et",
        baseBasariSansi: 80,
        maliyet: 15,
        kilitAciklamasi: "Kırsala çekilip aylarca geçinecek paran yok.",
        basariliSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 2,
          para: -15,
          mutluluk: -10,
          un: -4,
          mesaj:
            "Şehrin kapılarından çıkarken arkanda bıraktığın yüzleri unutamayacaksın. Ama uzakta, temiz havada, salgının en ağır yıllarını atlatma şansın çok daha yüksek.",
        },
        basarisizSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 1,
          para: -15,
          mutluluk: -12,
          saglik: -6,
          mesaj:
            "Yola çıktın ama hastalık senden hızlıydı; yol boyunca hasta kervanlarına denk geldin. Yine de şehirde kalmaktan iyidir — kısmen korunuyorsun.",
        },
      },
      {
        metin: "Evde sıkı karantina: kapını ördür, erzak stokla, kimseyi içeri alma",
        baseBasariSansi: 85,
        maliyet: 6,
        kilitAciklamasi: "Aylarca yetecek erzağı stoklayacak paran yok.",
        basariliSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 1,
          para: -6,
          mutluluk: -6,
          mesaj:
            "Aylarca dört duvar arasında, dışarıdaki çığlıkları dinleyerek yaşadın. Sıkıcı ve boğucuydu ama işe yaradı.",
        },
        basarisizSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 0,
          para: -6,
          mutluluk: -8,
          saglik: -4,
          mesaj:
            "Bir noktada karantinan delindi — teslimat, komşu, bir akraba... Fark etmeden içeri girdi. Artık pek bir korunman kalmadı.",
        },
      },
      {
        metin: "Hayatına normal devam et: kaçacak yer yok, kader ne yazdıysa",
        baseBasariSansi: 60,
        basariliSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 0,
          un: 2,
          mesaj:
            "Kimse seni saklandığın için ayıplayamaz. Salgın {bolge}'yi sardı; sen de herkesle aynı kaderi paylaşıyorsun.",
        },
        basarisizSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 0,
          saglik: -10,
          mesaj:
            "İlk haftalarda çarşıda geçirdiğin bir gün yetti. Hafif bir ateşle uyandın — bu sefer atlattın, ama salgın daha yeni başlıyor.",
        },
      },
    ],
  },

  {
    id: "veba_kapiyi_calan",
    kategori: "sosyal",
    minYas: 18,
    gerekliUlke: { vebada: true },
    ton: "agir",
    agirlik: 1.4,
    gorsel: "🚪",
    baslik: "Kapını Çalan",
    metin:
      "Gece yarısı kapın çalınıyor. Uzaktan bir akraban, titreyerek, ateşler içinde eşikte duruyor. Şehirde gidecek yeri kalmamış. İçeri alırsan hastalığı eve sokabilirsin; almazsan onu ölüme terk edersin.",
    secenekler: [
      {
        metin: "İçeri al, elinden geleni yap",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: 8,
          mutluluk: 5,
          un: 3,
          mesaj: "Günlerce başında bekledin. İyileşti. Komşular bunu konuştu — merhametli biri olduğun bilindi.",
        },
        basarisizSonuc: {
          saglik: -18,
          ahlak: 5,
          etiket_ekle: ["veba_hastasi"],
          mesaj: "Onu kaybettin, üstüne hastalık sana da bulaştı. Ateşin çıktı — artık sen de vebalısın.",
        },
      },
      {
        metin: "Kapıyı açma, uzaklaşmasını söyle",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -6,
          mutluluk: -5,
          mesaj: "Kapının ardında kesilen o ses yıllarca aklından çıkmayacak. Ama eve hastalık girmedi.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -4,
          mesaj: "Kapı aralığından konuşurken bile fazla yaklaştın; birkaç gün tedirgin bekledin.",
        },
      },
    ],
  },

  {
    id: "veba_cenaze",
    kategori: "din",
    minYas: 18,
    gerekliUlke: { vebada: true },
    ton: "agir",
    agirlik: 1.3,
    gorsel: "⚰️",
    baslik: "Salgında Bir Cenaze",
    metin:
      "Yakın tanıdığın biri vebadan öldü. Cenazesi bugün. Salgın günlerinde kalabalık bir cenazeye gitmek tehlikeli, ama gitmemek de vefasızlık sayılır.",
    secenekler: [
      {
        metin: "Cenazeye git, son görevini yap",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: 4,
          ahlak: 4,
          un: 2,
          mesaj: "Toprağa verilişine tanık oldun. İçin biraz olsun rahatladı; insanlar orada olduğunu gördü.",
        },
        basarisizSonuc: {
          saglik: -14,
          etiket_ekle: ["veba_hastasi"],
          mesaj: "Cenazede omuz omuza durduğun birinden kaptın. Birkaç gün sonra ateşin çıktı — vebayı kaptın.",
        },
      },
      {
        metin: "Uzaktan dua et, kalabalığa karışma",
        baseBasariSansi: 92,
        basariliSonuc: {
          mutluluk: -3,
          mesaj: "Evinden, alçak sesle dua ettin. Gidememek içini burktu ama sağlığını korudun.",
        },
        basarisizSonuc: {
          saglik: -3,
          mesaj: "Mezarlığın kenarından izlerken bile fazla yaklaştın sayıldı; günlerce kendini kolladın.",
        },
      },
    ],
  },

  {
    id: "veba_pazarda_temas",
    kategori: "saglik",
    minYas: 18,
    gerekliUlke: { vebada: true },
    agirlik: 1.3,
    gorsel: "😷",
    baslik: "Çarşıda Bir Temas",
    metin:
      "Erzak alırken öksüren, yüzü kızarmış biri sana çarptı ve kalabalığa karıştı. Belki bir şeyi yoktu. Belki de hastalığı taşıyordu. Ne yapacaksın?",
    secenekler: [
      {
        metin: "Sakin ol, doğruca eve git, iyice yıkan ve bekle",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -3,
          mesaj: "Birkaç gün huzursuz bekledin ama bir belirti çıkmadı. Şanslıydın.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Üçüncü gün ateşin çıktı. Hafif atlattın ama bir süre yatakta kaldın.",
        },
      },
      {
        metin: "Hemen bir şifacıya koş, tütsü ve merhem yaptır",
        baseBasariSansi: 66,
        maliyet: 3,
        kilitAciklamasi: "Şifacıya verecek paran yok.",
        basariliSonuc: {
          para: -3,
          saglik: 2,
          mutluluk: 2,
          mesaj: "Şifacının işlemleri belki tıbben değil ama ruhen iyi geldi; rahat bir nefes aldın.",
        },
        basarisizSonuc: {
          para: -3,
          saglik: -8,
          mesaj: "Şifacının tütsüsü fayda etmedi; birkaç gün sonra yine de hastalandın.",
        },
      },
    ],
  },

  {
    id: "veba_hasta_bakiciligi",
    kategori: "sosyal",
    minYas: 18,
    gerekliUlke: { vebada: true },
    ton: "agir",
    agirlik: 1.1,
    gorsel: "🕯️",
    baslik: "Hasta Bakıcılığı Teklifi",
    metin:
      "Zengin bir hane, vebalı yakınlarına bakacak, ölülerini kaldıracak birini arıyor. Ücret yüksek — çünkü bu işe kimse yanaşmıyor. Kabul edersen hem para hem de büyük bir bulaşma riski.",
    secenekler: [
      {
        metin: "İşi kabul et, hastalara bak",
        baseBasariSansi: 40,
        basariliSonuc: {
          mutluluk: -10,
          para: 25,
          ahlak: 3,
          un: 2,
          mesaj: "Aylarca ölümün içinde çalıştın ve sağ çıktın. Cebin doldu, adın 'cesur' diye anıldı.",
        },
        basarisizSonuc: {
          saglik: -20,
          etiket_ekle: ["veba_hastasi"],
          mesaj: "Baktığın hastalardan biri sana da bulaştırdı. Bu kez hastalık seni de yatağa düşürdü — vebalısın.",
        },
      },
      {
        metin: "Reddet, bu iş ölüm demek",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Parayı geri çevirdin. Aç ama sağ kaldın.",
        },
        basarisizSonuc: {
          para: -2,
          mesaj: "Reddettin ama teklifi getiren adamla fazla yakın konuştun; birkaç gün tedirgin geçti.",
        },
      },
    ],
  },
];
