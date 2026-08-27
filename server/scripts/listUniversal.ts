import { OLAY_BANKASI, OlayTanimi } from "../src/data/olaylar";

function gecerliMi(deger: unknown): boolean {
  return deger !== undefined && deger !== null;
}

function tamamenEvrenselMi(o: OlayTanimi): boolean {
  return !(
    gecerliMi(o.cag) ||
    gecerliMi(o.bolgeler) ||
    gecerliMi(o.meslekler) ||
    gecerliMi(o.minYas) ||
    gecerliMi(o.maxYas) ||
    gecerliMi(o.minAhlak) ||
    gecerliMi(o.maxAhlak) ||
    gecerliMi(o.minUn) ||
    gecerliMi(o.maxUn) ||
    gecerliMi(o.minMutluluk) ||
    gecerliMi(o.maxMutluluk) ||
    gecerliMi(o.minRakipPuani) ||
    gecerliMi(o.maxRakipPuani) ||
    gecerliMi(o.gerekliEtiketler) ||
    gecerliMi(o.yasakliEtiketler) ||
    gecerliMi(o.gerekliUlke) ||
    gecerliMi(o.gerekliKisilik) ||
    gecerliMi(o.gerekliDin) ||
    gecerliMi(o.minRutbeSeviye) ||
    gecerliMi(o.gerekliEkip) ||
    gecerliMi(o.gerekliEkipRolu) ||
    gecerliMi(o.gerekliHizip) ||
    o.hapisOlayi === true
  );
}

const evrensel = OLAY_BANKASI.filter(tamamenEvrenselMi);
console.log(`Toplam evrensel: ${evrensel.length}\n`);
for (const o of evrensel) {
  console.log(`${o.id}\tagirlik=${o.agirlik ?? 1}\tton=${o.ton ?? "-"}\tkategori=${o.kategori}\tbaslik="${o.baslik}"`);
}
