import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { gameRouter } from "./routes/game.routes";
import { scoreRouter } from "./routes/score.routes";
import { oturumlariYukle, oturumlariBellektenTemizle } from "./game/gameEngine";
import { eskiOturumlariTemizle } from "./db/sessionRepository";

const app = express();

const izinliOrijinler = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];
app.use(cors({ origin: izinliOrijinler }));
app.use(express.json());

// Oyun akışı (senaryo/seçim) için genel bir limit: normal oynanışta bir tur
// en fazla birkaç istek gerektirir, botla hızlı skor çiftlemeyi zorlaştırır.
const oyunLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

// Skor kaydı daha nadir olması gereken bir işlem; daha sıkı sınırlanır.
const skorLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/game", oyunLimiti, gameRouter);
app.use("/api/scores", skorLimiti, scoreRouter);

const PORT = process.env.PORT ?? 3001;

const BIR_SAAT_MS = 60 * 60 * 1000;
const BELLEK_GRACE_MS = 30 * 60 * 1000; // bitmiş oturum 30 dk erişilmezse bellekten silinir
const DB_TEMIZLEME_ESIGI_MS = 7 * 24 * BIR_SAAT_MS; // 7 günden eski bitmiş oturumlar DB'den de silinir

function periyodikTemizlemeyiBaslat() {
  setInterval(() => {
    const bellektenSilinen = oturumlariBellektenTemizle(BELLEK_GRACE_MS);
    if (bellektenSilinen > 0) {
      console.log(`${bellektenSilinen} bitmiş oturum bellekten temizlendi.`);
    }
    eskiOturumlariTemizle(new Date(Date.now() - DB_TEMIZLEME_ESIGI_MS))
      .then((silinen) => {
        if (silinen > 0) console.log(`${silinen} eski oturum DB'den temizlendi.`);
      })
      .catch((err) => console.error("DB temizleme hatası:", err));
  }, BIR_SAAT_MS).unref();
}

async function basla() {
  const yuklenenSayisi = await oturumlariYukle();
  if (yuklenenSayisi > 0) {
    console.log(`${yuklenenSayisi} aktif oturum DB'den geri yüklendi.`);
  }
  periyodikTemizlemeyiBaslat();
  app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
  });
}

basla();
