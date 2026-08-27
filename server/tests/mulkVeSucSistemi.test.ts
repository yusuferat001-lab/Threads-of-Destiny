import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  mulkGelirleriUygula,
  mulkGetiriOraniHesapla,
  sucSeviyesiUygula,
  piyasaDedikodulariUret,
} from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, mulkConfigGetir, mulkSatinAl, zarAt, zarKademeleriGetir, dedikoduGetir } from "../src/game/gameEngine";
import { OLAY_BANKASI } from "../src/data/olaylar";
import type { CharacterState } from "../src/types";

function taze(): CharacterState {
  const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
  mesleğiSec(state, "Tüccar");
  state.para = 1000;
  return state;
}

describe("mülk getiri hesabı — dünya durumuna göre", () => {
  it("çiftlik: iyi ekonomide avantajlı, kıtlıkta zarar", () => {
    const iyi = taze();
    iyi.ulke.ekonomi = "iyi";
    const oranIyi = mulkGetiriOraniHesapla("ciftlik", iyi.ulke);
    expect(oranIyi).toBeGreaterThan(0.2);

    const kitlik = taze();
    kitlik.ulke.kriz = { tur: "kitlik", bitisYili: 9999 };
    const oranKitlik = mulkGetiriOraniHesapla("ciftlik", kitlik.ulke);
    expect(oranKitlik).toBeLessThan(0);
  });

  it("han: nüfus artışı ve barışta avantajlı, vebada/savaşta ağır zarar", () => {
    const avantajli = taze();
    avantajli.ulke.nufusDurumu = "artiyor";
    const oranAvantajli = mulkGetiriOraniHesapla("han", avantajli.ulke);
    expect(oranAvantajli).toBeGreaterThan(0.2);

    const veba = taze();
    veba.ulke.vebada = true;
    const oranVeba = mulkGetiriOraniHesapla("han", veba.ulke);
    expect(oranVeba).toBeLessThan(-0.15);
  });

  it("demirci: savaşta getirisi normalin en az 2 katı", () => {
    const barisState = taze();
    const oranBaris = mulkGetiriOraniHesapla("demirci", barisState.ulke);

    const savasState = taze();
    savasState.ulke.savasta = true;
    const oranSavas = mulkGetiriOraniHesapla("demirci", savasState.ulke);

    expect(oranSavas).toBeGreaterThan(oranBaris * 2);
  });

  it("karaborsa: kıtlık/veba/savaşta avantajlı, barışta zayıf/negatif", () => {
    const savasState = taze();
    savasState.ulke.savasta = true;
    const oranSavas = mulkGetiriOraniHesapla("karaborsa", savasState.ulke);
    expect(oranSavas).toBeGreaterThan(0.2);

    const barisState = taze();
    const oranBaris = mulkGetiriOraniHesapla("karaborsa", barisState.ulke);
    expect(oranBaris).toBeLessThanOrEqual(0);
  });

  it("karaborsa sahipliği her yıl suç seviyesini artırır ve ahlakı aşındırır", () => {
    const state = taze();
    state.mulkler = ["karaborsa"];
    const oncekiSuc = state.suc_seviyesi;
    const oncekiAhlak = state.ahlak;
    mulkGelirleriUygula(state, 3);
    expect(state.suc_seviyesi).toBeGreaterThan(oncekiSuc);
    expect(state.ahlak).toBeLessThan(oncekiAhlak);
  });

  it("kervan savaş sürerken bir ihtimalle tamamen kaybolabilir (çok sayıda denemede en az bir kez)", () => {
    let kayipGorundu = false;
    for (let i = 0; i < 200 && !kayipGorundu; i++) {
      const state = taze();
      state.mulkler = ["kervan"];
      state.ulke.savasta = true;
      const sonuc = mulkGelirleriUygula(state, 5);
      if (sonuc.kervanBatti) {
        kayipGorundu = true;
        expect(state.mulkler).not.toContain("kervan");
      }
    }
    expect(kayipGorundu).toBe(true);
  });

  it("mülk yoksa hiçbir para/suç değişimi olmaz", () => {
    const state = taze();
    const oncekiPara = state.para;
    const oncekiSuc = state.suc_seviyesi;
    mulkGelirleriUygula(state, 2);
    expect(state.para).toBe(oncekiPara);
    expect(state.suc_seviyesi).toBe(oncekiSuc);
  });
});

describe("suç seviyesi pasif azalma", () => {
  it("zamanla doğal olarak azalır, taban 0'ın altına inmez", () => {
    const state = taze();
    state.suc_seviyesi = 10;
    sucSeviyesiUygula(state, 3);
    expect(state.suc_seviyesi).toBeLessThan(10);
    expect(state.suc_seviyesi).toBeGreaterThanOrEqual(0);

    state.suc_seviyesi = 1;
    sucSeviyesiUygula(state, 10);
    expect(state.suc_seviyesi).toBe(0);
  });
});

describe("piyasa dedikoduları", () => {
  it("yaklaşan bir savaş penceresi varsa gerçek bir uyarı içerir", () => {
    const state = taze();
    state.bolge = "Fransa";
    state.cag = "Orta Çağ";
    state.yil = 1155; // Fransa'nın 1159-1189 savaş penceresine 4 yıl kala
    state.ulke.savasta = false;
    // Üç dedikodu varyantından hangisi seçilirse seçilsin rakip ismi mutlaka geçer
    // (bazı varyantlar "savaş" kelimesini içermez, bu yüzden onu değil rakibi kontrol ediyoruz).
    const dedikodular = piyasaDedikodulariUret(state);
    expect(dedikodular.some((d) => d.includes("İngiltere Krallığı"))).toBe(true);
  });

  it("hiçbir özel durum yokken en az bir sakin dedikodu döner", () => {
    const state = taze();
    state.yil = 1053; // hiçbir savaş penceresine yakın değil
    const dedikodular = piyasaDedikodulariUret(state);
    expect(dedikodular.length).toBeGreaterThan(0);
  });
});

describe("gameEngine entegrasyonu — mülk/zar/dedikodu aksiyonları", () => {
  it("mulkSatinAl: yeterli parayla satın alınabilir, ikinci kez alınamaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 500;

    const sonuc = await mulkSatinAl(state.id, "ciftlik");
    expect(sonuc.state.mulkler).toContain("ciftlik");
    expect(sonuc.state.para).toBeLessThan(500);

    await expect(mulkSatinAl(state.id, "ciftlik")).rejects.toThrow();
  });

  it("mulkSatinAl: yetersiz parada hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 0;
    await expect(mulkSatinAl(state.id, "kervan")).rejects.toThrow();
  });

  it("mulkConfigGetir: 5 mülkün tamamını, güncel maliyet/getiri ile döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    const config = await mulkConfigGetir(state.id);
    expect(config).toHaveLength(5);
    expect(config.map((m) => m.tur).sort()).toEqual(["ciftlik", "demirci", "han", "karaborsa", "kervan"]);
    for (const mulk of config) {
      expect(mulk.maliyet).toBeGreaterThan(0);
      expect(mulk.sahipMi).toBe(false);
    }
  });

  it("zarAt: geçersiz tutarda hata fırlatır, geçerli tutarda suç seviyesini artırır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 500;

    await expect(zarAt(state.id, 7)).rejects.toThrow();

    const kademeler = await zarKademeleriGetir(state.id);
    const oncekiSuc = state.suc_seviyesi;
    const sonuc = await zarAt(state.id, kademeler[0]);
    expect(sonuc.state.suc_seviyesi).toBeGreaterThan(oncekiSuc);
    expect(typeof sonuc.kazandi).toBe("boolean");
  });

  it("dedikoduGetir: en az bir dedikodu satırı döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    const dedikodular = await dedikoduGetir(state.id);
    expect(dedikodular.length).toBeGreaterThan(0);
  });
});

describe("yeni hapis giriş noktaları (minSucSeviyesi)", () => {
  it("hapis_zar_masasi_baskini ve hapis_karaborsa_baskini OLAY_BANKASI'nda doğru eşiklerle tanımlı", () => {
    const zarBaskini = OLAY_BANKASI.find((o) => o.id === "hapis_zar_masasi_baskini");
    expect(zarBaskini).toBeDefined();
    expect(zarBaskini!.minSucSeviyesi).toBe(45);

    const karaborsaBaskini = OLAY_BANKASI.find((o) => o.id === "hapis_karaborsa_baskini");
    expect(karaborsaBaskini).toBeDefined();
    expect(karaborsaBaskini!.minSucSeviyesi).toBe(70);
    expect(karaborsaBaskini!.secenekler.some((s) => s.basariliSonuc.mulk_kaybet === "karaborsa")).toBe(true);
  });
});
