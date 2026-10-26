import { describe, it, expect } from "vitest";
import { ogretileriTamamla } from "./_ogreti";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";
import { secimUygulaVeCoz } from "./testUtils";
import { OLAY_BANKASI } from "../src/data/olaylar";
import type { CharacterState } from "../src/types";

function baslikGetir(id: string): string {
  const olay = OLAY_BANKASI.find((o) => o.id === id);
  if (!olay) throw new Error(`${id} OLAY_BANKASI'nda yok`);
  return olay.baslik;
}

/** Yolculuk garantisi dışındaki tüm diğer zorla-tetiklenen olayları (evlilik, evcil hayvan, savaş ilanı, veba, kariyer yolu girişi vb.) devre dışı bırakır. */
function digerGarantileriGecistir(state: CharacterState) {
  state.ulke.savasta = true;
  // Arka planda tetiklenen veba (bkz. stateManager.ts vebaBaslamaliMi) da bir zorlanan
  // olay atayabildiği için, izole edilmiş yolculuk testlerinde onu da devre dışı bırakırız.
  state.veba_gecirdi = true;
  state.gecmis_olaylar.push("iliski_evlilik_teklifi", "iliski_ikinci_teklif");
  state.hayvan_karsilasma_sayisi = 2; // evcil hayvan karşılaşma garantisini (29/38 yaş) atla
  state.etiketler.push("tanisma_donum_25", "tanisma_donum_40"); // aşk evliliği tanışma fırsatı zorlanmasın
  state.evcil_hayvan = { tur: "Kedi", isim: "Testçik" };
  // Her çağ×meslek kombinasyonunda (Asker/Din Adamı/Tüccar) kariyer yolu girişi
  // 18 yaşından itibaren zorla tetiklenir; bu testler sadece yolculuk garantisini
  // izole ettiği için karakter zaten bir yola girmiş gibi işaretlenir. Yol dalı
  // takip garantisi (yolculuk teklifinin hemen ardında) da aynı tag'lere göz
  // atacağı için ilgili dal havuzundan bir olayı zaten "görülmüş" işaretleriz.
  state.etiketler.push("yol:asker:sadik", "yol:din:durust", "yol:tuccar:hayirsever");
  state.gecmis_olaylar.push(
    "oc_asker_yol_ilk_emir",
    "oc_din_yol_ilk_sinav",
    "oc_tuccar_yol_ilk_anlasma",
    "sd_asker_yol_ilk_gorev",
    "sd_tuccar_yol_ilk_karar",
    "sd_din_yol_ilk_vaaz"
  );
}

describe("yolculuk teklifi garantisi (senaryoUret)", () => {
  it("Orta Çağ Fransa'da bir asker, Haçlı Seferi teklifiyle karşılaşır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerGarantileriGecistir(state);
    state.yas = 31;
    const senaryo = await senaryoUret(state.id);
    // Asker zaten orduda olduğu için reddetme seçeneği olmayan kendi seferberlik
    // varyantını görür (bkz. gameEngine.ts uygunYolculukTeklifleri).
    expect(senaryo.olay_basligi).toBe(baslikGetir("oc_hacli_sefer_asker_cagrisi"));
  });

  it("Orta Çağ Selçuklu'da bir asker, Kutsal Toprakları Savunma Seferi teklifiyle karşılaşır", async () => {
    const state = await yeniOyun("Orta Çağ", "Selçuklu", "kasaba");
    await mesleğiAta(state.id, "Asker");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerGarantileriGecistir(state);
    state.yas = 31;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir("yolculuk_savunma_teklif"));
  });

  it("Sanayi Devrimi'nde bir asker, Sömürge Seferi teklifiyle karşılaşır", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "İngiltere", "kasaba");
    await mesleğiAta(state.id, "Asker");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerGarantileriGecistir(state);
    state.yas = 31;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir("sd_somurge_gitme_karari"));
  });

  it("Orta Çağ'da bir tüccar, Coğrafi Keşif teklifiyle karşılaşır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerGarantileriGecistir(state);
    state.yas = 31;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir("yolculuk_kesif_teklif"));
  });

  it("Sanayi Devrimi'nde bir tüccar, Coğrafi Keşif/Mucit Turnesi/Sömürge Seferi tekliflerinden biriyle karşılaşır", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "İngiltere", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerGarantileriGecistir(state);
    state.yas = 31;
    const senaryo = await senaryoUret(state.id);
    const beklenenler = [
      baslikGetir("yolculuk_kesif_teklif"),
      baslikGetir("yolculuk_mucit_teklif"),
      baslikGetir("sd_somurge_gitme_karari"),
    ];
    expect(beklenenler).toContain(senaryo.olay_basligi);
  });

  it.each([
    ["Selçuklu", "Sünni İslam", "hac_sunni_karar"],
    ["Fransa", "Katolik", "hac_katolik_karar"],
  ])("Orta Çağ %s bölgesindeki bir din adamı (%s), kendi Hac teklifiyle karşılaşır", async (bolge, _din, beklenenId) => {
    const state = await yeniOyun("Orta Çağ", bolge, "kasaba");
    await mesleğiAta(state.id, "Din Adamı");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerGarantileriGecistir(state);
    state.yas = 31;
    ogretileriTamamla(state);
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir(beklenenId));
  });

  it("bir yolculuk tamamlandıktan sonra garanti bir daha hiç tetiklenmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerGarantileriGecistir(state);
    state.yas = 31;
    state.etiketler.push("yolculuk_tamamlandi");
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).not.toBe(baslikGetir("yolculuk_kesif_teklif"));
  });

  it("reddedilen teklif birkaç yıl sonra tekrar sorulur", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerGarantileriGecistir(state);
    state.yas = 31;
    const ilkSenaryo = await senaryoUret(state.id);
    expect(ilkSenaryo.olay_basligi).toBe(baslikGetir("yolculuk_kesif_teklif"));
    // Reddet seçeneği (üçüncü şık, index 2).
    const redSonuc = await secimUygulaVeCoz(state.id, 2);
    expect(redSonuc.state.etiketler).toContain("yolculuk_teklifi_edildi");
    expect(redSonuc.state.etiketler).not.toContain("yolculukta");

    // Cooldown mekaniği: reddedince eklenen "durum" birkaç tur sonra
    // "yolculuk_teklifi_zamani" etiketini ekler ve teklif yeniden zorlanır.
    // Tur süresi (1-2 yıl) + durum kalan_yil rastgele olduğu için burada
    // cooldown'un dolduğu anı doğrudan simüle ediyoruz (RNG'ye güvenmeden).
    redSonuc.state.etiketler.push("yolculuk_teklifi_zamani");
    digerGarantileriGecistir(redSonuc.state);
    const tekrarSenaryo = await senaryoUret(state.id);
    expect(tekrarSenaryo.olay_basligi).toBe(baslikGetir("yolculuk_kesif_teklif"));
  });
});

describe("yolculukta iken normal olay havuzu tamamen kilitleniyor", () => {
  it("Coğrafi Keşif'in deniz rotasında sadece o rotaya ait olaylar çıkar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yas = 31;
    etiketEkle(state, ["yolculukta", "yolculuk_tipi:kesif", "yolculuk_yolu:deniz"]);

    const izinVerilenler = new Set([
      "yolculuk_kesif_deniz_1",
      "yolculuk_kesif_deniz_2",
      "yolculuk_kesif_deniz_2b", // pos2 için havuzlaştırılmış alternatif (Faz 3.2)
      "yolculuk_kesif_deniz_3",
      "yolculuk_kesif_deniz_3b", // pos3 için havuzlaştırılmış alternatif (Faz 5)
      "yolculuk_kesif_donus",
    ]);
    for (let i = 0; i < 300; i++) {
      const { olay } = olaySec(state);
      expect(izinVerilenler.has(olay.id)).toBe(true);
      // Kara rotasına ait hiçbir olay hiçbir zaman çıkmamalı.
      expect(olay.id).not.toBe("yolculuk_kesif_kara_1");
      expect(olay.id).not.toBe("yolculuk_kesif_kara_2");
      expect(olay.id).not.toBe("yolculuk_kesif_kara_2b");
      expect(olay.id).not.toBe("yolculuk_kesif_kara_3");
      expect(olay.id).not.toBe("yolculuk_kesif_kara_3b");
    }
  });

  it("Coğrafi Keşif'in kara rotasında sadece o rotaya ait olaylar çıkar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yas = 31;
    etiketEkle(state, ["yolculukta", "yolculuk_tipi:kesif", "yolculuk_yolu:kara"]);

    const izinVerilenler = new Set([
      "yolculuk_kesif_kara_1",
      "yolculuk_kesif_kara_2",
      "yolculuk_kesif_kara_2b", // pos2 için havuzlaştırılmış alternatif (Faz 3.2)
      "yolculuk_kesif_kara_3",
      "yolculuk_kesif_kara_3b", // pos3 için havuzlaştırılmış alternatif (Faz 5)
      "yolculuk_kesif_donus",
    ]);
    for (let i = 0; i < 300; i++) {
      const { olay } = olaySec(state);
      expect(izinVerilenler.has(olay.id)).toBe(true);
      expect(olay.id).not.toBe("yolculuk_kesif_deniz_1");
      expect(olay.id).not.toBe("yolculuk_kesif_deniz_2");
      expect(olay.id).not.toBe("yolculuk_kesif_deniz_2b");
      expect(olay.id).not.toBe("yolculuk_kesif_deniz_3");
      expect(olay.id).not.toBe("yolculuk_kesif_deniz_3b");
    }
  });

  it("yolculukta etiketi varken hiçbir sıradan (yolculukOlayi olmayan) olay çıkmaz", () => {
    const state = createCharacter("Sanayi Devrimi", "İngiltere", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yas = 30;
    etiketEkle(state, ["yolculukta", "yolculuk_tipi:mucit", "yolculuk_yolu:sanayici"]);
    for (let i = 0; i < 300; i++) {
      const { olay } = olaySec(state);
      expect(olay.yolculukOlayi).toBe(true);
    }
  });

  it("yolculukta etiketi yokken hiçbir yolculuk olayı (yolculukOlayi:true) çıkmaz", () => {
    const state = createCharacter("Sanayi Devrimi", "İngiltere", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yas = 30;
    for (let i = 0; i < 300; i++) {
      const { olay } = olaySec(state);
      expect(olay.yolculukOlayi).not.toBe(true);
    }
  });
});

describe("yolculuk zinciri uçtan uca (Coğrafi Keşif, deniz rotası)", () => {
  it("teklif kabul edilince zincir sırayla ilerler ve sonunda yolculuk_tamamlandi ile normal havuz açılır", async () => {
    // pos2 VE pos3 adımları artık havuzlaştırıldı (Faz 3.2 + Faz 5,
    // zorunlu_sonraki_havuzu) — her ikisinde de ya orijinal ya da yeni
    // alternatif olay gelebilir, hepsi geçerli.
    const beklenenSira = [
      new Set(["yolculuk_kesif_deniz_1"]),
      new Set(["yolculuk_kesif_deniz_2", "yolculuk_kesif_deniz_2b"]),
      new Set(["yolculuk_kesif_deniz_3", "yolculuk_kesif_deniz_3b"]),
      new Set(["yolculuk_kesif_donus"]),
    ];

    // Zincir SIRASINI doğruluyoruz; ~5 tur boyunca ANI_OLUM/veba gibi tamamen
    // rastgele bir ölüm zinciri yarıda kesebildiği için (test mekaniği değil),
    // karakter yolda ölürse taze bir denemeyle baştan başlıyoruz.
    for (let deneme = 0; deneme < 8; deneme++) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
      await mesleğiAta(state.id, "Tüccar");
      etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
      digerGarantileriGecistir(state);
      state.yas = 31;
      state.para = 500;

      const teklif = await senaryoUret(state.id);
      expect(teklif.olay_basligi).toBe(baslikGetir("yolculuk_kesif_teklif"));
      let sonuc = await secimUygulaVeCoz(state.id, 0); // deniz yoluyla kabul et
      expect(sonuc.state.etiketler).toContain("yolculukta");
      expect(sonuc.state.etiketler).toContain("yolculuk_yolu:deniz");

      let oldu = false;
      for (const beklenenIdler of beklenenSira) {
        sonuc.state.saglik = 100;
        sonuc.state.para = 500;
        const senaryo = await senaryoUret(state.id);
        const beklenenBasliklar = [...beklenenIdler].map(baslikGetir);
        expect(beklenenBasliklar).toContain(senaryo.olay_basligi);
        let acikIdx = -1;
        let enIyiSans = -1;
        senaryo.secenekler.forEach((s, i) => {
          if (s.kilitli) return;
          if (s.basari_sansi > enIyiSans) {
            enIyiSans = s.basari_sansi;
            acikIdx = i;
          }
        });
        sonuc = await secimUygulaVeCoz(state.id, acikIdx >= 0 ? acikIdx : 0);
        if (!sonuc.state.aktif) {
          oldu = true;
          break;
        }
      }
      if (oldu) continue;

      expect(sonuc.state.etiketler).toContain("yolculuk_tamamlandi");
      expect(sonuc.state.etiketler).not.toContain("yolculukta");
      return; // başarılı tam tur
    }
    throw new Error("8 denemede de karakter zincir bitmeden öldü — beklenmedik.");
  });
});
