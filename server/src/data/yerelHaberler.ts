/**
 * haberleriUret() için varyant havuzları: aynı durum (savaş/veba/ekonomi/hizip)
 * art arda turlarda hep aynı tek cümleyi tekrarlamasın diye her kategori birden
 * fazla ihtimal taşıyor. Ayrıca bölge+çağa özgü, state'ten bağımsız yerel/tarihi/
 * komik "dolgu" haberler — haberleriUret bunlardan bazen (bkz. YEREL_HABER_SANSI)
 * birini mevcut haberlere ekliyor.
 *
 * İki dilli: her giriş `{ tr, en }`. Seçici fonksiyonlar `dil` alır.
 */
import type { Dil } from "../types";

function rastgele<T>(liste: T[]): T {
  return liste[Math.floor(Math.random() * liste.length)];
}

type CiftDil = { tr: string; en: string };

const SAVAS_HABERLERI: { rakipli: CiftDil; rakipsiz: CiftDil }[] = [
  {
    rakipli: { tr: "{bolge} ile {rakip} arasındaki çatışma sürüyor.", en: "The clash between {bolge} and {rakip} goes on." },
    rakipsiz: { tr: "{bolge} savaş halinde.", en: "{bolge} is at war." },
  },
  {
    rakipli: { tr: "Cephede {rakip} birlikleriyle çarpışmalar devam ediyor.", en: "Fighting with {rakip} forces continues at the front." },
    rakipsiz: { tr: "Sınırlarda çatışma haberleri geliyor.", en: "Reports of fighting are coming from the borders." },
  },
  {
    rakipli: { tr: "{rakip} ile aradaki gerginlik meydan muharebelerine dönüştü.", en: "The tension with {rakip} has turned into pitched battles." },
    rakipsiz: { tr: "Ordular sahaya sürülmüş durumda.", en: "The armies have been deployed to the field." },
  },
  {
    rakipli: { tr: "{rakip} cephesinden gelen haberler köylerde endişeyle takip ediliyor.", en: "News from the {rakip} front is followed with dread in the villages." },
    rakipsiz: { tr: "Savaş haberleri her sohbetin baş konusu.", en: "War news is the main subject of every conversation." },
  },
];

const VEBA_HABERLERI: CiftDil[] = [
  { tr: "Salgın bölgeyi kasıp kavuruyor, sokaklar boşaldı.", en: "The plague is ravaging the region; the streets have emptied." },
  { tr: "Hekimler yeni vaka sayısının arttığını söylüyor, pazarlar tenhalaştı.", en: "Physicians say new cases are rising; the markets have thinned out." },
  { tr: "Salgından kaçanlar kırsala akın ediyor, köyler de tedirgin.", en: "Those fleeing the plague are pouring into the countryside; the villages are uneasy too." },
  { tr: "Şehir kapılarında karantina nöbetleri sıkılaştırıldı.", en: "Quarantine watches at the city gates have been tightened." },
];

const IYI_EKONOMI_HABERLERI: CiftDil[] = [
  { tr: "Pazarlar canlı, ekonomi güçleniyor.", en: "The markets are lively; the economy is strengthening." },
  { tr: "Tüccarlar bu yılki kazançtan son derece memnun.", en: "Merchants are highly pleased with this year's earnings." },
  { tr: "Vergi gelirleri artıyor, hazine rahatladı.", en: "Tax revenues are rising; the treasury has eased." },
  { tr: "Yeni kervanlar bölgeye art arda mal getiriyor.", en: "New caravans keep bringing goods to the region." },
];

const KOTU_EKONOMI_HABERLERI: CiftDil[] = [
  { tr: "Ekonomik kriz halk arasında endişe yaratıyor.", en: "The economic crisis is causing anxiety among the people." },
  { tr: "Fiyatlar günden güne artıyor, pazarcılar şikayetçi.", en: "Prices rise by the day; the market traders complain." },
  { tr: "Vergi yükü ağırlaştı, taşrada hoşnutsuzluk büyüyor.", en: "The tax burden has grown heavier; discontent is spreading in the provinces." },
  { tr: "Kıtlık söylentileri ambarların önünde kuyruklar oluşturuyor.", en: "Rumors of famine are forming queues outside the granaries." },
];

const HIZIP_HABERLERI: CiftDil[] = [
  { tr: "{hizip} içindeki gerginlik hâlâ konuşuluyor.", en: "The tension within {hizip} is still being talked about." },
  { tr: "{hizip} taraftarları arasında sokak tartışmaları eksik olmuyor.", en: "Street arguments among {hizip} supporters are never in short supply." },
  { tr: "{hizip} ile ilgili söylentiler meyhanelerin baş konusu.", en: "Rumors about {hizip} are the main subject in the taverns." },
];

const KITLIK_HABERLERI: CiftDil[] = [
  { tr: "Kıtlık ambarları boşalttı, ekmek fiyatları günden güne artıyor.", en: "Famine has emptied the granaries; bread prices climb by the day." },
  { tr: "Kuraklık ekinleri kavurdu, halk zor günler geçiriyor.", en: "Drought has scorched the crops; the people are having hard days." },
  { tr: "Kıtlık yüzünden komşu köylerden göç dalgası başladı.", en: "A wave of migration from the neighboring villages has begun because of the famine." },
];

const ISYAN_HABERLERI: CiftDil[] = [
  { tr: "İsyan ateşi sokaklara yayıldı, devriyeler sıkılaştırıldı.", en: "The fire of revolt has spread to the streets; patrols have been stepped up." },
  { tr: "Halkın öfkesi meydanlarda gösterilere dönüştü.", en: "The people's anger has turned into demonstrations in the squares." },
  { tr: "İsyancılar bazı kamu binalarını ele geçirmeye çalıştı.", en: "The rebels tried to seize some public buildings." },
];

const ALTIN_CAG_HABERLERI: CiftDil[] = [
  { tr: "Bolluk her yerde hissediliyor, herkesin yüzü gülüyor.", en: "Abundance is felt everywhere; everyone is smiling." },
  { tr: "Sanat ve ticaret bir arada patlama yaşıyor, bu bir altın çağ.", en: "Art and trade are booming together — this is a golden age." },
  { tr: "Pazarlar taşıyor, insanlar bu günleri uzun süre hatırlayacak.", en: "The markets overflow; people will remember these days for a long time." },
];

const SAKIN_HABERLERI: CiftDil[] = [
  { tr: "{bolge} toprakları bugünlerde nispeten sakin.", en: "The lands of {bolge} are relatively calm these days." },
  { tr: "{bolge}'da sıra dışı bir şey olmuyor, hayat her zamanki gibi akıyor.", en: "Nothing unusual is happening in {bolge}; life flows as always." },
  { tr: "{bolge}'da bugünlerde konuşulacak büyük bir olay yok.", en: "There is no great event to speak of in {bolge} these days." },
];

/** Bir haber turunda yerel dolgu haberinin eklenme ihtimali. */
export const YEREL_HABER_SANSI = 0.4;

const YEREL_HABERLER: Record<string, CiftDil[]> = {
  // ---- Orta Çağ ----
  "Orta Çağ|Fransa": [
    { tr: "Panayırda bir hokkabaz, kralın atını taklit ederek halkı güldürdü.", en: "At the fair, a juggler made the crowd laugh by imitating the king's horse." },
    { tr: "Değirmenci ile fırıncı arasındaki un kavgası mahkemeye taşındı.", en: "The flour quarrel between the miller and the baker was taken to court." },
    { tr: "Bir çiftçi, tarlasında eski bir Roma sikkesi bulduğunu iddia ediyor.", en: "A farmer claims to have found an old Roman coin in his field." },
    { tr: "Şarap tüccarları bu yılki bağ bozumunun bereketli geçtiğini söylüyor.", en: "The wine merchants say this year's harvest was bountiful." },
  ],
  "Orta Çağ|Kutsal Roma": [
    { tr: "Komşu prenslikten gelen elçi, protokol hatası yüzünden kapıda bekletildi.", en: "The envoy from the neighboring principality was kept waiting at the door over a protocol error." },
    { tr: "Bir gezgin ozan, meydanda anlattığı abartılı ejderha hikâyesiyle ün saldı.", en: "A wandering minstrel became famous for the exaggerated dragon tale he told in the square." },
    { tr: "Loncalar arasında fiyat anlaşmazlığı, çırakların greviyle sonuçlandı.", en: "A price dispute among the guilds ended in an apprentices' strike." },
    { tr: "Katedralin yeni çanı, ilk çalışında yarım köyü uykusundan etti.", en: "The cathedral's new bell woke half the village on its first ring." },
  ],
  "Orta Çağ|Bizans": [
    { tr: "Sarayda protokol sırası yüzünden iki soylu ailesi arasında tartışma çıktı.", en: "A quarrel broke out at court between two noble families over the order of protocol." },
    { tr: "Limanda demirleyen bir tüccar gemisi, egzotik baharat kokusuyla tüm çarşıyı sardı.", en: "A merchant ship anchored in the harbor filled the whole bazaar with the scent of exotic spices." },
    { tr: "Hipodromdaki at yarışı, taraftarlar arasında ufak bir kargaşayla bitti.", en: "The horse race at the hippodrome ended in a small scuffle among the fans." },
    { tr: "Bir keşiş, el yazması bir kitabı kopyalarken yanlışlıkla resme kendi kedisini çizdi.", en: "A monk, copying a manuscript, accidentally drew his own cat into an illustration." },
  ],
  "Orta Çağ|Selçuklu": [
    { tr: "Kervansarayda konaklayan bir tüccar, taşıdığı ipeğin çalındığını iddia etti.", en: "A merchant lodging at the caravanserai claimed the silk he was carrying had been stolen." },
    { tr: "Medresede düzenlenen tartışma meclisi, gece yarısına kadar sürdü.", en: "The debate assembly held at the madrasa went on until midnight." },
    { tr: "Bir çoban, dağlarda kaybolan sürüsünü üç gün sonra sapasağlam buldu.", en: "A shepherd found his flock, lost in the mountains, safe and sound three days later." },
    { tr: "Yeni açılan hamamın kubbesi, ustaların gururu oldu.", en: "The dome of the newly opened bathhouse became the pride of its builders." },
  ],
  "Orta Çağ|Eyyubiler": [
    { tr: "Nil'in bu yılki taşkını beklenenden bereketli oldu, çiftçiler rahatladı.", en: "The Nile's flood this year was more bountiful than expected; the farmers were relieved." },
    { tr: "Kahire çarşısında bir baharatçı, yeni bir karışımla müşterilerini büyüledi.", en: "A spice seller in the Cairo bazaar enchanted his customers with a new blend." },
    { tr: "Bir denizci, uzak bir adadan getirdiği tuhaf bir hayvanla pazarı ayağa kaldırdı.", en: "A sailor stirred up the market with a strange animal he brought from a distant island." },
    { tr: "Cami avlusunda düzenlenen fetva meclisi, uzun bir tartışmaya sahne oldu.", en: "The fatwa council held in the mosque courtyard was the scene of a long debate." },
  ],

  // ---- Sanayi Devrimi ----
  "Sanayi Devrimi|İngiltere": [
    { tr: "Yeni açılan demiryolu hattı, komşu kasabaya seyahati bir güne indirdi.", en: "The newly opened railway line cut travel to the neighboring town to a single day." },
    { tr: "Bir gazete, buharlı makinelerin işçilerin elinden işini alacağını yazdı.", en: "A newspaper wrote that steam engines would take the workers' jobs from their hands." },
    { tr: "Fabrika bacasından çıkan dumanın rengi, hava durumu kadar konuşuluyor.", en: "The color of the smoke from the factory chimney is discussed as much as the weather." },
    { tr: "Bir mucit, meydanda tanıttığı garip aletle hem alkış hem alay topladı.", en: "An inventor drew both applause and mockery with the strange device he presented in the square." },
  ],
  "Sanayi Devrimi|Fransa": [
    { tr: "Paris'te açılan yeni bir kafe, aydınların uğrak yeri hâline geldi.", en: "A new café that opened in Paris has become a haunt of the intellectuals." },
    { tr: "Bir gazeteci, hükümeti eleştiren yazısı yüzünden kısa süreliğine gözaltına alındı.", en: "A journalist was briefly detained over an article criticizing the government." },
    { tr: "Yeni modaşapkalar, sokaklarda tartışma konusu oldu.", en: "The new fashionable hats became a subject of debate in the streets." },
    { tr: "Bir tiyatro oyunu, sansür kurulunca son dakikada değiştirildi.", en: "A theater play was changed at the last minute when the censor stepped in." },
  ],
  "Sanayi Devrimi|Osmanlı": [
    { tr: "İstanbul'da açılan yeni matbaa, ilk kitaplarını bastı.", en: "The new printing house in Istanbul printed its first books." },
    { tr: "Tanzimat sonrası yeni giyim kuralları, çarşıda hâlâ tartışılıyor.", en: "The post-Tanzimat dress rules are still debated in the bazaar." },
    { tr: "Bir tüccar, Avrupa'dan getirdiği tuhaf bir makineyle mahalleliyi topladı.", en: "A merchant gathered the neighborhood with a strange machine he brought from Europe." },
    { tr: "Boğaz'daki vapur seferleri, kayıkçılar arasında hoşnutsuzluk yarattı.", en: "The ferry runs on the Bosphorus caused discontent among the boatmen." },
  ],
  "Sanayi Devrimi|Rusya": [
    { tr: "Bir toprak sahibi, köylülerine yeni bir tarım aleti dağıttı, kimse nasıl kullanılacağını bilmiyor.", en: "A landowner handed out a new farming tool to his peasants; no one knows how to use it." },
    { tr: "Sibirya'ya giden bir göçmen kafilesi, kışın bastırmasından önce yola çıktı.", en: "A caravan of migrants heading to Siberia set out before winter closed in." },
    { tr: "Sarayda düzenlenen bir balo, kıyafet skandalıyla anılıyor.", en: "A ball held at the palace is remembered for a dress scandal." },
    { tr: "Bir demiryolu mühendisi, projesinin bütçesinin üç katına çıktığını itiraf etti.", en: "A railway engineer admitted his project's budget had tripled." },
  ],
};

function coz(c: CiftDil, dil: Dil, yerTutucular: Record<string, string>): string {
  let s = dil === "en" ? c.en : c.tr;
  for (const [k, v] of Object.entries(yerTutucular)) {
    s = s.replace(new RegExp(`\\{${k}\\}`, "g"), v);
  }
  return s;
}

export function savasHaberi(dil: Dil, bolge: string, rakip: string | null): string {
  const s = rastgele(SAVAS_HABERLERI);
  return coz(rakip ? s.rakipli : s.rakipsiz, dil, { bolge, rakip: rakip ?? "" });
}
export function vebaHaberi(dil: Dil): string {
  return coz(rastgele(VEBA_HABERLERI), dil, {});
}
export function iyiEkonomiHaberi(dil: Dil): string {
  return coz(rastgele(IYI_EKONOMI_HABERLERI), dil, {});
}
export function kotuEkonomiHaberi(dil: Dil): string {
  return coz(rastgele(KOTU_EKONOMI_HABERLERI), dil, {});
}
export function kitlikHaberi(dil: Dil): string {
  return coz(rastgele(KITLIK_HABERLERI), dil, {});
}
export function isyanHaberi(dil: Dil): string {
  return coz(rastgele(ISYAN_HABERLERI), dil, {});
}
export function altinCagHaberi(dil: Dil): string {
  return coz(rastgele(ALTIN_CAG_HABERLERI), dil, {});
}
export function hizipHaberi(dil: Dil, hizip: string): string {
  return coz(rastgele(HIZIP_HABERLERI), dil, { hizip });
}
export function sakinHaberi(dil: Dil, bolge: string): string {
  return coz(rastgele(SAKIN_HABERLERI), dil, { bolge });
}
export function yerelHaber(dil: Dil, cag: string, bolge: string): string | null {
  const havuz = YEREL_HABERLER[`${cag}|${bolge}`];
  if (!havuz || havuz.length === 0) return null;
  return coz(rastgele(havuz), dil, {});
}
