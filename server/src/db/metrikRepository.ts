import { prisma } from "./prismaClient";

/**
 * Toplu oyun metriği deposu (§32).
 *
 * `metrikYaz` ateşle-unut'tur (skor/oturum yazımıyla aynı felsefe): Prisma
 * patlarsa oyun akışı ETKİLENMEZ, sadece `console.error`. `istatistikOzeti`
 * yalnız anahtar korumalı `GET /api/istatistik` tarafından çağrılır ve tüm
 * toplama işini JS'te yapar (hobi ölçeği; satır sayısı büyürse raw SQL'e
 * geçilebilir — bkz. OKUMA_CAP).
 */

/** Motor-içi tetiklenen + client'ın yazabildiği ("ziyaret") metrik türleri. */
export type MetrikTuru =
  | "ziyaret"
  | "yeni_oyun"
  | "meslek_secim"
  | "olum"
  | "skor_kaydi";

export interface MetrikGirdi {
  tur: MetrikTuru;
  istemci_id?: string;
  oturum_id?: string;
  cag?: string;
  bolge?: string;
  yerlesim?: string;
  meslek?: string;
  yas?: number;
  tur_sayisi?: number;
  servet?: number;
  skor?: number;
  olum_nedeni?: string;
  oturum_sn?: number;
  meta?: string;
}

/** Tek okuma başına en fazla bu kadar satır çekilir (bellek + süre koruması). */
const OKUMA_CAP = 60_000;

export async function metrikYaz(girdi: MetrikGirdi): Promise<void> {
  try {
    await prisma.metrik.create({
      data: {
        tur: girdi.tur,
        istemci_id: (girdi.istemci_id ?? "").slice(0, 64),
        oturum_id: girdi.oturum_id ?? "",
        cag: girdi.cag ?? "",
        bolge: girdi.bolge ?? "",
        yerlesim: girdi.yerlesim ?? "",
        meslek: girdi.meslek ?? "",
        yas: Math.round(girdi.yas ?? 0),
        tur_sayisi: Math.round(girdi.tur_sayisi ?? 0),
        servet: girdi.servet ?? 0,
        skor: girdi.skor ?? 0,
        olum_nedeni: (girdi.olum_nedeni ?? "").slice(0, 200),
        oturum_sn: Math.max(0, Math.round(girdi.oturum_sn ?? 0)),
        meta: (girdi.meta ?? "").slice(0, 200),
      },
    });
  } catch (err) {
    console.error("Metrik yazılamadı:", err);
  }
}

interface SayiOzeti {
  adet: number;
  ortalama: number;
  medyan: number;
  maks: number;
}

function sayiOzeti(degerler: number[]): SayiOzeti {
  if (degerler.length === 0) return { adet: 0, ortalama: 0, medyan: 0, maks: 0 };
  const sirali = [...degerler].sort((a, b) => a - b);
  const toplam = sirali.reduce((t, n) => t + n, 0);
  const orta = Math.floor(sirali.length / 2);
  const medyan =
    sirali.length % 2 === 0 ? (sirali[orta - 1] + sirali[orta]) / 2 : sirali[orta];
  return {
    adet: sirali.length,
    ortalama: Math.round((toplam / sirali.length) * 100) / 100,
    medyan: Math.round(medyan * 100) / 100,
    maks: sirali[sirali.length - 1],
  };
}

function sayac(anahtarlar: string[]): Record<string, number> {
  const m: Record<string, number> = {};
  for (const k of anahtarlar) {
    if (!k) continue;
    m[k] = (m[k] ?? 0) + 1;
  }
  return m;
}

function enSik(
  anahtarlar: string[],
  limit: number
): { ad: string; adet: number }[] {
  return Object.entries(sayac(anahtarlar))
    .map(([ad, adet]) => ({ ad, adet }))
    .sort((a, b) => b.adet - a.adet)
    .slice(0, limit);
}

type MetrikSatiri = {
  tur: string;
  istemci_id: string;
  cag: string;
  bolge: string;
  yerlesim: string;
  meslek: string;
  yas: number;
  tur_sayisi: number;
  servet: number;
  skor: number;
  olum_nedeni: string;
  oturum_sn: number;
  createdAt: Date;
};

/** `GET /api/istatistik` yanıtının şekli — saf JSON, oyuncuya gösterilmez. */
export interface IstatistikOzeti {
  uretilmeZamani: string;
  toplamKayit: number;
  sayilar: {
    tekilKisi: number;
    ziyaret: number;
    yeniOyun: number;
    meslekSecim: number;
    olum: number;
    skorKaydi: number;
  };
  tamamlanmaOrani: number; // olum / yeniOyun
  oyunIciSure: { turSayisi: SayiOzeti; yas: SayiOzeti };
  gercekZamanOturumDk: SayiOzeti;
  servet: SayiOzeti & { borcluOlumOrani: number };
  skor: SayiOzeti;
  dagilim: {
    cag: Record<string, { yeniOyun: number; olum: number }>;
    bolge: Record<string, { yeniOyun: number; olum: number }>;
    meslek: Record<string, { secim: number; olum: number }>;
    yerlesim: Record<string, { yeniOyun: number; olum: number }>;
  };
  enSikOlumNedenleri: { ad: string; adet: number }[];
  gunlukSeri: { gun: string; ziyaret: number; yeniOyun: number; olum: number }[];
  sonKayitlar: {
    tarih: string;
    tur: string;
    cag: string;
    bolge: string;
    meslek: string;
    yas: number;
    skor: number;
  }[];
}

/** Ham metrik satırlarından özeti hesaplar — HTTP'den bağımsız, test edilebilir. */
export function ozetHesapla(satirlar: MetrikSatiri[]): IstatistikOzeti {
  const tur = (t: string) => satirlar.filter((s) => s.tur === t);
  const ziyaretler = tur("ziyaret");
  const yeniOyunlar = tur("yeni_oyun");
  const meslekler = tur("meslek_secim");
  const olumler = tur("olum");
  const skorlar = tur("skor_kaydi");

  const tekilKisi = new Set(
    satirlar.map((s) => s.istemci_id).filter((k) => k && k.length > 0)
  ).size;

  const olumDagilim = (alan: keyof MetrikSatiri) =>
    sayac(olumler.map((o) => String(o[alan])));

  const grupla = (
    satirGrubu: MetrikSatiri[],
    alan: keyof MetrikSatiri,
    aAd: string,
    bAd: string
  ) => {
    const a = sayac(satirGrubu.map((s) => String(s[alan])));
    const b = olumDagilim(alan);
    const cikti: Record<string, Record<string, number>> = {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!k) continue;
      cikti[k] = { [aAd]: a[k] ?? 0, [bAd]: b[k] ?? 0 };
    }
    return cikti as Record<string, { [k: string]: number }>;
  };

  // Günlük seri: son 30 gün.
  const gunAnahtar = (d: Date) => d.toISOString().slice(0, 10);
  const bugun = new Date();
  const gunler: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(bugun);
    d.setUTCDate(d.getUTCDate() - i);
    gunler.push(gunAnahtar(d));
  }
  const gunlukSeri = gunler.map((gun) => ({
    gun,
    ziyaret: ziyaretler.filter((s) => gunAnahtar(s.createdAt) === gun).length,
    yeniOyun: yeniOyunlar.filter((s) => gunAnahtar(s.createdAt) === gun).length,
    olum: olumler.filter((s) => gunAnahtar(s.createdAt) === gun).length,
  }));

  const servetDegerleri = olumler.map((o) => o.servet);
  const borcluOlum = servetDegerleri.filter((v) => v < 0).length;

  return {
    uretilmeZamani: new Date().toISOString(),
    toplamKayit: satirlar.length,
    sayilar: {
      tekilKisi,
      ziyaret: ziyaretler.length,
      yeniOyun: yeniOyunlar.length,
      meslekSecim: meslekler.length,
      olum: olumler.length,
      skorKaydi: skorlar.length,
    },
    tamamlanmaOrani:
      yeniOyunlar.length > 0
        ? Math.round((olumler.length / yeniOyunlar.length) * 1000) / 1000
        : 0,
    oyunIciSure: {
      turSayisi: sayiOzeti(olumler.map((o) => o.tur_sayisi)),
      yas: sayiOzeti(olumler.map((o) => o.yas)),
    },
    gercekZamanOturumDk: sayiOzeti(
      olumler
        .map((o) => o.oturum_sn)
        .filter((sn) => sn > 0)
        .map((sn) => Math.round((sn / 60) * 10) / 10)
    ),
    servet: {
      ...sayiOzeti(servetDegerleri),
      borcluOlumOrani:
        olumler.length > 0
          ? Math.round((borcluOlum / olumler.length) * 1000) / 1000
          : 0,
    },
    skor: sayiOzeti(skorlar.map((s) => s.skor)),
    dagilim: {
      cag: grupla(yeniOyunlar, "cag", "yeniOyun", "olum") as Record<
        string,
        { yeniOyun: number; olum: number }
      >,
      bolge: grupla(yeniOyunlar, "bolge", "yeniOyun", "olum") as Record<
        string,
        { yeniOyun: number; olum: number }
      >,
      meslek: grupla(meslekler, "meslek", "secim", "olum") as Record<
        string,
        { secim: number; olum: number }
      >,
      yerlesim: grupla(yeniOyunlar, "yerlesim", "yeniOyun", "olum") as Record<
        string,
        { yeniOyun: number; olum: number }
      >,
    },
    enSikOlumNedenleri: enSik(
      olumler.map((o) => o.olum_nedeni),
      15
    ),
    gunlukSeri,
    sonKayitlar: satirlar
      .slice(-20)
      .reverse()
      .map((s) => ({
        tarih: s.createdAt.toISOString(),
        tur: s.tur,
        cag: s.cag,
        bolge: s.bolge,
        meslek: s.meslek,
        yas: s.yas,
        skor: Math.round(s.skor),
      })),
  };
}

export async function istatistikOzeti(): Promise<IstatistikOzeti> {
  // En YENİ OKUMA_CAP satır alınır (eskiden en eski 60k alınıyordu: tablo dolunca panel yeni
  // olayları hiç görmüyor, "son 30 gün" boşalıyordu); ozetHesapla eski→yeni sırayı bekler.
  const yeniler = (await prisma.metrik.findMany({
    orderBy: { id: "desc" },
    take: OKUMA_CAP,
    select: {
      tur: true,
      istemci_id: true,
      cag: true,
      bolge: true,
      yerlesim: true,
      meslek: true,
      yas: true,
      tur_sayisi: true,
      servet: true,
      skor: true,
      olum_nedeni: true,
      oturum_sn: true,
      createdAt: true,
    },
  })) as MetrikSatiri[];
  const satirlar = yeniler.reverse();
  return ozetHesapla(satirlar);
}
