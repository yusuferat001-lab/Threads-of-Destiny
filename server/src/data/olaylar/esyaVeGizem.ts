import type { OlayTanimi } from "./types";

export const OLAY_ESYA_VE_GIZEM: OlayTanimi[] = [
  {
    id: "kg_antika_harita",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.6,
    gorsel: "🎨",
    baslik: "Eskicinin Çöpü",
    metin: "Boş vaktinde bir eskici tezgahında, üzeri çamurla kaplı eski bir parşömen buldun. Altında bir harita çizgileri var gibi görünüyor.",
    secenekler: [
      {
        metin: "Gecelerini harcayıp haritayı restore et.",
        baseBasariSansi: 45,
        ipucu: "Yorucu bir çaba ama efsanevi bir gizli eşya (Envanter) verebilir",
        basariliSonuc: {
          saglik: -5,
          mutluluk: 12,
          etiket_ekle: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Gözlerin bozulana kadar çalıştın ama başardın! Bu sıradan bir parşömen değil, unutulmuş bir geçidin haritası. Bunu saklamalısın.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          saglik: -5,
          mesaj: "Çamuru temizlerken parşömen yırtıldı ve tamamen yok oldu. Hem yoruldun hem de elin boş kaldı.",
        },
      },
      {
        metin: "Bununla uğraşma, doğrudan bir asilzadeye 'antika' diye sat.",
        baseBasariSansi: 75,
        ipucu: "Hızlı para, ahlak düşüşü",
        basariliSonuc: {
          para: 20,
          ahlak: -10,
          mesaj: "Süslü kelimelerle çamurlu parşömeni antika diye sattın. Cebin doldu ama kimi kandırdığını biliyorsun.",
        },
        basarisizSonuc: {
          un: -10,
          ahlak: -5,
          mesaj: "Asilzade bunun bir çöp olduğunu anladı ve seni kapı dışarı ettirdi.",
        },
      },
    ],
  },
  {
    id: "komik_yanlis_cenaze",
    kategori: "sosyal",
    ton: "hafif",
    minYas: 16,
    agirlik: 0.9,
    gorsel: "😅",
    baslik: "Yanlış Kapı",
    metin: "Bir cenaze törenine katılmak için gittiğin evde bir şeyler tuhaf; meğer yanlış kapıyı çalmışsın, hiç tanımadığın bir ailenin yas törenindesin ve herkes başsağlığı için sana bakıyor.",
    secenekler: [
      {
        metin: "Durumu açıkça itiraf et ve özür dile.",
        baseBasariSansi: 85,
        ipucu: "Dürüstlük ortamı yumuşatabilir",
        basariliSonuc: {
          dost_puani: 4,
          mutluluk: 6,
          mesaj: "İtirafın acılı aileyi güldürdü. Yas töreninde beklenmedik, sıcak bir anı oldun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kimse gülmedi, seni 'saygısız' ilan edip kapı dışarı ettiler.",
        },
      },
      {
        metin: "Fark etmemiş gibi davran, ağlıyormuş gibi yapıp sıvış.",
        baseBasariSansi: 65,
        ipucu: "Ustaca çıkarsan kimse fark etmez",
        basariliSonuc: {
          mutluluk: 5,
          mesaj: "Gözyaşı siler gibi yapıp sessizce dışarı süzüldün. Bu hikayeyi yıllarca kahkahayla anlatacaksın.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          un: -2,
          mesaj: "Çıkışta ayakkabına takılıp ölünün tabutuna çarptın! Herkesin dehşet dolu bakışları arasında kaçtın.",
        },
      },
      {
        metin: "Ortalığın karışıklığından faydalanıp ölüden bir hatıra (!) çal.",
        baseBasariSansi: 50,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Riskli ama kârlı bir hırsızlık",
        basariliSonuc: {
          para: 25,
          ahlak: -15,
          etiket_ekle: [
            "envanter:olunun_yuzugu",
          ],
          mesaj: "Kimse bakmazken ölünün parmağındaki altın yüzüğü cebine attın. Acımasızca, ama kârlı.",
        },
        basarisizSonuc: {
          un: -25,
          ahlak: -15,
          mesaj: "Ölünün elini tutarken dul eşi seni gördü! 'Hırsız!' çığlıkları eşliğinde meydan dayağı yedin.",
        },
      },
    ],
  },
  {
    id: "komik_seyyar_satici",
    kategori: "ticaret",
    ton: "hafif",
    agirlik: 0.5,
    gorsel: "🧪",
    baslik: "Mucize İksir",
    metin: "Gezici bir satıcı, şişedeki parlayan mor sıvının 'ölüyü dirilten, her derde deva bir mucize' olduğunu bağıra bağıra anlatıyor. Etraftakiler inanmıyor ama sıvı tuhaf bir şekilde cezbedici.",
    secenekler: [
      {
        metin: "Satıcıya güvenme, uzaklaş.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sağduyulu davrandın, paran cebinde kaldı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Meraklandın ama kendini tuttun; içinde hafif bir pişmanlık kaldı.",
        },
      },
      {
        metin: "Cebindeki altınları dök ve bir şişe satın al.",
        baseBasariSansi: 40,
        maliyet: 15,
        ipucu: "Muhtemelen para ziyanı, ama ya gerçekse? (Envantere eklenir)",
        basariliSonuc: {
          para: -10,
          etiket_ekle: [
            "envanter:sirli_iksir",
          ],
          mesaj: "Parayı verdin ve iksiri çantana attın. Garip bir şekilde şişe ısınıyor gibi. Bir gün işe yarayabilir.",
        },
        basarisizSonuc: {
          para: -15,
          mutluluk: -3,
          mesaj: "Sıvı tatsız bir keçi sütü çıktı! Geri döndüğünde satıcı çoktan tüymüştü.",
        },
      },
      {
        metin: "Kalabalığı fırsat bil, tezgâhtan bir şişe çal.",
        baseBasariSansi: 60,
        maxAhlak: 35,
        ipucu: "Sadece ahlaksızlara açık: Bedavaya mucize ya da zindan",
        basariliSonuc: {
          ahlak: -10,
          etiket_ekle: [
            "envanter:sirli_iksir",
          ],
          mesaj: "El çabukluğuyla şişeyi cübbene sakladın. Hem paran cebinde kaldı hem de gizemli bir iksirin oldu.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -10,
          para: -10,
          mesaj: "Satıcı bileğinden yakaladı! Muhafızlara teslim edilmemek için cebindeki tüm parayı rüşvet olarak vermek zorunda kaldın.",
        },
      },
    ],
  },
  {
    id: "gizem_ejderha_tilsimi",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.2,
    gorsel: "🐉",
    baslik: "Doğulu Kör Büyücü",
    metin: "Şehre gelen esrarengiz, gözleri bembeyaz bir tüccarın tezgahında tek eşya var: kadim rünlü, kan kırmızısı bir Ejderha Tılsımı. 'Sadece kaderi kanla yazılmış olanlar taşıyabilir' diye fısıldıyor.",
    secenekler: [
      {
        metin: "İstediği uçuk bedeli öde ve tılsımı al.",
        baseBasariSansi: 80,
        maliyet: 50,
        ipucu: "Efsanevi bir koruma sağlar ama seni iflas ettirebilir",
        basariliSonuc: {
          para: -44,
          etiket_ekle: [
            "envanter:ejderha_tilsimi",
          ],
          mesaj: "Altınları önüne yığdın. Tılsımı boynuna taktığın an göğsünde sıcak bir güç hissettin. Bu sıradan bir eşya değil.",
        },
        basarisizSonuc: {
          para: -50,
          saglik: -10,
          mesaj: "Tılsımı aldın ama gece kabuslarla uyandın. Vücudun bu kadim enerjiyi reddediyor.",
        },
      },
      {
        metin: "Körlüğünden faydalan, tılsımı sessizce çal.",
        baseBasariSansi: 40,
        maxAhlak: 35,
        ipucu: "Karanlık kalplere özel: Efsanevi gücü bedavaya almak...",
        basariliSonuc: {
          ahlak: -25,
          etiket_ekle: [
            "envanter:ejderha_tilsimi",
            "lanetli_ruh",
          ],
          mesaj: "Tılsımı kaptığın gibi kaçtın! Kör adam arkandan 'Bedelini ruhunla ödeyeceksin!' diye bağırdı. Güç senin ama için titriyor.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 10,
          mesaj: "Elini uzattığın an kör adam bileğini yakaladı. Gözleri parladı ve sana dokunduğu yer alev gibi yandı. Çığlık atarak kaçtın.",
        },
      },
      {
        metin: "Bu büyü işleri bana göre değil, hızla uzaklaş.",
        baseBasariSansi: 92,
        ipucu: "Güvenli ama efsaneyi kaçırmış olmanın hafif bir pişmanlığı olabilir",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Bu tür mistik şeylerin sonu genelde kötü biter dedin ve evine döndün.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Evine döndün ama o kan kırmızı tılsımın görüntüsü aklından çıkmadı. 'Ya gerçekten efsaneviydiyse?' diye düşünüp durdun.",
          detay: "Bazı fırsatları kaçırmak, insanın içinde uzun süre kanar.",
        },
      },
    ],
  },
  {
    id: "gizem_kara_kilic",
    gizemli: true,
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    agirlik: 0.2,
    gorsel: "🗡️",
    baslik: "Mezarlıktaki Kılıç",
    metin: "Gecenin karanlığında ormanda devriye gezerken, eski bir mezarın üzerinde saplı duran kara bir kılıç buldun. Etrafındaki otlar çürümüş ama kılıcın kabzası elini adeta kendine çağırıyor.",
    secenekler: [
      {
        metin: "Kılıcı kabzasından tut ve mezardan çıkar.",
        baseBasariSansi: 50,
        ipucu: "Sana eşsiz bir savaş gücü verir ama zihnini karanlığa boğar",
        basariliSonuc: {
          un: 15,
          ahlak: -15,
          mutluluk: -10,
          etiket_ekle: [
            "envanter:kara_kilic",
          ],
          mesaj: "Kılıcı çektin! Çelik anında kanına uyum sağladı. Savaş meydanında yenilmez olacaksın ama kılıcın içindeki fısıltılar hiç susmuyor.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 5,
          mesaj: "Kılıcı tuttuğun an bedenine kara bir zehir yayıldı. Çığlık atarak bıraktın, günlerce komada yattın.",
        },
      },
      {
        metin: "Kılıca dokunma, mezarın başında bir dua edip ayrıl.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Saygıyla eğildin ve uzaklaştın. Doğal olmayan şeylere bulaşmamak en iyisidir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kılıcı bıraktın ama o karanlık cazibe günlerce rüyalarına girdi.",
        },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu",
    gizemli: true,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    agirlik: 0.2,
    gorsel: "🪽",
    baslik: "Ölmek Üzere Olan Hacı",
    metin: "Kilisenin/Caminin kapısına kanlar içinde bir hacı yığıldı. Son nefesini vermeden önce avucuna parlayan, bembeyaz bir tüy sıkıştırdı. 'Bunu bana gökten inen bir melek verdi, kötülüğü kovar' diye fısıldadı ve öldü.",
    secenekler: [
      {
        metin: "Tüyü kutsal bir emanet olarak sakla.",
        baseBasariSansi: 80,
        ipucu: "Seni ölümden koruyacak kutsal bir eşya (Envanter)",
        basariliSonuc: {
          ahlak: 20,
          etiket_ekle: [
            "envanter:melek_tuyu",
          ],
          mesaj: "Tüyü göğsüne sakladın. Ne zaman kalbin daralsa tüyün sıcaklığı sana huzur veriyor. Bu gerçek bir lütuf.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "Tüyü sakladın ama cemaat senin batıl inançlara kapıldığını düşünüp seni ayıpladı.",
        },
      },
      {
        metin: "Zengin bir asilzadeye 'gerçek melek tüyü' olarak sat.",
        baseBasariSansi: 65,
        maxAhlak: 45,
        ipucu: "Sadece inancı zayıflara açık: Muazzam bir servet ama ahlaki çöküş",
        basariliSonuc: {
          para: 80,
          ahlak: -30,
          mesaj: "Asilzade bu hikayeye bayıldı ve sana bir servet ödedi. Cebin altın dolu ama ruhunu şeytana satmış gibi hissediyorsun.",
        },
        basarisizSonuc: {
          un: -30,
          ahlak: -20,
          mesaj: "Asilzade seni sahtekarlıkla suçladı ve korumalarına dövdürttü. Tüy de rüzgarda uçup gitti.",
        },
      },
      {
        metin: "Bu bir sapkınlık! Tüyü ateşe at ve adamı göm.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 10,
          un: 5,
          mesaj: "Hurafelere taviz vermedin. Tüy yanarken tuhaf bir çığlık sesi duyar gibi oldun ama aldırış etmedin.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Tüyü yaktın ama 'acaba hata mı yaptım' hissi içini kemiriyor.",
        },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu_mucize",
    kategori: "din",
    gerekliEtiketler: [
      "envanter:melek_tuyu",
    ],
    gizemli: true,
    agirlik: 0.6,
    gorsel: "🪽",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Beklenmedik Bir Şifa",
    metin: "Cemaatten yaşlı bir kadın nefes almakta zorlanarak yere yığıldı, dudakları morarıyor. Cebindeki tüyün sıcaklığını hissettin. Belki gerçek, belki hurafe — ama elinde bir şans var.",
    secenekler: [
      {
        metin: "Tüyü çıkar, alnına değdir ve dua et.",
        baseBasariSansi: 70,
        ipucu: "Efsane gerçek çıkarsa büyük bir mucize, çıkmazsa büyük bir hayal kırıklığı",
        basariliSonuc: {
          ahlak: 15,
          un: 20,
          mutluluk: 10,
          mesaj: "Tüy avucunda ısındı, neredeyse titredi. Kadının nefesi bir anda düzeldi, gözlerini açtı! Etraftaki herkes dehşet ve hayranlıkla sana bakıyor — artık bir 'mucize eli' olarak anılacaksın.",
          detay: "Hacının son sözleri yalan değilmiş.",
        },
        basarisizSonuc: {
          un: -10,
          mutluluk: -10,
          mesaj: "Tüy elinde sessiz, sıradan bir tüy gibi kaldı. Kadın gözlerinin önünde can verdi. Cemaat seni boş umut dağıtmakla suçladı.",
          detay: "Bazı efsaneler sadece efsane olarak kalıyor.",
        },
      },
      {
        metin: "Buna karışma; ölüm de Tanrı'nın bir takdiridir.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 5,
          mesaj: "Elini tutup dua ettin ama tüye dokunmadın. Kadın huzur içinde son nefesini verdi.",
          detay: "Her mucize denenmeyi hak etmez; bazen kabullenmek de bir erdemdir.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Kadın gözlerini son kez sana çevirdi. Denemediğin için yıllarca 'ya gerçekten işe yarasaydı' diye düşüneceksin.",
        },
      },
    ],
  },
  {
    id: "gizem_melek_tuyu_calinti",
    kategori: "din",
    gerekliEtiketler: [
      "envanter:melek_tuyu",
    ],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🕊️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Tüyün Peşindeki Adam",
    metin: "Gece yarısı odana biri süzülmüş, doğruca göğsündeki tüyün saklı olduğu sandığa uzanıyor. 'O tüy benim de hakkım, hacı benim amcamdı!' diye fısıldıyor karanlıkta.",
    secenekler: [
      {
        metin: "Sesini yükselt, adamı kovala.",
        baseBasariSansi: 75,
        ipucu: "Tüyü korursun ama gürültü mahalleyi ayağa kaldırabilir",
        basariliSonuc: {
          mutluluk: 5,
          un: 5,
          mesaj: "Bağırışına komşular koştu, adam karanlığa kaçtı. Tüy hâlâ senin ama gecen mahvoldu.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Adam seni ite kaka kaçtı; tüyü kapmayı başaramadan pencereden atladı.",
          detay: "Bazı geceler sadece korkuyla hatırlanır.",
        },
      },
      {
        metin: "Sakinleştir, hikayesini dinle, tüyü paylaşmayı teklif et.",
        baseBasariSansi: 80,
        ipucu: "Paylaşmak huzuru getirebilir ya da işi karıştırır",
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 5,
          mesaj: "Adamla sabaha kadar konuştunuz; hikayesini dinledin, birlikte ağladınız. Tüyü paylaşmaya karar verdiniz — ikiniz de biraz daha hafiflediniz.",
        },
        basarisizSonuc: {
          ahlak: -5,
          para: -10,
          mesaj: "Adam sözlerine inanmadı, kavga çıktı; sakinleştirmek için cebindeki parayı da vermek zorunda kaldın.",
        },
      },
      {
        metin: "Tüyü sıkıca kavra, asla vazgeçmeyeceğini söyle.",
        baseBasariSansi: 60,
        maxAhlak: 60,
        ipucu: "Bencilce ama belki de doğru — bu senin emanetin",
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Kararlılığın karşısında adam geri çekildi. Tüy hâlâ senin, ama gözlerindeki hayal kırıklığını unutamayacaksın.",
        },
        basarisizSonuc: {
          saglik: -15,
          ahlak: -10,
          mesaj: "Boğuşma çıktı, ikiniz de yaralı ayrıldınız. Tüy yerde, ikinizin de elinden kaymış.",
        },
      },
    ],
  },
  {
    id: "ruh_karanlik_fisiltilar",
    kategori: "sosyal",
    ton: "agir",
    maxMutluluk: 25,
    minYas: 14,
    gorsel: "🌑",
    baslik: "Karanlığın Fısıltıları",
    metin: "Son günlerde içindeki karanlık büyüyor. Geceleri olmayan sesler duyuyor, köşede durmayan gölgeler görüyorsun. Sanki bir şey seni ele geçirmeye çalışıyor.",
    secenekler: [
      {
        metin: "Kara Kılıcın fısıltılarına cevap ver ve karanlığı kucakla.",
        baseBasariSansi: 78,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        ipucu: "Sadece kılıca sahip olanlar görebilir: Delilik ya da muazzam bir uyanış",
        basariliSonuc: {
          mutluluk: 12,
          ahlak: -40,
          un: 20,
          mesaj: "Seslerin kaynağı kılıçtı! Onun karanlığıyla birleştin. Artık korkmuyorsun, çünkü karanlığın kendisi sen oldun.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Kılıç seni tamamen delirtmek üzereydi, son anda kılıcı yere fırlatıp kurtuldun.",
        },
      },
      {
        metin: "Kendini toparlamaya çalış, bir hekimden yardım iste.",
        baseBasariSansi: 55,
        maliyet: 10,
        ipucu: "Masraflı ama rahatlama getirir",
        basariliSonuc: {
          para: -10,
          mutluluk: 12,
          saglik: 5,
          mesaj: "Hekimin verdiği afyonlu şuruplar içini hafifletti; gölgeler biraz dağıldı.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: -8,
          mutluluk: -5,
          mesaj: "Hekim seni deli zannetti. Verdiği ilaçlar mideni bulandırmaktan başka işe yaramadı.",
        },
      },
      {
        metin: "Kendi başına, odana kapanarak direnmeye çalış.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Nasılsa geçer diye düşündün ve kapıya kilit vurup günlerce bekledin. Bir süreliğine haklı çıktın.",
        },
        basarisizSonuc: {
          saglik: -12,
          un: -15,
          mesaj: "Halüsinasyonların arttı; sokağa yarı çıplak fırlayıp bağırmaya başladın. İtibarın yerle bir oldu.",
        },
      },
    ],
  },
  {
    id: "cocuk_hastalik_baslangic",
    kategori: "saglik",
    gerekliEtiketler: [
      "cocuk_var",
    ],
    gorsel: "🤒",
    baslik: "Yanan Ateş",
    metin: "Evladın ateşler içinde kıvranıyor. Rengi solmuş ve zar zor nefes alıyor. Kasabadaki tek yetenekli hekim çok fazla altın istiyor.",
    secenekler: [
      {
        metin: "Gizli İksiri kullan ve onu anında iyileştir!",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:sirli_iksir",
        ],
        ipucu: "Gizli Envanter: Çaldığın/Aldığın iksir gerçekten mucize mi?",
        basariliSonuc: {
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mutluluk: 12,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Mucizevi Şifa",
            tur: "gecici",
            kalan_tur: 1,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "Sıvıyı çocuğunun dudaklarına damlattığın an ateşi düştü! Gözlerini açıp gülümsedi. O seyyar satıcı doğru söylüyormuş!",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Hekimi çağırt ve tüm birikimini ona ver.",
        baseBasariSansi: 70,
        maliyet: 25,
        ipucu: "Pahalı ama en güvenli yol (1 tur sonra sonuçlanır)",
        basariliSonuc: {
          para: -25,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Hekim Gözetiminde",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "Hekim geldi, sülükler ve merhemlerle tedaviye başladı. Durum birkaç güne netleşecek.",
        },
        basarisizSonuc: {
          para: -25,
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Hekim Gözetiminde",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:kotu",
          },
          mesaj: "Hekim başını iki yana salladı, 'Durumu kritik, sadece dua edin' dedi.",
        },
      },
      {
        metin: "Param yok, ıslak bezle kendim tedavi edeceğim.",
        baseBasariSansi: 30,
        ipucu: "Ölüm riski çok yüksektir",
        basariliSonuc: {
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Ev Tedavisi",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:iyi",
          },
          mesaj: "Gece gündüz başucunda bekleyip ateşini düşürdün.",
        },
        basarisizSonuc: {
          durum_ekle: {
            id: "cocuk_tedavi_surecinde",
            ad: "Ev Tedavisi",
            tur: "gecici",
            kalan_tur: 2,
            bitince_etiket: "cocuk_saglik_zamani:kotu",
          },
          mesaj: "Ateş bir türlü düşmüyor, aksine çocuk havale geçirmeye başladı.",
        },
      },
    ],
  },
  {
    id: "dunya_savas_ilani",
    kategori: "siyaset",
    // Asker zaten orduda olduğu için "katılmak ister misin?" diye sorulmaz;
    // onun için ayrı, doğrudan seferberlik varyantı var (dunya_savas_ilani_asker).
    meslekler: [
      "Tüccar",
      "Din Adamı",
    ],
    gerekliUlke: {
      savasta: false,
    },
    maxYas: 55,
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Savaş Çanları",
    metin: "{yil} yılı. {bolge} ile {komsu} arasında devasa bir savaş patlak verdi! Sınır köyleri yanıyor. Seferberlik tellalları meydanlarda bağırıyor: Her haneden eli silah tutan biri orduya katılacak!",
    secenekler: [
      {
        metin: "Kara Kılıcı kuşanarak cepheye en önde git!",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        ipucu: "Gizli Envanter: Kılıç kana susadı! Mutlak zafer ama ruhun kararır",
        basariliSonuc: {
          un: 35,
          para: 30,
          ahlak: -30,
          saglik: 5,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "cephe_gordu",
          ],
          mesaj: "Kara Kılıç elinde adeta kendi kendine dans etti. Düşmanlar senden dehşete düşüp kaçtı! Sen bir savaş tanrısı gibi anılıyorsun ama gece olduğunda kılıcın sana fısıldadığı o iğrenç şeyleri unutamıyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Gönüllü yazıl, vatan için kanını akıt.",
        baseBasariSansi: 55,
        ipucu: "Yüksek ün ve ganimet, ciddi ölüm veya sakatlanma riski",
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -8,
          saglik: -12,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "cephe_gordu",
          ],
          mesaj: "Aylarca siperlerde çamur ve kan içinde kaldın. Ama hayattasın, madalya aldın ve ganimetten payınla döndün.",
        },
        basarisizSonuc: {
          saglik: -45,
          un: 15,
          olum_sansi: 20,
          ulke_etkisi: {
            savasta: true,
          },
          durum_ekle: {
            id: "savas_yarasi",
            ad: "Gazi Yarası",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Top mermisi hemen yanına düştü. Uyandığında sahra hastanesindeydin. Bedenin parçalandı, artık eski gücün asla yerine gelmeyecek.",
        },
      },
      {
        metin: "Çürük raporu ayarla ve savaştan kaç.",
        baseBasariSansi: 60,
        maliyet: 35,
        ipucu: "Canını korur, cebini ve vicdanını yıkar",
        basariliSonuc: {
          para: -35,
          ahlak: -25,
          un: -20,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "askerlikten_kacti",
          ],
          mesaj: "Hekime rüşvet vererek kendini evde güvenceye aldın. Cepheden komşularının ölüm haberleri gelirken sen sıcak yatağındasın. İtibarın yerle bir.",
        },
        basarisizSonuc: {
          para: -35,
          un: -30,
          ahlak: -20,
          ulke_etkisi: {
            savasta: true,
          },
          mesaj: "Rüşvet verdiğin ortaya çıktı! Seni zorla en ön saflara, ölüme sürdüler. Hem onurunu hem paranı kaybettin.",
        },
      },
    ],
  },
  {
    id: "dunya_savas_ilani_asker",
    kategori: "savas",
    meslekler: [
      "Asker",
    ],
    gerekliUlke: {
      savasta: false,
    },
    maxYas: 55,
    gorsel: "🔥",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Seferberlik",
    metin: "{yil} yılı. {bolge} ile {komsu} arasında devasa bir savaş patlak verdi! Sınır köyleri yanıyor. Sen zaten orduya kayıtlısın; kimse sana katılıp katılmayacağını sormuyor, birliğin cepheye çağrılıyor. Tek soru, orada nasıl bir rol alacağın.",
    secenekler: [
      {
        metin: "Kara Kılıcı kuşanarak cepheye en önde git!",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        ipucu: "Gizli Envanter: Kılıç kana susadı! Mutlak zafer ama ruhun kararır",
        basariliSonuc: {
          un: 35,
          para: 30,
          ahlak: -30,
          saglik: 5,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "cephe_gordu",
          ],
          mesaj: "Kara Kılıç elinde adeta kendi kendine dans etti. Düşmanlar senden dehşete düşüp kaçtı! Sen bir savaş tanrısı gibi anılıyorsun ama gece olduğunda kılıcın sana fısıldadığı o iğrenç şeyleri unutamıyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "En öndeki hücum birliğine katıl, kahramanca savaş.",
        baseBasariSansi: 55,
        ipucu: "Yüksek ün ve ganimet, ciddi ölüm veya sakatlanma riski",
        basariliSonuc: {
          un: 25,
          para: 20,
          ahlak: -8,
          saglik: -12,
          ulke_etkisi: {
            savasta: true,
          },
          etiket_ekle: [
            "cephe_gordu",
          ],
          mesaj: "Aylarca siperlerde çamur ve kan içinde kaldın. Ama hayattasın, madalya aldın ve ganimetten payınla döndün.",
        },
        basarisizSonuc: {
          saglik: -45,
          un: 15,
          olum_sansi: 20,
          ulke_etkisi: {
            savasta: true,
          },
          durum_ekle: {
            id: "savas_yarasi",
            ad: "Gazi Yarası",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Top mermisi hemen yanına düştü. Uyandığında sahra hastanesindeydin. Bedenin parçalandı, artık eski gücün asla yerine gelmeyecek.",
        },
      },
      {
        metin: "Geride, lojistik ve destek hattında görev al.",
        baseBasariSansi: 80,
        ipucu: "Daha güvenli bir görev ama ganimet ve ün payın düşük",
        basariliSonuc: {
          un: 5,
          para: 8,
          saglik: -5,
          ulke_etkisi: {
            savasta: true,
          },
          mesaj: "Cephe gerisinde erzak ve mühimmat akışını sağladın; kimse senin adını anmayacak ama ordu sensiz aç kalırdı.",
          detay: "Kahramanlık her zaman en ön safta olmaz.",
        },
        basarisizSonuc: {
          saglik: -15,
          un: -8,
          ulke_etkisi: {
            savasta: true,
          },
          mesaj: "Bir düşman akını lojistik hattına kadar ulaştı; yaralı ama hayatta kaldın.",
          detay: "Geride kalmak da bazen tehlikeden azade değil.",
        },
      },
    ],
  },
  {
    id: "dunya_salgin_baslar",
    kategori: "saglik",
    gerekliUlke: {
      vebada: false,
    },
    gorsel: "☠️",
    agirlik: 0.7,
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Kara Ölüm Kapıda",
    metin: "Limanlara yanaşan son gemiyle şehre görünmez bir katil girdi. İnsanlar sokaklarda kan kusarak ölmeye başladı. Şehir kapıları kapatılmak üzere.",
    secenekler: [
      {
        metin: "Sırlı İksiri ailen ve kendin için kullan!",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:sirli_iksir",
        ],
        ipucu: "Gizli Envanter: O sahte sandığın iksir meğer bir şaheser",
        basariliSonuc: {
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          etiket_ekle: [
            "tibbi:veba_bagisik",
          ],
          mutluluk: 12,
          saglik: 15,
          un: 10,
          ulke_etkisi: {
            vebada: true,
          },
          mesaj: "İksiri içtiniz. Damarlarında buz gibi bir his yayıldı. Çevrendeki herkes kırılırken sana ve ailene tek bir sinek bile dokunamadı!",
          detay: "Sen mucizenin ta kendisi oldun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Tüm işi gücü bırak, aileyi alıp kırsala (dağlara) kaç.",
        baseBasariSansi: 70,
        maliyet: 20,
        ipucu: "Sağlığını korursun ancak şehrin ekonomisindeki yerin sıfırlanır",
        basariliSonuc: {
          para: -20,
          un: -15,
          ulke_etkisi: {
            vebada: true,
          },
          maas_carpani: 0.8,
          mesaj: "Veba maskeliler kapıları tutmadan ormana kaçtınız. Soğukta ve sefalet içinde yaşadınız ama hayattasınız.",
          detay: "Döndüğünde dükkanın/işin başkalarının eline geçmiş olacak.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -25,
          olum_sansi: 15,
          ulke_etkisi: {
            vebada: true,
          },
          durum_ekle: {
            id: "salgin_hastaligi",
            ad: "Veba Pençesi",
            tur: "gecici",
            kalan_tur: 2,
            tur_basi_saglik: -15,
          },
          mesaj: "Kaçış yolunda kervandaki birinden sana da bulaştı. Ormanın ortasında, çaresizce ateşler içinde yatıyorsun.",
        },
      },
      {
        metin: "Şehirde kal! İlaç ve erzak karaborsacılığı yap.",
        baseBasariSansi: 50,
        maliyet: 15,
        ipucu: "Korkunç bir zenginlik ama yüksek ölüm ve vicdan azabı",
        basariliSonuc: {
          para: 70,
          ahlak: -35,
          un: 15,
          unvan_kazan: "Veba Tüccarı",
          ulke_etkisi: {
            vebada: true,
          },
          mesaj: "Aspirinleri ve temiz suyu altın fiyatına sattın. İnsanlar inleyerek ölürken sen servetine servet kattın.",
        },
        basarisizSonuc: {
          saglik: -35,
          para: -15,
          olum_sansi: 25,
          ulke_etkisi: {
            vebada: true,
          },
          durum_ekle: {
            id: "salgin_hastaligi",
            ad: "Veba Pençesi",
            tur: "gecici",
            kalan_tur: 3,
            tur_basi_saglik: -15,
          },
          mesaj: "Müşterilerinden birinin kusmuğu yüzüne geldi. Altınların seni kurtaramadı, kara ölüm ciğerlerine işledi.",
        },
      },
    ],
  },
  {
    id: "dunya_salgin_ortasinda",
    kategori: "saglik",
    gerekliUlke: {
      vebada: true,
    },
    gorsel: "☠️",
    baslik: "Vebanın Tam Ortası",
    metin: "Sokaklarda ceset arabaları dolaşıyor. 'Ölülerinizi dışarı çıkarın!' sesleri yankılanıyor. Mahalleli komşu evi ateşe vermeye hazırlanıyor, çünkü içeride can çekişen bir çocuk var.",
    secenekler: [
      {
        metin: "Manastır Kedisini eve sal, seni farelerden korusun.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "esya:veba_koruyucu_kedi",
        ],
        ipucu: "Gizli Eşya: Kedi, veba taşıyan pireli fareleri avlar!",
        basariliSonuc: {
          mutluluk: 12,
          saglik: 10,
          mesaj: "O tuhaf kara kedi gece gündüz avlandı. Evin etrafına tek bir hastalıklı fare bile yaklaşamadı. Kedi senin ailenin koruyucu meleği oldu!",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Kalabalığa kafa tut ve yanan eve girip o çocuğu kurtar!",
        baseBasariSansi: 45,
        ipucu: "Büyük kahramanlık, ahlak zirvesi ama devasa bulaş riski",
        basariliSonuc: {
          un: 30,
          ahlak: 35,
          saglik: -10,
          etiket_ekle: [
            "salgin_kahramani",
          ],
          mesaj: "Kapıyı kırıp alevlerin içinden o çocuğu omuzlayarak çıkardın. Hastalığa yakalanmadın. Şehir seni peygamber gibi görüyor.",
          detay: "Kurtardığın o can, bir ömür sana minnettar kalacak.",
        },
        basarisizSonuc: {
          saglik: -35,
          ahlak: 25,
          olum_sansi: 25,
          durum_ekle: {
            id: "salgin_hastaligi",
            ad: "Veba Pençesi",
            tur: "gecici",
            kalan_tur: 3,
            tur_basi_saglik: -15,
          },
          mesaj: "Çocuğu çıkardın ama veba sana da geçti. Çocuğun nefesi yüzüne değdiği an sonun başlangıcı oldu.",
        },
      },
      {
        metin: "Kapıları çivile, pencereleri tahtala. Kimseye acıma.",
        baseBasariSansi: 85,
        ipucu: "En güvenli yol, ancak ruhunu kaybedersin",
        basariliSonuc: {
          saglik: 10,
          ahlak: -25,
          un: -15,
          mesaj: "Çocuğun çığlıkları kesilinceye kadar kulaklarını tıkadın. Kapıdan dışarı adım atmadın ve hayatta kaldın.",
          detay: "O çığlıkları duyduğun o geceyi hiçbir zaman unutmayacaksın.",
        },
        basarisizSonuc: {
          saglik: -20,
          ahlak: -20,
          olum_sansi: 15,
          durum_ekle: {
            id: "salgin_hastaligi",
            ad: "Veba Pençesi",
            tur: "gecici",
            kalan_tur: 2,
            tur_basi_saglik: -15,
          },
          mesaj: "Evini mezara çevirdin ama veba sulara çoktan karışmıştı. Dört duvar arasında ateşler içinde kıvranıyorsun.",
        },
      },
    ],
  },
  {
    id: "ekonomi_kriz_donemi_v2",
    kategori: "ticaret",
    gerekliUlke: {
      ekonomi: "kotu",
    },
    gorsel: "📉",
    baslik: "Krizin Pençesinde",
    metin: "Ülke ekonomisi çöktü, paranın değeri bir avuç toprak bile etmiyor. {es} ve çocukların açlıkla savaşıyor. Dükkânı kurtarmak için paraya, aileyi kurtarmak için ekmeğe ihtiyacın var.",
    secenekler: [
      {
        metin: "Son paramla karaborsadan çocuklara/aileme yiyecek alacağım.",
        baseBasariSansi: 85,
        gerekliEtiketler: [
          "cocuk_var",
        ],
        kilitAciklamasi: "Aileni doyurmak için çocukların olmalı.",
        ipucu: "Aile hayatta kalır, sen tamamen iflas edersin",
        basariliSonuc: {
          para: -40,
          saglik: 10,
          mutluluk: 12,
          ahlak: 20,
          un: -15,
          mesaj: "Dükkânın kepenklerini sonsuza dek kapattın. Ticaret bitti. Ama çocukların o akşam doya doya ekmek yedi. Ailenin kahramanısın.",
        },
        basarisizSonuc: {
          para: -40,
          mutluluk: -15,
          saglik: -10,
          mesaj: "Sermayeyi verdin ama karaborsacı malları çürük verdi. Hem iş battı hem çocuklar hasta oldu.",
        },
      },
      {
        metin: "İşi kurtarmam lazım! Aile dişini sıksın, parayı dükkâna bas.",
        baseBasariSansi: 45,
        ipucu: "Zengin olursun ancak ailene büyük ihanet edersin",
        basariliSonuc: {
          para: 60,
          un: 15,
          ahlak: -30,
          mutluluk: -25,
          mesaj: "Herkes batarken sen krizden imparatorluk çıkardın! Ancak eve döndüğünde zayıflıktan erimiş çocuklarının sana attığı o kırgın bakışı asla silemeyeceksin.",
        },
        basarisizSonuc: {
          para: -40,
          saglik: -20,
          mutluluk: -30,
          mesaj: "Kriz seni de yuttu. Hem dükkân battı hem ailen açlıktan kırıldı. Tam bir felaket.",
        },
      },
      {
        metin: "Ölü Yüzüğü tefeciye rehin bırakarak zaman kazan.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:olunun_yuzugu",
        ],
        ipucu: "Gizli Envanter: Çaldığın yüzük hayatını kurtarır",
        basariliSonuc: {
          ahlak: -3,
          mutluluk: -3,
          para: 20,
          etiket_sil: [
            "envanter:olunun_yuzugu",
          ],
          mesaj: "Mezardan/Tabuttan aşırdığın yüzüğü tefeciye fırlattın. Gözleri parladı ve sana borç yazmadı. Hem aileni hem işi kurtardın!",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "gizem_golge_pazari",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.2,
    gorsel: "🌒",
    baslik: "Var Olmayan Sokak",
    metin: "Gece kayboldun, kendini haritalarda olmayan sisli bir sokakta buldun — tezgahlarda ruhlar ve sırlar satılıyor. Maskeli bir tüccar parlayan siyah bir sikke uzatıyor: 'Bunu almak için altını değil, anılarını vereceksin.'",
    secenekler: [
      {
        metin: "Geçmişimdeki mutlu anıları verip sikkeyi al.",
        baseBasariSansi: 90,
        ipucu: "Mutluluğunu ve ahlakını tüketir; genellikle efsanevi Gölge Sikke'yi verir ama tüccar hile de yapabilir",
        basariliSonuc: {
          mutluluk: -30,
          ahlak: -15,
          etiket_ekle: [
            "envanter:golge_sikke",
          ],
          mesaj: "Tüccar alnına dokundu. Çocukluk sevinçlerin, annenin yüzü... hepsi silindi. Elinde ise cehennem gibi soğuk bir 'Gölge Sikke' var.",
        },
        basarisizSonuc: {
          mutluluk: -30,
          ahlak: -10,
          mesaj: "Tüccar anılarını aldı ama avucuna bıraktığı sikke bir sis gibi dağıldı. Sokak da yok oldu. Bedeli ödedin, elin boş kaldı.",
          detay: "Bazı pazarlar sadece almak için kurulur.",
        },
      },
      {
        metin: "Ruhum satılık değil! Kaç buradan.",
        baseBasariSansi: 90,
        basariliSonuc: {
          ahlak: 15,
          mesaj: "Arkanı dönüp koştun. Arkana baktığında o sokağın yerinde sadece taş bir duvar vardı. Ruhun güvende.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          saglik: -10,
          mesaj: "Kaçarken sislerin içinden kollar seni tırmaladı. Sokaktan kurtuldun ama geceler boyu o maskeli yüzü göreceksin.",
        },
      },
    ],
  },
  {
    id: "gizem_fisildayan_tas",
    kategori: "ticaret",
    gizemli: true,
    agirlik: 0.25,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Düz, Gri Bir Taş",
    metin: "Yol kenarında oturan yaşlı bir kadın, önündeki bezin üzerinde tek bir eşya sergiliyor: sıradan görünen, avuç içi büyüklüğünde gri bir taş. 'Ucuza veririm' diyor, 'ama dinlemeyi bilmek lazım. O da seni dinliyor zaten.'",
    secenekler: [
      {
        metin: "Gülümse, birkaç bakır sikkeyle taşı satın al.",
        baseBasariSansi: 95,
        maliyet: 5,
        ipucu: "Ucuz bir merak — muhtemelen sıradan bir taş (Envantere eklenir)",
        basariliSonuc: {
          para: -3,
          etiket_ekle: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Taşı avucuna aldın; ağırlığı tuhaf bir şekilde tam yerinde. Kadın gülümsedi: 'Şimdi o da senin bir parçan.' Cebine attığında hafif bir uğultu duyar gibi oldun.",
          detay: "Belki hayal gücündür, belki değil.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Taşı aldın ama sıradan bir çakıldan farksız çıktı, kadın da parayı alır almaz sırra kadem bastı.",
        },
      },
      {
        metin: "Kadını fırsattan yararlanıp taşı çal.",
        baseBasariSansi: 45,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Bedavaya gizemli bir eşya ya da rezillik",
        basariliSonuc: {
          ahlak: -10,
          etiket_ekle: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Kadın başka yöne bakarken taşı kaptığın gibi kaçtın. Arkandan bağırdığını duydun: 'O seni bulur, para vermeden de!'",
          detay: "Elinde şimdiden hafif bir uğultu var.",
        },
        basarisizSonuc: {
          un: -15,
          ahlak: -5,
          mesaj: "Kadın bileğini demir gibi bir güçle yakaladı, yaşından beklenmeyecek bir çeviklikle seni meydanda rezil etti.",
        },
      },
      {
        metin: "Deli saçması de, yoluna devam et.",
        baseBasariSansi: 92,
        ipucu: "Güvenli ama taşı hiç merak etmeden edemeyebilirsin",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Omuz silkip yürüdün. Arkandan kadının kikirdediğini duydun ama aldırmadın.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Yürüdükçe kadının sözleri kafanda dönüp durdu: 'O da seni dinliyor zaten.' Geceleri bazen o taşı merak ediyorsun.",
          detay: "Bazı meraklar, cevapsız kaldıkça büyüyor.",
        },
      },
    ],
  },
  {
    id: "gizem_fisildayan_tas_uyari",
    kategori: "sosyal",
    gerekliEtiketler: [
      "esya:fisildayan_tas",
    ],
    gizemli: true,
    agirlik: 0.6,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Taş Konuştu",
    metin: "Gece yarısı, cebindeki taş aniden ısındı ve kulağına -gerçekten kulağına mı?- ince, kumlu bir ses fısıldadı: 'Yarın... güvendiğin biri... dikkatli ol.' Sonra sessizlik. Kalbin küt küt atıyor.",
    secenekler: [
      {
        metin: "Uyarıyı ciddiye al, ertesi gün temkinli davran.",
        baseBasariSansi: 80,
        ipucu: "Belki hayal, belki gerçek bir uyarı — temkin nadiren zarar verir",
        basariliSonuc: {
          ahlak: 5,
          mutluluk: -5,
          mesaj: "Gün boyu tetikte gezdin; yakın bir dostunun sana söylemesi gereken kötü bir haberi son anda fark ettin, hazırlıksız yakalanmadın.",
          detay: "Taş haklıymış — ya da sen kendi sezgini taşın sesi sandın.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Bütün gün gölgelerden ürktün ama hiçbir şey olmadı; sadece uykusuz ve gergin bir gün geçirdin.",
        },
      },
      {
        metin: "Bu bir rüyaydı, aldırma.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Omuz silktin ve unuttun gitti. Belki de gerçekten sadece bir rüyaydı.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          un: -5,
          mesaj: "Aldırmadın ve gerçekten de güvendiğin biri seni küçük düşürecek bir dedikodu yaydı. Keşke dinleseydin.",
        },
      },
    ],
  },
  {
    id: "gizem_fisildayan_tas_istek",
    kategori: "sosyal",
    gerekliEtiketler: [
      "esya:fisildayan_tas",
    ],
    gizemli: true,
    ton: "agir",
    agirlik: 0.5,
    gorsel: "🪨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Taşın İsteği",
    metin: "Taş bu kez daha net konuştu: 'Bana bir isim ver. Sevdiğin birinin adını. Karşılığında sana yıllarca yetecek bir şans vereceğim.' Sesi artık kumlu değil, neredeyse insan gibi.",
    secenekler: [
      {
        metin: "Rastgele, tanımadığın birinin adını uydur, kandır.",
        baseBasariSansi: 50,
        ipucu: "Riskli bir hile — taş anlarsa öfkelenebilir",
        basariliSonuc: {
          un: 15,
          para: 20,
          mesaj: "Taş bir süre sessiz kaldı, sonra 'Kabul ettim' diye fısıldadı. İnandırıcı yalanın işe yaramış gibi görünüyor; önümüzdeki günler tuhaf bir şansla geçti.",
          detay: "Ya da her şey sadece tesadüftü.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          ahlak: -5,
          mesaj: "'Yalan söyledin' diye tısladı taş, sesi öfkeyle titredi. O günden sonra cebinde taşımak bile seni ürpertiyor.",
        },
      },
      {
        metin: "Kimsenin adını verme; taşı sessizce bir kuyuya at.",
        baseBasariSansi: 95,
        ipucu: "Güvenli ama gizemi sonsuza dek kaybedersin",
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 5,
          etiket_sil: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Taşı kuyunun karanlığına bıraktın. Dipten hafif, hayal kırıklığına uğramış bir uğultu yükseldi, sonra hiç. İçin rahatladı.",
          detay: "Bazı sırlar açığa çıkmadan gömülmeyi hak ediyor.",
        },
        basarisizSonuc: {
          etiket_sil: [
            "esya:fisildayan_tas",
          ],
          mutluluk: -5,
          mesaj: "Taşı attın ama kuyudan yükselen o son fısıltıyı -adını biliyordu- hiç unutamayacaksın.",
        },
      },
      {
        metin: "Sevdiğin birinin adını gerçekten fısılda.",
        baseBasariSansi: 88,
        maxAhlak: 70,
        ipucu: "Karanlık ama çoğunlukla etkili bir bahis — bedeli tam olarak belli değil, ters de tepebilir",
        basariliSonuc: {
          para: 60,
          un: 25,
          ahlak: -20,
          etiket_sil: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Adı fısıldadığın an taş buz gibi soğudu, sonra elinde toza dönüştü. Ertesi hafta işlerin inanılmaz bir şekilde açıldı — ama o ismi verdiğin kişiye her baktığında için ürperiyor.",
          detay: "Şansın nereden geldiğini asla kimseye anlatamayacaksın.",
        },
        basarisizSonuc: {
          ahlak: -20,
          mutluluk: -25,
          saglik: -10,
          etiket_sil: [
            "esya:fisildayan_tas",
          ],
          mesaj: "Taş toza döndü ama karşılığında hiçbir kapı açılmadı. Sadece adını verdiğin kişi haftalar içinde hastalandı. Bedeli buymuş.",
          detay: "Fısıltı hep bir şey alır; bu sefer sana hiçbir şey vermedi.",
        },
      },
    ],
  },
  {
    id: "gizem_eski_ayna",
    kategori: "sosyal",
    gizemli: true,
    agirlik: 0.25,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Terk Edilmiş Konağın Malları",
    metin: "Şehir dışındaki terk edilmiş bir konağın eşyaları açık arttırmayla satılıyor. Çoğu eşya küf kokuyor ama köşede duran, gümüş kaplamalı bir ayna dikkatini çekiyor. Tuhaf olan şu: içinde yansıyan oda, durduğun yerden biraz farklı görünüyor.",
    secenekler: [
      {
        metin: "Aynayı satın al.",
        baseBasariSansi: 90,
        maliyet: 15,
        ipucu: "Ucuz değil ama içindeki his paha biçilemez (Envantere eklenir)",
        basariliSonuc: {
          para: -10,
          etiket_ekle: [
            "esya:eski_ayna",
          ],
          mesaj: "Aynayı evine taşıdın. Duvara astığın an, içindeki yansıma bir an gecikip sana yetişti — sanki ayna da senin gibi ilk kez bu odayı görüyordu.",
          detay: "Belki yorgunluktandır, belki değil.",
        },
        basarisizSonuc: {
          para: -20,
          mesaj: "Aynayı aldın ama açık arttırma hilesiyle beklediğinden fazla ödedin.",
        },
      },
      {
        metin: "Kalabalığın karışıklığından yararlanıp aynayı gizlice al.",
        baseBasariSansi: 40,
        maxAhlak: 40,
        ipucu: "Sadece ahlaksızlara açık: Bedavaya esrarengiz bir eşya ya da tutuklanma",
        basariliSonuc: {
          ahlak: -10,
          etiket_ekle: [
            "esya:eski_ayna",
          ],
          mesaj: "Kimse fark etmeden aynayı bir örtüye sarıp uzaklaştın. Ellerin, açıklayamadığın bir sebeple soğumuştu.",
        },
        basarisizSonuc: {
          para: -15,
          un: -10,
          mesaj: "Görevliler seni suçüstü yakaladı; hem cezayı ödedin hem de mahallede adın 'hırsız' diye anılmaya başladı.",
        },
      },
      {
        metin: "Tuhaf bir eşya bu, ilgilenme.",
        baseBasariSansi: 92,
        ipucu: "Güvenli ama o yansımayı unutman zor olabilir",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Aynaya son bir bakış attın ve arkanı döndün. İçindeki yansımanın da -bir an için- arkasını döndüğünü fark etmedin bile.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Uzaklaşırken bile o bir anlık gecikmeyi düşünmeden edemedin. Bazı geceler, gözlerini kapatınca hâlâ o odayı görüyorsun.",
          detay: "Görmezden gelinen şeyler bazen peşinden geliyor.",
        },
      },
    ],
  },
  {
    id: "gizem_eski_ayna_yansima",
    kategori: "sosyal",
    gerekliEtiketler: [
      "esya:eski_ayna",
    ],
    gizemli: true,
    ton: "agir",
    agirlik: 0.6,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yanlış Yansıma",
    metin: "Gece bir su içmek için kalktın, aynanın önünden geçerken durdun. Yansımandaki sen, sen değildin — bir an gecikerek, farklı bir ifadeyle sana bakıyordu. Sonra her şey normale döndü.",
    secenekler: [
      {
        metin: "Aynaya yaklaş, dikkatlice incele.",
        baseBasariSansi: 65,
        ipucu: "Cesaret bir şey öğretebilir ama korkunç da olabilir",
        basariliSonuc: {
          mutluluk: -5,
          mesaj: "Yüzünü camdan santimlerce uzağa götürdün. Yansıman gülümsedi — sen gülümsemeden. Ama tam o an geri çekildiğinde her şey yeniden senindi. Ne gördüğünü tam açıklayamıyorsun ama artık dünyaya biraz daha farklı bakıyorsun.",
          detay: "Bazı deneyimler seni değiştirir, açıklayamasan bile.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -15,
          mesaj: "Camda beliren şey sana doğru bir el uzattı! Çığlık atarak geri sıçradın, aynayı düşürecektin neredeyse. Günlerce gözlerini kapatınca o eli görüyorsun.",
        },
      },
      {
        metin: "Aynayı bir bezle ört, sabaha kadar açma.",
        baseBasariSansi: 95,
        basariliSonuc: {
          mesaj: "Aynayı örttün ve sırtını dönüp yattın. Sabah her şey normaldi, ya da öyle görünüyordu.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Örttün ama örtünün altından hafif bir tıkırtı duyduğunu yemin edebilirdin.",
        },
      },
    ],
  },
  {
    id: "gizem_eski_ayna_kehanet",
    kategori: "sosyal",
    gerekliEtiketler: [
      "esya:eski_ayna",
    ],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🪞",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Aynadaki Uyarı",
    metin: "Aynaya baktığında kendini görmedin: Tanıdık bir sokakta, üzerine devrilmek üzere olan bir yük arabası gördün, sonra her şey karardı. Görüntü o kadar netti ki hâlâ tüylerin diken diken.",
    secenekler: [
      {
        metin: "Gördüğün sokaktan birkaç gün uzak dur.",
        baseBasariSansi: 85,
        ipucu: "Belki paranoya, belki hayatını kurtaracak bir sezgi",
        basariliSonuc: {
          mutluluk: -5,
          mesaj: "Yolunu değiştirdin. Üç gün sonra o sokakta gerçekten bir yük arabası devrildiğini, birinin ağır yaralandığını duydun. Ayna yalan söylemiyormuş.",
          detay: "Şimdi ona her baktığında hem minnettar hem tedirginsin.",
        },
        basarisizSonuc: {
          mutluluk: -10,
          mesaj: "Yolunu değiştirdin ama hiçbir şey olmadı; belki sadece kötü bir rüyaydı, kendini biraz aptal hissettin.",
        },
      },
      {
        metin: "Boş ver, kadere karışma; her zamanki gibi yaşa.",
        baseBasariSansi: 60,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Görüntüyü unutmaya çalıştın. Günler sıradan geçti, ayna bir daha o sokaktan bahsetmedi.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 8,
          mesaj: "Tam o sokaktan geçerken bir yük arabası devrildi! Son anda kendini attın ama yine de ağır yaralandın. Ayna seni uyarmıştı.",
        },
      },
    ],
  },
  {
    id: "rusvet_memur",
    kategori: "siyaset",
    gorsel: "🪙",
    agirlik: 0.6,
    baslik: "Mühür ve Kese",
    metin: "İşin için hayati olan ruhsat haftalardır masada bekliyor. Şişman memur, 'Buralar hep eksik, belki bir kese altın bu eksikleri tamamlar' diyerek sinsi sinsi sana gülümsüyor.",
    secenekler: [
      {
        metin: "Lanetli Yüzüğü rüşvet olarak ver.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:olunun_yuzugu",
        ],
        ipucu: "Gizli Envanter: Hem ruhsatı al hem de memurdan intikam al",
        basariliSonuc: {
          etiket_sil: [
            "envanter:olunun_yuzugu",
          ],
          para: 10,
          un: 10,
          mesaj: "Tabuttan aşırdığın o soğuk yüzüğü memura verdin. Adam sevinçle mührü bastı. Üç gün sonra memurun aklını kaçırıp kendini nehre attığını duydun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "İstediğini ver, sistemi besle.",
        baseBasariSansi: 75,
        maliyet: 18,
        ipucu: "Hızlı çözüm, ahlaki düşüş",
        basariliSonuc: {
          para: -18,
          ahlak: -20,
          maas_carpani: 1.12,
          mesaj: "Altınları aldı ve saniyeler içinde işini halletti. Artık bu bozuk düzenin sadık bir parçasısın.",
        },
        basarisizSonuc: {
          para: -18,
          un: -25,
          ahlak: -15,
          mesaj: "Şanssızlık! Odaya tam o an müfettiş girdi. Rüşvet vermekten ceza yedin ve ruhsat iptal edildi.",
        },
      },
      {
        metin: "Ben rüşvet vermem! Üst makama şikayet et.",
        baseBasariSansi: 45,
        ipucu: "Büyük saygınlık ama sistemi karşına alma riski",
        basariliSonuc: {
          un: 25,
          ahlak: 25,
          para: -5,
          etiket_ekle: [
            "durust_bilinen",
          ],
          mesaj: "Memuru şikayet edip kovdurttun! İşin halloldu ve dürüst esnaf seni omuzlarda taşıdı.",
        },
        basarisizSonuc: {
          para: -20,
          un: -15,
          ahlak: 15,
          mesaj: "Şikayet ettiğin kişi memurun dayısı çıktı! Dosyan sümen altı edildi ve aylar boyunca iş yapamadın.",
        },
      },
    ],
  },
  {
    id: "zincir_tuccar_teslimat",
    kategori: "ticaret",
    meslekler: [
      "Tüccar",
    ],
    gerekliEtiketler: [
      "buyuk_siparis_surecinde",
    ],
    yasakliEtiketler: [
      "buyuk_siparis_bitti",
    ],
    agirlik: 2,
    gorsel: "🏆",
    baslik: "Sözleşmenin Sonu",
    metin: "Yıllardır sürdürdüğün büyük tedarik anlaşması nihayet son teslimat aşamasına geldi. Ortağın hesapları kapatmak için seni çağırdı.",
    secenekler: [
      {
        metin: "Gölge Sikkesi'ni masaya koy ve ortağının zihnini ele geçir.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:golge_sikke",
        ],
        ipucu: "Gizli Envanter: Tüm kâr sana kalır, ancak ruhundan bir parça daha kopar",
        basariliSonuc: {
          para: 80,
          un: 30,
          ahlak: -40,
          maas_carpani: 1.3,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
            "envanter:golge_sikke",
          ],
          mesaj: "Sikkeyi masaya koyduğunda ortağının gözleri boşluğa düştü. Şirket haklarının büyük bölümünü kendi elleriyle sana devretti.",
          detay: "Ciddi bir servet ve kalıcı bir gelir kazandın. Adam ertesi gün delirdi, sen ise aynadaki yansımandan bile korkuyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Son teslimatı bizzat denetleyerek kapat.",
        baseBasariSansi: 68,
        ipucu: "Yıllarca süren emeğin karşılığı ya da hüsran",
        basariliSonuc: {
          para: 65,
          un: 25,
          maas_carpani: 1.2,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
          ],
          mesaj: "Anlaşma başarıyla tamamlandı; yıllarca süren emeğin karşılığını fazlasıyla aldın.",
          detay: "Geriye dönüp baktığında bu anlaşmanın seni büyük ölçüde değiştirdiğini görüyorsun. Artık şehirdeki en tanınan tüccarlardan birisin.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          un: -10,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
          ],
          mesaj: "Son teslimatta bir anlaşmazlık çıktı; anlaşma zararla kapandı.",
          detay: "Yıllarca sürdürdüğün bu ilişki, umduğun ödülü vermeden bitti. Yine de tecrübe kazandın.",
        },
      },
      {
        metin: "Vekilini gönder, kendin uzak dur.",
        baseBasariSansi: 75,
        ipucu: "Daha az risk, daha az kontrol",
        basariliSonuc: {
          para: 35,
          un: 10,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
          ],
          mesaj: "Vekilin işi düzgünce hallettim; anlaşma sorunsuz kapandı.",
          detay: "Bizzat orada olmadın ama sonuç gayet tatmin ediciydi. Bazen güvenmek yeterlidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          etiket_ekle: [
            "buyuk_siparis_bitti",
          ],
          etiket_sil: [
            "buyuk_siparis_surecinde",
          ],
          mesaj: "Vekilin son anda hesap hatası yaptı; anlaşma beklediğinden az kazandırdı.",
          detay: "Belki bizzat orada olsaydın fark ederdin. Artık bu uzun hikaye kapandı.",
        },
      },
    ],
  },
  {
    id: "zincir_din_yolda_sinav",
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    gerekliEtiketler: [
      "kutsal_gorevde",
    ],
    gorsel: "🌄",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Yolda Bir Sınav",
    metin: "Görev yerine giden yolda, aç ve parasız bir grup mülteciyle karşılaştın. Yanındaki azıcık erzak ya onları ya seni idare eder.",
    secenekler: [
      {
        metin: "Onlara Gizemli Harita'yı verip eski tapınağın yerini göster.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:gizemli_harita",
        ],
        ipucu: "Gizli Envanter: Hem erzağını korur hem onları kurtarırsın",
        basariliSonuc: {
          ahlak: 30,
          un: 15,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Mültecilere eski haritayı verip gizli erzak deposunun yolunu tarif ettin. Gözyaşlarıyla ellerini öpüp yola koyuldular.",
          detay: "Bir harita, bir aileyi açlıktan kurtardı. Vicdanın kuş gibi hafif.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Erzağının çoğunu onlarla paylaş.",
        baseBasariSansi: 75,
        ipucu: "Vicdan huzuru, kendi yolculuğun zorlaşır",
        basariliSonuc: {
          ahlak: 22,
          saglik: -10,
          mesaj: "Erzağını paylaştın; kalanıyla zorlanarak da olsa yoluna devam ettin.",
          detay: "Aç kaldığın günler oldu ama o ailenin gözlerindeki minnet hâlâ aklında.",
        },
        basarisizSonuc: {
          saglik: -20,
          ahlak: 15,
          mesaj: "Paylaştığın erzak yetersiz kaldı; kalan yolu aç ve zayıf düşerek tamamladın.",
          detay: "İyilik yapmak seni de yordu ama pişman değilsin.",
        },
      },
      {
        metin: "Kendi erzağını koru, yoluna devam et.",
        baseBasariSansi: 85,
        ipucu: "Güvenli yolculuk, vicdan bedeli",
        basariliSonuc: {
          saglik: 8,
          ahlak: -18,
          mesaj: "Erzağını koruyup görev yerine sağlıklı vardın.",
          detay: "O ailenin yüzünü zaman zaman hatırlıyorsun; kendine haklı sebepler sıralıyorsun.",
        },
        basarisizSonuc: {
          ahlak: -20,
          saglik: -8,
          mesaj: "Erzağını korudun ama yol yine de seni yıprattı; üstelik vicdanın hiç rahat değil.",
          detay: "Hem zorlandın hem de o kararın seninle kaldı.",
        },
      },
    ],
  },
  {
    id: "yerlesim_dag_ayi_karsilasmasi",
    kategori: "saglik",
    gerekliEtiketler: [
      "yerlesim:dag",
    ],
    gorsel: "🐻",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Dağın Sahibi",
    metin: "Dağ başındaki evine dönerken dar patikada devasa, aç bir ayıyla göz göze geldin. Ne o kıpırdıyor ne sen. Silahsızsan ölümle burun burunasın.",
    secenekler: [
      {
        metin: "Kara Kılıcı çek ve ayının üzerine yürü!",
        baseBasariSansi: 80,
        gerekliEtiketler: [
          "envanter:kara_kilic",
        ],
        ipucu: "Gizli Envanter: Kılıç kana susadı — ama ayı da hızlı",
        basariliSonuc: {
          un: 30,
          saglik: 5,
          ahlak: -15,
          mesaj: "Kılıcı çektiğin an ayı sana değil, kılıçtan sızan karanlığa baktı ve korkuyla geri adım attı. Ama sen durmadın. Tek darbede canavarı yere serdin.",
          detay: "Köyde sana 'Ayı Boğan' diyorlar ama sen kılıcın o an elinde nasıl kendi kendine titreştiğini unutamıyorsun.",
        },
        basarisizSonuc: {
          saglik: -35,
          olum_sansi: 15,
          mesaj: "Kılıç karanlığını salmadan ayı üstüne çöktü. Pençeler omzunu, çeneni parçaladı; kılıcı kaldırmaya bile fırsatın olmadı.",
          detay: "Efsanevi çeliğin de bir hız sınırı varmış.",
        },
      },
      {
        metin: "Yavaşça geri çekil, gürültü çıkarma.",
        baseBasariSansi: 65,
        ipucu: "Güvenli ama sinir bozucu bekleyiş",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Ayı ilgisini kaybedip ormana döndü; sen de nefesini tutarak evine ulaştın.",
          detay: "Dağda yaşamanın ilk kuralı sabırdır; bugün onu bir kez daha kanıtladın.",
        },
        basarisizSonuc: {
          saglik: -25,
          olum_sansi: 8,
          mesaj: "Ayı ürktü ve üzerine geldi; kendini zar zor bir kayanın arkasına atarak kurtardın.",
          detay: "Sırtındaki pençe izleri uzun süre iyileşmedi.",
        },
      },
      {
        metin: "Elindeki değneği sallayıp yüksek sesle bağır.",
        baseBasariSansi: 45,
        ipucu: "Riskli ama hızlı çözüm",
        basariliSonuc: {
          un: 15,
          mesaj: "Ayı şaşırıp kaçtı; köye döndüğünde hikayeni anlata anlata bitiremedin.",
          detay: "Dağ köylüleri arasında adın bir süre 'cesur' olarak anıldı.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 15,
          mesaj: "Ayı saldırdı; kollarındaki ve göğsündeki derin yaralarla köye kanlar içinde ulaştın.",
          detay: "O günden sonra ormana her girişinde o anı hatırlıyorsun.",
        },
      },
    ],
  },
  {
    id: "derinlik_manastir_kedisi",
    gizemli: true,
    kategori: "din",
    meslekler: [
      "Din Adamı",
    ],
    yasakliEtiketler: [
      "esya:veba_koruyucu_kedi",
    ],
    agirlik: 0.5,
    gorsel: "🐈‍⬛",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Manastırın Kara Kedisi",
    metin: "Manastırın ambarında dolaşan yaşlı bir kara kedi var. Bazı keşişler onu uğursuz sayıyor, bazıları fare avındaki ustalığından dolayı kutsuyor.",
    secenekler: [
      {
        metin: "Kediye sahip çık, ambarda tut.",
        baseBasariSansi: 85,
        ipucu: "Küçük bir gelenek, uzun vadeli fayda",
        basariliSonuc: {
          ahlak: 5,
          etiket_ekle: [
            "esya:veba_koruyucu_kedi",
          ],
          mesaj: "Kediyi ambarda tutmaya karar verdin; fareler azaldıkça ambar daha temiz kaldı.",
          detay: "Bazen en sıradan bir yaratık, en büyük tehlikelere karşı sessiz bir kalkan olabiliyor.",
        },
        basarisizSonuc: {
          mesaj: "Kimi keşişler buna karşı çıktı ama kedi yine de ambarda kaldı.",
          detay: "Gelenek ile pratiklik arasında ince bir denge var.",
        },
      },
      {
        metin: "Uğursuzluk getirir diye kediyi kovun.",
        baseBasariSansi: 90,
        ipucu: "Geleneksel ama riskli",
        basariliSonuc: {
          ahlak: -5,
          mesaj: "Kedi kovuldu; bazı keşişler rahatladı.",
          detay: "Batıl inanç bazen pratik faydanın önüne geçiyor.",
        },
        basarisizSonuc: {
          saglik: -5,
          mesaj: "Kedinin gitmesiyle ambarda fareler hızla çoğaldı.",
          detay: "Bazı kararların bedeli aylar sonra ortaya çıkıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_hazine_haritasi",
    gizemli: true,
    kategori: "ticaret",
    yasakliEtiketler: [
      "envanter:hazine_haritasi",
      "envanter:hazine_bulundu",
    ],
    agirlik: 0.5,
    gorsel: "🗺️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Eski Bir Harita",
    metin: "Bir eskici dükkânında, kenarları yanmış, eski bir harita buldun. Üzerinde şifreli işaretler ve bilinmeyen bir yerin krokisi var.",
    secenekler: [
      {
        metin: "Haritayı satın al.",
        baseBasariSansi: 90,
        maliyet: 10,
        ipucu: "Küçük masraf, meçhul bir fırsat",
        basariliSonuc: {
          etiket_ekle: [
            "envanter:hazine_haritasi",
          ],
          para: -6,
          mesaj: "Haritayı aldın; belki sadece kağıt parçası, belki gerçek bir hazinenin anahtarı.",
          detay: "Meraklı bir zihin için küçük bir bedel.",
        },
        basarisizSonuc: {
          para: -15,
          mesaj: "Haritayı aldın ama eskici seni biraz kazıklamış gibi görünüyor.",
          detay: "Her pazarlık kazançlı bitmiyor.",
        },
      },
      {
        metin: "İlgilenme, sıradan bir kağıt parçası de.",
        baseBasariSansi: 95,
        ipucu: "Güvenli",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Haritayı görmezden geldin, yoluna devam ettin.",
          detay: "Bazı fırsatlar gözden kaçırılmaya değer olabilir — ya da değmez, kim bilir.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yürürken haritayı bir daha düşünmeden edemedin.",
          detay: "Merak bazen peşini bırakmıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_hazine_kazisi",
    kategori: "ticaret",
    gerekliEtiketler: [
      "envanter:hazine_haritasi",
    ],
    yasakliEtiketler: [
      "envanter:hazine_bulundu",
    ],
    agirlik: 0.8,
    gorsel: "⛏️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Haritanın İşaret Ettiği Yer",
    metin: "Haritayı uzun süre inceledikten sonra, işaret ettiği yeri bulmayı başardın: terk edilmiş bir mağara girişi. Kazmaya değer mi?",
    secenekler: [
      {
        metin: "Kazı yap, riski göze al.",
        baseBasariSansi: 40,
        maliyet: 15,
        ipucu: "Büyük hazine ya da boşa geçen zaman ve tehlike",
        basariliSonuc: {
          para: 80,
          un: 15,
          etiket_ekle: [
            "envanter:hazine_bulundu",
          ],
          etiket_sil: [
            "envanter:hazine_haritasi",
          ],
          mesaj: "Mağaranın derinliklerinde gerçekten bir hazine sandığı buldun!",
          detay: "Bazen çocukça görünen bir merak, hayatının en büyük kazancına dönüşebiliyor.",
        },
        basarisizSonuc: {
          saglik: -20,
          para: -15,
          etiket_sil: [
            "envanter:hazine_haritasi",
          ],
          mesaj: "Mağara çöktü, hazine falan yoktu; güçlükle dışarı çıktın.",
          detay: "Harita sonunda sadece eski bir kağıt parçasıymış.",
        },
      },
      {
        metin: "Riske girme, haritayı sat.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, küçük kazanç",
        basariliSonuc: {
          para: 20,
          etiket_sil: [
            "envanter:hazine_haritasi",
          ],
          mesaj: "Haritayı meraklı bir koleksiyoncuya sattın; küçük ama garanti bir kazanç.",
          detay: "Bazen merakı başkasına devretmek en akıllıcasıdır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 8,
          etiket_sil: [
            "envanter:hazine_haritasi",
          ],
          mesaj: "Haritayı beklediğinden düşük bir fiyata sattın.",
          detay: "Her pazarlık umduğun gibi sonuçlanmıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti",
    gizemli: true,
    kategori: "din",
    yasakliEtiketler: [
      "esya:kutsal_kalinti",
    ],
    agirlik: 0.4,
    gorsel: "✨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kutsal Bir Emanet",
    metin: "Yıkık bir şapelin altında, kim olduğu bilinmeyen bir azize ait olduğu söylenen küçük bir emanet buldun. Halk arasında ona dokunanın ölümden bir kez döneceği anlatılır.",
    secenekler: [
      {
        metin: "Emaneti yanında taşı.",
        baseBasariSansi: 90,
        ipucu: "Sadece bir söylenti mi, yoksa gerçek mi?",
        basariliSonuc: {
          ahlak: 8,
          etiket_ekle: [
            "esya:kutsal_kalinti",
          ],
          mesaj: "Emaneti bir bez parçasına sarıp yanına aldın; belki sadece bir teselli, belki daha fazlası.",
          detay: "İster inan ister inanma, artık boynunda hafif bir ağırlık taşıyorsun.",
        },
        basarisizSonuc: {
          mesaj: "Emaneti aldın ama taşıması seni tedirgin etti, kısa süre sonra bir tanıdığına verdin.",
          detay: "Bazı sorumluluklar herkese göre değil.",
        },
      },
      {
        metin: "Emanete dokunma, kilisenin yetkililerine bildir.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, ahlaklı",
        basariliSonuc: {
          ahlak: 12,
          mesaj: "Emaneti resmi makamlara teslim ettin; dürüstlüğün takdir topladı.",
          detay: "Bazı hazineler kişisel değil, ortak mirastır.",
        },
        basarisizSonuc: {
          mesaj: "Bildirdin ama yetkililer pek ilgilenmedi.",
          detay: "Her dürüstlük hak ettiği ilgiyi görmüyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti_mucizesi",
    kategori: "din",
    gerekliEtiketler: [
      "esya:kutsal_kalinti",
    ],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "✨",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ölümün Eşiğinde",
    metin: "Ani bir ateş seni yatağa düşürdü; nefesin daralıyor, çevrendekiler fısıltıyla vedalaşıyor sanki. Göğsündeki o eski emanet, tenine değdiği yerde tuhaf bir sıcaklık yayıyor.",
    secenekler: [
      {
        metin: "Emaneti sıkıca tut, efsaneye güven.",
        baseBasariSansi: 100,
        ipucu: "Gizli Emanet: Efsane gerçekmiş — ama böyle bir mucize bir kereliğine",
        basariliSonuc: {
          saglik: -5,
          etiket_sil: [
            "esya:kutsal_kalinti",
          ],
          mesaj: "Emanet elinde parladı ve için bir anda ısındı. Ateşin kırıldı, nefesin açıldı — sanki bir şey seni geri çekti. Emanet ise elinde toza dönüştü; gücünü bu bir kerelik mucizede tüketti.",
          detay: "Halk arasındaki söylenti doğruymuş: bu emanet, ölümden bir kez döndürür.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Emanete güvenme, sadece hekime ve kadere güven.",
        baseBasariSansi: 55,
        ipucu: "Güvenli bir inanç ama efsaneyi hiç sınamayacaksın",
        basariliSonuc: {
          saglik: -5,
          mesaj: "Vücudun kendi başına direndi, ateş yavaşça düştü. Emanet hâlâ boynunda, sırrını hiç öğrenemedin.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 15,
          mesaj: "Ateş günlerce sürdü, bedenin ağır bir yara aldı. Emanete dokunmadın; belki haklıydın, belki büyük bir fırsatı kaçırdın.",
        },
      },
    ],
  },
  {
    id: "derinlik_kutsal_kalinti_soru",
    kategori: "din",
    gerekliEtiketler: [
      "esya:kutsal_kalinti",
    ],
    gizemli: true,
    agirlik: 0.4,
    gorsel: "⛪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Emanetin Sırrı Duyuldu",
    metin: "Taşıdığın emanetle ilgili söylenti mahalleye yayılmış. Bir grup hacı adayı kapına dayandı: 'Duyduk ki elinde kutsal bir emanet varmış, bize göster, dokunmamıza izin ver!'",
    secenekler: [
      {
        metin: "Emaneti göster, dokunmalarına izin ver.",
        baseBasariSansi: 85,
        ipucu: "Cömertlik saygı kazandırır ama emaneti tehlikeye atarsın",
        basariliSonuc: {
          un: 15,
          ahlak: 10,
          mesaj: "Hacılar sırayla emanete dokunup dua etti. Adın bölgede 'kutsal emanetin bekçisi' olarak anılmaya başladı.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Kalabalık kontrolden çıktı, biri emaneti kapıp kaçmaya çalıştı; güçlükle geri aldın, bu kargaşada başka eşyaların da kayboldu.",
        },
      },
      {
        metin: "Emaneti sakla, kimseye göstermeyi reddet.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          ahlak: 7,
          mutluluk: -1,
          un: 4,
          mesaj: "Kapıyı kapattın. Bazıları hayal kırıklığına uğradı ama emanet güvende.",
        },
        basarisizSonuc: {
          un: -10,
          mesaj: "'Demek ki gerçek değilmiş, yoksa saklamazdı' diyerek dedikodu yaymaya başladılar.",
        },
      },
      {
        metin: "Emaneti kiliseye/vakfa bağışla, kalabalıktan kurtul.",
        baseBasariSansi: 95,
        ipucu: "Huzur bulursun ama efsaneyi bir daha asla sınayamazsın",
        basariliSonuc: {
          ahlak: 20,
          un: 5,
          etiket_sil: [
            "esya:kutsal_kalinti",
          ],
          mesaj: "Emaneti resmi makama teslim ettin; omuzlarından ağır bir yük kalktı. Artık bekçisi değil, sadece bir tanığısın.",
        },
        basarisizSonuc: {
          etiket_sil: [
            "esya:kutsal_kalinti",
          ],
          mutluluk: -5,
          mesaj: "Bağışını kabul ettiler ama teşekkür bile etmediler; emanetsiz kaldın, karşılığında hiçbir şey almadın.",
        },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin",
    gizemli: true,
    kategori: "ticaret",
    yasakliEtiketler: [
      "esya:lanetli_altin",
    ],
    agirlik: 0.4,
    gorsel: "🪙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Şüpheli Bir Define",
    metin: "Bir kervansarayda, önceki sahibinin esrarengiz biçimde kaybolduğu söylenen bir altın kesesi satılığa çıktı. Ucuz ama etrafında tuhaf söylentiler dönüyor.",
    secenekler: [
      {
        metin: "Altını satın al, söylentileri boş ver.",
        baseBasariSansi: 90,
        maliyet: 10,
        ipucu: "Ucuz kazanç, belirsiz bir bedel",
        basariliSonuc: {
          para: 45,
          etiket_ekle: [
            "esya:lanetli_altin",
          ],
          durum_ekle: {
            id: "lanet_golgesi",
            ad: "Lanetin Gölgesi",
            tur: "kalici",
            tur_basi_saglik: -1,
          },
          mesaj: "Altını aldın; cebin kabardı ama içinde tuhaf bir huzursuzluk var.",
          detay: "Bazı kazançların, görünmeyen küçük bir bedeli oluyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Satıcı son anda vazgeçti, keseyi geri aldı.",
          detay: "Bazı fırsatlar elinden kayıp gidiyor.",
        },
      },
      {
        metin: "Söylentilere kulak ver, uzak dur.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Altına dokunmadın, yoluna devam ettin.",
          detay: "Bazı fırsatlar, taşıdıkları riskle birlikte değerlendirilmeli.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Uzak dursan da o altın kesesini uzun süre düşündün.",
          detay: "Merak bazen en akıllı kararları bile gölgeliyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin_ruyasi",
    kategori: "din",
    gerekliEtiketler: [
      "esya:lanetli_altin",
    ],
    gizemli: true,
    ton: "agir",
    agirlik: 0.5,
    gorsel: "💀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Önceki Sahibinin Rüyası",
    metin: "Rüyanda sararmış, gözleri oyuk bir adam beliriyor her gece. 'O altın benimdi, beni de böyle tüketti' diyor, parmağıyla kesenin durduğu yeri işaret ediyor. Uyandığında terler içindesin.",
    secenekler: [
      {
        metin: "Bir rahibe/hocaya gidip laneti kırmasını iste.",
        baseBasariSansi: 65,
        maliyet: 20,
        ipucu: "Pahalı ama laneti tamamen kaldırabilir",
        basariliSonuc: {
          para: -20,
          durum_sil: [
            "lanet_golgesi",
          ],
          mesaj: "Uzun bir ayin, tütsüler ve dualar sonunda içindeki o soğukluk dağıldı. Rüyalar durdu, altın artık sıradan bir keseden farksız.",
          detay: "Bazı lanetler, doğru ellerle çözülebiliyormuş.",
        },
        basarisizSonuc: {
          para: -20,
          saglik: -10,
          mesaj: "Ayin işe yaramadı, hoca kesenin yanına bile yaklaşmak istemedi. 'Bu benim gücümü aşıyor' dedi ve kaçarcasına gitti.",
        },
      },
      {
        metin: "Altını olduğu gibi, hiç açmadan birine bağışla.",
        baseBasariSansi: 90,
        ipucu: "Laneti başkasına devredersin — vicdanın rahatsız olabilir",
        basariliSonuc: {
          ahlak: -10,
          durum_sil: [
            "lanet_golgesi",
          ],
          etiket_sil: [
            "esya:lanetli_altin",
          ],
          mesaj: "Keseyi hiç açmadan bir dilenciye uzattın; gözlerindeki sevinci görünce içine bir ürperti düştü. Lanet artık senin değil.",
          detay: "Rüyalar durdu ama vicdanın bu kararı asla unutmayacak.",
        },
        basarisizSonuc: {
          mesaj: "Kimse bu 'hediyeyi' kabul etmek istemedi, herkes altının garipliğini seziyor gibiydi.",
        },
      },
      {
        metin: "Rüyayı görmezden gel, altına sıkı sıkı sarıl.",
        baseBasariSansi: 100,
        ipucu: "Lanet derinleşir ama altının tüm gücü senin olur",
        basariliSonuc: {
          para: 25,
          saglik: -8,
          mutluluk: -10,
          durum_ekle: {
            id: "lanet_golgesi",
            ad: "Lanetin Gölgesi",
            tur: "kalici",
            tur_basi_saglik: -2,
          },
          mesaj: "'Onu benden kimse alamaz' dedin rüyada hayalete. O gülümsedi ve kayboldu — ertesi sabah kesende beklenmedik bir miktar daha altın buldun. Ama içindeki soğukluk şimdi daha derin.",
          detay: "Lanetin gölgesi büyüdü; artık her yıl biraz daha can alıyor.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "derinlik_lanetli_altin_musteri",
    kategori: "ticaret",
    gerekliEtiketler: [
      "esya:lanetli_altin",
    ],
    gizemli: true,
    agirlik: 0.5,
    gorsel: "🪙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hevesli Bir Alıcı",
    metin: "Kervansarayda tanımadığın zengin bir tüccar, elindeki o eski altın kesesini fark etti. Gözleri parladı: 'O keseyi tanıyorum, eski bir define. Sana piyasa fiyatının üç katını öderim!' Söylenceyi bilmiyor gibi.",
    secenekler: [
      {
        metin: "Laneti anlatmadan sat, üç katı fiyata razı ol.",
        baseBasariSansi: 90,
        maxAhlak: 55,
        ipucu: "Büyük kazanç ama laneti bilmeden birine devredersin",
        basariliSonuc: {
          para: 90,
          ahlak: -15,
          durum_sil: [
            "lanet_golgesi",
          ],
          etiket_sil: [
            "esya:lanetli_altin",
          ],
          mesaj: "Parayı saydı, keseyi sevinçle aldı ve gitti. Cebin ağırlaştı ama o adama ne beklediğini düşünmeden edemiyorsun.",
          detay: "Bazı kazançlar başkasının bilmediği bir bedelle geliyor.",
        },
        basarisizSonuc: {
          para: 90,
          ahlak: -15,
          mesaj: "Parayı saydı ama keseyi açar açmaz içindeki tuhaf soğukluğu hissetti; 'Bu bende kalmaz' deyip parayı geri kesti, keseyi sana fırlattı.",
        },
      },
      {
        metin: "Dürüst ol, laneti anlat — yine de almak isterse sat.",
        baseBasariSansi: 60,
        ipucu: "Vicdanın rahat eder ama satış büyük ihtimalle suya düşer",
        basariliSonuc: {
          para: 50,
          ahlak: 15,
          durum_sil: [
            "lanet_golgesi",
          ],
          etiket_sil: [
            "esya:lanetli_altin",
          ],
          mesaj: "Şaşırtıcı biçimde gülümsedi: 'Ben de böyle şeylere meraklıyımdır.' Daha az parayla da olsa laneti bilerek satın aldı.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -50,
          mesaj: "Anlatınca yüzü asıldı, 'çıldırmışsın sen' deyip uzaklaştı. Kese hâlâ elinde, alıcı da gitti.",
        },
      },
      {
        metin: "Satma; bu laneti kimseye layık görme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Teklifi geri çevirdin. Adam şaşkın ayrıldı ama vicdanın rahat.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Reddettin ama o parayı düşünmeden edemedin; bazı geceler pişmanlık uykunu kaçırıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_gizli_orgut_daveti",
    gizemli: true,
    kategori: "siyaset",
    minYas: 18,
    yasakliEtiketler: [
      "orgut_secildi",
    ],
    agirlik: 0.5,
    gorsel: "🕯️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Hanın Arka Odası",
    metin: "Bir handa, kimliğini gizleyen bir adam seni arka odaya davet etti. Orada, gölgeler içinde toplanan bir grup insan var — hiçbirinin yüzünü tam göremiyorsun.",
    secenekler: [
      {
        metin: "Tapınak Şövalyeleri'ne katıl.",
        baseBasariSansi: 85,
        ipucu: "Disiplinli, savaşçı bir kardeşlik",
        basariliSonuc: {
          ahlak: 8,
          un: 10,
          etiket_ekle: [
            "orgut:Tapınak Şövalyeleri",
            "orgut_secildi",
          ],
          mesaj: "Yemin ettin; artık gölgede duran ama güçlü bir kardeşliğin parçasısın.",
          detay: "Kardeşlik, disiplin ve sadakat karşılığında koruma ve güç vaat ediyor.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "orgut:Tapınak Şövalyeleri",
            "orgut_secildi",
          ],
          mesaj: "Katılımın gergin geçti ama sonunda kabul edildin.",
          detay: "Her başlangıç pürüzsüz olmuyor.",
        },
      },
      {
        metin: "Gölgede Kardeşlik'e katıl.",
        baseBasariSansi: 85,
        ipucu: "Gizli, ticari ve siyasi bağlantıları güçlü bir ağ",
        basariliSonuc: {
          para: 15,
          etiket_ekle: [
            "orgut:Gölgede Kardeşlik",
            "orgut_secildi",
          ],
          mesaj: "Yemin ettin; artık şehrin görünmeyen ağlarına erişimin var.",
          detay: "Bu kardeşlik güç değil, bilgi ve bağlantı üzerine kurulu.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -15,
          etiket_ekle: [
            "orgut:Gölgede Kardeşlik",
            "orgut_secildi",
          ],
          mesaj: "Katılımın gergin geçti ama sonunda kabul edildin.",
          detay: "Güven, zamanla inşa edilir.",
        },
      },
      {
        metin: "Daveti reddet, odadan çık.",
        baseBasariSansi: 95,
        ipucu: "Güvenli, meraksız",
        basariliSonuc: {
          etiket_ekle: [
            "orgut_secildi",
          ],
          mesaj: "Daveti nazikçe reddettin, kimse seni zorlamadı.",
          detay: "Her gizemli kapı açılmayı hak etmiyor.",
        },
        basarisizSonuc: {
          etiket_ekle: [
            "orgut_secildi",
          ],
          mesaj: "Reddin biraz gerginlik yarattı ama seni bırakıp gitmene izin verdiler.",
          detay: "Bazı kapılar bir kez kapanınca bir daha açılmıyor.",
        },
      },
    ],
  },
  {
    id: "derinlik_orgut_gizli_gorev",
    kategori: "siyaset",
    gerekliEtiketler: [
      "orgut_secildi",
    ],
    agirlik: 0.4,
    gorsel: "🗝️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kardeşlikten Bir Görev",
    metin: "Örgütünden biri, gece yarısı seninle temasa geçti: tehlikeli ama karşılığı yüksek, sadece güvenilir üyelere verilen gizli bir görev var.",
    secenekler: [
      {
        metin: "Tapınak Şövalyeleri görevini kabul et.",
        baseBasariSansi: 55,
        gerekliEtiketler: [
          "orgut:Tapınak Şövalyeleri",
        ],
        kilitAciklamasi: "Bu görev sadece Tapınak Şövalyeleri üyelerine açık.",
        ipucu: "Riskli ama kardeşlik içindeki itibarını büyütür",
        basariliSonuc: {
          un: 20,
          para: 25,
          mesaj: "Görevi başarıyla tamamladın; kardeşlik içindeki itibarın büyüdü.",
          detay: "Sadakatinin karşılığını aldın.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Görev planlandığı gibi gitmedi, güçlükle kurtuldun.",
          detay: "Gizli görevler her zaman göründüğü kadar basit değil.",
        },
      },
      {
        metin: "Gölgede Kardeşlik görevini kabul et.",
        baseBasariSansi: 55,
        gerekliEtiketler: [
          "orgut:Gölgede Kardeşlik",
        ],
        kilitAciklamasi: "Bu görev sadece Gölgede Kardeşlik üyelerine açık.",
        ipucu: "Riskli ama kazançlı bir bağlantı ağı sağlar",
        basariliSonuc: {
          para: 45,
          mesaj: "Görevi sorunsuz tamamladın; ağın genişledi.",
          detay: "Bilgi ve bağlantı, altından daha değerli olabiliyor.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          un: -8,
          mesaj: "Görev sırasında fark edildin, küçük bir skandal çıktı.",
          detay: "Gölgede kalmak her zaman mümkün olmuyor.",
        },
      },
      {
        metin: "Görevi reddet, çok riskli bul.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Görevi nazikçe reddettin.",
          detay: "Her fırsatı kabul etmek zorunda değilsin.",
        },
        basarisizSonuc: {
          dost_puani: -8,
          mesaj: "Reddin örgüt içinde biraz güven kaybına yol açtı.",
          detay: "Her hayır bir bedel taşıyabilir.",
        },
      },
    ],
  },
  {
    id: "derinlik_kumarhane_daveti",
    gizemli: true,
    kategori: "sosyal",
    yasakliEtiketler: [
      "bagimlilik:kumarbaz",
    ],
    agirlik: 0.6,
    gorsel: "🎲",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Zar Masası",
    metin: "Bir arkadaşın seni gizli bir kumar masasına davet etti. Kazanma ihtimali cazip ama bu tür yerler bağımlılık yapmasıyla ünlü.",
    secenekler: [
      {
        metin: "Bir el dene, heyecanın tadına bak.",
        baseBasariSansi: 55,
        ipucu: "Kazanç ya da tehlikeli bir alışkanlığın başlangıcı",
        basariliSonuc: {
          para: 30,
          mesaj: "Bu gece şanslıydın; cebin biraz kabardı.",
          detay: "Kazanmanın verdiği heyecan, tehlikeli bir tada dönüşebilir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -20,
          etiket_ekle: [
            "bagimlilik:kumarbaz",
            "bagimlilik:var",
          ],
          durum_ekle: {
            id: "kumar_bagimliligi",
            ad: "Kumar Bağımlılığı",
            tur: "kalici",
            tur_basi_para: -4,
          },
          mesaj: "Kaybettin ama masadan kalkamadın; birkaç el daha oynadın. Artık bu masaya dönmemek zor.",
          detay: "Kaybın seni durdurmak yerine daha da masaya bağladı.",
        },
      },
      {
        metin: "Nazikçe reddet, uzak dur.",
        baseBasariSansi: 90,
        ipucu: "Güvenli",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Daveti reddettin, gecen sakin geçti.",
          detay: "Bazı heyecanlar, uzak durulmaya değer.",
        },
        basarisizSonuc: {
          dost_puani: -5,
          mesaj: "Reddin arkadaşını biraz hayal kırıklığına uğrattı.",
          detay: "Her hayır bir küçük mesafe yaratabiliyor.",
        },
      },
    ],
  },
  {
    id: "saray_girme_denemesi",
    kategori: "siyaset",
    minYas: 18,
    yasakliEtiketler: [
      "sarayda",
    ],
    agirlik: 0.4,
    gorsel: "🏰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Sarayın Kapısında",
    metin: "Saray kapıcıları herkesi içeri almıyor. Ama bazen bir kese altın, bazen de doğru bir isim anmak kapıyı aralayabiliyor.",
    secenekler: [
      {
        metin: "Gölge Sikkesi'ni avucunda göster.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "envanter:golge_sikke",
        ],
        ipucu: "Gizli Envanter: Muhafızları hipnotize et",
        basariliSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          etiket_sil: [
            "envanter:golge_sikke",
          ],
          un: 15,
          ahlak: -10,
          mesaj: "Sikkeyi gören muhafızların gözleri karardı. Tek kelime etmeden ağır kapıları sana ardına kadar açtılar.",
          detay: "Sarayın içine bir hayalet gibi, efsanevi bir şekilde sızdın.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
      {
        metin: "Kapı görevlisine rüşvet ver.",
        baseBasariSansi: 40,
        maliyet: 30,
        ipucu: "Pahalı ve riskli ama işe yararsa saraya girersin",
        basariliSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          un: 10,
          mesaj: "Altınların konuştu; kapı sessizce aralandı ve seni içeri aldılar.",
          detay: "Artık saray çevresinde tanınan bir yüzsün.",
        },
        basarisizSonuc: {
          para: -30,
          un: -5,
          mesaj: "Rüşvet teklifin görevliyi kızdırdı; parasız ve rezil bir şekilde kapıdan kovuldun.",
          detay: "Bazı kapılar parayla açılmıyor.",
        },
      },
      {
        metin: "Saygınlığınla ve tanıdıklarınla iddia et.",
        baseBasariSansi: 35,
        minUn: 30,
        ipucu: "Ücretsiz ama ününe bağlı, riskli",
        kilitAciklamasi: "Yeterince tanınmıyorsun; önce adını duyurman gerek",
        basariliSonuc: {
          etiket_ekle: [
            "sarayda",
          ],
          un: 8,
          mesaj: "Adını duyan bir saray görevlisi seni içeri buyur etti.",
          detay: "Şöhretin sana bir kapı daha açtı.",
        },
        basarisizSonuc: {
          un: -8,
          mesaj: "Adını hiç duymadıklarını söylediler; kapıda küçük düştün.",
          detay: "Şöhretin sandığın kadar geniş yayılmamış.",
        },
      },
      {
        metin: "Vazgeç, başka bir gün dene.",
        baseBasariSansi: 100,
        ipucu: "Güvenli",
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -2,
          mesaj: "Bugün denemekten vazgeçtin.",
          detay: "Saray bir yere kaçmıyor.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "oc_veba_karsilasma",
    kategori: "saglik",
    cag: "Orta Çağ",
    gerekliUlke: {
      vebada: true,
    },
    agirlik: 1,
    ton: "agir",
    gorsel: "💀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kapı Komşusu Hasta",
    metin: "Yan komşun vebaya yakalandı; ailesi ondan kaçtı ama biri ona bakmazsa yalnız ölecek. Yardım etmek kendini de risk altına atmak demek.",
    secenekler: [
      {
        metin: "Manastır Kedisi'ni komşunun evine sal.",
        baseBasariSansi: 100,
        gerekliEtiketler: [
          "esya:veba_koruyucu_kedi",
        ],
        ipucu: "Gizli Eşya: Kedi vebalı fareleri avlar",
        basariliSonuc: {
          ahlak: 25,
          un: 15,
          mesaj: "Kara kedi komşunun evine girdi ve vebayı yayan tüm fareleri avladı. Komşun iyileşti ve sana minnettar kaldı.",
          detay: "Uğursuz denilen kedi aslında bir hayat kurtarıcıymış.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı",
        },
      },
      {
        metin: "Yanına git, ona bak.",
        baseBasariSansi: 40,
        ipucu: "Büyük bir merhamet, büyük bir risk",
        basariliSonuc: {
          ahlak: 20,
          un: 8,
          mesaj: "Komşuna baktın, iyileşmesine yardımcı oldun; mahalle bu cesaretini asla unutmayacak.",
          detay: "Bazı iyilikler ölüm kalım riskiyle yapılıyor.",
        },
        basarisizSonuc: {
          saglik: -30,
          olum_sansi: 12,
          mesaj: "Komşuna bakarken sen de hastalığa yakalandın; günlerce ateşler içinde yattın.",
          detay: "Merhametin ağır bir bedeli oldu.",
        },
      },
      {
        metin: "Uzak dur, kendini koru.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama vicdanına dokunur",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Uzak durdun; komşun yalnız başına mücadele etti.",
          detay: "Kendini korumak da bir hayatta kalma stratejisi.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mutluluk: -5,
          mesaj: "Komşun yalnız başına can verdi; bu sahne uzun süre aklından çıkmadı.",
          detay: "Bazı sessizlikler vicdanı ağır yoruyor.",
        },
      },
    ],
  },
  {
    id: "gizem_koleksiyoncu_ejderha",
    gizemli: true,
    kategori: "ticaret",
    gerekliEtiketler: [
      "envanter:ejderha_tilsimi",
    ],
    agirlik: 1,
    gorsel: "🩸",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Koleksiyoncunun Ziyareti",
    metin: "Gece yarısı kapın sertçe çalındı: dışarıda, yüzü gümüş bir maskeyle kapalı bir adam duruyor. Boynundaki Ejderha Tılsımı'nı hissetmiş — 'Onu sat, karşılığında bir ömür yetecek altın vereyim' diyor; sesi çürümüş toprak gibi kokuyor.",
    secenekler: [
      {
        metin: "Tılsımı ver ve altınları al.",
        baseBasariSansi: 88,
        ipucu: "Genellikle ciddi bir servet, ancak efsanevi korumayı kaybedersin; maskeli adama güvenmek risklidir",
        basariliSonuc: {
          para: 80,
          ahlak: -10,
          etiket_sil: [
            "envanter:ejderha_tilsimi",
          ],
          mesaj: "Tılsımı boynundan çıkardığın an adamın eline bıraktın. Karşılığında sana ağır bir altın kesesi verdi ve sise karıştı.",
          detay: "Cebin epey doldu ama o kadim sıcaklık göğsünden gitti. Artık sıradan ve savunmasızsın.",
        },
        basarisizSonuc: {
          ahlak: -10,
          mutluluk: -15,
          etiket_sil: [
            "envanter:ejderha_tilsimi",
          ],
          mesaj: "Kese ağırdı ama sabah açtığında içi kuru yapraklarla doluydu. Maskeli adam da, tılsımın da gitti — elinde bir avuç çöp kaldı.",
          detay: "Bazı alışverişlerin bedelini ancak ertesi sabah anlarsın.",
        },
      },
      {
        metin: "Tılsım benimdir! Kılıcını çek ve maskeli adama saldır.",
        baseBasariSansi: 40,
        ipucu: "Sadece en şanslıların hayatta kalabileceği bir düello",
        basariliSonuc: {
          un: 35,
          saglik: -10,
          mesaj: "Tılsım kılıcına güç verdi! Maskeli adama vurduğun an adam kara bir dumana dönüşerek yok oldu. Sadece maskesi geriye kaldı.",
          detay: "Şeytani bir varlığı yendin. Tılsımın ne kadar güçlü olduğunu şimdi gerçekten anladın.",
        },
        basarisizSonuc: {
          saglik: -40,
          olum_sansi: 25,
          etiket_sil: [
            "envanter:ejderha_tilsimi",
          ],
          mesaj: "Adam sadece elini kaldırdı ve seni duvara fırlattı. Bilincini kaybederken tılsımı boynundan söküp aldığını hissettin.",
          detay: "Zar zor hayatta kaldın. Tılsım gitti, bedenin kırık dökük.",
        },
      },
    ],
  },
  {
    id: "gizem_kara_kilic_fisilti",
    kategori: "savas",
    ton: "agir",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:kara_kilic",
    ],
    gorsel: "🗡️",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kılıcın Fısıltısı",
    metin: "Kara Kılıç, kemerinde dururken bile sana bir şeyler fısıldıyor gibi: yakınında haksızlık ettiğini düşündüğün birinin adını tekrar tekrar. Kılıcı çekip 'adaleti' kendi ellerinle sağlamak cazip geliyor.",
    secenekler: [
      {
        metin: "Fısıltıyı dinle, o kişiyle hesaplaş.",
        baseBasariSansi: 50,
        ipucu: "Karanlık bir tatmin, ağır bir ahlaki bedel",
        basariliSonuc: {
          un: 12,
          ahlak: -25,
          mesaj: "Kılıç elinde adeta kendi kendine hareket etti. İşin bittiğinde ne pişmanlık ne rahatlama hissettin, sadece boşluk.",
          detay: "Kara Kılıç'ın gücü büyüyor, senin vicdanın küçülüyor.",
        },
        basarisizSonuc: {
          saglik: -20,
          un: -15,
          mesaj: "Hesaplaşma umduğun gibi gitmedi; yarı yolda durup geri çekildin, üstelik yaralı.",
          detay: "Kılıcın fısıltısına kulak vermek pahalıya patladı.",
        },
      },
      {
        metin: "Kılıcı bir sandığa kilitle, fısıltıyı görmezden gel.",
        baseBasariSansi: 85,
        ipucu: "Vicdanın rahat kalır ama gücünden vazgeçersin",
        basariliSonuc: {
          ahlak: 10,
          mesaj: "Kılıcı derin bir sandığa kilitledin; geceleri artık daha rahat uyuyorsun.",
          detay: "Bazı güçlerden uzak durmak da bir cesarettir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Kılıcı kilitledin ama fısıltı kulaklarından hâlâ silinmedi.",
          detay: "Bazı sesler kilitle susmuyor.",
        },
      },
    ],
  },
  {
    id: "gizem_sirli_iksir_ikilemi",
    gizemli: true,
    kategori: "saglik",
    ton: "agir",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:sirli_iksir",
    ],
    gorsel: "🧪",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Son Şişe",
    metin: "{dost} ağır hasta yatağa düştü, hekimler çaresiz. Yıllardır sakladığın o gizemli iksir belki gerçekten bir mucize, belki sadece renkli su — ama artık denemekten başka çare kalmadı gibi görünüyor.",
    secenekler: [
      {
        metin: "İksiri {dost}'a içir.",
        baseBasariSansi: 60,
        ipucu: "Belki bir mucize, belki boşa harcanan tek şansın",
        basariliSonuc: {
          dost_puani: 25,
          mutluluk: 12,
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mesaj: "Şişe boşaldığı an {dost}'un nefesi düzeldi; gözlerini açtığında ilk gördüğü sen oldun.",
          detay: "Yıllarca sakladığın gizem, tam zamanında mucizeye dönüştü.",
        },
        basarisizSonuc: {
          mutluluk: -15,
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mesaj: "İksir sıradan bir şurup gibi çıktı; hiçbir şey değişmedi, sadece son umudun da tükendi.",
          detay: "Bazı efsaneler sadece efsane olarak kalıyor.",
        },
      },
      {
        metin: "İksiri sakla, çok değerli bir koleksiyoncuya satmayı düşün.",
        baseBasariSansi: 80,
        ipucu: "Vicdan yerine kazanç seçimi",
        basariliSonuc: {
          para: 45,
          ahlak: -20,
          dost_puani: -15,
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mesaj: "İksiri sattın; kasan doldu ama {dost}'un yatağının başında bunu hiç söyleyemedin.",
          detay: "Bazı kazançlar hayat boyu bir suçluluk gibi taşınır.",
        },
        basarisizSonuc: {
          para: 20,
          ahlak: -20,
          dost_puani: -15,
          etiket_sil: [
            "envanter:sirli_iksir",
          ],
          mesaj: "İksiri düşük bir fiyata elden çıkardın; hem vicdan azabı hem de az bir kazanç kaldı elinde.",
          detay: "En kötü ihtimal: bedeli ödedin, karşılığını alamadın.",
        },
      },
    ],
  },
  {
    id: "gizem_golge_sikke_kumari",
    gizemli: true,
    kategori: "ticaret",
    ton: "hafif",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:golge_sikke",
    ],
    gorsel: "🪙",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Kaderin Parası",
    metin: "Gölge Sikke elinde tuhaf bir ağırlıkla duruyor; söylentiye göre bu sikke havaya atıldığında kaderin kendisini değiştirir. Büyük bir bahiste son kararını bu sikkeye bırakabilirsin.",
    secenekler: [
      {
        metin: "Sikkeyi büyük bir bahiste ortaya sür, kaderi zorla.",
        baseBasariSansi: 50,
        ipucu: "Ya iki katı kazanç ya her şeyi kaybetme",
        basariliSonuc: {
          para: 60,
          mutluluk: 12,
          mesaj: "Sikke havada üç kez döndü ve senin istediğin yüzü gösterdi! Masadakiler dehşetle izledi.",
          detay: "Gölge Sikke'nin ünü seninle birlikte büyüdü.",
        },
        basarisizSonuc: {
          para: -50,
          mutluluk: -16,
          mesaj: "Sikke yere düşüp öteki yüzünü gösterdi. Elindeki her şeyi masada bıraktın.",
          detay: "Kader bazen fısıldadığı gibi davranmıyor.",
        },
      },
      {
        metin: "Sikkeyi cebinde tut, sadece uğur olarak sakla.",
        baseBasariSansi: 100,
        ipucu: "Güvenli, gizemi korursun",
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Sikkeyi kullanmadan cebine geri koydun; gizemi merakınla birlikte yaşamaya devam ediyor.",
          detay: "Bazı güçleri harcamadan taşımak da bir bilgelik.",
        },
        basarisizSonuc: {
          mesaj: "Kullanılmadı.",
        },
      },
    ],
  },
  {
    id: "gizem_gizemli_harita_ikinci_yol",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.5,
    gerekliEtiketler: [
      "envanter:gizemli_harita",
    ],
    gorsel: "🗺️",
    sureYilMin: 1,
    sureYilMax: 2,
    baslik: "Haritanın İkinci Yolu",
    metin: "Gizemli Harita'yı yeniden incelerken fark ettin: aslında iki farklı işaret var. Biri tehlikeli, terk edilmiş bir geçide; diğeri sadece meraklı bir koleksiyoncunun kapısına götürüyor.",
    secenekler: [
      {
        metin: "Tehlikeli geçidi bizzat keşfet.",
        baseBasariSansi: 40,
        ipucu: "Büyük ödül ya da ciddi yaralanma",
        basariliSonuc: {
          para: 55,
          un: 18,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Geçidin sonunda unutulmuş bir tapınağın hazinesini buldun! Adın kısa sürede yayıldı.",
          detay: "Bazı riskler efsanevi hikayelere dönüşüyor.",
        },
        basarisizSonuc: {
          saglik: -22,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Geçit çöktü, güçlükle sağ çıktın; harita da enkazın altında kaldı.",
          detay: "Her harita seni zenginliğe götürmüyor.",
        },
      },
      {
        metin: "Haritayı meraklı koleksiyoncuya sat.",
        baseBasariSansi: 90,
        ipucu: "Güvenli, garanti bir kazanç",
        basariliSonuc: {
          para: 25,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Koleksiyoncu haritayı iple çekiyordu; iyi bir fiyata elden çıkardın.",
          detay: "Bazen merakı başkasına devretmek en akıllıcasıdır.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 10,
          etiket_sil: [
            "envanter:gizemli_harita",
          ],
          mesaj: "Koleksiyoncu pazarlıkta seni epey zorladı; umduğundan az kazandın.",
          detay: "Her pazarlık umduğun gibi sonuçlanmıyor.",
        },
      },
    ],
  },
  {
    id: "gizem_hazine_haritasi_ortaklik",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:hazine_haritasi",
    ],
    gorsel: "🤝",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ortaklık Teklifi",
    metin: "Hazine Haritası'nı taşıdığını bir şekilde öğrenen deneyimli bir define avcısı, sana ortaklık teklif ediyor: birlikte kazsınlar, kazancı yarı yarıya paylaşsınlar. Tek başına gitmek daha kârlı ama daha tehlikeli.",
    secenekler: [
      {
        metin: "Teklifi kabul et, riski paylaş.",
        baseBasariSansi: 75,
        ipucu: "Daha güvenli ama kazanç yarıya düşer",
        basariliSonuc: {
          para: 35,
          dost_puani: 8,
          mesaj: "Deneyimli avcı sayesinde kazı güvenle ilerledi; hazineyi paylaştınız.",
          detay: "Yarım kazanç, tam bir güven ilişkisinden ucuz değil.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: -10,
          mesaj: "Ortağın son anda vazgeçti, kazı yarım kaldı, masraf cebinden gitti.",
          detay: "Her ortaklık umduğun gibi yürümüyor.",
        },
      },
      {
        metin: "Reddet, tek başına git.",
        baseBasariSansi: 45,
        ipucu: "Tüm kazanç sende ama tehlike de tamamen senin",
        basariliSonuc: {
          para: 70,
          un: 10,
          mesaj: "Tek başına kazdın, tüm hazine senin oldu! Riske değdi.",
          detay: "Bazen paylaşmamak en büyük zenginliği getiriyor.",
        },
        basarisizSonuc: {
          saglik: -18,
          para: -10,
          mesaj: "Kazı sırasında yalnız başına büyük zorluk yaşadın, elin boş ve yaralı döndün.",
          detay: "Yalnız cesaret bazen yeterli olmuyor.",
        },
      },
    ],
  },
  {
    id: "gizem_olunun_yuzugu_lanet_soylentisi",
    gizemli: true,
    kategori: "din",
    ton: "agir",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:olunun_yuzugu",
    ],
    gorsel: "💀",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Lanet Söylentisi",
    metin: "Mahalledeki yaşlı bir kadın, parmağındaki o yüzüğü görünce dehşetle geri çekildi: 'Ölünün yüzüğü lanetlidir, kimin elinde kalırsa başına felaket gelir' dedi. Bir rahip küçük bir ücret karşılığı yüzüğü 'temizleyebileceğini' söylüyor.",
    secenekler: [
      {
        metin: "Rahibe ödeme yap, yüzüğü temizlet.",
        baseBasariSansi: 90,
        maliyet: 10,
        ipucu: "Küçük bir masraf, huzurlu bir zihin",
        basariliSonuc: {
          para: -10,
          mutluluk: 8,
          mesaj: "Rahip uzun bir dua eşliğinde yüzüğü 'arındırdı'; için nedense gerçekten rahatladı.",
          detay: "Bazen huzurun bedeli birkaç sikkeden ibarettir.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Rahip töreni tamamladı ama içindeki tedirginlik pek geçmedi.",
          detay: "Bazı korkular parayla da silinmiyor.",
        },
      },
      {
        metin: "Boş inançlara kulak asma, yüzüğü takmaya devam et.",
        baseBasariSansi: 80,
        ipucu: "Paran cepte kalır ama söylenti peşini bırakmaz",
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Yüzüğü takmaya devam ettin, hiçbir şey olmadı; boş inançlara güldün geçtin.",
          detay: "Bazen korku sadece korkunun kendisidir.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -6,
          mesaj: "Peş peşe gelen ufak talihsizlikler yüzünden mahallede 'lanetli' diye anılmaya başladın.",
          detay: "İnanmasan da söylenti seni bulur.",
        },
      },
    ],
  },
  {
    id: "gizem_hazine_bulundu_vergi_sorunu",
    gizemli: true,
    kategori: "siyaset",
    agirlik: 0.4,
    gerekliEtiketler: [
      "envanter:hazine_bulundu",
    ],
    gorsel: "💰",
    sureYilMin: 1,
    sureYilMax: 1,
    baslik: "Ansızın Zenginin Sırtındaki Yük",
    metin: "Bulduğun hazinenin haberi nasılsa yayıldı. Bir vergi tahsildarı kapına dayandı: ya 'bulunmuş servet vergisini' öde, ya da hazineyi nereden bulduğunu mahkemede ayrıntısıyla anlat.",
    secenekler: [
      {
        metin: "Vergiyi sessizce öde, işi kapat.",
        baseBasariSansi: 90,
        ipucu: "Güvenli ama cebin epey hafifler",
        basariliSonuc: {
          para: -30,
          etiket_sil: [
            "envanter:hazine_bulundu",
          ],
          mesaj: "Vergiyi ödedin, tahsildar kaşlarını çatarak da olsa uzaklaştı.",
          detay: "Zenginliğin bir bedeli de devletin payıdır.",
        },
        basarisizSonuc: {
          para: -30,
          un: -5,
          etiket_sil: [
            "envanter:hazine_bulundu",
          ],
          mesaj: "Vergiyi ödedin ama tahsildar seni 'şüpheli zengin' diye not defterine yazdı.",
          detay: "Bazen ödesen bile gözden düşüyorsun.",
        },
      },
      {
        metin: "Tahsildarı küçük bir rüşvetle sustur.",
        baseBasariSansi: 55,
        ipucu: "Daha ucuz olabilir ama yakalanma riski var",
        basariliSonuc: {
          para: -12,
          ahlak: -10,
          etiket_sil: [
            "envanter:hazine_bulundu",
          ],
          mesaj: "Tahsildar parayı cebine indirip gözünü kırptı; kayıtlarda hiçbir şey görünmeyecek.",
          detay: "Bazı sorunlar altınla değil, ahlakla ödeniyor.",
        },
        basarisizSonuc: {
          para: -45,
          ahlak: -10,
          un: -15,
          etiket_sil: [
            "envanter:hazine_bulundu",
          ],
          mesaj: "Rüşvet teklifin üstlerine bildirildi; hem cezai vergi hem de 'yozlaşmış' bir itibar kazandın.",
          detay: "Kısa yoldan kaçmak bazen daha uzun sürüyor.",
        },
      },
    ],
  },
];
