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
  "Hayat amacı: {0}": "Life goal: {0}",
  "Doğuştan yeteneğin fark edildi: {0}": "Your natural gift was noticed: {0}",
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
  "🗡️ Üzerinde büyük miktarda nakit olduğunu öğrenen {0}, seni pusuya düşürüp {1} {birim} alıp kaçtı.":
    "🗡️ Learning you were carrying a large sum of cash, {0} ambushed you and made off with {1} {birim}.",
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

  // ---- Hapis ceza süresi ----
  "Cezasını tamamlayıp serbest kaldı": "Served the full sentence and was released",
  "⛓️ Cezan doldu; kapılar açıldı ve özgür bir insan olarak dışarı çıktın.":
    "⛓️ Your sentence is up; the gates opened and you walked out a free person.",
  "⛓️ Hücrede bir yıl daha geçti; tahliyene yaklaşık {0} yıl kaldı.":
    "⛓️ Another year passed in the cell; about {0} years left until release.",
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
  "Büyük savaş ({0}): maaş −%15 · yemek +%{1} · savaş vergisi %{2}":
    "Great war ({0}): salary −15% · food +{1}% · war tax {2}%",
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
  "Mesleğe yatkınlığın": "Your aptitude for the trade",
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
  "{0} ile olası bir çatışma yüzünden silah ve zırh fiyatları bir anda tırmandı, demirciler gece gündüz çalışıyor...":
    "Over a possible conflict with {0}, weapon and armor prices have shot up all at once; the blacksmiths are working day and night...",
  "{0} yönünden habercilerin at değiştirmeden dörtnala geçtiği görüldü; kötü haber taşıyor olmalılar...":
    "Messengers have been seen galloping in from the direction of {0} without changing horses; they must be carrying bad news...",
  "Değirmenciler buğday bulamadıklarını, sıranın haftalarca uzadığını söylüyor...":
    "The millers say they can't find wheat, and the queue has grown to weeks...",
  "Duvarlara geceleri hükümdarı hedef alan yazılar karalanıyor...":
    "At night, writings targeting the ruler are being scrawled on the walls...",
  "Yeni mahalleler hızla kuruluyor, arsa fiyatları uçuşa geçti...":
    "New neighborhoods are springing up fast; land prices have taken flight...",
  "Kervanlar art arda sağ salim varıyor, mal bolluğundan fiyatlar düşüyor...":
    "Caravans keep arriving safely one after another; prices are falling from the abundance of goods...",
  "Pazar yerinde her zamanki gevezelik dışında dikkat çeken bir şey yok...":
    "Nothing stands out at the market beyond the usual chatter...",
  "Uzak bir diyarda büyük bir savaş çıkmış diyorlar; buraya sıçrar mı kimse bilmiyor...":
    "They say a great war has broken out in a distant land; whether it spreads here, no one knows...",
  "Komşu vilayette veba görüldüğü fısıldanıyor, ama kimse emin değil...":
    "There are whispers of plague in the neighboring province, but no one is certain...",
  "Dağ köylerinde kıtlık başlamış deniyor; tüccarlar tedirgin, belki abartıyorlar...":
    "Famine is said to have struck the mountain villages; merchants are uneasy — perhaps they exaggerate...",
  "Bir yerlerde köylülerin ayaklandığı söyleniyor — doğrulanmış bir haber değil...":
    "It is said peasants have risen up somewhere — an unconfirmed report...",
  "Hükümdarın hastalandığına dair söylentiler var; saray sessiz kalıyor...":
    "There are rumors the ruler has fallen ill; the palace stays silent...",
  "Limanda garip bayraklı gemiler görüldüğü konuşuluyor, belki sadece tüccardır...":
    "There is talk of ships with strange flags seen at the harbor; perhaps just traders...",
  "Uzaktaki bir şehirde para biriminin değer kaybettiği söyleniyor; buraya yansır mı?":
    "In a far-off city the currency is said to be losing value; will it reach here?",
  "Kuzeyden gelen kervancılar yol kesen çetelerden dem vuruyor, kimi de 'boş laf' diyor...":
    "Caravanners from the north speak of highwaymen; others call it idle talk...",
  "Kasabanın en zengin tüccarının kızı, bir yabancıya kaçmayı planlıyormuş...":
    "The wealthiest merchant's daughter in town is said to be planning to elope with a stranger...",
  "Yeni gelen bir gezgin şifacı, mucize tedaviler vaat ediyor; kimileri şüpheci...":
    "A newly arrived traveling healer promises miracle cures; some are skeptical...",
  "Bir zamanlar itibarlı bir aile, borç yüzünden mülklerini elden çıkarmaya başlamış...":
    "A once-respected family has reportedly started selling off their properties due to debt...",
  "Pazarda tuz fiyatları yine oynadı, herkes bir sonraki gemiyi bekliyor...":
    "Salt prices have shifted again at the market; everyone is waiting for the next ship...",
  "Meyhanede geceleri anlatılan bir hazine söylentisi gitgide büyüyor...":
    "A treasure rumor told at the tavern by night keeps growing bigger...",
  "Şehrin dışındaki değirmende garip ışıklar görüldüğü konuşuluyor...":
    "There is talk of strange lights seen at the mill outside the city...",

  "{0} ile evlendi ({1}, {2})": "Married {0} ({1}, {2})",
  "{0} teklifini kabul etti! Artık evlisin.": "{0} accepted your proposal! You are now married.",
  "{0} teklifini nazikçe geri çevirdi. Belki başka zaman...": "{0} gently turned down your proposal. Maybe another time...",
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
  "👶 Eşin {0} ile aranız iyiydi; bir bebeğiniz oldu: {1}.":
    "👶 You and your spouse {0} were close; you had a baby: {1}.",
  "{0} kaybedildi": "{0} was lost",
  "{0} ({1}) ekibine katıldı": "{0} ({1}) joined the crew",
  "{0} ekipten ayrıldı": "{0} left the crew",
  "{0} adlı bir {1} edindi": "Got a {1} named {0}",
  "{0} adlı evcil hayvanını kaybetti": "Lost their pet {0}",
  "Evcil hayvanı {0} ömrünü doldurup öldü": "Their pet {0} died of old age",
  "💔 {0}, ömrünü doldurup sessizce göçtü; yerini kimse dolduramaz.": "💔 {0} passed away peacefully at the end of a long life; no one can fill the gap.",
  "{0} el konuldu": "{0} was confiscated",
  "\"{0}\" ünvanını kazandı": "Earned the title \"{0}\"",
  "Zorunlu bağış: -{0} {birim}": "Forced donation: -{0} {birim}",
  "Zenginlik sızıntısı: -{0} {birim}": "Wealth leak: -{0} {birim}",
  "Rakip parayı alıp kaçtı: -{0} {birim}": "Rival grabbed the money and fled: -{0} {birim}",
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

  // ---- Sosyalleşme ekranı: tur harcamayan aksiyonlar ----
  "Yasak ama... bir kadeh. Ahlakın ve itibarın çentik yer.":
    "Forbidden, but... just one cup. It nicks your morality and your standing.",
  "Keyiflenirsin ama ertesi gün ağır olur.": "You'll enjoy it, but the morning after is rough.",
  "Hafif bir keyif, zararsız.": "A mild, harmless pleasure.",
  "Bu yıl bir şey içtin.": "You've had a drink this year.",
  "Yeterli paran yok.": "You don't have enough money.",
  "Yakında tekrar yapabilirsin ({0} yıl).": "You can do this again soon ({0} yr).",
  "Bunun için alkollü bir mekân gerek.": "This needs a venue that serves drink.",
  "{0} devirdin. Keyiflendin ama yarın seni bekliyor.":
    "You downed {0}. You're merry now, but tomorrow is waiting.",
  "Meydan artık seni 'ayyaş' diye anıyor.": "The square now calls you a drunkard.",
  "{0} içtin. Hafif, tatlı bir mola.": "You had {0}. A light, sweet little break.",
  "Gören olmadı sandın ama fısıltı çabuk yayılır.":
    "You thought no one saw — but whispers travel fast.",
  "Deli anlamsız sözler arasında sıradaki işini tarif eder gibi bir şeyler saydı. Tüylerin ürperdi ama kulağın açıldı.":
    "Amid nonsense, the fool rattled off something that sounded like your next task. It chilled you — but sharpened your ear.",
  "Delinin taklitleri meydanı kırıp geçirdi; karnın ağrıyana kadar güldün.":
    "The fool's impressions brought down the square; you laughed until your stomach hurt.",
  "Deli gözlerini kısıp kulağına bir isim ve bir yıl fısıldadı. Gece boyu uyuyamadın.":
    "The fool narrowed his eyes and whispered a name and a year in your ear. You didn't sleep all night.",
  "Deliye avuç dolusu bozukluk verdin; 'ne cömert adam' diye fısıldandı meydan.":
    "You gave the fool a fistful of coppers; 'what a generous man,' the square murmured.",
  "Deli bir an durulup gayet aklı başında bir öğüt verdi. İçin tuhaf bir şekilde ısındı.":
    "For a moment the fool went still and gave a perfectly sane piece of advice. Something in you warmed, strangely.",
  "Deli bir süre peşinden yürüdü, uydurma bir marş söyledi, sonra kayboldu.":
    "The fool trailed you a while, sang a made-up anthem, then vanished.",
  "Kesenden {0} {birim} çıkarıp dağıttın; içindeki düğüm biraz çözüldü.":
    "You took {0} {birim} from your purse and gave it away; the knot inside you loosened a little.",
  "Yan masada bir görevli sıradaki seferden dem vurdu — kulağın açık, bir sonraki işi daha net göreceksin.":
    "An official at the next table went on about the coming campaign — your ear is open; you'll see the next task more clearly.",
  "Kulak misafiri olduğun dedikodu senin hakkındaydı ve hiç hoş değildi.":
    "The gossip you overheard was about you, and it wasn't kind.",
  "Çarşı her zamanki gibi kaynıyor: kim kiminle küs, hangi tüccar batmış, kimin oğlu askere yazılmış...":
    "The market churns as ever: who's fallen out with whom, which merchant went under, whose son signed up...",
  "Bütün masaya bir tur ısmarladın; kadehler senin şerefine kalktı, birkaç yeni yüz sana dost oldu.":
    "You stood the whole table a round; the cups rose in your name and a few new faces became friends.",
  "Falcı avucundaki çizgileri izledi: 'Uzun bir yol, ortasında beklenmedik bir kısmet' dedi.":
    "The fortune teller traced the lines of your palm: 'A long road, and an unexpected fortune halfway along,' she said.",
  "Fincanın dibinde bir kuş görmüş: 'Haber gelecek' dedi, o kadar.":
    "She saw a bird at the bottom of the cup: 'News is coming,' she said, and no more.",
  "'Yakında yüzün gülecek' dedi falcı ve nedense buna bütün kalbinle inandın.":
    "'You'll be smiling soon,' said the fortune teller, and for some reason you believed it with all your heart.",
  "Falcının yüzü asıldı, fincanı hızla ters kapattı. 'Bu ay temkinli ol' demekle yetindi.":
    "The fortune teller's face fell; she flipped the cup over quickly. 'Be careful this month,' was all she offered.",
  "Falcı ürkütücü bir kesinlikle sıradaki işini tarif etti. Ensende bir ürperti.":
    "With unnerving precision the fortune teller described your next task. A shiver down your neck.",

  // ---- Aile ekranı: etkileşimler + talep (§33) ----
  "{0} istediği şeyi alamamana alındı; aranıza bir soğukluk girdi.":
    "{0} took it badly that you wouldn't get what they wanted; a coldness came between you.",
  "{0} senden bir şey rica etti — Aile ekranından yanıtlayabilirsin.":
    "{0} has asked you for something — you can answer from the Family screen.",
  "{0} için bir hediye aldın; yüzü güldü.": "You bought {0} a gift; their face lit up.",
  "{0} ile baş başa vakit geçirdin; ikiniz de dinlendiniz.":
    "You spent time alone with {0}; you both felt rested.",
  "{0}'e sarılıp sevgini gösterdin; aranız yumuşadı.":
    "You held {0} and showed your love; things softened between you.",
  "{0} ile bir geziye çıktınız; uzun zamandır bu kadar iyi anlaşmamıştınız.":
    "You went on an outing with {0}; you hadn't gotten along this well in a long time.",
  "{0} ile oyun oynadın; kahkahası eve doldu.":
    "You played with {0}; their laughter filled the house.",
  "{0} için bir hediye aldın; sevincinden zıpladı.":
    "You bought {0} a gift; they jumped for joy.",
  "{0}'in eğitimi için para ayırdın; sana minnettar.":
    "You set aside money for {0}'s education; they're grateful to you.",
  "Tüm aileyle birlikte bir gün geçirdiniz; herkesin yüzü gülüyor.":
    "You spent a day together with the whole family; everyone is smiling.",
  "{0} ile vakit geçirdin.": "You spent time with {0}.",
  "Ama bugün pek keyifli değildi; etkisi az oldu.":
    "But it wasn't very cheerful today; the effect was small.",
  "{0} istediğini aldı; çok mutlu oldu.": "{0} got what they wanted; they were overjoyed.",
  "{0}'e hayır dedin; aranıza bir kırgınlık girdi.":
    "You said no to {0}; a resentment came between you.",
  // Talep kalemleri (eş)
  "yeni bir elbise": "a new dress",
  "gümüş bir ayna": "a silver mirror",
  "bir mücevher": "a piece of jewelry",
  "ipek bir şal": "a silk shawl",
  "güzel bir at": "a fine horse",
  "yeni bir yatak takımı": "a new bed set",
  "bir hizmetçi tutulması": "hiring a servant",
  "annesine bir hediye": "a gift for their mother",
  // Talep kalemleri (çocuk)
  "yeni bir oyuncak": "a new toy",
  "bir çift sağlam ayakkabı": "a sturdy pair of shoes",
  "kitaplar": "books",
  "bir müzik aleti": "a musical instrument",
  "bir tay": "a colt",
  "arkadaşlarıyla bir gezi": "an outing with friends",
  "yeni giysiler": "new clothes",
  "bir usta çıraklığı ücreti": "an apprenticeship fee",

  // ---------------------------------------------------------------------------
  // 2026-10 test turu: yeni özelliklerin İngilizcesi eksik kalan motor metinleri
  // ---------------------------------------------------------------------------
  "Bir An Duraksadın": "You Pause for a Moment",
  // Seçenek kilit nedenleri (olaySecici.kilitNedeni)
  "Yeterli paran yok ({0} {1} gerekli)": "You don't have enough money ({0} {1} required)",
  "Şöhretin yetersiz (en az {0} şöhret gerekli)": "Not famous enough (at least {0} fame required)",
  "Böyle bir teklif için kimse sana güvenmiyor": "Nobody trusts you with an offer like this",
  "Vicdanın buna izin vermiyor": "Your conscience won't allow it",
  "Bunun için gerekli bağlantılara sahip değilsin": "You don't have the connections for this",
  "Artık bunu yapamıyorsun": "You can no longer do this",
  "Bu iş için yeterince yetenekli değilsin": "You aren't skilled enough for this",
  "Bu, senin gibi yetenekli biri için fazla basit/riskli görünüyor": "This looks too simple/risky for someone as skilled as you",
  "Borçlusun, cebinden para çıkacak bir işe giremezsin": "You're in debt; you can't take on something that costs money",
  // Kariyer: yönetimle bağlar (§35)
  "{0} sürekli kapısını çalmandan bıktı; bu kez ters tepti.": "{0} is fed up with you knocking all the time; this time it backfired.",
  "{0} yağcılığını fark etti; güveni sarsıldı.": "{0} saw through your flattery; their trust was shaken.",
  "{0} bağışını memnuniyetle aldı.": "{0} gladly accepted your donation.",
  "{0}'e yağ çektin; hoşuna gitti ama içine sinmedi.": "You flattered {0}; it pleased them, but it didn't sit right with you.",
  "{0} için bir iş gördün; seni not etti.": "You did a job for {0}; they took note of you.",
  "Ama beklediğin kadar etkili olmadı.": "But it wasn't as effective as you hoped.",
  "{0} isteğini yerine getirdi.": "{0} granted your request.",
  "{0} bu sefer isteğini geri çevirdi.": "{0} turned down your request this time.",
  "{0}'in talebini yerine getirdin; aranız pekişti.": "You met {0}'s demand; your bond grew stronger.",
  "Hükümdarın talebini reddedip kaçtın; muhafızlar peşine düştü, artık aranıyorsun.": "You refused the ruler's demand and fled; the guards are after you — you're now wanted.",
  "{0}'in talebini geri çevirdin; aranız soğudu.": "You turned down {0}'s demand; things cooled between you.",
  "{0} yalanını yakaladı; hem parayı verdin hem itibarını.": "{0} caught your lie; you lost both the money and your reputation.",
  "\"Elim darda\" dedin; {0} homurdanarak kabul etti.": "You said \"I'm short on money\"; {0} grudgingly accepted.",
  "{0}'in talebini görmezden geldin; aranız açıldı.": "You ignored {0}'s demand; a rift opened between you.",
  "{0} senden bir şey bekliyor — Kariyer ekranından yanıtlayabilirsin.": "{0} expects something from you — you can respond on the Career screen.",
  // Talep kalemleri (yönetici / patron)
  "saray onarımı için bağış": "a donation for palace repairs",
  "ordu masrafları için katkı": "a contribution to army expenses",
  "şehir surlarının tamiri için pay": "a share for repairing the city walls",
  "hükümdarın düğün masrafına katkı": "a contribution to the ruler's wedding costs",
  "vergi açığını kapatmak için bağış": "a donation to cover the tax shortfall",
  "meclis önünde bağlılık yemini": "an oath of allegiance before the council",
  "hükümdarın seferine destek sözü": "a pledge to support the ruler's campaign",
  "muhaliflerden uzak durma taahhüdü": "a promise to keep away from the opposition",
  "ortak sandığa katkı": "a contribution to the common chest",
  "patronunun borcunu kapatmak için pay": "a share to pay off your patron's debt",
  "ortak yatırım için sermaye": "capital for a joint investment",
  "patronun kızının çeyizine katkı": "a contribution to your patron's daughter's dowry",
  "zor geçen bir yılın açığını kapatmak için bağış": "a donation to cover a hard year's shortfall",
  "patronuna bağlılık yemini": "an oath of loyalty to your patron",
  "rakiplerle iş yapmama sözü": "a promise not to deal with rivals",
  "patronun adamlarını kollama taahhüdü": "a promise to look out for your patron's men",
  // Eski kayıtlarda kalmış olabilecek önceki kalemler
  "lonca sandığına katkı": "a contribution to the guild chest",
  "atölye borcunun kapatılması için pay": "a share to pay off the workshop's debt",
  "grev tazminatı için bağış": "a donation for strike compensation",
  "loncaya bağlılık yemini": "an oath of loyalty to the guild",
  "rakip loncayla iş yapmama sözü": "a promise not to deal with the rival guild",
  // Karanlık işler + rakipler (§34.2)
  "{0}: işini gördün.": "{0}: you got it done.",
  "{0}: işler ters gitti.": "{0}: things went wrong.",
  "Ama tuttuğun adam konuştu; iş sana kadar izlendi.": "But the man you hired talked; it was traced back to you.",
  "Karanlık bir iş sırasında enselendi": "Was caught in the middle of a shady job",
  "Enselendin — kodesi boyladın.": "You got caught — off to the cells.",
  "Çevirdiği karanlık bir iş sırasında öldü.": "Died in the middle of a shady job.",
  "Kazanç: +{0} {birim}": "Gain: +{0} {birim}",
  "{0} rekabeti tamamen bırakmak zorunda kaldı": "{0} was forced out of the rivalry for good",
  "♟️ {0}'ın gücünü kırdın; artık senin karşında bir rakip değil. Pazar payı sana geçti (+{1} {birim}).": "♟️ You broke {0}'s power; they're no longer a rival. Their market share is yours (+{1} {birim}).",
  "♟️ {0} sarsıldı; pazarın bir kısmı sana geçti (+{1} {birim}). Ama bunu unutmayacak.": "♟️ {0} was shaken; part of the market passed to you (+{1} {birim}). But they won't forget it.",
  "🎯 {0} adamlarını gönderdi; deponu basıp {1} {birim} zarar verdiler.": "🎯 {0} sent their men; they raided your storehouse and did {1} {birim} of damage.",
  "🎯 {0} hakkında çirkin dedikodular yaydı; itibarın zedelendi.": "🎯 {0} spread ugly rumors about you; your reputation suffered.",
  "🎯 {0}'ın tuttuğu kabadayılar seni bir ara sokakta sıkıştırdı.": "🎯 Thugs hired by {0} cornered you in a back alley.",
  "{0} misilleme yaptı": "{0} retaliated",
  // Piyasa sinyali (§34.6)
  "Getiri şu an zirvede — bu koşullar geçince düşer. Elindekini tut, yeni almak için acele etme.": "Returns are at a peak right now — they'll fall once conditions pass. Hold what you have; don't rush to buy.",
  "Getiri şu an dipte; koşullar düzelince toparlanır. Ucuza girmek için iyi bir zaman olabilir.": "Returns are at a low right now; they'll recover when conditions improve. It may be a good time to buy cheap.",
  "Piyasa durgun — acele bir karar gerektirmiyor.": "The market is flat — no need for a hasty decision.",
  // Mini oyunlar
  "Zar masasında kazandı: +{0} {birim}": "Won at the dice table: +{0} {birim}",
  "Çift attın! ({0}-{1}) Masayı süpürdün: {2} {birim}.": "Doubles! ({0}-{1}) You swept the table: {2} {birim}.",
  "{0}'e {1} — zar senden yana. {2} {birim} aldın.": "{1} against {0} — the dice favor you. You took {2} {birim}.",
  "{0}'e {1} — zar rakipten yana. {2} {birim} masada kaldı.": "{0} against {1} — the dice favor your opponent. {2} {birim} stayed on the table.",
  "Zar masasında bıçaklı bir kavgaya karıştı": "Got into a knife fight at the dice table",
  "Sonra masa karıştı — biri bıçak çekti; sıyrık ve morlukla zar zor kaçtın.": "Then the table erupted — someone pulled a knife; you barely got away with scrapes and bruises.",
  "Zar masasındaki bıçaklı bir kavgada öldü.": "Died in a knife fight at the dice table.",
  "Üç kağıtçıyı bir kez olsun yendi: +{0} {birim}": "Beat the shell-game hustler for once: +{0} {birim}",
  "Doğru bardağı buldun! {0} {birim} kazandın.": "You found the right cup! You won {0} {birim}.",
  "Para o bardağın altında değildi; {0} {birim} gitti. (Zaten hiç olmadı.)": "The coin wasn't under that cup; {0} {birim} gone. (It never was.)",
  "Kolun hâlâ ağrıyor; {0} yıl sonra yeniden bilek güreşebilirsin.": "Your arm still aches; you can arm-wrestle again in {0} year(s).",
  "Bir bilek güreşini kazandı": "Won an arm-wrestling match",
  "Rakibin bileğini masaya yapıştırdın! Meydanın gözü sende — ün ve {0} {birim}.": "You slammed your opponent's wrist to the table! All eyes on you — fame and {0} {birim}.",
  "Bileğin bükülene kadar direndin ama masaya sen yapıştın. Herkes güldü.": "You held on until your wrist bent, but it was yours that hit the table. Everyone laughed.",
  // Sosyalleşme aksiyonları
  "Anlattığın hikaye ağızdan ağıza dolaştı; birkaç gün senden bahsedildi.": "Your story spread from mouth to mouth; people talked about you for days.",
  "Hikayeni sabırla dinlediler, kibarca gülümsediler. Fena değildi.": "They listened patiently and smiled politely. Not bad.",
  "Hikayeni beğenmediler, arkandan kıkırdadılar.": "They didn't like your story and giggled behind your back.",
  "Gezgin ozanın türküsü içini ısıttı; bir an her şeyi unuttun.": "The wandering bard's song warmed your heart; for a moment you forgot everything.",
  "Yerli biri sana açık konuştu, kafanda bölgenin tam bir haritasını çizdi.": "A local spoke frankly and drew you a complete map of the region in your head.",
  "Bölge hakkında sıradan, malum şeyler anlattı.": "They told you ordinary, well-known things about the region.",
  "Seni yanlış yönlendirdi — bir süre boşuna dolaştın, sinirin bozuldu.": "They led you astray — you wandered around for nothing and lost your temper.",
  "Bahsi kazandın! Kalabalık seninle birlikte bağırdı, kesen ağırlaştı.": "You won the bet! The crowd roared with you and your purse got heavier.",
  "Bahsi kaybettin; parana yazık oldu ama en azından dövüş/koşu heyecanlıydı.": "You lost the bet; a waste of money, but at least the fight/race was exciting.",
  // Hediye (§34.3)
  "{0}'e {1} hediye ettin; çok mutlu oldu (+{2} ilişki).": "You gave {0} a {1}; they were delighted (+{2} relationship).",
  "{0}'e {1} hediye ettin (+{2} ilişki).": "You gave {0} a {1} (+{2} relationship).",
  "{0}'e {1} hediye ettin; sadakati arttı (+{2}).": "You gave {0} a {1}; their loyalty grew (+{2}).",
  "{0}'e {1} hediye ettin (+{2} dostluk).": "You gave {0} a {1} (+{2} friendship).",
  // Salgın / veba hastalığı (§27, §34.4)
  "Salgına karşı hazırlık yaptın (kademe {0}). Bir sonraki dalgada işine yarayacak.": "You prepared for the plague (tier {0}). It will help in the next wave.",
  "Vebaya yakalandı": "Caught the plague",
  "🦠 Veba sana da bulaştı — hastalandın. Hayatta kalman bundan sonraki seçimlerine bağlı.": "🦠 The plague caught up with you — you're sick. Whether you survive depends on your next choices.",
  "Veba direncini kırdı; ateşler içinde son nefesini verdin.": "The plague broke your resistance; you breathed your last in a fever.",
  "Vebayı atlattı": "Survived the plague",
  "🌿 Ateşin düştü, gücün yavaş yavaş geri geliyor — vebayı atlattın.": "🌿 Your fever broke and your strength is slowly returning — you survived the plague.",
  "🤒 Hastalık sürüyor; şu an hayatta kalma şansın kabaca %{0}.": "🤒 The illness lingers; your chance of survival right now is roughly {0}%.",
  // Tefeci (§34.5)
  "Tefeciden {0} {birim} borç aldı": "Borrowed {0} {birim} from the moneylender",
  "Tefeci kesesini açtı: +{0} {birim}. Faiz %{1}, {2} yıl vade, yıllık taksit ~{3}.": "The moneylender opened his purse: +{0} {birim}. Interest {1}%, {2}-year term, yearly instalment ~{3}.",
  "Tefeci böyle bir teklif sunmuyor.": "The moneylender is not offering that deal.",
  "Tefeci homurdandı ama faizi %{0}'e indirdi.": "The moneylender grumbled but lowered the interest to {0}%.",
  "Pazarlık ters tepti; tefeci faizi %{0}'e çıkardı.": "The haggling backfired; the moneylender raised the interest to {0}%.",
  "🪙 Tefeci taksitini alamadı; 'bir daha kaçırma' diye tehdit etti.": "🪙 The moneylender didn't get his instalment and warned you: 'don't miss another'.",
  "🪙 Tefecinin adamları borcun karşılığında {0} el koydu.": "🪙 The moneylender's men seized your {0} to settle the debt.",
  "Tefeci borç için {0} el koydu": "The moneylender seized {0} for the debt",
  "🪙 Tefeci borcun için elinde ne varsa aldı; itibarın da yerlerde.": "🪙 The moneylender took everything you had for the debt; your reputation is in the dirt too.",
  "Tefeci borç için servetine el koydu": "The moneylender seized your wealth for the debt",
  "🪙 Tefecinin borcunu tamamen kapattın; defterden adın silindi.": "🪙 You paid off the moneylender in full; your name has been struck from his ledger.",
  "Tefeci borcu bitti": "Paid off the moneylender",
  // Açılış anlatısı (yeni yerleşim cümlesi)
  "Ailen {0} topraklarında küçük bir kasabaya yerleşmiş; sen de hayata orada gözlerini açtın.": "Your family settled in a small town in the lands of {0}; that is where you first opened your eyes.",
  // Sık görülen hata mesajları (hataCevir birebir eşleşme)
  "Oyun zaten bitmiş.": "The game is already over.",
  "Oyun oturumu bulunamadı.": "Game session not found.",
  "Önce bir senaryo üretilmeli.": "There is no event to answer right now.",
  "Geçersiz seçenek index'i.": "Invalid choice.",
  "Bu seçenek şu an seçilemez.": "This choice isn't available right now.",
  "Meslek zaten seçildi.": "You have already chosen a profession.",
  "Bu mülke zaten sahipsin.": "You already own this property.",
  "Envanterinde böyle bir eşya yok.": "There's no such item in your inventory.",
  "Bu eşya kullanılamaz, sadece envanterinde sergilenir.": "This item can't be used; it is only displayed in your inventory.",
  "Bu eşya senin çağında satılmıyor.": "This item isn't sold in your era.",
  "Bunu karşılayacak paran yok.": "You can't afford this.",
  "Bu bağışı karşılayacak paran yok.": "You can't afford this donation.",
  "Adam tutacak paran yok.": "You can't afford to hire someone.",
  "Bunu bu kadar sık yapamazsın; biraz zaman geçmeli.": "You can't do this so often; some time needs to pass.",
  "Bunu yakında tekrar yapamazsın.": "You can't do this again so soon.",
  "Bu yıl zaten bir şey içtin.": "You've already had a drink this year.",
  "Bu aksiyon şu an mevcut değil.": "This action isn't available right now.",
  "Bu mekâna bu yıl zaten gittin; biraz zaman geçmeli.": "You've already been to this place this year; some time needs to pass.",
  "Bu mekân şu an sana uygun değil.": "This place isn't available to you right now.",
  "Bu mekân için şu an uygun bir olay yok.": "There's nothing happening at this place right now.",
  "Ortada çözülecek bir mekân olayı yok.": "There's no event at this place to resolve.",
  "Hapisteyken sosyalleşemezsin.": "You can't socialize while in prison.",
  "Yolculuktayken bu mekâna gidemezsin.": "You can't go to this place while traveling.",
  "Yolculuktayken bunu yapamazsın.": "You can't do this while traveling.",
  "Şu an bilek güreşi yapamazsın.": "You can't arm-wrestle right now.",
  "Geçersiz bahis tutarı.": "Invalid bet amount.",
  "Hapisteyken bu işi çeviremezsin.": "You can't pull this off while in prison.",
  "Yolculuktayken bu işi çeviremezsin.": "You can't pull this off while traveling.",
  "Önce bir meslek seçmelisin.": "You need to choose a profession first.",
  "Bekleyen bir talep yok.": "There is no pending demand.",
  "Hükümdara yalan söyleyemezsin — sadece öde ya da kaç.": "You can't lie to the ruler — pay or flee.",
  "Bunu istemek için ilişkin yeterince güçlü değil.": "Your relationship isn't strong enough to ask for this.",
  "Aynı iyiliği bu kadar sık isteyemezsin.": "You can't ask for the same favor so often.",
  "Bu istekte rüşvet işe yaramaz.": "A bribe is no use for this request.",
  "Şu an bu isteğin bir anlamı yok.": "This request makes no sense right now.",
  "Hapisteyken istekte bulunamazsın.": "You can't make requests while in prison.",
  "Yolculuktayken istekte bulunamazsın.": "You can't make requests while traveling.",
  "Hapisteyken bununla ilgilenemezsin.": "You can't deal with this while in prison.",
  "Yolculuktayken bununla ilgilenemezsin.": "You can't deal with this while traveling.",
  "Geçerli bir bağış tutarı seç.": "Choose a valid donation amount.",
  "Hapisteyken ailenle ilgilenemezsin.": "You can't tend to your family while in prison.",
  "Yolculuktayken ailenle ilgilenemezsin.": "You can't tend to your family while traveling.",
  "Bunun için bir eşin olmalı.": "You need a spouse for this.",
  "Geçerli bir çocuk seçmelisin.": "You need to choose a valid child.",
  "Ailen yok.": "You have no family.",
  "Evlenmek için henüz çok gençsin.": "You're still too young to marry.",
  "Zaten evlisin.": "You're already married.",
  "Hapisteyken evlenemezsin.": "You can't marry while in prison.",
  "Yolculuktayken evlenemezsin.": "You can't marry while traveling.",
  "Geçersiz evlilik adayı.": "Invalid marriage candidate.",
  "Zaten ödenmemiş bir kredin var.": "You already have an unpaid loan.",
  "Ortada bir kredi yok.": "You don't have a loan.",
  "Bu kredi için zaten pazarlık ettin.": "You've already haggled over this loan.",
  "Zaten bu konutta yaşıyorsun.": "You already live in this home.",
  "Zaten bu şekilde yaşıyorsun.": "You already live this way.",
  "Evli değilsin.": "You're not married.",
  "Yaşayan çocuğun yok.": "You have no living children.",
  "Ekibinde kimse yok.": "There's no one in your team.",
  "Ekip üyesi bulunamadı.": "Team member not found.",
  "Böyle bir ekip üyesi yok.": "There's no such team member.",
  "Bu oyun için skor zaten kaydedildi.": "The score for this game has already been saved.",
  "Oyun henüz bitmedi.": "The game isn't over yet.",
  "Salgın çoktan başladı; artık hazırlık yapamazsın.": "The plague has already begun; it's too late to prepare.",
  "Bu korunma kademesine zaten sahipsin.": "You already have this level of protection.",

  // Ölüm nedenleri (önceden çevrilmeden saklanıyordu)
  "İleri yaşın getirdiği yorgunlukla huzur içinde vefat etti.": "Passed away peacefully, worn out by old age.",
  "Uzun süredir çöken ruh hali bedenini de tüketti.": "A spirit long in collapse finally wore the body down too.",
  "Veba direncini kırdı; hastalıktan kurtulamadın.": "The plague broke your resistance; you did not survive the illness.",
  // Meslek pazarı (2026-10)
  "Pazar payın": "Your market share",
  "Pazara yeni bir rakip girdi: {0}": "A new rival entered the market: {0}",
  "♟️ Boşluğu fark eden {0} pazara girdi; artık yeni rakibin o.": "♟️ Seeing the gap, {0} entered the market; they are your new rival now.",
  // Mesleğe özel karanlık işler (2026-10)
  "Ambarları sen boşalttın; şehirde kıtlık başladı.": "You emptied the granaries; famine has struck the city.",
  "Sokaklar karıştı; şehirde isyan çıktı.": "The streets boiled over; a revolt broke out in the city.",
  // Ajanlar (2026-10)
  "🕵️ {0} işi üstlendi: {1}. Sonucunu yıl dönerken öğreneceksin.": "🕵️ {0} took on the job: {1}. You'll learn how it went as the year turns.",
  "🕵️ {0} işini gördü: {1}.": "🕵️ {0} got it done: {1}.",
  "Ama meyhanede ağzından kaçırmış; adın fısıltılara karıştı.": "But they let it slip at the tavern; your name is in the whispers now.",
  "🕵️ {0} işi beceremedi: {1}.": "🕵️ {0} botched the job: {1}.",
  "Geri dönmedi; cesedini sabah buldular.": "They never came back; the body was found in the morning.",
  "{0} bir işte öldü": "{0} died on a job",
  "Muhafızlar onu yakaladı.": "The guards caught them.",
  "{0} yakalandı": "{0} was caught",
  "Sorguda seni ele verdi.": "Under questioning, they gave you up.",
  "Adamının ihbarıyla tutuklandı": "Arrested after their hired hand talked",
  "Kapına dayandılar — kodesi boyladın.": "They came to your door — you landed in a cell.",
  "Ağzını açmadı; adın karışmadı.": "They kept their mouth shut; your name stayed clean.",
  "Kılpayı kaçıp geri döndü.": "They slipped away by a hair and came back.",
  "{0} ({1}) tutuldu": "{0} ({1}) hired",
  "{0} artık senin için çalışıyor ({1}). Peşin {2} {birim} ödedin; maaşı her yıl giderinden düşecek.": "{0} now works for you ({1}). You paid {2} {birim} up front; their wage comes out of your expenses each year.",
  "Bu işi kimseye yaptıramazsın; kendin çevirmelisin.": "You can't hand this job off; you have to do it yourself.",
  "Hapisteyken adam tutamazsın.": "You can't hire anyone while in prison.",
  "Geçersiz rol.": "Invalid role.",
  // Faz A: dünya dönemleri
  "Bolluk": "Prosperity",
  "Durgunluk": "Stagnation",
  "Kıtlık": "Famine",
  "Dönem": "Period",
  "🌾 Bolluk yılları başladı: ambarlar dolu, pazarlar canlı, lüks mallara talep arttı.": "🌾 Years of plenty have begun: granaries are full, markets are lively, and demand for luxuries is up.",
  "📉 Durgunluk çöktü: pazarlar sessiz, kese ağızları sıkı bağlı.": "📉 Stagnation has set in: the markets are quiet and purse strings are tight.",
  "🥀 Kıtlık başladı: ekmek pahalandı, ambarlar boşalıyor.": "🥀 Famine has begun: bread is dear and the granaries are emptying.",
  "maaş {0}": "pay {0}",
  "yaşam gideri {0}": "living costs {0}",
  "−1 sağlık/yıl": "−1 health/year",
  "{0} (~{1} yıl): {2}": "{0} (~{1} yrs): {2}",
  "Büyük savaş ({0}): maaş {1} · yemek {2} · savaş vergisi %{3}": "Great war ({0}): pay {1} · food {2} · war tax {3}%",
  "Savaş: maaş {0}": "War: pay {0}",
  "Salgın: her yıl hastalık riski · işçi kıtlığı maaş {0}": "Plague: yearly risk of infection · labour shortage pay {0}",
  "🕊️ Salgın nihayet sona erdi.": "🕊️ The plague has finally ended.",
  "Limandan gelen gemilerde hastalık olduğu fısıldanıyor; bazı tüccarlar şimdiden şehri terk ediyor...": "Whispers say the ships from the harbour carry sickness; some merchants are already leaving the city...",
  "Komşu kasabalarda ateşli bir hastalığın yayıldığı konuşuluyor, hekimler endişeli...": "Talk is that a fever is spreading through the neighbouring towns; the physicians are worried...",
  "Fareler sokaklarda alışılmadık kadar çoğaldı; yaşlılar kötü günlerin geldiğini söylüyor...": "The rats have grown unusually many in the streets; the old folk say bad days are coming...",
  "Tarlalar bu yıl göz alabildiğine yeşil; yakında bereketli yıllar geleceği konuşuluyor...": "The fields are green as far as the eye can see; people say fruitful years are coming...",
  "Tüccarlar uzak pazarların yeniden canlandığını söylüyor; lüks mallara talep artacak gibi...": "Merchants say distant markets are reviving; demand for luxuries looks set to rise...",
  "Pazarlar giderek sessizleşiyor; bazı dükkânların kepenk indireceği konuşuluyor...": "The markets are growing quieter; some shops are said to be about to close their shutters...",
  "Sarraflar keselerin sıkılaştığını, yakında alışverişin durgunlaşacağını söylüyor...": "The moneychangers say purses are tightening and trade will soon slow...",
  "Gökler aylardır damla düşürmedi; köylüler bu hasadın kötü geçeceğinden korkuyor...": "Not a drop has fallen from the sky in months; the peasants fear a poor harvest...",
  "Ambarcılar tahıl saklamaya başladı; yakında ekmeğin pahalanacağı konuşuluyor...": "The granary keepers have started hoarding grain; people say bread will soon be dear...",
  "{0} yatırımını {1}. kademeye çıkardı": "{0} investment upgraded to tier {1}",
  "{0} {1}. kademeye çıktı ({2} {3} ödedin).": "{0} reached tier {1} (you paid {2} {3}).",
  "{0} ({1}) işe alındı": "{0} ({1}) was hired",
  "{0} artık senin için çalışıyor. Peşin {1} {2} ödedin; maaşı her yıl giderinden düşecek.": "{0} now works for you. You paid {1} {2} up front; their wage will come out of your expenses every year.",
  "Bu mesleğin henüz bir işletmesi yok.": "This profession has no business to run yet.",
  "Böyle bir ürün hattı yok.": "There is no such product line.",
  "Bu hattı açmak için rütben yetersiz.": "Your rank is too low to open this line.",
  "Geçersiz fiyat politikası.": "Invalid price policy.",
  "Geçersiz sipariş miktarı.": "Invalid order amount.",
  "Bu kadar hattı aynı anda işletemezsin; daha fazla çalışan gerek.": "You can't run this many lines at once; you need more staff.",
  "Böyle bir yatırım yok.": "There is no such investment.",
  "Bu yatırım zaten en üst kademede.": "This investment is already at its top tier.",
  "Daha fazla çalışan tutamazsın.": "You can't employ any more staff.",
  "Geçersiz yatırım.": "Invalid investment.",
  "Geçersiz aday.": "Invalid candidate.",
  "Pazar payın büyüdü.": "Your market share grew.",
  "{0} artık senin için çalışıyor; maaşı her yıl giderinden düşecek.": "{0} now works for you; their wage will come out of your expenses every year.",
  "Geçersiz stok hedefi.": "Invalid stock target.",
  "Daha fazla çalışan tutamazsın; rütben yükselince limit artar.": "You can't employ any more staff; the limit grows as your rank rises.",
  "şehir surlarının onarımı için katkı": "a contribution to repair the city walls",
  "pazar yerinin yenilenmesi için pay": "a share for renovating the marketplace",
  "şehir yönetiminin vergi açığı için bağış": "a donation to cover the city's tax shortfall",
  "şenlik ve ziyafet masrafına katkı": "a contribution to the cost of festivities and a banquet",
  "şehir meclisinde destek sözü": "a pledge of support in the city council",
  "rakip tüccarlarla iş yapmama taahhüdü": "a promise not to do business with rival merchants",
  "şehre sadakat yemini": "an oath of loyalty to the city",
  // Gösterge detay penceresi (gostergeDetay.ts)
  "{0}: {1}/yıl":
    "{0}: {1}/yr",
  "Yaşlanma: {0}/yıl":
    "Aging: {0}/yr",
  "Ev ve yemek düzenin: {0}/yıl":
    "Your home and diet: {0}/yr",
  "Sağlık {0} üstündeyken bu iyileşme çok yavaşlar.":
    "Above {0} health this recovery slows to a crawl.",
  "Borç stresi: {0}/yıl":
    "Debt stress: {0}/yr",
  "Mutluluğun {0} altında: sağlığın da aşınıyor, {1}/yıl.":
    "Happiness below {0}: your health is eroding too, {1}/yr.",
  "Vebaya yakalandın: ölüm riskin %{0}.":
    "You caught the plague: your death risk is {0}%.",
  "Sağlığın {0} altında: riskli seçimlerde ölüm şansın büyür.":
    "Health below {0}: risky choices carry a bigger chance of death.",
  "Gelir & Gider ekranından daha iyi bir ev ve yemek düzenine geç.":
    "Switch to a better home and diet on the Income & Expenses screen.",
  "Mağazadan şifa eşyası al ve envanterden kullan.":
    "Buy healing goods in the shop and use them from your inventory.",
  "Dinlenme, şifa ve iyileşme sunan olay seçeneklerini seç.":
    "Pick event options that offer rest, healing and recovery.",
  "Borçtan kurtul; borç her yıl sağlığını yer.":
    "Get out of debt; debt eats your health every year.",
  "Riskli, kavgalı ve tehlikeli olay seçenekleri sağlığını düşürür.":
    "Risky, violent and dangerous event options cost you health.",
  "Kıtlık, salgın ve savaş dönemlerinde sağlık erir.":
    "Health melts away during famine, plague and war.",
  "Yalnızlık: {0}/yıl":
    "Loneliness: {0}/yr",
  "Eşinle sürekli kavga: moralin aşınıyor.":
    "Constant fights with your spouse: your morale wears down.",
  "Mutlu evlilik: {0}/yıl":
    "Happy marriage: {0}/yr",
  "Çocuklarınla arası bozuk: moralin düşüyor.":
    "You are on bad terms with your children: your morale is dropping.",
  "Çocuklarınla aran iyi: morale iyi geliyor.":
    "You get along with your children: it lifts your spirits.",
  "Sağlığın {0} altında: moralin aşınıyor, {1}/yıl.":
    "Health below {0}: your morale is wearing down, {1}/yr.",
  "Evlen; eşinle ve çocuklarınla Aile ekranından ilgilen.":
    "Marry, and look after your spouse and children on the Family screen.",
  "Sosyalleş: meyhane, pazar ve mekân olayları moral verir.":
    "Socialize: tavern, market and venue events lift your mood.",
  "Daha rahat bir ev ve keyifli bir sofra seç.":
    "Choose a more comfortable home and a pleasant table.",
  "Borçlarını öde; borç her yıl moralini düşürür.":
    "Pay off your debts; debt drains your morale every year.",
  "Yalnızlık, kötü evlilik, borç ve kayıplar moralini düşürür.":
    "Loneliness, a bad marriage, debt and losses bring your morale down.",
  "Ahlaksız ya da sert seçimler moral götürür.":
    "Immoral or harsh choices cost morale.",
  "Tüccarlık: kazançlı yıllar ahlakı aşındırır, zor yıllar güçlendirir.":
    "Merchant life: profitable years erode morality, hard years strengthen it.",
  "Karaborsa deposu: {0}/yıl":
    "Black-market depot: {0}/yr",
  "Ayyaşlık damgası ahlakını bir kez düşürdü.":
    "The drunkard stigma cut your morality once.",
  "Geçmişteki suçların ahlakında iz bıraktı.":
    "Past crimes have left a mark on your morality.",
  "Ahlak ağırlıkla seçimlerinle değişir.":
    "Morality mostly changes through your choices.",
  "Yardım, sadaka ve dürüstlük içeren olay seçeneklerini seç.":
    "Pick event options involving help, charity and honesty.",
  "Sosyalleş ekranından sadaka ver.":
    "Give alms from the Socialize screen.",
  "Din Adamı rütbesi ahlak ister; yüksek ahlak maaşı da artırır.":
    "Clergy ranks need morality; high morality also raises your pay.",
  "Para karşılığı ahlaki taviz ahlakını düşürür, aranmanı artırır.":
    "Trading morals for money lowers your morality and raises your wanted level.",
  "Karanlık işler, soygun ve şiddet ahlakı sert düşürür.":
    "Dark deeds, robbery and violence cut morality sharply.",
  "Din adamı saygınlığı: {0}/yıl":
    "Clergy standing: {0}/yr",
  "Tefeci taksidi aksattın: adın çıkıyor.":
    "You missed a loan-shark payment: word is getting around.",
  "Şöhret ağırlıkla seçimlerinle değişir.":
    "Fame mostly changes through your choices.",
  "Cesur, gösterişli ve topluma açık olay seçeneklerini seç.":
    "Pick bold, showy and public-facing event options.",
  "Mağazadan lüks eşya al ve daha görkemli bir eve taşın.":
    "Buy luxury goods in the shop and move into a grander home.",
  "Rütbeni yükselt; mesleğinde başarılı olmak adını duyurur.":
    "Raise your rank; succeeding in your trade makes a name for you.",
  "Rezillik, hapis ve ödenmeyen borçlar şöhretini düşürür.":
    "Scandal, prison and unpaid debts lower your fame.",
  "Bakımsız ev ve yetersiz yemek adını aşındırır.":
    "A shabby home and poor food erode your name.",
  "Uzun süredir suç işlemedin; zamanla soğur: {0}/yıl":
    "You have kept clean for a long time; it cools off: {0}/yr",
  "{0} yıl daha suç işlemezsen şehir seni unutmaya başlar ({1}/yıl).":
    "Stay clean {0} more year(s) and the city starts to forget you ({1}/yr).",
  "Temizsin; kimse seni aramıyor.":
    "You are clean; nobody is looking for you.",
  "Yönetimdeki himayen: {0}/yıl":
    "Your patron in the government: {0}/yr",
  "Kumar oynamak her seferinde biraz aranmanı artırır.":
    "Gambling raises your wanted level a little each time.",
  "Yasa dışı seçimler (hırsızlık, rüşvet, kaçakçılık, şiddet) ve karanlık işler aranmanı artırır.":
    "Illegal choices (theft, bribery, smuggling, violence) and dark deeds raise your wanted level.",
  "Hapistesin; cezanı tamamlayınca aranman en fazla 10'a iner.":
    "You are in prison; once you finish your sentence your wanted level drops to 10 at most.",
  "Kaçaksın: aranman çok yüksek.":
    "You are a fugitive: your wanted level is very high.",
  "Azılı suçlu (3★): tutuklanırsan 12-14 yıl ceza.":
    "Hardened criminal (3★): if arrested you face 12-14 years.",
  "Baskın bandı (2★): tutuklanırsan 9-11 yıl ceza.":
    "Raid band (2★): if arrested you face 9-11 years.",
  "Yakalanma bandı (1★): tutuklanırsan 7-9 yıl ceza.":
    "Capture band (1★): if arrested you face 7-9 years.",
  "Rutin bant: tutuklanırsan 3-4 yıl ceza.":
    "Routine band: if arrested you face 3-4 years.",
  "Aranma ekranından kefaret öde (gönüllü ödemede %20 indirim) ya da kendi isteğinle teslim ol (%25 daha kısa ceza).":
    "Pay bail from the Wanted screen (20% off when voluntary) or turn yourself in (25% shorter sentence).",
  "Aranma gölgesi": "Wanted shadow",
  "Eski bir suçun açığa çıktı": "An old crime came to light",
  "Baskından kıl payı kaçtı": "Narrowly escaped a raid",
  "Evine baskın yapıldı ve tutuklandı": "His home was raided and he was arrested",
  "Kendi isteğiyle teslim oldu": "Turned himself in",
  "Kefareti ödedin ({0} {birim}); sicilin {1}.": "You paid the bail ({0} {birim}); your record is {1}.",
  "yarı yarıya temizlendi": "half cleared",
  "tamamen temizlendi": "fully cleared",
  "Kendi isteğinle teslim oldun; ceza indirimli: {0} yıl.": "You turned yourself in; reduced sentence: {0} years.",
  "Kefareti reddettin; polis seni not aldı (aranma +{0}).": "You refused the bail; the police took note (wanted +{0}).",
  "Kefareti ödedin ({0} {birim}).": "You paid the bail ({0} {birim}).",
  "pazar payın ve gelirin": "your market share and income",
  "müşterilerin ve işin kalitesi": "your customers and the quality of your work",
  "cemaatin ve bağışların": "your congregation and donations",
  "birliğinin morali ve maaşın": "your unit's morale and pay",
  "gelirin": "your income",
  "Sicilin zaten temiz.": "Your record is already clean.",
  "Bu seviyede yarım ödeme yok; tamamını öde.": "No half payment at this level; pay in full.",
  "Kefaret için yeterli paran yok.": "You do not have enough money for the bail.",
  "Bekleyen bir polis uyarısı yok.": "There is no pending police warning.",
  "Zaten hapistesin.": "You are already in prison.",
  "Yolculuktayken teslim olamazsın.": "You cannot turn yourself in while travelling.",
  "Teslim olacak kadar aranmıyorsun.": "You are not wanted enough to turn yourself in.",
  "Polis uyarısını yanıtlaman gerekir.": "You must answer the police warning.",
  "Bildirim bulunamadı.": "Notification not found.",
  "Geçersiz karar.": "Invalid decision.",
  "Zar masası, Üç Kağıtçı ve karaborsa deposu da yavaş yavaş artırır.":
    "The dice table, Three-Card Monte and a black-market depot raise it gradually too.",
  "Aranma olaylarındaki kefaret ya da rüşvet seçeneklerini seç.":
    "Pick the bail or bribe options in wanted-level events.",
  "Büyük baskında 'teslim ol' ya da 'kaç' sonuçları aranmanı düşürür.":
    "In a major raid, the 'surrender' or 'flee' outcomes lower your wanted level.",
  "Yönetim ekranında ilişkin 80'in üstündeyse 'sicil temizliği' iste.":
    "If your relationship is above 80 on the Authorities screen, ask for a 'record cleanup'.",
  "Yönetimle ilişkin 70'in üstündeyse aranman yılda biraz düşer.":
    "If your relationship with the authorities is above 70, your wanted level drops a little each year.",
  "Yıllık maaşın: {0} {1}":
    "Your yearly salary: {0} {1}",
  "Yıllık giderin: {0} {1}":
    "Your yearly expenses: {0} {1}",
  "Borçtasın: faiz her yıl borcunu büyütür.":
    "You are in debt: interest grows it every year.",
  "Tefeci kredin: kalan borç {0} {1}":
    "Your loan-shark loan: {0} {1} still owed",
  "Mülklerin her yıl kira ve getiri sağlar.":
    "Your properties yield rent and income each year.",
  "Rütbeni yükselt: her rütbe maaşına prim ekler.":
    "Raise your rank: each rank adds a premium to your salary.",
  "Ahlak, şöhret ve mutluluğunu yüksek tut: itibar maaşını artırır.":
    "Keep morality, fame and happiness high: reputation raises your salary.",
  "Yatırım ekranından mülk al.":
    "Buy property from the Investments screen.",
  "Kazançlı olay seçeneklerini seç; mesleğindeki başarılar daha çok kazandırır.":
    "Pick profitable event options; successes in your own trade pay more.",
  "Daha pahalı bir ev ve sofra giderini artırır.":
    "A pricier home and table raise your expenses.",
  "Kumar, rüşvet, bağış ve talepleri kabul etmek paranı eritir.":
    "Gambling, bribes, donations and giving in to demands drain your money.",
  "İsyan":
    "Revolt",
  "Altın çağ":
    "Golden age",
  "Veba salgını":
    "Plague outbreak",
  "{0} ile savaş":
    "War with {0}",
  "{0} sürüyor":
    "{0} (ongoing)",
  "{0} sona erdi":
    "{0} ended",
  "{0} tahta çıktı":
    "{0} took the throne",
  "Geçersiz gösterge.":
    "Invalid indicator.",
  "Şu an seni etkileyen belirgin bir yıllık etken yok; bu değer ağırlıkla seçimlerinle değişir.":
    "Nothing in particular is affecting you year to year right now; this value mostly changes through your choices.",
  "Bu işi yakın zamanda çevirdin; ortalık sakinleşsin (~{0} yıl).":
    "You pulled this job recently; let things cool down (~{0} yrs).",
  "Bu yıl zar masasında yeterince oynadın; yıl dönünce yine gelirsin.":
    "You've played enough at the dice table this year; come back when the year turns.",
  "Lüks eşyalar koleksiyon parçasıdır; hediye edilemez.":
    "Luxury goods are collector's pieces; they can't be given as gifts.",
  "Şu an veritabanına ulaşılamıyor; biraz sonra tekrar dene.":
    "The database is unreachable right now; try again in a moment.",
  "İstek gövdesi geçerli bir JSON değil.": "The request body is not valid JSON.",
  "İstek gövdesi çok büyük.": "The request body is too large.",
  "Beklenmeyen bir sunucu hatası oluştu.": "An unexpected server error occurred.",
  "Çok fazla yeni oyun açtın; biraz bekleyip tekrar dene.": "You've started too many new games; wait a bit and try again.",
  "Böyle bir etkileşim yok.": "There is no such interaction.",
  "Bu, {0} için özellikle anlamlıydı.": "That meant a great deal to {0}.",
  "💔 {0} seni terk etti. Aranızdaki bağ artık kopmuştu.": "💔 {0} has left you. The bond between you had already snapped.",
  "{0} hayata gözlerini yumdu": "{0} passed away",
  "💔 {0} hayata gözlerini yumdu.": "💔 {0} has passed away.",
  "💔 {0} doğum sırasında hayatını kaybetti.": "💔 {0} died in childbirth.",
  "💔 {0} küçük yaşta hayatını kaybetti.": "💔 {0} died young.",
  "Mantık evliliği için henüz çok gençsin.": "You are still too young for an arranged marriage.",
  "Yas tutuyorsun; şimdi yeni bir evlilik düşünemezsin.": "You are in mourning; you cannot think of a new marriage right now.",
  "Bekleyen bir düğün var; önce onu tamamla.": "There is a wedding pending; finish it first.",
  "Mantık evliliği teklifleri şimdilik kapalı; biraz zaman geçmeli.": "Marriage proposals are closed for now; some time must pass.",
  "Geçersiz hediye.": "Invalid gift.",
  "Böyle bir aday yok.": "There is no such candidate.",
  "Bu teklif hediyesini karşılayacak paran yok.": "You cannot afford this proposal gift.",
  "Bekleyen bir düğün yok.": "There is no pending wedding.",
  "Geçersiz düğün bütçesi.": "Invalid wedding budget.",
  "Bu düğün bütçesini karşılayacak paran yok.": "You cannot afford this wedding budget.",
  "{0} teklifini kabul etti! Şimdi düğün bütçeni seç.": "{0} accepted your proposal! Now choose your wedding budget.",
  "Bir süre yeni teklif yapamazsın.": "You cannot make a new proposal for a while.",
  "💍 {0} ile evlendin!": "💍 You married {0}!",
  "Çeyiz olarak {0} {1} getirdi.": "They brought {0} {1} as a dowry.",
  "Eşinin desteği": "Your spouse's support",
  "Yas: {0}/yıl": "Mourning: {0}/yr",
  "{0}'in gönlünü aldın; yüzü yeniden güldü.": "You won {0} back; the smile returned.",
  "{0} ile yollarınızı ayırdınız.": "You and {0} went your separate ways.",
  "💢 {0} evlilik teklifi beklemekten yoruldu ve sana darıldı. Gönlünü almazsan bu ilişki bitebilir.": "💢 {0} grew tired of waiting for a proposal and is cross with you. If you do not win them back, this may end.",
  "💔 {0} seni terk etti. Bu ilişkiyi ayakta tutamadın.": "💔 {0} has left you. You could not keep this relationship alive.",
  "{0} ile sevgili oldu": "Became sweethearts with {0}",
  "{0} ile gizli bir yakınlaşma yaşadı": "Shared a secret closeness with {0}",
  "Şu an biriyle tanışacak durumda değilsin.": "You are in no position to meet someone right now.",
  "Süren bir tanışma yok.": "There is no meeting in progress.",
  "Zaten yanına gittin.": "You have already approached.",
  "Önce yanına gitmelisin.": "You must approach first.",
  "Geçersiz seçenek.": "Invalid choice.",
  "Bir sevgilin yok.": "You have no sweetheart.",
  "Bir sevgilin var; önce o ilişkiyi sonuçlandır.": "You have a sweetheart; settle that relationship first.",
  "👨‍👦 {0} {1} yaşına geldi; yanında çalışabilir. İlişkiler ekranından davet edebilirsin.": "👨‍👦 {0} has turned {1}; they can work beside you. You can invite them from the Relationships screen.",
  "👋 {0} artık ekibinde değil.": "👋 {0} is no longer on your crew.",
  "Bu çocuk için bekleyen bir iş daveti yok.": "There is no pending job invitation for this child.",
  "Bu çocuğun reddine verecek bir tepkin yok.": "There is no refusal from this child to respond to.",
  "Geçersiz tepki.": "Invalid reaction.",
  "{0} teklifini sevinçle kabul etti; artık yanında çalışıyor.": "{0} gladly accepted; they now work beside you.",
  "{0} teklifini reddetti: 'Bu iş bana göre değil.' Ona nasıl karşılık vereceksin?": "{0} declined: 'This work is not for me.' How will you respond?",
  "{0}'e öfkelendin; aranıza soğukluk girdi.": "You flared up at {0}; a coldness came between you.",
  "{0}'in kararına sakince saygı gösterdin; aranız yumuşadı.": "You calmly respected {0}'s decision; things softened between you.",
  "Çocuğunu kovmak aranızı ağır yaraladı.": "Dismissing your own child wounded your bond deeply.",
};
