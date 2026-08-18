/**
 * haberleriUret() için varyant havuzları: aynı durum (savaş/veba/ekonomi/hizip)
 * art arda turlarda hep aynı tek cümleyi tekrarlamasın diye her kategori birden
 * fazla ihtimal taşıyor. Ayrıca bölge+çağa özgü, state'ten bağımsız yerel/tarihi/
 * komik "dolgu" haberler — haberleriUret bunlardan bazen (bkz. YEREL_HABER_SANSI)
 * birini mevcut haberlere ekliyor.
 */

export const SAVAS_HABERLERI: ((bolge: string, rakip: string | null) => string)[] = [
  (bolge, rakip) => (rakip ? `${bolge} ile ${rakip} arasındaki çatışma sürüyor.` : `${bolge} savaş halinde.`),
  (bolge, rakip) =>
    rakip ? `Cephede ${rakip} birlikleriyle çarpışmalar devam ediyor.` : `Sınırlarda çatışma haberleri geliyor.`,
  (bolge, rakip) =>
    rakip ? `${rakip} ile aradaki gerginlik meydan muharebelerine dönüştü.` : `Ordular sahaya sürülmüş durumda.`,
  (_bolge, rakip) =>
    rakip ? `${rakip} cephesinden gelen haberler köylerde endişeyle takip ediliyor.` : `Savaş haberleri her sohbetin baş konusu.`,
];

export const VEBA_HABERLERI: string[] = [
  "Salgın bölgeyi kasıp kavuruyor, sokaklar boşaldı.",
  "Hekimler yeni vaka sayısının arttığını söylüyor, pazarlar tenhalaştı.",
  "Salgından kaçanlar kırsala akın ediyor, köyler de tedirgin.",
  "Şehir kapılarında karantina nöbetleri sıkılaştırıldı.",
];

export const IYI_EKONOMI_HABERLERI: string[] = [
  "Pazarlar canlı, ekonomi güçleniyor.",
  "Tüccarlar bu yılki kazançtan son derece memnun.",
  "Vergi gelirleri artıyor, hazine rahatladı.",
  "Yeni kervanlar bölgeye art arda mal getiriyor.",
];

export const KOTU_EKONOMI_HABERLERI: string[] = [
  "Ekonomik kriz halk arasında endişe yaratıyor.",
  "Fiyatlar günden güne artıyor, pazarcılar şikayetçi.",
  "Vergi yükü ağırlaştı, taşrada hoşnutsuzluk büyüyor.",
  "Kıtlık söylentileri ambarların önünde kuyruklar oluşturuyor.",
];

export const HIZIP_HABERLERI: ((hizip: string) => string)[] = [
  (h) => `${h} içindeki gerginlik hâlâ konuşuluyor.`,
  (h) => `${h} taraftarları arasında sokak tartışmaları eksik olmuyor.`,
  (h) => `${h} ile ilgili söylentiler meyhanelerin baş konusu.`,
];

export const KITLIK_HABERLERI: string[] = [
  "Kıtlık ambarları boşalttı, ekmek fiyatları günden güne artıyor.",
  "Kuraklık ekinleri kavurdu, halk zor günler geçiriyor.",
  "Kıtlık yüzünden komşu köylerden göç dalgası başladı.",
];

export const ISYAN_HABERLERI: string[] = [
  "İsyan ateşi sokaklara yayıldı, devriyeler sıkılaştırıldı.",
  "Halkın öfkesi meydanlarda gösterilere dönüştü.",
  "İsyancılar bazı kamu binalarını ele geçirmeye çalıştı.",
];

export const ALTIN_CAG_HABERLERI: string[] = [
  "Bolluk her yerde hissediliyor, herkesin yüzü gülüyor.",
  "Sanat ve ticaret bir arada patlama yaşıyor, bu bir altın çağ.",
  "Pazarlar taşıyor, insanlar bu günleri uzun süre hatırlayacak.",
];

export const SAKIN_HABERLERI: ((bolge: string) => string)[] = [
  (b) => `${b} toprakları bugünlerde nispeten sakin.`,
  (b) => `${b}'da sıra dışı bir şey olmuyor, hayat her zamanki gibi akıyor.`,
  (b) => `${b}'da bugünlerde konuşulacak büyük bir olay yok.`,
];

/** Bir haber turunda yerel dolgu haberinin eklenme ihtimali. */
export const YEREL_HABER_SANSI = 0.4;

export const YEREL_HABERLER: Record<string, string[]> = {
  // ---- Orta Çağ ----
  "Orta Çağ|Fransa": [
    "Panayırda bir hokkabaz, kralın atını taklit ederek halkı güldürdü.",
    "Değirmenci ile fırıncı arasındaki un kavgası mahkemeye taşındı.",
    "Bir çiftçi, tarlasında eski bir Roma sikkesi bulduğunu iddia ediyor.",
    "Şarap tüccarları bu yılki bağ bozumunun bereketli geçtiğini söylüyor.",
  ],
  "Orta Çağ|Kutsal Roma": [
    "Komşu prenslikten gelen elçi, protokol hatası yüzünden kapıda bekletildi.",
    "Bir gezgin ozan, meydanda anlattığı abartılı ejderha hikâyesiyle ün saldı.",
    "Loncalar arasında fiyat anlaşmazlığı, çırakların greviyle sonuçlandı.",
    "Katedralin yeni çanı, ilk çalışında yarım köyü uykusundan etti.",
  ],
  "Orta Çağ|Bizans": [
    "Sarayda protokol sırası yüzünden iki soylu ailesi arasında tartışma çıktı.",
    "Limanda demirleyen bir tüccar gemisi, egzotik baharat kokusuyla tüm çarşıyı sardı.",
    "Hipodromdaki at yarışı, taraftarlar arasında ufak bir kargaşayla bitti.",
    "Bir keşiş, el yazması bir kitabı kopyalarken yanlışlıkla resme kendi kedisini çizdi.",
  ],
  "Orta Çağ|Selçuklu": [
    "Kervansarayda konaklayan bir tüccar, taşıdığı ipeğin çalındığını iddia etti.",
    "Medresede düzenlenen tartışma meclisi, gece yarısına kadar sürdü.",
    "Bir çoban, dağlarda kaybolan sürüsünü üç gün sonra sapasağlam buldu.",
    "Yeni açılan hamamın kubbesi, ustaların gururu oldu.",
  ],
  "Orta Çağ|Eyyubiler": [
    "Nil'in bu yılki taşkını beklenenden bereketli oldu, çiftçiler rahatladı.",
    "Kahire çarşısında bir baharatçı, yeni bir karışımla müşterilerini büyüledi.",
    "Bir denizci, uzak bir adadan getirdiği tuhaf bir hayvanla pazarı ayağa kaldırdı.",
    "Cami avlusunda düzenlenen fetva meclisi, uzun bir tartışmaya sahne oldu.",
  ],

  // ---- Sanayi Devrimi ----
  "Sanayi Devrimi|İngiltere": [
    "Yeni açılan demiryolu hattı, komşu kasabaya seyahati bir güne indirdi.",
    "Bir gazete, buharlı makinelerin işçilerin elinden işini alacağını yazdı.",
    "Fabrika bacasından çıkan dumanın rengi, hava durumu kadar konuşuluyor.",
    "Bir mucit, meydanda tanıttığı garip aletle hem alkış hem alay topladı.",
  ],
  "Sanayi Devrimi|Fransa": [
    "Paris'te açılan yeni bir kafe, aydınların uğrak yeri hâline geldi.",
    "Bir gazeteci, hükümeti eleştiren yazısı yüzünden kısa süreliğine gözaltına alındı.",
    "Yeni modaşapkalar, sokaklarda tartışma konusu oldu.",
    "Bir tiyatro oyunu, sansür kurulunca son dakikada değiştirildi.",
  ],
  "Sanayi Devrimi|Osmanlı": [
    "İstanbul'da açılan yeni matbaa, ilk kitaplarını bastı.",
    "Tanzimat sonrası yeni giyim kuralları, çarşıda hâlâ tartışılıyor.",
    "Bir tüccar, Avrupa'dan getirdiği tuhaf bir makineyle mahalleliyi topladı.",
    "Boğaz'daki vapur seferleri, kayıkçılar arasında hoşnutsuzluk yarattı.",
  ],
  "Sanayi Devrimi|Rusya": [
    "Bir toprak sahibi, köylülerine yeni bir tarım aleti dağıttı, kimse nasıl kullanılacağını bilmiyor.",
    "Sibirya'ya giden bir göçmen kafilesi, kışın bastırmasından önce yola çıktı.",
    "Sarayda düzenlenen bir balo, kıyafet skandalıyla anılıyor.",
    "Bir demiryolu mühendisi, projesinin bütçesinin üç katına çıktığını itiraf etti.",
  ],
};
