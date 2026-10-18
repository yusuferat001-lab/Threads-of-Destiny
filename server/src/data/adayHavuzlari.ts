import type { IsletmeRolTuru, IsletmeAdayTipi } from "../types";

export interface AdayTaslagi {
  rolTuru: IsletmeRolTuru;   // "ana" | "maliyet" | "musteri" | "guvenlik"
  tip: IsletmeAdayTipi;      // "serseri" | "sadik_cirak" | "siradan" | "usta_guvenilmez" | "usta_sadik"
  gecmis: { tr: string; en: string };
}

// Kısa kurucu: şablon satırlarını tek satırda tutar.
function a(rolTuru: IsletmeRolTuru, tip: IsletmeAdayTipi, tr: string, en: string): AdayTaslagi {
  return { rolTuru, tip, gecmis: { tr, en } };
}

/**
 * İşletme çalışanı aday şablonları. Yetenek/sadakat sayıları koddan, tipe göre üretilir;
 * burada yalnız rol + tip + iki dilli geçmiş cümlesi vardır.
 * Her anahtarda 42 şablon: 22 ana, 8 maliyet, 6 müşteri, 6 güvenlik.
 * Anahtar: `${meslek}|${cag}`
 */
export const ADAY_SABLONLARI: Record<string, AdayTaslagi[]> = {
  "Tüccar|Orta Çağ": [
    // ana = Satıcı
    a("ana", "serseri", "pazarda kese kesmekten yeni vazgeçmiş bir külhanbeyi", "a street rogue who has only just given up cutting purses at the market"),
    a("ana", "serseri", "tezgâhtan tezgâha atlayan, borçlu bir delikanlı", "a debt-ridden lad who hops from stall to stall"),
    a("ana", "serseri", "kumarda son akçesini yitirmiş, dili uzun bir genç", "a glib youth who lost his last coin at dice"),
    a("ana", "serseri", "han avlusunda yatıp kalkan başıboş bir yetim", "a stray orphan who sleeps in the inn courtyard"),
    a("ana", "sadik_cirak", "kıt kanaat geçinen bir dokumacının çalışkan oğlu", "the hardworking son of a poor weaver"),
    a("ana", "sadik_cirak", "köyden yeni gelmiş, yalan söylemeyi bilmeyen bir genç", "a young villager fresh to town who cannot tell a lie"),
    a("ana", "sadik_cirak", "ustasının dükkânını gece gündüz süpüren bir çırak", "an apprentice who sweeps his master's shop day and night"),
    a("ana", "sadik_cirak", "mum tüccarının sessiz, gayretli yeğeni", "a chandler's quiet, diligent nephew"),
    a("ana", "sadik_cirak", "babasının borcunu çalışarak ödemek isteyen bir kız", "a girl set on working off her father's debts"),
    a("ana", "siradan", "pazarda yıllardır tezgâh açan sıradan bir esnaf", "an ordinary stallholder who has worked the market for years"),
    a("ana", "siradan", "kumaş satmaktan başka bir şey bilmeyen orta yaşlı adam", "a middle-aged man who knows nothing but selling cloth"),
    a("ana", "siradan", "kasabadan kasabaya gezen vasat bir seyyar satıcı", "a middling peddler who travels from town to town"),
    a("ana", "siradan", "iyi ya da kötü diye anılmayan bir baharatçı kalfası", "a spice dealer's journeyman neither praised nor blamed"),
    a("ana", "siradan", "lonca kaydı olan, işini bilen ama hırssız bir satıcı", "a guild-registered seller who knows the trade but lacks ambition"),
    a("ana", "siradan", "tanıdıklara mal satan, temkinli bir dul", "a cautious widow who sells to acquaintances"),
    a("ana", "usta_guvenilmez", "rakip loncadan kaçıp gelmiş, dili bal gibi bir satıcı", "a honey-tongued seller who fled a rival guild"),
    a("ana", "usta_guvenilmez", "Ceneviz sarraflarıyla gizlice anlaşmış yetenekli bir tezgâhtar", "a gifted salesman secretly in league with Genoese bankers"),
    a("ana", "usta_guvenilmez", "müşteriyi büyüleyen ama kasayı kollayan bir kumaş ustası", "a cloth master who charms buyers yet eyes the cash box"),
    a("ana", "usta_guvenilmez", "her loncanın kapısını çalmış, kimseye bağlanmayan parlak bir satıcı", "a brilliant seller who has knocked at every guild's door and stays loyal to none"),
    a("ana", "usta_sadik", "otuz yılını bu dükkâna vermiş emektar bir satıcı", "a veteran seller who gave thirty years to this shop"),
    a("ana", "usta_sadik", "ölen ustasının dükkânını yaşatmaya yemin etmiş kalfa", "a journeyman who swore to keep his late master's shop alive"),
    a("ana", "usta_sadik", "ağır kumaşı bile gözüyle tartan, sözünün eri kıdemli satıcı", "a senior seller who weighs heavy cloth by eye and keeps his word"),
    // maliyet = Alıcı / Tedarikçi
    a("maliyet", "serseri", "kervanların ardından mal devşiren bir külhanbeyi", "a rogue who gleans goods in the wake of caravans"),
    a("maliyet", "sadik_cirak", "yolları yeni öğrenen, dürüst bir katırcı çırağı", "an honest muleteer's apprentice still learning the roads"),
    a("maliyet", "siradan", "pazarlıkta ne iyi ne kötü bir alıcı", "a buyer neither good nor bad at haggling"),
    a("maliyet", "siradan", "yakın köylerden tahıl toplayan bir komisyoncu", "a broker who gathers grain from nearby villages"),
    a("maliyet", "siradan", "hanlarda mal arayan yorgun bir tedarikçi", "a weary supplier who hunts for goods at the inns"),
    a("maliyet", "usta_guvenilmez", "Venedik tüccarlarıyla gizli ortaklığı olan usta bir alıcı", "a skilled buyer with secret ties to Venetian merchants"),
    a("maliyet", "usta_guvenilmez", "mal bulmakta eşsiz ama komisyonu iki kat yazan bir acente", "an agent unmatched at finding goods who writes his cut twice"),
    a("maliyet", "usta_sadik", "yıllardır aynı çiftçilerle el sıkışan güvenilir bir tedarikçi", "a trusted supplier who has shaken hands with the same farmers for years"),
    // musteri = Tanıtımcı
    a("musteri", "serseri", "meydanda bağırıp para dilenen bir sokak çocuğu", "a street boy who shouts in the square and begs for coins"),
    a("musteri", "serseri", "sarhoş ağzıyla övgü yağdıran bir dellal", "a drunken crier who showers praise with a slurred tongue"),
    a("musteri", "sadik_cirak", "dükkân önünde sabahtan akşama bağıran gayretli bir oğlan", "a keen boy who calls out in front of the shop from dawn to dusk"),
    a("musteri", "siradan", "kilise çıkışında mal tanıtan bir dellal", "a crier who touts wares outside the church"),
    a("musteri", "siradan", "pazarda ağızdan ağıza söz yayan bir kadın", "a woman who spreads word of mouth through the market"),
    a("musteri", "usta_guvenilmez", "her tüccara aynı övgüyü satan, çok ünlü bir dellal", "a famous crier who sells the same praise to every merchant"),
    // guvenlik = Depo muhafızı
    a("guvenlik", "serseri", "geceleri uyuyakalan, kavgacı bir bekçi", "a quarrelsome watchman who dozes off at night"),
    a("guvenlik", "sadik_cirak", "ambarın kapısında nöbetten yılmayan genç bir yetim", "a young orphan who never tires of standing guard at the storehouse door"),
    a("guvenlik", "sadik_cirak", "köpeğiyle birlikte depoda yatan sadık bir çoban", "a loyal shepherd who sleeps in the warehouse with his dog"),
    a("guvenlik", "siradan", "kasaba kapısından emekli bir nöbetçi", "a retired sentry from the town gate"),
    a("guvenlik", "usta_sadik", "savaşlardan sağ dönmüş, sözünden dönmeyen kıdemli muhafız", "a veteran guard who survived wars and never breaks his word"),
    a("guvenlik", "usta_sadik", "mührü gözü gibi koruyan yaşlı bir ambar bekçisi", "an old storehouse keeper who guards the seal like his own eye"),
  ],

  "Tüccar|Sanayi Devrimi": [
    // ana = Satıcı
    a("ana", "serseri", "limanda küçük dolandırıcılıklarla geçinen bir çocuk", "a boy who lives by petty swindles on the docks"),
    a("ana", "serseri", "bir dükkândan ötekine atlayan, maaşını önceden harcayan bir tezgâhtar", "a shop assistant who jumps from shop to shop and spends his wages in advance"),
    a("ana", "serseri", "gaz lambası altında zar atan, borçlu bir kâtip yamağı", "an indebted clerk's boy who throws dice under the gas lamp"),
    a("ana", "serseri", "gazete satıp ilan dolandıran işsiz bir delikanlı", "an idle youth who sells newspapers and swindles on adverts"),
    a("ana", "sadik_cirak", "tersane işçisinin okumaya hevesli oğlu", "a dockyard worker's son eager to learn"),
    a("ana", "sadik_cirak", "taşradan gelmiş, ilk işini kaybetmekten korkan dürüst bir kız", "an honest country girl afraid of losing her first job"),
    a("ana", "sadik_cirak", "bakkal dükkânında çocukluktan beri çalışan sessiz bir yamak", "a quiet shop boy who has worked in the grocery since childhood"),
    a("ana", "sadik_cirak", "geceleri okuma yazma öğrenen çalışkan bir amele", "a diligent labourer learning to read and write by night"),
    a("ana", "sadik_cirak", "yetimhaneden çıkıp patronuna minnet duyan bir genç", "a young man raised in an orphanage who feels gratitude to his employer"),
    a("ana", "siradan", "mahalle dükkânında yıllardır tezgâh başında duran vasat bir satıcı", "an average salesman who has stood behind a neighbourhood counter for years"),
    a("ana", "siradan", "kumaş mağazasında mesai yapan orta halli bir tezgâhtar", "a so-so shop assistant working shifts at a drapery"),
    a("ana", "siradan", "vitrin önünde müşteri bekleyen sakin bir adam", "a calm man who waits for customers by the shop window"),
    a("ana", "siradan", "kasabadan şehre yeni taşınmış, işini idare eden bir satıcı", "a salesman newly moved from the countryside who gets by"),
    a("ana", "siradan", "kömür ve gaz yağı satan hırssız bir esnaf", "an unambitious tradesman selling coal and paraffin"),
    a("ana", "siradan", "pazar günleri bile dükkânı açan alelade bir kâtip", "an ordinary clerk who opens the shop even on Sundays"),
    a("ana", "usta_guvenilmez", "büyük mağazadan kovulmuş, müşteri defterini cebinde taşıyan usta satıcı", "a skilled salesman sacked from the department store who carries its customer ledger in his pocket"),
    a("ana", "usta_guvenilmez", "rakip tüccarın maaşına geçmeye hazır parlak bir komisyoncu", "a brilliant broker ready to jump to a rival merchant's payroll"),
    a("ana", "usta_guvenilmez", "satış rakamlarını şişirmekte mahir, hırslı bir tezgâhtar", "an ambitious salesman adept at inflating his figures"),
    a("ana", "usta_guvenilmez", "yabancı bir şirketin casusu olduğu söylenen şık giyimli satıcı", "a smartly dressed salesman rumoured to spy for a foreign firm"),
    a("ana", "usta_sadik", "firmanın kuruluşundan beri aynı tezgâhta duran kıdemli satıcı", "a senior salesman who has stood at the same counter since the firm began"),
    a("ana", "usta_sadik", "müşterilerini üç kuşaktır tanıyan, güvenilir bir mağaza şefi", "a trusted shop supervisor who has known his customers for three generations"),
    a("ana", "usta_sadik", "terbiyeli, hesabı şaşmaz, patronuna sadık usta tezgâhtar", "a courteous master salesman, exact with accounts and loyal to his employer"),
    // maliyet = Alıcı / Tedarikçi
    a("maliyet", "serseri", "pazarlıkla kazandığını kendi cebine atan külhanbeyi bir tedarikçi", "a rough supplier who pockets whatever he wins by haggling"),
    a("maliyet", "sadik_cirak", "ambar kayıtlarını titizlikle tutan genç bir satın alma çırağı", "a young purchasing apprentice who keeps the warehouse records with care"),
    a("maliyet", "siradan", "liman komisyoncusuna bağlı, işini bilen bir alıcı", "a buyer tied to a port broker who knows his work"),
    a("maliyet", "siradan", "toptan mal arayan sıradan bir sevkiyat memuru", "an ordinary dispatch clerk who looks for wholesale goods"),
    a("maliyet", "siradan", "telgraf başında fiyat kollayan orta halli bir acente", "a middling agent who watches prices at the telegraph"),
    a("maliyet", "usta_guvenilmez", "demiryolu şirketinden kaçmış, her fiyatı bilen usta bir alıcı", "a skilled buyer who left the railway company and knows every price"),
    a("maliyet", "usta_guvenilmez", "rakip fabrikayla gizlice pazarlık yapan parlak bir tedarikçi", "a brilliant supplier secretly bargaining with a rival factory"),
    a("maliyet", "usta_sadik", "iki kuşaktır aynı toptancılarla çalışan vefalı satın almacı", "a faithful purchaser who has worked with the same wholesalers for two generations"),
    // musteri = Tanıtımcı
    a("musteri", "serseri", "sokak köşesinde bedava şekerle müşteri kandıran bir çocuk", "a boy who lures customers with free sweets on the street corner"),
    a("musteri", "serseri", "ilan panolarını sahte duyurularla dolduran bir külhanbeyi", "a rogue who plasters the notice boards with false announcements"),
    a("musteri", "sadik_cirak", "afişleri geceleri yapıştıran gayretli bir çırak", "a keen apprentice who pastes up posters at night"),
    a("musteri", "siradan", "gazeteye ilan verip bekleyen kasaba matbaacısı", "a town printer who places adverts in the paper and waits"),
    a("musteri", "siradan", "at tramvayı duraklarında bildiri dağıtan sakin bir adam", "a calm man who hands out leaflets at the horse-tram stops"),
    a("musteri", "usta_guvenilmez", "bir gazetede köşesi olan ama övgüyü en çok verene satan yazar", "a writer with a newspaper column who sells praise to the highest bidder"),
    // guvenlik = Depo muhafızı
    a("guvenlik", "serseri", "kavgadan kaçmayan ama vardiyada uyuyan bir kapıcı", "a doorman who never backs down from a fight but sleeps through his shift"),
    a("guvenlik", "sadik_cirak", "fenerini sabaha kadar elinden bırakmayan genç bir bekçi", "a young watchman who keeps his lantern in hand until dawn"),
    a("guvenlik", "sadik_cirak", "depo kapısında nöbet tutan, vefalı eski bir asker", "a loyal old soldier who keeps watch at the warehouse door"),
    a("guvenlik", "siradan", "mahalle bekçiliğinden depoya geçmiş, sıradan bir adam", "an ordinary man who moved from the neighbourhood watch to the warehouse"),
    a("guvenlik", "usta_sadik", "kasaların şifresini ezbere bilen, yıllardır sadık bir kasa bekçisi", "a faithful vault keeper of many years who knows the safes' combinations by heart"),
    a("guvenlik", "usta_sadik", "eski gece bekçibaşısı, firmaya canıyla bağlı bir depo şefi", "a former head night-watchman who is deeply devoted to the firm"),
  ],

  "Zanaatkâr|Orta Çağ": [
    // ana = Üretici
    a("ana", "serseri", "ustasının aletlerini çalıp kaçmış bir çırak", "an apprentice who ran off with his master's tools"),
    a("ana", "serseri", "ocak başında uyuyakalan, işten işe atlayan bir delikanlı", "a lad who dozes by the forge and drifts from job to job"),
    a("ana", "serseri", "işten çok kavgaya meraklı bir kalfa adayı", "a would-be journeyman keener on brawling than on work"),
    a("ana", "serseri", "atölyeden atölyeye sürülen, borçlu bir hamal", "a debt-ridden porter driven from workshop to workshop"),
    a("ana", "sadik_cirak", "küçük köyden gelen, ellerine güvenen sessiz bir çırak", "a quiet apprentice from a small village who trusts his hands"),
    a("ana", "sadik_cirak", "yetim kalıp ustaya sığınmış çalışkan bir oğlan", "a hardworking orphan boy who sought refuge with the master"),
    a("ana", "sadik_cirak", "babasının tezgâhını sürdürmek isteyen genç bir kız", "a young girl determined to carry on her father's bench"),
    a("ana", "sadik_cirak", "sabahın köründe kömür taşıyan azimli bir çırak", "a determined apprentice who hauls charcoal before dawn"),
    a("ana", "sadik_cirak", "bir lokma ekmeğe minnet duyan, iş öğrenmeye hevesli bir genç", "a young hand grateful for a crust of bread and eager to learn the work"),
    a("ana", "siradan", "lonca kaydı olan, işini bilen vasat bir kalfa", "a guild-registered journeyman, competent but unremarkable"),
    a("ana", "siradan", "köy demircisinden ayrılmış orta halli bir işçi", "a middling workman who left the village smith"),
    a("ana", "siradan", "yıllardır aynı tezgâhta çalışan sakin bir marangoz", "a calm carpenter who has worked the same bench for years"),
    a("ana", "siradan", "çömlek çarkında harcanmış bir ömrün sıradan işçisi", "an ordinary worker with a life spent at the potter's wheel"),
    a("ana", "siradan", "hiçbir işte parlamayan ama hiçbirini de batırmayan bir yamak", "a hand who shines at nothing yet ruins nothing"),
    a("ana", "siradan", "kasaba dokumacısının üç oğlundan ortancası", "the middle of a town weaver's three sons"),
    a("ana", "usta_guvenilmez", "rakip loncadan kaçmış, elinden her iş gelen usta", "a master who fled a rival guild and can turn his hand to anything"),
    a("ana", "usta_guvenilmez", "sırlarını başka atölyelere satan parlak bir demirci", "a brilliant smith who sells his secrets to other workshops"),
    a("ana", "usta_guvenilmez", "paranın en çoğunu verene çalışan, gezgin bir usta", "a wandering master who works for the highest bidder"),
    a("ana", "usta_guvenilmez", "ustalığı kadar kibri de büyük, sürgün bir kalfa", "an exiled journeyman whose pride matches his craft"),
    a("ana", "usta_sadik", "yıllarını bu atölyeye vermiş, ellerinden altın damlayan emektar usta", "a veteran master with golden hands who gave his years to this workshop"),
    a("ana", "usta_sadik", "katedral inşaatında çalışmış, sözüne güvenilir bir taş ustası", "a trustworthy stonemason who worked on a cathedral"),
    a("ana", "usta_sadik", "eski ustasının mührünü gururla taşıyan sadık kalfa", "a loyal journeyman who proudly bears his old master's mark"),
    // maliyet = Hammaddeci
    a("maliyet", "serseri", "ormandan izinsiz kereste kesen bir külhanbeyi", "a rogue who fells timber in the forest without leave"),
    a("maliyet", "sadik_cirak", "kömürcü köyünden gelen, tartıyı şaşırmayan genç", "a young man from the charcoal-burners' village who never errs in weighing"),
    a("maliyet", "siradan", "yakın madenlerden demir getiren bir arabacı", "a carter who brings iron from nearby mines"),
    a("maliyet", "siradan", "yün ve keten toplayan orta halli bir tedarikçi", "a middling supplier who gathers wool and flax"),
    a("maliyet", "siradan", "köy köy gezip deri toplayan vasat bir tüccar", "a mediocre trader who collects hides village by village"),
    a("maliyet", "usta_guvenilmez", "kereste ocaklarıyla gizli anlaşması olan usta bir hammaddeci", "a skilled materials man with a secret deal with the timber yards"),
    a("maliyet", "usta_guvenilmez", "demir madenlerini avucunun içi gibi bilen ama efendi seçmeyen biri", "a man who knows the iron mines like his palm but chooses no master"),
    a("maliyet", "usta_sadik", "üç kuşaktır aynı ocaklarla çalışan güvenilir bir demir tedarikçisi", "a reliable iron supplier who has dealt with the same mines for three generations"),
    // musteri = Tanıtımcı
    a("musteri", "serseri", "kapı kapı dolaşıp yalan siparişler uyduran bir külhanbeyi", "a rogue who goes door to door inventing false orders"),
    a("musteri", "serseri", "panayırda ürünü olduğundan fazla öven bir sarhoş", "a drunk who praises the wares far beyond their worth at the fair"),
    a("musteri", "sadik_cirak", "panayırda atölyenin adını duyurmaya çalışan genç bir çırak", "a young apprentice who tries to spread the workshop's name at the fair"),
    a("musteri", "siradan", "kilise bahçesinde sipariş toplayan bir dellal", "a crier who takes orders in the churchyard"),
    a("musteri", "siradan", "çevre köyleri dolaşıp ürün gösteren orta halli bir satıcı", "a middling seller who tours the surrounding villages showing goods"),
    a("musteri", "usta_guvenilmez", "soylu evlerine kapı açtıran ama komisyonu yüksek tutan bir aracı", "a go-between who opens noble doors but charges a high commission"),
    // guvenlik = Atölye bekçisi
    a("guvenlik", "serseri", "geceleri sarhoş dolaşan, kavgacı bir bekçi", "a quarrelsome watchman who wanders drunk at night"),
    a("guvenlik", "sadik_cirak", "ocak sönmesin diye geceleri uyanık kalan vefalı bir çocuk", "a faithful child who stays up at night to keep the forge alight"),
    a("guvenlik", "sadik_cirak", "atölyenin köpeğiyle uyuyan, ona canını verecek yaşlı bir uşak", "an old servant who sleeps beside the workshop dog and would give his life for it"),
    a("guvenlik", "siradan", "kale nöbetinden dönmüş, sıradan bir er", "an ordinary soldier back from castle duty"),
    a("guvenlik", "usta_sadik", "savaş yarası taşıyan ama gözünü kırpmayan kıdemli bekçi", "a senior watchman who bears war scars and never blinks"),
    a("guvenlik", "usta_sadik", "ustalarının ölümüne kadar yanından ayrılmamış emektar muhafız", "a veteran guard who did not leave his masters' side until their death"),
  ],

  "Zanaatkâr|Sanayi Devrimi": [
    // ana = Üretici
    a("ana", "serseri", "fabrikadan fabrikaya atlayan, vardiyayı sık kaçıran bir işçi", "a worker who hops from factory to factory and often skips his shift"),
    a("ana", "serseri", "maaşını meyhanede bitiren genç bir tornacı", "a young lathe hand who finishes his wages at the tavern"),
    a("ana", "serseri", "grev çağrılarına kulak veren hırçın bir çırak", "a hot-tempered apprentice who heeds every strike call"),
    a("ana", "serseri", "tezgâhtan malzeme aşıran külhanbeyi bir amele", "a roguish labourer who pilfers materials from the bench"),
    a("ana", "sadik_cirak", "ocaktan çıkmış, atölyede iş arayan çalışkan bir genç", "a hardworking youth out of the pit looking for work in a workshop"),
    a("ana", "sadik_cirak", "dokuma fabrikasında çocukluğu geçmiş sessiz bir kız", "a quiet girl whose childhood passed in a weaving mill"),
    a("ana", "sadik_cirak", "gece okulunda teknik çizim öğrenen azimli bir çırak", "a determined apprentice learning technical drawing at night school"),
    a("ana", "sadik_cirak", "babası kazada sakat kalmış, ailesini besleyen bir oğlan", "a boy who feeds his family after his father was crippled in an accident"),
    a("ana", "sadik_cirak", "ustabaşına minnet duyan, işini hiç aksatmayan bir yamak", "a hand who is grateful to the foreman and never neglects his work"),
    a("ana", "siradan", "vardiyasını eksiksiz yapan ama parlamayan bir işçi", "a worker who finishes every shift but never stands out"),
    a("ana", "siradan", "dökümhanede yıllarını geçirmiş vasat bir döküm işçisi", "an average foundry hand who has spent years in the casting shop"),
    a("ana", "siradan", "sendikaya üye, işini bilen sakin bir marangoz", "a calm carpenter who belongs to the union and knows his trade"),
    a("ana", "siradan", "çırağı olduğu atölyede kalfa olmuş sıradan bir adam", "an ordinary man who rose to journeyman in the workshop where he began as an apprentice"),
    a("ana", "siradan", "ayakkabı kalıbı çakan orta halli bir ayakkabıcı", "a middling shoemaker who hammers out lasts"),
    a("ana", "siradan", "buharlı tezgâhın başında mesaisini dolduran bir kadın", "a woman who works out her hours at the steam loom"),
    a("ana", "usta_guvenilmez", "büyük fabrikadan ayrılmış, patent sırlarını cebinde taşıyan usta", "a master who left the great factory carrying patent secrets in his pocket"),
    a("ana", "usta_guvenilmez", "başka bir şirketin mühendisiyle gizlice görüşen parlak bir makinist", "a brilliant machinist in secret talks with another firm's engineer"),
    a("ana", "usta_guvenilmez", "kimseye bağlanmayan, en yüksek ücreti bekleyen yetenekli bir mekanikçi", "a gifted mechanic who owes loyalty to no one and waits for the highest wage"),
    a("ana", "usta_guvenilmez", "sendikayla yönetimin arasında oynayan kurnaz bir ustabaşı", "a cunning foreman who plays the union against the management"),
    a("ana", "usta_sadik", "atölyenin ilk tezgâhından beri orada çalışan emektar usta", "a veteran master who has been here since the workshop's first bench"),
    a("ana", "usta_sadik", "makinenin her vidasını ezbere bilen, sözünden dönmeyen kıdemli makinist", "a senior machinist who knows every screw of the engine by heart and keeps his word"),
    a("ana", "usta_sadik", "çıraklarını kendi çocuğu gibi yetiştiren sadık bir usta", "a loyal master who raises his apprentices like his own children"),
    // maliyet = Hammaddeci
    a("maliyet", "serseri", "hurdacılardan çaldığını getiren külhanbeyi bir tedarikçi", "a roguish supplier who brings in whatever he lifts from the scrapyards"),
    a("maliyet", "sadik_cirak", "kömür deposunda doğup büyümüş, dürüst bir yamak", "an honest hand born and raised in the coal yard"),
    a("maliyet", "siradan", "demiryolu istasyonundan mal alan vasat bir alıcı", "a so-so buyer who picks up goods at the railway station"),
    a("maliyet", "siradan", "kömür ve demir fiyatlarını izleyen orta halli bir komisyoncu", "a middling broker who tracks coal and iron prices"),
    a("maliyet", "siradan", "liman ambarlarından hammadde çıkaran sıradan bir sevkiyatçı", "an ordinary shipper who clears raw materials from the harbour warehouses"),
    a("maliyet", "usta_guvenilmez", "çelik tüccarlarıyla gizli komisyon anlaşması olan usta bir hammaddeci", "a skilled materials man with a secret commission deal with steel merchants"),
    a("maliyet", "usta_guvenilmez", "hammadde borsasını ezbere bilen ama en çok verene giden biri", "someone who knows the raw-materials market by heart but goes to the highest bidder"),
    a("maliyet", "usta_sadik", "yıllardır aynı madenlerle dürüstçe iş yapan kıdemli satın alma şefi", "a senior purchasing chief who has dealt honestly with the same mines for years"),
    // musteri = Tanıtımcı
    a("musteri", "serseri", "işçi kahvelerinde palavra atarak sipariş toplayan biri", "someone who collects orders by boasting in the workers' coffeehouses"),
    a("musteri", "serseri", "sahte kartvizit dağıtan haylaz bir çocuk", "a rascal boy who hands out forged calling cards"),
    a("musteri", "sadik_cirak", "atölyenin adını mahalleye duyurmaya çalışan genç bir kız", "a young girl who tries to make the workshop's name known in the district"),
    a("musteri", "siradan", "ilan panolarına ürünü astıran bir mahalle kâtibi", "a district clerk who has the products posted on the notice boards"),
    a("musteri", "siradan", "sergilerde ürün tanıtan orta halli bir görevli", "a middling attendant who presents products at exhibitions"),
    a("musteri", "usta_guvenilmez", "ticaret sergilerinde parlayan ama rakiplere de hizmet eden bir sözcü", "a spokesman who shines at trade fairs but also serves the rivals"),
    // guvenlik = Atölye bekçisi
    a("guvenlik", "serseri", "ocak başında kestiren ama yumruğu sağlam bir bekçi", "a watchman who nods off by the stove but has a solid fist"),
    a("guvenlik", "sadik_cirak", "çocukluğundan beri atölyenin kapısını açıp kapayan vefalı bir kapıcı", "a faithful doorkeeper who has opened and shut the workshop door since childhood"),
    a("guvenlik", "sadik_cirak", "yangından korkan, gece boyunca devriye gezen genç bir bekçi", "a young watchman who fears fire and patrols all night"),
    a("guvenlik", "siradan", "fabrika kapısında yıllarca nöbet tutmuş sıradan bir bekçi", "an ordinary guard who stood at a factory gate for years"),
    a("guvenlik", "usta_sadik", "tezgâhları ve kalıpları gözü gibi koruyan kıdemli bir bekçibaşı", "a senior head-watchman who guards benches and moulds like his own eyes"),
    a("guvenlik", "usta_sadik", "askerlikten bekçiliğe geçmiş, sırrı ağzından kaçırmayan sadık adam", "a loyal man, once a soldier, who guards the workshop and never gives away a secret"),
  ],
};
