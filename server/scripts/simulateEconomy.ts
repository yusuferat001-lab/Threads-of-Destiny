/**
 * Ekonomi dengeleme simülasyonu.
 *
 * Gerçek oyun formüllerini (maaş, gider, enflasyon, yaşlanma, çapraz etki,
 * durum tikleri, şans/ani ölüm olayları) doğrudan stateManager.ts/gameEngine.ts'ten
 * import edip binlerce karakterin tüm ömrünü simüle eder. Olay içeriği (367 olay)
 * tam uygunluk/seçilebilirlik mantığıyla (olaySecici.ts) simüle edilmez — bunun
 * yerine OLAY_BANKASI'ndan ağırlıklı rastgele örnekleme yapılır. Bu, "hangi olay
 * hangi karaktere çıkar" inceliğini feda eder ama gerçek para/sağlık/mutluluk
 * dağılımına, elle uydurulmuş sabit gürültü sınırlarından çok daha yakın durur.
 *
 * Kalıcı bir dengeleme aracı olarak bırakılmıştır: `npm run simulate` ile çalışır.
 */
import {
  createCharacter,
  mesleğiSec,
  clampStats,
  checkDeath,
  ilerletYas,
  durumlariUygula,
  durumEkle,
  pasifEkonomiUygula,
  yaslanmaUygula,
  capraletkiUygula,
  hesaplaMaasYillik,
  meslekMetrikCarpani,
  sansOlayiDene,
  aniOlumDene,
  MESLEKLER,
} from "../src/game/stateManager";
import { jitterUygula, efektifOlumSansi } from "../src/game/gameEngine";
import { rollSuccess } from "../src/game/diceRoll";
import { OLAY_BANKASI, OlayTanimi } from "../src/data/olaylar";
import { KONUTLAR, TASINMA_MALIYETI, KonutTanimi, konutGetir } from "../src/data/konutlar";
import { YASAM_SECENEKLERI, YasamSecenegiTanimi } from "../src/data/yasamSecenekleri";
import { YERLESIMLER } from "../src/data/yerlesimler";
import { CharacterState, Cag } from "../src/types";

// ---------------------------------------------------------------------------
// Olay örnekleme havuzu (çağa göre, ağırlıklı)
// ---------------------------------------------------------------------------

interface Havuz {
  olaylar: OlayTanimi[];
  kumulatifAgirlik: number[];
  toplam: number;
}

function havuzOlustur(cag: Cag): Havuz {
  const olaylar = OLAY_BANKASI.filter((o) => (!o.cag || o.cag === cag) && !o.hapisOlayi);
  const kumulatifAgirlik: number[] = [];
  let toplam = 0;
  for (const o of olaylar) {
    toplam += o.agirlik ?? 1;
    kumulatifAgirlik.push(toplam);
  }
  return { olaylar, kumulatifAgirlik, toplam };
}

const HAVUZLAR: Record<Cag, Havuz> = {
  "Orta Çağ": havuzOlustur("Orta Çağ"),
  "Sanayi Devrimi": havuzOlustur("Sanayi Devrimi"),
};

function rastgeleOlaySec(havuz: Havuz): OlayTanimi {
  const hedef = Math.random() * havuz.toplam;
  let lo = 0;
  let hi = havuz.kumulatifAgirlik.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (havuz.kumulatifAgirlik[mid] < hedef) lo = mid + 1;
    else hi = mid;
  }
  return havuz.olaylar[lo];
}

// ---------------------------------------------------------------------------
// Harcama arketipleri: her turda konut/yaşam kademesini yeniden değerlendirir
// ---------------------------------------------------------------------------

type ArketipAdi = "pasif" | "tutumlu" | "dengeli" | "hep_yukselen" | "budgesini_asan";

const ARKETIPLER: { ad: ArketipAdi; oran: number | null }[] = [
  { ad: "pasif", oran: null }, // hiç değiştirmez, varsayılanda kalır
  { ad: "tutumlu", oran: 0.25 }, // her eksenin maaşın en fazla %25'ini tutan en iyi kademesi
  { ad: "dengeli", oran: 0.45 },
  { ad: "hep_yukselen", oran: 0.65 },
  { ad: "budgesini_asan", oran: null }, // her zaman en üst kademe, karşılayabilirliğe bakmaz
];

function enIyiKarsilanabilirKademe<T extends { kiraYillik?: number; maliyetYillik?: number }>(
  kademeler: T[],
  maasYillik: number,
  oran: number,
  maliyetGetir: (k: T) => number
): T {
  let secilen = kademeler[0];
  for (const k of kademeler) {
    if (maliyetGetir(k) <= maasYillik * oran) secilen = k;
  }
  return secilen;
}

function konutUygula(state: CharacterState, hedef: KonutTanimi): void {
  if (state.konut_id === hedef.id) return;
  const eski = konutGetir(state.konut_id);
  const geriCekilme = (eski?.kiraYillik ?? 0) > hedef.kiraYillik;
  if (!geriCekilme) {
    if (state.para < TASINMA_MALIYETI) return;
    state.para -= TASINMA_MALIYETI;
  }
  state.konut_id = hedef.id;
}

function kademeleriUygula(state: CharacterState, arketip: ArketipAdi): void {
  if (arketip === "pasif") return; // varsayılanda kalır, hiç dokunmaz

  const maasYillik = state.maas_yillik || hesaplaMaasYillik(state);
  let hedefKonut: KonutTanimi;
  let hedefYasam: YasamSecenegiTanimi;

  if (arketip === "budgesini_asan") {
    hedefKonut = KONULAR_SON();
    hedefYasam = YASAM_SON();
  } else {
    const oran = ARKETIPLER.find((a) => a.ad === arketip)!.oran!;
    hedefKonut = enIyiKarsilanabilirKademe(KONUTLAR, maasYillik, oran, (k) => k.kiraYillik);
    hedefYasam = enIyiKarsilanabilirKademe(YASAM_SECENEKLERI, maasYillik, oran, (y) => y.maliyetYillik);
  }

  konutUygula(state, hedefKonut);
  if (state.yasam_secimi_id !== hedefYasam.id) state.yasam_secimi_id = hedefYasam.id;
}

function KONULAR_SON(): KonutTanimi {
  return KONUTLAR[KONUTLAR.length - 1];
}
function YASAM_SON(): YasamSecenegiTanimi {
  return YASAM_SECENEKLERI[YASAM_SECENEKLERI.length - 1];
}

// ---------------------------------------------------------------------------
// Tek bir ömrün simülasyonu
// ---------------------------------------------------------------------------

interface OmurSonucu {
  olumYasi: number;
  sonPara: number;
  borcaGirdi: boolean;
  dusukMutlulukYili: number;
  tavanaCarpti: boolean;
}

const YAS_TAVANI = 140; // sonsuz döngü emniyeti; hiçbir simülasyonun buraya ulaşmaması beklenir

function birOmurSimuleEt(cag: Cag, yerlesimId: string, meslek: string, arketip: ArketipAdi): OmurSonucu {
  const state = createCharacter(cag, "Fransa", yerlesimId);
  mesleğiSec(state, meslek);
  kademeleriUygula(state, arketip);

  let dusukMutlulukYili = 0;
  const havuz = HAVUZLAR[cag];

  while (state.aktif && state.yas < YAS_TAVANI) {
    // --- olay örnekle ve etkisini uygula (sonucuUygulaVeIlerlet'in basitleştirilmiş hali) ---
    const olay = rastgeleOlaySec(havuz);
    const secenek = olay.secenekler[Math.floor(Math.random() * olay.secenekler.length)];
    const basarili = rollSuccess(secenek.baseBasariSansi ?? 50);
    const etki = jitterUygula(basarili ? secenek.basariliSonuc : secenek.basarisizSonuc);

    if (etki.para && etki.para > 0) {
      etki.para = Math.round(etki.para * meslekMetrikCarpani(state, olay.kategori));
    }
    state.para += etki.para ?? 0;
    state.un += etki.un ?? 0;
    state.saglik += etki.saglik ?? 0;
    state.mutluluk += etki.mutluluk ?? 0;
    if (etki.durum_ekle) durumEkle(state, etki.durum_ekle);
    if (etki.durum_sil) state.durumlar = state.durumlar.filter((d) => !etki.durum_sil!.includes(d.id));
    clampStats(state);

    let olumTetiklendi = etki.olum === true;
    if (!olumTetiklendi && etki.olum_sansi !== undefined) {
      const sans = efektifOlumSansi(etki.olum_sansi, state.saglik);
      if (Math.random() * 100 < sans) olumTetiklendi = true;
    }
    checkDeath(state, olumTetiklendi, etki.mesaj);
    if (!state.aktif) break;

    // --- zaman ilerlet + pasif ekonomi + yaşlanma + çapraz etki (gerçek fonksiyonlar) ---
    // gameEngine.ts ile aynı ağırlıklı dağılım: %40 ihtimalle 1, %60 ihtimalle 2 yıl (ortalama ~1.6 yıl/tur).
    const turSuresi = Math.random() < 0.4 ? 1 : 2;
    const yasArtisi = ilerletYas(state, turSuresi, turSuresi);
    const durumOlumMesaji = durumlariUygula(state);
    if (durumOlumMesaji) checkDeath(state, true, durumOlumMesaji);
    if (!state.aktif) break;

    kademeleriUygula(state, arketip); // gelir değiştikçe arketip kademesini yeniden değerlendirir

    pasifEkonomiUygula(state, yasArtisi);
    checkDeath(state, false);
    if (!state.aktif) break;

    yaslanmaUygula(state, yasArtisi);
    if (state.saglik <= 0) checkDeath(state, true, "Yaşlılık");
    if (!state.aktif) break;

    capraletkiUygula(state, yasArtisi);
    if (state.saglik <= 0) checkDeath(state, true, "Çöküş");
    if (!state.aktif) break;

    if (state.mutluluk < 25) dusukMutlulukYili += yasArtisi;

    sansOlayiDene(state);
    const aniOlum = aniOlumDene(state);
    if (aniOlum) checkDeath(state, true, aniOlum.mesaj);
    if (!state.aktif) break;

    clampStats(state);
  }

  return {
    olumYasi: state.yas,
    sonPara: state.para,
    borcaGirdi: state.para < 0,
    dusukMutlulukYili,
    tavanaCarpti: state.aktif && state.yas >= YAS_TAVANI,
  };
}

// ---------------------------------------------------------------------------
// Koşum + rapor
// ---------------------------------------------------------------------------

function yuzdelik(sirali: number[], p: number): number {
  if (sirali.length === 0) return NaN;
  const idx = Math.min(sirali.length - 1, Math.max(0, Math.round((sirali.length - 1) * p)));
  return sirali[idx];
}

const N_PER_GROUP = Number(process.env.SIM_N ?? 600);

function main(): void {
  console.log(`\nEkonomi simülasyonu — arketip x yerleşim başına ${N_PER_GROUP} ömür\n`);
  console.log(
    "arketip".padEnd(16) +
      "yerlesim".padEnd(14) +
      "n".padEnd(6) +
      "olum p10/p50/p90".padEnd(20) +
      "para p10/p50/p90".padEnd(24) +
      "borc%".padEnd(8) +
      "tavan%"
  );

  const pasifDusukMutlulukToplam: number[] = [];

  for (const arketip of ARKETIPLER) {
    for (const yerlesim of YERLESIMLER) {
      const olumYaslari: number[] = [];
      const sonParalar: number[] = [];
      let borcaGirenSayisi = 0;
      let tavanaCarpanSayisi = 0;

      for (let i = 0; i < N_PER_GROUP; i++) {
        const cag: Cag = Math.random() < 0.5 ? "Orta Çağ" : "Sanayi Devrimi";
        const meslek = MESLEKLER[Math.floor(Math.random() * MESLEKLER.length)];
        const sonuc = birOmurSimuleEt(cag, yerlesim.id, meslek, arketip.ad);
        olumYaslari.push(sonuc.olumYasi);
        sonParalar.push(sonuc.sonPara);
        if (sonuc.borcaGirdi) borcaGirenSayisi++;
        if (sonuc.tavanaCarpti) tavanaCarpanSayisi++;
        if (arketip.ad === "pasif") pasifDusukMutlulukToplam.push(sonuc.dusukMutlulukYili);
      }

      olumYaslari.sort((a, b) => a - b);
      sonParalar.sort((a, b) => a - b);

      const olumStr = `${yuzdelik(olumYaslari, 0.1)}/${yuzdelik(olumYaslari, 0.5)}/${yuzdelik(olumYaslari, 0.9)}`;
      const paraStr = `${yuzdelik(sonParalar, 0.1)}/${yuzdelik(sonParalar, 0.5)}/${yuzdelik(sonParalar, 0.9)}`;
      const borcYuzde = Math.round((borcaGirenSayisi / N_PER_GROUP) * 100);
      const tavanYuzde = Math.round((tavanaCarpanSayisi / N_PER_GROUP) * 100);

      console.log(
        arketip.ad.padEnd(16) +
          yerlesim.id.padEnd(14) +
          String(N_PER_GROUP).padEnd(6) +
          olumStr.padEnd(20) +
          paraStr.padEnd(24) +
          `%${borcYuzde}`.padEnd(8) +
          `%${tavanYuzde}`
      );
    }
  }

  if (pasifDusukMutlulukToplam.length > 0) {
    const ort = pasifDusukMutlulukToplam.reduce((a, b) => a + b, 0) / pasifDusukMutlulukToplam.length;
    console.log(`\nPasif arketipte ortalama "mutluluk<25" geçirilen yıl: ${ort.toFixed(1)}`);
  }

  console.log(
    "\nNot: Olay içeriği (367 olay) OLAY_BANKASI'ndan ağırlıklı örneklenir; olaySecici.ts'in tam uygunluk/" +
      "kişilik/etiket gating mantığı simüle edilmez. Yatırım mekaniği (guvenli/kendi_isi/riskli) bu " +
      "simülasyona dahil değildir — o, ayrı deterministik formül muhakemesi ve birim testleriyle doğrulanır.\n"
  );
}

main();
