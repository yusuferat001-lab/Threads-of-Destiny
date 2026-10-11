import type { OlayTanimi } from "./types";

export const OLAY_ILISKILER: OlayTanimi[] = [
  {
    id: "iliski_ikinci_teklif",
    kategori: "sosyal",
    gerekliEtiketler: [
      "iliski_ikinci_teklif_zamani",
    ],
    yasakliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "💐",
    baslik: "Beklenen Aşk",
    metin: "Yıllarca yalnız kaldıktan sonra pazarda çarpıştığın sıradan biri... Zengin değil, nüfuzlu değil ama kalbin ilk kez bu kadar hızlı atıyor.",
    secenekler: [
      {
        metin: "Kalbinin peşinden git, evlen.",
        baseBasariSansi: 80,
        basariliSonuc: {
          es_ata: true,
          es_puani: 15,
          mutluluk: 12,
          etiket_ekle: [
            "medeni:evli",
            "itibar:fakir_ama_mutlu",
            "evlilik_yolu:ask",
          ],
          etiket_sil: [
            "iliski_ikinci_teklif_zamani",
          ],
          mesaj: "Sade bir törenle evlendiniz. Sofrada kuru ekmek var ama onunla ziyafet gibi.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          etiket_sil: [
            "iliski_ikinci_teklif_zamani",
          ],
          mesaj: "Aşkına karşılık bulamadın. O başka şehirde yaşamayı seçip kalbini kırdı.",
        },
      },
      {
        metin: "Aşk doyurmaz, yalnız kalayım.",
        baseBasariSansi: 90,
        basariliSonuc: {
          para: 5,
          etiket_sil: [
            "iliski_ikinci_teklif_zamani",
          ],
          mesaj: "Mantığı seçtin. Kasan dolar belki ama o gözler ömür boyu aklından çıkmaz.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          etiket_sil: [
            "iliski_ikinci_teklif_zamani",
          ],
          mesaj: "Mantığı seçtin ama acı çekiyorsun.",
        },
      },
    ],
  },
  {
    id: "iliski_ev_ici_kavga",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "😤",
    baslik: "Kırılan Vazo",
    metin: "{es} ile para derdinden (ya da ilgisizliğinden) çıkan tartışma büyüdü. Elindeki vazoyu yere fırlatıp bağırıyor.",
    secenekler: [
      {
        metin: "Sert çık, otoriteni koru.",
        baseBasariSansi: 55,
        basariliSonuc: {
          es_puani: -10,
          un: 5,
          mesaj: "Sesini daha çok yükselttin; sustu, odadan çıktı. Kazandın ama evlilik yara aldı.",
        },
        basarisizSonuc: {
          es_puani: -25,
          mutluluk: -15,
          durum_ekle: {
            id: "evlilik_tehlikede",
            ad: "Boşanma Eşiği",
            tur: "gecici",
            kalan_tur: 3,
            tur_basi_mutluluk: -5,
          },
          mesaj: "Sözlerin o kadar kırıcıydı ki {es} eşyalarını toplamaya başladı. Uçurumdasınız.",
        },
      },
      {
        metin: "Kırıkları topla, sarıl, yatıştır.",
        baseBasariSansi: 75,
        basariliSonuc: {
          es_puani: 20,
          ahlak: 10,
          mesaj: "Karşılık vermeyip kırıkları topladın. O da ağlayarak yardım etti. Fırtına dindi.",
        },
        basarisizSonuc: {
          es_puani: -5,
          mutluluk: -8,
          mesaj: "Sarılmak istedin, itti. Öfkesinin dinmesi için zamana ihtiyacı var.",
        },
      },
    ],
  },
  {
    id: "iliski_es_gizli_talep",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    minEsPuani: 35,
    gorsel: "🤫",
    baslik: "Eşin Tehlikeli Sırrı",
    metin: "{es} yemekten sonra kapıları kilitledi. Titreyerek tefeciye büyük kumar borcu olduğunu, ödemezse canının tehlikede olduğunu itiraf etti.",
    secenekler: [
      {
        metin: "Sormadan borcu kapat.",
        baseBasariSansi: 90,
        maliyet: 40,
        basariliSonuc: {
          para: -40,
          es_puani: 35,
          etiket_ekle: [
            "itibar:esi_icin_feda_eden",
          ],
          mesaj: "Tüm birikimini tefeciye verip onu kurtardın. {es} ömür boyu sana sadık kalacak.",
        },
        basarisizSonuc: {
          para: -40,
          es_puani: 10,
          mesaj: "Parayı verdin ama tefeciler faizi bahane edip kapınızı aşındırmayı sürdürdü.",
        },
      },
      {
        metin: "Senin suçun, kendi çaresine bak.",
        baseBasariSansi: 60,
        basariliSonuc: {
          es_puani: -30,
          ahlak: -15,
          mesaj: "Paranı korudun. {es} günlerce yoktu; borcu nasıl ödediğini sormaya korkuyorsun.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -25,
          un: -20,
          mesaj: "Tefeciler {es}'i sokakta dövdü; hastanede öldü. Herkes cimriliğini konuşuyor.",
        },
      },
    ],
  },
  {
    id: "iliski_bosanma_esigi",
    kategori: "sosyal",
    ton: "agir",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    maxEsPuani: 35,
    agirlik: 0.6,
    gorsel: "💔",
    baslik: "Kopuk İpler",
    metin: "Evdeki sessizlik bıçak gibi. {es} ile bağlar koptu. Ya gururunu ve cüzdanını feda edip sürdüreceksin, ya ağır kararı vereceksin.",
    secenekler: [
      {
        metin: "Gururunu yut, her şeyi düzeltmeye çalış.",
        baseBasariSansi: 55,
        maliyet: 20,
        basariliSonuc: {
          para: -20,
          es_puani: 30,
          mutluluk: 5,
          mesaj: "Hediye, taviz, gözyaşı işe yaradı. Evlilik kurtuldu, iplerin kimde olduğu belli.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -20,
          para: -20,
          etiket_ekle: [
            "kalici:bosanmis",
          ],
          etiket_sil: [
            "evlilik_yolu:mantik_soylu",
            "evlilik_yolu:mantik_ticari",
            "evlilik_yolu:ask",
          ],
          mesaj: "Tüm çabana rağmen {es} evi terk etti. Hem paran gitti hem aile dağıldı.",
        },
      },
      {
        metin: "Bitsin, mahkemeye (kadıya) git.",
        baseBasariSansi: 90,
        basariliSonuc: {
          es_kaybet: true,
          mutluluk: -10,
          para: -30,
          etiket_ekle: [
            "kalici:bosanmis",
          ],
          etiket_sil: [
            "evlilik_yolu:mantik_soylu",
            "evlilik_yolu:mantik_ticari",
            "evlilik_yolu:ask",
          ],
          mesaj: "Ayrılık acıydı. Eşyalar bölüştü, cüzdan boşaldı ama boğucu sessizlik bitti.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -25,
          para: -40,
          ahlak: -5,
          etiket_ekle: [
            "kalici:bosanmis",
          ],
          etiket_sil: [
            "evlilik_yolu:mantik_soylu",
            "evlilik_yolu:mantik_ticari",
            "evlilik_yolu:ask",
          ],
          mesaj: "Dedikodu savaşına döndü. Adın lekelendi, servetinin yarısı mahkemede kaldı.",
        },
      },
    ],
  },
  {
    id: "iliski_es_hastalik",
    kategori: "saglik",
    ton: "agir",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    agirlik: 0.5,
    gorsel: "🕊️",
    baslik: "Ölümün Nefesi",
    metin: "{es} ağır hasta; yüzü kireç gibi, nefes almakta zorlanıyor. Uzaktan pahalı bir hekim kurtarabilir ama iflasa sürükleyebilir.",
    secenekler: [
      {
        metin: "Dükkânı sat, borca gir, hekimi getir!",
        baseBasariSansi: 60,
        maliyet: 40,
        basariliSonuc: {
          es_puani: 40,
          mutluluk: 8,
          para: -40,
          etiket_ekle: [
            "es_minnettar",
          ],
          mesaj: "Hekim tam zamanında yetişti! {es} ölümden döndü. Kasan boş ama evde bir can var.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          mutluluk: -30,
          saglik: -10,
          para: -40,
          etiket_ekle: [
            "kalici:dul",
            "kalici:es_acisi",
          ],
          mesaj: "Parayı su gibi akıttın ama yetmedi. {es} kollarında öldü. Ev buz gibi bir mezar.",
        },
      },
      {
        metin: "Param yok, kader ne yazdıysa.",
        baseBasariSansi: 25,
        basariliSonuc: {
          es_puani: 10,
          mesaj: "Mucize! {es} hastalığı kendi direnciyle yendi. Cimriliğin aranıza duvar ördü.",
        },
        basarisizSonuc: {
          es_kaybet: true,
          ahlak: -15,
          mutluluk: -30,
          etiket_ekle: [
            "kalici:dul",
            "vicdan_azabi",
          ],
          mesaj: "{es} acı içinde öldü. Cenazede herkes ne kadar 'tutumlu' olduğunu fısıldadı.",
        },
      },
    ],
  },
  {
    id: "rakip_ekip_teklifi",
    kategori: "siyaset",
    minYas: 18,
    minRakipPuani: 70,
    yasakliEtiketler: [
      "rakip:ekibe_katildi",
    ],
    gorsel: "🕊️",
    baslik: "Düşmanımın Kılıcı",
    metin: "Kanlı bıçaklı olduğun {rakip} gece kapına geldi, çaresiz. Ortak güçlü bir düşmanınız var: 'Beni almazsan ikimiz de yok oluruz.'",
    secenekler: [
      {
        metin: "Güvenmiyorum ama gücün lazım (İşe al).",
        baseBasariSansi: 65,
        maliyet: 40,
        basariliSonuc: {
          para: -40,
          rakip_puani: -50,
          etiket_ekle: [
            "rakip:ekibe_katildi",
          ],
          ekip_ekle: {
            rol: "Eski Rakip",
            tahminGenisligi: 30,
          },
          mesaj: "Eski düşmanın artık yardımcın. Sırtını dönerken ürperiyorsun, kılıcı senin için.",
        },
        basarisizSonuc: {
          para: -40,
          saglik: -20,
          mesaj: "Tuzaktı! Girer girmez saldırdı; muhafızlar zor kurtardı.",
        },
      },
      {
        metin: "Yılanla aynı çuvala girmem! Defol.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kapıyı suratına kapattın. Temkin seni hayatta tutar.",
        },
        basarisizSonuc: {
          rakip_puani: 15,
          un: -10,
          mesaj: "{rakip} ertesi gün ortak düşmana katılıp sonunu getirmeye yemin etti.",
        },
      },
    ],
  },
  {
    id: "genel_ikilem_dost",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "⚖️",
    baslik: "İki Dost Arasında",
    metin: "İki yakın dostun düşman: biri yıllardır yanında sadık ama fakir; öteki yeni tanıdığın, nüfuzlu ve faydalı. İkisi de taraf seçmeni istiyor.",
    secenekler: [
      {
        metin: "Eski, sadık dostunun yanında ol.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 22,
          saglik: 8,
          para: -12,
          un: -8,
          etiket_ekle: [
            "sadik_dost",
          ],
          mesaj: "Eski dostunun yanında durdun; o da ömrünce yanında durdu.",
          detay: "Hastalanınca başucundaki kapı kapatan değildi.",
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          ahlak: 18,
          mesaj: "Sadık kaldın ama dostun yenildi; ikiniz de zarar gördünüz.",
          detay: "Doğru taraf, kazanan taraf değil.",
        },
      },
      {
        metin: "Nüfuzlu yeni dostunun yanında ol.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 32,
          un: 18,
          ahlak: -25,
          maas_carpani: 1.15,
          mesaj: "Nüfuzlu dostun kazandı, seni de yükseltti.",
          detay: "Eski dostun mektubu hâlâ çekmecende.",
        },
        basarisizSonuc: {
          para: -18,
          un: -20,
          ahlak: -22,
          mesaj: "Nüfuzlu dostun yenildi ve seni tanımadığını söyledi.",
          detay: "Ne dostluk kaldı ne kariyer; yalnız seçimin.",
        },
      },
    ],
  },
  {
    id: "genel_eski_dost_ziyareti",
    kategori: "sosyal",
    agirlik: 0.4,
    gorsel: "🍷",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Çocukluk Arkadaşı",
    metin: "Yıllardır görmediğin bir çocukluk arkadaşın şehrine geldi. Hayatı çok değişmiş, eski günleri anmak istiyor.",
    secenekler: [
      {
        metin: "Vakit geçir, eski günleri an.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Güzel bir akşam geçirdiniz; dostluğunuz tazelendi.",
          detay: "Geçmişe kısa yolculuk bugüne iyi gelir.",
        },
        basarisizSonuc: {
          mesaj: "Aranızdaki fark o kadar büyümüş ki eski sohbet kurulamadı.",
          detay: "Bazı dostluklar yollarını ayırır.",
        },
      },
      {
        metin: "İşin yoğun, kısa kes.",
        baseBasariSansi: 95,
        basariliSonuc: {
          para: 5,
          mesaj: "İşine döndün; arkadaşın anlayışla ayrıldı.",
          detay: "Bir anıyı kaçırdın ama işin aksamadı.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mesaj: "Arkadaşın kırgın ayrıldı; bir daha haber alamadın.",
          detay: "Bazı fırsatlar geri gelmez.",
        },
      },
    ],
  },
  {
    id: "iliski_dost_zor_durumda",
    kategori: "sosyal",
    minYas: 16,
    gorsel: "🤝",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dostun Zor Durumda",
    metin: "{dost} kapına dayandı; borçları büyümüş, eli boş. Senden yardım istiyor ama bu kolay olmayacak.",
    secenekler: [
      {
        metin: "Parayı paylaş, {dost}'a yardım et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          para: -20,
          dost_puani: 20,
          ahlak: 15,
          mesaj: "{dost} gözleri dolu; bu yardımı asla unutmayacağını söyledi.",
          detay: "Zor günde yanında olmak dostluğun sınavıdır.",
        },
        basarisizSonuc: {
          para: -25,
          dost_puani: 5,
          mesaj: "Yardımın yetmedi ama {dost} çabanı takdir etti.",
          detay: "Az da olsa niyet önemlidir.",
        },
      },
      {
        metin: "Kendi işlerin zor, özür dile, çevir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: -20,
          mesaj: "{dost} anladığını söyledi ama hayal kırıklığı gizlenemedi.",
          detay: "Reddetmek mantıklı ama bedelsiz değil.",
        },
        basarisizSonuc: {
          dost_puani: -30,
          un: -10,
          ahlak: -10,
          mesaj: "{dost} reddi çevrede anlattı; bazıları seni soğuk ve bencil buldu.",
          detay: "Yüz çevirmek çok konuşulur.",
        },
      },
    ],
  },
  {
    id: "iliski_rakip_teklifi",
    kategori: "siyaset",
    minYas: 17,
    gorsel: "🃏",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rakibinin Teklifi",
    metin: "{rakip} seninle uzun süre çekişti, bugün ortaklık teklifiyle geldi. Samimi mi, tuzak mı, kestiremiyorsun.",
    secenekler: [
      {
        metin: "Kabul et, {rakip} ile güç birliği yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -11,
          un: -5,
          para: 35,
          rakip_puani: 30,
          mesaj: "Ortaklık işe yaradı; {rakip} ile gerginlik şaşırtıcı biçimde eridi.",
          detay: "En büyük rakip en güvenilir ortak olabilir.",
        },
        basarisizSonuc: {
          para: -25,
          rakip_puani: -25,
          un: -15,
          mesaj: "Tuzaktı. {rakip} seni kullanıp bıraktı. Paran ve itibarın yara aldı.",
          detay: "Rakibin elini sıkmadan önce iki kez düşünmeliydin.",
        },
      },
      {
        metin: "Reddet, mesafeni koru.",
        baseBasariSansi: 85,
        basariliSonuc: {
          rakip_puani: -10,
          mesaj: "{rakip} reddi soğukkanlı karşıladı ama aranız açıldı.",
          detay: "Temkin kayıptan da kazançtan da korudu.",
        },
        basarisizSonuc: {
          rakip_puani: -20,
          un: -10,
          mesaj: "{rakip} reddini çevrede 'korkaklık' diye anlattı.",
          detay: "Bazı rekabetler reddedilince kızışır.",
        },
      },
    ],
  },
  {
    id: "iliski_dostla_kavga",
    kategori: "sosyal",
    minYas: 18,
    gorsel: "💢",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dostunla Anlaşmazlık",
    metin: "{dost} ile küçük bir sözden büyüyen bir tartışma çıktı. Yıllık bir dostluğu bitirebilir.",
    secenekler: [
      {
        metin: "Gururunu bırak, önce sen barış yap.",
        baseBasariSansi: 75,
        basariliSonuc: {
          dost_puani: 25,
          ahlak: 10,
          mesaj: "{dost} uzattığın eli görünce gülümsedi; eski günlere döndünüz.",
          detay: "İlk adım atmak kazanmaktır.",
        },
        basarisizSonuc: {
          dost_puani: 5,
          mesaj: "Barış çabası beklediğin karşılığı bulmadı ama kapı kapanmadı.",
          detay: "Her özür hemen kabul görmez.",
        },
      },
      {
        metin: "İnat et, haklısın.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 7,
          dost_puani: -15,
          mesaj: "Haklıydın ama {dost} kabul etmek yerine uzaklaştı.",
          detay: "Haklı çıkmak en pahalı zafer olabilir.",
        },
        basarisizSonuc: {
          dost_puani: -30,
          mutluluk: -15,
          mesaj: "Tartışma büyüdü; {dost} artık eskisi gibi konuşmuyor.",
          detay: "Bazı sözler geri alınamaz.",
        },
      },
    ],
  },
  {
    id: "iliski_rakip_dedikodu",
    kategori: "sosyal",
    minYas: 17,
    gorsel: "🗣️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Rakibin Dedikodusu",
    metin: "{rakip}'in hakkında asılsız bir dedikodu yaydığını öğrendin; bazıları inanmaya başlamış bile.",
    secenekler: [
      {
        metin: "{rakip} ile yüzleş, gerçeği herkese söyle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 20,
          rakip_puani: -20,
          mesaj: "Yüzleşme işe yaradı; dedikodu söndü, haklı çıktın.",
          detay: "Gerçeği yüksek sesle söylemek en iyi savunma.",
        },
        basarisizSonuc: {
          un: -20,
          rakip_puani: -25,
          mesaj: "Yüzleşme çirkinleşti; dedikodu daha da yayıldı.",
          detay: "Bazı ateşler üstüne gidilince büyür.",
        },
      },
      {
        metin: "Görmezden gel, unutulur.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Dedikodu zamanla söndü; sinirlerini yormadın.",
          detay: "Her ateşe koşma; bazısı kendi söner.",
        },
        basarisizSonuc: {
          un: -15,
          mesaj: "Sessizliğin bazılarınca 'suçun kabulü' sayıldı.",
          detay: "Görmezden gelmek hep güvenli değil.",
        },
      },
    ],
  },
  {
    id: "tepki_es_iddiali_soz",
    kategori: "sosyal",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    gorsel: "💢",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ev İçi Bir Söz Düellosu",
    metin: "{es} ile bir konuda anlaşamadınız; tartışma büyüdü. Sıradaki söz geceyi ya onarır ya derinleştirir.",
    secenekler: [
      {
        metin: "Konuyu kapat: 'Sonra konuşuruz.'",
        baseBasariSansi: 85,
        basariliSonuc: {
          es_puani: -5,
          mesaj: "Tartışmayı erteledin; ev sustu ama mesele havada kaldı.",
          detay: "Ertelenen konu küçülmez, bekler.",
        },
        basarisizSonuc: {
          es_puani: -10,
          mutluluk: -8,
          mesaj: "'Sonra konuşuruz' dedin ama {es} bunu kaçış saydı.",
          detay: "Erteleme kaçış gibi duyulur.",
        },
      },
      {
        metin: "Geri alamayacağın sert bir söz söylemek üzeresin.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "Söz dilinin ucunda. {es}'in bakışı değişiyor.",
          geriCekilMetni: "Yut, sözünü yumuşat.",
          geriCekilSonucu: {
            es_puani: 5,
            mutluluk: -3,
            mesaj: "Sözünü yuttun; zordu ama {es} fark edip biraz yumuşadı.",
            detay: "En güçlü söz, söylenmeyendir.",
          },
          devamMetni: "Söyle. Artık durmaz.",
          devamSonucu: {
            es_puani: -25,
            ahlak: -10,
            mutluluk: -15,
            mesaj: "Söz çıktı, geri alınmadı. {es} sessizce odadan çıktı.",
            detay: "Bazı cümleler kalıcı çatlak bırakır.",
          },
        },
      },
    ],
  },
  {
    id: "tepki_dost_agir_soz",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "😤",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dostluğu Sınayan An",
    metin: "{dost} ile küçük bir yanlış anlaşılma büyüdü. Ağır bir söz yılların dostluğunu sarsabilir.",
    secenekler: [
      {
        metin: "Derin nefes al, konuyu yumuşat.",
        baseBasariSansi: 85,
        basariliSonuc: {
          dost_puani: 10,
          mesaj: "Sakin kaldın; {dost} takdir etti.",
          detay: "Bazı dostluklar sabırla ayakta kalır.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Yumuşatmaya çalıştın ama sesindeki gerginlik belli oldu.",
          detay: "Her iyi niyet aynı algılanmaz.",
        },
      },
      {
        metin: "Ağır bir söz söylemek üzeresin.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "{dost}'un yüzü değişiyor. Cümle dostluğu belirler.",
          geriCekilMetni: "Yut, konuyu değiştir.",
          geriCekilSonucu: {
            dost_puani: 5,
            mesaj: "Sözünü yuttun; {dost} bir şey sezdi ama üstüne gitmedi.",
            detay: "Bazı cümleler söylenmemeli.",
          },
          devamMetni: "Söyle. Dönüş yok.",
          devamSonucu: {
            dost_puani: -25,
            mutluluk: -10,
            mesaj: "Söz çıktı. {dost} sessizce uzaklaştı, aranıza mesafe girdi.",
            detay: "Bazı sözler dostluğu eskisi gibi bırakmaz.",
          },
        },
      },
    ],
  },
  {
    id: "tepki_rakip_meydan_okuma",
    kategori: "sosyal",
    agirlik: 0.6,
    gorsel: "😠",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Meydan Okuma Anı",
    metin: "{rakip} yine hakkında kötü söz yaydı. Karşına çıkınca herkesin önünde hesaplaşmak üzeresin.",
    secenekler: [
      {
        metin: "Görmezden gel, yoluna devam et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -5,
          ahlak: 5,
          mesaj: "Görmezden geldin; içten rahatsız olsan da olgun davrandın.",
          detay: "Her kavga kazanmaya değmez.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Görmezden gelmeye çalıştın ama öfke seni yordu.",
          detay: "Bastırmak yorar.",
        },
      },
      {
        metin: "Herkesin önünde yüzleş.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mesaj: "Kullanılmadı.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
        onTepki: {
          metin: "{rakip} karşında, herkes izliyor. Dönüşü yok.",
          geriCekilMetni: "Vazgeç, sırtını dön.",
          geriCekilSonucu: {
            mutluluk: -4,
            rakip_puani: 5,
            mesaj: "Son anda vazgeçtin; {rakip} şaşkın baktı.",
            detay: "Bazen en güçlü hamle hamle yapmamak.",
          },
          devamMetni: "Hayır. Sonuna kadar.",
          devamSonucu: {
            un: 15,
            rakip_puani: -20,
            ahlak: -5,
            mesaj: "Kalabalık önünde yüzleştiniz; {rakip} geri adım attı ama aranız bozuldu.",
            detay: "Kazanılan gurur, büyüyen düşmanlıkla eşit.",
          },
        },
      },
    ],
  },
  {
    id: "iliski_ilk_ask",
    agirlik: 1.4,
    kategori: "sosyal",
    maxYas: 20,
    gorsel: "💓",
    baslik: "İlk Aşk",
    metin: "Mahalleden biri kalbini hızlandırıyor. Her karşılaşmada dilin tutuluyor; bu duyguyu daha ne kadar saklarsın?",
    secenekler: [
      {
        metin: "Duygularını açıkça söyle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 8,
          dost_puani: 5,
          mesaj: "Sözlerin karşılık buldu; günlerce bulutlarda yürüdün.",
          detay: "İlk aşk bir daha aynı tatta gelmez.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Kibarca reddedildin, yüzün kızardı; haftalarca kaçındın.",
          detay: "Her kalp aynı anda çarpmaz.",
        },
      },
      {
        metin: "İçinde tut, cesaret edemedin.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kimseye açmadın; güvenli ama hüzünlü bir sessizlik seçtin.",
          detay: "Bazı duygular yalnız sana kalır.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Söylemediğin sözler için yıllarca 'keşke' dedin.",
          detay: "Cesaretsizlik büyük pişmanlıktır.",
        },
      },
    ],
  },
  {
    id: "eski_rakiple_son_karsilasma",
    agirlik: 1.4,
    kategori: "sosyal",
    minYas: 58,
    gorsel: "⚡",
    baslik: "Son Karşılaşma",
    metin: "Yıllardır tanıdığın rakibin {rakip} yaşlı ve yorgun. Belki son kez karşı karşıyasınız.",
    secenekler: [
      {
        metin: "Barış teklif et, geçmişi kapat.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          rakip_puani: 20,
          mutluluk: 5,
          mesaj: "{rakip} şaşkınlıkla elini sıktı; yılların gerginliği eridi.",
          detay: "Bazı savaşların en iyi sonu barıştır.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "{rakip} teklifini soğukça reddetti: 'Çok geç.'",
          detay: "Her barış eli tutulmaz.",
        },
      },
      {
        metin: "Hesapları kapatmadan gitme, meydan oku.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 15,
          rakip_puani: -10,
          mesaj: "Son kez üstünlüğünü kanıtladın; {rakip} sessizce çekildi.",
          detay: "Bazıları barış değil, kapanış ister.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Karşılaşma beklenmedik gitti; ikiniz yorgun ve kırgın ayrıldınız.",
          detay: "Bazı hesaplar kapanmaz.",
        },
      },
    ],
  },
  {
    id: "bekarlik_ozgurluk_hissi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 20,
    gorsel: "🕊️",
    baslik: "Bekarlığın Özgürlüğü",
    metin: "Kimseye hesap vermeden yaşamanın tadını çıkarıyorsun. Bugün de kararlarını kendin veriyorsun.",
    secenekler: [
      {
        metin: "Özgürlüğü değerlendir, kendine vakit ayır.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Kendine ayırdığın zaman seni tazeledi.",
          detay: "En iyi arkadaş bazen kendindir.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Yalnız zaman güzeldi ama beklediğin kadar doyurmadı.",
          detay: "Her yalnızlık huzur getirmez.",
        },
      },
      {
        metin: "Yalnızlığın ağırlığını hisset.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yalnızlık bir süre ağırlaştı, sonra kabullendin.",
          detay: "Bazı duygular kabul bekler.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          saglik: -5,
          mesaj: "Yalnızlık bugün çok ağır bastı. Göğsün sıkıştı.",
          detay: "Her gün aynı kolaylıkta geçmez.",
        },
      },
    ],
  },
  {
    id: "bekarlik_aile_baskisi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 26,
    gorsel: "👪",
    baslik: "Ne Zaman Evleneceksin?",
    metin: "Ailenden biri yine sordu: 'Ne zaman evleneceksin?' Bu kez sabrın taştı.",
    secenekler: [
      {
        metin: "Sabırla, gülümseyerek cevapla.",
        baseBasariSansi: 85,
        basariliSonuc: {
          dost_puani: 5,
          mesaj: "Sabırlı yanıtın gerginliği önledi.",
          detay: "Sabır aile ilişkisinde işe yarar.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Sabırlı kalmaya çalıştın ama soru içini kemirdi.",
          detay: "Bazı sorular alışılsa da rahatsız eder.",
        },
      },
      {
        metin: "Sinirlendiğini açıkça belli et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Tepkin aynı soruyu bir daha sormalarını engelledi.",
          detay: "Net olmak bazen en etkilisi.",
        },
        basarisizSonuc: {
          ahlak: -5,
          un: -5,
          mesaj: "Öfken ailede gerginlik yarattı, arkandan konuştular.",
          detay: "Sabırsızlığın da bedeli var.",
        },
      },
    ],
  },
  {
    id: "bekarlik_macera_arkadasi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 20,
    gorsel: "🎉",
    baslik: "Bekar Bir Gece",
    metin: "{dost} seni beklenmedik bir maceraya çağırdı. Bekarlığın tadını bir gece daha çıkarabilirsin.",
    secenekler: [
      {
        metin: "Kabul et, maceraya atıl.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 8,
          dost_puani: 10,
          mesaj: "Gece beklenmedik güzeldi; unutulmaz bir anı oldu.",
          detay: "Bazı geceler yılın en güzel anıdır.",
        },
        basarisizSonuc: {
          para: -15,
          saglik: -5,
          mesaj: "Gece planlandığı gibi gitmedi; yorgun ve fakir döndün.",
          detay: "Her macera pürüzsüz gitmez.",
        },
      },
      {
        metin: "Nazikçe reddet, evde kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Sakin bir gece geçirip kendine baktın.",
          detay: "Bazen en iyisi hiçbir şey yapmamak.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Reddin {dost}'u biraz kırdı.",
          detay: "Her hayır küçük bir hüzün taşır.",
        },
      },
    ],
  },
  {
    id: "bekarlik_yalniz_yaslanma_korkusu",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 42,
    gorsel: "🌙",
    baslik: "Yalnız Yaşlanma Korkusu",
    metin: "Geceleri kendine soruyorsun: yaşlanınca yanımda kimse olmazsa? Bu düşünce bu gece daha ağır bastı.",
    secenekler: [
      {
        metin: "Düşünceyle yüzleş, kabullen.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 8,
          mutluluk: 3,
          mesaj: "Yüzleşme sana beklenmedik bir huzur getirdi.",
          detay: "Bazı korkular yüzleşince küçülür.",
        },
        basarisizSonuc: {
          mutluluk: -12,
          saglik: -5,
          mesaj: "Düşünce seni derinden etkiledi; uykun kaçtı.",
          detay: "Her yüzleşme kolay değil.",
        },
      },
      {
        metin: "Bastır, başka şeylerle oyalan.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Oyalandın; düşünce bir süre çekildi.",
          detay: "Ertelemek de bir stratejidir.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Bastırdığın düşünce gece boyu kabuslarla döndü.",
          detay: "Bazı düşünceler kolay susmaz.",
        },
      },
    ],
  },
  {
    id: "bekarlik_kariyer_odagi",
    kategori: "sosyal",
    yasakliEtiketler: [
      "medeni:evli",
    ],
    minYas: 20,
    gorsel: "🎯",
    baslik: "Tam Odaklanma Fırsatı",
    metin: "Kimseye karşı sorumluluğun olmadığı için tüm vaktini ve gücünü işine adayabilirsin.",
    secenekler: [
      {
        metin: "Tüm gücünü işine ver.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -8,
          para: 20,
          un: 5,
          mesaj: "Odaklanman güzel kazanç ve tanınırlık getirdi.",
          detay: "Tek şeye adanmak bazen kazandırır.",
        },
        basarisizSonuc: {
          mutluluk: -12,
          saglik: -8,
          mesaj: "Aşırı odaklanma seni tüketti; tatmin bulamadın.",
          detay: "Dengesiz başarı boş gelir.",
        },
      },
      {
        metin: "Dengeyi koru, hayata da vakit ayır.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Dengeli yaklaşımın seni hem başarılı hem mutlu etti.",
          detay: "Denge bazen en akıllı strateji.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Dengeyi korurken işte bazı fırsatları kaçırdın.",
          detay: "Her denge kayıpsız değil.",
        },
      },
    ],
  },
  {
    id: "is_ikilem_terfi_mi_aile_mi",
    kategori: "siyaset",
    gerekliEtiketler: [
      "medeni:evli",
    ],
    minRutbeSeviye: 1,
    agirlik: 1,
    gorsel: "🧳",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Uzak Diyarlarda Bir Görev",
    metin: "Büyük bir fırsat: aylarca sürecek, kariyerini sıçratacak uzak bir görev. Ama {es} ve çocukların bu sürede yalnız kalacak.",
    secenekler: [
      {
        metin: "Görevi kabul et, yola çık.",
        baseBasariSansi: 70,
        basariliSonuc: {
          para: 30,
          un: 20,
          es_puani: -18,
          mutluluk: -8,
          mesaj: "Görev büyük başarıyla bitti; dönünce {es}'in gözlerinde gurur ve özlem vardı.",
          detay: "Kariyer yükseldi, evde bir süre eksiklik vardı.",
        },
        basarisizSonuc: {
          para: 10,
          un: 5,
          es_puani: -25,
          mutluluk: -15,
          mesaj: "Görev zor geçti, başarı gelmedi; {es} bu yalnızlığı unutmadı.",
          detay: "Bazen risk alırsın, kazanmazsın.",
        },
      },
      {
        metin: "Reddet, ailenin yanında kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          es_puani: 15,
          mutluluk: 5,
          un: -8,
          mesaj: "Reddettin; {es} minnetle sarıldı. Kariyer bekler ama her akşam evdesin.",
          detay: "Bazı terfiler bir akşam yemeğine değmez.",
        },
        basarisizSonuc: {
          un: -12,
          mesaj: "Reddin üstlerce 'hırssız' diye not edildi; sonraki fırsat gecikebilir.",
          detay: "Her fedakârlığın bedeli var.",
        },
      },
    ],
  },
];
