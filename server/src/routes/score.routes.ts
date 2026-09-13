import { Router } from "express";
import { skorTablosuGetir, SiralamaTuru, SiralamaDonemi } from "../db/scoreRepository";
import { liderlikTablosunaKaydet } from "../game/gameEngine";
import { uygunsuzMu } from "../moderasyon/kufurFiltresi";

export const scoreRouter = Router();

scoreRouter.post("/", async (req, res) => {
  try {
    const { stateId, isim } = req.body ?? {};
    if (typeof stateId !== "string" || typeof isim !== "string" || !isim.trim()) {
      return res.status(400).json({ hata: "stateId ve isim zorunlu." });
    }
    const temizIsim = isim.trim().slice(0, 40);
    if (uygunsuzMu(temizIsim)) {
      return res.status(400).json({ hata: "Bu isim uygunsuz kelimeler içeriyor, başka bir isim dene." });
    }
    const kayit = await liderlikTablosunaKaydet(stateId, temizIsim);
    res.json({ kayit });
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

scoreRouter.get("/", async (req, res) => {
  const tur = (req.query.tur as SiralamaTuru) ?? "genel";
  const donem: SiralamaDonemi = req.query.donem === "hafta" ? "hafta" : "tumZaman";
  const tablo = await skorTablosuGetir(tur, 15, donem);
  res.json({ tablo });
});
