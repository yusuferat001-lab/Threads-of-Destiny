import { Router } from "express";
import {
  yeniOyun,
  yilGec,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  stateGetir,
  isimOnerisiGetir,
  finansGetir,
  gostergeGetir,
  aranmaGetir,
  aranmaKefaretOde,
  aranmaTeslimOl,
  aranmaBildirimiYanitla,
  dunyaGecmisiGetir,
  kotuIsYap,
  kotuIsConfigGetir,
  konutDegistir,
  yasamSecimiDegistir,
  ekipCikar,
  mulkConfigGetir,
  mulkSatinAl,
  dedikoduGetir,
  zarKademeleriGetir,
  sosyallesmeAksiyonConfigGetir,
  sosyallesmeAksiyonYap,
  sosyallesmeOlayCoz,
  zarAt,
  ucKagitciOyna,
  bilekGuresiSonuc,
  sosyallesmeYerleriGetir,
  sosyallesmeYerineGit,
  magazaConfigGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
  mantikTeklifEt,
  dugunYap,
  esEylemYap,
  cocukIseAl,
  cocukRedTepkisi,
  tanismaGetir,
  tanismaYaklas,
  tanismaVazgec,
  tanismaSec,
  sevgiliTeklifEt,
  sevgiliGonulAl,
  sevgiliAyril,
  aileDurumGetir,
  aileEtkilesimYap,
  aileTalebiKararlastir,
  yonetimDurumGetir,
  yonetimEtkilesimYap,
  yonetimIstekYap,
  yonetimTalebiKararlastir,
  oturumDiliAyarla,
  rakiplerGetir,
  pazarDurumGetir,
  ajanDurumGetir,
  ajanTut,
  isletmeDurumGetir,
  isletmeKararVer,
  isletmeOgretiSec,
  isletmeUrunSec,
  isletmeYatirimYap,
  isletmeCalisanAl,
  amaclarGetir,
  hediyeEt,
  salginKorunmaConfigGetir,
  salginKorunmaYatirimiYap,
  krediConfigGetir,
  krediAlEndpoint,
  krediPazarlikEndpoint,
} from "../game/gameEngine";
import { MESLEKLER, BOLGELER_BY_CAG } from "../game/stateManager";
import { YERLESIMLER } from "../data/yerlesimler";
import { KONUTLAR, TASINMA_MALIYETI } from "../data/konutlar";
import { YASAM_SECENEKLERI } from "../data/yasamSecenekleri";
import { MULK_TANIMLARI } from "../data/mulkler";
import { uygunsuzMu } from "../moderasyon/kufurFiltresi";
import { Cag, MulkTuru } from "../types";
import { hataMetni } from "./hata";

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
  const { cag, bolge, yerlesim, isim, dil, istemciId } = req.body ?? {};
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
  const temizIstemciId =
    typeof istemciId === "string" ? istemciId.trim().slice(0, 64) : undefined;
  try {
    const state = await yeniOyun(
      cag,
      bolge,
      yerlesim,
      oyuncuIsmi,
      dil === "en" ? "en" : "tr",
      temizIstemciId,
      "ilerle"
    );
    res.json({ state });
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, undefined, dil === "en" ? "en" : "tr") });
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
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/dil", async (req, res) => {
  try {
    const { dil } = req.body ?? {};
    const state = await oturumDiliAyarla(req.params.id, dil === "en" ? "en" : "tr");
    res.json({ state });
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/state", async (req, res) => {
  try {
    const state = await stateGetir(req.params.id);
    res.json({ state });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/yil-gec", async (req, res) => {
  try {
    res.json(await yilGec(req.params.id));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/scenario", async (req, res) => {
  try {
    const senaryo = await senaryoUret(req.params.id);
    res.json({ senaryo });
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
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
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/finans", async (req, res) => {
  try {
    const finans = await finansGetir(req.params.id);
    res.json({ finans });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/gosterge/:stat", async (req, res) => {
  try {
    const gosterge = await gostergeGetir(req.params.id, req.params.stat);
    res.json({ gosterge });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/aranma", async (req, res) => {
  try {
    res.json({ aranma: await aranmaGetir(req.params.id) });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/aranma/kefaret", async (req, res) => {
  try {
    res.json(await aranmaKefaretOde(req.params.id, req.body?.yarim === true));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/aranma/teslim", async (req, res) => {
  try {
    res.json(await aranmaTeslimOl(req.params.id));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/aranma/bildirim", async (req, res) => {
  try {
    const karar = req.body?.karar;
    res.json(await aranmaBildirimiYanitla(req.params.id, String(req.body?.bildirimId ?? ""), karar));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/dunya-gecmisi", async (req, res) => {
  try {
    const dunyaGecmisi = await dunyaGecmisiGetir(req.params.id);
    res.json({ dunyaGecmisi });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/kotu-is-config", async (req, res) => {
  try {
    const config = await kotuIsConfigGetir(req.params.id);
    res.json({ config });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/kotu-is", async (req, res) => {
  const { tur, hedefRakipAd, ajanId } = req.body ?? {};
  if (typeof tur !== "string") {
    return res.status(400).json({ hata: "Geçersiz iş." });
  }
  try {
    const sonuc = await kotuIsYap(req.params.id, tur, {
      hedefRakipAd: typeof hedefRakipAd === "string" ? hedefRakipAd : undefined,
      ajanId: typeof ajanId === "string" ? ajanId : undefined,
    });
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/ajanlar", async (req, res) => {
  try {
    res.json(await ajanDurumGetir(req.params.id));
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/isletme", async (req, res) => {
  try {
    res.json(await isletmeDurumGetir(req.params.id));
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/isletme/karar", async (req, res) => {
  const { hatlar, stokHedefi, cemaat } = req.body ?? {};
  if (!Array.isArray(hatlar)) return res.status(400).json({ hata: "Geçersiz karar." });
  try {
    res.json(await isletmeKararVer(req.params.id, hatlar, stokHedefi, cemaat && typeof cemaat === "object" ? cemaat : undefined));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/isletme/ogreti", async (req, res) => {
  const { ogretiId } = req.body ?? {};
  if (typeof ogretiId !== "string") return res.status(400).json({ hata: "Geçersiz öğreti." });
  try {
    res.json(await isletmeOgretiSec(req.params.id, ogretiId));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/isletme/urun", async (req, res) => {
  const { urunId } = req.body ?? {};
  if (typeof urunId !== "string") return res.status(400).json({ hata: "Geçersiz ürün." });
  try {
    res.json(await isletmeUrunSec(req.params.id, urunId));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/isletme/yatirim", async (req, res) => {
  const { yatirimId } = req.body ?? {};
  if (typeof yatirimId !== "string") return res.status(400).json({ hata: "Geçersiz yatırım." });
  try {
    res.json(await isletmeYatirimYap(req.params.id, yatirimId));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/isletme/calisan", async (req, res) => {
  const { adayId } = req.body ?? {};
  if (typeof adayId !== "string") return res.status(400).json({ hata: "Geçersiz aday." });
  try {
    res.json(await isletmeCalisanAl(req.params.id, adayId));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/ajan/tut", async (req, res) => {
  const { rol } = req.body ?? {};
  if (typeof rol !== "string") return res.status(400).json({ hata: "Geçersiz rol." });
  try {
    res.json(await ajanTut(req.params.id, rol));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

const GECERLI_MULK_TURLERI: MulkTuru[] = MULK_TANIMLARI.map((m) => m.tur);

gameRouter.get("/:id/mulk-config", async (req, res) => {
  try {
    const config = await mulkConfigGetir(req.params.id);
    res.json({ config });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
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
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/dedikodu", async (req, res) => {
  try {
    const dedikodular = await dedikoduGetir(req.params.id);
    res.json({ dedikodular });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/zar-kademeleri", async (req, res) => {
  try {
    const kademeler = await zarKademeleriGetir(req.params.id);
    res.json({ kademeler });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
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
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/uc-kagitci", async (req, res) => {
  const { tutar, secim } = req.body ?? {};
  if (typeof tutar !== "number" || typeof secim !== "number") {
    return res.status(400).json({ hata: "Geçersiz bahis ya da bardak." });
  }
  try {
    const sonuc = await ucKagitciOyna(req.params.id, tutar, secim);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/bilek-guresi", async (req, res) => {
  const { basarili } = req.body ?? {};
  if (typeof basarili !== "boolean") {
    return res.status(400).json({ hata: "Geçersiz sonuç." });
  }
  try {
    const sonuc = await bilekGuresiSonuc(req.params.id, basarili);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
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
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
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
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/ekip/:ekipId/cikar", async (req, res) => {
  try {
    const sonuc = await ekipCikar(req.params.id, req.params.ekipId);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/sosyallesme-yerleri", async (req, res) => {
  try {
    const yerler = await sosyallesmeYerleriGetir(req.params.id);
    res.json({ yerler });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
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
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/sosyallesme-olay", async (req, res) => {
  const { secenekIndex } = req.body ?? {};
  if (typeof secenekIndex !== "number") {
    return res.status(400).json({ hata: "Geçersiz seçenek." });
  }
  try {
    const sonuc = await sosyallesmeOlayCoz(req.params.id, secenekIndex);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/sosyallesme-aksiyonlar", async (req, res) => {
  try {
    const config = await sosyallesmeAksiyonConfigGetir(req.params.id);
    res.json(config);
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/sosyallesme-aksiyon", async (req, res) => {
  const { aksiyonId, varyant } = req.body ?? {};
  if (typeof aksiyonId !== "string") {
    return res.status(400).json({ hata: "Geçersiz aksiyon." });
  }
  try {
    const sonuc = await sosyallesmeAksiyonYap(
      req.params.id,
      aksiyonId,
      typeof varyant === "string" ? varyant : undefined
    );
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

// ===== Mantık evliliği / düğün / eş ilişki barı (Aile & İlişkiler ekranı) =====
gameRouter.post("/:id/mantik/teklif", async (req, res) => {
  const { adayIndex, hediye } = req.body ?? {};
  if (typeof adayIndex !== "number" || !Number.isInteger(adayIndex) || adayIndex < 0) {
    return res.status(400).json({ hata: "Geçersiz aday." });
  }
  if (hediye !== "sade" && hediye !== "ucuz" && hediye !== "pahali") {
    return res.status(400).json({ hata: "Geçersiz hediye." });
  }
  try {
    const sonuc = await mantikTeklifEt(req.params.id, adayIndex, hediye);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/dugun", async (req, res) => {
  const { butce } = req.body ?? {};
  if (butce !== "ucuz" && butce !== "orta" && butce !== "pahali") {
    return res.status(400).json({ hata: "Geçersiz düğün bütçesi." });
  }
  try {
    const sonuc = await dugunYap(req.params.id, butce);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/es/eylem", async (req, res) => {
  const { eylem, hediye } = req.body ?? {};
  if (eylem !== "zaman_gecir" && eylem !== "hediye_ver") {
    return res.status(400).json({ hata: "Geçersiz etkileşim." });
  }
  if (eylem === "hediye_ver" && hediye !== "ucuz" && hediye !== "pahali") {
    return res.status(400).json({ hata: "Geçersiz hediye." });
  }
  try {
    const sonuc = await esEylemYap(req.params.id, eylem, eylem === "hediye_ver" ? hediye : undefined);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

// ===== Aşk evliliği: tanışma diyaloğu + sevgili =====
gameRouter.get("/:id/tanisma", async (req, res) => {
  try {
    res.json(await tanismaGetir(req.params.id));
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/tanisma/yaklas", async (req, res) => {
  try {
    res.json(await tanismaYaklas(req.params.id));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/tanisma/vazgec", async (req, res) => {
  try {
    res.json(await tanismaVazgec(req.params.id));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/tanisma/secim", async (req, res) => {
  const { secenek } = req.body ?? {};
  if (typeof secenek !== "number" || !Number.isInteger(secenek) || secenek < 0) {
    return res.status(400).json({ hata: "Geçersiz seçenek." });
  }
  try {
    res.json(await tanismaSec(req.params.id, secenek));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/sevgili/teklif", async (req, res) => {
  try {
    res.json(await sevgiliTeklifEt(req.params.id));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/sevgili/gonul-al", async (req, res) => {
  try {
    res.json(await sevgiliGonulAl(req.params.id));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/sevgili/ayril", async (req, res) => {
  try {
    res.json(await sevgiliAyril(req.params.id));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/cocuk/ise-al", async (req, res) => {
  const { cocukIndex } = req.body ?? {};
  if (typeof cocukIndex !== "number" || !Number.isInteger(cocukIndex) || cocukIndex < 0) {
    return res.status(400).json({ hata: "Geçerli bir çocuk seçmelisin." });
  }
  try {
    res.json(await cocukIseAl(req.params.id, cocukIndex));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/cocuk/red-tepkisi", async (req, res) => {
  const { cocukIndex, tepki } = req.body ?? {};
  if (typeof cocukIndex !== "number" || !Number.isInteger(cocukIndex) || cocukIndex < 0) {
    return res.status(400).json({ hata: "Geçerli bir çocuk seçmelisin." });
  }
  if (tepki !== "ofke" && tepki !== "sakin") {
    return res.status(400).json({ hata: "Geçersiz tepki." });
  }
  try {
    res.json(await cocukRedTepkisi(req.params.id, cocukIndex, tepki));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/aile", async (req, res) => {
  try {
    const durum = await aileDurumGetir(req.params.id);
    res.json(durum);
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/aile/etkilesim", async (req, res) => {
  const { etkilesimId, cocukIndex } = req.body ?? {};
  if (typeof etkilesimId !== "string") {
    return res.status(400).json({ hata: "Geçersiz etkileşim." });
  }
  try {
    const sonuc = await aileEtkilesimYap(
      req.params.id,
      etkilesimId,
      typeof cocukIndex === "number" ? cocukIndex : null
    );
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/aile/talep", async (req, res) => {
  const { karar } = req.body ?? {};
  if (karar !== "kabul" && karar !== "ret") {
    return res.status(400).json({ hata: "Geçersiz karar." });
  }
  try {
    const sonuc = await aileTalebiKararlastir(req.params.id, karar);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

// ===== Kariyer sayfası: Yönetimle Bağlar (§35) =====
gameRouter.get("/:id/yonetim", async (req, res) => {
  try {
    const durum = await yonetimDurumGetir(req.params.id);
    res.json(durum);
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/yonetim/etkilesim", async (req, res) => {
  const { etkilesimId, kademe, varyant } = req.body ?? {};
  if (typeof etkilesimId !== "string") {
    return res.status(400).json({ hata: "Geçersiz etkileşim." });
  }
  try {
    const sonuc = await yonetimEtkilesimYap(
      req.params.id,
      etkilesimId,
      typeof kademe === "number" ? kademe : undefined,
      typeof varyant === "string" ? varyant : undefined
    );
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/yonetim/istek", async (req, res) => {
  const { istekId, rusvet } = req.body ?? {};
  if (typeof istekId !== "string") {
    return res.status(400).json({ hata: "Geçersiz istek." });
  }
  try {
    const sonuc = await yonetimIstekYap(req.params.id, istekId, rusvet === true);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/yonetim/talep", async (req, res) => {
  const { karar } = req.body ?? {};
  if (karar !== "kabul" && karar !== "ret" && karar !== "yalan") {
    return res.status(400).json({ hata: "Geçersiz karar." });
  }
  try {
    const sonuc = await yonetimTalebiKararlastir(req.params.id, karar);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/magaza", async (req, res) => {
  try {
    const katalog = await magazaConfigGetir(req.params.id);
    res.json({ katalog });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
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
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/envanter/:esyaId/kullan", async (req, res) => {
  try {
    const sonuc = await envanterEsyasiKullan(req.params.id, req.params.esyaId);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/envanter/:esyaId/hediye", async (req, res) => {
  const { hedef, cocukIndex, ekipId } = req.body ?? {};
  if (hedef !== "es" && hedef !== "cocuk" && hedef !== "ekip" && hedef !== "dost") {
    return res.status(400).json({ hata: "Geçersiz hediye hedefi." });
  }
  try {
    const sonuc = await hediyeEt(req.params.id, req.params.esyaId, hedef, {
      cocukIndex: typeof cocukIndex === "number" ? cocukIndex : undefined,
      ekipId: typeof ekipId === "string" ? ekipId : undefined,
    });
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/rakipler", async (req, res) => {
  try {
    const rakipler = await rakiplerGetir(req.params.id);
    res.json({ rakipler });
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/pazar", async (req, res) => {
  try {
    res.json(await pazarDurumGetir(req.params.id));
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/amaclar", async (req, res) => {
  try {
    res.json(await amaclarGetir(req.params.id));
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/salgin-korunma", async (req, res) => {
  try {
    res.json(await salginKorunmaConfigGetir(req.params.id));
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/salgin-korunma", async (req, res) => {
  const { kademe } = req.body ?? {};
  if (kademe !== 1 && kademe !== 2) {
    return res.status(400).json({ hata: "Geçersiz kademe." });
  }
  try {
    res.json(await salginKorunmaYatirimiYap(req.params.id, kademe));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.get("/:id/kredi", async (req, res) => {
  try {
    res.json(await krediConfigGetir(req.params.id));
  } catch (err) {
    res.status(404).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/kredi/al", async (req, res) => {
  const { teklifId } = req.body ?? {};
  if (typeof teklifId !== "string" || teklifId.length === 0 || teklifId.length > 40) {
    return res.status(400).json({ hata: "Geçersiz teklif." });
  }
  try {
    res.json(await krediAlEndpoint(req.params.id, teklifId));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});

gameRouter.post("/:id/kredi/pazarlik", async (req, res) => {
  try {
    res.json(await krediPazarlikEndpoint(req.params.id));
  } catch (err) {
    res.status(400).json({ hata: hataMetni(err, req.params.id) });
  }
});
