import { OlayTanimi } from "./types";

/**
 * Bölgeye özgü flavor/karar olayları (Sanayi Devrimi) — bölgeOzellikleri.ts'teki
 * bonus/malus temasına dayanır (ör. İngiltere'nin sanayi gücü/mutluluk malusü,
 * Rusya'nın asker gücü/itibar malusü vb.). `bolgeler` filtresiyle normal
 * rastgele havuza girer, ayrı bir alt sistem gerektirmez.
 */
export const OLAY_BOLGESEL_SANAYI: OlayTanimi[] = [
  // ============================================================
  // İNGİLTERE
  // ============================================================
  {
    id: "bolge_ingiltere_01",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Fabrika Yatırımı",
    metin: "Yeni bir tekstil fabrikasına ortak olma fırsatı çıktı; buharlı makineler üretimi katlıyor.",
    secenekler: [
      {
        metin: "Küçük bir hisseyle katıl.",
        baseBasariSansi: 70,
        maliyet: 10,
        basariliSonuc: { para: 18, mesaj: "Fabrika kâr etti, hissen değerlendi." },
        basarisizSonuc: { para: -10, mesaj: "Fabrika beklenen üretimi tutturamadı, yatırımın zarar etti." },
      },
      {
        metin: "Büyük sermaye koy, çoğunluk hissesi al.",
        baseBasariSansi: 45,
        maliyet: 22,
        basariliSonuc: { para: 45, mesaj: "Cesur yatırımın seni zengin etti." },
        basarisizSonuc: { para: -24, mutluluk: -5, mesaj: "Fabrika iflas etti, sermayenin büyük kısmını kaybettin." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_02",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Sendika Toplantısı",
    metin: "İşçiler daha iyi koşullar için bir sendika kurmayı tartışıyor; senden de destek isteniyor.",
    secenekler: [
      {
        metin: "Sendikayı destekle.",
        baseBasariSansi: 60,
        basariliSonuc: { ahlak: 6, un: 3, mesaj: "Desteğin işçiler arasında saygı kazandırdı." },
        basarisizSonuc: { para: -6, mutluluk: -3, mesaj: "Patronlar seni fark etti, küçük bir cezaya çarptırıldın." },
      },
      {
        metin: "Uzak dur, işine odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Sorun yaşamadan işine devam ettin." },
        basarisizSonuc: { ahlak: -4, mesaj: "İşçiler seni kayıtsız kalmakla suçladı." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_03",
    kategori: "saglik",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Kömür Dumanı",
    metin: "Fabrika bacalarından çıkan is ve duman şehri sarmış; nefes almak bile zorlaşıyor.",
    secenekler: [
      {
        metin: "Maske gibi bir bez tak, tedbirli ol.",
        baseBasariSansi: 70,
        maliyet: 3,
        basariliSonuc: { saglik: 3, mesaj: "Basit önlemin işe yaradı, nispeten iyi hissediyorsun." },
        basarisizSonuc: { saglik: -5, mutluluk: -3, mesaj: "Tedbirine rağmen öksürük seni bir süre rahatsız etti." },
      },
      {
        metin: "Umursama, günlük hayatına devam et.",
        baseBasariSansi: 60,
        basariliSonuc: { mutluluk: 2, mesaj: "Alışmışsın, günün akışını bozmadın." },
        basarisizSonuc: { saglik: -9, mutluluk: -4, mesaj: "Ciğerlerin duman yüzünden ciddi şekilde etkilendi." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_04",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Londra Borsası",
    metin: "Borsada demiryolu şirketlerinin hisseleri hızla yükseliyor; herkes bu çılgınlığa katılmak istiyor.",
    secenekler: [
      {
        metin: "Temkinli, küçük bir miktarla oyna.",
        baseBasariSansi: 65,
        maliyet: 10,
        basariliSonuc: { para: 16, mesaj: "Doğru zamanda çıktın, güzel bir kâr elde ettin." },
        basarisizSonuc: { para: -10, mesaj: "Balon patladı, yatırımının bir kısmı buharlaştı." },
      },
      {
        metin: "Her şeyini yatır.",
        baseBasariSansi: 40,
        maliyet: 20,
        basariliSonuc: { para: 50, mesaj: "Spekülasyon seni bir gecede zengin etti." },
        basarisizSonuc: { para: -24, mutluluk: -6, mesaj: "Balon patladığında elinde kağıt parçasından başka bir şey kalmadı." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_05",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Demiryolu İnşaatı",
    metin: "Şehirler arası yeni bir demiryolu hattı için işgücü ve sermaye aranıyor.",
    secenekler: [
      {
        metin: "İşçi olarak katıl.",
        baseBasariSansi: 75,
        basariliSonuc: { para: 8, saglik: -3, mesaj: "Ağır ama düzenli bir kazanç elde ettin." },
        basarisizSonuc: { saglik: -8, mesaj: "İş kazası geçirdin, bir süre çalışamadın." },
      },
      {
        metin: "Küçük bir yüklenici olarak sermaye koy.",
        baseBasariSansi: 50,
        maliyet: 14,
        basariliSonuc: { para: 26, mesaj: "Hat zamanında tamamlandı, payını fazlasıyla aldın." },
        basarisizSonuc: { para: -14, mesaj: "Proje gecikti, sermayenin bir kısmı battı." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_06",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Sömürge Malları",
    metin: "Sömürgelerden gelen ucuz pamuk ve şeker ticareti büyük kâr vaat ediyor, ama koşulları herkes bilmiyor değil.",
    secenekler: [
      {
        metin: "Ticarete gir, kazancı önceleyerek.",
        baseBasariSansi: 60,
        basariliSonuc: { para: 20, ahlak: -6, mesaj: "Sömürge malları büyük kâr getirdi, ama vicdanın rahat değil." },
        basarisizSonuc: { para: -10, mutluluk: -3, mesaj: "Fiyatlar düştü, beklediğin kazancı bulamadın." },
      },
      {
        metin: "Yerel üreticilerle çalış, daha az kazan.",
        baseBasariSansi: 75,
        basariliSonuc: { para: 8, ahlak: 3, mesaj: "Vicdanen rahat bir kazanç elde ettin." },
        basarisizSonuc: { para: -3, mesaj: "Yerel tedarik yetersiz kaldı, satışların azaldı." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_07",
    kategori: "saglik",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Fabrika Kazası",
    metin: "Çalıştığın fabrikada bir makine arızalandı; işçiler arasında panik var.",
    secenekler: [
      {
        metin: "Yardıma koş, makineyi durdur.",
        baseBasariSansi: 45,
        basariliSonuc: { un: 8, saglik: -4, mesaj: "Cesur müdahalen birçok işçiyi kurtardı, adın duyuldu." },
        basarisizSonuc: { saglik: -14, mesaj: "Makineye yaklaşırken ciddi şekilde yaralandın." },
      },
      {
        metin: "Güvenli mesafede bekle.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Güvende kaldın, olay kontrol altına alındı." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Kazayı izlemek bile seni derinden sarstı." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_08",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Parlamentoda Reform",
    metin: "Parlamentoda oy hakkının genişletilmesi tartışılıyor; sokaklarda imza kampanyaları düzenleniyor.",
    secenekler: [
      {
        metin: "İmza kampanyasına katıl.",
        baseBasariSansi: 75,
        basariliSonuc: { ahlak: 5, un: 3, mesaj: "Desteğin reform yanlıları arasında not edildi." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Kampanya beklenen ilgiyi görmedi, hayal kırıklığına uğradın." },
      },
      {
        metin: "Uzak dur, siyasetten kaçın.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Tartışmalı konudan uzak durup huzurunu korudun." },
        basarisizSonuc: { un: -3, mesaj: "Bazıları kayıtsızlığını eleştirdi." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_09",
    kategori: "din",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Yoksulluk Manzarası",
    metin: "Fabrika mahallesinde aç çocuklar ve düşkünler görüyorsun; bir hayır kurumu yardım topluyor.",
    secenekler: [
      {
        metin: "Elinden geldiğince bağışta bulun.",
        baseBasariSansi: 80,
        maliyet: 6,
        basariliSonuc: { ahlak: 6, mutluluk: 3, mesaj: "Yardımın birkaç aileye umut oldu." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Bağışının yetersiz kaldığını düşünüp üzüldün." },
      },
      {
        metin: "Görmezden gel, kendi işine bak.",
        baseBasariSansi: 85,
        basariliSonuc: { para: 3, mesaj: "Kendi bütçeni koruyarak yoluna devam ettin." },
        basarisizSonuc: { ahlak: -5, mutluluk: -3, mesaj: "Gördüklerin vicdanını rahatsız etmeye devam etti." },
      },
    ],
  },
  {
    id: "bolge_ingiltere_10",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
    baslik: "Gazetede Haber",
    metin: "Yerel bir gazete, senin hakkında bir haber yazmayı düşünüyor; muhabir seninle konuşmak istiyor.",
    secenekler: [
      {
        metin: "Röportaj ver, açık konuş.",
        baseBasariSansi: 60,
        basariliSonuc: { un: 10, mesaj: "Haber olumlu çıktı, adın şehirde konuşulur oldu." },
        basarisizSonuc: { un: -6, mutluluk: -3, mesaj: "Sözlerin çarpıtıldı, haber seni kötü gösterdi." },
      },
      {
        metin: "Röportajı reddet.",
        baseBasariSansi: 80,
        basariliSonuc: { mutluluk: 2, mesaj: "Gizliliğini koruyup rahat ettin." },
        basarisizSonuc: { un: -3, mesaj: "Reddin, saklayacak bir şeyin olduğu izlenimi verdi." },
      },
    ],
  },

  // ============================================================
  // FRANSA (Sanayi Devrimi)
  // ============================================================
  {
    id: "bolge_fransa_sd_01",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Siyasi Kulüp",
    metin: "Devrim sonrası kurulan bir siyasi kulüp seni toplantılarına davet ediyor; fikirler çok hararetli tartışılıyor.",
    secenekler: [
      {
        metin: "Toplantılara katıl, fikrini paylaş.",
        baseBasariSansi: 65,
        basariliSonuc: { un: 7, mesaj: "Fikirlerin dinlendi, kulüpte sözün geçmeye başladı." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Tartışma kızıştı, karşıt görüşlülerle aran gerildi." },
      },
      {
        metin: "Uzaktan izle, taraf tutma.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Kimseyle ters düşmeden gelişmeleri takip ettin." },
        basarisizSonuc: { un: -3, mesaj: "Tarafsızlığın bazılarınca ilkesizlik olarak görüldü." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_02",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Salon Daveti",
    metin: "Şehrin ünlü bir edebiyat salonuna davet edildin; entelektüeller ve sanatçılar orada toplanıyor.",
    secenekler: [
      {
        metin: "Davete katıl, sohbete dahil ol.",
        baseBasariSansi: 75,
        basariliSonuc: { un: 6, mutluluk: 4, mesaj: "Zekice sözlerin salon sahiplerinin dikkatini çekti." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Sohbetin dışında kaldın, biraz yalnız hissettin." },
      },
      {
        metin: "Daveti geri çevir, evde kal.",
        baseBasariSansi: 90,
        basariliSonuc: { mutluluk: 2, mesaj: "Sakin bir akşam geçirdin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Daveti kaçırdığına sonradan üzüldün." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_03",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Bütçe Sıkıntısı",
    metin: "Savaş sonrası enflasyon ve ekonomik belirsizlik bütçeni zorluyor; ay sonunu getirmek zorlaşıyor.",
    secenekler: [
      {
        metin: "Harcamalarını kıs, tasarruf et.",
        baseBasariSansi: 80,
        basariliSonuc: { para: 4, mutluluk: -2, mesaj: "Sıkı bir tasarrufla ay sonunu idare ettin." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Tasarrufuna rağmen borçlanmak zorunda kaldın." },
      },
      {
        metin: "Ek bir iş bul, geliri artır.",
        baseBasariSansi: 55,
        basariliSonuc: { para: 14, saglik: -3, mesaj: "Ek işin yorucu ama gerekli geliri sağladı." },
        basarisizSonuc: { saglik: -5, mutluluk: -3, mesaj: "Ek iş seni tükendi, buna rağmen geliri yeterince artıramadın." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_04",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Barikat Söylentisi",
    metin: "Şehrin işçi mahallelerinde barikat kurulacağı, ayaklanma çıkacağı konuşuluyor.",
    secenekler: [
      {
        metin: "Evinden çıkma, sakin kal.",
        baseBasariSansi: 80,
        basariliSonuc: { mutluluk: 2, mesaj: "Karışıklığa bulaşmadan güvende kaldın." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Sokaklardan gelen gürültü geceni huzursuz geçirtti." },
      },
      {
        metin: "Meraktan sokağa çık, izle.",
        baseBasariSansi: 45,
        basariliSonuc: { un: 6, mesaj: "Olaylara tanık oldun, anlattıkların herkesi etkiledi." },
        basarisizSonuc: { saglik: -10, para: -4, mesaj: "Kargaşaya kapılıp hem yaralandın hem eşyalarından oldun." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_05",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Sanat Çevresi",
    metin: "Genç ressamlar ve yazarlardan oluşan bir çevre, eserlerini sergilemek için senden destek istiyor.",
    secenekler: [
      {
        metin: "Küçük bir destek ver.",
        baseBasariSansi: 75,
        maliyet: 6,
        basariliSonuc: { un: 6, mutluluk: 3, mesaj: "Desteğin sanatçılar arasında adını duyurdu." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Destekli sergi pek ilgi görmedi." },
      },
      {
        metin: "Kendi yeteneğini sergilemeye çalış.",
        baseBasariSansi: 45,
        basariliSonuc: { un: 10, mesaj: "Eserin beğenildi, çevre içinde tanındın." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Eserin eleştirildi, biraz gururun kırıldı." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_06",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Vergi Reformu",
    metin: "Yeni hükümet vergi sistemini değiştirmeyi planlıyor; kimi bunu adil, kimi baskı olarak görüyor.",
    secenekler: [
      {
        metin: "Reformu destekleyen bir dilekçe imzala.",
        baseBasariSansi: 75,
        basariliSonuc: { ahlak: 4, mesaj: "İmzan reformun geçmesine küçük bir katkı sağladı." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Dilekçe reddedildi, emeğin boşa gitti." },
      },
      {
        metin: "Karşı çık, mevcut düzeni savun.",
        baseBasariSansi: 60,
        basariliSonuc: { para: 6, mesaj: "Mevcut düzenin sana sağladığı avantajı korudun." },
        basarisizSonuc: { un: -4, mutluluk: -3, mesaj: "Muhafazakar tutumun bazı çevrelerde tepki topladı." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_07",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Cumhuriyetçi-Monarşist Çekişmesi",
    metin: "Kahvehanede cumhuriyetçiler ve monarşistler arasında sert bir tartışma çıktı; senden görüş isteniyor.",
    secenekler: [
      {
        metin: "Ilımlı, uzlaşmacı bir görüş belirt.",
        baseBasariSansi: 70,
        basariliSonuc: { un: 5, mesaj: "Dengeli sözlerin her iki taraftan da saygı gördü." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Kimseyi tatmin edemedin, ikisi de senden uzaklaştı." },
      },
      {
        metin: "Sessiz kal, tartışmadan çekil.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Gerginlikten uzak durdun." },
        basarisizSonuc: { un: -3, mesaj: "Sessizliğin ilgisizlik olarak yorumlandı." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_08",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Kafe Tartışmaları",
    metin: "Sık gittiğin kafede felsefe ve siyaset üzerine uzun tartışmalar dönüyor; masaya katılman isteniyor.",
    secenekler: [
      {
        metin: "Tartışmaya katıl.",
        baseBasariSansi: 70,
        basariliSonuc: { mutluluk: 5, un: 3, mesaj: "Fikirlerin beğenildi, keyifli bir akşam geçirdin." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Tartışma kızıştı, keyfin kaçtı." },
      },
      {
        metin: "Sessizce kahveni iç, dinle.",
        baseBasariSansi: 90,
        basariliSonuc: { mutluluk: 3, mesaj: "Sakin bir akşam geçirdin." },
        basarisizSonuc: { mutluluk: -1, mesaj: "Biraz sıkıcı geçti, dışarıda kalmışsın gibi hissettin." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_09",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Ordu Seferberliği",
    metin: "Ordu yeni bir seferberlik ilan etti; erkekler kayıt için çağrılıyor.",
    secenekler: [
      {
        metin: "Gönüllü yaz, sefere hazırlan.",
        baseBasariSansi: 55,
        basariliSonuc: { un: 8, mesaj: "Vatanseverliğin takdirle karşılandı." },
        basarisizSonuc: { saglik: -10, mesaj: "Eğitim sırasında ağır yaralandın." },
      },
      {
        metin: "Muafiyet için başvur.",
        baseBasariSansi: 65,
        maliyet: 10,
        basariliSonuc: { mutluluk: 3, mesaj: "Muafiyet aldın, sivil hayatına devam ettin." },
        basarisizSonuc: { para: -10, mutluluk: -3, mesaj: "Başvurun reddedildi, hem parayı hem umudunu kaybettin." },
      },
    ],
  },
  {
    id: "bolge_fransa_sd_10",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["Fransa"],
    baslik: "Borç Almak Zorunda Kalmak",
    metin: "Ekonomik sıkıntı yüzünden bir tefeciden borç almak zorunda kaldın; şartlar ağır.",
    secenekler: [
      {
        metin: "Küçük miktar al, dikkatli harca.",
        baseBasariSansi: 80,
        basariliSonuc: { para: 10, mesaj: "Borç geçici sıkıntını giderdi, dikkatli kullandın." },
        basarisizSonuc: { para: -4, mutluluk: -3, mesaj: "Borcu idare edemedin, faizler birikmeye başladı." },
      },
      {
        metin: "Büyük miktar al, riski göze al.",
        baseBasariSansi: 50,
        basariliSonuc: { para: 22, mesaj: "Aldığın borçla önemli bir açığını kapattın." },
        basarisizSonuc: { para: -14, mutluluk: -5, mesaj: "Borç yükü ağırlaştı, tefeci kapını sık çalar oldu." },
      },
    ],
  },

  // ============================================================
  // OSMANLI
  // ============================================================
  {
    id: "bolge_osmanli_01",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Tanzimat Tartışması",
    metin: "Yeni ilan edilen reformlar hakkında mahallede tartışmalar sürüyor; kimi destekliyor kimi karşı çıkıyor.",
    secenekler: [
      {
        metin: "Reformları destekle.",
        baseBasariSansi: 65,
        basariliSonuc: { un: 5, mesaj: "Yenilikçi tavrın bazı çevrelerde takdir gördü." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Muhafazakar komşuların tepkisini çektin." },
      },
      {
        metin: "Geleneksel düzeni savun.",
        baseBasariSansi: 70,
        basariliSonuc: { ahlak: 4, mesaj: "Köklü değerlere bağlılığın saygı gördü." },
        basarisizSonuc: { un: -4, mesaj: "Değişime kapalı olduğun için eleştirildin." },
      },
    ],
  },
  {
    id: "bolge_osmanli_02",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Esnaf Loncası Zorluğu",
    metin: "Avrupa'dan gelen ucuz fabrika malları, senin loncandaki esnafın işini zorlaştırıyor.",
    secenekler: [
      {
        metin: "Kaliteyi öne çıkar, direnmeye çalış.",
        baseBasariSansi: 55,
        basariliSonuc: { para: 8, un: 3, mesaj: "El emeğinin değerini anlatarak müşteri kaybını önledin." },
        basarisizSonuc: { para: -8, mesaj: "Ucuz mallarla rekabet edemedin, satışların düştü." },
      },
      {
        metin: "Fiyatını düşür, rekabete gir.",
        baseBasariSansi: 65,
        basariliSonuc: { para: 5, mesaj: "Düşük kârla da olsa işini sürdürdün." },
        basarisizSonuc: { para: -10, mesaj: "Düşük fiyatla bile alıcı bulamadın, zarar ettin." },
      },
    ],
  },
  {
    id: "bolge_osmanli_03",
    kategori: "din",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Cami Vakfı",
    metin: "Mahalle camisinin onarımı için vakıf bağışı toplanıyor.",
    secenekler: [
      {
        metin: "Bağışta bulun.",
        baseBasariSansi: 85,
        maliyet: 6,
        basariliSonuc: { ahlak: 6, mutluluk: 2, mesaj: "Bağışın hayırla anıldı." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Bağışın kayıtlara geç işlendi, biraz üzüldün." },
      },
      {
        metin: "Onarımda bizzat çalış.",
        baseBasariSansi: 65,
        basariliSonuc: { ahlak: 8, saglik: -3, mesaj: "Alın terinle katkı verdin, cemaat seni dualarla andı." },
        basarisizSonuc: { saglik: -6, mesaj: "Ağır işlerde yorulup hastalandın." },
      },
    ],
  },
  {
    id: "bolge_osmanli_04",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Avrupa Malları Rekabeti",
    metin: "Pazarda Avrupa'dan gelen ucuz ve bol mal, yerli üreticiyi zora sokuyor.",
    secenekler: [
      {
        metin: "Yerli üreticilerle dayanışma göster.",
        baseBasariSansi: 60,
        basariliSonuc: { ahlak: 5, para: 4, mesaj: "Dayanışman hem vicdanını rahatlattı hem küçük bir kazanç getirdi." },
        basarisizSonuc: { para: -6, mesaj: "Dayanışmana rağmen satışlar düşmeye devam etti." },
      },
      {
        metin: "Sen de ithal mal satmaya başla.",
        baseBasariSansi: 55,
        basariliSonuc: { para: 14, ahlak: -4, mesaj: "İthal mallardan iyi kazandın ama vicdan azabı duydun." },
        basarisizSonuc: { para: -8, mesaj: "İthal mal stoğun elinde kaldı, zarar ettin." },
      },
    ],
  },
  {
    id: "bolge_osmanli_05",
    kategori: "din",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Şer'i Mahkeme",
    metin: "Kadı, mahallede yaşanan bir anlaşmazlıkta senin de görüşünü almak istiyor.",
    secenekler: [
      {
        metin: "Adaletli, tarafsız görüş bildir.",
        baseBasariSansi: 80,
        basariliSonuc: { ahlak: 6, mesaj: "Adil sözlerin kadı tarafından takdir edildi." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Görüşün davanın sonucunu etkilemedi." },
      },
      {
        metin: "Tanıdığın tarafı destekle.",
        baseBasariSansi: 50,
        basariliSonuc: { para: 10, ahlak: -6, mesaj: "Desteğinin karşılığında küçük bir hediye aldın." },
        basarisizSonuc: { para: -8, ahlak: -4, mutluluk: -4, mesaj: "Taraflılığın ortaya çıktı, itibarın zedelendi." },
      },
    ],
  },
  {
    id: "bolge_osmanli_06",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Balkan Sınırında Huzursuzluk",
    metin: "Balkanlar'daki huzursuzluk haberleri şehre ulaşıyor; bazı gençler orduya yazılmayı düşünüyor.",
    secenekler: [
      {
        metin: "Orduya destek olarak yazıl.",
        baseBasariSansi: 55,
        basariliSonuc: { un: 7, mesaj: "Vatanseverliğin övgüyle karşılandı." },
        basarisizSonuc: { saglik: -12, mesaj: "Sınırdaki çatışmada yaralandın." },
      },
      {
        metin: "Ailenle memlekette kal.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Ailenin yanında güvende kaldın." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Bazı komşuların seni kayıtsızlıkla suçladı." },
      },
    ],
  },
  {
    id: "bolge_osmanli_07",
    kategori: "din",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Tekke Toplantısı",
    metin: "Mahalledeki bir dini cemaat, haftalık sohbetine seni davet etti.",
    secenekler: [
      {
        metin: "Sohbete katıl.",
        baseBasariSansi: 85,
        basariliSonuc: { ahlak: 5, mutluluk: 3, mesaj: "Sohbet ruhunu dinlendirdi." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Sohbet uzadı, pek verim alamadın." },
      },
      {
        metin: "Cemaate maddi destek ver.",
        baseBasariSansi: 70,
        maliyet: 6,
        basariliSonuc: { ahlak: 7, mesaj: "Desteğin dualarla karşılandı." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Desteğin beklediğin gibi takdir görmedi." },
      },
    ],
  },
  {
    id: "bolge_osmanli_08",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Demiryolu İmtiyazı",
    metin: "Yeni demiryolu hattının imtiyazı yabancı bir şirkete verilecek; halk arasında hoşnutsuzluk var.",
    secenekler: [
      {
        metin: "İtiraz dilekçesine imza at.",
        baseBasariSansi: 65,
        basariliSonuc: { ahlak: 4, un: 3, mesaj: "İmzan yerel çıkarları savunanlar arasında not edildi." },
        basarisizSonuc: { mutluluk: -3, mesaj: "İtirazlar dikkate alınmadı, hayal kırıklığına uğradın." },
      },
      {
        metin: "Sessiz kal, işine bak.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Tartışmadan uzak durdun." },
        basarisizSonuc: { un: -3, mesaj: "Kayıtsızlığın bazılarınca eleştirildi." },
      },
    ],
  },
  {
    id: "bolge_osmanli_09",
    kategori: "din",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Ramazan Hayrı",
    metin: "Ramazan ayında mahallede fakir ailelere iftar sofrası kurma girişimi var.",
    secenekler: [
      {
        metin: "Sofraya katkıda bulun.",
        baseBasariSansi: 80,
        maliyet: 8,
        basariliSonuc: { ahlak: 7, mutluluk: 4, mesaj: "Katkın birçok aileye umut oldu." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Katkın yeterli görülmedi, biraz üzüldün." },
      },
      {
        metin: "Kendi imkanınla evde iftar ver.",
        baseBasariSansi: 85,
        basariliSonuc: { ahlak: 5, mutluluk: 3, mesaj: "Sade ama samimi bir iftar sofrası kurdun." },
        basarisizSonuc: { mutluluk: -1, mesaj: "Beklediğin kalabalık gelmedi, biraz hayal kırıklığı yaşadın." },
      },
    ],
  },
  {
    id: "bolge_osmanli_10",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
    baslik: "Ordu Reformu",
    metin: "Yeniçeri sonrası kurulan yeni düzen ordusu hakkında şehirde tartışmalar sürüyor.",
    secenekler: [
      {
        metin: "Yeni orduyu destekle.",
        baseBasariSansi: 65,
        basariliSonuc: { un: 5, mesaj: "Modernleşmeyi destekleyen tavrın takdir gördü." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Eski düzeni özleyenlerin tepkisini çektin." },
      },
      {
        metin: "Eski düzeni öv, değişime şüpheyle bak.",
        baseBasariSansi: 65,
        basariliSonuc: { ahlak: 3, mesaj: "Geleneğe bağlılığın bazı çevrelerde saygı gördü." },
        basarisizSonuc: { un: -4, mesaj: "Değişime kapalı olduğun için eleştirildin." },
      },
    ],
  },

  // ============================================================
  // RUSYA
  // ============================================================
  {
    id: "bolge_rusya_01",
    kategori: "saglik",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Sert Kış",
    metin: "Bu yılki kış alışılmadık derecede sert geçiyor; odun ve erzak stoğun azalıyor.",
    secenekler: [
      {
        metin: "Ekstra odun ve erzak satın al.",
        baseBasariSansi: 75,
        maliyet: 8,
        basariliSonuc: { saglik: 5, mesaj: "Hazırlıklı olduğun için kışı sağlıkla atlattın." },
        basarisizSonuc: { saglik: -3, para: -4, mesaj: "Harcamana rağmen soğuktan biraz nasibini aldın." },
      },
      {
        metin: "İdareli kullan, riske gir.",
        baseBasariSansi: 55,
        basariliSonuc: { para: 4, mesaj: "Tasarrufun işe yaradı, parandan tasarruf ettin." },
        basarisizSonuc: { saglik: -12, mesaj: "Şiddetli soğuk seni ciddi şekilde hasta etti." },
      },
    ],
  },
  {
    id: "bolge_rusya_02",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Ordu Manevraları",
    metin: "Yakındaki garnizonda büyük bir tatbikat düzenleniyor; katılım gönüllülere açık.",
    secenekler: [
      {
        metin: "Manevralara katıl.",
        baseBasariSansi: 60,
        basariliSonuc: { un: 6, mesaj: "Disiplinli duruşun subayların dikkatini çekti." },
        basarisizSonuc: { saglik: -8, mesaj: "Ağır tatbikat seni yordu, sakatlandın." },
      },
      {
        metin: "İzleyici olarak kal.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Askerlerin disiplinini izlemek hoşuna gitti." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Soğukta uzun süre beklemek seni yordu." },
      },
    ],
  },
  {
    id: "bolge_rusya_03",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Batılı Diplomatın Küçümsemesi",
    metin: "Ziyarete gelen bir Batılı diplomat, Rus adetlerini küçümseyen sözler sarf etti.",
    secenekler: [
      {
        metin: "Onurunu savun, karşılık ver.",
        baseBasariSansi: 50,
        basariliSonuc: { un: 4, ahlak: 3, mesaj: "Duruşun çevrendekilerin saygısını kazandı." },
        basarisizSonuc: { mutluluk: -4, mesaj: "Tartışma büyüdü, gerginlik havayı bozdu." },
      },
      {
        metin: "Görmezden gel, sabırlı ol.",
        baseBasariSansi: 80,
        basariliSonuc: { mutluluk: 2, mesaj: "Sükunetini koruyup olayı büyütmedin." },
        basarisizSonuc: { un: -3, mesaj: "Sessizliğin bazılarınca zayıflık sanıldı." },
      },
    ],
  },
  {
    id: "bolge_rusya_04",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Serfliğin Kaldırılması",
    metin: "Serfliğin kaldırılacağına dair haberler köyde büyük tartışma yarattı; herkesin bir fikri var.",
    secenekler: [
      {
        metin: "Reformu destekle.",
        baseBasariSansi: 65,
        basariliSonuc: { ahlak: 6, un: 3, mesaj: "İnsancıl tavrın bazı çevrelerde takdir gördü." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Toprak sahibi komşuların tepkisini çektin." },
      },
      {
        metin: "Eski düzenin devamını iste.",
        baseBasariSansi: 65,
        basariliSonuc: { para: 6, mesaj: "Mevcut düzenin sana sağladığı avantajı korudun." },
        basarisizSonuc: { ahlak: -5, un: -4, mesaj: "Tutumun insafsız bulundu, itibarın zedelendi." },
      },
    ],
  },
  {
    id: "bolge_rusya_05",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Sürgün Tehdidi",
    metin: "Yetkililer, bir yakınının 'şüpheli' faaliyetlerine karıştığını iddia ediyor; sana da soru soruluyor.",
    secenekler: [
      {
        metin: "İşbirliği yap, her şeyi anlat.",
        baseBasariSansi: 70,
        basariliSonuc: { mutluluk: -2, mesaj: "İşbirliğin seni tehlikeden uzak tuttu ama içini rahatsız etti." },
        basarisizSonuc: { un: -6, mutluluk: -4, mesaj: "Anlattıkların işe yaramadı, itibarın zedelendi." },
      },
      {
        metin: "Sessiz kal, hiçbir şey söyleme.",
        baseBasariSansi: 45,
        basariliSonuc: { ahlak: 5, mesaj: "Sadakatin ve sessizliğin takdirle karşılandı." },
        basarisizSonuc: { para: -12, mutluluk: -5, mesaj: "Sessizliğin şüphe çekti, ağır bir para cezasına çarptırıldın." },
      },
    ],
  },
  {
    id: "bolge_rusya_06",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Kazak Süvari Eğitimi",
    metin: "Kazak süvari birliğine katılıp eğitim alma fırsatın doğdu.",
    secenekler: [
      {
        metin: "Eğitime katıl.",
        baseBasariSansi: 55,
        basariliSonuc: { un: 8, saglik: -3, mesaj: "Zorlu eğitimi tamamlayıp beğeni topladın." },
        basarisizSonuc: { saglik: -10, mesaj: "Eğitim sırasında attan düşüp yaralandın." },
      },
      {
        metin: "Teklifi geri çevir.",
        baseBasariSansi: 90,
        basariliSonuc: { mutluluk: 2, mesaj: "Rahatını bozmadan günlük hayatına devam ettin." },
        basarisizSonuc: { un: -3, mesaj: "Reddin bazılarınca korkaklık olarak yorumlandı." },
      },
    ],
  },
  {
    id: "bolge_rusya_07",
    kategori: "din",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Manastırda İnziva",
    metin: "Ortodoks bir manastıra kısa süreli bir inziva için davet edildin.",
    secenekler: [
      {
        metin: "İnzivaya katıl.",
        baseBasariSansi: 75,
        maliyet: 4,
        basariliSonuc: { ahlak: 6, saglik: 4, mesaj: "Sessizlik ve dua ruhunu ve bedenini dinlendirdi." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Katı kurallar seni bunalttı, pek huzur bulamadın." },
      },
      {
        metin: "Teklifi geri çevir, günlük hayatına devam et.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Alışkın olduğun hayatına devam ettin." },
        basarisizSonuc: { mutluluk: -2, mesaj: "Fırsatı kaçırdığına sonradan üzüldün." },
      },
    ],
  },
  {
    id: "bolge_rusya_08",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Batı Basınında Rusya",
    metin: "Batılı bir gazete Rusya'yı geri kalmış bir ülke olarak resmeden bir yazı yayınlamış; ziyaretçi bir yabancı seninle bunu tartışmak istiyor.",
    secenekler: [
      {
        metin: "Ülkeni savun, gerçekleri anlat.",
        baseBasariSansi: 55,
        basariliSonuc: { un: 6, ahlak: 3, mesaj: "Sözlerin yabancının bakışını değiştirdi." },
        basarisizSonuc: { mutluluk: -3, mesaj: "Tartışma gerginleşti, ikna edemedin." },
      },
      {
        metin: "Boş ver, tartışmaya girme.",
        baseBasariSansi: 85,
        basariliSonuc: { mutluluk: 2, mesaj: "Gereksiz bir tartışmadan kaçındın." },
        basarisizSonuc: { un: -3, mesaj: "Sessizliğin yabancının önyargısını pekiştirdi." },
      },
    ],
  },
  {
    id: "bolge_rusya_09",
    kategori: "savas",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Kırım Savaşı Sonrası",
    metin: "Kırım Savaşı'nın yıkımından sonra bölge yeniden yapılanıyor; hem emek hem sermaye aranıyor.",
    secenekler: [
      {
        metin: "Yeniden yapılanmaya emek ver.",
        baseBasariSansi: 70,
        basariliSonuc: { un: 6, saglik: -3, mesaj: "Katkın yeniden doğuşun bir parçası oldu." },
        basarisizSonuc: { saglik: -6, mesaj: "Ağır işler seni yıprattı." },
      },
      {
        metin: "Yeniden yapılanmaya sermaye koy.",
        baseBasariSansi: 55,
        maliyet: 10,
        basariliSonuc: { para: 18, mesaj: "Yatırımın bölge toparlanınca değerlendi." },
        basarisizSonuc: { para: -10, mesaj: "Yeniden yapılanma yavaş ilerledi, sermayenin bir kısmı battı." },
      },
    ],
  },
  {
    id: "bolge_rusya_10",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    bolgeler: ["Rusya"],
    baslik: "Volga Kıyısında Ticaret",
    metin: "Volga nehri kıyısında küçük bir ticaret girişimi kurmayı düşünüyorsun; rekabet güçlü tüccarlarla.",
    secenekler: [
      {
        metin: "Temkinli, küçük ölçekte başla.",
        baseBasariSansi: 65,
        maliyet: 8,
        basariliSonuc: { para: 12, mesaj: "Küçük ama istikrarlı bir kazanç elde ettin." },
        basarisizSonuc: { para: -8, mesaj: "Güçlü rakipler seni pazardan sildi." },
      },
      {
        metin: "İddialı bir şekilde büyük başla.",
        baseBasariSansi: 40,
        maliyet: 16,
        basariliSonuc: { para: 30, mesaj: "Cesur girişimin büyük kazanç getirdi." },
        basarisizSonuc: { para: -16, mutluluk: -4, mesaj: "Rekabete dayanamayıp önemli bir kayıp yaşadın." },
      },
    ],
  },
];
