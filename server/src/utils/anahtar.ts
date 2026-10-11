import { timingSafeEqual } from "node:crypto";

/** Panel/okuma anahtarını sabit zamanlı karşılaştırır (env yoksa ya da eşleşmezse false). */
export function anahtarEslesiyor(beklenen: string | undefined, gelen: unknown): boolean {
  if (!beklenen || typeof gelen !== "string") return false;
  const a = Buffer.from(beklenen);
  const b = Buffer.from(gelen);
  return a.length === b.length && timingSafeEqual(a, b);
}
