import type { Cag, Kategori, SonucEtkisi } from "../../types";
import type { OlayTanimi, OlaySecenegi } from "./types";

/**
 * "Gecikmiş takip" havuzu (2026-09 sonu, kullanıcı isteği): bugün yapılan bir
 * seçimin 15-20 yıl sonraki geri dönüşü. Her tema üç olaydan oluşur:
 *  1. TETİKLEYİCİ (normal rastgele havuzda çıkar, `gecikmisTakipOlayi:true`):
 *     "yardım et" ya da "reddet/görmezden gel" arasında bir seçim — ikisi de
 *     kesin (baseBasariSansi 100, gerçek bir zar yok, ahlaki bir tercih).
 *     Seçilen dala göre `SonucEtkisi.gecikmis_takip`, GECIKMIS_TAKIP_YIL_MIN-MAX
 *     (gameEngine.ts, 15-20 yıl) yıl sonrasına bir geri dönüş olayı zamanlar.
 *  2. OLUMLU sonuç olayı (`gecikmisSonucOlayi:true`) — yardım ettiysen.
 *  3. OLUMSUZ sonuç olayı (`gecikmisSonucOlayi:true`) — reddettiysen.
 * Sonuç olayları normal rastgele havuzdan TAMAMEN dışlanır (olaySecici.ts
 * uygunMu) — yalnız gameEngine.ts'teki gecikmiş-takip kaskadı, zamanı gelince
 * (state.gecikmis_takipler) zorlanan olay olarak sunar. İkisi de iki seçenekli:
 * biri "coşkuyla" biri "temkinli/ölçülü" tepki — ikisi de kesin (100), sadece
 * etki büyüklüğü/tonu değişir; asıl geri dönüş (olumlu/olumsuz) zaten hangi
 * dalın zamanlandığına göre baştan belirlenmiştir.
 */

/** Zar hiç atılmayacağı (baseBasariSansi 100) için erişilemeyen dal — dead code, kasıtlı (§24). */
const OLMAYAN_DAL: SonucEtkisi = { mesaj: "Bu an hiç yaşanmadı." };

interface TakipDali {
  metin: string;
  sonuc: SonucEtkisi;
}

interface TakipTema {
  anahtar: string;
  cag: Cag;
  kategori: Kategori;
  gorsel: string;
  baslik: string;
  metin: string;
  yardim: TakipDali;
  reddet: TakipDali;
  olumlu: { baslik: string; metin: string; gorsel: string; secenekler: [TakipDali, TakipDali] };
  olumsuz: { baslik: string; metin: string; gorsel: string; secenekler: [TakipDali, TakipDali] };
}

function secenekUret(dal: TakipDali, gecikmisTakipId: string, cozuldeEtiketi: string): OlaySecenegi {
  return {
    metin: dal.metin,
    baseBasariSansi: 100,
    basariliSonuc: { ...dal.sonuc, gecikmis_takip: gecikmisTakipId, etiket_ekle: [cozuldeEtiketi] },
    basarisizSonuc: OLMAYAN_DAL,
  };
}

function sonucSecenekUret(dal: TakipDali): OlaySecenegi {
  return {
    metin: dal.metin,
    baseBasariSansi: 100,
    basariliSonuc: dal.sonuc,
    basarisizSonuc: OLMAYAN_DAL,
  };
}

function temaUret(t: TakipTema): OlayTanimi[] {
  const tetikleyiciId = `gt_${t.anahtar}`;
  const olumluId = `gt_${t.anahtar}_iyi`;
  const olumsuzId = `gt_${t.anahtar}_kotu`;
  // Bu temanın bir daha tetiklenmemesi için "çözüldü" etiketi — aksi halde
  // (K-tekrar-onleme yalnızca son birkaç olayı hatırladığından, kalıcı bir
  // koruma olmadan) aynı tema, uzun bir hayatta ikinci kez tetiklenip aynı
  // "yıllar sonra geri döndü" hikayesini tekrarlayabiliyordu.
  const cozuldeEtiketi = `${tetikleyiciId}_cozuldu`;

  const tetikleyici: OlayTanimi = {
    id: tetikleyiciId,
    kategori: t.kategori,
    cag: t.cag,
    gecikmisTakipOlayi: true,
    yasakliEtiketler: [cozuldeEtiketi],
    gorsel: t.gorsel,
    baslik: t.baslik,
    metin: t.metin,
    secenekler: [secenekUret(t.yardim, olumluId, cozuldeEtiketi), secenekUret(t.reddet, olumsuzId, cozuldeEtiketi)],
  };

  const olumluOlay: OlayTanimi = {
    id: olumluId,
    kategori: t.kategori,
    cag: t.cag,
    gecikmisSonucOlayi: true,
    gorsel: t.olumlu.gorsel,
    baslik: t.olumlu.baslik,
    metin: t.olumlu.metin,
    secenekler: [sonucSecenekUret(t.olumlu.secenekler[0]), sonucSecenekUret(t.olumlu.secenekler[1])],
  };

  const olumsuzOlay: OlayTanimi = {
    id: olumsuzId,
    kategori: t.kategori,
    cag: t.cag,
    gecikmisSonucOlayi: true,
    gorsel: t.olumsuz.gorsel,
    baslik: t.olumsuz.baslik,
    metin: t.olumsuz.metin,
    secenekler: [sonucSecenekUret(t.olumsuz.secenekler[0]), sonucSecenekUret(t.olumsuz.secenekler[1])],
  };

  return [tetikleyici, olumluOlay, olumsuzOlay];
}

const ORTA_CAG: Cag = "Orta Çağ";
const SANAYI: Cag = "Sanayi Devrimi";

const TEMALAR: TakipTema[] = [
  // ============================================================
  // ORTA ÇAĞ (15)
  // ============================================================
  {
    anahtar: "oc01_dilenci",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "🥖",
    baslik: "Sokaktaki Dilenci",
    metin: "Pazar yerinin girişinde, yırtık pırtık giysili yaşlı bir dilenci sana elini uzatıyor. Gözlerinde ne dilenen ne de yalvaran tuhaf bir onur var.",
    yardim: {
      metin: "Cebindeki birkaç sikkeyi ona uzat.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Dilenciye birkaç sikke uzattın; gözlerinde bir umut ışığı gördün, sana içtenlikle teşekkür etti." },
    },
    reddet: {
      metin: "Omuz silk, yoluna devam et.",
      sonuc: { mutluluk: -1, mesaj: "Görmezden gelip yoluna devam ettin; dilenci arkandan bir şeyler mırıldandı." },
    },
    olumlu: {
      baslik: "Dilenci Geri Döndü",
      metin: "Yıllar önce pazarda para verdiğin dilenci, üstü başı temiz, at sırtında kapına geldi. Şehrin en zengin tüccarlarından biri olmuş — o gün verdiğin sadakayı asla unutmamış.",
      gorsel: "💰",
      secenekler: [
        { metin: "Minnetini içtenlikle kabul et.", sonuc: { para: 38, mutluluk: 4, dost_puani: 3, mesaj: "Adam kesesini önüne boşalttı: \"O gün bana insan gibi davrandın, borcumu şimdi ödüyorum.\"" } },
        { metin: "Alçakgönüllülükle küçük bir hediye kabul et.", sonuc: { para: 14, mutluluk: 9, ahlak: 5, mesaj: "Büyük bir armağanı reddedip küçük bir hediyeyle yetindin; adam bu alçakgönüllülüğe hayran kaldı." } },
      ],
    },
    olumsuz: {
      baslik: "Unutmayan Dilenci",
      metin: "O gün görmezden geldiğin dilenci şimdi kapına dayanmış, kalabalığın önünde seni utandırıyor: \"Bu adam bana bir kırıntı bile esirgemişti!\"",
      gorsel: "😠",
      secenekler: [
        { metin: "Ondan özür dile, elindeki parayı uzat.", sonuc: { para: -6, ahlak: 2, mutluluk: -2, mesaj: "Özür dileyip elindeki parayı uzattın; kalabalık dağıldı ama utanç içinde kaldın." } },
        { metin: "Meydan oku, geri adım atma.", sonuc: { mutluluk: -6, un: -4, mesaj: "Geri adım atmadın; ama kalabalık senin hakkında konuşup durdu, adın bir süre kötüye çıktı." } },
      ],
    },
  },
  {
    anahtar: "oc02_yarali_yolcu",
    cag: ORTA_CAG,
    kategori: "saglik",
    gorsel: "🩹",
    baslik: "Yol Kenarındaki Yaralı",
    metin: "Şehir yolunun kenarında, soyulmuş ve dövülmüş bir yolcu yatıyor. Kimse durup ona bakmıyor; herkes başını çevirip geçiyor.",
    yardim: {
      metin: "Onu evine götürüp yaralarını sar.",
      sonuc: { para: -4, saglik: -1, ahlak: 4, mesaj: "Yaralı adamı evine götürdün, yaralarını sardın; birkaç gün sonra kendine gelip yoluna devam etti." },
    },
    reddet: {
      metin: "Sen de başını çevirip geç.",
      sonuc: { ahlak: -2, mesaj: "Sen de diğerleri gibi başını çevirip geçtin; vicdanın seni bir süre rahatsız etti." },
    },
    olumlu: {
      baslik: "İyileşen Yolcunun Ziyareti",
      metin: "O gün yaralarını sardığın yolcu, şimdi bölgenin saygın bir hekimi olmuş. Kapına gelip senin ve ailenin sağlığıyla bizzat ilgileneceğini söylüyor.",
      gorsel: "🧑‍⚕️",
      secenekler: [
        { metin: "Teklifini memnuniyetle kabul et.", sonuc: { saglik: 10, mutluluk: 3, mesaj: "Hekim seni baştan aşağı muayene edip değerli ilaçlar bıraktı; kendini yıllardır olmadığın kadar dinç hissettin." } },
        { metin: "Sadece sohbet et, tedaviyi başkasına sakla.", sonuc: { mutluluk: 8, ahlak: 3, dost_puani: 4, mesaj: "Tedaviyi daha muhtaç birine yönlendirdin; hekim bu inceliğe hayran kaldı, dostluğunuz pekişti." } },
      ],
    },
    olumsuz: {
      baslik: "Kin Tutan Yabancı",
      metin: "O gün yardım etmediğin yaralı adam iyileşmiş ama kin tutmuş. Şimdi şehirde nüfuzlu bir adam ve senin hakkında karanlık söylentiler yayıyor.",
      gorsel: "🗣️",
      secenekler: [
        { metin: "Söylentileri yalanlamaya çalış.", sonuc: { para: -8, mutluluk: -3, mesaj: "Söylentileri yalanlamak için epey para ve zaman harcadın, tam olarak da başaramadın." } },
        { metin: "Umursama, zamanla unutulur de.", sonuc: { un: -5, mutluluk: -3, mesaj: "Umursamadın ama söylentiler bir süre peşini bırakmadı, adın biraz zedelendi." } },
      ],
    },
  },
  {
    anahtar: "oc03_bogulan_cocuk",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "🌊",
    baslik: "Nehirde Boğulan Çocuk",
    metin: "Nehir kıyısından geçerken küçük bir çocuğun akıntıya kapılıp çırpındığını görüyorsun. Kimse harekete geçmiyor.",
    yardim: {
      metin: "Kendini suya at, çocuğu kurtar.",
      sonuc: { saglik: -2, ahlak: 4, mutluluk: 3, mesaj: "Kendini soğuk suya attın ve çocuğu boğulmaktan son anda kurtardın; ailesi gözyaşları içinde teşekkür etti." },
    },
    reddet: {
      metin: "Suya girmeye cesaret edemiyorsun, izle.",
      sonuc: { mutluluk: -3, mesaj: "Suya girmeye cesaret edemedin; neyse ki başka biri yetişti, ama sen kendini hep suçlu hissettin." },
    },
    olumlu: {
      baslik: "Kurtardığın Çocuk Büyüdü",
      metin: "Yıllar önce nehirden kurtardığın çocuk, şimdi bölgenin saygın bir komutanı/lonca ustası olmuş. Seni unutmadığını, her ihtiyacında yanında olacağını söylüyor.",
      gorsel: "🎖️",
      secenekler: [
        { metin: "Onun himayesini seve seve kabul et.", sonuc: { un: 6, dost_puani: 4, mutluluk: 4, mesaj: "Nüfuzlu bir dost kazandın; adın şehirde saygıyla anılmaya başladı." } },
        { metin: "Yalnızca minnetini kabul et, fazlasını isteme.", sonuc: { mutluluk: 9, ahlak: 6, mesaj: "Fazladan bir şey istemedin, sadece o günü birlikte andınız; içinde derin bir huzur hissettin." } },
      ],
    },
    olumsuz: {
      baslik: "Vicdan Azabı Geri Döndü",
      metin: "O gün suya girmediğin için hep kendini suçlamıştın. Şimdi çocuğun ailesiyle karşılaştın; adamın gözlerindeki hayal kırıklığı hâlâ orada.",
      gorsel: "😔",
      secenekler: [
        { metin: "Nihayet özür dile, içini dök.", sonuc: { mutluluk: 3, ahlak: 2, mesaj: "Yıllar sonra özür diledin; tam bir af almasan da içindeki yük biraz hafifledi." } },
        { metin: "Konuyu kapat, geçmişi eşeleme.", sonuc: { mutluluk: -4, mesaj: "Konuyu kapattın ama o bakış aklından uzun süre çıkmadı." } },
      ],
    },
  },
  {
    anahtar: "oc04_tuccar_borc",
    cag: ORTA_CAG,
    kategori: "ticaret",
    gorsel: "🪙",
    baslik: "Zor Günde Bir Tüccar",
    metin: "Tanıdığın genç bir tüccar, kervanı soyulduğu için iflasın eşiğinde. Senden borç istiyor, karşılığında dürüstçe geri ödeyeceğine yemin ediyor.",
    yardim: {
      metin: "Ona borç ver.",
      sonuc: { para: -12, ahlak: 2, mesaj: "Ona elindeki birikimden borç verdin; gözlerinde hem umut hem utanç vardı." },
    },
    reddet: {
      metin: "Riski göze alamam, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Riski göze alamayıp reddettin; adam başka kapılar çalmaya gitti." },
    },
    olumlu: {
      baslik: "Zengin Tüccarın Vefası",
      metin: "O gün borç verdiğin genç tüccar, şimdi kervanları şehirler arası dolaşan zengin bir adam olmuş. Verdiğin borcu fazlasıyla, faiziyle geri getirdi.",
      gorsel: "🐫",
      secenekler: [
        { metin: "Fazlasıyla geri ödemeyi kabul et.", sonuc: { para: 32, un: 2, mutluluk: 3, mesaj: "Borcunu üç katıyla geri ödedi: \"Sensiz o günü atlatamazdım.\" dedi." } },
        { metin: "Sadece anaparayı al, gerisini reddet.", sonuc: { para: 10, ahlak: 6, dost_puani: 5, mutluluk: 4, mesaj: "Fazlasını istemedin; adam bu tavrına hayran kalıp ömür boyu dostun oldu." } },
      ],
    },
    olumsuz: {
      baslik: "Reddedilen Tüccarın Kini",
      metin: "O gün borç vermediğin tüccar iflas etmiş, sonra topladığı gücüyle rakip bir işe girip bugün seninle aynı pazarda rekabet ediyor — ve senden hâlâ nefret ediyor.",
      gorsel: "⚔️",
      secenekler: [
        { metin: "Aranızı düzeltmeye çalış.", sonuc: { para: -6, mutluluk: -2, mesaj: "Aranızı düzeltmeye çalıştın, kısmen başardın ama epey masraf etti." } },
        { metin: "Rekabete göğüs ger.", sonuc: { rakip_puani: -6, mutluluk: -3, mesaj: "Rekabete göğüs gerdin; pazardaki mücadele seni de yordu." } },
      ],
    },
  },
  {
    anahtar: "oc05_yetim_himaye",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "🧒",
    baslik: "Sahipsiz Bir Yetim",
    metin: "Veba ya da savaşta ailesini kaybetmiş küçük bir yetim, kapının önünde aç ve üşümüş bekliyor. Ona bakacak kimsesi yok.",
    yardim: {
      metin: "Onu evine al, himayene geçir.",
      sonuc: { para: -5, ahlak: 4, mutluluk: 3, mesaj: "Küçük yetimi evine aldın, ona bir çatı ve sıcak yemek verdin." },
    },
    reddet: {
      metin: "Kendi derdin yeter, geri çevir.",
      sonuc: { mutluluk: -2, mesaj: "Kendi derdinin yettiğini düşünüp çocuğu geri çevirdin; kapıdan uzaklaşırken arkasına bakmadı." },
    },
    olumlu: {
      baslik: "Himaye Ettiğin Yetim Büyüdü",
      metin: "Yıllar önce himayene aldığın yetim, şimdi kendi ayakları üstünde duran, saygın bir zanaatkâr/asker olmuş. Seni ziyarete geldi, elinde özenle hazırlanmış bir hediye var.",
      gorsel: "🎁",
      secenekler: [
        { metin: "Onu evine buyur et, birlikte kutla.", sonuc: { mutluluk: 5, dost_puani: 4, mesaj: "Onunla birlikte eski günleri andınız; evladın gibi gururlandın." } },
        { metin: "Yardımını isteme, sadece görmekten mutlu ol.", sonuc: { mutluluk: 10, ahlak: 6, mesaj: "Hiçbir karşılık istemedin; sadece iyi biri olarak yetiştiğini görmek sana yetti." } },
      ],
    },
    olumsuz: {
      baslik: "Sokakta Büyüyen Öfke",
      metin: "O gün geri çevirdiğin yetim, sokaklarda büyümüş ve şehrin karanlık çevrelerine karışmış. Şimdi senden bir zamanlar esirgediğin yardımın bedelini istiyor.",
      gorsel: "🗡️",
      secenekler: [
        { metin: "İstediğini vererek başını kurtar.", sonuc: { para: -14, mutluluk: -3, mesaj: "İstediğini verip başını kurtardın; ama bu türden bir tehditle karşılaşmak seni sarstı." } },
        { metin: "Tehditlere boyun eğme.", sonuc: { suc_artis: 4, mutluluk: -5, mesaj: "Boyun eğmedin; adam bir süre etrafında dolanıp seni tedirgin etti." } },
      ],
    },
  },
  {
    anahtar: "oc06_esir_cocuk",
    cag: ORTA_CAG,
    kategori: "savas",
    gorsel: "🏳️",
    baslik: "Düşman Saflarından Bir Çocuk",
    metin: "Bir çarpışmanın ardından, düşman saflarından küçük bir çocuk esir alındı. Askerler onunla ne yapacağını sana soruyor.",
    yardim: {
      metin: "Ona merhamet göster, ailesine iade edilmesini sağla.",
      sonuc: { para: -4, ahlak: 5, mutluluk: 2, mesaj: "Çocuğa merhamet gösterip güvenli bir şekilde kendi tarafına gönderilmesini sağladın." },
    },
    reddet: {
      metin: "Savaşın gereği bu, ilgilenme.",
      sonuc: { ahlak: -3, mesaj: "Savaşın gereği olduğunu düşünüp ilgilenmedin; çocuğun akıbetiyle bir daha hiç ilgilenmedin." },
    },
    olumlu: {
      baslik: "Eski Düşmanın Şükranı",
      metin: "O gün merhamet ettiğin çocuk, büyüyüp düşman tarafında önemli bir lider olmuş. Şimdi elçiler aracılığıyla sana bir şükran armağanı ve barış teklifi gönderiyor.",
      gorsel: "🕊️",
      secenekler: [
        { metin: "Armağanı ve barış elini kabul et.", sonuc: { para: 24, un: 3, mutluluk: 3, mesaj: "Armağanı kabul ettin; iki taraf arasında senin sayende ufak bir barış köprüsü kuruldu." } },
        { metin: "Yalnızca dostluk mesajını kabul et.", sonuc: { dost_puani: 6, ahlak: 6, mutluluk: 5, mesaj: "Maddi armağanı geri çevirip yalnız dostluğu kabul ettin; bu tavrın her iki tarafta da saygı gördü." } },
      ],
    },
    olumsuz: {
      baslik: "Büyüyen İntikam",
      metin: "O gün kaderine terk ettiğin çocuk büyümüş, güç sahibi bir düşman komutanı olmuş ve şimdi seni hedef alan bir baskın düzenliyor.",
      gorsel: "🔥",
      secenekler: [
        { metin: "Savunmanı güçlendir, tehdide hazırlan.", sonuc: { para: -16, saglik: -3, mesaj: "Savunmanı güçlendirmek epey masraflı ve yorucu oldu, ama en kötüsünü savuşturdun." } },
        { metin: "Diplomasiyle yatıştırmaya çalış.", sonuc: { un: -4, mutluluk: -4, mesaj: "Diplomasiyle yatıştırmaya çalıştın; kısmen başardın ama itibarın bir miktar zedelendi." } },
      ],
    },
  },
  {
    anahtar: "oc07_kesise_sadaka",
    cag: ORTA_CAG,
    kategori: "din",
    gorsel: "⛪",
    baslik: "Aç Bir Keşiş",
    metin: "Yolun kenarında, günlerdir hiçbir şey yememiş genç bir keşiş, karşılığında dua sözü vererek senden sadaka istiyor.",
    yardim: {
      metin: "Ona yemek ve birkaç sikke ver.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Keşişe yemek ve birkaç sikke verdin; sana içten bir dua etti." },
    },
    reddet: {
      metin: "Kendi işine bak, ilgilenme.",
      sonuc: { ahlak: -1, mesaj: "Kendi işine bakıp ilgilenmedin; keşiş sessizce yoluna devam etti." },
    },
    olumlu: {
      baslik: "Manastırın Şükranı",
      metin: "O gün doyurduğun genç keşiş, şimdi etkili bir manastırın başrahibi olmuş. Manastırın sana her zaman kapılarının açık olduğunu, ihtiyacında yardım edeceğini bildiriyor.",
      gorsel: "🙏",
      secenekler: [
        { metin: "Manastırın himayesini kabul et.", sonuc: { ahlak: 2, un: 3, mutluluk: 3, mesaj: "Manastır seni himayesine aldı; halk arasında dürüst ve hayırsever biri olarak anılmaya başladın." } },
        { metin: "Sadece dostluğunu kabul et, himaye isteme.", sonuc: { dost_puani: 5, mutluluk: 8, ahlak: 4, mesaj: "Himaye istemeden sadece dostluğunu kabul ettin; aranızdaki bağ yıllar boyu sürdü." } },
      ],
    },
    olumsuz: {
      baslik: "Kilisenin Soğuk Bakışı",
      metin: "O gün geri çevirdiğin keşiş şimdi manastırda etkili bir konumda. Senin hakkında cimri ve merhametsiz olduğuna dair söylentiler yayılıyor.",
      gorsel: "❄️",
      secenekler: [
        { metin: "Kiliseye büyük bir bağış yaparak telafi et.", sonuc: { para: -18, ahlak: 3, mesaj: "Büyük bir bağışla telafi etmeye çalıştın; söylentiler bir süre sonra dindi." } },
        { metin: "Umursama, dedikoduların geçmesini bekle.", sonuc: { un: -4, mutluluk: -3, mesaj: "Umursamadın ama söylentiler cemaat arasında bir süre dolaştı." } },
      ],
    },
  },
  {
    anahtar: "oc08_hasta_yabanci",
    cag: ORTA_CAG,
    kategori: "saglik",
    gorsel: "🤒",
    baslik: "Hastalanan Bir Yabancı",
    metin: "Kervansarayda kalan bir yabancı, ateşler içinde yatıyor. Kimse ona yaklaşmak istemiyor, bulaşıcı bir şey olabileceğinden korkuyorlar.",
    yardim: {
      metin: "Yanına git, ona bakım sağla.",
      sonuc: { para: -5, saglik: -2, ahlak: 3, mesaj: "Korkuya aldırmadan yanına gidip ona bakım sağladın; birkaç gün içinde ayağa kalktı." },
    },
    reddet: {
      metin: "Riske girme, uzak dur.",
      sonuc: { mutluluk: -1, mesaj: "Riske girmedin, uzak durdun; adamın akıbetini asla öğrenemedin." },
    },
    olumlu: {
      baslik: "İyileşen Yabancının Sözü",
      metin: "O gün bakımını üstlendiğin yabancı aslında saygın bir asilzademiş. Şimdi sana bir mektupla, sarayında seni ağırlamak istediğini bildiriyor.",
      gorsel: "📜",
      secenekler: [
        { metin: "Daveti kabul et, sarayına git.", sonuc: { para: 26, un: 4, mutluluk: 3, mesaj: "Daveti kabul ettin; seni cömertçe ağırladı ve adını çevresinde övgüyle andı." } },
        { metin: "Nazikçe teşekkür et, gitme.", sonuc: { dost_puani: 5, ahlak: 6, mutluluk: 6, mesaj: "Gitmeyi tercih etmedin ama mektupla sıcak bir dostluk kurdunuz." } },
      ],
    },
    olumsuz: {
      baslik: "Ölen Yabancının Ailesi",
      metin: "O gün uzak durduğun yabancı, kimse ilgilenmediği için hayatını kaybetmiş. Şimdi ailesi, onu neden yalnız bıraktığını sormak için karşına çıktı.",
      gorsel: "⚰️",
      secenekler: [
        { metin: "Yaşananları dürüstçe anlat, özür dile.", sonuc: { mutluluk: -4, ahlak: 2, mesaj: "Yaşananları dürüstçe anlattın; aile kırgın ayrıldı ama en azından yalan söylemedin." } },
        { metin: "Sorumluluğu üstlenme.", sonuc: { un: -5, mutluluk: -3, mesaj: "Sorumluluğu üstlenmedin; aile bunu unutmadı, adın çevrede bir süre kötü anıldı." } },
      ],
    },
  },
  {
    anahtar: "oc09_gezgin_fal",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "🔮",
    baslik: "Gezgin Fal Bakıcısı",
    metin: "Kasabaya gelen gezgin bir fal bakıcısı kadın, avucuna bakmak için senden birkaç sikke istiyor. Çevredekiler onu şüpheyle süzüyor.",
    yardim: {
      metin: "Merakına yenil, sikkeyi ver.",
      sonuc: { para: -2, mutluluk: 2, mesaj: "Merakına yenilip sikkeyi verdin; kadın avucuna bakıp esrarengiz birkaç söz fısıldadı." },
    },
    reddet: {
      metin: "Boş inanç de, uzaklaş.",
      sonuc: { mesaj: "Boş inanç deyip uzaklaştın; kadın omuz silkip başka birine döndü." },
    },
    olumlu: {
      baslik: "Falcının Gerçek Uyarısı",
      metin: "Yıllar önce avucuna baktırdığın kadın, gerçekten de sezgileri güçlü biriymiş. Şimdi karşına çıkıp seni yaklaşmakta olan gerçek bir tehlikeye karşı uyarıyor.",
      gorsel: "⚠️",
      secenekler: [
        { metin: "Uyarısını ciddiye al, tedbir al.", sonuc: { para: -6, saglik: 4, mutluluk: 3, mesaj: "Uyarısını ciddiye alıp tedbir aldın; başına gelebilecek büyük bir belayı ucuz atlattın." } },
        { metin: "Yine de şüpheyle karşıla ama dinle.", sonuc: { mutluluk: 2, mesaj: "Tam inanmasan da söylediklerini aklında tuttun; ilerleyen günlerde işine yaradı." } },
      ],
    },
    olumsuz: {
      baslik: "Dolandırıcı Çıktı",
      metin: "O gün boş inanç deyip uzaklaştığın kadın aslında usta bir dolandırıcıymış. Şimdi senin adını kullanarak çevrende insanları kandırdığı ortaya çıktı.",
      gorsel: "🎭",
      secenekler: [
        { metin: "Adını temizlemek için uğraş.", sonuc: { para: -8, un: -2, mesaj: "Adını temizlemek için epey uğraştın, kısmen başardın ama masrafı cabası oldu." } },
        { metin: "Boş ver, kendiliğinden unutulur.", sonuc: { un: -6, mutluluk: -3, mesaj: "Boş verdin ama söylenti bir süre peşini bırakmadı." } },
      ],
    },
  },
  {
    anahtar: "oc10_ciraklik",
    cag: ORTA_CAG,
    kategori: "zanaat",
    gorsel: "🔨",
    baslik: "Yetenekli Bir Çırak Adayı",
    metin: "Fakir bir ailenin oğlu, elindeki küçük ahşap oymalarla sana yeteneğini gösteriyor ve çıraklık fırsatı istiyor. Ustaların çoğu onu geri çevirmiş.",
    yardim: {
      metin: "Ona bir fırsat ver, çıraklığa al.",
      sonuc: { para: -4, ahlak: 3, mutluluk: 2, mesaj: "Ona bir fırsat verip çıraklığa aldın; gözlerindeki heyecan içini ısıttı." },
    },
    reddet: {
      metin: "Vaktin yok, geri çevir.",
      sonuc: { mutluluk: -1, mesaj: "Vaktinin olmadığını söyleyip geri çevirdin; çocuk hayal kırıklığıyla uzaklaştı." },
    },
    olumlu: {
      baslik: "Ustalaşan Eski Çırak",
      metin: "O gün fırsat verdiğin çocuk, şimdi bölgenin en aranan ustalarından biri olmuş. Sana elleriyle yaptığı özel, değerli bir eser hediye ediyor.",
      gorsel: "🏺",
      secenekler: [
        { metin: "Hediyeyi gururla kabul et.", sonuc: { para: 20, un: 2, mutluluk: 3, mesaj: "Hediyeyi gururla kabul ettin; eserin değeri kadar, arkasındaki hikaye de seni duygulandırdı." } },
        { metin: "Onunla birlikte çalışmayı teklif et.", sonuc: { kariyer_puani_artis: 10, dost_puani: 5, mutluluk: 5, ahlak: 3, mesaj: "Birlikte çalışma teklifini kabul etti; ortaklığınız her ikinize de itibar kazandırdı." } },
      ],
    },
    olumsuz: {
      baslik: "Rakip Ustanın Gölgesi",
      metin: "O gün geri çevirdiğin çocuk başka bir ustanın yanında yetişmiş, şimdi senin en büyük rakibin olmuş — ve müşterilerini elinden alıyor.",
      gorsel: "🏭",
      secenekler: [
        { metin: "İşini geliştirerek rekabete ayak uydur.", sonuc: { para: -10, mesaj: "İşini geliştirmek için epey harcama yaptın, rekabete zar zor ayak uydurabildin." } },
        { metin: "Kaybı kabullen, küçül.", sonuc: { para: -14, mutluluk: -3, mesaj: "Kaybı kabullenip işini küçülttün; eski günlerin özlemini çektin." } },
      ],
    },
  },
  {
    anahtar: "oc11_esir_asker",
    cag: ORTA_CAG,
    kategori: "savas",
    gorsel: "⚔️",
    baslik: "Esir Düşen Bir Asker",
    metin: "Bir çarpışmada esir alınan genç bir düşman askeri, hayatı için sana yalvarıyor. Diğer askerler onu infaz etmek istiyor.",
    yardim: {
      metin: "Onu serbest bırak.",
      sonuc: { para: -2, ahlak: 4, rakip_puani: -2, mesaj: "Onu serbest bıraktın; diğer askerler şaşırsa da kararına saygı gösterdi." },
    },
    reddet: {
      metin: "Savaşın kuralı bu, karışma.",
      sonuc: { ahlak: -3, mesaj: "Savaşın kuralı bu deyip karışmadın; adamın akıbetiyle bir daha ilgilenmedin." },
    },
    olumlu: {
      baslik: "Eski Esirin Vefası",
      metin: "O gün serbest bıraktığın genç asker, şimdi kendi ordusunda saygın bir komutan olmuş. Seni bulup borcunu ödemek istiyor.",
      gorsel: "🛡️",
      secenekler: [
        { metin: "Değerli bir yardım teklifini kabul et.", sonuc: { para: 22, un: 3, mutluluk: 2, mesaj: "Sana değerli bir yardım sundu: \"Hayatımı bağışladın, borcumu böyle öderim.\" dedi." } },
        { metin: "Yalnızca askeri bir istihbarat/uyarı iste.", sonuc: { saglik: 6, mutluluk: 8, ahlak: 4, mesaj: "Ondan yalnız değerli bir uyarı istedin; bu, ileride seni büyük bir tehlikeden korudu." } },
      ],
    },
    olumsuz: {
      baslik: "Kurtulamayan Öfke",
      metin: "O gün karışmadığın esir asker infaz edilmiş. Ailesi yıllar sonra seni bulup o gün neden bir şey yapmadığını soruyor.",
      gorsel: "😞",
      secenekler: [
        { metin: "Dürüstçe hesap ver, üzüntünü paylaş.", sonuc: { mutluluk: -3, ahlak: 2, mesaj: "Dürüstçe hesap verdin; aile kırgın ayrıldı ama en azından kaçmadın." } },
        { metin: "Savaşın kuralıydı de, geç.", sonuc: { un: -4, mutluluk: -4, mesaj: "Savaşın kuralıydı deyip geçtin; ama bu karşılaşma seni uzun süre rahatsız etti." } },
      ],
    },
  },
  {
    anahtar: "oc12_kitlik_komsu",
    cag: ORTA_CAG,
    kategori: "ticaret",
    gorsel: "🌾",
    baslik: "Kıtlıkta Bir Komşu",
    metin: "Kıtlık yılında komşu ailenin ambarı boşalmış, çocukları açlıktan zayıf düşmüş. Senden tahıl istiyorlar.",
    yardim: {
      metin: "Kendi ambarından tahıl ver.",
      sonuc: { para: -6, ahlak: 3, mutluluk: 2, mesaj: "Kendi ambarından bir kısmını komşuna verdin; kendi payın azaldı ama vicdanın rahatladı." },
    },
    reddet: {
      metin: "Kendi ailen öncelikli, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Kendi ailenin öncelikli olduğunu söyleyip reddettin; komşun boynu bükük ayrıldı." },
    },
    olumlu: {
      baslik: "Toparlanan Komşunun Şükranı",
      metin: "O kıtlık yılında yardım ettiğin komşu, şimdi bölgenin en zengin çiftçilerinden biri olmuş. Sana her yıl bereketinden bir pay ayırıyor.",
      gorsel: "🌻",
      secenekler: [
        { metin: "Yıllık payı sevinerek kabul et.", sonuc: { para: 18, mutluluk: 3, dost_puani: 2, mesaj: "Yıllık payını getirdi: \"O gün bize hayat verdin, biz de seni asla unutmadık.\" dedi." } },
        { metin: "Payı reddet, dostluğu yeter de.", sonuc: { ahlak: 6, dost_puani: 6, mutluluk: 6, mesaj: "Payı reddettin, sadece dostluğunuzu istedin; bu incelik aranızdaki bağı daha da güçlendirdi." } },
      ],
    },
    olumsuz: {
      baslik: "Gasp Edilen Hak",
      metin: "O kıtlık yılında reddedilen komşu iyiliğini hiç unutmamış; şimdi güçlenip senin tarlanın bir kısmına sınır iddiasıyla el koymaya çalışıyor.",
      gorsel: "🚧",
      secenekler: [
        { metin: "Hakkını mahkemede/lonca önünde savun.", sonuc: { para: -10, mesaj: "Hakkını savunmak epey masraflı oldu ama tarlanı koruyabildin." } },
        { metin: "Küçük bir kısmı gözden çıkar, kavga etme.", sonuc: { para: -14, mutluluk: -2, mesaj: "Kavga etmemek için küçük bir kısmı gözden çıkardın; için biraz burkuldu." } },
      ],
    },
  },
  {
    anahtar: "oc13_firtinada_denizci",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "⛵",
    baslik: "Fırtınadan Kaçan Gemici",
    metin: "Limanda, fırtınadan kaçıp kıyıya vuran bitkin bir gemici yatıyor. Elbiseleri paramparça, kimseyi tanımıyor.",
    yardim: {
      metin: "Onu evine götür, ısıt ve doyur.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Gemiciyi evine götürüp ısıttın, doyurdun; birkaç gün sonra kendine gelip teşekkür ederek ayrıldı." },
    },
    reddet: {
      metin: "Limanda kalsın, karışma.",
      sonuc: { mutluluk: -1, mesaj: "Limanda kalmasına izin verip karışmadın; ne olduğunu hiç öğrenemedin." },
    },
    olumlu: {
      baslik: "Kaptan Olan Gemicinin Ziyareti",
      metin: "O gün kurtardığın gemici, şimdi kendi gemisinin kaptanı olmuş; zengin bir tüccar filosuyla limana demir attı. Seni bulup teşekkür ediyor.",
      gorsel: "⚓",
      secenekler: [
        { metin: "Onunla ticarete gir.", sonuc: { para: 28, ticaret_sermaye_artis: 8, mutluluk: 2, mesaj: "Onunla küçük bir ticarete girdin; kazancın hatırı sayılır bir şekilde arttı." } },
        { metin: "Sadece dostluğunu kabul et.", sonuc: { dost_puani: 6, mutluluk: 9, ahlak: 4, mesaj: "Ticarete girmedin, sadece dostluğunu kabul ettin; limana her uğradığında seni ziyaret etti." } },
      ],
    },
    olumsuz: {
      baslik: "Batık Geminin Suçlaması",
      metin: "O gün limanda bıraktığın gemici aslında bir sonraki fırtınada hayatını kaybetmiş. Ailesi, o gün ona yardım etmediğini duyunca seni suçluyor.",
      gorsel: "🌊",
      secenekler: [
        { metin: "Aileye maddi destek sun.", sonuc: { para: -12, ahlak: 2, mesaj: "Aileye maddi destek sunarak vicdanını rahatlatmaya çalıştın." } },
        { metin: "Sorumluluğu kabul etme.", sonuc: { mutluluk: -4, un: -3, mesaj: "Sorumluluğu kabul etmedin; ama o gecenin hatırası zihninde uzun süre kaldı." } },
      ],
    },
  },
  {
    anahtar: "oc14_ceyiz_yardimi",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "💐",
    baslik: "Çeyizsiz Kalan Genç Kız",
    metin: "Fakir bir ailenin kızı, çeyizi olmadığı için evlenemiyor. Ailesi utanç içinde senden yardım rica ediyor.",
    yardim: {
      metin: "Çeyizine katkıda bulun.",
      sonuc: { para: -8, ahlak: 3, mutluluk: 3, mesaj: "Çeyizine cömertçe katkıda bulundun; ailenin gözlerindeki minnet paha biçilmezdi." },
    },
    reddet: {
      metin: "Bu senin derdin değil, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Bu senin derdin değil deyip reddettin; aile mahcup bir şekilde ayrıldı." },
    },
    olumlu: {
      baslik: "İyi Bir Aileye Gelin Giden Kız",
      metin: "O gün çeyizine yardım ettiğin kız, şimdi saygın ve zengin bir aileye gelin gitmiş. Kayınpederi, sana bir şükran ziyareti için geldi.",
      gorsel: "👰",
      secenekler: [
        { metin: "Ziyaretini ve hediyesini kabul et.", sonuc: { para: 20, un: 2, mutluluk: 2, mesaj: "Kayınpeder değerli bir hediyeyle geldi: \"Kızımıza gösterdiğin iyiliği hiç unutmadık.\" dedi." } },
        { metin: "Sadece iyi dileklerini kabul et.", sonuc: { ahlak: 6, dost_puani: 5, mutluluk: 6, mesaj: "Hediyeyi kabul etmedin, sadece dostane ziyaretlerini kabul ettin; aile seni hep hatırladı." } },
      ],
    },
    olumsuz: {
      baslik: "Kırgın Ailenin Dedikodusu",
      metin: "O gün yardım etmediğin aile, kızlarını çok geç ve kötü şartlarda evlendirmek zorunda kalmış. Şimdi çevrede senin ne kadar cimri olduğunu anlatıyorlar.",
      gorsel: "🗯️",
      secenekler: [
        { metin: "Geç de olsa yardım teklif et.", sonuc: { para: -10, ahlak: 2, mesaj: "Geç de olsa yardım teklif ettin; aile şaşırsa da kabul etti, dedikodular yavaşça dindi." } },
        { metin: "Umursama, kendi haline bırak.", sonuc: { un: -4, mutluluk: -2, mesaj: "Umursamadın; ama söylentiler bir süre çevrende dolaştı." } },
      ],
    },
  },
  {
    anahtar: "oc15_kacak_yardim",
    cag: ORTA_CAG,
    kategori: "siyaset",
    gorsel: "🌙",
    baslik: "Gizlenen Bir Kaçak",
    metin: "Gece yarısı kapını çalan bir kaçak, kendisine bir gecelik sığınak ve biraz azık rica ediyor. Kim olduğunu, ne yaptığını bilmiyorsun.",
    yardim: {
      metin: "Ona gizlice yardım et.",
      sonuc: { para: -3, ahlak: 2, suc_artis: 3, mesaj: "Gizlice yardım ettin; kaçak şafaktan önce sessizce ayrıldı, minnetle." },
    },
    reddet: {
      metin: "Riske giremem, geri çevir.",
      sonuc: { mesaj: "Riske giremeyeceğini söyleyip geri çevirdin; adam karanlığa karışıp gitti." },
    },
    olumlu: {
      baslik: "Saygın Biri Olan Eski Kaçak",
      metin: "O gece gizlice yardım ettiğin kaçak, aslında haksız yere suçlanmış biriymiş. Şimdi adı temizlenmiş, saygın bir konuma gelmiş ve sana borcunu ödemek istiyor.",
      gorsel: "🕯️",
      secenekler: [
        { metin: "Yardımını kabul et.", sonuc: { para: 24, kariyer_puani_artis: 8, mutluluk: 2, mesaj: "Nüfuzunu kullanarak sana önemli bir kapı araladı; \"O gece bana inandın, ben de sana inanıyorum.\" dedi." } },
        { metin: "Sadece dostluğunu kabul et.", sonuc: { dost_puani: 6, mutluluk: 9, ahlak: 5, mesaj: "Maddi bir şey istemedin; yılların ötesinden gelen bu dostluk seni derinden duygulandırdı." } },
      ],
    },
    olumsuz: {
      baslik: "Azılı Bir Suçlunun Tehdidi",
      metin: "O gece kapını çalan kaçak aslında gerçekten tehlikeli bir suçluymuş; şimdi seni o gece geri çevirdiğin için hedef almış görünüyor.",
      gorsel: "🔪",
      secenekler: [
        { metin: "Muhafızlardan koruma iste.", sonuc: { para: -10, mutluluk: -3, mesaj: "Muhafızlardan koruma istedin; pahalıya patladı ama en kötüsünü önledin." } },
        { metin: "Kendi başına göğüs ger.", sonuc: { saglik: -5, mutluluk: -4, mesaj: "Kendi başına göğüs germeye çalıştın; ufak bir çatışmadan yara bereyle kurtuldun." } },
      ],
    },
  },

  // ============================================================
  // SANAYİ DEVRİMİ (15)
  // ============================================================
  {
    anahtar: "sd01_sokak_cocugu",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "🧢",
    baslik: "Fabrika Kapısındaki Çocuk",
    metin: "Fabrikanın önünde, paçavralar içinde küçük bir sokak çocuğu iş ya da birkaç kuruş için yalvarıyor.",
    yardim: {
      metin: "Ona iş ver ya da para bağışla.",
      sonuc: { para: -4, ahlak: 3, mutluluk: 2, mesaj: "Çocuğa küçük bir iş ve birkaç kuruş verdin; yüzünde minik bir gülümseme belirdi." },
    },
    reddet: {
      metin: "Herkes bunu ister, geç.",
      sonuc: { mutluluk: -1, mesaj: "Herkesin aynı şeyi istediğini düşünüp geçtin; çocuk başka bir kapıya yöneldi." },
    },
    olumlu: {
      baslik: "Fabrika Sahibi Olan Çocuk",
      metin: "O gün küçük bir iş verdiğin çocuk, şimdi kendi fabrikasının sahibi olmuş. Seni o günkü iyiliğin için bulmaya gelmiş.",
      gorsel: "🏭",
      secenekler: [
        { metin: "Onunla iş ortaklığı kur.", sonuc: { para: 30, kariyer_puani_artis: 8, mutluluk: 2, mesaj: "Onunla küçük bir iş ortaklığı kurdun; kazancınız ikinizi de memnun etti." } },
        { metin: "Ortaklık isteme, sadece tebrik et.", sonuc: { mutluluk: 10, dost_puani: 5, ahlak: 4, mesaj: "Hiçbir çıkar gözetmeden sadece tebrik ettin; onun gözünde daha da değerli oldun." } },
      ],
    },
    olumsuz: {
      baslik: "Suça Bulaşan Çocuk",
      metin: "O gün geri çevirdiğin çocuk, sokakta büyüyüp bir çete işine karışmış. Şimdi karşına çıkıp geçmişteki kayıtsızlığının bedelini istiyor.",
      gorsel: "🕶️",
      secenekler: [
        { metin: "İstediğini vererek uzaklaştır.", sonuc: { para: -10, mutluluk: -3, mesaj: "İstediğini verip uzaklaştırdın; ama bu karşılaşma tedirginliğini uzun süre sürdürdü." } },
        { metin: "Polise/yetkiliye bildir.", sonuc: { suc_artis: -2, rakip_puani: -4, mesaj: "Durumu yetkiliye bildirdin; sorun çözüldü ama sokaklarda adın bir süre anıldı." } },
      ],
    },
  },
  {
    anahtar: "sd02_grevci_isci",
    cag: SANAYI,
    kategori: "siyaset",
    gorsel: "✊",
    baslik: "Greve Çıkan Bir İşçi",
    metin: "Fabrikada greve öncülük eden genç bir işçi, işten atılma tehdidiyle karşı karşıya. Senden destek istiyor.",
    yardim: {
      metin: "Onun yanında dur, destek ol.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Onun yanında durup destek oldun; yönetim bundan hiç hoşlanmasa da işçi işini korudu." },
    },
    reddet: {
      metin: "Başını derde sokma, uzak dur.",
      sonuc: { mutluluk: -1, mesaj: "Başını derde sokmamak için uzak durdun; işçi hayal kırıklığıyla senden ayrıldı." },
    },
    olumlu: {
      baslik: "Sendika Lideri Oldu",
      metin: "O gün destek olduğun genç işçi, şimdi güçlü bir sendikanın lideri olmuş. Seni bulup, ihtiyacın olduğunda arkanda duracağını söylüyor.",
      gorsel: "🤝",
      secenekler: [
        { metin: "İşçi hattından destek al.", sonuc: { kariyer_puani_artis: 10, un: 2, mutluluk: 2, mesaj: "Sendikadan aldığın destek, işlerinde beklenmedik kapılar açtı." } },
        { metin: "Sadece dostluğunu kabul et.", sonuc: { dost_puani: 6, mutluluk: 9, ahlak: 4, mesaj: "Herhangi bir çıkar gözetmeden dostluğunu kabul ettin; yıllar sonra bile seni unutmadı." } },
      ],
    },
    olumsuz: {
      baslik: "Kin Güden Eski İşçi",
      metin: "O gün desteklemediğin işçi, sendikada güçlenmiş; şimdi senin işine kasıtlı engeller çıkararak eski kırgınlığının hesabını soruyor.",
      gorsel: "🧱",
      secenekler: [
        { metin: "Aranızı düzeltmeye çalış.", sonuc: { para: -8, mutluluk: -2, mesaj: "Aranızı düzeltmek için görüştün; kısmen yumuşadı ama tam güven kalmadı." } },
        { metin: "Engellere rağmen devam et.", sonuc: { para: -12, mutluluk: -3, mesaj: "Engellere rağmen devam ettin; işlerin bir süre sekteye uğradı." } },
      ],
    },
  },
  {
    anahtar: "sd03_genc_mucit",
    cag: SANAYI,
    kategori: "zanaat",
    gorsel: "⚙️",
    baslik: "Sermayesiz Bir Mucit",
    metin: "Genç bir mucit, parlak görünen ama kimsenin inanmadığı bir icadı için küçük bir sermaye desteği istiyor.",
    yardim: {
      metin: "Ona küçük bir sermaye ver.",
      sonuc: { para: -8, ahlak: 2, mutluluk: 2, mesaj: "Ona küçük bir sermaye verdin; gözlerindeki heyecan seni de umutlandırdı." },
    },
    reddet: {
      metin: "Riskli görünüyor, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Riskli görünüyor deyip reddettin; mucit başka kapılar çalmaya gitti." },
    },
    olumlu: {
      baslik: "Zengin Sanayici Oldu",
      metin: "O gün sermaye verdiğin genç mucit, icadıyla zengin bir sanayici olmuş. Şimdi seni ortağı yapmak istiyor.",
      gorsel: "🏗️",
      secenekler: [
        { metin: "Ortaklığı kabul et.", sonuc: { para: 34, ticaret_sermaye_artis: 10, mutluluk: 2, mesaj: "Ortaklığı kabul ettin; sanayisinin bir parçası olarak kazancın kayda değer arttı." } },
        { metin: "Yalnız yatırımının karşılığını al.", sonuc: { para: 14, mutluluk: 9, ahlak: 4, mesaj: "Ortaklığa girmedin, sadece yatırımının karşılığını fazlasıyla aldın." } },
      ],
    },
    olumsuz: {
      baslik: "Çalınan İcadın Bedeli",
      metin: "O gün yardım etmediğin mucit, icadını korumak için gereken parayı bulamamış; icadı rakip biri tarafından çalınmış, bu da piyasanda seni de zarara uğrattı.",
      gorsel: "💥",
      secenekler: [
        { metin: "Kaybı tazmin etmeye çalış.", sonuc: { para: -14, mesaj: "Kaybı tazmin etmeye çalıştın, kısmen başardın." } },
        { metin: "Kaybı kabullen, geç.", sonuc: { para: -18, mutluluk: -3, mesaj: "Kaybı kabullendin; keşke o gün yardım etseydim diye düşündün." } },
      ],
    },
  },
  {
    anahtar: "sd04_yetimhane",
    cag: SANAYI,
    kategori: "din",
    gorsel: "🏠",
    baslik: "Yetimhaneye Bağış",
    metin: "Şehrin kenar mahallesindeki yetimhane, yıkılmanın eşiğinde. Yöneticisi kapı kapı dolaşıp bağış topluyor.",
    yardim: {
      metin: "Cömert bir bağışta bulun.",
      sonuc: { para: -10, ahlak: 3, mutluluk: 2, mesaj: "Cömert bir bağışta bulundun; yönetici gözyaşlarını tutamadı." },
    },
    reddet: {
      metin: "Elinde fazla yok, geri çevir.",
      sonuc: { mutluluk: -1, mesaj: "Elinde fazla olmadığını söyleyip geri çevirdin; yönetici hayal kırıklığıyla ayrıldı." },
    },
    olumlu: {
      baslik: "Yetiştirdiğin Bir Doktor",
      metin: "O gün bağışının kurtardığı yetimhanede büyüyen bir kız, şimdi şehrin saygın bir doktoru/öğretmeni olmuş. Seni ziyarete geldi.",
      gorsel: "🩺",
      secenekler: [
        { metin: "Onun tıbbi/eğitim yardımını kabul et.", sonuc: { saglik: 8, mutluluk: 3, mesaj: "Sana ücretsiz bakım/danışmanlık sundu: \"O yetimhane olmasaydı bugün burada olamazdım.\" dedi." } },
        { metin: "Sadece gurur duy, yardım isteme.", sonuc: { mutluluk: 9, ahlak: 6, mesaj: "Hiçbir şey istemedin; sadece iyi biri olduğunu görmek sana yetti." } },
      ],
    },
    olumsuz: {
      baslik: "Kapanan Yetimhanenin İzi",
      metin: "O gün bağış yapmadığın yetimhane sonunda kapanmış; oradan çıkan çocuklardan biri, sokakta seninle karşılaşınca eski öfkesini kusuyor.",
      gorsel: "😤",
      secenekler: [
        { metin: "Şimdi telafi etmeye çalış.", sonuc: { para: -12, ahlak: 2, mesaj: "Geç de olsa telafi etmeye çalıştın; tam bir af alamasan da vicdanın rahatladı." } },
        { metin: "Geçmişi geçmişte bırak.", sonuc: { mutluluk: -4, un: -3, mesaj: "Geçmişi geçmişte bıraktın; ama o öfkeli bakış aklından çıkmadı." } },
      ],
    },
  },
  {
    anahtar: "sd05_yarali_gazeteci",
    cag: SANAYI,
    kategori: "siyaset",
    gorsel: "📰",
    baslik: "Dövülmüş Bir Gazeteci",
    metin: "Sokakta, yazdığı bir yazı yüzünden dövülmüş genç bir gazeteci yatıyor. Kimse yardım etmeye yanaşmıyor, başı belaya girmesin diye.",
    yardim: {
      metin: "Ona yardım et, güvenli bir yere götür.",
      sonuc: { para: -4, saglik: -1, ahlak: 3, mesaj: "Onu güvenli bir yere götürüp yaralarını sardırdın; sana minnetle baktı." },
    },
    reddet: {
      metin: "Başını derde sokma, geç.",
      sonuc: { mutluluk: -1, mesaj: "Başını derde sokmak istemedin, geçtin; gazetecinin akıbetini hiç öğrenemedin." },
    },
    olumlu: {
      baslik: "Ünlü Bir Kalemin Şükranı",
      metin: "O gün yardım ettiğin genç gazeteci, şimdi şehrin en okunan yazarlarından biri olmuş. Yazılarında seni örnek bir vatandaş olarak övüyor.",
      gorsel: "🖋️",
      secenekler: [
        { metin: "Övgüyü ve gelen ilgiyi kabul et.", sonuc: { un: 5, mutluluk: 3, mesaj: "Yazısı büyük ilgi gördü; adın kısa sürede olumlu anlamda konuşulur oldu." } },
        { metin: "Mütevazı kal, ilgiyi reddet.", sonuc: { ahlak: 6, dost_puani: 5, mutluluk: 6, mesaj: "İlgiyi reddedip mütevazı kaldın; bu tavrın gazetecinin gözünde seni daha da değerli kıldı." } },
      ],
    },
    olumsuz: {
      baslik: "Kalem Düşmanın Oldu",
      metin: "O gün yardım etmediğin gazeteci hayatta kalmış ama seni de o gün kayıtsız kalanlar arasında yazmış. Şimdi kalemiyle seni sert şekilde eleştiriyor.",
      gorsel: "✒️",
      secenekler: [
        { metin: "Onunla görüşüp durumu açıklamaya çalış.", sonuc: { para: -6, mutluluk: -2, mesaj: "Görüşüp açıklamaya çalıştın; tam ikna olmasa da yazıları biraz yumuşadı." } },
        { metin: "Eleştirilere aldırma.", sonuc: { un: -6, mutluluk: -3, mesaj: "Eleştirilere aldırmadın; ama adının bir süre kötü anılması hoşuna gitmedi." } },
      ],
    },
  },
  {
    anahtar: "sd06_muhacir_aile",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "🧳",
    baslik: "Göç Eden Bir Aile",
    metin: "Şehre yeni gelen, barınacak yeri olmayan bir muhacir aile, geçici olarak senin çatı katında kalmak için izin istiyor.",
    yardim: {
      metin: "Onlara barınak ver.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Onlara çatı katında geçici bir barınak verdin; minnetlerini defalarca dile getirdiler." },
    },
    reddet: {
      metin: "Evinde yer yok, geri çevir.",
      sonuc: { mutluluk: -1, mesaj: "Evinde yer olmadığını söyleyip geri çevirdin; aile başka bir kapı aramaya gitti." },
    },
    olumlu: {
      baslik: "Kurduğu İşin Karşılığı",
      metin: "O gün barındırdığın ailenin reisi, şimdi kendi işini kurmuş, iyi para kazanan bir esnaf olmuş. Sana bir minnet ziyaretine geldi.",
      gorsel: "🛍️",
      secenekler: [
        { metin: "İşine küçük bir ortak ol.", sonuc: { para: 24, ticaret_sermaye_artis: 6, mutluluk: 2, mesaj: "İşine küçük bir ortak oldun; kazancınız her iki tarafı da memnun etti." } },
        { metin: "Sadece ziyaretini kabul et.", sonuc: { dost_puani: 6, mutluluk: 9, ahlak: 4, mesaj: "Ortaklık istemedin, sadece dostane ziyaretini kabul ettin." } },
      ],
    },
    olumsuz: {
      baslik: "Dolandırılan Güven",
      metin: "O gün geri çevirdiğin ailenin bir üyesi, kötü yola düşmüş ve şimdi senin adını kullanarak insanları dolandırıyor.",
      gorsel: "🎩",
      secenekler: [
        { metin: "Durumu yetkiliye bildir.", sonuc: { para: -6, un: -2, mesaj: "Durumu yetkiliye bildirdin; sorun çözüldü ama adının anılması hoş olmadı." } },
        { metin: "Sessizce takip et, müdahale etme.", sonuc: { un: -5, mutluluk: -3, mesaj: "Sessizce takip ettin ama dolandırıcılık bir süre daha devam etti, adın zarar gördü." } },
      ],
    },
  },
  {
    anahtar: "sd07_hasta_isci",
    cag: SANAYI,
    kategori: "saglik",
    gorsel: "💊",
    baslik: "Hastalanan Bir Fabrika İşçisi",
    metin: "Fabrikada birlikte çalıştığın bir işçi, ağır bir hastalığa yakalanmış ama ilaç parası yok. Senden yardım istiyor.",
    yardim: {
      metin: "İlaç parasını karşıla.",
      sonuc: { para: -7, ahlak: 3, mutluluk: 2, mesaj: "İlaç parasını karşıladın; işçi gözyaşlarıyla teşekkür etti." },
    },
    reddet: {
      metin: "Senin derdin değil, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Senin derdin olmadığını düşünüp reddettin; işçi umutsuzca uzaklaştı." },
    },
    olumlu: {
      baslik: "İyileşen İşçinin Vefası",
      metin: "O gün ilaç parasını karşıladığın işçi tamamen iyileşmiş, şimdi ustabaşı olmuş. Sana her zaman sadık kalacağını söylüyor.",
      gorsel: "🔧",
      secenekler: [
        { metin: "Onu yakın çalışanın yap.", sonuc: { kariyer_puani_artis: 8, mutluluk: 3, mesaj: "Onu yanına aldın; sadakati ve becerisi işlerine hızla katkı sağladı." } },
        { metin: "Sadece dostluğunu kabul et.", sonuc: { dost_puani: 6, ahlak: 5, mutluluk: 6, mesaj: "İş teklif etmedin, sadece dostluğunu kabul ettin; bu bağ yıllarca sürdü." } },
      ],
    },
    olumsuz: {
      baslik: "Ailesinin Kırgınlığı",
      metin: "O gün yardım etmediğin işçi hastalığına yenik düşmüş. Ailesi seninle karşılaşınca o günkü kayıtsızlığını yüzüne vuruyor.",
      gorsel: "😢",
      secenekler: [
        { metin: "Aileye destek olmaya çalış.", sonuc: { para: -10, ahlak: 2, mesaj: "Geç de olsa aileye destek olmaya çalıştın; kısmen gönülleri aldın." } },
        { metin: "Suçluluk hissetme, geç.", sonuc: { mutluluk: -5, mesaj: "Suçluluk hissetmemeye çalıştın ama o bakış aklından uzun süre çıkmadı." } },
      ],
    },
  },
  {
    anahtar: "sd08_genc_kadin_egitim",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "📚",
    baslik: "Okumak İsteyen Genç Bir Kadın",
    metin: "Genç bir kadın, döneminin geleneklerine rağmen okumak istiyor ama kitap ve ders parası bulamıyor. Senden destek rica ediyor.",
    yardim: {
      metin: "Eğitimine destek ol.",
      sonuc: { para: -6, ahlak: 3, mutluluk: 2, mesaj: "Eğitimine destek oldun; gözlerindeki kararlılık seni etkiledi." },
    },
    reddet: {
      metin: "Bu senin işin değil, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Bu senin işin değil deyip reddettin; kadın hayal kırıklığıyla ayrıldı." },
    },
    olumlu: {
      baslik: "Öğretmen/Yazar Olan Kadın",
      metin: "O gün eğitimine destek olduğun kadın, şimdi saygın bir öğretmen/yazar olmuş. Sana açık bir teşekkür mektubu ve küçük bir armağan gönderdi.",
      gorsel: "🖋️",
      secenekler: [
        { metin: "Armağanı ve teşekkürü kabul et.", sonuc: { un: 3, mutluluk: 3, mesaj: "Mektubu çok kişi okudu; adın toplumda olumlu bir şekilde anılmaya başladı." } },
        { metin: "Mütevazı kal, sadece gurur duy.", sonuc: { ahlak: 6, mutluluk: 8, mesaj: "İlgiyi büyütmeden mütevazı kaldın; ama içten içe büyük bir gurur duydun." } },
      ],
    },
    olumsuz: {
      baslik: "Kötü Şöhretli Bir Adın Anılması",
      metin: "O gün desteklemediğin kadın, zor günler geçirmiş ve sonunda kötü şöhretli bir çevreye düşmüş. Şimdi bir skandalda senin de adı geçiyor — sanki suçlusun gibi.",
      gorsel: "📰",
      secenekler: [
        { metin: "Adını temizlemek için uğraş.", sonuc: { para: -10, un: -2, mesaj: "Adını temizlemek için epey uğraştın, sonunda kısmen başardın." } },
        { metin: "Zamanla unutulur de.", sonuc: { un: -6, mutluluk: -3, mesaj: "Zamanla unutulacağını düşündün; ama dedikodular bir süre canını sıktı." } },
      ],
    },
  },
  {
    anahtar: "sd09_borclu_esnaf",
    cag: SANAYI,
    kategori: "ticaret",
    gorsel: "🏪",
    baslik: "Kapanmanın Eşiğindeki Esnaf",
    metin: "Küçük bir esnaf, borçlarını ödeyemediği için dükkânını kapatmak üzere. Senden kefil olmanı ya da borç vermeni rica ediyor.",
    yardim: {
      metin: "Ona kefil ol / borç ver.",
      sonuc: { para: -10, ahlak: 2, mesaj: "Ona kefil olup borç verdin; adam gözyaşlarını tutamayarak teşekkür etti." },
    },
    reddet: {
      metin: "Riski göze alamam, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Riski göze alamayıp reddettin; esnaf umutsuzca dükkânına döndü." },
    },
    olumlu: {
      baslik: "Toparlanan İşin Karşılığı",
      metin: "O gün desteklediğin esnaf, işini toparlamış ve şimdi birkaç şubesi olan bir tüccar olmuş. Borcunu fazlasıyla ödemeye geldi.",
      gorsel: "🏬",
      secenekler: [
        { metin: "Fazlasını kabul et.", sonuc: { para: 32, mutluluk: 3, mesaj: "Borcunu üç katıyla geri ödedi: \"O gün beni kurtardın.\" dedi." } },
        { metin: "Yalnızca anaparayı al.", sonuc: { para: 10, ahlak: 6, dost_puani: 5, mutluluk: 4, mesaj: "Fazlasını istemedin; bu tavrın adamın gözünde seni daha da değerli kıldı." } },
      ],
    },
    olumsuz: {
      baslik: "Batan Esnafın Öfkesi",
      metin: "O gün desteklemediğin esnaf iflas etmiş, her şeyini kaybetmiş. Şimdi karşına çıkıp o gün neden yardım etmediğini soruyor, seni suçluyor.",
      gorsel: "📉",
      secenekler: [
        { metin: "Geç de olsa bir şeyler yap.", sonuc: { para: -12, ahlak: 2, mesaj: "Geç de olsa yardım etmeye çalıştın; adam tam olarak affetmese de biraz yumuşadı." } },
        { metin: "Sorumluluk kabul etme.", sonuc: { mutluluk: -4, un: -3, mesaj: "Sorumluluk kabul etmedin; ama bu karşılaşma seni bir süre rahatsız etti." } },
      ],
    },
  },
  {
    anahtar: "sd10_savas_gazisi",
    cag: SANAYI,
    kategori: "savas",
    gorsel: "🎖️",
    baslik: "İş Arayan Bir Gazi",
    metin: "Savaştan sakat dönmüş bir gazi, iş bulamadığı için sokaklarda geziniyor. Senden ona bir iş vermeni rica ediyor.",
    yardim: {
      metin: "Ona bir iş bul.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Ona kapasitesine uygun bir iş buldun; gözlerinde uzun zamandır görmediğin bir umut belirdi." },
    },
    reddet: {
      metin: "İş yerinde yerin yok, reddet.",
      sonuc: { mutluluk: -1, mesaj: "İş yerinde yerinin olmadığını söyleyip reddettin; gazi başını eğip uzaklaştı." },
    },
    olumlu: {
      baslik: "Sadık Bir Yardımcı",
      metin: "O gün iş verdiğin gazi, yıllardır sana en sadık çalışanlardan biri olmuş. Şimdi sana özel bir hizmetle karşılık vermek istiyor.",
      gorsel: "🤲",
      secenekler: [
        { metin: "Hizmetini kabul et.", sonuc: { kariyer_puani_artis: 10, mutluluk: 3, mesaj: "Sadakati ve deneyimiyle işlerine değerli bir katkı sağladı." } },
        { metin: "Sadece dostluğunu kabul et.", sonuc: { dost_puani: 6, ahlak: 5, mutluluk: 6, mesaj: "Fazladan bir şey istemedin, sadece dostluğunu kabul ettin; bağınız yıllarca sürdü." } },
      ],
    },
    olumsuz: {
      baslik: "Travmanın Getirdiği Sorun",
      metin: "O gün reddettiğin gazi, tedavi göremediği travmasıyla başı derde giren biri olmuş. Şimdi bir olayda senin adın da karışık şekilde geçiyor.",
      gorsel: "⚠️",
      secenekler: [
        { metin: "Ona yardım ederek durumu düzelt.", sonuc: { para: -10, ahlak: 2, mesaj: "Ona geç de olsa yardım ederek durumu düzeltmeye çalıştın." } },
        { metin: "Kendini olaydan uzak tut.", sonuc: { un: -4, mutluluk: -3, mesaj: "Kendini olaydan uzak tuttun ama adının anılması hoşuna gitmedi." } },
      ],
    },
  },
  {
    anahtar: "sd11_ustabasi_firsati",
    cag: SANAYI,
    kategori: "zanaat",
    gorsel: "🛠️",
    baslik: "Yetenekli Bir Genç İşçi",
    metin: "Fabrikanda çalışan genç ve çalışkan bir işçi, ustabaşı olma fırsatı için senden destek istiyor. Diğer ustabaşı adayları daha kıdemli.",
    yardim: {
      metin: "Ona fırsat ver, destekle.",
      sonuc: { para: -3, ahlak: 2, mutluluk: 2, mesaj: "Ona fırsat verip destekledin; genç işçi bu güveni boşa çıkarmayacağına söz verdi." },
    },
    reddet: {
      metin: "Kıdem sırası var, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Kıdem sırasının olduğunu söyleyip reddettin; genç işçi hayal kırıklığıyla döndü." },
    },
    olumlu: {
      baslik: "Sadık Bir Ustabaşı",
      metin: "O gün desteklediğin genç işçi, şimdi güvenilir ve başarılı bir ustabaşı olmuş. Yıllardır seni yukarı taşıyan sadık bir sağ kolun oldu.",
      gorsel: "🏅",
      secenekler: [
        { metin: "Onunla birlikte işini büyüt.", sonuc: { para: 22, uretim_kapasitesi_artis: 12, mutluluk: 2, mesaj: "Birlikte işi büyüttünüz; onun becerisi kazancına doğrudan yansıdı." } },
        { metin: "Sadece güvenini takdir et.", sonuc: { mutluluk: 10, dost_puani: 5, ahlak: 4, mesaj: "Fazladan bir şey istemedin; sadece sadakatinin kıymetini bildin." } },
      ],
    },
    olumsuz: {
      baslik: "Rakibe Geçen Yetenek",
      metin: "O gün fırsat vermediğin genç işçi, rakibinin yanına geçip orada ustabaşı olmuş. Şimdi eski bilgisiyle senin işine zarar veriyor.",
      gorsel: "🏚️",
      secenekler: [
        { metin: "İş yöntemlerini yenile, rekabete uyum sağla.", sonuc: { para: -8, mesaj: "İş yöntemlerini yenilemek epey masraflı oldu ama rekabete ayak uydurdun." } },
        { metin: "Kaybı kabullen.", sonuc: { para: -12, mutluluk: -3, mesaj: "Kaybı kabullendin; o gün ona şans vermemiş olmak canını sıktı." } },
      ],
    },
  },
  {
    anahtar: "sd12_muhendis_laboratuvar",
    cag: SANAYI,
    kategori: "zanaat",
    gorsel: "🔬",
    baslik: "Küçük Bir Laboratuvar İsteyen Mühendis",
    metin: "Genç bir mühendis, geliştirdiği bir makine tasarımı için küçük bir atölye/laboratuvar imkânı istiyor. Kimse ona ciddi bakmıyor.",
    yardim: {
      metin: "Ona küçük bir imkân sağla.",
      sonuc: { para: -9, ahlak: 2, mutluluk: 2, mesaj: "Ona küçük bir atölye imkânı sağladın; hemen çalışmaya koyuldu." },
    },
    reddet: {
      metin: "Boşa harcanacak para de, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Boşa harcanacak para deyip reddettin; mühendis başka kapılar aramaya gitti." },
    },
    olumlu: {
      baslik: "Büyük Bir Buluşun Ortağı",
      metin: "O gün desteklediğin mühendis, geliştirdiği makineyle büyük bir başarı kazanmış. Seni ilk yatırımcısı olarak anıp payını vermek istiyor.",
      gorsel: "⚡",
      secenekler: [
        { metin: "Payını kabul et.", sonuc: { para: 36, ticaret_sermaye_artis: 10, mutluluk: 2, mesaj: "İlk yatırımcısı olarak payını fazlasıyla aldın; kazancın hatırı sayılır arttı." } },
        { metin: "Yalnızca yatırımının karşılığını al.", sonuc: { para: 12, mutluluk: 9, ahlak: 4, mesaj: "Fazlasını istemedin, yalnızca yatırımının karşılığını aldın." } },
      ],
    },
    olumsuz: {
      baslik: "Patlayan Bir Deneyin Bedeli",
      metin: "O gün desteklemediğin mühendis, imkânsızlık içinde acele bir deney yapmış ve işler kötü gitmiş; olay senin de adının geçtiği bir soruşturmaya dönüştü.",
      gorsel: "💣",
      secenekler: [
        { metin: "Soruşturmada gerçeği anlat.", sonuc: { para: -8, mutluluk: -3, mesaj: "Soruşturmada gerçeği anlattın; masrafı oldu ama adın temiz kaldı." } },
        { metin: "Olaydan uzak durmaya çalış.", sonuc: { un: -5, mutluluk: -3, mesaj: "Olaydan uzak durmaya çalıştın; yine de adının anılması hoş olmadı." } },
      ],
    },
  },
  {
    anahtar: "sd13_kimsesiz_cocuk_fabrika",
    cag: SANAYI,
    kategori: "saglik",
    gorsel: "🧒",
    baslik: "Fabrikada Çalışan Kimsesiz Çocuk",
    metin: "Fabrikanda çalışan kimsesiz bir çocuk, ağır işlerden hastalanmış. Onu okula gönderip çalıştırmayı bırakma fırsatı senin elinde.",
    yardim: {
      metin: "Onu koru, okula gönder.",
      sonuc: { para: -6, ahlak: 4, mutluluk: 2, mesaj: "Çocuğu ağır işten alıp okula gönderdin; minik gözlerinde bir umut belirdi." },
    },
    reddet: {
      metin: "Fabrikanın işleyişi bozulmasın, çalıştır.",
      sonuc: { ahlak: -2, mutluluk: -1, mesaj: "Fabrikanın işleyişi bozulmasın diye çocuğu çalıştırmaya devam ettirdin." },
    },
    olumlu: {
      baslik: "Doktor/Mühendis Olan Çocuk",
      metin: "O gün okula gönderdiğin çocuk, şimdi saygın bir doktor/mühendis olmuş. Seni bulup teşekkür ediyor, sana özel bir yardımda bulunmak istiyor.",
      gorsel: "🎓",
      secenekler: [
        { metin: "Yardımını kabul et.", sonuc: { saglik: 8, kariyer_puani_artis: 8, mutluluk: 2, mesaj: "Yardımını kabul ettin; hem sağlığın hem işlerin ondan fayda gördü." } },
        { metin: "Sadece gurur duy.", sonuc: { mutluluk: 9, ahlak: 6, mesaj: "Hiçbir karşılık istemedin; onun bugünkü halini görmek sana yetti." } },
      ],
    },
    olumsuz: {
      baslik: "Suça Sürüklenen Çocuk",
      metin: "O gün çalıştırmaya devam ettirdiğin çocuk, ağır koşullardan kaçıp sokağa düşmüş, sonunda küçük bir çeteye karışmış. Şimdi fabrikanda sorun çıkarıyor.",
      gorsel: "🚨",
      secenekler: [
        { metin: "Onunla ilgilenip durumu düzeltmeye çalış.", sonuc: { para: -10, ahlak: 2, mesaj: "Geç de olsa ilgilenip durumu düzeltmeye çalıştın." } },
        { metin: "Güvenlik önlemi al, uzaklaştır.", sonuc: { para: -6, mutluluk: -3, mesaj: "Güvenlik önlemi alıp uzaklaştırdın; ama vicdanın seni rahat bırakmadı." } },
      ],
    },
  },
  {
    anahtar: "sd14_yangin_komsu",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "🔥",
    baslik: "Yangında Evi Yanan Komşu",
    metin: "Bir yangın, komşu aileyi evsiz bırakmış. Aile, geçici olarak senin evinde/mülkünde kalmayı rica ediyor.",
    yardim: {
      metin: "Onlara yer aç, yardım et.",
      sonuc: { para: -5, ahlak: 3, mutluluk: 2, mesaj: "Onlara yer açıp yardım ettin; aile minnetle gözyaşı döktü." },
    },
    reddet: {
      metin: "Kendi düzenim bozulmasın, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Kendi düzeninin bozulmasını istemeyip reddettin; aile başka bir kapı aramaya gitti." },
    },
    olumlu: {
      baslik: "Toparlanan Komşu Ailenin İyiliği",
      metin: "O gün yardım ettiğin komşu aile, şimdi kendi işini kurmuş, toparlanmış. Sana her zaman minnettar olduklarını gösteren bir jest yapıyorlar.",
      gorsel: "🏡",
      secenekler: [
        { metin: "Jestlerini kabul et.", sonuc: { para: 20, mutluluk: 3, mesaj: "Küçük ama anlamlı bir hediyeyle geldiler: \"O gün bize hayat verdiniz.\" dediler." } },
        { metin: "Sadece komşuluğu sürdür.", sonuc: { dost_puani: 6, ahlak: 5, mutluluk: 6, mesaj: "Hediye istemedin, sadece iyi komşuluğu sürdürdün; bu bağ yıllarca sıcak kaldı." } },
      ],
    },
    olumsuz: {
      baslik: "Rakip Olan Eski Komşu",
      metin: "O gün reddettiğin komşu aile toparlanmakta zorlanmış, sonunda başka biri yardım etmiş. Şimdi o kişiyle iş birliği yapıp senin en büyük rakibin olmuşlar.",
      gorsel: "🏘️",
      secenekler: [
        { metin: "Rekabete rağmen iyi ilişkiler kur.", sonuc: { para: -6, dost_puani: 3, mesaj: "Rekabete rağmen iyi ilişkiler kurmaya çalıştın; kısmen başardın." } },
        { metin: "Rekabete sertçe karşılık ver.", sonuc: { rakip_puani: -6, mutluluk: -3, mesaj: "Rekabete sertçe karşılık verdin; mücadele seni de yordu." } },
      ],
    },
  },
  {
    anahtar: "sd15_sokak_muzisyeni",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "🎻",
    baslik: "Yetenekli Bir Sokak Müzisyeni",
    metin: "Köşe başında keman çalan genç bir müzisyen, para kazanamadığı için enstrümanını satmak üzere. Senden yardım rica ediyor.",
    yardim: {
      metin: "Ona para ver, enstrümanı satmasın.",
      sonuc: { para: -4, ahlak: 2, mutluluk: 3, mesaj: "Ona para verdin, enstrümanını satmaktan vazgeçti; sana minnetle bir parça çaldı." },
    },
    reddet: {
      metin: "Boş hayaller peşinde de, geç.",
      sonuc: { mutluluk: -1, mesaj: "Boş hayaller peşinde olduğunu düşünüp geçtin; müzisyen üzgün bir şekilde uzaklaştı." },
    },
    olumlu: {
      baslik: "Ünlü Olan Sokak Müzisyeni",
      metin: "O gün enstrümanını kurtardığın genç müzisyen, şimdi şehrin en ünlü sanatçılarından biri olmuş. Seni özel bir konserine davet ediyor ve sahneden onurlandırıyor.",
      gorsel: "🎼",
      secenekler: [
        { metin: "Daveti kabul et, onurlandırılmayı yaşa.", sonuc: { un: 5, mutluluk: 4, mesaj: "Konserde sahneden adını andı; salon ayakta seni alkışladı." } },
        { metin: "Sessizce izle, öne çıkma.", sonuc: { mutluluk: 9, ahlak: 5, mesaj: "Öne çıkmadan sessizce izledin; ama içindeki gurur hiç eksilmedi." } },
      ],
    },
    olumsuz: {
      baslik: "Kötü Yola Düşen Müzisyen",
      metin: "O gün yardım etmediğin müzisyen enstrümanını satmış, sonra kötü bir çevreye düşmüş. Şimdi bir skandalda senin adının da anıldığı bir olaya karışmış.",
      gorsel: "🍺",
      secenekler: [
        { metin: "Ona yeniden bir şans ver.", sonuc: { para: -8, ahlak: 2, mesaj: "Geç de olsa ona yeniden bir şans verdin; toparlanması için küçük bir destek oldu." } },
        { metin: "Olaydan tamamen uzak dur.", sonuc: { un: -5, mutluluk: -3, mesaj: "Olaydan tamamen uzak durmaya çalıştın ama adının anılması hoş olmadı." } },
      ],
    },
  },
];

export const OLAY_GECIKMIS_TAKIP: OlayTanimi[] = TEMALAR.flatMap(temaUret);
