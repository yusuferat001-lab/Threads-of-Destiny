/**
 * "Yıl" penceresi (Dünya geçmişi): karakterin bulunduğu ülkede ve dünyada son yıllarda olan
 * önemli olaylar. SALT-OKUNUR saf fonksiyon — tur tüketmez, state'i değiştirmez.
 *
 * Kaynaklar (hepsi birleştirilip yeniden-eskiye sıralanır):
 *  - tarihiSavaslar.ts: bölgenin tarihi savaş pencereleri       → "Ülkende"
 *  - liderler.ts: hükümdar değişimleri                          → "Ülkende"
 *  - state.ulke_gecmisi: oyun içi savaş/veba/kriz kaydı          → "Ülkende"
 *  - dunyaOlaylari.ts: elle yazılmış gerçek tarih (bolge/dunya)  → "Ülkende" / "Dünyada"
 */
import { CharacterState } from "../types";
import { T, K, Khukumdar } from "../i18n";
import { tarihiSavasPencereleri } from "../data/tarihiSavaslar";
import { liderDonemleri } from "../data/liderler";
import { DUNYA_OLAYLARI } from "../data/dunyaOlaylari";

export interface DunyaMaddesi {
  yil: number;
  /** Çok yıllı olayın bitiş yılı (sürüyorsa yok). */
  yilSon?: number;
  /** Olay hâlâ sürüyor (yılsonu henüz bilinmiyor). */
  suruyor?: boolean;
  ikon: string;
  metin: string;
}

export interface DunyaGecmisi {
  yil: number;
  bolge: string;
  /** Tarama penceresinin başlangıç yılı (yil - aralik). */
  baslangicYili: number;
  ulke: DunyaMaddesi[];
  dunya: DunyaMaddesi[];
}

export const DUNYA_GECMISI_ARALIK_YIL = 15;

interface SiraliMadde extends DunyaMaddesi {
  sirala: number;
}

/** [a1,a2] ile [b1,b2] aralıkları kesişiyor mu? */
function kesisiyor(a1: number, a2: number, b1: number, b2: number): boolean {
  return a1 <= b2 && b1 <= a2;
}

const KRIZ_AD: Record<string, { ad: string; ikon: string }> = {
  kitlik: { ad: "Kıtlık", ikon: "🌾" },
  isyan: { ad: "İsyan", ikon: "🔥" },
  altin_cag: { ad: "Altın çağ", ikon: "✨" },
};

/** Başlangıç/bitiş kayıtlarını (aynı `anahtar`la) aralık maddelerine eşler. */
function logdanAralikMaddeleri(state: CharacterState): SiraliMadde[] {
  const sonuc: SiraliMadde[] = [];
  const acik = new Map<string, { yil: number; ayrinti?: string; tur: string }>();
  const dil = state.dil;

  const adIkon = (aile: "savas" | "veba" | "kriz", ayrinti?: string): { ad: string; ikon: string } => {
    if (aile === "savas") return { ad: T(dil, "{0} ile savaş", [K(dil, ayrinti)]), ikon: "⚔️" };
    if (aile === "veba") return { ad: T(dil, "Veba salgını"), ikon: "☠️" };
    const k = KRIZ_AD[ayrinti ?? ""] ?? KRIZ_AD.kitlik;
    return { ad: T(dil, k.ad), ikon: k.ikon };
  };

  for (const k of state.ulke_gecmisi ?? []) {
    const aile = k.tur.startsWith("savas") ? "savas" : k.tur.startsWith("veba") ? "veba" : "kriz";
    const anahtar = `${aile}:${k.ayrinti ?? ""}`;
    if (k.tur.endsWith("_basladi")) {
      acik.set(anahtar, { yil: k.yil, ayrinti: k.ayrinti, tur: aile });
    } else {
      const bas = acik.get(anahtar);
      const { ad, ikon } = adIkon(aile, k.ayrinti);
      if (bas) {
        acik.delete(anahtar);
        sonuc.push({ yil: bas.yil, yilSon: k.yil, ikon, metin: ad, sirala: k.yil });
      } else {
        // Başlangıcı 30 kayıtlık sınırdan düşmüş: yalnız bitişi bilinir.
        sonuc.push({ yil: k.yil, ikon, metin: T(dil, "{0} sona erdi", [ad]), sirala: k.yil });
      }
    }
  }
  for (const [anahtar, bas] of acik) {
    const aile = anahtar.split(":")[0] as "savas" | "veba" | "kriz";
    const { ad, ikon } = adIkon(aile, bas.ayrinti);
    sonuc.push({ yil: bas.yil, suruyor: true, ikon, metin: T(dil, "{0} sürüyor", [ad]), sirala: state.yil });
  }
  return sonuc;
}

export function dunyaGecmisiUret(state: CharacterState, aralik = DUNYA_GECMISI_ARALIK_YIL): DunyaGecmisi {
  const dil = state.dil;
  const bas = state.yil - aralik;
  const son = state.yil;
  const ulke: SiraliMadde[] = [];
  const dunya: SiraliMadde[] = [];

  // 1) Oyun içi kayıt (büyük savaş / veba / kriz). Pencereye değen aralıklar kalır.
  const logMaddeleri = logdanAralikMaddeleri(state).filter((m) =>
    kesisiyor(m.yil, m.suruyor ? son : m.yilSon ?? m.yil, bas, son)
  );
  ulke.push(...logMaddeleri);

  // 2) Tarihi savaş pencereleri — aynı düşmanla oyun içi kayıtlı bir savaş zaten pencereye
  //    denk geliyorsa (büyük savaşın düşmanı tarihi pencereden seçilebilir) tekrar etme.
  const loglanmisSavaslar = (state.ulke_gecmisi ?? []).filter((k) => k.tur.startsWith("savas"));
  for (const s of tarihiSavasPencereleri(state.bolge, state.cag)) {
    if (!kesisiyor(s.baslangic, s.bitis, bas, son)) continue;
    const cakisiyor = loglanmisSavaslar.some(
      (k) => k.ayrinti === s.rakip && k.yil >= s.baslangic - 1 && k.yil <= s.bitis + 1
    );
    if (cakisiyor) continue;
    const ad = T(dil, "{0} ile savaş", [K(dil, s.rakip)]);
    if (s.baslangic === s.bitis) {
      ulke.push({ yil: s.baslangic, ikon: "⚔️", metin: ad, sirala: s.baslangic });
    } else if (s.bitis > son) {
      ulke.push({ yil: s.baslangic, suruyor: true, ikon: "⚔️", metin: T(dil, "{0} sürüyor", [ad]), sirala: son });
    } else {
      ulke.push({ yil: s.baslangic, yilSon: s.bitis, ikon: "⚔️", metin: ad, sirala: s.bitis });
    }
  }

  // 3) Hükümdar değişimi (pencere içinde göreve başlayanlar).
  for (const d of liderDonemleri(state.bolge, state.cag)) {
    if (d.baslangic <= bas || d.baslangic > son) continue;
    ulke.push({
      yil: d.baslangic,
      ikon: "👑",
      metin: T(dil, "{0} tahta çıktı", [Khukumdar(dil, `${d.unvan} ${d.isim}`)]),
      sirala: d.baslangic,
    });
  }

  // 4) Elle yazılmış gerçek tarih.
  for (const o of DUNYA_OLAYLARI) {
    if (o.cag !== state.cag) continue;
    if (o.kapsam === "bolge" && o.bolge !== state.bolge) continue;
    const bitis = o.yilSon ?? o.yil;
    if (!kesisiyor(o.yil, bitis, bas, son)) continue;
    const madde: SiraliMadde = {
      yil: o.yil,
      ...(o.yilSon !== undefined ? { yilSon: o.yilSon } : {}),
      ikon: o.ikon,
      metin: dil === "en" ? o.baslik.en : o.baslik.tr,
      sirala: Math.min(bitis, son),
    };
    (o.kapsam === "bolge" ? ulke : dunya).push(madde);
  }

  const sirala = (liste: SiraliMadde[]): DunyaMaddesi[] =>
    liste
      .sort((a, b) => b.sirala - a.sirala || b.yil - a.yil)
      .map(({ sirala: _s, ...m }) => m);

  return { yil: state.yil, bolge: state.bolge, baslangicYili: bas, ulke: sirala(ulke), dunya: sirala(dunya) };
}
