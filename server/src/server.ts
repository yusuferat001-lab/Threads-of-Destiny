import "dotenv/config";
import path from "node:path";
import fs from "node:fs";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { gameRouter } from "./routes/game.routes";
import { scoreRouter } from "./routes/score.routes";
import { geriBildirimRouter } from "./routes/geriBildirim.routes";
import { istatistikRouter } from "./routes/istatistik.routes";
import { oturumlariYukle, oturumlariBellektenTemizle, gecmisSkorlariKaydet } from "./game/gameEngine";
import { eskiOturumlariTemizle } from "./db/sessionRepository";

const app = express();

// Derlenmiş istemci: `vite build` çıktısı server/public'e yazılır (client/vite.config.ts).
// Çalışma anında __dirname = server/dist olduğu için bir üst dizindeki public'i gösterir.
const ISTEMCI_DIZINI = path.resolve(__dirname, "..", "public");
const ISTEMCI_VAR = fs.existsSync(path.join(ISTEMCI_DIZINI, "index.html"));

// Render/Railway/Fly/Heroku/nginx gibi tek katmanlı bir reverse proxy'nin arkasında
// çalışırken, X-Forwarded-For'un İLK (proxy'ye en yakın) hopunu güvenilir kabul eder;
// bu olmadan hem req.ip hem de aşağıdaki rate limiter'lar proxy'nin tek IP'sini görüp
// ya herkesi tek kullanıcı sanar ya da limiti anlamsız hale getirir. Birden fazla proxy
// katmanı varsa (ör. CDN + load balancer) bu sayıyı katman sayısına göre artırın.
app.set("trust proxy", 1);

// helmet varsayılan CSP'si style-src/font-src'yi 'self' ile sınırlar; istemcinin
// index.html'i Google Fonts'tan stil + font çektiği için bu iki host'a izin veriyoruz.
// (Dev'de istemci Vite tarafından ayrı origin'den servis edildiği için bu CSP hiç
// devreye girmiyordu; tek servise geçince gerekli oldu.)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "img-src": ["'self'", "data:"],
        "connect-src": ["'self'"],
        "script-src": ["'self'"],
      },
    },
  })
);

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

// Geri bildirim nadir bir işlem; skordan da sıkı sınırlanır (spam / bot koruması).
const geriBildirimLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

// İstatistik: client yalnız "ziyaret" olayı yazar (günde bir); okuma anahtarlıdır.
// Ziyaret ping'i sekme başına ~1 olduğu için orta bir limit yeter.
const istatistikLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/game", oyunLimiti, gameRouter);
app.use("/api/scores", skorLimiti, scoreRouter);
app.use("/api/geri-bildirim", geriBildirimLimiti, geriBildirimRouter);
app.use("/api/istatistik", istatistikLimiti, istatistikRouter);

// Render sağlık kontrolü için hafif uç nokta.
app.get("/healthz", (_req, res) => {
  res.json({ ok: true });
});

// Tek servis modu: derlenmiş istemciyi statik olarak servis et + SPA geri düşüşü.
// İstemci build'i yoksa (ör. sadece backend'i çalıştıran geliştirme) bu blok atlanır.
if (ISTEMCI_VAR) {
  app.use(express.static(ISTEMCI_DIZINI));
  // API dışındaki tüm GET isteklerini index.html'e yönlendir (client-side routing yok
  // ama sayfa yenilemede / doğrudan URL erişiminde de index dönmeli).
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();
    res.sendFile(path.join(ISTEMCI_DIZINI, "index.html"));
  });
  console.log(`İstemci ${ISTEMCI_DIZINI} klasöründen servis ediliyor.`);
} else {
  console.log("İstemci build'i bulunamadı; yalnızca API servis ediliyor.");
}

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
  try {
    const gecmisSkorSayisi = await gecmisSkorlariKaydet();
    if (gecmisSkorSayisi > 0) {
      console.log(`${gecmisSkorSayisi} geçmiş oyun liderlik tablosuna eklendi.`);
    }
  } catch (err) {
    console.error("Geçmiş skorlar kaydedilemedi:", err);
  }
  periyodikTemizlemeyiBaslat();
  app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
  });
}

basla();
