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
    metin: "Pazar girişinde yırtık giysili yaşlı bir dilenci elini uzatıyor. Gözlerinde yalvarış yok, tuhaf bir onur var.",
    yardim: {
      metin: "Birkaç sikke uzat.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Birkaç sikke verdin; dilenci içtenlikle teşekkür etti." },
    },
    reddet: {
      metin: "Omuz silk, geç.",
      sonuc: { mutluluk: -1, mesaj: "Görmezden geldin; dilenci arkandan söylendi." },
    },
    olumlu: {
      baslik: "Dilenci Geri Döndü",
      metin: "Yıllar önce para verdiğin dilenci at sırtında kapında. Şehrin zengin tüccarlarından olmuş; sadakanı unutmamış.",
      gorsel: "💰",
      secenekler: [
        { metin: "Minnetini kabul et.", sonuc: { para: 38, mutluluk: 4, dost_puani: 3, mesaj: "Kesesini önüne boşalttı: \"İnsan gibi davrandın, borcumu ödüyorum.\"" } },
        { metin: "Küçük bir hediye al.", sonuc: { para: 14, mutluluk: 9, ahlak: 5, mesaj: "Büyük armağanı reddedip küçük hediyeyle yetindin; adam hayran kaldı." } },
      ],
    },
    olumsuz: {
      baslik: "Unutmayan Dilenci",
      metin: "Görmezden geldiğin dilenci kapında, kalabalık önünde seni utandırıyor: \"Bu adam bana kırıntı bile esirgedi!\"",
      gorsel: "😠",
      secenekler: [
        { metin: "Özür dile, parayı uzat.", sonuc: { para: -6, ahlak: 2, mutluluk: -2, mesaj: "Özür dileyip para verdin; kalabalık dağıldı, utanç kaldı." } },
        { metin: "Geri adım atma.", sonuc: { mutluluk: -6, un: -4, mesaj: "Geri adım atmadın; kalabalık dedikodu yaptı, adın bir süre kötüye çıktı." } },
      ],
    },
  },
  {
    anahtar: "oc02_yarali_yolcu",
    cag: ORTA_CAG,
    kategori: "saglik",
    gorsel: "🩹",
    baslik: "Yol Kenarındaki Yaralı",
    metin: "Yol kenarında soyulmuş, dövülmüş bir yolcu yatıyor. Herkes başını çevirip geçiyor.",
    yardim: {
      metin: "Evine götür, yaralarını sar.",
      sonuc: { para: -4, saglik: -1, ahlak: 4, mesaj: "Yaralıyı evine götürüp sardın; birkaç gün sonra toparlanıp gitti." },
    },
    reddet: {
      metin: "Sen de başını çevir.",
      sonuc: { ahlak: -2, mesaj: "Herkes gibi geçtin; vicdanın bir süre rahat vermedi." },
    },
    olumlu: {
      baslik: "İyileşen Yolcunun Ziyareti",
      metin: "Yaralarını sardığın yolcu saygın bir hekim olmuş. Senin ve ailenin sağlığına bizzat bakmayı öneriyor.",
      gorsel: "🧑‍⚕️",
      secenekler: [
        { metin: "Teklifi kabul et.", sonuc: { saglik: 10, mutluluk: 3, mesaj: "Hekim seni muayene edip ilaç bıraktı; yıllardır olmadığın kadar dinçsin." } },
        { metin: "Tedaviyi başkasına bırak.", sonuc: { mutluluk: 8, ahlak: 3, dost_puani: 4, mesaj: "Tedaviyi muhtaç birine yönlendirdin; hekim hayran kaldı, dostluğunuz pekişti." } },
      ],
    },
    olumsuz: {
      baslik: "Kin Tutan Yabancı",
      metin: "Yardım etmediğin yaralı iyileşmiş ama kin tutuyor. Şimdi nüfuzlu biri; hakkında karanlık söylentiler yayıyor.",
      gorsel: "🗣️",
      secenekler: [
        { metin: "Söylentileri yalanla.", sonuc: { para: -8, mutluluk: -3, mesaj: "Yalanlamak için epey para ve zaman harcadın; tam başaramadın." } },
        { metin: "Umursama.", sonuc: { un: -5, mutluluk: -3, mesaj: "Umursamadın; söylentiler bir süre sürdü, adın zedelendi." } },
      ],
    },
  },
  {
    anahtar: "oc03_bogulan_cocuk",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "🌊",
    baslik: "Nehirde Boğulan Çocuk",
    metin: "Nehir kıyısında küçük bir çocuk akıntıya kapılmış çırpınıyor. Kimse kımıldamıyor.",
    yardim: {
      metin: "Suya atla, çocuğu kurtar.",
      sonuc: { saglik: -2, ahlak: 4, mutluluk: 3, mesaj: "Suya atlayıp çocuğu son anda kurtardın; aile gözyaşlarıyla teşekkür etti." },
    },
    reddet: {
      metin: "Cesaret edemezsin, izle.",
      sonuc: { mutluluk: -3, mesaj: "Giremedin; neyse ki başkası yetişti, ama kendini hep suçladın." },
    },
    olumlu: {
      baslik: "Kurtardığın Çocuk Büyüdü",
      metin: "Kurtardığın çocuk bölgenin saygın bir komutanı/lonca ustası olmuş. Seni unutmadığını, yanında olacağını söylüyor.",
      gorsel: "🎖️",
      secenekler: [
        { metin: "Himayesini kabul et.", sonuc: { un: 6, dost_puani: 4, mutluluk: 4, mesaj: "Nüfuzlu bir dost kazandın; adın şehirde saygıyla anılır oldu." } },
        { metin: "Yalnız minnetini kabul et.", sonuc: { mutluluk: 9, ahlak: 6, mesaj: "Bir şey istemedin, o günü birlikte andınız; içinde derin huzur var." } },
      ],
    },
    olumsuz: {
      baslik: "Vicdan Azabı Geri Döndü",
      metin: "Suya girmediğin için hep kendini suçladın. Şimdi çocuğun ailesiyle karşılaştın; adamın gözündeki hayal kırıklığı duruyor.",
      gorsel: "😔",
      secenekler: [
        { metin: "Özür dile, içini dök.", sonuc: { mutluluk: 3, ahlak: 2, mesaj: "Yıllar sonra özür diledin; af almasan da yükün biraz hafifledi." } },
        { metin: "Konuyu kapat.", sonuc: { mutluluk: -4, mesaj: "Konuyu kapattın ama o bakış aklından çıkmadı." } },
      ],
    },
  },
  {
    anahtar: "oc04_tuccar_borc",
    cag: ORTA_CAG,
    kategori: "ticaret",
    gorsel: "🪙",
    baslik: "Zor Günde Bir Tüccar",
    metin: "Genç bir tüccar kervanı soyulunca iflasın eşiğinde. Borç istiyor, dürüstçe ödeyeceğine yemin ediyor.",
    yardim: {
      metin: "Borç ver.",
      sonuc: { para: -12, ahlak: 2, mesaj: "Birikiminden borç verdin; gözlerinde umut ve utanç vardı." },
    },
    reddet: {
      metin: "Riske girme, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Reddettin; adam başka kapılara gitti." },
    },
    olumlu: {
      baslik: "Zengin Tüccarın Vefası",
      metin: "Borç verdiğin genç tüccar artık kervanları şehirler dolaşan zengin biri. Borcu faiziyle geri getirdi.",
      gorsel: "🐫",
      secenekler: [
        { metin: "Fazlasıyla ödemeyi kabul et.", sonuc: { para: 32, un: 2, mutluluk: 3, mesaj: "Borcu üç katıyla ödedi: \"Sensiz atlatamazdım.\"" } },
        { metin: "Yalnız anaparayı al.", sonuc: { para: 10, ahlak: 6, dost_puani: 5, mutluluk: 4, mesaj: "Fazlasını almadın; adam hayran kalıp ömür boyu dostun oldu." } },
      ],
    },
    olumsuz: {
      baslik: "Reddedilen Tüccarın Kini",
      metin: "Borç vermediğin tüccar iflas edip toparlanmış; şimdi aynı pazarda rakibin ve senden hâlâ nefret ediyor.",
      gorsel: "⚔️",
      secenekler: [
        { metin: "Aranızı düzeltmeye çalış.", sonuc: { para: -6, mutluluk: -2, mesaj: "Aranızı kısmen düzelttin ama epey masraf ettin." } },
        { metin: "Rekabete göğüs ger.", sonuc: { rakip_puani: -6, mutluluk: -3, mesaj: "Rekabete göğüs gerdin; mücadele seni de yordu." } },
      ],
    },
  },
  {
    anahtar: "oc05_yetim_himaye",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "🧒",
    baslik: "Sahipsiz Bir Yetim",
    metin: "Veba ya da savaşta ailesini yitirmiş bir yetim kapında aç ve üşümüş bekliyor. Bakacak kimsesi yok.",
    yardim: {
      metin: "Evine al, himaye et.",
      sonuc: { para: -5, ahlak: 4, mutluluk: 3, mesaj: "Yetimi evine alıp çatı ve sıcak yemek verdin." },
    },
    reddet: {
      metin: "Kendi derdin yeter, geri çevir.",
      sonuc: { mutluluk: -2, mesaj: "Çocuğu geri çevirdin; giderken arkasına bakmadı." },
    },
    olumlu: {
      baslik: "Himaye Ettiğin Yetim Büyüdü",
      metin: "Himayene aldığın yetim saygın bir zanaatkâr/asker olmuş. Elinde özenle hazırladığı bir hediyeyle ziyaretine geldi.",
      gorsel: "🎁",
      secenekler: [
        { metin: "Evine buyur et, birlikte kutla.", sonuc: { mutluluk: 5, dost_puani: 4, mesaj: "Eski günleri andınız; evladın gibi gurur duydun." } },
        { metin: "Yardım isteme, görmekle yetin.", sonuc: { mutluluk: 10, ahlak: 6, mesaj: "Karşılık istemedin; iyi biri olarak yetiştiğini görmek yetti." } },
      ],
    },
    olumsuz: {
      baslik: "Sokakta Büyüyen Öfke",
      metin: "Geri çevirdiğin yetim sokakta büyüyüp şehrin karanlık çevrelerine karışmış. Esirgediğin yardımın bedelini istiyor.",
      gorsel: "🗡️",
      secenekler: [
        { metin: "İstediğini ver, başını kurtar.", sonuc: { para: -14, mutluluk: -3, mesaj: "İstediğini verip kurtuldun; tehdit seni sarstı." } },
        { metin: "Tehdide boyun eğme.", sonuc: { mutluluk: -5, mesaj: "Boyun eğmedin; adam bir süre etrafında dolanıp seni tedirgin etti." } },
      ],
    },
  },
  {
    anahtar: "oc06_esir_cocuk",
    cag: ORTA_CAG,
    kategori: "savas",
    gorsel: "🏳️",
    baslik: "Düşman Saflarından Bir Çocuk",
    metin: "Çarpışmanın ardından düşman saflarından küçük bir çocuk esir alındı. Askerler ne yapılacağını soruyor.",
    yardim: {
      metin: "Merhamet et, ailesine gönder.",
      sonuc: { para: -4, ahlak: 5, mutluluk: 2, mesaj: "Çocuğu güvenle kendi tarafına gönderttin." },
    },
    reddet: {
      metin: "Savaş bu, karışma.",
      sonuc: { ahlak: -3, mesaj: "Savaşın gereği deyip karışmadın; çocuğun akıbetini hiç öğrenmedin." },
    },
    olumlu: {
      baslik: "Eski Düşmanın Şükranı",
      metin: "Merhamet ettiğin çocuk düşman tarafında önemli bir lider olmuş. Elçilerle sana şükran armağanı ve barış teklifi yolluyor.",
      gorsel: "🕊️",
      secenekler: [
        { metin: "Armağanı ve barışı kabul et.", sonuc: { para: 24, un: 3, mutluluk: 3, mesaj: "Armağanı aldın; senin sayende küçük bir barış köprüsü kuruldu." } },
        { metin: "Yalnız dostluğu kabul et.", sonuc: { dost_puani: 6, ahlak: 6, mutluluk: 5, mesaj: "Armağanı reddedip dostluğu aldın; iki tarafta da saygı gördün." } },
      ],
    },
    olumsuz: {
      baslik: "Büyüyen İntikam",
      metin: "Kaderine terk ettiğin çocuk güçlü bir düşman komutanı olmuş, seni hedef alan bir baskın düzenliyor.",
      gorsel: "🔥",
      secenekler: [
        { metin: "Savunmanı güçlendir.", sonuc: { para: -16, saglik: -3, mesaj: "Savunma masraflı ve yorucu oldu ama en kötüsünü savuşturdun." } },
        { metin: "Diplomasiyle yatıştır.", sonuc: { un: -4, mutluluk: -4, mesaj: "Kısmen yatıştırdın ama itibarın biraz zedelendi." } },
      ],
    },
  },
  {
    anahtar: "oc07_kesise_sadaka",
    cag: ORTA_CAG,
    kategori: "din",
    gorsel: "⛪",
    baslik: "Aç Bir Keşiş",
    metin: "Yol kenarında günlerdir aç genç bir keşiş, dua karşılığı sadaka istiyor.",
    yardim: {
      metin: "Yemek ve birkaç sikke ver.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Keşişe yemek ve sikke verdin; içten dua etti." },
    },
    reddet: {
      metin: "Kendi işine bak.",
      sonuc: { ahlak: -1, mesaj: "İlgilenmedin; keşiş sessizce yoluna gitti." },
    },
    olumlu: {
      baslik: "Manastırın Şükranı",
      metin: "Doyurduğun genç keşiş etkili bir manastırın başrahibi olmuş. Kapılarının sana hep açık olduğunu bildiriyor.",
      gorsel: "🙏",
      secenekler: [
        { metin: "Himayeyi kabul et.", sonuc: { ahlak: 2, un: 3, mutluluk: 3, mesaj: "Manastır seni himaye etti; halk seni dürüst, hayırsever bildi." } },
        { metin: "Yalnız dostluğunu kabul et.", sonuc: { dost_puani: 5, mutluluk: 8, ahlak: 4, mesaj: "Himaye istemedin, sadece dostluğu aldın; bağınız yıllarca sürdü." } },
      ],
    },
    olumsuz: {
      baslik: "Kilisenin Soğuk Bakışı",
      metin: "Geri çevirdiğin keşiş artık manastırda etkili. Senin cimri ve merhametsiz olduğun söylentileri yayılıyor.",
      gorsel: "❄️",
      secenekler: [
        { metin: "Kiliseye büyük bağış yap.", sonuc: { para: -18, ahlak: 3, mesaj: "Büyük bağışla telafi ettin; söylentiler bir süre sonra dindi." } },
        { metin: "Umursama, dedikodu geçer.", sonuc: { un: -4, mutluluk: -3, mesaj: "Umursamadın ama söylentiler cemaatte bir süre dolaştı." } },
      ],
    },
  },
  {
    anahtar: "oc08_hasta_yabanci",
    cag: ORTA_CAG,
    kategori: "saglik",
    gorsel: "🤒",
    baslik: "Hastalanan Bir Yabancı",
    metin: "Kervansarayda bir yabancı ateşler içinde yatıyor. Bulaşıcı olabilir diye kimse yaklaşmıyor.",
    yardim: {
      metin: "Yanına git, bak.",
      sonuc: { para: -5, saglik: -2, ahlak: 3, mesaj: "Korkuya aldırmadan baktın; birkaç günde ayağa kalktı." },
    },
    reddet: {
      metin: "Riske girme, uzak dur.",
      sonuc: { mutluluk: -1, mesaj: "Uzak durdun; adamın akıbetini hiç öğrenmedin." },
    },
    olumlu: {
      baslik: "İyileşen Yabancının Sözü",
      metin: "Bakımını üstlendiğin yabancı saygın bir asilzade çıktı. Mektupla sarayında seni ağırlamak istediğini bildiriyor.",
      gorsel: "📜",
      secenekler: [
        { metin: "Daveti kabul et, git.", sonuc: { para: 26, un: 4, mutluluk: 3, mesaj: "Daveti kabul ettin; seni cömertçe ağırladı, adını övgüyle andı." } },
        { metin: "Teşekkür et, gitme.", sonuc: { dost_puani: 5, ahlak: 6, mutluluk: 6, mesaj: "Gitmedin ama mektupla sıcak bir dostluk kurdunuz." } },
      ],
    },
    olumsuz: {
      baslik: "Ölen Yabancının Ailesi",
      metin: "Uzak durduğun yabancı kimse bakmadığı için ölmüş. Ailesi onu neden yalnız bıraktığını sormaya geldi.",
      gorsel: "⚰️",
      secenekler: [
        { metin: "Dürüstçe anlat, özür dile.", sonuc: { mutluluk: -4, ahlak: 2, mesaj: "Dürüstçe anlattın; aile kırgın ayrıldı ama yalan söylemedin." } },
        { metin: "Sorumluluğu üstlenme.", sonuc: { un: -5, mutluluk: -3, mesaj: "Sorumluluk almadın; aile unutmadı, adın bir süre kötü anıldı." } },
      ],
    },
  },
  {
    anahtar: "oc09_gezgin_fal",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "🔮",
    baslik: "Gezgin Fal Bakıcısı",
    metin: "Kasabaya gelen gezgin bir falcı kadın avucuna bakmak için sikke istiyor. Çevredekiler şüpheyle bakıyor.",
    yardim: {
      metin: "Merakına yenil, sikkeyi ver.",
      sonuc: { para: -2, mutluluk: 2, mesaj: "Sikkeyi verdin; kadın avucuna bakıp esrarengiz sözler fısıldadı." },
    },
    reddet: {
      metin: "Boş inanç, uzaklaş.",
      sonuc: { mesaj: "Uzaklaştın; kadın omuz silkip başkasına döndü." },
    },
    olumlu: {
      baslik: "Falcının Gerçek Uyarısı",
      metin: "Yıllar önce avucuna baktırdığın kadının sezgileri gerçekmiş. Karşına çıkıp seni yaklaşan gerçek bir tehlikeye karşı uyarıyor.",
      gorsel: "⚠️",
      secenekler: [
        { metin: "Uyarıyı ciddiye al, tedbir al.", sonuc: { para: -6, saglik: 4, mutluluk: 3, mesaj: "Tedbir aldın; büyük bir belayı ucuz atlattın." } },
        { metin: "Şüpheyle dinle.", sonuc: { mutluluk: 2, mesaj: "Tam inanmasan da aklında tuttun; sonradan işine yaradı." } },
      ],
    },
    olumsuz: {
      baslik: "Dolandırıcı Çıktı",
      metin: "Boş inanç deyip uzaklaştığın kadın usta bir dolandırıcıymış. Adını kullanarak çevrende insanları kandırdığı ortaya çıktı.",
      gorsel: "🎭",
      secenekler: [
        { metin: "Adını temizle.", sonuc: { para: -8, un: -2, mesaj: "Adını temizlemek için uğraştın; kısmen başardın, masrafı cabası." } },
        { metin: "Boş ver, unutulur.", sonuc: { un: -6, mutluluk: -3, mesaj: "Boş verdin ama söylenti bir süre peşini bırakmadı." } },
      ],
    },
  },
  {
    anahtar: "oc10_ciraklik",
    cag: ORTA_CAG,
    kategori: "zanaat",
    gorsel: "🔨",
    baslik: "Yetenekli Bir Çırak Adayı",
    metin: "Fakir bir ailenin oğlu ahşap oymalarıyla yeteneğini gösterip çıraklık istiyor. Ustaların çoğu onu geri çevirmiş.",
    yardim: {
      metin: "Çıraklığa al.",
      sonuc: { para: -4, ahlak: 3, mutluluk: 2, mesaj: "Çırak olarak aldın; gözlerindeki heyecan içini ısıttı." },
    },
    reddet: {
      metin: "Vaktin yok, geri çevir.",
      sonuc: { mutluluk: -1, mesaj: "Vaktin olmadığını söyledin; çocuk hayal kırıklığıyla gitti." },
    },
    olumlu: {
      baslik: "Ustalaşan Eski Çırak",
      metin: "Fırsat verdiğin çocuk bölgenin en aranan ustalarından olmuş. Sana kendi yaptığı değerli bir eser hediye ediyor.",
      gorsel: "🏺",
      secenekler: [
        { metin: "Hediyeyi gururla kabul et.", sonuc: { para: 20, un: 2, mutluluk: 3, mesaj: "Hediyeyi gururla aldın; eserin ardındaki hikâye seni duygulandırdı." } },
        { metin: "Ortak çalışmayı öner.", sonuc: { kariyer_puani_artis: 10, dost_puani: 5, mutluluk: 5, ahlak: 3, mesaj: "Kabul etti; ortaklığınız ikinize de itibar kazandırdı." } },
      ],
    },
    olumsuz: {
      baslik: "Rakip Ustanın Gölgesi",
      metin: "Geri çevirdiğin çocuk başka ustanın yanında yetişip en büyük rakibin olmuş; müşterilerini alıyor.",
      gorsel: "🏭",
      secenekler: [
        { metin: "İşini geliştir, rekabet et.", sonuc: { para: -10, mesaj: "İşini geliştirmek pahalıya patladı; rekabete zor yetiştin." } },
        { metin: "Kaybı kabullen, küçül.", sonuc: { para: -14, mutluluk: -3, mesaj: "İşini küçülttün; eski günleri özledin." } },
      ],
    },
  },
  {
    anahtar: "oc11_esir_asker",
    cag: ORTA_CAG,
    kategori: "savas",
    gorsel: "⚔️",
    baslik: "Esir Düşen Bir Asker",
    metin: "Çarpışmada esir alınan genç bir düşman askeri hayatı için yalvarıyor. Diğerleri onu infaz etmek istiyor.",
    yardim: {
      metin: "Serbest bırak.",
      sonuc: { para: -2, ahlak: 4, rakip_puani: -2, mesaj: "Serbest bıraktın; askerler şaşırsa da kararına saygı duydu." },
    },
    reddet: {
      metin: "Savaşın kuralı, karışma.",
      sonuc: { ahlak: -3, mesaj: "Karışmadın; adamın akıbetiyle bir daha ilgilenmedin." },
    },
    olumlu: {
      baslik: "Eski Esirin Vefası",
      metin: "Serbest bıraktığın genç asker kendi ordusunda saygın bir komutan olmuş. Seni bulup borcunu ödemek istiyor.",
      gorsel: "🛡️",
      secenekler: [
        { metin: "Değerli yardımı kabul et.", sonuc: { para: 22, un: 3, mutluluk: 2, mesaj: "Yardım sundu: \"Hayatımı bağışladın, borcum bu.\"" } },
        { metin: "Yalnız bir uyarı iste.", sonuc: { saglik: 6, mutluluk: 8, ahlak: 4, mesaj: "Yalnız değerli bir uyarı istedin; ileride seni büyük tehlikeden korudu." } },
      ],
    },
    olumsuz: {
      baslik: "Kurtulamayan Öfke",
      metin: "Karışmadığın esir asker infaz edilmiş. Ailesi yıllar sonra seni bulup neden bir şey yapmadığını soruyor.",
      gorsel: "😞",
      secenekler: [
        { metin: "Dürüstçe hesap ver.", sonuc: { mutluluk: -3, ahlak: 2, mesaj: "Dürüstçe hesap verdin; aile kırgın ayrıldı ama kaçmadın." } },
        { metin: "Savaşın kuralıydı de, geç.", sonuc: { un: -4, mutluluk: -4, mesaj: "Geçtin; ama bu karşılaşma seni uzun süre rahatsız etti." } },
      ],
    },
  },
  {
    anahtar: "oc12_kitlik_komsu",
    cag: ORTA_CAG,
    kategori: "ticaret",
    gorsel: "🌾",
    baslik: "Kıtlıkta Bir Komşu",
    metin: "Kıtlık yılında komşu ailenin ambarı boşalmış, çocukları açlıktan zayıf. Senden tahıl istiyorlar.",
    yardim: {
      metin: "Ambarından tahıl ver.",
      sonuc: { para: -6, ahlak: 3, mutluluk: 2, mesaj: "Komşuna tahıl verdin; payın azaldı ama vicdanın rahatladı." },
    },
    reddet: {
      metin: "Önce ailen, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Önce ailen dedin, reddettin; komşun boynu bükük ayrıldı." },
    },
    olumlu: {
      baslik: "Toparlanan Komşunun Şükranı",
      metin: "Kıtlıkta yardım ettiğin komşu bölgenin en zengin çiftçilerinden olmuş. Her yıl bereketinden sana pay ayırıyor.",
      gorsel: "🌻",
      secenekler: [
        { metin: "Yıllık payı kabul et.", sonuc: { para: 18, mutluluk: 3, dost_puani: 2, mesaj: "Payını getirdi: \"O gün bize hayat verdin, unutmadık.\"" } },
        { metin: "Payı reddet, dostluk yeter.", sonuc: { ahlak: 6, dost_puani: 6, mutluluk: 6, mesaj: "Payı reddedip dostluğu istedin; bağınız daha da güçlendi." } },
      ],
    },
    olumsuz: {
      baslik: "Gasp Edilen Hak",
      metin: "Kıtlıkta reddettiğin komşu iyiliği unutmamış; güçlenip sınır iddiasıyla tarlanın bir kısmına el koymaya çalışıyor.",
      gorsel: "🚧",
      secenekler: [
        { metin: "Hakkını mahkemede savun.", sonuc: { para: -10, mesaj: "Savunmak pahalıya patladı ama tarlanı korudun." } },
        { metin: "Küçük payı gözden çıkar.", sonuc: { para: -14, mutluluk: -2, mesaj: "Kavga etmemek için küçük bir kısmı bıraktın; için burkuldu." } },
      ],
    },
  },
  {
    anahtar: "oc13_firtinada_denizci",
    cag: ORTA_CAG,
    kategori: "sosyal",
    gorsel: "⛵",
    baslik: "Fırtınadan Kaçan Gemici",
    metin: "Limanda fırtınadan kaçıp kıyıya vuran bitkin bir gemici yatıyor. Elbiseleri paramparça, kimseyi tanımıyor.",
    yardim: {
      metin: "Evine götür, ısıt, doyur.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Gemiciyi ısıtıp doyurdun; günler sonra teşekkür edip ayrıldı." },
    },
    reddet: {
      metin: "Limanda kalsın, karışma.",
      sonuc: { mutluluk: -1, mesaj: "Karışmadın; ona ne olduğunu hiç öğrenmedin." },
    },
    olumlu: {
      baslik: "Kaptan Olan Gemicinin Ziyareti",
      metin: "Kurtardığın gemici kendi gemisinin kaptanı olmuş; zengin bir filoyla limana demir attı, teşekkür etmeye geldi.",
      gorsel: "⚓",
      secenekler: [
        { metin: "Onunla ticarete gir.", sonuc: { para: 28, ticaret_sermaye_artis: 8, mutluluk: 2, mesaj: "Küçük bir ticarete girdin; kazancın hatırı sayılır arttı." } },
        { metin: "Yalnız dostluğunu kabul et.", sonuc: { dost_puani: 6, mutluluk: 9, ahlak: 4, mesaj: "Ticarete girmedin; limana her uğrayışında seni ziyaret etti." } },
      ],
    },
    olumsuz: {
      baslik: "Batık Geminin Suçlaması",
      metin: "Limanda bıraktığın gemici sonraki fırtınada ölmüş. Ailesi yardım etmediğini duyunca seni suçluyor.",
      gorsel: "🌊",
      secenekler: [
        { metin: "Aileye maddi destek ver.", sonuc: { para: -12, ahlak: 2, mesaj: "Aileye destek olup vicdanını rahatlatmaya çalıştın." } },
        { metin: "Suçu kabul etme.", sonuc: { mutluluk: -4, un: -3, mesaj: "Suçu kabul etmedin; o gecenin hatırası uzun süre kaldı." } },
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
      sonuc: { para: -8, ahlak: 3, mutluluk: 3, mesaj: "Çeyize cömertçe katkıda bulundun; ailenin minneti paha biçilmezdi." },
    },
    reddet: {
      metin: "Senin derdin değil, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Reddettin; aile mahcup ayrıldı." },
    },
    olumlu: {
      baslik: "İyi Bir Aileye Gelin Giden Kız",
      metin: "Çeyizine yardım ettiğin kız saygın, zengin bir aileye gelin gitmiş. Kayınpederi şükran ziyaretine geldi.",
      gorsel: "👰",
      secenekler: [
        { metin: "Ziyareti ve hediyeyi kabul et.", sonuc: { para: 20, un: 2, mutluluk: 2, mesaj: "Değerli bir hediyeyle geldi: \"İyiliğini unutmadık.\"" } },
        { metin: "Yalnız iyi dileği kabul et.", sonuc: { ahlak: 6, dost_puani: 5, mutluluk: 6, mesaj: "Hediyeyi almadın, dostane ziyareti kabul ettin; aile seni hep hatırladı." } },
      ],
    },
    olumsuz: {
      baslik: "Kırgın Ailenin Dedikodusu",
      metin: "Yardım etmediğin aile kızını geç ve kötü şartlarda evlendirmek zorunda kalmış. Şimdi senin cimriliğini anlatıyorlar.",
      gorsel: "🗯️",
      secenekler: [
        { metin: "Geç de olsa yardım teklif et.", sonuc: { para: -10, ahlak: 2, mesaj: "Yardım teklif ettin; aile şaşırsa da kabul etti, dedikodu dindi." } },
        { metin: "Umursama.", sonuc: { un: -4, mutluluk: -2, mesaj: "Umursamadın; söylentiler bir süre dolaştı." } },
      ],
    },
  },
  {
    anahtar: "oc15_kacak_yardim",
    cag: ORTA_CAG,
    kategori: "siyaset",
    gorsel: "🌙",
    baslik: "Gizlenen Bir Kaçak",
    metin: "Gece yarısı kapını bir kaçak çalıyor; bir gecelik sığınak ve azık istiyor. Kim olduğunu bilmiyorsun.",
    yardim: {
      metin: "Gizlice yardım et.",
      sonuc: { para: -3, ahlak: 2, suc_sinifi: "kucuk", mesaj: "Gizlice yardım ettin; kaçak şafaktan önce minnetle ayrıldı." },
    },
    reddet: {
      metin: "Riske girme, geri çevir.",
      sonuc: { mesaj: "Geri çevirdin; adam karanlığa karışıp gitti." },
    },
    olumlu: {
      baslik: "Saygın Biri Olan Eski Kaçak",
      metin: "Gizlice yardım ettiğin kaçak haksız yere suçlanmış biriymiş. Adı temizlenmiş, saygın bir yere gelmiş ve borcunu ödemek istiyor.",
      gorsel: "🕯️",
      secenekler: [
        { metin: "Yardımını kabul et.", sonuc: { para: 24, kariyer_puani_artis: 8, mutluluk: 2, mesaj: "Nüfuzuyla önemli bir kapı araladı: \"O gece bana inandın.\"" } },
        { metin: "Yalnız dostluğunu kabul et.", sonuc: { dost_puani: 6, mutluluk: 9, ahlak: 5, mesaj: "Maddi bir şey istemedin; yılların ardından gelen dostluk seni duygulandırdı." } },
      ],
    },
    olumsuz: {
      baslik: "Azılı Bir Suçlunun Tehdidi",
      metin: "Kapına gelen kaçak gerçekten tehlikeli bir suçluymuş; geri çevirdiğin için seni hedef almış görünüyor.",
      gorsel: "🔪",
      secenekler: [
        { metin: "Muhafızlardan koruma iste.", sonuc: { para: -10, mutluluk: -3, mesaj: "Koruma pahalıya patladı ama en kötüsünü önledi." } },
        { metin: "Kendin göğüs ger.", sonuc: { saglik: -5, mutluluk: -4, mesaj: "Kendin göğüs gerdin; küçük bir çatışmadan yaralı kurtuldun." } },
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
    metin: "Fabrika önünde paçavralar içinde küçük bir sokak çocuğu iş ya da birkaç kuruş istiyor.",
    yardim: {
      metin: "İş ver ya da para bağışla.",
      sonuc: { para: -4, ahlak: 3, mutluluk: 2, mesaj: "Çocuğa küçük bir iş ve birkaç kuruş verdin; yüzü güldü." },
    },
    reddet: {
      metin: "Herkes ister, geç.",
      sonuc: { mutluluk: -1, mesaj: "Geçtin; çocuk başka bir kapıya yöneldi." },
    },
    olumlu: {
      baslik: "Fabrika Sahibi Olan Çocuk",
      metin: "Küçük bir iş verdiğin çocuk kendi fabrikasının sahibi olmuş. Eski iyiliğin için seni bulmaya gelmiş.",
      gorsel: "🏭",
      secenekler: [
        { metin: "İş ortaklığı kur.", sonuc: { para: 30, kariyer_puani_artis: 8, mutluluk: 2, mesaj: "Küçük bir ortaklık kurdun; kazancınız ikinizi de memnun etti." } },
        { metin: "Ortaklık isteme, tebrik et.", sonuc: { mutluluk: 10, dost_puani: 5, ahlak: 4, mesaj: "Çıkar gözetmeden tebrik ettin; gözünde daha da değerlendin." } },
      ],
    },
    olumsuz: {
      baslik: "Suça Bulaşan Çocuk",
      metin: "Geri çevirdiğin çocuk sokakta büyüyüp bir çeteye karışmış. Karşına çıkıp kayıtsızlığının bedelini istiyor.",
      gorsel: "🕶️",
      secenekler: [
        { metin: "İstediğini ver, uzaklaştır.", sonuc: { para: -10, mutluluk: -3, mesaj: "İstediğini verip uzaklaştırdın; karşılaşma seni uzun süre tedirgin etti." } },
        { metin: "Yetkiliye bildir.", sonuc: { suc_artis: -2, rakip_puani: -4, mesaj: "Yetkiliye bildirdin; sorun çözüldü ama adın sokaklarda anıldı." } },
      ],
    },
  },
  {
    anahtar: "sd02_grevci_isci",
    cag: SANAYI,
    kategori: "siyaset",
    gorsel: "✊",
    baslik: "Greve Çıkan Bir İşçi",
    metin: "Greve öncülük eden genç bir işçi işten atılma tehdidi altında. Senden destek istiyor.",
    yardim: {
      metin: "Yanında dur, destek ol.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Destek oldun; yönetim hoşlanmasa da işçi işini korudu." },
    },
    reddet: {
      metin: "Derde girme, uzak dur.",
      sonuc: { mutluluk: -1, mesaj: "Uzak durdun; işçi hayal kırıklığıyla ayrıldı." },
    },
    olumlu: {
      baslik: "Sendika Lideri Oldu",
      metin: "Desteklediğin genç işçi güçlü bir sendikanın lideri olmuş. İhtiyacın olunca arkanda duracağını söylüyor.",
      gorsel: "🤝",
      secenekler: [
        { metin: "İşçi hattından destek al.", sonuc: { kariyer_puani_artis: 10, un: 2, mutluluk: 2, mesaj: "Sendika desteği işlerinde beklenmedik kapılar açtı." } },
        { metin: "Yalnız dostluğunu kabul et.", sonuc: { dost_puani: 6, mutluluk: 9, ahlak: 4, mesaj: "Çıkar gözetmeden dostluğu kabul ettin; yıllar sonra bile unutmadı." } },
      ],
    },
    olumsuz: {
      baslik: "Kin Güden Eski İşçi",
      metin: "Desteklemediğin işçi sendikada güçlenmiş; işine kasıtlı engeller çıkarıp eski kırgınlığın hesabını soruyor.",
      gorsel: "🧱",
      secenekler: [
        { metin: "Aranızı düzeltmeye çalış.", sonuc: { para: -8, mutluluk: -2, mesaj: "Görüştün; kısmen yumuşadı ama tam güven kalmadı." } },
        { metin: "Engellere rağmen sürdür.", sonuc: { para: -12, mutluluk: -3, mesaj: "Sürdürdün; işlerin bir süre sekteye uğradı." } },
      ],
    },
  },
  {
    anahtar: "sd03_genc_mucit",
    cag: SANAYI,
    kategori: "zanaat",
    gorsel: "⚙️",
    baslik: "Sermayesiz Bir Mucit",
    metin: "Genç bir mucit, kimsenin inanmadığı parlak icadı için küçük bir sermaye istiyor.",
    yardim: {
      metin: "Küçük sermaye ver.",
      sonuc: { para: -8, ahlak: 2, mutluluk: 2, mesaj: "Sermaye verdin; gözlerindeki heyecan seni de umutlandırdı." },
    },
    reddet: {
      metin: "Riskli, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Riskli deyip reddettin; mucit başka kapılara gitti." },
    },
    olumlu: {
      baslik: "Zengin Sanayici Oldu",
      metin: "Sermaye verdiğin genç mucit icadıyla zengin bir sanayici olmuş. Seni ortak yapmak istiyor.",
      gorsel: "🏗️",
      secenekler: [
        { metin: "Ortaklığı kabul et.", sonuc: { para: 34, ticaret_sermaye_artis: 10, mutluluk: 2, mesaj: "Ortak oldun; kazancın kayda değer arttı." } },
        { metin: "Yalnız yatırımını geri al.", sonuc: { para: 14, mutluluk: 9, ahlak: 4, mesaj: "Ortak olmadın, yatırımının karşılığını fazlasıyla aldın." } },
      ],
    },
    olumsuz: {
      baslik: "Çalınan İcadın Bedeli",
      metin: "Yardım etmediğin mucit icadını koruyacak parayı bulamamış; icadı rakibe çalınmış, piyasada sen de zarar gördün.",
      gorsel: "💥",
      secenekler: [
        { metin: "Kaybı telafi etmeye çalış.", sonuc: { para: -14, mesaj: "Kaybı telafi etmeye çalıştın, kısmen başardın." } },
        { metin: "Kaybı kabullen, geç.", sonuc: { para: -18, mutluluk: -3, mesaj: "Kaybı kabullendin; o gün yardım etseydin diye düşündün." } },
      ],
    },
  },
  {
    anahtar: "sd04_yetimhane",
    cag: SANAYI,
    kategori: "din",
    gorsel: "🏠",
    baslik: "Yetimhaneye Bağış",
    metin: "Kenar mahalledeki yetimhane yıkılmak üzere. Yönetici kapı kapı bağış topluyor.",
    yardim: {
      metin: "Cömert bağış yap.",
      sonuc: { para: -10, ahlak: 3, mutluluk: 2, mesaj: "Cömert bağış yaptın; yönetici gözyaşlarını tutamadı." },
    },
    reddet: {
      metin: "Fazla yok, geri çevir.",
      sonuc: { mutluluk: -1, mesaj: "Fazlan olmadığını söyledin; yönetici hayal kırıklığıyla ayrıldı." },
    },
    olumlu: {
      baslik: "Yetiştirdiğin Bir Doktor",
      metin: "Bağışının kurtardığı yetimhanede büyüyen kız artık saygın bir doktor/öğretmen. Seni ziyarete geldi.",
      gorsel: "🩺",
      secenekler: [
        { metin: "Yardımını kabul et.", sonuc: { saglik: 8, mutluluk: 3, mesaj: "Ücretsiz bakım/danışmanlık sundu: \"O yetimhane olmasa burada olamazdım.\"" } },
        { metin: "Gurur duy, yardım isteme.", sonuc: { mutluluk: 9, ahlak: 6, mesaj: "Bir şey istemedin; iyi biri olduğunu görmek yetti." } },
      ],
    },
    olumsuz: {
      baslik: "Kapanan Yetimhanenin İzi",
      metin: "Bağış yapmadığın yetimhane kapanmış; oradan çıkan çocuklardan biri seninle karşılaşınca eski öfkesini kusuyor.",
      gorsel: "😤",
      secenekler: [
        { metin: "Telafi etmeye çalış.", sonuc: { para: -12, ahlak: 2, mesaj: "Geç de olsa telafi etmeye çalıştın; af almasan da vicdanın rahatladı." } },
        { metin: "Geçmişi geçmişte bırak.", sonuc: { mutluluk: -4, un: -3, mesaj: "Geçmişi bıraktın; ama o öfkeli bakış aklından çıkmadı." } },
      ],
    },
  },
  {
    anahtar: "sd05_yarali_gazeteci",
    cag: SANAYI,
    kategori: "siyaset",
    gorsel: "📰",
    baslik: "Dövülmüş Bir Gazeteci",
    metin: "Sokakta yazdığı yazı yüzünden dövülmüş genç bir gazeteci yatıyor. Kimse başı derde girmesin diye yardım etmiyor.",
    yardim: {
      metin: "Güvenli yere götür.",
      sonuc: { para: -4, saglik: -1, ahlak: 3, mesaj: "Onu güvenli yere götürüp yaralarını sardırdın; minnetle baktı." },
    },
    reddet: {
      metin: "Derde girme, geç.",
      sonuc: { mutluluk: -1, mesaj: "Geçtin; gazetecinin akıbetini hiç öğrenmedin." },
    },
    olumlu: {
      baslik: "Ünlü Bir Kalemin Şükranı",
      metin: "Yardım ettiğin genç gazeteci şehrin en okunan yazarlarından olmuş. Yazılarında seni örnek vatandaş diye övüyor.",
      gorsel: "🖋️",
      secenekler: [
        { metin: "Övgüyü ve ilgiyi kabul et.", sonuc: { un: 5, mutluluk: 3, mesaj: "Yazısı çok ilgi gördü; adın olumlu anılır oldu." } },
        { metin: "Mütevazı kal, ilgiyi reddet.", sonuc: { ahlak: 6, dost_puani: 5, mutluluk: 6, mesaj: "İlgiyi reddettin; mütevazılığın gazetecinin gözünde seni daha değerli kıldı." } },
      ],
    },
    olumsuz: {
      baslik: "Kalem Düşmanın Oldu",
      metin: "Yardım etmediğin gazeteci hayatta kalmış ve seni o gün kayıtsız kalanlar arasında yazmış. Kalemiyle seni sert eleştiriyor.",
      gorsel: "✒️",
      secenekler: [
        { metin: "Görüşüp açıkla.", sonuc: { para: -6, mutluluk: -2, mesaj: "Görüşüp açıkladın; tam ikna olmasa da yazıları yumuşadı." } },
        { metin: "Eleştiriye aldırma.", sonuc: { un: -6, mutluluk: -3, mesaj: "Aldırmadın; ama adının bir süre kötü anılması hoşuna gitmedi." } },
      ],
    },
  },
  {
    anahtar: "sd06_muhacir_aile",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "🧳",
    baslik: "Göç Eden Bir Aile",
    metin: "Şehre yeni gelen barınaksız bir muhacir aile, çatı katında geçici kalmak için izin istiyor.",
    yardim: {
      metin: "Barınak ver.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Çatı katında geçici barınak verdin; defalarca minnet duydular." },
    },
    reddet: {
      metin: "Yer yok, geri çevir.",
      sonuc: { mutluluk: -1, mesaj: "Yer olmadığını söyledin; aile başka kapıya gitti." },
    },
    olumlu: {
      baslik: "Kurduğu İşin Karşılığı",
      metin: "Barındırdığın ailenin reisi kendi işini kurmuş, iyi kazanan bir esnaf. Minnet ziyaretine geldi.",
      gorsel: "🛍️",
      secenekler: [
        { metin: "İşine ortak ol.", sonuc: { para: 24, ticaret_sermaye_artis: 6, mutluluk: 2, mesaj: "Küçük bir ortak oldun; kazanç iki tarafı da memnun etti." } },
        { metin: "Yalnız ziyaretini kabul et.", sonuc: { dost_puani: 6, mutluluk: 9, ahlak: 4, mesaj: "Ortaklık istemedin, dostane ziyareti kabul ettin." } },
      ],
    },
    olumsuz: {
      baslik: "Dolandırılan Güven",
      metin: "Geri çevirdiğin ailenin bir üyesi kötü yola düşmüş, adını kullanarak insanları dolandırıyor.",
      gorsel: "🎩",
      secenekler: [
        { metin: "Yetkiliye bildir.", sonuc: { para: -6, un: -2, mesaj: "Bildirdin; sorun çözüldü ama adının anılması hoş olmadı." } },
        { metin: "Sessizce izle, karışma.", sonuc: { un: -5, mutluluk: -3, mesaj: "Sessiz kaldın; dolandırıcılık sürdü, adın zarar gördü." } },
      ],
    },
  },
  {
    anahtar: "sd07_hasta_isci",
    cag: SANAYI,
    kategori: "saglik",
    gorsel: "💊",
    baslik: "Hastalanan Bir Fabrika İşçisi",
    metin: "Birlikte çalıştığın bir işçi ağır hasta ama ilaç parası yok. Senden yardım istiyor.",
    yardim: {
      metin: "İlaç parasını karşıla.",
      sonuc: { para: -7, ahlak: 3, mutluluk: 2, mesaj: "İlaç parasını karşıladın; işçi gözyaşlarıyla teşekkür etti." },
    },
    reddet: {
      metin: "Senin derdin değil, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Reddettin; işçi umutsuzca uzaklaştı." },
    },
    olumlu: {
      baslik: "İyileşen İşçinin Vefası",
      metin: "İlaç parasını karşıladığın işçi tamamen iyileşip ustabaşı olmuş. Sana hep sadık kalacağını söylüyor.",
      gorsel: "🔧",
      secenekler: [
        { metin: "Yakın çalışanın yap.", sonuc: { kariyer_puani_artis: 8, mutluluk: 3, mesaj: "Yanına aldın; sadakati ve becerisi işlerine hızla katkı sağladı." } },
        { metin: "Yalnız dostluğunu kabul et.", sonuc: { dost_puani: 6, ahlak: 5, mutluluk: 6, mesaj: "İş teklif etmedin, dostluğu aldın; bağ yıllarca sürdü." } },
      ],
    },
    olumsuz: {
      baslik: "Ailesinin Kırgınlığı",
      metin: "Yardım etmediğin işçi hastalığa yenik düşmüş. Ailesi seninle karşılaşınca kayıtsızlığını yüzüne vuruyor.",
      gorsel: "😢",
      secenekler: [
        { metin: "Aileye destek ol.", sonuc: { para: -10, ahlak: 2, mesaj: "Geç de olsa aileye destek oldun; kısmen gönülleri aldın." } },
        { metin: "Suçluluk hissetme, geç.", sonuc: { mutluluk: -5, mesaj: "Suçluluk hissetmemeye çalıştın ama o bakış aklından çıkmadı." } },
      ],
    },
  },
  {
    anahtar: "sd08_genc_kadin_egitim",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "📚",
    baslik: "Okumak İsteyen Genç Bir Kadın",
    metin: "Genç bir kadın dönemin geleneklerine rağmen okumak istiyor ama kitap ve ders parası yok. Destek rica ediyor.",
    yardim: {
      metin: "Eğitimine destek ol.",
      sonuc: { para: -6, ahlak: 3, mutluluk: 2, mesaj: "Eğitimine destek oldun; gözlerindeki kararlılık seni etkiledi." },
    },
    reddet: {
      metin: "Senin işin değil, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Reddettin; kadın hayal kırıklığıyla ayrıldı." },
    },
    olumlu: {
      baslik: "Öğretmen/Yazar Olan Kadın",
      metin: "Eğitimine destek olduğun kadın saygın bir öğretmen/yazar olmuş. Açık bir teşekkür mektubu ve küçük bir armağan yolladı.",
      gorsel: "🖋️",
      secenekler: [
        { metin: "Armağanı ve teşekkürü kabul et.", sonuc: { un: 3, mutluluk: 3, mesaj: "Mektubu çok kişi okudu; adın toplumda olumlu anılır oldu." } },
        { metin: "Mütevazı kal, gurur duy.", sonuc: { ahlak: 6, mutluluk: 8, mesaj: "Mütevazı kaldın; içten içe büyük gurur duydun." } },
      ],
    },
    olumsuz: {
      baslik: "Kötü Şöhretli Bir Adın Anılması",
      metin: "Desteklemediğin kadın zor günler geçirip kötü şöhretli bir çevreye düşmüş. Bir skandalda senin adın da geçiyor, sanki suçlusun.",
      gorsel: "📰",
      secenekler: [
        { metin: "Adını temizle.", sonuc: { para: -10, un: -2, mesaj: "Adını temizlemek için uğraştın, kısmen başardın." } },
        { metin: "Zamanla unutulur de.", sonuc: { un: -6, mutluluk: -3, mesaj: "Zamanla unutulur sandın; dedikodular bir süre canını sıktı." } },
      ],
    },
  },
  {
    anahtar: "sd09_borclu_esnaf",
    cag: SANAYI,
    kategori: "ticaret",
    gorsel: "🏪",
    baslik: "Kapanmanın Eşiğindeki Esnaf",
    metin: "Küçük bir esnaf borçlarını ödeyemeyip dükkânını kapatmak üzere. Kefil olmanı ya da borç vermeni rica ediyor.",
    yardim: {
      metin: "Kefil ol / borç ver.",
      sonuc: { para: -10, ahlak: 2, mesaj: "Kefil olup borç verdin; adam gözyaşlarıyla teşekkür etti." },
    },
    reddet: {
      metin: "Riskli, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Reddettin; esnaf umutsuzca dükkânına döndü." },
    },
    olumlu: {
      baslik: "Toparlanan İşin Karşılığı",
      metin: "Desteklediğin esnaf toparlanıp birkaç şubeli bir tüccar olmuş. Borcunu fazlasıyla ödemeye geldi.",
      gorsel: "🏬",
      secenekler: [
        { metin: "Fazlasını kabul et.", sonuc: { para: 32, mutluluk: 3, mesaj: "Borcu üç katıyla ödedi: \"O gün beni kurtardın.\"" } },
        { metin: "Yalnız anaparayı al.", sonuc: { para: 10, ahlak: 6, dost_puani: 5, mutluluk: 4, mesaj: "Fazlasını istemedin; adamın gözünde daha da değerlendin." } },
      ],
    },
    olumsuz: {
      baslik: "Batan Esnafın Öfkesi",
      metin: "Desteklemediğin esnaf iflas edip her şeyini kaybetmiş. Karşına çıkıp neden yardım etmediğini soruyor, seni suçluyor.",
      gorsel: "📉",
      secenekler: [
        { metin: "Geç de olsa bir şey yap.", sonuc: { para: -12, ahlak: 2, mesaj: "Yardım etmeye çalıştın; tam affetmese de biraz yumuşadı." } },
        { metin: "Sorumluluk kabul etme.", sonuc: { mutluluk: -4, un: -3, mesaj: "Sorumluluk almadın; karşılaşma seni bir süre rahatsız etti." } },
      ],
    },
  },
  {
    anahtar: "sd10_savas_gazisi",
    cag: SANAYI,
    kategori: "savas",
    gorsel: "🎖️",
    baslik: "İş Arayan Bir Gazi",
    metin: "Savaştan sakat dönen bir gazi iş bulamayıp sokaklarda geziniyor. Senden iş istiyor.",
    yardim: {
      metin: "Ona iş bul.",
      sonuc: { para: -3, ahlak: 3, mutluluk: 2, mesaj: "Ona uygun bir iş buldun; gözlerinde uzun zamandır görmediğin umut belirdi." },
    },
    reddet: {
      metin: "Yerin yok, reddet.",
      sonuc: { mutluluk: -1, mesaj: "İş yerinde yer olmadığını söyledin; gazi başı eğik gitti." },
    },
    olumlu: {
      baslik: "Sadık Bir Yardımcı",
      metin: "İş verdiğin gazi yıllardır en sadık çalışanlarından biri olmuş. Sana özel bir hizmetle karşılık vermek istiyor.",
      gorsel: "🤲",
      secenekler: [
        { metin: "Hizmetini kabul et.", sonuc: { kariyer_puani_artis: 10, mutluluk: 3, mesaj: "Sadakati ve deneyimiyle işlerine değerli katkı sağladı." } },
        { metin: "Yalnız dostluğunu kabul et.", sonuc: { dost_puani: 6, ahlak: 5, mutluluk: 6, mesaj: "Fazlasını istemedin, dostluğu aldın; bağınız yıllarca sürdü." } },
      ],
    },
    olumsuz: {
      baslik: "Travmanın Getirdiği Sorun",
      metin: "Reddettiğin gazi tedavi göremediği travmayla başı derde girmiş. Bir olayda senin adın da karışık geçiyor.",
      gorsel: "⚠️",
      secenekler: [
        { metin: "Yardım ederek düzelt.", sonuc: { para: -10, ahlak: 2, mesaj: "Geç de olsa yardım edip durumu düzeltmeye çalıştın." } },
        { metin: "Olaydan uzak dur.", sonuc: { un: -4, mutluluk: -3, mesaj: "Uzak durdun ama adının anılması hoşuna gitmedi." } },
      ],
    },
  },
  {
    anahtar: "sd11_ustabasi_firsati",
    cag: SANAYI,
    kategori: "zanaat",
    gorsel: "🛠️",
    baslik: "Yetenekli Bir Genç İşçi",
    metin: "Genç, çalışkan bir işçi ustabaşı olmak için destek istiyor. Diğer adaylar daha kıdemli.",
    yardim: {
      metin: "Fırsat ver, destekle.",
      sonuc: { para: -3, ahlak: 2, mutluluk: 2, mesaj: "Destekledin; genç işçi güveni boşa çıkarmayacağına söz verdi." },
    },
    reddet: {
      metin: "Kıdem sırası var, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Kıdemi öne sürüp reddettin; genç işçi hayal kırıklığıyla döndü." },
    },
    olumlu: {
      baslik: "Sadık Bir Ustabaşı",
      metin: "Desteklediğin genç işçi güvenilir bir ustabaşı olmuş; yıllardır seni yukarı taşıyan sadık sağ kolun.",
      gorsel: "🏅",
      secenekler: [
        { metin: "Birlikte işi büyüt.", sonuc: { para: 22, uretim_kapasitesi_artis: 12, mutluluk: 2, mesaj: "İşi birlikte büyüttünüz; becerisi kazancına yansıdı." } },
        { metin: "Yalnız güvenini takdir et.", sonuc: { mutluluk: 10, dost_puani: 5, ahlak: 4, mesaj: "Fazlasını istemedin; sadakatinin kıymetini bildin." } },
      ],
    },
    olumsuz: {
      baslik: "Rakibe Geçen Yetenek",
      metin: "Fırsat vermediğin genç işçi rakibine geçip orada ustabaşı olmuş. Eski bilgisiyle işine zarar veriyor.",
      gorsel: "🏚️",
      secenekler: [
        { metin: "Yöntemlerini yenile.", sonuc: { para: -8, mesaj: "Yenilik pahalıya patladı ama rekabete ayak uydurdun." } },
        { metin: "Kaybı kabullen.", sonuc: { para: -12, mutluluk: -3, mesaj: "Kaybı kabullendin; ona şans vermemiş olmak canını sıktı." } },
      ],
    },
  },
  {
    anahtar: "sd12_muhendis_laboratuvar",
    cag: SANAYI,
    kategori: "zanaat",
    gorsel: "🔬",
    baslik: "Küçük Bir Laboratuvar İsteyen Mühendis",
    metin: "Genç bir mühendis makine tasarımı için küçük bir atölye/laboratuvar istiyor. Kimse ciddiye almıyor.",
    yardim: {
      metin: "Küçük bir imkân sağla.",
      sonuc: { para: -9, ahlak: 2, mutluluk: 2, mesaj: "Küçük bir atölye sağladın; hemen çalışmaya koyuldu." },
    },
    reddet: {
      metin: "Boşa para, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Boşa para deyip reddettin; mühendis başka kapılara gitti." },
    },
    olumlu: {
      baslik: "Büyük Bir Buluşun Ortağı",
      metin: "Desteklediğin mühendis makinesiyle büyük başarı kazanmış. Seni ilk yatırımcısı diye anıp payını vermek istiyor.",
      gorsel: "⚡",
      secenekler: [
        { metin: "Payını kabul et.", sonuc: { para: 36, ticaret_sermaye_artis: 10, mutluluk: 2, mesaj: "İlk yatırımcı olarak payını fazlasıyla aldın; kazancın hatırı sayılır arttı." } },
        { metin: "Yalnız yatırımını geri al.", sonuc: { para: 12, mutluluk: 9, ahlak: 4, mesaj: "Fazlasını istemedin, yalnız yatırımının karşılığını aldın." } },
      ],
    },
    olumsuz: {
      baslik: "Patlayan Bir Deneyin Bedeli",
      metin: "Desteklemediğin mühendis imkânsızlıkla acele bir deney yapmış ve kötü bitmiş; olay senin adının da geçtiği bir soruşturmaya döndü.",
      gorsel: "💣",
      secenekler: [
        { metin: "Soruşturmada gerçeği anlat.", sonuc: { para: -8, mutluluk: -3, mesaj: "Gerçeği anlattın; masrafı oldu ama adın temiz kaldı." } },
        { metin: "Olaydan uzak dur.", sonuc: { un: -5, mutluluk: -3, mesaj: "Uzak durmaya çalıştın; yine de adının anılması hoş olmadı." } },
      ],
    },
  },
  {
    anahtar: "sd13_kimsesiz_cocuk_fabrika",
    cag: SANAYI,
    kategori: "saglik",
    gorsel: "🧒",
    baslik: "Fabrikada Çalışan Kimsesiz Çocuk",
    metin: "Fabrikandaki kimsesiz çocuk ağır işten hastalanmış. Onu okula gönderip çalıştırmayı bırakabilirsin.",
    yardim: {
      metin: "Koru, okula gönder.",
      sonuc: { para: -6, ahlak: 4, mutluluk: 2, mesaj: "Çocuğu ağır işten alıp okula gönderdin; gözlerinde umut belirdi." },
    },
    reddet: {
      metin: "Çalışmaya devam etsin.",
      sonuc: { ahlak: -2, mutluluk: -1, mesaj: "Fabrika aksamasın diye çocuğu çalıştırmaya devam ettin." },
    },
    olumlu: {
      baslik: "Doktor/Mühendis Olan Çocuk",
      metin: "Okula gönderdiğin çocuk saygın bir doktor/mühendis olmuş. Teşekkür etmeye gelip sana yardım sunuyor.",
      gorsel: "🎓",
      secenekler: [
        { metin: "Yardımı kabul et.", sonuc: { saglik: 8, kariyer_puani_artis: 8, mutluluk: 2, mesaj: "Yardımını kabul ettin; sağlığın da işlerin de fayda gördü." } },
        { metin: "Sadece gurur duy.", sonuc: { mutluluk: 9, ahlak: 6, mesaj: "Karşılık istemedin; onu bu halde görmek yetti." } },
      ],
    },
    olumsuz: {
      baslik: "Suça Sürüklenen Çocuk",
      metin: "Çalıştırmaya devam ettiğin çocuk sokağa düşüp küçük bir çeteye karışmış. Şimdi fabrikanda sorun çıkarıyor.",
      gorsel: "🚨",
      secenekler: [
        { metin: "İlgilen, düzeltmeye çalış.", sonuc: { para: -10, ahlak: 2, mesaj: "Geç de olsa ilgilenip durumu düzeltmeye çalıştın." } },
        { metin: "Önlem al, uzaklaştır.", sonuc: { para: -6, mutluluk: -3, mesaj: "Önlem alıp uzaklaştırdın; vicdanın rahat etmedi." } },
      ],
    },
  },
  {
    anahtar: "sd14_yangin_komsu",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "🔥",
    baslik: "Yangında Evi Yanan Komşu",
    metin: "Yangın komşu aileyi evsiz bırakmış. Geçici olarak senin evinde/mülkünde kalmak istiyorlar.",
    yardim: {
      metin: "Yer aç, yardım et.",
      sonuc: { para: -5, ahlak: 3, mutluluk: 2, mesaj: "Yer açıp yardım ettin; aile minnetle ağladı." },
    },
    reddet: {
      metin: "Düzenim bozulmasın, reddet.",
      sonuc: { mutluluk: -1, mesaj: "Düzenin bozulmasın diye reddettin; aile başka kapıya gitti." },
    },
    olumlu: {
      baslik: "Toparlanan Komşu Ailenin İyiliği",
      metin: "Yardım ettiğin komşu aile kendi işini kurup toparlanmış. Minnettarlıklarını bir jestle gösteriyorlar.",
      gorsel: "🏡",
      secenekler: [
        { metin: "Jesti kabul et.", sonuc: { para: 20, mutluluk: 3, mesaj: "Küçük ama anlamlı bir hediyeyle geldiler: \"O gün bize hayat verdiniz.\"" } },
        { metin: "Sadece komşuluğu sürdür.", sonuc: { dost_puani: 6, ahlak: 5, mutluluk: 6, mesaj: "Hediye istemedin, komşuluğu sürdürdün; bağ yıllarca sıcak kaldı." } },
      ],
    },
    olumsuz: {
      baslik: "Rakip Olan Eski Komşu",
      metin: "Reddettiğin komşu aile zor toparlanmış; sonunda başka biri yardım etmiş. Şimdi onunla ortak, senin en büyük rakibin.",
      gorsel: "🏘️",
      secenekler: [
        { metin: "Yine de iyi geçin.", sonuc: { para: -6, dost_puani: 3, mesaj: "Rekabete rağmen iyi geçinmeye çalıştın; kısmen başardın." } },
        { metin: "Sertçe karşılık ver.", sonuc: { rakip_puani: -6, mutluluk: -3, mesaj: "Sertçe karşılık verdin; mücadele seni de yordu." } },
      ],
    },
  },
  {
    anahtar: "sd15_sokak_muzisyeni",
    cag: SANAYI,
    kategori: "sosyal",
    gorsel: "🎻",
    baslik: "Yetenekli Bir Sokak Müzisyeni",
    metin: "Köşede keman çalan genç müzisyen para kazanamıyor, enstrümanını satmak üzere. Senden yardım istiyor.",
    yardim: {
      metin: "Para ver, satmasın.",
      sonuc: { para: -4, ahlak: 2, mutluluk: 3, mesaj: "Para verdin, satmaktan vazgeçti; minnetle sana bir parça çaldı." },
    },
    reddet: {
      metin: "Boş hayal, geç.",
      sonuc: { mutluluk: -1, mesaj: "Boş hayal peşinde sanıp geçtin; müzisyen üzgün uzaklaştı." },
    },
    olumlu: {
      baslik: "Ünlü Olan Sokak Müzisyeni",
      metin: "Enstrümanını kurtardığın genç müzisyen şehrin ünlü sanatçılarından olmuş. Seni özel konserine çağırıp sahneden onurlandırıyor.",
      gorsel: "🎼",
      secenekler: [
        { metin: "Daveti kabul et.", sonuc: { un: 5, mutluluk: 4, mesaj: "Sahneden adını andı; salon seni ayakta alkışladı." } },
        { metin: "Sessizce izle.", sonuc: { mutluluk: 9, ahlak: 5, mesaj: "Öne çıkmadan izledin; gururun hiç eksilmedi." } },
      ],
    },
    olumsuz: {
      baslik: "Kötü Yola Düşen Müzisyen",
      metin: "Yardım etmediğin müzisyen enstrümanını satıp kötü çevreye düşmüş. Şimdi bir skandalda adın da anılıyor.",
      gorsel: "🍺",
      secenekler: [
        { metin: "Yeni bir şans ver.", sonuc: { para: -8, ahlak: 2, mesaj: "Geç de olsa şans verdin; toparlanmasına küçük bir destek oldu." } },
        { metin: "Uzak dur.", sonuc: { un: -5, mutluluk: -3, mesaj: "Uzak durmaya çalıştın ama adının anılması hoş olmadı." } },
      ],
    },
  },
];

export const OLAY_GECIKMIS_TAKIP: OlayTanimi[] = TEMALAR.flatMap(temaUret);
