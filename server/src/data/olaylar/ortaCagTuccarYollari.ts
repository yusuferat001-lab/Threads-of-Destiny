import type { OlayTanimi } from "./types";

/**
 * Orta Çağ Tüccar'ın dallanan kariyer yolu: "İlk Anlaşma" (gameEngine.ts'te
 * zorla tetiklenir, bkz. senaryoUret) karakteri dört ticaret felsefesinden
 * birine kilitler (yol:tuccar:durust / acgozlu / kacakci / hayirsever).
 * Kilitlenen yolun etiketi bir daha değişmez; her yol-özel olay
 * gerekliEtiketler:["yol:tuccar:X"] taşıdığı için karşı yolların içeriği
 * otomatik olarak kapalı kalır.
 */
export const OLAY_ORTACAG_TUCCAR_YOLLARI: OlayTanimi[] = [
  {
    id: "oc_tuccar_yol_ilk_anlasma",
    kategori: "ticaret",
    cag: "Orta Çağ",
    meslekler: ["Tüccar"],
    minYas: 18,
    yasakliEtiketler: ["tuccar_yolu_secildi"],
    gorsel: "⚖️",
    baslik: "İlk Anlaşma",
    metin: "Ustan sana ilk büyük anlaşmayı devrediyor: bir keşiş topluluğu, kıtlık yılında tohumluk buğday istiyor ama elindeki tek parti kalitesiz ve az. Bu anlaşmayı nasıl kapattığın, bundan sonra ne tür bir tüccar olacağını belirleyecek.",
    secenekler: [
      {
        metin: "Malın gerçek durumunu söyle, adil bir fiyat teklif et.",
        baseBasariSansi: 70,
        ipucu: "Yavaş güven inşa eder, kâr marjın dar kalır",
        basariliSonuc: {
          para: 8,
          ahlak: 15,
          un: 10,
          etiket_ekle: ["yol:tuccar:durust", "tuccar_yolu_secildi"],
          mesaj: "Keşişler dürüstlüğüne şaşırdı; küçük ama sağlam bir anlaşma imzalandı.",
          detay: "Bazı itibarlar tek bir dürüst cümleyle kurulur.",
        },
        basarisizSonuc: {
          para: -5,
          ahlak: 12,
          etiket_ekle: ["yol:tuccar:durust", "tuccar_yolu_secildi"],
          mesaj: "Dürüstlüğün anlaşmayı ucuzlattı ama en azından vicdanın rahat.",
          detay: "Doğru yol bazen kısa vadede zarar ettirir.",
        },
      },
      {
        metin: "Malın eksiğini gizle, tam fiyatına sat.",
        baseBasariSansi: 60,
        ipucu: "Yüksek kâr, ortaya çıkarsa güven kırılır",
        basariliSonuc: {
          para: 22,
          ahlak: -14,
          etiket_ekle: ["yol:tuccar:acgozlu", "tuccar_yolu_secildi"],
          mesaj: "Keşişler farkına varmadan tam fiyatı ödedi; kasan hızla doldu.",
          detay: "İlk hile en tatlısıdır; sonrakiler alışkanlık olur.",
        },
        basarisizSonuc: {
          para: 10,
          ahlak: -16,
          un: -10,
          etiket_ekle: ["yol:tuccar:acgozlu", "tuccar_yolu_secildi"],
          mesaj: "Keşişler hileyi fark etti; parayı aldın ama adın loncada lekelendi.",
          detay: "Bazı yalanlar satıştan sonra da peşini bırakmaz.",
        },
      },
      {
        metin: "Malı bir gece karanlığında kaçak yoldan başka bir alıcıya kaydır.",
        baseBasariSansi: 50,
        ipucu: "En yüksek kâr, yakalanma ve suç izi riski büyük",
        basariliSonuc: {
          para: 30,
          ahlak: -10,
          suc_artis: 10,
          etiket_ekle: ["yol:tuccar:kacakci", "tuccar_yolu_secildi"],
          mesaj: "Mal karanlıkta el değiştirdi, kimse fark etmedi; kârın iki katına çıktı.",
          detay: "Gölgelerde iş yapmayı öğrenen bir daha ışığa pek dönmez.",
        },
        basarisizSonuc: {
          para: -12,
          un: -12,
          suc_artis: 14,
          etiket_ekle: ["yol:tuccar:kacakci", "tuccar_yolu_secildi"],
          mesaj: "Kaçakçılık girişimin loncanın kulağına gitti; hem malı hem itibarını kaybettin.",
          detay: "Karanlıkta yürüyenler bazen kendi gölgelerine takılır.",
        },
      },
      {
        metin: "Malı maliyetine ver, kalanı kendi cebinden tamamla.",
        baseBasariSansi: 65,
        maliyet: 12,
        ipucu: "Cepten fedakarlık, büyük bir hayırseverlik ünü",
        basariliSonuc: {
          para: -12,
          ahlak: 20,
          un: 18,
          dost_puani: 8,
          etiket_ekle: ["yol:tuccar:hayirsever", "tuccar_yolu_secildi"],
          mesaj: "Keşişler seni bölgenin en cömert tüccarı diye anmaya başladı; haberin köyden köye yayıldı.",
          detay: "Bazı yatırımlar kasaya değil, ada geri döner.",
        },
        basarisizSonuc: {
          para: -12,
          ahlak: 15,
          un: 6,
          etiket_ekle: ["yol:tuccar:hayirsever", "tuccar_yolu_secildi"],
          mesaj: "Fedakarlığın karşılıksız kaldı gibi görünse de, en azından niyetin belliydi.",
          detay: "Cömertlik her zaman alkışlanmaz ama her zaman bir yerlere yazılır.",
        },
      },
    ],
  },
];
