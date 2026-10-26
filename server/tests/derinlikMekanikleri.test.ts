import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, durumlariUygula } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";

function olayBul(state: ReturnType<typeof createCharacter>, baslik: string, maxDeneme: number) {
  for (let i = 0; i < maxDeneme; i++) {
    const { senaryo } = olaySec(state);
    if (senaryo.olay_basligi === baslik) return senaryo;
  }
  return null;
}

/** Belirli bir olay id'sini zorla üretir — RNG'ye bağlı olayBul(...,N) yerine deterministik. */
function olayZorla(state: ReturnType<typeof createCharacter>, id: string) {
  return olaySec(state, id).senaryo;
}

describe("fiziksel kalıcılık (option-level restricted_tags)", () => {
  it("kalici:tek_kolu_yok etiketi olan asker için ön safa geçme seçeneği kilitlenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Asker");
    state.etiketler.push("kalici:tek_kolu_yok");

    const senaryo = olayBul(state, "Sıra Dövüşü", 1500);
    expect(senaryo).not.toBeNull();
    const onSaf = senaryo!.secenekler.find((s) => s.metin.includes("Ön safa geç"));
    expect(onSaf?.kilitli).toBe(true);
  });

  it("sağlıklı asker için ön safa geçme seçeneği açıktır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Asker");

    const senaryo = olayBul(state, "Sıra Dövüşü", 1500);
    expect(senaryo).not.toBeNull();
    const onSaf = senaryo!.secenekler.find((s) => s.metin.includes("Ön safa geç"));
    expect(onSaf?.kilitli).toBe(false);
  });
});

describe("kan davası (gecikmeli tetikleyici zincir)", () => {
  it("kan_davasi_beklemede durumu bitince kandavasi:zamani etiketi eklenir ve suikast olayı erişilebilir olur", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.durumlar.push({
      id: "kan_davasi_beklemede",
      ad: "Kan Davası — Beklemede",
      tur: "gecici",
      kalan_tur: 1,
      bitince_etiket: "kandavasi:zamani",
    });

    durumlariUygula(state);
    expect(state.etiketler.includes("kandavasi:zamani")).toBe(true);

    const senaryo = olayBul(state, "Gecenin Karanlığından", 1500);
    expect(senaryo).not.toBeNull();
  });

  it("kandavasi:zamani etiketi yokken suikast olayı hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    for (let i = 0; i < 400; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Gecenin Karanlığından");
    }
  });
});

describe("gizli örgüt (üyeye özel görev)", () => {
  it("örgüte davet edilmiş ama hiçbir örgüte katılmamış karakter için o görev seçeneği kilitlenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Asker");
    // derinlik_orgut_gizli_gorev artık orgut_secildi gerektirir (bkz. derinlik_gizli_orgut_daveti);
    // hiç davet edilmemiş biri için bu olay artık hiç çıkmaz, bu yüzden davet çözülmüş
    // ama örgüte katılmamış (reddetmiş) bir karakteri simüle ediyoruz.
    state.etiketler.push("orgut_secildi");

    // Bu olay (derinlik_orgut_gizli_gorev) ağırlığı bilinçli olarak düşük (0.4);
    // diğer maxDeneme=500 çağrılarından daha yüksek bir üst sınır gerekiyor ki
    // nadiren de olsa flaky olmasın.
    const senaryo = olayBul(state, "Kardeşlikten Bir Görev", 3000);
    expect(senaryo).not.toBeNull();
    const gorev = senaryo!.secenekler.find((s) => s.metin.includes("Tapınak Şövalyeleri görevini"));
    expect(gorev?.kilitli).toBe(true);
  });

  it("Tapınak Şövalyeleri üyesi için o görev seçeneği açıktır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Asker");
    state.etiketler.push("orgut_secildi", "orgut:Tapınak Şövalyeleri");

    const senaryo = olayBul(state, "Kardeşlikten Bir Görev", 3000);
    expect(senaryo).not.toBeNull();
    const gorev = senaryo!.secenekler.find((s) => s.metin.includes("Tapınak Şövalyeleri görevini"));
    expect(gorev?.kilitli).toBe(false);
  });
});

describe("tıbbi bağışıklık (immunity)", () => {
  it("veba bağışıklığı olmayan din adamı için özgür yardım seçeneği kilitlenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Din Adamı");
    state.ulke.vebada = true;

    const senaryo = olayZorla(state, "derinlik_veba_salgini_ikinci_dalga");
    const secenek = senaryo.secenekler.find((s) => s.metin.includes("Bağışıklığına güvenip"));
    expect(secenek?.kilitli).toBe(true);
  });

  it("veba bağışıklığı olan din adamı için özgür yardım seçeneği açıktır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Din Adamı");
    state.ulke.vebada = true;
    state.etiketler.push("tibbi:veba_bagisik");

    const senaryo = olayZorla(state, "derinlik_veba_salgini_ikinci_dalga");
    const secenek = senaryo.secenekler.find((s) => s.metin.includes("Bağışıklığına güvenip"));
    expect(secenek?.kilitli).toBe(false);
  });
});

describe("ünvan sistemi (uçtan uca)", () => {
  it("büyük bir başarı unvan_kazan ile state.unvanlar'a ekleniyor", async () => {
    let bulundu = false;
    let kalanButce = 10000;
    while (!bulundu && kalanButce > 0) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
      state.yas = 25;
      state.para = 500;
      state.saglik = 100;
      state.tur_sayisi = 10; // olgun bir kariyer bağlamı (rütbe reformu sonrası eşikler kariyer_puani'ne bağlı, §14)
      await mesleğiAta(state.id, "Tüccar");

      while (!bulundu && kalanButce > 0 && state.aktif) {
        kalanButce--;
        if (state.saglik < 60) state.saglik = 90;
        if (state.para < 200) state.para = 500;
        if (state.tur_sayisi < 10) state.tur_sayisi = 10;
        if (state.rutbe_seviye < 2) state.rutbe_seviye = 2; // olay minRutbeSeviye:2 ister; rütbe pazar payına bağlı ve rastgele yürüyüşte yavaş büyür
        let senaryo;
        try {
          senaryo = await senaryoUret(state.id);
        } catch {
          break; // rastgele yürüyüş nadiren havuzu boşaltan bir duruma düşebilir — bu denemeyi bırak, yeniden başla
        }
        if (senaryo.olay_basligi === "Uzak Diyarların İpeği") {
          bulundu = true;
          const sonuc = await secimUygula(state.id, 0); // "Tüm sermayeni ipeğe yatır."
          if (!("ara_tepki" in sonuc) && sonuc.basarili) {
            expect(state.unvanlar).toContain("İpek Kralı");
          }
          break;
        }
        const acikSecenekler = senaryo.secenekler.map((s, i2) => ({ s, i2 })).filter(({ s }) => !s.kilitli);
        const idx = acikSecenekler.length > 0 ? acikSecenekler[Math.floor(Math.random() * acikSecenekler.length)].i2 : 0;
        const cevap = await secimUygula(state.id, idx);
        if ("ara_tepki" in cevap) await secimUygula(state.id, 0);
      }
    }
    expect(bulundu).toBe(true);
  }, 100000);
});

describe("bağımlılık ve durum_sil (kurtulma)", () => {
  it("gerekliEtiketler:bagimlilik:var ile kurtulma olayı erişilebilir olur, durum_sil pasif etkiyi kaldırır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.etiketler.push("bagimlilik:kumarbaz", "bagimlilik:var");
    state.durumlar.push({ id: "kumar_bagimliligi", ad: "Kumar Bağımlılığı", tur: "kalici", tur_basi_para: -3 });

    const senaryo = olayBul(state, "Bir Uyanış Anı", 1500);
    expect(senaryo).not.toBeNull();
  });

  it("bagimlilik:var etiketi yokken kurtulma olayı hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    for (let i = 0; i < 400; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Bir Uyanış Anı");
    }
  });
});
