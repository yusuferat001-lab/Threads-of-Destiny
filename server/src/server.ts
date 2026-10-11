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
import { prisma } from "./db/prismaClient";

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

// client/vite.config.ts dev sunucusunu 5180'e sabitliyor (5173 Vite'ın genel
// varsayılanı ama bu projede hiç kullanılmıyor) — CORS_ORIGIN boşsa gerçek
// yerel istemci portuna düş. Normal `npm run dev` akışında istemci relative
// "/api/..." istekleri Vite'ın kendi proxy'sinden geçirdiği için bu değer
// tarayıcı-CORS'unu hiç tetiklemez; yalnız API'ye Vite proxy'si DIŞINDAN
// (ör. doğrudan curl/fetch, farklı bir dev port override'ı) erişilirse devreye girer.
const izinliOrijinler = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5180"];
app.use(cors({ origin: izinliOrijinler }));
app.use(express.json());

// Limit aşıldığında da istemcinin okuyabildiği JSON hata gövdesi dönsün (varsayılan
// düz metin yanıt istemcide "geçerli bir yanıt alınamadı (durum: 429)" diye görünüyordu).
const limitMesaji = (hata: string) => ({ hata });

// Oyun akışı (senaryo/seçim + yan ekranlar) için genel bir limit. Bir tur ~4-5 istek
// (seçim + senaryo + finans/amaç tazelemesi), yan ekranlardaki her işlem 2-3 istek
// tutuyor; eski 60/dk sınırı hızlı oynayan TEK bir oyuncuyu bile kesiyordu (aynı
// NAT/mobil operatör IP'sini paylaşan oyuncular da aynı kotayı bölüşüyor). 240/dk
// normal oynanışı rahat geçirir, botla skor çiftlemeyi yine sınırlar.
const oyunLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 240,
  standardHeaders: true,
  legacyHeaders: false,
  message: limitMesaji("Çok hızlı işlem yapıyorsun; birkaç saniye bekleyip tekrar dene."),
});

// Skor kaydı daha nadir olması gereken bir işlem; daha sıkı sınırlanır.
const skorLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: limitMesaji("Çok fazla istek gönderildi; biraz bekleyip tekrar dene."),
});

// Geri bildirim nadir bir işlem; skordan da sıkı sınırlanır (spam / bot koruması).
const geriBildirimLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: limitMesaji("Çok fazla istek gönderildi; biraz bekleyip tekrar dene."),
});

// İstatistik: client yalnız "ziyaret" olayı yazar (günde bir); okuma anahtarlıdır.
// Ziyaret ping'i sekme başına ~1 olduğu için orta bir limit yeter.
const istatistikLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: limitMesaji("Çok fazla istek gönderildi; biraz bekleyip tekrar dene."),
});

// Yeni oyun açmak (bellek + DB satırı yaratır) daha sıkı sınırlanır: tek bir betik
// dakikada yüzlerce terk edilmiş oturum açıp sunucuyu şişiremesin.
const yeniOyunLimiti = rateLimit({
  windowMs: 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: limitMesaji("Çok fazla yeni oyun açtın; biraz bekleyip tekrar dene."),
});

app.post("/api/game/new", yeniOyunLimiti);
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

// Beklenmeyen hatalar (bozuk JSON, çok büyük gövde, yakalanmamış route hatası) Express'in
// varsayılan HTML sayfası yerine istemcinin okuyabildiği JSON gövdesiyle dönsün.
// (4 argümanlı olmalı: Express hata middleware'ini imzasından tanır.)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const tip = (err as { type?: string } | null)?.type;
  if (tip === "entity.parse.failed") {
    res.status(400).json({ hata: "İstek gövdesi geçerli bir JSON değil." });
    return;
  }
  if (tip === "entity.too.large") {
    res.status(413).json({ hata: "İstek gövdesi çok büyük." });
    return;
  }
  console.error("Yakalanmamış sunucu hatası:", err);
  res.status(500).json({ hata: "Beklenmeyen bir sunucu hatası oluştu." });
});

const PORT = process.env.PORT ?? 3001;

const BIR_SAAT_MS = 60 * 60 * 1000;
const BELLEK_GRACE_MS = 30 * 60 * 1000; // bitmiş oturum 30 dk erişilmezse bellekten silinir
const DB_TEMIZLEME_ESIGI_MS = 7 * 24 * BIR_SAAT_MS; // 7 günden eski bitmiş oturumlar DB'den de silinir
const AKTIF_BELLEK_GRACE_MS = 2 * BIR_SAAT_MS; // 2 saat boşta kalan AKTİF oturum bellekten atılır (DB'de kalır)
const AKTIF_DB_TEMIZLEME_ESIGI_MS = 30 * 24 * BIR_SAAT_MS; // 30 gündür dokunulmamış aktif oturum DB'den silinir

function periyodikTemizlemeyiBaslat() {
  setInterval(() => {
    const bellektenSilinen = oturumlariBellektenTemizle(BELLEK_GRACE_MS, AKTIF_BELLEK_GRACE_MS);
    if (bellektenSilinen > 0) {
      console.log(`${bellektenSilinen} oturum bellekten temizlendi.`);
    }
    eskiOturumlariTemizle(
      new Date(Date.now() - DB_TEMIZLEME_ESIGI_MS),
      new Date(Date.now() - AKTIF_DB_TEMIZLEME_ESIGI_MS)
    )
      .then((silinen) => {
        if (silinen > 0) console.log(`${silinen} eski oturum DB'den temizlendi.`);
      })
      .catch((err) => console.error("DB temizleme hatası:", err));
  }, BIR_SAAT_MS).unref();
}

async function basla() {
  // Önce portu aç: Render'ın port/sağlık kontrolü, DB'den oturum yükleme ya da geçmiş skor
  // kurtarma yavaş (Neon soğuk başlangıç, çok sayıda bitmiş oturum) olsa bile zaman aşımına
  // uğramasın. Oturumlar zaten istek gelince DB'den tembelce yüklenebilir (oturumGetir).
  const sunucu = app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
  });

  try {
    const yuklenenSayisi = await oturumlariYukle();
    if (yuklenenSayisi > 0) {
      console.log(`${yuklenenSayisi} aktif oturum DB'den geri yüklendi.`);
    }
  } catch (err) {
    console.error("Aktif oturumlar yüklenemedi (istek geldikçe tembelce yüklenecek):", err);
  }
  periyodikTemizlemeyiBaslat();
  // Geçmiş skor kurtarma arka planda: açılışı geciktirmesin.
  gecmisSkorlariKaydet()
    .then((gecmisSkorSayisi) => {
      if (gecmisSkorSayisi > 0) {
        console.log(`${gecmisSkorSayisi} geçmiş oyun liderlik tablosuna eklendi.`);
      }
    })
    .catch((err) => console.error("Geçmiş skorlar kaydedilemedi:", err));

  // Render her deploy'da SIGTERM yollar: uçuştaki istekler bitsin, DB bağlantısı temiz kapansın.
  const kapat = (sinyal: string) => {
    console.log(`${sinyal} alındı, sunucu kapatılıyor.`);
    sunucu.close(() => {
      prisma
        .$disconnect()
        .catch(() => undefined)
        .finally(() => process.exit(0));
    });
    setTimeout(() => process.exit(0), 10_000).unref();
  };
  process.on("SIGTERM", () => kapat("SIGTERM"));
  process.on("SIGINT", () => kapat("SIGINT"));
}

// Tek bir yakalanmamış hata (ör. bir ateşle-unut DB yazımı) süreci düşürüp Render'da
// yeniden başlatma döngüsüne sokmasın; logla ve devam et.
process.on("unhandledRejection", (neden) => {
  console.error("Yakalanmamış promise reddi:", neden);
});
// Yakalanmamış senkron istisnada süreç durumu güvenilmez olabilir: logla, temiz çık;
// Render süreci yeniden başlatır (açılış hataları artık satır bazında korunduğu için
// bu bir çökme döngüsüne dönüşmez).
process.on("uncaughtException", (err) => {
  console.error("Yakalanmamış istisna:", err);
  process.exit(1);
});

basla().catch((err) => {
  console.error("Sunucu başlatılamadı:", err);
  process.exit(1);
});
