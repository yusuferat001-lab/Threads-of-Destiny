/**
 * Sabit katalogların İngilizce görünen adları/açıklamaları.
 * Anahtar = Türkçe kaynak değerin KENDİSİ (oyun mantığı Türkçe değeri kullanmaya
 * devam eder; bu tablo yalnızca gösterim katmanında `K(dil, tr)` ile çözülür).
 * Bir anahtarın karşılığı yoksa Türkçe metin olduğu gibi gösterilir.
 *
 * Özel isimler KASITLI olarak çevrilmez: para birimleri (Livre, Mark, Kuruş...),
 * hükümdar/NPC/evcil hayvan isimleri, tarihi savaş rakip adları. Kavramlar çevrilir.
 */
export const KATALOG_EN: Record<string, string> = {
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

  // Kariyer sayfası — yönetimle bağlar unvanları (§35)
  "Hükümdar": "Ruler",
  "Vali": "Governor",
  "Bölge Beyi": "Regional Lord",
  "Ordu Kumandanı": "Army Commander",
  "Karargâh Komutanı": "Garrison Commander",
  "Kadı": "Qadi",
  "Başpiskopos": "Archbishop",
  "Patron": "Boss",
  "Usta": "Master",
  "şehri yöneten kişi": "the person who rules the city",
  "patronun": "your patron",

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
  "Şehir Merkezi": "City Center",
  "Sınır Bölgesi": "Frontier Region",
  "Dağ Başı": "Mountain Reaches",
  "Ticaret ve sosyal fırsatlar bol": "Abundant trade and social opportunities",
  "Yıllık kazancın %10 daha yüksek": "Your yearly income is 10% higher",
  "Kalabalık ve salgın riski yüksek": "Crowded, with a high risk of plague",
  "Başlangıç sağlığın daha düşük": "Your starting health is lower",
  "Toprağın bereketli, vergiler hafif": "Fertile land, light taxes",
  "Askeri fırsatlar ve ganimet bol": "Plenty of military opportunity and plunder",
  "Baskın ve savaş riski yüksek": "High risk of raids and war",
  "Ticaret ağın zayıf, yıllık kazancın %5 daha düşük": "Your trade network is weak; your yearly income is 5% lower",
  "Yalnız ve özgürsün, vergi baskısı az": "Alone and free, with little tax pressure",
  "Başlangıç sağlığın daha yüksek": "Your starting health is higher",
  "Vahşi hayvanlar ve zorlu kışlarla karşılaşabilirsin": "You may face wild animals and harsh winters",
  "Pazardan uzak, yıllık kazancın %10 daha düşük": "Far from the market; your yearly income is 10% lower",

  // ---------------------------------------------------------------------------
  // Konutlar
  // ---------------------------------------------------------------------------
  "Basit Barınak": "Simple Shelter",
  "Ahşap Ev": "Wooden House",
  "Normal Ev": "Ordinary House",
  "Taş Ev": "Stone House",
  "Konak": "Manor",
  "Şato": "Castle",
  "Neredeyse bedava ama nemli, soğuk ve sağlıksız; burada sürekli yaşamak bedenini, moralini ve itibarını yıpratır. Sadece geçici bir dip.":
    "Almost free, but damp, cold and unhealthy; living here for long wears down your body, your spirits and your reputation. Only a temporary low point.",
  "Ucuz ve gösterişsiz ama kendi tempon var; komşularla iç içe, dar ve bakımsız bir çatı sağlığını ve adını biraz aşındırsa da, kimseye hesap vermeyen bu sade hayat sana huzur veriyor.":
    "Cheap and unassuming, but it's your own pace; a cramped, run-down roof packed in among neighbors chips a little at your health and name, yet this simple life answering to no one gives you peace.",
  "Sıradan ama gerçek bir yuva; kendi dört duvarının verdiği küçük bir huzur var. Artık ev seni yıpratmıyor.":
    "Plain but a real home; there is a small peace in having your own four walls. The house no longer wears you down.",
  "Sağlam duvarları ve ayrı odalarıyla gerçek bir konfor sunar; komşuların arasında adın biraz daha anılır. Sofranı da bu seviyeye yakın tutmak (Normal ya da İyi Ye) genelde daha tutarlı bir hayat demek.":
    "With solid walls and separate rooms it offers real comfort; your name is spoken a little more among the neighbors. Keeping your table near this level (Eat Normally or Eat Well) usually means a more consistent life.",
  "Pahalı ama gösterişli; halk arasındaki tanınırlığını, rahatını ve sağlığını yıllar içinde büyütür. Böyle bir çatının altında çöpten geçinmek konu komşuya tuhaf gelir — sofran da haneni yansıtsın.":
    "Expensive but grand; over the years it grows your public renown, your comfort and your health. Scavenging for food under a roof like this looks strange to the neighbors — let your table reflect your household.",
  "Bölgenin konuştuğu, gerçekten pahalı bir yaşam; duvarları kadar adın da büyür, günlerin çok daha huzurlu ve sağlıklı geçer. Bu kapılardan girip ucuza/çöpten geçinmeye çalışmak inandırıcı olmaz — ancak en iyi sofralarla bir bütün oluşturur.":
    "A truly expensive life that the whole region talks about; your name grows as much as its walls, and your days pass far more peaceful and healthy. Trying to scrape by cheaply or off scraps behind these gates is not convincing — it only holds together with the finest tables.",

  // ---------------------------------------------------------------------------
  // Yaşam tarzları
  // ---------------------------------------------------------------------------
  "Çöpten Topla": "Scavenge",
  "Ucuza Ye": "Eat Cheap",
  "Normal Ye": "Eat Normally",
  "İyi Ye": "Eat Well",
  "Kaliteli Ye": "Eat Finely",
  "Ziyafet Gibi Ye": "Feast Every Day",
  "Bedava ama sağlığını, moralini ve itibarını hızla aşındırır; kimsenin gözünde saygın kalamazsın. Sadece çaresizlikten seçilecek bir dip.":
    "Free, but it quickly erodes your health, your spirits and your reputation; no one holds you in respect. A low point chosen only out of desperation.",
  "Ucuz ve doyurucu ama kalitesiz; sağlığını, moralini ve adını yavaş yavaş aşındırır. İlk fırsatta normal bir sofraya geçmek gerekir.":
    "Cheap and filling but poor quality; it slowly erodes your health, your spirits and your name. Move to a normal table at the first chance.",
  "Dengeli bir sofra; ne artısı ne eksisi var. Artık yemek seni yıpratmıyor.":
    "A balanced table; neither plus nor minus. Food no longer wears you down.",
  "Ortalamanın üstünde bir sofra; hem bünyeni hem moralini gözle görülür biçimde besler.":
    "An above-average table; it visibly nourishes both your constitution and your spirits.",
  "Pahalı ama sağlığını ve moralini gözle görülür biçimde besler.":
    "Expensive, but it visibly nourishes your health and your spirits.",
  "Her akşam sanki bir şölenmiş gibi yersin; gerçekten pahalı ama hem bedenin hem ruhun hem de itibarın bunu fazlasıyla hisseder.":
    "Every evening you eat as if at a feast; truly expensive, but your body, your soul and your reputation all feel it richly.",

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
  // Karanlık işler
  // ---------------------------------------------------------------------------
  "Rakibini Korkut": "Intimidate Your Rival",
  "Zevkine Adam Döv": "Beat Someone for Sport",
  "Rakibini Dövdür": "Have Your Rival Beaten",
  "Birini Soy": "Rob Someone",
  "Rakibin İş Yerini Yak": "Burn Down Your Rival's Business",

  // ---------------------------------------------------------------------------
  // Piyasa mülkleri
  // ---------------------------------------------------------------------------
  "Küçük Tarla": "Small Plot",
  "Buğday Tarlası": "Wheat Field",
  "Demirci Atölyesi": "Blacksmith's Workshop",
  "Şehir Hanı": "City Inn",
  "Ticaret Kervanı": "Trade Caravan",
  "Karaborsa Deposu": "Black Market Warehouse",
  "En ucuz ve en istikrarlı yatırım: getirisi küçük ama kıtlıkta bile neredeyse hiç zarar ettirmez. Garanti arayan için.":
    "The cheapest, steadiest investment: small returns, but it barely loses money even in a famine. For those who want a sure thing.",
  "Kıtlık (küçük kayıp)": "Famine (small loss)",
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
  // Hükümdar unvan önekleri (liderGetir → "<unvan> <isim>"; sadece önek çevrilir)
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

  // Komşu güçler (savaş/flavor metinlerinde {komsu})
  "İngiltere Krallığı": "Kingdom of England",
  "Kutsal Roma İmparatorluğu": "Holy Roman Empire",
  "Flandre Kontluğu": "County of Flanders",
  "Aragon Krallığı": "Kingdom of Aragon",
  "Papalık Devleti": "Papal States",
  "Lombardiya Şehir Birliği": "Lombard League",
  "Fransa Krallığı": "Kingdom of France",
  "Macar Krallığı": "Kingdom of Hungary",
  "Selçuklu Sultanlığı": "Seljuk Sultanate",
  "Bulgar Çarlığı": "Bulgarian Empire",
  "Normanlar": "the Normans",
  "Venedik Cumhuriyeti": "Republic of Venice",
  "Haçlı Kontlukları": "the Crusader states",
  "Gürcü Krallığı": "Kingdom of Georgia",
  "Danişmendliler": "the Danishmends",
  "Haçlı Kudüs Krallığı": "Crusader Kingdom of Jerusalem",
  "Zengiler": "the Zengids",
  "Bizans İmparatorluğu": "Byzantine Empire",
  "Rusya İmparatorluğu": "Russian Empire",
  "Afgan Emirliği": "Emirate of Afghanistan",
  "Sih İmparatorluğu": "Sikh Empire",
  "Yunanistan Krallığı": "Kingdom of Greece",
  "Mısır Hidivliği": "Khedivate of Egypt",
  "Sırp Prensliği": "Principality of Serbia",
  "Osmanlı İmparatorluğu": "Ottoman Empire",
  "Polonya": "Poland",
  "komşu bir güç": "a neighboring power",
  "Haçlı Ordusu": "the Crusader army",
  "Latin İmparatorluğu": "Latin Empire",
  "Fransa İmparatorluğu": "French Empire",
  "Avrupa Koalisyonu": "European Coalition",
  "Kutsal Roma İmparatorluğu ve müttefikleri": "the Holy Roman Empire and its allies",

  // Ekip üyesi rolleri (gerekliEkipRolu ile eşleşen kanonik değerler; gösterimde çevrilir)
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
};
