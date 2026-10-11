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
      "{bolge} sokaklarında ölüm arabaları geziyor. Salgın hızla yayılıyor, kimseyi ayırmıyor. Nasıl korunacaksın?",
    secenekler: [
      {
        metin: "Kırsala çekil, kendini izole et.",
        baseBasariSansi: 80,
        maliyet: 15,
        kilitAciklamasi: "Kırsalda geçinecek paran yok.",
        basariliSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 2,
          para: -15,
          mutluluk: -10,
          un: -4,
          mesaj:
            "Şehri bıraktın; temiz havada kurtulma şansın yüksek.",
        },
        basarisizSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 1,
          para: -15,
          mutluluk: -12,
          saglik: -6,
          mesaj:
            "Yolda hasta kervanlara denk geldin. Yine de kısmen korunuyorsun.",
        },
      },
      {
        metin: "Kapıyı ördür, karantinaya gir.",
        baseBasariSansi: 85,
        maliyet: 6,
        kilitAciklamasi: "Erzak stoklayacak paran yok.",
        basariliSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 1,
          para: -6,
          mutluluk: -6,
          mesaj:
            "Aylarca dört duvar arasında kaldın; işe yaradı.",
        },
        basarisizSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 0,
          para: -6,
          mutluluk: -8,
          saglik: -4,
          mesaj:
            "Karantina delindi; korunman neredeyse kalmadı.",
        },
      },
      {
        metin: "Normal devam et, kaderine boyun eğ.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 0,
          un: 2,
          mesaj:
            "Salgın {bolge}'yi sardı; herkesle aynı kaderi paylaşıyorsun.",
        },
        basarisizSonuc: {
          ulke_etkisi: { vebada: true },
          veba_koruma: 0,
          saglik: -10,
          mesaj:
            "Çarşıda bir gün yetti; ateşle uyandın ama atlattın.",
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
      "Gece yarısı kapında ateşler içinde bir akraban titriyor. Alırsan hastalık girebilir, almazsan ölür.",
    secenekler: [
      {
        metin: "İçeri al, elinden geleni yap",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: 8,
          mutluluk: 5,
          un: 3,
          mesaj: "Günlerce başında bekledin, iyileşti. Merhametin duyuldu.",
        },
        basarisizSonuc: {
          saglik: -18,
          ahlak: 5,
          etiket_ekle: ["veba_hastasi"],
          mesaj: "Onu kaybettin, hastalık sana da bulaştı. Artık vebalısın.",
        },
      },
      {
        metin: "Kapıyı açma, uzaklaştır.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: -6,
          mutluluk: -5,
          mesaj: "O ses aklından çıkmayacak ama hastalık girmedi.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -4,
          mesaj: "Fazla yaklaştın; birkaç gün tedirgin bekledin.",
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
      "Yakının vebadan öldü, cenaze bugün. Kalabalığa girmek tehlikeli, gitmemek vefasızlık.",
    secenekler: [
      {
        metin: "Cenazeye git, vefanı göster.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: 4,
          ahlak: 4,
          un: 2,
          mesaj: "Onu toprağa verdin; için rahatladı, insanlar seni gördü.",
        },
        basarisizSonuc: {
          saglik: -14,
          etiket_ekle: ["veba_hastasi"],
          mesaj: "Cenazede yanındakinden kaptın. Ateşin çıktı; vebalısın.",
        },
      },
      {
        metin: "Uzaktan dua et, kalabalığa girme.",
        baseBasariSansi: 92,
        basariliSonuc: {
          mutluluk: -3,
          mesaj: "Evden dua ettin. Gidememek yaktı ama sağlığını korudun.",
        },
        basarisizSonuc: {
          saglik: -3,
          mesaj: "Uzaktan bile fazla yaklaştın; günlerce kendini kolladın.",
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
      "Çarşıda öksüren, yüzü kızarmış biri sana çarpıp kalabalığa karıştı. Hasta olabilir. Ne yapacaksın?",
    secenekler: [
      {
        metin: "Sakin ol, eve git, yıkan ve bekle.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -3,
          mesaj: "Günlerce huzursuz bekledin, belirti çıkmadı. Şanslıydın.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Üçüncü gün ateşin çıktı; hafif atlattın ama yattın.",
        },
      },
      {
        metin: "Şifacıya koş, tütsü ve merhem yaptır.",
        baseBasariSansi: 66,
        maliyet: 3,
        kilitAciklamasi: "Şifacıya verecek paran yok.",
        basariliSonuc: {
          para: -3,
          saglik: 2,
          mutluluk: 2,
          mesaj: "Şifacı tıbben değil ama ruhen iyi geldi.",
        },
        basarisizSonuc: {
          para: -3,
          saglik: -8,
          mesaj: "Tütsü fayda etmedi; birkaç gün sonra hastalandın.",
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
      "Zengin bir hane vebalılara bakacak, ölüleri kaldıracak birini arıyor. Ücret yüksek ama bulaşma riski büyük.",
    secenekler: [
      {
        metin: "Kabul et, hastalara bak.",
        baseBasariSansi: 40,
        basariliSonuc: {
          mutluluk: -10,
          para: 25,
          ahlak: 3,
          un: 2,
          mesaj: "Aylarca ölümün içinde çalışıp sağ çıktın. Cebin doldu.",
        },
        basarisizSonuc: {
          saglik: -20,
          etiket_ekle: ["veba_hastasi"],
          mesaj: "Hastalardan biri sana bulaştırdı; vebalısın.",
        },
      },
      {
        metin: "Reddet, bu iş ölüm demek",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Parayı reddettin. Aç ama sağsın.",
        },
        basarisizSonuc: {
          para: -2,
          mesaj: "Teklifçiyle fazla yakın konuştun; birkaç gün tedirgin geçti.",
        },
      },
    ],
  },
];
