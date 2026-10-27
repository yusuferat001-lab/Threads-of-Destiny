/**
 * Müşteri akışı (§45 v8.1): toplam pazar P şu gruplara bölünür —
 *   oyuncu (state.meslek_musteri) · aktif rakipler (Rakip.musteri, en çok 2) · küçük esnaf havuzu (P − oyuncu − Σ rakip).
 * Küçük esnaf havuzu saklanmaz, artıktır; böylece toplam daima P'dir.
 *
 * Aktarım kuralı: bir grup kazanırsa/kaybederse fark diğer gruplardan/gruplara,
 * onların o anki büyüklükleriyle ORANTILI olarak alınır/verilir (musteriKaydir). Bir grup
 * sınırına (taban/tavan) dayanırsa payı kalan gruplara dağıtılır. Saldırı, çalma, sızdırma
 * gibi hedefli olaylar yalnız iki grup arasındadır (musteriAktar).
 *
 * Bu modül yalnız types + data'ya bağlıdır (isletme.ts ve stateManager.ts buradan okur).
 */
import type { CharacterState, PiyasaHaberi, Rakip } from "../types";
import {
  PAZAR_ADLARI,
  KUCUK_TABAN_PAY,
  RAKIP_TAVAN_PAY,
  OYUNCU_TAVAN_PAY,
  OYUNCU_TABAN_MUSTERI,
  RAKIP_YENILDI_ESIGI,
  MUSTERI_YILLIK_RUTBE,
  MUSTERI_YOKLUK_KAYBI,
  YENI_RAKIP_PAY,
  YENI_RAKIP_MIN_YIL,
  YENI_RAKIP_MAX_YIL,
  MAKS_AKTIF_RAKIP,
  aktifRakipler,
  sohretPayBuyumesi,
  sabitMusteriArtisi,
  rastgeleRakipMusteri,
} from "../data/pazar";
import {
  RAKIP_HAMLELERI,
  KUCUK_OLAYLARI,
  KUCUK_DONEM_ETKISI,
  HAMLE_ARALIK_MAX_YIL,
  RAKIP_HAMLESI_ORANI,
  HAMLE_ETKI_CARPANI,
  type PiyasaHamlesi,
} from "../data/piyasaHamleleri";
import { isletmeMeslegiMi, isletmeProfiliGetir } from "../data/meslekProfilleri";
import { rastgeleBirIsimSec } from "../data/npcIsimleri";
import { ekliYerTutuculariDoldur } from "../i18n/ekler";

/** "oyuncu" · "kucuk" (isimsiz esnaf) · "rakip:<ad>" (isimli rakip). */
export type PazarGrubu = "oyuncu" | "kucuk" | `rakip:${string}`;

export const rakipGrubu = (ad: string): PazarGrubu => `rakip:${ad}`;

export interface MusteriDagilimi {
  oyuncu: number;
  /** Aktif rakiplerin toplamı. */
  rakip: number;
  kucuk: number;
  toplam: number;
}

const HABER_SAYISI = 6;
const RAKIP_TABAN_PAY = 0.02;

export function pazarVarMi(state: CharacterState): boolean {
  return !!PAZAR_ADLARI[state.meslek] && (state.pazar_musteri ?? 0) > 0;
}

export function musteriDagilimi(state: CharacterState): MusteriDagilimi {
  const toplam = Math.max(0, state.pazar_musteri ?? 0);
  const oyuncu = Math.max(0, state.meslek_musteri ?? 0);
  const rakip = aktifRakipler(state).reduce((t, r) => t + Math.max(0, r.musteri), 0);
  return { oyuncu, rakip, kucuk: Math.max(0, toplam - oyuncu - rakip), toplam };
}

interface Uye {
  id: PazarGrubu;
  n: number;
  alt: number;
  ust: number;
}

function uyeleriKur(state: CharacterState): Uye[] {
  const P = Math.max(0, state.pazar_musteri ?? 0);
  const d = musteriDagilimi(state);
  const uyeler: Uye[] = [
    { id: "oyuncu", n: d.oyuncu, alt: OYUNCU_TABAN_MUSTERI, ust: P * OYUNCU_TAVAN_PAY },
    { id: "kucuk", n: d.kucuk, alt: P * KUCUK_TABAN_PAY, ust: P },
  ];
  for (const r of aktifRakipler(state)) {
    uyeler.push({ id: rakipGrubu(r.ad), n: Math.max(0, r.musteri), alt: P * RAKIP_TABAN_PAY, ust: P * RAKIP_TAVAN_PAY });
  }
  return uyeler;
}

function uyeleriYaz(state: CharacterState, uyeler: Uye[]): void {
  for (const u of uyeler) {
    if (u.id === "oyuncu") state.meslek_musteri = Math.max(0, Math.round(u.n * 100) / 100);
    else if (u.id !== "kucuk") {
      const ad = u.id.slice("rakip:".length);
      const r = state.rakipler.find((x) => x.ad === ad && !x.yenildi);
      if (r) r.musteri = Math.max(0, Math.round(u.n * 100) / 100);
    }
  }
}

/**
 * `uyeler`'den `kaynaklar` listesindeki üyelere orantılı pay çıkartıp `miktar` kadarını alır:
 * üye j'den alınan ∝ n_j, ama (n_j − alt_j)'yi aşamaz; aşan kısım kalanlara yeniden dağıtılır.
 * Gerçekten alınabilen toplamı döndürür (≤ miktar) ve `uyeler`'i günceller.
 */
function orantiliAl(kaynaklar: Uye[], miktar: number): number {
  let kalan = miktar;
  let aktif = kaynaklar.filter((u) => u.n - u.alt > 1e-9);
  for (let tur = 0; tur < 6 && kalan > 1e-9 && aktif.length > 0; tur++) {
    const toplam = aktif.reduce((t, u) => t + u.n, 0);
    if (toplam <= 0) break;
    let alinanTur = 0;
    const sinirdakiler: Uye[] = [];
    for (const u of aktif) {
      const pay = (kalan * u.n) / toplam;
      const musait = u.n - u.alt;
      const al = Math.min(pay, musait);
      u.n -= al;
      alinanTur += al;
      if (pay >= musait - 1e-9) sinirdakiler.push(u);
    }
    kalan -= alinanTur;
    aktif = aktif.filter((u) => !sinirdakiler.includes(u) && u.n - u.alt > 1e-9);
  }
  return miktar - Math.max(0, kalan);
}

/** Orantılı verme: `alicilar` üyelerine ∝ n_j, ama (ust_j − n_j)'yi aşmadan. Verilebilen toplamı döndürür. */
function orantiliVer(alicilar: Uye[], miktar: number): number {
  let kalan = miktar;
  let aktif = alicilar.filter((u) => u.ust - u.n > 1e-9);
  for (let tur = 0; tur < 6 && kalan > 1e-9 && aktif.length > 0; tur++) {
    const toplam = aktif.reduce((t, u) => t + Math.max(u.n, 1e-6), 0);
    let verilenTur = 0;
    const sinirdakiler: Uye[] = [];
    for (const u of aktif) {
      const pay = (kalan * Math.max(u.n, 1e-6)) / toplam;
      const musait = u.ust - u.n;
      const ver = Math.min(pay, musait);
      u.n += ver;
      verilenTur += ver;
      if (pay >= musait - 1e-9) sinirdakiler.push(u);
    }
    kalan -= verilenTur;
    aktif = aktif.filter((u) => !sinirdakiler.includes(u) && u.ust - u.n > 1e-9);
  }
  return miktar - Math.max(0, kalan);
}

/**
 * DAĞILIM aktarımı: `grup` `delta` kadar kazanır (delta>0) ya da kaybeder (delta<0);
 * karşılığı diğer tüm gruplardan büyüklükleriyle orantılı alınır / onlara orantılı verilir.
 * Sınırlara dayanan gruplar atlanır, payları kalanlara kayar. Gerçekleşen (işaretli) değişimi döndürür.
 */
export function musteriKaydir(state: CharacterState, grup: PazarGrubu, delta: number): number {
  if (!pazarVarMi(state) || !delta) return 0;
  const uyeler = uyeleriKur(state);
  const g = uyeler.find((u) => u.id === grup);
  if (!g) return 0;
  const digerleri = uyeler.filter((u) => u !== g);
  if (delta > 0) {
    const oda = Math.max(0, g.ust - g.n);
    const istenen = Math.min(delta, oda);
    const alinan = orantiliAl(digerleri, istenen);
    g.n += alinan;
    uyeleriYaz(state, uyeler);
    return alinan;
  }
  const mevcut = Math.max(0, g.n - g.alt);
  const istenen = Math.min(-delta, mevcut);
  const verilen = orantiliVer(digerleri, istenen);
  g.n -= verilen;
  uyeleriYaz(state, uyeler);
  return -verilen;
}

/**
 * HEDEFLİ aktarım: `miktar` müşteri doğrudan `kaynak` grubundan `hedef` grubuna geçer
 * (saldırı, müşteri çalma, sızdırma). Sınırlar aşılırsa kısılır. Gerçekleşen miktarı döndürür.
 */
export function musteriAktar(state: CharacterState, kaynak: PazarGrubu, hedef: PazarGrubu, miktar: number): number {
  if (!pazarVarMi(state) || miktar <= 0 || kaynak === hedef) return 0;
  const uyeler = uyeleriKur(state);
  const k = uyeler.find((u) => u.id === kaynak);
  const h = uyeler.find((u) => u.id === hedef);
  if (!k || !h) return 0;
  const m = Math.min(miktar, Math.max(0, k.n - k.alt), Math.max(0, h.ust - h.n));
  if (m <= 0) return 0;
  k.n -= m;
  h.n += m;
  uyeleriYaz(state, uyeler);
  return m;
}

/** Toplam pazar değişince herkesin müşterisi aynı oranda ölçeklenir (pay değişmez). */
export function pazarOlcekle(state: CharacterState, oran: number): void {
  if (!(oran > 0)) return;
  state.pazar_musteri = Math.max(50, Math.round((state.pazar_musteri ?? 0) * oran));
  state.meslek_musteri = Math.max(0, Math.round((state.meslek_musteri ?? 0) * oran * 100) / 100);
  for (const r of state.rakipler ?? []) r.musteri = Math.max(0, Math.round(r.musteri * oran * 100) / 100);
}

/** Belirli bir rakipten müşteri alınır: `yuzde` kadarı çıkar; %30'u doğrudan oyuncuya, kalanı orantılı dağılır. */
export function rakiptenMusteriAl(state: CharacterState, rakipAd: string, yuzde: number, dogrudan = 0.3): number {
  const r = state.rakipler.find((x) => x.ad === rakipAd && !x.yenildi);
  if (!r || !pazarVarMi(state) || yuzde <= 0) return 0;
  const alinacak = Math.min(r.musteri, r.musteri * yuzde);
  const grup = rakipGrubu(r.ad);
  const dogrudanMiktar = musteriAktar(state, grup, "oyuncu", alinacak * dogrudan);
  const kalan = alinacak - dogrudanMiktar;
  const dagilan = kalan > 0 ? -musteriKaydir(state, grup, -kalan) : 0;
  return dogrudanMiktar + dagilan;
}

// ── Haber günlüğü ────────────────────────────────────────────────────────

export function haberEkle(state: CharacterState, haber: PiyasaHaberi): void {
  state.piyasa_gunlugu = [haber, ...(state.piyasa_gunlugu ?? [])].slice(0, HABER_SAYISI);
}

function doldur(metin: { tr: string; en: string }, bag: Record<string, string>): { tr: string; en: string } {
  const f = (s: string) => s.replace(/\{(\w+)\}/g, (_, k) => bag[k] ?? "");
  // Türkçe: {rakip}'ten gibi ekler isme göre uyumlanır (i18n/ekler.ts).
  const tr = ekliYerTutuculariDoldur(metin.tr, /\{(\w+)\}'([a-zçğıöşü]+)/gi, (k) => bag[k]);
  return { tr: f(tr), en: f(metin.en) };
}

function yonBul(oyuncuFark: number): PiyasaHaberi["yon"] {
  if (oyuncuFark >= 0.5) return "olumlu";
  if (oyuncuFark <= -0.5) return "olumsuz";
  return "notr";
}

function rnd(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function acikHatAdi(state: CharacterState): { tr: string; en: string } | null {
  const is = state.isletme;
  if (!is) return null;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil) return null;
  const acik = is.hatlar.filter((h) => h.acik);
  if (acik.length === 0) return null;
  const h = acik[Math.floor(Math.random() * acik.length)];
  const t = profil.hatlar.find((x) => x.id === h.id);
  if (!t) return null;
  return { tr: t.ad.tr.toLowerCase(), en: t.ad.en.toLowerCase() };
}

function oyuncuFiyatUcuzMu(state: CharacterState): boolean {
  const acik = state.isletme?.hatlar.filter((h) => h.acik) ?? [];
  return acik.length > 0 && acik.every((h) => h.fiyat === "eksi10" || h.fiyat === "eksi20");
}

/** Rakip pay yönüne göre ortalamaya dönüş: kendi başlangıç payına göre çok büyükse olumsuz, çok küçükse olumlu hamle ağırlığı ×2. */
function hamleSec(state: CharacterState, rakipPay: number, hedefPay: number): PiyasaHamlesi | null {
  const isletmeli = isletmeMeslegiMi(state.meslek);
  const din = state.meslek === "Din Adamı";
  const adaylar = din
    ? RAKIP_HAMLELERI.filter((h) => !h.isletmeli || !!h.dinMetin)
    : RAKIP_HAMLELERI.filter((h) => (isletmeli ? true : !h.isletmeli)).filter((h) => !(h.urunlu && !acikHatAdi(state)));
  if (adaylar.length === 0) return null;
  const agirlik = adaylar.map((h) => {
    let w = h.agirlik ?? 1;
    if (rakipPay > hedefPay * 1.2 && h.yon === "kuculur") w *= 2;
    if (rakipPay < hedefPay * 0.6 && h.yon === "buyur") w *= 2;
    return w;
  });
  const top = agirlik.reduce((t, x) => t + x, 0);
  let z = Math.random() * top;
  for (let i = 0; i < adaylar.length; i++) {
    z -= agirlik[i];
    if (z <= 0) return adaylar[i];
  }
  return adaylar[adaylar.length - 1];
}

function rakipHamlesiUygula(state: CharacterState, r: Rakip): void {
  const d0 = musteriDagilimi(state);
  const hedefPay = r.hedef_pay ?? 0.3;
  const hamle = hamleSec(state, d0.toplam > 0 ? r.musteri / d0.toplam : 0, hedefPay);
  if (!hamle) return;
  const before = d0.oyuncu;
  const grup = rakipGrubu(r.ad);
  let yuzde = rnd(hamle.yuzde[0], hamle.yuzde[1]) * HAMLE_ETKI_CARPANI;
  const ucuz = hamle.fiyatKarsiligi && state.meslek !== "Din Adamı" && oyuncuFiyatUcuzMu(state);
  if (ucuz) yuzde *= 0.5;
  if (hamle.hedef === "oyuncu") {
    // Doğrudan saldırı müşteri SAYISI olarak tanımlıdır (tam sayı); fiyatı zaten ucuzsa yarıya iner.
    const [a, b] = hamle.sayi ?? [1, 2];
    let sayi = a + Math.floor(Math.random() * (b - a + 1));
    if (ucuz) sayi = Math.max(1, Math.ceil(sayi / 2));
    musteriAktar(state, "oyuncu", grup, Math.min(sayi, d0.oyuncu));
  } else {
    musteriKaydir(state, grup, (hamle.yon === "buyur" ? 1 : -1) * r.musteri * yuzde);
  }
  if (hamle.etki && state.isletme) {
    state.piyasa_etkileri = [
      ...(state.piyasa_etkileri ?? []),
      { tur: hamle.etki.tur, deger: hamle.etki.deger, bitis: state.yil + hamle.etki.sureYil },
    ];
  }
  r.hamle_son_yil = state.yil;
  state.rakip_hamle_son_yil = state.yil;
  const dinMi = state.meslek === "Din Adamı" && !!hamle.dinMetin;
  const urun = hamle.urunlu && !dinMi ? acikHatAdi(state) : null;
  const metinKaynak = dinMi ? hamle.dinMetin! : hamle.metin;
  const tr = doldur(metinKaynak, { rakip: r.ad, urun: urun?.tr ?? "" });
  const en = doldur(metinKaynak, { rakip: r.ad, urun: urun?.en ?? "" });
  const fark = musteriDagilimi(state).oyuncu - before;
  haberEkle(state, {
    yil: state.yil,
    simge: hamle.simge,
    yon: hamle.etki && !hamle.hedef ? ((hamle.etki.deger > 0) === (hamle.etki.tur === "talep") ? "olumlu" : "olumsuz") : yonBul(fark),
    grup: "rakip",
    kod: hamle.id,
    metin: { tr: tr.tr, en: en.en },
    musteri: Math.round(fark),
  });
}

function kucukOlayiUygula(state: CharacterState): void {
  const o = KUCUK_OLAYLARI[Math.floor(Math.random() * KUCUK_OLAYLARI.length)];
  const d0 = musteriDagilimi(state);
  const before = d0.oyuncu;
  // Küçük esnaf havuzu artık küçük (toplamın ~%6–20'si); olayın etkisi pazarın küçük esnaf payına göre ölçeklenir.
  const delta = Math.max(d0.kucuk, d0.toplam * 0.08) * rnd(o.yuzde[0], o.yuzde[1]);
  musteriKaydir(state, "kucuk", delta);
  const fark = musteriDagilimi(state).oyuncu - before;
  haberEkle(state, {
    yil: state.yil,
    simge: o.simge,
    yon: yonBul(fark),
    grup: "kucuk",
    kod: o.id,
    metin: state.meslek === "Din Adamı" && o.dinMetin ? o.dinMetin : o.metin,
    musteri: Math.round(fark),
  });
}

function donemAnahtari(state: CharacterState): string | null {
  if (state.veba?.aktif) return "veba";
  if (state.ulke.savasta) return "savas";
  return state.ulke.donem?.tur ?? null;
}

/** Bir rakip payı %4'ün altına inince yenildi sayılır; kalan müşterisinin yarısı oyuncuya geçer. */
export function rakipYenildiKontrol(state: CharacterState, haberVer = true): boolean {
  if (!pazarVarMi(state)) return false;
  let biriYenildi = false;
  for (const r of aktifRakipler(state)) {
    if (r.musteri >= state.pazar_musteri * RAKIP_YENILDI_ESIGI) continue;
    const kalan = r.musteri;
    r.yenildi = true;
    r.musteri = 0;
    state.meslek_musteri = Math.round((state.meslek_musteri + kalan * 0.5) * 100) / 100;
    biriYenildi = true;
    if (state.rakip_yeni_yil == null) {
      state.rakip_yeni_yil = state.yil + YENI_RAKIP_MIN_YIL + Math.floor(Math.random() * (YENI_RAKIP_MAX_YIL - YENI_RAKIP_MIN_YIL + 1));
    }
    if (haberVer) {
      haberEkle(state, {
        yil: state.yil,
        simge: "♟️",
        yon: "olumlu",
        grup: "rakip",
        kod: "rakip_yenildi",
        metin: {
          tr: `${r.ad} pazardan çekildi; müşterilerinin bir kısmı sana geçti.`,
          en: `${r.ad} withdrew from the market; some of its customers came to you.`,
        },
        musteri: Math.round(kalan * 0.5 * 10) / 10,
      });
    }
  }
  if (biriYenildi) rakipAdiniGuncelle(state);
  return biriYenildi;
}

/** `rakip_adi` her zaman en büyük aktif rakibin adıdır (olay metinlerindeki {rakip}). */
export function rakipAdiniGuncelle(state: CharacterState): void {
  const en = [...aktifRakipler(state)].sort((a, b) => b.musteri - a.musteri)[0];
  if (en) state.rakip_adi = en.ad;
}

/**
 * Yıllık piyasa akışı (her meslek). Sırayla: pazardan uzak kalma kaybı · (işletmesizlerde)
 * oyuncunun pasif büyümesi · her aktif rakip için doğal dalgalanma + hamle · küçük esnaf
 * dalgalanma + dönem + olay · rakip yenildi/yeni rakip girişi · süreli etkilerin temizliği ·
 * yıl sonu fotoğraf. Bir anlatı cümlesi döndürebilir.
 */
export function piyasaYillikUygula(state: CharacterState, yasArtisi: number): string | null {
  if (yasArtisi <= 0 || !PAZAR_ADLARI[state.meslek] || !pazarVarMi(state)) return null;
  const mesaj: string | null = null;
  const uzakta = state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta");
  for (let i = 0; i < yasArtisi; i++) {
    if (uzakta) {
      musteriKaydir(state, "oyuncu", -state.meslek_musteri * MUSTERI_YOKLUK_KAYBI);
    } else if (!isletmeMeslegiMi(state.meslek)) {
      // İşletmeli mesleklerde oyuncu büyümesi isletmeYilIsle'de (fiyat/tanıtım/çalışan/şöhret) hesaplanır.
      const yuzde = sohretPayBuyumesi(state.un);
      musteriKaydir(state, "oyuncu", sabitMusteriArtisi(state.yas) + MUSTERI_YILLIK_RUTBE * (state.rutbe_seviye ?? 1) * 0.5 + state.meslek_musteri * yuzde);
    }

    for (const r of aktifRakipler(state)) {
      // Doğal dalgalanma ±%1, sonra (cooldown'a uygunsa) hamle.
      musteriKaydir(state, rakipGrubu(r.ad), r.musteri * rnd(-0.01, 0.01));
      r.husumet = Math.max(15, r.husumet - 0.5);
    }
    // Piyasa hamlesi: iki hamle arası 1–2 yıl (v26). Hamlenin çoğu rakipten, kalanı küçük esnaftan gelir.
    const yilSim = state.yil - yasArtisi + 1 + i;
    const gecen = yilSim - (state.rakip_hamle_son_yil ?? yilSim - 1);
    if (gecen >= HAMLE_ARALIK_MAX_YIL || (gecen >= 1 && Math.random() < 0.5)) {
      const rakipler = aktifRakipler(state);
      if (rakipler.length > 0 && Math.random() < RAKIP_HAMLESI_ORANI) {
        rakipHamlesiUygula(state, rakipler[Math.floor(Math.random() * rakipler.length)]);
      } else {
        kucukOlayiUygula(state);
      }
      state.rakip_hamle_son_yil = yilSim;
    }

    // Küçük esnaf: doğal dalgalanma ±%1 + dönem etkisi + yılda %25 olay.
    const d = musteriDagilimi(state);
    const donem = donemAnahtari(state);
    const donemEtkisi = donem ? KUCUK_DONEM_ETKISI[donem] ?? 0 : 0;
    musteriKaydir(state, "kucuk", Math.max(d.kucuk, d.toplam * 0.08) * (rnd(-0.01, 0.01) + donemEtkisi));

    rakipYenildiKontrol(state);
  }

  // Yeni rakip girişi (bir rakip yenildiyse vakti gelince; aynı anda en çok MAKS_AKTIF_RAKIP).
  if (state.rakip_yeni_yil != null && state.yil >= state.rakip_yeni_yil) {
    state.rakip_yeni_yil = null;
    if (aktifRakipler(state).length < MAKS_AKTIF_RAKIP) {
      const ad = rastgeleBirIsimSec(state.cag, state.bolge, [
        state.isim ?? "",
        state.dost_adi,
        state.es_adi ?? "",
        ...state.rakipler.map((x) => x.ad),
      ]);
      const d = musteriDagilimi(state);
      const istenen = rastgeleRakipMusteri(state.pazar_musteri, YENI_RAKIP_PAY);
      const alinabilir = Math.max(0, d.kucuk - state.pazar_musteri * KUCUK_TABAN_PAY);
      const musteri = Math.round(Math.min(istenen, alinabilir) * 100) / 100;
      state.rakipler.unshift({
        ad,
        meslek: state.meslek,
        musteri,
        husumet: 25 + Math.floor(Math.random() * 11),
        yenildi: false,
        hedef_pay: Math.max(0.1, musteri / Math.max(1, state.pazar_musteri)),
        hamle_son_yil: null,
      });
      rakipAdiniGuncelle(state);
      // Hâlâ boş bir rakip kontenjanı varsa bir sonraki giriş de planlanır.
      if (aktifRakipler(state).length < MAKS_AKTIF_RAKIP) {
        state.rakip_yeni_yil = state.yil + YENI_RAKIP_MIN_YIL + Math.floor(Math.random() * (YENI_RAKIP_MAX_YIL - YENI_RAKIP_MIN_YIL + 1));
      }
      haberEkle(state, {
        yil: state.yil,
        simge: "♟️",
        yon: "notr",
        grup: "rakip",
        kod: "yeni_rakip",
        metin: { tr: `Pazara yeni bir rakip girdi: ${ad}.`, en: `A new rival entered the market: ${ad}.` },
        musteri: 0,
      });
    }
  }

  // Süresi dolan piyasa etkileri.
  state.piyasa_etkileri = (state.piyasa_etkileri ?? []).filter((e) => e.bitis > state.yil);

  // Yıl sonu fotoğraf + son yıl değişimi.
  const son = musteriDagilimi(state);
  const ref = state.musteri_ref;
  state.son_musteri_degisim = ref
    ? { oyuncu: son.oyuncu - ref.oyuncu, rakip: son.rakip - ref.rakip, kucuk: son.kucuk - ref.kucuk }
    : { oyuncu: 0, rakip: 0, kucuk: 0 };
  state.musteri_ref = { oyuncu: son.oyuncu, rakip: son.rakip, kucuk: son.kucuk };
  return mesaj;
}

/** Süreli piyasa etkilerinin çarpanı (alış maliyeti / talep): 1 + Σ aktif etki. */
export function piyasaCarpani(state: CharacterState, tur: "alis_maliyeti" | "talep"): number {
  const toplam = (state.piyasa_etkileri ?? [])
    .filter((e) => e.tur === tur && e.bitis > state.yil)
    .reduce((t, e) => t + e.deger, 0);
  return Math.max(0.5, 1 + toplam);
}
