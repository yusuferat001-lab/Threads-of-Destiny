import { Cag } from "../types";

/**
 * Karakterin çağına/bölgesine/mesleğine göre gidebileceği sosyalleşme mekânı.
 * Oyuncu "Sosyalleş" ekranında bunlardan birini seçip gider (bkz. gameEngine.ts
 * sosyallesmeYerineGit); mekânın kendisi bir tur harcamaz, sadece ilgili
 * mekânın olay havuzundan (data/olaylar/sosyallesme.ts, sosyallesmeYeri alanıyla
 * eşleşen) bir olayı zorlanan-olay olarak kuyruğa alır — o olayın seçimi normal
 * zar/tur akışıyla çözülür.
 */
export interface SosyallesmeYeri {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  /** true ise bu mekâna gidip bir olay yaşamak "alkollü ziyaret" sayaçına eklenir (bkz. AYYAS_ESIGI). */
  alkolluMu: boolean;
  /** Belirtilmezse mekân her çağda uygun olur. */
  cag?: Cag;
  /** Belirtilmezse mekân her bölgede uygun olur. */
  bolgeler?: string[];
  /** Belirtilmezse mekân her meslekten karaktere uygun olur. */
  meslekler?: string[];
}

/**
 * Sosyalleşme ekranı "az ve öz" 3 slota indirildi (2026-09): oyuncu aynı anda en
 * fazla üç mekân görür — (1) her zaman **Pazar Meydanı** (evrensel), (2) çağa göre
 * bir **alkollü mekân** (Sanayi+İngiltere → Pub, aksi halde Meyhane), (3) mesleğe
 * özel bir mekân (Asker → Ordugâh Çadırı, Din Adamı → Cemaat Sofrası, Tüccar →
 * Lonca Meclisi). Kaldırılan mekânların (hamam/kahvehane/kervansaray/salon) olay
 * havuzları Pazar Meydanı ve Meyhane'ye taşındı (bkz. sosyallesme.ts).
 */
export const SOSYALLESME_YERLERI: SosyallesmeYeri[] = [
  {
    id: "pazar_meydani",
    ad: "Pazar Meydanı",
    simge: "🗣️",
    aciklama: "Şehrin nabzının attığı, herkesin birbirini tanıdığı ya da tanıyormuş gibi davrandığı açık meydan.",
    alkolluMu: false,
  },
  {
    id: "meyhane",
    ad: "Meyhane",
    simge: "🍷",
    aciklama: "Şarabın, dedikodunun ve kavganın bir arada aktığı, her tabakadan insanın girip çıktığı gürültülü mekân.",
    alkolluMu: true,
    bolgeler: ["Fransa", "Kutsal Roma", "Bizans", "Selçuklu", "Eyyubiler", "Osmanlı", "Rusya"],
  },
  {
    id: "pub",
    ad: "Pub",
    simge: "🍺",
    aciklama: "Ocak başında bira, dart ve işçi sınıfının en taze dedikodularıyla dolu, mahallenin kalbi sayılan İngiliz meyhanesi.",
    alkolluMu: true,
    cag: "Sanayi Devrimi",
    bolgeler: ["İngiltere"],
  },
  {
    id: "ordugah_cadiri",
    ad: "Ordugâh Çadırı",
    simge: "⛺",
    aciklama: "Nöbet aralarında askerlerin ateş başında toplanıp kadeh tokuşturduğu, hikâye ve meydan okumanın eksik olmadığı çadır.",
    alkolluMu: true,
    meslekler: ["Asker"],
  },
  {
    id: "dini_meclis",
    ad: "Cemaat Sofrası",
    simge: "📿",
    aciklama: "Ayin sonrası din adamlarının bir araya gelip cemaat işlerini, dedikoduyu ve derin sırları paylaştığı sade sofra.",
    alkolluMu: false,
    meslekler: ["Din Adamı"],
  },
  {
    id: "lonca_meclisi",
    ad: "Lonca Meclisi",
    simge: "🏺",
    aciklama: "Esnafın fiyat, rekabet ve dedikodu konuştuğu; bazen sert pazarlıkların masaya yumruk indirdiği toplantı salonu.",
    alkolluMu: false,
    meslekler: ["Tüccar"],
  },
];

export function sosyallesmeYeriGetir(id: string): SosyallesmeYeri | undefined {
  return SOSYALLESME_YERLERI.find((y) => y.id === id);
}

/** Bir mekânın, salt kendi tanımına göre (karakterin envanterinden/etiketlerinden bağımsız) bu çağ/bölge/mesleğe uygun olup olmadığı. */
export function sosyallesmeYeriUygunMu(yer: SosyallesmeYeri, cag: Cag, bolge: string, meslek: string): boolean {
  if (yer.cag !== undefined && yer.cag !== cag) return false;
  if (yer.bolgeler && !yer.bolgeler.includes(bolge)) return false;
  if (yer.meslekler && !yer.meslekler.includes(meslek)) return false;
  return true;
}
