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
    metin: "Meyhanenin en gürültülü köşesinde bir bilek güreşi turnuvası dönüyor. Kazanana gecenin tüm içkisi bedava, kaybedene kahkahalar armağan.",
    secenekler: [
      {
        metin: "Meydan oku, masaya otur.",
        baseBasariSansi: 50,
        ipucu: "Kazanırsan ün ve kadeh, kaybedersen ağrıyan kol ve gurur kaybı",
        basariliSonuc: {
          un: 12,
          mutluluk: 10,
          mesaj: "Rakibinin kolunu masaya çaktın! Meyhane senin şerefine tezahürat yaptı, gecenin kadehleri bedavaydı.",
          detay: "Ertesi gün kolun sızlasa da, sokakta seni tanıyanların sayısı bir gecede arttı.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -8,
          mesaj: "Kolun gümbür gümbür masaya çakıldı, etraftaki kahkahalar kulaklarında çınladı.",
        },
      },
      {
        metin: "Kenardan izle, kazanana bahis oyna.",
        baseBasariSansi: 45,
        maliyet: 5,
        ipucu: "Küçük risk, küçük kazanç",
        basariliSonuc: {
          para: 10,
          mesaj: "Doğru pehlivana oynadın; cebine birkaç {birim} girdi.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Yanlış pehlivana oynadın, bahis parasın meyhaneci cebe indirdi.",
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
    metin: "Kalabalığın arasında ince parmaklı bir çocuğun elinin kesene doğru süzüldüğünü fark ettin.",
    secenekler: [
      {
        metin: "Bileğini kavra, üstüne git.",
        baseBasariSansi: 65,
        ipucu: "Yakalarsan paranı korursun, kaçarsa küçük bir kayıp",
        basariliSonuc: {
          ahlak: 3,
          mesaj: "Bileğini son anda kavradın; çocuk korkuyla özür mırıldanıp karanlığa karıştı.",
          detay: "Meyhaneci sana bir kadeh ısmarladı: 'Gözün her zaman açık olsun evlat.'",
        },
        basarisizSonuc: {
          para: -8,
          mesaj: "Çocuk elini kurtardı, kesenden birkaç {birim} ile birlikte kalabalığa karıştı.",
        },
      },
      {
        metin: "Görmezden gel, zaten pek bir şeyin yok.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Görmezden geldin; belli ki daha aç birine denk geldi zavallı çocuk.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Görmezden gelirken bir yandan da cüzdanın hafifçe hafiflemiş.",
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
    metin: "Köşe masada oturan kukuletalı bir yabancı seni yanına çağırıyor. Yüzü karanlıkta, sesi tuhaf bir aksanla konuşuyor: 'Senin gibi birine ihtiyacım var.'",
    secenekler: [
      {
        metin: "Yanına otur, ne istediğini dinle.",
        baseBasariSansi: 60,
        ipucu: "Gizemli bir tanışıklık kazancı, ya da boş bir tehdit",
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Yabancı, uzak bir diyarın hikâyelerini fısıldadı; ayrılırken sana tuhaf bir sembol çizili bir madeni para bıraktı.",
          detay: "Kim olduğunu hâlâ bilmiyorsun ama dünyanın sandığından büyük olduğunu bir kez daha hissettin.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Anlattıkları sadece sarhoş bir denizcinin abartılı masallarıydı. Vaktini boşa harcadın.",
        },
      },
      {
        metin: "Nazikçe reddet, kendi masana dön.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Tedbiri elden bırakmadın. Yabancı omuz silkti ve karanlığa geri çekildi.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddetmene rağmen adam arkandan tuhaf bir kahkaha attı; içine bir tedirginlik oturdu.",
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
    metin: "Ozan masaya çıkıp kimin daha güzel/yüksek sesle şarkı söyleyebileceğine dair bir yarışma açıyor. Kalabalık zaten kadehini kaldırmış, sırada sen varsın.",
    secenekler: [
      {
        metin: "Sahneye çık, elinden geleni yap.",
        baseBasariSansi: 50,
        ipucu: "Tutarsa büyük ün, tutmazsa büyük rezillik",
        basariliSonuc: {
          un: 15,
          mutluluk: 12,
          mesaj: "Sesin meyhaneyi ayağa kaldırdı! Herkes nakaratı seninle birlikte söyledi.",
          detay: "Bu geceden sonra sokakta 'işte şu türkücü' diye fısıldandığını duyar oldun.",
        },
        basarisizSonuc: {
          un: -8,
          mutluluk: -6,
          mesaj: "Sesin bir kedi bağırtısına benzedi; kalabalık gülmekten kırıldı, sen de kızararak masana çöktün.",
        },
      },
      {
        metin: "Katılma, sadece izle ve alkışla.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Güzel bir gece geçirdin, hem de rezil olma riski taşımadan.",
        },
        basarisizSonuc: {
          mutluluk: 1,
          mesaj: "Sıradan, unutulası bir gece oldu.",
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
    metin: "İki sarhoş, kimin daha çok içtiği konusunda tartışmaya başladı; tartışma hızla bir masa devirme yarışına dönüştü. Yumruklar havada uçuşuyor.",
    secenekler: [
      {
        metin: "Araya gir, kavgayı ayır.",
        baseBasariSansi: 55,
        ipucu: "Başarırsan ün ve minnet, başarısız olursan sağlık kaybı",
        basariliSonuc: {
          un: 8,
          ahlak: 4,
          mesaj: "İki kavgacıyı ayırmayı başardın; meyhane sana minnetle bakıyor.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Araya girerken sana da bir yumruk isabet etti. Kimden geldiğini bile anlamadın.",
        },
      },
      {
        metin: "Masanı al, köşeye çekil.",
        baseBasariSansi: 85,
        basariliSonuc: {
          mesaj: "Sağduyulu davrandın, kavgayı uzaktan izleyip kadehini kurtardın.",
        },
        basarisizSonuc: {
          saglik: -5,
          para: -3,
          mesaj: "Devrilen bir masa tam üstüne geldi; hem sırtın ağrıdı hem kadehin kırıldı.",
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
    metin: "Arka masada gözlerden ırak, yasak bir kâğıt oyunu dönüyor. Sana da bir sandalye gösteriyorlar.",
    secenekler: [
      {
        metin: "Otur, oyuna katıl.",
        baseBasariSansi: 45,
        maliyet: 8,
        ipucu: "Kazanırsan para, kaybedersen para — ayrıca yakalanma riski",
        basariliSonuc: {
          para: 16,
          suc_artis: 3,
          mesaj: "Kâğıtlar senden yana geldi; masadan cebin dolu kalktın.",
        },
        basarisizSonuc: {
          para: -8,
          suc_artis: 3,
          mesaj: "Kötü bir el aldın, masadan eli boş kalktın. En azından muhafızlar gelmedi.",
        },
      },
      {
        metin: "Teşekkür et, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Aklını başında tuttun; parana ve sicil temizliğine dokunmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Masadakiler seni korkak diye takıldı ama umurunda olmadı.",
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
    metin: "Meyhaneci, kadehini doldururken sesini alçaltıp {rakip} hakkında ilginç bir şey duyduğunu söylüyor.",
    secenekler: [
      {
        metin: "Kulak ver, bir tur ısmarla.",
        baseBasariSansi: 70,
        maliyet: 6,
        ipucu: "Rakibine karşı küçük bir avantaj",
        basariliSonuc: {
          para: -6,
          rakip_puani: -6,
          mesaj: "Anlattıkları işine yarayacak cinstendi; {rakip} hakkında artık senin de bir koz var.",
        },
        basarisizSonuc: {
          para: -6,
          mesaj: "Anlattığı şey eski, herkesin zaten bildiği bir dedikoduydu. Paran boşa gitti.",
        },
      },
      {
        metin: "İlgilenmediğini söyle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Dedikodunun peşinden koşmadın; meyhaneci omuz silkip başka birine döndü.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "İlgisiz görünsen de merakın seni bütün gece kemirdi.",
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
    metin: "Masasında tek başına oturan yaşlı bir adam, kimseye sormadan hayatın anlamı üzerine kesintisiz bir nutuk çekmeye başlıyor. Kimse dinlemiyor, sen dinliyorsun.",
    secenekler: [
      {
        metin: "Otur, ciddiye al.",
        baseBasariSansi: 65,
        ipucu: "Beklenmedik bir bilgelik ya da saçma sapan zaman kaybı",
        basariliSonuc: {
          ahlak: 6,
          mutluluk: 6,
          mesaj: "Söyledikleri arasında, sarhoşluğun ardında gerçek bir bilgelik parıltısı buldun.",
          detay: "'Herkes bir gün ölür ama az kişi gerçekten yaşar' dedi ve kadehini kaldırdı; bu cümle aklından çıkmadı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Bir saat sonunda anladın ki adam sadece kendi sesini seviyormuş.",
        },
      },
      {
        metin: "Gülümse, uzaklaş.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Nazikçe uzaklaştın, gecenin geri kalanını huzur içinde geçirdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Uzaklaşırken bile arkandan bağırarak nutkuna devam etti.",
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
    metin: "Meyhanenin kabadayısı, kim önce masaya yığılırsa diye bir iddiaya giriyor; ödül gecenin tüm hasılatı ve bir de unvan.",
    secenekler: [
      {
        metin: "İddiayı kabul et, sonuna kadar git.",
        baseBasariSansi: 35,
        ipucu: "Çok riskli — büyük ün ya da çok kötü bir sabah, hatta daha kötüsü",
        basariliSonuc: {
          para: 22,
          un: 14,
          unvan_kazan: "Kadeh Kralı",
          mesaj: "Rakibin masaya yığıldı, sen hâlâ ayaktasın! Meyhane senin şerefine çığlık attı.",
          detay: "Ertesi gün başın çatlasa da, artık bu meyhanede efsanevi bir isimsin.",
        },
        basarisizSonuc: {
          olum_sansi: 4,
          saglik: -20,
          mutluluk: -8,
          mesaj: "Onuncu kadehten sonra masaya yığıldın; günler süren bir baş ağrısıyla uyandın.",
          detay: "Meyhaneciler seni haftalarca 'dünkü çocuk' diye andı.",
        },
      },
      {
        metin: "Aklını kullan, iddiayı reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Sağlığını riske atmadın; kabadayı seni 'akıllı ama sıkıcı' diye etiketledi, sen de umursamadın.",
        },
        basarisizSonuc: {
          un: -3,
          mesaj: "Reddetmen bazı çevrelerde korkaklık olarak yorumlandı.",
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
    metin: "Sarhoş bir adam masana yaklaşıp seninle uzun uzun sohbet ediyor. Konuştukça anlıyorsun ki hem becerikli hem de iş arıyor.",
    secenekler: [
      {
        metin: "Ona bir teklif yap, ekibine kat.",
        baseBasariSansi: 60,
        maliyet: 4,
        ipucu: "Yeni bir ekip üyesi kazanma şansı",
        basariliSonuc: {
          para: -4,
          ekip_ekle: { rol: "Yardımcı", tahminGenisligi: 30 },
          mesaj: "Teklifini kabul etti; sarhoşluğun ardında gerçekten işine yarayacak biri varmış.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "Teklifini gülerek reddetti: 'Yarın beni hatırlamayacaksın bile.' Haklı çıktı, sen de hatırlamadın.",
        },
      },
      {
        metin: "Sadece sohbet et, iş teklif etme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          dost_puani: 4,
          mutluluk: 4,
          mesaj: "Keyifli bir sohbet geçirdiniz, hiçbir yükümlülük olmadan.",
        },
        basarisizSonuc: {
          mutluluk: 1,
          mesaj: "Sohbet dağınıktı, ne konuştuğunuzu sabah pek hatırlamadın.",
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
    metin: "{rakip} karşı masada oturuyor, gözünü senden ayırmıyor. Kadehini kaldırıp alaycı bir şekilde sana doğru sallıyor.",
    secenekler: [
      {
        metin: "Kadehini kaldır, meydan oku.",
        baseBasariSansi: 50,
        ipucu: "Gerilim büyür ama etraftakiler seni destekler ya da rezil olursun",
        basariliSonuc: {
          un: 8,
          rakip_puani: -8,
          mesaj: "Sözlü düellonun galibi sendin; kalabalık senin tarafını tuttu, {rakip} öfkeyle dışarı çıktı.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -5,
          mesaj: "{rakip}'in keskin dili seni susturdu; herkesin önünde küçük düştün.",
        },
      },
      {
        metin: "Görmezden gel, sırtını dön.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Provokasyona gelmedin; {rakip} bir süre sonra ilgisini kaybetti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Görmezden gelmen bile {rakip}'i daha da azdırdı, gece boyu laf attı.",
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
    metin: "Sarhoş bir yabancı, tesadüfen döktüğün içkiyi bahane edip seni dışarıda hesaplaşmaya çağırıyor. Kalabalık çoktan bahis oynamaya başladı bile.",
    secenekler: [
      {
        metin: "Kabul et, dışarı çık.",
        baseBasariSansi: 55,
        ipucu: "Kazanırsan büyük ün, kaybedersen ciddi yara — küçük bir ölüm riski var",
        basariliSonuc: {
          un: 14,
          saglik: -8,
          mesaj: "Kısa ama sert bir kavganın ardından yabancı yerde kaldı; meyhane seni omuzlarında taşıdı.",
        },
        basarisizSonuc: {
          olum_sansi: 5,
          saglik: -22,
          mesaj: "Yabancının yumrukları beklediğinden ağırdı; günlerce yataktan kalkamadın.",
        },
      },
      {
        metin: "Özür dile, tırnağını gösterme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Gururunu bir kenara bırakıp özür diledin; adam homurdanarak masasına döndü.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Özrün kabul edilse de meyhane seni 'korkak' diye anmaya başladı.",
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
    metin: "Yine aynı meyhane, yine aynı tabure. Kadehin elinde dururken, meyhanenin kirli aynasında kendini görüyorsun ve tanıyamıyorsun. Bir an için her şeyi bırakmayı düşünüyorsun.",
    secenekler: [
      {
        metin: "Kadehi masaya bırak, kendini toparlamaya çalış.",
        baseBasariSansi: 45,
        ipucu: "Zor ama başarırsan ayyaşlığın yükünü hafifletir",
        basariliSonuc: {
          ahlak: 12,
          un: 10,
          mutluluk: 8,
          etiket_sil: ["bagimlilik:ayyas"],
          durum_sil: ["ayyaslik"],
          maas_carpani: 1.05,
          mesaj: "Kadehi geri ittin ve o gece meyhaneden eli boş ama başı dik çıktın. Aylar sürse de, yeniden kendine benzemeye başladın.",
          detay: "Herkes senin hakkında konuşmaya devam etse de, artık haklı çıkmalarına izin vermiyorsun.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -8,
          mesaj: "Denedin ama kadeh elinden düşmedi. Ertesi sabah aynı taburede, aynı baş ağrısıyla uyandın.",
        },
      },
      {
        metin: "Bu düşünceyi kadehle birlikte yudumla.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 2,
          saglik: -3,
          mesaj: "Düşünceyi kadehle birlikte bastırdın. Yarın da aynı yerde olacaksın, biliyorsun.",
        },
        basarisizSonuc: {
          saglik: -5,
          mesaj: "İçmeye devam ettin; sabah her zamankinden de kötü hissettin.",
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
    metin: "Duvardaki dart tahtasının önünde ufak bir turnuva kurulmuş. Bira bardakları tahtanın etrafında sıralanmış, herkes sırasını bekliyor.",
    secenekler: [
      {
        metin: "Sıraya gir, atışını yap.",
        baseBasariSansi: 55,
        ipucu: "İyi bir atış ün getirir, kötüsü sadece kahkaha",
        basariliSonuc: {
          un: 10,
          mutluluk: 8,
          mesaj: "Oku tam da onluğa sapladın! Bar senin şerefine bardak kaldırdı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Ok duvara değil, tavana saplandı. Bütün pub gülmekten kırıldı.",
        },
      },
      {
        metin: "Kenardan bira yudumlayarak izle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Sakin bir akşam geçirdin, rezil olma riskine girmeden.",
        },
        basarisizSonuc: {
          mutluluk: 1,
          mesaj: "Sıradan bir akşamdı, hatırlanacak bir şey olmadı.",
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
    metin: "Yan masadaki bir grup fabrika işçisi, çalışma saatleri ve ücretler hakkında öfkeyle konuşuyor. Biri sana dönüp fikrini soruyor.",
    secenekler: [
      {
        metin: "Onlardan yana konuş, dertlerini dinle.",
        baseBasariSansi: 70,
        ipucu: "Halkın gözünde iyi bir isim, ama bazı çevrelerde rahatsızlık",
        basariliSonuc: {
          ahlak: 6,
          un: 6,
          dost_puani: 4,
          mesaj: "Sözlerin işçilerin hoşuna gitti; sana bir bira ısmarladılar ve dertlerini uzun uzun anlattılar.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Söylediklerin yanlış anlaşıldı, kısa bir tartışmaya döndü. Masanı değiştirmek zorunda kaldın.",
        },
      },
      {
        metin: "Tarafsız kal, sadece dinle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Sessizce dinledin, şehrin nabzını tuttun.",
        },
        basarisizSonuc: {
          mesaj: "Sessizliğin bazılarına 'kibirli' göründü ama önemli değildi.",
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
    metin: "Şık giyimli, pub'a hiç yakışmayan bir adam yanına oturuyor. Kartvizit gibi bir kağıt uzatıp gizemli bir yatırım fırsatından bahsediyor.",
    secenekler: [
      {
        metin: "Teklifi dinle, biraz yatırım yap.",
        baseBasariSansi: 50,
        maliyet: 12,
        ipucu: "Riskli ama kazanırsan iyi bir getiri",
        basariliSonuc: {
          para: 20,
          mesaj: "Adamın sözü doğru çıktı; birkaç hafta sonra kapına gönderdiği zarfta fazlasıyla kârın vardı.",
        },
        basarisizSonuc: {
          para: -12,
          mesaj: "Adam bir daha görünmedi. Kartvizitindeki isim bile sahteydi.",
        },
      },
      {
        metin: "Kibarca reddet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "İçgüdülerine güvendin; adam omuz silkip başka bir masaya geçti.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Reddetmene rağmen adamın bakışları içini ürpertti.",
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
    metin: "Köşedeki bilardo masasında bir yer açılmış. Yerel şampiyon sana meydan okuyor, etrafta küçük bahisler dönüyor.",
    secenekler: [
      {
        metin: "Oyna, yeteneğini göster.",
        baseBasariSansi: 50,
        maliyet: 5,
        ipucu: "Kazanırsan bahis ve ün, kaybedersen sadece bahis",
        basariliSonuc: {
          para: 14,
          un: 6,
          mesaj: "Son topu köşe cebe soktun! Masa senin adına alkış tuttu.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Elin titredi, top köşeyi ıskaladı. Şampiyon unvanını korudu.",
        },
      },
      {
        metin: "İzlemekle yetin.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "İyi bir maç izledin, cebindeki parayı riske atmadan.",
        },
        basarisizSonuc: {
          mesaj: "Sıkıcı geçen bir maçtı, sonunu bile beklemedin.",
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
    metin: "Piyanist eski bir halk şarkısına başlayınca bütün pub tek ağızdan söylemeye başlıyor. Sesler birbirine karışıyor, kimse kusursuz değil ama kimsenin de umurunda değil.",
    secenekler: [
      {
        metin: "Kendini bırak, koroya katıl.",
        baseBasariSansi: 85,
        ipucu: "Neredeyse garanti bir mutluluk anı",
        basariliSonuc: {
          mutluluk: 12,
          dost_puani: 3,
          mesaj: "Sesini yükselttin, bir an için tüm dertlerini unuttun. Yabancılarla omuz omuza şarkı söylemek iyi hissettirdi.",
        },
        basarisizSonuc: {
          mutluluk: 4,
          mesaj: "Sözleri pek bilmesen de eğlendin, kimse fark etmedi bile.",
        },
      },
      {
        metin: "Kenarda otur, sadece izle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Uzaktan izlemek bile keyifliydi.",
        },
        basarisizSonuc: {
          mutluluk: 1,
          mesaj: "Gürültüden başın ağrımaya başladı.",
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
    metin: "Kapıdan çıkarken iki müşteri arasında çıkan bir tartışma hızla yumruklaşmaya dönüyor; sen tam ortasında kaldın.",
    secenekler: [
      {
        metin: "Aralarına gir, ayır.",
        baseBasariSansi: 50,
        ipucu: "Başarırsan minnet ve ün, başarısız olursan sağlık kaybı",
        basariliSonuc: {
          un: 7,
          ahlak: 5,
          mesaj: "İkisini de zor bela ayırdın; pub sahibi sana minnetle bir bira ısmarladı.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Araya girerken kaçak bir yumruk tam suratına isabet etti.",
        },
      },
      {
        metin: "Kenardan sıyrıl, karışma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Akıllıca davrandın; kavga polis gelmeden kendiliğinden bitti.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "Kaçarken cebindeki bozuklukların bir kısmı yere döküldü, kalabalıkta kayboldu.",
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
    sosyallesmeYeri: "hamam",
    gorsel: "🗞️",
    baslik: "Buharın Ardındaki Fısıltılar",
    metin: "Sıcak taşların üzerinde uzanırken, birkaç adım ötende iki kadın/erkek şehrin en taze dedikodularını fısıldıyor. Sesleri buharda net duyuluyor.",
    secenekler: [
      {
        metin: "Sessizce dinle, kulak kabart.",
        baseBasariSansi: 75,
        ipucu: "İşine yarayacak bir bilgi kırıntısı",
        basariliSonuc: {
          etiket_ekle: ["istihbarat_var"],
          mesaj: "Duyduğun bilgi tam da işine yarayacak cinstendi; bir sonraki adımını daha net atacaksın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Konuştukları sadece sıradan bir düğün hazırlığıydı, hiçbir işe yaramadı.",
        },
      },
      {
        metin: "Kendi huzuruna odaklan, dinleme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 4,
          mutluluk: 4,
          mesaj: "Sıcaklığın ve buharın tadını çıkardın, zihnin dinlendi.",
        },
        basarisizSonuc: {
          mesaj: "Rahatlamaya çalışsan da etraftaki gürültü seni biraz geriyor.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_govde_gosterisi",
    kategori: "sosyal",
    sosyallesmeYeri: "hamam",
    minYas: 17,
    ton: "hafif",
    gorsel: "💦",
    baslik: "Soğuk Su Meydan Okuması",
    metin: "Genç bir grup, kim daha uzun süre buz gibi soğutma havuzunda kalacağına dair birbirine meydan okuyor. Sıra sana geldi.",
    secenekler: [
      {
        metin: "Havuza atla, dayan.",
        baseBasariSansi: 55,
        ipucu: "Dayanırsan ün, dayanamazsan üşütme riski",
        basariliSonuc: {
          un: 8,
          saglik: 3,
          mesaj: "Herkesten uzun dayandın; sudan çıktığında alkışlarla karşılandın.",
        },
        basarisizSonuc: {
          saglik: -6,
          mesaj: "Daha on saniye geçmeden titreyerek sudan fırladın, gençler seninle dalga geçti.",
        },
      },
      {
        metin: "Gülümse, kabul etme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Aptalca bir meydan okumaya kapılmadın.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "'Korkak' diye takıldılar ama umurunda olmadı.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_evlilik_ciziligi",
    kategori: "sosyal",
    sosyallesmeYeri: "hamam",
    minYas: 20,
    yasakliEtiketler: ["medeni:evli"],
    gorsel: "💌",
    baslik: "Görücü Usulü Fısıltılar",
    metin: "Yaşlı bir hanım/bey, seni süzüp süzüp yanındakine bir şeyler fısıldıyor. Belli ki uygun bir eş adayı arıyor ve gözü sende.",
    secenekler: [
      {
        metin: "Yaklaş, kiminle ilgilendiğini sor.",
        baseBasariSansi: 70,
        ipucu: "İlgi çekici bir isim, risksiz bir sohbet",
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Sana ailesi köklü bir hane halkından biriyle ilgili birkaç isim fısıldadı; ilginç bir olasılık kapıda bekliyor.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yaşlı hanım seni beğenmedi, yüzünü buruşturup yanındakine döndü.",
        },
      },
      {
        metin: "Gülümse, ilgilenmediğini belirt.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Görücülük işine karışmadın, huzurunu bozmadın.",
        },
        basarisizSonuc: {
          mesaj: "Yine de arkandan fısıldamaya devam ettiler.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_tellak_sohbeti",
    kategori: "saglik",
    sosyallesmeYeri: "hamam",
    gorsel: "🧴",
    baslik: "Tellağın Elleri",
    metin: "Deneyimli tellak/natır, günlerdir sırtında taşıdığın yorgunluğu fark edip uzun bir masaj öneriyor.",
    secenekler: [
      {
        metin: "Kabul et, parasını öde.",
        baseBasariSansi: 90,
        maliyet: 6,
        ipucu: "Neredeyse garanti bir dinlenme",
        basariliSonuc: {
          para: -6,
          saglik: 8,
          mutluluk: 6,
          mesaj: "Ellerinin altında haftaların yorgunluğu eridi; hamamdan yeni doğmuş gibi çıktın.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: 2,
          mesaj: "Biraz sert davrandı ama yine de iyi geldi.",
        },
      },
      {
        metin: "Teşekkür et, kendi başına yıkan.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 3,
          mesaj: "Sade ama yeterince dinlendirici bir yıkanma oldu.",
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
    sosyallesmeYeri: "hamam",
    gorsel: "🧺",
    baslik: "Boş Sepet",
    metin: "Yıkanmadan çıkıp eşyalarının olduğu sepete döndüğünde, kesenin bir köşesinin hafiflediğini fark ediyorsun.",
    secenekler: [
      {
        metin: "Hamam görevlisine sor, araştır.",
        baseBasariSansi: 55,
        ipucu: "Belki geri alırsın, belki sadece vakit kaybedersin",
        basariliSonuc: {
          para: 5,
          mesaj: "Görevli, başka bir müşterinin sepetleri karıştırdığını hatırladı; kaybolan parandan bir kısmını geri aldın.",
        },
        basarisizSonuc: {
          para: -6,
          mesaj: "Kimse bir şey görmedi ya da görmüş gibi yapmadı. Kayıp senin oldu.",
        },
      },
      {
        metin: "Boş ver, önemli değil.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 1,
          mesaj: "Kaybını sineye çektin, günün geri kalanını huzurla geçirdin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Boş vermeye çalışsan da içinden bir türlü atamadın.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_yabanci_tuccar",
    kategori: "ticaret",
    sosyallesmeYeri: "hamam",
    gorsel: "🌍",
    baslik: "Uzak Diyarların Tüccarı",
    metin: "Yanındaki taşta oturan, tuhaf bir aksanla konuşan bir tüccar, kervanının getirdiği egzotik mallardan bahsediyor.",
    secenekler: [
      {
        metin: "Sohbete gir, bağlantı kur.",
        baseBasariSansi: 65,
        ipucu: "Yeni bir tanışıklık ve olası ticaret kazancı",
        basariliSonuc: {
          para: 8,
          mesaj: "Sohbetiniz uzun sürdü; ayrılırken sana küçük ama değerli bir hediye bıraktı ve gelecekte iş yapma sözü verdi.",
        },
        basarisizSonuc: {
          mesaj: "Dil engeli yüzünden birbirinizi pek anlayamadınız, yine de tuhaf bir sıcaklık vardı sohbetinizde.",
        },
      },
      {
        metin: "Kendi huzuruna dön, sohbeti uzatma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 3,
          mesaj: "Yıkanmanın tadını çıkardın, yeni bir tanışıklığa vakit ayırmadın.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir yıkanma oldu.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_asiri_sicak",
    kategori: "saglik",
    sosyallesmeYeri: "hamam",
    ton: "hafif",
    gorsel: "🥵",
    baslik: "Göz Kararması",
    metin: "Sıcak odada fazla oyalandın; başın dönmeye, gözlerin kararmaya başladı.",
    secenekler: [
      {
        metin: "Kendini zorla, biraz daha kal.",
        baseBasariSansi: 40,
        ipucu: "Dayanırsan bir şey olmaz, dayanamazsan bayılırsın",
        basariliSonuc: {
          saglik: 2,
          mesaj: "Zorlasan da toparlandın, gerçekten iyi bir ısınma oldu.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -5,
          mesaj: "Bayılıp yere yığıldın; seni soğuk suyla ayılttılar, herkesin önünde utandın.",
        },
      },
      {
        metin: "Hemen serin bölüme geç.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          mesaj: "Zamanında müdahale ettin, kendini toparladın.",
        },
        basarisizSonuc: {
          saglik: -3,
          mesaj: "Yine de biraz baş dönmesiyle günü geçirdin.",
        },
      },
    ],
  },
  {
    id: "sosyal_hamam_gizli_toplanti",
    kategori: "siyaset",
    sosyallesmeYeri: "hamam",
    minAhlak: 0,
    gizemli: true,
    ton: "agir",
    gorsel: "🕵️",
    baslik: "Buhar Arkasındaki Meclis",
    metin: "En içteki sıcak odada birkaç kişinin alçak sesle, ciddi bir tavırla konuştuğunu görüyorsun. Sözlerinden şehrin yönetimiyle ilgili tehlikeli bir plan sezinliyorsun.",
    secenekler: [
      {
        metin: "Yaklaş, ne konuştuklarını dinlemeye çalış.",
        baseBasariSansi: 45,
        ipucu: "Değerli bir bilgi, ama yakalanma riski",
        basariliSonuc: {
          etiket_ekle: ["istihbarat_var"],
          mesaj: "Duyduklarını kimseye söylemeden cebine attın; ileride işine yarayacağından eminsin.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          rakip_puani: 5,
          mesaj: "Fark edildin. Adamlardan biri seni tehditkâr bir bakışla süzdü; oradan hızla uzaklaştın.",
        },
      },
      {
        metin: "Görmezden gel, kendi işine bak.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Başını belaya sokmadın, sakin bir şekilde yıkanmana devam ettin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Duyduğun birkaç kelime aklından çıkmadı, tedirginlik içinde eve döndün.",
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
    sosyallesmeYeri: "kahvehane",
    ton: "hafif",
    gorsel: "📖",
    baslik: "Meddahın Hikâyesi",
    metin: "Meddah sopasını yere vurup anlatmaya başlıyor: 'Bir varmış, bir yokmuş...' Kahvehane derin bir sessizliğe gömülüyor, herkes onu dinliyor.",
    secenekler: [
      {
        metin: "Öne otur, hikâyeye kendini kaptır.",
        baseBasariSansi: 90,
        ipucu: "Neredeyse garanti keyifli bir akşam",
        basariliSonuc: {
          mutluluk: 10,
          mesaj: "Hikâye seni başka bir dünyaya götürdü; saatler nasıl geçti anlamadın.",
        },
        basarisizSonuc: {
          mutluluk: 3,
          mesaj: "Hikâye güzeldi ama aklın başka yerdeydi.",
        },
      },
      {
        metin: "Kahveni yudumla, yarı kulak ver.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Sakin bir akşam geçirdin.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir akşam oldu.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_tavla",
    kategori: "sosyal",
    sosyallesmeYeri: "kahvehane",
    ton: "hafif",
    gorsel: "🎲",
    baslik: "Tavla Şakırtısı",
    metin: "Köşedeki masada birileri seni tavlaya davet ediyor. Zarlar hazır, taşlar dizilmiş, etraf sessizce izlemeye başlamış bile.",
    secenekler: [
      {
        metin: "Otur, oyna.",
        baseBasariSansi: 50,
        maliyet: 3,
        ipucu: "Küçük bahis, küçük risk",
        basariliSonuc: {
          para: 7,
          mutluluk: 5,
          mesaj: "Zarlar senden yana geldi, oyunu kazandın. İzleyenler seni tebrik etti.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Zarlar bu sefer yardımcı olmadı, oyunu kaybettin.",
        },
      },
      {
        metin: "İzle, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Keyifli bir izleyici oldun.",
        },
        basarisizSonuc: {
          mesaj: "Fazla bir şey olmadı.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_falci_telve",
    kategori: "sosyal",
    sosyallesmeYeri: "kahvehane",
    gizemli: true,
    gorsel: "☕",
    baslik: "Telvedeki Şekiller",
    metin: "Kahveni bitirince yanındaki yaşlı kadın fincanını istiyor: 'Telvene bakayım evladım.' Fincanı çevirip bekliyorsunuz.",
    secenekler: [
      {
        metin: "Fincanı uzat, falına baktır.",
        baseBasariSansi: 80,
        ipucu: "Ruh hâlini etkileyen gizemli bir öngörü",
        basariliSonuc: {
          mutluluk: 8,
          mesaj: "Kadın fincanda 'uzun bir yol ve beklenmedik bir kazanç' görüyor; söyledikleri içini tuhaf bir umutla dolduruyor.",
          detay: "Doğru mu yanlış mı bilmiyorsun ama o günden sonra adımların biraz daha hafif.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Kadın yüzünü buruşturup 'bugün söylemesem daha iyi' diyor; merakın seni bütün gün rahatsız ediyor.",
        },
      },
      {
        metin: "Teşekkür et, baktırma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Kaderini bir fincan telveye bırakmadın.",
        },
        basarisizSonuc: {
          mesaj: "Kadın biraz gücenmiş göründü ama önemli değil.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_siyaset_tartismasi",
    kategori: "siyaset",
    sosyallesmeYeri: "kahvehane",
    ton: "agir",
    gorsel: "📰",
    baslik: "Gazete Etrafında Tartışma",
    metin: "Elden ele dolaşan bir gazete kahvehanede sert bir tartışma başlatıyor. Herkes fikrini bağırarak savunuyor, senden de görüş bekleniyor.",
    secenekler: [
      {
        metin: "Fikrini açıkça söyle.",
        baseBasariSansi: 55,
        ipucu: "Cesur bir tavır ün getirir ama düşman da kazandırabilir",
        basariliSonuc: {
          un: 8,
          rakip_puani: 4,
          mesaj: "Sözlerin masada yankı buldu; bazıları seni alkışladı, bazıları küfretti — ama artık tanınıyorsun.",
        },
        basarisizSonuc: {
          ahlak: -3,
          mutluluk: -4,
          mesaj: "Tartışma büyüdü, neredeyse yumruklaşmaya dönecekti. Kahveci araya girip herkesi sakinleştirmek zorunda kaldı.",
        },
      },
      {
        metin: "Tarafsız kal, sadece dinle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Fikrini kimseye açmadan, farklı görüşleri dinleyip zihninde tarttın.",
        },
        basarisizSonuc: {
          mesaj: "Sessizliğin kimsenin dikkatini çekmedi.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_ticaret_firsati",
    kategori: "ticaret",
    sosyallesmeYeri: "kahvehane",
    gorsel: "📦",
    baslik: "Duyulan Fırsat",
    metin: "Yan masadaki tüccarlar, yeni gelen bir mal partisinden ve iyi bir fiyat fırsatından bahsediyor. Kulak misafiri oldun.",
    secenekler: [
      {
        metin: "Sohbete katıl, fırsatı değerlendir.",
        baseBasariSansi: 60,
        maliyet: 10,
        ipucu: "Küçük bir yatırım, iyi bir getiri ihtimali",
        basariliSonuc: {
          para: 16,
          mesaj: "Fırsat gerçekten iyiymiş; birkaç gün içinde yatırdığının fazlasını geri aldın.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Mal partisi beklendiği gibi çıkmadı, yatırdığın parayı geri alamadın.",
        },
      },
      {
        metin: "Sadece dinle, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Riske girmeden kahveni yudumlamaya devam ettin.",
        },
        basarisizSonuc: {
          mesaj: "Fırsatı kaçırmış olabilirsin ama pişman değilsin.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_nargile_arkadasligi",
    kategori: "sosyal",
    sosyallesmeYeri: "kahvehane",
    ton: "hafif",
    gorsel: "💨",
    baslik: "Paylaşılan Nargile",
    metin: "Yalnız oturan yaşlı bir adam nargilesini sana doğru itip 'buyur' diyor. Sohbet, dumanın halkalar hâlinde yükselişiyle birlikte ağırlaşıyor.",
    secenekler: [
      {
        metin: "Otur, sohbete katıl.",
        baseBasariSansi: 85,
        ipucu: "Sıcak bir dostluk anı",
        basariliSonuc: {
          dost_puani: 5,
          mutluluk: 8,
          mesaj: "Saatlerce konuştunuz; adamın hayat hikâyesi sende derin bir iz bıraktı.",
        },
        basarisizSonuc: {
          mutluluk: 2,
          mesaj: "Sohbet kısa sürdü ama yine de hoştu.",
        },
      },
      {
        metin: "Teşekkür et, kendi masana dön.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Yalnız başına sakin bir akşam geçirdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Adamın hayal kırıklığına uğramış yüzü aklından çıkmadı.",
        },
      },
    ],
  },
  {
    id: "sosyal_kahvehane_haber_soylentisi",
    kategori: "sosyal",
    sosyallesmeYeri: "kahvehane",
    gorsel: "📯",
    baslik: "Kapıdan Gelen Haber",
    metin: "Kahvehaneye giren biri soluk soluğa uzak bir mahalledeki bir olayı anlatıyor; herkes başını çevirip dinliyor, sen de meraklısın.",
    secenekler: [
      {
        metin: "Yaklaş, detayları öğren.",
        baseBasariSansi: 80,
        ipucu: "Güncel bir bilgi kazancı",
        basariliSonuc: {
          mesaj: "Anlatılanlar şehrin nabzını tutmana yardım etti; artık bir sonraki adımını daha bilinçli atacaksın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Haber çoktan abartılmıştı; gerçek çok daha sıradandı.",
        },
      },
      {
        metin: "Kendi işine bak, ilgilenme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Dedikodunun peşine düşmedin.",
        },
        basarisizSonuc: {
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
    sosyallesmeYeri: "kervansaray",
    gorsel: "🏮",
    baslik: "İpek Yolu Tüccarı",
    metin: "Avluda mallarını sergileyen bir tüccar, aylardır aştığı çölleri ve dağları anlatıyor. Denklerinde göz kamaştırıcı kumaşlar var.",
    secenekler: [
      {
        metin: "Pazarlığa gir, mal al.",
        baseBasariSansi: 55,
        maliyet: 14,
        ipucu: "İyi pazarlık edersen kârlı bir alışveriş",
        basariliSonuc: {
          para: 22,
          mesaj: "Sert bir pazarlığın ardından anlaştınız; aldığın kumaşları şehirde iyi bir fiyata elden çıkardın.",
        },
        basarisizSonuc: {
          para: -14,
          mesaj: "Pazarlıkta üstün geldiğini sandın ama malın kalitesi göründüğü gibi değilmiş.",
        },
      },
      {
        metin: "Sadece sohbet et, hikâyelerini dinle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Anlattığı diyarlar hayal gücünü genişletti.",
        },
        basarisizSonuc: {
          mesaj: "Yorgun tüccar pek konuşkan değildi.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_gezgin_hikayeci",
    kategori: "sosyal",
    sosyallesmeYeri: "kervansaray",
    gizemli: true,
    gorsel: "🧭",
    baslik: "Yollarda Yaşlanmış Adam",
    metin: "Ateşin başında oturan yaşlı bir gezgin, gördüğü garip diyarları ve tanıştığı tuhaf insanları anlatmaya başlıyor. Sesi hipnotize edici.",
    secenekler: [
      {
        metin: "Ateşin başına otur, dinle.",
        baseBasariSansi: 85,
        ipucu: "Keyifli, risksiz bir akşam",
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Anlattıkları arasında gerçekle efsanenin sınırı kayboldu; dünyanın ne kadar büyük olduğunu bir kez daha hissettin.",
        },
        basarisizSonuc: {
          mutluluk: 1,
          mesaj: "Hikâyeler uzadıkça uzadı, sonunda uykuya yenik düştün.",
        },
      },
      {
        metin: "Erken yat, uzun yolun için dinlen.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 4,
          mesaj: "İyi bir uyku çektin.",
        },
        basarisizSonuc: {
          mesaj: "Kervansarayın gürültüsü seni pek uyutmadı.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_koruma_teklifi",
    kategori: "ticaret",
    sosyallesmeYeri: "kervansaray",
    gorsel: "🛡️",
    baslik: "Kervan Koruma Teklifi",
    metin: "Bir kervan reisi, sabah yola çıkacak kafilesine eskort/koruma olarak katılıp katılamayacağını soruyor. Ödül cazip ama yol tehlikeli.",
    secenekler: [
      {
        metin: "Teklifi kabul et.",
        baseBasariSansi: 60,
        ipucu: "İyi bir kazanç ama eşkıya riski var",
        basariliSonuc: {
          para: 18,
          un: 5,
          mesaj: "Kervan güvenle şehre ulaştı; reis sana söz verdiğinden fazlasını ödedi.",
        },
        basarisizSonuc: {
          saglik: -10,
          para: 6,
          mesaj: "Yolda küçük bir eşkıya baskınına uğradınız; kervanı korudun ama yara almadan olmadı.",
        },
      },
      {
        metin: "Teşekkür et, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Rahat bir gece geçirmeyi tercih ettin.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Reis biraz hayal kırıklığına uğramış göründü.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_calinan_mal",
    kategori: "sosyal",
    sosyallesmeYeri: "kervansaray",
    gorsel: "🎒",
    baslik: "Karanlıkta Bir Gölge",
    metin: "Gece yarısı, denklerin arasında dolaşan bir gölge fark ediyorsun. Kimsenin olmadığı bu avluda tek başınasın.",
    secenekler: [
      {
        metin: "Üstüne yürü, seslen.",
        baseBasariSansi: 55,
        ipucu: "Yakalarsan mal ve ün, kaçarsa kayıp",
        basariliSonuc: {
          para: 8,
          un: 5,
          mesaj: "Hırsız korkup kaçtı, çaldıklarını geride bıraktı. Sabah kervansaray sahibi sana teşekkür etti.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Gölge çoktan gitmişti; sabah bazı eşyaların eksik olduğunu fark ettin.",
        },
      },
      {
        metin: "Görmezden gel, kapını sıkı kilitle.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Kendi eşyanı korudun, başkasının derdine karışmadın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Gece boyu uyuyamadın, her sesi hırsız sandın.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_dil_pazarligi",
    kategori: "ticaret",
    sosyallesmeYeri: "kervansaray",
    gorsel: "🗣️",
    baslik: "Ortak Dil Aramak",
    metin: "Hiçbir ortak dili konuşamadığın bir tüccarla el kol hareketleri ve gülüşmelerle anlaşmaya çalışıyorsun.",
    secenekler: [
      {
        metin: "Israrla pazarlığa devam et.",
        baseBasariSansi: 60,
        maliyet: 8,
        ipucu: "Zorlu ama eğlenceli bir pazarlık",
        basariliSonuc: {
          para: 4,
          mesaj: "Sonunda anlaştınız, hatta iyi bir fiyata da anlaştınız! İkiniz de kahkahalarla tokalaştınız.",
        },
        basarisizSonuc: {
          para: -8,
          mesaj: "Anlaşma tam oturmadı ama süreç boyunca çok güldünüz, en azından kültürel bir deneyim oldu.",
        },
      },
      {
        metin: "Vazgeç, başka bir tezgâha git.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Vaktini boşa harcamadın.",
        },
        basarisizSonuc: {
          mesaj: "Biraz kaba davranmış olabilirsin.",
        },
      },
    ],
  },
  {
    id: "sosyal_kervansaray_deve_yarisi",
    kategori: "sosyal",
    sosyallesmeYeri: "kervansaray",
    ton: "hafif",
    gorsel: "🐫",
    baslik: "Avluda Deve Yarışı",
    metin: "Sıkılan kervan üyeleri, avluda küçük bir deve yarışı düzenlemiş. Bahisler açık, kazanana gecenin en iyi yemeği vaat ediliyor.",
    secenekler: [
      {
        metin: "Bahis oyna, deveni seç.",
        baseBasariSansi: 45,
        maliyet: 5,
        ipucu: "Şansına bağlı, eğlenceli bir kumar",
        basariliSonuc: {
          para: 10,
          mutluluk: 6,
          mesaj: "Seçtiğin deve tozu dumana kattı! Gecenin en iyi yemeğini sen kazandın.",
        },
        basarisizSonuc: {
          para: -5,
          mutluluk: 2,
          mesaj: "Deven yarı yolda inatla oturdu ama yine de çok güldün.",
        },
      },
      {
        metin: "Kenardan izle, gülümse.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Eğlenceli bir manzaraydı, hiçbir şey kaybetmeden güldün.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir akşamdı.",
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
    metin: "Nöbet aralarında askerler ateşin etrafında toplanmış, bilek güreşi turnuvası düzenliyor. Sıra sana geldiğinde, en güçlü asker seni işaret ediyor.",
    secenekler: [
      {
        metin: "Meydan oku, gücünü göster.",
        baseBasariSansi: 50,
        ipucu: "Kazanırsan takım içinde saygınlık, kaybedersen sadece gurur kırılır",
        basariliSonuc: {
          un: 10,
          dost_puani: 5,
          mesaj: "Kolunu masaya çaktın! Birlik seni omuzlarına aldı, artık aralarında sözü geçen biri oldun.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Yenildin ama iyi bir mücadele verdin; askerler yine de sırtını sıvazladı.",
        },
      },
      {
        metin: "Kenardan izle, tezahürat et.",
        baseBasariSansi: 95,
        basariliSonuc: {
          dost_puani: 2,
          mesaj: "Keyifli bir akşam geçirdin.",
        },
        basarisizSonuc: {
          mesaj: "Sıradan bir akşamdı.",
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
    metin: "Çadırda birkaç asker maaşlarını masaya koyup kâğıt oynuyor. Sana da yer açıyorlar.",
    secenekler: [
      {
        metin: "Otur, oyna.",
        baseBasariSansi: 45,
        maliyet: 6,
        ipucu: "Riskli ama eğlenceli",
        basariliSonuc: {
          para: 14,
          suc_artis: 2,
          mesaj: "Kâğıtlar senden yana geldi, çadırdaki herkesin cebinden bir şeyler çıktı.",
        },
        basarisizSonuc: {
          para: -6,
          suc_artis: 2,
          mesaj: "Kötü bir gece geçirdin, maaşının bir kısmı diğer askerlerin cebinde kaldı.",
        },
      },
      {
        metin: "İzle, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Maaşını cebinde tuttun.",
        },
        basarisizSonuc: {
          mesaj: "Askerler seni biraz takıldı ama önemli değildi.",
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
    metin: "Kadeh döndükçe herkesin savaş hikâyesi biraz daha büyüyor. Sıra sana geldiğinde bütün gözler üzerinde.",
    secenekler: [
      {
        metin: "Kendi hikâyeni büyüterek anlat.",
        baseBasariSansi: 55,
        ipucu: "İyi anlatırsan efsane olursun, abartırsan rezil olursun",
        basariliSonuc: {
          un: 10,
          mutluluk: 6,
          mesaj: "Hikâyen o kadar sürükleyiciydi ki çadır sessizliğe büründü, sonunda kadeh kaldırdılar.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Abarttığın detay eski bir silah arkadaşının anlattığıyla çelişince herkes gülmeye başladı.",
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
          mesaj: "Fazla sıkıcı bulundu ama önemli değil.",
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
    metin: "Bir asker çadırın dibinden gizlice sakladığı bir testi çıkarıyor; kurallara aykırı ama kimse görmeyecek gibi.",
    secenekler: [
      {
        metin: "Kadehini uzat, katıl.",
        baseBasariSansi: 70,
        ipucu: "Dostluk artar ama yakalanma riski küçük bir suç lekesi bırakır",
        basariliSonuc: {
          dost_puani: 6,
          mutluluk: 6,
          suc_artis: 2,
          mesaj: "Kimse görmedi, gece iyi geçti; birlik içindeki bağların biraz daha güçlendi.",
        },
        basarisizSonuc: {
          suc_artis: 6,
          un: -5,
          mesaj: "Nöbetçi subay tam da o an içeri girdi. Adın disiplin defterine yazıldı.",
        },
      },
      {
        metin: "Kurallara uy, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Disiplinini korudun, riske girmedin.",
        },
        basarisizSonuc: {
          dost_puani: -3,
          mesaj: "Diğer askerler seni 'kuralcı' diye takıldı.",
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
    metin: "Arkadaşların, en ciddi nöbetçiye şaka yapmayı planlıyor; senden de yardım istiyorlar.",
    secenekler: [
      {
        metin: "Plana katıl, şakayı yap.",
        baseBasariSansi: 55,
        ipucu: "Başarırsan takımda efsane olursun, yakalanırsan ceza yersin",
        basariliSonuc: {
          mutluluk: 10,
          dost_puani: 6,
          mesaj: "Şaka mükemmel işledi! Nöbetçinin çığlığı bütün kampı güldürdü, gece boyu bundan bahsedildi.",
        },
        basarisizSonuc: {
          un: -6,
          saglik: -3,
          mesaj: "Nöbetçi seni yakaladı ve öfkeyle üzerine geldi. Ceza olarak ekstra nöbete kaldın.",
        },
      },
      {
        metin: "Katılma, uykuna bak.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "İyi bir uyku çektin.",
        },
        basarisizSonuc: {
          dost_puani: -2,
          mesaj: "Arkadaşların seni 'eğlenceyi bilmez' diye takıldı.",
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
    metin: "Kısa süreliğine ilan edilen ateşkes gecesinde, karşı taraftan bir asker de ateşe yaklaşıp elindeki içkiyi paylaşmak istiyor. Komutanların bilse hoşlanmayacağı bir an.",
    secenekler: [
      {
        metin: "Kadehini paylaş, konuş.",
        baseBasariSansi: 75,
        ipucu: "İnsanlığın hatırlatıldığı, riskli ama değerli bir an",
        basariliSonuc: {
          ahlak: 8,
          mesaj: "Yarın belki birbirinize kılıç çekeceksiniz ama bu gece sadece iki insandınız. O konuşma seni bir daha savaşa hiç eskisi gibi bakmaz hâle getirdi.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Konuşma garip bir sessizlikte tıkandı; ikiniz de kendi ateşinize döndünüz.",
        },
      },
      {
        metin: "Mesafeni koru, uzaklaş.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Emirlere sadık kaldın, riske girmedin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Uzaklaşırken bile o askerin gözlerindeki yorgunluğu unutamadın.",
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
    metin: "Birliklerin arasında dolaşan yaşlı bir falcı, ateş ışığında avucuna baktığı her askere bir kehanet fısıldıyor. Sıra sana geldi.",
    secenekler: [
      {
        metin: "Avucunu uzat, kehaneti dinle.",
        baseBasariSansi: 80,
        ipucu: "Cesaret veren ya da ürkütücü bir öngörü",
        basariliSonuc: {
          mutluluk: 8,
          un: 4,
          mesaj: "'Adın bu topraklarda uzun süre anılacak' dedi kadın; söylediği söz sana beklenmedik bir güven verdi.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kadın avucuna baktı, yüzü asıldı ve tek kelime etmeden elini bıraktı. O geceki uykun kaçtı.",
        },
      },
      {
        metin: "Boş inançlara vaktin yok, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Kaderine falcıların değil kendi kılıcının karar vereceğini düşünüyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Yine de diğer askerlerin fısıltıları kulağına çalındı.",
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
    metin: "Kadehler kaldırılırken birkaç silah arkadaşın, birbirinize her ne olursa olsun sahip çıkma yemini etmeyi öneriyor.",
    secenekler: [
      {
        metin: "Kadehini kaldır, yemin et.",
        baseBasariSansi: 90,
        ipucu: "Güçlü ve kalıcı bir dostluk bağı",
        basariliSonuc: {
          dost_puani: 10,
          mutluluk: 8,
          mesaj: "Kadehler tokuşturuldu, sözler ciddiydi. Bu geceden sonra aranızdaki bağ savaş meydanında bile sarsılmayacak.",
        },
        basarisizSonuc: {
          mutluluk: 3,
          mesaj: "Yemin biraz dağınık geçse de niyet güzeldi.",
        },
      },
      {
        metin: "Kadehini kaldırma, gülümseyerek izle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Büyük sözler yerine sessiz bir saygıyı tercih ettin.",
        },
        basarisizSonuc: {
          dost_puani: -2,
          mesaj: "Diğerleri biraz gücenmiş göründü.",
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
    metin: "Yemek bittikten sonra genç bir meslektaşın sana yaklaşıp, kimseye söylemediği bir günahını itiraf etmek istiyor.",
    secenekler: [
      {
        metin: "Onu dinle, öğüt ver.",
        baseBasariSansi: 80,
        ipucu: "Manevi rehberlik ahlakını ve nüfuzunu güçlendirir",
        basariliSonuc: {
          ahlak: 6,
          nufuz_artis: 8,
          mesaj: "Sözlerin ona huzur verdi; bu küçük an, cemaat içindeki saygınlığını sessizce büyüttü.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Doğru kelimeleri bulamadın, adam daha da huzursuz ayrıldı.",
        },
      },
      {
        metin: "Vaktin olmadığını söyle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Kendi huzuruna öncelik verdin.",
        },
        basarisizSonuc: {
          ahlak: -2,
          mesaj: "Genç meslektaşın hayal kırıklığını gizleyemedi.",
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
    metin: "Sofrada oturan zengin bir hayırsever, yeni bir hayır işine ortak olmak isteyip istemediğini soruyor.",
    secenekler: [
      {
        metin: "Teklifi kabul et, katkı ver.",
        baseBasariSansi: 70,
        maliyet: 10,
        ipucu: "Bir miktar para karşılığında kalıcı bir saygınlık",
        basariliSonuc: {
          para: -10,
          un: 12,
          ahlak: 6,
          mesaj: "Bağışın hemen konuşuldu; cemaat içinde adın cömertlikle anılmaya başladı.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Bağışın toplandı ama beklediğin kadar dikkat çekmedi.",
        },
      },
      {
        metin: "Nazikçe reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Parana dokunmadın, sade bir akşam geçirdin.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Hayırsever biraz hayal kırıklığına uğradı.",
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
    metin: "Başka bir bölgeden gelen bir vaiz, sofrada seninkinden farklı bir yorum savunmaya başlıyor. Tartışma giderek ciddileşiyor.",
    secenekler: [
      {
        metin: "Görüşünü kararlılıkla savun.",
        baseBasariSansi: 55,
        ipucu: "Kazanırsan nüfuz artar, kaybedersen itibar sarsılır",
        basariliSonuc: {
          nufuz_artis: 10,
          un: 6,
          mesaj: "Argümanların sofradakileri ikna etti; rakip vaiz sessizce başını eğdi.",
        },
        basarisizSonuc: {
          ahlak: -3,
          un: -4,
          mesaj: "Tartışmayı kaybettin, bazı meslektaşların bakışlarında hayal kırıklığı gördün.",
        },
      },
      {
        metin: "Tartışmayı büyütme, konuyu değiştir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Gereksiz bir çatışmadan kaçındın.",
        },
        basarisizSonuc: {
          mesaj: "Bazıları kaçtığını düşündü ama önemli değildi.",
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
    metin: "Sofranın kenarındaki eski bir sandıkta, kimsenin fark etmediği tozlu bir el yazması buluyorsun. Sayfalar eski ve kırılgan.",
    secenekler: [
      {
        metin: "Dikkatle incele, oku.",
        baseBasariSansi: 65,
        ipucu: "Nadir bir bilgi kazancı, ya da sadece eski bir defter",
        basariliSonuc: {
          nufuz_artis: 5,
          mesaj: "Yazmadaki satırlar, unutulmuş bir öğretiye ışık tutuyor; bu bilgi seni meslektaşların arasında farklı kılacak.",
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
          mesaj: "Merakını bastırdın, sofraya geri döndün.",
        },
        basarisizSonuc: {
          mesaj: "Sandığın ne sakladığını hiç öğrenemeyeceksin.",
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
    metin: "Yemek biterken meslektaşların, cemaatten birkaç ailenin arasındaki bir anlaşmazlığı konuşmaya başlıyor. Senden de fikir isteniyor.",
    secenekler: [
      {
        metin: "Arabuluculuk teklif et.",
        baseBasariSansi: 65,
        ipucu: "Başarılı olursan saygınlık kazanırsın",
        basariliSonuc: {
          un: 8,
          ahlak: 4,
          mesaj: "İki aile arasında köprü kurdun; cemaat seni bilge bir arabulucu olarak anmaya başladı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Araya girmen işleri daha da karıştırdı; her iki taraf da senden biraz uzaklaştı.",
        },
      },
      {
        metin: "Karışma, kendi işine bak.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Cemaat içi meselelere bulaşmadın.",
        },
        basarisizSonuc: {
          un: -2,
          mesaj: "Bazıları senden daha fazla ilgi bekliyordu.",
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
    metin: "Bir meslektaşın heyecanla, senin geçen ay okuduğun bir duanın ardından hasta bir çocuğun iyileştiğini, bunun bir mucize olduğunu anlatıyor.",
    secenekler: [
      {
        metin: "Söylentiyi düzeltme, alçakgönüllü kal.",
        baseBasariSansi: 80,
        ipucu: "Dürüstlük uzun vadede daha değerli",
        basariliSonuc: {
          ahlak: 6,
          un: 5,
          mesaj: "'Bu benim değil, Tanrı'nın işiydi' dedin; alçakgönüllülüğün, söylentinin kendisinden daha çok konuşuldu.",
        },
        basarisizSonuc: {
          un: 3,
          mesaj: "Söylenti yayılmaya devam etti, sen de rahatsız hissettin.",
        },
      },
      {
        metin: "Söylentinin büyümesine izin ver.",
        baseBasariSansi: 55,
        ipucu: "Kısa vadede ün, ama gerçek ortaya çıkarsa itibar kaybı",
        basariliSonuc: {
          un: 14,
          mesaj: "Söylenti hızla yayıldı; artık senin adına 'mucizevi' sıfatı ekleniyor.",
        },
        basarisizSonuc: {
          ahlak: -8,
          un: -6,
          mesaj: "Çocuğun ailesi gerçeği anlattı, sadece tesadüf olduğu ortaya çıktı. Şişirilen söylenti geri tepti.",
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
    metin: "Lonca toplantısında, bazı esnaf fiyatları ortak bir tabana bağlamayı öneriyor; bazıları buna şiddetle karşı çıkıyor. Oyun sende.",
    secenekler: [
      {
        metin: "Ortak fiyat tabanını destekle.",
        baseBasariSansi: 65,
        ipucu: "İstikrar getirir ama bazı esnafı kızdırır",
        basariliSonuc: {
          ticaret_sermaye_artis: 10,
          dost_puani: 3,
          mesaj: "Öneri kabul edildi; loncadaki istikrar sayesinde işlerin daha öngörülebilir hâle geldi.",
        },
        basarisizSonuc: {
          rakip_puani: 5,
          mesaj: "Öneri reddedildi, bazı esnaf seni 'rekabetten korkan' diye eleştirdi.",
        },
      },
      {
        metin: "Serbest rekabeti savun.",
        baseBasariSansi: 60,
        ipucu: "Riskli ama girişimci ruhunu güçlendirir",
        basariliSonuc: {
          ticaret_sermaye_artis: 14,
          mesaj: "Serbest rekabet kazandı; senin gibi cesur esnaf için kapılar daha da açıldı.",
        },
        basarisizSonuc: {
          ahlak: -3,
          mesaj: "Bazı küçük esnaf senin yüzünden zarar gördüğünü söyleyip küstü.",
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
    metin: "Loncanın saygın isimlerinden biri, seninle ortak bir iş kurmayı teklif ediyor. Kâr paylaşımlı ama riskli bir anlaşma.",
    secenekler: [
      {
        metin: "Teklifi kabul et, imzala.",
        baseBasariSansi: 55,
        maliyet: 15,
        ipucu: "Yüksek risk, yüksek getiri",
        basariliSonuc: {
          para: 26,
          ticaret_sermaye_artis: 8,
          mesaj: "Ortaklık ilk aydan itibaren kâr getirdi; loncadaki itibarın da bir kademe yükseldi.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Ortaklık beklenen kârı getirmedi, yatırdığın sermaye eridi.",
        },
      },
      {
        metin: "Şimdilik reddet, düşünmek istediğini söyle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Sermayeni riske atmadın.",
        },
        basarisizSonuc: {
          mesaj: "Adam başka bir ortak bulup güzel bir kâr elde etti; içinden bir pişmanlık geçti.",
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
    metin: "{rakip}, toplantı ortasında herkesin önünde seni haksız rekabetle suçluyor. Bütün gözler üzerinde.",
    secenekler: [
      {
        metin: "Kendini savun, delillerini göster.",
        baseBasariSansi: 55,
        ipucu: "Kazanırsan itibarın artar, kaybedersen ciddi zarar görür",
        basariliSonuc: {
          un: 8,
          rakip_puani: -8,
          mesaj: "Delillerin suçlamayı çürüttü; {rakip} loncanın önünde küçük düştü.",
        },
        basarisizSonuc: {
          un: -10,
          ahlak: -4,
          mesaj: "Savunman ikna edici bulunmadı; lonca içinde adın bir süre lekeli kaldı.",
        },
      },
      {
        metin: "Sakin kal, cevap verme.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 4,
          mesaj: "Sükûnetin, suçlamadan daha ikna edici oldu; kimse ciddiye almadı.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Sessizliğin bazılarınca kabullenme olarak yorumlandı.",
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
    metin: "Güvendiğin bir esnaf, kimsenin bilmediği yeni bir ticaret yolundan bahsediyor; ama bu bilgiyi paylaşmak için karşılığında bir şey istiyor.",
    secenekler: [
      {
        metin: "Bedelini öde, bilgiyi al.",
        baseBasariSansi: 65,
        maliyet: 12,
        ipucu: "Değerli bir bilgi, ama yanlış çıkma ihtimali var",
        basariliSonuc: {
          para: -12,
          ticaret_sermaye_artis: 12,
          mesaj: "Bilgi doğruydu; yeni yol sayesinde mallarını çok daha ucuza getirmeye başladın.",
        },
        basarisizSonuc: {
          para: -12,
          mesaj: "Yol ya hiç yoktu ya da çoktan herkes tarafından biliniyordu. Paranı boşa harcadın.",
        },
      },
      {
        metin: "Şüpheyle yaklaş, reddet.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Paranı riske atmadın.",
        },
        basarisizSonuc: {
          mesaj: "Belki de gerçekten değerli bir fırsatı kaçırdın.",
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
    metin: "Bir müşterinin şikâyeti loncaya kadar geldi: sattığın mallardan birinin sahte olduğu iddia ediliyor. Meclis senden açıklama bekliyor.",
    secenekler: [
      {
        metin: "Gerçeği söyle, hatanı kabul et.",
        baseBasariSansi: 70,
        ipucu: "Dürüstlük kısa vadede acı ama uzun vadede güven kazandırır",
        basariliSonuc: {
          ahlak: 8,
          un: -4,
          mesaj: "Hatanı kabul ettin ve müşteriye tazminat ödedin; lonca dürüstlüğünü takdir etti.",
        },
        basarisizSonuc: {
          para: -10,
          un: -6,
          mesaj: "İtirafına rağmen bazı esnaf seni bir daha hiç aynı gözle görmedi.",
        },
      },
      {
        metin: "İnkâr et, suçu tedarikçine at.",
        baseBasariSansi: 50,
        ipucu: "Riskli — kurtulursan itibarın sağlam kalır, yakalanırsan çok daha kötü olur",
        basariliSonuc: {
          mesaj: "İddia kanıtlanamadı, olay kapandı. İçten içe rahatsız olsan da itibarın sağlam kaldı.",
        },
        basarisizSonuc: {
          ahlak: -12,
          un: -14,
          mesaj: "Yalanın ortaya çıktı. Lonca içindeki güvenilirliğin ciddi bir darbe aldı.",
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
    metin: "Loncanın yaşlı başkanı emekliye ayrılmayı düşünüyor ve birkaç isim arasında senin adın da geçiyor. Aday olmak ister misin?",
    secenekler: [
      {
        metin: "Adaylığını koy, kampanya yap.",
        baseBasariSansi: 50,
        maliyet: 10,
        ipucu: "Kazanırsan büyük bir siyasi kazanç, kaybedersen sadece harcanan para",
        basariliSonuc: {
          un: 16,
          para: -10,
          nufuz_artis: 0,
          mesaj: "Oy çoğunluğunu kazandın! Artık loncanın en sözü geçen isimlerinden birisin.",
        },
        basarisizSonuc: {
          para: -10,
          un: -4,
          mesaj: "Seçimi kaybettin; harcadığın para ve emek boşa gitti, biraz da gururun kırıldı.",
        },
      },
      {
        metin: "Şimdilik geri çekil.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Zamanının henüz gelmediğini düşündün.",
        },
        basarisizSonuc: {
          mesaj: "Bazıları bu fırsatı kaçırdığını düşünüyor.",
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
    metin: "Meydanın ortasında bir soytarı akrobatik gösterisiyle kalabalığı topluyor; en sonunda seyircilerden birini gösterisine dahil etmek istiyor.",
    secenekler: [
      {
        metin: "Gönüllü ol, sahneye çık.",
        baseBasariSansi: 55,
        ipucu: "İyi giderse eğlence ve ün, kötü giderse mahcubiyet",
        basariliSonuc: {
          mutluluk: 10,
          un: 6,
          mesaj: "Soytarıyla birlikte kalabalığı güldürmeyi başardın; meydan seni alkışladı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Gösteri sırasında sakarlığın herkesi güldürdü, ama seninle değil sana gülerek.",
        },
      },
      {
        metin: "Kalabalıkta kal, sadece izle.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mutluluk: 5,
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
    metin: "Ağlayarak dolaşan küçük bir çocuk, annesini/babasını kaybettiğini söylüyor. Kimse durup yardım etmiyor.",
    secenekler: [
      {
        metin: "Elinden tut, ailesini bulmaya yardım et.",
        baseBasariSansi: 80,
        ipucu: "İyi bir davranış, ahlak ve ün kazandırır",
        basariliSonuc: {
          ahlak: 8,
          un: 6,
          mesaj: "Uzun aramanın ardından ailesini buldun; minnettar anne/baba seni gözyaşlarıyla kucakladı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Ailesini bulamadın ama sonunda çocuğu meydan bekçisine emanet ettin.",
        },
      },
      {
        metin: "Vaktin yok, geç.",
        baseBasariSansi: 95,
        basariliSonuc: {
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
    metin: "Bir yankesici, yaşlı bir tüccarın kesesini kapıp meydanın içinden koşmaya başlıyor. 'Tutun onu!' diye bağırışlar yükseliyor.",
    secenekler: [
      {
        metin: "Peşinden koş, yakala.",
        baseBasariSansi: 55,
        ipucu: "Yakalarsan büyük ün, kaçarsa sadece yorulursun",
        basariliSonuc: {
          un: 12,
          ahlak: 5,
          mesaj: "Onu bir tezgâhın arkasında sıkıştırıp yakaladın! Meydan seni kahraman ilan etti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Kalabalığın arasında kayboldu; nefes nefese kalakaldın, herkes seninle güldü.",
        },
      },
      {
        metin: "Karışma, kendi işine bak.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Olaya karışmadın.",
        },
        basarisizSonuc: {
          mesaj: "Bazıları senin de yardım edebileceğini düşündü.",
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
    metin: "Rengarenk bir arabanın üzerinden bağıran bir şarlatan, her derde deva bir 'mucize iksir' satıyor. Sözleri fazlasıyla ikna edici.",
    secenekler: [
      {
        metin: "Bir şişe al, dene.",
        baseBasariSansi: 35,
        maliyet: 6,
        ipucu: "Büyük ihtimalle boşa para, küçük bir şans var iyi çıkabilir",
        basariliSonuc: {
          saglik: 10,
          mesaj: "İnanılmaz ama gerçekten işe yaradı! Kendini günlerdir olmadığın kadar zinde hissediyorsun.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: -3,
          mesaj: "İksir tadı berbat, boğazını yaktı ve hiçbir işe yaramadı. Şarlatan çoktan başka bir mahalleye taşınmıştı.",
        },
      },
      {
        metin: "Şüpheyle uzaklaş.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Sağduyulu davrandın.",
        },
        basarisizSonuc: {
          mesaj: "Belki de gerçekten kaçırdığın bir fırsattı.",
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
    metin: "Meydanın kenarında bir ozan, senin bölgenle ilgili tuhaf ve komik bir türkü söylüyor; kalabalık kahkahalarla katılıyor.",
    secenekler: [
      {
        metin: "Ozana bahşiş ver, isteğinde bulun.",
        baseBasariSansi: 85,
        maliyet: 4,
        ipucu: "Küçük bir bedelle keyifli bir an",
        basariliSonuc: {
          para: -4,
          mutluluk: 8,
          mesaj: "Ozan senin için özel bir dörtlük besteledi; meydan sana gülümseyerek baktı.",
        },
        basarisizSonuc: {
          para: -4,
          mesaj: "Ozan isteğini yanlış anladı, garip bir şarkı söyledi. Yine de eğlenceliydi.",
        },
      },
      {
        metin: "Uzaktan dinle, para verme.",
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
    metin: "Meydanın kenarında oturan gizemli bir kadın seni işaret ediyor: 'Sana bir şey görüyorum evlat, gel otur.' Kimse onun kim olduğunu bilmiyor.",
    secenekler: [
      {
        metin: "Yanına git, otur.",
        baseBasariSansi: 75,
        ipucu: "Gizemli bir öngörü, ruh hâlini etkiler",
        basariliSonuc: {
          mutluluk: 6,
          mesaj: "Sana geleceğinle ilgili muğlak ama umut verici bir şey söyledi. Ne demek istediğini tam çözemesen de için ısındı.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Söyledikleri seni derinden tedirgin etti; geceleri bir süre bu sözler aklından çıkmadı.",
        },
      },
      {
        metin: "Uzaklaş, ilgilenme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Kaderini bir yabancının sözlerine emanet etmedin.",
        },
        basarisizSonuc: {
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
    metin: "İki tezgâh sahibi arasında çıkan bir anlaşmazlık hızla itiş kakışa dönüyor; meyveler ve sebzeler havada uçuşuyor.",
    secenekler: [
      {
        metin: "Araya gir, sakinleştir.",
        baseBasariSansi: 60,
        ipucu: "Başarırsan takdir toplarsın, başarısız olursan yara alırsın",
        basariliSonuc: {
          un: 8,
          ahlak: 4,
          mesaj: "İkisini de sakinleştirmeyi başardın; meydan halkı seni alkışladı.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Uçuşan bir lahana tam suratına çarptı, araya girmen faydasız oldu.",
        },
      },
      {
        metin: "Uzaktan izle, eğlen.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Komik bir manzaraydı, güvenli bir mesafeden izledin.",
        },
        basarisizSonuc: {
          mesaj: "Kavga kısa sürede kendiliğinden bitti.",
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
    sosyallesmeYeri: "salon",
    minYas: 18,
    gizemli: true,
    gorsel: "🕯️",
    baslik: "Perde Arkasındaki Fısıltı",
    metin: "Salonun en loş köşesinde iki soylu, elindeki kadehi hiç bırakmadan alçak sesle bir entrikadan bahsediyor. Sözleri seni de ilgilendiriyor olabilir.",
    secenekler: [
      {
        metin: "Yaklaş, kulak misafiri ol.",
        baseBasariSansi: 55,
        ipucu: "Değerli bir bilgi, ama fark edilme riski",
        basariliSonuc: {
          etiket_ekle: ["istihbarat_var"],
          mesaj: "Duyduğun birkaç cümle, salondaki güç dengesini anlamana yardımcı oldu.",
        },
        basarisizSonuc: {
          un: -4,
          mesaj: "Fark edildin; 'kulak misafiri' olarak anılman hoş bir şey değil.",
        },
      },
      {
        metin: "Kendi sohbetine devam et.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Entrikalara bulaşmadın.",
        },
        basarisizSonuc: {
          mesaj: "Yine de fısıltının bir kısmı kulağına çalındı.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_dans_daveti",
    kategori: "sosyal",
    sosyallesmeYeri: "salon",
    minYas: 17,
    ton: "hafif",
    gorsel: "💃",
    baslik: "Dans Pisti Daveti",
    metin: "Orkestra bir vals çalmaya başlarken, göz alıcı biri sana doğru elini uzatıp dansa davet ediyor.",
    secenekler: [
      {
        metin: "Elini tut, dans pistine çık.",
        baseBasariSansi: 65,
        ipucu: "İyi giderse ün ve mutluluk, kötü giderse mahcubiyet",
        basariliSonuc: {
          mutluluk: 10,
          un: 6,
          mesaj: "Adımların şaşırtıcı derecede akıcıydı; salon sizi izlemeye başladı.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Ayağına bastın, ritmi hiç tutturamadın. Salon nazikçe gülümsemeye çalıştı.",
        },
      },
      {
        metin: "Nazikçe reddet, kenarda kal.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Dans etmeden de keyifli bir akşam geçirdin.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Biraz utanç verici bir sessizlik oldu.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_kumar_masasi",
    kategori: "sosyal",
    sosyallesmeYeri: "salon",
    minYas: 18,
    gorsel: "♠️",
    baslik: "Kristal Kadehler Arasında Kumar",
    metin: "Salonun bir köşesinde yüksek bahisli bir kart oyunu dönüyor. Soylular gülümseyerek, ama gözleri hesap kitap yaparak kâğıtlarını açıyor.",
    secenekler: [
      {
        metin: "Masaya otur, oyna.",
        baseBasariSansi: 45,
        maliyet: 18,
        ipucu: "Yüksek bahis, yüksek risk",
        basariliSonuc: {
          para: 30,
          un: 6,
          mesaj: "Kâğıtlar senden yandaydı; masadan kalkarken salon senin adını fısıldıyordu.",
        },
        basarisizSonuc: {
          para: -18,
          mesaj: "Kötü bir el aldın, kaybın büyüktü. Gülümsemeye devam etmek zorunda kaldın.",
        },
      },
      {
        metin: "İzleyici kal, katılma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Parana dokunmadın.",
        },
        basarisizSonuc: {
          mesaj: "Sıkıcı bulundun ama önemli değildi.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_skandal_soylentisi",
    kategori: "sosyal",
    sosyallesmeYeri: "salon",
    minYas: 18,
    ton: "agir",
    gorsel: "📯",
    baslik: "Hakkında Çıkan Söylenti",
    metin: "Salona girer girmez fark ediyorsun: birkaç kişi sana bakıp fısıldaşıyor. Hakkında tuhaf bir söylenti yayılmış.",
    secenekler: [
      {
        metin: "Doğrudan yüzleş, söylentiyi çürüt.",
        baseBasariSansi: 55,
        ipucu: "Başarırsan itibarın kurtulur, başarısız olursan daha da büyür",
        basariliSonuc: {
          un: 6,
          mesaj: "Sakin ve net açıklaman söylentiyi söndürdü; salon sana hak verdi.",
        },
        basarisizSonuc: {
          un: -12,
          mutluluk: -6,
          mesaj: "Savunman tam tersi etki yarattı, söylenti daha da büyüdü. Gece boyu fısıltılardan kaçamadın.",
        },
      },
      {
        metin: "Görmezden gel, başını dik tut.",
        baseBasariSansi: 75,
        basariliSonuc: {
          ahlak: 4,
          mesaj: "Umursamaz tavrın, söylentinin kendiliğinden sönmesini sağladı.",
        },
        basarisizSonuc: {
          un: -6,
          mesaj: "Sessizliğin bazılarınca itiraf gibi algılandı.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_sanatci_kesfi",
    kategori: "sosyal",
    sosyallesmeYeri: "salon",
    gorsel: "🎨",
    baslik: "Keşfedilmemiş Yetenek",
    metin: "Salonun köşesinde kimsenin dikkatini çekmeyen genç bir ressam/müzisyen, sessizce eserini sergiliyor. Senin gözün ondan başka bir şey görmüyor.",
    secenekler: [
      {
        metin: "Yanına git, eserini övüp destek ol.",
        baseBasariSansi: 80,
        maliyet: 6,
        ipucu: "Küçük bir yatırımla iyi niyet kazanımı",
        basariliSonuc: {
          para: -6,
          mutluluk: 6,
          mesaj: "Desteğin sanatçının gözlerini parlattı; yıllar sonra adının anıldığını duyduğunda gurur duyacaksın.",
        },
        basarisizSonuc: {
          para: -6,
          mesaj: "Nazik davransan da eser pek ilgini çekmedi.",
        },
      },
      {
        metin: "Fark etmeden geç.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Salonun kalabalığına karıştın.",
        },
        basarisizSonuc: {
          mesaj: "Belki de gerçek bir yeteneği kaçırdın.",
        },
      },
    ],
  },
  {
    id: "sosyal_salon_duello_meydan_okumasi",
    kategori: "sosyal",
    sosyallesmeYeri: "salon",
    minYas: 18,
    ton: "agir",
    gorsel: "🎭",
    baslik: "Onur Kırıcı Bir Söz",
    metin: "Kadehler tokuşturulurken, kıskanç bir soylu herkesin önünde ailene hakaret dolu bir söz sarf ediyor. Salon nefesini tutmuş bekliyor.",
    secenekler: [
      {
        metin: "Onuru için düelloya çağır.",
        baseBasariSansi: 50,
        ipucu: "Çok riskli ama kazanırsan efsane olursun; küçük bir ölüm riski var",
        basariliSonuc: {
          un: 18,
          unvan_kazan: "Salonun Onurlu Kılıcı",
          mesaj: "Kısa ve gösterişli bir düellonun ardından rakibin özür diledi. Salon senin adını fısıldayarak konuştu.",
        },
        basarisizSonuc: {
          olum_sansi: 6,
          saglik: -18,
          mesaj: "Düello beklediğin gibi gitmedi; ağır yaralı bir şekilde salondan taşındın.",
        },
      },
      {
        metin: "Sükûnetini koru, cevap verme.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Onurunu kılıçla değil sabrınla korudun; bazı soylular bunu takdir etti.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Sessizliğin bazı çevrelerde korkaklık olarak yorumlandı.",
        },
      },
    ],
  },
];
