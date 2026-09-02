/**
 * Her piyasa mülkünün (ciftlik/han/demirci/kervan/karaborsa) 30 yılda ilk
 * yatırıma oranla ne kadar kâr/zarar bıraktığını Monte Carlo ile ölçer.
 *
 * Ne HESABA KATILIR:
 *  - Gerçek getiri formülü: mulkGetiriOraniHesapla (dünya durumuna göre değişen oran)
 *  - Gerçek periyodik bakım/vergi: mulkGelirleriUygula (7-10 yılda bir, güncel değerin ~%12'si)
 *  - Enflasyon: çağa göre (Orta Çağ %1/yıl, Sanayi %3/yıl) — hem getiriyi hem bakımı hem
 *    ilk yatırım değerini nominal olarak büyütür; rapor NOMİNAL orandır ("ilk yatırıma oranla %").
 *  - Gerçek arka plan dünya olayları (stateManager): büyük savaş (10 yıl cd, %10/yıl),
 *    veba (18+ %4/yıl), küçük kriz/kıtlık (5-7 yılda bir), kriz bitişleri.
 *  - Kervanın savaşta batma riski (yıllık %25) — battığı trial'da kalan yıllar 0 getirir.
 *  - Karaborsanın suç seviyesi (+2/yıl) ve ahlak (-0.3/yıl) yan etkisi (ayrı raporlanır).
 *
 * TAHMİN edilen (olay verisine bağlı, deterministik olmayan) kısımlar — hafif örnekleyici:
 *  - ulke.ekonomi (iyi/normal/kotu), ulke.nufusDurumu, ara sıra isyan/altın çağ krizleri.
 *    Bunlar normalde olay `ulke_etkisi` ile değişir; burada kalıcılıklı bir sampler ile
 *    yaklaşık dağılımları taklit edilir (aşağıdaki EKONOMI_* sabitlerine bak).
 *
 * Çalıştırma:  npx tsx scripts/simulateGayrimenkul.ts
 * Env: SIM_N (trial/mülk, vars. 4000), SIM_YIL (vars. 30)
 */
import {
  createCharacter,
  mesleğiSec,
  mulkGelirleriUygula,
  rastgeleMulkBakimAraligi,
  enflasyonCarpani,
} from "../src/game/stateManager";
import {
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslamaliMi,
  vebaBaslat,
  vebaBitisKontrolEt,
  vebaYillikKontrol,
  kucukKrizKontrolEt,
  krizEtkisiUygula,
} from "../src/game/stateManager";
import { MULK_TANIMLARI, mulkTanimiGetir } from "../src/data/mulkler";
import type { CharacterState, MulkTuru, Cag } from "../src/types";

const N = Number(process.env.SIM_N ?? 4000);
const YIL = Number(process.env.SIM_YIL ?? 30);

// --- Hafif "olay tabanlı değişim" örnekleyici (ekonomi / nüfus / isyan / altın çağ) ---
const EKONOMI_DEGISIM_IHTIMALI = 0.12; // yıllık, durum değişir mi
const EKONOMI_DAGILIM: [CharacterState["ulke"]["ekonomi"], number][] = [
  ["normal", 0.6],
  ["iyi", 0.2],
  ["kotu", 0.2],
];
const NUFUS_DEGISIM_IHTIMALI = 0.1;
const NUFUS_DAGILIM: [NonNullable<CharacterState["ulke"]["nufusDurumu"]>, number][] = [
  ["normal", 0.6],
  ["artiyor", 0.25],
  ["azaliyor", 0.15],
];
const ISYAN_YILLIK = 0.02;
const ALTIN_CAG_YILLIK = 0.02;

function agirlikliSec<T>(dagilim: [T, number][]): T {
  let r = Math.random();
  for (const [v, p] of dagilim) {
    if ((r -= p) <= 0) return v;
  }
  return dagilim[dagilim.length - 1][0];
}

function dunyayiIlerlet(state: CharacterState): void {
  // Gerçek arka plan mekanikleri (turdaki her yıl için 1 kez)
  buyukSavasBitisKontrolEt(state);
  buyukSavasKontrolEt(state, 1);
  vebaBitisKontrolEt(state);
  if (vebaBaslamaliMi(state, 1)) {
    vebaBaslat(state, Math.random() < 0.5 ? 2 : 0);
    state.ulke.vebada = true;
  }
  vebaYillikKontrol(state, 1); // eş/çocuk kaybı olabilir; mülk getirisiyle ilgisiz
  kucukKrizKontrolEt(state, 1); // kıtlık planlar
  krizEtkisiUygula(state, 1); // süresi dolan krizi temizler

  // Tahmini örnekleyici: ekonomi / nüfus
  if (Math.random() < EKONOMI_DEGISIM_IHTIMALI) state.ulke.ekonomi = agirlikliSec(EKONOMI_DAGILIM);
  if (Math.random() < NUFUS_DEGISIM_IHTIMALI) state.ulke.nufusDurumu = agirlikliSec(NUFUS_DAGILIM);
  // Ara sıra isyan / altın çağ (yalnızca başka kriz yokken)
  if (!state.ulke.kriz && Math.random() < ISYAN_YILLIK) {
    state.ulke.kriz = { tur: "isyan", bitisYili: state.yil + 2 + Math.floor(Math.random() * 2) };
  } else if (!state.ulke.kriz && Math.random() < ALTIN_CAG_YILLIK) {
    state.ulke.kriz = { tur: "altin_cag", bitisYili: state.yil + 2 + Math.floor(Math.random() * 2) };
  }
}

interface Sonuc {
  ilkYatirim: number;
  brutGelir: number;
  bakim: number;
  netKar: number;
  kervanBattiYil: number | null;
  sucArtis: number;
  ahlakDusus: number;
}

function tekTrial(cag: Cag, bolge: string, tur: MulkTuru): Sonuc {
  const state = createCharacter(cag, bolge, "sehir_merkezi");
  mesleğiSec(state, "Tüccar");
  // Yaşı sabitle ki veba 18+ tetiklensin, ecel/yaşlanma karışmasın (mülk hesabı izole)
  state.yas = 30;
  state.mulkler = [tur];
  state.mulk_bakim_kalan = { [tur]: rastgeleMulkBakimAraligi() };

  const ilkYatirim = mulkTanimiGetir(tur).taban_maliyet; // yıl 0 → enflasyon çarpanı 1
  const sucBasla = state.suc_seviyesi;
  const ahlakBasla = state.ahlak;
  let brutGelir = 0;
  let bakim = 0;
  let netKar = 0;
  let kervanBattiYil: number | null = null;

  for (let y = 1; y <= YIL; y++) {
    state.yil += 1;
    state.yas += 1;
    dunyayiIlerlet(state);
    if (state.mulkler.length === 0) continue; // kervan battıysa kalan yıllar boş

    const r = mulkGelirleriUygula(state, 1);
    const buYilBakim = r.bakimOdemeleri.reduce((t, b) => t + b.miktar, 0);
    bakim += buYilBakim;
    netKar += r.toplamNet; // toplamNet = getiri - bakım (mulkGelirleriUygula içinde)
    brutGelir += r.toplamNet + buYilBakim;
    if (r.kervanBatti && kervanBattiYil === null) {
      kervanBattiYil = y;
      // Battığı an mülkün güncel (enflasyonlu) değeri kadar sermaye de yok olur.
      netKar -= mulkTanimiGetir(tur).taban_maliyet * enflasyonCarpani(state);
    }
  }

  return {
    ilkYatirim,
    brutGelir,
    bakim,
    netKar,
    kervanBattiYil,
    sucArtis: state.suc_seviyesi - sucBasla,
    ahlakDusus: ahlakBasla - state.ahlak,
  };
}

function ort(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}
function medyan(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

const CAGLAR: { cag: Cag; bolge: string }[] = [
  { cag: "Orta Çağ", bolge: "Fransa" },
  { cag: "Sanayi Devrimi", bolge: "Fransa" },
];

for (const { cag, bolge } of CAGLAR) {
  console.log(`\n${"=".repeat(78)}`);
  console.log(`ÇAĞ: ${cag}  (bölge: ${bolge}, ${YIL} yıl, ${N} trial/mülk)`);
  console.log("=".repeat(78));
  console.log(
    [
      "Mülk".padEnd(11),
      "İlkYat".padStart(7),
      "BrütGel".padStart(9),
      "Bakım".padStart(8),
      "NetKâr".padStart(9),
      "Net/İlk%".padStart(9),
      "Yıllık%".padStart(8),
      "Medyan%".padStart(8),
      "Zarar%".padStart(7),
      "Not",
    ].join("  ")
  );
  console.log("-".repeat(78));

  for (const tanim of MULK_TANIMLARI) {
    const tur = tanim.tur;
    const trials: Sonuc[] = [];
    for (let i = 0; i < N; i++) trials.push(tekTrial(cag, bolge, tur));

    const ilkYatirim = trials[0].ilkYatirim;
    const netKarlar = trials.map((t) => t.netKar);
    const ortNet = ort(netKarlar);
    const ortBrut = ort(trials.map((t) => t.brutGelir));
    const ortBakim = ort(trials.map((t) => t.bakim));
    const roiYuzde = (ortNet / ilkYatirim) * 100;
    const roiMedyan = (medyan(netKarlar) / ilkYatirim) * 100;
    const yillikYuzde = (Math.pow(1 + ortNet / ilkYatirim, 1 / YIL) - 1) * 100;
    const zararOrani = (netKarlar.filter((k) => k < 0).length / N) * 100;

    let not = "";
    if (tur === "kervan") {
      const batanlar = trials.filter((t) => t.kervanBattiYil !== null);
      not = `battı %${((batanlar.length / N) * 100).toFixed(0)} (ort. ${
        batanlar.length ? ort(batanlar.map((t) => t.kervanBattiYil!)).toFixed(0) : "-"
      }. yıl)`;
    } else if (tur === "karaborsa") {
      not = `suç +${ort(trials.map((t) => t.sucArtis)).toFixed(0)}, ahlak -${ort(
        trials.map((t) => t.ahlakDusus)
      ).toFixed(0)}`;
    }

    console.log(
      [
        tanim.ad.padEnd(11),
        ilkYatirim.toFixed(0).padStart(7),
        ortBrut.toFixed(0).padStart(9),
        ("-" + ortBakim.toFixed(0)).padStart(8),
        (ortNet >= 0 ? "+" : "") + ortNet.toFixed(0).padStart(ortNet >= 0 ? 8 : 9),
        (roiYuzde >= 0 ? "+" : "") + roiYuzde.toFixed(0) + "%",
        (yillikYuzde >= 0 ? "+" : "") + yillikYuzde.toFixed(1) + "%",
        (roiMedyan >= 0 ? "+" : "") + roiMedyan.toFixed(0) + "%",
        zararOrani.toFixed(0) + "%",
        not,
      ].join("  ")
    );
  }
}

console.log(
  "\nNot: Net/İlk% = 30 yıllık toplam net kârın, yıl-0 yatırım bedeline nominal oranı." +
    "\n     Yıllık% = aynı oranın yıllık bileşik karşılığı.  Zarar% = 30 yıl sonunda ekside biten trial oranı." +
    "\n     Enflasyon nominal büyütür; Sanayi (%3/yıl) rakamları Orta Çağ'dan (%1/yıl) belirgin yüksek çıkar." +
    "\n     Kervan battığında kaybedilen sermaye (güncel değer) net kârdan DÜŞÜLÜR." +
    "\n     30 yıl sonunda hâlâ elde tutulan mülkün kalıntı satış değeri hiçbir mülk için sayılmaz (yalnız nakit akışı)."
);
