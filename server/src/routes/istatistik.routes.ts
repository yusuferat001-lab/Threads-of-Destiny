import { Router } from "express";
import { anahtarEslesiyor } from "../utils/anahtar";
import { metrikYaz, istatistikOzeti } from "../db/metrikRepository";
import { istatistikPaneliHtml } from "../utils/istatistikPanel";

export const istatistikRouter = Router();

/** Client'ın doğrudan yazabildiği TEK metrik türü — diğerleri motor-içi tetiklenir (§32). */
const CLIENT_TURLERI = new Set(["ziyaret"]);

type OlayTemizlemeSonucu =
  | { ok: true; tur: string; istemci_id: string; meta: string }
  | { ok: false };

/** `POST /olay` gövdesini doğrular + temizler. Saf fonksiyon (I/O yok) — test edilebilir. */
export function olayGovdesiTemizle(govde: unknown): OlayTemizlemeSonucu {
  const g = (govde ?? {}) as Record<string, unknown>;
  if (typeof g.tur !== "string" || !CLIENT_TURLERI.has(g.tur)) return { ok: false };
  const istemci_id =
    typeof g.istemci_id === "string" ? g.istemci_id.trim().slice(0, 64) : "";
  const meta = typeof g.meta === "string" ? g.meta.slice(0, 200) : "";
  return { ok: true, tur: g.tur, istemci_id, meta };
}

istatistikRouter.post("/olay", (req, res) => {
  const sonuc = olayGovdesiTemizle(req.body);
  if (!sonuc.ok) return res.status(400).json({ hata: "Geçersiz olay." });
  void metrikYaz({
    tur: "ziyaret",
    istemci_id: sonuc.istemci_id,
    meta: sonuc.meta,
  });
  res.json({ ok: true });
});

/** Anahtar kontrolü — env yoksa ya da eşleşmezse 403 (geri bildirim ucundaki desen). */
function yetkili(req: { query: Record<string, unknown> }): boolean {
  return anahtarEslesiyor(process.env.ISTATISTIK_ANAHTARI, req.query.key);
}

istatistikRouter.get("/", async (req, res) => {
  if (!yetkili(req)) return res.status(403).json({ hata: "Yetkisiz." });
  try {
    res.json({ ozet: await istatistikOzeti() });
  } catch (err) {
    res.status(500).json({ hata: String(err) });
  }
});

istatistikRouter.get("/panel", async (req, res) => {
  if (!yetkili(req)) return res.status(403).type("text/plain").send("Yetkisiz.");
  try {
    const ozet = await istatistikOzeti();
    res.type("text/html").send(istatistikPaneliHtml(ozet));
  } catch (err) {
    res.status(500).type("text/plain").send(String(err));
  }
});
