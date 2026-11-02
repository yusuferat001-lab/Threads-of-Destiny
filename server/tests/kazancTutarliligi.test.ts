import { describe, it, expect } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  stateGetir,
  finansGetir,
  isletmeDurumGetir,
  mulkSatinAl,
} from "../src/game/gameEngine";
import { ogretileriTamamla } from "./_ogreti";

async function oyun(meslek: string) {
  const s0 = await yeniOyun("Orta Çağ", "Fransa", "kasaba", undefined, "tr", undefined, "ilerle");
  await mesleğiAta(s0.id, meslek);
  const s = await stateGetir(s0.id);
  ogretileriTamamla(s);
  s.urun_secim_bekliyor = false;
  s.para = 2000;
  return s;
}

describe("kazanç her panelde aynı sayı", () => {
  for (const meslek of ["Tüccar", "Zanaatkâr", "Din Adamı"]) {
    it(`${meslek}: finans özeti, işletme bütçesi (mülk ve kredi dahil) ile birebir aynı kazancı verir`, async () => {
      const s = await oyun(meslek);
      await mulkSatinAl(s.id, "kucuk_tarla");
      s.kredi = { anapara: 50, kalanBorc: 50, faizOrani: 8, yillikTaksit: 9, vadeYil: 7, alindigiYil: s.yil, odenmeyenTaksit: 0, pazarlikYapildi: false } as never;
      const finans = await finansGetir(s.id);
      const d = await isletmeDurumGetir(s.id);
      expect(d.butce.gayrimenkul).toBe(finans.gayrimenkulYillikGelir);
      expect(d.butce.cebineKalan).toBeCloseTo(finans.netYillik + finans.gayrimenkulYillikGelir, 1);
    });
  }
});
