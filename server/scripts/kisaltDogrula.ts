/**
 * GEÇİCİ codemod — metin kısaltmanın SADECE metin alanlarını değiştirdiğini doğrular.
 *
 *   npx tsx scripts/kisaltDogrula.ts snapshot <dosya.json>   → önce/sonra karşılaştırması için imza alır
 *   npx tsx scripts/kisaltDogrula.ts karsilastir <dosya.json> → metin dışı HER alan aynı mı (olay + EN yapısı)
 *   npx tsx scripts/kisaltDogrula.ts istatistik               → TR/EN metin uzunluk istatistiği + üst sınır aşımı
 *
 * Metin alanları: olay `metin`; şık `metin`/`kilitAciklamasi`; sonuç `mesaj`/`detay`; onTepki
 * `metin`/`geriCekilMetni`/`devamMetni`. `baslik` METİN SAYILMAZ (değişmemeli).
 */
import * as crypto from "crypto";
import * as fs from "fs";
import { OLAY_BANKASI } from "../src/data/olaylar/index";
import { olayCevirisiGetir, tumCeviriIdleri } from "../src/i18n/olaylar";
import { ustSinir } from "./kisaltLib";

type Any = any;

const sha = (s: string) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 16);

function sonucTemizle(s: Any) {
  if (!s || typeof s !== "object") return s;
  const c = { ...s };
  delete c.mesaj;
  delete c.detay;
  return c;
}

function olayTemizle(o: Any): Any {
  const c: Any = { ...o };
  delete c.metin;
  c.secenekler = (o.secenekler ?? []).map((s: Any) => {
    const sc: Any = { ...s };
    delete sc.metin;
    delete sc.kilitAciklamasi;
    sc.basariliSonuc = sonucTemizle(s.basariliSonuc);
    sc.basarisizSonuc = sonucTemizle(s.basarisizSonuc);
    if (s.onTepki) {
      const ot: Any = { ...s.onTepki };
      delete ot.metin;
      delete ot.geriCekilMetni;
      delete ot.devamMetni;
      ot.geriCekilSonucu = sonucTemizle(s.onTepki.geriCekilSonucu);
      ot.devamSonucu = sonucTemizle(s.onTepki.devamSonucu);
      sc.onTepki = ot;
    }
    return sc;
  });
  return c;
}

/** EN yapısı: hangi alanlar var + secenekler uzunluğu (METİN içeriği hariç). */
function enYapi(c: Any): Any {
  const sonuc = (s: Any) => (s ? { m: typeof s.mesaj === "string", d: typeof s.detay === "string" } : null);
  return {
    metin: typeof c.metin === "string",
    baslik: typeof c.baslik === "string",
    n: (c.secenekler ?? []).length,
    s: (c.secenekler ?? []).map((s: Any) =>
      s
        ? {
            metin: typeof s.metin === "string",
            kilit: typeof s.kilitAciklamasi === "string",
            bs: sonuc(s.basariliSonuc),
            fs: sonuc(s.basarisizSonuc),
            ot: s.onTepki
              ? {
                  metin: typeof s.onTepki.metin === "string",
                  gcm: typeof s.onTepki.geriCekilMetni === "string",
                  dm: typeof s.onTepki.devamMetni === "string",
                  gcs: sonuc(s.onTepki.geriCekilSonucu),
                  ds: sonuc(s.onTepki.devamSonucu),
                }
              : null,
          }
        : null
    ),
  };
}

function imza(): Record<string, string> {
  const r: Record<string, string> = {};
  for (const o of OLAY_BANKASI as Any[]) r[`tr:${o.id}`] = sha(JSON.stringify(olayTemizle(o)));
  for (const id of tumCeviriIdleri()) r[`en:${id}`] = sha(JSON.stringify(enYapi(olayCevirisiGetir(id))));
  return r;
}

const komut = process.argv[2];

if (komut === "snapshot") {
  fs.writeFileSync(process.argv[3], JSON.stringify(imza()), "utf8");
  console.log("snapshot yazıldı:", Object.keys(JSON.parse(fs.readFileSync(process.argv[3], "utf8"))).length, "kayıt");
} else if (komut === "karsilastir") {
  const eski: Record<string, string> = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));
  const yeni = imza();
  const farkli = Object.keys(eski).filter((k) => yeni[k] !== eski[k]);
  const kayip = Object.keys(eski).filter((k) => !(k in yeni));
  const fazla = Object.keys(yeni).filter((k) => !(k in eski));
  console.log(`karşılaştırma: ${Object.keys(eski).length} kayıt, farklı ${farkli.length}, kayıp ${kayip.length}, fazla ${fazla.length}`);
  if (farkli.length) console.log("FARKLI:", farkli.slice(0, 20).join(", "));
  if (kayip.length) console.log("KAYIP:", kayip.slice(0, 20).join(", "));
  if (fazla.length) console.log("FAZLA:", fazla.slice(0, 20).join(", "));
  process.exit(farkli.length || kayip.length ? 1 : 0);
} else if (komut === "istatistik") {
  const torba: Record<string, number[]> = {};
  const ekle = (dil: string, yol: string, v?: string) => {
    if (typeof v !== "string") return;
    const tur = yol === "metin" ? "olay" : yol.endsWith(".kilit") ? "kilit" : yol.endsWith(".detay") ? "detay" : yol.endsWith(".mesaj") ? "mesaj" : "sik";
    (torba[`${dil}:${tur}`] ??= []).push(v.length);
    if (v.length > ustSinir(yol, dil as "tr" | "en")) (torba[`${dil}:${tur}:ASIM`] ??= []).push(v.length);
  };
  const sonuc = (dil: string, onek: string, s: Any) => {
    if (!s) return;
    ekle(dil, `${onek}.mesaj`, s.mesaj);
    ekle(dil, `${onek}.detay`, s.detay);
  };
  const gez = (dil: string, o: Any) => {
    ekle(dil, "metin", o.metin);
    (o.secenekler ?? []).forEach((s: Any, i: number) => {
      if (!s) return;
      ekle(dil, `s${i}.metin`, s.metin);
      ekle(dil, `s${i}.kilit`, s.kilitAciklamasi);
      sonuc(dil, "bs", s.basariliSonuc);
      sonuc(dil, "fs", s.basarisizSonuc);
      if (s.onTepki) {
        ekle(dil, `s${i}.ot.metin`, s.onTepki.metin);
        ekle(dil, `s${i}.ot.gcm`, s.onTepki.geriCekilMetni);
        ekle(dil, `s${i}.ot.dm`, s.onTepki.devamMetni);
        sonuc(dil, "gcs", s.onTepki.geriCekilSonucu);
        sonuc(dil, "ds", s.onTepki.devamSonucu);
      }
    });
  };
  for (const o of OLAY_BANKASI as Any[]) gez("tr", o);
  for (const id of tumCeviriIdleri()) gez("en", olayCevirisiGetir(id));
  for (const k of Object.keys(torba).sort()) {
    const a = torba[k];
    const top = a.reduce((x, y) => x + y, 0);
    console.log(`${k.padEnd(14)} adet ${String(a.length).padStart(5)}  ort ${String(Math.round(top / a.length)).padStart(4)}  toplam ${top}`);
  }
} else {
  console.error("Kullanım: kisaltDogrula.ts snapshot|karsilastir <dosya> | istatistik");
  process.exit(1);
}
