import { Router } from "express";
import { randomUUID } from "node:crypto";
import {
  geriBildirimYaz,
  geriBildirimleriOku,
  type GeriBildirimKaydi,
} from "../utils/geriBildirimDeposu";
import { webhookBildirimGonder } from "../utils/webhookBildirim";
import { geriBildirimPaneliHtml } from "../utils/geriBildirimPanel";

export const geriBildirimRouter = Router();

const MAKS_MESAJ = 2000;
const MAKS_ILETISIM = 120;
const GECERLI_KATEGORILER = new Set(["hata", "oneri", "diger"]);

type TemizlemeSonucu =
  | { ok: true; kayit: Omit<GeriBildirimKaydi, "ip"> }
  | { ok: false; hata: string; sessiz?: boolean };

/**
 * Gövdeyi doğrular + temizler. Saf fonksiyon (I/O yok) — HTTP dışında test edilebilir
 * olması için ayrıldı (bkz. scripts/verifyGeriBildirim.ts).
 */
export function geriBildirimTemizle(govde: unknown): TemizlemeSonucu {
  const g = (govde ?? {}) as Record<string, unknown>;

  // Bal küpü: gizli alan doldurulmuşsa bir bot — sessizce "başarılı" dön, hiçbir şey kaydetme.
  if (typeof g.sirket === "string" && g.sirket.trim() !== "") {
    return { ok: false, hata: "bot", sessiz: true };
  }

  if (typeof g.mesaj !== "string" || g.mesaj.trim().length < 3) {
    return { ok: false, hata: "Mesaj çok kısa." };
  }

  const kategori = GECERLI_KATEGORILER.has(g.kategori as string)
    ? (g.kategori as string)
    : "diger";
  const mesaj = g.mesaj.trim().slice(0, MAKS_MESAJ);
  const iletisim =
    typeof g.iletisim === "string" && g.iletisim.trim()
      ? g.iletisim.trim().slice(0, MAKS_ILETISIM)
      : null;

  const baglam: Record<string, unknown> =
    g.baglam && typeof g.baglam === "object" && !Array.isArray(g.baglam)
      ? Object.fromEntries(
          Object.entries(g.baglam as Record<string, unknown>)
            .slice(0, 20)
            .map(([k, v]) => [
              k.slice(0, 40),
              typeof v === "string" ? v.slice(0, 300) : v,
            ])
        )
      : {};

  return {
    ok: true,
    kayit: {
      id: randomUUID(),
      tarih: new Date().toISOString(),
      kategori,
      mesaj,
      iletisim,
      baglam,
    },
  };
}

geriBildirimRouter.post("/", async (req, res) => {
  try {
    const sonuc = geriBildirimTemizle(req.body);
    if (!sonuc.ok) {
      if (sonuc.sessiz) return res.json({ ok: true });
      return res.status(400).json({ hata: sonuc.hata });
    }

    const kayit: GeriBildirimKaydi = { ...sonuc.kayit, ip: req.ip ?? null };
    await geriBildirimYaz(kayit);

    const ozet = [
      `📨 Yeni geri bildirim — ${kayit.kategori}`,
      kayit.mesaj,
      kayit.iletisim ? `↳ iletişim: ${kayit.iletisim}` : null,
      Object.keys(kayit.baglam).length ? `↳ bağlam: ${JSON.stringify(kayit.baglam)}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    void webhookBildirimGonder(ozet);

    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

function yetkili(req: { query: Record<string, unknown> }): boolean {
  const anahtar = process.env.GERI_BILDIRIM_ANAHTARI;
  return !!anahtar && req.query.key === anahtar;
}

// Geliştiricinin kayıtları okuması için — `GERI_BILDIRIM_ANAHTARI` env değeriyle korunur.
geriBildirimRouter.get("/", async (req, res) => {
  if (!yetkili(req)) return res.status(403).json({ hata: "Yetkisiz." });
  res.json({ kayitlar: await geriBildirimleriOku() });
});

// Aynı anahtar — kayıtları tek-dosya bağımlılıksız bir HTML panosu olarak render eder
// (`GET /api/istatistik/panel` ile aynı desen).
geriBildirimRouter.get("/panel", async (req, res) => {
  if (!yetkili(req)) return res.status(403).type("text/plain").send("Yetkisiz.");
  try {
    const kayitlar = await geriBildirimleriOku();
    res.type("text/html").send(geriBildirimPaneliHtml(kayitlar));
  } catch (err) {
    res.status(500).type("text/plain").send(String(err));
  }
});
