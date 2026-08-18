import { BolgeIstatistigi } from "../types";

/**
 * Bölge + çağa göre yaklaşık nüfus ve kısa "bilgin miydi" notları (flavor amaçlı,
 * kesin tarihsel hassasiyet iddiası taşımaz — oyunun genel tonuna uygun yuvarlak rakamlar).
 */
export const BOLGE_ISTATISTIKLERI: Record<string, BolgeIstatistigi> = {
  // ---- Orta Çağ ----
  "Orta Çağ|Fransa": {
    nufusTahmini: "~15 milyon",
    notlar: [
      "Paris, Avrupa'nın en kalabalık şehirlerinden biri sayılıyor.",
      "Şaraphaneler ve panayırlar, kırsaldaki köylerin en büyük gelir kapısı.",
    ],
  },
  "Orta Çağ|Kutsal Roma": {
    nufusTahmini: "~8 milyon",
    notlar: [
      "Yüzlerce küçük prensliğe, dükalığa ve serbest şehre bölünmüş bir topraksın.",
      "İmparator seçimle işbaşına gelir; taht doğrudan babadan oğula geçmez.",
    ],
  },
  "Orta Çağ|Bizans": {
    nufusTahmini: "~6 milyon",
    notlar: [
      "Konstantinopolis surları, kuşatmalara karşı yüzyıllardır aşılamıyor.",
      "İpek Yolu'nun son durağı olarak doğu ile batı arasında köprü görevi görüyorsun.",
    ],
  },
  "Orta Çağ|Selçuklu": {
    nufusTahmini: "~3 milyon",
    notlar: [
      "Kervansaraylar, tüccarları konaklatmak için devlet eliyle inşa ediliyor.",
      "Medreseler, hem dini hem de fen ilimlerinin öğretildiği başlıca eğitim kurumları.",
    ],
  },
  "Orta Çağ|Eyyubiler": {
    nufusTahmini: "~5 milyon",
    notlar: [
      "Nil'in taşkınları, yıllık hasadın bereketini doğrudan belirliyor.",
      "Kahire, dönemin en büyük ilim ve ticaret merkezlerinden biri.",
    ],
  },

  // ---- Sanayi Devrimi ----
  "Sanayi Devrimi|İngiltere": {
    nufusTahmini: "~18 milyon",
    notlar: [
      "Fabrika bacaları, büyük şehirlerin gökyüzünü artık is bulutlarıyla paylaşıyor.",
      "Demiryolu ağı, ülkeyi baştan başa haftalar yerine saatler içinde geçilebilir kılıyor.",
    ],
  },
  "Sanayi Devrimi|Fransa": {
    nufusTahmini: "~34 milyon",
    notlar: [
      "Devrim sonrası art arda yönetim değişiklikleri hâlâ gündelik hayata yansıyor.",
      "Paris'in bulvarları, dönemin en modern şehir planlama örneklerinden sayılıyor.",
    ],
  },
  "Sanayi Devrimi|Osmanlı": {
    nufusTahmini: "~30 milyon",
    notlar: [
      "Tanzimat sonrası reformlar, taşrada farklı hızlarda hissediliyor.",
      "İstanbul, hâlâ üç kıtayı birbirine bağlayan en kalabalık liman şehirlerinden biri.",
    ],
  },
  "Sanayi Devrimi|Rusya": {
    nufusTahmini: "~60 milyon",
    notlar: [
      "İmparatorluğun büyük kısmı hâlâ toprağa bağlı köylülerden oluşuyor.",
      "Sibirya'ya doğru yerleşim, devlet eliyle teşvik edilen bir göç dalgasına dönüşüyor.",
    ],
  },
};

export function bolgeIstatistigiGetir(cag: string, bolge: string): BolgeIstatistigi | undefined {
  return BOLGE_ISTATISTIKLERI[`${cag}|${bolge}`];
}
