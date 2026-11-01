/**
 * İşletme ekonomisi simülasyonu (2026-10, v8; Tüccar/Zanaatkâr): gerçek `isletmeYilIsle` +
 * `pasifEkonomiUygula` + dünya dönemleri ile yıl yıl bir ömür oynatır; üç bot tarzı:
 *   pasif    — hiç dokunmaz (1 temel hat, normal fiyat, stok hedefi normal, çalışan yok)
 *   dengeli  — rütbe/kâr yettikçe hat açar, çalışan alır, yatırım yapar
 *   agresif  — her şeyi en hızlı açar, ucuz fiyatla çok satar, tanıtıma yatırır
 *   aktif    — dengeli gibi ama çalışanı ve yatırımı daha erken alır (v11 rapor tarzı: 10 yıllık dilimlerde pay / dükkan neti / cebine kalan)
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
  buyukSavasBitisKontrolEt,
  vebaBaslat,
  vebaBitisKontrolEt,
  vebaBaslamaliMi,
  pazarYillikUygula,
  musteriEkle,
  yonetimYillikUygula,
} from "../src/game/stateManager";
import { EKSTRA_VERGI_ODEME_ILISKI } from "../src/data/ekstraVergi";
import { isletmeProfiliGetir, yatirimTanimiGetir } from "../src/data/meslekProfilleri";
import { hatSlotSayisi, calisanLimiti, adaylariGerekirseYenile, calisanBonusu, depoKapasitesi, depoKademesi, depoKapasiteTablosu } from "../src/game/isletme";
import { pazarPayiHesapla } from "../src/data/pazar";
import { ogretiBekleyenSeviye, ogretiSec, faaliyetSlotSayisi, faaliyetKilitliMi } from "../src/game/cemaat";
import { ogretiSecenekleri } from "../src/data/ogretiler";
import { FAALIYETLER } from "../src/data/cemaat";
import { enflasyonCarpani, giderEnflasyonCarpani, isletmeBaglami, krediAl, krediTeklifleri, krediYillikUygula } from "../src/game/stateManager";
import type { Cag, CharacterState, IsletmeFiyat, EkipUyesi } from "../src/types";

const N = Number(process.env.SIM_N ?? 200);
const MESLEK = process.env.SIM_MESLEK ?? "Tüccar";
const YIL = Number(process.env.SIM_YIL ?? 45);
type Tarz = "pasif" | "dengeli" | "agresif" | "fanatik" | "aktif";

function rutbeSurukle(s: CharacterState, yilIdx: number, tarz: Tarz) {
  // Gerçek ömürdeki ortalama ilerlemeye benzer: pasif daha yavaş.
  const esikler = tarz === "pasif" ? [0, 12, 26, 44, 99] : [0, 9, 18, 30, 45];
  s.rutbe_seviye = Math.min(5, 1 + esikler.filter((e, i) => i > 0 && yilIdx >= e).length);
  s.un = Math.min(tarz === "pasif" ? 45 : 75, 20 + yilIdx * 1.1);
  // Olay kaynaklı müşteri kazancı (kategori başarıları ≈ +3 müşteri/olay): pasif az, aktif daha çok.
  musteriEkle(s, tarz === "pasif" ? 0.2 : tarz === "dengeli" || tarz === "aktif" ? 0.8 : 1.2);
}

/** Nakit yedeği: önce mal alımı + bir yıllık geçim için nakit ayrılır (denenen daha küçük "aktif" yedek stok-bitti sarmalını artırdı: v18b). */
function rezervHesapla(s: CharacterState, _tarz: Tarz): number {
  return (s.isletme ? depoKapasitesi(s.isletme) * 0.8 + 18 : 18) * giderEnflasyonCarpani(s);
}

function botKarar(s: CharacterState, tarz: Tarz) {
  if (tarz === "pasif" || !s.isletme) return;
  const is = s.isletme;
  const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
  const enf = enflasyonCarpani(s);
  const slot = hatSlotSayisi(s);
  adaylariGerekirseYenile(s);
  // Nakit sıkışırsa ve dükkân kârlıysa tefeciden en küçük krediyi çeker (oyuncu da böyle yapar).
  const stoksuz = s.isletme.hatlar.reduce((t, h) => t + h.stok, 0) === 0;
  if (!s.kredi && s.para < 10 * giderEnflasyonCarpani(s) && ((s.isletme?.son_dokum?.net ?? 0) > 0 || stoksuz)) {
    try {
      const t = krediTeklifleri(s).sort((x, y) => x.tutar - y.tutar)[0];
      // v18b: uzun vadeli zorunlu taksit — taksit son dükkân netinin %60'ını aşıyorsa kredi alma.
      if (t && (stoksuz || t.taksit <= 0.6 * Math.max(0, s.isletme?.son_dokum?.net ?? 0))) krediAl(s, t.id);
    } catch {
      /* kredi alınamadı */
    }
  }
  const cemaatMi = profil.mod === "cemaat";
  if (cemaatMi && is.cemaat) {
    // Öğreti: fanatik tarz fanatik olanı, diğerleri ilk fanatik-olmayanı seçer.
    for (let g = 0; g < 6; g++) {
      const sev = ogretiBekleyenSeviye(s);
      if (sev === null) break;
      const sec = ogretiSecenekleri(sev);
      const secilen = (tarz === "fanatik" ? sec.find((o) => o.fanatik) : sec.find((o) => !o.fanatik)) ?? sec[0];
      ogretiSec(s, secilen.id);
    }
    const cm = is.cemaat;
    cm.bagis = tarz === "fanatik" ? "arti10" : tarz === "agresif" ? "eksi10" : "normal";
    cm.kitle = tarz === "fanatik" ? "ust" : "genel";
    cm.yardim = tarz === "fanatik" ? "dusuk" : "orta";
    cm.ton = tarz === "fanatik" ? "atesli" : "dengeli";
  }
  // Çalışan: limit dolana dek, ana rol ve güvenlik öncelikli; agresif ucuzu, dengeli kaliteliyi sever.
  const limit = process.env.SIM_ISCI === "0" ? 0 : tarz === "aktif" ? Math.min(3, calisanLimiti(s)) : calisanLimiti(s);
  const oncelik = tarz === "aktif" ? ["musteri", "maliyet", "ana", "guvenlik"] : ["ana", "guvenlik", "musteri", "maliyet"];
  while (s.ekip.length < limit && is.adaylar.length > 0) {
    const sirali = [...is.adaylar].sort((a, b) => {
      const o = oncelik.indexOf(a.rolTuru) - oncelik.indexOf(b.rolTuru);
      if (o !== 0) return o;
      return tarz === "agresif" ? a.maas_taban - b.maas_taban : b.yetenek + b.sadakat - (a.yetenek + a.sadakat);
    });
    const a = sirali[0];
    const rezerv = rezervHesapla(s, tarz); // önce mal alımı + bir yıllık geçim için nakit ayır
    const toplamMaas = s.ekip.reduce((t, u) => t + u.maas, 0);
    if (s.para < rezerv + (a.maas_taban * enf) * 3) break;
    if ((is.son_dokum?.net ?? 0) - toplamMaas - a.maas_taban * enf < 15 * giderEnflasyonCarpani(s)) break; // dükkân yeni maaşı + geçimi taşımıyorsa çalışan almaz
    is.adaylar = is.adaylar.filter((x) => x.id !== a.id);
    const uye: EkipUyesi = {
      id: a.id, isim: a.isim, rol: a.rol, gercekKalite: a.yetenek, tahminiMin: a.yetenek, tahminiMax: a.yetenek,
      maas: a.maas_taban * enf, sadakat: a.sadakat, kisilik: "Sadık", rol_turu: a.rolTuru,
      y_giris: a.yetenek, s_giris: a.sadakat, maas_taban: a.maas_taban,
    };
    s.ekip.push(uye);
  }
  // Yatırım: nakit fiyatın 2 katını aştıkça.
  const sira = cemaatMi ? ["bina", "okul", "asevi", "tanitim", "guvenlik"] : tarz === "agresif" ? ["tanitim", "tezgah", "depo", "dukkan", "vitrin", "guvenlik", "kervan"] : ["depo", "tezgah", "dukkan", "vitrin", "guvenlik", "tanitim", "kervan"];
  for (const id of process.env.SIM_YATIRIM === "0" ? [] : sira) {
    const t = yatirimTanimiGetir(profil, id);
    if (!t) continue;
    const k = is.yatirimlar[id] ?? 0;
    if (k >= t.fiyatlar.length) continue;
    if (id === "depo" && !cemaatMi) {
      // v15: depo kendiliğinden dolar; kapasite yetmeyince müşteri kaybı olur → yalnız talep kapasiteye yaklaşınca büyüt.
      const talepToplam = is.hatlar.filter((h) => h.acik).reduce((t2, h) => t2 + (h.son_talep || 0), 0);
      if (talepToplam < depoKapasitesi(is) * (process.env.SIM_DEPO_ESIK ? Number(process.env.SIM_DEPO_ESIK) : 0.9)) continue;
    }
    const fiyat = t.fiyatlar[k] * giderEnflasyonCarpani(s);
    if (s.para > rezervHesapla(s, tarz) + fiyat) {
      s.para -= fiyat;
      is.yatirimlar[id] = k + 1;
    }
  }
  if (cemaatMi) {
    // Faaliyetler: rütbesi yeten en yüksek gelirbirimlilerden slot kadarını aç.
    for (const h of is.hatlar) h.acik = false;
    // dengeli/agresif: büyümeyi besleyen faaliyetleri (şifa, eğitim) öne al; fanatik: salt gelir.
    const oncelik = (f: (typeof FAALIYETLER)[number]) => (tarz === "agresif" ? f.inanan * 40 + f.gelirBirimi * (1 - f.masraf) + (f.id === "tovbe" ? 0.12 : 0) : f.gelirBirimi * (1 - f.masraf));
    const acilabilir = FAALIYETLER.filter((f) => !faaliyetKilitliMi(s, f.id)).sort((a, b) => oncelik(b) - oncelik(a));
    for (const f of acilabilir.slice(0, faaliyetSlotSayisi(s))) {
      const h = is.hatlar.find((x) => x.id === f.id);
      if (h) h.acik = true;
    }
    return;
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
  // v15: depo her yıl başı motor tarafından kapasiteye kadar kendiliğinden dolar (oyuncu ayarı yok).
}

interface Cikti { ekVergi: number[]; ekVergiSayisi: number; hatKar: Record<string, number[]>; hatSatis: Record<string, number[]>; satis: number[]; alim: number[]; maas: number[]; aidat: number[]; vergi: number[]; depoM: number[]; hasar: number[]; yatirim: number[]; dukkan: number[]; gider: number[]; musteri: number[]; calisan: number[]; batmaYili: number; batmaDetay: string; batmaVeri: { gelir: number; gider: number; ekip: number; depo: number; brut: number; hasar: boolean; kredi: boolean; pay: number; stokBitti: boolean } | null; krediYili: number; gelir: number[]; net: number[]; pay: number[]; rakipPay: number[]; para: number[]; batti: boolean; kaliciIflas: boolean; negSeri: number; sonPara: number; hirsizlik: number; anaRolKazanc: number; pazar: number[]; enf: number[]; depoK: number[]; kap: number[]; talep: number[]; stokBitti: number[]; kayip: number[]; tavanBagli: number[] }

function tekOmur(cag: Cag, tarz: Tarz): Cikti {
  const s = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  s.yas = 15;
  mesleğiSec(s, MESLEK);
  if (process.env.SIM_PARA) s.para = Number(process.env.SIM_PARA);
  // v11: oyun başında seçilen ana ürün (temel ürün) — yalnız o hat açık başlar.
  const bu = isletmeProfiliGetir(s.meslek, s.cag)?.baslangicUrunleri?.[0];
  if (bu && s.isletme) {
    s.isletme.ana_urun = bu.hat;
    for (const h of s.isletme.hatlar) h.acik = h.id === bu.hat;
  }
  // SIM_FORCE="tanitim=2,kervan=1": yatırım kademelerini bedavaya sabitler (kademe getirisi ablasyonu).
  if (process.env.SIM_FORCE && s.isletme) {
    for (const kv of process.env.SIM_FORCE.split(",")) {
      const [id, k] = kv.split("=");
      s.isletme.yatirimlar[id] = Number(k);
    }
  }
  const c: Cikti = { ekVergi: [], ekVergiSayisi: 0, hatKar: {}, hatSatis: {}, satis: [], alim: [], maas: [], aidat: [], vergi: [], depoM: [], hasar: [], yatirim: [], dukkan: [], gider: [], musteri: [], calisan: [], batmaYili: -1, batmaDetay: "", batmaVeri: null, krediYili: 0, gelir: [], net: [], pay: [], rakipPay: [], para: [], batti: false, kaliciIflas: false, negSeri: 0, sonPara: 0, hirsizlik: 0, anaRolKazanc: 0, pazar: [], enf: [], depoK: [], kap: [], talep: [], stokBitti: [], kayip: [], tavanBagli: [] };
  for (let y = 0; y < YIL; y++) {
    rutbeSurukle(s, y, tarz);
    const para0 = s.para;
    botKarar(s, tarz);
    const alimOdenen = s.isletme?.yil_alim ?? 0;
    const yatirimHarcama = Math.max(0, para0 - s.para - alimOdenen); // yatırım + çalışan peşin gideri (depo alımı hariç)
    donemIlerlet(s, 1);
    buyukSavasKontrolEt(s, 1);
    buyukSavasBitisKontrolEt(s); // savaş bitmezse pazar sonsuza dek küçülür (önceki sürümde eksikti)
    if (vebaBaslamaliMi(s, 1)) {
      s.ulke.vebada = true;
      vebaBaslat(s, 0);
    }
    vebaBitisKontrolEt(s);
    const g = giderKalemleriHesapla(s);
    const gider = g.yasam + g.konut + g.ekip + g.evcilHayvan + g.savasVergisi;
    const onceki = para0; // v22: yıl başı nakit (depo alımı ve yatırım harcaması dahil → dürüst cebine kalan)
    s.yil += 1;
    s.yas += 1;
    pasifEkonomiUygula(s, 1);
    pazarYillikUygula(s, 1); // rakip + küçük esnaf hareketleri, haberler
    krediYillikUygula(s, 1); // faiz + taksit
    // Ekstra vergi (§52): şehir yöneticisi talebi motorda `yonetimYillikUygula`'da doğar; bot hep öder (SIM_VERGISIZ=1 kapatır).
    let ekVergi = 0;
    if (!process.env.SIM_VERGISIZ) {
      yonetimYillikUygula(s, 1);
      const t = s.yonetim_talep;
      if (t) {
        if (t.tur === "vergi") {
          s.para -= t.tutar;
          s.yonetim_iliski = Math.min(100, s.yonetim_iliski + EKSTRA_VERGI_ODEME_ILISKI);
          ekVergi = t.tutar;
          c.ekVergiSayisi++;
        } else {
          // Diğer talepler (bağış/sadakat): bot kabul eder.
          if (t.tur === "bagis") s.para -= t.tutar;
          if (t.kimden === "yonetici") s.yonetim_iliski = Math.min(100, s.yonetim_iliski + 12);
          else s.patron_iliski = Math.min(100, s.patron_iliski + 12);
        }
        s.yonetim_talep = null;
      }
    }
    c.ekVergi.push(ekVergi);
    s.tur_sayisi += 1;
    const d0 = s.isletme?.son_dokum;
    for (const h of d0?.hatlar ?? []) {
      (c.hatKar[h.id] ??= new Array(c.satis.length).fill(0)).push((h.satilan ?? 0) * ((h.birimFiyat ?? 0) - (h.birimMaliyet ?? 0)));
      (c.hatSatis[h.id] ??= new Array(c.satis.length).fill(0)).push((h.satilan ?? 0) * (h.birimFiyat ?? 0));
    }
    for (const k of Object.keys(c.hatKar)) { if (c.hatKar[k].length <= c.satis.length) { c.hatKar[k].push(0); c.hatSatis[k].push(0); } }
    c.satis.push(d0?.satis ?? 0); c.alim.push(d0?.alim ?? 0); c.maas.push(d0?.calisanMaasi ?? 0);
    c.aidat.push(d0?.loncaAidati ?? 0); c.vergi.push(d0?.vergi ?? 0); c.depoM.push((d0?.depoMasrafi ?? 0) + (d0?.curumeKaybi ?? 0));
    c.hasar.push((d0?.nakitHasar ?? 0) + (d0?.ekstraGider ?? 0)); c.yatirim.push(yatirimHarcama);
    c.dukkan.push(s.isletme?.son_dokum?.net ?? 0);
    c.gelir.push(s.para - onceki + gider);
    c.net.push(s.para - onceki);
    c.pay.push(pazarPayiHesapla(s) * 100);
    c.gider.push(gider);
    c.musteri.push(s.meslek_musteri);
    c.pazar.push(s.pazar_musteri);
    c.enf.push(enflasyonCarpani(s));
    c.calisan.push(s.ekip.length);
    c.depoK.push(s.isletme ? depoKademesi(s.isletme) : 0);
    c.kap.push(s.isletme ? depoKapasitesi(s.isletme) : 0);
    c.talep.push(s.isletme ? s.isletme.hatlar.filter((h) => h.acik).reduce((t, h) => t + (h.son_talep || 0), 0) : 0);
    c.stokBitti.push(d0?.uyarilar.some((u) => u.kod === "stok_bitti") ? 1 : 0);
    c.kayip.push(d0?.uyarilar.some((u) => u.kod === "kitle_kaybi") ? 1 : 0);
    c.tavanBagli.push(d0?.uyarilar.some((u) => u.kod === "uretim_tavani") ? 1 : 0);
    c.rakipPay.push(((s.rakipler.find((r) => !r.yenildi)?.musteri ?? 0) / s.pazar_musteri) * 100);
    c.para.push(s.para);
    if (process.env.SIM_DEBUG2 && y < 8) console.log(y, "para", s.para.toFixed(1), "stok", s.isletme?.hatlar.filter((h) => h.acik).map((h) => h.id + ":" + h.stok).join(","), "satis", s.isletme?.son_dokum?.satis, "alim", s.isletme?.son_dokum?.alim, "net", s.isletme?.son_dokum?.net, "musteri", s.meslek_musteri.toFixed(1));
    if (process.env.SIM_DEBUG && y % 5 === 4) console.log(y, JSON.stringify({satis: s.isletme?.son_dokum?.satis, alim: s.isletme?.son_dokum?.alim, brut: s.isletme?.son_dokum?.brutKar, uretim: s.isletme?.son_dokum?.uretim, hat: s.isletme?.son_dokum?.hatlar, ek: s.ekip.length, up: s.isletme?.son_dokum?.uyarilar.map(u=>u.kod)}));
    if (s.kredi) c.krediYili++;
    c.hirsizlik += s.isletme?.son_dokum?.uyarilar.filter((u) => u.kod === "hirsizlik").length ?? 0;
    if (s.para < -30 && !c.batti) {
      c.batti = true;
      const d = s.isletme?.son_dokum;
      c.batmaYili = y;
      c.batmaVeri = {
        gelir: s.para - onceki + gider, gider, ekip: s.ekip.length, depo: s.isletme?.yatirimlar.depo ?? 0, brut: d?.brutKar ?? 0,
        hasar: !!d?.uyarilar.some((u) => ["hirsizlik", "ic_hirsizlik", "rakip_saldiri", "sizdirma"].includes(u.kod)), kredi: !!s.kredi, pay: pazarPayiHesapla(s) * 100,
        stokBitti: !!d?.uyarilar.some((u) => u.kod === "stok_bitti"),
      };
      c.batmaDetay = `gelir ${(s.para - onceki + gider).toFixed(1)} gider ${gider.toFixed(1)} ekip ${s.ekip.length} depo${s.isletme?.yatirimlar.depo ?? 0} brut ${d?.brutKar ?? 0} vergi ${d?.vergi ?? 0} uyari ${d?.uyarilar.map((u) => u.kod).join(",")}`;
    }
    // v18b: kalıcı iflas = yıl sonu nakit eksi VE dükkân neti eksi ardışık ≥3 yıl (meşru kredi borcunu batma saymaz).
    c.negSeri = s.para < 0 && (s.isletme?.son_dokum?.net ?? 0) < 0 ? c.negSeri + 1 : 0;
    if (c.negSeri >= 3) c.kaliciIflas = true;
    if (s.para < 0 && s.isletme) s.para = Math.max(s.para, -30);
    c.sonPara = s.para;
  }
  for (const e of s.ekip) {
    const b = calisanBonusu(e);
    if (b?.tur === "ana") c.anaRolKazanc += b.deger;
  }
  return c;
}

const dilimler: [string, number, number][] = [["yaş 15-25", 0, 10], ["25-35", 10, 20], ["35-45", 20, 30], ["45-55", 30, 40], ["55+", 40, YIL]];
const ort = (a: number[]) => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length);

const CAGLAR = (process.env.SIM_CAG ? [process.env.SIM_CAG] : ["Orta Çağ", "Sanayi Devrimi"]) as Cag[];
const TARZLAR = (process.env.SIM_TARZ ? process.env.SIM_TARZ.split(",") : MESLEK === "Din Adamı" ? ["pasif", "dengeli", "agresif", "fanatik", "aktif"] : ["pasif", "dengeli", "agresif", "aktif"]) as Tarz[];
for (const cag of CAGLAR) {
  for (const tarz of TARZLAR) {
    const sonuclar: Cikti[] = [];
    for (let i = 0; i < N; i++) sonuclar.push(tekOmur(cag, tarz));
    if (process.env.SIM_ABL) {
      const enfOrt = ort(sonuclar.map((c) => ort(c.enf.slice(8, 40))));
      const dk = ort(sonuclar.map((c) => ort(c.dukkan.slice(8, 40))));
      const dkRaw = dk / enfOrt;
      const pay = ort(sonuclar.map((c) => ort(c.pay.slice(8, 40))));
      const tb = ort(sonuclar.map((c) => ort(c.tavanBagli.slice(8, 40)))) * 100;
      console.log(`ABL ${MESLEK} ${cag} ${process.env.SIM_FORCE ?? "taban"} dukkan=${dk.toFixed(2)} (enf-duz ${dkRaw.toFixed(2)}) pay=${pay.toFixed(2)} enf=${enfOrt.toFixed(2)} tavanBagli=%${tb.toFixed(0)} talep=${ort(sonuclar.map((c) => ort(c.talep.slice(8, 40)))).toFixed(0)} p90talep=${(() => { const a = sonuclar.map((c) => ort(c.talep.slice(8, 40))).sort((x, y) => x - y); return a[Math.floor(a.length * 0.9)].toFixed(0); })()}`);
      continue;
    }
    // Dilim tabloları batmayanların ortalamasıdır (batanlar ayrıca yüzde olarak yazılır); 5'ten az kalırsa hepsi.
    const hayatta = sonuclar.filter((c) => !c.batti);
    const kaynak = hayatta.length >= 5 ? hayatta : sonuclar;
    const satirlar = dilimler.map(([ad, a, b]) => {
      const gelir = ort(kaynak.map((c) => ort(c.gelir.slice(a, b))));
      const net = ort(kaynak.map((c) => ort(c.net.slice(a, b))));
      const pay = ort(kaynak.map((c) => ort(c.pay.slice(a, b))));
      const rpay = ort(kaynak.map((c) => ort(c.rakipPay.slice(a, b))));
      const dukkan = ort(kaynak.map((c) => ort(c.dukkan.slice(a, b))));
      const m = (f: (c: Cikti) => number[]) => ort(kaynak.map((c) => ort(f(c).slice(a, b)))).toFixed(1);
      if (process.env.SIM_DOKUM) {
        const idler = [...new Set(kaynak.flatMap((c) => Object.keys(c.hatKar)))];
        const parca = idler.map((id) => `${id} satış ${ort(kaynak.map((c) => ort((c.hatSatis[id] ?? []).slice(a, b)))).toFixed(0)} / marj ${ort(kaynak.map((c) => ort((c.hatKar[id] ?? []).slice(a, b)))).toFixed(0)}`).filter((x) => !/ 0 \/ marj 0$/.test(x));
        console.log(`    [${ad}] hatlar: ${parca.join(" · ")}`);
      }
      if (process.env.SIM_DOKUM) console.log(`    [${ad}] satış ${m((c) => c.satis)} − alım ${m((c) => c.alim)} − çalışan ${m((c) => c.maas)} − aidat ${m((c) => c.aidat)} − vergi ${m((c) => c.vergi)} − depo+çürüme ${m((c) => c.depoM)} − hasar ${m((c) => c.hasar)} − yatırım ${m((c) => c.yatirim)} − yaşam+kira ${m((c) => c.gider)}`);
      return `${ad}: pay %${pay.toFixed(1)} · dükkan neti ${dukkan.toFixed(1)} · cebine kalan ${net.toFixed(1)} (yatırım öncesi ${(net + ort(kaynak.map((c) => ort(c.yatirim.slice(a, b))))).toFixed(1)}) · (brüt gelir ${gelir.toFixed(1)}, rakip %${rpay.toFixed(1)}) · toplam pazar ${ort(kaynak.map((c) => ort(c.pazar.slice(a, b)))).toFixed(0)} · müşterin ${ort(kaynak.map((c) => ort(c.musteri.slice(a, b)))).toFixed(0)} · enflasyon ×${ort(kaynak.map((c) => ort(c.enf.slice(a, b)))).toFixed(2)} · ekstra vergi ${m((c) => c.ekVergi)}/yıl`;
    });
    if (process.env.SIM_DEPO_RAPOR && MESLEK !== "Din Adamı") {
      // Dilim başına: ortalama depo kademesi, kademe dağılımı, talep/kapasite, "stok yetmedi" ve "müşteri kaybı" yılları.
      for (const [ad, a, b] of dilimler) {
        const yilSayisi = sonuclar.reduce((t, c) => t + c.depoK.slice(a, b).length, 0) || 1;
        const kd = [0, 0, 0, 0, 0];
        for (const c of sonuclar) for (const k of c.depoK.slice(a, b)) kd[k] += 1;
        const oran = ort(sonuclar.map((c) => ort(c.talep.slice(a, b).map((t, i) => t / Math.max(1, c.kap[a + i])))));
        const sb = sonuclar.reduce((t, c) => t + c.stokBitti.slice(a, b).reduce((x, y) => x + y, 0), 0) / yilSayisi;
        const kp = sonuclar.reduce((t, c) => t + c.kayip.slice(a, b).reduce((x, y) => x + y, 0), 0) / yilSayisi;
        console.log(`    [depo ${ad}] kademe dağılımı ${kd.map((n, i) => `K${i}:%${((n / yilSayisi) * 100).toFixed(0)}`).join(" ")} · talep/kapasite ${(oran * 100).toFixed(0)}% · stok yetmedi yılı %${(sb * 100).toFixed(0)} · müşteri kaybı yılı %${(kp * 100).toFixed(0)} · depo bakımı ${ort(sonuclar.map((c) => ort(c.depoM.slice(a, b)))).toFixed(1)}`);
      }
      // Pazar payı kovası → o payda gereken depo kademesi (talep ≤ kapasite) ve fiilen sahip olunan.
      const kova: Record<string, { n: number; talep: number; k: number; gerekli: number }> = {};
      for (const c of sonuclar) for (let i = 0; i < c.pay.length; i++) {
        const key = `%${Math.min(60, Math.floor(c.pay[i] / 5) * 5)}-${Math.min(60, Math.floor(c.pay[i] / 5) * 5) + 5}`;
        const g = depoKapasiteTablosu(cag, MESLEK).findIndex((kk) => kk >= c.talep[i]);
        const o = (kova[key] ??= { n: 0, talep: 0, k: 0, gerekli: 0 });
        o.n++; o.talep += c.talep[i]; o.k += c.depoK[i]; o.gerekli += g < 0 ? 5 : g;
      }
      for (const key of Object.keys(kova).sort((x, y) => parseInt(x.slice(1)) - parseInt(y.slice(1)))) {
        const o = kova[key];
        console.log(`    [pay ${key}] ${o.n} oyuncu-yılı · ort. talep ${(o.talep / o.n).toFixed(0)} birim · gereken depo kademesi ort. K${(o.gerekli / o.n).toFixed(1)} (5 = en büyük depo da yetmez) · fiilen K${(o.k / o.n).toFixed(1)}`);
      }
    }
    const batan = sonuclar.filter((c) => c.batti).length;
    const kaliciIflas = sonuclar.filter((c) => c.kaliciIflas).length;
    const sonPay = sonuclar.map((c) => c.pay[c.pay.length - 1]).sort((a, b) => a - b);
    const sonNegatif = sonuclar.filter((c) => c.sonPara < 0).length;
    const hirs = ort(sonuclar.map((c) => c.hirsizlik));
    if (process.env.SIM_YASLAR) {
      const yaslar = process.env.SIM_YASLAR.split(",").map(Number);
      for (const yas of yaslar) {
        const i = yas - 15;
        const al = (f: (c: Cikti) => number[]) => ort(sonuclar.map((c) => f(c)[i] ?? 0));
        const gelir = al((c) => c.gelir), gider = al((c) => c.gider);
        console.log(`  yaş ${yas}: gelir ${gelir.toFixed(1)} · gider ${gider.toFixed(1)} · net ${(gelir - gider).toFixed(1)} · gelir/gider ${(gelir / Math.max(0.01, gider)).toFixed(2)} · müşteri ${al((c) => c.musteri).toFixed(0)} · pay %${al((c) => c.pay).toFixed(1)} · çalışan ${al((c) => c.calisan).toFixed(1)}`);
      }
      const batanlar = sonuclar.filter((c) => c.batti);
      if (batanlar.length) {
        const yasOrt = ort(batanlar.map((c) => 15 + c.batmaYili));
        const erken = batanlar.filter((c) => c.batmaYili < 12).length;
        const bv = batanlar.map((c) => c.batmaVeri!).filter(Boolean);
        const yz = (f: (v: NonNullable<Cikti["batmaVeri"]>) => boolean) => `%${Math.round((bv.filter(f).length / Math.max(1, bv.length)) * 100)}`;
        console.log(`  batma nedeni (n=${bv.length}): brüt kâr<0 ${yz((v) => v.brut < 0)} · hasar(hırsız/saldırı/sızma) o yıl ${yz((v) => v.hasar)} · stok bitti ${yz((v) => v.stokBitti)} · kredi taşıyor ${yz((v) => v.kredi)} · ort. gelir ${ort(bv.map((v) => v.gelir)).toFixed(0)} / gider ${ort(bv.map((v) => v.gider)).toFixed(0)} · ort. çalışan ${ort(bv.map((v) => v.ekip)).toFixed(1)} · depo K${ort(bv.map((v) => v.depo)).toFixed(1)} · pay %${ort(bv.map((v) => v.pay)).toFixed(0)} · kredi yılı/ömür (tüm oyuncular) ${ort(sonuclar.map((c) => c.krediYili)).toFixed(1)}`);
        console.log(`  batanlar: ort. yaş ${yasOrt.toFixed(0)} · ilk 12 yılda ${erken}/${batanlar.length} · örnekler: ${batanlar.slice(0, 3).map((c) => c.batmaDetay).join(" | ")}`);
      }
    }
    console.log(
      `\n${cag} / ${tarz}  (batan %${Math.round((batan / N) * 100)} · KALICI İFLAS %${Math.round((kaliciIflas / N) * 100)}, ömür sonunda borçlu %${Math.round((sonNegatif / N) * 100)}) · son pay medyan %${sonPay[Math.floor(N / 2)].toFixed(1)} (p10 %${sonPay[Math.floor(N * 0.1)].toFixed(1)}, p90 %${sonPay[Math.floor(N * 0.9)].toFixed(1)}) · hırsızlık/ömür ${hirs.toFixed(1)} · ekstra vergi/ömür ${ort(sonuclar.map((c) => c.ekVergiSayisi)).toFixed(1)}\n  ${satirlar.join("\n  ")}`
    );
  }
}
