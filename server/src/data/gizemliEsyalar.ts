/**
 * Gizemli eşyaların (state.etiketler içinde "esya:" veya "envanter:" önekiyle
 * taşınan, bkz. client/src/envanter.ts) her biri için, karakter o eşyaya sahip
 * olduğu sürece hayatında en az bir kez görmesi garanti edilen takip olaylarının
 * id havuzu. gameEngine.ts'teki zorlanan-olay kaskadı bu haritayı, aynı
 * evcilHayvanlar.ts'deki EVCIL_HAYVAN_TAKIP_OLAY_IDLERI'nin kullanıldığı gibi
 * kullanır: sahip olunan bir eşyanın havuzundan hiç olay görülmemişse, belirli
 * bir yaş aralığında havuzdan biri zorla tetiklenir.
 *
 * ÖNEMLİ: Buraya eklenen her id'nin TEK koşulu ilgili eşyaya sahiplik olmalı
 * (yaş/mutluluk/meslek gibi ek bir kısıtı olmamalı) — zorlanan olaylar
 * uygunMu() kontrolünü atlar, ek bir kısıt varsa bağlamla çelişen bir sahne
 * zorla çıkabilir. Sadece fırsatçı biçimde (uygun olduğunda rastgele) çıkması
 * istenen eşya-olayları (ör. ruh_karanlik_fisiltilar) bu haritaya eklenmez.
 */
export const GIZEMLI_ESYA_TAKIP_HAVUZU: Record<string, string[]> = {
  melek_tuyu: ["gizem_melek_tuyu_mucize", "gizem_melek_tuyu_calinti"],
  kutsal_kalinti: ["derinlik_kutsal_kalinti_mucizesi", "derinlik_kutsal_kalinti_soru"],
  lanetli_altin: ["derinlik_lanetli_altin_ruyasi", "derinlik_lanetli_altin_musteri"],
  fisildayan_tas: ["gizem_fisildayan_tas_uyari", "gizem_fisildayan_tas_istek"],
  eski_ayna: ["gizem_eski_ayna_yansima", "gizem_eski_ayna_kehanet"],
};
