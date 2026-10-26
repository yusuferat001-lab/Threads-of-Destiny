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
} from "../src/game/stateManager";
import { isletmeProfiliGetir, yatirimTanimiGetir } from "../src/data/meslekProfilleri";
import { hatSlotSayisi, calisanLimiti, adaylariGerekirseYenile, calisanBonusu, depoKapasitesi } from "../src/game/isletme";
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

function botKarar(s: CharacterState, tarz: Tarz) {
  if (s.isletme && tarz === "pasif") s.isletme.depo_oto = { acik: true, yuzde: 100 }; // pasif: yalnız "Otomatik %100" açar
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
      if (t) krediAl(s, t.id);
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
    const rezerv = (depoKapasitesi(is) * 0.8 + 18) * giderEnflasyonCarpani(s); // önce mal alımı + bir yıllık geçim için nakit ayır
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
    const fiyat = t.fiyatlar[k] * giderEnflasyonCarpani(s);
    if (s.para > (depoKapasitesi(is) * 0.8 + 18) * giderEnflasyonCarpani(s) + fiyat) {
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
  // v20: depo yıl başı otomatik dolar (oyundaki "Otomatik" düğmesi): pasif hep %50; diğerleri geçen yılın talebine bakıp yeterince dolduran en küçük oranı seçer.
  const sonTalep = is.hatlar.filter((h) => h.acik).reduce((t, h) => t + (h.son_talep || 0), 0);
  const kap = depoKapasitesi(is);
  const gerekli = sonTalep > 0 ? ((sonTalep * 1.1) / kap) * 100 : 50;
  const hedef = tarz === "agresif" ? (gerekli <= 50 ? 50 : gerekli <= 75 ? 75 : 100) : 100; // aktif/dengeli/pasif: depo hep dolu
  is.depo_oto = { acik: true, yuzde: hedef };
}

interface Cikti { satis: number[]; alim: number[]; maas: number[]; aidat: number[]; vergi: number[]; depoM: number[]; hasar: number[]; yatirim: number[]; dukkan: number[]; gider: number[]; musteri: number[]; calisan: number[]; batmaYili: number; batmaDetay: string; gelir: number[]; net: number[]; pay: number[]; rakipPay: number[]; para: number[]; batti: boolean; sonPara: number; hirsizlik: number; anaRolKazanc: number; pazar: number[]; enf: number[] }

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
  const c: Cikti = { satis: [], alim: [], maas: [], aidat: [], vergi: [], depoM: [], hasar: [], yatirim: [], dukkan: [], gider: [], musteri: [], calisan: [], batmaYili: -1, batmaDetay: "", gelir: [], net: [], pay: [], rakipPay: [], para: [], batti: false, sonPara: 0, hirsizlik: 0, anaRolKazanc: 0, pazar: [], enf: [] };
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
    s.tur_sayisi += 1;
    const d0 = s.isletme?.son_dokum;
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
    c.rakipPay.push(((s.rakipler.find((r) => !r.yenildi)?.musteri ?? 0) / s.pazar_musteri) * 100);
    c.para.push(s.para);
    if (process.env.SIM_DEBUG2 && y < 8) console.log(y, "para", s.para.toFixed(1), "stok", s.isletme?.hatlar.filter((h) => h.acik).map((h) => h.id + ":" + h.stok).join(","), "satis", s.isletme?.son_dokum?.satis, "alim", s.isletme?.son_dokum?.alim, "net", s.isletme?.son_dokum?.net, "musteri", s.meslek_musteri.toFixed(1));
    if (process.env.SIM_DEBUG && y % 5 === 4) console.log(y, JSON.stringify({satis: s.isletme?.son_dokum?.satis, alim: s.isletme?.son_dokum?.alim, brut: s.isletme?.son_dokum?.brutKar, uretim: s.isletme?.son_dokum?.uretim, hat: s.isletme?.son_dokum?.hatlar, ek: s.ekip.length, up: s.isletme?.son_dokum?.uyarilar.map(u=>u.kod)}));
    c.hirsizlik += s.isletme?.son_dokum?.uyarilar.filter((u) => u.kod === "hirsizlik").length ?? 0;
    if (s.para < -30 && !c.batti) {
      c.batti = true;
      const d = s.isletme?.son_dokum;
      c.batmaYili = y;
      c.batmaDetay = `gelir ${(s.para - onceki + gider).toFixed(1)} gider ${gider.toFixed(1)} ekip ${s.ekip.length} depo${s.isletme?.yatirimlar.depo ?? 0} brut ${d?.brutKar ?? 0} vergi ${d?.vergi ?? 0} uyari ${d?.uyarilar.map((u) => u.kod).join(",")}`;
    }
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
      if (process.env.SIM_DOKUM) console.log(`    [${ad}] satış ${m((c) => c.satis)} − alım ${m((c) => c.alim)} − çalışan ${m((c) => c.maas)} − aidat ${m((c) => c.aidat)} − vergi ${m((c) => c.vergi)} − depo+çürüme ${m((c) => c.depoM)} − hasar ${m((c) => c.hasar)} − yatırım ${m((c) => c.yatirim)} − yaşam+kira ${m((c) => c.gider)}`);
      return `${ad}: pay %${pay.toFixed(1)} · dükkan neti ${dukkan.toFixed(1)} · cebine kalan ${net.toFixed(1)} (yatırım öncesi ${(net + ort(kaynak.map((c) => ort(c.yatirim.slice(a, b))))).toFixed(1)}) · (brüt gelir ${gelir.toFixed(1)}, rakip %${rpay.toFixed(1)}) · toplam pazar ${ort(kaynak.map((c) => ort(c.pazar.slice(a, b)))).toFixed(0)} · müşterin ${ort(kaynak.map((c) => ort(c.musteri.slice(a, b)))).toFixed(0)} · enflasyon ×${ort(kaynak.map((c) => ort(c.enf.slice(a, b)))).toFixed(2)}`;
    });
    const batan = sonuclar.filter((c) => c.batti).length;
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
        console.log(`  batanlar: ort. yaş ${yasOrt.toFixed(0)} · ilk 12 yılda ${erken}/${batanlar.length} · örnekler: ${batanlar.slice(0, 3).map((c) => c.batmaDetay).join(" | ")}`);
      }
    }
    console.log(
      `\n${cag} / ${tarz}  (batan %${Math.round((batan / N) * 100)}, ömür sonunda borçlu %${Math.round((sonNegatif / N) * 100)}) · son pay medyan %${sonPay[Math.floor(N / 2)].toFixed(1)} (p10 %${sonPay[Math.floor(N * 0.1)].toFixed(1)}, p90 %${sonPay[Math.floor(N * 0.9)].toFixed(1)}) · hırsızlık/ömür ${hirs.toFixed(1)}\n  ${satirlar.join("\n  ")}`
    );
  }
}
