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
      "Meydanda yeme yarışı kızışmış. Kazanana bir hafta bedava yemek, ama tabak yığını ürkütücü.",
    secenekler: [
      {
        metin: "Yarışa katıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 6,
          mutluluk: 5,
          para: 4,
          mesaj: "Son tabağı bitirdin! Kalabalık tezahürat yaptı, bir hafta yemek senin.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -3,
          mesaj: "Yarıda pes ettin; mide günlerce küstü.",
        },
      },
      {
        metin: "Kenardan izle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Rahatça izledin, mide teşekkür etti.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "'Korkak' diye takıldılar; duydun ama umursamadın.",
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
      "Gezgin bir ozan seni sahneye çağırdı: 'Bir şarkı söyle!' Kalabalık bekliyor, sözleri hatırlamıyorsun.",
    secenekler: [
      {
        metin: "Çık, ne çıkarsa söyle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 8,
          mutluluk: 7,
          mesaj: "Sesin şaşırtıcı güzel çıktı, kalabalık alkışladı.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -2,
          mesaj: "Sözleri karıştırdın; günlerce 'ozan' diye dalga geçildin.",
        },
      },
      {
        metin: "Mahcup ol, nazikçe reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Nazikçe reddettin; ozan başkasını çağırdı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Israr ettiler, kaçarcasına gittin; içinde pişmanlık kaldı.",
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
      "Bir ağıt törenine katıldın; ölünün tanımadığın biri olduğunu fark ettin. Herkes seni yakını sanıyor.",
    secenekler: [
      {
        metin: "Rolü sürdür, ağıt yak.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 5,
          un: 3,
          mesaj: "Kimse fark etmedi; biri 'çok içten bir veda' bile dedi.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -4,
          mesaj: "Yanlış ismi andın, herkes sana döndü. Utançla sıvıştın.",
        },
      },
      {
        metin: "Sessizce çık.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Görünmeden sıvıştın; tatlı bir anı kaldı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Çıkarken sandalyeye çarpıp dikkat çektin.",
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
      "Komşunun çamurlu dev köpeği peşine takıldı, üstüne atlamaya hazır. Kaç ya da göğüsle.",
    secenekler: [
      {
        metin: "Köpekle boğuş, yatıştır.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 4,
          mesaj: "Köpeği yatıştırdın; kuyruk sallayarak yanında yürüdü.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -2,
          mesaj: "Köpek üstüne devrildi; kıyafetin çamur, temizlik cebinden.",
        },
      },
      {
        metin: "Kaç, sokağın ucuna geç.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Zor kaçtın; köpek başka işle ilgilendi.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          saglik: -2,
          mesaj: "Sepete tökezleyip düştün; köpek bunu oyun sandı.",
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
      "Yarı şaka söylediğin laf çarşıda abartılarak yayıldı. Düzeltmek mi, büyütmek mi?",
    secenekler: [
      {
        metin: "Hikâyeyi büyüt, tadını çıkar.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 7,
          mutluluk: 4,
          mesaj: "Herkes senin 'efsanen'i konuşuyor, hoşuna gitti.",
        },
        basarisizSonuc: {
          ahlak: -4,
          un: -3,
          mesaj: "Abartı fazla kaçtı; yalancılıkla suçlandın.",
        },
      },
      {
        metin: "Gerçeği anlatıp düzelt.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Tek tek anlattın; yorucu ama vicdanın rahat.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kimse inanmadı; düzeltmen hikâyeyi renklendirdi.",
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
      "Meydanda gençler büyük taşı kaldırana ödül vaat ediyor. Taş göründüğünden ağır, seyirci kalabalık.",
    secenekler: [
      {
        metin: "Var gücünle dene.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 8,
          para: 5,
          mesaj: "Taşı kaldırdın, kalabalık çıldırdı; ödül cebinde.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -3,
          mesaj: "Sırtın tutuldu, taş kıpırdamadı; günlerce zorlandın.",
        },
      },
      {
        metin: "Reddet, 'başka gün' de.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Omuz silktin, kimse takmadı.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "'Zayıf' diye kışkırttılar; yutkunup geçtin.",
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
      "Arkadaşların seni tanımayan bir gruba 'gizemli yabancı' diye sokmak istiyor. Rolü oynamak cesaret ister.",
    secenekler: [
      {
        metin: "Gizemli yabancıyı oyna.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 6,
          mutluluk: 6,
          mesaj: "Grup gerçekten inandı; arkadaşların gülmekten kırıldı.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -3,
          mesaj: "Bir soruda çuvalladın; şaka anlaşıldı, kimi kırıldı.",
        },
      },
      {
        metin: "Vazgeç, kendin olarak tanış.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Sıradan bir tanışma; kimse kırılmadı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Arkadaşların 'ödlek' diye takıldı.",
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
      "Bir kutlamada tanımadığın biri seni dansa çağırdı. Herkes bakıyor, ayakların dansçı değil.",
    secenekler: [
      {
        metin: "Kabul et, ritme uy.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 7,
          un: 4,
          es_puani: 0,
          mesaj: "Adımları tutturdun; birkaç kişi seni taklit etti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          un: -3,
          mesaj: "Ayakların dolandı, kapaklandın; kalabalık güldü.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Gülümseyip reddettin; davetçi başkasını buldu.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Israr üzerine sert reddettin; ortam gerildi.",
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
      "Arkadaşınla 'hırsız taklidi' yaparken gerçek bir bekçi seni hırsız sandı, peşine düştü. Açıkla mı, kaç mı?",
    secenekler: [
      {
        metin: "Dur, gülerek açıkla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Bekçi de güldü: 'bir dahaki sefere dikkat'.",
        },
        basarisizSonuc: {
          para: -4,
          mutluluk: -3,
          mesaj: "İnanmadı, küçük cezayla bıraktı; gururun yaralı.",
        },
      },
      {
        metin: "Koş, büyütme.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Ara sokaklarda onu atlattın; nefes nefese ama özgürsün.",
        },
        basarisizSonuc: {
          suc_artis: 6,
          mutluluk: -4,
          mesaj: "Yakalandın; kaçman daha şüpheli gösterdi.",
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
      "Bir eğlencede herkes gülünç takma sakal ve bıyıkla dolaşıyor. Sıra sende: en abartılısını mı takarsın?",
    secenekler: [
      {
        metin: "En abartılısını tak, sahneye çık.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 6,
          un: 5,
          mesaj: "Kalabalık seni gösterinin en komik anı ilan etti.",
        },
        basarisizSonuc: {
          un: -4,
          mutluluk: -2,
          mesaj: "Sakal tam yanlış anda düştü; herkes sana güldü.",
        },
      },
      {
        metin: "Kibarca reddet, izle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Kenardan izledin, gösteri yeterince eğlenceliydi.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Arkadaşların 'kasıntı' diye takıldı.",
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
      "Turnuva öncesi saray soytarısı seni tahta kılıçla düelloya çağırdı; kalabalık toplanıyor.",
    secenekler: [
      {
        metin: "Kabul et, düello yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 7,
          mutluluk: 6,
          mesaj: "Soytarıyı yendin; kalabalık seni 'ısınma yıldızı' ilan etti.",
        },
        basarisizSonuc: {
          un: -4,
          mutluluk: -2,
          mesaj: "Soytarı seni üç hamlede serdi; günlerce 'kılıç ustası' dediler.",
        },
      },
      {
        metin: "Reddet, turnuvaya odaklan.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Soytarı başkasını buldu; sen turnuvaya odaklandın.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Soytarı seni 'korkak aday' diye ilan etti; can sıktı.",
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
      "Rahiplerin özel birasından bir fıçı kilerin köşesinde unutulmuş. Kimse yokken bir tas doldurmak cazip.",
    secenekler: [
      {
        metin: "Sessizce bir tas doldur.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 6,
          ahlak: -3,
          mesaj: "Bira nefisti; kimse fark etmedi.",
        },
        basarisizSonuc: {
          ahlak: -5,
          un: -4,
          mesaj: "Baş rahip seni yakaladı; günlerce avlu süpürdün.",
        },
      },
      {
        metin: "Vazgeç, kilerden uzak dur.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Ayartmaya direndin, vicdanın rahat.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Bütün gün o birayı düşündün.",
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
      "Şatonun kuru hendeğini tek sıçrayışta atlarım diye bahse girdin. Hendek geniş, dibi sert.",
    secenekler: [
      {
        metin: "Geri koş, sıçra.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 8,
          para: 6,
          mesaj: "Tam kenara indin! Kalabalık alkışladı, bahis senin.",
        },
        basarisizSonuc: {
          saglik: -7,
          mutluluk: -3,
          mesaj: "Ortasına düştün; çamurdan on dakikada çıktın.",
        },
      },
      {
        metin: "Bahsi geri çevir.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "'Akıllısın' dedi biri; sen de inanmaya çalıştın.",
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
      "Meyhanede kafayı bulmuş arkadaşların seni kürsüye çıkarıp kralı taklit ettirmek istiyor. Duvarların kulağı var.",
    secenekler: [
      {
        metin: "Taklit yap, herkesi güldür.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 7,
          un: 4,
          mesaj: "Meyhane çınladı; kral kadar 'ciddi' konuştuğunu söylediler.",
        },
        basarisizSonuc: {
          un: -5,
          suc_artis: 5,
          mesaj: "Bir muhbir duydu; 'saygısızlık' şikâyetine ramak kaldı.",
        },
      },
      {
        metin: "Reddet, kürsüden in.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "İndin; 'kaçık' dediler ama zararsız geçti.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Zorladılar; huysuzca kaçtın.",
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
      "Falcı kadın ciddi ciddi 'Bir eşek yüzünden büyük talihsizlik yaşayacaksın!' dedi. Köy seni izliyor.",
    secenekler: [
      {
        metin: "Kehaneti boşver, işine devam et.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Hiçbir şey olmadı; köylüler sana 'cesur' demeye başladı.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -3,
          mesaj: "Bir eşek tekmeledi, falcının dediği gibi. Köy ona daha çok inandı.",
        },
      },
      {
        metin: "Ciddiye al, eşeklerden kaç.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Eşeğe yaklaşmadın, güvende kaldın; herkes seni garip buldu.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Eşek arabasından kaçarken düşüp rezil oldun; korkudan.",
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
      "Asker arkadaşın tam zırhını denemene izin verdi. Düşündüğünden ağır; ayakta durmak bile zor.",
    secenekler: [
      {
        metin: "Zırhla birkaç adım at.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 6,
          mutluluk: 5,
          mesaj: "Sallanarak da olsa birkaç adım attın; izleyenler etkilendi.",
        },
        basarisizSonuc: {
          saglik: -6,
          un: -3,
          mesaj: "İkinci adımda devrildin, zırh üstüne düştü; iki kişi kaldırdı.",
        },
      },
      {
        metin: "Sadece giy, kımıldama.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Ağırlığı hissedip güvenle çıkardın.",
        },
        basarisizSonuc: {
          saglik: -2,
          mesaj: "Çıkarırken kayış elini sıkıştırdı; ufak çizik.",
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
      "Satıcı sana öküz kemiğini 'ejderha kemiği' diye satıyor; sen de aynısını başkasına yapmayı düşünüyorsun.",
    secenekler: [
      {
        metin: "Al, sen de 'ejderha kemiği' diye sat.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          ahlak: -5,
          mesaj: "Saf bir gezgine üç katına sattın; vicdan sızladı, kese doldu.",
        },
        basarisizSonuc: {
          un: -6,
          ahlak: -3,
          mesaj: "Alıcı kemiği kasaba gösterdi; 'dolandırıcı' lakabı yapıştı.",
        },
      },
      {
        metin: "Numarasını yüzüne vur, alma.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Satıcı somurttu; vicdanın rahat ayrıldın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Satıcı seni 'zevksiz' diye küçümsedi; canın sıkıldı.",
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
      "Hamamdan çıkarken kıyafetlerinin bir kısmı başkasınınkiyle karışmış. O kişi hâlâ içeride, sabırsızca arıyor.",
    secenekler: [
      {
        metin: "Git, durumu açıkla, değiştir.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 5,
          dost_puani: 3,
          mesaj: "Adam da güldü, kıyafetleri gülüşerek değiştirdiniz; yeni tanıdık.",
        },
        basarisizSonuc: {
          un: -3,
          mutluluk: -2,
          mesaj: "Adam sinirlendi, çıkışta herkesin önünde bağırdı.",
        },
      },
      {
        metin: "Fark etmemiş gibi git.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Kimse fark etmedi, rahat nefes aldın.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -3,
          mesaj: "Adam peşinden koşup herkesin önünde 'hırsız!' diye yakaladı.",
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
      "Bir soylunun avcı şahini kaçıp ağaca kondu. Soylu panikte, sen tam altındasın; getirirsen mükâfat var.",
    secenekler: [
      {
        metin: "Ağaca tırman, şahini yakala.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 12,
          un: 5,
          mesaj: "Şahini yumuşakça yakaladın; soylu cebini doldurdu.",
        },
        basarisizSonuc: {
          saglik: -6,
          mesaj: "Şahin elini gagaladı, ağaçtan sıyrılıp indin; el de gurur da yaralı.",
        },
      },
      {
        metin: "Uzaktan izle, karışma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Uşaklar şahini yakaladı; sen seyirci kaldın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Soylu ters baktı: 'yardım edebilirdin'.",
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
      "Törende sadakat yemini etmen isteniyor; tam sıra sende metni ezberlemediğini fark ettin. Kalabalık bekliyor.",
    secenekler: [
      {
        metin: "Uydur, kendinden emin konuş.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 6,
          mutluluk: 3,
          mesaj: "Uydurduğun cümleler öyle tok geldi ki kimse asıl metni hatırlamadı.",
        },
        basarisizSonuc: {
          un: -5,
          mesaj: "Cümlelerin karıştı; birkaç kişi gülmemek için dudağını ısırdı.",
        },
      },
      {
        metin: "Dur, metni birine sor.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kısa sessizlikten sonra doğru metni okudun; kimse takmadı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Beklerken tören havası bozuldu; kıpırdanmalar başladı.",
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
      "Arkadaşların seninle dilenci kılığında bir günde ne kadar sadaka toplanır diye bahse girdi. Gurur zedelenir, kese dolabilir.",
    secenekler: [
      {
        metin: "Kılığa gir, sadaka topla.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          un: -2,
          mesaj: "Şaşırtıcı iyi bir 'dilenci' oldun; kese doldu.",
        },
        basarisizSonuc: {
          un: -6,
          ahlak: -3,
          mesaj: "Tanıdığın biri seni tanıyıp anlattı; günlerce alay konusu oldun.",
        },
      },
      {
        metin: "Bahsi reddet.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Arkadaşların hayal kırıklığına uğradı ama saygı duydu.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "'Ödlek' diye takıldılar.",
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
      "Panayırdaki ozanlar yarışmasında son anda yer açıldı. Şiir yeteneğin şüpheli ama ödül güzel.",
    secenekler: [
      {
        metin: "Sahneye çık, doğaçlama şiir söyle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 8,
          para: 8,
          mesaj: "Doğaçlaman herkesi şaşırttı; jüri seni birinci ilan etti.",
        },
        basarisizSonuc: {
          un: -4,
          mutluluk: -3,
          mesaj: "Kafiyeler tutmadı; kalabalık kibarca gülüp başkasını alkışladı.",
        },
      },
      {
        metin: "Vazgeç, izleyici kal.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Yarışmayı keyifle izledin; kimseye bir şey ispatlamadın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Pişmanlık geçti içinden: 'denesem miydi?'",
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
      "Bir dolandırıcı sana sıradan kuyu suyunu 'kutsal kaynak suyu' diye satıyor; sen de bir şişe alıp satmayı düşünüyorsun.",
    secenekler: [
      {
        metin: "Şişeyi al, başkasına sat.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 9,
          ahlak: -5,
          mesaj: "İnanan birine üç katına sattın; vicdan sızladı, kese ağırlaştı.",
        },
        basarisizSonuc: {
          un: -5,
          ahlak: -2,
          mesaj: "Alıcı suyu içip hasta olunca hesabı senden sordu.",
        },
      },
      {
        metin: "Dolandırıcıyı ifşa et, alma.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 3,
          un: 2,
          mesaj: "Kalabalık dolandırıcıyı kovaladı; sana 'dürüst adam' dediler.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Dolandırıcı kaçtı, kimse teşekkür etmedi.",
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
      "Gece yarısı yasak bir at yarışına bahis girme fırsatı çıktı. Kazanç iyi, yakalanırsan başın derde girer.",
    secenekler: [
      {
        metin: "Bahse gir, yarışı izle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 14,
          suc_artis: 6,
          mesaj: "Bahsi kazandın, kese ağırlaştı; ama seni not ettiler.",
        },
        basarisizSonuc: {
          para: -6,
          suc_artis: 8,
          mesaj: "Parayı kaybettin, bir muhbir de seni gördü.",
        },
      },
      {
        metin: "Uzak dur, eve git.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Sakin bir gece geçirdin; kaçırdığın heyecanı merak ettin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Ertesi gün kazançları duyunca içine dert oldu.",
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
      "Şölenin soytarısı hastalanınca panikleyen ev sahibi senden yerine geçmeni istiyor. Kalabalık sırada bekliyor.",
    secenekler: [
      {
        metin: "Kabul et, doğaçlama şaka yap.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 8,
          para: 8,
          mutluluk: 4,
          mesaj: "Doğaçlaman tuttu, gerçek soytarı sandılar; ev sahibi cömertçe ödedi.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -3,
          mesaj: "Şakalar sessizlikle karşılandı; ölü bir sessizlik çöktü.",
        },
      },
      {
        metin: "Reddet, birini bulmalarına yardım et.",
        baseBasariSansi: 85,
        basariliSonuc: {
          dost_puani: 2,
          mesaj: "Başka bir eğlendirici bulmalarına yardım ettin; herkes rahatladı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Kimse bulunamadı, şölen sönük geçti; ev sahibi sana küstü.",
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
      "Sahil köyünde herkes koydaki 'deniz canavarını' konuşuyor; kimi dev balık, kimi eski batık diyor. Bakmaya gitsen mi?",
    secenekler: [
      {
        metin: "Tekneyle koya git, araştır.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 7,
          mutluluk: 4,
          mesaj: "'Canavar' karaya vurmuş dev bir balinaydı; köy teşekkür etti.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -2,
          mesaj: "Tekne devrildi; sırılsıklam, eli boş döndün.",
        },
      },
      {
        metin: "Söylentiye inan, uzak dur.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Herkes gibi uzak durdun; gizem gizem kaldı.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Çocuklar seni 'korkak' diye takıldı.",
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
      "Arkadaşların gece yarısı kilise çanını çalıp köyü telaşla uyandırmayı öneriyor: 'sadece bir kere'.",
    secenekler: [
      {
        metin: "Çanı çal, koş.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: 7,
          mesaj: "Köy telaşla dışarı fırladı; siz çalıların ardında kahkaha attınız.",
        },
        basarisizSonuc: {
          ahlak: -4,
          un: -4,
          suc_artis: 5,
          mesaj: "Papaz seni suçüstü yakaladı; günlerce avlu temizledin.",
        },
      },
      {
        metin: "Vazgeç, arkadaşlarını da caydır.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Arkadaşların hayal kırıklığına uğradı ama kimse başını derde sokmadı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Arkadaşların sensiz yaptı; dışarıda kaldın.",
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
      "Bir handa hacı kıyafetli yolculara bedava yemek ve yatak verildiğini gördün. Cebin boşken kılığa girmek cazip.",
    secenekler: [
      {
        metin: "Hacı kılığına gir, bedava kal.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 8,
          ahlak: -4,
          mesaj: "Han sahibi gerçek hacı sandı; karnın doydu, vicdanın gıcıkladı.",
        },
        basarisizSonuc: {
          un: -6,
          ahlak: -3,
          mesaj: "Sorguda çuvalladın; herkesin önünde kapı dışarı edildin.",
        },
      },
      {
        metin: "Dürüstçe öde.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Az paran olsa da ödedin, geceyi huzurla geçirdin.",
        },
        basarisizSonuc: {
          para: -2,
          mesaj: "Paran yetmedi; utanarak eksik ödedin.",
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
      "Pazarda satıcı sana 'genç ve güçlü' diye bir eşek satıyor ama hayvanın gözlerinde yorgunluk var. Al mı, pazarlık mı?",
    secenekler: [
      {
        metin: "Sıkı pazarlık et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 6,
          mesaj: "Fiyatı yarıya indirdin; satıcı homurdanarak kabul etti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Satıcı sinirlenip eşeği gözünün önünde başkasına sattı.",
        },
      },
      {
        metin: "İstenen fiyatı öde.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: -10,
          mesaj: "Eşeği aldın; üç gün sonra hiç genç olmadığı çıktı.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -2,
          mesaj: "Eşek handan çıkmadan yürümeyi reddetti; para gitti, eşek kaldı.",
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
      "Köyün en 'olgun' peyniri masaya kondu, kokusu odayı doldurdu. Bir dilim bitirene bir şişe şarap.",
    secenekler: [
      {
        metin: "Bir dilim ye, nefesini tut.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 5,
          para: 3,
          mesaj: "Zor yuttun ama şarabı kazandın; kalabalık alkışladı.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -3,
          mesaj: "Bir ısırıkta pes ettin; mide bir süre toparlanamadı.",
        },
      },
      {
        metin: "Kibarca reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Rahatça reddettin, herkes anladı.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "'Nazlı' diye takıldılar.",
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
      "Merakla girdiğin yel değirmeninin kanadı dönmeye başlayıp seni içeride sıkıştırdı. Zorla mı, yardım mı?",
    secenekler: [
      {
        metin: "Kanatların arasından sıyrıl.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Tam zamanında sıyrıldın; tozlu ama sağlam.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Kanat omzuna çarptı; günlerce acı çektin.",
        },
      },
      {
        metin: "Yardım için bağır, bekle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          un: -2,
          mesaj: "Değirmenci kapıyı açtı; 'değirmene sıkışan adam' oldun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kimse duymadı; rüzgâr dinene kadar bekledin.",
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
      "Bir soylunun eğitilmiş kargası lakabını tekrarlayıp herkesi güldürüyor. Yeni bir şey öğretip büyütsen mi, uzaklaşsan mı?",
    secenekler: [
      {
        metin: "Kargaya daha komik bir şey öğret.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 6,
          un: 4,
          mesaj: "Karga yeni cümleyi kapıp herkesi güldürdü; soylu bile güldü.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Karga öğrettiğini soylunun misafirlerinin önünde, yanlış anda söyledi.",
        },
      },
      {
        metin: "Uzaklaş, karışma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Karga başkasının lakabına geçti, rahatladın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Karga lakabını bağırmaya devam etti; kaçmak işe yaramadı.",
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
      "Bir tüccar sıradan kemiği 'azizin parmağı' diye satıyor ve zengin köylüye satmak için ortaklık öneriyor.",
    secenekler: [
      {
        metin: "Kabul et, kemiği satmaya çalış.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 18,
          ahlak: -8,
          mesaj: "Zengin köylü kemiği törenle aldı; vicdanın da kesen de ağırlaştı.",
        },
        basarisizSonuc: {
          un: -8,
          ahlak: -4,
          suc_artis: 8,
          mesaj: "Bir keşiş sahteliği anladı; meydanda rezil oldun.",
        },
      },
      {
        metin: "Reddet, tüccarı ihbar et.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 4,
          un: 3,
          mesaj: "Tüccar köyden kovuldu; dürüstlüğün övüldü.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Kimse dinlemedi; tüccar başka köyde sürdürdü.",
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
      "Kutsal emaneti görmek için saatlerdir kuyruktasın. Önündeki adam yerini kaptırmamak için itip kakıyor.",
    secenekler: [
      {
        metin: "Öne geçmeye çalış.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Ustaca sıyrılıp öne geçtin; emaneti ilk göreceksin.",
        },
        basarisizSonuc: {
          un: -3,
          mutluluk: -3,
          mesaj: "İtişme büyüdü; görevliler ikinizi de kuyruktan attı.",
        },
      },
      {
        metin: "Sabırla sıranı bekle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Saatlerce bekledikten sonra emaneti huzurla gördün.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sıra sana gelince kapılar kapandı; yarına kaldı.",
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
      "Şakadan giydiğin soytarı kıyafetiyle dolaşırken gerçek saray soytarısı 'kıyafetimi mi çaldın?' diye bağırdı; herkes izliyor.",
    secenekler: [
      {
        metin: "Şaka de, komik bir gösteri yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 3,
          mesaj: "İkiniz doğaçlama gösteri yaptınız; kalabalık bayıldı.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Soytarı kıyafetini istedi; herkesin önünde soyunmak zorunda kaldın.",
        },
      },
      {
        metin: "Özür dile, kıyafeti ver.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kıyafeti verdin, soytarı yatıştı, olay kapandı.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Çıkarırken takılıp düştün; kalabalık güldü.",
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
      "Fabrika işçileri yeni buhar makinesini bir insanın yenip yenemeyeceğini tartışıyor. Sıra sende, herkes izliyor.",
    secenekler: [
      {
        metin: "Makineyle yarışa gir.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 9,
          para: 6,
          mesaj: "İnanılmaz, makineyi geçtin! Fabrika günlerce konuştu.",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -3,
          mesaj: "Makine seni fena geçti; kolların günlerce ağrıdı.",
        },
      },
      {
        metin: "Reddet, işine dön.",
        baseBasariSansi: 88,
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
      "Gezici bir mucit seni yeni sıcak hava balonuyla uçuşa çağırıyor. 'Tamamen güvenli' diyor ama sesi emin değil.",
    secenekler: [
      {
        metin: "Bin, uçuşu dene.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 9,
          mutluluk: 8,
          mesaj: "Şehri kuşbakışı gördün! İnince 'gökyüzü gezgini' diye karşılandın.",
        },
        basarisizSonuc: {
          saglik: -9,
          mutluluk: -3,
          mesaj: "Balon alçaldı; sepet bir çatıya sürtünüp sert indi.",
        },
      },
      {
        metin: "Teklifi kibarca reddet.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Yerde kalmayı seçtin; mucit başkasını buldu.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Uçuşu izlerken içinde pişmanlık kaldı.",
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
      "Yeni fotoğraf stüdyosu ücretsiz deneme çekimi yapıyor ama hareketsiz durmak uzun sürüyor; bir kıpırtı fotoğrafı bulandırır.",
    secenekler: [
      {
        metin: "Ciddi poz ver, kıpırdama.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 5,
          un: 3,
          mesaj: "Muhteşem fotoğraf çıktı; çerçeveletip astın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          para: -2,
          mesaj: "Tam anında kaşındın, bulanık hayalete döndün; para da gitti.",
        },
      },
      {
        metin: "Komik yüz ifadesiyle poz ver.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 6,
          mesaj: "Fotoğrafçı bile güldü, fotoğrafı vitrine astı.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Fotoğrafçı 'ciddi sanatı' mahvettiğini söyleyip ek ücret istedi.",
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
      "İstasyonda biri at arabasının yeni trenden hızlı gidebileceğine kalın bir bahse girdi. Sen de küçük bir bahis koyabilirsin.",
    secenekler: [
      {
        metin: "Trenin kazanacağına oyna.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 8,
          mesaj: "Tren rahat kazandı, bahsi cebe attın.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Tren arızalandı, at arabası kahkahayla geçti.",
        },
      },
      {
        metin: "At arabasına oyna.",
        baseBasariSansi: 40,
        basariliSonuc: {
          para: 16,
          mesaj: "Tren gerçekten arızalandı! Herkes şaşkın, sen kazançlı.",
        },
        basarisizSonuc: {
          para: -6,
          un: -2,
          mesaj: "Tren rahat kazandı; 'eski kafalı' diye takıldılar.",
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
      "Gezici sirk sahibi gönüllü arıyor ve seni sahneye çağırdı; ateş yutma numarasına yardım edeceksin.",
    secenekler: [
      {
        metin: "Sahneye çık, yardım et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 7,
          mutluluk: 5,
          mesaj: "Numara kusursuz gitti, kalabalık ayakta alkışladı.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -2,
          mesaj: "Bir kıvılcım koluna sıçradı; gösteri yarıda kesildi.",
        },
      },
      {
        metin: "Nazikçe reddet, izle.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Sirk sahibi başkasını buldu; keyifle izledin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Biraz 'ödlek' diye takıldılar.",
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
      "Yerel gazete muhabiri çarpıcı bir hikâye istiyor. Gerçek hikâyen sıradan ama abartırsan manşetlik olur.",
    secenekler: [
      {
        metin: "Hikâyeyi süsle, manşet ol.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 9,
          para: 4,
          mesaj: "Manşet oldun, herkes seni konuşuyor; yazar ücreti de aldın.",
        },
        basarisizSonuc: {
          ahlak: -4,
          un: -6,
          mesaj: "Bir okuyucu yalanı ispatladı, gazete özür diledi; rezil oldun.",
        },
      },
      {
        metin: "Gerçek, sıradan hikâyeni anlat.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Küçük köşede yer aldı, ilgi görmedi ama dürüsttün.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Muhabir 'sıkıcı' bulup hiç basmadı.",
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
      "Bir vitrinde yeni icat müzikli kutu sergileniyor. Dükkâncı kolu çevirmeni istiyor; kalabalık izliyor.",
    secenekler: [
      {
        metin: "Kolu çevir, dans et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 6,
          un: 3,
          mesaj: "Müziğe kapıldın; birkaç kişi seninle dansa katıldı.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Kolu sert çevirince mekanizma bozuldu; tazminat ödedin.",
        },
      },
      {
        metin: "Uzaktan izle, dokunma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Müziği keyifle dinledin, kimseye zarar vermedin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Dükkâncı 'denemeyecek misin' diye üstüne geldi; canın sıkıldı.",
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
      "İş arkadaşların patronu korkutmak için 'toplu grev başlıyor' şakası yapmayı öneriyor; birkaç dakikalık kargaşa için.",
    secenekler: [
      {
        metin: "Şakaya katıl, birlikte bağır.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 3,
          mesaj: "Patron önce panikledi, şakayı anlayınca gülmekten kırıldı.",
        },
        basarisizSonuc: {
          un: -5,
          suc_artis: 4,
          mesaj: "Patron ciddiye alıp soruşturma açtı; adın kara listeye yazıldı.",
        },
      },
      {
        metin: "Katılma, işine bak.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kenarda kaldın; olay çabuk kapandı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "İş arkadaşların 'tatsız' diye takıldı.",
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
      "Telgraf memuru mesajını bozdu; karşı taraf artık kastetmediğin bir şey bekliyor. Düzelt mi, bırak mı?",
    secenekler: [
      {
        metin: "Yeni telgrafla düzelt.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: -3,
          mutluluk: 2,
          mesaj: "Karışıklığı düzelttin, karşı taraf anladı; biraz masraf oldu.",
        },
        basarisizSonuc: {
          para: -5,
          mutluluk: -2,
          mesaj: "İkinci telgraf da bozuldu; işler daha karıştı.",
        },
      },
      {
        metin: "Bırak kalsın, ne olacağını gör.",
        baseBasariSansi: 45,
        basariliSonuc: {
          para: 8,
          mesaj: "Yanlış anlaşılma lehine döndü; beklenmedik kazanç geldi.",
        },
        basarisizSonuc: {
          para: -8,
          un: -3,
          mesaj: "Karşı taraf iş yapmayı reddetti; 'güvenilmez' dendin.",
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
      "İstasyondaki arkadaşların devasa lokomotifin önünde 'cesur poz' vermeni istiyor, tren kalkmak üzereyken.",
    secenekler: [
      {
        metin: "Öne geç, cesurca poz ver.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 6,
          mutluluk: 5,
          mesaj: "Tren düdüğü çalarken çekilen fotoğraf efsane oldu; herkes kopya istedi.",
        },
        basarisizSonuc: {
          saglik: -5,
          mutluluk: -3,
          mesaj: "Tren erken kalktı, son anda kenara atıldın; kalbin küt küt attı.",
        },
      },
      {
        metin: "Güvenli mesafeden poz ver.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Sıradan ama güvenli bir hatıra fotoğrafı oldu.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Arkadaşların 'ödlek' diye dalga geçti.",
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
      "Eğlenceye bir sokak satıcısının abartılı bağırışını taklit ettin; birkaç meraklı gerçekten mal almak için etrafını sardı.",
    secenekler: [
      {
        metin: "Rolü sürdür, ıvır zıvırı 'sat'.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 8,
          mutluluk: 4,
          mesaj: "Şaka gerçek satışa döndü; beklenmedik para girdi cebine.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Gerçek satıcı gelip azarladı; müşteriler dağıldı.",
        },
      },
      {
        metin: "Şakayı bitir, özür dile.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Herkes güldü; utanarak ama zararsız sıyrıldın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Birkaç müşteri kandırıldığını sanıp kızdı.",
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
      "Şehre yeni gelen 'demir at' bisikletlerle küçük bir yarış var. Hiç binmedin ama heyecanlandın.",
    secenekler: [
      {
        metin: "Bisiklete atla, yarışa katıl.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 8,
          para: 5,
          mesaj: "Düşe kalka da olsa bitişe ilk sen ulaştın!",
        },
        basarisizSonuc: {
          saglik: -8,
          mutluluk: -3,
          mesaj: "Dengeyi kuramadın, üç kez düştün; dizlerin haftalarca ağrıdı.",
        },
      },
      {
        metin: "Kenardan izle, bahis oyna.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: 5,
          mesaj: "Doğru sürücüye oynadın, ufak kâr ettin.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Bahsi kaybettin; en azından dizlerin değil cebin acıdı.",
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
      "Yeni müzedeki ünlü bir heykelin pozunu taklit edip arkadaşlarını güldürmek istiyorsun ama görevli seni izliyor gibi.",
    secenekler: [
      {
        metin: "Kaideye çık, pozu taklit et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 6,
          mesaj: "Arkadaşların gülmekten kırıldı; görevli fark etmedi.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Görevli seni kaideden indirip herkesin önünde uyardı.",
        },
      },
      {
        metin: "Vazgeç, sadece bak.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Heykelleri sakin gezdin; kimseyi güldürmedin ama başın derde girmedi.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Arkadaşların 'sıkıcı' diye takıldı.",
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
      "Meydanda bir bilim meraklısı elektrik deneyi gösteriyor: 'Şu tele elini değdiren saçının diken diken olduğunu görecek!' Gönüllü arıyor.",
    secenekler: [
      {
        metin: "Gönüllü ol, tele dokun.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 6,
          un: 4,
          mesaj: "Saçların diken diken oldu, kalabalık kahkahayla alkışladı.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -2,
          mesaj: "Beklenenden güçlü şok aldın; elin bir süre uyuştu.",
        },
      },
      {
        metin: "Uzaktan izle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Deneyi güvenle izleyip merakını giderdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "'Korkak' diye takıldılar.",
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
      "Şık bir dans salonunda yeni moda bir dansı denedin ama adımları bilmiyorsun. Herkes izlerken devam mı, oturmak mı?",
    secenekler: [
      {
        metin: "Devam et, doğaçlama yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 6,
          un: 5,
          mesaj: "Doğaçlaman yeni 'moda' sanıldı; birkaçı seni taklit etti.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -3,
          mesaj: "Ayakların dolandı, partnerinin ayağına bastın; salon adını fısıldadı.",
        },
      },
      {
        metin: "Kenara çekil, izle.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Keyifle izledin, kimse bir şey demedi.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Birkaç kişi 'neden dans etmiyorsun' diye ısrar etti; canın sıkıldı.",
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
      "Kostüm balosu için ödünç aldığın polis kıyafetiyle sokakta dolaşırken, kalabalık seni ciddiye alıp yardım istemeye başladı.",
    secenekler: [
      {
        metin: "Rolü oyna, 'yardım' et.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: 6,
          un: 3,
          mesaj: "Bir anlaşmazlığı 'çözdün'; kalabalık teşekkür etti, kimse anlamadı.",
        },
        basarisizSonuc: {
          suc_artis: 8,
          un: -5,
          mesaj: "Gerçek polis geldi, seni sahte kıyafetle yakaladı.",
        },
      },
      {
        metin: "Kıyafeti çıkar, sıvış.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kalabalıktan sıyrılıp kıyafeti çantana tıktın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Çıkarırken düğmeler koptu; garip göründün.",
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
      "Hizmetini tanıtan afişte biraz abartmışsın; 'şehrin en iyisi' dikkat çekiyor ama herkesi ikna etmiyor.",
    secenekler: [
      {
        metin: "Afişi bırak, iddiayı savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          un: 3,
          mesaj: "Afiş dikkat çekti; meraklı müşteriler kapına dayandı.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -5,
          mesaj: "Hayal kırıklığına uğrayan müşteri şikâyet etti; 'abartı ustası' oldun.",
        },
      },
      {
        metin: "Afişi mütevazı bir dille değiştir.",
        baseBasariSansi: 85,
        basariliSonuc: {
          ahlak: 2,
          mesaj: "Daha az müşteri geldi ama memnun ayrıldı.",
        },
        basarisizSonuc: {
          para: -2,
          mesaj: "Değişiklik parası boşa gitti, kimse ilgilenmedi.",
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
      "Maskeli baloda biri seni başkasıyla karıştırıp samimi sohbete daldı. Yanlışı düzelt mi, oyunu sürdür mü?",
    secenekler: [
      {
        metin: "Oyunu sürdür, o kişiymiş gibi yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 7,
          dost_puani: 3,
          mesaj: "Gece boyu eğlenceli rol yaptın; sonunda ikiniz gülerek açıkladınız.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Kişi kimliğini fark edip seni herkese 'sahtekâr' diye tanıttı.",
        },
      },
      {
        metin: "Hemen yanlışı düzelt.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Kişi mahcup oldu; kısa özürle kapandı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Kişi inanmadı, sohbete devam etmeye çalıştı; tuhaf oldu.",
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
      "Bir mucit garip aleti ('kendi kendine yelpazelenen şapka') komisyon karşılığında halka tanıtmanı istiyor.",
    secenekler: [
      {
        metin: "Sahneye çık, icadı tanıt.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 12,
          un: 4,
          mesaj: "Aletle gerçekten ilgilendiler; mucit komisyonu cömertçe ödedi.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Alet sahnede bozuldu, şapka bir izleyicinin kafasına uçtu.",
        },
      },
      {
        metin: "Teklifi reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "Mucit başkasını buldu; sen karışmadın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "İcat ilgi görünce 'keşke kabul etseydim' dedin.",
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
      "Mahalle çocukları nehir kenarında kâğıt gemi yarışı yapıyor, seni de çağırıyor. Büyük için çocukça ama eğlenceli.",
    secenekler: [
      {
        metin: "Katıl, en iyi gemiyi yap.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 3,
          mesaj: "Geminin akıntıyı ilk geçti; çocuklar seni omuzlarına aldı.",
        },
        basarisizSonuc: {
          mutluluk: 2,
          mesaj: "Gemin batsa da çok eğlendin, çocuklarla güldünüz.",
        },
      },
      {
        metin: "Reddet: 'büyüğüm ben'.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Çocuklar küstü; ciddiyetini korudun ama biraz pişman oldun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Çocuklar 'kasıntı' diye takıldı; canın sıkıldı.",
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
      "Yeni binadaki 'asansör' herkesi meraklandırıyor ama kimse binmeye cesaret edemiyor. İlk sen mi denersin?",
    secenekler: [
      {
        metin: "İlk sen bin.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 7,
          mutluluk: 5,
          mesaj: "Sorunsuz çıktın; 'şehrin ilk asansör yolcusu' diye anıldın.",
        },
        basarisizSonuc: {
          saglik: -5,
          mutluluk: -4,
          mesaj: "Asansör ortada takıldı; yarım saatte zor çıkardılar.",
        },
      },
      {
        metin: "Merdivenden çık, bekle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 1,
          mesaj: "Yorularak da olsa güvenle çıktın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "'Korkak' diye takıldılar.",
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
      "Önemli bir davet için ısmarladığın kıyafet, terzinin hatasıyla tuhaf ve gülünç bir kesimle geldi. Giyer misin, evde mi kalırsın?",
    secenekler: [
      {
        metin: "Giy, davete öyle git.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 6,
          mutluluk: 4,
          mesaj: "Özgüvenin herkesi ikna etti; birkaçı 'yeni tarz' mı diye sordu.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -3,
          mesaj: "Herkes garip baktı, davet boyunca fısıltılar sürdü.",
        },
      },
      {
        metin: "Eve dön, daveti kaçır.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Davette önemli bir tanışıklığı kaçırdığını sonradan öğrendin.",
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
      "Gezici sirkten kaçan tuhaf bir hayvan (zebra mı, boyalı eşek mi) sokaklarda koşuyor. Yakalamaya yardım eder misin?",
    secenekler: [
      {
        metin: "Peşinden koş, yakala.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 10,
          un: 6,
          mesaj: "Hayvanı köşeye sıkıştırıp yakaladın; sirk sahibi minnetle ödedi.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          saglik: -3,
          mesaj: "Hayvan seni sürükleyip su birikintisine düşürdü, kaçmaya devam etti.",
        },
      },
      {
        metin: "Kenardan izle, karışma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Kaosu keyifle izledin; başkaları yakaladı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Hayvan yanından geçerken üstüne çamur sıçrattı.",
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
      "Dolandırıcı 'her derde deva' diye gürültülü bir makine satıyor; sen başkasına satıp farkı kazanmayı düşünüyorsun.",
    secenekler: [
      {
        metin: "Makineyi al, 'mucize' diye sat.",
        baseBasariSansi: 50,
        basariliSonuc: {
          para: 16,
          ahlak: -7,
          mesaj: "Saf alıcı ikiye katladığı fiyata aldı; kese doldu, vicdan sızladı.",
        },
        basarisizSonuc: {
          un: -7,
          ahlak: -3,
          suc_artis: 6,
          mesaj: "Makine ilk çalışmada patladı; alıcı seni her yerde şikâyet etti.",
        },
      },
      {
        metin: "Reddet, dolandırıcıyı uyar.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Dolandırıcı vazgeçmedi ama vicdanın rahat ayrıldın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Dolandırıcı seni 'zevksiz' diye küçümsedi; canın sıkıldı.",
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
      "İşçiler baca dumanıyla gökyüzüne isim yazılabileceğini tartışıyor; seni damperle kanıtlamakla görevlendirdiler.",
    secenekler: [
      {
        metin: "Damperle oyna, dumana şekil ver.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 6,
          mutluluk: 5,
          mesaj: "Duman tuhaf bir şekil aldı; herkes seni 'gökyüzü ressamı' diye alkışladı.",
        },
        basarisizSonuc: {
          para: -6,
          un: -3,
          mesaj: "Damperi yanlış ayarladın, makine tıkandı; ustabaşı tamiri maaşından kesti.",
        },
      },
      {
        metin: "Teoriye gülüp işine dön.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mutluluk: 0,
          mesaj: "İşine döndün; teori havada asılı kaldı.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "'Hayal gücün yok' diye takıldılar.",
        },
      },
    ],
  },
];
