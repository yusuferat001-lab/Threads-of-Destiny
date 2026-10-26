import type { OlayTanimi } from "./types";

/**
 * Karakter vebayı BİZZAT kaptığında (etiket "veba_hastasi", vebaYillikKontrol
 * ile) açılan özel olay havuzu. Hastayken normal olay havuzu tamamen kapanır
 * (hapisOlayi/yolculukOlayi ile aynı mantık, bkz. olaySecici.uygunMu).
 *
 * Hasta olunca bu havuzdan BİR olay çıkar (tek zar): seçimden sonra bir kez ölüm/yaralı/sağlıklı zarı atılır
 * (vebaHastaligiKontrol): taban ölüm %55 · yaralı %30 · sağlıklı %15. Buradaki seçimler zardan ÖNCE
 * `veba_olum_riski_artis` ile ölüm olasılığını (%5–90 arası) kaydırır — para harcayarak (hekim/ilaç/tedavi)
 * hayatta kalma şansını belirgin biçimde yükseltebilir; ihmal/şarlatan/çalışmaya devam riski artırır.
 * Negatif `veba_olum_riski_artis` = ölüm olasılığı DÜŞER (iyi). Zardan sonra hastalık biter.
 */
export const OLAY_VEBA_HASTALIGI: OlayTanimi[] = [
  {
    id: "veba_hasta_hekim",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 1.4,
    gorsel: "🩺",
    baslik: "Bir Hekim Getirt",
    metin:
      "Ateşin düşmüyor, lekeler koltuk altına vurdu. Kalan birkaç hekimden biri, ağır ücretle bakmayı kabul ediyor.",
    secenekler: [
      {
        metin: "Ne isterse öde, hekim kalsın.",
        baseBasariSansi: 75,
        maliyet: 18,
        kilitAciklamasi: "Hekim ücretine paran yetmiyor.",
        basariliSonuc: {
          para: -18,
          saglik: 4,
          veba_olum_riski_artis: -30,
          mesaj: "Hekim günlerce yanında kaldı; kriz yavaşça geriledi.",
          detay: "Doğru bakım her şeyi değiştirir.",
        },
        basarisizSonuc: {
          para: -18,
          veba_olum_riski_artis: -10,
          mesaj: "Hekim elinden geleni yaptı; vaka ağırdı ama yalnız değildin.",
          detay: "Bazen para bile yetmez.",
        },
      },
      {
        metin: "Veremem; kendi başıma atlatırım.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Hekimi gönderdin; ter içinde kendi başına savaştın.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Geceler kötüleşti; parayı verseydim, diye düşündün.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_sifaci_otu",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 1.2,
    gorsel: "🌿",
    baslik: "Şifacının Otları",
    metin:
      "Mahallede bir şifacı, vebalılara acı bir ot karışımı satıyor. Kimi işe yaradığına yemin ediyor, kimi 'zehir' diyor.",
    secenekler: [
      {
        metin: "Karışımı al, tarifine göre iç.",
        baseBasariSansi: 62,
        maliyet: 12,
        kilitAciklamasi: "Şifacıya verecek paran yok.",
        basariliSonuc: {
          para: -12,
          veba_olum_riski_artis: -22,
          mesaj: "Gece kan ter içinde kaldın; sabaha ateşin düştü.",
        },
        basarisizSonuc: {
          para: -12,
          saglik: -6,
          veba_olum_riski_artis: 10,
          mesaj: "Karışım dokundu; günlerce kustun, hâlin ağırlaştı.",
        },
      },
      {
        metin: "Güvenmiyorum, almıyorum.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Şifacıyı çevirdin. Belki doğru karardı, belki fırsat kaçtı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "'Ya işe yarayacaktıysa?' diye kara kara düşündün.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_kadim_ilac",
    kategori: "din",
    vebaHastasiOlayi: true,
    cag: "Orta Çağ",
    ton: "agir",
    agirlik: 1.1,
    gorsel: "⛪",
    baslik: "Manastırın Merhemi",
    metin:
      "Şehir dışındaki manastırın keşişleri eski bir merhem ve dua kürü uyguluyor. Birkaç gün orada kalmalısın.",
    secenekler: [
      {
        metin: "Manastıra git, kürü tamamla.",
        baseBasariSansi: 68,
        maliyet: 16,
        kilitAciklamasi: "Bağış ve konaklama paran yok.",
        basariliSonuc: {
          para: -16,
          mutluluk: 4,
          veba_olum_riski_artis: -28,
          mesaj: "Taş odalarda ot kokusu ve ilahiler içinde toparlandın.",
        },
        basarisizSonuc: {
          para: -16,
          veba_olum_riski_artis: -8,
          mesaj: "Merhem mucize yapmadı ama temiz yatakta bakıldın.",
        },
      },
      {
        metin: "Yola çıkamam, evde kalırım.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mesaj: "Yolu göze alamadın; evde kendi imkânınla direndin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Evde yalnızlık ağır geldi; keşişleri unutamadın.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_deneysel_tedavi",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    cag: "Sanayi Devrimi",
    ton: "agir",
    agirlik: 1.1,
    gorsel: "💉",
    baslik: "Genç Doktorun Yöntemi",
    metin:
      "Yeni hastanede genç bir doktor deneysel tedavi uyguluyor: temiz oda, sıkı takip. Ücreti yüksek, sonucu belirsiz.",
    secenekler: [
      {
        metin: "Hastaneye yat, tedaviyi dene.",
        baseBasariSansi: 60,
        maliyet: 24,
        kilitAciklamasi: "Hastane ücretine paran yetmiyor.",
        basariliSonuc: {
          para: -24,
          saglik: 5,
          veba_olum_riski_artis: -34,
          mesaj: "Beyaz odada saat başı kontrolle krizi atlattın.",
        },
        basarisizSonuc: {
          para: -24,
          saglik: -8,
          veba_olum_riski_artis: 16,
          mesaj: "Tedavi oturmadı; müdahaleler seni daha çok yıprattı.",
        },
      },
      {
        metin: "Deney faresi olmam, evde kalırım.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mesaj: "Hastaneyi reddedip kendi yatağında direndin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Evde beklerken o temiz odayı düşündün durdun.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_hacamat",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 1.0,
    gorsel: "🩸",
    baslik: "Kan Alma",
    metin:
      "İnanışa göre hastalık 'kirli kandan'. Berber-cerrah 'zehri boşaltmayı' öneriyor; bazen işe yarar, bazen yıkar.",
    secenekler: [
      {
        metin: "Bırak kanını alsın.",
        baseBasariSansi: 50,
        maliyet: 6,
        basariliSonuc: {
          para: -6,
          veba_olum_riski_artis: -24,
          mesaj: "İşlemden sonra hafifledin; ateşin birkaç günde kırıldı.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: -10,
          veba_olum_riski_artis: 22,
          mesaj: "Kan kaybıyla sarsıldın; bayıldın, günlerce kalkamadın.",
        },
      },
      {
        metin: "Hayır, o kadar kanım yok.",
        baseBasariSansi: 92,
        basariliSonuc: {
          mesaj: "Berber-cerrahı gönderdin; en azından kötüleşmedi.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Reddettin; komşular 'inatçılığı yüzünden' diye fısıldadı.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_dinlen",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    agirlik: 1.2,
    gorsel: "🛏️",
    baslik: "Her Şeyi Bırak",
    metin:
      "İş, borç, sorumluluk... hepsi bekleyebilir. Bedenin kesintisiz dinlenme, sıcak çorba, sessizlik istiyor.",
    secenekler: [
      {
        metin: "İşi bırak, sadece dinlen.",
        baseBasariSansi: 82,
        basariliSonuc: {
          para: -8,
          mutluluk: -2,
          veba_olum_riski_artis: -14,
          mesaj: "Günlerce yattın; kazancından oldun ama toparlandın.",
        },
        basarisizSonuc: {
          para: -8,
          veba_olum_riski_artis: -6,
          mesaj: "Endişeden uyuyamadın; yine de işten uzak kalmak iyi geldi.",
        },
      },
      {
        metin: "Lüksüm yok, çalışmaya devam.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 4,
          veba_olum_riski_artis: 2,
          mesaj: "Dişini sıkıp çalıştın; kazandın ama akşamları yığıldın.",
        },
        basarisizSonuc: {
          saglik: -10,
          veba_olum_riski_artis: 16,
          mesaj: "Zorlamak pahalıya patladı; çarşıda yığıldın, hastalık azdı.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_sarlatan_iksiri",
    kategori: "ticaret",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 0.9,
    gorsel: "🧪",
    baslik: "Mucize İksir Satıcısı",
    metin:
      "Kapına bir seyyar satıcı geldi: parlak şişeler, 'vebayı bir gecede keser' vaadi. Fiyat fahiş, içindekiler meçhul.",
    secenekler: [
      {
        metin: "Umutsuzsun; şişeyi al, iç.",
        baseBasariSansi: 32,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          veba_olum_riski_artis: -26,
          mesaj: "O gece rahat uyudun, ateşin kırıldı. Şans mı, mucize mi?",
        },
        basarisizSonuc: {
          para: -10,
          saglik: -8,
          veba_olum_riski_artis: 20,
          mesaj: "İksir mideni yaktı; satıcı kaçtı, hâlin ağırlaştı.",
        },
      },
      {
        metin: "Dolandırıcıyı kov.",
        baseBasariSansi: 93,
        basariliSonuc: {
          mesaj: "Kapıyı kapattın; paran cebinde kaldı, sahte umut eşikte.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kovdun ama 'ya işe yarasaydı?' geceleri seni kemirdi.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_aile_bakimi",
    kategori: "sosyal",
    vebaHastasiOlayi: true,
    agirlik: 1.1,
    gorsel: "🕯️",
    baslik: "Başında Bekleyen",
    metin:
      "Bir yakının bulaşmayı göze alıp başında beklemeye razı. Bakımı seni kurtarabilir; ama onu da tehlikeye atarsın.",
    secenekler: [
      {
        metin: "Kabul et, başında beklesin.",
        baseBasariSansi: 78,
        basariliSonuc: {
          mutluluk: 4,
          veba_olum_riski_artis: -18,
          mesaj: "Elini bırakmadı; o ilgi ilaç gibiydi, kendine geldin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          veba_olum_riski_artis: -8,
          mesaj: "Elinden geleni yaptı, vaka ağırdı; yalnız olmamak güç verdi.",
        },
      },
      {
        metin: "Reddet, kimse yaklaşmasın.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 4,
          veba_olum_riski_artis: 4,
          mesaj: "Kapını kilitledin; onları korudun ama savaşı yalnız verdin.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          veba_olum_riski_artis: 8,
          mesaj: "Yalnızlık ve hastalık seni ağırlaştırdı; kimse duymadı.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_atesli_sayikla",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 1.0,
    gorsel: "🥵",
    baslik: "Ateş Zirvede",
    metin:
      "Ateşin zirve yaptı; tavan üstüne geliyor, olmayan sesler duyuyorsun. Beden bu geceyi ya döner ya dönemez.",
    secenekler: [
      {
        metin: "Son gücünle diren, su iç.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: -4,
          veba_olum_riski_artis: -18,
          mesaj: "Sabaha kadar direndin; şafakla ateş kırıldı.",
        },
        basarisizSonuc: {
          saglik: -8,
          veba_olum_riski_artis: 14,
          mesaj: "Beden pes etti; sayıklayarak bir gece daha kaybettin.",
        },
      },
      {
        metin: "Bırak kendini; ne olacaksa olsun.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 3,
          veba_olum_riski_artis: 6,
          mesaj: "Direnmeyi bıraktın, sükûn çöktü; sabah hâlâ oradaydın.",
        },
        basarisizSonuc: {
          veba_olum_riski_artis: 18,
          mesaj: "Teslimiyet ağır bastı; ateşin çukuruna kayıp zor döndün.",
        },
      },
    ],
  },
];
