import { OlayTanimi } from "./types";

/**
 * Sosyalleşme mekânları (sosyallesmeYerleri.ts) için yazılmış olay havuzu.
 * Bu olaylar normal rastgele havuzdan TAMAMEN dışlanır (bkz. olaySecici.ts
 * uygunMu) — sadece oyuncu POST /:id/sosyallesme ile ilgili mekâna gitmeyi
 * seçtiğinde, sosyallesmeIcinOlaySec üzerinden zorlanan olay olarak gelirler.
 * Her olayın sosyallesmeYeri alanı, ait olduğu mekânın id'siyle eşleşir.
 *
 * Alkollü mekânlar (meyhane/pub/ordugah_cadiri) için: bu havuzdan bir olay
 * yaşamak state.alkol_ziyaret_sayisi'ni artırır; eşiğe ulaşınca (gameEngine.ts
 * AYYAS_ESIGI) karakter kalıcı olarak "ayyaş" damgası yer — bkz. sosyal_meyhane_ayilma
 * (tek çıkış/telafi olayı, sadece o etiketi taşıyanlara açılır).
 */
export const OLAY_SOSYALLESME: OlayTanimi[] = [
  // ============================================================
  // MEYHANE — alkollü · Fransa, Kutsal Roma, Bizans, Osmanlı, Rusya · her iki çağ
  // ============================================================
  {
    id: "sosyal_meyhane_bilek_guresi",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gorsel: "💪",
    baslik: "Bilek Güreşi Bahsi",
    metin: "Meyhanede bilek güreşi turnuvası var. Kazanana içki bedava, kaybedene kahkaha.",
    secenekler: [
      {
        metin: "Meydan oku.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 12,
          mutluluk: 5,
          mesaj: "Rakibi yendin! Meyhane alkışladı, içkiler bedava.",
          detay: "Kolun sızladı, adın yayıldı.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -8,
          mesaj: "Kolun masaya çakıldı; kahkahalar çınladı.",
        },
      },
      {
        metin: "İzle, kazanana bahis oyna.",
        baseBasariSansi: 45,
        maliyet: 5,
        basariliSonuc: {
          para: 10,
          mesaj: "Doğru pehlivanı seçtin; cebine {birim} girdi.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Yanlış pehlivan; paranı meyhaneci aldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_kucuk_hirsiz",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gorsel: "🫴",
    baslik: "Çevik Parmaklar",
    metin: "Kalabalıkta ince parmaklı bir çocuğun elinin kesene uzandığını fark ettin.",
    secenekler: [
      {
        metin: "Bileğini kavra.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Bileğini yakaladın; çocuk özür mırıldanıp kaçtı.",
          detay: "Meyhaneci kadeh ısmarladı.",
        },
        basarisizSonuc: {
          para: -8,
          mesaj: "Çocuk kurtuldu, kesenden birkaç {birim} aldı.",
        },
      },
      {
        metin: "Görmezden gel.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: 1,
          mesaj: "Görmezden geldin; çocuk daha aç birini buldu.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Görmezden gelirken cüzdanın hafifledi.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_gizemli_yabanci",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gizemli: true,
    gorsel: "🎭",
    baslik: "Kukuletalı Yabancı",
    metin: "Köşedeki kukuletalı yabancı seni çağırıyor: 'Senin gibi birine ihtiyacım var.'",
    secenekler: [
      {
        metin: "Yanına otur, dinle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Yabancı diyarlardan söz etti, tuhaf bir sikke bıraktı.",
          detay: "Dünya sandığından büyükmüş.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Sarhoş denizcinin masallarıydı; vakit kaybı.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Temkinli davrandın; yabancı karanlığa çekildi.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Arkandan tuhaf bir kahkaha attı; tedirgin oldun.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_sarki_yarismasi",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    ton: "hafif",
    gorsel: "🎶",
    baslik: "Türkü Yarışması",
    metin: "Ozan şarkı yarışması açıyor. Kalabalık kadeh kaldırdı, sıra sende.",
    secenekler: [
      {
        metin: "Sahneye çık, söyle.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 15,
          mutluluk: 6,
          mesaj: "Sesin meyhaneyi ayağa kaldırdı! Herkes seninle söyledi.",
          detay: "'Şu türkücü' diye fısıldanıyor.",
        },
        basarisizSonuc: {
          un: -8,
          mutluluk: -6,
          mesaj: "Sesin kedi bağırtısına benzedi; kızararak oturdun.",
        },
      },
      {
        metin: "Sadece izle, alkışla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Güzel bir gece geçirdin, rezil olmadan.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Sıradan bir geceydi.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_masa_kavgasi",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    ton: "hafif",
    gorsel: "🪑",
    baslik: "Devrilen Masa",
    metin: "İki sarhoş kim daha çok içti diye tartışırken masa devirmeye başladı. Yumruklar uçuşuyor.",
    secenekler: [
      {
        metin: "Araya gir, ayır.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          ahlak: 4,
          mesaj: "İkisini ayırdın; meyhane sana minnetle baktı.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Araya girerken yumruk yedin, kimden geldiğini görmedin.",
        },
      },
      {
        metin: "Köşeye çekil.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Uzaktan izleyip kadehini kurtardın.",
        },
        basarisizSonuc: {
          saglik: -5,
          para: -3,
          mesaj: "Masa üstüne devrildi; sırtın ağrıdı, kadehin kırıldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_kucuk_kumar",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gorsel: "🃏",
    baslik: "Masa Altı Kâğıt Oyunu",
    metin: "Arka masada yasak bir kâğıt oyunu dönüyor. Sana da sandalye çekiyorlar.",
    secenekler: [
      {
        metin: "Otur, oyna.",
        baseBasariSansi: 45,
        maliyet: 8,
        basariliSonuc: {
          para: 16,
          suc_artis: 3,
          mesaj: "Kâğıtlar senden yana geldi; cebin dolu kalktın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -8,
          suc_artis: 3,
          mesaj: "Kötü el geldi; eli boş kalktın, muhafız gelmedi.",
        },
      },
      {
        metin: "Teşekkür et, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Akıllı davrandın; para ve sicilin sağlam.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Seni korkak diye çekiştirdiler, umursamadın.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_meyhaneci_dedikodu",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gorsel: "🗝️",
    baslik: "Meyhanecinin Fısıltısı",
    metin: "Meyhaneci kadehini doldururken fısıldıyor: {rakip} hakkında ilginç bir şey duymuş.",
    secenekler: [
      {
        metin: "Kulak ver, bir tur ısmarla.",
        baseBasariSansi: 70,
        maliyet: 6,
        basariliSonuc: {
          para: -4,
          rakip_puani: -6,
          mesaj: "İşe yarar bilgi; {rakip} hakkında artık kozun var.",
        },
        basarisizSonuc: {
          para: -6,
          mesaj: "Eski, herkesin bildiği bir dedikoduydu. Para boşa gitti.",
        },
      },
      {
        metin: "İlgilenmediğini söyle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Dedikoduya koşmadın; meyhaneci başkasına döndü.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "İlgisiz görünsen de merak seni gece boyu kemirdi.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_sarhos_filozof",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    ton: "hafif",
    gorsel: "🍷",
    baslik: "Sarhoş Filozof",
    metin: "Yalnız oturan yaşlı bir adam hayatın anlamı üzerine nutuk çekiyor. Kimse dinlemiyor, sen dinliyorsun.",
    secenekler: [
      {
        metin: "Otur, ciddiye al.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ahlak: 6,
          mutluluk: 3,
          mesaj: "Sarhoşluğun ardında gerçek bir bilgelik buldun.",
          detay: "'Az kişi gerçekten yaşar' dedi.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Anladın ki adam yalnız kendi sesini seviyor.",
        },
      },
      {
        metin: "Gülümse, uzaklaş.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Nazikçe uzaklaşıp geceyi huzurla geçirdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Giderken bile arkandan nutka devam etti.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_yarisma_iddiasi",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    ton: "hafif",
    gorsel: "🏆",
    baslik: "Efsanevi İçki İddiası",
    metin: "Meyhanenin kabadayısı kim önce yığılır diye iddiaya giriyor; ödül gecenin hasılatı ve bir unvan.",
    secenekler: [
      {
        metin: "İddiayı kabul et.",
        baseBasariSansi: 35,
        basariliSonuc: {
          para: 22,
          un: 14,
          unvan_kazan: "Kadeh Kralı",
          mesaj: "Rakibin yığıldı, sen ayaktasın! Meyhane çıldırdı.",
          detay: "Başın çatlasa da artık efsanesin.",
        },
        basarisizSonuc: {
          olum_sansi: 4,
          saglik: -20,
          mutluluk: -8,
          mesaj: "Onuncu kadehte yığıldın; günlerce başın çatladı.",
          detay: "Haftalarca 'dünkü çocuk' dendin.",
        },
      },
      {
        metin: "İddiayı reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sağlığını korudun; kabadayı 'sıkıcı' dedi, umursamadın.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Reddetmen bazı çevrelerde korkaklık sayıldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_eski_dost",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gorsel: "🤝",
    baslik: "Masanın Öbür Ucundaki Yüz",
    metin: "Sarhoş bir adam masana gelip uzun sohbet ediyor. Becerikli biri ve iş arıyor.",
    secenekler: [
      {
        metin: "Ekibine teklif et.",
        baseBasariSansi: 60,
        maliyet: 4,
        basariliSonuc: {
          para: -4,
          ekip_ekle: { rol: "Yardımcı", tahminGenisligi: 30 },
          mesaj: "Kabul etti; işine yarar biri çıktı.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "Güldü: 'Yarın beni hatırlamazsın bile.' Haklı çıktı.",
        },
      },
      {
        metin: "Sadece sohbet et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 4,
          mutluluk: 3,
          mesaj: "Yükümlülüksüz, keyifli bir sohbet geçirdiniz.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Sohbet dağınıktı; sabaha pek bir şey hatırlamadın.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_soguk_savas_husumeti",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gorsel: "😤",
    baslik: "Karşı Masadaki Bakışlar",
    metin: "{rakip} karşı masada gözünü senden ayırmıyor, kadehini alayla sana kaldırıyor.",
    secenekler: [
      {
        metin: "Kadeh kaldır, meydan oku.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 8,
          rakip_puani: -8,
          mesaj: "Sözlü düelloyu kazandın; {rakip} öfkeyle çıktı.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -5,
          mesaj: "{rakip}'in dili seni susturdu; rezil oldun.",
        },
      },
      {
        metin: "Görmezden gel.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Tahrike gelmedin; {rakip} ilgisini kaybetti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Görmezden gelmen {rakip}'i azdırdı, gece boyu laf attı.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_yabanci_duello",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    ton: "agir",
    gorsel: "⚔️",
    baslik: "Onur Meselesi",
    metin: "Sarhoş bir yabancı, döktüğün içkiyi bahane edip seni dışarı çağırıyor. Kalabalık bahse bile girdi.",
    secenekler: [
      {
        metin: "Kabul et, dışarı çık.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 14,
          saglik: -8,
          mesaj: "Yabancıyı yere serdin; meyhane seni omuzlarda taşıdı.",
        },
        basarisizSonuc: {
          olum_sansi: 5,
          saglik: -22,
          mesaj: "Yumrukları ağırdı; günlerce yataktan kalkamadın.",
        },
      },
      {
        metin: "Özür dile.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Gururunu bırakıp özür diledin; adam homurdanıp döndü.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Özrün kabul edildi; meyhane seni 'korkak' bildi.",
        },
      },
    ],
  },
  {
    id: "sosyal_meyhane_ayilma",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gerekliEtiketler: ["bagimlilik:ayyas"],
    ton: "agir",
    gorsel: "🌅",
    baslik: "Aynadaki Yabancı",
    metin: "Yine aynı meyhane, aynı tabure. Kirli aynada kendini tanıyamıyorsun; her şeyi bırakmayı düşünüyorsun.",
    secenekler: [
      {
        metin: "Kadehi bırak, toparlan.",
        baseBasariSansi: 45,
        basariliSonuc: {
          ahlak: 12,
          un: 10,
          mutluluk: 4,
          etiket_sil: ["bagimlilik:ayyas"],
          durum_sil: ["ayyaslik"],
          maas_carpani: 1.05,
          mesaj: "Kadehi ittin; başın dik çıktın, kendine dönüyorsun.",
          detay: "Artık haklı çıkmalarına izin yok.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -8,
          mesaj: "Kadeh elinden düşmedi; aynı baş ağrısıyla uyandın.",
        },
      },
      {
        metin: "Düşünceyi kadehle bastır.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 2,
          saglik: -3,
          mesaj: "Düşünceyi bastırdın. Yarın yine buradasın, biliyorsun.",
        },
        basarisizSonuc: {
          saglik: -5,
          mesaj: "İçtin; sabah her zamankinden kötü hissettin.",
        },
      },
    ],
  },

  // ============================================================
  // PUB — alkollü · İngiltere · Sanayi Devrimi
  // ============================================================
  {
    id: "sosyal_pub_dart_turnuvasi",
    kategori: "sosyal",
    sosyallesmeYeri: "pub",
    minYas: 18,
    ton: "hafif",
    gorsel: "🎯",
    baslik: "Dart Turnuvası",
    metin: "Duvardaki dart tahtasında küçük bir turnuva var. Herkes sırasını bekliyor.",
    secenekler: [
      {
        metin: "Sıraya gir, at.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 10,
          mutluluk: 4,
          mesaj: "Oku tam onluğa sapladın! Bar kadeh kaldırdı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Ok tavana saplandı. Bütün pub gülmekten kırıldı.",
        },
      },
      {
        metin: "Bira yudumlayıp izle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Sakin bir akşam geçirdin, rezil olmadan.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Sıradan bir akşamdı.",
        },
      },
    ],
  },
  {
    id: "sosyal_pub_isci_sohbeti",
    kategori: "sosyal",
    sosyallesmeYeri: "pub",
    minYas: 18,
    gorsel: "🏭",
    baslik: "Fabrika İşçilerinin Sofrası",
    metin: "Yan masadaki fabrika işçileri çalışma saatlerine ve ücretlere öfkeleniyor. Biri fikrini soruyor.",
    secenekler: [
      {
        metin: "Onlardan yana konuş.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 6,
          un: 6,
          dost_puani: 4,
          mesaj: "Sözlerin hoşlarına gitti; sana bira ısmarladılar.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Yanlış anlaşıldın, tartışma çıktı; masa değiştirdin.",
        },
      },
      {
        metin: "Tarafsız kal, dinle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Sessizce dinleyip şehrin nabzını tuttun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sessizliğin bazılarına kibir gibi göründü.",
        },
      },
    ],
  },
  {
    id: "sosyal_pub_gizemli_beyefendi",
    kategori: "sosyal",
    sosyallesmeYeri: "pub",
    minYas: 18,
    gizemli: true,
    gorsel: "🎩",
    baslik: "Silindir Şapkalı Adam",
    metin: "Pub'a yakışmayan şık bir adam, kartvizit uzatıp gizemli bir yatırım fırsatından söz ediyor.",
    secenekler: [
      {
        metin: "Dinle, yatırım yap.",
        baseBasariSansi: 50,
        maliyet: 12,
        basariliSonuc: {
          para: 20,
          mesaj: "Adam doğru çıktı; zarfta fazlasıyla kâr geldi.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -12,
          mesaj: "Adam kayboldu; kartvizitteki isim bile sahteydi.",
        },
      },
      {
        metin: "Kibarca reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "İçgüdüne güvendin; adam başka masaya geçti.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Adamın bakışları içini ürpertti.",
        },
      },
    ],
  },
  {
    id: "sosyal_pub_bilardo",
    kategori: "sosyal",
    sosyallesmeYeri: "pub",
    minYas: 18,
    ton: "hafif",
    gorsel: "🎱",
    baslik: "Bilardo Masası",
    metin: "Bilardo masasında yer açıldı. Yerel şampiyon meydan okuyor, küçük bahisler dönüyor.",
    secenekler: [
      {
        metin: "Oyna, yeteneğini göster.",
        baseBasariSansi: 50,
        maliyet: 5,
        basariliSonuc: {
          para: 14,
          un: 6,
          mesaj: "Son topu cebe soktun! Masa alkışladı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -5,
          mesaj: "Elin titredi, top ıskaladı. Şampiyon unvanını korudu.",
        },
      },
      {
        metin: "İzlemekle yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "İyi bir maç izledin, paran riske girmeden.",
        },
        basarisizSonuc: {
          mesaj: "Maç sıkıcıydı, sonunu beklemedin.",
        },
      },
    ],
  },
  {
    id: "sosyal_pub_sarki_korosu",
    kategori: "sosyal",
    sosyallesmeYeri: "pub",
    minYas: 18,
    ton: "hafif",
    gorsel: "🎵",
    baslik: "Ocak Başı Korosu",
    metin: "Piyanist eski bir halk şarkısına başlayınca bütün pub koro oluyor. Kimsenin umurunda değil.",
    secenekler: [
      {
        metin: "Koroya katıl.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 6,
          dost_puani: 3,
          mesaj: "Sesini yükselttin, dertlerini unuttun.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Sözleri bilmesen de eğlendin, kimse fark etmedi.",
        },
      },
      {
        metin: "Kenarda otur, izle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Uzaktan izlemek bile keyifliydi.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Gürültüden başın ağrıdı.",
        },
      },
    ],
  },
  {
    id: "sosyal_pub_kavga_cikar",
    kategori: "sosyal",
    sosyallesmeYeri: "pub",
    minYas: 18,
    gorsel: "🥊",
    baslik: "Sokak Kapısındaki Anlaşmazlık",
    metin: "Kapıdan çıkarken iki müşterinin tartışması yumruklaşmaya dönüyor; tam ortasında kaldın.",
    secenekler: [
      {
        metin: "Araya gir, ayır.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 7,
          ahlak: 5,
          mesaj: "İkisini zor ayırdın; pub sahibi bir bira ısmarladı.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Araya girerken kaçak bir yumruk suratına geldi.",
        },
      },
      {
        metin: "Sıyrıl, karışma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Akıllıca davrandın; kavga kendiliğinden bitti.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "Kaçarken bozuklukların bir kısmı kalabalıkta kayboldu.",
        },
      },
    ],
  },

  // ============================================================
  // HAMAM — alkolsüz · Bizans, Selçuklu, Eyyubiler, Osmanlı · her iki çağ
  // ============================================================
  {
    id: "sosyal_hamam_dedikodu_agi",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🗞️",
    baslik: "Buharın Ardındaki Fısıltılar",
    metin: "Sıcak taşta uzanırken yakınındaki iki kişi şehrin taze dedikodularını fısıldıyor.",
    secenekler: [
      {
        metin: "Sessizce kulak kabart.",
        baseBasariSansi: 75,
        basariliSonuc: {
          etiket_ekle: ["istihbarat_var"],
          mesaj: "İşine yarar bir şey duydun; adımını netleştirdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Yalnızca sıradan bir düğün hazırlığıydı, işe yaramadı.",
        },
      },
      {
        metin: "Kendi huzuruna bak.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 4,
          mutluluk: 3,
          mesaj: "Sıcağın ve buharın tadını çıkardın, zihnin dinlendi.",
        },
        basarisizSonuc: {
          mesaj: "Gürültü rahatlamanı biraz bozdu.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_govde_gosterisi",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    minYas: 17,
    ton: "hafif",
    gorsel: "💦",
    baslik: "Soğuk Su Meydan Okuması",
    metin: "Gençler kim soğuk havuzda daha uzun kalacak diye iddialaşıyor. Sıra sende.",
    secenekler: [
      {
        metin: "Havuza atla, dayan.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          saglik: 3,
          mesaj: "Herkesten uzun dayandın; sudan alkışlarla çıktın.",
        },
        basarisizSonuc: {
          saglik: -6,
          mesaj: "On saniyede titreyerek fırladın; gençler dalga geçti.",
        },
      },
      {
        metin: "Gülümse, kabul etme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Aptalca meydan okumaya kapılmadın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "'Korkak' diye takıldılar, umursamadın.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_evlilik_ciziligi",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    minYas: 20,
    yasakliEtiketler: ["medeni:evli"],
    gorsel: "💌",
    baslik: "Görücü Usulü Fısıltılar",
    metin: "Yaşlı biri seni süzüp yanındakine fısıldıyor; uygun bir eş adayı arıyor, gözü sende.",
    secenekler: [
      {
        metin: "Yaklaş, kimden söz ettiğini sor.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Köklü bir aileden adaylar fısıldadı; ilginç ihtimal.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yaşlı kişi seni beğenmedi, yüzünü buruşturdu.",
        },
      },
      {
        metin: "Gülümse, ilgilenmediğini söyle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Görücülüğe karışmadın, huzurun bozulmadı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yine de arkandan fısıldamaya devam ettiler.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_tellak_sohbeti",
    kategori: "saglik",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🧴",
    baslik: "Tellağın Elleri",
    metin: "Tellak yorgunluğunu fark edip uzun bir masaj öneriyor.",
    secenekler: [
      {
        metin: "Kabul et, öde.",
        baseBasariSansi: 90,
        maliyet: 6,
        basariliSonuc: {
          para: -6,
          saglik: 8,
          mutluluk: 3,
          mesaj: "Haftalık yorgunluk eridi; yeniden doğmuş gibi çıktın.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: 2,
          mesaj: "Biraz sertti ama iyi geldi.",
        },
      },
      {
        metin: "Teşekkür et, kendin yıka.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 3,
          mesaj: "Sade ama dinlendirici bir yıkanma.",
        },
        basarisizSonuc: {
          mesaj: "Aceleyle yıkandın, pek bir şey hissetmedin.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_kaybolan_esya",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🧺",
    baslik: "Boş Sepet",
    metin: "Yıkanıp sepetine dönünce kesenin hafiflediğini fark ediyorsun.",
    secenekler: [
      {
        metin: "Görevliye sor, araştır.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 5,
          mesaj: "Sepetleri karıştıranı buldun; parayı kısmen geri aldın.",
        },
        basarisizSonuc: {
          para: -6,
          mesaj: "Kimse bir şey görmedi. Kayıp senin oldu.",
        },
      },
      {
        metin: "Boş ver.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mesaj: "Kaybı sineye çektin, günü huzurla geçirdin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Boş versen de içinden atamadın.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_yabanci_tuccar",
    kategori: "ticaret",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🌍",
    baslik: "Uzak Diyarların Tüccarı",
    metin: "Yanındaki tuhaf aksanlı bir tüccar, kervanının getirdiği egzotik mallardan söz ediyor.",
    secenekler: [
      {
        metin: "Sohbete gir, bağlantı kur.",
        baseBasariSansi: 65,
        basariliSonuc: {
          para: 8,
          mesaj: "Uzun sohbet ettiniz; hediye bırakıp iş sözü verdi.",
        },
        basarisizSonuc: {
          mesaj: "Dil engeli yüzünden zor anlaştınız ama sohbet sıcaktı.",
        },
      },
      {
        metin: "Sohbeti uzatma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 3,
          mesaj: "Yıkanmanın tadını çıkardın.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir yıkanma.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_asiri_sicak",
    kategori: "saglik",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "🥵",
    baslik: "Göz Kararması",
    metin: "Sıcak odada fazla kaldın; başın dönüyor, gözlerin kararıyor.",
    secenekler: [
      {
        metin: "Zorla, biraz daha kal.",
        baseBasariSansi: 40,
        basariliSonuc: {
          ahlak: 1,
          mutluluk: -1,
          saglik: 6,
          mesaj: "Zorladın ama toparlandın; iyi bir ısınma oldu.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -5,
          mesaj: "Bayılıp yığıldın; soğuk suyla ayılttılar, utandın.",
        },
      },
      {
        metin: "Serin bölüme geç.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 1,
          mutluluk: -1,
          saglik: 4,
          mesaj: "Zamanında müdahale edip toparlandın.",
        },
        basarisizSonuc: {
          saglik: -3,
          mesaj: "Yine de günü baş dönmesiyle geçirdin.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_gizli_toplanti",
    kategori: "siyaset",
    sosyallesmeYeri: "pazar_meydani",
    minAhlak: 0,
    gizemli: true,
    ton: "agir",
    gorsel: "🕵️",
    baslik: "Buhar Arkasındaki Meclis",
    metin: "İç odada birkaç kişi alçak sesle konuşuyor; şehir yönetimine dair tehlikeli bir plan sezinliyorsun.",
    secenekler: [
      {
        metin: "Yaklaş, dinlemeye çalış.",
        baseBasariSansi: 45,
        basariliSonuc: {
          etiket_ekle: ["istihbarat_var"],
          mesaj: "Duyduklarını sakladın; ileride işine yarar.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          rakip_puani: 5,
          mesaj: "Fark edildin; biri tehditkâr baktı, hızla uzaklaştın.",
        },
      },
      {
        metin: "Görmezden gel.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Belaya karışmadın, sakince yıkanmaya devam ettin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Birkaç kelime aklından çıkmadı; tedirgin döndün.",
        },
      },
    ],
  },

  // ============================================================
  // KAHVEHANE — alkolsüz · Osmanlı · Sanayi Devrimi
  // ============================================================
  {
    id: "sosyal_kahvehane_meddah",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "📖",
    baslik: "Meddahın Hikâyesi",
    metin: "Meddah sopasını vurup başlıyor: 'Bir varmış, bir yokmuş...' Kahvehane sessizliğe gömülüyor.",
    secenekler: [
      {
        metin: "Öne otur, kendini kaptır.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Hikâye seni başka dünyaya götürdü; saatler geçti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Hikâye güzeldi ama aklın başka yerdeydi.",
        },
      },
      {
        metin: "Kahveni yudumla, yarım dinle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Sakin bir akşam geçirdin.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir akşam.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_tavla",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "🎲",
    baslik: "Tavla Şakırtısı",
    metin: "Köşedeki masada seni tavlaya çağırıyorlar. Zarlar hazır, etraf izlemeye başlamış.",
    secenekler: [
      {
        metin: "Otur, oyna.",
        baseBasariSansi: 50,
        maliyet: 3,
        basariliSonuc: {
          para: 7,
          mutluluk: 3,
          mesaj: "Zarlar yüzüne güldü, kazandın. İzleyenler tebrik etti.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Zarlar bu sefer yardım etmedi, kaybettin.",
        },
      },
      {
        metin: "İzle, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: 1,
          mesaj: "Keyifli bir izleyici oldun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Pek bir şey olmadı.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_falci_telve",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gizemli: true,
    gorsel: "☕",
    baslik: "Telvedeki Şekiller",
    metin: "Yaşlı kadın fincanını istiyor: 'Telvene bakayım evladım.' Fincanı çevirip bekliyorsunuz.",
    secenekler: [
      {
        metin: "Fincanı uzat, baktır.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Fincanda 'uzun yol ve beklenmedik kazanç' var.",
          detay: "Adımların biraz hafifledi.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Kadın 'söylemesem daha iyi' dedi; merak seni kemirdi.",
        },
      },
      {
        metin: "Teşekkür et, baktırma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Kaderini bir fincan telveye bırakmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kadın biraz gücendi ama önemli değil.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_siyaset_tartismasi",
    kategori: "siyaset",
    sosyallesmeYeri: "pazar_meydani",
    ton: "agir",
    gorsel: "📰",
    baslik: "Gazete Etrafında Tartışma",
    metin: "Elden ele dolaşan bir gazete kahvehanede sert tartışma başlatıyor. Senden de görüş bekleniyor.",
    secenekler: [
      {
        metin: "Fikrini söyle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          rakip_puani: 4,
          mesaj: "Kimi alkışladı, kimi küfretti; ama artık tanınıyorsun.",
        },
        basarisizSonuc: {
          ahlak: -3,
          mutluluk: -4,
          mesaj: "Tartışma yumruğa varacaktı; kahveci araya girdi.",
        },
      },
      {
        metin: "Tarafsız kal, dinle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Fikrini saklayıp görüşleri zihninde tarttın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sessizliğin kimsenin dikkatini çekmedi.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_ticaret_firsati",
    kategori: "ticaret",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "📦",
    baslik: "Duyulan Fırsat",
    metin: "Yan masadaki tüccarlar yeni gelen bir mal partisinden ve iyi fiyattan söz ediyor. Kulak misafiri oldun.",
    secenekler: [
      {
        metin: "Katıl, fırsatı değerlendir.",
        baseBasariSansi: 60,
        maliyet: 10,
        basariliSonuc: {
          para: 16,
          mesaj: "Fırsat iyiymiş; yatırdığından fazlasını geri aldın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Mal beklenmedik çıktı; yatırımın boşa gitti.",
        },
      },
      {
        metin: "Sadece dinle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -2,
          mesaj: "Riske girmeden kahveni yudumladın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Fırsatı kaçırmış olabilirsin ama pişman değilsin.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_nargile_arkadasligi",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "💨",
    baslik: "Paylaşılan Nargile",
    metin: "Yalnız yaşlı bir adam nargilesini sana uzatıp 'buyur' diyor. Sohbet dumanla birlikte koyulaşıyor.",
    secenekler: [
      {
        metin: "Otur, sohbete katıl.",
        baseBasariSansi: 85,
        basariliSonuc: {
          dost_puani: 5,
          mutluluk: 4,
          mesaj: "Saatlerce konuştunuz; adamın hikâyesi sende iz bıraktı.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sohbet kısa sürdü ama hoştu.",
        },
      },
      {
        metin: "Teşekkür et, masana dön.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Tek başına sakin bir akşam geçirdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Adamın hayal kırıklığı aklından çıkmadı.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_haber_soylentisi",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "📯",
    baslik: "Kapıdan Gelen Haber",
    metin: "Biri soluk soluğa uzak bir mahalledeki olayı anlatıyor; herkes dinliyor, sen de meraklısın.",
    secenekler: [
      {
        metin: "Yaklaş, detayları öğren.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Şehrin nabzını tuttun; adımın daha bilinçli olacak.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Haber çoktan abartılmıştı; gerçek sıradandı.",
        },
      },
      {
        metin: "Kendi işine bak.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Dedikoduya kapılmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yine de kulağına birkaç kelime çalındı.",
        },
      },
    ],
  },

  // ============================================================
  // KERVANSARAY — alkolsüz · Selçuklu, Eyyubiler, Bizans · Orta Çağ
  // ============================================================
  {
    id: "sosyal_kervansaray_uzak_diyar_tuccari",
    kategori: "ticaret",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🏮",
    baslik: "İpek Yolu Tüccarı",
    metin: "Avluda mal sergileyen tüccar, aylardır aştığı çölleri anlatıyor. Denklerinde göz kamaştırıcı kumaşlar var.",
    secenekler: [
      {
        metin: "Pazarlığa gir, mal al.",
        baseBasariSansi: 55,
        maliyet: 14,
        basariliSonuc: {
          para: 22,
          mesaj: "Pazarlıkla aldın, kumaşları şehirde iyi fiyata sattın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -14,
          mesaj: "Pazarlığı kazandın sandın; mal göründüğü gibi çıkmadı.",
        },
      },
      {
        metin: "Sohbet et, hikâyelerini dinle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -2,
          mesaj: "Anlattığı diyarlar hayal gücünü genişletti.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yorgun tüccar pek konuşkan değildi.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_gezgin_hikayeci",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gizemli: true,
    gorsel: "🧭",
    baslik: "Yollarda Yaşlanmış Adam",
    metin: "Ateş başında yaşlı bir gezgin, gördüğü garip diyarları anlatıyor. Sesi büyüleyici.",
    secenekler: [
      {
        metin: "Ateşin başına otur, dinle.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Gerçekle efsane birbirine karıştı; dünya büyükmüş.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Hikâyeler uzadı, sonunda uykuya yenik düştün.",
        },
      },
      {
        metin: "Erken yat, dinlen.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 4,
          mesaj: "İyi uyudun.",
        },
        basarisizSonuc: {
          mesaj: "Kervansarayın gürültüsü uyutmadı.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_koruma_teklifi",
    kategori: "ticaret",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🛡️",
    baslik: "Kervan Koruma Teklifi",
    metin: "Bir kervan reisi sabah yola çıkacak kafilesine eskort olup olamayacağını soruyor. Ödül cazip, yol tehlikeli.",
    secenekler: [
      {
        metin: "Teklifi kabul et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: -7,
          para: 18,
          un: 3,
          mesaj: "Kervan sağ ulaştı; reis vaadinden fazlasını ödedi.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          saglik: -10,
          para: 6,
          mesaj: "Eşkıya baskınında kervanı korudun ama yara aldın.",
        },
      },
      {
        metin: "Teşekkür et, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Rahat bir gece geçirmeyi seçtin.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Reis biraz hayal kırıklığına uğradı.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_calinan_mal",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🎒",
    baslik: "Karanlıkta Bir Gölge",
    metin: "Gece yarısı denklerin arasında dolaşan bir gölge fark ediyorsun. Avluda tek başınasın.",
    secenekler: [
      {
        metin: "Üstüne yürü, seslen.",
        baseBasariSansi: 55,
        basariliSonuc: {
          para: 8,
          un: 5,
          mesaj: "Hırsız çaldıklarını bırakıp kaçtı; sahibi teşekkür etti.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Gölge çoktan gitmişti; sabah bazı eşyalar eksikti.",
        },
      },
      {
        metin: "Görmezden gel, kapını kilitle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kendi eşyanı koruyup karışmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Her sesi hırsız sanıp gece boyu uyuyamadın.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_dil_pazarligi",
    kategori: "ticaret",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🗣️",
    baslik: "Ortak Dil Aramak",
    metin: "Ortak dil bilmediğin bir tüccarla el kol hareketleri ve gülüşmelerle anlaşmaya çalışıyorsun.",
    secenekler: [
      {
        metin: "Israrla pazarlık et.",
        baseBasariSansi: 60,
        maliyet: 8,
        basariliSonuc: {
          para: 4,
          mesaj: "İyi fiyata anlaştınız, kahkahayla tokalaştınız!",
        },
        basarisizSonuc: {
          para: -8,
          mesaj: "Anlaşma olmadı ama çok güldünüz.",
        },
      },
      {
        metin: "Vazgeç, başka tezgâha git.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Vaktini boşa harcamadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Biraz kaba davranmış olabilirsin.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_deve_yarisi",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "🐫",
    baslik: "Avluda Deve Yarışı",
    metin: "Sıkılan kervan üyeleri avluda deve yarışı düzenlemiş. Bahisler açık, kazanana gecenin en iyi yemeği.",
    secenekler: [
      {
        metin: "Bahis oyna, deveni seç.",
        baseBasariSansi: 45,
        maliyet: 5,
        basariliSonuc: {
          para: 10,
          mutluluk: 3,
          mesaj: "Seçtiğin deve tozu dumana kattı! En iyi yemek senin.",
        },
        basarisizSonuc: {
          para: -5,
          mutluluk: -2,
          mesaj: "Deven yarı yolda oturdu ama çok güldün.",
        },
      },
      {
        metin: "İzle, gülümse.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Hiçbir şey kaybetmeden güldün.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir akşam.",
        },
      },
    ],
  },

  // ============================================================
  // ORDUGÂH ÇADIRI — alkollü · sadece Asker · her iki çağ, tüm bölgeler
  // ============================================================
  {
    id: "sosyal_ordugah_bilek_guresi_komutan",
    kategori: "sosyal",
    sosyallesmeYeri: "ordugah_cadiri",
    minYas: 18,
    ton: "hafif",
    gorsel: "💪",
    baslik: "Ateş Başında Meydan Okuma",
    metin: "Nöbet arasında askerler ateş başında bilek güreşi yapıyor. En güçlü asker seni işaret ediyor.",
    secenekler: [
      {
        metin: "Meydan oku, gücünü göster.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 10,
          dost_puani: 5,
          mesaj: "Rakibi yendin! Birlik seni omuzladı, saygı kazandın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Yenildin ama iyi dövüştün; askerler sırtını sıvazladı.",
        },
      },
      {
        metin: "İzle, tezahürat et.",
        baseBasariSansi: 95,
        basariliSonuc: {
          dost_puani: 2,
          mesaj: "Keyifli bir akşam geçirdin.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir akşam.",
        },
      },
    ],
  },
  {
    id: "sosyal_ordugah_kart_oyunu",
    kategori: "sosyal",
    sosyallesmeYeri: "ordugah_cadiri",
    minYas: 18,
    gorsel: "🃏",
    baslik: "Nöbet Arası Kâğıt",
    metin: "Çadırda birkaç asker maaşını masaya koyup kâğıt oynuyor. Sana da yer açıyorlar.",
    secenekler: [
      {
        metin: "Otur, oyna.",
        baseBasariSansi: 45,
        maliyet: 6,
        basariliSonuc: {
          para: 14,
          suc_artis: 2,
          mesaj: "Kâğıtlar senden yana geldi, herkesin parasını topladın.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -6,
          suc_artis: 2,
          mesaj: "Kötü gece; maaşının bir kısmı onlarda kaldı.",
        },
      },
      {
        metin: "İzle, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -2,
          mesaj: "Maaşını cebinde tuttun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Askerler biraz takıldı, önemsemedin.",
        },
      },
    ],
  },
  {
    id: "sosyal_ordugah_savas_hikayeleri",
    kategori: "sosyal",
    sosyallesmeYeri: "ordugah_cadiri",
    minYas: 18,
    ton: "hafif",
    gorsel: "🔥",
    baslik: "Abartılan Savaş Hikâyeleri",
    metin: "Kadeh döndükçe savaş hikâyeleri büyüyor. Sıra sana gelince bütün gözler üzerinde.",
    secenekler: [
      {
        metin: "Hikâyeni büyüterek anlat.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 10,
          mutluluk: 3,
          mesaj: "Hikâyen çadırı susturdu; sonunda kadeh kaldırdılar.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Abartın, silah arkadaşının anlattığıyla çelişti; herkes güldü.",
        },
      },
      {
        metin: "Mütevazı kal, sade anlat.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 3,
          mesaj: "Sade anlatımın samimi bulundu.",
        },
        basarisizSonuc: {
          mesaj: "Sıkıcı bulundun ama önemli değil.",
        },
      },
    ],
  },
  {
    id: "sosyal_ordugah_kacak_icki",
    kategori: "sosyal",
    sosyallesmeYeri: "ordugah_cadiri",
    minYas: 18,
    gorsel: "🍶",
    baslik: "Çadırın Dibindeki Testi",
    metin: "Bir asker çadırın dibinden gizli bir testi çıkarıyor; kurallara aykırı ama kimse görmez gibi.",
    secenekler: [
      {
        metin: "Kadehini uzat, katıl.",
        baseBasariSansi: 70,
        basariliSonuc: {
          dost_puani: 6,
          mutluluk: 3,
          suc_artis: 2,
          mesaj: "Kimse görmedi; birlikle bağların güçlendi.",
        },
        basarisizSonuc: {
          suc_artis: 6,
          un: -5,
          mesaj: "Nöbetçi subay girdi; adın disiplin defterine yazıldı.",
        },
      },
      {
        metin: "Kurallara uy, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Disiplinini korudun, riske girmedin.",
        },
        basarisizSonuc: {
          dost_puani: -3,
          mesaj: "Diğer askerler 'kuralcı' diye takıldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_ordugah_nobetci_sakasi",
    kategori: "sosyal",
    sosyallesmeYeri: "ordugah_cadiri",
    minYas: 18,
    ton: "hafif",
    gorsel: "😈",
    baslik: "Nöbetçiye Şaka",
    metin: "Arkadaşların en ciddi nöbetçiye şaka yapmayı planlıyor; senden yardım istiyorlar.",
    secenekler: [
      {
        metin: "Plana katıl, şakayı yap.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 5,
          dost_puani: 6,
          mesaj: "Şaka mükemmel işledi! Nöbetçinin çığlığı kampı güldürdü.",
        },
        basarisizSonuc: {
          un: -6,
          saglik: -3,
          mesaj: "Nöbetçi seni yakaladı; ceza olarak ekstra nöbet tuttun.",
        },
      },
      {
        metin: "Katılma, uykuna bak.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "İyi uyudun.",
        },
        basarisizSonuc: {
          dost_puani: -2,
          mesaj: "Arkadaşların 'eğlenceyi bilmez' diye takıldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_ordugah_yabanci_asker_dostlugu",
    kategori: "sosyal",
    sosyallesmeYeri: "ordugah_cadiri",
    minYas: 18,
    gizemli: true,
    ton: "agir",
    gorsel: "🕊️",
    baslik: "Ateşkes Gecesi",
    metin: "Ateşkes gecesi karşı taraftan bir asker ateşe yaklaşıp içkisini paylaşmak istiyor. Komutanlar sevmezdi.",
    secenekler: [
      {
        metin: "Kadehini paylaş, konuş.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Bu gece iki insandınız; savaşa bakışın değişti.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Konuşma tıkandı; ikiniz de kendi ateşinize döndünüz.",
        },
      },
      {
        metin: "Mesafeni koru, uzaklaş.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Emirlere sadık kaldın, riske girmedin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "O askerin yorgun gözlerini unutamadın.",
        },
      },
    ],
  },
  {
    id: "sosyal_ordugah_kehanetci_falci",
    kategori: "sosyal",
    sosyallesmeYeri: "ordugah_cadiri",
    minYas: 18,
    gizemli: true,
    gorsel: "🔮",
    baslik: "Ordugâhın Falcısı",
    metin: "Birlikler arasında dolaşan yaşlı falcı, avucuna baktığı her askere kehanet fısıldıyor. Sıra sende.",
    secenekler: [
      {
        metin: "Avucunu uzat, dinle.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: 4,
          un: 4,
          mesaj: "'Adın uzun anılacak' dedi; içine güven doldu.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kadın avucuna baktı, yüzü asıldı; uykun kaçtı.",
        },
      },
      {
        metin: "Boş inanca vaktin yok, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Kaderine falcı değil kendi kılıcın karar verir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yine de askerlerin fısıltıları kulağına çalındı.",
        },
      },
    ],
  },
  {
    id: "sosyal_ordugah_ates_basinda_yemin",
    kategori: "sosyal",
    sosyallesmeYeri: "ordugah_cadiri",
    minYas: 18,
    gorsel: "🤞",
    baslik: "Kardeşlik Yemini",
    metin: "Kadehler kalkarken silah arkadaşların birbirinize her koşulda sahip çıkma yemini öneriyor.",
    secenekler: [
      {
        metin: "Kadehini kaldır, yemin et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 10,
          mutluluk: 4,
          mesaj: "Kadehler tokuştu, sözler ciddiydi; bağınız sarsılmaz.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Yemin dağınık geçti ama niyet güzeldi.",
        },
      },
      {
        metin: "Gülümseyerek izle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Büyük sözlere sessiz saygıyı tercih ettin.",
        },
        basarisizSonuc: {
          dost_puani: -2,
          mesaj: "Diğerleri biraz gücendi.",
        },
      },
    ],
  },

  // ============================================================
  // CEMAAT SOFRASI — alkolsüz · sadece Din Adamı · her iki çağ
  // ============================================================
  {
    id: "sosyal_dini_gunah_itirafi",
    kategori: "din",
    sosyallesmeYeri: "dini_meclis",
    gorsel: "🕯️",
    baslik: "Sofra Sonrası İtiraf",
    metin: "Yemekten sonra genç bir meslektaşın, kimseye söylemediği bir günahını itiraf etmek istiyor.",
    secenekler: [
      {
        metin: "Dinle, öğüt ver.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 6,
          nufuz_artis: 8,
          mesaj: "Sözlerin huzur verdi; cemaatte saygınlığın büyüdü.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Doğru kelimeleri bulamadın; adam daha huzursuz ayrıldı.",
        },
      },
      {
        metin: "Vaktin olmadığını söyle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kendi huzuruna öncelik verdin.",
        },
        basarisizSonuc: {
          ahlak: -2,
          mesaj: "Genç meslektaş hayal kırıklığını gizleyemedi.",
        },
      },
    ],
  },
  {
    id: "sosyal_dini_hayirsever_teklifi",
    kategori: "din",
    sosyallesmeYeri: "dini_meclis",
    gorsel: "🤲",
    baslik: "Zengin Bir Bağışçı",
    metin: "Sofradaki zengin bir hayırsever yeni bir hayır işine ortak olmak ister misin diye soruyor.",
    secenekler: [
      {
        metin: "Kabul et, katkı ver.",
        baseBasariSansi: 70,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          un: 12,
          ahlak: 6,
          mesaj: "Bağışın konuşuldu; cemaatte cömert diye anıldın.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Bağışın toplandı ama beklediğin ilgiyi görmedi.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Paranı korudun, sade bir akşam geçirdin.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Hayırsever biraz kırıldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_dini_rakip_vaiz",
    kategori: "din",
    sosyallesmeYeri: "dini_meclis",
    gorsel: "⚖️",
    baslik: "Doktrin Tartışması",
    metin: "Başka bölgeden gelen bir vaiz sofrada seninkinden farklı bir yorum savunuyor. Tartışma ciddileşiyor.",
    secenekler: [
      {
        metin: "Görüşünü kararlılıkla savun.",
        baseBasariSansi: 55,
        basariliSonuc: {
          nufuz_artis: 10,
          un: 6,
          mesaj: "Argümanların herkesi ikna etti; rakip vaiz başını eğdi.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -4,
          mesaj: "Tartışmayı kaybettin; bakışlarda hayal kırıklığı vardı.",
        },
      },
      {
        metin: "Konuyu değiştir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Gereksiz çatışmadan kaçındın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Bazıları kaçtığını düşündü; önemli değil.",
        },
      },
    ],
  },
  {
    id: "sosyal_dini_gizli_yazma",
    kategori: "din",
    sosyallesmeYeri: "dini_meclis",
    gizemli: true,
    gorsel: "📜",
    baslik: "Tozlu Bir El Yazması",
    metin: "Sofra kenarındaki eski sandıkta kimsenin fark etmediği tozlu bir el yazması buluyorsun. Sayfalar kırılgan.",
    secenekler: [
      {
        metin: "Dikkatle incele, oku.",
        baseBasariSansi: 65,
        basariliSonuc: {
          nufuz_artis: 5,
          mesaj: "Yazma unutulmuş bir öğretiye ışık tuttu.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yazının çoğu çürümüş, okunacak pek bir şey kalmamış.",
        },
      },
      {
        metin: "Yerine bırak, karışma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Merakını bastırıp sofraya döndün.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sandığın sakladığını hiç öğrenemeyeceksin.",
        },
      },
    ],
  },
  {
    id: "sosyal_dini_cemaat_dedikodusu",
    kategori: "sosyal",
    sosyallesmeYeri: "dini_meclis",
    gorsel: "🗣️",
    baslik: "Sofra Dedikodusu",
    metin: "Meslektaşların, cemaatten birkaç ailenin anlaşmazlığını konuşuyor; senden de fikir istiyorlar.",
    secenekler: [
      {
        metin: "Arabuluculuk teklif et.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 8,
          ahlak: 4,
          mesaj: "İki aile arasında köprü kurdun; cemaat seni bilge saydı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Araya girmen işi karıştırdı; iki taraf da uzaklaştı.",
        },
      },
      {
        metin: "Karışma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Cemaat meselesine bulaşmadın.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Bazıları daha fazla ilgi bekliyordu.",
        },
      },
    ],
  },
  {
    id: "sosyal_dini_mucize_soylentisi",
    kategori: "din",
    sosyallesmeYeri: "dini_meclis",
    ton: "hafif",
    gorsel: "✨",
    baslik: "Mucize Söylentisi",
    metin: "Bir meslektaşın heyecanla anlatıyor: senin duandan sonra hasta bir çocuk iyileşmiş, mucizeymiş.",
    secenekler: [
      {
        metin: "Alçakgönüllü kal, düzeltme.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 6,
          un: 5,
          mesaj: "'Tanrı'nın işi' dedin; tevazun söylentiyi aştı.",
        },
        basarisizSonuc: {
          un: 3,
          mesaj: "Söylenti sürdü, sen rahatsız hissettin.",
        },
      },
      {
        metin: "Söylenti büyüsün.",
        baseBasariSansi: 55,
        basariliSonuc: {
          ahlak: 3,
          un: 14,
          mesaj: "Söylenti yayıldı; adına 'mucizevi' sıfatı eklendi.",
        },
        basarisizSonuc: {
          ahlak: -8,
          un: -6,
          mesaj: "Aile gerçeği anlattı; şişen söylenti geri tepti.",
        },
      },
    ],
  },

  // ============================================================
  // LONCA MECLİSİ — alkolsüz · sadece Tüccar · her iki çağ
  // ============================================================
  {
    id: "sosyal_lonca_fiyat_savasi",
    kategori: "ticaret",
    sosyallesmeYeri: "lonca_meclisi",
    gorsel: "📊",
    baslik: "Fiyat Anlaşmazlığı",
    metin: "Lonca toplantısında bazı esnaf fiyatlara ortak taban öneriyor, bazıları şiddetle karşı. Karar sende.",
    secenekler: [
      {
        metin: "Ortak fiyat tabanını destekle.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ticaret_sermaye_artis: 10,
          dost_puani: 3,
          mesaj: "Öneri kabul edildi; işler daha öngörülebilir.",
        },
        basarisizSonuc: {
          rakip_puani: 5,
          mesaj: "Öneri reddedildi; seni 'rekabetten korkan' dediler.",
        },
      },
      {
        metin: "Serbest rekabeti savun.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ticaret_sermaye_artis: 14,
          mesaj: "Serbest rekabet kazandı; cesur esnafa kapılar açıldı.",
        },
        basarisizSonuc: {
          ahlak: -3,
          mesaj: "Küçük esnaf zarar gördüğünü söyleyip küstü.",
        },
      },
    ],
  },
  {
    id: "sosyal_lonca_yeni_ortaklik",
    kategori: "ticaret",
    sosyallesmeYeri: "lonca_meclisi",
    gorsel: "🤝",
    baslik: "Ortaklık Teklifi",
    metin: "Loncanın saygın isimlerinden biri ortak iş kurmayı teklif ediyor. Kâr paylaşımlı ama riskli.",
    secenekler: [
      {
        metin: "Kabul et, imzala.",
        baseBasariSansi: 55,
        maliyet: 15,
        basariliSonuc: {
          mutluluk: -4,
          un: -2,
          para: 26,
          ticaret_sermaye_artis: 8,
          mesaj: "Ortaklık ilk aydan kâr getirdi; itibarın yükseldi.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          mesaj: "Beklenen kâr gelmedi; sermayen eridi.",
        },
      },
      {
        metin: "Reddet, düşüneceğini söyle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -2,
          mesaj: "Sermayeni riske atmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Adam başka ortakla kâr etti; içinde pişmanlık kaldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_lonca_rakip_husumeti",
    kategori: "ticaret",
    sosyallesmeYeri: "lonca_meclisi",
    gorsel: "😠",
    baslik: "Rakibin Suçlaması",
    metin: "{rakip}, toplantıda herkesin önünde seni haksız rekabetle suçluyor. Bütün gözler üzerinde.",
    secenekler: [
      {
        metin: "Savun, delillerini göster.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 8,
          rakip_puani: -8,
          mesaj: "Delillerin suçlamayı çürüttü; {rakip} küçüldü.",
        },
        basarisizSonuc: {
          un: -10,
          ahlak: -4,
          mesaj: "Savunman ikna etmedi; adın loncada bir süre lekelendi.",
        },
      },
      {
        metin: "Sakin kal, cevap verme.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 4,
          mesaj: "Sükûnetin ikna edici oldu; kimse ciddiye almadı.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Sessizliğin kabullenme sayıldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_lonca_gizli_ticaret_yolu",
    kategori: "ticaret",
    sosyallesmeYeri: "lonca_meclisi",
    gizemli: true,
    gorsel: "🗺️",
    baslik: "Fısıldanan Yeni Yol",
    metin: "Bir esnaf, kimsenin bilmediği yeni bir ticaret yolunu biliyor ama bedel istiyor.",
    secenekler: [
      {
        metin: "Bedeli öde, bilgiyi al.",
        baseBasariSansi: 65,
        maliyet: 12,
        basariliSonuc: {
          para: -8,
          ticaret_sermaye_artis: 12,
          mesaj: "Bilgi doğruydu; mallar artık çok daha ucuza geliyor.",
        },
        basarisizSonuc: {
          para: -12,
          mesaj: "Yol yoktu ya da herkes biliyordu; para boşa gitti.",
        },
      },
      {
        metin: "Şüpheyle reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Paranı riske atmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Belki değerli bir fırsatı kaçırdın.",
        },
      },
    ],
  },
  {
    id: "sosyal_lonca_sahte_mal_iddiasi",
    kategori: "ticaret",
    sosyallesmeYeri: "lonca_meclisi",
    ton: "agir",
    gorsel: "⚠️",
    baslik: "Sahtecilik İddiası",
    metin: "Bir müşteri loncaya şikâyet etti: sattığın mallardan biri sahteymiş. Meclis açıklama bekliyor.",
    secenekler: [
      {
        metin: "Gerçeği söyle, hatanı kabul et.",
        baseBasariSansi: 70,
        basariliSonuc: {
          ahlak: 8,
          un: -4,
          mesaj: "Hatayı kabul edip tazminat ödedin; lonca takdir etti.",
        },
        basarisizSonuc: {
          para: -10,
          un: -6,
          mesaj: "İtirafa rağmen bazı esnaf seni eskisi gibi görmedi.",
        },
      },
      {
        metin: "İnkâr et, suçu tedarikçiye at.",
        baseBasariSansi: 50,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "İddia kanıtlanamadı; için sızlasa da itibarın sağlam.",
        },
        basarisizSonuc: {
          ahlak: -12,
          un: -14,
          mesaj: "Yalanın ortaya çıktı; loncadaki güvenin ciddi sarsıldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_lonca_baskanlik_adayligi",
    kategori: "siyaset",
    sosyallesmeYeri: "lonca_meclisi",
    minUn: 30,
    gorsel: "🏛️",
    baslik: "Başkanlık Sözü",
    metin: "Loncanın yaşlı başkanı emekliliği düşünüyor; aday isimler arasında seninki de var. Aday olur musun?",
    secenekler: [
      {
        metin: "Aday ol, kampanya yap.",
        baseBasariSansi: 50,
        maliyet: 10,
        basariliSonuc: {
          un: 16,
          para: -10,
          nufuz_artis: 0,
          mesaj: "Seçimi kazandın! Loncanın sözü geçenlerindensin.",
        },
        basarisizSonuc: {
          para: -10,
          un: -4,
          mesaj: "Seçimi kaybettin; para ve emek boşa gitti.",
        },
      },
      {
        metin: "Şimdilik geri çekil.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Zamanının henüz gelmediğini düşündün.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Bazıları fırsatı kaçırdığını düşünüyor.",
        },
      },
    ],
  },

  // ============================================================
  // PAZAR MEYDANI — alkolsüz · meslekten bağımsız · her iki çağ, tüm bölgeler
  // ============================================================
  {
    id: "sosyal_pazar_soytari_gosterisi",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "🤡",
    baslik: "Meydan Soytarısı",
    metin: "Meydanda bir soytarı akrobasiyle kalabalığı topluyor; sonunda seyirciden birini gösterisine katmak istiyor.",
    secenekler: [
      {
        metin: "Gönüllü ol, sahneye çık.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 5,
          un: 6,
          mesaj: "Soytarıyla kalabalığı güldürdün; meydan alkışladı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Sakarlığın herkesi güldürdü ama seninle değil, sana.",
        },
      },
      {
        metin: "Kalabalıkta kal, izle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Keyifli bir gösteri izledin.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir gösteriydi.",
        },
      },
    ],
  },
  {
    id: "sosyal_pazar_kayip_cocuk",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🧒",
    baslik: "Kalabalıkta Kaybolan Çocuk",
    metin: "Ağlayan küçük bir çocuk annesini/babasını kaybettiğini söylüyor. Kimse yardım etmiyor.",
    secenekler: [
      {
        metin: "Ailesini bulmasına yardım et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 8,
          un: 6,
          mesaj: "Ailesini buldun; minnettar ebeveyni seni kucakladı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Ailesini bulamadın; çocuğu bekçiye emanet ettin.",
        },
      },
      {
        metin: "Vaktin yok, geç.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kendi işine devam ettin.",
        },
        basarisizSonuc: {
          ahlak: -3,
          mesaj: "Çocuğun ağlamaklı yüzü aklından çıkmadı.",
        },
      },
    ],
  },
  {
    id: "sosyal_pazar_yankesici_kovalamaca",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "🏃",
    baslik: "Meydanda Kovalamaca",
    metin: "Bir yankesici yaşlı tüccarın kesesini kapıp koşuyor. 'Tutun onu!' diye bağırışlar yükseliyor.",
    secenekler: [
      {
        metin: "Peşinden koş, yakala.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 12,
          ahlak: 5,
          mesaj: "Onu yakaladın! Meydan seni kahraman ilan etti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Kalabalıkta kayboldu; nefes nefese kaldın, herkes güldü.",
        },
      },
      {
        metin: "Karışma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Olaya karışmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Bazıları yardım edebileceğini düşündü.",
        },
      },
    ],
  },
  {
    id: "sosyal_pazar_sarlatan_iksir",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "🧪",
    baslik: "Mucize İksir Satıcısı",
    metin: "Rengârenk bir arabadan bağıran şarlatan her derde deva 'mucize iksir' satıyor. Çok ikna edici.",
    secenekler: [
      {
        metin: "Bir şişe al, dene.",
        baseBasariSansi: 35,
        maliyet: 6,
        basariliSonuc: {
          saglik: 10,
          mesaj: "İşe yaradı, inanılmaz! Çok zinde hissediyorsun.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: -3,
          mesaj: "İksir boğazını yaktı, işe yaramadı; şarlatan kaybolmuş.",
        },
      },
      {
        metin: "Şüpheyle uzaklaş.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Sağduyulu davrandın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Belki gerçekten kaçırdığın bir fırsattı.",
        },
      },
    ],
  },
  {
    id: "sosyal_pazar_halk_ozani",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    ton: "hafif",
    gorsel: "🎻",
    baslik: "Gezgin Ozan",
    metin: "Meydanda bir ozan bölgenle ilgili komik bir türkü söylüyor; kalabalık gülerek eşlik ediyor.",
    secenekler: [
      {
        metin: "Bahşiş ver, istekte bulun.",
        baseBasariSansi: 85,
        maliyet: 4,
        basariliSonuc: {
          para: -4,
          mutluluk: 4,
          mesaj: "Ozan sana özel bir dörtlük besteledi; meydan gülümsedi.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "Ozan isteği yanlış anladı; garip ama eğlenceli oldu.",
        },
      },
      {
        metin: "Uzaktan dinle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Bedava bir keyif aldın.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir andı.",
        },
      },
    ],
  },
  {
    id: "sosyal_pazar_kehanetci_kadin",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gizemli: true,
    gorsel: "🌙",
    baslik: "Kalabalıktaki Kâhin",
    metin: "Meydanda oturan esrarengiz bir kadın seni işaret ediyor: 'Sana bir şey görüyorum evlat, gel.'",
    secenekler: [
      {
        metin: "Yanına git, otur.",
        baseBasariSansi: 75,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Muğlak ama umut verici bir şey söyledi; için ısındı.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Sözleri seni tedirgin etti; geceleri aklından çıkmadı.",
        },
      },
      {
        metin: "Uzaklaş, ilgilenme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Kaderini bir yabancıya emanet etmedin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yine de arkandan baktığını hissettin.",
        },
      },
    ],
  },
  {
    id: "sosyal_pazar_meydan_kavgasi",
    kategori: "sosyal",
    sosyallesmeYeri: "pazar_meydani",
    gorsel: "🥊",
    baslik: "Tezgâhlar Arası Kavga",
    metin: "İki tezgâh sahibinin kavgası itiş kakışa dönüyor; meyve sebze havada uçuşuyor.",
    secenekler: [
      {
        metin: "Araya gir, ayır.",
        baseBasariSansi: 60,
        basariliSonuc: {
          un: 8,
          ahlak: 4,
          mesaj: "İkisini yatıştırdın; meydan seni alkışladı.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Uçan bir lahana suratına çarptı; boşuna araya girdin.",
        },
      },
      {
        metin: "Uzaktan izle, eğlen.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Komik bir manzaraydı; güvenle izledin.",
        },
        basarisizSonuc: {
          mesaj: "Kavga kendiliğinden bitti.",
        },
      },
    ],
  },

  // ============================================================
  // SOYLU SALONU — alkolsüz(görece) · Fransa, Kutsal Roma, Bizans, İngiltere · her iki çağ
  // ============================================================
  {
    id: "sosyal_salon_entrika_fisiltisi",
    kategori: "siyaset",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gizemli: true,
    gorsel: "🕯️",
    baslik: "Perde Arkasındaki Fısıltı",
    metin: "Salonun loş köşesinde iki soylu alçak sesle entrika çeviriyor. Seni de ilgilendirebilir.",
    secenekler: [
      {
        metin: "Yaklaş, dinle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          etiket_ekle: ["istihbarat_var"],
          mesaj: "Duyduklarınla salondaki güç dengesini kavradın.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Fark edildin; 'kulak misafiri' diye anılmak hoş değil.",
        },
      },
      {
        metin: "Sohbetine devam et.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Entrikalara bulaşmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yine de fısıltının bir kısmı kulağına çalındı.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_dans_daveti",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 17,
    ton: "hafif",
    gorsel: "💃",
    baslik: "Dans Pisti Daveti",
    metin: "Orkestra vals çalarken göz alıcı biri elini uzatıp seni dansa davet ediyor.",
    secenekler: [
      {
        metin: "Elini tut, pistte dans et.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 5,
          un: 6,
          mesaj: "Adımların akıcıydı; salon sizi izlemeye başladı.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Ayağına bastın, ritmi tutturamadın; salon nazikçe gülümsedi.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Dans etmeden de keyifli bir akşam geçirdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Utanç verici bir sessizlik oldu.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_kumar_masasi",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    gorsel: "♠️",
    baslik: "Kristal Kadehler Arasında Kumar",
    metin: "Salonun köşesinde yüksek bahisli kart oyunu dönüyor. Soylular gülümsüyor ama gözleri hesap yapıyor.",
    secenekler: [
      {
        metin: "Masaya otur, oyna.",
        baseBasariSansi: 45,
        maliyet: 18,
        basariliSonuc: {
          mutluluk: -5,
          para: 30,
          un: 3,
          mesaj: "Kâğıtlar senden yanaydı; salon adını fısıldadı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -18,
          mesaj: "Kötü el geldi, kaybın büyüktü; gülümsemeye devam ettin.",
        },
      },
      {
        metin: "İzle, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -2,
          mesaj: "Parana dokunmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Sıkıcı bulundun ama önemi yok.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_skandal_soylentisi",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    ton: "agir",
    gorsel: "📯",
    baslik: "Hakkında Çıkan Söylenti",
    metin: "Salona girince fark ediyorsun: bakıp fısıldaşıyorlar. Hakkında bir söylenti yayılmış.",
    secenekler: [
      {
        metin: "Yüzleş, söylentiyi çürüt.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 6,
          mesaj: "Sakin açıklaman söylentiyi söndürdü.",
        },
        basarisizSonuc: {
          un: -12,
          mutluluk: -6,
          mesaj: "Savunman ters tepti; söylenti büyüdü.",
        },
      },
      {
        metin: "Görmezden gel, başını dik tut.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 4,
          mesaj: "Umursamazlığın söylentiyi kendiliğinden söndürdü.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Sessizliğin bazılarınca itiraf sayıldı.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_sanatci_kesfi",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    gorsel: "🎨",
    baslik: "Keşfedilmemiş Yetenek",
    metin: "Köşede kimsenin ilgilenmediği genç bir ressam/müzisyen eserini sessizce sergiliyor. Gözün ondan ayrılmıyor.",
    secenekler: [
      {
        metin: "Eserini öv, destek ol.",
        baseBasariSansi: 80,
        maliyet: 6,
        basariliSonuc: {
          para: -6,
          mutluluk: 3,
          mesaj: "Desteğin sanatçıyı sevindirdi; ileride gurur duyacaksın.",
        },
        basarisizSonuc: {
          para: -6,
          mesaj: "Nazik davrandın ama eser ilgini çekmedi.",
        },
      },
      {
        metin: "Fark etmeden geç.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -2,
          mesaj: "Kalabalığa karıştın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Belki gerçek bir yeteneği kaçırdın.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_duello_meydan_okumasi",
    kategori: "sosyal",
    sosyallesmeYeri: "meyhane",
    minYas: 18,
    ton: "agir",
    gorsel: "🎭",
    baslik: "Onur Kırıcı Bir Söz",
    metin: "Kadehler tokuşurken kıskanç bir soylu herkesin önünde ailene hakaret ediyor. Salon nefesini tutmuş.",
    secenekler: [
      {
        metin: "Onu düelloya çağır.",
        baseBasariSansi: 50,
        basariliSonuc: {
          un: 18,
          unvan_kazan: "Salonun Onurlu Kılıcı",
          mesaj: "Kısa düelloda rakibin özür diledi; salon adını fısıldadı.",
        },
        basarisizSonuc: {
          olum_sansi: 6,
          saglik: -18,
          mesaj: "Düello kötü gitti; salondan ağır yaralı taşındın.",
        },
      },
      {
        metin: "Sakin kal, cevap verme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Onurunu sabırla korudun; bazıları takdir etti.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Sessizliğin bazı çevrelerde korkaklık sayıldı.",
        },
      },
    ],
  },
];
