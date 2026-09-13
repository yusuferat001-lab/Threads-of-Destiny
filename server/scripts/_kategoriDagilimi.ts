/**
 * Bir ömürde tür/kategori (genel, yolculuk, hapis, hizip, aile, vs.) bazında
 * kaç olay görüldüğünü ölçer — gerçek gameEngine.ts (senaryoUret/secimUygula,
 * zorlanan-olay kaskadı dahil) ile oynanan tam ömürlerden.
 */
import "./_simPrismaStub";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula, stateGetir } from "../src/game/gameEngine";
import { MESLEKLER, BOLGELER_BY_CAG } from "../src/game/stateManager";

import { OLAY_HAPIS } from "../src/data/olaylar/hapis";
import { OLAY_YOLCULUK } from "../src/data/olaylar/yolculuk";
import { OLAY_HIZIP } from "../src/data/olaylar/hizip";
import { OLAY_ORTACAG_ASKER } from "../src/data/olaylar/ortaCagAsker";
import { OLAY_ORTACAG_ASKER_YOLLARI } from "../src/data/olaylar/ortaCagAskerYollari";
import { OLAY_ORTACAG_TUCCAR } from "../src/data/olaylar/ortaCagTuccar";
import { OLAY_ORTACAG_DINADAMI } from "../src/data/olaylar/ortaCagDinAdami";
import { OLAY_ORTACAG_DINADAMI_YOLLARI } from "../src/data/olaylar/ortaCagDinAdamiYollari";
import { OLAY_SANAYI_ASKER } from "../src/data/olaylar/sanayiAsker";
import { OLAY_SANAYI_TUCCAR } from "../src/data/olaylar/sanayiTuccar";
import { OLAY_SANAYI_DINADAMI } from "../src/data/olaylar/sanayiDinAdami";
import { OLAY_EVCIL_HAYVAN } from "../src/data/olaylar/evcilHayvan";
import { OLAY_ESYA_VE_GIZEM } from "../src/data/olaylar/esyaVeGizem";
import { OLAY_AILE } from "../src/data/olaylar/aile";
import { OLAY_ILISKILER } from "../src/data/olaylar/iliskiler";
import { OLAY_GENEL } from "../src/data/olaylar/genel";
import { OLAY_SAGLIK_TOPARLANMA } from "../src/data/olaylar/saglikToparlanma";
import { OLAY_EVLILIK_AILE } from "../src/data/olaylar/evlilikVeAile";
import { OLAY_ARANMA_SEVIYESI } from "../src/data/olaylar/aranmaSeviyesi";
import { OLAY_SOSYALLESME } from "../src/data/olaylar/sosyallesme";
import { OLAY_KURESEL } from "../src/data/olaylar/kureselOlaylar";
import { OLAY_VEBA_HASTALIGI } from "../src/data/olaylar/vebaHastaligi";
import { OLAY_KOMIK_OLUM } from "../src/data/olaylar/komikOlumler";
import { OLAY_MULK } from "../src/data/olaylar/mulkOlaylari";
import { OLAY_BUYULU } from "../src/data/olaylar/buyuluOlaylar";
import { Cag } from "../src/types";

const KAYNAKLAR: [string, { id: string }[]][] = [
  ["hapis", OLAY_HAPIS],
  ["yolculuk", OLAY_YOLCULUK],
  ["hizip", OLAY_HIZIP],
  ["ortaCagAsker", OLAY_ORTACAG_ASKER],
  ["ortaCagAskerYollari", OLAY_ORTACAG_ASKER_YOLLARI],
  ["ortaCagTuccar", OLAY_ORTACAG_TUCCAR],
  ["ortaCagDinAdami", OLAY_ORTACAG_DINADAMI],
  ["ortaCagDinAdamiYollari", OLAY_ORTACAG_DINADAMI_YOLLARI],
  ["sanayiAsker", OLAY_SANAYI_ASKER],
  ["sanayiTuccar", OLAY_SANAYI_TUCCAR],
  ["sanayiDinAdami", OLAY_SANAYI_DINADAMI],
  ["evcilHayvan", OLAY_EVCIL_HAYVAN],
  ["esyaVeGizem", OLAY_ESYA_VE_GIZEM],
  ["aile", OLAY_AILE],
  ["iliskiler", OLAY_ILISKILER],
  ["genel", OLAY_GENEL],
  ["saglikToparlanma", OLAY_SAGLIK_TOPARLANMA],
  ["evlilikVeAile", OLAY_EVLILIK_AILE],
  ["aranmaSeviyesi", OLAY_ARANMA_SEVIYESI],
  ["sosyallesme", OLAY_SOSYALLESME],
  ["kureselOlaylar", OLAY_KURESEL],
  ["vebaHastaligi", OLAY_VEBA_HASTALIGI],
  ["komikOlumler", OLAY_KOMIK_OLUM],
  ["mulkOlaylari", OLAY_MULK],
  ["buyuluOlaylar", OLAY_BUYULU],
];

const ID_TO_DOSYA = new Map<string, string>();
for (const [dosya, liste] of KAYNAKLAR) {
  for (const o of liste) ID_TO_DOSYA.set(o.id, dosya);
}

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const N = Number(process.env.SIM_N ?? 200);
const MAX_TUR_GUARD = 400;

async function birOmurOyna(): Promise<Record<string, number>> {
  const cag: Cag = Math.random() < 0.5 ? "Orta Çağ" : "Sanayi Devrimi";
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const meslek = rastgele(MESLEKLER);
  const s0 = await yeniOyun(cag, bolge, "kasaba");
  const id = s0.id;
  await mesleğiAta(id, meslek);

  let guard = 0;
  while (guard++ < MAX_TUR_GUARD) {
    let state = await stateGetir(id);
    if (!state.aktif) break;
    try {
      await senaryoUret(id);
    } catch {
      break;
    }
    state = await stateGetir(id);
    if (!state.aktif) break;
    // rastgele bir seçenek dene, kilitliyse 0'dan başlayarak ilk açığı bul (basit yaklaşım: birkaç index dene)
    let uygulandi = false;
    for (const idx of [0, 1, 2, 3]) {
      try {
        await secimUygula(id, idx);
        uygulandi = true;
        break;
      } catch {
        continue;
      }
    }
    if (!uygulandi) break;
    // onTepki ara-ekranı olabilir: bir kez daha dene (geri çekil = 0)
    state = await stateGetir(id);
  }

  const son = await stateGetir(id);
  const sayim: Record<string, number> = {};
  for (const olayId of son.gecmis_olaylar) {
    const dosya = ID_TO_DOSYA.get(olayId) ?? "diger/bilinmeyen";
    sayim[dosya] = (sayim[dosya] ?? 0) + 1;
  }
  sayim["__toplam__"] = son.gecmis_olaylar.length;
  sayim["__yas__"] = son.yas;
  return sayim;
}

async function main() {
  const toplam: Record<string, number> = {};
  let toplamOmur = 0;
  for (let i = 0; i < N; i++) {
    const sonuc = await birOmurOyna();
    toplamOmur++;
    for (const k in sonuc) toplam[k] = (toplam[k] ?? 0) + sonuc[k];
    if ((i + 1) % 20 === 0) console.error(`${i + 1}/${N}`);
  }

  console.log(`\n=== ${toplamOmur} ömür simüle edildi ===`);
  console.log(`Ortalama toplam olay/ömür: ${(toplam["__toplam__"] / toplamOmur).toFixed(2)}`);
  console.log(`Ortalama ölüm yaşı: ${(toplam["__yas__"] / toplamOmur).toFixed(2)}`);
  console.log("\nDosya/kategori bazında ortalama olay sayısı (bir ömürde):");
  const satirlar = Object.keys(toplam)
    .filter((k) => !k.startsWith("__"))
    .map((k) => [k, toplam[k] / toplamOmur] as const)
    .sort((a, b) => b[1] - a[1]);
  for (const [k, v] of satirlar) console.log(`  ${k.padEnd(24)} ${v.toFixed(2)}`);
}

main().then(() => process.exit(0));
