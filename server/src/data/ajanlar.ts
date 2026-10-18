/**
 * Ajanlar (2026-10, §43 Faz 2): oyuncunun parayla tuttuğu, karanlık işleri
 * onun yerine çeviren adamlar. Ayrı bir sistem DEĞİL — normal ekip üyeleridir
 * (`EkipUyesi`, rolü aşağıdakilerden biri); maaşları ekip gideri olarak yıllık
 * düşer, Kariyer ekranındaki "Ekibin" listesinden kovulabilirler.
 *
 * Bir ajana iş verilince zar HEMEN atılmaz: görev `state.ajan_gorevleri`'ne
 * yazılır ve bir sonraki seçimde yıl ilerlerken çözülür (sonucu zaman
 * anlatısında okursun). Ajan o sırada başka iş alamaz.
 *
 * Başarı şansı oyuncunun yatkınlığından değil ajanın gizli kalitesinden gelir.
 * Başarısızlıkta sağlık/ölüm bedelini ajan öder; ama ajan yakalanabilir ve
 * sadakati düşükse seni ele verir (suç + hapis riski sana döner).
 */
export type AjanRolu = "Hırsız" | "Kabadayı" | "Casus" | "Suikastçı";

export interface AjanRolTanimi {
  rol: AjanRolu;
  simge: string;
  /** Peşin tutma ücreti (taban, enflasyonla ölçeklenir). */
  ucret: number;
  /** Yıllık maaşın taban kısmı; üstüne kalite/20 eklenir. */
  maasTaban: number;
}

export const AJAN_ROLLERI: AjanRolTanimi[] = [
  { rol: "Hırsız", simge: "🦊", ucret: 10, maasTaban: 3 },
  { rol: "Kabadayı", simge: "🪓", ucret: 12, maasTaban: 3 },
  { rol: "Casus", simge: "🕵️", ucret: 16, maasTaban: 4 },
  { rol: "Suikastçı", simge: "🗡️", ucret: 30, maasTaban: 6 },
];

export function ajanRolTanimiGetir(rol: string): AjanRolTanimi | undefined {
  return AJAN_ROLLERI.find((r) => r.rol === rol);
}

export function ajanRoluMu(rol: string): rol is AjanRolu {
  return AJAN_ROLLERI.some((r) => r.rol === rol);
}

/** Başarısız görevde ajanın yakalanma ihtimali (yakalanan ajan ekipten düşer). */
export const AJAN_YAKALANMA_IHTIMALI = 0.6;
/** Yakalanan ajanın seni ele verme ihtimali: (100 - sadakat)/100 × bu çarpan. */
export const AJAN_IHBAR_CARPANI = 0.8;
/** Başarılı görevde bile ağzından kaçırma ihtimali: (100 - sadakat) / bu bölen. */
export const AJAN_SIZINTI_BOLEN = 400;
/** Başarılı görev sonrası ajanın sadakat artışı. */
export const AJAN_BASARI_SADAKAT = 5;

/** Ajanın başarı şansı: işin tabanı × (0.5 + kalite/100) → kalite 50'de taban, 100'de ×1.5. */
export function ajanBasariSansi(tabanSans: number, gercekKalite: number): number {
  return Math.round(Math.min(95, Math.max(5, tabanSans * (0.5 + gercekKalite / 100))));
}
