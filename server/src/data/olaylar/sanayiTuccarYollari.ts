import type { OlayTanimi } from "./types";

/**
 * Sanayi Devrimi Tüccar'ın dallanan kariyer yolu: "İlk Büyük Karar"
 * (gameEngine.ts'te zorla tetiklenir, bkz. senaryoUret) karakteri dört
 * sanayici felsefesinden birine kilitler (yol:tuccar:adil / somurucu /
 * spekulator / hayirsever). Kilitlenen yolun etiketi bir daha değişmez;
 * her yol-özel olay gerekliEtiketler:["yol:tuccar:X"] taşıdığı için karşı
 * yolların içeriği otomatik olarak kapalı kalır.
 */
export const OLAY_SANAYI_TUCCAR_YOLLARI: OlayTanimi[] = [
  {
    id: "sd_tuccar_yol_ilk_karar",
    kategori: "ticaret",
    cag: "Sanayi Devrimi",
    meslekler: ["Tüccar"],
    minYas: 18,
    yasakliEtiketler: ["sd_tuccar_yolu_secildi"],
    gorsel: "🏭",
    baslik: "İlk Büyük Karar",
    metin: "Babandan (ya da ustandan) devraldığın küçük işletme büyümek üzere; bankadan ilk büyük krediyi çekebilmen için bir iş planı sunman gerekiyor. Bu planın nasıl bir sanayici olacağını da belirleyecek.",
    secenekler: [
      {
        metin: "Makul kâr marjıyla, adil ücretli bir plan sun.",
        baseBasariSansi: 68,
        ipucu: "Yavaş büyüme, sağlam itibar",
        basariliSonuc: {
          para: 10,
          ahlak: 14,
          un: 10,
          etiket_ekle: ["yol:tuccar:adil", "sd_tuccar_yolu_secildi"],
          mesaj: "Banka planını güvenilir buldu; kredi onaylandı, ilk işçilerin sana güvenle bakıyor.",
          detay: "Bazı temeller yavaş atılır ama hiç çatlamaz.",
        },
        basarisizSonuc: {
          para: -8,
          ahlak: 12,
          etiket_ekle: ["yol:tuccar:adil", "sd_tuccar_yolu_secildi"],
          mesaj: "Banka planını 'tutkusuz' buldu, kredi küçüldü ama yine de bir başlangıç oldu.",
          detay: "Dürüstlük bazen kapıları yavaş açar.",
        },
      },
      {
        metin: "Ücretleri dibe çeken, en agresif kâr planını sun.",
        baseBasariSansi: 62,
        ipucu: "Hızlı büyüme, işçi ve itibar bedeli ağır",
        basariliSonuc: {
          para: 26,
          ahlak: -16,
          etiket_ekle: ["yol:tuccar:somurucu", "sd_tuccar_yolu_secildi"],
          mesaj: "Banka rakamları beğendi, kredi bol geldi; işçilerin ise sana bakışları soğudu.",
          detay: "Bazı büyüme hikayelerinin küçük harflerle yazılmış bir bedeli vardır.",
        },
        basarisizSonuc: {
          para: 12,
          ahlak: -18,
          un: -12,
          etiket_ekle: ["yol:tuccar:somurucu", "sd_tuccar_yolu_secildi"],
          mesaj: "Plan onaylandı ama haberler sızdı; şehirde 'acımasız patron' olarak anılmaya başladın.",
          detay: "Acımasızlık bazen sırt çevirmeden önce bir isim bırakır.",
        },
      },
      {
        metin: "Krediyi al ama parayı borsada büyütmeyi dene.",
        baseBasariSansi: 48,
        ipucu: "Kumarcı bir başlangıç, büyük kazanç ya da yıkım",
        basariliSonuc: {
          para: 34,
          mutluluk: -6,
          etiket_ekle: ["yol:tuccar:spekulator", "sd_tuccar_yolu_secildi"],
          mesaj: "Riskli hamle tuttu; kredi bir gecede iki katına çıktı, işletme neredeyse bedavaya büyüdü.",
          detay: "Bazı sanayiciler fabrikayla değil, cesaretle büyür.",
        },
        basarisizSonuc: {
          para: -28,
          mutluluk: -8,
          etiket_ekle: ["yol:tuccar:spekulator", "sd_tuccar_yolu_secildi"],
          mesaj: "Yatırım battı; krediyi geri ödeyebilmek için işletmenin yarısını satman gerekti.",
          detay: "Kumar masasında kaybeden hep en son öğrenir.",
        },
      },
      {
        metin: "Kâr payının bir kısmını işçi eğitimine ve şehir hayır işlerine ayır.",
        baseBasariSansi: 60,
        maliyet: 15,
        ipucu: "Küçük başlangıç, büyük ve kalıcı bir itibar",
        basariliSonuc: {
          para: -15,
          ahlak: 18,
          un: 16,
          dost_puani: 8,
          etiket_ekle: ["yol:tuccar:hayirsever", "sd_tuccar_yolu_secildi"],
          mesaj: "Şehir gazeteleri planını övdü; 'geleceğe yatırım yapan patron' diye tanındın.",
          detay: "Bazı sanayiciler makineyle değil, insanlarla büyür.",
        },
        basarisizSonuc: {
          para: -15,
          ahlak: 14,
          un: 4,
          etiket_ekle: ["yol:tuccar:hayirsever", "sd_tuccar_yolu_secildi"],
          mesaj: "Hayır işlerin şimdilik gölgede kaldı ama niyetin şehirde konuşulmaya başladı bile.",
          detay: "İyilik bazen sessizce ekilir, sonra bir gün meyve verir.",
        },
      },
    ],
  },
];
