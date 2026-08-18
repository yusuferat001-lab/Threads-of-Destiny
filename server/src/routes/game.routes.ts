import { Router } from "express";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  stateGetir,
  soyuSurdur,
  finansGetir,
  yatirimYap,
  yatirimConfigGetir,
  YatirimTuru,
  konutDegistir,
  yasamSecimiDegistir,
  ekipCikar,
} from "../game/gameEngine";
import { MESLEKLER, BOLGELER_BY_CAG } from "../game/stateManager";
import { YERLESIMLER } from "../data/yerlesimler";
import { KONUTLAR, TASINMA_MALIYETI } from "../data/konutlar";
import { YASAM_SECENEKLERI } from "../data/yasamSecenekleri";
import { Cag } from "../types";

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

gameRouter.post("/new", async (req, res) => {
  const { cag, bolge, yerlesim } = req.body ?? {};
  if (!GECERLI_CAGLAR.includes(cag)) {
    return res.status(400).json({ hata: "Geçersiz çağ." });
  }
  if (typeof bolge !== "string" || !BOLGELER_BY_CAG[cag as Cag].includes(bolge)) {
    return res.status(400).json({ hata: "Geçersiz bölge." });
  }
  if (typeof yerlesim !== "string" || !YERLESIMLER.some((y) => y.id === yerlesim)) {
    return res.status(400).json({ hata: "Geçersiz yerleşim." });
  }
  try {
    const state = await yeniOyun(cag, bolge, yerlesim);
    res.json({ state });
  } catch (err) {
    res.status(400).json({ hata: String(err) });
  }
});

gameRouter.post("/:id/soy-surdur", async (req, res) => {
  try {
    const state = await soyuSurdur(req.params.id);
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

const GECERLI_YATIRIM_TURLERI: YatirimTuru[] = ["kendi_isi", "guvenli", "riskli"];

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
  const { tur, tutar } = req.body ?? {};
  if (typeof tur !== "string" || !GECERLI_YATIRIM_TURLERI.includes(tur as YatirimTuru)) {
    return res.status(400).json({ hata: "Geçersiz yatırım türü." });
  }
  if (tutar !== undefined && typeof tutar !== "number") {
    return res.status(400).json({ hata: "Geçersiz yatırım tutarı." });
  }
  try {
    const sonuc = await yatirimYap(req.params.id, tur as YatirimTuru, tutar);
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
