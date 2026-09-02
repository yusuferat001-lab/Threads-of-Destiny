import fs from "node:fs";
import path from "node:path";

/**
 * Geri bildirimlerin yerel yedek kaydı — her satır bir JSON nesnesi (JSONL).
 *
 * Anlık teslimat `webhookBildirimGonder` ile yapılır; bu dosya bir güvenlik ağı ve
 * `GET /api/geri-bildirim?key=...` okuması için kaynaktır. Render "free" planında
 * kalıcı disk olmadığından bu dosya deploy/restart'ta SIFIRLANIR — prod'da tek
 * güvenilir kanal webhook'tur. `GERI_BILDIRIM_DOSYA` ile yol değiştirilebilir
 * (ör. bir kalıcı disk mount noktası).
 */
const DOSYA =
  process.env.GERI_BILDIRIM_DOSYA ??
  path.resolve(__dirname, "..", "..", "data", "geri-bildirim.jsonl");

export interface GeriBildirimKaydi {
  id: string;
  tarih: string;
  kategori: string;
  mesaj: string;
  iletisim: string | null;
  baglam: Record<string, unknown>;
  ip: string | null;
}

export function geriBildirimYaz(kayit: GeriBildirimKaydi): void {
  try {
    fs.mkdirSync(path.dirname(DOSYA), { recursive: true });
    fs.appendFileSync(DOSYA, JSON.stringify(kayit) + "\n", "utf8");
  } catch (err) {
    console.error("Geri bildirim dosyaya yazılamadı:", err);
  }
}

export function geriBildirimleriOku(limit = 200): GeriBildirimKaydi[] {
  try {
    const ham = fs.readFileSync(DOSYA, "utf8");
    return ham
      .split("\n")
      .filter(Boolean)
      .slice(-limit)
      .map((s) => JSON.parse(s) as GeriBildirimKaydi)
      .reverse();
  } catch {
    return [];
  }
}
