import type { OlayTanimi } from "./types";

/**
 * MESLEĞE YATKINLIK KADEMESİ olayları (2026-09 sonu, kullanıcı isteği:
 * "mesleklere yatkınlık daha çok şeyi etkilesin ... olaylar çıksın bazı
 * olaylarda şıklar kapansın"). `state.meslek_yatkinlik_seviyesi` (1=kötü,
 * 2=nötr, 3=iyi, 4=mükemmel — bkz. data/meslekYatkinlik.ts) meslek seçilirken
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
      "Ordugâhta can sıkıntısından bir meydan okuma başladı: silah ustalığını herkesin önünde kanıtlama şansı. Kalabalık seni izliyor.",
    secenekler: [
      {
        metin: "Ustaca bir hamleyle rakibini yere ser.",
        baseBasariSansi: 55,
        minMeslekYatkinlikSeviye: 3,
        kilitAciklamasi: "Bu hamle için yeterince yetenekli değilsin — daha temkinli bir şey dene.",
        basariliSonuc: {
          un: 6,
          mutluluk: 3,
          para: 4,
          mesaj: "Kalabalığın gözü önünde rakibini alt ettin; adın ordugâhta bir süre konuşuldu.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -3,
          mesaj: "Hamle tuttu ama zamanlaman kötüydü; sertçe yere çakıldın.",
        },
      },
      {
        metin: "Temkinli oyna, sadece savunmada kal.",
        baseBasariSansi: 78,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Kimseyi etkilemedin ama kimseye de malzeme olmadın; iş bitti.",
        },
        basarisizSonuc: {
          saglik: -3,
          mutluluk: -2,
          mesaj: "Savunmada bile zorlandın; birkaç sert darbe yedin.",
        },
      },
      {
        metin: "Meydan okumaya hiç girme.",
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
      "Piyasadaki keskin gözün fark edildi. Tanımadığın bir tüccar, düşük riskli ama kazançlı bir ortaklık teklifiyle geldi — herkese açılmayan, senin gibi keskin bir göz için ayrılmış bir fırsat bu.",
    secenekler: [
      {
        metin: "Teklifi kabul et, sermayeni ortaya koy.",
        baseBasariSansi: 68,
        maliyet: 10,
        basariliSonuc: {
          para: 22,
          un: 2,
          ticaret_sermaye_artis: 6,
          mesaj: "Sezgin haklı çıktı; ortaklık beklediğinden de kazançlı oldu.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -3,
          mesaj: "Ortaklık göründüğü kadar parlak değilmiş; sermayenin bir kısmını geri alamadın.",
        },
      },
      {
        metin: "Kibarca reddet, riske girme.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mesaj: "Fırsatı geri çevirdin. İçinden 'ya tutsaydı' diye geçirdin ama para cebinde kaldı.",
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
      "Vaazların sana hiç yakışmıyor; kendi içindeki çelişkiler kürsüden dökülüyor. Cemaatten yaşlı bir adam seni bir kenara çekip açıkça soruyor: 'Sen buna gerçekten inanıyor musun evlat?'",
    secenekler: [
      {
        metin: "Dürüst ol, şüphelerini paylaş.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 5,
          un: -3,
          mutluluk: 2,
          mesaj: "Dürüstlüğün onu şaşırttı ama saygısını kazandın; en azından yalan söylemiyorsun.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -3,
          mesaj: "Sözlerin cemaat arasında hızla yayıldı; sana bakışları değişti.",
        },
      },
      {
        metin: "Rolüne sarıl, inançlıymış gibi davran.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 3,
          ahlak: -3,
          mesaj: "İnandırıcı davrandın; adam ikna oldu ve gitti. İçin biraz daha boşaldı.",
        },
        basarisizSonuc: {
          ahlak: -4,
          mutluluk: -4,
          mesaj: "Sahteliğin gözünden okundu; adam başını sallayıp uzaklaştı.",
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
      "Lonca, atölyene alışılmadık bir sipariş bıraktı: sıradan bir onarımın yanı sıra, isteyen ustalar için tamamen yeni bir teknik deneme şansı da tanınıyor. Risk büyük, ama başarırsan adın yıllarca anılır.",
    secenekler: [
      {
        metin: "Tamamen yeni bir teknik icat etmeyi dene.",
        baseBasariSansi: 45,
        minMeslekYatkinlikSeviye: 4,
        kilitAciklamasi: "Bunu denemek için elin henüz yeterince usta değil.",
        basariliSonuc: {
          un: 8,
          para: 6,
          unvan_kazan: "Yenilikçi Usta",
          mesaj: "Denemen tuttu! Loncanın en usta elleri bile senin buluşunu konuşuyor.",
        },
        basarisizSonuc: {
          para: -8,
          mutluluk: -3,
          mesaj: "Malzemeyi ziyan ettin; teknik daha olgunlaşmamış. Yine de kimse çabana kızmadı.",
        },
      },
      {
        metin: "Güvenli yoldan git, sıradan onarımı yap.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 5,
          mesaj: "İş sorunsuz bitti; kimse hayal kırıklığına uğramadı, kimse de hayrete düşmedi.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Basit işte bile ufak bir aksilik çıktı; loncaya küçük bir tazminat ödedin.",
        },
      },
    ],
  },

  // --- Mükemmel kademe (20+) içeriği: yalnız state.meslek_yatkinlik_seviyesi===4
  // olan karakterlere çıkan, olay-seviyesinde kilitli 8 olay (meslek başına 2).
  // Çağdan bağımsız (mevcut 4 örnekle aynı desen); normal ağırlıklı havuzdan
  // dışlanmaz, yalnızca hafif yüksek `agirlik` ile nadir kademeye ulaşana
  // gerçekten görünür kılınır.
  {
    id: "myk_asker_muhafiz_teklifi",
    kategori: "savas",
    meslekler: ["Asker"],
    minYas: 22,
    minMeslekYatkinlikSeviye: 4,
    agirlik: 1.2,
    gorsel: "🛡️",
    baslik: "Kralın Şahsi Muhafızı Teklifi",
    metin:
      "Savaş meydanındaki ustalığının haberi hükümdarın kulağına kadar gitti. Saraydan bir haberci, seni şahsi muhafız birliğine katılman için sınava davet ediyor.",
    secenekler: [
      {
        metin: "Teklifi kabul et, sınava gir.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 10,
          para: 10,
          unvan_kazan: "Kraliyet Muhafızı",
          etiket_ekle: ["itibar:kraliyet_muhafizi"],
          mesaj: "Sınavı fazlasıyla geçtin; artık hükümdarın en yakınında duruyorsun.",
        },
        basarisizSonuc: {
          un: -3,
          mutluluk: -5,
          mesaj: "Sınavı geçemedin; saray seni nazikçe geri gönderdi, ordugâhta bir süre dedikodusu konuşuldu.",
        },
      },
      {
        metin: "Nazikçe reddet, ordunla kal.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 3,
          dost_puani: 3,
          mesaj: "Reddin, ordudaki arkadaşlarının gözünde seni daha da değerli kıldı.",
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
    minMeslekYatkinlikSeviye: 4,
    agirlik: 1.2,
    gorsel: "⚔️",
    baslik: "Efsanevi Düello Daveti",
    metin:
      "Ünün bir rakip şampiyonun kulağına gitmiş. Herkesin önünde, tek vuruşluk bir düelloyla seni meydan okumaya çağırıyor.",
    secenekler: [
      {
        metin: "Meydan okumayı kabul et.",
        baseBasariSansi: 58,
        basariliSonuc: {
          un: 12,
          para: 8,
          unvan_kazan: "Yenilmez Şampiyon",
          mesaj: "Kılıcın havada parladı, rakibin diz çöktü — adın bir efsaneye dönüştü.",
        },
        basarisizSonuc: {
          saglik: -14,
          un: -5,
          mutluluk: -6,
          mesaj: "Ağır yaralı ayrıldın meydandan; yenilgi haberi ordugâhta hızla yayıldı.",
        },
      },
      {
        metin: "Onurunla reddet, bahaneye gerek yok.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -2,
          mesaj: "Reddettin; bazıları korkak sanacak ama sağduyulu davrandığını biliyorsun.",
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
    minMeslekYatkinlikSeviye: 4,
    agirlik: 1.2,
    gorsel: "📜",
    baslik: "Krallığın Baş Tedarikçisi Teklifi",
    metin:
      "Saray kâhyası, keskin ticari zekânı duymuş. Seni krallığın baş tedarikçisi olman için büyük bir görüşmeye çağırıyor.",
    secenekler: [
      {
        metin: "Büyük sözleşmeyi imzala.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 22,
          un: 6,
          maas_carpani: 1.06,
          unvan_kazan: "Kraliyet Tedarikçisi",
          mesaj: "Sözleşme imzalandı; hem kasan hem adın büyük ölçüde büyüdü.",
        },
        basarisizSonuc: {
          para: -14,
          mutluluk: -4,
          mesaj: "Şartlar göründüğünden ağırdı; anlaşma seni zarara soktu.",
        },
      },
      {
        metin: "Riske girme, küçük işlerine devam et.",
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
    minMeslekYatkinlikSeviye: 4,
    agirlik: 1.2,
    gorsel: "🐍",
    baslik: "Rakiplerin Kıskançlığı",
    metin:
      "Başarın gözleri üzerine çekti. Rakip tüccarlar aleyhinde karanlık söylentiler yayıyor, hatta mallarını sabote etmeye çalışıyor.",
    secenekler: [
      {
        metin: "Kanıt topla, itibarını savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          rakip_puani: -10,
          mesaj: "Söylentilerin kaynağını buldun; gerçek ortaya çıkınca herkes senden yana döndü.",
        },
        basarisizSonuc: {
          un: -6,
          para: -10,
          mutluluk: -5,
          mesaj: "Kanıt bulamadın; söylentiler daha da büyüyerek işlerini bir süre etkiledi.",
        },
      },
      {
        metin: "Görmezden gel, işine odaklan.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -2,
          mesaj: "Söylentileri yok saydın; bazıları inanmaya devam etse de zamanla söndü.",
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
    minMeslekYatkinlikSeviye: 4,
    agirlik: 1.2,
    gorsel: "✨",
    baslik: "Kutsal Bir Görev İçin Seçilmek",
    metin:
      "Üstlerin, inancının derinliğini duyup seni özel, kutsal bir emaneti korumak için seçti. Bu, cemaat içinde nadir verilen bir onur.",
    secenekler: [
      {
        metin: "Görevi kabul et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 8,
          un: 6,
          unvan_kazan: "Kutsal Emanetin Bekçisi",
          mesaj: "Görevi başarıyla tamamladın; cemaat sana çok daha büyük bir saygıyla bakıyor artık.",
        },
        basarisizSonuc: {
          ahlak: -6,
          mutluluk: -5,
          mesaj: "Görev sırasında ağır bir hataya düştün; bu seni derinden sarstı.",
        },
      },
      {
        metin: "Alçakgönüllülükle reddet, layık olmadığını söyle.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Alçakgönüllülüğün cemaat arasında sessiz bir takdirle karşılandı.",
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
    minMeslekYatkinlikSeviye: 4,
    agirlik: 1.2,
    gorsel: "🕊️",
    baslik: "Mucize Söylentisi",
    metin:
      "Ellerinle iyileşen ya da huzur bulan biri hakkında bir mucize söylentisi yayılıyor. Kalabalıklar umutla kapına dayanıyor.",
    secenekler: [
      {
        metin: "Söylentiyi doğrula, insanları kabul et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 14,
          para: 8,
          mesaj: "Söylenti seni bölgenin en saygın ismine dönüştürdü.",
        },
        basarisizSonuc: {
          un: -8,
          mutluluk: -6,
          ahlak: -3,
          mesaj: "Beklentileri karşılayamadın; hayal kırıklığı hızla yayıldı.",
        },
      },
      {
        metin: "Söylentiyi reddet, mütevazı kal.",
        baseBasariSansi: 100,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Mucize iddialarını reddettin; bazıları inatla inanmaya devam etse de huzurunu korudun.",
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
    minMeslekYatkinlikSeviye: 4,
    agirlik: 1.2,
    gorsel: "👑",
    baslik: "Sarayın Baş Zanaatkârı Daveti",
    metin:
      "Ellerinin ustalığı sarayın kulağına gitti. Senden saray için özel, görkemli bir eser sipariş ediliyor.",
    secenekler: [
      {
        metin: "Siparişi kabul et, en iyi işini çıkar.",
        baseBasariSansi: 58,
        basariliSonuc: {
          para: 20,
          un: 8,
          unvan_kazan: "Sarayın Baş Zanaatkârı",
          mesaj: "Eserin sarayda hayranlıkla karşılandı; adın artık soylular arasında da anılıyor.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -5,
          mesaj: "Eser beklentiyi karşılamadı; saray hayal kırıklığını gizlemedi.",
        },
      },
      {
        metin: "Riske girme, sıradan siparişlerine devam et.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Küçük ama güvenli siparişlerinle yoluna devam ettin.",
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
    minMeslekYatkinlikSeviye: 4,
    agirlik: 1.2,
    gorsel: "🎭",
    baslik: "Taklitçiler ve Sahtekârlar",
    metin:
      "Adının değeri arttıkça, işini taklit edip senin imzanla satan sahtekârlar türedi. Müşterilerin kafası karışıyor.",
    secenekler: [
      {
        metin: "Peşlerine düş, sahtekârları teşhir et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          rakip_puani: -6,
          mesaj: "Sahtekârları teşhir ettin; gerçek ustalık yeniden konuşulur oldu.",
        },
        basarisizSonuc: {
          un: -6,
          para: -8,
          mutluluk: -4,
          mesaj: "Sahtekârları bulamadın; itibarın bir süre zedelendi.",
        },
      },
      {
        metin: "Kendi işine ayırt edici bir mühür ekle.",
        baseBasariSansi: 100,
        basariliSonuc: {
          un: 2,
          para: -3,
          mesaj: "Yeni mührünle işlerini ayırt etmeye başladın; küçük bir masraf oldu ama işe yaradı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
];
