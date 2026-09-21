import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  sosyallesmeYerleriGetir,
  sosyallesmeYerineGit,
  sosyallesmeAksiyonConfigGetir,
  sosyallesmeAksiyonYap,
  sosyallesmeOlayCoz,
} from "../src/game/gameEngine";
import { OLAY_SOSYALLESME } from "../src/data/olaylar/sosyallesme";
import { SOSYALLESME_YERLERI } from "../src/data/sosyallesmeYerleri";

describe("sosyalleşme olay bankası — veri bütünlüğü", () => {
  it("en az 70 olay içerir (görev gereksinimi)", () => {
    expect(OLAY_SOSYALLESME.length).toBeGreaterThanOrEqual(70);
  });

  it("tüm id'ler benzersizdir", () => {
    const idler = OLAY_SOSYALLESME.map((o) => o.id);
    expect(new Set(idler).size).toBe(idler.length);
  });

  it("her olay gerçek bir mekân id'sine referans verir", () => {
    const gecerliYerler = new Set(SOSYALLESME_YERLERI.map((y) => y.id));
    for (const olay of OLAY_SOSYALLESME) {
      expect(gecerliYerler.has(olay.sosyallesmeYeri!)).toBe(true);
    }
  });

  it("her mekânın en az bir olayı vardır", () => {
    for (const yer of SOSYALLESME_YERLERI) {
      const sayisi = OLAY_SOSYALLESME.filter((o) => o.sosyallesmeYeri === yer.id).length;
      expect(sayisi).toBeGreaterThan(0);
    }
  });

  it("ayılma (telafi) olayı sadece ayyaş etiketi taşıyanlara açılır", () => {
    const olay = OLAY_SOSYALLESME.find((o) => o.id === "sosyal_meyhane_ayilma");
    expect(olay?.gerekliEtiketler).toContain("bagimlilik:ayyas");
  });
});

describe("sosyalleşme olayları normal havuzdan tamamen dışlanır", () => {
  it("olaySec (zorlanmadan) hiçbir zaman bir sosyalleşme olayı döndürmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yas = 30;
    const sosyallesmeIdleri = new Set(OLAY_SOSYALLESME.map((o) => o.id));
    for (let i = 0; i < 2000; i++) {
      const { olay } = olaySec(state, undefined, null);
      expect(sosyallesmeIdleri.has(olay.id)).toBe(false);
    }
  });
});

describe("sosyalleşme yerleri — çağ/bölge/meslek filtreleme", () => {
  it("Sanayi Devrimi İngiltere'de bir Tüccar pub, pazar meydanı ve lonca meclisini görür — en fazla 3 mekân", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "İngiltere", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25; // pub gibi alkollü mekânların olayları minYas:18 gerektirir
    const idler = (await sosyallesmeYerleriGetir(state.id)).map((y) => y.id);
    expect(idler).toContain("pub");
    expect(idler).toContain("pazar_meydani");
    expect(idler).toContain("lonca_meclisi");
    expect(idler).not.toContain("ordugah_cadiri");
    expect(idler).not.toContain("meyhane"); // meyhane bölge listesinde İngiltere yok (pub onun yerini alıyor)
    expect(idler.length).toBeLessThanOrEqual(3); // "az ve öz": aynı anda en fazla 3 slot
  });

  it("bir Asker sadece kendi mesleğine özel ordugah_cadiri'nı görür, dini_meclis/lonca_meclisi'ni görmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.yas = 25; // ordugah_cadiri olayları minYas:18 gerektirir
    const idler = (await sosyallesmeYerleriGetir(state.id)).map((y) => y.id);
    expect(idler).toContain("ordugah_cadiri");
    expect(idler).not.toContain("dini_meclis");
    expect(idler).not.toContain("lonca_meclisi");
  });

  it("Osmanlı Sanayi Devrimi'nde bir Din Adamı pazar meydanı, meyhane ve cemaat sofrasını görür", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "Osmanlı", "kasaba");
    await mesleğiAta(state.id, "Din Adamı");
    state.yas = 25; // meyhane gibi alkollü mekânların olayları minYas:18 gerektirir
    const idler = (await sosyallesmeYerleriGetir(state.id)).map((y) => y.id);
    expect(idler).toContain("pazar_meydani");
    expect(idler).toContain("dini_meclis");
    expect(idler).toContain("meyhane"); // Osmanlı artık meyhane bölge listesinde
    expect(idler).not.toContain("pub"); // pub yalnız İngiltere
    expect(idler).not.toContain("lonca_meclisi");
  });

  it("hapisteyken ya da yolculuktayken hiçbir mekân listelenmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.etiketler.push("hapiste");
    expect(await sosyallesmeYerleriGetir(state.id)).toHaveLength(0);

    state.etiketler = state.etiketler.filter((e) => e !== "hapiste");
    state.etiketler.push("yolculukta");
    expect(await sosyallesmeYerleriGetir(state.id)).toHaveLength(0);
  });
});

describe("sosyallesmeYerineGit — mekâna gitmek", () => {
  it("geçerli bir mekâna gitmek, bir sonraki senaryoyu o mekânın havuzundan getirir ve turu tüketmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 20;
    const turSayisiOncesi = state.tur_sayisi;

    await sosyallesmeYerineGit(state.id, "meyhane");
    const senaryo = await senaryoUret(state.id);

    const meyhaneBasliklari = new Set(
      OLAY_SOSYALLESME.filter((o) => o.sosyallesmeYeri === "meyhane").map((o) => o.baslik)
    );
    expect(meyhaneBasliklari.has(senaryo.olay_basligi)).toBe(true);
    expect(state.tur_sayisi).toBe(turSayisiOncesi); // gitmenin kendisi turu tüketmez
  });

  it("sosyallesmeOlayCoz mekân olayını TUR HARCAMADAN çözer + mekânı ~2 yıl kilitler", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25;
    state.para = 2000;
    const turOnce = state.tur_sayisi;
    const yasOnce = state.yas;

    await sosyallesmeYerineGit(state.id, "meyhane");
    await senaryoUret(state.id);
    const sonuc = await sosyallesmeOlayCoz(state.id, 0);

    expect(sonuc.state.tur_sayisi).toBe(turOnce); // tur harcanmadı
    expect(sonuc.state.yas).toBe(yasOnce); // zaman ilerlemedi
    // Aynı mekâna tekrar gitmek artık kilitli
    await expect(sosyallesmeYerineGit(state.id, "meyhane")).rejects.toThrow();
    const yerler = await sosyallesmeYerleriGetir(state.id);
    expect(yerler.find((y) => y.id === "meyhane")?.kilitli).toBe(true);
    // Başka bir mekân hâlâ açık
    expect(yerler.find((y) => y.id === "pazar_meydani")?.kilitli).toBe(false);
  });

  it("aynı turda farklı mekânlar ayrı ayrı çözülebilir (max 3 olay/tur)", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.yas = 25;
    state.para = 2000;
    const yasOnce = state.yas;

    for (const yerId of ["pazar_meydani", "meyhane", "ordugah_cadiri"]) {
      await sosyallesmeYerineGit(state.id, yerId);
      await senaryoUret(state.id);
      await sosyallesmeOlayCoz(state.id, 0);
      state.para = 2000;
      state.saglik = 100;
    }
    expect(state.yas).toBe(yasOnce); // üç mekân olayı da zaman ilerletmedi
  }, 20000);

  it("uygun olmayan bir mekâna (mesleğe göre) gitmeye çalışmak hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    await expect(sosyallesmeYerineGit(state.id, "ordugah_cadiri")).rejects.toThrow();
  });

  it("hapisteyken bir mekâna gitmeye çalışmak hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.etiketler.push("hapiste");
    await expect(sosyallesmeYerineGit(state.id, "meyhane")).rejects.toThrow();
  });
});

describe("ayyaşlık mekaniği (3 alkollü ziyaret eşiği)", () => {
  /** Senaryodaki en güvenli (en yüksek başarı şansına sahip) seçeneği seçer; meyhane olaylarında ölüm riski taşıyan seçenekler her zaman daha düşük şanslıdır. */
  function enGuvenliSecenekIndex(secenekler: { basari_sansi: number }[]): number {
    let enIyi = 0;
    for (let i = 1; i < secenekler.length; i++) {
      if (secenekler[i].basari_sansi > secenekler[enIyi].basari_sansi) enIyi = i;
    }
    return enIyi;
  }

  it("aynı alkollü mekâna üç kez gidip olay yaşamak kalıcı ayyaş damgası vurur", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25;
    state.para = 2000;
    state.saglik = 100;

    expect(state.etiketler.includes("bagimlilik:ayyas")).toBe(false);

    let sonGuncelState = state;
    for (let i = 0; i < 3; i++) {
      state.yil += 3; // mekân cooldown'unu (2 yıl) elle geç — sosyallesmeOlayCoz zamanı ilerletmez
      await sosyallesmeYerineGit(state.id, "meyhane");
      const senaryo = await senaryoUret(state.id);
      const index = enGuvenliSecenekIndex(senaryo.secenekler);
      const sonuc = await sosyallesmeOlayCoz(state.id, index);
      sonGuncelState = sonuc.state;
      sonGuncelState.para = 2000;
      sonGuncelState.saglik = 100;
    }

    expect(sonGuncelState.alkol_ziyaret_sayisi).toBeGreaterThanOrEqual(3);
    expect(sonGuncelState.etiketler).toContain("bagimlilik:ayyas");
    expect(sonGuncelState.etiketler).toContain("bagimlilik:var");
    expect(sonGuncelState.durumlar.some((d) => d.id === "ayyaslik")).toBe(true);
  }, 20000);

  it("alkolsüz bir mekâna gitmek alkol ziyaret sayacını artırmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25;
    state.para = 2000;

    await sosyallesmeYerineGit(state.id, "pazar_meydani");
    await senaryoUret(state.id);
    const sonuc = await sosyallesmeOlayCoz(state.id, 0);

    expect(sonuc.state.alkol_ziyaret_sayisi).toBe(0);
    expect(sonuc.state.etiketler.includes("bagimlilik:ayyas")).toBe(false);
  });
});

describe("sosyalleşme ekranı — tur harcamayan aksiyonlar (içki / deli / sadaka / kulak / ısmarla / fal)", () => {
  it("config bölge/çağa uygun isimli içecekler + 5 aksiyon döner", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "Rusya", "kasaba");
    await mesleğiAta(state.id, "Asker");
    const cfg = await sosyallesmeAksiyonConfigGetir(state.id);
    expect(cfg.icecekler.map((i) => i.id)).toContain("icki:votka");
    expect(cfg.aksiyonlar.map((a) => a.id).sort()).toEqual(["deli", "fal", "ismarla", "kulak", "sadaka"]);
    expect(cfg.alkolluMekanVar).toBe(true); // Asker → ordugâh çadırı alkollü
  });

  it("alkollü içki içmek mutluluğu artırır, sağlığı düşürür, parayı azaltır ve turu tüketmez", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "Rusya", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.para = 500;
    state.saglik = 90;
    state.mutluluk = 50;
    const turOnce = state.tur_sayisi;
    const parOnce = state.para;
    const sonuc = await sosyallesmeAksiyonYap(state.id, "icki:votka");
    expect(sonuc.state.mutluluk).toBeGreaterThan(50);
    expect(sonuc.state.saglik).toBeLessThan(90);
    expect(sonuc.state.para).toBeLessThan(parOnce);
    expect(sonuc.state.tur_sayisi).toBe(turOnce);
  });

  it("aynı aksiyon cooldown dolmadan tekrar yapılamaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 500;
    await sosyallesmeAksiyonYap(state.id, "fal");
    await expect(sosyallesmeAksiyonYap(state.id, "fal")).rejects.toThrow();
  });

  it("İslam bölgesinde 'gizli' içki ahlak ve şöhret cezası uygular", async () => {
    const state = await yeniOyun("Orta Çağ", "Selçuklu", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.para = 500;
    state.ahlak = 60;
    state.un = 40;
    const sonuc = await sosyallesmeAksiyonYap(state.id, "icki:gizli_sarap");
    expect(sonuc.state.ahlak).toBeLessThan(60);
    expect(sonuc.state.un).toBeLessThan(40);
  });

  it("sadaka ahlakı artırır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Din Adamı");
    state.para = 500;
    state.ahlak = 50;
    const sonuc = await sosyallesmeAksiyonYap(state.id, "sadaka");
    expect(sonuc.state.ahlak).toBeGreaterThanOrEqual(53);
  });

  it("hapisteyken aksiyon yapılamaz ve config boş döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.etiketler.push("hapiste");
    const cfg = await sosyallesmeAksiyonConfigGetir(state.id);
    expect(cfg.icecekler).toHaveLength(0);
    expect(cfg.aksiyonlar).toHaveLength(0);
    await expect(sosyallesmeAksiyonYap(state.id, "kulak")).rejects.toThrow();
  });
});
