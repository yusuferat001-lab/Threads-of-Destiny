import "./_simPrismaStub";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula, stateGetir } from "../src/game/gameEngine";
import { OLAY_BANKASI } from "../src/data/olaylar";

interface Secenek {
  basari_sansi: number;
  kilitli: boolean;
}
function secenekSec(secenekler: Secenek[]): number {
  const acikIndexler = secenekler.map((s, i) => i).filter((i) => !secenekler[i].kilitli);
  const havuz = acikIndexler.length > 0 ? acikIndexler : secenekler.map((_, i) => i);
  return havuz[Math.floor(Math.random() * havuz.length)];
}

async function main() {
  for (let deneme = 0; deneme < 3; deneme++) {
    console.log(`\n########## DENEME ${deneme + 1} ##########`);
    const state0 = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state0.id, "Asker");
    const id = state0.id;
    let guard = 0;
    let state = await stateGetir(id);
    while (state.aktif && guard < 350) {
      guard++;
      const senaryo = await senaryoUret(id);
      const yolTag = state.etiketler.find((e) => e.startsWith("yol:"));
      const oncekiUzunluk = state.gecmis_olaylar.length;
      const idx = secenekSec(senaryo.secenekler as unknown as Secenek[]);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        sonuc = await secimUygula(id, Math.random() < 0.5 ? 0 : 1);
      }
      state = await stateGetir(id);
      const yeniOlaylar = state.gecmis_olaylar.slice(oncekiUzunluk);
      if (yolTag) {
        const tumDalHavuzu = OLAY_BANKASI.filter((o) => o.gerekliEtiketler?.includes(yolTag) && o.cag === state.cag);
        const gorulen = tumDalHavuzu.filter((o) => state.gecmis_olaylar.includes(o.id)).length;
        console.log(`yas=${state.yas} secilenOlaylar=${JSON.stringify(yeniOlaylar)} yolTag=${yolTag} gorulen=${gorulen}/${tumDalHavuzu.length}`);
      } else {
        console.log(`yas=${state.yas} secilenOlaylar=${JSON.stringify(yeniOlaylar)} (henuz yol yok)`);
      }
    }
    console.log(`SON: yas=${state.yas}, aktif=${state.aktif}, olum=${state.olum_nedeni}`);
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
