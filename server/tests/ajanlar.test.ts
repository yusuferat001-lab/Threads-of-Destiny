import { describe, it, expect } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  stateGetir,
  kotuIsYap,
  kotuIsConfigGetir,
  ajanTut,
  ajanDurumGetir,
  ajanGorevleriniCoz,
  ekipCikar,
} from "../src/game/gameEngine";

async function tuccarAjanli(rol = "Hırsız") {
  const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(st.id, "Asker");
  const s = await stateGetir(st.id);
  s.para = 500;
  await ajanTut(st.id, rol);
  const ajan = s.ekip.find((e) => e.rol === rol)!;
  return { s, ajan };
}

describe("ajanlar (§43 Faz 2)", () => {
  it("ajan tutmak peşin ücret alır, ekibe ekler; aynı rolden ikinci kez tutulamaz", async () => {
    const { s, ajan } = await tuccarAjanli("Hırsız");
    expect(ajan).toBeDefined();
    expect(s.para).toBeLessThan(500);
    await expect(ajanTut(s.id, "Hırsız")).rejects.toThrow(/Zaten/);
    const d = await ajanDurumGetir(s.id);
    expect(d.roller.find((r) => r.rol === "Hırsız")?.sahip).toBe(true);
    expect(d.roller.find((r) => r.rol === "Hırsız")?.isler).toContain("birini_soy");
  });

  it("ajana verilen iş hemen çözülmez, ajan meşgul olur ve iş bekleme süresine girer", async () => {
    const { s, ajan } = await tuccarAjanli("Hırsız");
    const sonuc = await kotuIsYap(s.id, "birini_soy", { ajanId: ajan.id });
    expect(sonuc.beklemede).toBe(true);
    expect(s.ajan_gorevleri).toHaveLength(1);
    expect((await ajanDurumGetir(s.id)).gorevler[ajan.id]).toBe("birini_soy");
    expect((await kotuIsConfigGetir(s.id)).find((k) => k.id === "birini_soy")?.kalanYil).toBeGreaterThan(0);
    s.kotu_is_kilit = {};
    await expect(kotuIsYap(s.id, "birini_soy", { ajanId: ajan.id })).rejects.toThrow(/zaten/);
  });

  it("yanlış roldeki ajana iş verilemez; sadece-ajan işi kendin çeviremezsin", async () => {
    const { s, ajan } = await tuccarAjanli("Hırsız");
    await expect(kotuIsYap(s.id, "rakibi_korkut", { ajanId: ajan.id })).rejects.toThrow();
    await expect(kotuIsYap(s.id, "suikast_ettir")).rejects.toThrow(/Suikastçı/);
  });

  it("görev yıl dönerken çözülür: başarıda sağlık bedeli oyuncuya yansımaz, kuyruk boşalır", async () => {
    let basariGoruldu = false;
    let yakalanmaGoruldu = false;
    for (let i = 0; i < 40 && !(basariGoruldu && yakalanmaGoruldu); i++) {
      const { s, ajan } = await tuccarAjanli("Hırsız");
      ajan.sadakat = 100; // ihbar etmesin
      await kotuIsYap(s.id, "birini_soy", { ajanId: ajan.id });
      const saglik = s.saglik;
      const mesajlar = ajanGorevleriniCoz(s);
      expect(mesajlar).toHaveLength(1);
      expect(s.ajan_gorevleri).toHaveLength(0);
      expect(s.saglik).toBe(saglik);
      if (/işini gördü/.test(mesajlar[0])) basariGoruldu = true;
      if (!s.ekip.some((e) => e.id === ajan.id)) yakalanmaGoruldu = true;
      expect(s.etiketler).not.toContain("hapiste"); // sadık ajan ele vermez
    }
    expect(basariGoruldu).toBe(true);
    expect(yakalanmaGoruldu).toBe(true);
  });

  it("suikastçı başarılı olursa rakip saf dışı kalır", async () => {
    let yenildi = false;
    for (let i = 0; i < 40 && !yenildi; i++) {
      const { s, ajan } = await tuccarAjanli("Suikastçı");
      ajan.gercekKalite = 100;
      await kotuIsYap(s.id, "suikast_ettir", { ajanId: ajan.id, hedefRakipAd: s.rakipler[0].ad });
      ajanGorevleriniCoz(s);
      yenildi = s.rakipler.some((r) => r.yenildi);
    }
    expect(yenildi).toBe(true);
  });

  it("kovulan ajanın bekleyen görevi iptal olur", async () => {
    const { s, ajan } = await tuccarAjanli("Hırsız");
    await kotuIsYap(s.id, "birini_soy", { ajanId: ajan.id });
    await ekipCikar(s.id, ajan.id);
    expect(s.ajan_gorevleri).toHaveLength(0);
  });
});
