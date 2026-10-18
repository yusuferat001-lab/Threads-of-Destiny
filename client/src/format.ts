/**
 * Para tutarlarını gösterir: tam sayıysa olduğu gibi, değilse en fazla 2 ondalık
 * basamakla (gereksiz sondaki sıfırlar kırpılarak). Çağa özel yıllık enflasyon
 * (Orta Çağ %1, Sanayi Devrimi %3) çok küçük artışlar üretebildiğinden, sadece
 * tam sayıya yuvarlarsak bu büyüme günlerce görünmez kalırdı.
 */
export function formatPara(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

/**
 * Yüzdeyi dile göre yazar: Türkçede işaret başta ("%15", "+%10", "-%5"),
 * İngilizcede sonda ("15%", "+10%", "-5%"). `deger` zaten yüzde birimindedir.
 */
export function formatYuzde(dil: 'tr' | 'en', deger: number, isaretli = false): string {
  const mutlak = Math.abs(deger);
  const isaret = deger < 0 ? '-' : isaretli && deger > 0 ? '+' : '';
  return dil === 'en' ? `${isaret}${mutlak}%` : `${isaret}%${mutlak}`;
}

/** Yüzde aralığı: TR "%60-80", EN "60-80%". */
export function formatYuzdeAralik(dil: 'tr' | 'en', min: number, max: number): string {
  return dil === 'en' ? `${min}-${max}%` : `%${min}-${max}`;
}

/** Müşteri sayısı: en fazla 1 ondalık (TR virgül, EN nokta); tam sayıysa ondalıksız. `isaretli` ise +/− öneki. */
export function formatMusteri(dil: 'tr' | 'en', n: number, isaretli = false): string {
  const v = Math.round(Math.abs(n) * 10) / 10;
  const metin = Number.isInteger(v) ? String(v) : dil === 'tr' ? v.toFixed(1).replace('.', ',') : v.toFixed(1);
  if (!isaretli) return n < 0 ? `−${metin}` : metin;
  return n > 0 ? `+${metin}` : n < 0 ? `−${metin}` : '±0';
}
