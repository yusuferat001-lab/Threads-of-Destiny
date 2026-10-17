/**
 * İşletme ekonomisi simülasyonu (2026-10, v8; Tüccar/Zanaatkâr): gerçek `isletmeYilIsle` +
 * `pasifEkonomiUygula` + dünya dönemleri ile yıl yıl bir ömür oynatır; üç bot tarzı:
 *   pasif    — hiç dokunmaz (1 temel hat, normal fiyat, stok hedefi normal, çalışan yok)
 *   dengeli  — rütbe/kâr yettikçe hat açar, çalışan alır, yatırım yapar
 *   agresif  — her şeyi en hızlı açar, ucuz fiyatla çok satar, tanıtıma yatırır
 * Rütbe/şöhret ve olay kaynaklı güç kazancı basit bir sürüklenmeyle taklit edilir.
 * Çıktı: gelir bandı, pazar payı (ölümde), batma oranı, hırsızlık aralığı, çalışan ROI.
 *
 *   npx tsx scripts/simulateIsletme.ts      (env: SIM_N, SIM_YIL, SIM_MESLEK=Tüccar|Zanaatkâr)
 */
import "./_simPrismaStub";
import {
  createCharacter,
  mesleğiSec,
  pasifEkonomiUygula,
  giderKalemleriHesapla,
  donemIlerlet,
  buyukSavasKontrolEt,
  vebaBaslamaliMi,
  meslekGucuEkle,
} from "../src/game/stateManager";
import { isletmeProfiliGetir, yatirimTanimiGetir } from "../src/data/meslekProfilleri";
import { hatSlotSayisi, calisanLimiti, adaylariGerekirseYenile, calisanBonusu } from "../src/game/isletme";
import { pazarPayiHesapla } from "../src/data/pazar";
import { enflasyonCarpani } from "../src/game/stateManager";
import type { Cag, CharacterState, IsletmeFiyat, EkipUyesi } from "../src/types";

const N = Number(process.env.SIM_N ?? 200);
const MESLEK = process.env.SIM_MESLEK ?? "Tüccar";
const YIL = Number(process.env.SIM_YIL ?? 45);
type Tarz = "pasif" | "dengeli" | "agresif";

function rutbeSurukle(s: CharacterState, yilIdx: number, tarz: Tarz) {
  // Gerçek ömürdeki ortalama ilerlemeye benzer: pasif daha yavaş.
  const esikler = tarz === "pasif" ? [0, 12, 26, 44, 99] : [0, 9, 18, 30, 45];
  s.rutbe_seviye = Math.min(5, 1 + esikler.filter((e, i) => i > 0 && yilIdx >= e).length);
  s.un = Math.min(tarz === "pasif" ? 45 : 75, 20 + yilIdx * 1.1);
  // Olay kaynaklı meslek gücü kazancı (kategori başarıları): pasif az, aktif daha çok.
  meslekGucuEkle(s, tarz === "pasif" ? 0.1 : tarz === "dengeli" ? 0.5 : 0.8);
}

function botKarar(s: CharacterState, tarz: Tarz) {
  if (tarz === "pasif" || !s.isletme) return;
  const is = s.isletme;
  const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
  const enf = enflasyonCarpani(s);
  const slot = hatSlotSayisi(s);
  adaylariGerekirseYenile(s);
  // Çalışan: limit dolana dek, ana rol ve güvenlik öncelikli; agresif ucuzu, dengeli kaliteliyi sever.
  const limit = process.env.SIM_ISCI === "0" ? 0 : calisanLimiti(s);
  const oncelik = ["ana", "guvenlik", "musteri", "maliyet"];
  while (s.ekip.length < limit && is.adaylar.length > 0) {
    const sirali = [...is.adaylar].sort((a, b) => {
      const o = oncelik.indexOf(a.rolTuru) - oncelik.indexOf(b.rolTuru);
      if (o !== 0) return o;
      return tarz === "agresif" ? a.maas_taban - b.maas_taban : b.yetenek + b.sadakat - (a.yetenek + a.sadakat);
    });
    const a = sirali[0];
    if (s.para < (a.maas_taban * enf) * 4 + 25 * enf) break;
    is.adaylar = is.adaylar.filter((x) => x.id !== a.id);
    const uye: EkipUyesi = {
      id: a.id, isim: a.isim, rol: a.rol, gercekKalite: a.yetenek, tahminiMin: a.yetenek, tahminiMax: a.yetenek,
      maas: a.maas_taban * enf, sadakat: a.sadakat, kisilik: "Sadık", rol_turu: a.rolTuru,
      y_giris: a.yetenek, s_giris: a.sadakat, maas_taban: a.maas_taban,
    };
    s.ekip.push(uye);
  }
  // Yatırım: nakit fiyatın 2 katını aştıkça.
  const sira = tarz === "agresif" ? ["tanitim", "tezgah", "depo", "dukkan", "vitrin", "guvenlik", "kervan"] : ["depo", "tezgah", "dukkan", "vitrin", "guvenlik", "tanitim", "kervan"];
  for (const id of process.env.SIM_YATIRIM === "0" ? [] : sira) {
    const t = yatirimTanimiGetir(profil, id);
    if (!t) continue;
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
  const fiyat: IsletmeFiyat = tarz === "agresif" ? "eksi10" : "normal";
  for (const t of adaylar.slice(0, slot)) {
    const h = is.hatlar.find((x) => x.id === t.id)!;
    h.acik = true;
    h.fiyat = fiyat;
  }
  is.stok_hedefi = "normal";
}

interface Cikti { gelir: number[]; net: number[]; pay: number[]; para: number[]; batti: boolean; sonPara: number; hirsizlik: number; anaRolKazanc: number }

function tekOmur(cag: Cag, tarz: Tarz): Cikti {
  const s = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  s.yas = 15;
  mesleğiSec(s, MESLEK);
  const c: Cikti = { gelir: [], net: [], pay: [], para: [], batti: false, sonPara: 0, hirsizlik: 0, anaRolKazanc: 0 };
  for (let y = 0; y < YIL; y++) {
    rutbeSurukle(s, y, tarz);
    botKarar(s, tarz);
    donemIlerlet(s, 1);
    buyukSavasKontrolEt(s, 1);
    vebaBaslamaliMi(s);
    const g = giderKalemleriHesapla(s);
    const gider = g.yasam + g.konut + g.ekip + g.evcilHayvan + g.savasVergisi;
    const onceki = s.para;
    s.yil += 1;
    s.yas += 1;
    pasifEkonomiUygula(s, 1);
    s.tur_sayisi += 1;
    c.gelir.push(s.para - onceki + gider);
    c.net.push(s.para - onceki);
    c.pay.push(pazarPayiHesapla(s) * 100);
    c.para.push(s.para);
    if (process.env.SIM_DEBUG && y % 5 === 4) console.log(y, JSON.stringify({satis: s.isletme?.son_dokum?.satis, alim: s.isletme?.son_dokum?.alim, brut: s.isletme?.son_dokum?.brutKar, uretim: s.isletme?.son_dokum?.uretim, hat: s.isletme?.son_dokum?.hatlar, ek: s.ekip.length, up: s.isletme?.son_dokum?.uyarilar.map(u=>u.kod)}));
    c.hirsizlik += s.isletme?.son_dokum?.uyarilar.filter((u) => u.kod === "hirsizlik").length ?? 0;
    if (s.para < -30) c.batti = true;
    if (s.para < 0 && s.isletme) s.para = Math.max(s.para, -30);
    c.sonPara = s.para;
  }
  for (const e of s.ekip) {
    const b = calisanBonusu(e);
    if (b?.tur === "ana") c.anaRolKazanc += b.deger;
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
      const net = ort(sonuclar.map((c) => ort(c.net.slice(a, b))));
      const pay = ort(sonuclar.map((c) => ort(c.pay.slice(a, b))));
      return `${ad}: gelir ${gelir.toFixed(1)} · net ${net.toFixed(1)} · pay %${pay.toFixed(1)}`;
    });
    const batan = sonuclar.filter((c) => c.batti).length;
    const sonPay = sonuclar.map((c) => c.pay[c.pay.length - 1]).sort((a, b) => a - b);
    const sonNegatif = sonuclar.filter((c) => c.sonPara < 0).length;
    const hirs = ort(sonuclar.map((c) => c.hirsizlik));
    console.log(
      `\n${cag} / ${tarz}  (batan %${Math.round((batan / N) * 100)}, ömür sonunda borçlu %${Math.round((sonNegatif / N) * 100)}) · son pay medyan %${sonPay[Math.floor(N / 2)].toFixed(1)} (p10 %${sonPay[Math.floor(N * 0.1)].toFixed(1)}, p90 %${sonPay[Math.floor(N * 0.9)].toFixed(1)}) · hırsızlık/ömür ${hirs.toFixed(1)}\n  ${satirlar.join("\n  ")}`
    );
  }
}
