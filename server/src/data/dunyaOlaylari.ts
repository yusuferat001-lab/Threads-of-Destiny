/**
 * "Yıl" penceresi (Dünya geçmişi) için elle yazılmış, tarihi kesin gerçek olaylar.
 * Yalnızca doğrulanabilir tarihler yazılır; savaş pencereleri (tarihiSavaslar.ts) ve hükümdar
 * dönemleri (liderler.ts) ayrıca oradan türetilir, burada TEKRAR edilmez.
 *
 *  - kapsam "dunya": o çağdaki her bölgenin oyuncusuna görünür ("Dünyada" bölümü).
 *  - kapsam "bolge": yalnız `bolge` eşleşirse görünür ("Ülkende" bölümü).
 */
export interface DunyaOlayi {
  yil: number;
  /** Çok yıllı olaylarda bitiş yılı. */
  yilSon?: number;
  kapsam: "dunya" | "bolge";
  bolge?: string;
  cag: "Orta Çağ" | "Sanayi Devrimi";
  ikon: string;
  baslik: { tr: string; en: string };
}

export const DUNYA_OLAYLARI: DunyaOlayi[] = [
  // ---- Orta Çağ: dünya ----
  { yil: 1054, kapsam: "dunya", cag: "Orta Çağ", ikon: "⛪", baslik: { tr: "Doğu ve Batı kiliseleri birbirinden ayrıldı", en: "The Eastern and Western churches split" } },
  { yil: 1066, kapsam: "dunya", cag: "Orta Çağ", ikon: "🗡️", baslik: { tr: "Normanlar İngiltere'yi fethetti (Hastings)", en: "The Normans conquered England (Hastings)" } },
  { yil: 1071, kapsam: "dunya", cag: "Orta Çağ", ikon: "🏹", baslik: { tr: "Malazgirt'te Selçuklular Bizans'ı yendi", en: "The Seljuks defeated Byzantium at Manzikert" } },
  { yil: 1095, kapsam: "dunya", cag: "Orta Çağ", ikon: "📣", baslik: { tr: "Papa Clermont'ta Haçlı seferi çağrısı yaptı", en: "The Pope called for a crusade at Clermont" } },
  { yil: 1099, kapsam: "dunya", cag: "Orta Çağ", ikon: "🏰", baslik: { tr: "Haçlılar Kudüs'ü ele geçirdi", en: "The Crusaders captured Jerusalem" } },
  { yil: 1147, yilSon: 1149, kapsam: "dunya", cag: "Orta Çağ", ikon: "⚔️", baslik: { tr: "İkinci Haçlı Seferi", en: "The Second Crusade" } },
  { yil: 1187, kapsam: "dunya", cag: "Orta Çağ", ikon: "🦁", baslik: { tr: "Selahaddin Hittin'de kazandı, Kudüs'ü geri aldı", en: "Saladin won at Hattin and retook Jerusalem" } },
  { yil: 1189, yilSon: 1192, kapsam: "dunya", cag: "Orta Çağ", ikon: "⚔️", baslik: { tr: "Üçüncü Haçlı Seferi", en: "The Third Crusade" } },
  { yil: 1204, kapsam: "dunya", cag: "Orta Çağ", ikon: "🔥", baslik: { tr: "Dördüncü Haçlı Seferi İstanbul'u yağmaladı", en: "The Fourth Crusade sacked Constantinople" } },
  { yil: 1206, kapsam: "dunya", cag: "Orta Çağ", ikon: "🐎", baslik: { tr: "Cengiz Han Moğol kabilelerini birleştirdi", en: "Genghis Khan united the Mongol tribes" } },
  { yil: 1215, kapsam: "dunya", cag: "Orta Çağ", ikon: "📜", baslik: { tr: "İngiltere'de Magna Carta imzalandı", en: "Magna Carta was sealed in England" } },
  { yil: 1228, yilSon: 1229, kapsam: "dunya", cag: "Orta Çağ", ikon: "🕊️", baslik: { tr: "Altıncı Haçlı Seferi: Kudüs savaşmadan devredildi", en: "The Sixth Crusade: Jerusalem handed over without a fight" } },
  { yil: 1258, kapsam: "dunya", cag: "Orta Çağ", ikon: "🌪️", baslik: { tr: "Moğollar Bağdat'ı yerle bir etti", en: "The Mongols destroyed Baghdad" } },
  { yil: 1119, kapsam: "dunya", cag: "Orta Çağ", ikon: "🛡️", baslik: { tr: "Kudüs'te Tapınak Şövalyeleri tarikatı kuruldu", en: "The Knights Templar order was founded in Jerusalem" } },
  { yil: 1130, kapsam: "dunya", cag: "Orta Çağ", ikon: "👑", baslik: { tr: "II. Roger Sicilya Krallığı'nın tacını taktı", en: "Roger II was crowned King of Sicily" } },
  { yil: 1170, kapsam: "dunya", cag: "Orta Çağ", ikon: "⚰️", baslik: { tr: "Başpiskopos Thomas Becket Canterbury'de öldürüldü", en: "Archbishop Thomas Becket was murdered at Canterbury" } },
  { yil: 1212, kapsam: "dunya", cag: "Orta Çağ", ikon: "🧒", baslik: { tr: "Çocuk Haçlı Seferi", en: "The Children's Crusade" } },
  { yil: 1219, yilSon: 1221, kapsam: "dunya", cag: "Orta Çağ", ikon: "🐎", baslik: { tr: "Cengiz Han Harezm'i yıktı", en: "Genghis Khan destroyed Khwarezm" } },
  { yil: 1223, kapsam: "dunya", cag: "Orta Çağ", ikon: "🐎", baslik: { tr: "Moğollar Kalka Nehri'nde Rus prenslerini yendi", en: "The Mongols defeated the Rus princes at the Kalka River" } },
  { yil: 1227, kapsam: "dunya", cag: "Orta Çağ", ikon: "⚰️", baslik: { tr: "Cengiz Han öldü", en: "Genghis Khan died" } },
  { yil: 1241, kapsam: "dunya", cag: "Orta Çağ", ikon: "🌪️", baslik: { tr: "Moğollar Mohi'de Macar ordusunu yendi", en: "The Mongols crushed the Hungarian army at Mohi" } },
  { yil: 1250, kapsam: "dunya", cag: "Orta Çağ", ikon: "🏰", baslik: { tr: "Mısır'da Memlükler iktidarı ele geçirdi", en: "The Mamluks seized power in Egypt" } },
  { yil: 1260, kapsam: "dunya", cag: "Orta Çağ", ikon: "🛡️", baslik: { tr: "Ayn Calut'ta Memlükler Moğolları durdurdu", en: "The Mamluks stopped the Mongols at Ain Jalut" } },

  // ---- Orta Çağ: bölgeler ----
  { yil: 1077, kapsam: "bolge", bolge: "Kutsal Roma", cag: "Orta Çağ", ikon: "❄️", baslik: { tr: "İmparator Heinrich Canossa'da Papa'dan af diledi", en: "Emperor Henry begged the Pope's pardon at Canossa" } },
  { yil: 1122, kapsam: "bolge", bolge: "Kutsal Roma", cag: "Orta Çağ", ikon: "📜", baslik: { tr: "Worms Konkordatosu imparator-papa çekişmesini yatıştırdı", en: "The Concordat of Worms eased the emperor–pope quarrel" } },
  { yil: 1176, kapsam: "bolge", bolge: "Kutsal Roma", cag: "Orta Çağ", ikon: "🛡️", baslik: { tr: "Lombardiya şehirleri Legnano'da imparatoru yendi", en: "The Lombard cities beat the emperor at Legnano" } },
  { yil: 1176, kapsam: "bolge", bolge: "Selçuklu", cag: "Orta Çağ", ikon: "🏹", baslik: { tr: "Miryokefalon'da Selçuklular Bizans ordusunu bozguna uğrattı", en: "The Seljuks routed the Byzantine army at Myriokephalon" } },
  { yil: 1176, kapsam: "bolge", bolge: "Bizans", cag: "Orta Çağ", ikon: "🛡️", baslik: { tr: "Miryokefalon'da Bizans ordusu Selçuklulara yenildi", en: "The Byzantine army lost to the Seljuks at Myriokephalon" } },
  { yil: 1163, kapsam: "bolge", bolge: "Fransa", cag: "Orta Çağ", ikon: "⛪", baslik: { tr: "Paris'te Notre-Dame'ın temeli atıldı", en: "The foundation of Notre-Dame de Paris was laid" } },
  { yil: 1209, yilSon: 1229, kapsam: "bolge", bolge: "Fransa", cag: "Orta Çağ", ikon: "⚔️", baslik: { tr: "Güney Fransa'da Katar Haçlı Seferi", en: "The Albigensian Crusade in southern France" } },
  { yil: 1214, kapsam: "bolge", bolge: "Fransa", cag: "Orta Çağ", ikon: "⚜️", baslik: { tr: "Bouvines Muharebesi: Fransa kralı büyük zafer kazandı", en: "Battle of Bouvines: the French king won a great victory" } },
  { yil: 1248, yilSon: 1254, kapsam: "bolge", bolge: "Fransa", cag: "Orta Çağ", ikon: "⚔️", baslik: { tr: "IX. Louis Yedinci Haçlı Seferi'ne çıktı", en: "Louis IX led the Seventh Crusade" } },
  { yil: 1243, kapsam: "bolge", bolge: "Selçuklu", cag: "Orta Çağ", ikon: "🌪️", baslik: { tr: "Kösedağ'da Moğollar Selçuklu ordusunu yendi", en: "The Mongols defeated the Seljuk army at Köse Dağ" } },
  { yil: 1261, kapsam: "bolge", bolge: "Bizans", cag: "Orta Çağ", ikon: "🏛️", baslik: { tr: "Bizans İstanbul'u Latinlerden geri aldı", en: "Byzantium retook Constantinople from the Latins" } },

  // ---- Sanayi Devrimi: dünya ----
  { yil: 1805, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "⚓", baslik: { tr: "Trafalgar Deniz Savaşı", en: "The Battle of Trafalgar" } },
  { yil: 1807, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "⛓️", baslik: { tr: "İngiltere köle ticaretini yasakladı", en: "Britain banned the slave trade" } },
  { yil: 1815, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🏰", baslik: { tr: "Napoléon Waterloo'da yenildi", en: "Napoleon was defeated at Waterloo" } },
  { yil: 1825, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🚂", baslik: { tr: "İngiltere'de ilk buharlı genel demiryolu açıldı", en: "The first public steam railway opened in England" } },
  { yil: 1830, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🚂", baslik: { tr: "Liverpool–Manchester hattı: ilk şehirlerarası buharlı yolcu demiryolu", en: "The Liverpool–Manchester line, the first inter-city steam railway" } },
  { yil: 1830, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🇧🇪", baslik: { tr: "Belçika bağımsızlığını ilan etti", en: "Belgium declared its independence" } },
  { yil: 1839, yilSon: 1842, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🚢", baslik: { tr: "Çin'de Birinci Afyon Savaşı", en: "The First Opium War in China" } },
  { yil: 1840, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "✉️", baslik: { tr: "İlk yapışkanlı posta pulu (Penny Black) çıktı", en: "The first adhesive postage stamp, the Penny Black, appeared" } },
  { yil: 1844, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "📡", baslik: { tr: "Morse telgrafıyla ilk uzun mesafe mesajı gönderildi", en: "The first long-distance Morse telegraph message was sent" } },
  { yil: 1845, yilSon: 1852, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🥔", baslik: { tr: "İrlanda'da Büyük Kıtlık", en: "The Great Famine in Ireland" } },
  { yil: 1848, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🔥", baslik: { tr: "Avrupa'yı devrim dalgası sardı", en: "A wave of revolutions swept Europe" } },
  { yil: 1851, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🏛️", baslik: { tr: "Londra'da Büyük Sergi: Kristal Saray", en: "The Great Exhibition opened in London's Crystal Palace" } },
  { yil: 1857, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🔥", baslik: { tr: "Hindistan'da Sipahi İsyanı", en: "The Indian Rebellion broke out" } },
  { yil: 1866, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🌊", baslik: { tr: "Atlantik'i aşan telgraf kablosu kalıcı olarak döşendi", en: "The transatlantic telegraph cable was laid for good" } },
  { yil: 1859, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "📖", baslik: { tr: "Darwin'in Türlerin Kökeni yayımlandı", en: "Darwin published On the Origin of Species" } },
  { yil: 1861, yilSon: 1865, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "⚔️", baslik: { tr: "Amerika'da İç Savaş", en: "The American Civil War" } },
  { yil: 1861, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🇮🇹", baslik: { tr: "İtalya Krallığı ilan edildi", en: "The Kingdom of Italy was proclaimed" } },
  { yil: 1869, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "🚢", baslik: { tr: "Süveyş Kanalı açıldı", en: "The Suez Canal opened" } },
  { yil: 1870, kapsam: "dunya", cag: "Sanayi Devrimi", ikon: "⚔️", baslik: { tr: "Fransa–Prusya Savaşı başladı", en: "The Franco-Prussian War began" } },

  // ---- Sanayi Devrimi: bölgeler ----
  { yil: 1804, kapsam: "bolge", bolge: "Fransa", cag: "Sanayi Devrimi", ikon: "👑", baslik: { tr: "Napoléon kendini imparator ilan etti", en: "Napoleon crowned himself emperor" } },
  { yil: 1830, kapsam: "bolge", bolge: "Fransa", cag: "Sanayi Devrimi", ikon: "🔥", baslik: { tr: "Temmuz Devrimi: X. Charles tahttan indi", en: "The July Revolution toppled Charles X" } },
  { yil: 1848, kapsam: "bolge", bolge: "Fransa", cag: "Sanayi Devrimi", ikon: "🔥", baslik: { tr: "Şubat Devrimi: krallık yıkıldı, cumhuriyet geldi", en: "The February Revolution ended the monarchy" } },
  { yil: 1832, kapsam: "bolge", bolge: "İngiltere", cag: "Sanayi Devrimi", ikon: "🗳️", baslik: { tr: "Reform Yasası seçim hakkını genişletti", en: "The Reform Act widened the vote" } },
  { yil: 1833, kapsam: "bolge", bolge: "İngiltere", cag: "Sanayi Devrimi", ikon: "⛓️", baslik: { tr: "İngiliz imparatorluğunda köleliğin kaldırılması yasalaştı", en: "Slavery abolition was passed across the British Empire" } },
  { yil: 1821, kapsam: "bolge", bolge: "Osmanlı", cag: "Sanayi Devrimi", ikon: "🔥", baslik: { tr: "Yunan isyanı başladı", en: "The Greek revolt began" } },
  { yil: 1826, kapsam: "bolge", bolge: "Osmanlı", cag: "Sanayi Devrimi", ikon: "🛡️", baslik: { tr: "Yeniçeri Ocağı kaldırıldı (Vaka-i Hayriye)", en: "The Janissary corps was abolished" } },
  { yil: 1839, kapsam: "bolge", bolge: "Osmanlı", cag: "Sanayi Devrimi", ikon: "📜", baslik: { tr: "Tanzimat Fermanı ilan edildi", en: "The Tanzimat Edict was proclaimed" } },
  { yil: 1856, kapsam: "bolge", bolge: "Osmanlı", cag: "Sanayi Devrimi", ikon: "📜", baslik: { tr: "Islahat Fermanı yayımlandı", en: "The Reform Edict was issued" } },
  { yil: 1812, kapsam: "bolge", bolge: "Rusya", cag: "Sanayi Devrimi", ikon: "🔥", baslik: { tr: "Napoléon Moskova'ya girdi, şehir yandı", en: "Napoleon entered Moscow and the city burned" } },
  { yil: 1861, kapsam: "bolge", bolge: "Rusya", cag: "Sanayi Devrimi", ikon: "📜", baslik: { tr: "Çar II. Aleksandr serfliği kaldırdı", en: "Tsar Alexander II abolished serfdom" } },
];
