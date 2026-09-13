import type { OlayTanimi } from "./types";

/**
 * "Absürt / garip / eğlenceli" olaylar (2026-09). komikOlumler.ts'in aksine
 * bu havuzun amacı ölüm değil — tuhaf, gülünç, sosyal olarak riskli küçük
 * anlar. Her olayda İKİ seçenek de birbirine yakın değerde ama FARKLI
 * eksenlerde bir bedel taşır (biri parasal/toplumsal risk alır, diğeri
 * güvenli ama kendi küçük bedelini öder) — "hangisi daha iyi" net değil.
 * Hepsi `ton:"hafif"`, düşük `agirlik` (0.22-0.3), id öneki "komik_" —
 * `mutlulukDengesi.test.ts` bu öneki (komikOlumler ile aynı gerekçeyle)
 * genel moral-dengesi ölçümünden bilinçli olarak hariç tutuyor.
 */
export const OLAY_KOMIK_GARIP: OlayTanimi[] = [
  // ───────────────────────── ORTAK (10, her iki çağda da çıkar) ─────────────────────────
  {
    id: "komik_yeme_yarismasi",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.28,
    minYas: 16,
    gorsel: "🍖",
    baslik: "Yeme Yarışması",
    metin:
      "Pazar meydanında bir yeme yarışması kızışmış. Kazanana bir hafta bedava yemek var, ama masadaki tabak yığını insanı ürkütüyor.",
    secenekler: [
      {
        metin: "Yarışa katıl, midenle gurur duy.",
        baseBasariSansi: 55,
        ipucu: "Kazanırsan bir hafta karnın tok; kaybedersen mide bulanır",
        basariliSonuc: {
          un: 6,
          mutluluk: 5,
          para: 4,
          mesaj: "Son tabağı da bitirdin! Kalabalık tezahürat yaptı, bir hafta yemek senden çıktı.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -3,
          mesaj: "Yarının yarısında pes ettin, midenle günlerce dost olamadın.",
        },
      },
      {
        metin: "Kenardan izle, dalga geçmekle yetin.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama biraz sıkıcı",
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Rahat rahat izledin, midenin sana teşekkür ettiğini hissettin.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "'Korkak' diye takıldılar biraz; umursamadın ama duydun.",
        },
      },
    ],
  },
  {
    id: "komik_yanlis_sarki",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 15,
    gorsel: "🎤",
    baslik: "Meydanda Şarkı",
    metin:
      "Bir ozan/gezgin çalgıcı seni meydanda sahneye çağırdı: 'Haydi, bir şarkı söyle!' Kalabalık bekliyor, sözleri de pek hatırlamıyorsun.",
    secenekler: [
      {
        metin: "Çık, ne çıkarsa çıksın söyle.",
        baseBasariSansi: 50,
        ipucu: "Ya alkış ya kahkaha — ikisi de sesin çıkar",
        basariliSonuc: {
          un: 8,
          mutluluk: 7,
          mesaj: "Sesin şaşırtıcı derecede güzel çıktı, kalabalık alkışladı.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -2,
          mesaj: "Sözleri karıştırdın, ton tutmadı; günlerce 'ozan' diye takıldılar sana — iyi anlamda değil.",
        },
      },
      {
        metin: "Utan, teşekkür edip reddet.",
        baseBasariSansi: 90,
        ipucu: "Güvenli; ufak bir hayal kırıklığı",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Nazikçe reddettin, ozan omuz silkip başka birini çağırdı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Israrla üstüne geldiler, kaçarcasına oradan uzaklaştın; içinde bir pişmanlık kaldı.",
        },
      },
    ],
  },
  {
    id: "komik_garip_yanlis_cenaze",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "⚱️",
    baslik: "Yanlış Cenaze",
    metin:
      "Kalabalık bir ağıt törenine katıldın — ama birkaç dakika sonra fark ettin ki hiç tanımadığın birinin cenazesi bu. Herkes seni tanıdık sanıyor, ağlıyor.",
    secenekler: [
      {
        metin: "Rolü sürdür, ağıt yakmaya devam et.",
        baseBasariSansi: 60,
        ipucu: "Sıyırabilirsen komik bir anı; sıyıramazsan mahcup bir sahne",
        basariliSonuc: {
          mutluluk: 5,
          un: 3,
          mesaj: "Kimse fark etmedi bile, hatta biri sana 'çok içten bir vedaydı' dedi.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -4,
          mesaj: "Yanlış ismi andığında herkes sana döndü. Utançla sıvıştın.",
        },
      },
      {
        metin: "Sessizce çık, hiç fark ettirme.",
        baseBasariSansi: 80,
        ipucu: "Güvenli çıkış, ufak bir vicdan sızısı",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Kimseye görünmeden sıvıştın; olay tatlı bir anı olarak kaldı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Çıkarken bir sandalyeye çarpıp herkesin dikkatini çektin — sessiz kaçış pek de sessiz olmadı.",
        },
      },
    ],
  },
  {
    id: "komik_kopekle_banyo",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 12,
    gorsel: "🐕",
    baslik: "İnatçı Köpek",
    metin:
      "Komşunun kocaman, çamura bulanmış köpeği seni görünce peşine takıldı ve üstüne atlamak için bekliyor. Ya kaç ya da göğüsle.",
    secenekler: [
      {
        metin: "Köpekle boğuş, kontrol altına almaya çalış.",
        baseBasariSansi: 60,
        ipucu: "Başarırsan köpek dostun olur; olmazsa üstün başın berbat olur",
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 4,
          mesaj: "Köpeği sakinleştirdin, üstelik yeni bir dost kazandın gibi — kuyruğunu sallayarak yanında yürüdü.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -2,
          mesaj: "Köpek üstüne devrildi, kıyafetlerin çamur içinde kaldı; temizletmek de cebinden çıktı.",
        },
      },
      {
        metin: "Kaç, sokağın öbür ucuna geç.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama nefes nefese",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Zar zor kaçtın, köpek başka bir şeyle ilgilenmeye başladı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          saglik: -2,
          mesaj: "Kaçarken bir sepete tökezleyip düştün — köpek de bunu bir oyun sandı.",
        },
      },
    ],
  },
  {
    id: "komik_dedikodu_ikilemi",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🗣️",
    baslik: "Yayılan Dedikodu",
    metin:
      "Yarı şaka yollu söylediğin bir laf çarşıda abartılarak yayılmış; herkes senin hakkında tuhaf bir hikâye anlatıyor artık. Düzeltmek mi, yoksa hikâyeyi büyütmek mi?",
    secenekler: [
      {
        metin: "Hikâyeyi büyüt, tadını çıkar.",
        baseBasariSansi: 55,
        ipucu: "Eğlenceli bir şöhret ya da güvenilirlik kaybı",
        basariliSonuc: {
          un: 7,
          mutluluk: 4,
          mesaj: "Herkes senin 'efsaneni' konuşur oldu, hoşuna bile gitti.",
        },
        basarisizSonuc: {
          ahlak: -4,
          un: -3,
          mesaj: "Abartın çok ileri gitti, birileri seni yalancılıkla suçladı.",
        },
      },
      {
        metin: "Herkese gerçeği anlatıp düzelt.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama can sıkıcı bir uğraş",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Tek tek herkese gerçeği anlattın; yorucuydu ama vicdanın rahat.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kimse sana inanmadı, 'düzeltme' çaban hikâyeyi daha da renklendirdi.",
        },
      },
    ],
  },
  {
    id: "komik_agir_tas_kaldirma",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 17,
    gorsel: "🪨",
    baslik: "Güç Gösterisi",
    metin:
      "Meydandaki gençler kocaman bir taşı kaldırabilene bir ödül vaat ediyor. Taş göründüğünden ağır — ama seyirci de kalabalık.",
    secenekler: [
      {
        metin: "Var gücünle dene.",
        baseBasariSansi: 50,
        ipucu: "Kaldırırsan alkış; kaldıramazsan sırtın acır",
        basariliSonuc: {
          un: 8,
          para: 5,
          mesaj: "Taşı sonunda havaya kaldırdın, kalabalık çılgına döndü — ödül de cebinde.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -3,
          mesaj: "Sırtın çıktı, taş yerinden kıpırdamadı; günlerce eğilip kalkmakta zorlandın.",
        },
      },
      {
        metin: "Reddet, 'başka gün' de.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, biraz gururun kırılır",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Omuz silktin, kimse fazla takmadı.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Birkaç kişi seni 'zayıf' diye kışkırttı; yutkunup geçtin.",
        },
      },
    ],
  },
  {
    id: "komik_kimlik_gizleme",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    gorsel: "🎭",
    baslik: "Sahte Kimlik Şakası",
    metin:
      "Arkadaşların seni tanımadıkları bir grubun içine 'gizemli bir yabancı' kimliğiyle sokmayı öneriyor — sadece eğlence için. Rolü oynamak cesaret ister.",
    secenekler: [
      {
        metin: "Rolü üstlen, gizemli yabancıyı oyna.",
        baseBasariSansi: 55,
        ipucu: "İyi oynarsan efsane bir anı; ele verirsen mahcubiyet",
        basariliSonuc: {
          un: 6,
          mutluluk: 6,
          mesaj: "Rolü o kadar iyi oynadın ki grup gerçekten inandı — arkadaşların gülmekten kırıldı.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -3,
          mesaj: "Bir soruda çuvalladın, herkes şakayı anladı ve biraz da kırıldı.",
        },
      },
      {
        metin: "Vazgeç, kendin olarak tanış.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, sıradan",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Sıradan bir tanışma oldu, en azından kimse kırılmadı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Arkadaşların 'ödlek' diye takıldı biraz.",
        },
      },
    ],
  },
  {
    id: "komik_beklenmedik_dans",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 15,
    gorsel: "💃",
    baslik: "Beklenmedik Dans Daveti",
    metin:
      "Bir kutlamada, hiç tanımadığın biri elini uzatıp seni dansa davet etti. Herkes bakıyor, ayakların pek de dansçı ayağı değil.",
    secenekler: [
      {
        metin: "Kabul et, ritme uymaya çalış.",
        baseBasariSansi: 55,
        ipucu: "Tutturursan alkış; tutturamazsan gülüşmeler",
        basariliSonuc: {
          mutluluk: 7,
          un: 4,
          es_puani: 0,
          mesaj: "Beklenmedik bir şekilde adımları tuttun, birkaç kişi seni taklit etmeye çalıştı bile.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          un: -3,
          mesaj: "İki ayağın birbirine dolandı, yere kapaklandın; kalabalık kahkahayla güldü.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama biraz asosyal görünürsün",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Gülümseyip reddettin, davetçi başkasını buldu.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Israr üzerine sertçe reddettin, ortam biraz gerildi.",
        },
      },
    ],
  },
  {
    id: "komik_hirsiz_yanlisligi",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🥸",
    baslik: "Hırsız Zannedilmek",
    metin:
      "Bir arkadaşınla şaka yollu 'hırsız taklidi' yaparken, gerçek bir bekçi seni gerçek bir hırsız sandı ve peşine düştü. Açıklaman mı gerekiyor, kaçman mı?",
    secenekler: [
      {
        metin: "Dur, gülerek durumu açıkla.",
        baseBasariSansi: 55,
        ipucu: "İnandırırsan komik bir anı; inandıramazsan can sıkıcı bir sorgu",
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Bekçi de gülmekten kendini alamadı, 'bir dahaki sefere daha dikkatli' diye uyardı.",
        },
        basarisizSonuc: {
          para: -4,
          mutluluk: -3,
          mesaj: "Sana inanmadı, küçük bir para cezasıyla seni bıraktı ama gururun yaralı.",
        },
      },
      {
        metin: "Koş, meseleyi büyütme.",
        baseBasariSansi: 60,
        ipucu: "Kaçarsan olay kapanır; yakalanırsan işler kötüleşir",
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Ara sokaklarda kaybettirdin, nefes nefese ama serbestsin.",
        },
        basarisizSonuc: {
          suc_artis: 6,
          mutluluk: -4,
          mesaj: "Yakalandın; kaçman durumu daha da şüpheli gösterdi.",
        },
      },
    ],
  },
  {
    id: "komik_yanlis_takma_sakal",
    kategori: "sosyal",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    gorsel: "🧔",
    baslik: "Takma Sakal",
    metin:
      "Bir eğlence gösterisinde herkes gülünç takma sakal/bıyıklarla dolaşıyor. Sıra sana geldiğinde en abartılı olanını mı takarsın, yoksa geri mi çevirirsin?",
    secenekler: [
      {
        metin: "En abartılısını tak, sahneye çık.",
        baseBasariSansi: 60,
        ipucu: "Beğenilirsen gösterinin yıldızı olursun; beğenilmezsen gülünç durursun",
        basariliSonuc: {
          mutluluk: 6,
          un: 5,
          mesaj: "Kalabalık seni gösterinin en komik anı ilan etti, alkışlar seni buldu.",
        },
        basarisizSonuc: {
          un: -4,
          mutluluk: -2,
          mesaj: "Sakal yüzüne yapışıp düştü, tam yanlış anda — herkes güldü ama seninle değil, sana.",
        },
      },
      {
        metin: "Kibarca reddet, izleyici kal.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, sıradan bir akşam",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Kenardan izledin, gösteriyi yeterince eğlenceli buldun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Arkadaşların 'kasıntı' diye takıldı biraz.",
        },
      },
    ],
  },

  // ───────────────────────── ORTA ÇAĞ (25) ─────────────────────────
  {
    id: "komik_oc_turnuva_soytarisi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🤡",
    baslik: "Turnuvada Soytarı Meydan Okuması",
    metin:
      "Şövalyeler turnuvası öncesi saray soytarısı seni tahta bir kılıçla 'düelloya' davet etti — kalabalık zaten toplanmaya başladı bile.",
    secenekler: [
      {
        metin: "Kabul et, tahta kılıçla düello yap.",
        baseBasariSansi: 55,
        ipucu: "Kazanırsan kahkaha ve alkış; kaybedersen gülünç bir hafıza",
        basariliSonuc: {
          un: 7,
          mutluluk: 6,
          mesaj: "Soytarıyı tahta kılıçla yenince kalabalık çılgına döndü, seni turnuvanın 'ısınma yıldızı' ilan ettiler.",
        },
        basarisizSonuc: {
          un: -4,
          mutluluk: -2,
          mesaj: "Soytarı seni üç hamlede yere serdi; günlerce 'kılıç ustası' diye alay ettiler.",
        },
      },
      {
        metin: "Reddet, turnuvaya odaklan.",
        baseBasariSansi: 85,
        ipucu: "Ciddiyetini korur ama ufak bir 'sıkıcı' etiketi alırsın",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Soytarı omuz silkip başka birini buldu, sen turnuvaya odaklandın.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Soytarı seni 'korkak şövalye adayı' diye bağırarak tanıttı — biraz can sıktı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_manastir_bira_kacirma",
    kategori: "din",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 17,
    gorsel: "🍺",
    baslik: "Manastırın Gizli Birası",
    metin:
      "Rahiplerin kendi içtiği özel biradan bir fıçı, kilerin köşesinde unutulmuş gibi duruyor. Kimse yokken bir tas doldurmak cazip.",
    secenekler: [
      {
        metin: "Sessizce bir tas doldur.",
        baseBasariSansi: 55,
        ipucu: "Kaçarsan lezzetli bir anı; yakalanırsan vicdan + itibar bedeli",
        basariliSonuc: {
          mutluluk: 6,
          ahlak: -3,
          mesaj: "Bira nefis çıktı — kimse fark etmedi, sırrını sakladın.",
        },
        basarisizSonuc: {
          ahlak: -5,
          un: -4,
          mesaj: "Baş rahip seni tam tasın başında yakaladı; günlerce kilise avlusunu süpürttürdü.",
        },
      },
      {
        metin: "Vazgeç, kilerden uzak dur.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ufak bir merak kalır içinde",
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Ayartmaya direndin, vicdanın rahat kaldı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Bütün gün o biranın kokusunu düşünüp durdun.",
        },
      },
    ],
  },
  {
    id: "komik_oc_sato_hendegi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🏰",
    baslik: "Hendek Atlama Bahsi",
    metin:
      "Şatonun kuru hendeğini bir çırpıda atlayabileceğine dair bir bahse girdin. Hendek göründüğünden geniş — ve dibi hiç de yumuşak değil.",
    secenekler: [
      {
        metin: "Geriye koş, sıçra.",
        baseBasariSansi: 50,
        ipucu: "Atlarsan efsane olursun; düşersen çamura bulanırsın",
        basariliSonuc: {
          un: 8,
          para: 6,
          mesaj: "Tam kenara indin! Kalabalık çığlık çığlığa alkışladı, bahsi kazandın.",
        },
        basarisizSonuc: {
          saglik: -7,
          mutluluk: -3,
          mesaj: "Ortasına düştün, çamurdan çıkman on dakikanı aldı.",
        },
      },
      {
        metin: "Bahsi geri çevir.",
        baseBasariSansi: 88,
        ipucu: "Güvenli, biraz alay konusu olursun",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "'Akıllısın' dedi biri, sen de öyle inanmaya çalıştın.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "'Korkak' lakabı bir süre peşini bırakmadı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_kral_taklidi",
    kategori: "siyaset",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    gorsel: "👑",
    baslik: "Kral Taklidi",
    metin:
      "Meyhanede biraz fazla kaçırmış arkadaşların seni tahta bir kürsüye çıkarıp kralın konuşma tarzını taklit etmen için kışkırtıyor. Duvarların kulakları var derler.",
    secenekler: [
      {
        metin: "Taklidi yap, herkesi güldür.",
        baseBasariSansi: 55,
        ipucu: "Komik bulunursan efsane; birileri ciddiye alırsa başın derde girer",
        basariliSonuc: {
          mutluluk: 7,
          un: 4,
          mesaj: "Taklidin o kadar iyiydi ki meyhane çınladı, hatta kralın kendisi kadar 'ciddi' konuştuğunu söylediler.",
        },
        basarisizSonuc: {
          un: -5,
          suc_artis: 5,
          mesaj: "Bir muhbir kulağı bunu duymuş, 'saygısızlık' diye şikâyet edilmenin eşiğine geldin.",
        },
      },
      {
        metin: "Reddet, kürsüden in.",
        baseBasariSansi: 88,
        ipucu: "Güvenli ama eğlenceden mahrum",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "İnip oturdun, arkadaşların 'kaçık' dedi ama zararsız geçti.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Israrla iterek zorladılar, huysuzca kaçtın oradan.",
        },
      },
    ],
  },
  {
    id: "komik_oc_falci_kadin",
    kategori: "din",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🔮",
    baslik: "Köy Falcısının Kehaneti",
    metin:
      "Köyün falcı kadını elini tutup gözlerine baktı: 'Bir eşek yüzünden büyük talihsizlik yaşayacaksın!' dedi ciddi ciddi. Bütün köy şimdi eşeklerden uzak duruyor gibi bakıyor sana.",
    secenekler: [
      {
        metin: "Kehaneti umursama, eşeklerle işine devam et.",
        baseBasariSansi: 65,
        ipucu: "Boş bir kehanet olabilir ya da tam isabet",
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Hiçbir şey olmadı, kehanet boş çıktı; köylüler seni 'cesur' diye anmaya başladı.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -3,
          mesaj: "Bir eşek seni tekmeledi — tam da falcının dediği gibi. Köy şimdi ona daha çok inanıyor.",
        },
      },
      {
        metin: "Ciddiye al, günlerce eşeklerden kaç.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama gülünç bir tedirginlik",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Hiç eşeğe yaklaşmadın, güvende kaldın ama herkes seni biraz garip buldu.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Bir eşek arabasından kaçarken düşüp herkesin önünde rezil oldun — kehanetten değil, korkudan.",
        },
      },
    ],
  },
  {
    id: "komik_oc_zirh_denemesi",
    kategori: "savas",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🛡️",
    baslik: "Ödünç Zırh",
    metin:
      "Bir asker arkadaşın tam takım zırhını denemene izin verdi. Ağırlığı tahmin ettiğinden fazla — ayakta durmak bile bir mücadele.",
    secenekler: [
      {
        metin: "Zırhla birkaç adım yürümeyi dene.",
        baseBasariSansi: 55,
        ipucu: "Başarırsan gösteriş yaparsın; olmazsa yere yığılırsın",
        basariliSonuc: {
          un: 6,
          mutluluk: 5,
          mesaj: "Sallana sallana da olsa birkaç adım attın, izleyenler etkilendi.",
        },
        basarisizSonuc: {
          saglik: -6,
          un: -3,
          mesaj: "İkinci adımda devrildin, zırh üstüne düştü — kalkman iki kişinin yardımıyla oldu.",
        },
      },
      {
        metin: "Sadece üstüne giy, kımıldama.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, gösterişten mahrum",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Zırhı ağırlığını hissederek denedin, güvenle çıkardın.",
        },
        basarisizSonuc: {
          saglik: -2,
          mesaj: "Çıkarırken bir kayış eline sıkıştı, ufak bir çizik aldın.",
        },
      },
    ],
  },
  {
    id: "komik_oc_ejderha_kemigi_satisi",
    kategori: "ticaret",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🦴",
    baslik: "Sahte Ejderha Kemiği",
    metin:
      "Gezgin bir satıcı sana bir öküz kemiğini 'gerçek ejderha kemiği' diye satmaya çalışıyor — sen de aynı numarayı başkasına yapmayı düşünüyorsun.",
    secenekler: [
      {
        metin: "Kemiği al, sen de başkasına 'ejderha kemiği' diye sat.",
        baseBasariSansi: 55,
        ipucu: "İnandırırsan kolay para; ortaya çıkarsa itibar lekesi",
        basariliSonuc: {
          para: 10,
          ahlak: -5,
          mesaj: "Saf bir gezgine kemiği üç katına sattın — vicdanın biraz sızladı ama kesen doldu.",
        },
        basarisizSonuc: {
          un: -6,
          ahlak: -3,
          mesaj: "Aldığın kişi kemiği bir kasaba göstermiş; 'dolandırıcı' lakabı bir süre peşini bırakmadı.",
        },
      },
      {
        metin: "Satıcıya numarasını söyle, satın alma.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, dürüst ama parasız",
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Satıcı somurttu ama sen vicdanınla huzurlu ayrıldın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Satıcı seni 'zevksiz' diye küçümsedi, biraz canını sıktı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_hamamda_karisiklik",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    gorsel: "🧖",
    baslik: "Hamamda Kıyafet Karışıklığı",
    metin:
      "Hamamdan çıkarken kıyafetlerinin bir kısmının başka birininkiyle karıştığını fark ettin — üstelik o kişi hâlâ içeride ve sabırsızca senin giysilerini arıyor.",
    secenekler: [
      {
        metin: "Gidip durumu açıkla, kıyafetleri değiştir.",
        baseBasariSansi: 60,
        ipucu: "İyi karşılanırsa komik bir anı; hoş karşılanmazsa mahcubiyet",
        basariliSonuc: {
          mutluluk: 5,
          dost_puani: 3,
          mesaj: "Karşı taraf da güldü, kıyafetleri gülüşerek değiştirdiniz — yeni bir tanışıklık bile oldu.",
        },
        basarisizSonuc: {
          un: -3,
          mutluluk: -2,
          mesaj: "Adam sinirlendi, hamam çıkışında herkesin önünde epey bağırdı sana.",
        },
      },
      {
        metin: "Farkında değilmiş gibi davranıp öylece git.",
        baseBasariSansi: 75,
        ipucu: "Riskli ama en azından tartışma yok",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Kimse fark etmedi, sen de rahat bir nefes aldın.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -3,
          mesaj: "Adam peşinden koştu ve herkesin önünde seni 'hırsız' diye bağırarak yakaladı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_sahin_kacagi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 15,
    gorsel: "🦅",
    baslik: "Soylunun Kaçan Şahini",
    metin:
      "Bir soylunun avcı şahini kolundan kaçıp bir ağaca kondu. Soylu panik içinde, sen de tam altındasın — şahini geri getirebilirsen mükâfat vaat ediyor.",
    secenekler: [
      {
        metin: "Ağaca tırman, şahini yakalamaya çalış.",
        baseBasariSansi: 50,
        ipucu: "Yakalarsan güzel bir ödül; olmazsa pençeler seni de bulur",
        basariliSonuc: {
          para: 12,
          un: 5,
          mesaj: "Şahini elinle yumuşakça yakaladın, soylu memnuniyetle cebini doldurdu.",
        },
        basarisizSonuc: {
          saglik: -6,
          mesaj: "Şahin elini gagaladı, sen de ağaçtan sıyrılarak indin — hem eller hem gurur yaralı.",
        },
      },
      {
        metin: "Uzaktan izle, karışma.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ödülsüz",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Soylunun uşakları şahini yakaladı, sen sadece seyirci kaldın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Soylu sana ters ters baktı, 'yardım edebilirdin' diye söylendi.",
        },
      },
    ],
  },
  {
    id: "komik_oc_yemin_toreni_karisikligi",
    kategori: "siyaset",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    gorsel: "📜",
    baslik: "Karışan Yemin",
    metin:
      "Küçük bir törende sadakat yemini etmen isteniyor ama metni ezberlemediğini fark ettin tam sıra sana geldiğinde — kalabalık bekliyor.",
    secenekler: [
      {
        metin: "Uydur, kendinden emin konuş.",
        baseBasariSansi: 55,
        ipucu: "İnandırıcı olursan kimse fark etmez; olmazsa herkes güler",
        basariliSonuc: {
          un: 6,
          mutluluk: 3,
          mesaj: "Uydurduğun cümleler o kadar tok geldi ki kimse asıl metni hatırlamadı bile.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Cümlelerin birbirine karıştı, birkaç kişi gülmemek için dudağını ısırdı.",
        },
      },
      {
        metin: "Dur, metni birine sor, biraz bekle.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama sahneyi biraz garipleştirir",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kısa bir sessizlikten sonra doğru metni okudun, kimse fazla takmadı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Beklerken tören havası bozuldu, birkaç kişi huzursuzca kıpırdandı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_dilenci_kiligi_bahsi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 17,
    gorsel: "🧥",
    baslik: "Dilenci Kılığı Bahsi",
    metin:
      "Arkadaşların, dilenci kılığına girip bir günde ne kadar sadaka toplayabileceğine dair bahse tutuştu seninle. Gurur biraz zedelenir ama kese de dolabilir.",
    secenekler: [
      {
        metin: "Kılığa gir, meydanda sadaka topla.",
        baseBasariSansi: 55,
        ipucu: "İyi oynarsan kese dolar; ele verirsen gurur kırılır",
        basariliSonuc: {
          para: 10,
          un: -2,
          mesaj: "Şaşırtıcı derecede iyi bir 'dilenci' oldun, kese ağzına kadar doldu.",
        },
        basarisizSonuc: {
          un: -6,
          ahlak: -3,
          mesaj: "Tanıdığın biri seni tanıdı ve herkese anlattı; günlerce alay konusu oldun.",
        },
      },
      {
        metin: "Bahsi reddet.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, gurur sağlam kalır",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Arkadaşların hayal kırıklığına uğradı ama saygı duydu.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "'Ödlek' diye takıldılar biraz.",
        },
      },
    ],
  },
  {
    id: "komik_oc_ozan_yarismasi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🎻",
    baslik: "Ozanlar Yarışması",
    metin:
      "Panayırda düzenlenen ozanlar yarışmasına son anda bir yer açıldı. Şiir yeteneğin şüpheli ama kazanana güzel bir ödül var.",
    secenekler: [
      {
        metin: "Sahneye çık, doğaçlama bir şiir söyle.",
        baseBasariSansi: 50,
        ipucu: "Beğenilirsen ödül; beğenilmezsen domates yer gibi olursun",
        basariliSonuc: {
          un: 8,
          para: 8,
          mesaj: "Doğaçlaman herkesi şaşırttı, jüri seni birinci ilan etti.",
        },
        basarisizSonuc: {
          un: -4,
          mutluluk: -3,
          mesaj: "Kafiyeler tutmadı, kalabalık kibarca gülümseyip başka birini alkışladı.",
        },
      },
      {
        metin: "Vazgeç, izleyici olarak kal.",
        baseBasariSansi: 88,
        ipucu: "Güvenli, ödülsüz",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Yarışmayı keyifle izledin, kimseye bir şey ispatlamak zorunda kalmadın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "İçinden bir pişmanlık geçti, 'denesem miydi acaba' diye düşünüp durdun.",
        },
      },
    ],
  },
  {
    id: "komik_oc_kutsal_su_satisi",
    kategori: "ticaret",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 17,
    gorsel: "💧",
    baslik: "Sahte Kutsal Su",
    metin:
      "Bir dolandırıcı sana 'kutsal kaynak suyu' diye sıradan kuyu suyu satmaya çalışıyor — sen de bir şişe alıp başkasına satmayı düşünüyorsun.",
    secenekler: [
      {
        metin: "Şişeyi al, sen de başkasına sat.",
        baseBasariSansi: 55,
        ipucu: "Kolay para ya da yakalanma riski",
        basariliSonuc: {
          para: 9,
          ahlak: -5,
          mesaj: "İnanan birine üç katına sattın — vicdanın hafif sızladı, kese ağırlaştı.",
        },
        basarisizSonuc: {
          un: -5,
          ahlak: -2,
          mesaj: "Aldığın kişi suyu içip hasta olunca hesabı senden sordu.",
        },
      },
      {
        metin: "Dolandırıcıyı ifşa et, satın alma.",
        baseBasariSansi: 80,
        ipucu: "Güvenli, dürüst ama bedava alkış yok",
        basariliSonuc: {
          ahlak: 3,
          un: 2,
          mesaj: "Kalabalık dolandırıcıyı kovaladı, sana 'dürüst adam' dediler.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Dolandırıcı kaçtı, kimse sana teşekkür bile etmedi.",
        },
      },
    ],
  },
  {
    id: "komik_oc_kacak_at_yarisi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 18,
    gorsel: "🐎",
    baslik: "Kaçak At Yarışı",
    metin:
      "Gece yarısı düzenlenen yasak dışı bir at yarışına bahis girme fırsatı çıktı. Kazanç iyi ama yakalanırsan başın derde girer.",
    secenekler: [
      {
        metin: "Bahse gir, yarışı izle.",
        baseBasariSansi: 55,
        ipucu: "Kazanırsan güzel para; baskın olursa suç lekesi",
        basariliSonuc: {
          para: 14,
          suc_artis: 6,
          mesaj: "Bahsi kazandın, kesen ağırlaştı — ama etraftakiler seni not aldı.",
        },
        basarisizSonuc: {
          para: -6,
          suc_artis: 8,
          mesaj: "Hem parayı kaybettin hem de bir muhbir seni gördü.",
        },
      },
      {
        metin: "Uzak dur, evine git.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, sıkıcı bir gece",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Evinde sakin bir gece geçirdin, kaçırdığın heyecanı merak ettin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Ertesi gün herkesin kazandığı paraları duyunca için gıcık oldu.",
        },
      },
    ],
  },
  {
    id: "komik_oc_soytari_yerine_gecme",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🃏",
    baslik: "Hasta Soytarının Yerine",
    metin:
      "Şölen için tutulan soytarı aniden hastalanınca, ev sahibi paniklemiş halde senden onun yerine geçmeni istiyor. Kalabalık zaten sıraya girmiş bekliyor.",
    secenekler: [
      {
        metin: "Kabul et, doğaçlama şakalar yap.",
        baseBasariSansi: 50,
        ipucu: "Tutarsa iyi bir gece; tutmazsa acı bir sessizlik",
        basariliSonuc: {
          un: 8,
          para: 8,
          mutluluk: 4,
          mesaj: "Doğaçlaman öyle tuttu ki herkes gerçek bir soytarı sandı seni; ev sahibi cömertçe ödedi.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -3,
          mesaj: "Şakaların sessizlikle karşılandı; ölü bir sessizlik odayı kapladı.",
        },
      },
      {
        metin: "Reddet, birini bulmalarına yardım et.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama fırsatı kaçırmış olursun",
        basariliSonuc: {
          dost_puani: 2,
          mesaj: "Başka bir eğlendiriciyi bulmalarına yardım ettin, herkes rahatladı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Kimse birini bulamadı, şölen biraz sönük geçti — ev sahibi sana kırgın baktı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_deniz_canavari_soylentisi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🐙",
    baslik: "Deniz Canavarı Söylentisi",
    metin:
      "Sahil köyünde herkes koydaki 'deniz canavarını' konuşuyor. Bazıları büyük bir balık, bazıları eski bir batık tekne olduğunu düşünüyor. Gidip bakmak mı, uzak durmak mı?",
    secenekler: [
      {
        metin: "Bir tekneyle koya git, gerçeği araştır.",
        baseBasariSansi: 60,
        ipucu: "Çözersen ün kazanırsın; başaramazsan ıslanmış bir hayal kırıklığı",
        basariliSonuc: {
          un: 7,
          mutluluk: 4,
          mesaj: "'Canavar' aslında karaya oturmuş dev bir balina gövdesiydi — köy sana teşekkür etti.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -2,
          mesaj: "Tekne devrildi, sırılsıklam ve elin boş döndün — 'canavarı' bulamadın.",
        },
      },
      {
        metin: "Söylentiye inan, uzak dur.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, gizemi çözemezsin",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Diğer köylüler gibi sen de uzak durdun, gizem gizem kaldı.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Çocuklar seni 'korkak' diye takıldı biraz.",
        },
      },
    ],
  },
  {
    id: "komik_oc_kilise_cani_sakasi",
    kategori: "din",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🔔",
    baslik: "Kilise Çanı Şakası",
    metin:
      "Arkadaşların gece yarısı kilisenin çanını çalıp herkesi telaşla uyandırma fikrini attı ortaya — 'sadece bir kere' diyorlar.",
    secenekler: [
      {
        metin: "Çanı çal, koş.",
        baseBasariSansi: 50,
        ipucu: "Kaçarsan efsane bir gece anısı; yakalanırsan ciddi bir azar",
        basariliSonuc: {
          mutluluk: 7,
          mesaj: "Bütün köy telaşla dışarı fırladı, siz bir çalıların arkasından kahkahalarla izlediniz.",
        },
        basarisizSonuc: {
          ahlak: -4,
          un: -4,
          suc_artis: 5,
          mesaj: "Papaz seni suçüstü yakaladı; günlerce kilise avlusunu temizledin.",
        },
      },
      {
        metin: "Vazgeç, arkadaşlarını da caydır.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, biraz 'sıkıcı' etiketi alırsın",
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Arkadaşların hayal kırıklığına uğradı ama kimse başını derde sokmadı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Arkadaşların sensiz de yaptı şakayı — sen dışarıda kaldın.",
        },
      },
    ],
  },
  {
    id: "komik_oc_haci_kilik_degistirme",
    kategori: "din",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 18,
    gorsel: "🕌",
    baslik: "Hacı Kılığına Girmek",
    metin:
      "Bir handa, hacı kıyafeti giyen yolculara ücretsiz yemek ve yatak verildiğini fark ettin. Cebinde para azken, kılığa girmek cazip bir fikir.",
    secenekler: [
      {
        metin: "Hacı kılığına gir, bedava konaklamayı dene.",
        baseBasariSansi: 55,
        ipucu: "İnandırırsan bedava karnın doyar; ortaya çıkarsa itibarın zedelenir",
        basariliSonuc: {
          para: 8,
          ahlak: -4,
          mesaj: "Han sahibi seni gerçek bir hacı sanıp ağırladı — karnın doydu, vicdanın hafif gıcıklandı.",
        },
        basarisizSonuc: {
          un: -6,
          ahlak: -3,
          mesaj: "Han sahibi seni sorguya çekince çuvalladın, herkesin önünde kapı dışarı edildin.",
        },
      },
      {
        metin: "Dürüstçe parasını öde.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, vicdanın rahat ama kese hafif",
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Az param olsa da dürüstçe ödedin, geceyi huzurla geçirdin.",
        },
        basarisizSonuc: {
          para: -2,
          mesaj: "Yeterli paran çıkmadı, biraz utanarak eksik ödedin.",
        },
      },
    ],
  },
  {
    id: "komik_oc_esek_pazarligi",
    kategori: "ticaret",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🫏",
    baslik: "Eşek Pazarlığı",
    metin:
      "Pazarda bir satıcı sana 'genç ve güçlü' diye bir eşek satmaya çalışıyor ama hayvanın gözlerinde tuhaf bir yorgunluk var. Alacak mısın, yoksa daha çok mu pazarlık edeceksin?",
    secenekler: [
      {
        metin: "Sıkı pazarlık et, fiyatı düşür.",
        baseBasariSansi: 60,
        ipucu: "Düşürürsen kazançlı çıkarsın; ısrar seni satıcıyla karşı karşıya getirebilir",
        basariliSonuc: {
          para: 6,
          mesaj: "Fiyatı yarı yarıya düşürdün, satıcı homurdanarak kabul etti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Satıcı sinirlenip pazarlığı kesti, eşeği başkasına sattı gözünün önünde.",
        },
      },
      {
        metin: "İstenen fiyatı öde, tartışma.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama pahalıya alırsın",
        basariliSonuc: {
          para: -10,
          mesaj: "Eşeği aldın ama üç gün sonra hiç de 'genç' olmadığı ortaya çıktı.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -2,
          mesaj: "Eşek daha handan çıkmadan yürümeyi reddetti — para cebinden gitti, eşek yerinde kaldı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_kokusu_cikan_peynir",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 14,
    gorsel: "🧀",
    baslik: "Aşırı Kokan Peynir Bahsi",
    metin:
      "Köyün en 'olgun' peyniri diye tanıtılan bir parça masaya kondu — kokusu odayı doldurmuş durumda. Bir dilim bitirene bir şişe şarap vaat ediliyor.",
    secenekler: [
      {
        metin: "Bir dilim ye, nefesini tut.",
        baseBasariSansi: 55,
        ipucu: "Yutarsan şarap kazanırsın; midenle didişirsin",
        basariliSonuc: {
          mutluluk: 5,
          para: 3,
          mesaj: "Zar zor yuttun ama şarabı kazandın, kalabalık alkışladı.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -3,
          mesaj: "Bir ısırıkta pes ettin, mideni bir süre toparlayamadın.",
        },
      },
      {
        metin: "Kibarca reddet.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, şarapsız",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Rahatça reddettin, herkes anlayışla karşıladı.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "'Nazlı' diye biraz takıldılar.",
        },
      },
    ],
  },
  {
    id: "komik_oc_yel_degirmeninde_mahsur",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 15,
    gorsel: "🌬️",
    baslik: "Yel Değirmeninde Mahsur",
    metin:
      "Meraktan girdiğin yel değirmeninin kanadı rüzgârla dönmeye başladı ve seni içeride sıkıştırdı. Kapıyı zorlamak mı, yardım bağırmak mı?",
    secenekler: [
      {
        metin: "Kanatların arasından sıyrılmayı dene.",
        baseBasariSansi: 55,
        ipucu: "Başarırsan hızlıca çıkarsın; olmazsa canını yakarsın",
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Tam zamanında sıyrıldın, tozlu ama sağlam çıktın.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Kanat omzuna hafifçe çarptı, birkaç gün acıyla dolaştın.",
        },
      },
      {
        metin: "Yardım için bağır, bekle.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama utanç verici",
        basariliSonuc: {
          un: -2,
          mesaj: "Değirmenci gelip kapıyı açtı; köyde 'değirmene sıkışan adam' diye tanınmaya başladın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kimse duymadı, rüzgâr durana kadar epey beklemek zorunda kaldın.",
        },
      },
    ],
  },
  {
    id: "komik_oc_soylu_papagan_taklidi",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🦜",
    baslik: "Soylunun Konuşan Kargası",
    metin:
      "Bir soylunun eğitilmiş kargası senin lakabını tekrarlayıp durarak herkesi güldürüyor. Kargaya bir şeyler öğretip işi daha da büyütmek mi, sessizce uzaklaşmak mı?",
    secenekler: [
      {
        metin: "Kargaya yeni, daha komik bir şey öğret.",
        baseBasariSansi: 60,
        ipucu: "Tutarsa herkes seni sever; tutmazsa soylu kızar",
        basariliSonuc: {
          mutluluk: 6,
          un: 4,
          mesaj: "Karga yeni cümleyi kapıp herkesi güldürdü, soylu bile gülmekten kendini alamadı.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Karga öğrettiğin şeyi yanlış zamanda söyledi — tam soylunun misafirlerinin önünde.",
        },
      },
      {
        metin: "Uzaklaş, karışma.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, sıradan",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Karga başka birinin lakabını tekrarlamaya başladı, sen rahatladın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Karga senin lakabını bağırmaya devam etti, uzaklaşman işe yaramadı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_kutsal_emanet_taklidi",
    kategori: "din",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.2,
    minYas: 18,
    gorsel: "☦️",
    baslik: "Sahte Kutsal Emanet Teklifi",
    metin:
      "Bir tüccar sana sıradan bir kemik parçasını 'azizin parmak kemiği' diye satıp, sonra sen de bunu köyün zenginine satasın diye ortaklık teklif ediyor.",
    secenekler: [
      {
        metin: "Teklifi kabul et, kemiği satmaya çalış.",
        baseBasariSansi: 50,
        ipucu: "İnandırırsan büyük para; ortaya çıkarsa ağır itibar kaybı",
        basariliSonuc: {
          para: 18,
          ahlak: -8,
          mesaj: "Zengin köylü kemiği büyük bir törenle satın aldı — vicdanın ağırlaştı ama kesen de.",
        },
        basarisizSonuc: {
          un: -8,
          ahlak: -4,
          suc_artis: 8,
          mesaj: "Bir keşiş kemiği inceleyip sahteliğini anladı; köy meydanında rezil oldun.",
        },
      },
      {
        metin: "Teklifi reddet, tüccarı ihbar et.",
        baseBasariSansi: 75,
        ipucu: "Güvenli, dürüst ama tüccarla husumetin başlar",
        basariliSonuc: {
          ahlak: 4,
          un: 3,
          mesaj: "Tüccar köyden kovuldu, sana dürüstlüğünle övgüler yağdı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Kimse seni pek dinlemedi, tüccar başka bir köyde işine devam etti.",
        },
      },
    ],
  },
  {
    id: "komik_oc_kutsal_relik_kuyrugu",
    kategori: "din",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "⛪",
    baslik: "Uzun Emanet Kuyruğu",
    metin:
      "Kutsal bir emaneti görmek için saatlerdir kuyrukta bekliyorsun. Önündeki adam yerini kaptırmamak için sürekli itişip kakışıyor.",
    secenekler: [
      {
        metin: "Öne geçmeye çalış, itiş kakışa gir.",
        baseBasariSansi: 55,
        ipucu: "Öne geçersen zaman kazanırsın; kavga çıkarsa dışarı atılırsın",
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Ustaca sıyrılıp öne geçtin, emaneti görecek ilk sıradasın artık.",
        },
        basarisizSonuc: {
          un: -3,
          mutluluk: -3,
          mesaj: "İtişme büyüdü, görevliler ikinizi de kuyruktan attı.",
        },
      },
      {
        metin: "Sabırla bekle, sırana gelsin.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama uzun ve sıkıcı",
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Saatler süren beklemeden sonra emaneti huzurla gördün.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sıra tam sana geldiğinde kapılar kapandı, ertesi güne kaldı.",
        },
      },
    ],
  },
  {
    id: "komik_oc_soytari_elbisesi_calinti",
    kategori: "sosyal",
    cag: "Orta Çağ",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "👘",
    baslik: "Çalınan Soytarı Elbisesi",
    metin:
      "Şakadan giydiğin rengârenk soytarı kıyafetiyle dolaşırken, gerçek saray soytarısı seni görüp 'kıyafetimi mi çaldın?' diye bağırmaya başladı — herkes izliyor.",
    secenekler: [
      {
        metin: "Şaka yaptığını söyleyip komik bir gösteri yap.",
        baseBasariSansi: 55,
        ipucu: "İkna edersen ikiniz de gülersiniz; edemezsen sahne kavgaya döner",
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 3,
          mesaj: "İkiniz birlikte doğaçlama bir gösteri yaptınız, kalabalık bayıldı.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Soytarı kıyafeti geri istedi, herkesin önünde soyunmak zorunda kaldın.",
        },
      },
      {
        metin: "Özür dile, kıyafeti hemen ver.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama biraz mahcup",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kıyafeti verdin, soytarı yatıştı, olay kapandı.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Kıyafeti çıkarırken beceriksizce takılıp düştün, kalabalık güldü.",
        },
      },
    ],
  },

  // ───────────────────────── SANAYİ DEVRİMİ (25) ─────────────────────────
  {
    id: "komik_sd_fabrika_hiz_bahsi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "⚙️",
    baslik: "Makineyle Yarış",
    metin:
      "Fabrikadaki işçiler yeni buhar makinesinin hızını bir insanın yenip yenemeyeceğini tartışıyor. Sıra sana geldi, herkes seni izliyor.",
    secenekler: [
      {
        metin: "Makineyle yarışa gir.",
        baseBasariSansi: 50,
        ipucu: "Kazanırsan efsane olursun; kaybedersen tükenmiş biter",
        basariliSonuc: {
          un: 9,
          para: 6,
          mesaj: "İnanılmaz — makineyi geçtin! Fabrika günlerce bunu konuştu.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -3,
          mesaj: "Makine seni fena geçti, kollarında günlerce süren bir ağrı bıraktı.",
        },
      },
      {
        metin: "Reddet, işine dön.",
        baseBasariSansi: 88,
        ipucu: "Güvenli, gösterişsiz",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "İşine döndün, makul bulundun.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Birkaç işçi seni 'ödlek' diye kışkırttı.",
        },
      },
    ],
  },
  {
    id: "komik_sd_balon_ucusu",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🎈",
    baslik: "Sıcak Hava Balonu Teklifi",
    metin:
      "Gezici bir mucit, yeni icadı sıcak hava balonuyla kısa bir uçuşa çıkmanı teklif ediyor — 'tamamen güvenli' diyor ama sesi pek emin gelmiyor.",
    secenekler: [
      {
        metin: "Bineyle uçuşu dene.",
        baseBasariSansi: 55,
        ipucu: "İyi giderse unutulmaz bir anı; kötü giderse sarsıcı bir iniş",
        basariliSonuc: {
          un: 9,
          mutluluk: 8,
          mesaj: "Şehri kuşbakışı gördün! Yere indiğinde herkes seni 'gökyüzü gezgini' diye karşıladı.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -3,
          mesaj: "Balon aniden alçaldı, sepet bir çatıya sürtünerek sert indi.",
        },
      },
      {
        metin: "Teklifi kibarca reddet.",
        baseBasariSansi: 88,
        ipucu: "Güvenli, gökyüzünü kaçırırsın",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Yerde kalmayı tercih ettin, mucit başka birini buldu.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Uçuşu izlerken içinde bir pişmanlık kaldı.",
        },
      },
    ],
  },
  {
    id: "komik_sd_foto_studyosu_pozu",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 14,
    gorsel: "📷",
    baslik: "Yeni Fotoğraf Makinesi",
    metin:
      "Şehre yeni gelen fotoğraf stüdyosunda ücretsiz deneme çekimi yapılıyor ama 'hareketsiz durmak' epey uzun sürüyor — bir kımıldama tüm fotoğrafı bulanıklaştırır.",
    secenekler: [
      {
        metin: "Ciddi bir poz ver, kıpırdama.",
        baseBasariSansi: 60,
        ipucu: "Başarırsan güzel bir hatıra; kıpırdarsan gülünç bir fotoğraf çıkar",
        basariliSonuc: {
          mutluluk: 5,
          un: 3,
          mesaj: "Muhteşem bir fotoğraf çıktı, çerçeveletip evine astın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          para: -2,
          mesaj: "Tam anında kaşındın, fotoğrafta bulanık bir hayalet gibi göründün — parayı da geri alamadın.",
        },
      },
      {
        metin: "Komik bir yüz ifadesiyle poz ver.",
        baseBasariSansi: 55,
        ipucu: "Tutarsa herkesi güldürür; tutmazsa fotoğrafçı kızar",
        basariliSonuc: {
          mutluluk: 6,
          mesaj: "Fotoğrafçı bile gülmekten kendini alamadı, fotoğrafı vitrinine astı.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Fotoğrafçı 'ciddi bir sanat' dediği işini mahvettiğini söyleyip senden ek ücret istedi.",
        },
      },
    ],
  },
  {
    id: "komik_sd_tren_at_arabasi_yarisi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 17,
    gorsel: "🚂",
    baslik: "Tren mi, At Arabası mı?",
    metin:
      "İstasyonda biri, at arabasının yeni trenden hızlı gidebileceğine dair kalın bir bahse girdi. Sen de bir tarafa küçük bir bahis koyabilirsin.",
    secenekler: [
      {
        metin: "Trenin kazanacağına bahis koy.",
        baseBasariSansi: 65,
        ipucu: "Mantıklı bahis ama garanti değil",
        basariliSonuc: {
          para: 8,
          mesaj: "Tren rahatça kazandı, bahsi cebine attın.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Tren yolda arızalandı, at arabası kahkahalarla önden geçti.",
        },
      },
      {
        metin: "At arabasına bahis koy, 'yeniliğe güvenme'.",
        baseBasariSansi: 40,
        ipucu: "Düşük ihtimal ama kazanırsan iyi para",
        basariliSonuc: {
          para: 16,
          mesaj: "Tren gerçekten arızalandı! Herkes şaşkın, sen kazançlı çıktın.",
        },
        basarisizSonuc: {
          para: -6,
          un: -2,
          mesaj: "Tren rahatça kazandı, 'eski kafalı' diye takıldılar biraz sana.",
        },
      },
    ],
  },
  {
    id: "komik_sd_sirk_gosterisi_daveti",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 15,
    gorsel: "🎪",
    baslik: "Gezici Sirk Daveti",
    metin:
      "Şehre gelen gezici sirkin sahibi, gösterisinde bir gönüllüye ihtiyacı olduğunu söyleyip seni sahneye çağırdı — ateş yutma numarasına yardımcı olacaksın.",
    secenekler: [
      {
        metin: "Sahneye çık, gösteriye yardım et.",
        baseBasariSansi: 55,
        ipucu: "İyi giderse alkış; kötü giderse ufak bir yanık",
        basariliSonuc: {
          un: 7,
          mutluluk: 5,
          mesaj: "Numara kusursuz gitti, kalabalık ayakta alkışladı.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -2,
          mesaj: "Bir kıvılcım koluna sıçradı, gösteri yarıda kesildi.",
        },
      },
      {
        metin: "Nazikçe reddet, izleyici kal.",
        baseBasariSansi: 88,
        ipucu: "Güvenli, sıradan bir gece",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Sirk sahibi başka birini buldu, sen keyifle izledin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Biraz 'ödlek' diye takıldılar sana.",
        },
      },
    ],
  },
  {
    id: "komik_sd_gazeteye_yalan_haber",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    gorsel: "📰",
    baslik: "Gazeteye Abartılı Haber",
    metin:
      "Yerel gazetenin muhabiri senden çarpıcı bir hikâye istiyor. Gerçek hikâyen sıradan ama biraz abartsan manşetlik olur.",
    secenekler: [
      {
        metin: "Hikâyeyi süsle, manşet ol.",
        baseBasariSansi: 55,
        ipucu: "Tutarsa şöhret; ortaya çıkarsa güvenilirlik kaybı",
        basariliSonuc: {
          un: 9,
          para: 4,
          mesaj: "Haber manşet oldu, herkes senden bahsediyor — küçük bir de yazar ücreti aldın.",
        },
        basarisizSonuc: {
          ahlak: -4,
          un: -6,
          mesaj: "Bir okuyucu hikâyenin asılsız olduğunu ispatladı, gazete özür diledi — sen rezil oldun.",
        },
      },
      {
        metin: "Gerçek, sıradan hikâyeni anlat.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, dürüst ama sıkıcı bir haber",
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Haber küçük bir köşede yer aldı, kimse fazla ilgilenmedi ama dürüsttün.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Muhabir hikâyeni 'sıkıcı' bulup hiç basmadı.",
        },
      },
    ],
  },
  {
    id: "komik_sd_muzikli_kutu_denemesi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 14,
    gorsel: "🎶",
    baslik: "Yeni Müzikli Kutu",
    metin:
      "Bir vitrin dükkânında yeni icat müzikli kutu (gramofonun atası) sergileniyor. Dükkân sahibi seni kolu çevirip denemen için davet ediyor — kalabalık toplanmış izliyor.",
    secenekler: [
      {
        metin: "Kolu çevir, dans et.",
        baseBasariSansi: 60,
        ipucu: "Tutarsa eğlenceli bir an; tutmazsa kolu kırarsın",
        basariliSonuc: {
          mutluluk: 6,
          un: 3,
          mesaj: "Müzik akınca kendini kaptırdın, birkaç kişi seninle dans etmeye başladı.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Kolu fazla sert çevirince mekanizma bozuldu, dükkân sahibine tazminat ödedin.",
        },
      },
      {
        metin: "Uzaktan izle, dokunma.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, sıradan",
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Müziği keyifle dinledin, kimseye zararın dokunmadı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Dükkân sahibi 'denemeyecek misin' diye üstüne geldi, biraz sıkıldın.",
        },
      },
    ],
  },
  {
    id: "komik_sd_sahte_grev_sakasi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.2,
    minYas: 18,
    gorsel: "✊",
    baslik: "Sahte Grev Şakası",
    metin:
      "İş arkadaşların, patronu korkutmak için 'toplu grev başlıyor' diye şaka yapmayı öneriyor — sadece birkaç dakikalık bir kargaşa çıkarmak için.",
    secenekler: [
      {
        metin: "Şakaya katıl, herkesle bağır çağır.",
        baseBasariSansi: 50,
        ipucu: "Eğlenceli bir anı ya da patronla ciddi bir gerginlik",
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 3,
          mesaj: "Patron önce panikledi, sonra şaka olduğunu anlayınca gülmekten kırıldı.",
        },
        basarisizSonuc: {
          un: -5,
          suc_artis: 4,
          mesaj: "Patron şakayı ciddiye alıp gerçek bir soruşturma başlattı, adın kara listeye yazıldı.",
        },
      },
      {
        metin: "Katılma, işine bak.",
        baseBasariSansi: 88,
        ipucu: "Güvenli, eğlenceden mahrum",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kenarda kaldın, olay kısa sürede kapandı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "İş arkadaşların 'tatsız' diye takıldı biraz.",
        },
      },
    ],
  },
  {
    id: "komik_sd_telgraf_yanlisligi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 17,
    gorsel: "⚡",
    baslik: "Telgraf Yanlışlığı",
    metin:
      "Telgraf memuru mesajını yanlış aktardı — karşı taraf artık senden hiç kastetmediğin bir şey bekliyor. Düzeltmek mi, olduğu gibi bırakmak mı?",
    secenekler: [
      {
        metin: "Yeni bir telgrafla durumu düzelt.",
        baseBasariSansi: 65,
        ipucu: "Ek masraf ama işler yoluna girer",
        basariliSonuc: {
          para: -3,
          mutluluk: 2,
          mesaj: "Karışıklığı düzelttin, karşı taraf anlayışla karşıladı — biraz masrafı oldu.",
        },
        basarisizSonuc: {
          para: -5,
          mutluluk: -2,
          mesaj: "İkinci telgraf da yanlış gitti, işler daha da karıştı.",
        },
      },
      {
        metin: "Bırak öyle kalsın, ne olacağını gör.",
        baseBasariSansi: 45,
        ipucu: "Şansına bağlı — iyi de kötü de sonuçlanabilir",
        basariliSonuc: {
          para: 8,
          mesaj: "Yanlış anlaşılma tesadüfen senin lehine sonuçlandı, beklenmedik bir kazanç geldi.",
        },
        basarisizSonuc: {
          para: -8,
          un: -3,
          mesaj: "Karşı taraf iş yapmayı reddetti, ortalıkta 'güvenilmez' diye konuşulmaya başladın.",
        },
      },
    ],
  },
  {
    id: "komik_sd_lokomotif_iskele_pozu",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🚉",
    baslik: "Lokomotifin Önünde Poz",
    metin:
      "İstasyondaki arkadaşların, duran devasa lokomotifin hemen önünde 'cesur bir poz' vermeni istiyor — tam da tren kalkmak üzereyken.",
    secenekler: [
      {
        metin: "Öne geç, cesurca poz ver.",
        baseBasariSansi: 55,
        ipucu: "İyi çıkarsa efsane bir fotoğraf; kötü giderse tehlikeli bir koşu",
        basariliSonuc: {
          un: 6,
          mutluluk: 5,
          mesaj: "Tam tren düdüğü çalarken çekilen fotoğraf efsane oldu, herkes kopyasını istedi.",
        },
        basarisizSonuc: {
          saglik: -5,
          mutluluk: -3,
          mesaj: "Tren beklenenden erken kalktı, son anda kendini kenara attın — kalbin küt küt attı.",
        },
      },
      {
        metin: "Güvenli mesafeden poz ver.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama sıradan bir fotoğraf",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Sıradan ama güvenli bir hatıra fotoğrafı oldu.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Arkadaşların 'ödlek' diye biraz dalga geçti.",
        },
      },
    ],
  },
  {
    id: "komik_sd_sokak_satici_taklidi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 15,
    gorsel: "📢",
    baslik: "Sokak Satıcısı Taklidi",
    metin:
      "Eğlence olsun diye bir sokak satıcısının abartılı bağırış tarzını taklit etmeye başladın — birkaç meraklı gerçekten mal almak için etrafını sardı.",
    secenekler: [
      {
        metin: "Rolü sürdür, elindeki ıvır zıvırı 'sat'.",
        baseBasariSansi: 55,
        ipucu: "İyi gidersen gerçek para kazanırsın; anlaşılırsa mahcup olursun",
        basariliSonuc: {
          para: 8,
          mutluluk: 4,
          mesaj: "Şaka gerçek bir satışa dönüştü, cebine beklenmedik bir para girdi.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Gerçek satıcı gelip seni azarladı, müşteriler dağıldı.",
        },
      },
      {
        metin: "Şakayı bitir, özür dile.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, kazançsız",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Herkes güldü, sen de utanarak ama zararsızca sıyrıldın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Birkaç müşteri kandırıldığını düşünüp kızdı.",
        },
      },
    ],
  },
  {
    id: "komik_sd_bisiklet_yarisi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 15,
    gorsel: "🚲",
    baslik: "Yeni İcat Bisiklet Yarışı",
    metin:
      "Şehre yeni gelen 'demir at' denen bisikletlerle küçük bir yarış düzenleniyor. Hiç binmemiş olsan da heyecana kapılıyorsun.",
    secenekler: [
      {
        metin: "Bisiklete atla, yarışa katıl.",
        baseBasariSansi: 50,
        ipucu: "Kazanırsan şöhret; düşersen morarırsın",
        basariliSonuc: {
          un: 8,
          para: 5,
          mesaj: "Düşe kalka da olsa bitiş çizgisine ilk sen ulaştın!",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -3,
          mesaj: "Dengeyi hiç kuramadın, üç kez düştün — dizlerin haftalarca acıdı.",
        },
      },
      {
        metin: "Kenardan izle, bahis oyna.",
        baseBasariSansi: 60,
        ipucu: "Daha güvenli ama heyecan azalır",
        basariliSonuc: {
          para: 5,
          mesaj: "Doğru sürücüye bahis koydun, ufak bir kâr elde ettin.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Bahsi kaybettin, en azından dizlerinden değil cebinden.",
        },
      },
    ],
  },
  {
    id: "komik_sd_muzedeki_heykel_taklidi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 14,
    gorsel: "🏛️",
    baslik: "Müzedeki Heykel Taklidi",
    metin:
      "Yeni açılan müzedeki ünlü bir heykelin pozunu taklit edip arkadaşlarını güldürmek istiyorsun — ama görevli seni izliyor gibi.",
    secenekler: [
      {
        metin: "Kaideye çık, pozu taklit et.",
        baseBasariSansi: 55,
        ipucu: "Görevli görmezse eğlenceli bir anı; görürse azar işitirsin",
        basariliSonuc: {
          mutluluk: 6,
          mesaj: "Arkadaşların gülmekten kırıldı, görevli fark etmedi bile.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Görevli seni kaideden indirip herkesin önünde uyardı.",
        },
      },
      {
        metin: "Vazgeç, sadece bak.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, sıradan bir müze gezisi",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Heykelleri sakince gezdin, kimseyi güldüremedin ama başın da derde girmedi.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Arkadaşların 'sıkıcı' diye takıldı biraz.",
        },
      },
    ],
  },
  {
    id: "komik_sd_elektrik_deneyi_gonulluluk",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 17,
    gorsel: "🔌",
    baslik: "Elektrik Deneyi Gönüllüsü",
    metin:
      "Meydanda bir bilim meraklısı yeni elektrik deneyini gösteriyor: 'Elini şu tele değdiren, saçının nasıl diken diken olduğunu görecek!' Gönüllü arıyor.",
    secenekler: [
      {
        metin: "Gönüllü ol, eline değdir.",
        baseBasariSansi: 65,
        ipucu: "Zararsız bir şok; hafif ama komik bir sarsıntı",
        basariliSonuc: {
          mutluluk: 6,
          un: 4,
          mesaj: "Saçların gerçekten diken diken oldu, kalabalık kahkahalarla alkışladı.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -2,
          mesaj: "Beklenenden güçlü bir şok aldın, elin bir süre uyuştu.",
        },
      },
      {
        metin: "Uzaktan izle.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, deneyimsiz kalırsın",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Deneyi güvenle izledin, merakını giderdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "'Korkak' diye biraz takıldılar.",
        },
      },
    ],
  },
  {
    id: "komik_sd_dans_salonu_yanlis_adim",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 16,
    gorsel: "🕺",
    baslik: "Dans Salonunda Yanlış Adım",
    metin:
      "Şık bir dans salonunda yeni moda bir dansı denemeye kalktın ama adımları hiç bilmiyorsun. Herkes izlerken devam mı etmeli, oturmalı mısın?",
    secenekler: [
      {
        metin: "Israrla devam et, doğaçlama yap.",
        baseBasariSansi: 55,
        ipucu: "Tutturursan sosyete seni sever; tutturamazsan rezil olursun",
        basariliSonuc: {
          mutluluk: 6,
          un: 5,
          mesaj: "Doğaçlama adımların yeni bir 'moda' sanıldı, birkaç kişi seni taklit etti bile.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -3,
          mesaj: "Ayakların birbirine dolandı, partnerinin ayağına bastın — salon senin adını fısıldadı.",
        },
      },
      {
        metin: "Kenara çekil, sadece izle.",
        baseBasariSansi: 88,
        ipucu: "Güvenli, sosyeteden biraz kopuk kalırsın",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kenardan keyifle izledin, kimse sana bir şey demedi.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Birkaç kişi 'neden dans etmiyorsun' diye ısrarla sordu, biraz sıkıldın.",
        },
      },
    ],
  },
  {
    id: "komik_sd_polis_kiyafeti_sakasi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.2,
    minYas: 18,
    gorsel: "👮",
    baslik: "Ödünç Polis Kıyafeti",
    metin:
      "Bir kostüm balosu için ödünç aldığın polis kıyafetiyle sokakta dolaşırken, gerçek bir kalabalık seni ciddiye alıp yardım istemeye başladı.",
    secenekler: [
      {
        metin: "Rolü oyna, 'yardım' etmeye çalış.",
        baseBasariSansi: 50,
        ipucu: "İyi idare edersen komik bir anı; edemezsen gerçek polisle karşı karşıya kalırsın",
        basariliSonuc: {
          mutluluk: 6,
          un: 3,
          mesaj: "Basit bir anlaşmazlığı 'çözdün', kalabalık teşekkür etti — kimse gerçeği anlamadı.",
        },
        basarisizSonuc: {
          suc_artis: 8,
          un: -5,
          mesaj: "Gerçek bir polis olay yerine geldi, seni sahte kıyafetle yakaladı.",
        },
      },
      {
        metin: "Hemen kıyafeti çıkar, sıvış.",
        baseBasariSansi: 80,
        ipucu: "Güvenli ama komik anı da kaçar",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kalabalıktan sıyrılıp kıyafeti çantana tıktın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kıyafeti çıkarırken düğmeler koptu, biraz garip göründün.",
        },
      },
    ],
  },
  {
    id: "komik_sd_abartili_reklam_afisi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 17,
    gorsel: "🖼️",
    baslik: "Abartılı Reklam Afişi",
    metin:
      "Kendi hizmetini tanıtmak için astırdığın afişte biraz fazla abartmışsın — 'şehrin en iyisi' gibi cümleler dikkat çekiyor ama herkesi ikna etmiyor.",
    secenekler: [
      {
        metin: "Afişi öyle bırak, iddiayı savun.",
        baseBasariSansi: 55,
        ipucu: "İnandırırsan müşteri akını; ortaya çıkarsa güven kaybı",
        basariliSonuc: {
          para: 10,
          un: 3,
          mesaj: "Afiş dikkat çekti, meraklı müşteriler kapına dayandı.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -5,
          mesaj: "Bir müşteri hayal kırıklığına uğrayıp herkese şikâyet etti — 'abartı ustası' lakabı yapıştı.",
        },
      },
      {
        metin: "Afişi daha mütevazı bir dille değiştir.",
        baseBasariSansi: 85,
        ipucu: "Güvenli, dürüst ama daha az çekici",
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Daha az müşteri geldi ama gelenler memnun ayrıldı.",
        },
        basarisizSonuc: {
          para: -2,
          mesaj: "Afiş değişikliği için ödediğin ücret boşa gitti, kimse fazla ilgilenmedi.",
        },
      },
    ],
  },
  {
    id: "komik_sd_maskeli_balo_karisikligi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    gorsel: "🎭",
    baslik: "Maskeli Baloda Yanlış Kişi",
    metin:
      "Maskeli baloda biri seni başkasıyla karıştırıp uzun uzun samimi bir sohbete daldı. Yanlışlığı düzeltmek mi, oyunu sürdürmek mi?",
    secenekler: [
      {
        metin: "Oyunu sürdür, o kişiymiş gibi davran.",
        baseBasariSansi: 55,
        ipucu: "Eğlenceli bir gece ya da can sıkıcı bir ifşa",
        basariliSonuc: {
          mutluluk: 7,
          dost_puani: 3,
          mesaj: "Gece boyunca eğlenceli bir rol yaptın, sonunda ikiniz de gülerek gerçeği açıkladınız.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Kişi gerçek kimliğinin farkına vardı ve seni herkese 'sahtekâr' diye tanıttı.",
        },
      },
      {
        metin: "Hemen yanlışlığı düzelt.",
        baseBasariSansi: 85,
        ipucu: "Güvenli ama biraz garip bir an",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kişi mahcup oldu, kısa bir özürle olay kapandı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Kişi inanmadı, ısrarla eski sohbete devam etmeye çalıştı — biraz tuhaf oldu.",
        },
      },
    ],
  },
  {
    id: "komik_sd_yeni_icat_sunumu",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 18,
    gorsel: "🛠️",
    baslik: "Tuhaf İcat Sunumu",
    metin:
      "Bir mucit, garip görünen bir aletin ('kendi kendine yelpazelenen şapka') tanıtımını yapmanı istiyor — komisyon karşılığında halka gösterecek misin?",
    secenekler: [
      {
        metin: "Sahneye çık, icadı coşkuyla tanıt.",
        baseBasariSansi: 50,
        ipucu: "İyi satarsan komisyon güzel; kötü giderse gülünç durursun",
        basariliSonuc: {
          para: 12,
          un: 4,
          mesaj: "İnsanlar alete gerçekten ilgi gösterdi, mucit komisyonunu cömertçe ödedi.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Alet sahne ortasında bozuldu, şapka doğrudan bir izleyicinin kafasına uçtu.",
        },
      },
      {
        metin: "Teklifi reddet.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, komisyonsuz",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Mucit başka birini buldu, sen olaya karışmadın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "İcat büyük ilgi görünce 'keşke kabul etseydim' diye düşündün.",
        },
      },
    ],
  },
  {
    id: "komik_sd_kagit_gemi_yarismasi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.25,
    minYas: 10,
    gorsel: "⛵",
    baslik: "Kâğıt Gemi Yarışması",
    metin:
      "Mahalledeki çocuklar nehir kenarında kâğıt gemi yarışması düzenliyor ve seni de aralarına katılmaya çağırıyor — büyük biri için biraz çocukça ama eğlenceli görünüyor.",
    secenekler: [
      {
        metin: "Katıl, en iyi kâğıt gemini yap.",
        baseBasariSansi: 60,
        ipucu: "Kazanırsan çocuklar seni kahraman ilan eder; kaybedersen sadece eğlenirsin",
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 3,
          mesaj: "Geminin akıntıyı ilk geçen oldu, çocuklar seni omuzlarına aldı.",
        },
        basarisizSonuc: {
          mutluluk: 2,
          mesaj: "Gemin batsa da çok eğlendin, çocuklarla kahkahalarla güldünüz.",
        },
      },
      {
        metin: "Reddet, 'büyüğüm ben' de.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama eğlenceyi kaçırırsın",
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Çocuklar hayal kırıklığına uğradı, sen ciddiyetini korudun ama biraz pişman oldun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Çocuklar 'kasıntı' diye takıldı, biraz canını sıktı.",
        },
      },
    ],
  },
  {
    id: "komik_sd_yeni_asansor_denemesi",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🛗",
    baslik: "Yeni İcat Asansör",
    metin:
      "Yeni inşa edilen binada, herkesin merak ettiği ama kimsenin cesaret edemediği yeni icat 'asansör' seni bekliyor. İlk deneyen olmak ister misin?",
    secenekler: [
      {
        metin: "İlk sen bin, dene.",
        baseBasariSansi: 65,
        ipucu: "Sorunsuz giderse ilk-deneyen ünvanı; arıza çıkarsa korkulu anlar",
        basariliSonuc: {
          un: 7,
          mutluluk: 5,
          mesaj: "Sorunsuzca yukarı çıktın, 'şehrin ilk asansöre binen kişisi' diye anıldın.",
        },
        basarisizSonuc: {
          saglik: -5,
          mutluluk: -4,
          mesaj: "Asansör ortada takılıp kaldı, seni yarım saat sonra zorlukla çıkardılar.",
        },
      },
      {
        metin: "Merdivenlerden çık, beklemeyi tercih et.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama yorucu",
        basariliSonuc: {
          saglik: 1,
          mesaj: "Merdivenlerden yorularak da olsa güvenle çıktın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "'Korkak' diye biraz takıldılar sana.",
        },
      },
    ],
  },
  {
    id: "komik_sd_terzi_yanlis_kiyafet",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 17,
    gorsel: "🧵",
    baslik: "Terzinin Yanlış Dikişi",
    metin:
      "Önemli bir davet için ısmarladığın kıyafet, terzi bir yanlışlık yapınca tuhaf, biraz gülünç bir kesimle geldi. Öyle mi giyeceksin, yoksa evde mi kalacaksın?",
    secenekler: [
      {
        metin: "Kıyafeti giy, davete öyle git.",
        baseBasariSansi: 55,
        ipucu: "Kendinden eminsen 'yeni moda' sanılırsın; değilsen alay konusu olursun",
        basariliSonuc: {
          un: 6,
          mutluluk: 4,
          mesaj: "Kendinden emin duruşun herkesi ikna etti — birkaç kişi 'yeni tarz' diye sordu bile.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -3,
          mesaj: "Herkes garip garip baktı, davet boyunca fısıltılar peşini bırakmadı.",
        },
      },
      {
        metin: "Eve dön, daveti kaçır.",
        baseBasariSansi: 88,
        ipucu: "Güvenli ama fırsatı kaçırırsın",
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Davetten önemli bir tanışıklık kaçırdığını sonradan öğrendin.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Terzi tazminat vermedi, hem daveti kaçırdın hem parayı.",
        },
      },
    ],
  },
  {
    id: "komik_sd_sirkten_kacan_hayvan",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 14,
    gorsel: "🦓",
    baslik: "Sirkten Kaçan Hayvan",
    metin:
      "Gezici sirkten kaçan tuhaf bir hayvan (belki bir zebra, belki sadece boyalı bir eşek) sokaklarda koşuşturuyor. Yakalamaya yardım eder misin?",
    secenekler: [
      {
        metin: "Peşinden koş, yakalamaya çalış.",
        baseBasariSansi: 55,
        ipucu: "Yakalarsan ödül ve şöhret; olmazsa daha çok kaos",
        basariliSonuc: {
          para: 10,
          un: 6,
          mesaj: "Hayvanı bir köşeye sıkıştırıp yakaladın, sirk sahibi minnetle ödedi.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          saglik: -3,
          mesaj: "Hayvan seni sürükleyip bir su birikintisine düşürdü, kaçış devam etti.",
        },
      },
      {
        metin: "Kenardan izle, karışma.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama sıkıcı",
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Kaosu keyifle izledin, başkaları hayvanı yakaladı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Hayvan tam yanından geçerken üstüne çamur sıçrattı.",
        },
      },
    ],
  },
  {
    id: "komik_sd_mucize_makine_satisi",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.2,
    minYas: 18,
    gorsel: "🧰",
    baslik: "Sahte Mucize Makine",
    metin:
      "Bir dolandırıcı sana 'her derde deva' diye tanıttığı gürültülü bir makineyi satmayı öneriyor — sen de bunu başkasına satarak aradaki farktan kazanmayı düşünüyorsun.",
    secenekler: [
      {
        metin: "Makineyi al, başkasına 'mucize' diye sat.",
        baseBasariSansi: 50,
        ipucu: "İnandırırsan kolay para; ortaya çıkarsa itibar lekesi",
        basariliSonuc: {
          para: 16,
          ahlak: -7,
          mesaj: "Saf bir alıcı makineyi ikiye katlanmış fiyata aldı — kesen doldu, vicdanın gıcıklandı.",
        },
        basarisizSonuc: {
          un: -7,
          ahlak: -3,
          suc_artis: 6,
          mesaj: "Makine ilk çalıştırmada infilak edercesine bozuldu, alıcı seni her yerde şikâyet etti.",
        },
      },
      {
        metin: "Teklifi reddet, dolandırıcıyı uyar.",
        baseBasariSansi: 80,
        ipucu: "Güvenli, dürüst ama kazançsız",
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Dolandırıcı vazgeçmedi ama sen vicdanınla huzurlu ayrıldın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Dolandırıcı seni 'zevksiz' diye küçümsedi, canını biraz sıktı.",
        },
      },
    ],
  },
  {
    id: "komik_sd_fabrika_dumaninda_isim_yazma",
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    ton: "hafif",
    agirlik: 0.22,
    minYas: 16,
    gorsel: "🏭",
    baslik: "Baca Dumanına İsim Yazma Bahsi",
    metin:
      "Genç işçiler, fabrika bacasından çıkan dumanın şekliyle 'gökyüzüne isim yazılabileceğine' dair saçma bir teoriyi tartışıyor — birileri seni bunu kanıtlamakla görevlendirdi, damperle oynayarak.",
    secenekler: [
      {
        metin: "Damperle oyna, dumana şekil vermeyi dene.",
        baseBasariSansi: 50,
        ipucu: "Tutarsa efsane bir 'icat'; ustabaşı görürse ciddi bir azar",
        basariliSonuc: {
          un: 6,
          mutluluk: 5,
          mesaj: "Duman gerçekten tuhaf bir şekle büründü, herkes 'gökyüzü ressamı' diye seni alkışladı.",
        },
        basarisizSonuc: {
          para: -6,
          un: -3,
          mesaj: "Damperi yanlış ayarlayınca makine tıkandı, ustabaşı tamirat parasını senden kesti.",
        },
      },
      {
        metin: "Teoriye gülüp işine dön.",
        baseBasariSansi: 88,
        ipucu: "Güvenli, sıradan bir vardiya",
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "İşine döndün, teori havada asılı kaldı.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "'Hayal gücün yok' diye biraz takıldılar.",
        },
      },
    ],
  },
];
