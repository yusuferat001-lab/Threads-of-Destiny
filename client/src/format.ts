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
