import { describe, it, expect } from "vitest";
import { OLAY_BANKASI } from "../src/data/olaylar";
import type { SonucEtkisi } from "../src/types";

/**
 * Büyük denge turu — M maddesi guardrail'i. Kullanıcı: "her seçimde moral yükseliyo
 * saçmalık; olayların geneli düşürsün bir kısmı arttırsın." Bu test, tüm olay
 * bankasındaki `mutluluk` deltalarının toplam eğilimini ölçüp bir daha
 * pozitife kaymasını engeller. Değerler `scripts/` codemod'u + elle ayarla tutturulur;
 * bilinçli bir denge değişikliğinde eşikleri buradan güncelle.
 */

function* tumSonuclar(): Generator<{ sonuc: SonucEtkisi; basari: boolean }> {
  for (const olay of OLAY_BANKASI) {
    // Komik ölümler kasıtlı olarak "hafif" ve ayrı dengede — mutluluk eğiliminden hariç.
    if (olay.ton === "hafif" && /komik|kg_/.test(olay.id)) continue;
    for (const secenek of olay.secenekler) {
      yield { sonuc: secenek.basariliSonuc, basari: true };
      yield { sonuc: secenek.basarisizSonuc, basari: false };
      if (secenek.onTepki) {
        yield { sonuc: secenek.onTepki.geriCekilSonucu, basari: false };
        yield { sonuc: secenek.onTepki.devamSonucu, basari: true };
      }
    }
  }
}

describe("mutluluk dengesi — olay bankası geneli morali kırar", () => {
  it("tüm mutluluk deltalarının net toplamı belirgin şekilde negatiftir", () => {
    let netToplam = 0;
    let pozitif = 0;
    let negatif = 0;
    let mutlulukTasiyan = 0;

    for (const { sonuc } of tumSonuclar()) {
      const m = sonuc.mutluluk;
      if (typeof m !== "number" || m === 0) continue;
      mutlulukTasiyan++;
      netToplam += m;
      if (m > 0) pozitif++;
      else negatif++;
    }

    // Regresyon kilidi: net toplam negatif kalmalı ve pozitif sonuç oranı yarıyı geçmemeli.
    expect(mutlulukTasiyan).toBeGreaterThan(200);
    expect(netToplam).toBeLessThan(0);
    expect(pozitif / (pozitif + negatif)).toBeLessThan(0.5);
  });

  it("hiçbir tekil mutluluk ödülü +12'yi aşmaz (abartılı moral sıçraması yok)", () => {
    const asanlar: number[] = [];
    for (const { sonuc } of tumSonuclar()) {
      if (typeof sonuc.mutluluk === "number" && sonuc.mutluluk > 12) asanlar.push(sonuc.mutluluk);
    }
    expect(asanlar).toEqual([]);
  });
});
