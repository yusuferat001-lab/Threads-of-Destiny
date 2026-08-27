import { OlayTanimi } from "./types";

/**
 * "Dünya olayları": savaş/zorunlu bağış/küçük kriz tamamen arka planda
 * (gameEngine.ts'teki periyodik kontrol fonksiyonlarıyla) tetiklenir, hiç
 * olay ekranı gerektirmez. Veba TEK istisna — "önlem alırsan bulaşma
 * ihtimalin düşer" gerçek bir oyuncu kararı gerektirdiği için burada küçük
 * bir zorlanan olay olarak tanımlanır (bkz. stateManager.ts vebaBaslamaliMi,
 * gameEngine.ts'teki oturum.zorlananOlayId ataması, CLAUDE.md §27).
 */
export const OLAY_KURESEL: OlayTanimi[] = [
  {
    id: "kuresel_veba_baslangici",
    kategori: "saglik",
    minYas: 18,
    gerekliUlke: { vebada: false },
    gorsel: "☠️",
    baslik: "Salgın Haberleri",
    metin:
      "{bolge} sokaklarında endişeli fısıltılar dolaşıyor: uzak bir kasabada garip bir hastalık baş göstermiş, hızla yayılıyormuş. Bazı komşuların da benzer belirtiler gösterdiği söyleniyor. Nasıl davranacaksın?",
    secenekler: [
      {
        metin: "Önlem al: mesafeni koru, temizliğe dikkat et, kalabalıktan uzak dur",
        baseBasariSansi: 90,
        basariliSonuc: {
          ulke_etkisi: { vebada: true },
          etiket_ekle: ["veba_onlem_alindi"],
          mesaj:
            "Aldığın önlemler sayesinde kendini nispeten güvende hissediyorsun, ama salgın yine de {bolge}'yi sarmış durumda.",
        },
        basarisizSonuc: {
          ulke_etkisi: { vebada: true },
          saglik: -5,
          mesaj: "Ne kadar dikkat etsen de hastalık seni de az da olsa etkilemiş görünüyor.",
        },
      },
      {
        metin: "Her zamanki gibi yaşamaya devam et, abartacak bir şey yok",
        baseBasariSansi: 70,
        basariliSonuc: {
          ulke_etkisi: { vebada: true },
          mesaj: "Alışkanlıklarını değiştirmedin; şimdilik şanslısın ama salgın {bolge}'de yayılıyor.",
        },
        basarisizSonuc: {
          ulke_etkisi: { vebada: true },
          saglik: -8,
          mesaj: "Dikkatsizliğinin bedelini hemen ödedin: hastalık seni de bulmuş.",
        },
      },
    ],
  },
];
