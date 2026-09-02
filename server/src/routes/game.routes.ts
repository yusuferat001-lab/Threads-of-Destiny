import { Router } from "express";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  stateGetir,
  isimOnerisiGetir,
  finansGetir,
  yatirimYap,
  yatirimConfigGetir,
  konutDegistir,
  yasamSecimiDegistir,
  ekipCikar,
  mulkConfigGetir,
  mulkSatinAl,
  dedikoduGetir,
  zarKademeleriGetir,
  zarAt,
  sosyallesmeYerleriGetir,
  sosyallesmeYerineGit,
  magazaConfigGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
} from "../game/gameEngine";
import { MESLEKLER, BOLGELER_BY_CAG } from "../game/stateManager";
import { YERLESIMLER } from "../data/yerlesimler";
import { KONUTLAR, TASINMA_MALIYETI } from "../data/konutlar";
import { YASAM_SECENEKLERI } from "../data/yasamSecenekleri";
import { MULK_TANIMLARI } from "../data/mulkler";
import { uygunsuzMu } from "../moderasyon/kufurFiltresi";
import { Cag, MulkTuru } from "../types";

export const gameRouter = Router();

const GECERLI_CAGLAR: Cag[] = ["Orta Çağ", "Sanayi Devrimi"];

gameRouter.get("/meslekler", (_req, res) => {
  res.json({ meslekler: MESLEKLER });
});

gameRouter.get("/bolgeler", (_req, res) => {
  res.json({ bolgeler: BOLGELER_BY_CAG });
});

gameRouter.get("/yerlesimler", (_req, res) => {
  res.json({ yerlesimler: YERLESIMLER });
});

gameRouter.get("/konutlar", (_req, res) => {
  res.json({ konutlar: KONUTLAR, tasinmaMaliyeti: TASINMA_MALIYETI });
});

gameRouter.get("/yasam-secenekleri", (_req, res) => {
  res.json({ yasamSecenekleri: YASAM_SECENEKLERI });
});

gameRouter.get("/isim-onerisi", (req, res) => {
  const cag = req.query.cag as Cag;
  const bolge = req.query.bolge as string;
  if (!GECERLI_CAGLAR.includes(cag)) {
    return res.status(400).json({ hata: "Geçersiz çağ." });
  }
  if (typeof bolge !== "string" || !BOLGELER_BY_CAG[cag].includes(bolge)) {
    return res.status(400).json({ hata: "Geçersiz bölge." });
  }
  res.json({ isim: isimOnerisiGetir(cag, bolge) });
});

gameRouter.post("/new", async (req, res) => {
  const { cag, bolge, yerlesim, isim } = req.body ?? {};
  if (!GECERLI_CAGLAR.includes(cag)) {
    return res.status(400).json({ hata: "Geçersiz çağ." });
  }
  if (typeof bolge !== "string" || !BOLGELER_BY_CAG[cag as Cag].includes(bolge)) {
    return res.status(400).json({ hata: "Geçersiz bölge." });
  }
  if (typeof yerlesim !== "string" || !YERLESIMLER.some((y) => y.id === yerlesim)) {
    return res.status(400).json({ hata: "Geçersiz yerleşim." });
  }
  let oyuncuIsmi: string | undefined;
  if (isim != null && typeof isim === "string" && isim.trim()) {
    const temiz = isim.trim().slice(0, 40);
    if (uygunsuzMu(temiz)) {
      return res.status(400).json({ hata: "Bu isim uygunsuz kelimeler içeriyor, başka bir isim dene." });
    }
    oyuncuIsmi = temiz;
  }
  try {
    const state = await yeniOyun(cag, bolge, yerlesim, oyuncuIsmi);
    res.json({ state });
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/meslek", async (req, res) => {
  const { meslek } = req.body ?? {};
  if (typeof meslek !== "string" || !MESLEKLER.includes(meslek)) {
    return res.status(400).json({ hata: "Geçersiz meslek." });
  }
  try {
    const state = await mesleğiAta(req.params.id, meslek);
    res.json({ state });
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.get("/:id/state", async (req, res) => {
  try {
    const state = await stateGetir(req.params.id);
    res.json({ state });
  } catch (err) {
    res.status(404).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/scenario", async (req, res) => {
  try {
    const senaryo = await senaryoUret(req.params.id);
    res.json({ senaryo });
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/choice", async (req, res) => {
  try {
    const { secenekIndex } = req.body ?? {};
    if (typeof secenekIndex !== "number") {
      return res.status(400).json({ hata: "secenekIndex sayı olmalı." });
    }
    const sonuc = await secimUygula(req.params.id, secenekIndex);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.get("/:id/finans", async (req, res) => {
  try {
    const finans = await finansGetir(req.params.id);
    res.json({ finans });
  } catch (err) {
    res.status(404).json({ hata: String(err) });
  }
});

gameRouter.get("/:id/yatirim-config", async (req, res) => {
  try {
    const config = await yatirimConfigGetir(req.params.id);
    res.json({ config });
  } catch (err) {
    res.status(404).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/yatirim", async (req, res) => {
  try {
    const sonuc = await yatirimYap(req.params.id);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

const GECERLI_MULK_TURLERI: MulkTuru[] = MULK_TANIMLARI.map((m) => m.tur);

gameRouter.get("/:id/mulk-config", async (req, res) => {
  try {
    const config = await mulkConfigGetir(req.params.id);
    res.json({ config });
  } catch (err) {
    res.status(404).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/mulk", async (req, res) => {
  const { tur } = req.body ?? {};
  if (typeof tur !== "string" || !GECERLI_MULK_TURLERI.includes(tur as MulkTuru)) {
    return res.status(400).json({ hata: "Geçersiz mülk türü." });
  }
  try {
    const sonuc = await mulkSatinAl(req.params.id, tur as MulkTuru);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.get("/:id/dedikodu", async (req, res) => {
  try {
    const dedikodular = await dedikoduGetir(req.params.id);
    res.json({ dedikodular });
  } catch (err) {
    res.status(404).json({ hata: String(err) });
  }
});

gameRouter.get("/:id/zar-kademeleri", async (req, res) => {
  try {
    const kademeler = await zarKademeleriGetir(req.params.id);
    res.json({ kademeler });
  } catch (err) {
    res.status(404).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/zar", async (req, res) => {
  const { tutar } = req.body ?? {};
  if (typeof tutar !== "number") {
    return res.status(400).json({ hata: "Geçersiz bahis tutarı." });
  }
  try {
    const sonuc = await zarAt(req.params.id, tutar);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/konut", async (req, res) => {
  const { konutId } = req.body ?? {};
  if (typeof konutId !== "string" || !KONUTLAR.some((k) => k.id === konutId)) {
    return res.status(400).json({ hata: "Geçersiz konut." });
  }
  try {
    const sonuc = await konutDegistir(req.params.id, konutId);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/yasam", async (req, res) => {
  const { secimId } = req.body ?? {};
  if (typeof secimId !== "string" || !YASAM_SECENEKLERI.some((y) => y.id === secimId)) {
    return res.status(400).json({ hata: "Geçersiz yaşam tarzı seçimi." });
  }
  try {
    const sonuc = await yasamSecimiDegistir(req.params.id, secimId);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/ekip/:ekipId/cikar", async (req, res) => {
  try {
    const sonuc = await ekipCikar(req.params.id, req.params.ekipId);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.get("/:id/sosyallesme-yerleri", async (req, res) => {
  try {
    const yerler = await sosyallesmeYerleriGetir(req.params.id);
    res.json({ yerler });
  } catch (err) {
    res.status(404).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/sosyallesme", async (req, res) => {
  const { yerId } = req.body ?? {};
  if (typeof yerId !== "string") {
    return res.status(400).json({ hata: "Geçersiz mekân." });
  }
  try {
    const sonuc = await sosyallesmeYerineGit(req.params.id, yerId);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.get("/:id/magaza", async (req, res) => {
  try {
    const katalog = await magazaConfigGetir(req.params.id);
    res.json({ katalog });
  } catch (err) {
    res.status(404).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/magaza/satin-al", async (req, res) => {
  const { katalogId } = req.body ?? {};
  if (typeof katalogId !== "string") {
    return res.status(400).json({ hata: "Geçersiz eşya." });
  }
  try {
    const sonuc = await magazadanSatinAl(req.params.id, katalogId);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/envanter/:esyaId/kullan", async (req, res) => {
  try {
    const sonuc = await envanterEsyasiKullan(req.params.id, req.params.esyaId);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});
