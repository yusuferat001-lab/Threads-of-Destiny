/**
 * Asker "birlik" modu simülasyonu (2026-10): gerçek `pasifEkonomiUygula` + `birlikYilIsle` + dünya dönemleri ile yıl yıl bir ömür
 * oynatır. Bot tarzları:
 *   pasif    — hiçbir karar vermez (yalnız zorunlu doktrin/savaş kararları ilk seçenekle)
 *   dengeli  — görevleri rütbeye göre açar, kışla/kalite/devşirme yatırımı yapar, orta talim
 *   aktif    — dengeli + özel birlikler, ağır talim, yüksek kalite, savaşta seçkin seferberlik, subay alımı
 * Çıktı: yaş 30/40/50 net + cebine kalan, 60'ta er, askerî pay, rütbe yaşları, ganimetin gelir içindeki payı, batma oranı.
 *
 *   SIM_N=100 SIM_CAG="Orta Çağ" SIM_TARZ=pasif,dengeli,aktif npx tsx scripts/simulateBirlik.ts
 */
import "./_simPrismaStub";
import {
  createCharacter,
  mesleğiSec,
  pasifEkonomiUygula,
  giderKalemleriHesapla,
  donemIlerlet,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslat,
  vebaBitisKontrolEt,
  vebaBaslamaliMi,
  pazarYillikUygula,
  yonetimYillikUygula,
  rutbeGuncelle,
  isletmeBaglami,
  enflasyonCarpani,
  giderEnflasyonCarpani,
  krediAl,
  krediTeklifleri,
  krediYillikUygula,
} from "../src/game/stateManager";
import { isletmeProfiliGetir, yatirimTanimiGetir } from "../src/data/meslekProfilleri";
import { calisanLimiti, adaylariGerekirseYenile } from "../src/game/isletme";
import { pazarPayiHesapla } from "../src/data/pazar";
import { doktrinBekleyenSeviye, erSayisi, komutaLimiti, gorevSlotSayisi, birlikAl, gucHesapla } from "../src/game/birlik";
import { birlikKararUygula, birlikSec, doktrinSec, kaliteYukselt, savasKarariBekliyorMu, savasKarariDurumu, savasKarariVer } from "../src/game/birlikIslem";
import { GOREVLER, doktrinSecenekleri, DUSMAN_REFERANS_YAS } from "../src/data/birlik";
import { EKSTRA_VERGI_ODEME_ILISKI } from "../src/data/ekstraVergi";
import type { Cag, CharacterState, EkipUyesi } from "../src/types";

const N = Number(process.env.SIM_N ?? 100);
const YIL = Number(process.env.SIM_YIL ?? 45);
type Tarz = "pasif" | "dengeli" | "aktif" | "tam";
const TARZLAR = (process.env.SIM_TARZ ? process.env.SIM_TARZ.split(",") : ["pasif", "dengeli", "aktif"]) as Tarz[];
const CAGLAR: Cag[] = process.env.SIM_CAG ? [process.env.SIM_CAG as Cag] : ["Orta Çağ", "Sanayi Devrimi"];
const TRACE = !!process.env.SIM_TRACE;

function rutbeSurukle(s: CharacterState, y: number, tarz: Tarz) {
  // Kariyer puanı / şöhret sürüklenmesi: aktif oyuncu daha hızlı birikir (olay başarıları).
  const kp = tarz === "pasif" ? 3 : tarz === "dengeli" ? 4.5 : 6;
  s.kariyer_puani += kp;
  s.un = Math.min(tarz === "pasif" ? 45 : 80, 20 + y * ((tarz === "aktif" || tarz === "tam") ? 1.4 : 1));
  rutbeGuncelle(s);
}

function zorunluKararlar(s: CharacterState, tarz: Tarz) {
  for (let g = 0; g < 6; g++) {
    const sev = doktrinBekleyenSeviye(s);
    if (sev === null) break;
    const sec = doktrinSecenekleri(sev, null);
    doktrinSec(s, ((tarz === "aktif" || tarz === "tam") ? sec.find((d) => d.kaynak === "evrensel" && d.etki.guc !== undefined) ?? sec[0] : sec[0]).id);
  }
  for (let g = 0; g < 10 && savasKarariBekliyorMu(s); g++) {
    const d = savasKarariDurumu(s)!;
    let secim = d.secenekler[0].id;
    if ((tarz === "aktif" || tarz === "tam")) {
      if (d.adim === "seferberlik") secim = d.secenekler.find((o) => o.id === "dengeli")?.id ?? secim;
      if (d.adim === "ikmal") secim = d.secenekler.find((o) => o.id === (process.env.SIM_IKMAL ?? "yeterli"))?.id ?? secim;
    }
    savasKarariVer(s, secim, isletmeBaglami(s));
  }
}

function botKarar(s: CharacterState, tarz: Tarz) {
  zorunluKararlar(s, tarz);
  if (tarz === "pasif") return;
  const b = birlikAl(s);
  const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
  const is = s.isletme!;
  const bgl = isletmeBaglami(s);
  const enf = enflasyonCarpani(s);
  const genf = giderEnflasyonCarpani(s);
  const rezerv = (20 + erSayisi(s) * 0.25) * genf;

  // Görevler: rütbe slotu kadar, ordunun bölünmüş payına yetenlerden en gelirli olanlar.
  const slot = gorevSlotSayisi(s);
  const er = erSayisi(s);
  const adaylar = GOREVLER.filter((g) => !g.yalnizSavas || s.ulke.savasta)
    .filter((g) => gucHesapla(s).guc / Math.max(1, slot) >= g.minGuc)
    .sort((a, b2) => b2.erBasi - a.erBasi);
  const secilen = adaylar.slice(0, slot).map((g) => g.id);
  try {
    birlikKararUygula(s, {
      gorevler: secilen.length ? secilen : ["devriye"],
      talim: (tarz === "aktif" || tarz === "tam") ? "agir" : "orta",
      ganimet_payi: s.rutbe_seviye >= 2 ? "dengeli" : undefined,
    });
  } catch {
    /* uygun görev yok */
  }

  // Yatırım: kışla (limit doldukça), devşirme bürosu, revir, karakol.
  const sira = ["kisla", "devsirme", "revir", "karakol"];
  for (const id of sira) {
    const t = yatirimTanimiGetir(profil, id);
    if (!t) continue;
    const k = is.yatirimlar[id] ?? 0;
    if (k >= t.fiyatlar.length) continue;
    if (id === "kisla" && er < komutaLimiti(s) * 0.75) continue; // limit dolmadan kışla alma
    const fiyat = t.fiyatlar[k] * genf;
    if (s.para > rezerv + fiyat) {
      s.para -= fiyat;
      is.yatirimlar[id] = k + 1;
    }
  }

  // Subay: devşirme > harp > levazım > tabip; maaşı yıllık net taşıyorsa.
  adaylariGerekirseYenile(s);
  const oncelik = ["musteri", "ana", "maliyet", "guvenlik"];
  while (s.ekip.length < calisanLimiti(s) && is.adaylar.length > 0) {
    const sirali = [...is.adaylar].sort((a, b2) => oncelik.indexOf(a.rolTuru) - oncelik.indexOf(b2.rolTuru) || b2.yetenek - a.yetenek);
    const a = sirali[0];
    const toplamMaas = s.ekip.reduce((t, u) => t + u.maas, 0);
    if (s.para < rezerv + a.maas_taban * enf * 3) break;
    if ((is.son_dokum?.net ?? 0) - toplamMaas - a.maas_taban * genf < 6 * genf) break;
    is.adaylar = is.adaylar.filter((x) => x.id !== a.id);
    const uye: EkipUyesi = {
      id: a.id, isim: a.isim, rol: a.rol, gercekKalite: a.yetenek, tahminiMin: a.yetenek, tahminiMax: a.yetenek,
      maas: a.maas_taban * genf, sadakat: a.sadakat, kisilik: "Sadık", rol_turu: a.rolTuru,
      y_giris: a.yetenek, s_giris: a.sadakat, maas_taban: a.maas_taban,
    };
    s.ekip.push(uye);
  }

  // Teçhizat ve özel birlik.
  try {
    if (b.hedef_kalite === "dusuk" && s.para > rezerv * 3) birlikKararUygula(s, { hedef_kalite: "orta" });
    if (tarz === "tam") {
      // Tam yatırım: teçhizat ve birlikler olabildiğince erken.
      if (s.para > rezerv + 5 * genf) kaliteYukselt(s, "yuksek", 100, bgl);
    } else if (s.para > rezerv * 4 + er * 0.7 * genf) kaliteYukselt(s, (tarz === "aktif" || tarz === "tam") && s.para > rezerv * 10 + er * 1.6 * genf ? "yuksek" : "orta", 50, bgl);
  } catch {
    /* kilitli ya da gereksiz */
  }
  if ((tarz === "aktif" || tarz === "tam")) {
    try {
      const hedef = tarz === "tam" ? 3 : Math.min(3, 1 + Math.floor(s.rutbe_seviye / 2));
      const sira = ["mizrakli", "okcu", "suvari"] as const;
      if (b.birlik_turler.length < hedef && s.para > rezerv * 3 + er * 0.5 * genf) {
        const sonraki = sira.find((t) => !b.birlik_turler.includes(t));
        if (sonraki) birlikSec(s, [...b.birlik_turler, sonraki], bgl);
      }
    } catch {
      /* kilit */
    }
  }

  // Nakit sıkışırsa kredi (oyuncu da böyle yapar).
  if (!s.kredi && s.para < 5 * genf) {
    try {
      const t = krediTeklifleri(s).sort((x, y) => x.tutar - y.tutar)[0];
      if (t && t.taksit <= 0.6 * Math.max(0, is.son_dokum?.net ?? 0)) krediAl(s, t.id);
    } catch {
      /* alınamadı */
    }
  }
}

interface Omur {
  net: number[];
  cebine: number[];
  cebineGercek: number[];
  kalem: Record<string, number>;
  enf: number[];
  er: number[];
  pay: number[];
  guc: number[];
  ganimetOrani: number[];
  rutbeYas: (number | null)[];
  batti: boolean;
  savasKaybi: number[];
  zafer: Record<"haydut" | "sinir" | "savas", [number, number]>;
  gucRutbe: number[][];
  sonEr: number;
  olduYil: number;
}

function tekOmur(cag: Cag, tarz: Tarz): Omur {
  const s = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  s.yas = 15;
  mesleğiSec(s, "Asker");
  const o: Omur = { net: [], cebine: [], cebineGercek: [], kalem: {}, enf: [], er: [], pay: [], guc: [], ganimetOrani: [], rutbeYas: [null, null, null, null, null], batti: false, savasKaybi: [], zafer: { haydut: [0, 0], sinir: [0, 0], savas: [0, 0] }, gucRutbe: [[], [], [], [], []], sonEr: 0, olduYil: YIL };
  let savasOncesi = 0;
  let savasta = false;
  for (let y = 0; y < YIL; y++) {
    rutbeSurukle(s, y, tarz);
    botKarar(s, tarz);
    const para0 = s.para;
    donemIlerlet(s, 1);
    buyukSavasKontrolEt(s, 1);
    buyukSavasBitisKontrolEt(s);
    if (vebaBaslamaliMi(s, 1)) {
      s.ulke.vebada = true;
      vebaBaslat(s, 0);
    }
    vebaBitisKontrolEt(s);
    if (s.ulke.savasta && !savasta) savasOncesi = erSayisi(s);
    zorunluKararlar(s, tarz); // savaş kararları: savaş yılı bu çağrıda belli olur
    const g = giderKalemleriHesapla(s);
    const gider = g.yasam + g.konut + g.ekip + g.evcilHayvan;
    s.yil += 1;
    s.yas += 1;
    pasifEkonomiUygula(s, 1);
    pazarYillikUygula(s, 1);
    krediYillikUygula(s, 1);
    yonetimYillikUygula(s, 1);
    if (s.yonetim_talep) {
      const t = s.yonetim_talep;
      if (t.tur === "vergi") s.yonetim_iliski = Math.min(100, s.yonetim_iliski + EKSTRA_VERGI_ODEME_ILISKI);
      s.yonetim_talep = null;
    }
    s.tur_sayisi += 1;
    if (savasta && !s.ulke.savasta) o.savasKaybi.push(savasOncesi > 0 ? erSayisi(s) / savasOncesi : 1);
    savasta = !!s.ulke.savasta;
    const d = s.isletme?.son_dokum;
    o.net.push(d?.net ?? 0);
    o.cebine.push(s.para - para0 + gider - 0);
    o.cebineGercek.push(s.para - para0);
    {
      const bd = d?.birlik;
      const K = (k: string, v: number) => (o.kalem[k] = (o.kalem[k] ?? 0) + v / enflasyonCarpani(s));
      for (const u of d?.uyarilar ?? []) {
        if (u.kod === "baris_catisma") {
          K("  ganimet:baris", u.tutar ?? 0);
          const k = u.catismaTur === "sinir" ? "sinir" : "haydut";
          o.zafer[k][1] += 1;
          if (u.savasSonucu === "zafer") o.zafer[k][0] += 1;
        }
        if (u.kod === "savas_sonu") {
          o.zafer.savas[1] += 1;
          if (u.savasSonucu === "zafer") o.zafer.savas[0] += 1;
        }
        if (u.kod === "savas_ganimet") K("  ganimet:savasZafer", u.tutar ?? 0);
        if (u.kod === "yagma") K("  ganimet:yagma", u.tutar ?? 0);
      }
      K("sold+odenek", bd?.sold ?? 0);
      K("erBasi", bd?.erBasiGelir ?? 0);
      K("gorev", bd?.gorevGeliri ?? 0);
      K("ganimetNet", (bd?.ganimetPara ?? 0) - (bd?.erPayi ?? 0));
      K("gider(erMasraf+erzak+techizat)", -((bd?.erMasrafi ?? 0) + (bd?.erzak ?? 0) + (bd?.techizatBakimi ?? 0)));
      K("yasam+kira", -gider);
    }
    o.enf.push(enflasyonCarpani(s));
    o.er.push(erSayisi(s));
    o.pay.push(pazarPayiHesapla(s) * 100);
    o.guc.push(birlikAl(s).guc);
    o.gucRutbe[Math.max(0, Math.min(4, s.rutbe_seviye - 1))].push(birlikAl(s).guc);
    const gel = d?.satis ?? 0;
    o.ganimetOrani.push(gel > 0 ? ((d?.birlik?.ganimetPara ?? 0) - (d?.birlik?.devletPayi ?? 0)) / gel : 0);
    for (let r = 1; r < 5; r++) if (o.rutbeYas[r] == null && s.rutbe_seviye >= r + 1) o.rutbeYas[r] = s.yas;
    if (s.para < -60 * enflasyonCarpani(s) && !o.batti) {
      o.batti = true;
      if (process.env.SIM_BATMA) console.log(`  BATTI y${y + 1} ${tarz} R${s.rutbe_seviye} er=${erSayisi(s)} para=${s.para.toFixed(0)} net=${d?.net} savas=${s.ulke.savasta} kredi=${s.kredi?.kalanBorc ?? 0} ekip=${s.ekip.length} kalite=${JSON.stringify(birlikAl(s).kalite)} birlik=${birlikAl(s).birlik_turler.length}`);
    }
    if (TRACE) for (const u of d?.uyarilar ?? []) if (u.kod === "baris_catisma") console.log(`    y${y + 1} çatışma ${u.catismaTur} ${u.savasSonucu} ganimet=${u.tutar} guc=${Math.round(birlikAl(s).guc)}`);
    if (TRACE && y % 5 === 4) console.log(`  y${y + 1} R${s.rutbe_seviye} er=${erSayisi(s)} guc=${Math.round(birlikAl(s).guc)} pay=${(pazarPayiHesapla(s) * 100).toFixed(1)}% net=${d?.net} para=${s.para.toFixed(0)}`);
    if (s.yas >= 90) {
      o.olduYil = y;
      break;
    }
  }
  o.sonEr = erSayisi(s);
  return o;
}

const ort = (a: number[]) => (a.length ? a.reduce((t, x) => t + x, 0) / a.length : 0);
const med = (a: number[]) => {
  const b = [...a].sort((x, y) => x - y);
  return b.length ? b[Math.floor(b.length / 2)] : 0;
};
const f = (n: number, k = 1) => n.toFixed(k);

for (const cag of CAGLAR) {
  console.log(`\n=== ${cag} (N=${N}, ${YIL} yıl) ===`);
  for (const tarz of TARZLAR) {
    const omurler = Array.from({ length: N }, () => tekOmur(cag, tarz));
    const yasNet = (yas: number) => ort(omurler.map((o) => ort(o.net.slice(Math.max(0, yas - 15 - 2), yas - 15 + 3))));
    const er60 = omurler.map((o) => o.er[Math.min(o.er.length - 1, 44)] ?? 0);
    const savasKalan = omurler.flatMap((o) => o.savasKaybi);
    const ganimet = ort(omurler.flatMap((o) => o.ganimetOrani.slice(15)));
    const rutbeOrt = [1, 2, 3, 4].map((r) => {
      const v = omurler.map((o) => o.rutbeYas[r]).filter((x): x is number => x != null);
      return v.length ? `S${r + 1}:${f(ort(v), 0)}y(${f((v.length / N) * 100, 0)}%)` : `S${r + 1}:-`;
    });
    console.log("  kalem (50y reel toplam): " + [...new Set(omurler.flatMap((o) => Object.keys(o.kalem)))].map((k) => `${k} ${f(ort(omurler.map((o) => o.kalem[k] ?? 0)), 0)}`).join(" · "));
    console.log(`  >>> TOPLAM ${YIL} yıl cebine kalan: nominal ${f(ort(omurler.map((o) => o.cebineGercek.reduce((t, x) => t + x, 0))), 0)} · reel(enflasyonsuz) ${f(ort(omurler.map((o) => o.cebineGercek.reduce((t, x, i) => t + x / o.enf[i], 0))), 0)} | batan ${f((omurler.filter((o) => o.batti).length / N) * 100, 0)}%`);
    console.log(
      `  ort. güç rütbeye göre (S1..S5; düşman ref yaşa göre ${DUSMAN_REFERANS_YAS.map((x) => x.join(":")).join(" ")}): ${[0, 1, 2, 3, 4].map((r) => { const v = omurler.flatMap((o) => o.gucRutbe[r]); return v.length ? `${f(ort(v), 0)} (n=${v.length})` : "-"; }).join(" · ")}`
    );
    console.log(
      `  güç yaşa göre (medyan/ort) @25/35/45/55/65: ${[25, 35, 45, 55, 65].map((yas) => { const v = omurler.map((o) => o.guc[yas - 15 - 1]).filter((x): x is number => typeof x === "number"); return v.length ? `${f(med(v), 0)}/${f(ort(v), 0)}` : "-"; }).join(" · ")}`
    );
    console.log(
      `  zafer% haydut/sınır/savaş = ${(["haydut", "sinir", "savas"] as const).map((k) => { const z = omurler.reduce((t, o) => t + o.zafer[k][0], 0); const n = omurler.reduce((t, o) => t + o.zafer[k][1], 0); return n ? `${f((z / n) * 100, 0)} (n=${n})` : "-"; }).join(" / ")}`
    );
    console.log(
      `[${tarz.padEnd(8)}] net@30/40/50 = ${f(yasNet(30))}/${f(yasNet(40))}/${f(yasNet(50))} | er@60 ort ${f(ort(er60), 0)} med ${f(med(er60), 0)} | pay@60 ${f(ort(omurler.map((o) => o.pay[Math.min(o.pay.length - 1, 44)] ?? 0)))}% | ganimet/gelir ${f(ganimet * 100, 0)}% | savaş sonrası kalan ${savasKalan.length ? f(med(savasKalan) * 100, 0) + "%" : "-"} (n=${savasKalan.length}) | batan ${f((omurler.filter((o) => o.batti).length / N) * 100, 0)}% | ${rutbeOrt.join(" ")}`
    );
  }
}
