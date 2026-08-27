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

export const SOSYALLESME_YERLERI: SosyallesmeYeri[] = [
  {
    id: "meyhane",
    ad: "Meyhane",
    simge: "🍷",
    aciklama: "Şarabın, dedikodunun ve kavganın bir arada aktığı, kapısından her tabakadan insanın girip çıktığı gürültülü mekân.",
    alkolluMu: true,
    bolgeler: ["Fransa", "Kutsal Roma", "Bizans", "Osmanlı", "Rusya"],
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
    id: "hamam",
    ad: "Hamam",
    simge: "♨️",
    aciklama: "Buharın içinde kimsenin rütbesinin görünmediği; iş bağlantılarının, evlilik konuşmalarının ve şehir dedikodusunun asıl mekânı.",
    alkolluMu: false,
    bolgeler: ["Bizans", "Selçuklu", "Eyyubiler", "Osmanlı"],
  },
  {
    id: "kahvehane",
    ad: "Kahvehane",
    simge: "☕",
    aciklama: "Nargilenin dumanı, tavla taşlarının sesi ve bir meddahın hikâyesi eşliğinde saatlerce oturulan mahalle kahvehanesi.",
    alkolluMu: false,
    cag: "Sanayi Devrimi",
    bolgeler: ["Osmanlı"],
  },
  {
    id: "kervansaray",
    ad: "Kervansaray",
    simge: "🐫",
    aciklama: "Uzak diyarlardan gelen tüccarların, hikâyelerin ve garip eşyaların bir gecelik konakladığı taş avlu.",
    alkolluMu: false,
    cag: "Orta Çağ",
    bolgeler: ["Selçuklu", "Eyyubiler", "Bizans"],
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
  {
    id: "pazar_meydani",
    ad: "Pazar Meydanı",
    simge: "🗣️",
    aciklama: "Şehrin nabzının attığı, herkesin birbirini tanıdığı ya da tanıyormuş gibi davrandığı açık meydan.",
    alkolluMu: false,
  },
  {
    id: "salon",
    ad: "Soylu Salonu",
    simge: "🎻",
    aciklama: "Kristal kadehlerin tokuşturulduğu, entrikanın kadife eldiven altında döndüğü davetli gecesi.",
    alkolluMu: false,
    bolgeler: ["Fransa", "Kutsal Roma", "Bizans", "İngiltere"],
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
