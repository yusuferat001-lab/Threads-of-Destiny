/**
 * Sabit katalogların İngilizce görünen adları/açıklamaları — istemci kopyası.
 * `server/src/i18n/katalog.en.ts` ile ELLE senkron tutulur (istemci sunucudan
 * import edemez; `client/src/types.ts`'in `server/src/types.ts` kopyası olmasıyla
 * aynı desen). Anahtar = Türkçe kaynak değerin KENDİSİ; karşılığı yoksa Türkçe döner.
 * Oyun mantığı hep Türkçe değeri kullanır — bu tablo yalnızca GÖSTERİM içindir.
 */
import type { Dil } from './ayarlar';

const KATALOG_EN: Record<string, string> = {
  "Eparkhos": "Eparch",
  "Muhtesip": "Muhtasib",
  "Ahi Baba": "Ahi Baba",
  "Metropolit": "Metropolitan",
  "Müftü": "Mufti",
  "Subaşı": "Subashi",
  "Albay": "Colonel",
  "Paşa": "Pasha",
  "General": "General",
  "Loncabaşı": "Guild Head",
  "Esnaf Kethüdası": "Tradesmen's Steward",
  "Ticaret Nazırı": "Minister of Trade",
  "Lonca Başkanı": "Guild Chairman",
  "Ticaret Odası Başkanı": "Chamber of Commerce President",
  "Sanayi Odası Başkanı": "Chamber of Industry President",
  "Kadı": "Qadi",
  // ---------------------------------------------------------------------------
  // Bölgeler (state.bolge — hem filtre anahtarı hem gösterim; burada yalnız gösterim çevrilir)
  // ---------------------------------------------------------------------------
  "Fransa": "France",
  "Kutsal Roma": "Holy Roman Empire",
  "Bizans": "Byzantium",
  "Selçuklu": "Seljuk Empire",
  "Eyyubiler": "Ayyubid Sultanate",
  "İngiltere": "England",
  "Osmanlı": "Ottoman Empire",
  "Rusya": "Russia",

  // Çağlar
  "Orta Çağ": "Middle Ages",
  "Sanayi Devrimi": "Industrial Revolution",

  // Din / kültür
  "Katolik": "Catholic",
  "Ortodoks": "Orthodox",
  "Sünni İslam": "Sunni Islam",
  "Anglikan": "Anglican",
  "Bilinmiyor": "Unknown",

  // Meslekler
  "Asker": "Soldier",
  "Tüccar": "Merchant",
  "Din Adamı": "Clergyman",

  // Olay kategorileri
  "savas": "war",
  "ticaret": "trade",
  "din": "faith",
  "siyaset": "politics",
  "saglik": "health",
  "sosyal": "social",

  // ---------------------------------------------------------------------------
  // Mesleğe yatkınlık kademesi unvanları (2026-09 sonu) — server data/meslekYatkinlik.ts ile senkron
  // ---------------------------------------------------------------------------
  // Orta Çağ
  "Savaş Korkusu": "Fear of Battle",
  "Acemi Çaylak": "Green Recruit",
  "Kılıca Yatkın": "Natural with a Blade",
  "Doğuştan Savaşçı": "Born Warrior",
  "Pazarlıktan Anlamaz": "Hopeless Haggler",
  "Sıradan Satıcı": "Ordinary Peddler",
  "Ticari Zekası Parlak": "Sharp Trading Mind",
  "Şeytan Tüyü": "Touch of the Devil",
  "Tam Bir Günahkâr": "Utter Sinner",
  "Arada Kalmış": "Wavering Faith",
  "İnancı Sağlam": "Steadfast Believer",
  "Seçilmiş Kişi": "The Chosen One",
  "Malzeme İsrafı": "Wastes Every Material",
  "Sıradan Çırak": "Ordinary Apprentice",
  "Eli Becerikli": "Skilled Hands",
  "Hünerli Eller (Doğuştan Mucit)": "Gifted Hands (Born Inventor)",
  // Sanayi Devrimi
  "Cepheden Kaçan": "Deserter at Heart",
  "Sıradan Er": "Ordinary Private",
  "Silaha Yatkın": "Natural with a Rifle",
  "Doğuştan Komutan": "Born Commander",
  "İşten Anlamaz": "Hopeless Businessman",
  "Vasat Esnaf": "Average Shopkeeper",
  "Keskin İş Adamı": "Sharp Businessman",
  "Doğuştan Sermayedar": "Born Tycoon",
  "İnancı Sarsılmış": "Faith Shaken",
  "Sıradan Vaiz": "Ordinary Preacher",
  "Vicdanı Güçlü": "Strong of Conscience",
  "Kutsanmış Ruh": "Blessed Soul",
  "Elinden İş Gelmez": "All Thumbs",
  "Vasat İşçi": "Average Worker",
  "Usta İşi": "Master's Touch",
  "Doğuştan Mühendis": "Born Engineer",

  // ---------------------------------------------------------------------------
  // Kişilik özellikleri (16)
  // ---------------------------------------------------------------------------
  "Sinirli": "Hot-Tempered",
  "Sakin": "Calm",
  "Kibirli": "Arrogant",
  "Alaycı": "Sardonic",
  "Umutlu": "Hopeful",
  "Umutsuz": "Despairing",
  "Depresif": "Depressive",
  "Cesur": "Brave",
  "Hüzünlü": "Melancholic",
  "Sosyal": "Sociable",
  "İçedönük": "Introverted",
  "Sivri Dilli": "Sharp-Tongued",
  "Yumuşak Başlı": "Gentle-Natured",
  "Rekabetçi": "Competitive",
  "Hırslı": "Ambitious",
  "Vicdanlı": "Conscientious",
  "Palavracı": "Braggart",
  "Obur": "Glutton",

  // Ekip üyesi kişilik etiketleri (kozmetik)
  "Sadık": "Loyal",
  "Korkak": "Cowardly",
  "Kurnaz": "Cunning",
  "Tembel": "Lazy",
  "Güvenilmez": "Untrustworthy",
  "Çalışkan": "Hardworking",

  // ---------------------------------------------------------------------------
  // Aile meslekleri (ad)
  // ---------------------------------------------------------------------------
  "Çiftçi": "Farmer",
  "Köle": "Slave",
  "Soylu": "Noble",
  "Sanatçı": "Artist",
  "Fabrika İşçisi": "Factory Worker",
  "Zanaatkâr": "Craftsman",
  "Hekim": "Physician",
  "Denizci": "Sailor",
  "Madenci": "Miner",
  "Kaçakçı": "Smuggler",
  "Tefeci": "Moneylender",
  "Kâtip": "Scribe",
  "Cellat": "Executioner",
  "Saray Hizmetkârı": "Palace Servant",
  "Sürgün": "Exile",

  // Aile açılış anlatıları ({bolge} yer tutucusu korunur)
  "Ailen kuşaklardır {bolge} kırsalında toprağa bakar. Şafakla kalkmayı, sırtın ağrırken bile devam etmeyi ve hasat kötü geçtiğinde susmayı öğrendin. Bedenin sağlam, ellerin nasırlı — ama şehirde kimse köylünün adını sormaz.":
    "Your family has worked the soil of the {bolge} countryside for generations. You learned to rise with the dawn, to keep going even when your back aches, and to hold your tongue when the harvest fails. Your body is sturdy, your hands calloused — but in the city no one asks a peasant's name.",
  "Baban da deden de {bolge} ordusunda hizmet etti; evinizin duvarında paslı bir kılıç asılıydı. Yürümeyi öğrendiğin gün eline tahta bir kalkan verdiler. Disiplinli ve dayanıklısın, ama o evde merhamet hiçbir zaman bir erdem sayılmadı.":
    "Your father and grandfather both served in the {bolge} army; a rusted sword hung on your wall. The day you learned to walk, they put a wooden shield in your hand. You are disciplined and hardy, but in that house mercy was never counted a virtue.",
  "Ailen {bolge} topraklarında bir efendinin malıydı. Özgürlüğünü ancak efendinin ölümüyle kazandın; elinde ne para ne isim vardı. Acıyı ve adaletsizliği ilk elden tanıdığın için insanları çok iyi okuyorsun, ama toplum sana hâlâ geçmişinle bakıyor.":
    "Your family was a master's property on the lands of {bolge}. You won your freedom only when the master died; you had neither money nor name. Because you knew pain and injustice firsthand, you read people well — but society still sees you through your past.",
  "Aile armanız {bolge} boyunca tanınır; adını duyan kapıyı açar, hizmetkârlar önünde eğilir. Ne var ki bu evde herkes birbirini kollar, kimse kimseye acımaz. Ayrıcalıkla büyüdün ve ayrıcalığın bedelini vicdanınla ödemeyi öğrendin.":
    "Your family crest is known throughout {bolge}; hearing your name, doors open and servants bow. Yet in this house everyone watches their own back and no one shows mercy. You grew up with privilege and learned to pay its price with your conscience.",
  "Annen {bolge} meydanlarında ozanlık eder, baban nakış işlerdi. Evinizde her zaman müzik, her zaman misafir, hiçbir zaman para yoktu. İnsanları etkilemeyi ve kalabalık önünde durmayı bilirsin; alacaklılarla konuşmayı da.":
    "Your mother sang as a minstrel in the squares of {bolge}, your father embroidered. In your home there was always music, always a guest, and never money. You know how to charm people and stand before a crowd; also how to talk to creditors.",
  "Baban {bolge} tekstil fabrikasında günde on dört saat çalıştı, ciğerleri pamuk tozuyla doldu. Sen de sekiz yaşından beri makinelerin arasındaydın. Dayanışmanın ne olduğunu bilirsin; parmaklarının ikisini de o makinelerde bıraktın.":
    "Your father worked fourteen hours a day in a {bolge} textile mill, his lungs filling with cotton dust. You have been among the machines since you were eight. You know what solidarity means; you left two of your fingers in those machines.",
  "Baban {bolge} pazarlarının tanınmış bir simsarıydı; evinizde baharat ve mürekkep kokusu eksik olmazdı. Hesap yapmayı, pazarlık etmeyi ve gerektiğinde gerçeği biraz eğip bükmeyi sofrada öğrendin.":
    "Your father was a well-known broker in the markets of {bolge}; your home always smelled of spice and ink. You learned arithmetic, haggling, and — when needed — bending the truth a little, right at the dinner table.",
  "Baban {bolge} cemaatinin saygın bir üyesiydi; evinizde her akşam dua edilir, her sabah şükredilirdi. Okuma yazmayı kutsal metinlerden öğrendin. Ailenin adı sana güven kazandırıyor, ama herkes senden bir aziz gibi yaşamanı bekliyor.":
    "Your father was a respected member of the {bolge} congregation; in your home there was prayer every evening and thanksgiving every morning. You learned to read and write from scripture. Your family name earns you trust, but everyone expects you to live like a saint.",
  "Baban {bolge} çarşısında demir döverdi, sen körüğü çekerek büyüdün. Ne zengin ne fakirdiniz; ödenmiş bir kira ve dolu bir tencere yeterdi. Elin iş tutar, gözün ölçü bilir — ama çekiç sallayan adama kimse büyük fırsat sunmaz.":
    "Your father forged iron in the {bolge} bazaar; you grew up working the bellows. You were neither rich nor poor; a paid rent and a full pot were enough. Your hands are skilled, your eye judges measure — but no one offers a hammer-swinger a great chance.",
  "Annen {bolge} çevresinde şifacı olarak bilinirdi; otları, yaraları, ateşi tanırdı. Kan görmeye küçük yaşta alıştın. İnsanların en kırılgan hallerini gördüğün için ölümden az korkarsın — ama hekimlik yapmayı seçmedin ve bu ailende hâlâ bir kırgınlık.":
    "Your mother was known as a healer around {bolge}; she knew herbs, wounds, and fever. You grew used to the sight of blood young. Having seen people at their most fragile, you fear death less — but you did not choose to practice medicine, and that is still a sore point in your family.",
  "Baban {bolge} limanlarından kalkan gemilerde yıllarca çalıştı, bir seferden hiç dönmedi. Sen liman meyhanelerinde büyüdün; yabancı dilleri, hileli zarları ve fırtınadan önceki sessizliği tanırsın.":
    "Your father worked for years on ships leaving the harbors of {bolge}; from one voyage he never returned. You grew up in dockside taverns; you know foreign tongues, loaded dice, and the silence before a storm.",
  "Ailen {bolge} yakınlarındaki madende çalıştı; iki amcan yer altında kaldı. Karanlıktan korkmayı çoktan bıraktın. Ağır işin parası iyiydi, bedeli ciğerlerindi — ve o bedeli sen de ödemeye başladın bile.":
    "Your family worked the mine near {bolge}; two of your uncles never came back up. You stopped fearing the dark long ago. The heavy work paid well, and its price was your lungs — and you have already begun to pay it.",
  "Ailen {bolge} sınırlarında gümrüğe uğramayan mallarla geçindi. Gece yürümeyi, soru sormamayı ve kimseye tam adını söylememeyi öğrendin. Cebinde her zaman para vardı; ama jandarma da her zaman kapıdaydı.":
    "Your family lived off goods that never passed customs at the borders of {bolge}. You learned to walk by night, to ask no questions, and to never give anyone your full name. There was always money in your pocket; but the gendarmes were always at the door.",
  "Baban {bolge} esnafına faizle borç verirdi; kapınızı çalanlar ya yalvarırdı ya tehdit ederdi. Paranın insanları nasıl değiştirdiğini çocukken öğrendin. Zengin büyüdün, sevilmeden büyüdün.":
    "Your father lent money at interest to the tradesmen of {bolge}; those who knocked on your door either begged or threatened. You learned as a child how money changes people. You grew up rich, and grew up unloved.",
  "Baban {bolge} divanında kayıt tutar, insanların doğumunu ve borcunu aynı defterin sayfalarına yazardı. Okuma yazmayı ve kimin kime ne borçlu olduğunu erken öğrendin. Kalem tutan eller güçlüdür ama yumruk yediğinde kırılır.":
    "Your father kept records in the {bolge} chancery, writing people's births and their debts on the pages of the same ledger. You learned to read and write early, and who owed what to whom. Hands that hold a pen are powerful, but they break when they take a punch.",
  "Babanın mesleğini kimse yüksek sesle söylemezdi. {bolge} meydanında infazları o yapardı; eve döndüğünde ellerini uzun uzun yıkardı. Devlet iyi para verirdi, komşular ise selam vermezdi. Ölümle senli benli büyüdün.":
    "No one said your father's trade out loud. He carried out the executions in the {bolge} square; when he came home he washed his hands for a long time. The state paid well, the neighbors did not greet him. You grew up on familiar terms with death.",
  "Annen {bolge} sarayında hizmetkârdı; mutfağın arka kapısından büyük salonları izleyerek büyüdün. Soyluların nasıl konuştuğunu, nasıl yalan söylediğini ezbere bilirsin. Onlardan biri değilsin ama aralarında nasıl durulacağını biliyorsun.":
    "Your mother was a servant in the {bolge} palace; you grew up watching the great halls from the kitchen's back door. You know by heart how nobles speak and how they lie. You are not one of them, but you know how to stand among them.",
  "Aileniz bir isyana karıştığı için memleketinden sürüldü; {bolge} topraklarına yabancı olarak geldiniz. Soyadınız burada kimseye bir şey ifade etmiyor, hatta bazı kapılar duyunca kapanıyor. Sıfırdan başlamayı herkesten iyi bilirsin.":
    "Your family was exiled from its homeland for taking part in a revolt; you came to the lands of {bolge} as strangers. Your surname means nothing to anyone here — in fact, some doors close at the sound of it. You know better than anyone how to start from nothing.",

  // fabrika_iscisi kalıcı durumu
  "Tozlu Ciğerler": "Dusty Lungs",

  // ---------------------------------------------------------------------------
  // Rütbe unvanları (5 kademe × meslek × çağ + İslam varyantı)
  // ---------------------------------------------------------------------------
  // Asker — Orta Çağ
  "Er": "Private",
  "Onbaşı": "Corporal",
  "Silahşor": "Man-at-Arms",
  "Kumandan": "Commander",
  "Serdar": "Warlord",
  // Asker — Sanayi Devrimi
  "Çavuş": "Sergeant",
  "Yüzbaşı": "Captain",
  "Binbaşı": "Major",
  // Tüccar — Orta Çağ
  "Çırak Tüccar": "Apprentice Trader",
  "Seyyar Satıcı": "Peddler",
  "Pazarcı": "Market Trader",
  "Lonca Ustası": "Guild Master",
  "Lonca Reisi": "Guild President",
  // Tüccar — Sanayi Devrimi
  "Kâtip Çırak": "Clerk's Apprentice",
  "Tezgâhtar": "Shop Clerk",
  "Şirket Ortağı": "Company Partner",
  "Fabrika Patronu": "Factory Owner",
  "Sanayi Baronu": "Industrial Baron",
  // Din Adamı — Orta Çağ (Hristiyan)
  "Acemi Rahip": "Novice Priest",
  "Rahip": "Priest",
  "Vaiz": "Preacher",
  "Başrahip": "Abbot",
  "Piskopos": "Bishop",
  // Din Adamı — Sanayi Devrimi (Hristiyan)
  "Papaz Yardımcısı": "Curate",
  "Papaz": "Pastor",
  "Başpapaz": "Head Pastor",
  // Din Adamı — Sünni İslam
  "Medrese Talebesi": "Madrasa Student",
  "Müezzin": "Muezzin",
  "İmam": "Imam",
  "Baş İmam": "Chief Imam",

  // Şehir yönetimi unvanları (post-max-rank)
  "Bölge Komutanı": "Regional Commander",
  "Ordu Generali": "Army General",
  "Savaş Konseyi Üyesi": "War Council Member",
  "Krallığın Kalkanı": "Shield of the Realm",
  "Ticaret Baronu": "Trade Baron",
  "Şehrin Hazine Nazırı": "City Treasury Minister",
  "Ticaret İmparatoru": "Merchant Emperor",
  "Piskopos Vekili": "Bishop's Deputy",
  "Baş Piskopos": "Archbishop",
  "Kutsal Meclis Üyesi": "Holy Council Member",
  "Ruhani Önder": "Spiritual Leader",

  // ---------------------------------------------------------------------------
  // Yerleşimler
  // ---------------------------------------------------------------------------
  "Kasaba": "Town",

  // ---------------------------------------------------------------------------
  // Konutlar (Faz 9, 2026-09 sonu: 6 kademeden 5'e indirildi, isimler yenilendi)
  // ---------------------------------------------------------------------------
  "Nemli Baraka": "Damp Shack",
  "Mütevazı Yuva": "Modest Home",
  "Sıcak Ocak": "Warm Hearth",
  "Sağlam Konut": "Sturdy House",
  "Görkemli Konak": "Grand Manor",
  "Rüzgârın duvarlardan geçtiği, sürekli nemli ve soğuk bir barınak; burada yaşamak bedenini ağır şekilde yıpratır, moralini ve az da olsa adını düşürür. Sadece geçici bir dip.":
    "A shelter so drafty the wind cuts straight through the walls, damp and cold all year round; living here wears your body down heavily and dents your spirits, and your name a little too. Only a temporary low point.",
  "Sıradan ama gerçek bir yuva; kendi dört duvarının verdiği küçük bir huzur var. Artık ev seni yıpratmıyor.":
    "Plain but a real home; there is a small peace in having your own four walls. The house no longer wears you down.",
  "Küçük ama sımsıcak, içi sevgiyle döşenmiş bir ev; gösterişten çok huzur ve neşe sunuyor, komşuların arasında da adından iyi söz ettiriyor.":
    "Small but warm, a home furnished with love; it offers peace and joy more than show, and still gets your name spoken well of among the neighbors.",
  "Kalın duvarları, iyi havalandırması ve temiz suyuyla bedenini gerçekten koruyan, sağlam ve konforlu bir ev.":
    "A sturdy, comfortable house whose thick walls, good ventilation and clean water genuinely protect your body.",
  "Bölgenin konuştuğu, gerçekten görkemli bir çatı; hem bedenin hem ruhun bu konforda rahat eder, adın da kapılarından çok öteye taşınır.":
    "A truly magnificent roof that the whole region talks about; both body and soul rest easy in this comfort, and your name travels far beyond its gates.",

  // ---------------------------------------------------------------------------
  // Yaşam tarzları (Faz 9, 2026-09 sonu: 6 kademeden 5'e indirildi, isimler yenilendi)
  // ---------------------------------------------------------------------------
  "Bayat Artık": "Stale Scraps",
  "Sade Sofra": "Plain Table",
  "Keyifli Sofra": "Cozy Table",
  "Dengeli Sofra": "Balanced Table",
  "Şölen Sofrası": "Feast Table",
  "Küflenmeye yüz tutmuş artıklar ve bayat kırıntılar; karnını doyurur ama bedenini ağır şekilde yıpratır, moralini ve az da olsa adını düşürür. Sadece çaresizlikten seçilecek bir dip.":
    "Half-moldy leftovers and stale crumbs; it fills your stomach but wears your body down heavily and dents your spirits, and your name a little too. A low point chosen only out of desperation.",
  "Dengeli bir sofra; ne artısı ne eksisi var. Artık yemek seni yıpratmıyor.":
    "A balanced table; neither plus nor minus. Food no longer wears you down.",
  "Şatafatsız ama lezzetli, canını sıcacık hissettiren bir sofra; sağlıktan çok keyif ve moral için yenir.":
    "An unpretentious but tasty table that leaves you feeling warm inside; you eat it for joy and spirits more than for health.",
  "Taze ve besleyici, bedenini gerçekten güçlendiren dengeli bir beslenme düzeni.":
    "A fresh, nourishing, well-balanced diet that genuinely strengthens your body.",
  "Her akşam sanki bir şölenmiş gibi yersin; gerçekten pahalı ama bu sofradan kalkanlar hem doyar hem de senden söz eder.":
    "Every evening you eat as if at a feast; truly expensive, but those who rise from this table both leave full and talk about you.",

  // ---------------------------------------------------------------------------
  // Mağaza eşyaları
  // ---------------------------------------------------------------------------
  "Kaliteli Erzak Sepeti": "Fine Provisions Basket",
  "Şifalı Otlar Demeti": "Bundle of Healing Herbs",
  "Eczaneden Hazır İlaç": "Ready-Made Apothecary Medicine",
  "Şifalı Merhem": "Healing Salve",
  "Kuvvet Şurubu": "Strength Tonic",
  "Nadide Baharat Çeşnisi": "Rare Spice Blend",
  "İpek Halı": "Silk Carpet",
  "Nadide Tablo": "Rare Painting",
  "Değerli Mücevher": "Precious Jewel",
  "Antika Eser": "Antique Artifact",
  "Taze ekmek, peynir ve kurutulmuş et; günlerce dayanan doyurucu bir sepet.":
    "Fresh bread, cheese and dried meat; a filling basket that keeps for days.",
  "Yöre kadınlarının topladığı, ateş düşürüp yara iyileştirdiği bilinen otlar.":
    "Herbs gathered by the local women, known to bring down fever and heal wounds.",
  "Yeni açılan eczanenin raflarında satılan, şişe etiketli hazır bir ilaç.":
    "A ready-made, bottle-labeled medicine sold on the shelves of the newly opened apothecary.",
  "Cerrah çırağının hazırladığı, yara ve ağrılara iyi geldiği söylenen koyu bir merhem; sargısı biraz da ferahlık verir.":
    "A dark salve prepared by the surgeon's apprentice, said to be good for wounds and aches; its dressing also brings a little relief.",
  "Gazetelere reklamı çıkan, 'bütün dertlere derman' diye satılan tatlı bir tonik.":
    "A sweet tonic advertised in the papers and sold as 'a cure for every ailment'.",
  "Uzak diyarlardan gelen, en sade yemeği bile bir ziyafete çeviren baharat karışımı.":
    "A spice blend from distant lands that turns even the plainest meal into a feast.",
  "Uzak bir kervanla gelen, karmaşık desenli, elde dokunmuş bir ipek halı.":
    "A hand-woven silk carpet with an intricate pattern, brought by a distant caravan.",
  "Şehrin konuştuğu bir ressamın elinden çıkma, salonun baş köşesine asılacak bir tablo.":
    "A painting from the hand of an artist the whole city talks about, fit for the place of honor in your hall.",
  "Kuyumcunun vitrininde göz kamaştıran, taşıyanın servetini haykıran bir mücevher.":
    "A jewel that dazzles in the goldsmith's window and shouts the wearer's wealth.",
  "Geçmiş bir çağdan kalma, hikâyesi kadar değerli de olan nadir bir eser.":
    "A rare artifact from a past age, as valuable as its story.",

  // ---------------------------------------------------------------------------
  // Sosyalleşme mekânları
  // ---------------------------------------------------------------------------
  "Meyhane": "Tavern",
  "Pub": "Pub",
  "Hamam": "Bathhouse",
  "Kahvehane": "Coffeehouse",
  "Kervansaray": "Caravanserai",
  "Ordugâh Çadırı": "Camp Tent",
  "Cemaat Sofrası": "Congregation Table",
  "Lonca Meclisi": "Guild Assembly",
  "Pazar Meydanı": "Market Square",
  "Soylu Salonu": "Noble Salon",
  "Şarabın, dedikodunun ve kavganın bir arada aktığı, kapısından her tabakadan insanın girip çıktığı gürültülü mekân.":
    "A loud place where wine, gossip and brawls flow together, its door used by people of every station.",
  "Ocak başında bira, dart ve işçi sınıfının en taze dedikodularıyla dolu, mahallenin kalbi sayılan İngiliz meyhanesi.":
    "An English public house counted as the heart of the neighborhood: ale by the hearth, darts, and the working class's freshest gossip.",
  "Buharın içinde kimsenin rütbesinin görünmediği; iş bağlantılarının, evlilik konuşmalarının ve şehir dedikodusunun asıl mekânı.":
    "In the steam no one's rank shows; the true venue for business connections, marriage talks and city gossip.",
  "Nargilenin dumanı, tavla taşlarının sesi ve bir meddahın hikâyesi eşliğinde saatlerce oturulan mahalle kahvehanesi.":
    "A neighborhood coffeehouse where you sit for hours amid pipe smoke, the clatter of backgammon pieces and a storyteller's tale.",
  "Uzak diyarlardan gelen tüccarların, hikâyelerin ve garip eşyaların bir gecelik konakladığı taş avlu.":
    "A stone courtyard where merchants, stories and strange goods from distant lands lodge for a night.",
  "Nöbet aralarında askerlerin ateş başında toplanıp kadeh tokuşturduğu, hikâye ve meydan okumanın eksik olmadığı çadır.":
    "A tent where, between watches, soldiers gather by the fire and clink cups, never short of stories and challenges.",
  "Ayin sonrası din adamlarının bir araya gelip cemaat işlerini, dedikoduyu ve derin sırları paylaştığı sade sofra.":
    "A plain table where, after the service, clergymen gather to share congregation business, gossip and deep secrets.",
  "Esnafın fiyat, rekabet ve dedikodu konuştuğu; bazen sert pazarlıkların masaya yumruk indirdiği toplantı salonu.":
    "A meeting hall where tradesmen discuss prices, rivalry and gossip; sometimes hard bargaining brings a fist down on the table.",
  "Şehrin nabzının attığı, herkesin birbirini tanıdığı ya da tanıyormuş gibi davrandığı açık meydan.":
    "An open square where the city's pulse beats and everyone knows one another, or pretends to.",
  "Kristal kadehlerin tokuşturulduğu, entrikanın kadife eldiven altında döndüğü davetli gecesi.":
    "An invitation-only evening where crystal glasses clink and intrigue turns beneath a velvet glove.",

  // ---------------------------------------------------------------------------
  // Piyasa mülkleri
  // ---------------------------------------------------------------------------
  "Buğday Tarlası": "Wheat Field",
  "Demirci Atölyesi": "Blacksmith's Workshop",
  "Şehir Hanı": "City Inn",
  "Ticaret Kervanı": "Trade Caravan",
  "Karaborsa Deposu": "Black Market Warehouse",
  "Ekonomi iyiyken bereketli bir hasat getirir; kıtlıkta zarar ettirir.":
    "Brings a bountiful harvest when the economy is good; loses money in a famine.",
  "Savaş ve isyan dönemlerinde ordu siparişleriyle kazancı katlanır; uzun barışta sürünür.":
    "In times of war and revolt, army orders multiply its earnings; in a long peace it barely gets by.",
  "Nüfus artışı ve barış döneminde dolup taşar; veba ya da savaşta iflasın eşiğine gelir.":
    "Overflows during population growth and peace; comes to the brink of bankruptcy in plague or war.",
  "Barış ve bolluk döneminin en kazançlı yatırımı; savaş çıkarsa tamamen kaybolma riski taşır.":
    "The most profitable investment in times of peace and plenty; if war breaks out it risks being lost entirely.",
  "Kıtlık, veba ve savaşta dehşet para basar; ama her yıl aranma seviyeni artırır ve vicdanını aşındırır.":
    "Prints money in famine, plague and war; but every year it raises your wanted level and erodes your conscience.",
  "Bolluk (iyi ekonomi)": "Plenty (good economy)",
  "Kıtlık": "Famine",
  "Savaş veya isyan": "War or revolt",
  "Uzun barış": "Long peace",
  "Nüfus artışı ve barış": "Population growth and peace",
  "Veba veya savaş": "Plague or war",
  "Barış ve bolluk": "Peace and plenty",
  "Savaş (yağma/batma riski)": "War (risk of plunder/loss)",
  "Kıtlık, veba veya savaş": "Famine, plague or war",
  "Barış ve bolluk (getirisi zayıflar)": "Peace and plenty (yield weakens)",

  // ---------------------------------------------------------------------------
  // Evcil hayvan türleri (isimler çevrilmez, türler çevrilir)
  // ---------------------------------------------------------------------------
  "Kedi": "Cat",
  "Köpek": "Dog",
  "Şahin": "Falcon",
  "Papağan": "Parrot",
  "Kurt": "Wolf",

  // ---------------------------------------------------------------------------
  // Hizipler
  // ---------------------------------------------------------------------------
  "Eski Muhafızlar": "Old Guard",
  "Yeni Nizam": "New Order",
  "Liman Loncası": "Harbor Guild",
  "Pazar Birliği": "Market Union",
  "Gelenekçiler": "Traditionalists",
  "Yenilikçiler": "Reformers",

  // ---------------------------------------------------------------------------
  // Hayat amaçları
  // ---------------------------------------------------------------------------
  "Şehrin En Zengini Olmak": "Become the Richest in the City",
  "Servetini 180'in üzerine çıkar.": "Raise your wealth above 180.",
  "Efsanevi Bir Şöhret Kazanmak": "Win Legendary Fame",
  "Şöhretini neredeyse zirveye taşı.": "Carry your fame almost to its peak.",
  "Kutsal Topraklara Ulaşmak": "Reach the Holy Land",
  "Ahlakını neredeyse kusursuz bir seviyeye taşı.": "Raise your morality to an almost flawless level.",
  "Büyük Bir Aile Kurmak": "Raise a Large Family",
  "En az 3 yaşayan çocuğa sahip ol.": "Have at least 3 living children.",

  // ---------------------------------------------------------------------------
  // Bölge istatistikleri (nüfus tahmini + notlar)
  // ---------------------------------------------------------------------------
  "~15 milyon": "~15 million",
  "~8 milyon": "~8 million",
  "~6 milyon": "~6 million",
  "~3 milyon": "~3 million",
  "~5 milyon": "~5 million",
  "~18 milyon": "~18 million",
  "~34 milyon": "~34 million",
  "~30 milyon": "~30 million",
  "~60 milyon": "~60 million",
  "Paris, Avrupa'nın en kalabalık şehirlerinden biri sayılıyor.":
    "Paris is reckoned one of the most populous cities in Europe.",
  "Şaraphaneler ve panayırlar, kırsaldaki köylerin en büyük gelir kapısı.":
    "Wineries and fairs are the largest source of income for the countryside villages.",
  "Yüzlerce küçük prensliğe, dükalığa ve serbest şehre bölünmüş bir topraksın.":
    "You are a land split into hundreds of small principalities, duchies and free cities.",
  "İmparator seçimle işbaşına gelir; taht doğrudan babadan oğula geçmez.":
    "The emperor comes to power by election; the throne does not pass directly from father to son.",
  "Konstantinopolis surları, kuşatmalara karşı yüzyıllardır aşılamıyor.":
    "The walls of Constantinople have withstood sieges for centuries.",
  "İpek Yolu'nun son durağı olarak doğu ile batı arasında köprü görevi görüyorsun.":
    "As the final stop of the Silk Road, you serve as a bridge between East and West.",
  "Kervansaraylar, tüccarları konaklatmak için devlet eliyle inşa ediliyor.":
    "Caravanserais are built by the state to lodge merchants.",
  "Medreseler, hem dini hem de fen ilimlerinin öğretildiği başlıca eğitim kurumları.":
    "Madrasas are the principal institutions where both religious and natural sciences are taught.",
  "Nil'in taşkınları, yıllık hasadın bereketini doğrudan belirliyor.":
    "The flooding of the Nile directly determines the abundance of the yearly harvest.",
  "Kahire, dönemin en büyük ilim ve ticaret merkezlerinden biri.":
    "Cairo is one of the greatest centers of learning and trade of the age.",
  "Fabrika bacaları, büyük şehirlerin gökyüzünü artık is bulutlarıyla paylaşıyor.":
    "Factory chimneys now share the sky of the great cities with clouds of soot.",
  "Demiryolu ağı, ülkeyi baştan başa haftalar yerine saatler içinde geçilebilir kılıyor.":
    "The railway network makes the country crossable in hours rather than weeks.",
  "Devrim sonrası art arda yönetim değişiklikleri hâlâ gündelik hayata yansıyor.":
    "The successive changes of government after the revolution still mark daily life.",
  "Paris'in bulvarları, dönemin en modern şehir planlama örneklerinden sayılıyor.":
    "The boulevards of Paris are reckoned among the most modern examples of city planning of the age.",
  "Tanzimat sonrası reformlar, taşrada farklı hızlarda hissediliyor.":
    "The post-Tanzimat reforms are felt at different speeds in the provinces.",
  "İstanbul, hâlâ üç kıtayı birbirine bağlayan en kalabalık liman şehirlerinden biri.":
    "Istanbul is still one of the most populous port cities linking three continents.",
  "İmparatorluğun büyük kısmı hâlâ toprağa bağlı köylülerden oluşuyor.":
    "Most of the empire still consists of peasants bound to the land.",
  "Sibirya'ya doğru yerleşim, devlet eliyle teşvik edilen bir göç dalgasına dönüşüyor.":
    "Settlement toward Siberia is turning into a wave of migration encouraged by the state.",

  // ---------------------------------------------------------------------------
  // Hükümdar unvan önekleri (state.hukumdar = "<unvan> <isim>"; sadece önek çevrilir)
  // ---------------------------------------------------------------------------
  "Kral": "King",
  "Kraliçe": "Queen",
  "İmparator": "Emperor",
  "İmparatoriçe": "Empress",
  "Sultan": "Sultan",
  "Padişah": "Sultan",
  "Han": "Khan",
  "Çar": "Tsar",
  "Prens": "Prince",
  "Dük": "Duke",
  "Kont": "Count",
  "Halife": "Caliph",
  "Papa": "Pope",
  "Bey": "Bey",
  "Emir": "Emir",

  // Ekip üyesi rolleri (GorevEkrani'nde uye.rol gösterilir)
  "muhafız": "guard",
  "kâtip": "scribe",
  "casus": "spy",
  "danışman": "adviser",
  "silahşor": "man-at-arms",
  "tüccar yardımcısı": "trade assistant",
  "vaiz yardımcısı": "preaching assistant",
  "korumaci": "bodyguard",
  "gözcü": "lookout",
  "aşçı": "cook",

  // Faz 7 / çağa özel ek aileler (ad + açılış anlatısı)
  "Şövalye": "Knight",
  "Hacı Ailesi": "Pilgrim Family",
  "Soytarı": "Jester",
  "Mühendis": "Engineer",
  "Gazeteci": "Journalist",
  "Sirk Ailesi": "Circus Family",
  "Define Avcısı": "Treasure Hunter",
  "Falcı Ailesi": "Fortune-Teller Family",
  "Kumarbaz Aile": "Gambler Family",
  "Tavuk Hırsızı Ailesi": "Chicken-Thief Family",
  "Baban {bolge} limanlarından kalkan buharlı gemilerde yıllarca çalıştı, bir seferden hiç dönmedi. Sen liman meyhanelerinde büyüdün; yabancı dilleri, hileli zarları ve fırtınadan önceki sessizliği tanırsın.":
    "Your father worked for years on the steamships leaving the ports of {bolge}, and one voyage he never came back. You grew up in harbor taverns; you know foreign tongues, loaded dice, and the silence before a storm.",
  "Baban {bolge}'nin yeni demiryolu şirketinde defter tutar, kimin kime ne borçlu olduğunu aynı sayfalara yazardı. Okuma yazmayı ve rakamları erken öğrendin. Kalem tutan eller güçlüdür ama fabrika patronunun öfkesine karşı hiçbir zaman yeterli değildir.":
    "Your father kept the ledgers at the new railway company of {bolge}, writing down who owed what to whom on the same pages. You learned to read, write and reckon early. Hands that hold a pen are strong — but never strong enough against a factory owner's temper.",
  "Ailen kuşaklardır {bolge} beyliğine kılıç borçlu bir şövalye hanedanı. Zırh kuşanmayı, yemin etmeyi ve yeminini tutmayı öğrendin — soylulardan farklı olarak sizde onur satılık değildi. Ama savaş meydanları hep aç, hep açtı.":
    "For generations your family has been a knightly house sworn by the sword to the lords of {bolge}. You learned to don armor, to swear an oath and to keep it — unlike the nobles, honor was never for sale in your house. But the battlefields were always hungry, always open.",
  "Ailen nesillerdir hac yollarına düşer; kervanları, tehlikeli geçitleri ve yabancı şehirlerin pazarlarını tanır. Evde her zaman uzak diyarlardan getirilmiş bir tespih ya da bir hikaye vardı, ama kesenizde nadiren para kalırdı.":
    "For generations your family has taken to the pilgrim roads; they know the caravans, the dangerous passes and the markets of foreign cities. There was always a string of prayer beads or a tale from distant lands at home — but rarely any money left in the purse.",
  "Baban {bolge} sarayında soytarılık yaptı; kralı güldürmek karnını doyururdu, ama kimse bir soytarının sözüne itibar etmezdi. Sen de kahkaha atmayı ve kimsenin ciddiye almadığı bir ailenin çocuğu olmayı öğrendin.":
    "Your father was a jester at the court of {bolge}; making the king laugh put food on the table, but no one ever trusted a jester's word. You learned to laugh too — and what it means to be the child of a family nobody takes seriously.",
  "Baban {bolge}'nin yeni fabrikalarına buhar makineleri kurdu, evinizde her zaman bir plan kağıdı açık dururdu. Çarkların nasıl döndüğünü, bir hesabın nasıl tutmadığını erken yaşta öğrendin — ama makineler bazen ellerini de yerdi.":
    "Your father installed steam engines in the new factories of {bolge}; there was always a blueprint spread open in your house. You learned early how gears turn and how a calculation can fail — but sometimes the machines took a man's hands too.",
  "Annen {bolge} gazetelerine haber yetiştirirdi; evinizde mürekkep kokusu ve dedikodu eksik olmazdı. Kimin ne yaptığını bilmeyi ve bunu nasıl anlatacağını erken öğrendin — ama bazı yazılar bazı kapıları sonsuza dek kapattı.":
    "Your mother chased stories for the newspapers of {bolge}; your house never lacked the smell of ink or a bit of gossip. You learned early to know who did what and how to tell it — but some articles closed some doors forever.",
  "Ailen çadırdan çadıra dolaşan bir sirk topluluğuydu; ip cambazlığı, hayvan terbiyesi ve alkış senin ninnindi. Her kasabada bir gece tanınıp sabah unutulmayı, hiçbir yere kök salamamayı öğrendin.":
    "Your family was a circus troupe wandering from tent to tent; tightrope walking, animal taming and applause were your lullabies. You learned to be famous in every town for one night and forgotten by morning, never putting down roots anywhere.",
  "Ailen kuşaklardır {bolge} çevresindeki her 'gömülü hazine' söylentisinin peşine düştü; yarım köyü kazdılar, tek bulduğu şey borç ve söndürülemeyen bir umuttu. Sen de her eski haritaya bir çift parlak gözle bakarsın.":
    "For generations your family has chased every 'buried treasure' rumor around {bolge}; they dug up half the village, and all they ever found was debt and a hope that would not die. You too look at every old map with shining eyes.",
  "Ailen nesillerdir {bolge} pazarında fincan ve el falına bakar; herkesin geleceğini bilirmiş gibi görünürler, kendi ceplerinin geleceğini hiç kestiremezler. Sen de insanların yüzünü okumayı, ama kendi kaderine şaşırmayı öğrendin.":
    "For generations your family has read coffee cups and palms in the market of {bolge}; they seem to know everyone's future but can never foresee the future of their own purse. You learned to read people's faces — and to be surprised by your own fate.",
  "Deden bir atı zarda kaybetti, baban evi masaya sürdü; sen sayıları koyunları saymadan önce zarlarda saymayı öğrendin. Evinizde şans hep bir sonraki elin içindeydi — bir türlü gelmeyen bir sonraki elin.":
    "Your grandfather lost a horse at dice, your father staked the house on the table; you learned to count on dice before you ever counted sheep. In your house luck was always in the next hand — the next hand that never came.",
  "Ailen {bolge} köylerinde kümes kümes gezen, kimsenin tam olarak yakalayamadığı küçük hırsızlardı. Karnınız hep tavuklu doydu ama komşu köylerin hiçbirine rahatça giremezdiniz. Hızlı koşmayı ve daha hızlı yalan söylemeyi öğrendin.":
    "Your family were petty thieves who went from henhouse to henhouse in the villages of {bolge}, never quite caught by anyone. Your bellies were always full of chicken, but you could never walk easily into any neighboring village. You learned to run fast and to lie even faster.",
  "Küçük Tarla": "Small Plot",
  "En ucuz ve en istikrarlı yatırım: getirisi küçük ama kıtlıkta bile neredeyse hiç zarar ettirmez. Garanti arayan için.":
    "The cheapest, steadiest investment: small returns, but it barely loses money even in a famine. For those who want a sure thing.",

  // Olaylardan kazanılan ünvanlar (unvan_kazan)
  "Dağların Efsanesi": "Legend of the Mountains",
  "Kadeh Kralı": "King of the Cup",
  "Salonun Onurlu Kılıcı": "Honorable Blade of the Hall",
  "Şeytanı Geri Çeviren": "The One Who Refused the Devil",
  "Hacı": "Pilgrim",
  "Kudüs Hacısı": "Pilgrim of Jerusalem",
  "Kutsal Toprak Hacısı": "Pilgrim of the Holy Land",
  "Kutsal Toprak Gezgini": "Wanderer of the Holy Land",
  "Sanayinin Vicdanı": "Conscience of Industry",
  "Borsanın Kumarbazı": "Gambler of the Exchange",
  "Hayır Nişanı Sahibi": "Bearer of the Charity Medal",
  "Vakfın Kurucusu": "Founder of the Foundation",
  "Dengeli Çoban": "The Balanced Shepherd",
  "Değişmez Ses": "The Unchanging Voice",
  "Halkın Papazı": "The People's Priest",
  "Veba Tüccarı": "Plague Merchant",
  "Kanlı Kumandan": "The Bloody Commander",
  "Merhametli Komutan": "The Merciful Commander",
  "Açgözlü Baron": "The Greedy Baron",
  "Halkın Tüccarı": "The People's Merchant",
  "Keçi Fatihi": "Conqueror of Goats",
  "Tabya Fatihi": "Conqueror of the Redoubt",
  "Domuz Fatihi": "Conqueror of Pigs",
  "Aslan Terbiyecisi": "Lion Tamer",
  "İpek Kralı": "Silk King",
  "Cesur Yürek": "Brave Heart",
  "Şifa Veren": "The Healer",
  "Efsanevi Keçi Fatihi": "Legendary Conqueror of Goats",
  "Yenilikçi Usta": "Innovative Master",
  "Kraliyet Muhafızı": "Royal Guard",
  "Yenilmez Şampiyon": "Undefeated Champion",
  "Kraliyet Tedarikçisi": "Royal Purveyor",
  "Kutsal Emanetin Bekçisi": "Keeper of the Holy Relic",
  "Sarayın Baş Zanaatkârı": "Master Craftsman of the Palace",

  // Efsanevi (komik/nadir) ölüm başlıkları (efsanevi_olum)
  "Fıçıyla Şelaleden İnen Adam": "The Man Who Went Over the Falls in a Barrel",
  "Ejderha Nefesini Yutan Kahraman": "The Hero Who Swallowed Dragon's Breath",
  "Kralın Bıyığını Çizerken Düşen": "Fell While Drawing a Moustache on the King",
  "Arıların Fikrini Sormadan Bal Alan": "Took the Honey Without Asking the Bees",
  "Bir Bahis Uğruna Nefesini Fazla Tutan": "Held His Breath Too Long for a Bet",
  "Dev Kabağın Altında Kalan": "Crushed Under a Giant Pumpkin",
  "Buzun Kalınlığına Fazla Güvenen": "Trusted the Ice Too Much",
  "Gülleyi Ayağının Üstüne Düşüren": "Dropped the Cannonball on His Own Foot",
  "Değirmen Kanadıyla Uçmayı Deneyen": "Tried to Fly on a Windmill Sail",
  "Domuzla Yarışıp Kaybeden Adam": "The Man Who Raced a Pig and Lost",
  "Bez Kanatlara Güvenen Öncü": "The Pioneer Who Trusted Cloth Wings",
  "Çürük Köprüye 'Dayanır' Diyen": "Said 'It'll Hold' About a Rotten Bridge",
  "Fırtınada Demir Çubukla En Uzun Duran": "Held an Iron Rod Longest in the Storm",
  "Buhar Kazanına Çekiçle Cevap Veren": "Answered the Steam Boiler with a Hammer",
  "Dört yol ağzında verdiği sözün bedelini ödedi": "Paid the Price of a Promise Made at the Crossroads",
  "Balın Şehidi": "Martyr of Honey",
  "Kemerini Çözemeyen Balon Gönüllüsü": "The Balloon Volunteer Who Couldn't Undo His Belt",
  "Kafese Elini Sokan Meraklı Seyirci": "The Curious Onlooker Who Put His Hand in the Cage",
  "Kendi Kazdığı Kuyuya Düşen": "Fell into the Well He Dug Himself",
  "Keçi Kovalarken Kervan Arabasının Altında Kalan": "Run Over by a Caravan Wagon While Chasing a Goat",

  // Olaylarla eklenen süreli/kalıcı durumlar (durum_ekle.ad)
  "Üstündeki Gölge": "A Shadow Over You",
  "Yolculuk Özlemi": "Longing for the Road",
  "Kırık Kaburga": "Broken Rib",
  "Gece Kabusları": "Nightmares",
  "Vicdan Ağırlığı": "Weight of Conscience",
  "Yol Ateşi": "Road Fever",
  "Gözetim Altında": "Under Watch",
  "Tropik Humma": "Tropical Fever",
  "Tifo Belirtileri": "Signs of Typhoid",
  "Mucizevi Şifa": "Miraculous Healing",
  "Hekim Gözetiminde": "Under a Physician's Care",
  "Ev Tedavisi": "Home Remedy",
  "Gazi Yarası": "Veteran's Wound",
  "Veba Pençesi": "Grip of the Plague",
  "Lanetin Gölgesi": "Shadow of the Curse",
  "Kumar Bağımlılığı": "Gambling Addiction",
  "Gerçek Aşk Beklentisi": "Waiting for True Love",
  "Yalnızlığın Ağırlığı": "Weight of Loneliness",
  "Suikast Yarası": "Assassin's Wound",
  "Boşanma Eşiği": "On the Brink of Divorce",
  "Kronik Eklem Ağrısı": "Chronic Joint Pain",
  "Aile Dükkânı Getirisi": "Family Shop Income",
  "Borç Tahsilatı Bekleniyor": "Debt Collection Pending",
  "İyi Eğitilmiş Birlik": "Well-Trained Unit",
  "Kopuk Uzuv": "Severed Limb",
  "Baskın Yarası": "Raid Wound",
  "Komuta Yarası": "Command Wound",
  "Kan Davası — Beklemede": "Blood Feud — Pending",
  "Afyon Bağımlılığı": "Opium Addiction",
  "Unutulmuş Bir İyilik": "A Forgotten Kindness",
};

/** Sabit katalog değeri (bölge/meslek/kişilik/aile/rütbe/konut/mağaza...) gösterim çevirisi. */
export function kt(dil: Dil, tr: string | null | undefined): string {
  if (tr == null) return '';
  if (dil !== 'en') return tr;
  return KATALOG_EN[tr] ?? tr;
}

/** "<unvan> <isim>" biçimindeki hükümdar dizgisinin yalnız unvan önekini çevirir. */
export function ktHukumdar(dil: Dil, hukumdar: string | null | undefined): string {
  if (!hukumdar) return '';
  if (dil !== 'en') return hukumdar;
  const bosluk = hukumdar.indexOf(' ');
  if (bosluk < 0) return KATALOG_EN[hukumdar] ?? hukumdar;
  const onek = hukumdar.slice(0, bosluk);
  const geri = hukumdar.slice(bosluk + 1);
  return `${KATALOG_EN[onek] ?? onek} ${geri}`;
}
