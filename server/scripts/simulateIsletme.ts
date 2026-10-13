/**
 * Tüccar işletme ekonomisi simülasyonu (2026-10): gerçek `isletmeYilIsle` +
 * `pasifEkonomiUygula` ile yıl yıl bir Tüccar ömrü oynatır; üç bot tarzı:
 *   pasif    — hiç dokunmaz (varsayılan: 1 temel hat, normal fiyat, otomatik sipariş)
 *   dengeli  — rütbe/kâr yettikçe hat açar, çalışan alır, depo/dükkân yatırımı yapar
 *   agresif  — her şeyi mümkün olan en hızlı açar, ucuz fiyatla çok satar
 * Rütbe/şöhret/kitle olay akışı olmadan basit bir sürüklenmeyle taklit edilir.
 *
 *   npx tsx scripts/simulateIsletme.ts      (env: SIM_N, SIM_YIL)
 */
import "./_simPrismaStub";
import { createCharacter, mesleğiSec, pasifEkonomiUygula, giderKalemleriHesapla, isletmeBaglami, ilerletYas, hesaplaMaasYillik } from "../src/game/stateManager";
import { isletmeProfiliGetir, yatirimTanimiGetir } from "../src/data/meslekProfilleri";
import { hatSlotSayisi, adaylariYenile } from "../src/game/isletme";
import { enflasyonCarpani } from "../src/game/stateManager";
import type { Cag, CharacterState } from "../src/types";

const N = Number(process.env.SIM_N ?? 300);
const YIL = Number(process.env.SIM_YIL ?? 45);
type Tarz = "pasif" | "dengeli" | "agresif";

function rutbeSurukle(s: CharacterState, yilIdx: number) {
  // Gerçek ömürdeki ortalama ilerlemeye benzer: ~11, 20, 30, 42. yıllarda S2..S5.
  const esikler = [0, 9, 18, 30, 45];
  s.rutbe_seviye = 1 + esikler.filter((e, i) => i > 0 && yilIdx >= e).length;
  s.rutbe_seviye = Math.min(4, s.rutbe_seviye);
  s.un = Math.min(70, 20 + yilIdx * 1.1);
}

function botKarar(s: CharacterState, tarz: Tarz) {
  if (tarz === "pasif" || !s.isletme) return;
  const is = s.isletme;
  const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
  const enf = enflasyonCarpani(s);
  const slot = hatSlotSayisi(s);
  // Çalışan: nakit yettikçe adaydan en uygununu al (ucuz sadakatsizi de, agresif).
  const tavan = Math.min(tarz === "agresif" ? 6 : 4, 1 + Math.floor(s.tur_sayisi / (tarz === "agresif" ? 4 : 6)));
  while (s.ekip.length < tavan && is.adaylar.length > 0) {
    const sirali = [...is.adaylar].sort((a, b) => (tarz === "agresif" ? a.ucret - b.ucret : b.sadakat - a.sadakat));
    const a = sirali[0];
    if (s.para < a.ucret + 40 * enf) break;
    s.para -= a.ucret;
    is.adaylar = is.adaylar.filter((x) => x.id !== a.id);
    s.ekip.push({
      id: a.id, isim: a.isim, rol: a.rol, gercekKalite: a.gercekKalite, tahminiMin: a.tahminiMin, tahminiMax: a.tahminiMax,
      maas: a.maas, sadakat: a.sadakat, kisilik: "Sadık", rol_turu: a.rolTuru, taninirlik: a.taninirlik,
    });
  }
  // Yatırım: depo → dükkân → kervan, nakit fiyatın 2 katını aştıkça.
  for (const id of ["depo", "dukkan", "kervan"]) {
    const t = yatirimTanimiGetir(profil, id)!;
    const k = is.yatirimlar[id] ?? 0;
    if (k >= t.fiyatlar.length) continue;
    const fiyat = t.fiyatlar[k] * enf;
    if (s.para > fiyat * 2.2) {
      s.para -= fiyat;
      is.yatirimlar[id] = k + 1;
    }
  }
  // Hatlar: rütbe açtıkça en kârlı hatları aç.
  const adaylar = profil.hatlar.filter((h) => h.minRutbe <= s.rutbe_seviye).sort((a, b) => b.talepTabani * (b.birimFiyat - b.birimMaliyet) - a.talepTabani * (a.birimFiyat - a.birimMaliyet));
  for (const h of is.hatlar) h.acik = false;
  for (const t of adaylar.slice(0, slot)) {
    const h = is.hatlar.find((x) => x.id === t.id)!;
    h.acik = true;
    h.otomatik = true;
    h.fiyat = tarz === "agresif" ? "ucuz" : "normal";
  }
}

interface Cikti { gelir: number[]; gider: number[]; net: number[]; kitle: number[]; para: number[]; batti: boolean }

function tekOmur(cag: Cag, tarz: Tarz): Cikti {
  const s = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  s.yas = 15;
  mesleğiSec(s, "Tüccar");
  const c: Cikti = { gelir: [], gider: [], net: [], kitle: [], para: [], batti: false };
  for (let y = 0; y < YIL; y++) {
    rutbeSurukle(s, y);
    botKarar(s, tarz);
    const g = giderKalemleriHesapla(s);
    const gider = g.yasam + g.konut + g.ekip + g.evcilHayvan + g.savasVergisi;
    const onceki = s.para;
    s.yil += 1;
    s.yas += 1;
    pasifEkonomiUygula(s, 1);
    s.tur_sayisi += 1;
    c.gelir.push(s.para - onceki + gider);
    c.gider.push(gider);
    c.net.push(s.para - onceki);
    c.kitle.push(s.meslek_gucu);
    c.para.push(s.para);
    if (s.para < -30) c.batti = true;
    if (s.para < 0 && s.isletme) s.para = Math.max(s.para, -30); // simülasyon: borç kilidi
  }
  return c;
}

const dilimler: [string, number, number][] = [["15-25", 0, 10], ["25-45", 10, 30], ["45+", 30, YIL]];
const ort = (a: number[]) => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length);

for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as Cag[]) {
  for (const tarz of ["pasif", "dengeli", "agresif"] as Tarz[]) {
    const sonuclar: Cikti[] = [];
    for (let i = 0; i < N; i++) sonuclar.push(tekOmur(cag, tarz));
    const satirlar = dilimler.map(([ad, a, b]) => {
      const gelir = ort(sonuclar.map((c) => ort(c.gelir.slice(a, b))));
      const gider = ort(sonuclar.map((c) => ort(c.gider.slice(a, b))));
      const net = ort(sonuclar.map((c) => ort(c.net.slice(a, b))));
      const kitle = ort(sonuclar.map((c) => ort(c.kitle.slice(a, b))));
      return `${ad}: gelir ${gelir.toFixed(1)} · gider ${gider.toFixed(1)} · net ${net.toFixed(1)} · kitle ${kitle.toFixed(1)}`;
    });
    const batan = sonuclar.filter((c) => c.batti).length;
    console.log(`\n${cag} / ${tarz}  (batan %${Math.round((batan / N) * 100)})\n  ${satirlar.join("\n  ")}`);
  }
}
