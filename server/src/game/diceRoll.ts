export function rollSuccess(basariSansi: number): boolean {
  const sans = Math.max(0, Math.min(100, basariSansi));
  return Math.random() * 100 < sans;
}
