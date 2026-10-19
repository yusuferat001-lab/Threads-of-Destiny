import type { OlayTanimi } from "./types";

/**
 * MESLEĞE YATKINLIK KADEMESİ olayları (2026-09 sonu, kullanıcı isteği:
 * "mesleklere yatkınlık daha çok şeyi etkilesin ... olaylar çıksın bazı
 * olaylarda şıklar kapansın"). `state.meslek_yatkinlik_seviyesi` (1=kötü,
 * 2=nötr, 3=iyi, 4=çok iyi, 5=mükemmel — bkz. data/meslekYatkinlik.ts) meslek seçilirken
 * bir kez sabitlenir; bu dosyadaki olaylar bu kademeyi hem OLAY seviyesinde
 * (`minMeslekYatkinlikSeviye`/`maxMeslekYatkinlikSeviye` — bazı olaylar
 * yalnız belirli kademede hiç çıkmaz) hem SEÇENEK seviyesinde (aynı alanlar
 * bir seçeneğe konursa yalnız o şık kilitlenir/açılır, olay yine herkese
 * çıkar) kullanır. Bu, sistemin altyapısını kanıtlayan küçük, temsili bir
 * havuzdur — normal havuzdan dışlanmaz, standart ağırlıklı seçime dahildir.
 */
export const OLAY_MESLEK_YATKINLIK: OlayTanimi[] = [
  {
    id: "myk_asker_ordugah_meydan_okumasi",
    kategori: "savas",
    meslekler: ["Asker"],
    minYas: 18,
    agirlik: 0.8,
    gorsel: "⚔️",
    baslik: "Meydan Okuma",
    metin:
      "Ordugâhta sıkıntıdan bir meydan okuma başladı: silah ustalığını herkesin önünde kanıtla. Kalabalık seni izliyor.",
    secenekler: [
      {
        metin: "Ustaca bir hamleyle rakibi ser.",
        baseBasariSansi: 55,
        minMeslekYatkinlikSeviye: 3,
        kilitAciklamasi: "Yeterince yetenekli değilsin; temkinli ol.",
        basariliSonuc: {
          un: 6,
          mutluluk: 3,
          para: 4,
          mesaj: "Kalabalığın önünde rakibi alt ettin; adın bir süre konuşuldu.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -3,
          mesaj: "Hamle tuttu ama zamanlaman kötüydü; sertçe yere çakıldın.",
        },
      },
      {
        metin: "Temkinli ol, savunmada kal.",
        baseBasariSansi: 78,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Kimseyi etkilemedin ama malzeme de olmadın.",
        },
        basarisizSonuc: {
          saglik: -3,
          mutluluk: -2,
          mesaj: "Savunmada bile zorlandın; birkaç sert darbe yedin.",
        },
      },
      {
        metin: "Hiç girme.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Kenara çekildin. Kimse bir şey demedi ama sen bildin.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_tuccar_ozel_teklif",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    minYas: 20,
    minMeslekYatkinlikSeviye: 3,
    agirlik: 0.9,
    gorsel: "🤝",
    baslik: "Sadece Sana Özel",
    metin:
      "Keskin gözün fark edildi. Tanımadığın bir tüccar, düşük riskli ama kazançlı bir ortaklık öneriyor; herkese açılmayan bir fırsat.",
    secenekler: [
      {
        metin: "Kabul et, sermayeni koy.",
        baseBasariSansi: 68,
        maliyet: 10,
        basariliSonuc: {
          para: 22,
          un: 2,
          ticaret_sermaye_artis: 6,
          mesaj: "Sezgin haklı çıktı; ortaklık beklediğinden kazançlı oldu.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -3,
          mesaj: "Ortaklık parlak çıkmadı; sermayenin bir kısmı gitti.",
        },
      },
      {
        metin: "Kibarca reddet.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mesaj: "Fırsatı geri çevirdin; \"ya tutsaydı\" dedin ama para cebinde kaldı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_din_gunahkarin_yuku",
    kategori: "din",
    meslekler: ["Din Adamı"],
    minYas: 18,
    maxMeslekYatkinlikSeviye: 1,
    agirlik: 1,
    ton: "agir",
    gorsel: "😔",
    baslik: "Cemaatin Şüphesi",
    metin:
      "Vaazların sana yakışmıyor; içindeki çelişkiler kürsüden dökülüyor. Yaşlı bir cemaat üyesi soruyor: 'Buna gerçekten inanıyor musun evlat?'",
    secenekler: [
      {
        metin: "Dürüst ol, şüphelerini söyle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 5,
          un: -3,
          mutluluk: 2,
          mesaj: "Dürüstlüğün onu şaşırttı ama saygısını kazandın.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -3,
          mesaj: "Sözlerin cemaatte yayıldı; bakışlar değişti.",
        },
      },
      {
        metin: "Rolüne sarıl, inançlı görün.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 3,
          ahlak: -3,
          mesaj: "İnandırıcıydın, adam ikna oldu. İçin biraz daha boşaldı.",
        },
        basarisizSonuc: {
          ahlak: -4,
          mutluluk: -4,
          mesaj: "Sahteliğin okundu; adam başını sallayıp gitti.",
        },
      },
    ],
  },
  {
    id: "myk_zanaatkar_ustalik_sinavi",
    kategori: "zanaat",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    agirlik: 0.8,
    gorsel: "🔨",
    baslik: "Ustalık Sınavı",
    metin:
      "Lonca atölyene sıra dışı bir sipariş bıraktı: sıradan onarım ya da tamamen yeni bir teknik deneme şansı. Başarırsan adın yıllarca anılır.",
    secenekler: [
      {
        metin: "Yepyeni bir teknik icat etmeyi dene.",
        baseBasariSansi: 45,
        minMeslekYatkinlikSeviye: 5,
        kilitAciklamasi: "Elin henüz yeterince usta değil.",
        basariliSonuc: {
          un: 8,
          para: 6,
          unvan_kazan: "Yenilikçi Usta",
          mesaj: "Denemen tuttu! Loncanın ustaları buluşunu konuşuyor.",
        },
        basarisizSonuc: {
          para: -8,
          mutluluk: -3,
          mesaj: "Malzemeyi ziyan ettin; teknik olgunlaşmamış. Kimse kızmadı.",
        },
      },
      {
        metin: "Güvenli git, sıradan onarımı yap.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 5,
          mesaj: "İş sorunsuz bitti; kimse hayal kırıklığına uğramadı, kimse şaşırmadı.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Basit işte bile aksilik çıktı; loncaya küçük tazminat ödedin.",
        },
      },
    ],
  },

  // --- Mükemmel kademe (20+) içeriği: yalnız state.meslek_yatkinlik_seviyesi===5
  // olan karakterlere çıkan, olay-seviyesinde kilitli 8 olay (meslek başına 2).
  // Çağdan bağımsız (mevcut 4 örnekle aynı desen); normal ağırlıklı havuzdan
  // dışlanmaz, yalnızca hafif yüksek `agirlik` ile nadir kademeye ulaşana
  // gerçekten görünür kılınır.
  {
    id: "myk_asker_muhafiz_teklifi",
    kategori: "savas",
    meslekler: ["Asker"],
    minYas: 22,
    minMeslekYatkinlikSeviye: 5,
    agirlik: 1.2,
    gorsel: "🛡️",
    baslik: "Kralın Şahsi Muhafızı Teklifi",
    metin:
      "Savaş meydanındaki ustalığın hükümdarın kulağına gitti. Saray, seni şahsi muhafız sınavına çağırıyor.",
    secenekler: [
      {
        metin: "Kabul et, sınava gir.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 10,
          para: 10,
          unvan_kazan: "Kraliyet Muhafızı",
          etiket_ekle: ["itibar:kraliyet_muhafizi"],
          mesaj: "Sınavı fazlasıyla geçtin; artık hükümdarın yanındasın.",
        },
        basarisizSonuc: {
          un: -3,
          mutluluk: -5,
          mesaj: "Sınavı geçemedin; saray nazikçe geri gönderdi, ordugâh dedikodu yaptı.",
        },
      },
      {
        metin: "Nazikçe reddet, ordunda kal.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 3,
          dost_puani: 3,
          mesaj: "Reddin seni ordu arkadaşlarının gözünde değerli kıldı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_asker_efsanevi_duello",
    kategori: "savas",
    meslekler: ["Asker"],
    minYas: 20,
    minMeslekYatkinlikSeviye: 5,
    agirlik: 1.2,
    gorsel: "⚔️",
    baslik: "Efsanevi Düello Daveti",
    metin:
      "Ününü duyan rakip bir şampiyon, herkesin önünde tek vuruşluk düelloya çağırıyor.",
    secenekler: [
      {
        metin: "Meydan okumayı kabul et.",
        baseBasariSansi: 58,
        basariliSonuc: {
          un: 12,
          para: 8,
          unvan_kazan: "Yenilmez Şampiyon",
          mesaj: "Kılıcın parladı, rakibin diz çöktü; adın efsane oldu.",
        },
        basarisizSonuc: {
          saglik: -14,
          un: -5,
          mutluluk: -6,
          mesaj: "Ağır yaralı ayrıldın; yenilgi ordugâhta hızla yayıldı.",
        },
      },
      {
        metin: "Onurla reddet.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -2,
          mesaj: "Reddettin; kimi korkak sanacak ama sağduyulu davrandığını biliyorsun.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_tuccar_bas_tedarikci",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    minYas: 22,
    minMeslekYatkinlikSeviye: 5,
    agirlik: 1.2,
    gorsel: "📜",
    baslik: "Krallığın Baş Tedarikçisi Teklifi",
    metin:
      "Saray kâhyası ticari zekânı duymuş. Seni krallığın baş tedarikçisi olmak için büyük bir görüşmeye çağırıyor.",
    secenekler: [
      {
        metin: "Büyük sözleşmeyi imzala.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 22,
          un: 6,
          maas_carpani: 1.06,
          unvan_kazan: "Kraliyet Tedarikçisi",
          mesaj: "Sözleşme imzalandı; kasan da adın da büyüdü.",
        },
        basarisizSonuc: {
          para: -14,
          mutluluk: -4,
          mesaj: "Şartlar göründüğünden ağırdı; anlaşma zarara soktu.",
        },
      },
      {
        metin: "Riske girme, küçük işine devam et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Küçük ama güvenli işlerinle yoluna devam ettin.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_tuccar_rakip_kiskancligi",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    minYas: 20,
    minMeslekYatkinlikSeviye: 5,
    agirlik: 1.2,
    gorsel: "🐍",
    baslik: "Rakiplerin Kıskançlığı",
    metin:
      "Başarın gözleri çekti. Rakip tüccarlar aleyhine karanlık söylentiler yayıyor, mallarını sabote etmeye çalışıyor.",
    secenekler: [
      {
        metin: "Kanıt topla, itibarını savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          rakip_puani: -10,
          mesaj: "Kaynağı buldun; gerçek çıkınca herkes senden yana döndü.",
        },
        basarisizSonuc: {
          un: -6,
          para: -10,
          mutluluk: -5,
          mesaj: "Kanıt bulamadın; söylentiler büyüyüp işini bir süre vurdu.",
        },
      },
      {
        metin: "Görmezden gel, işine bak.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -2,
          mesaj: "Söylentileri yok saydın; kimi inansa da zamanla söndü.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_din_kutsal_gorev",
    kategori: "din",
    meslekler: ["Din Adamı"],
    minYas: 22,
    minMeslekYatkinlikSeviye: 5,
    agirlik: 1.2,
    gorsel: "✨",
    baslik: "Kutsal Bir Görev İçin Seçilmek",
    metin:
      "Üstlerin, inancının derinliğini bilip seni kutsal bir emaneti korumak için seçti. Cemaatte nadir bir onur.",
    secenekler: [
      {
        metin: "Görevi kabul et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 8,
          un: 6,
          unvan_kazan: "Kutsal Emanetin Bekçisi",
          mesaj: "Görevi tamamladın; cemaat sana büyük saygıyla bakıyor.",
        },
        basarisizSonuc: {
          ahlak: -6,
          mutluluk: -5,
          mesaj: "Görevde ağır bir hataya düştün; derinden sarsıldın.",
        },
      },
      {
        metin: "Layık değilim diyerek reddet.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Alçakgönüllülüğün cemaatte sessiz takdir gördü.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_din_mucize_soylentisi",
    kategori: "din",
    meslekler: ["Din Adamı"],
    minYas: 20,
    minMeslekYatkinlikSeviye: 5,
    agirlik: 1.2,
    gorsel: "🕊️",
    baslik: "Mucize Söylentisi",
    metin:
      "Ellerinle iyileşen ya da huzur bulan biri hakkında mucize söylentisi yayılıyor. Kalabalıklar umutla kapına dayanıyor.",
    secenekler: [
      {
        metin: "Söylentiyi doğrula, insanları kabul et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 14,
          para: 8,
          mesaj: "Söylenti seni bölgenin en saygın ismi yaptı.",
        },
        basarisizSonuc: {
          un: -8,
          mutluluk: -6,
          ahlak: -3,
          mesaj: "Beklentileri karşılayamadın; hayal kırıklığı yayıldı.",
        },
      },
      {
        metin: "Reddet, mütevazı kal.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Mucizeyi reddettin; kimi inansa da huzurunu korudun.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_zanaatkar_saray_daveti",
    kategori: "zanaat",
    meslekler: ["Zanaatkâr"],
    minYas: 22,
    minMeslekYatkinlikSeviye: 5,
    agirlik: 1.2,
    gorsel: "👑",
    baslik: "Sarayın Baş Zanaatkârı Daveti",
    metin:
      "Ellerinin ustalığı saraya ulaştı. Saray için özel, görkemli bir eser sipariş ediliyor.",
    secenekler: [
      {
        metin: "Kabul et, en iyi işini çıkar.",
        baseBasariSansi: 58,
        basariliSonuc: {
          para: 20,
          un: 8,
          unvan_kazan: "Sarayın Baş Zanaatkârı",
          mesaj: "Eserin sarayda hayranlıkla karşılandı; adın soylular arasında da anılıyor.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -5,
          mesaj: "Eser beklentiyi karşılamadı; saray hayal kırıklığını gizlemedi.",
        },
      },
      {
        metin: "Riske girme, sıradan işe devam et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Küçük ama güvenli siparişlerinle devam ettin.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_zanaatkar_taklitciler",
    kategori: "zanaat",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    minMeslekYatkinlikSeviye: 5,
    agirlik: 1.2,
    gorsel: "🎭",
    baslik: "Taklitçiler ve Sahtekârlar",
    metin:
      "Adın değer kazandıkça işini taklit edip senin imzanla satan sahtekârlar türedi. Müşteriler şaşkın.",
    secenekler: [
      {
        metin: "Peşlerine düş, teşhir et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          rakip_puani: -6,
          mesaj: "Sahtekârları teşhir ettin; gerçek ustalık yeniden konuşuldu.",
        },
        basarisizSonuc: {
          un: -6,
          para: -8,
          mutluluk: -4,
          mesaj: "Sahtekârları bulamadın; itibarın bir süre zedelendi.",
        },
      },
      {
        metin: "İşine ayırt edici mühür ekle.",
        baseBasariSansi: 100,
        basariliSonuc: {
          un: 2,
          para: -3,
          mesaj: "Yeni mühür işlerini ayırdı; küçük masraf, işe yaradı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
];
