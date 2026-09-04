/**
 * Motorun ürettiği serbest anlatı cümlelerinin İngilizce karşılıkları.
 * Anahtar = Türkçe kaynak string'in KENDİSİ (şablonlarda `{0} {1} ...` yer
 * tutucuları kullanılır). Karşılığı yoksa `T()` Türkçe metni döner (bozulmaz).
 *
 * Kaynak: server/src/game/stateManager.ts + gameEngine.ts + olaySecici.ts
 * içindeki `T(state.dil, ...)` çağrıları.
 */
export const ANLATIM_EN: Record<string, string> = {
  // ---- doldur() yer tutucu yedekleri ----
  "çocuğun": "your child",
  "ekibinden biri": "one of your crew",
  "eşin": "your spouse",
  "amirin": "your superior",
  "hayvanın": "your pet",

  // ---- Hükümdar değişimi haberleri ----
  "{0} artık hayatta değil; yerine {1} geçti. Halk yeni döneme alışmaya çalışıyor.":
    "{0} is no longer among the living; {1} has taken their place. The people are trying to adjust to the new era.",
  "{0}'in dönemi kapandı, {1} başa geçti. Vergilerin artacağı konuşuluyor.":
    "{0}'s reign has ended and {1} has come to power. There is talk that taxes will rise.",
  "Uzun süredir başta olan {0} artık yok; {1} yönetimi devraldı. Sarayda el değişimleri bekleniyor.":
    "{0}, long in power, is gone; {1} has taken over. Changes of hands are expected at court.",
  "{0} sona erdi, {1} yeni hükümdar oldu. Şehirde tedirgin bir bekleyiş var.":
    "{0} is over; {1} is the new ruler. An uneasy anticipation hangs over the city.",

  // ---- Açılış anlatımı (createCharacter) ----
  "On beş yaşındasın ve eline verilen kılıçla {0} ordusuna yazıldın.":
    "You are fifteen, and with the sword put in your hand you have enlisted in the army of {0}.",
  "On beş yaşındasın ve ilk mal denkini sırtlanıp {0} pazarlarına adım attın.":
    "You are fifteen, and shouldering your first bundle of goods you have stepped into the markets of {0}.",
  "On beş yaşındasın ve {0} cemaatinin hizmetine girmek üzere yola çıktın.":
    "You are fifteen, and you have set out to enter the service of the {0} congregation.",
  "On beş yaşındasın ve {0} olarak hayata atılıyorsun.":
    "You are fifteen, and you are setting out in life as a {0}.",
  "Ailenin mesleğini sürdürmeyi seçtin; ailenin adı bazı kapıları senin için şimdiden araladı.":
    "You chose to carry on the family trade; your family name has already opened some doors for you.",
  "Ailenin yolundan farklı bir yol seçtin; kimse sana bu işi öğretmeyecek, her şeyi kendin öğreneceksin.":
    "You chose a path different from your family's; no one will teach you this trade — you will learn everything yourself.",
  "Çocukluğundan beri etrafındakiler seni {0} ve {1} biri olarak tanır.":
    "Since childhood those around you have known you as someone {0} and {1}.",
  "Ailen {0} topraklarının {1} kısmına yerleşmiş; sen de hayata burada gözlerini açtın.":
    "Your family settled in the {1} part of the lands of {0}; and here you opened your eyes to life.",
  "{0} yılı, {1} toprakları.": "The year {0}, the lands of {1}.",

  // ---- Ölüm / hayat amacı ----
  "Hayat amacını belirledi: {0}": "Set their life goal: {0}",
  "Hayat amacını tamamladı: {0}": "Completed their life goal: {0}",
  "Kutsal bir emanet sayesinde ölümden döndü": "Returned from death thanks to a holy relic",
  "Sağlık kaybı": "Loss of health",
  "Bilinmeyen sebep": "Unknown cause",
  "{0} yüzünden hayatını kaybetti.": "Died from {0}.",
  "Yüz yaşını doldurdun; huzurlu bir ihtiyar olarak, uykunda son nefesini verdin.":
    "You reached a hundred; a peaceful elder, you drew your last breath in your sleep.",
  "Yaşlılığın getirdiği yorgunlukla bir sabah uyanmadın; huzurlu bir ölümdü.":
    "Worn down by old age, one morning you did not wake; it was a peaceful death.",
  "Yılların yükü bedenini yendi; sevdiklerinin arasında, sakince son nefesini verdin.":
    "The weight of years overcame your body; among your loved ones, you quietly drew your last breath.",
  "İleri yaşın sessiz eceli bir gece seni de buldu.":
    "The silent end of old age found you too, one night.",
  "Uzun bir ömrün ardından bedenin artık dayanmadı; yatağında huzurla göçtün.":
    "After a long life your body could bear no more; you passed peacefully in your bed.",

  // ---- Ani (saçma) ölümler ----
  "Bir evin penceresinden düşen saksı tam kafana isabet etti.":
    "A flowerpot falling from a house window struck you squarely on the head.",
  "Sokakta kontrolden çıkan bir at arabası seni ezip geçti.":
    "A runaway horse-cart in the street ran you over.",
  "Fırtınada bir yıldırım tam üstüne düştü.": "In a storm, lightning struck you directly.",
  "Bir kuyudan su çekerken ayağın kaydı ve bir daha çıkamadın.":
    "Drawing water from a well, your foot slipped and you never came back up.",
  "Yediğin bir mantar, yanlışlıkla zehirli çıktı.": "A mushroom you ate turned out, by mistake, to be poisonous.",
  "Uykunda evinin çatısı üstüne çöktü.": "In your sleep, the roof of your house collapsed on you.",
  "Bir kavga izlerken sapan taşı yanlışlıkla sana geldi.":
    "Watching a brawl, a slingshot stone hit you by accident.",
  "Bir demirci dükkânının önünden geçerken kızgın bir demir parçası üstüne sıçradı.":
    "Passing a blacksmith's shop, a piece of red-hot iron flew onto you.",
  "Şehirdeki ilk buharlı makinelerden biri, tam yanından geçerken infilak etti.":
    "One of the city's first steam engines exploded just as you passed it.",
  "Saksı Kurbanı": "Victim of the Flowerpot",
  "At Arabasının Altında": "Under the Cart",
  "Gökten Gelen Ecel": "Doom From the Sky",
  "Kuyunun Dibinde": "At the Bottom of the Well",
  "Yanlış Mantar": "The Wrong Mushroom",
  "Çöken Çatı": "The Collapsed Roof",
  "Yanlış Zamanda Yanlış Yer": "Wrong Place, Wrong Time",
  "Demircinin Kıvılcımı": "The Blacksmith's Spark",
  "Makinenin Kurbanı": "Victim of the Machine",

  // ---- Şans olayları (küçük flavor) ----
  "Yolda kaybedilmiş bir kese para buldun.": "You found a lost purse of money on the road.",
  "Tanımadığın bir hayırsever, seni beğenip küçük bir bahşiş bıraktı.":
    "A stranger, a well-wisher, took a liking to you and left a small tip.",
  "{bolge} beyi senin adını bir yerde duymuş, meraklandığını söylediler.":
    "The lord of {bolge} heard your name somewhere; they say he grew curious.",
  "Uzak bir akraban seni hatırlamış, küçük bir miras gönderdi.":
    "A distant relative remembered you and sent a small inheritance.",
  "Bir tüccar seni kandırdı, cebinden bilmeden para eksildi.":
    "A merchant cheated you; money left your pocket without your knowing.",
  "Beklenmedik bir masraf çıktı; evinin çatısı aktı, tamir gerekti.":
    "An unexpected cost came up; your roof leaked and needed repair.",
  "Bir dedikodu yayıldı, adın bir süre daha az anılır oldu.":
    "A rumor spread, and your name was spoken a little less for a while.",
  "{dost} artık şehrin en saygın simalarından biri olmuş, bunu duyunca gururlandın.":
    "{dost} has become one of the city's most respected figures; hearing it, you felt proud.",
  "{rakip} büyük bir başarısızlık yaşamış, her şeyini kaybetmiş dediler.":
    "They say {rakip} suffered a great failure and lost everything.",
  "{dost} senin için güzel sözler etmiş, bir tanıdığın bunu sana aktardı.":
    "{dost} spoke well of you; an acquaintance passed it on.",
  "{rakip} senin aleyhinde konuşmuş, bazı çevrelere ulaşmış.":
    "{rakip} spoke against you, and it reached certain circles.",
  "{dost} evlenmiş, sen davet edilmemişsin; içine hafif bir kırgınlık oturdu.":
    "{dost} got married and you were not invited; a slight resentment settled in you.",

  // ---- Zenginlik sızıntısı ----
  "Zengin sanıp her yerde senden bahşiş beklediler; cebin sızdı.":
    "Thinking you rich, everyone expected a tip from you; your purse leaked.",
  "Kapına gelen bir dilenciye, komşular baksın diye fazladan verdin.":
    "You gave extra to a beggar at your door, so the neighbors would see.",
  "Hancı seni görünce fiyatı 'senin için özel' diye yükseltti.":
    "Seeing you, the innkeeper raised the price, calling it 'special for you'.",
  "Bir hayır listesi elden ele dolaştı; adının yanına küçük bir rakam yazdın.":
    "A charity list passed from hand to hand; you wrote a small sum next to your name.",
  "Uzak bir akraba 'sadece bu seferlik' diyerek borç aldı.":
    "A distant relative borrowed money, saying 'just this once'.",
  "Bir zanaatkâr işini abartıp fazladan ücret kesti, sesini çıkarmadın.":
    "A craftsman oversold the job and charged extra; you said nothing.",
  "Pazarda tanınıp etrafını sarınca, birkaç gereksiz şey almak zorunda kaldın.":
    "Recognized at the market and surrounded, you had to buy a few needless things.",
  "Bir tören için 'senin konumunda biri' diye ekstra bağış beklendi.":
    "For a ceremony, an extra donation was expected from 'someone of your standing'.",
  "Hizmetkârların bahşiş zamanı geldi diye hatırlattı.":
    "Your servants reminded you that it was time for their tip.",
  "Eski bir tanıdık 'sen zenginsin nasılsa' deyip yemeğin hesabını sana bıraktı.":
    "An old acquaintance said 'you're rich anyway' and left you the bill for the meal.",
  "Adın bir yerde saygıyla anıldı, ama bu sana bir şey kazandırmadı.":
    "Your name was mentioned with respect somewhere, but it earned you nothing.",
  "Yolda küçük bir kese buldun — kısmet.": "You found a small purse on the road — fortune.",
  "🗡️ Bir hırsız gece kilerine girdi; sabah {0} eksikti.":
    "🗡️ A thief broke into your cellar at night; by morning {0} was missing.",
  "💰 {1} kabadayıları \"koruma parası\" istedi; {0} vermek zorunda kaldın.":
    "💰 The toughs of {1} demanded 'protection money'; you had to hand over {0}.",
  "🤝 Güvendiğin bir ortak seni dolandırdı; {0} buharlaştı.":
    "🤝 A partner you trusted swindled you; {0} vanished.",
  "📜 Vergi tahsildarı defterlerinde \"eksik\" buldu; {0} ceza kesti.":
    "📜 The tax collector found a 'shortfall' in your books and fined you {0}.",
  "👨‍👩‍👧 Bir akraban büyük bir borç için kapına dayandı; {0} verdin, geri dönmeyecek.":
    "👨‍👩‍👧 A relative showed up at your door over a large debt; you gave {0}, and it won't come back.",
  "🎭 Bir dilenci kılığındaki dolandırıcı acıklı bir hikâyeyle {0} kopardı.":
    "🎭 A swindler disguised as a beggar wrung {0} out of you with a sad story.",
  "⚖️ {1}'de küçük bir dava açıldı üstüne; avukat ve rüşvet {0} götürdü.":
    "⚖️ A small lawsuit was filed against you in {1}; lawyer and bribes took {0}.",
  "🔥 Deponda çıkan yangını söndürmek ve zararı kapatmak {0} tuttu.":
    "🔥 Putting out a fire in your storehouse and covering the damage cost {0}.",
  "🃏 Bir bahiste kaptırdın; {0} masada kaldı.": "🃏 You lost a bet; {0} stayed on the table.",
  "🐴 Yolda eşkıya kervanını çevirdi; {0} değerinde mal ve para aldılar.":
    "🐴 Bandits stopped your caravan on the road; they took goods and money worth {0}.",
  "💍 Değerli bir eşyan \"kayboldu\"; yerine yenisini almak {0} tuttu.":
    "💍 A valuable item of yours 'went missing'; replacing it cost {0}.",
  "🏛️ {1} ileri gelenleri bir bağış listesi dolaştırdı; {0} yazmak zorunda kaldın.":
    "🏛️ The notables of {1} passed around a donation list; you had to put down {0}.",

  // ---- Ekonomi / zaman anlatımı ----
  "{0} {birim} kazandın.": "You earned {0} {birim}.",
  "{1} yılda {0} {birim} kazandın.": "You earned {0} {birim} over {1} years.",
  "Borcun kapanmadı, üstüne {0} {birim} faiz bindi.":
    "Your debt was not cleared, and {0} {birim} of interest was added on top.",
  "Borcun hâlâ kapanmadı, tefeciler peşini bırakmıyor.":
    "Your debt is still not cleared; the moneylenders won't let go.",
  "🙏 Zor günlerinde kilise ve birkaç eş dost devreye girdi; borcunun {0} {1}'ini kapattılar. Bu bir daha olmayacak.":
    "🙏 In your hard times the church and a few friends stepped in; they cleared {0} {1} of your debt. This won't happen again.",
  "Borç yardımı aldı: +{0} {1}": "Received debt relief: +{0} {1}",
  "{0} bu süre boyunca da seni yatağa düşürdü.":
    "{0} kept you bedridden through this period as well.",
  "Salgın sürüyordu, cenaze alayları artık gündelikti.":
    "The plague raged on; funeral processions had become a daily sight.",
  "Savaş sürüyordu; pazarlar durgun, insanlar tedirgindi.":
    "The war dragged on; the markets were still, the people anxious.",
  "Ekonomik darlık herkesi vurmuştu, ekmek her ay biraz daha pahalandı.":
    "The economic hardship hit everyone; bread grew a little dearer every month.",
  "Kendini uzun zamandır olmadığı kadar dinç hissediyorsun.":
    "You feel more vigorous than you have in a long time.",
  "Aldığın hasar ağırdı; günlerce yatakta kaldın.":
    "The harm you took was severe; you stayed in bed for days.",
  "Yaraların derindi, bir daha eskisi gibi olmayacaksın.":
    "Your wounds were deep; you will never be quite as you were.",
  "Kesene giren {0} {birim} güzel bir rahatlıktı.":
    "The {0} {birim} that went into your purse was a fine relief.",
  "Bedeninde kalan sızı bir süre bu günü hatırlattı.":
    "A lingering ache in your body reminded you of this day for a while.",
  "Ufak yaralarını kendin sardın, kimseye çaktırmadın.":
    "You bound your minor wounds yourself and let no one notice.",
  "{bolge} sokaklarında adın anılmaya başladı.":
    "Your name began to be spoken in the streets of {bolge}.",
  "Hikaye ağızdan ağıza dolaştı, itibarın arttı.":
    "The story passed from mouth to mouth; your standing rose.",
  "Dedikodu hızla yayıldı, itibarın zedelendi.":
    "The gossip spread fast; your standing was damaged.",
  "{bolge} çevrende adın eskisi kadar güvenle anılmıyor.":
    "Around {bolge}, your name is no longer spoken with the same trust.",
  "Doğru olanı yaptığını biliyorsun, bu seni ayakta tutuyor.":
    "You know you did the right thing, and it keeps you standing.",
  "Kendine bunun mecburiyetten olduğunu söyledin, tam inanamadın.":
    "You told yourself it was out of necessity; you couldn't quite believe it.",
  "O geceden sonra aynaya bakmak biraz zorlaştı.":
    "After that night, looking in the mirror got a little harder.",
  "Olay sessizce kapandı, hayatında somut bir şey değişmedi.":
    "The matter closed quietly; nothing concrete in your life changed.",
  "İşler istediğin gibi gitmedi, yine de büyük bir kayıp yaşamadın.":
    "Things did not go as you wished, but you suffered no great loss either.",
  "Artık {0} olarak anılıyorsun.": "You are now known as a {0}.",
  "{0} artık hayatının kalıcı bir parçası.": "{0} is now a permanent part of your life.",
  "{0} bir süre daha peşini bırakmayacak.": "{0} won't let go of you for a while yet.",

  // ---- Küçük "gün be gün hayat" olayları (kozmetik) ----
  "Kafana bir saksı düştü, canın acıdı ama ciddi bir şey olmadı.":
    "A flowerpot fell on your head; it hurt, but nothing serious came of it.",
  "Attığın taş geri sekti, şaşkınlıktan yerinde sıçradın.":
    "A stone you threw bounced back; you jumped in surprise.",
  "Sokakta bir köpek havladı, ödün patladı.": "A dog barked in the street and you were startled out of your wits.",
  "Ayağın bir taşa takıldı, bir anlığına dengeni kaybettin.":
    "Your foot caught on a stone and you lost your balance for a moment.",
  "Ani bir yağmura yakalandın, sırılsıklam eve döndün.":
    "You were caught in a sudden rain and came home soaked.",
  "Komşunun horozu seni sabah erkenden uyandırdı, homurdanarak kalktın.":
    "The neighbor's rooster woke you early; you got up grumbling.",
  "Pazarda tanımadığın biri sana gülümsedi, günün biraz güzelleşti.":
    "A stranger smiled at you in the market and your day brightened a little.",
  "Önünü bir kedi kesti, uğursuzluk getirir diye içinden geçirdin.":
    "A cat crossed your path; you thought to yourself it brings bad luck.",
  "Ayakkabının bağı koptu, yolun ortasında eğilip bağlamak zorunda kaldın.":
    "Your shoelace snapped and you had to stop in the middle of the road to tie it.",
  "Uzaktan bir çan sesi duydun, dalıp gittin.": "You heard a bell in the distance and drifted off in thought.",
  "Rüzgar başlığını uçurdu, peşinden koşup yakaladın.":
    "The wind blew off your cap; you ran after it and caught it.",
  "Bir çocuk topunu sana attı, gülerek geri fırlattın.":
    "A child threw their ball to you; laughing, you threw it back.",
  "Akşam ocağın tütmedi, komşudan ateş istemek zorunda kaldın.":
    "In the evening your hearth wouldn't light; you had to ask the neighbor for fire.",
  "Başıboş bir köpek peşine takıldı, birkaç sokak seni izledi.":
    "A stray dog latched onto you and followed you for a few streets.",
  "Elin bir kıymığa takıldı, bir süre canını yaktı.":
    "A splinter caught your hand and stung for a while.",
  "Uzak bir tanıdık elini salladı, sen de karşılık verdin.":
    "A distant acquaintance waved; you waved back.",
  "Beklenmedik bir esinti mumunu söndürdü, karanlıkta el yordamıyla kaldın.":
    "An unexpected draft snuffed your candle; you were left fumbling in the dark.",
  "Bir güvercin tam üstünden geçti, refleksle başını eğdin.":
    "A pigeon passed right over you; you ducked on reflex.",

  // ---- Kriz / dünya olayları ----
  "🌾 Kıtlık kapıya dayandı; ambarlar hızla boşaldı, ekmek fiyatları anında iki katına çıktı.":
    "🌾 Famine came knocking; the granaries emptied fast and bread prices doubled overnight.",
  "🏹 Haydutlar yolları ve pazarları bastı; mallar yağmalandı, gıda fiyatları bir anda fırladı.":
    "🏹 Bandits overran the roads and markets; goods were looted and food prices shot up.",
  "Kıtlık nihayet sona erdi, ambarlar yeniden dolmaya başladı.":
    "The famine finally ended; the granaries began to fill again.",
  "İsyan bastırıldı, sokaklar yavaşça sakinleşti.":
    "The revolt was put down; the streets slowly calmed.",
  "Altın çağ sona erdi, hayat eski normaline döndü.":
    "The golden age ended; life returned to its old normal.",
  "👑 Hükümdar zenginleştiğini fark etti; kraliyet hazinesi için zorla {0} {birim} bağış aldı.":
    "👑 The ruler noticed your growing wealth; he took {0} {birim} as a forced 'donation' for the royal treasury.",
  "⚔️ {0} ile aranızdaki gerginlik büyük bir savaşa dönüştü.":
    "⚔️ The tension between you and {0} has erupted into a great war.",
  "🕊️ {0} ile sürdürülen savaş sona erdi, barış geri döndü.":
    "🕊️ The war with {0} has ended; peace has returned.",
  "Veba seni de bulmuştu.": "The plague found you too.",
  "{0} vebaya yenik düştü": "{0} succumbed to the plague",
  "💔 {0} vebaya yenik düştü.": "💔 {0} succumbed to the plague.",
  "🕊️ Salgın nihayet sona erdi, ama şehir yıllarca izlerini taşıyacak.":
    "🕊️ The plague finally ended, but the city will bear its scars for years.",
  "Ticaret kervanı savaş yüzünden tamamen kayboldu":
    "The trade caravan was lost entirely to the war",
  "🌊 Ticaret kervanı savaş yüzünden tamamen kayboldu":
    "🌊 The trade caravan was lost entirely to the war",

  // ---- Dünya finans etkileri (dunyaFinansEtkileri) ----
  "Kötü ekonomi: maaş −%20": "Poor economy: salary −20%",
  "İyi ekonomi: maaş +%15": "Good economy: salary +15%",
  "Büyük savaş ({0}): maaş −%15 · yemek +%{1} · maaşının %{2}'i savaş vergisi":
    "Great war ({0}): salary −15% · food +{1}% · {2}% of your salary as war tax",
  "Savaş: maaş −%15": "War: salary −15%",
  "Salgın: her yıl ölüm riski · işçi kıtlığı maaş +%{0} · kira −%{1}":
    "Plague: yearly death risk · labor shortage salary +{0}% · rent −{1}%",
  "Salgın izi ({0} yıl): maaş +%{1} · kira −%{2}":
    "Plague aftermath ({0} yrs): salary +{1}% · rent −{2}%",
  "Kıtlık: −1 sağlık/yıl": "Famine: −1 health/yr",
  "İsyan: −3 para & −1 ün/yıl": "Revolt: −3 money & −1 fame/yr",
  "Altın çağ: +4 para & +1 mutluluk/yıl": "Golden age: +4 money & +1 happiness/yr",
  "Gıda fiyat şoku: yemek gideri bu yıl ×2": "Food price shock: living cost ×2 this year",
  "Servetin {0}'ü aştı: hükümdarın gözü üstünde ama ~{1} yıl daha bağış isteyemez (servetinin {2}'si)":
    "Your wealth passed {0}: the ruler has his eye on you, but cannot ask for a donation for ~{1} more years ({2} of your wealth)",
  "Servetin {0}'ü aştı: hükümdar zenginleştiğini fark etti — her yıl ~%{1} ihtimalle servetinin {2}'sini \"bağış\" olarak alabilir":
    "Your wealth passed {0}: the ruler has noticed your growing wealth — each year, with ~{1}% chance, he may take {2} of your wealth as a 'donation'",

  // ---- Maaş kırılımı kalem adları (maasCarpanKalemleri) ----
  "Kıdem": "Seniority",
  "Şehir yönetimi": "City administration",
  "Kalıcı ödüller (köken + olaylar)": "Permanent rewards (origin + events)",
  "İtibarın (mutluluk·şöhret·ahlak)": "Your standing (happiness·fame·morality)",
  "Şöhret": "Fame",
  "Ekonomi iyi": "Economy good",
  "Ekonomi kötü": "Economy poor",
  "Ekonomi normal": "Economy normal",
  "Savaş": "War",
  "Salgın (işçi kıtlığı)": "Plague (labor shortage)",
  "Geçici durumlar": "Temporary conditions",
  "Rütbe primi": "Rank premium",
  "Enflasyon": "Inflation",

  // ---- Şehir yönetimi unvan sonek ----
  "{0} (Seviye {1})": "{0} (Level {1})",

  // ---- Piyasa dedikoduları (yatırım ekranı) ----
  "Sınır boylarında komutanlar asker topluyor... ({0} ile yakında savaş çıkabilir)":
    "Commanders are gathering troops along the frontier... (war with {0} may break out soon)",
  "Tüccarlar {0} sınırından artık mal geçirmek istemiyor, bir şeyler seziyorlar...":
    "Merchants no longer want to move goods across the {0} border; they sense something...",
  "Kalelerde nöbetler sıklaştırıldı; {0} ile gerginliğin büyüdüğü konuşuluyor...":
    "Watches at the forts have been stepped up; there is talk of rising tension with {0}...",
  "Gökler aylardır damla düşürmedi, köylüler endişeli... (Kuraklık/Kıtlık kapıda)":
    "The skies have not dropped a bead in months; the peasants are worried... (Drought/Famine looms)",
  "Ambarlar hızla boşalıyor, ekmek fiyatları günden güne artıyor...":
    "The granaries are emptying fast; bread prices climb by the day...",
  "Meydanlarda öfkeli kalabalıklar toplanıyor, muhafızlar tedirgin...":
    "Angry crowds are gathering in the squares; the guards are uneasy...",
  "Vergilere isyan eden köylülerin silahlandığı söyleniyor...":
    "It is said the peasants revolting against the taxes have taken up arms...",
  "Şehre her gün yeni göçmen kafileleri geliyor... (Nüfus artıyor)":
    "New caravans of migrants arrive in the city every day... (Population rising)",
  "Sokaklar eskisinden çok daha kalabalık, her köşede yeni bir yüz var...":
    "The streets are far more crowded than before; there's a new face on every corner...",
  "Komşu ülkelerle barış antlaşmaları imzalandı, yollar güvenli... (Barış/Bolluk dönemi)":
    "Peace treaties have been signed with neighboring countries; the roads are safe... (Peace/Plenty)",
  "Pazarlar dolup taşıyor, kimsenin bir şikayeti yok; bu huzur ne kadar sürer kim bilir...":
    "The markets are overflowing; no one has a complaint. Who knows how long this calm will last...",
  "Bugünlerde ortalık sakin, herkes kendi işine bakıyor...":
    "Things are quiet these days; everyone minds their own business...",
  "Meydanda konuşulacak pek bir şey yok, sıradan bir gün...":
    "There's little to talk about in the square; an ordinary day...",

  "{0} {birim} kaybettin.": "You lost {0} {birim}.",
  "Cebinden {0} {birim} gitti.": "{0} {birim} left your pocket.",
  "Hükümdar değişti: {0}": "The ruler changed: {0}",
  "Mutluluk": "Happiness",
  "Ahlak": "Morality",

  // ---- Route mesajları (gameEngine) ----
  "{0}'i ekibinden çıkardın; artık yıllık maaşını ödemiyorsun.":
    "You dismissed {0} from your crew; you no longer pay their yearly wage.",
  "{0}'e taşındın.": "You moved into the {0}.",
  "Artık \"{0}\" tarzında yaşıyorsun.": "You now live in the '{0}' style.",
  "{0} satın aldın ({1} {birim}). {2}": "You bought {0} ({1} {birim}). {2}",

  // ---- gameEngine: hayat hikayesi etiketleri ----
  "{0} unvanına ulaştı": "Reached the title of {0}",
  "Büyük kazanç: {0} {birim}": "Big gain: {0} {birim}",
  "Büyük kayıp: {0} {birim}": "Big loss: {0} {birim}",
  "{0} savaşa sürüklendi": "{0} was dragged into war",
  "{0} vebaya yakalandı": "{0} was struck by plague",
  "{0} ile evlendi": "Married {0}",
  "{0} ile yolları ayrıldı": "Parted ways with {0}",
  "{0} doğdu": "{0} was born",
  "{0} kaybedildi": "{0} was lost",
  "{0} ({1}) ekibine katıldı": "{0} ({1}) joined the crew",
  "{0} ekipten ayrıldı": "{0} left the crew",
  "{0} adlı bir {1} edindi": "Got a {1} named {0}",
  "{0} adlı {1}sini kaybetti": "Lost their {1} named {0}",
  "{0} el konuldu": "{0} was confiscated",
  "\"{0}\" ünvanını kazandı": "Earned the title \"{0}\"",
  "Zorunlu bağış: -{0} {birim}": "Forced donation: -{0} {birim}",
  "Zenginlik sızıntısı: -{0} {birim}": "Wealth leak: -{0} {birim}",
  "Veba sona erdi": "The plague ended",
  "{0} rütbesine terfi etti": "Promoted to the rank of {0}",

  // ---- gameEngine: sonuç / zaman anlatımı ek cümleleri ----
  "Bu iş kirliydi; {0} kolluğu artık adını bir listede tutuyor.":
    "This job was dirty; the {0} constabulary now keeps your name on a list.",
  "Kolay para hep bir iz bırakır.": "Easy money always leaves a trace.",
  "Kıtlığın getirdiği yoksunlukla tükendi.": "Wasted away in the deprivation the famine brought.",
  "🌊 Ticaret kervanın savaşın kaosunda kayboldu; yatırımından geriye bir şey kalmadı.":
    "🌊 Your trade caravan was lost in the chaos of war; nothing remained of your investment.",
  "🔧 {0} için {1} {birim} bakım/vergi gideri ödedin.":
    "🔧 You paid {1} {birim} in upkeep/tax for {0}.",
  "🔧 {0} için {1} {birim} bakım gideri ödedin.":
    "🔧 You paid {1} {birim} in upkeep for {0}.",
  "🗑️ {0} çürüdü, atmak zorunda kaldın.": "🗑️ {0} rotted; you had to throw it away.",
  "🗑️ Envanterinden {0} eşya ({1}) çürüdü.": "🗑️ {0} items in your inventory ({1}) rotted.",
  "İçindeki karanlık bedenini de yormaya başladı.": "The darkness within has begun to wear on your body too.",
  "Sağlığındaki bu düşüş moralini de eziyor.": "This decline in your health is crushing your spirits too.",
  "Yaşın ilerledikçe bedenin eskisi kadar dayanmıyor.": "As you age, your body no longer holds up as it once did.",
  "Borç ve yoksulluk içinde tükendi.": "Wasted away in debt and poverty.",
  "🎖️ Artık {0}'sin! Yıllık kazancın: {1} {birim}.": "🎖️ You are now a {0}! Your yearly earnings: {1} {birim}.",

  // ---- gameEngine: yatırım / mağaza / zar / mülk mesajları ----
  "İlk kez cebindeki parayı kendi işine yatırdın.": "For the first time you put money from your pocket into your own business.",
  "İşin yavaş yavaş büyüyor; bu artık bir tesadüf değil, bir yön çiziyor.":
    "Your business is slowly growing; this is no longer a coincidence — it is charting a course.",
  "Artık bölgede kendi alanında tanınan, köklü bir isim oldun.":
    "You have become an established name, known in your field across the region.",
  "Küçük bir işletme değil, adeta küçük bir imparatorluk kuruyorsun artık.":
    "Not a small enterprise — you are practically building a small empire now.",
  "İşin zaten zirvede; yeni bir yatırımın yıllık maaşına ek katkı sağlamaz.":
    "Your business is already at its peak; a new investment adds nothing more to your yearly salary.",
  "Yeterli paran yok ({0} {birim} gerekli).": "You don't have enough money ({0} {birim} required).",
  "Birliğinin ikmaline ve düzenine sermaye ayırdın":
    "You set aside capital for your unit's supply and order",
  "Ticaretine bir tezgah daha kattın": "You added another stall to your trade",
  "Cemaatin arasındaki işlerine daha çok emek verdin":
    "You put more effort into your affairs within the congregation",
  "{0} {1}. Bu, yıllık maaşını kalıcı olarak yaklaşık %5 artırdı ({2} → {3} {birim}). Yatırım kariyerini de biraz ilerletti.":
    "{0} {1}. This permanently raised your yearly salary by about 5% ({2} → {3} {birim}). It also advanced your career a little.",
  "Artık işin zirvede — bundan sonraki yatırımların maaşına daha fazla katkı sağlamaz.":
    "Your business is at its peak now — further investments add nothing more to your salary.",
  "Zar masasında büyük kazandı: +{0} {birim}": "Won big at the dice table: +{0} {birim}",
  "Zar senden yana döndü! {0} {birim} yatırdın, {1} {birim} olarak geri aldın.":
    "The dice turned your way! You staked {0} {birim} and got back {1} {birim}.",
  "Zar seni yüzüstü bıraktı; {0} {birim} masada kaldı.":
    "The dice let you down; {0} {birim} stayed on the table.",
  "Yakın zamanda temel ürün aldın — {0} yıl sonra tekrar alışveriş yapabilirsin.":
    "You recently bought an essential — you can shop again in {0} years.",
  "Yakın zamanda temel ürün aldın; {0} yıl sonra tekrar alışveriş yapabilirsin.":
    "You recently bought an essential; you can shop again in {0} years.",
  "Bu eşyaya zaten sahipsin.": "You already own this item.",
  "{0} satın aldın ({1} {birim}).": "You bought {0} ({1} {birim}).",
  "Şehirdeki itibarın hemen arttı (+{0} şöhret). Artık bu eşyaya sahipsin.":
    "Your standing in the city rose at once (+{0} fame). You now own this item.",
  "Envanterine eklendi — {0} yıl içinde kullanmazsan bozulur. Temel ürün alışverişin {1} yıl kilitlenecek.":
    "Added to your inventory — it spoils if unused within {0} years. Essential shopping will be locked for {1} years.",
  "{0} kullandın{1}.": "You used {0}{1}.",
  "{0} kullandın ama hiç işe yaramadı, boşa gitti.": "You used {0}, but it did nothing — a waste.",
  "{0} ters tepti; biraz fenalaştın ({1} sağlık).": "{0} backfired; you felt worse ({1} health).",
  "sağlık": "health",
  "mutluluk": "happiness",
};
