import { describe, it, expect, vi, afterEach } from "vitest";
import { createCharacter, mesleğiSec, maasKirilimHesapla, hesaplaMaasYillik } from "../src/game/stateManager";
import {
  aranmaYillikIsle,
  gizliSucKaydet,
  gonulluKefaretOde,
  gonulluKefaretTutarlari,
  gonulluTeslimOl,
  kefaretKatsayisi,
  kefaretTutari,
  polisUyarisiniYanitla,
  aranmaBildirimiKapat,
  aranmaDurumuUret,
} from "../src/game/aranmaSistemi";
import {
  yildizSayisi,
  meslekDebuffOrani,
  sucBasariBonusu,
  sucRiskCarpani,
  hapisCezaSuresiAraligi,
  teslimCezasi,
  HAPIS_CEZA_ARALIKLARI,
} from "../src/data/aranmaSabitleri";
import { hapisCezaSuresiHesapla } from "../src/game/gameEngine";
import type { CharacterState } from "../src/types";

function taze(): CharacterState {
  const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(state, "Tüccar");
  state.para = 5000;
  return state;
}

afterEach(() => vi.restoreAllMocks());

describe("yıldız tablosu", () => {
  it("3 yıldız: 25 / 50 / 75", () => {
    expect([0, 24, 25, 49, 50, 74, 75, 100].map(yildizSayisi)).toEqual([0, 0, 1, 1, 2, 2, 3, 3]);
  });

  it("suç başarı bonusu +0/+7/+14/+25, risk %0/%10/%20/%30 daha az", () => {
    expect([0, 30, 60, 80].map(sucBasariBonusu)).toEqual([0, 7, 14, 25]);
    expect([0, 30, 60, 80].map(sucRiskCarpani)).toEqual([1, 0.9, 0.8, 0.7]);
  });

  it("mesleki debuff yıldızla artar (geçici değerler)", () => {
    expect(meslekDebuffOrani(10)).toBe(0);
    expect(meslekDebuffOrani(30)).toBeCloseTo(0.055);
    expect(meslekDebuffOrani(60)).toBeCloseTo(0.1);
    expect(meslekDebuffOrani(90)).toBeCloseTo(0.15);
  });

  it("maaşa 'Aranma gölgesi' kalemi biner", () => {
    const temiz = taze();
    const aranan = taze();
    aranan.suc_seviyesi = 80;
    expect(hesaplaMaasYillik(aranan)).toBeLessThan(hesaplaMaasYillik(temiz));
    const kalem = maasKirilimHesapla(aranan).donemselKalemler.find((k) => k.ad === "Aranma gölgesi");
    expect(kalem?.yuzde).toBe(-15);
  });
});

describe("hapis süreleri", () => {
  it("bantlar 3-4 / 7-9 / 9-11 / 12-14 yıl", () => {
    expect(HAPIS_CEZA_ARALIKLARI).toEqual([[3, 4], [7, 9], [9, 11], [12, 14]]);
    const beklenen: [number, [number, number]][] = [[0, [3, 4]], [24, [3, 4]], [25, [7, 9]], [50, [9, 11]], [75, [12, 14]], [100, [12, 14]]];
    for (const [puan, [min, max]] of beklenen) {
      expect(hapisCezaSuresiAraligi(puan)).toEqual([min, max]);
      for (let i = 0; i < 30; i++) {
        const c = hapisCezaSuresiHesapla(puan);
        expect(c).toBeGreaterThanOrEqual(min);
        expect(c).toBeLessThanOrEqual(max);
      }
    }
  });

  it("gönüllü teslim cezası %25 kısa, yuvarlanır, en az 1", () => {
    expect(teslimCezasi(8)).toBe(6);
    expect(teslimCezasi(13)).toBe(10);
    expect(teslimCezasi(1)).toBe(1);
  });

  it("gonulluTeslimOl: hapis etiketi + indirimli ceza; temizken reddeder", () => {
    const s = taze();
    s.suc_seviyesi = 10;
    expect(() => gonulluTeslimOl(s, () => 8)).toThrow();
    s.suc_seviyesi = 40;
    const ceza = gonulluTeslimOl(s, () => 8);
    expect(ceza).toBe(6);
    expect(s.etiketler).toContain("hapiste");
    expect(s.hapis_ceza_kalan).toBe(6);
    expect(s.hapis_ceza_toplam).toBe(6);
  });
});

describe("kefaret", () => {
  it("katsayı [3.3, 3.7] ve aynı puan için sabit (gösterilen = tahsil edilen)", () => {
    const s = taze();
    for (let p = 5; p <= 95; p += 10) {
      const k = kefaretKatsayisi(s, p);
      expect(k).toBeGreaterThanOrEqual(3.3);
      expect(k).toBeLessThanOrEqual(3.7);
      expect(kefaretKatsayisi(s, p)).toBe(k);
    }
  });

  it("kefaret = puan × katsayı × gider enflasyonu; gönüllü %20 indirimli, yarım = tamın yarısı", () => {
    const s = taze();
    s.suc_seviyesi = 40;
    const tam = kefaretTutari(s);
    expect(tam).toBeGreaterThanOrEqual(Math.round(40 * 3.3 * 0.99));
    const g = gonulluKefaretTutarlari(s);
    expect(g.tam).toBe(Math.round(tam * 0.8));
    expect(g.yarim).toBe(Math.round(g.tam / 2));
  });

  it("tam ödeme puanı 0, yarım ödeme (30 üstü) puanı yarıya indirir; para düşer", () => {
    const s = taze();
    s.suc_seviyesi = 60;
    const { yarim, tam } = gonulluKefaretTutarlari(s);
    const para0 = s.para;
    gonulluKefaretOde(s, true);
    expect(s.suc_seviyesi).toBe(30);
    expect(s.para).toBe(para0 - yarim);
    const t = gonulluKefaretTutarlari(s).tam;
    gonulluKefaretOde(s, false);
    expect(s.suc_seviyesi).toBe(0);
    expect(t).toBeLessThan(tam);
  });

  it("30 ve altında yarım ödeme yok; para yetmezse reddeder", () => {
    const s = taze();
    s.suc_seviyesi = 30;
    expect(() => gonulluKefaretOde(s, true)).toThrow();
    s.para = 0;
    expect(() => gonulluKefaretOde(s, false)).toThrow();
  });
});

describe("gizli suç / ifşa", () => {
  it("ifşa olasılığı sınıfa göre: küçük %25, orta %35, büyük %55; 4-10 yıl sonrası", () => {
    const oran = (sinif: "kucuk" | "orta" | "buyuk") => {
      let n = 0;
      const N = 4000;
      for (let i = 0; i < N; i++) {
        const s = taze();
        if (gizliSucKaydet(s, sinif, "x")) {
          n++;
          const gecikme = s.ifsa_kuyrugu[0].yil - s.yil;
          expect(gecikme).toBeGreaterThanOrEqual(4);
          expect(gecikme).toBeLessThanOrEqual(10);
        }
      }
      return n / N;
    };
    expect(oran("kucuk")).toBeGreaterThan(0.2);
    expect(oran("kucuk")).toBeLessThan(0.3);
    expect(oran("orta")).toBeGreaterThan(0.3);
    expect(oran("orta")).toBeLessThan(0.4);
    expect(oran("buyuk")).toBeGreaterThan(0.5);
    expect(oran("buyuk")).toBeLessThan(0.6);
  });

  it("vadesi gelen ifşa aranma+ahlak düşürür ve bildirim üretir; sonra kuyruk boşalır", () => {
    const s = taze();
    s.suc_seviyesi = 0;
    s.ahlak = 50;
    s.ifsa_kuyrugu.push({ yil: s.yil, sinif: "orta", baslik: "Sahte Mal" });
    aranmaYillikIsle(s, () => 5);
    expect(s.suc_seviyesi).toBeGreaterThanOrEqual(10);
    expect(s.suc_seviyesi).toBeLessThanOrEqual(16);
    expect(s.ahlak).toBe(46);
    expect(s.ifsa_kuyrugu).toHaveLength(0);
    expect(s.aranma_bildirimleri[0]).toMatchObject({ tur: "ifsa", baslik: "Sahte Mal" });
  });
});

describe("polis uyarısı (60 üstü)", () => {
  it("60'ı geçince 2-3 yıl sonra uyarı gelir; tam ödeme puanı sıfırlar", () => {
    const s = taze();
    s.suc_seviyesi = 65;
    aranmaYillikIsle(s, () => 5);
    expect(s.polis_uyari_yili).not.toBeNull();
    const gecikme = (s.polis_uyari_yili as number) - s.yil;
    expect(gecikme).toBeGreaterThanOrEqual(2);
    expect(gecikme).toBeLessThanOrEqual(3);
    s.yil = s.polis_uyari_yili as number;
    aranmaYillikIsle(s, () => 5);
    const b = s.aranma_bildirimleri.find((x) => x.tur === "polis_uyari");
    expect(b).toBeDefined();
    expect(b?.yarimTutar).toBe(Math.round((b?.tutar ?? 0) / 2));
    expect(s.son_polis_uyari_yili).toBe(s.yil);
    const para0 = s.para;
    polisUyarisiniYanitla(s, b!.id, "tam");
    expect(s.suc_seviyesi).toBe(0);
    expect(s.para).toBe(para0 - (b?.tutar ?? 0));
  });

  it("yarım ödeme puanı yarıya indirir; ödememe +6…9 aranma ekler", () => {
    const s = taze();
    s.suc_seviyesi = 70;
    s.aranma_bildirimleri.push({ id: "u1", tur: "polis_uyari", yil: s.yil, tutar: 200, yarimTutar: 100 });
    polisUyarisiniYanitla(s, "u1", "yarim");
    expect(s.suc_seviyesi).toBe(35);

    s.suc_seviyesi = 70;
    s.aranma_bildirimleri.push({ id: "u2", tur: "polis_uyari", yil: s.yil, tutar: 200, yarimTutar: 100 });
    const { aranmaArtis } = polisUyarisiniYanitla(s, "u2", "hayir");
    expect(aranmaArtis).toBeGreaterThanOrEqual(6);
    expect(aranmaArtis).toBeLessThanOrEqual(9);
    expect(s.suc_seviyesi).toBe(70 + aranmaArtis);
  });

  it("10 yıl cooldown; 60 altına inip tekrar geçince yeniden tetiklenir", () => {
    const s = taze();
    s.son_polis_uyari_yili = s.yil - 5;
    s.suc_seviyesi = 65;
    aranmaYillikIsle(s, () => 5);
    expect(s.polis_uyari_yili).toBeNull(); // cooldown: planlanmadı

    s.suc_seviyesi = 40; // altına indi
    aranmaYillikIsle(s, () => 5);
    s.yil += 6; // cooldown doldu
    s.suc_seviyesi = 65; // yeniden geçti
    aranmaYillikIsle(s, () => 5);
    expect(s.polis_uyari_yili).not.toBeNull();
  });

  it("60'ın altına inen karakterde bekleyen uyarı iptal olur; bildirim yanıtlanmadan kapatılamaz", () => {
    const s = taze();
    s.suc_seviyesi = 65;
    aranmaYillikIsle(s, () => 5);
    s.suc_seviyesi = 20;
    aranmaYillikIsle(s, () => 5);
    expect(s.polis_uyari_yili).toBeNull();

    s.aranma_bildirimleri.push({ id: "u3", tur: "polis_uyari", yil: s.yil, tutar: 1, yarimTutar: 1 });
    expect(() => aranmaBildirimiKapat(s, "u3")).toThrow();
  });
});

describe("3★ baskın (75+)", () => {
  it("75'i geçince 4-5 yıl sonrası için kurulur; kefaretle 75 altına inince iptal olur", () => {
    const s = taze();
    s.suc_seviyesi = 80;
    aranmaYillikIsle(s, () => 12);
    const gecikme = (s.baskin_yili as number) - s.yil;
    expect(gecikme).toBeGreaterThanOrEqual(4);
    expect(gecikme).toBeLessThanOrEqual(5);
    gonulluKefaretOde(s, true);
    expect(s.suc_seviyesi).toBe(40);
    expect(s.baskin_yili).toBeNull();
  });

  it("baskında %20 kaçış (kaçak etiketi, puan 30), aksi halde hapis", () => {
    const calistir = (rastgele: number) => {
      const s = taze();
      s.suc_seviyesi = 85;
      s.baskin_yili = s.yil;
      s.aranma_esik75_ustu = true;
      vi.spyOn(Math, "random").mockReturnValue(rastgele);
      aranmaYillikIsle(s, () => 13);
      vi.restoreAllMocks();
      return s;
    };
    const kacti = calistir(0.1);
    expect(kacti.etiketler).toContain("kacak");
    expect(kacti.suc_seviyesi).toBe(30);
    expect(kacti.aranma_bildirimleri.at(-1)).toMatchObject({ tur: "baskin", kacti: true });

    const yakalandi = calistir(0.9);
    expect(yakalandi.etiketler).toContain("hapiste");
    expect(yakalandi.hapis_ceza_kalan).toBe(13);
    expect(yakalandi.aranma_bildirimleri.at(-1)).toMatchObject({ tur: "baskin", kacti: false, ceza: 13 });
  });

  it("hapisteyken baskın ertelenir (vadesi gelmiş kalır)", () => {
    const s = taze();
    s.suc_seviyesi = 85;
    s.baskin_yili = s.yil;
    s.aranma_esik75_ustu = true;
    s.etiketler.push("hapiste");
    aranmaYillikIsle(s, () => 13);
    expect(s.baskin_yili).toBe(s.yil);
  });
});

describe("Aranma ekranı verisi", () => {
  it("yıldız, tutarlar ve teslim cezası tahmini döner", () => {
    const s = taze();
    s.suc_seviyesi = 60;
    const d = aranmaDurumuUret(s, () => 10);
    expect(d.yildiz).toBe(2);
    expect(d.basariBonusu).toBe(14);
    expect(d.yarimMumkun).toBe(true);
    expect(d.tamTutar).toBeGreaterThan(0);
    expect(d.teslimCezasi).toBe(8);
    s.suc_seviyesi = 10;
    expect(aranmaDurumuUret(s, () => 10).teslimCezasi).toBeNull();
  });
});
