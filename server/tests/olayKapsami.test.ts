import { describe, it, expect } from "vitest";
import {
  kapsamMatrisiHesapla,
  kilitliHavuzlariHesapla,
  KAPSAM_YAS_BANTLARI,
} from "../src/game/olayKapsami";

/**
 * "Az olay var" şikayeti için Faz 1 (Yol E) guardrail'i — bkz. kullanıcıyla
 * konuşulan çözüm planı. Bir gelecekteki değişiklik (yeni bir dar filtre,
 * yanlışlıkla yolculukOlayi/hapisOlayi kilidine giren bir olay grubu vb.)
 * erişilebilir havuzu sessizce daraltırsa bu test kırılır — kapsama
 * matrisini elle takip etmek yerine burada sayısal bir taban tutulur.
 */
describe("olay kapsama matrisi (§12 uygunMu üst sınırı)", () => {
  it("her çağ×bölge×meslek×yaş kombinasyonunda nötr statlarla en az 100 farklı olay erişilebilir", () => {
    const satirlar = kapsamMatrisiHesapla();
    expect(satirlar.length).toBe(
      2 /* çağ */ * 4 /* bölge/çağ */ * 4 /* meslek (2026-09: Zanaatkâr eklendi) */ * KAPSAM_YAS_BANTLARI.length
    );
    const enDusuk = Math.min(...satirlar.map((s) => s.sayi));
    expect(enDusuk).toBeGreaterThanOrEqual(100);
  });

  it("havuz-kilit alt sistemleri (hapis/kaçak/veba/yolculuk) tamamen boş kalmaz", () => {
    const satirlar = kilitliHavuzlariHesapla();
    for (const s of satirlar) {
      expect(s.sayi, `${s.etiket} havuzu boş`).toBeGreaterThan(0);
    }
  });
});
