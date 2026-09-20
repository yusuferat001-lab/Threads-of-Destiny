import type { OlayTanimi } from "./types";

/**
 * Sanayi Devrimi Zanaatkâr'a özel, kariyer yolundan bağımsız standalone
 * havuz. NOT (iskelet, 2026-09): 6 olayla başlatıldı, mevcut mesleklerin
 * standalone havuzları (18-26 olay) seviyesine çıkarılması sonraki bir
 * turun işi.
 */
export const OLAY_SANAYI_ZANAATKAR: OlayTanimi[] = [
  {
    id: "sd_zanaatkar_fabrika_golgesi",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gorsel: "⚙️",
    baslik: "Fabrikanın Gölgesinde",
    metin: "Şehre kurulan dev fabrikalar, küçük atölyelerin işlerini bir bir yutuyor.",
    secenekler: [
      {
        metin: "Nişe bir ürüne, el işçiliğine odaklan.",
        baseBasariSansi: 62,
        basariliSonuc: {
          un: 8,
          para: 4,
          mesaj: "Kaliteli müşteriler seni tercih etmeye devam etti.",
          detay: "Herkese satmak zorunda değilsin.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -3,
          mesaj: "Müşteri sayın azaldı, geçim biraz zorlaştı.",
          detay: "Sanayinin gölgesi küçük atölyelere ağır düşüyor.",
        },
      },
      {
        metin: "Fabrikaya iş başvurusu yap, güvenceyi seç.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 8,
          mutluluk: -2,
          mesaj: "İşe alındın; para düzenli ama özgürlüğün azaldı.",
          detay: "Güvence bazen bağımsızlığın bedelidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Başvurun reddedildi; kendi işine devam etmek zorunda kaldın.",
          detay: "Her kapı açık değildir.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_patent_firsati",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gorsel: "⚙️",
    baslik: "Küçük Bir Buluş",
    metin: "İşini kolaylaştıran küçük ama akıllı bir düzenek geliştirdin; patentini almak masraflı olacak.",
    secenekler: [
      {
        metin: "Patent başvurusu yap.",
        baseBasariSansi: 50,
        maliyet: 16,
        basariliSonuc: {
          para: 24,
          un: 10,
          uretim_kapasitesi_artis: 8,
          mesaj: "Patentin onaylandı; buluşun birkaç atölyeye lisanslandı.",
          detay: "Küçük bir fikir bazen büyük kapılar açar.",
        },
        basarisizSonuc: {
          para: -16,
          mutluluk: -4,
          mesaj: "Başvuru reddedildi, masraf boşa gitti.",
          detay: "Bürokrasi bazen buluştan daha yavaş ilerler.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_isci_saglik",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gerekliEkip: true,
    gorsel: "⚙️",
    baslik: "Ağır Çalışma Koşulları",
    metin: "Çalışanların yorgunluktan şikâyet ediyor; koşulları iyileştirmek maliyetli olacak.",
    secenekler: [
      {
        metin: "Çalışma saatlerini kısalt, ücretlerini koru.",
        baseBasariSansi: 68,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          ahlak: 8,
          dost_puani: 6,
          mesaj: "Çalışanların moral buldu, verim arttı.",
          detay: "Yorgun eller az üretir.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -3,
          mesaj: "Değişiklik beklenen etkiyi yaratmadı, sadece maliyeti arttı.",
          detay: "Her iyileştirme hemen meyve vermez.",
        },
      },
      {
        metin: "Koşulları değiştirme, kârı önceliklendir.",
        baseBasariSansi: 75,
        basariliSonuc: {
          para: 10,
          ahlak: -6,
          mesaj: "Kârın arttı ama çalışanların arasında hoşnutsuzluk büyüdü.",
          detay: "Kısa vadeli kazanç, uzun vadeli güveni yer.",
        },
        basarisizSonuc: {
          ahlak: -8,
          dost_puani: -6,
          mesaj: "Çalışanların bir kısmı işi bıraktı.",
          detay: "Görmezden gelinen sorunlar büyür.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_makine_arizasi",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gorsel: "⚙️",
    baslik: "Beklenmedik Arıza",
    metin: "En değerli makinen aniden bozuldu; tamiri pahalı ve zaman alıcı.",
    secenekler: [
      {
        metin: "Ustaya pahalı ama hızlı tamir yaptır.",
        baseBasariSansi: 78,
        maliyet: 14,
        basariliSonuc: {
          para: -14,
          uretim_kapasitesi_artis: 4,
          mesaj: "Makine hızla onarıldı, üretim aksamadı.",
          detay: "Zamanında müdahale, kaybı azaltır.",
        },
        basarisizSonuc: {
          para: -14,
          mutluluk: -4,
          mesaj: "Tamir uzun sürdü, bu süre boyunca sipariş kaybettin.",
          detay: "Her arıza öngörülemez bir gecikme getirir.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_sergi_daveti",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    minUn: 35,
    gorsel: "⚙️",
    baslik: "Sanayi Sergisi",
    metin: "Şehirde düzenlenen büyük bir sanayi sergisine katılman için davet aldın.",
    secenekler: [
      {
        metin: "En iyi eserini sergile.",
        baseBasariSansi: 65,
        maliyet: 12,
        basariliSonuc: {
          para: 16,
          un: 14,
          mesaj: "Eserin ilgi gördü; birkaç önemli sipariş aldın.",
          detay: "Doğru sahne, doğru göz önüne çıkmaktır.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -3,
          mesaj: "Sergide beklediğin ilgiyi göremedin.",
          detay: "Her sergi büyük bir dönüş getirmez.",
        },
      },
    ],
  },
  {
    id: "sd_zanaatkar_cocuk_isci_ikilemi",
    kategori: "zanaat",
    cag: "Sanayi Devrimi",
    meslekler: ["Zanaatkâr"],
    gorsel: "⚙️",
    baslik: "Ucuz İş Gücü Teklifi",
    metin: "Bir aracı, çok düşük ücretle çocuk işçi çalıştırmanı öneriyor.",
    secenekler: [
      {
        metin: "Teklifi reddet.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Teklifi geri çevirdin; vicdanın rahat.",
          detay: "Bazı kazançlar, kaybetmeye değmez.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddetmen bazı maliyetleri artırdı ama pişman değilsin.",
          detay: "Doğru olanın bir bedeli olabilir.",
        },
      },
      {
        metin: "Teklifi kabul et, maliyetleri düşür.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: 18,
          ahlak: -18,
          mutluluk: -6,
          suc_artis: 6,
          mesaj: "Maliyetlerin düştü ama vicdanın seni rahat bırakmıyor.",
          detay: "Bazı kazançların ağır bir bedeli vardır.",
        },
        basarisizSonuc: {
          para: -8,
          un: -14,
          ahlak: -14,
          mesaj: "Durum ortaya çıktı; adın şehirde kötü anıldı.",
          detay: "Karanlık kısayollar er ya da geç açığa çıkar.",
        },
      },
    ],
  },
];
