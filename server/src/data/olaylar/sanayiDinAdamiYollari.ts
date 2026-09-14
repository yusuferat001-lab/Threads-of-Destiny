import type { OlayTanimi } from "./types";

/**
 * Sanayi Devrimi Din Adamı'nın dallanan kariyer yolu: "İlk Vaaz"
 * (gameEngine.ts'te zorla tetiklenir, bkz. senaryoUret) karakteri dört
 * tavırdan birine kilitler (yol:din:durust / fanatik / sosyal / yozlasmis).
 * Kilitlenen yolun etiketi bir daha değişmez; her yol-özel olay
 * gerekliEtiketler:["yol:din:X"] taşıdığı için karşı yolların içeriği
 * otomatik olarak kapalı kalır.
 *
 * NOT: Orta Çağ Din Adamı'nın kariyer yolu (ortaCagDinAdamiYollari.ts) da
 * aynı "yol:din:" önekini kullanır — çakışma yoktur çünkü tüm olaylar `cag`
 * filtresiyle ayrılır; bir karakter yalnız bir çağda yaşar.
 */
export const OLAY_SANAYI_DINADAMI_YOLLARI: OlayTanimi[] = [
  {
    id: "sd_din_yol_ilk_vaaz",
    kategori: "din",
    cag: "Sanayi Devrimi",
    meslekler: ["Din Adamı"],
    minYas: 18,
    yasakliEtiketler: ["sd_din_yolu_secildi"],
    gorsel: "📖",
    baslik: "İlk Vaaz",
    metin: "Cemaatin önünde ilk büyük vaazını veriyorsun. Şehirdeki fabrika işçileri açlık sınırında; bazıları senden Tanrı'nın adaletini vaaz etmeni, bazıları ise sabır ve itaati öğütlemeni bekliyor. Söyleyeceklerin, bundan sonra nasıl bir din adamı olacağını belirleyecek.",
    secenekler: [
      {
        metin: "Dengeli, ölçülü bir vaaz ver — ne kimseyi kışkırt ne de sustur.",
        baseBasariSansi: 70,
        ipucu: "Güvenilir bir başlangıç, sıra dışı bir etki bırakmaz",
        basariliSonuc: {
          ahlak: 14,
          un: 10,
          etiket_ekle: ["yol:din:durust", "sd_din_yolu_secildi"],
          mesaj: "Vaazın herkesi dinledi hissettirdi; cemaat sana 'dengeli çoban' demeye başladı.",
          detay: "Bazı yollar gürültüsüz başlar ama en sağlam olanlardır.",
        },
        basarisizSonuc: {
          ahlak: 10,
          un: 2,
          etiket_ekle: ["yol:din:durust", "sd_din_yolu_secildi"],
          mesaj: "Vaazın kimseyi kırmadı ama kimseyi de etkilemedi; sıradan bir başlangıç oldu.",
          detay: "Dengeli olmak bazen unutulmaya da açık kapı bırakır.",
        },
      },
      {
        metin: "Bilimi ve yeni fikirleri şeytan işi ilan et, eski öğretiye sıkı sarıl.",
        baseBasariSansi: 60,
        ipucu: "Sadık bir kitle kazanırsın, aydınlarla araya mesafe koyar",
        basariliSonuc: {
          un: 12,
          ahlak: -6,
          dost_puani: 8,
          etiket_ekle: ["yol:din:fanatik", "sd_din_yolu_secildi"],
          mesaj: "Muhafazakar cemaat vaazını ayakta alkışladı; artık sözün geçen bir isimsin.",
          detay: "Kesinlik bazen inandırıcıdır — doğru olup olmadığından bağımsız.",
        },
        basarisizSonuc: {
          un: -10,
          ahlak: -8,
          etiket_ekle: ["yol:din:fanatik", "sd_din_yolu_secildi"],
          mesaj: "Bazı cemaat üyeleri seni 'geri kafalı' diye eleştirdi; küçük bir tartışma çıktı.",
          detay: "Sert bir duruş bazen beklenenden fazla direnç doğurur.",
        },
      },
      {
        metin: "Fabrika sahiplerine karşı açıkça işçilerin yanında ol.",
        baseBasariSansi: 50,
        ipucu: "İşçilerin kalbini kazanırsın, güçlülerin düşmanlığını çekersin",
        basariliSonuc: {
          ahlak: 18,
          dost_puani: 14,
          rakip_puani: -10,
          etiket_ekle: ["yol:din:sosyal", "sd_din_yolu_secildi"],
          mesaj: "İşçiler seni omuzlarında taşıdı; ama fabrika sahipleri artık seni bir tehdit olarak görüyor.",
          detay: "Adaleti vaaz etmenin bir bedeli vardır, genelde güçlülerden gelir.",
        },
        basarisizSonuc: {
          ahlak: 15,
          un: -8,
          rakip_puani: -14,
          etiket_ekle: ["yol:din:sosyal", "sd_din_yolu_secildi"],
          mesaj: "Vaazın büyük bir tartışmaya yol açtı; kilise idaresi seni 'siyasete karışıyor' diye uyardı.",
          detay: "Bazı doğrular söylenir söylenmez düşman kazandırır.",
        },
      },
      {
        metin: "Fabrika sahibinden gizli bir bağış karşılığında 'itaat ve sabır' vaaz et.",
        baseBasariSansi: 65,
        ipucu: "Rahat bir kilise bütçesi, vicdanında kalıcı bir leke",
        basariliSonuc: {
          para: 20,
          ahlak: -20,
          etiket_ekle: ["yol:din:yozlasmis", "sd_din_yolu_secildi"],
          mesaj: "Bağış kilisenin çatısını onardı; ama işçilerin yüzündeki hayal kırıklığını görmezden gelemiyorsun.",
          detay: "Bazı rahatlıkların faturasını vicdan öder.",
        },
        basarisizSonuc: {
          para: 10,
          ahlak: -22,
          un: -14,
          etiket_ekle: ["yol:din:yozlasmis", "sd_din_yolu_secildi"],
          mesaj: "Anlaşma sızdı; cemaat 'patronun papazı' diye fısıldaşmaya başladı.",
          detay: "Gizli anlaşmalar er ya da geç birinin kulağına gider.",
        },
      },
    ],
  },
];
