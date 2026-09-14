/**
 * Tek seferlik teşhis (kalıcı değil, kullanıldıktan sonra silinecek): yeni
 * (ve karşılaştırma için eski) kariyer yolu sistemlerinin bir ömürde kaç kez
 * tetiklendiğini ölçer — giriş olayı (0 ya da 1 kez olmalı) + dal
 * havuzundan kaç ayrı olay görüldüğü.
 */
import "./_simPrismaStub";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula, stateGetir } from "../src/game/gameEngine";
import { BOLGELER_BY_CAG } from "../src/game/stateManager";
import { Cag } from "../src/types";

const N = Number(process.env.SIM_N ?? 150);
const MAX_TUR_GUARD = 350;

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Secenek {
  basari_sansi: number;
  kilitli: boolean;
}

function secenekSec(secenekler: Secenek[]): number {
  const acikIndexler = secenekler.map((s, i) => i).filter((i) => !secenekler[i].kilitli);
  const havuz = acikIndexler.length > 0 ? acikIndexler : secenekler.map((_, i) => i);
  return havuz[Math.floor(Math.random() * havuz.length)];
}

const KOMBINASYONLAR: { cag: Cag; meslek: string; etiket: string }[] = [
  { cag: "Orta Çağ", meslek: "Asker", etiket: "oc_asker_yol_" },
  { cag: "Orta Çağ", meslek: "Din Adamı", etiket: "oc_din_yol_" },
  { cag: "Orta Çağ", meslek: "Tüccar", etiket: "oc_tuccar_yol_" },
  { cag: "Sanayi Devrimi", meslek: "Asker", etiket: "sd_asker_yol_" },
  { cag: "Sanayi Devrimi", meslek: "Tüccar", etiket: "sd_tuccar_yol_" },
  { cag: "Sanayi Devrimi", meslek: "Din Adamı", etiket: "sd_din_yol_" },
];

const GIRIS_IDLERI = new Set([
  "oc_asker_yol_ilk_emir",
  "oc_din_yol_ilk_sinav",
  "oc_tuccar_yol_ilk_anlasma",
  "sd_asker_yol_ilk_gorev",
  "sd_tuccar_yol_ilk_karar",
  "sd_din_yol_ilk_vaaz",
]);

async function birOmurSimuleEt(cag: Cag, meslek: string): Promise<{ girisSayisi: number; havuzSayisi: number; girenYol: boolean; yas: number }> {
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const state0 = await yeniOyun(cag, bolge, "kasaba");
  await mesleğiAta(state0.id, meslek);
  const id = state0.id;

  let guard = 0;
  let state = await stateGetir(id);
  try {
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;
      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler as unknown as Secenek[]);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        sonuc = await secimUygula(id, Math.random() < 0.5 ? 0 : 1);
      }
      state = await stateGetir(id);
    }
  } catch (err) {
    console.error(`  [HATA] ${cag}/${meslek}: ${(err as Error).message}`);
  }

  const son = await stateGetir(id);
  const gecmis = son.gecmis_olaylar;
  const girisSayisi = gecmis.filter((e) => GIRIS_IDLERI.has(e)).length;
  const havuzSayisi = gecmis.filter(
    (e) => !GIRIS_IDLERI.has(e) && KOMBINASYONLAR.some((k) => e.startsWith(k.etiket))
  ).length;
  const girenYol = son.etiketler.some((e) => e.startsWith("yol:"));
  return { girisSayisi, havuzSayisi, girenYol, yas: son.yas };
}

async function main() {
  for (const { cag, meslek, etiket } of KOMBINASYONLAR) {
    let toplamGiris = 0;
    let toplamHavuz = 0;
    let yolaGirenSayisi = 0;
    let toplamYas = 0;
    let hicGirmeyen = 0;
    const havuzDagilimi: Record<number, number> = {};

    for (let i = 0; i < N; i++) {
      const r = await birOmurSimuleEt(cag, meslek);
      toplamGiris += r.girisSayisi;
      toplamHavuz += r.havuzSayisi;
      toplamYas += r.yas;
      if (r.girenYol) yolaGirenSayisi++;
      else hicGirmeyen++;
      havuzDagilimi[r.havuzSayisi] = (havuzDagilimi[r.havuzSayisi] ?? 0) + 1;
      if (r.girisSayisi > 1) {
        console.warn(`  !! ${cag}/${meslek}: giriş olayı ${r.girisSayisi} kez tetiklendi (beklenen: 0 ya da 1)`);
      }
    }

    console.log(`\n=== ${cag} / ${meslek} (${etiket}*) — ${N} ömür ===`);
    console.log(`  Yola giren (18 yaşına ulaşan) ömür: ${yolaGirenSayisi}/${N} (${((yolaGirenSayisi / N) * 100).toFixed(1)}%)`);
    console.log(`  18 yaşına ulaşamadan ölen: ${hicGirmeyen}/${N}`);
    console.log(`  Giriş olayı ortalama tetiklenme: ${(toplamGiris / N).toFixed(3)} kez/ömür`);
    console.log(
      `  Dal havuzundan ortalama olay: ${(toplamHavuz / N).toFixed(2)} kez/ömür (yola girenler arasında: ${(
        toplamHavuz / Math.max(1, yolaGirenSayisi)
      ).toFixed(2)})`
    );
    console.log(`  Ortalama ölüm yaşı: ${(toplamYas / N).toFixed(1)}`);
    console.log(`  Havuz-olay-sayısı dağılımı: ${JSON.stringify(havuzDagilimi)}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
