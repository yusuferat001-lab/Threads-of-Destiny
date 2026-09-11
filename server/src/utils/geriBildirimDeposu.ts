import { prisma } from "../db/prismaClient";

/**
 * Geri bildirim deposu — artık PostgreSQL (Neon), eski JSONL dosyası KALDIRILDI.
 *
 * Render "free" planında kalıcı disk olmadığından JSONL her deploy/restart'ta
 * sıfırlanıyordu; `Metrik` ile aynı desende kalıcı bir tabloya taşındı (§20/§29).
 * Yazım ateşle-unut'tur (Prisma patlarsa ana istek ETKİLENMEZ, sadece log).
 * `GET /api/geri-bildirim?key=…` (anahtar korumalı) bu tablodan okur. Anlık haber
 * için `webhookBildirimGonder` ayrıca çağrılır (opsiyonel).
 */

export interface GeriBildirimKaydi {
  id: string;
  tarih: string;
  kategori: string;
  mesaj: string;
  iletisim: string | null;
  baglam: Record<string, unknown>;
  ip: string | null;
}

function guvenliParse(s: string): Record<string, unknown> {
  try {
    const v = JSON.parse(s);
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  } catch {
    return {};
  }
}

/**
 * Neon'a yazar. ÖNEMLİ: eskiden bu fonksiyon hatayı yutup sadece `console.error`
 * basıyordu — route da hep `{ok:true}` döndüğü için DB yazımı sessizce başarısız
 * olduğunda (geçici bağlantı kopması, Neon free-tier soğuk başlangıç vb.) kullanıcı
 * "gönderildi" mesajını görüyor ama mesaj hiçbir yere kaydedilmiyordu. Artık:
 * geçici hatalar için TEK bir yeniden deneme yapılır (kısa bir bekleme sonrası);
 * o da başarısız olursa hata YUKARI FIRLATILIR ki çağıran (route) gerçek bir hata
 * döndürüp kullanıcıya "tekrar dene" gösterebilsin.
 */
export async function geriBildirimYaz(kayit: GeriBildirimKaydi): Promise<void> {
  const veri = {
    id: kayit.id,
    kategori: kayit.kategori,
    mesaj: kayit.mesaj,
    iletisim: kayit.iletisim,
    baglam: JSON.stringify(kayit.baglam ?? {}),
    ip: kayit.ip,
  };
  try {
    await prisma.geriBildirim.create({ data: veri });
    return;
  } catch (err) {
    console.error("Geri bildirim yazılamadı (1. deneme):", err);
  }
  await new Promise((r) => setTimeout(r, 400));
  try {
    await prisma.geriBildirim.create({ data: veri });
  } catch (err) {
    console.error("Geri bildirim yazılamadı (2. deneme, vazgeçildi):", err);
    throw err;
  }
}

export async function geriBildirimleriOku(limit = 200): Promise<GeriBildirimKaydi[]> {
  try {
    const satirlar = await prisma.geriBildirim.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return satirlar.map((s) => ({
      id: s.id,
      tarih: s.createdAt.toISOString(),
      kategori: s.kategori,
      mesaj: s.mesaj,
      iletisim: s.iletisim,
      baglam: guvenliParse(s.baglam),
      ip: s.ip,
    }));
  } catch (err) {
    console.error("Geri bildirim okunamadı:", err);
    return [];
  }
}
