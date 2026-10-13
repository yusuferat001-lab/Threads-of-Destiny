/**
 * Dünya dönemleri simülasyonu (Faz A): gerçek `donemIlerlet` + savaş + veba
 * fonksiyonlarını yıl yıl çalıştırıp bir ömürde (varsayılan 60 yıl, 18 yaşından
 * başlayarak) kaç dönem/savaş/veba görüldüğünü ve kuralların bozulup
 * bozulmadığını ölçer. Tarihi (sabit tarihli) savaş ilanları dahil değildir.
 *
 *   npx tsx scripts/simulateDunyaDonemleri.ts      (env: SIM_N, SIM_YIL)
 */
import "./_simPrismaStub";
import {
  createCharacter,
  donemIlerlet,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslamaliMi,
  vebaBaslat,
  vebaBitisKontrolEt,
} from "../src/game/stateManager";
import type { Cag, DonemTuru } from "../src/types";

const N = Number(process.env.SIM_N ?? 2000);
const YIL = Number(process.env.SIM_YIL ?? 60);

interface Sayac {
  bolluk: number;
  durgunluk: number;
  kitlik: number;
  savas: number;
  veba: number;
  savasYili: number;
  vebaYili: number;
  ihlalArdisik: number;
  ihlalBollukSavas: number;
  ihlalCakisma: number;
}

function tekOmur(cag: Cag): Sayac {
  const s = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  s.yas = 18;
  const c: Sayac = { bolluk: 0, durgunluk: 0, kitlik: 0, savas: 0, veba: 0, savasYili: 0, vebaYili: 0, ihlalArdisik: 0, ihlalBollukSavas: 0, ihlalCakisma: 0 };
  let onceki = s.ulke.donem!;
  c[onceki.tur as DonemTuru]++;
  for (let y = 0; y < YIL; y++) {
    s.yil += 1;
    s.yas += 1;
    donemIlerlet(s, 1);
    const d = s.ulke.donem!;
    if (d !== onceki) {
      if (d.tur === onceki.tur) c.ihlalArdisik++;
      c[d.tur]++;
      onceki = d;
    }
    buyukSavasBitisKontrolEt(s);
    const savasOncesi = s.ulke.savasta;
    buyukSavasKontrolEt(s, 1);
    if (!savasOncesi && s.ulke.savasta) c.savas++;
    vebaBitisKontrolEt(s);
    if (vebaBaslamaliMi(s, 1)) {
      vebaBaslat(s, 1);
      s.ulke.vebada = true;
      c.veba++;
    }
    if (s.ulke.savasta) c.savasYili++;
    if (s.ulke.vebada) c.vebaYili++;
    if (s.ulke.savasta && s.ulke.donem!.tur === "bolluk") c.ihlalBollukSavas++;
    if (s.ulke.savasta && s.ulke.vebada) c.ihlalCakisma++;
  }
  return c;
}

for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as Cag[]) {
  const toplam: Sayac = { bolluk: 0, durgunluk: 0, kitlik: 0, savas: 0, veba: 0, savasYili: 0, vebaYili: 0, ihlalArdisik: 0, ihlalBollukSavas: 0, ihlalCakisma: 0 };
  let vebasiz = 0;
  for (let i = 0; i < N; i++) {
    const c = tekOmur(cag);
    for (const k of Object.keys(toplam) as (keyof Sayac)[]) toplam[k] += c[k];
    if (c.veba === 0) vebasiz++;
  }
  const ort = (k: keyof Sayac) => (toplam[k] / N).toFixed(2);
  console.log(`\n=== ${cag} — ${N} ömür × ${YIL} yıl ===`);
  console.log(`Dönem sayısı (ömür başına): bolluk ${ort("bolluk")} · durgunluk ${ort("durgunluk")} · kıtlık ${ort("kitlik")}`);
  console.log(`Savaş: ${ort("savas")} kez, ${ort("savasYili")} yıl · Veba: ${ort("veba")} kez, ${ort("vebaYili")} yıl · vebasız ömür %${Math.round((vebasiz / N) * 100)}`);
  console.log(`İhlaller (hepsi 0 olmalı): arka arkaya aynı dönem ${toplam.ihlalArdisik} · bollukta savaş ${toplam.ihlalBollukSavas} · savaş+veba ${toplam.ihlalCakisma}`);
}
